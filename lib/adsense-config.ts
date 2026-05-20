/**
 * AdSense 중앙 설정.
 *
 * 활성화 방법:
 *   1. Google AdSense 승인받기 (https://www.google.com/adsense)
 *   2. .env.local 또는 Vercel 환경변수에 추가:
 *        NEXT_PUBLIC_ADSENSE_PUBLISHER_ID="ca-pub-XXXXXXXXXXXXXXXX"
 *   3. AdSense 대시보드에서 ad unit 만들고 아래 SLOT_IDS 채우기
 *   4. /privacy 페이지에 쿠키/광고 추적 안내 한 줄 추가 (Google 요구)
 *
 * 환경변수 없으면 placeholder (회색 박스) 만 렌더 — production 에도 광고 안 뜸.
 * 광고는 비로그인 사용자에게만 노출. 로그인하면 ad-free.
 */

// Publisher ID — AdSense 가입하면 받는 "ca-pub-XXXXX..." 값
export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || ""

export const ADSENSE_ENABLED = ADSENSE_PUBLISHER_ID.startsWith("ca-pub-")

/**
 * Ad slot ID 매핑. AdSense 대시보드에서 만든 각 ad unit 의 data-ad-slot 값.
 * 비어 있으면 placeholder 로 표시됨.
 */
export const AD_SLOTS = {
  // 학습 페이지 상단 — 헤더 아래, 콘텐츠 위
  learnTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEARN_TOP || "",
  // 학습 페이지 하단 — 콘텐츠 아래
  learnBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEARN_BOTTOM || "",
  // 챕터 사이 (선택적)
  learnInChapter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEARN_IN_CHAPTER || "",
  // 커리큘럼 페이지 인라인
  curriculumInline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CURRICULUM || "",
} as const

export type AdSlotName = keyof typeof AD_SLOTS
