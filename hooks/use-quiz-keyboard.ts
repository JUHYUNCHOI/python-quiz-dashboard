"use client"

import { useEffect } from "react"

interface UseQuizKeyboardOptions {
  selectedAnswer: number | null
  showResult: boolean
  showExplanation: boolean
  onSubmit: () => void
  onExit: () => void
  onCloseExplanation: () => void
  onSelectAnswer: (index: number) => void
}

export function useQuizKeyboard({
  selectedAnswer,
  showResult,
  showExplanation,
  onSubmit,
  onExit,
  onCloseExplanation,
  onSelectAnswer,
}: UseQuizKeyboardOptions) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selectedAnswer !== null && !showResult) {
        onSubmit()
      }
      if (e.key === "Escape") {
        if (showExplanation) {
          onCloseExplanation()
        } else {
          onExit()
        }
      }
      if (e.key >= "1" && e.key <= "4" && !showResult) {
        onSelectAnswer(Number.parseInt(e.key) - 1)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedAnswer, showResult, showExplanation, onSubmit, onExit, onCloseExplanation, onSelectAnswer])
}
