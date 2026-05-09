import { useState } from "react";
import { C, t } from "@/components/quest/theme";

/* ────────────────────────────────────────────────────────────────
   BlockLetterSim — interactive cube-to-position assignment.
   Student picks a target word, assigns one cube to each letter,
   and watches ✓/✗ live.  Reusing a cube is blocked, mirroring the
   "one block per position" rule from SOLUTION_CODE.  Bilingual.
   ──────────────────────────────────────────────────────────────── */
const A = "#8b5cf6";

const SIM_BLOCKS = [
  ["C", "O", "W", "M", "O", "O"],
  ["A", "B", "C", "D", "E", "F"],
  ["P", "Q", "R", "S", "T", "U"],
  ["L", "I", "N", "E", "U", "P"],
];
const SIM_BLOCK_NAMES  = ["B0", "B1", "B2", "B3"];
const SIM_BLOCK_COLORS = ["#8b5cf6", "#0891b2", "#ea580c", "#db2777"];
const SIM_BLOCK_BGS    = ["#f5f3ff", "#ecfeff", "#fff7ed", "#fdf2f8"];

const SIM_PRESETS = [
  { word: "COW",  hint_en: "C from B0, O from B0… wait, can't reuse!", hint_ko: "C는 B0, O도 B0... 잠깐, 같은 큐브 두 번 못 써요!" },
  { word: "CUP",  hint_en: "Try B0→C, B2→U, B3→P.",                    hint_ko: "B0→C, B2→U, B3→P 시도." },
  { word: "MICE", hint_en: "M is only on B0.",                         hint_ko: "M은 B0에만 있어요." },
  { word: "ABLE", hint_en: "A on B1, B on B1… reuse blocked.",         hint_ko: "A는 B1, B도 B1... 재사용 안 돼요." },
];

export default function BlockLetterSim({ E }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const word = SIM_PRESETS[presetIdx].word;
  const [assign, setAssign] = useState([null, null, null, null]);

  const setSlot = (pos, blk) => {
    const next = [...assign];
    next[pos] = blk;
    setAssign(next);
  };
  const reset = () => setAssign([null, null, null, null]);

  const used = new Set(assign.filter(x => x != null));
  const letterOk = (pos) => {
    const b = assign[pos];
    if (b == null) return null;
    return SIM_BLOCKS[b].includes(word[pos]);
  };
  const filledArr = assign.slice(0, word.length);
  const allFilled = filledArr.every(x => x != null);
  const noDup = (() => {
    const u = filledArr.filter(x => x != null);
    return new Set(u).size === u.length;
  })();
  const allOk = allFilled && noDup && [...word].every((_, i) => letterOk(i) === true);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: A, marginBottom: 2 }}>
          🧪 {t(E, "Block Letter Simulator", "블록 글자 시뮬레이터")}
        </div>
        <div style={{ fontSize: 12, color: C.dim }}>
          {t(E, "Assign one cube to each letter — each cube used at most once.",
                "각 글자에 큐브를 하나씩 배정 — 각 큐브는 최대 한 번만.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: C.dim, alignSelf: "center", marginRight: 4 }}>
          {t(E, "Word:", "단어:")}
        </span>
        {SIM_PRESETS.map((p, i) => (
          <button
            key={p.word}
            onClick={() => { setPresetIdx(i); reset(); }}
            style={{
              background: i === presetIdx ? A : "#fff",
              color: i === presetIdx ? "#fff" : A,
              border: `1.5px solid ${A}`, borderRadius: 6,
              padding: "3px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: "ui-monospace, monospace",
            }}
          >{p.word}</button>
        ))}
      </div>

      <div style={{ background: "#fafafa", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center" }}>
          {t(E, "📦 The 4 cubes (6 faces each)", "📦 4개 큐브 (각 6개 면)")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
          {SIM_BLOCKS.map((faces, b) => {
            const isUsed = used.has(b);
            return (
              <div key={b} style={{
                background: SIM_BLOCK_BGS[b],
                border: `1.5px solid ${SIM_BLOCK_COLORS[b]}`,
                borderRadius: 8, padding: "6px 8px",
                opacity: isUsed ? 0.45 : 1,
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: SIM_BLOCK_COLORS[b], marginBottom: 4, textAlign: "center" }}>
                  {SIM_BLOCK_NAMES[b]}
                </div>
                <div style={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
                  {faces.map((f, j) => (
                    <span key={j} style={{
                      display: "inline-block", minWidth: 18, padding: "2px 4px",
                      background: "#fff", border: `1px solid ${SIM_BLOCK_COLORS[b]}`,
                      borderRadius: 4, fontSize: 11, fontWeight: 700,
                      color: SIM_BLOCK_COLORS[b], fontFamily: "ui-monospace, monospace",
                      textAlign: "center",
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 6, textAlign: "center" }}>
          {t(E, "🎯 Pick a cube for each position", "🎯 각 위치에 큐브 선택")}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {[...word].map((ch, pos) => {
            const ok = letterOk(pos);
            const slotBg = ok === true ? C.okBg : ok === false ? C.noBg : "#fff";
            const slotBd = ok === true ? C.okBd : ok === false ? C.noBd : C.border;
            return (
              <div key={pos} style={{
                background: slotBg, border: `2px solid ${slotBd}`, borderRadius: 10,
                padding: 8, minWidth: 96, textAlign: "center",
              }}>
                <div style={{ fontSize: 10, color: C.dim, marginBottom: 2 }}>
                  {t(E, `pos ${pos}`, `자리 ${pos}`)}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4,
                  fontFamily: "ui-monospace, monospace",
                }}>{ch}</div>
                <div style={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  {SIM_BLOCK_NAMES.map((bn, b) => {
                    const sel = assign[pos] === b;
                    const taken = used.has(b) && !sel;
                    return (
                      <button
                        key={b}
                        disabled={taken}
                        onClick={() => setSlot(pos, sel ? null : b)}
                        style={{
                          background: sel ? SIM_BLOCK_COLORS[b] : "#fff",
                          color: sel ? "#fff" : (taken ? C.dimLight : SIM_BLOCK_COLORS[b]),
                          border: `1.2px solid ${taken ? C.dimLight : SIM_BLOCK_COLORS[b]}`,
                          borderRadius: 4, padding: "2px 5px",
                          fontSize: 10, fontWeight: 800,
                          cursor: taken ? "not-allowed" : "pointer",
                          opacity: taken ? 0.5 : 1,
                        }}
                      >{bn}</button>
                    );
                  })}
                </div>
                <div style={{ fontSize: 14, marginTop: 4, fontWeight: 800,
                  color: ok === true ? C.ok : ok === false ? C.no : C.dimLight }}>
                  {ok === true ? "✓" : ok === false ? "✗" : "·"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        background: allOk ? C.okBg : (allFilled ? C.noBg : C.accentBg),
        border: `1.5px solid ${allOk ? C.okBd : (allFilled ? C.noBd : C.accentBd)}`,
        borderRadius: 10, padding: "8px 12px", textAlign: "center",
        fontSize: 13, fontWeight: 700,
        color: allOk ? C.ok : (allFilled ? C.no : C.accent),
      }}>
        {!allFilled && t(E,
          `Fill all ${word.length} positions to check.`,
          `${word.length}개 자리를 모두 채우면 결과가 나와요.`)}
        {allFilled && !noDup && t(E,
          "✗ NO — same cube reused (one cube per position!).",
          "✗ NO — 같은 큐브 재사용 (한 위치에 한 큐브!).")}
        {allFilled && noDup && allOk && t(E,
          `✓ YES — "${word}" can be spelled!`,
          `✓ YES — "${word}" 만들 수 있어요!`)}
        {allFilled && noDup && !allOk && t(E,
          "✗ NO — some letter is missing on its assigned cube.",
          "✗ NO — 어떤 글자가 배정된 큐브에 없어요.")}
      </div>

      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: C.dim, flex: 1, minWidth: 0 }}>
          💡 {t(E, SIM_PRESETS[presetIdx].hint_en, SIM_PRESETS[presetIdx].hint_ko)}
        </div>
        <button onClick={reset} style={{
          background: "#fff", color: A, border: `1.2px solid ${A}`,
          borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>↺ {t(E, "Reset", "초기화")}</button>
      </div>
    </div>
  );
}
