/**
 * 퀴즈 문제 선수학습·lessonId 검증 스크립트 (강화판)
 * 실행: npm run validate-questions
 *
 * 검사 항목:
 *  1. Python — code + codeComparison 필드의 선수학습 위반
 *  2. C++   — code + codeComparison 필드의 선수학습 위반
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
  "algo-preview": 999,
  "retired":      999,
  "deprecated":   999,
}

// ─────────────────────────────────────────────
// C++ 선수학습 규칙
// ─────────────────────────────────────────────
type CppRule = [RegExp, number, string]

const CPP_RULES: CppRule[] = [
  // 2D 배열 선언/접근 — cpp-21 (순서 10)
  [/\w+\s*\[\s*\w+\s*\]\s*\[\s*\w+\s*\]/, 10,
    "2D 배열 → cpp-21 이후에만 사용 가능"],

  // Range-for (for auto) — cpp-10 (순서 11)
  [/for\s*\(\s*auto\b/, 11,
    "for(auto) range-for → cpp-10 이후에만 사용 가능"],

  // 문자열 심화 메서드 — cpp-11 (순서 12)
  [/\.substr\s*\(|\.find\s*\(|\.replace\s*\(|string::npos/, 12,
    "substr/find/replace → cpp-11 이후에만 사용 가능"],

  // 참조(&) — cpp-12 (순서 13)
  [/\bint\s*&|\bdouble\s*&|\bstring\s*&|\bchar\s*&|\bauto\s*&|\bconst\s+\w+\s*&/, 13,
    "참조(&) 문법 → cpp-12 이후에만 사용 가능"],

  // 포인터 — cpp-13 (순서 14)
  [/\bint\s*\*|\bdouble\s*\*|\bchar\s*\*|\bvoid\s*\*|\bnullptr\b|\s->\s|\*\w+\s*=/, 14,
    "포인터(*/->/nullptr) → cpp-13 이후에만 사용 가능"],

  // struct — cpp-14 (순서 15)
  [/\bstruct\s+\w+|\bstruct\s*\{/, 15,
    "struct → cpp-14 이후에만 사용 가능"],

  // class — cpp-22 (순서 16)
  [/\bclass\s+\w+/, 16,
    "class → cpp-22 이후에만 사용 가능"],

  // vector<> — cpp-9 (순서 9)
  [/\bvector\s*</, 9,
    "vector<> → cpp-9 이후에만 사용 가능"],

  // pair<> / tuple<> / .first / .second — cpp-15 (순서 17)
  [/\bpair\s*<|\btuple\s*<|\bget\s*<|\.first\b|\.second\b/, 17,
    "pair/tuple/.first/.second → cpp-15 이후에만 사용 가능"],

  // .begin() / .end() — cpp-23 (순서 18)
  [/\.begin\(\)|\.end\(\)|\.rbegin\(\)|\.rend\(\)/, 18,
    ".begin()/.end() → cpp-23(sort) 이후에만 사용 가능"],

  // sort() — cpp-23 (순서 18)
  [/\bsort\s*\(/, 18,
    "sort() → cpp-23 이후에만 사용 가능"],

  // lambda [] — cpp-23 (순서 18)
  [/\[\s*\]\s*\(|\[&\]\s*\(|\[=\]\s*\(/, 18,
    "lambda([]{}) → cpp-23 이후에만 사용 가능"],

  // greater<> / less<> — cpp-23 (순서 18)
  [/\bgreater\s*<|\bless\s*</, 18,
    "greater<>/less<> 비교 함수 → cpp-23 이후에만 사용 가능"],

  // map<> / set<> / unordered_map — cpp-16 (순서 19)
  [/\bmap\s*<|\bset\s*<|\bunordered_map\s*<|\bunordered_set\s*</, 19,
    "map/set/unordered_map → cpp-16 이후에만 사용 가능"],

  // STL 알고리즘 함수 — cpp-17 (순서 20)
  [/\bcount_if\s*\(|\bfind_if\s*\(|\baccumulate\s*\(|\btransform\s*\(|\bfor_each\s*\(/, 20,
    "count_if/find_if/accumulate → cpp-17 이후에만 사용 가능"],

  // stack<> / queue<> / deque<> / priority_queue<> — cpp-18 (순서 21)
  [/\bstack\s*<|\bqueue\s*<|\bdeque\s*<|\bpriority_queue\s*</, 21,
    "stack/queue/deque/priority_queue → cpp-18 이후에만 사용 가능"],

  // 파일 I/O — cpp-19 (순서 22)
  [/\bifstream\b|\bofstream\b|\bfstream\b/, 22,
    "ifstream/ofstream → cpp-19 이후에만 사용 가능"],
]

// ─────────────────────────────────────────────
// Python 선수학습 규칙
// ─────────────────────────────────────────────
type PyRule = {
  pattern: RegExp
  minLesson: number
  description: string
  exception?: RegExp
  exceptionLessons?: number[]
}

const PYTHON_RULES: PyRule[] = [
  // bool() / int() / float() / str() 변환 함수 — lesson 9
  {
    pattern: /\bbool\s*\(|\bint\s*\(|\bfloat\s*\(|\bstr\s*\(/,
    minLesson: 9,
    description: "타입변환 함수 bool()/int()/float()/str() → 레슨 9 이후에만 사용 가능",
  },

  // input() — lesson 10
  {
    pattern: /\binput\s*\(/,
    minLesson: 10,
    description: "input() → 레슨 10 이후에만 사용 가능",
  },

  // and / or / not 논리 연산자 — lesson 12
  {
    pattern: /\band\b|\bor\b|\bnot\b/,
    minLesson: 12,
    description: "and/or/not → 레슨 12 이후에만 사용 가능",
  },

  // for 루프 — lesson 13
  {
    pattern: /\bfor\s+\w+\s+in\b/,
    minLesson: 13,
    description: "for 루프 → 레슨 13 이후에만 사용 가능",
  },

  // while — lesson 14
  {
    pattern: /\bwhile\b/,
    minLesson: 14,
    description: "while → 레슨 14 이후에만 사용 가능",
  },

  // 리스트 리터럴/메서드 — lesson 16
  {
    pattern: /=\s*\[|\.append\(|\.pop\(|\.insert\(|\.remove\(|\blist\s*\(|\.extend\(/,
    minLesson: 16,
    description: "리스트 리터럴/메서드 → 레슨 16 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // 리스트 컴프리헨션 — lesson 17
  {
    pattern: /\[\s*\S[^\]]*\bfor\b[^\]]*\bin\b/,
    minLesson: 17,
    description: "리스트 컴프리헨션 → 레슨 17 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // enumerate() — lesson 17
  {
    pattern: /\benumerate\s*\(/,
    minLesson: 17,
    description: "enumerate() → 레슨 17 이후에만 사용 가능",
  },

  // 튜플 대입 — lesson 19
  {
    pattern: /=\s*\(\s*\w+\s*,\s*\w+\s*\)|\.append\s*\(\s*\(\s*\w+\s*,/,
    minLesson: 19,
    description: "튜플 대입/append((a,b)) → 레슨 19 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // 딕셔너리 리터럴/메서드 — lesson 20
  {
    pattern: /=\s*\{[^}]*:[^}]*\}|\.keys\(\)|\.values\(\)|\.items\(\)/,
    minLesson: 20,
    description: "딕셔너리 리터럴/메서드 → 레슨 20 이후에만 사용 가능",
    exceptionLessons: [15],
  },

  // set() — lesson 21
  {
    pattern: /\bset\s*\(/,
    minLesson: 21,
    description: "set() → 레슨 21 이후에만 사용 가능",
    exceptionLessons: [15, 20],
  },

  // 스텝 슬라이싱 — lesson 22
  {
    pattern: /\[.*:.*:.*\]/,
    minLesson: 22,
    description: "스텝 슬라이싱 [::n] → 레슨 22 이후에만 사용 가능",
  },

  // deque / popleft — lesson 24
  {
    pattern: /\bdeque\s*\(|\.popleft\s*\(|\.appendleft\s*\(|\.rotate\s*\(/,
    minLesson: 24,
    description: "deque/popleft → 레슨 24 이후에만 사용 가능",
    exception: /from\s+collections\s+import\s+deque/,
  },

  // def 키워드 — lesson 32
  {
    pattern: /\bdef\s+\w+\s*\(/,
    minLesson: 32,
    description: "def 키워드 → 레슨 32 이후에만 사용 가능",
  },

  // *args in def — lesson 33
  {
    pattern: /\bdef\s+\w+\s*\([^)]*\*\w/,
    minLesson: 33,
    description: "*args → 레슨 33 이후에만 사용 가능",
  },

  // print(*var) / func(*var) 언패킹 호출 — lesson 33
  {
    pattern: /\bprint\s*\(\s*\*\w|\bfunc\s*\(\s*\*\w|\(\s*\*\w+\s*[,)]/,
    minLesson: 33,
    description: "함수 호출 시 *언패킹 → 레슨 33 이후에만 사용 가능",
  },

  // lambda — lesson 34
  {
    pattern: /\blambda\b/,
    minLesson: 34,
    description: "lambda → 레슨 34 이후에만 사용 가능",
  },

  // **kwargs in def — lesson 34
  {
    pattern: /\bdef\s+\w+\s*\([^)]*\*\*\w/,
    minLesson: 34,
    description: "**kwargs → 레슨 34 이후에만 사용 가능",
  },

  // **dict 스프레드 — lesson 34
  {
    pattern: /\{\s*\*\*\w|\*\*\w+\s*[,}]/,
    minLesson: 34,
    description: "**dict 스프레드 → 레슨 34 이후에만 사용 가능",
  },

  // global / nonlocal — lesson 34
  {
    pattern: /\bglobal\s+\w+|\bnonlocal\s+\w+/,
    minLesson: 34,
    description: "global/nonlocal → 레슨 34 이후에만 사용 가능",
  },

  // sorted() / map() / zip() / filter() — lesson 35
  {
    pattern: /\bsorted\s*\(|\bmap\s*\(|\bzip\s*\(|\bfilter\s*\(/,
    minLesson: 35,
    description: "sorted()/map()/zip()/filter() → 레슨 35 이후에만 사용 가능",
  },

  // try / except / raise — lesson 37
  {
    pattern: /\btry\s*:|\bexcept\b|\braise\b/,
    minLesson: 37,
    description: "try/except/raise → 레슨 37 이후에만 사용 가능",
  },

  // open() / with open() — lesson 38
  {
    pattern: /\bopen\s*\(/,
    minLesson: 38,
    description: "open() → 레슨 38 이후에만 사용 가능",
  },

  // import 문 — lesson 45
  {
    pattern: /^\s*(import\s+\w+|from\s+\w+\s+import)/m,
    minLesson: 45,
    description: "import 문 → 레슨 45 이후에만 사용 가능",
    exception: /from\s+collections\s+import\s+deque|import\s+(json|csv|os|pathlib|random|math|datetime|re)/,
  },

  // class 키워드 — lesson 41
  {
    pattern: /\bclass\s+\w+/,
    minLesson: 41,
    description: "class → 레슨 41 이후에만 사용 가능",
  },

  // __init__ / self. — lesson 41
  {
    pattern: /\bself\s*\.|\b__init__\b/,
    minLesson: 41,
    description: "__init__/self → 레슨 41 이후에만 사용 가능",
  },

  // isinstance() — lesson 41
  {
    pattern: /\bisinstance\s*\(/,
    minLesson: 41,
    description: "isinstance() → 레슨 41 이후에만 사용 가능",
  },

  // dunder 메서드 (__str__, __repr__, __add__ 등 __init__ 제외) — lesson 42
  {
    pattern: /\bdef\s+__(str|repr|add|sub|mul|truediv|floordiv|mod|pow|eq|ne|lt|le|gt|ge|len|iter|next|getitem|setitem|delitem|contains|hash|call|enter|exit|iadd|isub|imul|neg|pos|abs)__\s*\(/,
    minLesson: 42,
    description: "dunder 메서드(__str__/__repr__ 등) → 레슨 42 이후에만 사용 가능",
  },

  // super() — lesson 42
  {
    pattern: /\bsuper\s*\(\s*\)/,
    minLesson: 42,
    description: "super() → 레슨 42 이후에만 사용 가능",
  },

  // @staticmethod / @classmethod / @property — lesson 42
  {
    pattern: /@staticmethod|@classmethod|@property/,
    minLesson: 42,
    description: "@staticmethod/@classmethod/@property → 레슨 42 이후에만 사용 가능",
  },

  // f-string — lesson 8
  {
    pattern: /f["']/,
    minLesson: 8,
    description: "f-string → 레슨 8 이후에만 사용 가능",
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

    if (order === undefined) {
      issues.push({
        id: q.id,
        lessonId,
        rule: "알 수 없는 lessonId",
        detail: `"${lessonId}" 는 커리큘럼에 정의된 lessonId가 아닙니다`,
      })
      continue
    }

    if (order === 999) continue

    // code + codeComparison 모두 검사
    const codeComparison = (q as any).codeComparison
    const allCode = [
      q.code ?? "",
      codeComparison?.wrong ?? "",
      codeComparison?.correct ?? "",
    ].join("\n")

    for (const [pattern, minOrder, description] of CPP_RULES) {
      if (pattern.test(allCode) && order < minOrder) {
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

    if (typeof lessonId !== "number") continue

    // code + codeComparison 모두 검사
    const codeComparison = (q as any).codeComparison
    const allCode = [
      q.code ?? "",
      codeComparison?.wrong ?? "",
      codeComparison?.correct ?? "",
    ].join("\n")

    for (const rule of PYTHON_RULES) {
      if (!rule.pattern.test(allCode)) continue
      if (rule.exceptionLessons && rule.exceptionLessons.includes(lessonId)) continue
      if (rule.exception && rule.exception.test(allCode)) continue

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
