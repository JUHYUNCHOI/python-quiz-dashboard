"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, RotateCcw, ChevronDown, Check, X, Lightbulb, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticeProblem } from "@/data/practice/types"
import { localizeProblem } from "@/data/practice/types"
import { useLanguage } from "@/contexts/language-context"

const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

// ── Inline-style syntax highlighters (no external CSS needed) ──

const CPP_KEYWORDS = /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|string|vector|map|set|pair|cout|cin|endl|std)\b/g
const CPP_PREPROCESSOR = /^(#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|pragma|line)\b.*)/gm
const CPP_STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const CPP_COMMENT_LINE = /\/\/.*/g
const CPP_COMMENT_BLOCK = /\/\*[\s\S]*?\*\//g
const CPP_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[uUlLfF]?\b/g

const PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|print|input|range|len|int|float|str|bool|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round|open|append|extend|insert|remove|pop|clear|copy|update|get|keys|values|items|join|split|strip|replace|format|upper|lower|self)\b/g
const PY_STRING = /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const PY_COMMENT = /#.*/g
const PY_DECORATOR = /@\w+/g
const PY_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function buildHighlightHtml(code: string, patterns: Array<{ re: RegExp; cls: string }>): string {
  type Match = { start: number; end: number; text: string; cls: string }
  const matches: Match[] = []
  for (const { re, cls } of patterns) {
    const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")
    r.lastIndex = 0
    let m
    while ((m = r.exec(code)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
    }
  }
  matches.sort((a, b) => a.start - b.start)
  const filtered: Match[] = []
  let cursor = 0
  for (const m of matches) {
    if (m.start >= cursor) { filtered.push(m); cursor = m.end }
  }
  const colorMap: Record<string, string> = {
    keyword: "#ff7b72", comment: "#b0bec5", string: "#a5d6ff",
    preprocessor: "#ff7b72", number: "#ffa657", decorator: "#d2a8ff",
  }
  cursor = 0
  let html = ""
  for (const m of filtered) {
    if (m.start > cursor) html += escapeHtml(code.slice(cursor, m.start))
    const color = colorMap[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${color};font-style:italic` : `color:${color}`
    html += `<span style="${style}">${escapeHtml(m.text)}</span>`
    cursor = m.end
  }
  if (cursor < code.length) html += escapeHtml(code.slice(cursor))
  return html
}

function highlightCode(code: string, language: "cpp" | "python" = "cpp"): string {
  if (language === "python") {
    return buildHighlightHtml(code, [
      { re: PY_STRING, cls: "string" },
      { re: PY_COMMENT, cls: "comment" },
      { re: PY_DECORATOR, cls: "decorator" },
      { re: PY_KEYWORDS, cls: "keyword" },
      { re: PY_NUMBER, cls: "number" },
    ])
  }
  return buildHighlightHtml(code, [
    { re: CPP_COMMENT_BLOCK, cls: "comment" },
    { re: CPP_COMMENT_LINE, cls: "comment" },
    { re: CPP_STRING, cls: "string" },
    { re: CPP_PREPROCESSOR, cls: "preprocessor" },
    { re: CPP_KEYWORDS, cls: "keyword" },
    { re: CPP_NUMBER, cls: "number" },
  ])
}

const PISTON_URL = process.env.NEXT_PUBLIC_PISTON_URL || ""
const PISTON_KEY = process.env.NEXT_PUBLIC_PISTON_KEY || ""
const PISTON_LANG_VERSION: Record<string, { language: string; version: string }> = {
  cpp: { language: "c++", version: "10.2.0" },
  python: { language: "python", version: "3.12.0" },
}

type NormalizedResult = {
  ok: boolean
  output: string
  compileError?: string
  runtimeError?: string
  networkError?: boolean
}

type TestResult = { passed: boolean; output: string; expected: string }

interface PracticeRunnerProps {
  problem: PracticeProblem
  onSuccess?: (starred: boolean) => void
}

function localizeInitialCode(code: string, isEn: boolean): string {
  if (!isEn) return code
  return code
    // ── Generic placeholders ──────────────────────────────────────────
    .replace(/\/\/ 여기에 코드를 작성하세요/g, "// Write your code here")
    .replace(/# 여기에 코드를 작성하세요/g, "# Write your code here")
    .replace(/\/\/ 여기에 코드 작성/g, "// Write your code here")
    .replace(/# 여기에 코드 작성/g, "# Write your code here")
    .replace(/\/\/ 여기에 출력 코드를 작성하세요/g, "// Write output code here")
    .replace(/\/\* 여기를 채우세요 \*\//g, "/* fill in */")
    .replace(/\/\* 조건을 채우세요 \*\//g, "/* fill in condition */")
    .replace(/\/\* 조건 \*\//g, "/* condition */")
    // ── Loops ────────────────────────────────────────────────────────
    .replace(/\/\/ 0이면 종료/g, "// if 0, stop")
    .replace(/\/\/ 아니면 sum에 더하기/g, "// otherwise add to sum")
    .replace(/\/\/ 나머지 출력/g, "// print the rest")
    .replace(/\/\/ while과 cin을 함께 사용해보세요/g, "// try using while with cin")
    // ── Arrays ───────────────────────────────────────────────────────
    .replace(/\/\/ push_back 사용/g, "// use push_back")
    .replace(/\/\/ pop_back 사용 \(비어있지 않을 때만\)/g, "// use pop_back (only if not empty)")
    // ── Conditionals ─────────────────────────────────────────────────
    .replace(/\/\/ 각 case를 채우세요/g, "// fill in each case")
    .replace(/\/\/ sort\(\) 사용 금지: if-else와 swap으로만 해결하세요/g, "// no sort(): use only if-else and swap")
    .replace(/\/\/ 삼항 연산자를 사용하세요: 조건 \? 값1 : 값2/g, "// use ternary: condition ? value1 : value2")
    .replace(/\/\/ 삼항 연산자만 사용해서 result에 결과를 저장하세요/g, "// store result using only the ternary operator")
    .replace(/\/\/ 나머지를 채우세요/g, "// fill in the rest")
    .replace(/\/\/ 나머지 계절을 채우세요/g, "// fill in remaining seasons")
    .replace(/\/\/ 각 연산자 case를 작성하세요/g, "// write each operator case")
    // ── Functions ────────────────────────────────────────────────────
    .replace(/\/\/ myMax, myMin 함수를 여기에 작성하세요/g, "// write myMax and myMin functions here")
    .replace(/\/\/ myMax, myMin을 호출해 출력하세요/g, "// call myMax and myMin to print")
    .replace(/\/\/ myAbs 함수를 여기에 작성하세요/g, "// write myAbs function here")
    .replace(/\/\/ myAbs를 호출해 sum에 더하세요/g, "// call myAbs and add to sum")
    .replace(/\/\/ isEven 함수를 여기에 작성하세요/g, "// write isEven function here")
    .replace(/\/\/ isEven을 호출해 "even" 또는 "odd"를 출력하세요/g, '// call isEven to print "even" or "odd"')
    .replace(/\/\/ square 함수를 여기에 작성하세요/g, "// write square function here")
    .replace(/\/\/ square를 호출해 sum과 maxSq를 갱신하세요/g, "// call square to update sum and maxSq")
    .replace(/\/\/ isPrime 함수를 여기에 작성하세요/g, "// write isPrime function here")
    .replace(/\/\/ 1, 소수, 합성수를 구분해 출력하세요/g, "// classify and print: 1, prime, or composite")
    .replace(/\/\/ factorial 재귀 함수를 여기에 작성하세요/g, "// write factorial recursive function here")
    .replace(/\/\/ 오버로딩: area 함수를 두 가지 버전으로 작성하세요/g, "// overloading: write two versions of area function")
    .replace(/\/\/ 원: r \* r \* 3/g, "// circle: r * r * 3")
    .replace(/\/\/ 직사각형: w \* h/g, "// rectangle: w * h")
    .replace(/\/\/ fib 재귀 함수를 여기에 작성하세요/g, "// write fib recursive function here")
    .replace(/\/\/ gcd, lcm 함수를 여기에 작성하세요/g, "// write gcd and lcm functions here")
    .replace(/\/\/ countVowels, reverseStr 함수를 여기에 작성하세요/g, "// write countVowels and reverseStr functions here")
    .replace(/\/\/ sumTo \(재귀\), sumToIter \(반복문\) 함수를 여기에 작성하세요/g, "// write sumTo (recursive) and sumToIter (iterative) here")
    .replace(/\/\/ minOfThree 함수를 여기에 작성하세요/g, "// write minOfThree function here")
    .replace(/\/\/ printRepeat 함수를 여기에 작성하세요/g, "// write printRepeat function here")
    .replace(/\/\/ countMultiples 함수를 여기에 작성하세요/g, "// write countMultiples function here")
    .replace(/\/\/ power 재귀 함수를 여기에 작성하세요/g, "// write power recursive function here")
    .replace(/\/\/ 2부터 n까지 isPrime을 호출해 소수의 합을 구하세요/g, "// call isPrime for 2..n and sum the primes")
    // ── I/O ──────────────────────────────────────────────────────────
    .replace(/\/\/ cin으로 a, b를 입력받으세요/g, "// read a and b with cin")
    .replace(/\/\/ cin으로 a, b, c를 입력받으세요/g, "// read a, b, c with cin")
    .replace(/\/\/ cin으로 name, age를 입력받으세요/g, "// read name and age with cin")
    .replace(/\/\/ cin으로 w, h를 입력받으세요/g, "// read w and h with cin")
    .replace(/\/\/ cin으로 seconds를 입력받으세요/g, "// read seconds with cin")
    .replace(/\/\/ cin으로 n을 입력받은 뒤, getline으로 문장을 읽어보세요/g, "// read n with cin, then read a line with getline")
    .replace(/\/\/ cin으로 c를 입력받으세요/g, "// read c with cin")
    .replace(/\/\/ cin으로 price, paid를 입력받으세요/g, "// read price and paid with cin")
    .replace(/\/\/ cin으로 weight, height를 입력받으세요/g, "// read weight and height with cin")
    // ── Map / Set ────────────────────────────────────────────────────
    .replace(/\/\/ freq에 단어 카운트, order에 첫 등장 순서 기록/g, "// count word frequency in freq, record first-seen order in order")
    // ── Refs / Pointers ──────────────────────────────────────────────
    .replace(/\/\/ void swap\(int& a, int& b\) 함수를 여기에 작성하세요/g, "// write void swap(int& a, int& b) here")
    .replace(/\/\/ void doubleValue\(int& n\) 함수를 여기에 작성하세요/g, "// write void doubleValue(int& n) here")
    .replace(/\/\/ -1 반환/g, "// return -1")
    .replace(/\/\/ 아니면 \*p × 2 반환/g, "// otherwise return *p × 2")
    .replace(/\/\/ 1\. 최솟값을 구하세요/g, "// 1. find the minimum value")
    .replace(/\/\/ 2\. 포인터\(int\* p\)를 이용해 최솟값과 같은 원소를 0으로 바꾸세요/g, "// 2. use pointer (int* p) to zero out elements equal to min")
    .replace(/\/\/ 3\. 결과를 출력하세요/g, "// 3. print the result")
    .replace(/\/\/ void minmax\(vector<int>& v, int& mn, int& mx\) 함수를 여기에 작성하세요/g, "// write void minmax(vector<int>& v, int& mn, int& mx) here")
    .replace(/\/\/ 포인터로 arr을 순회하며 짝수만 sum에 더하세요/g, "// traverse arr with a pointer, add only even numbers to sum")
    .replace(/\/\/ \(int\* p = arr; p < arr \+ n; p\+\+\) 형태로 작성하세요/g, "// use form: (int* p = arr; p < arr + n; p++)")
    .replace(/\/\/ int countChar\(const string& s, char c\) 함수를 여기에 작성하세요/g, "// write int countChar(const string& s, char c) here")
    .replace(/\/\/ void addToAll\(vector<int>& v, int x\) 함수를 여기에 작성하세요/g, "// write void addToAll(vector<int>& v, int x) here")
    .replace(/\/\/ next\[\] 배열을 역순 연결로 초기화하세요/g, "// initialize next[] with reverse links")
    .replace(/\/\/ next\[n-1\] = -1 \(끝\)/g, "// next[n-1] = -1 (end)")
    .replace(/\/\/ next\[i\] = i\+1 \.\.\. 하지만 순회는 n-1부터 시작하니/g, "// next[i] = i+1 ... but traversal starts at n-1")
    .replace(/\/\/ 역순이 되려면: next\[i\] = i-1, 시작은 n-1, 끝은 0 \(next\[0\] = -1\)/g, "// to reverse: next[i] = i-1, start n-1, end 0 (next[0]=-1)")
    .replace(/\/\/ 인덱스 n-1 부터 next\[cur\] != -1 인 동안 순회해 출력하세요/g, "// traverse from index n-1 while next[cur] != -1, print each")
    .replace(/\/\/ int\* findFirst\(int\* arr, int n, int target\) 함수를 여기에 작성하세요/g, "// write int* findFirst(int* arr, int n, int target) here")
    .replace(/\/\/ 찾으면 해당 원소의 포인터 반환, 없으면 nullptr 반환/g, "// return pointer to element if found, nullptr otherwise")
    .replace(/\/\/ void removeDuplicates\(vector<int>& v\) 함수를 여기에 작성하세요/g, "// write void removeDuplicates(vector<int>& v) here")
    .replace(/\/\/ sort 후 unique \+ erase 패턴 또는 직접 구현/g, "// use sort + unique + erase, or implement manually")
    // ── Stack / Queue / Deque ─────────────────────────────────────────
    .replace(/\/\/ push_front 사용/g, "// use push_front")
    .replace(/\/\/ pop_front 사용, 비어있으면 -1/g, "// use pop_front, output -1 if empty")
    .replace(/\/\/ 덱 내용 출력/g, "// print deque contents")
    .replace(/\/\/ 최대힙: 중앙값 이하의 수들/g, "// max-heap: numbers ≤ median")
    .replace(/\/\/ 최소힙: 중앙값 초과의 수들/g, "// min-heap: numbers > median")
    // ── Strings ──────────────────────────────────────────────────────
    .replace(/\/\/ find\(\)로 위치를 찾고 replace\(\)로 교체하세요/g, "// use find() to locate, replace() to substitute")
    .replace(/\/\/ 모든 등장 위치를 바꿔야 합니다/g, "// replace all occurrences")
    .replace(/\/\/ result로 출력 결정/g, "// decide output based on result")
    // ── Structs ───────────────────────────────────────────────────────
    .replace(/\/\/ 거리 제곱을 반환하세요/g, "// return squared distance")
    .replace(/\/\/ 합을 반환하세요/g, "// return the sum")
    .replace(/\/\/ 곱을 반환하세요/g, "// return the product")
}

export function PracticeRunner({ problem: rawProblem, onSuccess }: PracticeRunnerProps) {
  const { t, lang: locale } = useLanguage()
  const isEn = locale === "en"
  const problem = localizeProblem(rawProblem, locale)
  const lang = problem.language ?? "cpp"
  const storageKey = `practice-code-${problem.id}`

  const [code, setCode] = useState(() => {
    const initial = localizeInitialCode(problem.initialCode ?? "", isEn)
    if (typeof window === "undefined") return initial
    try { return localStorage.getItem(storageKey) || initial } catch { return initial }
  })
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [allPassed, setAllPassed] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [failCount, setFailCount] = useState(0)
  const [scaffoldShown, setScaffoldShown] = useState(false)

  const runTests = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    setError("")
    setResults([])
    try {
      localStorage.setItem(storageKey, code)
    } catch {}

    const testCases = problem.testCases ?? []

    // Piston 호출: 네트워크 에러만 1회 재시도
    const callPiston = async (stdin: string): Promise<NormalizedResult> => {
      const langConf = PISTON_LANG_VERSION[lang] ?? PISTON_LANG_VERSION.cpp
      try {
        const res = await fetch(PISTON_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(PISTON_KEY ? { Authorization: `Bearer ${PISTON_KEY}` } : {}),
          },
          body: JSON.stringify({
            language: langConf.language,
            version: langConf.version,
            files: [{ name: lang === "python" ? "main.py" : "main.cpp", content: code }],
            stdin,
          }),
        })
        if (!res.ok) return { ok: false, output: "", networkError: true }
        const data = await res.json()
        if (data.compile && data.compile.code !== 0) {
          const stderr = (data.compile.stderr || data.compile.output || "").trim()
          return { ok: false, output: "", compileError: stderr }
        }
        const run = data.run || {}
        const stdout = (run.stdout || "").trim()
        const stderr = (run.stderr || "").trim()
        if (run.code !== 0 && stderr) {
          return { ok: false, output: stdout, runtimeError: stderr }
        }
        return { ok: true, output: stdout }
      } catch {
        return { ok: false, output: "", networkError: true }
      }
    }

    const runWithRetry = async (stdin: string): Promise<NormalizedResult> => {
      let result = await callPiston(stdin)
      if (result.networkError) {
        await new Promise(r => setTimeout(r, 400))
        result = await callPiston(stdin)
      }
      return result
    }

    // 모든 테스트 케이스를 병렬로 실행
    const responses = await Promise.all(
      testCases.map(tc => runWithRetry(tc.stdin))
    )

    let compileError = ""
    const newResults: TestResult[] = []

    for (let i = 0; i < testCases.length; i++) {
      const result = responses[i]
      if (result.networkError) {
        compileError = t("네트워크 오류. 잠시 후 다시 시도해주세요.", "Network error. Please try again.")
        break
      }
      if (result.compileError) {
        compileError = result.compileError || t("컴파일 오류", "Compile Error")
        break
      }
      if (result.runtimeError) {
        compileError = result.runtimeError || t("런타임 오류", "Runtime Error")
        break
      }
      const actual = result.output
      const expected = testCases[i].expectedOutput.trim()
      newResults.push({ passed: actual === expected, output: actual, expected })
    }

    if (compileError) {
      setError(compileError)
    } else {
      setResults(newResults)
      const passed = newResults.every(r => r.passed)
      setAllPassed(passed)
      if (passed) {
        const starred = hintsShown === 0 && !showSolution && !scaffoldShown
        onSuccess?.(starred)
      } else {
        setFailCount(c => c + 1)
      }
    }
    setIsLoading(false)
  }, [code, problem, isLoading, onSuccess, storageKey, hintsShown, showSolution, t])

  const showScaffold = () => {
    const scaffold = localizeInitialCode(problem.scaffoldCode ?? "", isEn)
    setCode(scaffold)
    setScaffoldShown(true)
    try { localStorage.setItem(storageKey, scaffold) } catch {}
  }

  const reset = () => {
    setCode(localizeInitialCode(problem.initialCode ?? "", isEn))
    setResults([])
    setError("")
    setAllPassed(false)
    setHintsShown(0)
    setShowSolution(false)
    setFailCount(0)
    setScaffoldShown(false)
    try { localStorage.removeItem(storageKey) } catch {}
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 코드 에디터 */}
      <div className="cpp-editor-dark relative rounded-xl overflow-hidden border border-white/10 bg-[#1e1e2e]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-white/10">
          <span className="text-xs text-white/40 font-mono">{lang === "python" ? "main.py" : "main.cpp"}</span>
          <button onClick={reset} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors">
            <RotateCcw className="w-3 h-3" /> {t("초기화", "Reset")}
          </button>
        </div>
        <SimpleEditor
          value={code}
          onValueChange={c => setCode(c)}
          highlight={c => highlightCode(c, lang)}
          padding={16}
          style={{ fontFamily: "monospace", fontSize: 14, minHeight: 260, color: "#cdd6f4", background: "transparent" }}
        />
      </div>

      {/* 실행 버튼 */}
      <button
        onClick={runTests}
        disabled={isLoading}
        className={cn(
          "flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
          isLoading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-400 text-white"
        )}
      >
        {isLoading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("테스트 실행 중...", "Running...")}</>
          : <><Play className="w-4 h-4" /> {t("테스트 실행", "Run Tests")}</>}
      </button>

      {/* 컴파일 오류 */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <p className="text-red-600 text-sm font-mono whitespace-pre-wrap">{error}</p>
        </div>
      )}

      {/* 테스트 결과 */}
      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <div key={i} className={cn(
              "rounded-xl border p-3 text-sm",
              r.passed ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            )}>
              <div className="flex items-center gap-2 mb-1">
                {r.passed
                  ? <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  : <X className="w-4 h-4 text-red-500 shrink-0" />}
                <span className={cn("font-medium", r.passed ? "text-emerald-700" : "text-red-700")}>
                  {t("테스트", "Test")} {i + 1}{(problem.testCases ?? [])[i]?.label ? ` — ${(problem.testCases ?? [])[i].label}` : ""}
                </span>
              </div>
              {!r.passed && (
                <div className="mt-2 flex flex-col gap-1.5 text-xs font-mono">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="text-gray-400 mb-1">{t("입력", "Input")}</div>
                    <div className="text-gray-600 whitespace-pre-wrap">{(problem.testCases ?? [])[i]?.stdin || t("(없음)", "(none)")}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-emerald-50 rounded-lg px-3 py-2">
                      <div className="text-gray-400 mb-1">{t("예상", "Expected")}</div>
                      <div className="text-emerald-600 font-semibold whitespace-pre-wrap">{r.expected}</div>
                    </div>
                    <div className="flex-1 bg-red-50 rounded-lg px-3 py-2">
                      <div className="text-gray-400 mb-1">{t("실제", "Actual")}</div>
                      <div className="text-red-600 whitespace-pre-wrap">{r.output || t("(출력 없음)", "(no output)")}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {allPassed && (
            <div className={cn(
              "rounded-xl border p-4 text-center",
              hintsShown === 0 && !showSolution
                ? "bg-amber-50 border-amber-200"
                : "bg-emerald-50 border-emerald-200"
            )}>
              {hintsShown === 0 && !showSolution ? (
                <>
                  <p className="text-amber-700 font-bold text-lg">{t("⭐ 힌트 없이 통과!", "⭐ Solved without hints!")}</p>
                  <p className="text-amber-500 text-xs mt-1">{t("스스로 풀었어요", "You figured it out!")}</p>
                </>
              ) : (
                <>
                  <p className="text-emerald-700 font-bold">{t("🎉 모든 테스트 통과!", "🎉 All tests passed!")}</p>
                  <p className="text-emerald-500 text-xs mt-1">{t("힌트 없이 다시 도전하면 ⭐를 획득할 수 있어요", "Try again without hints to earn ⭐")}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 코드 구조 힌트 — 2회 이상 실패 + scaffoldCode 있을 때 */}
      {!scaffoldShown && failCount >= 2 && problem.scaffoldCode && (
        <button
          onClick={showScaffold}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-600 transition-colors py-1"
        >
          <Lightbulb className="w-4 h-4" />
          {t("💡 코드 구조 보기 (힌트)", "💡 Show code structure (hint)")}
        </button>
      )}
      {scaffoldShown && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 px-3 py-2 text-xs text-blue-600">
          {t("코드 구조 힌트가 적용됐어요. 완료해도 ⭐는 획득할 수 없어요.", "Code structure hint applied. Solving now won't earn ⭐.")}
        </div>
      )}

      {/* 힌트 — problem은 이미 localize된 상태로 전달됨 */}
      {(problem.hints ?? []).length > 0 && (
        <div className="flex flex-col gap-2">
          {(problem.hints ?? []).slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm">
              <span className="font-medium text-amber-700">💡 {t("힌트", "Hint")} {i + 1}</span>
              <p className="mt-1 leading-relaxed text-amber-900">{hint.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((seg, j) => {
                if (seg.startsWith("**") && seg.endsWith("**"))
                  return <strong key={j} className="font-semibold text-amber-900">{seg.slice(2, -2)}</strong>
                if (seg.startsWith("`") && seg.endsWith("`"))
                  return <code key={j} className="bg-amber-100 text-amber-800 rounded px-1 font-mono text-[12px]">{seg.slice(1, -1)}</code>
                return <span key={j}>{seg}</span>
              })}</p>
            </div>
          ))}
          {hintsShown < (problem.hints ?? []).length && (
            <button
              onClick={() => setHintsShown(h => h + 1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              <Lightbulb className="w-4 h-4" />
              {t(`힌트 ${hintsShown + 1} 보기`, `Show hint ${hintsShown + 1}`)}
            </button>
          )}
        </div>
      )}

      {/* 정답 코드 */}
      <button
        onClick={() => setShowSolution(s => !s)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
      >
        <Eye className="w-4 h-4" />
        {showSolution ? t("정답 숨기기", "Hide solution") : t("정답 보기", "Show solution")}
        <ChevronDown className={cn("w-4 h-4 transition-transform", showSolution && "rotate-180")} />
      </button>
      {showSolution && (
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
          <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">{problem.solutionCode}</pre>
          <p className="mt-3 text-sm text-gray-500">{problem.solutionExplanation}</p>
        </div>
      )}
    </div>
  )
}
