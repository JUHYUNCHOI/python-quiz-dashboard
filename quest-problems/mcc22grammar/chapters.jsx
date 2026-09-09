import { C, t } from "@/components/quest/theme";
import { getMcc22GrammarSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* 2026-09-09: 여기 있던 SOLUTION_CODE 를 지웠다.
   export 만 되고 **어디서도 import 되지 않는** 사본이었다 —
   실제 화면은 components.jsx 의 FULL_PY 를 쓴다.
   무해한 중복이 아니다: 안 쓰이니 아무도 안 봐서, 선생님이 지시하신
   "한 줄에 여러 문장 쓰지 마라" 일괄 작업이 이 사본만 건너뛰었고
   옛 스타일이 그대로 남아 있었다. 같은 사본이 MCC 36개에 있다(WORK.md 참조). */
/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22GrammarCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A fixed 'grammar' lists 5 valid words and, for each word, which words are allowed to come right after it. A sentence is correct only if every word is one of the 5 AND every neighbor pair is allowed.\nFor each test case, print YES or NO.",
        "고정된 '문법' 은 유효한 단어 5개를 정하고, 각 단어 뒤에 어떤 단어가 올 수 있는지를 알려줘요. 문장이 맞으려면 모든 단어가 5개 중 하나이고, 이웃한 모든 쌍이 허용돼야 해요.\n각 테스트 케이스마다 YES 또는 NO 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📖"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>Grammar</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P1</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Decide whether each sentence obeys the fixed grammar, and print YES or NO.",
                "각 문장이 고정된 문법을 지키는지 판단해서 YES 또는 NO 를 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The grammar is ", "문법은 ")}
                  <b style={{ color: "#059669" }}>{t(E, "fixed and given in the statement", "문제에 고정되어 주어져요")}</b>
                  {t(E, ": 5 words and a set of arrows. An arrow ", ": 단어 5개와 화살표들. 화살표 ")}
                  <b style={{ color: "#059669" }}>X → Y</b>
                  {t(E, " means \"Y may follow X\".", " 는 \"X 다음에 Y 가능\" 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A sentence is ", "문장이 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "correct if every word is one of the 5", "맞으려면 모든 단어가 5개 중 하나")}</b>
                  {t(E, " AND ", " 이고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "every neighbor pair (X, Y) has an arrow X → Y", "이웃한 모든 쌍 (X, Y) 에 화살표 X → Y 가 있어야")}</b>
                  {t(E, ".", " 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each test case, print ", "각 테스트 케이스마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES or NO", "YES 또는 NO")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. The grammar itself is NOT in the input — only T, then per test the length n and the n words.",
        "입력 형식과 공식 예제를 봐요. 문법 자체는 입력에 없어요 — T, 그다음 테스트마다 길이 n 과 단어 n 개만 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* The fixed grammar, spelled out */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6d28d9", marginBottom: 8 }}>
              📌 {t(E, "The fixed grammar (part of the problem)", "고정된 문법 (문제의 일부)")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              {[
                ["WE", "DONT, KNOW"],
                ["THEY", "DONT, KNOW"],
                ["DONT", "KNOW"],
                ["KNOW", "WE, THEY, THAT"],
                ["THAT", "WE, THEY"],
              ].map(([w, nxt]) => (
                <span key={w} style={{ ...NW, border: "1px solid #ddd6fe", borderRadius: 6, padding: "2px 7px", background: "#fff" }}>
                  <b style={{ color: "#7c3aed" }}>{w}</b>
                  <span style={{ color: "#059669" }}> → </span>
                  <b style={{ color: "#065f46" }}>{nxt}</b>
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 케이스 수")}</div>
              <div>• {t(E, "then per test: a line with ", "그다음 테스트마다: ")}<b>n</b>{t(E, ", then a line with ", " 한 줄, 그다음 ")}<b>n</b>{t(E, " space-separated words", " 개 단어가 공백으로 구분된 줄")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 500, and the total of all n ≤ 100000.", "제약: 1 ≤ T ≤ 500, 모든 n 의 합 ≤ 100000.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 190 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>4</div>
              <div>2</div>
              <div>WE KNOW</div>
              <div>5</div>
              <div style={{ overflowX: "auto" }}>THEY KNOW WE DONT KNOW</div>
              <div>2</div>
              <div>WE THEY</div>
              <div>5</div>
              <div style={{ overflowX: "auto" }}>I KNEW THAT THEY KNOW</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800, color: "#fca5a5" }}>NO</div>
              <div style={{ fontWeight: 800, color: "#fca5a5" }}>NO</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              /* 2026-09-09: 여기에 세 샘플이 왜 YES/NO 인지 이유가 다 적혀 있었다.
                 원문 PDF 는 이 Explanation 을 Sample Output 다음 **별도 섹션**에 둔다 —
                 형식 → 샘플 → (나중에) 설명 순서다. 우리는 형식 카드 안에 밀어 넣어
                 [승]과 [전]을 한 쪽에 합쳤고, 그래서 다음 쪽 시뮬과 그다음 퀴즈가
                 둘 다 "이미 읽은 것 재확인" 이 됐다. 지운 게 아니라 시뮬로 옮긴다 —
                 시뮬이 정확히 이 네 문장을 픽업 버튼으로 갖고 있다. */
              "Why is each one YES or NO? Pick the sentences in the sim below and step through them.",
              "왜 각각 YES 이고 NO 일까요? 아래 시뮬에서 문장을 하나씩 골라 짚어봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "sim",
      narr: t(E,
        "Feel the rule. Pick a sentence and step through it word by word — watch each word pass or fail the two checks, then read the YES/NO verdict.",
        "규칙을 직접 느껴봐요. 문장을 골라 단어를 하나씩 확인하며 두 검사를 통과하는지 보고, YES/NO 판정을 읽어요."),
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Check it against the arrow list below.",
        "아래 화살표 목록과 맞춰봐요."),
      question: t(E,
        "Grammar: WE → {DONT, KNOW}, THEY → {DONT, KNOW}, DONT → {KNOW}, KNOW → {WE, THEY, THAT}, THAT → {WE, THEY}. Is the sentence \"WE THEY\" correct?",
        "문법: WE → {DONT, KNOW}, THEY → {DONT, KNOW}, DONT → {KNOW}, KNOW → {WE, THEY, THAT}, THAT → {WE, THEY}. 문장 \"WE THEY\" 는 맞을까요?"),
      options: [
        t(E, "NO — there is no arrow WE → THEY", "NO — WE → THEY 화살표가 없어요"),
        t(E, "YES — both are valid words", "YES — 둘 다 유효한 단어예요"),
      ],
      correct: 0,
      explain: t(E,
        "Both words are valid, but a sentence also needs an arrow for every neighbor pair. WE points only to DONT and KNOW, so WE → THEY is missing → NO.",
        "두 단어 모두 유효하지만, 문장은 이웃한 모든 쌍에 화살표도 필요해요. WE 는 DONT 와 KNOW 로만 가리키니 WE → THEY 는 없어요 → NO."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22GrammarCh2(E, lang = "py") {
  return [
    // 2-1: plan — slow lookup vs fast lookup
    {
      type: "reveal",
      narr: t(E,
        /* 2026-09-09: 여기가 **가짜 병목**이었다.
           "매번 모든 화살표를 훑는 건 낭비" 라고 🐢느림/🚀빠름 대비를 만들어놨는데,
           제약을 넣고 계산해보면 Σn ≤ 100,000 이고 화살표가 10개라 최악이 100만 번이다 —
           시간 제한 문턱(10^8)의 1/100 이다. **전혀 안 느리다.**
           타임아웃 시뮬도 느려지는 장면도 없이 "낭비예요" 문장 하나뿐이었다.
           없는 병목을 있는 것처럼 말하면 학생이 "이 문제엔 진짜 속도 문제가 있구나" 라고
           **잘못 배운다.** 속도 서사를 걷어내고 진짜 이유로 바꾼다 —
           표를 한 번 만들어두면 코드가 짧고, 읽는 사람이 규칙을 한눈에 본다. */
        "Both checks are just lookups. The question is what shape to keep the grammar in so the code stays short and obvious.",
        "두 검사 모두 '찾아보기' 예요. 문법을 어떤 모양으로 들고 있어야 코드가 짧고 한눈에 보일까요?"),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                📋 {t(E, "One way: scan the whole arrow list for every pair", "한 방법: 쌍마다 화살표 목록 전체를 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {t(E, "For each neighbor pair, walk through all 10 arrows to see if it is there. This works fine here — 100,000 pairs times 10 arrows is only a million steps.", "이웃한 쌍마다 화살표 10개를 다 훑어 있는지 봐요.\n여기선 이것도 충분히 빨라요 — 쌍 10만 개 × 화살표 10개면 100만 걸음이거든요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                ✨ {t(E, "Nicer: adj[word] = set of allowed successors", "더 나은 방법: adj[단어] = 허용 다음-단어 집합")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Build the table once. Then 'word in adj' (check ①) and 'next in adj[word]' (check ②) are each one instant lookup — a single pass over each sentence.", "표를 한 번 만들어 둬요. 그러면 'word in adj' (검사 ①) 와 'next in adj[word]' (검사 ②) 가 각각 한 번의 즉시 조회 — 문장마다 한 번만 훑어요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22GrammarSections(E),
    },
  ];
}
