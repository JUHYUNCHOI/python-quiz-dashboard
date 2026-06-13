"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { greedyContestCluster } from "@/data/practice/algo-greedy-contest"
import { GreedyLesson } from "@/components/algo/greedy-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="greedy"
      titleKo="그리디"
      titleEn="Greedy"
      emoji="💡"
      cluster={greedyContestCluster}
      lesson={<GreedyLesson />}
    />
  )
}
