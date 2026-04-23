// Test a practice cluster by running each problem's solutionCode against its testCases.
// Usage: node scripts/test-practice-cluster.mjs <cluster-file-basename>
//   e.g. node scripts/test-practice-cluster.mjs cluster-structs

// Run via: npx tsx scripts/test-practice-cluster.mjs cluster-structs
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const PISTON_URL = 'https://168-144-96-207.sslip.io/api/v2/execute'
// Read key from .env.local
const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../.env.local')
const envText = readFileSync(envPath, 'utf8')
const keyMatch = envText.match(/NEXT_PUBLIC_PISTON_KEY=(.+)/)
const PISTON_KEY = keyMatch ? keyMatch[1].trim() : ''
if (!PISTON_KEY) { console.error('PISTON_KEY not found in .env.local'); process.exit(1) }

const basename = process.argv[2] || 'cluster-structs'
const mod = await import(`../data/practice/${basename}.ts`)
const cluster = Object.values(mod).find(v => v && v.problems)
if (!cluster) { console.error('No cluster export found'); process.exit(1) }

async function runPiston(code, stdin) {
  const res = await fetch(PISTON_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PISTON_KEY}`,
    },
    body: JSON.stringify({
      language: 'c++',
      version: '10.2.0',
      files: [{ name: 'main.cpp', content: code }],
      stdin,
    }),
  })
  if (!res.ok) return { error: `HTTP ${res.status}`, stdout: '' }
  const data = await res.json()
  if (data.compile && data.compile.code !== 0) {
    return { error: 'compile: ' + (data.compile.stderr || data.compile.output || '').split('\n')[0], stdout: '' }
  }
  const run = data.run || {}
  return { error: null, stdout: (run.stdout || '').trimEnd(), runCode: run.code, stderr: run.stderr || '' }
}

const norm = s => s.trimEnd()

let totalPass = 0, totalFail = 0, totalSkip = 0
const failures = []

for (const p of cluster.problems) {
  const header = `[${p.id}] ${p.title} (${p.difficulty})`
  if (!p.solutionCode || !p.testCases || p.testCases.length === 0) {
    console.log(`⊘  ${header} — no solutionCode/testCases, skipped`)
    totalSkip++
    continue
  }
  const results = []
  for (let i = 0; i < p.testCases.length; i++) {
    const tc = p.testCases[i]
    const r = await runPiston(p.solutionCode, tc.stdin)
    const actual = norm(r.stdout)
    const expected = norm(tc.expectedOutput)
    if (r.error) {
      results.push({ i, pass: false, reason: r.error, expected })
    } else if (actual === expected) {
      results.push({ i, pass: true })
    } else {
      results.push({ i, pass: false, actual, expected, reason: 'output mismatch' })
    }
  }
  const passed = results.filter(r => r.pass).length
  const allPass = passed === results.length
  if (allPass) {
    console.log(`✓  ${header} — ${passed}/${results.length}`)
    totalPass++
  } else {
    console.log(`✗  ${header} — ${passed}/${results.length}`)
    totalFail++
    for (const r of results) {
      if (!r.pass) {
        console.log(`   test[${r.i}] ${r.reason}`)
        if (r.actual !== undefined) {
          console.log(`     expected: ${JSON.stringify(r.expected)}`)
          console.log(`     actual:   ${JSON.stringify(r.actual)}`)
        }
      }
    }
    failures.push({ id: p.id, title: p.title, results })
  }
}

console.log(`\n=== Summary ===`)
console.log(`Pass:  ${totalPass}`)
console.log(`Fail:  ${totalFail}`)
console.log(`Skip:  ${totalSkip}`)
if (failures.length) process.exit(1)
