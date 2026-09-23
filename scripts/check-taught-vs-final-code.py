#!/usr/bin/env python3
"""화면이 **코드로 가르친** 함수를 🔒 최종 코드가 실제로 쓰나.

왜 (2026-09-23): `billboard` 를 손으로 셌다.

  🔒 FULL_PY / FULL_CPP 안의 max( · min(  →  0번
  chapters.jsx 안의       max( · min(  →  33번

`chapters.jsx` 3장 "⚡ 코드 빌드" 가 학생에게 이 코드를 **그대로 보여준다** —

    def rect_area(x1, y1, x2, y2):
        return max(0, x2-x1) * max(0, y2-y1)

narr 는 "Let's build the code step by step!" 다. 그런데 진짜 최종 코드
(`FULL_PY`/`FULL_CPP`)는 `if w < 0: w = 0` 처럼 **if/else 로 짜여 있고
`max(`/`min(` 이 하나도 없다.** 학생은 `max`/`min` 으로 코드 만드는 법을
보고, 마지막 🔒 코드에서 `if`/`else` 를 만난다 — 아무도 그 차이를 설명 안 한다.

`check-boasted-function.py` 는 이 층을 못 본다 — 그건 *"…덕분에 짧아요"*
같은 **자랑 문장**만 본다. 여기는 자랑이 아니라 **명시적으로 코드를 보여주고
안 쓰는** 모양이다.

무엇을 보나 — quest 파일(`chapters.jsx` 등)에서 **모노스페이스로 스타일된
코드 블록**(fontFamily: 'JetBrains Mono' 류)만 "가르친 코드" 로 본다.
서술문(narr)에서 "max() 를 쓰면" 처럼 스치는 언급은 **일부러 뺐다** —
그건 코드가 아니라 설명이라 오탐이 크다(아래 "오탐 실측" 참고).

그 블록 안에서 WATCH 이름이 `이름(` 꼴로 쓰였으면 "가르쳤다" 로 세고,
🔒 `FULL_PY`+`FULL_CPP`(+`SEC*_PY`+`SEC*_CPP`) 를 합친 글 안에 그 이름이
`이름(` 꼴로 한 번도 없으면 판다.

⚠️ **판정이 아니라 볼 자리 표시다.** 가르친 방법을 일부러 버리고 더 나은
   방법으로 최종 코드를 짠 경우(예: 브루트에서 O(N²) 로 세다가 최종엔
   누적합으로 바꾼 경우)는 정상이다 — 그런 자리는 다리 문장 하나로 잇거나
   "이렇게도 되지만 이번엔 이 방법을 씁니다" 를 설명하면 된다.
   사람이 열어서 판단해라.

  python3 scripts/check-taught-vs-final-code.py              # 전체
  python3 scripts/check-taught-vs-final-code.py billboard     # quest 골라서
"""
import glob
import io
import json
import re
import sys

# check-boasted-function.py 의 WATCH 를 그대로 쓴다 — list·dict·set 를 뺀 이유가
# 거기 적혀 있다("파이썬은 [...]·{...} 리터럴로 쓰기 때문에 호출이 없어도 쓰는
# 게 맞다"). 같은 이유로 여기서도 뺀다. len 도 뺐다 — 거의 모든 코드가 쓴다.
WATCH = ("sorted", "map", "filter", "zip", "enumerate", "reversed",
         "sum", "min", "max", "any", "all")

# 모노스페이스 코드 블록의 여는 태그. 'JetBrains Mono' 가 이 저장소의 표준이지만
# 혹시 다른 스펠링을 쓸까봐 mono 전체를 본다(대소문자 무시).
MONO_OPEN = re.compile(r"<div\b[^>]*fontFamily[^>]*mono[^>]*>", re.I)

# 진짜 "코드" 인지 거르는 신호 — 표/격자처럼 숫자만 mono 로 보여주는 블록은
# 뺀다(예: astral 격자 칸). 이 토큰이 하나도 없으면 코드 블록으로 안 본다.
CODE_HINT = re.compile(
    r"\bdef\b|\breturn\b|\bfor\b|\bif\b|\belse\b|\bwhile\b|\bimport\b|"
    r"\bint\b|\blong\b|\bvoid\b|\bclass\b|\bstruct\b|cin\s*>>|cout\s*<<|"
    r"#include|;\s*$", re.M)

TAG = re.compile(r"<[^>]+>")
STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
FINAL_ARRAY = re.compile(r"^const (\w+_PY|\w+_CPP) = \[\n(.*?)\n\];",
                          re.M | re.S)


def mono_blocks(src):
    """모노스페이스로 스타일된 <div> 블록의 텍스트(태그 벗긴 것)를 모은다."""
    out = []
    for m in MONO_OPEN.finditer(src):
        i = m.end()
        depth = 1
        n = len(src)
        while i < n:
            o = src.find("<div", i)
            c = src.find("</div>", i)
            if c == -1:
                break
            if o != -1 and o < c:
                depth += 1
                i = o + 4
            else:
                depth -= 1
                i = c + 6
                if depth == 0:
                    out.append(src[m.end():c])
                    break
    return out


def strip_js_braces(text):
    """`{...}` 로 감싼 자리는 **화면 글자가 아니라 실행되는 JS** 다.

    `{lines.map((l, i) => ...)}` 는 코드 줄을 *그리는* React 식이지
    학생에게 보여주는 코드 글자가 아니다. 이걸 안 지우면 "이 quest 가
    map() 을 가르친다" 로 거짓 판정한다(실측: mixmilk·shellgame·whereami·
    uddered·palindrome·socialdist1/2·mco15badminton·mcc22grammar·mooin2·
    moolang 11개가 전부 이 모양으로 떴다 — 진짜 map( 을 하나도 안 가르친다).
    중첩 `{}` 도 통째로 지운다(문자열 안 중괄호는 못 가른다 — 이 repo
    JSX 스타일엔 드물다).
    """
    out = []
    depth = 0
    for ch in text:
        if ch == "{":
            depth += 1
            continue
        if ch == "}":
            if depth > 0:
                depth -= 1
            continue
        if depth == 0:
            out.append(ch)
    return "".join(out)


def code_calls(plain):
    """WATCH 이름이 '이름(' 꼴로 쓰였는지 — plain 은 이미 태그·중괄호를 벗긴 글."""
    found = set()
    for w in WATCH:
        if re.search(r"\b" + w + r"\s*\(", plain):
            found.add(w)
    return found


def final_code_text(src):
    """FULL_PY/FULL_CPP/SEC*_PY/SEC*_CPP 배열 안의 글만 모은다."""
    out = []
    for m in FINAL_ARRAY.finditer(src):
        body = m.group(2)
        for sm in STR.finditer(body):
            try:
                out.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                pass
    return "\n".join(out)


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in raw for x in a.split()) or None

    hits = {}          # quest -> {name: [(file, snippet), ...]}
    quests_with_final = 0
    quests_scanned = 0

    for d in sorted(glob.glob("quest-problems/*/")):
        quest = d.strip("/").split("/")[-1]
        if want and quest not in want:
            continue

        files = sorted(glob.glob(d + "*.jsx"))
        final_text = ""
        for f in files:
            final_text += final_code_text(
                io.open(f, encoding="utf-8", errors="replace").read())
        if not final_text:
            continue  # 최종 코드 배열이 없는 quest — 이 검사기가 못 본다
        quests_with_final += 1

        taught = {}  # name -> (file, snippet)
        for f in files:
            src = io.open(f, encoding="utf-8", errors="replace").read()
            for block in mono_blocks(src):
                plain = TAG.sub(" ", strip_js_braces(block))
                if not CODE_HINT.search(plain):
                    continue  # 코드처럼 안 생겼다 — 표/격자 등
                for name in code_calls(plain):
                    if name not in taught:
                        snippet = re.sub(r"\s+", " ", plain).strip()[:90]
                        taught[name] = (f.split("/")[-1], snippet)

        if not taught:
            continue
        quests_scanned += 1

        missing = {}
        for name, (fname, snippet) in taught.items():
            if not re.search(r"\b" + name + r"\s*\(", final_text):
                missing[name] = (fname, snippet)
        if missing:
            hits[quest] = missing

    total = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"화면 코드 블록이 **가르치는데** 🔒 최종 코드가 **안 쓰는** 이름 — "
          f"{total}건 · quest {len(hits)}개{scope}")
    print(f"(최종 코드 배열 있는 quest {quests_with_final}개 중, "
          f"코드 블록으로 뭔가 가르치는 quest {quests_scanned}개를 봤다)\n")

    for quest in sorted(hits):
        for name, (fname, snippet) in sorted(hits[quest].items()):
            print(f"  ■ {quest}/{fname} — 안 쓰는 이름: {name}(")
            print(f"      \"{snippet}\"\n")

    if total:
        print("  ⚠️ 판정이 아니다 — 일부러 더 나은 방법으로 갈아탄 자리일 수 있다.")
        print("  사람이 열어서: 진짜 안 이어지면 다리 문장 하나, 아니면 그냥 둔다.")
    print("\n⚠️ 모노스페이스 코드 블록만 본다. narr·설명문의 스치는 언급은 안 본다.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
