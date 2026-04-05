'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'menu' | 'playing' | 'input' | 'crash' | 'safe'

export function GameCrashDemo({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [hasTryExcept, setHasTryExcept] = useState(false)
  const [phase, setPhase] = useState<Phase>('menu')
  const [score, setScore] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')
  const [glitchText, setGlitchText] = useState(false)

  useEffect(() => {
    if (phase === 'crash') {
      setGlitchText(true)
      const timer = setTimeout(() => setGlitchText(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const startGame = () => {
    setPhase('playing')
    setScore(0)
    setMessage(isEn ? 'Guess the number!' : '숫자를 맞춰보세요!')
    setTimeout(() => setPhase('input'), 800)
  }

  const handleInput = (value: string) => {
    setInputValue(value)
    
    if (value === 'abc' || value === '문자') {
      if (hasTryExcept) {
        setMessage(isEn ? '🛡️ except caught it! "Numbers only please!" Game continues!' : '🛡️ except가 잡았어요! "숫자만 입력해주세요!" 게임 계속!')
        setPhase('safe')
        setTimeout(() => {
          setPhase('input')
          setInputValue('')
          setMessage(isEn ? 'Enter a number again!' : '다시 숫자를 입력하세요!')
        }, 2000)
      } else {
        setMessage(isEn ? '💥 ValueError! Program terminated!' : '💥 ValueError! 프로그램 종료!')
        setPhase('crash')
      }
    } else {
      setScore(prev => prev + 10)
      setMessage(isEn ? '✅ Correct! +10 points' : '✅ 정답! +10점')
      setPhase('safe')
      setTimeout(() => {
        setPhase('input')
        setInputValue('')
        setMessage(isEn ? 'Enter the next number!' : '다음 숫자를 입력하세요!')
      }, 1500)
    }
  }

  const reset = () => {
    setPhase('menu')
    setScore(0)
    setInputValue('')
    setMessage('')
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-black text-gray-800">{isEn ? "🎮 Game Crash Experience!" : "🎮 게임 크래시 체험!"}</h3>
        <button
          onClick={() => { setHasTryExcept(!hasTryExcept); reset() }}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
            hasTryExcept
              ? 'bg-green-100 text-green-700 border-green-300'
              : 'bg-red-100 text-red-700 border-red-300'
          }`}
        >
          {hasTryExcept ? '🛡️ try-except ON' : '❌ try-except OFF'}
        </button>
      </div>

      {/* 게임 화면 */}
      <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${
        phase === 'crash' ? 'border-red-400 bg-gray-900' : 'border-gray-200 bg-gradient-to-b from-indigo-50 to-white'
      }`} style={{ minHeight: 240 }}>
        
        {/* 스코어 */}
        <AnimatePresence>
          {phase !== 'menu' && phase !== 'crash' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-3 right-3 bg-amber-100 border-2 border-amber-300 px-3 py-1 rounded-full"
            >
              <span className="font-black text-amber-700">⭐ {score}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메뉴 */}
        {phase === 'menu' && (
          <div className="flex flex-col items-center justify-center h-60 gap-4">
            <div className="text-6xl">🎮</div>
            <div className="text-xl font-black text-gray-800">{isEn ? "Number Guessing Game" : "숫자 맞추기 게임"}</div>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              {isEn ? "▶️ Start game!" : "▶️ 게임 시작!"}
            </button>
          </div>
        )}

        {/* 입력 */}
        {(phase === 'input' || phase === 'playing' || phase === 'safe') && (
          <div className="flex flex-col items-center justify-center h-60 gap-4 p-4">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center font-bold text-lg ${
                phase === 'safe' ? 'text-green-600' : 'text-gray-700'
              }`}
            >
              {message}
            </motion.div>
            
            {phase === 'input' && (
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm text-gray-500 font-bold">{isEn ? "Which input will you try?" : "어떤 입력을 해볼까요?"}</div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInput('5')}
                    className="px-5 py-3 bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-xl font-bold text-green-700 transition-colors"
                  >
                    {isEn ? '🔢 Number "5"' : '🔢 숫자 "5"'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInput('abc')}
                    className="px-5 py-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-xl font-bold text-red-700 transition-colors"
                  >
                    {isEn ? '💣 Text "abc"' : '💣 문자 "abc"'}
                  </motion.button>
                </div>
              </div>
            )}

            {phase === 'safe' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-4xl"
              >
                {hasTryExcept ? '🛡️' : '🎉'}
              </motion.div>
            )}
          </div>
        )}

        {/* 크래시 */}
        {phase === 'crash' && (
          <div className="flex flex-col items-center justify-center h-60 gap-3">
            <motion.div
              animate={{ opacity: glitchText ? [1, 0, 1, 0, 1] : 1 }}
              transition={{ duration: 0.3, repeat: glitchText ? 3 : 0 }}
            >
              <div className="text-6xl mb-2">💥</div>
              <div className="text-red-500 font-mono font-bold text-lg text-center">
                ValueError: invalid literal<br />for int() with base 10
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-red-400 font-black text-xl"
            >
              {isEn ? "Game force quit! 😭" : "게임 강제 종료! 😭"}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-gray-500 text-sm"
            >
              {isEn ? `All ${score} points lost...` : `점수 ${score}점 전부 날아갔어요...`}
            </motion.div>
          </div>
        )}
      </div>

      {/* 코드 미리보기 */}
      <div className={`mt-4 p-4 rounded-xl border-2 font-mono text-sm ${
        hasTryExcept ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="text-xs font-bold text-gray-400 mb-2">{isEn ? "Current code:" : "현재 코드:"}</div>
        {hasTryExcept ? (
          <div className="text-gray-700 leading-relaxed">
            <div><span className="text-blue-600 font-bold">try:</span></div>
            <div className="pl-4">추측 = int(input())</div>
            <div><span className="text-orange-600 font-bold">except ValueError:</span></div>
            <div className="pl-4">print(&apos;{isEn ? 'Numbers only please!' : '숫자만 입력해주세요!'}&apos;) <span className="text-green-500">← 🛡️</span></div>
          </div>
        ) : (
          <div className="text-gray-700 leading-relaxed">
            <div>추측 = int(input()) <span className="text-red-500">{isEn ? "← 💥 Error = game over!" : "← 💥 에러나면 끝!"}</span></div>
          </div>
        )}
      </div>

      {/* 리셋 */}
      {phase === 'crash' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={reset}
          className="w-full mt-4 px-5 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-lg transition-colors"
        >
          {isEn ? "🔄 Try again (turn on try-except!)" : "🔄 다시 시도 (try-except 켜보세요!)"}
        </motion.button>
      )}
    </div>
  )
}
