"use client"

/**
 * 재귀 (Recursion) — 챕터식 학습 페이지 v1.
 *
 * Wave 2 — 학생들이 가장 많이 나가떨어지는 토픽. 챕터를 *극도로 친절하게* 짜는 게 핵심.
 * 비유 (마트료시카) → 2 줄 규칙 → 단순 재귀 → 분할 정복 → 트리 + 메모이제이션 → 정리.
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
  { id: 1, emoji: "🤔", title: "재귀가 왜 필요해?",                titleEn: "Why Recursion?",                 mins: 3 },
  { id: 2, emoji: "📐", title: "베이스 + 재귀 호출",               titleEn: "Base + Recursive Call",          mins: 6 },
  { id: 3, emoji: "⚡", title: "분할 정복 (O(log N))",              titleEn: "Divide & Conquer (O(log N))",    mins: 7 },
  { id: 4, emoji: "🌲", title: "재귀 트리 + 메모이제이션",          titleEn: "Recursion Tree + Memoization",   mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",                       titleEn: "Recap & Practice",               mins: 5 },
]

const STORAGE_KEY = "algo-recursion-chapter"

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

// ── Chapter 1: 재귀가 왜 필요해? — 안심시키기 + 2 줄 규칙 + 예고 ────
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
              {t("안녕! 재귀 함께 가요", "Hi! Recursion — together")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs text-amber-700 font-bold mb-1">📌 {t("이건 새 개념이에요 (복습 X)", "This is a NEW concept (not review)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "재귀는 main 커리큘럼에 안 나왔어요. 새 도구 — 그래서 '어려운 게 당연해요'. 천천히 가요.",
                  "Recursion wasn't in the main curriculum. New tool — being confused is normal. We'll go slowly.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "러시아 인형 (마트료시카) 알죠? 큰 인형 열면 같은 모양 작은 인형, 또 열면 더 작은 인형... 마지막엔 손톱만 한 인형.",
                "Russian dolls (matryoshka). Open the big one → same-shaped smaller one → smaller still → finally a tiny one.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "재귀 = ",
                "Recursion = ",
              )}<b className="text-orange-700">{t("큰 문제 → 같은 모양의 작은 문제로 나눠 푸는 방법", "split big problem into same-shaped smaller problems")}</b>.
            </p>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800 text-center">
                💛 {t("어려워 보여요? 사실 ", "Looks scary? Actually only ")}<b>{t("2 줄짜리 규칙", "2-line rule")}</b>{t(" 만 외우면 끝.", " to memorize.")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("재귀의 2 줄 규칙", "Recursion's 2-line rule")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-sm font-black text-rose-800 mb-1">
                  1️⃣ {t("베이스 케이스 (멈춤 조건)", "Base case (stopping rule)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "\"여기서 그만! 답은 X 야.\" — 가장 작은 인형엔 더 작은 인형이 없죠. 멈춰야 해요.",
                    "\"Stop here! Answer is X.\" — the smallest doll has nothing inside. We must stop.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-indigo-200">
                <p className="text-sm font-black text-indigo-800 mb-1">
                  2️⃣ {t("재귀 호출 (자기 자신 부르기)", "Recursive call (call yourself)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "\"조금 더 작은 문제로 자기 자신에게 물어봐.\" — 인형 안에 같은 모양 작은 인형 들어있듯이.",
                    "\"Ask yourself, but for a smaller problem.\" — like the smaller same-shape doll inside.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed overflow-x-auto">
{`def factorial(n):
    if n <= 1: return 1        # ① 베이스 케이스
    return n * factorial(n-1)  # ② 재귀 호출`}
              </pre>
            </div>
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              {t(
                "이게 끝이에요. 두 줄만 있으면 재귀.",
                "That's it. Two lines = recursion.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩 깊게 봐요.", "Preview — we'll dive into each next.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📐 1. {t("단순 재귀 — factorial, sum", "Simple recursion — factorial, sum")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "베이스 + 재귀 호출 그대로. 가장 기본형. (챕터 2)",
                    "Base + recursive call straight. The basic form. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⚡ 2. {t("분할 정복 — 거듭제곱 O(log N)", "Divide & conquer — power O(log N)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "문제를 반으로 쪼개면 — N 번이 log N 번으로 줄어요. (챕터 3)",
                    "Split in half → N steps shrink to log N. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌲 3. {t("재귀 트리 + 메모이제이션", "Recursion tree + memoization")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "피보나치는 그냥 재귀로 짜면 *지수 폭발*. 한 줄 추가로 살림. (챕터 4)",
                    "Plain fib recursion explodes exponentially. One line saves it. (Ch 4)",
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

// ── Chapter 2: 베이스 + 재귀 호출 (단순 재귀) ────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: factorial(5) 호출 스택 한 칸씩
  // phase: 0 = 시작 전, 1..5 = push (f(5)..f(1)), 6..10 = pop (반환)
  const [phase, setPhase] = useState(0)
  const factN = 5
  const factPushed = Math.min(phase, factN) // 1..5 = pushed depth
  const factPopped = Math.max(0, phase - factN) // 0..5 = returned count
  const factStack: number[] = []
  for (let i = 0; i < factPushed - factPopped; i++) factStack.push(factN - i)
  const factMsg = (() => {
    if (phase === 0) return t("▶ 스텝을 눌러 f(5) 호출 시작!", "▶ Step to start f(5)!")
    if (phase <= factN) {
      const cur = factN - phase + 1
      if (cur === 1) return t(`f(1) → 베이스 케이스 도달! 1 반환 시작`, `f(1) → base case hit! return 1`)
      return t(`f(${cur}) 호출 → ${cur} × f(${cur - 1}) 필요`, `Call f(${cur}) → need ${cur} × f(${cur - 1})`)
    }
    const ret = phase - factN
    const values = [1, 2, 6, 24, 120]
    return t(`f(${ret + 1}) 반환: ${values[ret - 1]}`, `f(${ret + 1}) returns ${values[ret - 1]}`)
  })()
  const factDone = phase >= 2 * factN
  const factStep = () => { if (!factDone) setPhase(phase + 1) }
  const factReset = () => setPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("factorial — 가장 깔끔한 예제", "factorial — cleanest example")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "5! = 5 × 4 × 3 × 2 × 1 = 120. for 로도 짤 수 있지만, 재귀로 보면 *구조가 보여요*.",
                "5! = 5 × 4 × 3 × 2 × 1 = 120. You can use a for loop, but recursion shows the *structure*.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("재귀로 다시 보기", "Recursive view")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`f(5) = 5 × f(4)
f(4) = 4 × f(3)
f(3) = 3 × f(2)
f(2) = 2 × f(1)
f(1) = 1          ← 베이스!`}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "f(1) 에서 멈추고, 거꾸로 곱하면서 올라가요. 1 → 2 → 6 → 24 → 120.",
                  "Stop at f(1), multiply back up. 1 → 2 → 6 → 24 → 120.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("핵심: 작은 문제 = 같은 모양 — 그래서 자기 자신 부르기.", "Key: smaller problem = same shape → call yourself.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("호출 스택 보기", "Watch the call stack")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("f(5) 가 어떻게 쌓이고 풀리는지 — 한 칸씩.", "How f(5) stacks up and unwinds — one step.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[160px] flex flex-col-reverse gap-1">
              {factStack.length === 0 ? (
                <p className="text-xs text-gray-400 text-center self-center">{t("(스택 비어 있음)", "(stack empty)")}</p>
              ) : (
                factStack.map((v, i) => (
                  <div key={i} className={cn(
                    "px-3 py-2 rounded-md border-2 font-mono text-xs font-bold transition-all text-center",
                    i === 0 && phase <= factN && v === 1 && "bg-rose-100 border-rose-400 text-rose-800",
                    i === 0 && phase > factN && "bg-emerald-100 border-emerald-400 text-emerald-800",
                    !(i === 0 && (phase <= factN && v === 1 || phase > factN)) && "bg-blue-100 border-blue-300 text-blue-800",
                  )}>
                    f({v}) {i === 0 && phase <= factN && v === 1 && t("← 베이스!", "← base!")}
                    {i === 0 && phase > factN && t("← 반환 중", "← returning")}
                  </div>
                ))
              )}
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">
                {factDone ? <b className="text-emerald-700">✅ f(5) = 120 ✓</b> : factMsg}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={factStep} disabled={factDone}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={factReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-rose-50 rounded-lg p-2 border border-rose-200">
              <p className="text-[11px] text-rose-800 leading-relaxed">
                ⚠️ <b>{t("베이스 케이스 없으면?", "No base case?")}</b>{" "}
                {t(
                  "f(1) 도 f(0) 부르고, f(0) 도 f(-1) 부르고... 끝없이 부름. *Stack overflow* (스택 터짐).",
                  "f(1) calls f(0), f(0) calls f(-1)... forever. *Stack overflow* (stack explodes).",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — factorial", "Code — factorial")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("두 줄로 끝. ① 베이스 ② 재귀 호출.", "Two lines. ① base ② recursive call.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def fact(n):
    if n <= 1:                # ① 베이스 케이스
        return 1
    return n * fact(n - 1)    # ② 재귀 호출 — 더 작은 문제

print(fact(5))   # 120
print(fact(1))   # 1   (베이스에서 바로 반환)`}
              cpp={`#include <iostream>
using namespace std;

int fact(int n) {
    if (n <= 1) return 1;            // ① 베이스 케이스
    return n * fact(n - 1);          // ② 재귀 호출
}

int main() {
    cout << fact(5) << endl;   // 120
    cout << fact(1) << endl;   // 1
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크포인트: ① 멈출 조건 ② 자기보다 작은 문제 부르기. 항상 이 두 줄을 먼저 생각해요.",
                "Checklist: ① stop condition ② call a smaller version. Always think these two first.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "위 factorial 코드에서 베이스 케이스 (if n <= 1: return 1) 를 빼면 어떻게 될까?",
              "If we remove the base case (if n <= 1: return 1) from factorial, what happens?",
            )}
            options={[
              t("답이 0 으로 나옴", "Returns 0"),
              t("답이 1 로 나옴", "Returns 1"),
              t("무한 재귀 → 스택 오버플로우", "Infinite recursion → stack overflow"),
              t("컴파일 에러", "Compile error"),
            ]}
            answerIdx={2}
            hint={t(
              "멈출 조건이 없으면 f(1) 이 f(0) 부르고, f(0) 이 f(-1) 부르고... 끝없이 자기 자신을 부르다 스택이 터져요.",
              "Without a stop condition, f(1) calls f(0), f(0) calls f(-1)... endless self-calls until stack explodes.",
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

// ── Chapter 3: 분할 정복 (거듭제곱 O(log N)) ─────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: pow(2, 10) 분할 정복 호출 — 한 칸씩 n 을 반으로
  // n: 10 → 5 → 2 → 1 → 0
  const dcChain = [10, 5, 2, 1, 0]
  const [dcIdx, setDcIdx] = useState(0)
  const dcStep = () => { if (dcIdx < dcChain.length - 1) setDcIdx(dcIdx + 1) }
  const dcReset = () => setDcIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("반으로 쪼개면 O(log N)", "Halve the work → O(log N)")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-amber-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "2^10 을 구해요. 단순하게: 2 × 2 × 2 × ... 10 번 곱하기. N=10 이면 빠르지만 N=10억 이면? 망함.",
                "Compute 2^10. Naive: 2 × 2 × 2 × ... 10 times. Fine at N=10, dead at N=1 billion.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("영리하게 — 반으로 쪼개기", "Smart way — halve it")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`2^10 = (2^5)^2          ← 5 번 → 한 번 더 곱
2^5  = 2 × (2^2)^2      ← 짝수 아니니 +1 곱
2^2  = (2^1)^2
2^1  = 2 × (2^0)^2
2^0  = 1                ← 베이스!`}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "N 을 반으로 나누는 호출 → log₂(10) ≈ 4 번이면 끝.",
                  "Halving N each call → log₂(10) ≈ 4 calls total.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-amber-700 text-center">
              {t("시간: O(N) → O(log N). N=10억도 ~30 번이면 끝!", "Time: O(N) → O(log N). N=1B done in ~30 calls!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("호출이 반씩 줄어드는 모습", "Watch n halve each call")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("pow(2, n) 호출 — n 이 매번 //2 로 줄어요.", "pow(2, n) — n shrinks by //2 each call.")}
            </p>
            <div className="flex items-center justify-center gap-1 flex-wrap mb-3">
              {dcChain.map((n, i) => (
                <div key={i} className="flex items-center">
                  <div className={cn(
                    "px-3 py-2 rounded-lg border-2 font-mono text-xs font-bold transition-all",
                    i === dcIdx && i < dcChain.length - 1 && "bg-amber-200 border-amber-500 text-amber-900 scale-110",
                    i === dcIdx && i === dcChain.length - 1 && "bg-emerald-100 border-emerald-500 text-emerald-800 scale-110",
                    i < dcIdx && "bg-blue-50 border-blue-300 text-blue-700",
                    i > dcIdx && "bg-gray-100 border-gray-300 text-gray-400",
                  )}>
                    pow(2, {n})
                    {i === dcChain.length - 1 && i <= dcIdx && t(" ← 베이스!", " ← base!")}
                  </div>
                  {i < dcChain.length - 1 && <span className="mx-1 text-amber-500 font-bold">→</span>}
                </div>
              ))}
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-amber-800">
                {dcIdx === 0 && t("시작: n = 10. 한 번 호출.", "Start: n = 10. One call.")}
                {dcIdx === 1 && t("n = 5. 반으로 줄었어요!", "n = 5. Halved!")}
                {dcIdx === 2 && t("n = 2. 또 반으로.", "n = 2. Halved again.")}
                {dcIdx === 3 && t("n = 1. 거의 끝!", "n = 1. Almost there!")}
                {dcIdx === 4 && <b className="text-emerald-700">✅ {t("n = 0. 베이스 도달! 4 번 호출 → 2^10 = 1024 완성", "n = 0. Base hit! 4 calls → 2^10 = 1024 done")}</b>}
              </p>
              {dcIdx > 0 && (
                <p className="text-[11px] text-amber-700 mt-1">
                  {t("호출 횟수", "Calls so far")}: <b>{dcIdx + 1}</b> {t("vs 단순 곱하기", "vs naive multiplies")}: <b>10</b>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={dcStep} disabled={dcIdx >= dcChain.length - 1}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("반으로", "Halve")}
              </button>
              <button onClick={dcReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 분할 정복 거듭제곱", "Code — divide & conquer power")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("half 한 번만 계산 → 두 번 안 부름. n 이 홀수면 b 한 번 더 곱.", "Compute half once → don't double-call. If n is odd, multiply b once more.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def power(b, n):
    if n == 0:                       # ① 베이스
        return 1
    half = power(b, n // 2)          # ② 반만 재귀
    if n % 2 == 0:
        return half * half           # 짝수: half²
    else:
        return half * half * b       # 홀수: half² × b

print(power(2, 10))   # 1024
print(power(3, 5))    # 243`}
              cpp={`#include <iostream>
using namespace std;

long long power(long long b, int n) {
    if (n == 0) return 1;                  // ① 베이스
    long long half = power(b, n / 2);      // ② 반만 재귀
    if (n % 2 == 0) return half * half;    // 짝수
    return half * half * b;                // 홀수
}

int main() {
    cout << power(2, 10) << endl;   // 1024
    cout << power(3, 5) << endl;    // 243
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: half = power(b, n//2) 한 번만! power(b, n//2) * power(b, n//2) 로 짜면 두 번 부름 → 다시 O(N).",
                "Pitfall: call half = power(b, n//2) ONCE! If you write power(b, n//2) * power(b, n//2), it calls twice → back to O(N).",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "위 power 함수로 pow(2, 16) 을 계산할 때 호출 횟수는? (베이스 케이스 도달까지)",
              "How many calls does power(2, 16) make until base case?",
            )}
            options={["16", "8", "5", "1"]}
            answerIdx={2}
            hint={t(
              "n 이 매번 //2 로 줄어요: 16 → 8 → 4 → 2 → 1 → 0. 총 5 단계!",
              "n halves each call: 16 → 8 → 4 → 2 → 1 → 0. That's 5 steps!",
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

// ── Chapter 4: 재귀 트리 + 메모이제이션 ──────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [memoOn, setMemoOn] = useState(false)

  // 시뮬레이션: fib(5) 호출 트리 — 중복 강조
  // Pre-computed call tree visualization
  const fibTree = [
    { n: 5, indent: 0, dup: false },
    { n: 4, indent: 1, dup: false },
    { n: 3, indent: 2, dup: false },
    { n: 2, indent: 3, dup: false },
    { n: 1, indent: 4, dup: false },
    { n: 0, indent: 4, dup: false },
    { n: 1, indent: 3, dup: true },
    { n: 2, indent: 2, dup: true },
    { n: 1, indent: 3, dup: true },
    { n: 0, indent: 3, dup: true },
    { n: 3, indent: 1, dup: true },
    { n: 2, indent: 2, dup: true },
    { n: 1, indent: 3, dup: true },
    { n: 0, indent: 3, dup: true },
    { n: 1, indent: 2, dup: true },
  ]
  const totalCalls = fibTree.length
  const dupCalls = fibTree.filter(x => x.dup).length

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌲</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("피보나치 — 함정에 빠진 재귀", "Fibonacci — recursion's trap")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("규칙", "Rule")}:</b>{" "}
              <code className="bg-white px-1 rounded text-xs">fib(n) = fib(n-1) + fib(n-2)</code>{". "}
              {t(
                "fib(0)=0, fib(1)=1. 이대로 짜면 깔끔해 보여요. 함정이 있어요.",
                "fib(0)=0, fib(1)=1. Looks clean. There's a trap.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">⚠️ {t("함정 — 호출 트리 그려보면", "Trap — draw the call tree")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "fib(5) 부르면 fib(4) + fib(3). fib(4) 부르면 fib(3) + fib(2). 그런데 fib(3) 가 이미 또 나왔어요. *같은 걸 두 번 계산*.",
                  "fib(5) calls fib(4) + fib(3). fib(4) calls fib(3) + fib(2). But we ALREADY needed fib(3). *Same thing computed twice*.",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "트리가 *지수적으로* 폭발해요. fib(40) 부르면 약 ",
                  "Tree explodes *exponentially*. fib(40) makes about ",
                )}<b className="text-rose-700">10 {t("억 번", "billion")}</b>{t(
                  " 호출 — 1 초 넘어요.",
                  " calls — over 1 second.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-emerald-700 text-center">
              {t("다음 슬라이드: 실제 fib(5) 트리 봐요 — 중복 카운트!", "Next slide: actual fib(5) tree — count duplicates!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("fib(5) 호출 트리 (메모이제이션 켜고 끄기)", "fib(5) tree (memo on/off)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("같은 입력이 또 나오면 — 캐시에서 꺼내요. 회색 = 캐시 hit.", "Same input again? Cache it. Gray = cache hit.")}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xs text-gray-600 font-bold">{t("메모이제이션", "Memoization")}:</span>
              <button onClick={() => setMemoOn(!memoOn)}
                className={cn("px-3 py-1 rounded-full text-xs font-bold transition-all",
                  memoOn ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600")}>
                {memoOn ? t("켬 ON", "ON") : t("끔 OFF", "OFF")}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 font-mono text-[11px] leading-relaxed max-h-[200px] overflow-y-auto">
              {fibTree.map((node, i) => {
                const skipped = memoOn && node.dup
                return (
                  <div key={i} className={cn(
                    "flex items-center",
                    skipped && "opacity-30 line-through",
                  )} style={{ paddingLeft: `${node.indent * 14}px` }}>
                    <span className="text-gray-400">{"└ "}</span>
                    <span className={cn(
                      "ml-1 px-1.5 rounded",
                      !memoOn && node.dup && "bg-rose-100 text-rose-700 font-bold",
                      !memoOn && !node.dup && "text-gray-800",
                      memoOn && node.dup && "text-gray-400",
                      memoOn && !node.dup && "bg-emerald-100 text-emerald-800 font-bold",
                    )}>
                      fib({node.n})
                    </span>
                    {!memoOn && node.dup && <span className="ml-1 text-[10px] text-rose-600">{t("← 중복!", "← dup!")}</span>}
                    {memoOn && node.dup && <span className="ml-1 text-[10px] text-emerald-600">{t("← 캐시!", "← cache!")}</span>}
                  </div>
                )
              })}
            </div>
            <div className={cn("rounded-lg p-3 text-center",
              memoOn ? "bg-emerald-50" : "bg-rose-50")}>
              <p className="text-sm font-mono">
                {memoOn ? (
                  <span className="text-emerald-800">
                    {t("호출 수", "Calls")}: <b>{totalCalls - dupCalls}</b> ({t("필요한 것만!", "only what's needed!")})
                  </span>
                ) : (
                  <span className="text-rose-800">
                    {t("호출 수", "Calls")}: <b>{totalCalls}</b> ({t("중복 ", "dupes ")}<b>{dupCalls}</b>{t(" 개", "")})
                  </span>
                )}
              </p>
              <p className="text-[11px] text-gray-600 mt-1">
                {t(
                  "fib(40) — 끄면 ~10 억 번, 켜면 ~40 번.",
                  "fib(40) — OFF: ~1 billion calls, ON: ~40 calls.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 메모이제이션 추가", "Code — add memoization")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("딱 *한 줄* 추가로 지수 → 선형. dict (또는 unordered_map) 에 결과 저장.", "*One line* added — exponential → linear. Store results in dict (or unordered_map).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`memo = {}                       # ← 추가: 결과 저장

def fib(n):
    if n < 2: return n
    if n in memo: return memo[n]    # ← 캐시 hit!
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

print(fib(40))   # 102334155 — 0.001 초!
# 메모 없으면 fib(40) → 1 초 넘게 걸림`}
              cpp={`#include <iostream>
#include <unordered_map>
using namespace std;

unordered_map<int, long long> memo;   // ← 추가

long long fib(int n) {
    if (n < 2) return n;
    if (memo.count(n)) return memo[n];   // ← 캐시 hit!
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    cout << fib(40) << endl;   // 102334155 — 즉시!
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "메모이제이션 = '한 번 푼 문제 다시 안 풀기'. 재귀 + 캐시 = DP 의 시작이에요.",
                "Memoization = 'don't re-solve solved problems'. Recursion + cache = start of DP.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "메모이제이션을 적용한 fib(n) 의 시간복잡도는?",
              "Time complexity of memoized fib(n)?",
            )}
            options={[
              "O(2^N)",
              "O(N²)",
              "O(N)",
              "O(log N)",
            ]}
            answerIdx={2}
            hint={t(
              "각 fib(k) 는 *처음 한 번만* 진짜 계산하고, 그 이후엔 캐시에서 꺼냄. 0..N 까지 N+1 개 값 → O(N).",
              "Each fib(k) is computed ONCE for real, then cached. N+1 distinct values from 0..N → O(N).",
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
              {t("재귀 마스터!", "Recursion Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "정말 잘 했어요. 재귀는 학생들이 가장 많이 *나가떨어지는* 토픽 — 끝까지 온 것만으로도 큰 성취예요. 🎉",
                "Really nice work. Recursion is where most students give up — finishing it is a real win. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "이제 알고리즘의 *진짜 도구* 가 손에 잡혔어요. 분할 정복, DP, 백트래킹 — 모두 재귀 위에서 굴러가요.",
                  "Now you've got real algorithm tools. Divide & conquer, DP, backtracking — all run on recursion.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("재귀 = ", "Recursion = ")}<b>{t("베이스 케이스 + 재귀 호출", "base case + recursive call")}</b> {t("두 줄이면 끝", "two lines")}</li>
              <li><b>2.</b> {t("문제를 *반으로* 쪼개면 O(N) → ", "Split problem *in half* → O(N) → ")}<b>O(log N)</b> {t("(분할 정복)", "(divide & conquer)")}</li>
              <li><b>3.</b> {t("같은 문제 반복? ", "Same subproblem again? ")}<b>{t("메모이제이션", "memoize")}</b> {t("한 줄로 살림", "saves it in one line")}</li>
              <li><b>4.</b> {t("재귀 깊이 너무 깊으면? ", "Too deep? ")}<b>{t("스택 오버플로우", "stack overflow")}</b> {t("— Python ", "— Python ")}<code className="bg-white px-1 rounded text-xs">sys.setrecursionlimit</code></li>
              <li><b>5.</b> {t("디버깅: 트리를 *손으로* 그려봐요. 종이 위에서 첫 3 단계 따라가면 보여요.", "Debug: *draw the tree by hand*. First 3 levels on paper makes it click.")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("재귀가 손에 잡히면 — DP, 백트래킹, 트리, 그래프 다 열려요!", "Once recursion clicks, DP/backtracking/trees/graphs all open up!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 {t("아직 부족해요? 코딩 뱅크에서 재귀 활용 문제. ", "Need more? Try recursion problems in Coding Bank. ")}
                <Link href="/coding-bank" className="font-bold underline hover:text-blue-900">{t("바로 가기 →", "Go →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🌲 {t("다음 토픽: 재귀 위에서 — DP, 백트래킹, 트리. ", "Next topics built on recursion: DP, backtracking, trees. ")}
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
              ? <>🎉 {t("재귀 마스터!", "Recursion Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function RecursionPage() {
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
          user_id: user.id, lesson_id: "algo-recursion", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-recursion")) {
          arr.push("algo-recursion")
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
              { label: "재귀", labelEn: "Recursion", emoji: "🔁" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🔁</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("재귀", "Recursion")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver 필수", "Silver core")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/recursion/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("재귀 문제 12 개 — 손으로 그려가며!", "12 recursion challenges — draw the tree!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("재귀 마스터!", "Recursion Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/coding-bank" className="block px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-sm text-center border-2 border-blue-200">
                💼 {t("코딩 뱅크 — 재귀 응용 문제", "Coding Bank — recursion applied")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (DP / 백트래킹)", "Next topic (DP / backtracking)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
