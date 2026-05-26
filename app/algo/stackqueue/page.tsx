"use client"

/**
 * 스택과 큐 (Stack & Queue) — 챕터식 학습 페이지 v1.
 *
 * Bronze 학생용 핵심 도구:
 *   - 스택 (LIFO) = 책 쌓기 / 접시 더미
 *   - 큐 (FIFO) = 줄서기 / 매표소
 *   - 어떤 문제에서 어떤 걸 쓰는지 직관 + Python/C++ 사용법
 *
 * sorting / prefixsum 페이지 패턴 그대로 따라감.
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
  { id: 1, emoji: "🤔", title: "왜 스택? 왜 큐?",   titleEn: "Why Stack? Why Queue?", mins: 4 },
  { id: 2, emoji: "📚", title: "스택 사용법",        titleEn: "Using a Stack",          mins: 5 },
  { id: 3, emoji: "🚶", title: "큐 사용법",          titleEn: "Using a Queue",          mins: 5 },
  { id: 4, emoji: "🔧", title: "둘 비교 + 실전 패턴", titleEn: "Compare + Patterns",    mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",        titleEn: "Recap & Practice",      mins: 4 },
]

const STORAGE_KEY = "algo-stackqueue-chapter"

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

function CodeBlock({ py, cpp, lang }: { py: string; cpp: string; lang: CodeLang }) {
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
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">👋</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("오랜만! 스택·큐는 알죠?", "Welcome back! You know stack & queue, right?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                codeLang === "py"
                  ? "수업에서 이미 봤어요 — 파이썬 레슨 23 (스택), 24 (큐), 25 (덱). list 와 collections.deque 로 직접 써봤죠."
                  : "수업에서 이미 봤어요 — C++ 레슨 cpp-18 에서 std::stack, std::queue, std::deque 직접 써봤죠.",
                codeLang === "py"
                  ? "You saw it in class — Python lessons 23 (stack), 24 (queue), 25 (deque). You used list and collections.deque hands-on."
                  : "You saw it in class — C++ lesson cpp-18: std::stack, std::queue, std::deque hands-on.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "여기 알고리즘 토픽에서는 — 자료구조 자체를 처음 배우는 게 아니라, *알고리즘에서 도구로 쓰일 때* 의 관점을 봐요. 어떤 문제 신호에서 스택을 꺼내고, 어떤 신호에서 큐를 꺼낼지.",
                "Here in the algorithm topic — we're not learning the data structure from scratch. We're looking at it *as a tool for algorithms*: which problem signals call for stack, which for queue.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t("가볍게 한 번 복습하고, 알고리즘 관점으로 넘어가요 ↓", "Quick recap, then onto the algorithm view ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-gray-900 mb-3 text-center">⚡ {t("30 초 복습", "30-second Recap")}</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-3">
                <p className="text-sm font-black text-emerald-800 mb-1.5">📚 {t("스택", "Stack")}</p>
                <p className="text-[11px] text-emerald-700 font-bold mb-2">LIFO</p>
                <ul className="text-[11px] text-gray-700 space-y-0.5">
                  <li>• push (x) — {t("위에 넣기", "add to top")}</li>
                  <li>• pop () — {t("위에서 빼기", "remove top")}</li>
                  <li>• top () — {t("위만 확인", "peek top")}</li>
                </ul>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                <p className="text-sm font-black text-blue-800 mb-1.5">🚶 {t("큐", "Queue")}</p>
                <p className="text-[11px] text-blue-700 font-bold mb-2">FIFO</p>
                <ul className="text-[11px] text-gray-700 space-y-0.5">
                  <li>• push (x) — {t("뒤에 넣기", "add to back")}</li>
                  <li>• pop () — {t("앞에서 빼기", "remove front")}</li>
                  <li>• front () — {t("앞만 확인", "peek front")}</li>
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 text-center leading-relaxed">
              {t(
                codeLang === "py"
                  ? "기억나죠? Python 은 list (스택) 와 collections.deque (큐) 로 둘 다 처리. C++ 은 std::stack / std::queue 따로 있고요."
                  : "기억나죠? C++ 은 std::stack / std::queue 따로. Python 은 list 와 deque 로 둘 다 처리.",
                codeLang === "py"
                  ? "Remember? Python: list (stack) + collections.deque (queue). C++: separate std::stack / std::queue."
                  : "Remember? C++: separate std::stack / std::queue. Python: list + deque cover both.",
              )}
            </p>
            <p className="text-[11px] text-amber-700 text-center mt-2 italic">
              {t("연산 자체는 다음 챕터에서 한 번 더 정리해요 — 안 헷갈리게.", "Operations are recapped in the next chapters — just to be safe.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border-2 border-purple-300 p-4">
            <p className="text-base font-black text-purple-900 mb-3 text-center">🎯 {t("이 토픽에서 다룰 것", "What this topic covers")}</p>
            <p className="text-xs text-gray-700 mb-3 leading-relaxed">
              {t(
                "자료구조는 안 까먹었으니까 — 알고리즘 관점만 새로 봐요. 스택/큐가 *어떤 문제* 에서 결정적인 도구가 되는지.",
                "You haven't forgotten the data structure — so we'll just look at the algorithm angle: what problems make stack/queue the decisive tool.",
              )}
            </p>
            <div className="space-y-2">
              <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg p-3">
                <p className="text-xs font-black text-emerald-800 mb-1">📚 {t("스택이 빛나는 곳", "Where stack shines")}</p>
                <p className="text-[11px] text-gray-700">{t("괄호 매칭, '가장 최근 거', 재귀 시뮬레이션", "Bracket matching, 'most recent', recursion simulation")}</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                <p className="text-xs font-black text-blue-800 mb-1">🚶 {t("큐가 빛나는 곳", "Where queue shines")}</p>
                <p className="text-[11px] text-gray-700">{t("줄서기 시뮬레이션, BFS (너비 우선 탐색) 의 핵심 도구", "Line simulation, BFS (the key tool inside breadth-first search)")}</p>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 text-center mt-3 italic">
              {t("자세한 건 챕터 2-4 에서. 지금은 '아 이런 거 다룬다' 정도만.", "Details in chapters 2-4. For now just: 'oh, that's what we'll cover'.")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 스택 사용법 ────────────────────────────────────────
function Chapter2({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [stack, setStack] = useState<number[]>([])
  const [nextVal, setNextVal] = useState(1)
  const [lastPop, setLastPop] = useState<number | null>(null)
  const handlePush = () => {
    setStack([...stack, nextVal])
    setNextVal(nextVal + 1)
    setLastPop(null)
  }
  const handlePop = () => {
    if (stack.length === 0) return
    setLastPop(stack[stack.length - 1])
    setStack(stack.slice(0, -1))
  }
  const handleReset = () => { setStack([]); setNextVal(1); setLastPop(null) }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📚</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("스택은 연산 3개만 알면 끝!", "Stack — just 3 operations to know!")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-800 mb-3">
              <li><b className="text-emerald-700">push(x)</b> — {t("맨 위에 x 올리기", "put x on top")}</li>
              <li><b className="text-emerald-700">pop()</b> — {t("맨 위 꺼내서 빼기", "remove the top")}</li>
              <li><b className="text-emerald-700">top()</b> {t("또는", "or")} <b className="text-emerald-700">peek()</b> — {t("맨 위만 확인 (안 빼고)", "just peek at top")}</li>
            </ul>
            <p className="text-xs text-emerald-700 text-center font-bold leading-relaxed">
              {t("다음 슬라이드에서 직접 눌러 봐요 →", "Try it yourself on the next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 push / pop 해보기", "Try push / pop")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("아래 '+ Push' 누르면 새 숫자가 맨 위에 쌓여요. 'Pop' 은 맨 위만 빠져요.", "Click '+ Push' to add to top. 'Pop' removes the top one.")}
            </p>
            {/* 시각화 — 스택은 수직, 맨 위가 위 */}
            <div className="flex justify-center my-3">
              <div className="flex flex-col-reverse gap-1 min-h-[120px] justify-end items-center">
                {stack.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">{t("(비어 있음)", "(empty)")}</p>
                ) : (
                  stack.map((v, i) => (
                    <div key={i} className={cn(
                      "w-16 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all",
                      i === stack.length - 1 ? "bg-emerald-100 border-emerald-400 text-emerald-700" : "bg-gray-100 border-gray-300 text-gray-700",
                    )}>
                      {v}{i === stack.length - 1 && <span className="ml-1 text-[9px] text-emerald-600">← top</span>}
                    </div>
                  ))
                )}
              </div>
            </div>
            {lastPop !== null && (
              <p className="text-xs text-center text-amber-700 font-bold mb-2">
                ↑ {t("방금 꺼낸 값:", "Just popped:")} <span className="font-mono">{lastPop}</span>
              </p>
            )}
            <div className="flex gap-2">
              <button onClick={handlePush} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm">
                + Push {nextVal}
              </button>
              <button onClick={handlePop} disabled={stack.length === 0}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                Pop {t("(맨 위)", "(top)")}
              </button>
              <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺</button>
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-3 italic">
              {t("여러 번 push 하고 pop 해보세요. 마지막에 넣은 게 먼저 나와요.", "Try multiple pushes then pops — last in, first out.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("코드는 이렇게 생겼어요", "Here's the actual code")}</p>
              <p className="text-xs text-gray-700">
                {t(
                  codeLang === "py"
                    ? "Python 은 그냥 리스트 (list) 에 append / pop 으로 스택을 써요. 따로 import 도 필요 없어요."
                    : "C++ 은 std::stack 을 쓰거나, vector 의 push_back / pop_back 으로도 스택처럼 쓸 수 있어요.",
                  codeLang === "py"
                    ? "Python uses a plain list with append / pop as a stack. No import needed."
                    : "C++ uses std::stack, or you can use vector's push_back / pop_back as a stack too.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={`# Python — 리스트로 스택 사용
stack = []

stack.append(10)   # push 10
stack.append(20)   # push 20
stack.append(30)   # push 30
# stack = [10, 20, 30],  맨 뒤 (30) = top

print(stack[-1])   # 30  ← top 확인
print(stack.pop()) # 30  ← 꺼내서 반환 (LIFO)
print(stack.pop()) # 20

print(len(stack))  # 1
print(not stack)   # False (안 비었음)`}
              cpp={`// C++ — std::stack
#include <stack>
using namespace std;

stack<int> st;

st.push(10);     // push 10
st.push(20);
st.push(30);
// 맨 위 = 30

cout << st.top() << endl;  // 30 ← 확인만
st.pop();                   // 30 제거 (반환값 없음!)
cout << st.top() << endl;  // 20

cout << st.size() << endl;   // 1
cout << st.empty() << endl;  // false`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t(
                codeLang === "py"
                  ? "💡 Python 의 list.pop () 은 꺼낸 값을 *반환* 해줘서 변수에 받아 쓸 수 있어요. 편하죠."
                  : "⚠️ C++ stack 의 pop () 은 값을 반환하지 않아요 — top () 으로 먼저 보고 pop () 으로 빼야 해요.",
                codeLang === "py"
                  ? "💡 Python's list.pop() *returns* the removed value, so you can save it to a variable."
                  : "⚠️ C++ stack pop() does NOT return — read top() first, then pop().",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("Python: stack = [], 그 다음 stack.append(1), append(2), append(3), pop(), pop() 하면 stack 은?", "Python: stack=[], append 1, 2, 3, pop, pop — what's stack?")
              : t("C++: st.push(1); st.push(2); st.push(3); st.pop(); st.pop(); 후 st.top() 은?", "C++: push 1, 2, 3, pop, pop — what's st.top()?")
            }
            options={codeLang === "py"
              ? ["[1]", "[3]", "[1, 2]", "[]"]
              : ["1", "2", "3", t("비어 있음", "empty")]
            }
            answerIdx={0}
            hint={t("스택은 LIFO — 마지막에 넣은 3 이 먼저 나오고, 그 다음 2 가 나와요. 1 만 남음.", "LIFO — last 3 comes out first, then 2. Only 1 left.")}
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

// ── Chapter 3: 큐 사용법 ──────────────────────────────────────────
function Chapter3({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [queue, setQueue] = useState<number[]>([])
  const [nextVal, setNextVal] = useState(1)
  const [lastPop, setLastPop] = useState<number | null>(null)
  const handleEnq = () => {
    setQueue([...queue, nextVal])
    setNextVal(nextVal + 1)
    setLastPop(null)
  }
  const handleDeq = () => {
    if (queue.length === 0) return
    setLastPop(queue[0])
    setQueue(queue.slice(1))
  }
  const handleReset = () => { setQueue([]); setNextVal(1); setLastPop(null) }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🚶</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("큐도 연산 3개만 알면 끝!", "Queue — also just 3 operations!")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-800 mb-3">
              <li><b className="text-blue-700">push(x)</b> {t("또는", "or")} <b className="text-blue-700">enqueue</b> — {t("뒤에 x 추가", "add x to back")}</li>
              <li><b className="text-blue-700">pop()</b> {t("또는", "or")} <b className="text-blue-700">dequeue</b> — {t("앞에서 꺼내기", "remove from front")}</li>
              <li><b className="text-blue-700">front()</b> — {t("앞 사람만 보기 (안 빼고)", "peek at front")}</li>
            </ul>
            <p className="text-xs text-blue-700 leading-relaxed text-center">
              {t(
                "스택과 똑같은데 — '꺼내는 위치' 만 달라요. 스택은 맨 위, 큐는 맨 앞.",
                "Same as stack — but different end. Stack: top. Queue: front.",
              )}
            </p>
            <p className="text-xs text-blue-700 text-center font-bold mt-3">
              {t("다음 슬라이드에서 직접 해봐요 →", "Try it on the next slide →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("직접 enqueue / dequeue", "Try enqueue / dequeue")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("'+ 뒤에 추가' 누르면 줄 뒤에 붙고, '앞에서 빼기' 는 맨 앞 사람이 빠져요.", "'+ Add to back' joins the line. 'Remove from front' takes the first person.")}
            </p>
            {/* 시각화 — 큐는 수평, 왼쪽이 앞 */}
            <div className="my-3">
              <div className="flex items-center gap-1 justify-center min-h-[60px] flex-wrap">
                <span className="text-[10px] text-gray-500 mr-1">← {t("앞", "front")}</span>
                {queue.length === 0 ? (
                  <p className="text-xs text-gray-400 italic mx-2">{t("(비어 있음)", "(empty)")}</p>
                ) : (
                  queue.map((v, i) => (
                    <div key={i} className={cn(
                      "w-12 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all",
                      i === 0 ? "bg-blue-100 border-blue-400 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-700",
                    )}>{v}</div>
                  ))
                )}
                <span className="text-[10px] text-gray-500 ml-1">{t("뒤", "back")} →</span>
              </div>
            </div>
            {lastPop !== null && (
              <p className="text-xs text-center text-amber-700 font-bold mb-2">
                ← {t("방금 빠진 사람:", "Just removed:")} <span className="font-mono">{lastPop}</span>
              </p>
            )}
            <div className="flex gap-2">
              <button onClick={handleEnq} className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm">
                + {t("뒤에 추가", "Add to back")} {nextVal}
              </button>
              <button onClick={handleDeq} disabled={queue.length === 0}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                {t("앞에서 빼기", "Remove front")}
              </button>
              <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">↺</button>
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-3 italic">
              {t("먼저 들어온 사람이 먼저 나가요 — FIFO.", "First in, first out — FIFO.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("코드는 이렇게 생겼어요", "Here's the code")}</p>
              <p className="text-xs text-gray-700">
                {t(
                  codeLang === "py"
                    ? "Python 은 collections.deque 를 큐로 써요. 일반 list 의 pop (0) 은 O(N) 으로 느리거든요 — 매번 전체를 한 칸씩 밀어야 해서."
                    : "C++ 은 std::queue 가 그대로 있어요. push / pop / front 세 가지로 끝.",
                  codeLang === "py"
                    ? "Python uses collections.deque as the queue — plain list pop(0) is O(N) because it shifts everything."
                    : "C++ has std::queue ready to go. Just push / pop / front — done.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={`# Python — deque (collections.deque) 를 큐로 사용
from collections import deque

q = deque()

q.append(10)        # 뒤에 10 추가
q.append(20)
q.append(30)
# q = deque([10, 20, 30]),  앞 = 10

print(q[0])         # 10  ← 앞 사람 확인
print(q.popleft())  # 10  ← 앞에서 빼기 (FIFO)
print(q.popleft())  # 20

print(len(q))       # 1
print(not q)        # False

# ⚠️ list 의 pop(0) 은 느림 (O(N)) — 큐에는 deque 사용!`}
              cpp={`// C++ — std::queue
#include <queue>
using namespace std;

queue<int> q;

q.push(10);        // 뒤에 추가
q.push(20);
q.push(30);
// 앞 = 10

cout << q.front() << endl;  // 10 ← 앞만 확인
q.pop();                     // 10 제거 (반환 X)
cout << q.front() << endl;  // 20

cout << q.size() << endl;    // 1
cout << q.empty() << endl;   // false`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t(
                codeLang === "py"
                  ? "⚠️ Python 큐는 list 가 아니라 deque 써요. list 의 pop (0) 은 매번 전체를 한 칸씩 밀어야 해서 느려요."
                  : "⚠️ C++ queue 의 pop () 은 stack 처럼 값을 반환 안 해요 — front () 로 먼저 보고 pop () 으로 빼요.",
                codeLang === "py"
                  ? "⚠️ Use deque, not list, in Python. list.pop(0) shifts everything — too slow."
                  : "⚠️ C++ queue pop() doesn't return, just like stack — read front() first, then pop().",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("Python: q = deque(), append 로 10, 20, 30 넣고 popleft() 두 번 하면 q[0] 은?", "Python: deque, append 10, 20, 30, popleft twice — q[0]?")
              : t("C++: q.push(10), push(20), push(30), pop(), pop() 후 q.front() 는?", "C++: push 10, 20, 30, pop twice — q.front()?")
            }
            options={["10", "20", "30", t("비어 있음", "empty")]}
            answerIdx={2}
            hint={t("FIFO — 먼저 들어온 10, 20 이 먼저 나가요. 30 만 남음.", "FIFO — 10 and 20 leave first. Only 30 left.")}
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

// ── Chapter 4: 둘 비교 + 실전 패턴 ────────────────────────────────
function Chapter4({ onComplete, codeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🤷</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그래서 — 언제 스택? 언제 큐?", "So — when stack? when queue?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "문제 읽을 때 한 가지만 물어보세요: '나중에 들어온 게 먼저 나와야 하나? 아니면 먼저 들어온 게 먼저 나와야 하나?'",
                "When reading a problem, ask one thing: 'Does the LAST one need to come out first? Or the FIRST one?'",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 text-sm space-y-1.5 border border-purple-200">
              <p>📚 <b className="text-emerald-700">{t("나중 거 먼저", "Last out first")}</b> → 스택 (LIFO)</p>
              <p>🚶 <b className="text-blue-700">{t("먼저 거 먼저", "First out first")}</b> → 큐 (FIFO)</p>
            </div>
            <p className="text-xs text-purple-700 text-center mt-3 leading-relaxed">
              {t("다음 슬라이드에서 실제 문제 키워드를 같이 봐요 →", "Next slide: keywords from real problems →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
            <p className="text-base font-black text-gray-900 mb-3">🔍 {t("문제에서 보이는 단서", "Clues in problem statements")}</p>
            <div className="space-y-3">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3">
                <p className="text-sm font-black text-emerald-700 mb-2">📚 {t("스택 신호", "Stack signals")}</p>
                <ul className="text-xs text-gray-700 space-y-1 leading-relaxed">
                  <li>• {t("'괄호 짝맞추기' / valid parentheses", "'matching brackets' / valid parentheses")}</li>
                  <li>• {t("'되돌리기' / undo", "'undo'")}</li>
                  <li>• {t("'가장 가까운 큰 수' (Next Greater Element)", "'next greater element'")}</li>
                  <li>• {t("'마지막에 본 거', '직전 거'", "'last seen', 'most recent'")}</li>
                  <li>• {t("재귀를 직접 풀어서 시뮬레이션", "simulating recursion manually")}</li>
                </ul>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                <p className="text-sm font-black text-blue-700 mb-2">🚶 {t("큐 신호", "Queue signals")}</p>
                <ul className="text-xs text-gray-700 space-y-1 leading-relaxed">
                  <li>• {t("'먼저 온 순서대로 처리' / 줄서기 시뮬레이션", "'process in arrival order' / line simulation")}</li>
                  <li>• {t("'한 단계 / 두 단계씩 퍼져나간다' (BFS)", "'spread step by step' (BFS)")}</li>
                  <li>• {t("'요세푸스' / 카드 돌리기", "'Josephus' / card rotation")}</li>
                  <li>• {t("프린터 인쇄 대기, 버퍼", "print queue, buffer")}</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-purple-700 text-center mt-3 font-bold leading-relaxed">
              {t("Bronze 에선 '괄호 짝맞추기 = 스택', '줄서기 시뮬 = 큐' 이 두 패턴이 제일 자주 나와요.", "In Bronze: 'matching brackets = stack', 'line simulation = queue' are most common.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">
                💡 {t("실전 패턴 — 괄호 짝맞추기 (스택의 대표 문제)", "Pattern — bracket matching (the classic stack problem)")}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "'()[]{}' 같이 짝이 맞는지 검사. 여는 괄호는 스택에 push, 닫는 괄호가 나오면 top 과 짝 맞는지 확인 후 pop.",
                  "Check if '()[]{}' is balanced. Push opening brackets; on closing, check top matches and pop.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang}
              py={`# 괄호 짝맞추기 — 스택 활용
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)              # 여는 괄호 → push
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False              # 짝 안 맞음
            stack.pop()                   # 짝 맞으면 pop
    return not stack                      # 다 짝 맞으면 비어 있음

print(is_valid("()[]{}"))  # True
print(is_valid("(]"))       # False
print(is_valid("([)]"))     # False — 중간에 짝 깨짐`}
              cpp={`// 괄호 짝맞추기 — 스택 활용
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);                    // 여는 괄호
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) return false;
            st.pop();
        }
    }
    return st.empty();
}`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("핵심: 마지막에 본 여는 괄호가 가장 가까운 닫는 괄호와 짝 — 그래서 '마지막 거' 가 중요한 스택이 맞아요.", "Key: most recent opening bracket pairs with the closest closing — that's why 'last' matters → stack.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "다음 중 큐 (FIFO) 를 쓰는 게 자연스러운 상황은?",
              "Which situation naturally calls for a queue (FIFO)?",
            )}
            options={[
              t("괄호 '({[]})' 가 짝이 맞는지 검사", "Check if '({[]})' is balanced"),
              t("실행 취소 (Ctrl+Z) 기능 구현", "Implement undo (Ctrl+Z)"),
              t("매표소 줄에서 먼저 온 사람부터 표 발급 시뮬레이션", "Simulate ticket booth — first arrival served first"),
              t("문자열을 뒤집기 (reverse)", "Reverse a string"),
            ]}
            answerIdx={2}
            hint={t("나머지는 다 '마지막에 본 거' 가 중요 = 스택. 매표소 줄만 '먼저 온 거 먼저' = 큐.", "Others care about 'last seen' = stack. Only the ticket line is 'first in, first out' = queue.")}
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

// ── Chapter 5: 정리 + 실전 ────────────────────────────────────────
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
              {t("우와, 스택/큐 다 봤어요!", "Wow, stack & queue done!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요 👏 이제 문제에 '마지막에 본 거' 가 나오면 스택, '먼저 온 거 먼저' 나오면 큐가 머리에 떠오를 거예요. 핵심들 한 번만 더 정리하고 가요.",
                "Nice work 👏 Now when you see 'last seen' → stack, 'first in, first out' → queue should pop into your head. Quick recap below.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("스택 = LIFO — 마지막에 넣은 게 먼저 나옴 (책 더미)", "Stack = LIFO — last in, first out (book pile)")}</li>
              <li><b>2.</b> {t("큐 = FIFO — 먼저 넣은 게 먼저 나옴 (매표소 줄)", "Queue = FIFO — first in, first out (ticket line)")}</li>
              <li><b>3.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">list</code> {t("를 스택,", "for stack,")} <code className="bg-white px-1.5 py-0.5 rounded">deque</code> {t("를 큐로", "for queue")}</li>
              <li><b>4.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">stack&lt;T&gt;</code>, <code className="bg-white px-1.5 py-0.5 rounded">queue&lt;T&gt;</code></li>
              <li><b>5.</b> {t("연산 3개씩: push / pop / top(front)", "3 ops each: push / pop / top(front)")}</li>
              <li><b>6.</b> {t("괄호 짝맞추기 = 스택, 줄서기 시뮬 = 큐, BFS = 큐", "Brackets = stack, line sim = queue, BFS = queue")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 정도면 Bronze 의 스택/큐 문제 대부분 풀어요!", "Enough to crack most Bronze stack/queue problems!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("이제 실전 문제 풀어 봐요!", "Now real problems!")}</p>
              <p className="text-xs text-gray-700 mb-3">
                {t("백준 (BOJ) 에서 스택/큐 연습 문제 3 개 추천. 쉬운 거부터 →", "Recommended BOJ problems — easy first →")}
              </p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/10828" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10828</b> — {t("스택 (push/pop/top/size/empty 직접 구현)", "Stack (implement push/pop/top/size/empty)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10845" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10845</b> — {t("큐 (똑같은 명령들을 큐 버전으로)", "Queue (same commands, queue version)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10773" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10773</b> — {t("제로 (0 나오면 pop, 아니면 push)", "Zero (0 → pop, else push)")} ↗
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              {t("👇 아래 '스택/큐 마스터' 누르면 끝!", "👇 Hit 'Stack/Queue Master' to finish!")}
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
              ? <>🎉 {t("스택/큐 마스터!", "Stack/Queue Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function StackQueuePage() {
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
          user_id: user.id, lesson_id: "algo-stackqueue", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-stackqueue")) {
          arr.push("algo-stackqueue")
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
            <span className="text-3xl">📚</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("스택과 큐", "Stack & Queue")}</h1>
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
              <span>💡 {t("5 챕터 다 끝나면 스택/큐 연습 문제로 안내해 줄게요!", "Finish all 5 chapters and I'll guide you to stack/queue practice problems!")}</span>
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
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("스택/큐 마스터!", "Stack/Queue Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            {/* 📝 연습 문제 — in-app */}
            <div className="bg-white rounded-xl border-2 border-emerald-200 p-4 mb-3">
              <p className="text-sm font-black text-emerald-900 mb-2">📝 {t("코드린 안에서 풀기", "Practice inside Coderin")}</p>
              <Link href="/coding-bank" className="block px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm text-center transition-all active:scale-95">
                💪 {t("코딩 뱅크 — 스택/큐 활용 문제", "Coding Bank — Stack/Queue Problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                {t("'스택/큐' 카테고리 필터 골라서 풀어 보세요", "Filter by 'Stack/Queue' category")}
              </p>
            </div>

            {/* 🌐 백준 외부 문제 */}
            <div className="bg-white rounded-xl border-2 border-amber-200 p-4 mb-3">
              <p className="text-sm font-black text-amber-900 mb-2">🌐 {t("백준 (BOJ) 외부 연습", "BOJ external practice")}</p>
              <div className="space-y-1.5">
                <a href="https://www.acmicpc.net/problem/10828" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10828</b> — {t("스택 (기본)", "Stack (basic)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10845" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10845</b> — {t("큐 (기본)", "Queue (basic)")} ↗
                </a>
                <a href="https://www.acmicpc.net/problem/10773" target="_blank" rel="noopener noreferrer"
                  className="block px-3 py-2 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
                  <b>BOJ 10773</b> — {t("제로 (스택 활용)", "Zero (stack use)")} ↗
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
