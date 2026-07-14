"use client"

/**
 * 이분탐색 (Binary Search) — 챕터식 학습 페이지 v1.
 *
 * Wave 2 — Silver 필수 토픽. 정렬된 배열에서 O(log N) 검색.
 * 비유 (사전 찾기, up&down) → 기본 이분탐색 → lower_bound → parametric search → 정리.
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
  { id: 1, emoji: "🎯", title: "왜 이분탐색?",                titleEn: "Why Binary Search?",        mins: 3 },
  { id: 2, emoji: "📐", title: "기본 이분탐색",                titleEn: "Basic Binary Search",        mins: 6 },
  { id: 3, emoji: "🔍", title: "lower_bound — 첫 ≥ x 위치",    titleEn: "lower_bound — first ≥ x",    mins: 7 },
  { id: 4, emoji: "⚖️", title: "Parametric Search (답에 이분탐색)", titleEn: "Parametric Search",     mins: 8 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",                  titleEn: "Recap & Side paths",         mins: 5 },
]

const STORAGE_KEY = "algo-binarysearch-chapter"

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

// ── Chapter 1: 왜 이분탐색? ──────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">😊</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("안녕! 이분탐색 같이 가요", "Hi! Binary search — together")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs text-amber-700 font-bold mb-1">📚 {t("사실 우린 평생 이분탐색 해 왔어요", "We've all done this our whole lives")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "두꺼운 사전에서 'banana' 찾기? 가운데 펴고 — b 보다 앞? 뒤? 또 반 — 그렇게 찾아요. 한 장씩 안 넘기죠.",
                  "Finding 'banana' in a thick dictionary? Open the middle — before b? after? — halve again. Nobody flips page by page.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유 2", "Analogy 2")}:</b>{" "}
              {t(
                "Up & Down 게임. 1~100 사이 숫자 — 50 부터 시작. '업!' → 75. '다운!' → 62... ",
                "Up & Down game. Pick 1–100 — guess 50. 'Up!' → 75. 'Down!' → 62...",
              )}
              <b className="text-orange-700">{t("매번 반씩 줄여요.", "Halve every guess.")}</b>
            </p>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800 text-center">
                💛 {t("이게 ", "This is ")}<b>{t("이분탐색", "binary search")}</b>{t(". 익숙한 거예요 — 코드로 옮기는 것만!", ". You know it already — just put it in code!")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("O(log N) — 말도 안 되게 빠름", "O(log N) — insanely fast")}
            </h3>
            <div className="bg-white rounded-lg p-3 border-2 border-rose-200 mb-3">
              <p className="text-sm font-black text-rose-800 mb-1">
                🐢 {t("처음부터 하나씩 찾기 — O(N)", "Scan one by one — O(N)")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "N=10억 이면 10억 번 비교. 1 초 넘어요. 망함.",
                  "N=1 billion → 1 billion compares. Over 1 second. Dead.",
                )}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-emerald-200 mb-3">
              <p className="text-sm font-black text-emerald-800 mb-1">
                ⚡ {t("반씩 줄이기 — O(log N)", "Halve each time — O(log N)")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "N=10억 → 9 → 4 → 2 → 1. ",
                  "N=1 billion → 9 → 4 → 2 → 1. ",
                )}<b className="text-emerald-700">{t("약 30 번", "About 30 steps")}</b>{t(
                  "이면 끝. 한 순간!",
                  ". Instant!",
                )}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border-2 border-amber-300">
              <p className="text-sm font-bold text-amber-900 mb-1">⚠️ {t("단, 조건 하나", "But — one condition")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "배열이 ",
                  "The array must be ",
                )}<b className="text-amber-800">{t("정렬되어 있어야", "sorted")}</b>{t(
                  " 해요. 안 정렬이면? 가운데 봐도 어느 쪽에 있는지 모름.",
                  ". Otherwise the middle tells you nothing.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 패턴", "3 patterns we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩.", "Preview — one per chapter next.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📐 1. {t("기본 이분탐색 — 값 찾기", "Basic — find a value")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "정렬된 배열에서 'x 가 있나?' 그대로. (챕터 2)",
                    "In a sorted array — 'is x here?'. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔍 2. {t("lower_bound — 첫 ≥ x 위치", "lower_bound — first ≥ x")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "중복 있을 때 첫 위치, 또는 'x 가 들어갈 자리'. (챕터 3)",
                    "First spot of a duplicate, or 'where x would go'. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⚖️ 3. {t("Parametric — 답 자체에 이분탐색", "Parametric — binary search on the answer")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "'최대 ? 가능?' 같은 문제를 결정문제로. USACO 단골! (챕터 4)",
                    "Turn 'max ?' problems into yes/no decisions. USACO classic! (Ch 4)",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("천천히 가요. 다음 챕터부터! →", "Slowly. Onward! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 기본 이분탐색 ─────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: [1,3,5,7,9,11,13,15] 에서 7 찾기
  const arr = [1, 3, 5, 7, 9, 11, 13, 15]
  const target = 7
  // 단계별 (low, high) — 시작은 (0, 7).
  // mid=3, arr[3]=7 == target → 찾음 (1 스텝!)
  // 학생에게 더 흥미롭게 — target 을 11 로 바꾸자.
  const target2 = 11
  // (0,7) mid=3 arr[3]=7 < 11 → low=4
  // (4,7) mid=5 arr[5]=11 == 11 → 찾음!
  const steps = [
    { low: 0, high: 7, mid: 3, midVal: 7, action: "less" as const, msg: t("arr[3] = 7. 7 < 11 → 오른쪽! low = 4", "arr[3] = 7. 7 < 11 → right! low = 4") },
    { low: 4, high: 7, mid: 5, midVal: 11, action: "found" as const, msg: t("arr[5] = 11. 찾았다! ✅", "arr[5] = 11. Found! ✅") },
  ]
  const [si, setSi] = useState(0)
  const stepFwd = () => { if (si < steps.length) setSi(si + 1) }
  const stepReset = () => setSi(0)
  // visible state: if si=0, show initial low=0..high=7 (no mid). If si=1, show after step 0. If si=2, found.
  const curView = si === 0
    ? { low: 0, high: 7, mid: -1, midVal: -1, action: "init" as const }
    : steps[si - 1]
  const isFound = si === 2

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("3 개 변수 — low / high / mid", "3 variables — low / high / mid")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "정렬된 배열에서 x 를 찾아요. low = 왼쪽 끝, high = 오른쪽 끝. 가운데 mid = (low + high) // 2 봐요.",
                "Find x in a sorted array. low = left edge, high = right edge. Check the middle mid = (low + high) // 2.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("알고리즘 한 눈에", "Algorithm at a glance")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`low, high = 0, len(arr) - 1
while low <= high:
    mid = (low + high) // 2
    if arr[mid] == x:    return mid     ← 찾음!
    elif arr[mid] < x:   low  = mid + 1 ← 오른쪽 절반
    else:                high = mid - 1 ← 왼쪽 절반
return -1                                ← 없음`}
              </pre>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("핵심: 매 비교 후 — 범위가 *반으로* 줄어요.", "Key: after each compare — range *halves*.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("11 찾기 — low/high/mid 한 칸씩", "Find 11 — step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`arr = [1,3,5,7,9,11,13,15], target = 11`, `arr = [1,3,5,7,9,11,13,15], target = 11`)}
            </p>
            <div className="grid grid-cols-8 gap-1 mb-3">
              {arr.map((v, i) => {
                const inRange = i >= curView.low && i <= curView.high
                const isMid = i === curView.mid
                const isLow = i === curView.low
                const isHigh = i === curView.high
                const isTarget = isFound && v === target2
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={cn(
                      "w-full aspect-square rounded-md border-2 flex items-center justify-center font-mono text-xs font-bold transition-all",
                      isTarget && "bg-emerald-200 border-emerald-500 text-emerald-900 scale-110",
                      !isTarget && isMid && "bg-amber-300 border-amber-600 text-amber-900",
                      !isTarget && !isMid && inRange && "bg-blue-100 border-blue-300 text-blue-800",
                      !isTarget && !isMid && !inRange && "bg-gray-100 border-gray-300 text-gray-400 line-through",
                    )}>
                      {v}
                    </div>
                    <div className="text-[9px] font-bold mt-0.5 h-3">
                      {isLow && isHigh && <span className="text-purple-700">L=H</span>}
                      {isLow && !isHigh && <span className="text-blue-600">L</span>}
                      {isHigh && !isLow && <span className="text-rose-600">H</span>}
                    </div>
                    <div className="text-[9px] text-gray-400">{i}</div>
                  </div>
                )
              })}
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {si === 0 && t("▶ 시작! low=0, high=7. 스텝 눌러요.", "▶ Start! low=0, high=7. Press step.")}
                {si > 0 && !isFound && steps[si - 1].msg}
                {isFound && <b className="text-emerald-700">{steps[si - 1].msg}</b>}
              </p>
              {si > 0 && (
                <p className="text-[11px] text-cyan-700 mt-1">
                  {t("비교 횟수", "Compares")}: <b>{si}</b> {t("vs 처음부터", "vs linear")}: <b>6</b>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={stepFwd} disabled={isFound}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={stepReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-3 text-center leading-relaxed">
              {t(
                "단 2 번 비교로 찾음! 처음부터면 6 번 봤어요.",
                "Found in just 2 compares! Linear scan would take 6.",
              )}
            </p>

            {/* 없는 값 케이스 — off-by-one 핵심 */}
            <div className="bg-rose-50 rounded-lg p-3 border-2 border-rose-200 mt-3">
              <p className="text-sm font-black text-rose-800 mb-2">🚫 {t("그럼 없는 값은? — 예: 4 찾기", "What if it's not there? — e.g. find 4")}</p>
              <pre className="text-[11px] text-gray-800 font-mono leading-relaxed whitespace-pre-wrap">
{t(
`(0,7) mid=3 arr[3]=7 > 4 → high=2  (왼쪽)
(0,2) mid=1 arr[1]=3 < 4 → low=2   (오른쪽)
(2,2) mid=2 arr[2]=5 > 4 → high=1  (왼쪽)
이제 low=2 > high=1 → 범위가 사라짐 → return -1`,
`(0,7) mid=3 arr[3]=7 > 4 → high=2  (left)
(0,2) mid=1 arr[1]=3 < 4 → low=2   (right)
(2,2) mid=2 arr[2]=5 > 4 → high=1  (left)
now low=2 > high=1 → range is empty → return -1`,
)}
              </pre>
              <p className="text-[11px] text-rose-800 leading-relaxed mt-2">
                {t(
                  "포인트 ①: while 조건이 ",
                  "Point ①: the while condition is ",
                )}<b>{t("low ≤ high (=)", "low ≤ high (=)")}</b>{t(
                  " 라서 low=high 인 칸 1 개짜리 범위도 한 번 더 확인해요. low > high 가 되는 그 순간 = '없음' 확정 → return -1.",
                  " — so even a 1-cell range (low=high) gets checked once more. The instant low > high, the range is empty = 'not found' → return -1.",
                )}
              </p>
              <p className="text-[11px] text-rose-800 leading-relaxed mt-1.5">
                {t(
                  "포인트 ②: mid 는 이미 봤으니 다시 넣지 않아요 — 그래서 ",
                  "Point ②: mid is already checked, so we never re-include it — that's why ",
                )}<b>{t("low = mid + 1", "low = mid + 1")}</b>{t(" / ", " / ")}<b>{t("high = mid − 1", "high = mid − 1")}</b>{t(
                  ". +1 / −1 을 빠뜨리면 같은 칸을 무한 반복해요 (off-by-one 최대 함정).",
                  ". Forget the +1 / −1 and you loop forever on the same cell (the #1 off-by-one trap).",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 기본 이분탐색", "Code — basic binary search")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("C++ 은 std::lower_bound 같은 STL 이 있지만 — 직접 짜는 법도 알아두세요.", "C++ has std::lower_bound in STL — but learn to write it by hand too.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def binary_search(arr, x):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            low = mid + 1       # 오른쪽 절반
        else:
            high = mid - 1      # 왼쪽 절반
    return -1                    # 못 찾음

arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 11))   # 5
print(binary_search(arr, 4))    # -1`}
              cpp={`#include <iostream>
#include <vector>
#include <algorithm>    // lower_bound, binary_search
using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};

    // STL 한 줄 (있나만 확인)
    bool found = binary_search(arr.begin(), arr.end(), 11);   // true

    // 위치까지 — lower_bound 활용
    auto it = lower_bound(arr.begin(), arr.end(), 11);
    int idx = it - arr.begin();   // 5

    cout << found << " " << idx << endl;
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: low + high 가 큰 수면 오버플로우 위험 — C++ 에선 mid = low + (high - low) / 2 추천.",
                "Pitfall: low + high may overflow with big numbers in C++ — prefer mid = low + (high - low) / 2.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "N = 10억 (10^9) 개 원소 정렬된 배열에서 이분탐색 — 최대 비교 횟수는?",
              "Sorted array of N = 1 billion (10^9). Max compares in binary search?",
            )}
            options={[
              t("~30 번", "~30"),
              t("~100 번", "~100"),
              t("~1000 번", "~1000"),
              t("~10억 번", "~1 billion"),
            ]}
            answerIdx={0}
            hint={t(
              "log₂(10^9) ≈ 30. 매 비교마다 범위가 *반* 으로 줄어들기 때문이에요. 2^30 ≈ 10억.",
              "log₂(10^9) ≈ 30. Range halves every step. 2^30 ≈ 1 billion.",
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

// ── Chapter 3: lower_bound ──────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: [1,3,3,3,5,7] 에서 lower_bound(3) 찾기
  const arr = [1, 3, 3, 3, 5, 7]
  // arr.length=6. low=0, high=6 (반열린 구간).
  // (0,6) mid=3 arr[3]=3 >= 3 → high=3
  // (0,3) mid=1 arr[1]=3 >= 3 → high=1
  // (0,1) mid=0 arr[0]=1 <  3 → low=1
  // low == high == 1 → return 1
  const lbSteps = [
    { low: 0, high: 6, mid: 3, midVal: 3, msg: t("arr[3] = 3 ≥ 3 → high = 3 (왼쪽 절반)", "arr[3] = 3 ≥ 3 → high = 3 (left half)") },
    { low: 0, high: 3, mid: 1, midVal: 3, msg: t("arr[1] = 3 ≥ 3 → high = 1 (더 왼쪽)", "arr[1] = 3 ≥ 3 → high = 1 (further left)") },
    { low: 0, high: 1, mid: 0, midVal: 1, msg: t("arr[0] = 1 < 3 → low = 1", "arr[0] = 1 < 3 → low = 1") },
    { low: 1, high: 1, mid: -1, midVal: -1, msg: t("low = high = 1 → 결과: idx 1 ✅", "low = high = 1 → result: idx 1 ✅") },
  ]
  const [si, setSi] = useState(0)
  const stepFwd = () => { if (si < lbSteps.length) setSi(si + 1) }
  const stepReset = () => setSi(0)
  const curView = si === 0
    ? { low: 0, high: 6, mid: -1, midVal: -1 }
    : lbSteps[si - 1]
  const isDone = si === lbSteps.length

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔍</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("기본만으론 부족할 때가 있어요", "Basic isn't always enough")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-rose-700">{t("문제 1", "Problem 1")}:</b>{" "}
              {t(
                "arr = [1, 3, 3, 3, 5, 7]. '3' 의 ",
                "arr = [1, 3, 3, 3, 5, 7]. Find the ",
              )}<b>{t("첫 위치", "first position")}</b>{t(
                " 는? 기본 이분탐색은 어느 3 든 멈춰버려요. 운에 맡김.",
                " of 3. Basic binary search stops at *any* 3 — luck-based.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-rose-700">{t("문제 2", "Problem 2")}:</b>{" "}
              {t(
                "arr 가 정렬돼 있는데 6 을 *삽입* 하려면 어디? 5 와 7 사이 — idx 5.",
                "arr is sorted. To *insert* 6 keeping it sorted — where? Between 5 and 7 → idx 5.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-rose-200">
              <p className="text-sm font-bold text-rose-800 mb-1">💡 {t("해결: lower_bound", "Answer: lower_bound")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "lower_bound(x) = ",
                  "lower_bound(x) = ",
                )}<b>{t("처음으로 x 이상이 나오는 위치", "first index where value ≥ x")}</b>{t(
                  ". 중복의 첫 위치 / 삽입 위치 — 둘 다 풀려요.",
                  ". Solves both — first duplicate AND insert position.",
                )}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200 mt-3">
              <p className="text-sm font-bold text-indigo-800 mb-1">📏 {t("왜 high = len (반열린 구간)?", "Why high = len (half-open)?")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "기본 이분탐색은 '값을 찾으면 멈춤' 이라 high = len-1 (닫힌 구간) 이면 됐어요. 하지만 lower_bound 의 답은 '마지막 칸 다음' 일 수도 있어요 — 예: 모든 값이 x 보다 작으면 답은 len. 그래서 ",
                  "Basic search stops the moment it finds the value, so high = len-1 (closed) was fine. But lower_bound's answer can be 'one past the last cell' — e.g. if every value < x, the answer is len. So we keep ",
                )}<b className="text-indigo-800">{t("high = len 으로 시작", "high = len")}</b>{t(
                  " 해서 그 자리까지 후보로 남겨둬요. 구간은 ",
                  " as a reachable candidate. The range is ",
                )}<b>{t("[low, high)", "[low, high)")}</b>{t(
                  " — low 는 포함, high 는 제외.",
                  " — low included, high excluded.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("lower_bound(3) — 한 칸씩", "lower_bound(3) — step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`arr = [1,3,3,3,5,7] — 첫 3 의 위치를 찾아요`, `arr = [1,3,3,3,5,7] — find first 3`)}
            </p>
            <div className="grid grid-cols-6 gap-1 mb-3">
              {arr.map((v, i) => {
                const inRange = i >= curView.low && i < curView.high
                const isMid = i === curView.mid
                const isLow = i === curView.low
                const isHigh = i === curView.high
                const isAns = isDone && i === 1
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={cn(
                      "w-full aspect-square rounded-md border-2 flex items-center justify-center font-mono text-xs font-bold transition-all",
                      isAns && "bg-emerald-200 border-emerald-500 text-emerald-900 scale-110",
                      !isAns && isMid && "bg-amber-300 border-amber-600 text-amber-900",
                      !isAns && !isMid && inRange && "bg-blue-100 border-blue-300 text-blue-800",
                      !isAns && !isMid && !inRange && "bg-gray-100 border-gray-300 text-gray-400 line-through",
                    )}>
                      {v}
                    </div>
                    <div className="text-[9px] font-bold mt-0.5 h-3">
                      {isLow && isHigh && <span className="text-purple-700">L=H</span>}
                      {isLow && !isHigh && <span className="text-blue-600">L</span>}
                      {isHigh && !isLow && <span className="text-rose-600">H</span>}
                    </div>
                    <div className="text-[9px] text-gray-400">{i}</div>
                  </div>
                )
              })}
            </div>
            <div className="bg-rose-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-rose-800">
                {si === 0 && t("▶ 시작! low=0, high=6 (반열린 구간). 스텝!", "▶ Start! low=0, high=6 (half-open). Press step!")}
                {si > 0 && !isDone && curView && lbSteps[si - 1].msg}
                {isDone && <b className="text-emerald-700">{lbSteps[lbSteps.length - 1].msg}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={stepFwd} disabled={isDone}
                className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={stepReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-3 text-center leading-relaxed">
              {t(
                "포인트: arr[mid] ≥ 3 이어도 *멈추지 않고* high 만 줄여요. low = high 가 되면 그 자리가 답.",
                "Trick: even when arr[mid] ≥ 3 we *don't stop* — just shrink high. When low = high, that's the answer.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 먼저 직접 짜보기", "Code — write it by hand first")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("반열린 구간이라 while 조건이 low < high (= 없음). 찾아도 멈추지 않고 high만 당겨요.", "Half-open range → while uses low < high (no =). Don't stop on a match — just pull high in.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def lower_bound(arr, x):
    low, high = 0, len(arr)      # high = len (반열린)
    while low < high:            # = 없음!
        mid = (low + high) // 2
        if arr[mid] < x:
            low = mid + 1        # mid 는 너무 작음 → 버림
        else:
            high = mid           # mid 는 후보 → 남김 (-1 아님!)
    return low                   # low == high = 답

arr = [1, 3, 3, 3, 5, 7]
print(lower_bound(arr, 3))   # 1
print(lower_bound(arr, 6))   # 5 (삽입 위치)`}
              cpp={`// 직접 구현 — 반열린 구간 [low, high)
int lower_bound_by_hand(const vector<int>& arr, int x) {
    int low = 0, high = arr.size();   // high = len
    while (low < high) {              // = 없음!
        int mid = low + (high - low) / 2;
        if (arr[mid] < x)
            low = mid + 1;            // 너무 작음 → 버림
        else
            high = mid;               // 후보 → 남김 (mid-1 아님!)
    }
    return low;                       // low == high = 답
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "기본 이분탐색과 두 곳만 달라요: ① while 이 < (≤ 아님) ② else 에서 high = mid (high = mid-1 아님 — mid 도 답일 수 있으니까).",
                "Only two differences from basic search: ① while uses < (not ≤) ② else does high = mid (not mid-1 — mid itself may be the answer).",
              )}
            </p>

            <div className="bg-emerald-50 rounded-2xl p-3 border-2 border-emerald-200 mt-4">
              <p className="text-sm font-black text-emerald-900">⚡ {t("실전에선 — 이거 한 줄", "In practice — one line")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("Python 은 bisect 모듈, C++ 은 std::lower_bound. 직접 짜본 그 로직이 STL 한 줄에 들어있어요.", "Python: bisect. C++: std::lower_bound. The hand-written logic is exactly what these one-liners do.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`from bisect import bisect_left, bisect_right

arr = [1, 3, 3, 3, 5, 7]

# 첫 3 의 위치
print(bisect_left(arr, 3))    # 1   (lower_bound)

# 마지막 3 다음 위치
print(bisect_right(arr, 3))   # 4   (upper_bound)

# 3 의 개수 — upper - lower
print(bisect_right(arr, 3) - bisect_left(arr, 3))  # 3

# 6 을 삽입할 위치
print(bisect_left(arr, 6))    # 5`}
              cpp={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {1, 3, 3, 3, 5, 7};

    // 첫 3 의 위치
    auto lo = lower_bound(arr.begin(), arr.end(), 3);
    cout << (lo - arr.begin()) << endl;   // 1

    // 마지막 3 다음 위치
    auto hi = upper_bound(arr.begin(), arr.end(), 3);
    cout << (hi - arr.begin()) << endl;   // 4

    // 3 의 개수
    cout << (hi - lo) << endl;            // 3
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "활용 1순위: '정렬된 배열에서 x 의 개수' = upper_bound - lower_bound.",
                "Top use: 'count of x in sorted array' = upper_bound - lower_bound.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "정렬된 배열에서 값 x 의 *개수* 를 가장 빠르게 구하려면?",
              "Fastest way to count occurrences of value x in a sorted array?",
            )}
            options={[
              t("전체를 처음부터 세기", "Linear scan"),
              t("lower_bound(x) 두 번 호출", "Call lower_bound(x) twice"),
              t("upper_bound(x) - lower_bound(x)", "upper_bound(x) - lower_bound(x)"),
              t("그냥 binary_search(x) 한 번", "Just one binary_search(x)"),
            ]}
            answerIdx={2}
            hint={t(
              "lower_bound = 첫 x 위치, upper_bound = 마지막 x 다음 위치. 두 값을 빼면 정확히 x 개수. 둘 다 O(log N).",
              "lower_bound = first x. upper_bound = past-last x. Subtract → exact count. Both O(log N).",
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

// ── Chapter 4: Parametric Search ────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 나무 자르기 (BOJ 2805 축약)
  // 나무 높이 [20, 15, 10, 17]. 필요 길이 m = 7.
  // h 에서 자르면 얻는 길이 합. 최대 h?
  const trees = [20, 15, 10, 17]
  const required = 7
  const cut = (h: number) => trees.reduce((s, t) => s + Math.max(0, t - h), 0)
  // low=0, high=20.
  // (0,20) mid=10 cut(10)=10+5+0+7=22 ≥ 7 → ans=10, low=11
  // (11,20) mid=15 cut(15)=5+0+0+2=7 ≥ 7 → ans=15, low=16
  // (16,20) mid=18 cut(18)=2+0+0+0=2 < 7 → high=17
  // (16,17) mid=16 cut(16)=4+0+0+1=5 < 7 → high=15
  // low>high → stop. ans=15.
  const psSteps = [
    { low: 0, high: 20, mid: 10, got: cut(10), ok: true,  ans: 10, msg: t("h=10 → 길이 22 ≥ 7 ✅ → 답 후보 10, low=11", "h=10 → got 22 ≥ 7 ✅ → ans=10, low=11") },
    { low: 11, high: 20, mid: 15, got: cut(15), ok: true,  ans: 15, msg: t("h=15 → 길이 7 ≥ 7 ✅ → 답 후보 15, low=16", "h=15 → got 7 ≥ 7 ✅ → ans=15, low=16") },
    { low: 16, high: 20, mid: 18, got: cut(18), ok: false, ans: 15, msg: t("h=18 → 길이 2 < 7 ❌ → high=17", "h=18 → got 2 < 7 ❌ → high=17") },
    { low: 16, high: 17, mid: 16, got: cut(16), ok: false, ans: 15, msg: t("h=16 → 길이 5 < 7 ❌ → high=15. low>high 종료. 답 = 15 ✅", "h=16 → got 5 < 7 ❌ → high=15. low>high stop. ans=15 ✅") },
  ]
  const [si, setSi] = useState(0)
  const stepFwd = () => { if (si < psSteps.length) setSi(si + 1) }
  const stepReset = () => setSi(0)
  const cur = si === 0 ? null : psSteps[si - 1]
  const isDone = si === psSteps.length

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚖️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("답 자체에 이분탐색", "Binary search on the answer")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-amber-700">{t("문제 (나무 자르기, BOJ 2805)", "Problem (Cut trees, BOJ 2805)")}:</b>{" "}
              {t(
                "나무 높이 [20, 15, 10, 17]. 톱 높이 h 에서 잘라요. 얻는 나무 길이의 ",
                "Tree heights [20, 15, 10, 17]. Cut at saw height h. Sum of harvested wood ≥ ",
              )}<b>{t("합 ≥ 7", "7")}</b>{t(
                " 이 되는 ",
                ". Find the ",
              )}<b className="text-amber-700">{t("최대 h", "maximum h")}</b>{t(".", ".")}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("핵심 발상", "Key insight")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "'최대 h?' 는 어려워요. 하지만 'h=10 가능?' 같은 ",
                  "'Max h?' is hard. But 'is h=10 OK?' is just ",
                )}<b>{t("YES/NO", "YES/NO")}</b>{t(
                  " 결정문제 — 쉬워요.",
                  " — easy.",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "그리고 ",
                  "And — ",
                )}<b className="text-amber-800">{t("h 가 작을수록 OK, h 가 클수록 NOT OK", "smaller h is OK, larger h fails")}</b>{t(
                  " — 즉 단조 (monotonic). 그래서 가능 h 범위에 이분탐색!",
                  " — monotonic! So binary search the h range!",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-amber-700 text-center">
              {t("패턴: '최대/최소 X' → '결정문제 + monotonic' 만 만들면 — 이분탐색!", "Pattern: 'max/min X' → 'decision + monotonic' → binary search!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("나무 자르기 — h 후보 좁히기", "Cut trees — narrow h candidates")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`trees = [20,15,10,17], 필요 = 7. low=0, high=20.`, `trees = [20,15,10,17], need = 7. low=0, high=20.`)}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[120px]">
              {!cur ? (
                <p className="text-xs text-gray-500 text-center py-4">{t("▶ 스텝 눌러 시작!", "▶ Press step to begin!")}</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono">
                    <span className="bg-blue-100 px-2 py-1 rounded">low={cur.low}</span>
                    <span className="bg-amber-200 px-2 py-1 rounded font-bold">mid={cur.mid}</span>
                    <span className="bg-rose-100 px-2 py-1 rounded">high={cur.high}</span>
                  </div>
                  <div className="text-center text-xs font-mono">
                    {t("h=", "h=")}{cur.mid}{t(" 에서 자름 → 얻은 길이 = ", " → got ")}<b>{cur.got}</b>
                    {cur.ok ? <span className="text-emerald-700 font-bold"> ≥ 7 ✅</span>
                            : <span className="text-rose-700 font-bold"> {`< 7 ❌`}</span>}
                  </div>
                  <div className="text-center text-[11px] text-gray-600">
                    {t("현재 답 후보", "Best so far")}: <b className="text-amber-700">h = {cur.ans}</b>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-amber-800">
                {!cur && t("▶ 시작!", "▶ Start!")}
                {cur && !isDone && cur.msg}
                {isDone && <b className="text-emerald-700">{psSteps[psSteps.length - 1].msg}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={stepFwd} disabled={isDone}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={stepReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-3 text-center leading-relaxed">
              {t(
                "OK 일 때만 답 갱신 + low 더 위로. NOT OK 면 high 더 아래로. 단조성이라 가능!",
                "Update ans + push low up only when OK. Push high down when NOT OK. Monotonic makes this work!",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 나무 자르기", "Code — cut trees")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("핵심 두 줄: can(mid) 결정 함수 + 이분탐색 외곽.", "Two key pieces: decision function can(mid) + binary search outside.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`trees = [20, 15, 10, 17]
m = 7

def can(h):                       # 결정문제: h 가 가능한가?
    return sum(max(0, t - h) for t in trees) >= m

low, high, ans = 0, max(trees), 0
while low <= high:
    mid = (low + high) // 2
    if can(mid):                  # 가능 → 더 높여보기
        ans = mid
        low = mid + 1
    else:                         # 불가능 → 낮춰야
        high = mid - 1

print(ans)   # 15`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

vector<int> trees = {20, 15, 10, 17};
long long m = 7;

bool can(int h) {                    // 결정문제
    long long sum = 0;
    for (int t : trees) sum += max(0, t - h);
    return sum >= m;
}

int main() {
    int low = 0, high = 20, ans = 0;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (can(mid)) {              // OK → 더 위로
            ans = mid;
            low = mid + 1;
        } else {                     // NG → 더 아래로
            high = mid - 1;
        }
    }
    cout << ans << endl;   // 15
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "Parametric search 의 핵심 = 결정문제 can(x) 가 단조 (monotonic) 인지 확인. 단조성 없으면 못 씀!",
                "Parametric search's key = make sure can(x) is monotonic. No monotonicity → no parametric search!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Parametric search (답에 이분탐색) 를 쓸 수 있는 가장 중요한 조건은?",
              "What's the *most important* condition for parametric search to work?",
            )}
            options={[
              t("배열이 정렬되어 있어야", "Input array must be sorted"),
              t("결정함수 can(x) 가 단조 (monotonic) 이어야", "Decision function can(x) must be monotonic"),
              t("가능한 K 의 개수를 셀 수 있어야", "Must count number of valid K"),
              t("결정문제로 변환만 되면 됨", "Just need to convert to a decision problem"),
            ]}
            answerIdx={1}
            hint={t(
              "단조성 = 'h 가 OK 면 그보다 작은 h 도 OK', 또는 반대 방향. 이게 보장돼야 이분탐색이 답을 놓치지 않아요. 정렬은 기본 이분탐색에서만 필요.",
              "Monotonic = 'if h OK then smaller h is OK too' (or vice versa). Without this, binary search misses the answer. Array sorting is only for basic binary search.",
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
            <p className="text-5xl text-center mb-3">👏</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이분탐색 마스터!", "Binary Search Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "수고했어요. 이제 'O(log N)' 라는 강력한 도구가 손에 잡혔어요. USACO Silver 문제에 매우 자주 나와요! 🎉",
                "Well done. You've got the powerful 'O(log N)' tool now. Shows up in USACO Silver constantly! 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-base font-black text-amber-900 mb-2">📌 {t("핵심 정리 4 가지", "4 Key Takeaways")}</p>
              <ol className="space-y-2 text-sm text-gray-800">
                <li><b>1.</b> {t("기본 이분탐색은 ", "Basic binary search needs a ")}<b>{t("정렬된 배열 전제", "sorted array")}</b>{t(". O(log N).", ". O(log N).")}</li>
                <li><b>2.</b> <b>lower_bound(x)</b> = {t("첫 ≥ x 위치 — 중복 처리, 삽입 위치", "first index ≥ x — duplicates, insertion point")}</li>
                <li><b>3.</b> <b>upper_bound(x)</b> = {t("첫 > x 위치 — 개수는 upper - lower", "first index > x — count = upper - lower")}</li>
                <li><b>4.</b> <b>{t("Parametric Search", "Parametric Search")}</b>: {t("최대/최소 → 결정문제 + ", "max/min → decision + ")}<b>{t("단조성 (monotonic)", "monotonic")}</b></li>
              </ol>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-300">
            <h3 className="text-base font-black text-blue-900 mb-3">🗺️ {t("다음 어디로?", "Where next?")}</h3>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              {t(
                "이분탐색 — 한 토픽인데 활용처가 엄청 많아요. 어디서 더 연습하면 좋을까?",
                "Binary search is one topic with huge range. Here's where to practice more.",
              )}
            </p>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🧩 {t("다음 알고리즘 토픽", "Next algorithm topic")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  {t(
                    "그리디 / DP / 그래프 — 이분탐색과 자주 *섞여요*.",
                    "Greedy / DP / Graph — often *combine* with binary search.",
                  )}
                </p>
                <Link href="/algo" className="text-xs font-bold text-purple-700 underline hover:text-purple-900">
                  {t("알고리즘 지도 →", "Algo map →")}
                </Link>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  🏆 {t("바로 실전? USACO Bronze/Silver", "Ready? USACO Bronze/Silver")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  {t(
                    "이분탐색 단골 문제들 — 실전에서 검증해봐요.",
                    "Binary search regulars — test it on real contest problems.",
                  )}
                </p>
                <Link href="/quest" className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900">
                  {t("Quest 도전 →", "Quest →")}
                </Link>
              </div>
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
              ? <>🎉 {t("이분탐색 마스터!", "Binary Search Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function BinarySearchPage() {
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
        // mastered 는 실제로 모든 챕터가 완료된 경우에만 인정 (구버전 stale 데이터 방지)
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
          user_id: user.id, lesson_id: "algo-binarysearch", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-binarysearch")) {
          arr.push("algo-binarysearch")
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
              { label: "이분탐색", labelEn: "Binary Search", emoji: "🎯" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🎯</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("이분탐색", "Binary Search")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver 필수", "Silver core")}</span>
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
            <Link href="/algo/binarysearch"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("이분탐색 문제 12 개 — 실전 감각 익혀요!", "12 binary search challenges — build your instinct!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("이분탐색 마스터!", "Binary Search Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
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
