import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useSwipe } from "@/hooks/use-swipe"

function createTouchEvent(clientX: number) {
  return {
    targetTouches: [{ clientX }],
  } as unknown as React.TouchEvent
}

describe("useSwipe", () => {
  it("should call onSwipeLeft for left swipe", () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }))

    act(() => { result.current.onTouchStart(createTouchEvent(200)) })
    act(() => { result.current.onTouchMove(createTouchEvent(100)) })
    act(() => { result.current.onTouchEnd() })

    expect(onSwipeLeft).toHaveBeenCalledOnce()
  })

  it("should call onSwipeRight for right swipe", () => {
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeRight }))

    act(() => { result.current.onTouchStart(createTouchEvent(100)) })
    act(() => { result.current.onTouchMove(createTouchEvent(200)) })
    act(() => { result.current.onTouchEnd() })

    expect(onSwipeRight).toHaveBeenCalledOnce()
  })

  it("should not trigger for small movements", () => {
    const onSwipeLeft = vi.fn()
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft, onSwipeRight }))

    act(() => { result.current.onTouchStart(createTouchEvent(100)) })
    act(() => { result.current.onTouchMove(createTouchEvent(80)) })
    act(() => { result.current.onTouchEnd() })

    expect(onSwipeLeft).not.toHaveBeenCalled()
    expect(onSwipeRight).not.toHaveBeenCalled()
  })

  it("should respect custom minDistance", () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() =>
      useSwipe({ onSwipeLeft, minDistance: 100 })
    )

    // Movement of 80 (less than 100) should not trigger
    act(() => { result.current.onTouchStart(createTouchEvent(200)) })
    act(() => { result.current.onTouchMove(createTouchEvent(120)) })
    act(() => { result.current.onTouchEnd() })

    expect(onSwipeLeft).not.toHaveBeenCalled()

    // Movement of 150 (more than 100) should trigger
    act(() => { result.current.onTouchStart(createTouchEvent(200)) })
    act(() => { result.current.onTouchMove(createTouchEvent(50)) })
    act(() => { result.current.onTouchEnd() })

    expect(onSwipeLeft).toHaveBeenCalledOnce()
  })
})
