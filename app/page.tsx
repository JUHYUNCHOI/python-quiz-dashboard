"use client"

import { GiraffeHero } from "@/components/giraffe-hero"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Trophy, Flame, Zap, ChevronRight, Target, CheckCircle2, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useGamification, DAILY_XP_GOAL, getLevelTitle, STREAK_SHIELD_COST } from "@/hooks/use-gamification"
import { useState, useEffect } from "react"
import { OnboardingModal } from "@/components/onboarding-modal"
import { DailyChallenges } from "@/components/daily-challenges"
import { AchievementsShelf } from "@/components/achievements-shelf"
import { PythonToCppBridge } from "@/components/python-to-cpp-bridge"
import { useAuth } from "@/contexts/auth-context"

// -------- 레슨 ID 순서 --------
const PYTHON_LESSON_IDS: (number | string)[] = [
  1,2,3,4,5,6,7,8,9,10,"p1",
  11,12,13,14,"p2",
  15,16,17,18,19,20,21,22,"p3",
  23,24,25,26,
  27,28,29,30,31,
  32,33,34,35,36,
  37,38,39,40,
  41,42,43,44,
  45,46,47,48,
  49,50,51,52,"p4",
]

const CPP_LESSON_IDS: string[] = [
  "cpp-1","cpp-2","cpp-3","cpp-4","cpp-5","cpp-6","cpp-7","cpp-8","cpp-p1",
  "cpp-9","cpp-10","cpp-11","cpp-12","cpp-13","cpp-14","cpp-p2",
  "cpp-21","cpp-15","cpp-23","cpp-16","cpp-17","cpp-18","cpp-19","cpp-20","cpp-p3",
]

// -------- 레슨 제목 매핑 --------
const PYTHON_TITLES: Record<string, string> = {
  "1":"print() 출력", "2":"데이터 타입", "3":"변수", "4":"연산자",
  "5":"문자열 연산", "6":"문자열 메서드", "7":"print() 옵션", "8":"f-string",
  "9":"타입 변환", "10":"input() 입력", "p1":"🎮 미니 계산기",
  "11":"조건문 (if)", "12":"조건문 심화", "13":"반복문 (for)", "14":"반복문 (while)",
  "p2":"🎮 숫자 맞추기 게임",
  "15":"자료구조 개요", "16":"리스트 기초", "17":"리스트와 반복문",
  "18":"split()과 join()", "19":"튜플", "20":"딕셔너리", "21":"집합 (set)",
  "22":"슬라이싱", "p3":"🎮 Hangman 게임",
  "23":"스택 (Stack)", "24":"큐 (Queue)", "25":"덱 (Deque)", "26":"자료구조 비교",
  "27":"가위바위보 게임", "28":"로또 번호 생성기", "29":"단어장 프로그램",
  "30":"성적 관리 시스템", "31":"종합 문제 모음",
  "32":"함수란?", "33":"매개변수와 반환값", "34":"함수 활용",
  "35":"내장함수 총정리", "36":"함수 문제 30",
  "37":"에러 처리하기", "38":"파일 읽고 쓰기", "39":"게임 세이브", "40":"Part 6 문제",
  "41":"클래스 기초", "42":"메서드와 속성", "43":"RPG 게임", "44":"Part 7 문제",
  "45":"모듈 기초", "46":"패키지와 pip", "47":"날씨 앱", "48":"Part 8 문제",
  "49":"텍스트 RPG: 설계", "50":"텍스트 RPG: 핵심", "51":"텍스트 RPG: 완성",
  "52":"텍스트 RPG: 업그레이드", "p4":"🐍 Snake Game",
}

const CPP_TITLES: Record<string, string> = {
  "cpp-1":"파이썬 vs C++", "cpp-2":"cout & namespace", "cpp-3":"변수와 타입",
  "cpp-4":"cin 입력", "cpp-5":"연산자", "cpp-6":"조건문 (if/else)",
  "cpp-7":"반복문 (for/while)", "cpp-8":"함수", "cpp-p1":"🎮 숫자 맞추기 게임",
  "cpp-9":"배열과 벡터", "cpp-10":"범위 for & auto", "cpp-11":"문자열 연산",
  "cpp-12":"참조와 함수", "cpp-13":"재귀 (Recursion)", "cpp-14":"클래스 (class)",
  "cpp-p2":"🏆 Part 2 복습",
  "cpp-21":"2차원 배열 & 2D vector",
  "cpp-15":"pair와 정렬", "cpp-16":"map과 set", "cpp-17":"스택과 큐",
  "cpp-18":"우선순위 큐", "cpp-19":"정렬 알고리즘", "cpp-20":"CP 실전 팁",
  "cpp-p3":"🏆 USACO 준비",
}

const PYTHON_TITLES_EN: Record<string, string> = {
  "1":"print() Output", "2":"Data Types", "3":"Variables", "4":"Operators",
  "5":"String Operations", "6":"String Methods", "7":"print() Options", "8":"f-string",
  "9":"Type Conversion", "10":"input() Input", "p1":"🎮 Mini Calculator",
  "11":"Conditionals (if)", "12":"Advanced Conditionals", "13":"Loops (for)", "14":"Loops (while)",
  "p2":"🎮 Number Guessing Game",
  "15":"Data Structures Overview", "16":"List Basics", "17":"Lists & Loops",
  "18":"split() and join()", "19":"Tuples", "20":"Dictionaries", "21":"Sets",
  "22":"Slicing", "p3":"🎮 Hangman Game",
  "23":"Stack", "24":"Queue", "25":"Deque", "26":"Data Structures Comparison",
  "27":"Rock-Paper-Scissors Game", "28":"Lottery Number Generator", "29":"Vocabulary Program",
  "30":"Grade Management System", "31":"Practice Problems",
  "32":"Functions Basics", "33":"Parameters & Return Values", "34":"Using Functions",
  "35":"Built-in Functions", "36":"Function Problems 30",
  "37":"Error Handling", "38":"File Read/Write", "39":"Game Save", "40":"Part 6 Problems",
  "41":"Classes Basics", "42":"Methods & Attributes", "43":"RPG Game", "44":"Part 7 Problems",
  "45":"Modules Basics", "46":"Packages & pip", "47":"Weather App", "48":"Part 8 Problems",
  "49":"Text RPG: Design", "50":"Text RPG: Core", "51":"Text RPG: Complete",
  "52":"Text RPG: Upgrade", "p4":"🐍 Snake Game",
}

const CPP_TITLES_EN: Record<string, string> = {
  "cpp-1":"Python vs C++", "cpp-2":"cout & namespace", "cpp-3":"Variables & Types",
  "cpp-4":"cin Input", "cpp-5":"Operators", "cpp-6":"Conditionals (if/else)",
  "cpp-7":"Loops (for/while)", "cpp-8":"Functions", "cpp-p1":"🎮 Number Guessing Game",
  "cpp-9":"Arrays & Vectors", "cpp-10":"Range-for & auto", "cpp-11":"String Operations",
  "cpp-12":"References & Functions", "cpp-13":"Recursion", "cpp-14":"Classes",
  "cpp-p2":"🏆 Part 2 Review",
  "cpp-21":"2D Arrays & 2D Vectors",
  "cpp-15":"pair & Sorting", "cpp-16":"map & set", "cpp-17":"Stacks & Queues",
  "cpp-18":"Priority Queue", "cpp-19":"Sorting Algorithms", "cpp-20":"CP Tips",
  "cpp-p3":"🏆 USACO Prep",
}

interface NextLesson {
  id: number | string
  title: string
  course: "python" | "cpp"
}

function readNextLesson(lang: "ko" | "en" = "ko"): NextLesson | null {
  try {
    const course = (localStorage.getItem("selectedCourse") || "python") as "python" | "cpp"
    const completedRaw = localStorage.getItem("completedLessons")
    const completed = new Set<string>(
      completedRaw ? JSON.parse(completedRaw).map(String) : []
    )

    if (course === "cpp") {
      for (const id of CPP_LESSON_IDS) {
        if (!completed.has(String(id))) {
          const titles = lang === "en" ? CPP_TITLES_EN : CPP_TITLES
          return { id, title: titles[id] ?? `Lesson ${id}`, course }
        }
      }
    } else {
      for (const id of PYTHON_LESSON_IDS) {
        if (!completed.has(String(id))) {
          const titles = lang === "en" ? PYTHON_TITLES_EN : PYTHON_TITLES
          return { id, title: titles[String(id)] ?? `Lesson ${id}`, course }
        }
      }
    }
    return null
  } catch {
    return null
  }
}

function readSelectedCourse(): "python" | "cpp" {
  try {
    return (localStorage.getItem("selectedCourse") || "python") as "python" | "cpp"
  } catch {
    return "python"
  }
}

// ============================================================
// 랜딩 페이지 (비로그인 상태)
// ============================================================


function LandingPage() {
  const { t, lang } = useLanguage()

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
      title: t("체계적인 커리큘럼", "Structured Curriculum"),
      desc: t("Python 52강 + C++ 20강으로 체계적으로 코딩을 배워요", "Learn coding step-by-step with 52 Python + 20 C++ lessons"),
    },
    {
      icon: <Brain className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
      title: t("스마트 퀴즈", "Smart Quizzes"),
      desc: t("간격 반복으로 내가 틀린 문제를 자동으로 복습해요", "Spaced repetition automatically reviews your weak points"),
    },
    {
      icon: <Flame className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-600",
      title: t("학습 스트릭", "Daily Streak"),
      desc: t("매일 꾸준히 학습하고 연속 기록을 쌓아요", "Build a daily habit and track your streak"),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
      title: t("진도 관리", "Progress Tracking"),
      desc: t("어느 레슨까지 완료했는지 한눈에 확인해요", "See exactly which lessons you've completed at a glance"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦒</span>
          <span className="font-black text-xl text-gray-800">코드린</span>
        </div>
        <Link
          href="/login"
          className="px-4 py-2 rounded-full text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
        >
          {t("로그인", "Login")}
        </Link>
      </div>

      <main className="max-w-2xl mx-auto px-5 pb-16 space-y-10">

        {/* 히어로 섹션 */}
        <div className="text-center pt-6 pb-2 space-y-4">
          <div className="text-6xl">🦒</div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            {t("코딩, 재미있게\n배워보세요", "Learn Coding,\nStep by Step")}
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
            {t(
              "중학생·고등학생을 위한 코딩 학습 플랫폼.\n입문부터 대회까지 한 곳에서.",
              "Coding platform for middle & high school students.\nFrom first lesson to competitions, all in one place."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-2xl text-base font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-md shadow-orange-200"
            >
              {t("무료로 시작하기", "Get Started Free")}
            </Link>
            <Link
              href="/curriculum"
              className="px-8 py-3.5 rounded-2xl text-base font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              {t("커리큘럼 보기", "Browse Curriculum")}
            </Link>
          </div>
        </div>

        {/* 기능 카드 */}
        <div>
          <h2 className="text-lg font-black text-gray-800 mb-3">
            {t("이런 걸 배울 수 있어요", "What you'll get")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                  {f.icon}
                </div>
                <p className="font-bold text-sm text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🗺️ 3단계 여정 */}
        <div>
          <div className="text-center mb-4">
            <h2 className="text-lg font-black text-gray-800">{t("코딩, 이렇게 나아가요", "Your Coding Journey")}</h2>
            <p className="text-xs text-gray-400 mt-1">
              {t("배우고 → 풀고 → 겨루는 3단계", "Learn → Solve → Compete")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">

            {/* 1단계: 배우기 */}
            <div className="flex-1 rounded-2xl border-2 border-black bg-gradient-to-br from-orange-400 to-amber-500 p-4 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black bg-white/25 px-2 py-0.5 rounded-full">{t("1단계", "STEP 1")}</span>
                <span className="text-2xl leading-none">📚</span>
              </div>
              <p className="font-black text-xl mb-1">{t("배우기", "Learn")}</p>
              <p className="text-[11px] text-white/70 mb-3">{t("Python & C++ 수업", "Python & C++ lessons")}</p>
              <div className="space-y-1">
                {(lang === "ko"
                  ? ["🐍 Python 입문 — 변수·조건문·반복문", "⚡ C++ — 배열·STL·알고리즘", "🎮 미니 프로젝트로 실전 적용", "📊 52개 Python + 20개 C++ 레슨"]
                  : ["🐍 Python — Variables, Loops, Functions", "⚡ C++ — Arrays, STL, Algorithms", "🎮 Mini projects for hands-on practice", "📊 52 Python + 20 C++ lessons"]
                ).map((item) => (
                  <p key={item} className="text-[11px] text-white/85">{item}</p>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/20 text-[10px] text-white/60 font-bold">
                📖 72 {t("레슨", "lessons")} · ⏱ {t("약 23시간", "~23 hours")}
              </div>
            </div>

            <div className="flex sm:flex-col items-center justify-center text-gray-300 font-bold text-xl shrink-0">
              <span className="hidden sm:block">↓</span>
              <span className="sm:hidden">→</span>
            </div>

            {/* 2단계: 풀기 */}
            <div className="flex-1 rounded-2xl border-2 border-black bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black bg-white/25 px-2 py-0.5 rounded-full">{t("2단계", "STEP 2")}</span>
                <span className="text-2xl leading-none">🧩</span>
              </div>
              <p className="font-black text-xl mb-1">{t("풀기", "Solve")}</p>
              <p className="text-[11px] text-white/70 mb-3">{t("코딩 문제로 실력 키우기", "Build skills with coding problems")}</p>
              <div className="space-y-1">
                {(lang === "ko"
                  ? ["📊 정렬 · 탐색 · 그래프 · DP", "🐍 Python & C++ 모두 지원", "💡 힌트 · 시뮬레이션 · 풀이 제공", "🔢 150개+ 코딩 문제"]
                  : ["📊 Sorting, Search, Graph, DP", "🐍 Python & C++ supported", "💡 Hints, simulation, and solutions", "🔢 150+ coding problems"]
                ).map((item) => (
                  <p key={item} className="text-[11px] text-white/85">{item}</p>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/20 text-[10px] text-white/60 font-bold">
                🧩 150+ {t("문제", "problems")} · {t("배우기 이후 권장", "After Learn stage")}
              </div>
            </div>

            <div className="flex sm:flex-col items-center justify-center text-gray-300 font-bold text-xl shrink-0">
              <span className="hidden sm:block">↓</span>
              <span className="sm:hidden">→</span>
            </div>

            {/* 3단계: 겨루기 */}
            <div className="flex-1 rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">🎯 {t("3단계", "STEP 3")}</span>
                <span className="text-2xl leading-none">🏆</span>
              </div>
              <p className="font-black text-xl text-gray-800 mb-1">{t("겨루기", "Compete")}</p>
              <p className="text-[11px] text-gray-400 mb-3">{t("실전 대회 도전!", "Enter real competitions!")}</p>
              <div className="space-y-1">
                {(lang === "ko"
                  ? ["🥉 USACO Bronze — 완전탐색 · 그리디", "🥈 USACO Silver — BFS/DFS · DP", "🇲🇾 MCC — 말레이시아 컴퓨팅 챌린지", "🌐 160개+ 대회 문제 해설"]
                  : ["🥉 USACO Bronze — Search & Greedy", "🥈 USACO Silver — BFS/DFS & DP", "🇲🇾 MCC — Malaysia Computing Challenge", "🌐 160+ competition problem guides"]
                ).map((item) => (
                  <p key={item} className="text-[11px] text-gray-500">{item}</p>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-amber-200 text-[10px] text-amber-400 font-bold">
                🚧 {t("풀기 단계 이후 도전하세요!", "Unlock after Solve stage!")}
              </div>
            </div>
          </div>
        </div>

        {/* 학습 방법 */}
        <div>
          <h2 className="text-lg font-black text-gray-800 mb-3">
            {t("어떻게 배우나요?", "How does it work?")}
          </h2>
          <div className="space-y-3">
            {[
              {
                step: "1",
                color: "bg-orange-500",
                title: t("레슨 학습", "Study a Lesson"),
                desc: t("설명 → 빈칸 채우기 → 예측 → 실전 문제 순서로 단계별 학습", "Learn through explanation → fill-in-the-blank → predict → practice"),
              },
              {
                step: "2",
                color: "bg-purple-500",
                title: t("퀴즈로 복습", "Quiz & Review"),
                desc: t("스마트 알고리즘이 내가 약한 부분을 자동으로 복습시켜줘요", "Smart algorithm automatically reviews your weak spots"),
              },
              {
                step: "3",
                color: "bg-green-500",
                title: t("진도 확인", "Track Progress"),
                desc: t("완료한 레슨, XP, 스트릭으로 학습 동기를 유지해요", "Stay motivated with completed lessons, XP, and streaks"),
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 ${item.color}`}>
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-6 text-center text-white space-y-3 shadow-lg shadow-orange-200">
          <div className="text-3xl">🚀</div>
          <p className="font-black text-xl">{t("지금 바로 시작해요!", "Start Learning Today!")}</p>
          <p className="text-sm text-orange-100">
            {t("구글 계정으로 1분 안에 시작할 수 있어요", "Start in under 1 minute with your Google account")}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-base font-bold text-orange-600 bg-white hover:bg-orange-50 transition-colors"
          >
            {t("무료로 시작하기", "Get Started Free")}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

      </main>
    </div>
  )
}

// ============================================================
// 대시보드 페이지 (로그인 상태)
// ============================================================

export default function DashboardPage() {
  const { t, lang } = useLanguage()
  const { isAuthenticated, isLoading: authLoading, profile } = useAuth()
  const router = useRouter()
  const { level, totalXp, xpInCurrentLevel, dailyStreak, xpToday, isStreakAtRisk, useStreakShield } = useGamification()
  const [shieldUsed, setShieldUsed] = useState(false)
  const levelInfo = getLevelTitle(level)
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<"python" | "cpp">("python")
  // lessonLoaded: localStorage 읽기 전에 "모든 레슨 완료" 카드가 잠깐 뜨는 깜빡임 방지
  const [lessonLoaded, setLessonLoaded] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showCppBridge, setShowCppBridge] = useState(false)
  // 퀴즈 이력/업적 존재 여부 (없으면 빈 카드 노출 안 함)
  const [hasQuizHistory, setHasQuizHistory] = useState(false)
  const [hasAchievements, setHasAchievements] = useState(false)

  // 로그인 상태면 역할별 페이지로 리디렉트
  useEffect(() => {
    if (!isAuthenticated || !profile) return
    if (profile.role === "teacher") router.replace("/teacher")
    else if (profile.role === "parent") router.replace("/parent")
    else router.replace("/curriculum")
  }, [isAuthenticated, profile, router])

  useEffect(() => {
    const course = readSelectedCourse()
    setSelectedCourse(course)
    setNextLesson(readNextLesson(lang))
    setLessonLoaded(true)

    // 퀴즈 이력 & 업적 존재 여부 확인
    try {
      const history = localStorage.getItem("quiz-history")
      const parsed = history ? JSON.parse(history) : []
      setHasQuizHistory(Array.isArray(parsed) && parsed.length > 0)
    } catch {}
    try {
      const unlocked = localStorage.getItem("achievements-unlocked")
      const parsed = unlocked ? JSON.parse(unlocked) : []
      setHasAchievements(Array.isArray(parsed) && parsed.length > 0)
    } catch {}

    // C++ 전환 가이드: cpp 선택 + 완료 레슨 < 5 + 세션에서 닫지 않은 경우
    try {
      const cppBridgeDismissed = sessionStorage.getItem("cpp-bridge-dismissed")
      if (!cppBridgeDismissed && course === "cpp") {
        const completedRaw = localStorage.getItem("completedLessons")
        const completed: string[] = completedRaw ? JSON.parse(completedRaw) : []
        const cppDone = completed.filter((id) => id.startsWith("cpp-")).length
        if (cppDone < 5) setShowCppBridge(true)
      }
    } catch {}

    // 온보딩: 첫 방문 여부 확인
    try {
      const done = localStorage.getItem("onboarding-done")
      const hasLessons = !!localStorage.getItem("completedLessons")
      const hasPractice = Object.keys(localStorage).some(k => k.startsWith("practice-v2-"))
      if (!done && !hasLessons && !hasPractice) {
        setShowOnboarding(true)
      }
    } catch {}
  }, [lang])

  const switchToCpp = () => {
    try { localStorage.setItem("selectedCourse", "cpp") } catch {}
    setSelectedCourse("cpp")
    // C++ 다음 레슨 다시 계산 (readNextLesson은 localStorage 읽으므로 바로 호출)
    setNextLesson(readNextLesson(lang))
  }

  const handleCppBridgeDismiss = () => {
    try { sessionStorage.setItem("cpp-bridge-dismissed", "1") } catch {}
    setShowCppBridge(false)
  }

  const handleOnboardingComplete = (course: "python" | "cpp") => {
    setSelectedCourse(course)
    setShowOnboarding(false)
    setNextLesson(readNextLesson(lang))
  }

  const xpProgress = Math.min(xpToday, DAILY_XP_GOAL)
  const xpPercent = Math.round((xpProgress / DAILY_XP_GOAL) * 100)
  const goalDone = xpToday >= DAILY_XP_GOAL

  const isCpp = nextLesson?.course === "cpp"
  const courseLabel = isCpp ? "C++" : "Python"

  // 인증 로딩 중: 최소한의 스켈레톤
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-bounce">🦒</div>
          <div className="text-sm text-gray-400">{t("불러오는 중...", "Loading...")}</div>
        </div>
      </div>
    )
  }

  // 비로그인: 랜딩 페이지
  if (!isAuthenticated) {
    return <LandingPage />
  }

  // 로그인 상태: 포털로 리디렉트 (useEffect에서 처리)
  if (isAuthenticated) return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-4xl animate-bounce">🦒</div>
        <div className="text-sm text-gray-400">{t("이동 중...", "Redirecting...")}</div>
      </div>
    </div>
  )
}

// 아래는 사용되지 않는 대시보드 코드 — 포털로 대체됨
