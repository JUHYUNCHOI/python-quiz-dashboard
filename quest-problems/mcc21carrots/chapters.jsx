import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc21CarrotsSections, getMcc21CarrotsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: split baskets into ODD and EVEN piles.
   Teaches: a sum of 3 numbers is ODD in exactly two recipes —
     🟠🟠🟠  three odds
     🟠⚪⚪  one odd + two evens
   So we never pick triples; we just count odds and evens and
   check whether either recipe can be built.
   ───────────────────────────────────────────────────────────── */
const PRESETS = [
  { label: "① 3 5 2", vals: [3, 5, 2] },
  { label: "② 4 6 2 3", vals: [4, 6, 2, 3] },
  { label: "③ 4 8 10 5 2", vals: [4, 8, 10, 5, 2] },
];

function OddEvenPileSim({ E }) {
  const [vals, setVals] = useState([3, 5, 2]);
  /* 2026-09-09: 시뮬을 열면 **클릭 전에** 알고리즘 전체가 문장으로 나와 있었다 —
     맨 위 결론("홀 셋 또는 홀 하나+짝 둘"), 레시피 두 줄의 이름표, 맨 아래 요약
     ("개수만 세면 된다"). 학생이 바구니를 한 번도 누르기 전에 답을 다 쥐고 시작했다.
     바구니를 한 번이라도 만지면 그때 드러나게 한다. */
  const [touched, setTouched] = useState(false);

  const oddIdx = vals.map((v, i) => (v % 2 === 1 ? i : -1)).filter((i) => i >= 0);
  const evenIdx = vals.map((v, i) => (v % 2 === 0 ? i : -1)).filter((i) => i >= 0);
  const oddN = oddIdx.length;
  const evenN = evenIdx.length;

  const recipeA = oddN >= 3;                    // 🟠🟠🟠
  const recipeB = oddN >= 1 && evenN >= 2;       // 🟠⚪⚪
  const verdict = recipeA || recipeB;

  // click a basket → +1 carrot, flipping its parity so the piles move
  const bump = (i) => { setTouched(true); setVals((prev) => prev.map((v, j) => (j === i ? v + 1 : v))); };

  const basketChip = (v, i, odd) => (
    <button
      key={i}
      onClick={() => bump(i)}
      title={t(E, "click: +1 carrot", "누르면 당근이 1 개 늘어요")}
      style={{
        ...NW, cursor: "pointer",
        display: "inline-flex", flexDirection: "column", alignItems: "center",
        width: 52, padding: "6px 4px", borderRadius: 8,
        border: `2px solid ${odd ? "#059669" : "#94a3b8"}`,
        background: odd ? "#d1fae5" : "#f1f5f9",
      }}>
      <span style={{ fontSize: 16 }}>🥕</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: odd ? "#065f46" : "#475569" }}>{v}</span>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: odd ? "#059669" : "#64748b" }}>{odd ? (E ? "odd" : "홀") : (E ? "even" : "짝")}</span>
    </button>
  );

  const recipeRow = (chips, on, label) => (
    <div style={{
      ...KA, display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
      borderRadius: 10, marginBottom: 8,
      border: `1.5px solid ${on ? "#059669" : "#e2e8f0"}`,
      background: on ? "#ecfdf5" : "#f8fafc", opacity: on ? 1 : 0.65,
    }}>
      <span style={{ fontSize: 18, ...NW }}>{chips}</span>
      <span style={{ fontSize: 12, color: on ? "#065f46" : C.dim, fontWeight: 600, flex: 1 }}>{label}</span>
      <span style={{ ...NW, fontSize: 12, fontWeight: 800, color: on ? "#059669" : "#94a3b8" }}>
        {on ? (E ? "✓ can build" : "✓ 만들 수 있어요") : (E ? "✗ not enough" : "✗ 부족")}
      </span>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          🟠⚪ {t(E, "Split into ODD and EVEN piles", "홀수·짝수 더미로 나누기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line" }}>
          {touched
            ? t(E,
            "A sum of 3 numbers is ODD in only two recipes: three odds, or one odd + two evens. So forget picking triples — just count odds and evens.",
            "세 수의 합이 홀수가 되는 방법은 딱 두 가지뿐이에요.\n홀수 3 개이거나, 홀수 1 개 + 짝수 2 개예요.\n그러니 조합을 고르지 말고 홀수·짝수 개수만 세면 돼요.")
            : t(E,
                "Click the baskets and watch the verdict flip. When does a sum of three become ODD?",
                "바구니를 눌러보면서 판정이 언제 바뀌는지 봐요.\n세 수의 합은 어떨 때 홀수가 될까요?")}
        </div>

        {/* preset picker */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, color: "#065f46", fontWeight: 700 }}>{t(E, "example:", "예제:")}</span>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => { setTouched(true); setVals([...p.vals]); }} style={{
              ...NW, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700,
              cursor: "pointer", padding: "3px 8px", borderRadius: 6,
              border: "1px solid #a7f3d0", background: "#fff", color: "#065f46",
            }}>{p.label}</button>
          ))}
        </div>

        {/* the two piles */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 150, border: "1.5px solid #6ee7b7", borderRadius: 10, padding: 10, background: "#f0fdf4" }}>
            <div style={{ ...NW, fontSize: 11.5, fontWeight: 800, color: "#059669", marginBottom: 6 }}>
              🟠 {t(E, "ODD pile", "홀수 더미")} · {oddN}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 62 }}>
              {oddIdx.length ? oddIdx.map((i) => basketChip(vals[i], i, true)) : <span style={{ fontSize: 11.5, color: C.dim }}>{t(E, "(empty)", "(비었어요)")}</span>}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 150, border: "1.5px solid #cbd5e1", borderRadius: 10, padding: 10, background: "#f8fafc" }}>
            <div style={{ ...NW, fontSize: 11.5, fontWeight: 800, color: "#475569", marginBottom: 6 }}>
              ⚪ {t(E, "EVEN pile", "짝수 더미")} · {evenN}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 62 }}>
              {evenIdx.length ? evenIdx.map((i) => basketChip(vals[i], i, false)) : <span style={{ fontSize: 11.5, color: C.dim }}>{t(E, "(empty)", "(비었어요)")}</span>}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 12, ...KA }}>
          {t(E, "Tip: click any basket to add 1 carrot and watch it hop piles.", "바구니를 누르면 당근이 1 개 늘어서 다른 더미로 옮겨 가요.")}
        </div>

        {/* the two winning recipes */}
        {/* 2026-09-09: 레시피 이름표가 클릭 전부터 떠 있어서, 학생이 바구니를 만지기 전에
            "홀+홀+홀" "홀+짝+짝" 이라는 답을 읽고 시작했다. 조작 후에만 이름을 붙인다 —
            줄 자체(칩과 켜짐/꺼짐)는 그대로 두어 무엇이 바뀌는지는 계속 보인다. */}
        {recipeRow("🟠🟠🟠", recipeA, touched ? t(E, "three odds  (odd+odd+odd = odd)", "홀수 3개  (홀+홀+홀 = 홀)") : "")}
        {recipeRow("🟠⚪⚪", recipeB, touched ? t(E, "one odd + two evens  (odd+even+even = odd)", "홀수 1개 + 짝수 2개  (홀+짝+짝 = 홀)") : "")}

        {/* verdict */}
        <div style={{
          marginTop: 4, background: "#0f172a", color: "#f8fafc", padding: "10px 14px", borderRadius: 8,
          fontSize: 13.5, fontWeight: 800, textAlign: "center", ...KA,
        }}>
          {t(E, "verdict: ", "결과: ")}
          <span style={{ color: verdict ? "#34d399" : "#fb7185" }}>{verdict ? "YES" : "NO"}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginLeft: 8 }}>
            {/* 2026-09-17: "레시피" 는 화면에서 뜻을 밝힌 적 없는 비유였다. 지우면 더 쉬워진다. */}
            {verdict
              ? t(E, "(one of the two ways works)", "(두 방법 중 하나가 돼요)")
              : t(E, "(neither of the two ways works)", "(두 방법 다 안 돼요)")}
          </span>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {touched && t(E,
            "Only the counts matter, never the exact baskets — so one scan to count odds and evens answers each test case.",
            "어떤 바구니를 고르는지는 중요하지 않고 홀수·짝수가 몇 개인지만 중요해요. 그래서 한 번 훑어 개수만 세면 테스트마다 답할 수 있어요.")}
        </div>
      </div>
    </div>
  );
}

/* 2026-09-11: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 죽은 복제본이었다(저장소 67곳 중 실제로 쓰는 건 3곳뿐).
   살아 있는 코드는 components.jsx 의 단계별 배열이다. 둘을 같이 두면 조용히 어긋난다 —
   실제로 오늘 입출력 방식을 고칠 때 이쪽만 옛 모양으로 남아 검사기에 걸렸다. */

export function makeMcc21CarrotsCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Can Kenneth pick 3 baskets whose carrot total is odd?",
        "합이 홀수가 되는 바구니 3 개를 고를 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🥕"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>Carrots</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P1</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "For each test case, decide whether SOME 3 baskets can sum to an odd total. Print YES or NO.",
                "각 테스트마다 어떤 바구니 3 개의 합이 홀수가 될 수 있는지 판단해요. YES 또는 NO 를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Kenneth has ", "케네스에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N baskets", "N 개의 바구니")}</b>
                  {t(E, "; basket i holds ", "가 있고, i 번 바구니엔 ")}
                  <b style={{ color: "#059669" }}>C[i]</b>
                  {t(E, " carrots.", " 개의 당근이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He wants to pick ", "그는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "any 3 baskets whose total is ODD", "합이 홀수인 아무 바구니 3 개")}</b>
                  {t(E, ". Is that possible?", "를 고르고 싶어요. 가능할까요?")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "테스트는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "T test cases", "T 개")}</b>
                  {t(E, " to answer.", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each test case, print ", "각 테스트마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES or NO", "YES 또는 NO")}</b>
                  {t(E, " on its own line.", "를 한 줄씩 출력해요.")}
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
        "Read the input format and the official example. T test cases; test case i has N[i] baskets holding C[i] carrots.",
        "입력이 어떤 모양으로 들어오는지 공식 예제로 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              {/* 2026-09-17: 여기가 "N 한 줄, 그다음 … 한 줄" 이라고 **원문에 없는 줄 형식**을 적어
                  두던 자리다. 원문(public/problems/mcc21carrots.pdf)은 T = 3 / N = [3,4,5] /
                  C = [[3,5,2], ...] 처럼 값을 변수로 준다. 값의 이름만 남긴다. */}
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 개수")}</div>
              <div>• <b>N</b> — {t(E, "test case i has N[i] baskets", "테스트 i 의 바구니 개수 N[i]")}</div>
              <div>• <b>C</b> — {t(E, "C[i] holds that test case's N[i] carrot counts", "테스트 i 의 바구니에 든 당근 수 N[i] 개")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 200, 3 ≤ N ≤ 100000, 1 ≤ C[i] ≤ 10^9.", "제약: 1 ≤ T ≤ 200, 3 ≤ N ≤ 100000, 1 ≤ C[i] ≤ 10^9.")}
            </div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: T = 3, N = [3, 4, 5], C = [[3,5,2], …].\nOur code writes those same values down and starts from there.\nReading them line by line with input() shows up in the 2022 problems.",
                "원문은 T = 3, N = [3, 4, 5], C = [[3,5,2], ...] 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>T = 3</div>
              <div>N = [3, 4, 5]</div>
              <div style={{ overflowX: "auto" }}>C = [[3, 5, 2],</div>
              <div style={{ overflowX: "auto" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4, 6, 2, 3],</div>
              <div style={{ overflowX: "auto" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4, 8, 10, 5, 2]]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>NO</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>YES</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA, whiteSpace: "pre-line" }}>
            {t(E,
              /* 2026-09-09: 여기에 세 샘플의 합을 직접 계산해 답의 근거까지 다 적어놨다.
                 형식 카드는 "각 줄이 무엇인지" 까지가 몫이고, "왜 그 답인지" 는
                 바로 다음 쪽 시뮬이 같은 세 샘플을 프리셋으로 갖고 있어서 거기서 답한다.
                 원문 설명을 지운 게 아니라 자리를 옮긴 것이다. */
              "Same three tests wait in the sim on the next page — try them there and see which sums come out odd.",
              "다음 쪽 시뮬에 이 세 테스트가 그대로 들어 있어요.\n거기서 직접 눌러보며 어느 합이 홀수가 되는지 봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the idea. Split the baskets into an ODD pile and an EVEN pile, and watch which winning recipe can be built.",
        "바구니를 홀수 더미와 짝수 더미로 나눠서 봐요."),
      content: <OddEvenPileSim E={E} />,
    },
  ];
}

export function makeMcc21CarrotsCh2(E, lang = "py") {
  const w = getMcc21CarrotsWalk(E);
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "Instead of trying every triple, just count odd and even baskets.",
        "조합을 다 뒤지는 대신 홀수·짝수 개수만 세면 돼요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every triple of baskets", "느림: 바구니 3 개 조합을 모두 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "About N×N×N/6 triples (choosing any 3 baskets). With N = 100000 that is ~10^14 — times out badly.", "바구니 3 개를 고르는 조합이 약 N×N×N/6 개예요. N = 100000 이면 약 10^14 번이라 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count odds & evens, check the two ways", "빠름: 홀수·짝수 세고 두 방법 확인")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "One pass counts odd and even. YES if (odd ≥ 3) or (odd ≥ 1 and even ≥ 2). Just one sweep per test.", "한 번 훑어서 홀수와 짝수를 세요. 홀수 ≥ 3 이거나 (홀수 ≥ 1 이고 짝수 ≥ 2) 이면 YES 예요. 테스트마다 딱 한 번만 훑어요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: code, CodeWalk — bubbles sit on the lines they explain
    {
      type: "reveal",
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang="py" code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
