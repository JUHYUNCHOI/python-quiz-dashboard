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
  const [isMuted, setIsMuted] = useState(true) // 기본 뮤트 (autoplay 정책 대응)

  // localStorage에서 뮤트 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) {
        setIsMuted(saved === "true")
      }
    } catch {}
  }, [])

  // 사운드 프리로드
  useEffect(() => {
    Object.entries(SOUND_FILES).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.5
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

  const play = useCallback((name: SoundName) => {
    if (isMuted) return
    const audio = audioRefs.current[name]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {}) // autoplay 정책 에러 무시
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {}
      return next
    })
  }, [])

  return { play, isMuted, toggleMute }
}
