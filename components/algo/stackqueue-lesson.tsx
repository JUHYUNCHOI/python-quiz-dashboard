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

/** 스택/큐 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function StackQueueLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 스택 = 마지막에 넣은 게 먼저 (LIFO)", "1. Stack = Last In, First Out (LIFO)")}</H>
        <p>{t("접시를 쌓듯, 맨 위에만 넣고 뺄 수 있어요. 마지막에 넣은 게 가장 먼저 나와요.", "Like a stack of plates — you add and remove only from the top. The last one in comes out first.")}</p>
        <Code code={`stack<int> st;
st.push(1); st.push(2); st.push(3);  // 바닥 1 2 3 위
st.top();   // 3  (맨 위)
st.pop();   // 3 제거 → 1 2 남음
st.empty(); // 비었는지`} />
      </section>

      <section>
        <H>{t("2. 큐 = 먼저 넣은 게 먼저 (FIFO)", "2. Queue = First In, First Out (FIFO)")}</H>
        <p>{t("줄 서기와 같아요. 먼저 온 사람이 먼저 나가요.", "Like a line — whoever arrives first leaves first.")}</p>
        <Code code={`queue<int> q;
q.push(1); q.push(2); q.push(3);  // 앞 1 2 3 뒤
q.front(); // 1  (맨 앞)
q.pop();   // 1 제거 → 2 3 남음`} />
        <p className="text-gray-500">{t("파이썬은 리스트를 스택으로, collections.deque 를 큐로 써요:", "In Python, a list works as a stack, and collections.deque as a queue:")}</p>
        <Code lang="python" code={`st = []
st.append(3); st.pop()          # 스택 (LIFO)

from collections import deque
q = deque()
q.append(1); q.popleft()        # 큐 (FIFO)`} />
      </section>

      <section>
        <H>{t("3. 스택이 빛나는 곳 — 괄호 검사", "3. Where stacks shine — bracket matching")}</H>
        <p>{t("여는 괄호는 push, 닫는 괄호가 오면 top 과 짝이 맞는지 확인하며 pop. 끝에 비어 있으면 올바른 괄호예요.", "Push opening brackets; on a closing bracket, check the top matches and pop. If empty at the end, the brackets are balanced.")}</p>
        <Code code={`for (char c : s) {
    if (c == '(') st.push(c);
    else {
        if (st.empty()) { ok = false; break; }
        st.pop();                  // 짝 맞춰 제거
    }
}
// 끝까지 보고 st.empty() 면 정상`} />
      </section>

      <section>
        <H>{t("4. 큐가 빛나는 곳 — BFS(너비 우선 탐색)", "4. Where queues shine — BFS")}</H>
        <p>{t("가까운 곳부터 차례로 퍼져 나갈 때 큐를 써요. 방문할 곳을 큐에 넣고, 앞에서 하나씩 꺼내며 이웃을 다시 넣어요.", "Use a queue to spread out level by level. Enqueue places to visit, pop from the front, and enqueue their neighbors.")}</p>
        <Code code={`q.push(start);
while (!q.empty()) {
    int cur = q.front(); q.pop();
    for (int nx : neighbors(cur))
        if (!visited[nx]) { visited[nx] = true; q.push(nx); }
}`} />
        <p className="text-gray-500 mt-1">{t("최단 거리(가중치 없는 그래프) 찾기의 기본이에요.", "It's the basis for shortest paths in unweighted graphs.")}</p>
      </section>

      <Link href="/algo/stackqueue/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
