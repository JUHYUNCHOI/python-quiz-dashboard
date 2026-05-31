"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 한국말/영어 문장 → and / or / not 매칭 게임
//
// 일상 한국어 문장 10개를 차례로 보여주고
// 학생이 and / or / not 중 하나 클릭
// 즉시 ✅/❌ 피드백 + 짧은 이유, 자동 다음 문장
// 마지막에 "X/10!" 점수 표시 + 다시 하기
// ============================================================

type Op = "and" | "or" | "not"

interface Question {
  ko: string
  en: string
  answer: Op
  why: { ko: string; en: string }
}

const QUESTIONS: Question[] = [
  {
    ko: "엄마 허락 *그리고* 숙제 끝",
    en: "Mom's permission *AND* homework done",
    answer: "and",
    why: { ko: "둘 다 만족해야 → and", en: "Both must be true → and" },
  },
  {
    ko: "비 *또는* 눈",
    en: "Rain *OR* snow",
    answer: "or",
    why: { ko: "둘 중 하나만 와도 → or", en: "Either one → or" },
  },
  {
    ko: "*아직* 안 자",
    en: "*Not* asleep yet",
    answer: "not",
    why: { ko: "반대(부정) → not", en: "Negation → not" },
  },
  {
    ko: "VIP *이거나* 쿠폰 있음",
    en: "VIP *OR* has coupon",
    answer: "or",
    why: { ko: "둘 중 하나만 → or", en: "Either one → or" },
  },
  {
    ko: "면허 *그리고* 18살 이상",
    en: "License *AND* 18+",
    answer: "and",
    why: { ko: "둘 다 만족 → and", en: "Both → and" },
  },
  {
    ko: "로그인 *안* 했음",
    en: "*Not* logged in",
    answer: "not",
    why: { ko: "반대 → not", en: "Negation → not" },
  },
  {
    ko: "사과 *또는* 배",
    en: "Apple *OR* pear",
    answer: "or",
    why: { ko: "둘 중 하나 → or", en: "Either one → or" },
  },
  {
    ko: "재미있음 *그리고* 쉬움",
    en: "Fun *AND* easy",
    answer: "and",
    why: { ko: "둘 다 → and", en: "Both → and" },
  },
  {
    ko: "춥지 *않음*",
    en: "*Not* cold",
    answer: "not",
    why: { ko: "반대 → not", en: "Negation → not" },
  },
  {
    ko: "토 *또는* 일요일",
    en: "Saturday *OR* Sunday",
    answer: "or",
    why: { ko: "둘 중 하나 → or", en: "Either one → or" },
  },
]

const OP_META: Record<Op, { label: string; color: string; bg: string; ring: string; icon: string }> = {
  and: { label: "and", color: "#1d4ed8", bg: "#dbeafe", ring: "#3b82f6", icon: "🔗" },
  or: { label: "or", color: "#15803d", bg: "#dcfce7", ring: "#22c55e", icon: "🔀" },
  not: { label: "not", color: "#b91c1c", bg: "#fee2e2", ring: "#ef4444", icon: "🔄" },
}

// 문장 안의 *...* 부분을 강조로 렌더링
function renderSentence(text: string, highlightColor: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith("*") && p.endsWith("*")) {
      return (
        <span
          key={i}
          style={{
            color: highlightColor,
            fontWeight: 800,
            background: `${highlightColor}1a`,
            padding: "0 6px",
            borderRadius: 6,
          }}
        >
          {p.slice(1, -1)}
        </span>
      )
    }
    return <span key={i}>{p}</span>
  })
}

export interface AndOrNotMatcherProps {
  lang?: "ko" | "en"
}

export function AndOrNotMatcher({ lang = "ko" }: AndOrNotMatcherProps) {
  const isEn = lang === "en"
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<Op | null>(null)
  const [done, setDone] = useState(false)
  const [order] = useState(() => QUESTIONS.map((_, i) => i)) // 고정 순서 — 결정적

  const total = QUESTIONS.length
  const q = QUESTIONS[order[idx]]
  const correct = picked === q?.answer
  const accentColor = picked ? OP_META[picked].color : "#0f172a"

  function pick(op: Op) {
    if (picked || done) return
    setPicked(op)
    if (op === q.answer) setScore((s) => s + 1)
    // 1.1초 후 자동 다음 문제
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true)
      } else {
        setIdx((i) => i + 1)
        setPicked(null)
      }
    }, 1100)
  }

  function reset() {
    setIdx(0)
    setScore(0)
    setPicked(null)
    setDone(false)
  }

  // 결과 화면
  if (done) {
    const perfect = score === total
    const good = score >= Math.ceil(total * 0.7)
    const msgKo = perfect ? "완벽해! 🎉" : good ? "잘했어! 👏" : "한 번 더!"
    const msgEn = perfect ? "Perfect! 🎉" : good ? "Great! 👏" : "Try again!"
    return (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          background: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>{perfect ? "🏆" : good ? "✨" : "💪"}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
          {score} / {total}
        </div>
        <div style={{ fontSize: 18, color: "#475569", marginBottom: 18 }}>{isEn ? msgEn : msgKo}</div>
        <button
          onClick={reset}
          style={{
            padding: "10px 22px",
            background: "#0f172a",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          {isEn ? "🔁 Play again" : "🔁 다시 하기"}
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: "18px 18px 20px",
        background: "#f8fafc",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
      }}
    >
      {/* 진행 상태 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          fontSize: 13,
          color: "#64748b",
          fontWeight: 600,
        }}
      >
        <span>
          {idx + 1} / {total}
        </span>
        <span>
          {isEn ? "Score" : "점수"}: <span style={{ color: "#0f172a", fontWeight: 800 }}>{score}</span>
        </span>
      </div>

      {/* 진행 바 */}
      <div
        style={{
          height: 6,
          background: "#e2e8f0",
          borderRadius: 99,
          overflow: "hidden",
          marginBottom: 18,
        }}
      >
        <motion.div
          initial={false}
          animate={{ width: `${((idx + (picked ? 1 : 0)) / total) * 100}%` }}
          transition={{ duration: 0.35 }}
          style={{ height: "100%", background: "#0f172a" }}
        />
      </div>

      {/* 문장 카드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "white",
            border: `2px solid ${picked ? OP_META[picked].ring : "#cbd5e1"}`,
            borderRadius: 12,
            padding: "22px 18px",
            textAlign: "center",
            fontSize: 19,
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.5,
            minHeight: 78,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          {renderSentence(isEn ? q.en : q.ko, accentColor)}
        </motion.div>
      </AnimatePresence>

      {/* 3개 버튼 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
        {(["and", "or", "not"] as Op[]).map((op) => {
          const meta = OP_META[op]
          const isPicked = picked === op
          const isCorrectChoice = picked && op === q.answer
          const showWrong = isPicked && !correct
          const showRight = isPicked && correct
          const hint = !picked
            ? null
            : isCorrectChoice
            ? "✅"
            : isPicked
            ? "❌"
            : null
          return (
            <motion.button
              key={op}
              onClick={() => pick(op)}
              disabled={!!picked}
              whileHover={!picked ? { scale: 1.03 } : {}}
              whileTap={!picked ? { scale: 0.97 } : {}}
              animate={
                showRight
                  ? { scale: [1, 1.08, 1] }
                  : showWrong
                  ? { x: [0, -6, 6, -4, 4, 0] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.4 }}
              style={{
                padding: "14px 8px",
                background: isPicked ? meta.bg : "white",
                border: `2px solid ${
                  isCorrectChoice ? "#16a34a" : showWrong ? "#dc2626" : meta.ring
                }`,
                borderRadius: 10,
                fontSize: 18,
                fontWeight: 800,
                color: meta.color,
                cursor: picked ? "default" : "pointer",
                opacity: picked && !isPicked && !isCorrectChoice ? 0.5 : 1,
                position: "relative",
              }}
            >
              <span style={{ marginRight: 6 }}>{meta.icon}</span>
              {meta.label}
              {hint && (
                <span style={{ marginLeft: 8, fontSize: 16 }}>{hint}</span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* 피드백 영역 */}
      <div style={{ minHeight: 36 }}>
        <AnimatePresence>
          {picked && (
            <motion.div
              key={`${idx}-fb`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: correct ? "#15803d" : "#b91c1c",
                padding: "8px 12px",
                background: correct ? "#dcfce7" : "#fee2e2",
                borderRadius: 8,
              }}
            >
              {correct
                ? `✅ ${isEn ? q.why.en : q.why.ko}`
                : `❌ ${isEn ? "Answer" : "정답"}: ${q.answer} — ${isEn ? q.why.en : q.why.ko}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AndOrNotMatcher
