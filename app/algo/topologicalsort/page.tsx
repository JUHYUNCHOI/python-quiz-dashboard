"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { topologicalSortContestCluster } from "@/data/practice/algo-topologicalsort-contest"
import { TopologicalSortLesson } from "@/components/algo/topologicalsort-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="topologicalsort"
      titleKo="위상 정렬"
      titleEn="Topological Sort"
      emoji="📐"
      cluster={topologicalSortContestCluster}
      lesson={<TopologicalSortLesson />}
    />
  )
}
