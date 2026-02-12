'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SafetyNetAnimation() {
  const [phase, setPhase] = useState<'ready' | 'falling' | 'caught' | 'safe'>('ready')
  
  const play = () => {
    setPhase('falling')
    setTimeout(() => setPhase('caught'), 1200)
    setTimeout(() => setPhase('safe'), 2200)
    setTimeout(() => setPhase('ready'), 4000)
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-800 text-center mb-2">🎪 try-except는 안전그물!</h3>
      <p className="text-center text-gray-500 mb-4">에러가 나도 프로그램이 안 꺼져요</p>
      
      <div className="relative bg-gradient-to-b from-sky-100 to-orange-50 rounded-2xl h-72 overflow-hidden border-2 border-gray-200">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-black text-lg shadow-lg">try 블록</div>
        <div className="absolute top-14 left-1/2 w-0.5 h-10 bg-gray-300" />
        
        <motion.div
          animate={phase === 'ready' ? { y: 0 } : phase === 'falling' ? { y: 120 } : { y: 120 }}
          transition={{ duration: phase === 'falling' ? 1.2 : 0.3, ease: phase === 'falling' ? [0.2, 0, 1, 1] : 'easeOut' }}
          className="absolute top-20 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="text-6xl">
            {phase === 'ready' ? '🤸' : phase === 'falling' ? '😱' : phase === 'caught' ? '😮' : '😊'}
          </div>
          {phase === 'falling' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-black text-xl mt-1">에러 발생!</motion.div>
          )}
        </motion.div>
        
        <div className="absolute bottom-16 inset-x-6">
          <motion.div animate={phase === 'caught' ? { scaleY: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
            <div className="h-10 bg-orange-400/30 border-4 border-orange-400 rounded-b-[40px] border-dashed" />
          </motion.div>
          <div className="text-center mt-2">
            <span className="bg-orange-500 text-white px-5 py-1.5 rounded-full font-black text-base shadow-md">except (안전그물)</span>
          </div>
        </div>
        
        <AnimatePresence>
          {phase === 'safe' && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full font-black shadow-md">✅ 프로그램 계속 실행!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="text-2xl mb-1">📦</div>
          <div className="font-black text-blue-700 text-base">try = 시도</div>
          <div className="text-gray-600 text-sm">위험할 수 있는 코드</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="text-2xl mb-1">🛡️</div>
          <div className="font-black text-orange-700 text-base">except = 안전그물</div>
          <div className="text-gray-600 text-sm">에러 나면 여기서 처리!</div>
        </div>
      </div>
      
      <button onClick={play} disabled={phase !== 'ready'} className="w-full mt-4 px-5 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-black text-lg transition-colors">
        {phase === 'ready' ? '▶️ 애니메이션 시작!' : phase === 'falling' ? '😱 떨어지는 중...' : phase === 'caught' ? '🛡️ 잡았다!' : '🎉 안전!'}
      </button>
    </div>
  )
}
