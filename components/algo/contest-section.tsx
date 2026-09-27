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
      <p className="text-xs text-gray-400 mb-4 break-keep">
        {en
          ? "Apply what you just learned to real USACO / MCC problems."
          : "방금 배운 것을 USACO · MCC 진짜 대회 문제에 써봐요."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.problems.map(p => (
          <Link
            key={p.id}
            href={`/quest/${p.id}`}
            className="rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all p-3 flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", DIFF_COLOR[p.difficulty])}>
                  {en ? DIFF_LABEL[p.difficulty].en : DIFF_LABEL[p.difficulty].ko}
                </span>
                <span className="text-xs text-gray-400">{p.source}</span>
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
