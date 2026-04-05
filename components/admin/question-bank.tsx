"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { LessonSelect } from "./lesson-select"

export interface DBQuestion {
  id: number
  language: string
  lesson_id: string
  difficulty: string
  question: string
  code: string | null
  options: string[]
  correct_answer: number
  explanation: string | null
  key_concept_title: string | null
  key_concept_description: string | null
  related_topics: string[] | null
  animation_key: string | null
  code_comparison: { wrong: string; correct: string } | null
}

interface QuestionBankProps {
  onEditQuestion: (question: DBQuestion) => void
  onNewQuestion: () => void
}

const DIFFICULTY_COLORS: Record<string, string> = {
  "쉬움": "border-green-500 text-green-700",
  "보통": "border-orange-500 text-orange-700",
  "어려움": "border-red-500 text-red-700",
}

const PAGE_SIZE = 50

export function QuestionBank({ onEditQuestion, onNewQuestion }: QuestionBankProps) {
  const [questions, setQuestions] = useState<DBQuestion[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedLesson, setSelectedLesson] = useState("")
  const [language, setLanguage] = useState("전체")
  const [difficulty, setDifficulty] = useState("전체")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // 검색 디바운스
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 400)
    return () => clearTimeout(t)
  }, [searchQuery])

  // 필터 변경 시 페이지 초기화
  useEffect(() => { setPage(1) }, [debouncedSearch, selectedLesson, language, difficulty])

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true)
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) })
    if (language !== "전체") params.set("language", language)
    if (difficulty !== "전체") params.set("difficulty", difficulty)
    if (debouncedSearch) params.set("search", debouncedSearch)
    if (selectedLesson && selectedLesson !== "전체" && selectedLesson !== "") params.set("lessonId", selectedLesson)

    try {
      const res = await fetch(`/api/admin/questions?${params}`)
      const data = await res.json()
      setQuestions(data.questions ?? [])
      setTotal(data.total ?? 0)
    } finally {
      setIsLoading(false)
    }
  }, [page, language, difficulty, debouncedSearch, selectedLesson])

  useEffect(() => { fetchQuestions() }, [fetchQuestions])

  const handleDelete = async (id: number) => {
    if (!confirm(`문제 ID ${id}를 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)) return
    setDeletingId(id)
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" })
    setDeletingId(null)
    fetchQuestions()
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">문제 은행</h2>
          <p className="text-sm text-gray-500">총 {total.toLocaleString()}개</p>
        </div>
        <Button onClick={onNewQuestion} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          새 문제
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="문제 내용 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-56">
          <LessonSelect
            value={selectedLesson}
            onChange={setSelectedLesson}
            language={language === "전체" ? undefined : language}
            placeholder="레슨 필터"
            includeAll
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              언어: {language}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["전체", "python", "cpp"].map(v => (
              <DropdownMenuItem key={v} onClick={() => { setLanguage(v); setSelectedLesson("") }}>{v}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              난이도: {difficulty}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["전체", "쉬움", "보통", "어려움"].map(v => (
              <DropdownMenuItem key={v} onClick={() => setDifficulty(v)}>{v}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Questions List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="text-4xl animate-bounce">🦒</div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">문제가 없습니다</div>
      ) : (
        <div className="space-y-2">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-4 border rounded-lg hover:border-orange-300 hover:bg-orange-50/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs text-gray-400 font-mono mt-1 w-10 shrink-0">#{q.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 mb-2 line-clamp-2">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">{q.language}</Badge>
                    <Badge variant="outline" className="text-xs">레슨 {q.lesson_id}</Badge>
                    <Badge variant="outline" className={cn("text-xs", DIFFICULTY_COLORS[q.difficulty])}>
                      {q.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Button size="sm" variant="outline" onClick={() => onEditQuestion(q)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    disabled={deletingId === q.id}
                    onClick={() => handleDelete(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total}개
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline" size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-3 text-sm">{page} / {totalPages}</span>
            <Button
              variant="outline" size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
