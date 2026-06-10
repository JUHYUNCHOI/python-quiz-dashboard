"use client"

/**
 * 우선순위 큐 (Priority Queue / Heap) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — heap 은 Silver/Gold 의 핵심 도구. dijkstra/K-largest/스케줄링 모두 heap.
 * 비유 (응급실) → heap 사용법 (Python/C++) → K 패턴 → Dijkstra preview → 정리.
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
  { id: 1, emoji: "⚡", title: "왜 우선순위 큐?",          titleEn: "Why a Priority Queue?",          mins: 4 },
  { id: 2, emoji: "🔧", title: "heap 사용법",               titleEn: "Using a Heap",                   mins: 6 },
  { id: 3, emoji: "🎯", title: "K-largest / K-smallest",    titleEn: "K-largest / K-smallest",         mins: 7 },
  { id: 4, emoji: "🌐", title: "Dijkstra 미리보기",         titleEn: "Dijkstra Preview",               mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",                titleEn: "Recap & Practice",               mins: 5 },
]

const STORAGE_KEY = "algo-priorityqueue-chapter"

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

// ── Chapter 1: 왜 우선순위 큐? ───────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🚑</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("응급실 — 줄 서는 순서가 다름", "ER — order isn't by arrival")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "응급실엔 보통 줄 (FIFO) 이 없죠. *심정지 환자가 먼저*. 도착 순서가 아니라 ",
                "ER doesn't run on FIFO. *Cardiac arrest goes first*. Not by arrival — but by ",
              )}<b className="text-rose-700">{t("긴급도 순서", "priority")}</b>{t(
                " 로 처리해요.",
                ".",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-800 mb-1">💡 {t("우선순위 큐 = 그걸 코드로", "Priority queue = that, in code")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "넣은 순서 상관없이, *가장 작은 (또는 큰) 값* 을 빠르게 꺼내는 자료구조. 일반 큐와 달라요.",
                  "Regardless of insertion order, quickly pop the *smallest (or largest)* item. Unlike a normal queue.",
                )}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-sm font-bold text-amber-800 text-center">
                💛 {t("응급도 = 작은 수 (또는 큰 수). 그 한 가지만 빠르게.", "Priority = small (or large) number. That one thing, fast.")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⏱</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("정렬로 풀면 — 왜 부족할까?", "Why sorting isn't enough")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "\"매번 정렬해서 첫 번째 꺼내면 되잖아?\" — 맞아요, 작은 N 이면. 큰 N 에선 매번 sort = ",
                "\"Just sort each time and take the first?\" — fine for small N. For big N, sorting each time = ",
              )}<b className="text-rose-700">O(N log N)</b>{t(
                " 매번.",
                " every time.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-blue-200 mb-3">
              <p className="text-xs font-bold text-blue-800 mb-2">📊 {t("성능 비교 (값 하나 꺼낼 때)", "Pop one (per operation)")}</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-600">
                    <th className="text-left py-1">{t("방법", "Method")}</th>
                    <th className="text-right py-1">{t("시간", "Time")}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-200">
                    <td className="py-1 text-gray-700">{t("매번 sort", "sort each time")}</td>
                    <td className="text-right text-rose-700 font-bold">O(N log N)</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-1 text-gray-700">{t("매번 선형 탐색", "linear scan")}</td>
                    <td className="text-right text-rose-700 font-bold">O(N)</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-emerald-50">
                    <td className="py-1 text-emerald-800 font-bold">{t("우선순위 큐 (heap)", "priority queue (heap)")}</td>
                    <td className="text-right text-emerald-700 font-bold">O(log N) ✨</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              {t(
                "N=100만, 꺼내기 100만 번 — sort: 10조 연산. heap: 2천만 연산. *50만 배 차이*.",
                "N=1M, 1M pops — sort: 10 trillion ops. heap: 20 million. *500,000× faster*.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지", "3 things we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩.", "Preview — we'll dive into each next.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔧 1. {t("heap 사용법 — Python / C++", "Using a heap — Python / C++")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "라이브러리 두 줄이면 끝. push / pop 한 번에 O(log N). (챕터 2)",
                    "Two library lines. push / pop in O(log N). (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🎯 2. {t("K-largest / K-smallest 패턴", "K-largest / K-smallest pattern")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "100만 개에서 큰 거 10 개. sort 안 하고 heap 크기 K 만. (챕터 3)",
                    "Top 10 from 1M — without full sort, just a size-K heap. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌐 3. {t("Dijkstra 미리보기", "Dijkstra preview")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "최단경로 (다음 토픽) 의 핵심 도구. heap 이 왜 필요한지 직관 잡기. (챕터 4)",
                    "Core tool of shortest-path (next topic). Why heap is needed — get the intuition. (Ch 4)",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("준비 됐죠? 다음 챕터부터! →", "Ready? Onward! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: heap 사용법 ───────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 5
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: heap push/pop — heap = min-heap
  // ops 시퀀스: push 5, push 3, push 8, push 1, push 7, pop, pop, pop
  const ops: { kind: "push" | "pop"; val?: number; desc: string; descEn: string }[] = [
    { kind: "push", val: 5, desc: "push 5", descEn: "push 5" },
    { kind: "push", val: 3, desc: "push 3", descEn: "push 3" },
    { kind: "push", val: 8, desc: "push 8", descEn: "push 8" },
    { kind: "push", val: 1, desc: "push 1", descEn: "push 1" },
    { kind: "push", val: 7, desc: "push 7", descEn: "push 7" },
    { kind: "pop", desc: "pop → 1 (최솟값!)", descEn: "pop → 1 (min!)" },
    { kind: "pop", desc: "pop → 3", descEn: "pop → 3" },
    { kind: "pop", desc: "pop → 5", descEn: "pop → 5" },
  ]
  const [opIdx, setOpIdx] = useState(0)

  // 시뮬레이션 — 단순 정렬된 배열로 (실제 heap 구조는 다르지만, "정렬 보장" 시각화)
  const simHeap: number[] = []
  for (let i = 0; i < opIdx; i++) {
    const op = ops[i]
    if (op.kind === "push" && op.val !== undefined) {
      simHeap.push(op.val)
      simHeap.sort((a, b) => a - b)
    } else if (op.kind === "pop") {
      simHeap.shift()
    }
  }
  const curOp = opIdx < ops.length ? ops[opIdx] : null
  const heapStep = () => { if (opIdx < ops.length) setOpIdx(opIdx + 1) }
  const heapReset = () => setOpIdx(0)
  const heapDone = opIdx >= ops.length

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔧</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("heap — 두 가지 동작뿐", "heap — just two ops")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-1">
                  ⬆ push(x) — {t("값 하나 넣기", "insert one value")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "O(log N). 위치는 heap 이 알아서. 우리는 그냥 던지면 돼요.",
                    "O(log N). Heap places it; you just throw it in.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-1">
                  ⬇ pop() — {t("최솟값 (또는 최댓값) 꺼내기", "pop the min (or max)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "O(log N). 어떤 순서로 넣었든 *항상 가장 우선순위 높은 거*.",
                    "O(log N). Whatever order you pushed — *always the top-priority item*.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                ⚠️ <b>{t("주의 — 기본 방향이 언어마다 달라요!", "Heads up — default direction differs by language!")}</b>{" "}
                {t(
                  "Python heapq = min-heap (작은 거). C++ priority_queue = max-heap (큰 거). 다음 슬라이드에서 둘 다.",
                  "Python heapq = min-heap (smallest first). C++ priority_queue = max-heap (largest first). Both next slide.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("heap 시뮬 — push / pop", "heap sim — push / pop")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("min-heap. 어떤 순서로 push 해도 — pop 은 항상 최솟값.", "min-heap. Push any order — pop always returns the min.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[100px]">
              <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase">heap {t("내용", "contents")} ({t("최솟값 = 앞쪽", "min = front")})</p>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {simHeap.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">{t("(비어 있음)", "(empty)")}</p>
                ) : simHeap.map((v, i) => (
                  <div key={i} className={cn(
                    "px-3 py-2 rounded-md border-2 font-mono text-sm font-bold transition-all",
                    i === 0 ? "bg-emerald-100 border-emerald-500 text-emerald-800 scale-110" : "bg-blue-50 border-blue-300 text-blue-700",
                  )}>
                    {v}{i === 0 && t(" ←최소", " ←min")}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {heapDone ? (
                  <b className="text-emerald-700">✅ {t("끝! pop 순서: 1 → 3 → 5", "Done! pop order: 1 → 3 → 5")}</b>
                ) : curOp ? (
                  <span>{t("다음", "Next")}: <b>{t(curOp.desc, curOp.descEn)}</b></span>
                ) : null}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={heapStep} disabled={heapDone}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("실행", "Run")}
              </button>
              <button onClick={heapReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 text-center italic">
              {t(
                "내부는 트리 구조 — 다음 슬라이드에서 그 'log N' 의 정체를 봐요.",
                "Internally it's a tree — next slide reveals where that 'log N' comes from.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-5 border-2 border-indigo-200 min-h-[280px]">
            <p className="text-4xl text-center mb-2">🌲</p>
            <h3 className="text-lg font-black text-gray-900 mb-2 text-center">
              {t("heap 의 속 — log N 은 어디서?", "Inside a heap — where does log N come from?")}
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-3 text-center">
              {t(
                "heap 은 정렬된 리스트가 아니에요. *완전 이진 트리* — 규칙 딱 하나: ",
                "A heap isn't a sorted list. It's a *complete binary tree* — with one rule: ",
              )}<b className="text-indigo-700">{t("부모 ≤ 자식", "parent ≤ children")}</b>
              {t(" (min-heap). 그래서 루트가 *항상 최솟값*.", " (min-heap). So the root is *always the min*.")}
            </p>

            <div className="bg-white/80 rounded-lg p-3 border border-indigo-200 mb-3">
              <p className="text-[11px] font-bold text-indigo-700 mb-2 uppercase">{t("예: 1,3,5,8,7 을 넣으면", "e.g. after inserting 1,3,5,8,7")}</p>
              <pre className="text-[12px] font-mono text-gray-800 leading-relaxed text-center">{`        1        ← ${t("루트 = 최솟값", "root = min")}
      /   \\
     3     5
    / \\
   8   7

${t("모든 부모 ≤ 자식 ✓", "every parent ≤ its children ✓")}`}</pre>
            </div>

            <div className="space-y-2 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">⬆ push — {t("sift-up (위로 헤엄)", "sift-up (swim up)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "맨 끝에 넣고 → 부모보다 작으면 부모와 한 칸 교환 → 계속. *트리 높이만큼* 만 오르면 끝.",
                    "Drop it at the end → if smaller than parent, swap up one level → repeat. Climbs at most the *tree height*.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-sm font-black text-rose-800 mb-1">⬇ pop — {t("sift-down (아래로 가라앉기)", "sift-down (sink down)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "루트를 꺼낸 뒤 → 맨 끝 값을 루트로 올리고 → 자식 중 *작은 쪽* 과 교환하며 내려감. 역시 트리 높이만큼.",
                    "Take the root → move the last value to the root → swap down with the *smaller child*. Again, at most the tree height.",
                  )}
                </p>
              </div>
            </div>

            <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
              <p className="text-sm font-bold text-indigo-900 text-center leading-relaxed">
                {t(
                  "노드 N 개 트리의 높이 = log₂N. push/pop 은 *한 경로* 만 타고 오르내림 → ",
                  "A tree of N nodes has height log₂N. push/pop ride just *one path* up or down → ",
                )}<b>O(log N)</b>{t(". 성능표의 log N 이 바로 이거예요.", ". That's the log N in the table.")}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — min-heap / max-heap", "Code — min-heap / max-heap")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  "Python: heapq (min-default). C++: priority_queue (max-default). 부호 뒤집으면 반대.",
                  "Python: heapq (min default). C++: priority_queue (max default). Flip sign to reverse.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import heapq

# ── min-heap (기본) ──────────────────────────
h = []
heapq.heappush(h, 5)
heapq.heappush(h, 3)
heapq.heappush(h, 8)
heapq.heappush(h, 1)
print(heapq.heappop(h))   # 1  (최솟값)
print(heapq.heappop(h))   # 3
print(h[0])               # 5  (다음 최솟값, 보기만)

# ── max-heap (음수로 뒤집기) ──────────────────
mx = []
for v in [5, 3, 8, 1]:
    heapq.heappush(mx, -v)        # 음수로 push
top = -heapq.heappop(mx)          # 부호 복구
print(top)                # 8  (최댓값)`}
              cpp={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // ── max-heap (기본) ─────────────────────────
    priority_queue<int> pq;
    pq.push(5); pq.push(3); pq.push(8); pq.push(1);
    cout << pq.top() << endl;   // 8  (최댓값, 보기만)
    pq.pop();
    cout << pq.top() << endl;   // 5

    // ── min-heap (greater 비교자) ───────────────
    priority_queue<int, vector<int>, greater<int>> mn;
    mn.push(5); mn.push(3); mn.push(8); mn.push(1);
    cout << mn.top() << endl;   // 1  (최솟값)
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크포인트: ① heap 비어 있는지 ② push 한 다음 ③ pop 한 번이 *최우선*. 매 호출 O(log N).",
                "Checklist: ① is heap empty? ② push then ③ each pop returns *top priority*. O(log N) per call.",
              )}
            </p>
          </div>
        )}

        {step === 4 && (codeLang === "py" ? (
          <MiniQuiz
            question={t(
              "Python heapq 에 [5, 3, 8, 1, 7] 을 차례로 push 한 뒤 heappop 을 두 번 호출하면? (반환된 값 순서)",
              "Push 5, 3, 8, 1, 7 into Python heapq, then heappop twice. What's returned?",
            )}
            options={[
              t("5, 3 (넣은 순서)", "5, 3 (insertion order)"),
              "1, 3",
              "1, 7",
              "3, 5",
            ]}
            answerIdx={1}
            hint={t(
              "heapq 는 min-heap. 넣은 순서 무관 — 매번 *최솟값* 이 나옴. 최솟값 = 1, 다음 최솟값 = 3.",
              "heapq is a min-heap. Order of insertion doesn't matter — each pop returns the *smallest*. Min = 1, next = 3.",
            )}
            onCorrect={() => setQuizPassed(true)}
          />
        ) : (
          <MiniQuiz
            question={t(
              "C++ priority_queue<int> 에 5, 3, 8, 1, 7 을 push 한 뒤 top() / pop() 을 두 번 하면? (반환된 값 순서)",
              "Push 5, 3, 8, 1, 7 into C++ priority_queue<int>, then top()+pop() twice. What's returned?",
            )}
            options={[
              t("5, 3 (넣은 순서)", "5, 3 (insertion order)"),
              "1, 3",
              "8, 7",
              "3, 5",
            ]}
            answerIdx={2}
            hint={t(
              "priority_queue<int> 는 기본 max-heap. 매번 *최댓값* 반환. 최댓값 = 8, 다음 = 7.",
              "Default priority_queue<int> is a max-heap. Each pop returns the *largest*. Max = 8, next = 7.",
            )}
            onCorrect={() => setQuizPassed(true)}
          />
        ))}
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

// ── Chapter 3: K-largest / K-smallest ────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬: K=3, stream = [4, 1, 7, 3, 8, 2, 9, 5, 6]. min-heap 크기 K 유지 → 마지막에 heap = 큰 3개.
  const stream = [4, 1, 7, 3, 8, 2, 9, 5, 6]
  const K = 3
  const [kIdx, setKIdx] = useState(0)

  // 현재까지 처리 후 heap 상태 계산
  const kHeap: number[] = []
  for (let i = 0; i < kIdx; i++) {
    const v = stream[i]
    if (kHeap.length < K) {
      kHeap.push(v)
      kHeap.sort((a, b) => a - b)
    } else if (v > kHeap[0]) {
      kHeap[0] = v
      kHeap.sort((a, b) => a - b)
    }
  }

  const kCurrent = kIdx < stream.length ? stream[kIdx] : null
  const kDone = kIdx >= stream.length
  const kStep = () => { if (!kDone) setKIdx(kIdx + 1) }
  const kReset = () => setKIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("100만 개에서 큰 10 개 — sort 안 쓰고", "Top 10 from 1M — without sort")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "스트림 (실시간) 으로 들어오는 숫자들 중 *가장 큰 K 개* 만 유지하고 싶다. K=10, N=100만.",
                "From a stream of numbers, keep only the *top K largest*. K=10, N=1M.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-orange-200 mb-3">
              <p className="text-xs font-bold text-orange-800 mb-2">💡 {t("min-heap 으로 — 의외", "Use a min-heap — surprising!")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "K=3 큰 거 → *min-heap* 크기 K 유지. 새 값 v 가 들어오면:",
                  "Top-3 → keep a *min-heap* of size K. For a new value v:",
                )}
              </p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1 ml-4">
                <li>• {t("heap 크기 < K → 그냥 push", "heap size < K → push")}</li>
                <li>• {t("v > heap 의 최솟값 → 최솟값 pop, v push", "v > heap min → pop min, push v")}</li>
                <li>• {t("아니면 무시", "else skip")}</li>
              </ul>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "결과: heap 에는 항상 *지금까지 본 큰 K 개*. heap[0] = 그 중 최소 (= K번째 큰 값).",
                  "Result: heap always holds *top K seen so far*. heap[0] = min of those (= K-th largest).",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center">
              {t("시간 O(N log K). N=100만, K=10 → 약 2천만 연산.", "Time O(N log K). N=1M, K=10 → ~20M ops.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("스트림 → top-3 (min-heap 크기 3)", "Stream → top-3 (size-3 min-heap)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("들어오는 값마다 — heap 크기 < 3 이면 push, 아니면 heap[0] 과 비교.", "Per value — push if size < 3, else compare with heap[0].")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[11px] font-bold text-gray-500 mb-1 uppercase">{t("입력 스트림", "Input stream")}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {stream.map((v, i) => (
                  <div key={i} className={cn(
                    "px-2 py-1 rounded-md border font-mono text-xs font-bold transition-all",
                    i === kIdx && !kDone && "bg-amber-200 border-amber-500 text-amber-900 scale-110",
                    i < kIdx && "bg-blue-50 border-blue-300 text-blue-700 opacity-60",
                    i > kIdx && "bg-gray-50 border-gray-200 text-gray-400",
                  )}>{v}</div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 mb-3 min-h-[80px]">
              <p className="text-[11px] font-bold text-emerald-600 mb-1 uppercase">heap ({t("크기 ≤ 3", "size ≤ 3")}, min = heap[0])</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                {kHeap.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">{t("(비어 있음)", "(empty)")}</p>
                ) : kHeap.map((v, i) => (
                  <div key={i} className={cn(
                    "px-3 py-2 rounded-md border-2 font-mono text-sm font-bold",
                    i === 0 ? "bg-rose-100 border-rose-400 text-rose-800" : "bg-emerald-100 border-emerald-400 text-emerald-800",
                  )}>{v}{i === 0 && t(" ←min", " ←min")}</div>
                ))}
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {kDone ? (
                  <b className="text-emerald-700">✅ {t("끝! top-3 = {7, 8, 9}", "Done! top-3 = {7, 8, 9}")}</b>
                ) : kCurrent !== null ? (
                  <span>{t("다음 값", "Next")}: <b>{kCurrent}</b> — {kHeap.length < K ? t("크기 < 3, push", "size < 3, push") : kCurrent > kHeap[0] ? t(`> ${kHeap[0]}, 교체`, `> ${kHeap[0]}, swap`) : t(`≤ ${kHeap[0]}, 무시`, `≤ ${kHeap[0]}, skip`)}</span>
                ) : null}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={kStep} disabled={kDone}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 값", "Next value")}
              </button>
              <button onClick={kReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — top-K largest", "Code — top-K largest")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  "min-heap 크기 K 유지. 새 값이 heap 의 최솟값보다 크면 교체.",
                  "Keep a min-heap of size K. If new value > heap min, swap.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import heapq

def top_k_largest(stream, k):
    h = []   # min-heap, 크기 ≤ k
    for v in stream:
        if len(h) < k:
            heapq.heappush(h, v)
        elif v > h[0]:           # 가장 작은 거보다 크면
            heapq.heapreplace(h, v)   # pop + push 동시
    return sorted(h, reverse=True)

print(top_k_largest([4,1,7,3,8,2,9,5,6], 3))
# [9, 8, 7]`}
              cpp={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    vector<int> stream = {4,1,7,3,8,2,9,5,6};
    int k = 3;
    // min-heap — top-K largest 유지
    priority_queue<int, vector<int>, greater<int>> h;

    for (int v : stream) {
        if ((int)h.size() < k) h.push(v);
        else if (v > h.top()) { h.pop(); h.push(v); }
    }
    // h 안에 top-3 (작은 거부터 나옴)
    while (!h.empty()) {
        cout << h.top() << " ";   // 7 8 9
        h.pop();
    }
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "핵심: 'K largest 면 min-heap' — 헷갈리지만 그래야 *가장 작은 후보* 가 위에 있어서 빠르게 비교/교체.",
                "Key: 'K largest → min-heap' — feels backwards, but min-on-top lets us compare/swap the *weakest candidate* fast.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "1억 개 숫자에서 *가장 작은 100 개* 를 찾을 때, 어떤 heap 을 어떤 크기로 쓸까?",
              "From 100M numbers, find the *smallest 100*. Which heap, what size?",
            )}
            options={[
              t("max-heap, 크기 100", "max-heap, size 100"),
              t("min-heap, 크기 100", "min-heap, size 100"),
              t("max-heap, 크기 1억", "max-heap, size 100M"),
              t("정렬 필요", "must sort"),
            ]}
            answerIdx={0}
            hint={t(
              "K-largest = min-heap. 거꾸로 K-smallest = max-heap, 크기 K. 새 값 v < heap[0] (현재 최대) 이면 교체.",
              "K-largest = min-heap. So K-smallest = max-heap of size K. If new v < heap[0] (current max), swap.",
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

// ── Chapter 4: Dijkstra preview ──────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 작은 그래프 시뮬: 노드 0..4, edges (간선) + 가중치.
  // 0 -- 4 --> 1
  // 0 -- 1 --> 2
  // 2 -- 2 --> 1
  // 1 -- 3 --> 3
  // 2 -- 5 --> 4
  // 3 -- 1 --> 4
  // 시작 = 0. 최단거리 결과: dist = [0, 3, 1, 6, 6] (0→2→1=3, 0→2=1, 0→1→3=6, 0→2→4=6 or 0→1→3→4=7)
  // pop 순서 시뮬: 0(d=0), 2(d=1), 1(d=3), 4(d=6), 3(d=6)
  const dijkSteps = [
    { node: 0, d: 0, desc: "시작! 0 의 거리 = 0", descEn: "Start! dist[0] = 0" },
    { node: 2, d: 1, desc: "heap 에서 (1, 2) pop → 0→2 = 1", descEn: "pop (1, 2) → 0→2 = 1" },
    { node: 1, d: 3, desc: "heap 에서 (3, 1) pop → 0→2→1 = 3 (4 보다 짧음!)", descEn: "pop (3, 1) → 0→2→1 = 3 (shorter than 4!)" },
    { node: 4, d: 6, desc: "heap 에서 (6, 4) pop → 0→2→4 = 6", descEn: "pop (6, 4) → 0→2→4 = 6" },
    { node: 3, d: 6, desc: "heap 에서 (6, 3) pop → 0→2→1→3 = 6", descEn: "pop (6, 3) → 0→2→1→3 = 6" },
  ]
  const [dIdx, setDIdx] = useState(0)
  const dDone = dIdx >= dijkSteps.length - 1
  const dStep = () => { if (dIdx < dijkSteps.length - 1) setDIdx(dIdx + 1) }
  const dReset = () => setDIdx(0)

  // 현재 dist 배열 (점진적 갱신)
  const dist = [Infinity, Infinity, Infinity, Infinity, Infinity]
  for (let i = 0; i <= dIdx; i++) {
    const s = dijkSteps[i]
    if (dist[s.node] > s.d) dist[s.node] = s.d
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-teal-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("Dijkstra — heap 이 *꼭* 필요한 이유", "Dijkstra — why heap is *essential*")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "그래프에서 A → 모든 노드 최단거리 — *지하철 노선도* 같은 거. 각 간선에 시간(가중치) 이 있어요.",
                "Shortest path A → all nodes — like subway routes. Each edge has a time (weight).",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-teal-200 mb-3">
              <p className="text-xs font-bold text-teal-800 mb-2">💡 {t("Dijkstra 의 핵심 아이디어", "Dijkstra's key idea")}</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1.5">
                <li>① {t("\"지금까지 본 것 중 *제일 가까운* 노드부터 확정한다\"", "\"Settle the *closest* unsettled node first\"")}</li>
                <li>② {t("그 노드에서 갈 수 있는 이웃들의 거리 갱신", "From it, relax neighbors' distances")}</li>
                <li>③ {t("반복", "Repeat")}</li>
              </ul>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "①번이 핵심 — 매번 *제일 가까운* 거를 찾아야 해요. 어디서 봤죠?",
                  "Step ① is the trick — find the *closest* node each time. Seen that before?",
                )}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border-2 border-amber-300">
              <p className="text-sm font-bold text-amber-800 text-center">
                💛 {t("= 우선순위 큐! min-heap 으로 가장 가까운 거 pop = O(log N).", "= priority queue! Pop closest with min-heap = O(log N).")}
              </p>
              <p className="text-xs text-amber-700 text-center mt-1">
                {t("heap 없이 매번 선형 탐색 → O(N²). 노선도 큰 게임에선 차이 큼.", "Without heap → linear scan, O(N²). Huge difference for big graphs.")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("Dijkstra 한 걸음씩 — 시작 노드 0", "Dijkstra step-by-step — start = 0")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("min-heap 이 매번 '가장 가까운 미확정 노드' 를 pop. dist[] 가 갱신됨.", "Min-heap pops 'closest unsettled' each step. dist[] gets updated.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase">{t("간선 (그래프)", "Edges (graph)")}</p>
              <pre className="text-[11px] font-mono text-gray-700 leading-relaxed">{`0 ──(4)── 1
0 ──(1)── 2
2 ──(2)── 1
1 ──(3)── 3
2 ──(5)── 4
3 ──(1)── 4`}</pre>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 mb-3">
              <p className="text-[11px] font-bold text-emerald-600 mb-2 uppercase">dist[] ({t("0 부터의 최단거리", "shortest from 0")})</p>
              <div className="grid grid-cols-5 gap-1.5">
                {dist.map((d, i) => (
                  <div key={i} className={cn(
                    "rounded border-2 px-2 py-1.5 text-center font-mono",
                    d === Infinity ? "bg-gray-50 border-gray-200 text-gray-400" : "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold",
                  )}>
                    <p className="text-[10px] text-gray-500">{t("노드", "node")} {i}</p>
                    <p className="text-sm">{d === Infinity ? "∞" : d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {dDone ? (
                  <b className="text-emerald-700">✅ {t("완료! 모든 노드 거리 확정", "Done! all distances settled")}</b>
                ) : (
                  <span>{t(dijkSteps[dIdx].desc, dijkSteps[dIdx].descEn)}</span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={dStep} disabled={dDone}
                className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 pop", "Next pop")}
              </button>
              <button onClick={dReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Dijkstra (스켈레톤)", "Code — Dijkstra (skeleton)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  "지금은 *어떻게 짜는지* 가 아니라 *heap 이 어디서 쓰이는지* 만 봐요. 다음 토픽 (최단경로) 에서 깊게.",
                  "Don't worry about writing it now — just *spot where heap is used*. Deep dive in the next topic.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import heapq

def dijkstra(graph, start, n):
    INF = float("inf")
    dist = [INF] * n
    dist[start] = 0
    h = [(0, start)]                  # ← heap! (거리, 노드)

    while h:
        d, u = heapq.heappop(h)       # ← 가장 가까운 미확정 노드
        if d > dist[u]: continue      # 옛 값이면 무시
        for v, w in graph[u]:          # 이웃들
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(h, (dist[v], v))   # ← heap push
    return dist`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

vector<long long> dijkstra(vector<vector<pair<int,int>>>& g, int start, int n) {
    const long long INF = LLONG_MAX;
    vector<long long> dist(n, INF);
    dist[start] = 0;
    // ← min-heap: (거리, 노드)
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();   // ← 가장 가까운
        if (d > dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});       // ← push
            }
        }
    }
    return dist;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "지금 외울 거 — heap 이 (거리, 노드) 쌍을 들고 있고, 매번 *가장 작은 거리* pop. 그게 본질.",
                "Take-away — heap holds (distance, node) pairs; each pop returns the *smallest distance*. That's the essence.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Dijkstra 에서 heap 없이 매번 *가장 가까운 노드* 를 선형 탐색하면 시간복잡도는?",
              "Without a heap, Dijkstra scans linearly for the closest node. Total time?",
            )}
            options={[
              "O(N log N)",
              "O(N²)",
              "O(N + E)",
              "O(E log N)",
            ]}
            answerIdx={1}
            hint={t(
              "N 개 노드 × 매번 N 개 후보 선형 탐색 = O(N²). heap 으로 바꾸면 O((N+E) log N). 큰 그래프에선 매우 큰 차이.",
              "N nodes × scan N candidates each = O(N²). With heap: O((N+E) log N). Huge difference on big graphs.",
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

// ── Chapter 5: 정리 + 실전 ───────────────────────────────────────
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
              {t("우선순위 큐 마스터!", "Priority Queue Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "잘 했어요. heap 은 보기엔 단순한 도구지만 — Silver/Gold 단계에서 *엄청* 많이 쓰여요. 🎉",
                "Nice work. Heap looks simple but it's used *everywhere* at Silver/Gold level. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "다음 단계 — Dijkstra (최단경로). 거기서 heap 이 *진짜로* 어떻게 쓰이는지 봐요.",
                  "Next up — Dijkstra (shortest path). See heap *really* in action.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("heap = ", "heap = ")}<b>{t("push/pop O(log N)", "push/pop O(log N)")}</b> {t(". 정렬보다 훨씬 빠름.", ". Much faster than sorting.")}</li>
              <li><b>2.</b> {t("Python ", "Python ")}<code className="bg-white px-1 rounded text-xs">heapq</code> {t(" = min-heap. max 는 ", " = min-heap. For max, push ")}<code className="bg-white px-1 rounded text-xs">-x</code>.</li>
              <li><b>3.</b> {t("C++ ", "C++ ")}<code className="bg-white px-1 rounded text-xs">priority_queue&lt;int&gt;</code> {t(" = max-heap. min 은 ", " = max-heap. For min, ")}<code className="bg-white px-1 rounded text-xs">greater&lt;int&gt;</code>.</li>
              <li><b>4.</b> {t("K largest? ", "K-largest? ")}<b>{t("min-heap 크기 K", "min-heap of size K")}</b> {t("유지. 거꾸로도 똑같이.", ". K-smallest = max-heap size K.")}</li>
              <li><b>5.</b> {t("Dijkstra / Prim / A* / 스케줄링 — 모두 ", "Dijkstra / Prim / A* / scheduling — all use ")}<b>{t("heap 이 핵심 도구", "heap as core tool")}</b>.</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("heap 손에 잡히면 — 최단경로, 그리디 최적화, 스트림 처리 다 풀려요!", "Once heap clicks, shortest paths, greedy optimization, and stream problems all open up!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 {t("아직 부족해요? 코딩 뱅크에서 heap 활용 문제. ", "Need more? Try heap problems in Coding Bank. ")}
                <Link href="/coding-bank" className="font-bold underline hover:text-blue-900">{t("바로 가기 →", "Go →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🌐 {t("다음 토픽: 최단경로 — heap 이 본격적으로 활약. ", "Next topic: shortest paths — heap takes the lead. ")}
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
              ? <>🎉 {t("우선순위 큐 마스터!", "Priority Queue Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function PriorityQueuePage() {
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
          user_id: user.id, lesson_id: "algo-priorityqueue", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-priorityqueue")) {
          arr.push("algo-priorityqueue")
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
              { label: "우선순위 큐", labelEn: "Priority Queue", emoji: "⚡" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">⚡</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("우선순위 큐", "Priority Queue")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver/Gold 도구", "Silver/Gold tool")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/priorityqueue/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("heap 문제 12 개 — push/pop 으로!", "12 heap challenges — push/pop your way!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("우선순위 큐 마스터!", "Priority Queue Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/priorityqueue/practice" className="block px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm text-center border-2 border-emerald-200">
                ⚡ {t("우선순위 큐 문제 풀이 (12)", "Priority Queue Practice (12)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/coding-bank" className="block px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-sm text-center border-2 border-blue-200">
                💼 {t("코딩 뱅크 — heap 응용", "Coding Bank — heap applied")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (최단경로)", "Next topic (shortest path)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
