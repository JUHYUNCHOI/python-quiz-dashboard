import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useQuizTimer } from "@/hooks/use-quiz-timer"

describe("useQuizTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should initialize with the given time", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 300, isPaused: false })
    )
    expect(result.current.timeLeft).toBe(300)
    expect(result.current.formattedTime).toBe("5:00")
    expect(result.current.isLowTime).toBe(false)
    expect(result.current.isExpired).toBe(false)
  })

  it("should count down when not paused", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 300, isPaused: false })
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(299)
    expect(result.current.formattedTime).toBe("4:59")
  })

  it("should not count down when paused", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 300, isPaused: true })
    )

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.timeLeft).toBe(300)
  })

  it("should show isLowTime when under 30 seconds", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 30, isPaused: false })
    )

    expect(result.current.isLowTime).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.isLowTime).toBe(true)
    expect(result.current.timeLeft).toBe(29)
  })

  it("should format time correctly", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 65, isPaused: true })
    )

    expect(result.current.formattedTime).toBe("1:05")
  })

  it("should mark as expired when time runs out", () => {
    const { result } = renderHook(() =>
      useQuizTimer({ initialTime: 1, isPaused: false })
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isExpired).toBe(true)
  })
})
