"use client"

/**
 * 유니온 파인드 (Union Find / DSU) — 챕터식 학습 페이지 v1.
 *
 * Wave 2 — 동적 연결성. 친구 그룹 비유 → parent 배열 + find → path compression → union by rank → 정리.
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
  { id: 1, emoji: "🔵", title: "왜 유니온 파인드?",              titleEn: "Why Union Find?",              mins: 4 },
  { id: 2, emoji: "🌲", title: "parent 배열 + find",              titleEn: "parent array + find",          mins: 6 },
  { id: 3, emoji: "🗜️", title: "Path Compression",                titleEn: "Path Compression",             mins: 7 },
  { id: 4, emoji: "⚖️", title: "Union by Rank / Size",            titleEn: "Union by Rank / Size",         mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 옆길",                     titleEn: "Recap & Side path",            mins: 5 },
]

const STORAGE_KEY = "algo-unionfind-chapter"

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

// ── Chapter 1: 왜 유니온 파인드? ─────────────────────────────────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border-2 border-sky-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">👥</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("친구 그룹 — 같은 패예요?", "Friend groups — same crew?")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-sky-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "A 와 B 가 친구. B 와 C 가 친구. 그럼 A, B, C 는 *같은 그룹*. D 와 E 는 따로. F 는 혼자.",
                "A and B are friends. B and C are friends. So A, B, C are *one group*. D, E another. F alone.",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-sky-200 mb-3">
              <p className="text-xs font-bold text-sky-800 mb-2">💡 {t("두 가지를 빠르게 하고 싶어요", "We want two things fast")}</p>
              <ul className="text-xs text-gray-800 space-y-1.5 leading-relaxed">
                <li><b className="text-sky-700">① union(a, b)</b> — {t("a 와 b 를 한 그룹으로 합치기", "merge a and b into one group")}</li>
                <li><b className="text-sky-700">② find(a)</b> — {t("a 가 속한 그룹의 *대표* 알아내기", "find the *representative* of a's group")}</li>
              </ul>
              <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                {t(
                  "find(a) == find(b) ? 같은 그룹! 다르다? 다른 그룹.",
                  "find(a) == find(b)? Same group! Different? Different group.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-sky-700 text-center">
              {t("이 두 가지를 *거의 O(1)* 로 — 그게 유니온 파인드 (DSU).", "Both in *almost O(1)* — that's Union Find (DSU).")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔗</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("동적 연결성 — 합치고 묻고, 합치고 묻고", "Dynamic connectivity — merge & query")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "그래프 BFS/DFS 로도 '같은 그룹?' 알 수 있어요. 그런데 *간선이 계속 추가되는* 상황이면 매번 BFS 돌리기엔 너무 느려요.",
                "BFS/DFS can answer 'same group?' too. But if edges *keep being added*, re-running BFS each time is too slow.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-indigo-200 mb-3">
              <p className="text-xs font-bold text-indigo-800 mb-2">📊 {t("비교", "Compare")}</p>
              <pre className="text-[11px] text-gray-800 font-mono leading-relaxed">
{`연결 쿼리 Q 번, 노드 N 개:
- 매번 BFS:   O(Q × (N + 간선))    😱
- 유니온 파인드: O(Q × α(N)) ≈ O(Q)  ✅`}
              </pre>
              <p className="text-[11px] text-gray-700 mt-2 leading-relaxed">
                {t(
                  "α(N) 은 *역 애커만 함수* — N 이 10⁸⁰ 이어도 4 이하. 그냥 상수라고 봐도 돼요.",
                  "α(N) is the *inverse Ackermann* — even N = 10⁸⁰ keeps it ≤ 4. Treat it as constant.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-indigo-700 text-center">
              {t("간선이 *추가* 만 되는 (삭제 X) 상황 — DSU 의 본진.", "When edges only get *added* (no removal) — DSU's home turf.")}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🛠️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("실전에서 어디에 쓰나?", "Where it's used")}
            </h3>
            <div className="space-y-2.5">
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🌉 {t("크루스칼 (MST 최소 신장 트리)", "Kruskal (MST)")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "간선을 가중치 순으로 보면서, *사이클 안 만드는* 간선만 추가. find 로 사이클 검출.",
                    "Scan edges by weight; only add ones that *don't form a cycle*. find detects cycles.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔁 {t("사이클 검출", "Cycle detection")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "간선 (a,b) 추가 전에 find(a) == find(b) 면? 이미 연결됨 → 이 간선 추가하면 사이클!",
                    "Before adding edge (a,b): find(a) == find(b)? Already connected → adding this edge makes a cycle!",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  🔢 {t("연결 컴포넌트 개수", "Component count")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "USACO Bronze 단골 — '같은 집단 몇 개?' 답은 *자기 자신이 부모인 노드 수*.",
                    "USACO Bronze regular — 'how many groups?' Answer: *nodes that are their own parent*.",
                  )}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-purple-800 text-center mt-4">
              {t("다음 챕터: parent 배열로 그룹 표현하기!", "Next: representing groups with a parent array!")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: parent 배열 + find ─────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 노드 5개, 연산 시퀀스 union(1,2), union(3,4), find(1), find(3), union(2,3)
  // 각 스텝마다 parent 배열 상태 표시
  const ufSteps: { op: string; parent: number[]; note: string; noteEn: string }[] = [
    { op: "초기 상태", parent: [0, 1, 2, 3, 4, 5], note: "각자 자기 자신이 부모 (혼자 그룹)", noteEn: "each node is its own parent (singleton)" },
    { op: "union(1, 2)", parent: [0, 1, 1, 3, 4, 5], note: "2 의 부모를 1 로. 이제 {1, 2} 한 그룹", noteEn: "parent[2] = 1. Now {1, 2} together" },
    { op: "union(3, 4)", parent: [0, 1, 1, 3, 3, 5], note: "4 의 부모를 3 으로. {3, 4} 한 그룹", noteEn: "parent[4] = 3. {3, 4} together" },
    { op: "find(1) = 1", parent: [0, 1, 1, 3, 3, 5], note: "1 의 부모는 1 — 자기 자신. 대표!", noteEn: "parent[1] = 1 — itself. Representative!" },
    { op: "find(3) = 3", parent: [0, 1, 1, 3, 3, 5], note: "3 의 부모는 3 — 다른 그룹의 대표", noteEn: "parent[3] = 3 — different group's rep" },
    { op: "union(2, 3)", parent: [0, 1, 1, 1, 3, 5], note: "find(2)=1, find(3)=3 → parent[3]=1. 이제 {1,2,3,4} 다 한 그룹!", noteEn: "find(2)=1, find(3)=3 → parent[3]=1. {1,2,3,4} all one group!" },
  ]
  const [ufIdx, setUfIdx] = useState(0)
  const ufStep = () => { if (ufIdx < ufSteps.length - 1) setUfIdx(ufIdx + 1) }
  const ufReset = () => setUfIdx(0)
  const cur = ufSteps[ufIdx]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🌲</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("아이디어: 각 노드는 *부모만* 기억한다", "Idea: each node remembers *only its parent*")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "그룹을 트리로 표현해요. 노드는 자기 부모 하나만 기억. 같은 그룹? → ",
                "Represent each group as a tree. Each node knows only its parent. Same group? → ",
              )}<b className="text-cyan-700">{t("부모 따라 올라가서 *루트가 같으면* 같은 그룹.", "follow parent up, *same root = same group*.")}</b>
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">📌 {t("parent 배열", "parent array")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`처음:    parent = [_, 1, 2, 3, 4, 5]   ← 노드 i 의 부모 = parent[i]
                  ↑  i = 1..5 모두 자기 자신
                  (혼자 그룹 5 개)

union(1,2) 후: parent = [_, 1, 1, 3, 4, 5]
                              ↑ 2 의 부모가 1!
                              (1 이 {1,2} 의 루트)`}
              </pre>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200">
              <p className="text-xs font-bold text-cyan-800 mb-1">🎯 {t("find(x) — 루트 찾는 법", "find(x) — find the root")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "while parent[x] != x: x = parent[x]. 자기 자신이 부모인 노드까지 올라감.",
                  "while parent[x] != x: x = parent[x]. Climb until you hit a self-parent.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("5 노드 — 합치고 찾기", "5 nodes — union & find")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("연산 시퀀스를 한 칸씩. parent 배열이 어떻게 바뀌는지 봐요.", "Step through the ops. Watch parent[] change.")}
            </p>

            {/* parent 배열 시각화 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1">parent[]</p>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[10px] text-gray-500 font-mono">{i}</div>
                    <div className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-md border-2 font-mono text-sm font-bold transition-all",
                      cur.parent[i] === i
                        ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                        : "bg-blue-100 border-blue-300 text-blue-700",
                    )}>
                      {cur.parent[i]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-1.5">
                {t("초록 = 자기 자신이 부모 (루트)", "Green = self-parent (root)")}
              </p>
            </div>

            <div className="bg-cyan-50 rounded-lg p-3 mb-3">
              <p className="text-xs font-bold text-cyan-900 mb-1">{cur.op}</p>
              <p className="text-[11px] text-cyan-800 leading-relaxed">{t(cur.note, cur.noteEn)}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={ufStep} disabled={ufIdx >= ufSteps.length - 1}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음 연산", "Next op")} ({ufIdx + 1}/{ufSteps.length})
              </button>
              <button onClick={ufReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>

            <div className="mt-3 bg-indigo-50 rounded-xl p-3 border-2 border-indigo-200">
              <p className="text-xs font-black text-indigo-900 mb-2">🪜 {t("find 의 진짜 동작: 루트까지 *한 칸씩 올라가기*", "What find really does: *climb up one step at a time*")}</p>
              <p className="text-[11px] text-gray-700 leading-relaxed mb-2">
                {t(
                  "위 시뮬은 이미 *루트인* 노드만 조회해서 한 방에 끝나 보여요. 하지만 일반적으로 find(x) 는 한 칸에 안 끝나요. x 의 부모로, 그 부모의 부모로... parent[x] == x 인 *루트* 를 만날 때까지 계속 올라가요.",
                  "The sim above only queries nodes that are *already roots*, so it looks one-step. But in general find(x) isn't one step. Go to x's parent, then that parent's parent... and keep climbing until you hit a *root* where parent[x] == x.",
                )}
              </p>
              <div className="bg-white/70 rounded-lg p-2 border border-indigo-200">
                <p className="text-[11px] font-mono text-gray-700 leading-relaxed">
                  {t("예: 1→2→3→4 체인에서 find(1):", "e.g. chain 1→2→3→4, find(1):")}<br />
                  1 → parent[1]=2 → 2 → parent[2]=3 → 3 → parent[3]=4 → parent[4]=4 ✓ {t("루트!", "root!")}
                </p>
              </div>
              <p className="text-[11px] text-indigo-700 leading-relaxed mt-2 font-bold">
                {t(
                  "체인이 길면 이 '올라가기' 가 O(N) 까지 느려져요 — 그래서 다음 챕터에서 *경로 압축* 으로 트리를 납작하게 눌러요.",
                  "If the chain is long, this climb degrades to O(N) — that's why the next chapter flattens the tree with *path compression*.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 기본 parent + find", "Code — basic parent + find")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("아직 path compression / union by rank 없음. 가장 단순한 버전.", "No path compression / union by rank yet. Simplest version.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`N = 5
parent = [i for i in range(N + 1)]   # 0..N — 각자 자기 부모

def find(x):
    while parent[x] != x:            # 루트까지 올라가기
        x = parent[x]
    return x

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb: return              # 이미 같은 그룹
    parent[rb] = ra                  # b 의 루트를 a 의 루트 밑에

union(1, 2)
union(3, 4)
union(2, 3)
print(find(1) == find(4))   # True — 다 같은 그룹!`}
              cpp={`#include <iostream>
#include <vector>
using namespace std;

vector<int> parent;

int find(int x) {
    while (parent[x] != x) {       // 루트까지 올라가기
        x = parent[x];
    }
    return x;
}

void unite(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return;          // 이미 같은 그룹
    parent[rb] = ra;
}

int main() {
    int N = 5;
    parent.resize(N + 1);
    for (int i = 0; i <= N; i++) parent[i] = i;

    unite(1, 2);
    unite(3, 4);
    unite(2, 3);
    cout << (find(1) == find(4)) << endl;   // 1 (true)
    return 0;
}`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "주의: union 은 C++ 예약어 비슷한 느낌이라 unite 로 써요. Python 은 union 그대로 OK.",
                "Note: C++ uses 'unite' (union is set-related keyword vibe). Python 'union' is fine.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "최악의 경우: 노드 1000 개가 1→2→3→...→1000 일자 체인이에요. parent[i] = i+1, parent[1000] = 1000. find(1) 호출 비용은?",
              "Worst case: 1000 nodes in a chain 1→2→3→...→1000. parent[i] = i+1, parent[1000] = 1000. Cost of find(1)?",
            )}
            options={[
              "O(1)",
              "O(log N)",
              "O(N)",
              "O(N²)",
            ]}
            answerIdx={2}
            hint={t(
              "while 루프가 1 → 2 → 3 → ... → 1000 까지 1000 번 돌아요. 트리가 *체인* 모양이면 find 가 O(N)! 그래서 다음 챕터에서 path compression 으로 평탄화해요.",
              "The while loop walks 1 → 2 → 3 → ... → 1000, that's 1000 hops. A *chain*-shaped tree means find is O(N)! Next chapter: path compression flattens it.",
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

// ── Chapter 3: Path Compression ──────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 1→2→3→4 체인. find(1) 호출 → 모두 parent=4 로 평탄화
  // phase: 0 = 초기, 1 = find(1) 시작, 2 = 1 → 2 따라감, 3 = 2 → 3 따라감, 4 = 3 → 4 (루트!), 5 = 평탄화 완료
  const [pcPhase, setPcPhase] = useState(0)
  const pcParent = (() => {
    if (pcPhase < 5) return [0, 2, 3, 4, 4]  // 초기 체인
    return [0, 4, 4, 4, 4]                    // 평탄화 후
  })()
  const pcMsg = (() => {
    const phases = [
      { ko: "초기: 1 → 2 → 3 → 4 체인. find(1) 호출하면 4 번 점프 (O(N))", en: "Init: 1 → 2 → 3 → 4 chain. find(1) takes 4 hops (O(N))" },
      { ko: "find(1): parent[1]=2 → 1 에서 2 로 점프", en: "find(1): parent[1]=2 → hop from 1 to 2" },
      { ko: "find(1): parent[2]=3 → 2 에서 3 으로 점프", en: "find(1): parent[2]=3 → hop from 2 to 3" },
      { ko: "find(1): parent[3]=4 → 3 에서 4 로 점프", en: "find(1): parent[3]=4 → hop from 3 to 4" },
      { ko: "find(1): parent[4]=4 → 루트 발견! 4 가 답", en: "find(1): parent[4]=4 → root found! Answer = 4" },
      { ko: "✨ 평탄화: 거쳐 온 모든 노드의 parent 를 4 로 직접 설정. 다음 find(1) 은 1 번 점프!", en: "✨ Flatten: set every visited node's parent to 4 directly. Next find(1) = 1 hop!" },
    ]
    return phases[Math.min(pcPhase, 5)]
  })()
  const pcStep = () => { if (pcPhase < 5) setPcPhase(pcPhase + 1) }
  const pcReset = () => setPcPhase(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🗜️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("아이디어: find 할 때 *모두 루트에 직접* 매달기", "Idea: on find, attach *everyone directly to the root*")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "find 하면서 루트까지 어차피 다 거쳐가요. 그 김에 *거쳐온 모든 노드의 parent 를 루트로* 바꿔요. 다음번 find 는 한 방.",
                "While finding the root, we pass every node on the way. *Reset their parent to root in passing*. Next find = one hop.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-orange-200 mb-3">
              <p className="text-xs font-bold text-orange-800 mb-2">📌 {t("전후 비교", "Before / after")}</p>
              <pre className="text-xs text-gray-800 font-mono leading-relaxed">
{`전:   1 → 2 → 3 → 4         find(1) = 4 점프
                              ↑
                              (체인)

후:   1 → 4                  find(1) = 1 점프 ✨
      2 → 4                  find(2) = 1 점프
      3 → 4                  find(3) = 1 점프`}
              </pre>
              <p className="text-[11px] text-gray-700 mt-2 leading-relaxed">
                {t(
                  "모두가 루트에 *직접* 매달려요. 트리가 깊이 1 로 평탄해짐.",
                  "Everyone hangs *directly* off the root. Tree flattens to depth 1.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-orange-700 text-center">
              {t("재귀로 한 줄에 표현 가능. 다음 슬라이드 시뮬!", "Expressible in one recursive line. Simulate next!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("1→2→3→4 체인 평탄화", "Flatten the 1→2→3→4 chain")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("find(1) 한 번이면 — 트리가 완전히 평탄해져요.", "One find(1) — and the tree flattens completely.")}
            </p>

            {/* 트리 그림 — 노드들 + 화살표 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              {pcPhase < 5 ? (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {[1, 2, 3, 4].map((n, i) => (
                    <div key={n} className="flex items-center">
                      <div className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all",
                        pcPhase >= 1 && pcPhase <= 4 && n === pcPhase && "bg-amber-200 border-amber-500 text-amber-900 scale-110",
                        n === 4 && "bg-emerald-100 border-emerald-400 text-emerald-800",
                        n !== 4 && !(pcPhase >= 1 && pcPhase <= 4 && n === pcPhase) && "bg-blue-100 border-blue-300 text-blue-700",
                      )}>
                        {n}
                      </div>
                      {i < 3 && <span className="mx-1 text-gray-500 font-bold">→</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 bg-emerald-100 border-emerald-400 text-emerald-800 font-mono text-base font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">↑</span>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-sm font-bold">
                          {n}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-orange-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-orange-800 leading-relaxed">{t(pcMsg.ko, pcMsg.en)}</p>
            </div>

            {/* parent 배열 */}
            <div className="bg-gray-50 rounded-lg p-2 mb-3">
              <p className="text-[10px] font-bold text-gray-600 mb-1">parent[]</p>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-[10px] text-gray-500 font-mono">{i}</div>
                    <div className={cn(
                      "w-9 h-9 flex items-center justify-center rounded-md border-2 font-mono text-xs font-bold transition-all",
                      pcParent[i] === i ? "bg-emerald-100 border-emerald-400 text-emerald-800" : "bg-blue-100 border-blue-300 text-blue-700",
                    )}>
                      {pcParent[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={pcStep} disabled={pcPhase >= 5}
                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("스텝", "Step")}
              </button>
              <button onClick={pcReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Path Compression (한 줄!)", "Code — Path Compression (one line!)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("재귀로 쓰면 깔끔. 부모를 *재귀로 찾은 루트* 로 덮어쓰기.", "Cleaner recursively. Overwrite parent with the *recursively-found root*.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   # ✨ 핵심! 루트로 직접 매달기
    return parent[x]

# 사용:
parent = [i for i in range(N + 1)]
union(1, 2); union(2, 3); union(3, 4)
find(1)          # 1, 2, 3 모두 parent 가 4 로 바뀜
print(parent)    # [_, 4, 4, 4, 4]`}
              cpp={`int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);   // ✨ 핵심!
    }
    return parent[x];
}

// 사용:
// vector<int> parent(N + 1);
// iota(parent.begin(), parent.end(), 0);
// unite(1,2); unite(2,3); unite(3,4);
// find(1);          // parent[1..3] 모두 4 로 평탄화`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "비교: while 버전 (Ch 2) 은 그냥 루트 *찾기만* 함. 이 재귀 버전은 *경로의 모든 노드* 를 루트에 직접 매달아요.",
                "Compare: the while version (Ch 2) only *finds* the root. This recursive version *re-points every node on the path* to the root.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Path compression *만* 적용 (union by rank 없이) 시, find 의 amortized (분할 상환) 시간복잡도는?",
              "With path compression *only* (no union by rank), what's the amortized time of find?",
            )}
            options={[
              "O(1)",
              "O(log N)",
              "O(N)",
              "O(α(N))",
            ]}
            answerIdx={1}
            hint={t(
              "Path compression 만으로는 amortized O(log N). α(N) ≈ O(1) 같은 거의 상수 시간은 path compression + union by rank *둘 다* 적용해야 나와요. 이게 다음 챕터!",
              "Path compression alone gives amortized O(log N). The near-constant α(N) needs *both* path compression AND union by rank. That's next chapter!",
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

// ── Chapter 4: Union by Rank / Size ──────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 4
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)
  const [quizPassed, setQuizPassed] = useState(false)

  // 시뮬레이션: 트리 A (루트 1, 크기 5) + 트리 B (루트 2, 크기 2) → 작은 쪽을 큰 쪽 밑에
  // phase 0 = 두 그룹 따로, 1 = 비교 (rank), 2 = 작은쪽이 큰쪽으로 합쳐짐
  const [ubrPhase, setUbrPhase] = useState(0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">⚖️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("문제: 그냥 union 하면 트리가 한쪽으로 기울어요", "Problem: naive union skews the tree")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "Ch 2 의 union 은 *항상 b 의 루트를 a 의 루트 밑에* 매달았어요. 매번 같은 방향으로 합치다 보면 — *체인* 트리가 생겨요. find 가 다시 O(N)!",
                "Ch 2's union *always parented b's root under a's root*. Always one direction → *chain* tree. find back to O(N)!",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-violet-200 mb-3">
              <p className="text-xs font-bold text-violet-800 mb-2">💡 {t("해결: 작은 트리를 큰 트리 밑에", "Fix: small tree under big tree")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "두 그룹 합칠 때 — *깊이가 더 깊은* 쪽을 부모로 (union by rank). 또는 *크기가 더 큰* 쪽을 부모로 (union by size). 어느 쪽이든 트리 깊이가 천천히 증가.",
                  "When merging — *deeper* tree becomes parent (union by rank). Or *bigger* tree becomes parent (union by size). Either way, tree depth grows slowly.",
                )}
              </p>
              <pre className="text-[11px] text-gray-800 font-mono leading-relaxed">
{`rank[i] = i 가 루트일 때 트리의 대략적 깊이
size[i] = i 가 루트일 때 트리의 노드 개수
(둘 중 하나만 골라서 쓰면 됨)`}
              </pre>
            </div>
            <p className="text-sm font-bold text-violet-700 text-center">
              {t("path compression + union by rank = α(N) ≈ O(1) 거의 상수!", "path compression + union by rank = α(N) ≈ O(1) near-constant!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("rank 비교 — 작은 쪽이 큰 쪽 밑으로", "Compare rank — small under big")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("트리 A (rank 2) + 트리 B (rank 1) 합치기. 누가 부모?", "Merge tree A (rank 2) + tree B (rank 1). Who becomes parent?")}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-3 min-h-[180px]">
              {ubrPhase === 0 && (
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 mb-1">{t("트리 A", "Tree A")}</p>
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 bg-violet-100 border-violet-400 text-violet-800 font-mono text-sm font-bold">1</div>
                    <div className="flex gap-1 justify-center mt-1">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold">a</div>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold">b</div>
                    </div>
                    <p className="text-[10px] text-violet-700 mt-1 font-bold">rank = 2</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 mb-1">{t("트리 B", "Tree B")}</p>
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 bg-violet-100 border-violet-400 text-violet-800 font-mono text-sm font-bold">2</div>
                    <div className="flex gap-1 justify-center mt-1">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold">c</div>
                    </div>
                    <p className="text-[10px] text-violet-700 mt-1 font-bold">rank = 1</p>
                  </div>
                </div>
              )}
              {ubrPhase === 1 && (
                <div className="text-center">
                  <p className="text-sm text-amber-800 font-bold mb-3">{t("비교: rank[1]=2 vs rank[2]=1", "Compare: rank[1]=2 vs rank[2]=1")}</p>
                  <p className="text-3xl mb-2">⚖️</p>
                  <p className="text-sm text-gray-800">
                    {t("1 의 트리가 더 *깊어요* (rank 2 > 1). → 2 를 1 밑에!", "1's tree is *deeper* (rank 2 > 1). → 2 goes under 1!")}
                  </p>
                </div>
              )}
              {ubrPhase === 2 && (
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 mb-1">{t("합친 후", "After merge")}</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 bg-emerald-100 border-emerald-400 text-emerald-800 font-mono text-sm font-bold">1</div>
                  <div className="flex gap-2 justify-center mt-1">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold">a</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold">b</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-violet-100 border-violet-300 text-violet-700 font-mono text-xs font-bold">2</div>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 bg-blue-100 border-blue-300 text-blue-700 font-mono text-xs font-bold mt-1">c</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-2 font-bold">
                    {t("rank 그대로 2 (트리 깊이 안 늘어남!)", "rank stays 2 (depth didn't grow!)")}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => { if (ubrPhase < 2) setUbrPhase(ubrPhase + 1) }} disabled={ubrPhase >= 2}
                className="flex-1 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음", "Next")}
              </button>
              <button onClick={() => setUbrPhase(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <p className="text-[11px] text-gray-600 mt-3 leading-relaxed text-center">
              {t(
                "rank 가 같은 경우에만 합친 뒤 rank 가 +1 증가. 다른 경우엔 그대로!",
                "Only when ranks are equal does the new rank go +1. Otherwise it stays!",
              )}
            </p>
            <div className="mt-2 bg-violet-50 rounded-lg p-2 border border-violet-200">
              <p className="text-[11px] text-violet-800 leading-relaxed">
                💭 <b>{t("왜 깊이가 log N?", "Why depth is log N?")}</b>{" "}
                {t(
                  "rank 를 1 늘리려면 *같은 rank 두 트리* 가 만나야 해요 → 노드 수가 매번 2 배 필요. 그러니 rank r 트리엔 노드가 최소 2ʳ 개. 거꾸로, 노드 N 개로 만들 수 있는 깊이는 최대 log₂N.",
                  "To raise rank by 1, *two trees of equal rank* must meet → node count must double each time. So a rank-r tree has at least 2ʳ nodes. Conversely, N nodes give depth at most log₂N.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — Union by Rank + Path Compression", "Code — Union by Rank + Path Compression")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("완전체 DSU. 이 두 기법 다 적용하면 α(N) — 거의 상수 시간.", "Full DSU. With both, ops run in α(N) — practically constant.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={`parent = [i for i in range(N + 1)]
rank_ = [0] * (N + 1)

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   # path compression
    return parent[x]

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb: return                # 이미 같은 그룹
    # rank 큰 쪽을 부모로 (작은쪽 swap)
    if rank_[ra] < rank_[rb]:
        ra, rb = rb, ra
    parent[rb] = ra                    # 작은 ← 큰 밑에
    if rank_[ra] == rank_[rb]:         # rank 같으면 +1
        rank_[ra] += 1`}
              cpp={`vector<int> parent, rnk;

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);    // path compression
    }
    return parent[x];
}

void unite(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return;                // 이미 같은 그룹
    if (rnk[ra] < rnk[rb]) swap(ra, rb);
    parent[rb] = ra;                     // 작은 ← 큰 밑에
    if (rnk[ra] == rnk[rb]) rnk[ra]++;   // 같으면 +1
}

// 초기화:
// int N = ...;
// parent.resize(N+1); rnk.assign(N+1, 0);
// for (int i = 0; i <= N; i++) parent[i] = i;`}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "변형: rank 대신 size 써도 OK. size 큰 쪽이 부모. size[ra] += size[rb]. 둘 다 효과 거의 같음.",
                "Variant: use size instead. Bigger size = parent. size[ra] += size[rb]. Effectively the same.",
              )}
            </p>
          </div>
        )}

        {step === 3 && (
          <MiniQuiz
            question={t(
              "Path compression + union by rank 둘 다 적용했을 때, find / union 한 번의 amortized 시간복잡도는?",
              "With BOTH path compression and union by rank, amortized time per find / union?",
            )}
            options={[
              "O(N)",
              "O(log N)",
              "O(α(N)) ≈ O(1)",
              "O(N log N)",
            ]}
            answerIdx={2}
            hint={t(
              "두 기법 같이 쓰면 amortized α(N) — 역 애커만 함수. 현실의 모든 N 에서 ≤ 4 → 사실상 상수.",
              "Combined gives amortized α(N) — the inverse Ackermann. ≤ 4 for any realistic N → effectively constant.",
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
              {t("유니온 파인드 마스터!", "Union Find Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "단순한 parent 배열 하나로 — 동적 연결성을 거의 상수 시간에 처리할 수 있게 됐어요. 🎉",
                "With just a parent array — dynamic connectivity in near-constant time. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "크루스칼 MST, 사이클 검출, 컴포넌트 카운트 — 이제 모두 손에 잡혀요.",
                  "Kruskal MST, cycle detection, component counting — all in your toolkit now.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("DSU = ", "DSU = ")}<b>parent[]</b> {t("배열 하나로 그룹 표현 (각자 부모만 기억)", "represents groups (each node knows only parent)")}</li>
              <li><b>2.</b> <b>find(x)</b> = {t("루트까지 부모 따라 올라가기", "climb parent links to root")}. {t("같은 그룹? → 루트 같음?", "Same group? → same root?")}</li>
              <li><b>3.</b> <b>{t("Path compression", "Path compression")}</b> = {t("find 하면서 *경로의 모든 노드* 를 루트에 직접 매달기 (재귀 한 줄)", "while finding, *re-point every visited node* to root (one recursive line)")}</li>
              <li><b>4.</b> <b>{t("Union by rank/size", "Union by rank/size")}</b> = {t("작은 트리를 큰 트리 밑에. 깊이가 천천히 늘어남", "small tree under big tree. Depth grows slowly")}</li>
              <li><b>5.</b> {t("둘 다 적용 → ", "Both together → ")}<b>O(α(N)) ≈ O(1)</b> {t("amortized — 사실상 상수", "amortized — effectively constant")}</li>
              <li><b>6.</b> {t("그룹 개수 = ", "Group count = ")}<code className="bg-white px-1 rounded text-xs">{t("자기 자신이 부모인 노드 수", "nodes where parent[i] == i")}</code></li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("DSU 가 손에 잡히면 — MST, 오프라인 쿼리, 컴포넌트 추적이 다 열려요!", "Once DSU clicks — MST, offline queries, component tracking all open up!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🌲 {t("다음 토픽: 그래프 알고리즘 — MST (크루스칼), 그래프 BFS/DFS. ", "Next: graph algorithms — MST (Kruskal), graph BFS/DFS. ")}
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
              ? <>🎉 {t("DSU 마스터!", "DSU Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function UnionFindPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)

  // Suppress unused-var warning — keeping router available for future nav
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
          user_id: user.id, lesson_id: "algo-unionfind", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-unionfind")) {
          arr.push("algo-unionfind")
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
              { label: "유니온 파인드", labelEn: "Union Find", emoji: "🔵" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🔵</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("유니온 파인드", "Union Find")}</h1>
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
            <Link href="/algo/unionfind"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("DSU 문제 — MST, 사이클, 그룹 카운트!", "DSU problems — MST, cycles, group count!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("DSU 마스터!", "DSU Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (그래프 / MST)", "Next topic (graph / MST)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
