import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "n, m, k = map(int, input().split())",
  "# n nouns, m transitive verbs, k intransitive verbs",
  "",
  "# Sentence types:",
  "# Type 1: noun + intransitive_verb (2 words, uses 1 noun, 1 intrans)",
  "# Type 2: noun + transitive_verb + noun (3 words, uses 2 nouns, 1 trans)",
  "",
  "# Greedy: maximize total words",
  "best = 0",
  "# try all splits: use t2 transitive sentences, rest intransitive",
  "for t2 in range(min(m, n // 2) + 1):",
  "    nouns_left = n - 2 * t2",
  "    t1 = min(k, nouns_left)",
  "    total = t2 * 3 + t1 * 2",
  "    best = max(best, total)",
  "",
  "print(best)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeMooLangCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The Moo Language has simple grammar rules. Let's learn how to form sentences and maximize the number of words used! \ud83d\udcdd",
        "무 언어에는 간단한 문법 규칙이 있어. 문장을 만들고 사용하는 단어 수를 최대화하는 법을 배우자! \ud83d\udcdd"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcdd"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Moo Language</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Two sentence types:\n\u2022 noun + intransitive_verb (2 words)\n\u2022 noun + transitive_verb + noun (3 words)\nMaximize total words used!",
              "\ub450 \ubb38\uc7a5 \uc720\ud615:\n\u2022 \uba85\uc0ac + \uc790\ub3d9\uc0ac (2\ub2e8\uc5b4)\n\u2022 \uba85\uc0ac + \ud0c0\ub3d9\uc0ac + \uba85\uc0ac (3\ub2e8\uc5b4)\n\ucd1d \ub2e8\uc5b4 \uc218\ub97c \ucd5c\ub300\ud654!")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Each word can only be used once! A transitive sentence uses 2 nouns, while an intransitive sentence uses 1 noun. We need to balance them.",
        "\uac01 \ub2e8\uc5b4\ub294 \ud55c \ubc88\ub9cc \uc4f8 \uc218 \uc788\uc5b4! \ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac 2\uac1c, \uc790\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac 1\uac1c\ub97c \uc4f0\uc9c0. \uade0\ud615\uc744 \ub9de\ucdb0\uc57c \ud574."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#2563eb", marginBottom: 10 }}>
              {t(E, "Sentence Structure", "\ubb38\uc7a5 \uad6c\uc870")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700 }}>
                {t(E, "Type 1: [Noun] [Intransitive Verb] = 2 words", "\uc720\ud615 1: [\uba85\uc0ac] [\uc790\ub3d9\uc0ac] = 2\ub2e8\uc5b4")}
              </div>
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700 }}>
                {t(E, "Type 2: [Noun] [Transitive Verb] [Noun] = 3 words", "\uc720\ud615 2: [\uba85\uc0ac] [\ud0c0\ub3d9\uc0ac] [\uba85\uc0ac] = 3\ub2e8\uc5b4")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Is 'noun intransitive_verb' a valid sentence?",
        "'명사 자동사'는 유효한 문장일까?"),
      question: t(E, "Is 'noun intransitive_verb' valid?", "'\uba85\uc0ac \uc790\ub3d9\uc0ac'\ub294 \uc720\ud6a8\ud55c \ubb38\uc7a5\uc778\uac00?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! It matches Type 1: noun + intransitive_verb.", "\ub9de\uc544! \uc720\ud615 1: \uba85\uc0ac + \uc790\ub3d9\uc0ac\uc5d0 \ud574\ub2f9\ud574."),
    },
    {
      type: "input",
      narr: t(E,
        "3 nouns, 0 transitive verbs, 2 intransitive verbs. We can only make Type 1 sentences. Each needs 1 noun + 1 intransitive verb. Limited by 2 intransitive verbs = 2 sentences = 4 words!",
        "명사 3개, 타동사 0개, 자동사 2개. 유형 1 문장만 가능. 각각 명사 1개 + 자동사 1개. 자동사 2개로 제한 = 2문장 = 4단어!"),
      question: t(E, "3 nouns, 2 intransitive, 0 transitive → max words?", "\uba85\uc0ac 3, \uc790\ub3d9\uc0ac 2, \ud0c0\ub3d9\uc0ac 0 \u2192 \ucd5c\ub300 \ub2e8\uc5b4?"),
      hint: t(E, "Only Type 1 possible: 2 sentences x 2 words each", "\uc720\ud615 1\ub9cc \uac00\ub2a5: 2\ubb38\uc7a5 x 2\ub2e8\uc5b4"),
      answer: 4,
    },
    {
      type: "reveal",
      narr: t(E,
        "The greedy approach: try all possible numbers of transitive sentences, use remaining nouns for intransitive sentences, pick the maximum!",
        "그리디 접근: 가능한 타동사 문장 수를 모두 시도하고, 남은 명사로 자동사 문장을 만들고, 최댓값을 선택!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#2563eb", marginBottom: 10 }}>
              {t(E, "Strategy", "\uc804\ub7b5")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              {t(E,
                "For each possible # of transitive sentences t2:\n1. Uses 2*t2 nouns + t2 transitive verbs\n2. Remaining nouns: n - 2*t2\n3. Intransitive sentences: min(k, remaining nouns)\n4. Total words = t2*3 + t1*2\n5. Take max over all t2!",
                "\uac00\ub2a5\ud55c \ud0c0\ub3d9\uc0ac \ubb38\uc7a5 \uc218 t2\ub9c8\ub2e4:\n1. \uba85\uc0ac 2*t2 + \ud0c0\ub3d9\uc0ac t2 \uc0ac\uc6a9\n2. \ub0a8\uc740 \uba85\uc0ac: n - 2*t2\n3. \uc790\ub3d9\uc0ac \ubb38\uc7a5: min(k, \ub0a8\uc740 \uba85\uc0ac)\n4. \ucd1d \ub2e8\uc5b4 = t2*3 + t1*2\n5. \ubaa8\ub4e0 t2\uc5d0\uc11c \ucd5c\ub300!")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeMooLangCh2(E) {
  return [
    {
      type: "code",
      narr: t(E,
        "Here's the Python solution. We iterate over possible transitive sentence counts and maximize total words.",
        "\ud30c\uc774\uc36c \ud480\uc774\uc57c. \uac00\ub2a5\ud55c \ud0c0\ub3d9\uc0ac \ubb38\uc7a5 \uc218\ub97c \ubc18\ubcf5\ud558\uba70 \ucd1d \ub2e8\uc5b4\ub97c \ucd5c\ub300\ud654\ud574."),
      label: t(E, "\ud83d\udc0d Full Solution", "\ud83d\udc0d \uc804\uccb4 \ud480\uc774"),
      code: SOLUTION_CODE,
    },
    {
      type: "quiz",
      narr: t(E,
        "A transitive sentence uses how many nouns?",
        "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac\ub97c \uba87 \uac1c \uc0ac\uc6a9\ud560\uae4c?"),
      question: t(E, "How many nouns does a transitive sentence use?", "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac\ub97c \uba87 \uac1c \uc0ac\uc6a9?"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "noun + transitive_verb + noun = 2 nouns!", "\uba85\uc0ac + \ud0c0\ub3d9\uc0ac + \uba85\uc0ac = \uba85\uc0ac 2\uac1c!"),
    },
    {
      type: "input",
      narr: t(E,
        "5 nouns, 1 transitive verb, 3 intransitive verbs. If we use 1 transitive sentence: 2 nouns used, 3 left. min(3,3)=3 intransitive sentences. Total = 3 + 3*2 = 9 words!",
        "\uba85\uc0ac 5, \ud0c0\ub3d9\uc0ac 1, \uc790\ub3d9\uc0ac 3. \ud0c0\ub3d9\uc0ac \ubb38\uc7a5 1\uac1c: \uba85\uc0ac 2\uac1c \uc0ac\uc6a9, 3\uac1c \ub0a8\uc74c. min(3,3)=3 \uc790\ub3d9\uc0ac \ubb38\uc7a5. \ucd1d = 3 + 3*2 = 9\ub2e8\uc5b4!"),
      question: t(E, "5 nouns, 1 transitive, 3 intransitive → max words?", "\uba85\uc0ac 5, \ud0c0\ub3d9\uc0ac 1, \uc790\ub3d9\uc0ac 3 \u2192 \ucd5c\ub300 \ub2e8\uc5b4?"),
      hint: t(E, "Use 1 transitive (3 words) + 3 intransitive (6 words)", "\ud0c0\ub3d9\uc0ac 1\uac1c(3\ub2e8\uc5b4) + \uc790\ub3d9\uc0ac 3\uac1c(6\ub2e8\uc5b4)"),
      answer: 9,
    },
  ];
}
