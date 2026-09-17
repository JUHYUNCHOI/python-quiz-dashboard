#!/usr/bin/env python3
"""학생 글에 **뜻을 밝힌 적 없는 기호**가 그대로 박혀 있나 (판정 아님 — 볼 자리 표시).

왜 (2026-09-17): MCC 12개를 여섯 잣대로 훑었더니 **12개 중 11개**가 같은 구멍이었다.
  `10⁹` · `2^R` · `N²` · `⌈L/2⌉` · `Σ` · `∞` · `≯` 같은 기호가
  **화면 어디에서도 뜻을 밝힌 적 없는 채로** 시뮬 표·제약 카드 안에 박혀 있었다.
  그런데 `check-word-difficulty.py` 는 이 12개 전부 **0건**이었다 —
  그 검사기는 *낱말*을 보지 기호를 안 본다.

  선생님이 세 번 다 화면에서 먼저 찾으신 이유가 이것이다.
  기호는 한글도 아니고 어려운 낱말도 아니라서 **어느 검사기의 그물에도 안 걸렸다.**

무엇을 보나 — quest 의 **학생에게 보이는 글**만 본다.
  코드 배열(여러 줄 문자열 배열)은 건너뛴다. 코드 안의 `N*N` 은 코드다.

⚠️ **판정이 아니다.** `O(N log N)` 을 일부러 가르치는 쪽도 있고,
   `≤` 는 제약 카드에서 이미 통하는 기호다. 사람이 보고 정한다.
   물어볼 것은 하나다 — **이 기호의 뜻이 이 화면 안에 있나?**

  python3 scripts/check-undefined-symbol.py              # 전체
  python3 scripts/check-undefined-symbol.py mcc19elim    # quest 골라서
"""
import glob
import io
import json
import os
import re
import sys

# ⚠️ 2026-09-17: `#include` 로만 C++ 을 알아보면 **조각 배열**에서 틀린다.
#    `CPP_S1` 처럼 main 중간부터 시작하는 배열에는 `#include` 가 없다.
#    그러면 파이썬으로 보고 `//` 를 주석이 아니라고 판단해, 순수 주석 줄을
#    "코드가 바뀌었다" 고 잘못 신고했다(mcc22lamp·lc3 에서 실제로 났다).
#    그래서 **표를 세서** 정한다. 두 언어의 표가 하나도 없으면 파이썬으로 본다.
_CPP_STRONG = re.compile(r"^\s*(#include|using namespace|int main|template\s*<)")
# ⚠️ `->` 와 `::` 는 빼라. 파이썬 **주석 안**에도 흔히 나온다 —
#    `dq.pop()   # 3rd most expensive -> FREE` 를 C++ 로 오해해 순수 주석 줄을
#    "코드가 바뀌었다" 고 신고했다. 표는 **코드에만 나오는 모양**이어야 한다.
_CPP_HINT = re.compile(
    r"^\s*//|;\s*$|^\s*(int|long|double|bool|char|void|auto|vector<|string |const )\b"
    r"|\bcout\s*<<|\bcin\s*>>|\bnullptr\b")
_PY_HINT = re.compile(
    r"^\s*#(?!include)|^\s*(def|class|elif|import|from|print\()\b|:\s*(#.*)?$"
    r"|\bTrue\b|\bFalse\b|\bNone\b|\belif\b|\brange\(")


def is_cpp_lines(lines):
    """이 코드 배열이 C++ 인가. 조각 배열(#include 없음)도 맞힌다."""
    if any(_CPP_STRONG.match(l) for l in lines):
        return True
    c = sum(1 for l in lines if _CPP_HINT.search(l))
    p = sum(1 for l in lines if _PY_HINT.search(l))
    return c > p


STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
HANGUL = re.compile(r"[가-힣]")

# 문자열만 줄줄이 들어 있는 여러 줄 배열 = 코드 배열. 거기 있는 기호는 코드다.
CODE_ARRAY = re.compile(r"\[\s*\n((?:[ \t]*\"(?:[^\"\\]|\\.)*\",[ \t]*\n)+)[ \t]*\]")

# (이름, 정규식, 왜 걸리나)
RULES = [
    ("윗첨자", re.compile(r"[⁰¹²³⁴⁵⁶⁷⁸⁹]"),
     "10⁹ 처럼 작게 올려 쓴 숫자. 몇인지 말로 같이 써라 — '10억'"),
    ("거듭제곱 ^", re.compile(r"(?<![\w])[0-9A-Za-z][\^][0-9A-Za-z]"),
     "2^R · 10^12. `^` 가 무엇인지 화면에 없으면 학생은 못 읽는다"),
    ("제곱 기호", re.compile(r"[A-Za-z][²³]"),
     "N² . '두 번 겹쳐 세면' 처럼 말로 풀 수 있나"),
    ("올림·내림 괄호", re.compile(r"[⌈⌉⌊⌋]"),
     "⌈L/2⌉ . 배운 적 없는 기호다"),
    ("시그마", re.compile(r"Σ"),
     "Σ . '다 더하면' 으로 쓸 수 있다"),
    ("무한대", re.compile(r"∞"),
     "∞ . '아직 없음' 이 학생에게 더 정확하다"),
    ("부등호 빗금", re.compile(r"[≯≮≰≱≠]"),
     "≯ · ≠ . 설명 없이 쓰면 방향을 거꾸로 읽는다"),
    ("복잡도 O(...)", re.compile(r"\bO\s*\([^)]*\)"),
     "O(N log N) . 이 quest 가 복잡도를 가르치는 중이 아니면 '한 번만 훑어요' 가 낫다"),
]

# 안 보는 기호 — `≤ ≥ × ÷` 는 제약 카드에서 이미 통하고 대신 쓸 말이 마땅치 않다.
# 규칙에 안 넣는 것으로 처리한다.


def strip_comments(src):
    """JS/JSX 주석을 **같은 길이의 공백**으로 지운다 (줄 번호가 안 밀리게).

    ⚠️ 왜 필요한가: 주석에는 "여기 ⌈⌉ 가 있었다" 같은 **고친 기록**이 남는다.
       그걸 세면 고칠수록 건수가 늘어난다. 주석은 학생이 안 본다."""
    out = list(src)
    i, n = 0, len(src)
    q = None
    while i < n:
        c = src[i]
        if q:
            if c == "\\":
                i += 2
                continue
            if c == q:
                q = None
            i += 1
            continue
        if c in "\"'`":
            q = c
            i += 1
            continue
        if src.startswith("//", i):
            j = src.find("\n", i)
            j = n if j < 0 else j
            for k in range(i, j):
                out[k] = " "
            i = j
            continue
        if src.startswith("/*", i):
            j = src.find("*/", i + 2)
            j = n if j < 0 else j + 2
            for k in range(i, j):
                if out[k] != "\n":
                    out[k] = " "
            i = j
            continue
        i += 1
    return "".join(out)


def code_regions(src):
    """코드 배열이 차지한 (시작, 끝) 목록."""
    out = []
    for m in CODE_ARRAY.finditer(src):
        vals = []
        for sm in STR.finditer(m.group(1)):
            try:
                vals.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                pass
        if vals:
            out.append((m.start(), m.end()))
    return out


def screen_strings(src):
    """학생에게 보이는 문자열만. 코드 배열 안은 뺀다."""
    holes = code_regions(src)
    for sm in STR.finditer(src):
        if any(a <= sm.start() < b for a, b in holes):
            continue
        try:
            v = json.loads('"%s"' % sm.group(1))
        except Exception:
            continue
        yield sm.start(), v


def line_of(src, pos):
    return src.count("\n", 0, pos) + 1


def jsx_text(src, holes):
    """따옴표 밖의 JSX 본문 글. 말풍선이 <>...</> 로 쓰인 자리가 여기다."""
    out, i, n = [], 0, len(src)
    q = None
    buf, start = [], 0
    while i < n:
        c = src[i]
        if any(a <= i < b for a, b in holes):
            i += 1
            continue
        if q:
            if c == "\\":
                i += 2
                continue
            if c == q:
                q = None
            i += 1
            continue
        if c in "\"'`":
            if buf:
                out.append((start, "".join(buf)))
                buf = []
            q = c
            i += 1
            continue
        if not buf:
            start = i
        buf.append(c)
        i += 1
    if buf:
        out.append((start, "".join(buf)))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(args) if args else None

    files = sorted(glob.glob("quest-problems/*/*.jsx"))
    hits = {}          # quest -> [(파일, 줄, 이름, 조각)]
    for f in files:
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = strip_comments(io.open(f, encoding="utf-8", errors="replace").read())
        holes = code_regions(src)

        chunks = list(screen_strings(src))
        chunks += jsx_text(src, holes)

        for pos, text in chunks:
            # 한글도 영어 문장도 아닌 조각(식별자·클래스명)은 건너뛴다
            if not HANGUL.search(text) and not re.search(r"[A-Za-z]{3}", text):
                continue
            for name, rx, _why in RULES:
                for m in rx.finditer(text):
                    frag = text[max(0, m.start() - 26): m.end() + 26].strip()
                    frag = re.sub(r"\s+", " ", frag)
                    # 바로 옆에 **풀어 쓴 숫자**가 있으면 이미 밝힌 것이다.
                    # 예: "1 ≤ N ≤ 200,000 (= 2 × 10⁵)" · "10^9 (10억)"
                    if name in ("윗첨자", "거듭제곱 ^") and (
                        re.search(r"\d{1,3}(,\d{3})+", frag)
                        or re.search(r"[0-9]\s*(억|만|조|천)", frag)
                    ):
                        continue
                    # 같은 줄·같은 기호는 한 번만 — `N³` 은 윗첨자와 제곱 둘 다에 걸린다
                    key = (os.path.basename(f), line_of(src, pos), name)
                    hits.setdefault(quest, {}).setdefault(key, frag)

    total = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"뜻을 안 밝힌 기호 {total}건 · quest {len(hits)}개{scope}\n")

    show_all = "--all" in sys.argv
    for quest in sorted(hits, key=lambda q: (-len(hits[q]), q)):
        rows = sorted(hits[quest].items())
        print(f"  ■ {quest} — {len(rows)}건")
        for (fn, ln, name), frag in (rows if (show_all or want) else rows[:6]):
            print(f"      {fn}:{ln}  [{name}]  {frag[:78]}")
        if not (show_all or want) and len(rows) > 6:
            print(f"      … {len(rows) - 6}건 더 (--all 또는 quest 이름을 주면 전부)")
        print()

    if not want:
        print("  왜 걸리나:")
        for name, _rx, why in RULES:
            print(f"    [{name}] {why}")

    print("\n⚠️ 판정이 아니라 **볼 자리 표시**다. 물어볼 것은 하나다 —")
    print("   **이 기호의 뜻이 이 화면 안에 있나?** 없으면 말로 풀어라.")
    print("⚠️ 코드 배열 안은 안 본다. 코드의 `N*N` 은 코드다.")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
