"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// input() 시각화 (lesson 10)
// 사용자가 한 글자씩 타이핑 → input() 이 받음 → 변수에 저장 (항상 문자열!)
// + 변환 함수 체인 (int(input()), input().split() 등)
// ============================================

type Step =
  | { kind: "type"; text: string }                      // 사용자가 타이핑
  | { kind: "enter" }                                   // Enter 키
  | { kind: "convert"; func: string; from: string; to: string; toType: string } // 변환

type Preset = {
  id: string
  label: string
  code: string                                          // 사용자에게 보여줄 코드
  prompt?: string                                       // input() 의 프롬프트 텍스트
  varName: string                                       // 결과 변수 이름
  steps: Step[]
  caption: string
  color: string
}

const TYPE_COLORS: Record<string, string> = {
  str: "#f59e0b",
  int: "#3b82f6",
  float: "#a855f7",
  list: "#10b981",
}

function getPresets(isEn: boolean): Preset[] {
  return [
    {
      id: "basic",
      label: isEn ? "Basic — name = input()" : "기본 — name = input()",
      code: 'name = input("이름: ")',
      prompt: isEn ? "Name: " : "이름: ",
      varName: "name",
      steps: [
        { kind: "type", text: isEn ? "Alice" : "철수" },
        { kind: "enter" },
      ],
      caption: isEn
        ? "Whatever the user types becomes a STRING in the variable. Always — even if they type digits."
        : "사용자가 친 글자가 그대로 변수에 저장돼요. 항상 **문자열** — 숫자만 쳐도 마찬가지!",
      color: TYPE_COLORS.str,
    },
    {
      id: "int-trap",
      label: isEn ? "Trap — string + 1" : "함정 — 문자열 + 1",
      code: 'age = input("나이: ")\nage + 1   # ❌',
      prompt: isEn ? "Age: " : "나이: ",
      varName: "age",
      steps: [
        { kind: "type", text: "15" },
        { kind: "enter" },
        { kind: "convert", func: "+ 1", from: "\"15\"", to: "TypeError ❌", toType: "list" /* not used */ },
      ],
      caption: isEn
        ? "Even when the user types digits, input() keeps it as the string \"15\". Adding a number to a string errors!"
        : "사용자가 숫자만 쳐도 input() 은 \"15\" (문자열) 로 받아요. 문자열에 숫자 더하면 에러!",
      color: "#ef4444",
    },
    {
      id: "int-input",
      label: 'int(input())',
      code: 'age = int(input("나이: "))',
      prompt: isEn ? "Age: " : "나이: ",
      varName: "age",
      steps: [
        { kind: "type", text: "15" },
        { kind: "enter" },
        { kind: "convert", func: "int", from: '"15"', to: "15", toType: "int" },
      ],
      caption: isEn
        ? "Wrap input() in int() to get a real number. Now math works!"
        : "input() 결과를 int() 로 감싸면 진짜 정수가 돼요. 이제 계산 가능!",
      color: TYPE_COLORS.int,
    },
    {
      id: "float-input",
      label: 'float(input())',
      code: 'h = float(input("키: "))',
      prompt: isEn ? "Height: " : "키: ",
      varName: "h",
      steps: [
        { kind: "type", text: "175.5" },
        { kind: "enter" },
        { kind: "convert", func: "float", from: '"175.5"', to: "175.5", toType: "float" },
      ],
      caption: isEn
        ? "float() handles decimals — perfect for measurements, scores, prices."
        : "float() 은 소수점이 있는 값을 정수가 아닌 실수로 받아요.",
      color: TYPE_COLORS.float,
    },
    {
      id: "split",
      label: 'input().split()',
      code: 'data = input().split()',
      varName: "data",
      steps: [
        { kind: "type", text: "3 5 7" },
        { kind: "enter" },
        { kind: "convert", func: "split", from: '"3 5 7"', to: '["3", "5", "7"]', toType: "list" },
      ],
      caption: isEn
        ? "split() chops the input string by spaces — list of STRINGS, not numbers yet!"
        : "split() 은 공백으로 잘라서 리스트로 만들어요. 아직은 **문자열** 리스트!",
      color: TYPE_COLORS.list,
    },
    {
      id: "map-int",
      label: 'list(map(int, input().split()))',
      code: 'nums = list(map(int, input().split()))',
      varName: "nums",
      steps: [
        { kind: "type", text: "3 5 7" },
        { kind: "enter" },
        { kind: "convert", func: "split",       from: '"3 5 7"',           to: '["3", "5", "7"]', toType: "list" },
        { kind: "convert", func: "map(int,…)",  from: '["3","5","7"]',     to: "[3, 5, 7]",        toType: "list" },
      ],
      caption: isEn
        ? "Coding-test classic: split → convert each piece to int → list. Memorize this pattern!"
        : "코딩 테스트 단골: split → 각 조각을 int 로 → list. 패턴으로 외워둬요!",
      color: TYPE_COLORS.int,
    },
  ]
}

type Phase = "idle" | "prompt-flying" | "typing" | "enter-pressed" | "stored" | "converting" | "done"

function InputVisualizer({
  lang = "ko",
  presetIds,
}: {
  lang?: "ko" | "en"
  presetIds?: string[]   // 보여줄 프리셋 id 만 필터. 미지정이면 전체.
}) {
  const isEn = lang === "en"
  const ALL_PRESETS = getPresets(isEn)
  const PRESETS = presetIds && presetIds.length > 0
    ? ALL_PRESETS.filter((p) => presetIds.includes(p.id))
    : ALL_PRESETS
  const [selectedId, setSelectedId] = useState(PRESETS[0].id)
  // 단계:
  //   step 0 = idle (전부 비어있음)
  //   step 1 (hasPrompt 만) = 질문이 코드 → 터미널로 (깜빡)
  //   step 2 = 타이핑 (한 글자씩, 자동, 천천히)
  //   step 3 = Enter 누름 (Enter 배지, 변수 박스는 아직 비어있음)
  //   step 4 = 값이 변수 박스에 저장 (날아 들어가는 애니메이션)
  //   step 5..N = 변환 단계
  const [step, setStep] = useState(0)

  const preset = PRESETS.find((p) => p.id === selectedId) ?? PRESETS[0]
  const typeStep = preset.steps.find((s) => s.kind === "type") as Extract<Step, { kind: "type" }> | undefined
  const convertSteps = preset.steps.filter((s) => s.kind === "convert") as Extract<Step, { kind: "convert" }>[]
  const hasPrompt = !!preset.prompt

  // 단계별 step 번호 (hasPrompt 여부에 따라 1 칸씩 밀림)
  const promptStep = hasPrompt ? 1 : -1
  const typingStep = hasPrompt ? 2 : 1
  const enterStep = hasPrompt ? 3 : 2
  const storeStep = hasPrompt ? 4 : 3
  const convertStartStep = hasPrompt ? 5 : 4

  const totalSteps = (hasPrompt ? 4 : 3) + convertSteps.length

  // 파생 상태
  const promptShown = !hasPrompt || step >= promptStep
  const enterPressed = step >= enterStep      // Enter 배지 보임
  const valueStored = step >= storeStep        // 변수 박스 채워짐
  const convertStage = step >= convertStartStep ? step - convertStartStep : -1
  const stepsLeft = totalSteps - step

  // 타이핑 애니메이션 — typing step 에 진입하면 한 글자씩 천천히 출현 (400ms / 글자)
  const [typedCharsAnim, setTypedCharsAnim] = useState(0)
  const typeTimerRef = useRef<number | null>(null)
  useEffect(() => {
    // 정리
    if (typeTimerRef.current) {
      window.clearTimeout(typeTimerRef.current)
      typeTimerRef.current = null
    }
    if (!typeStep) return
    if (step === typingStep) {
      // 타이핑 step 진입 → 0 부터 한 글자씩 (천천히)
      setTypedCharsAnim(0)
      const total = typeStep.text.length
      let i = 0
      const tick = () => {
        i += 1
        setTypedCharsAnim(i)
        if (i < total) {
          typeTimerRef.current = window.setTimeout(tick, 400)   // 한 글자당 400ms — 한 글자씩 명확히
        }
      }
      typeTimerRef.current = window.setTimeout(tick, 250)  // 250ms 딜레이 후 시작
    } else if (step > typingStep) {
      // 이미 지난 단계 → 즉시 전체 표시
      setTypedCharsAnim(typeStep.text.length)
    } else {
      // 타이핑 전 → 빈 칸
      setTypedCharsAnim(0)
    }
    return () => {
      if (typeTimerRef.current) {
        window.clearTimeout(typeTimerRef.current)
        typeTimerRef.current = null
      }
    }
  }, [step, typingStep, typeStep])

  const typedChars = typedCharsAnim

  const phase: Phase =
    step === 0 ? "idle" :
    step === promptStep ? "prompt-flying" :
    step === typingStep ? "typing" :
    step === enterStep ? "enter-pressed" :
    step === storeStep ? "stored" :
    step >= totalSteps ? "done" :
    "converting"

  const reset = () => setStep(0)
  const stepOnce = () => setStep((s) => Math.min(s + 1, totalSteps))
  const runAll = () => setStep(totalSteps)

  const typedText = typeStep ? typeStep.text.slice(0, typedChars) : ""
  const isActivelyTyping = step === typingStep && typeStep && typedChars < typeStep.text.length
  const typingDoneInTerminal = step >= typingStep && typeStep && typedChars >= typeStep.text.length
  const cursorVisible = isActivelyTyping || (step === typingStep && typingDoneInTerminal) || step === enterStep

  // 변수에 들어간 최종 값
  const finalValueIdx = convertStage  // 마지막 변환 단계 (없으면 -1)
  let varValue = ""
  let varType = "str"
  if (valueStored) {
    if (finalValueIdx >= 0) {
      const last = convertSteps[finalValueIdx]
      varValue = last.to
      varType = last.toType || "str"
    } else {
      varValue = `"${typedText}"`
      varType = "str"
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedId(p.id); reset() }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono"
            style={selectedId === p.id
              ? { background: p.color, color: "white", borderColor: p.color }
              : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 p-4 space-y-4" style={{ borderColor: preset.color + "40", background: preset.color + "0d" }}>

        {/* 코드 — input() 안의 prompt 문자열을 같은 색으로 하이라이트해서 터미널과 시각적으로 연결 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "CODE" : "코드"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100 whitespace-pre-wrap leading-7">
            {(() => {
              if (!preset.prompt) return preset.code
              const idx = preset.code.indexOf(preset.prompt)
              if (idx === -1) return preset.code
              return (
                <>
                  {preset.code.slice(0, idx)}
                  <motion.span
                    className="rounded-sm"
                    animate={
                      phase === "prompt-flying"
                        ? { scale: [1, 1.18, 1, 1.18, 1], opacity: [1, 0.5, 1, 0.5, 1] }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 1.0 }}
                    style={{
                      background: "#7c2d12",
                      color: "#fed7aa",
                      padding: "0 3px",
                      boxShadow: phase === "prompt-flying" ? "0 0 0 2px #fb923c" : "0 0 0 1px #fb923c80",
                      display: "inline-block",
                    }}
                    title={isEn ? "This text shows in the terminal" : "이 글자가 터미널에 보여요"}
                  >
                    {preset.prompt}
                  </motion.span>
                  {preset.code.slice(idx + preset.prompt.length)}
                </>
              )
            })()}
          </div>
          {preset.prompt ? (
            <div className="text-[10px] text-gray-400 mt-1">
              💡 {isEn
                ? "Step 1 sends the highlighted text from input(\"...\") to the terminal as a question."
                : "1 단계 누르면 input(\"...\") 안의 강조된 글자가 아래 터미널로 질문처럼 옮겨가요."}
            </div>
          ) : (
            <div className="text-[10px] text-amber-700 mt-1 px-2 py-1 rounded" style={{ background: "#fef3c7" }}>
              ⚠️ {isEn
                ? <>The <code className="font-mono font-bold">input()</code> here is <strong>empty (no \"...\")</strong> — so <strong>no prompt shows in the terminal</strong>. The user just types right away, with no hint about what to enter.</>
                : <>여기 <code className="font-mono font-bold">input()</code> 안이 <strong>비어있어요 (\"...\" 없음)</strong> — 그래서 <strong>터미널에 질문이 안 떠요</strong>. 사용자는 뭘 입력해야 할지 모른 채 바로 타이핑해요.</>
              }
            </div>
          )}
        </div>

        {/* 터미널 + 변수 박스 — 좌/우 나란히 (모바일에선 위/아래) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">

        {/* 터미널 — 사용자 타이핑 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "TERMINAL (USER TYPES)" : "터미널 (사용자 입력)"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100 min-h-[60px] flex items-center">
            {preset.prompt && promptShown && (
              <motion.span
                key={`prompt-${selectedId}-${step}`}
                className="rounded-sm mr-1"
                initial={phase === "prompt-flying" ? { scale: 0.4, opacity: 0, y: -10 } : false}
                animate={
                  phase === "prompt-flying"
                    ? { scale: [0.4, 1.2, 1, 1.2, 1], opacity: [0, 1, 1, 1, 1], y: [-10, 0, 0, 0, 0] }
                    : { scale: 1, opacity: 1, y: 0 }
                }
                transition={{ duration: 1.0 }}
                style={{
                  background: "#7c2d12",
                  color: "#fed7aa",
                  padding: "0 3px",
                  boxShadow: phase === "prompt-flying" ? "0 0 0 2px #fb923c" : "0 0 0 1px #fb923c80",
                  display: "inline-block",
                }}
                title={isEn ? "This came from input(\"...\") in the code" : "코드의 input(\"...\") 에서 온 글자"}
              >
                {preset.prompt}
              </motion.span>
            )}
            {!promptShown && hasPrompt && (
              <span className="text-gray-600 italic text-xs">
                {isEn ? "(empty — press Step to send the prompt)" : "(비어 있음 — 한 단계 누르면 질문이 떠요)"}
              </span>
            )}
            {!hasPrompt && step === 0 && (
              <span className="text-gray-600 italic text-xs">
                {isEn ? "(no prompt — input() is empty)" : "(질문 없음 — input() 안이 비어있어요)"}
              </span>
            )}
            <span className="text-amber-200">{typedText}</span>
            {cursorVisible && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="inline-block w-2 h-4 ml-0.5 align-middle"
                style={{ background: "#fbbf24" }}
              />
            )}
            {step === enterStep && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold"
                style={{ background: "#1e3a8a", color: "#bfdbfe" }}
              >
                ⏎ Enter
              </motion.span>
            )}
          </div>
        </div>

        {/* 변환 체인 */}
        {convertSteps.length > 0 && (
          <div>
            <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
              {isEn ? "PROCESSING" : "처리 단계"}
            </div>
            <div className="bg-white rounded-xl px-4 py-3 space-y-2 border">
              {convertSteps.map((cs, i) => {
                const visible = valueStored && convertStage >= i
                const c = TYPE_COLORS[cs.toType] || "#94a3b8"
                return (
                  <AnimatePresence key={i}>
                    {visible && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 flex-wrap text-sm font-mono"
                      >
                        <span className="text-gray-500">{cs.from}</span>
                        <span className="text-gray-300">→</span>
                        <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: c + "22", color: c }}>
                          {cs.func}
                        </span>
                        <span className="text-gray-300">→</span>
                        <span className="font-bold" style={{ color: cs.to.includes("Error") ? "#ef4444" : c }}>
                          {cs.to}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>
          </div>
        )}

        {/* 변수 박스 — 오른쪽에 항상 보이는 "저장 상자" 그림 */}
        <div className="flex flex-col items-center md:items-start md:min-w-[180px]">
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "📦 VARIABLE BOX" : "📦 변수 상자"}
          </div>
          {/* 큰 박스 — 라벨 (변수 이름) + 내용물 영역. step 변할 때마다 펄스 */}
          <motion.div
            // store step + 모든 변환 step 에서 펄스
            key={`box-${selectedId}-${step}`}
            animate={(phase === "stored" || phase === "converting") ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                `0 0 0 0px ${TYPE_COLORS[varType] || "#94a3b8"}00`,
                `0 0 0 8px ${TYPE_COLORS[varType] || "#94a3b8"}55`,
                `0 0 0 0px ${TYPE_COLORS[varType] || "#94a3b8"}00`,
              ]
            } : { scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative bg-white rounded-2xl border-4 px-5 py-4 min-w-[160px]"
            style={{
              borderColor: valueStored ? TYPE_COLORS[varType] || "#94a3b8" : "#cbd5e1",
              borderStyle: valueStored ? "solid" : "dashed",
            }}
          >
            {/* 박스 위 라벨 — 변수 이름 (이름표 처럼) */}
            <div
              className="absolute -top-3 left-3 px-2 py-0.5 rounded text-xs font-mono font-bold bg-white"
              style={{
                color: valueStored ? TYPE_COLORS[varType] : "#94a3b8",
                border: `2px solid ${valueStored ? TYPE_COLORS[varType] || "#94a3b8" : "#cbd5e1"}`,
              }}
            >
              {preset.varName}
            </div>

            {/* 박스 내용 — 값 또는 ? */}
            <div className="flex flex-col items-center justify-center min-h-[40px]">
              <AnimatePresence mode="wait">
                {!valueStored ? (
                  <motion.div
                    key="empty"
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="font-mono text-2xl text-gray-300"
                  >
                    ?
                  </motion.div>
                ) : (
                  <motion.div
                    // step 마다 다른 key → 변환 단계마다 새로 떨어지는 애니메이션
                    key={`filled-${selectedId}-${step}`}
                    initial={{ scale: 0.3, opacity: 0, y: -40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="font-mono text-base font-bold text-center"
                    style={{ color: varValue.includes("Error") ? "#ef4444" : "#374151" }}
                  >
                    {varValue}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 타입 태그 — 채워진 후만 (박스 아래 작게). 변환마다 다시 등장. */}
            {valueStored && (
              <motion.div
                key={`type-${selectedId}-${step}`}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-1"
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{ background: (TYPE_COLORS[varType] || "#94a3b8") + "22", color: TYPE_COLORS[varType] || "#94a3b8" }}
                >
                  {varType}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* 박스 아래 상태 안내 — 매 단계마다 무엇이 일어났는지 */}
          <div className="text-[10px] italic mt-2 text-center md:text-left max-w-[180px]">
            {(() => {
              if (!valueStored) {
                return <span className="text-gray-400">{isEn ? "Empty — waiting for Enter" : "비어있음 — Enter 기다리는 중"}</span>
              }
              if (phase === "stored") {
                return <span className="text-emerald-600">{isEn
                  ? `✨ Just stored as ${varType}!`
                  : `✨ ${varType} 로 저장됨!`}</span>
              }
              if (phase === "converting" && convertStage >= 0 && convertSteps[convertStage]) {
                const cs = convertSteps[convertStage]
                if (cs.to.includes("Error")) {
                  return <span className="text-red-500">⚠️ {isEn ? `Error: ${cs.func} on ${cs.from}` : `에러: ${cs.from} 에 ${cs.func} 못 함`}</span>
                }
                return <span className="text-emerald-600">{isEn
                  ? `✨ ${cs.func} → now ${varType}!`
                  : `✨ ${cs.func} 적용 → 이제 ${varType}!`}</span>
              }
              return <span className="text-gray-400">{isEn ? "Stored ✓" : "저장됨 ✓"}</span>
            })()}
          </div>
        </div>

        </div>{/* end terminal+variable grid */}

        {/* 캡션 */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-3 py-2 text-xs"
              style={{ background: preset.color + "15", color: "#374151" }}
            >
              💡 {preset.caption}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진행 상태 + 다음 단계 라벨 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            <span className="font-mono">{step}</span>
            <span className="text-gray-300"> / </span>
            <span className="font-mono">{totalSteps}</span>
            <span className="ml-1">{isEn ? "steps" : "단계"}</span>
          </span>
          {phase !== "done" && step < totalSteps && (() => {
            // 다음 단계 라벨 — step 의미와 구체적인 변환 동작 명시
            const labels: { ko: string; en: string }[] = []
            let n = 1
            if (hasPrompt) {
              labels.push({
                ko: `→ 다음: ${n}. 질문이 코드 → 터미널로 (깜빡!)`,
                en: `→ next: ${n}. prompt flies code → terminal (blink!)`,
              })
              n++
            }
            labels.push({
              ko: `→ 다음: ${n}. 사용자가 한 글자씩 타이핑`,
              en: `→ next: ${n}. user types char by char`,
            }); n++
            labels.push({
              ko: `→ 다음: ${n}. Enter 누르기`,
              en: `→ next: ${n}. press Enter`,
            }); n++
            labels.push({
              ko: `→ 다음: ${n}. 값이 ${preset.varName} 박스에 문자열로 저장 ✨`,
              en: `→ next: ${n}. value stored in ${preset.varName} as string ✨`,
            }); n++
            convertSteps.forEach((cs) => {
              const isError = cs.to.includes("Error")
              if (isError) {
                labels.push({
                  ko: `→ 다음: ${n}. ${cs.func} 시도 → ❌ 에러!`,
                  en: `→ next: ${n}. try ${cs.func} → ❌ error!`,
                })
              } else {
                labels.push({
                  ko: `→ 다음: ${n}. ${cs.func} 적용 → ${cs.to} (${cs.toType})`,
                  en: `→ next: ${n}. apply ${cs.func} → ${cs.to} (${cs.toType})`,
                })
              }
              n++
            })
            const label = labels[step]
            return label ? <span className="italic">{isEn ? label.en : label.ko}</span> : null
          })()}
          {phase === "done" && (
            <span className="font-bold" style={{ color: preset.color }}>✓ {isEn ? "done" : "끝"}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={stepOnce}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: preset.color }}
          >
            ▷ {isEn ? "Step" : "한 단계"}
            {stepsLeft > 0 && (
              <span className="ml-1 text-xs opacity-80">({stepsLeft} {isEn ? "left" : "남음"})</span>
            )}
          </button>
          <button
            onClick={runAll}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "white", color: preset.color, borderColor: preset.color + "60" }}
          >
            ⏭ {isEn ? "Show all" : "끝까지"}
          </button>
          <button
            onClick={reset}
            disabled={step === 0}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ↺ {isEn ? "Reset" : "다시"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputVisualizer
export { InputVisualizer }
