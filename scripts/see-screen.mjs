#!/usr/bin/env node
/**
 * 화면을 실제로 열어서 본다 — 검토자·QA·학생 에이전트용.
 *
 * 왜 있나 (2026-09-07):
 *   검토자들에게 "화면을 직접 보라" 고 시켰는데 볼 수단이 없었다.
 *   `tools:` 가 Read/Grep/Glob/Bash 뿐이라 브라우저 도구가 없다.
 *   에이전트 frontmatter 에 MCP 도구 이름을 적어봤지만 부여되지 않았다.
 *   그런데 **Bash 로 Playwright 를 돌리는 건 실제로 됐다** — 그날 ux-reviewer 와
 *   python-qa 가 그렇게 해서 "빈칸이 고정 바에 가려진다" 를 찾아냈다.
 *   그 길을 매번 각자 짜지 말고 여기 하나로 둔다.
 *
 * 쓰는 법 (반드시 프로젝트 루트에서 — 그래야 playwright 를 찾는다):
 *   node scripts/see-screen.mjs <url> [--mobile] [--progress 레슨:챕터:스텝] [--shot 파일명]
 *
 * 예:
 *   node scripts/see-screen.mjs http://localhost:3000/quest/moohunt
 *   node scripts/see-screen.mjs http://localhost:3000/learn/45 --progress 45:1:1 --mobile
 *
 * 무엇을 찍어주나:
 *   1) 화면 글자 (실제로 보이는 것만)
 *   2) 고정/스티키 요소가 **누르는 것**(input·button·a)을 가리는지 — 좌표로 실측
 *   3) 55자 넘는 내레이션·말풍선 (feedback_narration_short.md 기준)
 *   4) --shot 을 주면 스크린샷 파일
 *
 * ⚠️ --progress 로 옮긴 진도는 **끝나면 지운다** (선생님 진도가 아니다). 자동으로 지운다.
 */
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const url = args[0]
if (!url) { console.error('사용법: node scripts/see-screen.mjs <url> [--mobile] [--progress 45:1:1] [--shot out.png]'); process.exit(1) }
const mobile = args.includes('--mobile')
const prog = args[args.indexOf('--progress') + 1]
const shot = args.includes('--shot') ? args[args.indexOf('--shot') + 1] : null
const vp = mobile ? { width: 375, height: 812 } : { width: 1280, height: 900 }

const b = await chromium.launch()
const ctx = await b.newContext({ viewport: vp })
const p = await ctx.newPage()
await p.goto(url, { waitUntil: 'domcontentloaded' })

let progKey = null
if (args.includes('--progress')) {
  const [les, ch, st] = prog.split(':')
  progKey = `practice-v2-${les}`
  await p.evaluate(([k, c, s]) => localStorage.setItem(k, JSON.stringify({ chapter: +c, step: +s, completed: [] })), [progKey, ch, st])
  await p.reload({ waitUntil: 'domcontentloaded' })
}
await p.waitForTimeout(4500)

const r = await p.evaluate(() => {
  const bars = [...document.querySelectorAll('*')].filter(e => {
    const c = getComputedStyle(e)
    return (c.position === 'fixed' || c.position === 'sticky') && e.offsetHeight > 24 && e.offsetWidth > 150
  })
  const targets = [...document.querySelectorAll('input, button, a, textarea')].filter(e => e.offsetParent)
  const covered = []
  targets.forEach(t => {
    const q = t.getBoundingClientRect()
    if (!q.height || q.bottom < 0 || q.top > innerHeight) return
    bars.forEach(f => {
      if (f.contains(t)) return
      const g = f.getBoundingClientRect()
      if (q.bottom > g.top && q.top < g.bottom && q.right > g.left && q.left < g.right)
        covered.push({ what: (t.tagName + ' ' + (t.textContent || t.placeholder || '').trim()).slice(0, 40),
                       by: (f.className || '').toString().slice(0, 40) })
    })
  })
  const longText = [...document.querySelectorAll('p, div')]
    .filter(e => e.children.length === 0 && (e.textContent || '').trim().length > 55)
    .map(e => (e.textContent || '').trim()).slice(0, 8)
  return { text: document.body.innerText.slice(0, 3000), covered, longText }
})

console.log(`\n=== ${mobile ? '모바일 375×812' : '데스크탑 1280×900'} · ${url} ===\n`)
console.log(r.text)
console.log(`\n── 고정 요소에 가려진 것: ${r.covered.length}개`)
r.covered.slice(0, 10).forEach(c => console.log(`   🚨 ${c.what}  ← ${c.by}`))
console.log(`\n── 55자 넘는 문장: ${r.longText.length}개 (feedback_narration_short.md 기준)`)
r.longText.forEach(t => console.log(`   ${t.length}자: ${t.slice(0, 70)}…`))

if (shot) { await p.screenshot({ path: shot, fullPage: false }); console.log(`\n스크린샷: ${shot}`) }
if (progKey) await p.evaluate(k => localStorage.removeItem(k), progKey)   // 진도 원복
await ctx.close(); await b.close()
