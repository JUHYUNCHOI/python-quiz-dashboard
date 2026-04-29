"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RequireAuth } from "@/components/require-auth"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { cn } from "@/lib/utils"
import {
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react"
import type { CodingBankProblem } from "@/data/coding-bank"
import { CODING_BANK_PROBLEMS } from "@/data/coding-bank"
import { PracticeRunner } from "@/components/practice/practice-runner"
import type { PracticeProblem } from "@/data/practice/types"

// ── 상수 ────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  sort: { ko: "정렬 활용", en: "Sorting" },
  simulation: { ko: "시뮬레이션", en: "Simulation" },
  "brute-force": { ko: "완전탐색", en: "Brute Force" },
  "map-set": { ko: "Map/Set", en: "Map/Set" },
  string: { ko: "문자열", en: "Strings" },
}

const CATEGORY_COLORS: Record<string, string> = {
  sort: "bg-blue-100 text-blue-700 border-blue-200",
  simulation: "bg-purple-100 text-purple-700 border-purple-200",
  "brute-force": "bg-orange-100 text-orange-700 border-orange-200",
  "map-set": "bg-teal-100 text-teal-700 border-teal-200",
  string: "bg-pink-100 text-pink-700 border-pink-200",
}

const DIFFICULTY_COLORS: Record<string, string> = {
  쉬움: "bg-emerald-100 text-emerald-700 border-emerald-200",
  보통: "bg-amber-100 text-amber-700 border-amber-200",
  어려움: "bg-red-100 text-red-700 border-red-200",
}

const LS_KEY = "coding-bank-solved"

// ── 유틸 ────────────────────────────────────────────────────────────

function getSolvedSet(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(LS_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function markSolved(id: string) {
  const set = getSolvedSet()
  set.add(id)
  localStorage.setItem(LS_KEY, JSON.stringify(Array.from(set)))
}

// ── 잠금 화면 ────────────────────────────────────────────────────────

function LockScreen({ t }: { t: (ko: string, en: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="w-20 h-20 rounded-2xl border-2 border-black bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Lock className="w-9 h-9 text-gray-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {t("코딩 뱅크", "Coding Bank")}
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
          {t(
            "map & set 레슨(cpp-16)을 완료하면 잠금이 해제됩니다.",
            "Complete the map & set lesson (cpp-16) to unlock Coding Bank."
          )}
        </p>
      </div>
      <div className="rounded-xl border-2 border-black bg-yellow-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] px-5 py-3 text-sm font-semibold text-gray-800">
        🔒 cpp-16 {t("완료 후 해금", "required to unlock")}
      </div>
    </div>
  )
}

// ── 문제 목록 ────────────────────────────────────────────────────────

type Category = CodingBankProblem["category"] | "all"
type Difficulty = CodingBankProblem["difficulty"] | "all"

function ProblemList({
  problems,
  solvedSet,
  onSelect,
}: {
  problems: CodingBankProblem[]
  solvedSet: Set<string>
  onSelect: (p: CodingBankProblem) => void
}) {
  const { t, lang } = useLanguage()
  const [categoryFilter, setCategoryFilter] = useState<Category>("all")
  const [diffFilter, setDiffFilter] = useState<Difficulty>("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = Array.from(new Set(problems.map((p) => p.category)))
  const difficulties: CodingBankProblem["difficulty"][] = ["쉬움", "보통", "어려움"]

  const filtered = problems.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false
    if (diffFilter !== "all" && p.difficulty !== diffFilter) return false
    return true
  })

  const totalSolved = problems.filter((p) => solvedSet.has(p.id)).length
  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") : d === "보통" ? t("보통", "Medium") : t("어려움", "Hard")

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("코딩 뱅크", "Coding Bank")}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {t(
              "알고리즘 없이, 배운 STL만으로 도전하는 복합 문제",
              "Complex problems solvable with just STL — no algorithms needed"
            )}
          </p>
        </div>
        <LanguageToggle className="shrink-0 mt-1" />
      </div>

      {/* 진도 바 */}
      {problems.length > 0 && (
        <div className="rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {t("전체 진도", "Overall Progress")}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {totalSolved} / {problems.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${problems.length > 0 ? (totalSolved / problems.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* 필터 토글 버튼 */}
      <button
        onClick={() => setShowFilters((v) => !v)}
        className="flex items-center gap-2 self-start px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-3.5 h-3.5" />
        {t("필터", "Filter")}
        {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* 필터 패널 */}
      {showFilters && (
        <div className="rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-3">
          {/* 카테고리 필터 */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              {t("카테고리", "Category")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                  categoryFilter === "all"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                )}
              >
                {t("전체", "All")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                    categoryFilter === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : cn("bg-white border", CATEGORY_COLORS[cat])
                  )}
                >
                  {lang === "ko" ? CATEGORY_LABELS[cat].ko : CATEGORY_LABELS[cat].en}
                </button>
              ))}
            </div>
          </div>

          {/* 난이도 필터 */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              {t("난이도", "Difficulty")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDiffFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                  diffFilter === "all"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                )}
              >
                {t("전체", "All")}
              </button>
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold border transition-all",
                    diffFilter === d
                      ? "bg-gray-900 text-white border-gray-900"
                      : cn("bg-white border", DIFFICULTY_COLORS[d])
                  )}
                >
                  {diffLabel(d)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 결과 없음 */}
      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-8">
          {t("해당하는 문제가 없습니다.", "No problems match the selected filters.")}
        </p>
      )}

      {/* 문제 카드 목록 */}
      {filtered.map((problem, i) => {
        const solved = solvedSet.has(problem.id)
        const localTitle = lang === "ko" ? problem.title : problem.en.title
        const catLabel =
          lang === "ko" ? CATEGORY_LABELS[problem.category].ko : CATEGORY_LABELS[problem.category].en

        return (
          <button
            key={problem.id}
            onClick={() => onSelect(problem)}
            className="rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 text-left transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-gray-300 text-sm w-6 shrink-0 pt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 leading-tight">{localTitle}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium border",
                        CATEGORY_COLORS[problem.category]
                      )}
                    >
                      {catLabel}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium border",
                        DIFFICULTY_COLORS[problem.difficulty]
                      )}
                    >
                      {diffLabel(problem.difficulty)}
                    </span>
                  </div>
                </div>
              </div>
              {solved && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── 문제 상세 ────────────────────────────────────────────────────────

function ProblemDetail({
  problem,
  solvedSet,
  onBack,
  onSolved,
  userId,
}: {
  problem: CodingBankProblem
  solvedSet: Set<string>
  onBack: () => void
  onSolved: (id: string) => void
  userId?: string
}) {
  const { t, lang } = useLanguage()
  const [revealedHints, setRevealedHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const solved = solvedSet.has(problem.id)

  const localTitle = lang === "ko" ? problem.title : problem.en.title
  const localDescription = lang === "ko" ? problem.description : problem.en.description
  const localConstraints = lang === "ko" ? problem.constraints : problem.en.constraints
  const localInputFormat = lang === "ko" ? problem.inputFormat : problem.en.inputFormat
  const localOutputFormat = lang === "ko" ? problem.outputFormat : problem.en.outputFormat
  const localHints = lang === "ko" ? problem.hints : problem.en.hints
  const localSolutionExplanation =
    lang === "ko" ? problem.solutionExplanation : problem.en.solutionExplanation

  const catLabel =
    lang === "ko" ? CATEGORY_LABELS[problem.category].ko : CATEGORY_LABELS[problem.category].en
  const diffLabel =
    problem.difficulty === "쉬움"
      ? t("쉬움", "Easy")
      : problem.difficulty === "보통"
      ? t("보통", "Medium")
      : t("어려움", "Hard")

  const adaptedProblem: PracticeProblem = {
    id: problem.id,
    cluster: "coding-bank",
    unlockAfter: "cpp-16",
    difficulty: problem.difficulty,
    title: problem.title,
    description: "",
    constraints: "",
    initialCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}`,
    language: "cpp",
    testCases: problem.testCases.map(tc => ({ stdin: tc.input, expectedOutput: tc.output })),
    hints: [],
    solutionCode: problem.solutionCode,
    solutionExplanation: localSolutionExplanation,
  }

  const handleRevealNextHint = () => {
    if (revealedHints < localHints.length) {
      setRevealedHints((v) => v + 1)
    }
  }

  const handleMarkSolved = () => {
    markSolved(problem.id)
    onSolved(problem.id)
    // DB 저장 (백그라운드)
    fetch("/api/coding-bank/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: problem.id }),
    }).catch(() => {})
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{localTitle}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium border",
                CATEGORY_COLORS[problem.category]
              )}
            >
              {catLabel}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium border",
                DIFFICULTY_COLORS[problem.difficulty]
              )}
            >
              {diffLabel}
            </span>
            {solved && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("완료", "Solved")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 문제 설명 */}
      <div className="rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-5">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {t("문제 설명", "Problem")}
        </p>
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {localDescription}
        </p>
        {localConstraints && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
              {t("제약 조건", "Constraints")}
            </p>
            <p className="text-xs text-gray-600 font-mono">{localConstraints}</p>
          </div>
        )}
      </div>

      {/* 입출력 형식 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("입력", "Input")}
          </p>
          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{localInputFormat}</p>
        </div>
        <div className="rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t("출력", "Output")}
          </p>
          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
            {localOutputFormat}
          </p>
        </div>
      </div>

      {/* 예제 */}
      {problem.testCases.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
            {t("예제", "Examples")}
          </p>
          {problem.testCases.map((tc, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-3 text-xs font-mono"
            >
              {tc.label && (
                <p className="text-gray-400 text-xs mb-2 font-sans">{tc.label}</p>
              )}
              <div className="flex flex-col gap-1.5">
                <div>
                  <span className="text-gray-400">{t("입력", "Input")}</span>
                  <pre className="text-gray-800 mt-0.5 whitespace-pre-wrap">{tc.input}</pre>
                </div>
                <div className="pt-1.5 border-t border-gray-100">
                  <span className="text-gray-400">{t("출력", "Output")}</span>
                  <pre className="text-emerald-600 font-semibold mt-0.5 whitespace-pre-wrap">
                    {tc.output}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 힌트 섹션 */}
      {localHints.length > 0 && (
        <div className="rounded-2xl border-2 border-black bg-amber-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
          <p className="text-sm font-bold text-amber-800 mb-3">
            💡 {t("힌트", "Hints")} ({revealedHints}/{localHints.length})
          </p>
          {revealedHints > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {localHints.slice(0, revealedHints).map((hint, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white border border-amber-200 px-3 py-2 text-sm text-gray-700"
                >
                  <span className="text-amber-500 font-semibold mr-1">{i + 1}.</span>
                  {hint}
                </div>
              ))}
            </div>
          )}
          {revealedHints < localHints.length && (
            <button
              onClick={handleRevealNextHint}
              className="w-full py-2 rounded-lg border-2 border-amber-300 bg-white text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors"
            >
              {revealedHints === 0
                ? t("첫 번째 힌트 보기", "Reveal first hint")
                : t("다음 힌트 보기", "Reveal next hint")}
            </button>
          )}
        </div>
      )}

      {/* 코드 에디터 */}
      <div className="rounded-2xl border-2 border-black bg-[#1e1e2e] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {t("코드 작성", "Write Code")}
        </p>
        <PracticeRunner
          key={problem.id}
          problem={adaptedProblem}
          onSuccess={() => {
            if (!solved) handleMarkSolved()
          }}
        />
      </div>

      {/* 솔루션 섹션 */}
      <div className="rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <button
          onClick={() => setShowSolution((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {t("풀이 보기", "View Solution")}
          </span>
          {showSolution ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {showSolution && (
          <div className="border-t-2 border-black">
            {/* 설명 */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t("풀이 설명", "Explanation")}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {localSolutionExplanation}
              </p>
            </div>
            {/* 코드 */}
            <div className="bg-gray-900 px-4 py-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                {t("솔루션 코드", "Solution Code")}
              </p>
              <pre className="text-sm text-emerald-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {problem.solutionCode}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 완료 버튼 */}
      {!solved ? (
        <button
          onClick={handleMarkSolved}
          className="w-full py-3.5 rounded-2xl border-2 border-black bg-emerald-500 text-white font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
        >
          ✓ {t("이 문제 완료로 표시", "Mark as Solved")}
        </button>
      ) : (
        <div className="w-full py-3.5 rounded-2xl border-2 border-emerald-400 bg-emerald-50 text-emerald-700 font-bold text-sm text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {t("완료한 문제입니다", "Already solved")}
        </div>
      )}
    </div>
  )
}

// ── 메인 컨텐츠 ──────────────────────────────────────────────────────

function CodingBankContent() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())
  const [selectedProblem, setSelectedProblem] = useState<CodingBankProblem | null>(null)

  const isTeacher = profile?.role === "teacher"

  useEffect(() => {
    // 잠금 해제 여부 확인
    try {
      const completed = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      ) as string[]
      setIsUnlocked(completed.includes("cpp-16") || completed.includes("cpp-p3") || isTeacher)
    } catch {
      setIsUnlocked(isTeacher)
    }

    // localStorage 즉시 로드
    setSolvedSet(getSolvedSet())

    // DB 로드 (백그라운드)
    fetch("/api/coding-bank/progress")
      .then(r => r.ok ? r.json() : { solved: [] })
      .then(({ solved: dbSolved }: { solved: string[] }) => {
        setSolvedSet(prev => {
          const merged = new Set([...prev, ...dbSolved])
          // localStorage도 최신화
          try { localStorage.setItem(LS_KEY, JSON.stringify([...merged])) } catch {}
          return merged
        })
      })
      .catch(() => {})
  }, [isTeacher])

  const handleSolved = (id: string) => {
    setSolvedSet((prev) => new Set([...prev, id]))
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6">
      {!isUnlocked ? (
        <LockScreen t={t} />
      ) : selectedProblem ? (
        <ProblemDetail
          problem={selectedProblem}
          solvedSet={solvedSet}
          onBack={() => setSelectedProblem(null)}
          onSolved={handleSolved}
          userId={user?.id}
        />
      ) : (
        <ProblemList
          problems={CODING_BANK_PROBLEMS}
          solvedSet={solvedSet}
          onSelect={setSelectedProblem}
        />
      )}
    </main>
  )
}

// ── 페이지 ──────────────────────────────────────────────────────────

export default function CodingBankPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <Header />
        <CodingBankContent />
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
