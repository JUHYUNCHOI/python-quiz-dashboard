import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getGuessAnimalSections } from "./components";

/* ================================================================
   Eye-evident sim: pick 2 animals → see trait sets + intersection
   - 4 sample animals with small trait sets
   - Student picks animal A and animal B from buttons
   - Two cards show trait chips; shared chips glow + animate
   - Bottom shows |A ∩ B| with running "best so far" across pairs
   ================================================================ */
function PairwiseTraitSim({ E }) {
  const ANIMALS = [
    { name: t(E, "Cow",    "소"),     emoji: "🐄", traits: ["fur", "4-legs", "tail", "horns"] },
    { name: t(E, "Sheep",  "양"),     emoji: "🐑", traits: ["fur", "4-legs", "tail", "wool"] },
    { name: t(E, "Duck",   "오리"),   emoji: "🦆", traits: ["feathers", "2-legs", "tail", "beak"] },
    { name: t(E, "Dog",    "개"),     emoji: "🐕", traits: ["fur", "4-legs", "tail", "barks"] },
  ];
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [best, setBest] = useState(0);
  const [seen, setSeen] = useState(() => new Set());

  const traitsA = ANIMALS[a].traits;
  const traitsB = ANIMALS[b].traits;
  const setB_ = new Set(traitsB);
  const shared = traitsA.filter(x => setB_.has(x));
  const sharedSet = new Set(shared);

  const pairKey = a < b ? `${a}-${b}` : `${b}-${a}`;
  const trackPair = (na, nb) => {
    if (na === nb) return;
    const k = na < nb ? `${na}-${nb}` : `${nb}-${na}`;
    if (!seen.has(k)) {
      const ns = new Set(seen); ns.add(k); setSeen(ns);
      const sa = ANIMALS[na].traits;
      const sb = new Set(ANIMALS[nb].traits);
      const sh = sa.filter(x => sb.has(x)).length;
      if (sh > best) setBest(sh);
    }
  };

  const pickA = (i) => { setA(i); trackPair(i, b); };
  const pickB = (i) => { setB(i); trackPair(a, i); };

  const SAME = a === b;

  const chip = (label, isShared, key) => (
    <span key={key} style={{
      display: "inline-block",
      padding: "3px 9px",
      margin: "3px 4px 3px 0",
      borderRadius: 12,
      background: isShared ? "#059669" : "#ecfdf5",
      color: isShared ? "#fff" : "#065f46",
      border: `1.5px solid ${isShared ? "#047857" : "#a7f3d0"}`,
      fontSize: 11,
      fontWeight: 700,
      boxShadow: isShared ? "0 0 0 3px #6ee7b755" : "none",
      transition: "all 200ms ease",
    }}>{label}</span>
  );

  const card = (idx, label, picker) => {
    const animal = ANIMALS[idx];
    return (
      <div style={{
        flex: 1, minWidth: 160,
        background: "#fff",
        border: "1.5px solid #6ee7b7",
        borderRadius: 10,
        padding: 10,
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#065f46", letterSpacing: 0.4, marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 24, textAlign: "center", marginBottom: 2 }}>{animal.emoji}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.text, textAlign: "center", marginBottom: 6 }}>
          {animal.name}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", minHeight: 56 }}>
          {animal.traits.map((tr, i) => chip(tr, sharedSet.has(tr), `${idx}-${i}`))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, marginTop: 8 }}>
          {ANIMALS.map((an, i) => (
            <button key={i} onClick={() => picker(i)} style={{
              padding: "2px 7px",
              borderRadius: 6,
              border: `1.5px solid ${idx === i ? "#059669" : "#a7f3d0"}`,
              background: idx === i ? "#059669" : "#fff",
              color: idx === i ? "#fff" : "#065f46",
              fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>{an.emoji}</button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#fff", border: "1.5px dashed #6ee7b7", borderRadius: 10, padding: 12, marginTop: 8 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#065f46", letterSpacing: 0.4, marginBottom: 8 }}>
        🔬 {t(E, "TRY: pick two animals — see shared traits", "직접 해봐: 두 동물 골라 — 공통 특성 보기")}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        {card(a, t(E, "Animal A", "동물 A"), pickA)}
        {card(b, t(E, "Animal B", "동물 B"), pickB)}
      </div>

      {/* Intersection bar */}
      <div style={{
        background: SAME ? "#fef2f2" : "#ecfdf5",
        border: `1.5px solid ${SAME ? "#fca5a5" : "#059669"}`,
        borderRadius: 8, padding: "8px 12px",
        textAlign: "center", marginBottom: 6,
      }}>
        {SAME ? (
          <div style={{ fontSize: 12, color: "#991b1b", fontWeight: 700 }}>
            {t(E, "Pick two DIFFERENT animals (i ≠ j).", "서로 다른 두 동물을 골라요 (i ≠ j).")}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 3 }}>
              |A ∩ B| = {t(E, "shared traits", "공통 특성 수")}
            </div>
            <div style={{ fontSize: 13, color: C.text }}>
              {shared.length === 0
                ? <span style={{ color: "#991b1b", fontWeight: 700 }}>{t(E, "No shared traits — they differ on the very first question.", "공통 특성 없음 — 첫 질문에서 바로 구분돼요.")}</span>
                : <>
                    <span style={{ fontWeight: 800, color: "#059669", fontSize: 18 }}>{shared.length}</span>
                    <span style={{ color: C.dim, marginLeft: 6 }}>
                      {"{ "}{shared.join(", ")}{" }"}
                    </span>
                  </>
              }
            </div>
            <div style={{ fontSize: 11, color: "#065f46", marginTop: 4 }}>
              {t(E,
                `So between this pair you could give ${shared.length} 'yes' answers before they split.`,
                `이 쌍 사이에선 ${shared.length}번 '예' 답한 뒤에야 갈라져요.`)}
            </div>
          </>
        )}
      </div>

      {/* Best-so-far tracker */}
      <div style={{ display: "flex", gap: 8, fontSize: 11, alignItems: "center", justifyContent: "center", color: C.dim }}>
        <span>{t(E, "Pairs tried:", "시도한 쌍:")} <b style={{ color: C.text }}>{seen.size}/6</b></span>
        <span>·</span>
        <span>{t(E, "Best so far:", "지금까지 최댓값:")} <b style={{ color: "#059669" }}>{best}</b></span>
        {seen.size === 6 && (
          <span style={{ color: "#059669", fontWeight: 800 }}>
            ✓ {t(E, "All pairs covered — answer = best.", "모든 쌍 확인 — 답 = 최댓값.")}
          </span>
        )}
      </div>
    </div>
  );
}

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
        "Bessie가 N마리 동물 목록에서 동물 하나를 마음에 떠올려요. 특성에 대해 예/아니오 질문만 할 수 있어요. 질문을 계속해서 결국 동물 하나로 좁혀요.\n최악의 경우, 동물을 유일하게 식별하기 전까지 받을 수 있는 '예' 답변의 최대 수는 몇 개일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🐾"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Guess the Animal</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum number of 'yes' answers possible before the animal is uniquely identified.",
                "동물이 유일하게 식별되기 전까지 받을 수 있는 'yes' 답변의 최대 수를 출력.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N animals", "N마리 동물")}</b>
                  {t(E, ", each with a known set of characteristics.",
                        "이 있고, 각 동물의 특성 집합이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie picks one animal in secret. You ask ", "Bessie가 동물 하나를 비밀로 정해요. ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "yes/no questions about characteristics", "특성에 대한 예/아니오 질문")}</b>
                  {t(E, " until only ONE animal in the list could possibly match all your answers.",
                        "을 해서 답변과 일치 가능한 동물이 1마리만 남을 때까지 좁혀요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
    // 1-3: Pairwise trait intersection sim
    {
      type: "reveal",
      narr: t(E,
        "Eye-evident sim. Pick any two animals. The shared traits glow — that's the intersection of their trait sets. Cycle through pairs and watch the 'best so far' counter; the answer to the whole problem is just the largest |A ∩ B| over all pairs.",
        "직접 보는 시뮬. 두 동물을 골라봐. 공통 특성이 빛나 — 그게 두 특성 집합의 교집합이야. 쌍을 바꿔보며 '지금까지 최댓값'을 봐. 전체 문제의 답은 모든 쌍 중 |A ∩ B|의 최댓값이야."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: "#065f46", lineHeight: 1.6 }}>
              <b style={{ color: "#059669" }}>{t(E, "Idea:", "아이디어:")}</b>{" "}
              {t(E,
                "If two animals share k traits, you can answer 'yes' k times and still not know which one Bessie picked. The worst pair across all i < j gives the answer (the trait that finally distinguishes them costs +1 in C++ code, but the maximum yes-count is the intersection size).",
                "두 동물이 특성 k개를 공유하면, 'yes' k번을 답해도 어느 쪽인지 모를 수 있어. 모든 i < j 쌍 중 가장 나쁜 쌍이 답 (마지막 구별 질문은 C++ 코드에선 +1, 최대 yes 수는 교집합 크기).")}
            </div>
          </div>
          <PairwiseTraitSim E={E} />
        </div>
      ),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Two animals share traits A and B.\nWhat's the maximum number of 'yes' answers before identification?", "두 동물이 특성 A와 B를 공유해요. 식별 전 최대 '예' 답변 수는?"),
      question: t(E,
        "Shared traits = {A, B}. Max 'yes' answers?",
        "공통 특성 = {A, B}. 최대 '예' 답변 수?"),
      hint: t(E,
        "Think about the size of the trait intersection between two animals.",
        "두 동물 사이 공통 특성 집합의 크기를 떠올려 봐."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGuessAnimalCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Worst-case 'yes' count = the largest pairwise trait intersection (the question that finally separates them adds +1 elsewhere). Compute every pair's intersection size and take the max. Sections build it one piece at a time.",
        "최악의 'yes' 수 = 모든 쌍 중 공통 특성 집합의 최대 크기 (마지막 구별 질문은 별도로 +1). 모든 쌍의 교집합 크기를 계산해 최댓값. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getGuessAnimalSections(E),
    },
  ];
}
