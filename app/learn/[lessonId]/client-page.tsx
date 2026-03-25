"use client"

import { useState, useEffect, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, X, Lock, PartyPopper, RotateCcw, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { ProgrammingLanguageToggle } from "@/components/programming-language-toggle"
import { LibraryToggle, type LibraryVariant } from "@/components/library-toggle"
import { SoundToggle } from "@/components/sound-toggle"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { useLessonSync } from "@/hooks/use-lesson-sync"
import { markLessonComplete } from "@/lib/mark-lesson-complete"
import { useGamification } from "@/hooks/use-gamification"
import { logActivity } from "@/lib/activity-log"
import { getCompletedLessons, pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"
import { useAuth } from "@/contexts/auth-context"
import { analyzeLessonComplete, analyzeStreak } from "@/lib/feedback-analyzer"
import { LessonFeedbackCard } from "@/components/feedback/lesson-feedback-card"
import { StreakWidget } from "@/components/feedback/streak-widget"
import { CodeSubmissionProvider } from "@/contexts/code-submission-context"

// 분리된 컴포넌트
import { Confetti } from "@/components/learn/confetti"
import { SuccessOverlay } from "@/components/learn/success-overlay"
import { StepRenderer } from "@/components/learn/step-renderer"
import { lessonsData, bilingualLessons, lessonVariants } from "@/components/learn/lesson-registry"
import type { LessonStep } from "@/components/learn/types"
export default function PracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  const { lang, t } = useLanguage()
  const { play, isMuted, toggleMute } = useSoundEffect()

  const isBilingual = lessonId in bilingualLessons
  const hasVariants = lessonId in lessonVariants
  const currentProgrammingLang = lessonId.startsWith("pseudo-") || lessonId.startsWith("igcse-") ? "pseudo" as const : lessonId.startsWith("cpp-") ? "cpp" as const : "python" as const
  const isIGCSE = currentProgrammingLang === "pseudo"

  // 라이브러리 변형 상태 (turtle/pygame)
  const [variant, setVariant] = useState<LibraryVariant>(() => {
    if (typeof window === 'undefined') return 'turtle'
    try { return (localStorage.getItem(`library-variant-${lessonId}`) as LibraryVariant) || 'turtle' } catch { return 'turtle' }
  })

  // 게이미피케이션
  const gamification = useGamification()
  const { profile, isAuthenticated } = useAuth()
  const isTeacher = profile?.role === "teacher"

  // Supabase 진도 동기화
  const { syncProgress, syncCompletion, loadFromCloud } = useLessonSync(
    lessonId, hasVariants ? variant : null, "learn"
  )

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
  const [isAlreadyDone, setIsAlreadyDone] = useState(false) // 이미 완료한 레슨: 자유 탐색 허용
  const [progressLoaded, setProgressLoaded] = useState(false)
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
  // 선생님이 학생 시점으로 전환 (프로필에서 설정, localStorage 저장)
  // 복습 페이지에서 진입했는지 확인
  const fromReview = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("from") === "review"

  const teacherAsStudent = typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
  const effectiveTeacher = isTeacher && !teacherAsStudent

  const chapter = lesson?.chapters[currentChapter]
  const step = chapter?.steps[currentStep]

  const isCurrentStepCompleted = step ? completedSteps.has(step.id) : false
  
  const canGoNext = () => {
    if (!step) return false
    if (effectiveTeacher) return true // 선생님은 어디서든 자유롭게 이동
    if (isAlreadyDone) return true // 이미 완료한 레슨: 자유 탐색 (복습용)
    if (step.type === "explain" || step.type === "interactive" || step.type === "animation") return true
    if (step.type === "tryit" || step.type === "mission" || step.type === "coding" || step.type === "practice") return isCurrentStepCompleted
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
    // 이미 완료된 레슨이면 모든 스텝을 completed로 처리
    // (강의 내용 추가 후에도 이전에 완료한 학생은 모두 초록색으로 보임)
    const alreadyCompleted = getCompletedLessons()
    const lessonIdNorm: (number | string) = /^\d+$/.test(lessonId) ? Number(lessonId) : lessonId
    const isLessonAlreadyDone = alreadyCompleted.has(lessonIdNorm)

    const saved = localStorage.getItem(progressKey)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        // 범위 체크: 레슨 구조가 변경되었을 때 out-of-bounds 방지
        const maxCh = lesson ? lesson.chapters.length - 1 : 0
        const ch = Math.min(Math.max(data.chapter || 0, 0), maxCh)
        const maxSt = lesson?.chapters[ch]?.steps?.length ? lesson.chapters[ch].steps.length - 1 : 0
        const st = Math.min(Math.max(data.step || 0, 0), maxSt)
        setCurrentChapter(ch)
        setCurrentStep(st)
        setScore(data.score || 0)
        // 저장된 completed + 현재 위치 이전의 읽기 스텝(explain 등)만 자동 완료
        // quiz/predict/fillblank는 실제로 풀어야만 completed에 들어감
        const savedCompleted = new Set<string>(data.completed || [])
        if (isLessonAlreadyDone) setIsAlreadyDone(true)
        if (isLessonAlreadyDone && lesson) {
          // 이미 완료한 레슨: 읽기/실습 스텝만 자동 완료
          // quiz/predict/fillblank는 실제로 풀어야 progress bar에 초록색 표시
          // (canGoNext는 isAlreadyDone으로 별도 허용)
          const nonInteractiveTypes = ["explain", "interactive", "animation", "tryit", "practice", "coding", "mission"]
          for (const ch of lesson.chapters) {
            for (const s of ch.steps) {
              if (nonInteractiveTypes.includes(s.type)) savedCompleted.add(s.id)
            }
          }
        } else {
          const autoCompleteTypes = ["explain", "interactive", "practice", "animation", "tryit"]
          if (lesson) {
            for (let ci = 0; ci < lesson.chapters.length; ci++) {
              const steps = lesson.chapters[ci].steps
              for (let si = 0; si < steps.length; si++) {
                if ((ci < ch || (ci === ch && si < st)) && autoCompleteTypes.includes(steps[si].type)) {
                  savedCompleted.add(steps[si].id)
                }
              }
            }
          }
        }
        setCompletedSteps(savedCompleted)
      } catch {
        console.warn("[LessonPage] Failed to parse saved progress")
      }
      setProgressLoaded(true)
    } else {
      // localStorage 비어있으면 Supabase에서 복구 시도
      loadFromCloud().then(data => {
        // 클라우드 완료 마커(_cloudCompleted) 또는 localStorage 완료 기록 기준으로 판단
        const cloudIsDone = data?._cloudCompleted === true
        const isEffectivelyDone = isLessonAlreadyDone || cloudIsDone
        if (isEffectivelyDone) setIsAlreadyDone(true)

        if (!data || cloudIsDone) {
          // 진행 데이터 없음: 완료 레슨이면 읽기 스텝만 자동 완료
          if (isEffectivelyDone && lesson) {
            const nonInteractiveTypes = ["explain", "interactive", "animation", "tryit", "practice", "coding", "mission"]
            const autoCompleted = new Set<string>()
            for (const ch of lesson.chapters) {
              for (const s of ch.steps) {
                if (nonInteractiveTypes.includes(s.type)) autoCompleted.add(s.id)
              }
            }
            setCompletedSteps(autoCompleted)
          }
        } else {
          // 실제 진행 중인 클라우드 데이터 복구
          const cloudCh = (data.chapter as number) || 0
          const cloudSt = (data.step as number) || 0
          setCurrentChapter(cloudCh)
          setCurrentStep(cloudSt)
          setScore((data.score as number) || 0)
          const cloudCompletedSteps = new Set<string>((data.completed as string[]) || [])
          if (isEffectivelyDone && lesson) {
            const nonInteractiveTypes = ["explain", "interactive", "animation", "tryit", "practice", "coding", "mission"]
            for (const ch of lesson.chapters) {
              for (const s of ch.steps) {
                if (nonInteractiveTypes.includes(s.type)) cloudCompletedSteps.add(s.id)
              }
            }
          } else {
            const autoCompleteTypes = ["explain", "interactive", "practice", "animation", "tryit"]
            if (lesson) {
              for (let ci = 0; ci < lesson.chapters.length; ci++) {
                const steps = lesson.chapters[ci].steps
                for (let si = 0; si < steps.length; si++) {
                  if ((ci < cloudCh || (ci === cloudCh && si < cloudSt)) && autoCompleteTypes.includes(steps[si].type)) {
                    cloudCompletedSteps.add(steps[si].id)
                  }
                }
              }
            }
          }
          setCompletedSteps(cloudCompletedSteps)
        }
      }).finally(() => {
        // 클라우드 로드 완료 후에만 저장 이펙트 활성화 (초기 state 덮어쓰기 방지)
        setProgressLoaded(true)
      })
    }
  }, [progressKey, loadFromCloud])

  useEffect(() => {
    if (!lesson || !progressLoaded) return
    if (effectiveTeacher) return // 선생님 모드에서는 진도 저장 안함
    const progressData = {
      chapter: currentChapter, step: currentStep, score,
      completed: Array.from(completedSteps),
    }
    localStorage.setItem(progressKey, JSON.stringify(progressData))
    // Supabase에도 동기화 (debounced, fire-and-forget)
    syncProgress(progressData)
  }, [currentChapter, currentStep, score, completedSteps, progressKey, lesson, syncProgress, progressLoaded, effectiveTeacher])

  // 잠금 체크: 같은 트랙(Python/C++) 내에서 이전 수업 완료해야 접근 가능 (선생님은 전부 열림)
  const isLocked = (() => {
    if (typeof window === "undefined") return false
    if (isTeacher) return false
    const completed = getCompletedLessons()
    const idNormalized: (number | string) = /^\d+$/.test(lessonId) ? Number(lessonId) : lessonId
    // Python과 C++ 트랙을 분리하여 잠금 체크
    const isCpp = String(lessonId).startsWith("cpp-")
    const isPseudo = String(lessonId).startsWith("pseudo-")
    const isIgcse = String(lessonId).startsWith("igcse-")
    if (isPseudo || isIgcse) return false // 수도코드/IGCSE는 자유롭게 이동 가능
    const trackParts = isCpp ? cppParts : pythonParts
    const trackIds = trackParts.flatMap(p => p.lessonIds)
    const idx = trackIds.indexOf(idNormalized)
    if (idx <= 0) return false // 첫 수업 또는 알 수 없는 ID → 열림
    // 이전 수업이 모두 완료되었는지 확인
    for (let i = 0; i < idx; i++) {
      if (!completed.has(trackIds[i])) return true
    }
    return false
  })()

  // ── 훅은 반드시 early return 앞에 선언해야 함 (Rules of Hooks) ──
  const resetStepState = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    setHintLevel(0)
    setQuizAttempts(0)
  }

  const restoreCompletedStepState = useCallback((targetStep: LessonStep | undefined) => {
    if (effectiveTeacher || !targetStep || !completedSteps.has(targetStep.id)) {
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintLevel(0)
      setQuizAttempts(0)
      return
    }
    if ((targetStep.type === "quiz" || targetStep.type === "predict") && targetStep.answer !== undefined) {
      setSelectedAnswer(targetStep.answer)
      setShowExplanation(true)
      setHintLevel(0)
      setQuizAttempts(0)
    } else {
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintLevel(0)
      setQuizAttempts(0)
    }
  }, [completedSteps, effectiveTeacher])

  const handleSuccess = useCallback(() => {
    if (!step?.id || completedSteps.has(step.id)) return
    setCompletedSteps(prev => new Set([...prev, step.id]))
    if (isIGCSE) {
      play("codeSuccess")
    } else {
      if (!effectiveTeacher) setScore(prev => prev + 10)
      setShowConfetti(true)
      setSuccessMessage(t("잘했어요! 🎉", "Great job! 🎉"))
      setShowSuccess(true)
      play("codeSuccess")
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [completedSteps, step?.id, play, isIGCSE, effectiveTeacher, t])

  const closeSuccessOverlay = useCallback(() => { setShowSuccess(false) }, [])

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <p className="text-gray-600 mb-4">{t("이전 수업을 먼저 완료해주세요!", "Please complete previous lessons first!")}</p>
          <button onClick={() => router.push("/curriculum")} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold">
            {t("수업 목록으로", "Go to Curriculum")}
          </button>
        </div>
      </div>
    )
  }

  if (!lesson || !chapter || !step) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-gray-600 mb-4">{t("준비 중인 레슨이에요", "This lesson is coming soon")}</p>
          <button onClick={() => router.push(`/curriculum#lesson-${lessonId}`)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold">
            {t("돌아가기", "Go Back")}
          </button>
        </div>
      </div>
    )
  }

  // variant 전환 시 진행상황 로드 (load effect가 progressKey 변경 감지하여 처리)
  const handleVariantChange = (newVariant: LibraryVariant) => {
    setVariant(newVariant)
    setProgressLoaded(false) // 새 variant 데이터 로드 전까지 저장 차단
    setCurrentChapter(0)
    setCurrentStep(0)
    setScore(0)
    setCompletedSteps(new Set())
    resetStepState()
  }

  // 레슨 처음부터 다시 시작
  const restartLesson = () => {
    setCurrentChapter(0)
    setCurrentStep(0)
    setScore(0)
    setCompletedSteps(new Set())
    setShowChapterComplete(false)
    setShowLessonComplete(false)
    setShowChapterList(false)
    resetStepState()
    localStorage.removeItem(progressKey)
    // Supabase에도 리셋 동기화
    syncProgress({ chapter: 0, step: 0, score: 0, completed: [] })
  }

  const finishChapter = () => {
    if (currentChapter < lesson.chapters.length - 1) {
      if (!isIGCSE) setShowConfetti(true)
      setShowChapterComplete(true)
      play("chapterComplete")
      if (!isIGCSE) setTimeout(() => setShowConfetti(false), 3000)
    } else {
      // 마지막 챕터 완료 → 레슨 완료 기록 (선생님 모드에서도 completedLessons는 기록)
      markLessonComplete(lessonId)
      if (!effectiveTeacher) {
        syncCompletion(score)
        if (!isIGCSE) gamification.addDirectXp(30)
        logActivity("lesson")
      }
      if (!isIGCSE) setShowConfetti(true)
      setShowLessonComplete(true)
      play("lessonComplete")
      if (!isIGCSE) setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 50)
  }

  const goNext = () => {
    if (!canGoNext()) return
    // explain/interactive/practice 등 읽기 스텝만 자동 완료 처리
    // quiz/predict/fillblank는 실제로 풀어야 완료됨
    // 읽기 스텝은 넘어가면 자동 완료 (선생님 모드에서도 시각적 진행 표시, 저장은 useEffect에서 막음)
    if (step && !completedSteps.has(step.id) &&
        (step.type === "explain" || step.type === "interactive" || step.type === "animation")) {
      setCompletedSteps(prev => new Set([...prev, step.id]))
    }
    if (currentStep < chapter.steps.length - 1) {
      const nextStep = chapter.steps[currentStep + 1]
      setCurrentStep(currentStep + 1)
      restoreCompletedStepState(nextStep)
      scrollToTop()
    } else {
      finishChapter()
    }
  }

  const goToNextChapter = () => {
    setShowChapterComplete(false)
    setCurrentChapter(currentChapter + 1)
    setCurrentStep(0)
    resetStepState()
    scrollToTop()
  }

  const goToChapter = (chIdx: number) => {
    setCurrentChapter(chIdx)
    setCurrentStep(0)
    scrollToTop()
    resetStepState()
    setShowChapterList(false)
    setShowChapterComplete(false)
    setShowLessonComplete(false)
  }

  const goPrev = () => {
    if (currentStep > 0) {
      const prevStep = chapter.steps[currentStep - 1]
      setCurrentStep(currentStep - 1)
      restoreCompletedStepState(prevStep)
    } else if (currentChapter > 0) {
      const prevChapter = lesson.chapters[currentChapter - 1]
      if (!prevChapter || prevChapter.steps.length === 0) return
      const prevStep = prevChapter.steps[prevChapter.steps.length - 1]
      setCurrentChapter(currentChapter - 1)
      setCurrentStep(prevChapter.steps.length - 1)
      restoreCompletedStepState(prevStep)
    }
  }

  const handleQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    setShowExplanation(true)
    setQuizAttempts(prev => prev + 1)
    if (idx === step.answer) {
      play("correct")
      if (!completedSteps.has(step.id)) {
        if (!effectiveTeacher && !isIGCSE) setScore(prev => prev + 10)
        setCompletedSteps(prev => new Set([...prev, step.id]))
        if (!isIGCSE) {
          setShowConfetti(true)
          setSuccessMessage(t("정답! 🎉", "Correct! 🎉"))
          setShowSuccess(true)
          setTimeout(() => setShowConfetti(false), 2000)
        }
      }
    } else {
      play("wrong")
    }
  }

  // fillblank 등 새 인터랙티브 스텝용 핸들러
  const handleStepComplete = (correct: boolean) => {
    if (correct) {
      play("correct")
      if (!completedSteps.has(step.id)) {
        if (!effectiveTeacher && !isIGCSE) setScore(prev => prev + 10)
        setCompletedSteps(prev => new Set([...prev, step.id]))
        if (!isIGCSE) {
          setShowConfetti(true)
          setSuccessMessage(t("정답! 🎉", "Correct! 🎉"))
          setShowSuccess(true)
          setTimeout(() => setShowConfetti(false), 2000)
        }
      }
    } else {
      play("wrong")
    }
  }

  const handleStepAcknowledge = () => {
    if (!completedSteps.has(step.id)) {
      setCompletedSteps(prev => new Set([...prev, step.id]))
    }
    if (currentStep < chapter.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetStepState()
    } else {
      finishChapter()
    }
  }

  const acknowledgeQuiz = () => {
    // 오답 확인 후 다음 스텝으로
    if (!completedSteps.has(step.id)) {
      setCompletedSteps(prev => new Set([...prev, step.id]))
    }
    if (currentStep < chapter.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetStepState()
    } else {
      finishChapter()
    }
  }

  const totalSteps = lesson.chapters.reduce((sum, ch) => sum + ch.steps.length, 0)
  const currentStepIndex = lesson.chapters.slice(0, currentChapter).reduce((sum, ch) => sum + ch.steps.length, 0) + currentStep + 1
  // 진도가 있을 때만 현재 스텝 표시 (처음 입장 시 보라색 방지)
  const hasProgress = currentChapter > 0 || currentStep > 0 || completedSteps.size > 0 || isAlreadyDone

  // 챕터 완료 화면
  if (showLessonComplete) {
    const totalPoints = score
    const lessonFeedback = analyzeLessonComplete(lessonId, lang)
    const streakInfo = analyzeStreak(gamification.dailyStreak)
    return (
      <>
        {!isIGCSE && <Confetti show={showConfetti} />}
        <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-5xl">{lesson.emoji}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("레슨 완료!", "Lesson Complete!")}</h1>
            <p className="text-lg text-gray-600 mb-2">{lesson.title}</p>
            <p className="text-gray-500 mb-6">{t("모든 챕터를 끝냈어요!", "All chapters finished!")}</p>
            {!isIGCSE && (
              <>
                <div className="bg-amber-50 rounded-2xl p-4 mb-4">
                  <p className="text-amber-800 font-bold text-lg">{t(`총 ${totalPoints}점 획득!`, `${totalPoints} points earned!`)}</p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4 mb-4">
                  <p className="text-orange-600 font-bold text-lg">+30 XP {t("획득!", "earned!")}</p>
                  <p className="text-orange-500 text-sm mt-1">Lv.{gamification.level} ({gamification.xpInCurrentLevel}/100)</p>
                </div>
              </>
            )}

            {/* 스트릭 위젯 */}
            <div className="mb-4">
              <StreakWidget streak={streakInfo} t={t} />
            </div>

            {/* 맞춤 피드백: 진도, 다음 레슨, 복습 추천 */}
            <LessonFeedbackCard feedback={lessonFeedback} t={t} />

            <div className="mt-4 space-y-3">
              {/* 레슨 집중 퀴즈 CTA — IGCSE 제외, 레슨 ID가 숫자형(Python) 또는 cpp-N 형식일 때 */}
              {!isIGCSE && (
                <button
                  onClick={() => {
                    const course = currentProgrammingLang === "cpp" ? "cpp" : "python"
                    sessionStorage.setItem("quizSettings", JSON.stringify({
                      questionCount: 10,
                      difficulty: "mixed",
                      course,
                      startTime: Date.now(),
                      lessonFilter: isNaN(Number(lessonId)) ? lessonId : Number(lessonId),
                      isReview: true,
                    }))
                    router.push("/quiz")
                  }}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl font-bold text-base transition-all"
                >
                  {t("이 레슨 퀴즈 풀기 🧠", "Quiz on this lesson 🧠")}
                </button>
              )}
              {!isAuthenticated && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-left">
                  <p className="text-sm font-bold text-green-800 mb-1">🦒 {t("로그인하면 진도가 안전하게 저장돼요!", "Login to safely save your progress!")}</p>
                  <p className="text-xs text-green-600 mb-3">{t("지금까지 푼 내용이 클라우드에 저장되고, 다른 기기에서도 이어할 수 있어요", "Your work will be saved to the cloud and synced across devices")}</p>
                  <button
                    onClick={() => { router.push(`/login?returnTo=${encodeURIComponent(`/learn/${lessonId}`)}`) }}
                    className="w-full py-2.5 bg-white border border-green-300 hover:bg-green-50 text-green-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33Z" fill="#4285F4"/><path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0 0 10 20Z" fill="#34A853"/><path d="M4.42 11.89A6.01 6.01 0 0 1 4.1 10c0-.66.11-1.3.32-1.89V5.53H1.08A9.99 9.99 0 0 0 0 10c0 1.61.39 3.14 1.08 4.47l3.34-2.58Z" fill="#FBBC05"/><path d="M10 3.96c1.47 0 2.78.5 3.82 1.5l2.86-2.86C14.96.99 12.7 0 10 0A9.99 9.99 0 0 0 1.08 5.53l3.34 2.58C5.2 5.72 7.4 3.96 10 3.96Z" fill="#EA4335"/></svg>
                    {t("Google로 로그인", "Login with Google")}
                  </button>
                </div>
              )}
              <button onClick={() => { localStorage.removeItem(progressKey); router.push(`/curriculum#lesson-${lessonId}`) }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors">
                {t("돌아가기", "Go Back")}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showChapterComplete) {
    const chapterPoints = chapter.steps.filter(s => s.type !== "explain" && completedSteps.has(s.id)).length * 10
    return (
      <>
        {!isIGCSE && <Confetti show={showConfetti} />}
        <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t(`챕터 ${currentChapter + 1} 완료!`, `Chapter ${currentChapter + 1} Complete!`)}</h1>
            <p className="text-lg text-gray-600 mb-6">{chapter.emoji} {chapter.title}</p>
            {!isIGCSE && (
              <div className="bg-amber-50 rounded-2xl p-4 mb-6">
                <p className="text-amber-800 font-bold text-lg">{t(`${chapterPoints}점 획득!`, `${chapterPoints} points earned!`)}</p>
              </div>
            )}
            {!isAuthenticated && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 text-left">
                <p className="text-sm font-bold text-orange-800 mb-1">🦒 {t("로그인하면 진도가 저장돼요!", "Login to save your progress!")}</p>
                <p className="text-xs text-orange-600 mb-3">{t("새로고침해도, 다른 기기에서도 이어할 수 있어요", "Continue on any device, even after refresh")}</p>
                <button
                  onClick={() => { router.push(`/login?returnTo=${encodeURIComponent(`/learn/${lessonId}`)}`) }}
                  className="w-full py-2.5 bg-white border border-orange-300 hover:bg-orange-50 text-orange-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33Z" fill="#4285F4"/><path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0 0 10 20Z" fill="#34A853"/><path d="M4.42 11.89A6.01 6.01 0 0 1 4.1 10c0-.66.11-1.3.32-1.89V5.53H1.08A9.99 9.99 0 0 0 0 10c0 1.61.39 3.14 1.08 4.47l3.34-2.58Z" fill="#FBBC05"/><path d="M10 3.96c1.47 0 2.78.5 3.82 1.5l2.86-2.86C14.96.99 12.7 0 10 0A9.99 9.99 0 0 0 1.08 5.53l3.34 2.58C5.2 5.72 7.4 3.96 10 3.96Z" fill="#EA4335"/></svg>
                  {t("Google로 로그인", "Login with Google")}
                </button>
              </div>
            )}
            <button onClick={goToNextChapter} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors">
              {t("다음 챕터로 →", "Next Chapter →")}
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <CodeSubmissionProvider lessonId={lessonId}>
      <Confetti show={showConfetti} />
      <SuccessOverlay show={showSuccess} message={successMessage} onClose={closeSuccessOverlay} />
      
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50/30">
        {/* 상단 헤더 */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3">
            {/* 0줄: 프로그래밍 언어 | UI 언어 — 모바일에서는 숨김 (공간 부족) */}
            <div className="hidden md:flex items-center justify-between gap-2 mb-1.5">
              <ProgrammingLanguageToggle current={currentProgrammingLang} className="shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
                <LanguageToggle />
                {gamification.dailyStreak > 0 && (
                  <StreakWidget streak={analyzeStreak(gamification.dailyStreak)} t={t} compact />
                )}
                {isAuthenticated ? (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-green-700 bg-green-50 border border-green-200">
                    ✅ {profile?.display_name || t("로그인됨", "Logged in")}
                  </span>
                ) : (
                  <button
                    onClick={() => router.push(`/login?returnTo=${encodeURIComponent(`/learn/${lessonId}`)}`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
                  >
                    <LogIn className="w-3 h-3" />
                    {t("로그인", "Login")}
                  </button>
                )}
              </div>
            </div>
            {/* 1줄: 나가기 | 프로그레스바 | 스텝 카운터 */}
            <div className="flex items-center gap-3 md:gap-4">
              <button onClick={() => router.push(`/curriculum#lesson-${lessonId}`)} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="나가기">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="flex-1 flex items-center gap-[2px] h-2.5 md:h-3">
                    {lesson.chapters.map((ch, chIdx) =>
                      ch.steps.map((st, stIdx) => {
                        const globalIdx = lesson.chapters.slice(0, chIdx).reduce((s, c) => s + c.steps.length, 0) + stIdx
                        const currentGlobalIdx = lesson.chapters.slice(0, currentChapter).reduce((s, c) => s + c.steps.length, 0) + currentStep
                        const isCurrent = chIdx === currentChapter && stIdx === currentStep
                        const isCompleted = completedSteps.has(st.id)
                        const isBeforeCurrent = globalIdx < currentGlobalIdx
                        const isClickable = effectiveTeacher || isCompleted || isBeforeCurrent || isCurrent || isAlreadyDone
                        const isChapterStart = stIdx === 0 && chIdx > 0
                        return (
                          <button
                            key={`${chIdx}-${stIdx}`}
                            className={cn(
                              "h-full flex-1 transition-all duration-300 min-w-[3px]",
                              isChapterStart && "ml-1",
                              isCurrent && hasProgress
                                ? "bg-indigo-500 scale-y-125"
                                : (effectiveTeacher || isCompleted || isBeforeCurrent || isAlreadyDone)
                                  ? "bg-emerald-400 hover:bg-emerald-300 cursor-pointer"
                                  : "bg-gray-200",
                              globalIdx === 0 && "rounded-l-full",
                              globalIdx === totalSteps - 1 && "rounded-r-full",
                            )}
                            disabled={!isClickable}
                            onClick={() => {
                              if (!isClickable || isCurrent) return
                              setCurrentChapter(chIdx)
                              setCurrentStep(stIdx)
                              restoreCompletedStepState(st)
                              setShowChapterComplete(false)
                              setShowLessonComplete(false)
                              scrollToTop()
                            }}
                            title={`${ch.emoji} ${ch.title} — ${t("단계", "Step")} ${stIdx + 1}`}
                          />
                        )
                      })
                    )}
                  </div>
              <span className="text-sm md:text-base font-bold text-gray-500 tabular-nums shrink-0">
                {currentStepIndex}<span className="text-gray-300">/</span>{totalSteps}
              </span>
            </div>
            {/* 2줄: 챕터 이름 + 토글들 */}
            <div className="flex items-center justify-between mt-1.5">
              <button onClick={() => setShowChapterList(!showChapterList)} className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                <span>{chapter.emoji} {chapter.title}</span>
                <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", showChapterList && "rotate-90")} />
              </button>
              <div className="flex items-center gap-2">
                {hasVariants && <LibraryToggle variant={variant} setVariant={handleVariantChange} />}
                <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
              </div>
            </div>
          </div>
        </div>

        {/* 챕터 목록 드롭다운 */}
        {showChapterList && (
          <div className="sticky top-[100px] md:top-[110px] z-20">
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
                <button onClick={restartLesson}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 transition-all">
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t("처음부터 다시 시작", "Restart from beginning")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="bg-white rounded-2xl p-6 pb-28 md:p-10 md:pb-28 shadow-sm">
            <StepRenderer
              step={step}
              lang={lang}
              isCompleted={effectiveTeacher ? false : isCurrentStepCompleted}
              lessonId={lessonId}
              hintLevel={hintLevel}
              onHintLevelChange={setHintLevel}
              onSuccess={handleSuccess}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              quizAttempts={quizAttempts}
              onQuizAnswer={handleQuizAnswer}
              onQuizAcknowledge={acknowledgeQuiz}
              onStepComplete={handleStepComplete}
              onStepAcknowledge={handleStepAcknowledge}
            />
          </div>
        </div>

        <div className="h-10" />
      </div>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-20 safe-area-inset-bottom">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3">
          {fromReview && (
            <div className="flex justify-center mb-2">
              <button
                onClick={() => router.push(`/review/${lessonId}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors w-full max-w-sm justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("이해했어요! 복습으로 돌아가기", "Got it! Back to Review")}
              </button>
            </div>
          )}
          {/* 완료 필요 안내 — 비활성화된 이유를 명확히 */}
          {!canGoNext() && step && (
            <p className="text-center text-xs text-gray-400 mb-2">
              {step.type === "quiz" || step.type === "predict"
                ? t("👆 위에서 정답을 선택해야 넘어갈 수 있어요", "👆 Select an answer above to continue")
                : step.type === "fillblank"
                ? t("👆 위에서 빈칸을 모두 채워야 넘어갈 수 있어요", "👆 Fill all the blanks above to continue")
                : step.type === "practice"
                ? t("👆 위에서 실습을 완료해야 넘어갈 수 있어요", "👆 Complete the exercise above to continue")
                : t("👆 위 내용을 완료해야 넘어갈 수 있어요", "👆 Complete the step above to continue")}
            </p>
          )}
          <div className="flex gap-3 md:gap-4 justify-center">
            <button onClick={goPrev} disabled={currentStep === 0 && currentChapter === 0}
              className={cn("flex items-center justify-center gap-1 rounded-xl font-bold transition-colors min-h-[44px]", "px-5 py-3 md:px-6 md:py-3",
                (currentStep > 0 || currentChapter > 0) ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "invisible")}>
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{t("이전", "Prev")}</span>
            </button>
            {(() => {
              const isLastStepOfLastChapter = currentChapter === lesson.chapters.length - 1 && currentStep === chapter.steps.length - 1
              const isLastStepOfChapter = currentStep === chapter.steps.length - 1
              return (
                <button onClick={goNext} disabled={!canGoNext()}
                  className={cn("flex items-center justify-center gap-1 rounded-xl font-bold transition-colors min-h-[44px]",
                    isLastStepOfLastChapter && canGoNext()
                      ? "px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg animate-pulse"
                      : cn("px-5 py-3 md:px-6 md:py-3",
                          canGoNext() ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"))}>
                  {canGoNext() ? (
                    isLastStepOfLastChapter ? (
                      <><span className="text-sm md:text-base">🎉</span><span className="text-sm md:text-base">{t("레슨 완료!", "Finish!")}</span></>
                    ) : isLastStepOfChapter ? (
                      <><ChevronRight className="w-4 h-4 md:w-5 md:h-5" /><span className="text-sm md:text-base">{t("챕터 완료", "End Chapter")}</span></>
                    ) : (
                      <><ChevronRight className="w-4 h-4 md:w-5 md:h-5" /><span className="text-sm md:text-base">{t("다음", "Next")}</span></>
                    )
                  ) : (
                    <><Lock className="w-4 h-4 md:w-5 md:h-5" /><span className="text-xs md:text-sm">{t("완료 필요", "Complete first")}</span></>
                  )}
                </button>
              )
            })()}
          </div>
        </div>
      </div>
    </CodeSubmissionProvider>
  )
}
