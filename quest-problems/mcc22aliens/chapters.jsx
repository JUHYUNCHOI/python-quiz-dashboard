import { C, t } from "@/components/quest/theme";
import { getMcc22AliensSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1",
  "    types = []",
  "    claims = []",
  "    for i in range(N):",
  "        ti = input_data[idx]; idx += 1",
  "        pi = int(input_data[idx]) - 1; idx += 1",
  "        bi = input_data[idx]; idx += 1",
  "        types.append(ti)",
  "        claims.append((pi, bi))",
  "",
  "    # Check consistency:",
  "    # T-type alien tells truth, F-type lies",
  "    # If alien i is T and says 'alien p is b',",
  "    #   then alien p must be type b",
  "    # If alien i is F and says 'alien p is b',",
  "    #   then alien p must NOT be type b",
  "    consistent = True",
  "    for i in range(N):",
  "        pi, bi = claims[i]",
  "        if types[i] == 'T':",
  "            if types[pi] != bi:",
  "                consistent = False; break",
  "        else:",
  "            if types[pi] == bi:",
  "                consistent = False; break",
  "",
  "    print('YES' if consistent else 'NO')",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22AliensCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N aliens are each labeled T (truth-teller) or F (liar). Each makes a claim about another alien's type. Truth-tellers always tell the truth; liars always lie.\nCheck whether the given type assignment is consistent with all claims — print Y or N.",
        "N 명의 외계인이 각자 T (진실) 또는 F (거짓말쟁이) 로 라벨돼 있어요. 각 외계인이 다른 외계인의 타입에 대해 주장해요. 진실형은 항상 참, 거짓말쟁이는 항상 거짓.\n주어진 타입 할당이 모든 주장과 일관된지 Y 또는 N 으로 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc7d"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Aliens</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N aliens are each labeled ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "T (truth-teller) or F (liar)", "T (진실) 또는 F (거짓말쟁이)")}</b>
                  {t(E, ".", " 로 라벨돼 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each makes a claim about another alien's type — ", "각 외계인이 다른 외계인의 타입에 대해 주장 — ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "T always tells truth, F always lies", "T 는 항상 참, F 는 항상 거짓")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "Y if all claims are consistent with the given assignment, else N", "주어진 할당이 모든 주장과 일관되면 Y, 아니면 N")}</b>
                  {t(E, ".", ".")}
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
        "If a T-type alien says 'alien 2 is T', and alien 2 IS type T, is this consistent?", "T타입 외계인이 '외계인 2는 T'라고 말하고, 외계인 2가 실제로 T타입이면, 일관된 것일까요?"),
      question: t(E,
        "T-type says 'alien 2 is T'. Alien 2 is indeed T. Consistent?",
        "T타입이 '외계인 2는 T'라고 말해요. 외계인 2는 실제로 T야. 일관적일까요?"),
      options: [
        t(E, "Yes, truth-teller's claim matches reality", "맞아, 진실형의 주장이 현실과 일치해"),
        t(E, "No, this is contradictory", "아니, 모순이야"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A truth-teller always tells the truth, so if they say alien 2 is T and alien 2 is T, it's consistent.",
        "맞아! 진실형은 항상 진실을 말하니까, 외계인 2가 T라고 말했고 실제로 T이면 일관적이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Is the above scenario consistent? Answer 1 for yes, 0 for no.", "위 시나리오는 일관적인가? 예면 1, 아니면 0."),
      question: t(E,
        "T-type says 'alien 2 is T', alien 2 is T. Consistent? (1=yes, 0=no)",
        "T타입이 '외계인2는 T' 주장, 외계인2는 T. 일관적? (1=예, 0=아니오)"),
      hint: t(E,
        "Truth-tellers tell truth. Claim matches reality. So yes, consistent!",
        "진실형은 진실을 말해요. 주장이 현실과 일치해요. 그러니까 맞아, 일관적!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22AliensCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each alien, check if their claim is consistent with the type assignment.\nO(N) per test case.", "각 외계인에 대해 주장이 타입 할당과 일관적인지 확인. 테스트 케이스당 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Iterate through each alien.\nIf T-type, check claim matches reality. If F-type, check claim contradicts reality. One pass through all aliens.",
              "각 외계인을 순회.\nT타입이면 주장이 현실과 일치하는지, F타입이면 모순되는지 확인.\n모든 외계인을 한 번 순회.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22AliensSections(E),
    },
  ];
}
