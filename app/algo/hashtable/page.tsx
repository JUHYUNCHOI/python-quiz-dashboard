"use client"

/**
 * 해시테이블 (Hash Table) — 챕터식 학습 페이지.
 *
 * 기존 vanilla JS 해시테이블 토픽 → 5 챕터 React 구조.
 * Bronze~Silver 학생에 필수인 것만: dict/map 사용법, 빈도수 카운팅, set 활용.
 *
 * 교육 원칙: 한 챕터 = 한 가지 + 한 인터랙션 + 한 미니 퀴즈.
 */

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🤔", title: "왜 해시테이블?",     titleEn: "Why Hash Table?",       mins: 4 },
  { id: 2, emoji: "🎯", title: "Two Sum — 짝 찾기",   titleEn: "Two Sum — Pair Match",  mins: 6 },
  { id: 3, emoji: "🧮", title: "부분 합 = K (Prefix + Hash)", titleEn: "Subarray Sum = K (Prefix + Hash)", mins: 8 },
  { id: 4, emoji: "🪟", title: "슬라이딩 윈도우 + Set", titleEn: "Sliding Window + Set", mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",         titleEn: "Recap & Practice",      mins: 4 },
]

const STORAGE_KEY = "algo-hashtable-chapter"

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
        <span className="text-[10px] text-gray-500 italic">{lang === "py" ? "토글: 위쪽 'Python / C++' 버튼" : "Toggle above"}</span>
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

// ── Chapter 1: 복습 + 알고리즘 관점 ────────────────────────────────
function Chapter1({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">👋</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("오랜만! 다시 만났어요", "Welcome back!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "해시 자료구조는 이미 알죠? — Python 의 dict / set, C++ 의 unordered_map / unordered_set. 수업에서 다 다뤘던 거예요.",
                "You've met hash structures before — Python's dict/set, C++'s unordered_map/unordered_set. We've covered them in class.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "그러면 이 토픽에서는 뭘 새로 배울까요? — 해시를 *문법* 이 아니라 *알고리즘 패턴* 으로 보는 거예요.",
                "So what's new here? — viewing hash *as an algorithmic pattern*, not just syntax.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "\"여기 dict 쓰면 O(N) → O(1) 되겠다\" 같은 *판단* 을 배우는 챕터예요. 사용법 복습은 가볍게, 활용에 집중해요.",
                "\"Hmm, using a dict here cuts O(N) → O(1)\" — that kind of *judgment* is what we're after. Light review, focus on application.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t("아래 '다음' 으로 가벼운 복습 ↓", "Hit 'Next' for a quick refresher ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-sm text-gray-700 mb-2">
              {t("⚡ 30초 복습 — 이거 기억나죠?", "⚡ 30-sec refresher — remember this?")}
            </p>
            <p className="text-base font-black text-gray-900 mb-4">
              {t("해시는 두 가지를 O(1) 에 해결해요", "Hash gives you O(1) on two things")}
            </p>
            <div className="space-y-3 mt-4">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3">
                <p className="text-sm font-black text-emerald-800 mb-1">🔑 {t("키 → 값 저장/조회 — O(1)", "Key → value store/lookup — O(1)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {codeLang === "py"
                    ? t("scores[\"Alice\"] = 90 / scores[\"Alice\"] → 한 번에.",
                        "scores[\"Alice\"] = 90 / scores[\"Alice\"] → one step.")
                    : t("scores[\"Alice\"] = 90; / scores[\"Alice\"] → 한 번에.",
                        "scores[\"Alice\"] = 90; / scores[\"Alice\"] → one step.")}
                </p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                <p className="text-sm font-black text-blue-800 mb-1">🔎 {t("존재 확인 — O(1)", "Existence check — O(1)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {codeLang === "py"
                    ? t("\"Alice\" in scores → True/False 즉시.",
                        "\"Alice\" in scores → True/False instantly.")
                    : t("scores.count(\"Alice\") → 1 또는 0 즉시.",
                        "scores.count(\"Alice\") → 1 or 0 instantly.")}
                </p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm font-black text-red-700 mb-1">📋 {t("vs 일반 배열/리스트 검색 — O(N)", "vs plain array/list scan — O(N)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "처음부터 끝까지 다 비교해야 해요. N 이 10만, 100만 되면 답답 😤 — 이때 해시로 갈아타는 거예요.",
                    "Compare every element. When N hits 100k+, it gets painful 😤 — that's when you switch to hash.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-800 font-bold text-center mt-4">
              {t("→ 이게 우리가 이 토픽에서 쓰려는 \"무기\" 의 본질.", "→ This is the core \"weapon\" we use in this topic.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we'll learn in this topic")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t("문법은 알지만 — *언제 꺼낼지* 가 진짜 실력. 이런 상황들이에요:", "You know the syntax — *when to reach for it* is the real skill. Situations like:")}
            </p>
            <div className="space-y-2 text-sm text-gray-800 mb-4">
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">📊 {t("빈도수 카운팅", "Frequency counting")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"각 글자/숫자가 몇 번 나왔나?\" — 한 번 순회로 끝", "\"How many times does each item appear?\" — one pass, done")}</p>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">👯 {t("중복 체크 / dedup", "Duplicate check / dedup")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"본 적 있나?\" 를 O(1) 로 — 이중 for 루프 탈출", "\"Have I seen this?\" in O(1) — escape from double for-loops")}</p>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">🎯 {t("Two-sum 스타일 매칭", "Two-sum style matching")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"x 와 더해서 target 이 되는 짝이 있나?\" — 저장해두고 O(1) 로 조회", "\"Is there a pair that sums to target?\" — store first, look up in O(1)")}</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 text-center font-bold leading-relaxed">
              {t(
                "USACO Bronze~Silver 에서 정렬만큼이나 자주 나오는 도구.",
                "Just as common as sorting in USACO Bronze~Silver.",
              )}
            </p>
            <p className="text-sm font-bold text-blue-800 text-center mt-4">
              {t("자, 챕터 2 에서 첫 패턴부터 →", "Now to Chapter 2 for the first pattern →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: Two Sum — 짝 찾기 (Complement Hash) ───────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Two Sum 시각화 — arr=[2,7,11,15], target=9
  const TWO_SUM_ARR = [2, 7, 11, 15]
  const TWO_SUM_TARGET = 9
  type TwoSumStep = { i: number; need: number; foundAt: number | null; mapSnapshot: { val: number; idx: number }[] }
  const twoSumSteps: TwoSumStep[] = useMemo(() => {
    const out: TwoSumStep[] = []
    const seen = new Map<number, number>()
    for (let i = 0; i < TWO_SUM_ARR.length; i++) {
      const x = TWO_SUM_ARR[i]
      const need = TWO_SUM_TARGET - x
      const foundAt = seen.has(need) ? seen.get(need)! : null
      out.push({
        i, need, foundAt,
        mapSnapshot: Array.from(seen.entries()).map(([val, idx]) => ({ val, idx })),
      })
      if (foundAt !== null) break
      seen.set(x, i)
    }
    return out
  }, [])
  const [vizStep, setVizStep] = useState(0)
  const curStep = twoSumSteps[Math.min(vizStep, twoSumSteps.length - 1)]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("Two Sum — \"짝꿍\" 찾기", "Two Sum — find the \"partner\"")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 배열에서 a + b = target 인 쌍을 찾기. 들어본 적 있죠? — 해시의 *고전 응용* 이에요.",
                "Problem: find a pair where a + b = target. Heard of it? — the *classic* hash application.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border-2 border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-700 mb-1">🐢 {t("순진한 방법 — 이중 for", "Naive — double for")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("모든 쌍 (i, j) 다 비교 → O(N²). N=10만 이면 100억 번 → 시간 초과 💥", "Compare every pair (i, j) → O(N²). N=100k means 10 billion ops → TLE 💥")}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-emerald-300 mb-3">
              <p className="text-xs font-bold text-emerald-700 mb-1">⚡ {t("해시 한 번 순회 — O(N)", "Hash one-pass — O(N)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("각 x 를 보면서 \"target − x 가 이미 봤었나?\" 만 확인. 봤으면 짝! 못 봤으면 x 를 저장.", "For each x, check \"have I seen target − x already?\" If yes → pair! If no → store x.")}
              </p>
            </div>
            <p className="text-sm font-bold text-rose-700 text-center">
              {t("핵심 아이디어: complement = target − x. 다음 슬라이드에서 직접 봐요 →", "Key idea: complement = target − x. Next slide shows it →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-1 text-center">🎮 {t("Two Sum 한 발씩 걸어보기", "Walk Two Sum step-by-step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              arr = [2, 7, 11, 15], target = {TWO_SUM_TARGET}
            </p>

            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("배열", "Array")}</p>
              <div className="flex gap-1.5 justify-center">
                {TWO_SUM_ARR.map((v, i) => (
                  <div key={i} className={cn("w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center font-mono",
                    i === curStep.i && "bg-rose-100 border-rose-500 shadow-md",
                    curStep.foundAt === i && "bg-emerald-100 border-emerald-500 shadow-md",
                    i !== curStep.i && curStep.foundAt !== i && i < curStep.i && "bg-gray-50 border-gray-300 opacity-60",
                    i !== curStep.i && curStep.foundAt !== i && i > curStep.i && "bg-white border-gray-200")}>
                    <span className="font-bold text-sm text-gray-800">{v}</span>
                    <span className="text-[9px] text-gray-400">i={i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200 mb-3 text-xs">
              <p className="text-gray-700">
                <b>i = {curStep.i}</b>, x = <b>{TWO_SUM_ARR[curStep.i]}</b> →
                {" "}{t("need", "need")} = {TWO_SUM_TARGET} − {TWO_SUM_ARR[curStep.i]} = <b className="text-rose-700">{curStep.need}</b>
              </p>
              {curStep.foundAt !== null ? (
                <p className="text-emerald-700 font-bold mt-1">
                  ✅ {curStep.need} {t("이미 봤음! (idx", "already seen! (idx")} {curStep.foundAt}) → {t("정답:", "answer:")} ({curStep.foundAt}, {curStep.i})
                </p>
              ) : (
                <p className="text-gray-600 mt-1">
                  {t("아직 못 봤음 →", "Not seen yet →")} {TWO_SUM_ARR[curStep.i]} {t("을(를) seen 에 저장 후 다음 i 로", "→ store in seen, move on")}
                </p>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
              <p className="text-[11px] font-bold text-blue-700 mb-1">{t("seen 맵 상태", "seen map state")}</p>
              {curStep.mapSnapshot.length === 0 ? (
                <p className="text-xs text-gray-400 italic">{t("(비어있음)", "(empty)")}</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {curStep.mapSnapshot.map((e) => (
                    <div key={e.val} className={cn("rounded px-2 py-1 text-xs font-mono border",
                      e.val === curStep.need ? "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold" : "bg-white border-blue-300 text-gray-700")}>
                      {e.val} → idx {e.idx}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 rounded-lg font-bold text-xs">
                ← {t("이전 i", "Prev i")}
              </button>
              <button onClick={() => setVizStep(Math.min(twoSumSteps.length - 1, vizStep + 1))} disabled={vizStep >= twoSumSteps.length - 1}
                className="flex-1 px-3 py-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-30 text-white rounded-lg font-bold text-xs">
                {t("다음 i", "Next i")} →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-rose-50 rounded-2xl p-4 border-2 border-rose-200">
              <p className="text-sm font-black text-rose-900 mb-2">📝 {t("Two Sum 코드 — 한 번 순회", "Two Sum code — one pass")}</p>
              <p className="text-xs text-gray-700">
                {t("핵심: seen 에 (값 → 인덱스). x 보면 target − x 가 seen 에 있나만 확인.", "Core: seen has (value → index). For each x, check if target − x is in seen.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# Two Sum — O(N) one-pass
def two_sum(arr, target):
    seen = {}                  # value -> index
    for i, x in enumerate(arr):
        need = target - x
        if need in seen:
            return (seen[need], i)
        seen[x] = i
    return None

# arr = [2, 7, 11, 15], target = 9
# i=0: x=2, need=7, not in seen → store {2:0}
# i=1: x=7, need=2, found at 0! → return (0, 1)
print(two_sum([2,7,11,15], 9))  # (0, 1)`}
              cpp={`#include <unordered_map>
#include <vector>
using namespace std;

// Two Sum — O(N) one-pass
pair<int,int> two_sum(vector<int>& arr, int target) {
    unordered_map<int,int> seen;  // value -> index
    for (int i = 0; i < (int)arr.size(); i++) {
        int need = target - arr[i];
        auto it = seen.find(need);
        if (it != seen.end()) {
            return {it->second, i};
        }
        seen[arr[i]] = i;
    }
    return {-1, -1};
}

// arr = {2,7,11,15}, target = 9
// i=0: x=2, need=7, miss → store
// i=1: x=7, need=2, hit! → (0,1)`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("주의: x 를 \"먼저 저장하고\" 검색하면 자기 자신과 매칭될 수 있음. 항상 검색 → 저장 순서.", "Watch: if you store x *before* checking, you might match yourself. Always check first, then store.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("two sum hash 패턴의 핵심 아이디어는?", "What's the core idea of the Two Sum hash pattern?")}
            options={[
              t("정렬 후 두 포인터", "Sort then two pointers"),
              t("각 원소의 complement = target − x 를 hash 로 확인", "Check each element's complement = target − x via hash"),
              t("모든 쌍 다 비교", "Compare every pair"),
              t("DP 사용", "Use DP"),
            ]}
            answerIdx={1}
            hint={t("x 더하기 뭐 = target ? 그 \"뭐\" 가 이미 봤었나 한 번에 확인.", "x plus what = target ? Check if that \"what\" was already seen in O(1).")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < 3 ? (
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

// ── Chapter 3: 부분 합 = K (Prefix Sum + Hash) ───────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // arr=[1,2,1,2,1], K=3. prefix=[0,1,3,4,6,7]
  const SUB_ARR = [1, 2, 1, 2, 1]
  const SUB_K = 3
  const prefix = useMemo(() => {
    const p = [0]
    for (const v of SUB_ARR) p.push(p[p.length - 1] + v)
    return p
  }, [])
  // steps: at each i (1..N), prefix[i] computed, check prefix[i]-K in cnt, then add prefix[i] to cnt.
  type SubStep = { i: number; prefVal: number; need: number; added: number; cntSnapshot: { val: number; n: number }[]; totalSoFar: number }
  const subSteps: SubStep[] = useMemo(() => {
    const out: SubStep[] = []
    const cnt = new Map<number, number>()
    cnt.set(0, 1)
    let total = 0
    for (let i = 1; i <= SUB_ARR.length; i++) {
      const prefVal = prefix[i]
      const need = prefVal - SUB_K
      const added = cnt.get(need) ?? 0
      total += added
      // snapshot BEFORE we add current prefVal — that's what's checked against
      const snapshot = Array.from(cnt.entries()).map(([val, n]) => ({ val, n }))
      out.push({ i, prefVal, need, added, cntSnapshot: snapshot, totalSoFar: total })
      cnt.set(prefVal, (cnt.get(prefVal) ?? 0) + 1)
    }
    return out
  }, [prefix])
  const [vizStep, setVizStep] = useState(0)
  const curStep = subSteps[Math.min(vizStep, subSteps.length - 1)]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🧮</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("부분 합 = K — Prefix + Hash 조합기술", "Subarray Sum = K — Prefix + Hash combo")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 연속된 부분 배열 중 합이 K 인 것의 *개수*. 예) [1,2,1,2,1], K=3 → 4 개.",
                "Problem: count contiguous subarrays whose sum equals K. e.g. [1,2,1,2,1], K=3 → 4.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border-2 border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-700 mb-1">🐢 {t("순진한 방법 — 이중 for", "Naive — double for")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("모든 (l, r) 시도 → O(N²). N=10만 이면 또 100억 💥", "Try every (l, r) → O(N²). N=100k → 10 billion ops 💥")}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-emerald-300 mb-3">
              <p className="text-xs font-bold text-emerald-700 mb-1">⚡ {t("Prefix sum + Hash — O(N)", "Prefix sum + Hash — O(N)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "prefix[r] − prefix[l−1] = K 면 부분합이 K. → 각 r 에서 \"prefix[r] − K 인 prefix 가 이전에 몇 개 있었나?\" 만 묻는다.",
                  "If prefix[r] − prefix[l−1] = K, subarray sums to K. → at each r, ask \"how many earlier prefixes equal prefix[r] − K?\"",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-purple-700 text-center">
              {t("Two Sum 패턴이랑 비슷하죠? complement 가 \"prefix − K\" 로 바뀐 거예요.", "Like Two Sum — complement is just \"prefix − K\" now.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-1 text-center">🎮 {t("Prefix 한 발씩 — 합이 K 인 부분 세기", "Walk prefix step-by-step — count subarrays = K")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              arr = [1, 2, 1, 2, 1], K = {SUB_K}
            </p>

            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("배열 + prefix", "Array + prefix")}</p>
              <div className="flex gap-1 justify-center">
                {prefix.map((p, i) => (
                  <div key={i} className={cn("w-11 h-14 rounded-lg border-2 flex flex-col items-center justify-center",
                    i === curStep.i && "bg-purple-100 border-purple-500 shadow-md",
                    i < curStep.i && "bg-gray-50 border-gray-300 opacity-70",
                    i > curStep.i && "bg-white border-gray-200 opacity-50")}>
                    <span className="text-[9px] text-gray-400">p[{i}]</span>
                    <span className="font-mono font-bold text-sm text-gray-800">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 mb-3 text-xs">
              <p className="text-gray-700">
                <b>i = {curStep.i}</b>, prefix = <b>{curStep.prefVal}</b> →
                {" "}{t("need", "need")} = {curStep.prefVal} − {SUB_K} = <b className="text-purple-700">{curStep.need}</b>
              </p>
              <p className="text-gray-700 mt-1">
                {t("cnt 에 ", "cnt has ")}<b className="text-emerald-700">{curStep.need}</b>{t(" 가 ", " ×")}<b className="text-emerald-700">{curStep.added}</b>{t(" 개 있음 → 부분합 K 짜리 ", " → ")}<b>+{curStep.added}</b>{" "}{t("개 추가", "added")}
              </p>
              <p className="text-purple-700 font-bold mt-1">
                {t("지금까지 누적 답:", "Total so far:")} {curStep.totalSoFar}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
              <p className="text-[11px] font-bold text-blue-700 mb-1">{t("cnt (prefix → 등장 횟수) — 이 단계 시작 시점", "cnt (prefix → count) — at start of this step")}</p>
              <div className="flex flex-wrap gap-1.5">
                {curStep.cntSnapshot.map((e) => (
                  <div key={e.val} className={cn("rounded px-2 py-1 text-xs font-mono border",
                    e.val === curStep.need && curStep.added > 0
                      ? "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold"
                      : "bg-white border-blue-300 text-gray-700")}>
                    {e.val} ×{e.n}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 rounded-lg font-bold text-xs">
                ← {t("이전 i", "Prev i")}
              </button>
              <button onClick={() => setVizStep(Math.min(subSteps.length - 1, vizStep + 1))} disabled={vizStep >= subSteps.length - 1}
                className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-30 text-white rounded-lg font-bold text-xs">
                {t("다음 i", "Next i")} →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-purple-50 rounded-2xl border-2 border-purple-200 p-4">
              <p className="text-sm font-black text-purple-900 mb-2">📝 {t("Subarray Sum = K — running prefix + hash", "Subarray Sum = K — running prefix + hash")}</p>
              <p className="text-xs text-gray-700">
                {t("prefix 배열을 따로 만들 필요 없음 — running sum 으로 충분.", "No need to build prefix array — running sum is enough.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 부분 배열 합 = K 개수 — O(N)
def subarray_sum(arr, K):
    cnt = {0: 1}        # ← 핵심! prefix=0 (배열 시작 전) 1 회
    prefix = 0
    answer = 0
    for x in arr:
        prefix += x
        # prefix - K 인 prefix 가 이전에 몇 번?
        answer += cnt.get(prefix - K, 0)
        cnt[prefix] = cnt.get(prefix, 0) + 1
    return answer

# [1,2,1,2,1], K=3 → 4
print(subarray_sum([1,2,1,2,1], 3))`}
              cpp={`#include <unordered_map>
#include <vector>
using namespace std;

// 부분 배열 합 = K 개수 — O(N)
long long subarray_sum(vector<int>& arr, int K) {
    unordered_map<long long, int> cnt;
    cnt[0] = 1;            // ← 핵심! 시작 전 prefix=0
    long long prefix = 0, answer = 0;
    for (int x : arr) {
        prefix += x;
        auto it = cnt.find(prefix - K);
        if (it != cnt.end()) answer += it->second;
        cnt[prefix]++;
    }
    return answer;
}
// arr={1,2,1,2,1}, K=3 → 4`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("cnt[0] = 1 빠뜨리면 \"배열 처음부터 시작\" 인 부분합을 놓침. 외워두기!", "Forgetting cnt[0] = 1 misses subarrays starting at index 0. Memorize!")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("부분 배열 합 = K 알고리즘에서 cnt[0] = 1 로 초기화하는 이유는?", "Why initialize cnt[0] = 1 in the subarray-sum-equals-K algorithm?")}
            options={[
              t("원소 1 개짜리 배열 처리", "To handle single-element arrays"),
              t("배열 처음부터 시작하는 부분 배열의 prefix sum 0 도 카운트", "To count subarrays starting from index 0 (whose prior prefix is 0)"),
              t("오버플로우 방지", "To prevent overflow"),
              t("디버그용", "For debugging"),
            ]}
            answerIdx={1}
            hint={t("prefix[0] = 0 인 경우 — 배열 시작 전부터 ~ i 까지 합이 K 면, prefix[i] − 0 = K. 즉 prefix[i] = K. 이걸 잡으려면 0 이 cnt 에 1 개 있어야 해요.", "When prefix[0] = 0 — if sum from start to i equals K, then prefix[i] − 0 = K. To catch that, 0 must already be in cnt with count 1.")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < 3 ? (
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

// ── Chapter 4: 슬라이딩 윈도우 + Set (중복 없는 부분 문자열) ─────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시각화: "abcabcbb" 에서 중복 없는 가장 긴 부분 문자열
  const WIN_STR = "abcabcbb"
  type WinStep = { left: number; right: number; setSnapshot: string[]; best: number; action: string }
  const winSteps: WinStep[] = useMemo(() => {
    const out: WinStep[] = []
    const seen = new Set<string>()
    let left = 0
    let best = 0
    let right = 0
    while (right < WIN_STR.length) {
      const ch = WIN_STR[right]
      if (!seen.has(ch)) {
        seen.add(ch)
        if (right - left + 1 > best) best = right - left + 1
        out.push({
          left, right, setSnapshot: Array.from(seen), best,
          action: `'${ch}' 추가 → window [${left}..${right}], len ${right - left + 1}`,
        })
        right++
      } else {
        // shrink one step from left
        const leftCh = WIN_STR[left]
        seen.delete(leftCh)
        out.push({
          left, right, setSnapshot: Array.from(seen), best,
          action: `'${ch}' 이미 있음 → left='${leftCh}' 제거, left++`,
        })
        left++
      }
    }
    return out
  }, [])
  const [vizStep, setVizStep] = useState(0)
  const curStep = winSteps[Math.min(vizStep, winSteps.length - 1)]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪟</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("슬라이딩 윈도우 + Set", "Sliding Window + Set")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 중복 없는 가장 긴 부분 문자열 길이. 예) \"abcabcbb\" → \"abc\" 길이 3.",
                "Problem: longest substring with no repeating chars. e.g. \"abcabcbb\" → \"abc\" length 3.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border-2 border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-700 mb-1">🐢 {t("순진한 방법 — 모든 부분 문자열", "Naive — every substring")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("시작, 끝 (l, r) 다 시도 + 중복 체크 → O(N²) 이상.", "Try every (l, r) plus dup check → O(N²)+.")}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border-2 border-emerald-300 mb-3">
              <p className="text-xs font-bold text-emerald-700 mb-1">⚡ {t("Two pointer + Set — O(N)", "Two pointer + Set — O(N)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "left, right 두 포인터로 \"창문\" 을 만듬. right 한 칸 넓혀가다 중복 만나면 left 를 dup 다음 칸까지 한 칸씩 좁힘. set 으로 창문 안 원소 추적.",
                  "Two pointers (left, right) form a window. Expand right; when you hit a dup, shrink left one step at a time until past it. Track window contents with a set.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-blue-700 text-center">
              {t("핵심: 각 원소는 추가 한 번, 제거 한 번 → 전체 O(N). 다음 슬라이드에서 보세요 →", "Each char added once, removed once → O(N) total. Next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-1 text-center">🎮 {t("\"abcabcbb\" 윈도우 슬라이딩", "Slide window on \"abcabcbb\"")}</p>

            <div className="mb-3 mt-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("문자열", "String")}</p>
              <div className="flex gap-1 justify-center">
                {WIN_STR.split("").map((ch, i) => {
                  const inWindow = i >= curStep.left && i <= curStep.right
                  const isLeft = i === curStep.left
                  const isRight = i === curStep.right
                  return (
                    <div key={i} className={cn("w-9 h-12 rounded-lg border-2 flex flex-col items-center justify-center",
                      inWindow && "bg-blue-100 border-blue-500",
                      !inWindow && "bg-gray-50 border-gray-200 opacity-50",
                      isLeft && "ring-2 ring-rose-400",
                      isRight && "ring-2 ring-emerald-400")}>
                      <span className="text-[9px] text-gray-400">{isLeft ? "L" : isRight ? "R" : ""}{isLeft && isRight ? "" : ""}</span>
                      <span className="font-mono font-bold text-sm text-gray-800">{ch}</span>
                      <span className="text-[9px] text-gray-400">{i}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3 text-xs">
              <p className="text-gray-700">
                <b>left = {curStep.left}, right = {curStep.right}</b>
              </p>
              <p className="text-gray-600 mt-1">{t("동작:", "Action:")} {curStep.action}</p>
              <p className="text-emerald-700 font-bold mt-1">
                {t("현재 best 길이:", "Best length so far:")} {curStep.best}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-[11px] font-bold text-purple-700 mb-1">{t("set (window 안 원소)", "set (chars in window)")}</p>
              {curStep.setSnapshot.length === 0 ? (
                <p className="text-xs text-gray-400 italic">{t("(비어있음)", "(empty)")}</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {curStep.setSnapshot.map((c) => (
                    <div key={c} className="rounded px-2 py-1 text-xs font-mono bg-white border-2 border-purple-300 text-purple-800 font-bold">
                      &apos;{c}&apos;
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 rounded-lg font-bold text-xs">
                ← {t("이전", "Prev")}
              </button>
              <button onClick={() => setVizStep(Math.min(winSteps.length - 1, vizStep + 1))} disabled={vizStep >= winSteps.length - 1}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 text-white rounded-lg font-bold text-xs">
                {t("다음", "Next")} →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("Two pointer + set — 패턴 외워두기", "Two pointer + set — memorize")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("dup 발견 시: window 다 비우는 게 *아니라* left 를 한 칸씩 옮기며 set 에서 제거.", "On dup: don't clear the window — move left one step at a time, removing from set.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 중복 없는 가장 긴 부분 문자열 — O(N)
def longest_unique(s):
    seen = set()
    left = 0
    best = 0
    for right in range(len(s)):
        # dup 이면 left 가 dup 다음으로 갈 때까지 줄임
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        best = max(best, right - left + 1)
    return best

print(longest_unique("abcabcbb"))  # 3
print(longest_unique("bbbbb"))     # 1
print(longest_unique("pwwkew"))    # 3 ("wke")`}
              cpp={`#include <unordered_set>
#include <string>
using namespace std;

// 중복 없는 가장 긴 부분 문자열 — O(N)
int longest_unique(const string& s) {
    unordered_set<char> seen;
    int left = 0, best = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        // dup 이면 한 칸씩 left 이동
        while (seen.count(s[right])) {
            seen.erase(s[left]);
            left++;
        }
        seen.insert(s[right]);
        best = max(best, right - left + 1);
    }
    return best;
}
// "abcabcbb" → 3, "pwwkew" → 3 ("wke")`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("각 문자는 set 에 들어왔다 나갈 뿐 → 총 작업 2N → O(N).", "Each char enters/leaves set once → ~2N ops → O(N).")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("중복 없는 가장 긴 부분 문자열 알고리즘에서 dup 발견 시 무엇을 하나?", "On finding a dup in the longest-unique-substring algorithm, what do you do?")}
            options={[
              t("window 다 초기화", "Clear the entire window"),
              t("left 포인터 한 칸 증가 + set 에서 left 문자 제거 (dup 사라질 때까지 반복)", "Increment left by 1 + remove s[left] from set (repeat until dup gone)"),
              t("right 다시 시작", "Restart right from 0"),
              t("set 비우기", "Empty the set"),
            ]}
            answerIdx={1}
            hint={t("left 를 dup 다음 위치까지 옮길 때까지 한 칸씩. 한꺼번에 점프하면 중간 정보 잃음.", "Move left one step at a time until past the dup. Don't jump — you'd lose intermediate state.")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {step < 3 ? (
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

// ── Chapter 5: 정리 + 실전 ───────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
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
              {t("해시테이블 5 챕터 끝! 짝짝짝", "All 5 hash-table chapters done! 👏")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요. 이제 dict, map, set — 셋 다 친구가 됐어요. USACO 에서 '빠르게 찾기/세기' 필요할 때 바로 떠올릴 수 있을 거예요.",
                "Great job! dict, map, set — all friends now. When USACO calls for fast lookups/counting, these come to mind.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("해시테이블 = 키로 값을 O(1) 에 찾는 도구", "Hash table = O(1) key-to-value lookup")}</li>
              <li><b>2.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">dict</code>, <code className="bg-white px-1.5 py-0.5 rounded">set</code></li>
              <li><b>3.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">unordered_map</code>, <code className="bg-white px-1.5 py-0.5 rounded">unordered_set</code></li>
              <li><b>4.</b> {t("빈도수 패턴", "Count pattern")}: <code className="bg-white px-1.5 py-0.5 rounded">counts[x]++</code> {t("또는", "or")} <code className="bg-white px-1.5 py-0.5 rounded">get(x, 0) + 1</code></li>
              <li><b>5.</b> {t("중복 제거", "Dedup")}: <code className="bg-white px-1.5 py-0.5 rounded">set(arr)</code> {t("한 줄로 끝", "in one line")}</li>
              <li><b>6.</b> {t("존재 확인", "Existence")}: <code className="bg-white px-1.5 py-0.5 rounded">x in s</code> / <code className="bg-white px-1.5 py-0.5 rounded">s.count(x)</code> — O(1)</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 정도면 해시 나오는 문제 거의 다 풀 수 있어요!", "This is enough for almost any hash-table problem!")}
            </p>
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
              ? <>🎉 {t("해시테이블 마스터!", "Hash Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function HashTablePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)
  const [showDestinationTip, setShowDestinationTip] = useState(false)

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
          user_id: user.id, lesson_id: "algo-hashtable", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-hashtable")) {
          arr.push("algo-hashtable")
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
              { label: "해시테이블", labelEn: "Hash Table", emoji: "📊" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🗂️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("해시테이블", "Hash Table")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze~Silver</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/hashtable/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("해시테이블 문제 12 개 — 한 번 봤다면 바로!", "12 Hash Table challenges — jump right in!")}</p>
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
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("해시테이블 마스터!", "Hash Table Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
              🗺️ {t("다음 알고리즘 토픽 보기", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
