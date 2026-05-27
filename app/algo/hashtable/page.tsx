"use client"

/**
 * 해시테이블 (Hash Table) — 챕터식 학습 페이지.
 *
 * 기존 vanilla JS 해시테이블 토픽 → 5 챕터 React 구조.
 * Bronze~Silver 학생에 필수인 것만: dict/map 사용법, 빈도수 카운팅, set 활용.
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
  { id: 1, emoji: "🤔", title: "왜 해시테이블?",     titleEn: "Why Hash Table?",       mins: 4 },
  { id: 2, emoji: "🗂️", title: "dict / map 사용법",  titleEn: "dict / map Basics",     mins: 6 },
  { id: 3, emoji: "📊", title: "빈도수 카운팅",       titleEn: "Frequency Counting",    mins: 6 },
  { id: 4, emoji: "🎯", title: "set — 중복/존재 확인", titleEn: "set — Dedup / Lookup", mins: 5 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",         titleEn: "Recap & Practice",      mins: 4 },
]

const STORAGE_KEY = "algo-hashtable-chapter"

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

// ── Chapter 1: 복습 + 알고리즘 관점 ────────────────────────────────
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
              {t("오랜만! 다시 만났어요", "Welcome back!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "해시 자료구조는 이미 알죠? — Python 의 dict / set, C++ 의 unordered_map / unordered_set. 수업에서 다 다뤘던 거예요.",
                "You've met hash structures before — Python's dict/set, C++'s unordered_map/unordered_set. We've covered them in class.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "그러면 이 토픽에서는 뭘 새로 배울까요? — 해시를 *문법* 이 아니라 *알고리즘 패턴* 으로 보는 거예요.",
                "So what's new here? — viewing hash *as an algorithmic pattern*, not just syntax.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(
                "\"여기 dict 쓰면 O(N) → O(1) 되겠다\" 같은 *판단* 을 배우는 챕터예요. 사용법 복습은 가볍게, 활용에 집중해요.",
                "\"Hmm, using a dict here cuts O(N) → O(1)\" — that kind of *judgment* is what we're after. Light review, focus on application.",
              )}
            </p>
            <p className="text-sm font-bold text-orange-700 text-center mt-4">
              {t("아래 '다음' 으로 가벼운 복습 ↓", "Hit 'Next' for a quick refresher ↓")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
            <p className="text-sm text-gray-700 mb-2">
              {t("⚡ 30초 복습 — 이거 기억나죠?", "⚡ 30-sec refresher — remember this?")}
            </p>
            <p className="text-base font-black text-gray-900 mb-4">
              {t("해시는 두 가지를 O(1) 에 해결해요", "Hash gives you O(1) on two things")}
            </p>
            <div className="space-y-3 mt-4">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3">
                <p className="text-sm font-black text-emerald-800 mb-1">🔑 {t("키 → 값 저장/조회 — O(1)", "Key → value store/lookup — O(1)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {codeLang === "py"
                    ? t("scores[\"Alice\"] = 90 / scores[\"Alice\"] → 한 번에.",
                        "scores[\"Alice\"] = 90 / scores[\"Alice\"] → one step.")
                    : t("scores[\"Alice\"] = 90; / scores[\"Alice\"] → 한 번에.",
                        "scores[\"Alice\"] = 90; / scores[\"Alice\"] → one step.")}
                </p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                <p className="text-sm font-black text-blue-800 mb-1">🔎 {t("존재 확인 — O(1)", "Existence check — O(1)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {codeLang === "py"
                    ? t("\"Alice\" in scores → True/False 즉시.",
                        "\"Alice\" in scores → True/False instantly.")
                    : t("scores.count(\"Alice\") → 1 또는 0 즉시.",
                        "scores.count(\"Alice\") → 1 or 0 instantly.")}
                </p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm font-black text-red-700 mb-1">📋 {t("vs 일반 배열/리스트 검색 — O(N)", "vs plain array/list scan — O(N)")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "처음부터 끝까지 다 비교해야 해요. N 이 10만, 100만 되면 답답 😤 — 이때 해시로 갈아타는 거예요.",
                    "Compare every element. When N hits 100k+, it gets painful 😤 — that's when you switch to hash.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-800 font-bold text-center mt-4">
              {t("→ 이게 우리가 이 토픽에서 쓰려는 \"무기\" 의 본질.", "→ This is the core \"weapon\" we use in this topic.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-4">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지 패턴", "3 patterns we'll learn in this topic")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t("문법은 알지만 — *언제 꺼낼지* 가 진짜 실력. 이런 상황들이에요:", "You know the syntax — *when to reach for it* is the real skill. Situations like:")}
            </p>
            <div className="space-y-2 text-sm text-gray-800 mb-4">
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">📊 {t("빈도수 카운팅", "Frequency counting")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"각 글자/숫자가 몇 번 나왔나?\" — 한 번 순회로 끝", "\"How many times does each item appear?\" — one pass, done")}</p>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">👯 {t("중복 체크 / dedup", "Duplicate check / dedup")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"본 적 있나?\" 를 O(1) 로 — 이중 for 루프 탈출", "\"Have I seen this?\" in O(1) — escape from double for-loops")}</p>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-2.5">
                <p className="font-black text-blue-800 text-sm">🎯 {t("Two-sum 스타일 매칭", "Two-sum style matching")}</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("\"x 와 더해서 target 이 되는 짝이 있나?\" — 저장해두고 O(1) 로 조회", "\"Is there a pair that sums to target?\" — store first, look up in O(1)")}</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 text-center font-bold leading-relaxed">
              {t(
                "USACO Bronze~Silver 에서 정렬만큼이나 자주 나오는 도구.",
                "Just as common as sorting in USACO Bronze~Silver.",
              )}
            </p>
            <p className="text-sm font-bold text-blue-800 text-center mt-4">
              {t("자, 챕터 2 에서 첫 패턴부터 →", "Now to Chapter 2 for the first pattern →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: dict / map 사용법 ─────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [lockerInput, setLockerInput] = useState("")
  const [lockers, setLockers] = useState<Record<string, string>>({ "Alice": "수학책", "Bob": "도시락" })
  const [lookupKey, setLookupKey] = useState("Alice")
  const [quizPassed, setQuizPassed] = useState(false)

  const addLocker = () => {
    const name = lockerInput.trim()
    if (!name) return
    setLockers({ ...lockers, [name]: "📦" })
    setLockerInput("")
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗂️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("dict / map — 사물함 같아요", "dict / map — it's like lockers")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t(
                "사물함마다 이름표 (key) 가 붙어 있고, 안에 물건 (value) 이 들어 있어요.",
                "Each locker has a name tag (key), and stuff (value) inside.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t("핵심 동작 3 가지:", "3 core operations:")}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-xs space-y-1 text-emerald-700 border border-emerald-200">
              {codeLang === "py" ? (
                <>
                  <p>📥 {t("넣기", "Put")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">d[&quot;Alice&quot;] = 90</code></p>
                  <p>📤 {t("꺼내기", "Get")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">d[&quot;Alice&quot;]</code> → 90</p>
                  <p>🔎 {t("있는지 확인", "Check")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">&quot;Alice&quot; in d</code> → True</p>
                </>
              ) : (
                <>
                  <p>📥 {t("넣기", "Put")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">m[&quot;Alice&quot;] = 90;</code></p>
                  <p>📤 {t("꺼내기", "Get")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">m[&quot;Alice&quot;]</code> → 90</p>
                  <p>🔎 {t("있는지 확인", "Check")}: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">m.count(&quot;Alice&quot;)</code> → 1</p>
                </>
              )}
            </div>
            <p className="text-xs text-emerald-700 mt-3 text-center">
              {t("다음 슬라이드에서 직접 사물함을 만들어 봐요 →", "Next slide: build a locker yourself →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("사물함 직접 추가/조회", "Add/look up lockers")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("이름을 넣어 사물함을 추가하고, 이름표로 바로 찾아봐요.", "Add a locker by name, then look it up by name tag.")}
            </p>

            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("현재 사물함", "Current lockers")}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(lockers).map(([k, v]) => (
                  <div key={k} className={cn("rounded-lg border-2 px-2 py-1.5 text-xs",
                    k === lookupKey ? "bg-emerald-100 border-emerald-500" : "bg-gray-50 border-gray-300")}>
                    <span className="font-bold text-gray-700">{k}</span>
                    <span className="text-gray-500 ml-1">→ {v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                value={lockerInput}
                onChange={(e) => setLockerInput(e.target.value)}
                placeholder={t("새 이름 (예: Carol)", "New name (e.g. Carol)")}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-emerald-400 outline-none"
              />
              <button onClick={addLocker} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm">
                + {t("추가", "Add")}
              </button>
            </div>

            <div className="mb-2">
              <p className="text-[11px] text-gray-500 mb-1">{t("이름표로 조회", "Look up by name tag")}</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(lockers).map((k) => (
                  <button key={k} onClick={() => setLookupKey(k)}
                    className={cn("px-2 py-1 rounded text-xs font-bold border transition-all",
                      lookupKey === k ? "bg-emerald-500 border-emerald-600 text-white" : "bg-white border-gray-300 text-gray-700 hover:border-emerald-400")}>
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {lookupKey && lockers[lookupKey] !== undefined && (
              <p className="text-sm text-center mt-3 text-emerald-700 font-bold">
                ⚡ <code className="bg-emerald-50 px-1.5 py-0.5 rounded text-xs">{codeLang === "py" ? `d["${lookupKey}"]` : `m["${lookupKey}"]`}</code> → {lockers[lookupKey]} {t("— 한 번에!", "— one step!")}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-2">📝 {t("실제 코드 — 똑같이 생겼어요", "Real code — looks similar")}</p>
              <p className="text-xs text-gray-700">
                {t("위에서 언어 토글로 비교해 보세요:", "Toggle language above to compare:")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# Python — dict
scores = {}

# 넣기
scores["Alice"] = 90
scores["Bob"]   = 85

# 꺼내기 (없으면 에러!)
print(scores["Alice"])    # 90

# 있는지 확인 — in 사용
if "Alice" in scores:
    print("있어요!")

# 안전하게 꺼내기 — get
print(scores.get("Carol", 0))  # 없으면 0

# 지우기
del scores["Bob"]`}
              cpp={`#include <unordered_map>
#include <string>
using namespace std;

unordered_map<string, int> scores;

// 넣기
scores["Alice"] = 90;
scores["Bob"]   = 85;

// 꺼내기
cout << scores["Alice"];  // 90

// 있는지 확인 — count() 또는 find()
if (scores.count("Alice")) {
    cout << "있어요!";
}

// 지우기
scores.erase("Bob");`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("Python: in, get / C++: count(), find(). 거의 같은 기능, 이름만 달라요.", "Python: in, get / C++: count(), find(). Same idea, different names.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("Python: scores = {\"Alice\": 90} 일 때 \"Bob\" in scores 의 결과는?", "Python: With scores = {\"Alice\": 90}, what is \"Bob\" in scores ?")
              : t("C++: unordered_map<string,int> m; m[\"Alice\"]=90; 일 때 m.count(\"Bob\") 은?", "C++: m[\"Alice\"]=90; what is m.count(\"Bob\") ?")
            }
            options={codeLang === "py"
              ? ["True", "False", "에러 발생 (Error)", "None"]
              : ["1", "0", "에러 (compile error)", "-1"]
            }
            answerIdx={1}
            hint={codeLang === "py"
              ? t("Bob 은 dict 안에 없어요. in 은 있으면 True, 없으면 False.", "Bob isn't in the dict. in returns True if present, False if not.")
              : t("count() 는 키가 있으면 1, 없으면 0 을 돌려줘요. Bob 은 없으니까 0.", "count() returns 1 if key exists, 0 otherwise. Bob doesn't exist, so 0.")
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

// ── Chapter 3: 빈도수 카운팅 ─────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [text, setText] = useState("banana")
  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const ch of text) {
      c[ch] = (c[ch] ?? 0) + 1
    }
    return c
  }, [text])
  const sortedCounts = useMemo(() => Object.entries(counts).sort((a, b) => b[1] - a[1]), [counts])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("빈도수 세기 — 해시테이블 1 등 사용법", "Frequency counting — the #1 use")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "'각 항목이 몇 번 나왔나' 를 세는 게 해시테이블의 가장 흔한 용도예요. 도서관 카드 목록 떠올려 봐요 — 책 제목마다 빌린 횟수가 적혀있죠.",
                "Counting 'how many times each item appears' is the most common use. Think library cards — each book has a checkout count.",
              )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t("기본 패턴 — 진짜 짧아요:", "Basic pattern — really short:")}
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-xs space-y-1 text-purple-700 border border-purple-200">
              {codeLang === "py" ? (
                <>
                  <p>{t("# 각 글자 몇 번 나왔나?", "# How many times each char?")}</p>
                  <p>for ch in &quot;banana&quot;:</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;c[ch] = c.get(ch, 0) + 1</p>
                </>
              ) : (
                <>
                  <p>{t("// 각 글자 몇 번 나왔나?", "// How many times each char?")}</p>
                  <p>for (char ch : s) {`{`}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;c[ch]++;{t("  // 없으면 0 에서 ++", "  // 0 if missing, then ++")}</p>
                  <p>{`}`}</p>
                </>
              )}
            </div>
            <p className="text-xs text-purple-700 mt-3 text-center">
              {t("다음 슬라이드 — 글자 직접 세보기 →", "Next slide — count letters yourself →")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("글자 빈도수 — 실시간", "Letter frequency — live")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("아래 단어를 바꿔보세요. 글자별 등장 횟수가 자동으로 계산돼요.", "Change the word — frequency updates automatically.")}
            </p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("예: banana", "e.g. banana")}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono mb-3 focus:border-amber-400 outline-none"
            />
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <p className="text-[11px] font-bold text-purple-700 mb-2 uppercase">{t("빈도수 (많은 순)", "Counts (descending)")}</p>
              {sortedCounts.length === 0 ? (
                <p className="text-xs text-gray-400 italic">{t("뭐든 입력해 보세요...", "Type something...")}</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {sortedCounts.map(([ch, n]) => (
                    <div key={ch} className="bg-white rounded-lg border-2 border-purple-300 px-2 py-1 text-xs">
                      <span className="font-mono font-bold text-purple-700">&apos;{ch === " " ? "·" : ch}&apos;</span>
                      <span className="text-gray-500 ml-1">×{n}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-amber-700 text-center mt-3 italic">
              {t("✨ 단 한 번의 순회로 — O(N) 에 빈도수 끝!", "✨ One pass — O(N) frequency done!")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
              <p className="text-sm font-black text-amber-900 mb-2">
                🎯 {t("코드로 — 패턴 외워두기", "In code — memorize this pattern")}
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">
                {t(
                  "Python 은 Counter 라는 편한 클래스도 있어요. C++ 은 map 에 그냥 ++ 하면 끝.",
                  "Python has a handy Counter class. C++ just ++ on the map.",
                )}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 방법 1 — dict 직접
counts = {}
for ch in "banana":
    counts[ch] = counts.get(ch, 0) + 1
# {'b': 1, 'a': 3, 'n': 2}

# 방법 2 — Counter (더 짧음)
from collections import Counter
counts = Counter("banana")
# Counter({'a': 3, 'n': 2, 'b': 1})

# 가장 많이 나온 거 1 개
top = counts.most_common(1)
# [('a', 3)]`}
              cpp={`#include <unordered_map>
#include <string>
using namespace std;

string s = "banana";
unordered_map<char, int> counts;

// 핵심 패턴 — 한 줄!
for (char ch : s) {
    counts[ch]++;
    // 없으면 0 으로 시작 → ++ → 1
}
// counts: {'b':1, 'a':3, 'n':2}

// 'a' 가 몇 번?
cout << counts['a'];  // 3`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("핵심: counts[키]++ 또는 counts.get(키, 0) + 1. 이거 하나만 외우면 끝.", "Key: counts[key]++ or counts.get(key, 0) + 1. Memorize this one.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t("문자열 \"mississippi\" 에서 's' 는 몇 번 나올까요?", "In \"mississippi\", how many times does 's' appear?")}
            options={["2", "3", "4", "5"]}
            answerIdx={2}
            hint={t("m-i-s-s-i-s-s-i-p-p-i → 's' 위치를 세어 봐요.", "m-i-s-s-i-s-s-i-p-p-i → count the s's.")}
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

// ── Chapter 4: set — 중복/존재 확인 ──────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [input, setInput] = useState("3 1 4 1 5 9 2 6 5 3")
  const nums = useMemo(() => input.split(/\s+/).filter(Boolean).map(Number).filter(n => !Number.isNaN(n)), [input])
  const unique = useMemo(() => Array.from(new Set(nums)), [nums])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("set — 값만 있고 '한 개씩만'", "set — values only, no duplicates")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {codeLang === "py"
                ? t(
                    "dict 가 '이름 → 값' 이라면, set 은 '값만' 모아두는 가방이에요. 그리고 같은 값은 자동으로 1 개만!",
                    "If dict is 'name → value', set is just 'values' in a bag. And duplicates auto-merge to 1!",
                  )
                : t(
                    "unordered_map 이 '키 → 값' 이라면, unordered_set 은 '값만' 모아두는 가방이에요. 같은 값은 자동으로 1 개만!",
                    "If unordered_map is 'key → value', unordered_set is just 'values' in a bag. Duplicates auto-merge to 1!",
                  )}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t("주로 쓰는 곳:", "Main uses:")}
            </p>
            <ul className="space-y-1.5 text-sm text-gray-700 mb-3 pl-2">
              <li>👯 {t("중복 제거 — set 에 넣었다 빼면 끝", "Dedup — toss into set, done")}</li>
              <li>🔎 {t("'본 적 있나?' 확인 — O(1)", "'Seen before?' check — O(1)")}</li>
              <li>📋 {t("두 그룹 비교 — 교집합/합집합", "Compare groups — intersection/union")}</li>
            </ul>
            <p className="text-sm text-blue-700 font-bold leading-relaxed">
              {t(
                "Python: set / C++: unordered_set. 다음 슬라이드에서 직접 중복 제거 해보세요!",
                "Python: set / C++: unordered_set. Try dedup on the next slide!",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("중복 제거 직접 해보기", "Dedup it yourself")}</p>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("숫자를 공백으로 구분해서 입력. set 을 통과시키면 중복이 자동으로 제거돼요.", "Enter space-separated numbers. set removes duplicates automatically.")}
            </p>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="3 1 4 1 5 9 2 6 5 3"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono mb-3 focus:border-amber-400 outline-none"
            />
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 mb-1">{t("원본", "Original")} ({nums.length} {t("개", "items")})</p>
              <div className="flex gap-1 flex-wrap">
                {nums.map((v, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-gray-700 text-xs">{v}</div>
                ))}
              </div>
            </div>
            <p className="text-center text-2xl text-purple-500">↓ set() ↓</p>
            <div className="mt-3">
              <p className="text-[11px] text-emerald-600 mb-1 font-bold">✨ {t("중복 제거 후", "After dedup")} ({unique.length} {t("개", "items")})</p>
              <div className="flex gap-1 flex-wrap">
                {unique.map((v, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center font-mono font-bold text-emerald-700 text-xs">{v}</div>
                ))}
              </div>
            </div>
            <p className="text-xs text-emerald-700 text-center mt-3 font-bold">
              {t("✨ set 에 넣는 것만으로 중복 끝! 그것도 O(N) 으로.", "✨ Just put in a set — dedup done! In O(N).")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("set 코드 — 두 가지 용도", "set in code — two main uses")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("(1) 중복 제거 (2) 빠른 '있나?' 확인. 둘 다 진짜 짧아요.", "(1) Dedup (2) fast 'is it there?'. Both very short.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`# 1. 중복 제거 — list → set → list
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
unique = list(set(nums))
# [1, 2, 3, 4, 5, 6, 9]  (순서는 보장 X)

# 2. 빠른 존재 확인
seen = set()
for x in nums:
    if x in seen:    # O(1) — 진짜 빠름
        print(f"{x} 본 적 있어요!")
    seen.add(x)

# 3. 두 그룹 비교
a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)  # 교집합 {2, 3}
print(a | b)  # 합집합 {1, 2, 3, 4}`}
              cpp={`#include <unordered_set>
#include <vector>
using namespace std;

// 1. 중복 제거
vector<int> nums = {3,1,4,1,5,9,2,6,5,3};
unordered_set<int> s(nums.begin(), nums.end());
// s 에는 중복 없이 들어감

// 2. 빠른 존재 확인
unordered_set<int> seen;
for (int x : nums) {
    if (seen.count(x)) {     // O(1)
        cout << x << " 본 적 있어요!\\n";
    }
    seen.insert(x);
}`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("핵심: 'in' (Python) 또는 count() (C++) 가 O(1) — 배열은 O(N) 인데 비교 안 되게 빨라요.", "Key: 'in' (Python) / count() (C++) is O(1) — arrays are O(N), so this is massively faster.")}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={codeLang === "py"
              ? t("리스트에 중복이 있는지 가장 빠르게 확인하려면?", "Fastest way to check if a list has duplicates?")
              : t("vector 에 중복이 있는지 가장 빠르게 확인하려면?", "Fastest way to check if a vector has duplicates?")
            }
            options={codeLang === "py" ? [
              t("이중 for 로 모든 쌍 비교 — O(N²)", "Double for loop — O(N²)"),
              t("정렬한 뒤 옆 원소 비교 — O(N log N)", "Sort then compare neighbors — O(N log N)"),
              t("set 에 하나씩 넣으며 'in' 확인 — O(N)", "Add to set one by one, check 'in' — O(N)"),
              t("리스트 두 번 순회 — O(2N) 도 O(N)", "Two passes over list — O(2N) = O(N)"),
            ] : [
              t("이중 for 로 모든 쌍 비교 — O(N²)", "Double for loop — O(N²)"),
              t("sort() 후 옆 원소 비교 — O(N log N)", "sort() then compare neighbors — O(N log N)"),
              t("unordered_set 에 넣으며 count() 확인 — O(N)", "Insert into unordered_set, check count() — O(N)"),
              t("vector 두 번 순회 — O(2N) 도 O(N)", "Two passes over vector — O(2N) = O(N)"),
            ]}
            answerIdx={2}
            hint={codeLang === "py"
              ? t("set 의 'in' 은 평균 O(1). N 개 원소를 처리해도 전체 O(N) 이에요.", "set 'in' is avg O(1). N elements → overall O(N).")
              : t("unordered_set 의 count() 는 평균 O(1). N 개 원소를 처리해도 전체 O(N) 이에요.", "unordered_set count() is avg O(1). N elements → overall O(N).")
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

// ── Chapter 5: 정리 + 실전 ───────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; alreadyDone?: boolean }) {
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
              {t("해시테이블 5 챕터 끝! 짝짝짝", "All 5 hash-table chapters done! 👏")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {t(
                "정말 잘 했어요. 이제 dict, map, set — 셋 다 친구가 됐어요. USACO 에서 '빠르게 찾기/세기' 필요할 때 바로 떠올릴 수 있을 거예요.",
                "Great job! dict, map, set — all friends now. When USACO calls for fast lookups/counting, these come to mind.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("해시테이블 = 키로 값을 O(1) 에 찾는 도구", "Hash table = O(1) key-to-value lookup")}</li>
              <li><b>2.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">dict</code>, <code className="bg-white px-1.5 py-0.5 rounded">set</code></li>
              <li><b>3.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">unordered_map</code>, <code className="bg-white px-1.5 py-0.5 rounded">unordered_set</code></li>
              <li><b>4.</b> {t("빈도수 패턴", "Count pattern")}: <code className="bg-white px-1.5 py-0.5 rounded">counts[x]++</code> {t("또는", "or")} <code className="bg-white px-1.5 py-0.5 rounded">get(x, 0) + 1</code></li>
              <li><b>5.</b> {t("중복 제거", "Dedup")}: <code className="bg-white px-1.5 py-0.5 rounded">set(arr)</code> {t("한 줄로 끝", "in one line")}</li>
              <li><b>6.</b> {t("존재 확인", "Existence")}: <code className="bg-white px-1.5 py-0.5 rounded">x in s</code> / <code className="bg-white px-1.5 py-0.5 rounded">s.count(x)</code> — O(1)</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이 정도면 해시 나오는 문제 거의 다 풀 수 있어요!", "This is enough for almost any hash-table problem!")}
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
              ? <>🎉 {t("해시테이블 마스터!", "Hash Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function HashTablePage() {
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
          user_id: user.id, lesson_id: "algo-hashtable", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-hashtable")) {
          arr.push("algo-hashtable")
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
            <span className="text-3xl">🗂️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("해시테이블", "Hash Table")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze~Silver</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/hashtable/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("도전 문제 풀러 가기", "Challenge problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("해시테이블 도전 문제 12 개 — 한 번 봤다면 바로!", "12 Hash Table challenges — jump right in!")}</p>
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
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} alreadyDone={completedChapters.has(5)} />}
        </div>

        {isMastered && current === CHAPTERS.length && (
          <div className="mt-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-4 border-emerald-300 p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-xl font-black text-emerald-900">{t("해시테이블 마스터!", "Hash Table Master!")}</h3>
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
