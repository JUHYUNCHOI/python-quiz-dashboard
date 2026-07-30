"use client"

/** /algo/divideconquer/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { DivideConquerLesson } from "@/components/algo/divideconquer-lesson"
import { divideConquerContestCluster } from "@/data/practice/algo-divideconquer-contest"

export default function DivideconquerPracticePage() {
  return (
    <TopicPracticePage
      topicId="divideconquer"
      cluster={divideConquerContestCluster}
      lesson={<DivideConquerLesson />}
    />
  )
}
