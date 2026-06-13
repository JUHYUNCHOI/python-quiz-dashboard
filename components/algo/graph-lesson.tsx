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

/** 그래프(BFS/DFS) 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function GraphLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 그래프가 뭐야?", "1. What is a graph?")}</H>
        <p>{t("점(정점)들이 선(간선)으로 이어진 그림이에요. 지하철 노선, 친구 관계처럼 '무엇이 무엇과 연결됐나'를 나타내요.", "Dots (vertices) joined by lines (edges). It captures 'what connects to what' — subway maps, friendships, and more.")}</p>
        <p className="text-gray-500 mt-1">{t("보통 인접 리스트로 저장해요 — 각 정점마다 '이웃 목록'을 들고 있어요.", "We usually store it as an adjacency list — each vertex keeps a list of its neighbors.")}</p>
        <Code code={`vector<int> adj[N];      // 정점마다 이웃 목록
adj[0].push_back(1);     // 0 — 1 연결
adj[1].push_back(0);     // (무방향이면 양쪽 다)`} />
      </section>

      <section>
        <H>{t("2. BFS — 가까운 것부터, 큐로", "2. BFS — nearest first, with a queue")}</H>
        <p>{t("시작점에서 한 칸씩 퍼져 나가요. 큐(Queue)에 넣고 빼면서 탐색해요. 가중치 없는 그래프에서 '최단 거리'를 구할 때 써요.", "Spread outward one step at a time using a queue. It finds the shortest distance in an unweighted graph.")}</p>
        <Code code={`queue<int> q;
q.push(start); visited[start] = true;
while (!q.empty()) {
    int cur = q.front(); q.pop();
    for (int nx : adj[cur])
        if (!visited[nx]) { visited[nx] = true; q.push(nx); }
}`} />
      </section>

      <section>
        <H>{t("3. DFS — 한 길로 끝까지, 재귀로", "3. DFS — deep first, with recursion")}</H>
        <p>{t("한 방향으로 갈 수 있는 데까지 들어갔다가 막히면 되돌아와요. 재귀(또는 스택)로 구현해요. 연결 요소 세기, 경로 찾기에 좋아요.", "Go as deep as possible, then back up when stuck. Use recursion (or a stack). Great for counting components or finding paths.")}</p>
        <Code code={`void dfs(int cur) {
    visited[cur] = true;
    for (int nx : adj[cur])
        if (!visited[nx]) dfs(nx);
}`} />
        <p className="text-gray-500">{t("파이썬도 거의 같아요:", "Python looks almost the same:")}</p>
        <Code lang="python" code={`def dfs(cur):
    visited[cur] = True
    for nx in adj[cur]:
        if not visited[nx]:
            dfs(nx)`} />
      </section>

      <section>
        <H>{t("4. 언제 뭘 써?", "4. Which one when?")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("최단 거리(칸 수) → BFS — 가까운 것부터 퍼지니까", "Shortest distance (in steps) → BFS — it spreads nearest-first")}</li>
          <li>{t("모든 경우/경로 탐색, 연결 요소 세기 → DFS", "Explore all paths, count connected components → DFS")}</li>
          <li>{t("둘 다 visited 배열로 같은 곳 두 번 방문 막기 — 안 하면 무한 반복!", "Both use a visited array to avoid revisiting — skip it and you loop forever!")}</li>
        </ul>
      </section>

      <Link href="/algo/graph/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
