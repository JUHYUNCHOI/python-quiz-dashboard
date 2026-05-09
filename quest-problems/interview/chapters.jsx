import { C, t } from "@/components/quest/theme";
import { getInterviewSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import heapq",
  "",
  "N, K = map(int, input().split())",
  "times = list(map(int, input().split()))",
  "",
  "# min-heap: (finish_time, counter_id)",
  "heap = []",
  "for i in range(K):",
  "    heapq.heappush(heap, (times[i], i))",
  "",
  "# For cow K..N-1, assign to earliest counter",
  "assignment = list(range(K))  # first K cows → counters 0..K-1",
  "for i in range(K, N):",
  "    finish, counter = heapq.heappop(heap)",
  "    assignment.append(counter)",
  "    heapq.heappush(heap, (finish + times[i], counter))",
  "",
  "# Find when Bessie (last cow, index N-1) finishes",
  "# Actually: which counter does cow N-1 go to?",
  "# Bessie's start time = when her counter becomes free",
  "# All cows that could give same result as Bessie",
  "bessie_counter = assignment[N-1]",
  "",
  "# Find Bessie's start time",
  "# Simulate again tracking start times",
  "heap2 = []",
  "for i in range(K):",
  "    heapq.heappush(heap2, (times[i], i))",
  "",
  "start_times = [0] * N",
  "for i in range(K, N):",
  "    finish, counter = heapq.heappop(heap2)",
  "    start_times[i] = finish",
  "    heapq.heappush(heap2, (finish + times[i], counter))",
  "",
  "bessie_start = start_times[N-1]",
  "",
  "# Which counters have the same free time as Bessie's start?",
  "# Those are the ones Bessie could have gone to",
  "result = []",
  "# Recompute free times just before Bessie arrives",
  "heap3 = []",
  "for i in range(K):",
  "    heapq.heappush(heap3, (times[i], i))",
  "for i in range(K, N-1):",
  "    finish, counter = heapq.heappop(heap3)",
  "    heapq.heappush(heap3, (finish + times[i], counter))",
  "",
  "# Check all counters with min finish time",
  "min_finish = heap3[0][0]",
  "for ft, cid in heap3:",
  "    if ft == min_finish:",
  "        result.append(cid + 1)",
  "",
  "result.sort()",
  "print(len(result))",
  "print(' '.join(map(str, result)))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeInterviewCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "N cows line up for interviews at K counters. Each counter takes a fixed amount of time per interview, and each cow goes to the EARLIEST available counter.\nBessie is last in line — which counter could she end up at?",
        "N마리 소가 K개의 카운터에서 인터뷰를 봐요. 각 카운터는 한 번 인터뷰에 정해진 시간이 걸리고, 각 소는 가장 빨리 비는 카운터로 가요.\nBessie는 줄의 마지막에 있어요 — 어느 카운터로 갈 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Bessie's Interview</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output every counter Bessie (the last cow) could possibly end up at, in increasing order.",
                "줄의 마지막 소 Bessie 가 갈 수 있는 모든 카운터 번호를 오름차순으로 출력.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "K interview counters", "K개의 인터뷰 카운터")}</b>
                  {t(E, ". Counter j takes ", "가 있어요. j번 카운터는 한 번 인터뷰에 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>t[j]</code>
                  {t(E, " minutes per interview.", "분 걸려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N cows ", "N마리 소가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "line up in order", "정해진 순서로 줄을 서요")}</b>
                  {t(E, ". The first K cows take counters 1..K immediately at time 0.",
                        ". 처음 K마리 소는 시간 0에 카운터 1..K로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each remaining cow goes to the ", "남은 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "earliest available counter", "가장 먼저 비는 카운터")}</b>
                  {t(E, " (ties broken by smallest counter index).",
                        "로 가요 (동시에 비면 번호가 작은 쪽).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Bessie is the LAST cow. Print all counters she could possibly go to (ignoring the tie-breaker), in increasing order.",
                        "Bessie는 마지막 소예요. 동점 규칙을 무시했을 때 Bessie가 갈 수 있는 모든 카운터 번호를 오름차순으로 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Watch how cows fill the 2 counters over time.\nThe key moment is t=5 — both counters free at the same time!",
        "소들이 2개 카운터에 시간 순서로 들어가는 걸 봐요.\n핵심은 t=5 — 두 카운터가 동시에 비는 순간!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 12, textAlign: "center" }}>
              N=5, K=2, times=[3, 5, 2, 4, 1]
            </div>

            {/* Timeline visualization: time on left, two counter columns on right */}
            <div style={{ display: "flex", gap: 0, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              {/* Time axis */}
              <div style={{ width: 40, display: "flex", flexDirection: "column", gap: 0, paddingRight: 8 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(t => (
                  <div key={t} style={{
                    height: 28, display: "flex", alignItems: "center", justifyContent: "flex-end",
                    fontSize: 10, color: t % 1 === 0 ? "#059669" : "#cbd5e1", fontWeight: 700,
                  }}>t={t}</div>
                ))}
              </div>

              {/* Counter 1 column: 소1 (t=0..3), 소3 (t=3..5), 소4 or 소5 (t=5..) */}
              <div style={{ flex: 1, position: "relative", paddingRight: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textAlign: "center", marginBottom: 2 }}>C1</div>
                {/* Cow 1: time 3, t=0..3 */}
                <div style={{
                  position: "absolute", top: 14, left: 0, right: 4, height: 28 * 3,
                  background: "#fbbf24", border: "1px solid #d97706", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: "#7c2d12",
                }}>🐄 소1<br/>(t=0→3)</div>
                {/* Cow 3: time 2, t=3..5 */}
                <div style={{
                  position: "absolute", top: 14 + 28 * 3, left: 0, right: 4, height: 28 * 2,
                  background: "#a7f3d0", border: "1px solid #10b981", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: "#064e3b",
                }}>🐄 소3<br/>(t=3→5)</div>
                {/* Tie marker at t=5 */}
                <div style={{
                  position: "absolute", top: 14 + 28 * 5, left: 0, right: 4, height: 4,
                  background: "#dc2626", borderRadius: 2,
                }} />
              </div>

              {/* Counter 2 column: 소2 (t=0..5), then ?? */}
              <div style={{ flex: 1, position: "relative", paddingLeft: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textAlign: "center", marginBottom: 2 }}>C2</div>
                {/* Cow 2: time 5, t=0..5 */}
                <div style={{
                  position: "absolute", top: 14, left: 4, right: 0, height: 28 * 5,
                  background: "#bfdbfe", border: "1px solid #3b82f6", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: "#1e3a8a",
                }}>🐄 소2<br/>(t=0→5)</div>
                {/* Tie marker at t=5 */}
                <div style={{
                  position: "absolute", top: 14 + 28 * 5, left: 4, right: 0, height: 4,
                  background: "#dc2626", borderRadius: 2,
                }} />
              </div>
            </div>

            {/* Tie callout */}
            <div style={{ marginTop: 12, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", marginBottom: 4 }}>
                {t(E, "🚨 At t=5: both C1 and C2 are free at the same time!", "🚨 t=5: C1과 C2가 동시에 비워짐!")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {t(E,
                  "Cow 4 (the next in line) could go to either counter.\nSo if Cow 4 = Bessie, the answer is: 2 possible counters.",
                  "다음 차례인 소 4는 둘 중 어디든 갈 수 있어요.\n소 4가 Bessie라면 답은: 가능한 카운터 2개.")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "When multiple counters finish at the same time, the cow could go to ANY of them.\nThat's why we need to find ALL possible counters for Bessie!", "여러 카운터가 동시에 끝나면, 소는 어디든 갈 수 있어요. 그래서 Bessie가 갈 수 있는 모든 카운터를 찾아야 해요!"),
      question: t(E,
        "If counters 1, 3, 5 all finish at the same time and Bessie is next, how many possible counters does she have?",
        "카운터 1, 3, 5가 동시에 끝나고 Bessie가 다음이면, 가능한 카운터 수는?"),
      options: ["1", "3", "5", t(E, "Depends on cow order", "소 순서에 따라 다름")],
      correct: 1,
      explain: t(E,
        "Bessie could go to any of the 3 tied counters. So the answer lists all 3!",
        "Bessie는 동점인 3개 카운터 중 아무 곳이나 갈 수 있어요. 그래서 3개 모두 답!"),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, times=[3,1,2,1]\n\n• t=0: Cow 1 → C1 (done @3), Cow 2 → C2 (done @1)\n• t=1: Cow 3 → C2 (free first) → done @3\n• t=3: both C1 and C2 free at the same time\n\nBessie (Cow 4) can go to either. How many possible counters?", "N=4, K=2, times=[3,1,2,1]\n\n• t=0: 소 1 → C1 (끝 @3), 소 2 → C2 (끝 @1)\n• t=1: 소 3 → C2 (먼저 빔) → 끝 @3\n• t=3: C1, C2 동시에 비워짐\n\nBessie(소 4)는 둘 다 가능. 갈 수 있는 카운터 수는?"),
      question: t(E, "How many counters can Bessie go to?", "Bessie가 갈 수 있는 카운터 수는?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 시뮬레이션
   ═══════════════════════════════════════════════════════════════ */
export function makeInterviewCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "We use a min-heap (priority queue) to track when each counter finishes.\nThe cow always goes to the counter that finishes earliest!", "최소 힙(우선순위 큐)으로 각 카운터의 종료 시간을 추적해요. 소는 항상 가장 먼저 끝나는 카운터로!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `1px solid ${C.accentBd}`, borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 600, color: C.accent, marginBottom: 6 }}>
              {t(E, "🔧 Algorithm: Min-Heap Simulation", "🔧 알고리즘: 최소 힙 시뮬레이션")}
            </div>
            {t(E,
              "1. Push first K cows' finish times into heap\n2. For each remaining cow: pop min, assign that counter\n3. Push new finish time (old finish + cow's time)\n4. For Bessie: check all counters with minimum finish time",
              "1. 처음 K마리의 종료 시간을 힙에 넣기\n2. 나머지 소마다: 최솟값 pop, 그 카운터 배정\n3. 새 종료 시간 push (이전 종료 + 소의 시간)\n4. Bessie: 최소 종료 시간인 모든 카운터 찾기")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Why do we use a min-heap instead of just scanning all K counters each time?", "왜 매번 K개 카운터를 다 스캔하지 않고 최소 힙을 쓸까?"),
      question: t(E,
        "What's the time complexity advantage of using a min-heap?",
        "최소 힙의 시간복잡도 이점은?"),
      options: [
        t(E, "O(N log K) vs O(NK)", "O(N log K) vs O(NK)"),
        t(E, "O(N) vs O(NK)", "O(N) vs O(NK)"),
        t(E, "O(K) vs O(N)", "O(K) vs O(N)"),
      ],
      correct: 0,
      explain: t(E,
        "Heap push/pop is O(log K), and we do it N times → O(N log K). Without heap: O(NK) scanning all counters each time.",
        "힙 push/pop은 O(log K), N번 수행 → O(N log K). 힙 없이: 매번 K개 스캔 → O(NK)"),
    },
    {
      type: "sim",
      narr: t(E,
        "Step through the assignment.\nN=5, K=2, times=[3,5,2,4,1].\nWatch how each cow goes to the earliest-free counter.", "배정 단계별로 따라가봐요. N=5, K=2, times=[3,5,2,4,1]. 각 소가 가장 먼저 빈 카운터로 가는 걸 봐요."),
    },
    {
      type: "input",
      narr: t(E,
        "Walk the heap simulation yourself for N=6, K=3, times=[2,3,1,4,2,1].  Which counter ends up free first when Bessie arrives?",
        "N=6, K=3, times=[2,3,1,4,2,1] 의 힙 시뮬을 직접 따라가. Bessie 차례에 가장 먼저 비는 카운터는?"),
      question: t(E, "Bessie (cow 6) goes to counter #? (1-indexed)", "Bessie(소6)는 카운터 몇번? (1부터)"),
      hint: t(E,
        "After each cow, the counter she went to gets her finish time pushed back into the heap.",
        "소를 보낼 때마다 그 카운터의 새 종료 시간이 힙에 다시 들어가."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeInterviewCh3(E, lang = "py") {
  return [
    // (key insight — find ALL counters with the same minimum finish time — explained inline in the progressive code below.)
    {
      type: "quiz",
      narr: t(E,
        "After simulating N-1 cows, we check the heap.\nAll counters with the minimum finish time are valid for Bessie.", "N-1마리를 시뮬레이션한 후, 힙에서 최소 종료 시간인 카운터를 모두 찾으면 그게 Bessie의 가능한 카운터!"),
      question: t(E,
        "If the heap has [(5,0),(5,2),(7,1),(8,3)], which counters can Bessie go to?",
        "힙이 [(5,0),(5,2),(7,1),(8,3)]이면 Bessie가 갈 수 있는 카운터는?"),
      options: [
        t(E, "Counter 1 and 3 (0-indexed: 0,2)", "카운터 1, 3 (0-indexed: 0,2)"),
        t(E, "Counter 1 only", "카운터 1만"),
        t(E, "All 4 counters", "4개 전부"),
      ],
      correct: 0,
      explain: t(E,
        "Min finish = 5. Counters 0 and 2 both have finish time 5, so Bessie can go to either!",
        "최소 종료 = 5. 카운터 0과 2 모두 5니까 Bessie는 둘 중 하나!"),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getInterviewSections(E),
      _legacyCode: SOLUTION_CODE,
    },
    {
      type: "runner",
      narr: t(E,
        "Try it yourself.\nEnter N, K, times — watch the live assignment, see which counter Bessie ends at.", "직접 돌려봐요. N, K, times 입력 — 실시간 배정을 보고 Bessie가 어느 카운터로 가는지 확인."),
    },
  ];
}
