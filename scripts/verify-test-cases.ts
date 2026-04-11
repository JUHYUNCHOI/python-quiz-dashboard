/**
 * 연습 문제 테스트케이스 검증 스크립트
 * solutionCode를 실제로 컴파일/실행해서 expectedOutput과 비교
 *
 * 실행: npx ts-node scripts/verify-test-cases.ts
 */

import { execSync, spawnSync } from "child_process"
import * as fs from "fs"
import * as os from "os"
import * as path from "path"

// ── 클러스터 파일들을 직접 require ─────────────────────────────────────────
// TypeScript 타입 없이 raw JS로 로드하기 위해 직접 파싱
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
]

const PY_CLUSTER_FILES = [
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

interface TestCase {
  stdin: string
  expectedOutput: string
  label?: string
}

interface Problem {
  id: string
  title: string
  language?: string
  solutionCode?: string
  testCases?: TestCase[]
}

interface Cluster {
  id: string
  title: string
  problems: Problem[]
}

// ── 실행 헬퍼 ─────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n")
}

function runCpp(code: string, stdin: string): { output: string; error: string } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "verify-"))
  const srcFile = path.join(tmpDir, "main.cpp")
  const binFile = path.join(tmpDir, "main")

  try {
    fs.writeFileSync(srcFile, code)
    const compile = spawnSync("g++", ["-std=c++17", "-O2", "-o", binFile, srcFile], {
      encoding: "utf8",
      timeout: 10000,
    })
    if (compile.status !== 0) {
      return { output: "", error: `COMPILE ERROR: ${compile.stderr}` }
    }
    const run = spawnSync(binFile, [], {
      input: stdin,
      encoding: "utf8",
      timeout: 5000,
    })
    if (run.status !== 0) {
      return { output: "", error: `RUNTIME ERROR: ${run.stderr}` }
    }
    return { output: run.stdout, error: "" }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

function runPython(code: string, stdin: string): { output: string; error: string } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "verify-py-"))
  const srcFile = path.join(tmpDir, "main.py")

  try {
    fs.writeFileSync(srcFile, code)
    const run = spawnSync("python3", [srcFile], {
      input: stdin,
      encoding: "utf8",
      timeout: 5000,
    })
    if (run.status !== 0) {
      return { output: "", error: `RUNTIME ERROR: ${run.stderr}` }
    }
    return { output: run.stdout, error: "" }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

// ── 클러스터 로드 (eval 방식) ──────────────────────────────────────────────

function loadClusters(files: string[], dir: string): Cluster[] {
  const clusters: Cluster[] = []
  for (const file of files) {
    const filePath = path.join(dir, `${file}.ts`)
    if (!fs.existsSync(filePath)) continue
    try {
      // TypeScript → JS 변환 후 eval
      const tsContent = fs.readFileSync(filePath, "utf8")
      // import 제거, export 제거, type 어노테이션 단순화
      const jsContent = tsContent
        .replace(/^import .+$/gm, "")
        .replace(/^export const (\w+)/gm, "const $1")
        .replace(/^export \{[^}]+\}/gm, "")
        .replace(/: PracticeCluster/g, "")
        .replace(/: PracticeProblem/g, "")
        .replace(/difficulty: "쉬움" \| "보통" \| "어려움"/g, "difficulty")
        // Remove type assertions
        .replace(/ as const/g, "")

      // Extract the cluster object using regex on raw TS
      const match = tsContent.match(/export const \w+: PracticeCluster = ({[\s\S]+?^})/m)
      if (!match) continue

      // Use a simpler approach: find all problem ids, titles, solutionCodes, testCases
      const cluster = extractCluster(tsContent, file)
      if (cluster) clusters.push(cluster)
    } catch (e) {
      console.error(`Failed to load ${file}:`, e)
    }
  }
  return clusters
}

// ── 간단한 파싱: solutionCode와 testCases만 추출 ──────────────────────────

function extractCluster(tsContent: string, fileName: string): Cluster | null {
  // Extract cluster id and title
  const titleMatch = tsContent.match(/title:\s*["']([^"']+)["']/)
  const idMatch = tsContent.match(/id:\s*["']([^"']+)["']/)

  const problems: Problem[] = []

  // Extract each problem block by finding id + solutionCode + testCases
  // We'll use a state machine approach
  const lines = tsContent.split("\n")
  let currentId = ""
  let currentTitle = ""
  let currentLang = "cpp"
  let inSolutionCode = false
  let inTestCases = false
  let solutionCodeLines: string[] = []
  let currentTestCases: TestCase[] = []
  let inTestCase = false
  let currentStdin = ""
  let currentExpected = ""
  let depth = 0

  // Simpler: use regex to find all problems
  // Extract id fields (problem ids have format like "arr-001")
  const problemIds = [...tsContent.matchAll(/id:\s*["']([a-z]+-[a-zA-Z0-9]+)["']/g)].map(m => m[1])

  // For each problem, extract its solutionCode and testCases using string splitting
  for (const pid of problemIds) {
    const pidIdx = tsContent.indexOf(`id: "${pid}"`)
    if (pidIdx === -1) continue

    // Find the problem block (from this id to the next problem id or end)
    const nextPidIdx = problemIds
      .filter(p => p !== pid)
      .map(p => tsContent.indexOf(`id: "${p}"`))
      .filter(i => i > pidIdx)
      .reduce((min, i) => (i < min ? i : min), Infinity)

    const problemBlock = tsContent.slice(pidIdx, nextPidIdx === Infinity ? undefined : nextPidIdx)

    // Extract title
    const titleM = problemBlock.match(/title:\s*["']([^"']+)["']/)
    const title = titleM ? titleM[1] : pid

    // Extract language
    const langM = problemBlock.match(/language:\s*["'](cpp|python)["']/)
    const lang = langM ? langM[1] : "cpp"

    // Extract solutionCode (template literal)
    const solM = problemBlock.match(/solutionCode:\s*`([\s\S]*?)`(?=,?\s*\n\s*(solutionExplanation|en:|}\s*,))/)
    const solutionCode = solM ? solM[1] : undefined

    // Extract testCases
    const testCases: TestCase[] = []
    const tcBlockM = problemBlock.match(/testCases:\s*\[([\s\S]*?)\](?=,?\s*\n\s*(hints|solutionCode|scaffoldCode|en:|}\s*,))/)
    if (tcBlockM) {
      const tcBlock = tcBlockM[1]
      // Each test case: { stdin: "...", expectedOutput: "..." }
      const tcMatches = [...tcBlock.matchAll(/\{\s*stdin:\s*"((?:[^"\\]|\\.)*)"\s*,\s*expectedOutput:\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*label:\s*"[^"]*")?\s*\}/g)]
      for (const m of tcMatches) {
        testCases.push({
          stdin: m[1].replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"'),
          expectedOutput: m[2].replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"'),
          label: undefined,
        })
      }
    }

    if (solutionCode && testCases.length > 0) {
      problems.push({
        id: pid,
        title,
        language: lang,
        solutionCode,
        testCases,
      })
    }
  }

  return {
    id: idMatch ? idMatch[1] : fileName,
    title: titleMatch ? titleMatch[1] : fileName,
    problems,
  }
}

// ── 메인 ──────────────────────────────────────────────────────────────────

async function main() {
  const baseDir = path.join(__dirname, "../data/practice")

  console.log("🔍 연습 문제 테스트케이스 검증 시작...\n")

  const allFiles = [...CLUSTER_FILES, ...PY_CLUSTER_FILES]
  const clusters = loadClusters(allFiles, baseDir)

  let totalProblems = 0
  let totalTests = 0
  let failures = 0
  const failureList: string[] = []

  for (const cluster of clusters) {
    for (const problem of cluster.problems) {
      if (!problem.solutionCode || !problem.testCases?.length) continue
      totalProblems++

      for (let i = 0; i < problem.testCases.length; i++) {
        const tc = problem.testCases[i]
        totalTests++

        const runner = problem.language === "python" ? runPython : runCpp
        const { output, error } = runner(problem.solutionCode, tc.stdin)

        if (error) {
          failures++
          const msg = `❌ [${problem.id}] "${problem.title}" TC${i + 1}: ${error.split("\n")[0]}`
          failureList.push(msg)
          console.log(msg)
          continue
        }

        if (normalize(output) !== normalize(tc.expectedOutput)) {
          failures++
          const msg = [
            `❌ [${problem.id}] "${problem.title}" TC${i + 1}`,
            `   stdin:    ${tc.stdin.replace(/\n/g, "↵")}`,
            `   expected: ${tc.expectedOutput.replace(/\n/g, "↵")}`,
            `   actual:   ${output.trim().replace(/\n/g, "↵")}`,
          ].join("\n")
          failureList.push(msg)
          console.log(msg)
        }
      }
    }
  }

  console.log(`\n${"─".repeat(60)}`)
  console.log(`총 문제: ${totalProblems}개, 총 테스트: ${totalTests}개`)
  console.log(failures === 0 ? `✅ 모두 통과!` : `❌ ${failures}개 실패`)

  if (failures > 0) {
    console.log("\n실패 목록:")
    failureList.forEach(f => console.log(f))
  }
}

main().catch(console.error)
