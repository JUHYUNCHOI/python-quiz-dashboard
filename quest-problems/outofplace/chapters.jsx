import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getOutOfPlaceSections } from "./components";

/* ================================================================
   VISUAL: array vs sorted side-by-side with mismatch block
   ================================================================ */
const VISUAL_EXAMPLES = [
  { label: "[1, 3, 2]", arr: [1, 3, 2] },
  { label: "[2, 1, 3, 4, 5]", arr: [2, 1, 3, 4, 5] },
  { label: "[1, 5, 2, 3, 4]", arr: [1, 5, 2, 3, 4] },
  { label: "[1, 2, 6, 3, 4, 5]", arr: [1, 2, 6, 3, 4, 5] },
  { label: "[1, 2, 3, 4, 5]", arr: [1, 2, 3, 4, 5] },
];

function MismatchVisual({ E }) {
  const [pick, setPick] = useState(0);
  const ex = VISUAL_EXAMPLES[pick];
  const arr = ex.arr;
  const sorted = [...arr].sort((a, b) => a - b);
  const diffs = arr.map((v, i) => v !== sorted[i]);
  const diffCount = diffs.filter(Boolean).length;
  // contiguous block: first index that mismatches → last index that mismatches
  let lo = -1, hi = -1;
  for (let i = 0; i < arr.length; i++) if (diffs[i]) { lo = i; break; }
  for (let i = arr.length - 1; i >= 0; i--) if (diffs[i]) { hi = i; break; }
  const blockLen = lo === -1 ? 0 : (hi - lo + 1);
  const answer = Math.max(0, diffCount - 1);

  const cellBase = {
    width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "JetBrains Mono, monospace", fontSize: 16, fontWeight: 700,
    border: "1.5px solid #cbd5e1", borderRadius: 8, background: "#fff", color: C.text,
    transition: "all 0.25s ease",
  };

  return (
    <div style={{ padding: 14 }}>
      {/* Picker */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 14 }}>
        {VISUAL_EXAMPLES.map((e, i) => (
          <button key={i} onClick={() => setPick(i)} style={{
            padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700,
            fontFamily: "JetBrains Mono, monospace",
            border: pick === i ? "1.5px solid #059669" : "1.5px solid #cbd5e1",
            background: pick === i ? "#ecfdf5" : "#fff",
            color: pick === i ? "#059669" : C.dim, cursor: "pointer",
          }}>{e.label}</button>
        ))}
      </div>

      {/* Side-by-side rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginBottom: 12 }}>
        {/* Original row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 70, textAlign: "right" }}>
            {t(E, "Original", "원래")}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {arr.map((v, i) => {
              const inBlock = lo !== -1 && i >= lo && i <= hi;
              return (
                <div key={i} style={{
                  ...cellBase,
                  background: diffs[i] ? "#fee2e2" : "#dcfce7",
                  borderColor: diffs[i] ? "#dc2626" : "#16a34a",
                  color: diffs[i] ? "#dc2626" : "#15803d",
                  boxShadow: inBlock && diffs[i] ? "0 0 0 3px #fecaca" : "none",
                }}>{v}</div>
              );
            })}
          </div>
        </div>

        {/* Marker row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 70 }} />
          <div style={{ display: "flex", gap: 6 }}>
            {arr.map((v, i) => (
              <div key={i} style={{ width: 44, textAlign: "center", fontSize: 18, fontWeight: 800, color: diffs[i] ? "#dc2626" : "#16a34a" }}>
                {diffs[i] ? "✗" : "✓"}
              </div>
            ))}
          </div>
        </div>

        {/* Sorted row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, width: 70, textAlign: "right" }}>
            {t(E, "Sorted", "정렬")}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {sorted.map((v, i) => (
              <div key={i} style={{
                ...cellBase,
                background: diffs[i] ? "#fff7ed" : "#f1f5f9",
                borderColor: diffs[i] ? "#f59e0b" : "#cbd5e1",
                color: diffs[i] ? "#b45309" : C.text,
              }}>{v}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Live answer panel */}
      <div style={{
        background: "#0f172a", color: "#f8fafc", borderRadius: 10, padding: "10px 14px",
        fontFamily: "JetBrains Mono, monospace", fontSize: 13, lineHeight: 1.7,
      }}>
        <div>
          <span style={{ color: "#94a3b8" }}>{t(E, "mismatches", "불일치")} =</span>{" "}
          <span style={{ color: "#fbbf24", fontWeight: 800 }}>{diffCount}</span>
          {lo !== -1 && (
            <>
              {" "}<span style={{ color: "#94a3b8" }}>· {t(E, "block", "블록")} [{lo}..{hi}]</span>{" "}
              <span style={{ color: "#94a3b8" }}>· len =</span>{" "}
              <span style={{ color: "#fbbf24", fontWeight: 800 }}>{blockLen}</span>
            </>
          )}
        </div>
        <div style={{ marginTop: 6 }}>
          <span style={{ color: "#94a3b8" }}>answer = max(0, {diffCount} − 1) =</span>{" "}
          <span style={{ color: "#34d399", fontWeight: 800, fontSize: 16 }}>{answer}</span>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Mismatches form one contiguous block — fix it with (length − 1) adjacent swaps.",
          "불일치는 연속된 한 블록을 이뤄요 — (길이 − 1)번 인접 스왑으로 해결.")}
      </div>
    </div>
  );
}

export { MismatchVisual };

/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ had cows in a row, sorted by height. ONE cow was secretly moved out of her sorted position to a new spot — pushing the cows in between by 1.\nFind the MINIMUM number of adjacent-swaps needed to put the row back into sorted order.",
        "FJ에게 키 순으로 정렬된 소 한 줄이 있었어요. 단 한 마리가 몰래 다른 위치로 옮겨졌고, 그 사이 소들은 한 칸씩 밀려났어요.\n다시 정렬된 상태로 만들기 위한 최소 인접 스왑 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Out of Place</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of adjacent swaps needed to restore the sorted order.",
                "정렬 상태로 되돌리기 위한 최소 인접 스왑 횟수를 출력.")}
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
                  {t(E, "FJ originally had ", "FJ에게 처음에는 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N cows in a row, sorted by height", "한 줄로 키 순 정렬된 N마리 소")}</b>
                  {t(E, ".", " 가 있었어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie secretly ", "Bessie가 몰래 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "moved exactly one cow to a different position", "정확히 1마리를 다른 위치로 옮겼어요")}</b>
                  {t(E, " — the cows in between shifted by 1.",
                        " — 그 사이 소들이 한 칸씩 밀려났어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of adjacent swaps", "필요한 최소 인접 스왑 횟수")}</b>
                  {t(E, " to restore the sorted order.", " 를 출력해요. 정렬 상태로 되돌리기 위한.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Array [1, 3, 2]. Sorted = [1, 2, 3]. Positions 1 and 2 differ. How many swaps?", "배열 [1, 3, 2]. 정렬 = [1, 2, 3]. 위치 1과 2가 달라요. 스왑 몇 번?"),
      question: t(E,
        "[1, 3, 2] -> sorted [1, 2, 3]. How many adjacent swaps needed?",
        "[1, 3, 2] -> 정렬 [1, 2, 3]. 인접 스왑 몇 번 필요?"),
      options: [
        t(E, "1 swap (swap 3 and 2)", "1번 스왑 (3과 2를 교환)"),
        t(E, "2 swaps", "2번 스왑"),
        t(E, "0 swaps", "0번 스왑"),
      ],
      correct: 0,
      explain: t(E,
        "2 positions differ, so answer = 2 - 1 = 1. Swap indices 1 and 2 to get [1, 2, 3].",
        "2개 위치가 다르니 답 = 2 - 1 = 1. 인덱스 1과 2를 교환하면 [1, 2, 3]."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "[1, 3, 2] needs how many adjacent swaps to sort?", "[1, 3, 2]를 정렬하려면 인접 스왑이 몇 번 필요해요?"),
      question: t(E,
        "Min adjacent swaps to sort [1, 3, 2]?",
        "[1, 3, 2] 정렬에 필요한 최소 인접 스왑 수?"),
      hint: t(E,
        "Compare to sorted; how many positions differ?",
        "정렬된 결과와 비교해 봐 — 다른 위치가 몇 개?"),
      answer: 1,
    },
    // 1-4: visual — see WHY the formula works
    {
      type: "visual",
      narr: t(E,
        "Pick any example. The red ✗ cells form one contiguous block — that's exactly the cows pushed by the misplaced one. Answer = mismatches − 1.",
        "예시를 골라봐. 빨간 ✗ 셀이 연속된 한 블록을 이뤄요 — 옮겨진 소가 밀어낸 자리들이에요. 답 = 불일치 − 1."),
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort a copy and compare to original — the moved cow creates a CONTIGUOUS block of mismatches. Answer = (block length − 1). Sections build it one piece at a time.",
        "사본을 정렬해 원본과 비교 — 옮겨진 소가 연속된 불일치 블록을 만들어요. 답 = (블록 길이 − 1). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getOutOfPlaceSections(E),
    },
  ];
}
