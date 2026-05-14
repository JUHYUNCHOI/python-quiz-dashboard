import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMilkOrderSections } from "./components";

/* ================================================================
   Interactive Milk Order simulator — slide cow #1's position,
   see hierarchy + fixed-position constraints check live.
   ================================================================ */
function MilkOrderSim({ E }) {
  // Demo setup: N=7 cows. One hierarchy chain [4, 1, 3] meaning
  //   cow 4 must appear before cow 1, and cow 1 before cow 3.
  // Two cows are fixed: cow 4 -> position 2, cow 3 -> position 6.
  const N = 7;
  const HIER = [4, 1, 3]; // relative order in line
  const FIXED = { 4: 2, 3: 6 }; // cow -> position
  const [pos1, setPos1] = useState(3); // cow #1's chosen position

  // Build a candidate lineup:
  //   - place fixed cows at their fixed slots
  //   - place cow #1 at pos1
  //   - fill remaining slots with the rest of cows in ascending id order
  const lineup = Array(N + 1).fill(null); // 1-indexed
  for (const [c, p] of Object.entries(FIXED)) lineup[p] = Number(c);
  // pos1 collision with a fixed cow?
  const collides = lineup[pos1] != null && lineup[pos1] !== 1;
  if (!collides) lineup[pos1] = 1;
  const used = new Set(lineup.filter(Boolean));
  let nextSlot = 1;
  for (let cow = 2; cow <= N; cow++) {
    if (used.has(cow)) continue;
    while (nextSlot <= N && lineup[nextSlot] != null) nextSlot++;
    if (nextSlot > N) break;
    lineup[nextSlot] = cow;
    nextSlot++;
  }

  // Verify hierarchy chain order in the lineup.
  const positions = HIER.map(cow => lineup.indexOf(cow));
  let hierOk = true;
  for (let i = 0; i + 1 < positions.length; i++) {
    if (positions[i] === -1 || positions[i + 1] === -1) { hierOk = false; break; }
    if (positions[i] >= positions[i + 1]) { hierOk = false; break; }
  }
  const fixedOk = !collides;
  const allOk = hierOk && fixedOk;

  const cellSize = 54;
  const cowColor = (id) => {
    if (id === 1) return { bg: "#fef3c7", bd: "#f59e0b", fg: "#92400e" };
    if (HIER.includes(id)) return { bg: "#ede9fe", bd: "#7c3aed", fg: "#5b21b6" };
    if (FIXED[id]) return { bg: "#fee2e2", bd: "#dc2626", fg: "#991b1b" };
    return { bg: "#f1f5f9", bd: "#94a3b8", fg: "#475569" };
  };

  return (
    <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a8a", marginBottom: 10, textAlign: "center" }}>
        🐄 {t(E, "Slide cow #1's position — constraints check live", "1번 소의 위치를 옮겨봐 — 제약이 실시간으로 검사돼요")}
      </div>

      {/* Constraint legend */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, fontSize: 11, marginBottom: 10 }}>
        <span style={{ background: "#ede9fe", border: "1px solid #c4b5fd", color: "#5b21b6", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
          {t(E, "Hierarchy", "순서 규칙")}: 4 → 1 → 3
        </span>
        <span style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
          {t(E, "Fixed", "고정")}: 4@2, 3@6
        </span>
      </div>

      {/* Lineup */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        {Array.from({ length: N }).map((_, i) => {
          const p = i + 1;
          const cow = lineup[p];
          const isCow1Slot = p === pos1;
          const isFixedSlot = FIXED[cow] === p;
          const c = cow == null
            ? { bg: "#f8fafc", bd: "#e2e8f0", fg: "#94a3b8" }
            : cowColor(cow);
          return (
            <div key={p} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: cellSize, height: cellSize,
                background: c.bg, border: `2px solid ${c.bd}`,
                borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, color: c.fg,
                boxShadow: isCow1Slot ? "0 0 0 3px #fde68a" : "none",
                position: "relative",
              }}>
                {cow == null ? "·" : cow}
                {isFixedSlot && (
                  <span style={{ position: "absolute", top: -6, right: -6, fontSize: 10, background: "#dc2626", color: "#fff", borderRadius: 8, padding: "1px 5px", fontWeight: 800 }}>📌</span>
                )}
              </div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>p={p}</div>
            </div>
          );
        })}
      </div>

      {/* Slider for cow #1 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginTop: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", whiteSpace: "nowrap" }}>
          {t(E, "Cow #1 at", "1번 소 위치")}:
        </span>
        <input
          type="range" min={1} max={N} value={pos1}
          onChange={(e) => setPos1(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#f59e0b" }}
        />
        <span style={{ fontSize: 13, fontWeight: 800, color: "#92400e", fontFamily: "'JetBrains Mono',monospace", minWidth: 24, textAlign: "right" }}>
          {pos1}
        </span>
      </div>

      {/* Live verdict */}
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
        <div style={{ background: hierOk ? "#dcfce7" : "#fee2e2", border: `1px solid ${hierOk ? "#86efac" : "#fca5a5"}`, borderRadius: 6, padding: "6px 8px", color: hierOk ? "#166534" : "#991b1b", textAlign: "center" }}>
          {hierOk ? "✅" : "❌"} {t(E, "hierarchy", "순서")}
        </div>
        <div style={{ background: fixedOk ? "#dcfce7" : "#fee2e2", border: `1px solid ${fixedOk ? "#86efac" : "#fca5a5"}`, borderRadius: 6, padding: "6px 8px", color: fixedOk ? "#166534" : "#991b1b", textAlign: "center" }}>
          {fixedOk ? "✅" : "❌"} {t(E, "fixed", "고정")}
        </div>
        <div style={{ background: allOk ? "#fef3c7" : "#f1f5f9", border: `1px solid ${allOk ? "#f59e0b" : "#cbd5e1"}`, borderRadius: 6, padding: "6px 8px", color: allOk ? "#92400e" : "#475569", textAlign: "center", fontWeight: 800 }}>
          {allOk ? t(E, "VALID", "유효") : t(E, "invalid", "무효")}
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#1e3a8a", textAlign: "center", lineHeight: 1.6 }}>
        {t(E,
          "Try p=3, p=4, p=5. The earliest p where both checks pass is the answer.",
          "p=3, p=4, p=5 시도해봐. 둘 다 통과하는 가장 작은 p 가 답이에요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ wants a valid milking order of his N cows. Two kinds of rules exist: (1) hierarchy — a list saying these M cows must appear in this relative order, and (2) some cows have FIXED positions in the line.\nAmong all valid orders, print the EARLIEST possible position of cow #1.",
        "FJ 가 N마리 소의 유효한 착유 순서를 정하려고 해요. 두 종류의 규칙이 있어요: (1) 순서 규칙 — 어떤 M마리 소는 이 상대 순서를 지켜야 해요, (2) 어떤 소들은 줄에서 정해진 위치를 가져요.\n모든 유효한 순서 중에서 1번 소가 가장 일찍 설 수 있는 위치를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Milking Order</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Find the earliest position cow #1 can take in a valid milking order.", "유효한 착유 순서에서 1번 소가 설 수 있는 가장 이른 위치를 찾아요.")}
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
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows to put in a milking order", "착유 순서를 정해야 할 N마리 소")}</b>
                  {t(E, " (1..N).", " (1..N) 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Hierarchy constraint", "순서 규칙")}</b>
                  {t(E, ": a list of M cows that must appear in this exact relative order in the line.",
                        ": M마리 소의 목록이 주어지고, 이들은 줄에서 이 상대 순서로 등장해야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Fixed positions", "고정 위치")}</b>
                  {t(E, ": some cows have a specified spot in the line.",
                        ": 어떤 소들은 줄에서 정해진 위치를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Among all valid orders, print the ", "모든 유효한 순서 중에서 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "earliest possible position of cow 1", "1번 소의 가능한 가장 이른 위치")}</b>
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
        "If cow 1 has no constraints at all, what's the earliest position it can be in?", "소 1번에 아무 제약이 없으면, 가능한 가장 빠른 위치는?"),
      question: t(E,
        "Cow 1 has no constraints. Earliest position?",
        "소 1번에 제약 없음. 가장 빠른 위치는?"),
      options: [
        t(E, "Position 1", "1번 위치"),
        t(E, "Position N", "N번 위치"),
        t(E, "Cannot determine", "알 수 없음"),
      ],
      correct: 0,
      explain: t(E,
        "With no constraints, cow 1 can go first! Position 1.",
        "제약이 없으면, 소 1번이 첫 번째로 갈 수 있어요! 1번 위치."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If cow 1 has no constraints, what position can it be placed at earliest?", "소 1번에 제약이 없으면, 가장 일찍 배치할 수 있는 위치는?"),
      question: t(E,
        "No constraints on cow 1. Earliest position number?",
        "소 1번에 제약 없음. 가장 빠른 위치 번호는?"),
      hint: t(E,
        "If nothing blocks cow 1, what's the smallest spot in a line of N?",
        "소 1번을 막는 게 아무것도 없다면, N마리 줄에서 가장 작은 자리 번호는?"),
      answer: 1,
    },
    // 1-4: Interactive sim — slide cow #1's position, watch constraints
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself! N=7 cows. Hierarchy says 4 → 1 → 3 (in that relative order). Cow 4 is fixed at position 2, cow 3 at position 6. Slide cow #1's position — both constraint badges go green only when the lineup is valid. Find the earliest p that works.",
        "직접 해봐! 소 7마리. 순서 규칙은 4 → 1 → 3 (이 상대 순서). 4번은 2번 자리, 3번은 6번 자리에 고정. 1번 소의 위치를 옮기면서 두 배지가 모두 초록이 되는 가장 작은 p 를 찾아봐."),
      content: (
        <div style={{ padding: 16 }}>
          <MilkOrderSim E={E} />
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Build a DAG from the hierarchy chain (a → b means a must come before b). Try every possible position for cow 1 (1..N) — for each, build the lineup using topological sort with cow 1 inserted there. Print the smallest valid position. Sections build it one piece at a time.",
        "위계 체인으로 DAG 구축 (a → b 는 a 가 b 보다 먼저). 1번 소의 위치를 1..N 모두 시도해 — 각 위치에서 그 자리에 소 1번을 넣은 위상 정렬 라인업을 만들고, 가장 작은 유효 위치를 출력. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMilkOrderSections(E),
    },
  ];
}
