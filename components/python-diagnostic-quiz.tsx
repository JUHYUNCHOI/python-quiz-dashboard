"use client"

/**
 * Python 진단 퀴즈 — Track C ("이미 Python 알아요") 자동 추천용.
 *
 * 5 문제 짧은 퀴즈. 4/5+ 맞으면 Track C 권장 (Python 단계 건너뛰기 권장).
 * 3 이하면 Track A 권장 (Python 부터 차근차근).
 *
 * 기획 의도 (memory/learning_tracks.md): 학생이 자기 트랙 *명시적* 으로 선택할 수 있게.
 */

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface Question {
  q: string
  qEn: string
  code?: string
  options: string[]
  answer: number  // 0-based
}

const QUESTIONS: Question[] = [
  {
    q: "이 코드의 출력은?",
    qEn: "What does this print?",
    code: `print(2 + 3 * 4)`,
    options: ["20", "14", "9", "Error"],
    answer: 1,  // 14 — 곱셈 먼저
  },
  {
    q: "len(\"hello\") + 1 의 값은?",
    qEn: "Value of len(\"hello\") + 1?",
    options: ["5", "6", "11", "h"],
    answer: 1,  // 6
  },
  {
    q: "리스트 인덱싱: [1, 2, 3][1] 의 값은?",
    qEn: "List indexing: [1, 2, 3][1]?",
    options: ["1", "2", "3", "[1,2]"],
    answer: 1,  // 2 (0-based)
  },
  {
    q: "이 코드가 출력하는 마지막 숫자는?",
    qEn: "Last number printed by this code?",
    code: `for i in range(3):
    print(i)`,
    options: ["1", "2", "3", "0"],
    answer: 1,  // 2 (0, 1, 2)
  },
  {
    q: "이 코드의 출력은?",
    qEn: "What does this print?",
    code: `def add(a, b):
    return a + b

print(add(3, 4))`,
    options: ["7", "34", "ab", "None"],
    answer: 0,  // 7
  },
]

interface Props {
  onResult: (recommendedTrack: "A" | "C", score: number) => void
  onCancel: () => void
}

export function PythonDiagnosticQuiz({ onResult, onCancel }: Props) {
  const { t } = useLanguage()
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const q = QUESTIONS[idx]
  const isLast = idx === QUESTIONS.length - 1

  const handleSelect = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    const correct = i === q.answer
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (isLast) {
        setDone(true)
      } else {
        setIdx(idx + 1)
        setSelected(null)
      }
    }, 800)
  }

  if (done) {
    const finalScore = score
    const recommended: "A" | "C" = finalScore >= 4 ? "C" : "A"
    return (
      <div className="bg-white rounded-2xl p-6 text-center">
        <div className="text-5xl mb-3">{finalScore >= 4 ? "🎯" : "🌱"}</div>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          {t(`결과: ${finalScore} / 5`, `Score: ${finalScore} / 5`)}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {finalScore >= 4
            ? t("Python 기본 충분해요. Track C (바로 C++) 추천.", "You know Python basics. Track C (straight to C++) recommended.")
            : t("Python 기본 더 익히면 좋아요. Track A (Python 부터) 추천.", "Sharpen Python basics first. Track A (Python first) recommended.")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold"
          >
            {t("취소", "Cancel")}
          </button>
          <button
            onClick={() => onResult(recommended, finalScore)}
            className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-black"
          >
            {t(`Track ${recommended} 선택`, `Choose Track ${recommended}`)} →
          </button>
        </div>
      </div>
    )
  }

  const isCorrect = selected !== null && selected === q.answer
  const isWrong = selected !== null && selected !== q.answer

  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-500">
          {t(`문제 ${idx + 1} / ${QUESTIONS.length}`, `Q ${idx + 1} / ${QUESTIONS.length}`)}
        </span>
        <button onClick={onCancel} className="text-xs text-gray-400 hover:text-gray-600">
          ✕ {t("닫기", "Close")}
        </button>
      </div>
      <p className="text-sm font-bold text-gray-900 mb-3">{t(q.q, q.qEn)}</p>
      {q.code && (
        <pre className="bg-gray-900 text-emerald-300 rounded-lg px-3 py-2 font-mono text-xs mb-3 overflow-x-auto whitespace-pre">
          {q.code}
        </pre>
      )}
      <div className="flex flex-col gap-1.5">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "text-left px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
              selected === i && i === q.answer && "bg-green-100 border-green-500 text-green-800",
              selected === i && i !== q.answer && "bg-red-100 border-red-400 text-red-800",
              selected !== i && selected !== null && i === q.answer && "bg-green-50 border-green-300 text-green-700",
              selected === null && "bg-white border-gray-200 hover:border-orange-300",
            )}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      {isCorrect && <p className="mt-2 text-xs font-bold text-green-700">✅ {t("정답!", "Correct!")}</p>}
      {isWrong && <p className="mt-2 text-xs font-bold text-red-700">❌ {t("틀렸어요", "Wrong")}</p>}
    </div>
  )
}
