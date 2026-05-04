import { C, t } from "@/components/quest/theme";
import { getCowntraceSections } from "./components";

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
        "N cows attended events; T timestamps recorded that two specific cows shook hooves at that time. EXACTLY ONE cow started infected ('patient zero') and infects others on hoof-shake — but each infected cow only infects others up to K more times.\nGiven the final infected/healthy state, count how many cows could possibly be patient zero, and find the minimum / maximum K consistent with the data.",
        "N마리 소가 행사에 참석했고, 어떤 시각에 두 소가 발굽을 맞댔다는 기록 T개가 있어요. 정확히 1마리만 처음 감염 ('환자 제로') 이고, 발굽을 맞대면 감염을 옮길 수 있어요 — 단, 한 번 감염된 소는 최대 K 마리에게만 옮겨요.\n최종 감염/건강 상태가 주어졌을 때, 환자 제로가 될 수 있는 소의 수와 일관성 있는 K 의 최소·최대 값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd0d"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cowntact Tracing</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows and T timestamped hoof-shakes", "N마리 소와 T개의 시각별 발굽-맞댐 기록")}</b>
                  {t(E, " (each says: at time t, cows i and j shook hooves).",
                        " 이 있어요 (각 기록: 시각 t 에 i 와 j 가 맞댐).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Exactly one cow is ", "정확히 1마리가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "patient zero", "환자 제로")}</b>
                  {t(E, " (started infected). Infected cows can pass it on through hoof-shakes, but each infected cow infects others ", " (처음 감염). 감염된 소는 발굽-맞댐으로 전파 가능하지만, 각 감염된 소는 최대 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "at most K more times", "K번까지만 전파")}</b>
                  {t(E, ".", " 가능.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "최종 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final infected/healthy state of every cow", "각 소의 감염/건강 상태")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print three numbers: ", "세 수를 출력: ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(1) candidates for patient zero, (2) min K consistent, (3) max K consistent (or 'Infinity')", "(1) 환자 제로 후보 수, (2) 가능한 K 최솟값, (3) K 최댓값 (또는 'Infinity')")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there's only 1 infected cow and no interactions happened, how many possible patient zeros are there?", "감염 소가 1마리이고 상호작용이 없었다면, 환자 제로 후보는 몇 마리?"),
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
        "1 cow infected, no interactions. How many patient zero candidates?", "감염 소 1마리, 상호작용 없음. 환자 제로 후보 수?"),
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
export function makeCowntraceCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Brute force: for each cow as patient zero (N) and each K value (0..T), simulate all T hoof-shake events. Check the final infected set matches the input. Track which K values are consistent.",
        "완전 탐색: 각 소를 환자 제로 후보 (N) 와 각 K 값 (0..T) 로, T 개의 발굽-맞댐 이벤트를 시뮬레이션. 최종 감염 집합이 입력과 일치하는지 확인. 일관된 K 값 추적."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "For each candidate patient zero", "각 환자 제로 후보"), code: "for p0 in 1..N:", color: "#059669" },
              { n: 2, label: t(E, "For each K", "각 K 값"), code: "for K in 0..T:", color: "#0891b2" },
              { n: 3, label: t(E, "Simulate hoof-shakes", "발굽-맞댐 시뮬레이션"), code: "infected = {p0};  for (a, b) in events: spread up to K", color: "#7c3aed" },
              { n: 4, label: t(E, "Compare with target & track K", "목표와 비교 + K 추적"), code: "if infected matches: candidates += 1; track min/max K", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N · T²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N candidates × T values of K × T events", "N 후보 × T 값의 K × T 이벤트")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCowntraceSections(E),
    },
  ];
}
