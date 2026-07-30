"use client"

/** /algo/recursion/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { RecursionLesson } from "@/components/algo/recursion-lesson"
import { recursionContestCluster } from "@/data/practice/algo-recursion-contest"

export default function RecursionPracticePage() {
  return (
    <TopicPracticePage
      topicId="recursion"
      cluster={recursionContestCluster}
      lesson={<RecursionLesson />}
    />
  )
}
