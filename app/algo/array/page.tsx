"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { arrayContestCluster } from "@/data/practice/algo-array-contest"
import { ArrayLesson } from "@/components/algo/array-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="array"
      titleKo="배열"
      titleEn="Array"
      emoji="📊"
      cluster={arrayContestCluster}
      lesson={<ArrayLesson />}
    />
  )
}
