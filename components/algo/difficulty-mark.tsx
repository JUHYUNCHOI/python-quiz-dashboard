/**
 * 난이도 도형 표식.
 *
 * 왜 이모지(🟢🟡🔴)가 아닌가:
 *  - OS/글꼴마다 모양과 크기가 달라져 줄 높이가 흔들린다.
 *  - 색각이상이면 셋 다 같은 회색 점이다. 모양이 그걸 대신 말해 준다.
 * 각이 늘어나는 순서로 난이도를 읽는다: 원 → 사각 → 삼각.
 */
export type DifficultyShape = "circle" | "square" | "triangle"

export const DIFFICULTY_MARKS: Record<string, { shape: DifficultyShape; color: string }> = {
  쉬움: { shape: "circle", color: "#16a34a" },
  보통: { shape: "square", color: "#d97706" },
  어려움: { shape: "triangle", color: "#dc2626" },
}

export function DifficultyMark({ shape, color }: { shape: DifficultyShape; color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="shrink-0">
      {shape === "circle" && <circle cx="5" cy="5" r="4.5" fill={color} />}
      {shape === "square" && <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill={color} />}
      {shape === "triangle" && <path d="M5 0.5 9.5 9.5H0.5z" fill={color} />}
    </svg>
  )
}
