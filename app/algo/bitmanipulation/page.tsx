"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { bitManipulationContestCluster } from "@/data/practice/algo-bitmanipulation-contest"
import { BitManipulationLesson } from "@/components/algo/bitmanipulation-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="bitmanipulation"
      titleKo="비트 조작"
      titleEn="Bit Manipulation"
      emoji="⚙️"
      cluster={bitManipulationContestCluster}
      lesson={<BitManipulationLesson />}
    />
  )
}
