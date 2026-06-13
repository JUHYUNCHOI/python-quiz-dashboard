"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { hashTableContestCluster } from "@/data/practice/algo-hashtable-contest"
import { HashTableLesson } from "@/components/algo/hashtable-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="hashtable"
      titleKo="해시테이블"
      titleEn="Hash Table"
      emoji="🗂️"
      cluster={hashTableContestCluster}
      lesson={<HashTableLesson />}
    />
  )
}
