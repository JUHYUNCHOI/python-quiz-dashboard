import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";
const KA = { wordBreak: "keep-all" };

/* ── full programs (used for the PDF export & as the canonical reference) ── */
const FULL_PY = [
  "MOD = 10**9 + 7",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (예제 1)",
  "N = 3",
  "P = 1",
  "a = [1, 2, 3]",
  "",
  "if P == 1:                       # ➕ 더하기",
  "    # 각 수는 2^(N-1) 개의 부분집합에 등장한다",
  "    ans = pow(2, N - 1, MOD) * (sum(a) % MOD) % MOD",
  "",
  "elif P == 2:                     # ✖️ 곱하기",
  "    # 모든 부분집합 곱의 합 = (1+A1)(1+A2)...(1+An) - 1",
  "    prod = 1",
  "    for x in a:",
  "        prod = prod * (1 + x) % MOD",
  "    ans = (prod - 1) % MOD",
  "",
  "else:                            # ⊕ XOR (P == 3)",
  "    # 비트마다: 그 비트를 홀수 개 고른 부분집합만 기여",
  "    ans = 0",
  "    for bit in range(31):",
  "        place = 2 ** bit            # 그 자리의 값 — 1, 2, 4, 8, ...",
  "        k = sum(1 for x in a if (x // place) % 2 == 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + place % MOD * factor) % MOD",
  "    ans %= MOD",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "const long long MOD = 1000000007LL;",
  "",
  "long long pw(long long b, long long e) {   // (b^e) mod MOD",
  "    long long r = 1;",
  "    b %= MOD;",
  "    while (e > 0) {",
  "        if (e & 1) {",
  "            r = r * b % MOD;",
  "        }",
  "        b = b * b % MOD;",
  "        e >>= 1;",
  "    }",
  "    return r;",
  "}",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (예제 1)",
  "    int N = 3;",
  "    int P = 1;",
  "    vector<long long> a = {1, 2, 3};",
  "",
  "    long long ans = 0;",
  "    if (P == 1) {                       // ➕ 더하기",
  "        long long s = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            s = (s + a[i]) % MOD;",
  "        }",
  "        ans = pw(2, N - 1) * s % MOD;",
  "    } else if (P == 2) {                // ✖️ 곱하기",
  "        long long prod = 1;",
  "        for (int i = 0; i < N; i++) {",
  "            prod = prod * ((1 + a[i]) % MOD) % MOD;",
  "        }",
  "        ans = (prod - 1 + MOD) % MOD;",
  "    } else {                            // ⊕ XOR",
  "        for (int bit = 0; bit < 31; bit++) {",
  "            long long k = 0;",
  "            for (int i = 0; i < N; i++) {",
  "                if ((a[i] >> bit) & 1) {",
  "                    k++;",
  "                }",
  "            }",
  "            if (k == 0) {",
  "                continue;",
  "            }",
  "            long long f = pw(2, k - 1) * pw(2, N - k) % MOD;",
  "            ans = (ans + ((1LL << bit) % MOD) * f) % MOD;",
  "        }",
  "    }",
  "",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── per-section fragments for the progressive stepper ── */
const PY_SETUP = [
  "MOD = 10**9 + 7",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (예제 1)",
  "N = 3",
  "P = 1",
  "a = [1, 2, 3]",
];
const CPP_SETUP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "const long long MOD = 1000000007LL;",
  "",
  "long long pw(long long b, long long e) {   // (b^e) mod MOD",
  "    long long r = 1;",
  "    b %= MOD;",
  "    while (e > 0) {",
  "        if (e & 1) {",
  "            r = r * b % MOD;",
  "        }",
  "        b = b * b % MOD;",
  "        e >>= 1;",
  "    }",
  "    return r;",
  "}",
  "int N, P;  // 입력은 main() 에서 읽음",
  "vector<long long> a;",
];

const PY_ADD = [
  "if P == 1:                       # ➕ 더하기",
  "    # 수 하나를 고정하면 나머지 N-1 개는 자유",
  "    # → 2^(N-1) 개의 부분집합에 그 수가 들어간다",
  "    ans = pow(2, N - 1, MOD) * (sum(a) % MOD) % MOD",
];
const CPP_ADD = [
  "if (P == 1) {                       // ➕ 더하기",
  "    long long s = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        s = (s + a[i]) % MOD;",
  "    }",
  "    ans = pw(2, N - 1) * s % MOD;   // 각 수 x 2^(N-1)",
  "}",
];

const PY_MUL = [
  "elif P == 2:                     # ✖️ 곱하기",
  "    # (1+A1)(1+A2)...(1+An) 를 펼치면",
  "    # 각 항이 부분집합 하나의 곱 (빈 집합 = 1 만 빼면 됨)",
  "    prod = 1",
  "    for x in a:",
  "        prod = prod * (1 + x) % MOD",
  "    ans = (prod - 1) % MOD",
];
const CPP_MUL = [
  "else if (P == 2) {                  // ✖️ 곱하기",
  "    long long prod = 1;",
  "    for (int i = 0; i < N; i++) {",
  "        prod = prod * ((1 + a[i]) % MOD) % MOD;",
  "    }",
  "    ans = (prod - 1 + MOD) % MOD;   // 빈 집합(=1) 만 빼기",
  "}",
];

const PY_XOR = [
  "else:                            # ⊕ XOR (P == 3)",
  "    ans = 0",
  "    for bit in range(31):",
  "        # 이 비트를 가진 원소가 k 개일 때,",
  "        # 홀수 개 고르기: 2^(k-1) 가지, 나머지 자유: 2^(N-k)",
  "        place = 2 ** bit            # 그 자리의 값 — 1, 2, 4, 8, ...",
  "        k = sum(1 for x in a if (x // place) % 2 == 1)",
  "        if k == 0:",
  "            continue",
  "        factor = pow(2, k - 1, MOD) * pow(2, N - k, MOD) % MOD",
  "        ans = (ans + place % MOD * factor) % MOD",
  "    ans %= MOD",
];
const CPP_XOR = [
  "else {                              // ⊕ XOR",
  "    for (int bit = 0; bit < 31; bit++) {",
  "        long long k = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            if ((a[i] >> bit) & 1) {",
  "                k++;",
  "            }",
  "        }",
  "        if (k == 0) {",
  "            continue;",
  "        }",
  "        long long f = pw(2, k - 1) * pw(2, N - k) % MOD;   // 2^(k-1)·2^(N-k)",
  "        ans = (ans + ((1LL << bit) % MOD) * f) % MOD;",
  "    }",
  "}",
];

const PY_OUT = ["print(ans)"];
const CPP_OUT = ["cout << ans << \"\\n\";"];

/* ================================================================
   첫 코드 — 눈에 보이는 대로 짠 브루트 (2026-09-17 신설)

   왜 생겼나: project-lead 판정 — 기승전결(도입→형식→예제→**첫 코드**→한계→
   더 빠르게) 중 **'첫 코드' 단계가 통째로 없었다.** 예제를 손으로 세다가
   바로 최종 공식으로 점프했다. `memory/quest_problem_standard.md` 최우선 항목이다.

   비트 연산을 안 쓴다 — 부분집합을 **리스트를 늘려 가며** 만든다.
   (비트마스크는 안 가르친 개념이다: count-quests.py --list untaught)
   공식 예제로 확인 — P=1 → 24 · P=2 → 23 · P=3 → 12.
   ================================================================ */
const BRUTE_MAKE_PY = [
  "# 부분집합을 전부 만들어 봐요",
  "# 빈 것 하나로 시작해서, 수를 하나씩 넣은 사본을 계속 붙여요",
  "subsets = [[]]",
  "for x in a:",
  "    for i in range(len(subsets)):",
  "        subsets.append(subsets[i] + [x])",
];
const BRUTE_COMBINE_PY = [
  "total = 0",
  "for sub in subsets:",
  "    if len(sub) == 0:        # 빈 부분집합은 세지 않아요",
  "        continue",
  "    value = sub[0]",
  "    for x in sub[1:]:",
  "        if P == 1:",
  "            value = value + x",
  "        elif P == 2:",
  "            value = value * x",
  "        else:",
  "            value = value ^ x",
  "    total = total + value",
];
const BRUTE_OUT_PY = [
  "# MOD 는 1 번 걸음에서 정해 둔 10**9 + 7 이에요",
  "print(total % MOD)",
];

export function getMcc21SimpleMathBruteSections(E) {
  return [
    /* ⚠️ 2026-09-17 project-lead 재판정에서 잡혔다 —
       처음엔 이 '주어진 값' 걸음이 없었다. 그래서 다음 걸음의 `for x in a:` 가
       **화면 안에 없는 `a`** 를 쓰고 있었다. `ProgressiveCodeStepper` 는
       한 번에 그 걸음의 코드만 보여준다 — 앞 걸음 코드가 안 남는다.
       바로 뒤 빠른 코드 스테퍼는 이미 PY_SETUP 으로 이 걸음을 갖고 있었는데
       새로 만든 쪽만 빠뜨렸다. memory/feedback_screen_must_not_rely_on_memory.md */
    {
      label: t(E, "\u{1F4E5} 1. The values we are given", "\u{1F4E5} 1. 주어진 값"),
      color: A,
      py: PY_SETUP, cpp: PY_SETUP,
      why: [
        t(E,
          "Same three values the examples used: N numbers in a, and P picking the operator.\nMOD keeps the running total small.",
          "예제에서 쓰던 값 그대로예요. 수 N 개가 a 에 있고, P 가 연산자를 골라요.\nMOD 는 총합이 너무 커지지 않게 해 줘요."),
      ],
    },
    {
      label: t(E, "\u{1F422} 2. Make every subset", "\u{1F422} 2. 부분집합을 전부 만들기"),
      color: A,
      py: BRUTE_MAKE_PY, cpp: BRUTE_MAKE_PY,
      why: [
        t(E,
          "Start with one empty subset. For each number, copy every subset we already have and put that number in.\nThat is exactly what the 7 rows on the previous page were.",
          "빈 부분집합 하나로 시작해요.\n수를 하나 볼 때마다, 지금 있는 부분집합을 전부 베껴서 그 수를 넣어요.\n앞 쪽에서 본 7 줄이 바로 이렇게 만들어진 거예요."),
      ],
    },
    {
      label: t(E, "\u{1F422} 3. Combine each subset", "\u{1F422} 3. 부분집합마다 합치기"),
      color: A,
      py: BRUTE_COMBINE_PY, cpp: BRUTE_COMBINE_PY,
      why: [
        t(E,
          "Inside one subset, take the first number and fold the rest into it with the operator P picks.\nThen add that value to the total.",
          "부분집합 안에서 첫 수를 잡고, 나머지를 P 가 고른 연산자로 하나씩 합쳐요.\n그렇게 나온 값을 총합에 더해요."),
      ],
    },
    {
      label: t(E, "\u{1F422} 4. Print", "\u{1F422} 4. 출력"),
      color: A,
      py: BRUTE_OUT_PY, cpp: BRUTE_OUT_PY,
      why: [
        t(E,
          "This is correct, and on the sample it prints 24 / 23 / 12 just like the official output.\nThe next page asks the one question that matters: how far does it go?",
          "이 코드는 맞아요. 예제에 넣으면 공식 답과 똑같이 24 / 23 / 12 가 나와요.\n다음 쪽에서 딱 하나를 물어볼게요 — 이 방법은 어디까지 갈까요?"),
      ],
    },
  ];
}

export function getMcc21SimpleMathSections(E) {
  return [
    {
      label: t(E, "📥 1. Read input & why counting", "📥 1. 입력 읽기 · 왜 세는가"),
      color: A,
      py: PY_SETUP, cpp: CPP_SETUP,
      why: [
        t(E,
          "N numbers give 2^N − 1 nonempty subsets — up to 2^50000. We can NEVER list them all, so we count each part's contribution instead of enumerating subsets.",
          "수가 N 개면 부분집합은 2^N − 1 개, 많으면 2^50000 개까지 가요.\n다 적어 보는 건 불가능해요.\n그래서 부분집합을 만들지 말고, 각 수가 몇 번 쓰이는지를 세요."),
        t(E,
          "MOD = 10^9 + 7: keep every running value mod MOD so numbers stay small.",
          "MOD 는 10^9 + 7 이에요.\n계산할 때마다 MOD 로 나눈 나머지만 들고 있으면 수가 안 커져요."),
      ],
    },
    {
      label: t(E, "➕ 2. P = 1  (addition)", "➕ 2. P = 1  (덧셈)"),
      color: A,
      py: PY_ADD, cpp: CPP_ADD,
      why: [
        t(E,
          "Pin one number down. The other N−1 numbers are each either in or out, so it sits in 2^(N-1) different subsets.",
          "수 하나를 꼭 넣기로 해요.\n남은 N−1 개는 넣거나 빼거나 마음대로예요.\n그래서 그 수가 들어가는 부분집합은 2^(N-1) 개예요."),
        t(E,
          "So every number is added 2^(N-1) times → answer = 2^(N-1) · (sum of all numbers).",
          "어떤 수든 2^(N-1) 번 더해지니까\n답은 2^(N-1) × (모든 수를 더한 값) 이에요."),
      ],
    },
    {
      label: t(E, "✖️ 3. P = 2  (multiplication)", "✖️ 3. P = 2  (곱셈)"),
      color: A,
      py: PY_MUL, cpp: CPP_MUL,
      why: [
        t(E,
          /* 2026-09-17: "1 이나 Aᵢ 를 고르면 항이 나온다" 와 "그 항이 부분집합의 곱이다" 사이에
             고리가 빠져 있었다 — Aᵢ 를 고른 수들이 곧 그 부분집합이라는 말이 없었다. */
          "Expand (1+A₁)(1+A₂)…(1+Aₙ). From each bracket you pick either 1 or Aᵢ. The numbers where you picked Aᵢ are exactly one subset, and the term is that subset's product.",
          "(1+A₁)(1+A₂)…(1+Aₙ) 를 펼쳐 봐요.\n괄호마다 1 이나 Aᵢ 중 하나를 고르면 항이 하나 나와요.\nAᵢ 를 고른 수들만 모으면 그게 부분집합 하나예요.\n그 항은 바로 그 부분집합을 곱한 값이에요."),
        t(E,
          "That covers ALL subsets including the empty one (all 1's → product 1). Subtract that 1 → sum over nonempty subsets.",
          "이러면 빈 집합까지 다 나와요. 괄호마다 1 을 고른 경우가 빈 집합이고 곱은 1 이에요.\n그 1 만 빼면 비어 있지 않은 부분집합들의 합이 남아요."),
      ],
    },
    {
      label: t(E, "⊕ 4. P = 3  (bitwise XOR)", "⊕ 4. P = 3  (비트 XOR)"),
      color: A,
      py: PY_XOR, cpp: CPP_XOR,
      why: [
        t(E,
          /* 2026-09-17: "비트" 가 무엇인지 한 번도 안 말하고 썼다. */
          "A bit is one digit of the number written in base 2 — the digits are worth 1, 2, 4, 8 … XOR works on each digit separately: a digit of the answer is 1 only when an ODD number of the chosen numbers have a 1 there.",
          "비트는 수를 2 진수로 적었을 때의 한 자리예요. 자리값이 1, 2, 4, 8 … 이에요.\nXOR 는 자리마다 따로 계산돼요.\n어떤 자리가 1 이 되려면 그 자리에 1 이 있는 수를 홀수 개 골라야 해요."),
        t(E,
          /* 2026-09-17: 2^(k-1) 이 어디서 나온 수인지 안 말했다. */
          "Say k numbers have that bit. Picking from those k has 2^k ways, split exactly half odd and half even — so odd picks = 2^(k-1). The other N−k numbers are free = 2^(N-k). Multiply the two, times the bit's value, and sum over bits.",
          "그 자리에 1 이 있는 수가 k 개라고 해요.\nk 개 중에서 고르는 방법은 2^k 가지인데, 홀수 개인 경우와 짝수 개인 경우가 딱 반반이에요.\n그래서 홀수 개를 고르는 방법은 2^(k-1) 가지예요.\n나머지 N−k 개는 마음대로라 2^(N-k) 가지예요.\n둘을 곱하고 그 자리값을 곱한 뒤, 모든 자리에 대해 더해요."),
      ],
    },
    {
      label: t(E, "🖨️ 5. Print the answer", "🖨️ 5. 답 출력"),
      color: A,
      py: PY_OUT, cpp: CPP_OUT,
      why: [
        t(E,
          "All three branches already keep ans mod 10^9+7, so we just print it.",
          "세 갈래 모두 ans 를 이미 10^9+7 로 나눈 나머지로 들고 있어요.\n그래서 그대로 출력하면 돼요."),
        t(E,
          "Each branch touches every number about once (XOR loops through the 31 bits too, so about 31 times as much) — fast even for N = 50000, while listing 2^N subsets would be impossible.",
          "어느 갈래든 수를 한 번씩만 훑어요. XOR 는 비트 31 개도 도니까 그만큼 더 걸려요.\nN 이 50000 이어도 금방 끝나요.\n부분집합 2^N 개를 다 적는 것과는 비교가 안 돼요."),
      ],
    },
  ];
}

export function Mcc21SimpleMathProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor={A} />;
}

/* ═══════════════════════════════════════════════════════════════
   Concept sim — for the set {1,2,3}, pick an operator (+ / × / ⊕),
   LIST all 7 nonempty subsets with each subset's combined value and
   the running total, then reveal the counting shortcut that gives
   the same total without listing anything.
   ═══════════════════════════════════════════════════════════════ */
const SET = [1, 2, 3];
const N = SET.length;

// all nonempty subsets, ordered by size then value
const SUBSETS = [];
for (let mask = 1; mask < (1 << N); mask++) {
  const items = [];
  for (let i = 0; i < N; i++) if (mask & (1 << i)) items.push(SET[i]);
  SUBSETS.push(items);
}
SUBSETS.sort((x, y) => x.length - y.length || x.join(",").localeCompare(y.join(",")));

function combine(items, P) {
  if (P === 1) return items.reduce((s, v) => s + v, 0);
  if (P === 2) return items.reduce((s, v) => s * v, 1);
  return items.reduce((s, v) => s ^ v, 0);
}

export function Mcc21SimpleMathOpSim({ E }) {
  const [P, setP] = useState(1);
  const [showShortcut, setShowShortcut] = useState(false);

  const opSym = P === 1 ? "+" : P === 2 ? "×" : "⊕";
  const opName = P === 1
    ? t(E, "add (+)", "더하기 (+)")
    : P === 2
      ? t(E, "multiply (×)", "곱하기 (×)")
      : t(E, "XOR (⊕)", "XOR (⊕)");

  let running = 0;
  const rows = SUBSETS.map((items) => {
    const v = combine(items, P);
    running += v;
    return { items, v, total: running };
  });
  const finalTotal = running; // 24 / 23 / 12

  const chip = (n) => (
    <span key={n} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 22, height: 22, padding: "0 5px", borderRadius: 6,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 800,
      border: "1px solid #fdba74", background: "#fff", color: "#9a3412",
    }}>{n}</span>
  );

  const shortcut = () => {
    if (P === 1) {
      return t(E,
        /* 2026-09-17: 여기 N 은 3 인데 식만 N 으로 두어서 4 가 어디서 나왔는지 안 보였다. */
        "Each number sits in 2^(3-1) = 4 subsets → 4 × (1+2+3) = 4 × 6 = 24.",
        "수 하나가 들어가는 부분집합은 2^(3-1) = 4 개예요.\n그래서 4 × (1+2+3) = 4 × 6 = 24 예요.");
    }
    if (P === 2) {
      /* 2026-09-17: ∏ 를 아무 데서도 안 가르치고 썼다. 그리고 24 가 무엇인지 안 밝혔다 —
         P=1 의 답도 24 라서 같은 화면에서 두 뜻으로 읽힌다. */
      return t(E,
        "(1+1)(1+2)(1+3) = 2 × 3 × 4 = 24 — that counts the empty subset too. Drop the 1 it contributes: 24 − 1 = 23.",
        "(1+1)(1+2)(1+3) = 2 × 3 × 4 = 24 는 빈 집합까지 넣은 합이에요.\n빈 집합이 보탠 1 을 빼면 24 − 1 = 23 이에요.");
    }
    /* 2026-09-17: k=2 · 4 개 · 1×4 — 숫자만 늘어놓고 무엇을 센 값인지 하나도 안 말했다.
       괄호로 숨긴 "비트0(값 1)" 도 자리 이름으로 편다. */
    return t(E,
      "Count each digit separately. The 1s digit is set in 1 and 3 — 2 numbers. Subsets where that digit ends up 1: 2^(2-1) × 2^(3-2) = 4 of them, each worth 1, so 1 × 4 = 4. The 2s digit is set in 2 and 3 — also 2 numbers, also 4 subsets, each worth 2, so 2 × 4 = 8. Together 4 + 8 = 12.",
      "자리마다 따로 세요.\n1 의 자리에 1 이 있는 수는 1 과 3, 이렇게 2 개예요.\n이 자리가 1 이 되는 부분집합은 2^(2-1) × 2^(3-2) = 4 개예요.\n자리값이 1 이니까 1 × 4 = 4 를 보태요.\n2 의 자리에 1 이 있는 수는 2 와 3, 역시 2 개라 부분집합도 4 개예요.\n자리값이 2 니까 2 × 4 = 8 을 보태요.\n4 + 8 = 12 예요.");
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
          🧮 {t(E, "Set A = {1, 2, 3} — every nonempty subset", "집합 A = {1, 2, 3} 의 비어 있지 않은 부분집합 전부")}
        </div>
        {/* 2026-09-17: 이 시뮬 안의 글들은 \n 을 넣어 두고도 pre-line 이 없어서
            한 문단으로 뭉개져 나왔다. 절 단위로 끊어 보이게 한다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "Combine each subset with the operator, then SUM those values over all subsets. Switch the operator and watch the total.",
            "부분집합마다 연산자로 합친 값을 구하고, 그 값들을 모두 더해요.\n연산자를 바꿔 보면 합이 어떻게 달라지는지 알 수 있어요.")}
        </div>

        {/* operator toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[1, 2, 3].map((p) => (
            <button key={p} onClick={() => { setP(p); setShowShortcut(false); }} style={{
              flex: 1, padding: "8px 0", borderRadius: 8,
              border: P === p ? `2px solid ${A}` : `1px solid ${C.border}`,
              background: P === p ? "#ffedd5" : "#fff",
              color: P === p ? "#9a3412" : C.text,
              fontSize: 12.5, fontWeight: 800, cursor: "pointer",
            }}>
              {p === 1 ? "P=1  +" : p === 2 ? "P=2  ×" : "P=3  ⊕"}
            </button>
          ))}
        </div>

        {/* the 7 subsets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", fontSize: 10.5, color: C.dim, fontWeight: 800, letterSpacing: 0.3, padding: "0 8px", marginBottom: 2 }}>
            <span style={{ flex: 1 }}>{t(E, "subset", "부분집합")}</span>
            <span style={{ width: 96, textAlign: "right" }}>{t(E, "combined", "합친 값")}</span>
            <span style={{ width: 88, textAlign: "right" }}>{t(E, "running sum", "쌓인 합")}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", background: "#fff",
              border: "1px solid #fed7aa", borderRadius: 8, padding: "6px 8px",
            }}>
              <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <span style={{ color: C.dim, fontSize: 11 }}>{"{"}</span>
                {r.items.map((n, j) => (
                  <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {j > 0 && <span style={{ color: A, fontWeight: 800, fontSize: 12 }}>{opSym}</span>}
                    {chip(n)}
                  </span>
                ))}
                <span style={{ color: C.dim, fontSize: 11 }}>{"}"}</span>
              </span>
              <span style={{ width: 96, textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "#9a3412" }}>
                = {r.v}
              </span>
              <span style={{ width: 88, textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: A }}>
                {r.total}
              </span>
            </div>
          ))}
        </div>

        {/* total */}
        <div style={{ marginTop: 10, background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, ...KA }}>
          {/* 2026-09-17: opName 이 이미 "더하기 (+)" 라서 "합 (더하기 (+))" 처럼 괄호가 겹쳤다. */}
          {t(E, "sum over all 7 subsets ", "7 개 부분집합의 합 ")}
          · <b style={{ color: "#fdba74" }}>{opName}</b> = <b style={{ color: "#fb923c", fontSize: 15 }}>{finalTotal}</b>
        </div>

        {/* shortcut */}
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setShowShortcut((v) => !v)} style={{
            padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${A}`,
            background: showShortcut ? A : "#fff", color: showShortcut ? "#fff" : A,
            fontSize: 12, fontWeight: 800, cursor: "pointer",
          }}>
            {showShortcut ? t(E, "▲ hide the shortcut", "▲ 지름길 접기") : t(E, "▼ show the counting shortcut", "▼ 세는 지름길 보기")}
          </button>
          {showShortcut && (
            <div style={{ marginTop: 10, background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", ...KA }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "same total, no listing", "다 적지 않고도 같은 합")}
              </div>
              <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, whiteSpace: "pre-line", ...KA }}>
                {shortcut()}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, fontSize: 11.5, color: C.dim, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
          {t(E,
            /* 2026-09-17: 같은 화면의 지름길은 "자리" 라고 부르는데 여기만 "비트" 였다. */
            "With just 3 numbers we can list all 7 subsets. But N can be 50000 → 2^N subsets (2 multiplied by itself N times), far too many to list. So we count each number's / each digit's contribution instead.",
            "수가 3 개뿐이면 부분집합 7 개를 다 적을 수 있어요.\n그런데 N 은 50000 까지 가고, 그러면 부분집합이 2^N 개(2 를 N 번 곱한 수)예요.\n적는 건 포기하고, 각 수와 각 자리가 몇 번 쓰이는지를 세요.")}
        </div>
      </div>
    </div>
  );
}

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","pow"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
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

export function downloadMcc21SimpleMathPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21SimpleMath — Full Study Guide", "Mcc21SimpleMath — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const fullCode = codeBlock(lang === "py" ? FULL_PY : FULL_CPP);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC 2021 P5 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${(s.why || []).map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
  <h3 style="background:${A}20;color:${A};padding:6px 10px;border-radius:6px;">🧩 ${t(E, "Full program", "전체 코드")}</h3>
  ${fullCode}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
