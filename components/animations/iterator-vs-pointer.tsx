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
        background: "var(--color-zinc-50)",
        border: "1px solid var(--color-gray-200)",
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
              borderColor: mode === m ? "var(--color-blue-600)" : "var(--color-slate-300)",
              background: mode === m ? "var(--color-blue-600)" : "var(--color-white)",
              color: mode === m ? "var(--ink-on-accent)" : "var(--color-slate-600)",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "sans-serif",
            }}
          >
            {m === "vector" ? "📦 vector / 배열 (int a[N])" : "🕸️ std::list (linked list — 노드 연결)"}
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
                    background: isPointed ? "var(--color-blue-100)" : "var(--color-white)",
                    border: `2px solid ${isPointed ? "var(--color-blue-600)" : "var(--color-slate-300)"}`,
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--color-slate-800)",
                    boxShadow: isPointed ? "0 4px 12px rgba(37,99,235,0.25)" : "none",
                    transition: "all 0.25s",
                  }}
                >
                  <div>{node.value}</div>
                  <div style={{ fontSize: 10, color: "var(--color-slate-400)", fontWeight: 500 }}>
                    @{node.addr}
                  </div>
                </div>
                {/* list 면 화살표 */}
                {mode === "list" && (node as unknown as { next: number }).next !== -1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -22,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-slate-400)",
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
                      color: "var(--color-green-600)",
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
              color: "var(--color-red-600)",
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
              background: "var(--color-red-50)",
              border: "1.5px dashed var(--color-red-600)",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              color: "var(--color-red-800)",
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
              color: "var(--color-red-600)",
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            ↓ ptr
          </div>
        )}
      </div>

      {/* "++ 했을 때 어디로 가나" — 핵심 비교 (학생이 차이 바로 보게) */}
      {step > 0 && (
        <div
          style={{
            background: "var(--color-white)",
            border: `2px solid ${mode === "vector" ? "var(--color-green-300)" : "var(--color-red-300)"}`,
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 12,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-slate-600)", marginBottom: 8, letterSpacing: 0.3, textAlign: "center" }}>
            {step}{step === 1 ? "ST" : step === 2 ? "ND" : step === 3 ? "RD" : "TH"} ++ 후, 두 친구가 간 곳:
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            fontFamily: "ui-monospace, monospace",
            fontSize: 14,
          }}>
            {/* Pointer's destination */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-red-600)", marginBottom: 4, fontFamily: "sans-serif" }}>
                🔻 포인터 도착지
              </div>
              <div style={{
                background: mode === "vector" ? "var(--color-red-50)" : "var(--color-red-100)",
                border: `2px solid ${mode === "vector" ? "var(--color-red-300)" : "var(--color-red-600)"}`,
                borderRadius: 8,
                padding: "8px 6px",
                fontWeight: 900,
                fontSize: 18,
                color: "var(--color-red-800)",
              }}>
                @{ptrAddr}
              </div>
              <div style={{ fontSize: 11, marginTop: 4, fontFamily: "sans-serif", color: mode === "vector" ? "var(--color-green-600)" : "var(--color-red-600)", fontWeight: 700 }}>
                {mode === "vector" ? "✓ 실제 다음 노드" : "💥 빈 메모리 (노드 없음)"}
              </div>
            </div>
            {/* Iterator's destination */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--color-green-600)", marginBottom: 4, fontFamily: "sans-serif" }}>
                🟢 이터레이터 도착지
              </div>
              <div style={{
                background: "var(--color-green-100)",
                border: "2px solid var(--color-green-600)",
                borderRadius: 8,
                padding: "8px 6px",
                fontWeight: 900,
                fontSize: 18,
                color: "var(--color-green-800)",
              }}>
                @{itAddr}
              </div>
              <div style={{ fontSize: 11, marginTop: 4, fontFamily: "sans-serif", color: "var(--color-green-600)", fontWeight: 700 }}>
                ✓ 실제 다음 노드 (값 {data[step].value})
              </div>
            </div>
          </div>
          {/* Verdict — 한 줄로 차이 강조 */}
          <div style={{
            marginTop: 10,
            padding: "8px 10px",
            background: mode === "vector" ? "var(--color-green-50)" : "var(--color-red-50)",
            border: `1px solid ${mode === "vector" ? "var(--color-green-300)" : "var(--color-red-300)"}`,
            borderRadius: 6,
            fontSize: 12,
            color: mode === "vector" ? "var(--color-green-700)" : "var(--color-red-800)",
            fontWeight: 700,
            textAlign: "center",
            fontFamily: "sans-serif",
            lineHeight: 1.6,
          }}>
            {mode === "vector"
              ? "📦 메모리 연속 → 두 주소 같음. 둘 다 정답!"
              : `🕸️ 메모리 흩어짐 → 포인터는 @${ptrAddr} (빈 자리), 이터레이터는 @${itAddr} (진짜 다음 노드). ${itAddr - ptrAddr > 0 ? "+" : ""}${itAddr - ptrAddr} 만큼 차이!`}
          </div>
        </div>
      )}

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
            background: ptrPointsToValidSlot ? "var(--color-red-50)" : "var(--color-red-50)",
            border: `1.5px solid ${ptrPointsToValidSlot ? "var(--color-red-300)" : "var(--color-red-600)"}`,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <div style={{ fontWeight: 800, color: "var(--color-red-800)", marginBottom: 4 }}>
            🔻 Pointer <span style={{ fontFamily: "ui-monospace, monospace", background: "var(--color-red-100)", padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>p</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--color-red-900)", lineHeight: 1.5 }}>
            현재 주소: <b>@{ptrAddr}</b>
            <br />
            값: <b>{ptrValue === null ? "??? (의미 없음)" : ptrValue}</b>
            <br />
            <span style={{ color: "var(--color-slate-500)" }}>++ = 항상 주소 + 4</span>
          </div>
        </div>
        <div
          style={{
            background: "var(--color-green-100)",
            border: "1.5px solid var(--color-green-600)",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <div style={{ fontWeight: 800, color: "var(--color-green-800)", marginBottom: 4 }}>
            🟢 Iterator <span style={{ fontFamily: "ui-monospace, monospace", background: "var(--color-green-100)", padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>it</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--color-green-900)", lineHeight: 1.5 }}>
            현재 주소: <b>@{itAddr}</b>
            <br />
            값: <b>{data[step].value}</b>
            <br />
            <span style={{ color: "var(--color-slate-500)" }}>
              ++ = {mode === "vector" ? "주소 + 4" : "node->next 따라가기"}
            </span>
          </div>
        </div>
      </div>

      {/* Context note — 두 박스 의미 안내 */}
      <div
        style={{
          background: mode === "vector" ? "var(--color-amber-50)" : "var(--color-red-50)",
          border: `1.5px solid ${mode === "vector" ? "var(--color-amber-200)" : "var(--color-red-200)"}`,
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 14,
          fontFamily: "sans-serif",
          fontSize: 13,
          color: mode === "vector" ? "var(--color-amber-800)" : "var(--color-red-800)",
          lineHeight: 1.7,
          fontWeight: 600,
        }}
      >
        {mode === "vector" ? (
          <>
            👀 <b>지금은 같아 보여요</b> — <code style={{ background: "var(--color-white)", padding: "1px 4px", borderRadius: 3 }}>vector</code> 나 <code style={{ background: "var(--color-white)", padding: "1px 4px", borderRadius: 3 }}>int a[N]</code> 같은 *배열* 은 메모리가 *연속* 이라서 포인터·이터레이터 동작 동일.
            <br />
            <b>🕸 std::list 모드로 바꿔보세요</b> — 그게 진짜 차이가 나는 자료구조예요.
          </>
        ) : (
          <>
            ⚠️ <b>이제 차이가 보이죠!</b>
            <br />
            <code style={{ background: "var(--color-white)", padding: "1px 4px", borderRadius: 3 }}>std::list</code> = <b>linked list</b> 라는 자료구조. 노드 (값 1 개씩) 들이 메모리 여기저기 *흩어져* 있고, 각 노드가 다음 노드의 주소를 따로 들고 있어요. <i>int a[N] 같은 배열이랑 *다름*</i>.
            <br />
            • 포인터는 *주소 + 4* 만 알아 → 엉뚱한 자리 (메모리 망가짐).
            <br />
            • 이터레이터는 <code style={{ background: "var(--color-white)", padding: "1px 4px", borderRadius: 3 }}>node-&gt;next</code> 따라가서 *진짜* 다음 자리로 감.
          </>
        )}
      </div>

      {/* 버튼 */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", fontFamily: "sans-serif" }}>
        <button
          onClick={next}
          disabled={step >= maxStep}
          style={{
            padding: "10px 20px",
            background: step >= maxStep ? "var(--color-slate-300)" : "var(--color-blue-600)",
            color: "var(--ink-on-accent)",
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
            background: "var(--color-white)",
            color: "var(--color-slate-600)",
            border: "1.5px solid var(--color-slate-300)",
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
              background: mode === "vector" ? "var(--color-blue-50)" : "var(--color-red-50)",
              color: mode === "vector" ? "var(--color-blue-900)" : "var(--color-red-900)",
              border: `1.5px solid ${mode === "vector" ? "var(--color-blue-300)" : "var(--color-red-300)"}`,
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
