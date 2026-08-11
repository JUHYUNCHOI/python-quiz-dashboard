import { C, t } from "@/components/quest/theme";
import { getCollatzWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CollatzStepSim } from "./sims";

const A = "#059669";

/* 샘플 입출력 — mooin3 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩). */
function CollatzSample({ E }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: A, textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`5 1
1 2 3 4 5`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`33`}
          </div>
        </div>
      </div>

      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>5 1</code> — {t(E, "n = 5 numbers, k = 1 repeat", "n = 5 (개수), k = 1 (반복 횟수)")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2 3 4 5</code> — {t(E, "the list of numbers", "숫자 리스트")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #6ee7b7" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>33</code>{t(E, " = the sum of the list after applying the whole procedure k times.", " = 절차를 k번 적용한 뒤 리스트의 합.")}
        </div>
      </div>

      {/* 결과 미리보기: 리스트가 어떻게 바뀌는지 한 장면으로 */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #6ee7b7", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center", wordBreak: "keep-all" }}>
          {t(E, "One pass (k = 1): even ÷2, odd ×3+1", "한 바퀴(k = 1): 짝수 ÷2, 홀수 ×3+1")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
          <span style={{ color: "#64748b" }}>[1 2 3 4 5]</span>
          <span style={{ color: A, fontSize: 18 }}>→</span>
          <span style={{ color: "#065f46" }}>[4 1 10 2 16]</span>
          <span style={{ color: A, fontSize: 18 }}>→</span>
          <span style={{ color: "#15803d" }}>{t(E, "sum 33", "합 33")}</span>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: n, k ≤ 1000 · each aᵢ ≤ 10⁴. Another sample: 6 3 / 3 1 4 1 5 9 → 33.",
             "📌 제약: n, k ≤ 1000 · 각 aᵢ ≤ 10⁴. 다른 샘플: 6 3 / 3 1 4 1 5 9 → 33.")}
      </div>
    </div>
  );
}

/* 정리 — 이 문제는 결국 '시키는 대로 k번 + 합'. */
function CollatzRecap({ E }) {
  const Row = ({ q, res }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#ecfdf5", border: "1.5px solid #6ee7b7",
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: A }}>→</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole plan", "전체 계획 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "No trick needed — just do exactly what's asked.", "특별한 트릭 필요 없어요 — 시키는 대로만 하면 돼요.")}
      </div>
      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "For each number: even?", "숫자마다: 짝수면?")} res={t(E, "÷ 2", "÷ 2")} />
        <Row q={t(E, "For each number: odd?", "숫자마다: 홀수면?")} res={t(E, "× 3 + 1", "× 3 + 1")} />
        <Row q={t(E, "Do the whole pass ...", "이 한 바퀴를 ...")} res={t(E, "k times", "k번")} />
        <Row q={t(E, "Finally", "마지막에")} res={t(E, "sum", "합")} />
      </div>
      <div style={{ maxWidth: 470, margin: "14px auto 0", background: "#fffbeb", border: "1px solid #fbbf24", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: "#92400e", lineHeight: 1.7, wordBreak: "keep-all", textAlign: "center" }}>
        {t(E, "n · k ≤ 10⁶, so a plain simulation is fast enough. (But 3×+1 can grow — use 64-bit / long long.)",
             "n · k ≤ 10⁶ 라 그냥 시뮬로 충분히 빨라요. (단 3×+1 로 값이 커질 수 있으니 64비트 / long long 사용.)")}
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCollatzCh1 — 시즌 표준 모양 (라벨 + 구체 샘플 + 시뮬)
   문제(도입) → 샘플 입출력 → 한 번 적용해보기 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "You have a list of n numbers. Repeat this whole pass k times: each number, if even halve it, if odd triple-plus-one. At the end, print the sum of the list.",
        "숫자 n개짜리 리스트가 있어요. 이 한 바퀴를 k번 반복해요: 숫자마다 짝수면 반으로, 홀수면 3배+1. 다 끝나면 리스트의 합을 출력."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🔢</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>Collatz</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Apply the even/odd rule to every number, repeat the whole thing k times, then print the sum of the list.",
                "모든 숫자에 짝/홀 규칙을 적용하고 그 전체를 k번 반복한 뒤, 리스트의 합을 출력.")}
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
                  {t(E, "You're given a list of ", "숫자 ")}
                  <b style={{ color: "#059669" }}>n</b>
                  {t(E, " numbers a₁, a₂, …, aₙ.", " 개짜리 리스트 a₁, a₂, …, aₙ 이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One pass: replace ", "한 바퀴: 각 ")}
                  <b>aᵢ</b>
                  {t(E, " with ", " 를 — ")}
                  <code style={{ background: "#eff6ff", padding: "1px 5px", borderRadius: 4 }}>aᵢ / 2</code>
                  {t(E, " if even, or ", " (짝수) 또는 ")}
                  <code style={{ background: "#fffbeb", padding: "1px 5px", borderRadius: 4 }}>3·aᵢ + 1</code>
                  {t(E, " if odd.", " (홀수) 로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeat the whole pass ", "이 한 바퀴 전체를 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "exactly k times", "정확히 k번")}</b>
                  {t(E, " (not 'until it reaches 1' — always k passes).", " 반복 ('1이 될 때까지'가 아니라 — 무조건 k번).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "마지막 리스트의 ")}
                  <b style={{ color: "#059669" }}>{t(E, "sum", "합")}</b>
                  {t(E, " of the final list.", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // [승] 샘플 입출력 (구체 숫자)
    {
      type: "reveal",
      label: t(E, "Sample I/O", "샘플 입출력"),
      narr: t(E,
        "A concrete example — one list, and the number we must print.",
        "구체적인 예 하나 — 리스트 하나와, 우리가 출력해야 할 숫자."),
      content: (<CollatzSample E={E} />),
    },

    // [전] 한 번 적용해보기 — 시뮬
    {
      type: "reveal",
      label: t(E, "Try one pass", "한 번 적용해보기"),
      narr: t(E,
        "Let's run the procedure once on [1, 2, 3, 4, 5], number by number, and add up the result.",
        "[1, 2, 3, 4, 5] 에 절차를 한 번, 숫자를 하나씩 돌려보고 결과를 더해봐요."),
      content: (<CollatzStepSim E={E} />),
    },

    // [결] 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E,
        "It all comes down to: do the pass k times, then sum.",
        "결국 정리하면: 한 바퀴를 k번 돌리고, 합을 구해요."),
      content: (<CollatzRecap E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCollatzCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh2(E, lang = "py") {
  const w = getCollatzWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read the input, repeat the pass k times transforming each number, then print the sum.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → 한 바퀴를 k번 돌리며 각 숫자 변환 → 합 출력."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
