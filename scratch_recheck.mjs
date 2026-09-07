import { chromium } from 'playwright'
const targets = [
  {lesson:'31', chapter:0, step:6, label:'31/ch1-6'},
  {lesson:'42', chapter:4, step:5, label:'42/ch5-fb1(fillblank)'},
]
const b = await chromium.launch()
for (const t of targets) {
  const ctx = await b.newContext({viewport:{width:1280,height:900}})
  const p = await ctx.newPage()
  await p.goto(`http://localhost:3000/learn/${t.lesson}?lang=ko`,{waitUntil:'domcontentloaded'})
  await p.evaluate(({lesson,chapter,step})=>{
    localStorage.setItem(`practice-v2-${lesson}`, JSON.stringify({chapter, step, completed:[]}))
  }, t)
  await p.reload({waitUntil:'domcontentloaded'})
  await p.waitForTimeout(5000)
  const out = await p.evaluate(()=>({
    bodyH: document.body.scrollHeight,
    title: document.querySelector('h1,h2,h3')?.textContent?.slice(0,60),
    inputCount: document.querySelectorAll('input').length,
    blankSpanCount: document.querySelectorAll('[data-blank],.blank,[contenteditable]').length,
    text: document.body.innerText.slice(0,300)
  }))
  console.log(t.label, JSON.stringify(out))
  await p.evaluate((lesson)=>localStorage.removeItem(`practice-v2-${lesson}`), t.lesson)
  await ctx.close()
}
await b.close()
