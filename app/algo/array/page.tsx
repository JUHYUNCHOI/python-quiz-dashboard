"use client"

/**
 * 배열 (Array) — 챕터식 학습 페이지 v1.
 *
 * Bronze 학생용 — 배열 기초 (인덱싱/순회/누적). 정렬/검색은 별도 토픽.
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
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🤔", title: "왜 배열?",          titleEn: "Why Array?",          mins: 3 },
  { id: 2, emoji: "📦", title: "만들기 + 인덱싱",   titleEn: "Create & Index",      mins: 5 },
  { id: 3, emoji: "🔁", title: "순회 (for + 누적)", titleEn: "Traversal (for + accumulate)", mins: 6 },
  { id: 4, emoji: "⚠️", title: "흔한 실수 + 경계",   titleEn: "Common Bugs & Edges", mins: 5 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",        titleEn: "Recap & Practice",    mins: 4 },
]

const STORAGE_KEY = "algo-array-chapter"

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

// ── Chapter 1: 왜 배열? — 복습 + 알고리즘 관점 전환 ──────────────
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
              {t("오랜만이에요 — 배열, 이미 알죠?", "Welcome back — you already know arrays")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {codeLang === "py"
                ? t(
                    "수업에서 Python 리스트는 이미 배웠어요 — [10, 20, 30] 만들고, arr[0] 으로 꺼내고, for 로 돌리고. 다 익숙하죠.",
                    "You've already learned Python lists in class — make [10, 20, 30], grab arr[0], loop with for. All familiar.",
                  )
                : t(
                    "수업에서 C++ vector 는 이미 배웠어요 — vector<int> arr = {10, 20, 30} 만들고, arr[0] 으로 꺼내고, for 로 돌리고. 다 익숙하죠.",
                    "You've already learned C++ vector in class — make vector<int> arr = {10, 20, 30}, grab arr[0], loop with for. All familiar.",
                  )
              }
            </p>
            <div className="bg-white rounded-lg p-3 border border-amber-200 my-3">
              <p className="text-xs text-amber-700 font-bold mb-2">📌 {t("여기서는 — 알고리즘 관점", "Here — algorithm perspective")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "문법은 안 다시 해요. 대신 'USACO 같은 문제에서 배열을 어떻게 활용하는지' — 패턴과 함정을 봐요.",
                  "No syntax rehash. Instead — 'how do problem-solvers actually use arrays?' Patterns and pitfalls.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center mt-3">
              {t("60 초 짧게 정리하고 본격 시작 ↓", "60-second pivot then we dive in ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("배열이 알고리즘에서 그렇게 자주 나오는 이유", "Why arrays show up everywhere in algorithms")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "이유 하나 — ",
                "Reason one — ",
              )}<b className="text-blue-700">O(1) {t("인덱스 접근", "index access")}</b>{t(
                ". arr[37] 하면 길이가 10 이든 100 만이든 즉시 꺼내져요. 사물함에서 #37 칸 바로 여는 것처럼.",
                ". arr[37] fetches instantly whether the array has 10 or 1M items. Like walking straight to locker #37.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "이유 둘 — 메모리에 ",
                "Reason two — ",
              )}<b className="text-blue-700">{t("연속으로", "contiguous in memory")}</b>{t(
                " 붙어 있어서, for 로 쭉 돌릴 때 CPU 가 엄청 빨라요. '한 번에 N 개 다 본다' 가 부담 없어요.",
                ". CPU rips through them when you loop. 'Visit all N' costs almost nothing.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-blue-200 mt-3">
              <p className="text-xs text-blue-800 leading-relaxed">
                <b>{t("결론", "Bottom line")}:</b> {t(
                  "배열은 '값 N 개를 손에 쥐고 빠르게 굴리는 도구'. USACO Bronze 거의 모든 문제가 이 위에서 굴러가요.",
                  "Arrays = 'a way to hold N values and spin through them fast.' Almost every Bronze problem runs on this.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we'll cover in this topic")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩 깊게 봐요.", "Preview — we'll go deep on each from next chapter.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔁 1. {t("순회하며 누적", "Traverse + accumulate")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "합, 최댓값, 카운트 — 다 '변수 하나 두고 for 로 굴리며 갱신' 한 패턴.",
                    "Sum, max, count — all the same pattern: 'one variable + for loop, update as you go.'",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔀 2. {t("두 배열 같이 보기", "Two arrays side-by-side")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "같은 인덱스로 두 배열 동시에 보기 — 비교, 짝짓기, 차이 계산.",
                    "Walk two arrays at the same index — compare, pair, diff.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⚠️ 3. {t("경계 처리 (가장 자주 틀리는 곳)", "Edge handling (where bugs hide)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "off-by-one, 빈 배열, 범위 밖 인덱스 — Bronze 문제 부분 점수의 90% 가 여기서 새요.",
                    "Off-by-one, empty arrays, out-of-range — 90% of lost Bronze points leak from here.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("다음 챕터부터 본격 시작! →", "Next chapter — let's dive in! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 만들기 + 인덱싱 ───────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [arr] = useState([10, 20, 30, 40, 50])
  const [idxInput, setIdxInput] = useState("2")
  const [pickedMsg, setPickedMsg] = useState<string | null>(null)
  const [quizPassed, setQuizPassed] = useState(false)

  const handlePick = () => {
    const i = parseInt(idxInput, 10)
    if (isNaN(i) || i < 0 || i >= arr.length) {
      setPickedMsg(t(
        `유효한 인덱스는 0 ~ ${arr.length - 1} 사이예요!`,
        `Valid index is 0 ~ ${arr.length - 1}!`,
      ))
      return
    }
    setPickedMsg(t(
      `arr[${i}] = ${arr[i]} — 즉시 꺼냄! O(1)`,
      `arr[${i}] = ${arr[i]} — instant! O(1)`,
    ))
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📦</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("배열은 어떻게 만들어요?", "How do I make an array?")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "Python 도 C++ 도 — 한 줄로 끝나요. 대괄호 [ ] 안에 값 콤마로 쭉.",
                "Python and C++ — both one line. Put values in [ ] separated by commas.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-sm space-y-1 text-emerald-700 border border-emerald-200">
              <p>Python: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">arr = [10, 20, 30]</code></p>
              <p>C++: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">vector&lt;int&gt; arr = {`{10, 20, 30}`};</code></p>
            </div>
            <p className="text-xs text-emerald-700 mt-3 leading-relaxed">
              <b>{t("기억할 한 가지", "One thing to remember")}:</b> {t(
                "인덱스는 0 부터 시작해요. 첫 원소 = arr[0]. 두 번째 = arr[1]. 사람 셈하고 한 칸 차이!",
                "Indices start at 0. First item = arr[0]. Second = arr[1]. One off from human counting!",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 꺼내보세요", "Try indexing")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("아래 배열에서 인덱스를 입력하고 '꺼내기' 눌러봐요:", "Type an index and press 'Pick':")}
            </p>
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("배열", "Array")} — arr = [10, 20, 30, 40, 50]</p>
              <div className="flex gap-1 flex-wrap justify-center">
                {arr.map((v, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[10px] text-gray-400 font-mono">{i}</div>
                    <div className={cn(
                      "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      pickedMsg && idxInput === String(i) && i >= 0 && i < arr.length
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 scale-110"
                        : "bg-gray-100 border-gray-300 text-gray-700",
                    )}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center mb-3">
              <label className="text-xs font-bold text-gray-700">{t("인덱스:", "Index:")}</label>
              <input
                type="number"
                value={idxInput}
                onChange={(e) => setIdxInput(e.target.value)}
                min={0}
                max={arr.length - 1}
                className="w-16 px-2 py-1 border-2 border-gray-300 rounded-lg font-mono text-sm"
              />
              <button onClick={handlePick} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm">
                ⚡ {t("꺼내기", "Pick")}
              </button>
            </div>
            {pickedMsg && (
              <p className="text-xs text-emerald-700 text-center font-bold bg-emerald-50 rounded-lg p-2">
                {pickedMsg}
              </p>
            )}
            <p className="text-[11px] text-gray-500 text-center mt-2 italic">
              {t("팁: 0, 4 같은 끝값도 넣어보세요. 5 넣으면? (범위 밖!)", "Tip: try 0 or 4. What if you put 5? (out of range!)")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("코드로 보면 — 만들기 + 길이 + 접근", "In code — create + length + access")}</p>
              <p className="text-xs text-gray-700">
                {t("위에서 언어 토글 해보세요:", "Toggle the language above:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 만들기
scores = [88, 92, 75, 60, 100]

# 길이 (몇 개 있는지)
n = len(scores)           # 5

# 인덱스로 꺼내기 — 0 부터 시작!
print(scores[0])          # 88  (첫 번째)
print(scores[4])          # 100 (마지막)
print(scores[n - 1])      # 100 (마지막, 길이-1)

# 값 바꾸기
scores[2] = 80            # 75 → 80`}
              cpp={`#include <vector>
#include <iostream>
using namespace std;

// 만들기
vector<int> scores = {88, 92, 75, 60, 100};

// 길이
int n = scores.size();        // 5

// 인덱스로 꺼내기 — 0 부터!
cout << scores[0] << endl;    // 88
cout << scores[4] << endl;    // 100
cout << scores[n - 1] << endl;// 100

// 값 바꾸기
scores[2] = 80;`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {codeLang === "py"
                ? t(
                    "핵심: 첫 = arr[0], 마지막 = arr[len(arr) - 1]. 한 칸 차이만 잊지 말기!",
                    "Key: first = arr[0], last = arr[len(arr) - 1]. Just remember the off-by-one!",
                  )
                : t(
                    "핵심: 첫 = arr[0], 마지막 = arr[arr.size() - 1]. 한 칸 차이만 잊지 말기!",
                    "Key: first = arr[0], last = arr[arr.size() - 1]. Just remember the off-by-one!",
                  )
              }
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("Python: arr = [5, 8, 13, 21, 34] 일 때, arr[2] 는?", "Python: For arr = [5, 8, 13, 21, 34], what is arr[2]?")
              : t("C++: vector<int> arr = {5, 8, 13, 21, 34}; 일 때, arr[2] 는?", "C++: For vector<int> arr = {5, 8, 13, 21, 34};, arr[2]?")
            }
            options={["5", "8", "13", "21"]}
            answerIdx={2}
            hint={t("0부터 셈: arr[0]=5, arr[1]=8, arr[2]=?", "Count from 0: arr[0]=5, arr[1]=8, arr[2]=?")}
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

// ── Chapter 3: 순회 (for + 누적) ─────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  const demoArr = [4, 7, 2, 9, 5]
  const [traversedIdx, setTraversedIdx] = useState(-1)
  const [runningSum, setRunningSum] = useState(0)
  const [runningMax, setRunningMax] = useState<number | null>(null)
  const [mode, setMode] = useState<"sum" | "max">("sum")

  const stepOnce = () => {
    if (traversedIdx + 1 >= demoArr.length) return
    const next = traversedIdx + 1
    const v = demoArr[next]
    setTraversedIdx(next)
    if (mode === "sum") setRunningSum(s => s + v)
    else setRunningMax(m => m === null ? v : Math.max(m, v))
  }
  const reset = () => {
    setTraversedIdx(-1)
    setRunningSum(0)
    setRunningMax(null)
  }
  const switchMode = (m: "sum" | "max") => {
    setMode(m)
    reset()
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔁</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("배열 전체를 한 번씩 보고 싶을 때 — 순회", "Walking through every element — traversal")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "사물함 100 개를 다 열어보고 싶다고 해요. 1 번부터 100 번까지 한 번씩 — 이게 ",
                "Imagine opening all 100 lockers, one by one — we call this ",
              )}<b className="text-purple-700">{t("순회 (traversal)", "traversal")}</b>{t(
                ". 배열 문제의 기본이에요.",
                ". It's the fundamental array operation.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "방법: for 루프. 0 부터 길이-1 까지 인덱스를 하나씩 올리면서 arr[i] 를 봐요.",
                "How: for loop. Increment i from 0 to length-1, look at arr[i] each time.",
              )}
            </p>
            <p className="text-sm text-purple-700 leading-relaxed">
              {t(
                "순회하면서 변수에 '지금까지의 합' 같은 걸 추적해두면 합/최댓값/카운트 같은 답을 다 얻을 수 있어요.",
                "While traversing, track 'running sum' (or max, or count) in a variable to get sum/max/count answers.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("한 칸씩 순회해 보기", "Step through the array")}</p>
            <div className="flex gap-2 mb-3">
              <button onClick={() => switchMode("sum")}
                className={cn("flex-1 py-2 rounded-lg font-bold text-xs transition-all",
                  mode === "sum" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                Σ {t("합 구하기", "Sum")}
              </button>
              <button onClick={() => switchMode("max")}
                className={cn("flex-1 py-2 rounded-lg font-bold text-xs transition-all",
                  mode === "max" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                🥇 {t("최댓값 찾기", "Find max")}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-1">{t("배열", "Array")} — arr = [4, 7, 2, 9, 5]</p>
            <div className="flex gap-1 flex-wrap justify-center mb-3">
              {demoArr.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-[10px] text-gray-400 font-mono">{i}</div>
                  <div className={cn(
                    "w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                    i === traversedIdx && "bg-purple-200 border-purple-500 text-purple-800 scale-110",
                    i < traversedIdx && "bg-emerald-50 border-emerald-300 text-emerald-700",
                    i > traversedIdx && "bg-gray-100 border-gray-300 text-gray-500",
                  )}>{v}</div>
                </div>
              ))}
            </div>
            <div className="bg-purple-50 rounded-lg p-3 mb-3 text-center">
              {mode === "sum" ? (
                <p className="text-sm font-mono text-purple-800">
                  {t("지금까지 합", "Running sum")}: <b className="text-lg">{runningSum}</b>
                </p>
              ) : (
                <p className="text-sm font-mono text-purple-800">
                  {t("지금까지 최댓값", "Running max")}: <b className="text-lg">{runningMax === null ? "—" : runningMax}</b>
                </p>
              )}
              <p className="text-[11px] text-purple-600 mt-1">
                {traversedIdx === -1
                  ? t("아직 한 칸도 안 봄. ▶ 눌러 시작!", "Haven't started. ▶ to begin!")
                  : traversedIdx === demoArr.length - 1
                    ? t("끝! 전부 봤어요 ✅", "Done! Looked at all ✅")
                    : t(`방금 arr[${traversedIdx}] = ${demoArr[traversedIdx]} 봄`, `Just saw arr[${traversedIdx}] = ${demoArr[traversedIdx]}`)}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={stepOnce}
                disabled={traversedIdx + 1 >= demoArr.length}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 칸", "Next cell")}
              </button>
              <button onClick={reset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 합, 최댓값, 카운트", "Code — sum, max, count")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("세 가지 다 똑같이 생겼어요. for 안에 변수 하나 추적만 다름.", "All three look the same. Only what you track inside the for differs.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`arr = [4, 7, 2, 9, 5]

# 1) 합
total = 0
for x in arr:
    total += x          # 누적
print(total)            # 27

# 2) 최댓값
biggest = arr[0]        # 첫 값으로 시작
for x in arr:
    if x > biggest:
        biggest = x
print(biggest)          # 9

# 3) 5 이상인 거 몇 개?
cnt = 0
for x in arr:
    if x >= 5:
        cnt += 1
print(cnt)              # 3`}
              cpp={`vector<int> arr = {4, 7, 2, 9, 5};

// 1) 합
int total = 0;
for (int x : arr) {
    total += x;
}
cout << total << endl;     // 27

// 2) 최댓값
int biggest = arr[0];
for (int x : arr) {
    if (x > biggest) biggest = x;
}
cout << biggest << endl;   // 9

// 3) 5 이상인 거 몇 개?
int cnt = 0;
for (int x : arr) {
    if (x >= 5) cnt++;
}
cout << cnt << endl;       // 3`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "패턴: 변수 초기화 → for 로 한 번씩 → 조건 보고 변수 갱신. 익숙해질 거예요!",
                "Pattern: init var → walk once → check & update. You'll get used to it!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("arr = [3, 1, 4, 1, 5] 를 for 로 순회하면서 합을 구해요. 결과는?", "Walk through arr = [3, 1, 4, 1, 5] and compute sum. Result?")}
            options={["10", "14", "12", "5"]}
            answerIdx={1}
            hint={t("3 + 1 + 4 + 1 + 5 = ?", "3 + 1 + 4 + 1 + 5 = ?")}
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

// ── Chapter 4: 흔한 실수 + 경계 ──────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚠️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("배열에서 가장 흔한 실수 3 가지", "The 3 most common array bugs")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "USACO 문제에서 '거의 다 됐는데 한 케이스 틀려요' 하는 경우 — 거의 다 이 셋 중 하나예요. 미리 알아두면 디버그 시간 확 줄어요.",
                "When a USACO solution fails just one case — almost always one of these three. Knowing them saves debug time.",
              )}
            </p>
            <ol className="space-y-2 text-sm text-gray-800 list-decimal pl-5">
              <li><b>{t("off-by-one (한 칸 차이)", "Off-by-one")}</b> — {codeLang === "py" ? "arr[len(arr)]" : "arr[arr.size()]"} {t("로 접근하면 에러", "is out of range")}</li>
              <li><b>{t("빈 배열 처리 안 함", "Empty array")}</b> — arr[0] {t("이 없을 수도", "may not exist")}</li>
              <li><b>{t("음수/너무 큰 인덱스", "Negative / too-large index")}</b></li>
            </ol>
            <p className="text-sm text-red-700 font-bold text-center mt-4">
              {t("다음 슬라이드에서 하나씩 봐요 →", "Let's see each on the next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-red-200 p-4">
            <p className="text-base font-black text-red-900 mb-3">🚧 {t("off-by-one — 가장 흔한 한 칸 실수", "Off-by-one — the classic one-step bug")}</p>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {t(
                "사물함 5 개라면 — 0, 1, 2, 3, 4 번. 5 번은 없어요. 그런데 사람은 자꾸 5 번 찾으려고 해요 😅",
                "5 lockers → numbered 0, 1, 2, 3, 4. There is no #5. But people keep trying to access #5 😅",
              )}
            </p>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-3">
              <p className="text-xs font-bold text-red-700 mb-1">❌ {t("자주 보는 버그", "Common bug")}</p>
              <pre className="text-xs font-mono text-gray-800 leading-relaxed whitespace-pre-wrap">{codeLang === "py"
                ? `arr = [10, 20, 30, 40, 50]
print(arr[5])   # 💥 IndexError!
                # 길이=5 → 마지막은 arr[4]`
                : `vector<int> arr = {10, 20, 30, 40, 50};
cout << arr[5];   // 💥 out_of_range (또는 UB!)
                  // size=5 → 마지막은 arr[4]`
              }</pre>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <p className="text-xs font-bold text-green-700 mb-1">✅ {t("올바른 마지막 원소 접근", "Correct way to access last")}</p>
              <pre className="text-xs font-mono text-gray-800 leading-relaxed whitespace-pre-wrap">{codeLang === "py"
                ? `print(arr[len(arr) - 1])   # 50
# Python 한정 — 음수 인덱스도 OK
print(arr[-1])             # 50`
                : `cout << arr[arr.size() - 1];   // 50
// C++ — back() 도 가능
cout << arr.back();           // 50`
              }</pre>
            </div>
            <p className="text-xs text-amber-700 mt-3 text-center font-bold">
              {t("규칙: 마지막 인덱스 = 길이 - 1. 외우기!", "Rule: last index = length - 1. Memorize!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">🪤 {t("두 번째 함정 — 빈 배열", "Trap #2 — empty array")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "USACO 문제는 'N = 0 일 수도 있다' 가 자주 나와요. 빈 배열에서 arr[0] 하면 끝!",
                  "USACO problems often say 'N could be 0'. arr[0] on empty array = boom.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# ❌ 최댓값 — N=0 이면 터짐
biggest = arr[0]            # IndexError when arr=[]
for x in arr:
    if x > biggest: biggest = x

# ✅ 미리 체크 + 안전한 초기값
if len(arr) == 0:
    print("배열이 비어있음")
else:
    biggest = arr[0]
    for x in arr:
        if x > biggest: biggest = x
    print(biggest)`}
              cpp={`// ❌ N=0 이면 arr[0] 이 정의 안 됨 (UB)
int biggest = arr[0];
for (int x : arr) if (x > biggest) biggest = x;

// ✅ 미리 체크
if (arr.empty()) {
    cout << "배열이 비어있음";
} else {
    int biggest = arr[0];
    for (int x : arr) if (x > biggest) biggest = x;
    cout << biggest;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크 한 줄로 끝. 'N 이 0 일 수 있는가?' 항상 물어봐요.",
                "One check line, done. Always ask: 'Can N be 0?'",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("arr = [7, 4, 9, 2] 일 때, 마지막 원소를 안전하게 꺼내려면?", "For arr = [7, 4, 9, 2], how do you safely get the last element?")}
            options={codeLang === "py"
              ? ["arr[4]", "arr[len(arr)]", "arr[len(arr) - 1]", "arr[5]"]
              : ["arr[4]", "arr[arr.size()]", "arr[arr.size() - 1]", "arr.back_value()"]
            }
            answerIdx={2}
            hint={t("길이가 4 → 인덱스는 0, 1, 2, 3 까지만. 마지막 = 길이 - 1.", "Length 4 → valid indices 0, 1, 2, 3. Last = length - 1.")}
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
function Chapter5({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
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
              {t("우와, 배열 끝까지 다 봤어요!", "Wow, you finished all 5 chapters!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요 👏 이제 USACO Bronze 문제에서 배열이 나와도 — 인덱스, 순회, 경계 — 머리 속에 그림이 그려질 거예요. 핵심 한 번만 더 짚고 가요.",
                "Really nice work 👏 You'll see arrays in USACO Bronze and visualize indices/traversal/edges instantly. Let me wrap the key points.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("배열 = 같은 종류 값을 한 줄에 묶어두는 통", "Array = a row bundling same-kind values")}</li>
              <li><b>2.</b> {t("인덱스는 ", "Indices start at ")}<b>0</b>{t(" 부터 — 마지막 = ", " — last = ")}<code className="bg-white px-1 rounded">{codeLang === "py" ? "len(arr) - 1" : "arr.size() - 1"}</code></li>
              <li><b>3.</b> {t("번호로 바로 접근 = ", "Lookup by index = ")}<b>O(1)</b> {t("(엄청 빠름)", "(super fast)")}</li>
              <li><b>4.</b> {t("순회 = ", "Traversal = ")}<code className="bg-white px-1 rounded">{codeLang === "py" ? "for x in arr" : "for (auto x : arr)"}</code></li>
              <li><b>5.</b> {t("합/최댓값/카운트 = 변수 하나 추적하며 순회", "Sum/max/count = track one variable while looping")}</li>
              <li><b>6.</b> {t("항상 확인: N=0? 마지막 인덱스? off-by-one?", "Always check: N=0? last index? off-by-one?")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 6 개만 머리에 박혀 있으면 Bronze 배열 문제 거의 다 풀어요!", "These 6 cover most Bronze array problems!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("이제 실전 문제 — 직접 풀어 보기!", "Now real problems — try it!")}</p>
              <p className="text-xs text-gray-700 mb-3">
                {t("백준 (BOJ) 에서 배열 기초 문제 3 개 추천. 쉬운 거부터 →", "Recommended BOJ array problems — easy first →")}
              </p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/10818" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10818</b> — {t("최소, 최대 (순회하며 추적)", "Min/Max (track while looping)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2562" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2562</b> — {t("최댓값과 그 위치 (인덱스 같이)", "Max and its position (index too)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10871" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10871</b> — {t("X보다 작은 수 (조건 필터링)", "Numbers less than X (filter)")} ↗
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              {t("👇 아래 '배열 마스터' 누르면 끝! 다음 토픽으로 가요.", "👇 Hit 'Array Master' to finish! Onwards.")}
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
              ? <>🎉 {t("배열 마스터!", "Array Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function ArrayPage() {
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
          user_id: user.id, lesson_id: "algo-array", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-array")) {
          arr.push("algo-array")
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
            <span className="text-3xl">📊</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("배열", "Array")}</h1>
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
            {/* 🎯 목적지 칩 — 학생이 어디로 가는지 1 챕터부터 보임 */}
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
              <span>💡 {t("5 챕터 다 끝나면 배열 연습 문제로 안내해 줄게요!", "Finish all 5 chapters and I'll guide you to array practice problems!")}</span>
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
              <h3 className="text-xl font-black text-emerald-900">{t("배열 마스터!", "Array Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            {/* 📝 연습 문제 — in-app */}
            <div className="bg-white rounded-xl border-2 border-emerald-200 p-4 mb-3">
              <p className="text-sm font-black text-emerald-900 mb-2">📝 {t("코드린 안에서 풀기", "Practice inside Coderin")}</p>
              <Link href="/coding-bank" className="block px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm text-center transition-all active:scale-95">
                💪 {t("코딩 뱅크 — 배열 활용 문제", "Coding Bank — Array Problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                {t("'배열' 카테고리 필터 골라서 풀어 보세요", "Filter by 'Array' category")}
              </p>
            </div>

            {/* 🌐 백준 외부 문제 */}
            <div className="bg-white rounded-xl border-2 border-amber-200 p-4 mb-3">
              <p className="text-sm font-black text-amber-900 mb-2">🌐 {t("백준 (BOJ) 외부 연습", "BOJ external practice")}</p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/10818" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10818</b> — {t("최소, 최대", "Min and Max")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/2562" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 2562</b> — {t("최댓값과 그 위치", "Max and its position")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10871" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10871</b> — {t("X보다 작은 수", "Numbers less than X")} ↗
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
