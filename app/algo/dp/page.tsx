"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { dpContestCluster } from "@/data/practice/algo-dp-contest"
import { DpLesson } from "@/components/algo/dp-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="dp"
      titleKo="동적 프로그래밍"
      titleEn="Dynamic Programming"
      emoji="🧩"
      cluster={dpContestCluster}
      lesson={<DpLesson />}
    />
  )
}
