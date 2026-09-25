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
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📝"}</div>
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문, cpid=1324) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  T test cases, each with N, C, P and N word lines.",
        "입력은 테스트 케이스 T 개, 각각 N, C, P 다음 N 개의 단어 줄로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N C P</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— word count, comma budget, period budget", "— 단어 개수, 쉼표 개수, 마침표 개수")}</span></div>
                <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                  <div><span style={{ color: "#92400e", fontWeight: 800 }}>word type</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the word, then its type", "— 단어, 그리고 단어의 종류")}</span></div>
                  <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
                </div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>{t(E, "↑ this block repeats T times", "↑ 이 블록이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each test case: the maximum word count on one line, then any valid sequence of sentences achieving it on the next line.",
                  "테스트 케이스마다 두 줄 — 최대 단어 수, 그리고 그 수를 만드는 문장들을 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 100</div>
              <div>1 ≤ P, C ≤ N ≤ 1000</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "each word: 1~10 lowercase letters  ·  some subtasks have no transitive/intransitive verbs or no conjunctions", "단어는 소문자 1~10글자  ·  일부 서브태스크는 타동사·자동사·접속사 중 하나가 아예 없음")}</div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Each word can only be used once!\nA transitive sentence uses 2 nouns, while an intransitive sentence uses 1 noun.\nWe need to balance them.", "타동사 문장은 명사를 2 개, 자동사 문장은 1 개 써요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2563eb", marginBottom: 10 }}>
              {t(E, "Sentence Structure", "문장 구조")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700 }}>
                {t(E, "Type 1: [Noun] [Intransitive Verb] = 2 words", "유형 1: [명사] [자동사] = 2단어")}
              </div>
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700 }}>
                {t(E, "Type 2: [Noun] [Transitive Verb] [Noun] = 3 words", "유형 2: [명사] [타동사] [명사] = 3단어")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Is 'noun intransitive_verb' a valid sentence?", "'명사 자동사' 는 문장이 될까요?"),
      question: t(E, "Is 'noun intransitive_verb' valid?", "'명사 자동사' 는 문장이 될까요?"),
      options: [t(E, "Yes", "네"), t(E, "No", "아니오")],
      correct: 0,
      explain: t(E, "Correct! It matches Type 1: noun + intransitive_verb.", "맞아요! 유형 1 인 '명사 + 자동사' 예요."),
    },
    {
      type: "input",
      narr: t(E,
        "3 nouns, 0 transitive verbs, 2 intransitive verbs. What's the max word count?", "명사 3 개, 타동사 0 개, 자동사 2 개예요. 몇 단어까지 쓸 수 있을까요?"),
      question: t(E, "3 nouns, 2 intransitive, 0 transitive → max words?", "명사 3 개, 자동사 2 개, 타동사 0 개예요.\n쓸 수 있는 단어는 많아야 몇 개일까요?"),
      hint: t(E, "No transitive verbs → only Type 1. The bottleneck is the smaller of nouns / intransitive verbs.", "타동사가 없으니 유형 1 문장만 만들 수 있어요.\n유형 1 은 명사 하나와 자동사 하나를 쓰니까,\n명사와 자동사 중 더 적은 쪽만큼만 문장을 만들 수 있어요."),
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
              {t(E, "Strategy", "전략")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "For each possible # of transitive sentences t2:\n1. Uses 2*t2 nouns + t2 transitive verbs\n2. Remaining nouns: n - 2*t2\n3. Intransitive sentences: min(k, remaining nouns)\n4. Total words = t2*3 + t1*2\n5. Take max over all t2!",
                "타동사 문장 수 t2 를 0 부터 하나씩 늘려 가며 이렇게 해요.\n1. 명사를 2*t2 개, 타동사를 t2 개 써요\n2. 남는 명사는 n - 2*t2 개예요\n3. 자동사 문장은 min(k, 남은 명사) 개 만들 수 있어요\n4. 쓴 단어는 t2*3 + t1*2 개예요\n5. 모든 t2 중에서 가장 큰 값을 골라요")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's run the strategy on a real sample. Step through every candidate n_tverb and watch the word count swing — the green row at the end is the answer.",
        "n_tverb 를 하나씩 밟으면 단어 수가 어떻게 달라지는지 보여요."),
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
      type: "opt-codewalk",
      narr: t(E,
        "The solution code, start to finish — toggle Python ↔ C++ via the header.", "풀이 코드를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
    {
      type: "quiz",
      narr: t(E,
        "A transitive sentence uses how many nouns?", "타동사 문장은 명사를 몇 개 사용할까?"),
      question: t(E, "How many nouns does a transitive sentence use?", "타동사 문장은 명사를 몇 개 사용?"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E, "noun + transitive_verb + noun = 2 nouns!", "명사 + 타동사 + 명사 = 명사 2개!"),
    },
    {
      type: "input",
      narr: t(E,
        "5 nouns, 1 transitive verb, 3 intransitive verbs — what's the max total word count?", "명사 5, 타동사 1, 자동사 3 — 최대 단어 수는?"),
      question: t(E, "5 nouns, 1 transitive, 3 intransitive → max words?", "명사 5, 타동사 1, 자동사 3 → 최대 단어?"),
      hint: t(E, "Use 1 transitive (3 words) + 3 intransitive (6 words)", "타동사 1개(3단어) + 자동사 3개(6단어)"),
      answer: 9,
    },
  ];
}
