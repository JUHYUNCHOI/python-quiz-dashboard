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
import { DataStructuresComparison, FunctionBuilder } from "@/components/animations"

// Python 코드 실행 컴포넌트
import { PythonRunner } from "@/components/code-runner/PythonRunner"

// 커스텀 Python 파서 (함수 지원)
import { runPythonCode } from "./utils/pythonRunner"

// Supabase 진도 동기화
import { useLessonSync } from "@/hooks/use-lesson-sync"
import { markLessonComplete } from "@/lib/mark-lesson-complete"

// 다국어 지원
import { useLanguage } from "@/contexts/language-context"

// ============================================================
// Python Syntax Highlighting (경량 토크나이저)
// ============================================================
const PY_KEYWORDS = new Set([
  'try','except','finally','if','elif','else','while','for','in',
  'def','return','break','continue','import','from','as','class',
  'pass','raise','with','and','or','not','is','None','True','False'
])
const PY_BUILTINS = new Set([
  'print','input','int','float','str','len','range','open','type'
])

function highlightPythonLine(line: string): React.ReactNode[] {
  if (!line || !line.trim()) return [<span key={0}>{'\u00A0'}</span>]
  
  const tokens: React.ReactNode[] = []
  let pos = 0
  let key = 0

  const push = (text: string, cls: string) => {
    tokens.push(<span key={key++} className={cls}>{text}</span>)
  }

  while (pos < line.length) {
    const ch = line[pos]

    // 1) 공백 (들여쓰기 포함)
    if (ch === ' ' || ch === '\t') {
      let end = pos
      while (end < line.length && (line[end] === ' ' || line[end] === '\t')) end++
      push(line.slice(pos, end), "")
      pos = end
      continue
    }

    // 2) 주석
    if (ch === '#') {
      push(line.slice(pos), "text-gray-500 italic")
      break
    }

    // 3) 문자열 — f-string 포함
    if (ch === "'" || ch === '"' || ((ch === 'f' || ch === 'F') && pos + 1 < line.length && (line[pos+1] === "'" || line[pos+1] === '"'))) {
      let start = pos
      if (ch === 'f' || ch === 'F') pos++
      const q = line[pos]
      pos++
      while (pos < line.length && line[pos] !== q) {
        if (line[pos] === '\\') pos++
        pos++
      }
      if (pos < line.length) pos++
      push(line.slice(start, pos), "text-green-400")
      continue
    }

    // 4) 숫자
    if (/[0-9]/.test(ch)) {
      let end = pos
      while (end < line.length && /[0-9.]/.test(line[end])) end++
      push(line.slice(pos, end), "text-orange-300")
      pos = end
      continue
    }

    // 5) 식별자 / 키워드 (영문, 한글, _)
    if (/[a-zA-Z_\u3131-\u318E\uAC00-\uD7A3]/.test(ch)) {
      let end = pos
      while (end < line.length && /[a-zA-Z0-9_\u3131-\u318E\uAC00-\uD7A3]/.test(line[end])) end++
      const word = line.slice(pos, end)
      if (PY_KEYWORDS.has(word)) {
        push(word, "text-purple-400")
      } else if (PY_BUILTINS.has(word)) {
        push(word, "text-yellow-300")
      } else {
        push(word, "text-blue-300")
      }
      pos = end
      continue
    }

    // 6) 연산자 / 구두점
    if ('()[]{}:=+-*/%<>!,.@'.includes(ch)) {
      push(ch, "text-gray-400")
      pos++
      continue
    }

    // 7) 기타 (이모지 등)
    push(ch, "text-gray-300")
    pos++
  }

  return tokens
}

// ============================================================
// C++ Syntax Highlighting (경량 토크나이저)
// ============================================================
const CPP_KEYWORDS = new Set([
  'if','else','while','for','do','switch','case','break','continue',
  'return','int','float','double','char','string','bool','void','auto',
  'const','static','class','struct','public','private','protected',
  'using','namespace','include','true','false','endl','cout','cin',
  'nullptr','new','delete','template','typename','virtual','override'
])
const CPP_PREPROCESSOR = new Set(['#include','#define','#ifdef','#ifndef','#endif','#pragma'])

function highlightCppLine(line: string): React.ReactNode[] {
  if (!line || !line.trim()) return [<span key={0}>{'\u00A0'}</span>]

  const tokens: React.ReactNode[] = []
  let pos = 0
  let key = 0

  const push = (text: string, cls: string) => {
    tokens.push(<span key={key++} className={cls}>{text}</span>)
  }

  while (pos < line.length) {
    const ch = line[pos]

    // 1) 공백
    if (ch === ' ' || ch === '\t') {
      let end = pos
      while (end < line.length && (line[end] === ' ' || line[end] === '\t')) end++
      push(line.slice(pos, end), "")
      pos = end
      continue
    }

    // 2) 전처리기 지시문 (#include 등)
    if (ch === '#') {
      let end = pos + 1
      while (end < line.length && /[a-zA-Z]/.test(line[end])) end++
      const directive = line.slice(pos, end)
      if (CPP_PREPROCESSOR.has(directive)) {
        push(directive, "text-purple-400")
        pos = end
        // #include 뒤의 <...> 처리
        if (directive === '#include') {
          // 공백 건너뛰기
          while (pos < line.length && line[pos] === ' ') {
            push(' ', "")
            pos++
          }
          if (pos < line.length && line[pos] === '<') {
            let endBracket = pos + 1
            while (endBracket < line.length && line[endBracket] !== '>') endBracket++
            if (endBracket < line.length) endBracket++
            push(line.slice(pos, endBracket), "text-green-400")
            pos = endBracket
          }
        }
        continue
      }
      push(ch, "text-gray-400")
      pos++
      continue
    }

    // 3) 주석 (//)
    if (ch === '/' && pos + 1 < line.length && line[pos + 1] === '/') {
      push(line.slice(pos), "text-gray-500 italic")
      break
    }

    // 4) 문자열
    if (ch === '"' || ch === "'") {
      let start = pos
      const q = ch
      pos++
      while (pos < line.length && line[pos] !== q) {
        if (line[pos] === '\\') pos++
        pos++
      }
      if (pos < line.length) pos++
      push(line.slice(start, pos), "text-green-400")
      continue
    }

    // 5) 숫자
    if (/[0-9]/.test(ch)) {
      let end = pos
      while (end < line.length && /[0-9.]/.test(line[end])) end++
      push(line.slice(pos, end), "text-orange-300")
      pos = end
      continue
    }

    // 6) 식별자 / 키워드
    if (/[a-zA-Z_]/.test(ch)) {
      let end = pos
      while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) end++
      const word = line.slice(pos, end)
      if (CPP_KEYWORDS.has(word)) {
        push(word, "text-purple-400")
      } else if (word === 'std' || word === 'main') {
        push(word, "text-yellow-300")
      } else {
        push(word, "text-blue-300")
      }
      pos = end
      continue
    }

    // 7) << >> 연산자
    if ((ch === '<' || ch === '>') && pos + 1 < line.length && line[pos + 1] === ch) {
      push(ch + ch, "text-gray-400")
      pos += 2
      continue
    }

    // 8) 연산자 / 구두점
    if ('()[]{}:=+-*/%<>!,.;@&|^~'.includes(ch)) {
      push(ch, "text-gray-400")
      pos++
      continue
    }

    // 9) 기타
    push(ch, "text-gray-300")
    pos++
  }

  return tokens
}

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
  const { t, lang } = useLanguage()

  const lesson = lessonsData[lessonId]
  const highlightLine = lesson?.language === "cpp" ? highlightCppLine : highlightPythonLine

  // Supabase 진도 동기화
  const { syncProgress, syncCompletion, loadFromCloud } = useLessonSync(lessonId, null, "review")

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
  const [blanks, setBlanks] = useState<string[]>([])  // 여러 빈칸 template용
  const [typedCode, setTypedCode] = useState("")  // 하위호환 (코드 없는 explain용)
  const [showResult, setShowResult] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  
  // 시퀀스 표시 상태
  const [visibleLines, setVisibleLines] = useState(0)       // 보이는 코드 줄 수
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [visibleHeadlines, setVisibleHeadlines] = useState(0) // headlines 표시 수
  
  // 예측 퀴즈 상태
  const [predictSelected, setPredictSelected] = useState<number | null>(null)
  const [predictAnswered, setPredictAnswered] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const current = lesson?.steps[step]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = current?.content as any
  const progress = lesson ? ((step + 1) / lesson.steps.length) * 100 : 0

  // ============================================================
  // 진행 상황 로드/저장
  // ============================================================
  useEffect(() => {
    if (!lesson) return
    try {
      const saved = localStorage.getItem(`lesson-${lessonId}`)
      if (saved) {
        const data = JSON.parse(saved)
        const savedStep = typeof data.step === 'number' ? data.step : 0
        if (savedStep > 0 && savedStep < lesson.steps.length) {
          setStep(savedStep)
          setScore(typeof data.score === 'number' ? data.score : 0)
          setWrongAnswers(Array.isArray(data.wrongAnswers) ? data.wrongAnswers : [])
          setStreak(typeof data.streak === 'number' ? data.streak : 0)
        } else if (savedStep >= lesson.steps.length) {
          localStorage.removeItem(`lesson-${lessonId}`)
        }
      } else {
        // localStorage 비어있으면 Supabase에서 복구 시도
        loadFromCloud().then(data => {
          if (data && lesson) {
            const savedStep = typeof data.step === 'number' ? data.step as number : 0
            if (savedStep > 0 && savedStep < lesson.steps.length) {
              setStep(savedStep)
              setScore(typeof data.score === 'number' ? data.score as number : 0)
              setWrongAnswers(Array.isArray(data.wrongAnswers) ? data.wrongAnswers as typeof wrongAnswers : [])
              setStreak(typeof data.streak === 'number' ? data.streak as number : 0)
            }
          }
        })
      }
    } catch (e) {
      console.error('Failed to load progress', e)
      try { localStorage.removeItem(`lesson-${lessonId}`) } catch {}
    }
  }, [lessonId, lesson, loadFromCloud])

  useEffect(() => {
    if (!lesson) return
    const progressData = { step, score, wrongAnswers, streak }
    try {
      localStorage.setItem(`lesson-${lessonId}`, JSON.stringify(progressData))
    } catch {
      // localStorage 접근 불가 시 무시
    }
    // Supabase에도 동기화 (debounced, fire-and-forget)
    syncProgress(progressData)
  }, [step, score, wrongAnswers, streak, lessonId, lesson, syncProgress])

  // ============================================================
  // 입력 포커스
  // ============================================================
  useEffect(() => {
    if (!current) return
    if (["practice", "project", "interleaving"].includes(current.type)) {
      setTimeout(() => {
        if (c.template) {
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
    setVisibleLines(0)
    setCodeLines([])
    setVisibleHeadlines(0)
    setPredictSelected(null)
    setPredictAnswered(false)
    setBlanks([])
  }, [step, reviewIndex])

  // 문자열 template의 빈칸 수에 맞게 blanks 초기화
  useEffect(() => {
    if (!current) return
    if (["practice", "interleaving"].includes(current.type) && typeof c.template === 'string') {
      const count = (c.template.match(/___/g) || []).length
      setBlanks(new Array(count).fill(""))
    }
  }, [step, current])

  // ============================================================
  // 시퀀스 타이핑 시스템 (explain 타입)
  // 흐름: headlines 순차 등장 → 코드 글자 타이핑 → result 등장 → pause → note 등장
  // 탭하면 현재 줄 즉시 완성 or 다음 단계로
  // ============================================================
  const seqTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const clearSeqTimer = useCallback(() => {
    if (seqTimerRef.current) {
      clearTimeout(seqTimerRef.current)
      seqTimerRef.current = null
    }
  }, [])

  // 초기화: headlines 즉시 전부 + 첫 코드 줄 표시
  // codeLines와 visibleLines를 한 번에 셋팅해서 race condition 방지
  useEffect(() => {
    if (current?.type !== "explain") return

    const headlines = c.lines || []
    const code = c.code
    const lines = code ? code.split('\n') : []

    // headlines 즉시 전체 표시
    setVisibleHeadlines(headlines.length)
    setCodeLines(lines)

    if (lines.length > 0) {
      // 첫 번째 코드 줄만 즉시 표시 (나머지는 탭/클릭으로)
      setVisibleLines(1)
      // 1줄짜리 코드면 바로 완료
      if (lines.length === 1) {
        setTypingComplete(true)
        setTypedCode(lines.join('\n'))
      }
    } else {
      // 코드 없으면 바로 완료
      setTypingComplete(true)
    }

    return clearSeqTimer
  }, [step, current, clearSeqTimer])

  // 줄이 추가될 때 전체 완료 체크 (2줄 이상일 때만 동작)
  useEffect(() => {
    if (current?.type !== "explain" || !c.code) return
    if (typingComplete) return
    if (codeLines.length <= 1) return  // 1줄은 초기화에서 처리
    if (visibleLines <= 0) return

    if (visibleLines >= codeLines.length) {
      setTypingComplete(true)
      setTypedCode(codeLines.join('\n'))
    }
  }, [current, typingComplete, visibleLines, codeLines])

  // 탭/클릭 → 다음 줄 즉시 표시
  const handleCodeClick = useCallback(() => {
    if (!c?.code) return
    if (typingComplete) return
    clearSeqTimer()

    if (visibleLines < codeLines.length) {
      setVisibleLines(prev => prev + 1)
    }
  }, [current, typingComplete, visibleLines, codeLines, clearSeqTimer])
  
  // 코드 타이핑 완료 → result + note 즉시 표시 (예측 퀴즈 없을 때)
  useEffect(() => {
    if (!typingComplete) return
    if (!c?.result) return
    if (c.predict) return
    if (showResult) return

    // 짧은 fade-in만 (0.15초)
    const timer = setTimeout(() => {
      setShowResult(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [typingComplete, current, showResult])

  // ============================================================
  // 네비게이션
  // ============================================================
  const next = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (step + 1 < (lesson?.steps.length || 0)) {
        setStep(step + 1)
      } else {
        syncCompletion(score)
        markLessonComplete(lessonId)
        try { localStorage.removeItem(`lesson-${lessonId}`) } catch {}
        router.push("/curriculum")
      }
      setIsTransitioning(false)
    }, 200)
  }, [step, score, lesson, lessonId, router, syncCompletion])

  // ============================================================
  // 키보드 이벤트
  // ============================================================
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.push("/curriculum")
      return
    }

    if ((e.key === "Enter" || e.key === " ") && !e.shiftKey) {
      // explain에서 예측 퀴즈가 있고 아직 안 풀었으면 무시
      if (current?.type === "explain" && c.predict && !predictAnswered) {
        return
      }

      // explain에서 코드가 아직 다 안 보였으면 → 다음 줄 표시
      if (current?.type === "explain" && c.code && !typingComplete) {
        e.preventDefault()
        handleCodeClick()
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
  }, [current, router, next, predictAnswered, typingComplete, handleCodeClick])

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
    
    const isCorrect = idx === c.predict.answer
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
          <p className="text-gray-600 mb-4">{t("아직 준비 중인 레슨이에요", "This lesson is not ready yet")}</p>
          <Button onClick={() => router.push("/curriculum")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">{t("돌아가기", "Go Back")}</Button>
        </div>
      </div>
    )
  }

  // ============================================================
  // 유틸리티 함수들
  // ============================================================
  const insertSymbol = (symbol: string) => {
    setInput(prev => prev + symbol)
    if (c.template) {
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
            return { result: "", error: t(`오타! ${typo} → print`, `Typo! ${typo} → print`) }
          }
        }
        
        if (/\bprin\s*\(/i.test(code) && !/\bprint\s*\(/i.test(code)) {
          return { result: "", error: t("오타! prin → print", "Typo! prin → print") }
        }
      }
      
      const m = code.match(/print\s*\(\s*([\s\S]*)\s*\)/i)
      if (!m) {
        if (code.toLowerCase().includes('print')) {
          return { result: "", error: t("print() 괄호 확인해봐!", "Check print() brackets!") }
        }
        return { result: "", error: t("print()를 써봐!", "Try using print()!") }
      }
      
      const inside = m[1].trim()
      if (!inside) return { result: "", error: t("print() 안에 뭔가 넣어봐!", "Put something inside print()!") }
      
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
        return { result: "", error: t('따옴표를 닫아봐! \' 또는 "', 'Close the quote! \' or "') }
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
          return { result: "", error: t("따옴표 종류를 맞춰봐!", "Match your quote types!") }
        }
        
        if (/^[\d\s+\-*/().]+$/.test(part)) {
          try {
            const calc = Function('return ' + part)()
            const numResult = Number.isInteger(calc) ? String(calc) : String(Math.round(calc * 100) / 100)
            results.push(numResult)
            continue
          } catch {
            return { result: "", error: t("계산식 확인해봐!", "Check your expression!") }
          }
        }
        
        if (/[a-zA-Z가-힣]/.test(part)) {
          const word = part.match(/[a-zA-Z가-힣]+/)?.[0]
          return { result: "", error: t(`${word}에 따옴표 붙여봐! '${word}'`, `Add quotes to ${word}! '${word}'`) }
        }
        
        results.push(part)
      }
      
      return { result: results.join(' ') }
    } catch {
      return { result: "", error: t("다시 확인해봐!", "Try again!") }
    }
  }

  const check = () => {
    const sc = showReview ? {
      task: wrongAnswers[reviewIndex].task,
      answer: wrongAnswers[reviewIndex].answer,
      expect: wrongAnswers[reviewIndex].expect,
      template: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any : c

    // 문자열 template인 경우: blanks 값을 정답과 직접 비교
    if (typeof sc.template === 'string' && sc.blanksAnswer) {
      const normalize = (s: string) => s.replace(/\s+/g, '').trim().toLowerCase()
      const allCorrect = sc.blanksAnswer.every((ans: string, idx: number) => {
        const userVal = (blanks[idx] || '').trim()
        // 여러 정답이 가능한 경우 (| 구분)
        const answers = ans.split('|').map((a: string) => a.trim())
        return answers.some(a => normalize(userVal) === normalize(a))
      })
      
      if (allCorrect) {
        setOutput(sc.expect || t("정답!", "Correct!"))
        setErrorMsg("")
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
        return
      } else {
        // 어떤 빈칸이 틀렸는지 피드백
        const wrongIdx = sc.blanksAnswer.findIndex((ans: string, idx: number) => {
          const userVal = (blanks[idx] || '').trim()
          const answers = ans.split('|').map((a: string) => a.trim())
          return !answers.some(a => normalize(userVal) === normalize(a))
        })
        const wrongBlank = blanks[wrongIdx] || ''
        setOutput("")
        setErrorMsg(wrongBlank ? t(`${wrongIdx + 1}번 빈칸을 다시 확인해봐!`, `Check blank #${wrongIdx + 1} again!`) : t(`${wrongIdx + 1}번 빈칸을 채워봐!`, `Fill in blank #${wrongIdx + 1}!`))
        setPhase("wrong")
        const newTries = tries + 1
        setTries(newTries)
        setStreak(0)
        if (newTries >= 1) setShowHint(Math.min(showHint + 1, 3))
        if (newTries === 1 && !showReview) {
          setWrongAnswers(prev => [...prev, {
            stepIndex: step,
            task: sc.task,
            answer: sc.answer,
            expect: sc.expect || ''
          }])
        }
        setTimeout(() => setPhase("input"), 800)
        return
      }
    }

    let code = ""
    const hasTemplate = !!sc.template
    if (typeof sc.template === 'string') {
      let blankIdx = 0
      code = sc.template.replace(/___/g, () => blanks[blankIdx++] || '')
    } else if (sc.template) {
      code = sc.template.before + input + sc.template.after
    } else {
      code = input
    }

    // C++: 코드 실행 불가 → 문자열 비교
    if (lesson?.language === "cpp") {
      const target = sc.target || sc.expect
      const normalize = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
      const normalizeStrict = (s: string) => s.replace(/\s+/g, '').trim().toLowerCase()

      // 정답 비교: answer 또는 expect와 코드 비교
      const codeNorm = normalizeStrict(code)
      const answerMatch = normalizeStrict(sc.answer || '') === codeNorm
        || normalizeStrict(target) === normalizeStrict(code)
        || (sc.alternateAnswers || []).some((alt: string) => normalizeStrict(alt) === codeNorm)

      if (answerMatch) {
        setOutput(target)
        setErrorMsg("")
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
        return
      } else {
        setOutput("")
        setErrorMsg(t("다시 확인해봐!", "Try again!"))
        setPhase("wrong")
        const newTries = tries + 1
        setTries(newTries)
        setStreak(0)
        if (newTries >= 1) setShowHint(Math.min(showHint + 1, 3))
        if (newTries === 1 && !showReview) {
          setWrongAnswers(prev => [...prev, {
            stepIndex: step,
            task: sc.task,
            answer: sc.answer,
            expect: sc.expect || sc.target
          }])
        }
        setTimeout(() => setPhase("input"), 800)
        return
      }
    }

    // 함수 정의가 포함된 코드면 새 파서 사용, 아니면 기존 파서 사용
    const useNewParser = code.includes('def ') || sc.useNewParser
    const { result, error } = useNewParser ? runPythonCode(code) : runCode(code, hasTemplate)

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
          task: sc.task,
          answer: sc.answer,
          expect: sc.expect || sc.target
        }])
      }

      setTimeout(() => setPhase("input"), 800)
      return
    }

    setOutput(result || "")
    setErrorMsg("")

    const target = sc.target || sc.expect
    const normalize = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()

    if (normalize(result || "") !== normalize(target)) {
      setPhase("wrong")
      const newTries = tries + 1
      setTries(newTries)
      setStreak(0)

      if (newTries >= 1) setShowHint(Math.min(showHint + 1, 3))

      if (newTries === 1 && !showReview) {
        setWrongAnswers(prev => [...prev, {
          stepIndex: step,
          task: sc.task,
          answer: sc.answer,
          expect: sc.expect || sc.target
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
    if (idx === c.answer) {
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
    if (idx === c.answer) {
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
    if (level === 1) return { label: t("⭐ 쉬움", "⭐ Easy"), color: "bg-green-600 text-white" }
    if (level === 1.5) return { label: t("⭐ 쉬움+", "⭐ Easy+"), color: "bg-teal-600 text-white" }
    if (level === 2) return { label: t("⭐⭐ 보통", "⭐⭐ Normal"), color: "bg-blue-600 text-white" }
    if (level === 2.5) return { label: t("⭐⭐ 보통+", "⭐⭐ Normal+"), color: "bg-indigo-600 text-white" }
    if (level === 3) return { label: t("⭐⭐⭐ 도전", "⭐⭐⭐ Challenge"), color: "bg-purple-600 text-white" }
    if (level === 4) return { label: t("🔥 혼자!", "🔥 Solo!"), color: "bg-rose-600 text-white" }
    return { label: "", color: "" }
  }

  const renderHint = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hc: any = showReview ? {
      hint: null,
      guide: null,
      answer: wrongAnswers[reviewIndex]?.answer
    } : c

    if (errorMsg && showHint === 0) {
      return (
        <div className="bg-red-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg font-bold">
            ❌ {errorMsg}
          </p>
          <p className="text-red-200 text-sm mt-1">{t("괜찮아! 다시 해보자 💪", "It's okay! Try again 💪")}</p>
        </div>
      )
    }

    if (showHint === 0) return null

    if (showHint === 1) {
      return (
        <div className="bg-amber-500 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg font-bold">
            💡 {errorMsg || hc.hint || hc.guide || t("천천히 다시 확인해봐!", "Take your time and try again!")}
          </p>
        </div>
      )
    }

    if (showHint === 2 && hc.hint) {
      return (
        <div className="bg-purple-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg mb-2 font-bold">{t("💡 이렇게 써봐", "💡 Try it like this")}</p>
          <p className="text-white font-mono text-base md:text-lg bg-purple-800 p-3 rounded-xl">{hc.hint}</p>
        </div>
      )
    }

    if (showHint >= 3 || (showHint >= 2 && !hc.hint)) {
      return (
        <div className="bg-pink-600 rounded-2xl p-4 animate-fadeIn">
          <p className="text-white text-base md:text-lg mb-2 font-bold">{t("🎯 정답 보고 직접 써봐", "🎯 Look at the answer and type it")}</p>
          <p className="text-white font-mono text-base md:text-lg bg-pink-800 p-3 rounded-xl select-none">{hc.answer}</p>
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
    const praises = lang === 'en'
      ? ["Correct! 🎉", "Perfect! ✨", "Genius?! 🧠", "Amazing! 🔥", "Fast! ⚡", "Great! 💪", "Nice! 👍", "Well done! 🌟", "Good! 👏", "Awesome! 😎"]
      : ["정답! 🎉", "완벽해! ✨", "천재?! 🧠", "멋져! 🔥", "빠르다! ⚡", "대단해! 💪", "좋았어! 👍", "잘했어! 🌟", "굿! 👏", "역시! 😎"]
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
          <div className="text-2xl font-bold">{t(`${streak}연속 정답!`, `${streak} in a row!`)}</div>
          <div className="text-lg">{t("+20 보너스!", "+20 Bonus!")}</div>
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
                {t("🔄 복습", "🔄 Review")}
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
                placeholder={t("여기에 코드 입력!", "Type your code here!")}
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
                <Play className="w-6 h-6 mr-2" /> {t("실행하기", "Run")}
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
              <span className="text-white font-bold text-xl md:text-2xl">📚 Chapter {c.num}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              {c.title}
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl font-medium">
              {c.desc}
            </p>
            <Button 
              onClick={next}
              className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              {t("시작!", "Start!")} <ChevronRight className="w-8 h-8 ml-2" />
            </Button>
            <p className="text-gray-400 text-base">{t("Enter로 계속", "Press Enter to continue")}</p>
          </div>
        )}

        {/* 보상 */}
        {current.type === "reward" && (
          <div className="pt-16 md:pt-24 text-center space-y-8 md:space-y-10 animate-fadeIn">
            <div className="text-8xl md:text-[10rem] animate-bounce">
              {c.emoji}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {c.message}
            </h2>
            <div className="inline-flex items-center gap-3 bg-amber-500 px-8 py-4 rounded-full shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-4xl md:text-5xl font-bold text-white">{score}{t("점", "pts")}</span>
            </div>
            <div className="pt-4">
              <Button 
                onClick={next}
                className="w-full max-w-md mx-auto px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                {t("계속하기", "Continue")} <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* 요약 */}
        {current.type === "summary" && (
          <div className="pt-12 md:pt-16 text-center space-y-6 md:space-y-8 animate-fadeIn">
            <div className="text-7xl md:text-8xl">
              {c.emoji}
            </div>
            <div className="space-y-2">
              <p className="text-indigo-600 font-bold text-xl md:text-2xl">Chapter {c.num} {t("완료!", "Complete!")}</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {c.title} {t("마스터!", "Mastered!")}
              </h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-indigo-200 text-left">
              <p className="text-indigo-600 font-bold text-lg md:text-xl mb-4">{t("📝 오늘 배운 것", "📝 What you learned")}</p>
              <ul className="space-y-3">
                {c.learned.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700 text-lg md:text-xl font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-100 rounded-2xl p-5 md:p-6 border-4 border-green-300">
              <p className="text-green-700 text-xl md:text-2xl font-bold">
                🎯 {c.canDo}
              </p>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-amber-500 px-8 py-4 rounded-full shadow-xl">
              <Trophy className="w-8 h-8 text-white" />
              <span className="text-3xl md:text-4xl font-bold text-white">{score}{t("점", "pts")}</span>
            </div>
            
            {wrongAnswers.length > 0 ? (
              <div className="space-y-4">
                <p className="text-orange-600 font-bold text-xl md:text-2xl">
                  {t(`틀린 문제 ${wrongAnswers.length}개 복습할까?`, `Review ${wrongAnswers.length} wrong answers?`)}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={startReview}
                    className="px-8 py-6 text-xl bg-orange-500 hover:bg-orange-400 rounded-xl border-0 font-bold text-white shadow-lg"
                  >
                    <RotateCcw className="w-6 h-6 mr-2" /> {t("복습하기", "Review")}
                  </Button>
                  <Button 
                    onClick={next}
                    className="px-8 py-6 text-xl rounded-xl border-4 border-gray-400 text-gray-600 hover:bg-gray-100 font-bold bg-white"
                  >
                    {t("건너뛰기", "Skip")}
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={next}
                className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                {t("다음으로", "Next")} <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* 설명 (예측 퀴즈 포함) */}
        {current.type === "explain" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8">
            <div className="space-y-2">
              {(c.lines || []).map((line: string, i: number) => (
                <p key={i} className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
                  {line}
                </p>
              ))}
            </div>

            {c.code && (
              <div 
                className={cn(
                  "bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-indigo-200",
                  !typingComplete && "cursor-pointer"
                )}
                onClick={handleCodeClick}
              >
                <div className="p-6 md:p-8 bg-gray-900 min-h-[80px] md:min-h-[100px]">
                  <div className="font-mono text-lg md:text-2xl whitespace-pre text-left font-bold leading-relaxed">
                    {codeLines.map((line, i) => (
                      <div
                        key={i}
                        className={cn(
                          i < visibleLines
                            ? "animate-codeLine"
                            : "opacity-0 h-0 overflow-hidden"
                        )}
                      >
                        {highlightLine(line)}
                      </div>
                    ))}
                    {!typingComplete && (
                      <span className="inline-block w-3 h-5 md:h-7 bg-purple-400 ml-1 align-middle animate-blink" />
                    )}
                  </div>
                </div>
                
                {/* 클릭 안내 - 아직 줄이 남아있을 때 */}
                {!typingComplete && visibleLines > 0 && (
                  <div className="px-4 py-2 bg-gray-800 text-center">
                    <span className="text-gray-500 text-sm">{t("👆 탭하면 다음 줄이 나와요!", "👆 Tap to show the next line!")}</span>
                  </div>
                )}
                
                {/* 결과 영역 - 예측 퀴즈가 있으면 맞춘 후에만 표시 */}
                {c.result && (
                  <div className={cn(
                    "px-6 py-4 md:px-8 md:py-5 transition-all duration-300",
                    showResult 
                      ? (c.isError ? "bg-red-600" : "bg-green-600")
                      : "bg-gray-900"
                  )}>
                    <p className={cn(
                      "font-mono text-center text-xl md:text-2xl font-bold transition-opacity duration-300",
                      showResult ? "text-white opacity-100" : "opacity-0"
                    )}>
                      → {c.result}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 예측 퀴즈 */}
            {c.predict && typingComplete && !predictAnswered && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-center text-xl md:text-2xl font-bold text-amber-600">
                  🤔 {c.predict.question || t("결과가 뭘까?", "What's the result?")}
                </p>
                <div className="space-y-3">
                  {c.predict.options.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => selectPredict(idx)}
                      className="w-full p-4 md:p-5 rounded-2xl font-mono text-lg md:text-xl font-bold shadow-lg border-4 bg-white hover:bg-amber-50 text-gray-800 border-amber-200 hover:border-amber-400 transition-all"
                    >
                      {opt.split(/\\n|\n/).map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 예측 결과 피드백 */}
            {c.predict && predictAnswered && !showResult && (
              <div className={cn(
                "rounded-2xl p-4 animate-fadeIn text-center",
                predictSelected === c.predict.answer 
                  ? "bg-green-600" 
                  : "bg-red-500"
              )}>
                <p className="text-white text-xl md:text-2xl font-bold">
                  {predictSelected === c.predict.answer
                    ? t("정답! 👏 +5점", "Correct! 👏 +5pts")
                    : t(`아쉬워! 정답은 "${c.predict.options[c.predict.answer]}"`, `Close! The answer was "${c.predict.options[c.predict.answer]}"`)
                  }
                </p>
                {c.predict.feedback && predictSelected !== c.predict.answer && (
                  <p className="text-white/90 text-base md:text-lg mt-2">
                    💡 {c.predict.feedback}
                  </p>
                )}
              </div>
            )}

            {c.note && (
              <p className={cn(
                "text-gray-600 text-center text-lg md:text-xl font-medium transition-opacity duration-300",
                (c.predict ? showResult : typingComplete) ? "opacity-100" : "opacity-0"
              )}>
                💬 {c.note}
              </p>
            )}
            
            {/* 예측 퀴즈가 있으면 맞춰야 다음 버튼 활성화 */}
            {(!c.predict || predictAnswered) && (
              <>
                <Button 
                  onClick={next}
                  className="w-full py-7 md:py-8 text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
                >
                  {t("다음", "Next")} <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
                </Button>
                <p className="text-gray-400 text-base text-center">{t("Enter로 계속", "Press Enter to continue")}</p>
              </>
            )}
          </div>
        )}

        {/* 에러 퀴즈 */}
        {current.type === "errorQuiz" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full text-lg font-bold bg-red-500 text-white shadow-lg">
                {t("🔍 에러 탐정", "🔍 Error Detective")}
              </span>
            </div>
            
            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {c.question}
            </p>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-red-200">
              <div className="p-6 md:p-8 bg-gray-900">
                <div className="font-mono text-lg md:text-2xl whitespace-pre text-left font-bold leading-relaxed">
                  {c.code.split('\n').map((codeLine: string, i: number) => (
                    <div key={i}>{highlightLine(codeLine)}</div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 bg-red-600">
                <p className="font-mono text-center text-lg text-white font-bold">
                  ❌ Error!
                </p>
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-5">
              {c.options.map((opt: string, idx: number) => {
                const isSelected = selected === idx
                const isAnswer = idx === c.answer
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
                    {opt.split(/\\n|\n/).map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </button>
                )
              })}
            </div>

            {showExplanation && c.explanation && (
              <div className="bg-green-600 rounded-2xl p-5 animate-fadeIn">
                <p className="text-white text-lg md:text-xl font-bold">
                  💡 {c.explanation}
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
              {c.message}
            </p>

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {c.task}
            </p>

            {!c.template && <SymbolButtons />}

            {typeof c.template === 'string' ? (
              /* 여러 빈칸 template */
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-purple-200">
                <div className="p-5 md:p-7 bg-gray-900">
                  <div className="font-mono text-base md:text-xl whitespace-pre text-left font-bold leading-loose">
                    {(() => {
                      const parts = c.template.split('___')
                      let blankIdx = 0
                      return parts.map((part: string, i: number) => {
                        const lines = part.split('\n')
                        const elements: React.ReactNode[] = []
                        lines.forEach((line: string, li: number) => {
                          if (li > 0) elements.push(<br key={`br-${i}-${li}`} />)
                          elements.push(
                            <span key={`text-${i}-${li}`}>
                              {highlightLine(line)}
                            </span>
                          )
                        })
                        if (i < parts.length - 1) {
                          const idx = blankIdx++
                          elements.push(
                            <input
                              key={`blank-${idx}`}
                              ref={idx === 0 ? inputRef : undefined}
                              value={blanks[idx] || ''}
                              onChange={(e) => {
                                const newBlanks = [...blanks]
                                newBlanks[idx] = e.target.value
                                setBlanks(newBlanks)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Tab' && !e.shiftKey) {
                                  e.preventDefault()
                                  const nextInput = document.querySelector(`[data-blank-idx="${idx + 1}"]`) as HTMLInputElement
                                  nextInput?.focus()
                                }
                                if (e.key === 'Enter' && blanks.every(b => b.trim())) {
                                  check()
                                }
                              }}
                              data-blank-idx={idx}
                              disabled={phase === "correct"}
                              placeholder={`${idx + 1}`}
                              className={cn(
                                "inline-block bg-amber-400/20 text-amber-300 font-mono font-bold px-2 py-1 mx-0.5 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all border-2 border-amber-500/50 border-dashed",
                                phase === "wrong" && "ring-2 ring-red-500 border-red-500 animate-shake",
                                phase === "correct" && "bg-green-400/20 text-green-300 border-green-500/50",
                                phase === "input" && !blanks[idx] && "animate-pulse-border"
                              )}
                              style={{ width: `${Math.max(60, (blanks[idx]?.length || 2) * 12 + 30)}px` }}
                              autoComplete="off"
                              spellCheck={false}
                            />
                          )
                        }
                        return elements
                      })
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className={cn(
                "bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-purple-200",
                phase === "input" && !input && "animate-glow"
              )}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={phase === "correct"}
                  placeholder={t("여기에 코드 입력!", "Type your code here!")}
                  className={cn(
                    "w-full h-24 md:h-28 bg-purple-50 text-purple-900 font-mono font-bold p-4 md:p-5 rounded-2xl text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 resize-none placeholder:text-purple-300 border-4 border-purple-200",
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

            {phase !== "correct" && (() => {
              const hasInput = typeof c.template === 'string'
                ? blanks.some(b => b.trim())
                : input.trim()
              return (
                <Button 
                  onClick={check}
                  disabled={!hasInput}
                  className={cn(
                    "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl transition-all font-bold shadow-xl",
                    hasInput 
                      ? "bg-purple-600 hover:bg-purple-500 text-white animate-button-ready" 
                      : "bg-gray-300 text-gray-500"
                  )}
                >
                  <Play className="w-6 h-6 mr-2" /> {t("실행하기", "Run")}
                </Button>
              )
            })()}
          </div>
        )}

        {/* 연습 */}
        {current.type === "practice" && (
          <div className="pt-8 md:pt-12 space-y-5 md:space-y-6 animate-fadeIn">
            {c.level && (
              <div className="flex justify-center">
                <span className={cn(
                  "px-6 py-2 rounded-full text-lg md:text-xl font-bold shadow-lg",
                  getLevelBadge(c.level).color
                )}>
                  {getLevelBadge(c.level).label}
                </span>
              </div>
            )}

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {c.task}
            </p>

            {c.guide && (
              <p className="text-indigo-600 text-lg md:text-xl text-center font-bold">
                💡 {c.guide}
              </p>
            )}

            {!c.template && <SymbolButtons />}

            {typeof c.template === 'string' ? (
              /* 여러 빈칸 template: 코드 블록 + 인라인 input */
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-indigo-200">
                <div className="p-5 md:p-7 bg-gray-900">
                  <div className="font-mono text-base md:text-xl whitespace-pre text-left font-bold leading-loose">
                    {(() => {
                      const parts = c.template.split('___')
                      let blankIdx = 0
                      return parts.map((part: string, i: number) => {
                        const lines = part.split('\n')
                        const elements: React.ReactNode[] = []
                        lines.forEach((line: string, li: number) => {
                          if (li > 0) elements.push(<br key={`br-${i}-${li}`} />)
                          elements.push(
                            <span key={`text-${i}-${li}`}>
                              {highlightLine(line)}
                            </span>
                          )
                        })
                        if (i < parts.length - 1) {
                          const idx = blankIdx++
                          elements.push(
                            <input
                              key={`blank-${idx}`}
                              ref={idx === 0 ? inputRef : undefined}
                              value={blanks[idx] || ''}
                              onChange={(e) => {
                                const newBlanks = [...blanks]
                                newBlanks[idx] = e.target.value
                                setBlanks(newBlanks)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Tab' && !e.shiftKey) {
                                  e.preventDefault()
                                  const nextInput = document.querySelector(`[data-blank-idx="${idx + 1}"]`) as HTMLInputElement
                                  nextInput?.focus()
                                }
                                if (e.key === 'Enter' && blanks.every(b => b.trim())) {
                                  check()
                                }
                              }}
                              data-blank-idx={idx}
                              disabled={phase === "correct"}
                              placeholder={`${idx + 1}`}
                              className={cn(
                                "inline-block bg-amber-400/20 text-amber-300 font-mono font-bold px-2 py-1 mx-0.5 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all border-2 border-amber-500/50 border-dashed",
                                phase === "wrong" && "ring-2 ring-red-500 border-red-500 animate-shake",
                                phase === "correct" && "bg-green-400/20 text-green-300 border-green-500/50",
                                phase === "input" && !blanks[idx] && "animate-pulse-border"
                              )}
                              style={{ width: `${Math.max(60, (blanks[idx]?.length || 2) * 12 + 30)}px` }}
                              autoComplete="off"
                              spellCheck={false}
                            />
                          )
                        }
                        return elements
                      })
                    })()}
                  </div>
                </div>
              </div>
            ) : c.template ? (
              <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-indigo-200">
                <div className="flex items-center justify-center gap-1 font-mono text-xl md:text-3xl flex-wrap">
                  <span className="text-gray-500 font-bold">{c.template.before}</span>
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
                    style={{ width: `${Math.max(120, c.answer.length * 20 + 60)}px` }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span className="text-gray-500 font-bold">{c.template.after}</span>
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
                  placeholder={t("여기에 코드 입력!", "Type your code here!")}
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

            {phase !== "correct" && (() => {
              const hasInput = typeof c.template === 'string'
                ? blanks.some(b => b.trim())
                : input.trim()
              return (
                <Button
                  onClick={check}
                  disabled={!hasInput}
                  className={cn(
                    "w-full py-7 md:py-8 text-xl md:text-2xl rounded-2xl transition-all font-bold shadow-xl",
                    hasInput
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white animate-button-ready"
                      : "bg-gray-300 text-gray-500"
                  )}
                >
                  <Play className="w-6 h-6 mr-2" /> {t("실행하기", "Run")}
                </Button>
              )
            })()}
          </div>
        )}

        {/* 퀴즈 */}
        {current.type === "quiz" && (
          <div className="pt-8 md:pt-12 space-y-6 md:space-y-8 animate-fadeIn">
            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              🤔 {c.question}
            </p>
            
            <div className="space-y-4 md:space-y-5">
              {c.options.map((opt: string, idx: number) => {
                const isSelected = selected === idx
                const isAnswer = idx === c.answer
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
                    {opt.split(/\\n|\n/).map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </button>
                )
              })}
            </div>

            {showExplanation && c.explanation && (
              <div className="bg-indigo-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-lg md:text-xl font-bold">
                  💡 {c.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 프로젝트 */}
        {current.type === "project" && (
          <div className="pt-6 md:pt-10 space-y-5 md:space-y-6 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {Array.from({ length: c.total }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 md:h-5 rounded-full transition-all",
                    i < c.step ? "w-12 md:w-16 bg-indigo-600" : "w-6 md:w-8 bg-gray-300"
                  )}
                />
              ))}
              <span className="text-gray-600 text-lg md:text-xl ml-2 font-bold">
                {c.step}/{c.total}
              </span>
            </div>

            {c.done.length > 0 && (
              <div className="bg-gray-100 rounded-2xl p-4 md:p-5 border-4 border-gray-200">
                {c.done.map((line: string, i: number) => (
                  <p key={i} className="text-green-700 font-mono text-base md:text-lg font-medium">{line}</p>
                ))}
              </div>
            )}

            <div className="text-center space-y-2">
              <p className="text-gray-900 text-xl md:text-3xl font-bold">
                🎯 {c.task}
              </p>
              <p className="text-indigo-600 font-mono text-lg md:text-xl font-bold">
                → {c.target}
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
                placeholder={t("여기에 코드 입력!", "Type your code here!")}
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
                <Play className="w-6 h-6 mr-2" /> {t("실행하기", "Run")}
              </Button>
            )}
          </div>
        )}

        {/* 인터랙티브 애니메이션 */}
        {current.type === "interactive" && (
          <div className="pt-4 md:pt-6 space-y-4 md:space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {c.title}
              </h2>
              {c.description && (
                <p className="text-gray-600 text-base md:text-lg">
                  {c.description}
                </p>
              )}
            </div>

            {/* 데이터 구조 애니메이션 */}
            {c.component === "dataStructures" && (
              <DataStructuresComparison />
            )}

            {/* 함수 구조 빌더 */}
            {c.component === "functionBuilder" && (
              <FunctionBuilder onComplete={next} />
            )}

            {c.component !== "functionBuilder" && (
              <Button 
                onClick={next}
                className="w-full py-6 md:py-7 text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                다음 단계로 <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* 코딩 연습 (Python 실행) */}
        {current.type === "coding" && (
          <div className="pt-4 md:pt-6 space-y-4 md:space-y-6 animate-fadeIn">
            <PythonRunner
              title={c.title}
              description={c.description}
              starterCode={c.starterCode || ""}
              testCases={c.testCases || []}
              hints={c.hints || []}
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
                syncCompletion(score)
                markLessonComplete(lessonId)
                try { localStorage.removeItem(`lesson-${lessonId}`) } catch {}
                router.push("/curriculum")
              }}
              className="w-full py-8 md:py-10 text-2xl md:text-3xl bg-indigo-600 hover:bg-indigo-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              {t("완료!", "Done!")} <ChevronRight className="w-8 h-8 ml-2" />
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

        @keyframes codeLine {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-codeLine { animation: codeLine 0.2s ease-out forwards; }
      `}</style>
    </div>
  )
}
