"use client"

/**
 * 연습 화면(`/course/ladder`)을 열어 줄지 판단한다.
 *
 * 왜 막는가: 연습 화면은 1430문제를 난이도순으로 한 줄에 늘어놓는다. 자기
 * 수준을 모르는 학생에게 이 줄은 "어디부터 풀어야 하는지 모르겠는 목록"이다.
 * 배치고사가 그 시작점을 정해 주므로, 티어가 없으면 연습보다 배치고사가 먼저다.
 *
 * 선생님은 예외다. 선생님은 배치고사를 보지 않으므로 영원히 티어가 없고,
 * 같은 규칙을 그대로 적용하면 수업에 쓸 문제 목록을 아예 못 보게 된다.
 * 여기서는 `useEffectiveIsTeacher()`(학생 뷰 토글을 반영) 가 아니라 **실제
 * 역할**을 본다 — 토글 때문에 선생님 계정에서 문제 목록이 사라지면 안 된다.
 *
 * `loading` 을 따로 두는 이유: 프로필·localStorage 를 읽기 전에 섣불리
 * `locked` 로 답하면, 티어가 있는 학생의 네비에서 탭이 한 번 사라졌다
 * 나타난다. 모를 때는 아무것도 바꾸지 않는다.
 */

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { loadTierState } from "@/lib/tier-store"

export type PracticeGate = "loading" | "open" | "locked"

export function usePracticeGate(): PracticeGate {
  const { profile, isLoading } = useAuth()
  const pathname = usePathname()
  const [ranked, setRanked] = useState<boolean | null>(null)

  // 네비는 페이지를 옮겨 다녀도 마운트된 채로 남는다. 배치고사를 막 끝낸
  // 학생에게 탭이 안 돌아오면 안 되므로 경로가 바뀔 때마다 다시 읽는다.
  useEffect(() => {
    setRanked(loadTierState() !== null)
  }, [pathname])

  if (profile?.role === "teacher") return "open"
  if (isLoading || ranked === null) return "loading"
  return ranked ? "open" : "locked"
}
