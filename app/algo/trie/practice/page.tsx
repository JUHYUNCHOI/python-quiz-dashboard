"use client"

/** /algo/trie/practice — 공용 컴포넌트 래퍼 (화면 본문은 TopicPracticePage) */

import { TopicPracticePage } from "@/components/algo/topic-practice-page"
import { TrieLesson } from "@/components/algo/trie-lesson"
import { trieContestCluster } from "@/data/practice/algo-trie-contest"

export default function TriePracticePage() {
  return (
    <TopicPracticePage
      topicId="trie"
      cluster={trieContestCluster}
      lesson={<TrieLesson />}
    />
  )
}
