import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getAstralSections, AstralComposite, AstralChainDiscovery, AstralAlgoTrace, AstralDpSim } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

/* ── 클릭형 줄 시뮬레이터 ──────────────────────────────────────
   stepData: Array<{ cells: {letter,star,active}[], note: string, result?: string, ok?: boolean }>
   ─────────────────────────────────────────────────────────── */
function ChainStepSim({ stepData }) {
  const [si, setSi] = useState(0);
  const cur = stepData[si];
  const isFirst = si === 0;
  const isLast = si === stepData.length - 1;

  const btn = (disabled, label, onClick) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "5px 16px", borderRadius: 7, border: "none",
      fontSize: 12, fontWeight: 700,
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#f1f5f9" : "#3b82f6",
      color: disabled ? "#94a3b8" : "#fff",
    }}>{label}</button>
  );

  return (
    <div>
      {/* Cells */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, marginTop: 4 }}>
        {cur.cells.map((c, i) => (
          <div key={i} style={{
            width: 40, height: 50, borderRadius: 8, position: "relative",
            border: `2.5px solid ${c.active ? "#3b82f6" : c.star ? "#d97706" : "#e2e8f0"}`,
            background: c.active ? "#dbeafe" : c.star ? "#fef9c3" : "#f8fafc",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s, border-color 0.15s",
          }}>
            {c.star && (
              <div style={{ position: "absolute", top: -11, fontSize: 15, color: "#d97706", fontWeight: 800 }}>★</div>
            )}
            <div style={{ fontSize: 15, fontWeight: 800, color: c.active ? "#1e40af" : c.star ? "#92400e" : "#94a3b8" }}>
              {c.letter}
            </div>
            <div style={{ fontSize: 9.5, color: "#94a3b8", lineHeight: 1 }}>({i})</div>
          </div>
        ))}
      </div>
      {/* Step note */}
      <div style={{
        fontSize: 12, color: "#374151", textAlign: "center",
        minHeight: 38, lineHeight: 1.55, marginBottom: 8,
        padding: "7px 12px", background: "#f8fafc", borderRadius: 7,
        border: "1px solid #e2e8f0",
      }}>
        {cur.note}
      </div>
      {/* Result badge on last step */}
      {isLast && cur.result && (
        <div style={{
          borderRadius: 7, padding: "5px 10px", textAlign: "center", marginBottom: 8,
          background: cur.ok ? "#dcfce7" : "#fee2e2",
          border: `1.5px solid ${cur.ok ? "#86efac" : "#fca5a5"}`,
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: cur.ok ? "#15803d" : "#b91c1c" }}>
            {cur.result}
          </span>
        </div>
      )}
      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        {btn(isFirst, "◀ 이전", () => setSi(s => Math.max(0, s - 1)))}
        <span style={{ fontSize: 11, color: "#64748b", minWidth: 44, textAlign: "center" }}>
          {si + 1} / {stepData.length}
        </span>
        {btn(isLast, "다음 ▶", () => setSi(s => Math.min(stepData.length - 1, s + 1)))}
      </div>
    </div>
  );
}

export function makeAstralCh1(E) {
  return [
    /* 1-0 — Hook: visual story first (before any formal text). */
    {
      type: "reveal",
      narr: t(E,
        "First, watch ONE star move between two photos. Bessie the cow took a night-sky photo, waited, then took another. Stars either disappear OR slide right/down by a fixed amount. Try the toggles — see what the COMPOSITE looks like.",
        "먼저 그림으로 봐요. 별 한 개가 두 사진 사이에서 어떻게 움직이는지. Bessie 라는 소가 밤하늘을 두 번 찍었어요. 별은 사라지거나, 정해진 만큼 오른쪽·아래로 슬쩍 이동. 아래 토글 눌러보면서 합성이 어떻게 만들어지는지 봐요."),
      content: (
        <div>
          <div style={{ padding: "12px 16px 0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 2 }}>🔭🐄</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4f46e5" }}>
              {t(E, "Bessie's two telescope photos", "Bessie 의 두 망원경 사진")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Toggle ★ move/disappear, switch (right, down) presets",
                    "★ 이동/사라짐 토글, (오른쪽, 아래) 프리셋 변경 가능")}
            </div>
          </div>
          <AstralChainDiscovery E={E} />
        </div>
      ),
    },

    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Now the formal rules. We see the COMPOSITE (the merged picture): W (empty in both photos), G (star in exactly one), B (star in both). Find the minimum stars in the original photo, or -1 if impossible.",
        "이제 정확한 규칙. 합성 (두 사진 합친 그림) 의 각 칸: W (둘 다 없음), G (한 사진에만), B (둘 다). 처음 사진에 별이 가장 적게 몇 개인지 답으로 써요, 안 되면 -1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#4f46e5" }}>Astral Superposition</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #4f46e5", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#312e81", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#312e81", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum stars in the original photo that match the composite — or -1 if no consistent original exists.",
                "합친 그림과 맞아떨어지는 원본 사진의 별 가장 적은 개수를 답으로 — 맞는 원본이 없으면 -1.")}
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#312e81", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "Bessie took two photos of an N×N sky. Between the two photos, each star EITHER disappeared OR moved by a fixed amount (right by 'right' cells and down by 'down' cells). Stars that move off the grid are lost. The two photos are combined into one composite:",
                    "Bessie 가 N×N 하늘을 두 번 찍음. 두 사진 사이에 별마다 사라지거나, 정해진 만큼 오른쪽과 아래로 이동. 화면 밖으로 나간 별은 사라짐. 두 사진을 합쳐서:")}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14, border: "1px solid #cbd5e1" }}>W</code>
                {t(E, " — empty in BOTH photos.", " — 둘 다 비어있음.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #94a3b8", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#cbd5e1", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>G</code>
                {t(E, " — star in EXACTLY ONE photo.", " — 정확히 한 사진에만.")}
              </div>
              <div style={{ background: "#fff", border: "1px solid #475569", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                <code style={{ background: "#1e293b", color: "#fff", padding: "2px 8px", borderRadius: 3, fontWeight: 600, fontSize: 14 }}>B</code>
                {t(E, " — star in BOTH photos.", " — 두 사진 모두.")}
              </div>
            </div>

            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, padding: "8px 10px", background: "#fff", border: "1.5px solid #a5b4fc", borderRadius: 8 }}>
              <b style={{ color: "#312e81" }}>{t(E, "Goal", "목표")}:</b>{" "}
              {t(E, "Print the MINIMUM number of stars in the FIRST photo (the original sky) consistent with the composite. If no consistent assignment exists, print -1.",
                    "합친 그림과 맞아떨어지는 첫 사진 (원래 하늘) 의 별 가장 적은 개수를 답으로. 맞는 배치가 없으면 -1.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}</b> {t(E, "(N = grid size, T = # of puzzles)", "(N = 사진 크기, T = 퍼즐 개수)")}:{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 1000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ right, down ≤ N</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 1000</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample 1 (A=B=0). */
    {
      type: "reveal",
      narr: t(E,
        "Sample 1: stars don't move at all (right=0, down=0). Each G is a star that disappeared, each B is a star that stayed. So min stars = (G count) + (B count) = 7.",
        "샘플 1: 별이 아예 안 움직임 (right=0, down=0). G 는 사라진 별, B 는 그대로 있는 별. 별 가장 적게 = G 칸 수 + B 칸 수 = 7."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#4f46e5", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — right = down = 0 (stars don't move)", "샘플 1 — right = down = 0 (별이 안 움직임)")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`1
3 0 0
WWB
BBB
GGG`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`7`}
              </div>
            </div>
          </div>

          <div style={{ background: "#eef2ff", border: "1px solid #a5b4fc", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.65 }}>
            <div style={{ fontWeight: 600, color: "#312e81", marginBottom: 6 }}>
              🔍 {t(E, "Why so simple when stars don't move?", "별이 안 움직이면 왜 이렇게 간단할까?")}
            </div>
            <div>
              {t(E, "If a star doesn't move, photo 2 looks the SAME as photo 1. So:",
                    "별이 안 움직이면 사진 2 가 사진 1 이랑 똑같아요. 그래서:")}
            </div>
            <div style={{ marginTop: 6, lineHeight: 1.7 }}>
              • <b>W</b> = {t(E, "no star in either photo", "두 사진 다 비어")} → 0 stars<br/>
              • <b>G</b> = {t(E, "star showed up in only ONE of the photos — must be a star that disappeared",
                                "한 사진에만 보였음 → 사라진 별")} → 1 star<br/>
              • <b>B</b> = {t(E, "star in both photos — star stayed", "두 사진 다 별 → 그대로 있던 별")} → 1 star
            </div>
            <div style={{ marginTop: 8, color: "#15803d", fontWeight: 700 }}>
              {t(E, "So min stars = (G count) + (B count) = 3 + 4 = 7.",
                    "그래서 별 가장 적게 = G 칸 수 + B 칸 수 = 3 + 4 = 7.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3.4a — Visual: corner G has no incoming source */
    {
      type: "reveal",
      narr: t(E,
        "Look — corner cell (0,0) is G. Star moves: right 1, down 1. For a star to arrive HERE, it would have come from up 1, left 1 = (-1,-1). That's outside the grid — no star can ever arrive at (0,0).",
        "봐요 — 모서리 칸 (0,0) 이 G. 별 이동: 오른쪽 1, 아래 1. 별이 여기로 들어오려면 위 1, 왼쪽 1 = (-1,-1) 에서 와야 해요. 근데 그건 사진 밖. 그래서 (0,0) 에 별이 들어올 길 자체가 없어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📍 {t(E, "Corner G — predecessor off-grid", "모서리 G — 이전 칸 사진 밖")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Star moves: right 1, down 1. The dashed cell is outside the grid.",
                    "별 이동: 오른쪽 1, 아래 1. 점선 칸은 사진 밖.")}
            </div>
          </div>

          {/* 4x4 layout: phantom (-1,-1) at top-left + real 3x3 grid bottom-right */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 56px)", gridTemplateRows: "repeat(4, 56px)", gap: 4 }}>
              {/* Row -1: phantom (-1,-1) + empty */}
              <div style={{ background: "#fee2e2", border: "2px dashed #dc2626", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#991b1b", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>❌</div>
                <div style={{ fontSize: 9, marginTop: 2 }}>(-1,-1)</div>
              </div>
              <div></div><div></div><div></div>
              {/* Row 0 */}
              <div></div>
              <div style={{ background: "#cbd5e1", border: "2.5px solid #4f46e5", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#1e293b", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
                <div style={{ fontSize: 18 }}>G</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 1 }}>(0,0)</div>
              </div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(0,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(0,2)</div>
              {/* Row 1 */}
              <div></div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,0)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(1,2)</div>
              {/* Row 2 */}
              <div></div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,0)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,1)</div>
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>(2,2)</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, color: "#92400e", fontWeight: 600, lineHeight: 1.6, textAlign: "center" }}>
              {t(E,
                "For a star to ARRIVE at (0,0), it would have come from (-1,-1) — but that cell is OUTSIDE the grid. So no star can arrive here.",
                "(0,0) 에 별이 들어오려면 (-1,-1) 에서 와야 했어요 — 근데 그 칸은 사진 밖. 그래서 별이 못 들어와요.")}
            </div>
          </div>

          {/* ✅ The only remaining possibility — shown as two photos taken at different times */}
          <div style={{ background: "#f0fdf4", border: "2px solid #16a34a", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#14532d", marginBottom: 12, textAlign: "center" }}>
              ✅ {t(E, "Then the ONLY story that fits:",
                       "그럼 가능한 단 하나의 이야기:")}
            </div>

            {/* Two photos taken at different times → composite */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {/* Photo 1 */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
                  📷 {t(E, "Photo 1 (first)", "사진 1 (먼저 찍음)")}
                </div>
                <div style={{ width: 54, height: 54, background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#d97706", fontWeight: 800 }}>★</div>
                <div style={{ fontSize: 10, color: "#92400e", marginTop: 3, fontWeight: 700 }}>{t(E, "star at (0,0)", "(0,0) 에 별")}</div>
              </div>

              {/* Time arrow */}
              <div style={{ textAlign: "center", padding: "0 4px" }}>
                <div style={{ fontSize: 18, color: "#15803d", fontWeight: 800 }}>⏰</div>
                <div style={{ fontSize: 10, color: "#15803d", fontWeight: 700 }}>{t(E, "time passes", "시간 지남")}</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>{t(E, "(star leaves: moved or vanished)", "(별이 떠남: 이동했거나 사라짐)")}</div>
              </div>

              {/* Photo 2 */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
                  📷 {t(E, "Photo 2 (later)", "사진 2 (나중에 찍음)")}
                </div>
                <div style={{ width: 54, height: 54, background: "#fff", border: `2px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}></div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 3, fontWeight: 700 }}>{t(E, "(0,0) empty", "(0,0) 비어있음")}</div>
              </div>

              <div style={{ fontSize: 22, color: "#15803d", fontWeight: 800, padding: "0 4px" }}>=</div>

              {/* Composite */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, marginBottom: 4 }}>{t(E, "Composite", "합성 (둘 합침)")}</div>
                <div style={{ width: 54, height: 54, background: "#cbd5e1", border: "2.5px solid #16a34a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#1e293b", fontWeight: 800 }}>G</div>
                <div style={{ fontSize: 10, color: "#15803d", marginTop: 3, fontWeight: 700 }}>{t(E, "star in 1 photo only", "한 사진에만 별")}</div>
              </div>
            </div>

            <div style={{ background: "#dcfce7", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: "#14532d", textAlign: "center", lineHeight: 1.55 }}>
              💡 <b>{t(E,
                "(0,0) is G → an original star WAS here, but it left before photo 2.  → count this star: +1.",
                "(0,0) 가 G → 원래 별이 있었는데 사진 2 찍기 전에 떠남.  → 이 별 1 개 셈: +1.")}</b>
            </div>
          </div>
        </div>
      ),
    },

    /* 1-3.4 — Off-grid insight: G at the corner forces case (a) */
    {
      type: "quiz",
      narr: t(E,
        "You just saw: this corner cell has nothing up-left of it. So a star couldn't have come from there. Lock it in.",
        "방금 봤죠: 이 모서리 칸은 왼쪽 위에 아무 칸도 없어요. 그러니까 거기서 별이 들어올 수가 없어요. 다시 한 번 확인."),
      question: t(E,
        "The corner cell is G, but no star could come from up-left (no cell there). So how did this become G?",
        "모서리 칸이 G 인데, 왼쪽 위에 칸이 없어서 별이 들어올 수가 없어요. 그럼 어떻게 G 가 됐을까요?"),
      options: [
        t(E, "A star was here at the start, then left.",
            "처음부터 이 칸에 별이 있었는데, 떠난 거."),
        t(E, "A star came from outside the grid.",
            "사진 밖에서 별이 들어옴."),
        t(E, "Impossible — this corner can't be G.",
            "불가능 — 이 모서리는 G 가 될 수 없어."),
      ],
      correct: 0,
      explain: t(E,
        "Yes! No star could come from outside the grid — so the ONLY way is a star was here at the start, then left.",
        "맞아요! 사진 밖에서 별이 들어올 수가 없으니까 — 가능한 건 처음부터 별이 있었다가 떠난 경우 뿐이에요."),
    },

    /* 1-2.5 — Algorithm sim FIRST: see the whole picture (moved from Ch2) */
    {
      type: "reveal",
      narr: t(E,
        "This sim DRAWS ★ on cells where stars exist — that's the answer we're computing. Cells on the SAME line (the line a star travels along) share a background color = one star's path. Different lines don't interact, so we can solve each line alone. ▶ Press start.",
        "이 시뮬은 별이 있는 칸에 ★ 를 그려줘요 — 그게 우리가 구하려는 답. 한 별이 지나는 같은 줄 위 칸들은 배경 색도 같음 = 한 별의 길. 줄끼리 서로 영향 X → 한 줄씩 따로 풀 수 있어요. ▶ 시작 눌러봐요."),
      content: (<AstralAlgoTrace E={E} />),
    },

    /* 1-2.6 — Visual summary: 5 scenes (W, G×2, B×2) using actual cell graphics */
    {
      type: "reveal",
      narr: t(E,
        "Five possible scenes — one peek and you know.",
        "다섯 가지 장면. 한번 보면 머리에 들어와."),
      content: (() => {
        // Reusable mini cell graphic — same look as the sim
        const Cell = ({ letter, hasStar, outside, dim, label }) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 7,
              background: outside ? "transparent" : (dim ? "#f1f5f9" : "#fff"),
              border: outside ? "2px dashed #cbd5e1" : `2px solid ${letter === "B" ? "#1e293b" : letter === "G" ? "#a78bfa" : "#cbd5e1"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {outside ? (
                <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>밖</div>
              ) : (
                <>
                  {hasStar && <div style={{ fontSize: 18, lineHeight: 1, color: "#d97706", fontWeight: 900 }}>★</div>}
                  {!hasStar && letter && <div style={{ fontSize: 14, fontWeight: 800, color: dim ? "#94a3b8" : "#475569", lineHeight: 1 }}>{letter}</div>}
                  {!hasStar && !letter && <div style={{ fontSize: 14, color: "#cbd5e1" }}>·</div>}
                </>
              )}
            </div>
            {label && <div style={{ fontSize: 9.5, color: "#64748b", fontWeight: 600 }}>{label}</div>}
          </div>
        );

        const Arrow = () => (
          <div style={{ fontSize: 18, color: "#94a3b8", margin: "0 4px", marginTop: -10 }}>↖</div>
        );

        const SceneRow = ({ predCell, currentCell, verdict, verdictColor, bg, border }) => (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: bg, border: `2px solid ${border}`, borderRadius: 10,
            padding: "8px 12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 130 }}>
              {predCell}
              <Arrow />
              {currentCell}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: verdictColor, flex: 1, lineHeight: 1.35 }}>
              {verdict}
            </div>
          </div>
        );

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "0 4px" }}>
            {/* W scene — just one cell, no trace */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#f8fafc", border: "2px solid #cbd5e1", borderRadius: 10,
              padding: "8px 12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", minWidth: 130, paddingLeft: 78 }}>
                <Cell letter="W" hasStar={false} dim />
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0f766e", flex: 1 }}>
                {t(E, "W → just skip ✓", "W → 그냥 다음 ✓")}
              </div>
            </div>

            {/* G scene 1 — predecessor has star → moved-in */}
            <SceneRow
              predCell={<Cell hasStar={true} label="거꾸로" />}
              currentCell={<Cell letter="G" hasStar={true} label="여기" />}
              verdict={t(E, "G — moved-in ✨", "G → 들어온 별 ✨")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* G scene 2 — predecessor outside grid → original here */}
            <SceneRow
              predCell={<Cell outside label="거꾸로" />}
              currentCell={<Cell letter="G" hasStar={true} label="여기" />}
              verdict={t(E, "G — original here 🌱", "G → 원래 여기 별 🌱")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* G scene 3 — predecessor inside grid but W (empty) → also original here */}
            <SceneRow
              predCell={<Cell letter="W" hasStar={false} dim label="거꾸로" />}
              currentCell={<Cell letter="G" hasStar={true} label="여기" />}
              verdict={t(E, "G — also original here 🌱", "G → 똑같이 원래 여기 별 🌱")}
              verdictColor="#7c3aed"
              bg="#faf5ff"
              border="#c4b5fd"
            />

            {/* B scene — both have star → OK */}
            <SceneRow
              predCell={<Cell hasStar={true} label="거꾸로" />}
              currentCell={<Cell letter="B" hasStar={true} label="여기" />}
              verdict={t(E, "B — both ★ ✓ OK", "B → 양쪽 다 별 ✓ OK")}
              verdictColor="#16a34a"
              bg="#f0fdf4"
              border="#86efac"
            />

            {/* B scene invalid — pred outside grid → EMPTY */}
            <SceneRow
              predCell={<Cell outside label="거꾸로" />}
              currentCell={<Cell letter="B" hasStar={true} label="여기" />}
              verdict={t(E, "B — pred ★ missing ❌", "B → 거꾸로 별 없음 ❌")}
              verdictColor="#dc2626"
              bg="#fef2f2"
              border="#fca5a5"
            />

            {/* B scene invalid — pred W (empty) → also EMPTY */}
            <SceneRow
              predCell={<Cell letter="W" hasStar={false} dim label="거꾸로" />}
              currentCell={<Cell letter="B" hasStar={true} label="여기" />}
              verdict={t(E, "B — pred is W, still ★ missing ❌", "B → 거꾸로 W 라도 별 없음 ❌")}
              verdictColor="#dc2626"
              bg="#fef2f2"
              border="#fca5a5"
            />
          </div>
        );
      })(),
    },

    /* 1-3.0 — s/in playground REMOVED (2026-06-01) — was redundant with the visual summary
       above (1-2.6). The s/in formal notation is reintroduced in Ch2 where it is actually used. */

    /* 1-3.1/2/3 — W/B/G individual quizzes REMOVED (2026-06-01) — redundant after the
       visual summary table (1-2.6). The application quizzes that follow (corner G, when -1,
       tiny input) already verify understanding by *using* the W/B/G rules in new contexts. */

    /* 1-3.9 — REMOVED (2026-06-02): 3×3 grid with arrows was redundant with 1-3.4a
       (corner G visual). Same "거꾸로 가면 사진 밖" message. The 1-4 question now stands alone. */

    /* 1-4 — Quiz: when is -1? */
    {
      type: "quiz",
      question: t(E,
        "3×3 grid, stars move right 1 down 1. For a cell to be B, a star must arrive from its top-left neighbor (one step back). Which cell can NEVER be B?",
        "3×3 사진, 별 이동: 오른쪽 1·아래 1. B 가 되려면 왼쪽 위 칸 (한 칸 거꾸로) 에서 별이 와야 해요. 어느 칸은 그 자리가 사진 밖이라서 절대 B 가 될 수 없을까?"),
      options: [
        "(0, 0)",
        "(1, 1)",
        "(2, 2)",
      ],
      correct: 0,
      explain: t(E,
        "(0,0) would need a star from (-1,-1) — that's outside the grid. So no incoming star possible → B can't form. (1,1) and (2,2) have valid earlier cells in the grid, so B is fine there.",
        "(0,0) 는 (-1,-1) 에서 별이 와야 하는데 거긴 사진 밖. 그래서 들어올 별 없음 → B 못 만듦. (1,1) 과 (2,2) 는 거꾸로 간 자리가 사진 안이라 B 가능."),
    },

    /* 1-5 — REMOVED (2026-06-02): Tiny input quiz on the "stars don't move" case was
       redundant with slide 1-2 which already walks through Sample 1 (A=B=0, answer=7).
       Ch1 now ends with the corner-B quiz (1-4) which actively applies the W/B/G rules. */
  ];
}

export function makeAstralCh2(E, lang = "py") {
  const sections = getAstralSections(E);
  const sectionStep = (sec, narr = "") => ({
    type: "reveal",
    narr,
    content: (<CodeSectionView section={sec} lang={lang} E={E} />),
  });

  return [
    /* 2-0 — 줄(chain)이 뭔지: 별 한 마리 경로 (right=1, down=2 예시) */
    {
      type: "reveal",
      narr: t(E,
        "Every star moves the same way each photo: right=1, down=2 in this example. From (0,0): one step right, two steps down → lands at (2,1). Next step: (2,1) → (4,2) — off the grid. Chain ends. That path is a 'chain'.",
        "이 문제에서 별은 사진마다 똑같이 이동해요. 예시: right=1, down=2. (0,0)에서 오른쪽 1칸, 아래 2칸 → (2,1). 다음 이동: (2,1) → (4,2) → 사진 밖. 끝. 이 경로가 '줄'이에요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 12, textAlign: "center" }}>
            {t(E, "Example: right=1, down=2 — trace one star", "예시: right=1, down=2 — 별 한 마리 따라가기")}
          </div>

          {/* 4×4 grid — chain: (0,0) and (2,1) highlighted, arrow between them */}
          {(() => {
            // For right=1, down=2: star at (0,0) moves to (2,1), then off grid
            const chain = new Set(["0,0", "2,1"]);
            return (
              <div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:10 }}>
                  {[0,1,2,3].map(r => (
                    <div key={r} style={{ display:"flex", gap:5, marginBottom:5 }}>
                      {[0,1,2,3].map(c => {
                        const on = chain.has(`${r},${c}`);
                        const isFirst = r===0 && c===0;
                        const isSecond = r===2 && c===1;
                        return (
                          <div key={c} style={{
                            width:52, height:52, borderRadius:8,
                            background: on ? "#dbeafe" : "#f8fafc",
                            border: on ? "2.5px solid #3b82f6" : "1.5px solid #e2e8f0",
                            display:"flex", flexDirection:"column",
                            alignItems:"center", justifyContent:"center", gap:1,
                            position:"relative",
                          }}>
                            <div style={{ fontSize: on ? 20 : 14, color: on ? "#2563eb" : "#e2e8f0", lineHeight:1 }}>
                              {on ? "★" : "·"}
                            </div>
                            {on && (
                              <div style={{ fontSize:9, color:"#93c5fd", fontWeight:700 }}>({r},{c})</div>
                            )}
                            {isFirst && (
                              <div style={{
                                position:"absolute", top:-9, right:-9,
                                background:"#2563eb", color:"#fff",
                                fontSize:8, fontWeight:800, borderRadius:4, padding:"1px 4px",
                              }}>START</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Step-by-step calculation */}
                <div style={{ background:"#eff6ff", border:"1.5px solid #93c5fd", borderRadius:9, padding:"10px 14px", marginBottom:10 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:"#1e3a8a", marginBottom:8 }}>
                    {t(E, "How to calculate next position:", "다음 칸 계산 방법:")}
                  </div>
                  {[
                    {
                      from:"(0,0)", calc: t(E,"row 0+2=2, col 0+1=1","행 0+2=2, 열 0+1=1"), to:"(2,1)", ok:true,
                    },
                    {
                      from:"(2,1)", calc: t(E,"row 2+2=4, col 1+1=2","행 2+2=4, 열 1+1=2"), to: t(E,"(4,2) off grid ✗","(4,2) 밖 ✗"), ok:false,
                    },
                  ].map((step,i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:8, marginBottom: i===0 ? 6:0,
                      fontFamily:"monospace", fontSize:12,
                    }}>
                      <span style={{
                        background:"#dbeafe", border:"2px solid #3b82f6", borderRadius:6,
                        padding:"4px 9px", fontWeight:800, color:"#1e40af",
                      }}>{step.from}</span>
                      <span style={{ color:"#64748b", fontSize:11 }}>+down=2, +right=1</span>
                      <span style={{ color:"#94a3b8" }}>→</span>
                      <span style={{
                        background: step.ok ? "#dbeafe" : "#fee2e2",
                        border: `2px solid ${step.ok ? "#3b82f6" : "#fca5a5"}`,
                        borderRadius:6, padding:"4px 9px", fontWeight:800,
                        color: step.ok ? "#1e40af" : "#b91c1c",
                      }}>{step.to}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize:12, color:"#374151", textAlign:"center", lineHeight:1.7 }}>
                  {t(E,
                    "Chain = [(0,0) → (2,1)]. Only 2 cells. The star can ONLY visit these cells — nothing else.",
                    "줄 = [(0,0) → (2,1)]. 2칸짜리 줄이에요. 이 별은 이 두 칸 외에는 절대 갈 수 없어요.")}
                </div>
              </div>
            );
          })()}
        </div>
      ),
    },

    /* 2-0a — 독립성: 줄끼리 완전히 독립 */
    {
      type: "reveal",
      narr: t(E,
        "Same right=1, down=2 grid, but now show ALL chains at once. Each color = one chain. Look — no two colors overlap on the same cell. That's the key: chains are completely independent. Solve each chain separately, add up = answer.",
        "right=1, down=2 예시 그리드, 이번엔 줄을 전부 색으로 표시. 같은 색 = 같은 줄. 어떤 칸도 두 가지 색이 없어요. 이게 핵심: 줄끼리 완전히 독립이에요. 줄마다 따로 풀고 더하면 = 정답."),
      content: (
        <div style={{ padding: 14 }}>

          {/* All chains colored grid — right=1, down=2 */}
          {(() => {
            // right=1, down=2 in 4×4 grid → chain ID per cell
            // Chain 0: (0,0)↔(2,1)  Chain 1: (0,1)↔(2,2)  Chain 2: (0,2)↔(2,3)
            // Chain 3: (0,3) alone   Chain 4: (1,0)↔(3,1)  Chain 5: (1,1)↔(3,2)
            // Chain 6: (1,2)↔(3,3)  Chain 7: (1,3) alone   Chain 8: (2,0) alone  Chain 9: (3,0) alone
            const cid = [
              [0, 1, 2, 3],
              [4, 5, 6, 7],
              [8, 0, 1, 2],
              [9, 4, 5, 6],
            ];
            const CC = [
              { bg:"#dbeafe", bd:"#3b82f6" }, // 0 blue
              { bg:"#dcfce7", bd:"#16a34a" }, // 1 green
              { bg:"#fef9c3", bd:"#d97706" }, // 2 amber
              { bg:"#ede9fe", bd:"#8b5cf6" }, // 3 purple
              { bg:"#fce7f3", bd:"#ec4899" }, // 4 pink
              { bg:"#e0f2fe", bd:"#0891b2" }, // 5 cyan
              { bg:"#fff7ed", bd:"#f97316" }, // 6 orange
              { bg:"#fef2f2", bd:"#ef4444" }, // 7 red
              { bg:"#f0fdf4", bd:"#22c55e" }, // 8 lime
              { bg:"#f5f3ff", bd:"#7c3aed" }, // 9 violet
            ];
            // same-chain cells share color — shows independence visually
            return (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:10 }}>
                {cid.map((row, r) => (
                  <div key={r} style={{ display:"flex", gap:5, marginBottom:5 }}>
                    {row.map((ci, c) => (
                      <div key={c} style={{
                        width:50, height:50, borderRadius:8,
                        background: CC[ci].bg,
                        border: `2.5px solid ${CC[ci].bd}`,
                      }} />
                    ))}
                  </div>
                ))}
                <div style={{ fontSize:11.5, color:"#64748b", marginTop:6 }}>
                  {t(E,"same color = same chain — no cell belongs to two chains","같은 색 = 같은 줄 — 어떤 칸도 두 줄에 동시에 속하지 않아요")}
                </div>
              </div>
            );
          })()}

          <div style={{
            background:"#f0fdf4", border:"2px solid #16a34a", borderRadius:8,
            padding:"9px 14px",
            fontSize:13, fontWeight:700, color:"#14532d", textAlign:"center",
          }}>
            {t(E,
              "Independent chains → solve each separately → sum = answer!",
              "독립인 줄들 → 줄마다 따로 풀기 → 합 = 정답!")}
          </div>

        </div>
      ),
    },

    /* 2-0b — 3가지 방법 로드맵 */
    {
      type: "reveal",
      narr: t(E,
        "OK — chains are independent, so we just need to solve ONE chain. How? 3 approaches.",
        "OK — 줄끼리 독립이니까, 한 줄만 풀면 돼요. 어떻게? 3 가지 방법이에요."),
      content: (
        <div style={{ padding: 14 }}>

          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7 }}>
            {t(E, "3 ways to solve a single chain (next slides):", "한 줄을 어떻게 풀까요? 3 가지 방법 (다음 슬라이드):")}
          </div>
          {[
            {
              num: "①", icon: "➡️",
              label: t(E, "Left → right (greedy)", "앞→뒤 욕심쟁이"),
              desc: t(E, "Check each cell one by one, left to right. Fast — but misses some cases.", "칸을 하나씩 왼쪽→오른쪽으로. 빠르지만 가끔 틀려요."),
              badge: t(E, "✗ sometimes wrong", "✗ 가끔 틀림"),
              bg: "#fef2f2", border: "#fca5a5", tc: "#991b1b",
            },
            {
              num: "②", icon: "⬅️",
              label: t(E, "Right → left (greedy)", "뒤→앞 욕심쟁이"),
              desc: t(E, "Flip direction — check right to left. Always finds the minimum. USACO 12/12 ✓", "방향 뒤집기 — 오른쪽→왼쪽. 항상 최솟값. USACO 12/12 ✓"),
              badge: t(E, "✓ passes USACO", "✓ USACO 통과"),
              bg: "#f0fdf4", border: "#86efac", tc: "#14532d",
            },
            {
              num: "③", icon: "💡",
              label: t(E, "All combinations + DP", "모든 경우 → DP"),
              desc: t(E, "Try every possibility → then speed it up with DP. Always correct.", "모든 경우 시도 → DP 로 빠르게. 항상 맞는 게 보장돼요."),
              badge: t(E, "✓ always correct", "✓ 항상 정확"),
              bg: "#ede9fe", border: "#c4b5fd", tc: "#4c1d95",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.bg, border: `1.5px solid ${item.border}`,
              borderRadius: 8, padding: "7px 11px", marginBottom: 6,
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <div style={{ fontSize: 14, marginTop: 1 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.tc, marginBottom: 2 }}>
                  {item.num} {item.label}
                </div>
                <div style={{ fontSize: 11.5, color: item.tc, opacity: 0.85, lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: item.tc,
                background: item.border, borderRadius: 6, padding: "2px 7px",
                whiteSpace: "nowrap", marginTop: 2, opacity: 0.8,
              }}>
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      ),
    },


    /* 2-0.5 — Greedy 개념 설명: "욕심쟁이 방법이 뭔데?" */
    {
      type: "reveal",
      narr: t(E,
        "Before the simulations — what does 'greedy' mean? A greedy approach: look only at the current situation and decide immediately, without thinking about what comes next.",
        "시뮬 전에 — '욕심쟁이(greedy)' 방법이 뭔지 알아봐요. 지금 내 눈앞에 있는 칸만 보고, 뒤에 뭐가 오는지 생각하지 않고 즉시 결정하는 방법이에요."),
      content: (
        <div style={{ padding: 14 }}>
          {/* Daily life example */}
          <div style={{ background: "#fef9c3", border: "2px solid #f59e0b", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
              🪙 {t(E, "Example: making change with fewest coins", "예시: 동전 최소 개수로 거스름돈 주기")}
            </div>
            <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.7 }}>
              {t(E,
                "Need to give 380 won change. Greedy rule: 'use the biggest coin that fits right now!'",
                "380원을 거슬러줘야 해요. 욕심쟁이 규칙: '지금 들어가는 가장 큰 동전부터!'")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {[
                { coin: "500원", fits: false, note: t(E,"too big","너무 커") },
                { coin: "100원", fits: true,  note: "→ 280" },
                { coin: "100원", fits: true,  note: "→ 180" },
                { coin: "100원", fits: true,  note: "→ 80" },
                { coin: "50원",  fits: true,  note: "→ 30" },
                { coin: "10원",  fits: true,  note: "→ 20" },
                { coin: "10원",  fits: true,  note: "→ 10" },
                { coin: "10원",  fits: true,  note: "→ 0 ✓" },
              ].map((c, i) => (
                <div key={i} style={{
                  background: c.fits ? "#fef3c7" : "#f1f5f9",
                  border: `1.5px solid ${c.fits ? "#f59e0b" : "#e2e8f0"}`,
                  borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700,
                  color: c.fits ? "#92400e" : "#94a3b8",
                  textDecoration: c.fits ? "none" : "line-through",
                }}>
                  {c.coin} <span style={{ fontWeight: 400, fontSize: 10 }}>{c.note}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, marginTop: 6, color: "#78350f", fontWeight: 700 }}>
              {t(E, "Result: 7 coins. Each step: just pick the biggest that fits. No planning ahead!",
                 "결과: 7개. 매 순간 '지금 들어가는 가장 큰 거' 만 선택. 미래 계획 없음!")}
            </div>
          </div>

          {/* In this problem */}
          <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1e3a8a", marginBottom: 6 }}>
              ⭐ {t(E, "Greedy in this problem", "이 문제에서 욕심쟁이")}
            </div>
            <div style={{ fontSize: 12, color: "#1e40af", lineHeight: 1.7 }}>
              {t(E,
                "Scan cells one by one. At each cell: look only at this cell's type and the neighboring star — then decide whether to place a star. No looking ahead at future cells.",
                "칸을 하나씩 봐요. 각 칸에서: 이 칸의 종류와 바로 옆 칸 별 유무만 보고, 별을 놓을지 즉시 결정. 뒤에 뭐가 오는지는 안 봐요.")}
            </div>
          </div>

          {/* Two directions preview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412" }}>➡️ {t(E,"Left → Right","왼쪽 → 오른쪽")}</div>
              <div style={{ fontSize: 11, color: "#9a3412", marginTop: 3, lineHeight: 1.4 }}>
                {t(E,"Try first. Will it always work?","먼저 시도. 항상 맞을까요?")}
              </div>
            </div>
            <div style={{ background: "#f0fdf4", border: "1.5px solid #16a34a", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#14532d" }}>⬅️ {t(E,"Right → Left","오른쪽 → 왼쪽")}</div>
              <div style={{ fontSize: 11, color: "#14532d", marginTop: 3, lineHeight: 1.4 }}>
                {t(E,"Always correct. USACO 12/12 ✓","항상 맞아요. USACO 12/12 ✓")}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    /* Structure (2026-06-02): Ch2 follows "overview → each method in detail → code".
       2-0 = method overview, 2-3.05~2-3.3 = each method's detail, THEN code starts. */

    /* 2-2 moved later — see right before 2-5 (full code). The edge case (stars don't move)
       comes AFTER the main algorithm so students see the interesting flow first. */

    /* 2-3.05 — Forward Greedy simulation showing failure on G G G B */
    {
      type: "reveal",
      narr: t(E,
        "① Left → right: Rule — when you see a B cell, mark ★ here AND mark ★ one step back if empty. G cells are skipped. Let's try on row G G G B — click through step by step!",
        "① 앞→뒤: 아이디어 — B 칸만 신경 써봐요. B 는 두 사진 모두에 별이 있어야 하니까요. 규칙: B 만나면 여기 ★ + 바로 앞 칸도 ★ 없으면 거기도 ★. G 칸은 일단 통과. 줄 G G G B 로 직접 해봐요!"),
      content: (
        <div style={{ padding: 14 }}>
          {/* Rule box */}
          <div style={{
            background: "#ecfeff", border: "2px solid #06b6d4", borderRadius: 10,
            padding: "10px 14px", marginBottom: 14, textAlign: "center",
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#155e75", marginBottom: 5 }}>
              ➡️ {t(E, "Forward rule (left → right)", "앞→뒤 규칙")}
            </div>
            {[
              t(E, "G cell → skip (do nothing)", "G 칸 → 그냥 통과"),
              t(E, "B cell → ★ here  +  if the cell just before is empty → ★ there too", "B 칸 → 여기 ★  +  바로 앞 칸 비어있으면 거기도 ★"),
            ].map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: "#164e63", marginBottom: 3, textAlign: "left", display: "flex", gap: 6 }}>
                <span style={{ color: "#0e7490", fontWeight: 700 }}>{i + 1}.</span>
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Interactive simulation */}
          <ChainStepSim stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Row G G G B — all empty. Start scanning left → right.", "줄 G G G B 시작. 왼쪽→오른쪽으로 스캔.")
            },
            {
              cells: [{letter:"G",star:false,active:true},{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "G(0): G cell → skip.", "G(0): G 칸이에요 → 통과.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:true},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "G(1): G cell → skip.", "G(1): G 칸 → 통과.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:false,active:true},{letter:"B",star:false,active:false}],
              note: t(E, "G(2): G cell → skip.", "G(2): G 칸 → 통과.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:true}],
              note: t(E, "B(3): B cell! Mark ★ here. One step back: G(2) is empty → mark G(2) ★ too.", "B(3): B 칸! 여기 ★. 바로 앞 G(2) 비어있음 → G(2)도 ★.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:false}],
              note: t(E, "Done. G(2)★ + B(3)★ = 2 stars. But what about G(0) and G(1)? They have no star in either photo! 💥", "완료. G(2)★ + B(3)★ = 별 2개. 그런데 G(0), G(1)에는 별이 하나도 없어요! 💥"),
              result: t(E, "2 stars — G(0) and G(1) have no star anywhere → WRONG ✗", "별 2개 — G(0), G(1) 에 별 없음 → 틀렸어요 ✗"),
              ok: false,
            },
          ]} />

          {/* Why it fails */}
          <div style={{
            marginTop: 12, background: "#fef3c7", border: "1.5px solid #fbbf24",
            borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#92400e", lineHeight: 1.6,
          }}>
            <b>{t(E, "Why wrong? ", "왜 틀렸을까요? ")}</b>
            {t(E,
              "G cells need at least one star — in photo 1 OR photo 2. G(0) is the row start: no star can arrive from photo 2 (nothing before it), so it MUST have its own photo-1 star. The forward rule only looks one step back from B — it never reached G(0).",
              "G 칸은 사진 1 또는 사진 2 중 하나에 별이 있어야 해요. G(0) 는 줄의 시작이라 사진 2 별이 들어올 수가 없어요. 그러니까 사진 1 에 자기 별이 꼭 있어야 해요. 앞→뒤 방법은 B 에서 딱 한 칸만 뒤를 봐서 G(0) 까지 못 닿아요.")}
          </div>
          {/* Bridge */}
          <div style={{
            marginTop: 8, background: "#f0fdfa", border: "1px solid #99f6e4",
            borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#0f766e", textAlign: "center", lineHeight: 1.6,
          }}>
            {t(E,
              "The problem: scanning left→right, we pass G(0) and G(1) before we ever see B(3). What if we flipped direction and scanned right → left?",
              "문제: 왼쪽→오른쪽으로 가면 B(3) 보기 전에 G(0), G(1) 을 이미 지나쳐요. 방향을 뒤집으면 어떨까요?")}
          </div>
        </div>
      ),
    },

    /* 2-3.06 — Backward Greedy simulation on same G G G B. Verified 12/12 USACO. */
    {
      type: "reveal",
      narr: t(E,
        "② Right → left: just flip the direction! Same row G G G B — scan right → left this time. That means B is the very first cell we hit. Let's go step by step!",
        "② 뒤→앞: 방향만 뒤집어봐요! 같은 줄 G G G B 인데, 이번엔 오른쪽→왼쪽으로 스캔해요. 그러면 B 를 제일 먼저 만나게 돼요. 어떻게 달라지는지 하나씩 해봐요!"),
      content: (
        <div style={{ padding: 14 }}>
          {/* Rule box */}
          <div style={{
            background: "#f0fdf4", border: "2px solid #16a34a", borderRadius: 10,
            padding: "10px 14px", marginBottom: 14,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#14532d", marginBottom: 5, textAlign: "center" }}>
              ⬅️ {t(E, "Backward rule (right → left)", "뒤→앞 규칙")}
            </div>
            {[
              t(E, "B cell → ★ here  +  ★ at the cell just before it", "B 칸 → 여기 ★  +  바로 앞 칸에도 ★"),
              t(E, "G cell (already has ★) → skip, already satisfied", "G 칸 (이미 ★ 있음) → 통과, 이미 조건 OK"),
              t(E, "G cell (no ★) → put ★ at the cell before it (that star will travel HERE in photo 2 ✓). If no cell before it, put ★ here directly.", "G 칸 (별 없음) → 앞 칸에 ★을 놓아요. 그러면 그 별이 사진 2에서 이 칸으로 이동해 와요 ✓. 앞 칸이 없으면 여기에 직접 ★."),
            ].map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: "#14532d", marginBottom: 3, display: "flex", gap: 6 }}>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>{i + 1}.</span>
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Interactive simulation */}
          <ChainStepSim stepData={[
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"B",star:false,active:false}],
              note: t(E, "Same row G G G B — all empty. Scanning right → left.", "같은 줄 G G G B. 오른쪽→왼쪽으로 스캔.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:true}],
              note: t(E, "B(3): B cell — ★ here AND ★ at predecessor G(2).", "B(3): B 칸 → 여기 ★ + 앞 G(2)도 ★.")
            },
            {
              cells: [{letter:"G",star:false,active:false},{letter:"G",star:false,active:false},{letter:"G",star:true,active:true},{letter:"B",star:true,active:false}],
              note: t(E, "G(2): already has ★ → skip.", "G(2): 이미 ★ 있음 → 통과.")
            },
            {
              cells: [{letter:"G",star:true,active:false},{letter:"G",star:false,active:true},{letter:"G",star:true,active:false},{letter:"B",star:true,active:false}],
              note: t(E, "G(1): no ★. Has predecessor G(0) → put ★ at G(0). (G(0)★ will arrive at G(1) in photo 2 ✓)", "G(1): ★ 없음. 앞 G(0) 있음 → G(0)에 ★. (사진 2에서 G(0)★이 G(1)으로 와요 ✓)")
            },
            {
              cells: [{letter:"G",star:true,active:true},{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:false}],
              note: t(E, "G(0): already has ★ → skip.", "G(0): 이미 ★ 있음 → 통과.")
            },
            {
              cells: [{letter:"G",star:true,active:false},{letter:"G",star:false,active:false},{letter:"G",star:true,active:false},{letter:"B",star:true,active:false}],
              note: t(E, "Done! Stars at G(0)★, G(2)★, B(3)★ = 3 stars. Every cell satisfied ✓", "완료! G(0)★, G(2)★, B(3)★ = 별 3개. 모든 칸 조건 OK ✓"),
              result: t(E, "3 stars — all conditions satisfied ✓", "별 3개 — 모든 조건 충족 ✓"),
              ok: true,
            },
          ]} />

          {/* Why it works */}
          <div style={{
            marginTop: 12, background: "#eff6ff", border: "1.5px solid #bfdbfe",
            borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#1e40af", lineHeight: 1.6,
          }}>
            <b>{t(E, "Why does backward work? ", "왜 뒤→앞이 맞을까요? ")}</b>
            {t(E,
              "B cells are processed first. By the time we reach G(1), the picture is already set — G(0) has a star, which will travel to G(1) in photo 2. G(1) doesn't need its own star. Backward greedy never adds an unnecessary star.",
              "B 칸이 먼저 처리돼요. G(1) 을 만날 때쯤엔 이미 G(0) 에 별이 있어요. 사진 2에서 그 별이 G(1) 으로 와줘요. G(1) 은 자기 별이 필요 없어요. 뒤→앞은 불필요한 별을 절대 추가하지 않아요.")}
          </div>
          {/* Speed note */}
          <div style={{
            marginTop: 8, background: "#fafafa", border: "1px solid #e2e8f0",
            borderRadius: 8, padding: "7px 12px", fontSize: 11.5, color: "#64748b", textAlign: "center",
          }}>
            {t(E, "Speed: one pass per row. Passes USACO 4-second limit easily.", "속도: 각 줄을 한 번만 훑으면 끝이에요. USACO 4초 제한 여유롭게 통과해요.")}
          </div>
        </div>
      ),
    },

    /* 2-3.1 — Brute force: try ALL choice combos on a short chain (G, G, G) */
    {
      type: "reveal",
      narr: t(E,
        "Right → left greedy passes USACO — but WHY does it always find the minimum? To really understand, let's try a completely different approach: test every possible combination! Each G cell has two choices — place a brand-new star here, OR let a star from the previous cell travel here in photo 2.",
        "뒤→앞 욕심쟁이가 USACO 를 통과해요 — 근데 왜 항상 최솟값을 찾을까요? 제대로 이해하려면 완전히 다른 방법으로 봐요: 모든 경우를 다 시도해보기! 각 G 칸은 두 가지 선택 — 여기 새 별을 놓거나, 아니면 앞 칸 별이 사진 2에서 이 칸으로 이동해 오거나."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>
              🐢 {t(E, "Brute force — try all combinations", "단순 시도 — 모든 경우 다 해보기")}
            </div>
            <div style={{ fontSize: 12.5, color: "#78350f" }}>
              {t(E, "Chain: G → G (2 cells along the star line)", "줄: G → G (별 한 줄에 G 가 2 개)")}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, marginBottom: 8 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", width: 40 }}>#</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>G(0)</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>G(1)</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "Stars", "별 수")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>2</td>
              </tr>
              <tr style={{ background: "#dcfce7" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>2</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new (→ next)", "★ 새 별 (→ 다음 칸)")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 800, color: "#15803d" }}>1 ✅</td>
              </tr>
              <tr style={{ color: "#94a3b8" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>3</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "★ new", "★ 새 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>❌</td>
              </tr>
              <tr style={{ color: "#94a3b8" }}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>4</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "↩ arrived", "↩ 이어온 별")}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>❌</td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6, lineHeight: 1.5 }}>
            <span style={{ background: "#f1f5f9", borderRadius: 4, padding: "1px 6px", fontWeight: 600, color: "#64748b" }}>
              {t(E, "↩ arrived", "↩ 이어온 별")}
            </span>
            {" "}
            {t(E,
              "= the star from the previous cell travels here in photo 2 (no extra star needed here)",
              "= 앞 칸에 있던 별이 사진 2에서 이 칸으로 이동해 온 것 (여기 새 별 불필요)")}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", lineHeight: 1.55 }}>
            {t(E,
              "Rows 3-4 are ❌ — G(0) is the first cell, no previous cell to arrive from. Best valid = Row 2 with 1 star (one star moves G(0) → G(1)).",
              "3-4 번은 ❌ — G(0) 은 첫 칸이라 이전 칸이 없어요. 가능한 것 중 가장 적은 별 수 = 2 번 (별 1 개가 G(0)→G(1) 로 이동). 답은 1 별!")}
          </div>
        </div>
      ),
    },

    /* 2-3.2 — Brute force is too slow for long chains */
    {
      type: "reveal",
      narr: t(E,
        "Brute force works but explodes. Each G doubles the options. A chain with k G cells = 2^k combinations.",
        "단순 시도는 항상 정답인데 너무 느려요. G 칸이 하나 늘어날 때마다 경우의 수가 2 배. G 가 k 개면 2^k 가지."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#fee2e2",
            border: "2px solid #ef4444",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#991b1b" }}>
              ⏰ {t(E, "Too slow when chains are long", "줄이 길어지면 폭주")}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 10 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "G cells in chain", "줄의 G 칸 수")}</th>
                <th style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>{t(E, "Combinations to try", "시도할 경우의 수")}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>2</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>4</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>5</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>32</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>10</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1,024</td></tr>
              <tr><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>20</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>1,048,576</td></tr>
              <tr style={{ background: "#fef2f2" }}><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>50</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>{t(E, "≈ 1 quadrillion", "약 1000 조")}</td></tr>
              <tr style={{ background: "#fef2f2" }}><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700 }}>100</td><td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700, color: "#991b1b" }}>{t(E, "longer than universe age", "우주 나이보다 김")}</td></tr>
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: "#64748b", textAlign: "center", lineHeight: 1.55 }}>
            {t(E,
              "Grids can have lines of 200+ cells. Brute force can't finish. We need a smarter way.",
              "한 줄에 칸이 200 개 넘을 수도 있어요. 단순 시도로는 못 풀어요. 더 똑똑한 방법이 필요해요.")}
          </div>
        </div>
      ),
    },

    /* 2-3.3 — Bridge: DP = brute force with a memo */
    {
      type: "reveal",
      narr: t(E,
        "Key insight: anywhere in a row, only ONE thing from the past matters — 'is a star arriving here?' That's just 2 states. Carry both options forward at every cell, pick the smaller at the very end. Same correctness as trying everything — but way, way faster. That's DP.",
        "핵심 발견: 줄 어느 지점에서든, 앞에서 중요한 정보는 딱 하나 — '별이 이리 오고 있나?' 상태가 딱 2 가지예요. 매 칸에서 두 경우를 다 들고 가다가 끝에서 작은 거 고르면 돼요. 모든 경우를 다 해보는 것만큼 정확하고, 훨씬 빠른 방법 — 이게 바로 DP예요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{
            background: "#ede9fe",
            border: "2px solid #8b5cf6",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              💡 {t(E, "DP = brute force with a memo", "DP = 단순 시도 + 손메모")}
            </div>
            <div style={{ fontSize: 12.5, color: "#4c1d95", lineHeight: 1.55 }}>
              {t(E,
                "For each cell, store the answer ONCE. Don't recompute when other combinations need it.",
                "칸마다 답을 한 번만 계산하고 적어두기. 다른 경우의 수가 와도 다시 안 계산.")}
            </div>
          </div>
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
              📓 {t(E, "What to track per cell", "칸마다 뭘 들고 다니냐면")}
            </div>
            <div style={{ fontSize: 12, color: "#14532d", lineHeight: 1.7 }}>
              {t(E,
                "At every cell, there's only ONE thing we don't know yet: 'is a star arriving here from the previous cell?' Yes or No. So we carry TWO numbers side by side:",
                "각 칸에서 모르는 게 딱 하나예요: '앞 칸 별이 여기로 이동해 오고 있나?' 예/아니오. 그래서 두 숫자를 나란히 들고 가요:")}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 7, flexWrap: "wrap" }}>
              {[
                { label: t(E, "No star arriving →", "별 안 왔을 때 →"), desc: t(E, "min stars so far", "지금까지 별 수 최솟값"), bg: "#dcfce7", bd: "#16a34a", tc: "#14532d" },
                { label: t(E, "Star IS arriving →", "별 왔을 때 →"), desc: t(E, "min stars so far", "지금까지 별 수 최솟값"), bg: "#dbeafe", bd: "#3b82f6", tc: "#1e40af" },
              ].map((item, i) => (
                <div key={i} style={{ background: item.bg, border: `1.5px solid ${item.bd}`, borderRadius: 7, padding: "6px 10px", flex: 1, minWidth: 110 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.tc }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: item.tc, opacity: 0.8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: "#14532d", marginTop: 7, lineHeight: 1.6 }}>
              {t(E,
                "At the last cell, just pick the smaller of the two. Done!",
                "마지막 칸에서 두 숫자 중 작은 걸 고르면 그게 정답이에요!")}
            </div>
          </div>
          <div style={{
            background: "#fefce8",
            border: "1px solid #fde047",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#854d0e", marginBottom: 4 }}>
              ⚡ {t(E, "Speed", "속도")}
            </div>
            <div style={{ fontSize: 12, color: "#713f12", lineHeight: 1.55 }}>
              {t(E,
                "Row of 200 cells: all combinations = 2²⁰⁰ (impossible). DP = 200 × 2 = 400 steps. Done.",
                "줄 200 칸: 모든 경우 = 2²⁰⁰ (불가능). DP = 200 × 2 = 400 번만 계산하면 끝.")}
            </div>
          </div>

          {/* Backward Greedy vs DP — the two winners */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#374151", marginBottom: 8, textAlign: "center" }}>
              {t(E, "The two winners compared:", "두 정답 방법 비교:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#14532d", marginBottom: 4 }}>⬅️ {t(E,"Right→left greedy","뒤→앞 욕심쟁이")}</div>
                <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.55 }}>
                  {t(E,
                    "\"B cells grab first.\" Simple to code, passes USACO. Works by intuition — why it's always minimum is less obvious.",
                    "\"B 칸 먼저 처리.\" 코드 간단, USACO 통과. 직관적으로 작동하는데 왜 항상 최솟값인지는 설명하기 어려워요.")}
                </div>
              </div>
              <div style={{ background: "#eef2ff", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#3730a3", marginBottom: 4 }}>💡 DP</div>
                <div style={{ fontSize: 11, color: "#3730a3", lineHeight: 1.55 }}>
                  {t(E,
                    "Carry both options at every cell, pick the smaller at the end. Always correct — no guessing needed.",
                    "매 칸에서 두 경우를 나란히 들고 가다가 끝에서 작은 거 선택. 항상 정확 — 운에 의존 안 해요.")}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10.5, color: "#64748b", textAlign: "center", marginTop: 6, lineHeight: 1.5 }}>
              {t(E,
                "Both are equally fast. The code we'll write uses DP — always correct, clean to implement.",
                "둘 다 속도는 같아요. 이제 짤 코드는 DP — 항상 정확하고, 구현도 깔끔해요.")}
            </div>
          </div>
        </div>
      ),
    },

    /* 2-1 — Read input (moved here 2026-06-02: first piece of code, after all 3 methods
       were explored. Now Ch2 flows clean: overview → 3 methods detail → CODE starts here). */
    sectionStep(sections[0], t(E,
      "DP is the winner. Now the code — 5 chunks: ① read input → ② handle 'stars don't move' shortcut → ③ group cells into chains → ④ DP each chain → ⑤ add up. Starting with ①: read the grid.",
      "DP 가 정답 방법이에요. 이제 코드 — 5 덩어리로 나뉘어요: ① 입력 받기 → ② '별 안 움직임' 지름길 → ③ 별 길 묶기 → ④ 한 묶음씩 DP → ⑤ 합치기. 지금은 ① 부터 — 입력 읽기.")),

    /* 2-3 — Walk chains code (groups cells into chains; per-chain DP comes next). */
    sectionStep(sections[2], t(E,
      "Next: walk every cell and find where each chain STARTS (a cell whose 'one step back' lands off the grid). The DP per chain comes after.",
      "다음: 모든 칸을 둘러보면서 묶음 (chain) 시작점만 찾기 (한 칸 거꾸로 가면 사진 밖인 칸). 묶음 안의 DP 계산은 그 다음 슬라이드부터.")),

    /* 2-3.4 — Predict: why DP tracks BOTH outcomes */
    {
      type: "quiz",
      narr: t(E,
        "Quick think: at a G cell, the star can either STAY or MOVE to the next cell. Greedy got tricked picking one too early. So what's the safe move?",
        "잠깐 생각: G 칸에선 별이 머무를지 다음 칸으로 갈지 두 갈래. Greedy 가 하나 일찍 골라서 틀렸어요. 안전한 방법은?"),
      question: t(E,
        "When we don't know which choice is better yet, what do we do?",
        "어느 게 좋은지 모를 땐 어떻게 할까요?"),
      options: [
        t(E, "Carry BOTH answers, pick the smaller at the very end.",
            "두 답 다 들고 가다가, 맨 끝에서 더 작은 거 고르기."),
        t(E, "Guess one and hope for the best.",
            "하나 찍고 잘 되길 기도하기."),
        t(E, "Always pick 'send' — moving stars uses less.",
            "무조건 '보내기' — 별 적게 들 거예요.")
      ],
      correct: 0,
      explain: t(E,
        "Right — that's why each cell stores TWO numbers (min_stars[0] and min_stars[1]): one for 'didn't send', one for 'sent'. The smaller of the two at the LAST cell is the path's answer.",
        "맞아요 — 그래서 칸마다 숫자 두 개 (min_stars[0], min_stars[1]) 를 들고 다녀요. 하나는 '안 보냄', 다른 하나는 '보냄'. 마지막 칸의 작은 쪽이 그 길의 답."),
    },

    /* 2-3.5 — DP intuition + live sim, now AFTER predict quiz */
    {
      type: "reveal",
      narr: t(E,
        "Why TWO numbers per cell? At a G cell, the star can either keep or pass out — we can't pick the better option yet (depends on what comes later). So we carry BOTH options forward: min_stars[0] = stars if this cell does NOT pass; min_stars[1] = stars if it DOES. The LAST cell's smaller number = the path's answer.",
        "왜 칸마다 숫자가 두 개? G 칸에선 별을 머무를지 보낼지 두 가지 선택 가능 — 지금 못 골라요 (뒤에 뭐 오는지 봐야). 그래서 두 옵션 다 들고 가는 거: min_stars[0] = 안 보낼 때 별 수, min_stars[1] = 보낼 때 별 수. 마지막 칸의 작은 숫자 = 답. ❌ 나오면 그 길은 못 만들어요."),
      content: (<AstralDpSim E={E} />),
    },

    /* 2-3.7 — Bridge: ❌ in sim ↔ EMPTY (a huge number) in code.
       MOVED here 2026-06-02 (was between STEP 1 and STEP 2). Now right after the sim
       so EMPTY is introduced while ❌ is fresh; STEP labels stay uninterrupted. */
    {
      type: "reveal",
      narr: t(E,
        "Quick bridge — the ❌ you just saw in the sim is what the CODE calls EMPTY (a huge number). Why a number and not a 'fail' flag? Because of one min(...) trick.",
        "잠깐 다리 — 방금 시뮬에 보인 ❌ 를 코드에선 EMPTY (엄청 큰 수) 라고 불러요. 왜 그냥 '실패' 표시 안 쓰고 큰 수? min(...) 한 줄 요령 때문이에요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔢 {t(E, "Sim shows ❌   ⟷   Code uses EMPTY = 99999999", "시뮬 ❌   ⟷   코드 EMPTY = 99999999")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>
              {t(E, "Same meaning: 'this option can't be built'.",
                    "같은 의미: '이 경우 만들 수 없음'.")}
            </div>
          </div>

          {/* Example: min_stars = [3, ❌] */}
          <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#312e81", marginBottom: 6, fontWeight: 700 }}>
              {t(E, "Example: min_stars = [3, ❌]", "예: min_stars = [3, ❌]")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
              • {t(E, "If this cell does NOT pass a star out: 3 stars. Works.",
                    "이 칸이 별 안 보낼 때: 3 개. 가능.")}<br/>
              • {t(E, "If this cell DOES pass a star out: ❌ — can't be made.",
                    "이 칸이 별 보낼 때: ❌ — 못 만듦.")}
            </div>
          </div>

          {/* NEW: Concrete min() examples to demystify why huge number auto-filters */}
          <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
              🎯 {t(E, "Why min(...) filters out automatically", "왜 min(...) 이 알아서 걸러내요")}
            </div>
            <div style={{ fontSize: 12.5, color: "#14532d", lineHeight: 1.7, fontFamily: "'JetBrains Mono',monospace" }}>
              min(3, 99999999) = <b style={{ color: "#16a34a" }}>3</b>     <span style={{ color: "#64748b", fontFamily: "system-ui" }}>{t(E, "← real wins", "← 진짜 답 이김")}</span><br/>
              min(99999999, 99999999) = <b style={{ color: "#dc2626" }}>99999999</b>  <span style={{ color: "#64748b", fontFamily: "system-ui" }}>{t(E, "← all fail → still huge", "← 둘 다 실패 → 여전히 큰 수")}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#166534", marginTop: 8, lineHeight: 1.55 }}>
              {t(E,
                "Huge number is always bigger than any real answer → min() picks the real one. If both are huge → answer stays huge → that path is impossible.",
                "큰 수는 어떤 진짜 답보다도 크니까 min() 이 진짜를 골라요. 둘 다 큰 수면 → 결과도 큰 수 → 그 길은 못 만듦. if 로 따로 걸러줄 필요 없음.")}
            </div>
          </div>

          {/* Code representation */}
          <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.65 }}>
            <div style={{ color: "#94a3b8", marginBottom: 4 }}>// {t(E, "in code:", "코드에서는:")}</div>
            <div><span style={{ color: "#c4b5fd" }}>const int</span> EMPTY = <span style={{ color: "#fbbf24" }}>99999999</span>;  <span style={{ color: "#64748b" }}>// {t(E, "huge number — bigger than any real answer", "엄청 큰 수")}</span></div>
            <div style={{ marginTop: 4 }}><span style={{ color: "#94a3b8" }}>{t(E, "// Same idea in Python: EMPTY = 99999999", "// Python 도 똑같이: EMPTY = 99999999")}</span></div>
          </div>
        </div>
      ),
    },

    /* 2-3.5b — Mini-roadmap: 3 steps to compute one path's answer */
    {
      type: "reveal",
      narr: t(E,
        "Now let's break that sim down into 3 steps — that's what the next slides go through, in order.",
        "방금 그 시뮬을 3 단계로 쪼개서 볼 거예요 — 다음 슬라이드들이 차례로 다룰게요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🗺️ {t(E, "How the sim works — 3 steps", "시뮬이 어떻게 돌아가나 — 3 단계")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, title: t(E, "Set up the FIRST cell's min_stars", "첫 칸의 min_stars 정하기"),
                why: t(E, "Why: DP needs a starting value. First cell has nothing before it, so its values are forced.",
                          "왜: DP 가 시작값이 있어야 굴러감. 첫 칸은 앞에 아무것도 없으니 값이 정해져 있음."),
                how: t(E, "How: look at the first letter (W/G/B) → fill min_stars[0]/min_stars[1].",
                          "방법: 첫 글자 (W/G/B) 보고 → min_stars[0]/min_stars[1] 채우기.") },
              { n: 2, title: t(E, "Walk the rest, one cell at a time", "나머지 칸 차례차례 처리"),
                why: t(E, "Why: each cell's value depends only on the PREVIOUS cell + this cell's letter. Walk left-to-right and chain it.",
                          "왜: 각 칸 값이 바로 이전 칸 값 + 이 칸 글자로만 결정됨. 그래서 왼쪽에서 오른쪽으로 한 칸씩 차례."),
                how: t(E, "How: previous min_stars + current letter → new min_stars (if-else on W/G/B).",
                          "방법: 이전 min_stars + 이 칸 글자 → 새 min_stars (W/G/B if-else).") },
              { n: 3, title: t(E, "Take the smaller at the LAST cell", "마지막 칸의 작은 숫자 = 답"),
                why: t(E, "Why: the last cell's star (if any) goes off-grid anyway. Both options are valid endings → pick the cheaper one.",
                          "왜: 마지막 칸이 보내든 안 보내든 어차피 사진 밖 → 둘 다 유효한 결말 → 더 적은 쪽 = 답."),
                how: t(E, "How: min(min_stars[0], min_stars[1]). ❌ → -1.",
                          "방법: min(min_stars[0], min_stars[1]). ❌ → -1.") },
            ].map(s => (
              <div key={s.n} style={{
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "center",
                background: "#f8fafc", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#4f46e5", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800,
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 3, lineHeight: 1.45 }}>{s.why}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, lineHeight: 1.45 }}>{s.how}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#eef2ff", border: "1.5px solid #a5b4fc", borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 11.5, color: "#312e81", textAlign: "center" }}>
            💡 {t(E, "Each step gets its own slide ahead — look for the step number at the top.",
                    "각 단계마다 슬라이드 따로. 위에 표시되는 단계 번호 따라가면 돼.")}
          </div>
        </div>
      ),
    },

    /* 2-3.6 — First cell (k=0) forced cases. */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 1 — Set up the FIRST cell. It has nothing before it (no incoming star). So min_stars[0]/min_stars[1] are forced by the letter.",
        "🔹 1 단계 — 첫 칸 설정. 앞에 아무것도 없으니 들어올 별 X. 첫 칸의 min_stars[0]/min_stars[1] 은 글자 보고 바로 결정."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              📌 {t(E, "First cell — what min_stars[0] and min_stars[1] start as", "첫 칸 — min_stars[0], min_stars[1] 시작값")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "min_stars[0] = stars so far if this cell does NOT pass one out. min_stars[1] = stars so far if it DOES.",
                    "min_stars[0] = 이 칸이 별 안 보낼 때 지금까지 별 수. min_stars[1] = 보낼 때 지금까지 별 수.")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "letter", "글자")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "why", "이유")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff" }}><b>W</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "Empty cell → 0 stars. Can't pass on what's not there → ❌.",
                          "빈 칸 → 별 0 개. 없는 걸 보낼 순 없음 → ❌.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1" }}><b>G</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "Original ★ here → 1 star. Can keep it OR pass it on — both OK.",
                          "원래 별 → 1 개. 머무를 수도, 다음 칸에 보낼 수도 있음 — 둘 다 가능.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff" }}><b>B</b></td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 11 }}>
                    {t(E, "B needs incoming ★, but first cell has nothing before it → ❌.",
                          "B 는 들어온 별 필요한데, 첫 칸은 앞에 아무것도 없음 → ❌.")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#991b1b", lineHeight: 1.6 }}>
            ❌ {t(E,
              "If the first cell is B, the entire star path is broken (min_stars = [❌, ❌]) — nothing fixes it later. Answer = -1.",
              "별 길 첫 칸이 B 면 그 길 전체가 망함 (min_stars = [❌, ❌]) — 뒤로 어떻게 가도 못 살림. 답은 -1.")}
          </div>
        </div>),
    },

    /* 2-3.7 — MOVED to right after 2-3.5 (DP sim) 2026-06-02. STEP 1 → STEP 2 flow
       now uninterrupted; EMPTY introduced while ❌ from sim is still fresh. */

    /* 2-3.8 — Case → Code mapping table */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 2 — cheat sheet for each next cell. Given the letter (W/G/B), how to compute new min_stars from previous min_stars. Just a few lines of code.",
        "🔹 2 단계 — 다음 칸마다 적용할 치트시트. 글자 (W/G/B) 보고, 이전 min_stars 에서 새 min_stars 어떻게 계산하는지. 코드 몇 줄로 끝."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔗 {t(E, "Case → Code", "케이스 → 코드")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "prev_keep = prev min_stars[0], prev_pass = prev min_stars[1], new_min_stars = new min_stars",
                    "prev_keep = 이전 min_stars[0], prev_pass = 이전 min_stars[1], new_min_stars = 새 min_stars")}
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "case", "케이스")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "needs incoming ★?", "들어온 별?")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "uses prev", "쓰는 prev")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "+ new ★?", "+ 새 별?")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "new min_stars", "새 min_stars")}</th>
                </tr>
              </thead>
              <tbody>
                {/* W */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff", fontWeight: 800 }}>W</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>{t(E, "No", "아니")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_keep</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] = prev_keep;<br/>new_min_stars[1] = ❌</td>
                </tr>
                {/* B */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#1e293b", color: "#fff", fontWeight: 800 }}>B</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#16a34a", fontWeight: 700 }}>{t(E, "Yes", "예")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_pass</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#dc2626", fontWeight: 700 }}>+1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] =<br/>new_min_stars[1] = prev_pass+1</td>
                </tr>
                {/* G case (a) — original ★ here */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 800 }}>G (a)</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>{t(E, "No", "아니")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_keep</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#dc2626", fontWeight: 700 }}>+1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] =<br/>new_min_stars[1] = prev_keep+1</td>
                </tr>
                {/* G case (b) — ★ moved in from predecessor */}
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 800 }}>G (b)</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", color: "#16a34a", fontWeight: 700 }}>{t(E, "Yes", "예")}</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>prev_pass</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>—</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontFamily: "'JetBrains Mono',monospace", background: "#f8fafc", fontSize: 10.5 }}>new_min_stars[0] = min(<br/>  new_min_stars[0], prev_pass)<br/><span style={{ color: "#64748b" }}>{t(E, "// can't pass on", "// 보낼 수 없음")}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 8, padding: "10px 12px", marginTop: 10, fontSize: 12, color: "#14532d", textAlign: "center", lineHeight: 1.6 }}>
            ✅ <b>{t(E,
              "The code on the next slide = if-else on this table. Nothing more.",
              "다음 슬라이드 코드 = 이 표를 그대로 if-else 로 쓴 것. 그게 전부.")}</b>
          </div>
        </div>
      ),
    },

    /* 2-4a — First cell init (split from old 2-4 for clarity). */
    sectionStep(sections[3], t(E,
      "🔹 STEP 1 in code — set up first cell's min_stars.",
      "🔹 1 단계 코드 — 첫 칸의 min_stars 설정.")),

    /* 2-4b — Main loop (split from old 2-4). */
    sectionStep(sections[4], t(E,
      "🔹 STEP 2 in code — walk the rest. For each cell: previous min_stars + current letter → new min_stars (the if-else over W/G/B is the cheat sheet you saw earlier).",
      "🔹 2 단계 코드 — 나머지 칸 차례차례. 매 칸: 이전 min_stars + 이 칸 글자 → 새 min_stars (W/G/B if-else 는 방금 본 치트시트 그대로).")),

    /* 2-4.5 — Why min(min_stars[0], min_stars[1]) is the chain answer. */
    {
      type: "reveal",
      narr: t(E,
        "🔹 STEP 3 — pick the answer from the LAST cell. Whatever star this cell would 'pass on' goes off the grid anyway, so both options are valid. Take the smaller. If even the smaller is ❌, the whole path is impossible (-1).",
        "🔹 3 단계 — 마지막 칸에서 답 고르기. 마지막 칸이 별을 보내든 말든 어차피 사진 밖이라 상관없음. 그러니 두 옵션 다 OK, 더 작은 쪽 = 답. 그것마저 ❌ 면 이 별 길은 못 만듦 (-1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🎯 {t(E, "Last cell: pick the smaller min_stars", "마지막 칸: 더 작은 min_stars 선택")}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", marginBottom: 10 }}>
            <div style={{ background: "#fff", border: "2px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "min_stars[0]", "min_stars[0]")}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#312e81" }}>2</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{t(E, "don't pass star out", "별 안 보냄")}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#4f46e5" }}>vs</div>
            <div style={{ background: "#fff", border: "2px solid #a5b4fc", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>{t(E, "min_stars[1]", "min_stars[1]")}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#312e81" }}>3</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 4 }}>{t(E, "pass star out", "별 보냄")}</div>
            </div>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#14532d", marginBottom: 8 }}>
            ✅ path_min = min(2, 3) = 2
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#78350f", lineHeight: 1.6 }}>
            💡 {t(E,
              "Different paths don't share cells → total = sum of every path's path_min. If any path is ❌ → -1.",
              "별 길끼리 서로 칸 안 겹침 → 총 답 = 모든 별 길의 path_min 합. 한 길이라도 ❌ 면 → -1.")}
          </div>
        </div>),
    },

    /* 2-4.6 — Hand-trace example: chain G→W→G→G. */
    {
      type: "reveal",
      narr: t(E,
        "🎯 All 3 steps in action — hand-trace the path [G, W, G, G]. You can replay each row in the live sim above (preset 'G→W→G→G'). Final answer = 2.",
        "🎯 1+2+3 단계를 한 별 길에 다 적용 — [G, W, G, G] 손으로 풀어보기. 위 시뮬에서 프리셋 'G→W→G→G' 로 줄마다 확인 가능. 답 = 2."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              ✍️ {t(E, "Hand-trace: path [G, W, G, G]", "손-trace: 별 길 [G, W, G, G]")}
            </div>
          </div>

          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <thead>
                <tr style={{ background: "#eef2ff", color: "#312e81" }}>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "step", "단계")}</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>letter</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[0]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>min_stars[1]</th>
                  <th style={{ padding: "6px 10px", border: "1px solid #c7d2fe" }}>{t(E, "how", "방법")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>0</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "First cell. G → 1 original star here, can keep or pass on → min_stars=[1,1].",
                          "첫 칸. G → 원래 별 1 개, 안 보냄/보냄 둘 다 OK → min_stars=[1,1].")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fff", fontWeight: 700 }}>W</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>1</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#fee2e2", color: "#dc2626", fontWeight: 700 }}>❌</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "W: no star, no incoming. Use prev 'don't pass' (=1) → new_min_stars[0]=1. W can't pass on → new_min_stars[1]=❌.",
                          "W: 별 없음, 들어온 별 없음. 이전 '안 보냄' (=1) 사용 → new_min_stars[0]=1. W 는 보낼 수 없음 → new_min_stars[1]=❌.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G case (a) — original ★ here: prev 'don't pass'=1 → +1 star → new_min_stars=[2,2]. G case (b) — moved-in: prev 'pass'=❌ skip.",
                          "G 경우 (a) — 원래 별 있음: 이전 '안 보냄'=1 → +1 별 → new_min_stars=[2,2]. G 경우 (b) — 들어온 별: 이전 '보냄'=❌ 스킵.")}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center" }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#cbd5e1", fontWeight: 700 }}>G</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>2</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", textAlign: "center", background: "#dcfce7", color: "#15803d", fontWeight: 700 }}>3</td>
                  <td style={{ padding: "6px 10px", border: "1px solid #c7d2fe", fontSize: 10.5 }}>
                    {t(E, "G case (a): prev 'don't pass'=2 → +1 = 3 → new_min_stars=[3,3]. G case (b): prev 'pass'=2 → no new ★ → new_min_stars[0]=min(3,2)=2. Final new_min_stars=[2,3].",
                          "G 경우 (a): 이전 '안 보냄'=2 → +1 = 3 → new_min_stars=[3,3]. G 경우 (b): 이전 '보냄'=2 → 새 별 없음 → new_min_stars[0]=min(3,2)=2. 최종 new_min_stars=[2,3].")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 14, fontWeight: 800, color: "#14532d" }}>
            ✅ {t(E, "Path answer = min(min_stars[0], min_stars[1]) = min(2, 3) = 2",
                    "별 길 답 = min(min_stars[0], min_stars[1]) = min(2, 3) = 2")}
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
            {t(E, "Scroll back to the live simulator (preset 'G→W→G→G') — values should match exactly.",
                  "위 시뮬 (프리셋 'G→W→G→G') 로 돌아가서 값이 정확히 같은지 확인해 봐요.")}
          </div>
        </div>),
    },

    /* 2-5 — Full code. (Edge case for stars-don't-move appears inline as a brief `if` branch;
       no separate slide needed, similar to how we simplified EMPTY/❌.)
       Note: sections[5] = Full code, after sections were split (4 → 4a + 4b). */
    sectionStep(sections[5], t(E,
      "Everything stitched together. You'll spot a tiny `if right == 0 and down == 0:` branch near the top — that's the trivial 'stars don't move → just count G+B' shortcut.",
      "전부 합친 코드. 위쪽에 `if right == 0 and down == 0:` 짧은 분기 하나 — '별 안 움직이면 G+B 그냥 세기' 지름길.")),

    /* 2-6 — Sample 2 end-to-end walkthrough (general A,B case) */
    {
      type: "reveal",
      narr: t(E,
        "Final check: let's run the WHOLE algorithm on a fresh example, end to end. 3×3 grid, stars move right 1, down 1. Watch how the 5 steps come together into one final answer.",
        "마지막 확인: 새 예시로 알고리즘 전체를 처음부터 끝까지 돌려봐요. 3×3 사진, 별 이동: 오른쪽 1, 아래 1. 5 단계가 어떻게 모여서 답 하나 나오는지 봐요."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f46e5" }}>
              🔭 {t(E, "End-to-end: 3×3, stars move right 1, down 1", "전체 흐름: 3×3, 별 이동 오른쪽 1, 아래 1")}
            </div>
          </div>

          {/* Grid display */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 48px)", gap: 4 }}>
              {[
                ["G", "W", "W"],
                ["W", "G", "W"],
                ["W", "W", "G"],
              ].flatMap((row, r) => row.map((letter, c) => {
                const bg = letter === "W" ? "#fff" : letter === "G" ? "#cbd5e1" : "#1e293b";
                const fg = letter === "B" ? "#fff" : "#1e293b";
                return (
                  <div key={`${r}-${c}`} style={{
                    width: 48, height: 48, background: bg, color: fg,
                    border: `1.5px solid ${C.border}`, borderRadius: 6,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{letter}</div>
                    <div style={{ fontSize: 9, color: letter === "B" ? "#cbd5e1" : "#64748b", marginTop: 1 }}>({r},{c})</div>
                  </div>
                );
              }))}
            </div>
          </div>

          {/* Steps table */}
          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, lineHeight: 1.6 }}>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 1-2", "1-2 단계")}:</b> {t(E, "Read input → stars do move → general case.", "입력 받기 → 별이 움직임 → 일반 경우로 진행.")}
            </div>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 3 (group cells):", "3 단계 (칸 묶기):")}</b> {t(E, "5 paths total. Starts: row 0 + col 0.", "총 5 별 길. 시작점: 0 행 + 0 열.")}
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>
                {t(E, "• (0,0) → (1,1) → (2,2)  = G G G", "• (0,0) → (1,1) → (2,2)  = G G G")}<br/>
                {t(E, "• (0,1) → (1,2)  = W W", "• (0,1) → (1,2)  = W W")}<br/>
                {t(E, "• (0,2)  = W", "• (0,2)  = W")}<br/>
                {t(E, "• (1,0) → (2,1)  = W W", "• (1,0) → (2,1)  = W W")}<br/>
                {t(E, "• (2,0)  = W", "• (2,0)  = W")}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <b style={{ color: "#4f46e5" }}>{t(E, "Step 4 (count per group):", "4 단계 (묶음마다 별 세기):")}</b>
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>
                {t(E, "• G→G→G  →  path_min = 2  (one star travels 0→1→2)", "• G→G→G  →  path_min = 2  (별 1 개가 0→1→2 로 이동)")}<br/>
                {t(E, "• W→W  →  path_min = 0", "• W→W  →  path_min = 0")}<br/>
                {t(E, "• W  →  path_min = 0", "• W  →  path_min = 0")}<br/>
                {t(E, "• W→W  →  path_min = 0", "• W→W  →  path_min = 0")}<br/>
                {t(E, "• W  →  path_min = 0", "• W  →  path_min = 0")}
              </div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 6, padding: "6px 10px", marginTop: 8 }}>
              <b style={{ color: "#14532d" }}>{t(E, "Step 5 (sum):", "5 단계 (합치기):")}</b>{" "}
              <span style={{ color: "#14532d" }}>{t(E, "2 + 0 + 0 + 0 + 0 = ", "2 + 0 + 0 + 0 + 0 = ")}</span>
              <b style={{ color: "#14532d", fontSize: 14 }}>2</b>
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px dashed #fbbf24", borderRadius: 8, padding: "8px 12px", marginTop: 8, fontSize: 11, color: "#78350f", textAlign: "center", lineHeight: 1.5 }}>
            💡 {t(E,
              "If ANY chain had been ❌ (e.g., B at a corner with off-grid predecessor), the total would be -1 instead.",
              "어느 한 묶음이라도 ❌ 였다면 (예: 모서리에 B 가 있었으면) 답이 -1 이 됐을 거예요.")}
          </div>
        </div>
      ),
    },
  ];
}
