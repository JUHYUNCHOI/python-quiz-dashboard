"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, RotateCcw, Check, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/code-block"
import { createClient } from "@/lib/supabase/client"
const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

const CPP_KEYWORDS = /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|string|vector|map|set|pair|cout|cin|endl|std)\b/g
const CPP_PREPROCESSOR = /^(#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|pragma|line)\b.*)/gm
const CPP_STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const CPP_COMMENT_LINE = /\/\/.*/g
const CPP_COMMENT_BLOCK = /\/\*[\s\S]*?\*\//g
const CPP_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[uUlLfF]?\b/g

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlightCppCode(code: string): string {
  // We process the code with placeholders to avoid re-highlighting replaced regions
  const segments: Array<{ text: string; cls?: string }> = []
  let remaining = code

  // Build a list of all matches with their ranges, then sort by position
  type Match = { start: number; end: number; text: string; cls: string }
  const matches: Match[] = []

  const addMatches = (re: RegExp, cls: string) => {
    re.lastIndex = 0
    let m
    while ((m = re.exec(remaining)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
    }
  }

  addMatches(new RegExp(CPP_COMMENT_BLOCK.source, "g"), "comment")
  addMatches(new RegExp(CPP_COMMENT_LINE.source, "g"), "comment")
  addMatches(new RegExp(CPP_STRING.source, "g"), "string")
  addMatches(new RegExp(CPP_PREPROCESSOR.source, "gm"), "preprocessor")
  addMatches(new RegExp(CPP_KEYWORDS.source, "g"), "keyword")
  addMatches(new RegExp(CPP_NUMBER.source, "g"), "number")

  // Sort by start, remove overlapping
  matches.sort((a, b) => a.start - b.start)
  const filtered: Match[] = []
  let cursor = 0
  for (const m of matches) {
    if (m.start >= cursor) {
      filtered.push(m)
      cursor = m.end
    }
  }

  // Build HTML
  cursor = 0
  let html = ""
  for (const m of filtered) {
    if (m.start > cursor) {
      html += escapeHtml(remaining.slice(cursor, m.start))
    }
    const colorMap: Record<string, string> = {
      keyword: "#ff7b72",
      comment: "#b0bec5",
      string: "#a5d6ff",
      preprocessor: "#ff7b72",
      number: "#ffa657",
    }
    const color = colorMap[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${color};font-style:italic` : `color:${color}`
    html += `<span style="${style}">${escapeHtml(m.text)}</span>`
    cursor = m.end
  }
  if (cursor < remaining.length) {
    html += escapeHtml(remaining.slice(cursor))
  }
  return html
}

interface CppRunnerProps {
  initialCode: string
  expectedOutput?: string
  stdin?: string
  task?: string
  onSuccess?: () => void
  onError?: () => void
  minHeight?: string
  isEn?: boolean
  // 숙제 제출 모드
  submissionMode?: boolean
  lessonId?: string
  stepId?: string
  stepTitle?: string
  userId?: string
  // 완료 후 Run 버튼 숨기기
  isCompleted?: boolean
  onReset?: () => void
  // 부모가 에디터 코드를 직접 주입할 때 사용 (key 변경 없이 코드 교체)
  forceCode?: string
  forceCodeVersion?: number
}

// Piston (self-hosted code execution)
const PISTON_URL = process.env.NEXT_PUBLIC_PISTON_URL || ""
const PISTON_KEY = process.env.NEXT_PUBLIC_PISTON_KEY || ""
const PISTON_CPP_VERSION = "10.2.0"

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase()
}

function friendlyError(stderr: string): string {
  if (stderr.includes("error: expected ';'")) return "❌ 세미콜론(;)이 빠진 곳이 있어요!"
  if (stderr.includes("error: expected '}'")) return "❌ 닫는 중괄호 }가 빠진 곳이 있어요!"
  if (stderr.includes("error: expected '{'")) return "❌ 여는 중괄호 {가 빠진 곳이 있어요!"
  if (stderr.includes("was not declared")) {
    const m = stderr.match(/'([^']+)' was not declared/)
    return m ? `❌ '${m[1]}'이 선언되지 않았어요. 오타나 #include를 확인해보세요.` : "❌ 선언되지 않은 변수/함수가 있어요."
  }
  if (stderr.includes("error:")) {
    const firstError = stderr.split("\n").find(l => l.includes("error:"))
    return "❌ 컴파일 오류: " + (firstError?.split("error:")[1]?.trim() || stderr.split("\n")[0])
  }
  return "❌ " + stderr.split("\n")[0]
}

export function CppRunner({
  initialCode,
  expectedOutput,
  stdin,
  task,
  onSuccess,
  onError,
  minHeight,
  isEn = false,
  submissionMode = false,
  lessonId,
  stepId,
  stepTitle,
  userId,
  isCompleted = false,
  onReset,
  forceCode,
  forceCodeVersion,
}: CppRunnerProps) {
  // userId 포함 → 사용자별 독립 저장 (선생님 코드가 학생에게 보이는 문제 방지)
  const storageKey = stepId ? `cpp-runner-${userId ?? "anon"}-${lessonId ?? "x"}-${stepId}` : null

  const [code, setCode] = useState(() => {
    if (!storageKey || typeof window === "undefined") return initialCode
    try {
      const saved = localStorage.getItem(storageKey)
      // placeholder 코멘트나 빈 값이면 initialCode 사용 (이전 버전 마이그레이션)
      if (!saved || saved.trim().startsWith("// 👉")) return initialCode
      return saved
    } catch {
      return initialCode
    }
  })
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [failCount, setFailCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedThisSession, setSubmittedThisSession] = useState(false) // 이번 세션에서 직접 제출했는지
  const [teacherGrade, setTeacherGrade] = useState<"pass" | "fail" | "auto" | null | undefined>(undefined) // undefined = 아직 로딩
  const [teacherComment, setTeacherComment] = useState<string | null>(null)

  // 부모가 forceCode + forceCodeVersion으로 에디터 코드를 직접 교체
  const prevForceVersion = useRef(forceCodeVersion)
  useEffect(() => {
    if (forceCode !== undefined && forceCodeVersion !== undefined && forceCodeVersion !== prevForceVersion.current) {
      prevForceVersion.current = forceCodeVersion
      setCode(forceCode)
      // localStorage도 업데이트해서 새로고침해도 주입된 코드 유지
      if (storageKey) {
        try { localStorage.setItem(storageKey, forceCode) } catch {}
      }
    }
  }, [forceCode, forceCodeVersion, storageKey])

  // isCompleted의 최신값을 fetch 콜백 클로저에서 참조하기 위한 ref
  const isCompletedRef = useRef(isCompleted)
  useEffect(() => { isCompletedRef.current = isCompleted }, [isCompleted])

  // 마운트 시 이전 제출 결과 확인 (submissionMode만)
  useEffect(() => {
    if (!submissionMode || !stepId) return
    const fetchPrevGrade = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from("homework_submissions")
        .select("teacher_grade, teacher_comment")
        .eq("student_id", user.id)
        .eq("step_id", stepId)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .single()
      if (data) {
        setIsSubmitted(true)
        const grade = (data.teacher_grade as "pass" | "fail" | "auto" | null) ?? null
        setTeacherGrade(grade)
        setTeacherComment(data.teacher_comment ?? null)
        // 선생님이 이미 확인했거나 자동 채점 완료된 경우 레슨 진도 동기화
        // ref로 최신 isCompleted 값 확인 — 클로저 캡처 타이밍 버그 방지
        if ((grade === "pass" || grade === "auto") && !isCompletedRef.current) {
          onSuccess?.()
        }
      } else {
        setTeacherGrade(null)
      }
    }
    fetchPrevGrade()
  }, [submissionMode, stepId]) // eslint-disable-line react-hooks/exhaustive-deps

  // 코드 변경 시 localStorage 자동 저장
  useEffect(() => {
    if (!storageKey) return
    try { localStorage.setItem(storageKey, code) } catch {}
  }, [code, storageKey])

  const lineCount = initialCode.split("\n").length
  const editorMinHeight = minHeight ?? `${Math.max(280, lineCount * 28 + 64)}px`

  // teacher_grade: 'auto' = expectedOutput 일치, null = 자유 구현(선생님 확인 필요)
  const saveCodeSilently = async (currentCode: string, autoGrade: "auto" | null = null) => {
    // 이미 정답 처리됐으면 스킵. null(미채점) 상태에서 정답이 나오면 재제출 허용
    if (isSubmitting) return
    if (isSubmitted && teacherGrade !== "fail" && !(autoGrade === "auto" && teacherGrade === null)) return
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single()
      const { error } = await supabase
        .from("homework_submissions")
        .insert({
          student_id: user.id,
          student_name: profile?.display_name || user.email,
          lesson_id: lessonId || "unknown",
          step_id: stepId || "unknown",
          step_title: stepTitle || "",
          code: currentCode,
          teacher_grade: autoGrade,
          expected_output: expectedOutput || null,
          problem_description: task || null,
        })
      if (!error) {
        setIsSubmitted(true)
        setSubmittedThisSession(true)
        setTeacherGrade(autoGrade ?? null)
      }
    } catch {
      // 백그라운드 저장 실패는 조용히 처리 (학생 방해 안 함)
    } finally {
      setIsSubmitting(false)
    }
  }

  const runCode = useCallback(async () => {
    if (!code.trim() || isLoading) return
    setIsLoading(true)
    setOutput("")
    setError("")
    setIsCorrect(null)

    try {
      const res = await fetch(PISTON_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(PISTON_KEY ? { Authorization: `Bearer ${PISTON_KEY}` } : {}),
        },
        body: JSON.stringify({
          language: "c++",
          version: PISTON_CPP_VERSION,
          files: [{ name: "main.cpp", content: code }],
          ...(stdin ? { stdin } : {}),
        })
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()

      const compileStderr = data.compile && data.compile.code !== 0
        ? (data.compile.stderr || data.compile.output || "")
        : ""
      const run = data.run || {}
      const runStdout = (run.stdout || "").trimEnd()
      const runStderr = run.stderr || ""
      const runCode = run.code

      if (compileStderr) {
        setError(friendlyError(compileStderr))
        if (!submissionMode) {
          const next = failCount + 1
          setFailCount(next)
          if (next >= 3) setShowAnswer(true)
          onError?.()
        }
      } else if (runStderr && runCode !== 0) {
        setError("❌ 런타임 오류: " + runStderr.split("\n")[0])
        if (!submissionMode) {
          const next = failCount + 1
          setFailCount(next)
          if (next >= 3) setShowAnswer(true)
          onError?.()
        }
      } else {
        setOutput(runStdout)
        setHasRun(true)
        if (submissionMode) {
          const outputMatches = !expectedOutput || normalize(runStdout) === normalize(expectedOutput)
          // 아직 제출 안 됐거나 fail 상태면 새로 저장
          if (!isSubmitted || teacherGrade === "fail") {
            const autoGrade = outputMatches ? "auto" as const : null
            saveCodeSilently(code, autoGrade)
          }
          if (outputMatches) {
            setIsCorrect(true)
          } else if (expectedOutput) {
            setIsCorrect(false)
          }
          // submissionMode에서는 출력 일치 여부와 관계없이 제출하면 다음으로 진행 가능
          // (선생님이 나중에 리뷰하므로 제출 자체가 완료)
          onSuccess?.()
        } else if (!submissionMode) {
          if (expectedOutput) {
            const isMatch = normalize(runStdout) === normalize(expectedOutput)
            setIsCorrect(isMatch)
            if (isMatch) {
              onSuccess?.()
            } else {
              const next = failCount + 1
              setFailCount(next)
              if (next >= 3) setShowAnswer(true)
              onError?.()
            }
          } else {
            // expectedOutput 없으면 출력만 보여주고 사용자가 직접 완료
            setIsCorrect(null)
          }
        }
      }
    } catch {
      setError(isEn
        ? "❌ Connection error. Check your internet and try again."
        : "❌ 연결 오류. 인터넷 연결을 확인하고 다시 시도해보세요.")
      onError?.()
    } finally {
      setIsLoading(false)
    }
  }, [code, expectedOutput, onSuccess, onError, isLoading, isEn, failCount, submissionMode, isSubmitted, isSubmitting])

  const reset = () => {
    setCode(initialCode)
    if (storageKey) { try { localStorage.removeItem(storageKey) } catch {} }
    setOutput("")
    setError("")
    setIsCorrect(null)
    setHasRun(false)
    onReset?.()
  }

  return (
    <div className="space-y-3">
      {task && (
        <div className="bg-teal-50 rounded-lg p-2.5 border border-teal-200">
          <p className="text-teal-800 font-bold text-sm">🎯 {task}</p>
        </div>
      )}

      {stdin && (
        <div className="bg-gray-900 rounded-xl p-3 border border-gray-700">
          <p className="text-gray-400 text-xs font-bold mb-1.5">
            {isEn ? "⌨️ Input (stdin):" : "⌨️ 입력 데이터 (테스트용):"}
          </p>
          <pre className="font-mono text-sm text-sky-300 whitespace-pre-wrap">{stdin}</pre>
        </div>
      )}

      {expectedOutput && (
        <div className="bg-gray-900 rounded-xl p-3 border border-gray-700">
          <p className="text-gray-400 text-xs font-bold mb-1.5">
            {isEn ? "🎯 Target output:" : "🎯 이렇게 출력되어야 해요:"}
          </p>
          <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{expectedOutput}</pre>
        </div>
      )}

      {/* 코드 에디터 */}
      <div className={cn(
        "rounded-xl overflow-hidden border-2 transition-all",
        isCorrect === true && "border-green-500",
        isCorrect === false && "border-red-500",
        isCorrect === null && "border-gray-700"
      )}>
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#282c34]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs font-mono">C++ — Ctrl+Enter {isEn ? "to run" : "실행"}</span>
        </div>

        <div className="cpp-editor-dark">
          <SimpleEditor
            value={code}
            onValueChange={newCode => { setCode(newCode); setIsCorrect(null); setOutput(""); setError("") }}
            highlight={highlightCppCode}
            padding={16}
            tabSize={4}
            insertSpaces={true}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement & HTMLDivElement>) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                runCode()
                return
              }
              if (e.key === "Enter") {
                e.preventDefault()
                const textarea = e.currentTarget
                const start = textarea.selectionStart
                const val = textarea.value
                const lineStart = val.lastIndexOf("\n", start - 1) + 1
                const currentLine = val.slice(lineStart, start)
                const indent = currentLine.match(/^(\s*)/)?.[1] ?? ""
                const extraIndent = currentLine.trimEnd().endsWith("{") ? "    " : ""
                const newVal = val.slice(0, start) + "\n" + indent + extraIndent + val.slice(start)
                const newCursor = start + 1 + indent.length + extraIndent.length
                setCode(newVal)
                requestAnimationFrame(() => {
                  textarea.selectionStart = newCursor
                  textarea.selectionEnd = newCursor
                })
              }
            }}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", "Courier New", monospace',
              fontSize: 15,
              lineHeight: 1.7,
              minHeight: editorMinHeight,
              background: "#282c34",
              color: "#e6edf3",
            }}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        {!isCompleted && (
          <button
            onClick={runCode}
            disabled={!code.trim() || isLoading}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all",
              code.trim() && !isLoading
                ? "bg-teal-600 hover:bg-teal-500 text-white shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {isLoading
              ? <><Loader2 className="w-4 h-4 animate-spin" />{isEn ? "Running..." : "컴파일 중..."}</>
              : <><Play className="w-4 h-4" />{isEn ? "▶ Run & Save" : "▶ 실행 및 저장"}</>
            }
          </button>
        )}
        <button
          onClick={reset}
          title={isEn ? "Reset" : "초기화"}
          className="px-4 py-2.5 rounded-xl font-bold transition-all bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 실행 결과 */}
      {(output || error) && (
        <div className={cn(
          "rounded-xl p-3 border-2 transition-all",
          error ? "bg-red-50 border-red-300" :
          isCorrect === true ? "bg-green-50 border-green-300" :
          "bg-gray-50 border-gray-300"
        )}>
          <div className="flex items-center gap-2 mb-1">
            {error
              ? <X className="w-4 h-4 text-red-600" />
              : isCorrect === true
                ? <Check className="w-4 h-4 text-green-600" />
                : <span className="text-gray-500 text-sm">→</span>
            }
            <span className={cn(
              "font-bold text-sm",
              error ? "text-red-600" : isCorrect === true ? "text-green-600" : "text-gray-700"
            )}>
              {error ? (isEn ? "Error!" : "오류!") : isCorrect === true ? (isEn ? "Correct! 🎉" : "정답! 🎉") : (isEn ? "Output:" : "결과:")}
            </span>
            {failCount > 0 && !isCorrect && !submissionMode && (
              <span className="ml-auto text-xs text-gray-400">{isEn ? `${failCount} attempt(s)` : `${failCount}번 시도`}</span>
            )}
          </div>
          <pre className={cn(
            "font-mono text-xs md:text-sm whitespace-pre-wrap break-all",
            error ? "text-red-700" : "text-gray-800"
          )}>
            {error || output}
          </pre>
        </div>
      )}

      {/* 제출 상태 / 선생님 채점 결과 (submissionMode만) */}
      {submissionMode && isSubmitting && (
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          {isEn ? "Saving..." : "저장 중..."}
        </p>
      )}
      {submissionMode && isSubmitted && !isSubmitting && (submittedThisSession || teacherGrade != null) && (
        <div className={cn(
          "rounded-xl px-4 py-3 text-sm font-bold text-center",
          teacherGrade === "pass" || teacherGrade === "auto"
            ? "bg-green-50 text-green-700 border border-green-200"
            : teacherGrade === "fail"
            ? "bg-red-50 text-red-700 border border-red-200"
            : "bg-gray-50 text-gray-500 border border-gray-200"
        )}>
          {teacherGrade === "pass" && (isEn ? "✅ Teacher approved!" : "✅ 선생님이 정답 확인했어요!")}
          {teacherGrade === "auto" && (isEn ? "✅ Correct! (auto-graded)" : "✅ 정답이에요! (자동 채점)")}
          {teacherGrade === "fail" && (isEn ? "❌ Try again! Teacher left feedback." : "❌ 다시 도전해보세요! 선생님이 확인했어요.")}
          {(teacherGrade === null || teacherGrade === undefined) && (isEn ? "📬 Submitted — waiting for teacher review" : "📬 제출됨 — 선생님 확인 대기 중")}
          {teacherComment && (
            <p className={cn(
              "mt-2 text-sm font-normal leading-relaxed border-t pt-2",
              teacherGrade === "pass" || teacherGrade === "auto" ? "border-green-200 text-green-800" :
              teacherGrade === "fail" ? "border-red-200 text-red-800" :
              "border-gray-200 text-gray-600"
            )}>
              💬 {teacherComment}
            </p>
          )}
        </div>
      )}

      {/* 3번 틀린 후 정답 코드 공개 */}
      {showAnswer && initialCode && (
        <div className="rounded-xl border-2 border-red-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 font-bold text-sm">
            <Eye className="w-4 h-4" />
            {isEn ? "Answer code (3 attempts used)" : "정답 코드 (3번 시도 후 공개)"}
          </div>
          <div className="relative">
            <CodeBlock code={initialCode} language="cpp" />
          </div>
        </div>
      )}
    </div>
  )
}
