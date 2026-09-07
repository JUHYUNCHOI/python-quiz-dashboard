import { chromium } from 'playwright'
const url = process.argv[2]
const prog = process.argv[3]
const mobile = process.argv.includes('--mobile')
const shotPrefix = process.argv[4]
const vp = mobile ? { width: 375, height: 812 } : { width: 1280, height: 900 }
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: vp })
const p = await ctx.newPage()
await p.goto(url, { waitUntil: 'domcontentloaded' })
let progKey = null
if (prog) {
  const [les, ch, st] = prog.split(':')
  progKey = `practice-v2-${les}`
  await p.evaluate(([k, c, s]) => localStorage.setItem(k, JSON.stringify({ chapter: +c, step: +s, completed: [] })), [progKey, ch, st])
  await p.reload({ waitUntil: 'domcontentloaded' })
}
await p.waitForTimeout(4500)
await p.screenshot({ path: `${shotPrefix}_top.png` })
for (let i = 1; i <= 4; i++) {
  await p.mouse.wheel(0, 400)
  await p.waitForTimeout(300)
  await p.screenshot({ path: `${shotPrefix}_scroll${i}.png` })
}
if (progKey) await p.evaluate(k => localStorage.removeItem(k), progKey)
await ctx.close(); await b.close()
