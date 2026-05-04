import { C, t } from "@/components/quest/theme";
import { getMcc22GrammarSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from collections import deque",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    W = int(input_data[idx]); idx += 1",
  "    words = []",
  "    word_id = {}",
  "    for i in range(W):",
  "        w = input_data[idx]; idx += 1",
  "        words.append(w)",
  "        word_id[w] = i",
  "",
  "    E = int(input_data[idx]); idx += 1",
  "    adj = [[] for _ in range(W)]",
  "    for _ in range(E):",
  "        u = word_id[input_data[idx]]; idx += 1",
  "        v = word_id[input_data[idx]]; idx += 1",
  "        adj[u].append(v)",
  "",
  "    S = int(input_data[idx]); idx += 1",
  "    for _ in range(S):",
  "        n = int(input_data[idx]); idx += 1",
  "        sentence = []",
  "        for _ in range(n):",
  "            sentence.append(word_id[input_data[idx]]); idx += 1",
  "        valid = True",
  "        for i in range(n - 1):",
  "            if sentence[i+1] not in adj[sentence[i]]:",
  "                valid = False; break",
  "        print('YES' if valid else 'NO')",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22GrammarCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A 'grammar' is a directed graph: nodes are words and a directed edge X → Y means \"after word X, word Y is allowed\". A sentence is valid if every consecutive word pair (X, Y) has an edge X → Y.\nFor each input sentence, print VALID or INVALID.",
        "'문법' 은 단어가 노드인 방향 그래프예요. X → Y 의 방향 간선은 \"단어 X 다음에 단어 Y 가 올 수 있다\" 는 뜻. 문장이 유효하려면 모든 연속 단어 쌍 (X, Y) 에 X → Y 간선이 있어야 해요.\n각 입력 문장에 대해 VALID 또는 INVALID 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcd6"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Grammar</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "grammar is a directed graph of words", "문법은 단어들로 이뤄진 방향 그래프")}</b>
                  {t(E, ". An edge X → Y means \"Y can follow X\".",
                        " 예요. X → Y 간선은 \"X 다음에 Y\" 가능.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A sentence is ", "문장이 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "VALID if every consecutive (X, Y) has an edge X → Y", "유효하려면 모든 연속 (X, Y) 가 간선 X → Y 를 가져야")}</b>
                  {t(E, ".", " 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each input sentence, print ", "각 입력 문장에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "VALID or INVALID", "VALID 또는 INVALID")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "The grammar graph has edges: WE->DONT, WE->KNOW, THEY->DONT, THEY->KNOW, DONT->KNOW, KNOW->THAT, THAT->WE, THAT->THEY.\nIs the sentence 'WE KNOW' valid?", "문법 그래프 간선: WE->DONT, WE->KNOW, THEY->DONT, THEY->KNOW, DONT->KNOW, KNOW->THAT, THAT->WE, THAT->THEY.\n'WE KNOW' 문장은 유효할까?"),
      question: t(E,
        "WE can go to DONT or KNOW. Is 'WE KNOW' a valid sentence?",
        "WE는 DONT 또는 KNOW로 갈 수 있어요. 'WE KNOW'는 유효한 문장일까요?"),
      options: [
        t(E, "Yes, WE->KNOW is a valid edge", "맞아, WE->KNOW는 유효한 간선이야"),
        t(E, "No, WE cannot reach KNOW", "아니, WE는 KNOW에 도달할 수 없어"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! WE->KNOW is a direct edge in the grammar graph, so 'WE KNOW' is valid.",
        "맞아! WE->KNOW는 문법 그래프의 직접 간선이니까 'WE KNOW'는 유효해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Is 'WE KNOW' valid? Answer 1 for yes, 0 for no.", "'WE KNOW'는 유효한가? 예면 1, 아니면 0을 입력해요."),
      question: t(E,
        "Is 'WE KNOW' a valid sentence? (1=yes, 0=no)",
        "'WE KNOW'는 유효한 문장인가? (1=예, 0=아니오)"),
      hint: t(E,
        "WE can go to DONT or KNOW. Since WE->KNOW exists, it's valid!",
        "WE는 DONT 또는 KNOW로 갈 수 있어요. WE->KNOW가 존재하니까 유효해요!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22GrammarCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Store all grammar edges in a SET of (X, Y) tuples. For each input sentence, check that every consecutive (X, Y) pair is in the set.",
        "문법 간선을 (X, Y) 튜플의 SET 으로 저장. 각 입력 문장에서 모든 연속 쌍 (X, Y) 가 SET 에 있는지 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read edges into a set", "간선을 SET 에 읽기"), code: "edges = {(X, Y) for X→Y in input}", color: "#059669" },
              { n: 2, label: t(E, "For each sentence", "각 문장"), code: "for sentence in sentences: words = sentence.split()", color: "#7c3aed" },
              { n: 3, label: t(E, "Check all consecutive pairs", "연속 쌍 모두 확인"), code: "ok = all((words[i], words[i+1]) in edges for i in range(len(words)-1))", color: "#0891b2" },
              { n: 4, label: t(E, "Print VALID or INVALID", "VALID 또는 INVALID 출력"), code: "print('VALID' if ok else 'INVALID')", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(E + total length)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "set lookups are O(1)", "SET 조회는 O(1)")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22GrammarSections(E),
    },
  ];
}
