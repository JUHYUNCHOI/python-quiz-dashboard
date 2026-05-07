import { C, t } from "@/components/quest/theme";
import { getAcowdemia2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "# order[a][b] = True if a always before b",
  "before = [[False]*(N) for _ in range(N)]",
  "",
  "for _ in range(M):",
  "    K = int(input())",
  "    authors = list(map(int, input().split()))",
  "    for i in range(K):",
  "        for j in range(i+1, K):",
  "            before[authors[i]][authors[j]] = True",
  "",
  "for a in range(N):",
  "    for b in range(N):",
  "        if a != b:",
  "            if before[a][b] and not before[b][a]:",
  "                print('YES')  # a more senior",
  "            else:",
  "                print('UNDETERMINED')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "K papers are each authored by some subset of N total cow-researchers, written in a particular order.\nCow A is more senior than cow B if (a) they share at least one paper, and (b) on every shared paper A's name appears BEFORE B's. Count how many ordered pairs (A, B) satisfy this 'definitely senior' relation.",
        "N명의 소-연구자가 함께 K개의 논문을 썼고, 각 논문마다 저자 순서가 정해져 있어요.\n소 A 가 소 B 보다 '확실히 선임' 이려면 두 가지 조건이 필요해요. 첫째, 둘이 함께 쓴 논문이 하나라도 있어야 해요. 둘째, 그 모든 공동 논문에서 A 의 이름이 B 보다 앞에 나와야 해요. 이 조건을 만족하는 순서쌍 (A, B) 의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc68\u200d\ud83d\udd2c"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Acowdemia II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cow-researchers and K papers", "N명의 소-연구자와 K개의 논문")}</b>
                  {t(E, " — each paper has an ordered list of authors.",
                        " 이 있고, 각 논문은 정해진 순서의 저자 목록을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cow ", "소 ")}
                  <b style={{ color: "#7c3aed" }}>A is 'definitely senior' to B</b>
                  {t(E, " if they share at least one paper AND in every shared paper A's name appears before B's.",
                        " 인 조건: 둘이 함께 쓴 논문이 1개 이상 있고, 그 모든 공동 논문에서 A 가 B 보다 앞에 등장.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of ordered pairs (A, B) where A is definitely senior to B", "A 가 B 보다 확실히 선임인 순서쌍 (A, B) 의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "In author list [A, B, C], A appears before B.\nIf this is the only paper, can we say A is more senior than B?", "저자 목록 [A, B, C]에서 A가 B 앞에 나와요. 이것이 유일한 논문이면, A가 B보다 선임이라고 할 수 있을까?"),
      question: t(E,
        "List [A,B,C]: A always before B. A more senior or equal?",
        "목록 [A,B,C]: A가 항상 B 앞. A가 더 선임 또는 동등?"),
      options: [
        t(E, "Yes, A is more senior", "네, A가 더 선임"),
        t(E, "No, we can't tell from one paper", "아니요, 논문 하나로는 알 수 없어"),
      ],
      correct: 0,
      explain: t(E,
        "If A always appears before B in all co-authored papers, we conclude A is more senior (or equal).",
        "공동 저술한 모든 논문에서 A가 항상 B 앞에 나타나면, A가 더 선임(또는 동등)이라고 결론."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2 publications: [A,B] and [B,A].\nWhat is the relationship between A and B?\nEnter 0 for undetermined.", "2개의 논문: [A,B]와 [B,A]. A와 B의 관계는? 판단 불가이면 0을 입력해요."),
      question: t(E,
        "Pubs [A,B] and [B,A]. Relationship? (0=undetermined)",
        "논문 [A,B]와 [B,A]. 관계? (0=판단 불가)"),
      hint: t(E,
        "A is before B in one paper, B before A in another. Neither always first, so undetermined.",
        "한 논문에서 A가 B 앞, 다른 논문에서 B가 A 앞. 어느 쪽도 항상 먼저가 아니므로 판단 불가."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For every paper, mark before[a][b] = True if a appears before b somewhere in that paper. Cow A is 'definitely senior' to B iff before[A][B] is True AND before[B][A] is False. Sum over all (A, B).",
        "모든 논문에서, 그 논문 안에서 a 가 b 보다 앞이면 before[a][b] = True. A 가 B 보다 '확실히 선임' 이면 before[A][B] 가 True 이고 before[B][A] 가 False. 모든 (A, B) 에 대해 합산."),
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
      sections: getAcowdemia2Sections(E),
    },
  ];
}
