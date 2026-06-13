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

/** 백트래킹 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function BacktrackingLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 백트래킹이 뭐야?", "1. What is backtracking?")}</H>
        <p>{t("가능한 모든 경우를 '하나씩 골라보고, 아니면 되돌아가서' 다른 걸 시도하는 방법이에요. 미로에서 갈림길마다 다 들어가 보고 막히면 돌아 나오는 것과 같아요.", "Try every possibility by 'choosing one, and if it fails, undoing it' to try another. Like a maze: enter each fork, and back out when it dead-ends.")}</p>
      </section>

      <section>
        <H>{t("2. 기본 틀 — 선택·재귀·되돌리기", "2. The template — choose, recurse, undo")}</H>
        <p>{t("한 칸을 정하고 → 다음 칸으로 재귀 → 돌아오면 그 선택을 취소해요. 이 '취소'가 백트래킹의 핵심이에요.", "Fix one slot → recurse to the next → undo the choice when you return. That undo is what makes it backtracking.")}</p>
        <Code code={`void solve(int depth) {
    if (depth == N) { record(); return; }   // 다 채움 → 답 기록
    for (int c : candidates) {
        choose(c);          // 선택
        solve(depth + 1);   // 다음으로
        unchoose(c);        // 되돌리기 ← 핵심
    }
}`} />
      </section>

      <section>
        <H>{t("3. 가지치기 — 안 될 길은 일찍 끊기", "3. Pruning — cut dead branches early")}</H>
        <p>{t("'이 선택은 어차피 안 된다'를 미리 알면 그 가지로 안 들어가요. 모든 경우를 다 보면 너무 느리니, 가지치기가 백트래킹을 실용적으로 만들어요.", "If a choice clearly can't lead to a solution, don't explore it. Pruning is what makes backtracking fast enough to be useful.")}</p>
        <Code lang="python" code={`def solve(depth):
    if not is_valid(depth):   # 가지치기: 안 되면 바로 return
        return
    if depth == N:
        record(); return
    for c in candidates:
        choose(c); solve(depth+1); unchoose(c)`} />
      </section>

      <section>
        <H>{t("4. 대표 문제", "4. Classic problems")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("순열·조합 — N 개 중 골라 줄 세우기 / 뽑기", "Permutations & combinations — arrange or pick from N items")}</li>
          <li>{t("N-Queen — 퀸을 서로 공격 못 하게 놓기 (가지치기 필수)", "N-Queens — place queens so none attack (pruning is essential)")}</li>
          <li>{t("부분집합·미로 탐색·스도쿠 — '모든 경우 + 되돌리기' 구조", "Subsets, maze solving, sudoku — the 'try all + undo' structure")}</li>
        </ul>
      </section>

      <Link href="/algo/backtracking/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
