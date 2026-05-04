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
        "Check all pairs of animals, compute intersection size. O(N^2 * K) where K = max traits.", "모든 동물 쌍을 확인하고 교집합 크기 계산. O(N^2 * K), K = 최대 특성 수."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>{"O(N\u00B2 \u00B7 K)"}</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each pair (i, j), compute abs(traits_i AND traits_j) using set intersection.\nTrack the maximum across all pairs.",
              "각 쌍 (i, j)에 대해 set 교집합으로 abs(traits_i AND traits_j) 계산.\n모든 쌍에서 최대값 추적.")}
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
