/* 강조가 **보이는지** 화면에서 잰다.
 *
 * 왜 (2026-09-18): 선생님이 buymilk 말풍선을 보시고
 *   *"원래 강조할때는 색을 다르게 하거나 bold를 안해서 그런가? 안읽혀"*
 * 말풍선 **전체가 fontWeight 700** 이었다. 그래서 글쓴이가 `<b>` 로 짚어 둔 자리가
 * 주변과 **똑같아 보였다.** 다 굵으면 아무것도 강조가 아니다.
 *
 * ⚠️ 이건 소스로는 못 잡는다. `fontWeight: 700` 이 어느 요소에 붙었고 `<b>` 가 그 **안**에
 *    있는지는 정규식으로 알 수 없다(내가 그렇게 세어 보고 684건이 나왔는데 대부분 허수였다).
 *    **계산된 스타일로만** 알 수 있다 — 그래서 브라우저에서 잰다.
 *
 *   node scripts/check-emphasis.mjs http://localhost:3000/quest/buymilk
 *   node scripts/check-emphasis.mjs http://localhost:3000/quest/hps --max 20
 *
 * 나가는 값: 안 보이는 강조가 있으면 1. 화면이 안 뜨면 3.
 */
import { chromium } from 'playwright'

const url = process.argv[2]
if (!url) {
  console.error('쓰는 법: node scripts/check-emphasis.mjs <url> [--max N] [--lang ko|en]')
  process.exit(2)
}
const MAX = process.argv.includes('--max') ? +process.argv[process.argv.indexOf('--max') + 1] : 30
const LANG = process.argv.includes('--lang') ? process.argv[process.argv.indexOf('--lang') + 1] : 'ko'

/* 화면이 실제로 그려질 때까지 기다린다 (see-flow.mjs 와 같은 규칙).
   고정 대기는 서버가 밀리면 **조용히 틀린 답**을 낸다. */
async function waitForRender(p, label = '') {
  const DEADLINE = 90000, MIN_CHARS = 160, STABLE_NEEDED = 3
  const t0 = Date.now()
  let last = -1, stable = 0
  while (Date.now() - t0 < DEADLINE) {
    let n = 0
    try {
      n = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim().length)
    } catch { n = 0 }
    if (n >= MIN_CHARS && n === last) {
      if (++stable >= STABLE_NEEDED) return n
    } else stable = 0
    last = n
    await p.waitForTimeout(400)
  }
  console.error(`\n🚨 ${label || '화면'}이 안 떴다 (읽힌 글자 ${last}자). 여기서 나온 "0건" 은 결백이 아니다.`)
  process.exitCode = 3
  return last
}

const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()
await p.goto(url, { waitUntil: 'domcontentloaded' })
await waitForRender(p, url)
await p.evaluate((l) => localStorage.setItem('language', l), LANG)
await p.reload({ waitUntil: 'domcontentloaded' })
await waitForRender(p, url)

console.log(`\n=== ${url} (${LANG}) — 강조가 보이나 ===\n`)

const seen = new Set()
const found = []

for (let i = 0; i < MAX; i++) {
  const rows = await p.evaluate(() => {
    const out = []
    for (const em of document.querySelectorAll('b, strong')) {
      const txt = (em.textContent || '').trim()
      if (!txt) continue
      const ew = +getComputedStyle(em).fontWeight || 400
      const ec = getComputedStyle(em).color
      /* 강조가 얹힌 바탕 = 가장 가까운, 글이 실제로 흐르는 조상 */
      let host = em.parentElement
      while (host && (host.tagName === 'B' || host.tagName === 'STRONG')) host = host.parentElement
      if (!host) continue
      const hw = +getComputedStyle(host).fontWeight || 400
      const hc = getComputedStyle(host).color
      /* 굵기도 같고 색도 같으면 — 학생 눈에 강조가 **없다** */
      if (ew <= hw && ec === hc) {
        const around = (host.textContent || '').trim().replace(/\s+/g, ' ')
        out.push({ txt: txt.slice(0, 40), w: ew, hw, around: around.slice(0, 90) })
      }
    }
    return out
  })
  for (const r of rows) {
    const key = r.txt + '|' + r.around
    if (seen.has(key)) continue
    seen.add(key)
    found.push({ ...r, page: i + 1 })
  }

  const moved = await p.evaluate(() => {
    const btns = [...document.querySelectorAll('button')]
    const next = btns.filter((x) => /다음 →|Next →/.test(x.textContent || '')).pop()
      || btns.filter((x) => /다음 ▶|Next ▶/.test(x.textContent || '')).pop()
    if (!next || next.disabled) return false
    next.click()
    return true
  })
  if (!moved) break
  await p.waitForTimeout(700)
}

if (found.length === 0) {
  console.log('  안 보이는 강조 0건.\n')
} else {
  console.log(`  🚨 강조했는데 **안 보이는** 자리 ${found.length}건\n`)
  for (const f of found) {
    console.log(`   ${f.page}쪽  굵기 ${f.w} (바탕도 ${f.hw}) · 색도 같음`)
    console.log(`        강조: ${f.txt}`)
    console.log(`        바탕: ${f.around}\n`)
  }
  console.log('  → 바탕 글을 보통 굵기로 내리거나, 강조 쪽 색을 바꿔라.')
  console.log('     **다 굵으면 아무것도 강조가 아니다.**\n')
  process.exitCode = 1
}

await b.close()
