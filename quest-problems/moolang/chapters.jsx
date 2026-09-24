import { C, t } from "@/components/quest/theme";
import { getMooLangSections, MooLangDeepAudit } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeMooLangCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "How should sentences be built to use the most words?",
        "단어를 가장 많이 쓰려면 문장을 어떻게 짜야 할까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcdd"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Moo Language</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2023 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Given word counts and period/comma budgets, output the maximum total words usable.", "단어 개수와 쓸 수 있는 마침표·쉼표 수가 주어져요.\n문장을 만들 때 쓸 수 있는 단어 수의 최댓값을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We have a ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "word inventory", "단어 재고")}</b>
                  {t(E, " — counts of nouns, intransitive verbs, transitive verbs, and conjunctions.",
                        " 가 주어져요 — 명사, 자동사, 타동사, 접속사의 개수.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each sentence is either:", "문장은 둘 중 하나예요.")}
                  <div style={{ marginTop: 6, marginLeft: 8, fontSize: 12, color: "#475569" }}>
                    <b style={{ color: "#7c3aed" }}>{t(E, "(A)", "(A)")}</b> {t(E, " noun + intransitive verb  (2 words)", " 명사 + 자동사  (2 단어)")}<br/>
                    <b style={{ color: "#dc2626" }}>{t(E, "(B)", "(B)")}</b> {t(E, " noun + transitive verb + noun (+ ',' + noun ...)  (3+ words)", " 명사 + 타동사 + 명사 (+ ',' + 명사 ...)  (3 단어 이상)")}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two sentences can be ", "두 문장을 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "joined by a conjunction", "접속사로 연결")}</b>
                  {t(E, " (counts as 1 sentence using 1 conjunction). At most ", " 할 수 있어요. 그러면 한 문장으로 세고 접속사 하나를 써요. 마침표는 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>P</code>
                  {t(E, " periods and ", " 개, 쉼표는 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>C</code>
                  {t(E, " commas may be used.", " 개까지 쓸 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total number of words", "사용 단어 수의 최댓값")}</b>
                  {t(E, " usable.", " 을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Each word can only be used once!\nA transitive sentence uses 2 nouns, while an intransitive sentence uses 1 noun.\nWe need to balance them.", "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac\ub97c 2 \uac1c, \uc790\ub3d9\uc0ac \ubb38\uc7a5\uc740 1 \uac1c \uc368\uc694."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2563eb", marginBottom: 10 }}>
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
        "Is 'noun intransitive_verb' a valid sentence?", "'명사 자동사' 는 문장이 될까요?"),
      question: t(E, "Is 'noun intransitive_verb' valid?", "'\uba85\uc0ac \uc790\ub3d9\uc0ac' \ub294 \ubb38\uc7a5\uc774 \ub420\uae4c\uc694?"),
      options: [t(E, "Yes", "\ub124"), t(E, "No", "\uc544\ub2c8\uc624")],
      correct: 0,
      explain: t(E, "Correct! It matches Type 1: noun + intransitive_verb.", "\ub9de\uc544\uc694! \uc720\ud615 1 \uc778 '\uba85\uc0ac + \uc790\ub3d9\uc0ac' \uc608\uc694."),
    },
    {
      type: "input",
      narr: t(E,
        "3 nouns, 0 transitive verbs, 2 intransitive verbs. What's the max word count?", "명사 3 개, 타동사 0 개, 자동사 2 개예요. 몇 단어까지 쓸 수 있을까요?"),
      question: t(E, "3 nouns, 2 intransitive, 0 transitive → max words?", "\uba85\uc0ac 3 \uac1c, \uc790\ub3d9\uc0ac 2 \uac1c, \ud0c0\ub3d9\uc0ac 0 \uac1c\uc608\uc694.\n\uc4f8 \uc218 \uc788\ub294 \ub2e8\uc5b4\ub294 \ub9ce\uc544\uc57c \uba87 \uac1c\uc77c\uae4c\uc694?"),
      hint: t(E, "No transitive verbs \u2192 only Type 1. The bottleneck is the smaller of nouns / intransitive verbs.", "\ud0c0\ub3d9\uc0ac\uac00 \uc5c6\uc73c\ub2c8 \uc720\ud615 1 \ubb38\uc7a5\ub9cc \ub9cc\ub4e4 \uc218 \uc788\uc5b4\uc694.\n\uc720\ud615 1 \uc740 \uba85\uc0ac \ud558\ub098\uc640 \uc790\ub3d9\uc0ac \ud558\ub098\ub97c \uc4f0\ub2c8\uae4c,\n\uba85\uc0ac\uc640 \uc790\ub3d9\uc0ac \uc911 \ub354 \uc801\uc740 \ucabd\ub9cc\ud07c\ub9cc \ubb38\uc7a5\uc744 \ub9cc\ub4e4 \uc218 \uc788\uc5b4\uc694."),
      answer: 4,
    },
    {
      type: "reveal",
      narr: t(E,
        "The greedy approach: try all possible numbers of transitive sentences, use remaining nouns for intransitive sentences, pick the maximum!", "타동사 문장 수를 하나씩 다 해보고 제일 좋은 걸 골라요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2563eb", marginBottom: 10 }}>
              {t(E, "Strategy", "\uc804\ub7b5")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "For each possible # of transitive sentences t2:\n1. Uses 2*t2 nouns + t2 transitive verbs\n2. Remaining nouns: n - 2*t2\n3. Intransitive sentences: min(k, remaining nouns)\n4. Total words = t2*3 + t1*2\n5. Take max over all t2!",
                "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5 \uc218 t2 \ub97c 0 \ubd80\ud130 \ud558\ub098\uc529 \ub298\ub824 \uac00\uba70 \uc774\ub807\uac8c \ud574\uc694.\n1. \uba85\uc0ac\ub97c 2*t2 \uac1c, \ud0c0\ub3d9\uc0ac\ub97c t2 \uac1c \uc368\uc694\n2. \ub0a8\ub294 \uba85\uc0ac\ub294 n - 2*t2 \uac1c\uc608\uc694\n3. \uc790\ub3d9\uc0ac \ubb38\uc7a5\uc740 min(k, \ub0a8\uc740 \uba85\uc0ac) \uac1c \ub9cc\ub4e4 \uc218 \uc788\uc5b4\uc694\n4. \uc4f4 \ub2e8\uc5b4\ub294 t2*3 + t1*2 \uac1c\uc608\uc694\n5. \ubaa8\ub4e0 t2 \uc911\uc5d0\uc11c \uac00\uc7a5 \ud070 \uac12\uc744 \uace8\ub77c\uc694")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's run the strategy on a real sample. Step through every candidate n_tverb and watch the word count swing \u2014 the green row at the end is the answer.",
        "n_tverb \ub97c \ud558\ub098\uc529 \ubc1f\uc73c\uba74 \ub2e8\uc5b4 \uc218\uac00 \uc5b4\ub5bb\uac8c \ub2ec\ub77c\uc9c0\ub294\uc9c0 \ubcf4\uc5ec\uc694."),
      content: (<MooLangDeepAudit E={E} />),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeMooLangCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 한 단락씩 읽어 봐요."),
      sections: getMooLangSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "A transitive sentence uses how many nouns?", "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac\ub97c \uba87 \uac1c \uc0ac\uc6a9\ud560\uae4c?"),
      question: t(E, "How many nouns does a transitive sentence use?", "\ud0c0\ub3d9\uc0ac \ubb38\uc7a5\uc740 \uba85\uc0ac\ub97c \uba87 \uac1c \uc0ac\uc6a9?"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "noun + transitive_verb + noun = 2 nouns!", "\uba85\uc0ac + \ud0c0\ub3d9\uc0ac + \uba85\uc0ac = \uba85\uc0ac 2\uac1c!"),
    },
    {
      type: "input",
      narr: t(E,
        "5 nouns, 1 transitive verb, 3 intransitive verbs.\nIf we use 1 transitive sentence: 2 nouns used, 3 left.\nmin(3,3)=3 intransitive sentences.\nTotal = 3 + 3*2 = 9 words!", "\uba85\uc0ac 5, \ud0c0\ub3d9\uc0ac 1, \uc790\ub3d9\uc0ac 3.\n\ud0c0\ub3d9\uc0ac \ubb38\uc7a5 1\uac1c: \uba85\uc0ac 2\uac1c \uc0ac\uc6a9, 3\uac1c \ub0a8\uc74c.\nmin(3,3)=3 \uc790\ub3d9\uc0ac \ubb38\uc7a5.\n\ucd1d = 3 + 3*2 = 9\ub2e8\uc5b4!"),
      question: t(E, "5 nouns, 1 transitive, 3 intransitive → max words?", "\uba85\uc0ac 5, \ud0c0\ub3d9\uc0ac 1, \uc790\ub3d9\uc0ac 3 \u2192 \ucd5c\ub300 \ub2e8\uc5b4?"),
      hint: t(E, "Use 1 transitive (3 words) + 3 intransitive (6 words)", "\ud0c0\ub3d9\uc0ac 1\uac1c(3\ub2e8\uc5b4) + \uc790\ub3d9\uc0ac 3\uac1c(6\ub2e8\uc5b4)"),
      answer: 9,
    },
  ];
}
