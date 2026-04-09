"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { pythonParts, cppParts, pseudoParts, getLessonName } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"
import { Share2, Copy } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ParentReportData {
  student_name: string
  student_id?: string
  total_xp: number
  daily_streak: number
  last_active_date: string
  lesson_progress: {
    lesson_id: string
    progress_type: string
    completed: boolean
    score: number
    updated_at: string
  }[]
  recent_quizzes: {
    difficulty: string
    total_questions: number
    correct_answers: number
    max_combo: number
    time_elapsed_ms: number
    end_reason: string
    xp_earned: number
    completed_at: string
  }[]
}

interface HomeworkItem {
  lesson_id: string
  submitted_at: string
  teacher_grade: string | null  // "pass" | "fail" | "auto" | null(미채점)
  teacher_comment: string | null
  student_code: string
}

// ─── 커리큘럼 ID 목록 ────────────────────────────────────────────────
const PYTHON_PART_IDS = pythonParts.flatMap(p => p.lessonIds.map(String))
const CPP_PART_IDS    = cppParts.flatMap(p => p.lessonIds.map(String))
const PSEUDO_PART_IDS = pseudoParts.flatMap(p => p.lessonIds.map(String))

// ─── Algorithm 플랫폼 토픽 ID (algo-*) ──────────────────────────────
const ALGO_TOPIC_IDS = [
  "algo-array","algo-backtracking","algo-binarysearch","algo-bitmanipulation",
  "algo-divideconquer","algo-dp","algo-graph","algo-greedy","algo-hashtable",
  "algo-linkedlist","algo-prefixsum","algo-priorityqueue","algo-recursion",
  "algo-shortestpath","algo-sorting","algo-stackqueue","algo-string",
  "algo-topologicalsort","algo-tree","algo-trie","algo-unionfind",
]

// ─── 로드맵 단계 ID 그룹 ─────────────────────────────────────────────
const PY_INTRO_IDS   = [1,2,3,4,5,6,7,8,9,10,"p1",11,12,13,14,"p2"].map(String)
const PY_MID_IDS     = [15,16,17,18,19,20,21,22,"p3",23,24,25,26,27,28,29,30,31].map(String)
const PY_ADV_IDS     = [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,"p4"].map(String)
const CPP_BASE_IDS   = ["cpp-1","cpp-2","cpp-3","cpp-4","cpp-5","cpp-6","cpp-7","cpp-8","cpp-p1",
                        "cpp-9","cpp-21","cpp-10","cpp-11","cpp-12","cpp-13","cpp-14","cpp-22","cpp-p2"]
const CPP_ALGO_IDS   = ["cpp-15","cpp-23","cpp-16","cpp-17","cpp-18","cpp-19","cpp-20","cpp-p3"]
const PS_INTRO_IDS   = ["pseudo-1","pseudo-2","pseudo-3","pseudo-4","pseudo-28","pseudo-5","pseudo-6","pseudo-7","pseudo-8","pseudo-p1"]
const PS_MID_IDS     = ["pseudo-9","pseudo-10","pseudo-11","pseudo-12","pseudo-13","pseudo-14","pseudo-p2"]
const PS_ALGO_IDS    = ["pseudo-15","pseudo-16","pseudo-17","pseudo-18","pseudo-19","pseudo-20","pseudo-p3","pseudo-21","pseudo-22","pseudo-23"]
const PS_ADV_IDS     = ["pseudo-24","pseudo-25","pseudo-26","pseudo-27","igcse-sql1","igcse-sql2","igcse-logic1"]

type RoadmapStage = { id: string; emoji: string; label: string; labelEn: string; desc: string; descEn: string; lessonIds: string[]; external: boolean }

// Python 트랙 로드맵 (Python → Algorithm → 대회)
const PYTHON_ROADMAP: RoadmapStage[] = [
  { id: "py-intro",  emoji: "🐍", label: "Python 입문",        labelEn: "Python Basics",       desc: "변수, 조건문, 반복문 — 코딩의 기본기",          descEn: "Variables, conditionals, loops — coding fundamentals", lessonIds: PY_INTRO_IDS,  external: false },
  { id: "py-mid",    emoji: "🐍", label: "Python 심화",        labelEn: "Python Intermediate", desc: "자료구조, 함수 — 실용적인 프로그램 작성",        descEn: "Data structures, functions — writing practical programs", lessonIds: PY_MID_IDS,    external: false },
  { id: "py-adv",    emoji: "🐍", label: "Python 완성",        labelEn: "Python Advanced",     desc: "클래스, 모듈, 종합 프로젝트",                   descEn: "Classes, modules, capstone project",                 lessonIds: PY_ADV_IDS,    external: false },
  { id: "algo-py",   emoji: "📊", label: "알고리즘 (Python)",  labelEn: "Algorithms (Python)", desc: "정렬, 탐색, DP — Algorithm 플랫폼에서 학습",    descEn: "Sorting, search, DP — on Algorithm platform",         lessonIds: ALGO_TOPIC_IDS, external: false },
  { id: "contest",   emoji: "🏆", label: "USACO / MCC 도전",  labelEn: "USACO / MCC Contest", desc: "알고리즘 대회 — CodeQuest에서 실전 훈련",       descEn: "Algorithm competitions — practice on CodeQuest",       lessonIds: [],            external: true  },
]

// C++ 트랙 로드맵 (Python → C++ → Algorithm → 대회)
const CPP_ROADMAP: RoadmapStage[] = [
  { id: "py-intro",  emoji: "🐍", label: "Python 입문",        labelEn: "Python Basics",       desc: "변수, 조건문, 반복문 — 코딩의 기본기",          descEn: "Variables, conditionals, loops — coding fundamentals", lessonIds: PY_INTRO_IDS,  external: false },
  { id: "py-mid",    emoji: "🐍", label: "Python 심화",        labelEn: "Python Intermediate", desc: "자료구조, 함수 — 실용적인 프로그램 작성",        descEn: "Data structures, functions — writing practical programs", lessonIds: PY_MID_IDS,    external: false },
  { id: "py-adv",    emoji: "🐍", label: "Python 완성",        labelEn: "Python Advanced",     desc: "클래스, 모듈, 종합 프로젝트",                   descEn: "Classes, modules, capstone project",                 lessonIds: PY_ADV_IDS,    external: false },
  { id: "cpp-base",  emoji: "⚡", label: "C++ 기초·중급",      labelEn: "C++ Basics & Inter.", desc: "C++ 문법, 포인터, 자료구조",                    descEn: "C++ syntax, pointers, data structures",              lessonIds: CPP_BASE_IDS,  external: false },
  { id: "algo-cpp",  emoji: "📊", label: "알고리즘 (C++)",    labelEn: "Algorithms (C++)",    desc: "정렬, 탐색, 그리디, DP — C++로 문제 해결",      descEn: "Sorting, search, greedy, DP — solving problems in C++", lessonIds: CPP_ALGO_IDS,  external: false },
  { id: "contest",   emoji: "🏆", label: "USACO / MCC 도전",  labelEn: "USACO / MCC Contest", desc: "알고리즘 대회 — CodeQuest에서 실전 훈련",       descEn: "Algorithm competitions — practice on CodeQuest",       lessonIds: [],            external: true  },
]

// IGCSE 트랙 로드맵
const IGCSE_ROADMAP: RoadmapStage[] = [
  { id: "ps-intro",  emoji: "📋", label: "수도코드 기초",      labelEn: "Pseudocode Basics",   desc: "변수, 반복문, 배열 — IGCSE 시험의 기본기",      descEn: "Variables, loops, arrays — IGCSE exam fundamentals",  lessonIds: PS_INTRO_IDS,  external: false },
  { id: "ps-mid",    emoji: "📋", label: "수도코드 중급",      labelEn: "Pseudocode Inter.",   desc: "절차, 함수, 파일 처리",                         descEn: "Procedures, functions, file handling",               lessonIds: PS_MID_IDS,    external: false },
  { id: "ps-algo",   emoji: "📋", label: "알고리즘·시험 대비", labelEn: "Algorithms & Exam",   desc: "정렬, 탐색, 스택·큐 + 기출 형식",               descEn: "Sorting, search, stack/queue + past exam format",     lessonIds: PS_ALGO_IDS,   external: false },
  { id: "ps-adv",    emoji: "📋", label: "CS 이론·SQL·논리 회로", labelEn: "CS Theory·SQL·Logic", desc: "IGCSE Computer Science 심화",                descEn: "IGCSE Computer Science advanced topics",             lessonIds: PS_ADV_IDS,    external: false },
  { id: "mcc",       emoji: "🏆", label: "MCC 도전",           labelEn: "MCC Contest",         desc: "말레이시아 컴퓨팅 챌린지 — 코드린 수료 후",     descEn: "Malaysia Computing Challenge — after completing Coderin", lessonIds: [],            external: true  },
]

// 트랙 감지
function getTrack(completedIds: Set<string>, inProgressIds: Set<string>): "python" | "cpp" | "igcse" {
  const allActive = new Set([...completedIds, ...inProgressIds])
  const hasIgcse = [...allActive].some(id => id.startsWith("pseudo-") || id.startsWith("igcse-"))
  const hasCpp   = [...allActive].some(id => id.startsWith("cpp-"))
  if (hasIgcse) return "igcse"
  if (hasCpp)   return "cpp"
  return "python"
}

function getCapabilityStatement(completedIds: Set<string>, lang: "ko" | "en" = "ko"): { title: string; bullets: string[] } | null {
  const pyDone     = PYTHON_PART_IDS.filter(id => completedIds.has(id)).length
  const cppDone    = CPP_PART_IDS.filter(id => completedIds.has(id)).length
  const pseudoDone = PSEUDO_PART_IDS.filter(id => completedIds.has(id)).length
  const en = lang === "en"

  // IGCSE 트랙
  if (pseudoDone >= 3 && pyDone < 5) {
    if (pseudoDone >= 24) return {
      title: en ? "IGCSE CS Advanced Level" : "IGCSE CS 심화 수준",
      bullets: en
        ? ["Can cover the full IGCSE CS range including SQL, logic circuits, and CS theory", "At a level where computing competitions like MCC can be attempted"]
        : ["SQL, 논리 회로, CS 이론까지 IGCSE 전 범위를 다룰 수 있어요", "MCC 등 컴퓨팅 대회에 도전할 수 있는 수준이에요"],
    }
    if (pseudoDone >= 15) return {
      title: en ? "Studying IGCSE Algorithms" : "IGCSE 알고리즘 학습 중",
      bullets: en
        ? ["Can write sorting, searching, stack & queue algorithms in pseudocode", "Becoming familiar with the IGCSE exam format"]
        : ["정렬·탐색·스택·큐 알고리즘을 수도코드로 작성할 수 있어요", "IGCSE 시험 형식에 익숙해지고 있어요"],
    }
    if (pseudoDone >= 8) return {
      title: en ? "Intermediate Pseudocode Level" : "수도코드 중급 수준",
      bullets: en
        ? ["Can express intermediate concepts like functions and file handling in pseudocode", "Preparing for the IGCSE Computer Science exam"]
        : ["함수, 파일 처리 등 중급 개념을 수도코드로 표현할 수 있어요", "IGCSE Computer Science 시험을 준비하고 있어요"],
    }
    return {
      title: en ? "Learning Pseudocode Basics" : "수도코드 기초 학습 중",
      bullets: en
        ? ["Learning the basic pseudocode syntax required by IGCSE", "Can write variables, conditionals, and loops in pseudocode"]
        : ["IGCSE에서 요구하는 수도코드 기본 문법을 배우고 있어요", "변수, 조건문, 반복문을 수도코드로 작성할 수 있어요"],
    }
  }

  // C++ 수준 먼저 (더 높은 수준이면 우선)
  if (cppDone >= 20) return {
    title: en ? "C++ USACO Ready" : "C++ USACO 준비 수준",
    bullets: en
      ? ["Ready to prepare for algorithm competitions (Olympiad, USACO)", "Can implement sorting, data structures, and greedy algorithms in C++", "Can handle introductory university CS coursework"]
      : ["알고리즘 대회(정보올림피아드, USACO)를 준비할 수 있는 수준이에요", "정렬·자료구조·그리디 알고리즘을 C++로 구현할 수 있어요", "대학 컴퓨터공학 입문 과정을 충분히 소화할 수 있어요"],
  }
  if (cppDone >= 14) return {
    title: en ? "Intermediate C++ Level" : "C++ 중급 수준",
    bullets: en
      ? ["Can handle advanced C++ concepts like classes, recursion, and references", "Able to solve beginner algorithm competition problems"]
      : ["C++로 클래스, 재귀, 참조 등 심화 개념을 다룰 수 있어요", "알고리즘 대회 기초 문제를 풀 수 있는 수준이에요"],
  }
  if (cppDone >= 8) return {
    title: en ? "C++ Basics Complete" : "C++ 기초 완성",
    bullets: en
      ? ["Knows basic C++ syntax (variables, loops, functions)", "Successfully transitioning from Python to C++"]
      : ["C++의 기본 문법(변수·반복문·함수)을 알고 있어요", "Python에서 C++로 넘어오는 단계를 잘 밟고 있어요"],
  }
  if (pyDone >= 45) return {
    title: en ? "Advanced Python Level" : "Python 고급 수준",
    bullets: en
      ? ["Can build practical programs using modules, files, and classes", "Able to independently create small apps or games in Python"]
      : ["모듈·파일·클래스를 활용해 실용적인 프로그램을 만들 수 있어요", "Python으로 작은 앱이나 게임을 혼자 만들 수 있는 수준이에요"],
  }
  if (pyDone >= 30) return {
    title: en ? "Studying Python Functions & Classes" : "Python 함수·클래스 학습 중",
    bullets: en
      ? ["Can write and reuse custom functions", "Comfortable with data structures like lists and dictionaries"]
      : ["함수를 직접 만들고 재사용하는 코드를 작성할 수 있어요", "자료구조(리스트·딕셔너리)를 자유롭게 다룰 수 있어요"],
  }
  if (pyDone >= 20) return {
    title: en ? "Studying Python Data Structures" : "Python 자료구조 학습 중",
    bullets: en
      ? ["Can group data using lists, dictionaries, tuples, etc.", "Can write simple game logic using loops and conditionals"]
      : ["리스트·딕셔너리·튜플 등 데이터를 묶어서 다룰 수 있어요", "반복문과 조건문으로 간단한 게임 로직을 짤 수 있어요"],
  }
  if (pyDone >= 10) return {
    title: en ? "Studying Conditionals & Loops" : "Python 조건문·반복문 학습 중",
    bullets: en
      ? ["Can create code that behaves differently using if/else", "Can automate repetitive tasks with for/while loops"]
      : ["if/else로 조건에 따라 다르게 동작하는 코드를 만들 수 있어요", "for·while 반복문으로 반복 작업을 자동화할 수 있어요"],
  }
  if (pyDone >= 5) return {
    title: en ? "Python First Steps" : "Python 첫걸음 단계",
    bullets: en
      ? ["Learning basic concepts like variables, numbers, and strings", "Can build a simple calculator or output program"]
      : ["변수, 숫자, 문자열 등 기본 개념을 배우고 있어요", "간단한 계산기나 출력 프로그램을 만들 수 있어요"],
  }
  return null
}

// ─── 현재 학습 중인 파트 찾기 ──────────────────────────────────────────
function getCurrentPart(completedIds: Set<string>, inProgressIds: Set<string>): {
  courseName: string; partTitle: string; doneInPart: number; totalInPart: number; nextTopic: string
} | null {
  const allParts = [
    ...pythonParts.map(p => ({ ...p, course: "Python" })),
    ...cppParts.map(p => ({ ...p, course: "C++" })),
    ...pseudoParts.map(p => ({ ...p, course: "Pseudocode" })),
  ]
  // 가장 최근에 진행 중인 파트 찾기 (완료되지 않은 파트 중 가장 앞)
  for (const part of allParts) {
    const ids = part.lessonIds.map(String)
    const done = ids.filter(id => completedIds.has(id)).length
    const inProg = ids.filter(id => inProgressIds.has(id)).length
    if (done < ids.length && (done > 0 || inProg > 0)) {
      // 현재 진행 중인 레슨 찾기
      const currentId = ids.find(id => inProgressIds.has(id) && !completedIds.has(id))
        ?? ids.find(id => !completedIds.has(id))
      return {
        courseName: part.course,
        partTitle: part.title,
        doneInPart: done,
        totalInPart: ids.length,
        nextTopic: currentId ?? "",
      }
    }
  }
  return null
}

// ─── 이해도 서술 ──────────────────────────────────────────────────────
function getUnderstandingInfo(avgAccuracy: number | null, lang: "ko" | "en" = "ko"): {
  label: string; color: string; bgColor: string; borderColor: string; description: string
} {
  const en = lang === "en"
  if (avgAccuracy === null) return {
    label: en ? "No quiz record" : "퀴즈 기록 없음", color: "text-gray-500", bgColor: "bg-gray-50",
    borderColor: "border-gray-200", description: en ? "No quizzes attempted yet." : "아직 퀴즈를 풀지 않았어요.",
  }
  if (avgAccuracy >= 85) return {
    label: en ? "Understanding very well 🌟" : "매우 잘 이해하고 있어요 🌟", color: "text-green-700", bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: en
      ? `Scoring an average of ${avgAccuracy}%. This shows solid understanding of what's been learned.`
      : `평균 ${avgAccuracy}%로 문제를 잘 풀고 있어요. 배운 내용을 확실히 이해하고 있다는 뜻이에요.`,
  }
  if (avgAccuracy >= 65) return {
    label: en ? "Decent understanding 👍" : "어느 정도 이해하고 있어요 👍", color: "text-blue-700", bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: en
      ? `Average ${avgAccuracy}%. Core concepts are there — a bit more practice will make it even better.`
      : `평균 ${avgAccuracy}%예요. 기본 개념은 잡혀 있지만 조금 더 연습하면 더 좋아질 수 있어요.`,
  }
  if (avgAccuracy >= 45) return {
    label: en ? "Finding it a bit difficult 💪" : "조금 어려워하고 있어요 💪", color: "text-amber-700", bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: en
      ? `Average ${avgAccuracy}%. Some concepts are still unclear. Reviewing together will really help.`
      : `평균 ${avgAccuracy}%예요. 배운 내용 중 헷갈리는 부분이 있어요. 함께 복습해 주시면 도움이 돼요.`,
  }
  return {
    label: en ? "Finding it quite hard 🤗" : "많이 어려워하고 있어요 🤗", color: "text-red-700", bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: en
      ? `Average ${avgAccuracy}%. The current content seems quite challenging. Encourage starting with easier problems again.`
      : `평균 ${avgAccuracy}%예요. 지금 배우는 내용이 꽤 어렵게 느껴지는 것 같아요. 쉬운 문제부터 다시 풀어보도록 격려해 주세요.`,
  }
}

// ─── 이번 주 활동일 수 ────────────────────────────────────────────────
function getWeeklyActivityDays(progress: ParentReportData["lesson_progress"], quizzes: ParentReportData["recent_quizzes"]): number {
  const activeDays = new Set<string>()
  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const weekStr = oneWeekAgo.toISOString()
  progress.forEach(p => { if (p.updated_at > weekStr) activeDays.add(p.updated_at.slice(0, 10)) })
  quizzes.forEach(q => { if (q.completed_at > weekStr) activeDays.add(q.completed_at.slice(0, 10)) })
  return activeDays.size
}

function daysSince(dateStr: string): number {
  if (!dateStr) return 999
  try { return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)) } catch { return 999 }
}

// ─── 페이지 ───────────────────────────────────────────────────────────
export default function ParentReportPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">🦒</div>
          <p className="text-gray-500">Loading report...</p>
        </div>
      </div>
    }>
      <ParentReportPage />
    </Suspense>
  )
}

// ─── 최근 완료 레슨 추출 ─────────────────────────────────────────────
function getRecentCompletions(progress: ParentReportData["lesson_progress"], limit = 5) {
  return progress
    .filter(p => p.completed && p.progress_type === "lesson")
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, limit)
}

// ─── 다음 레슨 찾기 ───────────────────────────────────────────────────
function getNextLesson(completedIds: Set<string>, lang: "ko" | "en" = "ko"): { id: string; name: string; course: string } | null {
  const allParts = [
    ...pythonParts.map(p => ({ ...p, course: "Python" })),
    ...cppParts.map(p => ({ ...p, course: "C++" })),
    ...pseudoParts.map(p => ({ ...p, course: "Pseudocode" })),
  ]
  for (const part of allParts) {
    for (const id of part.lessonIds.map(String)) {
      if (!completedIds.has(id)) {
        return { id, name: getLessonName(id, lang), course: part.course }
      }
    }
  }
  return null
}

function ParentReportPage() {
  const searchParams = useSearchParams()
  const { t, lang } = useLanguage()
  const token = searchParams.get("t") || ""
  const [data, setData] = useState<ParentReportData | null>(null)
  const [homework, setHomework] = useState<HomeworkItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!token) { setError(t("유효하지 않은 링크입니다", "Invalid link")); setLoading(false); return }
    async function load() {
      try {
        const supabase = createClient()
        const { data: result, error: rpcError } = await supabase.rpc("get_parent_report", { p_token: token })
        if (rpcError) {
          console.error("get_parent_report error:", rpcError)
          setError(`오류: ${rpcError.message}`); setLoading(false); return
        }
        if (result?.error === "invalid_token") {
          setError(t("유효하지 않은 링크입니다", "Invalid link")); setLoading(false); return
        }
        setData(result as ParentReportData)

        // 과제 제출 내역 조회 (token으로 student_id 매핑)
        if (result?.student_id) {
          const { data: hw } = await supabase
            .from("homework_submissions")
            .select("lesson_id, submitted_at, teacher_grade, teacher_comment, student_code")
            .eq("student_id", result.student_id)
            .order("submitted_at", { ascending: false })
            .limit(10)
          if (hw) setHomework(hw as HomeworkItem[])
        }
      } catch { setError(t("오류가 발생했습니다", "An error occurred")) }
      setLoading(false)
    }
    load()
  }, [token])

  const handleShare = async () => {
    if (!data) return
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: t(`${data.student_name} 학습 리포트`, `${data.student_name} Learning Report`), url }) } catch {}
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-5xl animate-bounce">🦒</div>
        <p className="text-gray-500">{t("리포트를 불러오는 중...", "Loading report...")}</p>
      </div>
    </div>
  )

  if (error || !data) return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-sm">
        <div className="text-5xl">🔒</div>
        <div>
          <p className="text-gray-700 font-bold text-lg">{t("링크를 사용할 수 없어요", "Link unavailable")}</p>
          <p className="text-gray-500 text-sm mt-1">{t("링크가 만료되었거나 유효하지 않습니다", "This link has expired or is invalid")}</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs font-semibold text-orange-700">{t("이렇게 해보세요", "Try this")}</p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>{t("학생에게 새 링크 생성을 요청해주세요", "Ask the student to generate a new link")}</li>
            <li>{t("코드린 앱 → 프로필 → 부모님 리포트 공유", "Coderin app → Profile → Share Parent Report")}</li>
          </ul>
        </div>
      </div>
    </div>
  )

  // ── 데이터 분석 ──────────────────────────────────────────────────────
  const progress = data.lesson_progress || []
  const quizzes  = data.recent_quizzes  || []

  const completedIds   = new Set(progress.filter(p => p.completed).map(p => p.lesson_id))
  const inProgressIds  = new Set(progress.filter(p => !p.completed && p.score > 0).map(p => p.lesson_id))
  const lastActiveDays = daysSince(data.last_active_date)
  const weeklyDays     = getWeeklyActivityDays(progress, quizzes)

  const avgAccuracy = quizzes.length > 0
    ? Math.round(quizzes.reduce((s, q) => s + (q.correct_answers / q.total_questions) * 100, 0) / quizzes.length)
    : null

  const currentPart   = getCurrentPart(completedIds, inProgressIds)
  const capability    = getCapabilityStatement(completedIds, lang)
  const understanding = getUnderstandingInfo(avgAccuracy, lang)
  const track         = getTrack(completedIds, inProgressIds)
  const roadmap       = track === "igcse" ? IGCSE_ROADMAP : track === "cpp" ? CPP_ROADMAP : PYTHON_ROADMAP
  const trackLabel    = track === "igcse" ? "IGCSE" : track === "cpp" ? t("C++ 트랙", "C++ Track") : t("Python 트랙", "Python Track")

  // CodeQuest(cq-*) 완료 문제 수
  const cqCompleted   = [...completedIds].filter(id => id.startsWith("cq-")).length

  // 최근 완료 레슨 (날짜 역순)
  const recentLessons = getRecentCompletions(progress, 5)

  // 다음 레슨
  const nextLesson = getNextLesson(completedIds, lang)

  // 약점 레슨 (복습 완료했는데 점수 낮은 것 = 실제 이해 부족)
  const stuckLessons = progress
    .filter(p => p.progress_type === "review" && p.completed && p.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  // 과제 — 채점 완료 / 미채점 분류
  const gradedHw   = homework.filter(h => h.teacher_grade === "pass" || h.teacher_grade === "auto")
  const failedHw   = homework.filter(h => h.teacher_grade === "fail")
  const pendingHw  = homework.filter(h => h.teacher_grade === null)

  // 한 줄 요약 생성
  function getSummary(): string {
    if (completedIds.size === 0 && inProgressIds.size === 0) return t(`${data!.student_name} 학생이 아직 코드린을 시작하지 않았어요.`, `${data!.student_name} hasn't started Coderin yet.`)
    const weekPart = weeklyDays > 0
      ? t(`이번 주 ${weeklyDays}일 공부했고, `, `Studied ${weeklyDays} days this week, `)
      : lastActiveDays < 999
        ? t(`${lastActiveDays === 0 ? "오늘" : lastActiveDays === 1 ? "어제" : `${lastActiveDays}일 전`} 마지막으로 공부했고, `, `Last studied ${lastActiveDays === 0 ? "today" : lastActiveDays === 1 ? "yesterday" : `${lastActiveDays}d ago`}, `)
        : ""
    const progressPart = currentPart
      ? t(`${currentPart.courseName} ${currentPart.partTitle}을 배우는 중이에요`, `currently studying ${currentPart.courseName} ${currentPart.partTitle}`)
      : t(`총 ${completedIds.size}개 레슨을 완료했어요`, `completed ${completedIds.size} lessons total`)
    const effortPart = data!.daily_streak >= 7
      ? t(" 🔥 연속 학습 대단해요!", " 🔥 Amazing streak!")
      : data!.daily_streak >= 3
        ? t(" 꾸준히 잘 하고 있어요!", " Staying consistent!")
        : lastActiveDays >= 5
          ? t(" 다시 시작하면 좋겠어요.", " Would be great to get back to it.")
          : ""
    return `${weekPart}${progressPart}.${effortPart}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-6">
        <div className="max-w-lg mx-auto flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🦒</span>
              <span className="text-sm font-semibold opacity-80">{t("코드린 학부모 리포트", "Coderin Parent Report")}</span>
            </div>
            <h1 className="text-2xl font-black">{data.student_name}</h1>
            <p className="text-sm opacity-70 mt-0.5">
              {new Date().toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", { year: "numeric", month: "long", day: "numeric" })} {t("기준", "as of")}
            </p>
            {/* 한 줄 서술 요약 */}
            <p className="text-sm font-medium opacity-90 mt-2 leading-relaxed bg-white/15 rounded-xl px-3 py-2">
              {getSummary()}
            </p>
          </div>
          <button onClick={handleShare} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
            {copied ? <><Copy className="w-4 h-4" /> {t("복사됨", "Copied")}</> : <><Share2 className="w-4 h-4" /> {t("공유", "Share")}</>}
          </button>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">

        {/* ① 핵심 3가지 한눈에 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-2xl font-black text-gray-800">
              {lastActiveDays === 0 ? t("오늘", "Today") : lastActiveDays === 1 ? t("어제", "Yesterday") : lastActiveDays < 999 ? t(`${lastActiveDays}일 전`, `${lastActiveDays}d ago`) : "—"}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("마지막 접속", "Last active")}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-2xl font-black text-orange-500">{weeklyDays}{t("일", "d")}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("이번 주 공부", "This week")}</p>
          </div>
          <div className={cn("rounded-2xl border shadow-sm p-3 text-center", understanding.bgColor, understanding.borderColor)}>
            <p className={cn("text-2xl font-black", understanding.color)}>
              {avgAccuracy !== null ? `${avgAccuracy}%` : "—"}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("문제 정확도", "Accuracy")}</p>
          </div>
        </div>

        {/* ② 지금 이 수준이면 뭘 할 수 있어요? — 가장 중요 */}
        {capability ? (
          <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-sm p-4 space-y-3">
            <h2 className="text-sm font-black text-gray-700">💡 {t(`지금 ${data.student_name} 학생은 뭘 할 수 있나요?`, `What can ${data.student_name} do right now?`)}</h2>
            <div className="bg-orange-50 rounded-xl px-3 py-2">
              <p className="text-sm font-black text-orange-700">{capability.title}</p>
            </div>
            <ul className="space-y-2">
              {capability.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-gray-500">{t("아직 학습을 시작하지 않았어요. 첫 레슨을 시작하면 여기에 능력 설명이 나타나요.", "Learning hasn't started yet. Complete the first lesson to see a skill summary here.")}</p>
          </div>
        )}

        {/* ③ 최근 완료한 레슨 + 다음 레슨 */}
        {(recentLessons.length > 0 || nextLesson) && (
          <Section title={t("📖 최근 학습 내역", "📖 Recent Learning")}>
            {recentLessons.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("최근 완료", "Recently completed")}</p>
                {recentLessons.map((p, i) => {
                  const daysAgo = daysSince(p.updated_at)
                  const dateLabel = daysAgo === 0 ? t("오늘", "Today") : daysAgo === 1 ? t("어제", "Yesterday") : t(`${daysAgo}일 전`, `${daysAgo}d ago`)
                  return (
                    <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl px-3 py-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span className="flex-1 text-sm text-gray-700 truncate">{getLessonName(p.lesson_id, lang)}</span>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">{dateLabel}</span>
                    </div>
                  )
                })}
              </div>
            )}
            {nextLesson && (
              <div className="mt-2 space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("다음에 배울 내용", "Up next")}</p>
                <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-3 py-2 border border-orange-100">
                  <span className="text-orange-400 flex-shrink-0">▶</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-semibold truncate">{nextLesson.name}</p>
                    <p className="text-[11px] text-gray-400">{nextLesson.course} {t("커리큘럼", "curriculum")}</p>
                  </div>
                </div>
              </div>
            )}
          </Section>
        )}

        {/* ③-b 직접해보기 과제 피드백 */}
        <Section title={t("📝 직접해보기 과제", "📝 Coding Assignments")}>
          {homework.length === 0 ? (
            <p className="text-sm text-gray-400">{t("아직 제출한 과제가 없어요.", "No assignments submitted yet.")}</p>
          ) : (
            <div className="space-y-3">
              {/* 요약 뱃지 */}
              <div className="flex gap-2 flex-wrap">
                {gradedHw.length > 0 && (
                  <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    ✓ {t(`통과 ${gradedHw.length}개`, `${gradedHw.length} passed`)}
                  </span>
                )}
                {failedHw.length > 0 && (
                  <span className="text-[11px] font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
                    {t(`재도전 ${failedHw.length}개`, `${failedHw.length} retry`)}
                  </span>
                )}
                {pendingHw.length > 0 && (
                  <span className="text-[11px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    {t(`채점 대기 ${pendingHw.length}개`, `${pendingHw.length} pending`)}
                  </span>
                )}
              </div>
              {/* 최근 3개 과제 상세 */}
              <div className="space-y-2">
                {homework.slice(0, 3).map((h, i) => {
                  const gradeInfo =
                    h.teacher_grade === "pass" || h.teacher_grade === "auto"
                      ? { label: t("통과", "Passed"), color: "text-green-600 bg-green-50 border-green-100" }
                      : h.teacher_grade === "fail"
                      ? { label: t("재도전", "Retry"), color: "text-red-600 bg-red-50 border-red-100" }
                      : { label: t("채점 대기", "Pending"), color: "text-gray-500 bg-gray-50 border-gray-100" }
                  return (
                    <div key={i} className={`rounded-xl border px-3 py-2.5 space-y-1 ${gradeInfo.color}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-700 truncate flex-1">
                          {getLessonName(h.lesson_id, lang)}
                        </p>
                        <span className="text-[11px] font-bold flex-shrink-0">{gradeInfo.label}</span>
                      </div>
                      {h.teacher_comment && (
                        <p className="text-xs text-gray-600 leading-relaxed">
                          💬 {h.teacher_comment}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400">
                        {new Date(h.submitted_at).toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", { month: "long", day: "numeric" })} {t("제출", "submitted")}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </Section>

        {/* ③-c 이번 주 얼마나 했나요? (기존 ④, 앞으로 이동) */}
        <Section title={`🗺️ ${trackLabel} ${t("학습 여정", "Learning Journey")}`}>
          <p className="text-xs text-gray-400 -mt-1 mb-3">
            {track === "igcse"
              ? t("코드린은 수도코드 기초부터 IGCSE CS 심화까지 이어지는 전 과정을 다뤄요", "Coderin covers the full IGCSE CS curriculum from pseudocode basics to advanced topics.")
              : track === "cpp"
              ? t("코드린은 Python 입문부터 C++ 알고리즘 대회(USACO/MCC)까지 이어지는 전 과정을 다뤄요", "Coderin covers everything from Python basics to C++ algorithm competitions (USACO/MCC).")
              : t("코드린은 Python 입문부터 알고리즘 대회(USACO/MCC)까지 이어지는 전 과정을 다뤄요", "Coderin covers everything from Python basics to algorithm competitions (USACO/MCC).")}
          </p>
          <div className="space-y-2">
            {roadmap.map((stage, idx) => {
              if (stage.external) {
                // 외부 플랫폼 목표 — 별도 스타일
                const prevStage = roadmap[idx - 1]
                const prevDone = prevStage?.lessonIds.filter(id => completedIds.has(id)).length ?? 0
                const prevTotal = prevStage?.lessonIds.length ?? 1
                const prevComplete = prevDone === prevTotal
                return (
                  <div key={stage.id} className={cn(
                    "rounded-xl p-3 border-2 border-dashed",
                    prevComplete ? "border-yellow-300 bg-yellow-50" : "border-gray-200 bg-gray-50 opacity-50"
                  )}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{stage.emoji}</span>
                      <div>
                        <p className={cn("text-sm font-bold", prevComplete ? "text-yellow-700" : "text-gray-400")}>
                          {stage.label}
                        </p>
                        <p className="text-[11px] text-gray-400">{stage.desc}</p>
                        {cqCompleted > 0 && (
                          <p className="text-[11px] text-blue-600 font-semibold mt-0.5">🏆 CodeQuest {cqCompleted} {t("문제 완료", "solved")}</p>
                        )}
                        {prevComplete && (
                          <p className="text-[11px] text-yellow-600 font-bold mt-0.5">🎉 {t("코드린 수료! 이제 다음 단계에 도전해보세요", "Coderin complete! Ready for the next challenge.")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }

              const done = stage.lessonIds.filter(id => completedIds.has(id)).length
              const total = stage.lessonIds.length
              const pct = Math.round((done / total) * 100)
              const isComplete = done === total
              const isActive = done > 0 && !isComplete
              const isLocked = done === 0 && idx > 0 && (() => {
                const prev = roadmap[idx - 1]
                return !prev.external && prev.lessonIds.filter(id => completedIds.has(id)).length === 0
              })()
              return (
                <div key={stage.id} className={cn(
                  "rounded-xl p-3 border transition-all",
                  isComplete ? "bg-green-50 border-green-200" :
                  isActive ? "bg-white border-orange-200 shadow-sm" :
                  isLocked ? "bg-gray-50 border-gray-100 opacity-40" :
                  "bg-white border-gray-100"
                )}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{isComplete ? "✅" : isLocked ? "🔒" : stage.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cn("text-sm font-bold",
                          isComplete ? "text-green-700" : isLocked ? "text-gray-400" : "text-gray-800"
                        )}>{stage.label}</p>
                        <span className={cn("text-xs font-bold flex-shrink-0",
                          isComplete ? "text-green-600" : isActive ? "text-orange-600" : "text-gray-400"
                        )}>
                          {isLocked ? t("잠김", "Locked") : `${done}/${total}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{stage.desc}</p>
                      {!isLocked && (
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={cn("h-full rounded-full transition-all",
                              isComplete ? "bg-green-500" : "bg-orange-400"
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        {/* ④ 이번 주 공부 습관 */}
        <Section title={t("📅 이번 주 공부 습관", "📅 This Week's Study Habit")}>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {(lang === "en" ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] : ["월","화","수","목","금","토","일"]).map((day, i) => {
                const targetDate = new Date()
                const dayOfWeek = targetDate.getDay()
                const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek)
                const monday = new Date(targetDate)
                monday.setDate(targetDate.getDate() + mondayOffset)
                const checkDate = new Date(monday)
                checkDate.setDate(monday.getDate() + i)
                const checkStr = checkDate.toISOString().slice(0, 10)
                const isActive = progress.some(p => p.updated_at?.slice(0, 10) === checkStr)
                  || quizzes.some(q => q.completed_at?.slice(0, 10) === checkStr)
                const isToday = checkStr === new Date().toISOString().slice(0, 10)
                const isFuture = checkDate > new Date()
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                      isFuture ? "bg-gray-50 text-gray-200" :
                      isActive ? "bg-orange-400 text-white shadow-sm" :
                      "bg-gray-100 text-gray-300"
                    )}>
                      {isActive ? "✓" : ""}
                    </div>
                    <span className={cn("text-[10px]", isToday ? "text-orange-500 font-bold" : "text-gray-400")}>{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex-1">
              <p className="text-xl font-black text-gray-800">{weeklyDays}일</p>
              <p className="text-xs text-gray-500">{t("이번 주 활동", "This week's activity")}</p>
              {data.daily_streak > 0 && (
                <p className="text-xs text-orange-600 font-semibold mt-0.5">🔥 {t(`${data.daily_streak}일 연속 중`, `${data.daily_streak}-day streak`)}</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {weeklyDays >= 5 ? t("매우 꾸준히 하고 있어요! 이 습관을 계속 유지해 주세요 🌟", "Very consistent! Keep up this great habit 🌟") :
             weeklyDays >= 3 ? t("이번 주 잘 하고 있어요. 매일 15분씩 하면 더 효과적이에요!", "Doing well this week. 15 min daily makes it even more effective!") :
             weeklyDays >= 1 ? t("이번 주 시작은 했어요. 조금 더 자주 접속하면 실력이 쑥쑥 늘어요.", "Made a start this week. More frequent sessions lead to faster progress.") :
             t("이번 주 아직 학습 기록이 없어요. 오늘 한 번 접속하도록 격려해 주세요!", "No study record this week. Encourage them to log in today!")}
          </p>
        </Section>

        {/* ⑤ 약점 레슨 */}
        {stuckLessons.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
            <h2 className="text-sm font-black text-amber-800">⚡ {t("이 부분을 좀 더 연습하면 좋아요", "These topics need more practice")}</h2>
            <p className="text-xs text-amber-600">{t("배웠지만 복습 점수가 낮은 단원이에요. 선생님께 질문하거나 다시 풀어보면 도움이 돼요.", "These lessons were studied but scored low on review. Asking the teacher or redoing them will help.")}</p>
            <div className="space-y-2">
              {stuckLessons.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
                  <span className="text-amber-400">⚡</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{getLessonName(p.lesson_id, lang)}</p>
                    <p className="text-xs text-gray-400">{t("복습 점수", "Review score")} {p.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⑥ 부모가 할 수 있는 것 */}
        <Section title={t("🤝 부모님이 도와주실 수 있어요", "🤝 How Parents Can Help")}>
          <ul className="space-y-2 text-sm text-gray-600">
            {lastActiveDays >= 3 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{t(`"${data.student_name}아, 오늘 코드린 한 번 켜볼까?"라고 가볍게 말해주세요`, `Try casually saying "Want to do a quick Coderin session today?" to ${data.student_name}.`)}</li>}
            {avgAccuracy !== null && avgAccuracy < 60 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{t("틀린 문제를 보고 \"이게 왜 틀렸는지 설명해줄 수 있어?\"라고 물어보세요. 설명하면서 이해도가 올라가요", "Look at wrong answers together and ask \"Can you explain why this was wrong?\" Explaining boosts understanding.")}</li>}
            {weeklyDays < 3 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{t("정해진 시간(저녁 식사 후 20분 등)에 함께 앉아 시작하는 루틴을 만들어 보세요", "Try creating a fixed routine — e.g., 20 min after dinner — to build a habit together.")}</li>}
            <li className="flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>{t("칭찬은 구체적으로: \"레슨 완료했네, 잘했다!\" 보다 \"for 반복문 배웠구나, 실생활에서 어디 쓰일 것 같아?\"", "Be specific with praise: instead of \"Good job finishing the lesson!\", try \"You learned for-loops — where do you think that's used in real life?\"")}</li>
            <li className="flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>{t("코딩은 느리게 배우는 것이 정상이에요. 꾸준함이 실력보다 중요해요", "It's normal to learn coding slowly. Consistency matters more than raw ability.")}</li>
          </ul>
        </Section>

        {/* 푸터 */}
        <div className="text-center py-6 space-y-2">
          <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-200 bg-white text-orange-600 text-sm font-semibold hover:bg-orange-50 transition-colors shadow-sm">
            {copied ? <><Copy className="w-4 h-4" /> {t("링크 복사됨!", "Link copied!")}</> : <><Share2 className="w-4 h-4" /> {t("이 리포트 공유하기", "Share this report")}</>}
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <span className="text-xl">🦒</span>
            <span className="font-black text-gray-300 text-sm">Coderin</span>
          </div>
          <p className="text-xs text-gray-300">{t("중학생·고등학생을 위한 Python · C++ 코딩 학습 서비스", "Coding learning for middle & high school students — Python · C++")}</p>
          <p className="text-xs text-gray-300">{t("이 리포트는 선생님이 공유한 링크입니다", "This report was shared via a teacher-generated link")}</p>
        </div>
      </main>
    </div>
  )
}


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
      <h2 className="text-sm font-black text-gray-700">{title}</h2>
      {children}
    </div>
  )
}
