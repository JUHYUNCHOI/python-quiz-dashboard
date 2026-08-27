// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS (Python passes - C++ has overflow)
//   C++:    5/12 (overflow bug)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   2026-08-27: to_fill 을 3분기 → 2분기로 (missing + eaten*(cB−cA)). 답은 그대로 —
//     m=1..300 × cA,cB=1..39 전수 + 랜덤 40,000건 완전탐색 대조 모두 불일치 0 으로 동치 확인.
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
        "# We to_fill: min over a+b=x of final_A >= fA.",
      ],
      cpp: [
        "// After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "// Bessie keeps a chips of type A, gets b chips of type B,",
        "// and converts B -> A as many times as possible.",
        "//",
        "// final_A(a, b) = A + a + ((B + b) / cB) * cA",
        "// Adversary picks (a, b) to MINIMIZE final_A.",
        "// We to_fill: min over a+b=x of final_A >= fA.",
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
  { v: "red_now", ko: "지금 만드는 빨강", en: "red I can make now" },
  { v: "missing", ko: "모자란 빨강 (목표−지금)", en: "red still missing" },
  { v: "wasted_blue", ko: "심술쟁이가 버리는 파랑", en: "blue the trickster wastes" },
  { v: "eaten", ko: "묶음마다 먹히는 칩 수", en: "chips eaten per group" },
  { v: "to_fill", ko: "채우는 데 드는 칩", en: "chips to fill" },
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
    "# " + c("worst: trickster splits x into (x-b) red + b blue, to make my red smallest", "심술쟁이 최악: x 를 빨강 (x−b)개 + 파랑 b개로 나눠 내 빨강을 최소로"),
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
    { hi: [15, 18], bubble: t(E, "worst_red (what solve calls): b = blue given, so x−b = red kept. Try every b (0…x).", "worst_red (solve 가 부르는 것): b = 파랑에 준 수, 그럼 x−b = 빨강으로 받은 수. b 를 0~x 전부 시도.") },
    { hi: [19, 19], bubble: t(E, "final red = start A + red kept (x−b) + blue swapped ((B+b)//cB × cA). ← same as Tool ①a.", "최종 빨강 = 시작A + 빨강받은(x−b) + 파랑환전((B+b)//cB × cA). ← 도구 ①a 환전세기 그대로.") },
    { hi: [20, 22], bubble: t(E, "Keep the smallest red = the trickster's worst. ← b AND x reach 10¹⁸, so this brute is FAR too slow.", "제일 작은 빨강이 심술쟁이 최악. ← b 도 x 도 10¹⁸까지라 이 브루트는 너무 느려요.") },
  ] };
}

// ── 코드 ② 공식 (closed-form O(1)) — USACO 공식 풀이 방식 ───────────
//   이분탐색·후보 열거 없음. init 계산 → 부족하면 심술쟁이 최악을 산수로.
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
      "    ll red_now = A + B / cB * cA;          // " + c("red I can make right now", "지금 가진 것으로 만드는 빨강"),
      "    if (red_now >= fA) return 0;           // " + c("already reached → 0 extra", "이미 목표 → 추가 0"),
      "    ll missing = fA - red_now;             // " + c("red still missing: goal − now", "모자란 빨강: 목표 − 지금"),
      "    ll wasted_blue = cB - 1 - B % cB;         // " + c("trickster step 1: waste blue to the max", "심술쟁이 1: 파랑을 최대로 버림 (자투리 cB−1)"),
      "    ll to_fill;",
      "    if (cA >= cB) {                     // " + c("swap pays -> trickster hands red only", "환전이 이득 → 심술쟁이는 빨강만 줌"),
      "        to_fill = missing;                 //   " + c("1 red = 1 chip", "빨강 1개 = 칩 1개"),
      "    } else {                            // " + c("swap loses -> trickster stalls with blue groups", "환전이 손해 → 심술쟁이는 파랑 묶음으로 끌기"),
      "        ll eaten = (missing - 1) / cA;     //   " + c("how many groups it can still run", "묶음을 몇 번 돌릴 수 있나"),
      "        to_fill = missing + eaten * (cB - cA);  //   " + c("chips needed + chips eaten per group", "필요한 칩 + 묶음마다 먹히는 칩"),
      "    }",
      "    return wasted_blue + to_fill;                // " + c("wasted blue + chips to fill", "버린 파랑 + 채우는 데 든 칩"),
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
      { hi: [20, 21], bubble: t(E, "main — read T tests.", "main — 테스트 T개 읽기.") },
      { hi: [22, 26], bubble: t(E, "Each test: read the 5 numbers → call solve → print.", "각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
      { hi: [5, 7], bubble: t(E, "red_now = red I can make now (convert my blue). If it already reaches fA → 0 extra.", "red_now = 지금 가진 걸로 만드는 빨강 (내 파랑 환전). 목표 이상이면 추가 0.") },
      { hi: [8, 9], bubble: t(E, "missing = red still needed (goal − now). waste = blue the trickster throws away — it fills the leftover to cB−1, and those chips give me 0 red.", "missing = 모자란 빨강 (목표 − 지금). waste = 심술쟁이가 버리는 파랑 — 자투리를 cB−1 까지 채워요. 그 칩들은 나한테 빨강 0.") },
      { hi: [11, 12], bubble: t(E, "Case 1 — swapping pays (cA ≥ cB). Then blue would help me, so the trickster hands red only: 1 red per chip.", "경우 1 — 환전이 이득 (cA ≥ cB). 파랑은 나를 도와주니 심술쟁이는 빨강만 줘요: 칩 1개 = 빨강 1개.") },
      { hi: [13, 15], bubble: t(E, "Case 2 — swapping loses, so the trickster stalls with blue groups (Tool ④): every group it runs eats cB − cA chips. It can run (missing−1)//cA of them, so I hand over that many extra on top of `missing`.", "경우 2 — 환전이 손해라 심술쟁이는 파랑 묶음으로 끌어요 (도구 ④). 묶음 한 번마다 칩 cB − cA 개가 먹혀요. 묶음은 (missing−1)//cA 번 돌릴 수 있으니, missing 개 위에 그만큼 더 얹어 줍니다.") },
      { hi: [17, 17], bubble: t(E, "answer = wasted blue + chips to fill. Check (0 0 2 3 5): missing 5, wasted_blue 2, eaten = 4//2 = 2 → to_fill = 5 + 2×1 = 7, so 2 + 7 = 9. One calculation, O(1).", "답 = 버린 파랑 + 채우는 데 든 칩. (0 0 2 3 5) 로 확인: missing 5, wasted_blue 2, eaten = 4//2 = 2 → to_fill = 5 + 2×1 = 7, 그래서 2 + 7 = 9. 계산 한 번, O(1).") },
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
    "    red_now = A + B // cB * cA          # " + c("red I can make right now", "지금 가진 것으로 만드는 빨강"),
    "    if red_now >= fA:",
    "        return 0                      # " + c("already reached → 0 extra", "이미 목표 → 추가 0"),
    "    missing = fA - red_now               # " + c("red still missing: goal − now", "모자란 빨강: 목표 − 지금"),
    "    wasted_blue = cB - 1 - B % cB           # " + c("trickster 1: waste blue to the max", "심술쟁이 1: 파랑을 최대로 버림 (자투리 cB−1)"),
    "",
    "    if cA >= cB:                      # " + c("swap pays -> trickster hands red only", "환전이 이득 → 심술쟁이는 빨강만 줌"),
    "        to_fill = missing                #   " + c("1 red = 1 chip", "빨강 1개 = 칩 1개"),
    "    else:                             # " + c("swap loses -> trickster stalls with blue groups", "환전이 손해 → 심술쟁이는 파랑 묶음으로 끌기"),
    "        eaten = (missing - 1) // cA      #   " + c("how many groups it can still run", "묶음을 몇 번 돌릴 수 있나"),
    "        to_fill = missing + eaten * (cB - cA)   #   " + c("chips needed + chips eaten per group", "필요한 칩 + 묶음마다 먹히는 칩"),
    "",
    "    return wasted_blue + to_fill               # " + c("wasted blue + chips to fill", "버린 파랑 + 채우는 데 든 칩"),
    "",
    "main()",
  ];
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 1], bubble: t(E, "Fast input. Read it input-first: main → solve.", "빠른 입력. 입력부터: main → solve.") },
    { hi: [3, 7], bubble: t(E, "main — each test: read the 5 numbers → call solve → print.", "main — 각 테스트: 숫자 5개 읽어 → solve 호출 → 출력.") },
    { hi: [9, 13], bubble: t(E, "red_now = red I can make now (convert my blue). If it already reaches fA → 0 extra.", "red_now = 지금 가진 걸로 만드는 빨강 (내 파랑 환전). 목표 이상이면 추가 0.") },
    { hi: [14, 15], bubble: t(E, "missing = red still needed (goal − now). waste = blue the trickster throws away — it fills the leftover to cB−1, and those chips give me 0 red.", "missing = 모자란 빨강 (목표 − 지금). waste = 심술쟁이가 버리는 파랑 — 자투리를 cB−1 까지 채워요. 그 칩들은 나한테 빨강 0.") },
    { hi: [17, 18], bubble: t(E, "Case 1 — swapping pays (cA ≥ cB). Then blue would help me, so the trickster hands red only: 1 red per chip.", "경우 1 — 환전이 이득 (cA ≥ cB). 파랑은 나를 도와주니 심술쟁이는 빨강만 줘요: 칩 1개 = 빨강 1개.") },
    { hi: [19, 21], bubble: t(E, "Case 2 — swapping loses, so the trickster stalls with blue groups (Tool ④): every group it runs eats cB − cA chips. It can run (missing−1)//cA of them, so I hand over that many extra on top of `missing`.", "경우 2 — 환전이 손해라 심술쟁이는 파랑 묶음으로 끌어요 (도구 ④). 묶음 한 번마다 칩 cB − cA 개가 먹혀요. 묶음은 (missing−1)//cA 번 돌릴 수 있으니, missing 개 위에 그만큼 더 얹어 줍니다.") },
    { hi: [23, 23], bubble: t(E, "answer = wasted blue + chips to fill. Check (0 0 2 3 5): missing 5, wasted_blue 2, eaten = 4//2 = 2 → to_fill = 5 + 2×1 = 7, so 2 + 7 = 9. One calculation, O(1).", "답 = 버린 파랑 + 채우는 데 든 칩. (0 0 2 3 5) 로 확인: missing 5, wasted_blue 2, eaten = 4//2 = 2 → to_fill = 5 + 2×1 = 7, 그래서 2 + 7 = 9. 계산 한 번, O(1).") },
  ] };
}

// ── 도구: 심술쟁이 최악 → 공식 유도 (CodeWalk — 말풍선이 그 줄에). 코드②와 같은 식·언어. ──
export function getChipXchgFormulaWalk(E, lang = "py") {
  const c = (en, ko) => (E ? en : ko);
  const code = lang === "cpp" ? [
    "// " + c("first: can I reach the goal with what I have now?", "먼저: 지금 가진 걸로 목표에 닿나?"),
    "ll red_now = A + B / cB * cA;        // " + c("red I can make now (convert my blue)", "지금 가진 걸로 만드는 빨강 (내 파랑 환전)"),
    "//   " + c("if red_now >= fA: answer is 0", "→ red_now 이 목표 이상이면 답 0"),
    "ll missing = fA - red_now;           // " + c("red still missing: goal − now", "모자란 빨강: 목표 − 지금"),
    "ll wasted_blue = cB - 1 - B % cB;   // " + c("trickster step 1: waste blue to the max (leftover cB-1)", "심술쟁이 1단계: 파랑을 최대로 버림 (자투리 cB−1)"),
    "ll to_fill;                          // " + c("trickster step 2: fill with the least-helpful color", "심술쟁이 2단계: 가장 덜 도와주는 색으로 채움"),
    "if (cA >= cB) to_fill = missing;                         //   " + c("swap pays → red (1 each)", "환전 이득 → 빨강 (1개당 1)"),
    "else {                                                   //   " + c("swap loses → stall with blue groups", "환전 손해 → 파랑 묶음으로 끌기"),
    "    ll eaten = (missing - 1) / cA;                       //     " + c("how many groups it can run", "묶음을 몇 번 돌릴 수 있나"),
    "    to_fill = missing + eaten * (cB - cA);               //     " + c("chips needed + chips eaten per group", "필요한 칩 + 묶음마다 먹히는 칩"),
    "}",
    "ll answer = wasted_blue + to_fill;",
  ] : [
    "# " + c("first: can I reach the goal with what I have now?", "먼저: 지금 가진 걸로 목표에 닿나?"),
    "red_now = A + B // cB * cA           # " + c("red I can make now (convert my blue)", "지금 가진 걸로 만드는 빨강 (내 파랑 환전)"),
    "#   " + c("if red_now >= fA: answer is 0", "→ red_now 이 목표 이상이면 답 0"),
    "missing = fA - red_now               # " + c("red still missing: goal − now", "모자란 빨강: 목표 − 지금"),
    "wasted_blue = cB - 1 - B % cB           # " + c("trickster step 1: waste blue to the max (leftover cB-1)", "심술쟁이 1단계: 파랑을 최대로 버림 (자투리 cB−1)"),
    "if cA >= cB:                      # " + c("trickster step 2: swap pays →", "심술쟁이 2단계: 환전이 이득이면"),
    "    to_fill = missing                #   " + c("red (1 each)", "빨강으로 (1개당 1)"),
    "else:                             # " + c("swap loses → stall with blue groups", "환전이 손해면 → 파랑 묶음으로 끌기"),
    "    eaten = (missing - 1) // cA      #   " + c("how many groups it can run", "묶음을 몇 번 돌릴 수 있나"),
    "    to_fill = missing + eaten * (cB - cA)   #   " + c("chips needed + chips eaten per group", "필요한 칩 + 묶음마다 먹히는 칩"),
    "answer = wasted_blue + to_fill",
  ];
  const last = code.length - 1;
  return { code, vars: _CX_VARS, beats: [
    { hi: [0, 2], bubble: t(E, "First: how much red can I make now, converting my own blue? = init. If init already ≥ goal → answer 0.", "먼저: 지금 가진 걸로 빨강 몇 개? 내 파랑을 환전 = init. init 이 목표 이상이면 답 0.") },
    { hi: [3, 3], bubble: t(E, "missing = red still needed (goal − now).", "missing = 모자란 빨강 (목표 − 지금).") },
    { hi: [4, 4], bubble: t(E, "Trickster step 1: waste blue — fill the leftover to cB−1. Those chips give me 0 red (can't group them).", "심술쟁이 1단계: 파랑 낭비 — 자투리를 cB−1 까지 채워요. 그 칩들은 나한테 빨강 0 (못 묶어서).") },
    { hi: [5, last - 1], bubble: t(E, "Step 2 — two cases. Swap pays (cA≥cB) → the trickster hands red, 1 per chip. Swap loses → it stalls with blue groups: every group it runs eats cB − cA chips (Tool ④), and it can run (missing−1)//cA of them. So: `missing` chips, plus the eaten ones.", "2단계 — 경우 둘. 환전 이득(cA≥cB)이면 심술쟁이는 빨강을 줘요, 칩 1개당 1개. 손해면 파랑 묶음으로 끌어요: 묶음 한 번마다 칩 cB − cA 개가 먹히고 (도구 ④), 묶음은 (missing−1)//cA 번 돌릴 수 있어요. 그래서 missing 개 + 먹히는 칩.") },
    { hi: [last, last], bubble: t(E, "answer = wasted blue + chips to fill. One calculation — that's code ②.", "답 = 버린 파랑 + 채우는 데 든 칩. 계산 한 번 — 이게 코드 ②예요.") },
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
