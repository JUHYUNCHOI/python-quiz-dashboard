/**
 * 페이지 닫기/숨김 시 Supabase에 keepalive fetch로 데이터 전송
 * 일반 fetch는 페이지 unload 시 브라우저가 취소하므로 keepalive: true 필요
 * — visibilitychange 핸들러에서만 사용
 */
export function flushToSupabase(
  table: string,
  data: Record<string, unknown>,
  onConflict: string
): void {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) return

  // Supabase JS 클라이언트가 localStorage에 저장한 세션에서 access_token 가져오기
  let accessToken: string | null = null
  try {
    const keys = Object.keys(localStorage)
    const authKey = keys.find(k => k.startsWith("sb-") && k.endsWith("-auth-token"))
    if (authKey) {
      const raw = localStorage.getItem(authKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        accessToken = parsed?.access_token || null
      }
    }
  } catch {
    // localStorage 접근 불가 시 무시
  }

  if (!accessToken) return // 비로그인 상태면 flush 불필요

  const params = new URLSearchParams({ on_conflict: onConflict })
  const url = `${supabaseUrl}/rest/v1/${table}?${params}`

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": anonKey,
      "Authorization": `Bearer ${accessToken}`,
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(data),
    keepalive: true,
  }).catch(() => {
    // keepalive fetch 실패 시 무시 — 다음 로드 시 localStorage에서 동기화됨
  })
}
