"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { shortestPathContestCluster } from "@/data/practice/algo-shortestpath-contest"
import { ShortestPathLesson } from "@/components/algo/shortestpath-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="shortestpath"
      titleKo="최단 경로"
      titleEn="Shortest Path"
      emoji="🗺️"
      cluster={shortestPathContestCluster}
      lesson={<ShortestPathLesson />}
    />
  )
}
