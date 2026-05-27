"use client"

/**
 * 분할 정복 (Divide and Conquer) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — 재귀의 직계 후손. 큰 문제를 같은 모양 작은 문제 N 개로 *쪼개고*,
 * 합치는 패턴. 머지 소트 / 퀵 소트가 대표 예. 거듭제곱 O(log N) 도 같은 사고.
 *
 * 교육 원칙: 한 챕터 = 한 가지 + 한 인터랙션 + 한 미니 퀴즈.
 */

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ArrowRight, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "✂️", title: "왜 분할 정복?",          titleEn: "Why Divide & Conquer?",        mins: 4 },
  { id: 2, emoji: "🔀", title: "머지 소트",              titleEn: "Merge Sort",                   mins: 8 },
  { id: 3, emoji: "⚡", title: "퀵 소트 + 분할",         titleEn: "Quick Sort + Partition",       mins: 7 },
  { id: 4, emoji: "🎯", title: "분할 정복 응용",         titleEn: "D&C Applications",             mins: 6 },
  { id: 5, emoji: "🏆", title: "정리",                    titleEn: "Recap",                        mins: 5 },
]

const STORAGE_KEY = "algo-divideconquer-chapter"

type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 ───────────────────────────────────────────
function useSlideChapter(initialStep: number = 0) {
  const [step, setStep] = useState(initialStep)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (step > 0) {
      setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30)
    }
  }, [step])
  return { step, setStep, rootRef }
}

// ── 공통 슬라이드 nav ────────────────────────────────────────────
function SlideNav({ step, total, setStep, onFinish, nextLabel, finishLabel }: {
  step: number; total: number; setStep: (n: number) => void
  onFinish: () => void; nextLabel?: string; finishLabel?: string
}) {
  const { t } = useLanguage()
  const isLast = step === total - 1
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={cn(
            "h-2 rounded-full transition-all",
            i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-300",
          )} />
        ))}
      </div>
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-xl font-bold text-sm"
          >
            ← {t("이전", "Prev")}
          </button>
          <button
            onClick={() => isLast ? onFinish() : setStep(step + 1)}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            {isLast ? (finishLabel ?? t("다음 챕터로", "Next chapter")) : (nextLabel ?? t("다음", "Next"))}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  )
}

function CodeBlock({ py, cpp, lang }: { py: string; cpp: string; lang: CodeLang; setLang?: (l: CodeLang) => void }) {
  return (
    <div className="rounded-xl bg-gray-900 overflow-hidden my-3">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5">
        <span className={cn("text-[11px] font-bold", lang === "py" ? "text-emerald-300" : "text-blue-300")}>
          {lang === "py" ? "🐍 Python" : "⚡ C++"}
        </span>
        <span className="text-[10px] text-gray-500 italic">{lang === "py" ? "토글: 위쪽 'Py / C++' 버튼" : "Toggle above"}</span>
      </div>
      <HighlightedCode code={lang === "py" ? py : cpp} lang={lang} />
    </div>
  )
}

function MiniQuiz({ question, options, answerIdx, hint, onCorrect }: {
  question: string; options: string[]; answerIdx: number; hint: string; onCorrect: () => void
}) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const handleSelect = (i: number) => {
    setSelected(i)
    if (i === answerIdx) setTimeout(onCorrect, 600)
  }
  const isCorrect = selected === answerIdx
  const isWrong = selected !== null && selected !== answerIdx
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-4">
      <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">📝 {t("미니 퀴즈", "Mini Quiz")}</p>
      <p className="text-sm font-bold text-gray-900 mb-3">{question}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)} disabled={isCorrect}
            className={cn("text-left px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
              selected === i && i === answerIdx && "bg-green-100 border-green-500 text-green-800",
              selected === i && i !== answerIdx && "bg-red-100 border-red-400 text-red-800",
              selected !== i && "bg-white border-gray-200 hover:border-amber-400 text-gray-700")}>
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      {isCorrect && <p className="mt-3 text-sm font-bold text-green-700">✅ {t("정답!", "Correct!")}</p>}
      {isWrong && (
        <div className="mt-3">
          <button onClick={() => setShowHint(!showHint)} className="text-xs font-bold text-amber-700 underline decoration-dotted">
            💡 {showHint ? t("힌트 닫기", "Hide hint") : t("힌트 보기", "Show hint")}
          </button>
          {showHint && <p className="mt-1.5 text-xs text-amber-800 bg-amber-100 rounded-lg p-2">{hint}</p>}
        </div>
      )}
    </div>
  )
}

// ── Chapter 1: 왜 분할 정복? ─────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">✂️</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("큰 문제 → 작은 문제 N 개로 쪼개기", "Big problem → split into N small ones")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유 1 — 토너먼트", "Analogy 1 — tournament")}:</b>{" "}
              {t(
                "32 명 중 1 등 뽑기. 한 명씩 비교 = 31 번 게임. 토너먼트는 16+8+4+2+1 = 31 번 — 같은 횟수지만 *동시에* 진행 가능.",
                "Pick #1 of 32 players. Pairwise compare = 31 games. Tournament: 16+8+4+2+1 = 31 — same total but rounds can run in parallel.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유 2 — 책 검색", "Analogy 2 — book lookup")}:</b>{" "}
              {t(
                "사전에서 단어 찾을 때 한 페이지씩 안 넘기죠. 한가운데 펴서 — 앞 / 뒤 결정 → 또 반으로. 이게 이분탐색 = 분할 정복.",
                "You don't flip dictionary pages one by one. Open the middle → front/back decide → halve again. Binary search = divide & conquer.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm font-bold text-amber-800 text-center">
                💡 {t("분할 정복 = 재귀의 한 종류. ", "D&C = a kind of recursion. ")}<b>{t("같은 모양 작은 문제로 *나누고* → 풀고 → *합친다*", "split into same-shape smaller problems → solve → combine")}</b>
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("3 단계 레시피", "3-step recipe")}
            </h3>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-sm font-black text-rose-800 mb-1">
                  1️⃣ {t("Divide — 나누기", "Divide")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "문제를 같은 모양의 작은 문제 N 개로 쪼갠다. (보통 반으로 — 그래서 log N 이 나옴)",
                    "Split into N smaller same-shape subproblems. (Usually halves → that's where log N comes from)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-indigo-200">
                <p className="text-sm font-black text-indigo-800 mb-1">
                  2️⃣ {t("Conquer — 풀기 (재귀)", "Conquer — solve recursively")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "각 작은 문제를 *같은 방법* 으로 푼다. 너무 작으면 (베이스) — 직접 답.",
                    "Solve each subproblem the *same way*. If small enough (base) — answer directly.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  3️⃣ {t("Combine — 합치기", "Combine")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "작은 문제 답들을 모아 원래 문제 답 만들기. 이 단계가 *얼마나 비싸냐* 가 전체 시간복잡도 결정.",
                    "Stitch sub-answers into the full answer. The *cost of this step* drives total complexity.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-700 text-center mt-3 leading-relaxed">
              {t(
                "예: 머지 소트 = 반으로 (Divide) → 각각 재귀 정렬 (Conquer) → 합쳐 정렬 (Combine).",
                "Ex: merge sort = halve → recurse → merge two sorted halves.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("마스터 정리 — 한 줄로", "Master Theorem — one line")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-2">📐 {t("일반 공식", "General formula")}</p>
              <p className="text-center font-mono text-base text-purple-900 my-2">
                T(N) = a · T(N/b) + f(N)
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <b>a</b> {t("= 자식 호출 개수, ", "= number of subcalls, ")}<b>b</b> {t("= 입력이 줄어드는 비율, ", "= shrink ratio, ")}<b>f(N)</b> {t("= 합치는 비용", "= combine cost")}
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-2">🎯 {t("자주 만나는 3 가지 패턴", "3 common cases")}</p>
              <ul className="text-xs text-gray-800 space-y-1.5">
                <li>• <b>{t("머지 소트", "Merge sort")}</b>: T(N) = 2T(N/2) + N → <code className="bg-purple-100 px-1 rounded">O(N log N)</code></li>
                <li>• <b>{t("이분탐색", "Binary search")}</b>: T(N) = T(N/2) + 1 → <code className="bg-purple-100 px-1 rounded">O(log N)</code></li>
                <li>• <b>{t("거듭제곱 O(log N)", "Fast power")}</b>: T(N) = T(N/2) + 1 → <code className="bg-purple-100 px-1 rounded">O(log N)</code></li>
              </ul>
            </div>
            <p className="text-xs text-purple-700 text-center leading-relaxed">
              {t(
                "공식 외울 필요 X — 패턴만 알아두면 시간복잡도 보임. 다음 챕터: 진짜 예 (머지 소트) 들어가요.",
                "Don't memorize the theorem — knowing the pattern is enough. Next: real example (merge sort).",
              )}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 머지 소트 ─────────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 5
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: [5,2,8,1,9,3] split → merge
  // phases:
  // 0 = 시작
  // 1 = split [5,2,8] | [1,9,3]
  // 2 = split [5,2] [8] | [1,9] [3]
  // 3 = split [5] [2] [8] | [1] [9] [3]
  // 4 = merge [2,5] [8] | [1,9] [3]
  // 5 = merge [2,5,8] | [1,3,9]
  // 6 = merge [1,2,3,5,8,9]
  const [phase, setPhase] = useState(0)
  const phases: { groups: number[][]; label: string; labelEn: string }[] = [
    { groups: [[5, 2, 8, 1, 9, 3]], label: "시작: 정렬되지 않은 배열", labelEn: "Start: unsorted array" },
    { groups: [[5, 2, 8], [1, 9, 3]], label: "Divide: 반으로", labelEn: "Divide: in half" },
    { groups: [[5, 2], [8], [1, 9], [3]], label: "Divide: 또 반으로", labelEn: "Divide: halve again" },
    { groups: [[5], [2], [8], [1], [9], [3]], label: "Divide: 원소 1개씩 — 이미 정렬됨!", labelEn: "Divide: singletons — already sorted!" },
    { groups: [[2, 5], [8], [1, 9], [3]], label: "Combine: 두 개씩 정렬해 합치기", labelEn: "Combine: merge in pairs" },
    { groups: [[2, 5, 8], [1, 3, 9]], label: "Combine: 더 큰 단위로", labelEn: "Combine: larger groups" },
    { groups: [[1, 2, 3, 5, 8, 9]], label: "✅ 정렬 완료!", labelEn: "✅ Sorted!" },
  ]
  const cur = phases[phase]
  const merging = phase >= 4
  const sortedDone = phase === phases.length - 1
  const msStep = () => { if (phase < phases.length - 1) setPhase(phase + 1) }
  const msReset = () => setPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔀</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("머지 소트 — 분할 정복의 대표선수", "Merge Sort — the D&C poster child")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("아이디어", "Idea")}:</b>{" "}
              {t(
                "정렬하기 어려워? 반으로 쪼개봐. 반으로 쪼갠 것도 정렬하기 어려워? 또 반으로. 결국 1 개짜리 → 이미 정렬됨!",
                "Hard to sort? Halve it. Halves still hard? Halve again. Eventually 1 element — already sorted!",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("3 단계", "3 steps")}</p>
              <ol className="text-xs text-gray-800 space-y-1">
                <li>1. <b>{t("Divide", "Divide")}</b>: {t("배열을 반으로 잘라 두 부분배열", "split array in half")}</li>
                <li>2. <b>{t("Conquer", "Conquer")}</b>: {t("각각을 재귀로 정렬", "recursively sort each half")}</li>
                <li>3. <b>{t("Combine — 머지!", "Combine — merge!")}</b>: {t("두 정렬된 배열을 합쳐 하나의 정렬된 배열로", "merge two sorted halves into one sorted array")}</li>
              </ol>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t(
                "시간: O(N log N) — 어떤 입력이든 *항상*. 이게 핵심 장점.",
                "Time: O(N log N) — *guaranteed*, any input. That's the key advantage.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("머지 소트 — 쪼개고 합치기", "Watch merge sort — split & merge")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("[5,2,8,1,9,3] 이 어떻게 정렬되나 한 칸씩!", "[5,2,8,1,9,3] sorting step-by-step!")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[140px] flex items-center justify-center flex-wrap gap-2">
              {cur.groups.map((g, gi) => (
                <div key={gi} className={cn(
                  "flex gap-0.5 px-2 py-1.5 rounded-md border-2 transition-all",
                  sortedDone && "bg-emerald-100 border-emerald-500",
                  !sortedDone && merging && "bg-cyan-50 border-cyan-400",
                  !sortedDone && !merging && "bg-blue-50 border-blue-300",
                )}>
                  {g.map((v, vi) => (
                    <span key={vi} className={cn(
                      "px-2 py-1 rounded font-mono text-xs font-bold",
                      sortedDone && "bg-emerald-500 text-white",
                      !sortedDone && merging && "bg-cyan-500 text-white",
                      !sortedDone && !merging && "bg-blue-400 text-white",
                    )}>{v}</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-cyan-800">
                {sortedDone ? <b className="text-emerald-700">{t(cur.label, cur.labelEn)}</b> : t(cur.label, cur.labelEn)}
              </p>
              <p className="text-[11px] text-cyan-700 mt-1">
                {t("단계", "Step")}: <b>{phase + 1}</b> / {phases.length}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={msStep} disabled={sortedDone}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={msReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🤝</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("merge — 두 정렬된 배열 합치기", "merge — combine two sorted arrays")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "두 줄이 이미 정렬되어 있어요. ",
                "Two arrays already sorted. ",
              )}<b>{t("앞만 비교", "Compare fronts only")}</b>{t(
                " — 작은 쪽을 결과에 넣고, 그 줄에서 다음 원소로. 한 쪽이 비면 나머지 통째로 붙임.",
                " — take the smaller, advance that side. If one runs out, dump the rest.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">💡 {t("예: [2,5,8] + [1,3,9]", "Example: [2,5,8] + [1,3,9]")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`A=[2,5,8] B=[1,3,9]  결과=[]
2 vs 1 → 1 넣음.  A=[2,5,8] B=[3,9]  → [1]
2 vs 3 → 2 넣음.  A=[5,8]   B=[3,9]  → [1,2]
5 vs 3 → 3 넣음.  A=[5,8]   B=[9]    → [1,2,3]
5 vs 9 → 5 넣음.  A=[8]     B=[9]    → [1,2,3,5]
8 vs 9 → 8 넣음.  A=[]      B=[9]    → [1,2,3,5,8]
A 비었음. B 남은거 붙임.        → [1,2,3,5,8,9]`}
              </pre>
            </div>
            <p className="text-sm font-bold text-emerald-700 text-center">
              {t(
                "merge 자체 비용: O(N). 각 원소를 정확히 한 번 본다.",
                "merge cost: O(N). Each element visited exactly once.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 머지 소트", "Code — merge sort")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("mergeSort: 반으로 쪼개고 → 각각 재귀 → merge. merge: 두 정렬 배열을 앞에서 비교하며 합침.", "mergeSort: split → recurse → merge. merge: compare fronts.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def merge_sort(arr):
    if len(arr) <= 1:           # 베이스 — 1 개는 이미 정렬됨
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # 재귀: 왼쪽
    right = merge_sort(arr[mid:])   # 재귀: 오른쪽
    return merge(left, right)       # 합치기

def merge(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])    # 한 쪽 남으면 통째로
    result.extend(b[j:])
    return result

print(merge_sort([5,2,8,1,9,3]))   # [1, 2, 3, 5, 8, 9]`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

vector<int> merge(vector<int>& a, vector<int>& b) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < (int)a.size() && j < (int)b.size()) {
        if (a[i] <= b[j]) result.push_back(a[i++]);
        else              result.push_back(b[j++]);
    }
    while (i < (int)a.size()) result.push_back(a[i++]);
    while (j < (int)b.size()) result.push_back(b[j++]);
    return result;
}

vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
}

int main() {
    vector<int> a = {5,2,8,1,9,3};
    auto sorted = mergeSort(a);
    for (int x : sorted) cout << x << " ";
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "시간복잡도 분석: log N 단계 (반씩 줄어듦) × 매 단계 N 작업 (merge) = O(N log N). 어떤 입력이든 보장.",
                "Complexity: log N levels × N work per level = O(N log N). Guaranteed for any input.",
              )}
            </p>
          </div>
        )}

        {step === 4 && (
          <MiniQuiz
            question={t(
              "머지 소트의 시간복잡도가 *항상* O(N log N) 인 이유는?",
              "Why is merge sort's time *always* O(N log N)?",
            )}
            options={[
              t("입력이 거의 정렬되어 있어서", "Because input is nearly sorted"),
              t("log N 단계 × 각 단계 N 작업 — 입력 모양과 무관", "log N levels × N work per level — independent of input"),
              t("merge 가 O(log N) 이라서", "Because merge is O(log N)"),
              t("Python 의 sort 가 내부에서 도와줘서", "Because Python's sort helps internally"),
            ]}
            answerIdx={1}
            hint={t(
              "배열이 어떻든 똑같이 반으로 쪼개고 (log N 단계) 매 단계마다 모든 원소를 한 번씩 봄 (N). 정렬 상태가 영향 X.",
              "Whatever the array looks like, we halve (log N levels) and touch every element once per level (N). Order doesn't matter.",
            )}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < totalSteps - 1 ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chapter 3: 퀵 소트 + 분할 ────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 퀵 소트 partition — [5,2,8,1,9,3], 피벗=3 (마지막)
  // phases:
  // 0 = 시작
  // 1 = 피벗 결정 (3)
  // 2 = partition 결과 표시
  // 3 = 좌우 재귀로 갈라짐
  // 4 = 정렬 완료
  const [phase, setPhase] = useState(0)
  const arr = [5, 2, 8, 1, 9, 3]
  const pivot = 3
  const less = [2, 1]
  const greater = [5, 8, 9]
  const finalArr = [1, 2, 3, 5, 8, 9]
  const qsStep = () => { if (phase < 4) setPhase(phase + 1) }
  const qsReset = () => setPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("퀵 소트 — 피벗으로 가르기", "Quick Sort — partition around a pivot")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-amber-700">{t("아이디어", "Idea")}:</b>{" "}
              {t(
                "한 원소 (*피벗*) 골라요. 나머지를 *피벗보다 작은 것 / 큰 것* 두 그룹으로 가름. → 각 그룹 재귀 정렬. 합칠 필요 없어요 — 자리만 잡으면 끝.",
                "Pick one element (the *pivot*). Split the rest into *less / greater*. Recursively sort each. No combine needed — placement is the work.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("머지 소트 vs 퀵 소트", "Merge vs Quick")}</p>
              <ul className="text-xs text-gray-800 space-y-1.5">
                <li>• <b>{t("머지:", "Merge:")}</b> {t("'그냥' 반으로 나누고 → ", "Halve blindly → ")}<b>{t("합칠 때", "merging")}</b>{t(" 정렬", "is the sort")}</li>
                <li>• <b>{t("퀵:", "Quick:")}</b> <b>{t("나눌 때", "Splitting")}</b>{t(" 정렬 (작은 것/큰 것). 합치기 불필요", "is the sort. No merge step")}</li>
              </ul>
            </div>
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-rose-800 leading-relaxed">
                ⚠️ <b>{t("최악 O(N²)", "Worst case O(N²)")}</b>{": "}
                {t(
                  "피벗을 매번 가장 작은/큰 값으로 골라버리면 한쪽이 비어 — 분할이 안 됨. 평균은 O(N log N) — 보통 빠름.",
                  "If the pivot is always min/max, one side is empty — no split. Average O(N log N) — usually fast in practice.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("퀵 소트 — 한 단계씩", "Quick sort — step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("[5,2,8,1,9,3] — 피벗으로 마지막 원소(3) 선택.", "[5,2,8,1,9,3] — pivot = last (3).")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[120px] flex items-center justify-center">
              {phase === 0 && (
                <div className="flex gap-1">
                  {arr.map((v, i) => (
                    <span key={i} className="px-2 py-1.5 bg-blue-400 text-white rounded font-mono text-xs font-bold">{v}</span>
                  ))}
                </div>
              )}
              {phase === 1 && (
                <div className="flex gap-1 items-center">
                  {arr.slice(0, -1).map((v, i) => (
                    <span key={i} className="px-2 py-1.5 bg-blue-300 text-white rounded font-mono text-xs font-bold">{v}</span>
                  ))}
                  <span className="px-3 py-1.5 bg-amber-500 text-white rounded font-mono text-xs font-black border-2 border-amber-700 scale-125">
                    {pivot}
                  </span>
                  <span className="text-xs text-amber-700 ml-2 font-bold">← {t("피벗!", "pivot!")}</span>
                </div>
              )}
              {phase === 2 && (
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 px-2 py-1.5 bg-emerald-50 border-2 border-emerald-400 rounded">
                    {less.map((v, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-500 text-white rounded font-mono text-xs font-bold">{v}</span>
                    ))}
                  </div>
                  <span className="px-3 py-1.5 bg-amber-500 text-white rounded font-mono text-xs font-black border-2 border-amber-700">
                    {pivot}
                  </span>
                  <div className="flex gap-1 px-2 py-1.5 bg-rose-50 border-2 border-rose-400 rounded">
                    {greater.map((v, i) => (
                      <span key={i} className="px-2 py-1 bg-rose-500 text-white rounded font-mono text-xs font-bold">{v}</span>
                    ))}
                  </div>
                </div>
              )}
              {phase === 3 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1 px-2 py-1.5 bg-emerald-50 border-2 border-emerald-400 rounded">
                      {[1, 2].map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500 text-white rounded font-mono text-xs font-bold">{v}</span>
                      ))}
                    </div>
                    <span className="px-3 py-1.5 bg-amber-500 text-white rounded font-mono text-xs font-black">{pivot}</span>
                    <div className="flex gap-1 px-2 py-1.5 bg-rose-50 border-2 border-rose-400 rounded">
                      {[5, 8, 9].map((v, i) => (
                        <span key={i} className="px-2 py-1 bg-rose-500 text-white rounded font-mono text-xs font-bold">{v}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-600">{t("← 각 그룹 재귀 정렬됨", "← each group recursively sorted")}</span>
                </div>
              )}
              {phase === 4 && (
                <div className="flex gap-1">
                  {finalArr.map((v, i) => (
                    <span key={i} className="px-2 py-1.5 bg-emerald-500 text-white rounded font-mono text-xs font-bold border-2 border-emerald-700">{v}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-amber-800">
                {phase === 0 && t("시작: 정렬되지 않음", "Start: unsorted")}
                {phase === 1 && t("피벗 결정 = 3", "Pivot = 3")}
                {phase === 2 && t("Partition: 피벗 양쪽으로 가름", "Partition: split around pivot")}
                {phase === 3 && t("각 그룹 재귀 정렬 (같은 방식)", "Each group sorted recursively")}
                {phase === 4 && <b className="text-emerald-700">✅ {t("정렬 완료!", "Sorted!")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={qsStep} disabled={phase >= 4}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음", "Next")}
              </button>
              <button onClick={qsReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 퀵 소트 (간단 버전)", "Code — quick sort (simple version)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("이해 우선 버전 — 새 배열 만들어 less/greater 로 가르기. 실전은 in-place (자리에서) 분할.", "Educational version — make new arrays for less/greater. Real impls do in-place partition.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]                        # 피벗 = 마지막
    less = [x for x in arr[:-1] if x <= pivot]
    greater = [x for x in arr[:-1] if x > pivot]
    return quick_sort(less) + [pivot] + quick_sort(greater)

print(quick_sort([5,2,8,1,9,3]))   # [1, 2, 3, 5, 8, 9]`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

vector<int> quickSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int pivot = arr.back();
    vector<int> less, greater;
    for (int i = 0; i < (int)arr.size() - 1; i++) {
        if (arr[i] <= pivot) less.push_back(arr[i]);
        else                 greater.push_back(arr[i]);
    }
    vector<int> L = quickSort(less);
    vector<int> G = quickSort(greater);
    L.push_back(pivot);
    for (int x : G) L.push_back(x);
    return L;
}

int main() {
    vector<int> a = {5,2,8,1,9,3};
    auto sorted = quickSort(a);
    for (int x : sorted) cout << x << " ";
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "평균 O(N log N), 최악 O(N²) — 이미 정렬된 입력에 마지막 피벗이면 한쪽이 매번 비어 폭망. 실전은 *랜덤 피벗* 으로 회피.",
                "Avg O(N log N), worst O(N²) — already-sorted + last-pivot is the worst case. Real impls pick a *random pivot* to dodge it.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "이미 정렬된 [1,2,3,4,5] 에 마지막 원소를 피벗으로 퀵 소트하면 시간복잡도는?",
              "On already-sorted [1,2,3,4,5] with last-element pivot, quick sort runs in?",
            )}
            options={[
              "O(log N)",
              "O(N log N)",
              "O(N²)",
              "O(N)",
            ]}
            answerIdx={2}
            hint={t(
              "피벗(5) 보다 작은 게 4 개, 큰 게 0 개 → 한쪽이 비어 분할 실패. 다음 호출도 같은 일 반복 → N 단계 × N 작업 = O(N²).",
              "Pivot 5 has 4 less, 0 greater — one side empty. Same happens next call → N levels × N work = O(N²).",
            )}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < totalSteps - 1 ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chapter 4: 분할 정복 응용 ───────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("응용 1 — 빠른 거듭제곱 O(log N)", "App 1 — Fast power O(log N)")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "2^N 을 구해야 해요. N=10억! 단순 곱하기는 10억 번 → 망함.",
                "Compute 2^N where N=1 billion. Multiplying 1B times → no.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-2">💡 {t("분할 정복 트릭", "D&C trick")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`b^n = (b^(n/2))^2          ← n 짝수
b^n = b · b^(n-1)          ← n 홀수
b^0 = 1                    ← 베이스

half 한 번만 계산해서 제곱.
→ 매번 n 이 반으로 → O(log N)`}
              </pre>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def power(b, n):
    if n == 0:
        return 1
    half = power(b, n // 2)
    if n % 2 == 0:
        return half * half       # half 두 번 부르지 X — 변수에 저장!
    return half * half * b

print(power(2, 30))   # 1073741824 (10초도 안 걸림 ✓)`}
              cpp={`long long power(long long b, int n) {
    if (n == 0) return 1;
    long long half = power(b, n / 2);
    if (n % 2 == 0) return half * half;
    return half * half * b;
}`}
            />
            <p className="text-xs text-purple-700 text-center">
              {t("⚠️ 함정: half 를 두 번 부르면 다시 O(N)! 변수에 저장!", "⚠️ Trap: calling half twice → back to O(N)! Save in a variable!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔢</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("응용 2 — inversion count (역순쌍 개수)", "App 2 — inversion count")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-rose-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "배열에서 i < j 인데 arr[i] > arr[j] 인 쌍의 개수. 단순하게 모든 쌍 확인 = O(N²).",
                "Count pairs i < j with arr[i] > arr[j]. Brute force = O(N²).",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-800 mb-2">💡 {t("머지 소트에 *살짝* 얹기", "Piggyback on merge sort")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "머지 단계에서 — 오른쪽 원소를 결과에 넣을 때 왼쪽에 남아있는 원소들 = 모두 그것보다 큰 *역순쌍*. 그 개수를 더하면 끝.",
                  "During merge — when taking from right, every remaining left element forms an inversion. Just add the count.",
                )}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed overflow-x-auto">
{`# merge 안에서:
if a[i] <= b[j]:
    result.append(a[i]); i += 1
else:
    result.append(b[j]); j += 1
    inv_count += len(a) - i   # ← 한 줄 추가!`}
              </pre>
            </div>
            <p className="text-sm font-bold text-rose-700 text-center">
              {t("시간: O(N log N) — 머지 소트와 같음. 단순 O(N²) → 분할 정복으로 가속.", "Time: O(N log N) — same as merge sort. Brute O(N²) → D&C accelerates.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📈</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("응용 3 — 최대 부분합 (분할 정복판)", "App 3 — Maximum subarray (D&C)")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "정수 배열에서 연속한 부분의 합이 최대인 값. (Kadane 알고리즘 = O(N), 여기서는 분할 정복 = O(N log N))",
                "Max sum of any contiguous subarray. (Kadane = O(N); D&C = O(N log N) — shown for pattern.)",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("3 가지 경우", "3 cases")}</p>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>1. {t("최대 부분합이 *왼쪽 절반* 에만 있음 → 재귀로 풂", "Max is in *left half* — recurse left")}</li>
                <li>2. {t("최대 부분합이 *오른쪽 절반* 에만 있음 → 재귀로 풂", "Max is in *right half* — recurse right")}</li>
                <li>3. {t("최대 부분합이 *가운데를 가로질러* 있음 → 직접 계산 (O(N))", "Max *crosses the middle* — compute in O(N)")}</li>
              </ul>
              <p className="text-xs text-cyan-700 mt-2 leading-relaxed">
                {t("세 후보 중 최대값 반환. T(N) = 2T(N/2) + N → O(N log N).", "Return the max of three candidates. T(N) = 2T(N/2) + N → O(N log N).")}
              </p>
            </div>
            <p className="text-xs text-cyan-700 text-center leading-relaxed">
              {t(
                "여기서 핵심은 *합치는 단계* (case 3) 가 흥미로움 — 가운데서 양쪽으로 펼쳐가며 최대 누적. 분할 정복의 'combine' 단계가 어떻게 비자명할 수 있는지 보여줌.",
                "The key is the *combine step* (case 3) — fan out from the middle accumulating max. Shows how the combine can be non-trivial.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "빠른 거듭제곱 코드에서 짝수 분기를 `return power(b, n/2) * power(b, n/2)` 로 짜면 어떻게 될까?",
              "In fast power, if the even branch writes `return power(b, n/2) * power(b, n/2)`, what happens?",
            )}
            options={[
              t("결과는 같고 더 빠름", "Same result, faster"),
              t("결과는 같지만 다시 O(N)", "Same result but back to O(N)"),
              t("결과가 두 배가 됨", "Result doubles"),
              t("컴파일 에러", "Compile error"),
            ]}
            answerIdx={1}
            hint={t(
              "같은 인자로 power(b, n/2) 를 두 번 호출 — 재귀 트리가 가지 두 개로 펼쳐짐 → 호출 수가 O(N) 으로 복귀. 'half = ...' 변수가 본질.",
              "Calling power(b, n/2) twice — the tree branches twofold → calls grow to O(N). The 'half = ...' variable is essential.",
            )}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < totalSteps - 1 ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chapter 5: 정리 ───────────────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 2
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">👏</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("분할 정복 — 첫 정복!", "Divide & Conquer — first conquest!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "머지 소트, 퀵 소트, 빠른 거듭제곱 — 이 세 개만 알아도 분할 정복의 80% 는 잡혔어요. 🎉",
                "Merge sort, quick sort, fast power — these three cover ~80% of D&C in practice. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-xs font-bold text-amber-800 mb-2">📐 {t("머지 vs 퀵 — 한 눈에", "Merge vs Quick — at a glance")}</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-amber-900 border-b border-amber-300">
                    <th className="text-left py-1"></th>
                    <th className="py-1">{t("머지", "Merge")}</th>
                    <th className="py-1">{t("퀵", "Quick")}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-amber-100">
                    <td className="py-1 font-bold">{t("평균", "Avg")}</td>
                    <td className="text-center">O(N log N)</td>
                    <td className="text-center">O(N log N)</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-1 font-bold">{t("최악", "Worst")}</td>
                    <td className="text-center text-emerald-700">O(N log N) ✓</td>
                    <td className="text-center text-rose-700">O(N²)</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-1 font-bold">{t("추가 메모리", "Extra mem")}</td>
                    <td className="text-center text-rose-700">O(N)</td>
                    <td className="text-center text-emerald-700">O(log N) ✓</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-bold">{t("안정성", "Stable")}</td>
                    <td className="text-center text-emerald-700">✓</td>
                    <td className="text-center text-rose-700">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("분할 정복 = ", "D&C = ")}<b>{t("Divide → Conquer → Combine", "Divide → Conquer → Combine")}</b> {t("3 단계", "(3 steps)")}</li>
              <li><b>2.</b> {t("머지 소트: 합치기에서 정렬. ", "Merge sort: sort in the merge step. ")}<b>{t("O(N log N) 보장", "guaranteed O(N log N)")}</b></li>
              <li><b>3.</b> {t("퀵 소트: 나누기에서 정렬. 평균 빠르지만 ", "Quick sort: sort in the partition. Fast on average but ")}<b>{t("최악 O(N²)", "worst O(N²)")}</b></li>
              <li><b>4.</b> {t("빠른 거듭제곱: ", "Fast power: ")}<code className="bg-white px-1 rounded text-xs">half = ...</code> {t("저장이 핵심 — 두 번 호출 X", "saving in a variable is essential — don't call twice")}</li>
              <li><b>5.</b> {t("마스터 정리: ", "Master Theorem: ")}<code className="bg-white px-1 rounded text-xs">T(N) = aT(N/b) + f(N)</code> {t("— 외울 필요 X, 패턴만", "— don't memorize, recognize")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("분할 정복이 자연스러우면 — 이분탐색, 세그먼트 트리, FFT 까지 같은 사고로!", "Once D&C feels natural — binary search, segment trees, FFT all follow the same thinking!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 {t("아직 부족해요? ", "Need more? ")}<b>{t("옆길:", "Side path:")}</b> {t("연습 문제 12 개로 손에 익히기. ", "12 problems to lock it in. ")}
                <Link href="/algo/divideconquer/practice" className="font-bold underline hover:text-blue-900">{t("문제 풀러 →", "Go practice →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음 토픽: 이분탐색, 그리디, DP — 분할 정복 사고가 모두 쓰여요. ", "Next: binary search, greedy, DP — all reuse D&C thinking. ")}
                <Link href="/algo" className="font-bold underline hover:text-purple-900">{t("알고리즘 지도 →", "Algo map →")}</Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={cn("h-2 rounded-full transition-all",
            i === step ? "w-8 bg-orange-500" : i < step ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
        ))}
      </div>
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-xl font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => step < totalSteps - 1 ? setStep(step + 1) : onComplete()}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95">
            {step === totalSteps - 1
              ? <>🎉 {t("분할 정복 마스터!", "D&C Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function DivideConquerPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)

  // Suppress unused-var warning — keeping router available for future nav
  void router

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (typeof d.current === "number") setCurrent(d.current)
        const completedArr = Array.isArray(d.completed) ? d.completed : []
        if (completedArr.length) setCompletedChapters(new Set(completedArr))
        if (d.mastered && completedArr.length >= CHAPTERS.length) setIsMastered(true)
      }
      const langRaw = localStorage.getItem("algo-code-lang")
      if (langRaw === "py" || langRaw === "cpp") setCodeLang(langRaw)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        current, completed: [...completedChapters], mastered: isMastered,
      }))
    } catch {}
  }, [current, completedChapters, isMastered])

  useEffect(() => {
    try { localStorage.setItem("algo-code-lang", codeLang) } catch {}
  }, [codeLang])

  const completeChapter = (n: number) => {
    setCompletedChapters(prev => new Set(prev).add(n))
    if (n < CHAPTERS.length) {
      setCurrent(n + 1)
      setTimeout(() => {
        document.getElementById("chapter-content")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    } else {
      setIsMastered(true)
      if (isAuthenticated && user) {
        const supabase = createClient()
        supabase.from("lesson_progress").upsert({
          user_id: user.id, lesson_id: "algo-divideconquer", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-divideconquer")) {
          arr.push("algo-divideconquer")
          localStorage.setItem("completedLessons", JSON.stringify(arr))
        }
      } catch {}
    }
  }

  const goToChapter = (n: number) => {
    if (n <= current || completedChapters.has(n)) {
      setCurrent(n)
      setTimeout(() => {
        document.getElementById("chapter-content")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-48">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <div className="mb-4">
          <JourneyBreadcrumb items={[
              { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
              { label: "분할 정복", labelEn: "Divide & Conquer", emoji: "✂️" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">✂️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("분할 정복", "Divide & Conquer")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Gold+", "Gold+")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/divideconquer/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("분할 정복 문제 12 개 — 직접 쪼개봐요!", "12 D&C challenges — split it yourself!")}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {CHAPTERS.map(ch => {
              const isDone = completedChapters.has(ch.id)
              const isCurrent = ch.id === current
              const canGo = ch.id <= current || isDone
              return (
                <button key={ch.id} onClick={() => goToChapter(ch.id)} disabled={!canGo}
                  className={cn("text-[11px] font-bold px-2 py-1 rounded-full border transition-all",
                    isCurrent && "bg-orange-500 border-orange-600 text-white shadow-md",
                    !isCurrent && isDone && "bg-green-100 border-green-400 text-green-800",
                    !isCurrent && !isDone && canGo && "bg-white border-gray-300 text-gray-600 hover:border-orange-400",
                    !canGo && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed")}>
                  {isDone && !isCurrent ? "✓" : ch.id}. {t(ch.title, ch.titleEn)}
                </button>
              )
            })}
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
              style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right tabular-nums">
            {completedChapters.size} / {CHAPTERS.length} {t("챕터 완료", "chapters done")}
          </p>
        </div>

        <div className="mb-4 bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
          {(() => {
            const ch = CHAPTERS[current - 1]
            return (
              <>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider truncate">
                    {t(`챕터 ${current}/${CHAPTERS.length}`, `Ch ${current}/${CHAPTERS.length}`)} · ⏱ {ch.mins}{t("분", "min")}
                  </span>
                  <div className="flex bg-gray-100 rounded-md p-0.5 gap-0.5 shrink-0">
                    <button
                      onClick={() => setCodeLang("py")}
                      className={cn("px-2 py-0.5 rounded text-[10px] font-bold transition-all",
                        codeLang === "py" ? "bg-emerald-500 text-white" : "text-gray-500 hover:text-emerald-600")}
                      title="Python"
                    >🐍 Py</button>
                    <button
                      onClick={() => setCodeLang("cpp")}
                      className={cn("px-2 py-0.5 rounded text-[10px] font-bold transition-all",
                        codeLang === "cpp" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-blue-600")}
                      title="C++"
                    >⚡ C++</button>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">{ch.emoji}</span>
                  {t(ch.title, ch.titleEn)}
                </h2>
              </>
            )
          })()}
        </div>

        <div id="chapter-content" className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm scroll-mt-4">
          {current === 1 && <Chapter1 onComplete={() => completeChapter(1)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(1)} />}
          {current === 2 && <Chapter2 onComplete={() => completeChapter(2)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(2)} />}
          {current === 3 && <Chapter3 onComplete={() => completeChapter(3)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(3)} />}
          {current === 4 && <Chapter4 onComplete={() => completeChapter(4)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(4)} />}
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} codeLang={codeLang} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("분할 정복 마스터!", "D&C Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/divideconquer/practice" className="block px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm text-center border-2 border-emerald-200">
                ✂️ {t("분할 정복 문제 12 개", "12 D&C problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽", "Next algo topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
