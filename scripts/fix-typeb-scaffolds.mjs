#!/usr/bin/env node
// Fix Type-B scaffolded initialCode in practice cluster files.
// Finds multi-line boilerplate patterns INSIDE initialCode backticks and
// replaces with minimal numbered TODO comments.
//
// Usage: node scripts/fix-typeb-scaffolds.mjs <file>

import { readFileSync, writeFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) { console.error("usage: node fix-typeb-scaffolds.mjs <file>"); process.exit(1) }

let text = readFileSync(file, 'utf8')
let changed = 0

// Process each initialCode backtick block, only transform inside it.
const initialCodeRe = /initialCode:\s*`([\s\S]*?)`/g
text = text.replace(initialCodeRe, (match, body) => {
  let newBody = body
  let n = 0

  // Pattern A: n, m + 2D vector creation + nested cin loop
  newBody = newBody.replace(
    /    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> grid\(n, vector<int>\(m\)\);\n    for \(int i = 0; i < n; i\+\+\)\n        for \(int j = 0; j < m; j\+\+\)\n            cin >> grid\[i\]\[j\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n, m 을 cin 으로 입력받기\n    // 2) n×m 크기의 2D 벡터 grid 선언하고 모든 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern A2: n, m, k + 2D vector + nested cin (starts with `cin >> n >> m >> k;`)
  newBody = newBody.replace(
    /    int n, m, k;\n    cin >> n >> m >> k;\n    vector<vector<int>> grid\(n, vector<int>\(m\)\);\n    for \(int i = 0; i < n; i\+\+\)\n        for \(int j = 0; j < m; j\+\+\)\n            cin >> grid\[i\]\[j\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n, m, k 를 cin 으로 입력받기\n    // 2) n×m 크기의 2D 벡터 grid 선언하고 모든 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern B: n + 1D vector + cin loop
  newBody = newBody.replace(
    /    int n;\n    cin >> n;\n    vector<int> v\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> v\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n 을 cin 으로 입력받기\n    // 2) 크기 n 의 벡터 v 선언하고 n 개의 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern C: n, k + 1D vector + cin loop
  newBody = newBody.replace(
    /    int n, k;\n    cin >> n >> k;\n    vector<int> v\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> v\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n, k 를 cin 으로 입력받기\n    // 2) 크기 n 의 벡터 v 선언하고 n 개의 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern D: n, t + 1D vector + cin loop
  newBody = newBody.replace(
    /    int n, t;\n    cin >> n >> t;\n    vector<int> v\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> v\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n, t 를 cin 으로 입력받기\n    // 2) 크기 n 의 벡터 v 선언하고 n 개의 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern E: n + two vectors a, b
  newBody = newBody.replace(
    /    int n;\n    cin >> n;\n    vector<int> a\(n\), b\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> a\[i\];\n    for \(int i = 0; i < n; i\+\+\) cin >> b\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n 을 cin 으로 입력받기\n    // 2) 크기 n 의 벡터 a, b 선언하고 각각 n 개의 원소 읽기 (a 먼저, b 다음)\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern F: n + 1D vector<string>
  newBody = newBody.replace(
    /    int n;\n    cin >> n;\n    vector<string> v\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> v\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) int n 을 cin 으로 입력받기\n    // 2) 크기 n 의 문자열 벡터 v 선언하고 n 개의 문자열 읽기\n    // 3) 아래에 문제 해결 코드 작성"
    }
  )

  // Pattern G: n + vector with ANY variable name (scores, nums, arr, freq, ...)
  // (int|double|string)타입 가능하도록
  newBody = newBody.replace(
    /    int n;\n    cin >> n;\n    vector<(int|double|string)> (\w+)\(n\);\n    for \(int i = 0; i < n; i\+\+\) cin >> \2\[i\];\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    (_m, type, varName) => {
      n++
      const typeKr = type === "int" ? "정수" : type === "double" ? "실수" : "문자열"
      return `    // 1) int n 을 cin 으로 입력받기\n    // 2) 크기 n 의 ${typeKr} 벡터 ${varName} 선언하고 n 개의 원소 읽기\n    // 3) 아래에 문제 해결 코드 작성`
    }
  )

  // Pattern H: n + set<int> insert loop
  newBody = newBody.replace(
    /    int n;\n    cin >> n;\n    set<(int|string)> (\w+);\n    for \(int i = 0; i < n; i\+\+\) \{\n        \1 x; cin >> x;\n        \2\.insert\(x\);\n    \}\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    (_m, type, varName) => {
      n++
      const typeKr = type === "int" ? "정수" : "문자열"
      return `    // 1) int n 을 cin 으로 입력받기\n    // 2) set<${type}> ${varName} 선언하고 n 개의 ${typeKr}를 insert\n    // 3) 아래에 문제 해결 코드 작성`
    }
  )

  // Pattern I: getline 3-line pre-fill (string s, from, to)
  newBody = newBody.replace(
    /    string s, from, to;\n    getline\(cin, s\);\n    getline\(cin, from\);\n    getline\(cin, to\);\n    \/\/ (?:Write your code here|여기에 코드를 작성하세요)/g,
    () => {
      n++
      return "    // 1) getline 으로 세 줄 입력받기: s, from, to\n    // 2) 아래에 문제 해결 코드 작성"
    }
  )

  changed += n
  return `initialCode: \`${newBody}\``
})

if (changed > 0) {
  writeFileSync(file, text)
  console.log(`${file}: fixed ${changed} Type-B scaffold(s)`)
} else {
  console.log(`${file}: no changes`)
}
