"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { highlightCode } from "@/components/practice/practice-runner"

function Code({ code, lang = "cpp" }: { code: string; lang?: "cpp" | "python" }) {
  return (
    <pre
      className="rounded-lg bg-gray-900 px-3 py-2.5 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap my-2"
      dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
    />
  )
}

/** 우선순위 큐 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function PriorityQueueLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 우선순위 큐가 뭐야?", "1. What is a priority queue?")}</H>
        <p>{t("들어온 순서가 아니라 '가장 급한 것'이 먼저 나오는 줄이에요 — 응급실처럼요.", "A queue where the most urgent item comes out first — like an ER, not first-come-first-served.")}</p>
        <p>{t("꺼낼 때마다 최대값(또는 최소값) 하나가 O(log N)에 튀어나와요.", "Each pop hands you the max (or min) in O(log N).")}</p>
      </section>

      <section>
        <H>{t("2. 한 줄이면 끝 — heap", "2. One tool — the heap")}</H>
        <p>{t("직접 구현하지 않아요. C++은 priority_queue, 파이썬은 heapq.", "Don't build it yourself: C++ has priority_queue, Python has heapq.")}</p>
        <Code code={t(`priority_queue<int> pq;          // 기본: 최대 힙 (가장 큰 게 top)
pq.push(5); pq.push(1); pq.push(3);
pq.top();  // 5   →  pq.pop();
// 최소 힙: priority_queue<int, vector<int>, greater<int>>`, `priority_queue<int> pq;          // default: max-heap (top is largest)
pq.push(5); pq.push(1); pq.push(3);
pq.top();  // 5   →  pq.pop();
// min-heap: priority_queue<int, vector<int>, greater<int>>`)} />
        <p className="text-gray-500">{t("파이썬 heapq는 항상 최소 힙이에요:", "Python's heapq is always a min-heap:")}</p>
        <Code lang="python" code={t(`import heapq
pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 1)
heapq.heappop(pq)   # 1 (가장 작은 것)
# 최대 힙이 필요하면 -값을 넣어요`, `import heapq
pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 1)
heapq.heappop(pq)   # 1 (the smallest)
# for a max-heap, push negative values`)} />
      </section>

      <section>
        <H>{t("3. 대표 패턴 — K번째 / 상위 K개", "3. Core pattern — K-th / top-K")}</H>
        <p>{t("크기를 K로 유지하는 힙 하나면 '상위 K개'를 통째로 정렬하지 않고 뽑아요.", "Keep a heap of size K to grab the top-K without sorting everything.")}</p>
        <Code code={t(`// 가장 큰 K개 → 크기 K짜리 '최소 힙'을 유지
priority_queue<int, vector<int>, greater<int>> pq;
for (int x : a) {
    pq.push(x);
    if (pq.size() > K) pq.pop();   // 가장 작은 것 버림
}
// pq.top() = K번째로 큰 수`, `// top K largest → keep a min-heap of size K
priority_queue<int, vector<int>, greater<int>> pq;
for (int x : a) {
    pq.push(x);
    if (pq.size() > K) pq.pop();   // drop the smallest
}
// pq.top() = the K-th largest`)} />
      </section>

      <section>
        <H>{t("4. 힙이 핵심인 곳", "4. Where heaps shine")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("다익스트라 — '가장 가까운 미방문 노드'를 매번 꺼냄", "Dijkstra — repeatedly pop the closest unvisited node")}</li>
          <li>{t("스케줄링 — 매번 '제일 급한 일'을 처리", "Scheduling — always handle the most urgent task")}</li>
          <li>{t("스트림에서 K번째 값 — 데이터가 흘러도 힙만 유지", "K-th value in a stream — just maintain the heap")}</li>
        </ul>
      </section>

      <Link href="/algo/priorityqueue/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
