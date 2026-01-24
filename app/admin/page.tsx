"use client"

import { useState } from "react"
import { FileUpload } from "@/components/admin/file-upload"
import { AnalysisResults } from "@/components/admin/analysis-results"
import { QuestionBank } from "@/components/admin/question-bank"
import { QuestionEditor } from "@/components/admin/question-editor"
import { GeneratedQuestionsReview } from "@/components/admin/generated-questions-review"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, Menu, X } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const handleGenerateQuestions = (questions: any[]) => {
    setGeneratedQuestions(questions)
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
                <Button
                  variant="ghost"
                  className="w-full justify-start min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  학생 화면으로
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start min-h-[44px]"
                onClick={() => {
                  setMobileMenuOpen(false)
                  // Navigate to question bank
                }}
              >
                문제 은행
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start min-h-[44px]"
                onClick={() => {
                  setMobileMenuOpen(false)
                  // Navigate to analytics
                }}
              >
                통계 보기
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar for tablet/desktop */}
        <aside className="hidden lg:block w-64 border-r bg-gray-50 min-h-screen sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start min-h-[44px]">
              파일 업로드
            </Button>
            <Button variant="ghost" className="w-full justify-start min-h-[44px]">
              문제 은행
            </Button>
            <Button variant="ghost" className="w-full justify-start min-h-[44px]">
              통계 보기
            </Button>
            <Button variant="ghost" className="w-full justify-start min-h-[44px]">
              설정
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">
          {/* File Upload Section */}
          {!analysisComplete && <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />}

          {/* Analysis Results */}
          {analysisComplete && !generatedQuestions.length && (
            <AnalysisResults fileName={uploadedFile?.name || ""} onGenerateQuestions={handleGenerateQuestions} />
          )}

          {/* Generated Questions Review */}
          {generatedQuestions.length > 0 && (
            <GeneratedQuestionsReview
              questions={generatedQuestions}
              onComplete={() => {
                setGeneratedQuestions([])
                setAnalysisComplete(false)
                setUploadedFile(null)
              }}
            />
          )}

          {/* Question Bank - Always visible at bottom */}
          <div className="mt-12">
            <QuestionBank onEditQuestion={setEditingQuestion} />
          </div>
        </main>
      </div>

      {/* Question Editor Modal */}
      {editingQuestion && (
        <QuestionEditor
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={(question) => {
            setEditingQuestion(null)
          }}
        />
      )}
    </div>
  )
}
