"use client"

/** /algo/hashtable/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { HashTableLesson } from "@/components/algo/hashtable-lesson"
import { hashTableContestCluster } from "@/data/practice/algo-hashtable-contest"

export default function HashtablePracticePage() {
  return (
    <TopicPracticePage
      topicId="hashtable"
      cluster={hashTableContestCluster}
      lesson={<HashTableLesson />}
    />
  )
}
