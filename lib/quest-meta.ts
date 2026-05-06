/**
 * Quest curated metadata — Phase 2 of redesign.
 *
 * Layered on top of ALL_PROBLEMS (in app/quest/[problemId]/data.ts),
 * which holds id/title/source/URL. This file adds the *pedagogical*
 * metadata that the curriculum graph and admin dashboard read:
 *
 *   - type:                template family this quest fits
 *   - concepts_taught:     concepts a student learns by completing it
 *   - concepts_required:   concepts that should be known beforehand
 *   - difficulty:          1 (easiest) — 5 (hardest), within Bronze
 *   - supported_languages: which solutions are verified to work
 *
 * Quests without an explicit entry fall back to DEFAULT_META — the
 * loader never throws, so we can fill in entries gradually as we
 * audit each quest. Adding/changing entries here is purely additive
 * and never affects student data.
 */

export type QuestTemplateType =
  | "brute-force"        // try all options; learn the search loop
  | "pattern-discovery"  // first idea fails; refine; correct formula
  | "algorithm-reveal"   // build up to the key insight + apply
  | "simulation";        // step-by-step trace of given rules

export type SupportedLang = "py" | "cpp";

/**
 * Release stage — Phase 5 of redesign.
 *
 * Lets us roll out major rewrites in 3 phases without surprising
 * existing students:
 *   - "internal": only teachers see it in the catalog. Students with
 *                 a direct URL still load (we just show a banner).
 *   - "beta":    visible to students who opted in via the
 *                "베타 quest 시도" toggle (useReleasePref).
 *   - "full":    visible to everyone (default — equivalent to old
 *                behavior).
 *
 * Default = "full" so adding the field is purely additive and never
 * hides an existing quest from students.
 */
export type ReleaseStage = "internal" | "beta" | "full";

export interface QuestConceptMeta {
  type: QuestTemplateType;
  concepts_taught: string[];
  concepts_required: string[];
  /** 1 (easiest) .. 5 (hardest), Bronze-relative. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Which languages have a verified, runnable solution. */
  supported_languages: SupportedLang[];
  /** Default "full" — see ReleaseStage. */
  release_stage?: ReleaseStage;
  /**
   * Phase 1: input/expected pairs for CI verification.
   *
   * When both `validate_io` and `solution_py` are set, the
   * `validate-solutions` script runs the Python solution with each
   * input on stdin and compares stdout (after rstrip) to expected.
   * Mismatches are reported as failures. Quests without both fields
   * are skipped — no harm to existing flow.
   */
  validate_io?: { input: string; expected: string }[];
  /**
   * Canonical Python reference solution. Kept small (Bronze-class)
   * so it can live alongside the meta entry. Not shown to students;
   * only used by CI. The visible solutions in App.jsx may use
   * different syntax for pedagogical clarity.
   */
  solution_py?: string;
}

const DEFAULT_META: QuestConceptMeta = {
  type: "simulation",
  concepts_taught: [],
  concepts_required: [],
  difficulty: 2,
  supported_languages: ["py", "cpp"],
  release_stage: "full",
};

/**
 * Concept ontology (registry of all valid concept tags).
 * Every concept used in QUEST_CONCEPT_META must be listed here.
 * The curriculum graph reads this to build the prereq DAG.
 *
 * Categories are lightweight grouping for the dashboard view —
 * not strict — concepts can be referenced cross-category.
 */
export const CONCEPT_ONTOLOGY = {
  // Foundation
  "loop": "for/while basics",
  "function-basics": "def / function definition",
  "recursion": "function calls itself",
  "list-basics": "Python list / C++ vector creation + push_back",
  "vector-basics": "C++ vector creation + push_back",
  "string-basics": "string indexing, length",
  "dict-basics": "Python dict / C++ map (cpp-16 only)",
  "set-basics": "Python set / C++ set for dedup membership",
  "math-basics": "+, -, *, %, abs",
  "io-basics": "input + output",

  // Counting & lookups
  "frequency-count": "Counter / freq map of array values",
  "peak-max-constraint": "constraint that one value must exceed others",
  "two-pointer": "left + right pointer scan",
  "prefix-sum": "running totals for range queries",
  "diff-array": "difference array trick",
  "sliding-window": "moving window sum / count",

  // Search
  "linear-search": "scan to find first/last match",
  "nested-loop-search": "double loop over (i, j)",
  "binary-search": "halving search on sorted data",
  "fix-middle": "fix one variable, optimize the others",
  "ternary-search": "unimodal search",

  // Sorting
  "sort-basics": "sort an array, then process",
  "custom-comparator": "sort by a custom key",
  "stable-sort": "preserve order of equal elements",

  // Combinatorics
  "permutation-enum": "enumerate all permutations of 1..N",
  "subset-enum": "enumerate all subsets of N items",
  "combination-count": "C(N, k) counting",
  "tuple-enum": "iterate over all 2-tuples / 3-tuples",

  // Strings
  "string-indexing": "char-by-char access with []",
  "string-search": "substring / pattern search",
  "char-counting": "letter frequency",

  // Game theory / brute force
  "exhaustive-pair": "try every pair (a, b) and check a property",
  "dismantle-rule": "Nhoj's deletion process (Open 2024 Bronze)",
  "game-theory-parity": "win/lose by parity",

  // Geometry / grid
  "grid-2d": "row × col grid traversal",
  "bounding-box": "min/max coords of points",
  "rectangle-overlap": "intersection / union of rectangles",
  "rotation": "rotate matrix or array",

  // Greedy / simulation
  "greedy-pick": "always take locally-best option",
  "event-sweep": "process events in time order",
  "simulation-step": "step through given rules until done",
  "interval-merge": "merge overlapping intervals",

  // Graph / state (for Silver+)
  "bfs-grid": "BFS on grid",
  "graph-component": "find connected components",
  "topological-order": "topological sort",
  "tree-traversal": "DFS through tree edges",
} as const;

export type ConceptId = keyof typeof CONCEPT_ONTOLOGY;

/**
 * Curated entries — fill in as we audit quests. Quests without an
 * entry use DEFAULT_META.
 */
export const QUEST_CONCEPT_META: Record<string, QuestConceptMeta> = {
  // ─── Deeply audited 4 (Phase 0/1 of content review) ──────────
  cowphotos: {
    type: "pattern-discovery",
    concepts_taught: ["frequency-count", "peak-max-constraint"],
    concepts_required: ["loop", "vector-basics"],
    difficulty: 2,
    supported_languages: ["py", "cpp"],
    // Phase 1: deferred CI runner — verified vs USACO Open 2025 Bronze #2.
    // Case 1 is the literal USACO sample (T=2). Case 2 is an extra
    // stress case with peak-freq > 1 (the formula's tricky branch).
    validate_io: [
      {
        input: "2\n4\n1 1 2 3\n4\n3 3 2 1\n",
        expected: "3\n1",
      },
      {
        input: "1\n5\n4 4 3 3 2\n",
        expected: "3",
      },
    ],
    // Fast I/O + Counter — O(N) per case (sum N ≤ 10⁶).
    // Earlier `h.count(v)` was O(N) per distinct value → O(N²) per case → TLE.
    solution_py: [
      "import sys",
      "from collections import Counter",
      "",
      "data = sys.stdin.buffer.read().split()",
      "idx = 0",
      "T = int(data[idx]); idx += 1",
      "for _ in range(T):",
      "    N = int(data[idx]); idx += 1",
      "    h = data[idx:idx+N]; idx += N",
      "    cnt = Counter(h)",
      "    M = max(cnt, key=int)",
      "    rings = sum(1 for v, c in cnt.items() if int(v) < int(M) and c >= 2)",
      "    print(2 * rings + 1)",
    ].join("\n"),
  },
  hps: {
    type: "brute-force",
    concepts_taught: ["exhaustive-pair", "string-indexing"],
    concepts_required: ["loop", "string-basics", "vector-basics"],
    difficulty: 2,
    supported_languages: ["py", "cpp"],
    // Phase 1: deferred CI runner — verified vs USACO Open 2025 Bronze #1.
    validate_io: [{
      input: "3 3\nD\nWD\nLWD\n1 2\n2 3\n1 1\n",
      expected: "0\n0\n5",
    }],
    solution_py: [
      "N, M = map(int, input().split())",
      "beats = [[False] * N for _ in range(N)]",
      "for i in range(N):",
      "    row = input().strip()",
      "    for j in range(i + 1):",
      "        if row[j] == 'W':",
      "            beats[i][j] = True",
      "        elif row[j] == 'L':",
      "            beats[j][i] = True",
      "for _ in range(M):",
      "    s1, s2 = map(int, input().split())",
      "    s1 -= 1",
      "    s2 -= 1",
      "    # Count cards that beat BOTH Elsie cards (the 'dominators')",
      "    dom = 0",
      "    for c in range(N):",
      "        if beats[c][s1] and beats[c][s2]:",
      "            dom += 1",
      "    # Bessie hands with at least one dominator: N^2 - (N - dom)^2",
      "    print(N * N - (N - dom) * (N - dom))",
    ].join("\n"),
  },
  mooin3: {
    type: "brute-force",
    concepts_taught: ["nested-loop-search", "fix-middle"],
    concepts_required: ["loop", "string-basics"],
    difficulty: 3,
    supported_languages: ["py", "cpp"],
    // Verified against USACO 2025 Open Bronze #3 official sample.
    validate_io: [
      {
        input: "12 5\nabcabbacabac\n1 12\n2 7\n4 8\n2 5\n3 10\n",
        expected: "28\n6\n1\n-1\n12",
      },
    ],
    // Full-credit solution: per-character precompute (first_diff, last_same)
    // + position lists; per query iterate 26 chars and pick best j near
    // midpoint. O(26·N + Q·26·log N).
    solution_py: [
      "import sys",
      "from bisect import bisect_left, bisect_right",
      "",
      "data = sys.stdin.buffer.read().split()",
      "p = 0",
      "N = int(data[p]); p += 1",
      "Q = int(data[p]); p += 1",
      "s = data[p].decode(); p += 1",
      "",
      "positions = [[] for _ in range(26)]",
      "for i, ch in enumerate(s):",
      "    positions[ord(ch) - 97].append(i)",
      "",
      "INF = N",
      "first_diff = [[INF] * (N + 1) for _ in range(26)]",
      "last_same = [[-1] * (N + 1) for _ in range(26)]",
      "for c in range(26):",
      "    ch = chr(c + 97)",
      "    nxt = INF",
      "    for i in range(N - 1, -1, -1):",
      "        if s[i] != ch: nxt = i",
      "        first_diff[c][i] = nxt",
      "    last = -1",
      "    for i in range(N):",
      "        if s[i] == ch: last = i",
      "        last_same[c][i] = last",
      "",
      "for _ in range(Q):",
      "    l = int(data[p]) - 1; p += 1",
      "    r = int(data[p]) - 1; p += 1",
      "    best = -1",
      "    for c in range(26):",
      "        i = first_diff[c][l]",
      "        if i >= r: continue",
      "        k = last_same[c][r]",
      "        if k <= i: continue",
      "        posc = positions[c]",
      "        lo = bisect_right(posc, i)",
      "        hi = bisect_left(posc, k)",
      "        if lo >= hi: continue",
      "        mid = (i + k) / 2",
      "        at = bisect_left(posc, mid, lo, hi)",
      "        cands = []",
      "        if at < hi: cands.append(posc[at])",
      "        if at - 1 >= lo: cands.append(posc[at - 1])",
      "        for j in cands:",
      "            v = (j - i) * (k - j)",
      "            if v > best: best = v",
      "    print(best)",
    ].join("\n"),
  },
  permutation: {
    type: "brute-force",
    concepts_taught: ["recursion", "permutation-enum", "dismantle-rule"],
    concepts_required: ["function-basics", "list-basics"],
    difficulty: 3,
    supported_languages: ["py", "cpp"],
  },
  favperm2: {
    // Re-export of permutation; same metadata
    type: "brute-force",
    concepts_taught: ["recursion", "permutation-enum", "dismantle-rule"],
    concepts_required: ["function-basics", "list-basics"],
    difficulty: 3,
    supported_languages: ["py", "cpp"],
  },

  // ─── Stub C++ quests — Python only is the verified path ──────
  // These quests have working Python but the C++ section is incomplete.
  // Marking supported_languages: ["py"] makes the language toggle's
  // Py choice the safe default for them.
  aircond:      { ...DEFAULT_META, supported_languages: ["py"] },
  aircond1:     { ...DEFAULT_META, supported_languages: ["py"] },
  alchemy:      { ...DEFAULT_META, supported_languages: ["py"] },
  madscientist: { ...DEFAULT_META, supported_languages: ["py"] },
  reach:        { ...DEFAULT_META, supported_languages: ["py"] },
  reverseeng:   { ...DEFAULT_META, supported_languages: ["py"] },
  socialdist2:  { ...DEFAULT_META, supported_languages: ["py"] },
  stuckinrut:   { ...DEFAULT_META, supported_languages: ["py"] },
  subseqmedian: { ...DEFAULT_META, supported_languages: ["py"] },
  tameherd:     { ...DEFAULT_META, supported_languages: ["py"] },

  // ─── py-cpp-mismatch quests — both run but disagree ──────────
  // Until C++ is verified to match Python, mark Python as the
  // trustworthy path so the language picker / curriculum graph
  // doesn't recommend C++ for these.
  acowdemia1:    { ...DEFAULT_META, type: "brute-force",       supported_languages: ["py"] },
  acowdemia2:    { ...DEFAULT_META, type: "pattern-discovery", supported_languages: ["py"] },
  acowdemia3:    { ...DEFAULT_META, type: "algorithm-reveal",  supported_languages: ["py"], difficulty: 3 },
  billboard2:    { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  blocks:        { ...DEFAULT_META, type: "brute-force",       supported_languages: ["py"] },
  cannonball:    { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  cowntrace:     { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  leaders:       { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  lifeguards:    { ...DEFAULT_META, type: "algorithm-reveal",  supported_languages: ["py"], difficulty: 3 },
  livestock:     { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  magicorbs:     { ...DEFAULT_META, type: "algorithm-reveal",  supported_languages: ["py"] },
  milkexchange:  { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  milkorder:     { ...DEFAULT_META, type: "algorithm-reveal",  supported_languages: ["py"], difficulty: 3 },
  photoshoot2:   { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },
  stampgrid:     { ...DEFAULT_META, type: "brute-force",       supported_languages: ["py"] },
  swapity:       { ...DEFAULT_META, type: "algorithm-reveal",  supported_languages: ["py"] },
  teleport:      { ...DEFAULT_META, type: "simulation",        supported_languages: ["py"] },

  // ─── Algorithm/logic bugs in BOTH languages — full review needed ───
  // Banner already warns. Mark difficulty hint but no language safe-list.
  bacteria:  { ...DEFAULT_META, type: "algorithm-reveal", difficulty: 2 },
  feedcows:  { ...DEFAULT_META, type: "algorithm-reveal", difficulty: 2 },
  hoofball:  { ...DEFAULT_META, type: "simulation",       difficulty: 3 },
  hps17:     { ...DEFAULT_META, type: "brute-force",      difficulty: 3 },
  race:      { ...DEFAULT_META, type: "algorithm-reveal", difficulty: 3 },
  sumk:      { ...DEFAULT_META, type: "brute-force",      difficulty: 2 },
};

export function getQuestMeta(id: string): QuestConceptMeta {
  return QUEST_CONCEPT_META[id] ?? DEFAULT_META;
}

/** Convenience: is a language verified-supported for this quest? */
export function isLangSupported(id: string, lang: SupportedLang): boolean {
  return getQuestMeta(id).supported_languages.includes(lang);
}

/** Release stage — defaults to "full" for any quest without an entry. */
export function getReleaseStage(id: string): ReleaseStage {
  return getQuestMeta(id).release_stage ?? "full";
}

/**
 * Should this quest appear in the catalog for a given viewer?
 *
 *   - Teachers see EVERY quest (internal/beta/full).
 *   - Beta-opt-in students see beta + full.
 *   - Default students see only full.
 *
 * Direct quest URLs are NOT blocked — the quest page renders as
 * usual and a banner explains the stage. This keeps the door open
 * for sharing draft links with specific students.
 */
export function isVisibleInCatalog(
  id: string,
  viewer: { isTeacher: boolean; betaOptIn: boolean }
): boolean {
  const stage = getReleaseStage(id);
  if (stage === "full") return true;
  if (viewer.isTeacher) return true;
  if (stage === "beta") return viewer.betaOptIn;
  return false; // internal — students don't see it
}

/** Stats for admin dashboard. */
export function getMetaCoverageStats() {
  const curated = Object.keys(QUEST_CONCEPT_META).length;
  const byType = Object.values(QUEST_CONCEPT_META).reduce<Record<string, number>>(
    (acc, m) => ((acc[m.type] = (acc[m.type] ?? 0) + 1), acc),
    {}
  );
  const conceptsUsed = new Set<string>();
  for (const m of Object.values(QUEST_CONCEPT_META)) {
    m.concepts_taught.forEach((c) => conceptsUsed.add(c));
    m.concepts_required.forEach((c) => conceptsUsed.add(c));
  }
  const solutionVerified = Object.values(QUEST_CONCEPT_META).filter(
    (m) => m.validate_io && m.validate_io.length > 0 && m.solution_py
  ).length;
  return {
    curated,
    byType,
    conceptsUsed: conceptsUsed.size,
    totalConceptsInOntology: Object.keys(CONCEPT_ONTOLOGY).length,
    solutionVerified,
  };
}
