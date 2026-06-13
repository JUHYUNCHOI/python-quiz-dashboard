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

/** 최단 경로 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function ShortestPathLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 최단 경로가 뭐야?", "1. What is shortest path?")}</H>
        <p>{t("지도에서 출발점부터 목적지까지, 가중치(거리·시간) 합이 가장 작은 길을 찾는 거예요.", "On a weighted graph, find the route from start to end whose total weight (distance/time) is smallest.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">{t("정점=장소, 간선=길, 가중치=거리", "vertex=place, edge=road, weight=distance")}</p>
      </section>

      <section>
        <H>{t("2. 가중치가 모두 1이면 — BFS", "2. All weights = 1 → BFS")}</H>
        <p>{t("간선마다 거리가 똑같이 1이면, 그냥 너비 우선 탐색(BFS)으로 칸 수를 세면 최단이에요.", "If every edge costs 1, plain BFS counting steps already gives the shortest path.")}</p>
        <Code lang="python" code={`from collections import deque
def bfs(start, g):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in g[u]:            # 이웃들
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist`} />
      </section>

      <section>
        <H>{t("3. 가중치가 제각각이면 — 다익스트라", "3. Varied weights → Dijkstra")}</H>
        <p>{t("거리가 다르면 BFS는 틀려요. '지금 가장 가까운 정점'을 우선순위 큐로 꺼내 확정하는 다익스트라를 써요. (가중치는 0 이상.)", "With different weights BFS fails. Use Dijkstra: pull the closest vertex from a priority queue and finalize it. (Weights ≥ 0.)")}</p>
        <Code code={`priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
dist[src] = 0; pq.push({0, src});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d != dist[u]) continue;          // 낡은 항목 skip
    for (auto [v, w] : g[u])
        if (d + w < dist[v]) {
            dist[v] = d + w;
            pq.push({dist[v], v});        // 이웃 갱신(relax)
        }
}`} />
      </section>

      <section>
        <H>{t("4. 언제 무엇을?", "4. Which one when?")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("모든 간선 가중치 = 1 → BFS (가장 빠르고 간단)", "All edge weights = 1 → BFS (fastest, simplest)")}</li>
          <li>{t("가중치 양수 → 다익스트라 (우선순위 큐)", "Non-negative weights → Dijkstra (priority queue)")}</li>
          <li>{t("음수 간선 있음 → 벨만-포드 (음수 사이클도 검출)", "Negative edges → Bellman-Ford (detects negative cycles)")}</li>
        </ul>
      </section>

      <Link href="/algo/shortestpath/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
