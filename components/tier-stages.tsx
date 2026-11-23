"use client"

/**
 * 승급 3단계 — 집 연습 → 학교 시험 → 승급.
 *
 * 왜 화면마다 따로 쓰지 않고 하나로 묶는가: 이 세 칸이 승급 규칙의 전부다.
 * `/tier` 와 `/tier/exam` 에 따로 적으면 둘이 갈라지고, 학생은 "10문제만
 * 풀면 오르는 줄 알았는데" 라는 상태로 시험 화면에 도착한다.
 *
 * 그림·이모지를 쓰지 않는다. 단계 번호와 진행 상태(완료/진행 중/대기)는
 * 숫자와 테두리만으로 충분하고, 승급 규칙에 삽화가 끼면 규칙이 아니라
 * 장식으로 읽힌다.
 */

import { useLanguage } from "@/contexts/language-context"
import { PROMOTION_TARGET } from "@/lib/tier-system"
import { EXAM_PROBLEM_COUNT, EXAM_MINUTES_DEFAULT, EXAM_PASS_COUNT } from "@/lib/tier-exam"

export type StageStatus = "done" | "active" | "wait"

export function TierStages({
  stage1, stage2, stage3,
}: {
  stage1: StageStatus
  stage2: StageStatus
  stage3: StageStatus
}) {
  const { t } = useLanguage()

  const stages: { n: number; head: string; body: string; st: StageStatus }[] = [
    {
      n: 1,
      head: t("집에서 연습", "Practice at home"),
      body: t(
        `내 티어 문제 ${PROMOTION_TARGET}개를 통과하면 승급 자격을 얻습니다.`,
        `Pass ${PROMOTION_TARGET} problems at your tier to become promotion eligible.`,
      ),
      st: stage1,
    },
    {
      n: 2,
      head: t("학교에서 시험", "Exam at school"),
      body: t(
        `선생님이 교실에서 열어 줍니다. 랜덤 ${EXAM_PROBLEM_COUNT}문제 · ${EXAM_MINUTES_DEFAULT}분 · 검색과 AI 없이.`,
        `Your teacher opens it in class. ${EXAM_PROBLEM_COUNT} random problems · ${EXAM_MINUTES_DEFAULT} min · no search, no AI.`,
      ),
      st: stage2,
    },
    {
      n: 3,
      head: t("승급", "Rank up"),
      body: t(
        `${EXAM_PROBLEM_COUNT}문제 중 ${EXAM_PASS_COUNT}문제를 통과하면 티어가 오릅니다. 떨어지면 다음 시험에 재도전합니다.`,
        `Pass ${EXAM_PASS_COUNT} of ${EXAM_PROBLEM_COUNT} and your tier goes up. Otherwise you retry at the next exam.`,
      ),
      st: stage3,
    },
  ]

  return (
    <ol className="grid gap-2.5 sm:grid-cols-3">
      {stages.map(s => (
        <li
          key={s.n}
          className={`rounded-xl border bg-white p-4 ${
            s.st === "active" ? "border-orange-400" : "border-gray-200"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold leading-none tabular-nums ${
                s.st === "wait" ? "text-gray-300" : "text-orange-600"
              }`}
            >
              {s.n}
            </span>
            <span className="text-sm font-bold text-gray-900 break-keep">{s.head}</span>
            {s.st === "done" && (
              <span className="ml-auto text-[11px] font-bold text-emerald-700">
                {t("완료", "Done")}
              </span>
            )}
            {s.st === "active" && (
              <span className="ml-auto text-[11px] font-bold text-orange-700">
                {/* 영어는 짧게 — 1/3 폭 카드에서 머리말과 한 줄을 다투므로
                    "You are here"(12자) 는 머리말까지 같이 줄바꿈시킨다. */}
                {t("지금 단계", "Now")}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-gray-500 break-keep">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}
