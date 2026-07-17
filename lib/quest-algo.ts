// quest(문제) → 핵심 알고리즘 토픽 매핑 (2026-06-29, 서브에이전트 6배치 분류 + 자체 검증).
// 용도: quest 페이지에서 "🧠 이 문제 핵심: <알고리즘> 배우기 →" 링크 (/algo/<topic>/learn).
//  - 여기 없는 quest = 특정 알고리즘 없음(완전탐색/시뮬/애드혹) → 링크 안 띄움 (그게 정확).
//  - 토픽은 /algo/<topic>/learn 학습페이지가 있는 20개 중 하나.
//  ⚠️ 분류는 풀이 핵심 아이디어 기준(부수적 sort/map 은 무시). 애매하면 none(=미수록).

export const TOPIC_KO: Record<string, string> = {
  array: "배열",
  backtracking: "백트래킹",
  binarysearch: "이분 탐색",
  bitmanipulation: "비트 연산",
  divideconquer: "분할 정복",
  dp: "동적 계획법(DP)",
  graph: "그래프 (BFS/DFS)",
  greedy: "그리디",
  hashtable: "해시 (맵·집합)",
  prefixsum: "누적 합",
  priorityqueue: "우선순위 큐",
  slidingwindow: "슬라이딩 윈도우",   // /algo/slidingwindow/learn 만 있음. QUEST_ALGO 에선 아직 미사용 (Checkups 는 prefixsum). 진짜 슬라이딩 윈도우 문제 나오면 매핑.
  recursion: "재귀",
  shortestpath: "최단 경로",
  sorting: "정렬",
  stackqueue: "스택 & 큐",
  string: "문자열",
  topologicalsort: "위상 정렬",
  tree: "트리",
  trie: "트라이",
  unionfind: "유니온 파인드",
};

// questId → 핵심 알고리즘 토픽 (특정 알고리즘이 핵심인 문제만 수록)
export const QUEST_ALGO: Record<string, string> = {
  abcs: "sorting", acowdemia1: "binarysearch", aircond1: "prefixsum", alchemy: "recursion",
  astral: "greedy", bacteria: "prefixsum", bucketbrigade: "graph", bucketlist: "prefixsum",
  buymilk: "recursion", chipxchg: "binarysearch",
  // checkups: 제거 — center-expansion(대칭 증분)은 표준 알고 토픽 아님 (선생님 2026-07-02).
  cowcollege: "sorting", cowtipping: "greedy", crossroad1: "hashtable", crossroad3: "sorting",
  explodingarrow: "graph", familytree: "tree", favperm2: "backtracking", feedcows: "greedy",
  innovation: "greedy", interview: "priorityqueue", lc1480: "prefixsum", lc3: "hashtable",
  lc303: "prefixsum", lc560: "prefixsum", lc974: "prefixsum", livestock: "graph",
  magicorbs: "sorting", makedistinct: "sorting", mcc15bahasaf: "string", mcc15choco: "stackqueue",
  mcc15rect: "bitmanipulation", mcc19bakery: "greedy", mcc19ditcoin: "greedy", mcc19rect: "sorting",
  mcc19rect2: "bitmanipulation", mcc20cipher: "hashtable", mcc20citytour: "graph", mcc20kitty: "dp",
  mcc20knight: "graph", mcc20missing: "hashtable", mcc20zigzag: "dp", mcc21marbles: "prefixsum",
  mcc21menu: "tree", mcc22cardshark: "sorting", mcc22grammar: "graph", mcc22lamp: "prefixsum",
  mcc22maze: "graph", mco15honey: "greedy", mco15secret: "string", mco15trains: "shortestpath",
  milkfactory: "graph", milkorder: "topologicalsort",
  moo: "string", moohunt: "bitmanipulation", mooin2: "prefixsum", mooin3: "binarysearch",
  moolang: "greedy", mooloo: "greedy", palindrome: "dp", photoshoot: "greedy", photoshoot2: "greedy",
  printseq: "dp", productivity: "binarysearch", reach: "shortestpath", revegetation: "greedy",
  reverseeng: "greedy", sleepclass: "greedy", sleepysort: "greedy", socialdist1: "binarysearch",
  stalling: "sorting", subseqmedian: "dp", swaptowin: "greedy", tameherd: "dp",
  triangles: "hashtable", tricks: "hashtable", walkfence: "prefixsum", walkhome: "dp",
  whereami: "hashtable", word: "greedy",
};

export const TOPIC_EN: Record<string, string> = {
  array: "Arrays", backtracking: "Backtracking", binarysearch: "Binary Search",
  bitmanipulation: "Bit Manipulation", divideconquer: "Divide & Conquer", dp: "Dynamic Programming",
  graph: "Graphs (BFS/DFS)", greedy: "Greedy", hashtable: "Hashing (map/set)", prefixsum: "Prefix Sums",
  priorityqueue: "Priority Queue", recursion: "Recursion", shortestpath: "Shortest Path",
  slidingwindow: "Sliding Window",
  sorting: "Sorting", stackqueue: "Stack & Queue", string: "Strings", topologicalsort: "Topological Sort",
  tree: "Trees", trie: "Trie", unionfind: "Union-Find",
};

// quest 핵심 알고리즘 학습 정보 (없으면 null = 완전탐색 등, 링크 안 띄움)
export function questAlgo(id: string): { topic: string; ko: string; en: string; href: string } | null {
  const topic = QUEST_ALGO[id];
  if (!topic) return null;
  return { topic, ko: TOPIC_KO[topic] || topic, en: TOPIC_EN[topic] || topic, href: `/algo/${topic}/learn` };
}
