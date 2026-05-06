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

/* Beats matrix from Sample I/O `001/100/010`:
   row i, position j = '1' means card (i+1) beats card (j+1). */
const BEATS_MATRIX = ["001", "100", "010"];
const cardBeats = (a, b) => {
  if (a === b) return null;             // tie / self
  return BEATS_MATRIX[a - 1][b - 1] === "1";
};

/* ═══════════════════════════════════════════════════════════════
   HpsCaseSimulator — Walks two scenarios against the SAME Elsie
   hand (cards 1, 3) from Sample I/O `1 3`:
     • Scenario A: Bessie (card 2, card 3) — partial answer, FAILS
     • Scenario B: Bessie (card 2, card 1) — covers both, WINS
   Sub-steps: setup → A case 1 → A case 2 → A verdict
              → B case 1 → B case 2 → B verdict → summary
   ═══════════════════════════════════════════════════════════════ */
export function HpsCaseSimulator({ E }) {
  const elsie = [1, 3];   // Same as Sample I/O `1 3`
  const scenarios = [
    { label: t(E, "Scenario A — Bessie (card 2, card 3)", "시나리오 A — 베시 (카드 2, 카드 3)"), bessie: [2, 3], expectWin: false },
    { label: t(E, "Scenario B — Bessie (card 2, card 1)", "시나리오 B — 베시 (카드 2, 카드 1)"), bessie: [2, 1], expectWin: true },
  ];
  const buildCases = (bessie) => elsie.map((ePlay) => {
    const opts = bessie.map(b => ({ b, win: cardBeats(b, ePlay) === true, tie: cardBeats(b, ePlay) === null }));
    return { ePlay, opts, anyWin: opts.some(o => o.win) };
  });

  const trace = [
    { kind: "setup" },
    { kind: "scenario", sIdx: 0 },
    { kind: "case", sIdx: 0, caseIdx: 0 },
    { kind: "case", sIdx: 0, caseIdx: 1 },
    { kind: "verdict", sIdx: 0 },
    { kind: "scenario", sIdx: 1 },
    { kind: "case", sIdx: 1, caseIdx: 0 },
    { kind: "case", sIdx: 1, caseIdx: 1 },
    { kind: "verdict", sIdx: 1 },
    { kind: "summary" },
  ];
  const ts = useTraceStep(trace);
  const safe = ts.safe;
  const s = trace[safe];
  const curScenario = s.sIdx != null ? scenarios[s.sIdx] : null;
  const curBessie = curScenario?.bessie;
  const curCases = curBessie ? buildCases(curBessie) : null;
  const curAllWin = curCases?.every(c => c.anyWin);

  const handCard = (label, cards, color) => (
    <div style={{ background: "#fff", border: `2px solid ${color}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${color}`, background: "#f8fafc",
          }}>
            {typeof c === "number" ? <CardChip n={c} size={22} /> : <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, color }}>{c}</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCard = (n) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>
      <span style={{ fontSize: 18, color: SHAPES[n]?.color, lineHeight: 1 }}>{SHAPES[n]?.glyph}</span>
      <span style={{ fontWeight: 800 }}>{t(E, `card ${n}`, `카드 ${n}`)}</span>
    </span>
  );

  return (
    <div style={{ padding: 16 }}>
      <StepHeader
        accent={A}
        idx={safe}
        total={trace.length}
        isEn={E}
        title={t(E, "Two scenarios vs same Elsie hand (card 1, card 3) — see one fail, one win.",
                    "엘시 hand (카드 1, 카드 3) 에 두 시나리오 — 하나는 실패, 하나는 성공.")}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 14 }}>
        {handCard(curBessie ? (s.sIdx === 0 ? t(E, "Bessie A", "베시 A") : t(E, "Bessie B", "베시 B")) : t(E, "Bessie's hand", "베시의 카드"),
                  curBessie ?? ["?", "?"], "#7c3aed")}
        {handCard(t(E, "Elsie's hand",  "엘시의 카드"),  elsie,  "#dc2626")}
      </div>

      <NarrativePanel minHeight={120}>
        {s.kind === "setup" && (
          <>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 4 }}>
              📋 {t(E, "Setup", "준비")}
            </div>
            <div>
              {t(E, "Both cows have laid down their two cards. All 4 cards are visible. Now Elsie will pick ONE of her two to play; Bessie picks last (she sees Elsie's pick first).",
                    "두 소가 카드 2 장씩 펼쳐 놓아서 4 장 모두 보여요. 엘시가 자기 2 장 중 1 장을 골라 내고, 베시는 그걸 보고 마지막에 골라요.")}
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: C.dim }}>
              {t(E, "Bessie's hand wins for sure ⇔ for EACH of Elsie's two cards, Bessie has at least one that beats it. We'll try two different Bessie hands against Elsie's (card 1, card 3).",
                    "베시의 카드 2 장이 무조건 이김 ⇔ 엘시의 두 카드 각각에 대해, 베시 카드 중 하나가 이김. 엘시 (카드 1, 카드 3) 에 대해 두 가지 베시 hand 를 시도해요.")}
            </div>
          </>
        )}
        {s.kind === "scenario" && (
          <>
            <div style={{ fontWeight: 800, color: "#5b21b6", marginBottom: 4, fontSize: 14 }}>
              🎬 {curScenario.label}
            </div>
            <div>
              {s.sIdx === 0
                ? t(E, "Bessie holds card 2 + card 3. Card 2 beats card 1 ✓, but neither card 2 nor card 3 beats card 3 (chart row 3 = '010'). Let's verify both Elsie picks.",
                      "베시 hand: 카드 2 + 카드 3. 카드 2 는 카드 1 이김 ✓, 그런데 카드 2 도 카드 3 도 카드 3 못 이김 (3 행 = '010'). 두 경우 다 확인.")
                : t(E, "Bessie holds card 2 + card 1. Card 2 beats card 1 ✓, card 1 beats card 3 ✓. Looks promising — let's verify both cases.",
                      "베시 hand: 카드 2 + 카드 1. 카드 2 는 카드 1 이김 ✓, 카드 1 은 카드 3 이김 ✓. 가능성 있어 보임 — 두 경우 다 확인.")}
            </div>
          </>
        )}
        {s.kind === "case" && (() => {
          const c = curCases[s.caseIdx];
          return (
            <>
              <div style={{ fontWeight: 800, color: c.anyWin ? "#15803d" : "#7f1d1d", marginBottom: 6, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                {t(E, `Case ${s.caseIdx + 1}: Elsie plays `, `케이스 ${s.caseIdx + 1}: 엘시가 `)}
                {renderCard(c.ePlay)}
                {t(E, "", " 냄")}
              </div>
              {c.opts.map((o, j) => (
                <div key={j} style={{ fontSize: 12.5, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
                  {t(E, "Bessie picks ", "베시가 ")}
                  {renderCard(o.b)}?{" "}
                  {o.win ? <span style={{ color: "#16a34a", fontWeight: 800 }}>✓ {t(E, "wins", "이김")}</span>
                         : o.tie ? <span style={{ color: "#9ca3af", fontWeight: 800 }}>= {t(E, "tie", "비김")}</span>
                                 : <span style={{ color: "#dc2626", fontWeight: 800 }}>✗ {t(E, "loses", "짐")}</span>}
                </div>
              ))}
              <div style={{ marginTop: 6, fontWeight: 800, color: c.anyWin ? "#15803d" : "#7f1d1d" }}>
                → {c.anyWin
                  ? t(E, "Bessie HAS an answer for this Elsie pick.", "이 경우 베시한테 답이 있어요.")
                  : t(E, "Bessie has NO answer for this Elsie pick.", "이 경우 베시한테 답이 없어요.")}
              </div>
            </>
          );
        })()}
        {s.kind === "verdict" && (
          <>
            <div style={{ fontWeight: 800, color: curAllWin ? "#15803d" : "#7f1d1d", marginBottom: 6, fontSize: 14 }}>
              🏁 {curScenario.label} — {curAllWin
                ? t(E, "Verdict: WIN ✓", "결론: 승리 ✓")
                : t(E, "Verdict: NOT GUARANTEED ✗", "결론: 보장 못함 ✗")}
            </div>
            <div>
              {curAllWin
                ? t(E, "Bessie's hand wins for sure ✓ — every Elsie pick had a counter. This hand is COUNTED in the answer.",
                      "베시의 카드는 무조건 이김 ✓ — 엘시의 모든 패에 답이 있었음. 이 hand 는 정답에 카운트됨.")
                : t(E, "Bessie's hand does NOT guarantee a win ✗ — at least one Elsie pick has no counter. This hand is NOT counted.",
                      "베시의 카드는 무조건 이기지 못함 ✗ — 엘시 패 중 적어도 하나에 답이 없음. 이 hand 는 카운트 안 됨.")}
            </div>
          </>
        )}
        {s.kind === "summary" && (
          <>
            <div style={{ fontWeight: 800, color: A, marginBottom: 6, fontSize: 14 }}>
              📊 {t(E, "Summary — what gets counted?", "정리 — 무엇이 카운트됨?")}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>• {t(E, "Scenario A (", "시나리오 A (")}{renderCard(2)}, {renderCard(3)}) → <b style={{ color: "#dc2626" }}>{t(E, "FAILS, not counted", "실패, 카운트 안 됨")}</b></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>• {t(E, "Scenario B (", "시나리오 B (")}{renderCard(2)}, {renderCard(1)}) → <b style={{ color: "#16a34a" }}>{t(E, "WINS, counted", "성공, 카운트됨")}</b></div>
              <div style={{ marginTop: 6 }}>{t(E, "Counting all 9 ordered pairs against Elsie (card 1, card 3), only (card 2, card 1) and (card 1, card 2) win. That's why Sample I/O answer = 2.",
                    "엘시 (카드 1, 카드 3) 에 대해 9 가지 순서쌍 다 세보면, (카드 2, 카드 1) 과 (카드 1, 카드 2) 두 가지만 이김. 그래서 Sample I/O 답 = 2.")}</div>
            </div>
          </>
        )}
      </NarrativePanel>

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HpsSim — uses Sample I/O beats matrix `001/100/010` so the free
   sim is consistent with the chart shown in Ch1-3.
   Buttons use the abstract shape glyphs.
   ═══════════════════════════════════════════════════════════════ */
const _HPS_BEATS = BEATS_MATRIX;   // ["001", "100", "010"] — same as Sample I/O

export function HpsSim({ E }) {
  // 0-indexed: 0 = card 1, 1 = card 2, 2 = card 3
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(2);
  const beats = _HPS_BEATS;
  const pairBeats = (a, b, x) => beats[a][x] === "1" || beats[b][x] === "1";
  const winS1 = pairBeats(a, b, s1);
  const winS2 = pairBeats(a, b, s2);
  const winsAll = winS1 && winS2;

  // Compact shape chip — keeps shape color visible even when selected
  const ShapeChip = ({ idx, isActive, accent, onClick }) => {
    const sh = SHAPES[idx + 1];
    return (
      <button onClick={onClick} style={{
        flex: 1, height: 38, borderRadius: 8,
        border: `2px solid ${isActive ? accent : "#e5e7eb"}`,
        background: isActive ? `${accent}15` : "#fff",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        boxShadow: isActive ? `inset 0 0 0 1px ${accent}` : "none",
      }}>
        <span style={{ fontSize: 18, color: sh.color, lineHeight: 1 }}>{sh.glyph}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: isActive ? accent : C.dim }}>{idx + 1}</span>
      </button>
    );
  };

  // Compact slot picker (one labeled row of 3 chips)
  const SlotPicker = ({ label, value, accent, onChange }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: 32, fontSize: 12, fontWeight: 800, color: accent, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {[0,1,2].map(i => <ShapeChip key={i} idx={i} isActive={i === value} accent={accent} onClick={() => onChange(i)} />)}
      </div>
    </div>
  );

  // Big card display in result panel
  const Pill = ({ idx }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", border: `1.5px solid ${SHAPES[idx + 1].color}40`, borderRadius: 6, background: "#fff" }}>
      <span style={{ fontSize: 16, color: SHAPES[idx + 1].color, lineHeight: 1 }}>{SHAPES[idx + 1].glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 800, color: C.text }}>{idx + 1}</span>
    </span>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: C.dim, textAlign: "center" }}>
        {t(E, "Beats chart (same as Sample I/O):", "승패 차트 (Sample I/O 와 같음):")}{" "}
        <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>001 / 100 / 010</code>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: A, marginBottom: 6 }}>{t(E, "Bessie's pair (a, b)", "베시 쌍 (a, b)")}</div>
        <SlotPicker label="a" value={a} accent={A} onChange={setA} />
        <SlotPicker label="b" value={b} accent={A} onChange={setB} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#dc2626", marginBottom: 6 }}>{t(E, "Elsie's pair (s1, s2)", "엘시 쌍 (s1, s2)")}</div>
        <SlotPicker label="s1" value={s1} accent="#dc2626" onChange={setS1} />
        <SlotPicker label="s2" value={s2} accent="#dc2626" onChange={setS2} />
      </div>

      <div style={{
        marginTop: 14, padding: "10px 12px", borderRadius: 10,
        background: winsAll ? "#dcfce7" : "#fef2f2",
        border: `2px solid ${winsAll ? "#16a34a" : "#dc2626"}`,
        fontSize: 12.5, color: C.text, lineHeight: 1.8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {t(E, "vs s1 ", "vs s1 ")}<Pill idx={s1} />: <b style={{ color: winS1 ? "#16a34a" : "#dc2626", fontSize: 16 }}>{winS1 ? "✓" : "✗"}</b>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {t(E, "vs s2 ", "vs s2 ")}<Pill idx={s2} />: <b style={{ color: winS2 ? "#16a34a" : "#dc2626", fontSize: 16 }}>{winS2 ? "✓" : "✗"}</b>
        </div>
        <div style={{ marginTop: 4, fontWeight: 900, color: winsAll ? "#16a34a" : "#dc2626", fontSize: 14 }}>
          {winsAll ? t(E, "✅ This pair WINS!", "✅ 이 쌍은 승리!") : t(E, "❌ This pair LOSES", "❌ 이 쌍은 패배")}
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

/* Section 1: Input + chart */
const HP_INPUT_PY = (E) => [
  "N, M = map(int, input().split())",
  t(E, "# beats[i][j] = '1' if symbol i beats symbol j, else '0'",
        "# beats[i][j] = '1' 이면 기호 i 가 j 를 이김, 아니면 '0'"),
  "beats = [input().strip() for _ in range(N)]",
];
const HP_INPUT_CPP = (E) => [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M;",
  "    cin >> N >> M;",
  t(E, "    // beats[i][j] = '1' if card i beats card j",
        "    // beats[i][j] = '1' 이면 카드 i 가 카드 j 이김"),
  "    vector<string> beats;",
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "        beats.push_back(row);",
  "    }",
];

/* Section 2: per-query brute force with INLINE win check (no helper function) */
const HP_LOOP_PY = (E) => [
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  t(E, "    s1 -= 1; s2 -= 1   # convert to 0-based",
        "    s1 -= 1; s2 -= 1   # 0-based 로 변환"),
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  t(E, "            # pair (a, b) wins for sure iff it covers s1 AND s2",
        "            # 쌍 (a, b) 가 s1 AND s2 둘 다 cover 하면 무조건 이김"),
  "            wins_s1 = beats[a][s1] == '1' or beats[b][s1] == '1'",
  "            wins_s2 = beats[a][s2] == '1' or beats[b][s2] == '1'",
  "            if wins_s1 and wins_s2:",
  "                count += 1",
  "    print(count)",
];
const HP_LOOP_CPP = (E) => [
  "    for (int q = 0; q < M; q++) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  t(E, "        s1--; s2--;   // convert to 0-based",
        "        s1--; s2--;   // 0-based 로 변환"),
  "        long long count = 0;",
  "",
  "        for (int a = 0; a < N; a++) {",
  "            for (int b = 0; b < N; b++) {",
  t(E, "                // pair (a, b) wins for sure iff it covers s1 AND s2",
        "                // 쌍 (a, b) 가 s1 AND s2 둘 다 cover 하면 무조건 이김"),
  "                bool wins_s1 = beats[a][s1] == '1' || beats[b][s1] == '1';",
  "                bool wins_s2 = beats[a][s2] == '1' || beats[b][s2] == '1';",
  "                if (wins_s1 && wins_s2) count++;",
  "            }",
  "        }",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 3: Full code (no helper, all inline) */
const HP_FULL_PY = [
  "N, M = map(int, input().split())",
  "beats = [input().strip() for _ in range(N)]",
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            wins_s1 = beats[a][s1] == '1' or beats[b][s1] == '1'",
  "            wins_s2 = beats[a][s2] == '1' or beats[b][s2] == '1'",
  "            if wins_s1 and wins_s2:",
  "                count += 1",
  "    print(count)",
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
  "    vector<string> beats;",
  "    for (int i = 0; i < N; i++) {",
  "        string row;",
  "        cin >> row;",
  "        beats.push_back(row);",
  "    }",
  "",
  "    for (int q = 0; q < M; q++) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--; s2--;",
  "        long long count = 0;",
  "        for (int a = 0; a < N; a++) {",
  "            for (int b = 0; b < N; b++) {",
  "                bool wins_s1 = beats[a][s1] == '1' || beats[b][s1] == '1';",
  "                bool wins_s2 = beats[a][s2] == '1' || beats[b][s2] == '1';",
  "                if (wins_s1 && wins_s2) count++;",
  "            }",
  "        }",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];
export function getHpsSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Beats Chart", "📦 1. 입력 + 승패 차트"),
      color: A,
      py: HP_INPUT_PY(E), cpp: HP_INPUT_CPP(E),
      why: [
        t(E, "Read the N×N chart of '0'/'1'. beats[i][j] = '1' means card i beats card j.",
            "N×N의 '0'/'1' 차트 읽기. beats[i][j] = '1'이면 카드 i 가 카드 j 이김."),
        t(E, "Storing it as strings is fine — direct character lookup is O(1).",
            "문자열로 저장 OK — 문자 직접 접근은 O(1)."),
      ],
      pyOnly: [
        t(E, "List comprehension reads N lines into a list of strings.",
            "리스트 컴프리헨션으로 N줄을 문자열 리스트로."),
      ],
      cppOnly: [
        t(E, "Push back each row as we read — uses only vector + string from cpp-9 / cpp-11.",
            "한 줄씩 읽어 push_back — cpp-9 (vector) + cpp-11 (string) 만 사용."),
      ],
    },
    {
      label: t(E, "🔁 2. Per-query brute force (inline check)", "🔁 2. 쿼리마다 완전탐색 (인라인 체크)"),
      color: "#0891b2",
      py: HP_LOOP_PY(E), cpp: HP_LOOP_CPP(E),
      why: [
        t(E, "For each Elsie pair, try all N² Bessie pairs (a, b).",
            "엘시의 각 쌍마다 베시의 N² 쌍 (a, b)을 모두 시도."),
        t(E, "Pair (a, b) wins iff at least one of a, b beats s1 AND at least one beats s2.",
            "쌍 (a, b) 가 이기려면 a, b 중 하나가 s1 이김 AND 하나가 s2 이김."),
        t(E, "We compute these two booleans (wins_s1, wins_s2) inline — no helper function needed.",
            "두 boolean (wins_s1, wins_s2) 을 인라인으로 계산 — 헬퍼 함수 불필요."),
        t(E, "Total work: O(M · N²) — fits comfortably for Bronze sizes.",
            "총 작업: O(M · N²) — Bronze 크기에는 충분."),
      ],
      pyOnly: [
        t(E, "Two nested for loops on range(N) is the most direct way.",
            "range(N) 위 이중 for 루프가 가장 직관적."),
      ],
      cppOnly: [
        t(E, "Uses only cpp-7 (loops), cpp-5/6 (operators/if), cpp-11 (string indexing). No lambdas, no helper functions.",
            "cpp-7 (루프), cpp-5/6 (연산자/if), cpp-11 (문자열 인덱싱) 만 사용. 람다 없음, 헬퍼 함수 없음."),
      ],
    },
    {
      label: t(E, "🎯 3. Full Code", "🎯 3. 전체 코드"),
      color: "#7c3aed",
      py: HP_FULL_PY, cpp: HP_FULL_CPP,
      why: [
        t(E, "Read input → loop M queries (with inline win check) → print counts. That's the whole program.",
            "입력 읽기 → M 쿼리 루프 (인라인 win 체크) → 결과 출력. 그게 전부."),
        t(E, "Brute force is fine here — no smarter trick needed at Bronze.",
            "Bronze에서는 완전탐색으로 충분 — 더 똑똑한 트릭 불필요."),
      ],
      pyOnly: [
        t(E, "If TLE in Python, submit as PyPy.",
            "Python TLE 면 PyPy 로 제출."),
      ],
      cppOnly: [
        t(E, "Only Part 1-2 syntax used: includes, vector, string indexing, loops, if, basic IO.",
            "Part 1-2 문법만 사용: includes, vector, 문자열 인덱싱, 루프, if, 기본 IO."),
      ],
    },
  ];
}

export function HpsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
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
