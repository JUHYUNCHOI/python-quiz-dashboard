"use client"

/**
 * 문자열 (String) — 챕터식 학습 페이지 v1.
 *
 * 기존 vanilla JS 4177줄 한 페이지 → 5 챕터 React 구조.
 * Bronze ~ Silver 학생에 필수인 것만: 인덱스/슬라이싱, 메서드, ASCII 변환.
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

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🔤", title: "복습 + 알고리즘 관점",   titleEn: "Recap & Algo View",     mins: 2 },
  { id: 2, emoji: "📏", title: "인덱스·길이·슬라이싱",   titleEn: "Index, Length, Slice",  mins: 5 },
  { id: 3, emoji: "🛠", title: "자주 쓰는 메서드",        titleEn: "Common Methods",        mins: 6 },
  { id: 4, emoji: "🔢", title: "문자 ↔ 숫자 (ASCII)",   titleEn: "Char ↔ Number (ASCII)", mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",            titleEn: "Recap & Practice",       mins: 4 },
]

const STORAGE_KEY = "algo-string-chapter"

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

// 슬라이드 진도 점 + 이전/다음 버튼
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

// ── Chapter 1: 복습 + 알고리즘 관점 ───────────────────────────────
function Chapter1({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {/* Slide 0 — pivot: 이미 배운 거 알아요 */}
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">👋</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("오랜만! 문자열은 알죠?", "Welcome back! You know strings.")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "Python str, C++ string — 수업에서 이미 만났어요. 인덱스로 글자 꺼내고, 메서드도 좀 써봤죠.",
                "Python str, C++ string — you already met them in the main lessons. Indexing, a few methods, all familiar.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "여기선 새로 배우는 게 아니에요. — 알고리즘에서 자주 쓰이는 패턴 관점으로 한 번 더 봐요. 어디서 진짜 자주 나오는지, 무엇을 골라 써야 하는지.",
                "We're not starting fresh — instead, we'll look at strings through the algorithm lens. What patterns show up, what tools to reach for.",
              )}
            </p>
            <p className="text-sm text-orange-700 font-bold text-center mt-4">
              {t("→ 가볍게 복습부터 시작 →", "→ Quick recap first →")}
            </p>
          </div>
        )}

        {/* Slide 1 — 짧은 복습 한 화면 */}
        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-base font-black text-gray-900 mb-3 text-center">
              ⚡ {t("30초 복습", "30-sec recap")}
            </p>
            <div className="bg-white border-2 border-amber-200 rounded-lg p-3 mb-3">
              <p className="text-[11px] text-gray-500 mb-2 text-center">{t('"HELLO" 는 글자 배열', '"HELLO" is a row of chars')}</p>
              <div className="flex gap-1 justify-center mb-1">
                {["H", "E", "L", "L", "O"].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg bg-amber-100 border-2 border-amber-400 flex items-center justify-center font-mono font-black text-amber-800 text-lg">{c}</div>
                ))}
              </div>
              <div className="flex gap-1 justify-center">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 text-center text-[10px] text-gray-500 font-mono">[{i}]</div>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-gray-800">
              <p>📍 <b>{t("인덱스 접근", "Index access")}</b> — <code className="bg-amber-50 px-1 rounded text-xs">s[0]</code> = 'H', <code className="bg-amber-50 px-1 rounded text-xs">s[4]</code> = 'O'</p>
              <p>📏 <b>{t("길이", "Length")}</b> — {codeLang === "py"
                ? <><code className="bg-amber-50 px-1 rounded text-xs">len(s)</code> {t("→ 5", "→ 5")}</>
                : <><code className="bg-amber-50 px-1 rounded text-xs">s.size()</code> {t("→ 5", "→ 5")}</>}</p>
              <p>🔁 <b>{t("순회", "Loop")}</b> — {codeLang === "py"
                ? <><code className="bg-amber-50 px-1 rounded text-xs">for c in s:</code></>
                : <><code className="bg-amber-50 px-1 rounded text-xs">for (char c : s)</code></>}</p>
            </div>
            <p className="text-xs text-amber-700 text-center mt-3 leading-relaxed italic">
              {t("→ 익숙하죠? 이게 출발점이에요.", "→ Familiar, right? This is our starting line.")}
            </p>
          </div>
        )}

        {/* Slide 2 — 이 토픽에서 다룰 알고리즘 패턴 예고 */}
        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we cover here")}
            </h3>
            <div className="space-y-2 text-sm text-gray-800 mb-3">
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <b className="text-blue-700">📏 {t("인덱싱 / 슬라이싱", "Indexing / slicing")}</b>
                <p className="text-xs text-gray-600 mt-1">{t("부분문자열 뽑기 — 끝 인덱스 vs 길이 헷갈리기 쉬워요", "Pulling out a substring — end-index vs length is easy to mix up")}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <b className="text-blue-700">🛠 {t("자주 쓰는 메서드", "Common methods")}</b>
                <p className="text-xs text-gray-600 mt-1">{t("find / replace / upper·lower — 언제 어느 것?", "find / replace / upper·lower — when to use which?")}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <b className="text-blue-700">🔢 {t("ASCII 카운팅", "ASCII counting")}</b>
                <p className="text-xs text-gray-600 mt-1">{t("문자 → 숫자 변환으로 알파벳 빈도 세는 트릭", "Char-to-number trick for letter-frequency counting")}</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 text-center font-bold leading-relaxed">
              {t(
                "USACO Bronze 문자열 문제는 거의 다 이 3 가지 조합이에요.",
                "Bronze string problems are mostly combinations of these 3.",
              )}
            </p>
            <p className="text-sm font-bold text-blue-800 text-center mt-3">
              {t("→ 다음 챕터에서 시작 →", "→ Let's start →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 인덱스 · 길이 · 슬라이싱 ─────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const word = "PROGRAM"
  const [mode, setMode] = useState<"none" | "idx" | "slice" | "reverse">("none")
  const result = useMemo(() => {
    if (mode === "idx") return word[2]            // 'O'
    if (mode === "slice") return word.slice(1, 5) // "ROGR"
    if (mode === "reverse") return [...word].reverse().join("")
    return ""
  }, [mode])
  const highlighted: Set<number> = useMemo(() => {
    if (mode === "idx") return new Set([2])
    if (mode === "slice") return new Set([1, 2, 3, 4])
    if (mode === "reverse") return new Set([0, 1, 2, 3, 4, 5, 6])
    return new Set()
  }, [mode])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📏</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("문자열을 다루는 3 가지 기본", "3 basics for handling strings")}
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <b className="text-emerald-700">1) {t("인덱스", "Index")}</b> — <code className="bg-emerald-50 px-1 rounded">s[i]</code>
                <p className="text-xs text-gray-600 mt-1">{t("i 번째 글자 하나 꺼내기 (0 부터!)", "Get the i-th character (0-based!)")}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <b className="text-emerald-700">2) {t("길이", "Length")}</b> — Python <code className="bg-emerald-50 px-1 rounded">len(s)</code> / C++ <code className="bg-emerald-50 px-1 rounded">s.size()</code>
                <p className="text-xs text-gray-600 mt-1">{t("글자가 몇 개인지", "How many characters")}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <b className="text-emerald-700">3) {t("슬라이싱 / 부분문자열", "Slicing / substring")}</b> — Python <code className="bg-emerald-50 px-1 rounded">s[a:b]</code> / C++ <code className="bg-emerald-50 px-1 rounded">s.substr(a, len)</code>
                <p className="text-xs text-gray-600 mt-1">{t("일부분만 잘라내기", "Cut out part of the string")}</p>
              </div>
            </div>
            <p className="text-xs text-emerald-700 mt-3 text-center">
              {t("다음 슬라이드에서 직접 눌러봐요 →", "Click around next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 눌러보세요", "Click to try")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`"${word}" 에 인덱스 / 슬라이싱 / 뒤집기 — 결과가 노란색으로 표시돼요`, `On "${word}", try index / slice / reverse — result highlighted yellow`)}
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 mb-3">
              <div className="flex gap-1 justify-center mb-1 flex-wrap">
                {word.split("").map((c, i) => (
                  <div key={i} className={cn(
                    "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-black text-lg transition-all",
                    highlighted.has(i)
                      ? "bg-yellow-200 border-yellow-500 text-yellow-900 scale-110"
                      : "bg-white border-gray-300 text-gray-700",
                  )}>{c}</div>
                ))}
              </div>
              <div className="flex gap-1 justify-center flex-wrap">
                {word.split("").map((_, i) => (
                  <div key={i} className="w-10 text-center text-[10px] text-gray-500 font-mono">[{i}]</div>
                ))}
              </div>
            </div>
            {result && (
              <div className="mb-3 bg-emerald-50 border-2 border-emerald-300 rounded-lg p-2 text-center">
                <p className="text-[11px] text-emerald-600 font-bold">{t("결과", "Result")}</p>
                <p className="font-mono text-lg font-black text-emerald-700">&quot;{result}&quot;</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setMode("idx")} className="py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs">
                s[2] {t("→ 한 글자", "→ one char")}
              </button>
              <button onClick={() => setMode("slice")} className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-xs">
                s[1:5] {t("→ 부분", "→ slice")}
              </button>
              <button onClick={() => setMode("reverse")} className="py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold text-xs">
                {t("뒤집기", "Reverse")}
              </button>
              <button onClick={() => setMode("none")} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("실제 코드로 보면 —", "In real code —")}</p>
              <p className="text-xs text-gray-700">
                {t("Python 슬라이싱은 [a:b], C++ 는 substr(a, 길이) — 시작 인덱스는 같지만 두 번째 인자가 달라요!", "Python slicing is [a:b], C++ is substr(a, length) — same start, but second arg differs!")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`s = "PROGRAM"

# 한 글자
s[0]           # 'P'
s[2]           # 'O'
s[-1]          # 'M'  (뒤에서 첫 번째)

# 길이
len(s)         # 7

# 슬라이싱 — [시작 : 끝] (끝은 포함 X)
s[1:5]         # "ROGR"
s[:3]          # "PRO"
s[4:]          # "RAM"
s[::-1]        # "MARGORP"  (뒤집기)`}
              cpp={`#include <string>
string s = "PROGRAM";

// 한 글자
s[0];          // 'P'
s[2];          // 'O'
s.back();      // 'M'  (마지막 글자)

// 길이
s.size();      // 7  (또는 s.length())

// 부분문자열 — substr(시작, 길이)
s.substr(1, 4);   // "ROGR"
s.substr(0, 3);   // "PRO"
s.substr(4);      // "RAM"  (끝까지)`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("⚠️ C++ substr(1, 4) 의 '4' 는 길이! Python [1:5] 의 '5' 는 끝 인덱스. 헷갈리지 마세요.", "⚠️ C++ substr(1, 4) — '4' is length! Python [1:5] — '5' is end index. Don't confuse them.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t('Python: s = "HELLO" 일 때, s[1:4] 는?', 'Python: s = "HELLO", what is s[1:4]?')
              : t('C++: string s = "HELLO" 일 때, s.substr(1, 3) 은?', 'C++: string s = "HELLO", what is s.substr(1, 3)?')
            }
            options={['"ELL"', '"ELLO"', '"HEL"', '"HELL"']}
            answerIdx={0}
            hint={codeLang === "py"
              ? t("[1:4] = 인덱스 1, 2, 3 만 (4 는 미포함). H[0] E[1] L[2] L[3] O[4]", "[1:4] = indices 1, 2, 3 only (4 excluded). H[0] E[1] L[2] L[3] O[4]")
              : t("substr(1, 3) = 인덱스 1 부터 3 개 글자. H[0] E[1] L[2] L[3] O[4]", "substr(1, 3) = 3 chars from index 1. H[0] E[1] L[2] L[3] O[4]")
            }
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

// ── Chapter 3: 자주 쓰는 메서드 ─────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [input, setInput] = useState("Hello World")
  const [method, setMethod] = useState<"upper" | "lower" | "find" | "replace" | "split">("upper")
  const output = useMemo(() => {
    switch (method) {
      case "upper":   return input.toUpperCase()
      case "lower":   return input.toLowerCase()
      case "find":    return String(input.indexOf("o"))
      case "replace": return input.replace(/o/g, "0")
      case "split":   return JSON.stringify(input.split(" "))
    }
  }, [input, method])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🛠</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("문자열은 도구가 진짜 많아요", "Strings have lots of tools")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "이 챕터에서는 가장 자주 쓰는 5 가지만 봐요. 외울 필요 없어요 — '이런 게 있다' 만 기억!",
                "Just the 5 most useful ones in this chapter. No need to memorize — just remember 'these exist'!",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-purple-200 space-y-1.5 text-sm">
              <p>🔼 <code className="bg-purple-50 px-1 rounded">upper()</code> — {t("전부 대문자", "all uppercase")}</p>
              <p>🔽 <code className="bg-purple-50 px-1 rounded">lower()</code> — {t("전부 소문자", "all lowercase")}</p>
              <p>🔍 <code className="bg-purple-50 px-1 rounded">find()</code> — {t("어디서 처음 나오는지", "first index where")}</p>
              <p>🔄 <code className="bg-purple-50 px-1 rounded">replace()</code> — {t("바꿔치기", "swap parts")}</p>
              <p>✂️ <code className="bg-purple-50 px-1 rounded">split()</code> — {t("기준대로 자르기 (Python 만)", "cut by delimiter (Python only)")}</p>
            </div>
            <p className="text-xs text-purple-700 mt-3 text-center">
              {t("다음 슬라이드에서 직접 골라봐요 →", "Pick one on next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("메서드 골라 보기", "Try each method")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("아래 문자열에 메서드 5 가지 — 결과가 어떻게 달라지는지!", "5 methods on the string — see how it changes!")}
            </p>
            <div className="mb-3">
              <label className="text-[11px] text-gray-500 mb-1 block">{t("문자열 (수정 가능)", "String (editable)")}</label>
              <input value={input} onChange={e => setInput(e.target.value)}
                className="w-full px-3 py-2 border-2 border-amber-200 rounded-lg font-mono text-sm focus:outline-none focus:border-amber-400" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[
                { key: "upper" as const, label: "upper()" },
                { key: "lower" as const, label: "lower()" },
                { key: "find" as const, label: `find("o")` },
                { key: "replace" as const, label: `o → 0` },
                { key: "split" as const, label: `split(" ")` },
              ].map(b => (
                <button key={b.key} onClick={() => setMethod(b.key)}
                  className={cn("py-2 rounded-lg font-bold text-xs transition-all",
                    method === b.key ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                  {b.label}
                </button>
              ))}
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-3 text-center">
              <p className="text-[11px] text-emerald-600 font-bold mb-1">{t("결과", "Result")}</p>
              <p className="font-mono text-base font-black text-emerald-700 break-all">{output}</p>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3 italic">
              {t("위 문자열 바꿔보면서 메서드 골라봐요!", "Change the string above and try each method!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("실제 코드", "Real code")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("Python 은 메서드가 풍부, C++ 는 약간 다르지만 비슷한 게 다 있어요:", "Python has rich methods, C++ is a bit different but has similar tools:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`s = "Hello World"

# 대소문자
s.upper()              # "HELLO WORLD"
s.lower()              # "hello world"

# 찾기 — 없으면 -1
s.find("World")        # 6
s.find("zzz")          # -1

# 바꾸기 — 모두 바꿈
s.replace("o", "0")    # "Hell0 W0rld"

# 자르기 — 리스트 반환
s.split(" ")           # ["Hello", "World"]
"a,b,c".split(",")     # ["a", "b", "c"]

# 합치기
",".join(["a", "b"])   # "a,b"`}
              cpp={`#include <string>
#include <algorithm>
string s = "Hello World";

// 대소문자 — 글자 단위로 변환
string upper = s;
transform(upper.begin(), upper.end(),
          upper.begin(), ::toupper);
// "HELLO WORLD"

// 찾기 — 없으면 string::npos
size_t pos = s.find("World");   // 6
if (pos == string::npos) { /* 못 찾음 */ }

// 부분문자열
s.substr(0, 5);                 // "Hello"

// 바꾸기 (한 군데)
s.replace(6, 5, "C++");         // "Hello C++"

// 길이
s.size();   // 11`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("💡 C++ 는 split 이 없어요. 보통 stringstream 으로 직접 처리.", "💡 C++ has no split — usually done via stringstream.")}
            </p>
          </div>
        )}

        {step === 3 && (codeLang === "py" ? (
          <MiniQuiz
            question={t('Python: "banana".replace("a", "o") 의 결과는?', 'Python: "banana".replace("a", "o") returns?')}
            options={['"banana"', '"bonono"', '"banono"', '"bonana"']}
            answerIdx={1}
            hint={t("replace 는 모든 'a' 를 'o' 로 바꿔요. b-a-n-a-n-a → b-o-n-o-n-o", "replace swaps every 'a' for 'o'. b-a-n-a-n-a → b-o-n-o-n-o")}
            onCorrect={() => setQuizPassed(true)}
          />
        ) : (
          <MiniQuiz
            question={t('C++: string s = "Hello"; s.find("ll") 의 반환값은?', 'C++: string s = "Hello"; s.find("ll") returns?')}
            options={["0", "2", "3", "string::npos"]}
            answerIdx={1}
            hint={t("'ll' 은 인덱스 2 에서 시작 — H[0] e[1] l[2] l[3] o[4]", "'ll' starts at index 2 — H[0] e[1] l[2] l[3] o[4]")}
            onCorrect={() => setQuizPassed(true)}
          />
        ))}
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

// ── Chapter 4: 문자 ↔ 숫자 (ASCII) ───────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [charInput, setCharInput] = useState("A")
  const code = charInput.length > 0 ? charInput.charCodeAt(0) : 0

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔢</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("문자는 사실 — 숫자예요", "Characters are actually — numbers")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "컴퓨터는 글자를 모르고 숫자만 알아요. 그래서 'A' = 65, 'B' = 66, ... 이렇게 약속해 놨어요. 이게 ASCII 코드예요.",
                "Computers only know numbers, not letters. So 'A' = 65, 'B' = 66, ... that's the ASCII code agreement.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-pink-200 mb-3">
              <p className="text-xs font-bold text-pink-700 mb-2">{t("외울 필요는 없어요. 그냥 이 3 가지만 기억:", "No need to memorize. Just remember these 3 ranges:")}</p>
              <div className="space-y-1 text-sm font-mono">
                <div className="flex justify-between"><span className="font-bold">A-Z</span><span className="text-pink-700">65 ~ 90</span></div>
                <div className="flex justify-between"><span className="font-bold">a-z</span><span className="text-pink-700">97 ~ 122</span></div>
                <div className="flex justify-between"><span className="font-bold">0-9</span><span className="text-pink-700">48 ~ 57</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {t("→ 대문자랑 소문자는 정확히 32 차이! ('A' + 32 = 'a')", "→ Upper and lower differ by exactly 32! ('A' + 32 = 'a')")}
              </p>
            </div>
            <p className="text-xs text-pink-700 text-center">
              {t("다음 슬라이드에서 직접 변환해 봐요 →", "Try the conversion next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("문자 ↔ 숫자 변환기", "Char ↔ Number converter")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("글자 하나 입력 → ASCII 코드. 입력 바꿔보면서 숫자 어떻게 변하는지!", "Type one char → see ASCII code. Try different chars!")}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <input value={charInput} onChange={e => setCharInput(e.target.value.slice(0, 1))} maxLength={1}
                className="w-16 h-16 text-center text-3xl font-mono font-black border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500" />
              <span className="text-2xl text-gray-400">→</span>
              <div className="w-20 h-16 flex items-center justify-center bg-emerald-50 border-2 border-emerald-300 rounded-lg font-mono text-2xl font-black text-emerald-700">
                {code}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button onClick={() => setCharInput("A")} className="py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">'A' → 65</button>
              <button onClick={() => setCharInput("a")} className="py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">'a' → 97</button>
              <button onClick={() => setCharInput("0")} className="py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">'0' → 48</button>
            </div>
            <p className="text-xs text-amber-700 text-center font-bold leading-relaxed">
              {t(
                "💡 'C' - 'A' = 2 → 알파벳 카운팅의 핵심! C 는 A 로부터 2 칸.",
                "💡 'C' - 'A' = 2 → key trick for alphabet counting! C is 2 slots from A.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("알파벳 카운팅 — 진짜 자주 나옴!", "Alphabet counting — super common!")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("문자열에서 각 알파벳 몇 번 나오는지 세는 패턴. ord(c) - ord('a') 가 인덱스가 돼요.", "Pattern: count each letter's occurrences. ord(c) - ord('a') becomes the index.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 'apple' 에서 알파벳 빈도수 세기
s = "apple"
count = [0] * 26   # a-z = 26 칸

for c in s:
    idx = ord(c) - ord('a')   # 'a'→0, 'b'→1, ...
    count[idx] += 1

# count[0]=1 ('a'), count[15]=2 ('p'), ...

# 문자 ↔ 숫자
ord('A')   # 65
chr(65)    # 'A'
ord('a') - ord('A')   # 32`}
              cpp={`// 'apple' 에서 알파벳 빈도수 세기
#include <string>
string s = "apple";
int count[26] = {0};

for (char c : s) {
    int idx = c - 'a';   // 'a'→0, 'b'→1, ...
    count[idx]++;
}

// count[0]=1 ('a'), count[15]=2 ('p'), ...

// 문자 ↔ 숫자 — C++ 는 캐스팅
int code = (int)'A';     // 65
char ch  = (char)65;     // 'A'
'a' - 'A';               // 32`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("이 패턴 하나로 BOJ 10809, 1157 같은 알파벳 문제 다 풀려요.", "This one pattern solves BOJ 10809, 1157 and many alphabet problems.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("Python: ord('e') - ord('a') 의 값은? ('a' 부터 'e' 까지 몇 칸?)", "Python: ord('e') - ord('a')? (how far is 'e' from 'a'?)")
              : t("C++: 'e' - 'a' 의 값은? ('a' 부터 'e' 까지 몇 칸?)", "C++: 'e' - 'a'? (how far is 'e' from 'a'?)")
            }
            options={["1", "4", "5", "97"]}
            answerIdx={1}
            hint={t("a=0, b=1, c=2, d=3, e=4. ord('a')=97, ord('e')=101 → 차이 4.", "a=0, b=1, c=2, d=3, e=4. ord('a')=97, ord('e')=101 → diff 4.")}
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

// ── Chapter 5: 정리 + 실전 ──────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎉</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("문자열 챕터 다 봤어요!", "Finished all string chapters!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "잘 했어요 👏 글자 한 개를 '인덱스로 꺼내고', '메서드로 다듬고', 'ASCII 로 숫자 변환' — 이 3 가지면 Bronze 문자열 문제는 거의 다 풀려요. 핵심만 한 번 더 짚고 갈게요.",
                "Great work 👏 Index out one char, polish with methods, convert via ASCII — these 3 cover almost any Bronze string problem. Let me recap the essentials.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("문자열 = 글자 배열. 인덱스는 0 부터.", "String = array of chars. Indices start at 0.")}</li>
              <li><b>2.</b> {t("길이", "Length")}: Python <code className="bg-white px-1.5 py-0.5 rounded">len(s)</code>, C++ <code className="bg-white px-1.5 py-0.5 rounded">s.size()</code></li>
              <li><b>3.</b> {t("부분", "Slice")}: Python <code className="bg-white px-1.5 py-0.5 rounded">s[a:b]</code> (끝 미포함), C++ <code className="bg-white px-1.5 py-0.5 rounded">s.substr(a, len)</code> (길이!)</li>
              <li><b>4.</b> {t("자주 쓰는 메서드", "Common methods")}: <code className="bg-white px-1.5 py-0.5 rounded">upper, lower, find, replace, split</code></li>
              <li><b>5.</b> {t("ASCII", "ASCII")}: <code className="bg-white px-1.5 py-0.5 rounded">ord/chr</code> (Py), {t("캐스팅", "cast")} (C++). A=65, a=97, 0=48</li>
              <li><b>6.</b> {t("알파벳 카운팅 → count[26], 인덱스 = c - 'a'", "Alphabet counting → count[26], index = c - 'a'")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이거면 Bronze 문자열 문제 80% 는 풀어요!", "That's enough for ~80% of Bronze string problems!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("이제 실전 문제 — 직접 풀어 보기!", "Now real problems — try it!")}</p>
              <p className="text-xs text-gray-700 mb-3">
                {t("백준 (BOJ) 문자열 입문 문제 3 개. 쉬운 것부터 →", "3 BOJ string starter problems — easy first →")}
              </p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/11720" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 11720</b> — {t("숫자의 합 (각 글자 → 숫자)", "Sum of digits (each char → number)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10809" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10809</b> — {t("알파벳 찾기 (count[26] 패턴)", "Find alphabet (count[26] pattern)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2675" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2675</b> — {t("문자열 반복 (각 글자 R 번)", "String repeat (each char R times)")} ↗
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              {t("👇 아래 '문자열 마스터' 누르면 끝!", "👇 Hit 'String Master' to finish!")}
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
              ? <>🎉 {t("문자열 마스터!", "String Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function StringPage() {
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
        // stale mastered 플래그 방지: 실제 챕터가 다 완료된 경우에만
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
          user_id: user.id, lesson_id: "algo-string", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-string")) {
          arr.push("algo-string")
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
          <button onClick={() => router.push("/algo")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="w-4 h-4" /> {t("알고리즘 토픽", "Algorithm Topics")}
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🔤</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("문자열", "Strings")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>


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
            {/* 🎯 목적지 칩 */}
            <span className="text-gray-300 text-xs px-0.5">→</span>
            {isMastered ? (
              <Link href="/coding-bank?category=string"
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
              <span>💡 {t("5 챕터 다 끝나면 문자열 연습 문제로 안내해 줄게요!", "Finish all 5 chapters and I'll guide you to string practice problems!")}</span>
              <button onClick={() => setShowDestinationTip(false)} className="text-amber-600 hover:text-amber-800 font-bold ml-2">✕</button>
            </div>
          )}

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
                  {/* inline 언어 토글 */}
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
              <h3 className="text-xl font-black text-emerald-900">{t("문자열 마스터!", "String Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            {/* 📝 코딩 뱅크 */}
            <div className="bg-white rounded-xl border-2 border-emerald-200 p-4 mb-3">
              <p className="text-sm font-black text-emerald-900 mb-2">📝 {t("코드린 안에서 풀기", "Practice inside Coderin")}</p>
              <Link href="/coding-bank?category=string" className="block px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm text-center transition-all active:scale-95">
                💪 {t("코딩 뱅크 — 문자열 활용 문제", "Coding Bank — String Problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                {t("'문자열' 카테고리 필터 골라서 풀어 보세요", "Filter by 'String' category")}
              </p>
            </div>

            {/* 🌐 백준 외부 */}
            <div className="bg-white rounded-xl border-2 border-amber-200 p-4 mb-3">
              <p className="text-sm font-black text-amber-900 mb-2">🌐 {t("백준 (BOJ) 외부 연습", "BOJ external practice")}</p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/11720" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 11720</b> — {t("숫자의 합", "Sum of digits")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10809" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10809</b> — {t("알파벳 찾기", "Find alphabet")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2675" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2675</b> — {t("문자열 반복", "String repeat")} ↗
                </a>
              </div>
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
