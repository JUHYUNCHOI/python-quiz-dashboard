"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RequireAuth } from "@/components/require-auth"
import { PracticeRunner } from "@/components/practice/practice-runner"
import { McqRunner } from "@/components/practice/mcq-runner"
import { PracticeSession } from "@/components/practice/practice-session"
import { ALL_CLUSTERS, BANK_CLUSTERS } from "@/data/practice"
import { getNextLessonId, getLessonName } from "@/lib/curriculum-data"
import type { PracticeCluster, PracticeProblem } from "@/data/practice/types"
import { localizeCluster, localizeProblem } from "@/data/practice/types"
import { getContestLinks, codeQuestUrl, type ContestProblem } from "@/data/practice/contest-links"
import { usePracticeProgress } from "@/hooks/use-practice-progress"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Lock, CheckCircle2, Star, FileText, Code2, HelpCircle, ExternalLink, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

type Lang = "cpp" | "python"

function getClusterLang(cluster: PracticeCluster): Lang {
  return String(cluster.unlockAfter).startsWith("cpp") ? "cpp" : "python"
}

const BANK_CLUSTER_IDS = new Set(BANK_CLUSTERS.map(c => c.id))
const CPP_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "cpp" && !BANK_CLUSTER_IDS.has(c.id))
const PYTHON_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "python" && !BANK_CLUSTER_IDS.has(c.id))

const DIFFICULTY_COLOR: Record<string, string> = {
  "쉬움": "text-emerald-700 bg-emerald-100",
  "보통": "text-amber-700 bg-amber-100",
  "어려움": "text-red-700 bg-red-100",
}

function isClusterUnlocked(cluster: PracticeCluster): boolean {
  if (typeof window === "undefined") return false
  try {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[]
    return completed.includes(cluster.unlockAfter)
  } catch { return false }
}

// SET 1 기준(7문제) 이상 풀었으면 "충분히 완료"
const SET1_SIZE = 7
function isClusterDone(cluster: PracticeCluster, solvedSet: Set<string>): boolean {
  const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
  return solved >= Math.min(SET1_SIZE, cluster.problems.length)
}

// ── 클러스터 목록 ──────────────────────────────────────────────────
function ClusterList({
  onSelect,
  solvedSet,
  starredSet,
  lang,
  onLangChange,
  isTeacher = false,
  onBack,
}: {
  onSelect: (cluster: PracticeCluster) => void
  solvedSet: Set<string>
  starredSet: Set<string>
  lang: Lang
  onLangChange: (lang: Lang) => void
  isTeacher?: boolean
  onBack?: () => void
}) {
  const { t, lang: locale } = useLanguage()
  const [showCompleted, setShowCompleted] = useState(false)
  const clusters = lang === "cpp" ? CPP_CLUSTERS : PYTHON_CLUSTERS

  // 전체 풀린 문제 수 (알고리즘 해금 목표)
  const GOAL = 40
  const totalSolved = ALL_CLUSTERS.reduce((acc, c) => acc + c.problems.filter(p => solvedSet.has(p.id)).length, 0)
  const goalReached = totalSolved >= GOAL

  // 해금됐지만 아직 덜 한 클러스터
  const activeClusters = clusters.filter(c =>
    (isTeacher || isClusterUnlocked(c)) && !isClusterDone(c, solvedSet)
  )
  // 충분히 완료한 클러스터
  const doneClusters = clusters.filter(c => isClusterDone(c, solvedSet))
  // 아직 잠긴 클러스터 (다음 예고용 — 1개만)
  const nextLockedCluster = !isTeacher
    ? clusters.find(c => !isClusterUnlocked(c) && !isClusterDone(c, solvedSet))
    : null

  // 코딩 뱅크 — cpp-p3 완료 후에만 표시
  const bankUnlocked = isTeacher || (typeof window !== "undefined" && (() => {
    try {
      const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[]
      return completed.includes("cpp-p3")
    } catch { return false }
  })())

  const nextCluster = activeClusters[0]
  const otherActive = activeClusters.slice(1)
  const [showAllActive, setShowAllActive] = useState(false)
  const visibleOtherActive = showAllActive ? otherActive : otherActive.slice(0, 2)

  const renderSmallCard = (cluster: PracticeCluster, accent = false) => {
    const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
    const locCluster = localizeCluster(cluster, locale)
    return (
      <button
        key={cluster.id}
        onClick={() => onSelect(cluster)}
        className={cn(
          "w-full rounded-2xl border p-3 text-left transition-all flex items-center gap-3",
          accent
            ? "bg-white border-amber-200 hover:border-amber-400 shadow-sm"
            : "bg-white border-gray-200 hover:border-indigo-300 shadow-sm"
        )}
      >
        <span className="text-xl shrink-0">{cluster.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{locCluster.title}</p>
          {solved > 0 && (
            <p className="text-xs text-gray-400">{solved}{t("문제 완료", " done")}</p>
          )}
        </div>
        <span className="text-gray-300 text-sm shrink-0">→</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-24">

      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("코딩 연습", "Practice")}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {t("문제를 풀면 알고리즘 학습이 열려요", "Solve problems to unlock algorithm study")}
          </p>
        </div>
      </div>

      {/* 언어 탭 */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {(["cpp", "python"] as Lang[]).map(l => (
          <button
            key={l}
            onClick={() => onLangChange(l)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
              lang === l ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {l === "cpp" ? "C++" : "Python"}
          </button>
        ))}
      </div>

      {/* 알고리즘 해금 진행 바 */}
      {!goalReached && (
        <div className="rounded-2xl bg-purple-50 border border-purple-100 px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-purple-700">
              🧠 {t("알고리즘 학습 준비", "Algorithm Unlock")}
            </span>
            <span className="text-xs font-semibold text-purple-500">
              {totalSolved} / {GOAL}
            </span>
          </div>
          <div className="relative h-3 bg-purple-100 rounded-full overflow-hidden">
            {/* 채워진 부분 */}
            <div
              className="absolute left-0 top-0 h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalSolved / GOAL) * 100)}%` }}
            />
            {/* 남은 부분 — pulse */}
            <div
              className="absolute top-0 h-full bg-purple-200 rounded-r-full animate-pulse"
              style={{
                left: `${Math.min(100, (totalSolved / GOAL) * 100)}%`,
                right: 0,
              }}
            />
          </div>
          <p className="text-xs text-purple-500 font-semibold mt-1.5">
            {GOAL - totalSolved > 0
              ? t(`${GOAL - totalSolved}문제 더 풀면 알고리즘 학습이 열려요 →`, `${GOAL - totalSolved} more problems to unlock algorithms →`)
              : t("거의 다 왔어요!", "Almost there!")}
          </p>
        </div>
      )}

      {/* 알고리즘 해금 달성 */}
      {goalReached && (
        <div className="rounded-2xl bg-purple-600 p-5 flex flex-col gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-black text-white">{t("알고리즘 해금!", "Algorithms Unlocked!")}</p>
              <p className="text-sm text-purple-200">{t("충분히 연습했어요. 이제 알고리즘으로 넘어가세요!", "Great work! Time to level up to algorithms.")}</p>
            </div>
          </div>
          <a
            href="/algo"
            className="w-full rounded-xl bg-white text-purple-700 font-bold text-sm py-3 text-center hover:bg-purple-50 transition-colors"
          >
            {t("알고리즘 학습 시작하기 →", "Start Algorithm Study →")}
          </a>
        </div>
      )}

      {/* 지금 할 것 — 메인 카드 */}
      {!goalReached && nextCluster && (() => {
        const locCluster = localizeCluster(nextCluster, locale)
        const solved = nextCluster.problems.filter(p => solvedSet.has(p.id)).length
        const inProgress = solved > 0
        return (
          <button
            onClick={() => onSelect(nextCluster)}
            className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] transition-all text-left p-5 shadow-md"
          >
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-wide mb-2">
              {inProgress ? t("👈 계속하기", "👈 Continue") : t("👉 지금 여기서 시작하세요", "👉 Start here")}
            </p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xl font-black text-white">
                  {nextCluster.emoji} {locCluster.title}
                </p>
                <p className="text-sm text-indigo-200 mt-1">{locCluster.description}</p>
              </div>
              <span className="text-white text-2xl shrink-0 animate-bounce">→</span>
            </div>
            {/* 세트 정보 */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs bg-white/20 text-white rounded-full px-2.5 py-1 font-semibold">
                {inProgress
                  ? t(`${solved}문제 완료`, `${solved} done`)
                  : t(`세트 1 · ${Math.min(SET1_SIZE, nextCluster.problems.length)}문제`, `Set 1 · ${Math.min(SET1_SIZE, nextCluster.problems.length)} problems`)}
              </span>
              {!inProgress && (
                <span className="text-xs text-white/50">
                  {t("총 ", "total ")} {nextCluster.problems.length}{t("문제", " problems")}
                </span>
              )}
            </div>
          </button>
        )
      })()}

      {/* 해금된 나머지 — 최대 2개, 더 보기 */}
      {otherActive.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
            {t("해금된 클러스터", "Also unlocked")}
          </p>
          {visibleOtherActive.map(c => renderSmallCard(c))}
          {otherActive.length > 2 && (
            <button
              onClick={() => setShowAllActive(v => !v)}
              className="text-xs text-indigo-500 font-semibold py-1 text-center hover:text-indigo-700 transition-colors"
            >
              {showAllActive
                ? t("접기 ▲", "Show less ▲")
                : t(`+ ${otherActive.length - 2}개 더 보기`, `+ ${otherActive.length - 2} more`)}
            </button>
          )}
        </div>
      )}

      {/* 다음 예고 — 잠긴 클러스터 1개만 희미하게 */}
      {nextLockedCluster && (() => {
        const locNext = localizeCluster(nextLockedCluster, locale)
        const lessonName = getLessonName(String(nextLockedCluster.unlockAfter))
        return (
          <div className="flex items-center gap-3 px-1 opacity-40">
            <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-base">{nextLockedCluster.emoji}</span>
            <div className="min-w-0">
              <span className="text-sm text-gray-500 font-medium">{locNext.title}</span>
              <span className="text-xs text-gray-400 ml-2">{lessonName} {t("완료 후", "after")}</span>
            </div>
          </div>
        )
      })()}

      {/* 완료한 클러스터 — 기본 접힘 */}
      {doneClusters.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted(v => !v)}
            className="w-full flex items-center gap-2 px-1 py-2 text-left"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-sm font-semibold text-gray-400">
              {t(`완료 ${doneClusters.length}개`, `${doneClusters.length} completed`)}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300">{showCompleted ? "▲" : "▼"}</span>
          </button>
          {showCompleted && (
            <div className="flex flex-col gap-2 mt-1">
              {doneClusters.map(cluster => {
                const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
                const total = cluster.problems.length
                const starred = cluster.problems.filter(p => starredSet.has(p.id)).length
                const locCluster = localizeCluster(cluster, locale)
                return (
                  <button
                    key={cluster.id}
                    onClick={() => onSelect(cluster)}
                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 p-3 text-left flex items-center gap-3 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-lg shrink-0">{cluster.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">{locCluster.title}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
                      {starred > 0 && (
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400" />{starred}
                        </span>
                      )}
                      <span>{solved}/{total}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 코딩 뱅크 — cpp-p3 완료 후에만 표시 */}
      {lang === "cpp" && bankUnlocked && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-gray-700">{t("코딩 뱅크", "Coding Bank")}</span>
            <div className="flex-1 h-px bg-amber-200" />
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-amber-700">
            {t(
              "배운 STL로 실전형 복합 문제 · 풀고 나면 USACO/MCC 문제 추천",
              "Multi-tool problems with your STL · Contest problem recommendations after each cluster"
            )}
          </div>
          {BANK_CLUSTERS.map(c => renderSmallCard(c, true))}
        </>
      )}
    </div>
  )
}

// ── 문제 목록 ──────────────────────────────────────────────────────
function ProblemList({
  cluster,
  onBack,
  onSelect,
  onStartSession,
  solvedSet,
  starredSet,
}: {
  cluster: PracticeCluster
  onBack: () => void
  onSelect: (problem: PracticeProblem) => void
  onStartSession: () => void
  solvedSet: Set<string>
  starredSet: Set<string>
}) {
  const { t, lang: locale } = useLanguage()
  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") :
    d === "보통" ? t("보통", "Medium") :
    t("어려움", "Hard")
  const solvedCount = cluster.problems.filter(p => solvedSet.has(p.id)).length
  const isAllMcq = cluster.problems.every(p => p.type === "mcq")
  const locCluster = localizeCluster(cluster, locale)

  return (
    <div className="flex flex-col gap-4 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900">{cluster.emoji} {locCluster.title}</h1>
          <p className="text-gray-400 text-xs">{solvedCount}/{cluster.problems.length} {t("문제 완료", "solved")}</p>
        </div>
      </div>

      {/* 연속 풀기 버튼 */}
      <button
        onClick={onStartSession}
        className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
      >
        ▶ {isAllMcq ? t("연속으로 풀기", "Play all") : t("순서대로 풀기", "Start in order")}
        <span className="text-indigo-200 font-normal text-xs">({cluster.problems.length} {t("문제 고정 순서", "problems · fixed order")})</span>
      </button>
      {(() => {
        const mcqProblems = cluster.problems.filter(p => p.type === "mcq")
        const codeProblems = cluster.problems.filter(p => p.type !== "mcq")
        const hasBoth = mcqProblems.length > 0 && codeProblems.length > 0

        const renderProblem = (problem: PracticeProblem, globalIdx: number) => {
          const solved = solvedSet.has(problem.id)
          const starred = starredSet.has(problem.id)
          const locP = localizeProblem(problem, locale)
          return (
            <button
              key={problem.id}
              onClick={() => onSelect(problem)}
              className="rounded-2xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md shadow-sm p-4 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300 text-sm w-5 shrink-0">{globalIdx + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{locP.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{locP.description.split("\n")[0].replace(/\*\*/g, "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", DIFFICULTY_COLOR[problem.difficulty])}>
                    {diffLabel(problem.difficulty)}
                  </span>
                  {starred
                    ? <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    : solved && <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  }
                </div>
              </div>
            </button>
          )
        }

        if (!hasBoth) {
          return cluster.problems.map((p, i) => renderProblem(p, i))
        }

        return (
          <>
            {/* MCQ 섹션 */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                {t("🎯 이해 확인", "🎯 Concept Check")}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300">{mcqProblems.length}{t("문제", " problems")}</span>
            </div>
            {mcqProblems.map((p, i) => renderProblem(p, i))}

            {/* 코드 섹션 구분선 */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">
                {t("💪 직접 구현하기", "💪 Write the Code")}
              </span>
              <div className="flex-1 h-px bg-indigo-100" />
              <span className="text-xs text-indigo-300">{codeProblems.length}{t("문제", " problems")}</span>
            </div>
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2 text-xs text-indigo-600">
              {t(
                "위에서 눈으로 익힌 개념을 이제 직접 코드로 써보세요!",
                "You've seen how it works — now write the code yourself!"
              )}
            </div>
            {codeProblems.map((p, i) => renderProblem(p, mcqProblems.length + i))}
          </>
        )
      })()}

      {/* 코딩 뱅크 클러스터일 때 실전 문제 추천 */}
      {BANK_CLUSTERS.some(b => b.id === cluster.id) && (
        <ContestProblemsSection
          clusterId={cluster.id}
          solvedCount={solvedCount}
          totalCount={cluster.problems.length}
        />
      )}
    </div>
  )
}

// ── 실전 대회 문제 추천 섹션 ───────────────────────────────────────
function ContestProblemsSection({
  clusterId,
  solvedCount,
  totalCount,
}: {
  clusterId: string
  solvedCount: number
  totalCount: number
}) {
  const { t } = useLanguage()
  const links = getContestLinks(clusterId)
  if (!links) return null

  // Show after solving at least 30% of the cluster
  const THRESHOLD = Math.max(1, Math.floor(totalCount * 0.3))
  if (solvedCount < THRESHOLD) return null

  const DIFF_LABEL: Record<ContestProblem["difficulty"], string> = {
    easy: t("쉬움", "Easy"),
    medium: t("보통", "Medium"),
  }
  const DIFF_COLOR: Record<ContestProblem["difficulty"], string> = {
    easy: "text-emerald-700 bg-emerald-100",
    medium: "text-amber-700 bg-amber-100",
  }

  return (
    <div className="mt-6">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-bold text-gray-700">
          {t("실전 대회 문제 도전", "Try Competition Problems")}
        </span>
        <div className="flex-1 h-px bg-amber-100" />
      </div>
      <p className="text-xs text-gray-400 mb-3">
        {t(
          "이 클러스터를 충분히 연습했어요! 배운 스킬로 도전해볼 수 있는 USACO/MCC 문제예요.",
          "Great practice! Here are USACO/MCC problems you can tackle with what you've learned."
        )}
      </p>

      <div className="flex flex-col gap-2">
        {links.problems.map(p => (
          <a
            key={p.id}
            href={codeQuestUrl(p.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all p-3 text-left flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", DIFF_COLOR[p.difficulty])}>
                  {DIFF_LABEL[p.difficulty]}
                </span>
                <span className="text-xs text-gray-400">{p.source}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{p.why}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          </a>
        ))}
      </div>
    </div>
  )
}

// ── 문제 패널 (설명 + 예제) — receives already-localized problem ──
function ProblemPanel({ problem }: { problem: PracticeProblem }) {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {problem.description.replace(/\*\*/g, "")}
        </p>
        {problem.constraints && (
          <p className="text-gray-400 text-xs mt-4 pt-4 border-t border-gray-100">
            {t("제약: ", "Constraints: ")}{problem.constraints}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t("예제", "Examples")}</p>
        {(problem.testCases ?? []).slice(0, 2).map((tc, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 text-xs font-mono">
            {tc.label && <p className="text-gray-400 mb-2">{tc.label}</p>}
            <div className="flex flex-col gap-1">
              <div>
                <span className="text-gray-400">{t("입력", "Input")}</span>
                <span className="ml-2 text-gray-700 whitespace-pre">{tc.stdin}</span>
              </div>
              <div>
                <span className="text-gray-400">{t("출력", "Output")}</span>
                <span className="ml-2 text-emerald-600 font-semibold whitespace-pre">{tc.expectedOutput}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 문제 상세 ──────────────────────────────────────────────────────
function ProblemDetail({
  problem,
  onBack,
  onMarkSolved,
  onMarkStarred,
}: {
  problem: PracticeProblem
  onBack: () => void
  onMarkSolved: (problemId: string) => Promise<void>
  onMarkStarred: (problemId: string) => Promise<void>
}) {
  const { t, lang: locale } = useLanguage()
  const [tab, setTab] = useState<"problem" | "code">("problem")
  const locProblem = localizeProblem(problem, locale)
  const isMcq = problem.type === "mcq"
  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") :
    d === "보통" ? t("보통", "Medium") :
    t("어려움", "Hard")

  const handleSuccess = async (starred: boolean) => {
    await onMarkSolved(problem.id)
    if (starred) await onMarkStarred(problem.id)
  }

  // ── MCQ: 단일 컬럼 레이아웃 ──
  if (isMcq) {
    return (
      <div className="pb-24 md:pb-6">
        {/* 헤더 행 */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <h1 className="text-base font-bold text-gray-900 truncate">{locProblem.title}</h1>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", DIFFICULTY_COLOR[problem.difficulty])}>
              {diffLabel(problem.difficulty)}
            </span>
          </div>
        </div>
        <div className="max-w-xl">
          <McqRunner problem={locProblem} onSuccess={handleSuccess} />
        </div>
      </div>
    )
  }

  // ── 코드 문제: 기존 2열 레이아웃 ──
  return (
    <div className="pb-24 md:pb-6">
      {/* 헤더 행 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base font-bold text-gray-900 truncate">{locProblem.title}</h1>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", DIFFICULTY_COLOR[problem.difficulty])}>
            {diffLabel(problem.difficulty)}
          </span>
        </div>
      </div>

      {/* 모바일 탭 */}
      <div className="flex md:hidden bg-gray-100 rounded-xl p-1 mb-4">
        <button
          onClick={() => setTab("problem")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "problem"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          {t("문제", "Problem")}
        </button>
        <button
          onClick={() => setTab("code")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "code"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          <Code2 className="w-3.5 h-3.5" />
          {t("코드", "Code")}
        </button>
      </div>

      {/* 콘텐츠 영역 — 모바일: 탭 / 데스크탑: 2열 */}
      <div className="md:grid md:grid-cols-[1fr_1.15fr] md:gap-6 md:h-[calc(100vh-140px)]">

        {/* 좌측: 문제 패널 */}
        <div className={cn(
          "md:overflow-y-auto md:pr-1",
          tab === "code" ? "hidden md:block" : "block"
        )}>
          <ProblemPanel problem={locProblem} />
        </div>

        {/* 우측: 코드 패널 */}
        <div className={cn(
          "md:overflow-y-auto",
          tab === "problem" ? "hidden md:block" : "block"
        )}>
          <PracticeRunner problem={locProblem} onSuccess={handleSuccess} />
        </div>

      </div>
    </div>
  )
}

// ── 메인 컨텐츠 ───────────────────────────────────────────────────
function PracticeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { solvedSet, starredSet, markSolved, markStarred } = usePracticeProgress()
  const { user, profile } = useAuth()
  const isTeacher = profile?.role === "teacher"
  const [lang, setLang] = useState<Lang>((searchParams.get("lang") as Lang) || "cpp")

  const clusterId = searchParams.get("cluster") || ""
  const problemId = searchParams.get("problem") || ""
  const fromParam = searchParams.get("from") || ""

  const setParam = (key: string, value: string | null) => {
    const p = new URLSearchParams(searchParams.toString())
    if (value) p.set(key, value); else p.delete(key)
    router.push(`/practice?${p.toString()}`)
  }

  const handleLangChange = (l: Lang) => {
    setLang(l)
    const p = new URLSearchParams(searchParams.toString())
    p.set("lang", l)
    p.delete("cluster")
    p.delete("problem")
    router.push(`/practice?${p.toString()}`)
  }

  const cluster = ALL_CLUSTERS.find(c => c.id === clusterId) ?? BANK_CLUSTERS.find(c => c.id === clusterId)
  const problem = cluster?.problems.find(p => p.id === problemId)
  const sessionMode = searchParams.get("session") === "1"

  // cluster 없이 직접 /practice 접근하면 커리큘럼으로
  useEffect(() => {
    if (!clusterId) {
      router.replace("/curriculum")
    }
  }, [clusterId, router])
  if (!clusterId) return null

  const handleClusterBack = () => {
    if (fromParam === "lesson" || fromParam === "curriculum") {
      router.back()
    } else {
      router.push("/curriculum")
    }
  }

  // cluster가 URL에 있지만 session 없으면 → 자동으로 세션 모드 진입 (useEffect로 이동 — render 중 router 호출 금지)
  const needsSessionRedirect = !!(cluster && !sessionMode && !problem)
  useEffect(() => {
    if (!needsSessionRedirect) return
    const p = new URLSearchParams(searchParams.toString())
    p.set("session", "1")
    router.replace(`/practice?${p.toString()}`)
  }, [needsSessionRedirect, router]) // eslint-disable-line react-hooks/exhaustive-deps
  if (needsSessionRedirect) return null

  // 세션 모드: 클러스터 내 문제를 연속으로 풀기
  if (sessionMode && cluster) {
    // 이 클러스터 다음 레슨 링크 — 어디서 진입했든 항상 계산
    const nextLessonId = getNextLessonId(cluster.unlockAfter)
    const nextLessonHref = nextLessonId ? `/learn/${nextLessonId}` : undefined

    return (
      <PracticeSession
        cluster={cluster}
        solvedSet={solvedSet}
        onExit={handleClusterBack}
        onMarkSolved={markSolved}
        onMarkStarred={markStarred}
        userId={user?.id}
        isTeacher={isTeacher}
        nextLessonHref={nextLessonHref}
      />
    )
  }

  if (problem && cluster) {
    return (
      <main className="max-w-5xl mx-auto px-4 pt-4">
        <ProblemDetail
          problem={problem}
          onBack={() => setParam("problem", null)}
          onMarkSolved={markSolved}
          onMarkStarred={markStarred}
        />
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6">
      <ClusterList
        onSelect={c => {
          // 클러스터 클릭 → 바로 세션 모드 진입
          const p = new URLSearchParams(searchParams.toString())
          p.set("cluster", c.id)
          p.set("session", "1")
          router.push(`/practice?${p.toString()}`)
        }}
        solvedSet={solvedSet}
        starredSet={starredSet}
        lang={lang}
        onLangChange={handleLangChange}
        isTeacher={isTeacher}
        onBack={() => {
          if (fromParam === "lesson" || fromParam === "curriculum") {
            router.back()
          } else {
            router.push("/curriculum")
          }
        }}
      />
    </main>
  )
}

export default function PracticePage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <Header />
        <Suspense fallback={<div className="text-gray-400 text-sm p-4">Loading...</div>}>
          <PracticeContent />
        </Suspense>
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
