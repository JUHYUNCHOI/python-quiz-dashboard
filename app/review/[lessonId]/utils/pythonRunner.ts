// ============================================================
// Python 코드 실행기 (함수 지원)
// Phase 1: 기본 함수 정의 + 호출
// Phase 2: 매개변수 지원
// Phase 3: return 지원
// ============================================================

interface RunResult {
  result?: string
  error?: string
}

interface FunctionDef {
  name: string
  params: string[]
  body: string[]
  hasReturn: boolean
  returnExpr?: string
}

interface Variable {
  name: string
  value: any
  type: 'string' | 'number' | 'boolean' | 'none'
}

// Python 표현식을 JS 표현식으로 번역 (eval 전 단계)
// True/False, and/or/not, ==/!=/>/< 모두 JS 가 그대로 처리할 수 있게
function pyToJsExpr(expr: string): string {
  return expr
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\s+/g, '!')
}

// Python 식 출력 ("True"/"False"/"None") — JS 의 String(true) 은 "true" 라 안 됨
function formatPyValue(v: any): string {
  if (v === true) return "True"
  if (v === false) return "False"
  if (v === null || v === undefined) return "None"
  return String(v)
}

// ============================================================
// 메인 실행 함수
// ============================================================
export function runPythonCode(code: string): RunResult {
  try {
    code = code.trim()
    if (!code) {
      return { result: "", error: "코드를 입력해봐!" }
    }

    // 오타 체크
    const typoCheck = checkTypos(code)
    if (typoCheck.error) return typoCheck

    // 구문 에러 체크
    const syntaxCheck = checkSyntax(code)
    if (syntaxCheck.error) return syntaxCheck

    // 코드 파싱 및 실행
    return executeCode(code)
  } catch (e) {
    return { result: "", error: "다시 확인해봐!" }
  }
}

// ============================================================
// 오타 체크
// ============================================================
function checkTypos(code: string): RunResult {
  const printTypos = ['pirnt', 'prnt', 'prnit', 'pritn', 'printt', 'prit', 'prrint']
  for (const typo of printTypos) {
    if (code.toLowerCase().includes(typo)) {
      return { result: "", error: `오타! ${typo} → print` }
    }
  }
  
  if (/\bprin\s*\(/i.test(code) && !/\bprint\s*\(/i.test(code)) {
    return { result: "", error: "오타! prin → print" }
  }

  const defTypos = ['dfe', 'def ', 'deff', 'dfef']
  for (const typo of defTypos) {
    if (code.includes(typo) && !code.includes('def ')) {
      return { result: "", error: `오타! ${typo.trim()} → def` }
    }
  }

  const returnTypos = ['retrun', 'reutrn', 'retrn', 'retunr']
  for (const typo of returnTypos) {
    if (code.toLowerCase().includes(typo)) {
      return { result: "", error: `오타! ${typo} → return` }
    }
  }

  return { result: "" }
}

// ============================================================
// 구문 에러 체크
// ============================================================
function checkSyntax(code: string): RunResult {
  const lines = code.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // def 구문 체크
    if (trimmed.startsWith('def ')) {
      // 괄호 체크
      if (!trimmed.includes('(')) {
        return { result: "", error: "def 뒤에 () 괄호가 필요해!" }
      }
      if (!trimmed.includes(')')) {
        return { result: "", error: "괄호를 닫아줘! )" }
      }
      // 콜론 체크
      if (!trimmed.endsWith(':')) {
        return { result: "", error: "def 끝에 콜론(:)이 필요해!" }
      }
      
      // 다음 줄 들여쓰기 체크
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1]
        if (nextLine.trim() && !nextLine.startsWith('    ') && !nextLine.startsWith('\t')) {
          return { result: "", error: "함수 안은 들여쓰기(스페이스 4칸)가 필요해!" }
        }
      }
    }

    // def 없이 콜론만 있는 경우 (함수 이름만 쓴 경우)
    if (/^[a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*\s*:/.test(trimmed) && !trimmed.startsWith('def ')) {
      return { result: "", error: "함수를 만들려면 def를 먼저 써야 해!" }
    }
  }

  // 따옴표 체크
  let inSingleQuote = false
  let inDoubleQuote = false
  for (const char of code) {
    if (char === "'" && !inDoubleQuote) inSingleQuote = !inSingleQuote
    if (char === '"' && !inSingleQuote) inDoubleQuote = !inDoubleQuote
  }
  if (inSingleQuote || inDoubleQuote) {
    return { result: "", error: "따옴표를 닫아줘! ' 또는 \"" }
  }

  return { result: "" }
}

// ============================================================
// 코드 실행
// ============================================================
function executeCode(code: string): RunResult {
  const lines = code.split('\n')
  const functions: Map<string, FunctionDef> = new Map()
  const variables: Map<string, Variable> = new Map()
  const outputs: string[] = []
  
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // 빈 줄이나 주석 스킵
    if (!trimmed || trimmed.startsWith('#')) {
      i++
      continue
    }
    
    // 함수 정의 파싱
    if (trimmed.startsWith('def ')) {
      const funcResult = parseFunctionDef(lines, i)
      if (funcResult.error) {
        return { result: "", error: funcResult.error }
      }
      if (funcResult.func) {
        functions.set(funcResult.func.name, funcResult.func)
      }
      i = funcResult.nextIndex
      continue
    }
    
    // 변수 할당 (결과 = 함수호출())
    const assignMatch = trimmed.match(/^([a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*)\s*=\s*(.+)$/)
    if (assignMatch) {
      const varName = assignMatch[1]
      const expr = assignMatch[2].trim()
      
      // 함수 호출인지 확인
      const callMatch = expr.match(/^([a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*)\s*\((.*)\)$/)
      if (callMatch) {
        const funcName = callMatch[1]
        const argsStr = callMatch[2]
        
        if (funcName === 'print') {
          // print는 변수에 할당하면 None
          const printResult = executePrint(argsStr, variables, functions)
          if (printResult.error) return printResult
          if (printResult.result) outputs.push(printResult.result)
          variables.set(varName, { name: varName, value: null, type: 'none' })
        } else {
          // 사용자 정의 함수 호출
          const func = functions.get(funcName)
          if (!func) {
            return { result: "", error: `'${funcName}' 함수가 없어! 먼저 def로 만들어줘!` }
          }
          const callResult = executeFunction(func, argsStr, variables, functions)
          if (callResult.error) return callResult
          if (callResult.output) outputs.push(...callResult.output)
          variables.set(varName, { 
            name: varName, 
            value: callResult.returnValue, 
            type: callResult.returnType || 'none' 
          })
        }
      } else {
        // 일반 표현식 평가
        const evalResult = evaluateExpression(expr, variables)
        if (evalResult.error) return { result: "", error: evalResult.error }
        variables.set(varName, { 
          name: varName, 
          value: evalResult.value, 
          type: evalResult.type 
        })
      }
      i++
      continue
    }
    
    // print 문
    const printMatch = trimmed.match(/^print\s*\(([\s\S]*)\)$/)
    if (printMatch) {
      const printResult = executePrint(printMatch[1], variables, functions)
      if (printResult.error) return printResult
      if (printResult.result) outputs.push(printResult.result)
      i++
      continue
    }
    
    // 함수 호출 (단독)
    const callMatch = trimmed.match(/^([a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*)\s*\((.*)\)$/)
    if (callMatch) {
      const funcName = callMatch[1]
      const argsStr = callMatch[2]
      
      if (funcName === 'print') {
        const printResult = executePrint(argsStr, variables, functions)
        if (printResult.error) return printResult
        if (printResult.result) outputs.push(printResult.result)
      } else {
        const func = functions.get(funcName)
        if (!func) {
          return { result: "", error: `'${funcName}' 함수가 없어! 먼저 def로 만들어줘!` }
        }
        const callResult = executeFunction(func, argsStr, variables, functions)
        if (callResult.error) return { result: "", error: callResult.error }
        if (callResult.output) outputs.push(...callResult.output)
      }
      i++
      continue
    }
    
    // 인식 못 하는 코드
    if (trimmed && !trimmed.startsWith(' ') && !trimmed.startsWith('\t')) {
      // 함수 본문 밖의 알 수 없는 코드
      return { result: "", error: `'${trimmed}'를 이해 못 했어!` }
    }
    
    i++
  }
  
  // 함수를 정의만 하고 호출 안 한 경우
  if (functions.size > 0 && outputs.length === 0) {
    const funcNames = Array.from(functions.keys())
    return { result: "", error: `함수를 만들었으면 ${funcNames[0]}()로 호출해야 해!` }
  }
  
  return { result: outputs.join('\n') }
}

// ============================================================
// 함수 정의 파싱
// ============================================================
function parseFunctionDef(lines: string[], startIndex: number): { 
  func?: FunctionDef, 
  nextIndex: number, 
  error?: string 
} {
  const defLine = lines[startIndex].trim()
  
  // def 함수이름(매개변수): 파싱
  const defMatch = defLine.match(/^def\s+([a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*)\s*\(([^)]*)\)\s*:$/)
  if (!defMatch) {
    return { nextIndex: startIndex + 1, error: "def 문법을 확인해봐! def 함수이름():" }
  }
  
  const funcName = defMatch[1]
  const paramsStr = defMatch[2].trim()
  const params = paramsStr ? paramsStr.split(',').map(p => p.trim()) : []
  
  // 함수 본문 수집
  const body: string[] = []
  let hasReturn = false
  let returnExpr: string | undefined
  let i = startIndex + 1
  
  while (i < lines.length) {
    const line = lines[i]
    
    // 들여쓰기가 없으면 함수 끝
    if (line.trim() && !line.startsWith('    ') && !line.startsWith('\t')) {
      break
    }
    
    const bodyLine = line.replace(/^(\s{4}|\t)/, '').trim()
    if (bodyLine) {
      // return 문 체크
      if (bodyLine.startsWith('return ')) {
        hasReturn = true
        returnExpr = bodyLine.substring(7).trim()
      }
      body.push(bodyLine)
    }
    i++
  }
  
  if (body.length === 0) {
    return { nextIndex: i, error: "함수 안에 코드가 없어!" }
  }
  
  return {
    func: { name: funcName, params, body, hasReturn, returnExpr },
    nextIndex: i
  }
}

// ============================================================
// 함수 실행
// ============================================================
function executeFunction(
  func: FunctionDef, 
  argsStr: string, 
  globalVars: Map<string, Variable>,
  functions: Map<string, FunctionDef>
): {
  result?: string,
  output?: string[],
  returnValue?: any,
  returnType?: 'string' | 'number' | 'boolean' | 'none',
  error?: string
} {
  // 인자 파싱
  const args = parseArguments(argsStr)
  
  // 매개변수 개수 체크
  if (args.length !== func.params.length) {
    if (func.params.length === 0) {
      return { error: `${func.name}()는 괄호 안에 아무것도 안 넣어도 돼!` }
    }
    return { error: `${func.name}()에 ${func.params.length}개 넣어야 해! (지금 ${args.length}개)` }
  }
  
  // 로컬 변수 환경 구성
  const localVars = new Map<string, Variable>(globalVars)
  for (let i = 0; i < func.params.length; i++) {
    const paramName = func.params[i]
    const argValue = args[i]
    localVars.set(paramName, {
      name: paramName,
      value: argValue.value,
      type: argValue.type
    })
  }
  
  // 함수 본문 실행
  const outputs: string[] = []
  let returnValue: any = null
  let returnType: 'string' | 'number' | 'boolean' | 'none' = 'none'
  
  for (const line of func.body) {
    // print 문
    const printMatch = line.match(/^print\s*\(([\s\S]*)\)$/)
    if (printMatch) {
      const printResult = executePrint(printMatch[1], localVars, functions)
      if (printResult.error) return { error: printResult.error }
      if (printResult.result) outputs.push(printResult.result)
      continue
    }
    
    // return 문
    if (line.startsWith('return ')) {
      const expr = line.substring(7).trim()
      const evalResult = evaluateExpression(expr, localVars)
      if (evalResult.error) return { error: evalResult.error }
      returnValue = evalResult.value
      returnType = evalResult.type
      break
    }
  }
  
  return { output: outputs, returnValue, returnType }
}

// ============================================================
// print 실행
// ============================================================
function executePrint(
  argsStr: string,
  variables: Map<string, Variable>,
  functions: Map<string, FunctionDef>
): RunResult {
  argsStr = argsStr.trim()
  if (!argsStr) {
    return { result: "" } // 빈 print()는 빈 줄
  }

  // f-string 체크 (단일 인자 전용)
  if (argsStr.startsWith("f'") || argsStr.startsWith('f"')) {
    return executeFString(argsStr, variables)
  }

  // ── 다중 인자 처리: print('a', b, 3) ─────────────────────────
  // 따옴표·괄호 밖 쉼표가 있으면 다중 인자
  if (hasOuterComma(argsStr)) {
    const tokens = parseArguments(argsStr)
    const parts: string[] = []
    for (const tok of tokens) {
      // type=none → 변수 참조일 수 있음
      if (tok.type === 'none') {
        const varName = String(tok.value).trim()
        if (variables.has(varName)) {
          const v = variables.get(varName)!
          parts.push(formatPyValue(v.value))
        } else {
          // 표현식 시도
          const ev = evaluateExpression(varName, variables)
          if (!ev.error) {
            parts.push(formatPyValue(ev.value))
          } else {
            return { result: "", error: `'${varName}'를 찾을 수 없어!` }
          }
        }
      } else {
        parts.push(formatPyValue(tok.value))
      }
    }
    return { result: parts.join(" ") }
  }

  // ── 단일 인자 ─────────────────────────────────────────────────

  // 일반 문자열
  const strMatch = argsStr.match(/^(['"])([\s\S]*)\1$/)
  if (strMatch) {
    return { result: strMatch[2] }
  }

  // 함수 호출이 print 안에 있는 경우: print(함수())
  const callMatch = argsStr.match(/^([a-zA-Z가-힣_][a-zA-Z가-힣0-9_]*)\s*\((.*)\)$/)
  if (callMatch) {
    const funcName = callMatch[1]
    const innerArgs = callMatch[2]

    const func = functions.get(funcName)
    if (func) {
      const callResult = executeFunction(func, innerArgs, variables, functions)
      if (callResult.error) return { result: "", error: callResult.error }

      // 함수 내부 print 출력 + return 값
      const outputs: string[] = []
      if (callResult.output) outputs.push(...callResult.output)
      if (callResult.returnValue !== null && callResult.returnValue !== undefined) {
        outputs.push(String(callResult.returnValue))
      }
      return { result: outputs.join('\n') }
    }
  }

  // 변수
  if (variables.has(argsStr)) {
    const v = variables.get(argsStr)!
    return { result: formatPyValue(v.value) }
  }

  // 숫자나 계산식 (비교/논리 포함)
  const evalResult = evaluateExpression(argsStr, variables)
  if (!evalResult.error) {
    return { result: formatPyValue(evalResult.value) }
  }

  // 따옴표 없는 문자열
  if (/^[a-zA-Z가-힣]/.test(argsStr)) {
    return { result: "", error: `'${argsStr}'에 따옴표를 붙여봐! '${argsStr}'` }
  }

  return { result: "", error: "print() 안을 확인해봐!" }
}

/** 따옴표·괄호 밖에 쉼표가 있는지 확인 */
function hasOuterComma(s: string): boolean {
  let inQuote = false, quoteChar = '', depth = 0
  for (const ch of s) {
    if ((ch === "'" || ch === '"') && !inQuote) { inQuote = true; quoteChar = ch }
    else if (ch === quoteChar && inQuote) { inQuote = false; quoteChar = '' }
    else if (ch === '(' && !inQuote) depth++
    else if (ch === ')' && !inQuote) depth--
    else if (ch === ',' && !inQuote && depth === 0) return true
  }
  return false
}

// ============================================================
// f-string 실행
// ============================================================
function executeFString(fstr: string, variables: Map<string, Variable>): RunResult {
  // f'...' 또는 f"..." 에서 내용 추출
  const match = fstr.match(/^f(['"])([\s\S]*)\1$/)
  if (!match) {
    return { result: "", error: "f-string 형식을 확인해봐!" }
  }
  
  const content = match[2]
  
  // {변수} 치환
  let result = content
  const varPattern = /\{([^}]+)\}/g
  let varMatch
  
  while ((varMatch = varPattern.exec(content)) !== null) {
    const expr = varMatch[1].trim()
    
    // 변수 찾기
    if (variables.has(expr)) {
      const v = variables.get(expr)!
      result = result.replace(varMatch[0], formatPyValue(v.value))
    } else {
      // 표현식 평가 시도
      const evalResult = evaluateExpression(expr, variables)
      if (!evalResult.error) {
        result = result.replace(varMatch[0], formatPyValue(evalResult.value))
      } else {
        return { result: "", error: `'{${expr}}'를 찾을 수 없어!` }
      }
    }
  }
  
  return { result }
}

// ============================================================
// 표현식 평가
// ============================================================
function evaluateExpression(expr: string, variables: Map<string, Variable>): {
  value: any,
  type: 'string' | 'number' | 'boolean' | 'none',
  error?: string
} {
  expr = expr.trim()

  // 문자열
  const strMatch = expr.match(/^(['"])([\s\S]*)\1$/)
  if (strMatch) {
    return { value: strMatch[2], type: 'string' }
  }

  // 숫자
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    const num = parseFloat(expr)
    return { value: num, type: 'number' }
  }

  // Boolean / None 리터럴
  if (expr === 'True') return { value: true, type: 'boolean' }
  if (expr === 'False') return { value: false, type: 'boolean' }
  if (expr === 'None') return { value: null, type: 'none' }

  // 변수
  if (variables.has(expr)) {
    const v = variables.get(expr)!
    return { value: v.value, type: v.type }
  }

  // 표현식 평가 — Python → JS 번역 후 Function eval
  // 허용 문자: 영숫자, 공백, +-*/ 괄호, 비교/논리/부등호 (<>=!&|), 점 (실수)
  const tryEval = (raw: string) => {
    const js = pyToJsExpr(raw)
    if (!/^[\w\s+\-*/().<>=!&|,]+$/.test(js)) return null
    try {
      const calc = Function('return ' + js)()
      const t: 'string' | 'number' | 'boolean' | 'none' =
        typeof calc === 'boolean' ? 'boolean' :
        typeof calc === 'number' ? 'number' :
        calc === null || calc === undefined ? 'none' : 'string'
      return { value: calc, type: t }
    } catch {
      return null
    }
  }

  const direct = tryEval(expr)
  if (direct) return direct

  // 변수가 포함된 식 — 변수를 값으로 치환 후 재시도
  let substituted = expr
  for (const [name, v] of variables) {
    const regex = new RegExp(`\\b${name}\\b`, 'g')
    if (typeof v.value === 'string') {
      // 문자열 변수는 따옴표 둘러서 치환 (이스케이프 단순화)
      substituted = substituted.replace(regex, JSON.stringify(v.value))
    } else if (v.value === null) {
      substituted = substituted.replace(regex, 'null')
    } else {
      substituted = substituted.replace(regex, String(v.value))
    }
  }
  const subResult = tryEval(substituted)
  if (subResult) return subResult

  return { value: null, type: 'none', error: `'${expr}'를 이해 못 했어!` }
}

// ============================================================
// 인자 파싱
// ============================================================
function parseArguments(argsStr: string): Array<{ value: any, type: 'string' | 'number' | 'boolean' | 'none' }> {
  argsStr = argsStr.trim()
  if (!argsStr) return []
  
  const args: Array<{ value: any, type: 'string' | 'number' | 'boolean' | 'none' }> = []
  let current = ""
  let inQuote = false
  let quoteChar = ""
  let depth = 0
  
  for (let i = 0; i < argsStr.length; i++) {
    const char = argsStr[i]
    
    if ((char === "'" || char === '"') && !inQuote) {
      inQuote = true
      quoteChar = char
      current += char
    } else if (char === quoteChar && inQuote) {
      inQuote = false
      quoteChar = ""
      current += char
    } else if (char === '(' && !inQuote) {
      depth++
      current += char
    } else if (char === ')' && !inQuote) {
      depth--
      current += char
    } else if (char === ',' && !inQuote && depth === 0) {
      args.push(parseValue(current.trim()))
      current = ""
    } else {
      current += char
    }
  }
  
  if (current.trim()) {
    args.push(parseValue(current.trim()))
  }
  
  return args
}

function parseValue(val: string): { value: any, type: 'string' | 'number' | 'boolean' | 'none' } {
  // 문자열
  const strMatch = val.match(/^(['"])([\s\S]*)\1$/)
  if (strMatch) {
    return { value: strMatch[2], type: 'string' }
  }
  
  // 숫자
  if (/^-?\d+(\.\d+)?$/.test(val)) {
    return { value: parseFloat(val), type: 'number' }
  }
  
  return { value: val, type: 'none' }
}
