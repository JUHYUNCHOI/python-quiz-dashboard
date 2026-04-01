"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CodeBlock } from "@/components/ui/code-block"
import { Loader2, ChevronDown, ChevronUp, Check, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLessonName } from "@/lib/curriculum-data"

// 목록용 — code 제외 (가벼운 로드)
interface SubmissionMeta {
  id: string
  student_id: string
  student_name: string
  lesson_id: string
  step_id: string
  step_title: string
  submitted_at: string
  teacher_grade: string | null
  expected_output: string | null
  problem_description: string | null
}

interface SubmissionGroup {
  key: string
  student_name: string
  student_id: string
  lesson_id: string
  step_id: string
  step_title: string
  latestId: string
  latestSubmittedAt: string
  allIds: string[]
  count: number
  teacher_grade: string | null
  expected_output: string | null
  problem_description: string | null
}

type Grade = "pass" | "fail" | "auto" | null

function stripEmoji(s: string) {
  return s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim()
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return "방금"
  if (h < 1) return `${m}분 전`
  if (d < 1) return `${h}시간 전`
  if (d < 7) return `${d}일 전`
  const dt = new Date(iso)
  return `${dt.getMonth()+1}/${dt.getDate()}`
}

const PAGE_SIZE = 30

export default function HomeworkPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<SubmissionGroup[]>([])
  const [grades, setGrades] = useState<Record<string, Grade>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState("")

  // 펼친 그룹의 코드 (lazy load)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const [loadedCode, setLoadedCode] = useState<Record<string, string>>({})
  const [codeLoading, setCodeLoading] = useState(false)

  const [filterLesson, setFilterLesson] = useState("")
  const [filterStudent, setFilterStudent] = useState("")
  const [filterGrade, setFilterGrade] = useState<"" | "needs_review" | "ungraded" | "pass" | "fail" | "auto">("needs_review")

  const buildGroups = useCallback((rows: SubmissionMeta[], existing: SubmissionGroup[]) => {
    const map = new Map<string, SubmissionGroup>(existing.map(g => [g.key, g]))
    for (const sub of rows) {
      const key = `${sub.student_id}__${sub.step_id}`
      if (!map.has(key)) {
        map.set(key, {
          key,
          student_name: sub.student_name || sub.student_id.slice(0, 8),
          student_id: sub.student_id,
          lesson_id: sub.lesson_id,
          step_id: sub.step_id,
          step_title: sub.step_title,
          latestId: sub.id,
          latestSubmittedAt: sub.submitted_at,
          allIds: [sub.id],
          count: 1,
          teacher_grade: sub.teacher_grade,
          expected_output: sub.expected_output,
          problem_description: sub.problem_description,
        })
      } else {
        const g = map.get(key)!
        g.count++
        g.allIds.push(sub.id)
        if (sub.submitted_at > g.latestSubmittedAt) {
          g.latestId = sub.id
          g.latestSubmittedAt = sub.submitted_at
          g.teacher_grade = sub.teacher_grade
          g.expected_output = sub.expected_output
          g.problem_description = sub.problem_description
        }
      }
    }
    return [...map.values()]
  }, [])

  const fetchPage = useCallback(async (off: number, append: boolean) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("homework_submissions")
      .select("id, student_id, student_name, lesson_id, step_id, step_title, submitted_at, teacher_grade, expected_output, problem_description")
      .order("submitted_at", { ascending: false })
      .range(off, off + PAGE_SIZE - 1)

    if (error) { setError("불러오기 실패: " + error.message); return }

    const rows = (data || []) as SubmissionMeta[]
    setHasMore(rows.length === PAGE_SIZE)

    setGroups(prev => {
      const base = append ? prev : []
      const built = buildGroups(rows, base)
      const gradeMap: Record<string, Grade> = {}
      for (const g of built) gradeMap[g.key] = (g.teacher_grade as Grade) ?? null
      setGrades(prev2 => ({ ...prev2, ...gradeMap }))
      return built
    })
    setOffset(off + rows.length)
  }, [buildGroups])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await fetchPage(0, false)
      setLoading(false)
    }
    init()
  }, [fetchPage])

  const loadMore = async () => {
    setLoadingMore(true)
    await fetchPage(offset, true)
    setLoadingMore(false)
  }

  const toggleExpand = async (grp: SubmissionGroup) => {
    if (expandedKey === grp.key) { setExpandedKey(null); return }
    setExpandedKey(grp.key)
    if (loadedCode[grp.latestId]) return
    setCodeLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("homework_submissions")
      .select("code")
      .eq("id", grp.latestId)
      .single()
    if (data?.code) setLoadedCode(prev => ({ ...prev, [grp.latestId]: data.code }))
    setCodeLoading(false)
  }

  const setGrade = async (grp: SubmissionGroup, grade: Grade) => {
    setSaving(grp.key)
    const supabase = createClient()
    const { error } = await supabase.from("homework_submissions").update({ teacher_grade: grade }).in("id", grp.allIds)
    if (error) {
      setError("채점 저장 실패: " + error.message)
    } else {
      setGrades(prev => ({ ...prev, [grp.key]: grade }))
      setGroups(prev => prev.map(g => g.key === grp.key ? { ...g, teacher_grade: grade } : g))
    }
    setSaving(null)
  }

  const markAllReviewed = async () => {
    const targets = groups.filter(g => !grades[g.key])
    if (!targets.length) return
    setSaving("all")
    const supabase = createClient()
    const allIds = targets.flatMap(g => g.allIds)
    await supabase.from("homework_submissions").update({ teacher_grade: "pass" }).in("id", allIds)
    const updated = { ...grades }
    for (const g of targets) updated[g.key] = "pass"
    setGrades(updated)
    setSaving(null)
  }

  const lessons = [...new Set(groups.map(g => g.lesson_id))].sort()
  const students = [...new Set(groups.map(g => g.student_name))].sort()

  const filtered = groups.filter(g => {
    if (filterLesson && g.lesson_id !== filterLesson) return false
    if (filterStudent && g.student_name !== filterStudent) return false
    const grade = grades[g.key]
    if (filterGrade === "needs_review" && grade !== null && grade !== "fail") return false
    if (filterGrade === "ungraded" && grade !== null) return false
    if (filterGrade === "pass" && grade !== "pass") return false
    if (filterGrade === "fail" && grade !== "fail") return false
    if (filterGrade === "auto" && grade !== "auto") return false
    return true
  }).sort((a, b) => {
    const ord = (g: Grade) => g === null ? 0 : g === "fail" ? 1 : 2
    return ord(grades[a.key]) - ord(grades[b.key])
  })

  const ungradedCount = groups.filter(g => !grades[g.key]).length
  const autoCount = groups.filter(g => grades[g.key] === "auto").length
  const totalSubmissions = groups.reduce((s, g) => s + g.count, 0)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">

      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 뒤로
          </button>
          <h1 className="text-2xl font-bold text-gray-900">📋 숙제 제출 현황</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap text-sm">
            <span className="text-gray-500">{groups.length}개 문제 · {totalSubmissions}회 제출</span>
            {autoCount > 0 && <span className="text-green-600 font-semibold">자동채점 {autoCount}개 ✅</span>}
            {ungradedCount > 0 && <span className="text-amber-600 font-semibold">확인 필요 {ungradedCount}개</span>}
          </div>
        </div>
        {ungradedCount > 0 && (
          <button onClick={markAllReviewed} disabled={saving === "all"}
            className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors flex-shrink-0 disabled:opacity-50">
            {saving === "all" ? "처리 중…" : "전체 확인 완료"}
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}

      {/* 필터 */}
      <div className="flex gap-2 flex-wrap">
        <select value={filterLesson} onChange={e => setFilterLesson(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="">전체 레슨</option>
          {lessons.map(l => <option key={l} value={l}>{l} · {getLessonName(l, "ko")}</option>)}
        </select>
        <select value={filterStudent} onChange={e => setFilterStudent(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="">전체 학생</option>
          {students.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterGrade} onChange={e => setFilterGrade(e.target.value as typeof filterGrade)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="needs_review">선생님 확인 필요</option>
          <option value="ungraded">미채점만</option>
          <option value="fail">오답만 ❌</option>
          <option value="auto">자동채점 ✅</option>
          <option value="pass">선생님 정답 ✅</option>
          <option value="">전체 보기</option>
        </select>
        {(filterLesson || filterStudent || filterGrade) && (
          <button onClick={() => { setFilterLesson(""); setFilterStudent(""); setFilterGrade("") }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-800">
            초기화
          </button>
        )}
      </div>

      <p className="text-sm text-gray-400">{filtered.length}개 표시 중</p>

      {/* 제출 목록 */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">제출된 숙제가 없어요</div>
        )}
        {filtered.map(grp => {
          const grade = grades[grp.key] ?? null
          const isOpen = expandedKey === grp.key
          const title = stripEmoji(grp.step_title) || grp.step_title
          const isAutoPass = grade === "auto"
          const isSaving = saving === grp.key
          const code = loadedCode[grp.latestId]

          return (
            <div key={grp.key} className={cn(
              "border rounded-xl overflow-hidden bg-white",
              grade === "pass" || grade === "auto" ? "border-green-200" :
              grade === "fail" ? "border-red-200" : "border-amber-100",
              isAutoPass && "opacity-55"
            )}>
              <div className="flex items-center px-4 py-3 gap-3">
                {/* 채점 */}
                <div className="flex gap-1 flex-shrink-0 items-center">
                  {isAutoPass ? (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold whitespace-nowrap">자동 ✅</span>
                  ) : (
                    <>
                      <button onClick={() => setGrade(grp, grade === "pass" ? null : "pass")} disabled={isSaving}
                        className={cn("w-7 h-7 rounded-full flex items-center justify-center border transition-all",
                          grade === "pass" ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-200 text-gray-300 hover:border-green-400 hover:text-green-500")}>
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setGrade(grp, grade === "fail" ? null : "fail")} disabled={isSaving}
                        className={cn("w-7 h-7 rounded-full flex items-center justify-center border transition-all",
                          grade === "fail" ? "bg-red-500 border-red-500 text-white"
                            : "border-gray-200 text-gray-300 hover:border-red-400 hover:text-red-500")}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* 제목 + 메타 */}
                <button onClick={() => toggleExpand(grp)} className="flex-1 flex items-center gap-3 text-left min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-bold truncate",
                      grade === "pass" || grade === "auto" ? "text-green-700" :
                      grade === "fail" ? "text-red-600" : "text-gray-800")}>
                      {title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-[11px] text-indigo-600 font-medium">
                        {grp.lesson_id} · {getLessonName(grp.lesson_id, "ko")}
                      </span>
                      <span className="text-[11px] text-gray-500">{grp.student_name}</span>
                      {grp.count > 1 && grade === null && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">🔄 재도전 ({grp.count}번째)</span>
                      )}
                      {grp.count > 1 && grade !== null && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{grp.count}번 제출</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {grade === null && (
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-bold">확인 필요</span>
                    )}
                    <span className="text-[11px] text-gray-400">{timeAgo(grp.latestSubmittedAt)}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
              </div>

              {/* 펼쳐진 뷰 — 코드 + 기대 출력 */}
              {isOpen && (
                <div className="border-t border-gray-100">
                  {/* 문제 설명 */}
                  {grp.problem_description && (
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-start gap-2">
                      <span className="text-[11px] font-bold text-gray-500 flex-shrink-0 mt-0.5">문제</span>
                      <p className="text-[12px] text-gray-700 whitespace-pre-wrap flex-1">{grp.problem_description}</p>
                    </div>
                  )}
                  {/* 기대 출력 (있을 때만) */}
                  {grp.expected_output && (
                    <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-start gap-2">
                      <span className="text-[11px] font-bold text-blue-600 flex-shrink-0 mt-0.5">기대 출력</span>
                      <pre className="text-[11px] text-blue-800 font-mono whitespace-pre-wrap flex-1">{grp.expected_output}</pre>
                    </div>
                  )}
                  {!grp.expected_output && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-[11px] text-gray-400">자유 구현 — 기대 출력 없음 · 직접 확인 필요</span>
                    </div>
                  )}
                  {/* 코드 */}
                  {codeLoading && isOpen && !code ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                  ) : code ? (
                    <CodeBlock code={code} language="cpp" />
                  ) : null}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 더 불러오기 */}
      {hasMore && (
        <div className="text-center pt-2">
          <button onClick={loadMore} disabled={loadingMore}
            className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors">
            {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "더 불러오기"}
          </button>
          <p className="text-xs text-gray-400 mt-1">30개씩 표시</p>
        </div>
      )}
    </div>
  )
}
