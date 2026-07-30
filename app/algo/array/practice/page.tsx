"use client"

/** /algo/array/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { ArrayLesson } from "@/components/algo/array-lesson"
import { arrayContestCluster } from "@/data/practice/algo-array-contest"

export default function ArrayPracticePage() {
  return (
    <TopicPracticePage
      topicId="array"
      cluster={arrayContestCluster}
      lesson={<ArrayLesson />}
    />
  )
}
