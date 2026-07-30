"use client"

/** /algo/backtracking/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { BacktrackingLesson } from "@/components/algo/backtracking-lesson"
import { backtrackingContestCluster } from "@/data/practice/algo-backtracking-contest"

export default function BacktrackingPracticePage() {
  return (
    <TopicPracticePage
      topicId="backtracking"
      cluster={backtrackingContestCluster}
      lesson={<BacktrackingLesson />}
    />
  )
}
