import { C, t } from "@/components/quest/theme";
import { getMilkExchangeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M = map(int, input().split())",
  "cap = list(map(int, input().split()))",
  "milk = list(map(int, input().split()))",
  "direction = input().split()  # 'L' or 'R' for each cow",
  "",
  "for step in range(min(M, 2 * N)):",
  "    new_milk = [0] * N",
  "    for i in range(N):",
  "        give = min(1, milk[i])",
  "        if direction[i] == 'L':",
  "            target = (i - 1) % N",
  "        else:",
  "            target = (i + 1) % N",
  "        new_milk[i] += milk[i] - give",
  "        new_milk[target] += give",
  "    # Apply capacity limits",
  "    for i in range(N):",
  "        milk[i] = min(new_milk[i], cap[i])",
  "",
  "print(sum(milk))",
];

/* ================================================================
   Chapter 1: Problem Understanding (4 steps)
   ================================================================ */
export function makeMilkExCh1(E) {
  return [
    // 1-1: Intro
    {
      type: "reveal",
      narr: t(E,
        "N cows stand in a circle. Each minute, every cow passes 1 liter of milk left or right. Let's understand this exchange! 🥛",
        "N마리 소가 원형으로 서 있어. 매분 모든 소가 우유 1리터를 왼쪽 또는 오른쪽으로 전달해. 이 교환을 이해해보자! 🥛"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🥛</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Milk Exchange</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Milk Exchange</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N cows in a circle, each with milk and a capacity limit. Every minute: pass 1L left or right. Overflow is lost! Find total milk after M minutes.",
              "N마리 소가 원형으로, 각각 우유와 용량 제한이 있어. 매분: 1L를 왼쪽 또는 오른쪽으로 전달. 넘치면 버려져! M분 후 총 우유량을 구해.")}
          </div>
        </div>),
    },
    // 1-2: How passing works
    {
      type: "reveal",
      narr: t(E,
        "Each cow simultaneously passes 1 liter. If a cow has 0 milk, it passes nothing. If receiving milk exceeds capacity, the overflow is lost forever!",
        "모든 소가 동시에 1리터를 전달해. 우유가 0이면 아무것도 안 전달해. 받는 우유가 용량을 초과하면 넘치는 건 영원히 사라져!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 14, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#059669", marginBottom: 10 }}>
              {t(E, "Passing Rules", "전달 규칙")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
              {[
                [t(E, "Has milk?", "우유 있어?"), t(E, "Pass 1L", "1L 전달")],
                [t(E, "Over capacity?", "용량 초과?"), t(E, "Overflow lost!", "넘치면 버려!")],
              ].map(([q, a], i) => (
                <div key={i} style={{ background: "#fff", border: "2px solid #6ee7b7", borderRadius: 10, padding: 10, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>{q}</div>
                  <div style={{ fontSize: 11, color: C.text, marginTop: 4 }}>{a}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "All transfers happen simultaneously, then capacity is enforced.",
                "모든 전달이 동시에 일어나고, 그 후 용량 제한이 적용돼.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Think about what happens when two adjacent cows pass to each other!",
        "두 이웃한 소가 서로에게 전달하면 어떻게 되는지 생각해봐!"),
      question: t(E,
        "If cow A passes left and neighbor cow B passes right to cow A, what is cow A's net milk change from these two?",
        "소 A가 왼쪽으로, 이웃 소 B가 오른쪽으로 소 A에게 전달하면, 이 둘로 인한 소 A의 우유 순 변화는?"),
      options: [
        t(E, "+1 (gains one)", "+1 (하나 받아)"),
        t(E, "0 (gives one, receives one)", "0 (하나 주고 하나 받아)"),
        t(E, "-1 (loses one)", "-1 (하나 잃어)"),
      ],
      correct: 1,
      explain: t(E,
        "Right! A gives 1L left and receives 1L from B. Net change = 0. This insight helps find stable states!",
        "맞아! A는 왼쪽으로 1L 주고 B에게서 1L 받아. 순 변화 = 0. 이 통찰이 안정 상태를 찾는 데 도움돼!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Let's try a simple case! 3 cows in a circle, all pass right, each starts with 2L, capacity 2.",
        "간단한 예시를 해보자! 3마리 소가 원형으로, 모두 오른쪽으로 전달, 각각 2L로 시작, 용량 2."),
      question: t(E,
        "3 cows, all pass right, milk=[2,2,2], capacity=[2,2,2]. After 1 minute, what is the total milk?",
        "3마리 소, 모두 오른쪽 전달, 우유=[2,2,2], 용량=[2,2,2]. 1분 후 총 우유량은?"),
      hint: t(E,
        "Each cow gives 1L right and receives 1L from left neighbor. Net: 2-1+1=2 each. No overflow since cap=2. Total=6.",
        "각 소가 1L를 오른쪽으로 주고 왼쪽 이웃에게서 1L 받아. 순: 2-1+1=2씩. 용량=2라 넘침 없음. 총=6."),
      answer: 6,
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makeMilkExCh2(E, lang = "py") {
  return [
    // 2-1: Key insight
    {
      type: "reveal",
      narr: t(E,
        "After enough steps, the distribution stabilizes. Milk flows toward 'sinks' where L and R directions meet. We only need to simulate up to 2N steps!",
        "충분한 단계 후 분포가 안정돼. 우유는 L과 R 방향이 만나는 '싱크'로 흘러. 2N 단계만 시뮬레이션하면 돼!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "2px solid #a7f3d0", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#059669", marginBottom: 8 }}>
              {t(E, "Key Insight: Stabilization", "핵심: 안정화")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              {t(E,
                "1. Milk flows in the direction each cow points (L or R).\n2. Where an L-cow meets an R-cow, milk 'collects' at the boundary.\n3. After at most 2N steps, the system reaches a steady state.\n4. Simulate min(M, 2N) steps for the answer.",
                "1. 우유는 각 소가 가리키는 방향(L/R)으로 흘러.\n2. L-소가 R-소를 만나는 곳에서 우유가 경계에 '모여'.\n3. 최대 2N 단계 후 시스템이 정상 상태에 도달.\n4. min(M, 2N) 단계를 시뮬레이션하면 답이 나와.")}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", fontWeight: 600 }}>
            {t(E, "O(N * min(M, 2N)) simulation", "O(N * min(M, 2N)) 시뮬레이션")}
          </div>
        </div>),
    },
    // 2-2: Solution code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMilkExchangeSections(E),
    },
  ];
}
