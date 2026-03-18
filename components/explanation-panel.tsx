"use client"

import { useState, useEffect, type ComponentType } from "react"
import { X, BookOpen, ChevronDown, ChevronUp, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import { useLanguage } from "@/contexts/language-context"
import registry from "./learn/component-registry"

interface ExplanationPanelProps {
  show: boolean
  yourAnswer: string
  correctAnswer: string
  explanation: string
  keyConceptTitle: string
  keyConceptDescription: string
  codeComparison?: {
    wrong: string
    correct: string
  }
  relatedTopics?: string[]
  animationKey?: string
  onClose: () => void
  onPracticeSimilar?: () => void
  onNext: () => void
}

export function ExplanationPanel({
  show,
  yourAnswer,
  correctAnswer,
  explanation,
  keyConceptTitle,
  keyConceptDescription,
  codeComparison,
  relatedTopics = [],
  animationKey,
  onClose,
  onNext,
}: ExplanationPanelProps) {
  const { t, lang } = useLanguage()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showRelated, setShowRelated] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AnimationComponent, setAnimationComponent] = useState<ComponentType<any> | null>(null)

  // 애니메이션 컴포넌트 동적 로드
  useEffect(() => {
    if (!animationKey || !show) {
      setAnimationComponent(null)
      return
    }
    const entry = registry[animationKey]
    if (!entry) return

    let cancelled = false
    entry.load().then((mod) => {
      if (cancelled) return
      const m = mod as Record<string, any>
      const Comp = entry.exportName ? m[entry.exportName] : m.default
      if (Comp) setAnimationComponent(() => Comp)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [animationKey, show])

  if (!show) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl shadow-2xl animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="text-4xl md:text-5xl">🦒💭</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{t("함께 다시 볼까요?", "Let's review together!")}</h3>
              <p className="text-sm text-gray-500">{t("차근차근 이해해봐요", "Let's understand step by step")}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full min-h-[44px] min-w-[44px]">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 md:px-6 py-6 space-y-6">
          <Card className="border-2 border-red-200 bg-[#FFF0F0] p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl">❌</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-red-900 mb-2 text-base md:text-lg">{t("선택한 답", "Your Answer")}</h4>
                <p className="font-mono text-sm md:text-base text-red-800 mb-3 bg-white/70 rounded-lg p-3">
                  {yourAnswer}
                </p>
                <p className="text-sm md:text-base text-red-700 leading-relaxed">{explanation}</p>
              </div>
            </div>
          </Card>

          <Card className="border-2 border-green-200 bg-[#F0FFF0] p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl">✓</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-green-900 mb-2 text-base md:text-lg">{t("정답", "Correct Answer")}</h4>
                <p className="font-mono text-sm md:text-base text-green-800 bg-white/70 rounded-lg p-3">
                  {correctAnswer}
                </p>
              </div>
            </div>
          </Card>

          {/* Code Comparison */}
          {codeComparison && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 text-base md:text-lg">
                <BookOpen className="h-5 w-5 text-orange-500" />
                {t("코드 비교", "Code Comparison")}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-red-600 mb-2">{t("틀린 이해", "Wrong approach")}</div>
                  <CodeDisplay code={codeComparison.wrong} showLineNumbers={false} maxHeight={300} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-600 mb-2">{t("올바른 이해", "Correct approach")}</div>
                  <CodeDisplay code={codeComparison.correct} showLineNumbers={false} maxHeight={300} />
                </div>
              </div>
            </div>
          )}

          {/* Interactive Animation */}
          {AnimationComponent && (
            <Card className="border-2 border-purple-200 bg-purple-50 p-4 md:p-5 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎬</span>
                <h4 className="font-bold text-purple-900 text-base md:text-lg">{t("시각적으로 이해하기", "Visual Explanation")}</h4>
              </div>
              <div className="rounded-xl overflow-hidden bg-white p-3">
                <AnimationComponent lang={lang} onSuccess={() => {}} />
              </div>
            </Card>
          )}

          <Card className="border-2 border-yellow-300 bg-yellow-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="text-3xl md:text-4xl">💡</div>
              <div className="flex-1">
                <h4 className="font-bold text-yellow-900 mb-2 text-base md:text-lg">{t("기억하세요!", "Remember!")}</h4>
                <p className="font-semibold text-yellow-800 mb-2">{keyConceptTitle}</p>
                <p className="text-sm md:text-base text-yellow-700 leading-relaxed">{keyConceptDescription}</p>
              </div>
            </div>
          </Card>

          {/* Related Topics */}
          {relatedTopics.length > 0 && (
            <div>
              <button
                onClick={() => setShowRelated(!showRelated)}
                className="flex items-center justify-between w-full text-left font-bold text-gray-800 mb-3 text-base md:text-lg min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-mint-500" />
                  {t("이것도 알아두세요", "Good to know")}
                </span>
                {showRelated ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {showRelated && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                  {relatedTopics.map((topic, index) => (
                    <Card
                      key={index}
                      className="p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-mint-200 hover:border-mint-400"
                    >
                      <p className="text-sm md:text-base text-gray-700 font-medium">{topic}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-6 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={onNext}
              className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-6 md:py-7 text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all min-h-[56px]"
            >
              {t("이해했어요, 다음 문제로", "Got it, next question")}
            </Button>
            <Button
              onClick={() => setIsBookmarked(!isBookmarked)}
              variant="outline"
              className={cn(
                "p-5 md:p-6 rounded-xl transition-colors min-h-[56px] min-w-[56px] flex items-center justify-center",
                isBookmarked && "bg-orange-100 border-orange-300",
              )}
              title="복습 목록에 추가"
            >
              <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-orange-500 text-orange-500")} />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 py-2">{t("비슷한 문제가 나중에 다시 나올 거예요 ✨", "Similar questions will come up again later ✨")}</p>
        </div>
      </div>
    </>
  )
}
