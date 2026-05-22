"use client"

import { cn } from "@/lib/utils"

interface FunctionStructureProps {
  // 한국어/영어 선택
  lang?: "ko" | "en"
}

export function FunctionStructure({ lang = "ko" }: FunctionStructureProps) {
  const labels = {
    ko: {
      title: "함수의 기본 구조",
      funcDef: "함수 정의",
      funcBody: "실행할 코드", 
      returnVal: "결과 돌려주기",
      funcCall: "함수 호출",
      use: "(사용)",
      tip: "쉽게 생각하면",
      defTip: "= 레시피 적기",
      callTip: "= 요리 시작!"
    },
    en: {
      title: "Function Structure",
      funcDef: "Function definition",
      funcBody: "Code to execute",
      returnVal: "Return result",
      funcCall: "Function call",
      use: "(use)",
      tip: "Think of it like",
      defTip: "= Writing a recipe",
      callTip: "= Start cooking!"
    }
  }
  
  const t = labels[lang]

  return (
    <div className="my-6">
      {/* 함수 정의 박스 */}
      <div className="bg-slate-800 rounded-2xl p-5 md:p-6 overflow-hidden">
        {/* 정의 영역 */}
        <div className="relative">
          {/* 왼쪽 브라켓 라인 */}
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-purple-500 via-purple-500 to-pink-500 rounded-full" />
          
          <div className="pl-5 space-y-3">
            {/* Line 1: def */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-sm md:text-base">
                <span className="px-2 py-1 rounded bg-pink-500/30 text-pink-300 font-bold">def</span>
                <span className="text-purple-300">함수이름</span>
                <span className="text-slate-400">(</span>
                <span className="text-orange-300">재료</span>
                <span className="text-slate-400">):</span>
              </div>
              <span className="text-xs md:text-sm text-slate-400 flex items-center gap-1">
                <span className="text-slate-500">←</span> {t.funcDef}
              </span>
            </div>
            
            {/* Line 2: body */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="font-mono text-sm md:text-base pl-6">
                <span className="text-slate-300">요리 과정</span>
              </div>
              <span className="text-xs md:text-sm text-slate-400 flex items-center gap-1">
                <span className="text-slate-500">←</span> {t.funcBody}
              </span>
            </div>
            
            {/* Line 3: return */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-sm md:text-base pl-6">
                <span className="px-2 py-1 rounded bg-green-500/30 text-green-300 font-bold">return</span>
                <span className="text-slate-300">완성된요리</span>
              </div>
              <span className="text-xs md:text-sm text-slate-400 flex items-center gap-1">
                <span className="text-slate-500">←</span> {t.returnVal}
              </span>
            </div>
          </div>
        </div>
        
        {/* 구분선 */}
        <div className="my-5 border-t border-slate-700" />
        
        {/* 호출 영역 */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1 font-mono text-sm md:text-base">
            <span className="text-purple-300">함수이름</span>
            <span className="text-slate-400">(</span>
            <span className="text-yellow-300">재료</span>
            <span className="text-slate-400">)</span>
          </div>
          <span className="text-xs md:text-sm text-slate-400 flex items-center gap-1">
            <span className="text-slate-500">←</span> {t.funcCall} <span className="text-purple-400">{t.use}</span>
          </span>
        </div>
      </div>
      
      {/* 팁 영역 */}
      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
        <p className="font-bold text-purple-700 mb-2">💡 {t.tip}:</p>
        <div className="space-y-1 text-sm md:text-base">
          <p className="flex items-center gap-2">
            <code className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded font-mono font-bold">def</code>
            <span className="text-gray-700">{t.defTip}</span>
          </p>
          <p className="flex items-center gap-2">
            <code className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-mono">함수이름()</code>
            <span className="text-gray-700">{t.callTip}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// 파라미터 설명 컴포넌트
export function ParameterStructure({ lang = "ko" }: FunctionStructureProps) {
  const labels = {
    ko: {
      param: "매개변수 (빈 그릇)",
      arg: "인자 (실제 재료)",
      tip: "쉽게 생각하면",
      paramTip: "= 빈 그릇 (이름표만 있음)",
      argTip: "= 그릇에 담을 실제 재료"
    },
    en: {
      param: "Parameter (empty container)",
      arg: "Argument (actual ingredient)",
      tip: "Think of it like",
      paramTip: "= Empty container (just a label)",
      argTip: "= Actual ingredient to put in"
    }
  }
  
  const t = labels[lang]

  return (
    <div className="my-6">
      <div className="bg-slate-800 rounded-2xl p-5 md:p-6 overflow-hidden">
        {/* 함수 정의 */}
        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-purple-500 rounded-full" />
          
          <div className="pl-5 space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-sm md:text-base">
                <span className="px-2 py-1 rounded bg-pink-500/30 text-pink-300 font-bold">def</span>
                <span className="text-purple-300">인사</span>
                <span className="text-slate-400">(</span>
                <span className="px-2 py-1 rounded bg-orange-500/30 text-orange-300">이름</span>
                <span className="text-slate-400">):</span>
              </div>
              <span className="text-xs md:text-sm text-orange-400 flex items-center gap-1">
                <span className="text-slate-500">←</span> {t.param}
              </span>
            </div>
            
            <div className="font-mono text-sm md:text-base pl-6">
              <span className="text-slate-300">print(f'안녕, </span>
              <span className="text-orange-300">{'{이름}'}</span>
              <span className="text-slate-300">!')</span>
            </div>
          </div>
        </div>
        
        <div className="my-5 border-t border-slate-700" />
        
        {/* 함수 호출 */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1 font-mono text-sm md:text-base">
            <span className="text-purple-300">인사</span>
            <span className="text-slate-400">(</span>
            <span className="px-2 py-1 rounded bg-yellow-500/30 text-yellow-300">'철수'</span>
            <span className="text-slate-400">)</span>
          </div>
          <span className="text-xs md:text-sm text-yellow-400 flex items-center gap-1">
            <span className="text-slate-500">←</span> {t.arg}
          </span>
        </div>
      </div>
      
      {/* 팁 */}
      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
        <p className="font-bold text-purple-700 mb-2">💡 {t.tip}:</p>
        <div className="space-y-2 text-sm md:text-base">
          <p className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-bold">매개변수</span>
            <span className="text-gray-700">{t.paramTip}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-bold">인자</span>
            <span className="text-gray-700">{t.argTip}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// Return 설명 컴포넌트
export function ReturnStructure({ lang = "ko" }: FunctionStructureProps) {
  const labels = {
    ko: {
      returns: "결과를 돌려줌",
      stored: "이 결과에 저장됨",
      tip: "쉽게 생각하면",
      printTip: "화면에 보여주기만 (말로 알려줌)",
      returnTip: "값을 돌려줘서 저장 가능 (선물 포장)"
    },
    en: {
      returns: "Returns the result",
      stored: "stored in result",
      tip: "Think of it like",
      printTip: "Just shows on screen (tells you)",
      returnTip: "Returns value to store (gift wrapped)"
    }
  }
  
  const t = labels[lang]

  return (
    <div className="my-6">
      <div className="bg-slate-800 rounded-2xl p-5 md:p-6 overflow-hidden">
        {/* 함수 정의 */}
        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-purple-500 to-green-500 rounded-full" />
          
          <div className="pl-5 space-y-3">
            <div className="flex items-center gap-1 font-mono text-sm md:text-base">
              <span className="px-2 py-1 rounded bg-pink-500/30 text-pink-300 font-bold">def</span>
              <span className="text-purple-300">더하기</span>
              <span className="text-slate-400">(</span>
              <span className="text-orange-300">a, b</span>
              <span className="text-slate-400">):</span>
            </div>
            
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-sm md:text-base pl-6">
                <span className="px-2 py-1 rounded bg-green-500/30 text-green-300 font-bold">return</span>
                <span className="text-slate-300">a + b</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 animate-pulse">→</span>
                <span className="text-xs md:text-sm text-green-400">{t.returns}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="my-5 border-t border-slate-700" />
        
        {/* 호출 & 저장 */}
        <div className="flex items-center gap-2 font-mono text-sm md:text-base flex-wrap">
          <span className="text-slate-300">결과</span>
          <span className="text-slate-400">=</span>
          <span className="text-purple-300">더하기</span>
          <span className="text-slate-400">(</span>
          <span className="text-yellow-300">3, 5</span>
          <span className="text-slate-400">)</span>
          <span className="text-slate-500 text-xs md:text-sm ml-2">← 8{lang === 'ko' ? '이' : ''} {t.stored}</span>
        </div>
      </div>
      
      {/* 팁 */}
      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
        <p className="font-bold text-purple-700 mb-2">💡 {t.tip}:</p>
        <div className="space-y-2 text-sm md:text-base">
          <p className="flex items-start gap-2">
            <code className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-mono shrink-0">print</code>
            <span className="text-gray-700">{t.printTip}</span>
          </p>
          <p className="flex items-start gap-2">
            <code className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-mono shrink-0">return</code>
            <span className="text-gray-700">{t.returnTip}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
