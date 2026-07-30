"use client"

/** /algo/unionfind/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { UnionFindLesson } from "@/components/algo/unionfind-lesson"
import { unionFindContestCluster } from "@/data/practice/algo-unionfind-contest"

export default function UnionfindPracticePage() {
  return (
    <TopicPracticePage
      topicId="unionfind"
      cluster={unionFindContestCluster}
      lesson={<UnionFindLesson />}
    />
  )
}
