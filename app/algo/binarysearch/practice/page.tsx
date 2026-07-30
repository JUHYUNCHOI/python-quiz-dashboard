"use client"

/** /algo/binarysearch/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { BinarySearchLesson } from "@/components/algo/binarysearch-lesson"
import { binarySearchContestCluster } from "@/data/practice/algo-binarysearch-contest"

export default function BinarysearchPracticePage() {
  return (
    <TopicPracticePage
      topicId="binarysearch"
      cluster={binarySearchContestCluster}
      lesson={<BinarySearchLesson />}
    />
  )
}
