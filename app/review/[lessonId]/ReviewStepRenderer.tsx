"use client"

import { useState, useEffect, useRef, Fragment } from "react"

// 한글/CJK 문자는 영문자보다 2배 넓으므로 ch 단위 계산 시 2로 카운트
function getChWidth(str: string): number {
  let width = 0
  for (const ch of str) {
    const code = ch.codePointAt(0) ?? 0
    if (
      (code >= 0xAC00 && code <= 0xD7AF) || // 한글 음절
      (code >= 0x1100 && code <= 0x11FF) || // 한글 자모
      (code >= 0x4E00 && code <= 0x9FFF) || // CJK 한자
      (code >= 0x3040 && code <= 0x30FF) || // 히라가나/카타카나
      (code >= 0xFF00 && code <= 0xFFEF)    // 전각 문자
    ) {
      width += 2
    } else {
      width += 1
    }
  }
  return width
}
import { Check, X, Lightbulb, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { highlightCpp, highlightCppInline, highlightPython, highlightPythonInline } from "@/components/ui/code-block"
import type {
  StepContent,
  QuizContent,
  PracticeContent,
  InterleavingContent,
  ErrorQuizContent,
  ExplainContent,
} from "./data/types"
import { runPythonCode } from "./utils/pythonRunner"

// ─────────────────────────────────────────────────────────────
// Auto-translate common Korean review strings → English fallback
// (used when en.predict translations are not provided in data files)
// ─────────────────────────────────────────────────────────────
function autoTranslateQuestion(q: string | undefined): string {
  if (!q) return "What's the output?"

  // ── Exact matches ──────────────────────────────────────────
  const exact: Record<string, string> = {
    "결과는?": "What's the output?",
    "출력 결과는?": "What's the output?",
    "결과가 뭘까?": "What's the output?",
    "출력은?": "What's the output?",
    "실행 결과는?": "What's the output?",
    "어떤 결과가 나올까?": "What's the output?",
    "이 코드의 결과는?": "What's the output?",
    "이 코드의 출력은?": "What's the output?",
    "몇 번 출력될까?": "How many times will it print?",
    "첫 번째 출력은?": "What's the first output?",
    "두 cout의 출력은?": "What are both couts' outputs?",
    "마지막 cout의 출력은?": "What's the last cout's output?",
    "true를 출력하면 뭐가 나올까?": "What gets printed when you print true?",
    "int에 3.14를 넣으면 어떻게 될까?": "What happens if you put 3.14 into an int?",
    "혈액형 O는 왜 따옴표가 작은따옴표일까?": "Why does blood type O use single quotes?",
    "cin >> age; 에서 >>의 방향은?": "In cin >> age;, which direction does >> point?",
    "10 / 3 의 결과는?": "What's the result of 10 / 3?",
    "7 % 3 의 결과는?": "What's the result of 7 % 3?",
    "a + b 의 결과는?": "What's the result of a + b?",
    "C가 출력될까요?": "Will C be printed?",
    "if (x = 5) 는 어떤 의미?": "What does if (x = 5) mean?",
    "매개변수에 &를 쓰는 이유는?": "Why use & in function parameters?",
    "철수를 2번 add하면 몇 명?": "If you add Cheolsu twice, how many people?",
    "어떤 접시가 먼저 나올까?": "Which plate comes out first?",
    "뒤로가기하면 어디로?": "Where does the back button go?",
    "큰 수부터 나오는 이유는?": "Why do larger numbers come out first?",
    "deque의 popleft()가 빠른 이유는?": "Why is deque's popleft() fast?",
    "큐에서 [1, 2, 3] 중 먼저 나오는 건?": "In a queue with [1, 2, 3], which comes out first?",
    "교집합의 결과는?": "What's the intersection result?",
    "합집합의 결과는?": "What's the union result?",
    "rand() % 50 + 1 의 범위는?": "What's the range of rand() % 50 + 1?",
    "bits/stdc++.h를 실제 프로젝트에서도 쓸까요?": "Is bits/stdc++.h used in real projects?",
    "이 문제를 풀려면 어떤 알고리즘이 필요할까요?": "What algorithm is needed to solve this problem?",
    "이 템플릿에서 freopen은 왜 쓰나요?": "Why is freopen used in this template?",
    "freopen 후 cin은 어디서 읽나요?": "After freopen, where does cin read from?",
    "1등은?": "Who is 1st place?",
    "맨 앞 학생 이름은?": "What's the name of the first student?",
    "교환 후 a와 b의 값은?": "What are the values of a and b after the swap?",
    "r.width = 5; 는 동작할까요?": "Does r.width = 5; work?",
  }
  if (exact[q]) return exact[q]

  // ── Regex patterns ─────────────────────────────────────────
  // "[X]의 결과는?" → "What's the result of [X]?"
  let m = q.match(/^(.+)의 결과는\?$/)
  if (m) return `What's the result of ${m[1]}?`

  // "[X]의 값은?" → "What's the value of [X]?"
  m = q.match(/^(.+)의 값은\?$/)
  if (m) return `What's the value of ${m[1]}?`

  // "[X]의 출력은?" → "What's the output of [X]?"
  m = q.match(/^(.+)의 출력은\?$/)
  if (m) return `What's the output of ${m[1]}?`

  // "[X]의 길이는?" → "What's the length of [X]?"
  m = q.match(/^(.+)의 길이는\?$/)
  if (m) return `What's the length of ${m[1]}?`

  // "[X]일 때 출력은?" / "[X]일 때 결과는?"
  m = q.match(/^(.+)일 때 출력은\?$/)
  if (m) return `What's the output when ${m[1]}?`
  m = q.match(/^(.+)일 때 결과는\?$/)
  if (m) return `What's the result when ${m[1]}?`
  m = q.match(/^(.+)일 때 이 코드의 출력은\?$/)
  if (m) return `What's the output when ${m[1]}?`

  // "[X] 입력하면?" → "If [X] is entered?"
  m = q.match(/^(.+) 입력하면\?$/)
  if (m) return `What if ${m[1]} is entered?`
  m = q.match(/^(.+) 입력 → (.+) 입력하면\?$/)
  if (m) return `After entering ${m[1]}, then entering ${m[2]}?`

  // "[X]를 오른쪽/왼쪽 N칸 rotate하면?"
  m = q.match(/^(.+)를 오른쪽 (.+) rotate하면\?$/)
  if (m) return `What happens when ${m[1]} is rotated right by ${m[2]}?`
  m = q.match(/^(.+)를 왼쪽 (.+) rotate하면\?$/)
  if (m) return `What happens when ${m[1]} is rotated left by ${m[2]}?`

  // "[X] 내용은?"
  m = q.match(/^(.+) 내용은\?$/)
  if (m) return `What's the content of ${m[1]}?`

  // "[X]는 몇 줄?"
  m = q.match(/^(.+)는 몇 줄\?$/)
  if (m) return `How many lines does ${m[1]} have?`

  // "[X]의 빈도수는?"
  m = q.match(/^(.+)의 빈도수는\?$/)
  if (m) return `What is the frequency of ${m[1]}?`

  // "[X]가 [Y]라면 [Z]하면?"
  m = q.match(/^(.+)가 (.+)라면 (.+)\?$/)
  if (m) return `If ${m[1]} is ${m[2]}, what happens when ${m[3]}?`

  return q
}

function autoTranslateOption(opt: string): string {
  const map: Record<string, string> = {
    // Errors
    "에러": "Error",
    "오류": "Error",
    "에러 발생": "Error",
    "컴파일 에러": "Compile Error",
    "런타임 에러": "Runtime Error",
    // Boolean / null
    "참": "True",
    "거짓": "False",
    "없음": "None",
    // Loop states
    "무한 루프": "Infinite loop",
    "무한 반복": "Infinite loop",
    // Output states
    "아무것도 출력 안 됨": "No output",
    "아무것도 출력되지 않음": "No output",
    "출력 없음": "No output",
    // Yes/No
    "예": "Yes",
    "아니오": "No",
    "동작함": "Works",
    "동작 안 함": "Doesn't work",
    // Common answers
    "가능": "Possible",
    "불가능": "Not possible",
    "빠름": "Fast",
    "느림": "Slow",
    "같다": "Same",
    "다르다": "Different",
    "증가": "Increases",
    "감소": "Decreases",
    "파일에서 읽음": "Reads from file",
    "키보드에서 읽음": "Reads from keyboard",
    "쓰지 않음": "Not used",
    "자주 씀": "Often used",
  }
  return map[opt] ?? opt
}

// ─────────────────────────────────────────────────────────────
// Helper: normalize blank answers for comparison
// ─────────────────────────────────────────────────────────────
function normalize(s: string) {
  return s
    .replace(/[\u2018\u2019]/g, "'")   // iOS 곡선 홑따옴표 → 직선 '
    .replace(/[\u201C\u201D]/g, '"')   // iOS 곡선 겹따옴표 → 직선 "
    .replace(/\s+/g, "")
    .toLowerCase()
}

// C++은 std:: 프리픽스가 있어도 없어도 같은 코드 → 비교 시 제거
function normalizeCpp(s: string) {
  return normalize(s).replace(/std::/g, "")
}

function isAnswerCorrect(
  input: string,
  content: PracticeContent | InterleavingContent,
  isEn = false,
  lang?: "python" | "cpp"
): boolean {
  const n = normalize(input)
  // C++이면 std:: 제거한 버전으로도 비교
  const compare = (a: string) => {
    if (normalize(a) === n) return true
    if (lang === "cpp" && normalizeCpp(a) === normalizeCpp(input)) return true
    return false
  }

  // blanksAnswer가 있으면 쉼표 결합 형태로도 체크 (multi-blank)
  if (content.blanksAnswer && content.blanksAnswer.length > 1) {
    if (compare(content.blanksAnswer.join(", "))) return true
  }
  if (compare(content.answer)) return true
  if (content.alternateAnswers?.some(a => compare(a))) return true
  // EN 모드: en.answer / en.alternateAnswers / en.blanksAnswer도 체크
  if (isEn && content.en) {
    const en = content.en as { answer?: string; alternateAnswers?: string[]; blanksAnswer?: string[] }
    if (en.blanksAnswer && en.blanksAnswer.length > 1) {
      if (compare(en.blanksAnswer.join(", "))) return true
    }
    if (en.answer && compare(en.answer)) return true
    if (en.alternateAnswers?.some(a => compare(a))) return true
  }
  return false
}

// ─────────────────────────────────────────────────────────────
// MCQ (quiz + errorQuiz)
// ─────────────────────────────────────────────────────────────
function McqStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
  savedAnswer,
  onSaveAnswer,
}: {
  content: QuizContent | ErrorQuizContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
  savedAnswer?: number | null
  onSaveAnswer?: (data: SavedAnswerData) => void
}) {
  const { t, lang } = useLanguage()
  const E = lang === "en"
  const [selected, setSelected] = useState<number | null>(savedAnswer ?? null)
  const answered = selected !== null
  const isRight = selected === content.answer

  // EN 필드 우선 사용 (없으면 Korean fallback)
  const question = (E && content.en?.question) ? content.en.question : content.question
  const options = (E && content.en?.options?.length) ? content.en.options : content.options
  const explanation = (E && content.en?.explanation) ? content.en.explanation : content.explanation

  const select = (i: number) => {
    if (answered) return
    setSelected(i)
    onSaveAnswer?.(i)
    const correct = i === content.answer
    if (correct) onCorrect()
    else onWrong()
  }

  const LABELS = ["①", "②", "③", "④", "⑤"]

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-gray-800 text-base leading-relaxed">{question}</p>
      {"code" in content && content.code && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm overflow-x-auto leading-6 whitespace-pre-wrap">
          {language === "cpp"
            ? highlightCpp(content.code, true)
            : highlightPython(content.code, true)}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === content.answer
          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={answered}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-all flex items-center gap-3",
                !answered && "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer shadow-sm",
                answered && isCorrect && "border-emerald-400 bg-emerald-50",
                answered && isSelected && !isCorrect && "border-red-400 bg-red-50",
                answered && !isSelected && !isCorrect && "border-gray-100 bg-gray-50/80 opacity-40 cursor-not-allowed",
              )}
            >
              <span className={cn(
                "text-base shrink-0 w-5 text-center",
                !answered ? "text-gray-300" :
                isCorrect ? "text-emerald-500" :
                isSelected ? "text-red-400" : "text-gray-300"
              )}>
                {LABELS[i]}
              </span>
              <span className={cn(
                "flex-1 text-sm whitespace-pre-line",
                !answered ? "text-gray-800" :
                isCorrect ? "text-emerald-700 font-semibold" :
                isSelected ? "text-red-700" : "text-gray-500"
              )}>
                {opt.replace(/\\n/g, "\n")}
              </span>
              {answered && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={cn(
          "rounded-2xl border px-4 py-3 text-sm",
          isRight ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        )}>
          <p className={cn("font-bold mb-1", isRight ? "text-emerald-700" : "text-red-600")}>
            {isRight ? t("✅ 정답!", "✅ Correct!") : t("❌ 오답!", "❌ Wrong!")}
          </p>
          <p className="text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Practice / Interleaving (fill-in-blank or write code)
// ─────────────────────────────────────────────────────────────
const BLANK_LABELS = ["①", "②", "③", "④", "⑤"]

// 다중 줄 템플릿 파트를 인라인 하이라이팅으로 렌더링
function renderTemplatePart(text: string, lang: "python" | "cpp"): React.ReactNode[] {
  const inlineFn = lang === "cpp"
    ? (l: string) => highlightCppInline(l, true)
    : (l: string) => highlightPythonInline(l, true)
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  lines.forEach((line, i) => {
    result.push(
      <Fragment key={`rtp-${i}`}>
        {inlineFn(line)}
      </Fragment>
    )
    if (i < lines.length - 1) result.push('\n')
  })
  return result
}

function PracticeStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
  storageKey,
  savedAnswer,
  onSaveAnswer,
  lessonExplains,
  lessonLink,
}: {
  content: PracticeContent | InterleavingContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
  storageKey?: string
  savedAnswer?: { inputs: string[]; result: "correct" | "wrong" } | null
  onSaveAnswer?: (data: SavedAnswerData) => void
  lessonExplains?: string[][]
  lessonLink?: string
}) {
  const { t, lang: curLang } = useLanguage()
  const isEn = curLang === "en"

  const isFullCode = content.template === null
  // EN 템플릿 우선 사용 (없으면 KO fallback)
  const enContent = content.en as { template?: string; answer?: string; alternateAnswers?: string[] } | undefined
  const rawTemplateBase = (!isFullCode && isEn && enContent?.template)
    ? enContent.template
    : content.template
  // { before, after } 객체 형식을 인라인 빈칸 문자열로 정규화
  const rawTemplate = (typeof rawTemplateBase === "object" && rawTemplateBase !== null && "before" in rawTemplateBase)
    ? `${(rawTemplateBase as { before: string; after: string }).before}___${(rawTemplateBase as { before: string; after: string }).after}`
    : rawTemplateBase
  const template = typeof rawTemplate === "string" ? rawTemplate : ""
  // 빈칸 개수 카운트
  const blankCount = isFullCode ? 0 : (template.match(/___/g) || []).length
  const isMultiBlank = blankCount > 1

  // 빈칸 개수에 따라 inputs 배열 or 단일 string 관리 (savedAnswer 또는 localStorage 복원)
  const [inputs, setInputs] = useState<string[]>(() => {
    if (savedAnswer?.inputs) return savedAnswer.inputs
    if (storageKey) {
      try {
        const saved = localStorage.getItem(`review-input-${storageKey}`)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) return parsed
        }
      } catch {}
    }
    return Array(Math.max(blankCount, 1)).fill("")
  })
  const [result, setResult] = useState<"idle" | "correct" | "wrong">(savedAnswer?.result ?? "idle")
  const [isRunning, setIsRunning] = useState(false)
  const [actualOutput, setActualOutput] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => { firstInputRef.current?.focus() }, [])

  // inputs 변경 시 localStorage에 저장 (제출 전에만)
  useEffect(() => {
    if (!storageKey || result !== "idle") return
    try {
      localStorage.setItem(`review-input-${storageKey}`, JSON.stringify(inputs))
    } catch {}
  }, [inputs, storageKey, result])

  const clearStorage = () => {
    if (storageKey) {
      try { localStorage.removeItem(`review-input-${storageKey}`) } catch {}
    }
  }

  const check = async () => {
    const combined = isMultiBlank
      ? inputs.map(s => s.trim()).join(", ")
      : inputs[0]
    if (!combined.trim() || isRunning) return

    // ── 출력 기반 채점: template=null + expect 있을 때 ──────────────
    if (isFullCode && content.expect) {
      const expectedOut = String(content.expect).trim()

      // Python: 자체 runner로 실행 후 출력 비교
      // (runner가 제한적이므로 텍스트 비교를 안전망으로 사용)
      if (language === "python") {
        const runResult = runPythonCode(combined)
        if (!runResult.error) {
          const actualOut = (runResult.result ?? "").trim()
          if (actualOut === expectedOut) {
            // 출력이 일치 → 정답
            setActualOutput(actualOut)
            clearStorage()
            setResult("correct")
            onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
            onCorrect()
            return
          }
          // 출력 불일치 → 텍스트 비교로 한 번 더 확인 (runner 한계 보완)
          if (isAnswerCorrect(combined, content, isEn, language)) {
            clearStorage()
            setResult("correct")
            onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
            onCorrect()
            return
          }
          // 둘 다 실패 → 오답, 실제 출력 보여줌
          setActualOutput(actualOut)
          clearStorage()
          setResult("wrong")
          onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
          onWrong()
          return
        }
        // runner 에러 → 텍스트 비교로 대체
        if (isAnswerCorrect(combined, content, isEn, language)) {
          clearStorage()
          setResult("correct")
          onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
          onCorrect()
        } else {
          setActualOutput(`오류: ${runResult.error}`)
          clearStorage()
          setResult("wrong")
          onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
          onWrong()
        }
        return
      }

      // C++: Wandbox API로 컴파일 & 실행
      if (language === "cpp") {
        setIsRunning(true)
        try {
          const res = await fetch("https://wandbox.org/api/compile.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: combined,
              compiler: "gcc-13.2.0",
              "compiler-option-raw": "-std=c++17",
            }),
          })
          const data = await res.json()
          const compileErr: string = data.compiler_error || ""
          const actualOut: string = (data.program_output || "").trim()

          if (compileErr && !actualOut) {
            // 컴파일 에러 → 첫 error: 줄만 표시
            const firstErr =
              compileErr.split("\n").find((l: string) => l.includes("error:")) ||
              compileErr.split("\n")[0]
            setActualOutput(`컴파일 에러: ${firstErr}`)
            clearStorage()
            setResult("wrong")
            onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
            onWrong()
          } else if (actualOut === expectedOut) {
            setActualOutput(actualOut)
            clearStorage()
            setResult("correct")
            onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
            onCorrect()
          } else {
            setActualOutput(actualOut)
            clearStorage()
            setResult("wrong")
            onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
            onWrong()
          }
        } catch {
          // 네트워크 에러 → 텍스트 비교로 대체
          clearStorage()
          if (isAnswerCorrect(combined, content, isEn, language)) {
            setResult("correct")
            onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
            onCorrect()
          } else {
            setResult("wrong")
            onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
            onWrong()
          }
        } finally {
          setIsRunning(false)
        }
        return
      }
    }

    // ── 텍스트 비교: 빈칸 채우기 또는 expect 없는 경우 ─────────────
    clearStorage()
    if (isAnswerCorrect(combined, content, isEn, language)) {
      setResult("correct")
      onSaveAnswer?.({ inputs: [...inputs], result: "correct" })
      onCorrect()
    } else {
      setResult("wrong")
      onSaveAnswer?.({ inputs: [...inputs], result: "wrong" })
      onWrong()
    }
  }

  const retry = () => {
    setResult("idle")
    setActualOutput(null)
    setShowHint(false)
    setTimeout(() => firstInputRef.current?.focus(), 50)
  }

  // EN 필드 우선 (없으면 KO fallback)
  const task = (isEn && content.en?.task) ? content.en.task : content.task
  const guide = isEn && content.en?.guide
    ? content.en.guide
    : "guide" in content ? (content as { guide?: string }).guide : undefined
  const hint = isEn && content.en?.hint
    ? content.en.hint
    : "hint" in content ? (content as { hint?: string }).hint : undefined

  // 템플릿을 ___ 기준으로 분할해 인라인 input 렌더링
  const templateParts = template.split("___")

  return (
    <div className="flex flex-col gap-3">
      {"message" in content && (
        (() => {
          const msg = (isEn && content.en && "message" in content.en && content.en.message)
            ? (content.en as { message?: string }).message
            : (content as any).message
          return msg ? <p className="text-xs text-indigo-500 font-semibold bg-indigo-50 rounded-lg px-3 py-2">{msg}</p> : null
        })()
      )}
      {"level" in content && content.level !== undefined && (
        <span className="text-xs font-bold text-indigo-400">Lv.{content.level}</span>
      )}
      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {(task || "").split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
            : <span key={i}>{part}</span>
        )}
      </p>

      {/* 목표 출력 — 빈칸 연습이거나 expect가 정답과 같으면 숨김 (정답 노출 방지) */}
      {isFullCode && "expect" in content && content.expect && result === "idle" &&
       "answer" in content && String(content.expect).trim() !== String(content.answer ?? "").trim() &&
       !task?.includes("↓") && !task?.includes(String(content.expect)) && (
        <div className="rounded-xl overflow-hidden border-2 border-emerald-400 shadow-sm">
          <div className="bg-emerald-500 px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-[11px] text-white font-bold tracking-wide">
              {isEn ? "▶ Expected output" : "▶ 이렇게 출력되어야 해!"}
            </span>
          </div>
          <div className="bg-gray-900 px-4 py-3 font-mono text-base font-bold text-white whitespace-pre-wrap leading-7">
            {String(content.expect)}
          </div>
        </div>
      )}

      {/* 인라인 빈칸 코드 블록 — { before, after } 객체도 string으로 정규화됐으므로 rawTemplate 기준으로 체크 */}
      {!isFullCode && blankCount > 0 && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm text-[#cdd6f4] overflow-x-auto leading-7 whitespace-pre-wrap">
          {templateParts.map((part, i) => (
            <Fragment key={i}>
              {renderTemplatePart(part, language)}
              {i < templateParts.length - 1 && (
                result === "idle" ? (
                  <input
                    ref={i === 0 ? firstInputRef as React.RefObject<HTMLInputElement> : undefined}
                    type="text"
                    value={inputs[i] ?? ""}
                    onChange={e => {
                      const val = e.target.value
                      setInputs(prev => { const next = [...prev]; next[i] = val; return next })
                    }}
                    onKeyDown={e => { if (e.key === "Enter" && i === blankCount - 1) check() }}
                    className="inline-block bg-[#2a2b3e] border-2 border-indigo-400 text-indigo-200 font-mono text-sm px-1.5 py-0.5 mx-0.5 focus:outline-none focus:border-indigo-300 focus:bg-[#32345a] rounded transition-colors align-baseline"
                    style={{ width: `${Math.max(getChWidth(inputs[i] ?? "") + 2, 7)}ch`, minWidth: "7ch" }}
                  />
                ) : (
                  <span className={cn(
                    "inline-block border-2 px-1.5 py-0.5 mx-0.5 font-mono text-sm rounded align-baseline",
                    result === "correct"
                      ? "border-emerald-400 text-emerald-300 bg-emerald-900/30"
                      : "border-red-400 text-red-300 bg-red-900/30"
                  )}>
                    {inputs[i] || "　"}
                  </span>
                )
              )}
            </Fragment>
          ))}
        </div>
      )}

      {/* 전체 코드 작성 (template=null) */}
      {result === "idle" && isFullCode && (
        <div className="flex flex-col gap-2">
          {/* 하나의 코드 에디터 창 — context(읽기전용) + 입력 */}
          <div className="rounded-xl overflow-hidden border border-gray-700">
            {/* 타이틀바 */}
            <div className="bg-[#1e1e2e] px-3 py-1.5 flex items-center gap-1.5 border-b border-gray-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="text-[10px] text-gray-500 ml-1 font-mono">{language === "python" ? "solution.py" : "solution.cpp"}</span>
            </div>
            {/* context — 읽기 전용 */}
            {((isEn ? (content as any).en?.context : undefined) || (content as any).context) && (
              <div className="bg-[#1a1b2e] px-4 pt-3 pb-1 font-mono text-sm text-[#6b7280] leading-7 whitespace-pre-wrap border-b border-gray-700/50">
                {renderTemplatePart(
                  (isEn ? (content as any).en?.context : undefined) || (content as any).context,
                  language
                )}
              </div>
            )}
            {/* 입력 */}
            <textarea
              ref={firstInputRef as React.RefObject<HTMLTextAreaElement>}
              value={inputs[0]}
              onChange={e => setInputs([e.target.value])}
              placeholder={t("// 여기에 코드를 작성하세요...", "// Write your code here...")}
              rows={3}
              className="w-full bg-[#1a1b2e] text-[#a9b1d6] px-4 py-3 font-mono text-sm focus:outline-none resize-none placeholder:text-gray-600"
              spellCheck={false}
            />
          </div>
          <button
            onClick={check}
            disabled={!inputs[0].trim() || isRunning}
            className="self-end px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm disabled:opacity-40 transition-colors"
          >
            {isRunning
              ? <span className="flex items-center gap-1.5">{t("실행 중", "Running")}<span className="animate-pulse">...</span></span>
              : t("확인", "Check")}
          </button>
        </div>
      )}

      {/* 인라인 빈칸용 확인 버튼 */}
      {result === "idle" && !isFullCode && (
        <button
          onClick={check}
          disabled={inputs.some((v, i) => i < blankCount && !v.trim())}
          className="self-end px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm disabled:opacity-40 transition-colors"
        >
          {t("확인", "Check")}
        </button>
      )}

      {result === "correct" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-emerald-700 font-bold text-sm">✅ {t("정답!", "Correct!")}</p>
          {content.expect && (
            <pre className="mt-1 font-mono text-xs text-emerald-800 whitespace-pre-wrap">{content.expect}</pre>
          )}
        </div>
      )}

      {result === "wrong" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex flex-col gap-1.5">
          <p className="text-red-600 font-bold text-sm">❌ {t("오답!", "Wrong!")}</p>
          {actualOutput !== null && (
            <div className="mt-0.5">
              <p className="text-xs text-red-500 font-semibold mb-0.5">{t("내 코드 출력:", "Your output:")}</p>
              <pre className="font-mono text-xs text-red-700 bg-red-100 rounded px-2 py-1.5 whitespace-pre-wrap">
                {actualOutput || t("(출력 없음)", "(no output)")}
              </pre>
              {content.expect && !actualOutput.startsWith("컴파일 에러") && !actualOutput.startsWith("오류") && (
                <p className="text-xs text-red-400 mt-1">
                  {t("예상 출력:", "Expected:")} <code className="font-mono bg-red-100 px-1 rounded">{String(content.expect)}</code>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hint (guide + hint 통합 — 버튼 뒤에 숨김) */}
      {(guide || hint) && result === "idle" && (
        <div>
          <button onClick={() => setShowHint(s => !s)} className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-700">
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? t("힌트 숨기기", "Hide hint") : t("힌트 보기", "Show hint")}
          </button>
          {showHint && (
            <div className="mt-1 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 space-y-2">
              {guide && <p>{guide}</p>}
              {hint && guide && <hr className="border-amber-200" />}
              {hint && <p>{hint}</p>}
              {/* 2단계: 수업 내용 참고 */}
              {lessonExplains && lessonExplains.length > 0 && (
                <>
                  <hr className="border-amber-200" />
                  <p className="font-bold text-amber-700">{t("📖 수업 내용:", "📖 From the lesson:")}</p>
                  {lessonExplains.map((lines, i) => (
                    <div key={i} className="text-amber-800 leading-relaxed">
                      {lines.map((line, j) => <p key={j}>{line}</p>)}
                    </div>
                  ))}
                </>
              )}
              {lessonLink && (
                <a href={lessonLink} className="text-amber-600 font-bold hover:underline block">
                  {t("전체 수업 보기 →", "View full lesson →")}
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Explain with Predict (prediction quiz)
// ─────────────────────────────────────────────────────────────
function PredictStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
  savedAnswer,
  onSaveAnswer,
}: {
  content: ExplainContent & { predict: NonNullable<ExplainContent["predict"]> }
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
  savedAnswer?: number | null
  onSaveAnswer?: (data: SavedAnswerData) => void
}) {
  const { t, lang } = useLanguage()
  const isEn = lang === "en"
  const [selected, setSelected] = useState<number | null>(savedAnswer ?? null)
  const [showCode, setShowCode] = useState(false)
  const answered = selected !== null
  const isRight = selected === content.predict.answer

  // EN overrides (with auto-translate fallback for common Korean strings)
  const lines = (isEn && content.en?.lines) ? content.en.lines : content.lines
  const predictQuestion = isEn
    ? (content.en?.predict?.question ?? autoTranslateQuestion(content.predict.question))
    : content.predict.question
  const predictOptions = isEn
    ? (content.en?.predict?.options ?? content.predict.options.map(autoTranslateOption))
    : content.predict.options
  const predictFeedback = (isEn && content.en?.predict?.feedback) ? content.en.predict.feedback : content.predict.feedback

  const select = (i: number) => {
    if (answered) return
    setSelected(i)
    onSaveAnswer?.(i)
    const correct = i === content.predict.answer
    if (correct) onCorrect()
    else onWrong()
  }

  const LABELS = ["①", "②", "③", "④"]

  return (
    <div className="flex flex-col gap-3">
      {/* Explanation lines */}
      {lines.length > 0 && (
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
          {lines.map((line, i) => <p key={i} className="text-sm text-blue-800">{line}</p>)}
        </div>
      )}

      {/* Code */}
      {content.code && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm overflow-x-auto leading-6 whitespace-pre-wrap">
          {language === "cpp"
            ? highlightCpp(content.code, true)
            : highlightPython(content.code, true)}
        </div>
      )}

      {/* Prediction question */}
      <p className="font-semibold text-gray-800">
        {predictQuestion ?? t("결과가 뭘까?", "What will the output be?")}
      </p>

      <div className="flex flex-col gap-2">
        {predictOptions.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === content.predict.answer
          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={answered}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-left transition-all flex items-center gap-3 text-sm",
                !answered && "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer",
                answered && isCorrect && "border-emerald-400 bg-emerald-50",
                answered && isSelected && !isCorrect && "border-red-400 bg-red-50",
                answered && !isSelected && !isCorrect && "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50",
              )}
            >
              <span className={cn(
                "shrink-0 w-5 text-center",
                !answered ? "text-gray-300" : isCorrect ? "text-emerald-500" : isSelected ? "text-red-400" : "text-gray-300"
              )}>
                {LABELS[i]}
              </span>
              <span className={cn(
                "whitespace-pre-wrap font-mono",
                isCorrect && answered ? "text-emerald-700 font-semibold" :
                isSelected && answered ? "text-red-700 font-normal" : "text-gray-800 font-normal"
              )}>
                {opt}
              </span>
              {answered && isCorrect && <Check className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={cn(
          "rounded-2xl border px-4 py-3 text-sm",
          isRight ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        )}>
          <p className={cn("font-bold mb-1", isRight ? "text-emerald-700" : "text-red-600")}>
            {isRight ? t("✅ 맞았어요!", "✅ Correct!") : t("❌ 틀렸어요!", "❌ Wrong!")}
          </p>
          {predictFeedback && (
            <p className="text-gray-600">{predictFeedback}</p>
          )}
          {content.result && (
            <p className="mt-1 text-xs text-gray-500">
              {t("실제 결과:", "Actual output:")} <code className="font-mono bg-white px-1 rounded">{content.result}</code>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main ReviewStepRenderer
// ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SavedAnswerData = any  // number | { inputs: string[]; result: "correct"|"wrong" } | null

export interface ReviewStepRendererProps {
  step: StepContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
  stepKey?: string
  savedAnswer?: SavedAnswerData
  onSaveAnswer?: (data: SavedAnswerData) => void
  lessonExplains?: string[][]  // 근처 explain 내용 (수업 참고용)
  lessonLink?: string          // /learn/xxx 링크
}

export function ReviewStepRenderer({ step, onCorrect, onWrong, language = "cpp", stepKey, savedAnswer, onSaveAnswer, lessonExplains, lessonLink }: ReviewStepRendererProps) {
  switch (step.type) {
    case "quiz":
      return <McqStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} savedAnswer={savedAnswer} onSaveAnswer={onSaveAnswer} />

    case "errorQuiz":
      return <McqStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} savedAnswer={savedAnswer} onSaveAnswer={onSaveAnswer} />

    case "practice":
      return <PracticeStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} storageKey={stepKey} savedAnswer={savedAnswer} onSaveAnswer={onSaveAnswer} lessonExplains={lessonExplains} lessonLink={lessonLink} />

    case "interleaving":
      return <PracticeStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} storageKey={stepKey} savedAnswer={savedAnswer} onSaveAnswer={onSaveAnswer} lessonExplains={lessonExplains} lessonLink={lessonLink} />

    case "explain":
      if (step.content.predict) {
        return (
          <PredictStep
            content={step.content as ExplainContent & { predict: NonNullable<ExplainContent["predict"]> }}
            onCorrect={onCorrect}
            onWrong={onWrong}
            language={language}
            savedAnswer={savedAnswer}
            onSaveAnswer={onSaveAnswer}
          />
        )
      }
      return null

    default:
      return null
  }
}
