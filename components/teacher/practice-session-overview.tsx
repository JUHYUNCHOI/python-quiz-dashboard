"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, RefreshCw, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ALL_CLUSTERS } from "@/data/practice"

interface StudentSessionSummary {
  studentId: string
  name: string
  roundsDone: number
  totalPassed: number
  totalAttempted: number
  optedOut: boolean
  hasPendingAssignment: boolean
  pendingAssignmentId: string | null
}

interface Props {
  classId: string
  lang?: "ko" | "en"
}

export function PracticeSessionOverview({ classId, lang = "ko" }: Props) {
  const [selectedClusterId, setSelectedClusterId] = useState(ALL_CLUSTERS[0]?.id ?? "")
  const [students, setStudents] = useState<StudentSessionSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [assigning, setAssigning] = useState<string | null>(null)
  const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(true)

  const selectedCluster = ALL_CLUSTERS.find(c => c.id === selectedClusterId)

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

  const notStarted = students.filter(s => s.roundsDone === 0 && !s.hasPendingAssignment)
  const inProgress = students.filter(s => s.roundsDone > 0 || s.hasPendingAssignment)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      {/* 헤더 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="text-sm font-black text-gray-700 text-left">
            🧩 {lang === "en" ? "Practice Progress" : "도전문제 현황"}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5 text-left">
            {lang === "en" ? "Per-cluster session tracking · Assign extra rounds" : "클러스터별 세션 현황 · 추가 라운드 배정"}
          </p>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="px-4 py-3 space-y-3">
          {/* 클러스터 선택 */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_CLUSTERS.slice(0, 6).map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedClusterId(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                  selectedClusterId === c.id
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                )}
              >
                {c.emoji} {c.title}
              </button>
            ))}
            <button
              onClick={load}
              className="ml-auto p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              title="새로고침"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
            </button>
          </div>

          {isLoading ? (
            <div className="py-4 text-center text-gray-300 text-sm">불러오는 중...</div>
          ) : students.length === 0 ? (
            <div className="py-4 text-center text-gray-300 text-sm">학생 없음</div>
          ) : (
            <>
              {/* 진행 중 / 완료 학생 */}
              {inProgress.length > 0 && (
                <div className="space-y-1">
                  {inProgress.map(s => {
                    const pct = s.totalAttempted > 0 ? Math.round((s.totalPassed / s.totalAttempted) * 100) : 0
                    const isGood = pct >= 70
                    return (
                      <div key={s.studentId} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{s.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {s.roundsDone > 0
                              ? `${s.roundsDone}라운드 · ${s.totalPassed}/${s.totalAttempted}문제`
                              : "선생님 배정 대기 중"}
                            {s.optedOut && <span className="ml-1 text-amber-500">포기</span>}
                          </p>
                        </div>

                        {/* 정답률 */}
                        {s.totalAttempted > 0 && (
                          <span className={cn(
                            "text-xs font-bold w-10 text-right",
                            isGood ? "text-emerald-600" : "text-amber-500"
                          )}>
                            {pct}%
                          </span>
                        )}

                        {/* 추가 라운드 배정 */}
                        {s.hasPendingAssignment ? (
                          <span className="text-[10px] text-orange-500 font-semibold px-2 py-0.5 bg-orange-50 rounded-full">
                            대기중
                          </span>
                        ) : assignedIds.has(s.studentId) ? (
                          <span className="text-[10px] text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded-full">
                            배정됨
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAssign(s.studentId)}
                            disabled={assigning === s.studentId}
                            className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                            {assigning === s.studentId ? "..." : "추가 라운드"}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* 시작 안 한 학생 */}
              {notStarted.length > 0 && (
                <details className="group">
                  <summary className="text-xs text-gray-400 cursor-pointer list-none flex items-center gap-1 py-1">
                    <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                    아직 시작 안 함 ({notStarted.length}명)
                  </summary>
                  <div className="mt-1 space-y-1 pl-2">
                    {notStarted.map(s => (
                      <div key={s.studentId} className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-gray-50">
                        <span className="text-sm text-gray-500">{s.name}</span>
                        <button
                          onClick={() => handleAssign(s.studentId)}
                          disabled={assigning === s.studentId}
                          className="flex items-center gap-1 text-[10px] font-semibold text-indigo-500 hover:text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                          {assigning === s.studentId ? "..." : "추가 라운드"}
                        </button>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
