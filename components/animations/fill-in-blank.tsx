"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, RotateCcw, Sparkles, HelpCircle, X } from "lucide-react"

interface BlankSlot {
  id: string
  answer: string
  hint?: string
}

interface FillInBlankProps {
  title: string
  description: string
  codeTemplate: string
  blanks: BlankSlot[]
  choices: string[]
  expectedOutput?: string
  onComplete?: () => void
}

export function FillInBlank({
  title,
  description,
  codeTemplate,
  blanks,
  choices,
  expectedOutput,
  onComplete
}: FillInBlankProps) {
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({})
  const [selectedBlank, setSelectedBlank] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState<string | null>(null)

  // 모든 빈칸이 채워졌는지 확인
  const allFilled = blanks.every(b => filledBlanks[b.id])

  // 정답 확인
  const checkAnswers = () => {
    const correct = blanks.every(b => filledBlanks[b.id] === b.answer)
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setIsComplete(true)
      onComplete?.()
    }
  }

  // 선택지 클릭
  const handleChoiceClick = (choice: string) => {
    if (selectedBlank && !isComplete) {
      setFilledBlanks(prev => ({
        ...prev,
        [selectedBlank]: choice
      }))
      setShowResult(false)
      
      // 다음 빈칸으로 자동 이동
      const currentIndex = blanks.findIndex(b => b.id === selectedBlank)
      const nextBlank = blanks.find((b, idx) => idx > currentIndex && !filledBlanks[b.id])
      if (nextBlank) {
        setSelectedBlank(nextBlank.id)
      } else {
        // 아직 안 채워진 빈칸 찾기
        const emptyBlank = blanks.find(b => !filledBlanks[b.id] && b.id !== selectedBlank)
        setSelectedBlank(emptyBlank?.id || null)
      }
    }
  }

  // 빈칸 클릭
  const handleBlankClick = (blankId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isComplete) {
      setSelectedBlank(blankId)
      setShowHint(null)
    }
  }

  // 빈칸 내용 지우기
  const clearBlank = (blankId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isComplete) {
      setFilledBlanks(prev => {
        const newBlanks = { ...prev }
        delete newBlanks[blankId]
        return newBlanks
      })
      setSelectedBlank(blankId)
      setShowResult(false)
    }
  }

  // 리셋
  const reset = () => {
    setFilledBlanks({})
    setSelectedBlank(blanks[0]?.id || null)
    setIsComplete(false)
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(null)
  }

  // 첫 빈칸 자동 선택
  useEffect(() => {
    if (blanks.length > 0 && !selectedBlank && !isComplete) {
      setSelectedBlank(blanks[0].id)
    }
  }, [blanks, selectedBlank, isComplete])

  // 들여쓰기 공백을 non-breaking space로 변환
  const preserveIndentation = (text: string) => {
    // 줄 시작의 공백을 &nbsp;로 변환
    const leadingSpaces = text.match(/^( +)/)
    if (leadingSpaces) {
      const spaces = leadingSpaces[1]
      const rest = text.slice(spaces.length)
      return (
        <>
          <span style={{ whiteSpace: 'pre' }}>{spaces}</span>
          <span>{rest}</span>
        </>
      )
    }
    return text
  }

  // 코드를 줄별로 파싱
  const renderCodeLines = () => {
    const lines = codeTemplate.split('\n')
    
    return lines.map((line, lineIdx) => {
      // 줄 시작 들여쓰기 계산
      const leadingSpaces = line.match(/^( *)/)
      const indent = leadingSpaces ? leadingSpaces[1].length : 0
      const trimmedLine = line.slice(indent)
      
      // 빈칸 찾기
      const blankRegex = /___(\d+)___/g
      const parts: React.ReactNode[] = []
      
      // 들여쓰기 추가
      if (indent > 0) {
        parts.push(
          <span key={`indent-${lineIdx}`} style={{ whiteSpace: 'pre' }} className="text-gray-100">
            {' '.repeat(indent)}
          </span>
        )
      }
      
      let lastIndex = 0
      let match
      
      while ((match = blankRegex.exec(trimmedLine)) !== null) {
        // 빈칸 전 텍스트
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${lineIdx}-${lastIndex}`} className="text-gray-100">
              {trimmedLine.slice(lastIndex, match.index)}
            </span>
          )
        }
        
        const blankId = match[1]
        const blank = blanks.find(b => b.id === blankId)
        const filled = filledBlanks[blankId]
        const isSelected = selectedBlank === blankId
        const isWrong = showResult && !isCorrect && filled && filled !== blank?.answer
        
        parts.push(
          <span
            key={`blank-${lineIdx}-${blankId}`}
            onClick={(e) => filled ? clearBlank(blankId, e) : handleBlankClick(blankId, e)}
            className={cn(
              "inline-flex items-center justify-center min-w-[70px] px-2 py-0.5 mx-1 rounded-md cursor-pointer transition-all relative group",
              filled ? (
                isWrong 
                  ? "bg-red-500 text-white border-2 border-red-400"
                  : isSelected
                    ? "bg-indigo-500 text-white border-2 border-indigo-300 ring-2 ring-indigo-400 ring-offset-1 ring-offset-gray-900"
                    : "bg-indigo-600 text-indigo-100 border-2 border-indigo-400 hover:border-indigo-300"
              ) : (
                isSelected
                  ? "bg-amber-500/30 border-2 border-amber-400 text-amber-300 animate-pulse"
                  : "bg-gray-700 border-2 border-dashed border-gray-500 text-gray-400 hover:border-gray-400"
              )
            )}
          >
            {filled ? (
              <>
                <span>{filled}</span>
                {!isComplete && (
                  <X className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </>
            ) : (
              <span className="text-sm">
                {isSelected ? "여기!" : "?"}
              </span>
            )}
          </span>
        )
        
        lastIndex = match.index + match[0].length
      }
      
      // 남은 텍스트
      if (lastIndex < trimmedLine.length) {
        parts.push(
          <span key={`text-${lineIdx}-end`} className="text-gray-100">
            {trimmedLine.slice(lastIndex)}
          </span>
        )
      }
      
      // 빈 줄 처리
      if (parts.length === 0 || (parts.length === 1 && indent === 0 && trimmedLine === '')) {
        parts.push(<span key={`empty-${lineIdx}`}>&nbsp;</span>)
      }
      
      return (
        <div key={lineIdx} className="flex items-start min-h-[28px]">
          <span className="w-6 text-gray-500 text-right mr-3 select-none text-sm flex-shrink-0 pt-0.5">
            {lineIdx + 1}
          </span>
          <span className="flex-1 flex items-center flex-wrap">
            {parts}
          </span>
        </div>
      )
    })
  }

  // 현재 선택된 빈칸의 힌트
  const currentHint = selectedBlank ? blanks.find(b => b.id === selectedBlank)?.hint : null

  return (
    <div className="bg-white rounded-2xl border-4 border-indigo-200 overflow-hidden shadow-lg">
      {/* 헤더 */}
      <div className="bg-indigo-50 px-3 py-2 md:px-4 md:py-3 border-b-2 border-indigo-100">
        <h3 className="font-bold text-indigo-700 text-base md:text-lg">{title}</h3>
        <p className="text-indigo-600 text-xs md:text-sm">{description}</p>
      </div>

      <div className="p-3 md:p-4 space-y-4">
        {/* 코드 영역 */}
        <div className="bg-gray-900 rounded-xl p-3 md:p-4 font-mono text-sm md:text-base overflow-x-auto">
          {renderCodeLines()}
        </div>

        {/* 힌트 (선택된 빈칸에 대한) */}
        {currentHint && !isComplete && (
          <div className="flex items-center gap-2 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-amber-700">힌트: {currentHint}</span>
          </div>
        )}

        {/* 선택지 */}
        {!isComplete && (
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-gray-500">
              👆 <span className="text-amber-600 font-medium">노란 빈칸</span>을 클릭하고, 아래에서 선택하세요:
            </p>
            <div className="flex flex-wrap gap-2">
              {choices.map((choice, idx) => {
                const isUsed = Object.values(filledBlanks).includes(choice)
                return (
                  <button
                    key={idx}
                    onClick={() => handleChoiceClick(choice)}
                    disabled={!selectedBlank || isUsed}
                    type="button"
                    className={cn(
                      "px-3 py-2 md:px-4 md:py-2.5 rounded-lg font-mono text-sm md:text-base font-medium transition-all",
                      !selectedBlank 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isUsed
                          ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:scale-105 active:scale-95 shadow-sm"
                    )}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 결과 */}
        {showResult && (
          <div className={cn(
            "rounded-xl p-3 md:p-4 border-2",
            isCorrect 
              ? "bg-green-50 border-green-300" 
              : "bg-red-50 border-red-300"
          )}>
            {isCorrect ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-700">정답이에요! 🎉</span>
              </div>
            ) : (
              <div>
                <p className="font-bold text-red-700 mb-1">다시 확인해보세요!</p>
                <p className="text-sm text-red-600">빨간색 빈칸을 클릭해서 다시 선택하세요.</p>
              </div>
            )}
            
            {isCorrect && expectedOutput && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-green-600 mb-1">실행 결과:</p>
                <pre className="font-mono text-sm text-green-700 bg-green-100 rounded p-2">
                  {expectedOutput}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 완료 메시지 */}
        {isComplete && (
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-3 md:p-4 text-center">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-indigo-700 font-bold text-sm md:text-base">잘했어요!</p>
          </div>
        )}

        {/* 버튼들 */}
        <div className="flex gap-2 justify-center">
          {allFilled && !isComplete && (
            <button
              onClick={checkAnswers}
              type="button"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              ✓ 정답 확인
            </button>
          )}
          
          {(showResult || Object.keys(filledBlanks).length > 0) && (
            <button
              onClick={reset}
              type="button"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              다시 하기
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
