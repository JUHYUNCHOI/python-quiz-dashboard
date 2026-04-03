/**
 * 퀴즈 문제 선수학습·lessonId 검증 스크립트
 * 실행: npm run validate-questions
 *
 * 검사 항목:
 *  1. Python — 코드에 사용된 개념이 해당 lessonId보다 늦게 도입되는지
 *  2. C++   — 코드에 사용된 문법이 해당 lessonId 커리큘럼 순서보다 앞서는지
 */

import { pythonQuestions } from "../data/questions/python-questions"
import { cppQuestions } from "../data/questions/cpp-questions"

// ─────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────
interface Issue {
  id: number
  lessonId: string | number
  rule: string
  detail: string
}

// ─────────────────────────────────────────────
// C++ 커리큘럼 순서 (lessonId → 순서 번호)
// ID 번호 ≠ 커리큘럼 순서이므로 반드시 이 표를 사용
// ─────────────────────────────────────────────
const CPP_ORDER: Record<string, number> = {
  "cpp-1":  1,
  "cpp-2":  2,
  "cpp-3":  3,
  "cpp-4":  4,
  "cpp-5":  5,
  "cpp-6":  6,
  "cpp-7":  7,
  "cpp-8":  8,
  "cpp-p1": 8.5,
  "cpp-9":  9,
  "cpp-21": 10,
  "cpp-10": 11,
  "cpp-11": 12,
  "cpp-12": 13,
  "cpp-13": 14,
  "cpp-14": 15,
  "cpp-22": 16,
  "cpp-p2": 16.5,
  "cpp-15": 17,
  "cpp-23": 18,
  "cpp-16": 19,
  "cpp-17": 20,
  "cpp-18": 21,
  "cpp-19": 22,
  "cpp-20": 23,
  "cpp-p3": 23.5,
  // 의도적 보관소 — 검사 제외
  "algo-preview": 999,
  "retired":      999,
  "deprecated":   999,
}

// ─────────────────────────────────────────────
// C++ 선수학습 규칙
// [패턴, 최소 커리큘럼 순서, 규칙 설명]
// ─────────────────────────────────────────────
type CppRule = [RegExp, number, string]

const CPP_RULES: CppRule[] = [
  // 참조(&) — cpp-12 (순서 13)
  [/\bint\s*&|\bdouble\s*&|\bstring\s*&|\bchar\s*&|\bauto\s*&|\bconst\s+\w+\s*&/, 13,
    "참조(&) 문법 → cpp-12 이후에만 사용 가능"],

  // 이터레이터 .begin() / .end()
  // cpp-23(sort 레슨, 순서 18)에서 sort(v.begin(), v.end()) 형태로 먼저 도입됨
  // cpp-17(STL 탐색, 순서 20)에서 반복자 개념을 본격적으로 다룸
  // → 최소 기준: cpp-23 순서(18)
  [/\.begin\(\)|\.end\(\)|\.rbegin\(\)|\.rend\(\)/, 18,
    ".begin()/.end() → cpp-23(sort) 이후에만 사용 가능"],

  // sort() — cpp-23 (순서 18)
  [/\bsort\s*\(/, 18,
    "sort() → cpp-23 이후에만 사용 가능"],

  // lambda [] — cpp-23 (순서 18)
  [/\[\s*\]\s*\(|\[&\]\s*\(|\[=\]\s*\(/, 18,
    "lambda([]{}) → cpp-23 이후에만 사용 가능"],

  // vector<> — cpp-9 (순서 9)
  [/\bvector\s*</, 9,
    "vector<> → cpp-9 이후에만 사용 가능"],

  // pair<> / .first / .second — cpp-15 (순서 17)
  [/\bpair\s*<|\.first\b|\.second\b/, 17,
    "pair<>/.first/.second → cpp-15 이후에만 사용 가능"],

  // map<> / set<> / unordered_map — cpp-16 (순서 19)
  [/\bmap\s*<|\bset\s*<|\bunordered_map\s*<|\bunordered_set\s*</, 19,
    "map/set/unordered_map → cpp-16 이후에만 사용 가능"],

  // stack<> / queue<> / deque<> / priority_queue<> — cpp-18 (순서 21)
  [/\bstack\s*<|\bqueue\s*<|\bdeque\s*<|\bpriority_queue\s*</, 21,
    "stack/queue/deque/priority_queue → cpp-18 이후에만 사용 가능"],

  // greater<> / less<> (비교 함수 객체) — cpp-23 (순서 18)
  [/\bgreater\s*<|\bless\s*</, 18,
    "greater<>/less<> 비교 함수 → cpp-23 이후에만 사용 가능"],
]

// ─────────────────────────────────────────────
// Python 선수학습 규칙
// [패턴, 최소 lessonId 번호, 규칙 설명, 예외 조건(optional)]
// ─────────────────────────────────────────────
type PyRule = {
  pattern: RegExp
  minLesson: number
  description: string
  // 이 패턴이 코드에 있어도 위반으로 보지 않는 예외 패턴
  exception?: RegExp
  // 이 lessonId들은 규칙 적용을 건너뜀 (개요·프로젝트 레슨 예외)
  exceptionLessons?: number[]
}

const PYTHON_RULES: PyRule[] = [
  // def 키워드 — lesson 32
  {
    pattern: /\bdef\s+\w+\s*\(/,
    minLesson: 32,
    description: "def 키워드 → 레슨 32 이후에만 사용 가능",
  },

  // lambda — lesson 34
  {
    pattern: /\blambda\b/,
    minLesson: 34,
    description: "lambda → 레슨 34 이후에만 사용 가능",
  },

  // f-string — lesson 8
  {
    pattern: /f["']/,
    minLesson: 8,
    description: "f-string → 레슨 8 이후에만 사용 가능",
  },

  // 리스트 리터럴 [] 또는 list() — lesson 16
  // 단, 빈 슬라이스/인덱싱 [0], [i] 등은 제외하기 어려우므로 `= [` 패턴만 체크
  // 예외: lesson 15 (자료구조 개요) — 4가지 자료구조를 소개하는 레슨이므로
  //         리스트 리터럴 표시 자체는 필요함
  {
    pattern: /=\s*\[|\.append\(|\.pop\(|\.insert\(|\.remove\(|\blist\s*\(/,
    minLesson: 16,
    description: "리스트 리터럴/메서드 → 레슨 16 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // 딕셔너리 리터럴 또는 메서드 — lesson 20
  // 예외: lesson 15 (자료구조 개요) — 딕셔너리가 어떻게 생겼는지 보여주는 맥락
  {
    pattern: /=\s*\{[^}]*:[^}]*\}|\.keys\(\)|\.values\(\)|\.items\(\)/,
    minLesson: 20,
    description: "딕셔너리 리터럴/메서드 → 레슨 20 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // set() 생성자 — lesson 21
  // 집합 리터럴 {a, b}는 딕셔너리와 구별이 어려우므로 생성자 호출만 검사
  // 예외: lesson 15 (자료구조 개요), lesson 20 (딕셔너리 — keys를 set으로 비교하는 맥락 허용)
  {
    pattern: /\bset\s*\(/,
    minLesson: 21,
    description: "set() → 레슨 21 이후에만 사용 가능",
    exceptionLessons: [15, 20],
  },

  // map() / zip() / filter() — lesson 35
  {
    pattern: /\bmap\s*\(|\bzip\s*\(|\bfilter\s*\(/,
    minLesson: 35,
    description: "map()/zip()/filter() → 레슨 35 이후에만 사용 가능",
  },

  // sorted() — lesson 35
  {
    pattern: /\bsorted\s*\(/,
    minLesson: 35,
    description: "sorted() → 레슨 35 이후에만 사용 가능",
  },

  // import 문 — lesson 45
  // 예외:
  //   - from collections import deque     → lesson 24 (큐 레슨에서 먼저 도입)
  //   - import json / csv / os / pathlib  → lesson 38 (파일 I/O 레슨에서 함께 가르침)
  //   - import random / math / datetime   → 프로젝트 레슨(27-31, 39-40, 43-44, 47-52)에서 실용적으로 사용
  {
    pattern: /^\s*(import\s+\w+|from\s+\w+\s+import)/m,
    minLesson: 45,
    description: "import 문 → 레슨 45 이후에만 사용 가능",
    exception: /from\s+collections\s+import\s+deque|import\s+(json|csv|os|pathlib|random|math|datetime|re)/,
  },

  // 슬라이싱 스텝 [::-1] / [::2] — lesson 22
  {
    pattern: /\[.*:.*:.*\]/,
    minLesson: 22,
    description: "스텝 슬라이싱 [::n] → 레슨 22 이후에만 사용 가능",
  },

  // 튜플을 변수에 대입하거나 append로 삽입하는 패턴 — lesson 19
  // 주의: print(a, b) 같은 일반 함수 호출은 제외해야 하므로
  //   '= (x, y)' 또는 '.append((x, y))' 형태만 검사
  // 예외: lesson 15 (자료구조 개요) — 튜플이 어떻게 생겼는지 보여주는 맥락
  {
    pattern: /=\s*\(\s*\w+\s*,\s*\w+\s*\)|\.append\s*\(\s*\(\s*\w+\s*,/,
    minLesson: 19,
    description: "튜플 대입/append((a,b)) → 레슨 19 이후에만 사용 가능",
    exceptionLessons: [15],
  },
]

// ─────────────────────────────────────────────
// 검사 로직
// ─────────────────────────────────────────────
function checkCpp(): Issue[] {
  const issues: Issue[] = []

  for (const q of cppQuestions) {
    const lessonId = String(q.lessonId)
    const order = CPP_ORDER[lessonId]

    // 알 수 없는 lessonId 경고
    if (order === undefined) {
      issues.push({
        id: q.id,
        lessonId,
        rule: "알 수 없는 lessonId",
        detail: `"${lessonId}" 는 커리큘럼에 정의된 lessonId가 아닙니다`,
      })
      continue
    }

    // 의도적 보관소는 검사 건너뜀
    if (order === 999) continue

    const code = q.code ?? ""

    for (const [pattern, minOrder, description] of CPP_RULES) {
      if (pattern.test(code) && order < minOrder) {
        // sort() 예외: cpp-23 본인은 허용
        issues.push({
          id: q.id,
          lessonId,
          rule: description,
          detail: `커리큘럼 순서 ${order} (${lessonId}) < 필요 순서 ${minOrder}`,
        })
      }
    }
  }

  return issues
}

function checkPython(): Issue[] {
  const issues: Issue[] = []

  for (const q of pythonQuestions) {
    const lessonId = q.lessonId as number

    // 특수 lessonId는 건너뜀
    if (typeof lessonId !== "number") continue

    const code = q.code ?? ""

    for (const rule of PYTHON_RULES) {
      if (!rule.pattern.test(code)) continue

      // 예외 레슨 확인
      if (rule.exceptionLessons && rule.exceptionLessons.includes(lessonId)) continue

      // 예외 패턴 확인
      if (rule.exception && rule.exception.test(code)) continue

      if (lessonId < rule.minLesson) {
        issues.push({
          id: q.id,
          lessonId,
          rule: rule.description,
          detail: `lessonId ${lessonId} < 필요 레슨 ${rule.minLesson}`,
        })
      }
    }
  }

  return issues
}

// ─────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────
function main() {
  console.log("\n🔍 퀴즈 문제 선수학습 검증 시작...\n")

  const cppIssues = checkCpp()
  const pyIssues = checkPython()
  const total = cppIssues.length + pyIssues.length

  // ── C++ 결과 출력 ──
  if (cppIssues.length === 0) {
    console.log("✅ C++ 문제: 이상 없음")
  } else {
    console.log(`❌ C++ 문제: ${cppIssues.length}건 발견\n`)
    for (const issue of cppIssues) {
      console.log(`  Q${issue.id} [${issue.lessonId}]`)
      console.log(`    규칙: ${issue.rule}`)
      console.log(`    상세: ${issue.detail}\n`)
    }
  }

  // ── Python 결과 출력 ──
  if (pyIssues.length === 0) {
    console.log("✅ Python 문제: 이상 없음")
  } else {
    console.log(`\n❌ Python 문제: ${pyIssues.length}건 발견\n`)
    for (const issue of pyIssues) {
      console.log(`  Q${issue.id} [레슨 ${issue.lessonId}]`)
      console.log(`    규칙: ${issue.rule}`)
      console.log(`    상세: ${issue.detail}\n`)
    }
  }

  // ── 최종 결과 ──
  console.log("─".repeat(50))
  if (total === 0) {
    console.log("\n✅ 모든 퀴즈 문제가 선수학습 규칙을 준수합니다.\n")
    process.exit(0)
  } else {
    console.log(`\n❌ 총 ${total}건의 위반이 발견되었습니다. (C++ ${cppIssues.length}건 / Python ${pyIssues.length}건)\n`)
    process.exit(1)
  }
}

main()
