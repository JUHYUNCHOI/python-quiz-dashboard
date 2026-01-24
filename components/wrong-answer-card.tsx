"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WrongAnswer {
  id: number
  question: string
  code?: string
  yourAnswer: string
  correctAnswer: string
  explanation: string
}

interface WrongAnswerCardProps {
  answer: WrongAnswer
  isExpanded: boolean
  onToggle: () => void
}

export function WrongAnswerCard({ answer, isExpanded, onToggle }: WrongAnswerCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-lg">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{answer.question}</h3>
          {answer.code && (
            <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-sm">
              <code className="font-mono text-green-400">{answer.code}</code>
            </pre>
          )}
        </div>
        <div className="ml-4">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t bg-gray-50 p-6">
          <div className="space-y-4">
            {/* Your answer */}
            <div className="rounded-xl bg-red-50 p-4">
              <p className="mb-1 text-sm font-semibold text-red-600">내 답변</p>
              <code className="font-mono text-red-700">{answer.yourAnswer}</code>
            </div>

            {/* Correct answer */}
            <div className="rounded-xl bg-green-50 p-4">
              <p className="mb-1 text-sm font-semibold text-green-600">정답</p>
              <code className="font-mono text-green-700">{answer.correctAnswer}</code>
            </div>

            {/* Explanation */}
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="mb-1 text-sm font-semibold text-blue-600">설명</p>
              <p className="text-sm text-gray-700">{answer.explanation}</p>
            </div>

            {/* Action button */}
            <Button className="w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 py-3 font-semibold text-white transition-all hover:shadow-lg">
              유사 문제 풀기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
