"use client"

/**
 * 승급 시험 — 3단계 승급의 ②·③.
 *
 * 화면 하나가 여섯 가지 상태를 담는다. 상태를 화면으로 쪼개면 학생이
 * "지금 내가 어디 있는지"를 주소창으로 추측해야 한다.
 *
 *   배치 전        → 배치고사로 보낸다
 *   자격 없음      → ① 집 연습이 몇 개 남았는지
 *   대기           → 선생님이 열어 주기를 기다림 (자격은 있음)
 *   시작 전        → 창이 열려 있다. 규칙 동의 후 시작
 *   응시 중        → 남은 시간 + 문제 3개 + 통과 표시
 *   끝             → 합격 → 승급 버튼 / 불합격 → 다음 시험 재도전
 *
 * ── 왜 문제 화면을 새로 만들지 않는가 ────────────────────────────────────
 * 시험 문제도 평소 쓰는 PracticeRunner 로 푼다. 통과 판정은 그쪽의
 * "테스트케이스 전부 통과" 기록(`tier-verified`)을 읽어서 한다. 시험용
 * 실행기를 따로 만들면 채점 기준이 두 벌이 되고, 둘이 갈라지는 순간
 * "연습에선 통과인데 시험에선 오답" 이 생긴다.
 */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark } from "@/components/tier-mark"
import { TierStages, type StageStatus } from "@/components/tier-stages"
import { useLanguage } from "@/contexts/language-context"
import {
  PROMOTION_TARGET, tierLabel, findTierProblem, tierProblemTitle, type TierId,
} from "@/lib/tier-system"
import {
  loadTierState, loadVerifiedSolves, syncTierFromServer, tierProgress, promoteTier,
  type TierState, type VerifiedSolves,
} from "@/lib/tier-store"
import {
  EXAM_PASS_COUNT, EXAM_PROBLEM_COUNT, EXAM_MINUTES_DEFAULT,
  loadAttempt, startAttempt, finishAttempt, clearAttempt,
  fetchOpenWindow, remainingMs, examScore, isSolvedInExam,
  type ExamAttempt, type ExamWindow,
} from "@/lib/tier-exam"
import { topicLabel, diffColor, diffLabel } from "@/lib/problem-tags"

export default function TierExamPage() {
  const { lang, t } = useLanguage()

  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useState<TierState | null>(null)
  const [solves, setSolves] = useState<VerifiedSolves>({})
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null)
  const [win, setWin] = useState<ExamWindow | null>(null)
  const [agreed, setAgreed] = useState(false)
  const [promoted, setPromoted] = useState<TierId | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    setState(loadTierState())
    setSolves(loadVerifiedSolves())
    setAttempt(loadAttempt())
    setLoaded(true)

    let alive = true
    syncTierFromServer().then(m => {
      if (!alive) return
      setState(m.state)
      setSolves(m.solves)
    })
    return () => { alive = false }
  }, [])

  // 시험 창은 선생님이 수업 중에 연다 — 한 번만 읽으면 "대기" 화면에서
  // 영원히 기다린다. 15초마다 다시 본다.
  useEffect(() => {
    let alive = true
    const read = () => { void fetchOpenWindow().then(w => { if (alive) setWin(w) }) }
    read()
    const id = setInterval(read, 15_000)
    return () => { alive = false; clearInterval(id) }
  }, [])

  // 1초 시계 — 남은 시간 표시와 시간 초과 자동 채점에 쓴다.
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now())
      // 문제를 풀고 돌아온 경우를 잡는다. 통과 기록은 다른 화면에서 찍힌다.
      setSolves(loadVerifiedSolves())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // 시간 초과는 버튼을 누르지 않아도 끝난다 — 안 끝내면 집에 가서 풀 수 있다.
  useEffect(() => {
    if (attempt && !attempt.finishedAt && remainingMs(attempt, now) === 0) {
      setAttempt(finishAttempt(attempt))
    }
  }, [attempt, now])

  const progress = useMemo(
    () => (state ? tierProgress(state, solves) : null),
    [state, solves],
  )

  if (!loaded) return <Shell><div className="h-40" /></Shell>

  // ── 배치 전 ──────────────────────────────────────────────────────────────
  if (!state || !progress) {
    return (
      <Shell>
        <H1>{t("승급 시험", "Promotion exam")}</H1>
        <Note>
          {t(
            "먼저 배치고사로 내 티어를 정해야 합니다.",
            "Take the placement test first to get your tier.",
          )}
        </Note>
        <Primary href="/tier/placement">{t("배치고사 시작", "Start placement test")}</Primary>
      </Shell>
    )
  }

  const live = attempt && !attempt.finishedAt
  const stage1: StageStatus = progress.eligible ? "done" : "active"
  const stage2: StageStatus = !progress.eligible ? "wait" : live ? "active" : attempt?.finishedAt ? "done" : "active"
  const stage3: StageStatus = promoted ? "done" : attempt?.passed ? "active" : "wait"

  return (
    <Shell>
      <div className="flex items-center gap-3">
        <TierMark tier={state.tier} size={36} />
        <div>
          <H1>{t("승급 시험", "Promotion exam")}</H1>
          <p className="text-sm text-gray-600">
            {t(
              `${tierLabel(state.tier, "ko")} → ${progress.next ? tierLabel(progress.next, "ko") : "최상위"}`,
              `${tierLabel(state.tier, "en")} → ${progress.next ? tierLabel(progress.next, "en") : "Top tier"}`,
            )}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <TierStages stage1={stage1} stage2={stage2} stage3={stage3} />
      </div>

      <div className="mt-5">
        {/* ── ③ 승급 완료 ── */}
        {promoted ? (
          <Panel>
            <PanelHead>{t("승급했습니다", "You ranked up")}</PanelHead>
            <Note>
              {t(
                `이제 ${tierLabel(promoted, "ko")} 입니다. 승급 카운트는 0부터 다시 셉니다.`,
                `You are now ${tierLabel(promoted, "en")}. Your promotion count restarts at zero.`,
              )}
            </Note>
            <Primary href="/tier">{t("내 티어 보기", "View my tier")}</Primary>
          </Panel>

        /* ── 끝난 시험 ── */
        ) : attempt?.finishedAt ? (
          <Panel>
            <PanelHead>
              {attempt.passed ? t("합격", "Passed") : t("불합격", "Not passed")}
            </PanelHead>
            <p className="mt-1 text-sm text-gray-600 break-keep">
              {t(
                `${EXAM_PROBLEM_COUNT}문제 중 ${attempt.score}문제 통과 (합격선 ${EXAM_PASS_COUNT}문제)`,
                `${attempt.score} of ${EXAM_PROBLEM_COUNT} passed (need ${EXAM_PASS_COUNT})`,
              )}
            </p>
            {attempt.passed && progress.next ? (
              <button
                onClick={() => {
                  const next = promoteTier(state, solves, true)
                  if (next) {
                    setState(next)
                    setPromoted(next.tier)
                    clearAttempt()
                    setAttempt(null)
                  }
                }}
                className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800"
              >
                {t(
                  `${tierLabel(progress.next, "ko")}(으)로 승급하기`,
                  `Rank up to ${tierLabel(progress.next, "en")}`,
                )}
              </button>
            ) : (
              <>
                <Note>
                  {t(
                    "승급 자격은 그대로 남습니다. 다음 시험 때 다시 도전하세요.",
                    "You keep your eligibility. Try again at the next exam.",
                  )}
                </Note>
                <button
                  onClick={() => { clearAttempt(); setAttempt(null); setAgreed(false) }}
                  className="mt-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-800 hover:border-orange-400"
                >
                  {t("확인", "Got it")}
                </button>
              </>
            )}
            <ExamList attempt={attempt} lang={lang} />
          </Panel>

        /* ── 응시 중 ── */
        ) : live && attempt ? (
          <Panel>
            <div className="flex items-baseline justify-between">
              <PanelHead>{t("응시 중", "In progress")}</PanelHead>
              <Clock ms={remainingMs(attempt, now)} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-700 tabular-nums">
              {t(
                `통과 ${examScore(attempt)} / ${EXAM_PROBLEM_COUNT}  ·  합격선 ${EXAM_PASS_COUNT}`,
                `Passed ${examScore(attempt)} / ${EXAM_PROBLEM_COUNT}  ·  need ${EXAM_PASS_COUNT}`,
              )}
            </p>
            <Rules />
            <ExamList attempt={attempt} lang={lang} />
            <button
              onClick={() => setAttempt(finishAttempt(attempt))}
              className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800"
            >
              {t("제출하고 채점하기", "Submit and grade")}
            </button>
          </Panel>

        /* ── ① 자격 없음 ── */
        ) : !progress.eligible ? (
          <Panel>
            <PanelHead>{t("아직 응시할 수 없습니다", "Not eligible yet")}</PanelHead>
            <Note>
              {progress.next
                ? t(
                    `내 티어 문제를 ${PROMOTION_TARGET - progress.solved}개 더 통과하면 승급 시험을 볼 수 있습니다. (${progress.solved} / ${PROMOTION_TARGET})`,
                    `Pass ${PROMOTION_TARGET - progress.solved} more problems at your tier to take the exam. (${progress.solved} / ${PROMOTION_TARGET})`,
                  )
                : t("최상위 티어라 승급 시험이 없습니다.", "You are at the top tier — there is no exam.")}
            </Note>
            {progress.next && (
              <Primary href="/tier">{t("내 티어 문제 풀기", "Solve problems at my tier")}</Primary>
            )}
          </Panel>

        /* ── 시작 전 (창이 열려 있다) ── */
        ) : win ? (
          <Panel>
            <PanelHead>{t("시험이 열렸습니다", "The exam is open")}</PanelHead>
            <Note>
              {win.className
                ? t(`${win.className} · 선생님이 교실에서 연 시험입니다.`, `${win.className} · opened by your teacher in class.`)
                : t("선생님이 교실에서 연 시험입니다.", "Opened by your teacher in class.")}
            </Note>
            <Rules />
            <label className="mt-4 flex items-start gap-2.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-orange-600"
              />
              <span className="break-keep">
                {t(
                  "검색과 AI를 쓰지 않고 혼자 풀겠습니다.",
                  "I will solve these on my own, without search or AI.",
                )}
              </span>
            </label>
            <button
              disabled={!agreed}
              onClick={() => setAttempt(startAttempt(state.tier, win, EXAM_MINUTES_DEFAULT))}
              className="mt-4 w-full rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              {t("시험 시작", "Start exam")}
            </button>
            <p className="mt-2 text-xs text-gray-500 break-keep">
              {t(
                "시작하면 문제가 정해지고 시계가 돌아갑니다. 새로고침해도 같은 문제입니다.",
                "Once you start, the problems are fixed and the clock runs. Refreshing keeps the same problems.",
              )}
            </p>
          </Panel>

        /* ── 대기 ── */
        ) : (
          <Panel>
            <PanelHead>{t("시험 대기", "Waiting for the exam")}</PanelHead>
            <Note>
              {t(
                "승급 자격을 얻었습니다. 승급 시험은 선생님이 교실에서 열어 줍니다 — 열리면 이 화면에 시작 버튼이 나타납니다.",
                "You are eligible. Your teacher opens the promotion exam in class — a start button appears here when it is open.",
              )}
            </Note>
            <Rules />
            <Primary href="/tier">{t("그동안 연습하기", "Practice in the meantime")}</Primary>
          </Panel>
        )}
      </div>
    </Shell>
  )
}

/** 시험 규칙 — 모든 상태에서 같은 문장을 쓴다. */
function Rules() {
  const { t } = useLanguage()
  const rules = [
    t(`랜덤 ${EXAM_PROBLEM_COUNT}문제`, `${EXAM_PROBLEM_COUNT} random problems`),
    t(`제한 시간 ${EXAM_MINUTES_DEFAULT}분`, `${EXAM_MINUTES_DEFAULT} minute limit`),
    t(`${EXAM_PASS_COUNT}문제 통과하면 합격`, `Pass ${EXAM_PASS_COUNT} to clear`),
    t("인터넷 검색·AI 사용 없이", "No internet search, no AI"),
  ]
  return (
    <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
      {rules.map(r => (
        <li key={r} className="py-2 text-sm text-gray-700 break-keep">{r}</li>
      ))}
    </ul>
  )
}

/** 시험 문제 3개. 통과 여부는 `tier-verified` 에서 읽는다. */
function ExamList({ attempt, lang }: { attempt: ExamAttempt; lang: string }) {
  const { t } = useLanguage()
  return (
    <ul role="list" className="mt-4 overflow-hidden rounded-xl border border-gray-200">
      {attempt.problemIds.map((id, i) => {
        const p = findTierProblem(id)
        const ok = isSolvedInExam(attempt, id)
        const body = (
          <span className="flex items-start gap-3 px-3 py-2.5">
            <span
              aria-label={ok ? t("통과", "Passed") : t("안 푼 문제", "Todo")}
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                ok ? "bg-emerald-600 text-white" : "border border-dashed border-gray-300 text-transparent"
              }`}
            >
              ✓
            </span>
            <span className="w-4 shrink-0 pt-0.5 text-right text-xs font-semibold tabular-nums text-gray-400">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-gray-900">
                {p ? tierProblemTitle(p, lang) : id}
              </span>
              {p && (
                <span className="mt-0.5 block text-[11px] text-gray-500">
                  {topicLabel(p.topic, lang)}
                </span>
              )}
            </span>
            {p && (
              <span className="shrink-0 pt-0.5 text-xs font-bold" style={{ color: diffColor(p.diff) }}>
                {diffLabel(p.diff, lang) ?? "—"}
              </span>
            )}
          </span>
        )
        return (
          <li key={id} className="border-b border-gray-100 last:border-b-0">
            {p && !attempt.finishedAt ? (
              <Link href={p.url || `/algo/${p.topic}`} className="block hover:bg-orange-50/70">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}

function Clock({ ms }: { ms: number }) {
  const { t } = useLanguage()
  const total = Math.ceil(ms / 1000)
  const mm = Math.floor(total / 60)
  const ss = total % 60
  // 5분 남으면 색을 바꾼다 — 숫자만으로는 남은 시간이 급한지 안 급한지 모른다.
  const urgent = total <= 300
  return (
    <span
      aria-label={t("남은 시간", "Time left")}
      className={`text-xl font-bold tabular-nums ${urgent ? "text-red-600" : "text-gray-900"}`}
    >
      {mm}:{String(ss).padStart(2, "0")}
    </span>
  )
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold tracking-tight text-gray-900">{children}</h1>
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-5">{children}</div>
}

function PanelHead({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-gray-900 break-keep">{children}</h2>
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-sm leading-relaxed text-gray-600 break-keep">{children}</p>
}

function Primary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-4 block w-full rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-orange-700"
    >
      {children}
    </Link>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-6">{children}</main>
      <BottomNav />
    </div>
  )
}
