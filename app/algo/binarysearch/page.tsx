"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { binarySearchContestCluster } from "@/data/practice/algo-binarysearch-contest"
import { BinarySearchLesson } from "@/components/algo/binarysearch-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="binarysearch"
      titleKo="이분탐색"
      titleEn="Binary Search"
      emoji="🎯"
      cluster={binarySearchContestCluster}
      lesson={<BinarySearchLesson />}
    />
  )
}
