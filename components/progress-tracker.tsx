"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import {
  pythonParts, cppParts,
  getCompletedLessons, getPartProgress, getOverallProgress,
  type PartMeta,
} from "@/lib/curriculum-data"

type CourseTab = "python" | "cpp"

interface ProgressTrackerProps {
  onTopicSelect: (topic: string | null) => void
}

export function ProgressTracker({ onTopicSelect }: ProgressTrackerProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<CourseTab>("python")
  const [completed, setCompleted] = useState<Set<number | string>>(new Set())

  useEffect(() => {
    setCompleted(getCompletedLessons())
  }, [])

  const parts = tab === "python" ? pythonParts : cppParts
  const partProgress = getPartProgress(parts, completed)
  const overall = getOverallProgress(parts, completed)

  return (
    <Card className="border-0 bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t("커리큘럼 진도", "Curriculum Progress")}</h2>
        <div className="flex gap-1">
          <button
            onClick={() => setTab("python")}
            className={cn("px-3 py-1 rounded-lg text-sm font-bold transition-colors",
              tab === "python" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600")}
          >
            Python
          </button>
          <button
            onClick={() => setTab("cpp")}
            className={cn("px-3 py-1 rounded-lg text-sm font-bold transition-colors",
              tab === "cpp" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600")}
          >
            C++
          </button>
        </div>
      </div>

      {/* Growing Giraffe */}
      <div className="relative mb-6 flex h-48 items-end justify-center rounded-2xl bg-gradient-to-b from-orange-50 to-mint-50 p-4">
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-md">
          {overall.progress}%
        </div>
        <div className="absolute right-4 top-4 text-xs text-gray-500">
          {overall.completedCount}/{overall.totalCount}
        </div>
        <div
          className="flex flex-col items-center transition-all duration-1000"
          style={{ height: `${Math.max(overall.progress, 15)}%` }}
        >
          <div className="text-5xl">🦒</div>
          <div className="mt-2 h-full w-2 rounded-full bg-gradient-to-t from-orange-400 to-orange-200" />
        </div>
      </div>

      {/* Progress List */}
      <div className="space-y-2">
        {partProgress.map(({ part, completedCount, totalCount, progress }) => (
          <button
            key={part.id}
            onClick={() => onTopicSelect(part.id)}
            className={cn(
              "w-full rounded-xl border-2 p-3 text-left transition-all duration-300",
              progress === 100
                ? "border-green-200 bg-gradient-to-r from-green-50 to-mint-50"
                : progress > 0
                  ? "border-transparent bg-gradient-to-r from-orange-50 to-lavender-50 hover:scale-[1.02] hover:shadow-md"
                  : "border-gray-100 bg-gray-50"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">
                    {t(part.title, part.titleEn)}
                  </span>
                  {progress === 100 && <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />}
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      progress === 100 ? "bg-green-500" : "bg-gradient-to-r from-orange-400 to-lavender-400",
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <span className="ml-3 text-sm font-bold text-muted-foreground flex-shrink-0">
                {completedCount}/{totalCount}
              </span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}
