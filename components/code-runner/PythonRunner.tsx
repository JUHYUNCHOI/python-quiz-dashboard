"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Check, X, Loader2, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// Pyodide 타입 - Window 확장은 python-runner.tsx에서 선언됨

interface TestCase {
  input?: string
  expectedOutput?: string
  expectedVariable?: { name: string; value: any }
  description?: string
}

interface PythonRunnerProps {
  title: string
  description: string
  starterCode?: string
  testCases: TestCase[]
  hints?: string[]
}

export function PythonRunner({ 
  title, 
  description, 
  starterCode = "", 
  testCases,
  hints = []
}: PythonRunnerProps) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pyodide, setPyodide] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Pyodide 로드
  useEffect(() => {
    const loadPyodideModule = async () => {
      try {
        // Pyodide CDN에서 로드
        if (!window.loadPyodide) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
          script.async = true
          document.head.appendChild(script)
          
          await new Promise((resolve) => {
            script.onload = resolve
          })
        }
        
        const pyodideInstance = await window.loadPyodide()
        setPyodide(pyodideInstance)
        setIsLoading(false)
      } catch (error) {
        console.error('Pyodide 로드 실패:', error)
        setOutput('Python 환경 로드 실패. 페이지를 새로고침해주세요.')
        setIsLoading(false)
      }
    }
    
    loadPyodideModule()
  }, [])

  // 코드 실행
  const runCode = async () => {
    if (!pyodide || isRunning) return
    
    setIsRunning(true)
    setOutput("")
    setIsCorrect(null)
    
    try {
      // stdout 캡처
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `)
      
      // 사용자 코드 실행
      pyodide.runPython(code)
      
      // 출력 가져오기
      const stdout = pyodide.runPython(`sys.stdout.getvalue()`)
      setOutput(stdout || "(출력 없음)")
      
      // 체점
      let allPassed = true
      for (const testCase of testCases) {
        if (testCase.expectedOutput !== undefined) {
          // 출력값 비교
          const actualOutput = stdout.trim()
          const expectedOutput = testCase.expectedOutput.trim()
          if (actualOutput !== expectedOutput) {
            allPassed = false
            break
          }
        }
        
        if (testCase.expectedVariable) {
          // 변수값 비교
          const varValue = pyodide.globals.get(testCase.expectedVariable.name)
          if (varValue !== testCase.expectedVariable.value) {
            allPassed = false
            break
          }
        }
      }
      
      setIsCorrect(allPassed)
      
    } catch (error: any) {
      setOutput(`❌ 오류: ${error.message}`)
      setIsCorrect(false)
    } finally {
      setIsRunning(false)
    }
  }

  // 리셋
  const reset = () => {
    setCode(starterCode)
    setOutput("")
    setIsCorrect(null)
    setShowHint(false)
    setCurrentHint(0)
  }

  // 힌트 보기
  const nextHint = () => {
    if (!showHint) {
      setShowHint(true)
    } else if (currentHint < hints.length - 1) {
      setCurrentHint(prev => prev + 1)
    }
  }

  // Tab 키 처리 (들여쓰기)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // IME composition 중에는 skip — 한글 조합 완료 키가 Tab/Enter 로 잘못 잡히지 않게
    if ((e.nativeEvent as KeyboardEvent)?.isComposing || e.keyCode === 229) return
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      // 커서 위치 조정
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4
        }
      }, 0)
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-white">
        <h3 className="font-bold text-lg">🐍 {title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
      
      {/* 코드 에디터 */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={cn(
              "w-full min-h-40 h-40 p-3 font-mono text-sm rounded-lg border-2 resize-y",
              "bg-gray-900 text-green-400",
              "focus:outline-none focus:border-blue-500",
              isLoading && "opacity-50"
            )}
            placeholder="여기에 Python 코드를 입력하세요..."
            spellCheck={false}
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
              <div className="text-white flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Python 환경 로딩 중...
              </div>
            </div>
          )}
        </div>
        
        {/* 버튼들 */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={runCode}
            disabled={isLoading || isRunning}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white transition-all",
              "bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
            )}
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            실행 & 체점
          </button>
          
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white bg-gray-500 hover:bg-gray-600"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          
          {hints.length > 0 && (
            <button
              onClick={nextHint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-amber-700 bg-amber-100 hover:bg-amber-200"
            >
              💡 힌트 {showHint && `(${currentHint + 1}/${hints.length})`}
            </button>
          )}
        </div>
        
        {/* 힌트 */}
        {showHint && hints.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              💡 <strong>힌트 {currentHint + 1}:</strong> {hints[currentHint]}
            </p>
          </div>
        )}
        
        {/* 출력 결과 */}
        {output && (
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-600">📤 실행 결과:</div>
            <div className={cn(
              "p-3 rounded-lg font-mono text-sm whitespace-pre-wrap",
              "bg-slate-100 border-2 border-slate-200"
            )}>
              {output}
            </div>
          </div>
        )}
        
        {/* 체점 결과 */}
        {isCorrect !== null && (
          <div className={cn(
            "p-4 rounded-xl flex items-center gap-3 font-bold",
            isCorrect 
              ? "bg-green-100 border-2 border-green-400 text-green-800" 
              : "bg-red-100 border-2 border-red-400 text-red-800"
          )}>
            {isCorrect ? (
              <>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg">🎉 정답입니다!</div>
                  <div className="text-sm font-normal">잘했어요!</div>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg">다시 시도해보세요!</div>
                  <div className="text-sm font-normal">힌트를 확인해보세요</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
