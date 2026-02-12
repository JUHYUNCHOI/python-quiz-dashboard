"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 붕어빵 틀(클래스) → 붕어빵(객체) 체험
// ============================================
export function ClassBoonguhAnimation() {
  const [objects, setObjects] = useState<{ id: number; name: string; filling: string; color: string }[]>([])
  const [step, setStep] = useState(0)

  const fillings = [
    { name: "용사", filling: "팥", color: "#dc2626" },
    { name: "마법사", filling: "슈크림", color: "#2563eb" },
    { name: "궁수", filling: "피자", color: "#16a34a" },
    { name: "힐러", filling: "초코", color: "#9333ea" },
  ]

  const handleCreate = () => {
    if (step >= fillings.length) return
    const f = fillings[step]
    setObjects(prev => [...prev, { id: step, ...f }])
    setStep(prev => prev + 1)
  }

  const handleReset = () => {
    setObjects([])
    setStep(0)
  }

  return (
    <div className="p-4 bg-gray-900 rounded-xl space-y-6">
      {/* 클래스 (틀) */}
      <div className="text-center">
        <div className="text-sm text-gray-400 mb-2">🍩 클래스 (붕어빵 틀)</div>
        <div className="inline-block bg-gray-800 border-2 border-yellow-500 rounded-xl px-6 py-4">
          <code className="text-yellow-300 text-sm">
            class Character:
          </code>
          <br />
          <code className="text-gray-400 text-xs ml-4">
            def __init__(s, name, hp):
          </code>
          <br />
          <code className="text-gray-400 text-xs ml-8">
            s.name = name
          </code>
          <br />
          <code className="text-gray-400 text-xs ml-8">
            s.hp = hp
          </code>
        </div>
      </div>

      {/* 찍기 버튼 */}
      <div className="text-center">
        {step < fillings.length ? (
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors text-lg"
          >
            🍩 {fillings[step].name} 찍어내기!
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
          >
            🔄 다시 해보기
          </button>
        )}
      </div>

      {/* 만들어진 객체들 */}
      <div className="min-h-[120px]">
        <div className="text-sm text-gray-400 mb-2 text-center">👇 객체 (붕어빵)</div>
        <div className="flex flex-wrap gap-3 justify-center">
          <AnimatePresence>
            {objects.map((obj) => (
              <motion.div
                key={obj.id}
                initial={{ scale: 0, y: -50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gray-800 border rounded-lg px-4 py-3 text-center"
                style={{ borderColor: obj.color }}
              >
                <div className="text-2xl mb-1">🍩</div>
                <div className="text-white font-bold text-sm">{obj.name}</div>
                <div className="text-xs mt-1" style={{ color: obj.color }}>
                  속: {obj.filling}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 코드 미리보기 */}
      {objects.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-lg p-3"
        >
          <div className="text-xs text-gray-400 mb-1">파이썬 코드:</div>
          {objects.map((obj) => (
            <div key={obj.id} className="text-xs font-mono" style={{ color: obj.color }}>
              {obj.name.toLowerCase()} = Character(&apos;{obj.name}&apos;, 100)
            </div>
          ))}
        </motion.div>
      )}

      {step >= fillings.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-yellow-300 text-sm font-bold"
        >
          🎉 틀 하나로 캐릭터 {objects.length}명 완성!
        </motion.div>
      )}
    </div>
  )
}

export default ClassBoonguhAnimation
