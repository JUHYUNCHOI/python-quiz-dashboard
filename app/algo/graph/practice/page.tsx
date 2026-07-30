"use client"

/** /algo/graph/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { GraphLesson } from "@/components/algo/graph-lesson"
import { graphContestCluster } from "@/data/practice/algo-graph-contest"

export default function GraphPracticePage() {
  return (
    <TopicPracticePage
      topicId="graph"
      cluster={graphContestCluster}
      lesson={<GraphLesson />}
    />
  )
}
