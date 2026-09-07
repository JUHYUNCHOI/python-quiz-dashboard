#!/usr/bin/env node
/**
 * 이야기를 한 화면에 펼친다 — quest·레슨의 **스텝 순서만** 뽑아서 보여준다.
 *
 * 왜 있나 (2026-09-07):
 *   moohunt 를 그날 하루에 여러 명이 검토했다. 디자이너는 겹침을, QA 는 동작을,
 *   나는 코드 표기와 말풍선을 봤다. 넷 다 진짜 결함을 찾았고 넷 다 고쳤다.
 *   그런데 선생님이 화면을 열자마자 하신 말은 이거였다:
 *     "기승전결 원인과 결과 등등이 없어보여서"
 *   그리고 그 지적이 맞았다.
 *
 *   원인은 실력이 아니라 **보는 단위**였다. 검토자는 한 쪽씩 열어서 그 쪽만 본다.
 *   한 쪽씩 보면 어느 쪽도 안 이상하다. 이상한 건 **쪽과 쪽 사이**다.
 *   선생님은 처음부터 전체를 한 덩어리로 보시니 그게 바로 보였다.
 *
 *   그래서 "전체를 보는 일" 을 공짜로 만든다. 13쪽을 13번 열지 말고 13줄로 읽는다.
 *
 * 쓰는 법 (프로젝트 루트에서):
 *   node scripts/see-flow.mjs http://localhost:3000/quest/moohunt
 *   node scripts/see-flow.mjs http://localhost:3000/quest/rectangles --lang en
 *
 * 무엇을 찍어주나:
 *   1) 스텝 번호 · 탭 · 그 쪽의 파란 내레이션 한 줄 (= 그 쪽이 하는 말)
 *   2) 시뮬이 있으면 그 안의 서브 단계가 몇 개인지 (분량이 튀는 자리를 찾으려고)
 *   3) 코드가 처음 나오는 자리
 *
 * 읽는 법 — 표를 손으로 채워라. 이게 이 도구의 전부다:
 *   각 줄 옆에 **"이 쪽은 앞 쪽의 어떤 질문에 답하나"** 를 한 줄로 적는다.
 *   못 적는 줄 = 이야기가 끊긴 자리다. 거기가 1순위다.
 *   근거: memory/feedback_intent_check_is_everyones_job.md
 */
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const url = args[0]
if (!url) {
  console.error('사용법: node scripts/see-flow.mjs <url> [--lang ko|en] [--max 40]')
  process.exit(1)
}
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'ko'
const MAX = args.includes('--max') ? +args[args.indexOf('--max') + 1] : 40
const NEXT = lang === 'en' ? 'Next →' : '다음 →'
const SUBNEXT = lang === 'en' ? 'Next ▶' : '다음 ▶'

const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push(e.message))

try {
  await p.goto(url, { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(2500)
  await p.evaluate((l) => localStorage.setItem('language', l), lang)
  await p.reload({ waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(4000)

  console.log(`\n=== ${url} (${lang}) — 이야기 전체 ===\n`)
  console.log('   쪽   위치     이 쪽이 하는 말')
  console.log('   ──────────────────────────────────────────────────────────────────────')

  let firstCode = null
  const rows = []
  for (let i = 0; i < MAX; i++) {
    const r = await p.evaluate(() => {
      const lines = document.body.innerText.split('\n').map((x) => x.trim()).filter(Boolean)
      const k = lines.findIndex((x) => /^\d+ \/ \d+$/.test(x))
      // 시뮬 안의 (n / m) 은 서브 단계 수
      const sub = lines.find((x) => /^\(\d+ \/ \d+\)$/.test(x))
      // 코드창이 있나 — 등폭 글꼴 줄이 여러 개 쌓여 있으면 코드다.
      // (CodeWalk 은 줄마다 따로 그린다. 한 덩어리 텍스트가 아니라 줄 수를 센다.)
      const monoLines = [...document.querySelectorAll('span,div,pre')].filter((e) => {
        if (e.children.length > 3) return false
        const f = getComputedStyle(e).fontFamily || ''
        const txt = (e.textContent || '').trim()
        return /JetBrains|monospace|Menlo|Consolas/i.test(f) && txt.length > 8
      }).length
      const hasCode = monoLines >= 6
      return { pos: lines[k] || '?', narr: (lines[k + 2] || lines[k + 1] || '').trim(), sub, hasCode }
    })
    const subTxt = r.sub ? ` [시뮬 ${r.sub.replace(/[()]/g, '').split(' / ')[1]}단계]` : ''
    if (r.hasCode && firstCode === null) firstCode = i + 1
    rows.push({ n: i + 1, pos: r.pos, narr: r.narr, subTxt, code: r.hasCode })
    console.log(
      `   ${String(i + 1).padStart(2)}   ${r.pos.padEnd(7)}  ${r.narr.slice(0, 52)}${r.code ? ' 〈코드〉' : ''}${subTxt}`
    )

    let moved = false
    try {
      const nb = await p.$(`button:has-text("${NEXT}")`)
      if (nb && (await nb.isEnabled())) { await nb.click(); moved = true }
    } catch {}
    if (!moved) break
    await p.waitForTimeout(650)
  }

  console.log('\n   ── 읽는 법 ────────────────────────────────────────────────────────────')
  console.log('   위 줄마다 "이 쪽은 앞 쪽의 어떤 질문에 답하나" 를 한 줄로 적어봐라.')
  console.log('   **못 적는 줄이 이야기가 끊긴 자리다.** 국소 결함보다 그게 먼저다.')
  console.log('   대조 기준: memory/quest_problem_standard.md 최상단')
  console.log('     도입 → 입출력 형식 → 자세한 예제 → 첫 코드 → 한계 → 더 빠르게')

  const heavy = rows.filter((r) => /시뮬 (\d+)단계/.exec(r.subTxt)?.[1] >= 8)
  if (heavy.length) {
    console.log(`\n   ⚠️ 서브 8단계 넘는 쪽: ${heavy.map((r) => r.n).join(', ')}`)
    console.log('      분량이 큰 쪽은 "이게 이 문제의 본질인가, 코드를 읽는 도구인가" 를 물어라.')
    console.log('      도구면 자리는 **그것을 쓰는 코드 직전**이다. 문제 이해 한복판이 아니다.')
  }
  console.log(`\n   첫 코드가 나오는 쪽: ${firstCode ?? '없음'} / 전체 ${rows.length}쪽`)
  if (errs.length) console.log(`\n   🚨 페이지 에러 ${errs.length}건: ${errs[0].slice(0, 80)}`)
} finally {
  await b.close()
}
