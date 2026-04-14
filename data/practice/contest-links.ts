/**
 * contest-links.ts
 *
 * Maps each Coding Bank cluster to related USACO/MCC competition problems
 * that students can tackle after completing the cluster.
 *
 * CodeQuest URL: https://codequest.coderin.app/?p=<problemId>
 */

export interface ContestProblem {
  /** CodeQuest problem ID — used to build the deep-link URL */
  id: string
  /** Short display title */
  title: string
  /** "USACO Bronze" | "MCC" */
  source: string
  /** "easy" | "medium" */
  difficulty: "easy" | "medium"
  /** One-line reason this problem fits the cluster */
  why: string
}

export interface ClusterContestLink {
  clusterId: string
  problems: ContestProblem[]
}

/** CodeQuest base URL */
export const CODEQUEST_BASE_URL = "https://codequest.coderin.app"

/** Returns the deep-link URL for a CodeQuest problem */
export function codeQuestUrl(problemId: string): string {
  return `${CODEQUEST_BASE_URL}/?p=${problemId}`
}

/**
 * Per-cluster contest problem recommendations.
 * Problems are ordered: easy ones first.
 */
export const CONTEST_LINKS: ClusterContestLink[] = [
  {
    clusterId: "bank-sim",
    problems: [
      {
        id: "crossroad1",
        title: "The Crossing (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Classic time-step simulation — track two cows crossing a road",
      },
      {
        id: "crossroad2",
        title: "The Crossing II (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Same simulation pattern with a small twist",
      },
      {
        id: "mixmilk",
        title: "Mix Milk (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Repeat-step simulation: pour milk between buckets until stable",
      },
      {
        id: "shellgame",
        title: "Shell Game (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Track objects through a sequence of swaps — pure simulation",
      },
      {
        id: "backforth",
        title: "Back and Forth (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Multi-step transfer simulation requiring careful state tracking",
      },
      {
        id: "mcc20kitty",
        title: "Kitty (MCC 2020)",
        source: "MCC",
        difficulty: "medium",
        why: "Simulation with conditional branching over multiple rounds",
      },
    ],
  },
  {
    clusterId: "bank-ds",
    problems: [
      {
        id: "sleepysort",
        title: "Sleepy Cow Sorting (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Count minimum moves to sort — sortingcluster core skill",
      },
      {
        id: "outofplace",
        title: "Out of Place (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Find the single out-of-order element using sorting logic",
      },
      {
        id: "comfycows",
        title: "Comfy Cows (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Sort + sweep: find the comfortable range for each cow",
      },
      {
        id: "mcc19elim",
        title: "Elimination (MCC 2019)",
        source: "MCC",
        difficulty: "medium",
        why: "Sort + greedy matching — exactly the multi-key sort pattern",
      },
    ],
  },
  {
    clusterId: "bank-bf",
    problems: [
      {
        id: "billboard",
        title: "Billboard (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Rectangle math — straightforward brute-force geometry",
      },
      {
        id: "hps17",
        title: "Cow HPS (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Count wins for each rock-paper-scissors choice — brute-force counting",
      },
      {
        id: "dontbelast",
        title: "Don't Be Last (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Brute-force simulation: try all possibilities to avoid being last",
      },
      {
        id: "teamttt",
        title: "Team Tic Tac Toe (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Enumerate all pairs — classic O(N²) brute-force over small N",
      },
      {
        id: "blockgame",
        title: "Block Game (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Check all reachable positions — brute-force state enumeration",
      },
    ],
  },
  {
    clusterId: "bank-str",
    problems: [
      {
        id: "bovgenomics",
        title: "Bovine Genomics (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Character-by-character string comparison — substring / string skills",
      },
      {
        id: "whereami",
        title: "Where Am I? (Bronze)",
        source: "USACO Bronze",
        difficulty: "easy",
        why: "Find minimum unique prefix length — direct string pattern matching",
      },
      {
        id: "moolang",
        title: "Moo Language (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Parse and decode a custom language — string parsing practice",
      },
      {
        id: "mcc19palindrome",
        title: "Palindrome (MCC 2019)",
        source: "MCC",
        difficulty: "medium",
        why: "Palindrome checking with constraints — string manipulation",
      },
    ],
  },
  {
    clusterId: "bank-grid",
    problems: [
      {
        id: "modernart",
        title: "Modern Art (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Grid coloring analysis — track which cells each color can reach",
      },
      {
        id: "stampgrid",
        title: "Stamp Grid (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "2D grid brute-force: check if stamps can cover a pattern",
      },
      {
        id: "cowtipping",
        title: "Cow Tipping (Bronze)",
        source: "USACO Bronze",
        difficulty: "medium",
        why: "Work backwards through a grid — classic grid simulation",
      },
      {
        id: "mcc15rect",
        title: "Rectangle (MCC 2015)",
        source: "MCC",
        difficulty: "medium",
        why: "Count valid rectangles in a grid — 2D array traversal",
      },
    ],
  },
]

/**
 * Returns the contest links for a given cluster ID, or null if none exist.
 */
export function getContestLinks(clusterId: string): ClusterContestLink | null {
  return CONTEST_LINKS.find(l => l.clusterId === clusterId) ?? null
}
