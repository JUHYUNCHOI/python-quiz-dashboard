"use client"

import { cn } from '@/lib/utils'

export type LibraryVariant = 'turtle' | 'pygame'

interface LibraryToggleProps {
  variant: LibraryVariant
  setVariant: (v: LibraryVariant) => void
  className?: string
}

export function LibraryToggle({ variant, setVariant, className }: LibraryToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 bg-gray-100 rounded-full p-1", className)}>
      <button
        onClick={() => setVariant('turtle')}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all",
          variant === 'turtle'
            ? "bg-white text-green-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🐢 turtle
      </button>
      <button
        onClick={() => setVariant('pygame')}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all",
          variant === 'pygame'
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🎮 pygame
      </button>
    </div>
  )
}
