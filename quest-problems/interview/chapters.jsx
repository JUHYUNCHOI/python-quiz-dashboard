import { C, t } from "@/components/quest/theme";
import { getInterviewWalk } from "./components";

/* 2026-09-25: 여기 있던 SOLUTION_CODE(export const) 를 지웠다 — export 만 되고
   어디서도 import 되지 않는 죽은 사본이었다(오직 이 파일의 `_legacyCode:` 필드
   하나가 참조했는데 그 필드도 App.jsx 어디서도 안 읽힌다). 게다가 **틀린 옛
   알고리즘**이었다 — components.jsx 헤더가 말하듯 "예전엔 마지막 동점만 봐서
   답을 빠뜨렸다"; 지금 화면에 보이는 코드는 components.jsx 의 IV_FULL_PY/CPP 다.
   백업이 아니라 함정이었다 (explodingarrow 에서 2026-09-17 에 같은 판정: '지운다'). */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해
   ═══════════════════════════════════════════════════════════════ */
export function makeInterviewCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Which counter could Bessie, last in line, end up at?",
        "줄 맨 뒤의 Bessie 는 어느 카운터로 갈 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Bessie's Interview</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Silver #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output every counter Bessie (the last cow) could possibly end up at, in increasing order.",
                "줄 맨 뒤의 소 Bessie 가 갈 수 있는 카운터 번호를 작은 것부터 모두 출력해요.")}
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
                        "Bessie 는 마지막 소예요. 동시에 비면 작은 번호로 간다는 규칙을 빼고, Bessie 가 갈 수 있는 카운터 번호를 작은 것부터 모두 출력해요.")}
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
        "소들이 카운터 2개에 시간 순서로 들어가는 걸 봐요."),
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
                {t(E, "🚨 At t=5: both C1 and C2 are free at the same time!", "🚨 t=5 에 C1 과 C2 가 동시에 비어요!")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {t(E,
                  "Cow 4 (the next in line) could go to either counter.\nSo if Cow 4 = Bessie, the answer is: 2 possible counters.",
                  "다음 차례인 소 4 는 둘 중 어디든 갈 수 있어요.\n소 4 가 Bessie 라면 갈 수 있는 카운터는 2개예요.")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "When multiple counters finish at the same time, the cow could go to ANY of them.\nThat's why we need to find ALL possible counters for Bessie!", "여러 카운터가 동시에 끝나면 소는 어디든 갈 수 있어요."),
      question: t(E,
        "If counters 1, 3, 5 all finish at the same time and Bessie is next, how many possible counters does she have?",
        "카운터 1, 3, 5 가 동시에 끝나고 Bessie 가 다음이면, 갈 수 있는 카운터는 몇 개일까요?"),
      options: ["1", "3", "5", t(E, "Depends on cow order", "소 순서에 따라 달라요")],
      correct: 1,
      explain: t(E,
        "Bessie could go to any of the 3 tied counters. So the answer lists all 3!",
        "Bessie 는 동시에 끝난 카운터 3개 중 아무 곳이나 갈 수 있어요. 그래서 3개 모두 답이에요."),
    },
    {
      type: "input",
      narr: t(E,
        "N=4, K=2, times=[3,1,2,1] — trace it and see how many counters Bessie could land on.", "N=4, K=2, times=[3,1,2,1] — 직접 따라가며 몇 개인지 봐요."),
      question: t(E, "How many counters can Bessie go to?", "Bessie 가 갈 수 있는 카운터는 몇 개일까요?"),
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
        "We use a min-heap (priority queue) to track when each counter finishes.\nThe cow always goes to the counter that finishes earliest!", "최소 힙으로 각 카운터가 언제 끝나는지 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `1px solid ${C.accentBd}`, borderRadius: 14, padding: 14, fontSize: 13, lineHeight: 1.8, color: C.text, whiteSpace: "pre-line" }}>
            <div style={{ fontWeight: 600, color: C.accent, marginBottom: 6 }}>
              {t(E, "🔧 Algorithm: Min-Heap Simulation", "🔧 알고리즘: 최소 힙 시뮬레이션")}
            </div>
            {t(E,
              "1. Push first K cows' finish times into heap\n2. Pop EVERY farmer tied for the smallest finish time together — that's one tie event\n3. Not enough cows left for the whole tied group? That's Bessie's moment — stop\n4. Otherwise push each farmer back with a new finish time, and keep going\n5. For Bessie: start from the farmer free at that moment, then walk the tie events backward — anyone who ever tied with them joins the answer too",
              "1. 처음 K 마리의 종료 시간을 힙에 넣어요\n2. 가장 빨리 끝나는 시각이 같은 농부를 한꺼번에 pop 해요 — 이걸 '동점 사건'으로 기록해요\n3. 남은 소가 그 동점 묶음보다 적으면 — 바로 그때가 Bessie 차례예요, 멈춰요\n4. 아니면 각 농부를 새 종료 시간으로 다시 push 하고 계속해요\n5. Bessie 차례: 그 순간 비어 있는 농부에서 시작해서, 기록해 둔 동점 사건을 거꾸로 훑어요 — 한 번이라도 같이 묶였던 농부는 전부 답에 넣어요")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Why do we use a min-heap instead of just scanning all K counters each time?", "왜 매번 K 개 카운터를 다 훑지 않고 최소 힙을 쓸까요?"),
      question: t(E,
        "What's the time complexity advantage of using a min-heap?",
        "최소 힙을 쓰면 시간이 얼마나 줄어들까요?"),
      options: [
        t(E, "O(N log K) vs O(NK)", "O(N log K) vs O(NK)"),
        t(E, "O(N) vs O(NK)", "O(N) vs O(NK)"),
        t(E, "O(K) vs O(N)", "O(K) vs O(N)"),
      ],
      correct: 0,
      explain: t(E,
        "Heap push/pop is O(log K), and we do it N times → O(N log K). Without heap: O(NK) scanning all counters each time.",
        "힙 push/pop 은 O(log K) 이고 N 번 하니까 O(N log K) 예요. 힙이 없으면 매번 K 개를 다 훑어서 O(NK) 가 돼요."),
    },
    {
      type: "sim",
      narr: t(E,
        "Step through the assignment.\nN=5, K=2, times=[3,5,2,4,1].\nWatch how each cow goes to the earliest-free counter.", "각 소가 가장 먼저 빈 카운터로 가는 걸 한 걸음씩 봐요."),
    },
    {
      type: "audit",
      narr: t(E,
        "Deep-audit the heap: N=5, K=2, times=[1,1,5,1,1].\nAn EARLIER tie can still change who reaches Bessie — watch closely.",
        "겉보기엔 지금 동점이 없는데, 왜 Bessie 자리가 두 곳일까요?"),
    },
    {
      type: "input",
      narr: t(E,
        "Walk the heap simulation yourself for N=6, K=3, times=[2,3,1,4,2,1].  Which counter ends up free first when Bessie arrives?",
        "N=6, K=3, times=[2,3,1,4,2,1] 의 힙 시뮬을 직접 따라가 봐요."),
      question: t(E, "Bessie (cow 6) goes to counter #? (1-indexed)", "Bessie(소 6)는 몇 번 카운터로 갈까요? (1 부터)"),
      hint: t(E,
        "After each cow, the counter she went to gets her finish time pushed back into the heap.",
        "소를 보낼 때마다 그 카운터의 새 종료 시간이 힙에 다시 들어가요."),
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
        "This heap is JUST BEFORE Bessie's turn — but it's not the whole story yet.",
        "이 힙은 Bessie 바로 직전 상태예요 — 그런데 이게 다가 아니에요."),
      question: t(E,
        "If the heap has [(5,0),(5,2),(7,1),(8,3)], which counters tie right now?",
        "힙이 [(5,0),(5,2),(7,1),(8,3)] 이면 지금 어느 카운터끼리 동점일까요?"),
      options: [
        t(E, "Counter 1 and 3 (0-indexed: 0,2)", "카운터 1, 3 (0-indexed: 0,2)"),
        t(E, "Counter 1 only", "카운터 1만"),
        t(E, "All 4 counters", "4개 전부"),
      ],
      correct: 0,
      explain: t(E,
        "Min finish = 5, so counters 0 and 2 tie right now. But that's not always the full answer — if either of them tied with someone EARLIER too, that farmer joins the answer as well.",
        "가장 빠른 종료 시간은 5 라서 지금은 카운터 0과 2가 묶여요. 그런데 이게 항상 다는 아니에요 — 둘 중 하나가 예전에 다른 카운터와도 동점이었다면, 그 카운터도 답에 들어가요."),
    },
    {
      type: "interview-walk",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 부분별로 읽어 봐요 (위에서 Python ↔ C++ 바꾸기)."),
    },
    {
      type: "runner",
      narr: t(E,
        "Try it yourself.\nEnter N, K, times — watch the live assignment, see which counter Bessie ends at.", "N, K, times 를 넣고 Bessie 가 어느 카운터로 가는지 봐요."),
    },
  ];
}
