"use client"

/**
 * 백트래킹 (Backtracking) — 챕터식 학습 페이지 v1.
 *
 * Wave 3 — 재귀 위에서 굴러가는 *결정 트리 탐색*. 핵심 패턴: choose → explore → un-choose.
 * 가지치기 (pruning) 가 진짜 무기 — brute force 보다 훨씬 빠른 이유.
 *
 * 5 챕터: 왜 백트래킹? → N-Queens → 순열 → 부분집합 합 → 정리.
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
  { id: 1, emoji: "🔙", title: "왜 백트래킹?",              titleEn: "Why Backtracking?",          mins: 3 },
  { id: 2, emoji: "👑", title: "N-Queens",                  titleEn: "N-Queens",                   mins: 8 },
  { id: 3, emoji: "🔀", title: "순열 생성",                 titleEn: "Permutations",               mins: 6 },
  { id: 4, emoji: "🎯", title: "부분집합 합",               titleEn: "Subset Sum",                 mins: 7 },
  { id: 5, emoji: "🏆", title: "정리",                       titleEn: "Recap",                      mins: 5 },
]

const STORAGE_KEY = "algo-backtracking-chapter"

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

// ── Chapter 1: 왜 백트래킹? — choose / explore / un-choose + 가지치기 ────
function Chapter1({ onComplete, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔙</p>
            <h3 className="text-xl font-black text-gray-900 mb-3 text-center">
              {t("백트래킹 = 시도하고 되돌리기", "Backtracking = try & undo")}
            </h3>
            <div className="bg-white/80 rounded-lg p-3 border border-rose-200 mb-3">
              <p className="text-xs text-rose-700 font-bold mb-1">📌 {t("재귀 위에서 굴러가요", "Built on recursion")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "재귀를 먼저 봤죠? 백트래킹은 재귀의 *응용*. 결정 트리를 따라 내려갔다가, 아니면 되돌아 와요.",
                  "We saw recursion. Backtracking is recursion *applied* — walk a decision tree, undo when it doesn't work.",
                )}
              </p>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-rose-700">{t("비유", "Analogy")}:</b>{" "}
              {t(
                "미로를 손전등 들고 탐험. 갈림길에서 한쪽 가보고 — 막다른 길? 돌아와서 다른 쪽 시도. 못 가본 길이 있으면 계속.",
                "Exploring a maze with a flashlight. At a fork, try one way — dead end? Come back, try the other. Keep going until done.",
              )}
            </p>
            <div className="bg-rose-100 rounded-lg p-3 border border-rose-300">
              <p className="text-sm font-bold text-rose-800 text-center">
                💡 {t("3 단계 패턴: ", "3-step pattern: ")}<b>{t("선택 → 탐험 → 되돌리기", "choose → explore → un-choose")}</b>
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">📐</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("3 단계 패턴 — choose / explore / un-choose", "The 3-step pattern")}
            </h3>
            <div className="space-y-3 mb-3">
              <div className="bg-white rounded-lg p-3 border-2 border-blue-200">
                <p className="text-sm font-black text-blue-800 mb-1">
                  1️⃣ {t("Choose (선택)", "Choose")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "현재 자리에 *시도* 할 값을 하나 놓는다. 예: '이 칸에 퀸 놓음', '이 자리에 숫자 3'.",
                    "Place a candidate at the current spot. e.g. 'queen here', 'put 3 in this slot'.",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-indigo-200">
                <p className="text-sm font-black text-indigo-800 mb-1">
                  2️⃣ {t("Explore (탐험) — 재귀!", "Explore — recurse!")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "그 선택이 잘 됐다고 *가정* 하고 다음 자리로 재귀. 끝까지 갈 수 있으면 성공!",
                    "Assume the choice is good and recurse to the next slot. Reach the end → success!",
                  )}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <p className="text-sm font-black text-purple-800 mb-1">
                  3️⃣ {t("Un-choose (되돌리기)", "Un-choose")}
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {t(
                    "안 됐으면 *지금 놓은 것* 을 다시 빼고, 다른 값 시도. 이게 '백트래킹' 이름의 유래.",
                    "If it failed, *remove* what we placed and try another value. This is what 'backtrack' means.",
                  )}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 my-2">
              <pre className="text-xs text-emerald-200 font-mono leading-relaxed overflow-x-auto">
{t(`def backtrack(state):
    if 끝 도달: return 성공
    for 후보 in 가능한 값들:
        choose(후보)       # ①
        if backtrack(...): return True   # ② 탐험
        un-choose(후보)    # ③ 되돌림!`, `def backtrack(state):
    if reached_end: return success
    for candidate in possible_values:
        choose(candidate)       # 1
        if backtrack(...): return True   # 2 explore
        un-choose(candidate)    # 3 undo!`)}
              </pre>
            </div>
            <p className="text-xs text-blue-700 text-center leading-relaxed">
              {t(
                "골격은 항상 이 모양. 문제마다 'choose' 와 '가능한 값' 만 바뀐다.",
                "Same skeleton every time. Only 'choose' and 'candidates' change per problem.",
              )}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300 min-h-[280px]">
            <p className="text-5xl text-center mb-3">✂️</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("가지치기 = 진짜 무기", "Pruning = the real weapon")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {t(
                "Brute force: 모든 2^N 경우 다 봄. 백트래킹: 가다가 *불가능* 한 게 보이면 그 가지 통째로 컷.",
                "Brute force: try every 2^N case. Backtracking: spot impossibility early → kill that whole branch.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-200 mb-3">
              <p className="text-xs font-bold text-amber-800 mb-2">💡 {t("예시 — 8-Queens", "Example — 8-Queens")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "8 × 8 보드에 8 퀸 배치 (서로 못 공격). brute force = 64C8 ≈ 44 억 경우.",
                  "Place 8 queens on 8×8 board (none attacking). Brute force = 64C8 ≈ 4.4 billion cases.",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "백트래킹 + 가지치기: 1 행에 퀸 놓고 2 행 시도. *같은 열* 인 후보는 곧장 컷. *대각선* 위반도 컷. 실제 호출 ~2000 번.",
                  "Backtracking + pruning: place queen row 1, try row 2. Skip *same column*. Skip *diagonal* conflicts. Actual calls ~2000.",
                )}
              </p>
            </div>
            <div className="bg-amber-100 rounded-lg p-3 border border-amber-300">
              <p className="text-sm font-bold text-amber-900 text-center">
                {t("44 억 → 2000. 백트래킹 = ", "4.4B → 2000. Backtracking = ")}<b>{t("재귀 + 가지치기", "recursion + pruning")}</b>
              </p>
            </div>
            <p className="text-xs text-amber-700 text-center mt-3 italic">
              {t("다음 챕터: N-Queens 직접 봐요!", "Next: N-Queens hands-on!")}
            </p>
          </div>
        )}
      </div>

      <SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />
    </div>
  )
}

// ── Chapter 2: N-Queens ──────────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 인터랙티브 4-Queens — 한 행씩 퀸 배치 단계 (사전 계산된 해)
  // 정답 중 하나: (0,1), (1,3), (2,0), (3,2)
  // 단계: 0 = 빈 보드, 1 = 1행 col 1, 2 = 2행 col 3 시도 / 3 = col 0 충돌 표시 / 4 = 정답
  // 단순화: 한 행씩 정답 놓는 진행
  const queensSol = [1, 3, 0, 2] // row i 의 col
  const [qStep, setQStep] = useState(0) // 0..4
  const queensPlaced = qStep // 첫 qStep 행만 놓임

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">👑</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("N-Queens — 백트래킹의 대표 문제", "N-Queens — the classic")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-purple-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "N × N 체스판에 N 개의 퀸을 놓아 서로 공격 못 하게. 퀸은 가로/세로/대각선으로 공격해요.",
                "Place N queens on N × N board so none attack each other. Queens attack along rows/cols/diagonals.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-purple-200 mb-3">
              <p className="text-xs font-bold text-purple-800 mb-2">💡 {t("핵심 관찰", "Key observation")}</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "각 행에 *정확히 하나씩* 퀸. 그러니 'i 번째 행에 어느 열?' 만 결정하면 됨. 결정 트리 깊이 = N.",
                  "Each row gets exactly one queen. So 'which column in row i?' is the only decision. Tree depth = N.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-purple-700 text-center">
              {t("체크: 같은 열 X. 같은 대각선 X. 그게 다예요.", "Check: no same column. No same diagonal. That's it.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("4-Queens 한 행씩 놓아보기", "4-Queens row by row")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("(해 하나만 — 0행→3행 순서. 실제 백트래킹은 시도하다 되돌리지만 여긴 성공 경로만!)", "(one solution — row 0→3. Real backtracking tries & undoes, here we show success path.)")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 flex justify-center">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 4 }).map((_, r) => (
                  Array.from({ length: 4 }).map((_, c) => {
                    const hasQueen = r < queensPlaced && queensSol[r] === c
                    const isLight = (r + c) % 2 === 0
                    return (
                      <div key={`${r}-${c}`}
                        className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-2xl sm:text-3xl font-black transition-all",
                          isLight ? "bg-amber-50" : "bg-amber-700",
                          hasQueen && "ring-4 ring-emerald-400",
                        )}>
                        {hasQueen && <span>👑</span>}
                      </div>
                    )
                  })
                ))}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-purple-800">
                {qStep === 0 && t("▶ 빈 보드. '한 행' 눌러 시작!", "▶ Empty board. Press 'Next row'!")}
                {qStep === 1 && t("0 행 → 1 열에 퀸. (다른 열도 가능 — 한 경로만 봄)", "Row 0 → col 1. (other cols possible — showing one path)")}
                {qStep === 2 && t("1 행 → 3 열. 0,1 충돌? 열 다름, 대각선 다름. OK!", "Row 1 → col 3. Conflict with (0,1)? Different col, different diag. OK!")}
                {qStep === 3 && t("2 행 → 0 열. 위 두 퀸과 충돌 없음. 진행!", "Row 2 → col 0. No conflict with rows above. Onward!")}
                {qStep === 4 && <b className="text-emerald-700">{t("✅ 3 행 → 2 열. 모든 퀸 배치 완료!", "✅ Row 3 → col 2. All queens placed!")}</b>}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => qStep < 4 && setQStep(qStep + 1)} disabled={qStep >= 4}
                className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("한 행", "Next row")}
              </button>
              <button onClick={() => setQStep(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
            <div className="mt-3 bg-rose-50 rounded-lg p-2 border border-rose-200">
              <p className="text-[11px] text-rose-800 leading-relaxed">
                ⚠️ <b>{t("가지치기 없으면?", "Without pruning?")}</b>{" "}
                {t(
                  "각 행마다 4 열 다 시도 → 4^4 = 256 경우. 가지치기로 ~17 회 호출이면 끝.",
                  "Try all 4 cols per row → 4^4 = 256. With pruning: ~17 calls.",
                )}
              </p>
            </div>
            <div className="mt-3 bg-purple-50 rounded-xl p-3 border-2 border-purple-200">
              <p className="text-xs font-black text-purple-900 mb-2">🔙 {t("진짜 핵심: 막히면 *되돌리기 (undo)*", "The real heart: *undo* when stuck")}</p>
              <p className="text-[11px] text-gray-700 leading-relaxed mb-2">
                {t(
                  "위 보드는 *성공 경로* 만 보여줘서 쉬워 보여요. 하지만 진짜 백트래킹은 — 퀸을 놓다 충돌하면 *방금 놓은 걸 치우고(undo)* 같은 행의 다음 칸을 시도해요. 그 칸도 막히면 또 치우고... 다 막히면 *이전 행* 으로 돌아가 거기 퀸도 치워요.",
                  "The board above shows only the *success path*, so it looks easy. But real backtracking — when a queen conflicts, you *remove the one just placed (undo)* and try the next column in the same row. Blocked again? Remove and retry... All blocked? Go *back a row* and remove that queen too.",
                )}
              </p>
              <div className="bg-white/70 rounded-lg p-2 border border-purple-200">
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  <b className="text-purple-800">{t("미니 장면 — 1 행에 둘 곳 찾기:", "Mini scene — placing in row 1:")}</b><br />
                  {t(
                    "0 행은 1 열에 퀸. 1 행 0 열 시도 → 대각선 충돌! ✗ 아예 안 놓음. 1 열 → 같은 열! ✗ 안 놓음. 2 열 → 또 대각선! ✗ 안 놓음. 3 열 → OK! ✓ 놓고 다음 행으로. (놓은 걸 치우는 건 다음 행이 전부 막혔을 때예요.)",
                    "Row 0 has its queen at col 1. Row 1 try col 0 → diagonal conflict! ✗ undo. Col 1 → same column! ✗ undo. Col 2 → diagonal again! ✗ undo. Col 3 → OK! ✓ place & go to next row.",
                  )}
                </p>
              </div>
              <p className="text-[11px] text-purple-700 leading-relaxed mt-2 font-bold">
                {t(
                  "'놓기 → 막히면 치우기' 의 끝없는 반복 — 이게 백트래킹이에요. 깔끔한 성공 경로 하나 뒤엔 수없이 놓았다 치운 시도가 숨어 있어요.",
                  "'place → if stuck, remove' over and over — that's backtracking. Behind one clean success path hide countless place-and-remove attempts.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — N-Queens 해 개수", "Code — N-Queens count")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("3 개 배열로 충돌 빠르게 체크: cols, diag1 (r+c), diag2 (r-c+N).", "3 arrays for O(1) conflict check: cols, diag1 (r+c), diag2 (r-c+N).")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def solve_nqueens(n):
    cols = [False] * n
    d1 = [False] * (2 * n)   # r + c
    d2 = [False] * (2 * n)   # r - c + n
    count = 0

    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for c in range(n):
            if cols[c] or d1[row + c] or d2[row - c + n]:
                continue                  # 가지치기!
            cols[c] = d1[row + c] = d2[row - c + n] = True   # choose
            backtrack(row + 1)                                # explore
            cols[c] = d1[row + c] = d2[row - c + n] = False   # un-choose

    backtrack(0)
    return count

print(solve_nqueens(4))   # 2
print(solve_nqueens(8))   # 92`, `def solve_nqueens(n):
    cols = [False] * n
    d1 = [False] * (2 * n)   # r + c
    d2 = [False] * (2 * n)   # r - c + n
    count = 0

    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for c in range(n):
            if cols[c] or d1[row + c] or d2[row - c + n]:
                continue                  # prune!
            cols[c] = d1[row + c] = d2[row - c + n] = True   # choose
            backtrack(row + 1)                                # explore
            cols[c] = d1[row + c] = d2[row - c + n] = False   # un-choose

    backtrack(0)
    return count

print(solve_nqueens(4))   # 2
print(solve_nqueens(8))   # 92`)}
              cpp={t(`#include <bits/stdc++.h>
using namespace std;

int N, count_;
vector<bool> cols, d1, d2;

void backtrack(int row) {
    if (row == N) { count_++; return; }
    for (int c = 0; c < N; c++) {
        if (cols[c] || d1[row + c] || d2[row - c + N]) continue;  // 가지치기!
        cols[c] = d1[row + c] = d2[row - c + N] = true;   // choose
        backtrack(row + 1);                                // explore
        cols[c] = d1[row + c] = d2[row - c + N] = false;  // un-choose
    }
}

int main() {
    N = 8; count_ = 0;
    cols.assign(N, false);
    d1.assign(2 * N, false);
    d2.assign(2 * N, false);
    backtrack(0);
    cout << count_ << endl;   // 92
    return 0;
}`, `#include <bits/stdc++.h>
using namespace std;

int N, count_;
vector<bool> cols, d1, d2;

void backtrack(int row) {
    if (row == N) { count_++; return; }
    for (int c = 0; c < N; c++) {
        if (cols[c] || d1[row + c] || d2[row - c + N]) continue;  // prune!
        cols[c] = d1[row + c] = d2[row - c + N] = true;   // choose
        backtrack(row + 1);                                // explore
        cols[c] = d1[row + c] = d2[row - c + N] = false;  // un-choose
    }
}

int main() {
    N = 8; count_ = 0;
    cols.assign(N, false);
    d1.assign(2 * N, false);
    d2.assign(2 * N, false);
    backtrack(0);
    cout << count_ << endl;   // 92
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "보드 자체를 따로 안 들고 다녀요 — 3 개의 boolean 배열이면 충돌 체크 O(1). 핵심: choose / un-choose 짝.",
                "No 2D board needed — 3 boolean arrays give O(1) conflict checks. Key: choose / un-choose pair.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 3: 순열 생성 ─────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록

  // 시뮬레이션: 1..3 순열 생성 — 단계별 'cur' 상태
  // 순서: [], [1], [1,2], [1,2,3]✓, [1,3], [1,3,2]✓, [2], [2,1], [2,1,3]✓, [2,3], [2,3,1]✓, [3], [3,1], [3,1,2]✓, [3,2], [3,2,1]✓
  // ⚠️ 예전엔 9 단계뿐이라 6 개 순열 중 4 개만 보여주고([2,3,1], [3,1,2] 없음),
  //    [2] → [2,1,3] 처럼 한 프레임에서 두 수를 건너뛰었다. 위 주석의 16 단계를
  //    그대로 채웠다. 이 챕터의 핵심이 'un-choose(되돌리기)' 라서 되돌리는 순간이
  //    빠지면 배울 게 사라진다. (2026-07-29 수정)
  const permSteps: { cur: number[]; used: boolean[]; note: string; noteEn: string }[] = [
    { cur: [],        used: [false, false, false], note: "시작 — 아무것도 안 고름", noteEn: "start — nothing chosen" },
    { cur: [1],       used: [true, false, false],  note: "1 고르기", noteEn: "choose 1" },
    { cur: [1, 2],    used: [true, true, false],   note: "2 고르기", noteEn: "choose 2" },
    { cur: [1, 2, 3], used: [true, true, true],    note: "✅ [1,2,3] 완성", noteEn: "✅ [1,2,3] done" },
    { cur: [1],       used: [true, false, false],  note: "↩ 3, 2 를 되돌리기 (un-choose)", noteEn: "↩ un-choose 3 and 2" },
    { cur: [1, 3],    used: [true, false, true],   note: "이번엔 3 고르기", noteEn: "choose 3 this time" },
    { cur: [1, 3, 2], used: [true, true, true],    note: "✅ [1,3,2] 완성", noteEn: "✅ [1,3,2] done" },
    { cur: [2],       used: [false, true, false],  note: "↩ 처음으로 되돌리고 2 고르기", noteEn: "↩ back to the start, choose 2" },
    { cur: [2, 1],    used: [true, true, false],   note: "1 고르기", noteEn: "choose 1" },
    { cur: [2, 1, 3], used: [true, true, true],    note: "✅ [2,1,3] 완성", noteEn: "✅ [2,1,3] done" },
    { cur: [2, 3],    used: [false, true, true],   note: "↩ 되돌리고 3 고르기", noteEn: "↩ un-choose, then choose 3" },
    { cur: [2, 3, 1], used: [true, true, true],    note: "✅ [2,3,1] 완성", noteEn: "✅ [2,3,1] done" },
    { cur: [3],       used: [false, false, true],  note: "↩ 처음으로 되돌리고 3 고르기", noteEn: "↩ back to the start, choose 3" },
    { cur: [3, 1],    used: [true, false, true],   note: "1 고르기", noteEn: "choose 1" },
    { cur: [3, 1, 2], used: [true, true, true],    note: "✅ [3,1,2] 완성", noteEn: "✅ [3,1,2] done" },
    { cur: [3, 2, 1], used: [true, true, true],    note: "↩ 되돌리고 2 → ✅ [3,2,1] — 6 개 전부!", noteEn: "↩ un-choose, then 2 → ✅ [3,2,1] — all 6!" },
  ]
  const [pIdx, setPIdx] = useState(0)
  const pCur = permSteps[pIdx]

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🔀</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("1..N 모든 순열 만들기", "All permutations of 1..N")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-cyan-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "N=3 이면 [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] — 6 개. N! 개.",
                "N=3 gives [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] — 6 of them. N! total.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-cyan-200 mb-3">
              <p className="text-xs font-bold text-cyan-800 mb-2">💡 {t("백트래킹 풀이", "Backtracking approach")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "한 자리씩 채워가요. 각 자리에 1..N 시도하되 *이미 쓴 숫자* 는 건너뜀.",
                  "Fill positions one by one. Try 1..N for each, skipping already-used values.",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                {t(
                  "도구: used[] 배열 (각 숫자 사용 여부) + cur 리스트 (현재 순열). 매번 push/pop.",
                  "Tools: used[] (which numbers are taken) + cur list (current permutation). Push/pop each step.",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-cyan-700 text-center">
              {t("N-Queens 와 골격이 거의 같아요 — choose / explore / un-choose!", "Same skeleton as N-Queens — choose / explore / un-choose!")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("1..3 순열 생성 따라가기", "Walking through 1..3 permutations")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("cur 와 used[] 가 어떻게 변하는지 — 단계별!", "How cur and used[] evolve — step by step!")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 min-h-[140px]">
              <div className="mb-3">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">cur</p>
                <div className="flex gap-1.5">
                  {pCur.cur.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">{t("(빈 리스트)", "(empty)")}</span>
                  ) : (
                    pCur.cur.map((v, i) => (
                      <div key={i} className="w-9 h-9 rounded-md bg-cyan-100 border-2 border-cyan-400 text-cyan-800 font-mono font-bold flex items-center justify-center text-sm">
                        {v}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">used[1..3]</p>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((v, i) => (
                    <div key={v} className={cn(
                      "w-9 h-9 rounded-md border-2 font-mono font-bold flex items-center justify-center text-xs",
                      pCur.used[i] ? "bg-rose-100 border-rose-400 text-rose-700" : "bg-white border-gray-300 text-gray-500",
                    )}>
                      {v}<br /><span className="text-[8px]">{pCur.used[i] ? "T" : "F"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 mb-3 text-center min-h-[3rem]">
              <p className="text-sm font-mono text-cyan-800">{t(pCur.note, pCur.noteEn)}</p>
              <p className="text-[10px] text-cyan-600 mt-1">{t("스텝", "Step")} {pIdx + 1} / {permSteps.length}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => pIdx < permSteps.length - 1 && setPIdx(pIdx + 1)} disabled={pIdx >= permSteps.length - 1}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white rounded-lg font-bold text-sm">
                ▶ {t("다음", "Next")}
              </button>
              <button onClick={() => setPIdx(0)} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
                ↺ {t("리셋", "Reset")}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 순열 생성", "Code — generate permutations")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("used[] 로 중복 방지. cur 에 push 후 재귀, 끝나면 pop — 항상 짝!", "used[] prevents repeats. Push to cur, recurse, pop after — always paired!")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def permutations(n):
    cur = []
    used = [False] * (n + 1)
    result = []

    def backtrack():
        if len(cur) == n:
            result.append(cur[:])     # 복사해서 저장!
            return
        for v in range(1, n + 1):
            if used[v]:
                continue
            used[v] = True            # choose
            cur.append(v)
            backtrack()               # explore
            cur.pop()                 # un-choose
            used[v] = False

    backtrack()
    return result

for p in permutations(3):
    print(p)`, `def permutations(n):
    cur = []
    used = [False] * (n + 1)
    result = []

    def backtrack():
        if len(cur) == n:
            result.append(cur[:])     # copy before saving!
            return
        for v in range(1, n + 1):
            if used[v]:
                continue
            used[v] = True            # choose
            cur.append(v)
            backtrack()               # explore
            cur.pop()                 # un-choose
            used[v] = False

    backtrack()
    return result

for p in permutations(3):
    print(p)`)}
              cpp={t(`#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> cur;
vector<bool> used;

void backtrack() {
    if ((int)cur.size() == N) {
        for (int v : cur) cout << v << ' ';
        cout << '\\n';
        return;
    }
    for (int v = 1; v <= N; v++) {
        if (used[v]) continue;
        used[v] = true;       // choose
        cur.push_back(v);
        backtrack();          // explore
        cur.pop_back();       // un-choose
        used[v] = false;
    }
}

int main() {
    N = 3;
    used.assign(N + 1, false);
    backtrack();
    return 0;
}`, `#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> cur;
vector<bool> used;

void backtrack() {
    if ((int)cur.size() == N) {
        for (int v : cur) cout << v << ' ';
        cout << '\\n';
        return;
    }
    for (int v = 1; v <= N; v++) {
        if (used[v]) continue;
        used[v] = true;       // choose
        cur.push_back(v);
        backtrack();          // explore
        cur.pop_back();       // un-choose
        used[v] = false;
    }
}

int main() {
    N = 3;
    used.assign(N + 1, false);
    backtrack();
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "Python: result.append(cur[:]) — *복사* 안 하면 cur 가 계속 변해서 다 같아짐. 주의!",
                "Python: result.append(cur[:]) — must *copy*, otherwise cur keeps mutating and all entries become identical!",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 4: 부분집합 합 — take / skip + 가지치기 ──────────────
function Chapter4({ onComplete, codeLang, setCodeLang, alreadyDone }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void; alreadyDone?: boolean }) {
  const { t } = useLanguage()
  const totalSteps = 3
  const { step, setStep, rootRef } = useSlideChapter(alreadyDone ? totalSteps - 1 : 0)   // 이미 끝낸 챕터를 다시 열면 잠기지 않도록
  const [pruneOn, setPruneOn] = useState(true)

  // arr = [3, 12, 7], K = 10  (정답 = {3, 7})
  //
  // ⚠️ 예전 예제는 [3,5,7], K=10 이었는데 **가지치기가 아무것도 자르지 않았다**:
  //    prunable 로 표시한 두 노드가 둘 다 *리프*(idx===n)여서, 코드가 어차피
  //    `if idx == n ... return False` 로 끝내는 자리였다. 자를 서브트리가 없었다.
  //    게다가 정답이 그 앞에서 나와 조기 종료되니 절약이 0 이었는데도 화면은
  //    "가지친 2 개" 라고 했다. (2026-07-29 수정)
  //
  //    [3,12,7] 로 바꾸면 (2, 12) 가 **내부 노드**이면서 12 > 10 이라 그 아래
  //    서브트리(2 노드)가 실제로 잘린다.  손 검산: ON 10 노드 / OFF 12 노드.
  //
  // (idx, sum), 탐색 순서: skip 먼저 → take
  type Node = { idx: number; sum: number; prunable?: boolean; isLeaf?: boolean; isAns?: boolean
                cut?: boolean        // 가지치기 켜면 아예 안 들어가는 노드 (prunable 의 자식)
                afterAns?: boolean } // 정답 찾은 뒤라 어느 쪽이든 방문 안 함
  const subsetTree: Node[] = [
    { idx: 0, sum: 0 },                                            // root
    { idx: 1, sum: 0 },                                            // skip 3
    { idx: 2, sum: 0 },                                            // skip 3, skip 12
    { idx: 3, sum: 0, isLeaf: true },                              // skip all
    { idx: 3, sum: 7, isLeaf: true },                              // take 7
    { idx: 2, sum: 12, prunable: true },                           // skip 3, take 12 = 12 > 10 ← 내부!
    { idx: 3, sum: 12, isLeaf: true, cut: true },                  //   └ 가지치기로 안 들어감
    { idx: 3, sum: 19, isLeaf: true, cut: true },                  //   └ 가지치기로 안 들어감
    { idx: 1, sum: 3 },                                            // take 3
    { idx: 2, sum: 3 },                                            // take 3, skip 12
    { idx: 3, sum: 3, isLeaf: true },
    { idx: 3, sum: 10, isLeaf: true, isAns: true },                // 3 + 7 = 10 ✓ 여기서 종료
    { idx: 2, sum: 15, prunable: true, afterAns: true },           // 정답 뒤 — 방문 안 함
    { idx: 3, sum: 15, isLeaf: true, cut: true, afterAns: true },
    { idx: 3, sum: 22, isLeaf: true, cut: true, afterAns: true },
  ]
  // 정답을 찾으면 곧바로 return True → 그 뒤 노드는 가지치기와 무관하게 방문 안 함.
  // 그래서 "절약" 은 *정답 이전* 에 잘린 노드만 세는 게 정직하다.
  const ansIdx = subsetTree.findIndex(n => n.isAns)
  const explored = subsetTree.slice(0, ansIdx + 1)
  const visitedOff = explored.length                              // 12
  const visitedOn = explored.filter(n => !n.cut).length            // 10
  const visited = pruneOn ? visitedOn : visitedOff
  const savedByPrune = visitedOff - visitedOn                      // 2
  const totalNodes = visitedOff

  return (
    <div ref={rootRef} className="space-y-4 min-h-[300px] flex flex-col scroll-mt-4">
      <div className="flex-1">
        {step === 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 min-h-[280px]">
            <p className="text-5xl text-center mb-3">🎯</p>
            <h3 className="text-lg font-black text-gray-900 mb-3 text-center">
              {t("부분집합 합 = K", "Subset Sum = K")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              <b className="text-emerald-700">{t("문제", "Problem")}:</b>{" "}
              {t(
                "N 개 양수 원소 중 *몇 개를 골라* 합이 정확히 K 가 되는 부분집합이 있는지? 예: [3, 12, 7], K=10 → {3, 7} → YES.",
                "Given N positive ints, can we pick *some* with sum exactly K? Example: [3, 12, 7], K=10 → {3, 7} works → YES.",
              )}
            </p>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-200 mb-3">
              <p className="text-xs font-bold text-emerald-800 mb-2">💡 {t("백트래킹: take / skip", "Backtracking: take / skip")}</p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {t(
                  "각 원소마다 *두 갈래* — 쓴다 / 안 쓴다. N 개면 2^N 가지. N=20 이면 ~100 만 — 빡세지만 가능.",
                  "Each element: *two branches* — take / skip. N elements = 2^N. N=20 → ~1M — tight but doable.",
                )}
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <b className="text-emerald-800">{t("가지치기 핵심", "Pruning key")}:</b>{" "}
                {t(
                  "현재 합이 이미 K 초과? → 더 안 봐도 됨 (양수만이라 더해질수록 커짐). 컷!",
                  "Current sum already > K? → no point continuing (positives only). Cut!",
                )}
              </p>
            </div>
            <p className="text-sm font-bold text-emerald-700 text-center">
              {t("이 한 줄이 가능성 없는 가지를 통째로 잘라요. 얼마나 줄어드는지는 숫자에 따라 달라요.", "This one line cuts whole hopeless branches. How much it saves depends on the numbers.")}
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
            <p className="text-base font-black text-amber-900 mb-2 text-center">🎮 {t("[3, 12, 7], K=10 — 결정 트리", "[3, 12, 7], K=10 — decision tree")}</p>
            <p className="text-xs text-gray-600 text-center mb-3">
              {t("가지치기 켜고 끄기 — 노드 수 비교!", "Toggle pruning — see node count change!")}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xs text-gray-600 font-bold">{t("가지치기", "Pruning")}:</span>
              <button onClick={() => setPruneOn(!pruneOn)}
                className={cn("px-3 py-1 rounded-full text-xs font-bold transition-all",
                  pruneOn ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600")}>
                {pruneOn ? t("켬 ON (sum > K 컷)", "ON (cut sum > K)") : t("끔 OFF", "OFF")}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 font-mono text-[11px] leading-relaxed">
              {subsetTree.map((node, i) => {
                // 가지치기 ON 이면 cut 노드는 아예 안 들어감. 정답 뒤 노드는 어느 쪽이든 안 들어감.
                const skipped = node.afterAns || (pruneOn && node.cut)
                return (
                  <div key={i} className={cn(
                    "flex items-center",
                    skipped && "opacity-30 line-through",
                  )} style={{ paddingLeft: `${node.idx * 14}px` }}>
                    <span className="text-gray-400">{"└ "}</span>
                    <span className={cn(
                      "ml-1 px-1.5 rounded",
                      node.isAns && "bg-emerald-100 text-emerald-800 font-bold",
                      node.prunable && !node.afterAns && "bg-rose-100 text-rose-700",
                      !node.isAns && !node.prunable && "text-gray-800",
                    )}>
                      sum={node.sum}{node.isLeaf ? t(" (끝)", " (leaf)") : ""}
                    </span>
                    {node.isAns && <span className="ml-1 text-[10px] text-emerald-600">{t("← 정답! 여기서 멈춰요", "← answer! stop here")}</span>}
                    {node.prunable && !node.afterAns && pruneOn && <span className="ml-1 text-[10px] text-emerald-700 font-bold">{t("← 10 초과 → 아래는 안 봐요 ✂️", "← over 10 → skip everything below ✂️")}</span>}
                    {node.prunable && !node.afterAns && !pruneOn && <span className="ml-1 text-[10px] text-rose-600">{t("← 10 초과인데도 아래를 다 봄 (낭비)", "← over 10 but still explores below (waste)")}</span>}
                    {node.afterAns && <span className="ml-1 text-[10px] text-gray-400">{t("← 정답 찾은 뒤 (안 봄)", "← after the answer (never visited)")}</span>}
                  </div>
                )
              })}
            </div>
            <div className={cn("rounded-lg p-3 text-center",
              pruneOn ? "bg-emerald-50" : "bg-rose-50")}>
              <p className="text-sm font-mono">
                {pruneOn ? (
                  <span className="text-emerald-800">
                    {t("방문 노드", "Visited")}: <b>{visitedOn}</b> ({t("안 본 노드 ", "skipped ")}<b>{savedByPrune}</b>{t(" 개", "")})
                  </span>
                ) : (
                  <span className="text-rose-800">
                    {t("방문 노드", "Visited")}: <b>{visitedOff}</b> ({t("가지치기를 켜면 ", "with pruning: ")}<b>{visitedOn}</b>{t(" 개", "")})
                  </span>
                )}
              </p>
              <p className="text-[11px] text-gray-600 mt-1" style={{ wordBreak: "keep-all" }}>
                {t("여긴 3 개짜리 작은 예라 2 노드만 줄었어요. 물건이 20 개면 잘려나가는 가지가 통째로 커져서 차이가 훨씬 큽니다.",
                   "This tiny 3-item example only saves 2 nodes. With 20 items each cut removes a whole branch, so the gap gets far bigger.")}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-2xl p-3 border-2 border-blue-200">
              <p className="text-sm font-black text-blue-900">📝 {t("코드 — 부분집합 합 (가지치기)", "Code — subset sum (pruned)")}</p>
              <p className="text-xs text-gray-700 mt-1">
                {t("take / skip 두 갈래 + 'sum > K 컷' 한 줄. 핵심: 양수만이라 가능.", "take/skip two branches + one 'sum > K cut'. Works because all values positive.")}
              </p>
            </div>
            <CodeBlock lang={codeLang} setLang={setCodeLang}
              py={t(`def subset_sum_exists(arr, K):
    n = len(arr)

    def backtrack(idx, cur_sum):
        if cur_sum == K:
            return True            # found!
        if idx == n or cur_sum > K:
            return False           # ← 가지치기 (양수 전제)
        # skip
        if backtrack(idx + 1, cur_sum):
            return True
        # take
        if backtrack(idx + 1, cur_sum + arr[idx]):
            return True
        return False

    return backtrack(0, 0)

print(subset_sum_exists([3, 12, 7], 10))   # True ({3,7})
print(subset_sum_exists([3, 12, 7], 4))    # False`, `def subset_sum_exists(arr, K):
    n = len(arr)

    def backtrack(idx, cur_sum):
        if cur_sum == K:
            return True            # found!
        if idx == n or cur_sum > K:
            return False           # <- prune (assumes positives)
        # skip
        if backtrack(idx + 1, cur_sum):
            return True
        # take
        if backtrack(idx + 1, cur_sum + arr[idx]):
            return True
        return False

    return backtrack(0, 0)

print(subset_sum_exists([3, 12, 7], 10))   # True ({3,7})
print(subset_sum_exists([3, 12, 7], 4))    # False`)}
              cpp={t(`#include <bits/stdc++.h>
using namespace std;

vector<int> arr;
int N, K;

bool backtrack(int idx, int curSum) {
    if (curSum == K) return true;
    if (idx == N || curSum > K) return false;   // ← 가지치기
    // skip
    if (backtrack(idx + 1, curSum)) return true;
    // take
    if (backtrack(idx + 1, curSum + arr[idx])) return true;
    return false;
}

int main() {
    arr = {3, 12, 7}; N = 3; K = 10;
    cout << (backtrack(0, 0) ? "YES" : "NO") << endl;
    return 0;
}`, `#include <bits/stdc++.h>
using namespace std;

vector<int> arr;
int N, K;

bool backtrack(int idx, int curSum) {
    if (curSum == K) return true;
    if (idx == N || curSum > K) return false;   // <- prune
    // skip
    if (backtrack(idx + 1, curSum)) return true;
    // take
    if (backtrack(idx + 1, curSum + arr[idx])) return true;
    return false;
}

int main() {
    arr = {3, 12, 7}; N = 3; K = 10;
    cout << (backtrack(0, 0) ? "YES" : "NO") << endl;
    return 0;
}`)}
            />
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {t(
                "변형: 음수가 섞이면 'sum > K' 가지치기 안 됨 — sum 이 다시 줄 수 있으니. 양수 전제가 핵심.",
                "Variant: with negatives, 'sum > K' pruning fails — sum can decrease again. The positive-only assumption matters.",
              )}
            </p>
          </div>
        )}

        
      </div>

      {<SlideNav step={step} total={totalSteps} setStep={setStep} onFinish={onComplete} />}
    </div>
  )
}

// ── Chapter 5: 정리 ──────────────────────────────────────────────
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
              {t("백트래킹 마스터!", "Backtracking Master!")}
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed text-center mb-3">
              {t(
                "N-Queens, 순열, 부분집합 — 다 같은 골격이라는 거 느꼈죠? choose / explore / un-choose. 이게 *수십 가지 문제* 의 공통 답안이에요. 🎉",
                "N-Queens, permutations, subset sum — all the same skeleton. choose / explore / un-choose. This is the common answer to *dozens of problems*. 🎉",
              )}
            </p>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-gray-800 font-bold text-center">
                {t(
                  "이제 어려운 백트래킹 문제 봐도 — '아, take/skip 이지' 라고 바로 보일 거예요.",
                  "Now hard backtracking problems will click — 'oh, this is just take/skip'.",
                )}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
            <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
            <ol className="space-y-2 text-sm text-gray-800">
              <li><b>1.</b> {t("백트래킹 = ", "Backtracking = ")}<b>{t("choose → explore → un-choose", "choose → explore → un-choose")}</b></li>
              <li><b>2.</b> {t("가지치기 = ", "Pruning = ")}<b>{t("진짜 무기", "the real weapon")}</b>. {t("불가능 보이면 그 가지 전체 컷.", "Cut whole branches when impossibility shows.")}</li>
              <li><b>3.</b> {t("도구: ", "Tools: ")}<code className="bg-white px-1 rounded text-xs">used[]</code> {t("배열, cur 리스트, push/pop 짝 맞춤", "array, cur list, paired push/pop")}</li>
              <li><b>4.</b> {t("재귀 후 ", "After recurse — ")}<b>{t("원상복구 잊지 마요!", "always restore state!")}</b> {t("이게 빠지면 다음 가지가 오염됨.", "Missing this poisons the next branch.")}</li>
              <li><b>5.</b> {t("Python: list 복사할 때 ", "Python: copy lists with ")}<code className="bg-white px-1 rounded text-xs">cur[:]</code> {t("— 안 그러면 모두 같은 객체!", "— otherwise all entries share one object!")}</li>
            </ol>
            <p className="text-xs text-amber-700 mt-3 text-center italic">
              {t("백트래킹은 DP, 그래프 탐색, 트리 순회의 *기초*예요!", "Backtracking is the foundation for DP, graph search, tree traversal!")}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
              <p className="text-[11px] text-purple-700 leading-relaxed">
                🌲 {t("너무 어렵게 느껴지면 재귀 챕터를 다시 봐도 돼요. ", "If it feels tough, you can revisit the Recursion chapter. ")}
                <Link href="/algo/recursion" className="font-bold underline hover:text-purple-900">{t("재귀로 →", "To Recursion →")}</Link>
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
              ? <>🎉 {t("백트래킹 마스터!", "Backtracking Master!")} <Sparkles className="w-5 h-5" /></>
              : <>{t("다음", "Next")} <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function BacktrackingPage() {
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
          user_id: user.id, lesson_id: "algo-backtracking", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-backtracking")) {
          arr.push("algo-backtracking")
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
              { label: "백트래킹", labelEn: "Backtracking", emoji: "🔙" },
            ]} />
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-3xl">🔙</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("백트래킹", "Backtracking")}</h1>
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
            <Link href="/algo/backtracking"
              className="mb-3 flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl px-4 py-3 shadow-md active:scale-[0.99] transition-all">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-black text-sm leading-tight">{t("문제 풀러 가기", "Practice problems")}</p>
                  <p className="text-[11px] text-emerald-50">{t("백트래킹 문제 15 개 — 결정 트리 그려가며!", "12 backtracking challenges — sketch the tree!")}</p>
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
              <h3 className="text-xl font-black text-emerald-900">{t("백트래킹 마스터!", "Backtracking Master!")}</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {t("설명은 끝났어요. 이제 직접 풀어볼 시간! 👇", "Lesson done. Now solve some real problems! 👇")}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/algo" className="block px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-sm text-center border border-gray-200">
                🗺️ {t("다음 알고리즘 토픽 (DP / 그래프)", "Next topic (DP / Graph)")} <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
