"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { unionFindContestCluster } from "@/data/practice/algo-unionfind-contest"
import { UnionFindLesson } from "@/components/algo/unionfind-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="unionfind"
      titleKo="유니온 파인드"
      titleEn="Union Find"
      emoji="🔵"
      cluster={unionFindContestCluster}
      lesson={<UnionFindLesson />}
    />
  )
}
