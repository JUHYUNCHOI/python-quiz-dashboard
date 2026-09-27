"use client"

import { TopicProblemsPage } from "@/components/algo/topic-problems-page"
import { graphContestCluster } from "@/data/practice/algo-graph-contest"
import { GraphLesson } from "@/components/algo/graph-lesson"

export default function Page() {
  return (
    <TopicProblemsPage
      topicId="graph"
      titleKo="그래프 (BFS/DFS)"
      titleEn="Graph (BFS/DFS)"
      emoji="🕸️"
      cluster={graphContestCluster}
      lesson={<GraphLesson />}
      /* 막히면 1장부터 다시 읽지 말고 **DFS 장으로 바로** — `?ch=N` 딥링크
         (2026-09-27 커밋 `bf0672c0`. 3장 = BFS, 4장 = DFS).
         ⚠️ 인라인 수업 패널이 아니라 **풀 페이지**로 보낸다 — 패널은 요약이고
         걸음을 눌러 보는 시뮬은 풀 페이지에만 있다. */
      contestReviewHref="/algo/graph/learn?ch=3"
      contestReviewLabel={{
        ko: "막히면 — BFS·DFS 다시 보기",
        en: "Stuck? Review BFS / DFS",
      }}
    />
  )
}
