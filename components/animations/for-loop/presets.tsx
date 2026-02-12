"use client"

import { ForLoopVisualizer } from "./for-loop-visualizer"

export function BasicForLoop() {
  return <ForLoopVisualizer rangeEnd={5} title="기본 for문: range(5)" bodyTemplate="print(i)" outputFormat={(i) => `${i}`} />
}

export function ForLoopWithRange() {
  return <ForLoopVisualizer rangeStart={1} rangeEnd={6} title="range(1, 6) - 1부터 5까지" bodyTemplate="print(i)" outputFormat={(i) => `${i}`} />
}

export function ForLoopMultiplication() {
  return <ForLoopVisualizer rangeStart={1} rangeEnd={10} varName="i" title="구구단 5단" bodyTemplate="print(f'5 x {i} = {5 * i}')" outputFormat={(i) => `5 x ${i} = ${5 * i}`} speed={800} />
}

export function ForLoopEvenNumbers() {
  return <ForLoopVisualizer rangeStart={2} rangeEnd={11} rangeStep={2} title="짝수만 출력: range(2, 11, 2)" bodyTemplate="print(i)" outputFormat={(i) => `${i}`} />
}
