"use client"

/**
 * 그리디 (Greedy) — 챕터식 학습 페이지 v1.
 *
 * Wave 2 — 정렬 + 1-pass 패턴. "지금 가장 좋아 보이는 선택" 반복.
 * 비유 (잔돈) → 활동 선택 → 동전 거스름 → 정렬+누적 → 정리.
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
  { id: 1, emoji: "💡", title: "왜 그리디?",                titleEn: "Why Greedy?",                  mins: 3 },
  { id: 2, emoji: "📅", title: "활동 선택",                 titleEn: "Interval Scheduling",          mins: 7 },
  { id: 3, emoji: "🪙", title: "동전 거스름",               titleEn: "Coin Change (Greedy)",         mins: 6 },
  { id: 4, emoji: "📊", title: "정렬 + 누적 패턴",          titleEn: "Sort + Accumulate",            mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",                titleEn: "Recap & Next",                 mins: 5 },
]

const STORAGE_KEY = "algo-greedy-chapter"

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

// ── Chapter 1: 왜 그리디? ─────────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪙</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("잔돈 거슬러 줄 때 — 큰 동전부터", "Making change — biggest coin first")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "730 원을 거슬러줘야 해요. 어떻게 해요? 500 원 하나, 100 원 두 개, 10 원 세 개. 누구나 그렇게 줘요.",
                "You owe 730₩ change. How? One 500, two 100s, three 10s. Everyone does it that way.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "왜? — 매 순간 ",
                "Why? — at each step, ",
              )}<b className="text-orange-700">{t("가장 큰 동전부터 최대한 많이 쓰면", "use the biggest coin as much as possible")}</b>{t(
                " — 자연스럽게 *최소 개수* 나와요. 이게 그리디.",
                " — naturally yields the *fewest* coins. That's greedy.",
              )}
            </p>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800 text-center">
                💡 {t("그리디 = ", "Greedy = ")}<b>{t("\"지금 가장 좋아 보이는 선택\"", "\"the best-looking choice right now\"")}</b>{" "}
                {t("반복.", "repeated.")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚠️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그런데 — 항상 최적은 아니에요", "But — not always optimal")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "잔돈을 거슬러주는 게 *항상* 큰 동전부터로 답이 되는 건 한국 화폐 단위가 잘 짜여 있어서예요. 다른 케이스에선 깨질 수도.",
                "Greedy giving change works for Korean coins because the denominations line up nicely. Other setups can break it.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-800 mb-1">💥 {t("깨지는 예", "Counter-example")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "동전 [1, 3, 4] 로 6 원 만들기. 그리디(큰 거부터): 4 + 1 + 1 = 3 개. 최적: 3 + 3 = 2 개. 그리디 *실패*.",
                  "Coins [1, 3, 4], make 6. Greedy: 4+1+1 = 3 coins. Optimal: 3+3 = 2 coins. Greedy *fails*.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "그래서 — 그리디는 ",
                "So — greedy is ",
              )}<b className="text-rose-700">{t("쉽지만 증명이 까다로워요", "easy to code but tricky to prove")}</b>{t(
                ". 반례(counter-example) 하나만 찾으면 깨져요.",
                ". One counter-example breaks it.",
              )}
            </p>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                💛 {t(
                  "이 토픽에선 그리디가 *잘 통하는* 표준 문제 3 가지를 봐요. 그 위에서 패턴을 익혀요.",
                  "In this topic we cover 3 classic problems where greedy *works*. Build intuition from those.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩 깊게.", "Preview — deep dive next.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📅 1. {t("활동 선택 (Interval Scheduling)", "Interval scheduling")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "N 개 회의 중 최대한 많이 잡기. *끝나는 시간* 빠른 것부터 그리디. (챕터 2)",
                    "Pick max non-overlapping meetings. Sort by *earliest end*, then greedy. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🪙 2. {t("동전 거스름 (큰 단위부터)", "Coin change (biggest first)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "비유 그대로. 단위가 서로 배수면 안전. 아니면 깨짐. (챕터 3)",
                    "Just like the analogy. Safe when denominations are multiples; otherwise breaks. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📊 3. {t("정렬 + 누적 패턴", "Sort + accumulate pattern")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "정렬해놓고 1-pass 로 합/카운트. 그리디 문제의 80% 모양. (챕터 4)",
                    "Sort + 1-pass sum/count. The shape of 80% of greedy problems. (Ch 4)",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("다음 챕터부터 본격! →", "Onward! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 활동 선택 (Interval Scheduling) ───────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 활동 선택 — 끝나는 시간 정렬 후 1-pass
  // 원본 (시작, 끝) 회의 11 개
  const meetings: { s: number; e: number }[] = [
    { s: 1, e: 4 }, { s: 3, e: 5 }, { s: 0, e: 6 }, { s: 5, e: 7 },
    { s: 3, e: 9 }, { s: 5, e: 9 }, { s: 6, e: 10 }, { s: 8, e: 11 },
    { s: 8, e: 12 }, { s: 2, e: 14 }, { s: 12, e: 16 },
  ]
  // 끝나는 시간 기준 정렬한 인덱스
  const sorted = [...meetings].sort((a, b) => a.e - b.e)
  // 그리디 결과 미리 계산: 각 sorted 인덱스마다 "선택됨" 여부 + 그 시점의 lastEnd
  const trace: { idx: number; picked: boolean; lastEnd: number }[] = []
  {
    let lastEnd = -1
    sorted.forEach((m, i) => {
      const picked = m.s >= lastEnd
      if (picked) lastEnd = m.e
      trace.push({ idx: i, picked, lastEnd })
    })
  }
  const [is2Idx, setIs2Idx] = useState(-1) // -1 = 시작 전
  const is2StepFn = () => { if (is2Idx < sorted.length - 1) setIs2Idx(is2Idx + 1) }
  const is2Reset = () => setIs2Idx(-1)
  const pickedCount = is2Idx >= 0 ? trace.slice(0, is2Idx + 1).filter(x => x.picked).length : 0

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📅</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("N 개 회의 — 겹치지 않게 최대 몇 개?", "N meetings — max non-overlapping count?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "회의실 하나. 시작/끝 시간이 적힌 회의 N 개. 겹치지 않게 최대한 많이 잡으려면?",
                "One room. N meetings each with start/end. Maximize how many you can fit without overlap.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-1">💡 {t("그리디 키", "Greedy key")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "회의를 ",
                  "Sort meetings by ",
                )}<b>{t("끝나는 시간이 빠른 순", "earliest end time")}</b>{t(
                  " 으로 정렬. 첫 회의 고름 → 그 다음부터 '시작 ≥ 직전 끝' 인 회의만 골라가요.",
                  ". Pick the first. Then keep picking the next meeting whose start ≥ previous end.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("끝나는 시간 빠른 회의를 먼저 끝내야 — *남은 시간이 길어져요*.", "Finishing early leaves *more room* for the rest.")}
            </p>
            <div className="bg-violet-50 rounded-lg p-3 border border-violet-200 mt-3">
              <p className="text-xs font-bold text-violet-800 mb-1">🔄 {t("왜 최적일까? — 바꿔치기 직관 (교환논증)", "Why optimal? — swap intuition (exchange argument)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "최적 답이 우리 그리디와 다른 회의를 첫 번째로 골랐다고 해봐요. 그 첫 회의를 '끝나는 시간이 가장 빠른 회의' 로 *바꿔치기* 해도 — 더 일찍 끝나니까 뒤 회의들이 들어갈 자리는 *오히려 더 넓어져요*. 즉 손해가 전혀 없어요. 그러니 끝나는 시간 가장 빠른 걸 첫 선택으로 두는 게 항상 안전 → 우리 그리디도 최적.",
                  "Suppose the optimal answer picks some other meeting first. Swap that first pick for the earliest-ending one — it finishes sooner, so the room left for later meetings only *grows*. No loss at all. So choosing the earliest end first is always safe → our greedy is optimal too.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("끝나는 시간 정렬 후 1-pass", "Sort by end → 1-pass")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("회의 11 개 — 끝나는 시간 순으로 정렬됨. 하나씩 보며 '잡을 수 있나?'", "11 meetings sorted by end time. Step through — 'can we take it?'")}
            </p>
            <div className="bg-gray-50 rounded-lg p-2 mb-3 max-h-[220px] overflow-y-auto">
              <div className="space-y-1">
                {sorted.map((m, i) => {
                  const isCur = i === is2Idx
                  const tInfo = trace[i]
                  const visible = i <= is2Idx
                  const picked = visible && tInfo.picked
                  const skipped = visible && !tInfo.picked
                  return (
                    <div key={i} className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded transition-all",
                      isCur && "bg-cyan-100 ring-2 ring-cyan-400",
                      !isCur && picked && "bg-emerald-50",
                      !isCur && skipped && "bg-gray-100 opacity-50",
                      !visible && "opacity-30",
                    )}>
                      <span className="text-[10px] font-mono text-gray-500 w-4">{i + 1}.</span>
                      <span className="font-mono text-xs text-gray-700 w-20">[{m.s}, {m.e}]</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded relative">
                        <div className={cn(
                          "absolute h-3 rounded",
                          picked && "bg-emerald-400",
                          skipped && "bg-rose-300",
                          !picked && !skipped && "bg-cyan-300",
                        )} style={{ left: `${(m.s / 16) * 100}%`, width: `${((m.e - m.s) / 16) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold w-12 text-right">
                        {picked && <span className="text-emerald-700">✓ {t("선택", "pick")}</span>}
                        {skipped && <span className="text-rose-600">✗ {t("겹침", "skip")}</span>}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-cyan-800">
                {is2Idx === -1
                  ? t("▶ 스텝 — 첫 회의 (끝=4) 부터 본다.", "▶ Step — start from first meeting (end=4).")
                  : is2Idx === sorted.length - 1
                    ? <b className="text-emerald-700">✅ {t(`끝! 선택한 회의: ${pickedCount} 개`, `Done! Picked: ${pickedCount} meetings`)}</b>
                    : <>
                        {t("현재 회의", "Current")} [{sorted[is2Idx].s}, {sorted[is2Idx].e}] —{" "}
                        {trace[is2Idx].picked
                          ? <b className="text-emerald-700">{t("✓ 잡음! (시작 ≥ 직전 끝)", "✓ Picked! (start ≥ last end)")}</b>
                          : <b className="text-rose-600">{t("✗ 건너뜀 (겹침)", "✗ Skip (overlaps)")}</b>}
                      </>}
              </p>
              {is2Idx >= 0 && (
                <p className="text-[11px] text-cyan-700 mt-1">
                  {t("지금까지 선택", "Picked so far")}: <b>{pickedCount}</b>{" · "}
                  {t("마지막 끝 시간", "Last end")}: <b>{trace[is2Idx].lastEnd}</b>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={is2StepFn} disabled={is2Idx >= sorted.length - 1}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {is2Idx === -1 ? t("시작", "Start") : t("다음", "Next")}
              </button>
              <button onClick={is2Reset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 활동 선택", "Code — interval scheduling")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("끝나는 시간(e) 기준 정렬 → 1-pass.", "Sort by end time (e) → 1-pass.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def max_meetings(meetings):
    # (시작, 끝) 튜플 리스트. 끝나는 시간 기준 정렬!
    meetings.sort(key=lambda m: m[1])

    count = 0
    last_end = -1
    for s, e in meetings:
        if s >= last_end:        # 안 겹치면 잡기
            count += 1
            last_end = e
    return count

meetings = [(1,4),(3,5),(0,6),(5,7),(3,9),
            (5,9),(6,10),(8,11),(8,12),(2,14),(12,16)]
print(max_meetings(meetings))   # 4`}
              cpp={`#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int maxMeetings(vector<pair<int,int>>& m) {
    // 끝나는 시간(second) 기준 정렬
    sort(m.begin(), m.end(),
         [](auto& a, auto& b){ return a.second < b.second; });

    int count = 0, lastEnd = -1;
    for (auto& [s, e] : m) {
        if (s >= lastEnd) {       // 안 겹치면 잡기
            count++;
            lastEnd = e;
        }
    }
    return count;
}

int main() {
    vector<pair<int,int>> m = {{1,4},{3,5},{0,6},{5,7},{3,9},
                               {5,9},{6,10},{8,11},{8,12},{2,14},{12,16}};
    cout << maxMeetings(m) << endl;   // 4
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "핵심: 정렬 O(N log N) + 1-pass O(N) = O(N log N).",
                "Key: sort O(N log N) + 1-pass O(N) = O(N log N).",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "활동 선택에서 *왜 끝나는 시간* 기준으로 정렬할까?",
              "In interval scheduling, why sort by *end time*?",
            )}
            options={[
              t("시작 시간 빠른 것부터 — 일찍 시작하니까", "Earliest start — start early"),
              t("끝나는 시간 빠른 것부터 — 남은 시간을 최대한 길게", "Earliest end — maximize remaining time"),
              t("길이가 짧은 것부터 — 빨리 끝나니까", "Shortest length — finishes fast"),
              t("무작위 — 어떻게든 N 개 중 절반은 잡힘", "Random — half get picked anyway"),
            ]}
            answerIdx={1}
            hint={t(
              "끝나는 시간 빠를수록 → 다음 회의를 위한 *여유 시간*이 더 많이 남아요. 짧은 회의나 일찍 시작하는 회의는 늦게 끝날 수도 있어 위험.",
              "Earlier end → more *room* left for the next meeting. Short or early-start meetings might still end late.",
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

// ── Chapter 3: 동전 거스름 (큰 단위부터) ─────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 730 원 거스름 — [500, 100, 50, 10]
  const coins = [500, 100, 50, 10]
  const target = 730
  // 단계: 각 동전 단위마다 한 칸. phase = -1 시작 전, 0..3 = 동전 처리 완료 인덱스
  const [phase, setPhase] = useState(-1)
  const counts: number[] = []
  let rem = target
  for (const c of coins) {
    const n = Math.floor(rem / c)
    counts.push(n)
    rem -= n * c
  }
  const remAt = (p: number) => {
    let r = target
    for (let i = 0; i <= p; i++) r -= counts[i] * coins[i]
    return r
  }
  const ccStep = () => { if (phase < coins.length - 1) setPhase(phase + 1) }
  const ccReset = () => setPhase(-1)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪙</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("동전 거스름 — 큰 거부터", "Coin change — biggest first")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-amber-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "한국 동전 [500, 100, 50, 10] 으로 N 원을 거슬러줄 때 *최소 개수* 는?",
                "Korean coins [500, 100, 50, 10] — make N₩ with the *fewest* coins?",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("그리디 — 큰 단위부터 최대한", "Greedy — biggest first, as many as possible")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`N = 730
500 → 730 // 500 = 1 (남은 230)
100 → 230 // 100 = 2 (남은 30)
 50 →  30 // 50  = 0 (남은 30)
 10 →  30 // 10  = 3 (남은 0)
─────────────────────
총 1 + 2 + 0 + 3 = 6 개`}
              </pre>
            </div>
            <p className="text-sm font-bold text-amber-700 text-center">
              {t("이 단위에선 그리디 = 최적. 다음 슬라이드에서 직접!", "For these coins greedy = optimal. Try it next slide!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t(`${target} 원 거슬러주기`, `Make ${target}₩ change`)}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("큰 동전부터 한 단위씩.", "One denomination at a time, biggest first.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="grid grid-cols-4 gap-2">
                {coins.map((c, i) => {
                  const done = phase >= i
                  const isCur = phase === i - 1 + 1 && phase === i
                  return (
                    <div key={i} className={cn(
                      "rounded-lg border-2 p-2 text-center transition-all",
                      isCur && "bg-amber-100 border-amber-500 scale-105",
                      done && !isCur && "bg-emerald-50 border-emerald-300",
                      !done && "bg-gray-100 border-gray-300 opacity-60",
                    )}>
                      <div className="text-2xl">🪙</div>
                      <div className="text-xs font-bold text-gray-800">{c}₩</div>
                      <div className={cn(
                        "text-sm font-black mt-1",
                        done ? "text-emerald-700" : "text-gray-400",
                      )}>
                        × {done ? counts[i] : "?"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-amber-800">
                {phase === -1 && t(`남은: ${target}₩. ▶ 큰 동전부터 시작!`, `Remaining: ${target}₩. ▶ Start with the biggest!`)}
                {phase >= 0 && phase < coins.length - 1 && (
                  <>
                    {coins[phase]}₩ × {counts[phase]} {t("개 사용", "used")}{" · "}
                    {t("남은", "Remaining")}: <b>{remAt(phase)}₩</b>
                  </>
                )}
                {phase === coins.length - 1 && (
                  <b className="text-emerald-700">
                    ✅ {t(`완성! 총 ${counts.reduce((a, b) => a + b, 0)} 개 동전`, `Done! ${counts.reduce((a, b) => a + b, 0)} coins total`)}
                  </b>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={ccStep} disabled={phase >= coins.length - 1}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {phase === -1 ? t("시작", "Start") : t("다음 동전", "Next coin")}
              </button>
              <button onClick={ccReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 동전 거스름 그리디", "Code — coin change greedy")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("큰 단위부터 // 로 개수, % 로 남은 금액.", "Biggest first: // for count, % for remainder.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def coin_change(n, coins):
    # coins는 큰 단위 → 작은 단위 순으로 미리 정렬되어 있다고 가정
    total = 0
    for c in coins:
        total += n // c       # 이 단위로 몇 개?
        n %= c                # 남은 금액
    return total

print(coin_change(730, [500, 100, 50, 10]))   # 6
print(coin_change(1260, [500, 100, 50, 10]))  # 9`}
              cpp={`#include <vector>
#include <iostream>
using namespace std;

int coinChange(int n, vector<int>& coins) {
    // coins는 내림차순 정렬되어 있다고 가정
    int total = 0;
    for (int c : coins) {
        total += n / c;       // 이 단위로 몇 개?
        n %= c;               // 남은 금액
    }
    return total;
}

int main() {
    vector<int> coins = {500, 100, 50, 10};
    cout << coinChange(730, coins) << endl;    // 6
    cout << coinChange(1260, coins) << endl;   // 9
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "주의: 동전 단위에 따라 그리디가 *깨질 수 있어요*. 다음 퀴즈에서 확인!",
                "Warning: greedy can *break* depending on denominations. See next quiz!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "동전 [1, 3, 4] 로 6 원을 만들 때, 그리디(큰 거부터)와 최적의 차이는? 한국 동전은 왜 그리디로 충분할까?",
              "Coins [1, 3, 4] making 6 — greedy vs optimal? And why does greedy suffice for Korean coins?",
            )}
            options={[
              t("그리디=2, 최적=2, 한국 동전은 우연", "Greedy=2, optimal=2, Korean coins are lucky"),
              t("그리디=3 (4+1+1), 최적=2 (3+3). 한국 동전은 단위가 서로 배수 관계라 그리디 안전.", "Greedy=3 (4+1+1), optimal=2 (3+3). Korean coins' denominations are multiples — greedy safe."),
              t("그리디=2, 최적=3, 그리디가 더 좋다", "Greedy=2, optimal=3, greedy is better"),
              t("그리디 항상 최적이라 차이 없음", "Greedy is always optimal — no difference"),
            ]}
            answerIdx={1}
            hint={t(
              "그리디로 6: 4 + 1 + 1 → 3 개. 최적: 3 + 3 → 2 개. 한국은 500=5×100, 100=2×50, 50=5×10 — 서로 배수라 큰 단위가 항상 이득.",
              "Greedy on 6: 4+1+1 = 3. Optimal: 3+3 = 2. Korean coins: 500=5×100, 100=2×50, 50=5×10 — multiples, so biggest-first always wins.",
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

// ── Chapter 4: 정렬 + 누적 패턴 (대기 시간 최소화) ───────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 줄서기 — 짧은 일 먼저 vs 긴 일 먼저
  // P[i] = i 번째 사람의 일 처리 시간
  const tasks = [3, 1, 4, 3, 2]
  // 짧은 순 정렬
  const sortedAsc = [...tasks].sort((a, b) => a - b)        // [1, 2, 3, 3, 4]
  const sortedDesc = [...tasks].sort((a, b) => b - a)       // [4, 3, 3, 2, 1]
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const cur = order === "asc" ? sortedAsc : sortedDesc
  // 각 사람의 대기 시간 누적
  const waits: number[] = []
  let acc = 0
  for (let i = 0; i < cur.length; i++) {
    waits.push(acc)
    acc += cur[i]
  }
  const totalWait = waits.reduce((a, b) => a + b, 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-6 border-2 border-sky-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("정렬 + 누적 — 그리디의 표준 모양", "Sort + accumulate — greedy's standard shape")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "그리디 문제의 80% 모양: ",
                "80% of greedy problems look like: ",
              )}<b className="text-sky-700">{t("정렬 한 번 → 1-pass 로 합/카운트", "sort once → 1-pass sum/count")}</b>{". "}
              {t(
                "어떻게 정렬하느냐가 결정적.",
                "How you sort is the key decision.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-sky-200 mb-3">
              <p className="text-xs font-bold text-sky-800 mb-1">💡 {t("예시 — 대기 시간 최소화", "Example — minimize total wait")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "N 사람이 줄서서 ATM 사용 대기 중. 각자 처리 시간 다름. 모두의 대기 시간 *합* 을 최소화하려면 어떤 순서로 줄세울까?",
                  "N people queueing for ATM, each with their own processing time. To minimize *total* wait, in what order should they go?",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-sky-700 text-center">
              {t("직관: 짧은 일 먼저! 다음 슬라이드에서 직접 비교.", "Intuition: shortest first! Compare next slide.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("두 정렬 순서 비교", "Compare two orderings")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("일 = [3, 1, 4, 3, 2]. 각 사람의 *대기 시간* 합을 최소화.", "Tasks = [3, 1, 4, 3, 2]. Minimize sum of each person's *wait*.")}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <button onClick={() => setOrder("asc")}
                className={cn("px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                  order === "asc" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600")}>
                {t("짧은 일 먼저", "Shortest first")}
              </button>
              <button onClick={() => setOrder("desc")}
                className={cn("px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                  order === "desc" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-600")}>
                {t("긴 일 먼저", "Longest first")}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="text-[11px] font-mono text-gray-500 mb-1">
                {t("순서", "Order")}: [{cur.join(", ")}]
              </div>
              <div className="space-y-1">
                {cur.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-gray-500 w-12">P{i + 1} ({p})</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute h-4 bg-amber-300" style={{ left: 0, width: `${(waits[i] / 20) * 100}%` }} />
                      <div className="absolute h-4 bg-emerald-400" style={{ left: `${(waits[i] / 20) * 100}%`, width: `${(p / 20) * 100}%` }} />
                    </div>
                    <span className="font-mono text-gray-700 w-20 text-right">
                      {t("대기", "wait")}: <b>{waits[i]}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn("rounded-lg p-3 text-center",
              order === "asc" ? "bg-emerald-50" : "bg-rose-50")}>
              <p className="text-sm font-mono">
                <span className={order === "asc" ? "text-emerald-800" : "text-rose-800"}>
                  {t("대기 시간 합", "Total wait")}: <b>{totalWait}</b>
                </span>
              </p>
              <p className="text-[11px] text-gray-600 mt-1">
                {order === "asc"
                  ? t("짧은 일 먼저 → 짧은 일이 일찍 끝나 *모두* 빨리 시작.", "Short tasks first → short ones finish early, *everyone* starts sooner.")
                  : t("긴 일 먼저 → 뒷사람이 *길게* 기다림. 비효율.", "Long tasks first → later people wait *longer*. Wasteful.")}
              </p>
            </div>
            <div className="bg-violet-50 rounded-lg p-3 border border-violet-200 mt-3">
              <p className="text-xs font-bold text-violet-800 mb-1">🔄 {t("왜 짧은 일 먼저가 최적? — 인접 바꿔치기 (교환논증)", "Why shortest first is optimal — adjacent swap (exchange argument)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "줄에서 *바로 옆에 붙어 있는* 두 사람 A, B 만 떼서 봐요 (A 가 앞). 둘을 서로 바꿔도 — 그 둘보다 뒤에 있는 사람들의 대기 시간은 *전혀 안 변해요* (둘의 시간 합은 그대로니까). 변하는 건 딱 B 의 대기뿐. A 가 더 길면, 긴 A 가 앞에 있어서 B 가 그만큼 더 기다리고 있던 것 → A·B 를 바꿔 *짧은 걸 앞으로* 보내면 B 가 덜 기다림 = 전체 합이 줄어요. 즉 '긴 게 짧은 것 앞에' 있으면 언제든 바꿔서 이득. 더 못 바꿀 때 = 완전히 짧은 순. 그래서 짧은 일 먼저가 최적.",
                  "Take just two *adjacent* people A, B (A in front). Swapping them leaves everyone behind them *completely unchanged* (their combined time is the same). Only B's wait changes. If A is the longer one, B was waiting that extra amount for A — swap so the *shorter goes first* and B waits less = total drops. So whenever a longer one sits ahead of a shorter one, swapping helps. When no such pair is left = fully sorted shortest-first. Hence shortest first is optimal.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 짧은 일 먼저 (sort + 1-pass)", "Code — shortest first (sort + 1-pass)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("오름차순 정렬 → 누적 합 = 대기 시간 합.", "Ascending sort → running prefix sum = total wait.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def total_wait(tasks):
    tasks.sort()                  # 짧은 순!
    acc = 0       # 현재까지 누적 시간
    total = 0     # 대기 시간 합
    for p in tasks:
        total += acc              # P_i 의 대기 = 앞 사람들 합
        acc += p
    return total

print(total_wait([3, 1, 4, 3, 2]))   # 19`}
              cpp={`#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int totalWait(vector<int> tasks) {
    sort(tasks.begin(), tasks.end());     // 짧은 순!
    int acc = 0, total = 0;
    for (int p : tasks) {
        total += acc;                     // 앞 사람들 합 = 대기
        acc += p;
    }
    return total;
}

int main() {
    cout << totalWait({3, 1, 4, 3, 2}) << endl;   // 19
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "포인트: 누적 합 (prefix sum) 패턴. 매 순간 '앞 사람들 합' 이 곧 내 대기 시간.",
                "Point: prefix sum pattern. At each step, 'sum of those before me' = my wait.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "N 사람의 대기 시간 합을 최소화하려면 어떻게 정렬?",
              "To minimize total wait of N people in a queue, sort by?",
            )}
            options={[
              t("긴 일 먼저 — 무거운 일 먼저 끝내야", "Longest first — get heavy jobs done"),
              t("짧은 일 먼저 — 뒷사람이 덜 기다림", "Shortest first — those behind wait less"),
              t("도착 순 (FIFO) — 공정함", "Arrival order (FIFO) — fair"),
              t("무작위 — 어차피 평균 같음", "Random — average is the same"),
            ]}
            answerIdx={1}
            hint={t(
              "내가 짧은 일이면 뒷사람 모두 *나만큼만* 기다림. 내가 긴 일이면 뒷사람 모두 *오래* 기다림. 짧은 일 먼저 = 모두 대기 적게.",
              "If I'm short, everyone after me waits only *my time*. If I'm long, everyone waits *long*. Shortest first = minimal waits.",
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
            <p className="text-5xl text-center mb-3">🎉</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그리디 끝까지 왔어요!", "You finished Greedy!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "잘 했어요 👏 활동 선택 · 동전 거스름 · 정렬+누적 — 그리디의 *기본 3 종 세트*. 이제 USACO Bronze 에서 '아 이거 그리디 같은데?' 가 슬슬 보일 거예요.",
                "Nice work 👏 Interval scheduling · coin change · sort+accumulate — the *3 classic greedy shapes*. You'll now spot 'ah, greedy?' in Bronze problems.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "그리디는 *직관*이 핵심. 다음 챕터에서 핵심 정리 + 다음 단계 안내.",
                  "Greedy is about *intuition*. Next slide: key takeaways + what's next.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("그리디 = ", "Greedy = ")}<b>{t("\"지금 가장 좋아 보이는 선택\"", "\"best-looking choice now\"")}</b> {t("반복", "repeated")}</li>
              <li><b>2.</b> {t("표준 모양: ", "Standard shape: ")}<b>{t("정렬 한 번 + 1-pass", "sort once + 1-pass")}</b> {t("→ O(N log N)", "→ O(N log N)")}</li>
              <li><b>3.</b> {t("활동 선택 = ", "Interval scheduling = ")}<b>{t("끝나는 시간 빠른 순", "earliest end first")}</b></li>
              <li><b>4.</b> {t("동전 거스름 = ", "Coin change = ")}<b>{t("큰 단위부터", "biggest first")}</b> {t("(단위가 배수 관계일 때만 안전)", "(safe only when denominations are multiples)")}</li>
              <li><b>5.</b> {t("줄서기/대기 = ", "Queue/wait = ")}<b>{t("짧은 일 먼저", "shortest first")}</b></li>
              <li><b>6.</b> ⚠️ {t("증명 어려움 — ", "Hard to prove — ")}<b>{t("반례 하나면 깨짐", "one counter-example breaks it")}</b>. {t("의심 가면 작은 케이스 직접 손으로!", "Suspicious? Try small cases by hand!")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("그리디 = 정렬 + 1-pass. 그 위에 *왜 이 정렬?* 만 답하면 됨.", "Greedy = sort + 1-pass. Just answer *why this sort?*")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음 토픽: BFS/DFS, DP, 이분탐색. ", "Next topics: BFS/DFS, DP, binary search. ")}
                <Link href="/algo" className="font-bold underline hover:text-purple-900">{t("알고리즘 지도 →", "Algo map →")}</Link>
              </p>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                🏆 {t("바로 실전? 그리디 단골 문제로 검증해봐요. ", "Ready? Test it on real contest problems. ")}
                <Link href="/quest" className="font-bold underline hover:text-emerald-900">{t("Quest 도전 →", "Quest →")}</Link>
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
              ? <>🎉 {t("그리디 마스터!", "Greedy Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function GreedyPage() {
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
          user_id: user.id, lesson_id: "algo-greedy", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-greedy")) {
          arr.push("algo-greedy")
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
              { label: "그리디", labelEn: "Greedy", emoji: "💰" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">💰</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("그리디", "Greedy")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver 필수", "Silver core")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/greedy/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("그리디 문제 12 개 — 정렬 키를 골라봐요!", "12 greedy challenges — pick the sort key!")}</p>
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
                  {/* 작은 언어 토글 — 챕터 헤더 우측에 inline */}
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
              <h3 className="text-xl font-black text-emerald-900">{t("그리디 마스터!", "Greedy Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (DP / BFS)", "Next topic (DP / BFS)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
