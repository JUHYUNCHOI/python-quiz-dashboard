// Algorithm Lab 토픽 메타데이터
export interface AlgoTopic {
  id: string
  title: string
  titleEn: string
  icon: string
  category: string
  categoryEn: string
  wave: 1 | 2 | 3   // 통합 우선순위
  lessonId: string   // algo-* lessonId (진도 연동)
  /** Coderin 레슨 선수 학습 안내 — 토픽 페이지 진입 시 배너로 노출 */
  prerequisite?: {
    lessonId: string      // 예: "cpp-18"
    title: string         // 예: "stack & queue"
    titleEn?: string
    reason: string        // 왜 이 레슨이 도움 되는지
    reasonEn?: string
  }
}

export const ALGO_TOPICS: AlgoTopic[] = [
  // ── Wave 1 — Bronze ────────────────────────────────────────────────────────
  // 가장 기본적인 자료구조와 기법. 배열→정렬→스택/큐→해시→누적합→문자열 순으로
  // 각 토픽이 이전 토픽을 자연스럽게 활용하도록 배치.
  { id: "array",        title: "배열",           titleEn: "Array",           icon: "📊", category: "기초 (Bronze)",       categoryEn: "Basics (Bronze)",         wave: 1, lessonId: "algo-array" },
  { id: "sorting",      title: "정렬",            titleEn: "Sorting",         icon: "🔢", category: "기초 (Bronze)",       categoryEn: "Basics (Bronze)",         wave: 1, lessonId: "algo-sorting" },
  { id: "stackqueue",   title: "스택/큐",          titleEn: "Stack & Queue",   icon: "📚", category: "자료구조 (Bronze)",   categoryEn: "Data Structures (Bronze)",wave: 1, lessonId: "algo-stackqueue",
    prerequisite: { lessonId: "cpp-18", title: "stack & queue",
      reason: "C++ std::stack / std::queue / std::deque 사용법은 cpp-18 에 있어요. API 5 분 훑고 오면 알고리즘 적용이 매끄러워요.",
      reasonEn: "std::stack / std::queue / std::deque usage is in cpp-18. A 5-minute API skim makes the algorithmic patterns much smoother." } },
  { id: "hashtable",    title: "해시테이블",        titleEn: "Hash Table",      icon: "🗂️", category: "자료구조 (Bronze~Silver)", categoryEn: "Data Structures (Bronze~Silver)", wave: 1, lessonId: "algo-hashtable" },
  { id: "prefixsum",    title: "누적합",           titleEn: "Prefix Sum",      icon: "➕", category: "기법 (Bronze~Silver)", categoryEn: "Technique (Bronze~Silver)", wave: 1, lessonId: "algo-prefixsum" },
  { id: "string",       title: "문자열",           titleEn: "String",          icon: "🔤", category: "기초 (Bronze~Silver)", categoryEn: "Basics (Bronze~Silver)",  wave: 1, lessonId: "algo-string" },

  // ── Wave 2 — Silver ────────────────────────────────────────────────────────
  // Recursion을 가장 먼저 — Graph(DFS), DP, Backtracking 모두 재귀가 기반.
  // DP를 마지막으로 — Silver에서 가장 어렵고 수학적 사고가 필요.
  { id: "recursion",    title: "재귀",             titleEn: "Recursion",       icon: "🔄", category: "기법 (Silver)",       categoryEn: "Technique (Silver)",      wave: 2, lessonId: "algo-recursion" },
  { id: "binarysearch", title: "이분탐색",          titleEn: "Binary Search",   icon: "🎯", category: "탐색 (Silver)",       categoryEn: "Search (Silver)",         wave: 2, lessonId: "algo-binarysearch" },
  { id: "greedy",       title: "그리디",            titleEn: "Greedy",          icon: "💡", category: "기법 (Silver)",       categoryEn: "Technique (Silver)",      wave: 2, lessonId: "algo-greedy" },
  { id: "graph",        title: "그래프 (BFS/DFS)",  titleEn: "Graph (BFS/DFS)", icon: "🕸️", category: "그래프 (Silver)",     categoryEn: "Graph (Silver)",          wave: 2, lessonId: "algo-graph",
    prerequisite: { lessonId: "cpp-18", title: "stack & queue",
      reason: "BFS 는 queue 가 핵심 (들어온 순서대로 처리), DFS 는 재귀 또는 stack. 시작 전에 cpp-18 의 stack/queue 5 분만 훑고 오면 코드가 훨씬 편해요.",
      reasonEn: "BFS needs a queue; DFS uses recursion or a stack. A 5-minute skim of cpp-18 stack/queue before diving in makes the code much smoother." } },
  { id: "unionfind",    title: "유니온 파인드",      titleEn: "Union Find",      icon: "🔵", category: "자료구조 (Silver)",   categoryEn: "Data Structures (Silver)", wave: 2, lessonId: "algo-unionfind" },
  { id: "dp",           title: "동적 프로그래밍",    titleEn: "Dynamic Programming", icon: "🧩", category: "기법 (Silver~Gold)", categoryEn: "Technique (Silver~Gold)", wave: 2, lessonId: "algo-dp" },

  // ── Wave 3 — Gold+ ────────────────────────────────────────────────────────
  // Graph/DP를 기반으로 하는 심화 토픽들. 난이도 순으로 배치.
  { id: "backtracking", title: "백트래킹",          titleEn: "Backtracking",    icon: "↩️", category: "기법 (Gold)",         categoryEn: "Technique (Gold)",        wave: 3, lessonId: "algo-backtracking" },
  { id: "tree",         title: "트리",              titleEn: "Tree",            icon: "🌳", category: "자료구조 (Gold)",     categoryEn: "Data Structures (Gold)",  wave: 3, lessonId: "algo-tree" },
  { id: "priorityqueue",title: "우선순위 큐",        titleEn: "Priority Queue",  icon: "⚡", category: "자료구조 (Gold)",     categoryEn: "Data Structures (Gold)",  wave: 3, lessonId: "algo-priorityqueue",
    prerequisite: { lessonId: "cpp-18", title: "stack & queue (priority_queue 포함)",
      reason: "std::priority_queue 사용법 (max-heap 기본, min-heap 만들기) 은 cpp-18 마지막 부분에 정리되어 있어요.",
      reasonEn: "std::priority_queue usage (max-heap default, how to make min-heap) is at the end of cpp-18." } },
  { id: "topologicalsort", title: "위상 정렬",       titleEn: "Topological Sort",icon: "📐", category: "그래프 (Gold)",       categoryEn: "Graph (Gold)",            wave: 3, lessonId: "algo-topologicalsort" },
  { id: "shortestpath", title: "최단 경로",          titleEn: "Shortest Path",   icon: "🗺️", category: "그래프 (Gold)",       categoryEn: "Graph (Gold)",            wave: 3, lessonId: "algo-shortestpath",
    prerequisite: { lessonId: "cpp-18", title: "stack & queue (priority_queue 포함)",
      reason: "BFS 최단거리는 queue, 다익스트라는 priority_queue. cpp-18 빠르게 훑고 오면 헷갈림 줄어요.",
      reasonEn: "BFS shortest path uses a queue; Dijkstra needs priority_queue. A quick skim of cpp-18 cuts down confusion." } },
  { id: "divideconquer",title: "분할 정복",          titleEn: "Divide & Conquer",icon: "✂️", category: "기법 (Gold)",         categoryEn: "Technique (Gold)",        wave: 3, lessonId: "algo-divideconquer" },
  { id: "bitmanipulation", title: "비트 조작",       titleEn: "Bit Manipulation",icon: "⚙️", category: "기법 (Gold+)",        categoryEn: "Technique (Gold+)",       wave: 3, lessonId: "algo-bitmanipulation" },
  { id: "trie",         title: "트라이",             titleEn: "Trie",            icon: "🌐", category: "자료구조 (Gold+)",    categoryEn: "Data Structures (Gold+)", wave: 3, lessonId: "algo-trie" },
]

export const ALGO_TOPIC_MAP = Object.fromEntries(ALGO_TOPICS.map(t => [t.id, t]))
