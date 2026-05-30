// Python 레슨 + 연습 클러스터 로컬 콘텐츠 감사
// - quiz/predict 스텝 중복 (lesson 내부)
// - practice 클러스터 중복 (cluster 내부 + cluster 간)
// 사용: node scripts/audit-local-py-content.mjs

import fs from "node:fs"
import path from "node:path"
import { glob } from "glob"

const norm = (s) => (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ")

// ---------- 1. Practice clusters ----------
console.log("=".repeat(60))
console.log("1. PYTHON PRACTICE CLUSTERS (data/practice/py-cluster-*.ts)")
console.log("=".repeat(60))

const clusterFiles = await glob("data/practice/py-cluster-*.ts")
const allCluster = []

for (const file of clusterFiles.sort()) {
  const txt = fs.readFileSync(file, "utf8")
  // Match { id: "...", title: "..." } objects
  const matches = [...txt.matchAll(/id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["']/g)]
  const name = path.basename(file, ".ts").replace("py-cluster-", "")
  console.log(`\n[${name}] ${matches.length}문제`)
  for (const m of matches) {
    allCluster.push({ cluster: name, id: m[1], title: m[2], file })
  }
}

console.log(`\n총 ${allCluster.length}개 practice 문제`)

// Cluster 내부 + 전체 중복 (id 기준)
const byId = {}
for (const p of allCluster) {
  byId[p.id] = byId[p.id] || []
  byId[p.id].push(p)
}
const dupIds = Object.entries(byId).filter(([, arr]) => arr.length > 1)
console.log(`\n[ID 중복] ${dupIds.length}개`)
for (const [id, arr] of dupIds) {
  console.log(`  ${id}: ${arr.map(a => a.cluster).join(", ")}`)
}

// 제목 중복
const byTitle = {}
for (const p of allCluster) {
  const k = norm(p.title)
  byTitle[k] = byTitle[k] || []
  byTitle[k].push(p)
}
const dupTitles = Object.entries(byTitle).filter(([, arr]) => arr.length > 1)
console.log(`\n[제목 중복] ${dupTitles.length}개`)
for (const [t, arr] of dupTitles.slice(0, 20)) {
  console.log(`  "${arr[0].title}"`)
  for (const a of arr) console.log(`    ${a.cluster}/${a.id}`)
}

// ---------- 2. Lesson-embedded quiz/predict ----------
console.log("\n" + "=".repeat(60))
console.log("2. LESSON-EMBEDDED QUIZ/PREDICT (data/lesson*.ts + data/lessons/)")
console.log("=".repeat(60))

const lessonFiles = [
  ...await glob("data/lesson*.ts"),
  ...await glob("data/lessons/**/*.ts"),
].filter(f => !f.endsWith("-en.ts") && !f.includes("lesson-types") && !f.endsWith("/index.ts"))

const allQuiz = []
for (const file of lessonFiles.sort()) {
  const txt = fs.readFileSync(file, "utf8")
  // Crude: count quiz objects with question fields
  // type: "quiz" 패턴 매칭
  const quizBlocks = [...txt.matchAll(/type:\s*["']quiz["'][\s\S]*?(?:question|prompt):\s*["`]([^"`]{20,200})["`]/g)]
  const predictBlocks = [...txt.matchAll(/type:\s*["']predict["'][\s\S]*?(?:question|prompt|code):\s*["`]([^"`]{10,200})["`]/g)]
  for (const m of quizBlocks) allQuiz.push({ kind: "quiz", text: m[1], file })
  for (const m of predictBlocks) allQuiz.push({ kind: "predict", text: m[1], file })
}
console.log(`\n총 quiz/predict 스텝 (텍스트 추출 기반 추정): ${allQuiz.length}개`)

const byQ = {}
for (const q of allQuiz) {
  const k = norm(q.text)
  byQ[k] = byQ[k] || []
  byQ[k].push(q)
}
const qDup = Object.entries(byQ).filter(([, arr]) => arr.length > 1)
console.log(`\n[질문 텍스트 동일 중복] ${qDup.length}개`)
for (const [, arr] of qDup.slice(0, 20)) {
  console.log(`  "${arr[0].text.slice(0, 70)}..."`)
  for (const a of arr) console.log(`    ${a.kind} @ ${a.file}`)
}

// ---------- 3. Cluster 충분량 verdict ----------
console.log("\n" + "=".repeat(60))
console.log("3. 클러스터별 충분량")
console.log("=".repeat(60))
const clusterCounts = {}
for (const p of allCluster) clusterCounts[p.cluster] = (clusterCounts[p.cluster] || 0) + 1
for (const [c, n] of Object.entries(clusterCounts).sort()) {
  const v = n < 10 ? "🚨 부족" : n < 15 ? "🟡 보강권장" : "✅ OK"
  console.log(`  ${c.padEnd(15)}: ${String(n).padStart(3)}문제  ${v}`)
}
