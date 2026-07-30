"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { getAlgoPath, getSideNote } from "@/lib/algo-path"
import { LanguageToggle } from "@/components/language-toggle"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

// 이 페이지 = 알고리즘 학습 지도.  등급(Bronze/Silver/Gold) 3 단 나열에서
// **본길 8 + 옆길 12** 로 바꿨다 (2026-07-29, 선생님: "배우는 순서를 내가 알면
// 좋겠어. 재귀는 아이들이 자꾸 어려워해서 허들이야").
// 등급은 난이도 축일 뿐 *학습 순서* 가 아니어서, 재귀 같은 어려운 토픽이 관문에
// 놓이면 트랙 전체가 멈췄다.  본길/옆길 정의는 lib/algo-path.ts 한 곳.
// 잠금은 두지 않는다 — 이 앱의 기존 원칙(soft, 추천만 강조)과 선생님 결정.

export default function AlgoPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  // 학생의 알고리즘 진도 (algo-* lesson_id) 가져오기
  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("completed", true)
        if (Array.isArray(data)) {
          setCompletedIds(new Set(data.map(d => d.lesson_id).filter(id => id.startsWith("algo-"))))
        }
      } catch {}
    }
    load()
  }, [])

  // 본길/옆길 + 다음 할 것 — lib/algo-path.ts 가 단일 원천 (smart-next·journey 와 동일 기준)
  const path = getAlgoPath(completedIds)
  const doneCount = ALGO_TOPICS.filter(tp => completedIds.has(tp.lessonId)).length
  const isFresh = completedIds.size === 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push("/curriculum")}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">🧪 Algorithm Lab</h1>
            <p className="text-xs text-gray-400">{t(`토픽 ${doneCount}/${ALGO_TOPICS.length} 완료`, `${doneCount}/${ALGO_TOPICS.length} topics done`)}</p>
          </div>
          <LanguageToggle className="shrink-0" />
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ⭐ 지금 할 것 — 선택 고민 0. 큰 버튼 하나. */}
        {path.current ? (
          <Link
            href={`/algo/${path.current.id}`}
            className="block rounded-2xl border-2 border-violet-400 bg-violet-50 px-5 py-4 hover:shadow-md transition-all"
          >
            <p className="text-[11px] font-extrabold text-violet-500 tracking-wide mb-1">
              ⭐ {isFresh ? t("여기서 시작", "START HERE") : t("지금 할 것", "DO THIS NOW")}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl shrink-0">{path.current.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-black text-gray-900 truncate">
                  {t(path.current.title, path.current.titleEn)}
                </p>
                <p className="text-xs text-violet-600 font-bold">
                  {t(`본길 ${path.currentStep}번째 / ${path.total}`, `Trunk ${path.currentStep} of ${path.total}`)}
                </p>
              </div>
              <span className="text-violet-400 text-xl shrink-0">▶</span>
            </div>
          </Link>
        ) : (
          <Link
            href="/quest"
            className="block rounded-2xl border-2 border-amber-300 bg-amber-50 px-5 py-4 hover:shadow-md transition-all"
          >
            <p className="text-[11px] font-extrabold text-amber-600 tracking-wide mb-1">🎉 {t("본길 완주!", "TRUNK COMPLETE!")}</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl shrink-0">🏆</span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-black text-amber-900">{t("이제 실전 대회 문제", "Now: contest problems")}</p>
                <p className="text-xs text-amber-600 font-bold">{t("USACO Bronze · MCC", "USACO Bronze · MCC")}</p>
              </div>
              <span className="text-amber-400 text-xl shrink-0">▶</span>
            </div>
          </Link>
        )}

        {/* 🌳 본길 — 꼭 해야 하는 8 개. 번호가 곧 학습 순서 (선생님 수업 순서표로도 사용). */}
        <section>
          <div className="flex items-baseline gap-2 mb-1.5">
            <h2 className="text-sm font-extrabold text-gray-700">🌳 {t("본길", "Main path")}</h2>
            <span className={cn("text-xs font-bold", path.done > 0 ? "text-green-600" : "text-gray-400")}>
              {path.done}/{path.total}
            </span>
            <span className="text-xs text-gray-400">· {t("여기까지가 USACO Silver 입구", "gets you to USACO Silver")}</span>
          </div>
          <div className="mb-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 transition-all" style={{ width: `${Math.round((path.done / path.total) * 100)}%` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {path.trunk.map((tp, i) => {
              const done = completedIds.has(tp.lessonId)
              const current = tp.id === path.current?.id
              return (
                <Link
                  key={tp.id}
                  href={`/algo/${tp.id}`}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                    done ? "border-green-200 bg-green-50/60"
                      : current ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200"
                        : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-sm"
                  )}
                >
                  <span className={cn(
                    "shrink-0 w-6 h-6 rounded-full grid place-items-center text-[11px] font-black",
                    done ? "bg-green-500 text-white"
                      : current ? "bg-violet-500 text-white"
                        : "bg-gray-100 text-gray-400"
                  )}>{i + 1}</span>
                  <span className="text-xl shrink-0">{tp.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-bold truncate", done ? "text-gray-500" : "text-gray-900")}>
                      {t(tp.title, tp.titleEn)}
                    </p>
                  </div>
                  {done ? <span className="text-green-500 shrink-0">✓</span>
                        : <span className="text-gray-300 shrink-0 group-hover:text-violet-400">→</span>}
                </Link>
              )
            })}
          </div>
        </section>

        {/* 🌿 옆길 — 순서 없음. "언제 필요한지" 를 적어 학생이 건너뛰어도 불안하지 않게. */}
        <section>
          <div className="flex items-baseline gap-2 mb-1.5">
            <h2 className="text-sm font-extrabold text-gray-700">🌿 {t("옆길", "Side paths")}</h2>
            <span className="text-xs text-gray-400">
              · {t("필요할 때 오면 돼요 (순서 없음)", "come when you need them — any order")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {path.side.map(tp => {
              const done = completedIds.has(tp.lessonId)
              const note = getSideNote(tp.id)
              return (
                <Link
                  key={tp.id}
                  href={`/algo/${tp.id}`}
                  className={cn(
                    "group flex items-start gap-3 rounded-xl border px-4 py-3 transition-all",
                    done ? "border-green-200 bg-green-50/60"
                         : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-sm"
                  )}
                >
                  <span className="text-xl shrink-0 mt-0.5">{tp.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-bold truncate", done ? "text-gray-500" : "text-gray-800")}>
                      {t(tp.title, tp.titleEn)}
                    </p>
                    {note && (
                      <p className="text-[11px] text-gray-400 leading-snug mt-0.5" style={{ wordBreak: "keep-all" }}>
                        {t(note.ko, note.en)}
                      </p>
                    )}
                  </div>
                  {done ? <span className="text-green-500 shrink-0">✓</span>
                        : <span className="text-gray-300 shrink-0 group-hover:text-violet-400">→</span>}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
      <BottomNav />
    </div>
  )
}
