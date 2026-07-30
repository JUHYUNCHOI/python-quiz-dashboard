"use client"

/** /algo/stackqueue/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { StackQueueLesson } from "@/components/algo/stackqueue-lesson"
import { stackQueueContestCluster } from "@/data/practice/algo-stackqueue-contest"

export default function StackqueuePracticePage() {
  return (
    <TopicPracticePage
      topicId="stackqueue"
      cluster={stackQueueContestCluster}
      lesson={<StackQueueLesson />}
    />
  )
}
