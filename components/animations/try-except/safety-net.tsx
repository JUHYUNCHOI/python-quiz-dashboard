'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

export function SafetyNetAnimation({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  /* 2026-09-05: 자동재생(setTimeout 체인)을 걷어내고 ◀▶ 수동으로.
     학생: "1초마다 휙휙 넘어가면 이해하기도 전에 다음 게 나와."
     본보기 = components/animations/py-split-join-visualizer.tsx */
  const PHASES = ['ready', 'falling', 'caught', 'safe'] as const
  const [i, setI] = useState(0)
  const phase = PHASES[i]

  const BEATS = isEn
    ? [
        "The acrobat is up on the try block. Nothing has gone wrong yet.",
        "Something breaks. Without a net, the program stops right here.",
        "except catches it. The error does not reach the ground.",
        "The program keeps going. That is what try-except buys you.",
      ]
    : [
        "곡예사가 try 블록 위에 있어요. 아직 아무 일도 없어요.",
        "에러가 났어요. 그물이 없으면 프로그램은 여기서 멈춰요.",
        "except 가 받아냈어요. 에러가 바닥까지 안 내려가요.",
        "프로그램이 계속 돌아요. try-except 가 해주는 일이에요.",
      ]

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-800 text-center mb-2">{isEn ? "🎪 try-except is a safety net!" : "🎪 try-except는 안전그물!"}</h3>
      <p className="text-center text-gray-500 mb-4">{isEn ? "Even if there's an error, the program keeps running" : "에러가 나도 프로그램이 안 꺼져요"}</p>
      
      <div className="relative bg-gradient-to-b from-sky-100 to-orange-50 rounded-2xl h-72 overflow-hidden border-2 border-gray-200">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-black text-lg shadow-lg">{isEn ? "try block" : "try 블록"}</div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-black text-xl mt-1">{isEn ? "Error!" : "에러 발생!"}</motion.div>
          )}
        </motion.div>
        
        <div className="absolute bottom-16 inset-x-6">
          <motion.div animate={phase === 'caught' ? { scaleY: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
            <div className="h-10 bg-orange-400/30 border-4 border-orange-400 rounded-b-[40px] border-dashed" />
          </motion.div>
          <div className="text-center mt-2">
            <span className="bg-orange-500 text-white px-5 py-1.5 rounded-full font-black text-base shadow-md">{isEn ? "except (safety net)" : "except (안전그물)"}</span>
          </div>
        </div>
        
        <AnimatePresence>
          {phase === 'safe' && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full font-black shadow-md">{isEn ? "✅ Program continues!" : "✅ 프로그램 계속 실행!"}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <div className="text-2xl mb-1">📦</div>
          <div className="font-black text-blue-700 text-base">{isEn ? "try = attempt" : "try = 시도"}</div>
          <div className="text-gray-600 text-sm">{isEn ? "Code that might fail" : "위험할 수 있는 코드"}</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="text-2xl mb-1">🛡️</div>
          <div className="font-black text-orange-700 text-base">{isEn ? "except = safety net" : "except = 안전그물"}</div>
          <div className="text-gray-600 text-sm">{isEn ? "Handle errors here!" : "에러 나면 여기서 처리!"}</div>
        </div>
      </div>
      
      {/* 말풍선 — 한 단계 한 문장 */}
      <div
        className="mt-4 min-h-[52px] rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800"
        style={{ wordBreak: 'keep-all', textWrap: 'balance' }}
      >
        {BEATS[i]}
      </div>

      {/* ◀ ▶ — 자동재생 없음 */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="rounded-lg bg-white p-2 text-purple-700 shadow border border-gray-200 disabled:opacity-30"
          aria-label={isEn ? 'Previous step' : '이전 단계'}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-mono text-sm text-gray-600">{i + 1} / {PHASES.length}</span>
        <button
          onClick={() => setI((v) => Math.min(PHASES.length - 1, v + 1))}
          disabled={i === PHASES.length - 1}
          className="rounded-lg bg-white p-2 text-purple-700 shadow border border-gray-200 disabled:opacity-30"
          aria-label={isEn ? 'Next step' : '다음 단계'}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setI(0)}
          className="ml-2 rounded-lg bg-white p-2 text-gray-500 shadow border border-gray-200"
          aria-label={isEn ? 'Back to start' : '처음으로'}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
