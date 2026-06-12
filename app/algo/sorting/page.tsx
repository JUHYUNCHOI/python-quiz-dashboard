"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { ArrowLeft, BookOpen, CheckCircle2, X } from "lucide-react"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"
import { sortingContestCluster } from "@/data/practice/algo-sorting-contest"
import { highlightCode } from "@/components/practice/practice-runner"

const SOLVED_KEY = "algo-sorting-contest-solved"

// 🧪 프로토타입: 알고리즘 토픽 = '문제가 메인' + 📖 개념 설명은 옆 슬라이드 패널 (필요할 때)
export default function SortingTopicPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())
  const [showLesson, setShowLesson] = useState(false)
  const [panelW, setPanelW] = useState(80) // 패널 너비 (vw). 기본 4/5
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOLVED_KEY)
      if (raw) setSolvedSet(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  // 패널 왼쪽 가장자리 드래그 → 너비 조절 (30%~95%)
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      const w = ((window.innerWidth - e.clientX) / window.innerWidth) * 100
      setPanelW(Math.min(95, Math.max(30, w)))
    }
    const onUp = () => setDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    document.body.style.userSelect = "none"
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      document.body.style.userSelect = ""
    }
  }, [dragging])

  const problems = sortingContestCluster.problems
  const total = problems.length
  const solvedCount = problems.filter(p => solvedSet.has(p.id)).length
  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0
  const isFresh = solvedCount === 0

  const groups = [
    { key: "쉬움", ko: "🟢 쉬움", en: "🟢 Easy" },
    { key: "보통", ko: "🟡 보통", en: "🟡 Medium" },
    { key: "어려움", ko: "🔴 어려움", en: "🔴 Hard" },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <JourneyBreadcrumb items={[
          { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
          { label: "정렬", labelEn: "Sorting" },
        ]} />

        {/* 헤더 + 개념 설명 버튼 (우측) */}
        <div className="flex items-start gap-3 mb-3">
          <button onClick={() => router.push("/algo")} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span>📊</span> {t("정렬", "Sorting")}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{t("문제를 풀면서 익혀요 · 막히면 개념 설명을 펼쳐요", "Learn by solving · open the concept when stuck")}</p>
          </div>
          <button
            onClick={() => setShowLesson(true)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-violet-300 bg-violet-50 text-violet-700 text-sm font-bold hover:bg-violet-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" /> {t("개념 설명", "Concept")}
          </button>
        </div>

        {/* 진행 — 얼마만큼 풀었나 */}
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 mb-4">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-600">{t("문제 진행", "Problems solved")}</span>
            <span className={solvedCount > 0 ? "text-green-600" : "text-gray-400"}>✓ {solvedCount} / {total} ({pct}%)</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* 처음이면 개념부터 권유 */}
        {isFresh && (
          <button onClick={() => setShowLesson(true)} className="w-full mb-4 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-4 py-3 text-sm text-violet-700 font-bold hover:bg-violet-50 transition-colors text-left">
            👋 {t("정렬이 처음이면 — 먼저 📖 개념 설명을 보고 오세요", "New to sorting? Read the 📖 concept first")}
          </button>
        )}

        {/* 문제 목록 (난이도별) */}
        <div className="flex flex-col gap-4">
          {groups.map(g => {
            const items = problems.filter(p => p.difficulty === g.key)
            if (items.length === 0) return null
            const gSolved = items.filter(p => solvedSet.has(p.id)).length
            return (
              <section key={g.key}>
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                  {t(g.ko, g.en)}
                  <span className={cn("text-xs", gSolved > 0 ? "text-green-600 font-bold" : "text-gray-400")}>{gSolved}/{items.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map((p, i) => {
                    const solved = solvedSet.has(p.id)
                    return (
                      <Link
                        key={p.id}
                        href={`/algo/sorting/practice?p=${p.id}`}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all",
                          solved ? "border-green-200 bg-green-50/60" : "border-gray-200 bg-white hover:border-violet-400 hover:shadow-sm"
                        )}
                      >
                        <span className={cn("w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-black",
                          solved ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500")}>
                          {solved ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </span>
                        <span className={cn("text-sm flex-1 truncate", solved ? "text-gray-500 line-through" : "font-semibold text-gray-900")}>
                          {t(p.title, p.en?.title ?? p.title)}
                        </span>
                        {!solved && <span className="text-gray-300 shrink-0" aria-hidden>→</span>}
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* 다 풀면 다음 토픽 */}
        {solvedCount === total && total > 0 && (
          <Link href="/algo" className="mt-5 block rounded-xl bg-amber-50 border-2 border-amber-200 px-4 py-3 text-center text-sm font-bold text-amber-800 hover:bg-amber-100 transition-colors">
            🎉 {t("정렬 문제 다 풀었어요! 다음 토픽 →", "All sorting problems done! Next topic →")}
          </Link>
        )}
      </main>

      {/* 📖 개념 설명 — 오른쪽 슬라이드 패널 */}
      {showLesson && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowLesson(false)} />
          <div
            className="fixed top-0 right-0 bottom-0 w-full bg-white z-50 shadow-2xl overflow-y-auto"
            style={{ width: `${panelW}vw` }}
          >
            {/* 드래그 핸들 — 왼쪽 가장자리 (데스크탑) */}
            <div
              onMouseDown={() => setDragging(true)}
              className="hidden sm:flex absolute left-0 top-0 bottom-0 w-2.5 cursor-col-resize items-center justify-center hover:bg-violet-100 group z-10"
              title="드래그해서 크기 조절"
            >
              <div className="w-1 h-12 rounded-full bg-gray-300 group-hover:bg-violet-400 transition-colors" />
            </div>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 pl-5 flex items-center justify-between">
              <h2 className="font-black text-gray-900 flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-violet-500" /> {t("정렬 개념", "Sorting concept")}</h2>
              <button onClick={() => setShowLesson(false)} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="close"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-4 py-4 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>{t("정렬은 데이터를 크기 순서대로 줄 세우는 거예요. 대부분 직접 짜지 않고 sort() 한 줄로 끝나요.", "Sorting puts data in order. Usually one line — sort() — handles it.")}</p>
              <pre
                className="rounded-lg bg-gray-900 px-3 py-2.5 text-xs font-mono overflow-x-auto whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightCode(`sort(v.begin(), v.end());            // 오름차순\nsort(v.begin(), v.end(), greater<int>()); // 내림차순`, "cpp") }}
              />
              <p>{t("핵심은 '무엇을 기준으로' 정렬하느냐예요. 점수·시간·이름 같은 기준을 정하고, 정렬한 뒤의 처리(최댓값·중복 제거·짝짓기)로 문제를 풀어요.", "The key is what to sort by. Pick a key (score, time, name…), then process after sorting.")}</p>
              <Link href="/algo/sorting/learn" className="block rounded-xl bg-violet-500 text-white text-center px-4 py-3 font-bold hover:bg-violet-600 transition-colors">
                📖 {t("전체 수업 보기 (애니메이션·예제) →", "Full lesson (animations, examples) →")}
              </Link>
              <p className="text-xs text-gray-400 text-center">{t("처음 배우는 거면 전체 수업부터 보는 걸 추천해요.", "If it's your first time, start with the full lesson.")}</p>
            </div>
          </div>
        </>
      )}
      <BottomNav />
    </div>
  )
}
