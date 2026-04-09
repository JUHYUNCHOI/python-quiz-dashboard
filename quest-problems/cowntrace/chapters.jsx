import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, T = map(int, input().split())",
  "events = []",
  "for _ in range(T):",
  "    t_i, a, b = map(int, input().split())",
  "    events.append((t_i, a, b))",
  "events.sort()",
  "",
  "infected_end = set()",
  "x = list(map(int, input().split()))  # final infected",
  "infected_end = set(x)",
  "",
  "# Try each cow as patient zero",
  "# Try each K from 0 to T",
  "results = []",
  "for pz in range(1, N + 1):",
  "    min_k = None",
  "    max_k = None",
  "    for K in range(T + 1):",
  "        sick = {pz}",
  "        count = {pz: 0}  # handshakes used",
  "        for t_i, a, b in events:",
  "            a_sick = a in sick",
  "            b_sick = b in sick",
  "            if a_sick and not b_sick:",
  "                if count.get(a, 0) < K:",
  "                    sick.add(b)",
  "                    count[b] = 0",
  "                    count[a] = count.get(a, 0) + 1",
  "            elif b_sick and not a_sick:",
  "                if count.get(b, 0) < K:",
  "                    sick.add(a)",
  "                    count[a] = 0",
  "                    count[b] = count.get(b, 0) + 1",
  "            elif a_sick and b_sick:",
  "                count[a] = count.get(a, 0) + 1",
  "                count[b] = count.get(b, 0) + 1",
  "        if sick == infected_end:",
  "            if min_k is None:",
  "                min_k = K",
  "            max_k = K",
  "    if min_k is not None:",
  "        results.append((pz, min_k, max_k))",
  "",
  "# Output",
  "print(len(results))",
  "for pz, mn, mx in results:",
  "    inf = 'Infinity' if mx >= T else str(mx)",
  "    print(pz, mn, inf)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeCowntraceCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows shake hooves at events. One cow (patient zero) starts infected and can spread the disease up to K times. Find which cows could be patient zero, and the min/max K.",
        "소들이 행사에서 발굽을 맞대. 한 마리(환자 제로)가 감염 시작, 최대 K번 전파 가능. 환자 제로 후보와 최소/최대 K를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd0d"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cowntact Tracing</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Simulate for each possible patient zero with each K. Check if the resulting infected set matches the given final state.",
              "핵심: 각 환자 제로 후보와 K에 대해 시뮬레이션. 결과 감염 집합이 주어진 최종 상태와 일치하는지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there's only 1 infected cow and no interactions happened, how many possible patient zeros are there?",
        "감염 소가 1마리이고 상호작용이 없었다면, 환자 제로 후보는 몇 마리?"),
      question: t(E,
        "1 infected cow, 0 interactions. How many possible patient zeros?",
        "감염 소 1마리, 상호작용 0번. 환자 제로 후보 수?"),
      options: [
        t(E, "1 (the infected cow itself)", "1 (감염된 소 자신)"),
        t(E, "0 (impossible scenario)", "0 (불가능한 상황)"),
        t(E, "N (any cow could be)", "N (아무 소나 가능)"),
      ],
      correct: 0,
      explain: t(E,
        "With no interactions, the only way a cow is infected is if it's patient zero. So exactly 1 candidate.",
        "상호작용이 없으니, 감염된 소가 환자 제로. 후보는 정확히 1마리."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "1 cow infected, no interactions. How many patient zero candidates?",
        "감염 소 1마리, 상호작용 없음. 환자 제로 후보 수?"),
      question: t(E,
        "1 infected cow, 0 handshakes. Number of patient zero candidates?",
        "감염 소 1마리, 악수 0번. 환자 제로 후보 수?"),
      hint: t(E,
        "Only the infected cow could be patient zero.",
        "감염된 소만 환자 제로 가능."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeCowntraceCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Brute force: try each cow as patient zero, simulate for each K. O(N * T * T) which is fine for Bronze constraints.",
        "완전 탐색: 각 소를 환자 제로로, 각 K에 대해 시뮬레이션. O(N * T * T)로 Bronze 제한에 충분."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N * T^2)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each cow (N), try each K (0..T), simulate all T events. Compare final infected set with expected. Track min/max K per valid patient zero.",
              "각 소(N)에 대해 K(0..T)를 시도, T개 이벤트 시뮬레이션. 최종 감염 집합 비교. 유효한 환자 제로별 최소/최대 K 추적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the simulation-based solution!",
        "시뮬레이션 기반 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
