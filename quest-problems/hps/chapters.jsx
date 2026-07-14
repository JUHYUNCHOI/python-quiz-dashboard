import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { getHpsSections, HpsCaseSimulator, ChartReadingTour, WinningRulesBanner, CodeSectionView, BitsLab, BitmaskColSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   NSpeedSim — interactive bar showing how Brute (N²) and Smart (N)
   wall-clock times grow as N grows. The student drags the slider
   from 100 → 5000 and watches Brute's bar shoot off the chart
   while Smart's bar barely moves. A 2-second judge limit is drawn
   as a red dashed line; bars that cross it are marked ❌ / TLE.
   This replaces the static "Smart 알고리즘 복잡도" slide that
   only ever showed one fixed N=3000 column.
   ═══════════════════════════════════════════════════════════════ */
function NSpeedSim({ E }) {
  const [N, setN] = useState(1000);
  const M = N; // worst-case M ≈ N
  const bruteOps = M * N * N;
  const smartOps = M * N;
  // Realistic ops/sec rates (typical competitive-programming ballpark).
  const CPP_OPS = 1e9;
  const PY_OPS = 1e7;
  const LIMIT = 2; // judge time limit in seconds
  // Format huge numbers compactly.  10^9+ → scientific.
  const fmtOps = (n) => {
    if (n < 1e6) return n.toLocaleString();
    if (n < 1e9) return (n / 1e6).toFixed(1) + " M";
    return (n / 1e9).toFixed(1) + " B";
  };
  const fmtSec = (s) => {
    if (s < 0.01) return "<0.01";
    if (s < 1) return s.toFixed(2);
    if (s < 60) return s.toFixed(1);
    if (s < 3600) return (s / 60).toFixed(1) + "m";
    return (s / 3600).toFixed(1) + "h";
  };
  // Bar = how much of the time limit this run uses.  Capped at 110%
  // visually but the label still says the real number so kids see
  // "wow, way over".
  const TimeBar = ({ sec, lang }) => {
    const pct = Math.min(110, (sec / LIMIT) * 100);
    const tle = sec > LIMIT;
    const color = tle ? "#dc2626" : sec > LIMIT * 0.5 ? "#f59e0b" : "#16a34a";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 38, fontSize: 10.5, color: C.dim, fontWeight: 600 }}>{lang}</div>
        <div style={{
          flex: 1, height: 14, background: "#f1f5f9",
          borderRadius: 4, position: "relative", overflow: "hidden",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: pct + "%", background: color,
            transition: "width 200ms, background 200ms",
          }} />
          {/* 2-sec limit marker — always visible */}
          <div style={{
            position: "absolute", left: "calc(100% / 1.1)", top: -2, bottom: -2,
            width: 0, borderLeft: "2px dashed #dc2626",
          }} title="2-sec limit" />
        </div>
        <div style={{
          width: 88, textAlign: "right", fontSize: 11, fontWeight: 700,
          fontFamily: "'JetBrains Mono',monospace",
          color: tle ? "#dc2626" : "#15803d",
        }}>
          {fmtSec(sec)}{t(E, "s", "초")} {tle ? "❌" : "✅"}
        </div>
      </div>
    );
  };
  const Section = ({ title, ops, accent }) => (
    <div style={{
      flex: 1, background: "#fff", border: `1.5px solid ${accent}33`,
      borderRadius: 8, padding: "10px 12px",
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: accent, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E, "ops", "연산")}:{" "}
        <span style={{ fontFamily: "'JetBrains Mono',monospace", color: C.text, fontWeight: 700 }}>{fmtOps(ops)}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <TimeBar sec={ops / CPP_OPS} lang="C++" />
        <TimeBar sec={ops / PY_OPS} lang="Py" />
      </div>
    </div>
  );
  const fasterBy = bruteOps / smartOps;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0891b2", textAlign: "center", marginBottom: 8 }}>
        🎚️ {t(E, "Drag N — watch Brute explode, Smart stay flat",
                "N 을 드래그 — Brute 는 폭발, Smart 는 거의 그대로")}
      </div>
      {/* Slider */}
      <div style={{
        background: "#f0f9ff", border: "1px solid #7dd3fc", borderRadius: 10,
        padding: "10px 14px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>
            N = M
          </span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: "#0c4a6e" }}>
            {N.toLocaleString()}
          </span>
        </div>
        <input
          type="range" min={100} max={5000} step={100} value={N}
          onChange={e => setN(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.dim, marginTop: 2 }}>
          <span>100</span>
          <span style={{ color: "#dc2626", fontWeight: 700 }}>3000 ← {t(E, "actual problem", "이 문제 최악")}</span>
          <span>5000</span>
        </div>
      </div>
      {/* Brute vs Smart side-by-side */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Section title={t(E, "Brute  (M × N²)", "Brute  (M × N²)")} ops={bruteOps} accent="#dc2626" />
        <Section title={t(E, "Smart  (M × N)", "Smart  (M × N)")} ops={smartOps} accent="#16a34a" />
      </div>
      {/* The "× faster" headline */}
      <div style={{
        background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10,
        padding: "10px 12px", textAlign: "center", fontSize: 12.5, color: "#15803d",
      }}>
        Smart {t(E, "is", "가")}{" "}
        <b style={{ fontSize: 16 }}>{Math.round(fasterBy).toLocaleString()}×</b>{" "}
        {t(E, "fewer ops than Brute at this N.",
              "Brute 보다 적게 일함 (이 N 에서).")}
      </div>
      {/* Read-the-bars hint */}
      <div style={{
        marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.55,
      }}>
        {t(E,
          "Red dashed line = 2-sec judge limit.  Green ✅ fits, red ❌ TLEs.  Try N = 500, 1500, 3000, 5000.",
          "빨간 점선 = 채점기 2 초 제한. 초록 ✅ 통과, 빨강 ❌ TLE. 슬라이드: 500, 1500, 3000, 5000 시도.")}
      </div>
    </div>
  );
}

export function makeHpsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A Rock-Paper-Scissors variant — Bessie wants to count how many 2-card hands of hers always beat Elsie's hand.",
        "가위바위보 변형 — Bessie가 Elsie를 무조건 이기는 카드 2 장 조합이 몇 개인지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, fontSize: 30, marginBottom: 4, lineHeight: 1 }}>
              <span style={{ color: "#2563eb" }}>●</span>
              <span style={{ color: "#7c3aed" }}>■</span>
              <span style={{ color: "#ea580c" }}>▲</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Hoof Paper Scissors Minus One</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2025 Bronze #1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "이 게임에는 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N kinds of cards", "N 종류의 카드")}</b>
                  {t(E, " — numbered 1..N. A ", " 가 있어요 — 1..N 번호. ")}
                  <b style={{ color: "#059669" }}>{t(E, "chart", "차트")}</b>
                  {t(E, " tells us, for each pair of card types, which one beats which.",
                        " 가 어떤 카드가 어떤 카드를 이기는지 알려줘요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "How a round works: ", "한 판 진행: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each cow lays out 2 cards face-up", "각 소가 카드 2 장을 앞면이 보이게 내려놔요")}</b>
                  {t(E, ". All 4 cards are visible. Then both cows ", ". 4 장 다 보여요. 그 다음 두 소가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "SIMULTANEOUSLY", "동시에")}</b>
                  {t(E, " each pick ONE of their own two to play — neither sees the other's pick. The card that beats the other wins.",
                        " 자기 2 장 중 1 장을 골라 내요 — 서로의 선택을 못 봐요. 이기는 카드를 낸 쪽이 승리.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Elsie's hand is given M times. For each one, count Bessie's hands (ordered pairs) where ",
                        "Elsie 의 패 가 M 번 주어져요. 각 패 마다, ")}
                  <b style={{ color: "#15803d" }}>{t(E, "Elsie can play whatever card she wants and Bessie still wins",
                                                          "Elsie 가 무슨 카드를 내도 Bessie 가 이기는")}</b>
                  {t(E, ". (Bessie just needs ONE card in her hand that beats BOTH of Elsie's cards — she plays that one and is safe either way.) Output the count.",
                        " Bessie 패 의 개수를 출력. (Bessie 한테 Elsie 의 두 카드를 모두 이기는 카드 하나만 있으면 됨 — 그 카드를 내면 Elsie 가 뭘 내든 이김.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11.5, color: C.dim, lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0 }}>📌</span>
                <div>
                  {t(E, "A 'hand' is an ORDERED pair (a, b) — slot 1 and slot 2 are different positions, and the two cards CAN be the same. For N = 3 there are 3² = 9 possible hands.",
                        "'패' 는 순서쌍 (a, b) — 자리 1 과 자리 2 는 서로 다른 자리이고, 같은 카드 두 장도 OK. N = 3 이면 패 는 3² = 9 가지.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sample input / output format — real USACO sample
    {
      type: "reveal",
      narr: t(E,
        "Real USACO sample: 3 card types, 3 Elsie hands. The matchup chart is a TRIANGULAR matrix using W/L/D characters.",
        "실제 USACO 샘플: 3 종 카드, 3 개 Elsie 패. 승패 차트는 W/L/D 글자로 된 삼각 행렬."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 3
D
WD
LWD
1 2
2 3
1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`0
0
5`}
              </div>
            </div>
          </div>
          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              🔍 {t(E, "What each line means", "각 줄 의미")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", alignItems: "baseline" }}>
              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>3 3</code>
              <div>{t(E, "N = number of cards, M = number of Elsie's hands", "N = 카드 종류 수, M = Elsie 패 개수")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>D / WD / LWD</code>
              <div>
                {t(E, "matchup chart (next N lines, row ", "매치업 차트 (다음 N 줄, ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, " has ", " 행은 ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, " characters of W/L/D)", " 글자: W/L/D)")}
                <span style={{ marginLeft: 6, color: "#5b21b6", fontSize: 12 }}>
                  → {t(E, "see next page", "다음 페이지 참고")}
                </span>
              </div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 2</code>
              <div>{t(E, "Elsie's 1st hand: cards (1, 2)", "Elsie 의 첫 패: 카드 (1, 2)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>2 3</code>
              <div>{t(E, "Elsie's 2nd hand: cards (2, 3)", "Elsie 의 둘째 패: 카드 (2, 3)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 1</code>
              <div>{t(E, "Elsie's 3rd hand: cards (1, 1)", "Elsie 의 셋째 패: 카드 (1, 1)")}</div>
            </div>

            <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed #c4b5fd", fontSize: 12, color: "#5b21b6" }}>
              💡 {t(E, "For each of the 3 Elsie hands, output how many Bessie hands let her win no matter what Elsie plays.",
                       "Elsie 의 3 개 패 각각에 대해, Elsie 가 무엇을 내도 이기는 Bessie 패 개수를 출력.")}
            </div>
            <div style={{ marginTop: 6, fontSize: 10.5, color: C.dim, fontStyle: "italic" }}>
              {t(E, "📌 Cards are numbered 1..N (1-indexed).", "📌 카드 번호는 1..N (1-indexed).")}
            </div>
          </div>
        </div>),
    },

    // 1-3: How to read the W/L/D triangular matchup chart
    // 1-3: Read the chart cell-by-cell — winner → loser arrows
    {
      type: "reveal",
      narr: t(E,
        "Walk the chart cell by cell. Each cell shows winner → loser. Press ▶ to step through.",
        "차트 셀 하나씩 따라가요. 각 셀은 '이기는 카드 → 지는 카드' 표시. ▶ 눌러서 진행."),
      content: (<ChartReadingTour E={E} />),
    },

    // 1-4: Walk-through of Game 3 from sample (Elsie hand = (1, 1) → 5)
    {
      type: "reveal",
      narr: t(E,
        "Let's walk one of the sample games — Elsie holds (card 1, card 1).  What should Bessie do?",
        "샘플 게임 한 번 따라가 보자 — Elsie 가 (카드 1, 카드 1). Bessie 는 어떻게 응답해야 할까?"),
      content: (() => {
        const C1 = { glyph: "●", color: "#2563eb" };
        const C2 = { glyph: "■", color: "#7c3aed" };
        const C3 = { glyph: "▲", color: "#ea580c" };
        const Pill = ({ s, n, size = 22, bgTint = false }) => (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 8,
            border: `1.5px solid ${s.color}50`,
            background: bgTint ? `${s.color}10` : "#fff",
          }}>
            <span style={{ fontSize: size, color: s.color, lineHeight: 1 }}>{s.glyph}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{t(E, "card ", "카드 ")}{n}</span>
          </span>
        );
        const TryCol = ({ card, n, beats1, label }) => (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            padding: "10px 8px", borderRadius: 10,
            background: beats1 ? "#dcfce7" : "#fff",
            border: `1px solid ${beats1 ? "#16a34a" : "#e5e7eb"}`,
          }}>
            <Pill s={card} n={n} size={24} bgTint={beats1} />
            <div style={{ fontSize: 11, color: beats1 ? "#15803d" : C.dim, fontWeight: 700, textAlign: "center", lineHeight: 1.4 }}>
              {beats1
                ? t(E, "beats card 1 ✓", "카드 1 이김 ✓")
                : t(E, "doesn't beat card 1", "카드 1 못 이김")}
            </div>
            {label && <div style={{ fontSize: 10, color: "#15803d", fontWeight: 600 }}>{label}</div>}
          </div>
        );
        return (
          <div style={{ padding: 16 }}>
            <WinningRulesBanner E={E} />
            {/* Step 1: Elsie's hand */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>{t(E, "Elsie's hand (sample game 3)", "Elsie 의 패 (샘플 게임 3)")}</div>
              <div style={{ display: "flex", gap: 12, padding: "8px 14px", background: "#fee2e2", borderRadius: 10, border: "1px solid #fca5a5" }}>
                <Pill s={C1} n={1} size={24} />
                <Pill s={C1} n={1} size={24} />
              </div>
              <div style={{ fontSize: 11.5, color: "#7f1d1d", fontWeight: 700, marginTop: 4 }}>
                {t(E, "Both cards are card 1 — Bessie just needs ONE card that beats card 1.",
                      "두 카드 다 카드 1 — Bessie 는 카드 1 을 이기는 카드 하나만 필요.")}
              </div>
            </div>

            {/* Step 2: Try every card */}
            <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 600, textAlign: "center", marginBottom: 10 }}>
                {t(E, "Try every card 1..N — does it beat card 1?",
                      "카드 1..N 시험 — 카드 1 을 이기는가?")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <TryCol card={C1} n={1} beats1={false} />
                <TryCol card={C2} n={2} beats1={true} label={t(E, "this one!", "이거!")} />
                <TryCol card={C3} n={3} beats1={false} />
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#15803d", textAlign: "center", fontWeight: 700 }}>
                → {t(E, "Only card 2 beats card 1.", "카드 2 만 카드 1 이김.")}
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: 18, color: C.dim, margin: "0 0 8px" }}>↓</div>

            {/* Step 3: All 9 Bessie hands laid out in a 3×3 grid;
                highlight the ones with at least one card 2. */}
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#15803d", fontWeight: 600, textAlign: "center", marginBottom: 4 }}>
                {t(E, "All 9 Bessie hands (a, b) — green ones contain card 2",
                      "Bessie 패 9 가지 (a, b) 모두 — 초록 = 카드 2 가 들어 있는 패")}
              </div>
              <div style={{ fontSize: 11, color: C.dim, textAlign: "center", marginBottom: 10 }}>
                {t(E, "(rows = a / first card · columns = b / second card)",
                      "(행 = a / 첫째 카드 · 열 = b / 둘째 카드)")}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "32px repeat(3, 60px)",
                  gridAutoRows: "44px", gap: 0,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {/* header: empty + b labels */}
                  <div />
                  {[1, 2, 3].map((b) => (
                    <div key={`h${b}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: C.dim }}>
                      b={b}
                    </div>
                  ))}
                  {/* rows: a label + 3 cells */}
                  {[1, 2, 3].map((a) => (
                    <div key={`r${a}`} style={{ display: "contents" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6, fontSize: 11, fontWeight: 600, color: C.dim }}>
                        a={a}
                      </div>
                      {[1, 2, 3].map((b) => {
                        const hasDom = a === 2 || b === 2;
                        return (
                          <div key={`${a}-${b}`} style={{
                            margin: 3,
                            border: `1px solid ${hasDom ? "#16a34a" : "#cbd5e1"}`,
                            background: hasDom ? "#dcfce7" : "#fff",
                            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, fontWeight: 600,
                            color: hasDom ? "#15803d" : "#94a3b8",
                          }}>
                            ({a},{b}) {hasDom && <span style={{ marginLeft: 3, fontSize: 11 }}>✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px dashed #86efac", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#15803d" }}>
                {t(E, "Count the green cells: 5 hands win.", "초록 셀 세보면: 5 개 패 가 이김.")}
              </div>
            </div>

            {/* Step 4: Answer */}
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#16a34a", textAlign: "center" }}>
                {t(E, "answer = 5", "답 = 5")}
              </div>
              <div style={{ marginTop: 4, textAlign: "center", fontSize: 10.5, color: C.dim }}>
                {t(E, "Matches the sample's third output line.", "샘플 출력 셋째 줄과 일치.")}
              </div>
            </div>

            {/* Sidebar — what about other games? */}
            <div style={{ marginTop: 12, fontSize: 11, color: "#5b21b6", textAlign: "center", lineHeight: 1.55 }}>
              {t(E, "Games 1 (Elsie hand 1, 2) and 2 (hand 2, 3) — no card beats both Elsie cards → answer 0 each. Try them in the sim below.",
                    "게임 1 (Elsie 패 1, 2) 과 2 (패 2, 3) — 두 카드 다 이기는 카드 없음 → 둘 다 답 0. 아래 sim 에서 따라가요.")}
            </div>
          </div>
        );
      })(),
    },

    // 1-5: Interactive walk — both sample games (Elsie (1,2)→0 and (1,1)→5)
    {
      type: "reveal",
      narr: t(E,
        "Walk all 3 sample games step by step. ▶ to advance.",
        "샘플 3 게임 한 단계씩 따라가요. ▶ 눌러서 진행."),
      content: (<><WinningRulesBanner E={E} /><HpsCaseSimulator E={E} /></>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Quick check.",
        "간단 체크."),
      question: t(E,
        "Bessie = (card 2, card 1), Elsie = (card 1, card 1). Does Bessie always win?",
        "Bessie = (카드 2, 카드 1), Elsie = (카드 1, 카드 1). Bessie 가 무조건 이기나?"),
      options: [
        t(E, "Yes — card 2 beats both of Elsie's card 1's", "네 — 카드 2 가 Elsie 의 카드 1 두 장을 다 이김"),
        t(E, "No — card 1 doesn't beat card 1 (draw)", "아니 — 카드 1 은 카드 1 못 이김 (비김)"),
      ],
      correct: 0,
      explain: t(E,
        "Bessie plays card 2 — beats card 1 either way.",
        "Bessie 는 카드 2 를 내면 됨 — 카드 1 어느 쪽이든 다 이김."),
    },
    {
      type: "input",
      narr: t(E,
        "Your turn — count.",
        "직접 세요."),
      question: t(E,
        "Elsie = (card 2, card 3). How many of Bessie's 9 hands always win?",
        "Elsie 패 = (카드 2, 카드 3). Bessie 의 9 가지 패 중 무조건 이기는 패 는 몇 개?"),
      hint: t(E, "No single card beats both card 2 and card 3.",
                "카드 2 와 카드 3 둘 다 이기는 카드는 없어요."),
      answer: 0,
    },
  ];
}

export function makeHpsCh2(E, lang = "py") {
  return [
    // 2-1..2-5: WRITE — one section per chapter step. Each step shows
    // the cumulative code, the sample input with relevant lines lit up,
    // and a brief "why this way?" note. Single navigation level: chapter
    // prev/next walks all 5 sections naturally.
    // Steps 1-6: input + table + brute force code (sections 1-6)
    ...getHpsSections(E).slice(0, 6).map((sec, i) => ({
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: i === 0
        ? t(E, "Problem is clear — let's write the most natural solution first.  We'll grow it line by line.",
              "문제는 다 이해했으니 가장 자연스러운 풀이부터. 한 줄씩 쌓아갈게요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
    // Reality check: submit brute force → TLE on harder cases.
    // The "why both languages fail" math comes on the NEXT page; here we
    // just show the raw result.
    {
      type: "reveal",
      narr: t(E,
        "Brute is done — submit it.  The judge runs 12 test inputs against it.",
        "brute 코드 다 됐어. 제출! 채점기가 12 개 테스트 입력을 돌릴 거예요."),
      // (2026-07-14 검토: 이 스텝이 낡은 안내문 하나만 있는 '빈 화면'이었음 → 제출 순간 도식으로 채움.
      //  구체적 테스트 번호/시간은 확인된 바 없어 지어내지 않음 — 작은 입력 ✓ / 큰 입력 ⏰ 만.)
      content: (
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 14 }}>
            📮 {t(E, "Submitted — the judge starts running…", "제출 완료 — 채점기가 돌기 시작…")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 480, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12,
            }}>
              <span style={{ fontSize: 22 }}>✅</span>
              <div style={{ wordBreak: "keep-all" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#166534" }}>
                  {t(E, "Small inputs — pass", "작은 입력 — 통과")}
                </div>
                <div style={{ fontSize: 11.5, color: "#15803d", fontWeight: 600 }}>
                  {t(E, "Sample and small N finish instantly. Answers correct!",
                        "샘플·작은 N 은 순식간에 끝나요. 답도 다 맞아요!")}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", fontSize: 16, color: C.dim }}>↓</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12,
            }}>
              <span style={{ fontSize: 22 }}>⏰</span>
              <div style={{ wordBreak: "keep-all" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#991b1b" }}>
                  {t(E, "Big inputs — Time Limit Exceeded", "큰 입력 — 시간 초과 (TLE)")}
                </div>
                <div style={{ fontSize: 11.5, color: "#b91c1c", fontWeight: 600 }}>
                  {t(E, "When N and M get big, the judge cuts us off — too slow.",
                        "N 과 M 이 커지면 채점기가 끊어버려요 — 너무 느려서.")}
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 12, color: C.dim, fontWeight: 600, marginTop: 14, wordBreak: "keep-all" }}>
            {t(E, "Answers are right… speed is the problem. WHERE is it slow? →",
                  "답은 맞는데… 속도가 문제예요. 어디가 느린 걸까요? →")}
          </div>
        </div>),
    },
    // Why brute force fails — show the actual nested-for code with the
    // N² loop highlighted, then count operations.  Previously this page
    // was empty narration only, so students had no concrete pin for
    // "where does N² come from".
    {
      type: "reveal",
      narr: t(E,
        "…and the bigger inputs time out.  Where is brute spending all its work?  Look at the nested loop.",
        "…근데 큰 입력에서 시간 초과가 떠. brute 가 어디서 일을 그렇게 많이 하지? 안쪽 두 겹 for 를 같이 보자."),
      content: (() => {
        const codeLines = [
          "for _ in range(M):              # M queries (Elsie's hands)",
          "    s1, s2 = map(int, input().split())",
          "    s1 -= 1; s2 -= 1",
          "    count = 0",
          "    for a in range(N):          # ┐",
          "        for b in range(N):      # ├─ 이 두 줄이 N² !",
          "            if (beats[a][s1] and beats[a][s2]) or \\",
          "               (beats[b][s1] and beats[b][s2]):",
          "                count += 1",
          "    print(count)",
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
              🔍 {t(E, "Where N² hides", "N² 가 숨어있는 곳")}
            </div>

            {/* Code block with the inner double loop highlighted in red */}
            <div style={{
              background: "#0f172a", borderRadius: 10, padding: "12px 14px",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6,
              color: "#e2e8f0", marginBottom: 12, overflowX: "auto",
            }}>
              {codeLines.map((line, i) => {
                const isInner = i === 4 || i === 5; // for a / for b lines
                return (
                  <div key={i} style={{
                    background: isInner ? "rgba(220, 38, 38, 0.18)" : "transparent",
                    borderLeft: isInner ? "3px solid #dc2626" : "3px solid transparent",
                    paddingLeft: 8, paddingRight: 4,
                    color: isInner ? "#fecaca" : "#e2e8f0",
                    whiteSpace: "pre",
                  }}>{line}</div>
                );
              })}
            </div>

            {/* Math: count the operations, show why TLE */}
            <div style={{
              background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10,
              padding: "10px 14px", fontSize: 12.5, color: "#1f2937", lineHeight: 1.7,
            }}>
              <div style={{ fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>
                🧮 {t(E, "Operation count", "연산 횟수")}
              </div>
              <div style={{ paddingLeft: 4 }}>
                • {t(E, "Inner double loop (per query): ", "안쪽 두 겹 루프 (쿼리당): ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>N × N = N²</b>
              </div>
              <div style={{ paddingLeft: 4 }}>
                • {t(E, "Outer loop runs M times: ", "바깥 루프는 M 번: ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>M × N²</b>
              </div>
              <div style={{ paddingLeft: 4 }}>
                • {t(E,
                    "Worst case: N = M = 3000 → 3000 × 3000² ≈ ",
                    "최악: N = M = 3000 → 3000 × 3000² ≈ ")}
                <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>2.7 × 10¹⁰</b>
              </div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fca5a5", fontSize: 11.5, color: "#7f1d1d" }}>
                {t(E,
                  "Time limit ~2 sec; ~10⁸ ops fit comfortably.  10¹⁰ is 100× too slow → TLE 🚫",
                  "제한 ~2 초; ~10⁸ 연산이 적당. 10¹⁰ 은 100 배 초과 → 시간 초과 🚫")}
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E,
                "Next: kill the inner N² loop with a formula.",
                "다음 페이지: 안쪽 N² 루프를 공식 한 줄로 없애요.")}
            </div>
          </div>
        );
      })(),
    },
    // Formula derivation — picture FIRST (no formula text, just numbers).
    // Then "공식 형태" appears at the very bottom as a one-liner footnote.
    // Top caption explains in plain words why Elsie has "card 1, card 1"
    // and what Bessie's a/b mean — earlier confusion was that the labels
    // dropped on the student without re-establishing context.
    {
      type: "reveal",
      narr: t(E,
        "10¹⁰ ops in 2 seconds is impossible.  Need to do less work per query.  Same question, drawn as a picture, makes a shortcut visible.",
        "10¹⁰ 연산을 2 초 안에 끝내는 건 불가능해. 한 쿼리당 일을 줄여야 해. 같은 문제를 그림으로 그리면 빠른 길이 보여요."),
      content: (() => {
        // Game 3: Elsie plays (card 1, card 1).  Card 2 beats card 1 → ⚡ = {2}.
        // Reorder Bessie's cards so ⚡ card comes first → losing hands form
        // a contiguous 2×2 block in the bottom-right corner.
        const orderedCards = [
          { id: 2, win: true },
          { id: 1, win: false },
          { id: 3, win: false },
        ];
        const cell = (rowWin, colWin, key) => {
          const wins = rowWin || colWin;
          return (
            <div key={key} style={{
              width: 52, height: 42, borderRadius: 6,
              background: wins ? "#dcfce7" : "#fee2e2",
              border: `1.5px solid ${wins ? "#86efac" : "#fca5a5"}`,
              color: wins ? "#15803d" : "#991b1b",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{wins ? "✓" : "✗"}</div>
          );
        };
        return (
          <div style={{ padding: 16 }}>
            {/* Strategy box — walks through one query (Game 3) step by step
                so the abstract "count dom + plug formula" becomes concrete.
                Cards 1..3 each get a ✓/✗ verdict; the count gives dom; the
                formula gets actual numbers plugged in. */}
            <div style={{
              background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 10,
              padding: "12px 14px", marginBottom: 14, fontSize: 12.5, color: "#1f2937", lineHeight: 1.65,
            }}>
              <div style={{ fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
                🎯 {t(E, "Plan — walk through one query (Game 3)", "작전 — 한 쿼리 직접 처리해 보기 (게임 3)")}
              </div>
              <div style={{ marginBottom: 10 }}>
                {t(E,
                  "Elsie plays (card 1, card 1).  Two simple steps replace the brute's N² loop:",
                  "Elsie 가 (카드 1, 카드 1) 을 냄. 두 단계만으로 brute 의 N² 루프 대체:")}
              </div>

              {/* Step 1: card-by-card check — three small cards with verdicts */}
              <div style={{
                background: "#fff", border: "1px solid #fed7aa", borderRadius: 8,
                padding: "8px 10px", marginBottom: 8,
              }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
                  {t(E, "1) Loop cards 1..N once — does each beat BOTH of Elsie's cards?",
                        "1) 카드 1..N 한 번씩 시험 — '둘 다 이기는가?'")}
                </div>
                <div style={{
                  display: "flex", justifyContent: "center", gap: 8, marginBottom: 6,
                }}>
                  {[
                    { id: 1, label: t(E, "doesn't beat 1 (draw)", "1 못 이김 (비김)"), ok: false },
                    { id: 2, label: t(E, "beats both 1's", "둘 다 이김"), ok: true },
                    { id: 3, label: t(E, "doesn't beat 1", "1 못 이김"), ok: false },
                  ].map(c => (
                    <div key={c.id} style={{
                      flex: 1, maxWidth: 130,
                      background: c.ok ? "#dcfce7" : "#fee2e2",
                      border: `1.5px solid ${c.ok ? "#86efac" : "#fca5a5"}`,
                      borderRadius: 6, padding: "6px 4px", textAlign: "center",
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: c.ok ? "#15803d" : "#9ca3af" }}>
                        {t(E, "card ", "카드 ")}{c.id} {c.ok ? "⚡" : ""}
                      </div>
                      <div style={{ fontSize: 11, color: c.ok ? "#15803d" : "#7f1d1d", fontWeight: 600 }}>
                        {c.ok ? "✓" : "✗"} {c.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#1f2937" }}>
                  → {t(E, "Count the ⚡ cards: ", "⚡ 카드 개수: ")}
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>dom = 1</span>
                </div>

              </div>

              {/* Step 2: plug into formula */}
              <div style={{
                background: "#fff", border: "1px solid #fed7aa", borderRadius: 8,
                padding: "8px 10px", marginBottom: 8,
              }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
                  {t(E, "2) Plug N=3, dom=1 into the formula", "2) N=3, dom=1 을 공식에 대입")}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.85,
                  textAlign: "center", color: "#1f2937",
                }}>
                  <div>
                    {t(E, "answer", "답")} = <b style={{ color: "#15803d" }}>N²</b> − <b style={{ color: "#dc2626" }}>(N − dom)²</b>
                  </div>
                  <div>
                    = <b style={{ color: "#15803d" }}>3²</b> − <b style={{ color: "#dc2626" }}>(3 − 1)²</b>
                  </div>
                  <div>
                    = 9 − 4 = <b style={{ color: "#15803d", fontSize: 14 }}>5</b> ✓
                  </div>
                </div>
              </div>

              {/* Different dom values → different answers — kills the
                  "is it always 2²?" misread.  The 2² shown above came
                  from Game 3 where dom happens to be 1; with another
                  query you get a totally different (N − dom)². */}
              <div style={{
                background: "#fff", border: "1px solid #fed7aa", borderRadius: 8,
                padding: "8px 10px", marginBottom: 8,
              }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
                  ⚠️ {t(E, "Heads up — that 2² is NOT a fixed number",
                            "주의 — 위의 2² 는 고정값이 아니에요")}
                </div>
                <div style={{ fontSize: 11.5, lineHeight: 1.55, marginBottom: 6 }}>
                  {t(E,
                    "It came from this query's dom = 1.  Other Elsie hands give other doms — and other answers:",
                    "방금 2² 는 이 쿼리의 dom = 1 에서 나온 것. Elsie 패가 달라지면 dom 도 달라지고 답도 달라져요:")}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto", gap: "4px 8px", fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", alignItems: "baseline" }}>
                  <div style={{ fontWeight: 700, color: "#c2410c" }}>dom</div>
                  <div style={{ fontWeight: 700, color: "#c2410c" }}>(N − dom)²</div>
                  <div style={{ fontWeight: 700, color: "#c2410c" }}>N²</div>
                  <div style={{ fontWeight: 700, color: "#c2410c" }}>{t(E, "answer", "답")}</div>
                  <div style={{ fontWeight: 700, color: "#c2410c", fontFamily: "system-ui" }}>{t(E, "meaning", "의미")}</div>

                  <div>0</div><div>3² = 9</div><div>9</div><div>9 − 9 = <b>0</b></div>
                  <div style={{ fontFamily: "system-ui", color: C.dim }}>{t(E, "no card beats both", "둘 다 이기는 카드 0")}</div>

                  <div>1</div><div>2² = 4</div><div>9</div><div>9 − 4 = <b>5</b></div>
                  <div style={{ fontFamily: "system-ui", color: C.dim }}>{t(E, "Game 3 here", "지금 게임 3")}</div>

                  <div>2</div><div>1² = 1</div><div>9</div><div>9 − 1 = <b>8</b></div>
                  <div style={{ fontFamily: "system-ui", color: C.dim }}>{t(E, "two such cards", "2 장")}</div>

                  <div>3</div><div>0² = 0</div><div>9</div><div>9 − 0 = <b>9</b></div>
                  <div style={{ fontFamily: "system-ui", color: C.dim }}>{t(E, "every hand wins", "모든 패 이김")}</div>
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: "#7c2d12", lineHeight: 1.55 }}>
                  {t(E,
                    "The square comes from \"both cards must be non-⚡ to lose\" — (N − dom) choices for slot 1 × (N − dom) for slot 2.  That's why it's squared.",
                    "제곱이 나오는 이유: 지려면 두 카드 모두 non-⚡ 이어야 함 — 자리 1 에 (N−dom) 가지 × 자리 2 에 (N−dom) 가지. 그래서 제곱.")}
                </div>
              </div>

              {/* Speed summary */}
              <div style={{
                marginTop: 8, paddingTop: 8, borderTop: "1px dashed #fed7aa",
                fontSize: 11.5, color: "#7c2d12", lineHeight: 1.6,
              }}>
                <div>
                  • {t(E,
                    "1 query: card-loop O(N) + formula O(1) = ",
                    "쿼리 1 개: 카드 루프 O(N) + 공식 O(1) = ")}
                  <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>O(N)</b>
                  {t(E, " (was O(N²) in brute).", " (brute 는 O(N²) 였음).")}
                </div>
                <div>
                  • {t(E,
                    "Total: M queries × O(N) = ",
                    "전체: M 쿼리 × O(N) = ")}
                  <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>M × N</b>
                  {t(E,
                    "  →  about N× faster (N=3000 ⇒ ~3000× faster, fits in time).",
                    "  →  N 배 빠름 (N=3000 이면 약 3000 배, 시간 안에 끝남).")}
                </div>
              </div>

              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fed7aa", fontSize: 11.5, color: "#7c2d12", fontStyle: "italic" }}>
                {t(E,
                  "Why is the formula N² − (N − dom)²?  The grid below shows it visually.",
                  "공식이 왜 N² − (N − dom)²?  ↓ 아래 격자가 그 이유를 그림으로 보여줘요.")}
              </div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", textAlign: "center", marginBottom: 10 }}>
              💡 {t(E,
                "9 hands as a grid — using the 3rd sample game",
                "9 가지 패를 격자로 — 샘플 입력의 세 번째 게임 (Elsie 가 카드 1, 카드 1)")}
            </div>

            {/* Plain-words setup BEFORE the grid — re-establishes context. */}
            <div style={{
              background: "#faf5ff", border: "1px solid #c4b5fd", borderRadius: 10,
              padding: "10px 12px", fontSize: 12.5, color: "#1f2937", lineHeight: 1.7, marginBottom: 12,
            }}>
              <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
                {t(E, "Setup", "상황 정리")}
              </div>
              <div>
                • {t(E, "Elsie holds two cards — both are card 1 (the same card twice).",
                      "Elsie 가 카드 두 장을 들고 있는데, 둘 다 카드 1 (같은 카드 두 번).")}
              </div>
              <div>
                • {t(E, "Bessie also holds two cards.  We list every (1st card, 2nd card) choice → ",
                      "Bessie 도 카드 두 장을 골라요. (첫 번째 카드, 두 번째 카드) 가능한 조합 → ")}
                <b>3 × 3 = 9 {t(E, "hands.", "가지 패.")}</b>
              </div>
              <div>
                • {t(E,
                  "Among all cards (1, 2, 3), only ",
                  "전체 카드 (1, 2, 3) 중에서 ")}
                <b style={{ color: "#15803d" }}>{t(E,
                  "card 2 beats both of Elsie's card 1's",
                  "카드 2 만 Elsie 의 두 카드를 모두 이김")}</b>
                {" "}
                {t(E, "(needs to beat BOTH, not just one).", "(둘 다 이겨야 하지 한 장만으로는 불충분).")}
              </div>
              <div>
                • <span style={{ color: "#15803d", fontWeight: 700 }}>⚡</span> {t(E,
                  "marks any 'beats-both card' wherever it appears in the grid.",
                  "= 그 '둘 다 이기는 카드' 표시 (격자 어디에 나오든 같은 의미).")}
              </div>
            </div>

            <div style={{ background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 8, textAlign: "center" }}>
                {t(E, "Each cell = one (row card, column card) hand.  Green ✓ = wins.  Red ✗ = loses.",
                      "각 셀 = (행 카드, 열 카드) 한 패. 초록 ✓ = 이김, 빨강 ✗ = 짐.")}
              </div>

              {/* Helpful "what does ✓ mean here?" caller-out: pick one cell
                  (row=card 2, col=card 1) and explain it concretely.  The
                  picture without this leaves a student wondering why a
                  cell that mixes a ⚡ row with a non-⚡ column is ✓. */}
              <div style={{
                fontSize: 11, color: "#6b21a8",
                background: "#faf5ff", border: "1px dashed #c4b5fd", borderRadius: 6,
                padding: "5px 8px", margin: "0 auto 10px", maxWidth: 460,
                lineHeight: 1.5,
              }}>
                {t(E,
                  "Example: cell (row=card 2 ⚡, col=card 1) is ✓ — Bessie holds those two cards, plays card 2 against either of Elsie's, and wins both ways.",
                  "예: (행=카드 2 ⚡, 열=카드 1) 셀이 ✓ — Bessie 가 이 두 장을 들고 있으면 카드 2 로 응답, Elsie 의 어느 쪽이든 이김.")}
              </div>

              {/* Single horizontal axis caption — replaces the rotated row
                  label which was hard to read.  One clean line up front:
                  rows are first card, columns are second card. */}
              <div style={{
                fontSize: 11, color: "#6b7280", textAlign: "center", marginBottom: 6,
                fontWeight: 500,
              }}>
                {t(E,
                  "↓ rows = Bessie's 1st card   ·   → cols = Bessie's 2nd card",
                  "↓ 행 = Bessie 첫 번째 카드   ·   → 열 = Bessie 두 번째 카드")}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  {/* Column headers */}
                  <div style={{ display: "flex", gap: 4, marginLeft: 60 }}>
                    {orderedCards.map(c => (
                      <div key={`h-${c.id}`} style={{
                        width: 52, textAlign: "center", fontSize: 11.5, fontWeight: 600,
                        color: c.win ? "#15803d" : "#9ca3af",
                      }}>
                        {t(E, `card ${c.id}`, `카드 ${c.id}`)}{c.win ? " ⚡" : ""}
                      </div>
                    ))}
                  </div>
                  {/* Rows */}
                  {orderedCards.map((rowCard) => (
                    <div key={`r-${rowCard.id}`} style={{ display: "flex", gap: 4, marginTop: 4, alignItems: "center" }}>
                      <div style={{
                        width: 56, fontSize: 11.5, fontWeight: 600, textAlign: "right", paddingRight: 4,
                        color: rowCard.win ? "#15803d" : "#9ca3af",
                      }}>
                        {t(E, `card ${rowCard.id}`, `카드 ${rowCard.id}`)}{rowCard.win ? " ⚡" : ""}
                      </div>
                      {orderedCards.map(colCard => cell(rowCard.win, colCard.win, `${rowCard.id}-${colCard.id}`))}
                    </div>
                  ))}
                  {/* Dashed bracket around the 4 red (losing) cells.
                      No inline label — the colour and the box below the
                      grid already say "red square = losing hands". An
                      extra label inside the grid was overlapping ✓
                      cells and confusing the picture. */}
                  {(() => {
                    // Stack: row-card label (56) + paddingRight (4) = 60 to first cell.
                    // First col of losing cells = index 1 → left = 60 + 1 × (52 + 4) = 116.
                    // Width = 2×52 + 4 = 108.
                    // Top stack: col-header row (~14) + marginTop (4) ≈ 18.
                    // First row of losing cells = index 1 → top = 18 + 4 + 1 × (42 + 4) = 68.
                    // Height = 2×42 + 4 = 88.
                    return (
                      <div style={{
                        position: "absolute",
                        left: 116 - 4, top: 68 - 4,
                        width: 108 + 8, height: 88 + 8,
                        border: "2px dashed #dc2626",
                        borderRadius: 10,
                        pointerEvents: "none",
                      }} />
                    );
                  })()}
                </div>
              </div>

              {/* External label below the grid — points UP at the bracket.
                  Sits in clean whitespace, no overlap with cells. */}
              <div style={{
                marginTop: 10, fontSize: 11, color: "#dc2626", fontWeight: 700,
                textAlign: "center",
              }}>
                {t(E,
                  "↑ red dashed square = 4 losing hands (the small block we'll count)",
                  "↑ 빨간 점선 사각형 = 지는 패 4 칸 (우리가 세려는 작은 덩어리)")}
              </div>

              <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
                {t(E, "Hand wins if EITHER card is ⚡.  Loses only when BOTH cards are non-⚡.",
                      "둘 중 하나만 ⚡ 이면 이김. 둘 다 ⚡ 아닐 때만 짐.")}
              </div>
            </div>

            {/* Read-the-picture box: literal NUMBERS first; formula form is a footnote. */}
            <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#1f2937", lineHeight: 1.75 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>
                🔍 {t(E, "Count the cells:", "셀 세기:")}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <span style={{
                  display: "inline-block", width: 14, height: 14, borderRadius: 3,
                  background: "#fee2e2", border: "1.5px solid #fca5a5", flexShrink: 0,
                }} />
                <div>
                  {t(E, "Red square: ", "빨간 사각형: ")}
                  <b style={{ fontFamily: "'JetBrains Mono',monospace" }}>2 × 2 = 4</b> {t(E, "losing hands.", "지는 패.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginTop: 4 }}>
                <span style={{
                  display: "inline-block", width: 14, height: 14, borderRadius: 3,
                  background: "#dcfce7", border: "1.5px solid #86efac", flexShrink: 0,
                }} />
                <div>
                  {t(E, "Green L-shape: ", "초록 ㄱ-자: ")}
                  <b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#15803d" }}>9 − 4 = 5</b> {t(E, "wins ✓", "이김 ✓")}
                </div>
              </div>
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #86efac", fontSize: 11.5, color: "#1f2937", lineHeight: 1.6 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>
                  💡 {t(E, "Idea:", "핵심 아이디어:")}
                </div>
                <div>
                  {t(E,
                    "Count the small red square (easy) and subtract from the whole grid.  That's faster than tracing the L-shape.",
                    "작은 빨간 사각형 (세기 쉬움) 을 세서 전체 격자에서 빼기. ㄱ-자 직접 따라가기보다 빨라.")}
                </div>
                <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #86efac", fontSize: 11, color: "#1f2937", lineHeight: 1.6 }}>
                  <div style={{ color: C.dim, marginBottom: 4 }}>
                    {t(E,
                      "Later in the code we write this with letters:",
                      "코드에선 글자로 적어요:")}
                  </div>
                  <div style={{ paddingLeft: 8, fontFamily: "'JetBrains Mono',monospace" }}>
                    <div>N = 3  <span style={{ color: C.dim, fontFamily: "system-ui" }}>{t(E, "(deck size)", "(덱 크기)")}</span></div>
                    <div>dom = 1  <span style={{ color: C.dim, fontFamily: "system-ui" }}>{t(E, "(cards that beat Elsie)", "(Elsie 이기는 카드 개수)")}</span></div>
                  </div>
                  <div style={{ marginTop: 4, paddingLeft: 8, fontFamily: "'JetBrains Mono',monospace" }}>
                    <div><b style={{ color: "#1f2937" }}>N²</b> = 3² = <b>9</b>  <span style={{ color: C.dim, fontFamily: "system-ui" }}>{t(E, "(whole grid)", "(전체 격자)")}</span></div>
                    <div><b style={{ color: "#dc2626" }}>(N − dom)²</b> = 2² = <b>4</b>  <span style={{ color: C.dim, fontFamily: "system-ui" }}>{t(E, "(red square)", "(빨간 사각형)")}</span></div>
                    <div><b style={{ color: "#15803d" }}>N² − (N − dom)²</b> = 9 − 4 = <b style={{ color: "#15803d" }}>5</b>  <span style={{ color: C.dim, fontFamily: "system-ui" }}>{t(E, "(answer ✓)", "(답 ✓)")}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })(),
    },
    // Insight + smart code (sections 7-8)
    ...getHpsSections(E).slice(6, 8).map((sec, i) => ({
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: i === 0
        ? t(E, "Picture and formula make sense — now translate them to code.  Single loop for dom, one line for the formula.",
              "그림과 공식 이해 됐으니까 이제 코드로. dom 세는 for 한 개, 공식 대입 한 줄.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
    // Why smart works — both Python and C++
    {
      type: "reveal",
      narr: t(E,
        "Submit again — all 12 tests pass, even Python.  Let's see why so we can recognise the pattern next time.",
        "다시 제출 — 12 개 테스트 모두 통과, Python 도! 왜 통과했는지 한번 짚어보고, 다음에 비슷한 문제 만나면 패턴 알아채게 하자."),
      content: <NSpeedSim E={E} />,
    },
    // ── Bonus track: bitmask trick. Optional / deep-dive — make this
    //    crystal clear so a student who's done can stop and not feel
    //    like they're missing something required.
    {
      type: "reveal",
      label: t(E, "Optional — bits", "선택 — 비트 (심화)"),
      narr: t(E,
        "Quest's main path ends here.  From here on is optional — a deeper bits trick for students who want more.  Skipping is totally fine.",
        "여기까지가 메인 풀이. 여기부터는 선택 — 더 깊이 가고 싶은 학생만. 안 따라가도 전혀 문제 없어요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Big "you finished the main quest" milestone */}
          <div style={{
            background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 12,
            padding: "14px 16px", marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>🎉</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              {t(E, "Main quest complete!", "메인 풀이 완료!")}
            </div>
            <div style={{ fontSize: 12, color: "#15803d", lineHeight: 1.55 }}>
              {t(E,
                "The smart code passes all 12 tests in both Python and C++.  You've solved this problem.",
                "Smart 코드로 Python·C++ 둘 다 12 개 테스트 통과. 문제 푸는 건 여기서 끝.")}
            </div>
          </div>

          {/* Optional bonus track header — clearly labelled */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#fef3c7", border: "1.5px solid #fbbf24",
            color: "#92400e", fontSize: 11, fontWeight: 800, letterSpacing: 0.5,
            padding: "3px 10px", borderRadius: 999, marginBottom: 10,
          }}>
            🎓 {t(E, "DEEP DIVE — OPTIONAL", "심화 — 선택")}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0891b2", marginBottom: 10 }}>
            🚀 {t(E, "Even smarter? Bits.", "더 똑똑해지려면? 비트.")}
          </div>
          <div style={{ background: "#f0f9ff", border: "1px solid #7dd3fc", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#075985", lineHeight: 1.7 }}>
            <div style={{ marginBottom: 6 }}>
              {t(E,
                "There's a beautiful trick that makes the smart code ",
                "한층 더 빠르게 만드는 깔끔한 트릭이 있어요 — ")}
              <b>{t(E, "60× faster still", "추가로 ~60× 빠름")}</b>
              {t(E, " — using BITS.  Useful for harder USACO problems later.",
                    " — 비트 (bit) 사용. 나중 USACO 문제들에서 쓰임.")}
            </div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #7dd3fc", fontSize: 12 }}>
              {t(E,
                "If you've never used bit operators, the next 3 pages teach them from scratch, then we apply.  Otherwise, jump straight to the bitmask code.",
                "비트 연산이 처음이면 다음 3 페이지가 기초부터. 이미 익숙하면 바로 비트마스크 코드로 점프.")}
            </div>
            <div style={{ marginTop: 8, fontSize: 11.5, color: C.dim, fontStyle: "italic" }}>
              {t(E,
                "Want to skip?  Use the segmented bar at the top — click any earlier page to revisit, or close this quest.",
                "건너뛰고 싶으면? 위쪽 진도바에서 이전 페이지로 점프 또는 quest 닫기.")}
            </div>
          </div>
        </div>),
    },
    // Bits primer
    {
      type: "reveal",
      narr: t(E,
        "Step 1: bits. Every number has a binary form — a row of 0s and 1s.",
        "1 단계: 비트 (bit). 모든 숫자는 2진수 — 0 과 1 의 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🔢 {t(E, "What's a bit?", "비트가 뭐?")}
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "12px 14px", marginBottom: 10, fontSize: 13, lineHeight: 1.7 }}>
            <div>
              {t(E, "Numbers can be written in ", "숫자는 ")}<b>{t(E, "binary", "2진수")}</b>{t(E, " — only 0 and 1, place values are powers of 2.",
                                                                                              " 로 쓸 수 있어요 — 0 과 1 만, 자리값은 2 의 제곱.")}
            </div>
            <div style={{ marginTop: 8, padding: 10, background: "#f8fafc", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.85 }}>
              <div>5 = <b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#16a34a" }}>1</b> {t(E, "(binary)", "(2진수)")} = 4 + 0 + 1</div>
              <div>3 = <b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#16a34a" }}>1</b> = 0 + 2 + 1</div>
              <div>8 = <b style={{ color: "#16a34a" }}>1</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#dc2626" }}>0</b><b style={{ color: "#dc2626" }}>0</b> = 8</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#475569" }}>
              {t(E, "Each 0/1 in the row is a ", "줄의 각 0/1 = ")}<b>{t(E, "bit", "비트 (bit)")}</b>
              {t(E, ". Position 0 is the rightmost.", ". 0 번째 자리는 가장 오른쪽.")}
            </div>
          </div>

          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#7c2d12", lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#92400e", marginBottom: 4 }}>
              ⚙️ {t(E, "The shortcut: 1 << i", "유용한 표현: 1 << i")}
            </div>
            <div>
              {t(E, "1 << i", "1 << i")} {t(E, " means '1 shifted left i positions' — only the i-th bit is 1.",
                                                  "= '1 을 왼쪽으로 i 칸 밀기' — i 번째 비트만 1.")}
            </div>
            <div style={{ marginTop: 6, padding: 8, background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
              <div>1 &lt;&lt; 0  =    1   ({t(E, "binary", "")} 0001)</div>
              <div>1 &lt;&lt; 1  =    2   (0010)</div>
              <div>1 &lt;&lt; 2  =    4   (0100)</div>
              <div>1 &lt;&lt; 3  =    8   (1000)</div>
            </div>
          </div>
        </div>),
    },
    // Bit operators primer
    {
      type: "reveal",
      narr: t(E,
        "Step 2: three operators we need — AND (&), OR (|), and popcount.",
        "2 단계: 비트 연산자 3 개 — AND (&), OR (|), popcount."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            ⚙️ {t(E, "Bit operators", "비트 연산자")}
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #16a34a", borderRadius: 10, padding: "12px 14px", marginBottom: 8, fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#15803d", marginBottom: 4 }}>
              & {t(E, "(AND) — keeps a bit ON only if BOTH inputs have it ON", "(AND) — 두 쪽 다 1 일 때만 결과가 1")}
            </div>
            <div style={{ padding: 8, background: "#f0fdf4", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
              <div>  0110</div>
              <div>{`& `}1010</div>
              <div>──────</div>
              <div>  <b style={{ color: "#15803d" }}>0010</b></div>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #ea580c", borderRadius: 10, padding: "12px 14px", marginBottom: 8, fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 4 }}>
              | {t(E, "(OR) — bit ON if EITHER input has it ON", "(OR) — 둘 중 하나라도 1 이면 결과가 1")}
            </div>
            <div style={{ padding: 8, background: "#fff7ed", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
              <div>  0110</div>
              <div>{`| `}1010</div>
              <div>──────</div>
              <div>  <b style={{ color: "#9a3412" }}>1110</b></div>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: "#7c2d12" }}>
              {t(E, "Use ", "")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>x |= 1 &lt;&lt; i</code>
              {t(E, " to TURN ON bit i in x.", " 로 x 의 i 번째 비트를 켤 수 있음.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #7c3aed", borderRadius: 10, padding: "12px 14px", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
            <div style={{ fontWeight: 600, color: "#5b21b6", marginBottom: 4 }}>
              popcount {t(E, "— count how many bits are 1", "— 1 인 비트 개수 세기")}
            </div>
            <div style={{ padding: 8, background: "#faf5ff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.85 }}>
              <div>{t(E, "In Python:", "Python 에선:")}</div>
              <div><code>bin(0b1011).count('1')</code> {t(E, "→ 3", "→ 3")}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{t(E, "(0b1011 has three 1s)", "(0b1011 에 1 이 3 개)")}</div>
            </div>
          </div>

          {/* Hands-on bit playground */}
          <BitsLab E={E} />
        </div>),
    },
    // Apply to this problem
    {
      type: "reveal",
      narr: t(E,
        "Step 3: apply bits to this problem. One column per Elsie card; bit i means 'card i beats this column'.",
        "3 단계: 비트를 이 문제에 적용. 컬럼마다 비트마스크 — i 번째 비트 = '카드 i 가 이 컬럼 카드 이김'."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🎯 {t(E, "Apply bits to the problem", "비트를 이 문제에 적용")}
          </div>

          <div style={{ background: "#f0f9ff", border: "1.5px solid #7dd3fc", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#075985", lineHeight: 1.75, marginBottom: 10 }}>
            <div style={{ fontWeight: 600, color: "#0c4a6e", marginBottom: 4 }}>
              {t(E, "Idea: pack 'who beats this card' into one number.", "아이디어: '이 카드를 이기는 카드들' 을 숫자 하나에 담기.")}
            </div>
            <div>
              {t(E, "For each card c, store ", "카드 c 마다 ")}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>col[c]</code>
              {t(E, " — bit i is 1 iff card i beats card c. Build it once.",
                    " 저장 — i 번째 비트가 1 이면 카드 i 가 카드 c 이김. 한 번만 만듦.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #cbd5e1", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, marginBottom: 10 }}>
            <div style={{ fontWeight: 600, color: "#475569", marginBottom: 6 }}>
              {t(E, "For sample (cards 1-3, beats: 2→1, 1→3, 3→2):", "샘플 차트 (카드 1-3, 2→1 이김, 1→3, 3→2) 일 때:")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#1f2937", lineHeight: 1.85, paddingLeft: 4 }}>
              <div>col[0] {t(E, "(card 1)", "(카드 1)")} = 0b010 = 2  {t(E, "← only card 2 beats card 1", "← 카드 2 만 카드 1 이김")}</div>
              <div>col[1] {t(E, "(card 2)", "(카드 2)")} = 0b100 = 4  {t(E, "← only card 3 beats card 2", "← 카드 3 만 카드 2 이김")}</div>
              <div>col[2] {t(E, "(card 3)", "(카드 3)")} = 0b001 = 1  {t(E, "← only card 1 beats card 3", "← 카드 1 만 카드 3 이김")}</div>
            </div>
          </div>

          <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, padding: "12px 14px", fontSize: 12.5, color: "#15803d", lineHeight: 1.75 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {t(E, "Now a query is just AND + popcount:", "쿼리는 AND + popcount 한 번씩:")}
            </div>
            <div style={{ paddingLeft: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.85 }}>
              <div>col[s1] & col[s2] {t(E, "= bits ON only where the SAME card beats BOTH", "= '같은 카드가 두 컬럼 다 이김' 인 비트만 1")}</div>
              <div>{t(E, "popcount(...) = how many such cards =", "popcount(...) = 그런 카드 개수 = ")} <b>dom</b></div>
            </div>
            <div style={{ marginTop: 6, padding: "6px 8px", background: "#fff", borderRadius: 6 }}>
              {t(E, "Example: Elsie (1, 1) → col[0] & col[0] = 2 & 2 = 0b010. popcount = ",
                    "예: Elsie (1, 1) → col[0] & col[0] = 2 & 2 = 0b010. popcount = ")}<b>1</b>
              {t(E, " → dom = 1 (matches our earlier answer ✓).", " → dom = 1 (앞 답과 일치 ✓).")}
            </div>
          </div>

          <div style={{ marginTop: 10, marginBottom: 12, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.55 }}>
            💡 {t(E, "Why is this fast? Python's int handles 64 bits at a time, so AND on N-bit masks does ~N/64 chunks instead of N steps.",
                       "왜 빠른가? Python 정수가 한 번에 64 비트씩 처리 → N 비트 AND 는 N/64 chunk 만에 끝. N 단계가 N/64 가 됨.")}
          </div>

          {/* Hands-on col[s1] & col[s2] simulator */}
          <BitmaskColSim E={E} />
        </div>),
    },
    // Bonus: Python bitmask code (section 9)
    ...getHpsSections(E).slice(8, 9).map((sec, i) => ({
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: t(E,
        "Now the bitmask code. Same algorithm, but with the bit tricks above.",
        "위 비트 트릭 적용한 코드. 알고리즘은 동일."),
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
