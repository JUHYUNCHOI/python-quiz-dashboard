"use client"

/** /algo/tree/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { TreeLesson } from "@/components/algo/tree-lesson"
import { treeContestCluster } from "@/data/practice/algo-tree-contest"

export default function TreePracticePage() {
  return (
    <TopicPracticePage
      topicId="tree"
      cluster={treeContestCluster}
      lesson={<TreeLesson />}
    />
  )
}
