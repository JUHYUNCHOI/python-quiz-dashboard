import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAcowdemia3Sections } from "./components";

/* ================================================================
   Deep-audit sim: scan every grass cell, count adjacent cows.
   Highlights grass cells that mediate a friendship (cows >= 2).
   ================================================================ */
function DeepAuditSim({ E }) {
  const grid = [
    "CGC",
    "GCG",
    "CGC",
  ];
  const R = grid.length, C_ = grid[0].length;
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  const cells = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C_; c++) cells.push({ r, c, ch: grid[r][c] });
  }
  const [idx, setIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const cur = idx >= 0 && idx < cells.length ? cells[idx] : null;

  const adjCowCount = (r, c) => {
    let n = 0;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= R || nc < 0 || nc >= C_) continue;
      if (grid[nr][nc] === "C") n++;
    }
    return n;
  };

  let friendshipsSoFar = 0;
  const flagged = new Set();
  for (let i = 0; i <= idx && i < cells.length; i++) {
    const { r, c, ch } = cells[i];
    if (ch !== "G") continue;
    if (adjCowCount(r, c) >= 2) { friendshipsSoFar++; flagged.add(`${r},${c}`); }
  }

  const step = () => {
    setRunning(false);
    setIdx(prev => Math.min(prev + 1, cells.length));
  };
  const reset = () => { setRunning(false); setIdx(-1); };
  const runAll = () => {
    setRunning(true);
    let i = idx;
    const tick = () => {
      i++;
      setIdx(i);
      if (i < cells.length - 1) setTimeout(tick, 350);
      else setRunning(false);
    };
    setTimeout(tick, 250);
  };

  const adjOf = (r, c) => dirs
    .map(([dr, dc]) => [r + dr, c + dc])
    .filter(([nr, nc]) => nr >= 0 && nr < R && nc >= 0 && nc < C_);

  const isAdjToCur = (r, c) => {
    if (!cur || cur.ch !== "G") return false;
    return adjOf(cur.r, cur.c).some(([nr, nc]) => nr === r && nc === c);
  };

  const cellSize = 56;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
          🔎 {t(E, "Deep-audit each grass cell", "풀 칸 한 개씩 깊이 점검")}
        </div>
        <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.55 }}>
          {t(E,
            "Scan left-to-right, top-to-bottom. For every G cell, count its 4-direction cow neighbors. If that count is ≥ 2, this grass cell mediates exactly one friendship.",
            "왼→오, 위→아래로 스캔. 각 G 칸마다 상하좌우 소 이웃을 세요. 2 이상이면 그 풀 칸이 우정 1쌍을 정확히 중재해요.")}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateRows: `repeat(${R}, ${cellSize}px)`, gap: 4 }}>
          {grid.map((row, r) => (
            <div key={r} style={{ display: "grid", gridTemplateColumns: `repeat(${C_}, ${cellSize}px)`, gap: 4 }}>
              {row.split("").map((ch, c) => {
                const isCur = cur && cur.r === r && cur.c === c;
                const isAdj = isAdjToCur(r, c);
                const flag = flagged.has(`${r},${c}`);
                const isCow = ch === "C";
                let bg = isCow ? "#fef3c7" : "#dcfce7";
                let border = isCow ? "#f59e0b" : "#22c55e";
                if (flag) { bg = "#fce7f3"; border = "#db2777"; }
                if (isCur) { bg = isCow ? "#fde68a" : "#bbf7d0"; border = "#059669"; }
                if (isAdj && isCow) { bg = "#fcd34d"; border = "#d97706"; }
                return (
                  <div key={c} style={{
                    width: cellSize, height: cellSize, borderRadius: 8,
                    background: bg, border: `2.5px solid ${border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, fontWeight: 800, color: isCow ? "#92400e" : "#065f46",
                    transition: "all .25s",
                    boxShadow: isCur ? `0 0 0 3px ${border}40` : "none",
                  }}>
                    {isCow ? "🐄" : "🌱"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={step} disabled={running || idx >= cells.length - 1} style={{
          padding: "6px 14px", borderRadius: 8, border: "1.5px solid #059669",
          background: "#fff", color: "#059669", fontWeight: 700, fontSize: 12,
          cursor: running || idx >= cells.length - 1 ? "not-allowed" : "pointer",
          opacity: running || idx >= cells.length - 1 ? 0.5 : 1,
        }}>{t(E, "Step ▶", "한 칸 ▶")}</button>
        <button onClick={runAll} disabled={running || idx >= cells.length - 1} style={{
          padding: "6px 14px", borderRadius: 8, border: "1.5px solid #059669",
          background: "#059669", color: "#fff", fontWeight: 700, fontSize: 12,
          cursor: running || idx >= cells.length - 1 ? "not-allowed" : "pointer",
          opacity: running || idx >= cells.length - 1 ? 0.5 : 1,
        }}>{t(E, "Run all ⏩", "전부 실행 ⏩")}</button>
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 8, border: "1.5px solid #94a3b8",
          background: "#fff", color: "#475569", fontWeight: 700, fontSize: 12, cursor: "pointer",
        }}>{t(E, "Reset", "초기화")}</button>
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.6 }}>
        {cur ? (
          <>
            <div>
              <b style={{ color: "#059669" }}>{t(E, "Now visiting", "지금 방문")}:</b>{" "}
              ({cur.r}, {cur.c}) = <code style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: 4 }}>{cur.ch}</code>
            </div>
            {cur.ch === "G" ? (
              <>
                <div style={{ marginTop: 4 }}>
                  {t(E, "Adjacent cows", "인접한 소")}: <b>{adjCowCount(cur.r, cur.c)}</b>
                  {adjCowCount(cur.r, cur.c) >= 2
                    ? <span style={{ color: "#db2777", fontWeight: 700 }}> {t(E, "→ +1 friendship 💞", "→ 우정 +1 💞")}</span>
                    : <span style={{ color: "#64748b" }}> {t(E, "→ no friendship", "→ 우정 없음")}</span>}
                </div>
              </>
            ) : (
              <div style={{ marginTop: 4, color: "#64748b" }}>
                {t(E, "Skip — only grass cells can mediate friendships.", "건너뜀 — 풀 칸만 우정을 중재.")}
              </div>
            )}
          </>
        ) : (
          <div style={{ color: "#64748b" }}>
            {t(E, "Press Step ▶ or Run all ⏩ to begin the audit.", "한 칸 ▶ 또는 전부 실행 ⏩ 을 눌러 점검을 시작.")}
          </div>
        )}
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #cbd5e1" }}>
          <b style={{ color: "#059669" }}>{t(E, "Friendships so far", "지금까지 우정")}:</b>{" "}
          <span style={{ fontSize: 16, fontWeight: 800, color: "#db2777" }}>{friendshipsSoFar}</span>
          {idx >= cells.length - 1 && (
            <span style={{ marginLeft: 8, color: "#059669", fontWeight: 700 }}>
              ✓ {t(E, "audit complete", "점검 완료")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "R, C = map(int, input().split())",
  "grid = [input() for _ in range(R)]",
  "",
  "# Each grass cell can mediate at most one friendship.",
  "# A grass cell with >= 2 adjacent cows mediates exactly one friendship.",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "ans = 0",
  "for r in range(R):",
  "    for c in range(C):",
  "        if grid[r][c] != 'G':",
  "            continue",
  "        cows = sum(",
  "            1 for dr, dc in dirs",
  "            if 0 <= r+dr < R and 0 <= c+dc < C and grid[r+dr][c+dc] == 'C'",
  "        )",
  "        if cows >= 2:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "On a grid, every cell is either a cow (C) or grass (G). Two cows become friends through a SHARED grass cell adjacent to both (up/down/left/right).\nEach grass cell can mediate AT MOST ONE friendship. Print the maximum number of friendships possible.",
        "격자 위 각 칸은 소 (C) 또는 풀 (G) 이에요. 두 소 모두에게 상하좌우로 인접한 풀 칸이 있으면 그 풀 칸을 통해 두 소가 친구가 될 수 있어요.\n단, 풀 칸 하나는 최대 한 쌍의 우정만 중재해요. 만들 수 있는 우정의 최대 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Acowdemia III</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Print the maximum number of cow friendships that can be formed through shared adjacent grass cells.",
                "공유된 인접 풀 칸을 통해 만들 수 있는 소들 사이 우정의 최대 개수를 출력해요.")}
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
                  {t(E, "A grid where each cell is ", "각 칸이 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>C</code>
                  {t(E, " (cow) or ", " (소) 또는 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>G</code>
                  {t(E, " (grass).", " (풀) 인 격자가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two cows become ", "두 소가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "friends through a shared grass cell", "공유된 풀 칸을 통해 친구")}</b>
                  {t(E, " adjacent to both (up/down/left/right).",
                        " 가 돼요 (그 풀이 두 소 모두에게 상하좌우로 인접).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each grass cell ", "각 풀 칸은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "mediates at most ONE friendship", "최대 1쌍의 우정만 중재")}</b>
                  {t(E, ".", " 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum number of friendships", "만들 수 있는 우정의 최대 개수")}</b>
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
        "If 2 cows are both adjacent to 1 grass cell, what is the maximum number of friendships?", "2마리의 소가 모두 1개의 풀 칸에 인접하면, 최대 우정 수는?"),
      question: t(E,
        "2 cows adjacent to 1 grass cell. Max friendships?",
        "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
      ],
      correct: 1,
      explain: t(E,
        "The 2 cows can become friends through the shared grass cell. That grass cell is used up, so max = 1.",
        "2마리 소가 공유 풀 칸을 통해 친구가 될 수 있어요. 그 풀 칸은 사용되어 최대 = 1."),
    },
    // 1-3: Deep-audit sim
    {
      type: "reveal",
      narr: t(E,
        "Let's audit a 3×3 board cell-by-cell. We will visit every cell, and for each grass (G) cell count its 4-direction cow neighbors. Cells with ≥2 cow neighbors mediate exactly one friendship.",
        "3×3 보드를 한 칸씩 점검해봐요. 모든 칸을 방문해서, 풀 (G) 칸이면 상하좌우 소 이웃 수를 세요. 2 이상이면 우정 1쌍을 정확히 중재."),
      content: <DeepAuditSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "2 cows adjacent to 1 grass cell. How many friendships at most?", "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      question: t(E,
        "2 cows, 1 shared grass cell. Max friendships?",
        "소 2마리, 공유 풀 칸 1개. 최대 우정 수?"),
      hint: t(E,
        "Each grass cell mediates exactly one friendship between two adjacent cows.",
        "각 풀 칸은 인접한 두 소 사이의 정확히 하나의 우정을 중재."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Greedy: scan grass cells left-to-right, top-to-bottom. For each grass cell, find pairs of cows it could connect (its 2 adjacent cow cells). If both cows are still 'free' (haven't been paired yet), match them and increment count. Sections build it one piece at a time.",
        "그리디: 풀 칸을 왼→오, 위→아래로 스캔. 각 풀 칸마다 연결할 수 있는 소 쌍 (인접한 2 마리 소) 을 찾아요. 두 소가 아직 짝이 없으면 매칭하고 카운트 증가. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getAcowdemia3Sections(E),
    },
  ];
}
