/**
 * 홈(여정) 화면 전용 아이콘.
 *
 * 왜 이모지를 안 쓰는가 — 🐍⚡🧩🏆💪 를 늘어놓으면 플랫폼마다 그림이 다르고
 * (윈도우/안드로이드/iOS 가 전부 제각각), 선 굵기가 주변 UI 와 안 맞고, 색을
 * 제품 팔레트에 맞출 수가 없다. 무엇보다 **전부 다른 작가가 그린 그림**이라
 * 한 화면에 모이면 통일감이 깨진다.
 *
 * 그래서 전부 같은 규칙으로 직접 그렸다:
 *   viewBox 24×24 · stroke 1.75 · fill 없음 · currentColor · 둥근 끝
 * 크기와 색은 부르는 쪽이 `size` 와 `className`(text-*) 으로 정한다.
 *
 * 규칙 하나 더 — **목적지마다 실루엣이 달라야 한다.** 같은 모양을 색만 바꿔
 * 늘어놓으면 "뭐가 뭔지" 구분이 안 된다(이 화면을 다시 짠 이유가 그거였다).
 * 단, 같은 곳으로 가는 자리는 일부러 같은 아이콘을 쓴다(대회 타일 = USACO 노드).
 */

interface IconProps {
  size?: number
  className?: string
}

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  }
}

/** 수업 — 펼친 책. 세로 접선이 있어 '판/카드' 와 구분된다. */
export function IconBook({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 6.5C10.3 5 7.9 4.5 4.5 4.8v12.6c3.4-.3 5.8.2 7.5 1.7 1.7-1.5 4.1-2 7.5-1.7V4.8c-3.4-.3-5.8.2-7.5 1.7Z" />
      <path d="M12 6.5v12.6" />
    </svg>
  )
}

/** 코드 — 꺾쇠 두 개 + 슬래시. Python 수업 단계. */
export function IconCode({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </svg>
  )
}

/** 번개 — C++. 날카로운 대각 실루엣이라 작게 줄여도 다른 것과 안 섞인다. */
export function IconBolt({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M13.5 3 5 13.5h5.5L10 21l8.5-10.5H13l.5-7.5Z" />
    </svg>
  )
}

/** 연습 — 아령. '반복해서 몸에 붙인다' 는 뜻이 그림 하나로 전달된다. */
export function IconDumbbell({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  )
}

/** 알고리즘 — 노드 그래프. 점 세 개를 선으로 이은 모양. */
export function IconGraph({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="6" cy="7" r="2.6" />
      <circle cx="18" cy="7" r="2.6" />
      <circle cx="12" cy="18" r="2.6" />
      <path d="M8.6 7h6.8M7.4 9.3l3.2 6.1M16.6 9.3l-3.2 6.1" />
    </svg>
  )
}

/** 대회 — 트로피. 받침까지 그려야 컵이 아니라 상(賞)으로 읽힌다. */
export function IconTrophy({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.4M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.4" />
      <path d="M12 14v3.5M8.5 20.5h7M9.5 17.5h5l.8 3h-6.6l.8-3Z" />
    </svg>
  )
}

/** 내 정보 — 사람. 아바타 자리라 다른 아이콘과 겹칠 일이 없다. */
export function IconUser({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20c.6-3.6 3.6-5.8 7.2-5.8S18.6 16.4 19.2 20" />
    </svg>
  )
}

/** 연속 학습 — 불꽃. 안쪽 심지를 같이 그려야 물방울로 안 보인다. */
export function IconFlame({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 3c3.4 3.2 6 6 6 9.6A6 6 0 0 1 6 12.6C6 9.4 8 7 9.4 8.8 10.8 10.6 9 5.8 12 3Z" />
      <path d="M12 20.5a2.6 2.6 0 0 1-2.6-2.6c0-1.5 1-2.3 1.7-3.3.8 1.2 3.5 1.9 3.5 3.3a2.6 2.6 0 0 1-2.6 2.6Z" />
    </svg>
  )
}

/** 완료 — 체크. 동그라미 안에 넣어 '개수 표시' 와 '버튼' 을 구분. */
export function IconCheckCircle({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.2 12.3 2.6 2.6 5-5.4" />
    </svg>
  )
}

/**
 * 완료 — 체크만. 이미 동그란 배경(배지·칩) 안에 들어갈 때 쓴다.
 * `IconCheckCircle` 을 배지 안에 넣으면 동그라미가 두 겹으로 보인다.
 * `✓` 글자를 쓰면 안 된다 — 폰트마다 굵기·베이스라인이 달라서 배지 안에서 안 맞는다.
 */
export function IconCheck({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={3}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

/** 다음으로 — 화살표. 큰 버튼 오른쪽 끝에만 쓴다. */
export function IconArrowRight({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  )
}

/** 배치고사 — 문항지. 줄 세 개 + 체크 한 개. */
export function IconClipboard({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M9 4.5h6M8 6.5H6.2a1.2 1.2 0 0 0-1.2 1.2v11.6a1.2 1.2 0 0 0 1.2 1.2h11.6a1.2 1.2 0 0 0 1.2-1.2V7.7a1.2 1.2 0 0 0-1.2-1.2H16" />
      <path d="M9 3h6v3H9z" />
      <path d="m8.5 12.5 1.6 1.6 3.4-3.6M15.5 16.5h-7" />
    </svg>
  )
}

/** 방향 선택 — 갈림길. 트랙 고르는 모달에서만 쓴다. */
export function IconFork({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 21v-6" />
      <path d="M12 15c0-3.5-2.5-4-4.5-5.5" />
      <path d="M12 15c0-3.5 2.5-4 4.5-5.5" />
      <circle cx="6.5" cy="7" r="2.4" />
      <circle cx="17.5" cy="7" r="2.4" />
    </svg>
  )
}

/** 스테이지 id → 아이콘. 지도와 모달이 **같은 표**를 쓰게 해서 어긋남을 막는다. */
export const STAGE_ICON: Record<string, (p: IconProps) => React.ReactElement> = {
  "python": IconCode,
  "python-practice": IconDumbbell,
  "cpp": IconBolt,
  "cpp-practice": IconDumbbell,
  "algo": IconGraph,
  "usaco": IconTrophy,
}
