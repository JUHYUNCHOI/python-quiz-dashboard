"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { trieContestCluster } from "@/data/practice/algo-trie-contest"
import { TrieLesson } from "@/components/algo/trie-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="trie"
      titleKo="트라이"
      titleEn="Trie"
      emoji="🌐"
      cluster={trieContestCluster}
      lesson={<TrieLesson />}
    />
  )
}
