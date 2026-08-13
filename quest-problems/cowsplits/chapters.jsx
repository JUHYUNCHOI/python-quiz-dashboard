import { C, t } from "@/components/quest/theme";
import { getCowSplitsWalk, getCowSplitsSections } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { CodeSectionView } from "@/components/quest/CodeSectionView";
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
        {t(E, "📌 Constraints: T ≤ 10⁴ · sum of N ≤ 10⁵.  This tutorial: k=1 (M ≤ optimal+1 accepted).",
             "📌 제약: T ≤ 10⁴ · N 의 합 ≤ 10⁵.  이 튜토리얼은 k=1 (최적값+1 이하 M 이면 정답).")}
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
    // [기] 문제 (도입) — mooin3 스타일: 미션 배너 + 제곱 시각 정의 + 짧은 불릿
    {
      type: "reveal",
      label: t(E, "Problem (intro)", "문제 (도입)"),
      narr: t(E,
        "Bessie has a string S made of N blocks (each COW/OWC/WCO). Each move erases a 'square' subsequence — same piece twice. Goal: empty S in as few moves as possible.",
        "Bessie 에게 문자열 S 가 있어요 — N 개 블록 (COW/OWC/WCO 중 하나) 을 이어붙인 것. 한 번의 지우기는 '제곱' 부분수열 — 같은 조각 두 번 — 을 없애요. 목표: 최소 횟수로 S 비우기."),
      content: (
        <div style={{ padding: 20 }}>
          <div style={{
            background: C.accentBg, border: `1px solid ${C.accentBd}`, borderRadius: 12,
            padding: "16px 18px", maxWidth: 480, margin: "0 auto",
          }}>
            {/* 🎯 미션 — 한 줄. 다음 페이지 (Sample I/O) 봐도 뭘 하는지 각인 */}
            <div style={{
              background: "#fff", border: `2px solid ${C.accentBd}`, borderRadius: 10,
              padding: "10px 14px", marginBottom: 16, fontSize: 13, lineHeight: 1.6, color: C.text,
            }}>
              <div style={{ fontWeight: 700, color: "#059669", marginBottom: 4 }}>
                🎯 {t(E, "Mission", "미션")}
              </div>
              {t(E,
                "Empty S with as few moves as possible — each move erases a 'square' subsequence.",
                "S 를 최소 횟수로 비우기 — 한 번의 지우기는 '제곱' 부분수열을 없애요.")}
            </div>

            {/* 제곱 문자열 정의 카드 — Y+Y 시각. 학생이 '사각'이란 말에 걸리지 않게 그림으로 즉시 정의 */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 8 }}>
                {t(E, "What's a 'square' string?  Same piece twice:",
                      "'제곱' 문자열이 뭐지?  같은 조각 두 번:")}
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6, alignItems: "center" }}>
                {["C", "O", "W"].map((ch, i) => (
                  <div key={"a" + i} style={{
                    width: 32, height: 38, background: "#ecfdf5", border: "2px solid #059669",
                    borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, color: "#065f46",
                  }}>{ch}</div>
                ))}
                <span style={{ fontSize: 20, fontWeight: 800, color: "#059669", margin: "0 6px" }}>+</span>
                {["C", "O", "W"].map((ch, i) => (
                  <div key={"b" + i} style={{
                    width: 32, height: 38, background: "#ecfdf5", border: "2px solid #059669",
                    borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, color: "#065f46",
                  }}>{ch}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, textAlign: "center", color: C.text, marginBottom: 8 }}>
                <code style={{ background: "#ecfdf5", padding: "1px 5px", borderRadius: 4, color: "#065f46", fontWeight: 700 }}>COW</code>
                {" + "}
                <code style={{ background: "#ecfdf5", padding: "1px 5px", borderRadius: 4, color: "#065f46", fontWeight: 700 }}>COW</code>
                {" = "}
                <code style={{ background: "#ecfdf5", padding: "1px 5px", borderRadius: 4, color: "#065f46", fontWeight: 700 }}>COWCOW</code>
                {t(E, " ✓ square", " ✓ 제곱")}
              </div>
              <div style={{ fontSize: 11, textAlign: "center", color: C.dim, wordBreak: "keep-all" }}>
                {t(E, "Any piece Y works — even Y=\"C\" gives CC ✓.  Anything else (COWO, OC) → ✗.",
                      "어떤 조각 Y 든 OK — Y=\"C\" 면 CC ✓.  아니면 (COWO, OC) → ✗.")}
              </div>
            </div>

            {/* 짧은 불릿 — 텍스트 벽 X, 3 줄 */}
            <div style={{ background: "#fff", border: "1px solid #d1fae5", borderRadius: 8, padding: "10px 12px", fontSize: 12, lineHeight: 1.7, color: C.text }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginBottom: 6 }}>
                📖 {t(E, "The rules", "규칙")}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
                <div>{t(E, "S = N blocks glued together, length ", "S = N 개 블록을 이은 것, 길이 ")}<b style={{ color: "#059669" }}>3N</b>.</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
                <div>{t(E, "One move erases a square subsequence (letters can be far apart).",
                            "한 번의 지우기는 제곱 부분수열을 없애요 (글자가 떨어져 있어도 OK).")}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>•</span>
                <div>{t(E, "Output M and label every letter with its move number.  If impossible → ",
                            "M 과 각 글자의 연산 번호를 출력.  불가능하면 → ")}<code>-1</code>.</div>
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Sample input + rule sim on the next pages.",
                    "샘플 입력 + 규칙 시뮬은 다음 페이지에서.")}
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

    // [전] 규칙 — 한 연산 = 제곱 부분수열
    {
      type: "reveal",
      label: t(E, "Rule: one operation", "규칙: 한 연산"),
      narr: t(E, "First — one operation erases a 'square subsequence'. Let's see exactly what that means.",
                 "먼저 — 한 연산은 '제곱 부분수열'을 지워요. 그게 정확히 뭔지 봐요."),
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
  const sections = getCowSplitsSections(E);
  return [
    // [결-1] 전체 코드 CodeWalk — 위→아래 말풍선으로 흐름 익히기
    {
      type: "reveal",
      label: t(E, "The full code (walkthrough)", "전체 코드 (말풍선)"),
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains: read input, parity check, try M=1, otherwise the letter-group trick.",
        "코드를 위에서 아래로 읽어봐요 — 말풍선이 설명하는 줄에 붙어 있어요: 입력 읽기 → 짝수 체크 → M=1 시도 → 안 되면 글자 그룹 트릭."),
      content: (
        <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#059669" />
      ),
    },
    // [결-2] 섹션 1 — 셋업 + 짝수 판단
    {
      type: "reveal",
      label: sections[0].label,
      narr: t(E,
        "First piece — read the input, and drop out early if N is odd (each op removes an even number of letters, so total 3N must be even → N even).",
        "첫 조각 — 입력을 읽고, N 이 홀수면 바로 -1 (각 연산이 짝수 개 글자를 지우니 총 3N 도 짝수여야 함 → N 짝수)."),
      content: (<CodeSectionView section={sections[0]} lang={lang} E={E} />),
    },
    // [결-3] 섹션 2 — M=1 시도
    {
      type: "reveal",
      label: sections[1].label,
      narr: t(E,
        "Lucky case first: if S itself is a square (front half = back half), one move clears everything.",
        "운 좋은 경우 먼저: S 자체가 제곱 (앞 절반 = 뒤 절반) 이면 한 번에 끝."),
      content: (<CodeSectionView section={sections[1]} lang={lang} E={E} />),
    },
    // [결-4] 섹션 3 — 글자 그룹 트릭 (M=3)
    {
      type: "reveal",
      label: sections[2].label,
      narr: t(E,
        "Fallback: gather every C, every O, every W separately. Three moves, always works when N is even.",
        "안 되면: C 끼리, O 끼리, W 끼리 모으기. 3 번의 지우기 — N 짝수면 항상 통과."),
      content: (<CodeSectionView section={sections[2]} lang={lang} E={E} />),
    },
  ];
}
