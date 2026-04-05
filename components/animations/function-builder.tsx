"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, RotateCcw } from "lucide-react"

interface FunctionBuilderProps {
  onComplete?: () => void
  lang?: "ko" | "en"
}

export function FunctionBuilder({ onComplete, lang = "ko" }: FunctionBuilderProps) {
  const isEn = lang === "en"
  const [currentStep, setCurrentStep] = useState(0)

  const totalSteps = 7

  const steps = [
    {
      parts: [],
      emoji: '🎯',
      title: isEn ? 'Ready?' : '준비됐나요?',
      text: isEn ? 'Click to learn the structure of a function step by step!' : '클릭해서 함수의 구조를 하나씩 배워봐요!',
      buttonText: isEn ? 'Start 👆' : '시작하기 👆',
      hint: isEn ? 'Click to go to the first step!' : '클릭해서 첫 번째 단계로!'
    },
    {
      parts: ['def'],
      emoji: '📢',
      title: isEn ? 'def = "I\'m making a function!"' : 'def = "함수를 만들 거야!"',
      text: isEn ? '<strong>def</strong> is short for <em>define</em>. It\'s the <strong>keyword</strong> that tells Python "I\'m about to create a function!"' : '<strong>def</strong>는 <em>define(정의하다)</em>의 줄임말이에요. 파이썬에게 "지금부터 함수를 만들 거야!"라고 알려주는 <strong>키워드</strong>예요.',
      buttonText: isEn ? 'Next 👉' : '다음 👉',
      hint: isEn ? 'Functions always start with def!' : '함수는 항상 def로 시작해요!'
    },
    {
      parts: ['def', 'name'],
      emoji: '🏷️',
      title: isEn ? 'Naming the function' : '함수 이름 짓기',
      text: isEn ? '<strong>greet</strong> is the <strong>name</strong> of this function. You call it by this name later!' : '<strong>greet</strong>는 이 함수의 <strong>이름</strong>이에요. 나중에 이 이름을 불러서 함수를 사용해요!',
      buttonText: isEn ? 'Next 👉' : '다음 👉',
      hint: isEn ? 'A meaningful name makes it easy to remember!' : '의미 있는 이름을 지어야 기억하기 쉬워요!'
    },
    {
      parts: ['def', 'name', 'paren1', 'param', 'paren2'],
      emoji: '📦',
      title: isEn ? 'Parameter = receiving ingredients' : '매개변수 = 재료 받기',
      text: isEn ? '<strong>(name)</strong> is the <strong>ingredient</strong> this function receives! Put parameters in the parentheses — the actual value goes here when you call the function.' : '<strong>(name)</strong>은 함수가 받을 <strong>재료</strong>예요! 괄호 안에 매개변수를 넣고, 함수를 부를 때 실제 값이 여기 들어가요.',
      buttonText: isEn ? 'Next 👉' : '다음 👉',
      hint: isEn ? 'No parameters? Just write empty parentheses ()!' : '매개변수가 없으면 빈 괄호 ()만 써요!'
    },
    {
      parts: ['def', 'name', 'paren1', 'param', 'paren2', 'colon'],
      emoji: '✨',
      title: isEn ? 'Colon = declaration ends!' : '콜론 = 선언 끝!',
      text: isEn ? 'The <strong>:</strong> (colon) means "the function declaration ends here!" Forget it and you get a <span style="color:#dc2626;">SyntaxError</span>!' : '<strong>:</strong> (콜론)은 "함수 선언이 여기서 끝났어!"를 의미해요. 콜론을 빼먹으면 <span style="color:#dc2626;">SyntaxError</span> 발생!',
      buttonText: isEn ? 'Next 👉' : '다음 👉',
      hint: isEn ? 'Forgetting the colon = most common mistake!' : '콜론 빼먹기 = 가장 흔한 실수!'
    },
    {
      parts: ['def', 'name', 'paren1', 'param', 'paren2', 'colon', 'indent'],
      emoji: '➡️',
      title: isEn ? 'Indentation = inside the function!' : '들여쓰기 = 함수 안이에요!',
      text: isEn ? '<strong>Indentation</strong> (4 spaces) marks "this code is inside the function!" Without it: <span style="color:#dc2626;">IndentationError</span>!' : '<strong>들여쓰기</strong> (스페이스 4칸)는 "이 코드는 함수 안에 있어요!"를 표시해요. 들여쓰기 안 하면 <span style="color:#dc2626;">IndentationError</span>!',
      buttonText: isEn ? 'Next 👉' : '다음 👉',
      hint: isEn ? '4 spaces is the standard!' : '스페이스 4칸이 표준이에요!'
    },
    {
      parts: ['def', 'name', 'paren1', 'param', 'paren2', 'colon', 'indent', 'print', 'paren3', 'string', 'paren4'],
      emoji: '🎉',
      title: isEn ? 'The function body!' : '함수의 본문!',
      text: isEn ? 'Finally, what the function <strong>actually does</strong>! Call this function and "Hello, ___!" gets printed!' : '드디어 함수가 <strong>실제로 할 일</strong>이에요! 이 함수를 부르면 "안녕, ___!" 이 출력돼요!',
      buttonText: isEn ? 'Done! 🎊' : '완료! 🎊',
      hint: isEn ? 'The function is complete!' : '함수가 완성됐어요!'
    }
  ]

  const handleNext = useCallback(() => {
    if (currentStep + 1 > totalSteps) {
      onComplete?.()
      return
    }
    setCurrentStep(currentStep + 1)
  }, [currentStep, onComplete])

  const handleRestart = () => {
    setCurrentStep(0)
  }

  const step = steps[currentStep]
  const progress = (currentStep / totalSteps) * 100

  // 완료 화면
  if (currentStep > totalSteps - 1) {
    return (
      <div className="my-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-green-200 shadow-xl text-center">
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">{isEn ? "Perfect!" : "완벽해요!"}</h3>
          <p className="text-gray-600 mb-6">{isEn ? "You've learned the full structure of a function!" : "함수의 구조를 모두 배웠어요!"}</p>

          {/* 요약 */}
          <div className="bg-indigo-50 rounded-2xl p-5 text-left mb-6">
            <h4 className="font-bold text-indigo-700 mb-4 text-center">{isEn ? "📚 Summary" : "📚 정리"}</h4>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-pink-400 shrink-0"></span>
                <code className="text-pink-600 font-bold">def</code>
                <span className="text-gray-600">{isEn ? "→ declares we're defining a function" : "→ 함수를 정의한다고 선언"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-green-400 shrink-0"></span>
                <code className="text-green-600 font-bold">{isEn ? "funcname" : "함수이름"}</code>
                <span className="text-gray-600">{isEn ? "→ the name to use when calling it" : "→ 나중에 부를 때 쓸 이름"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-amber-400 shrink-0"></span>
                <code className="text-amber-600 font-bold">( )</code>
                <span className="text-gray-600">{isEn ? "→ parentheses holding the parameters" : "→ 매개변수를 담는 괄호"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-sky-400 shrink-0"></span>
                <code className="text-sky-600 font-bold">{isEn ? "parameter" : "매개변수"}</code>
                <span className="text-gray-600">{isEn ? "→ name for the value passed to the function" : "→ 함수에 전달할 값의 이름"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-amber-400 shrink-0"></span>
                <code className="text-amber-600 font-bold">:</code>
                <span className="text-gray-600">{isEn ? "→ end of the function declaration" : "→ 함수 선언의 끝"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-gray-400 shrink-0"></span>
                <code className="text-gray-600 font-bold">{isEn ? "indent" : "들여쓰기"}</code>
                <span className="text-gray-600">{isEn ? "→ marks code as being inside the function" : "→ 함수 안의 코드임을 표시"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white border-4 border-indigo-200 rounded-xl font-bold text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            {isEn ? "Learn again" : "다시 배우기"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 space-y-4">
      {/* 진행 바 */}
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-indigo-600 font-bold">
        Step {currentStep} / {totalSteps}
      </p>

      {/* 코드 영역 */}
      <div className="bg-gray-900 rounded-2xl p-5 md:p-6 min-h-[140px]">
        <div className="font-mono text-lg md:text-xl flex flex-wrap items-center gap-1">
          {/* def */}
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-500",
            step.parts.includes('def') 
              ? "opacity-100 bg-pink-500/30 text-pink-300 font-bold" 
              : "opacity-0"
          )}>def</span>
          
          {/* 함수이름 */}
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-500",
            step.parts.includes('name') 
              ? "opacity-100 bg-green-500/30 text-green-300 font-bold" 
              : "opacity-0"
          )}>greet</span>
          
          {/* ( */}
          <span className={cn(
            "px-1 py-1 rounded transition-all duration-500",
            step.parts.includes('paren1') 
              ? "opacity-100 bg-amber-500/30 text-amber-300 font-bold" 
              : "opacity-0"
          )}>(</span>
          
          {/* 매개변수 */}
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-500",
            step.parts.includes('param') 
              ? "opacity-100 bg-sky-500/30 text-sky-300 font-bold" 
              : "opacity-0"
          )}>name</span>
          
          {/* ) */}
          <span className={cn(
            "px-1 py-1 rounded transition-all duration-500",
            step.parts.includes('paren2') 
              ? "opacity-100 bg-amber-500/30 text-amber-300 font-bold" 
              : "opacity-0"
          )}>)</span>
          
          {/* : */}
          <span className={cn(
            "px-1 py-1 rounded transition-all duration-500",
            step.parts.includes('colon') 
              ? "opacity-100 bg-amber-500/30 text-amber-300 font-bold" 
              : "opacity-0"
          )}>:</span>
        </div>

        {/* 두 번째 줄 (들여쓰기 + print) */}
        <div className={cn(
          "font-mono text-lg md:text-xl flex flex-wrap items-center gap-1 mt-2 pl-6 transition-all duration-500",
          step.parts.includes('indent') ? "opacity-100" : "opacity-0"
        )}>
          <span className="text-gray-500">····</span>
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-500",
            step.parts.includes('print') 
              ? "opacity-100 bg-purple-500/30 text-purple-300 font-bold" 
              : "opacity-0"
          )}>print</span>
          <span className={cn(
            "px-1 py-1 transition-all duration-500",
            step.parts.includes('paren3') ? "opacity-100 text-amber-300" : "opacity-0"
          )}>(</span>
          <span className={cn(
            "px-2 py-1 rounded transition-all duration-500",
            step.parts.includes('string') 
              ? "opacity-100 bg-lime-500/30 text-lime-300 font-bold" 
              : "opacity-0"
          )}>f"안녕, {'{name}'}!"</span>
          <span className={cn(
            "px-1 py-1 transition-all duration-500",
            step.parts.includes('paren4') ? "opacity-100 text-amber-300" : "opacity-0"
          )}>)</span>
        </div>
      </div>

      {/* 설명 박스 */}
      <div className="bg-white rounded-2xl p-5 border-4 border-indigo-200 shadow-lg">
        <div className="text-3xl mb-2">{step.emoji}</div>
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{step.title}</h3>
        <p 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: step.text }}
        />
      </div>

      {/* 다음 버튼 */}
      <div className="text-center">
        <button
          onClick={handleNext}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          {step.buttonText} <ChevronRight className="w-5 h-5 inline ml-1" />
        </button>
        <p className="text-gray-500 mt-2 text-sm">{step.hint}</p>
      </div>
    </div>
  )
}
