"use client"

/**
 * 반별 리더보드.
 *
 * 전체 순위는 일부러 만들지 않았다. 1430문제짜리 앱에서 전교 등수를 붙이면
 * 브론즈 학생은 영원히 맨 아래에 있고, 그 화면은 아무도 두 번 보지 않는다.
 * 같은 반 20~30명은 서로 아는 사이라 비교가 의미가 있다.
 *
 * 순위는 **티어 → 승급 진행도** 순이다. 통과 총개수로 매기지 않는다 —
 * 아래 티어 문제는 "연습 전용"이라고 못 박아 뒀는데, 그걸 많이 푼 사람이
 * 1등이 되면 그 말이 거짓이 된다.
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import { tierInfo, tierLabel, type TierId } from "@/lib/tier-system"

interface Entry {
  classId: string
  className: string
  studentId: string
  name: string
  tier: TierId
  solved: number
  isMe: boolean
}

interface ClassRef {
  id: string
  name: string
}

export default function TierLeaderboardPage() {
  const { lang, t } = useLanguage()

  const [loading, setLoading] = useState(true)
  const [unauthed, setUnauthed] = useState(false)
  const [classes, setClasses] = useState<ClassRef[]>([])
  const [entries, setEntries] = useState<Entry[]>([])
  const [target, setTarget] = useState(10)
  const [classId, setClassId] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetch("/api/tier/leaderboard")
      .then(async res => {
        if (!alive) return
        if (res.status === 401) { setUnauthed(true); return }
        if (!res.ok) return
        const d = await res.json() as {
          classes: ClassRef[]; entries: Entry[]; target: number
        }
        if (!alive) return
        setClasses(d.classes)
        setEntries(d.entries)
        setTarget(d.target)
        setClassId(prev => prev ?? d.classes[0]?.id ?? null)
      })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const shown = classId ? entries.filter(e => e.classId === classId) : entries

  return (
    <Shell>
      <h1 className="text-2xl font-bold text-gray-900">
        {t("우리 반 리더보드", "Class leaderboard")}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {t(
          "티어가 높은 순, 같으면 승급 진행도 순입니다. 아래 티어 연습 문제는 순위에 들어가지 않습니다.",
          "Ranked by tier, then by promotion progress. Lower-tier practice problems do not count.",
        )}
      </p>

      {loading ? (
        <div className="mt-6 space-y-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : unauthed ? (
        <Notice>
          {t(
            "리더보드는 로그인한 뒤에 볼 수 있습니다. 내 티어는 로그인 없이도 쓸 수 있습니다.",
            "Sign in to see the leaderboard. Your own tier works without signing in.",
          )}
        </Notice>
      ) : classes.length === 0 ? (
        <Notice>
          {t(
            "아직 반에 들어가지 않았습니다. 선생님께 받은 참여 코드로 반에 들어가면 리더보드가 보입니다.",
            "You have not joined a class yet. Join with the code from your teacher to see the leaderboard.",
          )}
        </Notice>
      ) : (
        <>
          {classes.length > 1 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {classes.map(c => {
                const on = c.id === classId
                return (
                  <button
                    key={c.id}
                    onClick={() => setClassId(c.id)}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                      on
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:border-orange-400"
                    }`}
                  >
                    {c.name}
                  </button>
                )
              })}
            </div>
          )}

          {shown.length === 0 ? (
            <Notice>
              {t(
                "이 반에서 아직 배치고사를 본 사람이 없습니다. 첫 번째가 되어 보세요.",
                "Nobody in this class has taken the placement test yet. Be the first.",
              )}
            </Notice>
          ) : (
            <ol role="list" className="mt-5 space-y-2">
              {shown.map((e, i) => {
                const info = tierInfo(e.tier)
                return (
                  <li
                    key={e.studentId}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                      e.isMe
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className="w-6 flex-shrink-0 text-center text-sm font-extrabold text-gray-400">
                      {i + 1}
                    </span>
                    <TierMark tier={e.tier} size={22} className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-gray-900">
                        {e.name || t("이름 없음", "No name")}
                        {e.isMe && (
                          <span className="ml-1.5 text-xs font-semibold text-orange-600">
                            {t("나", "me")}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="rounded-full px-2 py-0.5 text-[11px] font-extrabold"
                          style={{ background: info.color, color: info.ink }}
                        >
                          {tierLabel(e.tier, lang)}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {e.solved} / {target}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </>
      )}
    </Shell>
  )
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-xl border border-dashed border-gray-300 p-5 text-center text-sm text-gray-600">
      {children}
    </p>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto max-w-2xl px-4 pt-6">
        <Link href="/tier" className="text-sm text-gray-500 hover:text-orange-600">
          {t("← 티어", "← Tier")}
        </Link>
        <div className="mt-3">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
