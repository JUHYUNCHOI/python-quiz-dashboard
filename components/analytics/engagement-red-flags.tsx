"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"

export function EngagementRedFlags() {
  const [isExpanded, setIsExpanded] = useState(false)

  const mediumConcerns = [
    {
      message: "평균 답변 시간이 너무 짧아요 (15초)",
      dateRange: "10월 21일 - 10월 23일",
      data: "평균 15초/문제",
      action: "더 천천히 생각하도록 격려해주세요",
    },
    {
      message: "자주 앱을 나갔다가 들어와요",
      dateRange: "10월 23일",
      data: "20분 동안 8번 전환",
      action: "조용한 환경에서 학습하도록 도와주세요",
    },
  ]

  const highConcerns = [
    {
      message: "3일간 정답률이 30% 이하예요",
      dateRange: "10월 18일 - 10월 20일",
      data: "평균 정답률 28%",
      action: "난이도를 낮추거나 복습이 필요할 수 있어요",
    },
  ]

  return (
    <Card className="p-6 bg-white shadow-lg border-2 border-yellow-100">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-bold text-slate-800">주의 필요</h2>
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            {mediumConcerns.length + highConcerns.length}개
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-600" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {/* High Concerns */}
          {highConcerns.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">🔴 높은 우선순위</h3>
              <div className="space-y-3">
                {highConcerns.map((concern, index) => (
                  <Card key={index} className="p-4 bg-red-50 border-2 border-red-200">
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="font-semibold text-slate-800">{concern.message}</p>
                        <p className="text-sm text-slate-600 mt-1">{concern.dateRange}</p>
                        <p className="text-sm font-medium text-red-700 mt-1">{concern.data}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 text-sm text-slate-700 bg-white p-3 rounded border border-slate-200">
                          💡 {concern.action}
                        </div>
                        <Button size="sm" className="gap-2 bg-red-600 hover:bg-red-700">
                          <MessageCircle className="h-4 w-4" />
                          학생과 대화하기
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Medium Concerns */}
          {mediumConcerns.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">🟡 중간 우선순위</h3>
              <div className="space-y-3">
                {mediumConcerns.map((concern, index) => (
                  <Card key={index} className="p-4 bg-yellow-50 border-2 border-yellow-200">
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="font-semibold text-slate-800">{concern.message}</p>
                        <p className="text-sm text-slate-600 mt-1">{concern.dateRange}</p>
                        <p className="text-sm font-medium text-yellow-700 mt-1">{concern.data}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 text-sm text-slate-700 bg-white p-3 rounded border border-slate-200">
                          💡 {concern.action}
                        </div>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <MessageCircle className="h-4 w-4" />
                          학생과 대화하기
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
