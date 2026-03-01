import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    // 쿠키를 redirect 응답에 직접 붙이기 위해 수동으로 관리
    const cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[] = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // request에서 기존 쿠키 읽기
            const cookieHeader = request.headers.get("cookie") || ""
            return cookieHeader
              .split(";")
              .map((c) => c.trim())
              .filter(Boolean)
              .map((c) => {
                const [name, ...rest] = c.split("=")
                return { name: name.trim(), value: rest.join("=").trim() }
              })
          },
          setAll(cookies) {
            // 나중에 redirect 응답에 붙일 수 있도록 저장
            cookiesToSet.push(
              ...cookies.map(({ name, value, options }) => ({
                name,
                value,
                options: options as Record<string, unknown>,
              }))
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocalEnv = process.env.NODE_ENV === "development"

      let redirectUrl: string
      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`
      } else if (forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      } else {
        redirectUrl = `${origin}${next}`
      }

      const response = NextResponse.redirect(redirectUrl)

      // 세션 쿠키를 redirect 응답에 직접 설정
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options as Record<string, unknown>)
      })

      return response
    }
  }

  // 오류 시 로그인 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
