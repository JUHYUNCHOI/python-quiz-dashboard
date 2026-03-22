"use client"

import { GiraffeHero } from "@/components/giraffe-hero"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Trophy, Flame, Zap, ChevronRight, Target } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useGamification, DAILY_XP_GOAL } from "@/hooks/use-gamification"
import { useState, useEffect } from "react"

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
  "cpp-15","cpp-16","cpp-17","cpp-18","cpp-19","cpp-20","cpp-p3",
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

export default function DashboardPage() {
  const { t, lang } = useLanguage()
  const { level, totalXp, dailyStreak, xpToday } = useGamification()
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null)
  // lessonLoaded: localStorage 읽기 전에 "모든 레슨 완료" 카드가 잠깐 뜨는 깜빡임 방지
  const [lessonLoaded, setLessonLoaded] = useState(false)

  useEffect(() => {
    setNextLesson(readNextLesson(lang))
    setLessonLoaded(true)
  }, [lang])

  const xpProgress = Math.min(xpToday, DAILY_XP_GOAL)
  const xpPercent = Math.round((xpProgress / DAILY_XP_GOAL) * 100)
  const goalDone = xpToday >= DAILY_XP_GOAL

  const isCpp = nextLesson?.course === "cpp"
  const courseLabel = isCpp ? "C++" : "Python"

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-4 max-w-2xl mx-auto space-y-4">

        {/* 기린 히어로 */}
        <GiraffeHero />

        {/* 오늘의 목표 */}
        <Card className="p-4 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-gray-800 text-sm">
                {t("오늘의 목표", "Daily Goal")}
              </span>
            </div>
            <span className="text-sm font-bold text-orange-600">
              {xpProgress} / {DAILY_XP_GOAL} XP
            </span>
          </div>

          {/* 프로그레스 바 */}
          <div className="w-full bg-orange-100 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${xpPercent}%`,
                background: goalDone
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #fb923c, #f97316)",
              }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {goalDone
              ? t("🎉 오늘 목표 달성! 스트릭 유지 중 🔥", "🎉 Goal reached! Streak is safe 🔥")
              : t(
                  `${DAILY_XP_GOAL - xpProgress} XP 더 모으면 목표 달성! 퀴즈 한 판이면 충분해요 💪`,
                  `${DAILY_XP_GOAL - xpProgress} XP to go — one quiz session is enough! 💪`
                )}
          </p>
        </Card>

        {/* 다음 레슨 */}
        {!lessonLoaded ? (
          // localStorage 읽기 전: 스켈레톤으로 깜빡임 방지
          <Card className="p-4 border-2 border-gray-100 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
              <div className="w-16 h-8 bg-gray-100 rounded-full" />
            </div>
          </Card>
        ) : nextLesson ? (
          <Link href={`/learn/${nextLesson.id}`} className="block active:scale-[0.98] transition-transform">
            <Card className={`p-4 border-2 ${isCpp ? "border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50" : "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50"} hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isCpp ? "bg-blue-100" : "bg-green-100"}`}>
                    {nextLesson.title.startsWith("🎮") || nextLesson.title.startsWith("🏆") || nextLesson.title.startsWith("🐍")
                      ? nextLesson.title.slice(0, 2)
                      : isCpp ? "⚡" : "🐍"}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {t(`${courseLabel} 다음 레슨`, `Next ${courseLabel} Lesson`)}
                    </p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">{nextLesson.title}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold text-white ${isCpp ? "bg-blue-500" : "bg-green-500"}`}>
                  {t("시작", "Go")}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <Card className="p-4 border-2 border-yellow-300 bg-yellow-50 text-center">
            <p className="text-2xl mb-1">🏆</p>
            <p className="font-bold text-gray-800 text-sm">{t("모든 레슨 완료!", "All lessons complete!")}</p>
            <p className="text-xs text-gray-500 mt-1">{t("퀴즈로 실력을 다져봐요!", "Keep sharpening your skills with quizzes!")}</p>
          </Card>
        )}

        {/* 통계 미니 바 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-xl bg-orange-50 border border-orange-100">
            <Trophy className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <p className="text-base font-bold text-orange-600">Lv.{level}</p>
            <p className="text-xs text-gray-400">{t("레벨", "Level")}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-purple-50 border border-purple-100">
            <Zap className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <p className="text-base font-bold text-purple-600">{totalXp}</p>
            <p className="text-xs text-gray-400">{t("총 XP", "Total XP")}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-50 border border-red-100">
            <Flame className="w-4 h-4 text-red-500 mx-auto mb-1" />
            <p className="text-base font-bold text-red-600">
              {t(`${dailyStreak}일`, `${dailyStreak}d`)}
            </p>
            <p className="text-xs text-gray-400">{t("연속", "Streak")}</p>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/curriculum" className="block active:scale-[0.97] transition-transform">
            <Card className="p-4 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-bold text-sm text-gray-700">{t("전체 커리큘럼", "Curriculum")}</span>
                <span className="text-xs text-gray-400">{t("모든 레슨 보기", "Browse all lessons")}</span>
              </div>
            </Card>
          </Link>
          <Link href="/quiz/setup" className="block active:scale-[0.97] transition-transform">
            <Card className="p-4 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold text-sm text-gray-700">{t("퀴즈 풀기", "Take Quiz")}</span>
                <span className="text-xs text-gray-400">{t("실력 테스트", "Test your skills")}</span>
              </div>
            </Card>
          </Link>
        </div>

      </main>

      <BottomNav />
    </div>
  )
}
