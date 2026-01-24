"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Circle,
  BookOpen,
  Trophy,
  Clock,
  ChevronDown,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react"

// ============================================================
// 웹앱용 커리큘럼 (새 번호 체계)
// ============================================================
const curriculumData = [
  {
    id: "part1",
    title: "Part 1: 기초",
    description: "파이썬 설치부터 기본적인 입출력까지! 이 파트를 끝내면 간단한 계산 프로그램을 만들 수 있어요.",
    lessons: [
      { id: 1, title: "1. print() 출력", description: "화면에 글자와 숫자 출력하기", duration: "15분", hasQuiz: true },
      { id: 2, title: "2. 데이터 타입", description: "숫자, 문자열, 불리언의 차이", duration: "15분", hasQuiz: true },
      { id: 3, title: "3. 변수", description: "데이터를 저장하는 상자", duration: "20분", hasQuiz: true },
      { id: 4, title: "4. 연산자", description: "계산하고 비교하기", duration: "20분", hasQuiz: true },
      { id: 5, title: "5. 문자열 연산", description: "문자열 더하고 곱하기", duration: "15분", hasQuiz: true },
      { id: 6, title: "6. 문자열 메서드", description: "upper, lower, strip 등", duration: "20분", hasQuiz: true },
      { id: 7, title: "7. print() 옵션", description: "sep, end로 출력 꾸미기", duration: "15분", hasQuiz: true },
      { id: 8, title: "8. f-string", description: "편리한 문자열 포맷팅", duration: "15분", hasQuiz: true },
      { id: 9, title: "9. 타입 변환", description: "int, float, str 변환", duration: "15분", hasQuiz: true },
      { id: 10, title: "10. input() 입력", description: "사용자에게 입력받기", duration: "15분", hasQuiz: true },
      { id: "p1", title: "🎮 미니 계산기", description: "Part 1 복습 프로젝트", duration: "20분", isProject: true },
    ],
  },
  {
    id: "part2",
    title: "Part 2: 제어문",
    description: "프로그램에 판단력과 반복 능력을 주는 제어문! 조건에 따라 다르게 동작하고, 반복 작업을 자동화해요.",
    lessons: [
      { id: 11, title: "11. 조건문 (if)", description: "조건에 따라 다르게 실행", duration: "25분", hasQuiz: true },
      { id: 12, title: "12. 조건문 심화", description: "and, or, not 논리 연산자", duration: "20분", hasQuiz: true },
      { id: 13, title: "13. 반복문 (for)", description: "정해진 횟수만큼 반복", duration: "25분", hasQuiz: true },
      { id: 14, title: "14. 반복문 (while)", description: "조건이 참인 동안 반복", duration: "25분", hasQuiz: true },
      { id: "p2", title: "🎮 숫자 맞추기 게임", description: "Part 2 복습 프로젝트", duration: "25분", isProject: true },
    ],
  },
  {
    id: "part3",
    title: "Part 3: 자료구조",
    description: "데이터를 효율적으로 저장하고 관리하는 방법! 리스트, 튜플, 딕셔너리, 집합을 활용해요.",
    lessons: [
      { id: 15, title: "15. 자료구조 개요", description: "4가지 자료구조 소개", duration: "15분", hasQuiz: true },
      { id: 16, title: "16. 리스트 기초", description: "여러 데이터를 한 번에 저장", duration: "25분", hasQuiz: true },
      { id: 17, title: "17. 리스트와 반복문", description: "for문으로 리스트 순회", duration: "20분", hasQuiz: true },
      { id: 18, title: "18. split()과 join()", description: "문자열 쪼개고 합치기", duration: "20분", hasQuiz: true },
      { id: 19, title: "19. 튜플", description: "수정할 수 없는 리스트", duration: "15분", hasQuiz: true },
      { id: 20, title: "20. 딕셔너리", description: "키-값 쌍으로 데이터 저장", duration: "25분", hasQuiz: true },
      { id: 21, title: "21. 집합 (set)", description: "중복 없는 집합", duration: "20분", hasQuiz: true },
      { id: 22, title: "22. 슬라이싱", description: "리스트/문자열 일부 추출", duration: "20분", hasQuiz: true },
      { id: "p3", title: "🎮 Hangman 게임", description: "Part 3 복습 프로젝트", duration: "40분", isProject: true },
    ],
  },
  {
    id: "part3-advanced",
    title: "Part 3+: 자료구조 심화 ⭐",
    description: "스택, 큐, 덱을 배우고 코딩테스트에 자주 나오는 자료구조를 마스터해요!",
    lessons: [
      { id: 23, title: "23. 스택 (Stack)", description: "LIFO! 마지막이 먼저 나오는 자료구조", duration: "25분", hasQuiz: true },
      { id: 24, title: "24. 큐 (Queue)", description: "FIFO! 먼저 온 게 먼저 나오는 자료구조", duration: "25분", hasQuiz: true },
      { id: 25, title: "25. 덱 (Deque)", description: "양쪽에서 넣고 빼는 자료구조", duration: "25분", hasQuiz: true },
      { id: 26, title: "26. 자료구조 비교와 선택", description: "상황에 맞는 자료구조 고르기", duration: "30분", hasQuiz: true },
    ],
  },
  {
    id: "part4",
    title: "Part 4: 프로젝트 & 도전",
    description: "Part 1~3에서 배운 모든 것을 활용! 프로젝트를 만들고 다양한 문제를 풀어요.",
    comingSoon: true,
    lessons: [],
  },
  {
    id: "part5",
    title: "Part 5: 함수",
    description: "코드를 재사용하고 정리하는 함수를 배워요!",
    comingSoon: true,
    lessons: [],
  },
  {
    id: "part6",
    title: "Part 6: 에러와 파일",
    description: "에러를 처리하고 파일을 다뤄요.",
    comingSoon: true,
    lessons: [],
  },
  {
    id: "part7",
    title: "Part 7: 클래스",
    description: "객체지향 프로그래밍의 기초를 배워요.",
    comingSoon: true,
    lessons: [],
  },
  {
    id: "part8",
    title: "Part 8: 모듈과 패키지",
    description: "다른 사람이 만든 코드를 활용해요.",
    comingSoon: true,
    lessons: [],
  },
  {
    id: "part9",
    title: "Part 9: 종합 프로젝트",
    description: "모든 것을 활용한 대형 프로젝트!",
    comingSoon: true,
    lessons: [],
  },
]

export default function CurriculumPage() {
  const [completedLessons, setCompletedLessons] = useState<Set<number | string>>(new Set())
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set(["part1", "part2", "part3", "part3-advanced"]))

  useEffect(() => {
    const saved = localStorage.getItem("completedLessons")
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)))
    }
  }, [])

  const allLessons = curriculumData.flatMap((part) => part.lessons)
  const totalCount = allLessons.length
  const completedCount = allLessons.filter((lesson) => completedLessons.has(lesson.id)).length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const toggleCompletion = (id: number | string) => {
    const newCompleted = new Set(completedLessons)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompletedLessons(newCompleted)
    localStorage.setItem("completedLessons", JSON.stringify([...newCompleted]))
  }

  const togglePart = (partId: string) => {
    const newExpanded = new Set(expandedParts)
    if (newExpanded.has(partId)) {
      newExpanded.delete(partId)
    } else {
      newExpanded.add(partId)
    }
    setExpandedParts(newExpanded)
  }

  const getNextLesson = () => {
    for (const part of curriculumData) {
      for (const lesson of part.lessons) {
        if (!completedLessons.has(lesson.id)) {
          return { lesson, part }
        }
      }
    }
    return null
  }

  const nextLessonInfo = getNextLesson()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header studentName="학습자" level={1} />

      {/* 커리큘럼: 넓은 레이아웃 + 양쪽 여백 */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
        
        {/* 상단 진도 바 */}
        <div className="max-w-[1600px] mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border-4 border-black">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl border-2 border-black">
                  <BookOpen className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">파이썬 기초 마스터</h1>
                  <p className="text-gray-600 text-sm sm:text-base">웹에서 바로 배우는 파이썬! 🚀</p>
                </div>
              </div>
              
              {/* 다음 수업 버튼 */}
              {nextLessonInfo && (
                <Link
                  href={`/practice/${nextLessonInfo.lesson.id}`}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl border-2 border-black font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="hidden sm:inline">다음:</span> {nextLessonInfo.lesson.title}
                  <Play className="h-5 w-5" />
                </Link>
              )}
            </div>
            
            {/* 진도 바 */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="h-4 sm:h-5 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-orange-500">{progress}%</span>
                <span className="text-gray-500 ml-1 text-sm">({completedCount}/{totalCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* 커리큘럼 그리드 - 반응형 */}
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            {curriculumData.map((part) => {
              const partLessons = part.lessons
              const isComingSoon = part.comingSoon
              const partCompletedCount = partLessons.filter((l) => completedLessons.has(l.id)).length
              const partProgress = partLessons.length > 0 ? Math.round((partCompletedCount / partLessons.length) * 100) : 0
              const isExpanded = expandedParts.has(part.id)
              const hasLessons = partLessons.length > 0

              return (
                <div key={part.id} className={`bg-white rounded-2xl border-3 border-black shadow-lg overflow-hidden ${isComingSoon ? 'opacity-60' : ''}`}>
                  {/* Part Header */}
                  <button
                    onClick={() => !isComingSoon && hasLessons && togglePart(part.id)}
                    disabled={isComingSoon}
                    className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
                  >
                    {!isComingSoon && hasLessons ? (
                      isExpanded ? (
                        <ChevronDown className="h-6 w-6 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-gray-600 flex-shrink-0" />
                      )
                    ) : (
                      <div className="h-6 w-6 flex-shrink-0" />
                    )}

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{part.title}</h2>
                        {isComingSoon && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-bold">
                            준비중
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{part.description}</p>

                      {hasLessons && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {partCompletedCount}/{partLessons.length} 완료
                            </span>
                            <span className="text-xs font-bold text-orange-500">{partProgress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full border border-black overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                              style={{ width: `${partProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {partProgress === 100 && hasLessons && (
                      <Trophy className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                    )}
                  </button>

                  {/* Lessons List */}
                  {isExpanded && hasLessons && !isComingSoon && (
                    <div className="border-t-2 border-black bg-gray-50 p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        {partLessons.map((lesson) => {
                          const isCompleted = completedLessons.has(lesson.id)

                          return (
                            <div
                              key={lesson.id}
                              className="bg-white rounded-xl p-3 sm:p-4 border-2 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                              <div className="flex items-center gap-3">
                                {/* 체크박스 */}
                                <button
                                  onClick={() => toggleCompletion(lesson.id)}
                                  className="flex-shrink-0"
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-green-500" />
                                  ) : (
                                    <Circle className="h-6 w-6 sm:h-7 sm:w-7 text-gray-300 hover:text-gray-400" />
                                  )}
                                </button>

                                {/* 레슨 정보 */}
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-bold text-sm sm:text-base ${isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}>
                                    {lesson.title}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                                      <Clock className="h-3 w-3" />
                                      {lesson.duration}
                                    </span>
                                    {lesson.hasQuiz && (
                                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-bold">
                                        퀴즈
                                      </span>
                                    )}
                                    {lesson.isProject && (
                                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-xs font-bold">
                                        프로젝트
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* 버튼들 */}
                                <div className="flex gap-2 flex-shrink-0">
                                  <Link
                                    href={`/practice/${lesson.id}`}
                                    className="px-3 sm:px-4 py-2 rounded-lg border-2 border-black font-bold bg-green-500 text-white hover:bg-green-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm"
                                  >
                                    📺 수업
                                  </Link>
                                  <Link
                                    href={`/learn/${lesson.id}`}
                                    className={`px-3 sm:px-4 py-2 rounded-lg border-2 border-black font-bold text-xs sm:text-sm ${
                                      isCompleted
                                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        : "bg-orange-400 text-white hover:bg-orange-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    }`}
                                  >
                                    🎮 복습
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
