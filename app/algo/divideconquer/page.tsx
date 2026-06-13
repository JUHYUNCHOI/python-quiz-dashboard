"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { divideConquerContestCluster } from "@/data/practice/algo-divideconquer-contest"
import { DivideConquerLesson } from "@/components/algo/divideconquer-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="divideconquer"
      titleKo="분할 정복"
      titleEn="Divide & Conquer"
      emoji="✂️"
      cluster={divideConquerContestCluster}
      lesson={<DivideConquerLesson />}
    />
  )
}
