"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcedureFlowProps {
  mode: "procedure" | "function" | "compare"
  lang?: string
  procName?: string
  procParams?: string
  procBody?: string
  callCode?: string
  funcName?: string
  funcParams?: string
  funcBody?: string
  funcReturns?: string
  callAssign?: string
  returnValue?: string
}

export function ProcedureFlow({
  mode = "procedure",
  lang = "ko",
  procName = "Greet",
  procParams = "name : STRING",
  procBody = 'OUTPUT "Hi, " & name',
  callCode = 'CALL Greet("민수")',
  funcName = "Square",
  funcParams = "n : INTEGER",
  funcBody = "RETURN n * n",
  funcReturns = "INTEGER",
  callAssign = "result ← Square(4)",
  returnValue = "16",
}: ProcedureFlowProps) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const t = (ko: string, en: string) => lang === "en" ? en : ko

  const maxStep = mode === "compare" ? 6 : 5

  const runAnimation = () => {
    if (isPlaying) return
    setIsPlaying(true)
    setStep(1)
    let i = 1
    const interval = setInterval(() => {
      i++
      if (i <= maxStep) {
        setStep(i)
      } else {
        clearInterval(interval)
        setIsPlaying(false)
      }
    }, 1000)
  }

  const reset = () => {
    setStep(0)
    setIsPlaying(false)
  }

  if (mode === "compare") return <CompareMode step={step} isPlaying={isPlaying} run={runAnimation} reset={reset} t={t} />

  const isProcedure = mode === "procedure"
  const name = isProcedure ? procName : funcName
  const params = isProcedure ? procParams : funcParams
  const body = isProcedure ? procBody : funcBody
  const keyword = isProcedure ? "PROCEDURE" : "FUNCTION"
  const endKeyword = isProcedure ? "ENDPROCEDURE" : "ENDFUNCTION"
  const callLine = isProcedure ? callCode : callAssign

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 md:p-6 text-white overflow-hidden">
      {/* Step labels */}
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: maxStep }, (_, i) => (
          <div key={i} className={cn(
            "h-2 flex-1 rounded-full transition-all duration-500",
            i < step ? (isProcedure ? "bg-blue-500" : "bg-purple-500") : "bg-slate-700"
          )} />
        ))}
      </div>

      {/* Caller section */}
      <div className="mb-3">
        <p className="text-[10px] md:text-xs text-slate-400 mb-1">{t("📍 메인 코드", "📍 Main Code")}</p>
        <div className={cn(
          "rounded-xl p-3 font-mono text-xs md:text-sm border-2 transition-all duration-500",
          step === 1 ? (isProcedure ? "border-blue-400 bg-blue-500/20" : "border-purple-400 bg-purple-500/20") :
          step === maxStep ? (isProcedure ? "border-green-400 bg-green-500/20" : "border-amber-400 bg-amber-500/20") :
          "border-slate-700 bg-slate-800/50"
        )}>
          <span className={cn("transition-all duration-300", step === 1 ? "text-yellow-300" : "text-slate-300")}>
            {callLine}
          </span>
          {step === 1 && (
            <span className="ml-2 text-[10px] text-blue-300 animate-pulse">
              {isProcedure ? t("← CALL 실행!", "← CALL executes!") : t("← 함수 호출!", "← Function called!")}
            </span>
          )}
          {!isProcedure && step === maxStep && (
            <span className="ml-2 text-[10px] text-amber-300 animate-pulse">
              ← {t(`값 ${returnValue} 저장!`, `Value ${returnValue} stored!`)}
            </span>
          )}
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center my-2">
        <div className={cn(
          "flex flex-col items-center transition-all duration-500",
          step >= 2 ? "opacity-100" : "opacity-0"
        )}>
          <div className={cn(
            "w-0.5 h-6 transition-all duration-300",
            isProcedure ? "bg-blue-400" : "bg-purple-400"
          )} />
          <div className={cn(
            "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent",
            isProcedure ? "border-t-blue-400" : "border-t-purple-400"
          )} />
        </div>
      </div>

      {/* Procedure/Function block */}
      <div className={cn(
        "rounded-xl p-3 md:p-4 border-2 transition-all duration-500 font-mono text-xs md:text-sm",
        step >= 2 && step <= 4
          ? (isProcedure ? "border-blue-400 bg-blue-900/30 shadow-lg shadow-blue-500/20" : "border-purple-400 bg-purple-900/30 shadow-lg shadow-purple-500/20")
          : "border-slate-700 bg-slate-800/50"
      )}>
        <div className={cn("transition-all duration-300", step >= 2 ? "text-blue-300" : "text-slate-500")}>
          <span className="text-pink-400">{keyword}</span>{" "}
          <span className="text-yellow-300">{name}</span>
          <span className="text-slate-400">(</span>
          <span className="text-green-300">{params}</span>
          <span className="text-slate-400">)</span>
          {!isProcedure && <span className="text-pink-400"> RETURNS {funcReturns}</span>}
        </div>
        <div className={cn(
          "pl-4 md:pl-6 my-1 transition-all duration-500",
          step >= 3 ? "text-white" : "text-slate-600"
        )}>
          {step >= 3 && (
            <span className={cn(
              "inline-block px-2 py-0.5 rounded transition-all duration-500",
              step === 3 ? (isProcedure ? "bg-blue-500/30 animate-pulse" : "bg-purple-500/30 animate-pulse") : ""
            )}>
              {body}
            </span>
          )}
          {step < 3 && <span className="text-slate-600">{body}</span>}
        </div>
        <div className={cn("transition-all duration-300", step >= 2 ? "text-blue-300" : "text-slate-500")}>
          <span className="text-pink-400">{endKeyword}</span>
        </div>
      </div>

      {/* Arrow up (for function return) or completion */}
      <div className="flex justify-center my-2">
        <div className={cn(
          "flex flex-col items-center transition-all duration-500",
          step >= 4 ? "opacity-100" : "opacity-0"
        )}>
          {!isProcedure && step >= 4 ? (
            <>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-amber-400" />
              <div className="w-0.5 h-6 bg-amber-400" />
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold transition-all duration-300",
                step >= 4 ? "bg-amber-500/30 text-amber-300 animate-bounce" : "opacity-0"
              )}>
                RETURN {returnValue}
              </span>
            </>
          ) : (
            <>
              <div className="w-0.5 h-4 bg-green-400" />
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold transition-all duration-300",
                step >= 4 ? "bg-green-500/30 text-green-300" : "opacity-0"
              )}>
                {t("실행 완료!", "Done!")}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Result */}
      <div className={cn(
        "rounded-xl p-3 border-2 text-center transition-all duration-500",
        step === maxStep
          ? (isProcedure ? "border-green-400 bg-green-900/30" : "border-amber-400 bg-amber-900/30")
          : "border-slate-700 bg-slate-800/50 opacity-50"
      )}>
        {isProcedure ? (
          <p className="text-sm">
            {step >= maxStep ? (
              <span className="text-green-300 font-bold">
                ✅ {t("동작만 수행! 반환값 없음", "Action only! No return value")}
              </span>
            ) : (
              <span className="text-slate-500">{t("결과가 여기에...", "Result here...")}</span>
            )}
          </p>
        ) : (
          <p className="text-sm">
            {step >= maxStep ? (
              <span className="text-amber-300 font-bold">
                📦 result = <span className="text-2xl">{returnValue}</span>
                <span className="text-xs block mt-1 text-amber-400/70">{t("값이 변수에 저장됨!", "Value stored in variable!")}</span>
              </span>
            ) : (
              <span className="text-slate-500">{t("반환값이 여기에...", "Return value here...")}</span>
            )}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mt-4">
        {step === 0 ? (
          <button
            onClick={runAnimation}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all",
              isProcedure
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            )}
          >
            <Play className="w-4 h-4" />
            {t("실행하기", "Run")}
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {t("다시 보기", "Replay")}
          </button>
        )}
      </div>

      {/* Step description */}
      <div className="mt-3 text-center">
        <p className="text-[10px] md:text-xs text-slate-400">
          {step === 0 && t("▶ 버튼을 눌러 실행 흐름을 확인하세요!", "Press ▶ to see the execution flow!")}
          {step === 1 && (isProcedure ? t("1️⃣ CALL로 프로시저를 호출해요", "1️⃣ CALL invokes the procedure") : t("1️⃣ 함수를 호출해요", "1️⃣ The function is called"))}
          {step === 2 && t("2️⃣ 코드 블록 안으로 들어가요", "2️⃣ Entering the code block")}
          {step === 3 && t("3️⃣ 코드를 실행해요", "3️⃣ Executing the code")}
          {step === 4 && (isProcedure ? t("4️⃣ 실행이 끝나고 돌아가요", "4️⃣ Execution finished, returning") : t("4️⃣ RETURN으로 값을 돌려줘요", "4️⃣ RETURN sends back the value"))}
          {step === 5 && (isProcedure ? t("5️⃣ 완료! 반환값 없이 끝!", "5️⃣ Done! No return value!") : t("5️⃣ 값이 변수에 저장돼요!", "5️⃣ Value is stored in the variable!"))}
        </p>
      </div>
    </div>
  )
}

/* ─── Compare Mode ─── */
function CompareMode({ step, isPlaying, run, reset, t }: {
  step: number; isPlaying: boolean; run: () => void; reset: () => void
  t: (ko: string, en: string) => string
}) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 md:p-6 text-white overflow-hidden">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {/* PROCEDURE side */}
        <div className={cn("rounded-xl p-3 border-2 transition-all duration-500",
          step >= 1 ? "border-blue-400/50 bg-blue-900/20" : "border-slate-700 bg-slate-800/50"
        )}>
          <p className="text-xs md:text-sm font-bold text-blue-400 mb-2 text-center">PROCEDURE</p>

          {/* Call */}
          <div className={cn("rounded-lg p-2 font-mono text-[10px] md:text-xs mb-2 transition-all duration-500",
            step >= 1 ? "bg-blue-500/20 border border-blue-500/30" : "bg-slate-800 border border-slate-700"
          )}>
            <span className="text-yellow-300">CALL</span> <span className="text-slate-300">SayHi("민수")</span>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-1">
            <div className={cn("text-blue-400 transition-all duration-300", step >= 2 ? "opacity-100" : "opacity-0")}>↓</div>
          </div>

          {/* Block */}
          <div className={cn("rounded-lg p-2 font-mono text-[10px] md:text-xs mb-2 transition-all duration-500",
            step >= 2 && step <= 4 ? "bg-blue-500/20 border border-blue-400 shadow-md shadow-blue-500/10" : "bg-slate-800 border border-slate-700"
          )}>
            <div className="text-pink-400">PROCEDURE <span className="text-yellow-300">SayHi</span>(..)</div>
            <div className={cn("pl-3 transition-all duration-300", step >= 3 ? "text-white" : "text-slate-600")}>
              {step >= 3 && <span className="bg-blue-500/20 px-1 rounded">OUTPUT "Hi!"</span>}
              {step < 3 && <span>OUTPUT "Hi!"</span>}
            </div>
            <div className="text-pink-400">ENDPROCEDURE</div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-1">
            <div className={cn("text-green-400 transition-all duration-300", step >= 4 ? "opacity-100" : "opacity-0")}>↓</div>
          </div>

          {/* Result */}
          <div className={cn("rounded-lg p-2 text-center text-[10px] md:text-xs transition-all duration-500",
            step >= 5 ? "bg-green-500/20 border border-green-400/50" : "bg-slate-800 border border-slate-700"
          )}>
            {step >= 5 ? (
              <span className="text-green-300 font-bold">✅ {t("동작만 수행", "Action only")}</span>
            ) : (
              <span className="text-slate-600">{t("결과", "Result")}</span>
            )}
          </div>

          {/* Key point */}
          <div className={cn("mt-2 text-center text-[10px] transition-all duration-500",
            step >= 6 ? "opacity-100" : "opacity-0"
          )}>
            <span className="bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full font-bold">
              {t("❌ 반환값 없음", "❌ No return")}
            </span>
          </div>
        </div>

        {/* FUNCTION side */}
        <div className={cn("rounded-xl p-3 border-2 transition-all duration-500",
          step >= 1 ? "border-purple-400/50 bg-purple-900/20" : "border-slate-700 bg-slate-800/50"
        )}>
          <p className="text-xs md:text-sm font-bold text-purple-400 mb-2 text-center">FUNCTION</p>

          {/* Call */}
          <div className={cn("rounded-lg p-2 font-mono text-[10px] md:text-xs mb-2 transition-all duration-500",
            step >= 1 ? "bg-purple-500/20 border border-purple-500/30" : "bg-slate-800 border border-slate-700"
          )}>
            <span className="text-slate-300">x ← </span><span className="text-yellow-300">Double</span><span className="text-slate-300">(5)</span>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-1">
            <div className={cn("text-purple-400 transition-all duration-300", step >= 2 ? "opacity-100" : "opacity-0")}>↓</div>
          </div>

          {/* Block */}
          <div className={cn("rounded-lg p-2 font-mono text-[10px] md:text-xs mb-2 transition-all duration-500",
            step >= 2 && step <= 4 ? "bg-purple-500/20 border border-purple-400 shadow-md shadow-purple-500/10" : "bg-slate-800 border border-slate-700"
          )}>
            <div className="text-pink-400">FUNCTION <span className="text-yellow-300">Double</span>(..)</div>
            <div className={cn("pl-3 transition-all duration-300", step >= 3 ? "text-white" : "text-slate-600")}>
              {step >= 3 && <span className="bg-purple-500/20 px-1 rounded">RETURN n * 2</span>}
              {step < 3 && <span>RETURN n * 2</span>}
            </div>
            <div className="text-pink-400">ENDFUNCTION</div>
          </div>

          {/* Return arrow */}
          <div className="flex justify-center my-1">
            <div className={cn("transition-all duration-300", step >= 4 ? "opacity-100" : "opacity-0")}>
              <span className="text-amber-400">↑</span>
              {step >= 4 && <span className="text-[9px] text-amber-300 ml-1 animate-pulse">10</span>}
            </div>
          </div>

          {/* Result */}
          <div className={cn("rounded-lg p-2 text-center text-[10px] md:text-xs transition-all duration-500",
            step >= 5 ? "bg-amber-500/20 border border-amber-400/50" : "bg-slate-800 border border-slate-700"
          )}>
            {step >= 5 ? (
              <span className="text-amber-300 font-bold">📦 x = <span className="text-lg">10</span></span>
            ) : (
              <span className="text-slate-600">{t("결과", "Result")}</span>
            )}
          </div>

          {/* Key point */}
          <div className={cn("mt-2 text-center text-[10px] transition-all duration-500",
            step >= 6 ? "opacity-100" : "opacity-0"
          )}>
            <span className="bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full font-bold">
              {t("✅ 값을 반환!", "✅ Returns value!")}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mt-4">
        {step === 0 ? (
          <button onClick={run}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all">
            <Play className="w-4 h-4" />
            {t("비교 실행!", "Compare!")}
          </button>
        ) : (
          <button onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm transition-all">
            <RotateCcw className="w-4 h-4" />
            {t("다시 보기", "Replay")}
          </button>
        )}
      </div>

      {/* Step description */}
      <div className="mt-3 text-center">
        <p className="text-[10px] md:text-xs text-slate-400">
          {step === 0 && t("▶ 버튼을 눌러 두 개를 동시에 비교해보세요!", "Press ▶ to compare both side by side!")}
          {step === 1 && t("1️⃣ 둘 다 호출해요. 호출 방식이 달라요!", "1️⃣ Both are called — but differently!")}
          {step === 2 && t("2️⃣ 코드 블록 안으로 진입!", "2️⃣ Entering the code blocks!")}
          {step === 3 && t("3️⃣ 코드를 실행해요", "3️⃣ Executing the code")}
          {step === 4 && t("4️⃣ FUNCTION만 값을 돌려줘요!", "4️⃣ Only FUNCTION returns a value!")}
          {step === 5 && t("5️⃣ FUNCTION은 값 저장, PROCEDURE는 끝!", "5️⃣ FUNCTION stores value, PROCEDURE just ends!")}
          {step === 6 && t("6️⃣ 이것이 가장 큰 차이! 시험에 나와요!", "6️⃣ This is the key difference — it's on the exam!")}
        </p>
      </div>
    </div>
  )
}
