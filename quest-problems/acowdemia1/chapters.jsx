import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAcowdemia1Sections } from "./components";

/* ---------- H-Index Simulator ----------
   Additive bilingual interactive sim. Lets the student tweak paper citations
   and the L bonus slider, and watches the h-index update live. */
function HIndexSim({ E }) {
  const [papers, setPapers] = useState([1, 3, 3, 100]);
  const [L, setL] = useState(0);

  // Compute best h-index achievable by greedily topping up the largest papers.
  const computeH = (cs, extra) => {
    const sorted = [...cs].sort((a, b) => a - b); // ascending
    const N = sorted.length;
    let best = 0;
    for (let h = 0; h <= N; h++) {
      const idx = N - h;
      if (idx < 0) break;
      let need = 0;
      for (let i = idx; i < N; i++) if (sorted[i] < h) need += h - sorted[i];
      if (need <= extra) best = h;
    }
    return best;
  };

  const sortedAsc = [...papers].sort((a, b) => a - b);
  const N = papers.length;
  const baseH = computeH(papers, 0);
  const boostedH = computeH(papers, L);

  // Distribute L across the top boostedH papers to show "boosted" bars.
  const distributed = (() => {
    const arr = [...sortedAsc];
    const h = boostedH;
    const idx = N - h;
    let left = L;
    if (idx >= 0) {
      for (let i = idx; i < N && left > 0; i++) {
        if (arr[i] < h) { const add = Math.min(h - arr[i], left); arr[i] += add; left -= add; }
      }
    }
    return arr;
  })();

  const maxBar = Math.max(10, ...distributed, boostedH + 2);
  const bump = (i, d) => {
    const next = [...papers];
    next[i] = Math.max(0, Math.min(99, (next[i] || 0) + d));
    setPapers(next);
  };
  const addPaper = () => { if (papers.length < 8) setPapers([...papers, 0]); };
  const delPaper = () => { if (papers.length > 1) setPapers(papers.slice(0, -1)); };
  const reset = () => { setPapers([1, 3, 3, 100]); setL(0); };

  const passes = (cite, h) => cite >= h;
  const hLine = boostedH;

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: C.no, marginBottom: 8, letterSpacing: 0.4 }}>
        🧪 {t(E, "Try it: H-Index Simulator", "직접 해보기: H-Index 시뮬레이터")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
        {t(E,
          "Drag bars to change citations. Slide L to add bonus citations. The dashed line is the current h-index — bars at or above it count.",
          "막대 +/-로 인용수를 바꾸고, L 슬라이더로 보너스 인용을 더해봐요. 점선이 현재 h-index — 점선 이상의 막대만 카운트돼요.")}
      </div>

      {/* Bars */}
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, height: 160, padding: "0 8px 8px", borderBottom: `1px solid ${C.border}`, marginBottom: 8 }}>
        {/* h-index dashed line */}
        {hLine > 0 && (
          <div style={{
            position: "absolute", left: 8, right: 8,
            bottom: `${(hLine / maxBar) * 140 + 8}px`,
            borderTop: `2px dashed ${C.no}`,
            pointerEvents: "none",
          }}>
            <span style={{ position: "absolute", right: 0, top: -16, fontSize: 10, fontWeight: 800, color: C.no, background: C.noBg, padding: "1px 5px", borderRadius: 4 }}>
              h = {hLine}
            </span>
          </div>
        )}
        {distributed.map((cite, i) => {
          const original = sortedAsc[i];
          const boost = cite - original;
          const ok = passes(cite, hLine);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 36 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: ok ? C.ok : C.dim }}>{cite}</div>
              <div style={{ position: "relative", width: 28, height: `${(cite / maxBar) * 140}px`, background: ok ? C.okBg : "#f1f5f9", border: `1.5px solid ${ok ? C.ok : C.dimLight}`, borderRadius: 4, overflow: "hidden" }}>
                {boost > 0 && (
                  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: `${(boost / cite) * 100}%`, background: C.carryBd, borderBottom: `1px dashed ${C.carry}` }} />
                )}
              </div>
              <div style={{ fontSize: 9, color: C.dim }}>p{i + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Per-paper +/- controls (operate on original unsorted papers) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {papers.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, background: C.bg, borderRadius: 6, padding: "3px 6px", fontSize: 11 }}>
            <span style={{ color: C.dim, fontWeight: 700 }}>p{i + 1}</span>
            <button onClick={() => bump(i, -1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, width: 20, height: 20, cursor: "pointer", fontWeight: 700 }}>−</button>
            <span style={{ minWidth: 22, textAlign: "center", fontWeight: 700, color: C.text }}>{p}</span>
            <button onClick={() => bump(i, +1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 4, width: 20, height: 20, cursor: "pointer", fontWeight: 700 }}>+</button>
          </div>
        ))}
        <button onClick={addPaper} disabled={papers.length >= 8} style={{ background: C.okBg, border: `1px solid ${C.okBd}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: C.ok, cursor: papers.length >= 8 ? "not-allowed" : "pointer", opacity: papers.length >= 8 ? 0.5 : 1 }}>
          +{t(E, " paper", " 논문")}
        </button>
        <button onClick={delPaper} disabled={papers.length <= 1} style={{ background: C.noBg, border: `1px solid ${C.noBd}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: C.no, cursor: papers.length <= 1 ? "not-allowed" : "pointer", opacity: papers.length <= 1 ? 0.5 : 1 }}>
          −{t(E, " paper", " 논문")}
        </button>
        <button onClick={reset} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: C.dim, cursor: "pointer" }}>
          ⟲ {t(E, "Reset", "초기화")}
        </button>
      </div>

      {/* L slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 10px", background: C.carryBg, border: `1px solid ${C.carryBd}`, borderRadius: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: C.carry, minWidth: 78 }}>
          L = {L}
        </span>
        <input type="range" min={0} max={50} value={L} onChange={e => setL(Number(e.target.value))} style={{ flex: 1, accentColor: C.carry }} />
        <span style={{ fontSize: 10, color: C.dim, minWidth: 80, textAlign: "right" }}>
          {t(E, "bonus citations", "보너스 인용")}
        </span>
      </div>

      {/* Result */}
      <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
        <div style={{ flex: 1, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 2 }}>
            {t(E, "H-index (no bonus)", "H-index (보너스 없이)")}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{baseH}</div>
        </div>
        <div style={{ flex: 1, background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontSize: 10, color: C.no, fontWeight: 700, marginBottom: 2 }}>
            {t(E, "Best h-index with L", "L을 활용한 최대 h-index")}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.no }}>
            {boostedH}
            {boostedH > baseH && (
              <span style={{ fontSize: 11, marginLeft: 6, color: C.carry, fontWeight: 700 }}>
                +{boostedH - baseH}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has N papers with citation counts c[i]. Her h-index is the largest h such that at least h of her papers have ≥ h citations.\nShe can ADD a total of L extra citations distributed across her papers (each extra citation goes to one paper). What's the MAXIMUM h-index she can achieve?",
        "Bessie에게 인용수 c[i] 인 N개의 논문이 있어요. h-index 는 어떤 수 h 에 대해, 인용수가 h 이상인 논문이 h편 이상 있을 때의 가장 큰 h 예요.\n추가 인용을 총 L개 까지 자유롭게 더할 수 있어요 (한 인용은 한 논문에). 만들 수 있는 h-index 의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcda"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Acowdemia I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the maximum h-index Bessie can achieve after distributing L extra citations.",
                "L 개의 추가 인용을 나눠 더했을 때 만들 수 있는 h-index 의 최댓값을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has ", "Bessie에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N papers with citation counts", "인용수가 주어진 N개의 논문")}</b>
                  {t(E, " ", " ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>c[i]</code>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "h-index", "h-index")}</b>
                  {t(E, " is the largest h such that ", " 는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "at least h papers have ≥ h citations", "인용수가 h 이상인 논문이 h편 이상")}</b>
                  {t(E, ".", " 일 때의 가장 큰 h 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#16a34a" }}>{t(E, "total of L extra citations", "총 L개의 추가 인용")}</b>
                  {t(E, " distributed however she likes across her papers.",
                        " 을 논문에 자유롭게 나눠 더할 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible h-index", "달성 가능한 h-index 의 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: Interactive H-Index simulator (additive)
    {
      type: "reveal",
      narr: t(E,
        "Play with the bars and the L slider to feel how the h-index moves. Notice: the h-index is bounded by the count of papers above the dashed line. Every bonus citation poured into a low paper might not raise h — only when the SHORTEST top-h paper crosses h does h jump up.",
        "막대와 L 슬라이더를 직접 움직여 h-index 가 어떻게 변하는지 느껴봐요. 점선 위 막대 개수가 곧 h-index. 낮은 논문에 인용을 부어도 — 상위 h 개 중 가장 짧은 막대가 h 를 넘는 순간에만 h 가 한 칸 올라가요."),
      content: (
        <div style={{ padding: 16 }}>
          <HIndexSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider papers with citations [1, 3, 3, 100].\nWithout any extra citations, what is the h-index?", "인용수가 [1, 3, 3, 100]인 논문들이 있어요. 추가 인용 없이 h-index는 얼마일까요?"),
      question: t(E,
        "Papers [1, 3, 3, 100]. H-index without extra citations?",
        "논문 [1, 3, 3, 100]. 추가 인용 없이 h-index는?"),
      options: [
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "4", "4"),
      ],
      correct: 1,
      explain: t(E,
        "3 papers have >= 3 citations (3, 3, 100), so h-index = 3. Only 1 paper has >= 4, so h=4 fails.",
        "3개의 논문이 3 이상의 인용을 가져 (3, 3, 100), h-index = 3. 4 이상은 1개뿐이라 h=4는 실패."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Papers [1, 3, 3, 100] with no extra citations. What is the h-index?", "논문 [1, 3, 3, 100]에 추가 인용이 없어요. h-index는?"),
      question: t(E,
        "Papers [1, 3, 3, 100], L=0. H-index?",
        "논문 [1, 3, 3, 100], L=0. H-index는?"),
      hint: t(E,
        "Try each h from largest down: how many papers meet ≥ h?",
        "큰 h 부터 시도해봐요: 인용수가 h 이상인 논문이 몇 개?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow1Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Sort papers ascending. For a candidate h-index, the LAST h papers (top h cited) must each have ≥ h citations. Sum the deficits (max(0, h − c[i])) and check if ≤ L extra citations are needed. Binary search h. Sections build it one piece at a time.",
        "논문 오름차순 정렬. 후보 h-index 에 대해, 인용수 상위 h 개 논문이 각자 ≥ h 인용 필요. 부족분 (max(0, h − c[i])) 의 합 ≤ L 인지 확인. h 를 이분 탐색. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAcowdemia1Sections(E),
    },
  ];
}
