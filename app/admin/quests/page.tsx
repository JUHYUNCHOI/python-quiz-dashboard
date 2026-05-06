"use client"

/**
 * Admin Quest Health Dashboard — Phase 1 of redesign.
 *
 * Single-page view of all quests in lib/quest-health.ts, grouped by
 * category with severity badges. Teacher-only.
 *
 * This is purely a READ view — it doesn't change any quest data.
 * Edits to quest health happen in lib/quest-health.ts (source code).
 */

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { listUnhealthyQuests, getQuestHealth, type QuestHealthStatus } from "@/lib/quest-health"
import { getQuestMeta, getMetaCoverageStats, getReleaseStage, QUEST_CONCEPT_META, CONCEPT_ONTOLOGY, type ReleaseStage } from "@/lib/quest-meta"
import { getConceptGraph, getConceptCoverageGaps } from "@/lib/concept-graph"
import { ALL_PROBLEMS } from "@/app/quest/[problemId]/data"

const CATEGORY_META: Record<QuestHealthStatus["category"], { label: string; color: string; bg: string }> = {
  "stub-cpp":         { label: "Stub C++",         color: "#1e3a8a", bg: "#dbeafe" },
  "py-cpp-mismatch":  { label: "Py↔C++ 다름",      color: "#7c2d12", bg: "#ffedd5" },
  "algorithm-bug":    { label: "알고리즘 버그",     color: "#7f1d1d", bg: "#fee2e2" },
  "logic-bug":        { label: "Logic 버그",        color: "#7f1d1d", bg: "#fee2e2" },
}

export default function AdminQuestsPage() {
  const { isAuthenticated, profile, isLoading: authLoading } = useAuth()

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-[60px] animate-bounce">🦒</div></div>
  }
  if (!isAuthenticated || profile?.role !== "teacher") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h2 className="text-xl font-bold text-gray-800">관리자 전용</h2>
          <Link href="/login" className="inline-block px-6 py-2 rounded-xl bg-orange-500 text-white font-bold">로그인</Link>
        </div>
      </div>
    )
  }

  const unhealthy = listUnhealthyQuests()
  // Group by category
  const groups = unhealthy.reduce<Record<string, typeof unhealthy>>((acc, q) => {
    const key = q.category
    if (!acc[key]) acc[key] = []
    acc[key].push(q)
    return acc
  }, {})
  const sortedCategories = Object.keys(groups).sort() as QuestHealthStatus["category"][]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">🩺 Quest Health Dashboard</h1>
            <p className="text-sm text-gray-500">알려진 결함 quest 일람 — <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">lib/quest-health.ts</code> 에서 편집</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="text-2xl font-black text-gray-900">{unhealthy.length}</div>
            <div className="text-xs text-gray-500 font-semibold">Total flagged</div>
          </div>
          {sortedCategories.map((cat) => {
            const meta = CATEGORY_META[cat]
            return (
              <div key={cat} className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="text-2xl font-black" style={{ color: meta.color }}>{groups[cat].length}</div>
                <div className="text-xs font-semibold" style={{ color: meta.color }}>{meta.label}</div>
              </div>
            )
          })}
        </div>

        {/* Validator hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-900">
          <div className="font-bold mb-1">🛡️ 자동 검증</div>
          <div className="text-xs leading-relaxed">
            모든 quest 의 parse 검사 + 미배운 C++ syntax 점검:
            <code className="ml-2 bg-white px-1.5 py-0.5 rounded text-xs">npm run validate-quests</code>
          </div>
        </div>

        {/* Phase 2: Meta coverage */}
        {(() => {
          const stats = getMetaCoverageStats()
          return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-6 text-sm text-emerald-900">
              <div className="font-bold mb-1">📊 Meta coverage (Phase 2)</div>
              <div className="text-xs leading-relaxed grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div><span className="font-bold">{stats.curated}</span> quests curated</div>
                <div><span className="font-bold">{stats.conceptsUsed}/{stats.totalConceptsInOntology}</span> concepts in use</div>
                <div title="Phase 1: validate-solutions runs these in CI"><span className="font-bold">{stats.solutionVerified}</span> solution-verified</div>
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div key={type} className="truncate" title={type}>
                    <span className="font-bold">{count}</span> {type}
                  </div>
                ))}
              </div>
              <div className="text-[11px] mt-2 opacity-75">
                Curate via <code className="bg-white px-1 py-0.5 rounded">lib/quest-meta.ts</code>. Quests without entries use defaults.
              </div>
            </div>
          )
        })()}

        {/* Phase 6: Concept graph — concept → quest map (read view) */}
        {(() => {
          const graph = getConceptGraph()
          const { taught, orphaned } = getConceptCoverageGaps()
          // Sort taught concepts by their teaching count (most-taught first)
          const sortedTaught = [...graph.values()]
            .filter(n => n.taughtBy.length > 0)
            .sort((a, b) => b.taughtBy.length - a.taughtBy.length)
          return (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-6 text-sm text-indigo-900">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-bold">🕸️ Concept graph (Phase 6)</div>
                <div className="text-xs">
                  <span className="font-bold text-emerald-700">{taught.length}</span> taught ·{" "}
                  <span className="font-bold text-rose-700">{orphaned.length}</span> orphaned
                </div>
              </div>
              <details className="text-[11px]">
                <summary className="cursor-pointer font-semibold">
                  taught concepts ({taught.length})
                </summary>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {sortedTaught.map(n => (
                    <div key={n.id} className="flex items-center gap-2 px-2 py-1 rounded bg-white border border-indigo-100">
                      <code className="font-mono font-bold text-indigo-900 truncate flex-1">{n.id}</code>
                      <span className="text-[10px] text-indigo-600" title="taught by">→ {n.taughtBy.length}</span>
                      <span className="text-[10px] text-rose-600" title="required by">← {n.requiredBy.length}</span>
                    </div>
                  ))}
                </div>
              </details>
              {orphaned.length > 0 && (
                <details className="text-[11px] mt-2">
                  <summary className="cursor-pointer font-semibold text-rose-800">
                    orphaned concepts (no quest teaches these yet — curriculum gap)
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {orphaned.map(c => (
                      <code key={c} className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-800">
                        {c}
                      </code>
                    ))}
                  </div>
                </details>
              )}
              <div className="text-[10px] mt-2 opacity-75">
                → = quests teaching this concept · ← = quests requiring it. Edit{" "}
                <code className="bg-white px-1 py-0.5 rounded">concepts_taught</code> /{" "}
                <code className="bg-white px-1 py-0.5 rounded">concepts_required</code>{" "}
                in <code className="bg-white px-1 py-0.5 rounded">lib/quest-meta.ts</code>.
              </div>
            </div>
          )
        })()}

        {/* Phase 5: Release stage summary */}
        {(() => {
          const stageCounts: Record<ReleaseStage, string[]> = { internal: [], beta: [], full: [] }
          for (const p of ALL_PROBLEMS) {
            stageCounts[getReleaseStage(p.id)].push(p.id)
          }
          const flagged = stageCounts.internal.length + stageCounts.beta.length
          return (
            <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-3 mb-6 text-sm text-fuchsia-900">
              <div className="font-bold mb-1">🚦 Release stages (Phase 5)</div>
              <div className="text-xs leading-relaxed grid grid-cols-3 gap-2">
                <div><span className="font-bold">{stageCounts.internal.length}</span> internal (선생만)</div>
                <div><span className="font-bold">{stageCounts.beta.length}</span> beta (opt-in)</div>
                <div><span className="font-bold">{stageCounts.full.length}</span> full (전체)</div>
              </div>
              {flagged > 0 ? (
                <details className="text-[11px] mt-2">
                  <summary className="cursor-pointer font-semibold">non-full quests ({flagged})</summary>
                  <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {[...stageCounts.internal.map(id => ({ id, stage: "internal" as const })),
                      ...stageCounts.beta.map(id => ({ id, stage: "beta" as const }))].map(({ id, stage }) => (
                      <Link
                        key={id}
                        href={`/quest/${id}`}
                        target="_blank"
                        className={`flex items-center gap-1.5 px-2 py-1 rounded border font-mono ${
                          stage === "internal"
                            ? "border-rose-200 bg-rose-50 text-rose-800"
                            : "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800"
                        }`}
                      >
                        <span className="font-bold truncate flex-1">{id}</span>
                        <span className="text-[9px] uppercase opacity-70">{stage}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <div className="text-[10px] mt-1.5 opacity-75">
                  All quests are full-released. Set <code className="bg-white px-1 py-0.5 rounded">release_stage: &quot;internal&quot; | &quot;beta&quot;</code> in <code className="bg-white px-1 py-0.5 rounded">lib/quest-meta.ts</code> to gate a quest during a rewrite.
                </div>
              )}
            </div>
          )
        })()}

        {/* Phase 2: Per-quest curation status (ALL quests) */}
        {(() => {
          const bySection = ALL_PROBLEMS.reduce<Record<string, typeof ALL_PROBLEMS>>((acc, p) => {
            (acc[p.section] ??= []).push(p)
            return acc
          }, {})
          const sectionNames = Object.keys(bySection).sort()
          return (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">📋 Curation status (전체 {ALL_PROBLEMS.length} quests)</h2>
                <div className="text-xs text-gray-500">
                  curated <span className="font-bold text-emerald-700">{Object.keys(QUEST_CONCEPT_META).length}</span> / default <span className="font-bold text-gray-600">{ALL_PROBLEMS.length - Object.keys(QUEST_CONCEPT_META).length}</span>
                </div>
              </div>
              <div className="space-y-3">
                {sectionNames.map((section) => {
                  const list = bySection[section]
                  const curated = list.filter((p) => QUEST_CONCEPT_META[p.id])
                  const uncurated = list.filter((p) => !QUEST_CONCEPT_META[p.id])
                  return (
                    <details key={section} className="text-xs" open={uncurated.length > 0 && uncurated.length <= 30}>
                      <summary className="cursor-pointer font-bold text-gray-800 hover:text-blue-700">
                        {section}
                        <span className="ml-2 text-emerald-700">✓ {curated.length}</span>
                        <span className="ml-2 text-gray-500">⌀ {uncurated.length}</span>
                      </summary>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                        {list.map((p) => {
                          const isCurated = !!QUEST_CONCEPT_META[p.id]
                          const health = getQuestHealth(p.id)
                          const m = getQuestMeta(p.id)
                          const stage = getReleaseStage(p.id)
                          return (
                            <Link
                              key={p.id}
                              href={`/quest/${p.id}`}
                              target="_blank"
                              className={`flex items-center gap-1.5 px-2 py-1 rounded border text-[11px] hover:shadow-sm transition ${
                                isCurated
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                  : "border-gray-200 bg-gray-50 text-gray-600"
                              }`}
                              title={`${p.title} — ${m.type} ★${m.difficulty} · ${stage}`}
                            >
                              <span className="font-mono font-bold truncate flex-1">{p.id}</span>
                              {stage === "internal" && <span className="text-rose-600" title="internal — only teachers see this in catalog">🛠️</span>}
                              {stage === "beta" && <span className="text-fuchsia-600" title="beta — opt-in students only">🧪</span>}
                              {health && <span className="text-amber-600" title={health.detail}>⚠</span>}
                              {isCurated ? <span className="text-emerald-700">✓</span> : <span className="text-gray-400">⌀</span>}
                            </Link>
                          )
                        })}
                      </div>
                    </details>
                  )
                })}
              </div>
              <div className="text-[10px] mt-3 text-gray-500 leading-relaxed">
                ✓ = <code>lib/quest-meta.ts</code> 에 entry 있음 (concepts/type/difficulty 채워짐) · ⌀ = default 사용 · ⚠ = quest-health 에 결함 등록 · 🛠️ = internal · 🧪 = beta
              </div>
            </div>
          )
        })()}

        {/* Groups */}
        {sortedCategories.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-4xl mb-2">✨</div>
            <div className="text-lg font-bold text-gray-700">All quests healthy</div>
            <div className="text-sm text-gray-500">No flagged entries in <code>lib/quest-health.ts</code></div>
          </div>
        ) : (
          sortedCategories.map((cat) => {
            const meta = CATEGORY_META[cat]
            return (
              <div key={cat} className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: meta.color }}>
                  {meta.label} ({groups[cat].length})
                </h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {groups[cat].map((q, i) => {
                    const m = getQuestMeta(q.id)
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-3 p-3 ${i > 0 ? "border-t border-gray-100" : ""}`}
                      >
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-bold flex-shrink-0"
                          style={{ background: meta.bg, color: meta.color }}
                        >
                          {q.severity}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <code className="text-sm font-mono font-bold text-gray-900">{q.id}</code>
                            <Link
                              href={`/quest/${q.id}`}
                              target="_blank"
                              className="text-gray-400 hover:text-blue-600"
                              title="Open quest in new tab"
                            >
                              <ExternalLink size={12} />
                            </Link>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{m.type}</span>
                            <span className="text-[10px] font-bold text-amber-600">★ {m.difficulty}</span>
                            <span className="text-[10px] font-bold text-emerald-600 flex gap-1">
                              {m.supported_languages.includes("py") && <span title="Python verified">🐍</span>}
                              {m.supported_languages.includes("cpp") && <span title="C++ verified">💻</span>}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1 leading-relaxed">{q.detail}</div>
                          {(m.concepts_taught.length > 0 || m.concepts_required.length > 0) && (
                            <div className="text-[10px] text-gray-500 mt-1.5 flex flex-wrap gap-1">
                              {m.concepts_required.map((c) => (
                                <span key={`r-${c}`} className="bg-gray-100 px-1.5 py-0.5 rounded" title="prereq">
                                  ← {c}
                                </span>
                              ))}
                              {m.concepts_taught.map((c) => (
                                <span key={`t-${c}`} className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded" title="teaches">
                                  ✓ {c}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
