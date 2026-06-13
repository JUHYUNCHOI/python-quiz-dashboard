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

/** 유니온 파인드 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function UnionFindLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 유니온 파인드가 뭐야?", "1. What is Union-Find?")}</H>
        <p>{t("'누구와 누구가 같은 그룹인가'를 빠르게 묻고 합치는 도구예요. 각 원소가 자기 그룹의 '대표(부모)'를 가리켜요.", "A tool to quickly ask 'are these two in the same group?' and to merge groups. Each element points to its group's representative (parent).")}</p>
        <Code code={`int parent[N];
for (int i = 0; i < N; i++) parent[i] = i;  // 처음엔 각자 혼자`} />
      </section>

      <section>
        <H>{t("2. find — 내 그룹의 대표 찾기", "2. find — who's my representative?")}</H>
        <p>{t("부모를 계속 따라 올라가 맨 위 대표를 찾아요. 두 원소의 대표가 같으면 같은 그룹이에요.", "Follow parents up to the top representative. Two elements are in the same group if their representatives match.")}</p>
        <Code code={`int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);  // 경로 압축
}`} />
        <p className="text-gray-500">{t("'경로 압축' — 찾으면서 부모를 대표로 바로 바꿔둬요. 다음 find 가 훨씬 빨라져요.", "'Path compression' — point straight to the representative while searching, so the next find is much faster.")}</p>
      </section>

      <section>
        <H>{t("3. union — 두 그룹 합치기", "3. union — merge two groups")}</H>
        <p>{t("두 원소의 대표를 찾아, 한쪽 대표를 다른 쪽 밑에 붙여요.", "Find both representatives, then attach one under the other.")}</p>
        <Code code={`void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a != b) parent[a] = b;
}`} />
        <p className="text-gray-500">{t("파이썬도 같은 구조예요:", "Python has the same structure:")}</p>
        <Code lang="python" code={`def find(x):
    if parent[x] == x: return x
    parent[x] = find(parent[x])
    return parent[x]`} />
      </section>

      <section>
        <H>{t("4. 어디에 써?", "4. When to use it?")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("연결성 — 'A 와 B 가 이어져 있나?' 를 거의 즉시 판단", "Connectivity — 'are A and B connected?' answered almost instantly")}</li>
          <li>{t("사이클 찾기 — 합치려는 두 원소가 이미 같은 그룹이면 사이클", "Cycle detection — if the two to merge are already in one group, that's a cycle")}</li>
          <li>{t("그룹 개수 세기, 네트워크 연결, 친구 관계 묶기", "Counting groups, network connectivity, clustering friendships")}</li>
        </ul>
      </section>

      <Link href="/algo/unionfind/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
