// 🔒 USACO_VERIFIED (2026-05-13) — ⚠️ 구버전 재귀는 TLE 였음:
//   (old) Python: 5/14 (TLE, 메모이제이션 없는 지수 재귀) · C++: 8/9+ (TLE)
//   **2026-07-17 (선생님 "재귀는 힘들어 + 재귀 아니어도 되면 다 없애줘"): 재귀 완전 제거 + TLE 해결.
//     알고리즘 재설계 — 블록 정규화 c[i]=min(a[i], 2*c[i-1]) → 큰 블록 통당가 최저 →
//     'skip' 분기 불필요 → 쿼리당 분기 없는 O(N) (큰 블록부터: 올림-정지 후보 + 내림-이월).
//     검증: 구 재귀(정답, 느림)와 **전수 4142(N≤5) + 랜덤 9400(N≤14, 큰 값) 완전 일치, 불일치 0**,
//     PY==CPP 교차, 공식 샘플(x=6→45, x=7→55) 일치, clang++ 컴파일.
//     ⚠️ 알고리즘 자체가 바뀜(구버전은 애초에 TLE) → USACO 재제출로 만점(AC) 확인 필수.**
//   **2026-09-15: 블록 크기 계산 버그 둘 수정 (감사·QA·PM 판정). 알고리즘은 안 건드림.**
//     증상 — CPP: `1LL << i` 가 i=N-1 까지 돌아 N≥64 에서 UB (N=64 에 답 0, 무작위 200건 중 142건 오답).
//            PY : 같은 `1 << i` 가 3만 자리 거대 정수를 만들어 N=100,000·Q=100 에 **164초**.
//     원인 — 로컬 검증을 N≤14 까지만 돌렸다. 화면 제약은 1 ≤ N ≤ 100,000 이라 99.9% 가 미검증이었다.
//     고침 — x ≤ 10^9 < 2^30 이므로 30번보다 큰 블록은 하나로 다 덮여 볼 필요가 없다.
//            루프를 `min(N-1, 30)` 에서 시작하게 한 줄만 바꿨다 (PY·CPP 각 1줄).
//     검증 — 공식 샘플 일치 · 브루트포스 300케이스(1800쿼리) 불일치 0 · N=30~200 에서 PY==CPP ·
//            **N=100,000 Q=10,000 실제 실행: PY 0.18초 · CPP 0.15초** · 옛 코드가 맞던 N≤63 구간 200케이스 답 동일.
//     ✅ **2026-09-17 선생님이 제출해 파이썬·C++ 둘 다 통과 확인.** 지금 화면 코드 = 통과한 코드다.
//   **2026-09-15 (2): 한 줄에 문장 여러 개를 폈다. 선생님 "한줄에 여러개가 있고 읽기 싫던데" (두 번째 지적).**
//     CPP 4줄 — `for (...) cin >> a[i];` · `for (...) c[i] = ...;` · `ll x; cin >> x;` ·
//     `ll ans = INF, cost = 0, rem = x;` → 각각 폈다 (39줄 → 46줄). 동작은 그대로다.
//     ⚠️ 줄이 늘어서 CodeWalk `hi` 를 전부 다시 매겼다 —
//        [9,12]→[9,14] · [14,19]→[16,23] · [21,23]→[25,30] · [24,32]→[31,39] · [34,35]→[41,42].
//        말풍선 5개가 다 제자리에 붙는 것을 화면에서 눈으로 확인했다.
//     검증 5단계 재실행 전부 통과 (N=100,000 Q=10,000 실측 PY 0.18초 · CPP 0.16초).
//     새 검사기: `scripts/check-code-one-statement.py`
//   **2026-09-15 (3): 비트 시프트를 걷어냈다. 학생이 `1LL << i` 에서 "멈추고 싶었다" 고 했다.**
//     `/decide` 3라운드 — 기획·감사·python-qa·cpp-qa 에게 서로 안 보이게 묻고 PM 이 종합.
//     판정 근거: 화면은 이 문제를 **어디서도 `<<` 로 말하지 않는다** ("블록·두 배" 로만 말한다).
//       코드에서만 다른 기호로 다시 쓴 것 → **본질이 아니라 수단.** 그래서 코드를 바꾼다.
//       (부분집합 열거처럼 비트가 곧 아이디어인 quest 는 이 판정 밖이다 — aircond·feb23·
//        mcc21simplemath. 거긴 대체 표현이 없어서 커리큘럼 문제고, 선생님 판정으로 올렸다.)
//     PY : `size = 1 << i` → **`size = 2 ** i`** (`**` 는 파이썬 레슨 4 에서 가르친다)
//     CPP: `ll size = 1LL << i;` → **`blockSize[i]` 표** (C++ 엔 `**` 가 없다). 46 → 53줄.
//          이름을 `c` 와 안 겹치게 골랐다 — `c[i]` 는 값, `blockSize[i]` 는 통 수다.
//     ⚠️ CPP 가 7줄 늘어 `hi` 를 다시 매겼고 말풍선도 하나 늘렸다(표를 설명해야 해서) —
//        [25,30]=새 표 · [32,37] · [38,46] · [48,49]. 6개 다 제자리인 것을 화면에서 확인했다.
//     검증: PY 21,780쿼리 불일치 0 (python-qa) · CPP 무작위 500 + 브루트포스 200 불일치 0,
//        ASan/UBSan 클린 (cpp-qa) · 5단계 재실행 전부 통과 (상한 PY 0.19초 · CPP 0.15초).
//     남은 `<<` 는 `cout <<` 뿐 — 학생이 이미 아는 뜻이다.
//   **2026-09-17: 변수 이름을 뜻이 보이게 바꾸고 주석을 한국어로 옮겼다.**
//     선생님 *"buymilk는 코드 저렇게 변수 하지 말라고 했지? 그리고 주석이 한국어인데 영어로 나와있어"*
//     + *"좀 코드가 길어도 학생들이 이해하기 쉽게라고 항상 얘기했어"*
//     이름 — a→deal_price · c→block_cost · x→want · ans→best · cost→paid · rem→left ·
//            need→buy_up · take→buy_down · N→deal_count · Q→query_count.
//            min(...) 안에 있던 두 후보를 줄로 꺼내 이름을 줬다 — buy_the_deal · buy_two_halves.
//            (C++ 는 같은 뜻의 camelCase: dealPrice · blockCost · buyUp · buyDown · TOO_BIG)
//     주석 — 코드 안 주석을 한국어로 옮겼다. 배열은 **한 벌뿐이다** —
//            영어 화면은 `components/quest/localizeCode.ts` 가 그리는 자리에서 바꾼다.
//            (처음엔 FULL_PY_EN 을 따로 뒀다가 지웠다. 같은 것을 두 군데 두면 어긋난다.)
//            번역은 `components/quest/codeCommentsEn.ts` 표에 넣었다 — 없으면 줄이 비워진다.
//     ⚠️ 화면 글도 같이 바꿨다 — 코드가 block_cost 인데 설명이 c[i] 면 학생이 딴 걸 찾는다.
//        chapters.jsx 의 Plan 카드(인사이트 3 + 번호 5줄) · sims.jsx 표 머리 2칸 ·
//        components.jsx 의 why 4줄. `c[i] = min(a[i], 2*c[i-1])` 뱃지는
//        `min(buy_the_deal, buy_two_halves)` 로 바꿔 모바일에서 더 짧아졌다.
//     ⚠️ 줄이 늘어 CodeWalk `hi` 를 전부 다시 매겼다 —
//        PY(35→47줄): [0,1] [3,8] [10,19] [21,26] [28,41] [43,44] [46,46]
//        CPP(53→68줄): [7,16] [18,28] [30,36] [38,45] [47,60] [63,64]
//     검증 — **알고리즘은 한 줄도 안 바꿨다.** 옛 C++ 과 대조:
//        무작위 400케이스 불일치 0 (PY·CPP·옛CPP 3자 대조) · 공식 샘플(x=7→55) 일치 ·
//        경계값 3종(N=1·N=2·값 10^9 전부 큰 수) 일치 · 영어 주석판도 따로 200케이스 불일치 0.
//     ⚠️ **코드 텍스트가 바뀌었으므로 선생님 USACO 재제출이 필요하다** (동작은 같지만 규칙은 규칙).
//   코드 수정 시 USACO 재제출 필요 — 상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "# 거래 개수 N, 물음 개수 Q",
  "deal_count, query_count = map(int, input().split())",
  "",
  "# deal_price[i] = i 번 거래의 가격.",
  "# i 번 거래는 1 통을 i 번 두 배 한 만큼을 준다 — 1, 2, 4, 8, ...",
  "deal_price = list(map(int, input().split()))",
  "",
  "# block_cost[i] = 2^i 통짜리 묶음을 얻는 가장 싼 값.",
  "# 거래를 그대로 사거나, 절반짜리 묶음을 두 번 사거나 — 둘 중 싼 쪽이다.",
  "# 이렇게 해 두면 큰 묶음이 한 통당 손해인 경우가 없어서",
  "# 큰 묶음부터 한 번만 훑으면 되고 재귀가 필요 없다.",
  "block_cost = [0] * deal_count",
  "block_cost[0] = deal_price[0]",
  "for i in range(1, deal_count):",
  "    buy_the_deal = deal_price[i]",
  "    buy_two_halves = 2 * block_cost[i - 1]",
  "    block_cost[i] = min(buy_the_deal, buy_two_halves)",
  "",
  "answers = []",
  "for _ in range(query_count):",
  "    want = int(input())      # 이번 물음에서 사야 할 통 수",
  "    best = float('inf')      # 지금까지 찾은 가장 싼 값",
  "    paid = 0                 # 여기까지 확정으로 낸 값",
  "    left = want              # 아직 못 채운 통 수",
  "",
  "    # want 는 많아야 10억이다. 2 를 30번 곱하면 1,073,741,824 라 벌써 넘는다.",
  "    # 그래서 30번 묶음보다 큰 것은 볼 필요가 없다.",
  "    biggest = min(deal_count - 1, 30)",
  "    for i in range(biggest, -1, -1):",
  "        block_size = 2 ** i",
  "",
  "        # (A) 이 묶음으로 넉넉히 사고 끝내기",
  "        buy_up = (left + block_size - 1) // block_size    # 올림 나눗셈",
  "        best = min(best, paid + buy_up * block_cost[i])",
  "",
  "        # (B) 모자라게 사고, 남은 통은 더 작은 묶음에 맡기기",
  "        buy_down = left // block_size",
  "        paid += buy_down * block_cost[i]",
  "        left -= buy_down * block_size",
  "",
  "    best = min(best, paid)   # 딱 맞게 산 경우도 후보다",
  "    answers.append(best)",
  "",
  "print('\\n'.join(map(str, answers)))",
];


const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "typedef long long ll;",
  "",
  "int main() {",
  "    // 거래 개수 N, 물음 개수 Q",
  "    int dealCount, queryCount;",
  "    cin >> dealCount >> queryCount;",
  "",
  "    // dealPrice[i] = i 번 거래의 가격.",
  "    // i 번 거래는 1 통을 i 번 두 배 한 만큼을 준다 — 1, 2, 4, 8, ...",
  "    vector<ll> dealPrice(dealCount);",
  "    for (int i = 0; i < dealCount; i++) {",
  "        cin >> dealPrice[i];",
  "    }",
  "",
  "    // blockCost[i] = 2^i 통짜리 묶음을 얻는 가장 싼 값.",
  "    // 거래를 그대로 사거나, 절반짜리 묶음을 두 번 사거나 — 둘 중 싼 쪽이다.",
  "    // 이렇게 해 두면 큰 묶음이 한 통당 손해인 경우가 없어서",
  "    // 큰 묶음부터 한 번만 훑으면 되고 재귀가 필요 없다.",
  "    vector<ll> blockCost(dealCount);",
  "    blockCost[0] = dealPrice[0];",
  "    for (int i = 1; i < dealCount; i++) {",
  "        ll buyTheDeal = dealPrice[i];",
  "        ll buyTwoHalves = 2 * blockCost[i - 1];",
  "        blockCost[i] = min(buyTheDeal, buyTwoHalves);",
  "    }",
  "",
  "    // blockSize[i] = i 번 묶음이 몇 통인지. 1 에서 시작해 계속 두 배다.",
  "    // C++ 에는 ** 가 없어서 표를 한 번 만들어 두고 쓴다.",
  "    vector<ll> blockSize(31);",
  "    blockSize[0] = 1;",
  "    for (int i = 1; i <= 30; i++) {",
  "        blockSize[i] = blockSize[i - 1] * 2;",
  "    }",
  "",
  "    const ll TOO_BIG = (ll)4e18;   // '아직 아무것도 못 찾았다' 는 표시",
  "",
  "    for (int q = 0; q < queryCount; q++) {",
  "        ll want;                   // 이번 물음에서 사야 할 통 수",
  "        cin >> want;",
  "        ll best = TOO_BIG;         // 지금까지 찾은 가장 싼 값",
  "        ll paid = 0;               // 여기까지 확정으로 낸 값",
  "        ll left = want;            // 아직 못 채운 통 수",
  "",
  "        // want 는 많아야 10억이다. 2 를 30번 곱하면 1,073,741,824 라 벌써 넘는다.",
  "        // 그래서 30번 묶음보다 큰 것은 볼 필요가 없다.",
  "        int biggest = min(dealCount - 1, 30);",
  "        for (int i = biggest; i >= 0; i--) {",
  "            ll size = blockSize[i];",
  "",
  "            // (A) 이 묶음으로 넉넉히 사고 끝내기",
  "            ll buyUp = (left + size - 1) / size;   // 올림 나눗셈",
  "            best = min(best, paid + buyUp * blockCost[i]);",
  "",
  "            // (B) 모자라게 사고, 남은 통은 더 작은 묶음에 맡기기",
  "            ll buyDown = left / size;",
  "            paid += buyDown * blockCost[i];",
  "            left -= buyDown * size;",
  "        }",
  "",
  "        best = min(best, paid);    // 딱 맞게 산 경우도 후보다",
  "        cout << best << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];


// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙). 검증본 코드 그대로.
const _BM_VARS = [
  { v: "deal_price", ko: "거래마다 붙은 값", en: "deal prices" },
  { v: "block_cost", ko: "묶음을 얻는 제일 싼 값", en: "cheapest per block" },
  { v: "want", ko: "사야 할 통 수", en: "buckets needed" },
  { v: "left", ko: "아직 못 채운 통", en: "buckets left" },
];
export function getBuyMilkWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _BM_VARS, beats: [
      { hi: [7, 16], bubble: t(E, "Read N, Q and the deal prices.\nDeal 1 in the problem is dealPrice[0] in the code.\nSo dealPrice[i] buys 1 doubled i times: 1, 2, 4, 8, ...", "거래 개수와 물음 개수, 그리고 거래 가격을 읽어요.\n문제의 1번 거래가 코드에서는 dealPrice[0] 이에요.\n그래서 dealPrice[i] 는 1 을 i 번 두 배 한 만큼이에요 — 1, 2, 4, 8, ...") },
      { hi: [18, 28], bubble: t(E, "Give every block its own real price.\nbuyTheDeal = pay for that deal directly.\nbuyTwoHalves = buy the half-size block twice.\nblockCost[i] keeps the cheaper one.\nAfter this a bigger block is never worse per bucket,\nso we sweep big-to-small with no recursion.", "묶음마다 진짜 값을 하나씩 정해요.\nbuyTheDeal 은 그 거래를 그대로 사는 값이에요.\nbuyTwoHalves 는 절반짜리 묶음을 두 번 사는 값이에요.\nblockCost[i] 는 둘 중 싼 쪽을 담아요.\n이렇게 하면 큰 묶음이 한 통당 손해일 일이 없어요.\n그래서 큰 것부터 한 번만 훑으면 되고 재귀가 필요 없어요.") },
      { hi: [30, 36], bubble: t(E, "Write down how many buckets each block holds.\nStart at 1 and keep doubling: 1, 2, 4, 8, ...\nwant is at most 1,000,000,000, and block 30 holds 1,073,741,824 — already past it.\nSo blocks 0 through 30 are enough, which is 31 slots.\nC++ has no ** operator, so we build the table once.", "묶음마다 몇 통인지 미리 적어둬요.\n1 에서 시작해서 계속 두 배예요 — 1, 2, 4, 8, ...\nwant 는 많아야 10억인데 30번 묶음이 1,073,741,824 라 벌써 넘어요.\n그래서 0번부터 30번까지면 충분해요 — 칸이 31개예요.\nC++ 에는 ** 가 없어서 표를 한 번 만들어 두고 써요.") },
      { hi: [38, 45], bubble: t(E, "One question at a time: we must buy want buckets.\nbest = cheapest total so far, paid = locked in, left = still to cover.", "물음이 하나 올 때마다 want 통을 사야 해요.\nbest 는 지금까지 제일 싼 값, paid 는 여기까지 낸 값,\nleft 는 아직 못 채운 통 수예요.") },
      { hi: [47, 60], bubble: t(E, "Sweep from the biggest useful block down to block 0.\n(A) buyUp — buy enough with this block and stop.\n(B) buyDown — buy less and leave the rest to smaller blocks.", "쓸 만한 제일 큰 묶음부터 0번까지 내려와요.\n(A) buyUp — 이 묶음으로 넉넉히 사고 끝내요.\n(B) buyDown — 모자라게 사고 남은 통은 작은 묶음에 맡겨요.") },
      { hi: [63, 64], bubble: t(E, "Covering it exactly is a candidate too. Print the cheapest.", "딱 맞게 산 경우도 후보예요.\n제일 싼 값을 출력해요.") },
    ] };
  }
  return { code: FULL_PY, vars: _BM_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input.", "입력을 빠르게 받아요.") },
    { hi: [3, 8],   bubble: t(E, "Read N, Q and the deal prices.\nDeal 1 in the problem is deal_price[0] in the code.\nSo deal_price[i] buys 1 doubled i times: 1, 2, 4, 8, ...", "거래 개수와 물음 개수, 그리고 거래 가격을 읽어요.\n문제의 1번 거래가 코드에서는 deal_price[0] 이에요.\n그래서 deal_price[i] 는 1 을 i 번 두 배 한 만큼이에요 — 1, 2, 4, 8, ...") },
    { hi: [10, 19], bubble: t(E, "Give every block its own real price.\nbuy_the_deal = pay for that deal directly.\nbuy_two_halves = buy the half-size block twice.\nblock_cost[i] keeps the cheaper one.\nAfter this a bigger block is never worse per bucket,\nso we sweep big-to-small with no recursion.", "묶음마다 진짜 값을 하나씩 정해요.\nbuy_the_deal 은 그 거래를 그대로 사는 값이에요.\nbuy_two_halves 는 절반짜리 묶음을 두 번 사는 값이에요.\nblock_cost[i] 는 둘 중 싼 쪽을 담아요.\n이렇게 하면 큰 묶음이 한 통당 손해일 일이 없어요.\n그래서 큰 것부터 한 번만 훑으면 되고 재귀가 필요 없어요.") },
    { hi: [21, 26], bubble: t(E, "One question at a time: we must buy want buckets.\nbest = cheapest total so far, paid = locked in, left = still to cover.", "물음이 하나 올 때마다 want 통을 사야 해요.\nbest 는 지금까지 제일 싼 값, paid 는 여기까지 낸 값,\nleft 는 아직 못 채운 통 수예요.") },
    { hi: [28, 41], bubble: t(E, "want is at most 1,000,000,000.\nDoubling 30 times already passes it: 1,073,741,824.\nSo blocks past number 30 never need looking at.\n(A) buy_up — buy enough with this block and stop.\n(B) buy_down — buy less and leave the rest to smaller blocks.", "want 는 많아야 10억이에요.\n2 를 30번 곱하면 벌써 넘어요 — 1,073,741,824.\n그래서 30번보다 큰 묶음은 볼 일이 없어요.\n(A) buy_up — 이 묶음으로 넉넉히 사고 끝내요.\n(B) buy_down — 모자라게 사고 남은 통은 작은 묶음에 맡겨요.") },
    { hi: [43, 44], bubble: t(E, "Covering it exactly is a candidate too; keep the cheapest.", "딱 맞게 산 경우도 후보예요.\n제일 싼 값을 남겨요.") },
    { hi: [46, 46], bubble: t(E, "Print all answers at once.", "답을 한 번에 출력해요.") },
  ] };
}

export function getBuyMilkSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Step 1 — give every block its own real price. block_cost[i] is the cheapest way to get one block - the deal for that block, or the half-size block bought twice. The code names those two buy_the_deal and buy_two_halves.",
            "1단계 — 묶음마다 진짜 값을 하나씩 정해요.\nblock_cost[i] 는 그 묶음을 얻는 가장 싼 값이에요.\n거래를 그대로 사거나(buy_the_deal),\n절반짜리 묶음을 두 번 사거나(buy_two_halves) 중 싼 쪽이에요."),
        t(E, "The payoff: after normalizing, a BIGGER block is always cheaper per bucket. So we never need to 'skip' a big block for small ones — that's why no recursion is needed.",
            "이렇게 해 두면 큰 묶음일수록 한 통에 드는 값이 싸요.\n그래서 큰 묶음을 건너뛰고 작은 것만 쓸 이유가 없어요.\n재귀가 필요 없는 이유가 바로 이거예요."),
        t(E, "Step 2 — per query: go from the biggest block down. At each size, try (round UP here and stop = buy a bit extra), then take the floor and carry the remainder to smaller blocks. Keep the minimum. One sweep per query, no recursion.",
            "2단계 — 물음이 올 때마다 큰 묶음부터 내려가요.\n크기마다 '넉넉히 사고 끝내기' 값을 후보로 넣어요.\n그다음 모자라게 산 만큼만 쓰고 나머지는 작은 묶음에 맡겨요.\n제일 작은 값을 남겨요. 물음 하나에 한 번만 훑고, 재귀가 없어요."),
        t(E, "Why over-buy? One big cheap block can cover want while overshooting — sometimes cheaper than exact. That is the buy_up option.",
            "왜 넉넉히 사나요?\n싼 큰 묶음 하나로 필요한 통보다 많이 사는 게\n딱 맞추기보다 쌀 때가 있어요.\n그게 buy_up 후보예요."),
      ],
      pyOnly: [
        t(E, "Python's built-in big ints handle up to 10^9 * 10^9 safely — no overflow worries.",
            "파이썬 정수는 아무리 커져도 괜찮아요.\n10^9 × 10^9 도 그대로 담겨요."),
      ],
      cppOnly: [
        t(E, "Use long long everywhere — costs can reach about 10^18.",
            "값이 10^18 까지 커질 수 있어요.\n그래서 long long 을 써야 해요."),
      ],
    },
  ];
}

export function BuyMilkProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadBuyMilkPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Purchasing Milk — Full Study Guide", "우유 구매 — 종합 풀이 노트");
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
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 Second Contest, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
