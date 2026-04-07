/**
 * migrate-practice-to-db.ts
 *
 * 기존 TS 파일의 practice 클러스터/문제를 SQL로 변환합니다.
 * 생성된 SQL을 Supabase SQL Editor에서 실행하세요.
 *
 * 실행: npx tsx scripts/migrate-practice-to-db.ts
 * 출력: scripts/output/practice-migration.sql
 */

import { writeFileSync, mkdirSync } from "fs"
import { ALL_CLUSTERS } from "../data/practice/index"
import type { PracticeCluster, PracticeProblem } from "../data/practice/types"

// SQL 문자열 이스케이프 (작은따옴표 처리)
function esc(str: string): string {
  return str.replace(/'/g, "''")
}

// 배열 → PostgreSQL TEXT[] 리터럴
function toTextArray(arr: string[]): string {
  const escaped = arr.map(s => `'${esc(s)}'`).join(", ")
  return `ARRAY[${escaped}]`
}

// 객체 → PostgreSQL JSONB 리터럴
function toJsonb(obj: unknown): string {
  return `'${esc(JSON.stringify(obj))}'::jsonb`
}

function generateSQL(): string {
  const lines: string[] = []

  lines.push("-- ============================================================")
  lines.push("-- practice-migration.sql")
  lines.push(`-- 생성일시: ${new Date().toISOString()}`)
  lines.push(`-- 총 클러스터: ${ALL_CLUSTERS.length}개`)
  lines.push(`-- 총 문제: ${ALL_CLUSTERS.reduce((sum, c) => sum + c.problems.length, 0)}개`)
  lines.push("-- Supabase SQL Editor에 붙여넣고 실행하세요")
  lines.push("-- ============================================================")
  lines.push("")
  lines.push("BEGIN;")
  lines.push("")

  // ── 1. practice_clusters ──────────────────────────────────
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

  // ── 2. practice_problems ─────────────────────────────────
  lines.push("-- ── 문제 ────────────────────────────────────────────────")

  for (const cluster of ALL_CLUSTERS) {
    lines.push(`-- 클러스터: ${cluster.title} (${cluster.problems.length}문제)`)

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
      lines.push(`  '${esc(p.constraints)}',`)
      lines.push(`  '${esc(p.initialCode)}',`)
      lines.push(`  ${toJsonb(p.testCases)},`)
      lines.push(`  ${toTextArray(p.hints)},`)
      lines.push(`  '${esc(p.solutionCode)}',`)
      lines.push(`  '${esc(p.solutionExplanation)}',`)
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
  lines.push(`-- 완료: ${ALL_CLUSTERS.reduce((sum, c) => sum + c.problems.length, 0)}개 문제 삽입/업데이트`)

  return lines.join("\n")
}

// 출력
mkdirSync("scripts/output", { recursive: true })
const sql = generateSQL()
writeFileSync("scripts/output/practice-migration.sql", sql, "utf-8")

const totalProblems = ALL_CLUSTERS.reduce((sum, c) => sum + c.problems.length, 0)
console.log(`✅ 생성 완료: scripts/output/practice-migration.sql`)
console.log(`   클러스터: ${ALL_CLUSTERS.length}개`)
console.log(`   문제: ${totalProblems}개`)
console.log(`\n다음 단계: Supabase SQL Editor에서 해당 파일 내용을 실행하세요.`)
