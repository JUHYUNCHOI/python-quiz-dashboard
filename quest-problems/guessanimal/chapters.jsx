import { C, t } from "@/components/quest/theme";
import { getGuessAnimalSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "animals = []",
  "for _ in range(N):",
  "    name = input().strip()",
  "    K = int(input())",
  "    traits = set()",
  "    for _ in range(K):",
  "        traits.add(input().strip())",
  "    animals.append(traits)",
  "",
  "best = 0",
  "for i in range(N):",
  "    for j in range(i + 1, N):",
  "        shared = len(animals[i] & animals[j])",
  "        best = max(best, shared)",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGuessAnimalCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie thinks of one animal from a list of N animals; you can only ask yes/no questions about characteristics. You keep asking until your questions narrow it down to a single animal.\nIn the WORST case, what's the maximum number of 'yes' answers you might give before the animal is uniquely identified?",
        "베시가 N마리 동물 목록에서 동물 하나를 마음에 떠올려요. 당신은 특성에 대해 예/아니오 질문만 할 수 있어요. 질문을 계속해서 결국 동물 하나로 좁혀요.\n최악의 경우, 동물을 유일하게 식별하기 전까지 받을 수 있는 '예' 답변의 최대 수는 몇 개일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"🐾"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Guess the Animal</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N animals", "N마리 동물")}</b>
                  {t(E, ", each with a known set of characteristics.",
                        "이 있고, 각 동물의 특성 집합이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie picks one animal in secret. You ask ", "베시가 동물 하나를 비밀로 정해요. 당신은 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "yes/no questions about characteristics", "특성에 대한 예/아니오 질문")}</b>
                  {t(E, " until only ONE animal in the list could possibly match all your answers.",
                        "을 해서 답변과 일치 가능한 동물이 1마리만 남을 때까지 좁혀요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible number of 'yes' answers", "받을 수 있는 'yes' 답변의 최대 수")}</b>
                  {t(E, " in the worst case (over all possible secret animals and all question strategies).",
                        "를 출력해요 (어떤 비밀 동물이든, 어떤 질문 전략이든 가장 나쁜 경우).")}
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
        "Animal X has traits {A, B, C}.\nAnimal Y has traits {A, B, D}.\nThey share A and B.\nAfter 2 'yes' answers, we still can't tell them apart.", "동물 X는 특성 {A, B, C}, 동물 Y는 {A, B, D}. A와 B를 공유해요. '예' 2번 후에도 구분 불가."),
      question: t(E,
        "Animals with traits {A,B,C} and {A,B,D}. Max 'yes' before unique ID?",
        "특성 {A,B,C}와 {A,B,D}인 동물. 유일하게 식별 전 최대 '예'?"),
      options: [
        t(E, "1", "1"),
        t(E, "2 - they share A and B", "2 - A와 B를 공유"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! They share traits A and B (2 traits). After answering 'yes' to both, we still have 2 candidates. So max yes = 2.",
        "맞아! 특성 A와 B를 공유해 (2개). 둘 다 '예'라고 답해도 후보가 2개. 최대 예 = 2."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Two animals share traits A and B.\nWhat's the maximum number of 'yes' answers before identification?", "두 동물이 특성 A와 B를 공유해요. 식별 전 최대 '예' 답변 수는?"),
      question: t(E,
        "Shared traits = {A, B}. Max 'yes' answers?",
        "공통 특성 = {A, B}. 최대 '예' 답변 수?"),
      hint: t(E,
        "The count of shared traits = max yes answers. A and B = 2 shared traits.",
        "공통 특성 수 = 최대 '예' 답변 수. A와 B = 2개 공통 특성."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGuessAnimalCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The worst-case 'yes' answers occur when two animals share the most traits. So compute pairwise intersection sizes; answer = max + 1 (the +1 is the question that finally distinguishes them).",
        "최악의 'yes' 답변은 두 동물이 공통 특성이 가장 많을 때 발생. 모든 쌍의 공통 특성 수를 계산; 답 = 최댓값 + 1 (둘을 구별하는 마지막 질문 +1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Build trait sets per animal", "동물별 특성 집합 구축"), code: "traits[i] = set(input().split()[1:])", color: "#059669" },
              { n: 2, label: t(E, "For every pair (i, j)", "모든 쌍 (i, j)"), code: "for i, j in combinations(range(N), 2):", color: "#0891b2" },
              { n: 3, label: t(E, "Compute intersection size", "교집합 크기 계산"), code: "common = len(traits[i] & traits[j])", color: "#7c3aed" },
              { n: 4, label: t(E, "Print max + 1", "max + 1 출력"), code: "print(max(common) + 1)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N² · K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "all N² pairs × K traits per intersection", "N² 쌍 × 교집합당 K 특성")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getGuessAnimalSections(E),
    },
  ];
}
