import fs from 'fs'
import path from 'path'

const results = []

function scanStepsBlock(lines, chapterIdx) {
  let stepIdx = -1
  let curStepId = null, curType = null
  const found = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^    \{$/.test(line)) { stepIdx++; curStepId=null; curType=null }
    const idm = line.match(/^      id: "([^"]+)"/)
    if (idm) curStepId = idm[1]
    const tm = line.match(/^      type: "([^"]+)"/)
    if (tm) curType = tm[1]
    if (line.includes('___') && stepIdx >= 0) {
      found.push({ chapterIdx, stepIdx, stepId: curStepId, type: curType })
    }
  }
  return [...new Map(found.map(x=>[x.stepIdx,x])).values()]
}

const lessonsDir = 'data/lessons'
for (const d of fs.readdirSync(lessonsDir)) {
  const full = path.join(lessonsDir, d)
  if (!fs.statSync(full).isDirectory()) continue
  const idxPath = path.join(full, 'index.ts')
  if (!fs.existsSync(idxPath)) continue
  const idxSrc = fs.readFileSync(idxPath, 'utf8')
  const m = idxSrc.match(/chapters:\s*\[([^\]]+)\]/)
  if (!m) continue
  const chFiles = m[1].split(',').map(s=>s.trim()).filter(Boolean)
  const lessonId = d.replace('lesson','')
  chFiles.forEach((chVar, chapterIdx) => {
    const chFile = path.join(full, chVar + '.ts')
    if (!fs.existsSync(chFile)) return
    const lines = fs.readFileSync(chFile, 'utf8').split('\n')
    const found = scanStepsBlock(lines, chapterIdx)
    for (const f of found) results.push({ lessonId, ...f })
  })
}

fs.writeFileSync('scratch_blanks_dir.json', JSON.stringify(results))
console.log(results.length)
