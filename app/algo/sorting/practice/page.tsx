"use client"

/** /algo/sorting/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { SortingLesson } from "@/components/algo/sorting-lesson"
import { sortingContestCluster } from "@/data/practice/algo-sorting-contest"

export default function SortingPracticePage() {
  return (
    <TopicPracticePage
      topicId="sorting"
      cluster={sortingContestCluster}
      lesson={<SortingLesson />}
    />
  )
}
