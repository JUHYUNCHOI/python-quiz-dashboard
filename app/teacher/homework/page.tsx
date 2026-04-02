"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CodeBlock } from "@/components/ui/code-block"
import { Loader2, ChevronDown, ChevronUp, Check, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLessonName } from "@/lib/curriculum-data"
import { BottomNav } from "@/components/bottom-nav"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

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
  teacher_comment: string | null
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
  teacher_comment: string | null
}

type Grade = "pass" | "fail" | "auto" | null

function stripEmoji(s: string) {
  return s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim()
}

function timeAgo(iso: string, lang: "ko" | "en" = "ko") {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return lang === "en" ? "Just now" : "방금"
  if (h < 1) return lang === "en" ? `${m}m ago` : `${m}분 전`
  if (d < 1) return lang === "en" ? `${h}h ago` : `${h}시간 전`
  if (d < 7) return lang === "en" ? `${d}d ago` : `${d}일 전`
  const dt = new Date(iso)
  return `${dt.getMonth()+1}/${dt.getDate()}`
}

const PAGE_SIZE = 30

export default function HomeworkPage() {
  const router = useRouter()
  const { profile, isLoading: authLoading } = useAuth()
  const { t, lang } = useLanguage()
  const [groups, setGroups] = useState<SubmissionGroup[]>([])
  const [grades, setGrades] = useState<Record<string, Grade>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [comments, setComments] = useState<Record<string, string>>({})

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
          teacher_comment: sub.teacher_comment,
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
      .select("id, student_id, student_name, lesson_id, step_id, step_title, submitted_at, teacher_grade, teacher_comment, expected_output, problem_description")
      .order("submitted_at", { ascending: false })
      .range(off, off + PAGE_SIZE - 1)

    if (error) { setError((lang === "en" ? "Failed to load: " : "불러오기 실패: ") + error.message); return }

    const rows = (data || []) as SubmissionMeta[]
    setHasMore(rows.length === PAGE_SIZE)

    setGroups(prev => {
      const base = append ? prev : []
      const built = buildGroups(rows, base)
      const gradeMap: Record<string, Grade> = {}
      const commentMap: Record<string, string> = {}
      for (const g of built) {
        gradeMap[g.key] = (g.teacher_grade as Grade) ?? null
        commentMap[g.key] = g.teacher_comment ?? ""
      }
      setGrades(prev2 => ({ ...prev2, ...gradeMap }))
      setComments(prev2 => ({ ...prev2, ...commentMap }))
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
      setError(t("채점 저장 실패: ", "Failed to save grade: ") + error.message)
    } else {
      setGrades(prev => ({ ...prev, [grp.key]: grade }))
      setGroups(prev => prev.map(g => g.key === grp.key ? { ...g, teacher_grade: grade } : g))
      // 채점 완료 후 현재 항목 닫기 → 다음 미채점 항목이 상단에 보임
      if (grade !== null) setExpandedKey(null)
    }
    setSaving(null)
  }

  const saveComment = async (grp: SubmissionGroup, comment: string) => {
    const supabase = createClient()
    await supabase.from("homework_submissions").update({ teacher_comment: comment || null }).in("id", grp.allIds)
    setGroups(prev => prev.map(g => g.key === grp.key ? { ...g, teacher_comment: comment || null } : g))
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

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-5xl animate-bounce">🦒</div>
    </div>
  )

  if (profile?.role !== "teacher") return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-4xl">🔒</div>
      <p className="font-bold text-gray-700">{t("선생님 전용 페이지입니다", "This page is for teachers only")}</p>
      <Link href="/login" className="px-6 py-2 rounded-xl bg-orange-500 text-white font-bold">{t("로그인", "Login")}</Link>
      <BottomNav />
    </div>
  )

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  )

  return (
    <div className="min-h-screen">
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 space-y-5">

      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("뒤로", "Back")}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">📋 {t("숙제 제출 현황", "Homework Submissions")}</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap text-sm">
            <span className="text-gray-500">{t(`${groups.length}개 문제 · ${totalSubmissions}회 제출`, `${groups.length} problems · ${totalSubmissions} submissions`)}</span>
            {autoCount > 0 && <span className="text-green-600 font-semibold">{t(`자동채점 ${autoCount}개 ✅`, `Auto-graded ${autoCount} ✅`)}</span>}
            {ungradedCount > 0 && <span className="text-amber-600 font-semibold">{t(`확인 필요 ${ungradedCount}개`, `${ungradedCount} need review`)}</span>}
          </div>
        </div>
        {ungradedCount > 0 && (
          <button onClick={markAllReviewed} disabled={saving === "all"}
            className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors flex-shrink-0 disabled:opacity-50">
            {saving === "all" ? t("처리 중…", "Processing…") : t("전체 확인 완료", "Mark all reviewed")}
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}

      {/* 필터 */}
      <div className="flex gap-2 flex-wrap">
        <select value={filterLesson} onChange={e => setFilterLesson(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="">{t("전체 레슨", "All lessons")}</option>
          {lessons.map(l => <option key={l} value={l}>{l} · {getLessonName(l, lang)}</option>)}
        </select>
        <select value={filterStudent} onChange={e => setFilterStudent(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="">{t("전체 학생", "All students")}</option>
          {students.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterGrade} onChange={e => setFilterGrade(e.target.value as typeof filterGrade)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
          <option value="needs_review">{t("선생님 확인 필요", "Needs teacher review")}</option>
          <option value="ungraded">{t("미채점만", "Ungraded only")}</option>
          <option value="fail">{t("오답만 ❌", "Wrong only ❌")}</option>
          <option value="auto">{t("자동채점 ✅", "Auto-graded ✅")}</option>
          <option value="pass">{t("선생님 정답 ✅", "Teacher approved ✅")}</option>
          <option value="">{t("전체 보기", "Show all")}</option>
        </select>
        {(filterLesson || filterStudent || filterGrade) && (
          <button onClick={() => { setFilterLesson(""); setFilterStudent(""); setFilterGrade("") }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-800">
            {t("초기화", "Reset")}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-400">{t(`${filtered.length}개 표시 중`, `Showing ${filtered.length}`)}</p>

      {/* 제출 목록 */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">{t("제출된 숙제가 없어요", "No submitted homework")}</div>
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
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold whitespace-nowrap">{t("자동 ✅", "Auto ✅")}</span>
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
                        {grp.lesson_id} · {getLessonName(grp.lesson_id, lang)}
                      </span>
                      <span className="text-[11px] text-gray-500">{grp.student_name}</span>
                      {grp.count > 1 && grade === null && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">🔄 {t(`재도전 (${grp.count}번째)`, `Retry (${grp.count}×)`)}</span>
                      )}
                      {grp.count > 1 && grade !== null && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{t(`${grp.count}번 제출`, `${grp.count} submissions`)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {grade === null && (
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-bold">{t("확인 필요", "Needs review")}</span>
                    )}
                    <span className="text-[11px] text-gray-400">{timeAgo(grp.latestSubmittedAt, lang)}</span>
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
                      <span className="text-[11px] font-bold text-gray-500 flex-shrink-0 mt-0.5">{t("문제", "Problem")}</span>
                      <p className="text-[12px] text-gray-700 whitespace-pre-wrap flex-1">{grp.problem_description}</p>
                    </div>
                  )}
                  {/* 기대 출력 (있을 때만) */}
                  {grp.expected_output && (
                    <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-start gap-2">
                      <span className="text-[11px] font-bold text-blue-600 flex-shrink-0 mt-0.5">{t("기대 출력", "Expected output")}</span>
                      <pre className="text-[11px] text-blue-800 font-mono whitespace-pre-wrap flex-1">{grp.expected_output}</pre>
                    </div>
                  )}
                  {!grp.expected_output && (
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="text-[11px] text-gray-400">{t("자유 구현 — 기대 출력 없음 · 직접 확인 필요", "Open-ended — no expected output · manual review needed")}</span>
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

                  {/* 선생님 코멘트 */}
                  <div className="px-4 py-3 border-t border-gray-100 bg-amber-50/40">
                    <p className="text-[11px] font-bold text-amber-700 mb-1.5">✏️ {t("선생님 코멘트", "Teacher comment")}</p>
                    <textarea
                      value={comments[grp.key] ?? ""}
                      onChange={e => setComments(prev => ({ ...prev, [grp.key]: e.target.value }))}
                      onBlur={e => saveComment(grp, e.target.value)}
                      placeholder={t("학생에게 피드백을 남겨주세요 (저장은 자동)", "Leave feedback for the student (auto-saved)")}
                      rows={2}
                      className="w-full text-sm text-gray-700 bg-white border border-amber-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 resize-none placeholder:text-gray-300"
                    />
                  </div>
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
            {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : t("더 불러오기", "Load more")}
          </button>
          <p className="text-xs text-gray-400 mt-1">{t("30개씩 표시", "30 per page")}</p>
        </div>
      )}
    </div>
    <BottomNav />
    </div>
  )
}
