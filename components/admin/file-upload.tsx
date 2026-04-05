"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonSelect } from "./lesson-select"

interface FileUploadProps {
  onGenerated: (questions: any[]) => void
}

export function FileUpload({ onGenerated }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [language, setLanguage] = useState("python")
  const [lessonId, setLessonId] = useState("")

  const handleLanguageChange = (v: string) => {
    setLanguage(v)
    setLessonId("")
  }
  const [difficulty, setDifficulty] = useState("mixed")
  const [count, setCount] = useState("10")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(true)
  }, [])
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
  }, [])
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === "application/pdf" || file.type === "text/plain" || file.name.endsWith(".txt"))) {
      setSelectedFile(file); setError(null)
    }
  }, [])
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setSelectedFile(file); setError(null) }
  }

  const handleGenerate = async () => {
    if (!selectedFile) return
    setIsGenerating(true)
    setError(null)

    const form = new FormData()
    form.append("file", selectedFile)
    form.append("language", language)
    form.append("lessonId", lessonId)
    form.append("difficulty", difficulty)
    form.append("count", count)

    try {
      const res = await fetch("/api/admin/generate-questions", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "생성 실패"); return }
      onGenerated(data.questions)
    } catch {
      setError("네트워크 오류")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="p-8 max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">강의 자료 → 문제 자동 생성</h2>

      {/* 파일 드롭존 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 text-center transition-all mb-6",
          isDragging ? "border-orange-400 bg-orange-50" : "border-gray-300 bg-gray-50 hover:border-orange-300",
        )}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <FileText className="h-12 w-12 text-orange-500" />
            <p className="font-semibold text-gray-900">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>다시 선택</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="font-semibold text-gray-700">PDF 또는 TXT 파일을 드래그하세요</p>
            <label>
              <input type="file" accept=".pdf,.txt" onChange={handleFileSelect} className="hidden" />
              <Button type="button" variant="outline" size="sm" className="cursor-pointer"
                onClick={(e) => { e.preventDefault(); (e.currentTarget.previousElementSibling as HTMLInputElement)?.click() }}>
                파일 선택
              </Button>
            </label>
          </div>
        )}
      </div>

      {/* 옵션 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">언어</label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">레슨</label>
          <LessonSelect value={lessonId} onChange={setLessonId} language={language} placeholder="레슨 선택" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">난이도</label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mixed">혼합 (쉬움/보통/어려움)</SelectItem>
              <SelectItem value="쉬움">쉬움</SelectItem>
              <SelectItem value="보통">보통</SelectItem>
              <SelectItem value="어려움">어려움</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">생성할 문제 수</label>
          <Select value={count} onValueChange={setCount}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["5", "10", "15", "20"].map(n => (
                <SelectItem key={n} value={n}>{n}개</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mb-4">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Button
        onClick={handleGenerate}
        disabled={!selectedFile || isGenerating}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        size="lg"
      >
        {isGenerating ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />AI가 문제를 생성하고 있어요... (30~60초)</>
        ) : (
          "🤖 AI로 문제 생성하기"
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Claude Opus가 자료를 읽고 {count}개의 4지선다 문제를 만들어요
      </p>
    </Card>
  )
}
