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

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

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
function CodeBlock({ py, cpp, lang, setLang }: { py: string; cpp: string; lang: CodeLang; setLang: (l: CodeLang) => void }) {
  return (
    <div className="rounded-xl bg-gray-900 overflow-hidden my-3">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5">
        <span className="text-[10px] text-gray-400 font-mono">{lang === "py" ? "Python" : "C++"}</span>
        <div className="flex gap-1">
          <button
            onClick={() => setLang("py")}
            className={cn("text-[10px] px-2 py-0.5 rounded font-bold transition-colors",
              lang === "py" ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600")}
          >Py</button>
          <button
            onClick={() => setLang("cpp")}
            className={cn("text-[10px] px-2 py-0.5 rounded font-bold transition-colors",
              lang === "cpp" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600")}
          >C++</button>
        </div>
      </div>
      <pre className="px-4 py-3 text-[13px] text-emerald-300 font-mono overflow-x-auto leading-relaxed">
        <code>{lang === "py" ? py : cpp}</code>
      </pre>
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
function Chapter1({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
        <p className="text-base text-gray-800 leading-relaxed">
          {t("매일 용돈을 저금통에 넣는다고 생각해 보세요.", "Imagine putting daily allowance into a piggy bank.")}
        </p>
        <p className="mt-3 text-sm text-gray-700">
          <b>{t("월 3원, 화 1원, 수 4원, 목 1원, 금 5원", "Mon 3, Tue 1, Wed 4, Thu 1, Fri 5")}</b>
        </p>
        <p className="mt-3 text-sm text-gray-700">
          {t("저금통에 매일 ", "Each day the bank shows the ")}<b>{t("누적 총액", "running total")}</b>{t("이 적혀 있어요:", ":")}
        </p>
        <div className="mt-2 px-3 py-2 bg-white rounded-lg font-mono text-sm text-orange-700 font-bold">
          0 → 3 → 4 → 8 → 9 → 14
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
        <p className="text-sm font-bold text-blue-900 mb-2">
          💭 {t("질문: 화요일부터 목요일까지 모은 돈은?", "Q: Total saved from Tue to Thu?")}
        </p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm transition-colors"
          >
            🤔 {t("생각해보고 → 답 보기", "Think then reveal answer")}
          </button>
        ) : (
          <div className="bg-white rounded-lg p-3 border border-blue-300">
            <p className="text-base font-black text-blue-700">
              {t("목요일까지 총액", "Thu total")} <span className="font-mono">9</span> − {t("월요일까지 총액", "Mon total")} <span className="font-mono">3</span> = <span className="text-2xl text-orange-600">6</span>
            </p>
            <p className="mt-1.5 text-xs text-gray-600">
              {t("실제로 1 + 4 + 1 = 6 ✓", "Check: 1 + 4 + 1 = 6 ✓")}
            </p>
            <p className="mt-2 text-sm font-bold text-emerald-700">
              ✨ {t("이게 바로 누적합이에요!", "This is prefix sum!")}
            </p>
          </div>
        )}
      </div>

      <CodeBlock
        lang={codeLang}
        setLang={setCodeLang}
        py={`# 원래 배열
arr    = [3, 1, 4, 1, 5]

# 누적합 배열 (맨 앞에 0 추가)
prefix = [0, 3, 4, 8, 9, 14]

# 화~목 합 = prefix[4] - prefix[1] = 9 - 3 = 6`}
        cpp={`// 원래 배열
vector<int> arr = {3, 1, 4, 1, 5};

// 누적합 배열 (맨 앞에 0 추가)
vector<int> prefix = {0, 3, 4, 8, 9, 14};

// 화~목 합 = prefix[4] - prefix[1] = 9 - 3 = 6`}
      />

      {revealed && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          ✅ {t("이해했어요 — 다음 챕터", "Got it — Next chapter")}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── 챕터 2: 누적합 만들기 ────────────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const arr = [3, 1, 4, 1, 5]
  const [step, setStep] = useState(0)
  // step 0 = 시작, step 1~5 = arr[i-1] 더하기, step 6 = 완성
  const prefix = useMemo(() => {
    const p = [0]
    for (let i = 0; i < arr.length; i++) p.push(p[i] + arr[i])
    return p
  }, [])
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200">
        <p className="text-sm font-bold text-emerald-900 mb-2">
          {t("핵심 공식", "Key formula")}:
        </p>
        <div className="bg-white rounded-lg p-3 font-mono text-center text-base font-black text-emerald-700">
          prefix[0] = 0<br/>
          prefix[i] = prefix[i-1] + arr[i-1]
        </div>
        <p className="mt-2 text-xs text-gray-600">
          {t("이전까지의 합 + 현재 값. 끝.", "Previous sum + current value. Done.")}
        </p>
      </div>

      {/* 시각화 */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-xs font-black text-amber-900 mb-3">🎮 {t("한 단계씩 만들어 보기", "Build step by step")}</p>

        {/* arr 시각화 */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-500 mb-1">arr</p>
          <div className="flex gap-1">
            {arr.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                  step === i + 1
                    ? "bg-orange-200 border-orange-500 scale-110"
                    : "bg-gray-50 border-gray-300 text-gray-700",
                )}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* prefix 시각화 */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-500 mb-1">prefix</p>
          <div className="flex gap-1">
            {prefix.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                  i <= step
                    ? i === step
                      ? "bg-emerald-400 border-emerald-600 text-white scale-110 shadow-lg"
                      : "bg-emerald-100 border-emerald-300 text-emerald-800"
                    : "bg-gray-50 border-gray-300 border-dashed text-gray-300",
                )}
              >
                {i <= step ? v : "?"}
              </div>
            ))}
          </div>
        </div>

        {/* 현재 단계 설명 */}
        <div className="bg-amber-50 rounded-lg p-2.5 mb-3 min-h-[60px]">
          <p className="text-xs text-amber-900 font-bold">
            {step === 0 && t("Step 0: prefix[0] = 0 (시작)", "Step 0: prefix[0] = 0 (start)")}
            {step >= 1 && step <= 5 && (
              <>Step {step}: prefix[{step}] = prefix[{step-1}] + arr[{step-1}] = {prefix[step-1]} + {arr[step-1]} = <b className="text-emerald-700 text-base">{prefix[step]}</b></>
            )}
          </p>
        </div>

        {/* 네비 */}
        <div className="flex gap-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm"
          >← {t("이전", "Prev")}</button>
          <button
            onClick={() => setStep(Math.min(5, step + 1))}
            disabled={step === 5}
            className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm"
          >
            {step === 5 ? "✓ " + t("완성!", "Done!") : t("다음", "Next") + " →"}
          </button>
        </div>
      </div>

      <CodeBlock
        lang={codeLang}
        setLang={setCodeLang}
        py={`arr = [3, 1, 4, 1, 5]
prefix = [0]                       # 시작값
for i in range(len(arr)):
    prefix.append(prefix[i] + arr[i])
# prefix = [0, 3, 4, 8, 9, 14]`}
        cpp={`vector<int> arr = {3, 1, 4, 1, 5};
vector<int> prefix(arr.size() + 1, 0);
for (int i = 0; i < arr.size(); i++)
    prefix[i + 1] = prefix[i] + arr[i];
// prefix = {0, 3, 4, 8, 9, 14}`}
      />

      {step === 5 && (
        <MiniQuiz
          question={t("arr = [2, 4, 6] 일 때 prefix[3] 은?", "If arr = [2, 4, 6], what is prefix[3]?")}
          options={["10", "12", "6", "8"]}
          answerIdx={1}
          hint={t("prefix[3] = 0 + 2 + 4 + 6", "prefix[3] = 0 + 2 + 4 + 6")}
          onCorrect={() => setQuizPassed(true)}
        />
      )}

      {quizPassed && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          ✅ {t("이해했어요 — 다음 챕터", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── 챕터 3: 구간 합 ─────────────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const arr = [3, 1, 4, 1, 5]
  const prefix = [0, 3, 4, 8, 9, 14]
  const [L, setL] = useState(2)
  const [R, setR] = useState(4)
  const [quizPassed, setQuizPassed] = useState(false)

  const directSum = arr.slice(L - 1, R).reduce((s, v) => s + v, 0)
  const prefixDiff = prefix[R] - prefix[L - 1]

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-purple-200">
        <p className="text-sm text-gray-800 leading-relaxed">
          {t("이제 진짜 마법 — 어떤 구간의 합이든", "Now the magic — any range sum, in")} <b className="text-purple-700">{t("뺄셈 한 번", "ONE subtraction")}</b>:
        </p>
        <div className="mt-3 bg-white rounded-lg p-3 font-mono text-center text-lg font-black text-purple-700">
          arr[L]~arr[R] = prefix[R] − prefix[L−1]
        </div>
      </div>

      {/* 인터랙티브 — L, R 슬라이더 */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-xs font-black text-amber-900 mb-3">🎮 {t("L, R 골라 보기", "Pick L, R")}</p>

        {/* arr (1-indexed) */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-500 mb-1">arr (1-indexed)</p>
          <div className="flex gap-1">
            {arr.map((v, i) => {
              const idx = i + 1
              const inRange = idx >= L && idx <= R
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      inRange
                        ? "bg-purple-300 border-purple-600 text-purple-900 scale-105"
                        : "bg-gray-50 border-gray-300 text-gray-400",
                    )}
                  >
                    {v}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5">{idx}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* prefix */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-500 mb-1">prefix</p>
          <div className="flex gap-1">
            {prefix.map((v, i) => {
              const isR = i === R
              const isLm1 = i === L - 1
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      isR && "bg-emerald-300 border-emerald-600 text-emerald-900 scale-110 shadow-md",
                      isLm1 && "bg-red-200 border-red-500 text-red-800 scale-110 shadow-md",
                      !isR && !isLm1 && "bg-gray-50 border-gray-300 text-gray-500",
                    )}
                  >
                    {v}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5">{i}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* L, R 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-bold text-red-700">L (시작)</label>
            <input
              type="range" min={1} max={5} value={L}
              onChange={e => setL(Math.min(Number(e.target.value), R))}
              className="w-full"
            />
            <div className="text-center font-mono font-black text-red-700">L = {L}</div>
          </div>
          <div>
            <label className="text-xs font-bold text-emerald-700">R (끝)</label>
            <input
              type="range" min={1} max={5} value={R}
              onChange={e => setR(Math.max(Number(e.target.value), L))}
              className="w-full"
            />
            <div className="text-center font-mono font-black text-emerald-700">R = {R}</div>
          </div>
        </div>

        {/* 결과 */}
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

      <CodeBlock
        lang={codeLang}
        setLang={setCodeLang}
        py={`def range_sum(prefix, L, R):
    """arr[L]~arr[R] 의 합 (1-indexed)"""
    return prefix[R] - prefix[L - 1]

# 사용
prefix = [0, 3, 4, 8, 9, 14]
print(range_sum(prefix, 2, 4))   # → 6`}
        cpp={`int rangeSum(vector<int>& prefix, int L, int R) {
    // arr[L]~arr[R] 의 합 (1-indexed)
    return prefix[R] - prefix[L - 1];
}

// 사용
vector<int> prefix = {0, 3, 4, 8, 9, 14};
cout << rangeSum(prefix, 2, 4) << endl;  // → 6`}
      />

      <MiniQuiz
        question={t("arr = [5, 2, 8, 1, 6], prefix = [0, 5, 7, 15, 16, 22] 일 때 arr[2]~arr[4] 합은?", "arr = [5, 2, 8, 1, 6], prefix = [0, 5, 7, 15, 16, 22]. Sum of arr[2]~arr[4]?")}
        options={["11", "15", "17", "23"]}
        answerIdx={0}
        hint={t("prefix[4] - prefix[1] = 16 - 5", "prefix[4] - prefix[1] = 16 - 5")}
        onCorrect={() => setQuizPassed(true)}
      />

      {quizPassed && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          ✅ {t("이해했어요 — 다음 챕터", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── 챕터 4: 첫 문제 풀기 ────────────────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
        <p className="text-xs font-black text-blue-900 mb-2 uppercase">📋 {t("실전 문제 — BOJ 11659 스타일", "Real problem — BOJ 11659 style")}</p>
        <p className="text-sm text-gray-800 leading-relaxed">
          {t("배열에 N 개의 숫자가 있어요. M 개의 질문이 들어와요 — 각 질문은 \"i 번째부터 j 번째까지의 합?\".", "Array of N numbers. M queries — each asks \"sum from i to j?\"")}
        </p>
        <p className="text-sm text-gray-800 mt-2">
          <b>N, M ≤ 100,000</b>
        </p>
      </div>

      {/* 단계별 사고 */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 space-y-3">
        <p className="text-sm font-bold text-gray-900">💭 {t("어떻게 풀까?", "How to solve?")}</p>

        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-xs font-bold text-red-800 mb-1">❌ {t("나이브 방법", "Naive")}</p>
          <p className="text-xs text-gray-700">
            {t("각 질문마다 i~j 직접 더하기 → O(N) × M = ", "Sum directly for each query → O(N) × M = ")}<b className="font-mono">O(N × M)</b>
          </p>
          <p className="text-[11px] text-red-700 mt-1">
            {t("최악 10⁵ × 10⁵ = 10¹⁰ → 시간 초과!", "Worst case 10⁵ × 10⁵ = 10¹⁰ → TLE!")}
          </p>
        </div>

        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
          <p className="text-xs font-bold text-emerald-800 mb-1">✅ {t("누적합 방법", "Prefix sum")}</p>
          <p className="text-xs text-gray-700">
            {t("미리 prefix 한 번 만들기 ", "Build prefix once: ")}<b className="font-mono">O(N)</b>{t(" → 각 질문은 뺄셈 한 번 ", " → each query: ")}<b className="font-mono">O(1)</b>
          </p>
          <p className="text-[11px] text-emerald-700 mt-1">
            {t("총 O(N + M) → 2 × 10⁵ → 초고속!", "Total O(N + M) → 2 × 10⁵ → fast!")}
          </p>
        </div>
      </div>

      <CodeBlock
        lang={codeLang}
        setLang={setCodeLang}
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

      <MiniQuiz
        question={t("N = 100,000, M = 100,000 일 때 나이브 방법은 약 몇 번 연산?", "If N = M = 100,000, naive does ~how many ops?")}
        options={["100,000", "200,000", "10,000,000,000 (시간 초과)", "1,000,000"]}
        answerIdx={2}
        hint={t("각 질문이 평균 N 번 더함 → N × M", "Each query sums ~N → N × M")}
        onCorrect={() => setQuizPassed(true)}
      />

      {quizPassed && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          ✅ {t("이해했어요 — 다음 챕터", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── 챕터 5: 응용 + 정리 ────────────────────────────────────────────
function Chapter5({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage()
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-4">
      {/* 핵심 정리 */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
        <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
        <ol className="space-y-2 text-sm text-gray-800">
          <li><b>1.</b> prefix[0] = 0 {t("(시작값)", "(start)")}</li>
          <li><b>2.</b> <code className="bg-white px-1.5 py-0.5 rounded">prefix[i] = prefix[i-1] + arr[i-1]</code></li>
          <li><b>3.</b> {t("구간 합", "Range sum")}: <code className="bg-white px-1.5 py-0.5 rounded">prefix[R] - prefix[L-1]</code></li>
          <li><b>4.</b> {t("전처리 O(N) + 쿼리 O(1)", "Preprocess O(N) + query O(1)")}</li>
          <li><b>5.</b> {t("써야 할 때: 같은 배열에 여러 구간 합 질문", "Use when: many range queries on same array")}</li>
        </ol>
      </div>

      {/* 응용 (선택) */}
      <div className="bg-white rounded-2xl border-2 border-purple-200 p-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="text-sm font-black text-purple-900">
            🚀 {t("응용 (실력 더 키우고 싶으면)", "Advanced (optional)")}
          </span>
          <span className="text-purple-600">{showAdvanced ? "▼" : "▶"}</span>
        </button>
        {showAdvanced && (
          <div className="mt-4 space-y-3 text-sm text-gray-800">
            <div className="rounded-lg bg-purple-50 p-3">
              <p className="font-bold text-purple-800 mb-1">📊 2D 누적합</p>
              <p className="text-xs">
                {t("격자에서도 가능. 직사각형 영역 합 = 포함-배제로 4 항 뺄셈.", "Works in 2D grids too. Rectangle sum = inclusion-exclusion of 4 corners.")}
              </p>
              <code className="block mt-1 bg-white px-2 py-1 rounded text-[11px] font-mono">
                sum = p[r2][c2] − p[r1-1][c2] − p[r2][c1-1] + p[r1-1][c1-1]
              </code>
            </div>
            <div className="rounded-lg bg-purple-50 p-3">
              <p className="font-bold text-purple-800 mb-1">🔤 문자별 누적합</p>
              <p className="text-xs">
                {t("각 알파벳마다 누적합 배열 26 개 → \"구간에 'a' 가 몇 개?\" O(1) 답.", "26 prefix arrays (one per letter) → \"count of 'a' in [L,R]?\" in O(1)")}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-3">
              <p className="font-bold text-purple-800 mb-1">➗ 나머지 합</p>
              <p className="text-xs">
                {t("prefix[j] % M == prefix[i] % M 이면 구간 합이 M 의 배수.", "If prefix[j] % M == prefix[i] % M, the range sum is divisible by M.")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 실전 문제 링크 */}
      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("실전 문제 추천", "Recommended Practice")}</p>
        <div className="space-y-1.5">
          <a href="https://www.acmicpc.net/problem/11659" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 11659</b> — {t("구간 합 구하기 4", "Sum in Range 4")} <span className="text-[11px] text-gray-400 ml-1">↗</span>
          </a>
          <a href="https://www.acmicpc.net/problem/2559" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 2559</b> — {t("수열 (고정 길이)", "Sequence (fixed window)")} <span className="text-[11px] text-gray-400 ml-1">↗</span>
          </a>
          <a href="https://www.acmicpc.net/problem/11660" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 11660</b> — {t("2D 누적합", "2D Prefix Sum")} <span className="text-[11px] text-gray-400 ml-1">↗</span>
          </a>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg"
      >
        🎉 {t("누적합 마스터!", "Prefix Sum Master!")} <Sparkles className="w-5 h-5" />
      </button>
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

  // localStorage 에서 진도 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (typeof data.current === "number") setCurrent(data.current)
        if (Array.isArray(data.completed)) setCompletedChapters(new Set(data.completed))
        if (data.mastered) setIsMastered(true)
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
      window.scrollTo({ top: 0, behavior: "smooth" })
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
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-24">
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

          {/* 📚 첫 방문 안내 — 학습 흐름 명확히 */}
          {completedChapters.size === 0 && current === 1 && !isMastered && (
            <div className="mb-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-3">
              <p className="text-sm font-black text-blue-900 mb-1.5">
                📚 {t("이 토픽 학습 흐름", "How this works")}
              </p>
              <div className="space-y-1 text-xs text-blue-800">
                <p><b>1.</b> {t("5 챕터를 순서대로 읽어요 (총 ~25 분)", "Read 5 chapters in order (~25 min total)")}</p>
                <p><b>2.</b> {t("각 챕터 끝에 미니 퀴즈 — 맞히면 '이해했어요' 버튼", "Mini quiz at chapter end — get it right → 'Got it' button")}</p>
                <p><b>3.</b> {t("'이해했어요' 누르면 다음 챕터로", "'Got it' → next chapter")}</p>
                <p><b>4.</b> {t("마지막 챕터에 실전 문제 (BOJ) 링크", "Last chapter: real practice problems (BOJ) links")}</p>
              </div>
              <p className="mt-2 text-[11px] text-blue-600 font-bold">
                ↓ {t("바로 아래 챕터 1 부터 시작!", "Start with Chapter 1 below!")}
              </p>
            </div>
          )}

          {/* 챕터 칩 (탐색) */}
          <div className="flex flex-wrap gap-1.5 mb-2">
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
          </div>

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

        {/* 챕터 헤더 */}
        <div className="mb-4 bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
          {(() => {
            const ch = CHAPTERS[current - 1]
            return (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t(`챕터 ${current}/${CHAPTERS.length}`, `Chapter ${current}/${CHAPTERS.length}`)} · ⏱ {ch.mins}{t("분", "min")}
                  </span>
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
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm">
          {current === 1 && <Chapter1 onComplete={() => completeChapter(1)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 2 && <Chapter2 onComplete={() => completeChapter(2)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 3 && <Chapter3 onComplete={() => completeChapter(3)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 4 && <Chapter4 onComplete={() => completeChapter(4)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} />}
        </div>

        {/* 마스터 셀러브레이션 */}
        {isMastered && (
          <div className="mt-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-4 border-yellow-300 p-5 text-center shadow-lg">
            <div className="text-5xl mb-2">🏆</div>
            <h3 className="text-xl font-black text-amber-900">{t("누적합 마스터!", "Prefix Sum Master!")}</h3>
            <p className="text-sm text-amber-700 mt-1">{t("다음 알고리즘 토픽으로 가서 모험을 이어가세요", "Continue your adventure with the next topic")}</p>
            <Link
              href="/algo"
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm"
            >
              🗺️ {t("토픽 목록으로", "Back to Topics")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 푸터: 이전/다음 */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => goToChapter(current - 1)}
            disabled={current === 1}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> {t("이전 챕터", "Prev")}
          </button>
          {completedChapters.has(current) && current < CHAPTERS.length && (
            <button
              onClick={() => goToChapter(current + 1)}
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
            >
              {t("다음 챕터", "Next")} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
