import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc15IsthmusSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: the example from the problem statement.
     4 4 0 2 3 5 3 1
   Pick K (1 or 2) and a position i, then check both walks:
   "going left K steps — always strictly down? / always strictly up?"
   ───────────────────────────────────────────────────────────── */
const DEMO_H = [4, 4, 0, 2, 3, 5, 3, 1];

const BW = 40, GAP = 8, LEFT = 10, BASE = 128;
const xOf = (idx) => LEFT + idx * (BW + GAP);
const cxOf = (idx) => xOf(idx) + BW / 2;
const hOf = (h) => 10 + h * 18;
const topOf = (h) => BASE - hOf(h);

function IsthmusPeakSim({ E }) {
  const H = DEMO_H;
  const N = H.length;
  const [K, setK] = useState(1);
  const [i, setI] = useState(5);

  // walk from i outward: dir = -1 (left) or +1 (right)
  const walk = (dir, cmp) => {
    const out = [];
    for (let s = 0; s < K; s++) {
      const a = i + dir * s, b = i + dir * (s + 1);
      if (b < 0 || b >= N) out.push({ a, b, ok: false, missing: true });
      else out.push({ a, b, ok: cmp(H[a], H[b]), missing: false });
    }
    return out;
  };
  const down = (x, y) => x > y;   // walking away from i we keep going DOWN
  const up = (x, y) => x < y;     // walking away from i we keep going UP

  const peakL = walk(-1, down), peakR = walk(+1, down);
  const valL = walk(-1, up), valR = walk(+1, up);
  const allOk = (arr) => arr.every((c) => c.ok);
  const isPeak = allOk(peakL) && allOk(peakR);
  const isValley = !isPeak && allOk(valL) && allOk(valR);
  const noRoom = i - K < 0 || i + K >= N;

  const leftLo = Math.max(0, i - K);
  const rightHi = Math.min(N - 1, i + K);
  const inWin = (idx) => idx >= leftLo && idx <= rightHi;

  const linePts = (dir) => {
    const pts = [];
    for (let s = 0; s <= K; s++) {
      const idx = i + dir * s;
      if (idx < 0 || idx >= N) break;
      pts.push(`${cxOf(idx)},${topOf(H[idx])}`);
    }
    return pts.length >= 2 ? pts.join(" ") : null;
  };

  const stepChip = (c, k) => (
    <span key={k} style={{
      ...NW, display: "inline-flex", alignItems: "center", gap: 3,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
      padding: "2px 6px", borderRadius: 6, marginRight: 4, marginBottom: 4,
      border: `1px solid ${c.missing ? "#fca5a5" : c.ok ? "#86efac" : "#fca5a5"}`,
      background: c.missing ? "#fef2f2" : c.ok ? "#f0fdf4" : "#fef2f2",
      color: c.missing ? "#b91c1c" : c.ok ? "#15803d" : "#b91c1c",
    }}>
      {c.missing
        ? t(E, "no land ✗", "땅 없음 ✗")
        : `${H[c.a]} > ${H[c.b]} ${c.ok ? "✓" : "✗"}`}
    </span>
  );
  const stepChipUp = (c, k) => (
    <span key={k} style={{
      ...NW, display: "inline-flex", alignItems: "center", gap: 3,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
      padding: "2px 6px", borderRadius: 6, marginRight: 4, marginBottom: 4,
      border: `1px solid ${c.missing ? "#fca5a5" : c.ok ? "#86efac" : "#fca5a5"}`,
      background: c.missing ? "#fef2f2" : c.ok ? "#f0fdf4" : "#fef2f2",
      color: c.missing ? "#b91c1c" : c.ok ? "#15803d" : "#b91c1c",
    }}>
      {c.missing
        ? t(E, "no land ✗", "땅 없음 ✗")
        : `${H[c.a]} < ${H[c.b]} ${c.ok ? "✓" : "✗"}`}
    </span>
  );

  const verdict = isPeak
    ? { emoji: "🏔️", label: t(E, `order-${K} peak`, `order-${K} 봉우리`), bg: "#dcfce7", bd: "#86efac", fg: "#15803d" }
    : isValley
      ? { emoji: "🏕️", label: t(E, `order-${K} valley`, `order-${K} 골짜기`), bg: "#dbeafe", bd: "#93c5fd", fg: "#1d4ed8" }
      : { emoji: "—", label: t(E, "neither", "아무것도 아니에요"), bg: "#f1f5f9", bd: "#cbd5e1", fg: "#64748b" };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          ⛰️ {t(E, "Walk K steps to each side", "양쪽으로 K칸 걸어보기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line" }}>
          {t(E,
            "This is the isthmus from the problem statement: 4 4 0 2 3 5 3 1. Pick K, then move the marker. From the marked land we walk K steps to the left and K steps to the right — and ask whether we are always going strictly down (peak) or always strictly up (valley).",
            "문제 설명에 나온 지협이에요 — 4 4 0 2 3 5 3 1.\nK를 고르고 표시를 옮겨 봐요.\n표시된 땅에서 왼쪽으로 K칸, 오른쪽으로 K칸 걸어가요.\n계속 내려가면 봉우리, 계속 올라가면 골짜기예요.")}
        </div>

        {/* controls */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#1e3a8a", fontWeight: 700 }}>K =</span>
            {[1, 2].map((v) => (
              <button key={v} onClick={() => setK(v)} style={{
                width: 30, height: 28, borderRadius: 7, fontSize: 13, fontWeight: 800, cursor: "pointer",
                border: K === v ? "2px solid #2563eb" : "1px solid #93c5fd",
                background: K === v ? "#2563eb" : "#fff", color: K === v ? "#fff" : "#1e3a8a",
              }}>{v}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={() => setI(Math.max(0, i - 1))} style={navBtn}>◀</button>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#1d4ed8", minWidth: 74, textAlign: "center" }}>
              i = {i} (h={H[i]})
            </span>
            <button onClick={() => setI(Math.min(N - 1, i + 1))} style={navBtn}>▶</button>
          </div>
        </div>

        {/* jump-to-the-three-cases-in-the-statement */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 11.5, color: C.dim, fontWeight: 600, alignSelf: "center" }}>
            {t(E, "cases from the statement:", "문제 설명에 나온 장면:")}
          </span>
          <button onClick={() => { setI(5); setK(1); }} style={caseBtn}>{t(E, "height 5, K=1", "높이 5, K=1")}</button>
          <button onClick={() => { setI(5); setK(2); }} style={caseBtn}>{t(E, "height 5, K=2", "높이 5, K=2")}</button>
          <button onClick={() => { setI(2); setK(1); }} style={caseBtn}>{t(E, "height 0, K=1", "높이 0, K=1")}</button>
          <button onClick={() => { setI(2); setK(2); }} style={caseBtn}>{t(E, "height 0, K=2", "높이 0, K=2")}</button>
          <button onClick={() => { setI(7); setK(1); }} style={caseBtn}>{t(E, "last land, K=1", "마지막 땅, K=1")}</button>
        </div>

        {/* the isthmus as bars */}
        <div style={{ background: "#fff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "8px 4px", marginBottom: 10, overflowX: "auto" }}>
          <svg viewBox="0 0 396 160" style={{ width: "100%", minWidth: 340, display: "block" }}>
            {/* sea level */}
            <line x1={4} y1={BASE} x2={392} y2={BASE} stroke="#cbd5e1" strokeWidth="1.5" />
            {H.map((h, idx) => {
              const isCur = idx === i;
              const win = inWin(idx) && !isCur;
              return (
                <g key={idx}>
                  <rect
                    x={xOf(idx)} y={topOf(h)} width={BW} height={hOf(h)} rx={4}
                    fill={isCur ? "#2563eb" : win ? "#93c5fd" : "#e2e8f0"}
                    stroke={isCur ? "#1d4ed8" : win ? "#60a5fa" : "#cbd5e1"} strokeWidth="1"
                  />
                  <text x={cxOf(idx)} y={topOf(h) - 5} textAnchor="middle"
                    fontSize="13" fontWeight="700" fill={isCur ? "#1d4ed8" : win ? "#2563eb" : "#94a3b8"}>{h}</text>
                  <text x={cxOf(idx)} y={BASE + 14} textAnchor="middle" fontSize="10" fill="#94a3b8">i={idx}</text>
                </g>
              );
            })}
            {/* the two walks */}
            {[-1, 1].map((dir) => {
              const pts = linePts(dir);
              if (!pts) return null;
              return <polyline key={dir} points={pts} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" />;
            })}
            {/* marker */}
            <text x={cxOf(i)} y={topOf(H[i]) - 20} textAnchor="middle" fontSize="14">▼</text>
            <text x={cxOf(i)} y={BASE + 28} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">
              {t(E, "here", "여기")}
            </text>
          </svg>
        </div>

        {/* verdict — 2026-09-17: 그래프 바로 아래로 올렸다. 전에는 두 판정 박스 뒤,
           그래프에서 451px 떨어진 자리에 있어서 한 걸음 옮길 때마다 눈이 두 군데를
           쫓아야 했다. 바뀌는 자리는 한 곳에 모은다. */}
        <div style={{
          padding: "8px 12px", borderRadius: 10, textAlign: "center", fontSize: 13, fontWeight: 800,
          background: verdict.bg, border: `1px solid ${verdict.bd}`, color: verdict.fg, ...KA,
        }}>
          {verdict.emoji} i = {i} (h = {H[i]}) → {verdict.label}
        </div>

        {noRoom && (
          <div style={{ marginTop: 8, fontSize: 11.5, color: "#b91c1c", textAlign: "center", ...KA }}>
            {t(E,
              "There is no land K steps away on one side, so this piece cannot qualify at all.",
              "한쪽에 K칸만큼 땅이 없어요. 그래서 이 땅은 아예 자격이 없어요.")}
          </div>
        )}

        {/* 판정의 근거 — 걸음마다의 비교.
           2026-09-17: 전에는 봉우리·골짜기 두 박스가 늘 같이 떠서 절반은 언제나 ✗ 였다.
           판정이 난 자리에서는 그 판정의 근거만 펴고, 둘 다 아닐 때만 둘을 같이 편다. */}
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, margin: "10px 0 4px", ...KA }}>
          {t(E, "why — one step at a time", "왜 그런가요 — 한 걸음씩 확인")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isPeak || isValley ? "1fr" : "1fr 1fr", gap: 8 }}>
          {!isValley && (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 10px", ...KA }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed", marginBottom: 6 }}>
                🏔️ {t(E, "peak? always going DOWN", "봉우리? 계속 내려가나요")}
              </div>
              <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 3 }}>← {t(E, "left K steps", "왼쪽 K칸")}</div>
              <div>{peakL.map(stepChip)}</div>
              <div style={{ fontSize: 10.5, color: C.dim, margin: "3px 0" }}>→ {t(E, "right K steps", "오른쪽 K칸")}</div>
              <div>{peakR.map(stepChip)}</div>
            </div>
          )}
          {!isPeak && (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 10px", ...KA }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#0891b2", marginBottom: 6 }}>
                🏕️ {t(E, "valley? always going UP", "골짜기? 계속 올라가나요")}
              </div>
              <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 3 }}>← {t(E, "left K steps", "왼쪽 K칸")}</div>
              <div>{valL.map(stepChipUp)}</div>
              <div style={{ fontSize: 10.5, color: C.dim, margin: "3px 0" }}>→ {t(E, "right K steps", "오른쪽 K칸")}</div>
              <div>{valR.map(stepChipUp)}</div>
            </div>
          )}
        </div>

        {/* 2026-09-17: 여기 있던 고정 문단이 바로 다음 1-4 퀴즈의 답("높이 0은 K=2에서는
           골짜기가 아니다 — 왼쪽 두 번째 걸음이 4 → 4 라서")을 버튼을 누르기도 전에
           그대로 말하고 있었다. 퀴즈 해설과 문장까지 같았다. 지우고, 눌러 볼 이유만 남긴다. */}
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, whiteSpace: "pre-line", ...KA }}>
          {t(E,
            "Press the case buttons, then flip K between 1 and 2. Some verdicts change.",
            "장면 버튼을 눌러 보고 K도 1과 2로 바꿔 봐요.\n판정이 달라지는 땅이 있어요.")}
        </div>
      </div>
    </div>
  );
}

const navBtn = {
  width: 30, height: 28, borderRadius: 7, border: "1px solid #93c5fd", background: "#fff",
  color: "#1e3a8a", fontSize: 13, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};
const caseBtn = {
  borderRadius: 999, border: "1px solid #bfdbfe", background: "#fff", color: "#1d4ed8",
  fontSize: 11.5, fontWeight: 700, padding: "3px 10px", cursor: "pointer", wordBreak: "keep-all",
};

/* 2026-09-11: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 죽은 복제본이었다(저장소 67곳 중 실제로 쓰는 건 3곳뿐).
   살아 있는 코드는 components.jsx 의 단계별 배열이다. 둘을 같이 두면 조용히 어긋난다 —
   실제로 오늘 입출력 방식을 고칠 때 이쪽만 옛 모양으로 남아 검사기에 걸렸다. */

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Count pieces that strictly rise or fall for K steps on both sides.",
        "양옆으로 K칸 계속 내려가는 땅과 계속 올라가는 땅을 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"⛰️"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>Isthmus</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "A piece you always walk strictly down from, K steps each way, is an order-K peak;\nstrictly up is an order-K valley.\nThe tribe built a settlement on every one of them. Count the settlements.",
                "양옆으로 K칸 계속 내려가는 땅을 order-K 봉우리,\n계속 올라가는 땅을 order-K 골짜기라고 불러요.\n부족은 그런 땅마다 마을을 지었어요. 마을 수를 세요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The isthmus is divided into ", "지협(바다 사이에 좁고 길게 이어진 땅)은 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N pieces of land", "N개의 땅")}</b>
                  {t(E, "; piece i has height ", "으로 나뉘고, i번째 땅의 높이는 ")}
                  <b style={{ color: "#2563eb" }}>H<sub>i</sub></b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "order-K peak", "order-K 봉우리")}</b>
                  {t(E,
                    ": walking from i to i+K and from i to i−K, you are always going strictly downwards.",
                    ": i 에서 i+K 로, 그리고 i 에서 i−K 로 걸어갈 때 계속 내려가기만 하는 땅이에요. 중간에 같은 높이가 한 번이라도 나오면 안 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "order-K valley", "order-K 골짜기")}</b>
                  {t(E,
                    ": the same, but always going strictly upwards.",
                    ": 같은데, 계속 올라가기만 하는 땅이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "To qualify, a piece must have ", "자격을 얻으려면 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "at least K pieces of land on both sides", "양쪽에 적어도 K개의 땅")}</b>
                  {t(E, ".", "이 있어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of settlements", "마을의 개수")}</b>
                  {t(E, " — one on every order-K peak and every order-K valley.", "를 출력해요 — 모든 order-K 봉우리와 골짜기마다 하나씩이에요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Careful: N, K and the heights come on three separate lines. N can be as large as 1,000,000.",
        "N, K, 높이가 각각 다른 줄로 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0f9ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.8 }}>
              <div>• {t(E, "line 1", "1번째 줄")} — <b>N</b>, <span style={NW}>1 ≤ N ≤ 1,000,000</span></div>
              <div>• {t(E, "line 2", "2번째 줄")} — <b>K</b>, <span style={NW}>1 ≤ K ≤ N − 1</span></div>
              <div>• {t(E, "line 3", "3번째 줄")} — <b>N {t(E, "heights", "개의 높이")}</b> H<sub>i</sub>, <span style={NW}>0 ≤ H<sub>i</sub> ≤ 1,000,000</span></div>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 8, lineHeight: 1.6 }}>
              {t(E,
                "Note: about 50% of the total score comes from tests with 1 ≤ N ≤ 10,000.",
                "전체 배점의 약 50%는 1 ≤ N ≤ 10,000 인 테스트에서 나와요.")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, marginTop: 8, lineHeight: 1.6 }}>
              📤 {t(E, "Output — a single integer, the number of settlements built.",
                       "출력 — 지어진 마을의 개수를 정수 하나로 출력해요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample input", "샘플 입력")}</div>
              <div>6</div>
              <div>1</div>
              <div style={{ overflowX: "auto" }}>7 4 0 5 1 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#93c5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample output", "샘플 출력")}</div>
              <div style={{ fontWeight: 800 }}>3</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA }}>
            {t(E,
              "With K = 1 there is one order-1 peak (height 5) and two order-1 valleys (heights 0 and 1), so 3 settlements.",
              "K = 1 일 때 order-1 봉우리가 1개(높이 5) 있어요.\norder-1 골짜기는 2개(높이 0, 높이 1) 있어요.\n그래서 마을은 3개예요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Walk it yourself. Change K, move the marker, and watch which pieces qualify.",
        "직접 걸어봐요. K를 바꾸고 표시를 옮기면서 어떤 땅이 자격을 얻는지 봐요."),
      content: <IsthmusPeakSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "In 4 4 0 2 3 5 3 1, the height 0 is an order-1 valley. Now check order-2: walking left it goes 0 → 4 → 4.",
        "이번엔 order-2 를 확인해 봐요. 왼쪽은 0 → 4 → 4 예요."),
      question: t(E,
        "In 4 4 0 2 3 5 3 1, is the piece of height 0 an order-2 valley?",
        "4 4 0 2 3 5 3 1 에서 높이 0인 땅은 order-2 골짜기일까요?"),
      options: [
        t(E, "No", "아니에요"),
        t(E, "Yes", "맞아요"),
        t(E, "It depends on the right side only", "오른쪽만 보면 정해져요"),
      ],
      correct: 0,
      explain: t(E,
        "Walking left, the first step 0 → 4 goes up, but the next step is 4 → 4, which is not strictly up. So it cannot cover 2 steps to the left.",
        "왼쪽으로 한 칸(4)은 올라가요.\n그런데 그 다음 칸도 4 라서 더 올라가지 않아요.\n왼쪽으로 2칸을 못 채워요."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "Checking K steps on both sides of every position is N×K work — up to about 10^12. Instead, carry the answer over from the neighbour: the run length at i is the run length at i−1 plus one.",
        "매번 K칸을 다시 세지 말고 옆 칸의 답을 이어받아요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: re-check K steps at every position", "느림: 위치마다 K칸을 매번 다시 확인")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E,
                  "For each of the N pieces, walk K steps left and K steps right. That is N × K work. With N = 1,000,000 and K almost as large, that is up to about 10^12 operations — time limit exceeded.",
                  "N개의 땅마다 왼쪽 K칸, 오른쪽 K칸을 걸어가요. 그러면 N × K 번 계산해요. N 이 1,000,000 이고 K 도 그만큼 크면 계산이 1 조 번쯤 돼요. 시간 초과가 나요.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: carry the run length over from the neighbour", "빠름: 옆 칸의 길이를 이어받기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 6 }}>
                {t(E,
                  "\"How far can I keep going down to the left from i?\" — do not count it again. If H[i] > H[i−1], the answer is the neighbour's answer plus one; otherwise it is 0.",
                  "\"i 에서 왼쪽으로 몇 칸이나 계속 내려갈 수 있나?\" 이걸 다시 세지 않아요. H[i] > H[i−1] 이면 옆 칸의 답에 1을 더하고, 아니면 0이에요.")}
              </div>
              <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: "8px 12px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7 }}>
                <div>downL[i] = downL[i-1] + 1 <span style={{ color: "#8b949e" }}>if H[i] &gt; H[i-1] else 0</span></div>
                <div>upL[i]   = upL[i-1]   + 1 <span style={{ color: "#8b949e" }}>if H[i] &lt; H[i-1] else 0</span></div>
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginTop: 8 }}>
                {t(E,
                  "Do the same from the back for the right side (downR, upR). One sweep each — N steps per direction, 4N in total.",
                  "오른쪽 방향(downR, upR)은 뒤에서부터 똑같이 해요. 방향마다 한 번씩만 훑으니 N번이에요. 방향이 4개라 모두 합쳐 4N번이에요.")}
              </div>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
                ✅ {t(E, "Then the judgement is one comparison", "그러면 판정은 비교 한 번")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E,
                  "order-K peak ⟺ downL[i] ≥ K and downR[i] ≥ K.  order-K valley ⟺ upL[i] ≥ K and upR[i] ≥ K.",
                  "order-K 봉우리 ⟺ downL[i] ≥ K 이고 downR[i] ≥ K.  order-K 골짜기 ⟺ upL[i] ≥ K 이고 upR[i] ≥ K.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.",
        "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc15IsthmusSections(E),
    },
  ];
}
