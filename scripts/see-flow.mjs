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
 *      + **시뮬 안의 첫 말풍선** — 이야기는 시뮬 안에서도 진행된다.
 *        (첫 판은 내레이션만 긁었다. 그런데 정작 그날 잡힌 결함은 시뮬 1단계 안에
 *         숨어 있어서 이 도구로는 못 잡았을 것이다. project-lead 가 자기 손으로
 *         돌려보고 그렇게 보고했다 — "이 도구는 오늘 문제를 못 잡았을 겁니다.")
 *   2) 시뮬이 있으면 그 안의 서브 단계가 몇 개인지 (분량이 튀는 자리를 찾으려고)
 *   3) 코드가 처음 나오는 자리
 *
 * 읽는 법 — 표를 손으로 채워라. 이게 이 도구의 전부다:
 *   각 줄 옆에 **"이 쪽은 앞 쪽의 어떤 질문에 답하나"** 를 한 줄로 적는다.
 *   못 적는 줄 = 이야기가 끊긴 자리다. 거기가 1순위다.
 *   근거: memory/feedback_intent_check_is_everyones_job.md
 */
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'

const args = process.argv.slice(2)
const url = args[0]
if (!url) {
  console.error('사용법: node scripts/see-flow.mjs <url> [--lang ko|en] [--max 40] [--allow-dirty]')
  process.exit(1)
}
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'ko'
const MAX = args.includes('--max') ? +args[args.indexOf('--max') + 1] : 40
const NEXT = lang === 'en' ? 'Next →' : '다음 →'
const SUBNEXT = lang === 'en' ? 'Next ▶' : '다음 ▶'
const allowDirty = args.includes('--allow-dirty')

/* ① 검토 파견 전 게이트 — 그 quest 가 **완전히 커밋된 상태**인지 본다.
   see-screen.mjs 와 같은 이유·같은 모양이다 (거기 주석이 원본, 여기는 사본).
   왜 (2026-09-23): cowsignal·strangefn — 검토자·학생이 **커밋 전** 화면을 보고
   틀린 결함/틀린 숫자를 보고했다. PM: "편집이 끝나기 전에 리뷰어를 보냈다."
   빠져나갈 문: `--allow-dirty` (쓰면 막지 않되 크게 떠든다). */
function gateOnUncommittedQuest(rawUrl, bypass) {
  const m = /\/quest\/([a-zA-Z0-9_-]+)/.exec(rawUrl || '')
  if (!m) return
  const id = m[1]
  const dir = `quest-problems/${id}/`
  let out
  try {
    out = execSync(`git status --porcelain -- ${JSON.stringify(dir)}`, { encoding: 'utf8' })
  } catch {
    return
  }
  if (!out.trim()) return
  const lines = out.trim().split('\n')
  if (bypass) {
    console.error(`\n⚠️⚠️⚠️  ${id} 가 아직 커밋되지 않았다 — --allow-dirty 로 그대로 본다.`)
    lines.forEach((l) => console.error(`    ${l}`))
    console.error('    지금 보는 이야기 흐름은 최종본이 아닐 수 있다.')
    console.error('    보고에 "커밋 전 상태로 봤다" 고 적어라.\n')
    return
  }
  console.error(`\n🚨 ${id} 가 아직 커밋되지 않았다 — 이 화면을 검토자·학생에게 보이지 마라.`)
  lines.forEach((l) => console.error(`    ${l}`))
  console.error(`\n   git status --porcelain -- ${dir}`)
  console.error('   커밋을 마치고 다시 돌리거나, 방금 고친 걸 미리 보려면 --allow-dirty 를 붙여라.')
  console.error('   (cowsignal·strangefn 사고 — 편집 중 화면을 검토자가 그대로 본 것. 2026-09-23)\n')
  process.exit(3)
}
gateOnUncommittedQuest(url, allowDirty)

/* ② HMR 재시도 — see-screen.mjs 와 같은 이유·같은 모양이다 (거기 주석이 원본).
   Turbopack 이 저장 중인 파일을 읽으면 깨진 청크(`SyntaxError: Invalid or unexpected
   token`)를 낸다. 막지 않고 2~3초 뒤 재시도, 그래도 안 없어지면 exit 3. */
const HMR_NOISE_RX = /SyntaxError: Invalid or unexpected token|\[Fast Refresh\] rebuilding|ChunkLoadError|Loading chunk [\w.-]* failed|Failed to fetch dynamically imported module/
function attachHmrWatch(p) {
  const state = { lastAt: 0, count: 0 }
  const mark = () => { state.lastAt = Date.now(); state.count++ }
  p.on('pageerror', (e) => { if (HMR_NOISE_RX.test(e.message)) mark() })
  p.on('console', (msg) => { if (HMR_NOISE_RX.test(msg.text())) mark() })
  return state
}

/* 화면이 **실제로 그려질 때까지** 기다린다.
   ⚠️ 왜 (2026-09-17): 여러 명이 동시에 돌려 dev 서버가 밀리면 렌더가 고정 대기(4.5초)보다
      늦어진다. 그러면 이 도구가 **빈 화면을 읽고** "1쪽 / 겹침 0개 / 55자 초과 0개" 를
      찍는다. 그날 담당자 여럿이 각자 참을성 있는 워커를 따로 짜서야 알아챘다.
      고정 대기는 **조용히 틀린 답**을 만든다 — 글자 수가 멈출 때까지 기다리고,
      끝내 안 뜨면 **크게 떠들고 exit 3** 으로 끝낸다. */
async function waitForRender(p, label = '', hmr = null) {
  const DEADLINE = 90000, MIN_CHARS = 160, STABLE_NEEDED = 3
  const HMR_QUIET_MS = 2500, HMR_RETRY_GAP = 2500, HMR_RETRY_MAX = 6
  const t0 = Date.now()
  let last = -1, stable = 0, hmrRetries = 0
  while (Date.now() - t0 < DEADLINE) {
    // 방금(2.5초 안에) HMR 노이즈가 찍혔으면 지금 읽는 글자는 못 믿는다 — see-screen.mjs 참고.
    if (hmr && hmr.lastAt && Date.now() - hmr.lastAt < HMR_QUIET_MS) {
      if (hmrRetries >= HMR_RETRY_MAX) {
        console.error(`\n🚨 ${label || '화면'} — HMR 노이즈(깨진 청크)가 ${HMR_RETRY_MAX}번 재시도 뒤에도 안 없어졌다.`)
        console.error('   다른 사람이 이 quest 파일을 계속 저장하고 있을 수 있다. 잠시 뒤 다시 돌려라.')
        process.exitCode = 3
        return last
      }
      hmrRetries++
      console.error(`   ⏳ HMR 재컴파일 신호(Turbopack 이 저장 중인 파일을 읽음) — 2.5초 뒤 재시도 (${hmrRetries}/${HMR_RETRY_MAX})`)
      await p.waitForTimeout(HMR_RETRY_GAP)
      try { await p.reload({ waitUntil: 'domcontentloaded' }) } catch {}
      last = -1; stable = 0
      continue
    }
    let n = 0
    try {
      n = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim().length)
    } catch { n = 0 }
    if (n >= MIN_CHARS && n === last) {
      if (++stable >= STABLE_NEEDED) return n
    } else {
      stable = 0
    }
    last = n
    await p.waitForTimeout(400)
  }
  console.error(`\n🚨 ${label || '화면'}이 ${DEADLINE / 1000}초 안에 안 떴다 (읽힌 글자 ${last}자).`)
  console.error('   이 도구가 지금 읽는 것은 **빈 화면**이다.')
  console.error('   여기서 나온 "0건 / 1쪽" 은 결백의 증거가 아니라 **도구가 못 본 것**이다.')
  console.error('   dev 서버가 밀렸을 수 있다 — 동시에 도는 작업을 줄이고 다시 돌려라.')
  process.exitCode = 3
  return last
}

const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()
const hmr = attachHmrWatch(p)
const errs = []
// ⚠️ HMR 노이즈(깨진 청크)는 여기서 **빼야** 한다 — waitForRender 가 이미 그걸 보고
//    재시도한다. 안 빼면 재시도로 회복한 뒤에도 "페이지 에러 N건" 으로 다시 보고돼서
//    진짜 페이지 에러가 노이즈 속에 묻힌다.
p.on('pageerror', (e) => { if (!HMR_NOISE_RX.test(e.message)) errs.push(e.message) })

try {
  await p.goto(url, { waitUntil: 'domcontentloaded' })
  await waitForRender(p, url, hmr)
  await p.evaluate((l) => localStorage.setItem('language', l), lang)
  await p.reload({ waitUntil: 'domcontentloaded' })
  await waitForRender(p, url, hmr)

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
      const si = lines.findIndex((x) => /^\(\d+ \/ \d+\)$/.test(x))
      let sub = si >= 0 ? lines[si] : undefined
      /* ⚠️ `(n / m)` 라벨이 없는 시뮬도 있다 — 2026-09-08 python-qa 가 잡았다.
         simplegame 의 시뮬은 그 라벨 대신 "Evirir takes +a ▶" 같은 버튼 글씨를 쓴다.
         그래서 이 도구가 "시뮬 0개" 라고 찍었고, 나는 그걸 그대로 선생님께 말했다 — 틀린 보고였다.
         라벨이 없으면 **◀▶ 버튼이 있는지**로 시뮬 유무만이라도 알린다. */
      const hasSimNav = [...document.querySelectorAll('button')]
        .some((e) => /▶|◀|⏮/.test(e.textContent || ''))
      if (!sub && hasSimNav) sub = '(? / ?)'
      // ⚠️ 시뮬 **안의 첫 말풍선**도 가져온다.
      //    2026-09-07: 이 도구의 첫 판이 페이지 내레이션만 긁었다. 그런데 그날 잡힌 결함
      //    ("다 해보자" 선언이 맨 뒤에 있던 것)은 내레이션이 아니라 **시뮬 1단계 안**에
      //    숨어 있었다. 그래서 이 도구로는 못 잡았을 것이다 — project-lead 가 자기 손으로
      //    돌려보고 그렇게 보고했다. 이야기는 시뮬 안에서도 진행된다. 같이 읽어야 한다.
      const NAV = /^(⏮|◀|다음 ▶|Next ▶|Prev|처음부터|이전|Restart)/
      const subFirst = si >= 0
        ? lines.slice(si + 1, si + 4).filter((x) => !NAV.test(x)).slice(0, 2).join(' ')
        : ''
      // 코드창이 있나 — 등폭 글꼴 줄이 여러 개 쌓여 있으면 코드다.
      // (CodeWalk 은 줄마다 따로 그린다. 한 덩어리 텍스트가 아니라 줄 수를 센다.)
      const monoLines = [...document.querySelectorAll('span,div,pre')].filter((e) => {
        if (e.children.length > 3) return false
        const f = getComputedStyle(e).fontFamily || ''
        const txt = (e.textContent || '').trim()
        return /JetBrains|monospace|Menlo|Consolas/i.test(f) && txt.length > 8
      }).length
      const hasCode = monoLines >= 6
      return { pos: lines[k] || '?', narr: (lines[k + 2] || lines[k + 1] || '').trim(), sub, subFirst, hasCode }
    })
    const n = r.sub ? r.sub.replace(/[()]/g, '').split(' / ')[1] : null
    const subTxt = !r.sub ? '' : (n === '?' ? ' [시뮬 있음 · 단계 수 못 셈]' : ` [시뮬 ${n}단계]`)
    if (r.hasCode && firstCode === null) firstCode = i + 1
    rows.push({ n: i + 1, pos: r.pos, narr: r.narr, subTxt, code: r.hasCode })
    console.log(
      `   ${String(i + 1).padStart(2)}   ${r.pos.padEnd(7)}  ${r.narr.slice(0, 52)}${r.code ? ' 〈코드〉' : ''}${subTxt}`
    )
    // 시뮬 첫 말풍선 — 이야기는 시뮬 안에서도 진행된다. 선언·결론이 여기 숨는다.
    if (r.subFirst) console.log(`              └ 시뮬 1단계: ${r.subFirst.slice(0, 64)}`)

    /* ⚠️ 2026-09-24 — 쪽 안 스테퍼를 **실제로 눌러서** 센다.
       왜: 학생이 `mcc21marbles` 를 직접 세어 «14번(쪽 6 + 표 4 + 코드 4)» 이라고 했는데
       이 도구는 «6회» 라고 찍었다. 두 가지로 틀렸다 —
         ① 커스텀 시뮬(`Next box →`)은 `(n / m)` 라벨도 ▶◀ 도 없어 **아예 감지 못 했다**
         ② `ProgressiveCodeStepper`(◀ ▶)는 감지는 했는데 단계 수를 몰라
            **조용히 0 을 더했다** — 「못 셈」이라 찍어 놓고 합계엔 0 으로 넣었다
       라벨을 추측하는 대신 **눌러 본다.** 쪽 안에서 «앞으로 가는» 버튼은
       글자가 `→` 나 `▶` 로 끝난다(`← 이전`·`↺ 처음으로`·`📄 PDF`·퀴즈 보기는 안 걸린다).
       ⚠️ 그래도 추측이다 — 그 모양이 아닌 스테퍼는 여전히 못 센다.
          못 셌을 수 있으면 합계를 «최소» 로 적고 크게 떠든다. */
    let inPage = 0
    for (let g = 0; g < 40; g++) {
      const adv = await p.$(
        'main button:not(.quest-navbar button):text-matches("(→|▶)\\s*$")'
      ).catch(() => null)
      if (!adv) break
      let ok = false
      try { ok = (await adv.isEnabled()) && (await adv.isVisible()) } catch {}
      if (!ok) break
      const before = await p.evaluate(() => document.body.innerText.length)
      try { await adv.click({ timeout: 1500 }) } catch { break }
      await p.waitForTimeout(260)
      const after = await p.evaluate(() => document.body.innerText.length)
      inPage++
      if (before === after) break   // 더 안 바뀌면 끝난 것이다
    }
    rows[rows.length - 1].inPage = inPage

    let moved = false
    try {
      /* ⚠️ 왜 `.quest-navbar` 안에서만 찾나 (2026-09-23, permutation 버그):
         시뮬 내부에도 "다음 →" 라벨의 버튼이 있을 수 있다 — permutation 의
         BruteForceEnumerator 가 `{t(E,"next","다음")} →` 로 자기 내부 스텝(idx)을
         넘기는 버튼을 그린다. 문서 전체에서 텍스트로 찾으면 Playwright 가
         **DOM 순서상 먼저 나오는 요소** 를 돌려주는데, 그게 이 내부 버튼이었다 —
         그래서 쪽은 안 넘어가고 시뮬 내부 idx 만 계속 증가했고, "눌러야 하는 횟수"가
         33/34 로 부풀었다(실제 16쪽). 실측: `permutation:16쪽 vs see-flow 33/34`.
         진짜 "쪽 넘김" 버튼은 `QuestBottomNav`(components/quest/QuestNavBar.jsx)
         하나뿐이고, 그 컴포넌트는 항상 `.quest-navbar` 로 감싸여 있다 —
         quest-problems 180개 **전부**가 QuestBottomNav 를 쓴다(grep 확인,
         2026-09-23). 그래서 그 스코프 안에서만 찾는다.
         스코프 안에 없으면(quest-navbar 가 없는 화면 — 예: /learn 레슨) 예전처럼
         문서 전체에서 찾는다. 거기엔 이 버그의 증거가 없었다 — 다만 이 fallback
         은 permutation 과 같은 종류의 충돌에는 여전히 취약하다는 걸 적어둔다. */
      const scoped = await p.$(`.quest-navbar button:has-text("${NEXT}")`)
      const nb = scoped || (await p.$(`button:has-text("${NEXT}")`))
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
  /* 누르는 횟수 — 분량 피로는 글자 수가 아니라 **클릭 수**로 온다 (ux-reviewer 2026-09-08 실측:
     rectangles 는 쪽 넘김 14 + 시뮬 서브 30 = 44회. "각 쪽은 안 긴데 계속 누르게 한다"). */
  const subClicks = rows.reduce((a, r) => a + (r.inPage || 0), 0)
  /* 「시뮬은 있다고 봤는데 한 번도 못 누른」 쪽 — 여기가 조용히 틀리는 자리다. */
  const unsure = rows.filter((r) => r.subTxt && !(r.inPage > 0))
  const clicks = rows.length - 1 + subClicks
  console.log(`\n   눌러야 하는 횟수: ${clicks}회 (쪽 넘김 ${rows.length - 1} + 쪽 안 ${subClicks})`)
  if (unsure.length) {
    console.log(`   ⚠️ **최소값이다.** ${unsure.map((r) => r.n).join(', ')}쪽은 시뮬이 보이는데`)
    console.log('      «앞으로 가는» 버튼(글자가 → 나 ▶ 로 끝나는 것)을 못 찾아 0 으로 셌다.')
    console.log('      그 쪽은 **직접 눌러 세라.** 0 건이 결백이 아니다.')
  }
  if (clicks > 40) {
    console.log('   ⚠️ 40회가 넘는다. 열두 살이 끝까지 올 분량인지 의심해라.')
    console.log('      단, 줄이기 전에 **그 시뮬이 학생이 이해한 자리인지** 먼저 확인해라 —')
    console.log('      2026-09-08 에 "길다" 는 이유로 압축하려던 시뮬이 학생이 유일하게')
    console.log('      이해한 자리였다. 길이는 증거지 판결이 아니다.')
  }
  console.log(`\n   첫 코드가 나오는 쪽: ${firstCode ?? '없음'} / 전체 ${rows.length}쪽`)

  // ⚠️ **조용히 틀리지 마라.** quest 는 쪽이 하나일 수 없다(제일 짧은 것도 4쪽이다).
  //    "전체 1쪽" 은 거의 언제나 **화면이 다 안 뜬 것**이다 — dev 서버가 붐비거나 첫 컴파일 중.
  //    2026-09-17 MCC 전원 검토에서 담당자 **넷이 각각** 이 출력을 받고
  //    "흐름이 1쪽밖에 없다" 로 읽을 뻔했다. 한 명은 실제로 그렇게 보고했다.
  //    근거: memory/feedback_checkers_can_be_silently_wrong.md
  //      *"0건, 이상 없음 금지 → 0건. 스크린샷 6장 눈으로 봤고 하나 찾음."*
  if (rows.length <= 1) {
    console.log('')
    console.log('   🚨 쪽이 1개로 잡혔다 — 이건 거의 언제나 **화면이 다 안 뜬 것**이다.')
    console.log('      quest 는 제일 짧아도 4쪽이다. 이 출력을 "흐름이 짧다" 로 읽지 마라.')
    console.log('      dev 서버가 붐비면 이렇게 된다. 잠시 뒤 다시 돌리고, 그래도 같으면')
    console.log('      `see-screen.mjs` 로 화면을 직접 봐라.')
    process.exitCode = 3
  }
  if (errs.length) console.log(`\n   🚨 페이지 에러 ${errs.length}건: ${errs[0].slice(0, 80)}`)
} finally {
  await b.close()
}
