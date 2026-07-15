import { createBrowserClient } from "@supabase/ssr"

// 브라우저 클라이언트는 반드시 싱글톤이어야 한다.
// createClient() 를 호출할 때마다 새 인스턴스를 만들면 각 인스턴스가
// 같은 auth 락(lock:sb-...-auth-token)을 두고 경쟁 → Navigator LockManager
// 타임아웃(10000ms) 에러가 난다. 모듈 레벨에 캐싱해서 한 인스턴스만 쓴다.
let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  if (browserClient) return browserClient
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return browserClient
}
