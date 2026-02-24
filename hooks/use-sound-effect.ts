"use client"

import { useRef, useEffect, useCallback, useState } from "react"

const SOUND_FILES = {
  correct: "/sounds/correct.mp3",
  wrong: "/sounds/wrong.mp3",
  codeSuccess: "/sounds/code-success.mp3",
  chapterComplete: "/sounds/chapter-complete.mp3",
  lessonComplete: "/sounds/lesson-complete.mp3",
} as const

type SoundName = keyof typeof SOUND_FILES

const STORAGE_KEY = "sound-muted"

// 모바일 진동 패턴 (ms) — 소리 꺼도 진동은 항상 작동
const VIBRATION_PATTERNS: Record<string, number | number[]> = {
  correct: 50,
  wrong: [80, 40, 80],
  codeSuccess: [30, 20, 30],
  chapterComplete: [50, 30, 50, 30, 80],
  lessonComplete: [60, 40, 60, 40, 60, 40, 100],
}

export function useSoundEffect() {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return false
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === "true"
    } catch {
      return false
    }
  })
  const isMutedRef = useRef(isMuted)

  // ref 동기화 — play()가 항상 최신 뮤트 상태를 읽도록
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  // 사운드 프리로드
  useEffect(() => {
    Object.entries(SOUND_FILES).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.8
      audioRefs.current[key] = audio
    })
    return () => {
      Object.values(audioRefs.current).forEach((a) => {
        a.pause()
        a.src = ""
      })
      audioRefs.current = {}
    }
  }, [])

  // ref를 사용해서 stale closure 방지
  const play = useCallback((name: SoundName) => {
    // 모바일 진동 — 소리 꺼져 있어도 항상 작동
    try {
      const pattern = VIBRATION_PATTERNS[name]
      if (pattern && navigator.vibrate) navigator.vibrate(pattern)
    } catch {}

    if (isMutedRef.current) return
    const audio = audioRefs.current[name]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      isMutedRef.current = next
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {}
      return next
    })
  }, [])

  return { play, isMuted, toggleMute }
}
