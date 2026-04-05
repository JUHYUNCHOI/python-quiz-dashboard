"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface RepetitiveTypingProps {
  onComplete?: () => void
  lang?: "ko" | "en"
}

export function RepetitiveTyping({ onComplete, lang = "ko" }: RepetitiveTypingProps) {
  const isEn = lang === "en"
  const [currentLine, setCurrentLine] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [messageStep, setMessageStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const names = isEn
    ? ["Tom", "Anna", "Sam", "Jake", "Lucy", "Ben", "Mia", "Chris", "Lily", "Alex"]
    : ["철수", "영희", "민수", "지훈", "수진", "현우", "예린", "도현", "하나", "준서"]
  const baseMessage = isEn ? "Happy birthday! Hope you have a great day, " : "생일 축하해! 행복한 하루 보내, "
  
  // 줄별 타이핑 속도 (점점 빨라짐)
  const getTypingSpeed = (lineIndex: number) => {
    if (lineIndex < 2) return 50  // 처음 2줄: 천천히
    if (lineIndex < 4) return 30  // 그 다음 2줄: 조금 빠르게
    return 15  // 나머지: 더 빠르게
  }

  useEffect(() => {
    if (currentLine >= 3) {
      // 3줄 이후에는 메시지 표시하고 멈춤
      setShowMessage(true)
      setIsComplete(true)
      onComplete?.()
      return
    }

    const fullLine = `print("${baseMessage}${names[currentLine]}!")`
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex <= fullLine.length) {
        setTypedText(fullLine.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        // 줄 완료 후 다음 줄로
        setTimeout(() => {
          setCurrentLine(prev => prev + 1)
          setTypedText("")
        }, 300)
      }
    }, getTypingSpeed(currentLine))

    return () => clearInterval(typingInterval)
  }, [currentLine, onComplete])

  // 메시지 단계별 표시
  useEffect(() => {
    if (showMessage && messageStep < 2) {
      const timer = setTimeout(() => {
        setMessageStep(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showMessage, messageStep])

  // 자동 스크롤
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [typedText, currentLine])

  const completedLines = names.slice(0, currentLine).map((name, idx) => (
    `print("${baseMessage}${name}!")`
  ))

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border-4 border-gray-700">
      {/* 헤더 */}
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm ml-2">birthday_message.py</span>
      </div>

      {/* 코드 영역 */}
      <div 
        ref={containerRef}
        className="p-4 md:p-6 font-mono text-sm md:text-base max-h-[250px] overflow-y-auto"
      >
        {/* 완료된 줄들 */}
        {completedLines.map((line, idx) => (
          <div key={idx} className="flex">
            <span className="text-gray-500 w-8 select-none">{idx + 1}</span>
            <span className="text-yellow-300">{line}</span>
          </div>
        ))}

        {/* 현재 타이핑 중인 줄 */}
        {!isComplete && (
          <div className="flex">
            <span className="text-gray-500 w-8 select-none">{currentLine + 1}</span>
            <span className="text-yellow-300">
              {typedText}
              <span className="inline-block w-2 h-5 bg-yellow-300 ml-0.5 animate-pulse" />
            </span>
          </div>
        )}

        {/* 남은 줄 표시 (회색으로) */}
        {isComplete && (
          <>
            {names.slice(3).map((name, idx) => (
              <div key={idx + 3} className="flex opacity-30">
                <span className="text-gray-500 w-8 select-none">{idx + 4}</span>
                <span className="text-gray-500">{`print("${baseMessage}${name}!")`}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 스토리식 메시지 */}
      {showMessage && (
        <div className="border-t-2 border-amber-500 bg-gradient-to-b from-amber-500/20 to-amber-600/10">
          {/* 첫 번째 메시지: 상황 인식 */}
          <div className="p-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <span className="text-3xl">😰</span>
              <div>
                <p className="text-amber-200 font-bold text-lg">
                  {isEn ? "Still 7 more to go..." : "아직 7명이나 남았는데..."}
                </p>
                <p className="text-amber-300/80 text-sm mt-1">
                  {isEn ? "We need to write the same code 10 times!" : "같은 코드를 10번이나 써야 해요!"}
                </p>
              </div>
            </div>
          </div>

          {/* 두 번째 메시지: 질문 */}
          {messageStep >= 1 && (
            <div className="px-4 pb-4 animate-fadeIn">
              <div className="bg-indigo-600/30 rounded-xl p-4 border-2 border-indigo-400/50">
                <p className="text-indigo-200 font-bold text-base md:text-lg text-center">
                  {isEn ? "🤔 Do we really have to do it this way?" : "🤔 정말 이렇게만 해야 할까요?"}
                </p>
                {messageStep >= 2 && (
                  <p className="text-indigo-300 text-sm md:text-base text-center mt-2 animate-fadeIn">
                    {isEn ? <>Isn&apos;t there a way to <strong className="text-white">write less</strong> of the repeated part?</> : <>반복되는 부분을 <strong className="text-white">덜 쓰는 방법</strong>이 있지 않을까요?</>}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
