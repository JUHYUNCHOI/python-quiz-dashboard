"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Sparkles } from "lucide-react"

interface AnalysisResultsProps {
  fileName: string
  onGenerateQuestions: (questions: any[]) => void
}

export function AnalysisResults({ fileName, onGenerateQuestions }: AnalysisResultsProps) {
  const mockTopics = [
    { name: "변수와 데이터 타입", difficulty: "초급", count: 5 },
    { name: "조건문과 반복문", difficulty: "중급", count: 7 },
    { name: "함수와 모듈", difficulty: "중급", count: 6 },
    { name: "리스트와 딕셔너리", difficulty: "초급", count: 4 },
  ]

  const handleGenerate = () => {
    // Mock generated questions
    const mockQuestions = [
      {
        id: 1,
        question: "다음 코드의 출력 결과는?\n\nx = 10\ny = 20\nprint(x + y)",
        options: ["10", "20", "30", "1020"],
        correctAnswer: 2,
        category: "변수와 데이터 타입",
        difficulty: "초급",
        explanation: "x와 y를 더한 결과는 30입니다.",
      },
      {
        id: 2,
        question: "리스트에서 마지막 요소를 제거하는 메서드는?",
        options: ["remove()", "pop()", "delete()", "clear()"],
        correctAnswer: 1,
        category: "리스트와 딕셔너리",
        difficulty: "초급",
        explanation: "pop() 메서드는 리스트의 마지막 요소를 제거하고 반환합니다.",
      },
      {
        id: 3,
        question: "다음 중 for 루프의 올바른 문법은?",
        options: ["for i in range(10):", "for (i = 0; i < 10; i++)", "for i to 10:", "for i = 1 to 10"],
        correctAnswer: 0,
        category: "조건문과 반복문",
        difficulty: "중급",
        explanation: "Python의 for 루프는 'for 변수 in 반복가능객체:' 형식을 사용합니다.",
      },
    ]
    onGenerateQuestions(mockQuestions)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-mint-50">
        <div className="flex items-start gap-4">
          <div className="text-6xl">🦒✨</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">분석 완료!</h2>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">{fileName}</span> 파일을 분석했어요.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white">
                <BookOpen className="h-3 w-3 mr-1" />총 22개 문제 생성 가능
              </Badge>
              <Badge variant="secondary" className="bg-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                4개 주제 감지
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">감지된 주제 및 난이도</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {mockTopics.map((topic, index) => (
            <div key={index} className="p-4 border rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                <Badge
                  variant="outline"
                  className={
                    topic.difficulty === "초급"
                      ? "border-green-500 text-green-700"
                      : topic.difficulty === "중급"
                        ? "border-orange-500 text-orange-700"
                        : "border-red-500 text-red-700"
                  }
                >
                  {topic.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">권장 문제 수: {topic.count}개</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">AI 문제 생성 준비 완료</h3>
            <p className="text-orange-100 text-sm">분석된 내용을 바탕으로 퀴즈 문제를 자동 생성합니다</p>
          </div>
          <Button onClick={handleGenerate} size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            <Sparkles className="h-4 w-4 mr-2" />
            문제 생성하기
          </Button>
        </div>
      </Card>
    </div>
  )
}
