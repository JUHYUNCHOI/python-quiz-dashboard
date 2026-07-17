"use client"

/**
 * 스택과 큐 (Stack & Queue) — 챕터식 학습 페이지 v1.
 *
 * Bronze 학생용 핵심 도구:
 *   - 스택 (LIFO) = 책 쌓기 / 접시 더미
 *   - 큐 (FIFO) = 줄서기 / 매표소
 *   - 어떤 문제에서 어떤 걸 쓰는지 직관 + Python/C++ 사용법
 *
 * sorting / prefixsum 페이지 패턴 그대로 따라감.
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
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🤔", title: "왜 스택? 왜 큐?",         titleEn: "Why Stack? Why Queue?",    mins: 4 },
  { id: 2, emoji: "📈", title: "Monotonic Stack — 다음 큰 수", titleEn: "Monotonic Stack — Next Greater", mins: 7 },
  { id: 3, emoji: "🌊", title: "BFS 의 도구 — 큐",         titleEn: "Queue as BFS Tool",        mins: 7 },
  { id: 4, emoji: "🔧", title: "시뮬레이션 + 괄호 매칭",     titleEn: "Simulation + Bracket Matching", mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",              titleEn: "Recap & Practice",         mins: 4 },
]

const STORAGE_KEY = "algo-stackqueue-chapter"

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

function CodeBlock({ py, cpp, lang }: { py: string; cpp: string; lang: CodeLang }) {
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

// ── Chapter 1: 복습 + 알고리즘 관점 ───────────────────────────────
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
              {t("오랜만! 스택·큐는 알죠?", "Welcome back! You know stack & queue, right?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                codeLang === "py"
                  ? "수업에서 이미 봤어요 — 파이썬 레슨 23 (스택), 24 (큐), 25 (덱). list 와 collections.deque 로 직접 써봤죠."
                  : "수업에서 이미 봤어요 — C++ 레슨 cpp-18 에서 std::stack, std::queue, std::deque 직접 써봤죠.",
                codeLang === "py"
                  ? "You saw it in class — Python lessons 23 (stack), 24 (queue), 25 (deque). You used list and collections.deque hands-on."
                  : "You saw it in class — C++ lesson cpp-18: std::stack, std::queue, std::deque hands-on.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "여기 알고리즘 토픽에서는 — 자료구조 자체를 처음 배우는 게 아니라, *알고리즘에서 도구로 쓰일 때* 의 관점을 봐요. 어떤 문제 신호에서 스택을 꺼내고, 어떤 신호에서 큐를 꺼낼지.",
                "Here in the algorithm topic — we're not learning the data structure from scratch. We're looking at it *as a tool for algorithms*: which problem signals call for stack, which for queue.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t("가볍게 한 번 복습하고, 알고리즘 관점으로 넘어가요 ↓", "Quick recap, then onto the algorithm view ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-gray-900 mb-3 text-center">⚡ {t("30 초 복습", "30-second Recap")}</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-3">
                <p className="text-sm font-black text-emerald-800 mb-1.5">📚 {t("스택", "Stack")}</p>
                <p className="text-[11px] text-emerald-700 font-bold mb-2">LIFO</p>
                <ul className="text-[11px] text-gray-700 space-y-0.5">
                  <li>• push (x) — {t("위에 넣기", "add to top")}</li>
                  <li>• pop () — {t("위에서 빼기", "remove top")}</li>
                  <li>• top () — {t("위만 확인", "peek top")}</li>
                </ul>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                <p className="text-sm font-black text-blue-800 mb-1.5">🚶 {t("큐", "Queue")}</p>
                <p className="text-[11px] text-blue-700 font-bold mb-2">FIFO</p>
                <ul className="text-[11px] text-gray-700 space-y-0.5">
                  <li>• push (x) — {t("뒤에 넣기", "add to back")}</li>
                  <li>• pop () — {t("앞에서 빼기", "remove front")}</li>
                  <li>• front () — {t("앞만 확인", "peek front")}</li>
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 text-center leading-relaxed">
              {t(
                codeLang === "py"
                  ? "기억나죠? Python 은 list (스택) 와 collections.deque (큐) 로 둘 다 처리. C++ 은 std::stack / std::queue 따로 있고요."
                  : "기억나죠? C++ 은 std::stack / std::queue 따로. Python 은 list 와 deque 로 둘 다 처리.",
                codeLang === "py"
                  ? "Remember? Python: list (stack) + collections.deque (queue). C++: separate std::stack / std::queue."
                  : "Remember? C++: separate std::stack / std::queue. Python: list + deque cover both.",
              )}
            </p>
            <p className="text-[11px] text-amber-700 text-center mt-2 italic">
              {t("연산 자체는 다음 챕터에서 한 번 더 정리해요 — 안 헷갈리게.", "Operations are recapped in the next chapters — just to be safe.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border-2 border-purple-300 p-4">
            <p className="text-base font-black text-purple-900 mb-3 text-center">🎯 {t("이 토픽에서 다룰 것", "What this topic covers")}</p>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              {t(
                "자료구조는 안 까먹었으니까 — 알고리즘 관점만 새로 봐요. 스택/큐가 *어떤 문제* 에서 결정적인 도구가 되는지.",
                "You haven't forgotten the data structure — so we'll just look at the algorithm angle: what problems make stack/queue the decisive tool.",
              )}
            </p>
            <div className="space-y-2">
              <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg p-3">
                <p className="text-xs font-black text-emerald-800 mb-1">📚 {t("스택이 빛나는 곳", "Where stack shines")}</p>
                <p className="text-[11px] text-gray-700">{t("괄호 매칭, '가장 최근 거', 재귀 시뮬레이션", "Bracket matching, 'most recent', recursion simulation")}</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                <p className="text-xs font-black text-blue-800 mb-1">🚶 {t("큐가 빛나는 곳", "Where queue shines")}</p>
                <p className="text-[11px] text-gray-700">{t("줄서기 시뮬레이션, BFS (너비 우선 탐색) 의 핵심 도구", "Line simulation, BFS (the key tool inside breadth-first search)")}</p>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 text-center mt-3 italic">
              {t("자세한 건 챕터 2-4 에서. 지금은 '아 이런 거 다룬다' 정도만.", "Details in chapters 2-4. For now just: 'oh, that's what we'll cover'.")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: Monotonic Stack — 다음 큰 수 ───────────────────────
function Chapter2({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Monotonic stack visualization — [2, 5, 3, 1, 4]
  const arr = [2, 5, 3, 1, 4]
  const [vizStep, setVizStep] = useState(0)
  // Pre-computed step states. Each state: { i, stack (indices), ans (length n) }
  // Algorithm: iterate i, while stack not empty and arr[stack.top()] < arr[i], pop & set ans[popped] = arr[i]; push i.
  const vizStates: { i: number; stack: number[]; ans: (number | null)[]; note: string }[] = [
    { i: 0, stack: [0],       ans: [null, null, null, null, null], note: "i=0: 빈 스택 → 0 push" },
    { i: 1, stack: [1],       ans: [5,    null, null, null, null], note: "i=1: arr[1]=5 > arr[0]=2 → pop 0, ans[0]=5. 1 push" },
    { i: 2, stack: [1, 2],    ans: [5,    null, null, null, null], note: "i=2: arr[2]=3 < arr[1]=5 → 그냥 2 push" },
    { i: 3, stack: [1, 2, 3], ans: [5,    null, null, null, null], note: "i=3: arr[3]=1 < arr[2]=3 → 그냥 3 push" },
    { i: 4, stack: [1, 4],    ans: [5,    null, 4,    4,    null], note: "i=4: arr[4]=4 > 1, 3 → pop 3 (ans[3]=4), pop 2 (ans[2]=4). 4 push" },
    { i: 5, stack: [1, 4],    ans: [5,    null, 4,    4,    null], note: "끝. 남은 인덱스 1, 4 는 다음 큰 수 없음 → -1" },
  ]
  const state = vizStates[vizStep]
  const isEnd = vizStep === vizStates.length - 1

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📈</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("다음으로 큰 수 찾기 — naive 는 너무 느려요", "Next Greater Element — naive is too slow")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "배열의 각 원소마다 '오른쪽에서 처음으로 자기보다 큰 수' 를 찾는 문제. 단순하게 짜면 이중 루프 → O(N²) 인데, N=10⁵ 이면 답 안 나와요.",
                "For each element, find 'the first greater number to its right'. The naive double loop is O(N²) — at N=10⁵ it times out.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-1">💡 {t("Monotonic Stack 패턴", "Monotonic stack pattern")}</p>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                {t(
                  "스택에 '아직 답을 못 찾은 인덱스' 를 쌓아둬요. 새 원소가 들어올 때, 그게 스택 top 보다 크면 — top 의 답이 *바로 이 새 원소* 라는 뜻. 그래서 pop 하면서 답 기록. 각 인덱스가 최대 1번 push, 1번 pop → O(N).",
                  "Stack holds 'indices waiting for an answer'. When a new element arrives, if it's bigger than stack top — that's the answer for top. Pop and record. Each index pushed/popped at most once → O(N).",
                )}
              </p>
            </div>
            <p className="text-xs text-emerald-700 text-center font-bold leading-relaxed">
              {t("다음 슬라이드에서 직접 step by step 으로 봐요 →", "Walk through it step by step next →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("step by step — arr = [2, 5, 3, 1, 4]", "Step by step — arr = [2, 5, 3, 1, 4]")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("'다음 단계' 누르면서 스택과 ans 가 어떻게 변하는지 봐요.", "Press 'Next step' and watch the stack & ans change.")}
            </p>

            {/* 배열 — 현재 i 강조 */}
            <div className="flex justify-center gap-1 mb-3">
              {arr.map((v, i) => {
                const isCurrent = !isEnd && i === state.i
                const inStack = state.stack.includes(i)
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[9px] text-gray-400 mb-0.5">i={i}</div>
                    <div className={cn(
                      "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all",
                      isCurrent ? "bg-orange-100 border-orange-500 text-orange-700 scale-110" :
                      inStack ? "bg-emerald-50 border-emerald-300 text-emerald-700" :
                      "bg-gray-50 border-gray-200 text-gray-500",
                    )}>{v}</div>
                  </div>
                )
              })}
            </div>

            {/* 스택 시각화 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1.5">📚 {t("스택 (top → 오른쪽)", "Stack (top → right)")}</p>
              <div className="flex gap-1 min-h-[36px] items-center flex-wrap">
                {state.stack.length === 0 ? (
                  <span className="text-[11px] text-gray-400 italic">{t("(비어 있음)", "(empty)")}</span>
                ) : (
                  state.stack.map((idx, k) => (
                    <div key={k} className={cn(
                      "px-2 py-1 rounded border-2 font-mono text-xs",
                      k === state.stack.length - 1 ? "bg-emerald-100 border-emerald-400 text-emerald-700" : "bg-white border-emerald-200 text-emerald-600",
                    )}>
                      i={idx} (v={arr[idx]})
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ans 배열 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1.5">📝 ans</p>
              <div className="flex gap-1">
                {state.ans.map((v, i) => (
                  <div key={i} className="w-10 h-8 rounded border border-gray-300 bg-white flex items-center justify-center font-mono text-xs">
                    {v === null ? <span className="text-gray-300">·</span> : <span className="text-blue-700 font-bold">{v}</span>}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded p-2 mb-3 leading-relaxed">
              {state.note}
            </p>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg font-bold text-sm">
                ← {t("이전", "Prev")}
              </button>
              <button onClick={() => setVizStep(Math.min(vizStates.length - 1, vizStep + 1))} disabled={isEnd}
                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                {t("다음 단계", "Next step")} →
              </button>
              <button onClick={() => setVizStep(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("코드 — 핵심은 while 루프 안의 pop", "Code — the key is the while-pop loop")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "스택에 '인덱스' 를 넣는 게 포인트. 값만 넣으면 답 배열의 어디에 기록할지 모르거든요.",
                  "Push *indices* (not values) — otherwise you don't know where to write the answer.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={t(`# Next Greater Element — O(N)
def next_greater(arr):
    n = len(arr)
    ans = [-1] * n
    stack = []                       # 인덱스만 저장

    for i in range(n):
        # 스택 top 의 값보다 현재가 더 크면 — top 의 답 = arr[i]
        while stack and arr[stack[-1]] < arr[i]:
            j = stack.pop()
            ans[j] = arr[i]
        stack.append(i)
    # 남은 인덱스는 답이 없음 → -1 그대로
    return ans

print(next_greater([2, 5, 3, 1, 4]))
# [5, -1, 4, 4, -1]`, `# Next Greater Element — O(N)
def next_greater(arr):
    n = len(arr)
    ans = [-1] * n
    stack = []                       # stores indices only

    for i in range(n):
        # if current is bigger than value at stack top — top's answer = arr[i]
        while stack and arr[stack[-1]] < arr[i]:
            j = stack.pop()
            ans[j] = arr[i]
        stack.append(i)
    # remaining indices have no answer → stay -1
    return ans

print(next_greater([2, 5, 3, 1, 4]))
# [5, -1, 4, 4, -1]`)}
              cpp={t(`// Next Greater Element — O(N)
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> ans(n, -1);
    stack<int> st;                   // stores indices

    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            int j = st.top(); st.pop();
            ans[j] = arr[i];
        }
        st.push(i);
    }
    // remaining indices stay -1
    return ans;
}
// nextGreater({2,5,3,1,4}) → {5,-1,4,4,-1}`, `// Next Greater Element — O(N)
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> ans(n, -1);
    stack<int> st;                   // stores indices

    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            int j = st.top(); st.pop();
            ans[j] = arr[i];
        }
        st.push(i);
    }
    // remaining indices stay -1
    return ans;
}
// nextGreater({2,5,3,1,4}) → {5,-1,4,4,-1}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "💡 각 인덱스가 최대 1번 push / 1번 pop → 총 연산 2N → O(N). 겉으로는 이중 루프 같지만 실제는 선형.",
                "💡 Each index pushed/popped at most once → 2N total ops → O(N). Looks nested but is actually linear.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "monotonic stack 의 핵심 invariant 는?",
              "What's the key invariant of a monotonic stack?",
            )}
            options={[
              t("스택은 항상 정렬됨", "The stack is always sorted"),
              t("스택 안의 원소 (값) 는 강(엄)감소 — top 으로 갈수록 작아짐", "Stack values are strictly decreasing — smaller toward top"),
              t("스택은 항상 비어 있음", "The stack is always empty"),
              t("스택에는 한 원소만 들어 있음", "The stack holds only one element"),
            ]}
            answerIdx={1}
            hint={t("왜 pop 하는지 생각해 봐요 — 현재가 더 크면 이전 작은 것들이 답을 찾았어요. 그래서 스택에 남아 있는 건 항상 '내려가는' 순서.", "Think about *why* we pop — when current is bigger, the smaller ones below have their answer. So what remains is always 'going down'.")}
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

// ── Chapter 3: BFS 의 도구 — 큐 ───────────────────────────────────
function Chapter3({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // BFS 3x3 grid viz — start (0,0) target (2,2)
  // dist[r][c] = step distance from start, -1 if unvisited
  // We pre-compute the sequence of states (popping from queue + pushing neighbors).
  type Cell = [number, number]
  const N = 3
  // Each viz state shows: current dist grid, current queue contents
  const bfsStates: { dist: number[][]; queue: Cell[]; note: string }[] = [
    {
      dist: [[0,-1,-1],[-1,-1,-1],[-1,-1,-1]],
      queue: [[0,0]],
      note: t("시작: (0,0) 을 큐에 넣고 거리 0", "Start: push (0,0), distance 0"),
    },
    {
      dist: [[0,1,-1],[1,-1,-1],[-1,-1,-1]],
      queue: [[0,1],[1,0]],
      note: t("(0,0) pop → 이웃 (0,1), (1,0) push, 거리 1", "Pop (0,0) → push neighbors (0,1), (1,0), dist 1"),
    },
    {
      dist: [[0,1,2],[1,2,-1],[-1,-1,-1]],
      queue: [[1,0],[0,2],[1,1]],
      note: t("(0,1) pop → (0,2), (1,1) push, 거리 2", "Pop (0,1) → push (0,2), (1,1), dist 2"),
    },
    {
      dist: [[0,1,2],[1,2,-1],[2,-1,-1]],
      queue: [[0,2],[1,1],[2,0]],
      note: t("(1,0) pop → (2,0) push, 거리 2 (이미 본 (0,0), (1,1) 은 skip)", "Pop (1,0) → push (2,0), dist 2 (skip visited)"),
    },
    {
      dist: [[0,1,2],[1,2,3],[2,-1,-1]],
      queue: [[1,1],[2,0],[1,2]],
      note: t("(0,2) pop → (1,2) push, 거리 3", "Pop (0,2) → push (1,2), dist 3"),
    },
    {
      dist: [[0,1,2],[1,2,3],[2,3,-1]],
      queue: [[2,0],[1,2],[2,1]],
      note: t("(1,1) pop → (2,1) push, 거리 3", "Pop (1,1) → push (2,1), dist 3"),
    },
    {
      dist: [[0,1,2],[1,2,3],[2,3,4]],
      queue: [[1,2],[2,1],[2,2]],
      note: t("(2,0) pop → (2,2) 도달! 거리 4", "Pop (2,0) → reached (2,2)! distance 4"),
    },
  ]
  const [vizStep, setVizStep] = useState(0)
  const bfsState = bfsStates[vizStep]
  const isEnd = vizStep === bfsStates.length - 1

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("큐 = BFS 의 핵심 도구", "Queue = the core of BFS")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "BFS (너비 우선 탐색) 는 '시작점에서 몇 스텝?' 같은 *최단 거리* 문제의 기본기. 한 칸씩 동심원처럼 퍼져나가요.",
                "BFS (breadth-first search) is the bread-and-butter of *shortest-step* problems. It expands in concentric rings, one step at a time.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-blue-200 mb-3">
              <p className="text-xs font-bold text-blue-800 mb-1.5">{t("왜 큐?", "Why queue?")}</p>
              <p className="text-[11px] text-gray-700 leading-relaxed mb-2">
                {t(
                  "FIFO 라서 '먼저 큐에 들어간 = 거리가 더 짧음' 이 항상 보장돼요. 거리 1 짜리 노드를 다 처리한 다음에야 거리 2 노드가 나옴 → level by level.",
                  "FIFO guarantees 'enqueued earlier = closer to start'. All distance-1 nodes finish before any distance-2 starts → level by level.",
                )}
              </p>
              <p className="text-[11px] text-gray-600 italic">
                {t(
                  "스택 (DFS) 쓰면 어디로 *깊이* 빠질지 몰라서 최단 보장 안 됨.",
                  "Stack (DFS) dives deep wherever — no shortest-path guarantee.",
                )}
              </p>
            </div>
            <p className="text-xs text-blue-700 text-center font-bold leading-relaxed">
              {t("다음 슬라이드에서 3x3 격자에서 BFS 가 어떻게 퍼지는지 봐요 →", "See BFS expand on a 3×3 grid next →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">
              🎮 {t("3×3 격자 BFS — (0,0) → (2,2)", "3×3 grid BFS — (0,0) → (2,2)")}
            </p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("각 칸의 숫자 = 시작점에서의 거리. 큐는 거리 순서대로 처리돼요.", "Each cell = distance from start. Queue processes in distance order.")}
            </p>

            {/* 격자 */}
            <div className="flex justify-center mb-3">
              <div className="inline-grid grid-cols-3 gap-1 bg-gray-100 p-2 rounded-lg">
                {bfsState.dist.map((row, r) =>
                  row.map((d, c) => {
                    const isStart = r === 0 && c === 0
                    const isTarget = r === 2 && c === 2
                    const inQueue = bfsState.queue.some(([qr, qc]) => qr === r && qc === c)
                    const visited = d >= 0
                    return (
                      <div key={`${r}-${c}`} className={cn(
                        "w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold transition-all",
                        isStart ? "bg-emerald-100 border-emerald-500 text-emerald-700" :
                        isTarget && visited ? "bg-orange-100 border-orange-500 text-orange-700" :
                        inQueue ? "bg-blue-100 border-blue-400 text-blue-700" :
                        visited ? "bg-indigo-50 border-indigo-300 text-indigo-700" :
                        "bg-white border-gray-300 text-gray-300",
                      )}>
                        <span className="text-[8px] text-gray-400">({r},{c})</span>
                        <span className="text-sm">{visited ? d : "·"}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* 큐 시각화 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1.5">🚶 {t("큐 (front → 왼쪽)", "Queue (front → left)")}</p>
              <div className="flex gap-1 min-h-[36px] items-center flex-wrap">
                <span className="text-[9px] text-gray-400 mr-1">← front</span>
                {bfsState.queue.length === 0 ? (
                  <span className="text-[11px] text-gray-400 italic">{t("(비어 있음)", "(empty)")}</span>
                ) : (
                  bfsState.queue.map(([r, c], k) => (
                    <div key={k} className={cn(
                      "px-2 py-1 rounded border-2 font-mono text-xs",
                      k === 0 ? "bg-blue-100 border-blue-400 text-blue-700" : "bg-white border-blue-200 text-blue-600",
                    )}>
                      ({r},{c})
                    </div>
                  ))
                )}
              </div>
            </div>

            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded p-2 mb-3 leading-relaxed">
              {bfsState.note}
            </p>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg font-bold text-sm">
                ← {t("이전", "Prev")}
              </button>
              <button onClick={() => setVizStep(Math.min(bfsStates.length - 1, vizStep + 1))} disabled={isEnd}
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                {t("다음 단계", "Next step")} →
              </button>
              <button onClick={() => setVizStep(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("BFS 골격 — 어떤 그래프든 거의 같음", "BFS skeleton — almost identical across graphs")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "방문한 칸은 다시 큐에 넣지 않게 visited (또는 dist != -1) 체크 필수. 안 하면 무한 루프나 폭발.",
                  "Mark visited (or dist != -1) before pushing — otherwise you re-queue forever and explode.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={t(`# BFS — 격자에서 최단 거리
from collections import deque

def bfs(grid, sr, sc):
    R, C = len(grid), len(grid[0])
    dist = [[-1] * C for _ in range(R)]
    dist[sr][sc] = 0
    q = deque([(sr, sc)])

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    while q:
        r, c = q.popleft()         # 앞에서 꺼냄 (FIFO!)
        for d in range(4):
            nr, nc = r + dr[d], c + dc[d]
            if 0 <= nr < R and 0 <= nc < C and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))     # 뒤에 추가
    return dist`, `# BFS — shortest distance on a grid
from collections import deque

def bfs(grid, sr, sc):
    R, C = len(grid), len(grid[0])
    dist = [[-1] * C for _ in range(R)]
    dist[sr][sc] = 0
    q = deque([(sr, sc)])

    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]

    while q:
        r, c = q.popleft()         # pop from front (FIFO!)
        for d in range(4):
            nr, nc = r + dr[d], c + dc[d]
            if 0 <= nr < R and 0 <= nc < C and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))     # push to back
    return dist`)}
              cpp={t(`// BFS — grid 최단 거리
#include <queue>
#include <vector>
using namespace std;

vector<vector<int>> bfs(vector<vector<int>>& grid, int sr, int sc) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<int>> dist(R, vector<int>(C, -1));
    queue<pair<int,int>> q;

    dist[sr][sc] = 0;
    q.push({sr, sc});
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();   // 앞에서!
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (dist[nr][nc] != -1) continue;       // 이미 본 칸 skip
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    return dist;
}`, `// BFS — shortest distance on a grid
#include <queue>
#include <vector>
using namespace std;

vector<vector<int>> bfs(vector<vector<int>>& grid, int sr, int sc) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<int>> dist(R, vector<int>(C, -1));
    queue<pair<int,int>> q;

    dist[sr][sc] = 0;
    q.push({sr, sc});
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();   // from front!
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            if (dist[nr][nc] != -1) continue;       // already seen, skip
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    return dist;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "💡 핵심: popleft / q.front () + q.pop () 로 *앞에서* 꺼내고, *뒤에* push. 거리 갱신은 push 직전에 (재방문 방지).",
                "💡 Key: pull from *front*, push to *back*. Set dist *before* pushing — prevents re-queueing.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "BFS 가 항상 최단 거리 (스텝 수) 를 보장하는 이유는?",
              "Why does BFS always give shortest distance (in steps)?",
            )}
            options={[
              t("큐는 FIFO 라서 — 같은 거리에 있는 노드들이 함께 처리되고, 더 먼 거리 노드는 그 뒤에야 처리됨 (level by level)", "Queue is FIFO — same-distance nodes process together, farther ones strictly after (level by level)"),
              t("큐가 항상 정렬돼서", "Because the queue is always sorted"),
              t("DFS 보다 메모리를 적게 써서", "Because it uses less memory than DFS"),
              t("코드가 짧아서", "Because the code is short"),
            ]}
            answerIdx={0}
            hint={t("level 단위 탐색 — 큐 안에는 거리 d 와 d+1 인 노드만 섞여 있고, d 가 항상 앞쪽에 있어요.", "Level-by-level — the queue holds only distance d and d+1, with d always at the front.")}
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

// ── Chapter 4: 시뮬레이션 + 괄호 매칭 ─────────────────────────────
function Chapter4({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Bracket matching visualization — "([{}])"
  const input = "([{}])"
  // Each state: stack at this point, pointer index, status note
  const bracketStates: { ptr: number; stack: string[]; note: string; valid: boolean | null }[] = [
    { ptr: 0, stack: [],            note: t("시작 — 스택 비어 있음", "Start — empty stack"), valid: null },
    { ptr: 1, stack: ["("],         note: t("'(' — 여는 괄호 → push", "'(' — opening → push"), valid: null },
    { ptr: 2, stack: ["(", "["],    note: t("'[' — 여는 괄호 → push", "'[' — opening → push"), valid: null },
    { ptr: 3, stack: ["(", "[", "{"], note: t("'{' — 여는 괄호 → push", "'{' — opening → push"), valid: null },
    { ptr: 4, stack: ["(", "["],    note: t("'}' — top '{' 와 짝! → pop", "'}' — matches top '{' → pop"), valid: null },
    { ptr: 5, stack: ["("],         note: t("']' — top '[' 와 짝! → pop", "']' — matches top '[' → pop"), valid: null },
    { ptr: 6, stack: [],            note: t("')' — top '(' 와 짝! → pop. 끝에 스택 비어 있음 → 유효!", "')' — matches top '(' → pop. Stack empty at end → valid!"), valid: true },
  ]
  const [vizStep, setVizStep] = useState(0)
  const brState = bracketStates[vizStep]
  const isEnd = vizStep === bracketStates.length - 1

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔧</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("괄호/짝 맞추기 — 스택의 고전", "Bracket / pair matching — the classic stack problem")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "'()[]{}' 같이 짝이 맞는지 검사. 여는 괄호는 push, 닫는 괄호가 오면 top 과 짝 맞는지 확인 후 pop. 마지막에 스택이 비어 있어야 OK.",
                "Validate '()[]{}'. Push openings; on a closing, check it matches top and pop. Stack must be empty at the end.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-1.5">{t("왜 스택?", "Why stack?")}</p>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                {t(
                  "닫는 괄호는 *가장 최근에 열린* 여는 괄호와 짝이 돼야 해요. '가장 최근' = 스택의 top. 그래서 LIFO 가 정확히 맞아 들어요.",
                  "A closing bracket pairs with the *most recently opened* one. 'Most recent' = top of stack. LIFO fits exactly.",
                )}
              </p>
            </div>
            <p className="text-xs text-purple-700 text-center font-bold leading-relaxed">
              {t("다음 슬라이드에서 '([{}])' 가 어떻게 검증되는지 봐요 →", "See '([{}])' validated step by step →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">
              🎮 {t("step by step — '([{}])'", "Step by step — '([{}])'")}
            </p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("각 문자를 차례로 보면서 스택 변화를 추적해요.", "Walk through each char and track the stack.")}
            </p>

            {/* 입력 문자열 — pointer */}
            <div className="flex justify-center gap-1 mb-3">
              {input.split("").map((c, i) => {
                const isCurrent = i === brState.ptr - 1 && brState.ptr > 0
                const isProcessed = i < brState.ptr
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[9px] text-gray-400 mb-0.5">{i}</div>
                    <div className={cn(
                      "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-base transition-all",
                      isCurrent ? "bg-orange-100 border-orange-500 text-orange-700 scale-110" :
                      isProcessed ? "bg-indigo-50 border-indigo-300 text-indigo-600" :
                      "bg-gray-50 border-gray-200 text-gray-500",
                    )}>{c}</div>
                  </div>
                )
              })}
            </div>

            {/* 스택 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1.5">📚 {t("스택 (top → 오른쪽)", "Stack (top → right)")}</p>
              <div className="flex gap-1 min-h-[36px] items-center">
                {brState.stack.length === 0 ? (
                  <span className="text-[11px] text-gray-400 italic">{t("(비어 있음)", "(empty)")}</span>
                ) : (
                  brState.stack.map((c, k) => (
                    <div key={k} className={cn(
                      "w-9 h-9 rounded border-2 flex items-center justify-center font-mono font-bold",
                      k === brState.stack.length - 1 ? "bg-purple-100 border-purple-400 text-purple-700" : "bg-white border-purple-200 text-purple-600",
                    )}>{c}</div>
                  ))
                )}
              </div>
            </div>

            <p className={cn(
              "text-[11px] rounded p-2 mb-3 leading-relaxed border",
              brState.valid === true ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold" :
              "bg-amber-50 border-amber-200 text-amber-800",
            )}>
              {brState.note}
            </p>

            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg font-bold text-sm">
                ← {t("이전", "Prev")}
              </button>
              <button onClick={() => setVizStep(Math.min(bracketStates.length - 1, vizStep + 1))} disabled={isEnd}
                className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                {t("다음 단계", "Next step")} →
              </button>
              <button onClick={() => setVizStep(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">📝 {t("코드 — pair map 으로 짝 확인", "Code — use a pair map to match")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "실패 케이스는 3 가지: (1) 닫는 괄호인데 스택이 비어 있음, (2) top 이 짝 안 맞음, (3) 끝났는데 스택에 여는 괄호 남음.",
                  "Three failure modes: (1) closing but stack empty, (2) top doesn't match, (3) leftover openings at the end.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={t(`# 괄호 짝맞추기 — 스택 활용
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)                  # 여는 → push
        else:
            # 닫는 괄호
            if not stack or stack[-1] != pairs[ch]:
                return False                  # 비었거나 짝 안 맞음
            stack.pop()
    return not stack                          # 남은 여는 괄호 없어야 OK

print(is_valid("([{}])"))   # True
print(is_valid("(]"))        # False — 짝 안 맞음
print(is_valid("([)]"))      # False — 중간에 깨짐
print(is_valid("((("))       # False — 끝에 남음`, `# Bracket matching — using a stack
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)                  # opening → push
        else:
            # closing bracket
            if not stack or stack[-1] != pairs[ch]:
                return False                  # empty or mismatch
            stack.pop()
    return not stack                          # nothing left → OK

print(is_valid("([{}])"))   # True
print(is_valid("(]"))        # False — mismatch
print(is_valid("([)]"))      # False — broken in the middle
print(is_valid("((("))       # False — leftover at the end`)}
              cpp={t(`// 괄호 짝맞추기 — 스택 활용
#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {
        {')', '('}, {']', '['}, {'}', '{'}
    };
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);                       // 여는 → push
        } else {
            // 닫는 괄호
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        }
    }
    return st.empty();                        // 남은 여는 괄호 없어야
}`, `// Bracket matching — using a stack
#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {
        {')', '('}, {']', '['}, {'}', '{'}
    };
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);                       // opening → push
        } else {
            // closing bracket
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        }
    }
    return st.empty();                        // nothing left → OK
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "💡 이 패턴은 '되돌리기 (undo)', '히스토리 한 단계 뒤로', '재귀 호출 시뮬레이션' 등 — '가장 최근 거 꺼내기' 가 핵심인 모든 문제에 같은 골격.",
                "💡 Same skeleton for undo, history back, simulating recursion — anything that pulls 'the most recent thing'.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "괄호 문자열 '(]' 가 유효하지 않은 이유는?",
              "Why is the bracket string '(]' invalid?",
            )}
            options={[
              t("스택이 비어 있어서", "Because the stack is empty"),
              t("닫는 괄호 ']' 가 스택 top '(' 와 짝이 안 맞아서", "Because closing ']' doesn't match top '(' on the stack"),
              t("길이가 짝수라서", "Because the length is even"),
              t("처음 문자가 '(' 라서", "Because it starts with '('"),
            ]}
            answerIdx={1}
            hint={t("')' 를 만나면 top 이 '(' 인지 확인. ']' 를 만나면 top 이 '[' 인지 확인. 짝이 안 맞으면 그 자리에서 false.", "On ')', check top is '('. On ']', check top is '['. Mismatch → false immediately.")}
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

// ── Chapter 5: 정리 + 실전 ────────────────────────────────────────
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
              {t("우와, 스택/큐 다 봤어요!", "Wow, stack & queue done!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요 👏 이제 문제에 '마지막에 본 거' 가 나오면 스택, '먼저 온 거 먼저' 나오면 큐가 머리에 떠오를 거예요. 핵심들 한 번만 더 정리하고 가요.",
                "Nice work 👏 Now when you see 'last seen' → stack, 'first in, first out' → queue should pop into your head. Quick recap below.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("스택 = LIFO — 마지막에 넣은 게 먼저 나옴 (책 더미)", "Stack = LIFO — last in, first out (book pile)")}</li>
              <li><b>2.</b> {t("큐 = FIFO — 먼저 넣은 게 먼저 나옴 (매표소 줄)", "Queue = FIFO — first in, first out (ticket line)")}</li>
              <li><b>3.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">list</code> {t("를 스택,", "for stack,")} <code className="bg-white px-1.5 py-0.5 rounded">deque</code> {t("를 큐로", "for queue")}</li>
              <li><b>4.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">stack&lt;T&gt;</code>, <code className="bg-white px-1.5 py-0.5 rounded">queue&lt;T&gt;</code></li>
              <li><b>5.</b> {t("연산 3개씩: push / pop / top(front)", "3 ops each: push / pop / top(front)")}</li>
              <li><b>6.</b> {t("괄호 짝맞추기 = 스택, 줄서기 시뮬 = 큐, BFS = 큐", "Brackets = stack, line sim = queue, BFS = queue")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 정도면 Bronze 의 스택/큐 문제 대부분 풀어요!", "Enough to crack most Bronze stack/queue problems!")}
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-2.5">
        <div className="max-w-md mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => step < totalSteps - 1 ? setStep(step + 1) : onComplete()}
            className="flex-[2] py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95">
            {step === totalSteps - 1
              ? <>🎉 {t("스택/큐 마스터!", "Stack/Queue Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function StackQueuePage() {
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
          user_id: user.id, lesson_id: "algo-stackqueue", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-stackqueue")) {
          arr.push("algo-stackqueue")
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
              { label: "스택/큐", labelEn: "Stack/Queue", emoji: "📊" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">📚</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("스택과 큐", "Stack & Queue")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze</span>
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
            <Link href="/algo/stackqueue"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("스택/큐 문제 12 개 — 한 번 봤다면 바로!", "12 Stack/Queue challenges — jump right in!")}</p>
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
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("스택/큐 마스터!", "Stack/Queue Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/stackqueue" className="block px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm text-center border-2 border-emerald-200">
                🏆 {t("스택/큐 문제 풀러 가기", "Stack/Queue practice problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 보기", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
