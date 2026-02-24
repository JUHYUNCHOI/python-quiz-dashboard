"use client"

import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface SoundToggleProps {
  isMuted: boolean
  onToggle: () => void
  className?: string
}

export function SoundToggle({ isMuted, onToggle, className }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-1.5 rounded-full transition-all",
        isMuted
          ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          : "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50",
        className
      )}
      aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
      title={isMuted ? "🔇 소리 켜기" : "🔊 소리 끄기"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
      ) : (
        <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
      )}
    </button>
  )
}
