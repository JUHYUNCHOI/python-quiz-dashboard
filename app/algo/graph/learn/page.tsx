"use client"

/**
 * 그래프 (Graph — BFS/DFS) — 챕터식 학습 페이지 v1.
 *
 * Wave 2 — USACO Silver 의 절반은 그래프. 인접 리스트 표현부터 BFS/DFS 까지.
 * 비유 (지하철 노선도/SNS) → 인접 리스트 → BFS (큐, 최단 거리) → DFS (재귀, 깊이) → 정리.
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
import { ArrowRight, Sparkles } from "lucide-react"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🕸️", title: "왜 그래프?",                    titleEn: "Why Graphs?",                     mins: 4 },
  { id: 2, emoji: "📋", title: "인접 리스트 표현",                titleEn: "Adjacency List",                  mins: 6 },
  { id: 3, emoji: "🌊", title: "BFS — 큐로 최단 거리",            titleEn: "BFS — Shortest Path",             mins: 8 },
  { id: 4, emoji: "🌳", title: "DFS — 재귀로 깊이",               titleEn: "DFS — Recursive Depth",           mins: 8 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",                     titleEn: "Recap & Side Path",               mins: 5 },
]

const STORAGE_KEY = "algo-graph-chapter"

type CodeLang = "py" | "cpp"

// ── 슬라이드 챕터 헬퍼 ───────────────────────────────────────────
function useSlideChapter(initialStep: number = 0) {
  const [step, setStep] = useState(initialStep)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (step === 0) return
    const el = rootRef.current
    if (!el) return
    // 슬라이드 윗부분이 화면 밖(위로 잘렸거나 아래로 벗어남)일 때만 끌어옴.
    // 이미 잘 보이면 스크롤하지 않음 — 안 그러면 다음 누를 때마다 화면이 위로 튐
    // (선생님 2026-07-17: "다음을 누르면 자꾸 화면이 올라가").
    setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < 8 || r.top > window.innerHeight - 120) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 30)
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
  const { t } = useLanguage()
  return (
    <div className="rounded-xl bg-gray-900 overflow-hidden my-3">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5">
        <span className={cn("text-[11px] font-bold", lang === "py" ? "text-emerald-300" : "text-blue-300")}>
          {lang === "py" ? "🐍 Python" : "⚡ C++"}
        </span>
        <span className="text-[10px] text-gray-500 italic">{t("토글: 위쪽 'Py / C++' 버튼", "Toggle above")}</span>
      </div>
      <HighlightedCode code={lang === "py" ? py : cpp} lang={lang} />
    </div>
  )
}

// ── Chapter 1: 왜 그래프? ─────────────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🕸️</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("그래프 — 연결된 것들의 세계", "Graphs — the world of connections")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs text-amber-700 font-bold mb-1">📌 {t("이건 새 개념이에요 (복습 X)", "This is a NEW concept (not review)")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "그래프는 main 커리큘럼에 안 나왔어요. 새 도구 — 그래서 '어려운 게 당연해요'. 천천히 가요.",
                  "Graphs weren't in the main curriculum. New tool — being confused is normal. We'll go slowly.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-orange-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "지하철 노선도. 역 (점) 들이 선으로 연결돼 있죠. SNS 친구 관계도 같아요 — 사람 (점) 끼리 친구 (선) 로 이어짐. 미로도 그래프 — 갈림길 (점) + 통로 (선).",
                "Subway map. Stations (dots) connected by lines. SNS friends too — people (dots) linked by friendships (edges). Mazes are graphs — junctions (dots) + corridors (edges).",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-1">📌 {t("두 가지만 기억", "Just two things")}</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1">
                <li>• <b>{t("노드 (node, 정점)", "Node (vertex)")}</b> — {t("점. 역, 사람, 갈림길.", "the dot. Station, person, junction.")}</li>
                <li>• <b>{t("간선 (edge)", "Edge")}</b> — {t("선. 두 노드를 잇는 연결.", "the line. Connects two nodes.")}</li>
              </ul>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center">
              {t("'점 + 선' = 그래프. 끝!", "'Dots + lines' = graph. That's it!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📋</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그래프를 코드로 — 인접 리스트", "Graph in code — adjacency list")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "종이에 그릴 땐 점 + 선이지만, 컴퓨터엔 어떻게 알려줄까? *각 노드마다 '내 이웃들 명단'* 을 들고 있게 해요.",
                "On paper it's dots & lines, but how do we tell the computer? *Each node holds a list of 'my neighbors'*.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-blue-200 mb-3">
              <p className="text-xs font-bold text-blue-800 mb-2">{t("예: 1—2, 1—3, 2—4 연결된 그래프", "Example: graph with 1—2, 1—3, 2—4")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{t(`노드 1 의 이웃: [2, 3]
노드 2 의 이웃: [1, 4]
노드 3 의 이웃: [1]
노드 4 의 이웃: [2]`, `node 1's neighbors: [2, 3]
node 2's neighbors: [1, 4]
node 3's neighbors: [1]
node 4's neighbors: [2]`)}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "적어두는 양이 딱 “점 개수 + 선 개수” 만큼이에요. 점이 아주 많아도 끄떡없어요. (O(V + E))",
                  "You only write down about “number of dots + number of lines”. Fine even for huge graphs. (O(V + E))",
                )}
              </p>
            </div>
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              {t(
                "다음 챕터에서 코드로 만들고, 그 다음 BFS/DFS 로 *탐색* 해요.",
                "Next chapter we build it in code, then BFS/DFS to *traverse*.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("이 토픽에서 다룰 3 가지", "3 things we'll cover")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("미리 보기 — 다음 챕터부터 하나씩 깊게 봐요.", "Preview — we'll dive into each next.")}
            </p>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  📋 1. {t("인접 리스트 — 그래프를 적어두는 법", "Adjacency list — how to write a graph down")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "점마다 “내 이웃은 누구누구” 를 목록으로 적어둬요. 그래프를 컴퓨터에 담는 가장 흔한 방법. (챕터 2)",
                    "For each dot, write a list of “who my neighbours are”. The usual way to store a graph. (Ch 2)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌊 2. {t("BFS — 가까운 곳부터 넓게", "BFS — near things first")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "가까운 점부터 한 겹씩 넓혀가며 찾아요. “몇 걸음 만에 갈 수 있나” 를 딱 맞게 알려줘요. (챕터 3)",
                    "Search outward one layer at a time. Tells you exactly “how many steps away” something is. (Ch 3)",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌳 3. {t("DFS — 한 길로 끝까지", "DFS — one path to the end")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "한 길로 끝까지 가보고, 막히면 되돌아와 다른 길. “여기서 저기까지 이어져 있나?” 확인에 좋아요. (챕터 4)",
                    "Follow one path to the end, then back up and try another. Great for “is this connected to that?” (Ch 4)",
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

// ── Chapter 2: 인접 리스트 표현 ───────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 5 노드 그래프 — 1-2, 1-3, 2-4, 3-4, 4-5
  // 시각 좌표 (SVG)
  const nodes = [
    { id: 1, x: 80,  y: 60 },
    { id: 2, x: 200, y: 40 },
    { id: 3, x: 80,  y: 160 },
    { id: 4, x: 200, y: 140 },
    { id: 5, x: 280, y: 80 },
  ]
  const edges = [
    [1, 2], [1, 3], [2, 4], [3, 4], [4, 5],
  ]
  const adj: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] }
  edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u) })

  const [highlightNode, setHighlightNode] = useState<number | null>(null)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📋</p>
            <h3 className="text-lg font-black text-gray-900 mb-1 text-center">
              {t("적는 방법이 두 가지 — 왜 '명단' 을 쓸까?", "Two ways to write it — why the 'list'?")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("똑같은 그래프 (1—2, 1—3, 2—4) 를 두 방법으로 적어볼게요.",
                 "Let's write the same graph (1—2, 1—3, 2—4) both ways.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* 방법 A — 표 (모든 짝을 다 적음) */}
              <div className="bg-white rounded-lg p-3 border-2 border-rose-200">
                <p className="text-xs font-black text-rose-800 mb-2 text-center">
                  {t("방법 A — 큰 표에 다 적기", "Way A — one big table")}
                </p>
                <div className="flex justify-center mb-2">
                  <table className="border-collapse font-mono text-[11px]">
                    <tbody>
                      <tr>
                        <td className="w-6 h-6" />
                        {[1, 2, 3, 4].map(c => (
                          <td key={c} className="w-6 h-6 text-center font-black text-gray-500">{c}</td>
                        ))}
                      </tr>
                      {[1, 2, 3, 4].map(r => (
                        <tr key={r}>
                          <td className="w-6 h-6 text-center font-black text-gray-500">{r}</td>
                          {[1, 2, 3, 4].map(c => {
                            const linked = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 4], [4, 2]]
                              .some(([a, b]) => a === r && b === c)
                            return (
                              <td key={c} className={cn(
                                "w-6 h-6 text-center border font-black",
                                linked ? "bg-rose-100 border-rose-400 text-rose-700"
                                       : "bg-gray-50 border-gray-200 text-gray-300",
                              )}>{linked ? 1 : 0}</td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed text-center">
                  {t("칸 16 개인데 쓸모있는 건 6 개. 나머지 10 개는 “안 이어짐” 만 적어둔 셈.",
                     "16 cells, only 6 useful. The other 10 just say “not linked”.")}
                </p>
              </div>

              {/* 방법 B — 이웃 명단 */}
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-300">
                <p className="text-xs font-black text-emerald-800 mb-2 text-center">
                  {t("방법 B — 점마다 이웃 명단", "Way B — a neighbour list per dot")}
                </p>
                <div className="font-mono text-[11px] leading-relaxed bg-emerald-50 rounded p-2 mb-2">
                  {[["1", "2, 3"], ["2", "1, 4"], ["3", "1"], ["4", "2"]].map(([n, nb]) => (
                    <div key={n}>
                      <b className="text-emerald-800">{n}</b>
                      <span className="text-gray-500"> {t("의 이웃", "'s neighbours")}: </span>
                      <b className="text-emerald-700">[{nb}]</b>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed text-center">
                  {t("이어진 것만 6 개. 딱 필요한 만큼만 적어요.",
                     "Just the 6 links. Only what's actually needed.")}
                </p>
              </div>
            </div>

            {/* 결정타 — 커지면 어떻게 되나 */}
            <div className="bg-white rounded-lg p-3 border-2 border-cyan-300">
              <p className="text-xs font-black text-cyan-900 mb-1 text-center">
                {t("그럼 점이 10만 개면?", "So what if there are 100,000 dots?")}
              </p>
              <div className="flex items-center justify-center gap-3 text-[11px] font-mono">
                <span className="px-2 py-1 rounded bg-rose-50 border border-rose-300 text-rose-700 font-black">
                  {t("표: 100 억 칸 😱", "Table: 10 billion cells 😱")}
                </span>
                <span className="text-gray-400 font-black">vs</span>
                <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-700 font-black">
                  {t("명단: 이어진 만큼만 🙂", "List: only the links 🙂")}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 text-center mt-2 leading-relaxed">
                {t("그래서 대회 문제 그래프는 거의 다 명단(인접 리스트) 을 써요. (표 = 인접 행렬 O(N²), 명단 = 인접 리스트 O(V+E))",
                   "That's why contest graphs almost always use the list. (table = adjacency matrix O(N²), list = adjacency list O(V+E))")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("그래프 + 인접 리스트", "Graph + adjacency list")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("노드를 눌러봐요 — 그 노드의 이웃 명단이 강조돼요.", "Tap a node — its neighbor list lights up.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <svg viewBox="0 0 360 200" className="w-full h-[180px]">
                {edges.map(([u, v], i) => {
                  const nu = nodes[u - 1]
                  const nv = nodes[v - 1]
                  const active = highlightNode !== null && (u === highlightNode || v === highlightNode)
                  return (
                    <line key={i} x1={nu.x} y1={nu.y} x2={nv.x} y2={nv.y}
                      stroke={active ? "#f59e0b" : "#9ca3af"} strokeWidth={active ? 3 : 2} />
                  )
                })}
                {nodes.map(n => {
                  const isHl = highlightNode === n.id
                  const isNbr = highlightNode !== null && adj[highlightNode]?.includes(n.id)
                  return (
                    <g key={n.id} onClick={() => setHighlightNode(highlightNode === n.id ? null : n.id)} className="cursor-pointer">
                      <circle cx={n.x} cy={n.y} r={18}
                        fill={isHl ? "#f59e0b" : isNbr ? "#fcd34d" : "#fff"}
                        stroke={isHl ? "#b45309" : isNbr ? "#d97706" : "#6b7280"}
                        strokeWidth={2} />
                      <text x={n.x} y={n.y + 5} textAnchor="middle"
                        fontSize="13" fontWeight="bold"
                        fill={isHl ? "#fff" : "#374151"}>{n.id}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 font-mono text-xs leading-relaxed">
              {[1, 2, 3, 4, 5].map(id => (
                <div key={id} className={cn(
                  "py-0.5 px-1 rounded",
                  highlightNode === id && "bg-amber-200 font-bold",
                )}>
                  adj[{id}] = [{adj[id].join(", ")}]
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-600 text-center mt-2">
              {t("간선은 양방향 — adj[u] 에 v, adj[v] 에 u 둘 다 넣어요.", "Undirected — push v to adj[u] AND u to adj[v].")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 인접 리스트 만들기", "Code — build adjacency list")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("입력: 노드 N 개, 간선 M 개. 1-based 가 흔해요 (인덱스 0 안 씀).", "Input: N nodes, M edges. 1-based is common (skip index 0).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]   # 1-based, index 0 비움

for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)               # 양방향
    adj[v].append(u)               # ← 둘 다 잊지 말기!

# adj[3] 의 이웃 보기
print(adj[3])`, `n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]   # 1-based, leave index 0 unused

for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)               # undirected
    adj[v].append(u)               # <- don't forget both!

# check adj[3]'s neighbors
print(adj[3])`)}
              cpp={t(`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);    // 1-based

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);           // 양방향
        adj[v].push_back(u);           // ← 둘 다!
    }
    return 0;
}`, `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);    // 1-based

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);           // undirected
        adj[v].push_back(u);           // <- both!
    }
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: 무방향 그래프인데 한 방향만 넣으면 — 절반의 그래프가 됨. 항상 양쪽 push!",
                "Pitfall: undirected but you only push one way → half a graph. Always push both!",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 3: BFS — 큐로 최단 거리 ──────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 6 노드 그래프 — BFS 시뮬레이션
  // 1-2, 1-3, 2-4, 3-4, 3-5, 4-6, 5-6
  const nodes = [
    { id: 1, x: 60,  y: 100 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 150, y: 150 },
    { id: 4, x: 240, y: 50 },
    { id: 5, x: 240, y: 150 },
    { id: 6, x: 320, y: 100 },
  ]
  const edges = [[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6]]
  const adj: Record<number, number[]> = {}
  for (let i = 1; i <= 6; i++) adj[i] = []
  edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u) })

  // BFS 사전 계산 — phase 별 상태
  // phase 0 = 시작 전. 1 부터 점진적 진행.
  type BFSState = { queue: number[]; visited: Set<number>; dist: Record<number, number>; cur: number | null; msg: string }
  const bfsStates: BFSState[] = []
  {
    const visited = new Set<number>([1])
    const dist: Record<number, number> = { 1: 0 }
    const queue: number[] = [1]
    bfsStates.push({ queue: [...queue], visited: new Set(visited), dist: { ...dist }, cur: null,
      msg: t("시작: 노드 1 큐에 넣고 dist[1]=0. visited={1}", "Start: push 1 to queue, dist[1]=0. visited={1}") })

    while (queue.length > 0) {
      const cur = queue.shift()!
      bfsStates.push({ queue: [...queue], visited: new Set(visited), dist: { ...dist }, cur,
        msg: t(`노드 ${cur} 큐에서 꺼냄. 이웃들 확인 중...`, `Pop ${cur} from queue. Checking neighbors...`) })
      for (const nb of adj[cur].sort((a, b) => a - b)) {
        if (!visited.has(nb)) {
          visited.add(nb)
          dist[nb] = dist[cur] + 1
          queue.push(nb)
          bfsStates.push({ queue: [...queue], visited: new Set(visited), dist: { ...dist }, cur,
            msg: t(`이웃 ${nb} 방문! dist[${nb}]=${dist[nb]}. 큐에 push.`, `Visit ${nb}! dist[${nb}]=${dist[nb]}. Push to queue.`) })
        }
      }
    }
    bfsStates.push({ queue: [], visited: new Set(visited), dist: { ...dist }, cur: null,
      msg: t("✅ BFS 완료! 모든 dist 채워짐.", "✅ BFS done! All distances filled.") })
  }

  const [phase, setPhase] = useState(0)
  const cur = bfsStates[phase]
  const bfsDone = phase >= bfsStates.length - 1
  const bfsStep = () => { if (!bfsDone) setPhase(phase + 1) }
  const bfsReset = () => setPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 border-2 border-sky-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌊</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("BFS — 한 층씩 퍼지는 물결", "BFS — ripples spreading layer by layer")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-sky-700">{t("BFS = Breadth-First Search", "BFS = Breadth-First Search")}</b>.{" "}
              {t(
                "큐 — 줄 서기처럼 *먼저 넣은 게 먼저 나오는* 통 (FIFO) — 로 같은 거리에 있는 점들을 함께 처리해요. 가까운 곳부터 한 겹씩.",
                "A queue — like a line, *first in, first out* (FIFO) — handles all the equally-distant dots together. Nearest first, one layer at a time.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-sky-200 mb-3">
              <p className="text-xs font-bold text-sky-800 mb-2">💡 {t("핵심 약속", "Key promise")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "선이 전부 똑같은 한 걸음짜리면 (= 가중치 없는 그래프) *최소 걸음 수* 를 보장해요. 1 에서 6 까지 몇 걸음인지 BFS 가 자동으로 알려줘요.",
                  "On unweighted graphs, BFS guarantees *shortest distance*. From 1 to 6, BFS finds the shortest path automatically.",
                )}
              </p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-sky-200">
              <p className="text-xs font-bold text-sky-800 mb-1">🛠 {t("3 가지 도구", "3 tools")}</p>
              <ul className="text-xs text-gray-700 space-y-0.5">
                <li>• <b>queue</b> — {t("처리할 순서. 먼저 넣은 게 먼저 나와요", "the order to process — first in, first out")}</li>
                <li>• <b>visited</b> — {t("이미 본 노드 (중복 방지)", "already-seen nodes")}</li>
                <li>• <b>dist[]</b> — {t("출발에서의 거리", "distance from start")}</li>
              </ul>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("BFS 시뮬레이션 (노드 1 부터)", "BFS simulation (from node 1)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("스텝마다 큐, visited, dist 가 어떻게 바뀌는지 봐요.", "Watch queue, visited, dist change each step.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <svg viewBox="0 0 380 200" className="w-full h-[170px]">
                {edges.map(([u, v], i) => {
                  const nu = nodes[u - 1]
                  const nv = nodes[v - 1]
                  return <line key={i} x1={nu.x} y1={nu.y} x2={nv.x} y2={nv.y} stroke="#9ca3af" strokeWidth={2} />
                })}
                {nodes.map(n => {
                  const isCur = cur.cur === n.id
                  const isVisited = cur.visited.has(n.id)
                  const inQueue = cur.queue.includes(n.id)
                  const d = cur.dist[n.id]
                  return (
                    <g key={n.id}>
                      <circle cx={n.x} cy={n.y} r={18}
                        fill={isCur ? "#0ea5e9" : isVisited ? "#7dd3fc" : "#fff"}
                        stroke={isCur ? "#0369a1" : inQueue ? "#0284c7" : "#6b7280"}
                        strokeWidth={inQueue && !isCur ? 3 : 2} />
                      <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold"
                        fill={isCur ? "#fff" : "#374151"}>{n.id}</text>
                      {d !== undefined && (
                        <text x={n.x} y={n.y - 24} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">d={d}</text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-[10px] font-bold text-blue-800 mb-0.5">{t("큐 (앞 → 뒤)", "Queue (front → back)")}</p>
                <p className="font-mono text-xs text-blue-900">[{cur.queue.join(", ")}]</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2">
                <p className="text-[10px] font-bold text-emerald-800 mb-0.5">visited</p>
                <p className="font-mono text-xs text-emerald-900">{`{${[...cur.visited].sort((a, b) => a - b).join(", ")}}`}</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 mb-3 text-center min-h-[2.5rem]">
              <p className="text-xs font-mono text-amber-800">
                {bfsDone ? <b className="text-emerald-700">{cur.msg}</b> : cur.msg}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={bfsStep} disabled={bfsDone}
                className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={bfsReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {/* 시뮬을 돌려본 *다음* 에 "왜 최단인가" — 방금 본 d 값으로 (추상 규칙 먼저 X) */}
        {step === 2 && (
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 border-2 border-sky-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🤔</p>
            <h3 className="text-lg font-black text-gray-900 mb-1 text-center">
              {t("왜 BFS 가 '가장 적은 걸음' 을 보장할까?", "Why does BFS guarantee the fewest steps?")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("방금 돌린 시뮬에서 나온 순서를 그대로 늘어놓아 볼게요.",
                 "Let's lay out the order that came out of the sim you just ran.")}
            </p>

            {/* 방금 시뮬의 d 값을 층으로 */}
            <div className="bg-white rounded-lg p-3 border border-sky-200 mb-3 space-y-1.5">
              {[
                { d: 0, ns: [1], c: "bg-sky-600" },
                { d: 1, ns: [2, 3], c: "bg-sky-500" },
                { d: 2, ns: [4, 5], c: "bg-sky-400" },
                { d: 3, ns: [6], c: "bg-sky-300" },
              ].map(row => (
                <div key={row.d} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-black text-sky-800 w-12 shrink-0">
                    {row.d}{t(" 걸음", " step")}
                  </span>
                  <div className="flex gap-1.5">
                    {row.ns.map(n => (
                      <span key={n} className={cn("w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center font-mono", row.c)}>{n}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-3 border-2 border-sky-300 mb-3">
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "큐에서 나온 순서가 정확히 걸음 수 순서였죠? 0 걸음 → 1 걸음 → 2 걸음 → 3 걸음. 큐는 먼저 넣은 게 먼저 나오니까, 가까운 층이 전부 끝나야 다음 층이 나와요.",
                  "The pop order was exactly the step order: 0 → 1 → 2 → 3. Since the queue is first-in-first-out, a whole layer finishes before the next one starts.",
                )}
              </p>
              <p className="text-sm font-black text-sky-800 text-center mt-2">
                {t("→ 어떤 점을 “처음” 만났을 때가 곧 최단!", "→ The FIRST time you meet a dot is the shortest!")}
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-300">
              <p className="text-xs text-amber-900 leading-relaxed">
                🤔 {t(
                  "나중에 다른 길로 그 점에 또 닿으면요? 그건 이미 더 뒤쪽 층에서 온 거라 걸음 수가 같거나 더 많아요. 그래서 visited 로 막아도 손해가 없어요.",
                  "What if another path reaches it later? That path comes from a later layer, so it's the same or more steps. That's why blocking with visited loses nothing.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — BFS 표준 템플릿", "Code — BFS standard template")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("Python: collections.deque 필수 (list.pop(0) 은 O(N) 느림). C++: std::queue.", "Python: use collections.deque (list.pop(0) is O(N) slow). C++: std::queue.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`from collections import deque

def bfs(start, n, adj):
    visited = [False] * (n + 1)
    dist = [-1] * (n + 1)
    q = deque([start])
    visited[start] = True
    dist[start] = 0

    while q:
        cur = q.popleft()              # FIFO!
        for nb in adj[cur]:
            if not visited[nb]:
                visited[nb] = True
                dist[nb] = dist[cur] + 1
                q.append(nb)
    return dist

# 호출 예: dist = bfs(1, n, adj)
# dist[6] 이 1→6 의 최단 거리`, `from collections import deque

def bfs(start, n, adj):
    visited = [False] * (n + 1)
    dist = [-1] * (n + 1)
    q = deque([start])
    visited[start] = True
    dist[start] = 0

    while q:
        cur = q.popleft()              # FIFO!
        for nb in adj[cur]:
            if not visited[nb]:
                visited[nb] = True
                dist[nb] = dist[cur] + 1
                q.append(nb)
    return dist

# example call: dist = bfs(1, n, adj)
# dist[6] is the shortest distance 1->6`)}
              cpp={t(`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> bfs(int start, int n, vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;

    while (!q.empty()) {
        int cur = q.front(); q.pop();      // FIFO!
        for (int nb : adj[cur]) {
            if (dist[nb] == -1) {          // 방문 안 함
                dist[nb] = dist[cur] + 1;
                q.push(nb);
            }
        }
    }
    return dist;
}`, `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> bfs(int start, int n, vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;

    while (!q.empty()) {
        int cur = q.front(); q.pop();      // FIFO!
        for (int nb : adj[cur]) {
            if (dist[nb] == -1) {          // not visited
                dist[nb] = dist[cur] + 1;
                q.push(nb);
            }
        }
    }
    return dist;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크: ① 큐에 push 하는 *순간* visited=true (꺼낼 때 X). 왜? — pop 할 때 표시하면 같은 노드가 여러 이웃을 통해 큐에 *여러 번* 들어갈 수 있어요. push 할 때 막으면 노드마다 딱 한 번만 큐에 들어가요. ② 선이 전부 똑같은 한 걸음일 때만 최단 보장 (= 가중치 없는 그래프). ③ 모든 점 한 번 + 모든 선 한 번 = 시간 O(V + E).",
                "Check: ① mark visited *when pushing* (not on pop). Why? — marking on pop lets the same node get pushed *multiple times* via different neighbors. Marking on push means each node enters the queue exactly once. ② shortest only on unweighted graphs.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 4: DFS — 재귀로 깊이 ──────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 같은 6 노드 그래프 — DFS 재귀 시뮬레이션
  const nodes = [
    { id: 1, x: 60,  y: 100 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 150, y: 150 },
    { id: 4, x: 240, y: 50 },
    { id: 5, x: 240, y: 150 },
    { id: 6, x: 320, y: 100 },
  ]
  const edges = [[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6]]
  const adj: Record<number, number[]> = {}
  for (let i = 1; i <= 6; i++) adj[i] = []
  edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u) })
  for (const k of Object.keys(adj)) adj[+k].sort((a, b) => a - b)

  // DFS 재귀 시뮬레이션 — call stack 추적
  type DFSState = { stack: number[]; visited: Set<number>; cur: number | null; msg: string }
  const dfsStates: DFSState[] = []
  {
    const visited = new Set<number>()
    const stack: number[] = []
    const push = (msg: string, cur: number | null) =>
      dfsStates.push({ stack: [...stack], visited: new Set(visited), cur, msg })
    push(t("시작 전. 노드 1 부터 DFS.", "Before start. DFS from node 1."), null)
    const dfs = (u: number) => {
      visited.add(u)
      stack.push(u)
      push(t(`dfs(${u}) 진입. 방문 표시. 스택 push.`, `Enter dfs(${u}). Mark visited. Push to stack.`), u)
      for (const nb of adj[u]) {
        if (!visited.has(nb)) {
          push(t(`이웃 ${nb} 미방문 — 깊이 들어감 →`, `Neighbor ${nb} unvisited — go deeper →`), u)
          dfs(nb)
          push(t(`dfs(${u}) 로 돌아옴.`, `Back to dfs(${u}).`), u)
        }
      }
      stack.pop()
      push(t(`dfs(${u}) 끝. 스택 pop.`, `dfs(${u}) done. Pop stack.`), stack.length > 0 ? stack[stack.length - 1] : null)
    }
    dfs(1)
    push(t("✅ DFS 완료!", "✅ DFS done!"), null)
  }

  const [phase, setPhase] = useState(0)
  const cur = dfsStates[phase]
  const dfsDone = phase >= dfsStates.length - 1
  const dfsStep = () => { if (!dfsDone) setPhase(phase + 1) }
  const dfsReset = () => setPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌳</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("DFS — 끝까지 갔다가 되돌아오기", "DFS — go deep, then backtrack")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("DFS = Depth-First Search", "DFS = Depth-First Search")}</b>.{" "}
              {t(
                "재귀 — 함수가 자기 자신을 다시 부르는 것 — 로 한 길을 *끝까지* 파고든 뒤, 막히면 되돌아와서 다른 길로 가요.",
                "Recursion — a function calling itself — goes *all the way down* one path, then backs up and tries another.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">💡 {t("BFS 와의 차이", "Difference from BFS")}</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1">
                <li>• <b>BFS</b> — {t("큐, 한 층씩, *최단 거리* 강함", "queue, layer by layer, *shortest path* strong")}</li>
                <li>• <b>DFS</b> — {t("한 길 끝까지 파고들기. *서로 이어진 덩어리 세기(연결 요소)·빙 도는 길 찾기(사이클)* 에 강함", "go all the way down one path. Strong for *counting connected blobs (components), finding loops (cycles)*")}</li>
              </ul>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("DFS 시뮬레이션 (call stack)", "DFS simulation (call stack)")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("재귀 호출이 스택에 쌓이고 풀려요. 깊이 먼저 가는 거 보여요.", "Recursive calls stack and unwind. See depth-first in action.")}
            </p>
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <svg viewBox="0 0 380 200" className="w-full h-[170px]">
                {edges.map(([u, v], i) => {
                  const nu = nodes[u - 1]
                  const nv = nodes[v - 1]
                  return <line key={i} x1={nu.x} y1={nu.y} x2={nv.x} y2={nv.y} stroke="#9ca3af" strokeWidth={2} />
                })}
                {nodes.map(n => {
                  const isCur = cur.cur === n.id
                  const isVisited = cur.visited.has(n.id)
                  const inStack = cur.stack.includes(n.id)
                  return (
                    <g key={n.id}>
                      <circle cx={n.x} cy={n.y} r={18}
                        fill={isCur ? "#10b981" : isVisited ? "#a7f3d0" : "#fff"}
                        stroke={isCur ? "#047857" : inStack ? "#059669" : "#6b7280"}
                        strokeWidth={inStack && !isCur ? 3 : 2} />
                      <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold"
                        fill={isCur ? "#fff" : "#374151"}>{n.id}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 mb-2 min-h-[3.5rem]">
              <p className="text-[10px] font-bold text-emerald-800 mb-1">{t("지금 부른 함수들 (call stack) — 맨 위 = 가장 최근에 부른 것", "functions in progress (call stack) — top = most recent")}</p>
              <div className="flex flex-col-reverse gap-0.5">
                {cur.stack.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic">{t("(비어 있음)", "(empty)")}</p>
                ) : cur.stack.map((v, i) => (
                  <div key={i} className={cn("font-mono text-xs px-2 py-0.5 rounded",
                    i === cur.stack.length - 1 ? "bg-emerald-200 text-emerald-900 font-bold" : "bg-white text-emerald-700",
                  )}>
                    dfs({v})
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 mb-3 text-center min-h-[2.5rem]">
              <p className="text-xs font-mono text-amber-800">
                {dfsDone ? <b className="text-emerald-700">{cur.msg}</b> : cur.msg}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={dfsStep} disabled={dfsDone}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={dfsReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — DFS 재귀 템플릿", "Code — DFS recursive template")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("재귀 = call stack 이 자동 stack. visited 만 잘 챙기면 끝.", "Recursion = call stack auto-stack. Just track visited.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`import sys
sys.setrecursionlimit(10**6)        # ← 큰 그래프 필수!

def dfs(u, adj, visited):
    visited[u] = True
    # 여기서 노드 u 처리 (예: print, count += 1)
    for nb in adj[u]:
        if not visited[nb]:
            dfs(nb, adj, visited)

# 호출 예
visited = [False] * (n + 1)
dfs(1, adj, visited)`, `import sys
sys.setrecursionlimit(10**6)        # <- needed for big graphs!

def dfs(u, adj, visited):
    visited[u] = True
    # process node u here (e.g. print, count += 1)
    for nb in adj[u]:
        if not visited[nb]:
            dfs(nb, adj, visited)

# example call
visited = [False] * (n + 1)
dfs(1, adj, visited)`)}
              cpp={t(`#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int u) {
    visited[u] = true;
    // u 처리 (예: cout, count++)
    for (int nb : adj[u]) {
        if (!visited[nb]) dfs(nb);
    }
}

int main() {
    int n;
    cin >> n;
    adj.assign(n + 1, {});
    visited.assign(n + 1, false);
    // 간선 입력...
    dfs(1);
    return 0;
}`, `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int u) {
    visited[u] = true;
    // process u here (e.g. cout, count++)
    for (int nb : adj[u]) {
        if (!visited[nb]) dfs(nb);
    }
}

int main() {
    int n;
    cin >> n;
    adj.assign(n + 1, {});
    visited.assign(n + 1, false);
    // read edges...
    dfs(1);
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "응용: 모든 점을 훑으며 아직 안 가본 점에서 dfs 시작 → 몇 번 시작했나 = *서로 이어진 덩어리 개수(연결 요소)*. visited 안 쓰면 빙 도는 길에서 무한 루프!",
                "Apply: for each node, if unvisited do dfs(i) → *count connected components*. Without visited, cycles → infinite loop!",
              )}
            </p>
            {/* Python 재귀 한도 경고 — 코드 바로 옆으로 이동 (예전엔 DFS 코드도 보기 전 첫 슬라이드에 있었음) */}
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-[11px] text-rose-800 leading-relaxed">
                ⚠️ <b>{t("Python 함정", "Python pitfall")}:</b>{" "}
                {t(
                  "파이썬은 함수가 자기를 부르는 걸 1000 번까지만 허용해요. 점이 많은 그래프에선 그보다 깊이 들어가서 멈춰버려요 — 그래서 맨 위에 ",
                  "Python only allows about 1000 nested self-calls. Big graphs go deeper and crash — so put ",
                )}<code className="bg-white px-1 rounded">sys.setrecursionlimit(10**6)</code>{" "}
                {t("을 꼭 적어요.", "at the top.")}
              </p>
            </div>
            {/* 다음 슬라이드 퀴즈가 복잡도를 묻는데 정작 어디에도 안 나와 있었음 */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-[11px] text-blue-900 leading-relaxed text-center">
                ⏱️ {t(
                  "BFS 도 DFS 도 “모든 점 한 번 + 모든 선 한 번” 만 보면 끝나요 → 시간 O(V + E). (V = 점 개수, E = 선 개수)",
                  "Both BFS and DFS look at “every dot once + every line once” → time O(V + E). (V = dots, E = lines)",
                )}
              </p>
            </div>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 5: 정리 + 옆길 ───────────────────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 2
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">👏</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("그래프 마스터!", "Graph Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "축하해요! USACO Silver 의 *절반은* 그래프예요 — 큰 무기 하나 손에 넣은 셈. 🎉",
                "Nice work! Half of USACO Silver is graphs — you just unlocked a major weapon. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "BFS = 큐 = 최단. DFS = 재귀 = 깊이. 이 두 가지가 *수많은 문제* 의 베이스가 돼요.",
                  "BFS = queue = shortest. DFS = recursion = depth. These two are the *base* of countless problems.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("그래프 = ", "Graph = ")}<b>{t("노드 + 간선", "nodes + edges")}</b>. {t("코드로는 ", "In code: ")}<b>{t("인접 리스트", "adjacency list")}</b> {t("표준 (메모리 O(V+E)).", "standard (memory O(V+E)).")}</li>
              <li><b>2.</b> <b>BFS</b> = <code className="bg-white px-1 rounded text-xs">deque</code>/<code className="bg-white px-1 rounded text-xs">queue</code>, {t("FIFO. 가중치 없는 그래프 ", "FIFO. Unweighted ")}<b>{t("최단 거리", "shortest path")}</b> {t("보장.", "guaranteed.")}</li>
              <li><b>3.</b> <b>DFS</b> = {t("재귀, call stack. ", "recursion, call stack. ")}<b>{t("이어진 덩어리(연결 요소), 빙 도는 길(사이클), 트리 훑기", "connected blobs (components), loops (cycles), tree traversal")}</b> {t("강함.", "strong.")}</li>
              <li><b>4.</b> <b>visited</b> {t("배열 필수 — 안 쓰면 사이클에서 무한 루프!", "array required — without it, cycles → infinite loop!")}</li>
              <li><b>5.</b> {t("Python DFS: ", "Python DFS: ")}<code className="bg-white px-1 rounded text-xs">sys.setrecursionlimit(10**6)</code> {t("잊지 말기.", "don't forget.")}</li>
              <li><b>6.</b> {t("시간/공간: BFS & DFS 둘 다 ", "Time/space: both ")}<b>O(V+E)</b>.</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("그래프가 손에 잡히면 — 최단 경로, 다익스트라, 위상 정렬, MST 다 열려요!", "Once graphs click — shortest paths, Dijkstra, topological sort, MST all open!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🌲 {t("다음 토픽: 선마다 걸리는 시간이 다르면? → 최단 경로(다익스트라). ", "Next: what if each line takes a different time? → Shortest path (Dijkstra). ")}
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
              ? <>🎉 {t("그래프 마스터!", "Graph Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function GraphPage() {
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
          user_id: user.id, lesson_id: "algo-graph", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-graph")) {
          arr.push("algo-graph")
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
              { label: "그래프", labelEn: "Graph", emoji: "🕸️" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🕸️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("그래프 (BFS/DFS)", "Graph (BFS/DFS)")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">{t("Silver 필수", "Silver core")}</span>
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
            <Link href="/algo/graph"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("BFS/DFS 문제 — 종이에 그려가며!", "BFS/DFS challenges — draw on paper!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("그래프 마스터!", "Graph Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
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
