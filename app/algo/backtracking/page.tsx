"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { backtrackingContestCluster } from "@/data/practice/algo-backtracking-contest"
import { BacktrackingLesson } from "@/components/algo/backtracking-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="backtracking"
      titleKo="백트래킹"
      titleEn="Backtracking"
      emoji="↩️"
      cluster={backtrackingContestCluster}
      lesson={<BacktrackingLesson />}
    />
  )
}
