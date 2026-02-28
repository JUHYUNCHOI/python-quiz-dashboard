"use client"

import React, { useState } from "react"
import { highlightPythonInline, highlightCppInline } from "@/components/ui/code-block"

// ============================================
// SyntaxSpotter: Python vs C++ 단계별 비교 가이드
// 5가지 차이점을 하나씩 스포트라이트로 보여주는 교육 시뮬레이션
// ============================================

interface SyntaxSpotterProps {
  lang?: "ko" | "en"
  onComplete?: () => void
}

interface DifferenceStep {
  id: string
  pythonLines: number[]
  cppLines: number[]
  pythonSnippet: string
  cppSnippet: string
  label: { ko: string; en: string }
  explanation: { ko: string; en: string }
  icon: string
  miniQuestion?: {
    question: { ko: string; en: string }
    options: { ko: string[]; en: string[] }
    correctIndex: number
  }
}

// ── 코드 데이터 ──

const PYTHON_CODE = [
  "import math",
  "",
  "x = 42",
  'name = "Alice"',
  "",
  "if x > 10:",
  '    print("Big!")',
  "    print(name)",
]

const CPP_CODE = [
  "#include <cmath>",
  "",
  "int main() {",
  "    int x = 42;",
  '    string name = "Alice";',
  "",
  "    if (x > 10) {",
  '        cout << "Big!" << endl;',
  "        cout << name << endl;",
  "    }",
  "    return 0;",
  "}",
]

// ── 5가지 차이점 데이터 ──

const DIFFERENCES: DifferenceStep[] = [
  {
    id: "include",
    pythonLines: [0],
    cppLines: [0],
    pythonSnippet: "import math",
    cppSnippet: "#include <cmath>",
    label: { ko: "라이브러리 가져오기", en: "Importing Libraries" },
    explanation: {
      ko: "Python은 import로 라이브러리를 가져오지만, C++은 #include를 사용해요. 꺾쇠 < >로 감싸는 것도 특징!",
      en: "Python uses import for libraries, but C++ uses #include with angle brackets < >!",
    },
    icon: "📦",
    miniQuestion: {
      question: {
        ko: "C++에서 라이브러리를 가져올 때 쓰는 키워드는?",
        en: "What keyword does C++ use to import libraries?",
      },
      options: {
        ko: ["import", "#include", "require"],
        en: ["import", "#include", "require"],
      },
      correctIndex: 1,
    },
  },
  {
    id: "main",
    pythonLines: [],
    cppLines: [2, 10, 11],
    pythonSnippet: "(없음 — 바로 실행)",
    cppSnippet: "int main() { ... return 0; }",
    label: { ko: "main() 함수", en: "main() Function" },
    explanation: {
      ko: "Python은 코드를 위에서부터 바로 실행하지만, C++은 반드시 int main() 함수 안에서 시작해요!",
      en: "Python runs code from the top, but C++ must start inside int main()!",
    },
    icon: "🏁",
  },
  {
    id: "semicolon",
    pythonLines: [2, 3],
    cppLines: [3, 4],
    pythonSnippet: "x = 42\nname = \"Alice\"",
    cppSnippet: "int x = 42;\nstring name = \"Alice\";",
    label: { ko: "세미콜론 ;", en: "Semicolons ;" },
    explanation: {
      ko: "Python은 줄바꿈이 문장 끝이지만, C++은 세미콜론 ;으로 끝을 알려줘야 해요. 빠뜨리면 에러!",
      en: "Python uses line breaks, but C++ needs a semicolon ; at the end. Forget it and you get an error!",
    },
    icon: "⚡",
    miniQuestion: {
      question: {
        ko: "C++에서 빠뜨리면 에러나는 기호는?",
        en: "Which symbol causes an error in C++ if missing?",
      },
      options: {
        ko: ["콜론 :", "세미콜론 ;", "쉼표 ,"],
        en: ["Colon :", "Semicolon ;", "Comma ,"],
      },
      correctIndex: 1,
    },
  },
  {
    id: "braces",
    pythonLines: [5, 6, 7],
    cppLines: [6, 7, 8, 9],
    pythonSnippet: "if x > 10:\n    print(\"Big!\")",
    cppSnippet: "if (x > 10) {\n    cout << \"Big!\";\n}",
    label: { ko: "중괄호 { } vs 들여쓰기", en: "Braces { } vs Indentation" },
    explanation: {
      ko: "Python은 들여쓰기로 블록을 구분하지만, C++은 중괄호 { }로 감싸요. 조건도 ( )로 감싸야 해요!",
      en: "Python uses indentation for blocks, but C++ wraps them in braces { }. Conditions need ( ) too!",
    },
    icon: "🧱",
  },
  {
    id: "cout",
    pythonLines: [6, 7],
    cppLines: [7, 8],
    pythonSnippet: "print(\"Big!\")\nprint(name)",
    cppSnippet: "cout << \"Big!\" << endl;\ncout << name << endl;",
    label: { ko: "출력: cout << vs print()", en: "Output: cout << vs print()" },
    explanation: {
      ko: "Python의 print()가 C++에서는 cout <<! <<는 '보내다'라는 뜻이고, endl은 줄바꿈이에요.",
      en: "Python's print() becomes cout << in C++! << means 'send to output', endl adds a new line.",
    },
    icon: "📢",
    miniQuestion: {
      question: {
        ko: "C++에서 화면에 출력하는 명령어는?",
        en: "What command prints to screen in C++?",
      },
      options: {
        ko: ["print()", "cout <<", "echo()"],
        en: ["print()", "cout <<", "echo()"],
      },
      correctIndex: 1,
    },
  },
]

// ── 컴포넌트 ──

export function SyntaxSpotter({ lang = "ko", onComplete }: SyntaxSpotterProps) {
  const [step, setStep] = useState(-1) // -1=intro, 0-4=differences, 5=summary
  const [miniAnswer, setMiniAnswer] = useState<number | null>(null)
  const [miniAnswered, setMiniAnswered] = useState(false)

  const total = DIFFERENCES.length

  // ── 번역 ──
  const t = {
    subtitle:
      lang === "ko"
        ? "5가지 차이점을 하나씩 살펴볼게요!"
        : "Let's explore 5 differences one by one!",
    start: lang === "ko" ? "시작하기" : "Start",
    next: lang === "ko" ? "다음" : "Next",
    back: lang === "ko" ? "이전" : "Back",
    complete: lang === "ko" ? "완료!" : "Done!",
    summaryTitle:
      lang === "ko"
        ? "5가지 차이를 모두 배웠어요!"
        : "You've learned all 5 differences!",
    summarySubtitle:
      lang === "ko"
        ? "Python vs C++ 핵심 차이 정리"
        : "Python vs C++ Key Differences Summary",
    python: "Python",
    cpp: "C++",
    vs: "vs",
    stepOf:
      lang === "ko"
        ? (n: number) => `${n}/${total}`
        : (n: number) => `${n}/${total}`,
    correct: lang === "ko" ? "정답!" : "Correct!",
    wrong:
      lang === "ko"
        ? (ans: string) => `오답! 정답은 ${ans}`
        : (ans: string) => `Wrong! The answer is ${ans}`,
    noPythonEquivalent:
      lang === "ko" ? "(없음 — 바로 실행)" : "(None — runs directly)",
  }

  // ── 네비게이션 ──
  const handleNext = () => {
    if (step < total) {
      setStep(step + 1)
      setMiniAnswer(null)
      setMiniAnswered(false)
    }
    if (step === total) {
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (step > -1) {
      setStep(step - 1)
      setMiniAnswer(null)
      setMiniAnswered(false)
    }
  }

  const handleMiniAnswer = (index: number) => {
    if (miniAnswered) return
    setMiniAnswer(index)
    setMiniAnswered(true)
  }

  // ── 현재 차이점 ──
  const currentDiff = step >= 0 && step < total ? DIFFERENCES[step] : null

  // ── 라인 하이라이트 판단 ──
  const isPythonHighlighted = (lineIdx: number) => {
    if (step === -1) return false
    if (step === total) {
      return DIFFERENCES.some((d) => d.pythonLines.includes(lineIdx))
    }
    return currentDiff?.pythonLines.includes(lineIdx) ?? false
  }

  const isCppHighlighted = (lineIdx: number) => {
    if (step === -1) return false
    if (step === total) {
      return DIFFERENCES.some((d) => d.cppLines.includes(lineIdx))
    }
    return currentDiff?.cppLines.includes(lineIdx) ?? false
  }

  const shouldDim = step >= 0 && step < total

  // ── 스니펫 렌더링 ──
  const renderSnippetLines = (
    snippet: string,
    type: "python" | "cpp"
  ) => {
    const lines = snippet.split("\n")
    return lines.map((line, i) => (
      <div key={i} className="px-2 py-0.5">
        {type === "python"
          ? highlightPythonInline(line)
          : highlightCppInline(line)}
      </div>
    ))
  }

  return (
    <div className="w-full space-y-4">
      {/* ── 프로그레스 바 ── */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-xs">
          {step === -1
            ? t.subtitle
            : step === total
              ? t.summaryTitle
              : DIFFERENCES[step].label[lang]}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {DIFFERENCES.map((d, i) => (
              <div
                key={d.id}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? "bg-emerald-500 scale-125 ring-2 ring-emerald-300"
                    : i < step
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                }`}
              />
            ))}
          </div>
          {step >= 0 && (
            <span className="text-xs font-bold text-slate-500">
              {t.stepOf(Math.min(step + 1, total))}
            </span>
          )}
        </div>
      </div>

      {/* ── 메인 코드 비교 영역 ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Python 코드 */}
          <div className="flex-1 rounded-xl border-2 border-blue-200 bg-blue-50/80 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-100/60 border-b border-blue-200">
              <span className="text-blue-600 text-sm font-bold">
                🐍 {t.python}
              </span>
            </div>
            <div className="p-3 font-mono text-sm space-y-0">
              {PYTHON_CODE.map((line, i) => {
                const highlighted = isPythonHighlighted(i)
                return (
                  <div
                    key={i}
                    className={`px-3 py-0.5 rounded transition-all duration-500 ${
                      highlighted
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : shouldDim && !highlighted
                          ? "opacity-40 border-l-4 border-transparent"
                          : "border-l-4 border-transparent"
                    }`}
                  >
                    <span className="text-slate-700">
                      {line ? highlightPythonInline(line) : "\u00A0"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 화살표 */}
          <div className="flex md:flex-col items-center justify-center py-1 md:py-0 md:px-1">
            <span className="text-slate-400 text-lg">
              <span className="hidden md:inline">→</span>
              <span className="md:hidden">↓</span>
            </span>
          </div>

          {/* C++ 코드 */}
          <div
            className={`flex-1 rounded-xl border-2 overflow-hidden transition-all duration-500 ${
              step === total
                ? "border-emerald-400 bg-emerald-50/50"
                : "border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50/60 border-b border-emerald-200">
              <span className="text-emerald-600 text-sm font-bold">
                ⚡ {t.cpp}
              </span>
            </div>
            <div className="p-3 font-mono text-sm space-y-0">
              {CPP_CODE.map((line, i) => {
                const highlighted = isCppHighlighted(i)
                return (
                  <div
                    key={i}
                    className={`px-3 py-0.5 rounded transition-all duration-500 ${
                      highlighted
                        ? "bg-emerald-100 border-l-4 border-emerald-500"
                        : shouldDim && !highlighted
                          ? "opacity-40 border-l-4 border-transparent"
                          : "border-l-4 border-transparent"
                    }`}
                  >
                    <span className="text-slate-700">
                      {line ? highlightCppInline(line) : "\u00A0"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 인트로 상태 ── */}
        {step === -1 && (
          <div className="mt-5 text-center">
            <p className="text-slate-500 text-sm mb-4">{t.subtitle}</p>
            <button
              onClick={handleNext}
              className="px-8 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              {t.start} →
            </button>
          </div>
        )}

        {/* ── 설명 카드 (step 0~4) ── */}
        {currentDiff && (
          <div
            key={currentDiff.id}
            className="mt-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {/* 라벨 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{currentDiff.icon}</span>
              <h4 className="text-slate-800 font-bold text-sm">
                {currentDiff.label[lang]}
              </h4>
            </div>

            {/* 설명 */}
            <p className="text-slate-600 text-sm mb-4">
              {currentDiff.explanation[lang]}
            </p>

            {/* 미니 코드 비교 */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
              <div className="flex-1 bg-blue-50 rounded-lg p-3">
                <p className="text-blue-500 text-[10px] font-bold uppercase mb-1.5">
                  Python
                </p>
                <div className="font-mono text-xs text-slate-700">
                  {currentDiff.id === "main" ? (
                    <span className="text-slate-400 italic text-xs">
                      {t.noPythonEquivalent}
                    </span>
                  ) : (
                    renderSnippetLines(currentDiff.pythonSnippet, "python")
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center px-2 py-1">
                <span className="text-slate-400 text-xs font-bold">→</span>
              </div>
              <div className="flex-1 bg-emerald-50 rounded-lg p-3">
                <p className="text-emerald-500 text-[10px] font-bold uppercase mb-1.5">
                  C++
                </p>
                <div className="font-mono text-xs text-slate-700">
                  {renderSnippetLines(currentDiff.cppSnippet, "cpp")}
                </div>
              </div>
            </div>

            {/* 미니 퀴즈 */}
            {currentDiff.miniQuestion && (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-slate-700 text-xs font-medium mb-2">
                  {currentDiff.miniQuestion.question[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentDiff.miniQuestion.options[lang].map((opt, i) => {
                    const isCorrect =
                      i === currentDiff.miniQuestion!.correctIndex
                    const isSelected = miniAnswer === i
                    let btnClass =
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 "

                    if (!miniAnswered) {
                      btnClass +=
                        "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                    } else if (isCorrect) {
                      btnClass +=
                        "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400"
                    } else if (isSelected && !isCorrect) {
                      btnClass += "bg-red-100 text-red-600 line-through"
                    } else {
                      btnClass += "bg-slate-50 text-slate-400"
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleMiniAnswer(i)}
                        className={btnClass}
                        disabled={miniAnswered}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {miniAnswered && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      miniAnswer === currentDiff.miniQuestion!.correctIndex
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {miniAnswer === currentDiff.miniQuestion!.correctIndex
                      ? t.correct
                      : t.wrong(
                          currentDiff.miniQuestion!.options[lang][
                            currentDiff.miniQuestion!.correctIndex
                          ]
                        )}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── 요약 (step === 5) ── */}
        {step === total && (
          <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-center text-emerald-600 font-bold text-sm">
              {t.summarySubtitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DIFFERENCES.map((d) => (
                <div
                  key={d.id}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-white border border-slate-200"
                >
                  <span className="text-base mt-0.5">{d.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-800 text-xs font-bold">
                      {d.label[lang]}
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-tight">
                      {d.explanation[lang]}
                    </p>
                  </div>
                  <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 네비게이션 버튼 ── */}
        {step >= 0 && (
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                step === 0
                  ? "opacity-0 pointer-events-none"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              ← {t.back}
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              {step === total ? t.complete : `${t.next} →`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
