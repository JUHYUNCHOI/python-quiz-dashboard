"use client";

/**
 * QuestCompletionCard — Phase 7 of redesign.
 *
 * Renders below the quest content once the student marks the quest
 * complete. Two sections:
 *
 *   1. "What you learned" — list of `concepts_taught` for this quest.
 *   2. "Try next" — quests that the student is now ready to attempt
 *      (all required concepts mastered, not yet completed).
 *
 * Renders nothing when not solved, when no curated meta exists, or
 * when there's nothing useful to show. Pure additive UI; no risk
 * to existing flow.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONCEPT_ONTOLOGY, getQuestMeta, type ConceptId } from "@/lib/quest-meta";
import { masteredConcepts } from "@/lib/concept-graph";
import { ALL_PROBLEMS } from "@/app/quest/[problemId]/data";
import { t } from "@/components/quest/theme";

const SOLVED_KEY = "quest-solved";

interface Props {
  questId: string;
  /** True when the current student has marked this quest complete. */
  solved: boolean;
  isEn?: boolean;
}

/** Load the full set of solved quest IDs from localStorage. */
function useSolvedSet(): Set<string> {
  const [set, setSet] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(SOLVED_KEY) || "[]") as string[];
      setSet(new Set(arr));
    } catch {
      // localStorage may be unavailable (private mode); keep empty set
    }
  }, []);
  return set;
}

const MAX_RECOMMENDATIONS = 4;

export function QuestCompletionCard({ questId, solved, isEn = false }: Props) {
  const solvedSet = useSolvedSet();
  if (!solved) return null;
  const meta = getQuestMeta(questId);
  const taught = meta.concepts_taught;
  // Recompute mastery based on solvedSet — make sure THIS quest's
  // concepts count too (the parent might mark it solved before
  // updating its set in the same render).
  const completed = new Set(solvedSet);
  completed.add(questId);
  const mastered = masteredConcepts(completed);

  // Recommendations: quests not yet solved, prereqs satisfied, AND
  // they share at least one required concept with what we just
  // taught (so the suggestion feels like a continuation rather than
  // a random pull from the catalog).
  const taughtSet = new Set(taught);
  const recs: { id: string; title: string; sharedConcepts: string[] }[] = [];
  for (const p of ALL_PROBLEMS) {
    if (completed.has(p.id)) continue;
    const m = getQuestMeta(p.id);
    const req = m.concepts_required;
    if (req.length === 0) continue; // can't be sure it's a good follow-up
    if (!req.every(c => mastered.has(c))) continue; // not ready
    const shared = req.filter(c => taughtSet.has(c));
    if (shared.length === 0) continue; // unrelated to what we just taught
    recs.push({ id: p.id, title: p.title, sharedConcepts: shared });
  }
  recs.sort((a, b) => b.sharedConcepts.length - a.sharedConcepts.length);
  const top = recs.slice(0, MAX_RECOMMENDATIONS);

  // If there's literally nothing useful, skip the card so we don't
  // add visual noise to uncurated quests.
  if (taught.length === 0 && top.length === 0) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 100%)",
        border: "2px solid #86efac",
        borderRadius: 14,
        padding: "16px 18px",
        margin: "16px auto",
        maxWidth: "min(880px, 100%)",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 800, color: "#15803d", marginBottom: 10 }}>
        🎉 {t(isEn, "Quest complete!", "Quest 완료!")}
      </div>

      {taught.length > 0 && (
        <div style={{ marginBottom: top.length > 0 ? 14 : 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
            {t(isEn, "What you practiced", "이번에 연습한 개념")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {taught.map(c => (
              <span
                key={c}
                title={CONCEPT_ONTOLOGY[c as ConceptId] ?? c}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 999,
                  background: "#fff",
                  border: "1px solid #86efac",
                  color: "#15803d",
                }}
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {top.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
            {t(isEn, "Try next — ready for you", "다음 도전 — 지금 풀 수 있어요")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
            {top.map(r => (
              <Link
                key={r.id}
                href={`/quest/${r.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#fff",
                  border: "2px solid #bbf7d0",
                  color: "#1f2937",
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: "#166534" }}>
                  🎯 {r.title}
                </div>
                <div style={{ fontSize: 10, color: "#16a34a" }}>
                  {t(isEn, "uses ", "사용 개념: ")}
                  {r.sharedConcepts.join(", ")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
