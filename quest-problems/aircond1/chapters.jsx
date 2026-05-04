import { C, t } from "@/components/quest/theme";
import { getAirCond1Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "current = list(map(int, input().split()))",
  "preferred = list(map(int, input().split()))",
  "",
  "# Compute difference array",
  "d = [preferred[i] - current[i] for i in range(N)]",
  "",
  "# Answer = sum of positive increases + sum of negative decreases",
  "# Think of it like painting: when diff goes up, new strokes needed",
  "ans = 0",
  "prev = 0",
  "for i in range(N):",
  "    if d[i] > prev:",
  "        ans += d[i] - prev  # need more positive strokes",
  "    elif d[i] < prev:",
  "        ans += prev - d[i]  # need more negative strokes (if sign flips)",
  "    prev = d[i]",
  "",
  "# Handle the boundary at the end",
  "ans += abs(prev)",
  "",
  "# Simpler equivalent: ans = sum(max(0, d[i]-d[i-1]) for increases)",
  "#                       + sum(max(0, d[i-1]-d[i]) for decreases)",
  "# with d[-1] = d[N] = 0",
  "",
  "# Even simpler:",
  "d2 = [preferred[i] - current[i] for i in range(N)]",
  "ans2 = abs(d2[0])",
  "for i in range(1, N):",
  "    ans2 += max(0, d2[i] - d2[i-1])  # positive jumps",
  "    ans2 += max(0, d2[i-1] - d2[i])  # handled by abs at end? No.",
  "# Correct approach:",
  "ans3 = 0",
  "ext = [0] + d2 + [0]",
  "for i in range(1, len(ext)):",
  "    if ext[i] > ext[i-1]:",
  "        ans3 += ext[i] - ext[i-1]",
  "",
  "print(ans3)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAirCond1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N stalls in a row, each with a current temperature p[i] and a target temperature q[i]. One AC command adjusts EVERY stall in some contiguous range by +1 OR by -1.\nPrint the MINIMUM number of AC commands to make every p[i] equal q[i].",
        "FJ 에게 한 줄로 늘어선 N 개 축사가 있고, 각자 현재 온도 p[i] 와 목표 온도 q[i] 를 가져요. AC 명령 한 번은 어떤 연속한 구간의 모든 축사를 동시에 +1 또는 -1 만큼 조절해요.\n모든 p[i] 가 q[i] 와 같아지도록 만드는 최소 AC 명령 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf21\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Air Cownditioning</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N stalls in a row", "한 줄로 늘어선 N 개 축사")}</b>
                  {t(E, " — each with current temperature ", " 가 있고, 각자 현재 온도 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>p[i]</code>
                  {t(E, " and target ", " 와 목표 온도 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>q[i]</code>
                  {t(E, ".", " 를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One AC command: adjust EVERY stall in a ", "AC 명령 한 번: 어떤 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous range by +1 OR -1", "연속한 구간을 동시에 +1 또는 -1")}</b>
                  {t(E, ".", " 만큼 조절.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of AC commands to make every p[i] = q[i]", "모든 p[i] = q[i] 가 되도록 만드는 최소 AC 명령 횟수")}</b>
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
        "Think of the diff array like a histogram.\nEach horizontal stroke covers a range.\nHow many strokes do we need?", "차이 배열을 히스토그램처럼 생각해요. 각 수평 선은 구간을 커버해요. 몇 개의 선이 필요할까?"),
      question: t(E,
        "diff = [3, 3, 3]. How many commands needed? (One command covers all 3, repeated 3 times)",
        "diff = [3, 3, 3]. 필요한 명령 수? (하나의 명령이 3칸 모두 커버, 3번 반복)"),
      options: [
        t(E, "3 commands", "3번"),
        t(E, "9 commands", "9번"),
        t(E, "1 command", "1번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! One command covers stalls 1-3 with +1, repeated 3 times = 3 total commands.",
        "맞아! 1-3번 칸을 +1하는 명령을 3번 반복 = 총 3번 명령."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "diff = [3, 3, 3]. All same height. One wide stroke repeated 3 times.", "diff = [3, 3, 3]. 높이가 모두 같아요. 넓은 선 하나를 3번 반복."),
      question: t(E,
        "diff = [3, 3, 3]. Min commands?",
        "diff = [3, 3, 3]. 최소 명령 수?"),
      hint: t(E,
        "All stalls need +3. One command covers all 3 stalls. Repeat 3 times.",
        "모든 칸이 +3 필요. 하나의 명령이 3칸 모두 커버. 3번 반복."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAirCond1Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Compute d[i] = q[i] − p[i] (the change needed). The minimum number of range +1/−1 commands equals the sum of POSITIVE jumps in d (extended with 0 at both ends).",
        "d[i] = q[i] − p[i] (필요한 변화) 를 계산. 최소 범위 +1/−1 명령 수는 d (양 끝에 0 추가) 에서 양의 점프의 합과 같아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Compute diff array", "차이 배열 계산"), code: "d[i] = q[i] − p[i]", color: "#f97316" },
              { n: 2, label: t(E, "Pad with 0 at both ends", "양 끝에 0 추가"), code: "d = [0] + d + [0]", color: "#7c3aed" },
              { n: 3, label: t(E, "Sum positive jumps", "양의 점프 합산"), code: "ans = sum(max(0, d[i] − d[i-1]))", color: "#0891b2" },
              { n: 4, label: t(E, "Print", "출력"), code: "print(ans)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan over the diff array", "차이 배열 한 번 선형 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getAirCond1Sections(E),
    },
  ];
}
