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
// 웹앱용 커리큘럼 (설치/IDLE 없이 바로 코딩!)
// ============================================================
const lessonsData: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "print() 출력",
    description: "화면에 글자를 출력해보자!",
    steps: [
      {
        type: "chapter",
        content: {
          num: 1,
          title: "코딩 첫걸음",
          desc: "컴퓨터한테 첫 명령!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "마인크래프트 알지? 🎮",
            "그것도 코딩으로 만들었어!"
          ],
          code: "게임, 앱, 웹사이트... 전부 코딩!",
          isPreview: true
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "코딩 = 컴퓨터한테 일 시키기",
            "근데 컴퓨터는 한국어를 몰라 😢"
          ],
          code: "그래서 '파이썬'으로 말해야 해!",
          isPreview: true
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "오늘 배울 것:",
            "컴퓨터 화면에 글자 띄우기! 📺"
          ],
          code: "print('Hello!')",
          result: "Hello!",
          note: "이게 첫 번째 명령어야"
        }
      },

      {
        type: "chapter",
        content: {
          num: 2,
          title: "글자 띄우기",
          desc: "따옴표를 배워보자!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "게임에서 \"Game Over\" 어떻게 보여줄까?",
            "바로 해보자! 👇"
          ],
          code: "print('Game Over')",
          result: "Game Over",
          note: "print() = 화면에 띄워줘!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "글자는 따옴표로 감싸야 해"
          ],
          code: "print('Hello')",
          result: "Hello",
          note: "따옴표 = \"이건 글자야!\" 라는 표시"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "따옴표 없으면? 에러!"
          ],
          code: "print(Hello)",
          result: "❌ Error: Hello가 뭐야?",
          isError: true,
          note: "따옴표 없으면 컴퓨터가 '이게 뭐지?' 하고 헷갈려해"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "작은따옴표 ' 큰따옴표 \"",
            "둘 다 OK!"
          ],
          code: "print('Hi')  → Hi\nprint(\"Hi\")  → Hi",
          result: "둘 다 똑같이 나와!",
          note: "편한 거 쓰면 돼"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "Hello를 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "Hello",
          expect: "Hello"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "안녕을 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "안녕",
          expect: "안녕"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "파이썬을 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "파이썬",
          expect: "파이썬"
        }
      },

      {
        type: "reward",
        content: {
          message: "좋아! 이제 따옴표도 써보자",
          emoji: "👍"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "이제 따옴표도 직접 써볼까?"
          ],
          code: "print('OK')",
          result: "OK",
          note: "' 버튼 → 키보드 Enter 왼쪽!"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "Hi를 화면에 띄워봐",
          guide: "따옴표 포함해서! 'Hi'",
          template: { before: "print(", after: ")" },
          answer: "'Hi'",
          alternateAnswers: ["\"Hi\""],
          expect: "Hi"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "Good을 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "'Good'",
          alternateAnswers: ["\"Good\""],
          expect: "Good"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "코딩을 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "'코딩'",
          alternateAnswers: ["\"코딩\""],
          expect: "코딩"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까?",
          code: "print(Hello)",
          options: [
            "print 철자가 틀려서",
            "Hello에 따옴표가 없어서",
            "괄호가 없어서"
          ],
          answer: 1,
          explanation: "글자는 꼭 따옴표로 감싸야 해! print('Hello')"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "이제 처음부터 끝까지 써보자!"
          ],
          code: "print('Nice')",
          result: "Nice",
          note: "print('내용') 형태!"
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "Yes를 화면에 띄워봐",
          hint: "print('Yes')",
          template: null,
          answer: "print('Yes')",
          expect: "Yes"
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "Python을 화면에 띄워봐",
          hint: "print('___')",
          template: null,
          answer: "print('Python')",
          expect: "Python"
        }
      },

      {
        type: "practice",
        content: {
          level: 4,
          task: "Hello World를 화면에 띄워봐",
          template: null,
          answer: "print('Hello World')",
          expect: "Hello World"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "나는 코딩왕을 화면에 띄워봐",
          template: null,
          answer: "print('나는 코딩왕')",
          expect: "나는 코딩왕"
        }
      },

      {
        type: "quiz",
        content: {
          question: "에러 나는 건?",
          options: ["print('Hi')", "print(Hi)", "print(\"Hi\")"],
          answer: 1,
          explanation: "따옴표 없으면 에러! ' 또는 \" 둘 다 OK"
        }
      },

      {
        type: "summary",
        content: {
          num: 2,
          title: "글자 띄우기",
          learned: [
            "print()로 화면에 출력",
            "글자는 따옴표로 감싸기",
            "' 또는 \" 둘 다 OK"
          ],
          canDo: "원하는 글자를 화면에 출력할 수 있어!",
          emoji: "🎉"
        }
      },

      {
        type: "chapter",
        content: {
          num: 3,
          title: "숫자와 계산",
          desc: "컴퓨터로 계산해보자!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나?",
          task: "Hello 출력해봐",
          template: null,
          answer: "print('Hello')",
          expect: "Hello"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자는 따옴표 없어도 돼!"
          ],
          code: "print(100)",
          result: "100",
          note: "숫자는 그냥 쓰면 돼"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "'100'이랑 100은 달라!"
          ],
          code: "'100' → 글자 (계산 불가)\n 100  → 숫자 (계산 가능)",
          note: "따옴표 있으면 글자, 없으면 숫자"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "100 + 50 계산하고 싶어. 뭐가 문제일까?",
          code: "print('100' + '50')",
          options: [
            "아무 문제 없다",
            "'100'은 글자라서 계산이 안 된다",
            "print를 잘못 썼다"
          ],
          answer: 1,
          explanation: "'100'은 글자야! 글자끼리 +하면 '10050'이 돼. 계산하려면 따옴표 빼!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "123을 화면에 띄워봐",
          guide: "숫자는 따옴표 없이!",
          template: { before: "print(", after: ")" },
          answer: "123",
          expect: "123"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "2024를 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "2024",
          expect: "2024"
        }
      },

      {
        type: "practice",
        content: {
          level: 3,
          task: "9999를 화면에 띄워봐",
          hint: "print(9999)",
          template: null,
          answer: "print(9999)",
          expect: "9999"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자는 계산도 돼!"
          ],
          code: "print(10 + 5)",
          result: "15",
          note: "컴퓨터가 계산해서 결과를 보여줘"
        }
      },
      {
        type: "explain",
        content: {
          lines: [
            "사칙연산 기호"
          ],
          code: "+  더하기\n-  빼기\n*  곱하기 (× 아님!)\n/  나누기",
          note: "곱하기 주의! x가 아니라 * 야"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "5 + 3 계산해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "5 + 3",
          alternateAnswers: ["5+3"],
          expect: "8"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "100 - 30 계산해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "100 - 30",
          alternateAnswers: ["100-30"],
          expect: "70"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "7 * 8 계산해서 출력해봐",
          guide: "* 는 곱하기!",
          template: { before: "print(", after: ")" },
          answer: "7 * 8",
          alternateAnswers: ["7*8"],
          expect: "56"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "20 / 4 계산해서 출력해봐",
          guide: "/ 는 나누기!",
          template: { before: "print(", after: ")" },
          answer: "20 / 4",
          alternateAnswers: ["20/4"],
          expect: "5"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "글자 출력도 기억나지?",
          task: "계산중 출력해봐",
          template: null,
          answer: "print('계산중')",
          expect: "계산중"
        }
      },

      {
        type: "practice",
        content: {
          level: 3,
          task: "50 + 50 계산해서 출력해봐",
          hint: "print(50 + 50)",
          template: null,
          answer: "print(50 + 50)",
          expect: "100"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "9 * 9 계산해서 출력해봐",
          template: null,
          answer: "print(9 * 9)",
          expect: "81"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "1000 - 1 계산해서 출력해봐",
          template: null,
          answer: "print(1000 - 1)",
          expect: "999"
        }
      },

      {
        type: "quiz",
        content: {
          question: "'100'이랑 100 차이는?",
          options: [
            "'100'은 글자, 100은 숫자",
            "똑같다",
            "'100'만 출력된다"
          ],
          answer: 0,
          explanation: "'100'은 글자라서 계산 불가! 100은 숫자라서 계산 가능!"
        }
      },

      {
        type: "summary",
        content: {
          num: 3,
          title: "숫자와 계산",
          learned: [
            "숫자는 따옴표 없이",
            "'100'은 글자, 100은 숫자",
            "+ - * / 로 계산"
          ],
          canDo: "컴퓨터로 계산을 할 수 있어!",
          emoji: "🧮"
        }
      },

      {
        type: "chapter",
        content: {
          num: 4,
          title: "조합과 프로젝트",
          desc: "배운 걸 합쳐서 프로그램 만들기!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "숫자 출력 기억나?",
          task: "2024 출력해봐",
          template: null,
          answer: "print(2024)",
          expect: "2024"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "쉼표로 여러 개를 한 번에!"
          ],
          code: "print('나이:', 20)",
          result: "나이: 20",
          note: "글자랑 숫자를 같이 출력!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "나이: 15 출력해봐",
          guide: "숫자만 채워!",
          template: { before: "print('나이:', ", after: ")" },
          answer: "15",
          expect: "나이: 15"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "점수: 100 출력해봐",
          template: { before: "print('점수:', ", after: ")" },
          answer: "100",
          expect: "점수: 100"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "레벨: 5 출력해봐",
          guide: "'레벨:', 5 ← 쉼표로 연결!",
          template: { before: "print(", after: ")" },
          answer: "'레벨:', 5",
          alternateAnswers: ["\"레벨:\", 5"],
          expect: "레벨: 5"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "코인: 999 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "'코인:', 999",
          alternateAnswers: ["\"코인:\", 999"],
          expect: "코인: 999"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "3개도 가능!"
          ],
          code: "print('사과', 3, '개')",
          result: "사과 3 개",
          note: "쉼표로 계속 연결"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "치킨 19000 원 출력해봐",
          guide: "'치킨', 19000, '원'",
          template: { before: "print(", after: ")" },
          answer: "'치킨', 19000, '원'",
          expect: "치킨 19000 원"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "콜라 2000 원 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "'콜라', 2000, '원'",
          expect: "콜라 2000 원"
        }
      },

      {
        type: "practice",
        content: {
          level: 3,
          task: "피자 25000 원 출력해봐",
          hint: "print('피자', 25000, '원')",
          template: null,
          answer: "print('피자', 25000, '원')",
          expect: "피자 25000 원"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "햄버거 8000 원 출력해봐",
          template: null,
          answer: "print('햄버거', 8000, '원')",
          expect: "햄버거 8000 원"
        }
      },

      {
        type: "reward",
        content: {
          message: "거의 다 왔어! 프로젝트 해보자",
          emoji: "🚀"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "🍗 치킨 계산기 만들기!"
          ],
          code: "=== 치킨 계산기 ===\n치킨: 19000 원\n콜라: 2000 원\n총합: 21000 원",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      {
        type: "project",
        content: {
          step: 1,
          total: 4,
          task: "제목 만들기",
          target: "=== 치킨 계산기 ===",
          hint: "print('=== 치킨 계산기 ===')",
          done: [],
          answer: "print('=== 치킨 계산기 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "치킨 가격",
          target: "치킨: 19000 원",
          hint: "print('치킨:', 19000, '원')",
          done: ["=== 치킨 계산기 ==="],
          answer: "print('치킨:', 19000, '원')"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "콜라 가격",
          target: "콜라: 2000 원",
          hint: "위에서 한 것처럼!",
          done: ["=== 치킨 계산기 ===", "치킨: 19000 원"],
          answer: "print('콜라:', 2000, '원')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "총합 (계산!)",
          target: "총합: 21000 원",
          hint: "19000 + 2000 계산!",
          done: ["=== 치킨 계산기 ===", "치킨: 19000 원", "콜라: 2000 원"],
          answer: "print('총합:', 19000 + 2000, '원')"
        }
      },

      {
        type: "summary",
        content: {
          num: 4,
          title: "조합과 프로젝트",
          learned: [
            "쉼표로 여러 개 출력",
            "글자와 숫자 섞어서 출력",
            "계산 결과도 같이 출력"
          ],
          canDo: "실제로 쓸 수 있는 프로그램을 만들 수 있어!",
          emoji: "🏆"
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
  }
}

// ============================================================
// 타입 정의
// ============================================================
interface LessonData {
  id: string
  title: string
  description?: string
  steps: Step[]
}

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
  
  // explain 타입에서 한 줄씩 보여주기 위한 상태
  const [explainPhase, setExplainPhase] = useState(0) // 0: 첫번째 줄, 1: 두번째 줄, ..., lines.length: 코드, lines.length+1: 결과
  
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const current = lesson?.steps[step]
  const progress = lesson ? ((step + 1) / lesson.steps.length) * 100 : 0

  // 진행 상황 로드
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

  // 진행 상황 저장
  useEffect(() => {
    if (!lesson) return
    localStorage.setItem(`lesson-${lessonId}`, JSON.stringify({
      step,
      score,
      wrongAnswers,
      streak
    }))
  }, [step, score, wrongAnswers, streak, lessonId, lesson])

  // 입력 포커스
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

  // 상태 리셋
  useEffect(() => {
    setInput("")
    setPhase("input")
    setTries(0)
    setSelected(null)
    setOutput("")
    setErrorMsg("")
    setShowHint(0)
    setShowExplanation(false)
    setExplainPhase(0) // explain 페이즈 리셋
  }, [step, reviewIndex])

  // 다음 스텝으로 이동
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

  // explain 타입에서 다음 버튼 클릭
  const nextExplainPhase = useCallback(() => {
    if (!current || current.type !== "explain") return
    
    const lines = current.content.lines || []
    const hasCode = !!current.content.code
    const hasResult = !!current.content.result
    
    // 총 페이즈 수 계산: lines 개수 + (코드 있으면 1) + (결과 있으면 1)
    const totalPhases = lines.length + (hasCode ? 1 : 0) + (hasResult ? 1 : 0)
    
    if (explainPhase + 1 < totalPhases) {
      setExplainPhase(explainPhase + 1)
    } else {
      // 모든 페이즈 완료 -> 다음 스텝으로
      next()
    }
  }, [current, explainPhase, next])

  // 키보드 이벤트
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.push("/curriculum")
      return
    }
    
    if (e.key === "Enter" && !e.shiftKey) {
      if (current?.type === "explain") {
        e.preventDefault()
        nextExplainPhase()
      } else if (current?.type === "reward" || 
          current?.type === "chapter" ||
          current?.type === "summary") {
        e.preventDefault()
        next()
      }
    }
  }, [current, router, next, nextExplainPhase])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

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

  const insertSymbol = (symbol: string) => {
    setInput(prev => prev + symbol)
    if (current.content.template) {
      inputRef.current?.focus()
    } else {
      textareaRef.current?.focus()
    }
  }

  // ============================================================
  // 코드 실행기
  // ============================================================
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

  // ============================================================
  // 정답 체크
  // ============================================================
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
    if (level === 1.5) return { label: "⭐ 쉬움+", color: "bg-emerald-600 text-white" }
    if (level === 2) return { label: "⭐⭐ 보통", color: "bg-blue-600 text-white" }
    if (level === 2.5) return { label: "⭐⭐ 보통+", color: "bg-purple-600 text-white" }
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
          className="w-12 h-12 md:w-14 md:h-14 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 rounded-xl font-mono text-white text-xl md:text-2xl transition-all shadow-lg font-bold"
        >
          {symbol}
        </button>
      ))}
    </div>
  )

  const getRandomPraise = () => {
    const praises = [
      "정답! 🎉",
      "완벽해! ✨",
      "천재?! 🧠",
      "멋져! 🔥",
      "빠르다! ⚡",
      "대단해! 💪",
      "좋았어! 👍",
      "잘했어! 🌟",
      "굿! 👏",
      "역시! 😎"
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
      <div className="min-h-screen bg-orange-50 flex flex-col">
        <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
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

        <div className="flex-1 flex flex-col justify-center max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-5 md:px-8 pb-8 w-full">
          <div className="space-y-5 md:space-y-6">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full text-lg md:text-xl font-bold bg-orange-500 text-white shadow-lg">
                🔄 복습
              </span>
            </div>

            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              {reviewItem.task}
            </p>

            <SymbolButtons />

            <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-purple-200">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={phase === "correct"}
                placeholder="여기에 코드 입력!"
                className={cn(
                  "w-full h-24 md:h-28 bg-purple-50 text-purple-900 font-mono font-bold p-4 md:p-5 rounded-2xl text-xl md:text-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 resize-none placeholder:text-purple-300 border-4 border-purple-200",
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
                    ? "bg-orange-500 hover:bg-orange-400 text-white" 
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
      "min-h-screen flex flex-col transition-all duration-300",
      phase === "correct" ? "bg-green-100" :
      phase === "wrong" ? "bg-red-100" :
      "bg-purple-50",
      isTransitioning && "opacity-50"
    )}>
      <StreakBonus />
      
      {/* 상단 바 */}
      <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
        <button 
          onClick={() => router.push("/curriculum")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors shadow-lg"
          title="나가기 (Esc)"
        >
          <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </button>
        
        <div className="flex-1 h-5 md:h-6 bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <StreakDisplay />
        
        <div className="flex items-center gap-2 bg-amber-500 px-4 py-2 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="font-bold text-lg md:text-xl text-white">{score}</span>
        </div>
      </div>

      {/* 메인 콘텐츠 - 세로 중앙 정렬 */}
      <div className={cn(
        "flex-1 flex flex-col justify-center max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-5 md:px-8 pb-8 w-full transition-opacity duration-200",
        isTransitioning ? "opacity-0" : "opacity-100"
      )}>

        {/* 챕터 시작 */}
        {current.type === "chapter" && (
          <div className="text-center space-y-6 md:space-y-8 animate-fadeIn">
            <div className="inline-block px-6 py-3 bg-purple-600 rounded-full shadow-xl">
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
              className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-purple-600 hover:bg-purple-500 rounded-2xl border-0 font-bold text-white shadow-xl"
            >
              시작! <ChevronRight className="w-8 h-8 ml-2" />
            </Button>
            <p className="text-gray-400 text-base">Enter로 계속</p>
          </div>
        )}

        {/* 보상 */}
        {current.type === "reward" && (
          <div className="text-center space-y-8 md:space-y-10 animate-fadeIn">
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
                className="w-full max-w-md mx-auto px-12 py-8 md:py-10 text-2xl md:text-3xl bg-purple-600 hover:bg-purple-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                계속하기 <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* 요약 */}
        {current.type === "summary" && (
          <div className="text-center space-y-6 md:space-y-8 animate-fadeIn">
            <div className="text-7xl md:text-8xl">
              {current.content.emoji}
            </div>
            <div className="space-y-2">
              <p className="text-purple-600 font-bold text-xl md:text-2xl">Chapter {current.content.num} 완료!</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {current.content.title} 마스터!
              </h2>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-purple-200 text-left">
              <p className="text-purple-600 font-bold text-lg md:text-xl mb-4">📝 오늘 배운 것</p>
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
                className="px-12 py-8 md:py-10 text-2xl md:text-3xl bg-purple-600 hover:bg-purple-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                다음으로 <ChevronRight className="w-8 h-8 ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* 설명 - 한 줄씩 중앙에 표시 */}
        {/* ============================================================ */}
        {current.type === "explain" && (() => {
          const lines = current.content.lines || []
          const hasCode = !!current.content.code
          const hasResult = !!current.content.result
          
          // 현재 뭘 보여줄지 결정
          const showingLineIndex = explainPhase < lines.length ? explainPhase : -1
          const showingCode = hasCode && explainPhase >= lines.length && explainPhase < lines.length + 1
          const showingResult = hasResult && explainPhase >= lines.length + 1
          const showNote = current.content.note && (showingResult || (!hasResult && showingCode))
          
          return (
            <div className="text-center space-y-8 md:space-y-10 animate-fadeIn">
              {/* 현재 보여줄 텍스트 - 한 줄만 */}
              {showingLineIndex >= 0 && (
                <p className="text-gray-900 text-3xl md:text-5xl font-bold leading-relaxed">
                  {lines[showingLineIndex]}
                </p>
              )}
              
              {/* 코드 박스 */}
              {showingCode && (
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-purple-200">
                  <div className="p-6 md:p-8 bg-gray-900">
                    <pre className={cn(
                      "font-mono text-xl md:text-3xl text-center whitespace-pre-wrap font-bold leading-loose",
                      current.content.isError ? "text-red-400" : 
                      current.content.isPreview ? "text-green-400" : "text-yellow-300"
                    )}>
                      {current.content.code}
                    </pre>
                  </div>
                </div>
              )}
              
              {/* 결과 */}
              {showingResult && (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-purple-200">
                    <div className="p-6 md:p-8 bg-gray-900">
                      <pre className={cn(
                        "font-mono text-xl md:text-3xl text-center whitespace-pre-wrap font-bold leading-loose",
                        current.content.isError ? "text-red-400" : 
                        current.content.isPreview ? "text-green-400" : "text-yellow-300"
                      )}>
                        {current.content.code}
                      </pre>
                    </div>
                    <div className={cn(
                      "px-6 py-4 md:px-8 md:py-5",
                      current.content.isError ? "bg-red-600" : "bg-green-600"
                    )}>
                      <p className="font-mono text-center text-xl md:text-2xl font-bold text-white">
                        → {current.content.result}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 노트 */}
              {showNote && (
                <p className="text-gray-600 text-lg md:text-xl font-medium">
                  💬 {current.content.note}
                </p>
              )}
              
              {/* 다음 버튼 */}
              <Button 
                onClick={nextExplainPhase}
                className="w-full max-w-md mx-auto py-7 md:py-8 text-xl md:text-2xl bg-purple-600 hover:bg-purple-500 rounded-2xl border-0 font-bold text-white shadow-xl"
              >
                다음 <ChevronRight className="w-6 h-6 md:w-7 md:h-7 ml-2" />
              </Button>
              <p className="text-gray-400 text-base">Enter로 계속</p>
            </div>
          )
        })()}

        {/* 에러 퀴즈 */}
        {current.type === "errorQuiz" && (
          <div className="space-y-6 md:space-y-8 animate-fadeIn">
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
                const showResult = selected !== null
                
                return (
                  <button
                    key={idx}
                    onClick={() => selectErrorQuiz(idx)}
                    disabled={selected !== null}
                    className={cn(
                      "w-full p-5 md:p-6 rounded-2xl text-left text-lg md:text-xl transition-all font-bold shadow-lg border-4",
                      !showResult && "bg-white hover:bg-red-50 text-gray-800 border-red-200 hover:border-red-400",
                      showResult && isAnswer && "bg-green-600 text-white border-green-600",
                      showResult && isSelected && !isAnswer && "bg-red-600 text-white border-red-600",
                      showResult && !isSelected && !isAnswer && "bg-gray-200 text-gray-400 border-gray-200"
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
          <div className="space-y-5 md:space-y-6 animate-fadeIn">
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
                    ? "bg-purple-600 hover:bg-purple-500 text-white" 
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
          <div className="space-y-5 md:space-y-6 animate-fadeIn">
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
              <p className="text-purple-600 text-lg md:text-xl text-center font-bold">
                💡 {current.content.guide}
              </p>
            )}

            {!current.content.template && <SymbolButtons />}

            {current.content.template ? (
              <div className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-purple-200">
                <div className="flex items-center justify-center gap-1 font-mono text-xl md:text-3xl flex-wrap">
                  <span className="text-gray-500 font-bold">{current.content.template.before}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && input && check()}
                    disabled={phase === "correct"}
                    className={cn(
                      "bg-purple-100 text-purple-900 font-mono font-bold px-4 py-3 md:px-6 md:py-4 rounded-xl text-center focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all border-4 border-purple-300",
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
                    ? "bg-purple-600 hover:bg-purple-500 text-white" 
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
          <div className="space-y-6 md:space-y-8 animate-fadeIn">
            <p className="text-gray-900 text-2xl md:text-4xl font-bold text-center">
              🤔 {current.content.question}
            </p>
            
            <div className="space-y-4 md:space-y-5">
              {current.content.options.map((opt: string, idx: number) => {
                const isSelected = selected === idx
                const isAnswer = idx === current.content.answer
                const showResult = selected !== null
                
                return (
                  <button
                    key={idx}
                    onClick={() => selectQuiz(idx)}
                    disabled={selected !== null}
                    className={cn(
                      "w-full p-5 md:p-6 rounded-2xl font-mono text-left text-lg md:text-xl transition-all font-bold shadow-lg border-4",
                      !showResult && "bg-white hover:bg-purple-50 text-gray-800 border-purple-200 hover:border-purple-400",
                      showResult && isAnswer && "bg-green-600 text-white border-green-600",
                      showResult && isSelected && !isAnswer && "bg-red-600 text-white border-red-600",
                      showResult && !isSelected && !isAnswer && "bg-gray-200 text-gray-400 border-gray-200"
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {showExplanation && current.content.explanation && (
              <div className="bg-purple-600 rounded-2xl p-4 animate-fadeIn">
                <p className="text-white text-lg md:text-xl font-bold">
                  💡 {current.content.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 프로젝트 */}
        {current.type === "project" && (
          <div className="space-y-5 md:space-y-6 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {Array.from({ length: current.content.total }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 md:h-5 rounded-full transition-all",
                    i < current.content.step ? "w-12 md:w-16 bg-purple-600" : "w-6 md:w-8 bg-gray-300"
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
              <p className="text-purple-600 font-mono text-lg md:text-xl font-bold">
                → {current.content.target}
              </p>
            </div>

            <SymbolButtons />

            <div className={cn(
              "bg-white rounded-3xl p-5 md:p-8 shadow-xl border-4 border-purple-200",
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
                  "w-full bg-purple-50 text-purple-900 font-mono font-bold px-5 py-5 md:px-6 md:py-6 rounded-2xl text-center text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-purple-400 placeholder:text-purple-300 border-4 border-purple-200",
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
                    ? "bg-purple-600 hover:bg-purple-500 text-white" 
                    : "bg-gray-300 text-gray-500"
                )}
              >
                <Play className="w-6 h-6 mr-2" /> 실행하기
              </Button>
            )}
          </div>
        )}

        {/* 완료 */}
        {current.type === "done" && (
          <div className="space-y-8 md:space-y-10 animate-fadeIn">
            <div className="text-center">
              <div className="text-8xl md:text-[10rem] mb-6">🏆</div>
              <p className="text-purple-600 font-bold mb-2 text-2xl md:text-3xl">레슨 완료!</p>
              <p className="text-gray-500 text-lg md:text-xl mb-2">최종 점수</p>
              <p className="text-7xl md:text-9xl font-bold text-amber-500">
                {score}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-purple-200">
              <p className="text-gray-600 text-lg md:text-xl mb-4 font-bold">🍗 내가 만든 것</p>
              <pre className="text-green-700 font-mono text-lg md:text-xl whitespace-pre-wrap font-bold bg-green-100 p-5 rounded-xl">
{`=== 치킨 계산기 ===
치킨: 19000 원
콜라: 2000 원
총합: 21000 원`}
              </pre>
            </div>
            
            <div className="bg-purple-100 rounded-2xl p-5 md:p-6 border-4 border-purple-300">
              <p className="text-purple-700 text-lg md:text-xl font-bold text-center">
                🎯 print()로 원하는 것을 출력하고 계산할 수 있어!
              </p>
            </div>
            
            <Button 
              onClick={() => {
                localStorage.removeItem(`lesson-${lessonId}`)
                router.push("/curriculum")
              }}
              className="w-full py-8 md:py-10 text-2xl md:text-3xl bg-purple-600 hover:bg-purple-500 rounded-2xl border-0 font-bold text-white shadow-xl"
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
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 0.8s step-end infinite; }
      `}</style>
    </div>
  )
}
