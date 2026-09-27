"use client"

import Link from "next/link"
import { Trophy, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAlgoContestLinks } from "@/data/algo/contest-links"
import type { ContestProblem } from "@/data/algo/contest-links"

/**
 * 토픽 하나를 다 배운 학생에게 **「그래서 어느 실전 문제를 풀지」** 를 보여준다.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * 왜 여기로 옮겼나 (2026-09-27)
 *
 * 선생님: *"BFS랑 DFS 문제들 모아두게 해달라는것 되었나? USACO랑 MCC에서."*
 *
 * 답은 **「안 됐다. 그런데 만들어져 있긴 했다」** 였다.
 * 이 컴포넌트의 원본은 `app/algo/[topicId]/client-page.tsx` 안에 있었는데,
 * `app/algo/<토픽>/page.tsx` **정적 라우트가 22개** 있어서 Next.js 라우팅
 * 우선순위상 **동적 라우트 `/algo/[topicId]` 가 한 번도 렌더링된 적이 없다.**
 * 즉 `array`·`sorting`·`stackqueue`·`hashtable`·`prefixsum`·`string`
 * **6개 토픽에 데이터가 이미 들어 있었는데 5개월간 아무도 못 봤다.**
 * (커밋 `607b0fab "Connect student journey: lesson → practice → algo → competition"`)
 *
 * 그래서 **새 화면을 만들지 않았다** — 정적 라우트가 실제로 쓰는
 * `TopicProblemsPage` 안으로 이 섹션을 옮겼을 뿐이다.
 * `feedback_shorter_not_longer` — 고치기 전에 이미 있는 걸 먼저 본다.
 *
 * ⚠️ 링크를 **내부로** 바꿨다. 원본은 `codeQuestUrl(id)` 로
 * `https://codequest.coderin.app/?p=...` 라는 **외부 도메인**을 가리켰는데,
 * `quest_integration_strategy.md`(2026-04-29)로 quest 가 이 사이트 안
 * `/quest/<id>` 로 통합된 뒤 이 파일만 갱신이 안 됐다.
 * 실측: `contest-links.ts` 의 id 18개가 **전부 `quest-problems/` 안에 있다** —
 * 그대로 내부 경로로 쓰면 된다. 새 탭·외부 아이콘도 뗐다(같은 사이트 안이니까).
 *
 * ⚠️ 데이터가 없는 토픽에서는 `null` 을 돌려준다 — 얹어도 아무것도 안 뜬다.
 * ──────────────────────────────────────────────────────────────────────────
 */

const DIFF_LABEL: Record<ContestProblem["difficulty"], { ko: string; en: string }> = {
  easy: { ko: "쉬움", en: "Easy" },
  medium: { ko: "보통", en: "Medium" },
}

const DIFF_COLOR: Record<ContestProblem["difficulty"], string> = {
  easy: "text-emerald-700 bg-emerald-100",
  medium: "text-amber-700 bg-amber-100",
}

/* ⭐ 2026-09-27 선생님: *"저기 나오는것중에 MCC나 USACO에 나온 문제들이라고 표시좀
   했으면 좋겠는데"* — `source` 가 있긴 했는데 `text-gray-400` 작은 글씨라 안 보였다.
   **어느 대회 문제인지가 이 카드의 핵심**이다(그게 「실전」이라는 뜻이니까).
   대회마다 색을 갈라 배지로 세운다. 난이도 배지와 **모양이 겹치지 않게**
   난이도는 알약(rounded-full), 대회는 각진 것(rounded)으로 둔다. */
function contestBadge(source: string): { label: string; cls: string } {
  const s = source.toUpperCase()
  if (s.includes("USACO")) return { label: source, cls: "text-sky-800 bg-sky-100 border-sky-300" }
  if (s.includes("MCO")) return { label: source, cls: "text-fuchsia-800 bg-fuchsia-100 border-fuchsia-300" }
  if (s.includes("MCC")) return { label: source, cls: "text-violet-800 bg-violet-100 border-violet-300" }
  return { label: source, cls: "text-gray-700 bg-gray-100 border-gray-300" }
}

export function AlgoContestSection({
  topicId,
  lang,
  reviewHref,
  reviewLabel,
}: {
  topicId: string
  lang: string
  /** 「막히면 다시 보기」가 갈 곳. 없으면 그 줄을 안 그린다. */
  reviewHref?: string
  reviewLabel?: { ko: string; en: string }
}) {
  const links = getAlgoContestLinks(topicId)
  if (!links) return null
  const en = lang === "en"

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="text-sm font-bold text-gray-700">
          {en ? "Try competition problems" : "실전 대회 문제 도전"}
        </span>
        <div className="flex-1 h-px bg-amber-100" />
      </div>
      {/* ⚠️ JSX 텍스트에 마크다운 `**` 를 쓰면 **별표가 글자 그대로 찍힌다.**
          강조는 태그로 한다 (`check-jsx-raw-escape.py` 가 잡는 `\uXXXX` 와 같은 층의 실수). */}
      <p className="text-xs text-gray-500 mb-4 break-keep">
        {en ? (
          <>These are real problems from <b className="text-gray-700">USACO</b> and{" "}
          <b className="text-gray-700">MCC</b> contests — not practice ones.</>
        ) : (
          <>아래는 <b className="text-gray-700">USACO · MCC 대회에 실제로 나온</b> 문제예요.
          연습 문제가 아니에요.</>
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.problems.map(p => (
          <Link
            key={p.id}
            href={`/quest/${p.id}`}
            className="rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all p-3 flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                {/* 대회 배지를 **제목 앞**에 둔다 — 「이게 어디 문제냐」가 먼저 읽혀야 한다 */}
                <span className={cn(
                  "text-[11px] px-1.5 py-0.5 rounded border font-black tracking-wide",
                  contestBadge(p.source).cls,
                )}>{contestBadge(p.source).label}</span>
                <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", DIFF_COLOR[p.difficulty])}>
                  {en ? DIFF_LABEL[p.difficulty].en : DIFF_LABEL[p.difficulty].ko}
                </span>
              </div>
              <p className="text-xs text-gray-500 break-keep">{p.why}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      {/* 막히면 되돌아갈 곳 — 1장부터 다시 읽게 하지 않고 그 장으로 바로 보낸다
          (`?ch=N` 딥링크, 2026-09-27 커밋 `bf0672c0`). */}
      {reviewHref && reviewLabel && (
        <Link
          href={reviewHref}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
        >
          {en ? reviewLabel.en : reviewLabel.ko}
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  )
}
