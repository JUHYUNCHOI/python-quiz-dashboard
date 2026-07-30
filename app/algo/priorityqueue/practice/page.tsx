"use client"

/** /algo/priorityqueue/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { PriorityQueueLesson } from "@/components/algo/priorityqueue-lesson"
import { priorityQueueContestCluster } from "@/data/practice/algo-priorityqueue-contest"

export default function PriorityqueuePracticePage() {
  return (
    <TopicPracticePage
      topicId="priorityqueue"
      cluster={priorityQueueContestCluster}
      lesson={<PriorityQueueLesson />}
    />
  )
}
