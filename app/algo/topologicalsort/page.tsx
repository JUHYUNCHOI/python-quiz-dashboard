"use client"

/**
 * 위상 정렬 (Topological Sort) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — DAG 위에서 "선행 → 후행" 순서를 뽑아내는 도구.
 * 비유 (수업 선수 과목) → in-degree (Kahn's) → DFS post-order 역순 → 사이클 검출 → 정리.
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
  { id: 1, emoji: "📐", title: "왜 위상 정렬?",        titleEn: "Why Topological Sort?",  mins: 4 },
  { id: 2, emoji: "🔢", title: "in-degree 기반 (Kahn's)", titleEn: "In-degree (Kahn's)",     mins: 7 },
  { id: 3, emoji: "🌳", title: "DFS 기반",              titleEn: "DFS-based",              mins: 6 },
  { id: 4, emoji: "🔁", title: "사이클 검출",            titleEn: "Cycle Detection",        mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",            titleEn: "Recap & Side path",      mins: 5 },
]

const STORAGE_KEY = "algo-topologicalsort-chapter"

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

// ── Chapter 1: 왜 위상 정렬? ─────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("선행 → 후행 순서 뽑기", "Pulling out prerequisite order")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "고등학교 수업표 짤 때 — 수학 1 안 들으면 수학 2 못 듣고, 영어 1 안 들으면 영어 2 못 듣잖아요? '뭘 먼저 들어야 하는지' 정해진 *순서* 가 있어요.",
                "Like a class schedule — can't take Math 2 without Math 1, can't take English 2 without English 1. There's a *prerequisite order*.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-1">💡 {t("위상 정렬 = ", "Topological sort = ")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "선행 조건이 모두 끝난 작업부터 차례대로 줄 세우기. 같은 결과가 여러 개일 수 있어요 — 어떤 순서든 *선행이 먼저* 면 OK.",
                  "Line up tasks so each task comes after all its prerequisites. There can be multiple valid orders — any with prerequisites first is OK.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center">
              {t("쓰임: 컴파일 빌드 순서, 강의 시간표, 작업 스케줄러 ...", "Used in: build order, course schedules, task schedulers ...")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("전제 — DAG 만 됨", "Prerequisite — DAG only")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  ✅ {t("Directed — 방향 있는 그래프", "Directed — has arrows")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "A → B 와 B → A 는 다른 의미 (A 가 B 의 선행).",
                    "A → B and B → A mean different things (A is prerequisite for B).",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-1">
                  ✅ {t("Acyclic — 사이클 없음", "Acyclic — no cycles")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "A → B → C → A 면 \"누구를 먼저 듣지?\" 답이 없어요. 닭이 먼저냐 달걀이 먼저냐.",
                    "If A → B → C → A — \"who goes first?\" has no answer. Chicken-and-egg.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-rose-800 leading-relaxed">
                ⚠️ <b>{t("DAG 아니면? ", "Not a DAG? ")}</b>
                {t(
                  "위상 정렬 불가능. 사이클 검출이 답으로 나옴 — 챕터 4 에서 다뤄요.",
                  "Topological sort impossible. Instead, you detect the cycle — covered in Ch 4.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("두 가지 풀이법", "Two approaches")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("어느 쪽을 골라도 답은 같아요 (여러 답 중 하나).", "Either works — both give a valid order.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔢 1. {t("in-degree 기반 (Kahn's)", "In-degree (Kahn's)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "선행이 0 개인 노드부터 큐에 넣고 하나씩 꺼냄. *반복문 + 큐* — 가장 직관적. (챕터 2)",
                    "Push nodes with 0 in-degree to a queue, pop one by one. *Loop + queue* — most intuitive. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌳 2. {t("DFS 기반 — post-order 역순", "DFS — reverse post-order")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "재귀로 끝까지 들어갔다가 *끝나는 순서* 의 역으로 줄세움. (챕터 3)",
                    "Recurse to leaves, then *reverse* the finish order. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔁 3. {t("사이클 검출 — 부산물", "Cycle detection — bonus")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "둘 다 사이클이 있는지도 동시에 알려줘요. (챕터 4)",
                    "Both methods also tell you whether a cycle exists. (Ch 4)",
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: in-degree 기반 (Kahn's) ───────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 인터랙티브 7 노드 DAG
  // 노드: 1..7
  // 에지: 1→2, 1→3, 2→4, 3→4, 3→5, 4→6, 5→6, 6→7
  // 초기 in-degree: 1:0, 2:1, 3:1, 4:2, 5:1, 6:2, 7:1
  // 처리 순서 (Kahn's, 같은 단계에서 작은 번호 우선): 1 → 2 → 3 → 4 → 5 → 6 → 7
  const edges: [number, number][] = [
    [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7],
  ]
  const initialIndeg: Record<number, number> = { 1: 0, 2: 1, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1 }
  // 처리 순서 한 단계씩 (Kahn's 큐에서 꺼낸 노드 순서)
  const removalOrder = [1, 2, 3, 4, 5, 6, 7]
  const [phase, setPhase] = useState(0) // 0 = 시작 전, 1..7 = removalOrder[phase-1] 처리됨

  // phase 시점에서 in-degree 와 처리완료 노드 계산
  const processed = removalOrder.slice(0, phase)
  const indeg: Record<number, number> = { ...initialIndeg }
  for (const removed of processed) {
    for (const [u, v] of edges) {
      if (u === removed) indeg[v] -= 1
    }
  }

  const phaseStep = () => { if (phase < 7) setPhase(phase + 1) }
  const phaseReset = () => setPhase(0)

  // 7 노드 좌표 (간단 격자 배치)
  const nodePos: Record<number, [number, number]> = {
    1: [40, 30],
    2: [120, 70],
    3: [120, 130],
    4: [220, 100],
    5: [220, 170],
    6: [320, 140],
    7: [400, 140],
  }

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔢</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("Kahn's 알고리즘 — 3 단계", "Kahn's algorithm — 3 steps")}
            </h3>
            <div className="space-y-2 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800">
                  1️⃣ {t("진입 차수 (in-degree) 세기", "Count in-degree")}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {t(
                    "각 노드마다 '나를 향한 화살표 개수'. 선행이 몇 개인지.",
                    "For each node: 'how many arrows point at me?' = how many prerequisites.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800">
                  2️⃣ {t("in-degree = 0 인 노드 큐에 넣기", "Push nodes with in-degree 0 to queue")}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {t(
                    "선행이 없는 = 바로 시작 가능한 노드들.",
                    "Nodes with no prerequisites = can start immediately.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800">
                  3️⃣ {t("큐에서 꺼내며 — 결과에 추가 + 이웃 in-degree 1 감소", "Pop → append to result + decrement neighbors' in-degree")}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {t(
                    "감소 후 0 이 된 이웃은 큐에 푸시. 큐 빌 때까지 반복.",
                    "If a neighbor's in-degree hits 0, push it. Repeat until queue empty.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("시간: O(V + E) — 모든 노드/에지 한 번씩.", "Time: O(V + E) — each node/edge processed once.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("7 노드 DAG 직접 돌려보기", "Run Kahn's on a 7-node DAG")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("▶ 스텝 누르면 in-degree 0 인 노드 하나 처리.", "▶ Step: process one in-degree-0 node.")}
            </p>

            {/* SVG 그래프 시각화 */}
            <div className="bg-gray-50 rounded-lg p-2 mb-3 overflow-x-auto">
              <svg width="460" height="200" viewBox="0 0 460 200" className="mx-auto">
                {/* 에지 */}
                {edges.map(([u, v], i) => {
                  const [x1, y1] = nodePos[u]
                  const [x2, y2] = nodePos[v]
                  const dx = x2 - x1, dy = y2 - y1
                  const len = Math.sqrt(dx * dx + dy * dy)
                  const offX = (dx / len) * 18
                  const offY = (dy / len) * 18
                  const removed = processed.includes(u)
                  return (
                    <line key={i}
                      x1={x1 + offX} y1={y1 + offY}
                      x2={x2 - offX} y2={y2 - offY}
                      stroke={removed ? "#cbd5e1" : "#64748b"}
                      strokeWidth="1.5"
                      markerEnd={removed ? "url(#arrow-gray)" : "url(#arrow)"}
                      strokeDasharray={removed ? "3,3" : ""}
                    />
                  )
                })}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                  </marker>
                  <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
                  </marker>
                </defs>
                {/* 노드 */}
                {Object.entries(nodePos).map(([nodeStr, [x, y]]) => {
                  const node = parseInt(nodeStr)
                  const isProcessed = processed.includes(node)
                  const isQueued = !isProcessed && indeg[node] === 0
                  return (
                    <g key={node}>
                      <circle cx={x} cy={y} r="16"
                        fill={isProcessed ? "#86efac" : isQueued ? "#fde68a" : "white"}
                        stroke={isProcessed ? "#16a34a" : isQueued ? "#d97706" : "#64748b"}
                        strokeWidth="2"
                      />
                      <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fontWeight="bold"
                        fill={isProcessed ? "#14532d" : isQueued ? "#92400e" : "#334155"}>
                        {node}
                      </text>
                      <text x={x} y={y + 30} textAnchor="middle" fontSize="9"
                        fill={isProcessed ? "#9ca3af" : "#64748b"}>
                        {isProcessed ? "✓" : `in=${indeg[node]}`}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                <p className="text-[10px] font-bold text-amber-700 mb-1">{t("큐 (in-degree=0)", "Queue (in-degree=0)")}</p>
                <p className="font-mono text-xs text-amber-900">
                  [{Object.keys(indeg).filter(k => !processed.includes(parseInt(k)) && indeg[parseInt(k)] === 0).join(", ") || "-"}]
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200">
                <p className="text-[10px] font-bold text-emerald-700 mb-1">{t("결과 (위상 순서)", "Result (topo order)")}</p>
                <p className="font-mono text-xs text-emerald-900">
                  [{processed.join(", ") || "-"}]
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 rounded-lg p-2 mb-3 text-center">
              <p className="text-xs font-mono text-cyan-800">
                {phase === 0 && t("▶ 스텝 시작 — 노드 1 부터 (in-degree=0)", "▶ Start — node 1 has in-degree 0")}
                {phase > 0 && phase < 7 && t(`노드 ${removalOrder[phase - 1]} 처리 → 이웃 in-degree -1`, `Processed ${removalOrder[phase - 1]} → neighbors --`)}
                {phase === 7 && <b className="text-emerald-700">✅ {t("완료! 7 개 모두 위상 순서로", "Done! 7 nodes in topo order")}</b>}
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={phaseStep} disabled={phase >= 7}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={phaseReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Kahn's 알고리즘", "Code — Kahn's algorithm")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("3 단계 그대로 — in-degree 배열 + 큐 + 결과 리스트.", "3 steps directly — in-degree array + queue + result list.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`from collections import deque, defaultdict

def topo_sort(n, edges):
    adj = defaultdict(list)
    indeg = defaultdict(int)
    for u, v in edges:
        adj[u].append(v)
        indeg[v] += 1

    # ① in-degree 0 인 노드부터 큐에
    q = deque(i for i in range(1, n + 1) if indeg[i] == 0)
    result = []

    while q:
        u = q.popleft()
        result.append(u)
        for v in adj[u]:
            indeg[v] -= 1               # ② 이웃 -1
            if indeg[v] == 0:           # ③ 0 되면 큐에
                q.append(v)
    return result

# 예: 7 노드 DAG
edges = [(1,2),(1,3),(2,4),(3,4),(3,5),(4,6),(5,6),(6,7)]
print(topo_sort(7, edges))   # [1, 2, 3, 4, 5, 6, 7]`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

vector<int> topoSort(int n, vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (auto [u, v] : edges) {
        adj[u].push_back(v);
        indeg[v]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);   // ① 0 부터

    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : adj[u]) {
            if (--indeg[v] == 0)         // ② 이웃 -1, ③ 0 되면 큐에
                q.push(v);
        }
    }
    return result;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "포인트: 큐는 BFS 처럼 보이지만 *방문 체크* 가 필요 없어요 — in-degree 가 그 역할을 함.",
                "Note: looks like BFS but no *visited[]* needed — in-degree replaces it.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Kahn's 알고리즘에서 *시작* 시 큐에 들어가는 노드는?",
              "At the *start* of Kahn's algorithm, which nodes go into the queue?",
            )}
            options={[
              t("out-degree = 0 인 노드", "Nodes with out-degree = 0"),
              t("in-degree = 0 인 노드 (선행 없음)", "Nodes with in-degree = 0 (no prerequisites)"),
              t("아무 노드나 하나", "Any single node"),
              t("그래프에서 가장 작은 번호 노드", "The smallest-numbered node"),
            ]}
            answerIdx={1}
            hint={t(
              "선행 조건이 0 개인 = 바로 시작 가능한 노드. in-degree 0 = 나를 향한 화살표가 없음.",
              "0 prerequisites = can start immediately. in-degree 0 means no incoming arrows.",
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

// ── Chapter 3: DFS 기반 ─────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬: 작은 DAG (5 노드) DFS post-order
  // 1→2, 1→3, 2→4, 3→4, 4→5
  // DFS(1): 1 → 2 → 4 → 5 (finish 5, finish 4, finish 2) → 3 (3 의 자식 4 이미 끝남) → finish 3 → finish 1
  // Post-order: [5, 4, 2, 3, 1]  → 역순: [1, 3, 2, 4, 5]
  const postOrder = [5, 4, 2, 3, 1]
  const [postIdx, setPostIdx] = useState(0) // 0..5

  const finished = postOrder.slice(0, postIdx)
  const topoSoFar = [...finished].reverse()

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌳</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("DFS 끝나는 순서 → 역순", "DFS finish order → reverse it")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("핵심 통찰", "Key insight")}:</b>{" "}
              {t(
                "DFS 로 끝까지 들어갔다 돌아오는 순간 = '이 노드의 모든 후행이 다 끝남'. *그래서* 가장 늦게 끝나는 노드가 *가장 먼저* 와야 함 (선행).",
                "When DFS returns from a node = 'all its descendants are done'. *That's why* the latest-finishing node must come *first* (it's the prerequisite).",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">💡 {t("절차", "Procedure")}</p>
              <ol className="text-xs text-gray-700 leading-relaxed list-decimal pl-4 space-y-1">
                <li>{t("모든 노드에 대해 DFS 한 번씩 (visited 로 중복 방지).", "Run DFS once per node (visited[] avoids repeats).")}</li>
                <li>{t("DFS 함수의 *마지막* 에서 결과 리스트에 push.", "At the *end* of each DFS call, push to a list.")}</li>
                <li>{t("끝나면 리스트 *뒤집기* — 그게 위상 순서.", "After all done, *reverse* the list — that's the topo order.")}</li>
              </ol>
            </div>
            <p className="text-sm font-bold text-emerald-700 text-center">
              {t("시간: O(V + E) — Kahn's 과 동일.", "Time: O(V + E) — same as Kahn's.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("DFS post-order 한 칸씩", "DFS post-order step by step")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("DAG: 1→2, 1→3, 2→4, 3→4, 4→5. DFS(1) 시작.", "DAG: 1→2, 1→3, 2→4, 3→4, 4→5. Start DFS(1).")}
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[120px]">
              <p className="text-[10px] font-bold text-gray-500 mb-2">{t("DFS 마치는 순서 (post-order)", "DFS finish order (post-order)")}:</p>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {[5, 4, 3, 2, 1].sort().reverse().map((_, i) => null) /* placeholder */}
                {postOrder.map((node, i) => (
                  <div key={i} className={cn(
                    "px-2.5 py-1 rounded-md border-2 font-mono text-xs font-bold transition-all",
                    i < postIdx && "bg-emerald-100 border-emerald-400 text-emerald-800",
                    i >= postIdx && "bg-white border-gray-200 text-gray-400",
                  )}>
                    {node}
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-bold text-gray-500 mb-2">{t("→ 역순 = 위상 순서", "→ Reversed = topological order")}:</p>
              <div className="flex gap-1.5 flex-wrap">
                {topoSoFar.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">{t("(아직)", "(empty)")}</span>
                ) : (
                  topoSoFar.map((node, i) => (
                    <div key={i} className="px-2.5 py-1 rounded-md border-2 font-mono text-xs font-bold bg-cyan-100 border-cyan-400 text-cyan-800">
                      {node}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-2 mb-3 text-center">
              <p className="text-xs font-mono text-emerald-800">
                {postIdx === 0 && t("▶ DFS(1) 시작 — 자식 따라 내려감", "▶ Start DFS(1) — go deep first")}
                {postIdx === 1 && t("노드 5 끝남 (가장 깊은 곳).", "Node 5 finished (deepest).")}
                {postIdx === 2 && t("노드 4 끝남 (자식 5 다 끝나서).", "Node 4 finished (child 5 done).")}
                {postIdx === 3 && t("노드 2 끝남 (자식 4 끝나서).", "Node 2 finished (child 4 done).")}
                {postIdx === 4 && t("노드 3 끝남 (4 는 이미 visited).", "Node 3 finished (4 already visited).")}
                {postIdx === 5 && <b className="text-emerald-700">✅ {t("노드 1 끝남. 뒤집으면 [1,3,2,4,5] — 위상 순서!", "Node 1 done. Reversed = [1,3,2,4,5] — topo order!")}</b>}
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { if (postIdx < 5) setPostIdx(postIdx + 1) }} disabled={postIdx >= 5}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={() => setPostIdx(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — DFS 기반 위상 정렬", "Code — DFS-based topological sort")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("재귀 + visited. 함수 *끝*에서 append → 끝나면 reverse.", "Recursion + visited[]. Append at the *end* → reverse at finish.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`import sys
sys.setrecursionlimit(200000)
from collections import defaultdict

def topo_dfs(n, edges):
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)

    visited = [False] * (n + 1)
    result = []

    def dfs(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                dfs(v)
        result.append(u)              # ← 끝에서 append!

    for i in range(1, n + 1):
        if not visited[i]:
            dfs(i)

    result.reverse()                  # ← 마지막에 뒤집기
    return result

edges = [(1,2),(1,3),(2,4),(3,4),(4,5)]
print(topo_dfs(5, edges))   # [1, 3, 2, 4, 5] 같은 유효한 순서`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;
vector<int> result;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
    result.push_back(u);              // 끝에서 push
}

vector<int> topoDfs(int n, vector<pair<int,int>>& edges) {
    adj.assign(n + 1, {});
    visited.assign(n + 1, false);
    result.clear();
    for (auto [u, v] : edges) adj[u].push_back(v);

    for (int i = 1; i <= n; i++)
        if (!visited[i]) dfs(i);

    reverse(result.begin(), result.end());  // 뒤집기
    return result;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: append 위치가 *함수 끝* 이어야 함. 함수 시작에서 하면 일반 DFS 순서가 되어 위상 정렬 아님.",
                "Pitfall: append must be at the *end* of the function. Appending at the start gives plain DFS order, not topo.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "DFS 기반 위상 정렬에서, 노드를 결과 리스트에 추가하는 *시점* 은?",
              "In DFS-based topo sort, *when* do we add a node to the result list?",
            )}
            options={[
              t("DFS 함수 진입 직후 (visited 표시할 때)", "Right when DFS is called (when marking visited)"),
              t("DFS 함수가 끝날 때 (모든 자식 처리 후)", "When DFS returns (after all children processed)"),
              t("DFS 함수 진입할 때 + 끝날 때 둘 다", "Both on enter and exit"),
              t("아무 때나 상관없음", "Any time"),
            ]}
            answerIdx={1}
            hint={t(
              "DFS 가 끝났다 = 이 노드의 *모든 후행* 이 결과에 이미 들어감. 그래서 이 노드는 *그 뒤* 에 추가되고, 마지막에 뒤집으면 *앞* 으로 옴.",
              "DFS returning = all descendants already added. So this node goes *after* them, and reversing puts it *before*.",
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

// ── Chapter 4: 사이클 검출 ──────────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [method, setMethod] = useState<"kahn" | "dfs">("kahn")

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔁</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("사이클 = 위상 정렬 실패", "Cycle = topo sort fails")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "A → B → A 같은 사이클이 있으면 '먼저 들어야 할 게 끝없이 빙빙' — 답이 없어요. 다행히 두 방법 다 *부산물* 로 알려줘요.",
                "If there's a cycle A → B → A, prerequisites go in circles — no answer. Luckily both methods *tell you* as a bonus.",
              )}
            </p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-3 border border-rose-200">
                <p className="text-sm font-bold text-rose-800 mb-1">🔢 {t("Kahn's 방식", "Kahn's method")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "결과 리스트 길이 < N 이면 사이클 있음. (사이클 안의 노드들은 in-degree 가 영원히 0 안 됨.)",
                    "If result length < N, there's a cycle. (Nodes in a cycle never reach in-degree 0.)",
                  )}
                </p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border border-rose-200">
                <p className="text-sm font-bold text-rose-800 mb-1">🌳 {t("DFS 방식", "DFS method")}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "재귀 중인 (=현재 스택에 있는) 노드를 *또* 만나면 사이클. 'in-stack' 표시가 필요.",
                    "If you encounter an *in-stack* node again during recursion → cycle. Need an 'in-stack' flag.",
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("두 방식 비교 — 사이클 있는 그래프", "Two methods on a cyclic graph")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("DAG 아닌 예: 1→2, 2→3, 3→1. 사이클!", "Not a DAG: 1→2, 2→3, 3→1. Cycle!")}
            </p>

            <div className="flex items-center justify-center gap-2 mb-3">
              <button onClick={() => setMethod("kahn")}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  method === "kahn" ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-600")}>
                🔢 Kahn's
              </button>
              <button onClick={() => setMethod("dfs")}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  method === "dfs" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600")}>
                🌳 DFS
              </button>
            </div>

            {method === "kahn" ? (
              <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                <p className="text-xs font-bold text-cyan-800 mb-2">{t("진행", "Trace")}:</p>
                <pre className="text-[11px] font-mono text-cyan-900 leading-relaxed whitespace-pre-wrap">
{t(`초기 in-degree: 1:1, 2:1, 3:1
큐: []  ← in-degree=0 인 노드 없음!

결과 길이 = 0 < N (3) → 사이클 검출!`,
`Initial in-degree: 1:1, 2:1, 3:1
Queue: []  ← no in-degree=0 node!

result length = 0 < N (3) → cycle detected!`)}
                </pre>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <p className="text-xs font-bold text-emerald-800 mb-2">{t("진행", "Trace")}:</p>
                <pre className="text-[11px] font-mono text-emerald-900 leading-relaxed whitespace-pre-wrap">
{t(`DFS(1):  in-stack = {1}
  → DFS(2):  in-stack = {1, 2}
    → DFS(3):  in-stack = {1, 2, 3}
      → 1 향함 — 1 이 in-stack!
        → 사이클 검출!`,
`DFS(1):  in-stack = {1}
  → DFS(2):  in-stack = {1, 2}
    → DFS(3):  in-stack = {1, 2, 3}
      → goes to 1 — 1 is in-stack!
        → CYCLE!`)}
                </pre>
              </div>
            )}

            <p className="text-[11px] text-gray-500 text-center mt-3 italic">
              {t("둘 다 사이클을 찾지만 *어떻게* 찾는지가 다르다.", "Both detect the cycle, but *how* differs.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Kahn's + 사이클 검출", "Code — Kahn's + cycle detection")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("한 줄만 추가 — 결과 길이 비교.", "One extra line — compare result length.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`from collections import deque, defaultdict

def topo_or_cycle(n, edges):
    adj = defaultdict(list)
    indeg = defaultdict(int)
    for u, v in edges:
        adj[u].append(v)
        indeg[v] += 1

    q = deque(i for i in range(1, n + 1) if indeg[i] == 0)
    result = []

    while q:
        u = q.popleft()
        result.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    if len(result) < n:               # ← 사이클 체크
        return None                   # 또는 ["IMPOSSIBLE"]
    return result

# 사이클 있는 예
print(topo_or_cycle(3, [(1,2),(2,3),(3,1)]))   # None`}
              cpp={`#include <bits/stdc++.h>
using namespace std;

vector<int> topoOrCycle(int n, vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n + 1);
    vector<int> indeg(n + 1, 0);
    for (auto [u, v] : edges) {
        adj[u].push_back(v);
        indeg[v]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);

    vector<int> result;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        result.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v);
    }

    if ((int)result.size() < n)
        return {};                    // 사이클 있음
    return result;
}`}
            />
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Kahn's 알고리즘이 끝났는데 결과 리스트 길이가 N (전체 노드 수) 보다 작다. 무엇을 의미할까?",
              "Kahn's finishes but result length < N (total nodes). What does it mean?",
            )}
            options={[
              t("그래프에 사이클이 있다", "The graph has a cycle"),
              t("그래프가 연결되어 있지 않다", "The graph is disconnected"),
              t("알고리즘에 버그가 있다", "There's a bug in the algorithm"),
              t("결과 리스트가 너무 짧게 잘렸다", "The result list was truncated"),
            ]}
            answerIdx={0}
            hint={t(
              "사이클 안의 노드들은 서로 선행이라 in-degree 가 끝까지 0 이 안 돼요 → 큐에 못 들어감 → 결과에 안 들어감.",
              "Nodes in a cycle keep blocking each other — in-degree never hits 0 → never enter queue → never in result.",
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

// ── Chapter 5: 정리 + 옆길 ──────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
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
              {t("위상 정렬 끝!", "Topological Sort done!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "잘 했어요 👏 in-degree 기반 (Kahn's) · DFS post-order · 사이클 검출 — 세 가지 다 손에 들어왔어요.",
                "Nice work 👏 In-degree (Kahn's) · DFS post-order · cycle detection — three tools in hand.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "두 방식 다 O(V+E) — 어떤 걸 쓸지는 문제 모양 따라. 다음 슬라이드에서 정리.",
                  "Both O(V+E) — choice depends on problem shape. Recap next.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("위상 정렬은 ", "Topo sort needs a ")}<b>{t("DAG 에서만 가능", "DAG (no cycles)")}</b> {t("— 사이클 있으면 답 없음", "— cycle → impossible")}</li>
              <li><b>2.</b> <b>Kahn's</b> {t("(반복문 + 큐) = in-degree 0 부터. 다중 유효 순서를 *명시적* 으로 다루기 좋음", "(loop + queue) = start from in-degree 0. Good when handling multiple valid orders explicitly")}</li>
              <li><b>3.</b> <b>DFS</b> {t("post-order 의 *역순*. 코드 짧고, 재귀 익숙하면 빠름", "*reverse* post-order. Short code, fast if you're recursion-comfy")}</li>
              <li><b>4.</b> {t("사이클 검출: Kahn's = ", "Cycle detection: Kahn's = ")}<b>{t("결과 길이 < N", "result.size() < N")}</b>, DFS = <b>in-stack</b> {t("재발견", "re-encounter")}</li>
              <li><b>5.</b> {t("자주 같이 나오는 패턴: ", "Often combined with: ")}<b>{t("위상 + DP", "topo + DP")}</b> ({t("긴 작업 시간, 최장 경로 등", "longest task time, longest path")})</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("USACO Gold 의 단골 — 한 번 손에 잡으면 패턴 알아보기 쉬워요.", "Common in USACO Gold — once it clicks, you'll spot the pattern easily.")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">
                💡 <b>{t("옆길 — 더 연습 필요해요?", "Side path — need more practice?")}</b>{" "}
                {t("위상 정렬 문제 12 개로 바로 도전해요. ", "Try the 12 topo sort problems. ")}
                <Link href="/algo/topologicalsort/practice" className="font-bold underline hover:text-blue-900">{t("바로 가기 →", "Go →")}</Link>
              </p>
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🗺️ {t("다음 토픽: 최단 경로, 트리, 유니온 파인드. ", "Next topics: shortest path, trees, union-find. ")}
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
      <div className="fixed bottom-[76px] sm:bottom-[80px] left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded-xl font-bold text-sm">
            ← {t("이전", "Prev")}
          </button>
          <button onClick={() => step < totalSteps - 1 ? setStep(step + 1) : onComplete()}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95">
            {step === totalSteps - 1
              ? <>🎉 {t("위상 정렬 마스터!", "Topological Sort Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function TopologicalSortPage() {
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
          user_id: user.id, lesson_id: "algo-topologicalsort", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-topologicalsort")) {
          arr.push("algo-topologicalsort")
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
              { label: "위상 정렬", labelEn: "Topological Sort", emoji: "📐" },
            ]} />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">📐</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("위상 정렬", "Topological Sort")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Gold 단골", "Gold staple")}</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          {isMastered && (
            <Link href="/algo/topologicalsort/practice"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("위상 정렬 문제 12 개 — DAG 모양 직접 그려가며!", "12 topo sort challenges — draw the DAG!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("위상 정렬 마스터!", "Topological Sort Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/topologicalsort/practice" className="block px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-sm text-center border-2 border-blue-200">
                🏆 {t("위상 정렬 문제 12 개", "12 Topo Sort Problems")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽", "Next algorithm topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
