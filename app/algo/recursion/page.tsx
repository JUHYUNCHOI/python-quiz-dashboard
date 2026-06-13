"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { recursionContestCluster } from "@/data/practice/algo-recursion-contest"
import { RecursionLesson } from "@/components/algo/recursion-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="recursion"
      titleKo="재귀"
      titleEn="Recursion"
      emoji="🔄"
      cluster={recursionContestCluster}
      lesson={<RecursionLesson />}
    />
  )
}
