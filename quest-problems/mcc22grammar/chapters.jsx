import { C, t } from "@/components/quest/theme";
import { getMcc22GrammarSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (fixed grammar → two checks per sentence)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "# The grammar is FIXED — it is given in the problem, NOT read from input.",
  "adj = {",
  "    'WE':   {'DONT', 'KNOW'},",
  "    'THEY': {'DONT', 'KNOW'},",
  "    'DONT': {'KNOW'},",
  "    'KNOW': {'WE', 'THEY', 'THAT'},",
  "    'THAT': {'WE', 'THEY'},",
  "}",
  "",
  "data = sys.stdin.read().split('\\n')",
  "idx = 0",
  "T = int(data[idx]); idx += 1",
  "out = []",
  "for _ in range(T):",
  "    n = int(data[idx]); idx += 1",
  "    words = data[idx].split(); idx += 1",
  "    ok = all(w in adj for w in words)",
  "    if ok:",
  "        for i in range(len(words) - 1):",
  "            if words[i + 1] not in adj[words[i]]:",
  "                ok = False; break",
  "    out.append('YES' if ok else 'NO')",
  "print('\\n'.join(out))",
];


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
              "\"WE KNOW\": WE → KNOW exists → YES. \"WE THEY\": there is no arrow WE → THEY → NO. \"I KNEW THAT THEY KNOW\": I and KNEW aren't among the 5 words → NO.",
              "\"WE KNOW\": WE → KNOW 화살표 있음 → YES. \"WE THEY\": WE → THEY 화살표 없음 → NO. \"I KNEW THAT THEY KNOW\": I 와 KNEW 는 5개 단어에 없음 → NO.")}
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
        "Look at the arrows out of each word. \"WE THEY\": is there an arrow WE → THEY? WE only points to DONT and KNOW.",
        "각 단어에서 나가는 화살표를 봐요. \"WE THEY\": WE → THEY 화살표가 있나요? WE 는 DONT 와 KNOW 로만 가리켜요."),
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
        "The check itself is a single pass over each sentence — the only question is how fast one 'is this pair allowed?' lookup is. Scanning a list of all arrows every time is wasteful; storing each word's allowed successors as a set makes every lookup instant.",
        "검사 자체는 각 문장을 한 번 훑는 것뿐이에요 — 관건은 '이 쌍이 허용되나?' 조회 한 번이 얼마나 빠른가예요. 매번 모든 화살표 목록을 훑는 건 낭비고, 각 단어의 허용 다음-단어를 집합으로 저장하면 조회가 한 번에 끝나요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: scan the whole arrow list for every pair", "느림: 쌍마다 화살표 목록 전체를 훑기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "For each neighbor pair, walk through all 10 arrows to see if it's there. Works, but repeats the same scan again and again.", "이웃한 쌍마다 화살표 10개를 모두 훑어 있는지 확인. 되긴 하지만 같은 훑기를 계속 반복해요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: adj[word] = set of allowed successors", "빠름: adj[단어] = 허용 다음-단어 집합")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Build the table once. Then 'word in adj' (check ①) and 'next in adj[word]' (check ②) are each one instant lookup — a single pass over each sentence.", "표를 한 번 만들어 둬요. 그러면 'word in adj' (검사 ①) 와 'next in adj[word]' (검사 ②) 가 각각 한 번의 즉시 조회 — 문장마다 한 번만 훑어요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
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
