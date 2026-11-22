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
      <path d={SHIELD} fill={fill} stroke={fill} strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  )
}

const SHIELD = "M12 2.4 20.2 5.6 V12 c0 4.6 -3.4 8.2 -8.2 9.6 C7.2 20.2 3.8 16.6 3.8 12 V5.6 Z"

/**
 * 아직 배치고사를 안 본 학생(언랭)의 마크. 같은 방패를 **비워 둔다** —
 * "아직 안 채워진 자리"가 그대로 보이게. 색은 다른 티어와 섞이지 않는 회색.
 */
export function UnrankedMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d={SHIELD} fill="none" stroke="#9ca3af" strokeWidth={1.6} strokeLinejoin="round" strokeDasharray="2.5 2" />
    </svg>
  )
}
