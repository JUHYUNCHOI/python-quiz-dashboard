#!/usr/bin/env python3
"""**학생이 코드를 보기 전에** 코드 변수 이름이 화면에 나오나.

왜 (2026-09-18): 선생님이 buymilk 4쪽(문제 챕터)을 보시고
  *"그냥 자연스러운 말. 한국말. 쉽게"*
그 쪽 표 머리가 `거래값 deal_price` · `제일 싼 값 block_cost` 였고
노란 상자는 `deal_price = [10, 15, 20, 45]` 였다. **코드 챕터는 다섯 쪽 뒤다.**

**내가 만든 문제다.** 같은 날 코드 변수를 `a` → `deal_price` 로 고치면서
그 이름을 화면 글까지 밀어 넣었다. 코드와 화면이 같은 말을 쓰게 하려던 것인데,
**아직 코드를 안 본 학생에게는 그냥 못 읽는 영어**다.

규칙 — 코드 이름은 **이름을 붙이는 자리**(Plan 카드·코드 챕터)에서 처음 만난다.
그 앞에서는 우리말로 부른다.

  python3 scripts/check-code-names-in-prose.py            # 전체
  python3 scripts/check-code-names-in-prose.py buymilk    # 하나만

⚠️ 판정이 아니라 **볼 자리 표시**다. 문제 원문이 `a_i` · `N` 처럼 기호를 쓰는 건 정상이다.
   잡는 것은 **여러 낱말을 이어 붙인 코드투 이름**뿐이다 — `deal_price` · `blockCost` · `suffix_max`.

🆕 2026-09-21 — **이름만 보고 문법은 안 봤다.** `makedistinct` 미션 첫 문장이
   *"모든 원소가 서로 달라지게 만들려면 `+= K` 를 적어도 몇 번"* 이었는데 **0건**이었다.
   `+= K` 는 낱말이 아니라 **코드 문법**이라 위 그물에 안 걸렸다.
   선생님: *"뭔말인지 모르겠는데. 읽는게 넘 힘든데?"*
   그래서 문법도 본다 — `+=` · `a[i]` · `a[0..N-1]` · `->` · `==` · `//`.
   그리고 **코드 말인 한국어 낱말**(`배열` · `원소` · `인덱스`)도 같이 본다.
   `moohunt` 는 "칸", `buymilk` 는 "거래" 라고 부른다 — 그게 이 저장소의 모양이다.
   근거: `memory/quest_season_shape_consistency.md`

⚠️ **두 층이 섞여 있다. 같은 무게로 읽지 마라** (실측 2026-09-21: 문법 63 · 코드말 낱말 77) —
   · **문법**(`+= K` · `a[i]` · `a[0..N-1]`)은 거의 다 진짜다. 학생이 코드를 안 봤으면 읽을 수 없다.
   · **코드말 낱말**(`배열` · `원소` · `리스트`)은 **판단이 필요하다.**
     `lc560` 의 *"부분 배열"* 은 그 문제의 이름 자체라 바꾸면 오히려 틀린다.
     이 줄은 "바꿔라" 가 아니라 **"형제 quest 는 뭐라고 부르나 한 번 보라"** 는 표시다.
"""
import glob
import io
import json
import os
import re
import sys

STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
CODE_ARRAY = re.compile(r"\[\s*\n((?:[ \t]*\"(?:[^\"\\]|\\.)*\",[ \t]*\n)+)[ \t]*\]")

# 코드투 이름 — snake_case 나 camelCase 로 **두 낱말 이상**
SNAKE = re.compile(r"\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b")
CAMEL = re.compile(r"\b[a-z][a-z0-9]*(?:[A-Z][a-z0-9]+)+\b")

# 코드 이름이 나와도 되는 자리 — 이름을 붙이는 쪽
OK_NEAR = ("코드", "code", "변수", "이름", "Plan", "계획", "부른", "부릅니다", "라고 해요")

# 흔한 오탐 — 파일명·속성·영어 낱말
SKIP = {
    "chapters", "components", "className", "fontWeight", "wordBreak", "textWrap",
    "lineHeight", "fontFamily", "fontSize", "marginBottom", "marginTop", "maxWidth",
    "borderRadius", "flexDirection", "justifyContent", "alignItems", "textAlign",
    "whiteSpace", "overflowX", "backgroundColor", "letterSpacing", "paddingTop",
    "borderTop", "minWidth", "flexShrink", "flexWrap", "verticalAlign", "boxSizing",
    "onClick", "useState", "useMemo", "colSpan", "dataset", "innerText",
}


def code_regions(src):
    out = []
    for m in CODE_ARRAY.finditer(src):
        if STR.search(m.group(1)):
            out.append((m.start(), m.end()))
    return out


def strip_comments(src):
    """JS 주석을 공백으로. 주석에 적힌 코드 이름은 학생이 안 본다."""
    out = list(src)
    i, n, q = 0, len(src), None
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



# 코드 **문법** — 이름이 아니라 모양으로 잡는다 (2026-09-21)
CODE_SYNTAX = [
    (re.compile(r"(?<![<>!=+\-*/])[+\-*/]=(?!=)"), "+= 같은 대입"),
    (re.compile(r"\b[a-z]\s*\[\s*[a-z0-9]"), "a[i] 같은 첨자"),
    (re.compile(r"\[\s*0\s*\.\."), "a[0..N-1] 같은 범위"),
    (re.compile(r"(?<![-<>])->(?!>)"), "-> 화살표"),
    (re.compile(r"(?<![<>!=])==(?!=)"), "== 비교"),
]
# 코드 말인 한국어 낱말 — 형제 quest 는 이렇게 안 부른다
CODE_WORDS = {
    "배열": "수들 · 칸 · 목록",
    "원소": "값 · 수 하나",
    "인덱스": "자리 · 번째",
    "리스트": "목록",
}


def syntax_hits(text):
    """이 글에 코드 문법이나 코드 말이 있나 — [(무엇, 어떻게 부를까)]"""
    out = []
    for rx, what in CODE_SYNTAX:
        if rx.search(text):
            out.append((what, "말로 풀어 쓴다"))
    for w, better in CODE_WORDS.items():
        if w in text:
            out.append((f"'{w}'", better))
    return out


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in raw for x in a.split()) or None

    hits = {}
    for f in sorted(glob.glob("quest-problems/*/chapters.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        src = strip_comments(io.open(f, encoding="utf-8", errors="replace").read())
        holes = code_regions(src)
        for sm in STR.finditer(src):
            if any(a <= sm.start() < b for a, b in holes):
                continue
            try:
                v = json.loads('"%s"' % sm.group(1))
            except Exception:
                continue
            # 한국어 글 안에 섞인 것만 본다 (순수 영어 문자열은 영어 화면 글이다)
            if not re.search(r"[가-힣]", v):
                continue
            names = [n for n in (SNAKE.findall(v) + CAMEL.findall(v)) if n not in SKIP]
            # 이름 말고 **문법·코드 말**도 본다 (2026-09-21 — `+= K` 가 0건으로 샜다)
            names += [f"{what} → {better}" for what, better in syntax_hits(v)]
            if not names:
                continue
            ctx = src[max(0, sm.start() - 300): sm.start()]
            if any(k in ctx for k in OK_NEAR):
                continue
            ln = src.count("\n", 0, sm.start()) + 1
            hits.setdefault(quest, []).append((ln, sorted(set(names)), v.strip()[:70]))

    total = sum(len(v) for v in hits.values())
    print(f"코드를 보기 전에 코드 이름이 나오는 자리 — {total}건 · quest {len(hits)}개\n")
    for q in sorted(hits, key=lambda x: (-len(hits[x]), x)):
        print(f"  ■ {q} — {len(hits[q])}건")
        for ln, names, txt in hits[q][:6]:
            print(f"      chapters.jsx:{ln}  [{', '.join(names)}]  {txt}")
        if len(hits[q]) > 6:
            print(f"      … {len(hits[q]) - 6}건 더")
        print()

    print("⚠️ 판정이 아니라 **볼 자리 표시**다.")
    print("   코드 이름은 **이름을 붙이는 자리**(Plan 카드·코드 챕터)에서 처음 만나야 한다.")
    print("   그 앞에서는 우리말로 불러라 — `deal_price` 가 아니라 `거래값`.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
