"use client"

/** /algo/dp/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { DpLesson } from "@/components/algo/dp-lesson"
import { dpContestCluster } from "@/data/practice/algo-dp-contest"

export default function DpPracticePage() {
  return (
    <TopicPracticePage
      topicId="dp"
      cluster={dpContestCluster}
      lesson={<DpLesson />}
    />
  )
}
