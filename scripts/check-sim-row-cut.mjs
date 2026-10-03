#!/usr/bin/env node
/**
 * check-sim-row-cut.mjs
 *   — **격자·표의 칸이 모바일에서 화면(또는 상자) 밖으로 잘려 나갔나.** 좌표로 잰다.
 *
 *   node scripts/check-sim-row-cut.mjs [quest-id ...] [--all] [--desktop] [--en] [--steps N]
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 생겼나 (2026-10-03)
 *
 * 선생님: *"그림만 보고도 뭐 하려는건지 알수가 없을까?"* — 그래서 학생에게
 * 「글을 안 읽은 셈 치고 그림만 보라」고 시켰다. `checkups` 학생(초6):
 *   *"**6번째 칸이 화면 오른쪽에서 계속 잘려서 안 보임.** 말풍선은 「6번 자리:
 *     위6, 아래6」이라고 하는데 표의 6번 칸 자체가 화면 밖."*
 *   *"구간 네모가 어디서 끝나는지 그림으로 확인 불가. 5번 칸이 화면 밖."*
 * `pedagogy-reviewer` 가 **독립적으로 같은 것**을 보고했다 —
 *   *"격자 6칸 중 2칸(자리 4,5)이 화면 밖으로 밀려 스크롤해야 보인다.
 *     하필 이 시뮬의 핵심이 「양 끝 두 칸」인데, 그 끝이 화면에 없다."*
 * 실측(375×812, 한국어, 문제 1/5): 격자가 x=385 까지 가는데 창은 375,
 * 담은 상자는 318 에서 끝난다 — **「1 2 3 4 5 6」 중 5·6 이 밖.**
 *
 * ⭐ **기존 검사기가 원리상 못 본다.**
 *   `see-screen.mjs` 는 겹침을 재기 전에 `clipped(e)` 로 **잘린 요소를 걸러낸다**
 *   (`boxes` 필터의 `if (inFixed(e) || clipped(e)) return false`). 잘림은 그
 *   도구가 **찾는 대상이 아니라 제외 조건**이다. `check-fixed-bar-overlap` 은
 *   「클릭을 뺏기나」만 본다 — 격자 칸은 클릭 대상이 아니다.
 *   `check-codewalk-bubble-hidden` 은 말풍선과 바 두 관계만 본다.
 *   그래서 사람 셋이 다 통과시켰다.
 *
 * ⭐ **잣대를 좁게 잡는다** (오탐이 나면 진짜 건이 묻힌다):
 *   ① **같은 줄에 칸이 4개 이상** 늘어서 있어야 한다 (한두 개는 격자가 아니다)
 *   ② 칸은 **작고 네모나야** 한다 (12~70px) — 문장 상자는 격자가 아니다
 *   ③ 칸 안 글자는 **3자 이하** — 숫자·기호 칸만 본다
 *   ④ 그중 **오른쪽 끝이 창 또는 담은 상자 밖으로 나간** 칸만 신고한다
 *   ⑤ 칸 **크기가 고르지 않으면** 격자가 아니다 (폭이 25% 넘게 흔들리면 뺀다) —
 *     같은 줄에 우연히 나란히 선 남남을 격자로 묶는 오탐을 막는다.
 *   ⛔ **가로 스크롤이 되는 상자(`overflow-x: auto|scroll`)는 신고하지 않는다** —
 *     표를 옆으로 미는 건 설계된 정상 동작이다(CLAUDE.md 의 반응형 규칙).
 *     `hidden`·`clip` 이거나 **창 자체를 넘은** 것만 진짜 잘림이다.
 *
 * ⛔ **병렬로 돌리지 마라** — 같은 dev 서버·Chromium 경쟁 조건에서 조용히 «0곳»
 *   이 나온 전례가 둘 있다(`check-fixed-bar-overlap` 8병렬 → 180개 중 169개 거짓 0).
 *
 * ⛔⛔ **quest 를 고친 **직후**에 돌리지 마라 — dev 서버가 아직 다시 컴파일 중이다.**
 *   2026-10-03 실측: `abcs` 를 고치고 **5초** 뒤에 돌리니 **✅(0건)**, 같은 상태에서
 *   **18초** 뒤에 돌리니 **🚨** 가 떴다. **검사기가 틀린 게 아니라 내가 옛 화면을 읽혔다.**
 *   `--selftest` 로도 이건 못 잡는다(그건 `setContent` 라 서버를 안 탄다).
 *   ⭐ 고친 뒤에는 **15초 이상 기다리고** 돌려라. 그리고 **눈으로도 한 번 봐라** —
 *     이 저장소에서 「검사기 ✅ 인데 화면은 잘려 있던」 날이 같은 날 또 있었다.
 *
 * ⭐ `--selftest` 로 **잣대가 사는지 먼저 봐라** — 격자를 일부러 좁은 상자에
 *   넣어 잘리게 만든다. 거기서 🚨 가 안 나오면 잣대가 죽은 것이다.
 */
import { chromium } from 'playwright'
import { readdirSync, existsSync } from 'node:fs'

const argv = process.argv.slice(2)
const flag = (n) => argv.includes(n)
const MOBILE = !flag('--desktop')
const LANG = flag('--en') ? 'en' : 'ko'
const MAXSTEPS = (() => { const i = argv.indexOf('--steps'); return i >= 0 ? +argv[i + 1] : 14 })()
const SELFTEST = flag('--selftest')
let ids = argv.filter((a) => !a.startsWith('--') && !/^\d+$/.test(a))

const QDIR = 'quest-problems'
if (!ids.length || flag('--all')) {
  ids = readdirSync(QDIR).filter((d) => existsSync(`${QDIR}/${d}/components.jsx`)).sort()
}

/* 브라우저 안에서 도는 잣대 — 위 ①~④ 를 그대로 옮긴 것이다. */
const PROBE = () => {
  const W = window.innerWidth
  const leaves = [...document.querySelectorAll('div,span,td,th')].filter((el) => {
    if (el.children.length) return false
    const txt = (el.textContent || '').trim()
    if (!txt || txt.length > 3) return false                  // ③ 숫자·기호 칸만
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false
    const r = el.getBoundingClientRect()
    return r.width >= 12 && r.width <= 70 && r.height >= 12 && r.height <= 70   // ② 작고 네모
  })
  const rows = new Map()
  for (const el of leaves) {
    const y = Math.round(el.getBoundingClientRect().top / 6) * 6
    if (!rows.has(y)) rows.set(y, [])
    rows.get(y).push(el)
  }
  const hits = []
  for (const [y, els] of rows) {
    if (els.length < 4) continue                              // ① 4개 이상
    const sorted = els.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
    /* ⑤ 2026-10-03 — **칸 크기가 고르지 않으면 격자가 아니다.**
       처음엔 이 조건이 없어서 `lifeguards` 에서 「🏊 대회 'r' as」 가 걸렸다 —
       같은 줄에 **우연히 나란히 있을 뿐인 남남**을 한 격자로 묶은 것이다(2px 초과).
       진짜 시뮬 격자는 칸이 **한 치수**다(실측: checkups 36·31·27 / astral 44 /
       abcs — 전부 줄 안에서 같은 폭). 폭이 25% 넘게 흔들리면 격자로 안 본다. */
    const ws = sorted.map((e) => e.getBoundingClientRect().width)
    const wMin = Math.min(...ws), wMax = Math.max(...ws)
    if (wMax > wMin * 1.25) continue
    /* 담은 «클립» 상자를 찾는다. 가로 스크롤이 되면 정상이라 기록만 해 둔다. */
    let clipRight = W, scrollable = false
    for (let p = sorted[0].parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX
      if (!/auto|scroll|hidden|clip/.test(ox)) continue
      if (/auto|scroll/.test(ox)) { scrollable = true; break }  // ⛔ 옆으로 밀 수 있으면 정상
      clipRight = Math.min(clipRight, p.getBoundingClientRect().right)
      break
    }
    /* ⛔ 2026-10-03 — **여기서 조용히 틀렸다.** 처음엔 「가로 스크롤 상자인데 내용이
       창을 넘으면」 신고했다. 그러면 **코드 상자 안의 코드 토막이 전부 걸린다** —
       실측 30개 중 15개가 걸렸고 그 태반이 `for in len arr` 같은 코드였다.
       코드 상자는 **일부러** 옆으로 밀게 만든 것이다(커밋 `c820592b` — 「코드가
       가로로 밀린다는 신호를 준다」). 옆으로 밀 수 있으면 학생은 볼 수 있다.
       → **스크롤되면 무조건 건너뛴다.** 진짜 잘림은 `hidden`·`clip` 이라
         **어떻게 해도 볼 수 없는** 경우뿐이다. */
    if (scrollable) continue
    const limit = Math.min(clipRight, W)
    const cut = sorted.filter((e) => e.getBoundingClientRect().right > limit + 1)
    if (!cut.length) continue
    hits.push({
      y, n: sorted.length, text: sorted.map((e) => e.textContent.trim()).join(' '),
      cutText: cut.map((e) => e.textContent.trim()).join(' '), cutN: cut.length,
      rightmost: Math.round(sorted[sorted.length - 1].getBoundingClientRect().right),
      limit: Math.round(limit), W, scrollable,
    })
  }
  return hits
}

const SELFTEST_HTML = `<!doctype html><body style="margin:0">
  <div style="width:140px;overflow-x:hidden;border:1px solid #000">
    <div style="display:flex;gap:4px;width:400px">
      ${[1, 2, 3, 4, 5, 6].map((v) => `<div style="width:40px;height:30px;border:1px solid #999">${v}</div>`).join('')}
    </div>
  </div></body>`

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: MOBILE ? { width: 375, height: 812 } : { width: 1280, height: 900 } })
const page = await ctx.newPage()

if (SELFTEST) {
  await page.setContent(SELFTEST_HTML)
  const hits = await page.evaluate(PROBE)
  console.log(hits.length
    ? `✅ 잣대가 살아 있다 — 일부러 잘라 둔 격자를 잡았다: 「${hits[0].text}」 중 「${hits[0].cutText}」`
    : `🚨 잣대가 죽었다 — 일부러 잘린 격자를 못 잡았다. 고치기 전엔 이 검사기를 믿지 마라.`)
  await browser.close()
  process.exit(hits.length ? 0 : 1)
}

let found = 0, walked = 0, skipped = []
for (const id of ids) {
  const url = `http://localhost:3000/quest/${id}?lang=${LANG}`
  let pageHits = []
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
    await page.waitForTimeout(1800)
    /* 쪽을 넘기며 본다. 시뮬 걸음도 같이 밟는다 — 잘림은 걸음마다 다를 수 있다. */
    for (let p = 0; p < MAXSTEPS; p++) {
      for (const h of await page.evaluate(PROBE)) pageHits.push({ ...h, page: p + 1, step: 0 })
      // 그 쪽의 시뮬 걸음
      for (let s = 1; s <= 6; s++) {
        const moved = await page.evaluate(() => {
          const b = [...document.querySelectorAll('button')].find((x) => /^(다음 ▶|▶ 다음|Next ▶)$/.test((x.textContent || '').trim()))
          if (!b || b.disabled) return false
          b.click(); return true
        })
        if (!moved) break
        await page.waitForTimeout(450)
        for (const h of await page.evaluate(PROBE)) pageHits.push({ ...h, page: p + 1, step: s })
      }
      const next = await page.evaluate(() => {
        const b = [...document.querySelectorAll('button')].find((x) => /다음 쪽|Next page/.test((x.textContent || '').trim()))
        if (!b || b.disabled) return false
        b.click(); return true
      })
      if (!next) break
      await page.waitForTimeout(900)
    }
    walked++
  } catch (e) {
    skipped.push(`${id} (${String(e.message).slice(0, 48)})`)
    continue
  }
  /* 같은 줄이 걸음마다 또 걸리므로 글자로 묶는다. */
  const uniq = new Map()
  for (const h of pageHits) if (!uniq.has(h.text + h.cutText)) uniq.set(h.text + h.cutText, h)
  if (!uniq.size) { console.log(`  ✅ ${id.padEnd(20)} — 격자가 화면 안에 다 들어온다`); continue }
  found++
  console.log(`  🚨 ${id}`)
  for (const h of [...uniq.values()].slice(0, 5)) {
    console.log(`       ${h.page}쪽${h.step ? ` 걸음 ${h.step}` : ''} · 칸 ${h.n}개 「${h.text}」 중 **「${h.cutText}」 ${h.cutN}칸이 밖** (맨오른쪽 ${h.rightmost} > 한계 ${h.limit}, 창 ${h.W})`)
  }
}

console.log(`\nquest ${ids.length}개 중 ${walked}개를 실제로 밟았고, **${found}개에서 찾았다.** (${MOBILE ? '모바일 375' : '데스크탑 1280'} · ${LANG})`)
if (skipped.length) console.log(`⚠️ 못 밟은 것 ${skipped.length}개: ${skipped.slice(0, 6).join(' · ')}`)
console.log(`⚠️ **0건이 결백이 아니다** — 쪽 ${MAXSTEPS}개·걸음 6개까지만 본다. 글자가 4자 이상인 칸,`)
console.log(`   세로로 잘린 것, 가로 스크롤 상자 안쪽은 **일부러 안 본다.**`)
console.log(`⭐ 먼저 \`--selftest\` 로 잣대가 사는지 봐라.`)
await browser.close()
