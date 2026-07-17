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

/** 비트 조작 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function BitManipulationLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 비트 조작이 뭐야?", "1. What is bit manipulation?")}</H>
        <p>{t("숫자를 2진수(0과 1) 자리로 보고, 자리 하나하나를 직접 켜고 끄는 거예요. 아주 빠르고 메모리도 작아요.", "Treat a number as its binary digits (0s and 1s) and flip individual bits directly. Very fast, tiny memory.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">13 = 1101₂ → {t("1번 자리 켜짐, 2번 자리 꺼짐", "bit 0 on, bit 1 off")}</p>
      </section>

      <section>
        <H>{t("2. 6가지 연산자", "2. Six operators")}</H>
        <p>{t("AND(&)·OR(|)·XOR(^)·NOT(~)·왼쪽 시프트(<<)·오른쪽 시프트(>>).", "AND(&), OR(|), XOR(^), NOT(~), left shift(<<), right shift(>>).")}</p>
        <Code code={t(`6 & 3   // 110 & 011 = 010 = 2   (둘 다 1인 자리만)
6 | 3   // 110 | 011 = 111 = 7   (하나라도 1)
6 ^ 3   // 110 ^ 011 = 101 = 5   (서로 다르면 1)
1 << 4  // 1 을 왼쪽으로 4칸 = 16 (= 2^4)
20 >> 2 // 20 을 오른쪽으로 2칸 = 5`, `6 & 3   // 110 & 011 = 010 = 2   (only bits that are 1 in both)
6 | 3   // 110 | 011 = 111 = 7   (1 if either is 1)
6 ^ 3   // 110 ^ 011 = 101 = 5   (1 if they differ)
1 << 4  // shift 1 left by 4 = 16 (= 2^4)
20 >> 2 // shift 20 right by 2 = 5`)} />
      </section>

      <section>
        <H>{t("3. 자주 쓰는 한 줄 기술", "3. Handy one-liners")}</H>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("홀짝 판별:", "Even/odd:")} <code className="bg-gray-100 px-1 rounded font-mono">n & 1</code> {t("→ 1이면 홀수", "→ 1 means odd")}</li>
          <li>{t("i번째 비트 켜기:", "Set bit i:")} <code className="bg-gray-100 px-1 rounded font-mono">n | (1 &lt;&lt; i)</code></li>
          <li>{t("i번째 비트 확인:", "Check bit i:")} <code className="bg-gray-100 px-1 rounded font-mono">(n &gt;&gt; i) &amp; 1</code></li>
          <li>{t("2의 거듭제곱?", "Power of 2?")} <code className="bg-gray-100 px-1 rounded font-mono">n &amp; (n - 1) == 0</code></li>
        </ul>
      </section>

      <section>
        <H>{t("4. 비트마스크 — 집합을 정수 하나로", "4. Bitmask — a set in one integer")}</H>
        <p>{t("원소 N개의 '있다/없다'를 비트 N개로 표현해요. 부분집합 전체를 정수 0~2ᴺ-1 반복으로 훑을 수 있어요.", "Represent 'present/absent' of N items with N bits. You can loop over every subset as integers 0..2ᴺ-1.")}</p>
        <Code lang="python" code={t(`for mask in range(1 << n):       # 모든 부분집합
    for i in range(n):
        if mask & (1 << i):       # i 번째 원소가 포함됐나?
            ...                   # 선택된 원소 처리`, `for mask in range(1 << n):       # every subset
    for i in range(n):
        if mask & (1 << i):       # is element i included?
            ...                   # handle selected element`)} />
      </section>

      <Link href="/algo/bitmanipulation/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
