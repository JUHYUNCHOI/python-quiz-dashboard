"use client"

/**
 * 동적 프로그래밍 (DP) — 챕터식 학습 페이지 v1.
 *
 * 재귀 다음으로 학생들이 가장 많이 나가떨어지는 토픽.
 * 핵심 다리: 메모이제이션 (top-down) ↔ tabulation (bottom-up) — 둘은 *같은 것*.
 * Ch1 비유 + 메모이제이션 복습 → Ch2 1D DP (계단/피보) → Ch3 2D DP (knapsack) → Ch4 DP 4 단계 → Ch5 정리.
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
  { id: 1, emoji: "🧩", title: "왜 DP?",                          titleEn: "Why DP?",                       mins: 4 },
  { id: 2, emoji: "📊", title: "1D DP (계단 / 피보나치)",          titleEn: "1D DP (Stairs / Fib)",          mins: 7 },
  { id: 3, emoji: "🎒", title: "2D DP (배낭 문제)",                titleEn: "2D DP (0/1 Knapsack)",          mins: 8 },
  { id: 4, emoji: "🪜", title: "DP 4 단계 (점화식 도출법)",        titleEn: "DP in 4 Steps",                 mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",                      titleEn: "Recap & Sidequests",            mins: 5 },
]

const STORAGE_KEY = "algo-dp-chapter"

type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 ───────────────────────────────────────────
function useSlideChapter(initialStep: number = 0) {
  const [step, setStep] = useState(initialStep)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (step === 0) return
    const el = rootRef.current
    if (!el) return
    // 슬라이드 윗부분이 화면 밖(위로 잘렸거나 아래로 벗어남)일 때만 끌어옴.
    // 이미 잘 보이면 스크롤하지 않음 — 안 그러면 다음 누를 때마다 화면이 위로 튐
    // (선생님 2026-07-17: "다음을 누르면 자꾸 화면이 올라가").
    setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < 8 || r.top > window.innerHeight - 120) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 30)
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-2.5">
        <div className="max-w-md mx-auto flex gap-2">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm"
          >
            ← {t("이전", "Prev")}
          </button>
          <button
            onClick={() => isLast ? onFinish() : setStep(step + 1)}
            className="flex-[2] py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
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

// ── Chapter 1: 왜 DP? — 비유 + 메모이제이션 ↔ tabulation 다리 ────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪜</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("계단 오르기 — 몇 가지 방법?", "Climbing stairs — how many ways?")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs text-amber-700 font-bold mb-1">📌 {t("어려운 토픽이에요 — 천천히 가요", "This is a hard topic — we'll go slowly")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "DP 는 재귀 다음으로 학생들이 멈춰서는 곳. 그런데 *재귀를 다른 각도에서* 보는 것뿐이에요.",
                  "DP is where students stall after recursion. But really it's just *recursion seen from a different angle*.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "계단 N 개. 한 번에 ",
                "N stairs. Each step you climb ",
              )}<b>{t("1 칸 또는 2 칸", "1 or 2")}</b>{t(
                " 오를 수 있어요. 꼭대기까지 가는 방법은 몇 가지?",
                " stairs. How many ways to reach the top?",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-orange-200 mb-3">
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{t(`N=1 → 1 가지 (1)
N=2 → 2 가지 (1+1, 2)
N=3 → 3 가지 (1+1+1, 1+2, 2+1)
N=4 → 5 가지
N=5 → 8 가지`, `N=1 → 1 way (1)
N=2 → 2 ways (1+1, 2)
N=3 → 3 ways (1+1+1, 1+2, 2+1)
N=4 → 5 ways
N=5 → 8 ways`)}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "어디서 본 것 같죠? — 피보나치 수열! ways(N) = ways(N-1) + ways(N-2).",
                  "Look familiar? — Fibonacci! ways(N) = ways(N-1) + ways(N-2).",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center">
              {t("재귀로 짤 수도 있고, 표(table)로 채울 수도 있어요. → 다음 슬라이드.", "Can solve with recursion — or fill a table. → Next slide.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🐌</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("\"그냥 재귀로 풀면 안 돼?\"", "\"Can't I just use plain recursion?\"")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "ways(N) = ways(N-1) + ways(N-2) 를 그대로 재귀로 옮기면:",
                "Translate ways(N) = ways(N-1) + ways(N-2) straight into recursion:",
              )}
            </p>
            <div className="bg-gray-900 rounded-lg p-3 mb-3">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed">
{t(`def ways(n):
    if n <= 1: return 1
    return ways(n-1) + ways(n-2)`, `def ways(n):
    if n <= 1: return 1
    return ways(n-1) + ways(n-2)`)}
              </pre>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">
              {t(
                "문제: ways(5) 를 부르면 ways(3) 을 *두 번*, ways(2) 를 *세 번* 다시 계산해요. 트리를 펼쳐 보면:",
                "Problem: calling ways(5) recomputes ways(3) *twice*, ways(2) *three times*. Unfold the call tree:",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-red-200 mb-3 overflow-x-auto">
              <pre className="text-[11px] text-gray-800 font-mono leading-relaxed">
{t(`ways(5)
├─ ways(4)
│  ├─ ways(3)        ← 또 계산
│  │  ├─ ways(2)     ← 또 계산
│  │  └─ ways(1)
│  └─ ways(2)        ← 또 계산
└─ ways(3)           ← 또 계산
   ├─ ways(2)        ← 또 계산
   └─ ways(1)`, `ways(5)
├─ ways(4)
│  ├─ ways(3)        ← recomputed
│  │  ├─ ways(2)     ← recomputed
│  │  └─ ways(1)
│  └─ ways(2)        ← recomputed
└─ ways(3)           ← recomputed
   ├─ ways(2)        ← recomputed
   └─ ways(1)`)}
              </pre>
            </div>
            <div className="bg-red-100 rounded-lg p-3 border border-red-300">
              <p className="text-xs text-red-900 leading-relaxed text-center">
                💥 <b>{t("같은 부분 문제를 수없이 다시 계산", "Same subproblems recomputed over and over")}</b>.{" "}
                {t(
                  "N=40 이면 호출이 ~3 억 번 → 몇 초씩 걸려요. N=50 은 사실상 멈춤.",
                  "At N=40 that's ~300M calls → several seconds. N=50 basically hangs.",
                )}
              </p>
              <p className="text-xs text-red-800 leading-relaxed text-center mt-2">
                {t(
                  "→ 한 번 푼 답을 *저장* 하면 각 ways(k) 는 딱 한 번만. 이게 DP 의 출발점.",
                  "→ *Save* each answer once and every ways(k) runs just once. That's the seed of DP.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔁</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("같은 것, 두 방향에서", "Same thing, two directions")}
            </h3>
            <p className="text-xs text-gray-700 text-center mb-4">
              {t("이게 DP 의 정체. 두 방식은 *완전히 같은 계산*.", "This is what DP really is. Both styles compute the *exact same thing*.")}
            </p>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⬇️ {t("Top-down = 메모이제이션 (재귀 + 캐시)", "Top-down = memoization (recursion + cache)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "위에서부터 시작 (ways(N)) → 필요한 작은 문제를 *물어봐서* 풀어요. 푼 건 dict 에 저장.",
                    "Start at the top (ways(N)) → *ask* for smaller subproblems on demand. Cache results in a dict.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-1">
                  ⬆️ {t("Bottom-up = tabulation (반복 + 표)", "Bottom-up = tabulation (loop + table)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "가장 작은 답부터 (ways(1), ways(2)) → 표(dp[]) 를 차근차근 채워서 ways(N) 도달.",
                    "Start with smallest (ways(1), ways(2)) → fill table dp[] step by step up to ways(N).",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-300">
              <p className="text-xs text-amber-900 leading-relaxed text-center">
                💡 <b>{t("기억할 것", "Remember")}:</b>{" "}
                {t(
                  "DP = 재귀의 결과를 ",
                  "DP = ",
                )}<b>{t("저장해서 재사용", "saving recursion's results to reuse")}</b>.{" "}
                {t("저장하는 방향(위→아래 / 아래→위)만 다를 뿐.", "Only the direction (top→down / bottom→up) differs.")}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지", "3 things we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩.", "Preview — one at a time.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📊 1. {t("1D DP — 계단 / 피보나치", "1D DP — stairs / fib")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "dp[i] = dp[i-1] + dp[i-2]. 1 차원 배열로 끝. DP 의 가장 깨끗한 형태. (챕터 2)",
                    "dp[i] = dp[i-1] + dp[i-2]. One array, done. The cleanest DP shape. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🎒 2. {t("2D DP — 배낭 (knapsack)", "2D DP — 0/1 knapsack")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "표가 2 차원이 돼요 — 행: 물건, 열: 무게. 한 단계 더 추상적. (챕터 3)",
                    "Table is 2D — row: item, col: weight. One step more abstract. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🪜 3. {t("DP 4 단계 (점화식 도출법)", "DP in 4 steps")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "새 문제 만났을 때 — 상태 / 점화식 / 베이스 / 순서. 이 체크리스트만 따라가요. (챕터 4)",
                    "New problem? State / recurrence / base / order. Just follow this checklist. (Ch 4)",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("DP 가 마지막 큰 산. 끝까지 가요! →", "DP is the last big mountain. Let's finish! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 1D DP (계단 / 피보나치) ───────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 5
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [fillPassed, setFillPassed] = useState(false)
  void fillPassed

  // 시뮬레이션: dp[] 한 칸씩 채우기 (계단 N=10)
  // dp[0]=1, dp[1]=1, dp[i] = dp[i-1] + dp[i-2]
  const stairsN = 10
  const [filledUpTo, setFilledUpTo] = useState(-1) // -1 = 아무것도 안 채움
  const dpVals: number[] = []
  for (let i = 0; i <= stairsN; i++) {
    if (i === 0 || i === 1) dpVals.push(1)
    else dpVals.push(dpVals[i - 1] + dpVals[i - 2])
  }
  const stairsStep = () => { if (filledUpTo < stairsN) setFilledUpTo(filledUpTo + 1) }
  const stairsReset = () => setFilledUpTo(-1)
  const stairsDone = filledUpTo >= stairsN

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("점화식 도출 — 마지막 한 칸 보기", "Find the recurrence — look at the LAST step")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("질문", "Question")}:</b>{" "}
              {t(
                "N 번째 계단에 도착했을 때, *직전에* 어디 있었을까?",
                "When I'm on stair N, where was I *just before*?",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("두 가지 경우뿐", "Only two cases")}</p>
              <ul className="text-xs text-gray-800 space-y-1 leading-relaxed">
                <li>• {t("(N-1) 에서 1 칸 올라왔거나", "Came from (N-1) with a 1-step")}</li>
                <li>• {t("(N-2) 에서 2 칸 올라왔거나", "Came from (N-2) with a 2-step")}</li>
              </ul>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "그러니까 N 까지 가는 방법 = (N-1 까지 방법) + (N-2 까지 방법).",
                  "So ways to reach N = (ways to reach N-1) + (ways to reach N-2).",
                )}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed text-center">
{t(`dp[i] = dp[i-1] + dp[i-2]
dp[0] = 1   ← 베이스
dp[1] = 1   ← 베이스`, `dp[i] = dp[i-1] + dp[i-2]
dp[0] = 1   ← base
dp[1] = 1   ← base`)}
              </pre>
            </div>
            <p className="text-xs text-cyan-700 text-center leading-relaxed">
              {t(
                "이게 점화식. *마지막 동작* 만 생각하면 거의 항상 보여요.",
                "That's the recurrence. Thinking about *the last move* almost always reveals it.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("dp[] 한 칸씩 채우기 (N=10)", "Fill dp[] one cell at a time (N=10)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("dp[i] = dp[i-1] + dp[i-2]. 화살표가 어디서 오는지 봐요.", "dp[i] = dp[i-1] + dp[i-2]. Watch where each value comes from.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 overflow-x-auto">
              <div className="flex gap-1 min-w-max justify-center">
                {dpVals.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] text-gray-500 font-mono">dp[{i}]</span>
                    <div className={cn(
                      "w-10 h-10 rounded-md border-2 flex items-center justify-center font-mono text-xs font-bold transition-all",
                      i <= filledUpTo && i === filledUpTo && "bg-amber-200 border-amber-500 text-amber-900 scale-110",
                      i <= filledUpTo && i !== filledUpTo && "bg-blue-50 border-blue-300 text-blue-800",
                      i > filledUpTo && "bg-gray-100 border-gray-300 text-gray-400",
                    )}>
                      {i <= filledUpTo ? v : "?"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {filledUpTo === -1 && t("▶ 스텝을 눌러 dp[0] 부터 채우기 시작!", "▶ Step to start filling from dp[0]!")}
                {filledUpTo === 0 && <span>dp[0] = <b>1</b> {t("(베이스)", "(base)")}</span>}
                {filledUpTo === 1 && <span>dp[1] = <b>1</b> {t("(베이스)", "(base)")}</span>}
                {filledUpTo >= 2 && !stairsDone && (
                  <span>
                    dp[{filledUpTo}] = dp[{filledUpTo - 1}] + dp[{filledUpTo - 2}] = {dpVals[filledUpTo - 1]} + {dpVals[filledUpTo - 2]} = <b>{dpVals[filledUpTo]}</b>
                  </span>
                )}
                {stairsDone && <b className="text-emerald-700">✅ dp[10] = {dpVals[10]} {t("가지 방법!", "ways!")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={stairsStep} disabled={stairsDone}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 칸", "Next cell")}
              </button>
              <button onClick={stairsReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-emerald-50 rounded-lg p-2 border border-emerald-200">
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                💛 <b>{t("핵심", "Key")}:</b>{" "}
                {t(
                  "각 칸은 *한 번만* 계산. 메모이제이션 (재귀+캐시) 과 호출 횟수가 똑같아요.",
                  "Each cell computed *exactly once*. Same call count as memoized recursion.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — bottom-up tabulation", "Code — bottom-up tabulation")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("재귀 없이 for 한 번이면 끝. dp[] 작게부터 큰 쪽으로 채워요.", "No recursion — just one for loop. Fill dp[] from small to large.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def stairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1                    # ① 베이스
    dp[1] = 1                    # ② 베이스
    for i in range(2, n + 1):    # ③ 작은 것부터 채우기
        dp[i] = dp[i-1] + dp[i-2]   # ④ 점화식
    return dp[n]

print(stairs(10))   # 89
print(stairs(40))   # 165580141 — 즉시!`, `def stairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1                    # 1) base
    dp[1] = 1                    # 2) base
    for i in range(2, n + 1):    # 3) fill small to large
        dp[i] = dp[i-1] + dp[i-2]   # 4) recurrence
    return dp[n]

print(stairs(10))   # 89
print(stairs(40))   # 165580141 — instant!`)}
              cpp={t(`#include <iostream>
#include <vector>
using namespace std;

long long stairs(int n) {
    if (n <= 1) return 1;
    vector<long long> dp(n + 1);
    dp[0] = 1;                              // ① 베이스
    dp[1] = 1;                              // ② 베이스
    for (int i = 2; i <= n; i++) {          // ③ 작은 것부터
        dp[i] = dp[i - 1] + dp[i - 2];      // ④ 점화식
    }
    return dp[n];
}

int main() {
    cout << stairs(10) << endl;   // 89
    cout << stairs(40) << endl;   // 165580141
    return 0;
}`, `#include <iostream>
#include <vector>
using namespace std;

long long stairs(int n) {
    if (n <= 1) return 1;
    vector<long long> dp(n + 1);
    dp[0] = 1;                              // 1) base
    dp[1] = 1;                              // 2) base
    for (int i = 2; i <= n; i++) {          // 3) small to large
        dp[i] = dp[i - 1] + dp[i - 2];      // 4) recurrence
    }
    return dp[n];
}

int main() {
    cout << stairs(10) << endl;   // 89
    cout << stairs(40) << endl;   // 165580141
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크포인트: ① 베이스 ② 점화식 ③ 작은→큰 순서. 1D DP 의 형태는 거의 다 이래요.",
                "Checklist: ① base ② recurrence ③ small→large order. Most 1D DP looks like this.",
              )}
            </p>

            <div className="bg-purple-50 rounded-2xl p-3 border-2 border-purple-200 mt-4">
              <p className="text-sm font-black text-purple-900">🔄 {t("같은 계산, 반대 방향 — 메모이제이션 (top-down)", "Same calc, opposite direction — memoization (top-down)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  "Ch1 의 느린 재귀에 *캐시 한 줄* 만 더하면 돼요. 표를 안 채우고, 재귀가 물어볼 때만 채워요.",
                  "Just add *one cache* to Ch1's slow recursion. No table loop — fill on demand as the recursion asks.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`from functools import cache

@cache                           # ← 캐시 한 줄! (또는 dict 로 직접)
def stairs(n):
    if n <= 1:
        return 1
    return stairs(n-1) + stairs(n-2)   # ④ 점화식 — 재귀 그대로

print(stairs(40))   # 165580141 — 캐시 덕분에 즉시!

# 캐시를 dict 로 직접 쓰면:
memo = {}
def stairs2(n):
    if n <= 1: return 1
    if n in memo: return memo[n]       # 이미 풀었으면 꺼내 쓰기
    memo[n] = stairs2(n-1) + stairs2(n-2)
    return memo[n]`, `from functools import cache

@cache                           # <- one line of caching! (or use a dict)
def stairs(n):
    if n <= 1:
        return 1
    return stairs(n-1) + stairs(n-2)   # 4) recurrence — plain recursion

print(stairs(40))   # 165580141 — instant thanks to cache!

# using a dict cache directly:
memo = {}
def stairs2(n):
    if n <= 1: return 1
    if n in memo: return memo[n]       # already solved -> reuse
    memo[n] = stairs2(n-1) + stairs2(n-2)
    return memo[n]`)}
              cpp={t(`#include <iostream>
#include <vector>
using namespace std;

vector<long long> memo;              // -1 = 아직 안 풂

long long stairs(int n) {
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n];        // 이미 풀었으면 꺼내 쓰기
    return memo[n] = stairs(n-1) + stairs(n-2);   // ④ 점화식 — 재귀 그대로
}

int main() {
    int n = 40;
    memo.assign(n + 1, -1);
    cout << stairs(n) << endl;   // 165580141 — 즉시!
    return 0;
}`, `#include <iostream>
#include <vector>
using namespace std;

vector<long long> memo;              // -1 = not solved yet

long long stairs(int n) {
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n];        // already solved -> reuse
    return memo[n] = stairs(n-1) + stairs(n-2);   // 4) recurrence — plain recursion
}

int main() {
    int n = 40;
    memo.assign(n + 1, -1);
    cout << stairs(n) << endl;   // 165580141 — instant!
    return 0;
}`)}
            />
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-300">
              <p className="text-xs text-amber-900 leading-relaxed text-center">
                💡 <b>{t("두 코드는 같은 dp 값을 같은 횟수로 계산", "Both compute the same dp values, the same number of times")}</b>.{" "}
                {t(
                  "위(top-down)는 ways(N) 부터 *내려가며* 필요할 때 채우고, 아래(bottom-up)는 ways(0) 부터 *올라가며* 미리 채워요. 방향만 다름.",
                  "Top-down starts at ways(N) and fills *downward* on demand; bottom-up starts at ways(0) and fills *upward* ahead of time. Only the direction differs.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-emerald-50 rounded-2xl p-3 border-2 border-emerald-200">
              <p className="text-sm font-black text-emerald-900">✏️ {t("직접 점화식 세우기", "Build the recurrence yourself")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  "계단 문제로 돌아가요. \"i 번째 계단 도착 직전엔 (i-1) 또는 (i-2) 에 있었다.\" 그렇다면 dp[i] 는?",
                  "Back to the stairs. \"Right before stair i, I was on (i-1) or (i-2).\" So dp[i] = ?",
                )}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed text-center">
{t(`dp[i] = ________   ← 빈칸 채우기`, `dp[i] = ________   ← fill in the blank`)}
              </pre>
            </div>
            <MiniQuiz
              question={t(
                "계단 오르기에서 dp[i] 의 점화식은? (한 번에 1 칸 또는 2 칸)",
                "What is dp[i] for climbing stairs? (1 or 2 steps at a time)",
              )}
              options={[
                "dp[i] = dp[i-1] + dp[i-2]",
                "dp[i] = dp[i-1] * dp[i-2]",
                "dp[i] = dp[i-1] + 1",
                "dp[i] = max(dp[i-1], dp[i-2])",
              ]}
              answerIdx={0}
              hint={t(
                "(i-1) 에서 오는 방법 수 + (i-2) 에서 오는 방법 수 를 *더하면* i 까지 가는 전체 방법 수. 곱이나 max 가 아니라 합.",
                "Ways from (i-1) + ways from (i-2) *added together* = total ways to reach i. It's a sum, not a product or a max.",
              )}
              onCorrect={() => setFillPassed(true)}
            />
          </div>
        )}

        {step === 4 && (
          <MiniQuiz
            question={t(
              "메모이제이션 (top-down) 과 tabulation (bottom-up), 같은 1D DP 문제의 시간복잡도는?",
              "For the same 1D DP problem, what about time complexity of memoization (top-down) vs tabulation (bottom-up)?",
            )}
            options={[
              t("메모이제이션이 더 빠르다", "Memoization is faster"),
              t("tabulation 이 더 빠르다", "Tabulation is faster"),
              t("똑같다 — 둘 다 O(N)", "Same — both O(N)"),
              t("문제마다 다르다", "Depends on the problem"),
            ]}
            answerIdx={2}
            hint={t(
              "둘 다 같은 N+1 개의 dp 값을 *한 번씩만* 계산해요. 차이는 어떤 순서로 채우냐 (재귀 호출 순 vs for 루프 순) 와 약간의 메모리 (재귀는 호출 스택 추가).",
              "Both compute the same N+1 dp values *exactly once*. Difference is the order (recursive call order vs for-loop order) and a bit of memory (recursion adds stack).",
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

// ── Chapter 3: 2D DP (0/1 Knapsack) ──────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: knapsack — 작은 예
  // 물건: w=[2,3,4,5], v=[3,4,5,6], 배낭 용량 W=5
  // dp[i][w] = 첫 i 개 물건만 사용, 용량 w 일 때 최대 가치
  const items = [
    { w: 2, v: 3 },
    { w: 3, v: 4 },
    { w: 4, v: 5 },
    { w: 5, v: 6 },
  ]
  const W = 5
  const N = items.length
  // dp[N+1][W+1]
  const dp: number[][] = []
  for (let i = 0; i <= N; i++) dp.push(new Array(W + 1).fill(0))
  for (let i = 1; i <= N; i++) {
    for (let w = 0; w <= W; w++) {
      dp[i][w] = dp[i - 1][w]
      if (w >= items[i - 1].w) {
        const take = dp[i - 1][w - items[i - 1].w] + items[i - 1].v
        if (take > dp[i][w]) dp[i][w] = take
      }
    }
  }
  // 채우기 진행: row 단위로 (i=1 부터 N 까지)
  const [filledRows, setFilledRows] = useState(0)
  const rowStep = () => { if (filledRows < N) setFilledRows(filledRows + 1) }
  const rowReset = () => setFilledRows(0)
  const kpDone = filledRows >= N

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎒</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("배낭 문제 (0/1 Knapsack)", "0/1 Knapsack Problem")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-amber-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "N 개의 물건이 있어요. 각자 무게 w 와 가치 v. 배낭 용량은 W. 같은 물건은 한 번만 담을 수 있어요. 가치 합 최대?",
                "N items, each with weight w and value v. Bag capacity W. Each item is take-or-leave. Maximize total value.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("질문 — i 번째 물건 앞에서", "Question — facing item i")}</p>
              <ul className="text-xs text-gray-800 space-y-1 leading-relaxed">
                <li>• {t("안 담으면 → 이전과 똑같음: dp[i-1][w]", "Skip → same as before: dp[i-1][w]")}</li>
                <li>• {t("담으면 → 용량 w-wi 남기고, 가치 vi 추가: dp[i-1][w-wi] + vi", "Take → leave capacity w-wi, gain vi: dp[i-1][w-wi] + vi")}</li>
              </ul>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "둘 중 *큰 쪽* 선택. → ",
                  "Pick the *larger*. → ",
                )}<code className="bg-white px-1 rounded text-[11px]">dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi] + vi)</code>
              </p>
            </div>
            <p className="text-sm font-bold text-amber-700 text-center">
              {t("표가 2D 가 돼요 — 행: 물건 i, 열: 용량 w.", "Table becomes 2D — row: item i, col: capacity w.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("dp 표 채우기 — N=4, W=5", "Fill the dp table — N=4, W=5")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("물건: (w=2,v=3), (3,4), (4,5), (5,6). 한 행씩 추가해 봐요.", "Items: (w=2,v=3), (3,4), (4,5), (5,6). Add one row at a time.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-2 mb-3 overflow-x-auto">
              <table className="mx-auto text-[11px] font-mono">
                <thead>
                  <tr>
                    <th className="px-1.5 py-1 text-gray-500 font-bold">i \ w</th>
                    {Array.from({ length: W + 1 }).map((_, w) => (
                      <th key={w} className="px-1.5 py-1 text-gray-500 font-bold">{w}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dp.map((row, i) => (
                    <tr key={i}>
                      <td className="px-1.5 py-1 text-gray-500 font-bold border-r border-gray-300">
                        {i === 0 ? t("∅", "∅") : `(${items[i - 1].w},${items[i - 1].v})`}
                      </td>
                      {row.map((v, w) => (
                        <td key={w} className={cn(
                          "px-2 py-1 text-center border border-gray-200 font-bold",
                          i === 0 && "bg-gray-100 text-gray-500",
                          i > 0 && i === filledRows && "bg-amber-200 text-amber-900",
                          i > 0 && i < filledRows && "bg-blue-50 text-blue-800",
                          i > 0 && i > filledRows && "bg-white text-gray-300",
                        )}>
                          {i === 0 || i <= filledRows ? v : "?"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-amber-800">
                {filledRows === 0 && t("▶ 행 추가 — i=1 (물건 w=2,v=3) 부터.", "▶ Add row — start with i=1 (item w=2,v=3).")}
                {filledRows > 0 && !kpDone && (
                  <span>
                    {t("행", "Row")} i={filledRows} {t("채움. 물건 ", "filled. Item ")}(w={items[filledRows - 1].w},v={items[filledRows - 1].v}) {t("고려 완료.", "considered.")}
                  </span>
                )}
                {kpDone && <b className="text-emerald-700">✅ {t("최대 가치", "Max value")}: dp[{N}][{W}] = {dp[N][W]}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={rowStep} disabled={kpDone}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 행", "Next row")}
              </button>
              <button onClick={rowReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-blue-50 rounded-lg p-2 border border-blue-200">
              <p className="text-[11px] text-blue-800 leading-relaxed">
                💡 {t(
                  "각 칸 = max( 위 칸, 왼쪽 위 어딘가 + 현재 물건 가치 ). 이전 행만 필요해요.",
                  "Each cell = max( cell above, some upper-left cell + current item's value ). Only previous row is needed.",
                )}
              </p>
            </div>

            <div className="mt-3 bg-amber-50 rounded-lg p-3 border-2 border-amber-300">
              <p className="text-xs font-black text-amber-900 mb-2">✍️ {t("한 칸 직접 계산해 보기 — dp[1][5]", "Compute one cell by hand — dp[1][5]")}</p>
              <p className="text-[11px] text-gray-800 leading-relaxed mb-2">
                {t(
                  "i=1 → 물건 (w=2, v=3) 만 고려, 용량 w=5. 두 갈래:",
                  "i=1 → only item (w=2, v=3) available, capacity w=5. Two branches:",
                )}
              </p>
              <ul className="text-[11px] text-gray-800 space-y-1 leading-relaxed mb-2">
                <li>• <b>{t("안 담기", "Skip")}</b>: dp[0][5] = 0</li>
                <li>• <b>{t("담기", "Take")}</b>: dp[0][5-2] + 3 = dp[0][3] + 3 = 0 + 3 = <b>3</b></li>
              </ul>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                → dp[1][5] = max(0, 3) = <b className="text-amber-700">3</b>.{" "}
                {t(
                  "표에서 i=1, w=5 칸이 정말 3 인지 확인해 봐요!",
                  "Check the i=1, w=5 cell in the table — it really is 3!",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 0/1 Knapsack", "Code — 0/1 Knapsack")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("이중 for. 바깥 = 물건, 안쪽 = 용량. 시간복잡도 O(N×W).", "Double for. Outer = items, inner = capacity. Time O(N×W).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]   # ① 0 으로 초기화 (베이스)

    for i in range(1, n + 1):                    # ② 물건마다
        wi, vi = weights[i-1], values[i-1]
        for w in range(W + 1):                   # ③ 용량마다
            dp[i][w] = dp[i-1][w]                # 안 담는 경우
            if w >= wi:
                dp[i][w] = max(dp[i][w], dp[i-1][w - wi] + vi)  # 담는 경우

    return dp[n][W]

print(knapsack([2,3,4,5], [3,4,5,6], 5))   # 7 (물건 1+2: w=5, v=7)`, `def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]   # 1) init 0 (base)

    for i in range(1, n + 1):                    # 2) each item
        wi, vi = weights[i-1], values[i-1]
        for w in range(W + 1):                   # 3) each capacity
            dp[i][w] = dp[i-1][w]                # skip case
            if w >= wi:
                dp[i][w] = max(dp[i][w], dp[i-1][w - wi] + vi)  # take case

    return dp[n][W]

print(knapsack([2,3,4,5], [3,4,5,6], 5))   # 7 (items 1+2: w=5, v=7)`)}
              cpp={t(`#include <iostream>
#include <vector>
using namespace std;

int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));   // ① 베이스 0

    for (int i = 1; i <= n; i++) {                          // ② 물건마다
        for (int cap = 0; cap <= W; cap++) {                // ③ 용량마다
            dp[i][cap] = dp[i-1][cap];                      // 안 담음
            if (cap >= w[i-1]) {
                dp[i][cap] = max(dp[i][cap],
                                 dp[i-1][cap - w[i-1]] + v[i-1]);  // 담음
            }
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> w = {2, 3, 4, 5};
    vector<int> v = {3, 4, 5, 6};
    cout << knapsack(w, v, 5) << endl;   // 7
    return 0;
}`, `#include <iostream>
#include <vector>
using namespace std;

int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));   // 1) base 0

    for (int i = 1; i <= n; i++) {                          // 2) each item
        for (int cap = 0; cap <= W; cap++) {                // 3) each capacity
            dp[i][cap] = dp[i-1][cap];                      // skip
            if (cap >= w[i-1]) {
                dp[i][cap] = max(dp[i][cap],
                                 dp[i-1][cap - w[i-1]] + v[i-1]);  // take
            }
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> w = {2, 3, 4, 5};
    vector<int> v = {3, 4, 5, 6};
    cout << knapsack(w, v, 5) << endl;   // 7
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "이전 행만 보기 때문에 1D 배열로 줄일 수도 있어요 (메모리 O(W)) — 나중에 도전!",
                "Since only previous row is used, you can compress to 1D (memory O(W)) — future challenge!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "0/1 knapsack 의 시간복잡도는? (물건 N 개, 용량 W)",
              "Time complexity of 0/1 knapsack? (N items, capacity W)",
            )}
            options={[
              "O(N)",
              "O(W)",
              "O(N + W)",
              "O(N × W)",
            ]}
            answerIdx={3}
            hint={t(
              "표 크기가 (N+1) × (W+1). 각 칸은 O(1) 에 계산. 전체 O(N×W).",
              "Table is (N+1) × (W+1). Each cell is O(1). Total O(N×W).",
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

// ── Chapter 4: DP 4 단계 (점화식 도출법) ─────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪜</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("새 DP 문제 만났을 때 — 4 단계", "Facing a new DP problem — 4 steps")}
            </h3>
            <p className="text-xs text-gray-700 text-center mb-3">
              {t(
                "이 체크리스트만 따라가요. 매번 같은 순서.",
                "Just follow this checklist. Same order every time.",
              )}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  1️⃣ {t("상태 정의 (state)", "Define state")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "dp[i] (또는 dp[i][j]) 가 *무엇* 을 의미하는지 한 줄로 써요. 예: \"dp[i] = i 번째 계단까지 가는 방법 수\".",
                    "What does dp[i] (or dp[i][j]) *mean* — in one line. E.g. \"dp[i] = ways to reach stair i\".",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  2️⃣ {t("점화식 (recurrence)", "Recurrence")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "*마지막 동작* 만 보면 — dp[i] 를 더 작은 dp[?] 들로 표현. 예: dp[i] = dp[i-1] + dp[i-2].",
                    "Look at the *last move* — express dp[i] in terms of smaller dp[?]. E.g. dp[i] = dp[i-1] + dp[i-2].",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  3️⃣ {t("베이스 케이스 (base)", "Base case")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "가장 작은 답. 점화식이 더 이상 갈 수 없는 곳. 예: dp[0]=1, dp[1]=1.",
                    "Smallest answer. Where recurrence can't go further. E.g. dp[0]=1, dp[1]=1.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  4️⃣ {t("순서 (order)", "Order")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "dp[i] 계산할 때 필요한 dp[?] 들이 *이미 채워져 있어야* 해요. 보통 작은 i 부터 큰 i 로.",
                    "When computing dp[i], the dp[?] it needs must *already be filled*. Usually small i → large i.",
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200">
            <p className="text-3xl text-center mb-2">📈</p>
            <h3 className="text-base font-black text-gray-900 mb-3 text-center">
              {t("연습 — LIS (가장 긴 증가 부분 수열)", "Practice — LIS (longest increasing subsequence)")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-blue-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "수열에서 ",
                "From an array, ",
              )}<b>{t("순서를 유지하면서", "keeping order")}</b>{t(
                " 고른 *증가하는* 부분 수열 중 가장 긴 것 길이? 예: [3,1,4,1,5,9,2,6] → 4 ([1,4,5,9] 또는 [1,4,5,6]).",
                " pick an *increasing* subsequence — what's the longest length? Ex: [3,1,4,1,5,9,2,6] → 4 ([1,4,5,9] or [1,4,5,6]).",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-blue-200 mb-3 space-y-1.5">
              <p className="text-xs text-gray-800"><b className="text-blue-700">1️⃣ {t("상태", "State")}:</b> {t("dp[i] = i 번째로 끝나는 증가 부분 수열의 최대 길이", "dp[i] = max length of increasing subseq ending at i")}</p>
              <p className="text-xs text-gray-800"><b className="text-blue-700">2️⃣ {t("점화식", "Recurrence")}:</b> dp[i] = 1 + max(dp[j]) {t("for j<i 이고 a[j]<a[i]", "for j<i and a[j]<a[i]")}</p>
              <p className="text-xs text-gray-800"><b className="text-blue-700">3️⃣ {t("베이스", "Base")}:</b> {t("모든 dp[i] = 1 (자기 자신만 포함하면 길이 1)", "all dp[i] = 1 (self alone = length 1)")}</p>
              <p className="text-xs text-gray-800"><b className="text-blue-700">4️⃣ {t("순서", "Order")}:</b> i = 0 → N-1 ({t("dp[i] 가 dp[j] (j&lt;i) 만 보니까 OK", "dp[i] only looks at dp[j] for j&lt;i — OK")})</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-300">
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                💡 {t(
                  "정답 = max(dp[0..N-1]). 끝나는 위치는 어디든 될 수 있어요.",
                  "Answer = max(dp[0..N-1]). The longest subseq can end anywhere.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — LIS O(N²)", "Code — LIS O(N²)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("이중 for. 안쪽 = 이전 모든 j 보고 가장 좋은 것 골라 +1.", "Double for. Inner = look at all previous j, pick the best +1.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def lis(a):
    n = len(a)
    dp = [1] * n                      # ③ 베이스: 자기 자신 = 길이 1
    for i in range(n):                # ④ 작은 i 부터
        for j in range(i):
            if a[j] < a[i]:           # ② 점화식: a[j] < a[i] 일 때
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)                    # 끝나는 위치 중 가장 긴 것

print(lis([3,1,4,1,5,9,2,6]))   # 4`, `def lis(a):
    n = len(a)
    dp = [1] * n                      # 3) base: self alone = length 1
    for i in range(n):                # 4) small i first
        for j in range(i):
            if a[j] < a[i]:           # 2) recurrence: when a[j] < a[i]
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)                    # longest, ending anywhere

print(lis([3,1,4,1,5,9,2,6]))   # 4`)}
              cpp={t(`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lis(vector<int>& a) {
    int n = a.size();
    vector<int> dp(n, 1);                     // ③ 베이스 = 1
    for (int i = 0; i < n; i++) {             // ④ 작은 i 부터
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {                // ② 점화식
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    return *max_element(dp.begin(), dp.end());
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << lis(a) << endl;   // 4
    return 0;
}`, `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lis(vector<int>& a) {
    int n = a.size();
    vector<int> dp(n, 1);                     // 3) base = 1
    for (int i = 0; i < n; i++) {             // 4) small i first
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {                // 2) recurrence
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    return *max_element(dp.begin(), dp.end());
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << lis(a) << endl;   // 4
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "더 빠른 O(N log N) 방법도 있지만, DP 흐름 익히는 게 먼저!",
                "There's a faster O(N log N) approach — but learn the DP pattern first!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "어떤 문제에 DP 를 *항상* 적용할 수 있는 조건은?",
              "When can DP *always* be applied to a problem?",
            )}
            options={[
              t("입력 크기가 작을 때", "When input size is small"),
              t("재귀로 풀 수 있을 때", "When solvable by recursion"),
              t("최적 부분 구조 (optimal substructure) + 중복 부분 문제 (overlapping subproblems) 둘 다 있을 때", "Both optimal substructure AND overlapping subproblems"),
              t("배열이 정렬되어 있을 때", "When the array is sorted"),
            ]}
            answerIdx={2}
            hint={t(
              "최적 부분 구조 = 큰 문제 답을 작은 문제 답으로 만들 수 있다 (점화식 가능). 중복 부분 문제 = 같은 작은 문제가 여러 번 등장 (저장하면 이득). 둘 중 하나라도 빠지면 DP 가 의미 없어요.",
              "Optimal substructure = big answer built from smaller answers (recurrence exists). Overlapping subproblems = same subproblem appears many times (caching helps). Missing either → DP doesn't help.",
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

// ── Chapter 5: 정리 + 옆길 ───────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 2
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🏔️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("DP — 마지막 큰 산 정복!", "DP — last big mountain conquered!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "여기까지 왔어요. 재귀 → DP — 알고리즘에서 가장 어려운 두 산을 다 넘었어요. 🎉",
                "You made it here. Recursion → DP — the two hardest mountains in algorithms. Both done. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "이제 USACO Silver / Gold 도 도전 가능해요. 진짜로.",
                  "USACO Silver / Gold are now within reach. Seriously.",
                )}
              </p>
              <p className="text-xs text-gray-700 text-center mt-2 leading-relaxed">
                {t(
                  "남은 건 패턴 익히기 — 더 많은 DP 문제를 풀어보면 손이 알아서 움직여요.",
                  "What's left is pattern practice — solve more DP problems and your hand starts to know.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("DP = ", "DP = ")}<b>{t("재귀 결과를 저장해 재사용", "save recursion's results, reuse")}</b>. {t("Top-down (메모) ↔ Bottom-up (table) — 같은 것.", "Top-down (memo) ↔ Bottom-up (table) — same thing.")}</li>
              <li><b>2.</b> {t("새 문제 → ", "New problem → ")}<b>{t("4 단계 체크리스트", "4-step checklist")}</b>: {t("상태 / 점화식 / 베이스 / 순서.", "state / recurrence / base / order.")}</li>
              <li><b>3.</b> {t("점화식 도출 = *마지막 동작* 만 보기. \"i 칸 도착 직전엔 어디 있었나?\"", "Recurrence = look at *last move*. \"Where was I right before reaching i?\"")}</li>
              <li><b>4.</b> {t("1D DP (계단/피보) → 2D DP (배낭) 순으로 익혀요. 1D 만 능숙해도 USACO Bronze 충분.", "Learn 1D (stairs/fib) → 2D (knapsack). 1D fluency alone is enough for USACO Bronze.")}</li>
              <li><b>5.</b> {t("적용 조건: ", "Applicable when: ")}<b>{t("최적 부분 구조 + 중복 부분 문제", "optimal substructure + overlapping subproblems")}</b>. {t("둘 다 있어야.", "Both needed.")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("DP 가 손에 잡히면 — 그래프 DP, 트리 DP, 비트마스크 DP 까지 다 같은 방식!", "Once DP clicks, graph-DP / tree-DP / bitmask-DP all follow the same pattern!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                🏆 {t("진짜 실전 — USACO Bronze/Silver 문제. ", "Real combat — USACO Bronze/Silver problems. ")}
                <Link href="/quest" className="font-bold underline hover:text-blue-900">{t("Quest 페이지 →", "Quest page →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음 알고리즘 토픽 보기 (그리디, 백트래킹...). ", "Browse next topics (greedy, backtracking...). ")}
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-2.5">
        <div className="max-w-md mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => step < totalSteps - 1 ? setStep(step + 1) : onComplete()}
            className="flex-[2] py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95">
            {step === totalSteps - 1
              ? <>🎉 {t("DP 마스터!", "DP Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function DpPage() {
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
          user_id: user.id, lesson_id: "algo-dp", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-dp")) {
          arr.push("algo-dp")
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
              { label: "동적 프로그래밍", labelEn: "Dynamic Programming", emoji: "🧩" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🧩</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("동적 프로그래밍 (DP)", "Dynamic Programming")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver/Gold 핵심", "Silver/Gold core")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
            <div className="flex bg-gray-100 rounded-md p-0.5 gap-0.5 shrink-0 ml-auto">
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

          {isMastered && (
            <Link href="/algo/dp"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("DP 문제 — 표를 손으로 채워보며!", "DP problems — fill the table by hand!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("DP 마스터!", "DP Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("이론 끝. 이제 직접 풀어볼 시간! 👇", "Theory done. Now solve real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/quest" className="block px-4 py-2 bg-white hover:bg-amber-50 text-amber-700 rounded-xl font-bold text-sm text-center border-2 border-amber-200">
                🏆 {t("USACO Quest — 실전 DP 문제", "USACO Quest — real DP problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
