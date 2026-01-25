"use client"

import { useState, useEffect, useRef, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, 
  Sparkles,
  X,
  Play,
  Check,
  Trophy,
  RotateCcw,
  Flame,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================
// 외부 파일에서 레슨 데이터 import
// ============================================================
import { lessonsData } from "./data/lessons"
import type { LessonData } from "./data/types"

// 인터랙티브 애니메이션 컴포넌트
import { DataStructuresComparison } from "@/components/animations"

// Python 코드 실행 컴포넌트
import { PythonRunner } from "@/components/code-runner/PythonRunner"

// ============================================================
// 로컬 타입 정의 (컴포넌트 전용)
// ============================================================
interface Step {
  type: string
  content: any
}

interface WrongAnswer {
  stepIndex: number
  task: string
  answer: string
  expect: string
}

// ============================================================
// 메인 컴포넌트
// ============================================================
export default function LearnPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  
  const lesson = lessonsData[lessonId]
  
  const [step, setStep] = useState(0)
  const [input, setInput] = useState("")
  const [phase, setPhase] = useState<"input" | "correct" | "wrong">("input")
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [output, setOutput] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [showHint, setShowHint] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showStreakBonus, setShowStreakBonus] = useState(false)
  const [praise, setPraise] = useState("")
  const [typedCode, setTypedCode] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  
  // 예측 퀴즈 상태
  const [predictSelected, setPredictSelected] = useState<number | null>(null)
  const [predictAnswered, setPredictAnswered] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const current = lesson?.steps[step]
  const progress = lesson ? ((step + 1) / lesson.steps.length) * 100 : 0

  // ============================================================
  // 진행 상황 로드/저장
  // ============================================================
  useEffect(() => {
    if (!lesson) return
    const saved = localStorage.getItem(`lesson-${lessonId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.step < lesson.steps.length) {
          setStep(data.step)
          setScore(data.score || 0)
          setWrongAnswers(data.wrongAnswers || [])
          setStreak(data.streak || 0)
        }
      } catch (e) {
        console.error('Failed to load progress', e)
      }
    }
  }, [lessonId, lesson])

  useEffect(() => {
    if (!lesson) return
    localStorage.setItem(`lesson-${lessonId}`, JSON.stringify({
      step,
      score,
      wrongAnswers,
      streak
    }))
  }, [step, score, wrongAnswers, streak, lessonId, lesson])

  // ============================================================
  // 입력 포커스
  // ============================================================
  useEffect(() => {
    if (!current) return
    if (["practice", "project", "interleaving"].includes(current.type)) {
      setTimeout(() => {
        if (current.content.template) {
          inputRef.current?.focus()
        } else {
          textareaRef.current?.focus()
        }
      }, 300)
    }
  }, [step, current, showReview])

  // ============================================================
  // 상태 리셋
  // ============================================================
  useEffect(() => {
    setInput("")
    setPhase("input")
    setTries(0)
    setSelected(null)
    setOutput("")
    setErrorMsg("")
    setShowHint(0)
    setShowExplanation(false)
    setTypedCode("")
    setShowResult(false)
    setTypingComplete(false)
    setPredictSelected(null)
    setPredictAnswered(false)
  }, [step, reviewIndex])

  // ============================================================
  // 타이핑 효과 (예측 퀴즈가 있으면 결과 표시 대기)
  // ============================================================
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const skipTyping = useCallback(() => {
    if (current?.type !== "explain" || !current.content.code) return
    if (typingComplete) return
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
    setTypedCode(current.content.code)
    setTypingComplete(true)
    
    // 예측 퀴즈가 없을 때만 바로 결과 표시
    if (current.content.result && !current.content.predict) {
      setTimeout(() => setShowResult(true), 150)
    }
  }, [current, typingComplete])
  
  useEffect(() => {
    if (current?.type !== "explain" || !current.content.code) return
    
    const code = current.content.code
    let index = 0
    setTypedCode("")
    setShowResult(false)
    setTypingComplete(false)
    
    const startDelay = setTimeout(() => {
      typingIntervalRef.current = setInterval(() => {
        if (index < code.length) {
          setTypedCode(code.slice(0, index + 1))
          index++
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current)
            typingIntervalRef.current = null
          }
          setTypingComplete(true)
          
          // 예측 퀴즈가 없을 때만 바로 결과 표시
          if (current.content.result && !current.content.predict) {
            setTimeout(() => setShowResult(true), 300)
          }
        }
      }, 40)
    }, 300)
    
    return () => {
      clearTimeout(startDelay)
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
    }
  }, [step, current])

  // ============================================================
  // 네비게이션
  // ============================================================
  const next = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (step + 1 < (lesson?.steps.length || 0)) {
        setStep(step + 1)
      } else {
        localStorage.removeItem(`lesson-${lessonId}`)
        router.push("/curriculum")
      }
      setIsTransitioning(false)
    }, 200)
  }, [step, lesson, lessonId, router])

  // ============================================================
  // 키보드 이벤트
  // ============================================================
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.push("/curriculum")
      return
    }
    
    if (e.key === "Enter" && !e.shiftKey) {
      // explain에서 예측 퀴즈가 있고 아직 안 풀었으면 Enter 무시
      if (current?.type === "explain" && current.content.predict && !predictAnswered) {
        return
      }
      
      if (current?.type === "explain" || 
          current?.type === "reward" || 
          current?.type === "chapter" ||
          current?.type === "summary") {
        e.preventDefault()
        next()
      }
    }
  }, [current, router, next, predictAnswered])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // ============================================================
  // 예측 퀴즈 선택
  // ============================================================
  const selectPredict = (idx: number) => {
    if (predictSelected !== null) return
    setPredictSelected(idx)
    
    const isCorrect = idx === current.content.predict.answer
    setPredictAnswered(true)
    
    if (isCorrect) {
      setScore(score + 5) // 예측 맞추면 보너스
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    
    // 정답/오답 관계없이 결과 표시
    setTimeout(() => {
      setShowResult(true)
    }, 800)
  }

  // ============================================================
  // 레슨 없음 처리
  // ============================================================
  if (!lesson || !current) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🚧</p>
          <p className="text-gray-600 mb-4">아직 준비 중인 레슨이에요</p>
          <Button onClick={() => router.push("/curriculum")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">돌아가기</Button>
        </div>
      </div>
    )
  }

  // ============================================================
  // 유틸리티 함수들
  // ============================================================
  const insertSymbol = (symbol: string) => {
    setInput(prev => prev + symbol)
    if (current.content.template) {
      inputRef.current?.focus()
    } else {
      textareaRef.current?.focus()
    }
  }

  const runCode = (code: string, hasTemplate: boolean = false): { result: string, error?: string } => {
    try {
      code = code.trim()
      
      if (!hasTemplate) {
        const printTypos = ['pirnt', 'prnt', 'prnit', 'pritn', 'printt', 'prit', 'prrint']
        for (const typo of printTypos) {
          if (code.toLowerCase().includes(typo)) {
            return { result: "", error: `오타! ${typo} → print` }
          }
        }
        
        if (/\bprin\s*\(/i.test(code) && !/\bprint\s*\(/i.test(code)) {
          return { result: "", error: "오타! prin → print" }
        }
      }
      
      const m = code.match(/print\s*\(\s*([\s\S]*)\s*\)/i)
      if (!m) {
        if (code.toLowerCase().includes('print')) {
          return { result: "", error: "print() 괄호 확인해봐!" }
        }
        return { result: "", error: "print()를 써봐!" }
      }
      
      const inside = m[1].trim()
      if (!inside) return { result: "", error: "print() 안에 뭔가 넣어봐!" }
      
      const parts: string[] = []
      let curr = ""
      let inQuote = false
      let quoteChar = ""
      
      for (let i = 0; i < inside.length; i++) {
        const char = inside[i]
        if ((char === "'" || char === '"') && !inQuote) {
          inQuote = true
          quoteChar = char
          curr += char
        } else if (char === quoteChar && inQuote) {
          inQuote = false
          quoteChar = ""
          curr += char
        } else if (char === "," && !inQuote) {
          parts.push(curr.trim())
          curr = ""
        } else {
          curr += char
        }
      }
      if (curr.trim()) parts.push(curr.trim())
      
      if (inQuote) {
        return { result: "", error: "따옴표를 닫아봐! ' 또는 \"" }
      }
      
      const results: string[] = []
      for (const part of parts) {
        const strMatch = part.match(/^(['"])(.*)\1$/)
        if (strMatch) {
          results.push(strMatch[2])
          continue
        }
        
        if ((part.startsWith("'") && part.endsWith('"')) || 
            (part.startsWith('"') && part.endsWith("'"))) {
          return { result: "", error: "따옴표 종류를 맞춰봐! ' 또는 \" 하나로" }
        }
        
        if (/^[\d\s+\-*/().]+$/.test(part)) {
          try {
            const calc = Function('return ' + part)()
            const numResult = Number.isInteger(calc) ? String(calc) : String(Math.round(calc * 100) / 100)
            results.push(numResult)
            continue
          } catch {
            return { result: "", error: "계산식 확인해봐!" }
          }
        }
        
        if (/[a-zA-Z가-힣]/.test(part)) {
          const word = part.match(/[a-zA-Z가-힣]+/)?.[0]
          return { result: "", error: `${word}에 따옴표 붙여봐! '${word}'` }
        }
        
        results.push(part)
      }
      
      return { result: results.join(' ') }
    } catch { 
      return { result: "", error: "다시 확인해봐!" } 
    }
  }

  const check = () => {
    const c = showReview ? {
      task: wrongAnswers[reviewIndex].task,
      answer: wrongAnswers[reviewIndex].answer,
      expect: wrongAnswers[reviewIndex].expect,
      template: null
    } : current.content
    
    let code = ""
    const hasTemplate = !!c.template
    if (c.template) {
      code = c.template.before + input + c.template.after
    } else {
      code = input
    }
    
    const { result, error } = runCode(code, hasTemplate)
    
    if (error) {
      setOutput("")
      setErrorMsg(error)
      setPhase("wrong")
      const newTries = tries + 1
      setTries(newTries)
      setStreak(0)
      
      if (newTries >= 1) setShowHint(Math.min(showHint + 1, 3))
      
      if (newTries === 1 && !showReview) {
        setWrongAnswers(prev => [...prev, {
          stepIndex: step,
          task: c.task,
          answer: c.answer,
          expect: c.expect || c.target
        }])
      }
      
      setTimeout(() => setPhase("input"), 800)
      return
    }
    
    setOutput(result)
    setErrorMsg("")
    
    const target = c.target || c.expect
    const normalize = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
    
    if (normalize(result) !== normalize(target)) {
      setPhase("wrong")
      const newTries = tries + 1
      setTries(newTries)
      setStreak(0)
      
      if (newTries >= 1) setShowHint(Math.min(showHint + 1, 3))
      
      if (newTries === 1 && !showReview) {
        setWrongAnswers(prev => [...prev, {
          stepIndex: step,
          task: c.task,
          answer: c.answer,
          expect: c.expect || c.target
        }])
      }
      
      setTimeout(() => setPhase("input"), 800)
    } else {
      setPhase("correct")
      setPraise(getRandomPraise())
      const newStreak = streak + 1
      setStreak(newStreak)
      
      let points = tries === 0 ? 10 : tries === 1 ? 7 : tries === 2 ? 5 : 3
      
      if (newStreak > 0 && newStreak % 5 === 0) {
        points += 20
        setShowStreakBonus(true)
        setTimeout(() => setShowStreakBonus(false), 2000)
      }
      
      setScore(score + points)
      
      setTimeout(() => {
        if (showReview) {
          if (reviewIndex + 1 < wrongAnswers.length) {
            setReviewIndex(reviewIndex + 1)
          } else {
            setShowReview(false)
            next()
          }
        } else {
          next()
        }
      }, 1500)
    }
  }

  const selectQuiz = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === current.content.answer) {
      setPhase("correct")
      setScore(score + 10)
      setStreak(streak + 1)
      setShowExplanation(true)
      setTimeout(next, 2500)
    } else {
      setPhase("wrong")
      setStreak(0)
      setTimeout(() => {
        setSelected(null)
        setPhase("input")
      }, 1000)
    }
  }

  const selectErrorQuiz = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === current.content.answer) {
      setPhase("correct")
      setScore(score + 15)
      setStreak(streak + 1)
      setShowExplanation(true)
      setTimeout(next, 3000)
    } else {
      setPhase("wrong")
      setStreak(0)
      setTimeout(() => {
        setSelected(null)
        setPhase("input")
      }, 1000)
    }
  }

  const startReview = () => {
    if (wrongAnswers.length > 0) {
      setShowReview(true)
      setReviewIndex(0)
    } else {
      next()
    }
  }

  const getLevelBadge = (level: number) => {
    if (level === 1) return { label: "⭐ 쉬움", color: "bg-green-600 text-white" }
    if (level === 1.5) return { label: "⭐ 쉬움+", color: "bg-teal-600 text-white" }
    if (level === 2) return { label: "⭐⭐ 보통", color: "bg-blue-600 text-white" }
    if (level === 2.5) return { label: "⭐⭐ 보통+", color: "bg-indigo-600 text-white" }
    if (level === 3) return { label: "⭐⭐⭐ 도전", color: "bg-purple-600 text-white" }
    if (level === 4) return { label: "🔥 혼자!", color: "bg-rose-600 text-white" }
    return { label: "", color: "" }
  }

  const renderHint = () => {
    const c = showReview ? {
      hint: null,
      guide: null,
      answer: wrongAnswers[reviewIndex]?.answer
    } : current.content
    
    if (errorMsg && showHint === 0) {
      return (
        <div className="bg-red-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg font-bold">
            ❌ {errorMsg}
          </p>
          <p className="text-red-200 text-sm mt-1">괜찮아! 다시 해보자 💪</p>
        </div>
      )
    }
    
    if (showHint === 0) return null
    
    if (showHint === 1) {
      return (
        <div className="bg-amber-500 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg font-bold">
            💡 {errorMsg || c.hint || c.guide || "천천히 다시 확인해봐!"}
          </p>
        </div>
      )
    }
    
    if (showHint === 2 && c.hint) {
      return (
        <div className="bg-purple-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg mb-2 font-bold">💡 이렇게 써봐</p>
          <p className="text-white font-mono text-base md:text-lg bg-purple-800 p-3 rounded-xl">{c.hint}</p>
        </div>
      )
    }
    
    if (showHint >= 3 || (showHint >= 2 && !c.hint)) {
      return (
        <div className="bg-pink-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg mb-2 font-bold">🎯 정답 보고 직접 써봐</p>
          <p className="text-white font-mono text-base md:text-lg bg-pink-800 p-3 rounded-xl select-none">{c.answer}</p>
        </div>
      )
    }
    
    return null
  }

  const SymbolButtons = () => (
    <div className="flex justify-center gap-2 mb-4 flex-wrap">
      {["'", '"', '(', ')', ',', ':', '+', '-', '*', '/'].map(symbol => (
        <button
          key={symbol}
          onClick={() => insertSymbol(symbol)}
          className="w-12 h-12 md:w-14 md:h-14 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl font-mono text-white text-xl md:text-2xl transition-all shadow-lg font-bold"
        >
          {symbol}
        </button>
      ))}
    </div>
  )

  const getRandomPraise = () => {
    const praises = [
      "정답! 🎉", "완벽해! ✨", "천재?! 🧠", "멋져! 🔥", "빠르다! ⚡",
      "대단해! 💪", "좋았어! 👍", "잘했어! 🌟", "굿! 👏", "역시! 😎"
    ]
    return praises[Math.floor(Math.random() * praises.length)]
  }

  const StreakDisplay = () => {
    if (streak < 2) return null
    return (
      <div className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded-full shadow-lg animate-pulse">
        <Flame className="w-5 h-5 text-white" />
        <span className="font-bold text-white">{streak}</span>
      </div>
    )
  }

  const StreakBonus = () => {
    if (!showStreakBonus) return null
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
        <div className="bg-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-2xl font-bold">{streak}연속 정답!</div>
          <div className="text-lg">+20 보너스!</div>
        </div>
      </div>
    )
  }

  // ============================================================
  // 복습 화면
  // ============================================================
  if (showReview && wrongAnswers.length > 0) {
    const reviewItem = wrongAnswers[reviewIndex]
    
    return (
      <div className="min-h-screen bg-orange-50">
        <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4 max-w-[1300px] mx-auto">
          <button 
            onClick={() => setShowReview(false)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-700 flex items-center justify-center shadow-lg"
          >
            <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </button>
          
          <div className="flex-1 h-5 md:h-6 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${((reviewIndex + 1) / wrongAnswers.length) * 100}%` }}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-full shadow-lg">
            <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <span className="font-bold text-lg md:text-xl text-white">{reviewIndex + 1}/{wrongAnswers.length}</span>
          </div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5 md:px-8 pb-8">
          <div className="pt-8 md:pt-12 space-y-5 md:space-y-6">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full text-lg md:text-xl font-bold bg-orange-500 text-white shadow-lg">
                🔄 복습
              </span>
            </div>

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {reviewItem.task}
            </p>

            <SymbolButtons />

            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-indigo-200">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={phase === "correct"}
                placeholder="여기에 코드 입력!"
                className={cn(
                  "w-full h-24 md:h-28 bg-indigo-50 text-indigo-900 font-mono font-bold p-4 md:p-5 rounded-2xl text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 resize-none placeholder:text-indigo-300 border-4 border-indigo-200",
                  phase === "wrong" && "ring-4 ring-red-500 border-red-500"
                )}
                spellCheck={false}
              />
            </div>

            {phase === "correct" && (
              <div className="bg-green-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-2xl md:text-3xl font-bold text-center mb-2">{praise}</p>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 text-white" />
                  <span className="text-white font-mono text-lg md:text-xl">→ {output}</span>
                </div>
              </div>
            )}

            {phase !== "correct" && renderHint()}

            {phase !== "correct" && (
              <Button 
                onClick={check}
                disabled={!input.trim()}
                className={cn(
                  "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl transition-all font-bold shadow-xl",
                  input.trim() 
                    ? "bg-orange-500 hover:bg-orange-400 text-white animate-button-ready" 
                    : "bg-gray-300 text-gray-500"
                )}
              >
                <Play className="w-6 h-6 mr-2" /> 실행하기
              </Button>
            )}
          </div>
        </div>

        <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
          }
          .animate-shake { animation: shake 0.3s ease-in-out; }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        `}</style>
      </div>
    )
  }

  // ============================================================
  // 메인 화면
  // ============================================================
  return (
    <div className={cn(
      "min-h-screen transition-all duration-300",
      phase === "correct" ? "bg-green-100" :
      phase === "wrong" ? "bg-red-100" :
      "bg-indigo-50",
      isTransitioning && "opacity-50"
    )}>
      <StreakBonus />
      
      {/* 상단 바 - 학습 페이지: max-w-[1300px] */}
      <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => router.push("/curriculum")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors shadow-lg"
          title="나가기 (Esc)"
        >
          <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </button>
        
        <div className="flex-1 h-5 md:h-6 bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <StreakDisplay />
        
        <div className="flex items-center gap-2 bg-amber-500 px-4 py-2 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="font-bold text-lg md:text-xl text-white">{score}</span>
        </div>
      </div>

      {/* 메인 콘텐츠 - 학습 페이지: max-w-[1300px] */}
      <div className={cn(
        "max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 transition-opacity duration-200",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}>

        {/* 챕터 시작 */}
        {current.type === "chapter" && (
          <div className="pt-16 md:pt-24 text-center space-y-6 md:space-y-8 animate-fadeIn">
            <div className="inline-block px-6 py-3 bg-indigo-600 rounded-full shadow-xl">
              <span className="text-white font-bold text-xl md:text-2xl">📚 Chapter {current.content.num}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              {current.content.title}
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl font-medium">
              {current.content.desc}
            </p>
            <Button 
              onClick={next}
              className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              시작! <ChevronRight className="w-8 h-8 ml-2" />
            </Button>
            <p className="text-gray-400 text-base">Enter로 계속</p>
          </div>
        )}

        {/* 보상 */}
        {current.type === "reward" && (
          <div className="pt-16 md:pt-24 text-center space-y-8 md:space-y-10 animate-fadeIn">
            <div className="text-8xl md:text-[10rem] animate-bounce">
              {current.content.emoji}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {current.content.message}
            </h2>
            <div className="inline-flex items-center gap-3 bg-amber-500 px-8 py-4 rounded-full shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-4xl md:text-5xl font-bold text-white">{score}점</span>
            </div>
            <div className="pt-4">
              <Button 
                onClick={next}
                className="w-full max-w-md mx-auto px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                계속하기 <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* 요약 */}
        {current.type === "summary" && (
          <div className="pt-12 md:pt-16 text-center space-y-6 md:space-y-8 animate-fadeIn">
            <div className="text-7xl md:text-8xl">
              {current.content.emoji}
            </div>
            <div className="space-y-2">
              <p className="text-indigo-600 font-bold text-xl md:text-2xl">Chapter {current.content.num} 완료!</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {current.content.title} 마스터!
              </h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-indigo-200 text-left">
              <p className="text-indigo-600 font-bold text-lg md:text-xl mb-4">📝 오늘 배운 것</p>
              <ul className="space-y-3">
                {current.content.learned.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700 text-lg md:text-xl font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-100 rounded-2xl p-5 md:p-6 border-4 border-green-300">
              <p className="text-green-700 text-xl md:text-2xl font-bold">
                🎯 {current.content.canDo}
              </p>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-amber-500 px-8 py-4 rounded-full shadow-xl">
              <Trophy className="w-8 h-8 text-white" />
              <span className="text-3xl md:text-4xl font-bold text-white">{score}점</span>
            </div>
            
            {wrongAnswers.length > 0 ? (
              <div className="space-y-4">
                <p className="text-orange-600 font-bold text-xl md:text-2xl">
                  틀린 문제 {wrongAnswers.length}개 복습할까?
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={startReview}
                    className="px-8 py-6 text-xl bg-orange-500 hover:bg-orange-400 rounded-xl border-0 font-bold text-white shadow-lg"
                  >
                    <RotateCcw className="w-6 h-6 mr-2" /> 복습하기
                  </Button>
                  <Button 
                    onClick={next}
                    className="px-8 py-6 text-xl rounded-xl border-4 border-gray-400 text-gray-600 hover:bg-gray-100 font-bold bg-white"
                  >
                    건너뛰기
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={next}
                className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                다음으로 <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* 설명 (예측 퀴즈 포함) */}
        {current.type === "explain" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8">
            <div className="space-y-2">
              {current.content.lines.map((line: string, i: number) => (
                <p key={i} className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
                  {line}
                </p>
              ))}
            </div>

            {current.content.code && (
              <div 
                className={cn(
                  "bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-indigo-200",
                  !typingComplete && "cursor-pointer"
                )}
                onClick={skipTyping}
              >
                <div className="p-6 md:p-8 bg-gray-900 min-h-[80px] md:min-h-[100px]">
                  <pre className={cn(
                    "font-mono text-xl md:text-3xl text-center whitespace-pre-wrap font-bold leading-loose",
                    current.content.isError ? "text-red-400" : 
                    current.content.isPreview ? "text-green-400" : "text-yellow-300"
                  )}>
                    {typedCode}<span className={cn(
                      "inline-block w-3 h-6 md:h-8 bg-current ml-1 align-middle",
                      typingComplete ? "opacity-0" : "animate-blink"
                    )}/>
                  </pre>
                </div>
                
                {/* 결과 영역 - 예측 퀴즈가 있으면 맞춘 후에만 표시 */}
                {current.content.result && (
                  <div className={cn(
                    "px-6 py-4 md:px-8 md:py-5 transition-all duration-300",
                    showResult 
                      ? (current.content.isError ? "bg-red-600" : "bg-green-600")
                      : "bg-gray-900"
                  )}>
                    <p className={cn(
                      "font-mono text-center text-xl md:text-2xl font-bold transition-opacity duration-300",
                      showResult ? "text-white opacity-100" : "opacity-0"
                    )}>
                      → {current.content.result}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 예측 퀴즈 */}
            {current.content.predict && typingComplete && !predictAnswered && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-center text-xl md:text-2xl font-bold text-amber-600">
                  🤔 {current.content.predict.question || "결과가 뭘까?"}
                </p>
                <div className="space-y-3">
                  {current.content.predict.options.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => selectPredict(idx)}
                      className="w-full p-4 md:p-5 rounded-2xl font-mono text-lg md:text-xl font-bold shadow-lg border-4 bg-white hover:bg-amber-50 text-gray-800 border-amber-200 hover:border-amber-400 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 예측 결과 피드백 */}
            {current.content.predict && predictAnswered && !showResult && (
              <div className={cn(
                "rounded-2xl p-4 animate-fadeIn text-center",
                predictSelected === current.content.predict.answer 
                  ? "bg-green-600" 
                  : "bg-red-500"
              )}>
                <p className="text-white text-xl md:text-2xl font-bold">
                  {predictSelected === current.content.predict.answer 
                    ? "정답! 👏 +5점" 
                    : `아쉬워! 정답은 "${current.content.predict.options[current.content.predict.answer]}"`
                  }
                </p>
                {current.content.predict.feedback && predictSelected !== current.content.predict.answer && (
                  <p className="text-white/90 text-base md:text-lg mt-2">
                    💡 {current.content.predict.feedback}
                  </p>
                )}
              </div>
            )}

            {current.content.note && (
              <p className={cn(
                "text-gray-600 text-center text-lg md:text-xl font-medium transition-opacity duration-300",
                (current.content.predict ? showResult : typingComplete) ? "opacity-100" : "opacity-0"
              )}>
                💬 {current.content.note}
              </p>
            )}
            
            {/* 예측 퀴즈가 있으면 맞춰야 다음 버튼 활성화 */}
            {(!current.content.predict || predictAnswered) && (
              <>
                <Button 
                  onClick={next}
                  className="w-full py-7 md:py-8 text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
                >
                  다음 <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
                </Button>
                <p className="text-gray-400 text-base text-center">Enter로 계속</p>
              </>
            )}
          </div>
        )}

        {/* 에러 퀴즈 */}
        {current.type === "errorQuiz" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full text-lg font-bold bg-red-500 text-white shadow-lg">
                🔍 에러 탐정
              </span>
            </div>
            
            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {current.content.question}
            </p>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-red-200">
              <div className="p-6 md:p-8 bg-gray-900">
                <pre className="font-mono text-xl md:text-2xl text-center text-red-400 font-bold">
                  {current.content.code}
                </pre>
              </div>
              <div className="px-6 py-3 bg-red-600">
                <p className="font-mono text-center text-lg text-white font-bold">
                  ❌ Error!
                </p>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-5">
              {current.content.options.map((opt: string, idx: number) => {
                const isSelected = selected === idx
                const isAnswer = idx === current.content.answer
                const showResultState = selected !== null
                
                return (
                  <button
                    key={idx}
                    onClick={() => selectErrorQuiz(idx)}
                    disabled={selected !== null}
                    className={cn(
                      "w-full p-5 md:p-6 rounded-2xl text-left text-lg md:text-xl transition-all font-bold shadow-lg border-4",
                      !showResultState && "bg-white hover:bg-red-50 text-gray-800 border-red-200 hover:border-red-400",
                      showResultState && isAnswer && "bg-green-600 text-white border-green-600",
                      showResultState && isSelected && !isAnswer && "bg-red-600 text-white border-red-600",
                      showResultState && !isSelected && !isAnswer && "bg-gray-200 text-gray-400 border-gray-200"
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {showExplanation && current.content.explanation && (
              <div className="bg-green-600 rounded-2xl p-5 animate-fadeIn">
                <p className="text-white text-lg md:text-xl font-bold">
                  💡 {current.content.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 인터리빙 */}
        {current.type === "interleaving" && (
          <div className="pt-8 md:pt-12 space-y-5 md:space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full text-lg font-bold bg-purple-500 text-white shadow-lg">
                <Zap className="w-5 h-5 inline mr-1" /> 복습
              </span>
            </div>
            
            <p className="text-purple-600 text-xl md:text-2xl font-bold text-center">
              {current.content.message}
            </p>

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {current.content.task}
            </p>

            <SymbolButtons />

            <div className={cn(
              "bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-purple-200",
              phase === "input" && !input && "animate-glow"
            )}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={phase === "correct"}
                placeholder="여기에 코드 입력!"
                className={cn(
                  "w-full h-24 md:h-28 bg-purple-50 text-purple-900 font-mono font-bold p-4 md:p-5 rounded-2xl text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 resize-none placeholder:text-purple-300 border-4 border-purple-200",
                  phase === "wrong" && "ring-4 ring-red-500 border-red-500"
                )}
                spellCheck={false}
              />
            </div>

            {phase === "correct" && (
              <div className="bg-green-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-2xl md:text-3xl font-bold text-center mb-2">{praise}</p>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 text-white" />
                  <span className="text-white font-mono text-lg md:text-xl">→ {output}</span>
                </div>
              </div>
            )}

            {phase !== "correct" && renderHint()}

            {phase !== "correct" && (
              <Button 
                onClick={check}
                disabled={!input.trim()}
                className={cn(
                  "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl transition-all font-bold shadow-xl",
                  input.trim() 
                    ? "bg-purple-600 hover:bg-purple-500 text-white animate-button-ready" 
                    : "bg-gray-300 text-gray-500"
                )}
              >
                <Play className="w-6 h-6 mr-2" /> 실행하기
              </Button>
            )}
          </div>
        )}

        {/* 연습 */}
        {current.type === "practice" && (
          <div className="pt-8 md:pt-12 space-y-5 md:space-y-6 animate-fadeIn">
            {current.content.level && (
              <div className="flex justify-center">
                <span className={cn(
                  "px-6 py-2 rounded-full text-lg md:text-xl font-bold shadow-lg",
                  getLevelBadge(current.content.level).color
                )}>
                  {getLevelBadge(current.content.level).label}
                </span>
              </div>
            )}

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {current.content.task}
            </p>

            {current.content.guide && (
              <p className="text-indigo-600 text-lg md:text-xl text-center font-bold">
                💡 {current.content.guide}
              </p>
            )}

            {!current.content.template && <SymbolButtons />}

            {current.content.template ? (
              <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-indigo-200">
                <div className="flex items-center justify-center gap-1 font-mono text-xl md:text-3xl flex-wrap">
                  <span className="text-gray-500 font-bold">{current.content.template.before}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && input && check()}
                    disabled={phase === "correct"}
                    className={cn(
                      "bg-indigo-100 text-indigo-900 font-mono font-bold px-4 py-3 md:px-6 md:py-4 rounded-xl text-center focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all border-4 border-indigo-300",
                      phase === "wrong" && "ring-4 ring-red-500 border-red-500 animate-shake",
                      phase === "input" && !input && "animate-pulse-border"
                    )}
                    style={{ width: `${Math.max(120, current.content.answer.length * 20 + 60)}px` }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span className="text-gray-500 font-bold">{current.content.template.after}</span>
                </div>
              </div>
            ) : (
              <div className={cn(
                "bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-indigo-200",
                phase === "input" && !input && "animate-glow"
              )}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={phase === "correct"}
                  placeholder="여기에 코드 입력!"
                  className={cn(
                    "w-full h-24 md:h-28 bg-indigo-50 text-indigo-900 font-mono font-bold p-4 md:p-5 rounded-2xl text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400 resize-none placeholder:text-indigo-300 border-4 border-indigo-200",
                    phase === "wrong" && "ring-4 ring-red-500 border-red-500"
                  )}
                  spellCheck={false}
                />
              </div>
            )}

            {phase === "correct" && (
              <div className="bg-green-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-2xl md:text-3xl font-bold text-center mb-2">{praise}</p>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 text-white" />
                  <span className="text-white font-mono text-lg md:text-xl">→ {output}</span>
                </div>
              </div>
            )}

            {phase !== "correct" && renderHint()}

            {phase !== "correct" && (
              <Button 
                onClick={check}
                disabled={!input.trim()}
                className={cn(
                  "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl transition-all font-bold shadow-xl",
                  input.trim() 
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white animate-button-ready" 
                    : "bg-gray-300 text-gray-500"
                )}
              >
                <Play className="w-6 h-6 mr-2" /> 실행하기
              </Button>
            )}
          </div>
        )}

        {/* 퀴즈 */}
        {current.type === "quiz" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8 animate-fadeIn">
            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              🤔 {current.content.question}
            </p>
            
            <div className="space-y-4 md:space-y-5">
              {current.content.options.map((opt: string, idx: number) => {
                const isSelected = selected === idx
                const isAnswer = idx === current.content.answer
                const showResultState = selected !== null
                
                return (
                  <button
                    key={idx}
                    onClick={() => selectQuiz(idx)}
                    disabled={selected !== null}
                    className={cn(
                      "w-full p-5 md:p-6 rounded-2xl font-mono text-left text-lg md:text-xl transition-all font-bold shadow-lg border-4",
                      !showResultState && "bg-white hover:bg-indigo-50 text-gray-800 border-indigo-200 hover:border-indigo-400",
                      showResultState && isAnswer && "bg-green-600 text-white border-green-600",
                      showResultState && isSelected && !isAnswer && "bg-red-600 text-white border-red-600",
                      showResultState && !isSelected && !isAnswer && "bg-gray-200 text-gray-400 border-gray-200"
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {showExplanation && current.content.explanation && (
              <div className="bg-indigo-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-lg md:text-xl font-bold">
                  💡 {current.content.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 프로젝트 */}
        {current.type === "project" && (
          <div className="pt-6 md:pt-10 space-y-5 md:space-y-6 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {Array.from({ length: current.content.total }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 md:h-5 rounded-full transition-all",
                    i < current.content.step ? "w-12 md:w-16 bg-indigo-600" : "w-6 md:w-8 bg-gray-300"
                  )}
                />
              ))}
              <span className="text-gray-600 text-lg md:text-xl ml-2 font-bold">
                {current.content.step}/{current.content.total}
              </span>
            </div>

            {current.content.done.length > 0 && (
              <div className="bg-gray-100 rounded-2xl p-4 md:p-5 border-4 border-gray-200">
                {current.content.done.map((line: string, i: number) => (
                  <p key={i} className="text-green-700 font-mono text-base md:text-lg font-medium">{line}</p>
                ))}
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="text-gray-900 text-xl md:text-3xl font-bold">
                🎯 {current.content.task}
              </p>
              <p className="text-indigo-600 font-mono text-lg md:text-xl font-bold">
                → {current.content.target}
              </p>
            </div>

            <SymbolButtons />

            <div className={cn(
              "bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-indigo-200",
              phase === "input" && !input && "animate-glow"
            )}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input && check()}
                disabled={phase === "correct"}
                placeholder="여기에 코드 입력!"
                className={cn(
                  "w-full bg-indigo-50 text-indigo-900 font-mono font-bold px-5 py-5 md:px-6 md:py-6 rounded-2xl text-center text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-indigo-400 placeholder:text-indigo-300 border-4 border-indigo-200",
                  phase === "wrong" && "ring-4 ring-red-500 border-red-500 animate-shake"
                )}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {phase === "correct" && (
              <div className="bg-green-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-2xl md:text-3xl font-bold text-center mb-2">{praise}</p>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-6 h-6 text-white" />
                  <span className="text-white font-mono text-lg md:text-xl">→ {output}</span>
                </div>
              </div>
            )}

            {phase !== "correct" && renderHint()}

            {phase !== "correct" && (
              <Button 
                onClick={check}
                disabled={!input.trim()}
                className={cn(
                  "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl font-bold shadow-xl",
                  input.trim() 
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white animate-button-ready" 
                    : "bg-gray-300 text-gray-500"
                )}
              >
                <Play className="w-6 h-6 mr-2" /> 실행하기
              </Button>
            )}
          </div>
        )}

        {/* 인터랙티브 애니메이션 */}
        {current.type === "interactive" && (
          <div className="pt-4 md:pt-6 space-y-4 md:space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {current.content.title}
              </h2>
              {current.content.description && (
                <p className="text-gray-600 text-base md:text-lg">
                  {current.content.description}
                </p>
              )}
            </div>

            {/* 데이터 구조 애니메이션 */}
            {current.content.component === "dataStructures" && (
              <DataStructuresComparison />
            )}

            <Button 
              onClick={next}
              className="w-full py-6 md:py-7 text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              다음 단계로 <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
            </Button>
          </div>
        )}

        {/* 코딩 연습 (Python 실행) */}
        {current.type === "coding" && (
          <div className="pt-4 md:pt-6 space-y-4 md:space-y-6 animate-fadeIn">
            <PythonRunner
              title={current.content.title}
              description={current.content.description}
              starterCode={current.content.starterCode || ""}
              testCases={current.content.testCases || []}
              hints={current.content.hints || []}
            />
            
            <Button 
              onClick={next}
              className="w-full py-6 md:py-7 text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              다음 단계로 <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
            </Button>
          </div>
        )}

        {/* 완료 */}
        {current.type === "done" && (
          <div className="pt-10 md:pt-16 space-y-8 md:space-y-10 animate-fadeIn">
            <div className="text-center">
              <div className="text-8xl md:text-[10rem] mb-6">🏆</div>
              <p className="text-indigo-600 font-bold mb-2 text-2xl md:text-3xl">레슨 완료!</p>
              <p className="text-gray-500 text-lg md:text-xl mb-2">최종 점수</p>
              <p className="text-7xl md:text-9xl font-bold text-amber-500">
                {score}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-indigo-200">
              <p className="text-gray-600 text-lg md:text-xl mb-4 font-bold">🍗 내가 만든 것</p>
              <pre className="text-green-700 font-mono text-lg md:text-xl whitespace-pre-wrap font-bold bg-green-100 p-5 rounded-xl">
{`=== 치킨 계산기 ===
치킨: 19000 원
콜라: 2000 원
총합: 21000 원`}
              </pre>
            </div>
            
            <div className="bg-indigo-100 rounded-2xl p-5 md:p-6 border-4 border-indigo-300">
              <p className="text-indigo-700 text-lg md:text-xl font-bold text-center">
                🎯 print()로 원하는 것을 출력하고 계산할 수 있어!
              </p>
            </div>
            
            <Button 
              onClick={() => {
                localStorage.removeItem(`lesson-${lessonId}`)
                router.push("/curriculum")
              }}
              className="w-full py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              완료! <ChevronRight className="w-8 h-8 ml-2" />
            </Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
        }
        .animate-pulse-border { animation: pulse-border 1.5s ease-in-out infinite; }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4); }
        }
        .animate-glow { animation: glow 1.5s ease-in-out infinite; }
        
        @keyframes button-ready {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-button-ready { animation: button-ready 0.8s ease-in-out infinite; }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 0.8s step-end infinite; }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  )
}
