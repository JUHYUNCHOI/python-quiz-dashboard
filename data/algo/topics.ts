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
}

export const ALGO_TOPICS: AlgoTopic[] = [
  // ── Wave 1 — Bronze ────────────────────────────────────────────────────────
  // 가장 기본적인 자료구조와 기법. 배열→정렬→스택/큐→해시→누적합→문자열 순으로
  // 각 토픽이 이전 토픽을 자연스럽게 활용하도록 배치.
  { id: "array",        title: "배열",           titleEn: "Array",           icon: "📊", category: "기초 (Bronze)",       categoryEn: "Basics (Bronze)",         wave: 1, lessonId: "algo-array" },
  { id: "sorting",      title: "정렬",            titleEn: "Sorting",         icon: "🔢", category: "기초 (Bronze)",       categoryEn: "Basics (Bronze)",         wave: 1, lessonId: "algo-sorting" },
  { id: "stackqueue",   title: "스택/큐",          titleEn: "Stack & Queue",   icon: "📚", category: "자료구조 (Bronze)",   categoryEn: "Data Structures (Bronze)",wave: 1, lessonId: "algo-stackqueue" },
  { id: "hashtable",    title: "해시테이블",        titleEn: "Hash Table",      icon: "🗂️", category: "자료구조 (Bronze~Silver)", categoryEn: "Data Structures (Bronze~Silver)", wave: 1, lessonId: "algo-hashtable" },
  { id: "prefixsum",    title: "누적합",           titleEn: "Prefix Sum",      icon: "➕", category: "기법 (Bronze~Silver)", categoryEn: "Technique (Bronze~Silver)", wave: 1, lessonId: "algo-prefixsum" },
  { id: "string",       title: "문자열",           titleEn: "String",          icon: "🔤", category: "기초 (Bronze~Silver)", categoryEn: "Basics (Bronze~Silver)",  wave: 1, lessonId: "algo-string" },

  // ── Wave 2 — Silver ────────────────────────────────────────────────────────
  // Recursion을 가장 먼저 — Graph(DFS), DP, Backtracking 모두 재귀가 기반.
  // DP를 마지막으로 — Silver에서 가장 어렵고 수학적 사고가 필요.
  { id: "recursion",    title: "재귀",             titleEn: "Recursion",       icon: "🔄", category: "기법 (Silver)",       categoryEn: "Technique (Silver)",      wave: 2, lessonId: "algo-recursion" },
  { id: "binarysearch", title: "이분탐색",          titleEn: "Binary Search",   icon: "🎯", category: "탐색 (Silver)",       categoryEn: "Search (Silver)",         wave: 2, lessonId: "algo-binarysearch" },
  { id: "greedy",       title: "그리디",            titleEn: "Greedy",          icon: "💡", category: "기법 (Silver)",       categoryEn: "Technique (Silver)",      wave: 2, lessonId: "algo-greedy" },
  { id: "graph",        title: "그래프 (BFS/DFS)",  titleEn: "Graph (BFS/DFS)", icon: "🕸️", category: "그래프 (Silver)",     categoryEn: "Graph (Silver)",          wave: 2, lessonId: "algo-graph" },
  { id: "unionfind",    title: "유니온 파인드",      titleEn: "Union Find",      icon: "🔵", category: "자료구조 (Silver)",   categoryEn: "Data Structures (Silver)", wave: 2, lessonId: "algo-unionfind" },
  { id: "dp",           title: "동적 프로그래밍",    titleEn: "Dynamic Programming", icon: "🧩", category: "기법 (Silver~Gold)", categoryEn: "Technique (Silver~Gold)", wave: 2, lessonId: "algo-dp" },

  // ── Wave 3 — Gold+ ────────────────────────────────────────────────────────
  // Graph/DP를 기반으로 하는 심화 토픽들. 난이도 순으로 배치.
  { id: "backtracking", title: "백트래킹",          titleEn: "Backtracking",    icon: "↩️", category: "기법 (Gold)",         categoryEn: "Technique (Gold)",        wave: 3, lessonId: "algo-backtracking" },
  { id: "tree",         title: "트리",              titleEn: "Tree",            icon: "🌳", category: "자료구조 (Gold)",     categoryEn: "Data Structures (Gold)",  wave: 3, lessonId: "algo-tree" },
  { id: "priorityqueue",title: "우선순위 큐",        titleEn: "Priority Queue",  icon: "⚡", category: "자료구조 (Gold)",     categoryEn: "Data Structures (Gold)",  wave: 3, lessonId: "algo-priorityqueue" },
  { id: "topologicalsort", title: "위상 정렬",       titleEn: "Topological Sort",icon: "📐", category: "그래프 (Gold)",       categoryEn: "Graph (Gold)",            wave: 3, lessonId: "algo-topologicalsort" },
  { id: "shortestpath", title: "최단 경로",          titleEn: "Shortest Path",   icon: "🗺️", category: "그래프 (Gold)",       categoryEn: "Graph (Gold)",            wave: 3, lessonId: "algo-shortestpath" },
  { id: "divideconquer",title: "분할 정복",          titleEn: "Divide & Conquer",icon: "✂️", category: "기법 (Gold)",         categoryEn: "Technique (Gold)",        wave: 3, lessonId: "algo-divideconquer" },
  { id: "bitmanipulation", title: "비트 조작",       titleEn: "Bit Manipulation",icon: "⚙️", category: "기법 (Gold+)",        categoryEn: "Technique (Gold+)",       wave: 3, lessonId: "algo-bitmanipulation" },
  { id: "trie",         title: "트라이",             titleEn: "Trie",            icon: "🌐", category: "자료구조 (Gold+)",    categoryEn: "Data Structures (Gold+)", wave: 3, lessonId: "algo-trie" },
]

export const ALGO_TOPIC_MAP = Object.fromEntries(ALGO_TOPICS.map(t => [t.id, t]))
