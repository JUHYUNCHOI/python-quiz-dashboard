"use client"

/**
 * 트라이 (Trie) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 마지막 토픽. 문자열 검색에 특화된 트리 — autocomplete, dictionary, prefix matching.
 * 비유 (사전 — 책장에 ABC... 분류) → 구조 (children + is_end) → 삽입/검색 → prefix 검색 → 정리.
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
  { id: 1, emoji: "🔤", title: "왜 트라이?",              titleEn: "Why Trie?",              mins: 4 },
  { id: 2, emoji: "🌳", title: "트라이 구조",              titleEn: "Trie Structure",         mins: 6 },
  { id: 3, emoji: "➕", title: "삽입 + 검색",              titleEn: "Insert + Search",         mins: 7 },
  { id: 4, emoji: "🔍", title: "Prefix 검색 (자동완성)",    titleEn: "Prefix Search (Autocomplete)", mins: 7 },
  { id: 5, emoji: "🏆", title: "정리",                    titleEn: "Recap",                  mins: 5 },
]

const STORAGE_KEY = "algo-trie-chapter"

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

// ── Chapter 1: 왜 트라이? ────────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📚</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("사전 — 문자열의 책장", "Dictionary — bookshelf for strings")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "도서관 사전 책장에서 단어를 찾을 때 — A 칸, B 칸... 알파벳 순으로 가요. 'apple' 찾으면 A → AP → APP → APPL → APPLE.",
                "Looking up words in a dictionary — A shelf, B shelf, alphabetical. To find 'apple': A → AP → APP → APPL → APPLE.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-1">💡 {t("트라이 = 그 책장을 코드로", "Trie = bookshelf in code")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "각 노드 = 한 글자. 단어 따라 한 글자씩 내려가는 트리. apple, app, apricot 가 'a' 노드를 공유해 메모리 절약 + 검색 빠름.",
                  "Each node = one letter. Walk letter-by-letter down a tree. apple, app, apricot share node 'a' — saves memory + fast search.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "특히 잘 하는 것: ",
                "Best at: ",
              )}<b className="text-orange-700">{t("prefix 검색 (자동완성!)", "prefix search (autocomplete!)")}</b>.
              {t(" 'ap' 입력하면 'a' → 'p' 한 번 따라가서 그 아래 단어 모두 추출.", " Type 'ap', walk 'a' → 'p' and grab everything below.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚖️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("set vs 트라이 — 언제 무엇?", "set vs trie — which when?")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                <p className="text-sm font-black text-blue-800 mb-1">
                  📦 {t("set / dict (해시)", "set / dict (hash)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  ✓ {t("정확 일치 검색만: O(L) per 검색.", "Exact match only: O(L) per lookup.")}<br/>
                  ✗ {t("prefix 검색 불가 — '\"ap\" 로 시작하는 거 다 줘' 못 함.", "No prefix search — can't grab 'all starting with ap'.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  🌳 {t("트라이", "Trie")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  ✓ {t("정확 일치: O(L). prefix 검색: O(prefix 길이).", "Exact match: O(L). Prefix search: O(prefix length).")}<br/>
                  ✓ {t("공통 prefix 공유 → 메모리 절약 (단어 많을수록 더 이득).", "Shared prefixes → memory savings (more words = more savings).")}<br/>
                  ✗ {t("구조 복잡 — set 보다 코드 길어요.", "More code than a set.")}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed overflow-x-auto">
{`set:    "apple" in dict?     ✓
        "ap" 로 시작?         ✗ 불가
트라이:  "apple" in dict?     ✓
        "ap" 로 시작?         ✓ 자식 다 보기`}
              </pre>
            </div>
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              {t(
                "한 줄 정리: prefix 검색이 필요하면 트라이.",
                "Rule of thumb: need prefix queries? Use trie.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 것", "What we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("4 챕터 = 트라이 마스터.", "4 chapters = trie mastery.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌳 2. {t("구조 — children + is_end", "Structure — children + is_end")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t("각 노드의 모양. cat / car / card 삽입 시각화.", "Anatomy of a node. Visualize cat / car / card insert.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ➕ 3. {t("insert + search", "insert + search")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t("두 함수 — 거의 같은 골격. O(L) per 연산.", "Two functions, nearly identical skeleton. O(L) each.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔍 4. {t("prefix 검색 (자동완성!)", "Prefix search (autocomplete!)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t("prefix 따라간 뒤 서브트리 DFS — 트라이가 빛나는 곳.", "Walk prefix, DFS subtree — where tries shine.")}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("천천히 가요! →", "Slowly! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 구조 — children + is_end ──────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Insert simulation: cat → car → card
  // phase 0: empty. 1: cat done. 2: car done. 3: card done.
  const [insertPhase, setInsertPhase] = useState(0)

  // Tree structure for visualization based on phase
  // root → c → a → t (is_end after phase 1)
  //              → r (is_end after phase 2)
  //                → d (is_end after phase 3)
  type NodeInfo = { letter: string; depth: number; isEnd: boolean; addedAtPhase: number }
  const nodes: NodeInfo[] = [
    { letter: "c", depth: 1, isEnd: false, addedAtPhase: 1 },
    { letter: "a", depth: 2, isEnd: false, addedAtPhase: 1 },
    { letter: "t", depth: 3, isEnd: true, addedAtPhase: 1 },
    { letter: "r", depth: 3, isEnd: true, addedAtPhase: 2 },
    { letter: "d", depth: 4, isEnd: true, addedAtPhase: 3 },
  ]
  const visibleNodes = nodes.filter(n => n.addedAtPhase <= insertPhase)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌳</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("노드 하나의 모양", "Anatomy of a node")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "트라이 노드는 단 두 가지만 들고 있어요:",
                "A trie node holds just two things:",
              )}
            </p>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-1">
                  1️⃣ children {t("(자식 노드들)", "(child nodes)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "다음에 올 글자 → 그 글자의 노드. 보통 dict (Python) 또는 26 칸 배열 (C++ 소문자).",
                    "Next letter → that letter's node. Usually a dict (Python) or 26-slot array (C++ lowercase).",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-sm font-black text-rose-800 mb-1">
                  2️⃣ is_end {t("(단어 끝 표시)", "(end-of-word flag)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "이 노드에서 단어가 끝나는지 표시. 'app' 도 있고 'apple' 도 있으면 p 와 e 둘 다 is_end = true.",
                    "Marks whether a word ends here. If both 'app' and 'apple' exist, both p and e are is_end = true.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed overflow-x-auto">
{`class TrieNode:
    children = {}      # 글자 → 자식 노드
    is_end = False     # 단어 끝?`}
              </pre>
            </div>
            <p className="text-xs text-cyan-700 text-center leading-relaxed">
              {t(
                "이게 끝. 두 필드면 트라이 완성.",
                "That's it. Two fields = trie done.",
              )}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("cat → car → card 삽입", "Insert cat → car → card")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("공통 prefix 'ca' 는 한 번만 — 그게 트라이의 묘미.", "Shared prefix 'ca' once only — that's the magic.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[200px]">
              {insertPhase === 0 ? (
                <p className="text-xs text-gray-400 text-center py-12">
                  {t("(빈 트라이 — root 만 있음)", "(empty trie — root only)")}
                </p>
              ) : (
                <div className="font-mono text-xs space-y-1">
                  <div className="text-gray-700">root</div>
                  {visibleNodes.map((n, i) => {
                    // simple indent rendering
                    return (
                      <div key={i} style={{ paddingLeft: `${n.depth * 18}px` }} className="flex items-center gap-2">
                        <span className="text-gray-400">└─</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded font-bold",
                          n.isEnd ? "bg-rose-100 text-rose-700 border border-rose-300" : "bg-blue-100 text-blue-700 border border-blue-300",
                        )}>
                          {n.letter}
                        </span>
                        {n.isEnd && <span className="text-[10px] text-rose-600">●is_end</span>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[2.5rem]">
              <p className="text-sm font-mono text-amber-800">
                {insertPhase === 0 && t("▶ 'cat' 부터 삽입해보기.", "▶ Start by inserting 'cat'.")}
                {insertPhase === 1 && t("'cat' 삽입됨. t 가 is_end. (3 노드)", "'cat' inserted. t is_end. (3 nodes)")}
                {insertPhase === 2 && t("'car' 추가. 'ca' 공유 — r 만 새로 생김.", "Added 'car'. Shared 'ca' — only r is new.")}
                {insertPhase === 3 && <b className="text-emerald-700">✅ {t("'card' 추가. r 노드 아래 d 만 생김. 총 5 노드.", "Added 'card'. Just d under r. 5 nodes total.")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setInsertPhase(Math.min(3, insertPhase + 1))} disabled={insertPhase >= 3}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 단어 삽입", "Insert next")}
              </button>
              <button onClick={() => setInsertPhase(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-emerald-50 rounded-lg p-2 border border-emerald-200">
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                💡 {t(
                  "세 단어 합쳐 11 글자 → 트라이는 5 노드만 사용. 공통 prefix 'ca' 는 단 한 번 저장돼요.",
                  "11 letters across 3 words → only 5 trie nodes. 'ca' is stored exactly once.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
            <p className="text-5xl text-center mb-3">💭</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("dict vs 26 칸 배열 — 어느 쪽?", "dict vs 26-slot array — which?")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📦 dict (Python) / unordered_map (C++)
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  ✓ {t("어떤 문자도 OK (대소문자 / 한글 / 숫자).", "Any character (case / unicode / digits).")}<br/>
                  ✓ {t("실제 쓰는 자식만 메모리 사용.", "Only allocates used children.")}<br/>
                  ✗ {t("hash 약간 느림.", "Slightly slower per access.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  📊 {t("26 칸 배열 (C++)", "26-slot array (C++)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  ✓ {t("배열 접근 — 매우 빠름.", "Array access — very fast.")}<br/>
                  ✗ {t("소문자 알파벳에만 한정. 모든 노드가 26 슬롯 — 메모리 낭비 가능.", "Lowercase only. Every node has 26 slots — possible waste.")}
                </p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                💡 <b>{t("규칙", "Rule")}:</b>{" "}
                {t(
                  "Python 은 그냥 dict. C++ 도 처음 짤 땐 unordered_map 으로 익히고, 속도가 필요하면 26 칸 배열로 전환.",
                  "Python: just dict. C++: start with unordered_map, switch to 26-slot when you need speed.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "단어 'apple' 과 'app' 을 빈 트라이에 삽입했다. is_end = true 인 노드는 몇 개?",
              "After inserting 'apple' and 'app' into an empty trie, how many nodes have is_end = true?",
            )}
            options={[
              t("1 개 (마지막 단어인 apple 의 e 만)", "1 (only e, the last inserted word)"),
              t("2 개 (app 의 p 와 apple 의 e)", "2 (p of 'app' and e of 'apple')"),
              t("5 개 (apple 의 모든 글자)", "5 (every letter of apple)"),
              t("0 개 — root 만 is_end 가 됨", "0 — only root is_end"),
            ]}
            answerIdx={1}
            hint={t(
              "각 단어가 끝나는 곳에 is_end. 'app' 끝나는 두 번째 p, 'apple' 끝나는 e — 둘 다 is_end = true.",
              "is_end is set wherever a word ends. The second p (end of 'app') and the e (end of 'apple') — both is_end.",
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

// ── Chapter 3: insert + search ───────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // search simulation: searching "car" in trie {cat, car, card}
  // phase 0: at root. 1: at c. 2: at c→a. 3: at c→a→r. check is_end.
  const [searchPhase, setSearchPhase] = useState(0)
  const searchSteps = ["root", "c", "a", "r"]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">➕</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("insert — 한 글자씩 따라가며 노드 만들기", "insert — walk char-by-char, create nodes")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "단어를 삽입하는 알고리즘은 단 3 줄짜리 규칙.",
                "Inserting a word — a 3-line rule.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-emerald-200 mb-3">
              <ol className="text-xs text-gray-800 space-y-2 list-decimal list-inside leading-relaxed">
                <li>{t("root 부터 시작.", "Start at root.")}</li>
                <li>{t("단어의 각 글자 c 에 대해: cur 의 자식에 c 가 없으면 새 노드 생성. cur = cur.children[c].", "For each letter c: if cur has no child c, create one. Then cur = cur.children[c].")}</li>
                <li>{t("끝났으면 cur.is_end = true 표시.", "At end: mark cur.is_end = true.")}</li>
              </ol>
            </div>
            <p className="text-sm font-bold text-emerald-700 text-center">
              {t("핵심: 이미 있는 글자는 재사용. 없는 글자만 새로 만듦.", "Key: reuse existing letters, only create missing ones.")}
            </p>
            <div className="mt-3 bg-amber-50 rounded-lg p-2 border border-amber-200">
              <p className="text-[11px] text-amber-800 leading-relaxed">
                ⏱ <b>{t("시간", "Time")}:</b> O(L) (L = {t("단어 길이", "word length")}). {t("등록된 단어 수와 무관!", "Independent of dictionary size!")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("search('car') — 한 칸씩 따라가기", "search('car') — walk step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("트라이엔 cat, car, card 가 들어있어요.", "Trie holds cat, car, card.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[160px]">
              <div className="font-mono text-xs space-y-1">
                <div className={cn(searchPhase === 0 ? "bg-amber-200 text-amber-900 px-1 rounded font-bold" : "text-gray-700")}>root {searchPhase === 0 && "← 여기"}</div>
                <div style={{ paddingLeft: "18px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    searchPhase === 1 ? "bg-amber-200 text-amber-900 border-2 border-amber-500" : "bg-blue-100 text-blue-700 border border-blue-300",
                  )}>c</span>
                  {searchPhase === 1 && <span className="text-[10px] text-amber-700">{t("← 'c' 자식 있음", "← 'c' child found")}</span>}
                </div>
                <div style={{ paddingLeft: "36px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    searchPhase === 2 ? "bg-amber-200 text-amber-900 border-2 border-amber-500" : "bg-blue-100 text-blue-700 border border-blue-300",
                  )}>a</span>
                  {searchPhase === 2 && <span className="text-[10px] text-amber-700">{t("← 'a' 자식 있음", "← 'a' child found")}</span>}
                </div>
                <div style={{ paddingLeft: "54px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-700 border border-rose-300">t</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                </div>
                <div style={{ paddingLeft: "54px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    searchPhase === 3 ? "bg-emerald-200 text-emerald-900 border-2 border-emerald-500" : "bg-rose-100 text-rose-700 border border-rose-300",
                  )}>r</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                  {searchPhase === 3 && <span className="text-[10px] font-bold text-emerald-700">{t("← 도착! is_end ✓", "← arrived! is_end ✓")}</span>}
                </div>
                <div style={{ paddingLeft: "72px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-700 border border-rose-300">d</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                </div>
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[2.5rem]">
              <p className="text-sm font-mono text-cyan-800">
                {searchPhase === 0 && t("▶ root 에서 시작. 'c' 자식이 있나?", "▶ Start at root. Does it have child 'c'?")}
                {searchPhase === 1 && t("c 노드 도착. 다음 'a'.", "At c. Next: 'a'.")}
                {searchPhase === 2 && t("a 노드 도착. 다음 'r'.", "At a. Next: 'r'.")}
                {searchPhase === 3 && <b className="text-emerald-700">✅ {t("r 도착 — is_end = true → 'car' 발견!", "At r — is_end = true → 'car' found!")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSearchPhase(Math.min(3, searchPhase + 1))} disabled={searchPhase >= 3}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 글자", "Next letter")}
              </button>
              <button onClick={() => setSearchPhase(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-rose-50 rounded-lg p-2 border border-rose-200">
              <p className="text-[11px] text-rose-800 leading-relaxed">
                ⚠️ {t(
                  "만약 'cars' 검색 → r 까지 가서 's' 자식 없음 → false. 'ca' 검색 → 끝 노드 a 가 is_end=false → false (prefix 일 뿐).",
                  "Searching 'cars' → at r no 's' child → false. Searching 'ca' → end node a is is_end=false → false (just a prefix).",
                )}
              </p>
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-2">{t("(현재 위치: ", "(at: ")}{searchSteps[searchPhase]}{t(")", ")")}</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — insert + search", "Code — insert + search")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("두 함수는 거의 같은 골격. 차이는 마지막 한 줄 (is_end 처리).", "Two near-identical functions. Difference is the last line (is_end handling).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def insert(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            cur.children[c] = TrieNode()
        cur = cur.children[c]
    cur.is_end = True          # ← 끝 표시

def search(root, word):
    cur = root
    for c in word:
        if c not in cur.children:
            return False        # ← 자식 없음 즉시 실패
        cur = cur.children[c]
    return cur.is_end          # ← prefix 만이면 False`}
              cpp={`#include <iostream>
#include <unordered_map>
using namespace std;

struct Trie {
    unordered_map<char, Trie*> children;
    bool is_end = false;
};

void insert(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        if (!cur->children.count(c)) cur->children[c] = new Trie();
        cur = cur->children[c];
    }
    cur->is_end = true;          // ← 끝 표시
}

bool search(Trie* root, const string& word) {
    Trie* cur = root;
    for (char c : word) {
        auto it = cur->children.find(c);
        if (it == cur->children.end()) return false;  // 자식 없음
        cur = it->second;
    }
    return cur->is_end;          // ← prefix 만이면 false
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크포인트: insert 는 없는 자식을 만들고, search 는 없는 자식이면 즉시 false. 둘 다 마지막에 is_end 처리.",
                "Checklist: insert creates missing children; search fails on missing children. Both handle is_end at the end.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "트라이에 'apple' 만 들어있다. search('app') 의 결과는?",
              "Trie contains only 'apple'. What does search('app') return?",
            )}
            options={[
              t("true — 'app' 로 가는 길은 존재함", "true — there's a path for 'app'"),
              t("false — 끝 노드의 is_end 가 false 라서", "false — the end node's is_end is false"),
              t("true — apple 의 prefix 이므로", "true — it's a prefix of apple"),
              t("에러 — 'app' 이 트라이에 없음", "error — 'app' isn't in the trie"),
            ]}
            answerIdx={1}
            hint={t(
              "search 는 끝 노드의 is_end == true 여야 true. 'app' 의 두 번째 p 까지 도달은 가능하지만, 그 노드는 apple 의 일부일 뿐 is_end 가 아님.",
              "search needs is_end == true at the end node. We can reach the second p of 'app', but that node is just on the way to apple — its is_end is false.",
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

// ── Chapter 4: Prefix 검색 (autocomplete) ────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Autocomplete simulation: prefix "ca" in {cat, car, card, dog}
  // phase 0: nothing. 1: walked to c. 2: at a. 3: DFS subtree → cat, car, card
  const [acPhase, setAcPhase] = useState(0)
  const acResults = ["cat", "car", "card"]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔍</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("자동완성 — 트라이가 진짜 빛나는 곳", "Autocomplete — where tries truly shine")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-rose-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "사전에 단어 10 만 개. 사용자가 'ca' 타이핑 → 'ca' 로 시작하는 단어 모두 보여줘야 함. 빨라야 함.",
                "Dictionary of 100k words. User types 'ca' → must instantly list all words starting with 'ca'.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-pink-200 mb-3">
              <p className="text-xs font-bold text-pink-800 mb-2">💡 {t("2 단계 풀이", "Two-step solution")}</p>
              <ol className="text-xs text-gray-800 space-y-2 list-decimal list-inside leading-relaxed">
                <li><b>{t("Walk", "Walk")}:</b> {t("prefix 의 각 글자 따라 트라이에서 내려감 — O(|prefix|).", "Walk down the prefix in the trie — O(|prefix|).")}</li>
                <li><b>{t("DFS", "DFS")}:</b> {t("도착한 노드의 서브트리를 모두 순회 — is_end 만날 때마다 단어 수집.", "DFS the entire subtree at that node — every is_end is a word.")}</li>
              </ol>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-xs text-emerald-800 text-center leading-relaxed">
                ⚡ <b>{t("set 으로는?", "With a set?")}</b>{" "}
                {t(
                  "10 만 단어 다 돌면서 prefix 검사 → 너무 느림. 트라이는 prefix 길이 + 결과 크기만큼만 일함.",
                  "You'd scan all 100k words checking prefix — slow. Trie: O(prefix + result-size) only.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("'ca' 자동완성 — 시각화", "'ca' autocomplete — visualize")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("사전: cat, car, card, dog. 사용자가 'ca' 입력.", "Dict: cat, car, card, dog. User types 'ca'.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[180px]">
              <div className="font-mono text-xs space-y-1">
                <div className="text-gray-700">root</div>
                <div style={{ paddingLeft: "18px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    acPhase >= 1 ? "bg-amber-200 text-amber-900 border-2 border-amber-500" : "bg-blue-100 text-blue-700 border border-blue-300",
                  )}>c</span>
                  {acPhase === 1 && <span className="text-[10px] text-amber-700">{t("← step 1: 'c' 따라감", "← step 1: walk to c")}</span>}
                </div>
                <div style={{ paddingLeft: "36px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    acPhase >= 2 ? "bg-amber-200 text-amber-900 border-2 border-amber-500" : "bg-blue-100 text-blue-700 border border-blue-300",
                  )}>a</span>
                  {acPhase === 2 && <span className="text-[10px] text-amber-700">{t("← prefix 끝! 여기서부터 DFS", "← prefix done! DFS from here")}</span>}
                </div>
                <div style={{ paddingLeft: "54px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    acPhase >= 3 ? "bg-emerald-200 text-emerald-800 border-2 border-emerald-500" : "bg-rose-100 text-rose-700 border border-rose-300",
                  )}>t</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                  {acPhase === 3 && <span className="text-[10px] font-bold text-emerald-700">{t("✓ cat", "✓ cat")}</span>}
                </div>
                <div style={{ paddingLeft: "54px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    acPhase >= 3 ? "bg-emerald-200 text-emerald-800 border-2 border-emerald-500" : "bg-rose-100 text-rose-700 border border-rose-300",
                  )}>r</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                  {acPhase === 3 && <span className="text-[10px] font-bold text-emerald-700">{t("✓ car", "✓ car")}</span>}
                </div>
                <div style={{ paddingLeft: "72px" }} className="flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold",
                    acPhase >= 3 ? "bg-emerald-200 text-emerald-800 border-2 border-emerald-500" : "bg-rose-100 text-rose-700 border border-rose-300",
                  )}>d</span>
                  <span className="text-[10px] text-rose-600">●is_end</span>
                  {acPhase === 3 && <span className="text-[10px] font-bold text-emerald-700">{t("✓ card", "✓ card")}</span>}
                </div>
                <div style={{ paddingLeft: "18px" }} className="flex items-center gap-2 opacity-40">
                  <span className="text-gray-400">└─</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-gray-100 text-gray-500 border border-gray-300">d</span>
                  <span className="text-[10px] text-gray-500">{t("(dog — 다른 가지)", "(dog — other branch)")}</span>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-pink-800">
                {acPhase === 0 && t("▶ 'ca' 입력. root 에서 'c' 따라가기 시작.", "▶ Input 'ca'. Start walking from root.")}
                {acPhase === 1 && t("'c' 도착. 다음 'a'.", "At 'c'. Next: 'a'.")}
                {acPhase === 2 && t("'a' 도착 — prefix 끝. 여기 서브트리를 DFS!", "At 'a' — prefix done. DFS the subtree!")}
                {acPhase === 3 && <b className="text-emerald-700">✅ {t("결과: cat, car, card (3 개). dog 는 다른 가지라 안 봐도 됨.", "Result: cat, car, card (3 words). dog never touched.")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setAcPhase(Math.min(3, acPhase + 1))} disabled={acPhase >= 3}
                className="flex-1 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 단계", "Next step")}
              </button>
              <button onClick={() => setAcPhase(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            {acPhase === 3 && (
              <div className="mt-3 bg-emerald-50 rounded-lg p-2 border border-emerald-200">
                <p className="text-[11px] text-emerald-800 text-center">
                  💡 {t("자동완성 답: ", "Autocomplete results: ")}<b>{acResults.join(", ")}</b>
                </p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — prefix 자동완성", "Code — prefix autocomplete")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("Walk 부분은 search 와 같음. 도착한 노드에서 DFS 로 단어 수집.", "Walk part = same as search. Then DFS the subtree to collect words.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def autocomplete(root, prefix):
    cur = root
    # 1) prefix 따라 내려가기
    for c in prefix:
        if c not in cur.children:
            return []           # prefix 매치 X
        cur = cur.children[c]

    # 2) 서브트리 DFS — is_end 만날 때마다 수집
    results = []
    def dfs(node, word):
        if node.is_end:
            results.append(word)
        for c, child in node.children.items():
            dfs(child, word + c)
    dfs(cur, prefix)
    return results

# 사용:
# autocomplete(root, "ca")  →  ["cat", "car", "card"]`}
              cpp={`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

struct Trie {
    unordered_map<char, Trie*> children;
    bool is_end = false;
};

void dfs(Trie* node, string& word, vector<string>& results) {
    if (node->is_end) results.push_back(word);
    for (auto& [c, child] : node->children) {
        word.push_back(c);
        dfs(child, word, results);
        word.pop_back();          // 백트래킹
    }
}

vector<string> autocomplete(Trie* root, const string& prefix) {
    Trie* cur = root;
    for (char c : prefix) {
        auto it = cur->children.find(c);
        if (it == cur->children.end()) return {};
        cur = it->second;
    }
    vector<string> results;
    string word = prefix;
    dfs(cur, word, results);
    return results;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "시간: O(|prefix| + 결과 크기). 사전에 단어가 10 만 개여도 'ca' 로 시작하는 게 3 개면 3 개만큼만 일해요.",
                "Time: O(|prefix| + result size). With 100k words but only 3 matching 'ca', we only do 3 units of work.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "트라이에 단어 100,000 개가 들어있고, prefix 'abc' 로 시작하는 단어가 5 개다. autocomplete('abc') 의 시간복잡도는?",
              "Trie has 100,000 words; 5 start with prefix 'abc'. Time complexity of autocomplete('abc')?",
            )}
            options={[
              "O(100,000)",
              t("O(|prefix| + 결과 크기) ≈ O(3 + 작은 수)", "O(|prefix| + result-size) ≈ O(3 + small)"),
              "O(100,000 × 3)",
              "O(log 100,000)",
            ]}
            answerIdx={1}
            hint={t(
              "트라이는 prefix 만큼 내려간 뒤 매치되는 서브트리만 탐색. 100,000 전체와 무관 — '실제 매치 수' 만큼만 일함.",
              "Trie walks down |prefix| and then DFS only the matching subtree. Independent of 100,000 — only the actual matches matter.",
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

// ── Chapter 5: 정리 ──────────────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 1
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <p className="text-3xl text-center mb-1">👏</p>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "Wave 3 마지막 토픽 완주! 트라이는 자동완성, 사전, IP 라우팅까지 — 문자열이 등장하는 어디서나 쓰여요. 🎉",
                "Last Wave 3 topic done! Tries power autocomplete, dictionaries, even IP routing — anywhere strings appear. 🎉",
              )}
            </p>
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("트라이 = ", "Trie = ")}<b>{t("문자열 트리", "string tree")}</b>. {t("노드 = children + is_end 두 필드.", "Node = children + is_end.")}</li>
              <li><b>2.</b> {t("insert / search 모두 ", "Both insert / search ")}<b>O(L)</b> ({t("L = 단어 길이", "L = word length")}). {t("등록 단어 수와 무관!", "Independent of dictionary size!")}</li>
              <li><b>3.</b> {t("prefix 검색은 ", "Prefix search = ")}<b>{t("walk + DFS 서브트리", "walk + DFS subtree")}</b>. {t("자동완성의 핵심.", "Core of autocomplete.")}</li>
              <li><b>4.</b> {t("공통 prefix 가 많은 단어들 → 메모리 절약. set / dict 보다 효율적인 경우.", "Lots of shared prefixes → memory savings. Where trie beats set/dict.")}</li>
              <li><b className="text-blue-700">{t("💡 더 깊이(참고).", "💡 Going deeper (FYI).")}</b> {t("Binary trie (자식 0/1) 로 XOR 최댓값 같은 비트 문제도 풀 수 있음. 확장형도 풍부 — 이 토픽 본문에선 안 다뤘어요.", "A binary trie (children 0/1) solves XOR-max and similar bit problems. Many variants — not covered in this topic's lessons.")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("문자열 + 검색 + 빠름 → 트라이 떠올리기!", "Strings + lookups + speed → think trie!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 {t("연습 문제 12 개 — 사전 / prefix / 와일드카드 / XOR. ", "12 practice problems — dictionary / prefix / wildcard / XOR. ")}
                <Link href="/algo/trie" className="font-bold underline hover:text-blue-900">{t("바로 가기 →", "Go →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🏆 {t("실전 시간 — USACO 문제로! ", "Real contest time — USACO! ")}
                <Link href="/quests" className="font-bold underline hover:text-purple-900">{t("도전 문제 →", "Quests →")}</Link>
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
              ? <>🎉 {t("트라이 마스터!", "Trie Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function TriePage() {
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
          user_id: user.id, lesson_id: "algo-trie", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-trie")) {
          arr.push("algo-trie")
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
              { label: "트라이", labelEn: "Trie", emoji: "🔤" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🔤</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("트라이 (Trie)", "Trie")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Gold+ 도구", "Gold+ tool")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/trie"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("트라이 문제 12 개 — 사전 / 자동완성 / 와일드카드 / XOR!", "12 trie challenges — dict / autocomplete / wildcard / XOR!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("트라이 마스터!", "Trie Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/trie" className="block px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-sm text-center border-2 border-blue-200">
                🔤 {t("트라이 문제 12 개 풀기", "12 trie problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("알고리즘 지도", "Algo map")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
