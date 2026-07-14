"use client"

/**
 * 트리 (Tree) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — 재귀를 자료구조로 끌어올리는 토픽.
 * 부모/자식 관계 비유 → 표현법 → 순회 4 종 → 트리 DP → 정리.
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
  { id: 1, emoji: "🌳", title: "왜 트리?",          titleEn: "Why Tree?",            mins: 4 },
  { id: 2, emoji: "🔢", title: "트리 표현",         titleEn: "Representing Trees",   mins: 5 },
  { id: 3, emoji: "🚶", title: "트리 순회",         titleEn: "Tree Traversals",      mins: 8 },
  { id: 4, emoji: "💡", title: "트리 DP",           titleEn: "Tree DP",              mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",       titleEn: "Recap & Practice",     mins: 5 },
]

const STORAGE_KEY = "algo-tree-chapter"

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

// ── Chapter 1: 왜 트리? — 가족/조직 비유 + 일반 트리 vs 이진 트리 ───
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌳</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("트리는 '관계' 자료구조", "Tree = relationships")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("비유 1", "Analogy 1")}:</b>{" "}
              {t(
                "가족 트리. 할아버지 한 명 → 자식 둘 → 또 손자들. 거꾸로 매단 나무처럼 위에서 아래로 갈수록 가지가 퍼져요.",
                "Family tree. One grandparent → two kids → grandkids. Like an upside-down tree branching downward.",
              )}
            </p>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("비유 2", "Analogy 2")}:</b>{" "}
              {t(
                "회사 조직도. CEO 한 명 → 부장 여러 명 → 팀장 → 직원. 위는 하나, 아래는 여러 개.",
                "Org chart. One CEO → several VPs → managers → employees. One above, many below.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 mb-1">📌 {t("용어", "Terms")}</p>
              <ul className="text-xs text-gray-700 space-y-1 leading-relaxed">
                <li>• <b>{t("노드 (node)", "node")}</b> — {t("동그라미 하나. 사람 한 명.", "one circle. One person.")}</li>
                <li>• <b>{t("부모 (parent)", "parent")}</b> — {t("위에서 연결된 노드.", "node connected from above.")}</li>
                <li>• <b>{t("자식 (child)", "child")}</b> — {t("아래로 연결된 노드.", "node connected below.")}</li>
                <li>• <b>{t("루트 (root)", "root")}</b> — {t("가장 위, 부모 없음.", "top, no parent.")}</li>
                <li>• <b>{t("리프 (leaf)", "leaf")}</b> — {t("가장 아래, 자식 없음.", "bottom, no children.")}</li>
              </ul>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔁</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("일반 트리 vs 이진 트리", "General tree vs Binary tree")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                <p className="text-sm font-black text-blue-800 mb-1">
                  🌳 {t("일반 트리", "General tree")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "한 부모가 자식을 *몇 명이든* 가질 수 있어요. 폴더 구조, 파일시스템, 조직도, 가족 트리.",
                    "A parent can have *any number* of children. File systems, org charts, family trees.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⚖️ {t("이진 트리 (binary tree)", "Binary tree")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "각 노드는 *왼쪽 / 오른쪽* 자식만 가질 수 있어요. 최대 2 명. 표현/순회가 단순해 알고리즘에서 가장 많이 쓰는 형태.",
                    "Each node has only *left / right* child — at most 2. Simplest to represent/traverse, used most often.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                💡 <b>{t("재귀랑 친구", "Friends with recursion")}:</b>{" "}
                {t(
                  "트리 = '루트 + 작은 트리 여러 개'. 같은 모양이 반복돼요 — 재귀로 푸는 게 자연스러워요.",
                  "Tree = 'root + smaller trees'. Same shape repeats — recursion is the natural fit.",
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
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩.", "Preview — next chapters cover each.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔢 1. {t("트리를 코드로 표현", "Represent tree in code")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "인접 리스트, parent 배열, left/right 배열. (챕터 2)",
                    "Adjacency list, parent array, left/right arrays. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🚶 2. {t("트리 순회 — 4 가지 방식", "Traversals — 4 styles")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "preorder / inorder / postorder / level-order. 같은 트리, 다른 순서. (챕터 3)",
                    "preorder / inorder / postorder / level-order. Same tree, different orders. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  💡 3. {t("트리 DP — 자식 → 부모", "Tree DP — child → parent")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "서브트리 합/크기/높이 계산. 자식의 답으로 부모 답 만들기. (챕터 4)",
                    "Compute subtree sums/sizes/heights. Build parent answer from children. (Ch 4)",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("천천히 가요. 다음 챕터부터! →", "Slowly. Onward! →")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: 트리 표현 ─────────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 6
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 5-node tree visualization
  //       1
  //      / \
  //     2   3
  //    / \
  //   4   5
  const [highlight, setHighlight] = useState<number | null>(null)
  const adj: Record<number, number[]> = { 1: [2, 3], 2: [1, 4, 5], 3: [1], 4: [2], 5: [2] }
  const parent: Record<number, number> = { 1: 0, 2: 1, 3: 1, 4: 2, 5: 2 }
  const positions: Record<number, { x: number; y: number }> = {
    1: { x: 150, y: 30 }, 2: { x: 80, y: 90 }, 3: { x: 220, y: 90 },
    4: { x: 40, y: 150 }, 5: { x: 120, y: 150 },
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔢</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("인접 리스트 — 가장 흔한 표현", "Adjacency list — most common")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "각 노드마다 '나랑 연결된 노드들' 의 리스트. 그래프와 똑같지만, 트리는 '간선 N-1 개 + 사이클 없음'.",
                "For each node, a list of 'nodes connected to me'. Same as graph but tree = N-1 edges + no cycles.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">📌 {t("입력 형식", "Input format")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`5            ← 노드 수 N
1 2          ← 간선: 1 과 2 연결
1 3
2 4
2 5`}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "양방향으로 저장해요: adj[1] = [2, 3], adj[2] = [1, 4, 5], ...",
                  "Store both directions: adj[1] = [2, 3], adj[2] = [1, 4, 5], ...",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("간선 한 줄당 양쪽 push_back — 끝.", "One edge line → push_back both ways — done.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-violet-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌉</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("표현은 두 가지 — 헷갈리지 말기", "Two representations — don't mix them up")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "트리를 코드로 담는 방법은 크게 두 갈래예요. 문제마다 어느 쪽인지 먼저 확인하세요.",
                "There are two main ways to store a tree in code. Always check which one a problem uses first.",
              )}
            </p>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                <p className="text-sm font-black text-blue-800 mb-1">
                  🌳 ① {t("일반 트리 — children[] 인접 리스트", "General tree — children[] adjacency list")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed mb-1">
                  {t(
                    "자식 수 제한 없음. adj[u] = u 에 연결된 노드들. (앞 슬라이드에서 본 것)",
                    "Any number of children. adj[u] = nodes linked to u. (the slide you just saw)",
                  )}
                </p>
                <code className="text-[11px] text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded">adj[1] = [2, 3], adj[2] = [1, 4, 5]</code>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  ⚖️ ② {t("이진 트리 — left[] / right[]", "Binary tree — left[] / right[]")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed mb-1">
                  {t(
                    "자식이 최대 2 명. left[u], right[u] 에 왼/오 자식 번호. 없으면 0.",
                    "At most 2 children. left[u], right[u] hold left/right child id. 0 if none.",
                  )}
                </p>
                <code className="text-[11px] text-purple-900 bg-purple-50 px-1.5 py-0.5 rounded">left[1] = 2, right[1] = 3</code>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border-2 border-amber-300">
              <p className="text-xs text-amber-900 leading-relaxed">
                👉 <b>{t("이 토픽 순회 예제는 이진 트리(left/right) 기준이에요.", "This topic's traversal examples use the binary tree (left/right) form.")}</b>{" "}
                {t(
                  "챕터 3 순회 코드의 preorder/inorder/postorder 는 left[u], right[u] 를 따라가요. 인접 리스트는 입력 읽기·트리 DP(챕터 4)에서 다시 등장해요.",
                  "Chapter 3's preorder/inorder/postorder follow left[u], right[u]. The adjacency list reappears for reading input and tree DP (Ch 4).",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("5 노드 트리 — 클릭해 보기", "5-node tree — click around")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("노드 클릭 → 그 노드의 부모와 자식이 보여요.", "Click a node → see its parent + children.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 flex justify-center">
              <svg width="280" height="190" className="overflow-visible">
                {/* edges */}
                <line x1="150" y1="30" x2="80" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="150" y1="30" x2="220" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="40" y2="150" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="120" y2="150" stroke="#9ca3af" strokeWidth="2" />
                {/* nodes */}
                {Object.entries(positions).map(([id, pos]) => {
                  const n = Number(id)
                  const isSelected = highlight === n
                  const isParent = highlight !== null && parent[highlight] === n
                  const isChild = highlight !== null && adj[highlight]?.includes(n) && parent[highlight] !== n
                  return (
                    <g key={id} onClick={() => setHighlight(n)} style={{ cursor: "pointer" }}>
                      <circle cx={pos.x} cy={pos.y} r="18"
                        fill={isSelected ? "#10b981" : isParent ? "#f59e0b" : isChild ? "#3b82f6" : "#e5e7eb"}
                        stroke={isSelected ? "#047857" : "#6b7280"} strokeWidth="2" />
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                        fill={isSelected || isParent || isChild ? "white" : "#1f2937"}
                        fontSize="14" fontWeight="bold">{n}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center min-h-[3.5rem]">
              {highlight === null ? (
                <p className="text-sm text-emerald-800 font-mono">{t("노드를 클릭해 보세요!", "Click a node!")}</p>
              ) : (
                <div className="text-sm font-mono">
                  <p className="text-emerald-800">
                    <b>{t("선택", "Selected")}:</b> {highlight}
                  </p>
                  <p className="text-amber-700 text-xs">
                    <b>{t("부모", "Parent")}:</b> {parent[highlight] === 0 ? t("(루트 — 없음)", "(root — none)") : parent[highlight]}
                  </p>
                  <p className="text-blue-700 text-xs">
                    <b>{t("자식", "Children")}:</b>{" "}
                    {adj[highlight].filter(x => x !== parent[highlight]).length === 0
                      ? t("(리프 — 없음)", "(leaf — none)")
                      : adj[highlight].filter(x => x !== parent[highlight]).join(", ")}
                  </p>
                </div>
              )}
            </div>
            <button onClick={() => setHighlight(null)}
              className="mt-2 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs">
              ↺ {t("리셋", "Reset")}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 트리 입력 + 인접 리스트", "Code — read tree + adjacency list")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("간선 N-1 개 읽기 → 양방향 push. 이진 트리는 left[], right[] 배열로.", "Read N-1 edges → push both ways. Binary tree uses left[], right[] arrays.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]  # 1-indexed
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)        # ← 양방향!

# 이진 트리는 left/right 분리
left = [0] * (n + 1)
right = [0] * (n + 1)
# 예: left[1] = 2; right[1] = 3`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;     // 일반 트리

// 이진 트리는 분리
vector<int> leftCh, rightCh;

int main() {
    cin >> N;
    adj.assign(N + 1, {});
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);    // ← 양방향!
    }
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "핵심: 양방향 저장. 그래야 어느 노드에서든 자식을 찾을 수 있어요. (parent 만 빼고.)",
                "Key: store both directions. Then from any node, you can find children (just skip parent).",
              )}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📏</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("깊이(depth) vs 높이(height)", "Depth vs Height")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-teal-200">
                <p className="text-sm font-black text-teal-800 mb-1">
                  ⬇️ {t("깊이 (depth)", "depth")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "루트에서 그 노드까지의 간선 수. 루트 = 0, 한 칸 내려갈 때마다 +1. '위에서 얼마나 내려왔나'.",
                    "Number of edges from the root down to that node. Root = 0, +1 per step down. 'How far down from the top'.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-1">
                  ⬆️ {t("높이 (height)", "height")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "그 노드에서 가장 깊은 잎(leaf)까지의 간선 수. 리프 = 0. '아래로 얼마나 더 갈 수 있나'.",
                    "Number of edges from that node down to its deepest leaf. Leaf = 0. 'How far down it can still go'.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-teal-200 mb-3">
              <p className="text-xs font-bold text-teal-800 mb-2">📌 {t("높이는 재귀로 (postorder!)", "Height via recursion (postorder!)")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{t(
`height(node):
    리프면 → 0
    아니면 → 1 + max(자식들의 height)`,
`height(node):
    if leaf  → 0
    else     → 1 + max(height of each child)`,
)}
              </pre>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                💡 {t(
                  "높이도 '자식부터 → 부모' 라 챕터 4 트리 DP 랑 똑같은 모양이에요. max(자식 height) + 1.",
                  "Height is also 'children → parent', the same shape as Ch 4 tree DP. max(child height) + 1.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <MiniQuiz
            question={t(
              "N = 5 인 트리에 간선은 몇 개?",
              "Tree with N = 5 nodes — how many edges?",
            )}
            options={["3", "4", "5", "10"]}
            answerIdx={1}
            hint={t(
              "트리의 핵심 성질: 노드 N 개면 간선 N-1 개. 사이클이 없으니까!",
              "Key property: tree with N nodes has N-1 edges. No cycles!",
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

// ── Chapter 3: 트리 순회 ─────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Same 5-node binary tree
  //       1
  //      / \
  //     2   3
  //    / \
  //   4   5
  // Pre: 1 2 4 5 3
  // In:  4 2 5 1 3
  // Post:4 5 2 3 1
  // BFS: 1 2 3 4 5
  const orders = {
    pre: [1, 2, 4, 5, 3],
    in: [4, 2, 5, 1, 3],
    post: [4, 5, 2, 3, 1],
    bfs: [1, 2, 3, 4, 5],
  }
  const [mode, setMode] = useState<"pre" | "in" | "post" | "bfs">("pre")
  const [tIdx, setTIdx] = useState(0)
  const positions: Record<number, { x: number; y: number }> = {
    1: { x: 150, y: 30 }, 2: { x: 80, y: 90 }, 3: { x: 220, y: 90 },
    4: { x: 40, y: 150 }, 5: { x: 120, y: 150 },
  }
  const order = orders[mode]
  const visited = order.slice(0, tIdx)
  const tStep = () => { if (tIdx < order.length) setTIdx(tIdx + 1) }
  const tReset = () => setTIdx(0)
  const modeReset = (m: typeof mode) => { setMode(m); setTIdx(0) }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🚶</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("트리 순회 — 4 가지 방식", "Tree traversals — 4 ways")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "같은 트리, 다른 순서로 방문. '나' 를 *언제* 처리하느냐가 다 다른 거예요.",
                "Same tree, different visit orders. The difference is *when* you process 'me'.",
              )}
            </p>
            <div className="space-y-2 mb-3">
              <div className="bg-white rounded-lg p-2 border-2 border-emerald-200">
                <p className="text-xs font-black text-emerald-800">🟢 Preorder (전위): <code>나 → 왼 → 오</code></p>
                <p className="text-[11px] text-gray-700">{t("부모부터 — 트리 복사할 때.", "Parent first — for copying a tree.")}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border-2 border-blue-200">
                <p className="text-xs font-black text-blue-800">🔵 Inorder (중위): <code>왼 → 나 → 오</code></p>
                <p className="text-[11px] text-gray-700">{t("이진 탐색 트리면 정렬 순서!", "On a BST → sorted order!")}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border-2 border-purple-200">
                <p className="text-xs font-black text-purple-800">🟣 Postorder (후위): <code>왼 → 오 → 나</code></p>
                <p className="text-[11px] text-gray-700">{t("자식부터 — 트리 DP 의 기본!", "Children first — basis of tree DP!")}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border-2 border-rose-200">
                <p className="text-xs font-black text-rose-800">🌸 Level order (BFS): <code>위에서 아래</code></p>
                <p className="text-[11px] text-gray-700">{t("층별로 왼→오. 큐 사용.", "Level by level, left→right. Uses a queue.")}</p>
              </div>
            </div>
            <p className="text-xs text-amber-700 text-center font-bold">
              {t("Pre/In/Post = DFS (재귀). Level = BFS (큐).", "Pre/In/Post = DFS (recursion). Level = BFS (queue).")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("같은 트리, 4 방식 직접 비교", "Same tree, compare 4 styles")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("위에서 방식 골라 → ▶ 스텝.", "Pick a style above → ▶ Step.")}
            </p>
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {[
                { k: "pre" as const, label: "Pre" },
                { k: "in" as const, label: "In" },
                { k: "post" as const, label: "Post" },
                { k: "bfs" as const, label: "BFS" },
              ].map(m => (
                <button key={m.k} onClick={() => modeReset(m.k)}
                  className={cn("px-3 py-1 rounded-full text-xs font-bold border-2 transition-all",
                    mode === m.k ? "bg-amber-500 border-amber-600 text-white" : "bg-white border-gray-300 text-gray-700 hover:border-amber-400")}>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 flex justify-center">
              <svg width="280" height="190" className="overflow-visible">
                <line x1="150" y1="30" x2="80" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="150" y1="30" x2="220" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="40" y2="150" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="120" y2="150" stroke="#9ca3af" strokeWidth="2" />
                {Object.entries(positions).map(([id, pos]) => {
                  const n = Number(id)
                  const visitedIdx = visited.indexOf(n)
                  const isCurrent = tIdx > 0 && order[tIdx - 1] === n
                  return (
                    <g key={id}>
                      <circle cx={pos.x} cy={pos.y} r="18"
                        fill={isCurrent ? "#f59e0b" : visitedIdx >= 0 ? "#10b981" : "#e5e7eb"}
                        stroke={isCurrent ? "#b45309" : "#6b7280"} strokeWidth="2" />
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                        fill={isCurrent || visitedIdx >= 0 ? "white" : "#1f2937"}
                        fontSize="14" fontWeight="bold">{n}</text>
                      {visitedIdx >= 0 && (
                        <text x={pos.x + 22} y={pos.y - 12} textAnchor="middle"
                          fill="#10b981" fontSize="10" fontWeight="bold">#{visitedIdx + 1}</text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-amber-800">
                <b>{t("방문 순서", "Visit order")}:</b> {visited.length === 0 ? t("(시작 전)", "(not started)") : visited.join(" → ")}
              </p>
              {tIdx === order.length && (
                <p className="text-xs text-emerald-700 mt-1 font-bold">✅ {t("완료!", "Done!")}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={tStep} disabled={tIdx >= order.length}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={tReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 4 가지 순회", "Code — 4 traversals")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("DFS 3 종류는 print 위치만 다름. BFS 는 큐 사용.", "DFS 3 styles differ only by print position. BFS uses a queue.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`from collections import deque

# 이진 트리: left[], right[] 배열 사용
def preorder(u):
    if u == 0: return
    print(u, end=' ')      # ← 나
    preorder(left[u])      # 왼
    preorder(right[u])     # 오

def inorder(u):
    if u == 0: return
    inorder(left[u])
    print(u, end=' ')      # ← 나 (가운데)
    inorder(right[u])

def postorder(u):
    if u == 0: return
    postorder(left[u])
    postorder(right[u])
    print(u, end=' ')      # ← 나 (마지막)

def bfs(root):
    q = deque([root])
    while q:
        u = q.popleft()
        print(u, end=' ')
        if left[u]:  q.append(left[u])
        if right[u]: q.append(right[u])`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

vector<int> leftCh, rightCh;

void preorder(int u) {
    if (u == 0) return;
    cout << u << ' ';            // 나
    preorder(leftCh[u]);
    preorder(rightCh[u]);
}

void inorder(int u) {
    if (u == 0) return;
    inorder(leftCh[u]);
    cout << u << ' ';            // 나 (가운데)
    inorder(rightCh[u]);
}

void postorder(int u) {
    if (u == 0) return;
    postorder(leftCh[u]);
    postorder(rightCh[u]);
    cout << u << ' ';            // 나 (마지막)
}

void bfs(int root) {
    queue<int> q;
    q.push(root);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << ' ';
        if (leftCh[u])  q.push(leftCh[u]);
        if (rightCh[u]) q.push(rightCh[u]);
    }
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "암기 팁: '나' (print) 의 위치만 외우면 끝. 앞 = pre, 가운데 = in, 뒤 = post.",
                "Memo tip: just remember where 'me' (print) sits. Front = pre, middle = in, back = post.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "위 트리(1을 루트로, 자식 2,3 / 2의 자식 4,5)의 *postorder* 결과는?",
              "Same tree (root 1, children 2,3 / 2's children 4,5) — postorder result?",
            )}
            options={[
              "1 2 4 5 3",
              "4 2 5 1 3",
              "4 5 2 3 1",
              "1 2 3 4 5",
            ]}
            answerIdx={2}
            hint={t(
              "Postorder = 왼 → 오 → 나. 자식부터 다 처리 후 부모. 리프 4, 5 먼저 → 부모 2 → 3 → 마지막 1.",
              "Postorder = left → right → me. Process children first. Leaves 4, 5 first → parent 2 → 3 → finally 1.",
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

// ── Chapter 4: 트리 DP ──────────────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // Subtree node count visualization
  // Tree:    1
  //         / \
  //        2   3
  //       / \
  //      4   5
  // size[4] = 1, size[5] = 1, size[2] = 3, size[3] = 1, size[1] = 5
  // Postorder visit order: 4, 5, 2, 3, 1
  const dpOrder = [4, 5, 2, 3, 1]
  const sizes: Record<number, number> = { 1: 5, 2: 3, 3: 1, 4: 1, 5: 1 }
  const [dpIdx, setDpIdx] = useState(0)
  const dpStep = () => { if (dpIdx < dpOrder.length) setDpIdx(dpIdx + 1) }
  const dpReset = () => setDpIdx(0)
  const computed = new Set(dpOrder.slice(0, dpIdx))
  const positions: Record<number, { x: number; y: number }> = {
    1: { x: 150, y: 30 }, 2: { x: 80, y: 90 }, 3: { x: 220, y: 90 },
    4: { x: 40, y: 150 }, 5: { x: 120, y: 150 },
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">💡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("트리 DP — 자식 답으로 부모 답", "Tree DP — child answers → parent answer")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("아이디어", "Idea")}:</b>{" "}
              {t(
                "각 노드에 대해 '내 서브트리에 대한 답' 을 계산. 자식의 답을 받아서 합치면 내 답.",
                "For each node, compute 'answer for my subtree'. Take children's answers, combine → my answer.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">📌 {t("예: 서브트리 노드 수", "Example: subtree node count")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`size(u) = 1 + Σ size(child)
                 ↑
                자식들의 답을 합쳐서 +1 (자기 자신)

리프 (자식 없음) → size = 1
내부 노드 → 1 + (자식들의 size 합)`}
              </pre>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                ⚡ <b>{t("핵심", "Key")}:</b>{" "}
                {t(
                  "Postorder! 자식 다 끝낸 *후* 내가 처리. 재귀가 자연스럽게 처리해줘요 — 호출이 자식부터 반환되니까.",
                  "Postorder! Process me *after* my children. Recursion does this naturally — calls return from leaves up.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("서브트리 크기 — 자식부터 계산", "Subtree size — bottom-up")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("리프부터 시작 → 위로. 자식 size 합 + 1 = 내 size.", "Start from leaves → up. My size = sum of children's sizes + 1.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 flex justify-center">
              <svg width="280" height="190" className="overflow-visible">
                <line x1="150" y1="30" x2="80" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="150" y1="30" x2="220" y2="90" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="40" y2="150" stroke="#9ca3af" strokeWidth="2" />
                <line x1="80" y1="90" x2="120" y2="150" stroke="#9ca3af" strokeWidth="2" />
                {Object.entries(positions).map(([id, pos]) => {
                  const n = Number(id)
                  const isComputed = computed.has(n)
                  const isCurrent = dpIdx > 0 && dpOrder[dpIdx - 1] === n
                  return (
                    <g key={id}>
                      <circle cx={pos.x} cy={pos.y} r="18"
                        fill={isCurrent ? "#f59e0b" : isComputed ? "#10b981" : "#e5e7eb"}
                        stroke={isCurrent ? "#b45309" : "#6b7280"} strokeWidth="2" />
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                        fill={isCurrent || isComputed ? "white" : "#1f2937"}
                        fontSize="14" fontWeight="bold">{n}</text>
                      {isComputed && (
                        <text x={pos.x + 26} y={pos.y + 4} textAnchor="start"
                          fill="#059669" fontSize="11" fontWeight="bold">size={sizes[n]}</text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-emerald-800">
                {dpIdx === 0 && t("시작 — 리프부터 size 계산", "Start — compute size from leaves")}
                {dpIdx > 0 && dpIdx < dpOrder.length && (
                  <>
                    <b>size({dpOrder[dpIdx - 1]}) = {sizes[dpOrder[dpIdx - 1]]}</b>
                    {dpOrder[dpIdx - 1] === 2 && t(" (1 + size(4) + size(5) = 1+1+1)", " (1 + size(4) + size(5))")}
                    {dpOrder[dpIdx - 1] === 1 && t(" (1 + size(2) + size(3) = 1+3+1)", " (1 + size(2) + size(3))")}
                  </>
                )}
                {dpIdx === dpOrder.length && (
                  <b className="text-emerald-700">✅ {t("전체 size 계산 완료! 루트 size = 5", "All sizes done! Root size = 5")}</b>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={dpStep} disabled={dpIdx >= dpOrder.length}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 노드", "Next node")}
              </button>
              <button onClick={dpReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 서브트리 크기 + 합", "Code — subtree size + sum")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("postorder 패턴: 자식 먼저 재귀 → 결과 합치고 내 답 계산.", "Postorder pattern: recurse on children first → combine → compute mine.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import sys
sys.setrecursionlimit(200000)

# adj: 일반 트리 인접 리스트, val[u] = 노드 u 의 값
size = [0] * (n + 1)
subtree_sum = [0] * (n + 1)

def dfs(u, parent):
    size[u] = 1                    # 나 자신 1
    subtree_sum[u] = val[u]
    for v in adj[u]:
        if v == parent: continue   # 부모 방향 X
        dfs(v, u)                  # ← 자식 먼저!
        size[u] += size[v]         # 자식 답 합치기
        subtree_sum[u] += subtree_sum[v]

dfs(1, 0)   # 루트 1, 부모 없음 (0 표시)
# size[1] = 전체 노드 수
# subtree_sum[1] = 모든 노드 값의 합`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> adj;
vector<int> val, sz, subSum;

void dfs(int u, int parent) {
    sz[u] = 1;                     // 나 자신 1
    subSum[u] = val[u];
    for (int v : adj[u]) {
        if (v == parent) continue;
        dfs(v, u);                 // ← 자식 먼저!
        sz[u] += sz[v];            // 자식 답 합치기
        subSum[u] += subSum[v];
    }
}

int main() {
    // ... 입력 후
    dfs(1, 0);
    // sz[1] = 전체, subSum[1] = 전체 합
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "공식: f(u) = combine( f(v) for v in children(u) ) + (나의 기여). 거의 모든 트리 DP 가 이 모양.",
                "Formula: f(u) = combine( f(v) for v in children(u) ) + (my contribution). Nearly all tree DP.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "트리 DP 에서 가장 자연스러운 순회 방식은?",
              "Most natural traversal for tree DP?",
            )}
            options={[
              t("Preorder (전위) — 부모부터", "Preorder — parent first"),
              t("Inorder (중위) — 왼-나-오", "Inorder — left-me-right"),
              t("Postorder (후위) — 자식부터", "Postorder — children first"),
              t("BFS (level order) — 층별", "BFS — level by level"),
            ]}
            answerIdx={2}
            hint={t(
              "자식의 답으로 부모 답을 만드니까 — 자식 먼저 끝나야 해요. 그게 postorder!",
              "Parent answer is built from child answers → children must finish first. That's postorder!",
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
  const totalSteps = 1
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <p className="text-sm font-bold text-emerald-700 text-center mb-3">
              {t("트리는 재귀의 가장 자연스러운 무대예요. 잘 했어요! 🎉", "Trees are recursion's natural stage. Nice work! 🎉")}
            </p>
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("트리 = 노드 N 개 + 간선 N-1 개 + 사이클 없음.", "Tree = N nodes + N-1 edges + no cycles.")}</li>
              <li><b>2.</b> {t("표현: ", "Representations: ")}<b>{t("인접 리스트", "adjacency list")}</b> {t("(양방향) 또는 ", "(both ways) or ")}<b>left/right</b> {t("배열 (이진 트리).", "arrays (binary tree).")}</li>
              <li><b>3.</b> {t("순회 4 종: pre/in/post = DFS, level = BFS. '나' 의 위치만 달라요.", "4 traversals: pre/in/post = DFS, level = BFS. Only 'me' position differs.")}</li>
              <li><b>4.</b> {t("트리 DP = ", "Tree DP = ")}<b>{t("postorder", "postorder")}</b>. {t("자식 답으로 부모 답 만들기.", "Build parent answer from children.")}</li>
              <li><b>5.</b> {t("재귀 깊이 주의 — Python 은 ", "Mind recursion depth — Python ")}<code className="bg-white px-1 rounded text-xs">sys.setrecursionlimit</code> {t("필수.", "required.")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("트리는 그래프의 '쉬운 친구' — 다음은 그래프 (BFS/DFS)!", "Tree is graph's 'easy friend' — next: graphs (BFS/DFS)!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                🏆 {t("문제 풀러 가기 — 트리 12 문제 (DFS, BFS, 트리 DP). ", "Go practice — 12 tree problems (DFS, BFS, tree DP). ")}
                <Link href="/algo/tree" className="font-bold underline hover:text-emerald-900">{t("연습 →", "Practice →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음 토픽 — 그래프, BFS/DFS. ", "Next topic — graph, BFS/DFS. ")}
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-2.5">
        <div className="max-w-md mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-lg font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => step < totalSteps - 1 ? setStep(step + 1) : onComplete()}
            className="flex-[2] py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95">
            {step === totalSteps - 1
              ? <>🎉 {t("트리 마스터!", "Tree Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function TreePage() {
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
          user_id: user.id, lesson_id: "algo-tree", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-tree")) {
          arr.push("algo-tree")
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
              { label: "트리", labelEn: "Tree", emoji: "🌳" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🌳</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("트리", "Tree")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Gold+", "Gold+")}</span>
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
            <Link href="/algo/tree"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("트리 문제 12 개 — 손으로 그려가며!", "12 tree challenges — draw the tree!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("트리 마스터!", "Tree Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/tree" className="block px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm text-center border-2 border-emerald-200">
                🌳 {t("트리 문제 12 — 풀러 가기", "12 tree problems — go solve")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (그래프)", "Next topic (graph)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
