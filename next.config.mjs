// ── 빌드 시작 시 환경변수 검증 (fail-fast) ──────────────────────────────
// NEXT_PUBLIC_* 는 빌드 시점에 번들로 인라인된다 → 빌드 때 없으면 런타임 복구 불가.
// 없으면 628개 페이지 프리렌더 중 첫 페이지에서 cryptic 하게 죽는 대신,
// 여기서 즉시 명확한 메시지로 중단/경고한다. (2026-06-21 라이브 사고 재발 방지)
//
// HARD (없으면 앱이 근본적으로 안 됨 → production 빌드 중단):
const REQUIRED_ENV = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]
// SOFT (특정 기능만 깨짐 → 경고만):
const RECOMMENDED_ENV = [
  "NEXT_PUBLIC_PISTON_URL",        // 코드 실행
  "NEXT_PUBLIC_PISTON_KEY",        // 코드 실행
  "NEXT_PUBLIC_TEACHER_SECRET_CODE", // 교사 등록
  "NEXT_PUBLIC_ALGORITHM_URL",     // Algorithm Lab 링크
  "NEXT_PUBLIC_CODEQUEST_URL",     // CodeQuest 링크
]

const missingRequired = REQUIRED_ENV.filter((k) => !process.env[k])
const missingRecommended = RECOMMENDED_ENV.filter((k) => !process.env[k])

if (missingRequired.length > 0) {
  const msg =
    `\n❌ [환경변수 누락] 필수 변수가 없습니다: ${missingRequired.join(", ")}\n` +
    `   → Vercel 프로젝트 Settings → Environment Variables 에 추가하세요.\n` +
    `   → 전체 목록·설명은 .env.example 참고. (NEXT_PUBLIC_* 는 빌드 시점에 박히므로 반드시 빌드 전에 설정)\n`
  // production 빌드에서만 중단 (dev/툴링에서 env 안 잡힐 때 오탐 방지)
  if (process.env.NODE_ENV === "production") throw new Error(msg)
  else console.warn(msg)
}
if (missingRecommended.length > 0) {
  console.warn(
    `⚠️  [환경변수 경고] 선택 변수 누락: ${missingRecommended.join(", ")} ` +
    `— 해당 기능(코드실행/교사등록/외부링크)이 동작하지 않을 수 있습니다.`
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default nextConfig
