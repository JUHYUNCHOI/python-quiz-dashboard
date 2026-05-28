import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 세션 갱신 (중요: getUser()를 호출해야 토큰이 갱신됨)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 보호 경로: 로그인 필수
  // - /learn, /quiz, /review, /practice, /portal, /profile, /progress, /coding-bank: 학생 학습 화면
  // - /teacher, /admin, /analytics: 기존 보호 유지
  // - /curriculum, /quest, /algo: 비로그인도 볼 수 있게 둠 (마케팅용 preview)
  // - /learn/[Python 레슨]: Python 52강 + 프로젝트 4개 비로그인 공개 — AdSense 수익 모델
  //   - 숫자 ID: /learn/1 ~ /learn/52
  //   - 프로젝트: /learn/p1 ~ /learn/p4
  //   - cpp-*, pseudo-*, igcse-* 는 로그인 필요 (진지한 학습자 필터링)
  const path = request.nextUrl.pathname

  // /learn/<숫자> 또는 /learn/p<숫자> 는 비로그인 공개 (Python 레슨/프로젝트)
  // /learn/cpp-1, /learn/pseudo-3 같은 건 매칭 안 됨 → 보호됨
  const learnMatch = path.match(/^\/learn\/(\d+|p\d+)(\/.*)?$/)
  const isLearnPreview = learnMatch !== null

  const isProtected =
    !isLearnPreview && (
      (path.startsWith("/teacher") && path !== "/teacher/register") ||
      path.startsWith("/admin") ||
      path.startsWith("/analytics") ||
      path.startsWith("/learn") ||
      path.startsWith("/quiz") ||
      path.startsWith("/review") ||
      path.startsWith("/practice") ||
      path.startsWith("/journey") ||
      path.startsWith("/profile") ||
      path.startsWith("/progress") ||
      path.startsWith("/coding-bank")
    )

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    // 로그인 후 원래 가려던 곳으로 돌아갈 수 있게 returnTo 파라미터 보존
    const returnTo = path + (request.nextUrl.search || "")
    url.search = `?returnTo=${encodeURIComponent(returnTo)}`
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
