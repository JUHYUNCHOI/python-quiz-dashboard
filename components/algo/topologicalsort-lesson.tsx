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

/** 위상 정렬 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function TopologicalSortLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 위상 정렬이 뭐야?", "1. What is topological sort?")}</H>
        <p>{t("'A를 먼저 해야 B를 할 수 있다'는 선행 조건들을 모순 없는 순서 한 줄로 푸는 거예요.", "It lines up tasks so every 'A before B' rule is satisfied.")}</p>
        <p>{t("수업 선수 과목, 빌드 의존성, 요리 순서 같은 거요.", "Think course prerequisites, build dependencies, a recipe's steps.")}</p>
        <p className="text-gray-500 mt-1 text-xs">{t("화살표가 한 방향이고 사이클이 없는 그래프(DAG)에서만 가능.", "Only works on a DAG — directed, no cycles.")}</p>
      </section>

      <section>
        <H>{t("2. 진입차수 + 큐 (Kahn's)", "2. In-degree + queue (Kahn's)")}</H>
        <p>{t("진입차수 = '나보다 먼저 해야 할 일의 개수'. 0이면 지금 당장 할 수 있어요.", "In-degree = how many things must come before me. Zero means do-it-now.")}</p>
        <p>{t("진입차수 0인 것을 큐에 넣고, 꺼내면서 그 뒤 일들의 차수를 1씩 깎아요.", "Push all in-degree-0 nodes; as you pop one, decrement its successors' in-degree.")}</p>
        <Code code={`queue<int> q;
for (int u = 1; u <= n; u++)
    if (indeg[u] == 0) q.push(u);
while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u])
        if (--indeg[v] == 0) q.push(v);   // 차수 0 되면 가능
}`} />
      </section>

      <section>
        <H>{t("3. DFS 후위 역순 (다른 방법)", "3. DFS post-order, reversed (alternative)")}</H>
        <p>{t("DFS로 끝까지 내려갔다가, 돌아 나오는 순서(후위)를 기록하고 뒤집으면 위상 순서예요.", "Run DFS, record nodes as you finish them (post-order), then reverse — that's a valid order.")}</p>
        <Code lang="python" code={`def dfs(u):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(v)
    order.append(u)   # 끝낸 순서로 쌓기
# 모든 노드 dfs 후 order 를 뒤집으면 위상 정렬`} />
      </section>

      <section>
        <H>{t("4. 보너스 — 사이클 검출", "4. Bonus — cycle detection")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("순서에 담긴 노드 수 < 전체 노드 수 → 사이클이 있다는 신호", "If the order holds fewer than N nodes → there's a cycle")}</li>
          <li>{t("사이클이 있으면 '먼저/나중'을 정할 수 없음 → 위상 정렬 불가", "A cycle makes ordering impossible — no valid topo sort")}</li>
          <li>{t("그래서 '순환 의존성 있나?' 판별에도 그대로 써요", "So the same code answers 'is there a circular dependency?'")}</li>
        </ul>
      </section>

      <Link href="/algo/topologicalsort/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
