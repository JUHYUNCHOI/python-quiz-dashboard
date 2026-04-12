/**
 * 복습 레슨 파일에서 answer 버그를 감지하는 검증 스크립트
 *
 * 버그 패턴:
 * - 빈칸 채우기 문제 (template에 ___ 이 있음)에서
 * - answer 필드가 빈칸 텍스트가 아니라 완성된 전체 코드인 경우
 * - isAnswerCorrect()는 student_input === answer 로 비교하므로, 학생이 올바른 빈칸 텍스트를
 *   입력해도 전체 코드와 매칭되지 않아 오답 처리됨
 */

import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LESSONS_DIR = join(__dirname, '../app/review/[lessonId]/data/lessons')

function normalize(s) {
  return s.replace(/\s+/g, '').toLowerCase()
}

// TypeScript 파일에서 JSON 비슷한 구조를 텍스트로 파싱하는 간단한 방법:
// 정규식으로 practice/interleaving 블록을 찾고 분석
function analyzeFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const bugs = []

  // 각 줄 파싱으로 template/answer/blanksAnswer 블록 추적
  const lines = content.split('\n')
  let inPractice = false
  let braceDepth = 0
  let blockStart = -1
  let blockLines = []

  // 단순한 방법: 각 practice/interleaving type 블록을 찾아서 분석
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (/type:\s*["'](practice|interleaving)["']/.test(line)) {
      inPractice = true
      braceDepth = 0
      blockStart = i
      blockLines = []
    }

    if (inPractice) {
      blockLines.push(line)
      // 중괄호 depth 추적 (블록 끝 감지)
      for (const ch of line) {
        if (ch === '{') braceDepth++
        if (ch === '}') {
          braceDepth--
          if (braceDepth < 0) {
            // 블록 종료
            analyzeBlock(blockLines, blockStart, bugs)
            inPractice = false
            braceDepth = 0
            blockLines = []
            break
          }
        }
      }
    }
  }

  return bugs
}

function analyzeBlock(blockLines, startLine, bugs) {
  const blockText = blockLines.join('\n')

  // template 추출
  const templateMatch = blockText.match(/template:\s*(null|"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/)
  if (!templateMatch) return

  const templateIsNull = templateMatch[1] === 'null'
  if (templateIsNull) return // template:null은 전체 코드 작성이므로 제외

  const templateStr = templateMatch[2] || templateMatch[3] || ''
  const blankCount = (templateStr.match(/___/g) || []).length
  if (blankCount !== 1) return // 빈칸이 1개가 아니면 제외 (0개 or 2+개)

  // answer 추출
  const answerMatch = blockText.match(/\banswer:\s*"((?:[^"\\]|\\.)*)"/)
  if (!answerMatch) return
  const answerStr = answerMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\')

  // blanksAnswer 확인 (있으면 그 값이 정답)
  const blanksAnswerMatch = blockText.match(/blanksAnswer:\s*\[([^\]]*)\]/)
  let expectedAnswer = null

  if (blanksAnswerMatch) {
    const items = blanksAnswerMatch[1].match(/"((?:[^"\\]|\\.)*)"/g)
    if (items && items.length === 1) {
      // 단일 blanksAnswer → 이게 실제 정답이어야 함
      expectedAnswer = items[0].replace(/^"|"$/g, '').replace(/\\"/g, '"')
    }
    // 복수 blanksAnswer는 정상 (multi-blank)
    if (items && items.length > 1) return
  }

  // answer가 빈칸 텍스트인지 판별
  // - answer가 \n을 포함하면 (멀티라인) 전체 코드일 가능성 높음
  // - answer가 template의 ___ 를 채운 결과를 포함하면 전체 코드
  const answerHasNewline = answerStr.includes('\n')

  // template에 ___ 를 expectedAnswer로 채운 결과와 answer가 같으면 버그
  let isBug = false
  let bugReason = ''

  if (expectedAnswer !== null) {
    // blanksAnswer[0]이 있음 → answer가 그것과 다르면 버그
    const expectedNorm = normalize(expectedAnswer)
    const answerNorm = normalize(answerStr)
    if (expectedNorm !== answerNorm) {
      // answer가 blanksAnswer[0]와 다름 → 전체 코드인지 확인
      if (answerHasNewline || answerStr.length > expectedAnswer.length + 20) {
        isBug = true
        bugReason = `blanksAnswer[0]="${expectedAnswer}" 이지만 answer가 전체 코드`
      }
    }
  } else {
    // blanksAnswer 없음 → answer가 빈칸 텍스트여야 함
    // template의 ___ 를 answer로 채운 결과와 answer 자체를 비교
    const filledTemplate = templateStr.replace('___', answerStr)
    if (answerHasNewline && normalize(filledTemplate) !== normalize(answerStr)) {
      // answer가 멀티라인이고 template 채운 결과와도 다름 → 버그 가능
      isBug = true
      bugReason = `blanksAnswer 없음, answer가 멀티라인 (전체 코드 의심)`
    }
  }

  if (isBug) {
    // task 추출
    const taskMatch = blockText.match(/task:\s*"((?:[^"\\]|\\.)*)"/)
    const task = taskMatch ? taskMatch[1].replace(/\\n/g, ' ') : '(알 수 없음)'

    bugs.push({
      line: startLine + 1,
      task,
      answer: answerStr.substring(0, 80) + (answerStr.length > 80 ? '...' : ''),
      expectedAnswer,
      reason: bugReason,
    })
  }
}

// 모든 레슨 파일 검사
const files = readdirSync(LESSONS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')

let totalBugs = 0
const allBugs = []

for (const file of files.sort()) {
  const filePath = join(LESSONS_DIR, file)
  const bugs = analyzeFile(filePath)
  if (bugs.length > 0) {
    totalBugs += bugs.length
    allBugs.push({ file, bugs })
  }
}

if (allBugs.length === 0) {
  console.log('✅ 버그 없음! 모든 레슨 파일의 answer 필드가 올바릅니다.')
} else {
  console.log(`❌ ${totalBugs}개 버그 발견:\n`)
  for (const { file, bugs } of allBugs) {
    console.log(`📄 ${file} (${bugs.length}개):`)
    for (const bug of bugs) {
      console.log(`  Line ~${bug.line}: "${bug.task}"`)
      console.log(`    → ${bug.reason}`)
      if (bug.expectedAnswer) {
        console.log(`    → 올바른 answer: "${bug.expectedAnswer}"`)
      }
      console.log(`    → 현재 answer: "${bug.answer}"`)
    }
    console.log()
  }
}
