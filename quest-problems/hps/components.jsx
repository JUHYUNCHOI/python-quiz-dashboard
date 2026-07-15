// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS
//   C++:    12/12 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { useState } from "react";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { SimNav, useTraceStep, StepHeader, NarrativePanel } from "@/components/quest/TraceStepper";

const A = "#059669";

/* Shared shape registry — neutral visual markers for cards 1..N.
   Used so quest content stays abstract (no Rock/Paper/Scissors). */
const SHAPES = {
  1: { glyph: "●", color: "#2563eb" },  // circle, blue
  2: { glyph: "■", color: "#7c3aed" },  // square, purple
  3: { glyph: "▲", color: "#ea580c" },  // triangle, orange
};
function CardChip({ n, size = 22 }) {
  const s = SHAPES[n] ?? { glyph: "?", color: "#6b7280" };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <span style={{ fontSize: size, color: s.color, lineHeight: 1 }}>{s.glyph}</span>
      <span style={{ fontSize: 9, color: "#6b7280", fontWeight: 700 }}>{n}</span>
    </div>
  );
}

/* Sample I/O — exactly as in USACO Open 2025 Bronze #1.
   The matchup matrix is TRIANGULAR: row i (1-indexed) has i characters,
   position j (1..i) = outcome of symbol i vs symbol j from i's POV:
       'W' → i wins,  'L' → i loses,  'D' → draw (diagonal is always D).
   Cells above the diagonal are derived: if (i,j)=W then (j,i)=L. */
const SAMPLE_TRIANGLE = ["D", "WD", "LWD"];

/* Decode the triangular matrix into a square `beats[i][j] = true` table
   (1-indexed for readability — beats[a][b] means "card a beats card b"). */
const BEATS = (() => {
  const N = SAMPLE_TRIANGLE.length;
  const tab = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  for (let i = 1; i <= N; i++) {
    const row = SAMPLE_TRIANGLE[i - 1];
    for (let j = 1; j <= i; j++) {
      const ch = row[j - 1];
      if (ch === "W") tab[i][j] = true;       // i beats j
      else if (ch === "L") tab[j][i] = true;  // j beats i  (i loses)
      // 'D' → no entry (draw)
    }
  }
  return tab;
})();

/** True if card a beats card b. Same-card or draw → false. */
const cardBeats = (a, b) => BEATS[a]?.[b] === true;

/* ═══════════════════════════════════════════════════════════════
   AlgorithmReasoningTour — Step-by-step "let's think together"
   walk that builds the brute-force algorithm by asking questions
   instead of stating the steps. Goal: student SEES why the
   complexity is O(M · N²) by deriving each piece.
   ═══════════════════════════════════════════════════════════════ */
export function AlgorithmReasoningTour({ E }) {
  const tour = [
    { kind: "input" },
    { kind: "beats" },
    { kind: "query" },
  ];
  const ts = useTraceStep(tour);
  const cur = tour[ts.safe];

  // Soft Q-A panel: bold question on top, body below.
  const QA = ({ q, children }) => (
    <>
      <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>
        ❓ {q}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.7 }}>{children}</div>
    </>
  );
  const Hi = ({ children, color = "#16a34a" }) => (
    <b style={{ color, fontFamily: "'JetBrains Mono',monospace" }}>{children}</b>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent="#0891b2"
        idx={ts.idx}
        total={ts.total}
        isEn={E}
        title={t(E, "Let's think it through — step by step",
                    "함께 생각해 보기 — 한 단계씩")}
      />

      <NarrativePanel minHeight={170} stepKey={ts.safe}>
        {cur.kind === "input" && (
          <QA q={t(E, "First — how do we read the input?",
                     "먼저 — 입력은 어떻게 받지?")}>
            {t(E, "Read it line by line:", "한 줄씩 읽어요:")}
            <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.85, paddingLeft: 6 }}>
              <div>• {t(E, "Line 1: two numbers — ", "1 줄: 숫자 두 개 — ")}<Hi>N</Hi>{t(E, " (card types) and ", " (카드 종류 수), ")}<Hi>M</Hi>{t(E, " (Elsie's hands).", " (Elsie 패 개수).")}</div>
              <div>• {t(E, "Next ", "다음 ")}<Hi>N</Hi>{t(E, " lines: the W/L/D triangle (line ", " 줄: W/L/D 차트 (")}<Hi>i</Hi>{t(E, " has ", " 번째 줄은 ")}<Hi>i</Hi>{t(E, " characters).", " 글자).")}</div>
              <div>• {t(E, "Last ", "마지막 ")}<Hi>M</Hi>{t(E, " lines: two numbers per line — Elsie's hand for that game.",
                                                                      " 줄: 숫자 두 개씩 — 그 게임에서 Elsie 의 패.")}</div>
            </div>
          </QA>
        )}
        {cur.kind === "beats" && (
          <QA q={t(E, "Next — how do we figure out who beats who?",
                     "다음 — 누가 누구 이기는지 어떻게 알지?")}>
            {t(E, "The chart is in W/L/D form. Translate it once into a 'who beats who' table you can ask quickly.",
                  "차트가 W/L/D 로 적혀 있음. 이걸 한 번만 '누가 누구 이김' 표로 옮겨두면 그 다음부턴 빠르게 답 가능.")}
            <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.85, paddingLeft: 6 }}>
              <div>• {t(E, "If the chart says ", "차트에 ")}<Hi>W</Hi>{t(E, " at row a, col b → write 'a beats b'.",
                                                                            " (a 행, b 열): '카드 a 가 카드 b 이김' 으로 적기.")}</div>
              <div>• {t(E, "If ", "")}<Hi color="#dc2626">L</Hi>{t(E, " → flip it: 'b beats a'.",
                                                                          " 면 거꾸로: '카드 b 가 카드 a 이김' 으로 적기.")}</div>
              <div>• <Hi color="#9ca3af">D</Hi>{t(E, " → nobody wins (skip).", " 면 아무도 안 이김 (그냥 넘김).")}</div>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#5b21b6" }}>
              {t(E, "Now any 'does card X beat card Y?' is a one-step lookup.",
                    "이제 '카드 X 가 카드 Y 이기는가?' 는 표만 한 번 보면 답 나옴.")}
            </div>
          </QA>
        )}
        {cur.kind === "query" && (
          <QA q={t(E, "Last — for each Elsie hand, how do we count winning Bessie hands?",
                     "마지막 — Elsie 패 마다 이기는 Bessie 패 어떻게 세지?")}>
            {t(E, "Read Elsie's two cards. Then try every possible Bessie hand (a, b) and check if it always wins.",
                  "Elsie 두 카드 읽음. 그 다음 가능한 Bessie 패 (a, b) 를 다 시도하면서 무조건 이기는지 확인.")}
            <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.85, paddingLeft: 6 }}>
              <div>• {t(E, "Loop over every (a, b) — Bessie's first card and second card.",
                          "(a, b) 모든 짝 반복 — Bessie 첫째 카드, 둘째 카드.")}</div>
              <div>• {t(E, "Check the table: does a beat both of Elsie's cards? Does b? If either one does → this hand always wins.",
                          "표 확인: a 가 Elsie 두 카드 다 이기나? b 는? 둘 중 하나라도 그러면 → 무조건 이김.")}</div>
              <div>• {t(E, "Count those hands. Print the count for that Elsie hand. Move to the next.",
                          "그런 패 의 개수 세기. 출력. 다음 Elsie 패 로.")}</div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #c4b5fd", fontSize: 12, color: "#0891b2", fontWeight: 700, textAlign: "center" }}>
              {t(E, "→ That's the whole plan. Now write the code.",
                    "→ 계획 끝. 이제 코드로 옮기면 됨.")}
            </div>
          </QA>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent="#0891b2" isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WinningRulesBanner — Persistent reference shown at the top of
   chapters that talk about who beats whom. Removes the need for
   students to remember which shape is which card or to translate
   W/L/D into beats. Three rules, one glance.
   ═══════════════════════════════════════════════════════════════ */
export function WinningRulesBanner({ E }) {
  const rules = [
    { w: { n: 1, glyph: "●", color: "#2563eb" }, l: { n: 3, glyph: "▲", color: "#ea580c" } },
    { w: { n: 2, glyph: "■", color: "#7c3aed" }, l: { n: 1, glyph: "●", color: "#2563eb" } },
    { w: { n: 3, glyph: "▲", color: "#ea580c" }, l: { n: 2, glyph: "■", color: "#7c3aed" } },
  ];
  // Winner gets a green pill (visually obvious "this one wins"); loser stays plain.
  const Pill = ({ card, winner }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      padding: winner ? "2px 7px" : "2px 4px",
      borderRadius: 999,
      border: winner ? "2px solid #16a34a" : "1px solid transparent",
      background: winner ? "#dcfce7" : "transparent",
      opacity: winner ? 1 : 0.75,
    }}>
      <span style={{ fontSize: 15, color: card.color, lineHeight: 1 }}>{card.glyph}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: winner ? "#15803d" : "#475569" }}>{card.n}</span>
    </span>
  );
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: "6px 10px", marginBottom: 10,
      background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8,
      flexWrap: "wrap",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#166534" }}>
        🎯 {t(E, "Beats rules", "이김 규칙")}
      </div>
      {rules.map((r, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "3px 8px", borderRadius: 8,
          background: "#fff",
          border: "1.5px solid #bbf7d0",
          fontSize: 12, fontWeight: 700, color: "#166534",
        }}>
          <Pill card={r.w} winner />
          <span style={{ color: "#15803d", fontWeight: 600, fontSize: 11 }}>{t(E, "beats", "이김")}</span>
          <Pill card={r.l} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ChartReadingTour — Walks 4 example cells of the W/L/D triangle
   to teach how to read it: a 'W' / 'L' / 'D' tour with the cell
   highlighted on the chart. Less abstract than a text-only rule.
   ═══════════════════════════════════════════════════════════════ */
export function ChartReadingTour({ E }) {
  // Each row is the literal input line. null = above-diagonal (derived).
  const rows = [
    { row: 1, glyph: "●", color: "#2563eb", chars: ["D", null, null] },
    { row: 2, glyph: "■", color: "#7c3aed", chars: ["W", "D", null] },
    { row: 3, glyph: "▲", color: "#ea580c", chars: ["L", "W", "D"] },
  ];
  const cards = [
    { n: 1, glyph: "●", color: "#2563eb" },
    { n: 2, glyph: "■", color: "#7c3aed" },
    { n: 3, glyph: "▲", color: "#ea580c" },
  ];
  // Inline card chip — shape + number together so students never have to
  // remember "● = card 1" — every reference shows both.
  const C = (n) => {
    const card = cards[n - 1];
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 6px", borderRadius: 5, background: "#f8fafc", border: `1.5px solid ${card.color}40`, fontWeight: 600, verticalAlign: "middle" }}>
        <span style={{ fontSize: 14, color: card.color, lineHeight: 1 }}>{card.glyph}</span>
        <span style={{ fontSize: 12 }}>{n}</span>
      </span>
    );
  };
  // Tour: pick instructive cells. {i, j} are 1-indexed.
  // Narration uses inline card chips so the shape is always visible.
  const tour = [
    {
      i: 2, j: 1, kind: "W",
      narr: <span>{t(E, "This cell = W. It says: ", "이 셀 = W. 뜻: ")}{C(2)} {t(E, " beats ", " 가 ")}{C(1)} {t(E, "", " 이김.")}</span>,
    },
    {
      i: 3, j: 1, kind: "L",
      narr: <span>{t(E, "This cell = L. ", "이 셀 = L. ")}{C(3)} {t(E, " loses to ", " 가 ")}{C(1)} {t(E, ". Flipped: ", " 한테 짐 — 뒤집으면: ")}{C(1)} {t(E, " beats ", " 가 ")}{C(3)} {t(E, ".", " 이김.")}</span>,
    },
    {
      i: 3, j: 2, kind: "W",
      narr: <span>{t(E, "This cell = W. ", "이 셀 = W. ")}{C(3)} {t(E, " beats ", " 가 ")}{C(2)} {t(E, ".", " 이김.")}</span>,
    },
    {
      i: 2, j: 2, kind: "D",
      narr: <span>{t(E, "This cell = D. ", "이 셀 = D. ")}{C(2)} {t(E, " vs itself → draw. The diagonal is always D — a card always draws against itself.",
        " 가 자기 자신과 붙으면 비김. 대각선은 항상 D — 자기랑 붙으면 비겨요.")}</span>,
    },
    {
      i: null, j: null, kind: "summary",
      narr: <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        {t(E, "All three winning rules: ", "이김 규칙 3 개: ")}
        {C(2)} → {C(1)}{" · "}{C(1)} → {C(3)}{" · "}{C(3)} → {C(2)}
      </span>,
    },
  ];

  const ts = useTraceStep(tour);
  const cur = tour[ts.safe];
  // Highlight BOTH the input cell AND its mirror (the same matchup viewed
  // from the other card's perspective).
  const isCellHighlighted = (ri, cj) => {
    if (cur.i == null) return false;
    return (cur.i === ri && cur.j === cj) || (cur.i === cj && cur.j === ri);
  };
  // Determine winner/loser for any cell (input or derived) so we can fill
  // both halves consistently.
  const cellOutcome = (ri, cj) => {
    if (ri === cj) return { kind: "draw" };
    const r = rows[ri - 1];
    const inputCh = cj <= ri ? r.chars[cj - 1] : null; // input lives in lower triangle
    const mirrorCh = ri <= cj ? rows[cj - 1].chars[ri - 1] : null;
    const ch = inputCh ?? mirrorCh;
    if (ch === "W") {
      // The 'W' is at (a, b) where a is the row in input. So row a beats col b.
      const winnerRow = inputCh != null ? ri : cj;
      const loserRow = inputCh != null ? cj : ri;
      return { kind: "beats", winner: cards[winnerRow - 1], loser: cards[loserRow - 1] };
    }
    if (ch === "L") {
      // 'L' at (a, b) means row a loses to col b.
      const winnerRow = inputCh != null ? cj : ri;
      const loserRow = inputCh != null ? ri : cj;
      return { kind: "beats", winner: cards[winnerRow - 1], loser: cards[loserRow - 1] };
    }
    return { kind: "unknown" };
  };

  const cellBg = (ch, isInput, isSelf, hl) => {
    if (!isInput) return "repeating-linear-gradient(45deg, #fafafa 0 8px, #f3f4f6 8px 16px)";
    if (isSelf) return hl
      ? "repeating-linear-gradient(45deg, #fef3c7 0 6px, #fde68a 6px 12px)"
      : "repeating-linear-gradient(45deg, #f1f5f9 0 6px, #e2e8f0 6px 12px)";
    if (ch === "W") return hl ? "#15803d" : "#16a34a";
    if (ch === "L") return hl ? "#fca5a5" : "#fee2e2";
    return "#fff";
  };
  const cellFg = (ch, isInput, isSelf, hl) => {
    if (!isInput) return "#cbd5e1";
    if (isSelf) return hl ? "#92400e" : "#94a3b8";
    if (ch === "W") return "#fff";
    if (ch === "L") return "#7f1d1d";
    return "#1e293b";
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent="#d97706"
        idx={ts.idx}
        total={ts.total}
        isEn={E}
        title={t(E, "Click ▶ to walk through the chart — 1 cell at a time",
                    "▶ 눌러 차트 셀 하나씩 따라가기")}
      />

      {/* Match-up label — which two cards is the highlighted cell about? */}
      {cur.i != null && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#92400e",
        }}>
          <span>{t(E, "This match-up:", "이 매치업:")}</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            padding: "2px 8px", borderRadius: 999,
            background: "#fef3c7", border: "1px solid #f59e0b",
          }}>
            <span style={{ fontSize: 16, color: cards[cur.i - 1].color, lineHeight: 1 }}>{cards[cur.i - 1].glyph}</span>
            <span>{t(E, "card ", "카드 ")}{cur.i}</span>
          </span>
          <span style={{ color: "#9ca3af", fontWeight: 700 }}>vs</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            padding: "2px 8px", borderRadius: 999,
            background: "#fef3c7", border: "1px solid #f59e0b",
          }}>
            <span style={{ fontSize: 16, color: cards[cur.j - 1].color, lineHeight: 1 }}>{cards[cur.j - 1].glyph}</span>
            <span>{t(E, "card ", "카드 ")}{cur.j}</span>
          </span>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, alignItems: "stretch", gap: 8 }}>
        {/* Left rail: literal input lines */}
        <div style={{
          display: "grid", gridTemplateRows: "60px repeat(3, 60px)",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          <div style={{
            fontSize: 10, color: "#6b7280", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4,
          }}>
            {t(E, "input", "입력")}
          </div>
          {["D", "WD", "LWD"].map((str, ri) => (
            <div key={str} style={{
              display: "flex", alignItems: "center", justifyContent: "flex-end",
              paddingRight: 4, fontSize: 17, fontWeight: 700,
              color: cur.i === ri + 1 ? "#92400e" : "#7c2d12",
              transition: "color .2s",
            }}>
              {str}
            </div>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "60px repeat(3, 60px)",
          gridAutoRows: "60px",
          fontFamily: "'JetBrains Mono',monospace",
          border: "1px solid #cbd5e1", borderRadius: 10, overflow: "hidden", background: "#fff",
        }}>
          {/* Header row */}
          <div style={{ background: "#f8fafc", borderRight: "2px solid #cbd5e1", borderBottom: "2px solid #cbd5e1" }} />
          {cards.map((c, idx) => (
            <div key={c.n} style={{
              background: cur.j === c.n ? "#fef3c7" : "#f8fafc",
              borderRight: idx < 2 ? "1px solid #e5e7eb" : "none",
              borderBottom: "2px solid #cbd5e1", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
              transition: "background .2s",
            }}>
              <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 700 }}>{t(E, "vs", "vs")}</div>
              <div style={{ fontSize: 18, color: c.color, lineHeight: 1 }}>{c.glyph}</div>
              <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 700 }}>{t(E, "card ", "카드 ")}{c.n}</div>
            </div>
          ))}

          {rows.map((r, ri) => (
            <div key={r.row} style={{ display: "contents" }}>
              <div style={{
                background: cur.i === r.row ? "#fef3c7" : "#f8fafc",
                borderRight: "2px solid #cbd5e1",
                borderBottom: ri < 2 ? "1px solid #e5e7eb" : "none",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                transition: "background .2s",
              }}>
                <div style={{ fontSize: 18, color: r.color, lineHeight: 1 }}>{r.glyph}</div>
                <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 700 }}>{t(E, "card ", "카드 ")}{r.row}</div>
              </div>
              {r.chars.map((_unused, j) => {
                const ri1 = r.row;
                const cj1 = j + 1;
                const outcome = cellOutcome(ri1, cj1);
                const isInputCell = cj1 <= ri1; // lower triangle = literal input
                const isSelf = outcome.kind === "draw";
                const hl = isCellHighlighted(ri1, cj1);
                let bg = "#fff";
                if (isSelf) bg = "repeating-linear-gradient(45deg, #f1f5f9 0 6px, #e2e8f0 6px 12px)";
                else if (outcome.kind === "beats") {
                  // Color depends on whether the row card or col card won.
                  const rowWins = outcome.winner.n === ri1;
                  bg = rowWins ? "#dcfce7" : "#fee2e2";
                  if (!isInputCell) {
                    // Mirror (derived) cell — softer fill so input vs derived
                    // is still distinguishable.
                    bg = rowWins
                      ? "repeating-linear-gradient(45deg, #f0fdf4 0 8px, #dcfce7 8px 16px)"
                      : "repeating-linear-gradient(45deg, #fef2f2 0 8px, #fee2e2 8px 16px)";
                  }
                }
                return (
                  <div key={j} style={{
                    borderRight: j < 2 ? "1px solid #e5e7eb" : "none",
                    borderBottom: ri < 2 ? "1px solid #e5e7eb" : "none",
                    background: bg,
                    boxShadow: hl ? "inset 0 0 0 3px #f59e0b" : "none",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                    transition: "all .2s",
                  }}>
                    {isSelf ? (
                      <div style={{ fontSize: 12, fontWeight: 600, color: hl ? "#92400e" : "#94a3b8" }}>
                        {t(E, "draw", "비김")}
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 3, fontWeight: 700 }}>
                        <span style={{ fontSize: hl ? 20 : 17, color: outcome.winner.color, lineHeight: 1 }}>{outcome.winner.glyph}</span>
                        <span style={{ fontSize: hl ? 14 : 12, color: "#16a34a" }}>→</span>
                        <span style={{ fontSize: hl ? 20 : 17, color: outcome.loser.color, lineHeight: 1, opacity: 0.7 }}>{outcome.loser.glyph}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <NarrativePanel minHeight={84} stepKey={ts.safe}>
        <div style={{ fontSize: 14, lineHeight: 1.65 }}>{cur.narr}</div>
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent="#d97706" isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HpsCaseSimulator — Walks the THREE sample queries from USACO
   Open 2025 Bronze #1, step-by-step:
     1) Elsie hand (1, 2) → 0
     2) Elsie hand (2, 3) → 0
     3) Elsie hand (1, 1) → 5
   For each: try every card; the cards that beat BOTH of Elsie's
   cards are the "winning cards". Then count Bessie hands (a, b)
   that contain at least one winning card.
   Plain Korean throughout — no jargon.
   ═══════════════════════════════════════════════════════════════ */
export function HpsCaseSimulator({ E }) {
  const N = 3;
  const queries = [
    { elsie: [1, 2], answer: 0 },
    { elsie: [2, 3], answer: 0 },
    { elsie: [1, 1], answer: 5 },
  ];
  // For each query, evaluate every card — does it beat BOTH of Elsie's?
  const evalQuery = (elsie) => {
    return [1, 2, 3].map((c) => {
      const beats1 = cardBeats(c, elsie[0]);
      const beats2 = cardBeats(c, elsie[1]);
      return { c, beats1, beats2, beatsBoth: beats1 && beats2 };
    });
  };

  // 게임 3(답 5)만 자세히 걷기 — 게임 1·2(둘 다 0)는 setup 에서 한 줄 요약.
  // (선생님 2026-07-14: 3게임 다 걸으면 재미없는 0을 두 번 보고 길고 반복적. 브루트 코드와도 겹침.)
  const g3 = queries.length - 1;
  const trace = [
    { kind: "setup" },
    { kind: "show", qIdx: g3 },
    { kind: "try", qIdx: g3 },
    { kind: "count", qIdx: g3 },
    { kind: "summary" },
  ];

  const ts = useTraceStep(trace);
  const s = trace[ts.safe];
  const curQuery = s.qIdx != null ? queries[s.qIdx] : null;
  const curEval = curQuery ? evalQuery(curQuery.elsie) : null;
  const winningCards = curEval ? curEval.filter((r) => r.beatsBoth).map((r) => r.c) : null;

  const Card = ({ n, size = 22 }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>
      <span style={{ fontSize: size, color: SHAPES[n]?.color, lineHeight: 1 }}>{SHAPES[n]?.glyph}</span>
      <span style={{ fontWeight: 600, fontSize: size * 0.55 }}>{n}</span>
    </span>
  );

  const ElsieHandBox = ({ cards }) => (
    <div style={{
      display: "inline-flex", gap: 10, padding: "8px 14px",
      background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10,
    }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          padding: "4px 10px", borderRadius: 6, background: "#fff", border: "1.5px solid #dc2626",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
        }}>
          <span style={{ fontSize: 22, color: SHAPES[c]?.color, lineHeight: 1 }}>{SHAPES[c]?.glyph}</span>
          <span style={{ fontSize: 10, color: "#7f1d1d", fontWeight: 600 }}>{t(E, "card ", "카드 ")}{c}</span>
        </div>
      ))}
    </div>
  );

  // Compact column per Bessie candidate.  Three of these sit side-by-side
  // so the student sees ALL three card tests at once — natural comparison.
  // Vertical stack made the panel tall enough that the bottom verdict
  // disappeared off-screen; horizontal columns drop the panel height to
  // ~1/3 of the previous layout.
  const TryRow = ({ c, beats1, beats2, beatsBoth, e1, e2 }) => (
    <div style={{
      flex: 1, minWidth: 0,
      padding: "10px 8px", borderRadius: 8,
      background: beatsBoth ? "#dcfce7" : "#f9fafb",
      border: `1.5px solid ${beatsBoth ? "#16a34a" : "#e5e7eb"}`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    }}>
      {/* Header: which Bessie card we're testing */}
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "#5b21b6", textAlign: "center" }}>
        {t(E, "Bessie: ", "Bessie: ")}
      </div>
      <Card n={c} size={26} />
      {/* Two sub-checks stacked vertically inside the column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11.5, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {t(E, "vs ", "vs ")}<Card n={e1} size={14} />
          {beats1
            ? <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
            : <span style={{ color: "#dc2626", fontWeight: 700 }}>✗</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {t(E, "vs ", "vs ")}<Card n={e2} size={14} />
          {beats2
            ? <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
            : <span style={{ color: "#dc2626", fontWeight: 700 }}>✗</span>}
        </div>
      </div>
      {/* Verdict pill */}
      <div style={{
        fontSize: 11, fontWeight: 700,
        padding: "3px 8px", borderRadius: 999,
        background: beatsBoth ? "#16a34a" : "#fee2e2",
        color: beatsBoth ? "#fff" : "#7f1d1d",
        border: beatsBoth ? "none" : "1.5px solid #fca5a5",
        textAlign: "center",
      }}>
        {beatsBoth
          ? t(E, "✓ both!", "✓ 둘 다!")
          : t(E, "✗ not both", "✗ 둘 다 X")}
      </div>
    </div>
  );

  // Compact 3×3 grid showing all 9 Bessie hands; highlight ones with winning card.
  const HandGrid = ({ winningCards }) => {
    const winSet = new Set(winningCards);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "26px repeat(3, 56px)",
          gridAutoRows: "38px",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          <div />
          {[1, 2, 3].map((b) => (
            <div key={`h${b}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#6b7280" }}>
              b={b}
            </div>
          ))}
          {[1, 2, 3].map((a) => (
            <div key={`r${a}`} style={{ display: "contents" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4, fontSize: 11, fontWeight: 600, color: "#6b7280" }}>
                a={a}
              </div>
              {[1, 2, 3].map((b) => {
                const has = winSet.has(a) || winSet.has(b);
                return (
                  <div key={`${a}-${b}`} style={{
                    margin: 2,
                    border: `1px solid ${has ? "#16a34a" : "#cbd5e1"}`,
                    background: has ? "#dcfce7" : "#fff",
                    borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600,
                    color: has ? "#15803d" : "#94a3b8",
                  }}>
                    ({a},{b}){has && <span style={{ marginLeft: 2, fontSize: 10 }}>✓</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={ts.idx}
        total={ts.total}
        isEn={E}
        title={t(E, "Walk all 3 sample queries — step by step",
                    "샘플 3 개 쿼리 한 번씩 따라가기")}
      />

      {/* Persistent "current game" banner — visible in all query steps so the
          student always sees which Elsie hand they're working on. */}
      {curQuery && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "6px 12px", marginBottom: 10,
          background: "#fee2e2", border: "1.5px solid #fca5a5", borderRadius: 8,
          flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#7f1d1d" }}>
            🎬 {t(E, `Game ${s.qIdx + 1} — Elsie's hand:`, `게임 ${s.qIdx + 1} — Elsie 패:`)}
          </span>
          {curQuery.elsie.map((c, i) => {
            const card = SHAPES[c];
            return (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                padding: "2px 8px", borderRadius: 999,
                background: "#fff", border: `1px solid #dc2626`,
                fontSize: 12, fontWeight: 600, color: "#7f1d1d",
              }}>
                <span style={{ fontSize: 16, color: card.color, lineHeight: 1 }}>{card.glyph}</span>
                {c}
              </span>
            );
          })}
        </div>
      )}

      <NarrativePanel minHeight={150} stepKey={ts.safe}>
        {s.kind === "setup" && (
          <>
            <div style={{ marginBottom: 8, color: "#5b21b6", fontWeight: 700, fontSize: 13.5 }}>
              {t(E, "→ Bessie wins NO MATTER what Elsie plays iff she has ONE card that beats BOTH of Elsie's cards.",
                    "→ 핵심: Elsie 가 무엇을 내도 Bessie 가 이기려면 — Bessie 패에 Elsie 두 카드를 모두 이기는 카드가 한 장이라도 있으면 됨.")}
            </div>
            <div style={{ fontSize: 12, color: "#1f2937", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px", lineHeight: 1.6, wordBreak: "keep-all" }}>
              {t(E, "Games 1 (1, 2) and 2 (2, 3): no card beats both → answer 0.  Below we walk just Game 3 (1, 1) → 5 in detail.",
                    "게임 1 (1, 2)·게임 2 (2, 3): 둘 다 이기는 카드가 없어 → 답 0. 아래에선 게임 3 (1, 1) → 5 만 자세히 봐요.")}
            </div>
          </>
        )}

        {s.kind === "show" && (() => {
          const [e1, e2] = curQuery.elsie;
          return (
            <>
              <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 8, fontSize: 14 }}>
                🎬 {t(E, `Query ${s.qIdx + 1}: Elsie's hand`, `쿼리 ${s.qIdx + 1}: Elsie 의 패`)}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <ElsieHandBox cards={curQuery.elsie} />
              </div>
              <div style={{ fontSize: 12.5, textAlign: "center" }}>
                {t(E, `Elsie holds card ${e1} and card ${e2}. She'll play ONE of them, but we don't know which.`,
                      `Elsie 가 카드 ${e1} 과 카드 ${e2} 를 들고 있음. 둘 중 1 장을 내는데, 어느 쪽일지 모름.`)}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, textAlign: "center", color: "#5b21b6", fontWeight: 700 }}>
                {t(E, "Question: which of Bessie's cards (1, 2, or 3) can beat BOTH?",
                      "질문: Bessie 카드 (1, 2, 3) 중 두 카드 다 이기는 게 있을까?")}
              </div>
            </>
          );
        })()}

        {s.kind === "try" && (() => {
          const [e1, e2] = curQuery.elsie;
          return (
            <>
              <div style={{ fontWeight: 600, color: "#7c3aed", marginBottom: 8, fontSize: 14 }}>
                🔍 {t(E, "Try every card: does it beat BOTH of Elsie's?",
                          "카드 하나씩 시험: Elsie 두 카드 다 이기는지?")}
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "stretch" }}>
                {curEval.map((r) => (
                  <TryRow key={r.c} c={r.c} beats1={r.beats1} beats2={r.beats2} beatsBoth={r.beatsBoth} e1={e1} e2={e2} />
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: winningCards.length > 0 ? "#15803d" : "#7f1d1d" }}>
                → {winningCards.length === 0
                    ? t(E, "No card beats both → Bessie can't always win.",
                          "둘 다 이기는 카드 없음 → Bessie 가 무조건 이기는 건 불가능.")
                    : t(E, `Card${winningCards.length > 1 ? "s" : ""} ${winningCards.join(", ")} beat${winningCards.length > 1 ? "" : "s"} both. Bessie wins if her hand has at least one of these.`,
                          `카드 ${winningCards.join(", ")} 가 두 카드 다 이김. Bessie 패 에 이 카드가 한 장이라도 있으면 이김.`)}
              </div>
            </>
          );
        })()}

        {s.kind === "count" && (() => {
          if (winningCards.length === 0) {
            return (
              <>
                <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 8, fontSize: 14 }}>
                  🏁 {t(E, "Count Bessie hands that win", "이기는 Bessie 패 세기")}
                </div>
                <div style={{ marginBottom: 8 }}>
                  {t(E, "There's no card that beats both Elsie cards. So no Bessie hand can guarantee a win — whatever 2 cards she holds, Elsie can always pick one Bessie can't beat.",
                        "Elsie 두 카드 다 이기는 카드가 없어요. 그래서 Bessie 가 어떤 2 장을 들어도 Elsie 가 못 이기는 쪽으로 골라 낼 수 있음.")}
                </div>
                <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: "#dc2626" }}>
                  {t(E, "answer = 0", "답 = 0")}
                </div>
              </>
            );
          }
          const winSet = new Set(winningCards);
          const safeHands = [];
          for (let a = 1; a <= 3; a++) for (let b = 1; b <= 3; b++)
            if (winSet.has(a) || winSet.has(b)) safeHands.push([a, b]);
          return (
            <>
              <div style={{ fontWeight: 600, color: "#15803d", marginBottom: 8, fontSize: 14 }}>
                🏁 {t(E, "Count Bessie hands that win", "이기는 Bessie 패 세기")}
              </div>
              <div style={{ marginBottom: 8, fontSize: 12.5 }}>
                {t(E, "All 9 hands (a, b) — green = contains a winning card. Count the green ones.",
                      "9 가지 패 (a, b) 모두 — 초록 = 이기는 카드 포함. 초록 셀 세기.")}
              </div>
              <HandGrid winningCards={winningCards} />
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 18, fontWeight: 700, color: "#15803d" }}>
                {t(E, `answer = ${safeHands.length}`, `답 = ${safeHands.length}`)}
              </div>
            </>
          );
        })()}

        {s.kind === "summary" && (
          <>
            <div style={{ fontWeight: 600, color: A, marginBottom: 8, fontSize: 14 }}>
              📊 {t(E, "All 3 queries — final answers", "샘플 3 쿼리 — 최종 답")}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.85, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>• {t(E, "Elsie (1, 2) → no card beats both → ", "Elsie (1, 2) → 둘 다 이기는 카드 없음 → ")}<b style={{ color: "#dc2626", fontSize: 14 }}>0</b></div>
              <div>• {t(E, "Elsie (2, 3) → no card beats both → ", "Elsie (2, 3) → 둘 다 이기는 카드 없음 → ")}<b style={{ color: "#dc2626", fontSize: 14 }}>0</b></div>
              <div>• {t(E, "Elsie (1, 1) → card 2 beats both → ", "Elsie (1, 1) → 카드 2 가 둘 다 이김 → ")}<b style={{ color: "#15803d", fontSize: 14 }}>5</b></div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #c4b5fd", fontSize: 12, color: "#5b21b6" }}>
              {t(E, "Sample output: 0 / 0 / 5 — matches!", "샘플 출력: 0 / 0 / 5 — 일치!")}
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HpsSim — Free-play sandbox.
   - Pick Bessie's hand (a, b) and Elsie's hand (s1, s2).
   - Rule: simultaneous pick. Bessie commits to ONE of {a, b} and
     wins iff that single card beats BOTH of Elsie's cards.
   - The widget shows BOTH options for Bessie and highlights the
     dominator(s) in her hand if any.
   ═══════════════════════════════════════════════════════════════ */
export function HpsSim({ E }) {
  // 0-indexed: 0 = card 1, 1 = card 2, 2 = card 3
  const [a, setA] = useState(1);  // card 2
  const [b, setB] = useState(2);  // card 3
  const [s1, setS1] = useState(0); // card 1
  const [s2, setS2] = useState(0); // card 1 (sample query 3 — winning case)

  // For each Bessie card, does it beat BOTH Elsie picks?
  const aBeatsBoth = cardBeats(a + 1, s1 + 1) && cardBeats(a + 1, s2 + 1);
  const bBeatsBoth = cardBeats(b + 1, s1 + 1) && cardBeats(b + 1, s2 + 1);
  const guarantees = aBeatsBoth || bBeatsBoth;

  // Compact shape chip — keeps shape color visible even when selected
  const ShapeChip = ({ idx, isActive, accent, onClick }) => {
    const sh = SHAPES[idx + 1];
    return (
      <button onClick={onClick} style={{
        flex: 1, height: 38, borderRadius: 8,
        border: `1px solid ${isActive ? accent : "#e5e7eb"}`,
        background: isActive ? `${accent}15` : "#fff",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        boxShadow: isActive ? `inset 0 0 0 1px ${accent}` : "none",
      }}>
        <span style={{ fontSize: 18, color: sh.color, lineHeight: 1 }}>{sh.glyph}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? accent : C.dim }}>{idx + 1}</span>
      </button>
    );
  };

  // Compact slot picker (one labeled row of 3 chips)
  const SlotPicker = ({ label, value, accent, onChange }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: 32, fontSize: 12, fontWeight: 600, color: accent, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {[0,1,2].map(i => <ShapeChip key={i} idx={i} isActive={i === value} accent={accent} onClick={() => onChange(i)} />)}
      </div>
    </div>
  );

  // Big card display in result panel
  const Pill = ({ idx }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", border: `1.5px solid ${SHAPES[idx + 1].color}40`, borderRadius: 6, background: "#fff" }}>
      <span style={{ fontSize: 16, color: SHAPES[idx + 1].color, lineHeight: 1 }}>{SHAPES[idx + 1].glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{idx + 1}</span>
    </span>
  );

  // Compact "card x vs both Elsie" verdict line
  const VsBoth = ({ cardIdx, isWinner }) => {
    const beats1 = cardBeats(cardIdx + 1, s1 + 1);
    const beats2 = cardBeats(cardIdx + 1, s2 + 1);
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
        padding: "4px 8px", borderRadius: 6,
        background: isWinner ? "#dcfce7" : "transparent",
        border: isWinner ? "1.5px solid #16a34a" : "1.5px dashed transparent",
      }}>
        <Pill idx={cardIdx} />
        <span style={{ fontSize: 11 }}>{t(E, "vs", "vs")}</span>
        <Pill idx={s1} />: <b style={{ color: beats1 ? "#16a34a" : "#dc2626", fontSize: 14 }}>{beats1 ? "✓" : "✗"}</b>
        <span style={{ fontSize: 11 }}>{t(E, "and vs", ", vs")}</span>
        <Pill idx={s2} />: <b style={{ color: beats2 ? "#16a34a" : "#dc2626", fontSize: 14 }}>{beats2 ? "✓" : "✗"}</b>
        {isWinner && <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, color: "#15803d" }}>{t(E, "BEATS BOTH", "둘 다 이김")}</span>}
      </div>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: C.dim, textAlign: "center" }}>
        {t(E, "Beats: card 2 → card 1, card 1 → card 3, card 3 → card 2 (cycle from sample matrix)",
              "승패: 카드 2 → 카드 1, 카드 1 → 카드 3, 카드 3 → 카드 2 (샘플 행렬의 순환)")}
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: A, marginBottom: 6 }}>{t(E, "Bessie's pair (a, b)", "Bessie 쌍 (a, b)")}</div>
        <SlotPicker label="a" value={a} accent={A} onChange={setA} />
        <SlotPicker label="b" value={b} accent={A} onChange={setB} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", marginBottom: 6 }}>{t(E, "Elsie's pair (s1, s2)", "Elsie 쌍 (s1, s2)")}</div>
        <SlotPicker label="s1" value={s1} accent="#dc2626" onChange={setS1} />
        <SlotPicker label="s2" value={s2} accent="#dc2626" onChange={setS2} />
      </div>

      <div style={{
        marginTop: 14, padding: "10px 12px", borderRadius: 10,
        background: guarantees ? "#dcfce7" : "#fef2f2",
        border: `1px solid ${guarantees ? "#16a34a" : "#dc2626"}`,
        fontSize: 12.5, color: C.text, lineHeight: 1.7,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: guarantees ? "#15803d" : "#7f1d1d", marginBottom: 6 }}>
          {t(E, "Each Bessie card vs BOTH of Elsie's cards:", "Bessie 카드 각각이 Elsie 두 카드 다 이기는지:")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <VsBoth cardIdx={a} isWinner={aBeatsBoth} />
          <VsBoth cardIdx={b} isWinner={bBeatsBoth} />
        </div>
        <div style={{ marginTop: 8, fontWeight: 700, color: guarantees ? "#16a34a" : "#dc2626", fontSize: 14 }}>
          {guarantees
            ? t(E, "✅ Bessie always wins — at least one card beats both.",
                  "✅ Bessie 무조건 이김 — 한 카드가 Elsie 두 카드 다 이김.")
            : t(E, "❌ Elsie can find a card Bessie can't beat.",
                  "❌ Elsie 가 Bessie 못 이기는 쪽으로 낼 수 있음.")}
        </div>
      </div>
    </div>
  );
}

export function HpsRunner({ E }) {
  return (
    <div style={{ padding: 14, fontSize: 12, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
      {t(E, "Use the Sim above to try different pair combinations. The brute force counts all (a, b) pairs.",
            "위 Sim에서 다양한 쌍 조합 시도. brute force는 모든 (a, b) 쌍을 셈.")}
    </div>
  );
}

/* Section 1: Read N, M and parse the W/L/D triangle into a beats table. */
const HP_INPUT_PY = (E) => [
  t(E, "# Read N (card types) and M (number of Elsie's hands)",
        "# N (카드 종류) 와 M (Elsie 패 개수) 읽기"),
  "N, M = map(int, input().split())",
  "",
  t(E, "# Make a 'who beats who' table — start all False",
        "# '누가 누구 이김' 표 — 처음엔 다 False"),
  "beats = [[False] * N for _ in range(N)]",
  "",
  t(E, "# Fill it from the W/L/D triangle",
        "# W/L/D 차트로 표 채우기"),
  "for i in range(N):",
  "    row = input().strip()",
  "    for j in range(i + 1):",
  "        if row[j] == 'W':",
  "            beats[i][j] = True",
  "        elif row[j] == 'L':",
  "            beats[j][i] = True",
];
const HP_INPUT_CPP = (E) => [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  t(E, "    // Read N (card types) and M (number of Elsie's hands)",
        "    // N (카드 종류) 와 M (Elsie 패 개수) 읽기"),
  "    int N, M;",
  "    cin >> N >> M;",
  "",
  t(E, "    // 'who beats who' table — start all false",
        "    // '누가 누구 이김' 표 — 처음엔 다 false"),
  "    vector<vector<bool>> beats(N, vector<bool>(N, false));",
  "",
  t(E, "    // Fill it from the W/L/D triangle",
        "    // W/L/D 차트로 표 채우기"),
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "        for (int j = 0; j <= i; j++) {",
  "            if (row[j] == 'W') {",
  "                beats[i][j] = true;",
  "            } else if (row[j] == 'L') {",
  "                beats[j][i] = true;",
  "            }",
  "        }",
  "    }",
];

/* Section 2: For each Elsie hand, count Bessie hands that always win.
   A hand (a, b) wins if a OR b beats both Elsie cards. */
const HP_LOOP_PY = (E) => [
  t(E, "# For each Elsie hand:", "# Elsie 패 마다:"),
  "for _ in range(M):",
  t(E, "    # Read Elsie's two cards (1-based → 0-based)",
        "    # Elsie 의 두 카드 읽기 (1-based → 0-based 로)"),
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1",
  "    s2 -= 1",
  "",
  t(E, "    # Try every (a, b) — Bessie's two cards",
        "    # (a, b) 모든 짝 시도 — Bessie 의 두 카드"),
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  t(E, "            # Does either card beat BOTH of Elsie's?",
        "            # 둘 중 하나가 Elsie 두 카드 다 이기나?"),
  "            if (beats[a][s1] and beats[a][s2]) or \\",
  "               (beats[b][s1] and beats[b][s2]):",
  "                count += 1",
  "",
  "    print(count)",
];
const HP_LOOP_CPP = (E) => [
  t(E, "    // For each Elsie hand:", "    // Elsie 패 마다:"),
  "    for (int q = 0; q < M; q++) {",
  t(E, "        // Read Elsie's two cards (1-based → 0-based)",
        "        // Elsie 의 두 카드 읽기 (1-based → 0-based 로)"),
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--;",
  "        s2--;",
  "",
  t(E, "        // Try every (a, b) — Bessie's two cards",
        "        // (a, b) 모든 짝 시도 — Bessie 의 두 카드"),
  "        int count = 0;",
  "        for (int a = 0; a < N; a++) {",
  "            for (int b = 0; b < N; b++) {",
  t(E, "                // Does either card beat BOTH of Elsie's?",
        "                // 둘 중 하나가 Elsie 두 카드 다 이기나?"),
  "                if ((beats[a][s1] && beats[a][s2]) ||",
  "                    (beats[b][s1] && beats[b][s2])) {",
  "                    count++;",
  "                }",
  "            }",
  "        }",
  "",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Final full code — uses dominator counting (O(M·N)) instead of brute
   pair enumeration (O(M·N²) which times out at N=M=3000). */
const HP_FULL_PY = [
  "N, M = map(int, input().split())",
  "",
  "beats = [[False] * N for _ in range(N)]",
  "for i in range(N):",
  "    row = input().strip()",
  "    for j in range(i + 1):",
  "        if row[j] == 'W':",
  "            beats[i][j] = True",
  "        elif row[j] == 'L':",
  "            beats[j][i] = True",
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1",
  "    s2 -= 1",
  "",
  "    dom = 0",
  "    for c in range(N):",
  "        if beats[c][s1] and beats[c][s2]:",
  "            dom += 1",
  "",
  "    print(N * N - (N - dom) * (N - dom))",
];
const HP_FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "",
  "    vector<vector<bool>> beats(N, vector<bool>(N, false));",
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "        for (int j = 0; j <= i; j++) {",
  "            if (row[j] == 'W') {",
  "                beats[i][j] = true;",
  "            } else if (row[j] == 'L') {",
  "                beats[j][i] = true;",
  "            }",
  "        }",
  "    }",
  "",
  "    for (int q = 0; q < M; q++) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--;",
  "        s2--;",
  "",
  "        int dom = 0;",
  "        for (int c = 0; c < N; c++) {",
  "            if (beats[c][s1] && beats[c][s2]) {",
  "                dom++;",
  "            }",
  "        }",
  "",
  "        int answer = N * N - (N - dom) * (N - dom);",
  "        cout << answer << '\\n';",
  "    }",
  "    return 0;",
  "}",
];
/* Mini "sample input" panel — shows the input file with the lines that
   THIS section actually reads highlighted in yellow. Helps the student
   see "this code reads THIS part of the input". */
const SAMPLE_INPUT_LINES = ["3 3", "D", "WD", "LWD", "1 2", "2 3", "1 1"];
const InputAside = ({ E, highlight = [], note = null }) => {
  const hi = new Set(highlight);
  return (
    <div style={{
      background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10,
      padding: "8px 10px", fontSize: 11.5,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: "#92400e", marginBottom: 6, letterSpacing: 0.3 }}>
        📥 {t(E, "Sample input", "샘플 입력")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55 }}>
        {SAMPLE_INPUT_LINES.map((line, i) => (
          <div key={i} style={{
            background: hi.has(i) ? "#fde68a" : "transparent",
            border: hi.has(i) ? "1.5px solid #f59e0b" : "1.5px solid transparent",
            borderRadius: 4,
            padding: "1px 5px",
            color: hi.has(i) ? "#7c2d12" : "#9ca3af",
            fontWeight: hi.has(i) ? 800 : 500,
            opacity: hi.has(i) ? 1 : 0.7,
          }}>
            {line || " "}
          </div>
        ))}
      </div>
      {note && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontSize: 11, color: "#7c2d12", lineHeight: 1.5 }}>
          {note}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   BitsLab — small interactive playground. Click bits to toggle the
   two input numbers; watch AND / OR result + popcount update live.
   ═══════════════════════════════════════════════════════════════ */
const WIDTH = 6;
const intToBits = (x) => {
  const bits = [];
  for (let i = WIDTH - 1; i >= 0; i--) bits.push((x >> i) & 1);
  return bits;
};
const bitsToInt = (bits) => bits.reduce((acc, b, i) => acc | (b << (WIDTH - 1 - i)), 0);

const BitRow = ({ bits, color, onToggle, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: 36, fontSize: 11, fontWeight: 600, color, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
    {bits.map((b, i) => (
      <button
        key={i}
        onClick={onToggle ? () => onToggle(i) : undefined}
        disabled={!onToggle}
        style={{
          width: 28, height: 28, borderRadius: 5,
          border: `1px solid ${b ? color : "#cbd5e1"}`,
          background: b ? color : "#fff",
          color: b ? "#fff" : "#94a3b8",
          fontWeight: 700, fontSize: 14,
          fontFamily: "'JetBrains Mono',monospace",
          cursor: onToggle ? "pointer" : "default",
        }}
      >{b}</button>
    ))}
    <span style={{ marginLeft: 8, fontSize: 11, color: "#6b7280", fontFamily: "'JetBrains Mono',monospace" }}>= {bitsToInt(bits)}</span>
  </div>
);

export function BitsLab({ E }) {
  const [a, setA] = useState(0b001110); // 14
  const [b, setB] = useState(0b101010); // 42
  const [op, setOp] = useState("&");
  const aBits = intToBits(a);
  const bBits = intToBits(b);
  const result = op === "&" ? a & b : a | b;
  const resBits = intToBits(result);
  const popcount = resBits.filter(x => x === 1).length;
  const toggleA = (i) => setA(a => a ^ (1 << (WIDTH - 1 - i)));
  const toggleB = (i) => setB(b => b ^ (1 << (WIDTH - 1 - i)));
  return (
    <div style={{
      background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10,
      padding: "10px 12px",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 8, textAlign: "center" }}>
        🧪 {t(E, "Try it — click bits to toggle", "직접 — 비트 클릭해서 켜고 끄기")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
        <BitRow bits={aBits} color="#16a34a" onToggle={toggleA} label="x =" />
        <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          {["&", "|"].map(o => (
            <button key={o} onClick={() => setOp(o)} style={{
              padding: "3px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: `1.5px solid ${op === o ? "#0891b2" : "#cbd5e1"}`,
              background: op === o ? "#cffafe" : "#fff",
              color: op === o ? "#0c4a6e" : "#475569", cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
            }}>{o === "&" ? "& AND" : "| OR"}</button>
          ))}
        </div>
        <BitRow bits={bBits} color="#7c3aed" onToggle={toggleB} label="y =" />
      </div>
      <div style={{ borderTop: "1.5px dashed #cbd5e1", paddingTop: 8 }}>
        <BitRow bits={resBits} color="#dc2626" label={`x ${op} y =`} />
        <div style={{ marginTop: 6, fontSize: 11.5, color: "#475569", textAlign: "center" }}>
          popcount = <b style={{ color: "#dc2626", fontFamily: "'JetBrains Mono',monospace" }}>{popcount}</b> {t(E, "(count of 1s in result)", "(결과에서 1 의 개수)")}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BitmaskColSim — uses the sample chart (D / WD / LWD) to show how
   col[c] is built and how a query (s1, s2) reduces to AND + popcount.
   ═══════════════════════════════════════════════════════════════ */
export function BitmaskColSim({ E }) {
  // For sample N=3, beats: 2→1, 1→3, 3→2
  // col[c] bit i = 1 iff card (i+1) beats card (c+1)
  // col[0] = 0b010 (only card 2 beats card 1)
  // col[1] = 0b100 (only card 3 beats card 2)
  // col[2] = 0b001 (only card 1 beats card 3)
  const cols = [0b010, 0b100, 0b001];
  const [s1, setS1] = useState(0); // card 1
  const [s2, setS2] = useState(0); // card 1 (Game 3)
  const c1 = cols[s1];
  const c2 = cols[s2];
  const andRes = c1 & c2;
  const dom = intToBits(andRes).filter(x => x === 1).length;
  const N = 3;
  const ans = N * N - (N - dom) * (N - dom);
  const ToBits3 = ({ x, color }) => {
    const bits = intToBits(x).slice(WIDTH - 3);
    return (
      <span style={{ display: "inline-flex", gap: 3 }}>
        {bits.map((b, i) => (
          <span key={i} style={{
            width: 22, height: 22,
            border: `1px solid ${b ? color : "#cbd5e1"}`,
            background: b ? color : "#fff",
            color: b ? "#fff" : "#94a3b8",
            borderRadius: 4, fontWeight: 700, fontSize: 12,
            fontFamily: "'JetBrains Mono',monospace",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{b}</span>
        ))}
      </span>
    );
  };
  const cardChip = (n) => {
    const c = SHAPES[n];
    return (
      <button onClick={() => {}} style={{
        display: "inline-flex", alignItems: "center", gap: 3,
        padding: "1px 6px", borderRadius: 5,
        background: "#fff", border: `1.5px solid ${c.color}50`,
        fontWeight: 600, fontSize: 12,
      }}>
        <span style={{ fontSize: 14, color: c.color, lineHeight: 1 }}>{c.glyph}</span>
        {n}
      </button>
    );
  };
  const Picker = ({ value, onChange, label, accent }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: accent, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[0, 1, 2].map(i => {
          const c = SHAPES[i + 1];
          const active = value === i;
          return (
            <button key={i} onClick={() => onChange(i)} style={{
              padding: "2px 8px", borderRadius: 5,
              border: `1.5px solid ${active ? accent : "#cbd5e1"}`,
              background: active ? `${accent}20` : "#fff",
              cursor: "pointer", fontSize: 11, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 2,
            }}>
              <span style={{ fontSize: 13, color: c.color }}>{c.glyph}</span>
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
  return (
    <div style={{
      background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10,
      padding: "10px 12px",
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 8, textAlign: "center" }}>
        🧪 {t(E, "Sim: col[ ] + query", "시뮬: col[ ] 만들기 + 쿼리")}
      </div>

      {/* The col table — fixed for sample */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, color: "#6b7280", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "Built from W/L/D chart:", "W/L/D 차트로 만든 표:")}
        </div>
        {[0, 1, 2].map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, marginBottom: 2 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#475569", minWidth: 50 }}>col[{c}]</span>
            <ToBits3 x={cols[c]} color="#0891b2" />
            <span style={{ fontSize: 10, color: "#6b7280" }}>{t(E, "(card", "(카드")} {c + 1} {t(E, "beaten by:", "이기는 카드:")}
              {" "}
              {intToBits(cols[c]).slice(WIDTH - 3).map((b, i) => b ? <span key={i}>{cardChip(i + 1)}</span> : null).filter(Boolean)}
              )
            </span>
          </div>
        ))}
      </div>

      {/* Query picker */}
      <div style={{ borderTop: "1.5px dashed #cbd5e1", paddingTop: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 10.5, color: "#7f1d1d", fontWeight: 700, marginBottom: 6 }}>
          {t(E, "Pick Elsie's hand (click to change):", "Elsie 패 골라서 (클릭으로 변경):")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Picker value={s1} onChange={setS1} label="s1" accent="#dc2626" />
          <Picker value={s2} onChange={setS2} label="s2" accent="#dc2626" />
        </div>
      </div>

      {/* AND result */}
      <div style={{ borderTop: "1.5px dashed #cbd5e1", paddingTop: 8, fontSize: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#0891b2", minWidth: 80 }}>col[{s1}]</span>
          <ToBits3 x={c1} color="#0891b2" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "#0891b2", minWidth: 80 }}>& col[{s2}]</span>
          <ToBits3 x={c2} color="#0891b2" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4, borderTop: "1px dashed #cbd5e1" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "#dc2626", minWidth: 80 }}>= AND</span>
          <ToBits3 x={andRes} color="#dc2626" />
        </div>
        <div style={{ marginTop: 6, fontSize: 11.5, color: "#475569" }}>
          dom = popcount = <b style={{ color: "#dc2626" }}>{dom}</b>
          {" → "}
          {t(E, "answer = N² − (N−dom)² = ", "답 = N² − (N−dom)² = ")}9 − {(3 - dom) * (3 - dom)} = <b style={{ color: "#15803d" }}>{ans}</b>
        </div>
      </div>
    </div>
  );
}

/* Cumulative code chunks — each section adds one new piece. Student sees
   the program grow line by line, one idea at a time. */
const STEP1_PY = [
  "N, M = map(int, input().split())",
];
const STEP1_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
];

const STEP2_PY = [
  "N, M = map(int, input().split())",
  "",
  "beats = [[False] * N for _ in range(N)]",
];
const STEP2_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  "",
  "    vector<vector<bool>> beats(N, vector<bool>(N, false));",
];

const STEP3_PY = [
  "N, M = map(int, input().split())",
  "",
  "beats = [[False] * N for _ in range(N)]",
  "for i in range(N):",
  "    row = input().strip()",
];
const STEP3_CPP = [
  "// (앞부분 생략)",
  "    vector<vector<bool>> beats(N, vector<bool>(N, false));",
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "    }",
];

const STEP4_PY = [
  "N, M = map(int, input().split())",
  "",
  "beats = [[False] * N for _ in range(N)]",
  "for i in range(N):",
  "    row = input().strip()",
  "    for j in range(i + 1):",
  "        if row[j] == 'W':",
  "            beats[i][j] = True",
  "        elif row[j] == 'L':",
  "            beats[j][i] = True",
];
const STEP4_CPP = [
  "// (앞부분 생략)",
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "        for (int j = 0; j <= i; j++) {",
  "            if (row[j] == 'W') {",
  "                beats[i][j] = true;",
  "            } else if (row[j] == 'L') {",
  "                beats[j][i] = true;",
  "            }",
  "        }",
  "    }",
];

const STEP5_PY = [
  ...STEP4_PY,
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1",
  "    s2 -= 1",
];
const STEP5_CPP = [
  "// (앞부분 생략)",
  "    for (int q = 0; q < M; q++) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--;",
  "        s2--;",
  "    }",
];

/* Brute force inner — natural first try: try every Bessie hand (a, b),
   check if it wins, count. Simple but O(N²) per query. */
const STEP6_PY = [
  ...STEP4_PY,
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1",
  "    s2 -= 1",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            if (beats[a][s1] and beats[a][s2]) or \\",
  "               (beats[b][s1] and beats[b][s2]):",
  "                count += 1",
  "    print(count)",
];
const STEP6_CPP = [
  "// (앞부분 생략)",
  "    for (int q = 0; q < M; q++) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--;",
  "        s2--;",
  "        int count = 0;",
  "        for (int a = 0; a < N; a++) {",
  "            for (int b = 0; b < N; b++) {",
  "                if ((beats[a][s1] && beats[a][s2]) ||",
  "                    (beats[b][s1] && beats[b][s2])) {",
  "                    count++;",
  "                }",
  "            }",
  "        }",
  "        cout << count << '\\n';",
  "    }",
];

/* Smart approach — count dominators (cards beating BOTH Elsie cards) and
   apply formula. Reduces O(M·N²) → O(M·N). Fits the time limit. */
const STEP_SMART_PY = [
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1",
  "    s2 -= 1",
  "",
  "    # Elsie 두 카드 다 이기는 카드 (dom) 개수 — 단일 for, O(N)",
  "    dom = 0",
  "    for c in range(N):",
  "        if beats[c][s1] and beats[c][s2]:",
  "            dom += 1",
  "",
  "    # 답 = 전체 N² - dom 없는 (N-dom)²",
  "    print(N * N - (N - dom) * (N - dom))",
];
const STEP_SMART_CPP = [
  "// (Elsie 패 루프 안)",
  "        // Elsie 두 카드 다 이기는 카드 (dom) — 단일 for",
  "        int dom = 0;",
  "        for (int c = 0; c < N; c++) {",
  "            if (beats[c][s1] && beats[c][s2]) {",
  "                dom++;",
  "            }",
  "        }",
  "        int answer = N * N - (N - dom) * (N - dom);",
  "        cout << answer << '\\n';",
];

/* Python bitmask bonus — col[c] is a Python bigint with bit i set iff
   card i beats card c. dom = popcount(col[s1] & col[s2]) — O(N/64). */
const STEP_BITMASK_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M = map(int, input().split())",
  "",
  "# col[c] = 비트마스크: i 번째 비트 = 카드 i 가 카드 c 이김",
  "col = [0] * N",
  "for i in range(N):",
  "    row = input().strip()",
  "    for j in range(i + 1):",
  "        if row[j] == 'W':",
  "            col[j] |= 1 << i",
  "        elif row[j] == 'L':",
  "            col[i] |= 1 << j",
  "",
  "out = []",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1",
  "    # 두 컬럼 AND → 둘 다 이기는 카드 비트만 남음 → popcount",
  "    dom = bin(col[s1] & col[s2]).count('1')",
  "    out.append(N * N - (N - dom) * (N - dom))",
  "print('\\n'.join(map(str, out)))",
];

export function getHpsSections(E) {
  return [
    {
      label: t(E, "1️⃣ Read N, M", "1️⃣ N, M 읽기"),
      color: "#059669",
      py: STEP1_PY, cpp: STEP1_CPP,
      why: [
        t(E, "First line of input: number of card types and number of Elsie's hands. Two integers — read them and we're done with line 1.",
            "입력 첫 줄: 카드 종류 수, Elsie 패 개수. 정수 두 개 — 읽으면 끝."),
      ],
      aside: <InputAside E={E} highlight={[0]} note={t(E, "First line: N=3, M=3.", "첫 줄: N=3, M=3.")} />,
    },
    {
      label: t(E, "2️⃣ Set up the 'who beats who' table", "2️⃣ '누가 누구 이김' 표 준비"),
      color: "#0891b2",
      py: STEP2_PY, cpp: STEP2_CPP,
      why: [
        t(E, "Before reading the chart, decide HOW to store it. We'll use an N×N table — beats[a][b] = True means card a beats card b.",
            "차트 읽기 전에, 어떻게 저장할지 정해요. N×N 표 — beats[a][b] = True 면 카드 a 가 카드 b 이김."),
        t(E, "Start every cell False (nobody beats anybody yet). We'll fill it in next.",
            "모든 칸 False 로 시작 (아직 아무도 안 이김). 다음 단계에서 채움."),
      ],
      aside: <InputAside E={E} note={t(E, "No input read here — we're just preparing storage.", "아직 입력 안 읽음 — 저장할 자리만 준비.")} />,
    },
    {
      label: t(E, "3️⃣ Read each chart row", "3️⃣ 차트 한 줄씩 읽기"),
      color: "#d97706",
      py: STEP3_PY, cpp: STEP3_CPP,
      why: [
        t(E, "The chart has N lines (the W/L/D triangle). Loop N times, read one line each iteration.",
            "차트는 N 줄 (W/L/D 삼각). N 번 반복하면서 한 줄씩 읽어요."),
        t(E, "Just READ the row for now — we'll save it into beats next step.",
            "지금은 그냥 읽기만 — 표에 저장은 다음 단계.")
      ],
      aside: <InputAside E={E} highlight={[1, 2, 3]} note={t(E, "Lines 2-4: the W/L/D triangle.", "2~4 째 줄: W/L/D 차트.")} />,
    },
    {
      label: t(E, "4️⃣ Save row → beats table", "4️⃣ 읽은 줄을 표에 저장"),
      color: "#dc2626",
      py: STEP4_PY, cpp: STEP4_CPP,
      why: [
        t(E, "Row i has i+1 characters. Walk char by char.",
            "i 행은 i+1 글자. 글자 하나씩 보면서 저장."),
        t(E, "'W' → row card beats column card · 'L' → flip: column card beats row card · 'D' → nobody wins (skip).",
            "'W' → 행 카드가 열 카드 이김 · 'L' → 거꾸로: 열 카드가 행 카드 이김 · 'D' → 아무도 안 이김 (skip)."),
      ],
      aside: <InputAside E={E} highlight={[1, 2, 3]} note={t(E, "Same lines — but now we DECODE each character.", "같은 줄 — 이번엔 글자 하나씩 풀어서 표에 저장.")} />,
    },
    {
      label: t(E, "5️⃣ Read each Elsie hand", "5️⃣ Elsie 패 한 개씩 읽기"),
      color: "#7c3aed",
      py: STEP5_PY, cpp: STEP5_CPP,
      why: [
        t(E, "M more lines, each is one Elsie hand. Loop M times — read 2 numbers per line, convert to 0-indexed (so we can use them as table positions).",
            "남은 M 줄, 각 줄이 Elsie 패 1 개. M 번 반복하면서 2 개 숫자 읽고, 0-based 로 변환 (표 인덱스 로 쓰려고)."),
      ],
      aside: <InputAside E={E} highlight={[4, 5, 6]} note={t(E, "Last M lines: Elsie's hands. Read 2 numbers per line.", "마지막 M 줄: Elsie 패. 한 줄당 숫자 2 개씩.")} />,
    },
    {
      label: t(E, "6️⃣ Brute force: try every (a, b) Bessie hand", "6️⃣ Brute force: 모든 (a, b) Bessie 패 시도"),
      color: "#7c3aed",
      py: STEP6_PY, cpp: STEP6_CPP,
      why: [
        t(E, "Most natural first try: loop over every (a, b) and check if it always wins. Simple to write, easy to verify on the sample.",
            "가장 자연스러운 첫 시도: 모든 (a, b) 짝을 시험해서 무조건 이기는지 확인. 코드 쓰기 쉽고 샘플로 검증 쉬움."),
        t(E, "We'll check this passes the sample → submit → see what happens.",
            "샘플 통과 확인 후 → 제출 → 어떻게 되는지 봐요."),
      ],
    },
    {
      label: t(E, "7️⃣ (Smarter) Count cards that beat both Elsie cards",
                  "7️⃣ (개선) Elsie 두 카드 다 이기는 카드 개수만 세기"),
      color: "#16a34a",
      py: STEP_SMART_PY, cpp: STEP_SMART_CPP,
      why: [
        t(E, "Trying every (a, b) pair is wasteful. We don't actually need to look at pairs.",
            "(a, b) 모든 짝 다 시도하는 건 낭비. 사실 짝을 안 봐도 돼요."),
        t(E, "All we need is: how many cards beat BOTH Elsie cards? Call that count 'dom' (short for 'dominates'). Then we can compute the answer with a formula.",
            "필요한 건 단 하나: Elsie 두 카드 다 이기는 카드가 몇 개? 이 개수를 'dom' 이라고 부를게요. 이거만 알면 답이 공식으로 나옴."),
        t(E, "If dom cards each work on their own, then any Bessie hand with at least one of them wins. Total hands = N², hands with NONE of those cards = (N − dom)². So winning hands = N² − (N − dom)².",
            "이런 카드를 한 장이라도 들면 Bessie 가 이김. 전체 패 = N², 그런 카드가 하나도 없는 패 = (N − dom)². 이기는 패 = N² − (N − dom)²."),
        t(E, "Per query: nested for (N²) → single for over cards (N). Big speedup.",
            "쿼리당: 이중 for (N²) → 카드만 한 번 for (N). 훨씬 빠름."),
      ],
    },
    {
      label: t(E, "8️⃣ Full optimized program", "8️⃣ 완성된 빠른 코드"),
      color: "#16a34a",
      py: HP_FULL_PY, cpp: HP_FULL_CPP,
      why: [
        t(E, "Same input + table code as before; only the per-query inner loop changed (nested → single). Total work: O(M · N) instead of O(M · N²).",
            "입력 + 표 만들기는 그대로; 쿼리당 안쪽 루프만 바뀜 (이중 → 단일). 총 작업 O(M · N²) → O(M · N)."),
      ],
    },
    {
      label: t(E, "9️⃣ (Bonus) Python bitmask trick", "9️⃣ (보너스) Python 비트마스크 트릭"),
      color: "#0891b2",
      py: STEP_BITMASK_PY, cpp: ["// (Python 전용 트릭 — C++ 은 위 코드로 충분)"],
      why: [
        t(E, "Each card column becomes one Python integer (bit i = 'card i beats this column'). dom = popcount(col[s1] AND col[s2]).",
            "각 카드 column 을 Python 정수 1 개로 (i 번째 비트 = 카드 i 가 이 column 의 카드 이김). dom = popcount(col[s1] AND col[s2])."),
        t(E, "Python's built-in bigint AND processes 64 bits at once → per-query work becomes O(N/64) ≈ instant. ~60× faster than the plain O(N) Python.",
            "Python 내장 bigint AND 가 64 비트씩 한 번에 처리 → 쿼리당 작업 O(N/64) ≈ 즉시. 단순 O(N) Python 보다 ~60× 빠름."),
      ],
    },
  ];
}

export function HpsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* HpsFormulaGridSim — 9-패 격자를 '말풍선 스텝'으로 (선생님 2026-07-14: 설명은 볼 것에 붙는 말풍선).
   게임 3 (Elsie 카드1,카드1 · ⚡=카드2 · dom=1): 9칸 → 이기는 패(초록) → 지는 2×2(빨강) → 공식.
   글이 격자 주위에 흩어진 벽을 대체. */
export function HpsFormulaGridSim({ E }) {
  // ⚡ 카드 먼저 → 지는 칸이 오른쪽 아래 2×2 로 모임
  const cards = [{ id: 2, win: true }, { id: 1, win: false }, { id: 3, win: false }];
  const steps = [
    { phase: "test",  bubble: t(E, "Game 3: Elsie holds card 1 & card 1.  Which cards beat card 1?  Card 2 does — nothing else.\nSo the count of 'beats-both' cards = dom = 1.", "게임 3: Elsie 는 카드 1, 카드 1.  카드 1 을 이기는 건? → 카드 2 하나뿐.\n그래서 '둘 다 이기는 카드' 개수 = dom = 1.") },
    { phase: "grid",  bubble: t(E, "Now — Bessie picks 2 cards.  All her choices = 3 × 3 = 9 hands.  How many WIN?  Count in the grid.", "이제 — Bessie 는 카드 2 장을 골라요.  가능한 조합 = 3 × 3 = 9 패.  이 중 이기는 건 몇 개? 격자에서 세봐요.") },
    { phase: "green", bubble: t(E, "If a hand holds card 2 (⚡), Bessie plays it and wins whatever Elsie shows. Green = winning hands.", "패에 카드 2(⚡)가 한 장이라도 있으면 → 그걸 내서 이김 (Elsie 뭘 내든). 초록 = 이기는 패.") },
    { phase: "red",   bubble: t(E, "A hand LOSES only when BOTH cards are non-⚡ → the red 2 × 2 = 4.  (each slot has N − dom = 2 non-⚡ cards → (N − dom)²)", "둘 다 ⚡ 가 아닐 때만 짐 → 빨간 2 × 2 = 4.  (자리마다 ⚡ 아닌 카드 N − dom = 2 가지 → (N − dom)²)") },
    { phase: "count", bubble: t(E, "Wins = whole grid − losers = 9 − 4 = 5!\nIn letters: N² − (N − dom)² = 3² − 2² = 5 ✓", "이기는 패 = 전체 − 지는 것 = 9 − 4 = 5!\n글자로: N² − (N − dom)² = 3² − 2² = 5 ✓") },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const showTest = s.phase === "test";
  const lit = s.phase === "green" || s.phase === "red" || s.phase === "count";
  const litRed = s.phase === "red" || s.phase === "count";

  const cell = (rowWin, colWin, key) => {
    const win = rowWin || colWin;
    const showGreen = lit && win;
    const showRed = litRed && !win;
    return (
      <div key={key} style={{
        width: 48, height: 40, borderRadius: 6,
        background: showGreen ? "#dcfce7" : showRed ? "#fee2e2" : "#f8fafc",
        border: `1.5px solid ${showGreen ? "#86efac" : showRed ? "#fca5a5" : "#e5e7eb"}`,
        color: showGreen ? "#15803d" : showRed ? "#991b1b" : "#cbd5e1",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
        transition: "background .2s, color .2s, border-color .2s",
      }}>{lit ? (win ? "✓" : "✗") : "·"}</div>
    );
  };

  return (
    <div style={{ padding: 12 }}>
      {/* 말풍선 — 격자 바로 위에 붙어 눈이 따라가게 */}
      <div style={{ maxWidth: 480, margin: "0 auto 2px" }}>
        <div style={{
          background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 12,
          padding: "11px 14px", fontSize: 13, color: "#92400e", fontWeight: 600,
          lineHeight: 1.6, textAlign: "center", wordBreak: "keep-all", whiteSpace: "pre-line",
          boxShadow: "0 4px 14px rgba(0,0,0,.07)",
        }}>💬 {s.bubble}</div>
        <div style={{ width: 0, height: 0, margin: "0 auto",
          borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
          borderTop: "10px solid #fbbf24" }} />
      </div>

      {showTest ? (
        /* 카드 시험 — 카드 1·2·3 각각 Elsie 의 카드 1 을 이기나? (카드 2 만 ✓ → dom=1 을 눈으로) */
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 8, wordBreak: "keep-all" }}>
            {t(E, "Test each card against Elsie's card 1:", "각 카드가 Elsie 의 카드 1 을 이기나?")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { id: 1, ok: false, label: t(E, "draws with card 1", "카드 1 과 비김") },
              { id: 2, ok: true,  label: t(E, "BEATS card 1", "카드 1 이김") },
              { id: 3, ok: false, label: t(E, "loses to card 1", "카드 1 에 짐") },
            ].map(c => (
              <div key={c.id} style={{
                width: 118, textAlign: "center",
                background: c.ok ? "#dcfce7" : "#f8fafc",
                border: `1.5px solid ${c.ok ? "#86efac" : "#e5e7eb"}`,
                borderRadius: 10, padding: "12px 8px",
                boxShadow: c.ok ? "0 3px 12px rgba(22,163,74,.18)" : "none",
              }}>
                <div style={{ fontSize: 26, color: SHAPES[c.id]?.color, lineHeight: 1 }}>{SHAPES[c.id]?.glyph}</div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: c.ok ? "#15803d" : "#6b7280", marginTop: 4 }}>
                  {t(E, `card ${c.id}`, `카드 ${c.id}`)} {c.ok ? "⚡" : ""}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: c.ok ? "#15803d" : "#9ca3af", marginTop: 3, wordBreak: "keep-all" }}>
                  {c.ok ? "✓ " : "✗ "}{c.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: "#c2410c", marginTop: 12 }}>
            {t(E, "→ only card 2 beats both → dom = 1", "→ 카드 2 하나뿐 → dom = 1")}
          </div>
        </div>
      ) : (
        <>
          {/* 격자 */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 4, marginLeft: 56 }}>
                {cards.map(c => (
                  <div key={`h-${c.id}`} style={{ width: 48, textAlign: "center", fontSize: 11, fontWeight: 600, color: c.win ? "#15803d" : "#9ca3af" }}>
                    {t(E, `card ${c.id}`, `카드 ${c.id}`)}{c.win ? " ⚡" : ""}
                  </div>
                ))}
              </div>
              {cards.map(rowCard => (
                <div key={`r-${rowCard.id}`} style={{ display: "flex", gap: 4, marginTop: 4, alignItems: "center" }}>
                  <div style={{ width: 52, fontSize: 11, fontWeight: 600, textAlign: "right", paddingRight: 4, color: rowCard.win ? "#15803d" : "#9ca3af" }}>
                    {t(E, `card ${rowCard.id}`, `카드 ${rowCard.id}`)}{rowCard.win ? " ⚡" : ""}
                  </div>
                  {cards.map(colCard => cell(rowCard.win, colCard.win, `${rowCard.id}-${colCard.id}`))}
                </div>
              ))}
              {litRed && (
                <div style={{ position: "absolute", left: 56 + (48 + 4) - 4, top: (16 + 4) + (40 + 4) - 4, width: 2 * 48 + 4 + 8, height: 2 * 40 + 4 + 8, border: "2px dashed #dc2626", borderRadius: 10, pointerEvents: "none" }} />
              )}
            </div>
          </div>
          <div style={{ fontSize: 10.5, color: C.dim, textAlign: "center", marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "↓ rows = Bessie's 1st card   ·   → cols = 2nd card", "↓ 행 = Bessie 첫 카드   ·   → 열 = 둘째 카드")}
          </div>
        </>
      )}

      <div style={{ marginTop: 12 }}>
        <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent="#d97706" isEn={E} showLabels />
      </div>
    </div>
  );
}

/* CodeSectionView — renders ONE section from getHpsSections in the
   same visual style as ProgressiveCodeStepper but without the dot
   selector. Used so each section can be its own chapter step (single
   level of navigation: chapter prev/next). */
export function CodeSectionView({ section: s, lang = "py", E }) {
  const code = lang === "py" ? s.py : s.cpp;
  const langSpecific = lang === "py" ? s.pyOnly ?? [] : s.cppOnly ?? [];
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const [copied, setCopied] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be blocked in some embeds — silently ignore
    }
  };
  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {s.aside && (
          <button onClick={() => setShowAside((v) => !v)} style={{
            fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 7,
            border: `1.5px solid ${s.color}`, cursor: "pointer",
            background: showAside ? s.color : "#fff", color: showAside ? "#fff" : s.color,
          }}>📥 {t(E, "Sample input", "샘플 입력")}</button>
        )}
        <span style={{ fontSize: 10.5, color: "#6b7280", fontWeight: 700 }}>{langLabel}</span>
      </div>
      <div style={{
        marginBottom: 14,
        display: s.aside && showAside ? "grid" : "block",
        gridTemplateColumns: s.aside && showAside ? "minmax(0, 1fr) minmax(200px, 280px)" : undefined,
        gap: s.aside && showAside ? 20 : 0,
      }}>
        <div>
          <div style={{
            background: s.color, color: "#fff",
            padding: "8px 14px", borderRadius: "10px 10px 0 0",
            fontSize: 14, fontWeight: 600,
          }}>{s.label}</div>
          <div style={{
            background: "#fff", border: "1.5px solid #e5e7eb",
            borderTop: "none", padding: "10px 12px",
          }}>
            {s.why && s.why.length > 0 && (
              <>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>
                  💡 {t(E, "Why this way?", "왜 이렇게?")}
                </div>
                {s.why.map((line, j) => (
                  <div key={j} style={{ fontSize: 12.5, color: "#1f2937", lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                    <span style={{ color: s.color, fontWeight: 600, flexShrink: 0 }}>•</span>
                    <span>{line}</span>
                  </div>
                ))}
              </>
            )}
            {langSpecific.length > 0 && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>
                  {langLabel} {t(E, "specific:", "전용:")}
                </div>
                {langSpecific.map((line, j) => (
                  <div key={j} style={{ fontSize: 12.5, color: "#1f2937", lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                    <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 600, flexShrink: 0 }}>▸</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: "relative", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
            <button
              onClick={handleCopy}
              style={{
                position: "absolute", top: 8, right: 8, zIndex: 2,
                fontSize: 11, fontWeight: 700,
                padding: "4px 10px", borderRadius: 6,
                border: `1px solid ${copied ? "#16a34a" : "rgba(255,255,255,0.3)"}`,
                background: copied ? "rgba(22,163,74,0.85)" : "rgba(255,255,255,0.1)",
                color: copied ? "#fff" : "#cbd5e1",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
              title={t(E, "Copy code", "코드 복사")}
            >
              {copied ? `✓ ${t(E, "copied", "복사됨")}` : `📋 ${t(E, "copy", "복사")}`}
            </button>
            <CodeBlock lines={code} lang={lang} />
          </div>
        </div>
        {s.aside && showAside && <div>{s.aside}</div>}
      </div>
    </div>
  );
}

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadHpsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "HPS Minus One — Full Study Guide", "✊ HPS Minus One — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
