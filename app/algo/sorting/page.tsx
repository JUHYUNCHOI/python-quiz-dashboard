"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { sortingContestCluster } from "@/data/practice/algo-sorting-contest"
import { SortingLesson } from "@/components/algo/sorting-lesson"

export default function SortingTopicPage() {
  return (
    <TopicProblemsPage
      topicId="sorting"
      titleKo="정렬"
      titleEn="Sorting"
      emoji="🔢"
      cluster={sortingContestCluster}
      lesson={<SortingLesson />}
    />
  )
}
