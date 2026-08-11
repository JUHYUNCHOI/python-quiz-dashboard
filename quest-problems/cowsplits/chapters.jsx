import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { EraseRuleSim, StuckSim, InsightSim, LetterGroupSim } from "./sims";

const A = "#059669";
const GRPCOL = { C: "#ef4444", O: "#f59e0b", W: "#8b5cf6" };   // 그룹(연산) 색
const GRPNUM = { C: 1, O: 2, W: 3 };

/* 계획/정리 — 발견한 걸 한 판단으로. */
function CowSplitsPlan({ E }) {
  const Row = ({ q, res, col, bg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, border: `1.5px solid ${col}`,
      borderRadius: 10, padding: "11px 14px" }}>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#334155", wordBreak: "keep-all" }}>{q}</div>
      <div style={{ fontSize: 16, color: col }}>→</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: col, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{res}</div>
    </div>
  );
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#065f46", textAlign: "center", marginBottom: 6 }}>
        🧭 {t(E, "The whole decision, at a glance", "전체 판단 한눈에")}
      </div>
      <div style={{ fontSize: 12, color: C.dim, textAlign: "center", marginBottom: 14, wordBreak: "keep-all" }}>
        {t(E, "Check these in order — the first one that fits is the answer.", "위에서부터 확인 — 처음 맞는 게 답이에요.")}
      </div>
      <div style={{ maxWidth: 470, margin: "0 auto", display: "grid", gap: 10 }}>
        <Row q={t(E, "Is N odd?", "N 이 홀수?")} res="−1" col="#dc2626" bg="#fef2f2" />
        <Row q={t(E, "Is S itself a square? (front half = back half)", "S 자체가 제곱? (앞 절반 = 뒤 절반)")} res={t(E, "M = 1", "M = 1")} col="#059669" bg="#ecfdf5" />
        <Row q={t(E, "Otherwise → gather each letter (C, O, W)", "아니면 → 글자별로 모으기 (C, O, W)")} res={t(E, "M = 3", "M = 3")} col="#8b5cf6" bg="#f5f3ff" />
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: C.dim, wordBreak: "keep-all" }}>
        {t(E, "Now let's read the code that does exactly this →", "이제 이걸 그대로 하는 코드를 봐요 →")}
      </div>
    </div>
  );
}

/* 샘플 입출력 — mooin3 모양 (구체 숫자 INPUT/OUTPUT + 한 줄씩 + 출력의미 시각화). */
function CowSplitsSample({ E }) {
  const S = "COWOWC".split("");
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", textAlign: "center", marginBottom: 10 }}>
        📥 {t(E, "Input / Output Format", "입력 / 출력 형식")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 10 }}>
        <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`1 1
2
COWOWC`}
          </div>
        </div>
        <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>
{`3
1 2 3 2 3 1`}
          </div>
        </div>
      </div>

      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#065f46", marginBottom: 6 }}>🔍 {t(E, "Line by line", "한 줄씩")}</div>
        <div><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 1</code> — {t(E, "T = 1 test, k = 1", "T = 1 (테스트 1개), k = 1")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>2</code> — {t(E, "N = 2 blocks → S has length 6", "N = 2 (블록 2개) → S 길이 6")}</div>
        <div style={{ marginTop: 4 }}><code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>COWOWC</code> — {t(E, "the string S (blocks COW + OWC)", "문자열 S (블록 COW + OWC)")}</div>
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #6ee7b7" }}>
          {t(E, "Output ", "출력 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>3</code>{t(E, " = M (3 operations), then ", " = M (연산 3번), 그다음 ")}<code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3 }}>1 2 3 2 3 1</code>{t(E, " = which operation erased each letter.", " = 각 글자가 몇 번째 연산에서 지워졌는지.")}
        </div>
      </div>

      {/* 출력 의미 시각화: COWOWC 를 그룹 번호로 색칠 */}
      <div style={{ marginTop: 10, background: "#fff", border: "1px dashed #6ee7b7", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center", wordBreak: "keep-all" }}>
          {t(E, "The numbers split the letters into M groups — each group is a square:", "이 숫자들이 글자를 M개 그룹으로 나눠요 — 각 그룹이 제곱:")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8 }}>
          {S.map((ch, i) => {
            const g = GRPNUM[ch], col = GRPCOL[ch];
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 34, height: 34, borderRadius: 7, background: "#fff", border: `2px solid ${col}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 16, color: "#1f2937" }}>{ch}</div>
                <div style={{ width: 18, height: 18, borderRadius: 999, background: col, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{g}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: "#166534", textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
          {t(E, "group 1 = C·C, group 2 = O·O, group 3 = W·W  →  each a square ✓", "1번끼리 = C·C, 2번끼리 = O·O, 3번끼리 = W·W  →  각각 제곱 ✓")}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.6 }}>
        {t(E, "📌 Constraints: T ≤ 10⁴ · sum of N ≤ 10⁵ · k=0 needs smallest M, k=1 allows smallest+1.",
             "📌 제약: T ≤ 10⁴ · N 의 합 ≤ 10⁵ · k=0 은 M 최소, k=1 은 최소+1까지 OK.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCowSplitsCh1 — mooin3 모양 (라벨 + 구체 샘플 + 풀이예제)
   문제(도입) → 샘플 입출력 → 규칙 → 막힘 → 아이디어 → 풀이 예제 → 정리
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh1(E) {
  return [
    // [기] 문제 (도입)
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Bessie has a string S of length 3N, built from N blocks. Each block is COW, OWC, or WCO. She can erase a square subsequence (Y+Y) per operation. Empty out S in as few ops as possible.",
        "Bessie 에게 길이 3N 의 문자열 S 가 있어요. N 개 블록으로 이뤄지고 각 블록은 COW / OWC / WCO 중 하나. 한 번의 연산마다 사각 부분수열 (Y+Y) 을 지워요. 가능한 적은 연산으로 S 를 비워봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#065f46" }}>{t(E, "COW Splits", "COW 분할")}</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2025 Bronze #2</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Empty S by repeatedly removing square-string subsequences, minimizing the number of operations.",
                "사각 문자열 부분수열을 반복해서 지워 S 를 비우되 연산 횟수를 최소화.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            ⚠️ {t(E,
              "This tutorial covers only the k = 1 variant (output any M ≤ optimal + 1). The exact-optimum k = 0 case is harder — see the official editorial.",
              "이 튜토리얼은 k = 1 변형 (M ≤ 최적값 + 1 인 어떤 M 든 출력) 만 다뤄요. 정확한 최솟값을 요구하는 k = 0 케이스는 더 어려워요 — 공식 editorial 참고.")}
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "S has length ", "S 는 길이 ")}
                  <b style={{ color: "#059669" }}>3N</b>
                  {t(E, " — N blocks, each one of ", " — N 개 블록, 각 블록은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>COW</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>OWC</code>
                  {", "}<code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>WCO</code>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "square string", "사각 문자열")}</b>
                  {t(E, " equals Y+Y for some Y (e.g. ", " 은 어떤 Y 에 대해 Y+Y 형태 (예: ")}
                  <code>COWCOW</code>, <code>CC</code>{t(E, ").", ").")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation removes any subsequence T from S where T is a square (letters kept in order, need not be adjacent).",
                        "한 연산은 S 에서 사각인 부분수열 T 를 제거 (순서 유지, 붙어있지 않아도 됨).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "If impossible print ", "불가능하면 ")}
                  <code>-1</code>
                  {t(E, ". Otherwise print M and label each char with its operation index (1..M).",
                       " 출력. 가능하면 M 과 각 글자의 연산 번호 (1..M) 를 출력.")}
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
        "A concrete example — one string, and the answer we must print.",
        "구체적인 예 하나 — 문자열 하나와, 우리가 출력해야 할 답."),
      content: (<CowSplitsSample E={E} />),
    },

    // [전] 규칙 — 한 연산 = 사각 부분수열
    {
      type: "reveal",
      label: t(E, "Rule: one operation", "규칙: 한 연산"),
      narr: t(E, "First — one operation erases a 'square subsequence'. Let's see exactly what that means.",
                 "먼저 — 한 연산은 '사각 부분수열'을 지워요. 그게 정확히 뭔지 봐요."),
      content: (<EraseRuleSim E={E} />),
    },
    // [전] 언제 1번? → 막힘
    {
      type: "reveal",
      label: t(E, "When 1 op? → stuck", "언제 1번? → 막힘"),
      narr: t(E, "If S itself is a square, one op clears it. But usually it isn't — so what then?",
                 "S 자체가 제곱이면 한 번에 끝. 근데 보통은 아니에요 — 그럼 어떡할까요?"),
      content: (<StuckSim E={E} />),
    },
    // [전] 아이디어 — 같은 글자끼리
    {
      type: "reveal",
      label: t(E, "Idea: gather same letters", "아이디어: 같은 글자끼리"),
      narr: t(E, "The key idea: we can pick letters from anywhere, so gather the same letters. Let's see why it always works.",
                 "핵심 아이디어: 글자를 여기저기서 골라도 되니, 같은 글자끼리 모아요. 왜 항상 되는지 봐요."),
      content: (<InsightSim E={E} />),
    },
    // [전] 풀이 예제 — 샘플 COWOWC 를 3번에
    {
      type: "reveal",
      label: t(E, "Worked example", "풀이 예제"),
      narr: t(E, "Now solve the sample: watch COWOWC get emptied in 3 ops — giving 1 2 3 2 3 1.",
                 "이제 샘플을 풀어봐요: COWOWC 가 3번에 비워지는 걸 봐요 — 답 1 2 3 2 3 1."),
      content: (<LetterGroupSim E={E} />),
    },
    // 정리
    {
      type: "reveal",
      label: t(E, "Recap", "정리"),
      narr: t(E, "Everything boils down to one small decision.",
                 "결국 작은 판단 하나로 정리돼요."),
      content: (<CowSplitsPlan E={E} />),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCowSplitsCh2 (CodeWalk)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowSplitsCh2(E, lang = "py") {
  const w = getCowSplitsWalk(E, lang);
  return [
    {
      type: "reveal",
      label: t(E, "Code", "코드"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read input, parity check, try M=1, otherwise the letter-group trick.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → 짝수 체크 → M=1 시도 → 안 되면 글자-그룹 트릭."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
  ];
}
