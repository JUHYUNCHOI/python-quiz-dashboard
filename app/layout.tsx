import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { LanguageProvider } from "@/contexts/language-context"
import { TeacherMirror } from "@/components/teacher-mirror"
import { GlobalEditorProvider } from "@/components/teacher/global-editor-provider"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID } from "@/lib/adsense-config"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "코드린 - 재미있게 배우는 코딩",
  description: "코드린과 함께 Python, C++ 코딩을 재미있게 배우세요. 중학생·고등학생을 위한 체계적인 코딩 학습 플랫폼.",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "코드린 - 재미있게 배우는 코딩",
    description: "Python, C++ 코딩을 재미있게 배우는 학습 플랫폼. 레슨·퀴즈·진도 관리까지 한 곳에서.",
    type: "website",
    locale: "ko_KR",
    siteName: "코드린",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Google AdSense — publisher ID 설정 시에만 로드 */}
        {ADSENSE_ENABLED && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="font-sans antialiased notranslate" suppressHydrationWarning>
        {/* 밝은/어두운 테마. `class` 전략이라 <html> 에 `.dark` 가 붙고,
            globals.css 의 색 토큰 치환표가 그때 발동한다.
            `disableTransitionOnChange` — 전환 순간 수백 개 면이 각자 애니메이션하면
            화면이 출렁인다. 바뀌는 동안만 transition 을 끈다. */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <LanguageProvider>
              <GlobalEditorProvider>
                <DesktopSidebar />
                {/* 데스크탑·패드(md+)에서는 좌측 사이드바 폭만큼 본문을 밀어줌 */}
                <div className="md:pl-60">
                  {children}
                  <SiteFooter />
                </div>
                <TeacherMirror />
              </GlobalEditorProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
