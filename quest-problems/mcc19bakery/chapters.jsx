import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc19BakerySections } from "./components";

/* ---------- Bakery Audit Sim ----------
   Additive bilingual interactive sim. Student tweaks N item prices, then
   walks through the greedy: sort DESC, every 4th sorted item (index 3, 7, ...)
   is the free one (2nd cheapest in its group of 4). Verifies the rule from
   chapter 1's problem reveal in a hands-on way. */
const PRESETS = [
  { label: "[1, 2, 3, 4]", arr: [1, 2, 3, 4] },
  { label: "[10, 5, 8, 2, 7]", arr: [10, 5, 8, 2, 7] },
  { label: "[20, 15, 10, 5, 4, 3, 2, 1]", arr: [20, 15, 10, 5, 4, 3, 2, 1] },
  { label: "[9, 9, 9, 1, 1, 1]", arr: [9, 9, 9, 1, 1, 1] },
];

function BakeryAuditSim({ E }) {
  const [arr, setArr] = useState([10, 5, 8, 2, 7]);
  const [revealed, setRevealed] = useState(false);

  const sorted = [...arr].sort((a, b) => b - a);
  // Group of 4: indices 0..3 → cheapest of group = sorted[3] (the smaller one in top-4)
  // The "free" pick in each group of 4 = the 2nd cheapest of that group
  // = sorted[2] of group (i.e. global indices 2, 6, 10, ...) when greedy takes top-4 each block?
  // SOLUTION_CODE marks (i+1) % 4 == 0 → indices 3, 7, 11, ... as free.
  // That's the cheapest of each block of 4 in the descending list — the 2nd cheapest of the block-of-4.
  // (Top-4 sorted desc: [20,15,10,5] → cheapest "5" = 2nd cheapest in group, since the 1st cheapest is the leftover.)
  // We mirror SOLUTION_CODE exactly: index i with (i+1)%4==0 in sorted desc is FREE.
  const isFree = (i) => (i + 1) % 4 === 0;
  const total = sorted.reduce((s, v, i) => s + (isFree(i) ? 0 : v), 0);
  const saved = sorted.reduce((s, v, i) => s + (isFree(i) ? v : 0), 0);

  const tweak = (i, d) => {
    setArr(arr.map((v, j) => (j === i ? Math.max(0, v + d) : v)));
    setRevealed(false);
  };
  const usePreset = (p) => { setArr(p.arr); setRevealed(false); };

  return (
    <div style={{
      background: "#fff7ed", border: "1.5px dashed #d97706", borderRadius: 12,
      padding: "12px 14px", marginBottom: 10,
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", marginBottom: 8, textAlign: "center" }}>
        🔍 {t(E, "Audit Sim — sort DESC & mark every 4th as FREE", "감사 시뮬 — 내림차순 정렬 후 4 번째마다 무료 표시")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 8 }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => usePreset(p)} style={{
            background: "#fff", border: "1px solid #fcd34d", borderRadius: 6,
            padding: "3px 8px", fontSize: 11, fontWeight: 600, color: "#92400e", cursor: "pointer",
          }}>{p.label}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
        {t(E, "Input prices:", "입력 가격:")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {arr.map((v, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #fcd34d", borderRadius: 6,
            padding: "4px 6px", fontSize: 12, display: "flex", alignItems: "center", gap: 4,
          }}>
            <button onClick={() => tweak(i, -1)} style={{
              border: "none", background: "#fef3c7", color: "#92400e",
              borderRadius: 4, width: 18, height: 18, cursor: "pointer", fontSize: 11, fontWeight: 800,
            }}>−</button>
            <span style={{ minWidth: 18, textAlign: "center", fontWeight: 700, color: "#92400e" }}>{v}</span>
            <button onClick={() => tweak(i, +1)} style={{
              border: "none", background: "#fef3c7", color: "#92400e",
              borderRadius: 4, width: 18, height: 18, cursor: "pointer", fontSize: 11, fontWeight: 800,
            }}>+</button>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
        {t(E, "Sorted DESC (every 4th = FREE):", "내림차순 정렬 (4 번째마다 무료):")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
        {sorted.map((v, i) => {
          const free = isFree(i);
          return (
            <div key={i} style={{
              background: free ? "#dcfce7" : "#fff",
              border: free ? "1.5px solid #15803d" : "1px solid #fcd34d",
              borderRadius: 6, padding: "4px 8px", fontSize: 12, fontWeight: 700,
              color: free ? "#15803d" : "#92400e", position: "relative",
              textDecoration: free ? "line-through" : "none",
            }}>
              {v}
              {free && <span style={{
                position: "absolute", top: -8, right: -6, fontSize: 9, fontWeight: 800,
                background: "#15803d", color: "#fff", padding: "1px 4px", borderRadius: 4,
              }}>FREE</span>}
            </div>
          );
        })}
      </div>

      {!revealed ? (
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setRevealed(true)} style={{
            background: "#d97706", color: "#fff", border: "none", borderRadius: 8,
            padding: "5px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer",
          }}>{t(E, "Reveal total cost", "총 비용 보기")}</button>
        </div>
      ) : (
        <div style={{
          background: "#fff", border: "1px solid #15803d", borderRadius: 8,
          padding: "8px 12px", textAlign: "center", fontSize: 12, color: C.text,
        }}>
          <div style={{ marginBottom: 2 }}>
            {t(E, "Saved (free items): ", "절약 (무료 아이템): ")}
            <b style={{ color: "#15803d" }}>{saved}</b>
          </div>
          <div>
            {t(E, "Pay: ", "지불: ")}
            <b style={{ color: "#d97706", fontSize: 14 }}>{total}</b>
          </div>
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
  "prices = list(map(int, input().split()))",
  "",
  "# Sort prices descending for greedy",
  "prices.sort(reverse=True)",
  "",
  "total = 0",
  "for i in range(N):",
  "    # Every 4th item (index 3,7,11,...) is free",
  "    # The 2nd cheapest in each group of 4",
  "    if (i + 1) % 4 == 0:",
  "        continue  # skip this item (free)",
  "    total += prices[i]",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A bakery has a promotion: in every group of 4 items you check out together, the 2nd cheapest item in the group is FREE.\nYou want to buy all N items grouped however you like (groups of up to 4). Print the minimum total cost.",
        "빵집 프로모션: 한 번에 4 개씩 묶어 계산할 때마다 그 그룹에서 2 번째로 싼 아이템이 무료예요.\n총 N 개 아이템을 원하는 대로 묶어 (최대 4 개씩) 사요. 최소 총 비용을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥖</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Bakery</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Print the minimum total cost to buy all N bakery items.",
                "모든 N 개 빵집 아이템을 사는 최소 총 비용을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N bakery items with given prices", "가격이 주어진 N 개의 빵집 아이템")}</b>
                  {t(E, ".", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In every checkout group of 4 items, ", "한 번 계산할 때 4 개씩 묶으면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "the 2nd cheapest in the group is FREE", "그룹에서 2 번째로 싼 아이템이 무료")}</b>
                  {t(E, ". Smaller groups don't trigger the discount.",
                        " — 4 개 미만 그룹은 할인 없음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost to buy all N items", "모든 N 개 아이템을 사는 최소 총 비용")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <BakeryAuditSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If you buy 4 items costing [1, 2, 3, 4], which item is free under the promotion?", "가격이 [1, 2, 3, 4]인 아이템 4개를 사면, 프로모션으로 어떤 아이템이 무료일까요?"),
      question: t(E,
        "4 items: costs [1, 2, 3, 4]. Which one is free (2nd cheapest)?",
        "4개 아이템: 가격 [1, 2, 3, 4]. 어떤 게 무료 (2번째로 싼 것)?"),
      options: [
        t(E, "Item costing 1", "가격 1인 아이템"),
        t(E, "Item costing 2", "가격 2인 아이템"),
        t(E, "Item costing 3", "가격 3인 아이템"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! The 2nd cheapest is the item costing 2. So total = 1+3+4 = 8.",
        "맞아! 2번째로 싼 건 가격 2인 아이템이에요. 그래서 총 비용 = 1+3+4 = 8."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "4 items with costs [1, 2, 3, 4]. The 2nd cheapest (2) is free. What's the total cost?", "가격 [1, 2, 3, 4]인 4개 아이템. 2번째로 싼 것(2)이 무료. 총 비용은?"),
      question: t(E,
        "Costs [1, 2, 3, 4], 2nd cheapest free. Total cost = ?",
        "가격 [1, 2, 3, 4], 2번째로 싼 것 무료. 총 비용 = ?"),
      hint: t(E,
        "Identify which item is free (the 2nd cheapest), then add up the other three.",
        "어떤 아이템이 무료인지 (2 번째로 싼 것) 찾고, 나머지 세 개를 더해봐요."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Sort items by price DESCENDING. Group into blocks of 4: positions 0,1,2,3 are the most expensive 4, then next 4, etc. In each block, position 2 (3rd from top = 2nd cheapest of 4) is FREE. Sum all positions except those. Sections build it one piece at a time.",
        "가격 내림차순 정렬. 4 개씩 묶음: 위치 0,1,2,3 가 가장 비싼 4 개, 다음 4 개, ... 각 묶음의 위치 2 (위에서 3 번째 = 묶음 4 개 중 2 번째로 싼 것) 가 무료. 그 외 모두 합산. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc19BakerySections(E),
    },
  ];
}
