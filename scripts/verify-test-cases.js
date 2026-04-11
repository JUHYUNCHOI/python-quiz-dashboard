#!/usr/bin/env node
/**
 * 연습 문제 테스트케이스 검증 스크립트 (CommonJS)
 * solutionCode를 실제 컴파일/실행 후 expectedOutput과 비교
 *
 * 실행: node scripts/verify-test-cases.js
 */

const { spawnSync } = require("child_process")
const fs = require("fs")
const os = require("os")
const path = require("path")

const CLUSTER_FILES = [
  "cluster-arrays",
  "cluster-conditionals",
  "cluster-constructs",
  "cluster-functions",
  "cluster-grid",
  "cluster-io",
  "cluster-loops",
  "cluster-map-set",
  "cluster-part1-combo",
  "cluster-refs-ptrs",
  "cluster-simulation",
  "cluster-sorting",
  "cluster-stackqueue",
  "cluster-strings",
  "cluster-structs",
  "py-cluster-basics",
  "py-cluster-conditionals",
  "py-cluster-dicts",
  "py-cluster-functions",
  "py-cluster-io",
  "py-cluster-lists",
  "py-cluster-logic",
  "py-cluster-loops",
  "py-cluster-oop",
  "py-cluster-output",
  "py-cluster-strings",
  "py-cluster-typeconv",
]

function normalize(s) {
  return s.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n")
}

function runCpp(code, stdin) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "verify-"))
  const srcFile = path.join(tmpDir, "main.cpp")
  const binFile = path.join(tmpDir, "main")
  try {
    fs.writeFileSync(srcFile, code)
    const compile = spawnSync("g++", ["-std=c++17", "-O2", "-o", binFile, srcFile], {
      encoding: "utf8", timeout: 10000,
    })
    if (compile.status !== 0) return { output: "", error: "COMPILE: " + compile.stderr.split("\n")[0] }
    const run = spawnSync(binFile, [], { input: stdin, encoding: "utf8", timeout: 5000 })
    if (run.status !== 0) return { output: "", error: "RUNTIME: " + run.stderr.split("\n")[0] }
    return { output: run.stdout, error: "" }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

function runPython(code, stdin) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "verify-py-"))
  const srcFile = path.join(tmpDir, "main.py")
  try {
    fs.writeFileSync(srcFile, code)
    const run = spawnSync("python3", [srcFile], { input: stdin, encoding: "utf8", timeout: 5000 })
    if (run.status !== 0) return { output: "", error: "RUNTIME: " + run.stderr.split("\n")[0] }
    return { output: run.stdout, error: "" }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

// TS 파일에서 problem 정보 추출
function extractProblems(tsContent, fileName) {
  const problems = []

  // 모든 problem id 찾기 (형식: "arr-001", "grid-003" 등)
  const pidMatches = [...tsContent.matchAll(/\bid:\s*"([a-z]+-[a-zA-Z0-9-]+)"/g)]
  const problemIds = pidMatches.map(m => m[1])

  for (let pi = 0; pi < problemIds.length; pi++) {
    const pid = problemIds[pi]
    const pidIdx = tsContent.indexOf(`id: "${pid}"`)
    if (pidIdx === -1) continue

    // 다음 problem 시작 위치
    const nextIdx = pi + 1 < problemIds.length
      ? tsContent.indexOf(`id: "${problemIds[pi + 1]}"`)
      : tsContent.length

    const block = tsContent.slice(pidIdx, nextIdx)

    // title
    const titleM = block.match(/^\s+title:\s*["']([^"']+)["']/m)
    const title = titleM ? titleM[1] : pid

    // language
    const langM = block.match(/language:\s*["'](cpp|python)["']/)
    const lang = langM ? langM[1] : "cpp"

    // solutionCode (backtick template literal)
    const solM = block.match(/solutionCode:\s*`([\s\S]*?)`/)
    const solutionCode = solM ? solM[1].replace(/\\\\/g, "\\") : null

    // testCases — stdin/expectedOutput 쌍 추출
    const testCases = []
    const tcAreaM = block.match(/testCases:\s*\[([\s\S]*?)\]/)
    if (tcAreaM) {
      const tcArea = tcAreaM[1]
      // stdin과 expectedOutput 추출 (큰따옴표 문자열)
      const tcRe = /\{\s*stdin:\s*"((?:[^"\\]|\\.)*)"\s*,\s*expectedOutput:\s*"((?:[^"\\]|\\.)*)"(?:\s*,\s*label:\s*"[^"]*")?\s*\}/g
      let m
      while ((m = tcRe.exec(tcArea)) !== null) {
        testCases.push({
          stdin: m[1].replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
          expected: m[2].replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
        })
      }
    }

    if (solutionCode && testCases.length > 0) {
      problems.push({ id: pid, title, lang, solutionCode, testCases, file: fileName })
    }
  }

  return problems
}

// ── 메인 ─────────────────────────────────────────────────────────────────

const baseDir = path.join(__dirname, "../data/practice")
console.log("🔍 연습 문제 테스트케이스 검증 시작...\n")

let totalProblems = 0
let totalTests = 0
let failures = 0

for (const file of CLUSTER_FILES) {
  const filePath = path.join(baseDir, `${file}.ts`)
  if (!fs.existsSync(filePath)) continue

  const content = fs.readFileSync(filePath, "utf8")
  const problems = extractProblems(content, file)

  for (const p of problems) {
    totalProblems++
    process.stdout.write(`  [${p.id}] `)

    for (let ti = 0; ti < p.testCases.length; ti++) {
      const tc = p.testCases[ti]
      const runner = p.lang === "python" ? runPython : runCpp
      const { output, error } = runner(p.solutionCode, tc.stdin)

      if (error) {
        failures++
        console.log(`\n  ❌ ${p.id} TC${ti+1}: ${error}`)
        console.log(`     file: ${p.file}`)
        continue
      }

      totalTests++
      if (normalize(output) !== normalize(tc.expected)) {
        failures++
        console.log(`\n  ❌ ${p.id} "${p.title}" TC${ti+1}`)
        console.log(`     stdin:    ${tc.stdin.replace(/\n/g, "↵")}`)
        console.log(`     expected: ${tc.expected.replace(/\n/g, "↵")}`)
        console.log(`     actual:   ${output.trim().replace(/\n/g, "↵")}`)
        console.log(`     file: ${p.file}`)
      } else {
        process.stdout.write(".")
      }
    }
  }
  console.log()
}

console.log(`\n${"─".repeat(60)}`)
console.log(`총 문제: ${totalProblems}개, 총 테스트: ${totalTests}개`)
console.log(failures === 0 ? "✅ 모두 통과!" : `❌ ${failures}개 실패`)
