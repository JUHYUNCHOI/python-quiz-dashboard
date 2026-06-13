"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { stackQueueContestCluster } from "@/data/practice/algo-stackqueue-contest"
import { StackQueueLesson } from "@/components/algo/stackqueue-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="stackqueue"
      titleKo="스택/큐"
      titleEn="Stack & Queue"
      emoji="📚"
      cluster={stackQueueContestCluster}
      lesson={<StackQueueLesson />}
    />
  )
}
