"use client"

/** /algo/prefixsum/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { PrefixSumLesson } from "@/components/algo/prefixsum-lesson"
import { prefixSumContestCluster } from "@/data/practice/algo-prefixsum-contest"

export default function PrefixsumPracticePage() {
  return (
    <TopicPracticePage
      topicId="prefixsum"
      cluster={prefixSumContestCluster}
      lesson={<PrefixSumLesson />}
    />
  )
}
