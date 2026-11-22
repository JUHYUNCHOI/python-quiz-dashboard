"use client"

/**
 * 홈 (학생이 로그인하면 처음 보는 화면) — 네 구역으로 고정.
 *
 *   ┌───────────────────────────────────────┐
 *   │ 방패 언랭크 │ 불꽃 3일 │ 체크 12강   │  ← ① 상태 띠 (읽기만)
 *   ├──────┬─────────────────────┬──────────┤
 *   │ 레슨 │   ●──○──○──○        │ 대회     │  ← ② 가운데 여정 + ③ 양옆 타일
 *   │ 연습 │      ▲ 너 여기       │ 내정보   │
 *   ├──────┴─────────────────────┴──────────┤
 *   │     ┃ 배치고사 보기  12문항 ▸ ┃       │  ← ④ 큰 버튼 **하나**
 *   └───────────────────────────────────────┘
 *
 * ⚠️ 2026-11-22: 이전 홈은 세로로 쌓인 카드 8장이었다. 그중 **큰 CTA 가 둘**이었다
 *    (보라색 "배치고사로 내 티어 정하기" + 주황색 "여기서 시작"). 둘이 같은 크기로
 *    나란히 있으니 학생은 뭘 먼저 눌러야 하는지 알 수 없었다. 거기에 모양이 똑같은
 *    카드(티어·문제풀기·연속학습·트랙·연습도전)가 더 붙어 "전부 중요해 보여서
 *    아무것도 중요하지 않은" 화면이 됐다.
 *
 *    그래서 규칙을 셋으로 못 박았다:
 *      1. **큰 버튼은 화면에 하나뿐이다.** 배치고사를 안 봤으면 배치고사,
 *         봤으면 "지금 할 일". 둘이 동시에 크게 나오는 경우는 없다.
 *      2. 숫자(티어·연속·완료)는 **버튼이 아니라 띠**다. 위에 얇게 깔고 끝.
 *      3. 이동 수단은 **네 타일**로 고정하고 아이콘 실루엣을 전부 다르게 그린다.
 *         (components/journey-icons.tsx — 이모지 금지)
 */

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark, UnrankedMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import {
  JOURNEY_STAGES,
  getStageProgress,
  hasCppTrackProgress,
  type JourneyStage,
} from "@/lib/journey-stages"
import { getSmartNext } from "@/lib/smart-next"
import { useGamification } from "@/hooks/use-gamification"
import { PythonDiagnosticQuiz } from "@/components/python-diagnostic-quiz"
import { loadTierState, type TierState } from "@/lib/tier-store"
import { tierLabel } from "@/lib/tier-system"
import {
  STAGE_ICON,
  IconBook,
  IconDumbbell,
  IconTrophy,
  IconUser,
  IconFlame,
  IconCheckCircle,
  IconArrowRight,
  IconClipboard,
  IconFork,
} from "@/components/journey-icons"

// ── 트랙별 스테이지 순서 — 자기 길만 보여 준다 ──────────────────
// 가지(Y자)로 그리던 걸 한 줄로 펴 놨다. 갈림길은 트랙을 고르는 순간 이미
// 결정되므로, 지도에 남겨 두면 "내가 안 가는 길" 까지 읽어야 한다.
const STAGES_BY_TRACK: Record<"A" | "B" | "C", string[]> = {
  A: ["python", "python-practice", "cpp", "cpp-practice", "algo", "usaco"],
  B: ["python", "python-practice", "algo", "usaco"],
  C: ["cpp", "cpp-practice", "algo", "usaco"],
}

// ── ② 여정 지도 ────────────────────────────────────────────────

function StageNode({
  stage,
  progress,
  isActive,
}: {
  stage: JourneyStage
  progress: { done: number; total: number; status: string }
  isActive: boolean
}) {
  const { t, lang } = useLanguage()
  const Icon = STAGE_ICON[stage.id] ?? IconBook
  const isDone = progress.status === "completed"
  const isInProgress = progress.status === "in-progress"

  // 네 상태를 **테두리 색**으로만 구분한다. 배경까지 같이 칠하면 노드 네 개가
  // 서로 다른 카드처럼 보여서 '한 줄로 이어진 길' 이라는 느낌이 사라진다.
  const box = isDone
    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
    : isActive
      ? "border-orange-500 bg-orange-50 text-orange-600"
      : isInProgress
        ? "border-amber-400 bg-amber-50 text-amber-600"
        : "border-gray-200 bg-white text-gray-300"

  return (
    <Link
      href={stage.href}
      title={t(stage.title, stage.titleEn)}
      className="group flex w-[68px] shrink-0 flex-col items-center gap-1.5 px-1 sm:w-[76px]"
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-transform group-hover:-translate-y-0.5 sm:h-14 sm:w-14",
          box,
        )}
      >
        <Icon size={24} />
      </span>
      <span
        className={cn(
          "text-center font-bold leading-tight break-keep",
          lang === "en" ? "text-[11px]" : "text-xs",
          isDone ? "text-emerald-700" : isActive ? "text-orange-700" : "text-gray-500",
        )}
      >
        {lang === "en" ? stage.titleEn : stage.title}
      </span>
      {progress.total > 0 && (
        <span className="font-mono text-[10px] tabular-nums text-gray-400">
          {progress.done}/{progress.total}
        </span>
      )}
      {/* "너 여기" — 지도에서 단 한 번만 나타난다. 이게 없으면 노드 여섯 개 중
          어디에 서 있는지 색만 보고 추측해야 한다. */}
      {isActive && (
        <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-black text-white">
          {t("너 여기", "You")}
        </span>
      )}
    </Link>
  )
}

function JourneyMap({
  completedIds,
  hasCpp,
  trackId,
}: {
  completedIds: Set<string | number>
  hasCpp: boolean
  trackId: "A" | "B" | "C"
}) {
  const stages = (STAGES_BY_TRACK[trackId] ?? STAGES_BY_TRACK.A)
    .map(id => JOURNEY_STAGES.find(s => s.id === id))
    .filter((s): s is JourneyStage => !!s)

  const progressOf = (s: JourneyStage) => getStageProgress(s, completedIds, hasCpp)
  const activeId = stages.find(s => progressOf(s).status !== "completed")?.id ?? null

  return (
    // 좁은 화면에서는 가로로 밀어 본다. 세로로 쌓으면 '길' 이 아니라 목록이 된다.
    //
    // ⚠️ 연결선 폭은 **고정**이어야 한다. `w-full shrink-0` 로 뒀더니 연결선 다섯 개가
    //    각자 줄 전체 폭을 요구하면서 노드 여섯 개를 전부 오른쪽 바깥으로 밀어냈다
    //    (화면엔 회색 가로줄 하나만 남고 지도가 통째로 사라진 것처럼 보였다).
    <div className="flex min-w-max items-start justify-center">
      {stages.map((stage, i) => {
        const prev = stages[i - 1]
        const traveled = !!prev && progressOf(prev).status === "completed" && progressOf(stage).status === "completed"
        return (
          <Fragment key={stage.id}>
            {i > 0 && (
              <span className="mt-6 h-0.5 w-4 shrink-0 self-start sm:mt-7 sm:w-5">
                <span className={cn("block h-full w-full rounded", traveled ? "bg-orange-400" : "bg-gray-200")} />
              </span>
            )}
            <StageNode stage={stage} progress={progressOf(stage)} isActive={stage.id === activeId} />
          </Fragment>
        )
      })}
    </div>
  )
}

// ── ③ 양옆 타일 ────────────────────────────────────────────────

function RailTile({
  href,
  icon: Icon,
  label,
  className,
}: {
  href: string
  icon: (p: { size?: number; className?: string }) => React.ReactElement
  label: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white py-3.5 text-gray-600 transition-colors hover:border-orange-400 hover:text-orange-600",
        className,
      )}
    >
      <Icon size={24} />
      <span className="text-xs font-bold break-keep">{label}</span>
    </Link>
  )
}

// ── 페이지 ─────────────────────────────────────────────────────

export default function JourneyPage() {
  const { t, lang } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const { isStreakAtRisk, dailyStreak } = useGamification()
  const [completedIds, setCompletedIds] = useState<Set<string | number>>(new Set())

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const raw = localStorage.getItem("completedLessons")
        if (raw) {
          const arr = JSON.parse(raw)
          if (Array.isArray(arr)) setCompletedIds(new Set(arr))
        }
      } catch {}
      if (isAuthenticated && user) {
        const supabase = createClient()
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_id,completed")
          .eq("user_id", user.id)
          .eq("completed", true)
        if (cancelled) return
        if (Array.isArray(data)) {
          setCompletedIds(prev => {
            const merged = new Set<string | number>(prev)
            data.forEach(r => merged.add(r.lesson_id))
            return merged
          })
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [isAuthenticated, user])

  // 티어는 localStorage 에서만 읽는다. 서버 왕복을 기다리면 이미 배치고사를 본
  // 학생에게도 "배치고사 보세요" 버튼이 한 번 번쩍인다. 기기 간 동기화는 /tier 가 한다.
  // tierLoaded 전에는 큰 버튼을 그리지 않는다 — 둘 중 어느 쪽인지 모르는 상태.
  const [tierState, setTierState] = useState<TierState | null>(null)
  const [tierLoaded, setTierLoaded] = useState(false)
  useEffect(() => {
    setTierState(loadTierState())
    setTierLoaded(true)
  }, [])

  const hasCpp = hasCppTrackProgress(completedIds)
  const isFresh = completedIds.size === 0

  // 트랙 판별 — 사용자 명시 선택 우선, 없으면 자동 추정 + 첫 진입 시 모달
  const [explicitTrack, setExplicitTrack] = useState<"A" | "B" | "C" | null>(null)
  const [showTrackModal, setShowTrackModal] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("coderin-track") : null
      if (saved === "A" || saved === "B" || saved === "C") setExplicitTrack(saved)
      else if (isFresh) setShowTrackModal(true)
    } catch {}
  }, [isFresh])

  const autoTrackId: "A" | "B" | "C" = hasCpp ? (completedIds.size > 30 ? "A" : "C") : "B"
  const trackId: "A" | "B" | "C" = explicitTrack ?? autoTrackId

  // Smart-next 의 preferredTrack 을 user track 에 맞춰 결정
  const PY_DONE = Array.from({ length: 52 }, (_, i) => String(i + 1)).filter(id => completedIds.has(id)).length
  const preferredTrack: "python" | "cpp" | "pseudo" =
    trackId === "B" ? "python"
    : trackId === "C" ? "cpp"
    : (PY_DONE < 50 ? "python" : "cpp")
  const nextAction = getSmartNext(completedIds, preferredTrack)

  const saveTrack = (track: "A" | "B" | "C") => {
    setExplicitTrack(track)
    try { localStorage.setItem("coderin-track", track) } catch {}
    setShowTrackModal(false)
  }

  const trackLabels: Record<"A" | "B" | "C", { title: string; titleEn: string }> = {
    A: { title: "Python → C++ → 대회", titleEn: "Python → C++ → Contest" },
    B: { title: "Python 끝까지", titleEn: "Python all the way" },
    C: { title: "바로 C++", titleEn: "Straight to C++" },
  }

  // 배치고사 전이면 그게 유일한 큰 버튼이다.
  const needsPlacement = tierLoaded && !tierState

  return (
    // 네 구역이 화면을 **채워야** 한다. 위에 몰아 놓으면 아래가 통째로 빈 회색 바닥이
    // 되는데, 그러면 "여기서 끝인가?" 싶어 스크롤을 내려 보게 된다(내려도 아무것도 없다).
    // 내용이 길어지면 flex 가 알아서 위로 붙으므로 작은 화면에서도 잘리지 않는다.
    <div className="flex min-h-screen flex-col bg-gray-50 pb-28">
      <Header />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-3 px-3 py-4 sm:px-5">

        {/* ───────── ① 상태 띠 — 숫자만 읽는 자리. 버튼처럼 키우지 않는다. */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <Link href="/tier" className="flex items-center justify-center gap-2 px-2 py-2.5 hover:bg-gray-50">
            {tierState ? <TierMark tier={tierState.tier} size={20} /> : <UnrankedMark size={20} />}
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t("티어", "Tier")}</p>
              <p className="truncate text-xs font-black text-gray-800 sm:text-sm">
                {tierState ? tierLabel(tierState.tier, lang) : t("언랭크", "Unranked")}
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-center gap-2 px-2 py-2.5">
            <IconFlame size={20} className={dailyStreak > 0 ? "text-orange-500" : "text-gray-300"} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t("연속", "Streak")}</p>
              <p className="text-xs font-black text-gray-800 sm:text-sm">
                <span className="tabular-nums">{dailyStreak}</span>{t("일", "d")}
              </p>
            </div>
          </div>

          <Link href="/progress" className="flex items-center justify-center gap-2 px-2 py-2.5 hover:bg-gray-50">
            <IconCheckCircle size={20} className={completedIds.size > 0 ? "text-emerald-500" : "text-gray-300"} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{t("완료", "Done")}</p>
              <p className="text-xs font-black text-gray-800 sm:text-sm">
                <span className="tabular-nums">{completedIds.size}</span>{t("강", "")}
              </p>
            </div>
          </Link>
        </div>

        {/* 연속 끊김 — 카드로 키우지 않는다. 한 줄이면 전달된다. */}
        {isStreakAtRisk && dailyStreak > 0 && (
          <p className="px-1 text-xs font-bold text-orange-600 break-keep">
            {t(
              `${dailyStreak}일 연속이 어제 끊겼어요 — 오늘 한 강만 들으면 다시 1일부터.`,
              `Your ${dailyStreak}-day streak broke yesterday — one lesson today restarts it.`,
            )}
          </p>
        )}

        {/* ───────── ② 여정 + ③ 양옆 타일
            모바일: 지도 한 줄 → 타일 2×2. 데스크탑: 왼쪽 2 · 지도 · 오른쪽 2.
            DOM 순서는 모바일 기준이고, md 이상에서 grid 좌표로 자리를 바꾼다. */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-[104px_minmax(0,1fr)_104px] md:gap-3">
          <section className="col-span-2 rounded-xl border border-gray-200 bg-white p-3 sm:p-4 md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {t("나의 여정", "My journey")}
                </p>
                <p className="truncate text-sm font-black text-gray-800">
                  {t(trackLabels[trackId].title, trackLabels[trackId].titleEn)}
                </p>
              </div>
              <button
                onClick={() => setShowTrackModal(true)}
                className="shrink-0 text-[11px] font-bold text-gray-400 underline decoration-dotted hover:text-orange-600"
              >
                {t("변경", "Change")}
              </button>
            </div>
            <div className="-mx-1 overflow-x-auto pb-1">
              <JourneyMap completedIds={completedIds} hasCpp={hasCpp} trackId={trackId} />
            </div>
          </section>

          <RailTile href="/curriculum" icon={IconBook} label={t("레슨", "Lessons")} className="md:col-start-1 md:row-start-1" />
          <RailTile href="/course/ladder" icon={IconDumbbell} label={t("연습", "Practice")} className="md:col-start-1 md:row-start-2" />
          <RailTile href="/quest" icon={IconTrophy} label={t("대회", "Contest")} className="md:col-start-3 md:row-start-1" />
          <RailTile href="/profile" icon={IconUser} label={t("내 정보", "Profile")} className="md:col-start-3 md:row-start-2" />
        </div>

        {/* ───────── ④ 큰 버튼 — 화면에 하나뿐. 아래 두꺼운 테두리로 '눌리는 물건'
            이라는 걸 그림자나 글로우 없이 표현한다(누르면 그만큼 내려간다). */}
        {tierLoaded && (
          <Link
            href={needsPlacement ? "/tier/placement" : nextAction.href}
            className="flex items-center gap-3 rounded-xl border-b-4 border-orange-700 bg-orange-500 px-4 py-4 text-white transition-all hover:bg-orange-600 active:mt-1 active:border-b-0 sm:gap-4 sm:px-5 sm:py-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20 sm:h-12 sm:w-12">
              {needsPlacement ? <IconClipboard size={26} /> : <IconArrowRight size={26} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider opacity-80">
                {needsPlacement
                  ? t("가장 먼저 할 일", "Do this first")
                  : isFresh ? t("여기서 시작", "Start here") : t("지금 할 일", "Up next")}
              </span>
              <span className="block truncate text-lg font-black leading-tight sm:text-xl">
                {needsPlacement
                  ? t("배치고사 보기", "Take the placement test")
                  : t(nextAction.title, nextAction.titleEn)}
              </span>
              <span className="block truncate text-[11px] opacity-80 sm:text-xs">
                {needsPlacement
                  ? t("12문항 · 내 수준에 맞는 문제부터 바로", "12 questions · then start at your level")
                  : nextAction.subtitle}
              </span>
            </span>
            <IconArrowRight size={24} className="shrink-0 opacity-90" />
          </Link>
        )}

        {/* 트랙 선택 — 첫 방문이거나 "변경" 을 눌렀을 때만 */}
        {showTrackModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-3 sm:p-6">
            <div className="relative mx-auto my-4 w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
              <button
                onClick={() => setShowTrackModal(false)}
                aria-label={t("닫기", "Close")}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg font-black text-gray-500 hover:bg-gray-200 hover:text-gray-900"
              >
                ✕
              </button>

              {showDiagnostic ? (
                <PythonDiagnosticQuiz
                  onResult={(track) => { saveTrack(track); setShowDiagnostic(false) }}
                  onCancel={() => setShowDiagnostic(false)}
                />
              ) : (
                <>
                  <div className="mb-5 pr-10">
                    <h2 className="text-xl font-black text-gray-900 sm:text-2xl break-keep">
                      {t("어떤 길로 갈래요?", "Which path?")}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 break-keep">
                      {t("하나 고르면 끝. 나중에 바꿔도 돼요.", "Pick one. Changeable later.")}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {(["A", "B", "C"] as const).map(key => {
                      const ids = STAGES_BY_TRACK[key]
                      const sub = key === "A"
                        ? t("코딩이 처음이에요", "New to coding")
                        : key === "B"
                          ? t("C++ 없이 Python 으로만", "Python only, no C++")
                          : t("Python 은 이미 알아요", "I already know Python")
                      return (
                        <button
                          key={key}
                          onClick={() => saveTrack(key)}
                          className="rounded-xl border-2 border-gray-200 p-4 text-left transition-colors hover:border-orange-500 hover:bg-orange-50"
                        >
                          <p className="text-base font-black text-gray-900 break-keep">
                            {t(trackLabels[key].title, trackLabels[key].titleEn)}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 break-keep">{sub}</p>
                          <span className="mt-3 flex items-center gap-1.5 text-gray-400">
                            {ids.map((id, i) => {
                              const Icon = STAGE_ICON[id] ?? IconBook
                              return (
                                <Fragment key={id}>
                                  {i > 0 && <span className="h-px w-2 bg-gray-200" />}
                                  <Icon size={20} />
                                </Fragment>
                              )
                            })}
                          </span>
                        </button>
                      )
                    })}

                    <button
                      onClick={() => setShowDiagnostic(true)}
                      className="rounded-xl border-2 border-dashed border-gray-300 p-4 text-left transition-colors hover:border-gray-500 hover:bg-gray-50"
                    >
                      <p className="flex items-center gap-2 text-base font-black text-gray-900 break-keep">
                        <IconFork size={20} className="shrink-0 text-gray-400" />
                        {t("잘 모르겠어요", "Not sure")}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 break-keep">
                        {t("5문제 풀어 보고 자동으로 정해 줘요", "Answer 5 questions and we'll pick")}
                      </p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
