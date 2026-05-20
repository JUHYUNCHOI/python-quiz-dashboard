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
  //   RequireAuth client-side 가드도 있지만, middleware 가 server-side 에서 먼저 막아주면
  //   비로그인 사용자가 콘텐츠 깜빡 보는 flash 가 사라짐.
  // - /teacher, /admin, /analytics: 기존 보호 유지
  // - /curriculum, /quest, /algo: 비로그인도 볼 수 있게 둠 (마케팅용 preview)
  const path = request.nextUrl.pathname
  const isProtected =
    (path.startsWith("/teacher") && path !== "/teacher/register") ||
    path.startsWith("/admin") ||
    path.startsWith("/analytics") ||
    path.startsWith("/learn") ||
    path.startsWith("/quiz") ||
    path.startsWith("/review") ||
    path.startsWith("/practice") ||
    path.startsWith("/portal") ||
    path.startsWith("/profile") ||
    path.startsWith("/progress") ||
    path.startsWith("/coding-bank")

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
