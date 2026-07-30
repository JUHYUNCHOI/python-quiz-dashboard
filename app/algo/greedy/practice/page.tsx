"use client"

/** /algo/greedy/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { GreedyLesson } from "@/components/algo/greedy-lesson"
import { greedyContestCluster } from "@/data/practice/algo-greedy-contest"

export default function GreedyPracticePage() {
  return (
    <TopicPracticePage
      topicId="greedy"
      cluster={greedyContestCluster}
      lesson={<GreedyLesson />}
    />
  )
}
