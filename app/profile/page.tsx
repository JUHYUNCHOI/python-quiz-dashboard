"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { LogOut, LogIn } from "lucide-react"
import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { OWNER_EMAIL } from "@/components/owner-only-guard"
import { createClient } from "@/lib/supabase/client"
import { getQuizScores, getWrongBank } from "@/lib/mark-lesson-complete"
import { getLessonName } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"
import { tierInfo, tierLabel, type TierId } from "@/lib/tier-system"
import { loadTierState, syncTierFromServer } from "@/lib/tier-store"

// 선생님 모드 토글 — localStorage `teacher-as-student` 플래그 제어
// "true" = 학생 뷰 강제, "false" = 선생님 뷰 강제, 없음 = default
function TeacherModeToggle({ t }: { t: (kr: string, en: string) => string }) {
  const [asStudent, setAsStudent] = useState<boolean | null>(null)
  useEffect(() => {
    const flag = localStorage.getItem("teacher-as-student")
    // default: owner (julia) 는 학생 뷰, 일반 teacher 는 선생님 뷰
    // null 일 때 어느 default 인지 알 수 없으니 일단 "true" (학생 뷰) 가 default 라고 표시
    setAsStudent(flag === "true" || flag === null)
  }, [])
  if (asStudent === null) return null
  const toggle = () => {
    const next = !asStudent
    localStorage.setItem("teacher-as-student", next ? "true" : "false")
    setAsStudent(next)
    // 헤더 / 다른 컴포넌트 다시 읽도록 페이지 reload
    window.location.reload()
  }
  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      <button
        onClick={toggle}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-colors",
          asStudent
            ? "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
            : "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
        )}
        title={t("선생님 모드 전환", "Toggle teacher mode")}
      >
        <span>{asStudent ? "🎒" : "👨‍🏫"}</span>
        <span>{asStudent ? t("학생 뷰 (클릭 → 선생님)", "Student view (click → teacher)") : t("선생님 뷰 (클릭 → 학생)", "Teacher view (click → student)")}</span>
      </button>
    </div>
  )
}

/* ── 화면 언어 ──────────────────────────────────────────────────────────────
 *
 * 이 화면은 "성적표" 다. 대시보드 템플릿처럼 색 타일을 깔면 7가지 색이 동시에
 * 소리를 질러서 **무엇이 중요한지가 사라진다**. 그래서 여기서는
 *
 *   - 상자(Card)를 겹치지 않는다. 구역은 작은 라벨 + 실선 한 줄로 나눈다.
 *   - 색은 두 가지만 쓴다: 먹색(stone) = 내용, 주황 = 누를 수 있는 것.
 *     예외는 **티어 색** 하나 — 실버/골드/플래티넘은 색 자체가 정보다.
 *   - 위계는 색이 아니라 **활자 크기**로 만든다. 숫자는 크고, 라벨은 작다.
 */

/** 구역 머리말. 테두리 상자 대신 라벨 + 밑줄 한 줄. */
function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-stone-900/10 pb-2">
      <h3 className="text-[11px] font-semibold tracking-[0.12em] text-stone-500">{children}</h3>
      {right && <span className="shrink-0 text-[11px] tabular-nums text-stone-400">{right}</span>}
    </div>
  )
}

/**
 * 한 줄에 선 값들의 공통 높이.
 *
 * 티어 이름은 길이에 따라 글자 크기가 줄어든다(아래 `TierTile`). 그래도 그 아래
 * 라벨("티어" / "총 XP" / "연속 학습")은 한 줄로 서야 하므로 값 칸의 높이를
 * 고정하고 **바닥을 맞춘다**. 안 그러면 그랜드마스터인 학생만 라벨 줄이 혼자 뜬다.
 */
const VALUE_ROW = "flex h-[26px] items-end"

/** 숫자 하나. 값은 크게, 라벨은 작게 — 상자도 아이콘도 없다. */
function Stat({ value, label, color }: { value: React.ReactNode; label: string; color?: string }) {
  return (
    <div className="min-w-0">
      <div className={VALUE_ROW}>
        <div
          className="text-[26px] font-semibold leading-none tracking-tight tabular-nums text-stone-900"
          style={color ? { color } : undefined}
        >
          {value}
        </div>
      </div>
      <div className="mt-2 break-keep text-[11px] leading-tight text-stone-500">{label}</div>
    </div>
  )
}

/**
 * 칸(모바일 기준 ~100px)에 한 줄로 들어가는 글자 크기.
 *
 * 글자 '수'로 정하면 "Gold I"(6자) 와 "그랜드마스터"(6자) 가 같은 26px 가 되는데,
 * 한글은 글자당 폭이 두 배라 "그랜드마 / 스터" 로 쪼개진다. 그래서 **한글을 2칸으로
 * 세어** 실제 폭으로 정한다. 잘라내면(truncate) 티어를 못 읽으므로 자르지 않는다.
 */
function fitSize(label: string): number {
  const w = [...label].reduce((n, c) => n + (/[\u3000-\u303f\uac00-\ud7af\u4e00-\u9fff]/.test(c) ? 2 : 1), 0)
  return w <= 7 ? 26 : w <= 9 ? 20 : w <= 11 ? 16 : 15
}

/**
 * 통계 줄의 첫 칸 — 예전 `Lv.3` 자리.
 *
 * 숫자 레벨 대신 티어 하나만 보여준다. 배치고사를 안 본 학생에게는 빈칸이나
 * `Lv.0` 대신 **언랭(Unranked)** 을 띄우고, 누르면 배치고사로 보낸다 —
 * 빈칸은 "아직 안 한 일" 이라는 신호를 못 준다.
 */
function TierTile({ t, lang }: { t: (kr: string, en: string) => string; lang: string }) {
  const [tier, setTier] = useState<TierId | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTier(loadTierState()?.tier ?? null)
    setLoaded(true)
    let alive = true
    syncTierFromServer().then(m => {
      if (alive) setTier(m.state?.tier ?? null)
    })
    return () => { alive = false }
  }, [])

  // 로딩 중에 "언랭" 을 먼저 그리면 이미 배치고사를 본 학생에게 한 번 번쩍인다.
  if (!loaded) return <div className="h-[47px]" />

  if (!tier) {
    const unranked = t("언랭", "Unranked")
    return (
      <Link href="/tier/placement" className="group block min-w-0">
        <div className={VALUE_ROW}>
          <div
            className="whitespace-nowrap font-semibold leading-none tracking-tight text-stone-400"
            style={{ fontSize: fitSize(unranked) }}
          >
            {unranked}
          </div>
        </div>
        <div className="mt-2 break-keep text-[11px] leading-tight text-orange-600 underline decoration-orange-300 underline-offset-2 group-hover:decoration-orange-600">
          {t("배치고사 보기", "Take placement")}
        </div>
      </Link>
    )
  }

  const info = tierInfo(tier)
  const label = tierLabel(tier, lang)
  return (
    <Link href="/tier" className="group block min-w-0">
      <div className={VALUE_ROW}>
        <div
          className="whitespace-nowrap font-semibold leading-none tracking-tight"
          style={{ color: info.color, fontSize: fitSize(label) }}
        >
          {label}
        </div>
      </div>
      <div className="mt-2 text-[11px] leading-tight text-stone-500 group-hover:text-orange-600">
        {t("티어", "Tier")}
      </div>
    </Link>
  )
}

export default function ProfilePage() {
  const { user, profile, isAuthenticated, isLoading, refreshProfile } = useAuth()
  // level / xpInCurrentLevel 은 일부러 꺼내지 않는다 — 학생 화면에서 숫자 레벨을
  // 없애고 티어 하나만 보여주기로 했다(`lib/tier-system.ts` 참고). 적립·계산은
  // 그대로 돌아가고 표시만 빠진다.
  const { totalXp, dailyStreak, isStreakAtRisk } = useGamification()
  const { t, lang } = useLanguage()
  const isEn = lang === "en"
  const sz = (kr: string, en: string) => isEn ? en : kr
  // undefined = 로딩, null = 반 없음
  const [myClass, setMyClass] = useState<{ id: string; name: string } | null | undefined>(undefined)
  const [leavingClass, setLeavingClass] = useState(false)

  // 학습 요약 통계 (localStorage 기반)
  const [studySummary, setStudySummary] = useState<{
    completedLessons: number
    completedQuizzes: number
    avgQuizScore: number | null
    practiceSolved: number
    bankRemaining: number
    bankMastered: number
  }>({ completedLessons: 0, completedQuizzes: 0, avgQuizScore: null, practiceSolved: 0, bankRemaining: 0, bankMastered: 0 })

  // 최근 복습 내역 (Supabase lesson_progress.score)
  const [recentReviews, setRecentReviews] = useState<Array<{
    lesson_id: string
    score: number
    updated_at: string
  }>>([])
  const [recentReviewsLoading, setRecentReviewsLoading] = useState(true)

  useEffect(() => {
    try {
      const lessonsRaw = localStorage.getItem("completedLessons")
      const lessons: (string | number)[] = lessonsRaw ? JSON.parse(lessonsRaw) : []
      const quizzesRaw = localStorage.getItem("completedQuizzes")
      const quizzes: (string | number)[] = quizzesRaw ? JSON.parse(quizzesRaw) : []
      const scores = getQuizScores()
      const scoreValues = Object.values(scores).filter(s => typeof s === "number")
      const avg = scoreValues.length > 0 ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) : null
      const solvedRaw = localStorage.getItem("practice-solved")
      const solved: string[] = solvedRaw ? JSON.parse(solvedRaw) : []
      const bank = getWrongBank()
      setStudySummary({
        completedLessons: lessons.length,
        completedQuizzes: quizzes.length,
        avgQuizScore: avg,
        practiceSolved: solved.length,
        bankRemaining: bank.filter(e => !e.mastered).length,
        bankMastered: bank.filter(e => e.mastered).length,
      })
    } catch {}
  }, [user])

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from("class_members")
      .select("class_id, classes(id, name)")
      .eq("student_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        const cls = data?.classes
        if (cls && !Array.isArray(cls)) {
          const c = cls as { id: string; name: string }
          setMyClass({ id: c.id, name: c.name })
        } else {
          setMyClass(null)
        }
      })
    // 최근 복습 내역 (lesson_progress.score) — 차트용 더 많이 (15 개), list 는 5 개만 표시
    setRecentReviewsLoading(true)
    supabase
      .from("lesson_progress")
      .select("lesson_id, score, updated_at")
      .eq("user_id", user.id)
      .eq("progress_type", "quiz")
      .eq("completed", true)
      .gt("score", 0)
      .order("updated_at", { ascending: false })
      .limit(15)
      .then(({ data }) => {
        if (data) setRecentReviews(data)
        setRecentReviewsLoading(false)
      })
  }, [user])

  const handleLeaveClass = async () => {
    if (!user || !myClass) return
    if (!window.confirm(t(`'${myClass.name}' 반을 탈퇴할까요?`, `Leave class '${myClass.name}'?`))) return
    setLeavingClass(true)
    const supabase = createClient()
    await supabase.from("class_members").delete().eq("student_id", user.id).eq("class_id", myClass.id)
    setMyClass(null)
    setLeavingClass(false)
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-[60px] animate-bounce">🦒</div>
        </div>
        <BottomNav />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto w-full max-w-[560px] px-5 pb-24 pt-8 sm:px-6">
          {/* 게스트 통계 (localStorage 기반) */}
          {totalXp > 0 && (
            <section className="mb-10">
              <SectionLabel>{t("내 학습 기록", "My Progress")}</SectionLabel>
              <div className="grid grid-cols-3 gap-4 pt-5">
                <TierTile t={t} lang={lang} />
                <Stat value={totalXp.toLocaleString()} label={t("총 XP", "Total XP")} />
                <Stat value={t(`${dailyStreak}일`, `${dailyStreak}d`)} label={t("연속 학습", "Streak")} />
              </div>
            </section>
          )}

          {/* 로그인 안내 — 이 화면에서 할 수 있는 단 하나의 행동이라 가장 크게 둔다. */}
          <section className="mb-10">
            <h2 className="break-keep text-[22px] font-semibold leading-snug tracking-tight text-stone-900">
              {t("로그인하면 기록이 동기화돼요", "Log in to sync your progress")}
            </h2>
            <p className="mt-2 break-keep text-sm leading-relaxed text-stone-500">
              {t("다른 기기에서도 이어하고, 선생님 반에 참가할 수 있어요.", "Continue on another device and join your teacher's class.")}
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex items-center gap-2 border-b-2 border-orange-500 pb-1 text-sm font-semibold text-orange-600 hover:border-orange-700 hover:text-orange-700"
            >
              <LogIn className="h-4 w-4" />
              {t("로그인하기", "Log in")}
            </Link>
          </section>

          {/* 언어 설정 */}
          <section>
            <SectionLabel>{t("설정", "Settings")}</SectionLabel>
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-stone-600">{t("언어", "Language")}</span>
              <LanguageToggle className="bg-white" />
            </div>
          </section>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto w-full max-w-[680px] px-5 pb-24 pt-8 sm:px-6">
        {/* ── 신원 ── 이름이 이 화면의 제목이다. 아바타는 제목 옆 작은 표식. */}
        <header className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={t("프로필", "Profile")}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stone-900/5 text-2xl">
              🦒
            </div>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-[26px] font-semibold leading-tight tracking-tight text-stone-900">
              {profile?.display_name || t("학습자", "Learner")}
            </h1>
            <p className="mt-0.5 truncate text-[13px] text-stone-500">{user?.email || ""}</p>
          </div>
        </header>
        {/* 선생님 모드 토글 — DB role=teacher, 또는 owner(email). profile 조회가
            느려도(timeout) owner 는 유지 (선생님 2026-07-17). */}
        {(profile?.role === "teacher" || user?.email === OWNER_EMAIL) && (
          <TeacherModeToggle t={t} />
        )}

        {/* 🔥 Streak 끊김 — 상자를 치지 않는다. 왼쪽 굵은 선 하나로 충분하다. */}
        {isStreakAtRisk && dailyStreak > 0 && (
          <div className="mt-6 border-l-2 border-orange-500 pl-4">
            <p className={cn("font-semibold text-stone-900", sz("text-sm", "text-sm"))}>
              {t(`${dailyStreak}일 연속 학습 — 어제 끊겼어요`, `${dailyStreak}-day streak — broken yesterday`)}
            </p>
            <p className={cn("mt-1 break-keep leading-relaxed text-stone-500", sz("text-xs", "text-xs"))}>
              {t("오늘 한 강만 들어도 다시 1일 시작 — 천천히 다시 쌓아봐요.", "1 lesson today restarts your streak — take it slow.")}
            </p>
          </div>
        )}

        {/* ── 현황 ── */}
        <section className="mt-10">
          <SectionLabel>{t("현황", "Standing")}</SectionLabel>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <TierTile t={t} lang={lang} />
            <Stat value={totalXp.toLocaleString()} label={t("총 XP", "Total XP")} />
            <Stat value={t(`${dailyStreak}일`, `${dailyStreak}d`)} label={t("연속 학습", "Streak")} />
          </div>
        </section>

        {/* ── 학습 요약 ── */}
        <section className="mt-10">
          <SectionLabel>{t("학습 요약", "Learning Summary")}</SectionLabel>
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 pt-5 sm:grid-cols-4">
            <Stat value={studySummary.completedLessons} label={t("수업 완료", "Lessons done")} />
            <Stat
              value={
                studySummary.avgQuizScore !== null
                  ? <>{studySummary.avgQuizScore}<span className="text-base font-medium text-stone-400">{t("점", "pt")}</span></>
                  : <span className="text-stone-300">—</span>
              }
              label={t(`복습 평균 · ${studySummary.completedQuizzes}개`, `Quiz avg · ${studySummary.completedQuizzes}`)}
            />
            <Stat value={studySummary.practiceSolved} label={t("도전 푼 수", "Challenges solved")} />
            <Link href="/missed" className="group min-w-0">
              <div className="text-[26px] font-semibold leading-none tracking-tight tabular-nums text-stone-900">
                {studySummary.bankRemaining}
                {studySummary.bankMastered > 0 && (
                  <span className="ml-1.5 text-base font-medium text-stone-400">
                    +{studySummary.bankMastered}
                  </span>
                )}
              </div>
              <div className="mt-2 break-keep text-[11px] leading-tight text-orange-600 underline decoration-orange-300 underline-offset-2 group-hover:decoration-orange-600">
                {t("문제 창고 · 남은+마스터", "Bank · left + mastered")}
              </div>
            </Link>
          </div>
        </section>

        {/* 🏆 뱃지 — 달성한 마일스톤 */}
        {(() => {
          const badges = [
            { id: "first-lesson", emoji: "🎯", title: t("첫 수업 완료", "First lesson"), unlocked: studySummary.completedLessons >= 1 },
            { id: "ten-lessons", emoji: "📚", title: t("10 수업 완료", "10 lessons"), unlocked: studySummary.completedLessons >= 10 },
            { id: "thirty-lessons", emoji: "🏆", title: t("30 수업 완료", "30 lessons"), unlocked: studySummary.completedLessons >= 30 },
            { id: "first-perfect", emoji: "🌟", title: t("첫 100점", "First 100"), unlocked: studySummary.avgQuizScore === 100 || (studySummary.completedQuizzes > 0 && studySummary.avgQuizScore !== null && studySummary.avgQuizScore >= 100) },
            { id: "first-master", emoji: "✨", title: t("첫 마스터", "First master"), unlocked: studySummary.bankMastered >= 1 },
            { id: "ten-masters", emoji: "👑", title: t("10 마스터", "10 masters"), unlocked: studySummary.bankMastered >= 10 },
            { id: "streak-7", emoji: "🔥", title: t("7일 연속", "7-day streak"), unlocked: dailyStreak >= 7 },
            { id: "streak-30", emoji: "🌋", title: t("30일 연속", "30-day streak"), unlocked: dailyStreak >= 30 },
          ]
          const unlocked = badges.filter(b => b.unlocked)
          return (
            <section className="mt-10">
              <SectionLabel right={`${unlocked.length} / ${badges.length}`}>
                {t("뱃지", "Badges")}
              </SectionLabel>
              {/* 못 받은 뱃지를 점선 상자로 깔면 화면의 절반이 "없음" 이 된다.
                  받은 것만 적고, 남은 개수는 위에 숫자로 이미 있다. */}
              {unlocked.length === 0 ? (
                <p className="break-keep pt-4 text-sm text-stone-400">
                  {t("첫 수업을 마치면 첫 뱃지가 열려요.", "Finish your first lesson to earn a badge.")}
                </p>
              ) : (
                <ul className="flex flex-wrap gap-x-5 gap-y-2.5 pt-4">
                  {unlocked.map(b => (
                    <li key={b.id} className="flex items-center gap-1.5 text-[13px] text-stone-700">
                      <span className="text-base leading-none">{b.emoji}</span>
                      {b.title}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })()}

        {/* 📊 점수 차트 — 로딩 스켈레톤 */}
        {recentReviewsLoading && (
          <section className="mt-10">
            <SectionLabel>{t("점수 추이", "Score Trend")}</SectionLabel>
            <div className="flex h-24 items-end gap-1.5 pt-5">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 animate-pulse bg-stone-900/5" style={{ height: `${30 + ((i * 17) % 60)}%` }} />
              ))}
            </div>
          </section>
        )}

        {/* 📊 점수 차트 — 최근 복습 막대 그래프 (시간 ←→ 오른쪽이 최신) */}
        {!recentReviewsLoading && recentReviews.length >= 3 && (() => {
          // 오래된 → 최신 순서로 표시 (chart 흐름)
          const chartData = [...recentReviews].slice(0, 10).reverse()
          const avg = Math.round(chartData.reduce((a, r) => a + r.score, 0) / chartData.length)
          // 추세 — 후반 절반 평균 vs 전반 절반 평균 (개선/하락 명시)
          const halfIdx = Math.floor(chartData.length / 2)
          const earlyAvg = chartData.slice(0, halfIdx).length > 0
            ? Math.round(chartData.slice(0, halfIdx).reduce((a, r) => a + r.score, 0) / chartData.slice(0, halfIdx).length)
            : 0
          const lateAvg = chartData.slice(halfIdx).length > 0
            ? Math.round(chartData.slice(halfIdx).reduce((a, r) => a + r.score, 0) / chartData.slice(halfIdx).length)
            : 0
          const trendDelta = lateAvg - earlyAvg
          return (
            <section className="mt-10">
              <SectionLabel
                right={
                  <>
                    {t("평균", "Avg")} <span className="font-semibold text-stone-700">{avg}</span>
                    {chartData.length >= 4 && trendDelta !== 0 && (
                      <span className="ml-2 text-stone-500">
                        {trendDelta > 0 ? "▲" : "▼"} {Math.abs(trendDelta)}
                      </span>
                    )}
                  </>
                }
              >
                {t("점수 추이", "Score Trend")}
              </SectionLabel>
              <div className="relative mt-5 flex h-24 items-end gap-1.5">
                {/* 70점 기준선 — 막대에 색을 더 쓰는 대신 선 하나로 합격선을 보여준다. */}
                <div
                  className="pointer-events-none absolute left-0 right-0 border-t border-stone-900/15"
                  style={{ bottom: "70%" }}
                />
                {chartData.map((r, i) => (
                  <div
                    key={i}
                    className="group relative flex-1"
                    style={{ height: `${r.score}%` }}
                    title={`${r.score}${t("점", "pt")} · ${getLessonName(r.lesson_id, lang === "en" ? "en" : "ko")}`}
                  >
                    <div
                      className={cn(
                        "h-full w-full transition-colors",
                        r.score >= 70 ? "bg-stone-800 group-hover:bg-stone-950" : "bg-stone-300 group-hover:bg-stone-400"
                      )}
                    />
                    <span className="absolute -top-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tabular-nums text-stone-700 group-hover:block">
                      {r.score}
                    </span>
                  </div>
                ))}
              </div>
              {/* 기준선에 숫자 칩을 띄우면 마지막 막대 위에 흰 상자가 얹힌다.
                  선이 무엇인지는 글로 한 번만 말하면 된다. */}
              <p className="mt-2 break-keep text-[10px] text-stone-400">
                {t("오래된 순 → 최신 · 가로선 70점", "oldest → newest · line = 70")}
              </p>
            </section>
          )
        })()}

        {/* 📝 최근 복습 점수 5 개 — 시간 순 */}
        {recentReviews.length > 0 && (
          <section className="mt-10">
            <SectionLabel>{t("최근 복습", "Recent Reviews")}</SectionLabel>
            <ul className="divide-y divide-stone-900/5">
              {recentReviews.slice(0, 5).map((r, i) => {
                const daysAgo = (() => {
                  const d = new Date(r.updated_at)
                  const now = new Date()
                  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
                  if (diff === 0) return t("오늘", "Today")
                  if (diff === 1) return t("어제", "Yesterday")
                  return t(`${diff}일 전`, `${diff}d ago`)
                })()
                return (
                  <li key={i}>
                    <Link href={`/review/${r.lesson_id}`} className="group flex items-baseline gap-3 py-3">
                      <span className="min-w-0 flex-1 truncate text-sm text-stone-700 group-hover:text-orange-700">
                        {getLessonName(r.lesson_id, lang === "en" ? "en" : "ko")}
                      </span>
                      <span className="w-10 shrink-0 text-right text-[11px] text-stone-400">{daysAgo}</span>
                      <span
                        className={cn(
                          "w-8 shrink-0 text-right text-[15px] font-semibold tabular-nums",
                          r.score >= 70 ? "text-stone-900" : "text-stone-400"
                        )}
                      >
                        {r.score}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* ── 반 ── 반 기능만 유지 (2026-05 단순화) */}
        <section className="mt-10">
          <SectionLabel>{t("반", "Class")}</SectionLabel>
          {myClass ? (
            <div className="flex items-baseline justify-between gap-3 pt-4">
              <span className="min-w-0 truncate text-[17px] font-semibold tracking-tight text-stone-900">
                {myClass.name}
              </span>
              <button
                onClick={handleLeaveClass}
                disabled={leavingClass}
                className="shrink-0 text-[11px] text-stone-400 underline underline-offset-2 hover:text-stone-700 disabled:opacity-50"
              >
                {leavingClass ? t("처리 중...", "Leaving...") : t("탈퇴", "Leave")}
              </button>
            </div>
          ) : (
            <div className="pt-4">
              <Link
                href="/join"
                className="border-b-2 border-orange-500 pb-0.5 text-sm font-semibold text-orange-600 hover:border-orange-700 hover:text-orange-700"
              >
                {t("반 참가하기", "Join a class")}
              </Link>
            </div>
          )}
        </section>

        {/* ── 설정 ── */}
        <section className="mt-10">
          <SectionLabel>{t("설정", "Settings")}</SectionLabel>
          <div className="flex items-center justify-between py-4">
            <span className="text-sm text-stone-600">{t("언어", "Language")}</span>
            <LanguageToggle className="bg-white" />
          </div>
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              window.location.href = "/login"
            }}
            className="flex items-center gap-2 border-t border-stone-900/5 pt-4 text-sm text-stone-500 hover:text-stone-900"
          >
            <LogOut className="h-4 w-4" />
            {t("로그아웃", "Logout")}
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
