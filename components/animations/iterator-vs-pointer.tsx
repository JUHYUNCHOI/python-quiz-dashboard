"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * 포인터 vs 이터레이터 시뮬레이터
 * - vector (메모리 연속) 와 list (메모리 흩어짐) 두 상황을 토글
 * - "++" 버튼 누르면 둘이 어떻게 다르게 움직이는지 보여줌
 * - vector 에선 둘이 똑같이 다음 칸. list 에선 포인터는 엉뚱한 주소, 이터레이터만 다음 노드.
 */

type Mode = "vector" | "list"

const VECTOR_DATA = [
  { value: 10, addr: 100 },
  { value: 20, addr: 104 },
  { value: 30, addr: 108 },
  { value: 40, addr: 112 },
  { value: 50, addr: 116 },
]

// list 는 메모리 주소가 흩어져 있고 next 로 연결됨
const LIST_DATA = [
  { value: 10, addr: 700, next: 1 },
  { value: 20, addr: 312, next: 2 },
  { value: 30, addr: 950, next: 3 },
  { value: 40, addr: 184, next: 4 },
  { value: 50, addr: 528, next: -1 },
]

export function IteratorVsPointer() {
  const [mode, setMode] = useState<Mode>("vector")
  const [step, setStep] = useState(0)
  const data = mode === "vector" ? VECTOR_DATA : LIST_DATA
  const maxStep = data.length - 1

  // 포인터/이터레이터의 현재 "주소"
  // vector: 둘 다 같은 진짜 주소 (data[step].addr)
  // list: 이터레이터는 data[step].addr 따라감, 포인터는 시작 + step*4 (엉뚱한 주소)
  const itAddr = data[step].addr
  const ptrAddr = mode === "vector" ? data[step].addr : data[0].addr + step * 4

  // 포인터가 list 에서 의미 있는 자리를 가리키는지
  const ptrPointsToValidSlot = mode === "vector" || step === 0
  const ptrValue =
    mode === "vector"
      ? data[step].value
      : step === 0
      ? data[0].value
      : null

  const reset = () => setStep(0)
  const next = () => setStep((s) => Math.min(s + 1, maxStep))

  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 20,
        fontFamily: "ui-monospace, monospace",
      }}
    >
      {/* Mode 토글 */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        {(["vector", "list"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setStep(0) }}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "2px solid",
              borderColor: mode === m ? "#2563eb" : "#cbd5e1",
              background: mode === m ? "#2563eb" : "#fff",
              color: mode === m ? "#fff" : "#475569",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "sans-serif",
            }}
          >
            {m === "vector" ? "📦 vector (메모리 연속)" : "🕸️ list (메모리 흩어짐)"}
          </button>
        ))}
      </div>

      {/* 데이터 박스들 */}
      <div style={{ position: "relative", minHeight: 180, padding: "30px 10px 50px" }}>
        {/* 박스들 — vector 면 직선, list 면 흩뿌리기 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: mode === "vector" ? 0 : 24,
            alignItems: "center",
            flexWrap: mode === "list" ? "wrap" : "nowrap",
          }}
        >
          {data.map((node, i) => {
            const isPointed = i === step
            // list 면 박스들이 위/아래로 살짝씩 흩어지게
            const yOffset = mode === "list" ? [0, -8, 12, -4, 8][i] : 0
            return (
              <motion.div
                key={i}
                layout
                style={{
                  position: "relative",
                  marginTop: yOffset,
                }}
              >
                <div
                  style={{
                    width: 70,
                    minHeight: 56,
                    background: isPointed ? "#dbeafe" : "#fff",
                    border: `2px solid ${isPointed ? "#2563eb" : "#cbd5e1"}`,
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#1e293b",
                    boxShadow: isPointed ? "0 4px 12px rgba(37,99,235,0.25)" : "none",
                    transition: "all 0.25s",
                  }}
                >
                  <div>{node.value}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
                    @{node.addr}
                  </div>
                </div>
                {/* list 면 화살표 */}
                {mode === "list" && (node as { next: number }).next !== -1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -22,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                )}

                {/* 이터레이터 손가락 (현재 자리) */}
                {isPointed && (
                  <motion.div
                    layoutId="iterator"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: "absolute",
                      bottom: -28,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 18,
                      color: "#16a34a",
                      fontWeight: 700,
                      fontFamily: "sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ↑ it
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* 포인터 표시 — vector 면 박스 위, list 면 떠다니는 엉뚱한 주소 */}
        {mode === "vector" && (
          <motion.div
            layout
            style={{
              position: "absolute",
              top: 0,
              left: `calc(50% - ${data.length * 35}px + ${step * 70}px + 35px)`,
              transform: "translateX(-50%)",
              fontSize: 16,
              color: "#dc2626",
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            ↓ ptr
          </motion.div>
        )}
        {mode === "list" && step > 0 && (
          <div
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fef2f2",
              border: "1.5px dashed #dc2626",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              color: "#991b1b",
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            ❌ ptr @{ptrAddr} (엉뚱한 주소!)
          </div>
        )}
        {mode === "list" && step === 0 && (
          <div
            style={{
              position: "absolute",
              top: -4,
              left: `calc(50% - ${data.length * 35}px + 35px - 12px)`,
              transform: "translateX(-50%)",
              fontSize: 16,
              color: "#dc2626",
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            ↓ ptr
          </div>
        )}
      </div>

      {/* 상태 표시 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 14,
          fontFamily: "sans-serif",
          fontSize: 13,
        }}
      >
        <div
          style={{
            background: ptrPointsToValidSlot ? "#fef2f2" : "#fef2f2",
            border: `1.5px solid ${ptrPointsToValidSlot ? "#fca5a5" : "#dc2626"}`,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <div style={{ fontWeight: 800, color: "#991b1b", marginBottom: 4 }}>
            🔻 Pointer (\`p\`)
          </div>
          <div style={{ fontSize: 12, color: "#7f1d1d", lineHeight: 1.5 }}>
            현재 주소: <b>@{ptrAddr}</b>
            <br />
            값: <b>{ptrValue === null ? "??? (의미 없음)" : ptrValue}</b>
            <br />
            <span style={{ color: "#64748b" }}>++ = 항상 주소 + 4</span>
          </div>
        </div>
        <div
          style={{
            background: "#dcfce7",
            border: "1.5px solid #16a34a",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <div style={{ fontWeight: 800, color: "#166534", marginBottom: 4 }}>
            🟢 Iterator (`it`)
          </div>
          <div style={{ fontSize: 12, color: "#14532d", lineHeight: 1.5 }}>
            현재 주소: <b>@{itAddr}</b>
            <br />
            값: <b>{data[step].value}</b>
            <br />
            <span style={{ color: "#64748b" }}>
              ++ = {mode === "vector" ? "주소 + 4" : "node->next 따라가기"}
            </span>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", fontFamily: "sans-serif" }}>
        <button
          onClick={next}
          disabled={step >= maxStep}
          style={{
            padding: "10px 20px",
            background: step >= maxStep ? "#cbd5e1" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: step >= maxStep ? "not-allowed" : "pointer",
            fontSize: 14,
          }}
        >
          ▶ ++ (다음 칸으로)
        </button>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            background: "#fff",
            color: "#475569",
            border: "1.5px solid #cbd5e1",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          🔄 처음으로
        </button>
      </div>

      {/* 설명 박스 */}
      <AnimatePresence mode="wait">
        {step > 0 && (
          <motion.div
            key={`${mode}-${step}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 8,
              fontFamily: "sans-serif",
              fontSize: 13,
              lineHeight: 1.6,
              background: mode === "vector" ? "#eff6ff" : "#fef2f2",
              color: mode === "vector" ? "#1e3a8a" : "#7f1d1d",
              border: `1.5px solid ${mode === "vector" ? "#93c5fd" : "#fca5a5"}`,
            }}
          >
            {mode === "vector" ? (
              <>
                ✅ <b>vector 에선 둘이 똑같이 동작</b> — 둘 다 다음 칸으로 한 칸 이동.
                메모리가 연속이라 "주소 + 4" 가 곧 다음 값.
              </>
            ) : (
              <>
                ❌ <b>list 에선 포인터가 망가짐</b> — 포인터는 주소 + 4 를 했지만 그건
                의미 없는 메모리. 실제 다음 노드는 <b>@{data[step].addr}</b> 에 흩어져 있음.
                <br />
                ✅ <b>이터레이터는 알아서 따라감</b> — \`node-&gt;next\` 호출로 진짜 다음 자리로.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
