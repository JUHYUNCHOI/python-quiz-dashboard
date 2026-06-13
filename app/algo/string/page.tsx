"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { stringContestCluster } from "@/data/practice/algo-string-contest"
import { StringLesson } from "@/components/algo/string-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="string"
      titleKo="문자열"
      titleEn="String"
      emoji="🔤"
      cluster={stringContestCluster}
      lesson={<StringLesson />}
    />
  )
}
