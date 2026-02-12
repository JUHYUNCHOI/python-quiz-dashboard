'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type InputType = 'number' | 'text' | 'zero'

const scenarios: { id: InputType; label: string; emoji: string; input: string; color: string }[] = [
  { id: 'number', label: '숫자 입력', emoji: '✅', input: '5', color: 'green' },
  { id: 'text', label: '문자 입력', emoji: '🔢', input: "'abc'", color: 'purple' },
  { id: 'zero', label: '0 입력', emoji: '➗', input: '0', color: 'red' },
]

export function MultiExceptFlow() {
  const [selected, setSelected] = useState<InputType | null>(null)
  const [step, setStep] = useState(0)

  const getSteps = (type: InputType) => {
    if (type === 'number') return [
      { label: 'try 블록 실행', emoji: '📦', area: 'try', detail: 'x = int("5") → 성공!' },
      { label: '10 / 5 계산', emoji: '🔢', area: 'try', detail: 'print(10 / 5) → 2.0' },
      { label: 'except 모두 건너뜀!', emoji: '⏭️', area: 'skip', detail: '에러가 없어서 except 실행 안 됨' },
      { label: '결과: 2.0 출력!', emoji: '🎉', area: 'done', detail: '정상 실행 완료!' },
    ]
    if (type === 'text') return [
      { label: 'try 블록 실행', emoji: '📦', area: 'try', detail: "x = int('abc') 시도..." },
      { label: '💥 ValueError 발생!', emoji: '💥', area: 'error', detail: "'abc'는 숫자가 아니에요!" },
      { label: 'except ValueError가 잡음!', emoji: '🛡️', area: 'value', detail: "'숫자 아님!' 출력" },
      { label: 'ZeroDivisionError는 건너뜀', emoji: '⏭️', area: 'skip-zero', detail: '이 에러가 아니라서 패스' },
    ]
    return [
      { label: 'try 블록 실행', emoji: '📦', area: 'try', detail: 'x = int("0") → 성공!' },
      { label: '10 / 0 계산 시도...', emoji: '💥', area: 'error-zero', detail: '0으로 나누기 불가!' },
      { label: 'ValueError는 건너뜀', emoji: '⏭️', area: 'skip-value', detail: '이 에러가 아니라서 패스' },
      { label: 'except ZeroDivisionError가 잡음!', emoji: '🛡️', area: 'zero', detail: "'0 안돼!' 출력" },
    ]
  }

  const currentSteps = selected ? getSteps(selected) : []
  const currentStep = currentSteps[step]

  const handleSelect = (type: InputType) => {
    setSelected(type)
    setStep(0)
  }

  const nextStep = () => {
    if (step < currentSteps.length - 1) setStep(step + 1)
  }

  const reset = () => {
    setSelected(null)
    setStep(0)
  }

  const getBlockStyle = (area: string) => {
    if (!currentStep) return 'bg-white border-gray-200'
    const a = currentStep.area
    if (area === 'try' && (a === 'try' || a === 'error' || a === 'error-zero'))
      return 'bg-blue-50 border-blue-400 shadow-md'
    if (area === 'value' && a === 'value')
      return 'bg-purple-50 border-purple-400 shadow-md'
    if (area === 'zero' && a === 'zero')
      return 'bg-red-50 border-red-400 shadow-md'
    if (area === 'value' && a === 'skip-value')
      return 'bg-gray-50 border-gray-300 opacity-40'
    if (area === 'zero' && a === 'skip-zero')
      return 'bg-gray-50 border-gray-300 opacity-40'
    if ((area === 'value' || area === 'zero') && a === 'skip')
      return 'bg-gray-50 border-gray-300 opacity-40'
    return 'bg-white border-gray-200'
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-800 mb-2">🎯 여러 except 흐름 따라가기</h3>
      <p className="text-gray-500 mb-4">입력값에 따라 어떤 except가 실행되는지 확인!</p>

      {/* 시나리오 선택 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {scenarios.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-xl border-2 transition-all text-center font-bold ${
              selected === s.id
                ? s.color === 'green' ? 'bg-green-100 border-green-400 shadow-lg'
                : s.color === 'purple' ? 'bg-purple-100 border-purple-400 shadow-lg'
                : 'bg-red-100 border-red-400 shadow-lg'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-3xl mb-1">{s.emoji}</div>
            <div className="text-sm">{s.label}</div>
            <div className="text-xs text-gray-500 font-mono mt-1">input: {s.input}</div>
          </motion.button>
        ))}
      </div>

      {/* 코드 블록 */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm border-2 border-gray-200 space-y-2">
        <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${getBlockStyle('try')}`}>
          <span className="text-blue-600 font-bold">try:</span>
          <div className="pl-4 text-gray-700 leading-relaxed">
            <div className="flex items-center gap-2">
              x = int(input())
              <AnimatePresence>
                {currentStep?.area === 'error' && (
                  <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-purple-500 font-bold text-xs">← 💥 ValueError!</motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              print(10 / x)
              <AnimatePresence>
                {currentStep?.area === 'error-zero' && (
                  <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 font-bold text-xs">← 💥 ZeroDivisionError!</motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${getBlockStyle('value')}`}>
          <span className="text-purple-600 font-bold">except ValueError:</span>
          <div className="pl-4 text-gray-700 flex items-center gap-2">
            print(&apos;숫자 아님!&apos;)
            <AnimatePresence>
              {currentStep?.area === 'value' && (
                <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-purple-500 font-bold text-xs">← 🛡️ 여기서 처리!</motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${getBlockStyle('zero')}`}>
          <span className="text-red-600 font-bold">except ZeroDivisionError:</span>
          <div className="pl-4 text-gray-700 flex items-center gap-2">
            print(&apos;0 안돼!&apos;)
            <AnimatePresence>
              {currentStep?.area === 'zero' && (
                <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 font-bold text-xs">← 🛡️ 여기서 처리!</motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 현재 상태 표시 */}
      <AnimatePresence mode="wait">
        {currentStep ? (
          <motion.div
            key={`${selected}-${step}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`rounded-xl p-4 mb-4 border-2 ${
              currentStep.area.includes('error') ? 'bg-red-50 border-red-300'
              : currentStep.area === 'value' ? 'bg-purple-50 border-purple-300'
              : currentStep.area === 'zero' ? 'bg-red-50 border-red-300'
              : currentStep.area === 'done' ? 'bg-green-50 border-green-300'
              : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentStep.emoji}</span>
              <div>
                <div className="text-xs font-bold text-gray-400">Step {step + 1}/{currentSteps.length}</div>
                <div className="font-black text-gray-800">{currentStep.label}</div>
                <div className="text-sm text-gray-600">{currentStep.detail}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-4 mb-4 bg-gray-50 border-2 border-gray-200 text-center text-gray-400 font-bold">
            👆 위에서 입력값을 선택하세요!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button onClick={reset} className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-700 border-2 border-gray-200">🔄 초기화</button>
        <button
          onClick={nextStep}
          disabled={!selected || step >= currentSteps.length - 1}
          className="flex-1 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors"
        >
          {!selected ? '입력값 선택!' : step >= currentSteps.length - 1 ? '✅ 완료!' : '다음 ▶️'}
        </button>
      </div>
    </div>
  )
}
