"use client"

/**
 * 누적합 (Prefix Sum) — 챕터식 학습 페이지 v1.
 *
 * 기존 1813줄 한 페이지 vanilla JS 덤프 → 5 챕터 React 구조로 재구성.
 *
 * 교육 원칙:
 * 1. 한 챕터 = 한 가지 + 한 인터랙션 + 한 미니 퀴즈
 * 2. 점진적 공개 (학생이 "이해함" 클릭해야 다음)
 * 3. 시각화 우선 + 짧은 설명
 * 4. 모바일 1순위 (한 화면 = 한 챕터)
 * 5. 진도 바 + "다음" 명확
 *
 * 21 토픽 중 첫 실험 — 학생 반응 보고 패턴 확장.
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
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🏦", title: "비유 — 저금통",  titleEn: "Analogy — Piggy Bank",      mins: 3 },
  { id: 2, emoji: "🧮", title: "누적합 만들기",   titleEn: "Building Prefix Sum",       mins: 5 },
  { id: 3, emoji: "🎯", title: "구간 합 (핵심)",  titleEn: "Range Sum (Core)",          mins: 7 },
  { id: 4, emoji: "⚡", title: "첫 문제 풀기",    titleEn: "First Problem",             mins: 6 },
  { id: 5, emoji: "🚀", title: "응용 + 정리",     titleEn: "Applications & Recap",      mins: 5 },
]

const STORAGE_KEY = "algo-prefixsum-chapter"

// ── 코드 토글 (Python / C++) ─────────────────────────────────────
type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 (sorting 과 동일 패턴) ──────────────────────
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-xl font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => isLast ? onFinish() : setStep(step + 1)}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95">
            {isLast ? (finishLabel ?? t("다음 챕터로", "Next chapter")) : t("다음", "Next")} <ArrowRight className="w-5 h-5" />
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
        <span className="text-[10px] text-gray-500 italic">{lang === "py" ? "위쪽 'Python/C++' 토글로 변경" : "Toggle above"}</span>
      </div>
      <HighlightedCode code={lang === "py" ? py : cpp} lang={lang} />
    </div>
  )
}

// ── 미니 퀴즈 ─────────────────────────────────────────────────────
function MiniQuiz({
  question,
  options,
  answerIdx,
  hint,
  onCorrect,
}: {
  question: string
  options: string[]
  answerIdx: number
  hint: string
  onCorrect: () => void
}) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  const handleSelect = (i: number) => {
    setSelected(i)
    if (i === answerIdx) {
      setTimeout(onCorrect, 600)
    }
  }

  const isCorrect = selected === answerIdx
  const isWrong = selected !== null && selected !== answerIdx

  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-4">
      <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">📝 {t("미니 퀴즈", "Mini Quiz")}</p>
      <p className="text-sm font-bold text-gray-900 mb-3">{question}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={isCorrect}
            className={cn(
              "text-left px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
              selected === i && i === answerIdx && "bg-green-100 border-green-500 text-green-800",
              selected === i && i !== answerIdx && "bg-red-100 border-red-400 text-red-800",
              selected !== i && "bg-white border-gray-200 hover:border-amber-400 text-gray-700",
            )}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      {isCorrect && (
        <p className="mt-3 text-sm font-bold text-green-700 flex items-center gap-1.5">
          ✅ {t("정답!", "Correct!")}
        </p>
      )}
      {isWrong && (
        <div className="mt-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-bold text-amber-700 underline decoration-dotted"
          >
            💡 {showHint ? t("힌트 닫기", "Hide hint") : t("힌트 보기", "Show hint")}
          </button>
          {showHint && (
            <p className="mt-1.5 text-xs text-amber-800 bg-amber-100 rounded-lg p-2">{hint}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ── 챕터 1: 비유 (저금통) ───────────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
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
              {t("안녕! 누적합 같이 배워봐요 😊", "Hi! Let's learn prefix sum 😊")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "오늘 배울 거 — '누적합' (Prefix Sum) 이에요. 이름 어려워 보이지만 진짜 간단해요.",
                "Today's topic — 'Prefix Sum'. The name sounds tricky but it's really simple.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "한 줄 요약하면 — '구간의 합을 뺄셈 한 번으로 빠르게 구하는 방법'. 친숙한 비유로 시작해 봐요.",
                "TL;DR — 'a way to get range sums with one subtraction'. Let's start with a familiar analogy.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t("준비됐어요? 아래 '다음' 눌러 가요 ↓", "Ready? Hit 'Next' below ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-sm text-gray-700 mb-2">
              {t("저금통 이야기로 시작해볼게요 —", "Let's start with a piggy bank story —")}
            </p>
            <p className="text-base font-black text-gray-900 mb-3">
              🏦 {t("매일 저금통에 돈을 넣어요", "Saving every day")}
            </p>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {t(
                "월요일 3원, 화요일 1원, 수요일 4원, 목요일 1원, 금요일 5원 — 매일 다른 금액을 넣어요.",
                "Mon 3, Tue 1, Wed 4, Thu 1, Fri 5 — different amount each day.",
              )}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {t("그런데 똑똑한 저금통이라서 매일 ", "But it's a smart piggy bank — every day it shows the ")}<b>{t("그날까지 모은 총액", "running total")}</b>{t(" 이 표시돼요:", ":")}
            </p>
            <div className="px-3 py-3 bg-white rounded-lg font-mono text-base text-orange-700 font-bold text-center border border-orange-200">
              0 → 3 → 4 → 8 → 9 → 14
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center italic">
              {t("(시작 0 / 월 후 3 / 화 후 4 / 수 후 8 / 목 후 9 / 금 후 14)", "(start 0 / after Mon 3 / Tue 4 / Wed 8 / Thu 9 / Fri 14)")}
            </p>
            <p className="text-sm text-amber-700 mt-3 font-bold text-center">
              {t("이 '누적 총액' 줄이 핵심이에요!", "This 'running total' is the key!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">✨</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이제 마법 — 화~목 합?", "Now the magic — Tue~Thu total?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-4 text-center">
              {t(
                "직접 더하지 않고도 한 줄 뺄셈으로 알 수 있어요:",
                "You can get it with ONE subtraction — no adding needed:",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border-2 border-blue-300 mb-3">
              <p className="text-base font-black text-blue-700 text-center">
                {t("목요일 총액", "Thu total")} <span className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded">9</span> − {t("월요일 총액", "Mon total")} <span className="font-mono bg-red-100 px-1.5 py-0.5 rounded">3</span> = <span className="text-2xl text-orange-600">6</span>
              </p>
            </div>
            <p className="text-xs text-gray-700 text-center mb-3 leading-relaxed">
              {t(
                "확인: 화 1 + 수 4 + 목 1 = 6 ✓ 진짜 맞아요!",
                "Check: Tue 1 + Wed 4 + Thu 1 = 6 ✓ Yep, matches!",
              )}
            </p>
            <p className="text-sm font-bold text-blue-800 text-center">
              {t(
                "이게 바로 '누적합'! 다음 챕터에서 직접 만들어 봐요 →",
                "That's 'prefix sum'! Build it yourself in the next chapter →",
              )}
            </p>
          </div>
        )}
      </div>
      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── 챕터 2: 누적합 만들기 — 슬라이드식 ─────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step: slideStep, setStep: setSlideStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const arr = [3, 1, 4, 1, 5]
  const [vizStep, setVizStep] = useState(0)  // 시각화 내부 단계 (0~5)
  const prefix = useMemo(() => {
    const p = [0]
    for (let i = 0; i < arr.length; i++) p.push(p[i] + arr[i])
    return p
  }, [])
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {slideStep === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🧮</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이제 누적합을 직접 만들어봐요", "Let's build prefix sum ourselves")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "규칙 딱 두 개만 기억하면 끝나요:",
                "Just remember two rules:",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-center text-base font-black text-emerald-700 border border-emerald-200">
              prefix[0] = 0<br/>
              prefix[i] = prefix[i-1] + arr[i-1]
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">
              {t(
                "쉽게 말해 — '이전까지의 합 + 지금 값'. 그게 다예요. 다음 슬라이드에서 한 단계씩 직접 만들어 봐요.",
                "Plain English — 'previous sum + current value'. That's it. Build it step by step on the next slide.",
              )}
            </p>
          </div>
        )}

        {slideStep === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("한 단계씩 만들어 보기", "Build step-by-step")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("아래 '다음' 눌러서 한 칸씩 채워봐요:", "Hit 'Next' below to fill one cell at a time:")}
            </p>
            {/* arr */}
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">arr</p>
              <div className="flex gap-1">
                {arr.map((v, i) => (
                  <div key={i} className={cn(
                    "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                    vizStep === i + 1 ? "bg-orange-200 border-orange-500 scale-110" : "bg-gray-50 border-gray-300 text-gray-700",
                  )}>{v}</div>
                ))}
              </div>
            </div>
            {/* prefix */}
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">prefix</p>
              <div className="flex gap-1">
                {prefix.map((v, i) => (
                  <div key={i} className={cn(
                    "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                    i <= vizStep
                      ? i === vizStep ? "bg-emerald-400 border-emerald-600 text-white scale-110 shadow-lg" : "bg-emerald-100 border-emerald-300 text-emerald-800"
                      : "bg-gray-50 border-gray-300 border-dashed text-gray-300",
                  )}>{i <= vizStep ? v : "?"}</div>
                ))}
              </div>
            </div>
            {/* 현재 단계 */}
            <div className="bg-amber-50 rounded-lg p-2.5 mb-3 min-h-[60px]">
              <p className="text-xs text-amber-900 font-bold">
                {vizStep === 0 && t("Step 0: prefix[0] = 0 (시작값 — 0 으로)", "Step 0: prefix[0] = 0 (start with 0)")}
                {vizStep >= 1 && vizStep <= 5 && (
                  <>Step {vizStep}: prefix[{vizStep}] = prefix[{vizStep-1}] + arr[{vizStep-1}] = {prefix[vizStep-1]} + {arr[vizStep-1]} = <b className="text-emerald-700 text-base">{prefix[vizStep]}</b></>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setVizStep(Math.max(0, vizStep - 1))} disabled={vizStep === 0}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm">
                ← {t("이전 단계", "Prev step")}
              </button>
              <button onClick={() => setVizStep(Math.min(5, vizStep + 1))} disabled={vizStep === 5}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                {vizStep === 5 ? "✓ " + t("완성!", "Done!") : t("다음 단계", "Next step") + " →"}
              </button>
            </div>
            {vizStep === 5 && (
              <p className="text-xs text-emerald-700 text-center mt-3 font-bold">
                {t("✨ 다 만들었어요! 다음 슬라이드에서 코드 봐요.", "✨ All built! See the code on next slide.")}
              </p>
            )}
          </div>
        )}

        {slideStep === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("이거 코드로 적으면 정말 짧아요", "In code, it's really short")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("for 한 번이면 끝. 위 토글로 Python ↔ C++ 비교해 봐요:", "One for-loop. Toggle Py ↔ C++ above:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`arr = [3, 1, 4, 1, 5]
prefix = [0]                       # 시작값 0
for i in range(len(arr)):
    prefix.append(prefix[i] + arr[i])

# 결과: prefix = [0, 3, 4, 8, 9, 14]`}
              cpp={`vector<int> arr = {3, 1, 4, 1, 5};
vector<int> prefix(arr.size() + 1, 0);
for (int i = 0; i < arr.size(); i++)
    prefix[i + 1] = prefix[i] + arr[i];

// 결과: prefix = {0, 3, 4, 8, 9, 14}`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("진짜 단순하죠? 마지막 슬라이드에서 한 번 확인해봐요 →", "Really simple, right? Quick check on the last slide →")}
            </p>
          </div>
        )}

        {slideStep === 3 && (
          <MiniQuiz
            question={t("arr = [2, 4, 6] 일 때 prefix[3] 은 뭐예요?", "If arr = [2, 4, 6], what is prefix[3]?")}
            options={["10", "12", "6", "8"]}
            answerIdx={1}
            hint={t("prefix[3] = 0 + 2 + 4 + 6 = ?", "prefix[3] = 0 + 2 + 4 + 6 = ?")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {slideStep < 3 ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === slideStep ? "w-8 bg-orange-500" : i < slideStep ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── 챕터 3: 구간 합 ─────────────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step: slideStep, setStep: setSlideStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const arr = [3, 1, 4, 1, 5]
  const prefix = [0, 3, 4, 8, 9, 14]
  const [L, setL] = useState(2)
  const [R, setR] = useState(4)
  const [quizPassed, setQuizPassed] = useState(false)
  const directSum = arr.slice(L - 1, R).reduce((s, v) => s + v, 0)
  const prefixDiff = prefix[R] - prefix[L - 1]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {slideStep === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이제 진짜 마법 — 구간 합 구하기!", "Now the real magic — range sums!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "지금까지 누적합 만들었으면 — 이제 어떤 구간이든 ", "Now that we have prefix sum — for any range, ",
              )}<b className="text-purple-700">{t("뺄셈 한 번", "ONE subtraction")}</b>{t(
                " 으로 합 구할 수 있어요.",
                " gets you the sum.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-center text-lg font-black text-purple-700 border border-purple-200 mb-3">
              arr[L]~arr[R] = prefix[R] − prefix[L−1]
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "왜 L−1 인지 헷갈리죠? 다음 슬라이드에서 슬라이더로 직접 움직여보면 바로 감 잡혀요.",
                "Confused about L−1? Move sliders on the next slide — it'll click.",
              )}
            </p>
          </div>
        )}

        {slideStep === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("L, R 슬라이더 움직여 보기", "Move the L, R sliders")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("L (시작), R (끝) 을 바꾸면 어떻게 답이 바뀌는지 봐요:", "Change L (start), R (end) — see how the answer changes:")}
            </p>
            {/* arr */}
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">arr (1-indexed)</p>
              <div className="flex gap-1">
                {arr.map((v, i) => {
                  const idx = i + 1
                  const inRange = idx >= L && idx <= R
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className={cn("w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                        inRange ? "bg-purple-300 border-purple-600 text-purple-900 scale-105" : "bg-gray-50 border-gray-300 text-gray-400")}>{v}</div>
                      <span className="text-[9px] text-gray-400 mt-0.5">{idx}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">prefix</p>
              <div className="flex gap-1">
                {prefix.map((v, i) => {
                  const isR = i === R
                  const isLm1 = i === L - 1
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className={cn("w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                        isR && "bg-emerald-300 border-emerald-600 text-emerald-900 scale-110 shadow-md",
                        isLm1 && "bg-red-200 border-red-500 text-red-800 scale-110 shadow-md",
                        !isR && !isLm1 && "bg-gray-50 border-gray-300 text-gray-500")}>{v}</div>
                      <span className="text-[9px] text-gray-400 mt-0.5">{i}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-red-700">L ({t("시작", "start")})</label>
                <input type="range" min={1} max={5} value={L} onChange={e => setL(Math.min(Number(e.target.value), R))} className="w-full" />
                <div className="text-center font-mono font-black text-red-700">L = {L}</div>
              </div>
              <div>
                <label className="text-xs font-bold text-emerald-700">R ({t("끝", "end")})</label>
                <input type="range" min={1} max={5} value={R} onChange={e => setR(Math.max(Number(e.target.value), L))} className="w-full" />
                <div className="text-center font-mono font-black text-emerald-700">R = {R}</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-sm font-mono text-gray-700">
                prefix[{R}] − prefix[{L - 1}] = <b className="text-emerald-700">{prefix[R]}</b> − <b className="text-red-700">{prefix[L - 1]}</b>
              </p>
              <p className="text-2xl font-black text-purple-700 mt-1">= {prefixDiff}</p>
              <p className="text-[11px] text-gray-500 mt-1">
                {t("직접 더해도", "Direct sum")}: {arr.slice(L - 1, R).join(" + ")} = {directSum} ✓
              </p>
            </div>
          </div>
        )}

        {slideStep === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드는 진짜 한 줄", "Code = literally one line")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t(
                  codeLang === "py" ? "range_sum 함수 한 번 만들면 어디서든 O(1) 답 나와요:" : "rangeSum 함수 한 번 만들면 어디서든 O(1) 답 나와요:",
                  codeLang === "py" ? "Define range_sum once — O(1) answer everywhere:" : "Define rangeSum once — O(1) answer everywhere:",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def range_sum(prefix, L, R):
    """arr[L]~arr[R] 의 합 (1-indexed)"""
    return prefix[R] - prefix[L - 1]

# 사용 예시
prefix = [0, 3, 4, 8, 9, 14]
print(range_sum(prefix, 2, 4))   # → 6`}
              cpp={`int rangeSum(vector<int>& prefix, int L, int R) {
    // arr[L]~arr[R] 의 합 (1-indexed)
    return prefix[R] - prefix[L - 1];
}

// 사용 예시
vector<int> prefix = {0, 3, 4, 8, 9, 14};
cout << rangeSum(prefix, 2, 4) << endl;  // → 6`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("이게 누적합의 진짜 가치 — 한 번 만들고, 평생 O(1) 로 답 →", "This is prefix sum's real value — build once, O(1) forever →")}
            </p>
          </div>
        )}

        {slideStep === 3 && (
          <MiniQuiz
            question={t("arr = [5, 2, 8, 1, 6], prefix = [0, 5, 7, 15, 16, 22]. arr[2]~arr[4] 합은?", "arr = [5, 2, 8, 1, 6], prefix = [0, 5, 7, 15, 16, 22]. Sum of arr[2]~arr[4]?")}
            options={["11", "15", "17", "23"]}
            answerIdx={0}
            hint={t("prefix[R] − prefix[L−1] = prefix[4] − prefix[1] = 16 − 5", "prefix[R] − prefix[L−1] = prefix[4] − prefix[1] = 16 − 5")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {slideStep < 3 ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === slideStep ? "w-8 bg-orange-500" : i < slideStep ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── 챕터 4: 첫 문제 풀기 ────────────────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step: slideStep, setStep: setSlideStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {slideStep === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("진짜 USACO 문제로 가요!", "Onto a real USACO-style problem!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "BOJ 11659 비슷한 문제예요 — 배열에 숫자 N 개 있고, M 개의 질문이 들어와요:",
                "Similar to BOJ 11659 — array of N numbers, M queries:",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-blue-300 text-sm text-gray-800">
              {t(
                "\"i 번째부터 j 번째까지 합이 얼마야?\" — 이런 질문이 M 번 와요.",
                "\"What's the sum from i to j?\" — M such questions.",
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">
              <b>{t("제약", "Constraints")}:</b> N, M ≤ 100,000 ({t("최대 10만", "up to 100K")})
            </p>
            <p className="text-sm text-blue-700 font-bold text-center mt-4">
              {t("어떻게 풀까요? 다음 슬라이드에서 두 방법 비교 →", "How to solve? Compare two approaches →")}
            </p>
          </div>
        )}

        {slideStep === 1 && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 space-y-3">
            <p className="text-base font-black text-gray-900 text-center">💭 {t("두 가지 방법 비교", "Compare two approaches")}</p>
            <div className="rounded-lg bg-red-50 border-2 border-red-200 p-3">
              <p className="text-sm font-black text-red-800 mb-1">❌ {t("나이브 방법", "Naive way")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("각 질문마다 i~j 까지 직접 다 더해요. 한 질문당 ", "Sum i~j directly for each query. ")}<b className="font-mono">O(N)</b>{t(", 그게 M 번 = ", " per query × M = ")}<b className="font-mono">O(N × M)</b>
              </p>
              <p className="text-[11px] text-red-700 mt-1 font-bold">
                {t("최악 10⁵ × 10⁵ = 10¹⁰ → 시간초과 ⏰", "Worst: 10⁵ × 10⁵ = 10¹⁰ → TLE ⏰")}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 border-2 border-emerald-200 p-3">
              <p className="text-sm font-black text-emerald-800 mb-1">✅ {t("누적합 방법", "Prefix sum")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("미리 prefix 한 번 만들고 — ", "Build prefix once: ")}<b className="font-mono">O(N)</b>{t(". 그 다음 각 질문은 뺄셈 한 번 — ", ". Then each query: ")}<b className="font-mono">O(1)</b>
              </p>
              <p className="text-[11px] text-emerald-700 mt-1 font-bold">
                {t("총 O(N + M) = 2 × 10⁵ → 초고속 ⚡", "Total O(N + M) = 2 × 10⁵ → blazing fast ⚡")}
              </p>
            </div>
            <p className="text-xs text-gray-600 text-center italic">
              {t("같은 문제, 5,000 만 배 차이! 다음 슬라이드에서 코드 봐요 →", "Same problem, 50,000,000× faster! Code on next slide →")}
            </p>
          </div>
        )}

        {slideStep === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("실제 제출 코드", "Real submission code")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("이 코드 그대로 BOJ 11659 에 제출하면 통과해요:", "Submit this to BOJ 11659 — it passes:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = list(map(int, input().split()))

# 1. 누적합 만들기
prefix = [0]
for v in arr:
    prefix.append(prefix[-1] + v)

# 2. M 개의 질문 처리
for _ in range(M):
    i, j = map(int, input().split())
    print(prefix[j] - prefix[i - 1])`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false); cin.tie(0);

    int N, M; cin >> N >> M;
    vector<long long> prefix(N + 1, 0);
    for (int i = 1; i <= N; i++) {
        int v; cin >> v;
        prefix[i] = prefix[i - 1] + v;
    }

    while (M--) {
        int i, j; cin >> i >> j;
        cout << prefix[j] - prefix[i - 1] << "\\n";
    }
}`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("Python 은 빠른 입출력 (sys.stdin) 필수. C++ 는 ios::sync_with_stdio(false).", "Python needs fast I/O (sys.stdin). C++ uses ios::sync_with_stdio(false).")}
            </p>
          </div>
        )}

        {slideStep === 3 && (
          <MiniQuiz
            question={t("N = 100,000, M = 100,000 일 때 나이브 방법은 약 몇 번 연산?", "If N = M = 100,000, naive needs ~how many ops?")}
            options={["100,000", "200,000", "10,000,000,000 (시간초과)", "1,000,000"]}
            answerIdx={2}
            hint={t("각 질문이 평균 N 번 더하기 → N × M = 10⁵ × 10⁵ = 10¹⁰", "Each query ~N adds → N × M = 10⁵ × 10⁵ = 10¹⁰")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {slideStep < 3 ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : quizPassed ? (
        <SlideNav step={slideStep} total={totalSteps} setStep={setSlideStep} onFinish={onComplete} />
      ) : (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === slideStep ? "w-8 bg-orange-500" : i < slideStep ? "w-2 bg-orange-300" : "w-2 bg-gray-300")} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── 챕터 5: 응용 + 정리 ────────────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎉</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("우와, 누적합 끝까지 다 봤어요!", "You finished all of prefix sum!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요 👏 이제 USACO 에서 '구간 합' 질문 나와도 당황 안 할 거예요. 핵심들 한 번만 더 짚고 넘어가요.",
                "Awesome work 👏 You'll be ready when 'range sum' shows up in USACO. Let me recap.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> prefix[0] = 0 {t("(시작값)", "(start)")}</li>
              <li><b>2.</b> <code className="bg-white px-1.5 py-0.5 rounded">prefix[i] = prefix[i-1] + arr[i-1]</code></li>
              <li><b>3.</b> {t("구간 합", "Range sum")}: <code className="bg-white px-1.5 py-0.5 rounded">prefix[R] - prefix[L-1]</code></li>
              <li><b>4.</b> {t("전처리 O(N) + 쿼리 O(1)", "Preprocess O(N) + each query O(1)")}</li>
              <li><b>5.</b> {t("써야 할 때: 같은 배열에 구간 합 질문 여러 번", "Use when: many range sum queries on same array")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 5 가지면 누적합 거의 다 풀어요!", "These 5 cover almost any prefix sum problem!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 min-h-[280px]">
            <p className="text-sm font-black text-purple-900 mb-3">🚀 {t("응용 — 더 깊이 가고 싶으면", "Advanced — if you want more")}</p>
            <p className="text-xs text-gray-600 mb-3">
              {t("Bronze 학생은 여기까지 안 봐도 OK. 호기심에 한 번만 훑어보세요:", "Bronze students can skip. Skim if curious:")}
            </p>
            <div className="space-y-3">
              <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
                <p className="font-bold text-purple-800 text-sm mb-1">📊 2D 누적합</p>
                <p className="text-xs text-gray-700">
                  {t("격자에서도 가능. 직사각형 영역 합 = '포함-배제' 로 4 항 뺄셈.", "Works in 2D grids. Rectangle sum = inclusion-exclusion of 4 corners.")}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
                <p className="font-bold text-purple-800 text-sm mb-1">🔤 문자별 누적합</p>
                <p className="text-xs text-gray-700">
                  {t("각 알파벳마다 누적합 26 개 → \"구간에 'a' 몇 개?\" O(1).", "26 prefix arrays per letter → \"count of 'a' in [L,R]?\" in O(1)")}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
                <p className="font-bold text-purple-800 text-sm mb-1">➗ 나머지 합</p>
                <p className="text-xs text-gray-700">
                  {t("prefix[j] % M == prefix[i] % M 이면 그 구간 합은 M 의 배수.", "If prefix[j] % M == prefix[i] % M, range sum is divisible by M.")}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("실전 문제 — 직접 풀어 보기!", "Real problems — try them!")}</p>
              <p className="text-xs text-gray-700 mb-3">
                {t("백준 추천 3 개 — 쉬운 거부터 →", "3 BOJ problems, easy first →")}
              </p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/11659" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 11659</b> — {t("구간 합 구하기 4 (기본)", "Sum in Range 4 (basic)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2559" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2559</b> — {t("수열 (고정 길이 윈도우)", "Sequence (fixed window)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/11660" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 11660</b> — {t("2D 누적합", "2D Prefix Sum")} ↗
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              {t("👇 아래 '누적합 마스터' 누르면 끝!", "👇 Hit 'Prefix Sum Master' to finish!")}
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
              ? <>🎉 {t("누적합 마스터!", "Prefix Sum Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function PrefixSumPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)
  const [showDestinationTip, setShowDestinationTip] = useState(false)

  // localStorage 에서 진도 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (typeof data.current === "number") setCurrent(data.current)
        const completedArr = Array.isArray(data.completed) ? data.completed : []
        if (completedArr.length) setCompletedChapters(new Set(completedArr))
        // mastered 는 실제로 모든 챕터가 완료된 경우에만 인정 (구버전 stale 데이터 방지)
        if (data.mastered && completedArr.length >= CHAPTERS.length) setIsMastered(true)
      }
      const langRaw = localStorage.getItem("algo-code-lang")
      if (langRaw === "py" || langRaw === "cpp") setCodeLang(langRaw)
    } catch {}
  }, [])

  // 진도 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        current,
        completed: [...completedChapters],
        mastered: isMastered,
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
      // 마지막 챕터 완료 → 마스터
      setIsMastered(true)
      // Supabase 에도 완료 기록 (algo-prefixsum)
      if (isAuthenticated && user) {
        const supabase = createClient()
        supabase.from("lesson_progress").upsert({
          user_id: user.id,
          lesson_id: "algo-prefixsum",
          variant: "",
          progress_type: "complete",
          completed: true,
        }).then(() => {})
      }
      // localStorage 도
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-prefixsum")) {
          arr.push("algo-prefixsum")
          localStorage.setItem("completedLessons", JSON.stringify(arr))
        }
      } catch {}
    }
  }

  const goToChapter = (n: number) => {
    // 완료한 챕터 + 현재 = 자유 이동
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
        {/* 헤더 + 진도 */}
        <div className="mb-4">
          <button onClick={() => router.push("/algo")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="w-4 h-4" /> {t("알고리즘 토픽", "Algorithm Topics")}
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">➕</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("누적합", "Prefix Sum")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>


          {/* 챕터 칩 (탐색) + 목적지 칩 */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {CHAPTERS.map(ch => {
              const isDone = completedChapters.has(ch.id)
              const isCurrent = ch.id === current
              const canGo = ch.id <= current || isDone
              return (
                <button
                  key={ch.id}
                  onClick={() => goToChapter(ch.id)}
                  disabled={!canGo}
                  className={cn(
                    "text-[11px] font-bold px-2 py-1 rounded-full border transition-all",
                    isCurrent && "bg-orange-500 border-orange-600 text-white shadow-md",
                    !isCurrent && isDone && "bg-green-100 border-green-400 text-green-800",
                    !isCurrent && !isDone && canGo && "bg-white border-gray-300 text-gray-600 hover:border-orange-400",
                    !canGo && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
                  )}
                >
                  {isDone && !isCurrent ? "✓" : ch.id}. {t(ch.title, ch.titleEn).split("—")[0].trim()}
                </button>
              )
            })}
            {/* 🎯 목적지 칩 */}
            <span className="text-gray-300 text-xs px-0.5">→</span>
            {isMastered ? (
              <Link href="/coding-bank"
                className="text-[11px] font-bold px-2 py-1 rounded-full border bg-emerald-500 border-emerald-600 text-white shadow-md hover:bg-emerald-600 transition-all">
                🎯 {t("연습 문제 풀러 가기", "Practice problems")}
              </Link>
            ) : (
              <button
                onClick={() => setShowDestinationTip(true)}
                className="text-[11px] font-bold px-2 py-1 rounded-full border border-dashed border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all"
                title={t("5 챕터 끝나면 풀러 가요", "After 5 chapters, come back!")}
              >
                🔒 {t("끝나면 연습 문제", "Practice after lesson")}
              </button>
            )}
          </div>
          {showDestinationTip && !isMastered && (
            <div className="mb-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 flex items-center justify-between">
              <span>💡 {t("5 챕터 다 끝나면 누적합 연습 문제로 안내해 줄게요!", "Finish all 5 chapters and I'll guide you to prefix sum practice problems!")}</span>
              <button onClick={() => setShowDestinationTip(false)} className="text-amber-600 hover:text-amber-800 font-bold ml-2">✕</button>
            </div>
          )}

          {/* 진도 바 */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
              style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right tabular-nums">
            {completedChapters.size} / {CHAPTERS.length} {t("챕터 완료", "chapters done")}
          </p>
        </div>

        {/* 챕터 헤더 — 우측 inline 언어 토글 */}
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

        {/* 챕터 본문 */}
        <div id="chapter-content" className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm scroll-mt-4">
          {current === 1 && <Chapter1 onComplete={() => completeChapter(1)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(1)} />}
          {current === 2 && <Chapter2 onComplete={() => completeChapter(2)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(2)} />}
          {current === 3 && <Chapter3 onComplete={() => completeChapter(3)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(3)} />}
          {current === 4 && <Chapter4 onComplete={() => completeChapter(4)} codeLang={codeLang} setCodeLang={setCodeLang} alreadyDone={completedChapters.has(4)} />}
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} alreadyDone={completedChapters.has(5)} />}
        </div>

        {/* 마스터 셀러브레이션 + 연습 문제 안내 — 마지막 챕터에서만 노출 */}
        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("누적합 마스터!", "Prefix Sum Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            {/* 📝 코딩 뱅크 */}
            <div className="bg-white rounded-xl border-2 border-emerald-200 p-4 mb-3">
              <p className="text-sm font-black text-emerald-900 mb-2">📝 {t("코드린 안에서 풀기", "Practice inside Coderin")}</p>
              <Link href="/coding-bank" className="block px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm text-center transition-all active:scale-95">
                💪 {t("코딩 뱅크 — 누적합 활용 문제", "Coding Bank — Prefix Sum Problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>

            {/* 🌐 백준 외부 문제 */}
            <div className="bg-white rounded-xl border-2 border-amber-200 p-4 mb-3">
              <p className="text-sm font-black text-amber-900 mb-2">🌐 {t("백준 (BOJ) 외부 연습", "BOJ external practice")}</p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/11659" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 11659</b> — {t("구간 합 구하기 4 (기본)", "Range Sum Basic")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2559" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2559</b> — {t("수열 (K일간 최대 합)", "Sequence (max K-day sum)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/16139" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 16139</b> — {t("인간-컴퓨터 상호작용 (문자 누적)", "Character count prefix")} ↗
                </a>
              </div>
            </div>

            <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
              🗺️ {t("다음 알고리즘 토픽 보기", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 페이지 레벨 이전/다음 챕터 버튼 제거 — 위 챕터 칩 + 슬라이드 nav 가 충분 */}
      </main>

      <BottomNav />
    </div>
  )
}
