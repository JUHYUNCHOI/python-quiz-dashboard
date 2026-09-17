import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getRaceSections } from "./components";

/* ----------------------------------------------------------------
   Interactive: Peak-Speed Simulator
   Student drags peak P (and X, K) and watches the cow's speed
   profile play out as a bar chart of per-second moves, with
   cumulative distance counting up against target K.
   ---------------------------------------------------------------- */
function PeakSpeedSim({ E }) {
  const [K, setK] = useState(20);
  const [X, setX] = useState(1);
  const [P, setP] = useState(4);
  const [tick, setTick] = useState(-1);

  const safeP = Math.max(P, X, 1);
  const accelSpeeds = [];
  for (let s = 1; s <= safeP; s++) accelSpeeds.push(s);
  const decelSpeeds = [];
  if (safeP > X) {
    for (let s = safeP - 1; s >= X; s--) decelSpeeds.push(s);
  }
  const allSpeeds = [...accelSpeeds, ...decelSpeeds];
  const totalDist = allSpeeds.reduce((a, b) => a + b, 0);
  const totalTime = allSpeeds.length;
  const reaches = totalDist >= K;

  const visible = tick < 0 ? allSpeeds.length : Math.min(tick, allSpeeds.length);
  let cum = 0;
  for (let i = 0; i < visible; i++) cum += allSpeeds[i];

  const play = () => {
    setTick(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTick(i);
      if (i >= allSpeeds.length) {
        clearInterval(id);
        setTimeout(() => setTick(-1), 800);
      }
    }, 380);
  };

  const A = "#059669";
  const maxBar = Math.max(...allSpeeds, 1);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: A, textAlign: "center", marginBottom: 4 }}>
        🎚️ {t(E, "Peak-speed simulator — drag P, X, K", "정점 시뮬레이터 — P, X, K 조절")}
      </div>
      <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 12 }}>
        {t(E,
          "Each bar = one second. Green = accelerate (+1), orange = decelerate (−1). Find the smallest peak P that covers ≥ K.",
          "막대 하나가 1 초예요. 초록은 가속(+1), 주황은 감속(−1) 이에요. 거리가 K 이상이 되는 가장 작은 정점 P 를 찾아봐요.")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 50px", gap: "6px 10px", alignItems: "center", marginBottom: 10, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: "#065f46" }}>K</div>
        <input type="range" min={1} max={60} value={K} onChange={(e) => { setK(+e.target.value); setTick(-1); }} style={{ accentColor: A }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#065f46", textAlign: "right" }}>{K}</div>

        <div style={{ fontWeight: 700, color: "#065f46" }}>X</div>
        <input type="range" min={0} max={6} value={X} onChange={(e) => { const v = +e.target.value; setX(v); if (P < v) setP(v); setTick(-1); }} style={{ accentColor: A }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#065f46", textAlign: "right" }}>{X}</div>

        <div style={{ fontWeight: 700, color: "#7c3aed" }}>P</div>
        <input type="range" min={Math.max(X, 1)} max={12} value={safeP} onChange={(e) => { setP(+e.target.value); setTick(-1); }} style={{ accentColor: "#7c3aed" }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#7c3aed", textAlign: "right" }}>{safeP}</div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 90, padding: "0 4px", borderBottom: "2px solid #d1d5db", marginBottom: 6 }}>
        {allSpeeds.map((s, i) => {
          const isAccel = i < accelSpeeds.length;
          const shown = i < visible;
          const h = (s / maxBar) * 80;
          return (
            <div key={i} style={{
              width: 18,
              height: h,
              background: shown ? (isAccel ? A : "#f59e0b") : "#e5e7eb",
              borderRadius: "3px 3px 0 0",
              position: "relative",
              transition: "background 0.25s, height 0.25s",
            }}>
              <div style={{ position: "absolute", top: -16, left: 0, right: 0, textAlign: "center", fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: shown ? (isAccel ? A : "#b45309") : "#9ca3af" }}>{s}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.dim, marginBottom: 10, padding: "0 4px" }}>
        <span>t = 1</span>
        <span>t = {totalTime}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
        <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#065f46", fontWeight: 700 }}>{t(E, "distance", "거리")}</div>
          <div style={{ fontSize: 14, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: cum >= K ? "#16a34a" : "#065f46" }}>
            {cum} / {K}
          </div>
        </div>
        <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#065f46", fontWeight: 700 }}>{t(E, "time", "시간")}</div>
          <div style={{ fontSize: 14, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#065f46" }}>
            {totalTime}s
          </div>
        </div>
        <button onClick={play} disabled={tick >= 0} style={{
          background: tick >= 0 ? "#9ca3af" : A, color: "#fff", border: "none", borderRadius: 8,
          padding: "6px 8px", fontSize: 12, fontWeight: 700, cursor: tick >= 0 ? "default" : "pointer",
        }}>
          ▶ {t(E, "Play", "재생")}
        </button>
      </div>

      <div style={{
        background: reaches ? "#dcfce7" : "#fef3c7",
        border: `1px solid ${reaches ? "#86efac" : "#fbbf24"}`,
        borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 12,
        color: reaches ? "#15803d" : "#92400e",
      }}>
        {reaches
          ? t(E,
              `✓ Peak P=${safeP} covers ${totalDist} ≥ K=${K}. Time = P + (P − X) = ${totalTime}. Try smaller P to see what fails.`,
              `✓ 정점 P=${safeP} 으로 ${totalDist} ≥ K=${K} 도달. 시간 = P + (P − X) = ${totalTime}. P 줄여서 실패 케이스도 확인해 봐.`)
          : t(E,
              `✗ Peak P=${safeP} only covers ${totalDist} < K=${K}. Increase P.`,
              `✗ 정점 P=${safeP} 은 ${totalDist} < K=${K} 만 도달. P 를 늘려야 해.`)}
      </div>
    </div>
  );
}

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
        "K미터를 달리되 끝 속도가 X 를 넘지 않는 최소 시간을 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🏃"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Race</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "For each (K, X), output the minimum seconds to cover K meters and finish at speed ≤ X.",
                "(K, X) 마다 K 미터를 달리고 끝 속도 ≤ X 로 멈추는 최소 초 수를 출력해요.")}
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
                  {t(E, "A cow starts at speed 0 and must run a total of ", "한 소가 속도 0 에서 시작해 총 ")}
                  <b style={{ color: "#059669" }}>{t(E, "K meters", "K미터")}</b>
                  {t(E, ".", " 를 달려요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each second, her speed ", "매초 속도가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "changes by +1 or −1", "+1 또는 −1")}</b>
                  {t(E, ". She covers (her current speed) meters that second.",
                        " 만큼 변해요. 그 초에 (현재 속도) 미터를 이동해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Her speed when she crosses the K-meter mark must be ", "K미터를 지나는 순간의 속도는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "≤ X", "≤ X")}</b>
                  {t(E, ".", " 이어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query (K, X), print the ", "물음 (K, X) 마다 ")}
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
        "K=4, X=0 을 한 초씩 손으로 따라가 볼까요?"),
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
            <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 4 }}>
              🏃 {t(E, "K=4, X=0 — trace each second", "K=4, X=0 — 매초 추적")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 12 }}>
              {t(E, "Each row: action this second, new speed, distance moved this second, total distance.",
                    "한 줄에 그 초의 행동과 새 속도, 그 초에 간 거리, 총 거리를 적었어요.")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 60px 60px", gap: "4px 8px",
                          fontSize: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 600, color: "#065f46" }}>t</div>
              <div style={{ fontWeight: 600, color: "#065f46" }}>{t(E, "action", "행동")}</div>
              <div style={{ fontWeight: 600, color: "#065f46", textAlign: "right" }}>{t(E, "speed", "속도")}</div>
              <div style={{ fontWeight: 600, color: "#065f46", textAlign: "right" }}>{t(E, "moved", "이동")}</div>
              <div style={{ fontWeight: 600, color: "#065f46", textAlign: "right" }}>{t(E, "total", "총 거리")}</div>
              {trace.map((r, i) => {
                const done = r.total >= 4;
                return (
                  <div key={i} style={{ display: "contents" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "#7c3aed" }}>{r.t}</div>
                    <div style={{ fontSize: 11, color: C.text, background: i === 2 ? "#fef3c7" : (done && i === trace.length - 1 ? "#dcfce7" : "transparent"), padding: "4px 6px", borderRadius: 4 }}>{r.action}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#0891b2" }}>{r.speed}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", color: "#92400e" }}>+{r.moved}</div>
                    <div style={{ textAlign: "right", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: r.total >= 4 ? "#16a34a" : C.text }}>{r.total}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 12, background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 12, color: "#15803d" }}>
              {t(E, "Answer for K=4, X=0: 4 seconds.  Pattern: peak speed = 2, time = peak + (peak − X) = 2 + 2.",
                    "K=4, X=0 의 답은 4 초예요. 정점 속도가 2 니까 시간은 정점 + (정점 − X) = 2 + 2 예요.")}
            </div>
          </div>
        );
      })(),
    },
    // 1-2b: Interactive peak-speed simulator
    {
      type: "reveal",
      narr: t(E,
        "Now play with the peak P yourself. Drag the sliders and press Play to watch the cow accelerate then decelerate. Find the smallest P that still reaches K.",
        "정점 P 를 움직여서 K 에 닿는 가장 작은 P 를 찾아봐요."),
      content: <PeakSpeedSim E={E} />,
    },
    // 1-3: Quiz — verify understanding
    {
      type: "quiz",
      narr: t(E,
        "Same idea: pick a peak speed P, accelerate to it, decelerate down to X. The smaller P that covers ≥ K wins.",
        "거리가 K 이상이 되는 가장 작은 정점 P 가 답이에요."),
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
        "맞아요! 가속 0→1→2→3 에 3 초, 감속 3→2→1 에 2 초가 더 들어서 5 초 만에 총 거리 9 에 닿아요. 공식으로는 P + (P − X) = 6 이지만, 마지막 속도 0 인 걸음은 안 움직이니까 5 초에 끝나요."),
    },
    // 1-4: Input — apply the formula
    {
      type: "input",
      narr: t(E,
        "Now you try: K=10, X=2. Find the smallest peak speed P (≥ X) such that accel-distance + decel-distance ≥ 10. Then time = P + (P − X).",
        "K=10, X=2 일 때 걸리는 시간을 직접 구해 볼까요?"),
      question: t(E,
        "K=10, X=2. Try P=3: dist = (1+2+3) + nothing-to-decel-since-already-X+something? Try P=4: accel=1+2+3+4=10, decel from 4 to 2 = 3+2 = 5. Total dist 15 ≥ 10. Time = 4 + (4 − 2) = ?",
        "K=10, X=2 에서 P=4 로 해 봐요. 가속 1+2+3+4=10, 감속 3+2=5 라서 총 거리 15 로 10 을 넘어요. 시간 = 4 + (4 − 2) = ?"),
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
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Optimal: accelerate to some peak P, then decelerate to ≤ X. Distance = (1+…+P) + (P+(P−1)+…+(X+1)). Find smallest P with total ≥ K → time = P + (P − X). Sections build it one piece at a time.",
        "정점 P 까지 가속했다가 X 까지 감속하는 게 제일 좋아요."),
      sections: getRaceSections(E),
    },
  ];
}
