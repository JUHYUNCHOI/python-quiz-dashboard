"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CodeBlock } from "@/components/ui/code-block"
import { Loader2, ChevronDown, ChevronUp, User, BookOpen, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Submission {
  id: string
  student_id: string
  student_name: string
  lesson_id: string
  step_id: string
  step_title: string
  code: string
  submitted_at: string
}

export default function HomeworkPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [filterLesson, setFilterLesson] = useState("")
  const [filterStudent, setFilterStudent] = useState("")

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("homework_submissions")
        .select("*")
        .order("submitted_at", { ascending: false })
      if (error) {
        setError("데이터를 불러오지 못했어요: " + error.message)
      } else {
        setSubmissions(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const lessons = [...new Set(submissions.map(s => s.lesson_id))].sort()
  const students = [...new Set(submissions.map(s => s.student_name || s.student_id))].sort()

  const filtered = submissions.filter(s => {
    if (filterLesson && s.lesson_id !== filterLesson) return false
    if (filterStudent && (s.student_name || s.student_id) !== filterStudent) return false
    return true
  })

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📋 숙제 제출 현황</h1>
        <p className="text-sm text-gray-500 mt-1">총 {submissions.length}개 제출</p>
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}

      {/* 필터 */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={filterLesson}
          onChange={e => setFilterLesson(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
        >
          <option value="">전체 레슨</option>
          {lessons.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={filterStudent}
          onChange={e => setFilterStudent(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
        >
          <option value="">전체 학생</option>
          {students.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {(filterLesson || filterStudent) && (
          <button
            onClick={() => { setFilterLesson(""); setFilterStudent("") }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-800"
          >
            초기화
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500">{filtered.length}개 표시 중</p>

      {/* 제출 목록 */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">제출된 숙제가 없어요</div>
        )}
        {filtered.map(sub => (
          <div key={sub.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggle(sub.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {sub.student_name || sub.student_id.slice(0, 8)}
                </span>
                <span className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">
                  <BookOpen className="w-3 h-3" />
                  {sub.lesson_id}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[200px]">{sub.step_title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(sub.submitted_at)}
                </span>
                {expanded.has(sub.id)
                  ? <ChevronUp className="w-4 h-4 text-gray-400" />
                  : <ChevronDown className="w-4 h-4 text-gray-400" />
                }
              </div>
            </button>
            {expanded.has(sub.id) && (
              <div className="border-t border-gray-100">
                <CodeBlock code={sub.code} language="cpp" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
