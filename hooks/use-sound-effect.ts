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
