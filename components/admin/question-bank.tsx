"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Edit, Trash2, Sparkles, BarChart3, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface QuestionBankProps {
  onEditQuestion: (question: any) => void
}

export function QuestionBank({ onEditQuestion }: QuestionBankProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체")

  const mockQuestions = [
    {
      id: 1,
      question: "다음 코드의 출력 결과는? x = 10; y = 20; print(x + y)",
      category: "변수와 데이터 타입",
      difficulty: "초급",
      usageCount: 45,
      correctRate: 87,
    },
    {
      id: 2,
      question: "리스트에서 마지막 요소를 제거하는 메서드는?",
      category: "리스트와 딕셔너리",
      difficulty: "초급",
      usageCount: 38,
      correctRate: 92,
    },
    {
      id: 3,
      question: "다음 중 for 루프의 올바른 문법은?",
      category: "조건문과 반복문",
      difficulty: "중급",
      usageCount: 52,
      correctRate: 73,
    },
    {
      id: 4,
      question: "함수에서 여러 값을 반환하는 방법은?",
      category: "함수와 모듈",
      difficulty: "중급",
      usageCount: 29,
      correctRate: 68,
    },
    {
      id: 5,
      question: "딕셔너리의 키로 사용할 수 없는 데이터 타입은?",
      category: "리스트와 딕셔너리",
      difficulty: "고급",
      usageCount: 21,
      correctRate: 54,
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">문제 은행</h2>
          <p className="text-sm text-gray-600">총 {mockQuestions.length}개의 문제</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Sparkles className="h-4 w-4 mr-2" />
          AI로 문제 생성
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="문제 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              카테고리: {selectedCategory}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory("전체")}>전체</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("변수와 데이터 타입")}>
              변수와 데이터 타입
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("조건문과 반복문")}>조건문과 반복문</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("함수와 모듈")}>함수와 모듈</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("리스트와 딕셔너리")}>
              리스트와 딕셔너리
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              난이도: {selectedDifficulty}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedDifficulty("전체")}>전체</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedDifficulty("초급")}>초급</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedDifficulty("중급")}>중급</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedDifficulty("고급")}>고급</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Questions Table */}
      <div className="space-y-3">
        {mockQuestions.map((question) => (
          <div
            key={question.id}
            className="p-4 border rounded-lg hover:border-orange-300 hover:bg-orange-50/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2 line-clamp-2">{question.question}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {question.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      question.difficulty === "초급"
                        ? "border-green-500 text-green-700"
                        : question.difficulty === "중급"
                          ? "border-orange-500 text-orange-700"
                          : "border-red-500 text-red-700"
                    }
                  >
                    {question.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <BarChart3 className="h-3 w-3" />
                    사용 {question.usageCount}회 · 정답률 {question.correctRate}%
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" onClick={() => onEditQuestion(question)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
