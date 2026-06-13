"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { prefixSumContestCluster } from "@/data/practice/algo-prefixsum-contest"
import { PrefixSumLesson } from "@/components/algo/prefixsum-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="prefixsum"
      titleKo="누적합"
      titleEn="Prefix Sum"
      emoji="➕"
      cluster={prefixSumContestCluster}
      lesson={<PrefixSumLesson />}
    />
  )
}
