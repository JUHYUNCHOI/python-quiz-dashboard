"use client"

/**
 * 배치고사 — 출력 예측 여러 문항 + **코드 작성 2문항**으로 시작 티어를 정한다.
 *
 * 앞부분은 "이 코드의 출력은?"이다. 전부 코드를 짜게 하면 한 문항에 5~10분이
 * 걸려 12문항이 한 시간짜리 시험이 된다. 출력 예측은 1분이면 되므로 그걸로
 * 단계를 빠르게 좁힌다.
 *
 * 뒷부분 2문항은 **직접 짠다**. 출력 예측만으로는 읽기 능력만 재서,
 * "읽을 줄 아는데 못 짜는" 학생이 높은 티어로 배치되면 승급 문제를 한 개도
 * 못 푼다. 첫 문항에서 떨어지면 한 칸 내려가고, 둘째(한 단계 위) 문항을
 * 통과하면 한 칸 올라간다.
 *
 * 배치 상한은 플래티넘 I 이다 — 마스터·그랜드마스터는 승급으로만 올라간다.
 *
 * 진행 중에는 정답을 알려주지 않는다. 다음 문항의 난이도가 바로 직전 결과로
 * 정해지므로, 맞았는지 알려주면 학생이 "일부러 틀려 쉬운 티어로 가는" 선택을
 * 할 수 있다. 채점 결과는 끝난 뒤 한 번에 보여준다.
 * (코드 문항만 예외다 — 어느 테스트에서 틀렸는지 안 보여주면 고칠 수가 없다.)
 */

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import {
  startPlacement, currentItem, submitAnswer, submitCodeResult, resultTier,
  correctCount, placementProgress, codeTaskIndex,
  PLACEMENT_LENGTH, CODE_TASK_COUNT, PLACEMENT_CAP_STEP,
  type PlacementState,
} from "@/lib/placement-engine"
import { PLACEMENT_ITEMS } from "@/data/placement-test"
import { codeTaskTitle, codeTaskPrompt } from "@/data/placement-code"
import { callPistonWithRetry } from "@/lib/piston"
import { tierInfo, tierLabel, TIER_IDS } from "@/lib/tier-system"
import { placeTier } from "@/lib/tier-store"

/** 코드 문항 기본 언어. 학생이 바꿀 수 있다 — 채점기는 언어를 모른다. */
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
  const [input, setInput] = useState("")
  const [saved, setSaved] = useState(false)

  // ── 코드 작성 단계 전용 상태 ──────────────────────────────────────────────
  const [codeLang, setCodeLang] = useState<CodeLang>("python")
  const [code, setCode] = useState(STARTER.python)
  const [judging, setJudging] = useState(false)
  /** 테스트별 통과 여부. 아직 안 돌렸으면 null. */
  const [verdict, setVerdict] = useState<
    { pass: boolean; got: string; want: string; error?: string }[] | null
  >(null)
  /** 실행 서버 자체가 안 될 때의 안내. 학생 코드 문제와 섞어 보이면 안 된다. */
  const [netError, setNetError] = useState<string | null>(null)

  const item = state ? currentItem(state) : null
  const done = state !== null && state.phase === "done"
  const codeTask = state?.phase === "code" ? state.codeTask : null

  const byId = useMemo(() => new Map(PLACEMENT_ITEMS.map(i => [i.id, i])), [])

  function begin() {
    setState(startPlacement())
    setInput("")
    setSaved(false)
    setCodeLang("python")
    setCode(STARTER.python)
    setVerdict(null)
    setNetError(null)
  }

  function submit() {
    if (!state || !item) return
    setState(submitAnswer(state, input))
    setInput("")
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
   * 코드 문항 채점 — 모든 테스트케이스를 실제로 돌린다.
   *
   * 통과 판정을 `ok && output === expected` 로 본다. 연습·승급 시험과 **같은
   * 기준**이다. 여기서 느슨하게 보면(예: 공백 무시) 배치는 통과했는데 정작
   * 같은 코드가 연습에서는 틀리는 일이 생긴다.
   */
  async function judgeCode() {
    if (!state || !codeTask || judging) return
    setJudging(true)
    setVerdict(null)
    setNetError(null)
    try {
      const results = []
      for (const tc of codeTask.tests) {
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
      if (results.every(r => r.pass)) advanceCode(submitCodeResult(state, true))
    } finally {
      setJudging(false)
    }
  }

  /**
   * 코드 문항 하나를 끝내고 다음으로 넘긴다.
   *
   * 에디터를 **반드시 비워야 한다**. 안 비우면 1번 문항 코드가 2번 문항
   * 화면에 그대로 남아, 학생이 그걸 고쳐 내다가 문제를 잘못 읽는다.
   */
  function advanceCode(next: PlacementState) {
    setState(next)
    setVerdict(null)
    setNetError(null)
    setCode(STARTER[codeLang])
  }

  /** 포기 — 못 풀었다고 보고 넘긴다. 첫 문항이면 한 칸 내려간다. */
  function giveUpCode() {
    if (!state) return
    advanceCode(submitCodeResult(state, false))
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
            `출력 예측 최대 ${PLACEMENT_LENGTH}문항과 코드 작성 ${CODE_TASK_COUNT}문항으로 시작 티어를 정합니다. 맞히면 더 어려운 문항이, 틀리면 더 쉬운 문항이 나옵니다.`,
            `Up to ${PLACEMENT_LENGTH} output-prediction questions plus ${CODE_TASK_COUNT} coding problems decide your starting tier. Answer correctly and the questions get harder; miss and they get easier.`,
          )}
        </p>

        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          <Bullet>{t("앞부분은 코드를 읽고 출력을 적습니다. 실행해 볼 수 없으니 머릿속으로 따라가세요.", "In the first part you read code and type its output. You cannot run it — trace it in your head.")}</Bullet>
          <Bullet>{t(`뒷부분 ${CODE_TASK_COUNT}문항은 직접 코드를 짜서 제출합니다. Python 과 C++ 중 하나를 고르세요.`, `In the last ${CODE_TASK_COUNT} questions you write and submit real code. Choose either Python or C++.`)}</Bullet>
          <Bullet>{t("둘째 코드 문항은 한 단계 위 난이도입니다. 통과하면 티어가 한 칸 올라갑니다.", "The second coding problem is one step harder. Passing it moves you up one tier.")}</Bullet>
          <Bullet>{t("코드 문항은 테스트를 모두 통과해야 하고, 통과할 때까지 다시 낼 수 있습니다.", "Each coding problem must pass every test, and you can resubmit until it does.")}</Bullet>
          <Bullet>{t("출력 예측은 진행 중 정답을 알려주지 않습니다. 끝나면 전체 해설이 나옵니다.", "No feedback on the prediction questions until the end, when you get a full review.")}</Bullet>
          {/* 상한을 시작 화면에 못 박는다. 플래티넘 I 을 받은 학생이 "이게 최고인가"를
              물으러 오는 일을 막고, 마스터가 시험으로 안 나오는 걸 기대에 미리 넣는다. */}
          <Bullet>{t(`배치로 받을 수 있는 가장 높은 티어는 ${tierLabel(TIER_IDS[PLACEMENT_CAP_STEP - 1], "ko")} 입니다. 마스터 이상은 승급으로만 올라갑니다.`, `The highest tier placement can award is ${tierLabel(TIER_IDS[PLACEMENT_CAP_STEP - 1], "en")}. Master and above are reached only by ranking up.`)}</Bullet>
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
          <div className="mt-3 flex justify-center"><TierMark tier={tier} size={56} /></div>
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
              `출력 예측 ${state.answers.length}문항 중 ${correctCount(state)}문항 정답`,
              `${correctCount(state)} of ${state.answers.length} prediction questions correct`,
            )}
          </div>
          {/* 코드 문항은 결과에 반드시 적는다 — 여기서 떨어져 한 칸 내려갔는데
              화면에 아무 말이 없으면 학생은 배치가 고장 난 줄 안다. */}
          {state.codeResults.length > 0 && (() => {
            // ⚠️ 엔진은 코드 문항 결과를 `codeResults` 배열로 들고 있다(단일 불리언이 아니다).
            //    통과하면 한 칸 위 문항을 더 내주고, 떨어지면 `best` 를 1 내린다.
            const passed = state.codeResults.filter(r => r.passed).length
            const failed = state.codeResults.length - passed
            return (
              <div className={`mt-1 text-sm font-semibold ${failed === 0 ? "text-emerald-700" : "text-rose-700"}`}>
                {failed === 0
                  ? t(`코드 작성 ${passed}문항 전부 통과`, `All ${passed} coding problems passed`)
                  : t(
                      `코드 작성 ${state.codeResults.length}문항 중 ${passed}문항 통과 — 한 단계 아래로 배치했습니다`,
                      `${passed} of ${state.codeResults.length} coding problems passed — placed one tier lower`,
                    )}
              </div>
            )
          })()}
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

  // ── 코드 작성 문항 ───────────────────────────────────────────────────────
  if (codeTask) {
    const cpct = Math.round(placementProgress(state) * 100)
    return (
      <Shell>
        {/* 오른쪽에 제목을 또 쓰면 바로 아래 h1 과 같은 글자가 두 번 보인다
            (실측: "소수 판정 / 소수 판정"). 여기는 단계만 적는다. */}
        <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
          <span>{t("마지막 문항 — 코드 작성", "Last question — write code")}</span>
          <span>{t(`${codeTask.step}단계`, `Step ${codeTask.step}`)}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${cpct}%` }} />
        </div>

        <h1 className="mt-6 text-lg font-bold text-gray-900 break-keep">
          {codeTaskTitle(codeTask, lang)}
        </h1>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 break-keep">
          {codeTaskPrompt(codeTask, lang)}
        </p>

        {/* 예시 입출력 — 첫 테스트케이스를 그대로 보여준다. 문제문만 읽고
            출력 형식을 맞히라고 하면 "맞는 코드인데 틀림"이 반복된다. */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Box label={t("입력 예시", "Sample input")} value={codeTask.tests[0].stdin.replace(/\n$/, "")} />
          <Box label={t("출력 예시", "Sample output")} value={codeTask.tests[0].expected} />
        </div>

        <div className="mt-5 flex gap-2">
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
          onClick={judgeCode}
          disabled={judging || code.trim() === ""}
          className="mt-4 w-full rounded-xl bg-orange-600 px-6 py-3.5 text-base font-bold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {judging
            ? t("채점 중…", "Running tests…")
            : t(`제출하고 채점 (${codeTask.tests.length}개 테스트)`, `Submit and run ${codeTask.tests.length} tests`)}
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
                      {t(`테스트 ${i + 1}`, `Test ${i + 1}`)}
                    </span>
                  </div>
                  {!v.pass && (
                    <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                      <Box label={t("내 출력", "Your output")} value={v.error ?? (v.got || "—")} />
                      <Box label={t("기대 출력", "Expected")} value={v.want} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 포기 — 막혔을 때 빠져나갈 길이 없으면 배치고사가 거기서 끝난다.
            한 칸 내려서 배치되므로 "못 푼 티어에 앉는" 일은 안 생긴다. */}
        <button
          onClick={giveUpCode}
          disabled={judging}
          className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-600 hover:border-gray-400 disabled:opacity-60"
        >
          {t("못 풀겠습니다 — 한 단계 아래로 배치", "I'm stuck — place me one tier lower")}
        </button>
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
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto max-w-2xl px-4 pt-6">
        <Link href="/tier" className="text-sm text-gray-500 hover:text-orange-600">
          {/* 돌아가기 링크가 한국어 화면에서도 "Tier" 였다 — 뒤로 가는 버튼은
              학생이 가장 자주 누르는 것이고, 거기서 언어가 어긋나면 눈에 띈다. */}
          {t("← 티어", "← Tier")}
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
