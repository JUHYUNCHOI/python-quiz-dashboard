#!/usr/bin/env python3
"""한 쪽이 **"다음 쪽에서 보자"** 고 약속했으면, 다음 쪽이 그걸 하나.

왜 (2026-09-21): `makedistinct` 2쪽이 *"답이 왜 **2** 인지는 다음 쪽에서 봐요"* 라고 했는데,
3쪽은 **다른 예제**(`[4,1,4,4,1]`, 답 4)였다. 학생은 왜 2 인지 끝내 못 본다.
**내가 그날 3쪽 예제를 바꾸면서 만든 것**이다 — 2쪽을 같이 안 봤다.
선생님: *"뭔말인지 모르겠는데. 읽는게 넘 힘든데?"*

왜 아무도 못 잡았나 —
  · 검토자 넷은 **고치기 전** 화면을 봤다. 이 어긋남은 그 뒤에 태어났다.
  · `see-flow.mjs` 는 쪽 목록을 보여줄 뿐 **쪽 사이의 약속**은 안 본다.
  · 낱말·기호 검사기는 한 쪽 안만 본다.
**쪽과 쪽 사이는 원래 아무도 안 본다** — `feedback_reviewers_see_pages_teacher_sees_story.md`.

무엇을 보나 — 어떤 쪽 글에 **다음을 가리키는 말**(다음 쪽 · 뒤에서 · 곧 · 이따가)이 있고
그 문장에 **숫자나 값**이 들어 있으면, **바로 다음 쪽 글에 그 값이 있는지** 본다.

  python3 scripts/check-page-promise.py             # 전체
  python3 scripts/check-page-promise.py makedistinct

⚠️ 판정이 아니라 **볼 자리 표시**다. 약속을 다다음 쪽에서 지키는 것도 있다.
   0건이 결백은 아니다 — 말로만 한 약속("자세히 보자")은 값이 없어서 못 잡는다.
"""
import glob
import io
import json
import os
import re
import sys

# 다음을 가리키는 말
# ⚠️ 2026-09-21 정밀도 손질 (project-lead 실측) — 처음엔 "다음에"·"뒤에서" 를 그냥 잡았더니
#    `permutation` 의 *"다음에 적히는 값"*(= 다음 **차례**, 알고리즘 용어)까지 물었다.
#    그래서 **쪽·장·페이지 가 같이 있을 때만** 잡는다. "다음 쪽" 은 그 자체로 분명해서 그대로 둔다.
POINTER = re.compile(
    r"(다음 쪽|다음 장|다음 페이지|next page|next slide"
    r"|(?:다음에|뒤에서|곧|이따가)(?=[^.!?\n]{0,20}(?:쪽|장|페이지)))")
# 그 문장이 들고 있는 값 — 숫자 · 대괄호 목록
# ⚠️ `[i]` · `[j]` 같은 **한 글자 첨자**는 값이 아니라 코드 표기다 (bacteria 오탐).
VALUE = re.compile(r"\[[^\]]{2,}\]|(?<![\w.])\d+(?![\w.])")
STEP = re.compile(r'^\s*\{\s*$|^\s*(type|narr):', re.M)


def component_text(quest, name, _seen=None):
    """`<PlaceOneByOneSim/>` 처럼 쪽 내용이 **컴포넌트 안에** 있을 때 그 글을 읽어 온다.

    ⚠️ 2026-09-21: 이걸 안 하니 **내가 방금 고친 자리**를 이 검사기가 오탐으로 물었다.
       `makedistinct` 3쪽의 글을 시뮬로 옮겼더니, 그 쪽 chunk 에 남은 건
       `content: <PlaceOneByOneSim E={E} />` 한 줄뿐이라 "다음 쪽에 값이 없다" 가 됐다.
       시뮬 안에는 "모두 2 회" 가 분명히 있었다. **글이 옮겨간 곳까지 따라가야 한다.**
    """
    _seen = _seen or set()
    if name in _seen:
        return ""
    _seen.add(name)
    out = []
    for f in glob.glob(f"quest-problems/{quest}/*.jsx"):
        src = io.open(f, encoding="utf-8", errors="replace").read()
        m = re.search(r"(?:export\s+)?function\s+%s\s*\(" % re.escape(name), src)
        if not m:
            continue
        # ⚠️ 매개변수의 중괄호부터 세면 안 된다 — `function Sim({ E }) {` 에서
        #    `{ E }` 를 본문으로 읽고 바로 끝나 **글자 0개**가 나온다(실제로 그랬다).
        #    여는 괄호의 짝을 먼저 찾고, **그 뒤 첫 `{`** 부터 센다.
        i, par = m.end(), 1
        while i < len(src) and par:
            if src[i] == "(":
                par += 1
            elif src[i] == ")":
                par -= 1
            i += 1
        i = src.find("{", i)
        if i < 0:
            continue
        depth, start = 0, i
        while i < len(src):
            if src[i] == "{":
                depth += 1
            elif src[i] == "}":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        body = src[start:i]
        for sm in re.finditer(r'"((?:[^"\\]|\\.)*)"', body):
            try:
                out.append(json.loads('"' + sm.group(1) + '"'))
            except ValueError:
                pass
        # 이 컴포넌트가 또 다른 컴포넌트를 쓰면 한 겹 더 따라간다
        for cm in re.finditer(r"<([A-Z]\w+)", body):
            out.append(component_text(quest, cm.group(1), _seen))
    return " ".join(out)


def steps_of(src):
    """`type: "..."` 을 경계로 쪽을 나눈다 — 쪽마다의 글 뭉치."""
    marks = [m.start() for m in re.finditer(r'type:\s*"(reveal|quiz|input|progressive|code)"', src)]
    if not marks:
        return []
    marks.append(len(src))
    out = []
    for i in range(len(marks) - 1):
        chunk = src[marks[i]:marks[i + 1]]
        text = []
        for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', chunk):
            try:
                t = json.loads('"' + m.group(1) + '"')
            except ValueError:
                continue
            if re.search(r"[가-힣]", t) or len(t) > 20:
                text.append(t)
        # ⚠️ 글만 돌려주면 `<PlaceOneByOneSim/>` 을 못 찾는다 — 그건 문자열이 아니라 JSX 다.
        #    원본 덩어리도 같이 돌려줘서 컴포넌트 이름을 찾을 수 있게 한다.
        out.append((" ".join(text), chunk))
    return out


def check(quest):
    hits = []
    for f in sorted(glob.glob(f"quest-problems/{quest}/*.jsx")):
        if os.path.basename(f).endswith("App.jsx"):
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        pages = steps_of(src)
        for i, (page, _raw) in enumerate(pages[:-1]):
            for sent in re.split(r"[.!?\n]", page):
                if not POINTER.search(sent):
                    continue
                vals = [v for v in VALUE.findall(sent) if v]
                vals = [v for v in set(vals)
                        if not (v.isdigit() and int(v) <= 1)
                        and not re.fullmatch(r"\[\s*[a-zA-Z]\s*[+-]?\s*\d?\s*\]", v)]
                if not vals:
                    continue
                nxt, nxt_raw = pages[i + 1]
                # 다음 쪽 내용이 컴포넌트면 그 안의 글까지 본다
                for cm in re.finditer(r"<([A-Z]\w+)", nxt_raw):
                    nxt += " " + component_text(quest, cm.group(1))
                missing = [v for v in vals if v not in nxt]
                if missing and len(missing) == len(vals):
                    hits.append((os.path.basename(f), i + 1, sent.strip()[:70], missing))
    return hits


def main():
    want = [a for a in sys.argv[1:] if not a.startswith("-")]
    quests = want or sorted(p.split("/")[1] for p in glob.glob("quest-problems/*/"))
    all_hits = {}
    for q in quests:
        h = check(q)
        if h:
            all_hits[q] = h
    n = sum(len(v) for v in all_hits.values())
    print(f"다음 쪽에 넘긴 약속이 안 지켜진 자리 — {n}곳 · quest {len(all_hits)}개\n")
    for q in sorted(all_hits):
        print(f"  ■ {q}")
        for fn, page, sent, missing in all_hits[q]:
            print(f"      {fn} {page}번째 쪽: {sent}")
            print(f"        → 다음 쪽에 없는 값: {' · '.join(missing)}")
    if not all_hits:
        print("  0곳.")
    print("\n⚠️ 판정이 아니라 **볼 자리 표시**다. 다다음 쪽에서 지키는 약속도 있다.")
    print("   그리고 **값이 없는 약속**(\"자세히 보자\")은 원리상 못 잡는다 — 0건이 결백은 아니다.")
    return 1 if all_hits else 0


if __name__ == "__main__":
    sys.exit(main())
