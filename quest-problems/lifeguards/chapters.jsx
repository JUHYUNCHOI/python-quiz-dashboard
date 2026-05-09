import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { getLifeguardsSections } from "./components";

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
        🧪 {t(E, "Try it: remove a lifeguard", "직접 해봐: 인명구조원 한 명 빼기")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E,
          "Click a button below to fire that lifeguard. Watch the timeline and find which removal keeps the MOST coverage.",
          "아래 버튼을 눌러 그 인명구조원을 해고해 봐. 타임라인을 보고 어느 명을 해고할 때 커버 시간이 가장 많이 남는지 찾아봐.")}
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
            `최고의 선택! #${bestSkip.idx + 1}을 해고하면 ${bestSkip.covered}초가 남아 — 5명 중 최댓값이야.`)}
        </div>
      )}
      {skip >= 0 && skip !== bestSkip.idx && (
        <div style={{ marginTop: 8, padding: "6px 10px", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 6, fontSize: 12, color: "#78350f" }}>
          💡 {t(E,
            "Try other lifeguards — one of them gives bigger remaining coverage.",
            "다른 인명구조원도 눌러봐 — 더 큰 남은 커버를 주는 사람이 있어.")}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "shifts = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    shifts.append((a, b))",
  "",
  "# Compute total coverage using sweep line",
  "events = []",
  "for a, b in shifts:",
  "    events.append((a, 1))",
  "    events.append((b, -1))",
  "events.sort()",
  "",
  "total = 0",
  "active = 0",
  "prev = 0",
  "for time, delta in events:",
  "    if active > 0:",
  "        total += time - prev",
  "    active += delta",
  "    prev = time",
  "",
  "# For each guard, compute their unique coverage",
  "best = 0",
  "for skip in range(N):",
  "    ev = []",
  "    for i, (a, b) in enumerate(shifts):",
  "        if i == skip: continue",
  "        ev.append((a, 1))",
  "        ev.append((b, -1))",
  "    ev.sort()",
  "    cov = 0",
  "    act = 0",
  "    prv = 0",
  "    for time, delta in ev:",
  "        if act > 0:",
  "            cov += time - prv",
  "        act += delta",
  "        prv = time",
  "    best = max(best, cov)",
  "",
  "print(best)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeLifeguardsCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N lifeguards, each working a half-open shift [s, t). The pool is 'covered' at any moment when at least one lifeguard is on duty.\nFJ must FIRE exactly one lifeguard. Print the MAXIMUM total coverage time (union of remaining intervals) he can keep.",
        "FJ에게 N명의 인명구조원이 있고, 각자 반열린 구간 [s, t) 동안 근무해요. 어느 한 순간에 최소 1명이 근무 중이면 그 순간은 '커버됐다'고 해요.\nFJ가 정확히 1명을 해고해야 해요. 남은 인명구조원들의 근무 구간 합집합으로 얻을 수 있는 최대 커버 시간을 출력해요."),
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
                "정확히 1명을 해고한 뒤 얻을 수 있는 최대 커버 시간을 출력.")}
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
    // 1-2: interactive sim
    {
      type: "reveal",
      narr: t(E,
        "Time to play! Below are 5 lifeguards with overlapping shifts on a 0..30 timeline. Try firing each one and watch which seconds become uncovered. Find the lifeguard whose removal LOSES the LEAST — that's the one to fire.",
        "직접 해볼 시간! 아래에 0..30 타임라인 위에서 겹쳐 일하는 5명의 인명구조원이 있어. 한 명씩 해고해 보면서 어느 초가 비게 되는지 관찰해 봐. '잃는 시간이 가장 적은' 해고가 정답이야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #93c5fd", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 6 }}>
              🎯 {t(E, "Goal", "목표")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "Each lifeguard's shift is a colored bar. The top bar shows the union of remaining coverage. Green = still covered. Red = newly uncovered after firing. Find the firing that keeps the MOST green.",
                "각 인명구조원의 근무는 색깔 막대야. 맨 위 막대는 남은 근무들의 합집합 커버. 초록 = 여전히 커버됨. 빨강 = 해고 후 비어버린 초. 초록이 가장 많이 남는 해고를 찾아봐.")}
            </div>
          </div>
          <LifeguardsRemovalSim E={E} />
        </div>),
    },
    // 1-3: quiz
    {
      type: "quiz",
      narr: t(E,
        "Two shifts: [1,5] and [3,8].\nIf we fire the first guard, coverage = 3 to 8 = 5.\nIf we fire the second, coverage = 1 to 5 = 4.\nWhich gives max coverage?", "두 근무: [1,5]와 [3,8]. 첫째를 해고하면 커버리지 = 3~8 = 5. 둘째를 해고하면 커버리지 = 1~5 = 4. 어느 쪽이 최대 커버리지?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Fire which guard for max coverage?",
        "근무 [1,5]와 [3,8]. 최대 커버리지를 위해 누구를 해고?"),
      options: [
        t(E, "Fire first guard (coverage = 5)", "첫째 해고 (커버리지 = 5)"),
        t(E, "Fire second guard (coverage = 4)", "둘째 해고 (커버리지 = 4)"),
      ],
      correct: 0,
      explain: t(E,
        "Fire the first guard: remaining coverage [3,8] = 5, which is larger than [1,5] = 4.",
        "첫째를 해고: 남은 커버리지 [3,8] = 5, 이게 [1,5] = 4보다 커."),
    },
    // 1-4: input
    {
      type: "input",
      narr: t(E,
        "Shifts [1,5] and [3,8]. What is the maximum remaining coverage after firing one guard?", "근무 [1,5]와 [3,8]. 한 명 해고 후 최대 남은 커버리지는?"),
      question: t(E,
        "Shifts [1,5] and [3,8]. Max coverage after firing one?",
        "근무 [1,5]와 [3,8]. 한 명 해고 후 최대 커버리지?"),
      hint: t(E,
        "Try firing each guard one at a time and compare remaining coverage.",
        "한 명씩 해고해 보면서 남은 커버리지를 비교해 봐."),
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
      type: "progressive",
      narr: t(E,
        "Brute force: fire each guard one at a time. For each removal, compute union coverage of remaining shifts via sweep line. Take the max across all N choices. Sections build it one piece at a time.",
        "완전 탐색: 인명구조원을 한 명씩 해고. 매 시도마다 남은 근무의 합집합 커버를 스위프 라인으로 계산. N 가지 중 최댓값. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getLifeguardsSections(E),
    },
  ];
}
