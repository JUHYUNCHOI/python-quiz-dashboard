"use client"

/** /algo/string/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { StringLesson } from "@/components/algo/string-lesson"
import { stringContestCluster } from "@/data/practice/algo-string-contest"

export default function StringPracticePage() {
  return (
    <TopicPracticePage
      topicId="string"
      cluster={stringContestCluster}
      lesson={<StringLesson />}
    />
  )
}
