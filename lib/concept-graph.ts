/**
 * Concept graph — Phase 6 of redesign.
 *
 * Derives a curriculum DAG from QUEST_CONCEPT_META. The graph treats
 * each concept (e.g. "frequency-count", "two-pointer") as a node and
 * uses the per-quest required/taught lists to produce two views:
 *
 *   - concept → quests that TEACH it
 *   - concept → quests that REQUIRE it
 *
 * From a student's set of completed quests we can compute:
 *   1. The concepts they have mastered (union of taught lists).
 *   2. The quests whose required concepts are all covered → ready
 *      to attempt.
 *   3. The next concept that unlocks the most quests → suggested
 *      "study this next."
 *
 * Pure data transformation, no React. Consumed by the curriculum
 * graph admin view AND by the student catalog for "ready to try"
 * highlights.
 */

import { CONCEPT_ONTOLOGY, QUEST_CONCEPT_META, getQuestMeta, type ConceptId } from "./quest-meta";

export interface ConceptNode {
  id: string; // ConceptId, but stored as string for serialization
  label: string;
  /** Quest IDs whose meta lists this concept under concepts_taught. */
  taughtBy: string[];
  /** Quest IDs whose meta lists this concept under concepts_required. */
  requiredBy: string[];
}

let _cachedGraph: ReadonlyMap<string, ConceptNode> | null = null;

/**
 * Build (or return cached) concept node map. The data is read-only
 * after construction so caching is safe even across hot-reloads.
 */
export function getConceptGraph(): ReadonlyMap<string, ConceptNode> {
  if (_cachedGraph) return _cachedGraph;
  const map = new Map<string, ConceptNode>();
  // Seed every ontology concept so isolated nodes still appear in the view
  for (const [id, label] of Object.entries(CONCEPT_ONTOLOGY)) {
    map.set(id, { id, label, taughtBy: [], requiredBy: [] });
  }
  // Walk every curated quest meta entry
  for (const [questId, meta] of Object.entries(QUEST_CONCEPT_META)) {
    for (const c of meta.concepts_taught) {
      const node = map.get(c) ?? { id: c, label: c, taughtBy: [], requiredBy: [] };
      node.taughtBy.push(questId);
      map.set(c, node);
    }
    for (const c of meta.concepts_required) {
      const node = map.get(c) ?? { id: c, label: c, taughtBy: [], requiredBy: [] };
      node.requiredBy.push(questId);
      map.set(c, node);
    }
  }
  _cachedGraph = map;
  return map;
}

/**
 * Concepts the student has been exposed to: the union of
 * `concepts_taught` for each quest in `completedQuestIds`. Quests
 * without curated meta contribute nothing (DEFAULT_META.taught is
 * empty), which is the safe default — no false claim of mastery.
 */
export function masteredConcepts(completedQuestIds: Iterable<string>): Set<string> {
  const acc = new Set<string>();
  for (const id of completedQuestIds) {
    for (const c of getQuestMeta(id).concepts_taught) acc.add(c);
  }
  return acc;
}

/**
 * Quests whose `concepts_required` are fully covered by `mastered`,
 * AND that the student has not yet completed.
 *
 * Quests without curated concepts_required are considered always-
 * ready (no prereqs claimed). This means uncurated quests don't
 * mysteriously vanish from recommendations — they're just not
 * filtered.
 */
export function readyQuests(
  completedQuestIds: Iterable<string>,
  candidateQuestIds: Iterable<string>
): string[] {
  const completed = new Set(completedQuestIds);
  const mastered = masteredConcepts(completed);
  const out: string[] = [];
  for (const qid of candidateQuestIds) {
    if (completed.has(qid)) continue;
    const required = getQuestMeta(qid).concepts_required;
    if (required.every(c => mastered.has(c))) out.push(qid);
  }
  return out;
}

export interface NextConceptSuggestion {
  concept: string;
  /** How many candidate quests this concept currently blocks. */
  unlocksCount: number;
  /** Quest IDs that would become ready once `concept` is mastered. */
  unlocks: string[];
}

/**
 * Among quests the student hasn't completed, find concepts that —
 * if mastered — would unlock the largest number of additional
 * quests. Returns up to `limit` suggestions sorted by impact.
 *
 * Useful for "study this next" hints. A concept that unlocks 8
 * quests is a higher-leverage study target than one that unlocks 1.
 */
export function suggestNextConcepts(
  completedQuestIds: Iterable<string>,
  candidateQuestIds: Iterable<string>,
  limit = 5
): NextConceptSuggestion[] {
  const completed = new Set(completedQuestIds);
  const mastered = masteredConcepts(completed);
  const candidates = [...candidateQuestIds].filter(q => !completed.has(q));

  // For each unmet concept, count how many candidate quests it blocks
  const blockCounts = new Map<string, string[]>();
  for (const qid of candidates) {
    const required = getQuestMeta(qid).concepts_required;
    const missing = required.filter(c => !mastered.has(c));
    // Only suggest concepts that are the SOLE missing prereq for some quest
    // — those give immediate wins. (A quest needing 3 missing concepts
    // doesn't get unlocked just by mastering one of them.)
    if (missing.length === 1) {
      const arr = blockCounts.get(missing[0]) ?? [];
      arr.push(qid);
      blockCounts.set(missing[0], arr);
    }
  }
  return [...blockCounts.entries()]
    .map(([concept, unlocks]) => ({ concept, unlocksCount: unlocks.length, unlocks }))
    .sort((a, b) => b.unlocksCount - a.unlocksCount)
    .slice(0, limit);
}

/**
 * Top-level grouping for the dashboard: how many concepts have at
 * least one teaching quest vs. those that exist in the ontology
 * but no quest teaches them yet (curriculum gaps).
 */
export function getConceptCoverageGaps(): { taught: string[]; orphaned: string[] } {
  const graph = getConceptGraph();
  const taught: string[] = [];
  const orphaned: string[] = [];
  for (const node of graph.values()) {
    if (node.taughtBy.length > 0) taught.push(node.id);
    else orphaned.push(node.id);
  }
  return { taught, orphaned };
}
