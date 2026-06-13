"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { graphContestCluster } from "@/data/practice/algo-graph-contest"
import { GraphLesson } from "@/components/algo/graph-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="graph"
      titleKo="그래프 (BFS/DFS)"
      titleEn="Graph (BFS/DFS)"
      emoji="🕸️"
      cluster={graphContestCluster}
      lesson={<GraphLesson />}
    />
  )
}
