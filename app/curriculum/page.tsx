"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
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
// 코스 타입
// ============================================================
type CourseType = "python" | "cpp"

// ============================================================
// /review에 실제 레슨이 있는 ID 목록 (게임형 복습) — Python 전용
// ============================================================
const lessonsInReview = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48])

// C++ 복습이 있는 레슨 ID 목록
const cppReviewIds = new Set([
  "cpp-1", "cpp-2", "cpp-3", "cpp-4", "cpp-5", "cpp-6", "cpp-7", "cpp-8",
  "cpp-9", "cpp-10", "cpp-11", "cpp-12", "cpp-13", "cpp-14",
  "cpp-15", "cpp-16", "cpp-17", "cpp-18", "cpp-19", "cpp-20",
  "cpp-p1", "cpp-p2", "cpp-p3"
])

// 복습 경로 결정: /review에 있으면 review, 없으면 learn으로 fallback
const getReviewPath = (lessonId: number | string) => {
  if (typeof lessonId === 'number' && lessonsInReview.has(lessonId)) {
    return `/review/${lessonId}`
  }
  if (typeof lessonId === 'string' && cppReviewIds.has(lessonId)) {
    return `/review/${lessonId}`
  }
  return `/learn/${lessonId}`
}

// ============================================================
// 파트 데이터 타입
// ============================================================
type PartData = {
  id: string
  title: string
  description: string
  comingSoon?: boolean
  lessons: { id: number | string; title: string; description: string; duration: string; hasQuiz?: boolean; isProject?: boolean }[]
}

// ============================================================
// 🐍 Python 커리큘럼
// ============================================================
const pythonCurriculumData: PartData[] = [
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
    lessons: [
      { id: 27, title: "27. 가위바위보 게임", description: "리스트, 조건문, 반복문으로 가위바위보!", duration: "25분", hasQuiz: true },
      { id: 28, title: "28. 로또 번호 생성기", description: "random 모듈과 리스트로 로또 만들기", duration: "25분", hasQuiz: true },
      { id: 29, title: "29. 단어장 프로그램", description: "딕셔너리로 나만의 단어장!", duration: "25분", hasQuiz: true },
      { id: 30, title: "30. 성적 관리 시스템", description: "리스트와 딕셔너리로 성적 관리", duration: "25분", hasQuiz: true },
      { id: 31, title: "31. 종합 문제 모음", description: "기초부터 자료구조까지 30문제!", duration: "50분", hasQuiz: true },
    ],
  },
  {
    id: "part5",
    title: "Part 5: 함수",
    description: "코드를 재사용하고 정리하는 함수를 배워요! Level 2 시험의 핵심!",
    lessons: [
      { id: 32, title: "32. 함수란?", description: "def로 함수 만들기, return으로 결과 반환", duration: "25분", hasQuiz: true },
      { id: 33, title: "33. 매개변수와 반환값", description: "기본값, 여러 값 반환, 키워드 인자", duration: "25분", hasQuiz: true },
      { id: 34, title: "34. 함수 활용", description: "지역변수, 전역변수, 람다 함수", duration: "25분", hasQuiz: true },
      { id: 35, title: "35. 내장함수 총정리", description: "len, sum, max, min, sorted, map", duration: "30분", hasQuiz: true },
      { id: 36, title: "36. 함수 문제 30", description: "함수 마스터를 위한 30문제!", duration: "40분", hasQuiz: true },
    ],
  },
  {
    id: "part6",
    title: "Part 6: 에러와 파일",
    description: "에러를 처리하고 파일을 다뤄요! 게임 세이브 시스템을 만들어요.",
    lessons: [
      { id: 37, title: "37. 에러 처리하기", description: "try-except로 에러 잡기", duration: "25분", hasQuiz: true },
      { id: 38, title: "38. 파일 읽고 쓰기", description: "파일로 데이터 저장하기", duration: "25분", hasQuiz: true },
      { id: 39, title: "39. 게임 세이브", description: "RPG 게임 저장/불러오기", duration: "30분", hasQuiz: true },
      { id: 40, title: "40. Part 6 문제 20", description: "에러와 파일 연습 문제", duration: "40분", hasQuiz: true },
    ],
  },
  {
    id: "part7",
    title: "Part 7: 클래스",
    description: "객체지향 프로그래밍의 기초를 배워요. 붕어빵 틀처럼 객체를 찍어내요!",
    lessons: [
      { id: 41, title: "41. 클래스 기초", description: "클래스와 객체 만들기", duration: "25분", hasQuiz: true },
      { id: 42, title: "42. 메서드와 속성", description: "메서드 만들기와 변수 종류", duration: "25분", hasQuiz: true },
      { id: 43, title: "43. RPG 게임", description: "클래스로 RPG 게임 만들기", duration: "30분", hasQuiz: true },
      { id: 44, title: "44. Part 7 문제 20", description: "클래스 연습 문제", duration: "40분", hasQuiz: true },
    ],
  },
  {
    id: "part8",
    title: "Part 8: 모듈과 패키지",
    description: "다른 사람이 만든 코드를 활용해요.",
    lessons: [
      { id: 45, title: "45. 모듈 기초", description: "import와 내장 모듈 사용법", duration: "25분", hasQuiz: true },
      { id: 46, title: "46. 패키지와 pip", description: "패키지 개념과 내장 모듈 활용", duration: "25분", hasQuiz: true },
      { id: 47, title: "47. 날씨 앱", description: "모듈로 날씨 앱 만들기", duration: "30분", hasQuiz: true },
      { id: 48, title: "48. Part 8 문제 20", description: "모듈과 패키지 연습 문제", duration: "40분", hasQuiz: true },
    ],
  },
  {
    id: "part9",
    title: "Part 9: 종합 프로젝트",
    description: "모든 것을 활용한 대형 프로젝트!",
    lessons: [
      { id: 49, title: "49. 텍스트 RPG: 게임 설계", description: "클래스 구조 설계와 게임 흐름", duration: "30분", hasQuiz: true },
      { id: 50, title: "50. 텍스트 RPG: 핵심 시스템", description: "캐릭터, 몬스터, 아이템 구현", duration: "45분", hasQuiz: true },
      { id: 51, title: "51. 텍스트 RPG: 게임 완성", description: "상점, 세이브, 게임 루프 통합", duration: "45분", hasQuiz: true },
      { id: 52, title: "52. 텍스트 RPG: 업그레이드", description: "치명타, 퀘스트, 스킬 추가", duration: "40분", hasQuiz: true },
      { id: "p4", title: "🐍 Snake Game", description: "turtle, 클래스, 모듈로 뱀 게임 만들기", duration: "60분", isProject: true },
    ],
  },
]

// ============================================================
// ⚡ C++ 커리큘럼
// ============================================================
const cppCurriculumData: PartData[] = [
  {
    id: "cpp-part1",
    title: "Part 1: C++ 기초",
    description: "파이썬을 아는 학생을 위한 C++ 입문! 두 언어의 차이부터 시작해서 기본 문법을 배워요.",
    lessons: [
      { id: "cpp-1", title: "1. 파이썬 vs C++", description: "인터프리터 vs 컴파일러, 핵심 차이", duration: "20분", hasQuiz: true },
      { id: "cpp-2", title: "2. cout 심화 & namespace", description: "숫자·수식 출력, 이스케이프, using namespace std", duration: "20분", hasQuiz: true },
      { id: "cpp-3", title: "3. 변수와 타입", description: "int, double, string 직접 선언", duration: "20분", hasQuiz: true },
      { id: "cpp-4", title: "4. cin 입력", description: "cin >>으로 입력받기", duration: "20분", hasQuiz: true },
      { id: "cpp-5", title: "5. 연산자", description: "정수 나눗셈, ++, &&, || 연산자", duration: "20분", hasQuiz: true },
      { id: "cpp-6", title: "6. 조건문 (if/else)", description: "중괄호 {}와 switch/case", duration: "20분", hasQuiz: true },
      { id: "cpp-7", title: "7. 반복문 (for/while)", description: "for(int i=0; i<n; i++)", duration: "20분", hasQuiz: true },
      { id: "cpp-8", title: "8. 함수", description: "반환 타입, void, 함수 오버로딩", duration: "20분", hasQuiz: true },
      { id: "cpp-p1", title: "🎮 숫자 맞추기 게임", description: "Part 1 복습 프로젝트", duration: "25분", isProject: true },
    ],
  },
  {
    id: "cpp-part2",
    title: "Part 2: 더 깊은 C++",
    description: "배열, 벡터, 참조, 포인터, 클래스까지! C++만의 강력한 기능을 배워요.",
    lessons: [
      { id: "cpp-9", title: "9. 배열 & 벡터", description: "int arr[5], vector<int>, push_back", duration: "25분", hasQuiz: true },
      { id: "cpp-10", title: "10. Range-for & auto", description: "for(auto x : vec), 타입 추론", duration: "20분", hasQuiz: true },
      { id: "cpp-11", title: "11. 문자열 심화", description: "substr, find, replace, 비교", duration: "20분", hasQuiz: true },
      { id: "cpp-12", title: "12. 참조와 함수", description: "int& ref, call by reference", duration: "25분", hasQuiz: true },
      { id: "cpp-13", title: "13. 포인터 기초", description: "int* ptr, &, *, nullptr", duration: "25분", hasQuiz: true },
      { id: "cpp-14", title: "14. 구조체 & 클래스", description: "struct, class, 생성자", duration: "25분", hasQuiz: true },
      { id: "cpp-p2", title: "⚔️ RPG 캐릭터 관리", description: "Part 2 복습 프로젝트", duration: "30분", isProject: true },
    ],
  },
  {
    id: "cpp-part3",
    title: "Part 3: USACO 준비",
    description: "대회 프로그래밍(CP)에 필요한 STL 컨테이너, 알고리즘, Fast I/O, 비트 연산을 마스터해요!",
    lessons: [
      { id: "cpp-15", title: "15. pair & 정렬", description: "pair<int,int>, sort(), 커스텀 비교", duration: "25분", hasQuiz: true },
      { id: "cpp-16", title: "16. map & set", description: "map, unordered_map, set", duration: "25분", hasQuiz: true },
      { id: "cpp-17", title: "17. STL 알고리즘", description: "sort, find, lower_bound, accumulate", duration: "25분", hasQuiz: true },
      { id: "cpp-18", title: "18. stack, queue & deque", description: "STL 컨테이너, priority_queue", duration: "25분", hasQuiz: true },
      { id: "cpp-19", title: "19. 파일 I/O & Fast I/O", description: "freopen, ifstream, sync_with_stdio", duration: "25분", hasQuiz: true },
      { id: "cpp-20", title: "20. CP 실전 팁", description: "bits/stdc++.h, typedef, 비트 연산", duration: "25분", hasQuiz: true },
      { id: "cpp-p3", title: "🏆 USACO 모의전", description: "Part 3 복습 프로젝트", duration: "30분", isProject: true },
    ],
  },
]

export default function CurriculumPage() {
  const { t } = useLanguage()
  const [completedLessons, setCompletedLessons] = useState<Set<number | string>>(new Set())
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set(["part1", "part2", "part3", "part3-advanced", "part4", "part5", "part6", "part7", "part8", "part9", "cpp-part1", "cpp-part2", "cpp-part3"]))
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("python")

  useEffect(() => {
    const saved = localStorage.getItem("completedLessons")
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)))
    }
    const savedCourse = localStorage.getItem("selectedCourse") as CourseType
    if (savedCourse === "python" || savedCourse === "cpp") {
      setSelectedCourse(savedCourse)
    }
  }, [])

  const handleCourseChange = (course: CourseType) => {
    setSelectedCourse(course)
    localStorage.setItem("selectedCourse", course)
  }

  const curriculumData = selectedCourse === "python" ? pythonCurriculumData : cppCurriculumData
  const isCpp = selectedCourse === "cpp"

  // URL hash로 해당 레슨 위치로 스크롤
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 300)
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
      <Header />

      {/* 커리큘럼: 넓은 레이아웃 + 양쪽 여백 */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
        
        {/* 코스 선택 탭 */}
        <div className="max-w-[1600px] mx-auto mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleCourseChange("python")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-3 border-black font-bold text-base transition-all ${
                selectedCourse === "python"
                  ? "bg-orange-400 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
            >
              🐍 Python
            </button>
            <button
              onClick={() => handleCourseChange("cpp")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-3 border-black font-bold text-base transition-all ${
                selectedCourse === "cpp"
                  ? "bg-blue-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              ⚡ C++
            </button>
          </div>
        </div>

        {/* 상단 진도 바 */}
        <div className="max-w-[1600px] mx-auto">
          <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border-4 border-black`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className={`${isCpp ? 'bg-blue-100' : 'bg-orange-100'} p-3 rounded-xl border-2 border-black`}>
                  <BookOpen className={`h-8 w-8 ${isCpp ? 'text-blue-500' : 'text-orange-500'}`} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {isCpp ? t("C++ 기초 (파이썬 → C++)", "C++ Basics (Python → C++)") : t("파이썬 기초 마스터", "Python Basics Master")}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {isCpp ? t("파이썬을 아는 학생을 위한 C++ 입문! ⚡", "C++ for Python students! ⚡") : t("웹에서 바로 배우는 파이썬! 🚀", "Learn Python on the web! 🚀")}
                  </p>
                </div>
              </div>
              
              {/* 다음 수업 버튼 */}
              {nextLessonInfo && (
                <Link
                  href={`/learn/${nextLessonInfo.lesson.id}`}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl border-2 border-black font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="hidden sm:inline">{t("다음:", "Next:")}</span> {nextLessonInfo.lesson.title}
                  <Play className="h-5 w-5" />
                </Link>
              )}
            </div>
            
            {/* 진도 바 */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="h-4 sm:h-5 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isCpp ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xl sm:text-2xl font-bold ${isCpp ? 'text-blue-500' : 'text-orange-500'}`}>{progress}%</span>
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
                            {t("준비중", "Coming Soon")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{part.description}</p>

                      {hasLessons && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {partCompletedCount}/{partLessons.length} {t("완료", "done")}
                            </span>
                            <span className={`text-xs font-bold ${isCpp ? 'text-blue-500' : 'text-orange-500'}`}>{partProgress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full border border-black overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${isCpp ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}`}
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
                              id={`lesson-${lesson.id}`}
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
                                        {t("퀴즈", "Quiz")}
                                      </span>
                                    )}
                                    {lesson.isProject && (
                                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-xs font-bold">
                                        {t("프로젝트", "Project")}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* 버튼들 */}
                                <div className="flex gap-2 flex-shrink-0">
                                  <Link
                                    href={`/learn/${lesson.id}`}
                                    className={`px-3 sm:px-4 py-2 rounded-lg border-2 border-black font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm ${
                                      isCpp ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                                    }`}
                                  >
                                    {t("📺 수업", "📺 Lesson")}
                                  </Link>
                                  {(!isCpp || cppReviewIds.has(String(lesson.id))) && (
                                    <Link
                                      href={getReviewPath(lesson.id)}
                                      className={`px-3 sm:px-4 py-2 rounded-lg border-2 border-black font-bold text-xs sm:text-sm ${
                                        isCompleted
                                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                          : "bg-orange-400 text-white hover:bg-orange-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                      }`}
                                    >
                                      {t("🎮 퀴즈", "🎮 Quiz")}
                                    </Link>
                                  )}
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
