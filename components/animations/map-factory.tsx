"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, Factory, Package } from "lucide-react"

// ============================================
// MapFactory - map() 공장 시각화
// ============================================
export function MapFactoryVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [processedItems, setProcessedItems] = useState<number[]>([])
  
  const inputItems = ["'1'", "'2'", "'3'", "'4'"]
  const outputItems = ["1", "2", "3", "4"]
  
  const totalSteps = inputItems.length + 1 // 4개 처리 + 완료
  
  useEffect(() => {
    if (!isPlaying) return
    
    if (step < totalSteps) {
      const timer = setTimeout(() => {
        if (step < inputItems.length) {
          setProcessedItems(prev => [...prev, step])
        }
        setStep(step + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsPlaying(false)
    }
  }, [isPlaying, step, totalSteps])
  
  const reset = () => {
    setStep(0)
    setProcessedItems([])
    setIsPlaying(false)
  }
  
  const start = () => {
    reset()
    setTimeout(() => setIsPlaying(true), 100)
  }
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{isEn ? "🏭 map() factory" : "🏭 map() 공장"}</h3>
        <p className="text-gray-600">{isEn ? "string → integer conversion!" : "문자열 → 정수 변환!"}</p>
        <code className="text-sm bg-gray-800 text-yellow-300 px-3 py-1 rounded-lg mt-2 inline-block">
          list(map(int, ["'1'", "'2'", "'3'", "'4'"]))
        </code>
      </div>
      
      {/* 공장 시각화 */}
      <div className="relative h-64 bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        {/* 입력 컨베이어 벨트 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500 mb-1">{isEn ? "📥 Input" : "📥 입력"}</span>
          {inputItems.map((item, idx) => (
            <motion.div
              key={`input-${idx}`}
              initial={{ opacity: 1, x: 0 }}
              animate={{
                opacity: processedItems.includes(idx) ? 0 : 1,
                x: processedItems.includes(idx) ? 80 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-amber-100 border-2 border-amber-400 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-amber-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        {/* 공장 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              scale: step > 0 && step <= inputItems.length ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center shadow-xl"
          >
            <Factory className="w-10 h-10 text-white mb-1" />
            <span className="text-white font-bold text-lg">int()</span>
            <span className="text-indigo-200 text-xs">{isEn ? "Converting..." : "변환 중..."}</span>
          </motion.div>
          
          {/* 처리 중인 아이템 */}
          <AnimatePresence>
            {step > 0 && step <= inputItems.length && (
              <motion.div
                key={`processing-${step}`}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
              >
                <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-white animate-bounce">
                  {inputItems[step - 1]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* 출력 컨베이어 벨트 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500 mb-1">{isEn ? "📤 Output" : "📤 출력"}</span>
          {outputItems.map((item, idx) => (
            <motion.div
              key={`output-${idx}`}
              initial={{ opacity: 0, scale: 0.5, x: -80 }}
              animate={{
                opacity: processedItems.includes(idx) ? 1 : 0,
                scale: processedItems.includes(idx) ? 1 : 0.5,
                x: processedItems.includes(idx) ? 0 : -80,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 bg-green-100 border-2 border-green-500 rounded-lg flex items-center justify-center font-mono text-lg font-bold text-green-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        {/* 화살표들 */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
          →
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
          →
        </div>
      </div>
      
      {/* 결과 */}
      {step >= totalSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-100 border-2 border-green-400 rounded-xl p-4 text-center"
        >
          <p className="text-green-700 font-bold text-lg mb-2">{isEn ? "✅ Conversion complete!" : "✅ 변환 완료!"}</p>
          <code className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg text-lg">
            [1, 2, 3, 4]
          </code>
        </motion.div>
      )}
      
      {/* 컨트롤 버튼 */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={start}
          disabled={isPlaying}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-400 text-white font-bold rounded-xl transition-colors"
        >
          <Play className="w-5 h-5" />
          {step === 0 ? (isEn ? "Start!" : "시작!") : (isEn ? "Watch again" : "다시 보기")}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          {isEn ? "Reset" : "리셋"}
        </button>
      </div>
      
      {/* 설명 */}
      <div className="mt-4 bg-indigo-100 rounded-xl p-4">
        <p className="text-indigo-800 text-sm">
          <strong>{isEn ? "💡 How map() works:" : "💡 map() 작동 원리:"}</strong><br />
          {isEn ? "1. Takes each element from the list one by one" : "1. 리스트의 각 요소를 하나씩 꺼냄"}<br />
          {isEn ? "2. Converts it with int()" : "2. int() 함수로 변환"}<br />
          {isEn ? "3. Stores in a new list!" : "3. 새 리스트에 저장!"}
        </p>
      </div>
    </div>
  )
}
