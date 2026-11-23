"use client"

/**
 * 선생님 — 승급 시험 열기/닫기 + 응시 현황.
 *
 * 승급 3단계의 ②를 여기서 시작한다. 학생 쪽 `/tier/exam` 은 **열린 창이
 * 없으면 아무것도 못 한다** — 이 화면이 그 창을 만든다.
 *
 * ── 왜 반 단위인가 ────────────────────────────────────────────────────────
 * 시험 규칙이 "인터넷 검색·AI 사용 없이"다. 그걸 지키게 하는 건 코드가
 * 아니라 교실이다. 그래서 응시 가능 여부를 학생 개인이 아니라 "지금 이
 * 교실에 선생님이 있다"는 사실에 묶는다.
 *
 * ── 왜 종료 시각을 선생님이 고르는가 ──────────────────────────────────────
 * 수업 시간이 반마다 다르다. 창이 30분이면 40분 시험을 시작한 학생은
 * 10분을 잃는다 — 그래서 학생의 제한 시간은 "제한 시간"과 "창이 닫히는
 * 시각" 중 **이른 쪽**이다(`lib/tier-exam.ts`). 창을 짧게 열면 시험도 짧다.
 */

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronLeft } from "lucide-react"
import {
  EXAM_MINUTE_CHOICES, EXAM_MINUTES_DEFAULT, EXAM_PROBLEM_COUNT, EXAM_PASS_COUNT,
  openExamWindow, closeExamWindow, fetchRoster, type ExamRoster,
} from "@/lib/tier-exam"
import { tierLabel, isValidTier } from "@/lib/tier-system"

interface ClassRow {
  id: string
  name: string
  /** 지금 열려 있는 창 id. null 이면 닫혀 있다. */
  windowId: string | null
  closesAt: string | null
}

export default function TeacherExamPage() {
  const { user, profile, isLoading: authLoading } = useAuth()
  const { lang, t } = useLanguage()

  const [classes, setClasses] = useState<ClassRow[]>([])
  const [loading, setLoading] = useState(true)
  const [minutes, setMinutes] = useState(EXAM_MINUTES_DEFAULT)
  const [busy, setBusy] = useState<string | null>(null)
  const [roster, setRoster] = useState<Record<string, ExamRoster[]>>({})
  /** 테이블이 없는 경우(마이그레이션 008 미적용)를 화면에 말해 준다. */
  const [schemaMissing, setSchemaMissing] = useState(false)

  const load = useCallback(async () => {
    if (!user) return
    const supabase = createClient()
    const { data: cls } = await supabase
      .from("classes")
      .select("id, name")
      .eq("teacher_id", user.id)
      .order("created_at", { ascending: false })

    const rows: ClassRow[] = ((cls ?? []) as { id: string; name: string }[]).map(c => ({
      id: c.id, name: c.name, windowId: null, closesAt: null,
    }))

    if (rows.length) {
      const { data: wins, error } = await supabase
        .from("tier_exam_windows")
        .select("id, class_id, closes_at")
        .in("class_id", rows.map(r => r.id))
        .gt("closes_at", new Date().toISOString())
      if (error) setSchemaMissing(true)
      for (const w of (wins ?? []) as { id: string; class_id: string; closes_at: string }[]) {
        const row = rows.find(r => r.id === w.class_id)
        if (row) { row.windowId = w.id; row.closesAt = w.closes_at }
      }
    }

    setClasses(rows)
    setLoading(false)

    // 응시 현황 — 열린 창만 읽는다. 닫힌 시험까지 긁으면 수업마다 쿼리가 늘어난다.
    const open = rows.filter(r => r.windowId)
    if (open.length) {
      const entries = await Promise.all(
        open.map(async r => [r.id, await fetchRoster(r.windowId!)] as const),
      )
      setRoster(Object.fromEntries(entries))
    } else {
      setRoster({})
    }
  }, [user])

  useEffect(() => { void load() }, [load])

  // 응시 현황은 수업 중에 계속 바뀐다 — 10초마다 다시 읽는다.
  useEffect(() => {
    const id = setInterval(() => { void load() }, 10_000)
    return () => clearInterval(id)
  }, [load])

  if (authLoading || loading) {
    return <Shell><p className="text-sm text-gray-500">{t("불러오는 중…", "Loading…")}</p></Shell>
  }

  if (profile?.role !== "teacher") {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-gray-900">{t("승급 시험", "Promotion exam")}</h1>
        <p className="mt-2 text-sm text-gray-600 break-keep">
          {t(
            "선생님 계정만 시험을 열 수 있습니다.",
            "Only teacher accounts can open the exam.",
          )}
        </p>
      </Shell>
    )
  }

  return (
    <Shell>
      <Link href="/teacher" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-800">
        <ChevronLeft className="h-4 w-4" />
        {t("내 반 관리", "Manage my classes")}
      </Link>

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
        {t("승급 시험 열기", "Open the promotion exam")}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 break-keep">
        {t(
          `시험을 열면 승급 자격을 갖춘 학생이 응시할 수 있습니다. 학생마다 랜덤 ${EXAM_PROBLEM_COUNT}문제가 나오고, ${EXAM_PASS_COUNT}문제를 통과하면 티어가 오릅니다.`,
          `While the exam is open, eligible students can take it. Each student gets ${EXAM_PROBLEM_COUNT} random problems and ranks up by passing ${EXAM_PASS_COUNT}.`,
        )}
      </p>

      {schemaMissing && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 break-keep">
          {t(
            "시험 테이블이 아직 없습니다. Supabase SQL Editor 에서 008_create_tier_exam_tables.sql 을 실행해 주세요.",
            "The exam tables do not exist yet. Run 008_create_tier_exam_tables.sql in the Supabase SQL Editor.",
          )}
        </p>
      )}

      {/* 제한 시간 — 요구사항 30~45분. */}
      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-gray-900">{t("제한 시간", "Time limit")}</legend>
        <div className="mt-2 flex gap-2">
          {EXAM_MINUTE_CHOICES.map(m => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              aria-pressed={minutes === m}
              className={`rounded-xl border px-4 py-2 text-sm font-bold tabular-nums ${
                minutes === m
                  ? "border-orange-500 bg-orange-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-orange-400"
              }`}
            >
              {t(`${m}분`, `${m} min`)}
            </button>
          ))}
        </div>
      </fieldset>

      {classes.length === 0 ? (
        <p className="mt-6 rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
          {t("아직 반이 없습니다. 먼저 반을 만들어 주세요.", "No classes yet. Create a class first.")}
        </p>
      ) : (
        <ul role="list" className="mt-6 space-y-3">
          {classes.map(c => {
            const open = !!c.windowId
            const list = roster[c.id] ?? []
            return (
              <li key={c.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-bold text-gray-900">{c.name}</div>
                    <div className="mt-0.5 text-xs text-gray-500 tabular-nums">
                      {open && c.closesAt
                        ? t(
                            `${new Date(c.closesAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 에 닫힘`,
                            `Closes at ${new Date(c.closesAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
                          )
                        : t("닫혀 있음", "Closed")}
                    </div>
                  </div>
                  <button
                    disabled={busy === c.id}
                    onClick={async () => {
                      setBusy(c.id)
                      if (open) await closeExamWindow(c.windowId!)
                      else await openExamWindow(c.id, minutes)
                      await load()
                      setBusy(null)
                    }}
                    className={`rounded-xl px-5 py-2.5 text-sm font-bold disabled:opacity-50 ${
                      open
                        ? "border border-gray-300 bg-white text-gray-800 hover:border-red-400 hover:text-red-700"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    {open ? t("시험 닫기", "Close exam") : t("시험 열기", "Open exam")}
                  </button>
                </div>

                {open && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    {list.length === 0 ? (
                      <p className="text-xs text-gray-500 break-keep">
                        {t("아직 시작한 학생이 없습니다.", "No student has started yet.")}
                      </p>
                    ) : (
                      <ul role="list" className="divide-y divide-gray-100">
                        {list.map(r => (
                          <li key={r.userId} className="flex items-center gap-3 py-2 text-sm">
                            <span className="min-w-0 flex-1 truncate font-semibold text-gray-900">
                              {r.name || t("이름 없음", "Unnamed")}
                            </span>
                            <span className="shrink-0 text-xs text-gray-500">
                              {isValidTier(r.tier) ? tierLabel(r.tier, lang) : r.tier}
                            </span>
                            <span className="shrink-0 text-xs font-bold tabular-nums text-gray-700">
                              {r.score} / {EXAM_PROBLEM_COUNT}
                            </span>
                            <span
                              className={`shrink-0 text-xs font-bold ${
                                !r.finished ? "text-gray-400"
                                : r.passed ? "text-emerald-700"
                                : "text-red-600"
                              }`}
                            >
                              {!r.finished ? t("응시 중", "In progress")
                                : r.passed ? t("합격", "Passed")
                                : t("불합격", "Not passed")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-6">{children}</main>
      <BottomNav />
    </div>
  )
}
