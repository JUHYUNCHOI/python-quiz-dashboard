"use client"

import { ForLoopVisualizer } from "./for-loop-visualizer"

export function BasicForLoop({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  return <ForLoopVisualizer rangeEnd={5} title={isEn ? "Basic for loop: range(5)" : "기본 for문: range(5)"} bodyTemplate="print(i)" outputFormat={(i) => `${i}`} lang={lang} />
}

export function ForLoopWithRange({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  return <ForLoopVisualizer rangeStart={1} rangeEnd={6} title={isEn ? "range(1, 6) — 1 to 5" : "range(1, 6) - 1부터 5까지"} bodyTemplate="print(i)" outputFormat={(i) => `${i}`} lang={lang} />
}

export function ForLoopMultiplication({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  return <ForLoopVisualizer rangeStart={1} rangeEnd={10} varName="i" title={isEn ? "Multiplication table: 5s" : "구구단 5단"} bodyTemplate="print(f'5 x {i} = {5 * i}')" outputFormat={(i) => `5 x ${i} = ${5 * i}`} speed={800} lang={lang} />
}

export function ForLoopEvenNumbers({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  return <ForLoopVisualizer rangeStart={2} rangeEnd={11} rangeStep={2} title={isEn ? "Even numbers only: range(2, 11, 2)" : "짝수만 출력: range(2, 11, 2)"} bodyTemplate="print(i)" outputFormat={(i) => `${i}`} lang={lang} />
}
