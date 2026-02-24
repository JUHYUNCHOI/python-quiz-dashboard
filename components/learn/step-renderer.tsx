"use client"

import { LessonStep } from "./types"
import { ExplainStep } from "./explain-step"
import { TryItStep } from "./tryit-step"
import { QuizStep } from "./quiz-step"
import { InteractiveStep } from "./interactive-step"
import { AnimationStep } from "./animation-step"

interface StepRendererProps {
  step: LessonStep
  lang: "ko" | "en"
  isCompleted: boolean
  // tryit/mission
  hintLevel: number
  onHintLevelChange: (level: number) => void
  onSuccess: () => void
  // quiz
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onQuizAnswer: (idx: number) => void
  onQuizAcknowledge: () => void
}

export function StepRenderer({
  step, lang, isCompleted,
  hintLevel, onHintLevelChange, onSuccess,
  selectedAnswer, showExplanation, quizAttempts, onQuizAnswer, onQuizAcknowledge
}: StepRendererProps) {
  switch (step.type) {
    case "explain":
      return <ExplainStep step={step} />

    case "tryit":
    case "mission":
      return (
        <TryItStep
          step={step}
          isCompleted={isCompleted}
          hintLevel={hintLevel}
          onHintLevelChange={onHintLevelChange}
          onSuccess={onSuccess}
        />
      )

    case "quiz":
      return (
        <QuizStep
          step={step}
          isCompleted={isCompleted}
          selectedAnswer={selectedAnswer}
          showExplanation={showExplanation}
          quizAttempts={quizAttempts}
          onAnswer={onQuizAnswer}
          onAcknowledge={onQuizAcknowledge}
        />
      )

    case "interactive":
      return <InteractiveStep step={step} lang={lang} onSuccess={onSuccess} />

    case "animation":
      return <AnimationStep step={step} />

    default:
      return <div className="text-gray-500">알 수 없는 스텝 타입: {step.type}</div>
  }
}
