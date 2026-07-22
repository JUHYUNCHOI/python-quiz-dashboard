import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock, highlight } from "@/components/quest/shared";
import { getHpsSections, ChartReadingTour, CodeSectionView, BitsLab, BitmaskColSim, HpsFormulaGridSim, HpsSampleIOSim, WinningRulesBanner } from "./components";

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
                {t(E, "matchup chart — a TRIANGLE. row ", "승패 차트 — 삼각형. ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, " = card ", " 행 = 카드 ")}<b style={{ color: "#dc2626" }}>i</b>
                {t(E, "'s results vs cards 1..i.", " 의 결과 (카드 1..i 상대).")}
                {/* 격자로 직접 그려줌 — 글 설명은 안 들어옴, LWD = '카드3의 한 줄' 을 눈으로 (선생님 2026-07-14) */}
                <div style={{ marginTop: 8, background: "#fff", borderRadius: 8, padding: "10px 12px", fontSize: 11.5 }}>
                  <div style={{ marginBottom: 8 }}>
                    <b style={{ color: "#16a34a" }}>W</b> = {t(E, "win", "이김")}
                    {" · "}<b style={{ color: "#dc2626" }}>L</b> = {t(E, "lose", "짐")}
                    {" · "}<b style={{ color: "#6b7280" }}>D</b> = {t(E, "draw", "비김")}
                    {" "}<span style={{ color: C.dim }}>({t(E, "cell = row card vs column card", "칸 = 행 카드 vs 열 카드")})</span>
                  </div>
                  {/* 열 헤더 */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <div style={{ width: 46 }} />
                    {[1, 2, 3].map(j => (
                      <div key={j} style={{ width: 28, textAlign: "center", fontSize: 9.5, color: C.dim, fontWeight: 700 }}>
                        {t(E, "vs", "vs")}{j}
                      </div>
                    ))}
                  </div>
                  {/* 삼각 격자 — 행 i = 카드 i */}
                  {[
                    { card: 1, cells: [["D", "#6b7280"]] },
                    { card: 2, cells: [["W", "#16a34a"], ["D", "#6b7280"]] },
                    { card: 3, cells: [["L", "#dc2626"], ["W", "#16a34a"], ["D", "#6b7280"]], hot: true },
                  ].map(row => (
                    <div key={row.card} style={{ display: "flex", gap: 4, marginBottom: 4, alignItems: "center" }}>
                      <div style={{ width: 46, fontSize: 10.5, fontWeight: 700, color: row.hot ? "#9a3412" : C.dim, textAlign: "right" }}>
                        {t(E, "card ", "카드 ")}{row.card}
                      </div>
                      {row.cells.map(([ch, col], k) => (
                        <div key={k} style={{
                          width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 5, background: row.hot ? "#fff7ed" : "#f8fafc",
                          border: row.hot ? "1.5px solid #fdba74" : "1px solid #e2e8f0",
                          color: col, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
                        }}>{ch}</div>
                      ))}
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginTop: 3, wordBreak: "keep-all" }}>
                    ↑ {t(E, "the 3rd row read left→right IS ", "3 행(카드 3) 을 왼→오로 읽으면 = ")}
                    <code style={{ fontFamily: "'JetBrains Mono',monospace" }}>LWD</code>
                  </div>
                  {/* 왜 대각선=D, 왜 삼각형인지 — 학생이 '두 번째 줄은 왜 다르지?' 물음 (선생님 2026-07-14) */}
                  <div style={{ marginTop: 7, paddingTop: 6, borderTop: "1px dashed #e2e8f0", fontSize: 10.5, color: C.dim, lineHeight: 1.65, wordBreak: "keep-all" }}>
                    <div>• {t(E, "The diagonal (card vs itself) is always ", "대각선(카드 vs 자기 자신)은 항상 ")}<b style={{ color: "#6b7280" }}>D</b>{t(E, " — you can't beat yourself. So each row ends in D.", " — 자기랑은 못 이겨요. 그래서 줄 끝은 항상 D.")}</div>
                    <div style={{ marginTop: 3 }}>• {t(E, "Triangle only: card 2 vs card 3 is just card 3 vs card 2 flipped — so each pair is listed once (the lower half).", "삼각형인 이유: 카드 2 vs 카드 3 은 카드 3 vs 카드 2 를 뒤집은 것 → 짝마다 한 번씩만 (아래쪽 절반).")}</div>
                  </div>
                </div>
                <span style={{ color: "#5b21b6", fontSize: 12 }}>
                  → {t(E, "walk it cell by cell next page", "다음 페이지에서 한 칸씩")}
                </span>
              </div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 2</code>
              <div>{t(E, "Elsie's 1st hand: cards (1, 2)", "Elsie 의 첫 패: 카드 (1, 2)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>2 3</code>
              <div>{t(E, "Elsie's 2nd hand: cards (2, 3)", "Elsie 의 둘째 패: 카드 (2, 3)")}</div>

              <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 3, fontSize: 12 }}>1 1</code>
              <div>{t(E, "Elsie's 3rd hand: cards (1, 1)", "Elsie 의 셋째 패: 카드 (1, 1)")}</div>
            </div>

            {/* 각 패, Bessie 는 뭘 내야 이기나 — 형식 스텝에서 바로 답이 보이게
                (선생님 2026-07-21: "이거 봐선 각 예제마다 뭘 내야 이기는지 알 수 없다").
                Bessie 는 Elsie 두 카드를 '모두' 이기는 카드가 하나 있어야 확실히 이김.
                위 W/L/D 차트로 확인 가능 — 상세 카운트(→ 출력)는 다음 시뮬. */}
            <div style={{ marginTop: 12, background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#166534", marginBottom: 8, wordBreak: "keep-all" }}>
                🎯 {t(E, "So what does Bessie play to win each one?", "그럼 각 패를 이기려면 Bessie 는 뭘 내야 하나?")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { elsie: [["●", "#2563eb"], ["■", "#7c3aed"]], win: null },
                  { elsie: [["■", "#7c3aed"], ["▲", "#ea580c"]], win: null },
                  { elsie: [["●", "#2563eb"], ["●", "#2563eb"]], win: ["■", "#7c3aed", "2"] },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 5, padding: "2px 7px" }}>
                      {r.elsie.map(([g, c], j) => <span key={j} style={{ color: c, fontSize: 15, marginRight: 3 }}>{g}</span>)}
                    </span>
                    <span style={{ color: "#9ca3af" }}>→</span>
                    {r.win
                      ? <span style={{ fontWeight: 700, color: "#15803d", wordBreak: "keep-all" }}>{t(E, "play ", "")}<span style={{ color: r.win[1], fontSize: 16 }}>{r.win[0]}</span>{t(E, ` card ${r.win[2]} — it beats BOTH ✓`, ` 카드 ${r.win[2]} 내면 둘 다 이김 ✓`)}</span>
                      : <span style={{ fontWeight: 700, color: "#b91c1c", wordBreak: "keep-all" }}>{t(E, "no single card beats both ✗ → can't force a win", "한 장으로 둘 다 이기는 카드 없음 ✗ → 확실히 못 이김")}</span>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10.5, color: C.dim, wordBreak: "keep-all", lineHeight: 1.5 }}>
                {t(E, "Bessie wins for sure only if she holds ONE card that beats BOTH of Elsie's.  (Check it on the W/L/D chart above.)  Next page counts the winning hands → the output number.",
                      "Bessie 는 Elsie 두 카드를 '모두' 이기는 카드를 한 장이라도 들면 확실히 이겨요.  (위 W/L/D 차트로 확인!)  다음 페이지에서 이기는 패 수를 세서 → 출력 숫자.")}
              </div>
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

    // 1-4: 샘플 입력 → 출력 시뮬 (선생님 2026-07-21: "이 인풋의 아웃풋이 어떻게 나오는지").
    //      Elsie 3 패 → 0 / 0 / 5 가 각각 어떻게 나오는지 (둘 다 이기는 카드 → dom → 공식).
    {
      type: "reveal",
      narr: t(E,
        "Chart's clear — now watch the sample's 3 Elsie hands turn into the output 0, 0, 5, one at a time.",
        "차트도 알았으니 — 샘플의 Elsie 3 패가 출력 0, 0, 5 로 어떻게 나오는지 하나씩 봐요."),
      content: (<HpsSampleIOSim E={E} />),
    },

    // 1-5: 브루트포스로 해보자 — 짧은 안내 (선생님 2026-07-14: 쿼리 시뮬 제거,
    //       브루트 코드가 어차피 '모든 패 시험'을 하니 시뮬은 겹침. 그냥 브루트로.)
    {
      type: "reveal",
      narr: t(E,
        "Problem's clear.  Simplest idea first — for each Elsie hand, just TRY every Bessie hand and count the wins.  That's brute force.  Let's code it.",
        "문제는 다 이해했어요. 가장 단순한 방법부터 — 각 Elsie 패마다 Bessie 의 모든 패를 하나씩 시험해서 이기는 걸 세기. 이게 브루트포스. 코드로 짜보자."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 12, padding: "16px 18px", maxWidth: 480, margin: "0 auto", wordBreak: "keep-all" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#c2410c", marginBottom: 12, textAlign: "center" }}>
              🐢 {t(E, "Start simple — brute force", "가장 단순하게 — 브루트포스")}
            </div>
            <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.9 }}>
              <div>1. {t(E, "For each Elsie hand,", "각 Elsie 패마다,")}</div>
              <div>2. {t(E, "TRY every possible Bessie hand,", "Bessie 의 모든 패를 하나씩 시험,")}</div>
              <div>3. {t(E, "count the ones that ALWAYS win.", "무조건 이기는 걸 세요.")}</div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px dashed #fed7aa", fontSize: 12.5, color: "#7c2d12", lineHeight: 1.65 }}>
              {t(E, "'Try everything' = brute force.  Simple, and the answer is correct.  Fast enough?  We'll find out.  Let's code it 👇",
                    "'전부 다 해보기' = 브루트포스. 단순하고 답은 정확해요. 빠른지는 짜보면 알아요. 코드로 →")}
            </div>
          </div>
        </div>),
    },
  ];
}

export function makeHpsCh2(E, lang = "py") {
  return [
    // 2-1..2-6: WRITE — cumulative code + why. 첫 스텝 narr 에 '작전 + 알고리즘' 한 줄
    // (선생님 2026-07-14: 생각 사다리 박스는 반복·벽이라 제거, 요지는 한 줄로).
    ...getHpsSections(E).slice(0, 6).map((sec, i) => ({
      section: "build",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: i === 0
        ? t(E, "Plan: build a beats table, then per hand just count cards that beat both. No heavy algorithm — a table + counting. Let's write it 👇",
              "작전은 간단해요 — 이김 표 만들고, 패마다 '둘 다 이기는 카드' 개수만 세기. 무거운 알고리즘 없이 표 + 세기. 한 줄씩 짜볼게요 👇")
        : "",
      // beats 규칙 상시 표시 — 코드가 beats[a][b] 를 다뤄도 '어떤 카드가 어떤 카드
      // 이기는지' 를 눈으로 (선생님 2026-07-21: 머리로 기억 안 하게).
      content: (<><WinningRulesBanner E={E} /><CodeSectionView section={sec} lang={lang} E={E} /></>),
    })),
    // Reality check: submit brute force → TLE on harder cases.
    // The "why both languages fail" math comes on the NEXT page; here we
    // just show the raw result.
    {
      section: "build",
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
      section: "optimize",
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
                    background: isInner ? "rgba(220, 38, 38, 0.22)" : "transparent",
                    borderLeft: isInner ? "3px solid #dc2626" : "3px solid transparent",
                    paddingLeft: 8, paddingRight: 4,
                    whiteSpace: "pre",
                  }}>{highlight(line, "py")}</div>
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
      section: "optimize",
      type: "reveal",
      narr: t(E,
        "10¹⁰ ops in 2 seconds is impossible.  Need to do less work per query.  Same question, drawn as a picture, makes a shortcut visible.",
        "10¹⁰ 연산을 2 초 안에 끝내는 건 불가능해. 한 쿼리당 일을 줄여야 해. 같은 문제를 그림으로 그리면 빠른 길이 보여요."),
      content: (<HpsFormulaGridSim E={E} />),
    },
    // Insight + smart code (sections 7-8)
    ...getHpsSections(E).slice(6, 8).map((sec, i) => ({
      section: "optimize",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: i === 0
        ? t(E, "Picture and formula make sense — now translate them to code.  Single loop for dom, one line for the formula.",
              "그림과 공식 이해 됐으니까 이제 코드로. dom 세는 for 한 개, 공식 대입 한 줄.")
        : "",
      content: (<><WinningRulesBanner E={E} /><CodeSectionView section={sec} lang={lang} E={E} /></>),
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
      section: "bonus",
      type: "reveal",
      label: t(E, "🎁 Bonus — bits", "🎁 보너스 — 비트"),
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
            🎁 {t(E, "BONUS — OPTIONAL (harder)", "보너스 — 선택 · 더 어려움")}
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
      section: "bonus",
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
      section: "bonus",
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
      section: "bonus",
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
      section: "bonus",
      label: sec.label,
      preview: Array.isArray(sec.why) ? sec.why[0] : undefined,
      type: "reveal",
      narr: t(E,
        "Now the bitmask code. Same algorithm, but with the bit tricks above.",
        "위 비트 트릭 적용한 코드. 알고리즘은 동일."),
      content: (<><WinningRulesBanner E={E} /><CodeSectionView section={sec} lang={lang} E={E} /></>),
    })),
  ];
}
