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
  type: 'string' | 'number' | 'none'
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
  returnType?: 'string' | 'number' | 'none',
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
  let returnType: 'string' | 'number' | 'none' = 'none'
  
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
  
  // f-string 체크
  if (argsStr.startsWith("f'") || argsStr.startsWith('f"')) {
    return executeFString(argsStr, variables)
  }
  
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
    if (v.value === null) return { result: "None" }
    return { result: String(v.value) }
  }
  
  // 숫자나 계산식
  const evalResult = evaluateExpression(argsStr, variables)
  if (!evalResult.error) {
    return { result: String(evalResult.value) }
  }
  
  // 따옴표 없는 문자열
  if (/^[a-zA-Z가-힣]/.test(argsStr)) {
    return { result: "", error: `'${argsStr}'에 따옴표를 붙여봐! '${argsStr}'` }
  }
  
  return { result: "", error: "print() 안을 확인해봐!" }
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
      result = result.replace(varMatch[0], String(v.value))
    } else {
      // 표현식 평가 시도
      const evalResult = evaluateExpression(expr, variables)
      if (!evalResult.error) {
        result = result.replace(varMatch[0], String(evalResult.value))
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
  type: 'string' | 'number' | 'none',
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
  
  // 변수
  if (variables.has(expr)) {
    const v = variables.get(expr)!
    return { value: v.value, type: v.type }
  }
  
  // 산술 연산
  if (/^[\d\s+\-*/().]+$/.test(expr)) {
    try {
      const calc = Function('return ' + expr)()
      return { value: calc, type: 'number' }
    } catch {
      return { value: null, type: 'none', error: "계산식을 확인해봐!" }
    }
  }
  
  // 변수가 포함된 산술 연산
  let substituted = expr
  for (const [name, v] of variables) {
    const regex = new RegExp(`\\b${name}\\b`, 'g')
    substituted = substituted.replace(regex, String(v.value))
  }
  
  if (/^[\d\s+\-*/().]+$/.test(substituted)) {
    try {
      const calc = Function('return ' + substituted)()
      return { value: calc, type: 'number' }
    } catch {
      return { value: null, type: 'none', error: "계산식을 확인해봐!" }
    }
  }
  
  return { value: null, type: 'none', error: `'${expr}'를 이해 못 했어!` }
}

// ============================================================
// 인자 파싱
// ============================================================
function parseArguments(argsStr: string): Array<{ value: any, type: 'string' | 'number' | 'none' }> {
  argsStr = argsStr.trim()
  if (!argsStr) return []
  
  const args: Array<{ value: any, type: 'string' | 'number' | 'none' }> = []
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

function parseValue(val: string): { value: any, type: 'string' | 'number' | 'none' } {
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
