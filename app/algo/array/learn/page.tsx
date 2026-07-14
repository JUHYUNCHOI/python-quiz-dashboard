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
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🤔", title: "왜 배열?",          titleEn: "Why Array?",          mins: 3 },
  { id: 2, emoji: "🎯", title: "두 포인터",         titleEn: "Two Pointers",        mins: 6 },
  { id: 3, emoji: "🪟", title: "슬라이딩 윈도우",   titleEn: "Sliding Window",      mins: 7 },
  { id: 4, emoji: "📈", title: "부분 배열 최대 합 (Kadane)", titleEn: "Max Subarray (Kadane)", mins: 7 },
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
                "배열은 값들이 메모리에 ",
                "Arrays sit ",
              )}<b className="text-blue-700">{t("연속으로", "contiguous in memory")}</b>{t(
                " 붙어 있어서 두 가지가 공짜예요 — arr[37] 같은 ",
                ", which buys two things for free — ",
              )}<b className="text-blue-700">{t("번호로 바로 접근 O(1)", "O(1) index access")}</b>{t(
                " (길이가 10 이든 100 만이든 즉시), 그리고 for 로 쭉 도는 순회가 아주 빨라요.",
                " (instant whether length is 10 or 1M like locker #37) and blazing-fast for-loop traversal.",
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
                  🎯 1. {t("두 포인터", "Two Pointers")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "정렬된 배열에서 양 끝 L·R 로 시작해 안쪽으로 좁혀가기 — O(N²) 짝 찾기를 O(N) 으로.",
                    "Start with L·R at both ends of a sorted array and squeeze inward — turn O(N²) pair search into O(N).",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🪟 2. {t("슬라이딩 윈도우", "Sliding Window")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "연속 구간을 한 칸씩 밀며 '+ 들어오는 것, − 나가는 것' 만 갱신 — 매번 다시 더하지 않기.",
                    "Slide a contiguous window one step at a time, updating only '+ new, − old' — never re-sum from scratch.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📈 3. {t("부분 배열 최대 합 (Kadane)", "Max Subarray (Kadane)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "각 위치에서 '지금까지 이어갈까, 여기서 새로 시작할까' 한 번만 판단 — 한 번 훑어 O(N).",
                    "At each index decide once: 'extend the run or start fresh?' — one pass, O(N).",
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

// ── Chapter 2: 두 포인터 (Two Pointers) ──────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 정렬된 배열에서 두 포인터로 합 = target 찾기
  const tpArr = [1, 3, 5, 7, 9, 11]
  const tpTarget = 14
  const [tpL, setTpL] = useState(0)
  const [tpR, setTpR] = useState(tpArr.length - 1)
  const [tpDone, setTpDone] = useState(false)
  const [tpMsg, setTpMsg] = useState<string | null>(null)
  const tpStep = () => {
    if (tpDone || tpL >= tpR) return
    const s = tpArr[tpL] + tpArr[tpR]
    if (s === tpTarget) {
      setTpMsg(t(
        `arr[${tpL}] + arr[${tpR}] = ${tpArr[tpL]} + ${tpArr[tpR]} = ${tpTarget} ✓ 찾음!`,
        `arr[${tpL}] + arr[${tpR}] = ${tpArr[tpL]} + ${tpArr[tpR]} = ${tpTarget} ✓ Found!`,
      ))
      setTpDone(true)
    } else if (s < tpTarget) {
      setTpMsg(t(
        `합 ${s} < ${tpTarget} → 더 키워야 함 → L++`,
        `Sum ${s} < ${tpTarget} → need larger → L++`,
      ))
      setTpL(tpL + 1)
    } else {
      setTpMsg(t(
        `합 ${s} > ${tpTarget} → 더 줄여야 함 → R--`,
        `Sum ${s} > ${tpTarget} → need smaller → R--`,
      ))
      setTpR(tpR - 1)
    }
  }
  const tpReset = () => { setTpL(0); setTpR(tpArr.length - 1); setTpDone(false); setTpMsg(null) }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("정렬된 배열에서 — 양 끝에서 좁혀가기", "Sorted array — squeeze from both ends")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 정렬된 배열에서 '두 수 합이 target' 인 쌍 찾기. 모든 쌍 다 시도하면 O(N²) — 10만 짜리면 100억 번. 답답하죠.",
                "Problem: in a sorted array, find a pair summing to target. Trying every pair is O(N²) — for N=100k that's 10 billion. Way too slow.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-1">💡 {t("두 포인터의 아이디어", "Two-pointer idea")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "L = 0 (왼쪽 끝), R = N-1 (오른쪽 끝). 합이 target 보다 작으면 L++ (더 큰 값으로), 크면 R-- (더 작은 값으로). 만나면 끝.",
                  "L = 0 (left end), R = N-1 (right end). If sum < target → L++ (bigger). If sum > target → R-- (smaller). Stop when they meet.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("시간: O(N²) → O(N). N=100k 면 ~100배 빠름!", "Time: O(N²) → O(N). For N=100k that's ~100× faster!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 좁혀보기", "Squeeze it yourself")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`정렬된 배열에서 합 = ${tpTarget} 인 쌍 찾기`, `Find a pair summing to ${tpTarget} in this sorted array`)}
            </p>
            <p className="text-[11px] text-gray-500 mb-1">arr = [1, 3, 5, 7, 9, 11]</p>
            <div className="flex gap-1 flex-wrap justify-center mb-3">
              {tpArr.map((v, i) => {
                const isL = i === tpL
                const isR = i === tpR
                const isOut = i < tpL || i > tpR
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[10px] font-mono h-3">
                      {isL && isR ? <span className="text-purple-700 font-black">L=R</span>
                        : isL ? <span className="text-blue-700 font-black">L</span>
                        : isR ? <span className="text-pink-700 font-black">R</span>
                        : <span className="text-gray-300">{i}</span>}
                    </div>
                    <div className={cn(
                      "w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      tpDone && (isL || isR) && "bg-emerald-100 border-emerald-500 text-emerald-700 scale-110",
                      !tpDone && isL && "bg-blue-100 border-blue-500 text-blue-700 scale-105",
                      !tpDone && isR && "bg-pink-100 border-pink-500 text-pink-700 scale-105",
                      isOut && "bg-gray-50 border-gray-200 text-gray-400",
                      !isL && !isR && !isOut && "bg-gray-100 border-gray-300 text-gray-700",
                    )}>{v}</div>
                  </div>
                )
              })}
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3.5rem]">
              <p className="text-sm font-mono text-cyan-800">
                {tpDone
                  ? <b className="text-emerald-700">✅ {tpMsg}</b>
                  : tpMsg ?? t("▶ 스텝을 눌러 시작!", "▶ Press step to start!")}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={tpStep}
                disabled={tpDone || tpL >= tpR}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={tpReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 두 포인터로 합=target 찾기", "Code — two-pointer pair sum")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("정렬된 배열이라는 가정 — 안 되어 있으면 sort 먼저.", "Assumes sorted input — sort first if not.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def find_pair(arr, target):
    L, R = 0, len(arr) - 1
    while L < R:
        s = arr[L] + arr[R]
        if s == target:
            return (arr[L], arr[R])
        elif s < target:
            L += 1          # 합 더 키우기
        else:
            R -= 1          # 합 더 줄이기
    return None             # 못 찾음

arr = [1, 3, 5, 7, 9, 11]
print(find_pair(arr, 14))   # (3, 11)
print(find_pair(arr, 100))  # None`}
              cpp={`#include <vector>
#include <iostream>
using namespace std;

pair<int,int> findPair(vector<int>& arr, int target) {
    int L = 0, R = arr.size() - 1;
    while (L < R) {
        int s = arr[L] + arr[R];
        if (s == target) return {arr[L], arr[R]};
        else if (s < target) L++;   // 합 더 키우기
        else R--;                   // 합 더 줄이기
    }
    return {-1, -1};                // 못 찾음
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    auto p = findPair(arr, 14);
    cout << p.first << " " << p.second << endl;  // 3 11
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "핵심: 한 번 통과하며 L 과 R 이 만날 때까지 → O(N). 정렬되어 있어야 함!",
                "Key: one pass until L meets R → O(N). Must be sorted!",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "정렬된 arr = [1, 4, 5, 8, 10] 에서 합 = 12 인 쌍을 두 포인터로 찾으면? L=0, R=4 부터 시작.",
              "Sorted arr = [1, 4, 5, 8, 10], find pair sum = 12 with two pointers. Start L=0, R=4.",
            )}
            options={["(1, 10)", "(4, 8)", "(5, 8)", t("없음", "None")]}
            answerIdx={1}
            hint={t(
              "L=0,R=4: 1+10=11 < 12 → L++. L=1,R=4: 4+10=14 > 12 → R--. L=1,R=3: 4+8=12 ✓",
              "L=0,R=4: 1+10=11 < 12 → L++. L=1,R=4: 4+10=14 > 12 → R--. L=1,R=3: 4+8=12 ✓",
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

// ── Chapter 3: 슬라이딩 윈도우 ───────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 슬라이딩 윈도우 — K=3, max 합 찾기
  const swArr = [2, 1, 5, 1, 3, 2]
  const K = 3
  // start: -1 = 아직 시작 안 함, 0~N-K = 윈도우 시작 인덱스
  const [swStart, setSwStart] = useState(-1)
  const swSums = [
    swArr.slice(0, K).reduce((a, b) => a + b, 0),
    swArr.slice(1, 1 + K).reduce((a, b) => a + b, 0),
    swArr.slice(2, 2 + K).reduce((a, b) => a + b, 0),
    swArr.slice(3, 3 + K).reduce((a, b) => a + b, 0),
  ]
  const swCurSum = swStart >= 0 ? swSums[swStart] : 0
  const swBest = swStart >= 0 ? Math.max(...swSums.slice(0, swStart + 1)) : 0
  const swMaxStart = swArr.length - K
  const swStepFn = () => {
    if (swStart < swMaxStart) setSwStart(swStart + 1)
  }
  const swReset = () => setSwStart(-1)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-6 border-2 border-sky-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪟</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("연속 K 개를 빠르게 — 슬라이딩 윈도우", "K consecutive items fast — sliding window")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 배열에서 '연속 K 개' 부분 배열의 합/최대/평균. 매번 K 칸 다시 더하면 O(N·K) — 둘 다 10만이면 100억. 망함.",
                "Problem: 'K-in-a-row' subarray sum/max/avg. Re-summing K items each time is O(N·K) — for N=K=100k that's 10 billion. Dead.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-sky-200 mb-3">
              <p className="text-xs font-bold text-sky-800 mb-1">💡 {t("윈도우를 미끄러뜨려요", "Slide the window")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "첫 K 개 합 한 번 구해놓고, 한 칸 옮길 때마다: + 새 오른쪽, - 빠지는 왼쪽. 매번 두 번의 연산만!",
                  "Compute first K-sum once. Each slide: + new right, - old left. Just two operations per slide!",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-sky-700 text-center">
              {t("시간: O(N·K) → O(N). 윈도우는 미는 거지 다시 짓는 게 아님.", "Time: O(N·K) → O(N). Slide it, don't rebuild it.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("윈도우 밀어보기", "Slide the window")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t(`K = ${K} 짜리 윈도우 — 최대 합 찾기`, `Window size K = ${K} — find max sum`)}
            </p>
            <p className="text-[11px] text-gray-500 mb-1">arr = [2, 1, 5, 1, 3, 2]</p>
            <div className="flex gap-1 flex-wrap justify-center mb-3">
              {swArr.map((v, i) => {
                const inWindow = swStart >= 0 && i >= swStart && i < swStart + K
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[10px] text-gray-400 font-mono">{i}</div>
                    <div className={cn(
                      "w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      inWindow ? "bg-sky-100 border-sky-500 text-sky-800 scale-105" : "bg-gray-100 border-gray-300 text-gray-500",
                    )}>{v}</div>
                  </div>
                )
              })}
            </div>
            <div className="bg-sky-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-sky-800">
                {swStart === -1
                  ? t("▶ 시작 눌러서 첫 윈도우 보기", "▶ Start to see first window")
                  : <>
                      {t("윈도우", "Window")} [{swStart}, {swStart + K - 1}] = {swArr.slice(swStart, swStart + K).join(" + ")} = <b>{swCurSum}</b>
                    </>}
              </p>
              {swStart >= 0 && (
                <p className="text-[11px] text-sky-700 mt-1">
                  {t("지금까지 최대 합", "Best so far")}: <b>{swBest}</b>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={swStepFn}
                disabled={swStart >= swMaxStart}
                className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {swStart === -1 ? t("시작", "Start") : t("한 칸 밀기", "Slide one")}
              </button>
              <button onClick={swReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 슬라이딩 윈도우 최대 합", "Code — sliding window max sum")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("첫 K 합 만들고 → 한 칸씩 밀면서 갱신.", "Build first K-sum → slide, updating in O(1) per step.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def max_window_sum(arr, K):
    # 첫 윈도우 합
    cur = sum(arr[:K])
    best = cur

    # 한 칸씩 밀기
    for i in range(K, len(arr)):
        cur += arr[i]            # 새 오른쪽 추가
        cur -= arr[i - K]        # 빠지는 왼쪽 빼기
        if cur > best:
            best = cur
    return best

arr = [2, 1, 5, 1, 3, 2]
print(max_window_sum(arr, 3))   # 9`}
              cpp={`#include <vector>
#include <iostream>
using namespace std;

int maxWindowSum(vector<int>& arr, int K) {
    int cur = 0;
    for (int i = 0; i < K; i++) cur += arr[i];   // 첫 윈도우
    int best = cur;

    for (int i = K; i < (int)arr.size(); i++) {
        cur += arr[i];          // 새 오른쪽 추가
        cur -= arr[i - K];      // 빠지는 왼쪽 빼기
        if (cur > best) best = cur;
    }
    return best;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << maxWindowSum(arr, 3) << endl;   // 9
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "핵심: 윈도우는 다시 더하지 마라. + 들어오는 거, - 나가는 거 두 번이면 끝.",
                "Key: never re-sum the window. Just + the new and - the leaving — two ops, done.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "arr = [1, 4, 2, 10, 2, 3, 1, 0, 20] 에서 K=4 윈도우의 최대 합은?",
              "For arr = [1, 4, 2, 10, 2, 3, 1, 0, 20] with K=4, max window sum?",
            )}
            options={["16", "24", "26", "30"]}
            answerIdx={1}
            hint={t(
              "윈도우 합: [1,4,2,10]=17 → [4,2,10,2]=18 → [2,10,2,3]=17 → [10,2,3,1]=16 → [2,3,1,0]=6 → [3,1,0,20]=24",
              "Windows: [1,4,2,10]=17 → [4,2,10,2]=18 → [2,10,2,3]=17 → [10,2,3,1]=16 → [2,3,1,0]=6 → [3,1,0,20]=24",
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

// ── Chapter 4: 부분 배열 최대 합 (Kadane) ───────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: Kadane 한 칸씩 진행
  const kArr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  // 미리 계산
  const kTrace: { cur: number; best: number; choice: string }[] = []
  {
    let cur = kArr[0], best = kArr[0]
    kTrace.push({ cur, best, choice: t("시작", "start") })
    for (let i = 1; i < kArr.length; i++) {
      const restart = kArr[i]
      const extend = cur + kArr[i]
      const choice = restart > extend ? t("새 시작", "restart") : t("이어가기", "extend")
      cur = Math.max(restart, extend)
      best = Math.max(best, cur)
      kTrace.push({ cur, best, choice })
    }
  }
  const [kIdx, setKIdx] = useState(0)
  const kStepFn = () => { if (kIdx < kArr.length - 1) setKIdx(kIdx + 1) }
  const kReset = () => setKIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📈</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("연속 부분 배열의 최대 합 — Kadane", "Max contiguous subarray sum — Kadane")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제: 배열 중 '연속된' 일부를 뽑아 합을 최대로. 모든 (i, j) 다 시도하면 O(N²) — 너무 느림.",
                "Problem: pick any contiguous slice, maximize its sum. Trying every (i, j) is O(N²) — too slow.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-800 mb-1">💡 {t("Kadane 의 한 줄 아이디어", "Kadane's one-line idea")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "각 위치마다 결정: '지금 원소부터 새로 시작?' vs '이전 합에 이어가?' 둘 중 큰 쪽 선택. 누적이 음수가 되면 버리는 게 이득.",
                  "At each position decide: 'restart fresh here' vs 'extend previous'. Pick the bigger. Once running sum goes negative, dropping it pays off.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-rose-700 text-center">
              {t("시간: O(N²) → O(N). 한 번 통과로 끝.", "Time: O(N²) → O(N). One pass, done.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("Kadane 한 칸씩", "Kadane step-by-step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("매 칸: cur = max(arr[i], cur + arr[i]), best = max(best, cur)", "Each step: cur = max(arr[i], cur + arr[i]), best = max(best, cur)")}
            </p>
            <p className="text-[11px] text-gray-500 mb-1">arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]</p>
            <div className="flex gap-1 flex-wrap justify-center mb-3">
              {kArr.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-[10px] text-gray-400 font-mono">{i}</div>
                  <div className={cn(
                    "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono text-xs font-bold transition-all",
                    i === kIdx && "bg-rose-200 border-rose-500 text-rose-800 scale-110",
                    i < kIdx && "bg-emerald-50 border-emerald-300 text-emerald-700",
                    i > kIdx && "bg-gray-100 border-gray-300 text-gray-500",
                  )}>{v}</div>
                </div>
              ))}
            </div>
            <div className="bg-rose-50 rounded-lg p-3 mb-3 text-center">
              <p className="text-sm font-mono text-rose-800">
                i={kIdx}, arr[i]={kArr[kIdx]} — <span className="font-black">{kTrace[kIdx].choice}</span>
              </p>
              <p className="text-sm font-mono text-rose-700 mt-1">
                cur = <b>{kTrace[kIdx].cur}</b> &nbsp; best = <b className="text-emerald-700">{kTrace[kIdx].best}</b>
              </p>
              {kIdx === kArr.length - 1 && (
                <p className="text-[11px] text-emerald-700 font-bold mt-1">
                  ✅ {t("끝! 답 = 6 (= [4,-1,2,1])", "Done! Answer = 6 (= [4,-1,2,1])")}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={kStepFn}
                disabled={kIdx >= kArr.length - 1}
                className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음", "Next")}
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
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Kadane", "Code — Kadane")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("한 번 순회, 변수 두 개 (cur, best) 만 추적.", "One pass, only two variables (cur, best).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def max_subarray(arr):
    cur = best = arr[0]
    for i in range(1, len(arr)):
        cur = max(arr[i], cur + arr[i])
        best = max(best, cur)
    return best

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray(arr))   # 6  (= [4, -1, 2, 1])`}
              cpp={`#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int maxSubarray(vector<int>& arr) {
    int cur = arr[0], best = arr[0];
    for (int i = 1; i < (int)arr.size(); i++) {
        cur = max(arr[i], cur + arr[i]);
        best = max(best, cur);
    }
    return best;
}

int main() {
    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << maxSubarray(arr) << endl;   // 6
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: cur 초기값은 0 이 아닌 arr[0]. 전부 음수면 0 이 답이 되면 안 됨.",
                "Pitfall: init cur to arr[0], not 0. For all-negative arrays, 0 must not be the answer.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Kadane 의 핵심 점화식은? (i 번째 위치에서 끝나는 최대 부분 합 cur)",
              "Kadane's recurrence? (cur = max subarray sum ending at position i)",
            )}
            options={[
              "cur = arr[i]",
              "cur = cur + arr[i]",
              "cur = max(arr[i], cur + arr[i])",
              "cur = min(arr[i], cur + arr[i])",
            ]}
            answerIdx={2}
            hint={t(
              "두 선택: (1) 지금부터 새로 시작 = arr[i] (2) 이전 합에 이어가 = cur + arr[i]. 더 큰 쪽 선택!",
              "Two choices: (1) restart = arr[i] (2) extend = cur + arr[i]. Pick the bigger!",
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
              <li><b>1.</b> <b className="text-cyan-700">{t("두 포인터", "Two Pointers")}</b> {t("= 정렬된 배열 양 끝 L·R 에서 안쪽으로 좁히기. 짝 찾기 O(N²) → O(N).", "= squeeze L·R inward from both ends of a sorted array. Pair search O(N²) → O(N).")}</li>
              <li><b>2.</b> <b className="text-emerald-700">{t("슬라이딩 윈도우", "Sliding Window")}</b> {t("= 연속 구간을 밀며 ", "= slide a contiguous window, updating ")}<b>{t("+ 새것 − 옛것", "+ new − old")}</b>{t(" 만 갱신. 다시 더하지 않기.", " only. Never re-sum.")}</li>
              <li><b>3.</b> <b className="text-rose-700">Kadane</b> {t("= 각 위치에서 ", "= at each index, ")}<b>{t("이어가기 vs 새로 시작", "extend vs start fresh")}</b>{t(" 한 번 판단. 한 번 훑어 O(N).", " — one decision, one O(N) pass.")}</li>
              <li><b>4.</b> {t("셋 다 공통: '한 번 훑으며 상태 하나만 들고 가기' → 느린 풀이를 O(N) 으로.", "All three share one idea: 'one pass, carry one piece of state' → slow brute force becomes O(N).")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 3 패턴이면 Bronze 배열 문제 대부분이 풀려요!", "These 3 patterns crack most Bronze array problems!")}
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
          <JourneyBreadcrumb items={[
              { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
              { label: "배열", labelEn: "Array", emoji: "📊" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">📊</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("배열", "Array")}</h1>
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
            <Link href="/algo/array"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("배열 문제 12 개 — 한 번 봤다면 바로!", "12 Array challenges — jump right in!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("배열 마스터!", "Array Master!")}</h3>
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
