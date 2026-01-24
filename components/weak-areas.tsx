"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const weakTopics = [
  {
    name: "리스트 슬라이싱",
    successRate: 45,
    questionsToReview: 12,
    color: "orange",
  },
  {
    name: "딕셔너리 메서드",
    successRate: 58,
    questionsToReview: 8,
    color: "lavender",
  },
  {
    name: "재귀 함수",
    successRate: 62,
    questionsToReview: 15,
    color: "mint",
  },
]

export function WeakAreas() {
  return (
    <Card className="border-0 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-2">
        <AlertCircle className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold">약점 보완하기</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {weakTopics.map((topic, index) => (
          <Card
            key={index}
            className="group border-2 border-transparent bg-gradient-to-br from-orange-50 to-lavender-50 p-5 transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:shadow-lg"
          >
            <h3 className="mb-3 font-semibold">{topic.name}</h3>

            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">정답률</span>
                <span className="font-bold text-orange-600">{topic.successRate}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${topic.successRate}%` }}
                />
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">복습할 문제: {topic.questionsToReview}개</p>

            <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 font-semibold text-white transition-all duration-300 hover:from-orange-500 hover:to-orange-600">
              연습하기
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  )
}
