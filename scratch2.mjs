import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 375, height: 900 } })
const p = await ctx.newPage()
await p.goto('http://localhost:3000/quest/wordproc', { waitUntil: 'domcontentloaded' })
await p.waitForFunction(() => document.body.innerText.length > 200, { timeout: 20000 })
console.log(await p.evaluate(()=>[...document.querySelectorAll('button')].map(b=>b.textContent.trim()).slice(0,20)))
