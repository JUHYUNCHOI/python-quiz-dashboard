"use client"

/**
 * 최단 경로 (Shortest Path) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — 가중치 그래프 위에서 최단 거리를 구하는 4 대 알고리즘:
 *   BFS (단위 가중치) / 다익스트라 (0 이상) / Bellman-Ford (음수 OK) / Floyd-Warshall (모든 쌍).
 *
 * 교육 원칙: 한 챕터 = 한 알고리즘 + 한 인터랙션 + 한 미니 퀴즈.
 * 학생 입장: "지하철 노선도에서 환승 적은 길 찾기" — 익숙한 직관에서 시작.
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
  { id: 1, emoji: "🗺️", title: "왜 최단 경로?",            titleEn: "Why Shortest Path?",          mins: 4 },
  { id: 2, emoji: "⚡", title: "다익스트라 — 한 점에서 모두",  titleEn: "Dijkstra — Single Source",    mins: 8 },
  { id: 3, emoji: "➕", title: "Bellman-Ford — 음수 가중치", titleEn: "Bellman-Ford — Negative OK",  mins: 7 },
  { id: 4, emoji: "🌐", title: "Floyd-Warshall — 모든 쌍",   titleEn: "Floyd-Warshall — All Pairs",  mins: 6 },
  { id: 5, emoji: "🏆", title: "정리 + 선택 가이드",         titleEn: "Recap & Picker",              mins: 5 },
]

const STORAGE_KEY = "algo-shortestpath-chapter"

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
        <span className="text-[10px] text-gray-500 italic">{lang === "py" ? "토글: 위쪽 'Py / C++' 버튼" : "Toggle above"}</span>
      </div>
      <HighlightedCode code={lang === "py" ? py : cpp} lang={lang} />
    </div>
  )
}

// ── Chapter 1: 왜 최단 경로? — 동기 + 4 알고리즘 미리보기 ────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 border-2 border-sky-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗺️</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("지하철 환승 경로 — 익숙하죠?", "Subway routes — sound familiar?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "강남에서 홍대까지 가는데 — 어느 길로? 환승 적은 길? 시간 짧은 길? 거리 짧은 길? 우리가 매일 푸는 문제예요.",
                "Gangnam to Hongdae — which way? Fewest transfers? Shortest time? Shortest distance? We solve this daily.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-sky-200 mb-3">
              <p className="text-xs font-bold text-sky-800 mb-2">💡 {t("그래프 언어로 옮기면", "Translated to graph terms")}</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1">
                <li>• {t("정점 = 역", "Vertex = station")}</li>
                <li>• {t("간선 = 두 역 사이 노선 한 구간", "Edge = one segment between stations")}</li>
                <li>• {t("가중치 = 시간 / 거리 / 환승 횟수", "Weight = time / distance / transfers")}</li>
              </ul>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-sky-700">{t("질문", "Question")}:</b>{" "}
              {t(
                "출발 정점 → 도착 정점, 가중치 합이 **최소** 인 경로는?",
                "Start vertex → end vertex — path whose weight **sum is minimum**?",
              )}
            </p>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800 text-center">
                💛 {t("4 가지 알고리즘 — 상황에 맞게 골라 쓰면 끝.", "4 algorithms — pick based on the situation.")}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚠️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("BFS 로는 안 돼요 — 가중치 때문에", "BFS isn't enough — because of weights")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "BFS 는 '간선 한 칸 = 거리 1' 일 때만 최단 경로를 보장해요. 가중치가 다양하면 BFS 가 *틀린 답* 을 줘요.",
                "BFS guarantees shortest only for unit-weight edges. With varied weights, BFS gives *wrong answers*.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs font-bold text-rose-800 mb-2 text-center">💡 {t("간단한 반례 — A 에서 C 까지", "Tiny counterexample — A to C")}</p>
              <svg viewBox="0 0 280 150" className="w-full max-w-[300px] mx-auto block mb-2">
                {/* A—C (10, 간선 1개) : BFS 가 고르는 길 */}
                <line x1={40} y1={45} x2={240} y2={45} stroke="#f43f5e" strokeWidth={3} />
                <rect x={128} y={33} width={24} height={20} rx={5} fill="#fff" stroke="#f43f5e" strokeWidth={2} />
                <text x={140} y={48} textAnchor="middle" fontSize={12} fontWeight={900} fill="#e11d48" fontFamily="monospace">10</text>
                {/* A—B—C (1+1) : 진짜 최단 */}
                <line x1={40} y1={45} x2={140} y2={115} stroke="#10b981" strokeWidth={3} />
                <rect x={78} y={70} width={18} height={20} rx={5} fill="#fff" stroke="#10b981" strokeWidth={2} />
                <text x={87} y={85} textAnchor="middle" fontSize={12} fontWeight={900} fill="#059669" fontFamily="monospace">1</text>
                <line x1={140} y1={115} x2={240} y2={45} stroke="#10b981" strokeWidth={3} />
                <rect x={182} y={70} width={18} height={20} rx={5} fill="#fff" stroke="#10b981" strokeWidth={2} />
                <text x={191} y={85} textAnchor="middle" fontSize={12} fontWeight={900} fill="#059669" fontFamily="monospace">1</text>
                {[{ id: "A", x: 40, y: 45 }, { id: "C", x: 240, y: 45 }, { id: "B", x: 140, y: 115 }].map(n => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={17} fill="#fff" stroke="#64748b" strokeWidth={2.5} />
                    <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontWeight={900} fill="#334155" fontFamily="monospace">{n.id}</text>
                  </g>
                ))}
              </svg>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 bg-rose-50 border-2 border-rose-300 rounded-lg px-2.5 py-1.5">
                  <span className="font-mono text-xs font-black text-rose-700">A→C</span>
                  <span className="text-[11px] text-rose-800">{t("간선 1 개", "1 edge")}</span>
                  <span className="font-mono text-xs font-black text-rose-700 ml-auto">= 10</span>
                  <span className="text-[10px] font-bold text-rose-600">{t("BFS 선택 ✗", "BFS picks ✗")}</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-400 rounded-lg px-2.5 py-1.5">
                  <span className="font-mono text-xs font-black text-emerald-700">A→B→C</span>
                  <span className="text-[11px] text-emerald-800">{t("간선 2 개", "2 edges")}</span>
                  <span className="font-mono text-xs font-black text-emerald-700 ml-auto">= 1+1 = 2</span>
                  <span className="text-[10px] font-bold text-emerald-600">{t("진짜 최단 ✓", "actually shortest ✓")}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed mt-2 text-center">
                {t("BFS 는 간선 *개수* 만 세서 A→C 를 골라요 — 가중치 10 을 못 봐요!",
                   "BFS counts only the *number* of edges, so it picks A→C — blind to the weight 10!")}
              </p>
            </div>
            <p className="text-sm font-bold text-rose-700 text-center">
              {t("그래서 — 가중치를 *합산* 하는 알고리즘이 필요해요.", "So — we need algorithms that *sum weights*.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🧰</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("4 알고리즘 — 한 줄 요약", "4 algorithms — one-liners")}
            </h3>
            <p className="text-xs text-gray-600 text-center mb-4">
              {t("다음 챕터부터 하나씩. 여기서는 '언제 뭐 쓰는지' 만.", "We'll go deep one by one. Here: *when* to use each.")}
            </p>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-2.5 border-2 border-cyan-200">
                <p className="text-sm font-black text-cyan-800 mb-0.5">
                  🚶 {t("BFS — 모든 가중치가 1", "BFS — all weights = 1")}
                </p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {t("O(V + E). 큐 한 번. 환승 횟수 / 칸 수 같은 단위 거리.", "O(V + E). Just a queue. For unit-step distances.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border-2 border-amber-200">
                <p className="text-sm font-black text-amber-800 mb-0.5">
                  ⚡ {t("다익스트라 — 0 이상 가중치", "Dijkstra — non-negative weights")}
                </p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {t("O((V+E) log V). 우선순위 큐. 가장 흔히 쓰는 도구.", "O((V+E) log V). Priority queue. The everyday tool.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-0.5">
                  ➕ {t("Bellman-Ford — 음수 가중치 허용", "Bellman-Ford — negatives OK")}
                </p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {t("O(V × E). 음수 사이클 검출도 가능. 느리지만 강력.", "O(V × E). Detects negative cycles. Slow but mighty.")}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2.5 border-2 border-emerald-200">
                <p className="text-sm font-black text-emerald-800 mb-0.5">
                  🌐 {t("Floyd-Warshall — 모든 쌍 최단", "Floyd-Warshall — all pairs")}
                </p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {t("O(V³). 작은 그래프 (V ≤ 400) 만. 코드는 *3 줄*.", "O(V³). Tiny graphs (V ≤ 400). Code is *3 lines*.")}
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

// ── Chapter 2: Dijkstra — 단일 시작 → 모든 노드 ─────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 5 node interactive Dijkstra simulation
  // Graph: 1↔2 (2), 1↔3 (5), 2↔3 (1), 2↔4 (2), 3↔5 (3), 4↔5 (1)
  // Start: 1. Order of finalization: 1(0) → 2(2) → 3(3) → 4(4) → 5(5)
  const dijkSteps: Array<{ visited: number[]; dist: (number | null)[]; msg: string; msgEn: string }> = [
    { visited: [], dist: [null, 0, null, null, null, null], msg: "시작 — 1: dist=0, 나머지 ∞. PQ = [(0,1)]", msgEn: "Start — 1: 0, others ∞. PQ = [(0, 1)]" },
    { visited: [1], dist: [null, 0, 2, 5, null, null], msg: "1 확정 (dist=0). 이웃 2 ← 2, 3 ← 5 갱신. PQ = [(2,2), (5,3)]", msgEn: "1 finalized (0). Relax 2 ← 2, 3 ← 5. PQ = [(2,2), (5,3)]" },
    { visited: [1, 2], dist: [null, 0, 2, 3, 4, null], msg: "2 확정 (dist=2). 3 ← 2+1=3 (5 보다 작음!), 4 ← 2+2=4. PQ 에 (3,3),(4,4) 추가 — 낡은 (5,3) 은 못 지우고 그냥 남아요.", msgEn: "2 finalized (2). Relax 3 ← 3 (beats 5), 4 ← 4. Push (3,3),(4,4) — the old (5,3) stays in the PQ (can't be removed)." },
    { visited: [1, 2, 3], dist: [null, 0, 2, 3, 4, 6], msg: "3 확정 (dist=3). 5 ← 3+3=6 갱신. PQ = [(4,4), (5,3), (6,5)]", msgEn: "3 finalized (3). Relax 5 ← 6. PQ = [(4,4), (5,3), (6,5)]" },
    { visited: [1, 2, 3, 4], dist: [null, 0, 2, 3, 4, 5], msg: "4 확정 (dist=4). 5 ← 4+1=5 (6 보다 작음). PQ 에 (5,5) 추가.", msgEn: "4 finalized (4). Relax 5 ← 5 (beats 6). Push (5,5)." },
    { visited: [1, 2, 3, 4], dist: [null, 0, 2, 3, 4, 5], msg: "🗑️ PQ 에서 (5,3) 을 꺼냈는데 dist[3]=3 ≠ 5 → 낡은 항목! 그냥 버려요. (코드의 'd != dist[u] → skip' 이 바로 이것)", msgEn: "🗑️ Popped (5,3), but dist[3]=3 ≠ 5 → stale! Just discard. (This is the code's 'd != dist[u] → skip'.)" },
    { visited: [1, 2, 3, 4, 5], dist: [null, 0, 2, 3, 4, 5], msg: "5 확정 (dist=5). 남은 (6,5) 도 낡은 항목이라 버려지고 → ✅ 모든 정점 완료!", msgEn: "5 finalized (5). The leftover (6,5) is stale too and gets discarded → ✅ all done!" },
  ]
  const [dIdx, setDIdx] = useState(0)
  const dCur = dijkSteps[dIdx]
  // Planar layout — cycle 1-2-4-5-3-1 plus the chord 2-3, so no edges cross.
  const NODE_XY: Record<number, { x: number; y: number }> = {
    1: { x: 40, y: 60 }, 2: { x: 160, y: 28 }, 3: { x: 80, y: 168 },
    4: { x: 280, y: 60 }, 5: { x: 240, y: 168 },
  }
  const GRAPH_EDGES: Array<[number, number, number]> = [
    [1, 2, 2], [1, 3, 5], [2, 3, 1], [2, 4, 2], [3, 5, 3], [4, 5, 1],
  ]
  const dStep = () => { if (dIdx < dijkSteps.length - 1) setDIdx(dIdx + 1) }
  const dReset = () => setDIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚡</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("다익스트라 (Dijkstra) 의 한 줄 아이디어", "Dijkstra in one line")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-sm text-gray-800 leading-relaxed">
                <b className="text-amber-700">{t("규칙", "Rule")}:</b>{" "}
                {t(
                  "지금까지 본 정점들 중 *가장 가까운* 미확정 정점을 골라 — 확정. 그 정점에서 이웃들을 *갱신*. 반복.",
                  "Among unfinalized vertices, pick the *closest one* — finalize it. Relax its neighbors. Repeat.",
                )}
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">🛠️ {t("필요한 도구", "Tools needed")}</p>
              <ul className="text-xs text-gray-700 leading-relaxed space-y-1">
                <li>• <code className="bg-amber-100 px-1 rounded">dist[]</code> — {t("각 정점까지의 현재 최단 거리 (시작은 INF)", "current best distance per vertex (init INF)")}</li>
                <li>• <code className="bg-amber-100 px-1 rounded">min-heap (PQ)</code> — {t("가장 가까운 정점을 빨리 꺼내기", "pull closest vertex fast")}</li>
              </ul>
              <p className="text-[11px] text-gray-600 leading-relaxed mt-2 pt-2 border-t border-amber-200">
                {t("우선순위 큐 (min-heap) 가 처음이면? ", "New to the priority queue (min-heap)? ")}
                <Link href="/algo/priorityqueue" className="font-bold text-amber-700 underline decoration-dotted">
                  {t("우선순위 큐 토픽", "Priority Queue topic")}
                </Link>
                {t(" 먼저 보고 와요 — '가장 작은 걸 O(log n) 에 꺼낸다' 만 알면 OK.", " first — just knowing 'pop the smallest in O(log n)' is enough.")}
              </p>
            </div>
            <p className="text-xs font-bold text-amber-800 text-center mt-3">
              👉 {t("다음 슬라이드에서 직접 한 스텝씩 돌려봐요.", "Next slide: run it yourself, step by step.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("5 노드 그래프 — 한 스텝씩", "5-node graph — step through")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("시작 = 1. 가장 가까운 미확정 정점을 매 스텝 확정.", "Start = 1. Finalize the closest unvisited vertex each step.")}
            </p>

            {/* Graph diagram — SVG (was ASCII art, which drew a different graph than the edge list) */}
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <svg viewBox="0 0 320 200" className="w-full max-w-[340px] mx-auto block">
                {GRAPH_EDGES.map(([u, v, w]) => {
                  const a = NODE_XY[u], b = NODE_XY[v]
                  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
                  const done = dCur.visited.includes(u) && dCur.visited.includes(v)
                  return (
                    <g key={`${u}-${v}`}>
                      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke={done ? "#16a34a" : "#cbd5e1"} strokeWidth={done ? 3 : 2} />
                      <rect x={mx - 10} y={my - 9} width={20} height={18} rx={4}
                        fill="#fff" stroke={done ? "#86efac" : "#e2e8f0"} strokeWidth={1.5} />
                      <text x={mx} y={my + 4} textAnchor="middle" fontSize={11} fontWeight={800}
                        fill={done ? "#15803d" : "#64748b"} fontFamily="monospace">{w}</text>
                    </g>
                  )
                })}
                {[1, 2, 3, 4, 5].map(v => {
                  const p = NODE_XY[v]
                  const isStart = v === 1
                  const isVisited = dCur.visited.includes(v)
                  return (
                    <g key={v}>
                      <circle cx={p.x} cy={p.y} r={17}
                        fill={isVisited ? "#dcfce7" : "#fff"}
                        stroke={isVisited ? "#16a34a" : (isStart ? "#f59e0b" : "#94a3b8")}
                        strokeWidth={isVisited || isStart ? 3 : 2} />
                      <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={14} fontWeight={900}
                        fill={isVisited ? "#15803d" : "#334155"} fontFamily="monospace">{v}</text>
                      {isStart && <text x={p.x} y={p.y - 22} textAnchor="middle" fontSize={10} fontWeight={800} fill="#b45309">start</text>}
                    </g>
                  )
                })}
              </svg>
              <p className="text-[10px] text-gray-500 mt-1 text-center">
                {t("간선: 1-2:2, 1-3:5, 2-3:1, 2-4:2, 3-5:3, 4-5:1 · 초록 = 확정된 정점",
                   "Edges: 1-2:2, 1-3:5, 2-3:1, 2-4:2, 3-5:3, 4-5:1 · green = finalized")}
              </p>
            </div>

            {/* dist[] display */}
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map(v => {
                const isVisited = dCur.visited.includes(v)
                const d = dCur.dist[v]
                return (
                  <div key={v} className={cn(
                    "rounded-lg border-2 p-2 text-center transition-all",
                    isVisited && "bg-emerald-100 border-emerald-500",
                    !isVisited && d !== null && "bg-amber-50 border-amber-300",
                    !isVisited && d === null && "bg-gray-50 border-gray-200",
                  )}>
                    <p className="text-[10px] text-gray-500 font-bold">v={v}</p>
                    <p className={cn("text-sm font-black font-mono",
                      isVisited && "text-emerald-800",
                      !isVisited && d !== null && "text-amber-800",
                      !isVisited && d === null && "text-gray-400",
                    )}>
                      {d === null ? "∞" : d}
                    </p>
                    {isVisited && <p className="text-[9px] text-emerald-700 font-bold">✓</p>}
                  </div>
                )
              })}
            </div>

            <div className="bg-amber-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-xs text-amber-900 leading-relaxed">{t(dCur.msg, dCur.msgEn)}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={dStep} disabled={dIdx >= dijkSteps.length - 1}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={dReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {/* 시뮬을 돌려본 *다음* 에 "왜 안전한가" — 방금 본 숫자로 설명 (추상 증명 먼저 X) */}
        {step === 2 && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🤔</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("왜 '가장 가까운 것' 을 확정해도 될까?", "Why is finalizing 'the closest' safe?")}
            </h3>

            <div className="bg-white rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2 text-center">
                {t("방금 시뮬 1 스텝 — 후보가 둘이었죠", "Step 1 of the sim you just ran — two candidates")}
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 border-2 border-emerald-500 font-mono text-sm font-black text-emerald-800">
                  {t("정점 2 = 2", "v2 = 2")}
                </div>
                <span className="text-gray-400 font-black text-xs">vs</span>
                <div className="px-3 py-1.5 rounded-lg bg-gray-100 border-2 border-gray-300 font-mono text-sm font-black text-gray-500">
                  {t("정점 3 = 5", "v3 = 5")}
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed text-center">
                {t("가까운 정점 2 를 확정했어요. 그런데 — 나중에 2 보다 더 빨리 갈 길이 나올 수도 있지 않나요?",
                   "We finalized vertex 2. But — could a better route to vertex 2 show up later?")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t("2 로 가는 다른 길은 반드시 아직 확정 안 된 정점을 먼저 거쳐야 해요. 그런데 남은 후보는 5 부터 시작이에요. 거기서 간선을 더하면?",
                   "Any other route to 2 must first pass through an unfinalized vertex — and the cheapest of those already costs 5. Add an edge on top of that:")}
              </p>
              <p className="text-base font-black text-emerald-800 text-center font-mono py-1">
                5 + ({t("0 이상", "≥ 0")}) ≥ 5 &gt; 2 ✓
              </p>
              <p className="text-xs font-bold text-emerald-800 leading-relaxed text-center mt-1">
                {t("돌아가는 길은 절대 2 를 못 이겨요 → 확정해도 안전!",
                   "A detour can never beat 2 → safe to finalize!")}
              </p>
            </div>

            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-rose-800 leading-relaxed">
                ⚠️ <b>{t("단, 음수 가중치는 안 돼요!", "But: no negative weights!")}</b>{" "}
                {t("간선이 −4 라면 5 + (−4) = 1 < 2 — 돌아가는 길이 더 빨라져서 위 논리가 깨져요. 음수가 있으면 Bellman-Ford (챕터 3).",
                   "With a −4 edge, 5 + (−4) = 1 < 2 — the detour wins and the argument breaks. For negatives use Bellman-Ford (Ch 3).")}
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 다익스트라 (인접 리스트 + 우선순위 큐)", "Code — Dijkstra (adj list + PQ)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("PQ 에서 꺼낼 때 'd != dist[u]' 검사 — *낡은 항목* 스킵.", "On pop, check d != dist[u] — skip *stale* entries.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`import heapq

def dijkstra(n, src, g):           # g[u] = [(v, w), ...]
    dist = [float("inf")] * (n + 1)
    dist[src] = 0
    pq = [(0, src)]                # (거리, 정점)
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:           # 낡은 항목 skip
            continue
        for v, w in g[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist

# 호출: dijkstra(V, 시작, g) → 시작에서 모든 정점까지의 최단 거리`, `import heapq

def dijkstra(n, src, g):           # g[u] = [(v, w), ...]
    dist = [float("inf")] * (n + 1)
    dist[src] = 0
    pq = [(0, src)]                # (dist, vertex)
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:           # skip stale entry
            continue
        for v, w in g[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist

# call: dijkstra(V, src, g) -> shortest dist from src to every vertex`)}
              cpp={t(`#include <bits/stdc++.h>
using namespace std;

vector<long long> dijkstra(int n, int src,
                           vector<vector<pair<int,int>>>& g) {
    const long long INF = LLONG_MAX;
    vector<long long> dist(n + 1, INF);
    dist[src] = 0;
    priority_queue<pair<long long,int>,
                   vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;          // 낡은 항목 skip
        for (auto [v, w] : g[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`, `#include <bits/stdc++.h>
using namespace std;

vector<long long> dijkstra(int n, int src,
                           vector<vector<pair<int,int>>>& g) {
    const long long INF = LLONG_MAX;
    vector<long long> dist(n + 1, INF);
    dist[src] = 0;
    priority_queue<pair<long long,int>,
                   vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;          // skip stale entry
        for (auto [v, w] : g[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "체크포인트: ① dist 초기화 ② PQ 에 (거리, 정점) 푸시 ③ 꺼낼 때 stale 검사 ④ 이웃 relax — 4 단계로 분리해서 보기.",
                "4-step checklist: ① init dist ② push (dist, node) ③ stale-skip ④ relax neighbors.",
              )}
            </p>
            <p className="text-xs font-bold text-amber-800 text-center mt-2 bg-amber-50 border border-amber-200 rounded-lg py-1.5 px-2">
              ⏱️ {t(
                "시간복잡도 O((V+E) log V) — 간선마다 최대 한 번 push, 힙 연산이 log V.",
                "Time O((V+E) log V) — at most one push per edge, each heap op is log V.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 3: Bellman-Ford — 음수 가중치 허용 ──────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // BF round-by-round on 4 nodes (V=4): 1→2 (4), 1→3 (5), 2→3 (-2), 3→4 (1)
  // 이 시뮬은 "한 라운드는 *이전 라운드* 값으로 모든 간선을 검사" 하는 모델로 보여준다
  // (간선 순서에 안 휘둘려서 라운드 개념이 또렷함).  V-1 = 3 갱신 라운드 + 1 검사 라운드.
  //   R1 [0,4,5,∞] → R2 [0,4,2,6] → R3 [0,4,2,3] → R4(검사) 변화 없음
  const bfSteps: Array<{ dist: (number | null)[]; msg: string; msgEn: string }> = [
    { dist: [null, 0, null, null, null], msg: "시작 — dist[1] = 0, 나머지 ∞", msgEn: "Start — dist[1] = 0, others ∞" },
    { dist: [null, 0, 4, 5, null], msg: "라운드 1 — 1→2 (0+4=4), 1→3 (0+5=5) 갱신. 2→3, 3→4 는 출발점이 아직 ∞ 라 통과.", msgEn: "Round 1 — relax 1→2 (4), 1→3 (5). 2→3 and 3→4 skip: their source is still ∞." },
    { dist: [null, 0, 4, 2, 6], msg: "라운드 2 — 2→3: 4+(−2)=2 < 5 갱신! 3→4: 5+1=6 갱신.", msgEn: "Round 2 — 2→3: 4+(−2)=2 < 5 relax! 3→4: 5+1=6 relax." },
    { dist: [null, 0, 4, 2, 3], msg: "라운드 3 — 3→4: 2+1=3 < 6 갱신. (V−1 = 3 라운드 끝 → 여기까지가 정답)", msgEn: "Round 3 — 3→4: 2+1=3 < 6 relax. (V−1 = 3 rounds done → this is the answer)" },
    { dist: [null, 0, 4, 2, 3], msg: "검사 라운드 (V 번째) — 한 번 더 돌려도 변화 없음 → 음수 사이클 없음 ✅", msgEn: "Check round (the V-th) — one more pass, nothing changes → no negative cycle ✅" },
  ]
  const [bfIdx, setBfIdx] = useState(0)
  const bfCur = bfSteps[bfIdx]
  const bfStep = () => { if (bfIdx < bfSteps.length - 1) setBfIdx(bfIdx + 1) }
  const bfReset = () => setBfIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border-2 border-purple-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">➕</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("음수 가중치도 OK", "Negative weights OK")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "음수 간선? 통화 환전 (수익 / 손실), 게임 (HP 회복 / 데미지) — 흔해요. 다익스트라가 못하는 영역.",
                "Negative edges? Currency arbitrage, game HP gain/damage — common. Dijkstra can't handle them.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-2">💡 {t("Bellman-Ford 의 아이디어 — 단순하지만 강력", "Bellman-Ford idea — simple but mighty")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "모든 간선을 보고 한 번씩 'relax' (더 짧은 거리 발견 시 갱신). 이걸 V-1 번 반복하면 정답.",
                  "Look at every edge once and relax (update if shorter). Repeat V-1 times → answer.",
                )}
              </p>
              <pre className="text-xs text-gray-800 font-mono mt-2 leading-relaxed">
{`for round in 1..V-1:
    for each edge (u, v, w):
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w   # relax`}
              </pre>
            </div>
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-rose-800 leading-relaxed">
                🔍 <b>{t("보너스 — 음수 사이클 검출", "Bonus — negative cycle detection")}</b>{" "}
                {t(
                  "V 번째 라운드에 또 갱신되는 게 있으면 *음수 사이클 존재*. 무한 절감 가능 — '최단 거리' 자체가 정의 안 됨.",
                  "If a Vth round still relaxes anything → *negative cycle*. Infinite improvement — no defined 'shortest'.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-purple-300 p-4">
            <p className="text-base font-black text-purple-900 mb-2 text-center">🎮 {t("4 노드 음수 간선 그래프", "4-node graph with a negative edge")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("간선: 1→2 (4), 1→3 (5), 2→3 (-2), 3→4 (1)", "Edges: 1→2 (4), 1→3 (5), 2→3 (-2), 3→4 (1)")}
            </p>

            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <svg viewBox="0 0 260 180" className="w-full max-w-[280px] mx-auto block">
                <defs>
                  <marker id="bfArrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
                  </marker>
                </defs>
                {[
                  { u: [45, 32], v: [200, 32], w: "4", lx: 122, ly: 22 },     // 1→2
                  { u: [45, 32], v: [45, 105], w: "5", lx: 30, ly: 70 },      // 1→3
                  { u: [200, 32], v: [62, 100], w: "−2", lx: 145, ly: 78 },   // 2→3  (음수)
                  { u: [45, 118], v: [45, 148], w: "1", lx: 30, ly: 137 },    // 3→4
                ].map((e, i) => (
                  <g key={i}>
                    <line x1={e.u[0]} y1={e.u[1]} x2={e.v[0]} y2={e.v[1]}
                      stroke={e.w === "−2" ? "#e11d48" : "#7c3aed"} strokeWidth={2.5}
                      markerEnd="url(#bfArrow)" />
                    <rect x={e.lx - 11} y={e.ly - 10} width={22} height={19} rx={5}
                      fill="#fff" stroke={e.w === "−2" ? "#fda4af" : "#c4b5fd"} strokeWidth={1.5} />
                    <text x={e.lx} y={e.ly + 4} textAnchor="middle" fontSize={11} fontWeight={900}
                      fill={e.w === "−2" ? "#e11d48" : "#6d28d9"} fontFamily="monospace">{e.w}</text>
                  </g>
                ))}
                {[{ id: 1, x: 45, y: 32 }, { id: 2, x: 200, y: 32 }, { id: 3, x: 45, y: 110 }, { id: 4, x: 45, y: 158 }].map(n => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={15} fill="#fff" stroke="#7c3aed" strokeWidth={2.5} />
                    <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={900}
                      fill="#5b21b6" fontFamily="monospace">{n.id}</text>
                  </g>
                ))}
              </svg>
              <p className="text-[10px] text-rose-700 font-bold text-center mt-1">
                {t("빨간 −2 = 음수 간선 (다익스트라가 못 쓰는 이유)", "The red −2 is the negative edge (why Dijkstra can't be used)")}
              </p>
            </div>
            <p className="text-[11px] text-gray-600 text-center mb-2 leading-relaxed">
              {t("※ 한 라운드 = 모든 간선을 '이전 라운드 값' 으로 한 번씩 검사.",
                 "※ One round = check every edge once, using the previous round's values.")}
            </p>

            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[1, 2, 3, 4].map(v => {
                const d = bfCur.dist[v]
                return (
                  <div key={v} className={cn(
                    "rounded-lg border-2 p-2 text-center",
                    d !== null && "bg-purple-50 border-purple-300",
                    d === null && "bg-gray-50 border-gray-200",
                  )}>
                    <p className="text-[10px] text-gray-500 font-bold">v={v}</p>
                    <p className={cn("text-sm font-black font-mono",
                      d !== null && "text-purple-800",
                      d === null && "text-gray-400",
                    )}>
                      {d === null ? "∞" : d}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="bg-purple-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-xs text-purple-900 leading-relaxed">{t(bfCur.msg, bfCur.msgEn)}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={bfStep} disabled={bfIdx >= bfSteps.length - 1}
                className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 라운드", "Next round")}
              </button>
              <button onClick={bfReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2 text-center">
              {t("주목: dist[3] 가 5 → 2 로 *줄어듦*. 음수 간선 덕분.", "Note: dist[3] *drops* 5 → 2 thanks to the negative edge.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Bellman-Ford + 음수 사이클 검출", "Code — Bellman-Ford + negative cycle check")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("V-1 라운드 + 1 라운드 (사이클 검사). 합치면 V 라운드.", "V-1 rounds + 1 (cycle test). V rounds total.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def bellman_ford(n, src, edges):     # edges = [(u, v, w), ...]
    INF = float("inf")
    dist = [INF] * (n + 1)
    dist[src] = 0

    # V-1 라운드 relax
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # V 번째 라운드 — 또 갱신되면 음수 사이클
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None   # 음수 사이클!
    return dist`, `def bellman_ford(n, src, edges):     # edges = [(u, v, w), ...]
    INF = float("inf")
    dist = [INF] * (n + 1)
    dist[src] = 0

    # V-1 relax rounds
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # round V — if it still updates, there's a negative cycle
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None   # negative cycle!
    return dist`)}
              cpp={t(`#include <bits/stdc++.h>
using namespace std;

// 반환: 음수 사이클이면 empty, 아니면 dist
vector<long long> bellmanFord(int n, int src,
                              vector<tuple<int,int,int>>& edges) {
    const long long INF = LLONG_MAX;
    vector<long long> dist(n + 1, INF);
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++)
        for (auto& [u, v, w] : edges)
            if (dist[u] != INF && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
    // 음수 사이클 검출
    for (auto& [u, v, w] : edges)
        if (dist[u] != INF && dist[u] + w < dist[v])
            return {};                 // negative cycle!
    return dist;
}`, `#include <bits/stdc++.h>
using namespace std;

// returns: empty if negative cycle, otherwise dist
vector<long long> bellmanFord(int n, int src,
                              vector<tuple<int,int,int>>& edges) {
    const long long INF = LLONG_MAX;
    vector<long long> dist(n + 1, INF);
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++)
        for (auto& [u, v, w] : edges)
            if (dist[u] != INF && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
    // negative cycle check
    for (auto& [u, v, w] : edges)
        if (dist[u] != INF && dist[u] + w < dist[v])
            return {};                 // negative cycle!
    return dist;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "함정: dist[u] == INF 일 때 + w 를 *해선 안 됨* (오버플로우). 모든 relax 전에 INF 검사!",
                "Pitfall: NEVER add w to dist[u] when dist[u] is INF (overflow). Guard every relax.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 4: Floyd-Warshall — 모든 쌍 최단 경로 ────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 3-node FW simulation. Edges: 1→2 (4), 2→3 (1), 1→3 (10), 3→1 (∞)
  // Initial dist matrix (1-indexed shown as 3x3):
  // After k=1: no improvement (since only 1 as intermediate doesn't add new path)
  // After k=2: dist[1][3] = min(10, 4+1) = 5
  // After k=3: no improvement
  const fwMatrices = [
    {
      k: 0,
      matrix: [
        [0, 4, 10],
        [null, 0, 1],
        [null, null, 0],
      ],
      msg: "초기 — 직접 간선만 채움. 1→3 = 10 (직접).",
      msgEn: "Init — direct edges only. 1→3 = 10 (direct).",
    },
    {
      k: 1,
      matrix: [
        [0, 4, 10],
        [null, 0, 1],
        [null, null, 0],
      ],
      msg: "k=1 — 정점 1 을 경유지로 쓸 수 있다고 가정. 새 단축 경로 없음.",
      msgEn: "k=1 — vertex 1 as intermediate. No new shortcuts.",
    },
    {
      k: 2,
      matrix: [
        [0, 4, 5],
        [null, 0, 1],
        [null, null, 0],
      ],
      msg: "k=2 — 정점 2 경유 허용! dist[1][3] = min(10, 4+1) = 5 ✨",
      msgEn: "k=2 — vertex 2 as intermediate! dist[1][3] = min(10, 4+1) = 5 ✨",
    },
    {
      k: 3,
      matrix: [
        [0, 4, 5],
        [null, 0, 1],
        [null, null, 0],
      ],
      msg: "k=3 — 정점 3 도 경유 허용. 더 단축 없음. ✅ 완료!",
      msgEn: "k=3 — vertex 3 also allowed. No further updates. ✅ Done!",
    },
  ]
  const [fwIdx, setFwIdx] = useState(0)
  const fwCur = fwMatrices[fwIdx]
  const fwStep = () => { if (fwIdx < fwMatrices.length - 1) setFwIdx(fwIdx + 1) }
  const fwReset = () => setFwIdx(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("모든 쌍 최단 — 3 줄짜리 마법", "All-Pairs Shortest — 3-line magic")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "'정점 A 에서 정점 B 로' 한 쌍이 아니라 — *모든 쌍* 최단 거리가 필요할 때? 다익스트라를 V 번? 가능하지만, V 가 작으면 더 간단한 길이 있어요.",
                "Need shortest path between *every pair*? You could run Dijkstra V times. But for small V there's a simpler way.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-teal-200 mb-3">
              <p className="text-xs font-bold text-teal-800 mb-2">💡 {t("핵심 통찰", "Key insight")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "k 라는 정점을 *경유지로 허용* 했을 때, i 에서 j 로의 최단 거리는?",
                  "If we allow vertex k as an intermediate, what's the shortest i→j?",
                )}
              </p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{t(`dist[i][j] = min(
    dist[i][j],            # k 안 거침
    dist[i][k] + dist[k][j]  # k 거침
)`, `dist[i][j] = min(
    dist[i][j],            # without k
    dist[i][k] + dist[k][j]  # through k
)`)}
              </pre>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                {t(
                  "이걸 k = 1, 2, ..., V 순서로 적용 → 모든 경유 허용 = 진짜 최단.",
                  "Apply this for k = 1, 2, ..., V → all intermediates allowed = true shortest.",
                )}
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                ⚠️ <b>{t("시간: O(V³)", "Time: O(V³)")}</b>{" "}
                {t(
                  "V=100 → 10⁶ 안전. V=400 → 6.4 × 10⁷ 한계. V=1000 부터는 너무 느림. *작은 그래프 전용*.",
                  "V=100 → 10⁶ fast. V=400 → 6.4 × 10⁷ marginal. V≥1000 too slow. *Small graphs only*.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-teal-300 p-4">
            <p className="text-base font-black text-teal-900 mb-2 text-center">🎮 {t("3 노드 — k 라운드별 행렬 변화", "3 nodes — matrix per k-round")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("간선: 1→2 (4), 2→3 (1), 1→3 (10). 정답: dist[1][3] = 5 (1→2→3).", "Edges: 1→2 (4), 2→3 (1), 1→3 (10). Answer: dist[1][3] = 5 (1→2→3).")}
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mb-3 overflow-x-auto">
              <p className="text-xs font-bold text-teal-700 mb-2 text-center">
                {fwCur.k === 0
                  ? t("초기 상태 (k = 0)", "Initial (k = 0)")
                  : t(`라운드 k = ${fwCur.k}`, `Round k = ${fwCur.k}`)}
              </p>
              <table className="mx-auto text-xs font-mono">
                <thead>
                  <tr className="text-gray-500">
                    <th className="px-2 py-1"></th>
                    <th className="px-2 py-1">→1</th>
                    <th className="px-2 py-1">→2</th>
                    <th className="px-2 py-1">→3</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map(i => (
                    <tr key={i}>
                      <td className="px-2 py-1 text-gray-500 font-bold">{i + 1}↓</td>
                      {[0, 1, 2].map(j => {
                        const v = fwCur.matrix[i][j]
                        const prev = fwIdx > 0 ? fwMatrices[fwIdx - 1].matrix[i][j] : null
                        const changed = fwIdx > 0 && v !== prev
                        return (
                          <td key={j} className={cn(
                            "px-3 py-1 border text-center font-bold transition-all",
                            changed && "bg-emerald-100 border-emerald-400 text-emerald-800",
                            !changed && v === null && "text-gray-400 border-gray-200",
                            !changed && v !== null && "text-gray-800 border-gray-200",
                          )}>
                            {v === null ? "∞" : v}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-teal-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-xs text-teal-900 leading-relaxed">{t(fwCur.msg, fwCur.msgEn)}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={fwStep} disabled={fwIdx >= fwMatrices.length - 1}
                className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 k", "Next k")}
              </button>
              <button onClick={fwReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 진짜 3 줄", "Code — really just 3 lines")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("루프 순서 *반드시* k → i → j. 바꾸면 틀림.", "Loop order MUST be k → i → j. Swap = wrong.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`INF = float("inf")
# dist[i][j] 를 직접 간선 / INF / 0 (i==j) 으로 초기화 후:

for k in range(n):
    for i in range(n):
        for j in range(n):
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]

# dist[i][j] = i 에서 j 로의 최단 거리`, `INF = float("inf")
# init dist[i][j] to direct edge / INF / 0 (i==j), then:

for k in range(n):
    for i in range(n):
        for j in range(n):
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]

# dist[i][j] = shortest distance from i to j`)}
              cpp={t(`const long long INF = 1e18;              // int 말고 long long!
vector<vector<long long>> dist(n, vector<long long>(n, INF));
// dist[i][i] = 0, 직접 간선은 dist[x][y] = w 로 미리 채워두기

for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (dist[i][k] != INF && dist[k][j] != INF        // ← INF 검사 필수!
                && dist[i][k] + dist[k][j] < dist[i][j])
                dist[i][j] = dist[i][k] + dist[k][j];

// 끝! dist[i][j] = i 에서 j 로의 최단 거리.`, `const long long INF = 1e18;              // long long, not int!
vector<vector<long long>> dist(n, vector<long long>(n, INF));
// set dist[i][i] = 0 and dist[x][y] = w for each direct edge

for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (dist[i][k] != INF && dist[k][j] != INF        // ← guard required!
                && dist[i][k] + dist[k][j] < dist[i][j])
                dist[i][j] = dist[i][k] + dist[k][j];

// done! dist[i][j] = shortest distance from i to j.`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "삼중 루프가 전부! 단 k 가 반드시 바깥. INF 검사를 빼면 INF + INF 로 오버플로우 나요 — 위 코드엔 이미 넣어뒀어요.",
                "The triple loop is the whole thing — k MUST be outermost. Without the INF guard you overflow on INF + INF — the code above already has it.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 5: 정리 + 선택 가이드 + 옆길 ─────────────────────────
function Chapter5({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 2
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🏆</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("알고리즘 선택 가이드", "Algorithm Picker")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "문제 풀기 전 '어떤 도구?' 부터. 이 표가 그 결정을 빠르게 해줘요.",
                "Before coding, ask 'which tool?'. This table answers fast.",
              )}
            </p>
            <div className="bg-white/90 rounded-lg p-3 border border-emerald-200 overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b-2 border-emerald-300 text-emerald-800 font-bold">
                    <th className="text-left py-1.5 pr-2">{t("상황", "Situation")}</th>
                    <th className="text-left py-1.5 pr-2">{t("도구", "Tool")}</th>
                    <th className="text-left py-1.5">{t("시간", "Time")}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr className="border-b border-gray-200">
                    <td className="py-1.5 pr-2">{t("가중치 = 1 (단위)", "Weight = 1")}</td>
                    <td className="py-1.5 pr-2 font-bold text-cyan-700">BFS</td>
                    <td className="py-1.5">O(V + E)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-1.5 pr-2">{t("0 이상 가중치, 한 점 → 모두", "Non-negative, single source")}</td>
                    <td className="py-1.5 pr-2 font-bold text-amber-700">Dijkstra</td>
                    <td className="py-1.5">O((V+E) log V)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-1.5 pr-2">{t("음수 가중치 있음", "Has negatives")}</td>
                    <td className="py-1.5 pr-2 font-bold text-purple-700">Bellman-Ford</td>
                    <td className="py-1.5">O(V × E)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-2">{t("모든 쌍 (V ≤ 400)", "All pairs (V ≤ 400)")}</td>
                    <td className="py-1.5 pr-2 font-bold text-teal-700">Floyd-Warshall</td>
                    <td className="py-1.5">O(V³)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-emerald-700 text-center mt-3 italic">
              {t("90% 의 문제는 다익스트라. 음수 보이면 Bellman-Ford, '모든 쌍' 키워드면 Floyd-Warshall.", "90% = Dijkstra. 'Negative' → Bellman-Ford. 'All pairs' → Floyd-Warshall.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("최단 경로 = ", "Shortest path = ")}<b>{t("가중치 합 최소", "minimum weight sum")}</b>. {t("BFS 는 단위 가중치 전용.", "BFS only works for unit weights.")}</li>
              <li><b>2.</b> <b className="text-amber-700">{t("다익스트라", "Dijkstra")}</b> {t("— 0 이상 가중치 표준. PQ + dist[] + 낡은 항목 skip.", "— non-negative weights standard. PQ + dist[] + skip-stale.")}</li>
              <li><b>3.</b> <b className="text-purple-700">Bellman-Ford</b> {t("— 음수 OK. V-1 라운드 모든 간선 relax + 1 라운드로 음수 사이클 검출.", "— negatives OK. V-1 rounds relax all edges + 1 round for cycle check.")}</li>
              <li><b>4.</b> <b className="text-teal-700">Floyd-Warshall</b> {t("— 모든 쌍. 3 중 루프 (k → i → j). V ≤ 400 일 때만.", "— all pairs. Triple loop (k → i → j). V ≤ 400 only.")}</li>
              <li><b>5.</b> {t("필수: dist[u] == INF 일 때 + w 금지! 항상 INF 검사 후 갱신.", "Critical: don't add w to INF — always guard.")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("이제 USACO 문제 절반의 핵심이 손에 잡혔어요.", "Half of USACO problems just clicked into reach.")}
            </p>

            {/* 옆길 — 더 연습 필요한 학생용 */}
            <div className="mt-4 pt-3 border-t border-amber-300">
              <p className="text-[11px] font-black text-amber-900 mb-2 uppercase tracking-wide">
                🛤️ {t("옆길 — 더 연습이 필요하다면", "Side trail — if you need more practice")}
              </p>
              <ul className="text-[11px] text-gray-700 space-y-1.5 leading-relaxed">
                <li>
                  • <b>{t("아직 다익스트라 어색해요?", "Dijkstra still fuzzy?")}</b>{" "}
                  {t("종이에 5 노드 그래프 그려서 손으로 한 스텝씩 — dist[] 와 PQ 가 어떻게 바뀌는지. 손으로 한 번이면 평생.", "Draw a 5-node graph on paper and step through by hand. One pencil run = lifetime.")}
                </li>
                <li>
                  • <b>{t("그래프 표현이 헷갈려요?", "Graph representation tripping you?")}</b>{" "}
                  <Link href="/algo/graph" className="font-bold underline text-purple-700">{t("그래프 (BFS/DFS) 챕터 →", "Graph (BFS/DFS) chapter →")}</Link>{" "}
                  {t("로 돌아가서 인접 리스트부터.", "for adjacency list basics.")}
                </li>
                <li>
                  • <b>{t("우선순위 큐가 처음이에요?", "Priority queue is new?")}</b>{" "}
                  <Link href="/algo/priorityqueue" className="font-bold underline text-rose-700">{t("우선순위 큐 챕터 →", "Priority Queue chapter →")}</Link>{" "}
                  {t("로. 다익스트라의 심장.", "— Dijkstra's heart.")}
                </li>
              </ul>
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
              ? <>🎉 {t("최단 경로 마스터!", "Shortest Path Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function ShortestPathPage() {
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
          user_id: user.id, lesson_id: "algo-shortestpath", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-shortestpath")) {
          arr.push("algo-shortestpath")
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-purple-50 pb-48">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <div className="mb-4">
          <JourneyBreadcrumb items={[
              { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
              { label: "최단 경로", labelEn: "Shortest Path", emoji: "🗺️" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🗺️</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("최단 경로", "Shortest Path")}</h1>
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
            <Link href="/algo/shortestpath"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("최단 경로 문제 12 개 — Dijkstra / BF / FW 한 판!", "12 challenges — Dijkstra / BF / FW combined!")}</p>
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
            <div className="h-full bg-gradient-to-r from-sky-400 to-cyan-500 transition-all duration-500"
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
              <h3 className="text-xl font-black text-emerald-900">{t("최단 경로 마스터!", "Shortest Path Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo/shortestpath" className="block px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm text-center border-2 border-emerald-200">
                🏆 {t("최단 경로 문제 12 개 풀러 가기", "12 shortest-path challenges")} <ArrowRight className="inline w-4 h-4" />
              </Link>
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽", "Next topic")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
