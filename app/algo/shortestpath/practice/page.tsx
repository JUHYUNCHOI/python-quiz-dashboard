"use client"

/** /algo/shortestpath/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { ShortestPathLesson } from "@/components/algo/shortestpath-lesson"
import { shortestPathContestCluster } from "@/data/practice/algo-shortestpath-contest"

export default function ShortestpathPracticePage() {
  return (
    <TopicPracticePage
      topicId="shortestpath"
      cluster={shortestPathContestCluster}
      lesson={<ShortestPathLesson />}
    />
  )
}
