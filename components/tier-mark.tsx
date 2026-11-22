import type { TierId } from "@/lib/tier-system"
import { tierInfo } from "@/lib/tier-system"

/**
 * 티어 마크 — 예전엔 티어마다 다른 이모지(🥉🥈🥇💎🔮👑)를 썼다.
 *
 * 이모지는 플랫폼마다 생김새가 다르고(윈도우/안드로이드/iOS 가 전부 다른 그림),
 * 크기를 키우면 다른 UI 와 선 굵기가 안 맞으며, 색을 제품 팔레트에 맞출 수도 없다.
 * 그래서 등급마다 다른 그림을 쓰는 대신 **방패 하나를 티어 색으로 칠한다** —
 * 급이 다르다는 건 색이 말하고, 몇 부인지(II / I)는 옆의 글자가 말한다.
 *
 * `size` 는 픽셀. `color` 는 칩처럼 **배경이 이미 티어 색인 자리**에서 쓴다 —
 * 그대로 두면 같은 색끼리 겹쳐 안 보이므로 글자색(`ink`)을 넘겨 준다.
 */
export function TierMark({ tier, size = 16, color, className }: {
  tier: TierId
  size?: number
  color?: string
  className?: string
}) {
  const fill = color ?? tierInfo(tier).color
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d={SHIELD} fill={fill} />
    </svg>
  )
}

/**
 * 윗변이 평평하고 아래가 뾰족한 히터 실드.
 *
 * 처음엔 위아래가 둥근 방패였는데 13px 짜리 필터 칩에서 그냥 **점**으로 뭉개졌다
 * (1400px 캡처에서 원과 구분이 안 됐다). 같은 색 stroke 를 두른 것도 모양을
 * 더 불려 놓았다. 평평한 윗변 + 또렷한 아래 꼭짓점이라야 작게 줄여도 실루엣이
 * 원과 구분된다. stroke 는 뺐다 — 작아질수록 선이 면을 잡아먹는다.
 */
const SHIELD =
  "M4.6 3.4 h14.8 a.6.6 0 0 1 .6.6 v7.2 c0 4.7 -3.3 8.5 -8 10.4 -4.7 -1.9 -8 -5.7 -8 -10.4 V4 a.6.6 0 0 1 .6 -.6 Z"

/**
 * 아직 배치고사를 안 본 학생(언랭)의 마크. 같은 방패를 **비워 둔다** —
 * "아직 안 채워진 자리"가 그대로 보이게. 색은 다른 티어와 섞이지 않는 회색.
 *
 * 점선은 쓰지 않는다. 13px 에서 대시가 점 몇 개로 흩어져 마크가 아예 사라졌다.
 * 채워졌나 비었나만으로 이미 구분되므로 실선 한 줄이면 충분하다.
 */
export function UnrankedMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d={SHIELD} fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  )
}
