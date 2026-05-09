import { C, t } from "@/components/quest/theme";
import { getSwapToWinSections } from "./components";

/* ================================================================
   SOLUTION CODE (Python, multi-test-case)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    target = input().strip()",
  "    s = [list(input().strip()) for _ in range(N)]",
  "",
  "    ops = []",
  "    for k in range(M):",
  "        if s[0][k] == target[k]:",
  "            continue",
  "",
  "        # Same-string swap (1 op)",
  "        found = False",
  "        for p in range(k + 1, M):",
  "            if s[0][p] == target[k]:",
  "                ops.append(f\"1 1 {k+1} {p+1}\")",
  "                s[0][k], s[0][p] = s[0][p], s[0][k]",
  "                found = True",
  "                break",
  "        if found:",
  "            continue",
  "",
  "        # Borrow from another string (≤ 2 ops)",
  "        for y in range(1, N):",
  "            pos = -1",
  "            for q in range(M):",
  "                if s[y][q] == target[k]:",
  "                    pos = q",
  "                    break",
  "            if pos == -1:",
  "                continue",
  "            if pos != k:",
  "                ops.append(f\"1 {y+1} {pos+1} {k+1}\")",
  "                s[y][pos], s[y][k] = s[y][k], s[y][pos]",
  "            ops.append(f\"2 1 {y+1} {k+1}\")",
  "            s[0][k], s[y][k] = s[y][k], s[0][k]",
  "            break",
  "",
  "    print(len(ops))",
  "    print(\"\\n\".join(ops))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeSwapToWinCh1 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSwapToWinCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "Farmer John has N strings, each of length M. He wants the first one to become a target. He has two kinds of swaps: inside one string, or column-wise between two strings. Use at most 2M swaps.",
        "농부 존에게 길이 M짜리 문자열 N개가 있어요. 첫 번째 문자열을 target으로 만들고 싶어. 두 가지 swap이 가능: 한 문자열 안에서, 또는 두 문자열의 같은 칸끼리. 총 2M번 이내."),
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
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output K ≤ 2M operations transforming s_1 into the target string.",
                "s_1 을 target 으로 바꾸는 K ≤ 2M 개의 연산을 출력.")}
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
                  {t(E, "Two operation types:", "두 가지 연산:")}
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
                  <b style={{ color: "#059669" }}>{t(E, "at most 2M operations", "최대 2M 번의 연산")}</b>
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
        "Easy case first: when s_1 already equals target, the answer is just 0. No operations needed.",
        "가장 쉬운 경우부터: s_1 이 이미 target 이면 답은 0. 아무것도 안 해도 돼."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O — easy test", "샘플 입출력 — 쉬운 케이스")}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>{`3 5
abcde
abcde
abcde
zzzzz`}</pre>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#065f46" }}>{`0`}</pre>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, lineHeight: 1.5 }}>
            {t(E,
              "target = abcde, and s_1 = abcde already. Print 0 and we're done. (No operation lines follow.)",
              "target = abcde, s_1 = abcde 이미 같음. 0 을 출력하고 끝. (연산 줄 없음.)")}
          </div>
        </div>),
    },

    // 1-3: Worked walkthrough — test 1 (banana / nabana)
    {
      type: "reveal",
      narr: t(E,
        "Now a real one. target = banana, s_1 = nabana. Walk left-to-right and fix each position.",
        "진짜 케이스: target = banana, s_1 = nabana. 왼쪽부터 한 칸씩 맞춰가요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
            🛠️ {t(E, "Walkthrough", "단계별 풀이")}
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#065f46", marginBottom: 4 }}>
              <b>target</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>banana</code>
            </div>
            <div style={{ fontSize: 12, color: "#065f46", marginBottom: 4 }}>
              <b>s_1</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>nabana</code>
              {", "}<b>s_2</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>banana</code>
              {", "}<b>s_3</b> = <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>nnbaaa</code>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: C.text, lineHeight: 1.55 }}>
            <div>
              <b style={{ color: "#059669" }}>k=0:</b> {t(E, "want b, s_1[0]=n. b sits at s_2[0] already → ", "b 가 필요. s_1[0]=n. b 는 s_2[0] 에 있음 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>2 1 2 1</code>
              {t(E, " (1 op)", " (1 op)")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>k=1:</b> {t(E, "want a, s_1[1]=a ✓ skip", "a 가 필요, s_1[1]=a ✓ 건너뜀")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>k=2:</b> {t(E, "want n, s_1[2]=b. n is later in s_1 at position 4 → ", "n 이 필요, s_1[2]=b. s_1 뒤쪽 4번 위치에 n 있음 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>1 1 3 5</code>
              {t(E, " (1 op)", " (1 op)")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>k=3:</b> {t(E, "want a, s_1[3]=a ✓ skip", "a 가 필요, s_1[3]=a ✓ 건너뜀")}
            </div>
            <div>
              <b style={{ color: "#059669" }}>k=4:</b> {t(E, "want n, s_1[4]=b (changed). Borrow from s_2 column 4 → ", "n 이 필요. s_2 의 4번 칸에서 빌려 → ")}
              <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 3 }}>2 1 2 5</code>
            </div>
            <div>
              <b style={{ color: "#059669" }}>k=5:</b> {t(E, "want a, s_1[5]=a ✓ skip", "a 가 필요, s_1[5]=a ✓ 건너뜀")}
            </div>
          </div>

          <div style={{ marginTop: 10, padding: 8, background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 6, fontSize: 12, color: "#065f46" }}>
            {t(E, "Total: 3 operations. Output:", "총 3 연산. 출력:")} <code>3 / 2 1 2 1 / 1 1 3 5 / 2 1 2 5</code>
          </div>
        </div>),
    },

    // 1-4: Quiz — small example
    {
      type: "quiz",
      narr: t(E,
        "Tiny case to lock the idea: target = ab, single string s_1 = ba. How many operations?",
        "작은 예제로 감 잡기: target = ab, s_1 = ba 한 개. 몇 번의 연산?"),
      question: t(E,
        "target = \"ab\", s_1 = \"ba\". Minimum operations?",
        "target = \"ab\", s_1 = \"ba\". 최소 연산 수는?"),
      options: [
        t(E, "1 (swap inside s_1)", "1 (s_1 안에서 swap)"),
        t(E, "2 (need to borrow)", "2 (다른 줄에서 빌림)"),
      ],
      correct: 0,
      explain: t(E,
        "Right — the letters we need (a and b) both already live inside s_1. One within-string swap (1 1 1 2) makes s_1 = ab.",
        "맞아 — 필요한 글자(a, b)가 모두 s_1 안에 있음. 같은 줄 swap 한 번 (1 1 1 2) 으로 s_1 = ab.")
    },

    // 1-5: NumInput — already matches → 0
    {
      type: "input",
      narr: t(E,
        "target = 'aa', s_1 = 'aa'. How many operations are needed?",
        "target = 'aa', s_1 = 'aa'. 몇 번의 연산이 필요?"),
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
    {
      type: "progressive",
      narr: t(E,
        "Per-position greedy: 0 ops if already matched, 1 op if same string has the char further right, else 2 ops via another string. Sections build it one piece at a time.",
        "위치별 그리디: 이미 맞으면 0 ops, 같은 줄 뒤에 그 글자가 있으면 1 op, 아니면 다른 줄을 거쳐 2 ops. 섹션이 한 단락씩 쌓아가요."),
      sections: getSwapToWinSections(E),
    },
  ];
}
