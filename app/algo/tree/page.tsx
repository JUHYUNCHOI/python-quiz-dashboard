"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { treeContestCluster } from "@/data/practice/algo-tree-contest"
import { TreeLesson } from "@/components/algo/tree-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="tree"
      titleKo="트리"
      titleEn="Tree"
      emoji="🌳"
      cluster={treeContestCluster}
      lesson={<TreeLesson />}
    />
  )
}
