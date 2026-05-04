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
        "N cows line up for interviews at K counters.\nEach cow takes a certain time.\nWhich counter will Bessie (last cow) go to?\n🐄", "N마리 소가 K개의 카운터에서 인터뷰! 각 소는 정해진 시간이 걸려. 마지막 소 베시는 어느 카운터로? 🐄"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐄</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Bessie's Interview</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Silver #1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "K counters,\nN cows in line. Each cow goes to the first available counter. Find all possible counters for the last cow!",
              "K개 카운터, N마리 소가 줄 서있어요.\n각 소는 가장 먼저 비는 카운터로!\n마지막 소가 갈 수 있는 카운터를 모두 찾아요!")}
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
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", marginBottom: 12, textAlign: "center" }}>
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
                  background: "#fbbf24", border: "2px solid #d97706", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "#7c2d12",
                }}>🐄 소1<br/>(t=0→3)</div>
                {/* Cow 3: time 2, t=3..5 */}
                <div style={{
                  position: "absolute", top: 14 + 28 * 3, left: 0, right: 4, height: 28 * 2,
                  background: "#a7f3d0", border: "2px solid #10b981", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "#064e3b",
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
                  background: "#bfdbfe", border: "2px solid #3b82f6", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "#1e3a8a",
                }}>🐄 소2<br/>(t=0→5)</div>
                {/* Tie marker at t=5 */}
                <div style={{
                  position: "absolute", top: 14 + 28 * 5, left: 4, right: 0, height: 4,
                  background: "#dc2626", borderRadius: 2,
                }} />
              </div>
            </div>

            {/* Tie callout */}
            <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 4 }}>
                {t(E, "🚨 At t=5: both C1 and C2 are free at the same time!", "🚨 t=5: C1과 C2가 동시에 비워짐!")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {t(E,
                  "Cow 4 (the next in line) could go to either counter.\nSo if Cow 4 = Bessie, the answer is: 2 possible counters.",
                  "다음 차례인 소 4는 둘 중 어디든 갈 수 있어요.\n소 4가 베시라면 답은: 가능한 카운터 2개.")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "When multiple counters finish at the same time, the cow could go to ANY of them.\nThat's why we need to find ALL possible counters for Bessie!", "여러 카운터가 동시에 끝나면, 소는 어디든 갈 수 있어요. 그래서 베시가 갈 수 있는 모든 카운터를 찾아야 해요!"),
      question: t(E,
        "If counters 1, 3, 5 all finish at the same time and Bessie is next, how many possible counters does she have?",
        "카운터 1, 3, 5가 동시에 끝나고 베시가 다음이면, 가능한 카운터 수는?"),
      options: ["1", "3", "5", t(E, "Depends on cow order", "소 순서에 따라 다름")],
      correct: 1,
      explain: t(E,
        "Bessie could go to any of the 3 tied counters. So the answer lists all 3!",
        "베시는 동점인 3개 카운터 중 아무 곳이나 갈 수 있어요. 그래서 3개 모두 답!"),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, times=[3,1,2,1]\n\n• t=0: Cow 1 → C1 (done @3), Cow 2 → C2 (done @1)\n• t=1: Cow 3 → C2 (free first) → done @3\n• t=3: both C1 and C2 free at the same time\n\nBessie (Cow 4) can go to either. How many possible counters?", "N=4, K=2, times=[3,1,2,1]\n\n• t=0: 소 1 → C1 (끝 @3), 소 2 → C2 (끝 @1)\n• t=1: 소 3 → C2 (먼저 빔) → 끝 @3\n• t=3: C1, C2 동시에 비워짐\n\n베시(소 4)는 둘 다 가능. 갈 수 있는 카운터 수는?"),
      question: t(E, "How many counters can Bessie go to?", "베시가 갈 수 있는 카운터 수는?"),
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
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 800, color: C.accent, marginBottom: 6 }}>
              {t(E, "🔧 Algorithm: Min-Heap Simulation", "🔧 알고리즘: 최소 힙 시뮬레이션")}
            </div>
            {t(E,
              "1. Push first K cows' finish times into heap\n2. For each remaining cow: pop min, assign that counter\n3. Push new finish time (old finish + cow's time)\n4. For Bessie: check all counters with minimum finish time",
              "1. 처음 K마리의 종료 시간을 힙에 넣기\n2. 나머지 소마다: 최솟값 pop, 그 카운터 배정\n3. 새 종료 시간 push (이전 종료 + 소의 시간)\n4. 베시: 최소 종료 시간인 모든 카운터 찾기")}
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
        "N=6, K=3, times=[2,3,1,4,2,1].\nHeap after first 3: [(2,0),(3,1),(1,2)].\nPop min (1,2), cow4→C3, push (1+4=5,2).\nPop min (2,0), cow5→C1, push (2+2=4,0).\nPop min (3,1), cow6→C2.\nBessie goes to counter...?", "N=6, K=3, times=[2,3,1,4,2,1].\n처음 3마리 힙: [(2,0),(3,1),(1,2)].\nPop (1,2), 소4→C3, push (5,2).\nPop (2,0), 소5→C1, push (4,0).\nPop (3,1), 소6→C2.\n베시는 카운터...?"),
      question: t(E, "Bessie (cow 6) goes to counter #? (1-indexed)", "베시(소6)는 카운터 몇번? (1부터)"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드
   ═══════════════════════════════════════════════════════════════ */
export function makeInterviewCh3(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The key insight: we need to find not just ONE counter for Bessie, but ALL counters that finish at the same minimum time when it's Bessie's turn.", "핵심: 베시 차례에 최소 종료 시간인 카운터를 하나가 아니라 전부 찾아야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init heap", "힙 초기화"), code: "heap = [(times[i], i) for i in 0..K-1]   # min-heap of (finish, counter)", color: "#059669" },
              { n: 2, label: t(E, "Each cow K..N", "K번째 이후 소"), code: "finish, counter = heappop(heap);  heappush(heap, (finish + times[i], counter))", color: "#0891b2" },
              { n: 3, label: t(E, "Save Bessie\u2019s arrival time", "베시 도착 시각 저장"), code: "bessie_start = the finish popped on Bessie\u2019s turn", color: "#7c3aed" },
              { n: 4, label: t(E, "All counters tied at that time", "그 시각에 동점인 모든 카운터"), code: "result = [c for (ft, c) in heap_just_before_Bessie if ft == bessie_start]", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#d1fae5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "\u23f1 Complexity", "\u23f1 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N log K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N cows \u00d7 log K heap ops", "N마리 \u00d7 log K 힙 연산")}</div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "After simulating N-1 cows, we check the heap.\nAll counters with the minimum finish time are valid for Bessie.", "N-1마리를 시뮬레이션한 후, 힙에서 최소 종료 시간인 카운터를 모두 찾으면 그게 베시의 가능한 카운터!"),
      question: t(E,
        "If the heap has [(5,0),(5,2),(7,1),(8,3)], which counters can Bessie go to?",
        "힙이 [(5,0),(5,2),(7,1),(8,3)]이면 베시가 갈 수 있는 카운터는?"),
      options: [
        t(E, "Counter 1 and 3 (0-indexed: 0,2)", "카운터 1, 3 (0-indexed: 0,2)"),
        t(E, "Counter 1 only", "카운터 1만"),
        t(E, "All 4 counters", "4개 전부"),
      ],
      correct: 0,
      explain: t(E,
        "Min finish = 5. Counters 0 and 2 both have finish time 5, so Bessie can go to either!",
        "최소 종료 = 5. 카운터 0과 2 모두 5니까 베시는 둘 중 하나!"),
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
        "Try it yourself.\nEnter N, K, times — watch the live assignment, see which counter Bessie ends at.", "직접 돌려봐요. N, K, times 입력 — 실시간 배정을 보고 베시가 어느 카운터로 가는지 확인."),
    },
  ];
}
