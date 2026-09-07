import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await (await b.newContext({viewport:{width:375,height:812}})).newPage()
await p.goto('http://localhost:3000/quest/rectangles?lang=ko', {waitUntil:'domcontentloaded'})
await p.waitForTimeout(3000)
for (let i=0;i<12;i++){
  await p.locator('button:has-text("다음")').last().click({timeout:2000}).catch(()=>{})
  await p.waitForTimeout(700)
}
await p.screenshot({path: process.argv[2], fullPage:false})
const cov = await p.evaluate(() => {
  const bars = [...document.querySelectorAll('*')].filter(e => {
    const c = getComputedStyle(e)
    return (c.position === 'fixed' || c.position === 'sticky') && e.offsetHeight > 24 && e.offsetWidth > 150
  })
  const targets = [...document.querySelectorAll('input, button, a, textarea')].filter(e => e.offsetParent)
  const out = []
  targets.forEach(t => {
    const q = t.getBoundingClientRect()
    if (!q.height || q.bottom < 0 || q.top > innerHeight) return
    bars.forEach(f => {
      if (f.contains(t)) return
      const g = f.getBoundingClientRect()
      if (q.bottom > g.top && q.top < g.bottom && q.right > g.left && q.left < g.right)
        out.push((t.tagName+' '+(t.textContent||t.placeholder||'').trim()).slice(0,40))
    })
  })
  return out
})
console.log('COVERED', cov)
await b.close()
