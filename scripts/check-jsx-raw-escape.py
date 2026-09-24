#!/usr/bin/env python3
"""JSX 텍스트에 맨몸으로 놓인 `\\uXXXX` — **학생 화면에 글자 그대로 나온다.**

왜 생겼나 (2026-09-24)
──────────────────────
`rotshift` 샘플 상자를 브라우저로 열었더니 제목이 이랬다:

    \\ud83d\\udce5 샘플 1 — 공식

📥 가 아니라 **백슬래시-u-d-8-3-d …** 가 글자 그대로 떠 있었다. 원인은 하나다 —

    <div>\\ud83d\\udce5 {t(E, "Sample 1", "샘플 1")}</div>
         ^^^^^^^^^^^^^^ 여기는 **JSX 텍스트 노드**다

**JSX 텍스트는 JS 문자열 리터럴이 아니다.** 그래서 `\\u` 이스케이프를 해석하지 않고
백슬래시부터 글자 하나하나를 그대로 그린다. 같은 글자라도 따옴표 안(`"\\ud83d\\udce5"`)이나
중괄호 안(`{"\\ud83d\\udce5"}`)에 있으면 **정상으로 보인다** — 그래서 눈에 잘 안 띈다.

전수로 찾아보니 **quest 12개 · 14곳**이었다. 대부분은 1장 «🎯 미션» 제목이고,
`hungrycow` 는 **범례 기호 세 개**(▮ · 🌾 · ❌)가 통째로 깨져 있었다 — 범례가 깨지면
그 아래 표가 무슨 말인지 알 수 없다.

⚠️ **빌드도 타입 검사도 이걸 못 잡는다.** 문법은 완전히 정상이다 — 뜻만 틀렸다.
   `see-screen.mjs` 도 못 잡았다. 글자가 **겹치지도 넘치지도 않기** 때문이다.

고치는 법
─────────
중괄호로 감싸면 된다 — 그 안은 JS 라 이스케이프가 해석된다:

    ❌ <div>\\ud83c\\udfaf {t(E, "Mission", "미션")}</div>
    ⭕ <div>{"\\ud83c\\udfaf"} {t(E, "Mission", "미션")}</div>

(이모지를 그냥 붙여 넣어도 된다. 다만 이 저장소의 여러 파일이 한글·이모지를 전부
 `\\uXXXX` 로 저장해 두고 있어서, 그 파일 안에서는 위 모양이 주변과 어울린다.)

무엇을 못 보나 — **0건이 결백이 아니다**
────────────────────────────────────────
- 따옴표·중괄호를 지우는 방식이라 **한 줄 안에서** 판단한다.
  여러 줄에 걸친 문자열·표현식은 놓칠 수 있다.
- 정규식 리터럴(`/[\\u2018\\u2019]/`)은 일부러 걸러 낸다 — 거기 `\\u` 는 정상이다.
  그래서 **정규식처럼 생긴 진짜 결함**은 못 본다.
- `.tsx`·`.jsx` 만 본다.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GLOBS = ("quest-problems/**/*.jsx", "components/**/*.tsx", "app/**/*.tsx")

STRING = re.compile(r'"(?:[^"\\]|\\.)*"')
SQUOTE = re.compile(r"'(?:[^'\\]|\\.)*'")
BACKTICK = re.compile(r"`(?:[^`\\]|\\.)*`")
BRACES = re.compile(r"\{[^{}]*\}")
REGEX_LIT = re.compile(r"/(?:[^/\\\n]|\\.)+/[gimsuy]*")
ESCAPE = re.compile(r"\\u[0-9a-fA-F]{4}")


def bare_escapes(line: str) -> bool:
    """이 줄에, 문자열·중괄호·정규식 **바깥**에 남는 \\uXXXX 가 있나."""
    s = REGEX_LIT.sub("", line)
    s = BACKTICK.sub("", s)
    s = STRING.sub("", s)
    s = SQUOTE.sub("", s)
    # 중괄호는 중첩될 수 있다 — 안쪽부터 반복해서 지운다
    for _ in range(6):
        s, n = BRACES.subn("", s)
        if not n:
            break
    return bool(ESCAPE.search(s))


def main() -> int:
    only = set(sys.argv[1:])
    hits: dict[str, list[tuple[int, str]]] = {}
    for pattern in GLOBS:
        for path in sorted(ROOT.glob(pattern)):
            rel = path.relative_to(ROOT).as_posix()
            if only and not any(o in rel for o in only):
                continue
            try:
                lines = path.read_text(encoding="utf-8").split("\n")
            except UnicodeDecodeError:
                continue
            for i, line in enumerate(lines, 1):
                if "\\u" in line and bare_escapes(line):
                    hits.setdefault(rel, []).append((i, line.strip()[:110]))

    total = sum(len(v) for v in hits.values())
    if not total:
        print("JSX 텍스트에 맨몸 `\\uXXXX` — 0곳.")
        print("   ⚠️ 0건이 결백은 아니다. 한 줄 단위로만 보고, 정규식 리터럴은 일부러 건너뛴다.")
        return 0

    print(f"🚨 JSX 텍스트에 맨몸 `\\uXXXX` — **{total}곳 · 파일 {len(hits)}개**")
    print("   이 글자들은 **학생 화면에 백슬래시부터 그대로 나온다.** 빌드는 통과한다.\n")
    for rel, items in hits.items():
        print(f"  ■ {rel} — {len(items)}곳")
        for i, text in items:
            print(f"     {i}: {text}")
    print('\n고치는 법: 중괄호로 감싸라 — `{"\\ud83c\\udfaf"}`. 그 안은 JS 라 이스케이프가 해석된다.')
    return 1


if __name__ == "__main__":
    sys.exit(main())
