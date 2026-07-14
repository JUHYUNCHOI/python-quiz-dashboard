"use client"

/**
 * 슬라이딩 윈도우 (Sliding Window) — 챕터식 학습 페이지 v2.
 *
 * ⚠️ 정의 정정 (선생님 2026-07-02): 슬라이딩 윈도우 = 연속 범위(창) 하나가
 *   배열을 훑으며 '밀리거나(고정 크기) / 늘었다 줄었다(가변 크기)' 하면서
 *   값을 조금씩 갱신하는 기법. 진짜 기법은 2개:
 *     1) 미는 창 (fixed-size slide)  — +들어온 것 −나간 것
 *     2) 늘였다 줄였다 (variable, two-pointer) — 창문 열듯 길어졌다 짧아졌다
 *   ※ '아무 범위나 합' 질의(누적합/prefix sum)는 창을 미는 게 아니라 사촌 기법 →
 *      별도 /algo/prefixsum. Cow Checkups 는 누적합 문제지 슬라이딩 윈도우 아님.
 */

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 (진짜 창 기법 2개 + 정리) ─────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🪟", title: "창(윈도우)이란?",       titleEn: "What's a Window?",         mins: 3 },
  { id: 2, emoji: "➡️", title: "기법 1 — 미는 창",      titleEn: "Technique 1 — Slide It",   mins: 5 },
  { id: 3, emoji: "🐛", title: "기법 2 — 늘였다 줄였다", titleEn: "Technique 2 — Grow/Shrink", mins: 6 },
  { id: 4, emoji: "🧭", title: "정리 + 사촌 기법",       titleEn: "Recap + Cousin",           mins: 4 },
]

const STORAGE_KEY = "algo-slidingwindow-chapter"

// 공용 예제 배열 — 모든 챕터가 같은 줄을 씀 (헷갈림 방지)
const ARR = [3, 1, 4, 1, 5, 2]

type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 ────────────────────────────────────────────
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

function SlideNav({ step, total, setStep, onFinish, finishLabel }: {
  step: number; total: number; setStep: (n: number) => void
  onFinish: () => void; finishLabel?: string
}) {
  const { t } = useLanguage()
  const isLast = step === total - 1
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: total }).map((_, i) => (
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
          <button onClick={() => isLast ? onFinish() : setStep(step + 1)}
            className="flex-[2] py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95">
            {isLast ? (finishLabel ?? t("다음 챕터로", "Next chapter")) : t("다음", "Next")} <ArrowRight className="w-5 h-5" />
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
        <span className="text-[10px] text-gray-500 italic">{lang === "py" ? "위쪽 'Python/C++' 토글로 변경" : "Toggle above"}</span>
      </div>
      <HighlightedCode code={lang === "py" ? py : cpp} lang={lang} />
    </div>
  )
}

// ── 미니 퀴즈 ─────────────────────────────────────────────────────
function MiniQuiz({ question, options, answerIdx, hint }: {
  question: string; options: string[]; answerIdx: number; hint: string
}) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const isCorrect = selected === answerIdx
  const isWrong = selected !== null && selected !== answerIdx
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-4">
      <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">📝 {t("미니 퀴즈", "Mini Quiz")}</p>
      <p className="text-sm font-bold text-gray-900 mb-3">{question}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => (
          <button key={i} onClick={() => setSelected(i)} disabled={isCorrect}
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

// ── 공용: 배열 + 창 시각화 ─────────────────────────────────────────
function ArrayWithWindow({ l, r }: { l: number; r: number }) {
  const hasWin = l >= 1
  return (
    <div className="my-3">
      <div className="relative flex justify-center gap-1.5 pt-6 pb-1">
        {hasWin && (
          <div
            className="absolute top-1 h-[62px] rounded-xl border-2 border-amber-700 bg-amber-100/40 shadow transition-all duration-300"
            style={{ left: `calc(50% - ${(ARR.length * 50 - 6) / 2}px + ${(l - 1) * 50 - 5}px)`, width: `${(r - l + 1) * 50 - 6 + 10}px` }}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black text-white bg-amber-700 rounded px-1.5 whitespace-nowrap">🪟 {l}~{r}</span>
          </div>
        )}
        {ARR.map((v, i) => {
          const inWin = hasWin && i + 1 >= l && i + 1 <= r
          return (
            <div key={i} className={cn(
              "w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-base z-10 transition-all",
              inWin ? "bg-amber-50 border-amber-400 text-amber-800" : "bg-white border-gray-200 text-gray-700",
            )}>{v}</div>
          )
        })}
      </div>
      <div className="flex justify-center gap-1.5">
        {ARR.map((_, i) => (
          <div key={i} className={cn("w-11 text-center text-[9px]", hasWin && i + 1 >= l && i + 1 <= r ? "text-amber-700 font-bold" : "text-gray-400")}>{i + 1}</div>
        ))}
      </div>
    </div>
  )
}

// ── 챕터 1: 창(윈도우)이란? — 창은 '움직이거나 크기가 바뀐다' ──────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [wl, setWl] = useState(2)
  const wr = wl + 2
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">🪟</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("슬라이딩 윈도우 — 창은 '움직여요'", "Sliding Window — the window MOVES")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "창(window) = 배열 위의 연속된 한 구간이에요. 핵심은 이 창이 가만히 안 있고 배열을 따라 움직인다는 것.",
                "A window = one contiguous range on the array. The key idea: it doesn't sit still — it moves along the array.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "움직이는 방식이 딱 두 가지예요 — ① 크기 그대로 옆으로 미는 창, ② 창문 열듯 길어졌다 짧아졌다 하는 창.",
                "It moves in exactly two ways — ① slide sideways keeping its size, ② grow and shrink like opening a window.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "왜 굳이? 창이 한 칸 움직일 때 대부분은 그대로니까, 다시 다 세지 않고 바뀐 것만 갱신하면 훨씬 빨라요.",
                "Why bother? When the window moves one step, most of it is unchanged — so update only what changed instead of recounting. Much faster.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-base font-black text-gray-900 mb-1 text-center">
              🎛️ {t("직접 창을 옮겨봐요", "Move the window yourself")}
            </p>
            <p className="text-xs text-gray-600 text-center mb-2">
              {t("크기 3짜리 창이 배열 위를 미끄러져요.", "A size-3 window slides along the array.")}
            </p>
            <ArrayWithWindow l={wl} r={wr} />
            <div className="flex justify-center gap-2 mt-2">
              <button onClick={() => setWl(Math.max(1, wl - 1))} disabled={wl <= 1}
                className="px-4 py-2 rounded-xl border-2 border-amber-400 bg-white font-black text-amber-700 disabled:opacity-30">◀ {t("왼쪽", "Left")}</button>
              <button onClick={() => setWl(Math.min(ARR.length - 2, wl + 1))} disabled={wl >= ARR.length - 2}
                className="px-4 py-2 rounded-xl border-2 border-amber-400 bg-white font-black text-amber-700 disabled:opacity-30">{t("오른쪽", "Right")} ▶</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
            <h3 className="text-base font-black text-gray-900 mb-3 text-center">
              {t("두 가지 창 — 오늘 배울 것", "Two kinds of window — today's plan")}
            </h3>
            <div className="space-y-2">
              {[
                { e: "➡️", w: t("크기 고정, 옆으로 밀기", "Fixed size, slide sideways"), q: t("연속 k개 합이 최대인 곳은?", "Best sum of k in a row?"), a: t("기법 1 — 미는 창", "Tech 1 — slide") },
                { e: "🐛", w: t("크기 가변, 늘였다 줄였다", "Variable size, grow & shrink"), q: t("조건 만족하는 가장 긴 구간은?", "Longest stretch meeting a rule?"), a: t("기법 2 — 두 포인터", "Tech 2 — two pointers") },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-blue-200 px-3 py-2.5">
                  <span className="text-2xl">{row.e}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-black text-gray-800">{row.w}</p>
                    <p className="text-[11px] text-gray-500 leading-snug">{row.q}</p>
                    <p className="text-[11px] font-black text-blue-700 mt-0.5">→ {row.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">
              {t(
                "※ '아무 범위나 합을 여러 번 물어보는' 건 창을 미는 게 아니라 누적합 — 마지막에 짧게 구별해요.",
                "※ 'Many arbitrary range-sum questions' isn't a moving window — that's prefix sums. We'll tell them apart at the end.",
              )}
            </p>
          </div>
        )}
      </div>
      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── 챕터 2: 기법 1 — 미는 창 (고정 크기) ─────────────────────────────
function Chapter2({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [l, setL] = useState(1)
  const r = l + 2
  const cur = ARR.slice(l - 1, r).reduce((a, b) => a + b, 0)
  const canSlide = l < ARR.length - 2
  const lastIn = l > 1 ? ARR[r - 1] : null
  const lastOut = l > 1 ? ARR[l - 2] : null
  const bestSoFar = (() => { let b = 0; for (let s = 1; s <= l; s++) b = Math.max(b, ARR.slice(s - 1, s + 2).reduce((a, x) => a + x, 0)); return b })()
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">🧩 {t("쉬운 예제", "Easy example")}</p>
            <p className="text-sm font-bold text-gray-900 mb-2">
              {t("매일 사탕을 팔아요: 3, 1, 4, 1, 5, 2개. 연속 3일 동안 가장 많이 판 합은?", "Daily candy sales: 3, 1, 4, 1, 5, 2. Best total over 3 days in a row?")}
            </p>
            <ArrayWithWindow l={0} r={0} />
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              {t(
                "그럼 어떻게 하면 될까요? 같이 생각해봐요. 크기 3짜리 창을 모든 자리에 놓고 세면 되는데 — 창이 한 칸 밀릴 때 두 칸은 그대로잖아요?",
                "So how do we do it? Let's think. Put a size-3 window at every spot and sum — but when it slides one step, two numbers stay the same, right?",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t("그대로인 걸 매번 다시 더하는 게 아깝죠. 밀면서 바뀐 것만 고쳐요.", "Re-adding the unchanged part is wasted. Fix only what changes as it slides.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-base font-black text-gray-900 mb-1 text-center">
              ➡️ {t("창을 밀어봐요 — 들어온 것 +, 나간 것 −", "Slide it — add what enters, drop what leaves")}
            </p>
            <ArrayWithWindow l={l} r={r} />
            <p className="text-center text-sm font-black text-amber-800">{t(`창 안의 합 = ${cur}`, `sum inside = ${cur}`)}</p>
            {lastIn !== null && (
              <p className="text-center text-sm font-bold mb-1 mt-1">
                <span className="text-emerald-700 bg-emerald-100 rounded px-1.5 py-0.5">+{lastIn} {t("들어옴", "in")}</span>{" "}
                <span className="text-red-700 bg-red-100 rounded px-1.5 py-0.5">−{lastOut} {t("나감", "out")}</span>{" "}
                <span className="text-gray-500 text-xs">{t("(딱 2번 계산!)", "(just 2 ops!)")}</span>
              </p>
            )}
            <p className="text-center text-xs text-gray-600 mb-2">{t(`지금까지 최고 = ${bestSoFar}`, `best so far = ${bestSoFar}`)}</p>
            <div className="flex justify-center">
              <button onClick={() => canSlide && setL(l + 1)} disabled={!canSlide}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black shadow disabled:opacity-40">
                {canSlide ? t("한 칸 밀기 ▶", "Slide one ▶") : t("끝! 최고 = 10 (자리 3~5)", "Done! best = 10 (spots 3~5)")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <MiniQuiz
            question={t("창이 [4, 1, 5]에서 [1, 5, 2]로 한 칸 밀리면, 합은? (직전 합 10)", "Window slides from [4, 1, 5] to [1, 5, 2] — the sum? (was 10)")}
            options={[
              t("1 + 5 + 2 를 처음부터 다시 더한다", "Re-add 1 + 5 + 2 from scratch"),
              t("10 + 2(들어옴) − 4(나감) = 8", "10 + 2 (in) − 4 (out) = 8"),
              t("10 + 4 − 2 = 12", "10 + 4 − 2 = 12"),
            ]}
            answerIdx={1}
            hint={t("들어온 칸은 오른쪽 끝(2), 나간 칸은 왼쪽 끝(4).", "The entering cell is the new right end (2); the leaving cell is the old left end (4).")}
          />
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-gray-800 leading-relaxed mb-2">
              {t("창마다 3개 다시 더하기(n×k번) 대신, 밀 때마다 딱 2번:", "Instead of re-adding k per window (n×k), just 2 ops per slide:")}
            </p>
            <CodeBlock lang={codeLang}
              py={`a = [3, 1, 4, 1, 5, 2]
k = 3
cur = sum(a[0:k])          # 첫 창은 한 번만 더한다
best = cur
for right in range(k, len(a)):
    cur += a[right]        # 들어온 칸 +
    cur -= a[right - k]    # 나간 칸 −
    best = max(best, cur)
print(best)                # 10`}
              cpp={`int a[] = {3, 1, 4, 1, 5, 2};
int n = 6, k = 3;
int cur = 0;
for (int i = 0; i < k; i++) cur += a[i];  // 첫 창
int best = cur;
for (int right = k; right < n; right++) {
    cur += a[right];       // 들어온 칸 +
    cur -= a[right - k];   // 나간 칸 −
    best = max(best, cur);
}
cout << best << endl;      // 10`}
            />
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 text-sm text-emerald-900 font-bold text-center">
              ✨ {t("기법 1 — 크기 고정이면: 밀면서 +1개 −1개만. 다시 세지 않기!", "Tech 1 — fixed size: slide with +1/−1. Never recount!")}
            </div>
          </div>
        )}
      </div>
      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── 챕터 3: 기법 2 — 늘였다 줄였다 (가변, 두 포인터) ──────────────────
function Chapter3({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const K = 7
  const [st, setSt] = useState({ l: 1, r: 0, cur: 0, best: 0, log: "" })
  const grow = () => {
    if (st.r >= ARR.length) return
    let { l, cur } = st
    const r = st.r + 1
    cur += ARR[r - 1]
    const shrunk: number[] = []
    while (cur > K) { shrunk.push(ARR[l - 1]); cur -= ARR[l - 1]; l += 1 }
    const len = r - l + 1
    const best = Math.max(st.best, len)
    const log = shrunk.length
      ? t(`+${ARR[r - 1]} 넣으니 ${K} 초과! → 왼쪽에서 ${shrunk.map(x => `−${x}`).join(", ")} 빼서 창 줄임`, `+${ARR[r - 1]} overflowed ${K}! → dropped ${shrunk.map(x => `−${x}`).join(", ")} from the left`)
      : t(`+${ARR[r - 1]} 넣어도 합 ${cur} ≤ ${K} — 창을 그냥 키움`, `+${ARR[r - 1]} keeps sum ${cur} ≤ ${K} — window just grows`)
    setSt({ l, r, cur, best, log })
  }
  const done = st.r >= ARR.length
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">🧩 {t("쉬운 예제", "Easy example")}</p>
            <p className="text-sm font-bold text-gray-900 mb-2">
              {t("같은 판매량에서 — 합이 7 이하가 되는 가장 긴 연속 구간은 며칠짜리?", "Same sales — longest stretch of days whose total is ≤ 7?")}
            </p>
            <ArrayWithWindow l={0} r={0} />
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              {t(
                "그럼 어떻게 하면 될까요? 같이 생각해봐요. 이번엔 창 크기를 몰라요 — 그래서 창을 '창문 열듯' 늘였다 줄였다 해요.",
                "So how do we do it? Let's think. This time the size is unknown — so we open/close the window: grow and shrink it.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "오른쪽으로 늘리다가, 조건이 깨지면(합 > 7) 왼쪽을 줄여 다시 맞춰요. 애벌레처럼요.",
                "Grow the right; when the rule breaks (sum > 7), shrink from the left until it holds. Like an inchworm.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-base font-black text-gray-900 mb-1 text-center">
              🐛 {t(`늘였다, 넘치면 줄였다 (K = ${K})`, `Grow — shrink when over (K = ${K})`)}
            </p>
            <ArrayWithWindow l={st.r === 0 ? 0 : st.l} r={st.r} />
            <p className="text-center text-sm font-black text-amber-800 mb-1">
              {st.r === 0
                ? t("아직 창이 없어요 — 늘려봐요!", "No window yet — grow it!")
                : t(`합 = ${st.cur} (≤ ${K} ✓) · 길이 ${st.r - st.l + 1} · 최고 길이 ${st.best}`, `sum = ${st.cur} (≤ ${K} ✓) · len ${st.r - st.l + 1} · best ${st.best}`)}
            </p>
            {st.log && <p className="text-center text-xs font-bold text-gray-700 bg-white border border-amber-200 rounded-lg px-3 py-2 mb-2">{st.log}</p>}
            <div className="flex justify-center gap-2">
              <button onClick={grow} disabled={done}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black shadow disabled:opacity-40">
                {done ? t(`끝! 최고 길이 = ${st.best}`, `Done! best length = ${st.best}`) : t("오른쪽 한 칸 늘리기 ▶", "Grow right by 1 ▶")}
              </button>
              <button onClick={() => setSt({ l: 1, r: 0, cur: 0, best: 0, log: "" })}
                className="px-3 py-2.5 rounded-xl border-2 border-amber-300 bg-white text-amber-700 font-black text-sm">⟲</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <MiniQuiz
            question={t("창을 늘리다 합이 K를 넘으면, 다음에 할 일은?", "The window grows and the sum exceeds K — what do we do?")}
            options={[
              t("처음(자리 1)으로 돌아가 다시 시작한다", "Go back to spot 1 and restart"),
              t("왼쪽 끝을 하나씩 빼며 합이 K 이하가 될 때까지 줄인다", "Drop the left end until the sum is ≤ K"),
              t("오른쪽을 더 늘려 평균을 낮춘다", "Grow the right more to lower the average"),
            ]}
            answerIdx={1}
            hint={t("애벌레! 머리(오른쪽)도 꼬리(왼쪽)도 전진만 해요 — 그래서 빨라요.", "Inchworm! Head (right) and tail (left) only move forward — that's why it's fast.")}
          />
        )}

        {step === 3 && (
          <div>
            <CodeBlock lang={codeLang}
              py={`a = [3, 1, 4, 1, 5, 2]
K = 7
left = 0
cur = 0
best = 0
for right in range(len(a)):
    cur += a[right]           # 오른쪽 늘리기
    while cur > K:            # 넘치면
        cur -= a[left]        # 왼쪽 줄이기
        left += 1
    best = max(best, right - left + 1)
print(best)                   # 3  (자리 2~4: 1+4+1)`}
              cpp={`int a[] = {3, 1, 4, 1, 5, 2};
int n = 6, K = 7;
int left = 0, cur = 0, best = 0;
for (int right = 0; right < n; right++) {
    cur += a[right];          // 오른쪽 늘리기
    while (cur > K) {         // 넘치면
        cur -= a[left];       // 왼쪽 줄이기
        left++;
    }
    best = max(best, right - left + 1);
}
cout << best << endl;         // 3  (자리 2~4: 1+4+1)`}
            />
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 text-sm text-emerald-900 font-bold text-center">
              ✨ {t("기법 2 — 크기 모르면: 오른쪽 늘리고, 깨지면 왼쪽 줄이기. 양 끝 다 전진만!", "Tech 2 — unknown size: grow right, shrink left when broken. Both ends only forward!")}
            </div>
          </div>
        )}
      </div>
      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── 챕터 4: 정리 + 사촌 기법(누적합) 구별 ───────────────────────────
function Chapter4({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
            <h3 className="text-base font-black text-gray-900 mb-3 text-center">
              🪟 {t("슬라이딩 윈도우 = 창 하나가 움직인다", "Sliding window = one window, moving")}
            </h3>
            <div className="space-y-2">
              {[
                { e: "➡️", w: t("크기 고정 → 옆으로 밀기", "Fixed size → slide"), h: t("들어온 것 +, 나간 것 −", "add in, drop out") },
                { e: "🐛", w: t("크기 가변 → 늘였다 줄였다", "Variable → grow & shrink"), h: t("오른쪽 늘리고, 깨지면 왼쪽 줄이기 (두 포인터)", "grow right, shrink left (two pointers)") },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-blue-200 px-3 py-2.5">
                  <span className="text-2xl">{row.e}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-black text-gray-800">{row.w}</p>
                    <p className="text-[12px] text-blue-700">{row.h}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              {t("공통 정신: 창이 움직여도 이미 센 건 다시 세지 않기.", "Shared spirit: as the window moves, never recount what you already counted.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-5 border-2 border-cyan-200">
            <h3 className="text-base font-black text-gray-900 mb-2 text-center">
              👀 {t("헷갈리는 사촌 — 누적합 (prefix sum)", "The confusing cousin — prefix sums")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              {t(
                "'아무 범위나 합'을 여러 번 물어보면 (범위가 서로 이어지지도 않고 제각각) — 창을 미는 게 안 통해요.",
                "If you're asked many arbitrary range sums (ranges that don't connect, all different) — sliding won't work.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "그건 슬라이딩 윈도우가 아니라 사촌 기법인 누적합이에요: '여기까지 합'을 미리 적어두고 아무 범위나 빼기 한 번. 창이 움직이는 게 아니죠.",
                "That's not sliding window but its cousin, prefix sums: write 'total up to here' once, answer any range with one subtraction. Nothing slides.",
              )}
            </p>
            <div className="bg-white rounded-xl border border-cyan-200 p-3 text-[12px] text-gray-700 leading-relaxed mb-3">
              <p><b className="text-amber-700">🪟 {t("슬라이딩 윈도우", "Sliding window")}</b> — {t("창 하나가 움직임 (밀거나 늘었다 줄었다). 최선/조건 구간 찾기.", "one window moves (slide or grow/shrink). Find the best/valid range.")}</p>
              <p className="mt-1"><b className="text-cyan-700">➕ {t("누적합", "Prefix sums")}</b> — {t("미리 적어두고 아무 범위나 빼기. 서로 다른 범위 질의가 많을 때.", "precompute, subtract for any range. Many independent range queries.")}</p>
            </div>
            <Link href="/algo/prefixsum/learn" className="flex items-center justify-between bg-white border-2 border-cyan-300 hover:border-cyan-500 rounded-xl px-3 py-2.5">
              <span className="text-sm font-bold text-cyan-800">➕ {t("누적합 배우러 가기 (5분)", "Learn prefix sums (5 min)")}</span>
              <ArrowRight className="w-4 h-4 text-cyan-600" />
            </Link>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border-2 border-emerald-300">
            <p className="text-4xl text-center mb-2">🎉</p>
            <h3 className="text-lg font-black text-emerald-900 mb-3 text-center">
              {t("슬라이딩 윈도우 두 기법 완료!", "Both window techniques done!")}
            </h3>
            <MiniQuiz
              question={t("\"조건을 만족하는 가장 긴 연속 구간\" — 어떤 기법?", "\"Longest contiguous stretch meeting a rule\" — which technique?")}
              options={[
                t("미는 창 (고정 크기)", "Slide (fixed size)"),
                t("늘였다 줄였다 (두 포인터)", "Grow & shrink (two pointers)"),
                t("누적합 (미리 적어두고 빼기)", "Prefix sums (write once, subtract)"),
              ]}
              answerIdx={1}
              hint={t("크기를 모르는 '가장 긴/짧은' 구간 = 늘였다 줄였다.", "Unknown-size longest/shortest range = grow & shrink.")}
            />
            <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200 mt-2">
              🗺️ {t("다음 알고리즘 토픽 보기", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} finishLabel={t("완료! 🎉", "Finish! 🎉")} />
    </div>
  )
}

// ── 페이지 셸 (데스크탑 2단) ──────────────────────────────────────
export default function SlidingWindowPage() {
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (typeof data.current === "number") setCurrent(data.current)
        const completedArr = Array.isArray(data.completed) ? data.completed : []
        if (completedArr.length) setCompletedChapters(new Set(completedArr))
        if (data.mastered && completedArr.length >= CHAPTERS.length) setIsMastered(true)
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
          user_id: user.id,
          lesson_id: "algo-slidingwindow",
          variant: "",
          progress_type: "complete",
          completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-slidingwindow")) {
          arr.push("algo-slidingwindow")
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-48 md:pb-12">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-4 md:grid md:grid-cols-[16rem_1fr] md:gap-8 md:items-start">
        {/* 왼쪽 rail */}
        <div className="mb-4 md:mb-0 md:sticky md:top-4">
          <JourneyBreadcrumb items={[
              { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
              { label: "슬라이딩 윈도우", labelEn: "Sliding Window", emoji: "🪟" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🪟</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("슬라이딩 윈도우", "Sliding Window")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze~Silver</span>
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

          <div className="flex flex-wrap items-center gap-1.5 mb-2 md:flex-col md:items-stretch">
            {CHAPTERS.map(ch => {
              const isDone = completedChapters.has(ch.id)
              const isCurrent = ch.id === current
              const canGo = ch.id <= current || isDone
              return (
                <button key={ch.id} onClick={() => goToChapter(ch.id)} disabled={!canGo}
                  className={cn(
                    "text-[11px] font-bold px-2 py-1 rounded-full border transition-all md:rounded-lg md:text-left md:px-3 md:py-1.5",
                    isCurrent && "bg-orange-500 border-orange-600 text-white shadow-md",
                    !isCurrent && isDone && "bg-green-100 border-green-400 text-green-800",
                    !isCurrent && !isDone && canGo && "bg-white border-gray-300 text-gray-600 hover:border-orange-400",
                    !canGo && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
                  )}>
                  {isDone && !isCurrent ? "✓" : ch.id}. {t(ch.title, ch.titleEn).split("—")[0].trim()}
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

        {/* 오른쪽: 읽기 영역 */}
        <div className="md:min-w-0">
          <div id="chapter-content" className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm scroll-mt-4">
            {current === 1 && <Chapter1 onComplete={() => completeChapter(1)} alreadyDone={completedChapters.has(1)} />}
            {current === 2 && <Chapter2 onComplete={() => completeChapter(2)} codeLang={codeLang} alreadyDone={completedChapters.has(2)} />}
            {current === 3 && <Chapter3 onComplete={() => completeChapter(3)} codeLang={codeLang} alreadyDone={completedChapters.has(3)} />}
            {current === 4 && <Chapter4 onComplete={() => completeChapter(4)} alreadyDone={completedChapters.has(4)} />}
          </div>

          {isMastered && current === CHAPTERS.length && (
            <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
              <div className="text-center">
                <div className="text-5xl mb-2">🏆</div>
                <h3 className="text-xl font-black text-emerald-900">{t("슬라이딩 윈도우 마스터!", "Sliding Window Master!")}</h3>
                <p className="text-sm text-emerald-700 mt-1">{t("미는 창 + 늘였다 줄였다 — 이제 문제에서 알아봐요.", "Slide + grow/shrink — now spot them in problems.")}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
