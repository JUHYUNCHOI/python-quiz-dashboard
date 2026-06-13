"use client"

/**
 * 비트 조작 (Bit Manipulation) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — 비트 연산이 익숙하지 않으면 헷갈리기 쉬운 토픽. 시각적으로 비트 표현을 보여주는 게 핵심.
 * 왜 비트? → 기본 연산 (AND/OR/XOR/SHIFT) → XOR 트릭 → bitmask 부분집합 → 정리.
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
  { id: 1, emoji: "⚙️", title: "왜 비트 조작?",             titleEn: "Why Bit Manipulation?",      mins: 4 },
  { id: 2, emoji: "🔧", title: "기본 연산 (AND/OR/XOR/SHIFT)", titleEn: "Basics (AND/OR/XOR/SHIFT)", mins: 6 },
  { id: 3, emoji: "🪄", title: "XOR 트릭",                  titleEn: "XOR Tricks",                 mins: 7 },
  { id: 4, emoji: "🎭", title: "bitmask 활용",              titleEn: "Bitmask Tricks",             mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",                titleEn: "Recap & Practice",           mins: 5 },
]

const STORAGE_KEY = "algo-bitmanipulation-chapter"

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

// ── 비트 표시 헬퍼 ───────────────────────────────────────────────
function BitRow({ value, bits = 8, label, highlight }: { value: number; bits?: number; label?: string; highlight?: number[] }) {
  const arr: number[] = []
  for (let i = bits - 1; i >= 0; i--) arr.push((value >> i) & 1)
  return (
    <div className="flex items-center gap-2 font-mono">
      {label && <span className="text-xs text-gray-500 w-16">{label}</span>}
      <div className="flex gap-0.5">
        {arr.map((b, idx) => {
          const bitPos = bits - 1 - idx
          const hi = highlight?.includes(bitPos)
          return (
            <span key={idx} className={cn(
              "inline-block w-6 h-6 text-xs text-center leading-6 rounded border",
              b === 1 ? "bg-amber-200 border-amber-400 text-amber-900 font-bold" : "bg-gray-50 border-gray-200 text-gray-400",
              hi && "ring-2 ring-blue-400",
            )}>{b}</span>
          )
        })}
      </div>
      <span className="text-xs text-gray-600 ml-1 tabular-nums">= {value}</span>
    </div>
  )
}

// ── Chapter 1: 왜 비트 조작? ─────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚙️</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("비트 — 컴퓨터의 진짜 언어", "Bits — the computer's real language")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "스위치 N 개가 줄지어 있다고 상상해요. 각 스위치는 ON (1) 또는 OFF (0). 이 패턴이 곧 하나의 정수.",
                "Imagine N switches in a row. Each is ON (1) or OFF (0). That pattern IS an integer.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">{t("예: 8-bit 수 표현", "Example: 8-bit number")}</p>
              <div className="space-y-2">
                <BitRow value={13} label="13" />
                <BitRow value={5} label="5" />
                <BitRow value={170} label="170" />
              </div>
              <p className="text-[11px] text-gray-600 mt-2">
                {t("왼쪽이 큰 자리 (128), 오른쪽이 1 의 자리.", "Leftmost = 128, rightmost = 1.")}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              {t(
                "정수를 '비트들의 묶음' 으로 보면 — 단 한 번의 연산으로 32 개 스위치를 한꺼번에 조작할 수 있어요.",
                "Viewing integers as 'bundles of bits' lets you flip 32 switches at once in a single operation.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("왜 빠른가? — CPU 가 한 번에 처리", "Why fast? — CPU does it in one shot")}
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-sm font-black text-rose-800 mb-1">
                  🐢 {t("for 루프로 32 비트 검사", "Loop to check 32 bits")}
                </p>
                <p className="text-xs text-gray-700">
                  {t(
                    "32 번 반복. 각 반복마다 비교 + 분기.",
                    "32 iterations. Compare + branch each time.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  ⚡ {t("비트 연산 (& | ^) 한 줄", "Bit op (& | ^) in one line")}
                </p>
                <p className="text-xs text-gray-700">
                  {t(
                    "CPU 가 32 비트를 *동시에* 처리 — O(1).",
                    "CPU processes 32 bits in parallel — O(1).",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mt-3">
              <p className="text-xs text-blue-800 leading-relaxed">
                💡 <b>{t("핵심 활용", "Where it shines")}:</b>{" "}
                {t(
                  "집합 표현 (있다/없다 32 개), 빠른 연산 트릭, 메모리 절약 (1/32), bitmask DP.",
                  "Set membership (in/out, 32 items), speed tricks, memory savings (1/32), bitmask DP.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지", "3 things we'll cover")}
            </h3>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔧 1. {t("기본 연산 — AND/OR/XOR/SHIFT", "Basics — AND/OR/XOR/SHIFT")}
                </p>
                <p className="text-xs text-gray-700">
                  {t("비트 5 개 연산자만 알면 됨. (챕터 2)", "Five operators is all you need. (Ch 2)")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🪄 2. {t("XOR 트릭 — 짝 없는 원소, swap", "XOR tricks — single number, swap")}
                </p>
                <p className="text-xs text-gray-700">
                  {t("x ^ x = 0 의 마법. (챕터 3)", "Magic of x ^ x = 0. (Ch 3)")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🎭 3. {t("bitmask — 부분집합 모두 순회", "Bitmask — enumerate all subsets")}
                </p>
                <p className="text-xs text-gray-700">
                  {t("for mask in range(1 << N). N ≤ 20 에서 만능. (챕터 4)", "for mask in range(1 << N). Powerhouse at N ≤ 20. (Ch 4)")}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("스위치들과 친해져요! →", "Make friends with the switches! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 기본 연산 (AND/OR/XOR/SHIFT) ──────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 인터랙티브 — 두 8-bit 수 입력 후 AND/OR/XOR/NOT/SHIFT 결과
  const [a, setA] = useState(12)   // 0b00001100
  const [b, setB] = useState(10)   // 0b00001010
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.floor(v)))

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔧</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("5 가지 비트 연산", "Five bit operations")}
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="bg-white rounded-lg p-2.5 border border-cyan-200">
                <p><b className="text-cyan-700">AND (&)</b>{t(" — 둘 다 1 일 때만 1. '교집합'.", " — 1 only if both are 1. 'Intersection'.")}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-cyan-200">
                <p><b className="text-cyan-700">OR (|)</b>{t(" — 하나라도 1 이면 1. '합집합'.", " — 1 if either is 1. 'Union'.")}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-cyan-200">
                <p><b className="text-cyan-700">XOR (^)</b>{t(" — 정확히 한 쪽만 1 일 때 1. '엇갈림'.", " — 1 if exactly one is 1. 'Mismatch'.")}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-cyan-200">
                <p><b className="text-cyan-700">NOT (~)</b>{t(" — 0/1 뒤집기. (signed 라 음수 나옴 — unsigned 권장)", " — flip 0/1. (signed wraps to negative)")}</p>
                <p className="text-[11px] text-gray-500 mt-1">{t("왜 음수? 컴퓨터는 음수를 '2의 보수' 로 저장해서 ~x = -x-1 이 돼요. (예: ~5 = -6). 특정 비트 폭만 보려면 & 0xff 처럼 마스킹.", "Why negative? Computers store negatives in 'two's complement', so ~x = -x-1 (e.g. ~5 = -6). Mask with & 0xff to keep a fixed bit width.")}</p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border border-cyan-200">
                <p><b className="text-cyan-700">SHIFT (&lt;&lt; &gt;&gt;)</b>{t(" — 비트 자리 이동. &lt;&lt; 1 = ×2, &gt;&gt; 1 = ÷2.", " — shift bits. << 1 = ×2, >> 1 = ÷2.")}</p>
              </div>
            </div>
            <p className="text-xs text-cyan-700 text-center mt-3">
              {t("다음 슬라이드에서 직접 두 수 넣어보고 결과 봐요.", "Next slide: type two numbers and see the result.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("두 8-bit 수 연산 결과 보기", "Run ops on two 8-bit numbers")}</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <label className="text-xs font-bold text-gray-700">a:
                <input type="number" min={0} max={255} value={a}
                  onChange={(e) => setA(clamp(parseInt(e.target.value || "0", 10)))}
                  className="ml-1 w-16 border border-gray-300 rounded px-1 py-0.5 text-sm font-mono" />
              </label>
              <label className="text-xs font-bold text-gray-700">b:
                <input type="number" min={0} max={255} value={b}
                  onChange={(e) => setB(clamp(parseInt(e.target.value || "0", 10)))}
                  className="ml-1 w-16 border border-gray-300 rounded px-1 py-0.5 text-sm font-mono" />
              </label>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
              <BitRow value={a} label="a" />
              <BitRow value={b} label="b" />
              <div className="border-t border-gray-300 my-1" />
              <BitRow value={a & b} label="a & b" />
              <BitRow value={a | b} label="a | b" />
              <BitRow value={a ^ b} label="a ^ b" />
              <BitRow value={(~a) & 0xff} label="~a (8b)" />
              <BitRow value={(a << 1) & 0xff} label="a << 1" />
              <BitRow value={a >> 1} label="a >> 1" />
            </div>
            <p className="text-[11px] text-gray-500 mt-2 text-center">
              {t("0 ≤ a, b ≤ 255 (8-bit). ~a 와 a<<1 은 8 비트 마스킹.", "0 ≤ a, b ≤ 255 (8-bit). ~a and a<<1 are masked to 8 bits.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 기본 연산", "Code — basic ops")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("연산자 그대로. C++/Python 모두 & | ^ ~ << >> 동일.", "Use operators directly — & | ^ ~ << >> identical in C++/Python.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`a = 12   # 0b00001100
b = 10   # 0b00001010

print(a & b)   # 8   = 0b00001000
print(a | b)   # 14  = 0b00001110
print(a ^ b)   # 6   = 0b00000110
print(a << 1)  # 24  = 0b00011000  (×2)
print(a >> 1)  # 6   = 0b00000110  (÷2)

# 특정 비트 검사 (3 번째 비트, 0 부터)
print((a >> 3) & 1)   # 1`}
              cpp={`#include <iostream>
using namespace std;

int main() {
    int a = 12;   // 0b00001100
    int b = 10;   // 0b00001010

    cout << (a & b) << endl;   // 8
    cout << (a | b) << endl;   // 14
    cout << (a ^ b) << endl;   // 6
    cout << (a << 1) << endl;  // 24
    cout << (a >> 1) << endl;  // 6

    // 특정 비트 검사
    cout << ((a >> 3) & 1) << endl;   // 1
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "비트 i 검사: (x >> i) & 1. 비트 i 켜기: x | (1 << i). 끄기: x & ~(1 << i). 토글: x ^ (1 << i).",
                "Check bit i: (x >> i) & 1. Set: x | (1 << i). Clear: x & ~(1 << i). Toggle: x ^ (1 << i).",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "a = 0b1100 (= 12), b = 0b1010 (= 10) 일 때 a ^ b 는?",
              "If a = 0b1100 (= 12) and b = 0b1010 (= 10), what is a ^ b?",
            )}
            options={[
              "0b1000 (= 8)",
              "0b1110 (= 14)",
              "0b0110 (= 6)",
              "0b0000 (= 0)",
            ]}
            answerIdx={2}
            hint={t(
              "XOR = '엇갈린 비트' 만 1. 1100 과 1010 을 비교: 자리별로 (1,1)→0, (1,0)→1, (0,1)→1, (0,0)→0 → 0110 = 6.",
              "XOR = 1 where bits differ. Compare 1100 vs 1010 bit by bit: (1,1)→0, (1,0)→1, (0,1)→1, (0,0)→0 → 0110 = 6.",
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

// ── Chapter 3: XOR 트릭 ──────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 인터랙티브 — 짝 없는 원소 찾기 시뮬레이션
  const arr = [4, 1, 2, 1, 2]
  const [idx, setIdx] = useState(0)
  const running = arr.slice(0, idx).reduce((acc, v) => acc ^ v, 0)
  const stepNext = () => { if (idx < arr.length) setIdx(idx + 1) }
  const reset = () => setIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪄</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("XOR 의 두 가지 마법", "XOR's two magic laws")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-violet-200">
                <p className="text-sm font-black text-violet-800 mb-1">
                  ① {t("x ^ x = 0", "x ^ x = 0")}
                </p>
                <p className="text-xs text-gray-700">
                  {t("같은 수를 두 번 XOR 하면 사라져요.", "XOR-ing the same value twice erases it.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-violet-200">
                <p className="text-sm font-black text-violet-800 mb-1">
                  ② {t("x ^ 0 = x", "x ^ 0 = x")}
                </p>
                <p className="text-xs text-gray-700">
                  {t("0 과 XOR 해도 변화 없음.", "XOR with 0 changes nothing.")}
                </p>
              </div>
            </div>
            <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
              <p className="text-xs text-violet-800 leading-relaxed">
                💡 <b>{t("응용", "Applications")}:</b>
                <br />
                {t("• 짝 없는 원소 찾기 (LC 136) — 모두 XOR 누적", "• Find lone element (LC 136) — XOR everything")}
                <br />
                {t("• 임시 변수 없이 swap — XOR 3 번", "• Swap without temp — XOR 3 times")}
                <br />
                {t("• 두 missing 원소 (LC 260) — XOR + 비트 분리", "• Two missing (LC 260) — XOR + bit partition")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("짝 없는 원소 찾기 — 한 칸씩 XOR", "Find the lone element — XOR step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("배열: [4, 1, 2, 1, 2]. 누적 XOR 이 어떻게 변하는지 보세요.", "Array: [4, 1, 2, 1, 2]. Watch the running XOR.")}
            </p>
            <div className="flex items-center justify-center gap-1 flex-wrap mb-3">
              {arr.map((v, i) => (
                <div key={i} className={cn(
                  "px-3 py-2 rounded-lg border-2 font-mono text-sm font-bold transition-all",
                  i < idx && "bg-blue-50 border-blue-300 text-blue-700",
                  i === idx && "bg-amber-200 border-amber-500 text-amber-900 scale-110",
                  i > idx && "bg-gray-100 border-gray-300 text-gray-400",
                )}>{v}</div>
              ))}
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-amber-800">
                {idx === 0 && t("시작: 누적 XOR = 0", "Start: running XOR = 0")}
                {idx > 0 && idx < arr.length && (
                  <>
                    {t("누적 XOR = ", "Running XOR = ")}<b>{running}</b>
                  </>
                )}
                {idx === arr.length && (
                  <b className="text-emerald-700">
                    ✅ {t(`완료! 짝 없는 원소 = ${running}`, `Done! Lone element = ${running}`)}
                  </b>
                )}
              </p>
              {idx > 0 && idx < arr.length && (
                <p className="text-[11px] text-amber-700 mt-1 font-mono">
                  {arr.slice(0, idx).join(" ^ ")} = {running}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={stepNext} disabled={idx >= arr.length}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("XOR 한 칸", "XOR one")}
              </button>
              <button onClick={reset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-emerald-50 rounded-lg p-2 border border-emerald-200">
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                💡 {t("1 과 2 는 두 번 나와서 상쇄되고, 4 만 한 번이라 살아남음. 순서 무관!", "1 and 2 each appear twice and cancel; 4 survives. Order doesn't matter!")}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — XOR 응용 두 가지", "Code — two XOR tricks")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("짝 없는 원소 + 임시 없이 swap.", "Lone element + swap without temp.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# ① 짝 없는 원소 — O(N), 메모리 O(1)
arr = [4, 1, 2, 1, 2]
ans = 0
for x in arr:
    ans ^= x
print(ans)   # 4

# ② swap without temp — XOR 세 번
a, b = 3, 7
a ^= b
b ^= a    # b = 원래 a
a ^= b    # a = 원래 b
print(a, b)   # 7 3`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // ① 짝 없는 원소
    vector<int> arr = {4, 1, 2, 1, 2};
    int ans = 0;
    for (int x : arr) ans ^= x;
    cout << ans << endl;   // 4

    // ② swap without temp
    int a = 3, b = 7;
    a ^= b;
    b ^= a;   // b = 원래 a
    a ^= b;   // a = 원래 b
    cout << a << ' ' << b << endl;   // 7 3
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "주의: XOR swap 은 a, b 가 같은 메모리면 0 이 됨. 실무엔 swap(a,b) 권장 — XOR 트릭은 '아이디어' 로 기억.",
                "Caveat: XOR swap zeros out if a, b alias the same memory. Use swap(a,b) in real code — keep XOR swap as a concept.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "배열 [5, 3, 5, 7, 3, 7, 9] 의 모든 원소를 XOR 누적하면 결과는?",
              "If you XOR-accumulate all elements of [5, 3, 5, 7, 3, 7, 9], what's the result?",
            )}
            options={["0", "5", "9", "39"]}
            answerIdx={2}
            hint={t(
              "5, 3, 7 은 각각 두 번씩 → 모두 상쇄. 9 만 한 번이라 살아남음 → 9.",
              "5, 3, 7 each appear twice and cancel. Only 9 appears once → 9.",
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

// ── Chapter 4: bitmask 활용 ──────────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 인터랙티브 — N=3 부분집합 mask 0..7
  const items = ["A", "B", "C"]
  const N = items.length
  const [mask, setMask] = useState(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎭</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("bitmask — N 개 부분집합 모두 순회", "Bitmask — visit every subset of N items")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "N 개 원소의 부분집합 수 = ",
                "Number of subsets of N items = ",
              )}<b className="text-pink-700">2^N</b>{t(
                ". 각 원소를 '쓰냐 / 안 쓰냐' 두 갈래 → ",
                ". Each item is in/out → ",
              )}<b>2 × 2 × ... × 2</b>.
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-pink-200 mb-3">
              <p className="text-xs font-bold text-pink-800 mb-2">
                {t("핵심: mask 라는 정수의 비트 i 가 1 = 원소 i 포함", "Key: bit i of an integer 'mask' = item i is included")}
              </p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`for mask in range(1 << N):   # 0 ~ 2^N - 1
    for i in range(N):
        if (mask >> i) & 1:
            # 원소 i 사용
            ...`}
              </pre>
            </div>
            <p className="text-sm font-bold text-pink-700 text-center">
              {t("N ≤ 20 까지 만능 — 2^20 ≈ 100 만, 충분히 빠름.", "Works through N ≤ 20 — 2^20 ≈ 1M, fast enough.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("mask = 0..7 → 부분집합 8 개 (N=3)", "mask = 0..7 → 8 subsets (N=3)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("원소: A, B, C. 슬라이더로 mask 바꿔보면 선택이 어떻게 변하는지 보여요.", "Items: A, B, C. Slide mask and see which items light up.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600 mb-2">{t("mask =", "mask =")} <b className="font-mono text-base text-amber-700">{mask}</b></p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500 w-12">bits:</span>
                <div className="flex gap-1">
                  {[2, 1, 0].map(i => {
                    const bit = (mask >> i) & 1
                    return (
                      <span key={i} className={cn(
                        "inline-block w-8 h-8 text-sm text-center leading-8 rounded border font-mono font-bold",
                        bit === 1 ? "bg-emerald-200 border-emerald-400 text-emerald-900" : "bg-gray-100 border-gray-300 text-gray-400",
                      )}>{bit}</span>
                    )
                  })}
                </div>
                <span className="text-[11px] text-gray-500 ml-2">{t("(왼쪽 = bit 2 = C)", "(left = bit 2 = C)")}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 w-12">{t("선택:", "Chose:")}</span>
                <div className="flex gap-2">
                  {items.map((it, i) => {
                    const on = ((mask >> i) & 1) === 1
                    return (
                      <span key={i} className={cn(
                        "inline-block px-3 py-1 rounded-lg font-mono text-sm font-bold border-2 transition-all",
                        on ? "bg-emerald-100 border-emerald-400 text-emerald-800" : "bg-gray-50 border-gray-200 text-gray-300 line-through",
                      )}>{it}</span>
                    )
                  })}
                </div>
              </div>
              <input type="range" min={0} max={(1 << N) - 1} value={mask}
                onChange={(e) => setMask(parseInt(e.target.value, 10))}
                className="w-full mt-2" />
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 1 << N }).map((_, i) => (
                  <button key={i} onClick={() => setMask(i)}
                    className={cn(
                      "flex-1 py-1 rounded text-[11px] font-mono font-bold border",
                      i === mask ? "bg-amber-200 border-amber-500 text-amber-900" : "bg-white border-gray-200 text-gray-500 hover:border-amber-300",
                    )}>{i}</button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-gray-600 text-center">
              {t("mask = 0 → 공집합, mask = 7 → {A, B, C}. 8 개 mask = 8 개 부분집합.", "mask = 0 → empty set, mask = 7 → {A, B, C}. 8 masks = 8 subsets.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 부분집합 합 모두 계산", "Code — sums of all subsets")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("외부 mask 루프 + 내부 비트 루프. 2^N · N.", "Outer mask loop + inner bit loop. 2^N · N.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`arr = [3, 1, 4]
N = len(arr)

# 모든 부분집합의 합
for mask in range(1 << N):
    s = 0
    items = []
    for i in range(N):
        if (mask >> i) & 1:
            s += arr[i]
            items.append(arr[i])
    print(f"mask={mask}  subset={items}  sum={s}")

# ⛳ 여기까지가 이 챕터 범위 — "부분집합 모두 순회".
# (dp[mask][v] 같은 비트마스크 DP / TSP 는 Wave 3 DP 토픽에서 다뤄요.
#  지금은 모르는 게 정상이니 안 봐도 돼요!)`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 4};
    int N = arr.size();

    for (int mask = 0; mask < (1 << N); mask++) {
        int sum = 0;
        cout << "mask=" << mask << "  subset={";
        bool first = true;
        for (int i = 0; i < N; i++) {
            if ((mask >> i) & 1) {
                if (!first) cout << ",";
                cout << arr[i];
                sum += arr[i];
                first = false;
            }
        }
        cout << "}  sum=" << sum << endl;
    }
    // ⛳ 여기까지가 이 챕터 범위 — "부분집합 모두 순회".
    // (dp[mask][v] 같은 비트마스크 DP / TSP 는 Wave 3 DP 토픽. 지금은 안 봐도 OK.)
    return 0;
}`}
            />
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
              <p className="text-xs text-indigo-800 text-center leading-relaxed">
                🚧 {t(
                  "여기 이 챕터는 '부분집합 모두 순회' 까지가 끝! TSP·set cover 같은 dp[mask][...] 비트마스크 DP 는 Wave 3 DP 토픽에서 따로 배워요 — 지금은 몰라도 괜찮아요.",
                  "This chapter stops at 'enumerating subsets'. dp[mask][...] bitmask DP (TSP, set-cover) is taught later in the Wave 3 DP topic — no need to know it yet.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "N = 5 일 때 전체 부분집합 (공집합 포함) 의 개수는?",
              "How many subsets (including empty) when N = 5?",
            )}
            options={["5", "10", "25", "32"]}
            answerIdx={3}
            hint={t(
              "각 원소마다 '쓴다 / 안 쓴다' 두 갈래 → 2 × 2 × 2 × 2 × 2 = 2^5 = 32.",
              "Each element is in/out → 2 × 2 × 2 × 2 × 2 = 2^5 = 32.",
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
              {t("비트 마스터!", "Bit Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "비트 연산은 처음엔 헷갈리지만 — 한 번 익히면 평생 도구. 단 한 줄로 32 개 스위치를 동시에 조작할 수 있어요.",
                "Bit ops feel strange at first — once they click, they're a lifelong tool. Flip 32 switches in one line.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "다음: 이 비트마스크 기법이 그래프 DP, TSP, 부분집합 합 같은 알고리즘에서 핵심 도구로 등장해요.",
                  "Next: this bitmask technique becomes a core tool in graph DP, TSP, subset-sum-style algorithms.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("비트 연산 비용 = ", "Cost of a bit op = ")}<b>O(1)</b> — {t("CPU 가 32/64 비트를 한 번에 처리.", "CPU handles 32/64 bits at once.")}</li>
              <li><b>2.</b> <b>{t("XOR 의 두 법칙", "XOR's two laws")}</b>: x ^ x = 0, x ^ 0 = x. {t("짝 없는 원소, swap, 두 missing 응용.", "Lone element, swap, two-missing applications.")}</li>
              <li><b>3.</b> <b>{t("부분집합 모두 순회", "Enumerate all subsets")}</b> — <code className="bg-white px-1 rounded text-xs">for mask in range(1 &lt;&lt; N)</code>. N ≤ 20.</li>
              <li><b>4.</b> {t("디버깅: ", "Debug: ")}<code className="bg-white px-1 rounded text-xs">bin(x)</code> {t("로 비트 패턴 직접 출력해보기. 종이에 그려보면 안 헷갈림.", "to print the bit pattern. Draw on paper if confused.")}</li>
            </ol>
            <div className="mt-3 bg-white/70 rounded-lg p-3 border border-amber-200">
              <p className="text-xs font-black text-amber-800 mb-2">💡 {t("보너스 트릭 (참고 — 위 본문엔 안 나온 것들)", "Bonus tricks (reference — not covered above)")}</p>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li>
                  <code className="bg-amber-50 px-1 rounded">x &gt; 0 && (x & (x-1)) == 0</code> — {t("2 의 거듭제곱인지 판별. (2 의 거듭제곱은 set bit 가 딱 1 개라, x-1 과 AND 하면 0 이 됨.)", "Is x a power of two? A power of two has exactly one set bit, so x & (x-1) clears it to 0.")}
                </li>
                <li>
                  <code className="bg-amber-50 px-1 rounded">x & -x</code> — {t("가장 낮은 set bit 만 남기기. (-x 는 2 의 보수라 가장 낮은 1 비트만 겹침.)", "Isolate the lowest set bit. (-x is two's complement, so only the lowest 1-bit overlaps.)")}
                </li>
                <li>
                  <code className="bg-amber-50 px-1 rounded">__builtin_popcount(x)</code> {t("(C++)", "(C++)")} / <code className="bg-amber-50 px-1 rounded">bin(x).count('1')</code> {t("(Python)", "(Python)")} — {t("켜진 비트 개수 세기.", "Count the set bits.")}
                </li>
              </ul>
            </div>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("스위치들의 언어 — 이제 그래프 DP, TSP, 압축 표현이 손에 잡혀요!", "The language of switches — graph DP, TSP, and compact state are in reach!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 {t("아직 부족해요? 옆길 — DP 토픽에서 비트마스크 DP (TSP 등) 만나요. ", "Need more? Side path — bitmask DP (TSP etc.) is in the DP topic. ")}
                <Link href="/algo/dp" className="font-bold underline hover:text-blue-900">{t("DP 토픽 →", "DP topic →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음: 다른 알고리즘 토픽 보러 가기. ", "Next: explore other algorithm topics. ")}
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
              ? <>🎉 {t("비트 마스터!", "Bit Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function BitManipulationPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)

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
          user_id: user.id, lesson_id: "algo-bitmanipulation", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-bitmanipulation")) {
          arr.push("algo-bitmanipulation")
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
              { label: "비트 조작", labelEn: "Bit Manipulation", emoji: "⚙️" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("비트 조작", "Bit Manipulation")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Wave 3", "Wave 3")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/bitmanipulation"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("비트 문제 12 개 — 손에 익히기!", "12 bit challenges — build muscle!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("비트 마스터!", "Bit Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/bitmanipulation" className="block px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-sm text-center border-2 border-blue-200">
                ⚙️ {t("비트 문제 12 개", "12 bit challenges")} <ArrowRight className="inline w-4 h-4" />
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
