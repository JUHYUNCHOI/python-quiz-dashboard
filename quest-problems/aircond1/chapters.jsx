import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAirCond1Sections } from "./components";

/* ================================================================
   Bilingual sim — Stroke Counter
   Visualises the diff array as a histogram with 0-padding on both
   sides. The minimum number of +1 / -1 range commands equals the
   sum of POSITIVE jumps in the extended diff array. Students edit
   each bar with +/- and watch strokes light up step by step.
   ================================================================ */
function StrokeCounterSim({ E }) {
  const [d, setD] = useState([1, 3, 2]);
  const ext = [0, ...d, 0];
  const jumps = [];
  let total = 0;
  for (let i = 1; i < ext.length; i++) {
    const up = ext[i] - ext[i - 1];
    if (up > 0) { jumps.push({ at: i, up }); total += up; }
  }
  const maxAbs = Math.max(3, ...d.map(v => Math.abs(v)));
  const bump = (i, delta) => {
    const nd = [...d];
    nd[i] = Math.max(-5, Math.min(5, nd[i] + delta));
    setD(nd);
  };
  const reset = (preset) => setD(preset);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>
          🧪 {t(E, "Sim — Stroke Counter", "시뮬 — 선 세기")}
        </div>
        <div style={{ fontSize: 12, color: "#9a3412", lineHeight: 1.55 }}>
          {t(E,
            "Edit each diff value with + / −. Watch the strokes (positive jumps in the 0-padded diff) light up. The total count is the answer.",
            "각 칸의 diff 값을 + / − 로 바꿔봐. 0 으로 감싼 diff 에서 양의 점프(빨간 화살표)가 켜져요. 그 합이 답이에요.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={() => reset([1, 3, 2])} style={btnStyle()}>{t(E, "Preset A [1,3,2]", "예시 A [1,3,2]")}</button>
        <button onClick={() => reset([3, 3, 3])} style={btnStyle()}>{t(E, "Preset B [3,3,3]", "예시 B [3,3,3]")}</button>
        <button onClick={() => reset([1, -2, 1])} style={btnStyle()}>{t(E, "Preset C [1,-2,1]", "예시 C [1,-2,1]")}</button>
      </div>

      {/* Histogram */}
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 4, height: 180, position: "relative" }}>
          {ext.map((v, i) => {
            const isPad = i === 0 || i === ext.length - 1;
            const h = (Math.abs(v) / maxAbs) * 70;
            const isJump = jumps.some(j => j.at === i);
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56, position: "relative" }}>
                {/* Jump arrow */}
                {isJump && (
                  <div style={{ position: "absolute", top: -2, left: -10, fontSize: 13, color: "#f97316", fontWeight: 800 }}>
                    ↑{ext[i] - ext[i - 1]}
                  </div>
                )}
                <div style={{ height: 80, display: "flex", alignItems: "flex-end" }}>
                  {v > 0 && <div style={{ width: 36, height: `${h}px`, background: isPad ? "#475569" : "#f97316", borderRadius: "4px 4px 0 0" }} />}
                </div>
                <div style={{ height: 2, width: 44, background: "#475569" }} />
                <div style={{ height: 80, display: "flex", alignItems: "flex-start" }}>
                  {v < 0 && <div style={{ width: 36, height: `${h}px`, background: isPad ? "#475569" : "#7c3aed", borderRadius: "0 0 4px 4px" }} />}
                </div>
                <div style={{ fontSize: 11, color: isPad ? "#64748b" : "#fde68a", marginTop: 4, fontFamily: "monospace" }}>
                  {isPad ? "0" : v}
                </div>
                <div style={{ fontSize: 9, color: "#64748b", marginTop: 1 }}>
                  {isPad ? (i === 0 ? "pad" : "pad") : `i=${i - 1}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editable controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {d.map((v, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: 6, background: "#fff" }}>
            <div style={{ fontSize: 10, color: C.dim, marginBottom: 2 }}>d[{i}]</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316", fontFamily: "monospace", minWidth: 28, textAlign: "center" }}>{v}</div>
            <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
              <button onClick={() => bump(i, +1)} style={tickStyle()}>+</button>
              <button onClick={() => bump(i, -1)} style={tickStyle()}>−</button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={{ background: "#ecfdf5", border: "1.5px solid #15803d", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#14532d", letterSpacing: 0.5, marginBottom: 4 }}>
          {t(E, "Total commands = sum of positive jumps", "총 명령 수 = 양의 점프 합")}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#15803d", fontFamily: "monospace" }}>
          {jumps.length === 0 ? "0" : jumps.map(j => j.up).join(" + ") + " = " + total}
        </div>
      </div>
    </div>
  );
}

function btnStyle() {
  return {
    background: "#fff", color: "#9a3412", border: "1.5px solid #fdba74",
    borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
  };
}
function tickStyle() {
  return {
    background: "#f97316", color: "#fff", border: "none",
    borderRadius: 6, width: 26, height: 24, fontSize: 13, fontWeight: 800, cursor: "pointer",
  };
}

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
        "FJ 에게 한 줄로 늘어선 N 개 축사가 있어요. 각 축사는 현재 온도 p[i] 와 목표 온도 q[i] 를 가져요.\nAC 명령을 한 번 쓰면 어떤 연속한 구간의 모든 축사를 동시에 +1 또는 -1 만큼 조절할 수 있어요. 모든 p[i] 를 q[i] 와 같게 만드는 최소 명령 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf21\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Air Cownditioning</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Print the minimum number of range +1/−1 commands to turn p[] into q[].",
                "p[] 를 q[] 로 만드는 최소 구간 +1/−1 명령 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One AC command: adjust EVERY stall in a ", "AC 명령 한 번: 어떤 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous range by +1 OR -1", "연속한 구간을 동시에 +1 또는 -1")}</b>
                  {t(E, ".", " 만큼 조절.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
    // 1-3: Sim — Stroke Counter (deep audit)
    {
      type: "reveal",
      narr: t(E,
        "Play with the diff array and watch positive jumps light up. The total of those jumps is the minimum number of AC commands.",
        "diff 배열을 직접 바꿔봐. 양의 점프가 켜져요. 그 합이 최소 AC 명령 횟수예요."),
      content: <StrokeCounterSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "diff = [3, 3, 3]. All same height. One wide stroke repeated 3 times.", "diff = [3, 3, 3]. 높이가 모두 같아요. 넓은 선 하나를 3번 반복."),
      question: t(E,
        "diff = [3, 3, 3]. Min commands?",
        "diff = [3, 3, 3]. 최소 명령 수?"),
      hint: t(E,
        "All stalls share the same height. Can one wide stroke help, and how often must it repeat?",
        "모든 칸의 높이가 같아요. 넓은 선 하나가 도움이 될까, 그리고 몇 번 반복해야 할까?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAirCond1Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Compute d[i] = q[i] − p[i] (the change needed). The minimum number of range +1/−1 commands equals the sum of POSITIVE jumps in d (extended with 0 at both ends). Sections build it one piece at a time.",
        "d[i] = q[i] − p[i] (필요한 변화) 를 계산. 최소 범위 +1/−1 명령 수는 d (양 끝에 0 추가) 에서 양의 점프의 합과 같아요. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAirCond1Sections(E),
    },
  ];
}
