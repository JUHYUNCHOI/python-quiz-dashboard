import { chromium } from 'playwright'

const targets = [
  {lesson:'8', chapter:0, step:3, label:'8/try1(ch0)'},
  {lesson:'8', chapter:3, step:4, label:'8/mission1(ch3,last)'},
  {lesson:'21', chapter:3, step:0, label:'21/mission1(ch3)'},
  {lesson:'22', chapter:3, step:0, label:'22/mission1(ch3)'},
  {lesson:'31', chapter:0, step:6, label:'31/ch1-6'},
  {lesson:'36', chapter:3, step:8, label:'36/ch4-8(last)'},
  {lesson:'42', chapter:4, step:5, label:'42/ch5-fb1(fillblank)'},
  {lesson:'45', chapter:1, step:1, label:'45/ch2-1(known bug)'},
  {lesson:'48', chapter:2, step:5, label:'48/ch3-5'},
  {lesson:'52', chapter:2, step:5, label:'52/ch3-2a(last lesson)'},
  {lesson:'10', chapter:0, step:2, label:'10/try1'},
  {lesson:'19', chapter:2, step:7, label:'19/mission2'},
]
const sizes = [{n:'desktop',w:1280,h:900},{n:'mobile',w:375,h:812}]
const b = await chromium.launch()

for (const t of targets) {
  for (const s of sizes) {
    const ctx = await b.newContext({viewport:{width:s.w,height:s.h}})
    const p = await ctx.newPage()
    await p.goto(`http://localhost:3000/learn/${t.lesson}?lang=ko`,{waitUntil:'domcontentloaded'})
    await p.evaluate(({lesson,chapter,step})=>{
      localStorage.setItem(`practice-v2-${lesson}`, JSON.stringify({chapter, step, completed:[]}))
    }, {lesson:t.lesson, chapter:t.chapter, step:t.step})
    await p.reload({waitUntil:'domcontentloaded'})
    await p.waitForTimeout(3500)
    const out = await p.evaluate(()=>{
      const inputs=[...document.querySelectorAll('input')].filter(i=>i.offsetParent)
      const bars=[...document.querySelectorAll('*')].filter(e=>{const c=getComputedStyle(e)
        return (c.position==='fixed'||c.position==='sticky')&&e.offsetHeight>24&&e.offsetWidth>150})
      const hits=[]
      const step=Math.round(innerHeight/4)
      for(let y=0;y<document.body.scrollHeight;y+=step){
        window.scrollTo(0,y)
        inputs.forEach((inp,i)=>{const r=inp.getBoundingClientRect()
          if(r.bottom<0||r.top>innerHeight) return
          bars.forEach(f=>{const g=f.getBoundingClientRect(); const c=getComputedStyle(f)
            if(r.bottom>g.top&&r.top<g.bottom&&r.right>g.left&&r.left<g.right)
              hits.push({y,blank:i,pos:c.position,cls:(f.className||'').toString().slice(0,44)})})})
      }
      // also check initial state without any scroll (y=0 already covered by loop start)
      return {viewport:innerHeight, blanks:inputs.length, hits, bodyH: document.body.scrollHeight}
    })
    const uniq=[...new Map(out.hits.map(h=>[h.blank+h.cls,h])).values()]
    console.log(`\n■ ${t.label} [${s.n} ${s.w}x${s.h}]  빈칸 ${out.blanks}개 bodyH=${out.bodyH}`)
    if(!uniq.length) console.log('   겹침 없음')
    uniq.forEach(h=>console.log(`   🚨 스크롤 ${h.y}px 빈칸#${h.blank} 가려짐 by [${h.pos}] ${h.cls}`))
    await p.evaluate((lesson)=>localStorage.removeItem(`practice-v2-${lesson}`), t.lesson)
    await ctx.close()
  }
}
await b.close()
