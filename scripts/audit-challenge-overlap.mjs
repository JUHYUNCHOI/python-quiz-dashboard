#!/usr/bin/env node
// ============================================================
// Audit — 수업 안의 코딩 step (tryit/mission/practice/fillblank/coding)
// vs Challenge cluster 의 문제. 겹침 가능성 시각 비교.
// ============================================================
//
// 출력:
//   - cluster 별로 묶어서, 해당 lesson 의 코딩 step 제목과
//     cluster set1 (첫 7 문제) 제목을 side-by-side 로 보여줌
//   - 텍스트 기반 단순 키워드 매칭 점수도 표시 (참고용)
//
// 사용:
//   node scripts/audit-challenge-overlap.mjs > scripts/output/challenge-overlap-report.md

import fs from "node:fs"
import path from "node:path"
import url from "node:url"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const CPP_LESSON_DIR = path.join(ROOT, "data/cpp")
const PRACTICE_DIR = path.join(ROOT, "data/practice")

const CODING_STEP_TYPES = new Set(["tryit", "mission", "practice", "fillblank", "coding"])

// ── 1. 수업 파일에서 코딩 step 추출 ─────────────────────────
function extractLessonCodingSteps(filePath) {
  const text = fs.readFileSync(filePath, "utf8")
  // id 추출 (cpp-N) — 파일 상단 `id: "cpp-N"`
  const idMatch = text.match(/id:\s*["'](cpp-\w+)["']/)
  if (!idMatch) return null
  const lessonId = idMatch[1]

  // 모든 step 블록 — type: "X" 와 다음 title: "..." 묶어 매칭
  // 단순 라인 스캔: type 발견 시 다음 5 줄 안에 title 있으면 그 한 쌍을 기록
  const lines = text.split("\n")
  const steps = []
  for (let i = 0; i < lines.length; i++) {
    const typeMatch = lines[i].match(/type:\s*["'](\w+)["']/)
    if (!typeMatch) continue
    if (!CODING_STEP_TYPES.has(typeMatch[1])) continue
    // 다음 5 줄 안에서 title 찾기
    let title = "(no title)"
    for (let j = i; j < Math.min(i + 6, lines.length); j++) {
      const tm = lines[j].match(/title:\s*["'`](.+?)["'`]/)
      if (tm) { title = tm[1]; break }
    }
    steps.push({ type: typeMatch[1], title })
  }
  return { lessonId, steps }
}

// ── 2. cluster 파일에서 문제 추출 ───────────────────────────
function extractCluster(filePath) {
  const text = fs.readFileSync(filePath, "utf8")
  // cluster id, title, unlockAfter — 파일 상단
  const idMatch = text.match(/id:\s*["'](\w+(?:-\w+)*)["']/)
  const titleMatch = text.match(/title:\s*["'](.+?)["']/)
  const unlockMatch = text.match(/unlockAfter:\s*["']([\w-]+)["']/)
  if (!idMatch || !unlockMatch) return null

  // 모든 problem block — `id: "loop-XXX"` 와 다음 title
  const problems = []
  const problemIdPattern = /id:\s*["']([a-z][\w-]+-\w+)["']/g
  let m
  while ((m = problemIdPattern.exec(text)) !== null) {
    const pid = m[1]
    // 같은 객체 안의 title 찾기 — id 발견 위치 이후 첫 title:
    const after = text.slice(m.index, m.index + 800)
    const tm = after.match(/title:\s*["'](.+?)["']/)
    const dm = after.match(/difficulty:\s*["'](\S+?)["']/)
    if (tm) {
      problems.push({
        id: pid,
        title: tm[1],
        difficulty: dm ? dm[1] : "?"
      })
    }
  }
  // 첫 problem 의 cluster.id 가 cluster file id 와 같은지 확인 (중복 제거)
  const uniqProblems = []
  const seen = new Set()
  for (const p of problems) {
    if (seen.has(p.id)) continue
    seen.add(p.id)
    uniqProblems.push(p)
  }
  return {
    clusterId: idMatch[1],
    clusterTitle: titleMatch ? titleMatch[1] : idMatch[1],
    unlockAfter: unlockMatch[1],
    problems: uniqProblems,
  }
}

// ── 3. 키워드 추출 (단순) ───────────────────────────────────
const STOPWORDS = new Set([
  "구하기", "출력하기", "찾기", "만들기", "쓰기", "읽기", "써보기",
  "✋", "✏️", "💪", "🎯", "📚", "📝", "→", "—",
  "the", "and", "of", "a", "to", "in", "is", "from", "using"
])
function tokenize(s) {
  const cleaned = s
    .toLowerCase()
    .replace(/[!?.,()[\]{}<>]/g, " ")
    .replace(/\s+/g, " ")
  const tokens = cleaned.split(" ").filter(t => t.length > 0 && !STOPWORDS.has(t))
  return new Set(tokens)
}
function overlapScore(a, b) {
  const A = tokenize(a)
  const B = tokenize(b)
  if (A.size === 0 || B.size === 0) return 0
  let common = 0
  for (const t of A) if (B.has(t)) common++
  return common / Math.min(A.size, B.size)  // 0 ~ 1
}

// ── 4. 메인 ──────────────────────────────────────────────────
function main() {
  // 수업 스캔
  const lessonFiles = fs
    .readdirSync(CPP_LESSON_DIR)
    .filter(f => /^lesson\d+\.ts$/.test(f))
    .map(f => path.join(CPP_LESSON_DIR, f))

  const lessonMap = new Map()  // cpp-N → { steps: [...] }
  for (const f of lessonFiles) {
    const data = extractLessonCodingSteps(f)
    if (data) lessonMap.set(data.lessonId, data)
  }

  // cluster 스캔 — cluster-*.ts 만 (py-, algo-, bank- 제외)
  const clusterFiles = fs
    .readdirSync(PRACTICE_DIR)
    .filter(f => f.startsWith("cluster-") && f.endsWith(".ts") && !f.includes("py-"))
    .map(f => path.join(PRACTICE_DIR, f))

  const clusters = []
  for (const f of clusterFiles) {
    const data = extractCluster(f)
    if (data && data.unlockAfter.startsWith("cpp-")) {
      clusters.push(data)
    }
  }
  clusters.sort((a, b) => {
    const na = parseInt(a.unlockAfter.replace("cpp-", ""))
    const nb = parseInt(b.unlockAfter.replace("cpp-", ""))
    return na - nb
  })

  // 리포트 출력
  const out = []
  out.push("# Challenge ↔ 수업 코딩 step 겹침 audit")
  out.push("")
  out.push("> 각 cluster 의 첫 7 문제 (set 1) 와, 해당 unlockAfter 수업의 코딩 step (tryit/mission/practice/fillblank/coding) 을 side-by-side. 겹침 점수는 단순 키워드 일치 기반 (0~1, 1 이면 거의 같은 단어). 0.4+ 는 주의, 0.6+ 는 거의 같음.")
  out.push("")
  out.push(`총 ${clusters.length} 개 C++ cluster | ${lessonMap.size} 개 수업 스캔`)
  out.push("")

  let totalOverlapHigh = 0
  let totalOverlapMed = 0
  let totalCompared = 0

  for (const c of clusters) {
    const lesson = lessonMap.get(c.unlockAfter)
    const lessonSteps = lesson?.steps ?? []
    const set1 = c.problems.slice(0, 7)

    out.push(`## ${c.clusterTitle} (\`${c.clusterId}\`) — unlock: ${c.unlockAfter}`)
    out.push("")
    out.push(`| Challenge set1 | difficulty | 겹침 점수 | 최고 매칭 수업 step |`)
    out.push(`|---|---|---|---|`)

    for (const p of set1) {
      let best = { score: 0, step: null }
      for (const s of lessonSteps) {
        const score = overlapScore(p.title, s.title)
        if (score > best.score) best = { score, step: s }
      }
      totalCompared++
      const flag = best.score >= 0.6 ? "🔴" : best.score >= 0.4 ? "🟡" : "🟢"
      if (best.score >= 0.6) totalOverlapHigh++
      else if (best.score >= 0.4) totalOverlapMed++
      const stepLabel = best.step
        ? `${flag} ${best.step.type}: ${best.step.title}`
        : `${flag} (수업에 코딩 step 없음)`
      out.push(`| ${p.title} | ${p.difficulty} | ${best.score.toFixed(2)} | ${stepLabel} |`)
    }
    out.push("")
    if (lessonSteps.length > 0) {
      out.push(`<details><summary>📖 ${c.unlockAfter} 의 전체 코딩 step ${lessonSteps.length} 개</summary>`)
      out.push("")
      for (const s of lessonSteps) {
        out.push(`- **${s.type}**: ${s.title}`)
      }
      out.push("")
      out.push(`</details>`)
      out.push("")
    } else {
      out.push(`⚠️ ${c.unlockAfter} 수업에 코딩 step (tryit/mission/practice/fillblank) 이 0 개`)
      out.push("")
    }
  }

  out.push("---")
  out.push("")
  out.push("## 요약 통계")
  out.push("")
  out.push(`- 총 비교: ${totalCompared} 문제`)
  out.push(`- 🔴 거의 같음 (0.6+): ${totalOverlapHigh} (${((totalOverlapHigh/totalCompared)*100).toFixed(0)}%)`)
  out.push(`- 🟡 주의 (0.4 ~ 0.6): ${totalOverlapMed} (${((totalOverlapMed/totalCompared)*100).toFixed(0)}%)`)
  out.push(`- 🟢 OK (< 0.4): ${totalCompared - totalOverlapHigh - totalOverlapMed} (${(((totalCompared - totalOverlapHigh - totalOverlapMed)/totalCompared)*100).toFixed(0)}%)`)
  out.push("")

  console.log(out.join("\n"))
}

main()
