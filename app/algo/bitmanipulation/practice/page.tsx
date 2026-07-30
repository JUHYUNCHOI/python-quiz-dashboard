"use client"

/** /algo/bitmanipulation/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { BitManipulationLesson } from "@/components/algo/bitmanipulation-lesson"
import { bitManipulationContestCluster } from "@/data/practice/algo-bitmanipulation-contest"

export default function BitmanipulationPracticePage() {
  return (
    <TopicPracticePage
      topicId="bitmanipulation"
      cluster={bitManipulationContestCluster}
      lesson={<BitManipulationLesson />}
    />
  )
}
