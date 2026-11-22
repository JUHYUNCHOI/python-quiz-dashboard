import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"

// 선생님 분기는 로그인 세션이 있어야 재현되므로 브라우저 캡처로 확인할 수 없다.
// 여기서만 검증한다 — 선생님은 티어가 영원히 없으므로 이 분기가 깨지면
// 선생님 계정에서 문제 목록이 통째로 사라진다.
const auth = { profile: null as { role: string } | null, isLoading: false }
vi.mock("@/contexts/auth-context", () => ({ useAuth: () => auth }))
vi.mock("next/navigation", () => ({ usePathname: () => "/course/ladder" }))

import { usePracticeGate } from "@/lib/tier-gate"

function setTier(tier: string | null) {
  if (tier === null) localStorage.removeItem("tier-state")
  else localStorage.setItem("tier-state", JSON.stringify({
    tier, since: new Date().toISOString(), placedAt: new Date().toISOString(), history: [],
  }))
}

describe("usePracticeGate", () => {
  beforeEach(() => {
    localStorage.clear()
    auth.profile = null
    auth.isLoading = false
  })

  it("티어가 없는 학생은 막는다", () => {
    setTier(null)
    expect(renderHook(() => usePracticeGate()).result.current).toBe("locked")
  })

  it("티어가 있는 학생은 연다", () => {
    setTier("silver1")
    expect(renderHook(() => usePracticeGate()).result.current).toBe("open")
  })

  it("선생님은 티어가 없어도 연다", () => {
    setTier(null)
    auth.profile = { role: "teacher" }
    expect(renderHook(() => usePracticeGate()).result.current).toBe("open")
  })

  it("프로필을 읽는 중에는 아무것도 바꾸지 않는다", () => {
    setTier(null)
    auth.isLoading = true
    expect(renderHook(() => usePracticeGate()).result.current).toBe("loading")
  })
})
