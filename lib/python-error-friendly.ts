/**
 * Pyodide / Python 에러를 학생 친화적인 한국어/영어 메시지로 변환.
 *
 * 자가학습 핵심 — 학생이 막혔을 때 "SyntaxError: invalid syntax" 같은 영어 에러만 보면
 * 좌절하고 포기. 친절한 안내 + 흔한 원인 짚어주면 스스로 해결 가능.
 *
 * 사용:
 *   const friendly = translatePythonError(rawErrorText, "ko")
 *   // → { title, hints[], original }
 */

export interface FriendlyError {
  /** 학생 친화적 제목 (예: "들여쓰기 에러예요") */
  title: string
  /** 흔한 원인 / 체크 포인트 배열 */
  hints: string[]
  /** 원본 에러 (collapsible "자세히 보기" 용) */
  original: string
}

interface ErrorPattern {
  match: RegExp
  ko: (m: RegExpMatchArray) => { title: string; hints: string[] }
  en: (m: RegExpMatchArray) => { title: string; hints: string[] }
}

// 흔한 Python 에러 패턴 — 자주 등장하는 순서대로 배치
const PATTERNS: ErrorPattern[] = [
  // ── SyntaxError ──────────────────────────────────────────────
  {
    match: /SyntaxError:\s*invalid syntax/,
    ko: () => ({
      title: "문법 에러 — 어딘가 빠졌거나 잘못 썼어요",
      hints: [
        "콜론 (:) 빠진 게 있는지 확인해봐 — if, for, while, def 끝에는 콜론!",
        "괄호 ( ), [ ], { } 가 짝이 안 맞는 것 같아",
        '따옴표 " 또는 \' 가 짝이 안 맞을 수도 있어',
        "오타 — 예: prin(...) 같이 알파벳 빠진 거",
      ],
    }),
    en: () => ({
      title: "Syntax error — something is missing or wrong",
      hints: [
        "Did you forget a colon (:) after if / for / while / def?",
        "Check that brackets ( ), [ ], { } are balanced",
        'Check that quotes " or \' are balanced',
        "Typo — e.g., prin(...) instead of print(...)",
      ],
    }),
  },
  {
    match: /SyntaxError:\s*(unexpected EOF|EOL while scanning|unterminated string)/,
    ko: () => ({
      title: "문법 에러 — 문장이 끝까지 안 닫혔어요",
      hints: [
        "여는 괄호 ( 만 있고 닫는 ) 가 없는지 확인",
        '따옴표 " 또는 \' 가 한 쪽만 있는지 확인',
        "f-string 안에 중괄호 { } 가 안 닫힌 건 아닐까?",
      ],
    }),
    en: () => ({
      title: "Syntax error — statement wasn't closed",
      hints: [
        "Check that ( has matching )",
        'Check that " or \' has a matching closing quote',
        "Inside f-string, are { } balanced?",
      ],
    }),
  },
  // ── IndentationError ─────────────────────────────────────────
  {
    match: /IndentationError:\s*expected an indented block/,
    ko: () => ({
      title: "들여쓰기 에러 — 코드 안 쪽이 비었어요",
      hints: [
        "if, for, while, def 다음 줄에는 반드시 들여쓴 코드가 있어야 해",
        "코드를 안 썼으면 일단 pass 라고 써둘 수도 있어",
        "들여쓰기는 보통 스페이스 4 칸 또는 Tab 1 번",
      ],
    }),
    en: () => ({
      title: "Indentation error — body block is empty",
      hints: [
        "After if / for / while / def, the next line must be indented",
        "If you have nothing to write yet, you can put pass",
        "Indent is usually 4 spaces or one Tab",
      ],
    }),
  },
  {
    match: /IndentationError:\s*(unindent does not match|unexpected indent)/,
    ko: () => ({
      title: "들여쓰기 에러 — 들여쓰기가 안 맞아요",
      hints: [
        "같은 블록 안에서는 들여쓰기 수가 동일해야 해 (예: 다 4칸씩)",
        "스페이스랑 Tab 을 섞어 쓰면 안 됨 — 하나로 통일",
        "이전 줄보다 더 들여쓴 게 있는지 확인",
      ],
    }),
    en: () => ({
      title: "Indentation error — indents don't line up",
      hints: [
        "Within the same block, every line must be indented the same amount",
        "Don't mix spaces and tabs — pick one",
        "Check if a line is indented more than expected",
      ],
    }),
  },
  // ── NameError ────────────────────────────────────────────────
  {
    match: /NameError:\s*name ['"]?(\w+)['"]? is not defined/,
    ko: (m) => ({
      title: `'${m[1]}' 라는 이름을 못 찾았어요`,
      hints: [
        `'${m[1]}' 를 만들기 전에 썼을 수도 있어 — 변수는 = 으로 먼저 만들고 써야 해`,
        `오타가 있는지 확인 — 예: '${m[1]}' 와 '${m[1].toLowerCase()}' 는 다름 (대소문자 구별)`,
        `print, input, len 같이 따옴표 없는 단어는 함수 — 괄호 () 같이 써야 해`,
        `문자열을 변수로 착각하지 않았는지 — 글자 그대로면 따옴표 안에 넣어야 해 ("${m[1]}")`,
      ],
    }),
    en: (m) => ({
      title: `Can't find a name called '${m[1]}'`,
      hints: [
        `Maybe you used '${m[1]}' before creating it — create with = first`,
        `Check for typos — '${m[1]}' and '${m[1].toLowerCase()}' are different`,
        `Words without quotes like print, input are functions — use with ()`,
        `If you meant text, put it in quotes: "${m[1]}"`,
      ],
    }),
  },
  // ── TypeError ────────────────────────────────────────────────
  {
    match: /TypeError:\s*unsupported operand type\(s\) for (.+):\s*['"](\w+)['"] and ['"](\w+)['"]/,
    ko: (m) => ({
      title: `타입 에러 — ${m[2]} 와 ${m[3]} 는 ${m[1]} 연산이 안 돼요`,
      hints: [
        `${m[2]} (예: "5") 와 ${m[3]} (예: 5) 는 다른 타입이라 ${m[1]} 못 함`,
        `문자열 (str) 끼리 + 는 OK, 숫자 (int) 끼리도 OK. 섞으면 안 돼.`,
        `숫자로 만들려면: int(x) 또는 float(x). 글자로 만들려면: str(x)`,
        `예: print("점수: " + 90) ❌ → print("점수: " + str(90)) ✅ 또는 print("점수:", 90) ✅`,
      ],
    }),
    en: (m) => ({
      title: `Type error — can't do ${m[1]} between ${m[2]} and ${m[3]}`,
      hints: [
        `${m[2]} (e.g. "5") and ${m[3]} (e.g. 5) are different types`,
        `Convert to number: int(x) or float(x). To text: str(x)`,
        `Example: print("Score: " + 90) ❌ → print("Score: " + str(90)) ✅`,
      ],
    }),
  },
  {
    match: /TypeError:\s*['"]?(\w+)['"]? object is not (callable|subscriptable|iterable)/,
    ko: (m) => ({
      title: `타입 에러 — ${m[1]} 에는 그 동작이 안 돼요`,
      hints: [
        m[2] === "callable"
          ? `함수처럼 (괄호로) 부른 것 같은데 ${m[1]} 는 함수가 아니야. 같은 이름의 변수가 있는지 확인.`
          : m[2] === "subscriptable"
          ? `대괄호 [숫자] 로 접근하려고 했지만 ${m[1]} 는 그게 안 돼. 리스트나 문자열만 [...] 사용 가능.`
          : `for 같은 반복문에 넣으려고 했지만 ${m[1]} 는 그게 안 돼. 리스트나 문자열에만 가능.`,
        "변수 이름이 함수 이름과 겹치진 않았는지 확인 (예: print = 5 한 다음 print('x') 하면 에러)",
      ],
    }),
    en: (m) => ({
      title: `Type error — that operation doesn't work on ${m[1]}`,
      hints: [
        m[2] === "callable"
          ? `You tried to call (with parentheses) but ${m[1]} isn't a function`
          : m[2] === "subscriptable"
          ? `You tried [index] but ${m[1]} doesn't support that. Only lists/strings do.`
          : `You tried to loop over it, but ${m[1]} can't be iterated`,
        "Check if your variable name conflicts with a function name",
      ],
    }),
  },
  {
    match: /TypeError:\s*(\w+)\(\) takes? (.+) but (.+) given/,
    ko: () => ({
      title: "함수 인자 개수가 안 맞아요",
      hints: [
        "함수가 받기로 한 인자 개수랑 너가 넘긴 개수가 달라",
        "괄호 () 안에 쉼표로 인자 적당히 넣었는지 확인",
        "len('hello') 처럼 인자 1개만 받는 함수에 더 넣지 않았나?",
      ],
    }),
    en: () => ({
      title: "Wrong number of arguments to function",
      hints: [
        "The function expected a different number of arguments than you gave",
        "Check what's inside () — count the comma-separated arguments",
        "Functions like len() only take 1 argument",
      ],
    }),
  },
  // ── ValueError ───────────────────────────────────────────────
  {
    match: /ValueError:\s*invalid literal for int\(\)/,
    ko: () => ({
      title: "숫자로 바꿀 수 없는 문자열이에요",
      hints: [
        "int() 는 '숫자만 든 문자열' 만 숫자로 바꿀 수 있어. 'abc' 같은 건 안 됨",
        "input() 으로 받은 값은 항상 문자열 — 숫자 입력이면 int(input()) 로 변환",
        "소수점 있는 글자는 int 말고 float() 써야 해 — int('3.14') ❌, float('3.14') ✅",
        "공백 / 한글 / 빈 문자열도 변환 불가",
      ],
    }),
    en: () => ({
      title: "Can't convert this text to a number",
      hints: [
        "int() only converts strings that are pure digits — 'abc' fails",
        "input() always returns a string — wrap with int(input()) for numbers",
        "For decimals use float() — int('3.14') ❌, float('3.14') ✅",
      ],
    }),
  },
  // ── IndexError ───────────────────────────────────────────────
  {
    match: /IndexError:\s*(list|string|tuple)?\s*index out of range/,
    ko: () => ({
      title: "리스트/문자열 범위를 벗어났어요",
      hints: [
        "리스트나 문자열의 인덱스는 0부터 시작 — 길이 5짜리는 [0] ~ [4] 까지만 가능",
        "len(리스트) 로 길이 먼저 확인하고 그 안의 숫자만 써야 해",
        "음수 인덱스: -1 은 마지막, -2 는 끝에서 두 번째",
      ],
    }),
    en: () => ({
      title: "Index is out of range",
      hints: [
        "Indices start at 0 — a list of length 5 has indices 0 to 4",
        "Use len(list) first to check the size",
        "Negative indices: -1 is last, -2 is second to last",
      ],
    }),
  },
  // ── KeyError ─────────────────────────────────────────────────
  {
    match: /KeyError:\s*['"]?(\w+)['"]?/,
    ko: (m) => ({
      title: `딕셔너리에 '${m[1]}' 라는 키가 없어요`,
      hints: [
        `사전 (dict) 에 '${m[1]}' 키가 정말 들어있는지 확인 — 오타 가능성`,
        "키 확인은 `if '키' in dict:` 같이 먼저 체크하면 안전",
        ".get('키', 기본값) 쓰면 없을 때 에러 안 나고 기본값 받음",
      ],
    }),
    en: (m) => ({
      title: `Dictionary has no key '${m[1]}'`,
      hints: [
        `Check if '${m[1]}' is really in the dict (typo?)`,
        "Safer: if 'key' in dict: check first",
        ".get('key', default) returns default instead of error",
      ],
    }),
  },
  // ── ZeroDivisionError ────────────────────────────────────────
  {
    match: /ZeroDivisionError/,
    ko: () => ({
      title: "0 으로 나눌 수 없어요",
      hints: [
        "수학적으로 0 으로 나누기는 불가능",
        "나누기 전에 if x != 0: 같이 0 인지 먼저 확인",
        "사용자 입력 값으로 나누는 경우 = 0 들어왔을 때 대비 필요",
      ],
    }),
    en: () => ({
      title: "Can't divide by zero",
      hints: [
        "Division by zero is mathematically undefined",
        "Check with if x != 0: before dividing",
      ],
    }),
  },
  // ── AttributeError ───────────────────────────────────────────
  {
    match: /AttributeError:\s*['"]?(\w+)['"]?\s*object has no attribute ['"]?(\w+)['"]?/,
    ko: (m) => ({
      title: `${m[1]} 에는 '${m[2]}' 라는 메서드/속성이 없어요`,
      hints: [
        `${m[1]} 타입에는 .${m[2]}() 같은 함수가 없어. 오타일 수도.`,
        `예: 'abc'.uppr() ❌ → 'abc'.upper() ✅ (오타)`,
        `타입 자체가 다른 거면 그 메서드 안 됨 — 예: 숫자에 .split() 안 됨`,
      ],
    }),
    en: (m) => ({
      title: `${m[1]} has no method/attribute called '${m[2]}'`,
      hints: [
        `${m[1]} doesn't have .${m[2]}() — might be a typo`,
        "Example: 'abc'.uppr() ❌ → 'abc'.upper() ✅",
      ],
    }),
  },
  // ── RecursionError ───────────────────────────────────────────
  {
    match: /RecursionError/,
    ko: () => ({
      title: "재귀 함수가 멈출 줄 모르고 있어요 (스택 오버플로우)",
      hints: [
        "함수가 자기 자신을 호출하는데 멈추는 조건 (base case) 이 없거나 도달 못함",
        "if 조건으로 base case 먼저 체크하고 return — 예: if n == 0: return 1",
        "재귀 깊이가 너무 깊으면 반복문 (for/while) 으로 바꿀 수 있는지 고민",
      ],
    }),
    en: () => ({
      title: "Recursion doesn't stop (stack overflow)",
      hints: [
        "Function calls itself but the base case never reached",
        "Add an if check first: if n == 0: return 1",
        "If depth is too high, consider rewriting with a loop",
      ],
    }),
  },
  // ── FileNotFoundError ────────────────────────────────────────
  {
    match: /FileNotFoundError:\s*\[Errno \d+\]\s*[^:]*:\s*['"]?([^'"\n]+)['"]?/,
    ko: (m) => ({
      title: `'${m[1]}' 라는 파일을 못 찾았어요`,
      hints: [
        `파일 이름을 정확히 적었는지 확인 — 대소문자도 똑같아야 해`,
        `파일이 정말 같은 폴더에 있는지 확인 (브라우저 Pyodide 는 가상 파일만 가능)`,
        `확장자도 빠뜨리지 말기 — 예: 'data' (X) → 'data.txt' (O)`,
      ],
    }),
    en: (m) => ({
      title: `Can't find a file called '${m[1]}'`,
      hints: [
        "Check the filename exactly — case matters",
        "Make sure the file is in the same folder",
        "Don't forget the extension — e.g. 'data' (X) → 'data.txt' (O)",
      ],
    }),
  },
  // FileNotFoundError fallback (Pyodide 환경에 파일 이름 못 잡을 수도)
  {
    match: /FileNotFoundError/,
    ko: () => ({
      title: "파일을 못 찾았어요",
      hints: [
        "파일 이름을 정확히 적었는지 확인 — 대소문자, 확장자까지 똑같아야 해",
        "브라우저 Pyodide 에서는 진짜 PC 파일을 읽을 수 없어. 코드 안에 데이터를 넣어봐.",
      ],
    }),
    en: () => ({
      title: "File not found",
      hints: [
        "Check the filename exactly — case and extension matter",
        "Browser Pyodide can't read real disk files",
      ],
    }),
  },
  // ── ValueError (generic fallback — invalid literal 위쪽에 더 구체적인 게 있음) ─
  {
    match: /ValueError:\s*(.+)/,
    ko: (m) => ({
      title: "값 에러 — 그 값으로는 그 동작이 안 돼요",
      hints: [
        `Python 메시지: ${m[1]}`,
        "함수에 넘긴 값의 형태/범위가 잘못됐을 수 있어 — 예: int('abc')",
        "input() 으로 받은 값을 변환할 땐 사용자가 잘못 입력했을 가능성 체크",
      ],
    }),
    en: (m) => ({
      title: "Value error — that value won't work here",
      hints: [
        `Python says: ${m[1]}`,
        "The shape/range of the value passed to the function may be wrong",
        "If converting input(), the user may have entered something unexpected",
      ],
    }),
  },
  // ── ModuleNotFoundError ──────────────────────────────────────
  {
    match: /ModuleNotFoundError:\s*No module named ['"]?(\w+)['"]?/,
    ko: (m) => ({
      title: `'${m[1]}' 라는 라이브러리가 없어요`,
      hints: [
        `브라우저 Pyodide 에서는 일부 라이브러리만 사용 가능`,
        `import 줄이 정말 필요한지 확인 — 이 문제에 필요 없는 라이브러리일 수도`,
        `오타 가능성도 — 예: import mathh (X) → import math (O)`,
      ],
    }),
    en: (m) => ({
      title: `Library '${m[1]}' not available`,
      hints: [
        "Browser Pyodide only supports some libraries",
        "Check if you really need this import for this problem",
        "Typo possibility — e.g., import mathh → import math",
      ],
    }),
  },
]

/**
 * 원본 에러 텍스트를 받아 친절한 한국어/영어 설명으로 변환.
 * 매칭되는 패턴이 없으면 원본 그대로 반환 (단, 마지막 줄만).
 */
export function translatePythonError(raw: string, lang: "ko" | "en" = "ko"): FriendlyError {
  if (!raw) {
    return { title: "", hints: [], original: "" }
  }

  // 무한 루프 타임아웃 — 워커가 5초 초과로 강제 종료된 경우 (utils/pyodideWorker)
  if (raw.includes("__CR_TIMEOUT__")) {
    return lang === "en"
      ? {
          title: "⏱️ Stopped after 5s — looks like an infinite loop",
          hints: [
            "Make the loop end — e.g. so the condition eventually becomes false, or decrease the counter.",
            "A `while` with no way to stop will run forever.",
          ],
          original: "",
        }
      : {
          title: "⏱️ 5초가 넘어 멈췄어요 — 무한 루프인 것 같아요",
          hints: [
            "반복이 끝나도록 고쳐 보세요 — 예: 조건이 언젠가 거짓이 되거나, 세는 값을 줄이도록.",
            "멈출 방법이 없는 `while` 은 영원히 돌아요.",
          ],
          original: "",
        }
  }

  // 마지막 줄에 진짜 에러 메시지가 있음 (Traceback 윗줄들은 스택)
  const lines = raw.split("\n").filter((l) => l.trim())
  const errorLine = lines[lines.length - 1] || raw

  // 패턴 순회
  for (const pattern of PATTERNS) {
    const m = errorLine.match(pattern.match) || raw.match(pattern.match)
    if (m) {
      const result = lang === "en" ? pattern.en(m) : pattern.ko(m)
      return { title: result.title, hints: result.hints, original: raw }
    }
  }

  // 매칭 안 되면 fallback
  const fallback =
    lang === "en"
      ? { title: "Something went wrong", hints: ["Check the error details below for clues"] }
      : { title: "에러가 발생했어요", hints: ["아래 자세한 에러 메시지에서 단서를 찾아봐"] }
  return { title: fallback.title, hints: fallback.hints, original: raw }
}
