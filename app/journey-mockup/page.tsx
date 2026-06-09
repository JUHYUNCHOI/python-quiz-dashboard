"use client"

// ⚠️ 설계 프로토타입 (throwaway 경로) — "길" 모델을 실제 진도로 구동.
// 승인되면 진짜 /journey 로 승격. 검토 끝나면 이 파일 삭제.

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCompletedLessons } from "@/lib/curriculum-data"
import { buildCppJourney, type JourneyView } from "@/lib/journey/next-step"
import { CPP_OFF_PATH } from "@/lib/journey/spine-cpp"

export default function JourneyMockup() {
  const [view, setView] = useState<JourneyView | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [showShelf, setShowShelf] = useState(false)

  useEffect(() => {
    setView(buildCppJourney(getCompletedLessons()))
  }, [])

  if (!view) return <div className="min-h-screen bg-slate-50" />

  const cur = view.current

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto px-5 py-8">
        <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-[11px] text-amber-700">
          🎨 “길” 프로토타입 (C++ 트랙) — <b>네 실제 진도</b>로 계산한 다음 1개예요.
        </div>

        {/* 진도 (보조, 작게) */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="font-bold">C++ 트랙</span>
          <span>{view.doneCount} / {view.total} · {view.pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-7">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500 transition-all" style={{ width: `${view.pct}%` }} />
        </div>

        {/* ⭐ 지금 할 것 — 화면의 주인공 1개 */}
        {cur ? (
          <>
            <p className="text-sm font-black text-slate-400 mb-2">⭐ 지금 할 것</p>
            <div className="rounded-3xl border-2 border-violet-200 bg-white shadow-[0_8px_30px_rgba(139,92,246,0.12)] p-6 text-center">
              <div className="text-5xl mb-3">{cur.emoji}</div>
              <h2 className="text-2xl font-black text-slate-900">{cur.title}</h2>
              {cur.why && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed break-keep">{cur.why}</p>}
              <Link href={cur.route} className="mt-5 block w-full py-3.5 rounded-2xl text-lg font-black text-white bg-gradient-to-r from-violet-500 to-blue-500 shadow-md active:scale-[0.98] transition-transform">
                {view.doneCount === 0 ? "시작하기 →" : "이어서 →"}
              </Link>
              {/* 모멘텀: 다음에 올 것 살짝 */}
              <UpcomingPreview view={view} />
            </div>
          </>
        ) : (
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-xl font-black text-emerald-700">C++ 길 완주!</h2>
          </div>
        )}

        {/* 곁길 = 자료실 (작고 흐리게, 절대 안 떠밂) */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <button onClick={() => setShowShelf((s) => !s)} className="text-xs text-slate-400 hover:text-slate-600">
            {showShelf ? "자료실 닫기 ▲" : "📌 참고 자료실 · 💪 더 연습  ▾"}
          </button>
          {showShelf && (
            <div className="w-full flex flex-wrap justify-center gap-2 text-xs">
              {CPP_OFF_PATH.map((it) => (
                <Link key={it.key} href={it.route} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200">
                  {it.emoji} {it.title}
                </Link>
              ))}
            </div>
          )}
          <button onClick={() => setShowMap((s) => !s)} className="text-xs text-slate-400 hover:text-slate-600">
            {showMap ? "전체 지도 닫기 ▲" : "🗺 전체 지도 보기  ▾"}
          </button>
        </div>

        {/* 전체 지도 — 기본 접힘 (자유 이동: 완료=재방문, 앞=부드러운 안내) */}
        {showMap && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm space-y-1">
            {view.items.map((it) => (
              <div key={it.key}>
                {it.section && <p className="text-[11px] font-black text-slate-400 mt-3 mb-1">{it.section}</p>}
                <Link
                  href={it.route}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                    it.current ? "bg-violet-100 font-black text-violet-700"
                    : it.done ? "text-slate-500 hover:bg-slate-100"
                    : "text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <span className="w-5 text-center">{it.done ? "✅" : it.current ? "⭐" : "🔒"}</span>
                  <span>{it.emoji} {it.title}</span>
                  {it.kind === "prereq" && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 ml-auto">선수과목</span>}
                </Link>
              </div>
            ))}
            <p className="pt-2 text-[11px] text-slate-400">완료한 건 아무 때나 다시 · 잠긴 앞은 눌러도 “먼저 ~보고 올래요?” 안내 (막진 않음)</p>
          </div>
        )}
      </div>
    </div>
  )
}

function UpcomingPreview({ view }: { view: JourneyView }) {
  const curIdx = view.items.findIndex((i) => i.current)
  if (curIdx === -1) return null
  const upcoming = view.items.slice(curIdx + 1, curIdx + 3)
  if (!upcoming.length) return null
  return (
    <p className="text-[11px] text-slate-300 mt-3">
      다음 →&nbsp; {upcoming.map((u) => u.title).join("  ·  ")}
    </p>
  )
}
