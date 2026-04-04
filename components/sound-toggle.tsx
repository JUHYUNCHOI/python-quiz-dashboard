"use client"

import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface SoundToggleProps {
  isMuted: boolean
  onToggle: () => void
  className?: string
}

export function SoundToggle({ isMuted, onToggle, className }: SoundToggleProps) {
  const { t } = useLanguage()
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
      aria-label={isMuted ? t("소리 켜기", "Unmute") : t("소리 끄기", "Mute")}
      title={isMuted ? t("🔇 소리 켜기", "🔇 Unmute") : t("🔊 소리 끄기", "🔊 Mute")}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
      ) : (
        <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
      )}
    </button>
  )
}
