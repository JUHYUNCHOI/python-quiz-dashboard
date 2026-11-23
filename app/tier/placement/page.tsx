"use client"

/**
 * 배치고사 — **백준식 코딩 문제 3~4개**로 시작 티어를 정한다.
 *
 * 출력 예측("이 코드의 출력은?")은 걷어냈다. 그건 읽기 능력이고, 배치된
 * 티어에서 학생이 할 일은 문제를 읽고 코드를 짜는 것 하나다. 자세한 이유는
 * `lib/placement-engine.ts` 머리말에 적어 뒀다.
 *
 * 문제 화면은 백준의 배치를 그대로 따른다 — 제목 / 문제 / 입력 / 출력 /
 * 제한 / 예제. 학생이 대회에서 만나는 모양과 다르면 "형식을 몰라서 틀리는"
 * 일이 생긴다.
 *
 * 채점 결과는 **문제마다 바로 보여준다.** 어느 테스트에서 틀렸는지 안
 * 보여주면 고칠 수가 없다. 통과할 때까지 다시 낼 수 있으므로 찍어서 맞을
 * 수도 없다 — 그래서 한 단계를 한 문제로 판정해도 운이 끼지 않는다.
 */

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import {
  startPlacement, currentTask, submitResult, resultTier,
  passedCount, placementProgress, problemIndex,
  PLACEMENT_MAX_PROBLEMS, PLACEMENT_CAP_STEP,
  type PlacementState,
} from "@/lib/placement-engine"
import { codeTaskText, codeTaskSamples, findCodeTask } from "@/data/placement-code"
import { callPistonWithRetry } from "@/lib/piston"
import { preloadPython } from "@/utils/pyodideWorker"
import { tierInfo, tierLabel, TIER_IDS } from "@/lib/tier-system"
import { placeTier } from "@/lib/tier-store"

/** 학생이 고르는 언어. 채점기는 언어를 모른다 — stdout 만 본다. */
type CodeLang = "python" | "cpp"

const STARTER: Record<CodeLang, string> = {
  python: "",
  // C++ 은 뼈대가 없으면 중급 학생도 5분을 include 에 쓴다. 로직은 비워 둔다.
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n",
}

export default function PlacementPage() {
  const { lang, t } = useLanguage()
  const router = useRouter()

  const [state, setState] = useState<PlacementState | null>(null)
  const [saved, setSaved] = useState(false)

  const [codeLang, setCodeLang] = useState<CodeLang>("python")
  const [code, setCode] = useState(STARTER.python)
  /* 채점 서버가 죽었을 때 쓰는 브라우저 실행기를 미리 받아 둔다.
     배치고사는 한 번에 끝나는 시험이라 제출 때 몇 초 더 기다리게 하면 안 된다. */
  useEffect(() => {
    if (codeLang === "python") preloadPython()
  }, [codeLang])
  const [judging, setJudging] = useState(false)
  /** 테스트별 통과 여부. 아직 안 돌렸으면 null. */
  const [verdict, setVerdict] = useState<
    { pass: boolean; got: string; want: string; error?: string }[] | null
  >(null)
  /** 실행 서버 자체가 안 될 때의 안내. 학생 코드 문제와 섞어 보이면 안 된다. */
  const [netError, setNetError] = useState<string | null>(null)

  const task = state ? currentTask(state) : null
  const done = state !== null && state.phase === "done"

  function begin() {
    setState(startPlacement())
    setSaved(false)
    setCodeLang("python")
    setCode(STARTER.python)
    setVerdict(null)
    setNetError(null)
  }

  function switchLang(next: CodeLang) {
    setCodeLang(next)
    // 학생이 이미 쓴 코드는 지우지 않는다 — 언어를 잘못 눌렀다가 5분을 날린다.
    // 뼈대만 남아 있을 때(= 아직 아무것도 안 썼을 때)만 갈아 끼운다.
    if (code.trim() === "" || code === STARTER.python || code === STARTER.cpp) {
      setCode(STARTER[next])
    }
    setVerdict(null)
    setNetError(null)
  }

  /**
   * 채점 — 공개 예제와 숨은 테스트를 **모두** 돌린다.
   *
   * 통과 판정을 `ok && output === expected` 로 본다. 연습·승급 시험과 **같은
   * 기준**이다. 여기서 느슨하게 보면(예: 공백 무시) 배치는 통과했는데 정작
   * 같은 코드가 연습에서는 틀리는 일이 생긴다.
   */
  async function judge() {
    if (!state || !task || judging) return
    setJudging(true)
    setVerdict(null)
    setNetError(null)
    try {
      const results = []
      for (const tc of task.tests) {
        const r = await callPistonWithRetry(codeLang, code, tc.stdin)
        /* 실행 서버가 죽은 것은 학생 코드의 잘못이 아니다. 테스트별 "실패" 로
           줄줄이 찍으면(실측: 다섯 줄 전부 「내 출력: network」) 학생은 자기
           코드가 틀린 줄 안다. 채점을 멈추고 한 줄로 알린다. */
        if (r.networkError) {
          setNetError(t("실행 서버에 연결하지 못했습니다. 잠시 후 다시 제출해 주세요.",
                        "Could not reach the code runner. Please submit again in a moment."))
          return
        }
        const got = r.output.trim()
        const want = tc.expected.trim()
        results.push({
          pass: r.ok && got === want,
          got,
          want,
          error: r.compileError || r.runtimeError,
        })
      }
      setVerdict(results)
      // 전부 통과해야만 넘어간다. 하나라도 틀리면 고쳐서 다시 낼 수 있다 —
      // 제한 시간이 없는 배치고사에서 1회 제출로 티어를 깎을 이유가 없다.
      if (results.every(r => r.pass)) advance(submitResult(state, true))
    } finally {
      setJudging(false)
    }
  }

  /**
   * 한 문제를 끝내고 다음으로 넘긴다.
   *
   * 에디터를 **반드시 비워야 한다**. 안 비우면 1번 문제 코드가 2번 문제
   * 화면에 그대로 남아, 학생이 그걸 고쳐 내다가 문제를 잘못 읽는다.
   */
  function advance(next: PlacementState) {
    setState(next)
    setVerdict(null)
    setNetError(null)
    setCode(STARTER[codeLang])
  }

  /** 포기 — 못 풀었다고 보고 다음(더 쉬운) 문제로 넘긴다. */
  function giveUp() {
    if (!state) return
    advance(submitResult(state, false))
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
            `코딩 문제 최대 ${PLACEMENT_MAX_PROBLEMS}개로 시작 티어를 정합니다. 백준처럼 문제를 읽고 직접 코드를 짜서 제출합니다.`,
            `Up to ${PLACEMENT_MAX_PROBLEMS} coding problems decide your starting tier. Like on Baekjoon, you read the problem and submit real code.`,
          )}
        </p>

        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          <Bullet>{t("표준 입력으로 값을 읽고 표준 출력으로 답을 내는 문제입니다. 출력 형식을 정확히 맞춰야 합니다.", "Each problem reads from standard input and writes to standard output. Your output format must match exactly.")}</Bullet>
          <Bullet>{t("Python 과 C++ 중 하나를 고르세요. 채점기는 출력만 봅니다.", "Choose either Python or C++. The judge only looks at your output.")}</Bullet>
          <Bullet>{t("숨은 테스트까지 모두 통과해야 하고, 통과할 때까지 다시 낼 수 있습니다.", "You must pass every test including the hidden ones, and you can resubmit until you do.")}</Bullet>
          <Bullet>{t("풀면 더 어려운 문제가, 못 풀면 더 쉬운 문제가 나옵니다. 막히면 「못 풀겠습니다」를 누르세요.", "Solve it and the next problem gets harder; miss it and the next gets easier. Press \u201cI'm stuck\u201d if you cannot proceed.")}</Bullet>
          {/* 상한을 시작 화면에 못 박는다. 플래티넘 I 을 받은 학생이 "이게 최고인가"를
              물으러 오는 일을 막고, 마스터가 시험으로 안 나오는 걸 기대에 미리 넣는다. */}
          <Bullet>{t(`배치로 받을 수 있는 가장 높은 티어는 ${tierLabel(TIER_IDS[PLACEMENT_CAP_STEP - 1], "ko")} 입니다. 마스터 이상은 승급으로만 올라갑니다.`, `The highest tier placement can award is ${tierLabel(TIER_IDS[PLACEMENT_CAP_STEP - 1], "en")}. Master and above are reached only by ranking up.`)}</Bullet>
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
        <div className="rounded-2xl p-6 text-center" style={{ background: info.tint }}>
          <div className="text-sm font-semibold text-gray-600">
            {t("배치 결과", "Your placement")}
          </div>
          <div className="mt-3 flex justify-center"><TierMark tier={tier} size={56} /></div>
          <div
            className="mt-2 inline-block rounded-full px-4 py-1.5 text-lg font-extrabold"
            style={{ background: info.color, color: info.ink }}
          >
            {tierLabel(tier, lang)}
          </div>
          {/* 분모는 PLACEMENT_MAX_PROBLEMS 가 아니라 **실제로 낸 문제 수**다.
              이분 탐색이 3문제에 끝나는 경우가 있는데, 그때 "0 / 4" 라고 쓰면
              안 낸 문제를 틀린 것처럼 보여 준다. */}
          <div className="mt-4 text-sm text-gray-700">
            {t(
              `코딩 문제 ${state.attempts.length}개 중 ${passedCount(state)}개 통과`,
              `${passedCount(state)} of ${state.attempts.length} coding problems solved`,
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
          {t("낸 문제", "Problems you were given")}
        </h2>
        <ul role="list" className="mt-3 space-y-2">
          {state.attempts.map((a, i) => {
            const q = findCodeTask(a.taskId)
            if (!q) return null
            const text = codeTaskText(q, lang)
            return (
              <li
                key={a.taskId}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                  a.passed ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/50"
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-gray-900">
                    {i + 1}. {text.title}
                  </div>
                  <div className="truncate text-xs text-gray-500">{text.skill}</div>
                </div>
                <span className={`shrink-0 text-xs font-bold ${a.passed ? "text-emerald-700" : "text-rose-700"}`}>
                  {a.passed ? t("통과", "Solved") : t("못 풂", "Not solved")}
                </span>
              </li>
            )
          })}
        </ul>
      </Shell>
    )
  }

  // ── 문제 ─────────────────────────────────────────────────────────────────
  if (!task) return null
  const text = codeTaskText(task, lang)
  const samples = codeTaskSamples(task)
  const pct = Math.round(placementProgress(state) * 100)

  return (
    <Shell>
      <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
        <span>{problemIndex(state)} / {PLACEMENT_MAX_PROBLEMS}</span>
        {/* 단계 숫자는 보여주지 않는다 — 학생이 "지금 몇 단계인지"를 알면
            일부러 틀려 낮은 티어로 가는 선택을 할 수 있다. 능력 이름만 적는다. */}
        <span>{text.skill}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${pct}%` }} />
      </div>

      <h1 className="mt-6 text-xl font-bold text-gray-900 break-keep">{text.title}</h1>

      {/* 백준 배치: 문제 / 입력 / 출력 / 제한 */}
      <Section label={t("문제", "Problem")}>{text.desc}</Section>
      <Section label={t("입력", "Input")}>{text.input}</Section>
      <Section label={t("출력", "Output")}>{text.output}</Section>
      <Section label={t("제한", "Constraints")}>{text.limits}</Section>

      {/* 예제는 반드시 공개한다. 문제문만 읽고 출력 형식을 맞히라고 하면
          "맞는 코드인데 틀림"이 반복된다. 숨은 테스트는 따로 더 있다. */}
      {samples.map((s, i) => (
        <div key={i} className="mt-4 grid gap-2 sm:grid-cols-2">
          <Box
            label={t(`예제 입력 ${i + 1}`, `Sample input ${i + 1}`)}
            value={s.stdin.replace(/\n$/, "")}
          />
          <Box
            label={t(`예제 출력 ${i + 1}`, `Sample output ${i + 1}`)}
            value={s.expected}
          />
        </div>
      ))}

      <div className="mt-6 flex gap-2">
        {(["python", "cpp"] as CodeLang[]).map(l => (
          <button
            key={l}
            onClick={() => switchLang(l)}
            aria-pressed={codeLang === l}
            className={`rounded-xl border px-4 py-2 text-sm font-bold ${
              codeLang === l
                ? "border-orange-500 bg-orange-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-orange-400"
            }`}
          >
            {l === "python" ? "Python" : "C++"}
          </button>
        ))}
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={14}
        spellCheck={false}
        className="mt-3 w-full rounded-xl border border-gray-300 bg-gray-900 p-3 font-mono text-sm leading-relaxed text-gray-100 focus:border-orange-500 focus:outline-none"
        placeholder={codeLang === "python"
          ? t("# 여기에 코드를 쓰세요", "# Write your code here")
          : t("// 여기에 코드를 쓰세요", "// Write your code here")}
      />

      <button
        onClick={judge}
        disabled={judging || code.trim() === ""}
        className="mt-4 w-full rounded-xl bg-orange-600 px-6 py-3.5 text-base font-bold text-white hover:bg-orange-700 disabled:opacity-60"
      >
        {judging
          ? t("채점 중…", "Running tests…")
          : t(`제출하고 채점 (${task.tests.length}개 테스트)`, `Submit and run ${task.tests.length} tests`)}
      </button>

      {netError && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          {netError}
        </div>
      )}

      {verdict && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm font-bold text-gray-900">
            {t(
              `${verdict.filter(v => v.pass).length} / ${verdict.length} 테스트 통과`,
              `${verdict.filter(v => v.pass).length} / ${verdict.length} tests passed`,
            )}
          </div>
          <ul role="list" className="mt-2 divide-y divide-gray-100">
            {verdict.map((v, i) => (
              <li key={i} className="py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${v.pass ? "text-emerald-700" : "text-rose-700"}`}>
                    {v.pass ? t("통과", "Pass") : t("실패", "Fail")}
                  </span>
                  <span className="text-gray-500">
                    {i < task.sampleCount
                      ? t(`예제 ${i + 1}`, `Sample ${i + 1}`)
                      : t(`숨은 테스트 ${i + 1 - task.sampleCount}`, `Hidden test ${i + 1 - task.sampleCount}`)}
                  </span>
                </div>
                {/* 숨은 테스트는 입력을 보여주지 않는다 — 보여주면 입력마다
                    if 로 답을 박는 풀이가 통과한다. 틀린 사실만 알린다. */}
                {!v.pass && i < task.sampleCount && (
                  <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                    <Box label={t("내 출력", "Your output")} value={v.error ?? (v.got || "—")} />
                    <Box label={t("기대 출력", "Expected")} value={v.want} />
                  </div>
                )}
                {!v.pass && i >= task.sampleCount && v.error && (
                  <div className="mt-1.5">
                    <Box label={t("오류", "Error")} value={v.error} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 포기 — 막혔을 때 빠져나갈 길이 없으면 배치고사가 거기서 끝난다.
          더 쉬운 문제로 넘어가므로 "못 푼 티어에 앉는" 일은 안 생긴다. */}
      <button
        onClick={giveUp}
        disabled={judging}
        className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-600 hover:border-gray-400 disabled:opacity-60"
      >
        {t("못 풀겠습니다 — 더 쉬운 문제로", "I'm stuck — give me an easier problem")}
      </button>
    </Shell>
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

/** 백준식 문제문 한 토막. 내용은 마크다운이 아니라 생짜 텍스트다. */
function Section({ label, children }: { label: string; children: string }) {
  return (
    <section className="mt-5">
      <h2 className="text-sm font-bold text-gray-900">{label}</h2>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 break-keep">
        {children}
      </p>
    </section>
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
    <div className="rounded-lg border border-gray-200 bg-white p-2">
      <div className="text-[11px] font-semibold text-gray-500">{label}</div>
      <pre className="mt-0.5 whitespace-pre-wrap font-mono text-xs text-gray-900">{value}</pre>
    </div>
  )
}
