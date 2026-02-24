"use client"

import { useState, useEffect, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, X, Sparkles, Lock, PartyPopper, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { LibraryToggle, type LibraryVariant } from "@/components/library-toggle"
import { SoundToggle } from "@/components/sound-toggle"
import { useSoundEffect } from "@/hooks/use-sound-effect"

// 분리된 컴포넌트
import { Confetti } from "@/components/learn/confetti"
import { SuccessOverlay } from "@/components/learn/success-overlay"
import { StepRenderer } from "@/components/learn/step-renderer"
import { lessonsData, bilingualLessons, lessonVariants } from "@/components/learn/lesson-registry"

export default function PracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  const { lang, t } = useLanguage()
  const { play, isMuted, toggleMute } = useSoundEffect()

  const isBilingual = lessonId in bilingualLessons
  const hasVariants = lessonId in lessonVariants

  // 라이브러리 변형 상태 (turtle/pygame)
  const [variant, setVariant] = useState<LibraryVariant>(() => {
    if (typeof window === 'undefined') return 'turtle'
    try { return (localStorage.getItem(`library-variant-${lessonId}`) as LibraryVariant) || 'turtle' } catch { return 'turtle' }
  })

  // 레슨 데이터 선택: variant가 있으면 variant[lang], 아니면 bilingual 또는 기본
  const lesson = hasVariants
    ? lessonVariants[lessonId][variant][lang]
    : (isBilingual ? bilingualLessons[lessonId][lang] : lessonsData[lessonId])

  // 진행상황 키: variant가 있으면 분리
  const progressKey = hasVariants ? `practice-v2-${lessonId}-${variant}` : `practice-v2-${lessonId}`
  
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showChapterComplete, setShowChapterComplete] = useState(false)
  const [showLessonComplete, setShowLessonComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [hintLevel, setHintLevel] = useState(0)
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [showChapterList, setShowChapterList] = useState(false)
  
  const chapter = lesson?.chapters[currentChapter]
  const step = chapter?.steps[currentStep]
  
  const isCurrentStepCompleted = step ? completedSteps.has(step.id) : false
  
  const canGoNext = () => {
    if (!step) return false
    if (step.type === "explain" || step.type === "interactive" || step.type === "tryit" || step.type === "animation") return true
    return isCurrentStepCompleted
  }

  // 기존 진행상황 마이그레이션 (practice-v2-p4 → practice-v2-p4-turtle)
  useEffect(() => {
    if (!hasVariants) return
    const oldKey = `practice-v2-${lessonId}`
    const newKey = `practice-v2-${lessonId}-turtle`
    if (localStorage.getItem(oldKey) && !localStorage.getItem(newKey)) {
      localStorage.setItem(newKey, localStorage.getItem(oldKey)!)
      localStorage.removeItem(oldKey)
    }
  }, [lessonId, hasVariants])

  // variant localStorage 저장
  useEffect(() => {
    if (hasVariants) {
      localStorage.setItem(`library-variant-${lessonId}`, variant)
    }
  }, [variant, lessonId, hasVariants])

  useEffect(() => {
    const saved = localStorage.getItem(progressKey)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCurrentChapter(data.chapter || 0)
        setCurrentStep(data.step || 0)
        setScore(data.score || 0)
        setCompletedSteps(new Set(data.completed || []))
      } catch {}
    }
  }, [progressKey])

  useEffect(() => {
    if (!lesson) return
    localStorage.setItem(progressKey, JSON.stringify({
      chapter: currentChapter, step: currentStep, score,
      completed: Array.from(completedSteps)
    }))
  }, [currentChapter, currentStep, score, completedSteps, progressKey, lesson])

  if (!lesson || !chapter || !step) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-gray-600 mb-4">준비 중인 레슨이에요</p>
          <button onClick={() => router.push(`/curriculum#lesson-${lessonId}`)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold">
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  // variant 전환 시 진행상황 로드
  const handleVariantChange = (newVariant: LibraryVariant) => {
    setVariant(newVariant)
    const saved = localStorage.getItem(`practice-v2-${lessonId}-${newVariant}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCurrentChapter(data.chapter || 0)
        setCurrentStep(data.step || 0)
        setScore(data.score || 0)
        setCompletedSteps(new Set(data.completed || []))
      } catch {
        setCurrentChapter(0); setCurrentStep(0); setScore(0); setCompletedSteps(new Set())
      }
    } else {
      setCurrentChapter(0); setCurrentStep(0); setScore(0); setCompletedSteps(new Set())
    }
    resetStepState()
  }

  const resetStepState = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    setHintLevel(0)
    setQuizAttempts(0)
  }

  const goNext = () => {
    if (!canGoNext()) return
    if (currentStep < chapter.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetStepState()
    } else if (currentChapter < lesson.chapters.length - 1) {
      setShowConfetti(true)
      setShowChapterComplete(true)
      play("chapterComplete")
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      setShowConfetti(true)
      setShowLessonComplete(true)
      play("lessonComplete")
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const goToNextChapter = () => {
    setShowChapterComplete(false)
    setCurrentChapter(currentChapter + 1)
    setCurrentStep(0)
    resetStepState()
  }

  const goToChapter = (chIdx: number) => {
    setCurrentChapter(chIdx)
    setCurrentStep(0)
    resetStepState()
    setShowChapterList(false)
    setShowChapterComplete(false)
    setShowLessonComplete(false)
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      resetStepState()
    } else if (currentChapter > 0) {
      const prevChapter = lesson.chapters[currentChapter - 1]
      setCurrentChapter(currentChapter - 1)
      setCurrentStep(prevChapter.steps.length - 1)
      resetStepState()
    }
  }

  const handleSuccess = useCallback(() => {
    if (!completedSteps.has(step.id)) {
      setScore(prev => prev + 10)
      setCompletedSteps(prev => new Set([...prev, step.id]))
      setShowConfetti(true)
      setSuccessMessage("잘했어요! 🎉")
      setShowSuccess(true)
      play("codeSuccess")
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [completedSteps, step?.id, play])

  const handleQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    setShowExplanation(true)
    setQuizAttempts(prev => prev + 1)
    if (idx === step.answer) {
      play("correct")
      if (!completedSteps.has(step.id)) {
        setScore(score + 10)
        setCompletedSteps(new Set([...completedSteps, step.id]))
        setShowConfetti(true)
        setSuccessMessage("정답! 🎉")
        setShowSuccess(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }
    } else {
      play("wrong")
    }
  }

  const retryQuiz = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const closeSuccessOverlay = useCallback(() => { setShowSuccess(false) }, [])

  const totalSteps = lesson.chapters.reduce((sum, ch) => sum + ch.steps.length, 0)
  const currentStepIndex = lesson.chapters.slice(0, currentChapter).reduce((sum, ch) => sum + ch.steps.length, 0) + currentStep + 1

  // 챕터 완료 화면
  if (showLessonComplete) {
    const totalPoints = score
    return (
      <>
        <Confetti show={showConfetti} />
        <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-5xl">{lesson.emoji}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">레슨 완료!</h1>
            <p className="text-lg text-gray-600 mb-2">{lesson.title}</p>
            <p className="text-gray-500 mb-6">모든 챕터를 끝냈어요!</p>
            <div className="bg-amber-50 rounded-2xl p-4 mb-6">
              <p className="text-amber-800 font-bold text-lg">총 {totalPoints}점 획득!</p>
            </div>
            <button onClick={() => { localStorage.removeItem(progressKey); router.push(`/curriculum#lesson-${lessonId}`) }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors">
              돌아가기
            </button>
          </div>
        </div>
      </>
    )
  }

  if (showChapterComplete) {
    const chapterPoints = chapter.steps.filter(s => s.type !== "explain" && completedSteps.has(s.id)).length * 10
    return (
      <>
        <Confetti show={showConfetti} />
        <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">챕터 {currentChapter + 1} 완료!</h1>
            <p className="text-lg text-gray-600 mb-6">{chapter.emoji} {chapter.title}</p>
            <div className="bg-amber-50 rounded-2xl p-4 mb-6">
              <p className="text-amber-800 font-bold text-lg">{chapterPoints}점 획득!</p>
            </div>
            <button onClick={goToNextChapter} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors">
              다음 챕터로 →
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Confetti show={showConfetti} />
      <SuccessOverlay show={showSuccess} message={successMessage} onClose={closeSuccessOverlay} />
      
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50/30">
        {/* 상단 헤더 */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => router.push(`/curriculum#lesson-${lessonId}`)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="flex-1 mx-3 md:mx-4 lg:mx-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <button onClick={() => setShowChapterList(!showChapterList)} className="flex items-center gap-1 text-xs md:text-sm text-gray-500 hover:text-indigo-600 transition-colors shrink-0">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">{chapter.emoji} {chapter.title}</span>
                    <span className="sm:hidden">{currentStepIndex}/{totalSteps}</span>
                  </button>
                  <div className="flex-1 h-2 md:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStepIndex / totalSteps) * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                {hasVariants && <LibraryToggle variant={variant} setVariant={handleVariantChange} />}
                {isBilingual && <LanguageToggle />}
                <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
                <span className="flex items-center gap-1 text-sm md:text-base font-bold text-amber-600">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> {score}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 챕터 목록 드롭다운 */}
        {showChapterList && (
          <div className="sticky top-[52px] md:top-[60px] z-20">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-b-2xl shadow-lg border border-t-0 border-gray-200 p-3 md:p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {lesson.chapters.map((ch, idx) => (
                    <button key={ch.id} onClick={() => goToChapter(idx)}
                      className={cn("flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all",
                        idx === currentChapter
                          ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300"
                          : "bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
                      )}>
                      <span className="text-lg">{ch.emoji}</span>
                      <span className="truncate">{ch.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
            <StepRenderer
              step={step}
              lang={lang}
              isCompleted={isCurrentStepCompleted}
              hintLevel={hintLevel}
              onHintLevelChange={setHintLevel}
              onSuccess={handleSuccess}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              quizAttempts={quizAttempts}
              onQuizAnswer={handleQuizAnswer}
              onQuizRetry={retryQuiz}
            />
          </div>
        </div>

        <div className="h-[70px] md:h-[90px] lg:h-[110px]" />
      </div>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-20">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 lg:py-4">
          <div className="flex gap-3 md:gap-4 lg:gap-6 justify-center">
            <button onClick={goPrev} disabled={currentStep === 0 && currentChapter === 0}
              className={cn("flex flex-col items-center justify-center rounded-xl md:rounded-2xl font-bold transition-colors", "w-[60px] h-[50px] md:w-[80px] md:h-[70px] lg:w-[100px] lg:h-[80px]",
                (currentStep > 0 || currentChapter > 0) ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "invisible")}>
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm lg:text-base">이전</span>
            </button>
            <button onClick={goNext} disabled={!canGoNext()}
              className={cn("flex flex-col items-center justify-center rounded-xl md:rounded-2xl font-bold transition-colors", "w-[60px] h-[50px] md:w-[80px] md:h-[70px] lg:w-[100px] lg:h-[80px]",
                canGoNext() ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed")}>
              {canGoNext() ? (
                <><ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" /><span className="text-xs md:text-sm lg:text-base">다음</span></>
              ) : (
                <><Lock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" /><span className="text-[10px] md:text-xs lg:text-sm">완료 필요</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
