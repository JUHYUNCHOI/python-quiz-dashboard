# USACO 재제출 — 선생님이 제출하실 코드 4건

**왜 여기 있나:** 이 넷은 검증 뒤에 **알고리즘이나 코드가 바뀌었다.**
`CLAUDE.md` 규칙상 🔒 `USACO_VERIFIED` 코드를 바꿨으면 채점기 재제출로 확인해야 한다.
계정이 있어야 해서 선생님 몫이다.

제출은 **C++17** 로 하는 게 안전하다 (Python 은 여러 건이 TLE 이력이 있다).

## 제출 목록

| # | quest | 대회 | cpid | 왜 다시 내나 | 뭘 내나 |
|---|---|---|---|---|---|
| 1 | **buymilk** | Jan 2026 Bronze #3 | — | 2026-07-17 **알고리즘 교체** (지수 재귀 → 정규화 + O(N) 그리디). 구 코드는 PY 5/14 · CPP 8/9 **TLE**. 채점기 확인 없음 | `buymilk.cpp` → 통과하면 `buymilk.py` |
| 2 | **photoshoot25** | Dec 2025 Bronze #3 | — | 2026-08-29 배열 크기 · 2026-09-03 0-based 로 **인덱스 변경**. 헤더에 "선생님이 제출해 18/18 확인 후 갱신할 것" 이라고 이미 적혀 있음 | `photoshoot25.cpp` |
| 3 | **cowsplits** | Dec 2025 Bronze #2 | — | C++ 은 2026-08-29 통과. **Python 은 한 번도 안 냈다** | `cowsplits.py` |
| 4 | **moohunt** | Jan 2026 Bronze #2 | **1564** | 2026-09-08 "한 줄에 한 문장" 정리로 코드 줄이 바뀜. 원래 브루트는 PY 5/12 · CPP 10/12 **TLE** → 지금은 **공식 답안** 코드 | `moohunt.cpp`, `moohunt.py` |

> moohunt 공식 풀이 출처: https://usaco.org/current/data/sol_prob2_bronze_season26contest2.html

## 내가 먼저 확인한 것 (로컬)

`quest-problems/*/` 에서 **학생에게 보이는 그 코드 그대로** 뽑아 돌렸다.
뽑는 스크립트는 `extract-usaco-tmp.mjs` 가 아니라 커밋된 `scripts/extract-usaco-code.mjs` 다.

| quest | 컴파일·문법 | 공식 샘플 | 교차 검증 |
|---|---|---|---|
| buymilk | ✅ py · cpp | ✅ py·cpp 둘 다 일치 | — |
| moohunt | ✅ py · cpp | ✅ py·cpp 둘 다 일치 | — |
| photoshoot25 | ✅ py · cpp | 샘플이 quest 에 없음 | **200건 랜덤: py = cpp = 브루트, 불일치 0** |
| cowsplits | ✅ py · cpp | 원문 샘플은 다른 답(아래) | **1200건 랜덤: py = cpp, 배정 유효 614건 전부 진짜 정사각, 불일치 0** |

⚠️ **이건 "정확성" 만 본 것이고 "시간 안에 끝나나" 는 못 봤다.** TLE 는 채점기만 안다.
buymilk·moohunt 가 원래 떨어진 이유가 바로 TLE 라서, 이 표가 통과를 보장하지 않는다.

⚠️ **cowsplits 원문 샘플 주의** — 원문 `COWCOWOWCOWCOWCOWC` 의 샘플 출력은 **3** 인데
우리 답은 **2** 다. 이건 버그가 아니라 quest 가 한 쪽을 통째로 할애해 설명하는 지점이고
(`chapters.jsx:200`), C++ 은 이 상태로 2026-08-29 에 **통과**했다. 놀라지 마시라.

⚠️ 내가 이 검증을 하면서 **테스트 생성기를 두 번 틀렸다.**
photoshoot25 는 "값은 올라가기만 한다" 는 보장을 어긴 입력을 만들었고,
cowsplits 는 S 가 `COW`/`OWC`/`WCO` 블록이라는 걸 무시하고 아무 글자나 만들었다.
둘 다 처음엔 "불일치 8건 / 386건" 이 나왔다 — **풀이가 아니라 내 시험지가 틀린 것이었다.**
제약을 안 읽고 만든 랜덤 테스트는 이렇게 가짜 경보를 낸다.

## 결과가 나오면

`USACO_VERIFICATION.md` 의 해당 줄과 각 `components.jsx` 맨 위 🔒 헤더를 같이 갱신한다.
(하나만 고치면 다음 사람이 반대쪽을 믿는다.)
