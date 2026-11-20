/**
 * 문제 목록의 배지 어휘 — 주제·언어·난이도의 표시명과 색.
 *
 * 같은 표가 `app/course/ladder/page.tsx` 에 박혀 있었다. 티어 화면이 같은
 * 배지를 쓰면서 두 벌이 되면 주제 색이 화면마다 달라진다 — 학생은 "파란 배지"
 * 로 주제를 기억하므로 색이 흔들리면 배지가 쓸모를 잃는다. 그래서 여기 하나만 둔다.
 *
 * (`app/course/next/page.tsx` 와 `lib/quest-algo.ts` 에도 사본이 남아 있다.
 *  그쪽은 이번 작업 범위가 아니라 건드리지 않았다.)
 */

export const TOPIC_KO: Record<string, string> = {
  sorting: "정렬", array: "배열", hashtable: "해시", prefixsum: "누적합",
  string: "문자열", stackqueue: "스택/큐", greedy: "그리디", backtracking: "완전탐색",
  binarysearch: "이분탐색", bitmanipulation: "비트", divideconquer: "분할정복", dp: "DP",
  graph: "그래프", priorityqueue: "우선순위큐", recursion: "재귀", shortestpath: "최단경로",
  topologicalsort: "위상정렬", tree: "트리", trie: "트라이", unionfind: "유니온파인드",
  simulation: "시뮬레이션", grid: "그리드", math: "수학", syntax: "문법",
}

export const TOPIC_EN: Record<string, string> = {
  sorting: "Sorting", array: "Array", hashtable: "Hash", prefixsum: "Prefix Sum",
  string: "String", stackqueue: "Stack/Queue", greedy: "Greedy", backtracking: "Brute Force",
  binarysearch: "Binary Search", bitmanipulation: "Bitmask", divideconquer: "Divide & Conquer", dp: "DP",
  graph: "Graph", priorityqueue: "Priority Queue", recursion: "Recursion", shortestpath: "Shortest Path",
  topologicalsort: "Topological Sort", tree: "Tree", trie: "Trie", unionfind: "Union-Find",
  simulation: "Simulation", grid: "Grid", math: "Math", syntax: "Syntax",
}

export const TOPIC_COLOR: Record<string, string> = {
  sorting: "#0284c7", array: "#7c3aed", hashtable: "#db2777", prefixsum: "#0e7490",
  string: "#16a34a", stackqueue: "#ea580c", greedy: "#ca8a04", backtracking: "#dc2626",
  binarysearch: "#2563eb", bitmanipulation: "#475569", divideconquer: "#9333ea", dp: "#c026d3",
  graph: "#0d9488", priorityqueue: "#e11d48", recursion: "#65a30d", shortestpath: "#0891b2",
  topologicalsort: "#4f46e5", tree: "#15803d", trie: "#b45309", unionfind: "#be123c",
  simulation: "#0369a1", grid: "#7e22ce", math: "#0f766e", syntax: "#64748b",
}

/** 배경색 밝기에 따라 글자색(흰/검) 자동 — 작은 배지 대비 확보 (WCAG) */
export function textOn(bg: string): string {
  const h = bg.replace("#", "")
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#1e293b" : "#fff"
}

export function topicLabel(topic: string, lang: string): string {
  return lang === "en" ? (TOPIC_EN[topic] ?? topic) : (TOPIC_KO[topic] ?? topic)
}

// ── 난이도 ─────────────────────────────────────────────────────────────────
// `LadderItem.diff` 는 한국어 문자열("쉬움"|"보통"|"어려움")이 그대로 들어 있다.
// 색은 LeetCode 의 Easy/Medium/Hard 와 같게 맞췄다 — 학생이 이미 아는 신호다.

export const DIFFS = ["쉬움", "보통", "어려움"] as const
export type DiffKey = (typeof DIFFS)[number]

const DIFF_META: Record<string, { en: string; color: string }> = {
  "쉬움": { en: "Easy", color: "#00875a" },
  "보통": { en: "Medium", color: "#b45309" },
  "어려움": { en: "Hard", color: "#be123c" },
}

export function diffLabel(diff: string | undefined, lang: string): string | null {
  if (!diff) return null
  const m = DIFF_META[diff]
  if (!m) return diff
  return lang === "en" ? m.en : diff
}

export function diffColor(diff: string | undefined): string {
  return (diff && DIFF_META[diff]?.color) || "#64748b"
}

// ── 언어 ───────────────────────────────────────────────────────────────────
// 티어 풀에는 C++ 전용 문제와 Python 전용 문제가 섞여 있다 (실측 브론즈II:
// cpp 42 / py 34). 섞인 걸 걸러내면 마스터·그랜드마스터가 0개가 되어 승급이
// 불가능해지므로, 걸러내는 대신 **배지로 보이게** 하고 필터를 준다.

const LANG_META: Record<string, { label: string; color: string }> = {
  cpp: { label: "C++", color: "#1e40af" },
  py: { label: "Python", color: "#0f766e" },
  python: { label: "Python", color: "#0f766e" },
}

export function langLabel(lang: string | undefined): string | null {
  return (lang && LANG_META[lang]?.label) || null
}

export function langColor(lang: string | undefined): string {
  return (lang && LANG_META[lang]?.color) || "#64748b"
}
