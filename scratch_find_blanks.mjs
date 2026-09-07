import fs from 'fs'
import path from 'path'

const dir = 'data'
const files = fs.readdirSync(dir).filter(f => /^lesson[0-9]+\.ts$/.test(f))

const results = []

for (const f of files) {
  const lessonId = f.match(/^lesson([0-9]+)\.ts$/)[1]
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n')
  let chapterIdx = -1
  let stepIdx = -1
  let curStepId = null
  let curType = null
  const found = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^    \{$/.test(line)) { chapterIdx++; stepIdx = -1 }
    if (/^        \{$/.test(line)) { stepIdx++; curStepId = null; curType = null }
    const idm = line.match(/^          id: "([^"]+)"/)
    if (idm) curStepId = idm[1]
    const tm = line.match(/^          type: "([^"]+)"/)
    if (tm) curType = tm[1]
    if (line.includes('___') && chapterIdx >= 0 && stepIdx >= 0) {
      found.push({ chapterIdx, stepIdx, stepId: curStepId, type: curType, lineNo: i+1 })
    }
  }
  // dedupe by chapterIdx/stepIdx
  const uniq = [...new Map(found.map(x => [x.chapterIdx+'-'+x.stepIdx, x])).values()]
  for (const u of uniq) results.push({ lessonId, ...u })
}

console.log(JSON.stringify(results, null, 0))
