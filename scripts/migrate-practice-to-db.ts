/**
 * migrate-practice-to-db.ts
 *
 * 기존 TS 파일의 practice 클러스터/문제를 SQL로 변환합니다.
 * 실행 전 데이터 유효성 검사를 먼저 수행합니다.
 *
 * 실행: npm run migrate-practice
 * 출력: scripts/output/practice-migration.sql
 */

import { writeFileSync, mkdirSync } from "fs"
import { ALL_CLUSTERS } from "../data/practice/index"
import type { PracticeCluster, PracticeProblem } from "../data/practice/types"

// ── 유효성 검사 ──────────────────────────────────────────────

interface ValidationError {
  cluster: string
  problemId?: string
  field?: string
  message: string
}

function validate(): ValidationError[] {
  const errors: ValidationError[] = []
  const seenProblemIds = new Set<string>()
  const seenClusterIds = new Set<string>()

  for (const cluster of ALL_CLUSTERS) {
    // 클러스터 필수 필드
    if (!cluster.id)          errors.push({ cluster: cluster.id, message: "cluster.id 없음" })
    if (!cluster.title)       errors.push({ cluster: cluster.id, message: "cluster.title 없음" })
    if (!cluster.unlockAfter) errors.push({ cluster: cluster.id, message: "cluster.unlockAfter 없음" })

    // 클러스터 ID 중복
    if (seenClusterIds.has(cluster.id)) {
      errors.push({ cluster: cluster.id, message: `클러스터 ID 중복: ${cluster.id}` })
    }
    seenClusterIds.add(cluster.id)

    for (const p of cluster.problems) {
      const loc = { cluster: cluster.id, problemId: p.id }

      // 문제 필수 필드
      if (!p.id)          errors.push({ ...loc, field: "id",    message: "problem.id 없음" })
      if (!p.title)       errors.push({ ...loc, field: "title", message: "title 없음" })
      if (!p.description) errors.push({ ...loc, field: "desc",  message: "description 없음" })
      if (!p.unlockAfter) errors.push({ ...loc, field: "unlock",message: "unlockAfter 없음" })
      if (!p.difficulty)  errors.push({ ...loc, field: "diff",  message: "difficulty 없음" })
      if (!p.initialCode) errors.push({ ...loc, field: "code",  message: "initialCode 없음" })

      // difficulty 값 검증
      if (!["쉬움", "보통", "어려움"].includes(p.difficulty)) {
        errors.push({ ...loc, field: "difficulty", message: `잘못된 difficulty: "${p.difficulty}"` })
      }

      // testCases 검증
      if (!Array.isArray(p.testCases) || p.testCases.length === 0) {
        errors.push({ ...loc, field: "testCases", message: "testCases 없거나 빈 배열" })
      } else {
        p.testCases.forEach((tc, i) => {
          if (tc.stdin === undefined || tc.stdin === null) {
            errors.push({ ...loc, field: `testCases[${i}].stdin`, message: "stdin 없음" })
          }
          // 빈 문자열("")은 유효 — "출력 없음" 케이스 허용
          if (tc.expectedOutput === undefined || tc.expectedOutput === null) {
            errors.push({ ...loc, field: `testCases[${i}].expectedOutput`, message: "expectedOutput가 undefined/null" })
          }
        })
      }

      // hints 검증
      if (!Array.isArray(p.hints)) {
        errors.push({ ...loc, field: "hints", message: "hints가 배열이 아님" })
      }

      // 문제 ID 중복
      if (p.id && seenProblemIds.has(p.id)) {
        errors.push({ ...loc, message: `문제 ID 중복: ${p.id}` })
      }
      if (p.id) seenProblemIds.add(p.id)

      // language 값 검증
      const lang = p.language ?? "cpp"
      if (!["cpp", "python"].includes(lang)) {
        errors.push({ ...loc, field: "language", message: `잘못된 language: "${lang}"` })
      }
    }
  }

  return errors
}

// ── SQL 생성 ──────────────────────────────────────────────────

function esc(str: string): string {
  return (str ?? "").replace(/'/g, "''")
}

function toTextArray(arr: string[]): string {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]"
  const escaped = arr.map(s => `'${esc(s)}'`).join(", ")
  return `ARRAY[${escaped}]`
}

function toJsonb(obj: unknown): string {
  return `'${esc(JSON.stringify(obj))}'::jsonb`
}

function generateSQL(): string {
  const lines: string[] = []
  const totalProblems = ALL_CLUSTERS.reduce((sum, c) => sum + c.problems.length, 0)

  lines.push("-- ============================================================")
  lines.push("-- practice-migration.sql")
  lines.push(`-- 생성일시: ${new Date().toISOString()}`)
  lines.push(`-- 총 클러스터: ${ALL_CLUSTERS.length}개 / 총 문제: ${totalProblems}개`)
  lines.push("-- ⚠️ 003_create_practice_tables.sql 먼저 실행 필요")
  lines.push("-- ON CONFLICT DO UPDATE → 재실행 안전 (기존 데이터 덮어씀)")
  lines.push("-- ============================================================")
  lines.push("")
  lines.push("BEGIN;")
  lines.push("")

  // ── clusters ─────────────────────────────────────────────
  lines.push("-- ── 클러스터 ─────────────────────────────────────────────")
  lines.push("INSERT INTO practice_clusters (id, title, emoji, description, unlock_after, language, sort_order)")
  lines.push("VALUES")

  const clusterRows: string[] = []
  ALL_CLUSTERS.forEach((cluster: PracticeCluster, idx: number) => {
    const lang = cluster.problems[0]?.language ?? "cpp"
    clusterRows.push(
      `  ('${esc(cluster.id)}', '${esc(cluster.title)}', '${esc(cluster.emoji)}', ` +
      `'${esc(cluster.description)}', '${esc(cluster.unlockAfter)}', '${lang}', ${idx})`
    )
  })
  lines.push(clusterRows.join(",\n"))
  lines.push("ON CONFLICT (id) DO UPDATE SET")
  lines.push("  title        = EXCLUDED.title,")
  lines.push("  emoji        = EXCLUDED.emoji,")
  lines.push("  description  = EXCLUDED.description,")
  lines.push("  unlock_after = EXCLUDED.unlock_after,")
  lines.push("  language     = EXCLUDED.language,")
  lines.push("  sort_order   = EXCLUDED.sort_order,")
  lines.push("  updated_at   = NOW();")
  lines.push("")

  // ── problems ─────────────────────────────────────────────
  lines.push("-- ── 문제 ────────────────────────────────────────────────")

  for (const cluster of ALL_CLUSTERS) {
    lines.push(`-- [${cluster.id}] ${cluster.title} (${cluster.problems.length}문제)`)

    cluster.problems.forEach((p: PracticeProblem, idx: number) => {
      const lang = p.language ?? "cpp"
      lines.push(
        `INSERT INTO practice_problems ` +
        `(id, cluster_id, unlock_after, difficulty, title, description, constraints, ` +
        `initial_code, test_cases, hints, solution_code, solution_explanation, language, sort_order) VALUES (`
      )
      lines.push(`  '${esc(p.id)}',`)
      lines.push(`  '${esc(cluster.id)}',`)
      lines.push(`  '${esc(p.unlockAfter)}',`)
      lines.push(`  '${esc(p.difficulty)}',`)
      lines.push(`  '${esc(p.title)}',`)
      lines.push(`  '${esc(p.description)}',`)
      lines.push(`  '${esc(p.constraints ?? "")}',`)
      lines.push(`  '${esc(p.initialCode ?? "")}',`)
      lines.push(`  ${toJsonb(p.testCases)},`)
      lines.push(`  ${toTextArray(p.hints ?? [])},`)
      lines.push(`  '${esc(p.solutionCode ?? "")}',`)
      lines.push(`  '${esc(p.solutionExplanation ?? "")}',`)
      lines.push(`  '${lang}',`)
      lines.push(`  ${idx}`)
      lines.push(`) ON CONFLICT (id) DO UPDATE SET`)
      lines.push(`  cluster_id           = EXCLUDED.cluster_id,`)
      lines.push(`  unlock_after         = EXCLUDED.unlock_after,`)
      lines.push(`  difficulty           = EXCLUDED.difficulty,`)
      lines.push(`  title                = EXCLUDED.title,`)
      lines.push(`  description          = EXCLUDED.description,`)
      lines.push(`  constraints          = EXCLUDED.constraints,`)
      lines.push(`  initial_code         = EXCLUDED.initial_code,`)
      lines.push(`  test_cases           = EXCLUDED.test_cases,`)
      lines.push(`  hints                = EXCLUDED.hints,`)
      lines.push(`  solution_code        = EXCLUDED.solution_code,`)
      lines.push(`  solution_explanation = EXCLUDED.solution_explanation,`)
      lines.push(`  language             = EXCLUDED.language,`)
      lines.push(`  sort_order           = EXCLUDED.sort_order,`)
      lines.push(`  updated_at           = NOW();`)
      lines.push("")
    })
  }

  lines.push("COMMIT;")
  lines.push("")
  lines.push(`-- ✅ 완료: 클러스터 ${ALL_CLUSTERS.length}개, 문제 ${totalProblems}개 삽입/업데이트`)
  return lines.join("\n")
}

// ── 실행 ─────────────────────────────────────────────────────

console.log("🔍 데이터 유효성 검사 중...")
const errors = validate()

if (errors.length > 0) {
  console.error(`\n❌ 검사 실패 — ${errors.length}개 오류:\n`)
  errors.forEach(e => {
    const loc = e.problemId ? `[${e.cluster} > ${e.problemId}]` : `[${e.cluster}]`
    console.error(`  ${loc} ${e.field ? `(${e.field}) ` : ""}${e.message}`)
  })
  console.error("\nSQL 생성을 중단합니다. 위 오류를 수정 후 다시 실행하세요.")
  process.exit(1)
}

const totalProblems = ALL_CLUSTERS.reduce((sum, c) => sum + c.problems.length, 0)
console.log(`✅ 검사 통과 — 클러스터 ${ALL_CLUSTERS.length}개, 문제 ${totalProblems}개`)
console.log("📝 SQL 생성 중...")

mkdirSync("scripts/output", { recursive: true })
const sql = generateSQL()
writeFileSync("scripts/output/practice-migration.sql", sql, "utf-8")

console.log(`\n✅ 완료: scripts/output/practice-migration.sql`)
console.log("\n다음 단계:")
console.log("  1. Supabase SQL Editor에서 003_create_practice_tables.sql 실행 (테이블 생성)")
console.log("  2. 이어서 scripts/output/practice-migration.sql 실행 (데이터 삽입)")
