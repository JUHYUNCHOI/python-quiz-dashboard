// USACO Guide — Bronze 토픽별 문제 목록 (2026-06-29 수집)
// 출처: github.com/cpinitiative/usaco-guide content/2_Bronze/*.problems.json
// 용도: "토픽 × 난이도" 필터 + "개념 ↔ 문제" 짝짓기의 데이터 원천.
//   - 문제 *문장*은 담지 않음. 공개 링크(usaco.org 등)로 연결만.
//   - questId: 우리 quest-problems/<id> 와 cpid 로 매칭된 것 (있으면).
// ⚠️ 데이터 전용 — UI/배치 결정 전. learning_ladder / quest-meta 와 연결 예정.

export type UsacoDifficulty = "Very Easy" | "Easy" | "Normal" | "Hard" | "Very Hard";

// USACO Guide Bronze 13개 모듈 중 '문제 목록이 있는' 토픽
export type BronzeTopicId =
  | "complete-search"   // 완전탐색 (기본)
  | "complete-rec"      // 재귀 완전탐색 (부분집합/순열/백트래킹)
  | "simulation"        // 시뮬레이션
  | "sorting"           // 정렬
  | "sets"              // 집합 & 맵
  | "casework"          // 경우의 수
  | "greedy"            // 그리디
  | "graphs"            // 그래프
  | "rect-geo"          // 직사각형 기하
  | "ad-hoc";           // 애드혹

export const BRONZE_TOPIC_LABEL: Record<BronzeTopicId, string> = {
  "complete-search": "완전탐색",
  "complete-rec": "재귀 완전탐색",
  "simulation": "시뮬레이션",
  "sorting": "정렬",
  "sets": "집합 & 맵",
  "casework": "경우의 수",
  "greedy": "그리디",
  "graphs": "그래프",
  "rect-geo": "직사각형 기하",
  "ad-hoc": "애드혹",
};

export interface UsacoBronzeProblem {
  topic: BronzeTopicId;
  name: string;
  source: string;            // "USACO Bronze" | "USACO Silver" | "CSES" | "CF" | "AC" | "CCC" | "HackerRank" | "YS"
  difficulty: UsacoDifficulty;
  cpid?: number;             // USACO 공식 문제 id (usaco.org viewproblem2&cpid=)
  url: string;
  questId?: string;          // 우리 quest-problems/<id> (cpid 매칭)
}

export const USACO_BRONZE_PROBLEMS: UsacoBronzeProblem[] = [
  // ── 완전탐색 (Basic Complete Search) ───────────────────────────
  { topic: "complete-search", name: "Maximum Distance", source: "CF", difficulty: "Easy", url: "https://codeforces.com/gym/102951/problem/A" },
  { topic: "complete-search", name: "Milk Pails", source: "USACO Bronze", difficulty: "Easy", cpid: 615, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=615" },
  { topic: "complete-search", name: "Diamond Collector", source: "USACO Bronze", difficulty: "Easy", cpid: 639, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=639" },
  { topic: "complete-search", name: "Daisy Chains", source: "USACO Bronze", difficulty: "Easy", cpid: 1060, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1060" },
  { topic: "complete-search", name: "Counting Liars", source: "USACO Bronze", difficulty: "Normal", cpid: 1228, url: "http://usaco.org/index.php?page=viewproblem2&cpid=1228" },
  { topic: "complete-search", name: "Cow Gymnastics", source: "USACO Bronze", difficulty: "Normal", cpid: 963, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=963" },
  { topic: "complete-search", name: "Bovine Genomics", source: "USACO Bronze", difficulty: "Normal", cpid: 736, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=736" },
  { topic: "complete-search", name: "Triangles", source: "USACO Bronze", difficulty: "Normal", cpid: 1011, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1011" },
  { topic: "complete-search", name: "Lifeguards", source: "USACO Bronze", difficulty: "Normal", cpid: 784, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=784" },
  { topic: "complete-search", name: "Why Did the Cow Cross the Road II", source: "USACO Bronze", difficulty: "Normal", cpid: 712, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=712" },
  { topic: "complete-search", name: "Guess the Animal", source: "USACO Bronze", difficulty: "Hard", cpid: 893, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=893" },
  { topic: "complete-search", name: "Bovine Genomics (Silver)", source: "USACO Silver", difficulty: "Hard", cpid: 739, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=739" },
  { topic: "complete-search", name: "Load Balancing", source: "USACO Bronze", difficulty: "Hard", cpid: 617, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=617" },
  { topic: "complete-search", name: "Sleeping in Class", source: "USACO Bronze", difficulty: "Hard", cpid: 1203, url: "http://usaco.org/index.php?page=viewproblem2&cpid=1203" },
  { topic: "complete-search", name: "Cow Checkups", source: "USACO Bronze", difficulty: "Hard", cpid: 1469, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1469", questId: "checkups" },
  { topic: "complete-search", name: "Contaminated Milk", source: "USACO Bronze", difficulty: "Very Hard", cpid: 569, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=569" },
  { topic: "complete-search", name: "Cowntact Tracing", source: "USACO Bronze", difficulty: "Very Hard", cpid: 1037, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1037" },
  { topic: "complete-search", name: "Bull in a China Shop", source: "USACO Bronze", difficulty: "Very Hard", cpid: 640, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=640" },
  { topic: "complete-search", name: "Load Balancing (Silver)", source: "USACO Silver", difficulty: "Very Hard", cpid: 619, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=619" },
  { topic: "complete-search", name: "Moo Language", source: "USACO Bronze", difficulty: "Very Hard", cpid: 1324, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1324" },

  // ── 재귀 완전탐색 (Complete Search with Recursion) ──────────────
  { topic: "complete-rec", name: "Apple Division", source: "CSES", difficulty: "Easy", url: "https://cses.fi/problemset/task/1623" },
  { topic: "complete-rec", name: "Creating Strings I", source: "CSES", difficulty: "Easy", url: "https://cses.fi/problemset/task/1622" },
  { topic: "complete-rec", name: "Chessboard & Queens", source: "CSES", difficulty: "Normal", url: "https://cses.fi/problemset/task/1624" },
  { topic: "complete-rec", name: "Air Cownditioning II", source: "USACO Bronze", difficulty: "Normal", cpid: 1276, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1276" },
  { topic: "complete-rec", name: "Livestock Lineup", source: "USACO Bronze", difficulty: "Normal", cpid: 965, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=965" },
  { topic: "complete-rec", name: "Back and Forth", source: "USACO Bronze", difficulty: "Normal", cpid: 857, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=857" },
  { topic: "complete-rec", name: "Twenty-four", source: "CCC", difficulty: "Normal", url: "https://dmoj.ca/problem/ccc08s4" },
  { topic: "complete-rec", name: "Beautiful Permutation II", source: "CSES", difficulty: "Normal", url: "https://cses.fi/problemset/task/3175" },
  { topic: "complete-rec", name: "Three Logos", source: "CF", difficulty: "Hard", url: "https://codeforces.com/problemset/problem/581/D" },
  { topic: "complete-rec", name: "Printing Sequences", source: "USACO Bronze", difficulty: "Very Hard", cpid: 1493, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1493", questId: "printseq" },

  // ── 시뮬레이션 (Simulation) ────────────────────────────────────
  { topic: "simulation", name: "Shell Game", source: "USACO Bronze", difficulty: "Easy", cpid: 891, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=891" },
  { topic: "simulation", name: "Mixing Milk", source: "USACO Bronze", difficulty: "Easy", cpid: 855, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=855" },
  { topic: "simulation", name: "The Cow-Signal", source: "USACO Bronze", difficulty: "Easy", cpid: 665, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=665" },
  { topic: "simulation", name: "Speeding Ticket", source: "USACO Bronze", difficulty: "Easy", cpid: 568, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=568" },
  { topic: "simulation", name: "The Lost Cow", source: "USACO Bronze", difficulty: "Easy", cpid: 735, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=735" },
  { topic: "simulation", name: "The Bovine Shuffle", source: "USACO Bronze", difficulty: "Easy", cpid: 760, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=760" },
  { topic: "simulation", name: "The Bucket List", source: "USACO Bronze", difficulty: "Easy", cpid: 856, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=856" },
  { topic: "simulation", name: "Measuring Traffic", source: "USACO Bronze", difficulty: "Normal", cpid: 917, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=917" },
  { topic: "simulation", name: "Circular Barn", source: "USACO Bronze", difficulty: "Normal", cpid: 616, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=616" },
  { topic: "simulation", name: "Block Game", source: "USACO Bronze", difficulty: "Normal", cpid: 664, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=664" },
  { topic: "simulation", name: "Team Tic Tac Toe", source: "USACO Bronze", difficulty: "Normal", cpid: 831, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=831" },
  { topic: "simulation", name: "Mowing the Field", source: "USACO Bronze", difficulty: "Normal", cpid: 593, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=593" },
  { topic: "simulation", name: "Reflection", source: "USACO Bronze", difficulty: "Normal", cpid: 1491, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1491", questId: "reflection" },
  { topic: "simulation", name: "Censoring", source: "USACO Bronze", difficulty: "Hard", cpid: 526, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=526" },
  { topic: "simulation", name: "Milk Measurement", source: "USACO Bronze", difficulty: "Hard", cpid: 761, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=761" },
  { topic: "simulation", name: "Stuck in a Rut", source: "USACO Bronze", difficulty: "Very Hard", cpid: 1061, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1061" },

  // ── 정렬 (Intro to Sorting) ────────────────────────────────────
  { topic: "sorting", name: "Bubble Sort", source: "HackerRank", difficulty: "Very Easy", url: "https://www.hackerrank.com/challenges/ctci-bubble-sort/problem" },
  { topic: "sorting", name: "Distinct Numbers", source: "CSES", difficulty: "Easy", url: "https://cses.fi/problemset/task/1621" },
  { topic: "sorting", name: "Playing in a Casino", source: "CF", difficulty: "Easy", url: "https://codeforces.com/contest/1808/problem/B" },
  { topic: "sorting", name: "Kayaking", source: "CF", difficulty: "Normal", url: "https://codeforces.com/contest/863/problem/B" },
  { topic: "sorting", name: "Why Did the Cow Cross the Road III", source: "USACO Bronze", difficulty: "Normal", cpid: 713, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=713" },
  { topic: "sorting", name: "Cow College", source: "USACO Bronze", difficulty: "Normal", cpid: 1251, url: "http://usaco.org/index.php?page=viewproblem2&cpid=1251" },
  { topic: "sorting", name: "Angry Cows", source: "USACO Bronze", difficulty: "Hard", cpid: 592, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=592" },
  { topic: "sorting", name: "Permutator", source: "CF", difficulty: "Hard", url: "https://codeforces.com/gym/104520/problem/H" },

  // ── 집합 & 맵 (Intro to Sets & Maps) ───────────────────────────
  { topic: "sets", name: "Distinct Numbers", source: "CSES", difficulty: "Easy", url: "https://cses.fi/problemset/task/1621" },
  { topic: "sets", name: "Associative Array", source: "YS", difficulty: "Easy", url: "https://judge.yosupo.jp/problem/associative_array" },
  { topic: "sets", name: "Sum of Two Values", source: "CSES", difficulty: "Easy", url: "https://cses.fi/problemset/task/1640" },
  { topic: "sets", name: "Where Am I?", source: "USACO Bronze", difficulty: "Easy", cpid: 964, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=964" },
  { topic: "sets", name: "Team Tic Tac Toe", source: "USACO Bronze", difficulty: "Normal", cpid: 831, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=831" },
  { topic: "sets", name: "Year of the Cow", source: "USACO Bronze", difficulty: "Normal", cpid: 1107, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1107" },
  { topic: "sets", name: "Don't Be Last!", source: "USACO Bronze", difficulty: "Normal", cpid: 687, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=687" },
  { topic: "sets", name: "It's Mooin' Time II", source: "USACO Bronze", difficulty: "Normal", cpid: 1468, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1468", questId: "mooin2" },
  { topic: "sets", name: "Cities & States", source: "USACO Silver", difficulty: "Normal", cpid: 667, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=667" },
  { topic: "sets", name: "Jury Marks", source: "CF", difficulty: "Normal", url: "https://codeforces.com/contest/831/problem/C" },
  { topic: "sets", name: "It's Mooin' Time", source: "USACO Bronze", difficulty: "Hard", cpid: 1445, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1445" },
  { topic: "sets", name: "Made Up", source: "AC", difficulty: "Hard", url: "https://atcoder.jp/contests/abc202/tasks/abc202_c?lang=en" },
  { topic: "sets", name: "Into Blocks", source: "CF", difficulty: "Hard", url: "https://codeforces.com/contest/1209/problem/G1" },

  // ── 경우의 수 (Casework) ───────────────────────────────────────
  { topic: "casework", name: "Sleepy Cow Herding", source: "USACO Bronze", difficulty: "Normal", cpid: 915, url: "https://usaco.org/index.php?page=viewproblem2&cpid=915" },
  { topic: "casework", name: "Three Logos", source: "CF", difficulty: "Easy", url: "https://codeforces.com/problemset/problem/581/D" },
  { topic: "casework", name: "Fence Painting", source: "USACO Bronze", difficulty: "Normal", cpid: 567, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=567" },
  { topic: "casework", name: "Social Distancing I", source: "USACO Bronze", difficulty: "Normal", cpid: 1035, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1035" },
  { topic: "casework", name: "Hoof Paper Scissors Minus One", source: "USACO Bronze", difficulty: "Normal", cpid: 1515, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1515", questId: "hps" },
  { topic: "casework", name: "Leaders", source: "USACO Bronze", difficulty: "Hard", cpid: 1275, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1275" },

  // ── 그리디 (Intro to Greedy) ───────────────────────────────────
  { topic: "greedy", name: "Mad Scientist", source: "USACO Bronze", difficulty: "Easy", cpid: 1012, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1012" },
  { topic: "greedy", name: "Watching Mooloo", source: "USACO Bronze", difficulty: "Easy", cpid: 1301, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1301" },
  { topic: "greedy", name: "Cow Tipping", source: "USACO Bronze", difficulty: "Normal", cpid: 689, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=689" },
  { topic: "greedy", name: "Even More Odd Photos", source: "USACO Bronze", difficulty: "Normal", cpid: 1084, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1084" },
  { topic: "greedy", name: "Out of Place", source: "USACO Bronze", difficulty: "Normal", cpid: 785, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=785" },
  { topic: "greedy", name: "Astral Superposition", source: "USACO Bronze", difficulty: "Normal", cpid: 1467, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1467", questId: "astral" },
  { topic: "greedy", name: "Purchasing Milk", source: "USACO Bronze", difficulty: "Normal", cpid: 1565, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1565" },
  { topic: "greedy", name: "Milking Order", source: "USACO Bronze", difficulty: "Hard", cpid: 832, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=832" },
  { topic: "greedy", name: "Photoshoot", source: "USACO Bronze", difficulty: "Hard", cpid: 1227, url: "http://usaco.org/index.php?page=viewproblem2&cpid=1227" },
  { topic: "greedy", name: "FEB", source: "USACO Bronze", difficulty: "Very Hard", cpid: 1323, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1323" },
  { topic: "greedy", name: "Race", source: "USACO Bronze", difficulty: "Very Hard", cpid: 989, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=989" },

  // ── 그래프 (Intro to Graphs) ───────────────────────────────────
  { topic: "graphs", name: "Livestock Lineup", source: "USACO Bronze", difficulty: "Hard", cpid: 965, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=965" },
  { topic: "graphs", name: "The Great Revegetation", source: "USACO Bronze", difficulty: "Hard", cpid: 916, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=916" },
  { topic: "graphs", name: "Milk Factory", source: "USACO Bronze", difficulty: "Hard", cpid: 940, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=940" },
  { topic: "graphs", name: "Hoofball", source: "USACO Bronze", difficulty: "Hard", cpid: 808, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=808" },
  { topic: "graphs", name: "Swapity Swap", source: "USACO Bronze", difficulty: "Hard", cpid: 1013, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1013" },
  { topic: "graphs", name: "Cow Evolution", source: "USACO Bronze", difficulty: "Very Hard", cpid: 941, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=941" },
  { topic: "graphs", name: "Family Tree", source: "USACO Bronze", difficulty: "Very Hard", cpid: 833, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=833" },

  // ── 직사각형 기하 (Rectangle Geometry) ─────────────────────────
  { topic: "rect-geo", name: "Fence Painting", source: "USACO Bronze", difficulty: "Easy", cpid: 567, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=567" },
  { topic: "rect-geo", name: "Square Pasture", source: "USACO Bronze", difficulty: "Easy", cpid: 663, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=663" },
  { topic: "rect-geo", name: "Blocked Billboard", source: "USACO Bronze", difficulty: "Normal", cpid: 759, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=759" },
  { topic: "rect-geo", name: "Blocked Billboard II", source: "USACO Bronze", difficulty: "Hard", cpid: 783, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=783" },
  { topic: "rect-geo", name: "White Sheet", source: "CF", difficulty: "Hard", url: "https://codeforces.com/contest/1216/problem/C" },
  { topic: "rect-geo", name: "Two Tables", source: "CF", difficulty: "Hard", url: "https://codeforces.com/problemset/problem/1555/B" },

  // ── 애드혹 (Ad Hoc) ────────────────────────────────────────────
  { topic: "ad-hoc", name: "Photoshoot 2", source: "USACO Bronze", difficulty: "Normal", cpid: 1204, url: "https://usaco.org/index.php?page=viewproblem2&cpid=1204" },
  { topic: "ad-hoc", name: "Promotion Counting", source: "USACO Bronze", difficulty: "Easy", cpid: 591, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=591" },
  { topic: "ad-hoc", name: "Sleepy Cow Sorting", source: "USACO Bronze", difficulty: "Hard", cpid: 892, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=892" },
  { topic: "ad-hoc", name: "Taming the Herd", source: "USACO Bronze", difficulty: "Hard", cpid: 809, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=809" },
  { topic: "ad-hoc", name: "Modern Art", source: "USACO Bronze", difficulty: "Hard", cpid: 737, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=737" },
  { topic: "ad-hoc", name: "Spaced Out", source: "USACO Silver", difficulty: "Very Hard", cpid: 1088, url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=1088" },
];
