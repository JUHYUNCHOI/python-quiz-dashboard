"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 타입 변환 시각화 (lesson 9) — "옷 갈아입기"
// 단계적으로 천천히 보여줌:
//  1) 나갈 부분(따옴표 / 소수점 뒤)이 먼저 빨갛게 깜박 (= "이게 사라질 거야")
//  2) 그 부분이 크게 날아가거나 떨어져 나감
//  3) 배지 색이 톡 바뀌고 카드가 한 번 빛남
//  + before → after 칩으로 "무엇이 무엇으로" 바뀌었는지 또렷이
// ============================================

const TYPE_COLORS: Record<string, string> = {
  str: "#f59e0b",
  int: "#3b82f6",
  float: "#a855f7",
  bool: "#ec4899",
  error: "#ef4444",
}
const RED = "#ef4444"

type PyType = "str" | "int" | "float" | "bool" | "error"
type FuncName = "int" | "float" | "str" | "bool"

type Val = { type: PyType; q: boolean; head: string; frac: string }
type AnimMode = "normal" | "truncate" | "error"
type Bi = { ko: string; en: string }
type ConvResult = {
  error: boolean
  res: Val | null
  animMode: AnimMode
  label: Bi
  caption: Bi
  funcType: PyType
}

// ---------- 파싱 / 계산 ----------
function floatParts(num: number): { head: string; frac: string } {
  let s = String(num)
  if (!s.includes(".")) s = s + ".0"
  const i = s.indexOf(".")
  return { head: s.slice(0, i), frac: s.slice(i) }
}
function numericValue(v: Val): number {
  return parseFloat(v.head + v.frac)
}
function parseSource(srcRaw: string): Val | null {
  const s = srcRaw.trim()
  if (s.length === 0) return null
  const quoted =
    (s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
    (s.startsWith("'") && s.endsWith("'") && s.length >= 2)
  if (quoted) return { type: "str", q: true, head: s.slice(1, -1), frac: "" }
  if (s === "True" || s === "False") return { type: "bool", q: false, head: s, frac: "" }
  if (/^-?\d+$/.test(s)) return { type: "int", q: false, head: s, frac: "" }
  if (/^-?\d*\.\d+$/.test(s) || /^-?\d+\.\d*$/.test(s)) {
    const i = s.indexOf(".")
    return { type: "float", q: false, head: s.slice(0, i) || "0", frac: s.slice(i) }
  }
  return null
}

const numericStringRe = /^-?(\d+\.?\d*|\.\d+)$/
const intStringRe = /^-?\d+$/

function convert(v: Val, func: FuncName): ConvResult {
  const C = (ko: string, en: string): Bi => ({ ko, en })

  if (func === "str") {
    const body = v.head + v.frac
    return {
      error: false,
      res: { type: "str", q: true, head: body, frac: "" },
      animMode: "normal",
      label: C(`따옴표 옷을 입혀 → "${body}"`, `wrap in quotes → "${body}"`),
      caption: C(
        "str() 은 따옴표 옷을 입혀요. 글자와 + 로 이어붙일 때 필요해요.",
        "str() puts on quotes. Needed to join with text using +.",
      ),
      funcType: "str",
    }
  }
  if (func === "bool") {
    const falsy =
      (v.type === "str" && v.head === "") ||
      ((v.type === "int" || v.type === "float") && numericValue(v) === 0)
    const b = falsy ? "False" : "True"
    return {
      error: false,
      res: { type: "bool", q: false, head: b, frac: "" },
      animMode: "normal",
      label: falsy ? C("0 · 0.0 · 빈 문자열 → False", "0 · 0.0 · empty → False") : C("값이 들어있으니 → True", "has a value → True"),
      caption: C(
        '0, 0.0, 빈 문자열 "" 만 False. 나머지는 모두 True (음수도, "0" 도 True!).',
        'Only 0, 0.0, "" are False. Everything else is True (even -1 and "0"!).',
      ),
      funcType: "bool",
    }
  }
  if (func === "int") {
    if (v.type === "str") {
      if (intStringRe.test(v.head)) {
        const n = parseInt(v.head, 10)
        return {
          error: false,
          res: { type: "int", q: false, head: String(n), frac: "" },
          animMode: "normal",
          label: C(`따옴표를 벗겨 → ${n}`, `strip the quotes → ${n}`),
          caption: C(
            "int() 는 따옴표 안 숫자를 읽어 정수로 다시 만들어요. 따옴표는 사라져요.",
            "int() reads the digits inside and rebuilds an integer. The quotes are gone.",
          ),
          funcType: "int",
        }
      }
      return {
        error: true, res: null, animMode: "error",
        label: C("int() 가 이 글자를 거부해요 → ValueError", "int() refuses this text → ValueError"),
        caption: C(
          'int("3.14") · int("abc") 는 에러! 안전한 길: int(float("3.14")) — float 먼저 거쳐요.',
          'int("3.14") · int("abc") error! Safe path: int(float("3.14")) — go through float first.',
        ),
        funcType: "error",
      }
    }
    if (v.type === "float") {
      const n = Math.trunc(numericValue(v))
      return {
        error: false,
        res: { type: "int", q: false, head: String(n), frac: "" },
        animMode: v.frac ? "truncate" : "normal",
        label: C(`소수점 뒤를 잘라냄 → ${n} (반올림 아님!)`, `cut off after the dot → ${n} (not rounded!)`),
        caption: C(
          "int() 는 소수점을 잘라요 (반올림 X). 3.9 도 3 이 돼요. (반올림은 round())",
          "int() truncates — it chops the decimal. 3.9 also becomes 3, not 4! (rounding is round())",
        ),
        funcType: "int",
      }
    }
    if (v.type === "bool") {
      const n = v.head === "True" ? "1" : "0"
      return {
        error: false, res: { type: "int", q: false, head: n, frac: "" }, animMode: "normal",
        label: C(`${v.head} → ${n}`, `${v.head} → ${n}`),
        caption: C("True 는 1, False 는 0 으로 바뀌어요.", "True becomes 1, False becomes 0."),
        funcType: "int",
      }
    }
    return {
      error: false, res: { ...v }, animMode: "normal",
      label: C("이미 정수예요 — 그대로", "already an int — unchanged"),
      caption: C("이미 int 라서 변화가 없어요.", "Already int, so nothing changes."),
      funcType: "int",
    }
  }

  // func === "float"
  if (v.type === "str") {
    if (numericStringRe.test(v.head)) {
      const num = parseFloat(v.head)
      const { head, frac } = floatParts(num)
      return {
        error: false, res: { type: "float", q: false, head, frac }, animMode: "normal",
        label: C(`따옴표를 벗겨 소수로 → ${head}${frac}`, `strip quotes → float ${head}${frac}`),
        caption: C(
          "float() 는 소수점을 알아봐요. 점이 있는 문자열도 OK! 정수 모양엔 .0 이 붙어요.",
          "float() understands decimals. Decimal strings are fine! Integer-looking ones get .0.",
        ),
        funcType: "float",
      }
    }
    return {
      error: true, res: null, animMode: "error",
      label: C("숫자가 아니라 못 바꿔요 → ValueError", "not a number → ValueError"),
      caption: C(
        'float("hello") 도 ValueError. 숫자 모양이어야 변환돼요.',
        'float("hello") is also ValueError. It must look like a number.',
      ),
      funcType: "error",
    }
  }
  if (v.type === "int") {
    const { head, frac } = floatParts(parseInt(v.head, 10))
    return {
      error: false, res: { type: "float", q: false, head, frac }, animMode: "normal",
      label: C(`소수로 → ${head}${frac}`, `to float → ${head}${frac}`),
      caption: C("정수를 실수로 바꾸면 .0 이 붙어요.", "Converting int to float adds .0."),
      funcType: "float",
    }
  }
  if (v.type === "float") {
    return {
      error: false, res: { ...v }, animMode: "normal",
      label: C("이미 실수예요 — 그대로", "already a float — unchanged"),
      caption: C("이미 float 라서 변화가 없어요.", "Already float, so nothing changes."),
      funcType: "float",
    }
  }
  const num = v.head === "True" ? 1 : 0
  const { head, frac } = floatParts(num)
  return {
    error: false, res: { type: "float", q: false, head, frac }, animMode: "normal",
    label: C(`${v.head} → ${head}${frac}`, `${v.head} → ${head}${frac}`),
    caption: C("True → 1.0, False → 0.0.", "True → 1.0, False → 0.0."),
    funcType: "float",
  }
}

function isTrapDecimalString(v: Val | null, func: FuncName): boolean {
  return !!v && func === "int" && v.type === "str" && !intStringRe.test(v.head) && numericStringRe.test(v.head)
}

type Cat = "wrap" | "strip" | "cut" | "tf" | "err"
const PRESETS: { label: string; src: string; func: FuncName; danger?: boolean; cat: Cat }[] = [
  { label: "str(42)", src: "42", func: "str", cat: "wrap" },
  { label: 'int("123")', src: '"123"', func: "int", cat: "strip" },
  { label: 'float("3.14")', src: '"3.14"', func: "float", cat: "strip" },
  { label: "int(3.7)", src: "3.7", func: "int", cat: "cut" },
  { label: "bool(0)", src: "0", func: "bool", cat: "tf" },
  { label: 'bool("hi")', src: '"hi"', func: "bool", cat: "tf" },
  { label: 'int("3.14")', src: '"3.14"', func: "int", danger: true, cat: "err" },
]
// 동작별 묶음 — 학생이 "따옴표 입히기 / 벗기기 / 소수점 자르기" 를 또렷이 구분
const CAT_ORDER: Cat[] = ["wrap", "strip", "cut", "tf", "err"]
const CAT_LABEL: Record<Cat, Bi> = {
  wrap: { ko: "따옴표 입히기 (→ 글자)", en: "add quotes (→ text)" },
  strip: { ko: "따옴표 벗기기 (글자 → 숫자)", en: "remove quotes (text → number)" },
  cut: { ko: "소수점 자르기 (실수 → 정수)", en: "drop decimal (float → int)" },
  tf: { ko: "True / False 판정", en: "True / False" },
  err: { ko: "안 되는 경우 (에러)", en: "can't convert (error)" },
}
const FUNCS: FuncName[] = ["int", "float", "str", "bool"]

// 작은 칩 (before / after 비교용)
function MiniChip({ v, error, dim }: { v: Val | null; error?: boolean; dim?: boolean }) {
  if (error) {
    return (
      <span className="inline-flex flex-col items-center gap-0.5">
        <span className="px-2 py-1 rounded-lg font-mono text-sm font-bold border-2" style={{ borderColor: RED, color: RED, background: RED + "11" }}>
          ValueError
        </span>
        <span className="text-[9px] font-bold uppercase" style={{ color: RED }}>error</span>
      </span>
    )
  }
  if (!v) return null
  const c = TYPE_COLORS[v.type]
  const text = (v.q ? '"' : "") + v.head + v.frac + (v.q ? '"' : "")
  return (
    <span className="inline-flex flex-col items-center gap-0.5">
      <span
        className="px-2 py-1 rounded-lg font-mono text-sm font-bold border-2"
        style={dim
          ? { borderColor: "#e2e8f0", color: "#94a3b8", background: "#fff" }
          : { borderColor: c, color: c, background: c + "11" }}
      >
        {text}
      </span>
      <span className="text-[9px] font-bold uppercase" style={{ color: dim ? "#94a3b8" : c }}>{v.type}</span>
    </span>
  )
}

// ---------- 메인 ----------
type Phase = "idle" | "highlight" | "reveal" | "done"

function TypeConversionVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const tt = (ko: string, en: string) => (isEn ? en : ko)

  const [src, setSrc] = useState('"123"')
  const [func, setFunc] = useState<FuncName>("int")

  const [display, setDisplay] = useState<Val | null>(() => parseSource('"123"'))
  const [beforeVal, setBeforeVal] = useState<Val | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [conv, setConv] = useState<ConvResult | null>(null)
  const [animMode, setAnimMode] = useState<AnimMode>("normal")
  const [leaving, setLeaving] = useState<{ q: boolean; frac: boolean }>({ q: false, frac: false })
  const [funcPillLabel, setFuncPillLabel] = useState<string>("int()")
  const [trapOffered, setTrapOffered] = useState(false)
  const [showSandbox, setShowSandbox] = useState(false)
  const [activeLabel, setActiveLabel] = useState<string | null>(null) // 선택된 빠른예시 칩

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const after = (ms: number, fn: () => void) => { timers.current.push(setTimeout(fn, ms)) }
  useEffect(() => () => clearTimers(), [])

  const parsed = parseSource(src)
  const invalid = parsed === null

  const onSrcChange = (next: string) => {
    clearTimers()
    setSrc(next)
    setActiveLabel(null)
    setPhase("idle"); setConv(null); setTrapOffered(false); setBeforeVal(null)
    setLeaving({ q: false, frac: false })
    setDisplay(parseSource(next))
  }

  const run = useCallback((srcArg: string, funcArg: FuncName) => {
    const before = parseSource(srcArg)
    if (!before) return
    clearTimers()
    const result = convert(before, funcArg)
    setSrc(srcArg); setFunc(funcArg)
    setBeforeVal(before)
    setDisplay(before)
    setConv(result)
    setAnimMode("normal")
    setFuncPillLabel(`${funcArg}()`)
    setTrapOffered(false)
    // 무엇이 사라질지 미리 계산 → 하이라이트 단계에서 빨갛게 깜박
    setLeaving({
      q: !!((before.q && result.res && !result.res.q) || (before.q && result.error)),
      frac: result.animMode === "truncate",
    })
    setPhase("highlight")

    // 1단계(하이라이트) → 2단계(변신)  : 천천히
    after(1300, () => {
      if (result.error) {
        setAnimMode("error")
        if (isTrapDecimalString(before, funcArg)) setTrapOffered(true)
      } else {
        setDisplay(result.res)
        setAnimMode(result.animMode)
      }
      setPhase("reveal")
    })
    after(2700, () => setPhase("done"))
  }, [])

  // 안전한 길: int("3.14") → float 먼저 → int (소수점 자름)
  const runSafePath = useCallback(() => {
    const before = parseSource(src)
    if (!before) return
    clearTimers()
    const floatRes = convert(before, "float")
    if (!floatRes.res) return
    const intRes = convert(floatRes.res, "int")

    setBeforeVal(before)
    setDisplay(before)
    setConv(null); setTrapOffered(false); setAnimMode("normal")
    setFuncPillLabel("float()")
    setLeaving({ q: true, frac: false })
    setPhase("highlight")

    after(1100, () => { setDisplay(floatRes.res); setAnimMode("normal"); setLeaving({ q: false, frac: true }); setPhase("reveal")
      setConv({ ...floatRes, label: { ko: "1단계 — 먼저 float ✅ 점이 있어도 OK", en: "Step 1 — float() first ✅ decimals OK" } }) })
    after(2100, () => { setFuncPillLabel("int()"); setPhase("highlight") })
    after(2500, () => {
      setDisplay(intRes.res); setAnimMode("truncate"); setPhase("reveal")
      setConv({
        ...intRes,
        label: { ko: "2단계 — 그 다음 int() 소수점 자름 → 3", en: "Step 2 — then int() truncates → 3" },
        caption: {
          ko: 'int(float("3.14")) — float 을 거치면 안전하게 정수가 돼요!',
          en: 'int(float("3.14")) — going through float reaches int safely!',
        },
      })
    })
    after(3600, () => setPhase("done"))
  }, [src])

  const reset = () => {
    clearTimers()
    setPhase("idle"); setConv(null); setTrapOffered(false); setBeforeVal(null)
    setLeaving({ q: false, frac: false }); setAnimMode("normal")
    setDisplay(parseSource(src))
  }

  const curType: PyType = animMode === "error" ? "error" : display?.type ?? "int"
  const accent = TYPE_COLORS[curType] || "#3b82f6"
  const errorNow = conv?.error && phase !== "idle" && phase !== "highlight"
  const showResultLabel = phase !== "idle" && conv !== null
  const isHi = phase === "highlight"
  const willError = !!conv?.error

  // 변화 없음 (int→int 등) 인지
  const noChange = !!(beforeVal && conv?.res && !conv.error &&
    beforeVal.q === conv.res.q && beforeVal.head === conv.res.head && beforeVal.frac === conv.res.frac)

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* 빠른 예시 */}
      <div>
        <p className="text-xs font-bold text-gray-400 mb-1.5">{tt("빠른 예시 — 눌러서 천천히 변신 보기", "Quick examples — tap to watch it morph")}</p>
        <div className="space-y-2">
          {CAT_ORDER.map((cat) => {
            const items = PRESETS.filter((p) => p.cat === cat)
            if (!items.length) return null
            const busy = phase === "highlight" || phase === "reveal"
            return (
              <div key={cat}>
                <p className="text-[10px] font-bold text-gray-400 mb-1">{tt(CAT_LABEL[cat].ko, CAT_LABEL[cat].en)}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((p) => {
                    const isActive = activeLabel === p.label
                    return (
                      <button
                        key={p.label}
                        onClick={() => { setActiveLabel(p.label); run(p.src, p.func) }}
                        disabled={busy && !isActive}
                        className={"px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed " +
                          (isActive ? "" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300")}
                        style={isActive ? { background: TYPE_COLORS[p.func] + "18", color: TYPE_COLORS[p.func], borderColor: TYPE_COLORS[p.func] } : undefined}
                      >
                        {p.label} {p.danger && "❌"}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 무대 */}
      <motion.div
        layout
        className="rounded-2xl border-2 p-5 min-h-[210px] flex flex-col items-center justify-center gap-3"
        animate={{ borderColor: (errorNow ? RED : accent) + "44", backgroundColor: (errorNow ? RED : accent) + "0d" }}
        transition={{ duration: 0.5 }}
      >
        {/* 함수 알약 — 하이라이트 동안 통통 튐 */}
        <motion.div
          animate={isHi ? { y: [0, -5, 0], scale: [1, 1.08, 1] } : { y: 0, scale: 1 }}
          transition={isHi ? { duration: 0.7, repeat: Infinity } : { duration: 0.3 }}
          className="px-3 py-1 rounded-full text-sm font-mono font-bold text-white shadow-sm flex items-center gap-1"
          style={{ background: willError && phase !== "idle" ? RED : accent }}
        >
          <span className="opacity-70 text-xs">{tt("적용", "apply")}</span> {funcPillLabel}
        </motion.div>

        <div className="text-gray-300 text-lg leading-none">↓</div>

        {/* 값 카드 — 그 자리에서 변신 */}
        <motion.div
          animate={errorNow ? { x: [0, -9, 9, -7, 7, -4, 4, 0] } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            layout
            className="px-4 py-3 rounded-2xl border-2 bg-white shadow-sm flex items-center gap-0.5 min-w-[72px] justify-center"
            animate={
              phase === "reveal" && !errorNow
                ? { borderColor: accent, boxShadow: [`0 0 0px ${accent}00`, `0 0 26px ${accent}bb`, `0 0 0px ${accent}00`] }
                : { borderColor: errorNow ? RED : accent, boxShadow: `0 0 0px ${accent}00` }
            }
            transition={{ duration: 0.9 }}
          >
            {display && (
              <>
                {/* 왼쪽 따옴표 */}
                <AnimatePresence mode="popLayout">
                  {display.q && (
                    <motion.span
                      key="qL" layout
                      initial={{ opacity: 0, scale: 0, y: -16 }}
                      animate={isHi && leaving.q
                        ? { opacity: 1, scale: [1, 1.5, 1], y: 0, color: RED }
                        : { opacity: 1, scale: 1, y: 0, color: isHi && willError ? RED : accent }}
                      exit={{ opacity: 0, y: -48, x: -10, rotate: -35, scale: 0.4 }}
                      transition={isHi && leaving.q ? { duration: 0.5, repeat: Infinity } : { type: "spring", stiffness: 280, damping: 18 }}
                      className="font-mono text-2xl font-bold leading-none"
                    >
                      &quot;
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* 정수부 / 본문 */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`head-${display.head}`}
                    layout
                    initial={{ opacity: 0, scale: 0.5, y: 8 }}
                    animate={{ opacity: 1, scale: isHi && willError ? [1, 1.12, 1] : 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -8 }}
                    transition={isHi && willError ? { duration: 0.55, repeat: Infinity } : { type: "spring", stiffness: 360, damping: 22 }}
                    className="font-mono text-2xl font-bold"
                    style={{ color: (errorNow || (isHi && willError)) ? RED : "#374151" }}
                  >
                    {display.head}
                  </motion.span>
                </AnimatePresence>

                {/* 소수부 — 자르기일 땐 빨갛게 깜박 후 아래로 툭 떨어짐 */}
                <AnimatePresence mode="popLayout">
                  {display.frac && (
                    <motion.span
                      key={`frac-${display.frac}`}
                      layout
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isHi && leaving.frac
                        ? { opacity: 1, scale: [1, 1.4, 1], color: RED }
                        : { opacity: 1, scale: 1, color: "#9ca3af" }}
                      exit={animMode === "truncate"
                        ? { opacity: 0, y: 56, rotate: 24, scale: 0.6 }
                        : { opacity: 0, scale: 0.5 }}
                      transition={isHi && leaving.frac ? { duration: 0.5, repeat: Infinity } : { type: "spring", stiffness: 320, damping: 20 }}
                      className="font-mono text-2xl font-bold"
                    >
                      {display.frac}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* 오른쪽 따옴표 */}
                <AnimatePresence mode="popLayout">
                  {display.q && (
                    <motion.span
                      key="qR" layout
                      initial={{ opacity: 0, scale: 0, y: -16 }}
                      animate={isHi && leaving.q
                        ? { opacity: 1, scale: [1, 1.5, 1], y: 0, color: RED }
                        : { opacity: 1, scale: 1, y: 0, color: isHi && willError ? RED : accent }}
                      exit={{ opacity: 0, y: -48, x: 10, rotate: 35, scale: 0.4 }}
                      transition={isHi && leaving.q ? { duration: 0.5, repeat: Infinity } : { type: "spring", stiffness: 280, damping: 18 }}
                      className="font-mono text-2xl font-bold leading-none"
                    >
                      &quot;
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>

          {/* 배지 — 타입 바뀌면 톡 튀어나옴 */}
          <div className="h-5 flex items-center">
            <AnimatePresence mode="popLayout">
              {errorNow ? (
                <motion.span key="err" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: RED + "22", color: RED }}>
                  ✗ ValueError
                </motion.span>
              ) : display && (
                <motion.span
                  key={`badge-${display.type}`}
                  initial={{ opacity: 0, scale: 0.4, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{ background: TYPE_COLORS[display.type] + "22", color: TYPE_COLORS[display.type] }}
                >
                  {display.type}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 하이라이트 단계 안내 */}
        <AnimatePresence>
          {isHi && (
            <motion.div
              key="hi-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-xs font-bold" style={{ color: willError ? RED : leaving.q || leaving.frac ? RED : accent }}
            >
              {willError
                ? tt("✗ 못 바꿔요…", "✗ can't convert…")
                : leaving.q
                  ? tt("빨간 따옴표가 벗겨질 거예요…", "the red quotes will peel off…")
                  : leaving.frac
                    ? tt("빨간 소수점 뒤가 잘려나갈 거예요…", "the red decimals will be cut off…")
                    : tt("변신 중…", "morphing…")}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 처리 라벨 (reveal/done) */}
        <AnimatePresence>
          {showResultLabel && conv && !isHi && (
            <motion.div
              key={conv.label.ko}
              initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs font-medium text-center px-3"
              style={{ color: errorNow ? RED : "#475569" }}
            >
              {isEn ? conv.label.en : conv.label.ko}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* before → after 칩 (변신 끝나면 또렷이) */}
      <AnimatePresence>
        {phase === "done" && beforeVal && conv && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <MiniChip v={beforeVal} dim />
            <span className="text-gray-400 text-xl font-bold">→</span>
            <MiniChip v={conv.res} error={conv.error} />
            {noChange && <span className="text-xs text-gray-400">{tt("(변화 없음)", "(no change)")}</span>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 캡션 + 안전한 길 */}
      <AnimatePresence>
        {phase === "done" && conv && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl px-3 py-2.5 text-xs leading-relaxed"
            style={{ background: (errorNow ? RED : accent) + "12", color: "#374151" }}
          >
            💡 {isEn ? conv.caption.en : conv.caption.ko}
            {trapOffered && (
              <button
                onClick={runSafePath}
                className="mt-2 block w-full py-2 rounded-lg text-xs font-bold text-white active:scale-95 transition-transform"
                style={{ background: TYPE_COLORS.float }}
              >
                ✅ {tt('안전한 길 보기 — int(float("3.14"))', 'See the safe path — int(float("3.14"))')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 직접 해보기 — 기본 접힘 (한 화면에 정보 적게) */}
      <button
        onClick={() => setShowSandbox((s) => !s)}
        className="w-full py-2 rounded-xl text-sm font-bold border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        🧪 {showSandbox ? tt("직접 해보기 닫기 ▲", "Close sandbox ▲") : tt("직접 값 넣어보기 ▾", "Try your own value ▾")}
      </button>
      <AnimatePresence initial={false}>
      {showSandbox && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
      <div className="rounded-2xl border-2 border-gray-200 bg-gray-50/60 p-3 space-y-2.5 mt-2">
        <p className="text-xs font-bold text-gray-500">🧪 {tt("직접 해보기 — 아무 값이나 넣어봐", "Try it — type any value")}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 shrink-0">{tt("값", "value")}</span>
          <input
            value={src}
            onChange={(e) => onSrcChange(e.target.value)}
            spellCheck={false} autoComplete="off"
            placeholder={tt('"123"  /  3.7  /  42  /  ""', '"123"  /  3.7  /  42  /  ""')}
            className="flex-1 px-3 py-1.5 rounded-lg border-2 border-gray-200 bg-white font-mono text-sm font-bold text-gray-700 outline-none focus:border-blue-400"
          />
        </div>
        {invalid ? (
          <p className="text-xs text-amber-600 pl-1">
            ⚠️ {tt('값은 숫자(42, 3.7) 거나 따옴표로 감싼 글자("hi") 여야 해요.', 'Value must be a number (42, 3.7) or quoted text ("hi").')}
          </p>
        ) : (
          <p className="text-xs text-gray-400 pl-1">
            {tt("지금 이 값은", "this value is a")} <b style={{ color: TYPE_COLORS[parsed!.type] }}>{parsed!.type}</b> {tt("예요. 어떤 옷으로 갈아입혀 볼까요?", ". Which outfit should it change into?")}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {FUNCS.map((f) => (
            <button
              key={f}
              onClick={() => setFunc(f)}
              disabled={invalid}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono disabled:opacity-40 active:scale-95"
              style={func === f
                ? { background: TYPE_COLORS[f], color: "white", borderColor: TYPE_COLORS[f] }
                : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }}
            >
              {f}()
            </button>
          ))}
        </div>
        <div className="flex gap-2 pt-0.5">
          <button
            onClick={() => run(src, func)}
            disabled={invalid || phase === "highlight" || phase === "reveal"}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40 active:scale-95 transition-transform"
            style={{ background: TYPE_COLORS[func] }}
          >
            ▶ {tt("변환!", "Convert!")}
          </button>
          <button
            onClick={reset}
            disabled={phase === "idle"}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 active:scale-95 transition-transform"
          >
            ↺ {tt("다시", "Reset")}
          </button>
        </div>
      </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}

export default TypeConversionVisualizer
export { TypeConversionVisualizer }
