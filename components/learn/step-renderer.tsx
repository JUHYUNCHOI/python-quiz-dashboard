"use client"

import { LessonStep } from "./types"
import { ExplainStep } from "./explain-step"
import { TryItStep } from "./tryit-step"
import { QuizStep } from "./quiz-step"
import { InteractiveStep } from "./interactive-step"
import { AnimationStep } from "./animation-step"
import { FillBlankStep } from "./fillblank-step"
import { PredictStep } from "./predict-step"
import { PracticeStep } from "./practice-step"
import { useLanguage } from "@/contexts/language-context"

interface StepRendererProps {
  step: LessonStep
  lang: "ko" | "en"
  isCompleted: boolean
  lessonId?: string
  // tryit/mission
  hintLevel: number
  onHintLevelChange: (level: number) => void
  onSuccess: () => void
  // quiz + predict
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onQuizAnswer: (idx: number) => void
  onQuizAcknowledge: () => void
  // fillblank
  onStepComplete?: (correct: boolean, filledValues?: Record<number, string>) => void
  onStepAcknowledge?: () => void
  showNextOnCorrect?: boolean  // 복습: 정답 후 설명 안에 "다음 문제 →" 버튼
}

export function StepRenderer({
  step, lang, isCompleted, lessonId,
  hintLevel, onHintLevelChange, onSuccess,
  selectedAnswer, showExplanation, quizAttempts, onQuizAnswer, onQuizAcknowledge,
  onStepComplete, onStepAcknowledge, showNextOnCorrect
}: StepRendererProps) {
  const { t } = useLanguage()
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
          showNextOnCorrect={showNextOnCorrect}
        />
      )

    case "predict":
      return (
        <PredictStep
          step={step}
          isCompleted={isCompleted}
          selectedAnswer={selectedAnswer}
          showExplanation={showExplanation}
          quizAttempts={quizAttempts}
          onAnswer={onQuizAnswer}
          onAcknowledge={onQuizAcknowledge}
        />
      )

    case "fillblank":
      return (
        <FillBlankStep
          step={step}
          isCompleted={isCompleted}
          onComplete={onStepComplete!}
          onAcknowledge={onStepAcknowledge!}
        />
      )

    case "interactive":
      return <InteractiveStep step={step} lang={lang} onSuccess={onSuccess} />

    case "animation":
      return <AnimationStep step={step} />

    case "practice":
      return <PracticeStep step={step} lang={lang} onSuccess={onSuccess} lessonId={lessonId} isCompleted={isCompleted} />

    case "coding":
      return (
        <TryItStep
          step={step}
          isCompleted={isCompleted}
          hintLevel={hintLevel}
          onHintLevelChange={onHintLevelChange}
          onSuccess={onSuccess}
        />
      )

    default:
      return <div className="text-gray-500">{t("알 수 없는 스텝 타입:", "Unknown step type:")} {step.type}</div>
  }
}
