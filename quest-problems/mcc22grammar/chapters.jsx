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
        "We have a grammar graph where nodes are words (WE, THEY, DONT, KNOW, THAT) and directed edges define valid transitions.\nGiven a sentence, check if each consecutive pair follows an edge in the graph!", "단어(WE, THEY, DONT, KNOW, THAT)가 노드이고 방향 간선이 유효한 전환을 정의하는 문법 그래프가 있어요.\n문장이 주어지면, 연속된 단어 쌍이 그래프의 간선을 따르는지 확인해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcd6"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Grammar</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Build an adjacency list from the grammar edges.\nFor each sentence, check that every consecutive word pair has a valid edge. Simple graph traversal / edge lookup.",
              "핵심: 문법 간선으로 인접 리스트를 만들어요.\n각 문장에서 연속된 단어 쌍이 유효한 간선인지 확인해요.\n간단한 그래프 탐색 / 간선 조회.")}
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
        "Build adjacency list O(E), then for each sentence of length L, check L-1 edges.\nUse a set for O(1) lookup per edge.", "인접 리스트 구축 O(E), 길이 L인 각 문장에서 L-1개 간선 확인. 간선당 O(1) 조회를 위해 집합 사용."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(E + sum of L)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Store edges in adjacency list.\nFor each sentence, iterate through consecutive pairs and check if the edge exists. Linear in total input size.",
              "간선을 인접 리스트에 저장.\n각 문장에서 연속 쌍을 순회하며 간선 존재 여부 확인.\n전체 입력 크기에 선형.")}
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
