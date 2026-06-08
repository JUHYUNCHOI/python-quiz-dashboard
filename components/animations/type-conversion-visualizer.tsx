"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 타입 변환 시각화 (lesson 9) — "옷 갈아입기"
// 값 하나가 그 자리에서 변신:
//  - 따옴표가 벗겨짐 (str → int/float)
//  - 소수점 뒷부분이 툭 떨어져 나감 (float → int, 자르기)
//  - 따옴표 옷을 입음 (→ str)
//  - 배지 색이 바뀜 (타입 변화)
//  - 잘못된 변환은 빨갛게 흔들리며 ValueError
// + 학생이 아무 값이나 넣고 int/float/str/bool 을 눌러보는 샌드박스
// ============================================

const TYPE_COLORS: Record<string, string> = {
  str: "#f59e0b",
  int: "#3b82f6",
  float: "#a855f7",
  bool: "#ec4899",
  error: "#ef4444",
}

type PyType = "str" | "int" | "float" | "bool" | "error"
type FuncName = "int" | "float" | "str" | "bool"

// 화면에 그릴 값: 따옴표 여부 + 정수부(head) + 소수부(frac, ".14" 처럼 점 포함)
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

// 파이썬 소스처럼 입력된 문자열을 Val 로 해석. 해석 불가면 null.
function parseSource(srcRaw: string): Val | null {
  const s = srcRaw.trim()
  if (s.length === 0) return null
  const quoted =
    (s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
    (s.startsWith("'") && s.endsWith("'") && s.length >= 2)
  if (quoted) {
    return { type: "str", q: true, head: s.slice(1, -1), frac: "" }
  }
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
      label: falsy
        ? C("0 · 0.0 · 빈 문자열 → False", "0 · 0.0 · empty → False")
        : C("값이 들어있으니 → True", "has a value → True"),
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
        error: true,
        res: null,
        animMode: "error",
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
        error: false,
        res: { type: "int", q: false, head: n, frac: "" },
        animMode: "normal",
        label: C(`${v.head} → ${n}`, `${v.head} → ${n}`),
        caption: C("True 는 1, False 는 0 으로 바뀌어요.", "True becomes 1, False becomes 0."),
        funcType: "int",
      }
    }
    return {
      error: false,
      res: { ...v },
      animMode: "normal",
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
        error: false,
        res: { type: "float", q: false, head, frac },
        animMode: "normal",
        label: C(`따옴표를 벗겨 소수로 → ${head}${frac}`, `strip quotes → float ${head}${frac}`),
        caption: C(
          "float() 는 소수점을 알아봐요. 점이 있는 문자열도 OK! 정수 모양엔 .0 이 붙어요.",
          "float() understands decimals. Decimal strings are fine! Integer-looking ones get .0.",
        ),
        funcType: "float",
      }
    }
    return {
      error: true,
      res: null,
      animMode: "error",
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
      error: false,
      res: { type: "float", q: false, head, frac },
      animMode: "normal",
      label: C(`소수로 → ${head}${frac}`, `to float → ${head}${frac}`),
      caption: C("정수를 실수로 바꾸면 .0 이 붙어요.", "Converting int to float adds .0."),
      funcType: "float",
    }
  }
  if (v.type === "float") {
    return {
      error: false,
      res: { ...v },
      animMode: "normal",
      label: C("이미 실수예요 — 그대로", "already a float — unchanged"),
      caption: C("이미 float 라서 변화가 없어요.", "Already float, so nothing changes."),
      funcType: "float",
    }
  }
  // bool → float
  const num = v.head === "True" ? 1 : 0
  const { head, frac } = floatParts(num)
  return {
    error: false,
    res: { type: "float", q: false, head, frac },
    animMode: "normal",
    label: C(`${v.head} → ${head}${frac}`, `${v.head} → ${head}${frac}`),
    caption: C("True → 1.0, False → 0.0.", "True → 1.0, False → 0.0."),
    funcType: "float",
  }
}

// 함정(int + 소수점 문자열) 인지 — 안전한 길 버튼 노출용
function isTrapDecimalString(v: Val | null, func: FuncName): boolean {
  return !!v && func === "int" && v.type === "str" && !intStringRe.test(v.head) && numericStringRe.test(v.head)
}

// ---------- 프리셋 (빠른 예시) ----------
const PRESETS: { label: string; src: string; func: FuncName; danger?: boolean }[] = [
  { label: 'int("123")', src: '"123"', func: "int" },
  { label: "int(3.7)", src: "3.7", func: "int" },
  { label: 'float("3.14")', src: '"3.14"', func: "float" },
  { label: "str(42)", src: "42", func: "str" },
  { label: "bool(0)", src: "0", func: "bool" },
  { label: 'bool("hi")', src: '"hi"', func: "bool" },
  { label: 'int("3.14")', src: '"3.14"', func: "int", danger: true },
]

const FUNCS: FuncName[] = ["int", "float", "str", "bool"]

// ---------- 작은 컴포넌트 ----------

function Badge({ type }: { type: PyType }) {
  const c = TYPE_COLORS[type] || "#94a3b8"
  return (
    <motion.span
      layout
      animate={{ backgroundColor: c + "22", color: c }}
      transition={{ duration: 0.4 }}
      className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
    >
      {type}
    </motion.span>
  )
}

function Quote({ side, color }: { side: "L" | "R"; color: string }) {
  return (
    <motion.span
      key={`q${side}`}
      layout
      initial={{ opacity: 0, scale: 0, x: side === "L" ? 8 : -8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0, x: side === "L" ? 8 : -8 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
      className="font-mono text-2xl font-bold leading-none"
      style={{ color }}
    >
      &quot;
    </motion.span>
  )
}

// ---------- 메인 ----------

function TypeConversionVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const tt = (ko: string, en: string) => (isEn ? en : ko)

  const [src, setSrc] = useState('"123"')
  const [func, setFunc] = useState<FuncName>("int")

  const [display, setDisplay] = useState<Val | null>(() => parseSource('"123"'))
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle")
  const [conv, setConv] = useState<ConvResult | null>(null)
  const [animMode, setAnimMode] = useState<AnimMode>("normal")
  const [funcPillLabel, setFuncPillLabel] = useState<string>("int()")
  const [trapOffered, setTrapOffered] = useState(false)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const after = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms))
  }
  useEffect(() => () => clearTimers(), [])

  const parsed = parseSource(src)
  const invalid = parsed === null

  // 입력이 바뀌면 idle 로 되돌리고 새 값 표시
  const onSrcChange = (next: string) => {
    clearTimers()
    setSrc(next)
    setPhase("idle")
    setConv(null)
    setTrapOffered(false)
    setDisplay(parseSource(next))
  }

  const run = useCallback((srcArg: string, funcArg: FuncName) => {
    const before = parseSource(srcArg)
    if (!before) return
    clearTimers()
    const result = convert(before, funcArg)
    setSrc(srcArg)
    setFunc(funcArg)
    setDisplay(before)
    setConv(result)
    setAnimMode("normal")
    setFuncPillLabel(`${funcArg}()`)
    setTrapOffered(false)
    setPhase("running")

    after(520, () => {
      if (result.error) {
        // 에러: 값은 그대로 두고 빨갛게 흔들림
        setAnimMode("error")
        if (isTrapDecimalString(before, funcArg)) setTrapOffered(true)
      } else {
        setDisplay(result.res)
        setAnimMode(result.animMode)
      }
    })
    after(1180, () => setPhase("done"))
  }, [])

  // 안전한 길: int("3.14") → float 먼저 → int (소수점 자름)
  const runSafePath = useCallback(() => {
    const before = parseSource(src)
    if (!before) return
    clearTimers()
    const floatRes = convert(before, "float")
    if (!floatRes.res) return
    const intRes = convert(floatRes.res, "int")

    setDisplay(before)
    setConv(null)
    setTrapOffered(false)
    setAnimMode("normal")
    setFuncPillLabel("float()")
    setPhase("running")

    // 1비트: float
    after(450, () => {
      setDisplay(floatRes.res)
      setConv({
        ...floatRes,
        label: { ko: "1단계 — 먼저 float ✅ 점이 있어도 OK", en: "Step 1 — float() first ✅ decimals OK" },
      })
    })
    // 2비트: int (자르기)
    after(1500, () => {
      setFuncPillLabel("int()")
      setDisplay(intRes.res)
      setAnimMode("truncate")
      setConv({
        ...intRes,
        label: { ko: "2단계 — 그 다음 int() 소수점 자름 → 3", en: "Step 2 — then int() truncates → 3" },
        caption: {
          ko: 'int(float("3.14")) — float 을 거치면 안전하게 정수가 돼요!',
          en: 'int(float("3.14")) — going through float reaches int safely!',
        },
      })
    })
    after(2300, () => setPhase("done"))
  }, [src])

  const reset = () => {
    clearTimers()
    setPhase("idle")
    setConv(null)
    setTrapOffered(false)
    setAnimMode("normal")
    setDisplay(parseSource(src))
  }

  const curType: PyType = animMode === "error" ? "error" : display?.type ?? "int"
  const accent = TYPE_COLORS[curType] || "#3b82f6"
  const showResultLabel = phase !== "idle" && conv !== null

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* 빠른 예시 */}
      <div>
        <p className="text-xs font-bold text-gray-400 mb-1.5">{tt("빠른 예시 — 눌러서 바로 변신", "Quick examples — tap to morph")}</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => run(p.src, p.func)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-white text-gray-500 border-gray-200 hover:border-gray-300 transition-all font-mono active:scale-95"
            >
              {p.label} {p.danger && "❌"}
            </button>
          ))}
        </div>
      </div>

      {/* 무대 */}
      <motion.div
        layout
        className="rounded-2xl border-2 p-5 min-h-[180px] flex flex-col items-center justify-center gap-3"
        animate={{ borderColor: accent + "44", backgroundColor: accent + "0d" }}
        transition={{ duration: 0.4 }}
      >
        {/* 함수 알약 */}
        <motion.div
          animate={phase === "running" ? { y: [0, -4, 0], scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 0.5, repeat: phase === "running" ? 1 : 0 }}
          className="px-3 py-1 rounded-full text-sm font-mono font-bold text-white shadow-sm flex items-center gap-1"
          style={{ background: accent }}
        >
          <span className="opacity-70 text-xs">{tt("적용", "apply")}</span> {funcPillLabel}
        </motion.div>

        <div className="text-gray-300 text-lg leading-none">↓</div>

        {/* 값 카드 — 그 자리에서 변신 */}
        <motion.div
          animate={animMode === "error" ? { x: [0, -7, 7, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            layout
            className="px-4 py-3 rounded-2xl border-2 bg-white shadow-sm flex items-center gap-0.5 min-w-[64px] justify-center"
            animate={{ borderColor: accent }}
            transition={{ duration: 0.4 }}
          >
            {display && (
              <>
                <AnimatePresence mode="popLayout">
                  {display.q && <Quote key="qL" side="L" color={accent} />}
                </AnimatePresence>

                {/* 정수부 / 본문 — 내용 바뀌면 크로스페이드 */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`head-${display.head}`}
                    layout
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 480, damping: 24 }}
                    className="font-mono text-2xl font-bold"
                    style={{ color: animMode === "error" ? TYPE_COLORS.error : "#374151" }}
                  >
                    {display.head}
                  </motion.span>
                </AnimatePresence>

                {/* 소수부 — 자르기일 땐 툭 떨어져 나감 */}
                <AnimatePresence mode="popLayout">
                  {display.frac && (
                    <motion.span
                      key={`frac-${display.frac}`}
                      layout
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        animMode === "truncate"
                          ? { opacity: 0, y: 26, rotate: -14, scale: 0.8 }
                          : { opacity: 0, scale: 0.6 }
                      }
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                      className="font-mono text-2xl font-bold"
                      style={{ color: "#9ca3af" }}
                    >
                      {display.frac}
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                  {display.q && <Quote key="qR" side="R" color={accent} />}
                </AnimatePresence>
              </>
            )}
          </motion.div>

          {/* 배지 */}
          {animMode === "error" ? (
            <motion.span
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{ background: TYPE_COLORS.error + "22", color: TYPE_COLORS.error }}
            >
              ✗ ValueError
            </motion.span>
          ) : (
            display && <Badge type={display.type} />
          )}
        </motion.div>

        {/* 처리 라벨 */}
        <AnimatePresence>
          {showResultLabel && conv && (
            <motion.div
              key={conv.label.ko}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-center px-3"
              style={{ color: animMode === "error" ? TYPE_COLORS.error : "#475569" }}
            >
              {isEn ? conv.label.en : conv.label.ko}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 끝났을 때: 캡션 + 안전한 길 */}
      <AnimatePresence>
        {phase === "done" && conv && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl px-3 py-2.5 text-xs leading-relaxed"
            style={{ background: accent + "12", color: "#374151" }}
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

      {/* 직접 해보기 */}
      <div className="rounded-2xl border-2 border-gray-200 bg-gray-50/60 p-3 space-y-2.5">
        <p className="text-xs font-bold text-gray-500">🧪 {tt("직접 해보기 — 아무 값이나 넣어봐", "Try it — type any value")}</p>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 shrink-0">{tt("값", "value")}</span>
          <input
            value={src}
            onChange={(e) => onSrcChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
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

        {/* 바꿀 타입 고르기 */}
        <div className="flex flex-wrap gap-2">
          {FUNCS.map((f) => (
            <button
              key={f}
              onClick={() => setFunc(f)}
              disabled={invalid}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono disabled:opacity-40 active:scale-95"
              style={
                func === f
                  ? { background: TYPE_COLORS[f], color: "white", borderColor: TYPE_COLORS[f] }
                  : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }
              }
            >
              {f}()
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-0.5">
          <button
            onClick={() => run(src, func)}
            disabled={invalid || phase === "running"}
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
    </div>
  )
}

export default TypeConversionVisualizer
export { TypeConversionVisualizer }
