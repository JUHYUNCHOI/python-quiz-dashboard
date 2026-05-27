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
  { id: 1, emoji: "🔤", title: "복습 + 알고리즘 관점",   titleEn: "Recap & Algo View",       mins: 2 },
  { id: 2, emoji: "🪞", title: "회문 — 두 포인터",       titleEn: "Palindrome — Two Pointers", mins: 7 },
  { id: 3, emoji: "🪟", title: "글자 슬라이딩 윈도우",   titleEn: "Char Sliding Window",     mins: 7 },
  { id: 4, emoji: "🔢", title: "ASCII 카운팅 패턴",      titleEn: "ASCII Counting Pattern",  mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",            titleEn: "Recap & Practice",        mins: 4 },
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

// ── Chapter 2: 회문 — 두 포인터 ──────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const word = "racecar"
  // L/R 두 포인터 step: 0(시작) → 1(L=0,R=6) → 2(L=1,R=5) → 3(L=2,R=4) → 4(L=R=3, 회문!)
  const [twoP, setTwoP] = useState(0)
  const maxStep = 4
  const L = twoP === 0 ? -1 : twoP - 1
  const R = twoP === 0 ? -1 : word.length - twoP
  const isMatch = L >= 0 && L <= R && word[L] === word[R]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {/* Slide 0 — Why */}
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪞</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("회문 — 거울처럼 좌우 대칭", "Palindrome — mirror-symmetric")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "racecar, level, abba — 앞에서 읽으나 뒤에서 읽으나 똑같은 문자열. 알고리즘 문제에서 진짜 자주 나와요.",
                "racecar, level, abba — same forwards and backwards. Shows up a LOT in problems.",
              )}
            </p>
            <div className="space-y-2 text-sm text-gray-800 mb-3">
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <b className="text-emerald-700">1) {t("회문 검사", "Is it palindrome?")}</b>
                <p className="text-xs text-gray-600 mt-1">{t("두 포인터 — 양 끝에서 가운데로. O(N)", "Two pointers — both ends toward middle. O(N)")}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <b className="text-emerald-700">2) {t("가장 긴 회문 부분문자열", "Longest palindromic substring")}</b>
                <p className="text-xs text-gray-600 mt-1">{t("각 인덱스에서 가운데처럼 보고 양쪽으로 늘리기 (expand around center). O(N²)", "Treat each index as a center, expand outward. O(N²)")}</p>
              </div>
            </div>
            <p className="text-xs text-emerald-700 text-center font-bold">
              {t("→ 다음 슬라이드에서 양 끝 포인터 직접 움직여봐요 →", "→ Next: move the two pointers yourself →")}
            </p>
          </div>
        )}

        {/* Slide 1 — Interactive two-pointer */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("두 포인터로 racecar 검사", "Two pointers on racecar")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("L 과 R 이 양 끝에서 시작 → 한 칸씩 안쪽으로. 매번 같은 글자인지 확인.", "L and R start at both ends → move inward one step. Each step, check if chars match.")}
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 mb-3">
              <div className="flex gap-1 justify-center mb-1">
                {word.split("").map((c, i) => {
                  const isL = i === L
                  const isR = i === R
                  const isHi = (i === L || i === R) && twoP > 0
                  return (
                    <div key={i} className={cn(
                      "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-black text-lg transition-all",
                      isHi && isMatch && "bg-green-200 border-green-500 text-green-900 scale-110",
                      isHi && !isMatch && "bg-red-200 border-red-500 text-red-900",
                      !isHi && "bg-white border-gray-300 text-gray-700",
                    )}>{c}</div>
                  )
                })}
              </div>
              <div className="flex gap-1 justify-center mb-2">
                {word.split("").map((_, i) => (
                  <div key={i} className="w-10 text-center text-[10px] text-gray-500 font-mono">[{i}]</div>
                ))}
              </div>
              <div className="flex gap-1 justify-center">
                {word.split("").map((_, i) => (
                  <div key={i} className="w-10 text-center text-[10px] font-black h-4">
                    {i === L && i === R ? <span className="text-purple-600">L=R</span> : i === L ? <span className="text-blue-600">L</span> : i === R ? <span className="text-orange-600">R</span> : ""}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center min-h-[44px] flex items-center justify-center">
              {twoP === 0 && <p className="text-xs text-gray-500">{t("'다음 스텝' 을 눌러 시작 →", "Press 'Next step' to start →")}</p>}
              {twoP > 0 && L < R && (
                <p className="text-xs">
                  <span className="font-mono font-bold">s[{L}]='{word[L]}'</span> {isMatch ? "==" : "!="} <span className="font-mono font-bold">s[{R}]='{word[R]}'</span> {isMatch ? <span className="text-green-700 font-black">✓ {t("일치", "match")}</span> : <span className="text-red-700 font-black">✗</span>}
                </p>
              )}
              {twoP > 0 && L === R && (
                <p className="text-xs text-purple-700 font-black">🎉 {t("L 과 R 이 가운데 만남 → 회문!", "L meets R at center → palindrome!")}</p>
              )}
              {twoP > 0 && L > R && (
                <p className="text-xs text-purple-700 font-black">🎉 {t("L 이 R 을 지나감 → 회문!", "L passed R → palindrome!")}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setTwoP(0)} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs">
                ↺ {t("리셋", "Reset")}
              </button>
              <button onClick={() => setTwoP(p => Math.min(p + 1, maxStep))} disabled={twoP >= maxStep}
                className="py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-xs">
                {t("다음 스텝 →", "Next step →")}
              </button>
            </div>
            <p className="text-xs text-amber-700 text-center mt-3 italic">
              {t("💡 가장 긴 회문 찾기는 — 각 인덱스를 가운데로 보고 같은 식으로 양쪽 확장!", "💡 Longest palindrome — treat each index as a center, expand outward the same way!")}
            </p>
          </div>
        )}

        {/* Slide 2 — Code */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("두 함수 — 검사 + 가장 긴 회문", "Two functions — check + longest")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("isPalindrome 은 두 포인터로 O(N). longestPalindrome 은 각 인덱스에서 양쪽으로 확장 O(N²).", "isPalindrome uses two pointers O(N). longestPalindrome expands around each center O(N²).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def is_palindrome(s):
    L, R = 0, len(s) - 1
    while L < R:
        if s[L] != s[R]:
            return False
        L += 1
        R -= 1
    return True

# 가장 긴 회문 부분문자열 — 각 인덱스를 중심으로
def longest_palindrome(s):
    best = ""
    for i in range(len(s)):
        # 홀수 길이 (중심 = i)
        a = expand(s, i, i)
        # 짝수 길이 (중심 = i, i+1)
        b = expand(s, i, i + 1)
        if len(a) > len(best): best = a
        if len(b) > len(best): best = b
    return best

def expand(s, L, R):
    while L >= 0 and R < len(s) and s[L] == s[R]:
        L -= 1
        R += 1
    return s[L+1:R]   # 마지막으로 일치했던 구간`}
              cpp={`#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    int L = 0, R = s.size() - 1;
    while (L < R) {
        if (s[L] != s[R]) return false;
        L++;
        R--;
    }
    return true;
}

// 각 인덱스를 중심으로 양쪽 확장
string expand(const string& s, int L, int R) {
    while (L >= 0 && R < (int)s.size() && s[L] == s[R]) {
        L--;
        R++;
    }
    return s.substr(L + 1, R - L - 1);
}

string longestPalindrome(const string& s) {
    string best = "";
    for (int i = 0; i < (int)s.size(); i++) {
        string a = expand(s, i, i);       // 홀수
        string b = expand(s, i, i + 1);   // 짝수
        if (a.size() > best.size()) best = a;
        if (b.size() > best.size()) best = b;
    }
    return best;
}`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("핵심: 각 인덱스마다 '홀수 중심' + '짝수 중심' 두 번 시도. 둘 다 안 하면 절반을 놓침.", "Key: at each index try BOTH odd-center and even-center expansion. Skip one → miss half the cases.")}
            </p>
          </div>
        )}

        {/* Slide 3 — Quiz */}
        {step === 3 && (
          <MiniQuiz
            question={t("가장 긴 회문 부분문자열에서 'expand around center' 가 잡지 못하는 케이스는?", "Which case does 'expand around center' miss?")}
            options={[
              t("홀수 길이 회문 (예: aba)", "Odd-length palindromes (e.g. aba)"),
              t("짝수 길이 회문 (예: abba)", "Even-length palindromes (e.g. abba)"),
              t("둘 다 잡으려면 각 인덱스마다 두 가지 (홀수 + 짝수) 시도", "To catch both, try BOTH odd and even at each index"),
              t("잡지 못함", "Cannot catch them"),
            ]}
            answerIdx={2}
            hint={t('"babad" 와 "abba" 둘 다 처리하려면 — 한 인덱스에서 (i, i) 와 (i, i+1) 두 번 expand 해야 해요.', 'To handle both "babad" and "abba" — at each index, expand TWICE: (i, i) and (i, i+1).')}
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

// ── Chapter 3: 글자 슬라이딩 윈도우 ─────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const word = "abcba"
  const K = 2
  // window step. 각 step: [L, R] (inclusive)
  // 시작 — 0(없음) 그 후 right 가 한 칸씩 확장, distinct > K 면 shrink
  // 단계: 0(idle) → R=0(a) → R=1(ab) → R=2(abc:shrink to bc) → R=3(bcb) → R=4(cba:shrink to ba)
  const windowSteps: { L: number; R: number; note: string; noteEn: string }[] = useMemo(() => [
    { L: 0, R: 0, note: "R 확장: 'a' (distinct 1 ≤ 2 ✓)", noteEn: "R extend: 'a' (distinct 1 ≤ 2 ✓)" },
    { L: 0, R: 1, note: "R 확장: 'ab' (distinct 2 ≤ 2 ✓)", noteEn: "R extend: 'ab' (distinct 2 ≤ 2 ✓)" },
    { L: 1, R: 2, note: "R 확장 'abc' → distinct 3 > 2 → L 이동해서 'bc'", noteEn: "R extend 'abc' → distinct 3 > 2 → shrink L → 'bc'" },
    { L: 1, R: 3, note: "R 확장: 'bcb' (distinct 2 ≤ 2 ✓)", noteEn: "R extend: 'bcb' (distinct 2 ≤ 2 ✓)" },
    { L: 2, R: 4, note: "R 확장 'bcba' → distinct 3 > 2 → L 이동해서 'cba' → 여전히 3 → L 또 이동 → 'ba'", noteEn: "R extend 'bcba' → distinct 3 > 2 → shrink → eventually 'ba'" },
  ], [])
  const [winStep, setWinStep] = useState(-1)
  const cur = winStep >= 0 && winStep < windowSteps.length ? windowSteps[winStep] : null
  const inWindow = (i: number) => cur !== null && i >= cur.L && i <= cur.R
  const bestLen = winStep >= 0 ? Math.max(...windowSteps.slice(0, winStep + 1).map(s => s.R - s.L + 1)) : 0

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {/* Slide 0 — Why */}
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🪟</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("글자 슬라이딩 윈도우", "Sliding window on characters")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "'서로 다른 글자가 K 개 이하인 가장 긴 부분문자열' / '중복 없는 가장 긴 부분문자열' 같은 문제 — naive 로 모든 부분문자열 만들면 O(N·M). 윈도우 하나만 미끄러뜨리면 O(N).",
                "Problems like 'longest substring with ≤ K distinct chars' or 'longest without repeat' — naive checks every substring O(N·M). Slide one window → O(N).",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-700 mb-2">{t("핵심 아이디어", "Core idea")}:</p>
              <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                <li>{t("두 포인터 L, R — R 은 항상 한 칸씩 확장", "Two pointers L, R — R extends one step at a time")}</li>
                <li>{t("조건 어기면 (예: distinct > K) → L 을 옮겨 윈도우 줄임", "If condition breaks (e.g. distinct > K) → move L to shrink")}</li>
                <li>{t("각 글자는 윈도우에 한 번씩만 들어오고 나감 → O(N)", "Each char enters and leaves window once → O(N)")}</li>
              </ul>
            </div>
            <p className="text-xs text-purple-700 text-center font-bold">
              {t("→ 다음 슬라이드에서 윈도우 직접 미끄러뜨려봐요 →", "→ Next: slide the window yourself →")}
            </p>
          </div>
        )}

        {/* Slide 1 — Interactive */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("\"abcba\" 에서 distinct ≤ 2", "On \"abcba\" with distinct ≤ 2")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("K = 2 (서로 다른 글자 2 개까지 허용). R 을 확장하고, 조건 어기면 L 을 줄여요.", "K = 2 (up to 2 distinct chars). Extend R, shrink L when condition breaks.")}
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 mb-3">
              <div className="flex gap-1 justify-center mb-1">
                {word.split("").map((c, i) => (
                  <div key={i} className={cn(
                    "w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-black text-lg transition-all",
                    inWindow(i) ? "bg-blue-200 border-blue-500 text-blue-900 scale-110" : "bg-white border-gray-300 text-gray-400",
                  )}>{c}</div>
                ))}
              </div>
              <div className="flex gap-1 justify-center mb-2">
                {word.split("").map((_, i) => (
                  <div key={i} className="w-12 text-center text-[10px] text-gray-500 font-mono">[{i}]</div>
                ))}
              </div>
              <div className="flex gap-1 justify-center">
                {word.split("").map((_, i) => (
                  <div key={i} className="w-12 text-center text-[10px] font-black h-4">
                    {cur && i === cur.L && i === cur.R ? <span className="text-purple-600">L=R</span> : cur && i === cur.L ? <span className="text-blue-600">L</span> : cur && i === cur.R ? <span className="text-orange-600">R</span> : ""}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3 bg-gray-50 border border-gray-200 rounded-lg p-2 min-h-[60px] flex flex-col items-center justify-center">
              {winStep < 0 && <p className="text-xs text-gray-500">{t("'다음 스텝' 으로 R 을 확장 →", "Press 'Next step' to extend R →")}</p>}
              {cur && (
                <>
                  <p className="text-xs text-gray-700 mb-1">{t(cur.note, cur.noteEn)}</p>
                  <p className="text-xs">
                    <span className="font-bold">{t("현재 윈도우", "Window")}: </span>
                    <span className="font-mono font-black text-blue-700">&quot;{word.slice(cur.L, cur.R + 1)}&quot;</span>
                    <span className="ml-2 text-gray-500">({t("길이", "len")} {cur.R - cur.L + 1})</span>
                  </p>
                </>
              )}
              {winStep >= windowSteps.length - 1 && (
                <p className="text-xs text-emerald-700 font-black mt-1">
                  🎉 {t(`가장 긴 윈도우 길이 = ${bestLen}`, `Longest window = ${bestLen}`)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setWinStep(-1)} className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs">
                ↺ {t("리셋", "Reset")}
              </button>
              <button onClick={() => setWinStep(s => Math.min(s + 1, windowSteps.length - 1))}
                disabled={winStep >= windowSteps.length - 1}
                className="py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white rounded-lg font-bold text-xs">
                {t("다음 스텝 →", "Next step →")}
              </button>
            </div>
          </div>
        )}

        {/* Slide 2 — Code */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("distinct ≤ K 윈도우 — 코드", "distinct ≤ K window — code")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("count 맵으로 윈도우 안 글자 개수 추적. distinct > K 가 되면 L 을 옮겨가며 줄임.", "Use a count map for chars in window. When distinct > K, shrink L until distinct ≤ K.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def longest_with_k_distinct(s, K):
    count = {}            # 글자 → 개수
    L = 0
    best = 0
    for R in range(len(s)):
        count[s[R]] = count.get(s[R], 0) + 1
        # 조건 어기면 L 을 옮겨 줄임
        while len(count) > K:
            count[s[L]] -= 1
            if count[s[L]] == 0:
                del count[s[L]]
            L += 1
        # 이 시점에 윈도우 [L..R] 은 distinct ≤ K
        best = max(best, R - L + 1)
    return best

longest_with_k_distinct("abcba", 2)   # 3 ("bcb")`}
              cpp={`#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int longestWithKDistinct(const string& s, int K) {
    unordered_map<char, int> count;
    int L = 0, best = 0;
    for (int R = 0; R < (int)s.size(); R++) {
        count[s[R]]++;
        // 조건 어기면 L 을 옮겨 줄임
        while ((int)count.size() > K) {
            count[s[L]]--;
            if (count[s[L]] == 0) count.erase(s[L]);
            L++;
        }
        // 이 시점에 윈도우 [L..R] 은 distinct ≤ K
        best = max(best, R - L + 1);
    }
    return best;
}

// longestWithKDistinct("abcba", 2) == 3 ("bcb")`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("R 은 N 번, L 도 최대 N 번 → 합쳐서 O(N). 글자 하나가 들어왔다가 나가는 비용만!", "R runs N times, L at most N times → total O(N). Each char enters and leaves once.")}
            </p>
          </div>
        )}

        {/* Slide 3 — Quiz */}
        {step === 3 && (
          <MiniQuiz
            question={t("글자 distinct ≤ K 윈도우 알고리즘에서 left 를 언제 옮기나?", "When do we move left in the distinct ≤ K window?")}
            options={[
              t("한 번에 1 칸", "Always exactly 1 step"),
              t("distinct > K 일 때 distinct ≤ K 가 될 때까지", "While distinct > K, until distinct ≤ K"),
              t("윈도우 크기 = K 일 때", "When window size = K"),
              t("절대 안 옮김", "Never"),
            ]}
            answerIdx={1}
            hint={t("조건 어기면 줄여요 — distinct 가 K 를 넘는 순간 L 을 한 칸씩 옮기며 다시 ≤ K 가 될 때까지.", "Break the rule → shrink. While distinct > K, move L one step at a time until distinct ≤ K again.")}
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

// ── Chapter 4: ASCII 카운팅 패턴 ─────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const s1 = "listen"
  const s2 = "silent"
  const [revealed, setRevealed] = useState(false)
  const countOf = (s: string) => {
    const c = new Array(26).fill(0)
    for (const ch of s.toLowerCase()) {
      const idx = ch.charCodeAt(0) - 97
      if (idx >= 0 && idx < 26) c[idx]++
    }
    return c
  }
  const c1 = countOf(s1)
  const c2 = countOf(s2)
  const usedIdx = Array.from(new Set([...s1, ...s2].map(c => c.toLowerCase().charCodeAt(0) - 97))).filter(i => i >= 0 && i < 26).sort((a, b) => a - b)
  const isAnagram = c1.every((v, i) => v === c2[i])

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {/* Slide 0 — Why */}
        {step === 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔢</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("ASCII 카운팅 — 알파벳 26 칸 배열", "ASCII counting — array of 26 slots")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "아나그램 검사, 빈도 비교, 가장 많이 나온 글자 — 전부 같은 패턴. int count[26] 배열 하나면 끝나요. 가장 빠른 방법.",
                "Anagram check, frequency comparison, most-common letter — same pattern. One int count[26] array. Fastest approach.",
              )}
            </p>
            <div className="bg-white rounded-lg p-3 border border-pink-200 mb-3">
              <p className="text-xs font-bold text-pink-700 mb-2">{t("핵심 트릭", "Core trick")}:</p>
              <p className="text-sm font-mono text-gray-800 mb-2 text-center bg-pink-50 rounded p-2">
                idx = c - 'a'
              </p>
              <p className="text-xs text-gray-700">
                {t("글자 c 를 'a' 와 빼면 0-25 의 인덱스가 나와요. 'a' → 0, 'b' → 1, ... 'z' → 25.", "Subtract 'a' from c → index 0-25. 'a' → 0, 'b' → 1, ... 'z' → 25.")}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                {t("(Python 은 ord(c) - ord('a'), C++ 는 그냥 c - 'a')", "(Python: ord(c) - ord('a'), C++: just c - 'a')")}
              </p>
            </div>
            <p className="text-xs text-pink-700 text-center font-bold">
              {t("→ 다음 슬라이드에서 \"listen\" vs \"silent\" 아나그램 검사 →", "→ Next: anagram check on \"listen\" vs \"silent\" →")}
            </p>
          </div>
        )}

        {/* Slide 1 — Interactive */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("아나그램 검사", "Anagram check")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("두 문자열의 글자 빈도가 똑같으면 아나그램. count[26] 배열로 비교해요.", "Two strings are anagrams if letter counts match. Compare via count[26] arrays.")}
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-gray-600 w-12">s1:</span>
                {s1.split("").map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded bg-blue-100 border border-blue-400 flex items-center justify-center font-mono font-bold text-sm">{c}</div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-gray-600 w-12">s2:</span>
                {s2.split("").map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded bg-purple-100 border border-purple-400 flex items-center justify-center font-mono font-bold text-sm">{c}</div>
                ))}
              </div>
            </div>
            {!revealed && (
              <button onClick={() => setRevealed(true)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-sm mb-2">
                {t("count[26] 배열 만들고 비교 →", "Build count[26] and compare →")}
              </button>
            )}
            {revealed && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
                <p className="text-xs font-bold text-amber-800 mb-2">{t("등장한 글자만 보여줘요:", "Showing only chars that appear:")}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-16">{t("글자", "char")}</span>
                    {usedIdx.map(i => (
                      <div key={i} className="w-8 h-6 rounded bg-gray-100 border border-gray-300 flex items-center justify-center font-mono font-bold text-xs">{String.fromCharCode(97 + i)}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-blue-600 font-bold w-16">count1</span>
                    {usedIdx.map(i => (
                      <div key={i} className={cn("w-8 h-6 rounded flex items-center justify-center font-mono font-black text-xs",
                        c1[i] === c2[i] ? "bg-green-100 border border-green-500 text-green-800" : "bg-red-100 border border-red-500 text-red-800")}>{c1[i]}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-purple-600 font-bold w-16">count2</span>
                    {usedIdx.map(i => (
                      <div key={i} className={cn("w-8 h-6 rounded flex items-center justify-center font-mono font-black text-xs",
                        c1[i] === c2[i] ? "bg-green-100 border border-green-500 text-green-800" : "bg-red-100 border border-red-500 text-red-800")}>{c2[i]}</div>
                    ))}
                  </div>
                </div>
                <p className={cn("text-center font-black mt-3 text-sm",
                  isAnagram ? "text-green-700" : "text-red-700")}>
                  {isAnagram
                    ? <>✅ {t("모든 칸 일치 → 아나그램!", "All slots match → anagram!")}</>
                    : <>❌ {t("불일치", "mismatch")}</>}
                </p>
              </div>
            )}
            <button onClick={() => setRevealed(false)} disabled={!revealed}
              className="w-full py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded text-xs font-bold">
              ↺ {t("리셋", "Reset")}
            </button>
          </div>
        )}

        {/* Slide 2 — Code */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("아나그램 검사 — count[26] 패턴", "Anagram check — count[26] pattern")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("길이 다르면 false. 같으면 count 배열 둘 채우고 한 번에 비교.", "Different lengths → false. Otherwise fill both count arrays and compare.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def is_anagram(a, b):
    if len(a) != len(b):
        return False
    cnt = [0] * 26
    for c in a:
        cnt[ord(c) - ord('a')] += 1
    for c in b:
        cnt[ord(c) - ord('a')] -= 1
    # 모두 0 이어야 아나그램
    return all(v == 0 for v in cnt)

is_anagram("listen", "silent")   # True
is_anagram("hello",  "world")    # False`}
              cpp={`#include <string>
using namespace std;

bool isAnagram(const string& a, const string& b) {
    if (a.size() != b.size()) return false;
    int cnt[26] = {0};
    for (char c : a) cnt[c - 'a']++;
    for (char c : b) cnt[c - 'a']--;
    // 모두 0 이어야 아나그램
    for (int i = 0; i < 26; i++) {
        if (cnt[i] != 0) return false;
    }
    return true;
}

// isAnagram("listen", "silent") == true
// isAnagram("hello",  "world")  == false`}
            />
            <p className="text-xs text-gray-600 text-center">
              {t("💡 트릭: 두 배열 만들 필요 없어요. 하나만 + - 로 더하고 빼면 끝!", "💡 Trick: no need for two arrays. Increment for a, decrement for b — done!")}
            </p>
          </div>
        )}

        {/* Slide 3 — Quiz */}
        {step === 3 && (
          <MiniQuiz
            question={t("anagram 검사 가장 빠른 방법은? (lowercase a-z 만)", "Fastest anagram check? (lowercase a-z only)")}
            options={[
              t("정렬 후 비교 O(N log N)", "Sort both then compare O(N log N)"),
              t("count[26] 배열 둘 비교 O(N)", "Two count[26] arrays compared O(N)"),
              t("set 둘 비교 (중복 무시)", "Compare two sets (ignores duplicates)"),
              t("map<char,int> 둘 비교 O(N)", "Compare two map<char,int> O(N)"),
            ]}
            answerIdx={1}
            hint={t("고정 크기 배열 (26 칸) 이 해시 맵보다 빠르고 정렬보다 빠르며, set 은 중복을 무시해서 틀린 답.", "Fixed-size array (26 slots) beats hash maps and sort. Set ignores duplicates so it's wrong.")}
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
  const totalSteps = 2
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

          {isMastered && (
            <Link href="/algo/string/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("문자열 문제 12 개 — 한 번 봤다면 바로!", "12 String challenges — jump right in!")}</p>
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
