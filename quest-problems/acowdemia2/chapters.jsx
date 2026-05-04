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
        "K개의 논문이 각각 N명의 소-연구자 중 일부에 의해 정해진 순서로 작성되어 있어요.\n소 A 가 소 B 보다 확실히 선임이라는 건, (a) 둘이 함께 쓴 논문이 적어도 하나 있고, (b) 그 모든 공동 논문에서 A 의 이름이 B 보다 앞에 나올 때예요. '확실히 선임' 관계를 만족하는 순서쌍 (A, B) 의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc68\u200d\ud83d\udd2c"}</div>
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
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "For each paper, mark all (a, b) pairs", "각 논문에서 (a, b) 쌍 표시"), code: "for paper, for i < j: before[paper[i]][paper[j]] = True", color: "#2563eb" },
              { n: 2, label: t(E, "Check every ordered pair", "모든 순서쌍 검사"), code: "for A in 1..N: for B in 1..N if A != B:", color: "#7c3aed" },
              { n: 3, label: t(E, "Definitely senior?", "확실히 선임?"), code: "if before[A][B] and not before[B][A]: count += 1", color: "#0891b2" },
              { n: 4, label: t(E, "Print count", "개수 출력"), code: "print(count)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#1e3a8a", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N² + total authors)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "fill matrix once + scan all pairs", "행렬 한 번 채우기 + 모든 쌍 스캔")}</div>
          </div>
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
