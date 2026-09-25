#!/usr/bin/env python3
"""화면 **설명문**이 이름을 대는 자료구조를 🔒 최종 코드가 **실제로 쓰나.**

## 왜 이게 생겼나 (2026-09-25) — **학생이 먼저 찾았다**

C++ 초심자 학생이 `milkmeas` 를 따라가다 스스로 알아챘다:

> *"`💻 C++ 전용` 에 「`tuple<int, string, int>` 는 앞자리부터 차례로 견주기 때문에
> 따로 시키지 않아도 day 순서로 줄을 서요」라고 적혀 있었어요. 그런데 **진짜 코드에는
> `tuple` 이 한 번도 안 나와요.** 코드는 `idx` 라는 배열을 만들어서 이중 `for` 문으로
> 직접 비교해서 바꾸는 식(버블 정렬 같은 것)으로 날짜순 정렬을 해요.
> **말과 코드가 다르다는 걸 눈치챘어요.**"*

전수로 재 보니 **quest 5개 · 문장 9줄**이었다(전부 🔒 최종 코드에 그 이름이 **0번**):

| quest | 화면이 말한 것 | 🔒 코드가 실제로 하는 것 |
|---|---|---|
| `milkmeas` | `tuple<int,string,int>` 가 날짜순 정렬 | 통 셋 + `idx` 번호 통 + 이중 반복문 교환 |
| `meastraffic` | `tuple<...>` · `auto& [typ,lo,hi]` | 통 셋(`types`·`los`·`his`) 나란히 |
| `livestock` | `stringstream` · `map<string, vector<string>>` | 글자 하나씩 잘라 담고 통 둘 |
| `blockgame` | 헤더 `map`·`algorithm` · `map<char,int>` | `iostream fstream string` · `int need[26]` |
| `lifeguards` | `for (auto& [s, e] : rest)` 구조 분해 | `for (int i = 0; ...)` |

## 🚨 왜 어느 검사기도 못 잡았나 — **다른 층이다**

`check-taught-vs-final-code.py` 를 `milkmeas` 에 돌리면 **0건**이고, **그게 일부러다.**
그 검사기는 *"모노스페이스 코드 블록 + `lines=` 프롭 호출, 이 두 모양만 본다"* 고
자기 머리 주석에 밝혀 뒀다. 이 결함은 **`cppOnly`·`pyOnly`·`why` 설명문**에 있어서
**구조적 사각지대**였다. `billboard` 와 **같은 병인데 다른 층**이다 —
그건 «가르치는 코드 블록»과 최종 코드를 대조하고, 이건 «말로 하는 설명»과 대조한다.

## 무엇을 보나

`cppOnly` · `pyOnly` · `why` 배열 안의 `t(E, ...)` 문자열에서 **자료구조·함수 이름**을
찾고, 같은 quest 의 🔒 최종 코드 배열(`*_CPP`·`*_PY`·`FULL_*`·`SOLUTION_CODE`)에
그 이름이 있나 본다. 없으면 찍는다.

⚠️ **JS 주석(`/* ... */`)은 뺀다** — 학생이 안 보는 글이고, 이 결함을 고친 자리마다
   *"전에 여기가 `tuple` 이라고 말했다"* 는 기록을 주석으로 남겨 뒀기 때문이다.
   안 빼면 **고친 자리가 영원히 다시 걸린다.**

## 이 검사기가 **못 보는 것** (0건이 결백이 아니다)

- **오탐이 두 모양 있다. 판정이 아니라 볼 자리 표시다.** 만들고 바로 둘 다 났다 —
  ① **비교**: `cheese` 의 *"2D vector 가 `map<pair<int,int>>` 보다 빠름"*
  ② **부정**: `mooin3` 의 *"공식 표 풀이와 같아요 (`bisect` 없이)"* —
     **코드가 안 쓴다고 스스로 말하는 중**이다.
  둘 다 **정당한 문장**이다. 신호 낱말(`COMPARE`·`NEGATE`)로 `❓` 를 붙이되
  **신호가 없는 비교·부정도 있다** — 손으로 열어 봐라.
- **`narr`·`bubble`·`explain` 은 안 본다.** `cppOnly`·`pyOnly`·`why` 세 배열만 본다 —
  다른 자리에 같은 결함이 또 있을 수 있다.
- **이름 사전에 있는 것만 찾는다**(아래 `NAMES`). 새 모양을 보면 여기에 더해라.
- **반대 방향(코드가 쓰는데 설명에 없는 것)은 일부러 안 본다** —
  `check-taught-vs-final-code.py` 가 그 방향을 시험했다가 `map`·`sum` 같은 상용구로
  **175건·quest 25개+** 가 쏟아져 오탐이 압도적이었다(2026-09-23).
- **언어를 안 가린다.** `pyOnly` 의 설명을 C++ 코드와 대조하지는 않는다 —
  `*_PY`·`*_CPP` 를 **다 합쳐** 본다. 관대한 쪽으로 틀렸다(놓치는 쪽).

```bash
python3 scripts/check-prose-vs-final-code.py            # 전수
python3 scripts/check-prose-vs-final-code.py milkmeas   # 한 quest, 문장까지
```
"""
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 설명문에서 찾을 이름 — **C++·파이썬 자료구조와 함수**.
#   ⚠️ 흔한 상용구(`map(`·`sum(`·`len(`)는 **일부러 뺐다** — 오탐이 압도적이다.
NAMES = [
    "tuple<", "priority_queue<", "greater<", "less<", "set<", "map<",
    "unordered_map<", "unordered_set<", "deque<", "stack<", "queue<",
    "vector<vector<", "pair<", "stringstream", "auto& [", "auto &[",
    "llabs(", "stable_sort(", "lower_bound(", "upper_bound(", "accumulate(",
    "next_permutation(", "defaultdict", "Counter(", "heapq", "bisect",
    "itertools", "OrderedDict", "deque(",
]

# 비교 문장일 수 있는 신호 — 이게 같은 문장에 있으면 **오탐 가능**으로 표시한다
COMPARE = ["보다", "대신", "달리", "instead", "faster than", "slower", "rather than",
           "compared", "than "]

# ⭐ 2026-09-25: **부정문**도 갈라야 한다 — 만들고 바로 이 오탐이 났다.
#   `mooin3` 설명문: *"공식 표 풀이와 같아요 (**bisect 없이**)"* · *"**bisect 도**,
#   positions_of 목록도 **없어요**"* — 코드가 안 쓰는 게 **맞고, 그렇다고 말하는 중**이다.
#   비교(«~보다 빠름»)와 부정(«~ 없이»)은 **다른 모양**이라 따로 센다.
NEGATE = ["없이", "없어요", "없다", "않아", "않고", "안 쓰", "안쓰", "쓰지 않",
          "no bisect", "without", "not use", "n't use", "no longer", "instead of"]

PROSE_KEYS = ["cppOnly", "pyOnly", "why"]
CODE_NAMES = re.compile(r'\b(\w*_?(?:CPP|PY)\w*|FULL_\w+|SOLUTION_CODE)\s*=\s*\[')


def rd(p):
    try:
        return io.open(p, encoding="utf-8", errors="replace").read()
    except OSError:
        return ""


def balanced(src, start, open_ch="[", close_ch="]"):
    """`start` 의 여는 괄호부터 짝이 맞는 자리까지."""
    d = 0
    i = start
    while i < len(src):
        if src[i] == open_ch:
            d += 1
        elif src[i] == close_ch:
            d -= 1
            if d == 0:
                return i
        i += 1
    return len(src)


def collect(src, keyword_re):
    out = []
    for m in keyword_re.finditer(src):
        i = src.index("[", m.end() - 1) if src[m.end() - 1] != "[" else m.end() - 1
        out.append(src[m.end():balanced(src, i)])
    return out


def scan(qdir):
    src = "\n".join(rd(p) for p in sorted(glob.glob(os.path.join(qdir, "*.jsx")))
                    + sorted(glob.glob(os.path.join(qdir, "*.tsx"))))
    if not src:
        return None
    # 🔒 최종 코드
    code = []
    for m in CODE_NAMES.finditer(src):
        if "KEYWORD" in m.group(1):
            continue            # `CPP_KEYWORDS` 같은 문법 강조용 배열은 코드가 아니다
        code.append(src[m.end():balanced(src, m.end() - 1)])
    if not code:
        return None             # 최종 코드 배열이 없으면 대조할 것이 없다
    code = "\n".join(code)
    # 설명문 — **주석은 뺀다**
    prose = []
    for key in PROSE_KEYS:
        for m in re.finditer(r'\b' + key + r':\s*\[', src):
            prose.append(src[m.end():balanced(src, m.end() - 1)])
    prose = re.sub(r"/\*.*?\*/", "", "\n".join(prose), flags=re.S)
    prose = re.sub(r"^\s*//.*$", "", prose, flags=re.M)
    if not prose.strip():
        return None
    hits = []
    for n in NAMES:
        if n in prose and n not in code:
            lines = [l.strip() for l in prose.split("\n") if n in l]
            def hinted(l):
                low = l.lower()
                return (any(c in l for c in COMPARE)
                        or any(c.lower() in low for c in NEGATE))
            # ⭐ 그 이름이 나온 **모든** 줄이 비교·부정이면 ❓ 다.
            #   한 줄만 보고 판정하면 `mooin3` 처럼 **첫 줄이 우연히 부정문**인
            #   quest 를 놓치거나, 반대로 뒷줄의 진짜 결함을 가린다.
            cmp_hint = bool(lines) and all(hinted(l) for l in lines)
            show = next((l for l in lines if not hinted(l)), lines[0] if lines else "")
            hits.append((n, show[:90], cmp_hint))
    return hits


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    rows = []
    looked = 0
    for qdir in sorted(glob.glob(os.path.join(ROOT, "quest-problems/*"))):
        q = os.path.basename(qdir)
        if args and q not in args:
            continue
        hits = scan(qdir)
        if hits is None:
            continue
        looked += 1
        if hits:
            rows.append((q, hits))

    sure = [(q, h) for q, h in rows if any(not c for _n, _l, c in h)]
    maybe = [(q, h) for q, h in rows if q not in dict(sure)]
    print("화면 **설명문**이 이름을 대는데 🔒 최종 코드가 **안 쓰는** 자리 — "
          f"**quest {len(rows)}개** (설명문이 있는 quest {looked}개 중)\n")
    detail = bool(args)
    for q, hits in rows:
        mark = "🚨" if any(not c for _n, _l, c in hits) else "❓"
        print(f"  {mark} {q:<18} {', '.join(n for n, _l, _c in hits)}")
        if detail:
            for n, line, c in hits:
                print(f"       `{n}`{'  ❓ 비교 문장일 수 있다' if c else ''}")
                print(f"         {line}")
    if not rows:
        print("  0곳.")
    if maybe:
        print(f"\n  ❓ {len(maybe)}개는 **비교 또는 부정 문장**일 수 있다 —")
        print("     «~보다»·«~ 대신» 또는 «~ 없이»·«~ 없어요» 가 같은 줄에 있다.")
        print("     실측 사례 둘 — `cheese` 의 *「2D vector 가 map<pair<int,int>> 보다 빠름」* 은")
        print("     **비교**이고, `mooin3` 의 *「공식 표 풀이와 같아요 (bisect 없이)」* 는")
        print("     **코드가 안 쓴다고 스스로 말하는 중**이다. 둘 다 **정당한 문장**이다.")
        print("     ⚠️ 그래도 손으로 열어 봐라 — 신호 낱말이 없는 부정문도 있다.")
    if not detail and rows:
        print("\n  문장까지 보려면: python3 scripts/check-prose-vs-final-code.py <quest 이름>")

    print("\n⚠️ **판정이 아니라 볼 자리 표시다.** 비교 문장은 정당하다.")
    print("⚠️ `check-taught-vs-final-code.py` 와 **다른 층이다** — 그건 모노스페이스")
    print("   **코드 블록**을 보고, 이건 `cppOnly`·`pyOnly`·`why` **설명문**을 본다.")
    print("   `milkmeas` 가 그쪽에서 **0건**으로 통과한 이유가 이것이다.")
    print("⚠️ **0건이 결백이 아니다** — `narr`·`bubble` 은 안 본다. 이름 사전 밖도 안 걸린다.")
    return 1 if rows else 0


if __name__ == "__main__":
    sys.exit(main())
