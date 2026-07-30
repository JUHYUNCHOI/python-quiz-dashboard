"use client"

/** /algo/topologicalsort/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { TopologicalSortLesson } from "@/components/algo/topologicalsort-lesson"
import { topologicalSortContestCluster } from "@/data/practice/algo-topologicalsort-contest"

export default function TopologicalsortPracticePage() {
  return (
    <TopicPracticePage
      topicId="topologicalsort"
      cluster={topologicalSortContestCluster}
      lesson={<TopologicalSortLesson />}
    />
  )
}
