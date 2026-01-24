"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isAnalyzing: boolean
}

export function FileUpload({ onFileUpload, isAnalyzing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === "application/pdf" || file.type === "text/plain")) {
      setSelectedFile(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <Card className="p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">강의 자료 업로드</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-12 text-center transition-all",
          isDragging
            ? "border-orange-400 bg-orange-50"
            : "border-gray-300 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/50",
        )}
      >
        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-16 w-16 text-orange-500 animate-spin" />
            <div className="text-6xl animate-bounce">🦒</div>
            <p className="text-lg font-semibold text-gray-900">AI가 자료를 분석하고 있어요...</p>
            <p className="text-sm text-gray-600">잠시만 기다려주세요</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <FileText className="h-16 w-16 text-orange-500" />
            <div>
              <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setSelectedFile(null)} variant="outline">
                다시 선택
              </Button>
              <Button onClick={handleAnalyze} className="bg-orange-500 hover:bg-orange-600 text-white">
                AI 분석 시작
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Upload className="h-16 w-16 text-gray-400" />
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">PDF 또는 텍스트 파일을 드래그하세요</p>
              <p className="text-sm text-gray-600 mb-4">또는 파일을 선택하세요</p>
            </div>
            <label>
              <input type="file" accept=".pdf,.txt" onChange={handleFileSelect} className="hidden" />
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer bg-transparent"
                onClick={(e) => {
                  e.preventDefault()
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                  input?.click()
                }}
              >
                파일 선택
              </Button>
            </label>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl">💡</div>
        <div className="text-sm text-gray-700">
          <p className="font-semibold mb-1">지원 형식</p>
          <p>PDF, TXT 파일을 업로드하면 AI가 자동으로 내용을 분석하고 적절한 퀴즈 문제를 생성합니다.</p>
        </div>
      </div>
    </Card>
  )
}
