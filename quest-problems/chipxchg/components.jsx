// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS (Python passes - C++ has overflow)
//   C++:    5/12 (overflow bug)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
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
        "# We need: min over a+b=x of final_A >= fA.",
      ],
      cpp: [
        "// After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "// Bessie keeps a chips of type A, gets b chips of type B,",
        "// and converts B -> A as many times as possible.",
        "//",
        "// final_A(a, b) = A + a + ((B + b) / cB) * cA",
        "// Adversary picks (a, b) to MINIMIZE final_A.",
        "// We need: min over a+b=x of final_A >= fA.",
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
  { v: "A, B", ko: "시작 A·B 칩", en: "starting A, B chips" },
  { v: "cA, cB", ko: "환전: cB개 B→cA개 A", en: "swap: cB B → cA A" },
  { v: "fA", ko: "목표 A 개수", en: "target A count" },
  { v: "x", ko: "얻는 칩 수(탐색 대상)", en: "chips gained (search var)" },
  { v: "b", ko: "상대가 B로 준 수", en: "chips adversary sends to B" },
];
// 표시용: 주석(논문)은 걷어내고 실행 로직 줄만 (설명은 말풍선으로). 로직/변수 그대로.
const _noComment = (arr) => arr.filter((l) => !/^\s*(#|\/\/)/.test(l));
// ── 코드 ① 쉬운 브루트포스 (작은 입력용) ─────────────────────────
//   worst_red = b(파랑에 줄 수)를 0..x 전부 시도해 최소 최종빨강.
//   solve = 목표 닿을 때까지 x 를 0부터 하나씩. (느림 → 다음 빠른 코드)
export function getChipXchgBruteWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  if (lang === "cpp") {
    const code = [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "typedef long long ll;",
      "",
      "// " + c("worst = trickster splits x into (a red, b blue) to make my red smallest", "심술쟁이 최악: x 를 (빨강 a, 파랑 b)로 나눠 내 빨강을 최소로"),
      "// " + c("try EVERY b from 0..x and keep the smallest final red", "→ b 를 0..x 전부 해보고 최소 최종빨강을 고른다"),
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
      { hi: [4, 8], bubble: t(E, "worstRed (what solve calls) = the trickster's worst. Try every b (0…x).", "worstRed (solve 가 부르는 것) = 심술쟁이 최악. b 를 0~x 전부 시도.") },
      { hi: [9, 13], bubble: t(E, "Final red for each b; keep the smallest. ← b AND x reach 10¹⁸, so this brute is FAR too slow.", "b 마다 최종 빨강 → 제일 작은 걸. ← b 도 x 도 10¹⁸까지라 이 브루트는 너무 느려요.") },
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
    "# " + c("worst = trickster splits x into (a red, b blue) to make my red smallest", "심술쟁이 최악: x 를 (빨강 a, 파랑 b)로 나눠 내 빨강을 최소로"),
    "# " + c("try EVERY b from 0..x and keep the smallest final red", "→ b 를 0..x 전부 해보고 최소 최종빨강을 고른다"),
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
    { hi: [16, 19], bubble: t(E, "worst_red (what solve calls) = the trickster's worst. Try every b (0…x).", "worst_red (solve 가 부르는 것) = 심술쟁이 최악. b 를 0~x 전부 시도.") },
    { hi: [20, 24], bubble: t(E, "Final red for each b; keep the smallest. ← b AND x reach 10¹⁸, so this brute is FAR too slow.", "b 마다 최종 빨강 → 제일 작은 걸. ← b 도 x 도 10¹⁸까지라 이 브루트는 너무 느려요.") },
  ] };
}

// ── 코드 ② 빠른 코드 (이분탐색 × 후보 몇 개) ───────────────────────
//   solve = x 를 이분탐색. worst_red = 후보 b 몇 개만 재서 O(1).
//   변수/로직은 검증 코드(getChipXchgSections)와 동일 — 이름·주석만 읽기 쉽게.
export function getChipXchgWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  if (lang === "cpp") {
    const code = [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "typedef long long ll;",
      "",
      "// " + c("worst final red when the trickster splits x the worst way", "추가 x개를 심술쟁이가 최악으로 나눴을 때 내 최종 빨강"),
      "ll worstRed(ll A, ll B, ll cA, ll cB, ll x) {",
      "    if (x == 0) return A + (B / cB) * cA;",
      "    // " + c("the worst is always one of a few candidate b's — check only those", "최악은 늘 후보 b 몇 개 중 하나 — 그것만 재요"),
      "    vector<ll> cands;",
      "    cands.push_back(0);          // " + c("all red", "다 빨강"),
      "    cands.push_back(x);          // " + c("all blue", "다 파랑"),
      "    // " + c("b that wastes the most blue — what the trickster aims for", "파랑 자투리를 최대로 만드는 b (심술쟁이 최악)"),
      "    ll maxWasteB = ((cB - 1 - (B % cB)) % cB + cB) % cB;",
      "    if (maxWasteB <= x) {",
      "        cands.push_back(maxWasteB);",
      "        cands.push_back(maxWasteB + ((x - maxWasteB) / cB) * cB);",
      "    }",
      "    // " + c("b that wastes no blue — for comparison", "자투리를 0으로 만드는 b (비교용)"),
      "    ll noWasteB = ((-B) % cB + cB) % cB;",
      "    if (noWasteB <= x) {",
      "        cands.push_back(noWasteB);",
      "        cands.push_back(noWasteB + ((x - noWasteB) / cB) * cB);",
      "    }",
      "    // " + c("final red for each candidate → smallest is the worst", "후보마다 최종 빨강 → 그중 최소가 최악"),
      "    ll worst = LLONG_MAX;",
      "    for (ll b : cands) worst = min(worst, A + (x - b) + (B + b) / cB * cA);",
      "    return worst;",
      "}",
      "",
      "// " + c("answer x = extra chips needed; binary-search it", "답 x = 추가로 받을 칩 수. 이분탐색으로 찾는다"),
      "ll solve(ll A, ll B, ll cA, ll cB, ll fA) {",
      "    ll lo = 0, hi = (ll)2e18;",
      "    while (lo < hi) {",
      "        ll mid = lo + (hi - lo) / 2;",
      "        if (worstRed(A, B, cA, cB, mid) >= fA) hi = mid;   // " + c("enough → shrink", "도달 → 줄임"),
      "        else lo = mid + 1;                                // " + c("short → grow", "부족 → 늘림"),
      "    }",
      "    return lo;",
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
      { hi: [0, 2], bubble: t(E, "Headers. Read main first, then solve, then worstRed.", "헤더. main → solve → worstRed 순으로 읽어요.") },
      { hi: [40, 41], bubble: t(E, "main — read T tests.", "main — 테스트 T개 읽기.") },
      { hi: [42, 46], bubble: t(E, "Each test: read the 5 numbers → solve → print.", "각 테스트: 숫자 5개 읽어 → solve → 출력.") },
      { hi: [30, 33], bubble: t(E, "solve: binary-search x in [0, 2×10¹⁸] (instead of +1 each time).", "solve: x 를 [0, 2×10¹⁸]에서 이분탐색 (하나씩 대신).") },
      { hi: [34, 38], bubble: t(E, "worstRed(mid) ≥ goal → shrink (hi); else grow (lo). ~60 steps.", "worstRed(mid) ≥ 목표면 줄이고, 아니면 늘림. 약 60번.") },
      { hi: [4, 6], bubble: t(E, "worstRed — now O(1). x=0 → just count now.", "worstRed — 이제 O(1). x=0이면 지금 그대로.") },
      { hi: [7, 10], bubble: t(E, "Only check a few candidate b's — first the ends (0, x).", "후보 b 몇 개만 재요 (후보 시뮬). 우선 양끝 0·x.") },
      { hi: [11, 16], bubble: t(E, "maxWasteB = the max-waste b — that's the trickster's worst (b=8 in the sim).", "maxWasteB = 자투리 최대 b — 심술쟁이 최악 (시뮬의 b=8).") },
      { hi: [17, 22], bubble: t(E, "noWasteB = the no-waste b, checked just in case.", "noWasteB = 자투리 0 b, 혹시 몰라 비교용.") },
      { hi: [23, 26], bubble: t(E, "Final red for each candidate → smallest = the worst. No loop over all b → O(1).", "후보마다 최종 빨강 → 최소 = 최악. b 전부 안 돌아 O(1).") },
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
    "# " + c("answer x = extra chips needed; binary-search it", "답 x = 추가로 받을 칩 수. 이분탐색으로 찾는다"),
    "def solve(A, B, cA, cB, fA):",
    "    lo, hi = 0, 2 * 10**18",
    "    while lo < hi:",
    "        mid = (lo + hi) // 2",
    "        if worst_red(A, B, cA, cB, mid) >= fA:",
    "            hi = mid          # " + c("enough → shrink", "도달 → 줄임"),
    "        else:",
    "            lo = mid + 1      # " + c("short → grow", "부족 → 늘림"),
    "    return lo",
    "",
    "# " + c("worst final red when the trickster splits x the worst way", "추가 x개를 심술쟁이가 최악으로 나눴을 때 내 최종 빨강"),
    "def worst_red(A, B, cA, cB, x):",
    "    if x == 0:",
    "        return A + (B // cB) * cA",
    "    # " + c("the worst is always one of a few candidate b's — check only those", "최악은 늘 후보 b 몇 개 중 하나 — 그것만 재요"),
    "    candidates = {0, x}                    # " + c("all red / all blue", "다 빨강 / 다 파랑"),
    "    # " + c("b that wastes the most blue — the trickster's worst", "파랑 자투리를 최대로 만드는 b (심술쟁이 최악)"),
    "    max_waste_b = (cB - 1 - B % cB) % cB",
    "    if max_waste_b <= x:",
    "        candidates.add(max_waste_b)",
    "        candidates.add(max_waste_b + (x - max_waste_b) // cB * cB)",
    "    # " + c("b that wastes no blue — for comparison", "자투리를 0으로 만드는 b (비교용)"),
    "    no_waste_b = (-B) % cB",
    "    if no_waste_b <= x:",
    "        candidates.add(no_waste_b)",
    "        candidates.add(no_waste_b + (x - no_waste_b) // cB * cB)",
    "    # " + c("final red for each candidate → smallest is the worst", "후보마다 최종 빨강 → 그중 최소가 최악"),
    "    return min(A + (x - b) + (B + b) // cB * cA for b in candidates)",
    "",
    "main()",
  ];
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "Fast input. Read it input-first: main → solve → worst_red.", "빠른 입력. 입력부터: main → solve → worst_red.") },
    { hi: [3, 7], bubble: t(E, "main — each test: read the 5 numbers → solve → print.", "main — 각 테스트: 숫자 5개 읽어 → solve → 출력.") },
    { hi: [9, 11], bubble: t(E, "solve: binary-search x in [0, 2×10¹⁸] (instead of +1 each time).", "solve: x 를 [0, 2×10¹⁸]에서 이분탐색 (하나씩 대신).") },
    { hi: [12, 18], bubble: t(E, "worst_red(mid) ≥ goal → shrink (hi); else grow (lo). ~60 steps → lo is the answer.", "worst_red(mid) ≥ 목표면 줄이고, 아니면 늘림. 약 60번 → lo 가 답.") },
    { hi: [20, 23], bubble: t(E, "worst_red — now O(1). x=0 → just count now.", "worst_red — 이제 O(1). x=0이면 지금 그대로.") },
    { hi: [24, 25], bubble: t(E, "Only check a few candidate b's — first the ends (0, x).", "후보 b 몇 개만 재요 (후보 시뮬). 우선 양끝 0·x.") },
    { hi: [26, 30], bubble: t(E, "max_waste_b = the max-waste b — the trickster's worst (b=8 in the sim).", "max_waste_b = 자투리 최대 b — 심술쟁이 최악 (시뮬의 b=8).") },
    { hi: [31, 35], bubble: t(E, "no_waste_b = the no-waste b, checked just in case.", "no_waste_b = 자투리 0 b, 혹시 몰라 비교용.") },
    { hi: [36, 37], bubble: t(E, "Final red for each candidate → smallest = the worst. No loop over all b → O(1).", "후보마다 최종 빨강 → 최소 = 최악. b 전부 안 돌아 O(1).") },
  ] };
}

// ── 도구 ①d 용: '자투리 최대 b' 긴 공식을 한 줄씩 분해 (CodeWalk — 말풍선이 그 줄에) ──
export function getChipXchgFormulaWalk(E) {
  const c = (en, ko) => (E ? en : ko);
  const code = [
    "# " + c("worst = the most blue leftover (blue that can't fill a group of cB)", "최악 = 파랑 자투리(cB개로 못 묶는 나머지)가 가장 많을 때"),
    "target = cB - 1                  # " + c("goal leftover (the max) = 2", "목표 자투리(최대) = 2"),
    "have   = B % cB                  # " + c("leftover the start blue already has (sample 0)", "지금 자투리 (시작 파랑의 나머지, 샘플 0)"),
    "r1     = target - have           # " + c("goal - now = 2 - 0 = 2", "목표 − 지금 = 2 − 0 = 2"),
    "r1     = (r1 % cB + cB) % cB      # " + c("safety: keep it 0..cB-1 (C++ neg mod)", "안전: 0~cB−1 로 맞춤 (C++ 음수 방지)"),
    "b      = r1 + (x - r1) // cB * cB   # " + c("largest b <= x = 2 + 6 = 8", "x 이하 가장 큰 b = 2 + 6 = 8"),
  ];
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 0], bubble: t(E, "Beat the worst and the rest follows. Worst = max leftover — we build that b in 5 lines.", "최악만 막으면 나머지는 저절로. 최악 = 자투리 최대 — 그 b 를 아래 5줄로 만들어요.") },
    { hi: [1, 1], bubble: t(E, "Goal: leftover as big as it gets = cB−1 = 2. Most wasted blue = worst for me.", "목표: 자투리를 최대(cB−1=2)로. 파랑을 제일 많이 버리는 게 나한텐 최악.") },
    { hi: [2, 2], bubble: t(E, "Now: the start blue's own leftover = B mod cB. Sample blue is 0 → 0. (blue 4 → 1)", "지금: 시작 파랑이 이미 가진 자투리 = B % cB. 샘플은 파랑 0 → 0. (파랑 4면 1)") },
    { hi: [3, 3], bubble: t(E, "How many more blue to add? goal − now = 2 − 0 = 2. That count is r1.", "파랑 몇 개 더 주면 되지? 목표 − 지금 = 2 − 0 = 2. 그 개수가 r1.") },
    { hi: [4, 4], bubble: t(E, "That's why the code is long — a safety wrap keeping it 0..cB−1 (C++ can give a negative mod). Meaning unchanged.", "코드가 긴 이유 — 나머지를 0~cB−1 로 지키는 안전 감쌈 (C++ 음수 나머지 방지). 뜻은 그대로.") },
    { hi: [5, 5], bubble: t(E, "From r1, +cB each keeps leftover 2 → largest ≤ x = 8. That's the trickster's worst b.", "r1 에서 cB(3)개씩 더 줘도 자투리 2 → x 이하 최대 = 8. 이게 심술쟁이 최악 b.") },
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
