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

/** 트리 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function TreeLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 트리가 뭐야?", "1. What is a tree?")}</H>
        <p>{t("가지처럼 갈라지는 계층 구조예요. 맨 위에 뿌리(root) 하나, 그 밑으로 자식이 매달려요.", "A branching hierarchy: one root at the top, children hanging below.")}</p>
        <p>{t("사이클(빙 도는 길)이 없고, 노드 N개면 간선은 항상 N-1개예요.", "No cycles, and with N nodes there are always N-1 edges.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">{t("부모 → 자식 → 손주 … (가계도/폴더 구조)", "parent → child → grandchild … (family tree / folders)")}</p>
      </section>

      <section>
        <H>{t("2. 어떻게 저장해?", "2. How to store it?")}</H>
        <p>{t("각 노드마다 '내 자식들' 목록을 들고 있으면 돼요 (인접 리스트).", "Each node just keeps a list of its children (adjacency list).")}</p>
        <Code code={`vector<int> child[100005];   // child[u] = u의 자식들
child[1].push_back(2);       // 1의 자식으로 2
child[1].push_back(3);       // 1의 자식으로 3`} />
        <Code lang="python" code={`child = [[] for _ in range(n + 1)]
child[1].append(2)   # 1의 자식으로 2
child[1].append(3)   # 1의 자식으로 3`} />
      </section>

      <section>
        <H>{t("3. 순회 — 모든 노드 한 번씩 (DFS)", "3. Traversal — visit every node (DFS)")}</H>
        <p>{t("재귀로 '나 → 자식 → 자식의 자식' 깊이 먼저 내려가요. 방문 시점에 따라 전위/중위/후위.", "Recursion goes deep first: me → child → child's child. The visit point gives pre/in/post-order.")}</p>
        <ul className="list-disc pl-5 space-y-1 my-1.5">
          <li>{t("전위(pre): 나 먼저, 그다음 자식", "pre-order: me first, then children")}</li>
          <li>{t("중위(in): 왼쪽 → 나 → 오른쪽 (이진트리)", "in-order: left → me → right (binary tree)")}</li>
          <li>{t("후위(post): 자식 먼저, 나는 마지막 (서브트리 합 계산에 유용)", "post-order: children first, me last (great for subtree sums)")}</li>
        </ul>
        <Code code={`void dfs(int u, int parent) {
    // 전위: 여기서 u 처리
    for (int v : child[u]) {
        if (v == parent) continue;   // 부모로 되돌아가지 않기
        dfs(v, u);
    }
    // 후위: 여기서 u 처리
}`} />
      </section>

      <section>
        <H>{t("4. 트리로 풀리는 것", "4. What trees unlock")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("서브트리 크기·합 — 후위 순회로 자식 값을 모아 올림", "Subtree size/sum — post-order rolls children's values up")}</li>
          <li>{t("두 노드 사이 거리·깊이 — 한 번의 DFS로 계산", "Depth & distance between nodes — one DFS")}</li>
          <li>{t("트리 DP — 부모는 자식들의 답을 합쳐서 자기 답을 만듦", "Tree DP — a parent combines its children's answers")}</li>
        </ul>
      </section>

      <Link href="/algo/tree/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
