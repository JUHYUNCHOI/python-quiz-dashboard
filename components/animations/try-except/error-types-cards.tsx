'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ErrorTypesCards() {
  const [selectedError, setSelectedError] = useState<string | null>(null)
  
  const errors = [
    {
      id: 'value', name: 'ValueError', emoji: '🔢',
      bgColor: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-700', selectedBg: 'bg-purple-100',
      desc: '값이 이상해!', example: "int('abc')", explanation: "문자 'abc'를 숫자로 바꿀 수 없어요!"
    },
    {
      id: 'zero', name: 'ZeroDivisionError', emoji: '➗',
      bgColor: 'bg-red-50', borderColor: 'border-red-300', textColor: 'text-red-700', selectedBg: 'bg-red-100',
      desc: '0으로 나누기!', example: "10 / 0", explanation: "수학에서 0으로 나누는 건 불가능!"
    },
    {
      id: 'file', name: 'FileNotFoundError', emoji: '📁',
      bgColor: 'bg-amber-50', borderColor: 'border-amber-300', textColor: 'text-amber-700', selectedBg: 'bg-amber-100',
      desc: '파일이 없어!', example: "open('없는파일.txt')", explanation: "그런 이름의 파일이 없어요!"
    }
  ]

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-800 mb-2">📋 에러 종류</h3>
      <p className="text-gray-500 mb-4">카드를 클릭해서 자세히 알아보세요!</p>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {errors.map((error) => (
          <motion.button
            key={error.id}
            onClick={() => setSelectedError(selectedError === error.id ? null : error.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-5 rounded-xl transition-all border-2 text-left ${selectedError === error.id ? `${error.selectedBg} ${error.borderColor} shadow-lg` : `${error.bgColor} ${error.borderColor}`}`}
          >
            <div className="text-4xl mb-2">{error.emoji}</div>
            <div className={`font-black text-base ${error.textColor}`}>{error.name}</div>
            <div className="text-sm text-gray-600 mt-1 font-medium">{error.desc}</div>
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedError && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            {errors.filter(e => e.id === selectedError).map(error => (
              <div key={error.id} className={`${error.selectedBg} rounded-xl p-5 border-2 ${error.borderColor}`}>
                <div className="font-mono text-lg bg-white rounded-lg p-4 mb-3 font-bold text-gray-800 border border-gray-200">{error.example}</div>
                <div className="text-base font-bold text-gray-700 flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <span>{error.explanation}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
