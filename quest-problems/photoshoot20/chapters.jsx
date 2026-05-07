import { C, t } from "@/components/quest/theme";
import { getPhoto20Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "b = list(map(int, input().split()))",
  "",
  "for a0 in range(1, N + 1):",
  "    a = [a0]",
  "    valid = True",
  "    for i in range(N - 1):",
  "        a_next = b[i] - a[-1]",
  "        a.append(a_next)",
  "    # Check if valid permutation of 1..N",
  "    if sorted(a) == list(range(1, N + 1)):",
  "        print(' '.join(map(str, a)))",
  "        break",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto20Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie wrote down a permutation a of 1..N, then computed b[i] = a[i] + a[i+1] for i = 0 to N−2 — and only b survived.\nGiven b, recover the lexicographically SMALLEST permutation a that could have produced it.",
        "Bessie가 1..N의 순열 a를 적은 뒤, b[i] = a[i] + a[i+1] (i = 0 ~ N−2) 을 계산했어요 — 그런데 a 는 사라지고 b 만 남았어요.\nb 를 보고, 그것을 만들 수 있었던 순열 a 중 사전순으로 가장 작은 것을 알아내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📸"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Photoshoot</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2020 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There exists a hidden ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "permutation a of 1..N", "1..N의 순열 a")}</b>
                  {t(E, " (each number appears once).",
                        " 가 숨겨져 있어요 (각 수가 한 번씩).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given ", "주어지는 건 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "b[0..N−2]", "b[0..N−2]")}</b>
                  {t(E, " where ", " 인데, ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>b[i] = a[i] + a[i+1]</code>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "lexicographically smallest permutation a", "사전순으로 가장 작은 순열 a")}</b>
                  {t(E, " that fits the b array.", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Example: b = [3], N = 2.\nWe need a[0] + a[1] = 3.\nIf a[0] = 1, then a[1] = 2.\nIs [1, 2] a valid permutation of {1, 2}?", "예시: b = [3], N = 2. a[0] + a[1] = 3이 필요해요. a[0] = 1이면, a[1] = 2. [1, 2]는 {1, 2}의 유효한 순열일까요?"),
      question: t(E,
        "b = [3], N = 2. If a[0] = 1, a[1] = 2. Is [1, 2] valid?",
        "b = [3], N = 2. a[0] = 1이면, a[1] = 2. [1, 2]는 유효할까?"),
      options: [
        t(E, "Yes, it's a valid permutation", "맞아, 유효한 순열이야"),
        t(E, "No, it's not valid", "아니, 유효하지 않아"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! [1, 2] is a permutation of {1, 2} and a[0]+a[1] = 1+2 = 3 = b[0]. Valid!",
        "맞아! [1, 2]는 {1, 2}의 순열이고 a[0]+a[1] = 1+2 = 3 = b[0]. 유효해요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For b = [3], N = 2, what is a[0] in the lexicographically smallest permutation?", "b = [3], N = 2일 때, 사전순 최소 순열의 a[0]은?"),
      question: t(E,
        "b = [3], N = 2. a[0] for lex-smallest permutation?",
        "b = [3], N = 2. 사전순 최소 순열의 a[0]은?"),
      hint: t(E,
        "Try a[0] = 1: a[1] = 3 - 1 = 2. [1,2] is valid!",
        "a[0] = 1 시도: a[1] = 3 - 1 = 2. [1,2]는 유효해요!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhoto20Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Once you fix a[0], the entire array is determined: a[i+1] = b[i] − a[i]. So try a[0] = 1, 2, …, N and pick the SMALLEST that produces a valid permutation of 1..N (no duplicates, all in range).",
        "a[0] 을 정하면 나머지가 자동으로 정해져요: a[i+1] = b[i] − a[i]. 그러므로 a[0] = 1, 2, …, N 을 시도해 보고, 1..N 의 유효한 순열 (중복 없음, 범위 내) 을 만드는 가장 작은 a[0] 을 채택."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getPhoto20Sections(E),
    },
  ];
}
