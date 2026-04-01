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
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto">
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

      <main className="max-w-lg mx-auto px-5 pb-16 space-y-10">

        {/* ── 히어로 ── */}
        <div className="text-center pt-4 pb-2 space-y-3">
          <div className="text-5xl">🦒</div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            {t("코딩 시작부터\nUSACO·MCC 대회까지", "From First Code\nto USACO & MCC")}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t(
              "중학생·고등학생을 위한 단계별 코딩 로드맵.\n선생님과 함께, 내 속도로.",
              "A step-by-step coding roadmap for middle & high schoolers.\nAt your own pace, with your teacher."
            )}
          </p>
          <Link
            href="/login"
            className="inline-block mt-1 px-8 py-3 rounded-2xl bg-orange-500 text-white font-black text-base border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {t("무료로 시작하기 →", "Get Started Free →")}
          </Link>
        </div>

        {/* ── 학습 경로 (핵심) ── */}
        <div className="space-y-1">
          <h2 className="text-base font-black text-gray-800 mb-3">
            {t("내가 가는 경로", "Your Learning Path")}
          </h2>

          {/* STEP 1 */}
          <div className="flex gap-3 items-stretch">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-black flex items-center justify-center text-white font-black text-xs flex-shrink-0">1</div>
              <div className="w-0.5 bg-orange-200 flex-1 mt-1" />
            </div>
            <div className="flex-1 pb-4">
              <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🐍</span>
                  <div>
                    <p className="font-black text-gray-900 text-sm">Python 기초 <span className="text-[11px] font-normal text-gray-400">52강</span></p>
                    <p className="text-[11px] text-gray-500">{t("코딩 경험 없어도 시작 가능", "No prior coding experience needed")}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-orange-100 p-2.5 space-y-1">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider">{t("이걸 만들 수 있어요", "You'll be able to build")}</p>
                  {([
                    ['🎮', t('숫자 맞추기 게임, Hangman', 'Number guessing game, Hangman')],
                    ['🧮', t('성적 계산기, 환율 변환기', 'GPA calculator, currency converter')],
                    ['📊', t('데이터 정렬·검색 프로그램', 'Data sorting & search programs')],
                  ] as [string, string][]).map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 — 갈림길 */}
          <div className="flex gap-3 items-stretch">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-black flex items-center justify-center text-white font-black text-xs flex-shrink-0">2</div>
              <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
            </div>
            <div className="flex-1 pb-4">
              <p className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-wider">{t("목표에 따라 선택", "Choose your path")}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-3 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">⚡</span>
                    <p className="font-black text-gray-900 text-sm">C++ 전환</p>
                  </div>
                  <p className="text-[11px] text-gray-500">{t("20강", "20 lessons")}</p>
                  <div className="bg-white rounded-lg border border-blue-100 p-2 space-y-1">
                    <p className="text-[10px] font-black text-blue-500 uppercase">{t("얻는 것", "You gain")}</p>
                    {[
                      t('실행속도 10~100배', '10~100× faster code'),
                      t('USACO 대회 도전', 'USACO competition ready'),
                      t('포인터·메모리 이해', 'Pointers & memory mastery'),
                    ].map(s => <p key={s} className="text-[11px] text-gray-700">✓ {s}</p>)}
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/60 p-3 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🐍</span>
                    <p className="font-black text-gray-900 text-sm">Python 유지</p>
                  </div>
                  <p className="text-[11px] text-gray-500">{t("바로 알고리즘으로", "Jump to algorithms")}</p>
                  <div className="bg-white rounded-lg border border-orange-100 p-2 space-y-1">
                    <p className="text-[10px] font-black text-orange-500 uppercase">{t("얻는 것", "You gain")}</p>
                    {[
                      t('더 빠른 대회 입문', 'Faster path to contests'),
                      t('MCC 출전 가능', 'MCC competition ready'),
                      t('논리력 집중 훈련', 'Focus on problem solving'),
                    ].map(s => <p key={s} className="text-[11px] text-gray-700">✓ {s}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 — 알고리즘 */}
          <div className="flex gap-3 items-stretch">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-black flex items-center justify-center text-white font-black text-xs flex-shrink-0">3</div>
              <div className="w-0.5 bg-purple-200 flex-1 mt-1" />
            </div>
            <div className="flex-1 pb-4">
              <div className="rounded-2xl border-2 border-purple-300 bg-purple-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧠</span>
                  <div>
                    <p className="font-black text-gray-900 text-sm">{t("알고리즘 훈련", "Algorithm Training")}</p>
                    <p className="text-[11px] text-gray-500">Bronze → Silver → Gold</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-purple-100 p-2.5 space-y-1">
                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-wider">{t("풀 수 있게 되는 문제", "Problems you'll solve")}</p>
                  {[
                    ['🥉', t('BOJ 실버 · USACO Bronze', 'BOJ Silver · USACO Bronze')],
                    ['🥈', t('BOJ 골드 · USACO Silver', 'BOJ Gold · USACO Silver')],
                    ['🥇', t('BOJ 플래티넘 · USACO Gold 도전', 'BOJ Platinum · USACO Gold')],
                  ].map(([icon, text]) => (
                    <div key={String(text)} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4 — 대회 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center text-lg flex-shrink-0">🏆</div>
            <div className="flex-1">
              <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-4 space-y-2">
                <p className="font-black text-gray-900 text-sm">{t("대회 출전", "Competition")}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-xl border border-yellow-200 p-2.5 space-y-0.5">
                    <p className="font-black text-sm text-gray-900">USACO 🇺🇸</p>
                    <p className="text-[11px] text-gray-500">{t("미국 정보올림피아드", "USA Computing Olympiad")}</p>
                    <p className="text-[11px] text-gray-400">{t("대학 입시 스펙", "College app credential")}</p>
                    <span className="inline-block text-[10px] bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 font-bold">C++ {t("권장", "recommended")}</span>
                  </div>
                  <div className="bg-white rounded-xl border border-yellow-200 p-2.5 space-y-0.5">
                    <p className="font-black text-sm text-gray-900">MCC 🇨🇦</p>
                    <p className="text-[11px] text-gray-500">{t("캐나다 정보올림피아드", "Canadian Computing Contest")}</p>
                    <p className="text-[11px] text-gray-400">{t("학교 대표 출전", "School representative")}</p>
                    <span className="inline-block text-[10px] bg-orange-100 text-orange-700 rounded px-1.5 py-0.5 font-bold">Python {t("가능", "supported")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 학습 방법 ── */}
        <div>
          <h2 className="text-base font-black text-gray-800 mb-3">
            {t("어떻게 배우나요?", "How does it work?")}
          </h2>
          <div className="space-y-2">
            {[
              { icon: '📖', color: 'bg-orange-100 text-orange-600', title: t('수업 듣기', 'Study a Lesson'), desc: t('설명 → 빈칸 채우기 → 코드 예측 → 직접 실행. 브라우저에서 바로.', 'Explanation → fill-in → predict → run code. All in your browser.') },
              { icon: '🧩', color: 'bg-purple-100 text-purple-600', title: t('퀴즈로 굳히기', 'Reinforce with Quizzes'), desc: t('틀린 문제를 자동으로 다시 출제. 개념이 머릿속에 남아요.', 'Missed concepts come back automatically until they stick.') },
              { icon: '🧠', color: 'bg-blue-100 text-blue-600', title: t('알고리즘 문제 풀기', 'Solve Algorithm Problems'), desc: t('시뮬레이션으로 흐름을 보고, 힌트로 막힌 곳을 뚫어요.', 'Visualize the flow, use hints when stuck, submit your solution.') },
              { icon: '📊', color: 'bg-green-100 text-green-600', title: t('선생님 피드백', 'Teacher Feedback'), desc: t('직접해보기 과제를 선생님이 채점하고 코멘트를 달아줘요.', 'Your teacher grades your hands-on assignments and leaves comments.') },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-3.5 shadow-sm">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${item.color}`}>{item.icon}</div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 하단 CTA ── */}
        <div className="text-center space-y-2 pt-2">
          <Link
            href="/login"
            className="inline-block px-8 py-3 rounded-2xl bg-orange-500 text-white font-black text-base border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {t("지금 시작하기 →", "Get Started →")}
          </Link>
          <p className="text-[11px] text-gray-400">{t("선생님과 함께 나에게 맞는 경로를 찾아요", "Find the right path with your teacher")}</p>
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
