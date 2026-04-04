/**
 * 퀴즈 정답 실행 검증 스크립트
 * Python 코드를 실제로 실행하여 correctAnswer가 실제 출력과 일치하는지 확인
 * 실행: npm run validate-answers
 *
 * 검사 대상: "출력 결과는?" 유형 문제 중 실행 가능한 것
 * 스킵:  input() / open() / 무한루프 / subprocess 등
 */

import { execSync } from "child_process"
import { writeFileSync, unlinkSync } from "fs"
import { join } from "path"
import { pythonQuestions } from "../data/questions/python-questions"

interface AnswerIssue {
  id: number
  lessonId: number
  expected: string
  actual: string
  reason: string
}

// 실행하면 안 되는 패턴
const SKIP_PATTERNS: [RegExp, string][] = [
  [/\binput\s*\(/,            "input() — stdin 필요"],
  [/\bopen\s*\(/,             "open() — 파일 I/O"],
  [/import\s+subprocess/,     "subprocess"],
  [/import\s+sys\b/,          "sys 모듈"],
  [/while\s+True\b/i,         "무한 루프 (while True)"],
  [/\.connect\s*\(/,          "네트워크 연결"],
  [/time\.sleep\s*\(/,        "time.sleep"],
]

// options에 쓰인 literal \n → 실제 개행으로 변환
function normalizeOption(s: string): string {
  return s.replace(/\\n/g, "\n").trim()
}

function runPython(code: string): { stdout: string; error: boolean } {
  const tmpFile = join("/tmp", `quiz_validate_${Date.now()}_${Math.random().toString(36).slice(2)}.py`)
  try {
    writeFileSync(tmpFile, code, "utf8")
    const stdout = execSync(`/usr/bin/python3 "${tmpFile}"`, {
      timeout: 5000,
      encoding: "utf8",
    })
    return { stdout: stdout.trim(), error: false }
  } catch (e: any) {
    // stderr나 stdout 둘 다 체크
    const out = (e.stdout ?? "").trim()
    return { stdout: out, error: true }
  } finally {
    try { unlinkSync(tmpFile) } catch {}
  }
}

function shouldSkip(q: (typeof pythonQuestions)[0]): string | null {
  const code = q.code ?? ""
  const question = q.question ?? ""

  // 출력 결과 유형만 테스트
  if (!question.includes("출력 결과")) return "출력 결과 문제 아님"

  // 코드 없음
  if (!code.trim()) return "code 필드 없음"

  for (const [pattern, reason] of SKIP_PATTERNS) {
    if (pattern.test(code)) return reason
  }

  return null
}

function validateAnswers(): void {
  const issues: AnswerIssue[] = []
  let tested = 0
  let skipped = 0

  console.log("\n🏃 Python 정답 실행 검증 시작...\n")
  process.stdout.write("진행: ")

  for (const q of pythonQuestions) {
    const skipReason = shouldSkip(q)
    if (skipReason) {
      skipped++
      continue
    }

    const expected = q.options[q.correctAnswer]
    // "오류"로 시작하는 옵션만 예외 발생 예상으로 간주
    // "IndexError", "TypeError" 등의 이름은 코드가 직접 print하는 정상 stdout일 수 있음
    const isErrorAnswer =
      expected === "오류" ||
      expected.startsWith("오류")

    const { stdout, error } = runPython(q.code ?? "")
    tested++
    process.stdout.write(".")

    if (isErrorAnswer) {
      if (!error) {
        issues.push({
          id: q.id,
          lessonId: q.lessonId as number,
          expected: `(오류 발생 예상) "${expected}"`,
          actual: stdout || "(출력 없음, 정상 종료)",
          reason: "정답이 오류인데 코드가 정상 실행됨",
        })
      }
    } else {
      const normalizedExpected = normalizeOption(expected)
      if (normalizedExpected !== stdout) {
        issues.push({
          id: q.id,
          lessonId: q.lessonId as number,
          expected: normalizedExpected,
          actual: stdout,
          reason: "출력 불일치",
        })
      }
    }
  }

  console.log(`\n\n테스트: ${tested}개 | 스킵: ${skipped}개\n`)
  console.log("─".repeat(50))

  if (issues.length === 0) {
    console.log(`\n✅ 모든 실행 테스트 통과! (${tested}개 문제)\n`)
    process.exit(0)
  } else {
    console.log(`\n❌ ${issues.length}개 정답 오류 발견:\n`)
    for (const issue of issues) {
      console.log(`  Q${issue.id} [레슨 ${issue.lessonId}]`)
      console.log(`    예상: ${JSON.stringify(issue.expected)}`)
      console.log(`    실제: ${JSON.stringify(issue.actual)}`)
      console.log(`    이유: ${issue.reason}\n`)
    }
    process.exit(1)
  }
}

validateAnswers()
