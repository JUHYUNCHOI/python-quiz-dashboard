import { C, t } from "@/components/quest/theme";
import { getTichuWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { TichuSim } from "./sims";

const A = "#dc2626";

/* 정답 코드 (참고용 export — 정렬+중복제거+투포인터). */
export const SOLUTION_CODE = [
  "n, k = map(int, input().split())",
  "c = sorted(set(map(int, input().split())))",
  "m = len(c)",
  "win = 0",
  "i = 0",
  "for j in range(m):",
  "    while c[j] - c[i] - (j - i) > k:",
  "        i += 1",
  "    win = max(win, j - i + 1)",
  "print(min(n, win + k))",
];

/* 샘플 입출력 — 시즌 표준 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function TichuSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`11 2
2 5 4 3 3 8 7 11 15`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`8`}
          </div>
        </div>
      </div>

      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#7f1d1d", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div>
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>11 2</code>
          {" — "}
          {t(E, "N = 11 total cards, K = 2 wildcards.", "N = 11 (총 카드 수), K = 2 (와일드 수).")}
        </div>
        <div style={{ marginTop: 4 }}>
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2 5 4 3 3 8 7 11 15</code>
          {" — "}
          {t(E, "the N−K = 9 numbered cards (the other 2 are wild).", "수 카드 N−K = 9개 (나머지 2장은 와일드).")}
        </div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fca5a5" }}>
          {t(E, "Output ", "출력 ")}
          <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>8</code>
          {t(E, " = the length of the longest run (consecutive integers) we can build.",
               " = 만들 수 있는 가장 긴 run (연속된 정수) 의 길이.")}
        </div>
      </div>

      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #fca5a5", borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
        {t(E, "Turn the 2 wildcards into 6 and 9 → ",
             "와일드 2장을 6과 9로 만들면 → ")}
        <b style={{ color: A, fontFamily: "'JetBrains Mono',monospace" }}>2 3 4 5 [6] 7 8 [9]</b>
        {t(E, " → a run of length ", " → 길이 ")}
        <b style={{ color: "#15803d" }}>8</b>{t(E, ".", " 의 run.")}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all" }}>
        {t(E, "📌 Constraints: N ≤ 10⁵ · each card value Cᵢ ≤ 10⁹ · cards can be rearranged freely.",
             "📌 제약: N ≤ 10⁵ · 각 카드 값 Cᵢ ≤ 10⁹ · 카드는 자유롭게 재배열.")}
      </div>
    </div>
  );
}

/* 정리 — 발견한 걸 한 판단으로. */
function TichuRecap({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 13.5, fontWeight: 800, color: col, wordBreak: "keep-all", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#7f1d1d", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole idea, at a glance", "핵심 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Three steps take us from the cards to the answer.", "세 단계로 카드에서 답까지 가요.")}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Duplicates are useless (each value once)", "중복은 소용없어요 (각 값 한 번)")}
             res={t(E, "sort + dedupe", "정렬 + 중복제거")} col="#dc2626" bg="#fef2f2" />
        <Row q={t(E, "Widest window with inner gap (value-diff − count-diff) ≤ K", "내부 빈칸 (값차 − 개수차) ≤ K 인 최대 창")}
             res={t(E, "two pointers", "투포인터")} col="#8b5cf6" bg="#f5f3ff" />
        <Row q={t(E, "Fill gaps, extend the ends", "빈칸 메꾸고 양끝 확장")}
             res={t(E, "answer = window + K", "답 = 창 + K")} col="#059669" bg="#ecfdf5" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeTichuCh1 — 시즌 표준 (라벨 + 구체 샘플 + 시뮬 + 정리)
   문제(도입) → 샘플 입출력 → 빈칸을 와일드로 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "You have N cards. N−K of them show integers; K of them are wildcards that can become any value. A 'run' is consecutive integers a, a+1, a+2, … You may rearrange freely. Print the length of the longest run you can build.",
        "카드 N 장이 있어요. 그중 N−K 장엔 정수가 적혀 있고, K 장은 아무 수나 될 수 있는 와일드예요. 'run' 은 연속된 정수 a, a+1, a+2, … 예요. 카드는 자유롭게 재배열할 수 있어요. 만들 수 있는 가장 긴 run 의 길이를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🃏</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Tichu</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Build the longest possible run of consecutive integers, using wildcards to fill any value.",
                "와일드로 빈 값을 채워 가장 긴 연속 정수 run 을 만들기.")}
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
                  {t(E, "You have ", "카드 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cards", "N 장")}</b>
                  {t(E, ": ", " 이 있어요: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N−K show integers", "N−K 장엔 정수")}</b>
                  {t(E, ", ", ", ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "K are wildcards", "K 장은 와일드")}</b>
                  {t(E, " (any value).", " (아무 수).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "run", "run")}</b>
                  {t(E, " = consecutive integers ", " = 연속된 정수 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>a, a+1, a+2, …</code>
                  {t(E, ". Cards may be rearranged freely.", ". 카드는 자유롭게 재배열해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "length of the longest run", "가장 긴 run 의 길이")}</b>
                  {t(E, " you can form.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E,
        "A concrete example — the cards, and the answer we must print.",
        "구체적인 예 하나 — 카드들과, 우리가 출력해야 할 답."),
      content: (<TichuSample E={E} />),
    },

    // [전] 빈칸을 와일드로 — 수직선 시뮬
    {
      type: "reveal",
      label: t(E, "Fill gaps with wildcards", "빈칸을 와일드로"),
      narr: t(E,
        "Watch the run grow: dedupe the hand, pick a window, fill the missing value with a wildcard, then extend an end.",
        "run 이 자라는 걸 봐요: 중복 제거 → 창 잡기 → 빠진 값을 와일드로 메꾸기 → 끝을 확장."),
      content: (<TichuSim E={E} />),
    },

    // [결] 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E,
        "Everything boils down to a window and a count.",
        "결국 창 하나와 개수 세기로 정리돼요."),
      content: (<TichuRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeTichuCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh2(E, lang = "py") {
  const w = getTichuWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read + dedupe + sort, then two-pointer for the widest window with gap ≤ K, then answer = window + K.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 읽기·중복제거·정렬 → 투포인터로 빈칸 ≤ K 최대 창 → 답 = 창 + K."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#dc2626" />
      ),
    },
  ];
}
