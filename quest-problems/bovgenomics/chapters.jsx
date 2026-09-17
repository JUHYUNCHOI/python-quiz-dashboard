import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { getBovGenomicsSections } from "./components";

/* ────────────────────────────────────────────────────────────────
   Interactive sim: position-by-position distinguishing table
   ──────────────────────────────────────────────────────────────── */
function PositionTableSim({ E }) {
  // Sample data: 3 spotted, 3 plain, M = 8.
  // Designed so a few positions ARE distinguishing and others are NOT.
  const SPOTTED = ["AATCCCAT", "GATTGCAA", "GGTCGCAA"];
  const PLAIN   = ["CCTTGGAT", "ACTACCAT", "TCTTTCAT"];
  const M = SPOTTED[0].length;

  const perPos = useMemo(() => {
    const arr = [];
    for (let j = 0; j < M; j++) {
      const sSet = new Set(SPOTTED.map(r => r[j]));
      const pSet = new Set(PLAIN.map(r => r[j]));
      let overlap = false;
      for (const ch of sSet) if (pSet.has(ch)) { overlap = true; break; }
      arr.push({ j, sSet: [...sSet].sort(), pSet: [...pSet].sort(), valid: !overlap });
    }
    return arr;
  }, []);

  const validCount = perPos.filter(p => p.valid).length;
  const [sel, setSel] = useState(null);
  const selInfo = sel == null ? null : perPos[sel];

  const cellBase = {
    width: 30, height: 30, display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "JetBrains Mono, monospace", fontWeight: 700,
    fontSize: 14, border: "1px solid #cbd5e1", borderRadius: 4,
  };

  const colorFor = (j, kind) => {
    if (sel !== j) {
      return { background: "#fff", color: "#1f2937" };
    }
    const valid = perPos[j].valid;
    if (valid) return { background: kind === "s" ? "#dbeafe" : "#dcfce7", color: "#111827", border: "1.5px solid #15803d" };
    return { background: "#fee2e2", color: "#111827", border: "1.5px solid #b91c1c" };
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10,
        padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
          🧪 {t(E, "Interactive Sim", "직접 해보기")}
        </div>
        <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
          {t(E,
            "Click any column to compare spotted vs plain letters at that position. A position is valid only when the two sets share NO letter.",
            "칸을 아무거나 눌러 봐요. 그 자리의 점박이 글자와 무늬 없는 글자를 나란히 보여줘요.\n두 쪽이 한 글자도 안 겹쳐야 쓸 수 있는 자리예요.")}
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "center", gap: 10, alignItems: "center",
        marginBottom: 10, fontSize: 13, color: C.text,
      }}>
        <span style={{ fontWeight: 700, color: "#15803d" }}>
          ✅ {t(E, "Valid positions", "구별할 수 있는 칸")}: {validCount} / {M}
        </span>
        <span style={{ color: C.dim }}>·</span>
        <span style={{ color: C.dim }}>
          {t(E, "(click a column to inspect)", "(칸을 눌러 살펴봐요)")}
        </span>
      </div>

      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 4, margin: "0 auto" }}>
          <tbody>
            <tr>
              <td style={{ fontSize: 11, color: C.dim, paddingRight: 6, textAlign: "right" }}>
                {t(E, "pos j", "위치 j")}
              </td>
              {perPos.map((p) => (
                <td key={`h-${p.j}`} style={{
                  textAlign: "center", fontSize: 11, color: sel === p.j ? "#2563eb" : C.dim,
                  fontWeight: sel === p.j ? 800 : 500,
                }}>
                  {p.j}
                </td>
              ))}
              <td />
            </tr>

            {SPOTTED.map((row, ri) => (
              <tr key={`s-${ri}`}>
                <td style={{ fontSize: 11, color: "#2563eb", paddingRight: 6, textAlign: "right", fontWeight: 700 }}>
                  {ri === 0 ? t(E, "🐄 spotted", "🐄 점박이") : ""}
                </td>
                {row.split("").map((ch, j) => (
                  <td key={`s-${ri}-${j}`}>
                    <button
                      onClick={() => setSel(j)}
                      style={{ ...cellBase, ...colorFor(j, "s"), cursor: "pointer", padding: 0 }}
                      aria-label={`spotted row ${ri} col ${j}`}
                    >
                      {ch}
                    </button>
                  </td>
                ))}
                <td />
              </tr>
            ))}

            <tr>
              <td />
              {perPos.map((p) => (
                <td key={`sep-${p.j}`} style={{ height: 6 }} />
              ))}
              <td />
            </tr>

            {PLAIN.map((row, ri) => (
              <tr key={`p-${ri}`}>
                <td style={{ fontSize: 11, color: "#7c3aed", paddingRight: 6, textAlign: "right", fontWeight: 700 }}>
                  {ri === 0 ? t(E, "🐮 plain", "🐮 무늬 없음") : ""}
                </td>
                {row.split("").map((ch, j) => (
                  <td key={`p-${ri}-${j}`}>
                    <button
                      onClick={() => setSel(j)}
                      style={{ ...cellBase, ...colorFor(j, "p"), cursor: "pointer", padding: 0 }}
                      aria-label={`plain row ${ri} col ${j}`}
                    >
                      {ch}
                    </button>
                  </td>
                ))}
                <td />
              </tr>
            ))}

            <tr>
              <td />
              {perPos.map((p) => (
                <td key={`b-${p.j}`} style={{ textAlign: "center" }}>
                  <span style={{
                    display: "inline-block", fontSize: 14,
                    color: p.valid ? "#15803d" : "#b91c1c",
                    fontWeight: 700,
                  }}>
                    {p.valid ? "✓" : "✗"}
                  </span>
                </td>
              ))}
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 12,
        background: selInfo == null ? "#f8fafc" : (selInfo.valid ? "#f0fdf4" : "#fef2f2"),
        border: `1px solid ${selInfo == null ? "#e2e8f0" : (selInfo.valid ? "#86efac" : "#fca5a5")}`,
        borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
      }}>
        {selInfo == null ? (
          <span style={{ color: C.dim }}>
            {t(E, "Pick a column above to see the comparison.", "위 칸을 하나 골라서 비교를 봐요.")}
          </span>
        ) : (
          <div style={{ color: "#1f2937" }}>
            <div style={{ marginBottom: 4 }}>
              <b style={{ color: "#1e3a8a" }}>{t(E, "Position", "위치")} j = {selInfo.j}</b>
            </div>
            <div>
              <span style={{ color: "#2563eb", fontWeight: 700 }}>{t(E, "spotted set", "점박이 집합")}</span>
              {" = { "}
              <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{selInfo.sSet.join(", ")}</span>
              {" }"}
            </div>
            <div>
              <span style={{ color: "#7c3aed", fontWeight: 700 }}>{t(E, "plain set", "무늬 없음 집합")}</span>
              {" = { "}
              <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{selInfo.pSet.join(", ")}</span>
              {" }"}
            </div>
            <div style={{ marginTop: 6, fontWeight: 700, color: selInfo.valid ? "#15803d" : "#b91c1c" }}>
              {selInfo.valid
                ? t(E, "✓ No overlap → distinguishing position!", "✓ 겹치는 글자가 없어요 → 구별할 수 있는 자리예요!")
                : t(E, "✗ Sets share at least one letter → NOT distinguishing.", "✗ 같은 글자가 양쪽에 있어요 → 구별할 수 없어요.")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N spotted cows and N plain cows; each cow has an M-letter genome over {A, C, G, T}.\nA position j is 'distinguishing' if the set of letters appearing at column j among spotted cows DOES NOT INTERSECT the set among plain cows.\nCount how many positions are distinguishing.",
        "점박이 소 N마리와 무늬 없는 소 N마리가 A·C·G·T 로 된 M글자 유전체를 가져요.\n어떤 칸에서 두 무리의 글자가 한 글자도 안 겹치면, 그 칸만 봐도 무리를 구별할 수 있어요.\n그런 칸이 몇 개인지 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\uddec"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Bovine Genomics</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2017 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of distinguishing positions — columns where spotted-cow letters and plain-cow letters never overlap.",
                "점박이 소 글자와 무늬 없는 소 글자가 한 글자도 겹치지 않는\n칸이 몇 개인지 출력해요.")}
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
                  <b style={{ color: "#2563eb" }}>{t(E, "N spotted cows and N plain cows", "점박이 소 N마리와 무늬 없는 소 N마리")}</b>
                  {t(E, ", each with an M-letter genome over A/C/G/T.",
                        " 가 있고, 각 소는 A/C/G/T 로 된 M글자 유전체를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Position j is ", "칸 j 는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "distinguishing", "'구별할 수 있는 칸'")}</b>
                  {t(E, " if the set of letters at column j across spotted cows does NOT intersect the set across plain cows.",
                        " 이에요. 그 칸의 점박이 소 글자와 무늬 없는 소 글자가 한 글자도 안 겹칠 때 그래요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinguishing positions", "구별할 수 있는 칸의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Interactive sim — position-by-position distinguishing table
    {
      type: "reveal",
      narr: t(E,
        "Let's see distinguishing positions in action. Click any column — we compare the spotted set vs the plain set at that position. A position counts only when the two sets share NO letter.",
        "칸을 누르면 그 자리의 점박이 글자와 무늬 없는 글자를 나란히 보여줘요.\n한 글자도 안 겹치는 칸만 세면 돼요."),
      content: <PositionTableSim E={E} />,
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "At a certain position, spotted cows have {A, A} and plain cows have {C, C}.\nIs this position a valid distinguishing position?", "어떤 자리에서 점박이 소는 {A, A}, 무늬 없는 소는 {C, C} 예요.\n이 자리로 두 무리를 구별할 수 있을까요?"),
      question: t(E,
        "Spotted = {A, A}, Plain = {C, C}. No overlap, so valid?",
        "점박이는 {A, A}, 무늬 없음은 {C, C} 예요. 구별할 수 있을까요?"),
      options: [
        t(E, "Yes, sets {A} and {C} don't overlap", "네, {A} 와 {C} 는 안 겹쳐요"),
        t(E, "No, we need more characters", "아니요, 글자가 더 있어야 해요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The spotted set is {A} and the plain set is {C}. They have no intersection, so this position can distinguish the two groups.",
        "맞아요! 점박이 쪽은 {A} 뿐이고 무늬 없는 쪽은 {C} 뿐이에요.\n겹치는 글자가 없으니 이 자리만 봐도 두 무리를 가려낼 수 있어요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "If there's exactly 1 valid distinguishing position, what is the answer?", "구별할 수 있는 자리가 딱 1개라면 답은 무엇일까요?"),
      question: t(E,
        "How many valid positions if only 1 position has no overlap?",
        "겹치는 글자가 없는 자리가 1개뿐이면 답은 몇일까요?"),
      hint: t(E,
        "Just count distinguishing positions directly.",
        "구별할 수 있는 자리를 직접 세어 보면 돼요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGenomicsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "For each column j (1..M): gather the SET of letters from spotted cows and the SET from plain cows. If the two sets don't intersect, that column distinguishes the breeds. Sections build it one piece at a time.",
        "칸 j 마다 점박이 소들의 글자와 무늬 없는 소들의 글자를 따로 모아요.\n두 쪽이 안 겹치면 그 칸은 구별할 수 있는 자리예요."),
      sections: getBovGenomicsSections(E),
    },
  ];
}
