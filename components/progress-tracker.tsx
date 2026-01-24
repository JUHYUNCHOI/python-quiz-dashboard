"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Topic {
  name: string
  progress: number
  completed: boolean
  locked: boolean
}

const topics: Topic[] = [
  { name: "Python 기초", progress: 100, completed: true, locked: false },
  { name: "자료구조", progress: 60, completed: false, locked: false },
  { name: "함수", progress: 30, completed: false, locked: false },
  { name: "객체지향", progress: 0, completed: false, locked: true },
]

interface ProgressTrackerProps {
  onTopicSelect: (topic: string | null) => void
}

export function ProgressTracker({ onTopicSelect }: ProgressTrackerProps) {
  const overallProgress = Math.round(topics.reduce((acc, t) => acc + t.progress, 0) / topics.length)

  return (
    <Card className="border-0 bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-bold">학습 진도</h2>

      {/* Growing Giraffe */}
      <div className="relative mb-8 flex h-64 items-end justify-center rounded-2xl bg-gradient-to-b from-orange-50 to-mint-50 p-4">
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-md">
          {overallProgress}%
        </div>
        <div
          className="flex flex-col items-center transition-all duration-1000"
          style={{ height: `${overallProgress}%` }}
        >
          <div className="text-6xl">🦒</div>
          <div className="mt-2 h-full w-2 rounded-full bg-gradient-to-t from-orange-400 to-orange-200" />
        </div>
      </div>

      {/* Progress List */}
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => !topic.locked && onTopicSelect(topic.name)}
            disabled={topic.locked}
            className={cn(
              "w-full rounded-xl border-2 p-4 text-left transition-all duration-300",
              topic.locked
                ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
                : "border-transparent bg-gradient-to-r hover:scale-105 hover:shadow-md",
              topic.completed && "from-green-50 to-mint-50",
              !topic.completed && !topic.locked && "from-orange-50 to-lavender-50",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{topic.name}</span>
                  {topic.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {topic.locked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      topic.completed ? "bg-green-500" : "bg-gradient-to-r from-orange-400 to-lavender-400",
                    )}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>
              <span className="ml-4 text-lg font-bold text-muted-foreground">{topic.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}
