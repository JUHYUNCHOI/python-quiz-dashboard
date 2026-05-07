import { C, t } from "@/components/quest/theme";
import { getRaceSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "",
  "for _ in range(N):",
  "    K, X = map(int, input().split())",
  "    # Strategy: accelerate 0 -> v (peak), then decelerate v -> X",
  "    # accel covers 1+2+...+v = v(v+1)/2 in v seconds",
  "    # decel covers (v-1)+(v-2)+...+X = (X+v-1)(v-X)/2 in (v-X) seconds",
  "    # Find smallest peak v >= X such that total distance >= K",
  "    v = max(X, 1)",
  "    while True:",
  "        accel = v * (v + 1) // 2",
  "        decel = (X + v - 1) * (v - X) // 2 if v > X else 0",
  "        if accel + decel >= K:",
  "            break",
  "        v += 1",
  "    print(2 * v - X)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRaceCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A cow starts at speed 0 and must run a total distance of K meters. Each second, her speed goes UP by 1 OR DOWN by 1. The speed when she crosses the K-meter mark must be ≤ X.\nFor each query (K, X), print the MINIMUM number of seconds needed.",
        "한 소가 속도 0에서 시작해서 총 K미터를 달려요. 매초 속도가 +1 또는 −1 만큼 변해요. K미터를 지나는 순간의 속도는 X 이하여야 해요.\n각 쿼리 (K, X)에 대해 필요한 최소 초 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🏃"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Race</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A cow starts at speed 0 and must run a total of ", "한 소가 속도 0 에서 시작해 총 ")}
                  <b style={{ color: "#059669" }}>{t(E, "K meters", "K미터")}</b>
                  {t(E, ".", " 를 달려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each second, her speed ", "매초 속도가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "changes by +1 or −1", "+1 또는 −1")}</b>
                  {t(E, ". She covers (her current speed) meters that second.",
                        " 만큼 변해요. 그 초에 (현재 속도) 미터를 이동해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Her speed when she crosses the K-meter mark must be ", "K미터를 지나는 순간의 속도는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "≤ X", "≤ X")}</b>
                  {t(E, ".", " 이어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query (K, X), print the ", "각 쿼리 (K, X) 에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of seconds", "필요한 최소 초 수")}</b>
                  {t(E, " needed to finish.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Hand-simulate one step at a time (active visualization)
    {
      type: "reveal",
      narr: t(E,
        "Let's hand-trace K=4, X=0. Each second the speed must change by ±1, and the cow moves at her current speed. We need to land at distance ≥ 4 with final speed ≤ 0.",
        "K=4, X=0 손으로 따라가요. 매초 속도가 ±1 만큼 변하고, 그 초에 현재 속도만큼 이동해요. 거리 ≥ 4 에서 최종 속도 ≤ 0 이어야 해요."),
      content: (() => {
        // Trace the optimal: speed 0→1→2→1→0, dist 0→1→3→4. Time=4? actually 1→2→2→0...
        // Optimal for K=4, X=0: accel 0→1→2 (dist 1+2=3), decel 2→1→0 (dist 1+0=1). Total dist=4 in 4 sec.
        const trace = [
          { t: 0, speed: 0, moved: 0, total: 0, action: t(E, "start", "시작") },
          { t: 1, speed: 1, moved: 1, total: 1, action: t(E, "+1 (accelerate)", "+1 (가속)") },
          { t: 2, speed: 2, moved: 2, total: 3, action: t(E, "+1 (peak)", "+1 (정점)") },
          { t: 3, speed: 1, moved: 1, total: 4, action: t(E, "−1 (decelerate)", "−1 (감속)") },
          { t: 4, speed: 0, moved: 0, total: 4, action: t(E, "−1 → end (speed=0 ≤ X=0 ✓)", "−1 → 종료 (속도=0 ≤ X=0 ✓)") },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#059669", textAlign: "center", marginBottom: 4 }}>
              🏃 {t(E, "K=4, X=0 — trace each second", "K=4, X=0 — 매초 추적")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 12 }}>
              {t(E, "Each row: action this second, new speed, distance moved this second, total distance.",
                    "각 줄: 이 초 행동, 새 속도, 이 초 이동거리, 누적거리.")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 60px 60px", gap: "4px 8px",
                          fontSize: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 800, color: "#065f46" }}>t</div>
              <div style={{ fontWeight: 800, color: "#065f46" }}>{t(E, "action", "행동")}</div>
              <div style={{ fontWeight: 800, color: "#065f46", textAlign: "right" }}>{t(E, "speed", "속도")}</div>
              <div style={{ fontWeight: 800, color: "#065f46", textAlign: "right" }}>{t(E, "moved", "이동")}</div>
              <div style={{ fontWeight: 800, color: "#065f46", textAlign: "right" }}>{t(E, "total", "누적")}</div>
              {trace.map((r, i) => {
                const done = r.total >= 4;
                return (
                  <div key={i} style={{ display: "contents" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#7c3aed" }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: C.text, background: i === 2 ? "#fef3c7" : (done && i === trace.length - 1 ? "#dcfce7" : "transparent"), padding: "4px 6px", borderRadius: 4 }}>{r.action}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#0891b2" }}>{r.speed}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", color: "#92400e" }}>+{r.moved}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: r.total >= 4 ? "#16a34a" : C.text }}>{r.total}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 12, background: "#dcfce7", border: "2px solid #86efac", borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 12, color: "#15803d" }}>
              {t(E, "Answer for K=4, X=0: 4 seconds.  Pattern: peak speed = 2, time = peak + (peak − X) = 2 + 2.",
                    "K=4, X=0 답: 4 초. 패턴: 정점 속도 = 2, 시간 = 정점 + (정점 − X) = 2 + 2.")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Quiz — verify understanding
    {
      type: "quiz",
      narr: t(E,
        "Same idea: pick a peak speed P, accelerate to it, decelerate down to X. The smaller P that covers ≥ K wins.",
        "같은 아이디어: 정점 속도 P 고르기, P 까지 가속 후 X 까지 감속. 거리 ≥ K 인 가장 작은 P 가 답."),
      question: t(E,
        "For K=9, X=0: try peak speed P=3. Distance covered = 1+2+3 (accel) + 2+1 (decel) = 9. Time?",
        "K=9, X=0 에서 정점 P=3 시도. 거리 = 1+2+3 (가속) + 2+1 (감속) = 9. 시간은?"),
      options: [
        t(E, "5 seconds (3 accel + 2 decel)", "5 초 (가속 3 + 감속 2)"),
        t(E, "6 seconds", "6 초"),
        t(E, "9 seconds (= K)", "9 초 (= K)"),
      ],
      correct: 0,
      explain: t(E,
        "Right! Accelerate 0→1→2→3 takes 3 sec. Decelerate 3→2→1→0 takes 3 more steps but the last (speed 0) doesn't move; we stop at total 9 after 5 seconds. Formula: P + (P − X) = 3 + 3 = 6 — but here we hit K exactly at sec 5 because the final 0-speed step was unnecessary.",
        "정답! 가속 0→1→2→3 = 3 초. 감속 3→2→1 = 2 초 더 → 총 5 초에 누적 9 도달. 공식 P + (P − X) = 6 인데 마지막 속도 0 단계가 불필요해서 5 초에 끝나요."),
    },
    // 1-4: Input — apply the formula
    {
      type: "input",
      narr: t(E,
        "Now you try: K=10, X=2. Find the smallest peak speed P (≥ X) such that accel-distance + decel-distance ≥ 10. Then time = P + (P − X).",
        "직접: K=10, X=2. 거리 ≥ 10 이 되는 가장 작은 정점 P (≥ X) 찾기. 시간 = P + (P − X)."),
      question: t(E,
        "K=10, X=2. Try P=3: dist = (1+2+3) + nothing-to-decel-since-already-X+something? Try P=4: accel=1+2+3+4=10, decel from 4 to 2 = 3+2 = 5. Total dist 15 ≥ 10. Time = 4 + (4 − 2) = ?",
        "K=10, X=2. P=4 시도: 가속 1+2+3+4=10, 감속 3+2=5. 누적 15 ≥ 10. 시간 = 4 + (4 − 2) = ?"),
      hint: t(E,
        "Time formula: P + (P − X) = 4 + 2.",
        "시간 = P + (P − X) = 4 + 2."),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRaceCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Optimal strategy: accelerate to some peak speed P, then decelerate to ≤ X. Distance covered = (1+2+…+P) for accel + (P+(P−1)+…+(X+1)) for decel. Find smallest P so total ≥ K, and total time = P + (P − X).",
        "최적 전략: 어떤 최고 속도 P 까지 가속, 그 후 X 이하로 감속. 거리 = 가속 (1+2+…+P) + 감속 (P+(P−1)+…+(X+1)). 총 거리 ≥ K 가 되는 가장 작은 P 를 찾으면 총 시간 = P + (P − X)."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getRaceSections(E),
    },
  ];
}
