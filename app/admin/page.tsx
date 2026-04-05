"use client"

import { useState } from "react"
import { FileUpload } from "@/components/admin/file-upload"
import { QuestionBank } from "@/components/admin/question-bank"
import { QuestionEditor } from "@/components/admin/question-editor"
import { GeneratedQuestionsReview } from "@/components/admin/generated-questions-review"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, Menu, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function AdminPage() {
  const { isAuthenticated, profile, isLoading: authLoading } = useAuth()

  // hooks는 조건부 return 전에 모두 선언해야 함 (Rules of Hooks)
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null)
  const [isNewQuestion, setIsNewQuestion] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bankKey, setBankKey] = useState(0)
  const [activeTab, setActiveTab] = useState<"questions" | "upload">("questions")

  // 인증 가드
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[60px] animate-bounce">🦒</div>
      </div>
    )
  }
  if (!isAuthenticated || profile?.role !== "teacher") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h2 className="text-xl font-bold text-gray-800">관리자 전용 페이지</h2>
          <p className="text-gray-500">선생님 계정으로 로그인이 필요합니다</p>
          <Link href="/login" className="inline-block px-6 py-2 rounded-xl bg-orange-500 text-white font-bold">로그인</Link>
        </div>
      </div>
    )
  }

  const handleSaved = () => {
    setBankKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-lg p-2 hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="메뉴"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <Link href="/" className="hidden md:block">
                <Button variant="ghost" size="sm" className="min-h-[44px]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  학생 화면으로
                </Button>
              </Link>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">강의 자료 관리</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">AI로 퀴즈 문제를 자동 생성하세요</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="min-h-[44px] bg-transparent">
              <Settings className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">설정</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full justify-start min-h-[44px]" onClick={() => setMobileMenuOpen(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />학생 화면으로
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start min-h-[44px]" onClick={() => { setActiveTab("questions"); setMobileMenuOpen(false) }}>
                문제 은행
              </Button>
              <Button variant="ghost" className="w-full justify-start min-h-[44px]" onClick={() => { setActiveTab("upload"); setMobileMenuOpen(false) }}>
                파일 업로드
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 border-r bg-gray-50 min-h-screen sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto shrink-0">
          <nav className="p-3 space-y-1">
            {[
              { id: "questions", label: "📋 문제 은행" },
              { id: "upload",    label: "📂 파일 업로드" },
            ].map(({ id, label }) => (
              <Button
                key={id}
                variant="ghost"
                className={`w-full justify-start min-h-[44px] text-sm ${activeTab === id ? "bg-orange-100 text-orange-700 font-semibold" : ""}`}
                onClick={() => setActiveTab(id as any)}
              >
                {label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 md:py-8">
          {activeTab === "questions" && (
            <QuestionBank
              key={bankKey}
              onEditQuestion={(q) => { setEditingQuestion(q); setIsNewQuestion(false) }}
              onNewQuestion={() => { setEditingQuestion(null); setIsNewQuestion(true) }}
            />
          )}

          {activeTab === "upload" && (
            <>
              {generatedQuestions.length === 0 ? (
                <FileUpload
                  onGenerated={(qs) => { setGeneratedQuestions(qs); }}
                />
              ) : (
                <GeneratedQuestionsReview
                  questions={generatedQuestions}
                  onComplete={() => { setGeneratedQuestions([]); setBankKey(k => k + 1); setActiveTab("questions") }}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Question Editor Modal */}
      {(editingQuestion || isNewQuestion) && (
        <QuestionEditor
          question={editingQuestion}
          onClose={() => { setEditingQuestion(null); setIsNewQuestion(false) }}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
