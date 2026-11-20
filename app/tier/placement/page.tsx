"use client"

/**
 * 배치고사 — 12문항으로 시작 티어를 정한다.
 *
 * 문제는 "이 코드의 출력은?"이다. 코드를 짜게 하면 한 문항에 5~10분이 걸려
 * 12문항이 한 시간짜리 시험이 된다. 출력 예측은 1분이면 되고, 읽고 머릿속에서
 * 실행하는 능력은 실력과 거의 같이 움직인다.
 *
 * 진행 중에는 정답을 알려주지 않는다. 다음 문항의 난이도가 바로 직전 결과로
 * 정해지므로, 맞았는지 알려주면 학생이 "일부러 틀려 쉬운 티어로 가는" 선택을
 * 할 수 있다. 채점 결과는 끝난 뒤 한 번에 보여준다.
 */

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import {
  startPlacement, currentItem, submitAnswer, resultTier,
  correctCount, placementProgress, PLACEMENT_LENGTH,
  type PlacementState,
} from "@/lib/placement-engine"
import { PLACEMENT_ITEMS } from "@/data/placement-test"
import { tierInfo, tierLabel } from "@/lib/tier-system"
import { placeTier } from "@/lib/tier-store"

export default function PlacementPage() {
  const { lang, t } = useLanguage()
  const router = useRouter()

  const [state, setState] = useState<PlacementState | null>(null)
  const [input, setInput] = useState("")
  const [saved, setSaved] = useState(false)

  const item = state ? currentItem(state) : null
  const done = state !== null && state.phase === "done"

  const byId = useMemo(() => new Map(PLACEMENT_ITEMS.map(i => [i.id, i])), [])

  function begin() {
    setState(startPlacement())
    setInput("")
    setSaved(false)
  }

  function submit() {
    if (!state || !item) return
    setState(submitAnswer(state, input))
    setInput("")
  }

  function finish() {
    if (!state) return
    placeTier(resultTier(state))
    setSaved(true)
    router.push("/tier")
  }

  // ── 시작 전 ──────────────────────────────────────────────────────────────
  if (!state) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("배치고사", "Placement Test")}
        </h1>
        <p className="mt-2 text-gray-600">
          {t(
            "12문항으로 시작 티어를 정합니다. 맞히면 더 어려운 문항이, 틀리면 더 쉬운 문항이 나옵니다.",
            "12 questions decide your starting tier. Answer correctly and the questions get harder; miss and they get easier.",
          )}
        </p>

        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          <Bullet>{t("코드를 읽고 출력을 적습니다 — 코드를 짜지 않습니다.", "You read code and type its output — you do not write code.")}</Bullet>
          <Bullet>{t("실행해 볼 수 없습니다. 머릿속으로 따라가세요.", "You cannot run the code. Trace it in your head.")}</Bullet>
          <Bullet>{t("진행 중에는 정답을 알려주지 않습니다. 끝나면 전체 해설이 나옵니다.", "No feedback during the test. You get a full review at the end.")}</Bullet>
          <Bullet>{t("대소문자는 구분합니다. True 와 true 는 다릅니다.", "Case matters. True and true are different.")}</Bullet>
        </ul>

        <button
          onClick={begin}
          className="mt-8 w-full rounded-xl bg-orange-600 px-6 py-4 text-base font-bold text-white hover:bg-orange-700"
        >
          {t("시작하기", "Start")}
        </button>
      </Shell>
    )
  }

  // ── 결과 ─────────────────────────────────────────────────────────────────
  if (done) {
    const tier = resultTier(state)
    const info = tierInfo(tier)
    return (
      <Shell>
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: info.tint }}
        >
          <div className="text-sm font-semibold text-gray-600">
            {t("배치 결과", "Your placement")}
          </div>
          <div className="mt-3 text-5xl">{info.emoji}</div>
          <div
            className="mt-2 inline-block rounded-full px-4 py-1.5 text-lg font-extrabold"
            style={{ background: info.color, color: info.ink }}
          >
            {tierLabel(tier, lang)}
          </div>
          {/* 분모는 PLACEMENT_LENGTH(12)가 아니라 **실제로 낸 문항 수**다.
              이분 탐색이 3번에 끝나면 9문항만 나가는데, 그때 "0 / 12" 라고
              쓰면 안 낸 3문항을 틀린 것처럼 보여 준다. (실측: 전부 오답인
              학생은 9문항에서 끝났는데 화면은 0/12 라고 했다.) */}
          <div className="mt-4 text-sm text-gray-700">
            {t(
              `${state.answers.length}문항 중 ${correctCount(state)}문항 정답`,
              `${correctCount(state)} of ${state.answers.length} correct`,
            )}
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-600">
          {t(
            "이 티어 문제를 10개 맞히면 다음 티어로 올라갑니다. 아래 티어 문제도 자유롭게 풀 수 있지만 승급에는 세지 않습니다.",
            "Solve 10 problems at this tier to rank up. You can also play lower-tier problems freely, but they do not count toward promotion.",
          )}
        </p>

        <button
          onClick={finish}
          disabled={saved}
          className="mt-6 w-full rounded-xl bg-orange-600 px-6 py-4 text-base font-bold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {t("내 티어로 가기", "Go to my tier")}
        </button>

        <h2 className="mt-10 text-lg font-bold text-gray-900">
          {t("문항 해설", "Review")}
        </h2>
        <div className="mt-3 space-y-3">
          {state.answers.map((a, i) => {
            const q = byId.get(a.itemId)
            if (!q) return null
            return (
              <div
                key={a.itemId}
                className={`rounded-xl border p-4 ${a.correct ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/50"}`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">
                    {i + 1}. {lang === "ko" ? q.topic : q.topicEn}
                  </span>
                  <span className={a.correct ? "text-emerald-700" : "text-rose-700"}>
                    {a.correct ? t("정답", "Correct") : t("오답", "Wrong")}
                  </span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs leading-relaxed text-gray-100">
                  <code>{q.code}</code>
                </pre>
                <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                  <Box label={t("내 답", "Your answer")} value={a.input || "—"} />
                  <Box label={t("정답", "Expected")} value={q.answer} />
                </div>
              </div>
            )
          })}
        </div>
      </Shell>
    )
  }

  // ── 문항 ─────────────────────────────────────────────────────────────────
  if (!item) return null
  const pct = Math.round(placementProgress(state) * 100)

  return (
    <Shell>
      <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
        <span>{state.usedIds.length + 1} / {PLACEMENT_LENGTH}</span>
        <span>{lang === "ko" ? item.topic : item.topicEn}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${pct}%` }} />
      </div>

      <h1 className="mt-6 text-lg font-bold text-gray-900">
        {t("이 코드의 출력은?", "What does this code print?")}
      </h1>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm leading-relaxed text-gray-100">
        <code>{item.code}</code>
      </pre>

      <label className="mt-5 block text-sm font-semibold text-gray-700">
        {t("출력 (여러 줄이면 줄바꿈해서 입력)", "Output (use line breaks for multiple lines)")}
      </label>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          // Enter 는 줄바꿈이어야 한다 — 여러 줄 출력을 입력해야 하므로
          // 제출은 Ctrl/Cmd+Enter 로만 받는다.
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submit() }
        }}
        rows={4}
        spellCheck={false}
        autoFocus
        className="mt-2 w-full rounded-xl border border-gray-300 p-3 font-mono text-sm focus:border-orange-500 focus:outline-none"
        placeholder={t("예: 11", "e.g. 11")}
      />

      <button
        onClick={submit}
        className="mt-4 w-full rounded-xl bg-orange-600 px-6 py-3.5 text-base font-bold text-white hover:bg-orange-700"
      >
        {t("제출", "Submit")}
      </button>
      <p className="mt-2 text-center text-xs text-gray-500">
        {t("모르면 비워 두고 제출하세요.", "Leave it blank and submit if you do not know.")}
      </p>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto max-w-2xl px-4 pt-6">
        <Link href="/tier" className="text-sm text-gray-500 hover:text-orange-600">
          ← Tier
        </Link>
        <div className="mt-3">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-orange-500">•</span>
      <span>{children}</span>
    </li>
  )
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/70 p-2">
      <div className="text-[11px] font-semibold text-gray-500">{label}</div>
      <pre className="mt-0.5 whitespace-pre-wrap font-mono text-xs text-gray-900">{value}</pre>
    </div>
  )
}
