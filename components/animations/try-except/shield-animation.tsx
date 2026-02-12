'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ShieldAnimation() {
  const [phase, setPhase] = useState<'ready' | 'attacking' | 'impact' | 'shatter' | 'safe'>('ready')
  
  const play = () => {
    setPhase('attacking')
    setTimeout(() => setPhase('impact'), 800)
    setTimeout(() => setPhase('shatter'), 1200)
    setTimeout(() => setPhase('safe'), 2000)
    setTimeout(() => setPhase('ready'), 4000)
  }

  const shrapnel = [
    { x: -60, y: -50, r: -45 }, { x: -80, y: 10, r: 30 }, { x: -50, y: 50, r: -60 },
    { x: -90, y: -20, r: 55 }, { x: -40, y: 30, r: -35 }, { x: -70, y: -40, r: 70 },
  ]

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-800 text-center mb-2">🛡️ except가 에러를 막아줘요!</h3>
      <p className="text-center text-gray-500 mb-4">에러가 와도 프로그램은 안전해요</p>
      
      <div className="relative bg-gradient-to-r from-red-50 via-white to-green-50 rounded-2xl h-64 overflow-hidden border-2 border-gray-200">
        <motion.div animate={phase === 'impact' ? { x: [0, -6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center">
          {/* 대기 상태 에러 */}
          <AnimatePresence>
            {phase === 'ready' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-6 top-1/2 -translate-y-1/2 text-center">
                <div className="text-5xl">⚠️</div>
                <div className="text-red-500 font-black text-sm mt-1">에러</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 에러 돌진 */}
          <AnimatePresence>
            {phase === 'attacking' && (
              <motion.div initial={{ left: '8%', top: '50%', scale: 1, opacity: 1 }} animate={{ left: '42%', scale: 1.4 }} transition={{ duration: 0.8, ease: [0.4, 0, 1, 1] }} className="absolute -translate-y-1/2 -translate-x-1/2 z-10">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }} className="text-6xl">💥</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1] }} transition={{ duration: 0.3, repeat: Infinity }} className="text-red-600 font-black text-lg text-center mt-1">ValueError!</motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 충돌 파편 */}
          <AnimatePresence>
            {(phase === 'impact' || phase === 'shatter') && (
              <>
                {shrapnel.map((s, i) => (
                  <motion.div key={i} initial={{ left: '46%', top: '50%', opacity: 1, scale: 1 }} animate={{ left: `calc(46% + ${s.x}px)`, top: `calc(50% + ${s.y}px)`, opacity: 0, scale: 0.3, rotate: s.r }} transition={{ duration: 0.8, ease: 'easeOut' }} className="absolute text-2xl -translate-x-1/2 -translate-y-1/2">
                    {['💢', '⚡', '✴️', '❌', '🔥', '💫'][i]}
                  </motion.div>
                ))}
                <motion.div initial={{ left: '46%', top: '50%', scale: 0, opacity: 1 }} animate={{ scale: [0, 3, 0], opacity: [1, 0.8, 0] }} transition={{ duration: 0.5 }} className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-yellow-300 z-20" />
              </>
            )}
          </AnimatePresence>
          
          {/* 방패 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <motion.div animate={phase === 'impact' ? { scale: [1, 1.4, 1.1], rotate: [0, -8, 5, 0] } : phase === 'shatter' ? { scale: 1.1 } : phase === 'safe' ? { scale: [1.1, 1] } : {}} transition={{ duration: phase === 'impact' ? 0.4 : 0.3 }}>
              <div className={`text-8xl transition-all ${(phase === 'impact' || phase === 'shatter') ? 'drop-shadow-[0_0_20px_rgba(251,146,60,0.7)]' : ''}`}>🛡️</div>
            </motion.div>
            <motion.div animate={phase === 'impact' ? { scale: [1, 1.2, 1] } : {}} className="bg-orange-500 text-white px-5 py-1.5 rounded-full font-black text-base mt-1 shadow-lg inline-block">except</motion.div>
          </div>
          
          {/* 프로그램 */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
            <motion.div animate={phase === 'attacking' ? { x: [0, 3, -3, 2, -2, 0] } : phase === 'impact' ? { x: [0, 5, -5, 0] } : phase === 'safe' ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5, repeat: phase === 'attacking' ? Infinity : 0 }}>
              <div className="text-6xl">{phase === 'attacking' ? '😨' : phase === 'impact' || phase === 'shatter' ? '😲' : phase === 'safe' ? '😄' : '🎮'}</div>
            </motion.div>
            <div className="text-green-700 font-black text-sm mt-1">프로그램</div>
            <AnimatePresence>
              {phase === 'safe' && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500 text-white px-3 py-1 rounded-full font-black text-sm mt-1 shadow-md">무사! ✅</motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      <motion.div key={phase} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`text-center text-lg font-black mt-4 py-3 rounded-xl ${phase === 'attacking' ? 'bg-red-100 text-red-600 border-2 border-red-300' : phase === 'impact' || phase === 'shatter' ? 'bg-orange-100 text-orange-600 border-2 border-orange-300' : phase === 'safe' ? 'bg-green-100 text-green-600 border-2 border-green-300' : 'bg-gray-50 text-gray-500 border-2 border-gray-200'}`}>
        {phase === 'ready' ? '버튼을 눌러 에러를 보내보세요!' : phase === 'attacking' ? '🚀 에러가 돌진해요!' : phase === 'impact' || phase === 'shatter' ? '💥 쾅! except가 막았어요!' : '🎉 프로그램은 안전하게 계속 실행!'}
      </motion.div>
      
      <button onClick={play} disabled={phase !== 'ready'} className="w-full mt-4 px-5 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-black text-lg transition-colors shadow-lg">
        {phase === 'ready' ? '💥 에러 발사!' : '진행 중...'}
      </button>
    </div>
  )
}
