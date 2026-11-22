import type { TierId } from "@/lib/tier-system"
import { tierInfo } from "@/lib/tier-system"

/**
 * 티어 마크.
 *
 * ── 왜 이모지가 아닌가 ────────────────────────────────────────────────────
 * 예전엔 티어마다 이모지(🥉🥈🥇💎🔮👑)를 썼다. 이모지는 플랫폼마다 생김새가
 * 다르고(윈도우/안드로이드/iOS 가 전부 다른 그림), 크기를 키우면 주변 UI 와 선
 * 굵기가 안 맞으며, 색을 제품 팔레트에 맞출 수도 없다.
 *
 * ── 왜 방패 하나가 아니라 등급마다 다른 모양인가 ──────────────────────────
 * 한동안은 **방패 하나를 티어 색으로 칠하는** 방식이었다. 색만으로 구분하면
 * 두 가지가 깨진다:
 *   1. 사다리(10칸)를 늘어놓는 순간 똑같은 방패 10개가 색만 조금씩 달라진
 *      줄이 된다. 브론즈 I 과 브론즈 II, 실버 I 과 실버 II 는 색 차이가 거의
 *      없어서 "무슨 티어가 있는지" 를 읽을 수 없다.
 *   2. 색각 이상이거나 화면이 어두우면 등급 차이가 아예 사라진다.
 *
 * 그래서 **등급 계열마다 실루엣을 바꾼다** — 네모 → 마름모 → 별 → 육각 →
 * 보석 → 왕관. 올라갈수록 꼭짓점이 늘어나도록 순서를 짰다. 같은 계열의 II / I
 * 는 **같은 모양**이고 색 농도와 옆의 숫자가 구분한다 (등급은 6개, 모양도 6개).
 *
 * 규칙은 하나다: 24×24 그리드에 **면(fill)으로만** 그린다. 가는 선을 넣으면
 * 13px 짜리 필터 칩에서 선이 면을 잡아먹고 전부 같은 점으로 뭉개진다.
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
      <path d={tierShape(tier)} fill={fill} />
    </svg>
  )
}

/** 브론즈 — 묵직한 네모. 꼭짓점 4개, 제일 단순한 형태가 출발점이다. */
const SQUARE = "M6.2 3.8h11.6a2.4 2.4 0 0 1 2.4 2.4v11.6a2.4 2.4 0 0 1-2.4 2.4H6.2a2.4 2.4 0 0 1-2.4-2.4V6.2a2.4 2.4 0 0 1 2.4-2.4Z"
/** 실버 — 마름모. 같은 네모를 세운 것이라 '한 계단 위' 로 읽힌다. */
const DIAMOND = "M12 2.2 21.8 12 12 21.8 2.2 12Z"
/** 골드 — 네 갈래 별. 변이 오목해져 네모·마름모와 안 섞인다. */
const STAR4 = "M12 1.8c.7 5.1 4.4 8.8 9.5 9.5v1.4c-5.1.7-8.8 4.4-9.5 9.5h-1.4c-.7-5.1-4.4-8.8-9.5-9.5v-1.4c5.1-.7 8.8-4.4 9.5-9.5Z"
/** 플래티넘 — 육각. 꼭짓점이 6개로 늘어난다. */
const HEX = "M12 1.9 21 7.1v10.4L12 22.7 3 17.5V7.1Z"
/**
 * 마스터 — 아래가 뾰족한 보석.
 *
 * 처음엔 팔각형으로 그렸는데, 26px 에서 플래티넘 육각형과 거의 같은 덩어리로
 * 보였다(둘 다 '모서리 많은 동그라미'). 바닥을 한 점으로 모아야 육각형과
 * 실루엣이 갈린다.
 */
const GEM = "M6.2 3.4h11.6l2.8 4.9L12 21.8 3.4 8.3Z"
/** 그랜드마스터 — 왕관. 위가 들쭉날쭉해 멀리서도 유일하게 읽힌다. */
const CROWN = "M2.6 18.4h18.8v2.2H2.6Zm0-11.6 5.4 3.6L12 3.4l4 7 5.4-3.6-1.7 10H4.3Z"

const SHAPE_BY_FAMILY: Record<string, string> = {
  bronze: SQUARE,
  silver: DIAMOND,
  gold: STAR4,
  plat: HEX,
  master: GEM,
  grandmaster: CROWN,
}

/** `bronze2` → `bronze`. II / I 은 같은 모양을 쓴다 — 계열이 같으니까. */
export function tierFamily(tier: TierId): string {
  return tier.replace(/[0-9]+$/, "")
}

function tierShape(tier: TierId): string {
  return SHAPE_BY_FAMILY[tierFamily(tier)] ?? SQUARE
}

/**
 * 아직 배치고사를 안 본 학생(언랭)의 마크. 출발점인 **네모를 비워 둔다** —
 * "아직 안 채워진 자리"가 그대로 보이게. 색은 다른 티어와 섞이지 않는 회색.
 *
 * 점선은 쓰지 않는다. 13px 에서 대시가 점 몇 개로 흩어져 마크가 아예 사라졌다.
 * 채워졌나 비었나만으로 이미 구분되므로 실선 한 줄이면 충분하다.
 */
export function UnrankedMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d={SQUARE} fill="none" stroke="#9ca3af" strokeWidth={2.2} strokeLinejoin="round" />
    </svg>
  )
}
