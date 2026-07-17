"use client"

/**
 * 정렬 (Sorting) — 챕터식 학습 페이지 v1.
 *
 * 기존 vanilla JS 2965줄 한 페이지 → 5 챕터 React 구조.
 * Bronze 학생에 필수인 것만: sorted() 사용법, 복잡도 직관, 커스텀 key.
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
  { id: 1, emoji: "🤔", title: "왜 정렬?",        titleEn: "Why Sort?",          mins: 3 },
  { id: 2, emoji: "🎯", title: "sort() 한 줄",    titleEn: "sort() in One Line", mins: 5 },
  { id: 3, emoji: "⚡", title: "시간복잡도",      titleEn: "Time Complexity",    mins: 6 },
  { id: 4, emoji: "🔧", title: "커스텀 정렬 (key)", titleEn: "Custom Sort (key)",  mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",      titleEn: "Recap & Practice",    mins: 5 },
]

const STORAGE_KEY = "algo-sorting-chapter"

type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 ───────────────────────────────────────────
// 한 챕터 안에 여러 슬라이드. step 변경 시 카드로 직접 스크롤.
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

// 슬라이드 진도 점 + 이전/다음 버튼 (공통)
// 진도 점: 카드 안에 표시. 이전/다음 버튼: viewport 하단에 fixed.
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
      {/* 이전/다음 — viewport 하단 fixed. BottomNav 위 zoom 안 보이게 z-50 */}
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

// ── Chapter 1: 왜 정렬? — 슬라이드 식 ───────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      {/* 카드 — step 별 1 개씩 (친절한 튜터 톤) */}
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">👋</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("안녕! 만나서 반가워요 😊", "Hi! Nice to meet you 😊")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "오늘 같이 배울 거는 — 정렬 (sorting) 이에요.",
                "Today we're learning — sorting.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "들어본 적 있어요? '가나다 순', '키 작은 순', '나이 많은 순'... 일상에서 늘 쓰는 거예요. 컴퓨터한테 이걸 시키는 방법, 그게 정렬이에요.",
                "Heard of it? Sorting things alphabetically, by height, by age... we do it daily. Now we'll teach computers to do it.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "걱정 마요 — 진짜 한 줄로 끝나는 것부터 시작할 거니까. 어렵지 않아요.",
                "Don't worry — we start with literally one line of code. It's not hard.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t(
                "준비됐어요? 아래 '다음' 눌러 가요 ↓",
                "Ready? Hit 'Next' below ↓",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-sm text-gray-700 mb-2">
              {t("짧은 이야기로 시작해볼게요 —", "Let's start with a quick story —")}
            </p>
            <p className="text-base font-black text-gray-900 mb-4">
              🏛 {t("도서관에서 책 한 권 찾기", "Finding one book in a library")}
            </p>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {t(
                "상상해 봐요. 도서관에 책이 100,000 권 있어요. 그 중 '해리포터' 한 권을 찾아야 해요. 자, 두 가지 도서관이 있다고 해요:",
                "Imagine: 100,000 books in a library. You need to find 'Harry Potter'. Two libraries exist:",
              )}
            </p>
            <div className="space-y-3 mt-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm font-black text-red-700 mb-1">📚🌀 {t("도서관 A — 책이 마구잡이", "Library A — random order")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "어떻게 찾을까? 한 권씩 다 봐야겠죠... 운 나쁘면 10만 번 확인해요. 졸업할 때까지 못 찾을 수도? 😅",
                    "How? One by one... worst case 100,000 checks. You might not find it before graduating 😅",
                  )}
                </p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                <p className="text-sm font-black text-green-700 mb-1">📖 {t("도서관 B — 알파벳 순으로 정리됨", "Library B — alphabetically sorted")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "'해리포터'는 H 로 시작! 중간 펼쳐서 'M' 보이면 → H 는 앞쪽이지! 다시 절반 줄이고... 17 번이면 끝나요. ⚡",
                    "'Harry' starts with H! Open middle → see 'M' → H is earlier! Halve again... 17 checks done. ⚡",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm text-amber-800 font-bold text-center mt-4">
              {t(
                "같은 책인데 6,000 배 차이! 😲",
                "Same books — 6,000× faster! 😲",
              )}
            </p>
            <p className="text-xs text-gray-600 text-center mt-2 leading-relaxed">
              {t(
                "→ 정렬은 '나중에 찾기 쉽게' 미리 정리해두는 도구예요.",
                "→ Sorting = pre-organize so future lookups are easy.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">✨</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그래서 정렬을 왜 배우냐면 —", "So why learn sorting? Because —")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "한 번 정렬해두면 이런 게 갑자기 다 쉬워져요:",
                "Once sorted, all of this suddenly becomes easy:",
              )}
            </p>
            <div className="space-y-1.5 text-sm text-gray-800 mb-4">
              <p>🔍 <b>{t("무언가 찾기", "Finding something")}</b> — {t("이분 탐색으로 100만 개에서 20 번만", "binary search: 20 checks among 1M")}</p>
              <p>🥇 <b>{t("최댓값/최솟값", "Max/min")}</b> — {t("정렬된 배열의 첫/마지막 = 답", "first/last of sorted array = answer")}</p>
              <p>👯 <b>{t("중복 처리", "Dedup")}</b> — {t("같은 값들이 옆에 모임", "duplicates land next to each other")}</p>
              <p>🎒 <b>{t("같은 종류 묶기", "Grouping")}</b> — {t("학년별 학생 묶기 등", "e.g. students by grade")}</p>
              <p>💡 <b>{t("'작은 거 먼저' 전략", "Greedy 'smallest first'")}</b></p>
            </div>
            <p className="text-xs text-blue-700 text-center font-bold leading-relaxed">
              {t(
                "USACO Bronze 문제 거의 다 어딘가에서 정렬을 한 번씩 써요. 그래서 진짜 기초 도구.",
                "Almost all USACO Bronze problems use sorting somewhere. That's why it's foundational.",
              )}
            </p>
            <p className="text-sm font-bold text-blue-800 text-center mt-4">
              {t(
                "자, 다음 챕터에서 직접 정렬해 볼까요? 진짜 한 줄로 끝나요 →",
                "Now let's actually sort? Really takes one line →",
              )}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: sort() 한 줄 — 슬라이드식 ─────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? 3 : 0)
  const totalSteps = 4
  const [arr] = useState([3, 1, 4, 1, 5, 9, 2, 6])
  const [sorted, setSorted] = useState<number[] | null>(null)
  const [quizPassed, setQuizPassed] = useState(false)
  const handleSort = () => setSorted([...arr].sort((a, b) => a - b))
  const handleSortDesc = () => setSorted([...arr].sort((a, b) => b - a))
  const handleReset = () => setSorted(null)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <span className="block mx-auto w-fit text-[11px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-full px-2.5 py-0.5 mb-3">
              ⏱ {t("이미 배웠죠 — 30초 복습", "Already covered — 30-sec recap")}
            </span>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("정렬 한 줄, 기억나죠?", "The one-line sort — remember?")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "Python 도 C++ 도 정렬은 라이브러리 한 줄이에요. 직접 짜는 거 아니에요. 빠르게 짚고 넘어가요.",
                "In Python and C++, sorting is one library line — you don't write it yourself. Quick refresher.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-sm space-y-1 text-emerald-700 border border-emerald-200">
              {codeLang === "py" ? (
                <p>Python: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">arr.sort()</code></p>
              ) : (
                <p>C++: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">sort(arr.begin(), arr.end())</code></p>
              )}
            </div>
            <p className="text-xs text-emerald-700 mt-3 text-center">
              {t("그게 끝! 다음 슬라이드에서 진짜 정렬되는 거 봐요 →", "That's it! See it sort on the next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 눌러보세요", "Click to try")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("아래 배열을 직접 정렬해 봐요. 원래 모습은 위, 정렬 후는 아래.", "Sort the array below. Original on top, sorted below.")}
            </p>
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("원본 배열", "Original")}</p>
              <div className="flex gap-1 flex-wrap">
                {arr.map((v, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-gray-700">{v}</div>
                ))}
              </div>
            </div>
            {sorted ? (
              <div className="mb-3">
                <p className="text-[11px] text-emerald-600 mb-1 font-bold">✨ {t("정렬 후", "Sorted")}</p>
                <div className="flex gap-1 flex-wrap">
                  {sorted.map((v, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center font-mono font-bold text-emerald-700">{v}</div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 text-center my-4">↓ {t("아래 버튼 눌러 정렬해 보세요", "Press a button below to sort")}</p>
            )}
            <div className="flex gap-2">
              <button onClick={handleSort} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm">↑ {t("오름차순", "Ascending")}</button>
              <button onClick={handleSortDesc} className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm">↓ {t("내림차순", "Descending")}</button>
              {sorted && <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺ {t("리셋", "Reset")}</button>}
            </div>
            {sorted && (
              <p className="text-xs text-emerald-700 text-center mt-3 font-bold">
                {t("✨ 한 줄로 정렬 끝! 진짜 빠르고 쉬워요.", "✨ One line — done! Really fast and easy.")}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("실제 코드는 이렇게 생겼어요", "Here's the actual code")}</p>
              <p className="text-xs text-gray-700">
                {t("Python / C++ 둘 다 비슷한 모양. 위에서 언어 토글 해보세요:", "Python / C++ look similar. Toggle above:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`arr = [3, 1, 4, 1, 5, 9, 2, 6]

# 오름차순 (기본값)
arr.sort()
# 이제 arr = [1, 1, 2, 3, 4, 5, 6, 9]

# 내림차순 — 옵션 하나만 추가
arr.sort(reverse=True)

# 원본 안 바꾸고 새 리스트 만들기
new_arr = sorted(arr)   # arr 는 그대로`, `arr = [3, 1, 4, 1, 5, 9, 2, 6]

# ascending (default)
arr.sort()
# now arr = [1, 1, 2, 3, 4, 5, 6, 9]

# descending — just add one option
arr.sort(reverse=True)

# make a new list, keep the original
new_arr = sorted(arr)   # arr stays unchanged`)}
              cpp={t(`#include <algorithm>
#include <vector>
using namespace std;

vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 오름차순 (기본)
sort(arr.begin(), arr.end());

// 내림차순 — greater 비교자 추가
sort(arr.begin(), arr.end(), greater<int>());`, `#include <algorithm>
#include <vector>
using namespace std;

vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};

// ascending (default)
sort(arr.begin(), arr.end());

// descending — add the greater comparator
sort(arr.begin(), arr.end(), greater<int>());`)}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("어렵지 않죠? 다음 슬라이드에서 짧은 퀴즈로 확인해봐요 →", "Easy, right? Quick quiz on the next slide →")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("arr = [5, 2, 8, 1] 에 arr.sort() 부른 뒤, 첫 원소는?", "Python: After arr.sort() on [5, 2, 8, 1], first element?")
              : t("vector<int> arr = {5, 2, 8, 1}; 에 sort(arr.begin(), arr.end()) 부른 뒤, arr[0] 은?", "C++: After sort(arr.begin(), arr.end()) on {5, 2, 8, 1}, arr[0]?")
            }
            options={["1", "2", "5", "8"]}
            answerIdx={0}
            hint={t("기본 정렬은 오름차순 — 가장 작은 게 맨 앞으로", "Default = ascending → smallest first")}
            onCorrect={() => setQuizPassed(true)}
          />
        )}
      </div>

      {/* step 3 (마지막) 은 퀴즈 통과해야만 '다음' 활성화 */}
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

// ── Chapter 3: 시간복잡도 ────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그런데... 정렬이 왜 빠를까요?", "But... why is sort fast?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "라이브러리 sort 는 ", "Library sort is ",
              )}<b className="text-purple-700">O(N log N)</b>{t(
                " 라는 속도예요. 어려운 말 같지만 그냥 '엄청 빠르다' 라고 기억하면 돼요.",
                ". Sounds fancy, but just remember: 'really fast'.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "직접 정렬을 만들면 보통 O(N²) — 데이터 N 만 개 정도까지는 OK, 100 만 개 넘으면 시간초과예요.",
                "If you write sort yourself, usually O(N²) — fine up to ~10K items, dies past 1M.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-black text-purple-800 mb-1">
                🪓 {t("왜 'log N' 이 끼어들까? — 절반씩 나누기", "Why does 'log N' show up? — halving")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "빠른 정렬들의 비밀은 '분할정복' 이에요: 배열을 절반으로, 또 절반으로 계속 쪼개요. 16 개 → 8 → 4 → 2 → 1, 단 4 번이면 끝. 8 개는 3 번, 1024 개도 10 번. '절반씩 줄이는 횟수' 가 바로 log N 이에요. 그래서 N 개를 다루는 데 N×(log N) 번이면 충분해요.",
                  "Fast sorts use 'divide & conquer': split the array in half, then half again. 16 → 8 → 4 → 2 → 1 takes just 4 cuts; 8 takes 3; even 1024 takes 10. That 'number of halvings' IS log N — so handling N items costs N × (log N).",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "다음 슬라이드에서 두 속도가 얼마나 차이 나는지 표로 봐요.",
                "Next slide: a table showing the speed gap.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
            <p className="text-base font-black text-gray-900 mb-3">📊 {t("N 이 커질수록...", "As N grows...")}</p>
            <p className="text-xs text-gray-600 mb-3">
              {t("같은 일을 하는데 연산 횟수가 얼마나 차이 나는지 봐요:", "Number of operations for the same job:")}
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-1.5 font-bold text-gray-700">N</th>
                  <th className="text-right py-1.5 font-bold text-red-700">{t("직접 (N²)", "DIY (N²)")}</th>
                  <th className="text-right py-1.5 font-bold text-purple-700">{t("라이브러리 (N log N)", "Library (N log N)")}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b border-gray-100"><td className="py-1.5">100</td><td className="text-right text-gray-600">10,000</td><td className="text-right text-purple-700 font-bold">~700</td></tr>
                <tr className="border-b border-gray-100"><td className="py-1.5">10,000</td><td className="text-right text-amber-700">100,000,000</td><td className="text-right text-purple-700 font-bold">~130,000</td></tr>
                <tr className="border-b border-gray-100"><td className="py-1.5">1,000,000</td><td className="text-right text-red-600 font-bold">10¹² (TLE 🚫)</td><td className="text-right text-purple-700 font-bold">~20,000,000</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-purple-700 mt-3 text-center font-bold leading-relaxed">
              {t(
                "N=100 만 이어도 라이브러리 sort 는 0.02 초. 직접 짠 건 30 분. 차이 어마어마하죠?",
                "At N=1M, library sort = 0.02s. DIY sort = 30 min. Massive gap!",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">
                🎯 {t("기억할 한 가지", "One thing to remember")}
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">
                {t(
                  "USACO 문제 풀 때 — 절대 직접 정렬 알고리즘 짜지 말아요. 라이브러리 한 줄이면 끝나고, 비교도 안 되게 빨라요.",
                  "When solving USACO — never write your own sort. One library line is enough, and unbeatably fast.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`# ❌ 이렇게 직접 짜지 말아요 — 너무 느려요
def slow_sort(arr):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]

# ✅ 이렇게 — 한 줄
arr.sort()`, `# ❌ Don't write it yourself — way too slow
def slow_sort(arr):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]

# ✅ Do this — one line
arr.sort()`)}
              cpp={t(`// ❌ 이렇게 직접 짜지 말아요 — 너무 느려요
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (arr[i] > arr[j]) swap(arr[i], arr[j]);

// ✅ 이렇게 — 한 줄
sort(arr.begin(), arr.end());`, `// ❌ Don't write it yourself — way too slow
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (arr[i] > arr[j]) swap(arr[i], arr[j]);

// ✅ Do this — one line
sort(arr.begin(), arr.end());`)}
            />
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("N = 10⁵ 일 때 직접 짠 O(N²) 와 라이브러리 O(N log N) 의 차이는 대략?", "At N = 10⁵, how much slower is DIY O(N²) vs library?")}
            options={[
              t("거의 같음 — 차이 없음", "About the same"),
              t("100 배 정도", "~100× slower"),
              t("약 6,000 배 — 10¹⁰ vs 1.7×10⁶", "~6,000× — 10¹⁰ vs 1.7×10⁶"),
              t("10 배 정도", "~10× slower"),
            ]}
            answerIdx={2}
            hint={t("10⁵ × 10⁵ = 10¹⁰ vs 10⁵ × log(10⁵) ≈ 10⁵ × 17 = 1.7×10⁶", "10⁵ × 10⁵ = 10¹⁰ vs 10⁵ × log(10⁵) ≈ 1.7×10⁶")}
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

// ── Chapter 4: 커스텀 정렬 (key) ──────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const people = [
    { name: "Alice", age: 25 },
    { name: "Bob",   age: 30 },
    { name: "Carol", age: 22 },
  ]
  const [sortBy, setSortBy] = useState<"name" | "age">("name")
  const sorted = useMemo(() => [...people].sort((a, b) =>
    sortBy === "name" ? a.name.localeCompare(b.name) : a.age - b.age
  ), [sortBy])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔧</p>
            <span className="block mx-auto w-fit text-[11px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-full px-2.5 py-0.5 mb-3">
              ⏱ {t("이미 배웠죠 — 30초 복습", "Already covered — 30-sec recap")}
            </span>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("숫자말고 다른 걸로 정렬하려면?", "What if you want to sort by something else?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "숫자 말고 '기준' 을 정해서 정렬하는 법 — 이미 배웠어요. 빠르게 떠올려봐요:",
                "Sorting by a chosen 'key' instead of raw numbers — you've seen this. Quick recall:",
              )}
            </p>
            <ul className="space-y-1.5 text-sm text-gray-700 mb-3 pl-2">
              <li>👥 {codeLang === "py"
                ? t("학생 리스트를 '나이순' 으로 정렬", "Sort student list by age")
                : t("학생 vector 를 '나이순' 으로 정렬", "Sort student vector by age")}</li>
              <li>📍 {t("좌표를 'X축' 기준으로 정렬", "Sort coordinates by x-axis")}</li>
              <li>📝 {codeLang === "py"
                ? t("단어 리스트를 '길이순' 으로 정렬", "Sort word list by length")
                : t("단어 vector 를 '길이순' 으로 정렬", "Sort word vector by length")}</li>
            </ul>
            <p className="text-sm text-blue-700 font-bold leading-relaxed">
              {codeLang === "py" ? (
                <>
                  {t("이럴 때 ", "For this, you use ")}
                  <code className="bg-white px-1.5 py-0.5 rounded text-purple-700">key=lambda</code>
                  {t(" 를 써요. 다음 슬라이드에서 직접 해보세요!", ". Try it on the next slide!")}
                </>
              ) : (
                <>
                  {t("이럴 때 ", "For this, you use a ")}
                  <code className="bg-white px-1.5 py-0.5 rounded text-purple-700">{t("비교자 lambda", "comparator lambda")}</code>
                  {t(" 를 써요. 다음 슬라이드에서 직접 해보세요!", ". Try it on the next slide!")}
                </>
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("정렬 기준 바꿔보기", "Try different keys")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("아래 사람 3명을 '이름 순' 또는 '나이 순' 으로 정렬해 봐요:", "Sort these 3 people by name or by age:")}
            </p>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setSortBy("name")}
                className={cn("flex-1 py-2 rounded-lg font-bold text-sm transition-all",
                  sortBy === "name" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                A-Z {t("이름 순", "By name")}
              </button>
              <button onClick={() => setSortBy("age")}
                className={cn("flex-1 py-2 rounded-lg font-bold text-sm transition-all",
                  sortBy === "age" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                ↑ {t("나이 순", "By age")}
              </button>
            </div>
            <div className="space-y-1.5">
              {sorted.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  <span className="text-xs font-mono text-emerald-500">#{i + 1}</span>
                  <span className="font-bold text-gray-900">{p.name}</span>
                  <span className="text-xs text-gray-500 font-mono">{p.age}{t("세", "yr")}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-3 italic">
              {t("버튼 바꿔 눌러보세요. 순서가 어떻게 달라지는지 봐요.", "Toggle buttons — watch the order change.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("이거 코드로는 어떻게?", "How does it look in code?")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {codeLang === "py" ? (
                  <>
                    {t("Python 의 ", "Python's ")}
                    <code className="bg-white px-1 rounded">key=lambda</code>
                    {t(" 로 정렬 기준을 정해줘요:", " sets the sort key:")}
                  </>
                ) : (
                  <>
                    {t("C++ 의 ", "C++'s ")}
                    <code className="bg-white px-1 rounded">{t("비교자 lambda", "comparator lambda")}</code>
                    {t(" 로 정렬 기준을 정해줘요:", " sets the sort key:")}
                  </>
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`people = [
    {"name": "Alice", "age": 25},
    {"name": "Bob",   "age": 30},
    {"name": "Carol", "age": 22},
]

# 이름 알파벳 순
people.sort(key=lambda p: p["name"])

# 나이 어린 순
people.sort(key=lambda p: p["age"])

# 나이 많은 순 (역순)
people.sort(key=lambda p: p["age"], reverse=True)

# 여러 기준: 나이 먼저 → 이름
people.sort(key=lambda p: (p["age"], p["name"]))`, `people = [
    {"name": "Alice", "age": 25},
    {"name": "Bob",   "age": 30},
    {"name": "Carol", "age": 22},
]

# alphabetical by name
people.sort(key=lambda p: p["name"])

# youngest first
people.sort(key=lambda p: p["age"])

# oldest first (reverse)
people.sort(key=lambda p: p["age"], reverse=True)

# multiple keys: age first, then name
people.sort(key=lambda p: (p["age"], p["name"]))`)}
              cpp={t(`struct Person { string name; int age; };
vector<Person> people = {{"Alice",25},{"Bob",30},{"Carol",22}};

// 이름 알파벳 순 (lambda 비교자)
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.name < b.name;
     });

// 나이 어린 순
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.age < b.age;
     });`, `struct Person { string name; int age; };
vector<Person> people = {{"Alice",25},{"Bob",30},{"Carol",22}};

// alphabetical by name (lambda comparator)
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.name < b.name;
     });

// youngest first
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.age < b.age;
     });`)}
            />
            <p className="text-xs text-gray-600 text-center">
              {codeLang === "py"
                ? t("핵심: key= 에 '뭘 기준으로?' 만 알려주면 끝.", "Key idea: tell sort 'what to compare by' via key=.")
                : t("핵심: 비교자 lambda 에 'a 가 b 보다 먼저?' 조건을 적으면 끝.", "Key idea: write 'is a before b?' in the comparator lambda.")}
            </p>
            <div className="bg-indigo-50 rounded-xl p-3 border-2 border-indigo-200">
              <p className="text-sm font-black text-indigo-900 mb-1">
                🧷 {t("'안정 정렬(stable)' — 다중 기준의 비밀", "'Stable sort' — the multi-key secret")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "값이 같을 때 원래 순서를 그대로 지켜주는 정렬을 '안정 정렬' 이라고 해요. 이게 왜 중요하냐면 — 두 기준으로 정렬할 때 '약한 기준 먼저, 강한 기준 나중' 으로 두 번 정렬하면 깔끔하게 풀려요. 예: 먼저 '이름' 으로 정렬 → 그다음 '나이' 로 정렬하면, 같은 나이끼리는 이름 순서가 유지돼요. Python 의 sort 와 C++ 의 stable_sort 가 안정 정렬이에요. (C++ 의 일반 sort 는 보장 안 됨 — 동점 순서 중요하면 stable_sort.)",
                  "A 'stable' sort keeps equal items in their original order. Why it matters: to sort by two keys, sort by the weaker key first, then the stronger key — equal items stay in the earlier order. e.g. sort by 'name' first, then by 'age': within the same age, names stay alphabetical. Python's sort and C++'s stable_sort are stable. (Plain C++ sort isn't guaranteed — use stable_sort when tie order matters.)",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (codeLang === "py" ? (
          <MiniQuiz
            question={t("Python: 단어 리스트를 '길이가 짧은 것부터' 정렬하려면?", "Python: Sort word list 'shortest first'?")}
            options={[
              "words.sort()",
              "words.sort(key=lambda w: len(w))",
              "words.sort(reverse=True)",
              "sorted(words, key='length')",
            ]}
            answerIdx={1}
            hint={t("key= 에 함수를 넘기면 그 함수가 반환한 값 기준으로 정렬. len(w) 가 길이를 알려줘요.", "key= takes a function; sort uses its output. len(w) gives the length.")}
            onCorrect={() => setQuizPassed(true)}
          />
        ) : (
          <MiniQuiz
            question={t("C++: 단어 vector<string> 를 '길이가 짧은 것부터' 정렬하려면?", "C++: Sort vector<string> 'shortest first'?")}
            options={[
              "sort(words.begin(), words.end());",
              "sort(words.begin(), words.end(), [](auto& a, auto& b){ return a.size() < b.size(); });",
              "sort(words.begin(), words.end(), greater<>());",
              "sort(words);",
            ]}
            answerIdx={1}
            hint={t("lambda 비교자에서 a.size() < b.size() 로 길이 작은 게 먼저 오게.", "Lambda comparator: a.size() < b.size() puts shorter first.")}
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

// ── Chapter 5: 정리 + 실전 — 슬라이드식 ─────────────────────────
function Chapter5({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
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
              {t("우와, 정렬 끝까지 다 봤어요!", "Wow, you finished all 5 chapters!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요 👏 이제 USACO Bronze 문제에서 정렬이 나와도 당황 안 할 거예요. 기억해야 할 핵심들 한 번만 더 짚고 넘어가요.",
                "Really nice work 👏 You won't panic when sorting shows up in USACO Bronze. Let me wrap up the key points.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("정렬 = 검색·최솟값·중복·그룹화의 기초", "Sort = foundation for search/min/dedup/grouping")}</li>
              {codeLang === "py" ? (
                <li><b>2.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">arr.sort()</code> {t("또는", "or")} <code className="bg-white px-1.5 py-0.5 rounded">sorted(arr)</code></li>
              ) : (
                <li><b>2.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">sort(arr.begin(), arr.end())</code></li>
              )}
              <li><b>3.</b> {t("복잡도", "Speed")}: <b>O(N log N)</b> — {t("N=10⁶ 도 0.02 초", "N=10⁶ in ~0.02s")}</li>
              {codeLang === "py" ? (
                <li><b>4.</b> {t("커스텀 정렬: ", "Custom sort: ")}<code className="bg-white px-1.5 py-0.5 rounded">key=lambda</code></li>
              ) : (
                <li><b>4.</b> {t("커스텀 정렬: ", "Custom sort: ")}<code className="bg-white px-1.5 py-0.5 rounded">{t("비교자 lambda", "comparator lambda")}</code></li>
              )}
              <li><b>5.</b> {t("절대 직접 O(N²) 짜지 말기 — 라이브러리 써요", "Never write O(N²) sort — use library")}</li>
            </ol>
            <div className="mt-3 bg-white rounded-xl p-3 border-2 border-orange-200">
              <p className="text-sm font-black text-orange-800 mb-1">
                🧰 {t("진짜 쓸모: '정렬 후' 가 핵심", "Real payoff: what you do *after* sorting")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "정렬 자체보다 '정렬한 다음 무엇을 하느냐' 가 진짜 무기예요. 대표 패턴 하나:",
                  "The real weapon isn't sorting itself — it's what you do once it's sorted. One classic pattern:",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <b>{t("정렬 → 양끝 투포인터.", "Sort → two pointers from both ends.")}</b>{" "}
                {t(
                  "예: 배열에서 두 수를 더해 정확히 K 가 되는 짝 찾기. 먼저 정렬한 뒤, 가장 작은 값(왼쪽)과 가장 큰 값(오른쪽)을 보면서 — 합이 너무 크면 오른쪽을 한 칸 당기고, 너무 작으면 왼쪽을 한 칸 밀어요. 모든 짝을 다 확인(O(N²))할 필요 없이 한 번 훑으면 끝(O(N)). 정렬이 '순서' 를 만들어줬기 때문에 가능한 거예요. (이게 그리디·이분탐색의 출발점이기도 해요.)",
                  "e.g. find a pair summing to exactly K. Sort first, then look at the smallest (left) and largest (right): if the sum is too big, pull the right pointer in; too small, push the left pointer up. No need to check every pair (O(N²)) — one sweep (O(N)) does it. This only works because sorting gave you order. (It's also the seed of greedy & binary-search tricks.)",
                )}
              </p>
            </div>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 정도면 정렬이 나오는 문제 거의 다 풀 수 있어요!", "This is enough to handle almost any sorting problem!")}
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
              ? <>🎉 {t("정렬 마스터!", "Sorting Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function SortingPage() {
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
      // 챕터 본문 카드로 스크롤 (페이지 상단 X)
      setTimeout(() => {
        document.getElementById("chapter-content")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    } else {
      setIsMastered(true)
      if (isAuthenticated && user) {
        const supabase = createClient()
        supabase.from("lesson_progress").upsert({
          user_id: user.id, lesson_id: "algo-sorting", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-sorting")) {
          arr.push("algo-sorting")
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
              { label: "정렬", labelEn: "Sorting", emoji: "📊" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🔢</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("정렬", "Sorting")}</h1>
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
            <Link href="/algo/sorting"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("정렬 문제 12 개 — 한 번 봤다면 바로!", "12 Sorting challenges — jump right in!")}</p>
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
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} codeLang={codeLang} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("정렬 마스터!", "Sorting Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            {/* 🏆 문제 풀이 — in-app 핵심 CTA */}
            <div className="space-y-2">
              <Link href="/algo/sorting"
                className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-black text-sm leading-tight">{t("정렬 문제 풀러 가기", "Sorting practice")}</p>
                    <p className="text-[11px] text-emerald-50">{t("배운 걸 바로 실전에서 써봐요", "Put it to work right away")}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 보기", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* 페이지 레벨 이전/다음 챕터 버튼 제거 — 위 챕터 칩 + 슬라이드 nav 가 충분 */}
      </main>
      <BottomNav />
    </div>
  )
}
