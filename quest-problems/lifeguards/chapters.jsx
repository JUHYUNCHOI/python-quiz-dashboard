import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";

/* ================================================================
   Interactive Sim: interval-removal coverage visualizer
   ================================================================ */
const SIM_SHIFTS = [
  { a: 0, b: 8,  color: "#2563eb" },  // Lifeguard 1
  { a: 5, b: 14, color: "#0891b2" },  // Lifeguard 2
  { a: 12, b: 20, color: "#7c3aed" }, // Lifeguard 3
  { a: 17, b: 25, color: "#db2777" }, // Lifeguard 4
  { a: 22, b: 30, color: "#ea580c" }, // Lifeguard 5
];
const SIM_T_MAX = 30;

function computeCovered(shifts, skipIdx) {
  // returns { covered: number, coveredSet: Set<number-as-second-start> }
  const set = new Set();
  shifts.forEach((s, i) => {
    if (i === skipIdx) return;
    for (let m = s.a; m < s.b; m++) set.add(m);
  });
  return { covered: set.size, coveredSet: set };
}

function LifeguardsRemovalSim({ E }) {
  const [skip, setSkip] = useState(-1); // -1 = no removal
  const baseline = useMemo(() => computeCovered(SIM_SHIFTS, -1), []);
  const current = useMemo(() => computeCovered(SIM_SHIFTS, skip), [skip]);

  const lostMinutes = baseline.covered - current.covered;
  const bestSkip = useMemo(() => {
    let best = 0, bestI = 0;
    SIM_SHIFTS.forEach((_, i) => {
      const c = computeCovered(SIM_SHIFTS, i).covered;
      if (c > best) { best = c; bestI = i; }
    });
    return { idx: bestI, covered: best };
  }, []);

  const cellW = `calc(100% / ${SIM_T_MAX})`;
  const trackBG = "#f1f5f9";
  const A = "#2563eb";

  return (
    <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 12, padding: 14, marginBottom: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
        🧪 {t(E, "Try it: remove a lifeguard", "직접 해봐요: 인명구조원 한 명 빼기")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E,
          "Click a button below to fire that lifeguard. Watch the timeline and find which removal keeps the MOST coverage.",
          "아래 버튼을 눌러 그 인명구조원을 해고해 봐요.\n어느 사람을 해고할 때 커버 시간이 가장 많이 남는지 찾아봐요.")}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        <button
          onClick={() => setSkip(-1)}
          style={{
            padding: "5px 10px", fontSize: 12, fontWeight: 700,
            border: skip === -1 ? `2px solid ${A}` : "1.5px solid #cbd5e1",
            background: skip === -1 ? A : "#fff",
            color: skip === -1 ? "#fff" : "#475569",
            borderRadius: 6, cursor: "pointer",
          }}
        >
          {t(E, "All on duty", "전원 근무")}
        </button>
        {SIM_SHIFTS.map((s, i) => (
          <button
            key={i}
            onClick={() => setSkip(i)}
            style={{
              padding: "5px 10px", fontSize: 12, fontWeight: 700,
              border: skip === i ? `2px solid ${s.color}` : `1.5px solid ${s.color}80`,
              background: skip === i ? s.color : "#fff",
              color: skip === i ? "#fff" : s.color,
              borderRadius: 6, cursor: "pointer",
            }}
          >
            {t(E, `Fire #${i + 1}`, `#${i + 1} 해고`)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, padding: 10 }}>
        {/* Coverage row (union) */}
        <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", marginBottom: 3 }}>
          {t(E, "Covered seconds (union)", "커버된 초 (합집합)")}
        </div>
        <div style={{ position: "relative", display: "flex", height: 14, background: trackBG, borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
          {Array.from({ length: SIM_T_MAX }).map((_, sec) => {
            const wasCovered = baseline.coveredSet.has(sec);
            const nowCovered = current.coveredSet.has(sec);
            let bg = trackBG;
            if (nowCovered) bg = "#15803d";
            else if (wasCovered) bg = "#fca5a5"; // newly uncovered
            return <div key={sec} style={{ width: cellW, background: bg, borderRight: "1px solid #fff" }} />;
          })}
        </div>

        {/* Per-guard rows */}
        {SIM_SHIFTS.map((s, i) => {
          const fired = i === skip;
          return (
            <div key={i} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 10, color: fired ? "#94a3b8" : s.color, fontWeight: 700, marginBottom: 2, textDecoration: fired ? "line-through" : "none" }}>
                #{i + 1} [{s.a}, {s.b})
              </div>
              <div style={{ position: "relative", display: "flex", height: 10, background: trackBG, borderRadius: 2, overflow: "hidden" }}>
                {Array.from({ length: SIM_T_MAX }).map((_, sec) => {
                  const inShift = sec >= s.a && sec < s.b;
                  let bg = trackBG;
                  if (inShift) bg = fired ? "#e2e8f0" : s.color;
                  return <div key={sec} style={{ width: cellW, background: bg, opacity: fired && inShift ? 0.45 : 1 }} />;
                })}
              </div>
            </div>
          );
        })}

        {/* Time axis labels */}
        <div style={{ display: "flex", marginTop: 6, fontSize: 9, color: "#64748b" }}>
          {[0, 5, 10, 15, 20, 25, 30].map(tm => (
            <div key={tm} style={{ width: `calc(100% / 6)`, textAlign: tm === 0 ? "left" : tm === 30 ? "right" : "center" }}>
              {tm === 0 || tm === 30 ? `t=${tm}` : tm}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 10, fontSize: 12 }}>
        <div style={{ background: "#fff", padding: "6px 8px", borderRadius: 6, border: "1px solid #93c5fd" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "Baseline", "원래 커버")}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e3a8a" }}>{baseline.covered}</div>
        </div>
        <div style={{ background: "#fff", padding: "6px 8px", borderRadius: 6, border: "1.5px solid #15803d" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "Now covered", "지금 커버")}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#15803d" }}>{current.covered}</div>
        </div>
        <div style={{ background: "#fff", padding: "6px 8px", borderRadius: 6, border: "1px solid #fca5a5" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>{t(E, "Lost", "잃은 시간")}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: lostMinutes === 0 ? "#475569" : "#dc2626" }}>−{lostMinutes}</div>
        </div>
      </div>

      {skip === bestSkip.idx && (
        <div style={{ marginTop: 8, padding: "6px 10px", background: "#dcfce7", border: "1px solid #15803d", borderRadius: 6, fontSize: 12, color: "#14532d", fontWeight: 700 }}>
          ✅ {t(E,
            `Best choice! Firing #${bestSkip.idx + 1} keeps ${bestSkip.covered} covered seconds — the maximum among all 5 options.`,
            `잘 골랐어요! #${bestSkip.idx + 1} 을 해고하면 ${bestSkip.covered} 초가 남아요 — 5 명 중 가장 많아요.`)}
        </div>
      )}
      {skip >= 0 && skip !== bestSkip.idx && (
        <div style={{ marginTop: 8, padding: "6px 10px", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 6, fontSize: 12, color: "#78350f" }}>
          💡 {t(E,
            "Try other lifeguards — one of them gives bigger remaining coverage.",
            "다른 인명구조원도 눌러 봐요 — 커버가 더 많이 남는 사람이 있어요.")}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeLifeguardsCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Fire one lifeguard to keep coverage as long as possible.",
        "한 명을 해고한 뒤 커버되는 시간을 가장 길게 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfca"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Lifeguards</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum total covered time after firing exactly one lifeguard.",
                "정확히 1명을 해고한 뒤 커버 시간을 가장 길게 만들어 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N lifeguards", "N명의 인명구조원")}</b>
                  {t(E, ", each working a shift ", "이 있고, 각자 근무 구간 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[s, t)</code>
                  {t(E, ".", " 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The pool is ", "수영장이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "COVERED at any moment", "어느 한 순간에 '커버'된다")}</b>
                  {t(E, " when at least one lifeguard is on duty.",
                        "는 건, 그 순간 최소 1명이 근무 중일 때예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must ", "FJ는 정확히 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "fire EXACTLY ONE lifeguard", "1명의 인명구조원을 해고")}</b>
                  {t(E, ".", " 해야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total covered time after firing one", "1명을 해고한 뒤 얻을 수 있는 최대 커버 시간")}</b>
                  {t(E, " (union of remaining shifts).", " (남은 근무들의 합집합).")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, usaco.org cpid=784) — 시즌 표준(photoshoot25) 형식
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? N, then N shift intervals — one per line.",
        "입력은 인명구조원 수 N, 그다음 근무 구간이 N번 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of lifeguards", "— 인명구조원 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>S E</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— one lifeguard's shift, [S, E)", "— 한 명의 근무 구간, [S, E)")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single number — the maximum total covered time after firing exactly one lifeguard.",
                  "숫자 1개 — 정확히 1명을 해고한 뒤 남는 최대 커버 시간을 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              {/* ⚠️ 2026-09-25 정정 — 처음엔 `1 ≤ S < E ≤ 1,000,000,000` 이었다. **원문에 없는 수다.**
                   usaco.org cpid=784 원문: 수영장은 *"open from time t=0 until time t=1000"*,
                   각 교대는 *"two integers in the range 0 … 1000"*, 그리고 *"All such endpoints are distinct."* */}
              <div>0 ≤ S &lt; E ≤ 1000</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "all endpoints are distinct", "시작·끝 시각은 모두 서로 달라요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: interactive sim
    {
      type: "reveal",
      narr: t(E,
        "Fire lifeguards one by one and see which seconds go uncovered.",
        "한 명씩 해고해 보면서 어느 초가 비는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #93c5fd", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>
              🎯 {t(E, "Goal", "목표")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "Each lifeguard's shift is a colored bar. The top bar shows the union of remaining coverage. Green = still covered. Red = newly uncovered after firing. Find the firing that keeps the MOST green.",
                "인명구조원마다 근무가 색깔 막대예요. 맨 위 막대는 남은 근무를 다 합친 커버예요.\n초록은 그대로 커버되는 초, 빨강은 해고해서 비어 버린 초예요.\n초록이 가장 많이 남는 해고를 찾아봐요.")}
            </div>
          </div>
          <LifeguardsRemovalSim E={E} />
        </div>),
    },
    // 1-3: quiz
    {
      type: "quiz",
      narr: t(E,
        "Shifts [1,5] and [3,8] — who should be fired?", "근무 [1,5] 와 [3,8] 중 누구를 해고할까요?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Fire which guard for max coverage?",
        "근무 [1,5] 와 [3,8] 이에요. 커버 시간을 가장 길게 하려면 누구를 해고할까요?"),
      options: [
        t(E, "Fire first guard (coverage = 5)", "첫째 해고 (커버 시간 5)"),
        t(E, "Fire second guard (coverage = 4)", "둘째 해고 (커버 시간 4)"),
      ],
      correct: 0,
      explain: t(E,
        "Fire the first guard: remaining coverage [3,8] = 5, which is larger than [1,5] = 4.",
        "첫째를 해고하면 [3,8] 이 남아 5 초예요.\n둘째를 해고하면 [1,5] 가 남아 4 초라서 더 짧아요."),
    },
    // 1-4: input
    {
      type: "input",
      narr: t(E,
        "Shifts [1,5] and [3,8]. What is the maximum remaining coverage after firing one guard?", "한 명을 해고한 뒤 남는 커버 시간은 얼마일까요?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Max coverage after firing one?",
        "근무 [1,5] 와 [3,8] 이에요. 한 명 해고 후 커버 시간이 가장 길면 몇일까요?"),
      hint: t(E,
        "Try firing each guard one at a time and compare remaining coverage.",
        "한 명씩 해고해 보면서 남는 커버 시간을 견줘 봐요."),
      answer: 5,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeLifeguardsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "lifeguards-codewalk",
      narr: t(E,
        "The fast solution, start to finish — toggle Python ↔ C++ via the header.",
        "빠른 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
