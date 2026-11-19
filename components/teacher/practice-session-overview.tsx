"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, RefreshCw, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ALL_CLUSTERS } from "@/data/practice"
import { useLanguage } from "@/contexts/language-context"

interface SessionSummary {
  round: number
  passed: number
  attempted: number
  optedOut: boolean
  wrongNums: number[]
}

interface StudentSessionSummary {
  studentId: string
  name: string
  setsDone: number
  currentSet: number
  totalPassed: number
  totalAttempted: number
  optedOut: boolean
  hasPendingAssignment: boolean
  pendingAssignmentId: string | null
  lastWrongNums: number[]
  persistentWrong: number[]  // 2번 이상 틀린 문제 번호 🚨
  sessions: SessionSummary[]
}

interface Props {
  classId: string
  lang?: "ko" | "en"
}

export function PracticeSessionOverview({ classId, lang = "ko" }: Props) {
  const { t } = useLanguage()
  const [progLang, setProgLang] = useState<"cpp" | "python">("cpp")
  const filteredClusters = ALL_CLUSTERS.filter(c => progLang === "python" ? c.id.startsWith("py-") : !c.id.startsWith("py-"))
  const [selectedClusterId, setSelectedClusterId] = useState(ALL_CLUSTERS.find(c => !c.id.startsWith("py-"))?.id ?? "")
  const [students, setStudents] = useState<StudentSessionSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [assigning, setAssigning] = useState<string | null>(null)
  const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(true)
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const selectedCluster = ALL_CLUSTERS.find(c => c.id === selectedClusterId)

  // 언어 변경 시 해당 언어의 첫 번째 클러스터로 자동 이동
  const handleProgLangChange = (lang: "cpp" | "python") => {
    setProgLang(lang)
    const first = ALL_CLUSTERS.find(c => lang === "python" ? c.id.startsWith("py-") : !c.id.startsWith("py-"))
    if (first) setSelectedClusterId(first.id)
  }

  const load = useCallback(async () => {
    if (!classId || !selectedClusterId) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/practice/sessions/class?classId=${classId}&clusterId=${selectedClusterId}`)
      const json = await res.json()
      setStudents(json.students ?? [])
    } catch {}
    setIsLoading(false)
  }, [classId, selectedClusterId])

  useEffect(() => { load() }, [load])

  const handleAssign = async (studentId: string) => {
    setAssigning(studentId)
    try {
      const res = await fetch("/api/practice/sessions/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, clusterId: selectedClusterId }),
      })
      if (res.ok) {
        setAssignedIds(prev => new Set([...prev, studentId]))
        await load()
      }
    } catch {}
    setAssigning(null)
  }

  const notStarted = students.filter(s => s.setsDone === 0 && !s.hasPendingAssignment)
  const inProgress = students.filter(s => s.setsDone > 0 || s.hasPendingAssignment)
  const flagged = inProgress.filter(s => s.persistentWrong.length > 0)

  // 더 연습 필요: 반복 오답 OR 정답률 < 70%, 아직 배정 안 된 학생
  const needsMore = inProgress.filter(s => {
    if (s.hasPendingAssignment) return false  // 이미 대기 중
    const pct = s.totalAttempted > 0 ? (s.totalPassed / s.totalAttempted) * 100 : 0
    return s.persistentWrong.length > 0 || (s.totalAttempted > 0 && pct < 70) || s.optedOut
  })

  const handleAssignAll = async () => {
    for (const s of needsMore) {
      if (!assignedIds.has(s.studentId)) await handleAssign(s.studentId)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      {/* 헤더 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-black text-gray-700">
            🧩 {t("도전문제 현황", "Challenge problem status")}
          </h3>
          {needsMore.length > 0 && (
            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              💪 {t(`더 연습 필요 ${needsMore.length}명`, `${needsMore.length} need more practice`)}
            </span>
          )}
          {flagged.length > 0 && (
            <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              🚨 {t(`반복 오답 ${flagged.length}명`, `${flagged.length} with repeated misses`)}
            </span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-4 py-3 space-y-3">
          {/* 언어 선택 */}
          <div className="flex items-center gap-1 mb-1">
            {(["cpp", "python"] as const).map(l => (
              <button
                key={l}
                onClick={() => handleProgLangChange(l)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all",
                  progLang === l
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                )}
              >
                {l === "cpp" ? "⚡ C++" : "🐍 Python"}
              </button>
            ))}
          </div>

          {/* 클러스터 선택 */}
          <div className="flex items-center gap-2 flex-wrap">
            {filteredClusters.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedClusterId(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                  selectedClusterId === c.id
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"
                )}
              >
                {c.emoji} {c.title}
              </button>
            ))}
            <button
              onClick={load}
              className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              title={t("새로고침", "Refresh")}
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
            </button>
          </div>

          {selectedCluster && (
            <p className="text-[11px] text-gray-400">
              {selectedCluster.emoji} {selectedCluster.title} · {t("세트1=1~7번, 세트2=8~10번, 세트3=11~13번...", "Set 1 = #1–7, Set 2 = #8–10, Set 3 = #11–13...")}
            </p>
          )}

          {/* 💪 더 연습 필요 섹션 */}
          {!isLoading && needsMore.length > 0 && (
            <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-orange-700">
                  💪 {t(`더 연습이 필요한 학생 (${needsMore.length}명)`, `Students needing more practice (${needsMore.length})`)}
                </p>
                <button
                  onClick={handleAssignAll}
                  className="flex items-center gap-1 text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {t("전체 추가 배정", "Assign to all")}
                </button>
              </div>
              <div className="space-y-1">
                {needsMore.map(s => {
                  const pct = s.totalAttempted > 0 ? Math.round((s.totalPassed / s.totalAttempted) * 100) : 0
                  const reasons = [
                    s.persistentWrong.length > 0 && t(`반복 오답: ${s.persistentWrong.map(n => `${n}번`).join(", ")}`, `Repeated misses: ${s.persistentWrong.map(n => `#${n}`).join(", ")}`),
                    s.totalAttempted > 0 && pct < 70 && t(`정답률 ${pct}%`, `${pct}% correct`),
                    s.optedOut && t("포기", "Gave up"),
                  ].filter(Boolean).join(" · ")
                  return (
                    <div key={s.studentId} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-orange-100">
                      <div>
                        <span className="text-sm font-semibold text-gray-800">{s.name}</span>
                        <span className="text-[10px] text-orange-500 ml-2">{reasons}</span>
                      </div>
                      {assignedIds.has(s.studentId) ? (
                        <span className="text-[10px] text-emerald-600 font-bold">✅ {t("배정됨", "Assigned")}</span>
                      ) : (
                        <button
                          onClick={() => handleAssign(s.studentId)}
                          disabled={assigning === s.studentId}
                          className="flex items-center gap-1 text-[10px] font-bold text-orange-600 hover:text-orange-800 px-2 py-1 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                          {assigning === s.studentId ? "..." : t("추가 배정", "Assign more")}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="py-4 text-center text-gray-300 text-sm">{t("불러오는 중...", "Loading...")}</div>
          ) : students.length === 0 ? (
            <div className="py-4 text-center text-gray-300 text-sm">{t("학생 없음", "No students")}</div>
          ) : (
            <div className="space-y-1.5">
              {/* 진행 중 학생 */}
              {inProgress.map(s => {
                const pct = s.totalAttempted > 0 ? Math.round((s.totalPassed / s.totalAttempted) * 100) : 0
                const isGood = pct >= 70
                const hasPersistent = s.persistentWrong.length > 0
                const isExpanded = expandedStudent === s.studentId

                return (
                  <div key={s.studentId} className={cn(
                    "rounded-xl border transition-colors",
                    hasPersistent ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"
                  )}>
                    {/* 메인 행 */}
                    <div
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                      onClick={() => setExpandedStudent(isExpanded ? null : s.studentId)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-gray-800 truncate">{s.name}</p>
                          {hasPersistent && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              🚨 {t(`${s.persistentWrong.map(n => `${n}번`).join(", ")} 반복 오답`, `Repeated misses on ${s.persistentWrong.map(n => `#${n}`).join(", ")}`)}
                            </span>
                          )}
                          {s.optedOut && (
                            <span className="text-[10px] text-amber-500 flex-shrink-0">{t("포기", "Gave up")}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {s.hasPendingAssignment
                            ? t(`세트 ${s.currentSet - 1} 완료 · 선생님 배정 대기 중`, `Set ${s.currentSet - 1} done · waiting for teacher to assign`)
                            : s.setsDone > 0
                            ? t(
                                `세트 ${s.setsDone} 완료${s.lastWrongNums.length > 0 ? ` · 틀린 문제: ${s.lastWrongNums.map(n => `${n}번`).join(", ")}` : ""}`,
                                `Set ${s.setsDone} done${s.lastWrongNums.length > 0 ? ` · Missed: ${s.lastWrongNums.map(n => `#${n}`).join(", ")}` : ""}`
                              )
                            : t("세트 배정 대기", "Waiting for set assignment")}
                        </p>
                      </div>

                      {/* 정답률 */}
                      {s.totalAttempted > 0 && (
                        <span className={cn(
                          "text-xs font-bold w-10 text-right flex-shrink-0",
                          isGood ? "text-emerald-600" : "text-amber-500"
                        )}>
                          {pct}%
                        </span>
                      )}

                      {/* 추가 라운드 배정 */}
                      {s.hasPendingAssignment ? (
                        <span className="text-[10px] text-orange-500 font-semibold px-2 py-0.5 bg-orange-100 rounded-full flex-shrink-0">
                          {t("대기중", "Pending")}
                        </span>
                      ) : assignedIds.has(s.studentId) ? (
                        <span className="text-[10px] text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded-full flex-shrink-0">
                          {t("배정됨", "Assigned")}
                        </span>
                      ) : (
                        <button
                          onClick={e => { e.stopPropagation(); handleAssign(s.studentId) }}
                          disabled={assigning === s.studentId}
                          className="flex items-center gap-1 text-[10px] font-semibold text-purple-600 hover:text-purple-800 px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 flex-shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                          {assigning === s.studentId ? "..." : t("추가 배정", "Assign more")}
                        </button>
                      )}

                      <ChevronDown className={cn("w-3.5 h-3.5 text-gray-300 flex-shrink-0 transition-transform", isExpanded && "rotate-180")} />
                    </div>

                    {/* 세트별 상세 (펼침) */}
                    {isExpanded && s.sessions.length > 0 && (
                      <div className="px-3 pb-3 space-y-1 border-t border-gray-100 pt-2">
                        {s.sessions.map(session => {
                          const sPct = session.attempted > 0 ? Math.round((session.passed / session.attempted) * 100) : 0
                          return (
                            <div key={session.round} className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="font-semibold text-gray-700 w-12 flex-shrink-0">{t(`세트 ${session.round}`, `Set ${session.round}`)}</span>
                              <span className={cn("font-bold w-12 flex-shrink-0", sPct >= 70 ? "text-emerald-600" : "text-amber-500")}>
                                {session.passed}/{session.attempted} ({sPct}%)
                              </span>
                              {session.wrongNums.length > 0
                                ? <span className="text-red-400">{t(`틀린 문제: ${session.wrongNums.map(n => `${n}번`).join(", ")}`, `Missed: ${session.wrongNums.map(n => `#${n}`).join(", ")}`)}</span>
                                : <span className="text-emerald-500">{t("전체 정답", "All correct")} 🎉</span>
                              }
                              {session.optedOut && <span className="text-amber-400">· {t("포기", "Gave up")}</span>}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* 시작 안 한 학생 */}
              {notStarted.length > 0 && (
                <details className="group">
                  <summary className="text-xs text-gray-400 cursor-pointer list-none flex items-center gap-1 py-1">
                    <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                    {t(`아직 시작 안 함 (${notStarted.length}명)`, `Not started yet (${notStarted.length})`)}
                  </summary>
                  <div className="mt-1 space-y-1 pl-2">
                    {notStarted.map(s => (
                      <div key={s.studentId} className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-gray-50">
                        <span className="text-sm text-gray-500">{s.name}</span>
                        <button
                          onClick={() => handleAssign(s.studentId)}
                          disabled={assigning === s.studentId}
                          className="flex items-center gap-1 text-[10px] font-semibold text-purple-500 hover:text-purple-700 px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                          {assigning === s.studentId ? "..." : t("추가 배정", "Assign more")}
                        </button>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
