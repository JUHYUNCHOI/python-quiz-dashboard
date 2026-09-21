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
POINTER = re.compile(r"(다음 쪽|다음 장|다음에|뒤에서|곧 |이따가|next page|next step)")
# 그 문장이 들고 있는 값 — 숫자 · 대괄호 목록
VALUE = re.compile(r"\[[^\]]*\]|(?<![\w.])\d+(?![\w.])")
STEP = re.compile(r'^\s*\{\s*$|^\s*(type|narr):', re.M)


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
        out.append(" ".join(text))
    return out


def check(quest):
    hits = []
    for f in sorted(glob.glob(f"quest-problems/{quest}/*.jsx")):
        if os.path.basename(f).endswith("App.jsx"):
            continue
        src = io.open(f, encoding="utf-8", errors="replace").read()
        pages = steps_of(src)
        for i, page in enumerate(pages[:-1]):
            for sent in re.split(r"[.!?\n]", page):
                if not POINTER.search(sent):
                    continue
                vals = [v for v in VALUE.findall(sent) if v]
                vals = [v for v in set(vals) if not (v.isdigit() and int(v) <= 1)]
                if not vals:
                    continue
                nxt = pages[i + 1]
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
