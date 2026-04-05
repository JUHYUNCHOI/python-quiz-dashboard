'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function TryExceptFlow({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [step, setStep] = useState(0)
  const [hasError, setHasError] = useState(true)

  const steps = hasError ? [
    { id: 0, label: isEn ? "Code execution starts!" : "코드 실행 시작!", highlight: "start", emoji: "▶️" },
    { id: 1, label: isEn ? "Entering try block" : "try 블록에 들어갑니다", highlight: "try", emoji: "📦" },
    { id: 2, label: isEn ? "Error occurred!" : "에러 발생!", highlight: "error", emoji: "💥" },
    { id: 3, label: isEn ? "except caught the error!" : "except가 에러를 잡았어요!", highlight: "except", emoji: "🛡️" },
    { id: 4, label: isEn ? "Program continues running!" : "프로그램이 계속 실행돼요!", highlight: "continue", emoji: "🎉" },
  ] : [
    { id: 0, label: isEn ? "Code execution starts!" : "코드 실행 시작!", highlight: "start", emoji: "▶️" },
    { id: 1, label: isEn ? "Entering try block" : "try 블록에 들어갑니다", highlight: "try", emoji: "📦" },
    { id: 2, label: isEn ? "No error! Success!" : "에러 없음! 성공!", highlight: "success", emoji: "✅" },
    { id: 3, label: isEn ? "except is skipped" : "except는 건너뜁니다", highlight: "skip", emoji: "⏭️" },
    { id: 4, label: isEn ? "Program continues running!" : "프로그램이 계속 실행돼요!", highlight: "continue", emoji: "🎉" },
  ]
  
  const currentStep = steps[step]
  const nextStep = () => { if (step < steps.length - 1) setStep(step + 1) }
  const reset = () => setStep(0)
  const toggleError = () => { setHasError(!hasError); setStep(0) }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-800">{isEn ? "🔄 Follow the code flow" : "🔄 코드 흐름 따라가기"}</h3>
        <button onClick={toggleError} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${hasError ? 'bg-red-100 text-red-600 hover:bg-red-200 border-2 border-red-300' : 'bg-green-100 text-green-600 hover:bg-green-200 border-2 border-green-300'}`}>
          {hasError ? (isEn ? '💥 Has error' : '💥 에러 있음') : (isEn ? '✅ No error' : '✅ 에러 없음')}
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-5 mb-5 font-mono text-base border-2 border-gray-200">
        <div className={`p-4 rounded-xl mb-3 transition-all duration-300 border-2 ${currentStep.highlight === 'try' || currentStep.highlight === 'error' || currentStep.highlight === 'success' ? 'bg-blue-50 border-blue-400 shadow-md shadow-blue-100' : 'bg-white border-gray-200'}`}>
          <div className="text-blue-600 font-bold text-lg mb-1">try:</div>
          <div className="pl-6 text-gray-700 text-base leading-relaxed">
            <div className="flex items-center gap-2">
              <span>숫자 = int(input())</span>
              <AnimatePresence>
                {currentStep.highlight === 'error' && (<motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-red-500 font-bold text-lg">{isEn ? "← 💥 Error here!" : "← 💥 여기서 에러!"}</motion.span>)}
                {currentStep.highlight === 'success' && (<motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-green-500 font-bold text-lg">{isEn ? "← ✅ Success!" : "← ✅ 성공!"}</motion.span>)}
              </AnimatePresence>
            </div>
            <div>print(숫자 * 2)</div>
          </div>
        </div>
        
        <div className={`p-4 rounded-xl transition-all duration-300 border-2 ${currentStep.highlight === 'except' ? 'bg-orange-50 border-orange-400 shadow-md shadow-orange-100' : currentStep.highlight === 'skip' ? 'bg-gray-100 border-gray-300 opacity-40' : 'bg-white border-gray-200'}`}>
          <div className="text-orange-600 font-bold text-lg mb-1">except:</div>
          <div className="pl-6 text-gray-700 text-base leading-relaxed flex items-center gap-2">
            <span>print(&apos;숫자를 입력하세요!&apos;)</span>
            <AnimatePresence>
              {currentStep.highlight === 'except' && (<motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-orange-500 font-bold text-lg">{isEn ? "← 🛡️ Handled here!" : "← 🛡️ 여기서 처리!"}</motion.span>)}
              {currentStep.highlight === 'skip' && (<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 font-bold">{isEn ? "← (skipped)" : "← (건너뜀)"}</motion.span>)}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <motion.div key={`${hasError}-${step}`} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-xl p-5 mb-5 flex items-center gap-4 border-2 ${currentStep.highlight === 'error' ? 'bg-red-50 border-red-300' : currentStep.highlight === 'except' ? 'bg-orange-50 border-orange-300' : currentStep.highlight === 'success' || currentStep.highlight === 'continue' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
        <span className="text-4xl">{currentStep.emoji}</span>
        <div>
          <div className="text-sm font-bold text-gray-500">Step {step + 1} / {steps.length}</div>
          <div className="text-xl font-black text-gray-800">{currentStep.label}</div>
        </div>
      </motion.div>
      
      <div className="flex gap-3">
        <button onClick={reset} className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-700 transition-colors border-2 border-gray-200">{isEn ? "🔄 Start over" : "🔄 처음"}</button>
        <button onClick={nextStep} disabled={step >= steps.length - 1} className="flex-1 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-lg transition-colors">
          {step >= steps.length - 1 ? (isEn ? '✅ Done!' : '✅ 완료!') : (isEn ? 'Next ▶️' : '다음 ▶️')}
        </button>
      </div>
    </div>
  )
}
