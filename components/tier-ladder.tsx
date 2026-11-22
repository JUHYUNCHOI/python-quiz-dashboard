"use client"

/**
 * 티어 사다리 — **어떤 티어가 있는지 전부** 한 줄에 펼쳐 보여 준다.
 *
 * 왜 필요한가: /tier 는 "내 티어" 와 "내 티어 문제 목록" 만 보여줬다. 그러면
 * 학생은 자기가 브론즈 II 라는 건 알아도 **위에 뭐가 몇 개 더 있는지** 를
 * 모른다. 끝이 안 보이는 사다리는 올라갈 마음이 안 생기고, 배치고사를 아직
 * 안 본 학생은 "뭘 받게 되는 건지" 조차 모른 채 시험을 봐야 한다.
 *
 * 그려지는 규칙 셋:
 *   1. 10칸 전부 항상 보인다. 잠긴 티어를 숨기지 않는다 — 숨기면 사다리가 아니다.
 *   2. 지금 내 칸만 **색을 채우고**, 지나온 칸은 색 마크 + 흰 바탕, 앞으로 갈
 *      칸은 회색. 셋이 한눈에 갈린다.
 *   3. 좁은 화면에서는 가로로 민다. 세로로 쌓으면 '사다리' 가 아니라 목록이 된다.
 *      내 칸이 화면 밖에 있을 수 있으므로 마운트 때 가운데로 스크롤한다.
 *
 * 그라데이션·글로우·그림자 없음. 등급 차이는 **모양과 채움**이 말한다.
 *
 * ── 두 가지 밀도 ──────────────────────────────────────────────────────────
 *   `strip` — 이미 티어가 있는 학생용. 아래에 문제 목록이 길게 따라오므로
 *             사다리는 머리띠처럼 얇아야 한다.
 *   `board` — 배치고사 전 학생용. 이 화면에는 사다리 말고 들어갈 게 없다.
 *             좁은 칼럼에 60px 짜리 칸 열 개를 넣어 두면 1900px 짜리 화면의
 *             90%가 빈 회색 바닥이 된다. 그래서 가로로 꽉 채우고 마크를
 *             크게 키우고, 칸마다 문제 수를 적어 **빈 상자가 아니게** 한다.
 */

import { useEffect, useRef } from "react"
import { TierMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import { TIERS, problemsInTier, tierRank, type TierId } from "@/lib/tier-system"

export function TierLadder({ current, variant = "strip" }: {
  current: TierId | null
  variant?: "strip" | "board"
}) {
  const { t, lang } = useLanguage()
  const scroller = useRef<HTMLDivElement>(null)
  const here = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = scroller.current
    const cell = here.current
    if (!box || !cell) return
    // scrollIntoView 를 쓰면 페이지 전체가 같이 튄다(사다리가 화면 중앙으로
    // 끌려 올라온다). 가로 스크롤 위치만 직접 계산해서 옮긴다.
    box.scrollLeft = cell.offsetLeft - box.clientWidth / 2 + cell.clientWidth / 2
  }, [current])

  const myRank = current ? tierRank(current) : -1
  // 배치고사 전에는 '지나온 칸' 이 하나도 없다. 그대로 두면 10칸이 전부 회색이
  // 되어 "무슨 티어가 있는지" 는 보여도 **그게 어떤 색인지** 는 안 보인다 —
  // 받게 될 상품을 흑백 카탈로그로 보여 주는 꼴이다. 언랭일 때는 전부 제 색으로.
  const unranked = current === null

  if (variant === "board") {
    return (
      <section aria-label={t("티어 사다리", "Tier ladder")}>
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {t("티어 사다리", "Tier ladder")}
          </h2>
          <p className="text-xs text-gray-500 break-keep">
            {t("배치고사가 이 중 한 칸을 정해 줍니다", "The placement test picks your starting rung")}
          </p>
        </div>

        {/* 칸을 세로로 **끝까지** 늘리면 100px 짜리 마크 하나가 떠 있는 500px
            높이의 빈 상자 열 개가 된다. 높이는 정해 두되(`min-h`) 마크를 그
            높이에 맞게 같이 키워서 "작은 아이콘 줄" 이 아니라 진열장이 되게 한다.
            이름·문제 수는 아래에 붙여 칸이 빈 상자가 아니게 만든다. */}
        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {TIERS.map(ti => {
            const count = problemsInTier(ti.id).length
            return (
              <div
                key={ti.id}
                className="flex min-h-[220px] flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-2 py-7 lg:min-h-[300px] lg:py-9"
              >
                {/* size 는 속성값이라 CSS 로 덮인다 — 화면 폭에 따라 키운다.
                    폭은 칸 안쪽(약 118px)을 넘기면 안 된다 — 넘기는 순간 마크가
                    테두리를 뚫고 옆 칸까지 걸친다. */}
                <TierMark
                  tier={ti.id}
                  size={112}
                  className="my-auto h-20 w-20 lg:h-28 lg:w-28"
                />
                <div className="text-center">
                  <div className="text-sm font-bold leading-tight break-keep lg:text-base">
                    {lang === "en" ? ti.labelEn : ti.label}
                  </div>
                  <div className="mt-1 text-[11px] tabular-nums text-gray-400 lg:text-xs">
                    {t(`문제 ${count}개`, `${count} problems`)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section aria-label={t("티어 사다리", "Tier ladder")}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {t("티어 사다리", "Tier ladder")}
        </h2>
        <p className="text-[11px] text-gray-500 break-keep">
          {current
            ? t(
                `${TIERS.length}단계 중 ${myRank + 1}번째`,
                `${myRank + 1} of ${TIERS.length}`,
              )
            : t("배치고사를 보면 이 중 한 칸에서 시작해요", "The placement test picks your starting rung")}
        </p>
      </div>

      <div ref={scroller} className="-mx-1 overflow-x-auto px-1 pb-1">
        {/* 칸 폭 × 10 + 간격이 본문 폭(640px)을 넘으면 데스크탑에서도 양끝이
            잘려서 "사다리 전체" 라는 인상이 사라진다. 62px·gap-1 이 딱 16px
            넘쳤다. */}
        <div className="flex min-w-max gap-0.5">
          {TIERS.map((ti, i) => {
            const isHere = ti.id === current
            const passed = unranked || (myRank >= 0 && i < myRank)
            return (
              <div
                key={ti.id}
                ref={isHere ? here : undefined}
                aria-current={isHere ? "true" : undefined}
                className={[
                  "flex w-[60px] shrink-0 flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5",
                  isHere ? "border-transparent" : passed ? "border-gray-200 bg-white" : "border-gray-200 bg-gray-50",
                ].join(" ")}
                style={isHere ? { background: ti.color, borderColor: ti.color } : undefined}
              >
                <TierMark
                  tier={ti.id}
                  size={30}
                  color={isHere ? ti.ink : passed ? ti.color : "#d1d5db"}
                />
                <span
                  className={[
                    "text-center text-[10px] font-bold leading-tight break-keep",
                    isHere ? "" : passed ? "text-gray-700" : "text-gray-400",
                  ].join(" ")}
                  style={isHere ? { color: ti.ink } : undefined}
                >
                  {lang === "en" ? ti.labelEn : ti.label}
                </span>
                {isHere && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-black"
                    style={{ background: ti.ink, color: ti.color }}
                  >
                    {t("나", "You")}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
