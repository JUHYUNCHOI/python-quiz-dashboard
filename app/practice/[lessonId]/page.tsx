"use client"

import { useState, useEffect, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronRight, 
  ChevronLeft,
  X,
  Sparkles,
  BookOpen,
  Code,
  HelpCircle,
  Trophy,
  Check,
  Lightbulb,
  Lock,
  PartyPopper,
  RotateCcw,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PythonRunner } from "@/components/python/python-runner"
import { CodeBlock } from "@/components/ui/code-block"
import { DataStructuresComparison } from "@/components/animations"
import { 
  lesson1Data, lesson2Data, lesson3Data, lesson4Data, lesson5Data, 
  lesson6Data, lesson7Data, lesson8Data, lesson9Data, lesson10Data, 
  lesson11Data, lesson12Data, lesson13Data, lesson14Data, lesson15Data,
  lesson16Data, lesson17Data, lesson18Data, lesson19Data, lesson20Data,
  lesson21Data, lesson22Data, lesson23Data, lesson24Data, lesson25Data,
  lesson26Data, lesson29Data, lesson30Data, lesson31Data, lesson32Data,
  lesson33Data, lessonP1Data, lessonP2Data, lessonP3Data 
} from "@/data"

// ============================================
// Confetti 컴포넌트
// ============================================
function Confetti({ show }: { show: boolean }) {
  if (!show) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'][Math.floor(Math.random() * 7)],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  )
}

// ============================================
// 성공 오버레이 컴포넌트
// ============================================
function SuccessOverlay({ show, message, onClose }: { show: boolean, message: string, onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center animate-bounce-in">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-500">+10 포인트!</p>
      </div>
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// ============================================
// 레슨 데이터 타입
// ============================================
interface LessonStep {
  id: string
  type: "explain" | "tryit" | "mission" | "quiz" | "interactive"
  title: string
  content?: string
  code?: string
  initialCode?: string
  expectedOutput?: string
  hint?: string
  hint2?: string
  task?: string
  options?: string[]
  answer?: number
  explanation?: string
  component?: "dataStructures"
  description?: string
}

interface Chapter {
  id: string
  title: string
  emoji: string
  steps: LessonStep[]
}

interface LessonData {
  id: string
  title: string
  emoji: string
  description: string
  chapters: Chapter[]
}

// 모든 레슨 데이터 (import된 데이터 사용)
const lessonsData: Record<string, LessonData> = {
  "1": lesson1Data,
  "2": lesson2Data,
  "3": lesson3Data,
  "4": lesson4Data,
  "5": lesson5Data,
  "6": lesson6Data,
  "7": lesson7Data,
  "8": lesson8Data,
  "9": lesson9Data,
  "10": lesson10Data,
  "11": lesson11Data,
  "12": lesson12Data,
  "13": lesson13Data,
  "14": lesson14Data,
  "15": lesson15Data,
  "16": lesson16Data,
  "17": lesson17Data,
  "18": lesson18Data,
  "19": lesson19Data,
  "20": lesson20Data,
  "21": lesson21Data,
  "22": lesson22Data,
  "23": lesson23Data,
  "24": lesson24Data,
  "25": lesson25Data,
  "26": lesson26Data,
  "29": lesson29Data,
  "30": lesson30Data,
  "31": lesson31Data,
  "32": lesson32Data,
  "33": lesson33Data,
  "p1": lessonP1Data,
  "p2": lessonP2Data,
  "p3": lessonP3Data,
}

// ============================================
// 메인 컴포넌트
// ============================================
export default function PracticePage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  
  const lesson = lessonsData[lessonId]
  
  // 현재 위치: 챕터 인덱스 + 스텝 인덱스
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showChapterComplete, setShowChapterComplete] = useState(false)
  
  // 새로운 상태들
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [hintLevel, setHintLevel] = useState(0)
  const [quizAttempts, setQuizAttempts] = useState(0)
  
  const chapter = lesson?.chapters[currentChapter]
  const step = chapter?.steps[currentStep]
  
  // 현재 스텝이 완료되었는지 체크
  const isCurrentStepCompleted = step ? completedSteps.has(step.id) : false
  
  // 다음 버튼 활성화 조건
  const canGoNext = () => {
    if (!step) return false
    if (step.type === "explain" || step.type === "interactive") return true
    return isCurrentStepCompleted
  }

  // 진행 상황 저장/로드
  useEffect(() => {
    const saved = localStorage.getItem(`practice-v2-${lessonId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCurrentChapter(data.chapter || 0)
        setCurrentStep(data.step || 0)
        setScore(data.score || 0)
        setCompletedSteps(new Set(data.completed || []))
      } catch {}
    }
  }, [lessonId])

  useEffect(() => {
    if (!lesson) return
    localStorage.setItem(`practice-v2-${lessonId}`, JSON.stringify({
      chapter: currentChapter,
      step: currentStep,
      score,
      completed: Array.from(completedSteps)
    }))
  }, [currentChapter, currentStep, score, completedSteps, lessonId, lesson])

  if (!lesson || !chapter || !step) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-gray-600 mb-4">준비 중인 레슨이에요</p>
          <button
            onClick={() => router.push("/curriculum")}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  const goNext = () => {
    if (!canGoNext()) return
    
    if (currentStep < chapter.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintLevel(0)
      setQuizAttempts(0)
    } 
    else if (currentChapter < lesson.chapters.length - 1) {
      setShowConfetti(true)
      setShowChapterComplete(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
    else {
      setShowConfetti(true)
      setTimeout(() => {
        localStorage.removeItem(`practice-v2-${lessonId}`)
        router.push("/curriculum")
      }, 2000)
    }
  }

  const goToNextChapter = () => {
    setShowChapterComplete(false)
    setCurrentChapter(currentChapter + 1)
    setCurrentStep(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setHintLevel(0)
    setQuizAttempts(0)
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintLevel(0)
      setQuizAttempts(0)
    } else if (currentChapter > 0) {
      const prevChapter = lesson.chapters[currentChapter - 1]
      setCurrentChapter(currentChapter - 1)
      setCurrentStep(prevChapter.steps.length - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintLevel(0)
      setQuizAttempts(0)
    }
  }

  const handleSuccess = useCallback(() => {
    if (!completedSteps.has(step.id)) {
      setScore(prev => prev + 10)
      setCompletedSteps(prev => new Set([...prev, step.id]))
      setShowConfetti(true)
      setSuccessMessage("잘했어요! 🎉")
      setShowSuccess(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [completedSteps, step?.id])

  const handleQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    setShowExplanation(true)
    setQuizAttempts(prev => prev + 1)
    
    if (idx === step.answer) {
      if (!completedSteps.has(step.id)) {
        setScore(score + 10)
        setCompletedSteps(new Set([...completedSteps, step.id]))
        setShowConfetti(true)
        setSuccessMessage("정답! 🎉")
        setShowSuccess(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }
    }
  }

  const retryQuiz = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const closeSuccessOverlay = useCallback(() => {
    setShowSuccess(false)
  }, [])

  // 마크다운 렌더링
  const renderContent = (content: string) => {
    const elements: React.ReactNode[] = []
    const lines = content.split('\n')
    let i = 0
    let key = 0
    
    while (i < lines.length) {
      const line = lines[i]
      
      if (line.startsWith('```')) {
        const codeLines: string[] = []
        const lang = line.slice(3).trim() || 'python'
        i++
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        i++
        
        if (codeLines.length > 0) {
          elements.push(
            <div key={key++} className="my-4">
              <CodeBlock code={codeLines.join('\n')} language={lang === 'python' ? 'python' : 'python'} />
            </div>
          )
        }
        continue
      }
      
      if (line.startsWith('## ')) {
        elements.push(<h2 key={key++} className="text-lg md:text-xl font-bold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4">{line.slice(3)}</h2>)
        i++
        continue
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={key++} className="text-base md:text-lg font-bold text-gray-800 mt-5 md:mt-6 mb-2 md:mb-3">{line.slice(4)}</h3>)
        i++
        continue
      }
      
      if (line.startsWith('✅ ') || line.startsWith('- ')) {
        elements.push(<p key={key++} className="text-sm md:text-base text-gray-700 ml-2 my-1.5">{line}</p>)
        i++
        continue
      }
      
      if (line.trim()) {
        const parts = line.split(/(`[^`]+`)/g)
        elements.push(
          <p key={key++} className="text-sm md:text-base text-gray-700 leading-relaxed my-1.5">
            {parts.map((part, j) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code key={j} className="bg-indigo-100 px-1.5 md:px-2 py-0.5 rounded-md font-mono text-indigo-700 text-sm md:text-base font-semibold">
                    {part.slice(1, -1)}
                  </code>
                )
              }
              const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
              return boldParts.map((bp, k) => {
                if (bp.startsWith('**') && bp.endsWith('**')) {
                  return <strong key={`${j}-${k}`} className="font-bold text-indigo-600 text-base md:text-lg">{bp.slice(2, -2)}</strong>
                }
                return bp
              })
            })}
          </p>
        )
        i++
        continue
      }
      
      elements.push(<div key={key++} className="h-2 md:h-3" />)
      i++
    }
    
    return elements
  }

  // 챕터 완료 화면
  if (showChapterComplete) {
    const chapterPoints = chapter.steps.filter(s => 
      s.type !== "explain" && completedSteps.has(s.id)
    ).length * 10
    
    return (
      <>
        <Confetti show={showConfetti} />
        <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              챕터 {currentChapter + 1} 완료! 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {chapter.emoji} {chapter.title}
            </p>
            
            <div className="bg-amber-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span className="text-2xl font-bold text-amber-600">+{chapterPoints}</span>
                <span className="text-gray-600">포인트!</span>
              </div>
            </div>
            
            {currentChapter < lesson.chapters.length - 1 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-xs text-gray-500 mb-1">다음 챕터</p>
                <p className="font-bold text-gray-800">
                  {lesson.chapters[currentChapter + 1].emoji} {lesson.chapters[currentChapter + 1].title}
                </p>
              </div>
            )}
            
            <button
              onClick={goToNextChapter}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
            >
              다음 챕터 시작! <ChevronRight className="w-5 h-5" />
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
      
      <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-slate-200">
        {/* 상단 바 */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => router.push("/curriculum")}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-700 text-sm">{score}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 whitespace-nowrap">
                {chapter.emoji} {chapter.title}
              </span>
              <div className="flex-1 flex items-center gap-1">
                {chapter.steps.map((s, idx) => (
                  <div
                    key={s.id}
                    className={cn(
                      "h-2 flex-1 rounded-full transition-all",
                      idx < currentStep ? "bg-indigo-600" :
                      idx === currentStep ? "bg-indigo-400" :
                      "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {currentStep + 1}/{chapter.steps.length}
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {lesson.chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx < currentChapter ? "bg-indigo-600" :
                    idx === currentChapter ? "bg-indigo-400 scale-125" :
                    "bg-gray-300"
                  )}
                  title={ch.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          
          {/* 설명 타입 */}
          {step.type === "explain" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                  <BookOpen className="w-4 h-4 inline mr-1" />설명
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {step.title}
              </h1>

              {step.content && (
                <div className="space-y-3">
                  {renderContent(step.content)}
                </div>
              )}
            </div>
          )}

          {/* 실습/미션 타입 */}
          {(step.type === "tryit" || step.type === "mission") && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-bold",
                    step.type === "tryit" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
                  )}>
                    {step.type === "tryit" && <><Code className="w-4 h-4 inline mr-1" />실습</>}
                    {step.type === "mission" && <><Trophy className="w-4 h-4 inline mr-1" />미션</>}
                  </span>
                  {isCurrentStepCompleted && (
                    <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">
                      ✅ 완료!
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {step.title}
                </h1>
                
                {/* 힌트 영역 */}
                {!isCurrentStepCompleted && (
                  <div className="space-y-2">
                    {hintLevel === 0 && (
                      <button
                        onClick={() => setHintLevel(1)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <Lightbulb className="w-4 h-4" />
                        힌트 보기
                      </button>
                    )}
                    {hintLevel >= 1 && step.hint && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-800">
                          <Lightbulb className="w-4 h-4 inline mr-1 text-amber-600" />
                          힌트 1: {step.hint}
                        </p>
                        {hintLevel === 1 && step.hint2 && (
                          <button
                            onClick={() => setHintLevel(2)}
                            className="text-xs text-amber-600 hover:text-amber-700 mt-2 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            정답에 가까운 힌트 보기
                          </button>
                        )}
                      </div>
                    )}
                    {hintLevel >= 2 && step.hint2 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-sm text-orange-800 font-mono">
                          <Eye className="w-4 h-4 inline mr-1 text-orange-600" />
                          힌트 2: {step.hint2}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <PythonRunner
                  initialCode={step.initialCode || ""}
                  expectedOutput={step.expectedOutput}
                  task={step.task}
                  hint={step.hint}
                  onSuccess={handleSuccess}
                  showExpectedOutput={step.type === "mission"}
                  minHeight={step.type === "mission" ? "160px" : "100px"}
                />
              </div>
            </div>
          )}

          {/* 퀴즈 타입 */}
          {step.type === "quiz" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                    <HelpCircle className="w-4 h-4 inline mr-1" />퀴즈
                  </span>
                  {isCurrentStepCompleted && (
                    <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">
                      ✅ 정답!
                    </span>
                  )}
                  {quizAttempts > 0 && !isCurrentStepCompleted && (
                    <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 font-medium">
                      {quizAttempts}번 시도
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {step.title}
                </h1>
                <p className="text-base md:text-lg text-gray-800 font-medium">{step.content}</p>
              </div>
              
              <div className="space-y-3">
                {step.options?.map((option, idx) => {
                  const isSelected = selectedAnswer === idx
                  const isCorrect = idx === step.answer
                  const showResult = selectedAnswer !== null
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={cn(
                        "w-full p-3 md:p-4 rounded-lg md:rounded-xl text-left font-medium text-sm md:text-base transition-all border-2",
                        !showResult && "bg-white hover:bg-indigo-50 border-gray-200 hover:border-indigo-400",
                        showResult && isCorrect && "bg-green-100 border-green-500 text-green-800",
                        showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                        showResult && !isSelected && !isCorrect && "bg-gray-100 border-gray-200 text-gray-400"
                      )}
                    >
                      {option}
                      {showResult && isCorrect && <Check className="w-5 h-5 inline ml-2 text-green-600" />}
                      {showResult && isSelected && !isCorrect && <X className="w-5 h-5 inline ml-2 text-red-600" />}
                    </button>
                  )
                })}
                
                {showExplanation && step.explanation && (
                  <div className={cn(
                    "p-3 md:p-4 rounded-lg md:rounded-xl border-2 mt-2",
                    selectedAnswer === step.answer 
                      ? "bg-green-50 border-green-300" 
                      : "bg-amber-50 border-amber-300"
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className={cn(
                        "w-4 h-4",
                        selectedAnswer === step.answer ? "text-green-600" : "text-amber-600"
                      )} />
                      <span className={cn(
                        "font-bold text-sm",
                        selectedAnswer === step.answer ? "text-green-700" : "text-amber-700"
                      )}>
                        {selectedAnswer === step.answer ? "정답! 🎉" : "틀렸어요!"}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm",
                      selectedAnswer === step.answer ? "text-green-800" : "text-amber-800"
                    )}>
                      {step.explanation}
                    </p>
                    
                    {selectedAnswer !== step.answer && (
                      <button
                        onClick={retryQuiz}
                        className="mt-3 flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
                      >
                        <RotateCcw className="w-4 h-4" />
                        다시 시도하기
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 인터랙티브 타입 */}
          {step.type === "interactive" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                  🎮 체험
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {step.title}
              </h1>

              {step.description && (
                <p className="text-gray-600">{step.description}</p>
              )}

              {/* 데이터 구조 애니메이션 */}
              {step.component === "dataStructures" && (
                <DataStructuresComparison />
              )}
            </div>
          )}

          </div>
        </div>

        {/* 하단 여백 - 네비게이션 버튼 높이만큼 */}
        <div className="h-[70px] md:h-[90px] lg:h-[110px]" />
      </div>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-20">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 lg:py-4">
          <div className="flex gap-3 md:gap-4 lg:gap-6 justify-center">
            <button
              onClick={goPrev}
              disabled={currentStep === 0 && currentChapter === 0}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl md:rounded-2xl font-bold transition-colors",
                "w-[60px] h-[50px] md:w-[80px] md:h-[70px] lg:w-[100px] lg:h-[80px]",
                (currentStep > 0 || currentChapter > 0)
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "invisible"
              )}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm lg:text-base">이전</span>
            </button>
            
            <button
              onClick={goNext}
              disabled={!canGoNext()}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl md:rounded-2xl font-bold transition-colors",
                "w-[60px] h-[50px] md:w-[80px] md:h-[70px] lg:w-[100px] lg:h-[80px]",
                canGoNext()
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {canGoNext() ? (
                <>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                  <span className="text-xs md:text-sm lg:text-base">다음</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  <span className="text-[10px] md:text-xs lg:text-sm">완료 필요</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
