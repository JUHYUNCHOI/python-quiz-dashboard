"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Tab = "ref" | "ptr"

export default function PointerRefVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [tab, setTab] = useState<Tab>("ref")
  const [xVal, setXVal] = useState(42)
  const [modified, setModified] = useState(false)

  const handleModify = () => {
    if (modified) {
      setXVal(42)
      setModified(false)
      return
    }
    setXVal(99)
    setModified(true)
  }

  const handleTab = (t: Tab) => {
    setTab(t)
    setXVal(42)
    setModified(false)
  }

  const isEn = lang === "en"
  const color = tab === "ref" ? "#6366f1" : "#10b981"

  return (
    <div className="w-full max-w-md mx-auto space-y-3 select-none">
      {/* 탭 */}
      <div className="flex gap-2">
        <TabBtn active={tab === "ref"} onClick={() => handleTab("ref")} label={isEn ? "Reference (int& ref)" : "참조 (int& ref)"} color="#6366f1" />
        <TabBtn active={tab === "ptr"} onClick={() => handleTab("ptr")} label={isEn ? "Pointer (int* ptr)" : "포인터 (int* ptr)"} color="#10b981" />
      </div>

      {/* 코드 */}
      <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm space-y-0.5">
        <div>
          <span className="text-emerald-400">int</span>{" "}
          <span className="text-white">x</span> ={" "}
          <span className="text-orange-300">42</span>;
        </div>
        {tab === "ref" && (
          <div>
            <span className="text-emerald-400">int</span>
            <span className="text-pink-400">&amp;</span>{" "}
            <span className="text-white">ref</span> = x;
            <span className="text-slate-500">  {isEn ? "// direct connection" : "// 직접 연결"}</span>
          </div>
        )}
        {tab === "ptr" && (
          <div>
            <span className="text-emerald-400">int</span>
            <span className="text-emerald-300">*</span>{" "}
            <span className="text-white">ptr</span> ={" "}
            <span className="text-pink-400">&amp;</span>x;
            <span className="text-slate-500">  {isEn ? "// store address of x" : "// x의 주소 저장"}</span>
          </div>
        )}
        {modified && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-300">
            {tab === "ref" ? "ref = 99;" : "*ptr = 99;"}
            <span className="text-slate-500">  {isEn ? "// run!" : "// 실행!"}</span>
          </motion.div>
        )}
      </div>

      {/* 시각화 */}
      <div
        className="rounded-2xl border-2 bg-white p-5"
        style={{ borderColor: color + "40" }}
      >
        {tab === "ref" ? (
          <RefViz xVal={xVal} modified={modified} isEn={isEn} />
        ) : (
          <PtrViz xVal={xVal} modified={modified} isEn={isEn} />
        )}
      </div>

      {/* 실행 버튼 */}
      <button
        onClick={handleModify}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
        style={{ background: modified ? "#94a3b8" : color }}
      >
        {modified
          ? (isEn ? "↺ Reset" : "↺ 초기화")
          : tab === "ref"
          ? (isEn ? "▶ Run ref = 99;" : "▶ ref = 99; 실행해보기")
          : (isEn ? "▶ Run *ptr = 99;" : "▶ *ptr = 99; 실행해보기")}
      </button>

      {/* 비교 요약 */}
      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-2">
        <p className="font-bold text-slate-600 mb-1">{isEn ? "Side-by-side comparison" : "한눈에 비교"}</p>
        <div className="flex items-start gap-2">
          <span className="font-mono font-bold text-indigo-500 shrink-0 pt-0.5">{isEn ? "Reference" : "참조"}</span>
          <span className="text-slate-500">{isEn ? "No new memory. Just adds a name tag to x. ref = 99 immediately changes x." : "새 메모리 없음. x에 이름표만 추가. ref = 99 하면 바로 x가 바뀜."}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-mono font-bold text-emerald-600 shrink-0 pt-0.5">{isEn ? "Pointer" : "포인터"}</span>
          <span className="text-slate-500">{isEn ? "Stores x's address in separate memory. Must dereference with *ptr to access x." : "별도 메모리에 x의 주소 저장. *ptr로 역참조해야 x에 접근."}</span>
        </div>
      </div>
    </div>
  )
}

function TabBtn({
  active, onClick, label, color,
}: {
  active: boolean; onClick: () => void; label: string; color: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all"
      style={
        active
          ? { borderColor: color, background: color + "15", color }
          : { borderColor: "#e2e8f0", background: "white", color: "#94a3b8" }
      }
    >
      {label}
    </button>
  )
}

function MemoryBox({
  value, color, label, address, highlight, small,
}: {
  value: number | string; color: string; label: string
  address: string; highlight?: boolean; small?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] text-slate-400 font-mono">{address}</span>
      <motion.div
        animate={highlight ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black border-3 transition-all duration-300"
        style={{
          borderWidth: 3,
          fontSize: small ? "9px" : "22px",
          background: highlight ? color + "20" : "#f8fafc",
          borderColor: highlight ? color : "#e2e8f0",
          color: highlight ? color : "#94a3b8",
          boxShadow: highlight ? `0 0 0 4px ${color}25` : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={String(value)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="text-xs font-bold" style={{ color: highlight ? color : "#94a3b8" }}>
        {label}
      </span>
    </div>
  )
}

function RefViz({ xVal, modified, isEn }: { xVal: number; modified: boolean; isEn: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[9px] text-slate-400 font-mono">0x1000</span>
        <div className="relative">
          <motion.div
            animate={modified ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-[22px] font-black border-3 transition-all duration-300"
            style={{
              borderWidth: 3,
              background: modified ? "#6366f120" : "#f8fafc",
              borderColor: modified ? "#6366f1" : "#e2e8f0",
              color: modified ? "#6366f1" : "#94a3b8",
              boxShadow: modified ? "0 0 0 4px #6366f125" : undefined,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={xVal}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {xVal}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          {/* 이름표 두 개 */}
          <div className="absolute -top-3 left-0 right-0 flex justify-center gap-1">
            <span className="text-[9px] font-bold bg-slate-500 text-white px-1.5 py-0.5 rounded-full">x</span>
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
              style={{ background: "#6366f1" }}
            >
              ref
            </motion.span>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2 text-xs text-indigo-700">
        {isEn
          ? <>🏷️ ref has no new memory. Just adds a name tag to the same box (0x1000).
            {modified && <span className="font-bold"> ref = 99 is exactly the same as x = 99!</span>}</>
          : <>🏷️ ref는 새 메모리가 없어요. 같은 상자(0x1000)에 이름표만 추가.
            {modified && <span className="font-bold"> ref = 99는 x = 99와 완전히 같아요!</span>}</>
        }
      </div>
    </div>
  )
}

function PtrViz({ xVal, modified, isEn }: { xVal: number; modified: boolean; isEn: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        {/* ptr 박스 — 주소값을 담는 별도 메모리 */}
        <MemoryBox
          value="0x1000"
          color="#10b981"
          label="ptr"
          address="0x2000"
          small
        />

        {/* 화살표 */}
        <motion.div
          animate={modified ? { scale: [1, 1.4, 1], color: ["#10b981", "#f59e0b", "#10b981"] } : {}}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-emerald-400"
        >
          →
        </motion.div>

        {/* x 박스 */}
        <MemoryBox
          value={xVal}
          color="#10b981"
          label="x"
          address="0x1000"
          highlight={modified}
        />
      </div>

      <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-emerald-700">
        {isEn
          ? <>📍 ptr(0x2000) stores x's address (0x1000).
            {modified
              ? <span className="font-bold"> *ptr = 99 follows the arrow and changes x!</span>
              : <span> Must dereference with *ptr to access x.</span>}</>
          : <>📍 ptr(0x2000)은 x의 주소(0x1000)를 저장해요.
            {modified
              ? <span className="font-bold"> *ptr = 99는 화살표를 따라가서 x를 바꿔요!</span>
              : <span> *ptr로 역참조해야 x에 접근할 수 있어요.</span>}</>
        }
      </div>
    </div>
  )
}
