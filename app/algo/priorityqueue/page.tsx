"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { priorityQueueContestCluster } from "@/data/practice/algo-priorityqueue-contest"
import { PriorityQueueLesson } from "@/components/algo/priorityqueue-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="priorityqueue"
      titleKo="우선순위 큐"
      titleEn="Priority Queue"
      emoji="⚡"
      cluster={priorityQueueContestCluster}
      lesson={<PriorityQueueLesson />}
    />
  )
}
