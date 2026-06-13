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

/** 누적합 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function PrefixSumLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 누적합이 뭐야?", "1. What is a prefix sum?")}</H>
        <p>{t("'처음부터 여기까지의 합'을 미리 다 더해서 표로 만들어 두는 거예요. 구간 합을 매번 다시 더하지 않으려고요.", "Pre-add 'sum from the start up to here' into a table — so you never re-add a range.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">a    : [3, 1, 4, 1, 5]{"\n"}prefix: [0, 3, 4, 8, 9, 14]   (prefix[i] = a[0..i-1] {t("합", "sum")})</p>
      </section>

      <section>
        <H>{t("2. 누적합 만들기 — O(n)", "2. Building it — O(n)")}</H>
        <p>{t("prefix[0]=0 으로 시작하고, 한 칸씩 더해 나가요. 인덱스를 1 밀어두면 구간 합 계산이 깔끔해져요.", "Start with prefix[0]=0 and add one at a time. Shifting by 1 makes range queries clean.")}</p>
        <Code code={`vector<long long> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + a[i];`} />
      </section>

      <section>
        <H>{t("3. 구간 합 — 한 번의 뺄셈 (핵심)", "3. Range sum — one subtraction (core)")}</H>
        <p>{t("a[l..r] 의 합은 prefix[r+1] − prefix[l]. 구간 길이가 아무리 길어도 O(1)! 질문이 많을수록 누적합이 이겨요.", "Sum of a[l..r] = prefix[r+1] − prefix[l]. O(1) no matter how long the range. The more queries, the bigger the win.")}</p>
        <Code code={`// a[l..r] 합 (0-based, 양 끝 포함)
long long rangeSum = prefix[r + 1] - prefix[l];`} />
        <p className="text-gray-500">{t("매번 for 로 더하면 질문 q개 × 길이 n = O(qn). 누적합은 만들기 O(n) + 질문당 O(1).", "Re-summing each query is O(qn). Prefix sum is O(n) build + O(1) per query.")}</p>
      </section>

      <section>
        <H>{t("4. 응용 — 2D · 차분 · 부분합=K", "4. Applications")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("2D 누적합 — 격자에서 직사각형 영역 합을 O(1)", "2D prefix sum — rectangle sum in a grid, O(1)")}</li>
          <li>{t("차분(diff) 배열 — 여러 구간에 +값 더하기를 O(1) 표시 후 마지막에 한 번 펼치기", "Difference array — many range-add updates in O(1), unfold once at the end")}</li>
          <li>{t("부분합 = K — 누적합 + 해시로 '합이 K인 연속 구간 개수'를 O(n)", "Subarray sum = K — prefix + hash counts qualifying subarrays in O(n)")}</li>
        </ul>
      </section>

      <Link href="/algo/prefixsum/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
