import { C, t } from "@/components/quest/theme";
import { getSwapToWinSections, getSwapToWinWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

/* 샘플 입출력 상자의 «← 설명» 라벨 (형제 quest strangefn/checkups 와 같은 모양) */
const SIO = { color: C.dim, fontSize: 10.5 };

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeSwapToWinCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSwapToWinCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Strings, and two kinds of swaps. Match the first one to the target.",
        "문자열들을 바꿔가며 첫 번째 줄을 목표에 맞춰볼 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔄"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Swap to Win</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 , wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "Turn the first string into the target string.\nYou may use at most 2M operations.",
                "첫 번째 문자열을 목표 문자열과 똑같이 만들어요.\n바꾸기는 많아야 2M 번까지만 쓸 수 있어요.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We have ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N strings", "문자열 N 개")}</b>
                  {t(E, " each of length ", " 각 길이는 ")}
                  <b style={{ color: "#059669" }}>M</b>
                  {t(E, ", and a ", ", 그리고 ")}
                  <b style={{ color: "#059669" }}>{t(E, "target string", "target 문자열")}</b>
                  {t(E, " of length M.", " (길이 M).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two operation types:", "바꾸는 방법 두 가지:")}
                  <div style={{ marginTop: 4, padding: "4px 10px", background: "#d1fae5", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>
                    1 x p q  → swap s_x[p] ↔ s_x[q]
                  </div>
                  <div style={{ marginTop: 4, padding: "4px 10px", background: "#d1fae5", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>
                    2 x y k  → swap s_x[k] ↔ s_y[k]
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Make ", "")}
                  <b style={{ color: "#059669" }}>s_1 = target</b>
                  {t(E, " using ", " 를 ")}
                  <b style={{ color: "#059669" }}>{t(E, "at most 2M operations", "최대 2M 번 바꾸기")}</b>
                  {t(E, ".", " 으로 달성.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O — test 3 (already matches)
    {
      type: "reveal",
      narr: t(E,
        "Easiest case first — already equal.",
        "목표와 이미 같으면 한 번도 안 바꾸고 답은 0 이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O — easy test", "샘플 입출력 — 쉬운 케이스")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46", lineHeight: 1.8 }}>
                <div>3 5 <span style={SIO}>← N, M</span></div>
                <div>abcde <span style={SIO}>← target</span></div>
                <div>abcde <span style={SIO}>← s_1</span></div>
                <div>abcde <span style={SIO}>← s_2</span></div>
                <div>zzzzz <span style={SIO}>← s_3</span></div>
              </div>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>0 <span style={SIO}>← {t(E, "0 operations", "0번 바꾸기")}</span></div>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, lineHeight: 1.5 , wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "target = abcde, and s_1 = abcde already. Print 0 and we're done. (No operation lines follow.)",
              "target = abcde, s_1 = abcde 이미 같음. 0 을 출력하고 끝. (바꾸기 줄 없음.)")}
          </div>

          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N, M ≤ 1000</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "all strings are lowercase a–z", "모든 문자열은 소문자 a–z")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Worked walkthrough — target=abcd, s_1=xbay, s_2=zzcy, s_3=dzzz
    // (2026-09-26 재작성: 옛 예제는 코드 순서대로 풀면 1번에 끝나 「같은 줄 먼저 → 안 되면 빌리기」
    //  순서를 다 못 보여줬고, 옛 walkthrough 는 k=0 에서 같은 줄을 안 보고 곧장 빌려 🔒 코드 순서와
    //  어긋났었다(검토자 셋이 독립으로 잡음). 이 예제는 🔒 FULL_PY 로 직접 돌려 확인했다 —
    //  `scripts/run-quest-code.py swaptowin` 출력이 아래 숫자와 한 글자도 다르지 않다.)
    {
      type: "reveal",
      narr: t(E,
        "Now a real one. target = abcd, s_1 = xbay. Fix each position, left to right.",
        "진짜 문제를 봐요. target 은 abcd, s_1 은 xbay 예요.\n왼쪽부터 한 칸씩 맞춰 가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
            🛠️ {t(E, "Walkthrough", "단계별 풀이")}
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#065f46", marginBottom: 4 }}>
              <b>target</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>abcd</code>
            </div>
            <div style={{ fontSize: 12, color: "#065f46", marginBottom: 4 }}>
              <b>s_1</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>xbay</code>
              {", "}<b>s_2</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>zzcy</code>
              {", "}<b>s_3</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>dzzz</code>
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 6, padding: "6px 10px", marginBottom: 10, fontSize: 11.5, color: "#065f46", lineHeight: 1.5, wordBreak: "keep-all", textWrap: "balance" }}>
            {t(E,
              "Same rule at every position: look inside s_1 first. Only borrow from another string when s_1 has nothing left.",
              "모든 자리에서 규칙은 같아요. 먼저 s_1 안에서 찾아요.\ns_1 안에 없을 때만 다른 줄에서 빌려요.")}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: C.text, lineHeight: 1.55 , wordBreak: "keep-all", textWrap: "balance" }}>
            <div>
              <b style={{ color: "#059669" }}>{t(E, "position 1:", "자리 1:")}</b> {t(E, "want a, s_1[1]=x. a is later in s_1 at position 3 → ", "a 가 필요, s_1 의 1번 칸은 x. a 는 s_1 의 3번 칸에 있음 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>1 1 1 3</code>
              {t(E, " (1 op, inside s_1)", " (1번, s_1 안에서)")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>{t(E, "position 2:", "자리 2:")}</b> {t(E, "want b, s_1[2]=b ✓ skip", "b 가 필요, s_1 의 2번 칸이 이미 b ✓ 건너뜀")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>{t(E, "position 3:", "자리 3:")}</b> {t(E, "want c, s_1[3]=x. c is nowhere left in s_1 → borrow. s_2's column 3 already has c → ", "c 가 필요, s_1 의 3번 칸은 x. s_1 안엔 c 가 더 없음 → 빌려요.\ns_2 의 3번 칸에 c 가 바로 있음 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>2 1 2 3</code>
              {t(E, " (1 op, borrow)", " (1번, 빌리기)")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>{t(E, "position 4:", "자리 4:")}</b> {t(E, "want d, s_1[4]=y. Not in s_1, not in s_2. d is in s_3 — but at column 1, not 4. Line it up first → ", "d 가 필요, s_1 의 4번 칸은 y. s_1, s_2 어디에도 없음.\nd 는 s_3 의 1번 칸에 있음 — 먼저 4번 칸으로 옮겨요 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>1 3 1 4</code>
              {t(E, ", then swap that column with s_1 → ", ", 그다음 그 칸을 s_1 과 맞바꿔요 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>2 1 3 4</code>
              {t(E, " (2 ops, borrow)", " (2번, 빌리기)")}
            </div>
          </div>

          <div style={{ marginTop: 10, padding: 8, background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 6, fontSize: 12, color: "#065f46" }}>
            {t(E, "Total: 4 operations. Output:", "모두 4번 바꿔요. 출력:")} <code>4 / 1 1 1 3 / 2 1 2 3 / 1 3 1 4 / 2 1 3 4</code>
          </div>
        </div>),
    },

    // 1-4: Quiz — small example
    {
      type: "quiz",
      narr: t(E,
        "Tiny case to lock the idea: target = ab, single string s_1 = ba. How many operations?",
        "작은 예제로 감을 잡아요. target 은 ab 이고 s_1 은 ba 하나예요.\n몇 번 바꿔야 할까요?"),
      question: t(E,
        "target = \"ab\", s_1 = \"ba\". Minimum operations?",
        "target = \"ab\", s_1 = \"ba\". 가장 적은 바꾸기 횟수는?"),
      options: [
        t(E, "1 (swap inside s_1)", "1 (s_1 안에서 한 번 바꾸기)"),
        t(E, "2 (need to borrow)", "2 (다른 줄에서 빌림)"),
      ],
      correct: 0,
      explain: t(E,
        "Right — the letters we need (a and b) both already live inside s_1. One within-string swap (1 1 1 2) makes s_1 = ab.",
        "맞아요 — 필요한 글자(a, b)가 모두 s_1 안에 있어요.\n같은 줄에서 한 번 바꾸기 (1 1 1 2) 이면 s_1 = ab 예요.")
    },

    // 1-5: NumInput — already matches → 0
    {
      type: "input",
      narr: t(E,
        "target = 'aa', s_1 = 'aa'. How many operations are needed?",
        "target = 'aa', s_1 = 'aa'. 몇 번 바꿔야 할까요?"),
      question: t(E,
        "target = 'aa', s_1 = 'aa'. K = ?",
        "target = 'aa', s_1 = 'aa'. K = ?"),
      hint: t(E,
        "Compare position by position — what changes when nothing differs?",
        "한 칸씩 비교해봐 — 다른 곳이 하나도 없을 때 K 값은?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeSwapToWinCh2 (1 progressive step)
   ═══════════════════════════════════════════════════════════════ */
export function makeSwapToWinCh2(E, lang = "py") {
  return [
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getSwapToWinWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Position by position: 0, 1, or 2 operations.",
          "코드가 한 자리씩 0 · 1 · 2 번 바꿔서 맞춰가요."),
        content: (
          <>
            <CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#0891b2" />
            {lang === "py" && (
              <div style={{
                margin: "0 16px 16px", background: "#fff7ed", borderRadius: 8, padding: "8px 12px",
                border: "1.5px solid #fdba74", fontSize: 12, color: "#9a3412",
                lineHeight: 1.6, wordBreak: "keep-all",
              }}>
                ⚠️ {t(E,
                  "Heads up: each position may need to scan every other string to the end — worst case N × M × M comparisons. At N, M = 1000 that's too much for Python.",
                  "짚고 갈 것이 있어요. 자리마다 다른 줄을 끝까지 훑어야 할 수 있어요 — 최악엔 N × M × M 번 비교예요.\nN, M 이 둘 다 1000 이면 파이썬은 이 반복을 감당하지 못해요.")}
                <div style={{ marginTop: 4, fontWeight: 700 }}>
                  {t(E, "Actual grading: Python 6/12 (TLE on 7–12) · C++ 12/12 PASS.", "실제 채점: 파이썬 6/12 (7~12번 시간 초과) · C++ 12/12 통과.")}
                </div>
              </div>
            )}
          </>
        ),
      };
    })(),
  ];
}
