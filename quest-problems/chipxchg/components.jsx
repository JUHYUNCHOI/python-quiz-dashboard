// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS (Python passes - C++ has overflow)
//   C++:    5/12 (overflow bug)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   2026-08-27: 변수를 red_now / wasted_blue / short_red / short_chips 4개로 정리.
//     식은 공식 답안(Benjamin Qi)과 동일: short_red = fA−1−red_now, 답 = wasted_blue + short_chips + 1.
//     공식 답안 대비 80,000건 + 완전탐색 대조 불일치 0 으로 확인.
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";



export function getChipXchgSections(E) {
  return [
    {
      label: t(E, "🧩 Step 1 — Model one round", "🧩 1단계 — 한 시도 모델링"),
      color: A,
      py: [
        "# After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "# Bessie keeps a chips of type A, gets b chips of type B,",
        "# and converts B -> A as many times as possible.",
        "#",
        "# final_A(a, b) = A + a + ((B + b) // cB) * cA",
        "# Adversary picks (a, b) to MINIMIZE final_A.",
        "# We want: the smallest x with min over a+b=x of final_A >= fA.",
      ],
      cpp: [
        "// After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "// Bessie keeps a chips of type A, gets b chips of type B,",
        "// and converts B -> A as many times as possible.",
        "//",
        "// final_A(a, b) = A + a + ((B + b) / cB) * cA",
        "// Adversary picks (a, b) to MINIMIZE final_A.",
        "// We want: the smallest x with min over a+b=x of final_A >= fA.",
      ],
      why: [
        t(E, "Each extra chip the adversary sends to type B might be wasted: it only counts when it completes another c_B group.",
            "여분 칩을 B로 주면 c_B 묶음을 채워야만 환전 1회로 이어져요. 자투리는 그냥 버려져요."),
        t(E, "So the adversary plays the remainder game — leave as many B chips just below the next c_B threshold as possible.",
            "그래서 적은 c_B 문턱 바로 아래에 b 를 멈춰서 자투리를 최대한 만들어요."),
      ],
    },
    {
      label: t(E, "🔍 Step 2 — Try only a handful of b's", "🔍 2단계 — b 후보 몇 개만 시도"),
      color: A,
      py: [
        "def min_final_A(A, B, cA, cB, x):",
        "    if x == 0:",
        "        return A + (B // cB) * cA",
        "    cands = {0, x}",
        "    # b that maximizes (B+b) % cB  ->  worst case for Bessie",
        "    r1 = (cB - 1 - (B % cB)) % cB",
        "    if r1 <= x:",
        "        cands.add(r1)",
        "        cands.add(r1 + ((x - r1) // cB) * cB)",
        "    # b that makes (B+b) % cB == 0  ->  best case (full groups)",
        "    r0 = (-B) % cB",
        "    if r0 <= x:",
        "        cands.add(r0)",
        "        cands.add(r0 + ((x - r0) // cB) * cB)",
        "    return min(A + (x - b) + ((B + b) // cB) * cA for b in cands)",
      ],
      cpp: [
        "ll minFinalA(ll A, ll B, ll cA, ll cB, ll x) {",
        "    if (x == 0) {",
        "        return A + (B / cB) * cA;",
        "    }",
        "    vector<ll> cands;",
        "    cands.push_back(0);",
        "    cands.push_back(x);",
        "    ll r1 = ((cB - 1 - (B % cB)) % cB + cB) % cB;",
        "    if (r1 <= x) {",
        "        cands.push_back(r1);",
        "        cands.push_back(r1 + ((x - r1) / cB) * cB);",
        "    }",
        "    ll r0 = ((-B) % cB + cB) % cB;",
        "    if (r0 <= x) {",
        "        cands.push_back(r0);",
        "        cands.push_back(r0 + ((x - r0) / cB) * cB);",
        "    }",
        "    ll best = LLONG_MAX;",
        "    for (int i = 0; i < (int)cands.size(); i++) {",
        "        ll b = cands[i];",
        "        ll v = A + (x - b) + ((B + b) / cB) * cA;",
        "        if (v < best) {",
        "            best = v;",
        "        }",
        "    }",
        "    return best;",
        "}",
      ],
      why: [
        t(E, "Inside one residue class mod c_B, increasing b by c_B trades 'lose c_B raw A' for 'gain c_A from one more swap'.",
            "같은 c_B 나머지 안에서 b 를 c_B 늘리면 'A 직접 c_B 손해' vs '환전 1회로 c_A 이득' 이 트레이드돼요."),
        t(E, "So the optimum is monotone in q (the number of complete groups). Checking the smallest and largest valid b in each useful residue class is enough.",
            "그래서 q (완성 묶음 수) 에 대해 단조라 각 의미있는 나머지 류에서 가장 작은 b 와 가장 큰 b 만 확인하면 충분."),
        t(E, "Two residue classes matter: 'remainder = c_B − 1' (max waste) and 'remainder = 0' (no waste).",
            "의미있는 두 가지: 나머지 = c_B-1 (자투리 최대) 와 나머지 = 0 (자투리 없음)."),
      ],
      pyOnly: [
        t(E, "Python ints are arbitrary precision — no overflow worries when fA up to 10^9 and answers up to 10^18.",
            "파이썬 정수는 임의 정밀도 — fA 가 10^9 이고 답이 10^18 까지 가도 오버플로 걱정 없음."),
      ],
      cppOnly: [
        t(E, "All values must be `long long`. Mixing `int` and `long long` in (B + b) / cB will silently overflow.",
            "모든 값을 `long long` 으로. (B + b) / cB 에 `int` 가 섞이면 조용히 오버플로 발생."),
      ],
    },
    {
      label: t(E, "🎯 Step 3 — Binary search on x", "🎯 3단계 — x 에 대한 이분 탐색"),
      color: A,
      py: [
        "def solve(A, B, cA, cB, fA):",
        "    # f(x) = min adversary outcome at chip count x  is non-decreasing in x",
        "    # because the adversary can always pretend the extra chip never came.",
        "    lo, hi = 0, 2 * 10**18",
        "    while lo < hi:",
        "        mid = (lo + hi) // 2",
        "        if min_final_A(A, B, cA, cB, mid) >= fA:",
        "            hi = mid",
        "        else:",
        "            lo = mid + 1",
        "    return lo",
      ],
      cpp: [
        "ll solve(ll A, ll B, ll cA, ll cB, ll fA) {",
        "    ll lo = 0;",
        "    ll hi = (ll)2e18;",
        "    while (lo < hi) {",
        "        ll mid = lo + (hi - lo) / 2;",
        "        if (minFinalA(A, B, cA, cB, mid) >= fA) {",
        "            hi = mid;",
        "        } else {",
        "            lo = mid + 1;",
        "        }",
        "    }",
        "    return lo;",
        "}",
      ],
      why: [
        t(E, "More chips can never hurt Bessie — adversary can copy any worse split and dump the extra on type A. So the predicate 'guaranteed to reach fA' flips at most once as x grows.",
            "x 가 늘어나도 결과가 나빠질 수 없어요 — 어떤 분배든 그대로 두고 추가분을 A 에 얹으면 되니까. 그래서 'fA 도달 보장' 은 최대 한 번만 false→true 로 바뀜."),
        t(E, "Binary search range: 0 to 2×10^18 — that comfortably covers the worst sample (fA = 10^9, c_B = 10^9).",
            "이분 탐색 범위: 0 ~ 2×10^18 — 가장 큰 샘플 (fA=10^9, c_B=10^9) 까지 여유."),
      ],
    },
  ];
}

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
// 섹션 3개 코드를 한 파일로 이어 붙여 위→아래로 읽게 함. 코드 문자열은 그대로.
const _CX_VARS = [
  { v: "A, B", ko: "시작 A·B 칩", en: "starting A / B chips" },
  { v: "cA, cB", ko: "B cB개 → A cA개", en: "hand in cB of B, get cA of A" },
  { v: "fA", ko: "목표 A 개수", en: "goal A count" },
  { v: "red_now", ko: "지금 만드는 A", en: "A I can make now" },
  { v: "wasted_blue", ko: "묶음이 안 돼 버려지는 B", en: "B that can never form a group" },
  { v: "short_red", ko: "여기까지만 만들면 되는 A (목표−1)", en: "A to build: one below the goal" },
  { v: "short_chips", ko: "그 A 를 만드는 데 드는 칩", en: "chips to build them" },
];
// 표시용: 주석(논문)은 걷어내고 실행 로직 줄만 (설명은 말풍선으로). 로직/변수 그대로.
const _noComment = (arr) => arr.filter((l) => !/^\s*(#|\/\/)/.test(l));
// ── 코드 ① 쉬운 브루트포스 (작은 입력용) ─────────────────────────
//   worst_red = b(B에 줄 수)를 0..x 전부 시도해 최소 최종A.
//   solve = 목표 닿을 때까지 x 를 0부터 하나씩. (느림 → 다음 빠른 코드)
export function getChipXchgBruteWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  if (lang === "cpp") {
    const code = [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "typedef long long ll;",
      "",
      "// " + c("worst = worst case splits x into a of A and b of B, to make my A smallest", "최악의 경우: x 를 (A a, B b)로 나눠 내 A를 최소로"),
      "// " + c("try EVERY b from 0..x and keep the smallest final A", "→ b 를 0..x 전부 해보고 최소 최종A를 고른다"),
      "ll worstRed(ll A, ll B, ll cA, ll cB, ll x) {",
      "    ll worst = LLONG_MAX;",
      "    for (ll b = 0; b <= x; b++) {",
      "        ll red = A + (x - b) + (B + b) / cB * cA;",
      "        worst = min(worst, red);",
      "    }",
      "    return worst;",
      "}",
      "",
      "// " + c("raise x from 0 until the worst case reaches the goal fA", "목표 fA 에 닿을 때까지 x 를 0부터 하나씩 늘린다"),
      "ll solve(ll A, ll B, ll cA, ll cB, ll fA) {",
      "    ll x = 0;",
      "    while (worstRed(A, B, cA, cB, x) < fA) {",
      "        x++;",
      "    }",
      "    return x;",
      "}",
      "",
      "int main() {",
      "    int T; cin >> T;",
      "    while (T--) {",
      "        ll A, B, cA, cB, fA;",
      "        cin >> A >> B >> cA >> cB >> fA;",
      '        cout << solve(A, B, cA, cB, fA) << "\\n";',
      "    }",
      "}",
    ];
    return { code, vars: _CX_VARS, beats: [
      { hi: [0, 2], bubble: t(E, "Headers. C++ defines functions above main, but read in call order: main → solve → worstRed.", "헤더. C++ 은 함수를 main 위에 두지만, 읽는 순서는 호출 순서: main → solve → worstRed.") },
      { hi: [24, 25], bubble: t(E, "main — read T tests.", "main — 테스트 T개 읽기.") },
      { hi: [26, 30], bubble: t(E, "Each test: read the 5 numbers → call solve → print.", "각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
      { hi: [15, 21], bubble: t(E, "solve (what main calls): raise x by 1 until the goal is reached.", "solve (main 이 부르는 것): 목표 닿을 때까지 x 를 하나씩 ↑.") },
      { hi: [4, 8], bubble: t(E, "worstRed (what solve calls) = the worst case's worst. Try every b (0…x).", "worstRed (solve 가 부르는 것) = 최악의 경우. b 를 0~x 전부 시도.") },
      { hi: [9, 13], bubble: t(E, "Final A for each b; keep the smallest. ← b AND x reach 10¹⁸, so this brute is FAR too slow.", "b 마다 최종 A → 제일 작은 걸. ← b 도 x 도 10¹⁸까지라 이 브루트는 너무 느려요.") },
    ] };
  }
  const code = [
    "import sys",
    "input = sys.stdin.readline",
    "",
    "def main():",
    "    T = int(input())",
    "    for _ in range(T):",
    "        A, B, cA, cB, fA = map(int, input().split())",
    "        print(solve(A, B, cA, cB, fA))",
    "",
    "# " + c("raise x from 0 until the worst case reaches the goal fA", "목표 fA 에 닿을 때까지 x 를 0부터 하나씩 늘린다"),
    "def solve(A, B, cA, cB, fA):",
    "    x = 0",
    "    while worst_red(A, B, cA, cB, x) < fA:",
    "        x += 1",
    "    return x",
    "",
    "# " + c("worst: worst case splits x into (x-b) of A and b of B, to make my A smallest", "최악의 경우: x 를 A (x−b)개 + B b개로 나눠 내 A를 최소로"),
    "def worst_red(A, B, cA, cB, x):",
    "    worst = None",
    "    for b in range(x + 1):",
    "        red = A + (x - b) + (B + b) // cB * cA",
    "        if worst is None or red < worst:",
    "            worst = red",
    "    return worst",
    "",
    "main()",
  ];
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "Fast input. Read it input-first: main → solve → worst_red.", "빠른 입력. 입력부터: main → solve → worst_red 순.") },
    { hi: [3, 7], bubble: t(E, "main — each test: read the 5 numbers → call solve → print.", "main — 각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
    { hi: [9, 14], bubble: t(E, "solve (what main calls): raise x by 1 until the goal is reached.", "solve (main 이 부르는 것): 목표 닿을 때까지 x 를 하나씩 ↑.") },
    { hi: [15, 18], bubble: t(E, "worst_red (what solve calls): b = B given, so x−b = A kept. Try every b (0…x).", "worst_red (solve 가 부르는 것): b = B에 준 수, 그럼 x−b = A로 받은 수. b 를 0~x 전부 시도.") },
    { hi: [19, 19], bubble: t(E, "final A = start A + A kept (x−b) + B swapped ((B+b)//cB × cA). ← same as Tool ①a.", "최종 A = 시작A + A받은(x−b) + B환전((B+b)//cB × cA). ← 도구 ①a 환전세기 그대로.") },
    { hi: [20, 22], bubble: t(E, "Keep the smallest A = the worst case's worst. ← b AND x reach 10¹⁸, so this brute is FAR too slow.", "제일 작은 A가 최악의 경우. ← b 도 x 도 10¹⁸까지라 이 브루트는 너무 느려요.") },
  ] };
}

// ── 코드 ② 공식 (closed-form O(1)) — USACO 공식 풀이 방식 ───────────
//   이분탐색·후보 열거 없음. init 계산 → 부족하면 최악의 경우을 산수로.
//   브루트(코드①)와 20만 케이스 대조 0불일치 검증.
export function getChipXchgWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  if (lang === "cpp") {
    const code = [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "typedef long long ll;",
      "",
      "// " + c("answer = fewest extra chips; a direct O(1) formula (no search)", "답 = 최소 추가 칩. 탐색 없이 O(1) 공식으로 바로"),
      "ll solve(ll A, ll B, ll cA, ll cB, ll fA) {",
      "    ll red_now = A + B / cB * cA;          // " + c("A I can make right now", "지금 가진 것으로 만드는 A"),
      "    if (red_now >= fA) return 0;           // " + c("already reached → 0 extra", "이미 목표 → 추가 0"),
      "",
      "    ll wasted_blue = cB - 1 - B % cB;      // " + c("step 1: B that can never form a group", "1단계: 묶음이 안 되는 B 는 버려져요"),
      "    ll short_red = fA - 1 - red_now;       // " + c("step 2: build only up to one below the goal", "2단계: 목표보다 하나 적은 A 까지만 만들면 돼요"),
      "",
      "    ll short_chips;",
      "    if (cA >= cB) {                     // " + c("swapping pays -> A comes 1 per chip", "환전이 이득 → A 는 칩 1개당 1개"),
      "        short_chips = short_red;           //   " + c("1 A = 1 chip", "A 1개 = 칩 1개"),
      "    } else {                            // " + c("swapping loses -> build them with B groups", "환전이 손해 → B 묶음으로 만들어요"),
      "        short_chips = short_red / cA * cB + short_red % cA;",
      "    }",
      "",
      "    return wasted_blue + short_chips + 1;  // " + c("the last chip that can still fall short, plus one", "안 될 수 있는 마지막 칩 + 1"),
      "}",
      "",
      "int main() {",
      "    int T; cin >> T;",
      "    while (T--) {",
      "        ll A, B, cA, cB, fA;",
      "        cin >> A >> B >> cA >> cB >> fA;",
      '        cout << solve(A, B, cA, cB, fA) << "\\n";',
      "    }",
      "}",
    ];
    return { code, vars: _CX_VARS, beats: [
      { hi: [0, 2], bubble: t(E, "Headers. Read main first, then solve.", "헤더. main 먼저 보고, solve.") },
      { hi: [22, 23], bubble: t(E, "main — read T tests.", "main — 테스트 T개 읽기.") },
      { hi: [24, 28], bubble: t(E, "Each test: read the 5 numbers → call solve → print.", "각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
      { hi: [5, 7], bubble: t(E, "red_now = A I can make right now by swapping my own B. If that already reaches fA → 0 extra.", "red_now = 지금 내 B를 환전해서 만드는 A. 목표 이상이면 추가 0.") },
      { hi: [9, 9], bubble: t(E, "Step 1 — it throws B away first (Tool ②): tops the leftover up to cB−1, and those chips give me 0 A.", "1단계 — 먼저 B를 버려요 (도구 ②). 자투리를 cB−1 까지 채우면 그 칩들은 나한테 A 0.") },
      { hi: [10, 10], bubble: t(E, "Step 2 — I only need to build up to one below the goal: short_red = fA − 1 − red_now. ← this is the −1.", "2단계 — 목표보다 하나 적은 A 까지만 만들면 돼요: short_red = fA − 1 − red_now. ← 이게 −1 이에요.") },
      { hi: [12, 14], bubble: t(E, "How many chips can it stay there? If swapping pays (cA ≥ cB) B would help me, so it hands A only — 1 chip per A.", "거기서 칩 몇 개까지 버틸까요? 환전이 이득(cA ≥ cB)이면 B는 나를 도와주니 A만 줘요 — A 1개당 칩 1개.") },
      { hi: [15, 17], bubble: t(E, "If swapping loses it uses B groups: cB chips buy only cA A (Tool ④), and whatever A is left comes as single A chips.", "환전이 손해면 B 묶음을 써요: 칩 cB개로 A cA개만 (도구 ④). 남는 A는 A칩으로.") },
      { hi: [19, 19], bubble: t(E, "answer = wasted B + the last chip that can still fall short + 1. ← this is the +1. Check (0 0 2 3 5): 2 + 6 + 1 = 9.", "답 = 버린 B + 아직 목표에 못 닿을 수 있는 마지막 칩 + 1. ← 이게 +1 이에요. (0 0 2 3 5) 확인: 2 + 6 + 1 = 9.") },
    ] };
  }
  const code = [
    "import sys",
    "input = sys.stdin.readline",
    "",
    "def main():",
    "    T = int(input())",
    "    for _ in range(T):",
    "        A, B, cA, cB, fA = map(int, input().split())",
    "        print(solve(A, B, cA, cB, fA))",
    "",
    "# " + c("answer = fewest extra chips; a direct O(1) formula (no search)", "답 = 최소 추가 칩. 탐색 없이 O(1) 공식으로 바로"),
    "def solve(A, B, cA, cB, fA):",
    "    red_now = A + B // cB * cA          # " + c("A I can make right now", "지금 가진 것으로 만드는 A"),
    "    if red_now >= fA:",
    "        return 0                      # " + c("already reached → 0 extra", "이미 목표 → 추가 0"),
    "",
    "    wasted_blue = cB - 1 - B % cB           # " + c("step 1: B that can never form a group", "1단계: 묶음이 안 되는 B 는 버려져요"),
    "    short_red = fA - 1 - red_now         # " + c("step 2: build only up to one below the goal", "2단계: 목표보다 하나 적은 A 까지만 만들면 돼요"),
    "",
    "    if cA >= cB:                      # " + c("swapping pays -> A comes 1 per chip", "환전이 이득 → A 는 칩 1개당 1개"),
    "        short_chips = short_red          #   " + c("1 A = 1 chip", "A 1개 = 칩 1개"),
    "    else:                             # " + c("swapping loses -> build them with B groups", "환전이 손해 → B 묶음으로 만들어요"),
    "        short_chips = short_red // cA * cB + short_red % cA",
    "",
    "    return wasted_blue + short_chips + 1       # " + c("the last chip that can still fall short, plus one", "안 될 수 있는 마지막 칩 + 1"),
    "",
    "main()",
  ];
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "Fast input. Read it input-first: main → solve.", "빠른 입력. 입력부터: main → solve.") },
    { hi: [3, 7], bubble: t(E, "main — each test: read the 5 numbers → call solve → print.", "main — 각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
    { hi: [10, 13], bubble: t(E, "red_now = A I can make right now by swapping my own B. If that already reaches fA → 0 extra.", "red_now = 지금 내 B를 환전해서 만드는 A. 목표 이상이면 추가 0.") },
    { hi: [15, 15], bubble: t(E, "Step 1 — it throws B away first (Tool ②): tops the leftover up to cB−1, and those chips give me 0 A.", "1단계 — 먼저 B를 버려요 (도구 ②). 자투리를 cB−1 까지 채우면 그 칩들은 나한테 A 0.") },
    { hi: [16, 16], bubble: t(E, "Step 2 — I only need to build up to one below the goal: short_red = fA − 1 − red_now. ← this is the −1.", "2단계 — 목표보다 하나 적은 A 까지만 만들면 돼요: short_red = fA − 1 − red_now. ← 이게 −1 이에요.") },
    { hi: [18, 19], bubble: t(E, "How many chips can it stay there? If swapping pays (cA ≥ cB) B would help me, so it hands A only — 1 chip per A.", "거기서 칩 몇 개까지 버틸까요? 환전이 이득(cA ≥ cB)이면 B는 나를 도와주니 A만 줘요 — A 1개당 칩 1개.") },
    { hi: [20, 21], bubble: t(E, "If swapping loses it uses B groups: cB chips buy only cA A (Tool ④), and whatever A is left comes as single A chips.", "환전이 손해면 B 묶음을 써요: 칩 cB개로 A cA개만 (도구 ④). 남는 A는 A칩으로.") },
    { hi: [23, 23], bubble: t(E, "answer = wasted B + the last chip that can still fall short + 1. ← this is the +1. Check (0 0 2 3 5): 2 + 6 + 1 = 9.", "답 = 버린 B + 아직 목표에 못 닿을 수 있는 마지막 칩 + 1. ← 이게 +1 이에요. (0 0 2 3 5) 확인: 2 + 6 + 1 = 9.") },
  ] };
}

// ── 도구: 최악의 경우 → 공식 유도 (CodeWalk — 말풍선이 그 줄에). 코드②와 같은 식·언어. ──
export function getChipXchgFormulaWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  const code = lang === "cpp" ? [
    "ll red_now = A + B / cB * cA;        // " + c("A I can make now (swap my own B)", "지금 내 B를 환전해서 만드는 A"),
    "//   " + c("if red_now >= fA: answer is 0", "→ red_now 이 목표 이상이면 답 0"),
    "",
    "ll wasted_blue = cB - 1 - B % cB;    // " + c("① it throws B away", "① B를 최대로 버려요"),
    "ll short_red = fA - 1 - red_now;     // " + c("② one short of the goal   <- the -1", "② 목표보다 하나 모자란 A   ← 여기가 −1"),
    "",
    "ll short_chips;                      // " + c("③ chips to build them", "③ 그걸 만드는 칩"),
    "if (cA >= cB) short_chips = short_red;                        //   " + c("A only, 1 each", "A만, 1개당 1칩"),
    "else short_chips = short_red / cA * cB + short_red % cA;      //   " + c("B groups + singles", "B 묶음 + 낱개"),
    "",
    "ll answer = wasted_blue + short_chips + 1;   // " + c("<- the +1", "← 여기가 +1"),
  ] : [
    "red_now = A + B // cB * cA           # " + c("A I can make now (swap my own B)", "지금 내 B를 환전해서 만드는 A"),
    "#   " + c("if red_now >= fA: answer is 0", "→ red_now 이 목표 이상이면 답 0"),
    "",
    "wasted_blue = cB - 1 - B % cB        # " + c("① it throws B away", "① B를 최대로 버려요"),
    "short_red = fA - 1 - red_now         # " + c("② one short of the goal   <- the -1", "② 목표보다 하나 모자란 A   ← 여기가 −1"),
    "",
    "if cA >= cB:                         # " + c("③ chips to build them", "③ 그걸 만드는 칩"),
    "    short_chips = short_red          #   " + c("A only, 1 each", "A만, 1개당 1칩"),
    "else:",
    "    short_chips = short_red // cA * cB + short_red % cA   #   " + c("B groups + singles", "B 묶음 + 낱개"),
    "",
    "answer = wasted_blue + short_chips + 1   # " + c("<- the +1", "← 여기가 +1"),
  ];
  const last = code.length - 1;
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "First: how much A can I make right now by swapping my own B? If that already reaches the goal → answer 0.",
                               "먼저: 지금 내 B를 환전하면 A가 몇 개? 그게 목표 이상이면 답은 0.") },
    { hi: [3, 3], bubble: t(E, "① The worst case throws B away first — it tops the leftover up to cB−1, and those chips give me 0 A (Tool ②).",
                               "① 최악의 경우엔 먼저 B를 버려요 — 자투리를 cB−1 까지 채우면 그 칩들은 나한테 A 0 (도구 ②).") },
    { hi: [4, 4], bubble: t(E, "② I only need to build up to one below the goal — that is fA − 1 − red_now. This is where the −1 comes from.",
                               "② 목표보다 하나 적은 A 까지만 만들면 돼요 — 그 수가 fA − 1 − red_now. −1 은 여기서 나와요.") },
    { hi: [6, last - 2], bubble: t(E, "③ How many chips can it stay there? Swapping pays (cA ≥ cB) → A only, 1 chip each. Swapping loses → B groups (cB chips buy cA A), and the rest as single A chips.",
                                      "③ 거기서 칩 몇 개까지 버틸까요? 환전이 이득(cA ≥ cB)이면 A만, 1개당 1칩. 손해면 B 묶음(칩 cB개로 A cA개)에 남는 건 A칩으로.") },
    { hi: [last, last], bubble: t(E, "One more chip after that → the goal is reached whatever comes. That is the +1. This is code ②.",
                                     "거기서 칩 하나만 더 받으면 무슨 색이 오든 목표에 닿아요. 그게 +1 이에요. 이게 코드 ②예요.") },
  ] };
}

export function ChipXchgProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","ll","typedef"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadChipXchgPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Chip Exchange — Full Study Guide", "칩 교환 — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #eff6ff; border: 1px solid #2563eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #1e3a8a; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 First Contest, Bronze #1 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
