"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"
import { Share2, Copy } from "lucide-react"

interface ParentReportData {
  student_name: string
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

// ─── 커리큘럼 능력 서술 ────────────────────────────────────────────────
const PYTHON_PART_IDS = pythonParts.flatMap(p => p.lessonIds.map(String))
const CPP_PART_IDS   = cppParts.flatMap(p => p.lessonIds.map(String))

function getCapabilityStatement(completedIds: Set<string>): { title: string; bullets: string[] } | null {
  const pyDone  = PYTHON_PART_IDS.filter(id => completedIds.has(id)).length
  const cppDone = CPP_PART_IDS.filter(id => completedIds.has(id)).length

  // C++ 수준 먼저 (더 높은 수준이면 우선)
  if (cppDone >= 20) return {
    title: "C++ USACO 준비 수준",
    bullets: ["알고리즘 대회(정보올림피아드, USACO)를 준비할 수 있는 수준이에요", "정렬·자료구조·그리디 알고리즘을 C++로 구현할 수 있어요", "대학 컴퓨터공학 입문 과정을 충분히 소화할 수 있어요"],
  }
  if (cppDone >= 14) return {
    title: "C++ 중급 수준",
    bullets: ["C++로 클래스, 재귀, 참조 등 심화 개념을 다룰 수 있어요", "알고리즘 대회 기초 문제를 풀 수 있는 수준이에요"],
  }
  if (cppDone >= 8) return {
    title: "C++ 기초 완성",
    bullets: ["C++의 기본 문법(변수·반복문·함수)을 알고 있어요", "Python에서 C++로 넘어오는 단계를 잘 밟고 있어요"],
  }
  if (pyDone >= 45) return {
    title: "Python 고급 수준",
    bullets: ["모듈·파일·클래스를 활용해 실용적인 프로그램을 만들 수 있어요", "Python으로 작은 앱이나 게임을 혼자 만들 수 있는 수준이에요"],
  }
  if (pyDone >= 30) return {
    title: "Python 함수·클래스 학습 중",
    bullets: ["함수를 직접 만들고 재사용하는 코드를 작성할 수 있어요", "자료구조(리스트·딕셔너리)를 자유롭게 다룰 수 있어요"],
  }
  if (pyDone >= 20) return {
    title: "Python 자료구조 학습 중",
    bullets: ["리스트·딕셔너리·튜플 등 데이터를 묶어서 다룰 수 있어요", "반복문과 조건문으로 간단한 게임 로직을 짤 수 있어요"],
  }
  if (pyDone >= 10) return {
    title: "Python 조건문·반복문 학습 중",
    bullets: ["if/else로 조건에 따라 다르게 동작하는 코드를 만들 수 있어요", "for·while 반복문으로 반복 작업을 자동화할 수 있어요"],
  }
  if (pyDone >= 5) return {
    title: "Python 첫걸음 단계",
    bullets: ["변수, 숫자, 문자열 등 기본 개념을 배우고 있어요", "간단한 계산기나 출력 프로그램을 만들 수 있어요"],
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
function getUnderstandingInfo(avgAccuracy: number | null): {
  label: string; color: string; bgColor: string; borderColor: string; description: string
} {
  if (avgAccuracy === null) return {
    label: "퀴즈 기록 없음", color: "text-gray-500", bgColor: "bg-gray-50",
    borderColor: "border-gray-200", description: "아직 퀴즈를 풀지 않았어요.",
  }
  if (avgAccuracy >= 85) return {
    label: "매우 잘 이해하고 있어요 🌟", color: "text-green-700", bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: `평균 ${avgAccuracy}%로 문제를 잘 풀고 있어요. 배운 내용을 확실히 이해하고 있다는 뜻이에요.`,
  }
  if (avgAccuracy >= 65) return {
    label: "어느 정도 이해하고 있어요 👍", color: "text-blue-700", bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: `평균 ${avgAccuracy}%예요. 기본 개념은 잡혀 있지만 조금 더 연습하면 더 좋아질 수 있어요.`,
  }
  if (avgAccuracy >= 45) return {
    label: "조금 어려워하고 있어요 💪", color: "text-amber-700", bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: `평균 ${avgAccuracy}%예요. 배운 내용 중 헷갈리는 부분이 있어요. 함께 복습해 주시면 도움이 돼요.`,
  }
  return {
    label: "많이 어려워하고 있어요 🤗", color: "text-red-700", bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: `평균 ${avgAccuracy}%예요. 지금 배우는 내용이 꽤 어렵게 느껴지는 것 같아요. 쉬운 문제부터 다시 풀어보도록 격려해 주세요.`,
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
          <p className="text-gray-500">리포트를 불러오는 중...</p>
        </div>
      </div>
    }>
      <ParentReportPage />
    </Suspense>
  )
}

function ParentReportPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("t") || ""
  const [data, setData] = useState<ParentReportData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!token) { setError("유효하지 않은 링크입니다"); setLoading(false); return }
    async function load() {
      try {
        const supabase = createClient()
        const { data: result, error: rpcError } = await supabase.rpc("get_parent_report", { p_token: token })
        if (rpcError || result?.error === "invalid_token") {
          setError("유효하지 않은 링크입니다"); setLoading(false); return
        }
        setData(result as ParentReportData)
      } catch { setError("오류가 발생했습니다") }
      setLoading(false)
    }
    load()
  }, [token])

  const handleShare = async () => {
    if (!data) return
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: `${data.student_name} 학습 리포트`, url }) } catch {}
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-5xl animate-bounce">🦒</div>
        <p className="text-gray-500">리포트를 불러오는 중...</p>
      </div>
    </div>
  )

  if (error || !data) return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-5xl">🔒</div>
        <p className="text-gray-600 font-bold">{error || "리포트를 찾을 수 없습니다"}</p>
        <p className="text-sm text-gray-400">선생님에게 새 링크를 요청해주세요</p>
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
  const capability    = getCapabilityStatement(completedIds)
  const understanding = getUnderstandingInfo(avgAccuracy)

  // 최근 막힌 레슨 (진행 중 & 미완료)
  const stuckLessons = progress
    .filter(p => !p.completed && p.score > 0)
    .sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
    .slice(0, 3)

  // 한 줄 요약 생성
  function getSummary(): string {
    if (completedIds.size === 0 && inProgressIds.size === 0) return `${data!.student_name} 학생이 아직 코드린을 시작하지 않았어요.`
    const weekPart = weeklyDays > 0 ? `이번 주 ${weeklyDays}일 공부했고, ` : lastActiveDays < 999 ? `${lastActiveDays === 0 ? "오늘" : lastActiveDays === 1 ? "어제" : `${lastActiveDays}일 전`} 마지막으로 공부했고, ` : ""
    const progressPart = currentPart
      ? `${currentPart.courseName} ${currentPart.partTitle}을 배우는 중이에요`
      : `총 ${completedIds.size}개 레슨을 완료했어요`
    const effortPart = data!.daily_streak >= 7 ? " 🔥 연속 학습 대단해요!" : data!.daily_streak >= 3 ? " 꾸준히 잘 하고 있어요!" : lastActiveDays >= 5 ? " 다시 시작하면 좋겠어요." : ""
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
              <span className="text-sm font-semibold opacity-80">코드린 학부모 리포트</span>
            </div>
            <h1 className="text-2xl font-black">{data.student_name}</h1>
            <p className="text-sm opacity-70 mt-0.5">
              {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 기준
            </p>
          </div>
          <button onClick={handleShare} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
            {copied ? <><Copy className="w-4 h-4" /> 복사됨</> : <><Share2 className="w-4 h-4" /> 공유</>}
          </button>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">

        {/* ① 한 줄 요약 (가장 중요) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-base font-bold text-gray-800 leading-relaxed">{getSummary()}</p>
        </div>

        {/* ② 지금 어디까지 왔나요? */}
        {currentPart ? (
          <Section title="📍 지금 어디까지 왔나요?">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded-full",
                  currentPart.courseName === "Python" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                )}>
                  {currentPart.courseName}
                </span>
                <span className="text-sm font-bold text-gray-700">{currentPart.partTitle}</span>
              </div>

              {/* 파트 내 진행도 */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>이 단원에서 완료한 레슨</span>
                  <span className="font-bold">{currentPart.doneInPart} / {currentPart.totalInPart}개</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", currentPart.courseName === "Python" ? "bg-green-500" : "bg-blue-500")}
                    style={{ width: `${(currentPart.doneInPart / currentPart.totalInPart) * 100}%` }}
                  />
                </div>
              </div>

              {/* 전체 진행도 */}
              <div className="text-sm text-gray-500">
                전체 완료: <strong className="text-gray-700">{completedIds.size}개</strong> 레슨
                {inProgressIds.size > 0 && <span className="ml-2 text-amber-600">({inProgressIds.size}개 진행 중)</span>}
              </div>
            </div>
          </Section>
        ) : completedIds.size > 0 ? (
          <Section title="📍 학습 현황">
            <p className="text-sm text-gray-600">총 <strong>{completedIds.size}개</strong> 레슨을 완료했어요. 모든 과정을 마쳤거나 새 단원을 시작하기 전이에요.</p>
          </Section>
        ) : null}

        {/* ③ 이 수준이면 뭘 할 수 있나요? */}
        {capability && (
          <Section title="💡 지금 이 수준이면 뭘 할 수 있나요?">
            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">{capability.title}</p>
              <ul className="space-y-1.5">
                {capability.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* ④ 이해도: 쉽게 풀었나요 어렵게 풀었나요? */}
        <div className={cn("rounded-2xl border p-4 space-y-2", understanding.bgColor, understanding.borderColor)}>
          <h2 className="text-sm font-black text-gray-700">🧠 문제를 얼마나 잘 풀고 있나요?</h2>
          <p className={cn("text-base font-bold", understanding.color)}>{understanding.label}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{understanding.description}</p>
          {quizzes.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {quizzes.slice(0, 7).map((q, i) => {
                const acc = Math.round((q.correct_answers / q.total_questions) * 100)
                return (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div className="w-7 h-16 bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-end">
                      <div
                        className={cn("rounded-lg", acc >= 80 ? "bg-green-500" : acc >= 60 ? "bg-blue-400" : acc >= 45 ? "bg-amber-400" : "bg-red-400")}
                        style={{ height: `${acc}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-400">{acc}%</span>
                  </div>
                )
              })}
              <div className="flex items-end pb-4 ml-1">
                <span className="text-[10px] text-gray-400">← 최근 퀴즈</span>
              </div>
            </div>
          )}
        </div>

        {/* ⑤ 이번 주 얼마나 했나요? */}
        <Section title="📅 이번 주 얼마나 공부했나요?">
          <div className="flex items-center gap-4">
            {/* 요일 칸 */}
            <div className="flex gap-1.5">
              {["월","화","수","목","금","토","일"].map((day, i) => {
                // 이번 주 각 요일에 활동했는지 확인
                const targetDate = new Date()
                const dayOfWeek = targetDate.getDay() // 0=일
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
                      {isActive ? "✓" : isFuture ? "" : ""}
                    </div>
                    <span className={cn("text-[10px]", isToday ? "text-orange-500 font-bold" : "text-gray-400")}>{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex-1">
              <p className="text-xl font-black text-gray-800">{weeklyDays}일</p>
              <p className="text-xs text-gray-500">이번 주 활동</p>
              {data.daily_streak > 0 && (
                <p className="text-xs text-orange-600 font-semibold mt-0.5">🔥 {data.daily_streak}일 연속 중</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {weeklyDays >= 5 ? "매우 꾸준히 하고 있어요! 이 습관을 계속 유지해 주세요 🌟" :
             weeklyDays >= 3 ? "이번 주 잘 하고 있어요. 매일 15분씩 하면 더 효과적이에요!" :
             weeklyDays >= 1 ? "이번 주 시작은 했어요. 조금 더 자주 접속하면 실력이 쑥쑥 늘어요." :
             "이번 주 아직 학습 기록이 없어요. 오늘 한 번 접속하도록 격려해 주세요!"}
          </p>
        </Section>

        {/* ⑥ 어디서 막혀 있나요? (있을 경우만) */}
        {stuckLessons.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
            <h2 className="text-sm font-black text-amber-800">⚡ 지금 이 부분이 어려운 것 같아요</h2>
            <p className="text-xs text-amber-600">시작했지만 아직 완료하지 못한 레슨이에요. 막히는 부분이 있으면 선생님께 질문하도록 격려해 주세요.</p>
            <div className="space-y-2">
              {stuckLessons.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
                  <span className="text-amber-400">⚡</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{getLessonDisplayName(p.lesson_id)}</p>
                    <p className="text-xs text-gray-400">{p.score > 0 ? `${p.score}% 진행 중` : "시작함"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⑦ 부모가 할 수 있는 것 */}
        <Section title="🤝 부모님이 도와주실 수 있어요">
          <ul className="space-y-2 text-sm text-gray-600">
            {lastActiveDays >= 3 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>"{data.student_name}아, 오늘 코드린 한 번 켜볼까?"라고 가볍게 말해주세요</li>}
            {avgAccuracy !== null && avgAccuracy < 60 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>틀린 문제를 보고 "이게 왜 틀렸는지 설명해줄 수 있어?"라고 물어보세요. 설명하면서 이해도가 올라가요</li>}
            {weeklyDays < 3 && <li className="flex gap-2"><span className="text-orange-500 flex-shrink-0">•</span>정해진 시간(저녁 식사 후 20분 등)에 함께 앉아 시작하는 루틴을 만들어 보세요</li>}
            <li className="flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>칭찬은 구체적으로: "레슨 완료했네, 잘했다!" 보다 "for 반복문 배웠구나, 실생활에서 어디 쓰일 것 같아?"</li>
            <li className="flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>코딩은 느리게 배우는 것이 정상이에요. 꾸준함이 실력보다 중요해요</li>
          </ul>
        </Section>

        {/* 푸터 */}
        <div className="text-center py-6 space-y-2">
          <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-200 bg-white text-orange-600 text-sm font-semibold hover:bg-orange-50 transition-colors shadow-sm">
            {copied ? <><Copy className="w-4 h-4" /> 링크 복사됨!</> : <><Share2 className="w-4 h-4" /> 이 리포트 공유하기</>}
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <span className="text-xl">🦒</span>
            <span className="font-black text-gray-300 text-sm">Coderin</span>
          </div>
          <p className="text-xs text-gray-300">중학생·고등학생을 위한 Python · C++ 코딩 학습 서비스</p>
          <p className="text-xs text-gray-300">이 리포트는 선생님이 공유한 링크입니다</p>
        </div>
      </main>
    </div>
  )
}

// 레슨 ID → 사람이 읽기 쉬운 이름
function getLessonDisplayName(lessonId: string): string {
  const allParts = [...pythonParts, ...cppParts, ...pseudoParts]
  for (const part of allParts) {
    if (part.lessonIds.map(String).includes(lessonId)) {
      const idx = part.lessonIds.map(String).indexOf(lessonId)
      return `${part.title} — ${idx + 1}번째 레슨`
    }
  }
  return lessonId
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
      <h2 className="text-sm font-black text-gray-700">{title}</h2>
      {children}
    </div>
  )
}
