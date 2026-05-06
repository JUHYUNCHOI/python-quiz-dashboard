import { C, t } from "@/components/quest/theme";
import { getClockFenceSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "s = input().strip()",
  "",
  "# Direction mapping: N=0, E=1, S=2, W=3",
  "dir_map = {'N': 0, 'E': 1, 'S': 2, 'W': 3}",
  "",
  "right_turns = 0",
  "left_turns = 0",
  "",
  "for i in range(len(s)):",
  "    cur = dir_map[s[i]]",
  "    nxt = dir_map[s[(i+1) % len(s)]]",
  "    diff = (nxt - cur) % 4",
  "    if diff == 1:",
  "        right_turns += 1",
  "    elif diff == 3:",
  "        left_turns += 1",
  "    # diff == 2 means U-turn, diff == 0 means straight",
  "",
  "if right_turns > left_turns:",
  "    print('CW')",
  "else:",
  "    print('CCW')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A fence is described by a sequence of unit-step directions (N, E, S, W) that returns to the start, forming a closed simple polygon.\nDecide whether the fence is traced CLOCKWISE or COUNTER-CLOCKWISE.",
        "울타리는 단위 길이 방향 (N, E, S, W) 의 수열로 주어져요. 그 방향대로 따라가면 시작점으로 돌아오고, 자기 자신과 교차하지 않는 닫힌 다각형이 만들어져요.\n이 울타리가 시계 방향 (CW) 으로 그려졌는지 반시계 방향 (CCW) 으로 그려졌는지 판단해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Clockwise Fence</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A fence is given as a ", "울타리가 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "string of unit-step directions", "단위 길이 방향 문자열")}</b>
                  {t(E, " — letters ", " — 문자 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>N E S W</code>
                  {t(E, " (north / east / south / west).", " (북 / 동 / 남 / 서) 로 표현돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Following the directions ", "방향을 따라가면 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "returns to the start", "시작점으로 돌아와요")}</b>
                  {t(E, " — forming a closed simple polygon (no self-crossings).",
                        " — 자기 자신과 교차하지 않는 닫힌 단순 다각형이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "CW if the fence is traced clockwise, else CCW", "시계 방향이면 CW, 아니면 CCW")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "The path 'NESW' makes a square: go North, then East, then South, then West.\nEach turn is a right turn.\nIs this clockwise?", "경로 'NESW'는 정사각형: 북쪽, 동쪽, 남쪽, 서쪽. 각 회전이 오른쪽 회전이에요. 시계 방향일까요?"),
      question: t(E,
        "'NESW' path: all right turns. Clockwise?",
        "'NESW' 경로: 모두 오른쪽 회전. 시계 방향?"),
      options: [
        t(E, "Yes, CW", "네, 시계 방향"),
        t(E, "No, CCW", "아니요, 반시계 방향"),
      ],
      correct: 0,
      explain: t(E,
        "All 4 transitions are right turns (N->E, E->S, S->W, W->N). More right turns than left = clockwise!",
        "4개 전환 모두 오른쪽 회전(N->E, E->S, S->W, W->N). 오른쪽 회전이 왼쪽보다 많으면 = 시계 방향!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For 'NESW': N->E is right, E->S is right, S->W is right, W->N is right.\nHow many right turns total?", "'NESW'에서: N->E 오른쪽, E->S 오른쪽, S->W 오른쪽, W->N 오른쪽. 오른쪽 회전 총 몇 번?"),
      question: t(E,
        "'NESW': right turns - left turns = ?",
        "'NESW': 오른쪽 회전 - 왼쪽 회전 = ?"),
      hint: t(E,
        "All 4 turns are right turns, 0 left turns. 4 - 0 = 4.",
        "4번 모두 오른쪽 회전, 왼쪽 회전 0번. 4 - 0 = 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeClockCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Map N=0, E=1, S=2, W=3. For each consecutive direction pair (d_i, d_{i+1}), the difference (d_{i+1} − d_i) mod 4 is 1 for a right turn and 3 for a left turn. CW iff right turns > left turns.",
        "N=0, E=1, S=2, W=3 매핑. 연속 방향 쌍 (d_i, d_{i+1}) 의 차이 (d_{i+1} − d_i) mod 4 가 1 이면 오른쪽 회전, 3 이면 왼쪽 회전. 오른쪽 > 왼쪽 이면 CW."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Map directions to 0..3", "방향을 0..3 으로 매핑"), code: "d = [{'N':0,'E':1,'S':2,'W':3}[c] for c in path]", color: "#8b5cf6" },
              { n: 2, label: t(E, "Iterate consecutive pairs", "연속 쌍 순회"), code: "for i in range(N): turn = (d[(i+1) % N] - d[i]) % 4", color: "#7c3aed" },
              { n: 3, label: t(E, "Count right (1) vs left (3) turns", "오른쪽 (1) vs 왼쪽 (3) 회전 세기"), code: "if turn == 1: right += 1  elif turn == 3: left += 1", color: "#0891b2" },
              { n: 4, label: t(E, "CW if right > left", "오른쪽이 더 많으면 CW"), code: "print('CW' if right > left else 'CCW')", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass over direction string", "방향 문자열 한 번 순회")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getClockFenceSections(E),
    },
  ];
}
