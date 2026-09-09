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
 *   node scripts/see-screen.mjs <url> [--mobile] [--progress 레슨:챕터:스텝] [--shot 파일명] [--sim]
 *                                     [--lang ko|en] [--click "글자" [--click "글자" ...]]
 *
 * ⚠️ quest 는 한 주소 안에서 탭·페이지를 눌러 넘긴다. 첫 화면만 보고 "확인했다" 하지 마라.
 *    보고 싶은 자리까지 `--click` 으로 눌러서 가라. 예 — 느린 코드 페이지:
 *      node scripts/see-screen.mjs http://localhost:3000/quest/rectangles \
 *        --click "⚡ 코드" --click "다음 →" --click "다음 →" --sim
 *
 * ⚠️ `--sim` 을 안 쓰면 **첫 화면만** 본다. 시뮬은 눌러야 내용이 바뀐다.
 *    2026-09-07 선생님: "시뮬도 안보고 어떻게 확인을 한거라는거지? 그건 거짓된 결과잖아."
 *    그날 검토자·학생 둘 다 "시뮬 확인했다" 고 했지만, 표가 길어지면서 설명 말풍선이
 *    화면 밖으로 밀려나는 걸 아무도 못 봤다. 첫 화면만 봤기 때문이다.
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
await settleTyping(p)

// --lang ko|en: 화면 언어를 정해서 연다 (모바일은 언어 버튼이 메뉴 안이라 못 누른다)
if (args.includes('--lang')) {
  const L = args[args.indexOf('--lang') + 1]
  await p.evaluate(l => localStorage.setItem('language', l), L)
  await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(3000)
}

// 내레이션은 한 글자씩 타이핑된다 (components/quest/shared.tsx useTyping, 28ms/글자).
// 129자짜리는 3.6초가 걸린다. 그런데 우리는 클릭 뒤 700ms(--click)·300ms(--sim) 만 기다렸다.
// 그래서 **지금까지 이 도구가 읽은 내레이션은 잘린 문장이었다.**
// 2026-09-09 에 학생이 cornercover 2쪽에서 "문장이 뚝 끊긴다" 고 보고해서 드러났다 —
// 소스는 멀쩡했고, 잘린 건 화면이 아니라 **우리 도구의 눈**이었다.
// 그 여파로 "55자 넘는 문장" 개수도 계속 적게 셌다.
// 글자 수가 더 안 늘 때까지 기다린다. 최대 6초 — 그 안에 어떤 내레이션도 끝난다.
async function settleTyping(page, maxMs = 6000) {
  const t0 = Date.now()
  let prev = -1
  while (Date.now() - t0 < maxMs) {
    const n = await page.evaluate(() =>
      document.body.innerText ? document.body.innerText.length : 0).catch(() => -1)
    if (n === prev && n > 0) return
    prev = n
    await page.waitForTimeout(180)
  }
}

// --click: 보고 싶은 자리까지 눌러서 간다 (탭·다음 버튼 등). 순서대로 실행.
// 못 누르면 넘어간다 — 30초씩 멈춰서 죽어버리면 에이전트가 아무것도 못 본다.
const clicks = args.reduce((acc, a, i) => (a === '--click' ? [...acc, args[i + 1]] : acc), [])
for (const label of clicks) {
  try {
    await p.click(`text=${label}`, { timeout: 2500 })
    await p.waitForTimeout(700)
    await settleTyping(p)
  } catch { console.log(`   ⚠️ --click "${label}" — 못 눌렀다 (안 보이거나 없음). 건너뜀`) }
}

const scan = () => p.evaluate(() => {
  const bars = [...document.querySelectorAll('*')].filter(e => {
    const c = getComputedStyle(e)
    return (c.position === 'fixed' || c.position === 'sticky') && e.offsetHeight > 24 && e.offsetWidth > 150
  })
  // 푸터 링크는 뺀다 — 하단 고정 바가 푸터를 덮는 건 설계고, 매번 신고되면
  // 진짜 신고가 그 밑에 묻힌다.
  const targets = [...document.querySelectorAll('input, button, a, textarea')]
    .filter(e => e.offsetParent && !e.closest('footer'))
  const covered = []
  const onScreen = []   // 이번 스크롤 위치에서 화면 안에 있던 것들
  targets.forEach(t => {
    const q = t.getBoundingClientRect()
    if (!q.height || q.bottom < 0 || q.top > innerHeight) return
    // ⚠️ 겹치는 네모끼리 비교만 하면 헛 경보가 난다 (2026-09-07 실측: 조상 래퍼가
    //    sticky 라는 이유로 멀쩡히 눌리는 버튼 3개를 "가려졌다" 고 신고했다).
    //    헛 경보가 남으면 아무도 이 검사기를 안 본다. 그래서 **실제로 클릭이 막히는지**
    //    한가운데 점에서 elementFromPoint 로 확인한 것만 신고한다.
    const cx = Math.round(Math.min(Math.max(q.left + q.width / 2, 1), innerWidth - 1))
    const cy = Math.round(Math.min(Math.max(q.top + q.height / 2, 1), innerHeight - 1))
    const top = document.elementFromPoint(cx, cy)
    const name = (t.tagName + ' ' + (t.textContent || t.placeholder || '').trim()).slice(0, 40)
    onScreen.push(name)                       // 이 위치에서 화면 안에 있었다
    if (!top || top === t || t.contains(top)) return
    const blocker = bars.find(f => !f.contains(t) && (f === top || f.contains(top)))
    if (!blocker) return
    covered.push({ what: name,
                   by: (blocker.className || '').toString().slice(0, 40) || '(인라인 스타일 요소)' })
  })
  /* 글자끼리 · 글자와 도형이 **겹치나** (2026-09-08 추가).
     선생님: "디자이너와 qa가 잘 안하나봐. 글자랑 도형등 겹치는 부분이 있던데"
     맞는 말이었다 — 이 검사기는 그때까지 **누르는 것이 막혔나**만 봤고
     글자 겹침은 아예 안 봤다. 검토자들이 이 도구를 믿었으니 못 볼 수밖에 없었다.
     실제 사례: RectStage 라벨(`4×2=8`)이 scale 을 안 따라가서 작게 그릴 때
     옆 라벨과 겹치고 빨강 사각형 위로 올라탔다. */
  // 고정/스티키 안에 든 것은 뺀다 — 바가 본문 위를 지나는 건 설계고, 그건 위 `covered` 가 본다.
  // (안 빼면 헤더 버튼들이 내레이션과 100% 겹친다고 신고한다 — 2026-09-08 실측)
  const inFixed = (e) => {
    for (let n = e; n && n !== document.body; n = n.parentElement) {
      const pos = getComputedStyle(n).position
      if (pos === 'fixed' || pos === 'sticky') return true
    }
    return false
  }
  /* 스크롤되는 상자 **밖으로 밀려난** 것은 뺀다 — 화면엔 안 보이는데 좌표만 남아 있다.
     2026-09-08: 학생이 CodeWalk 코드창에서 "겹침 여러 개" 신고를 받고 스크린샷을 열어봤더니
     눈에는 멀쩡했다. 코드창은 고정 높이에 overflow 라서, 스크롤로 가려진 줄이
     좌표상으로만 말풍선과 겹친 것이었다. **오늘 네 번째 헛경보다.**
     잘린 것을 겹쳤다고 신고하면 진짜 겹침이 그 속에 묻힌다. */
  const clipped = (e) => {
    const q = e.getBoundingClientRect()
    for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) {
      const st = getComputedStyle(n)
      if (!/auto|scroll|hidden/.test(st.overflowY + st.overflowX)) continue
      const c = n.getBoundingClientRect()
      // 부모 상자 안에 절반도 안 들어와 있으면 잘린 것으로 본다
      const vis = Math.max(0, Math.min(q.bottom, c.bottom) - Math.max(q.top, c.top))
      if (q.height > 0 && vis / q.height < 0.5) return true
    }
    return false
  }
  const boxes = [...document.querySelectorAll('body *')].filter((e) => {
    if (e.children.length) return false                 // 말단만 (부모-자식 겹침은 정상)
    if (!(e.textContent || '').trim()) return false
    if (inFixed(e) || clipped(e)) return false
    const st = getComputedStyle(e)
    if (st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) return false
    const q = e.getBoundingClientRect()
    return q.width > 2 && q.height > 2 && q.bottom > 0 && q.top < innerHeight
  })
  /* 글자가 **도형** 위에 올라탄 것도 본다 — 도형은 글자가 없어서 위 목록엔 안 잡힌다.
     선생님이 본 것이 정확히 이 경우였다: 라벨(`4×2=8`)이 파랑 네모(글자 없는 div) 위로 올라탔다.
     글자↔글자만 보면 영영 못 잡는다. */
  const shapes = [...document.querySelectorAll('body *')].filter((e) => {
    if ((e.textContent || '').trim()) return false      // 글자 있는 건 위에서 봤다
    if (inFixed(e) || clipped(e)) return false
    const st = getComputedStyle(e)
    const drawn = parseFloat(st.borderTopWidth) >= 1 || parseFloat(st.borderLeftWidth) >= 1 ||
                  (st.backgroundColor && st.backgroundColor !== 'rgba(0, 0, 0, 0)')
    if (!drawn) return false
    const q = e.getBoundingClientRect()
    return q.width > 4 && q.height > 4 && q.width < 400 && q.bottom > 0 && q.top < innerHeight
  })
  const overlaps = []
  // 글자 ↔ 도형
  for (const A of boxes) for (const S of shapes) {
    if (A.contains(S) || S.contains(A)) continue
    const a = A.getBoundingClientRect(), c = S.getBoundingClientRect()
    const w = Math.min(a.right, c.right) - Math.max(a.left, c.left)
    const h = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top)
    if (w <= 1 || h <= 1) continue
    const ratio = (w * h) / (a.width * a.height)        // 글자가 얼마나 덮였나
    if (ratio < 0.25) continue
    overlaps.push({ a: (A.textContent || '').trim().slice(0, 16), b: '〈도형〉', r: +ratio.toFixed(2) })
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const A = boxes[i], B = boxes[j]
    if (A.contains(B) || B.contains(A)) continue
    const a = A.getBoundingClientRect(), c = B.getBoundingClientRect()
    const w = Math.min(a.right, c.right) - Math.max(a.left, c.left)
    const h = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top)
    if (w <= 1 || h <= 1) continue
    const ratio = (w * h) / Math.min(a.width * a.height, c.width * c.height)
    if (ratio < 0.15) continue                          // 살짝 스치는 건 뺀다
    overlaps.push({ a: (A.textContent || '').trim().slice(0, 16),
                    b: (B.textContent || '').trim().slice(0, 16), r: +ratio.toFixed(2) })
  }

  const longText = [...document.querySelectorAll('p, div')]
    .filter(e => e.children.length === 0 && (e.textContent || '').trim().length > 55)
    .map(e => (e.textContent || '').trim()).slice(0, 8)
  return { text: document.body.innerText.slice(0, 3000), covered, onScreen, overlaps, longText, y: Math.round(scrollY) }
})

// ⚠️ sticky 는 **스크롤해야** 덮는다. 맨 위에서 한 번만 보면 못 잡는다
//    (2026-09-07: 말풍선이 버튼 4개를 덮고 있었는데 첫 화면 검사는 0개라고 했다).
//    그래서 페이지를 내려가며 여러 번 잰다.
/* ⚠️ 2026-09-09: 여기가 오늘 다섯 번째 헛경보를 냈다.
   위쪽 sticky 바 **밑을 지나가는 것**을 "가려졌다" 고 신고했는데,
   그건 sticky 헤더가 있는 어느 페이지에서나 일어난다 — 조금 올리면 다시 보인다.
   실측: 그 버튼은 스크롤 0 에서 멀쩡히 눌렸고, 이 쪽의 최대 스크롤은 149px 인데
   도구는 "스크롤 270px 에서 가려짐" 이라고 했다.
   그래서 기준을 바꾼다 — **어느 스크롤 위치에서도 한 번도 못 눌린 것만** 신고한다.
   (진짜였던 사례: 아래 고정 바에 가린 입력칸은 끝까지 내려도 안 나온다.) */
const r = await scan()
const seen = new Set(r.covered.map(c => c.what))
const everClickable = new Set()
const addClickable = (sc) => sc.onScreen.forEach(n => {
  if (!sc.covered.some(c => c.what === n)) everClickable.add(n)
})
addClickable(r)
const seenOv = new Set((r.overlaps || []).map(o => o.a + '|' + o.b))
const H = await p.evaluate(() => document.body.scrollHeight)
for (let y = Math.round(vp.height * 0.3); y < H; y += Math.round(vp.height * 0.3)) {
  // ⚠️ 부드러운 스크롤(smooth) 도중에 재면 또 헛 경보가 난다 — 2026-09-07 실측:
  //    멀쩡한 버튼 4개가 애니메이션 중간 프레임에서 "가려졌다" 로 잡혔다.
  //    즉시 스크롤하고, 스크롤 위치가 멈출 때까지 기다린 뒤에 잰다.
  await p.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y)
  await p.evaluate(() => new Promise((res) => {
    let last = -1, same = 0
    const tick = () => {
      if (window.scrollY === last) { if (++same >= 3) return res() } else { same = 0; last = window.scrollY }
      requestAnimationFrame(tick)
    }
    tick()
  }))
  await p.waitForTimeout(120)
  const more = await scan()
  addClickable(more)
  more.covered.forEach(c => { if (!seen.has(c.what)) { seen.add(c.what); r.covered.push({ ...c, y: more.y }) } })
  ;(more.overlaps || []).forEach(o => { const k = o.a + '|' + o.b; if (!seenOv.has(k)) { seenOv.add(k); r.overlaps.push(o) } })
}
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(150)

// 한 번이라도 눌린 것은 뺀다 — 잠깐 바 밑을 지난 것뿐이다
r.covered = r.covered.filter(c => !everClickable.has(c.what))

console.log(`\n=== ${mobile ? '모바일 375×812' : '데스크탑 1280×900'} · ${url} ===\n`)
console.log(r.text)
console.log(`\n── 고정 요소에 가려진 것: ${r.covered.length}개`)
r.covered.slice(0, 10).forEach(c => console.log(`   🚨 ${c.what}  ← ${c.by}${c.y ? ` (스크롤 ${c.y}px 에서)` : ''}`))
console.log(`\n── 글자·도형이 겹친 곳: ${r.overlaps.length}개`)
r.overlaps.slice(0, 8).forEach(o => console.log(`   🚨 "${o.a}" ↔ "${o.b}"  (겹침 ${Math.round(o.r * 100)}%)`))

console.log(`\n── 55자 넘는 문장: ${r.longText.length}개 (feedback_narration_short.md 기준)`)
r.longText.forEach(t => console.log(`   ${t.length}자: ${t.slice(0, 70)}…`))

// --sim: 시뮬을 끝까지 눌러가며 **매 단계** 설명 말풍선이 화면에 남아 있는지 본다
if (args.includes('--sim')) {
  console.log('\n── 시뮬을 끝까지 눌러본다 (설명이 보이나 · 바뀐 자리가 모여 있나)')
  let prevSnap = null
  for (let k = 0; k < 20; k++) {
    const r = await p.evaluate(() => {
      // 말풍선 = 이 단계의 설명. 화면(뷰포트) 안에 실제로 보이나?
      const cands = [...document.querySelectorAll('div')].filter(e => {
        const st = getComputedStyle(e)
        return e.offsetHeight > 30 && e.offsetHeight < 260 && parseFloat(st.borderTopWidth) >= 1
          && /rgb\(2[0-9]{2}|rgb\(24[0-9]|rgb\(25[0-5]/.test(st.backgroundColor)
          // 2026-09-09: 전에는 25자 초과만 말풍선으로 쳤다. 그래서 gifts 시뮬 9·10단계에서
          // "말풍선을 못 찾음" 이라고 보고했는데, 실제로는 "손님 8 (티어 5) — 선물이 없어요"
          // 가 멀쩡히 떠 있었다. 25자가 안 됐을 뿐이다.
          // 짧은 말풍선이 오히려 좋은 말풍선인데 도구가 그걸 없는 것으로 셌다.
          // 8자로 낮춘다 — 그 아래는 "1 / 8" 같은 카운터라 말풍선이 아니다.
          && (e.textContent || '').trim().length > 8 && e.children.length < 12
      })
      const say = cands[0]
      if (!say) return { none: true }
      const q = say.getBoundingClientRect()
      return { visible: q.bottom > 0 && q.top < innerHeight, top: Math.round(q.top),
               text: (say.textContent || '').trim().slice(0, 46) }
    })
    /* 이번 걸음에서 **무엇이 어디서** 바뀌었나.

       선생님(2026-09-08): "변하는 부분을 분산시키지 않는게 좋겠어.
       갑자기 위아래 내용이 동시에 바뀌는데."
       내가 "학생 에이전트는 움직임을 못 느껴서 못 잡는다" 고 했더니 선생님:
       "이건 방법이 없는건가? 새로운 정보가 다른 위치에 있으면 그런거 아닌가?"
       맞다. **느낄 필요가 없다. 새 글자가 어디에 나타났는지만 보면 된다.**
       한 걸음 전후의 글자를 자리째 비교해서, 바뀐 자리가 흩어져 있으면 알린다. */
    const snap = await p.evaluate(() => {
      const out = []
      for (const e of document.querySelectorAll('div,span,b,p,li,td')) {
        if (e.children.length) continue                    // 잎만 (글자를 직접 가진 것)
        const txt = (e.textContent || '').trim()
        if (!txt) continue
        const q = e.getBoundingClientRect()
        if (q.height < 4 || q.bottom < 0 || q.top > innerHeight) continue
        out.push({ y: Math.round(q.top + q.height / 2), txt })
      }
      return out
    })
    if (prevSnap) {
      const before = new Set(prevSnap.map(o => o.txt))
      const after = new Set(snap.map(o => o.txt))
      const changed = [...snap.filter(o => !before.has(o.txt)).map(o => o.y),
                       ...prevSnap.filter(o => !after.has(o.txt)).map(o => o.y)]
      if (changed.length) {
        changed.sort((a, b) => a - b)
        // 60px 안쪽이면 같은 자리로 본다
        const cl = [[changed[0]]]
        for (const y of changed.slice(1)) {
          if (y - cl[cl.length - 1][cl[cl.length - 1].length - 1] <= 60) cl[cl.length - 1].push(y)
          else cl.push([y])
        }
        const spots = cl.map(c => `${c[0]}~${c[c.length - 1]}px`)
        const gap = cl.length > 1 ? cl[cl.length - 1][0] - cl[0][cl[0].length - 1] : 0
        if (cl.length > 1 && gap > 200) {
          console.log(`      ⚠️ 바뀐 자리가 ${cl.length}군데로 흩어짐 (${spots.join(' / ')}, ${gap}px 떨어짐)`)
          console.log(`         → 새 정보를 한 자리에 모아라. 눈이 두 군데를 쫓는다.`)
        } else {
          console.log(`      바뀐 자리: ${spots.join(' / ')}`)
        }
      }
    }
    prevSnap = snap

    const btn = await p.$('text=/다음 ▶|Next ▶/')
    const done = !btn || await btn.isDisabled().catch(() => true)
    if (r.none) { console.log(`   ${k + 1}단계: 말풍선을 못 찾음`) }
    else console.log(`   ${k + 1}단계: ${r.visible ? '✅ 보임' : '🚨 화면 밖'} (top=${r.top})  ${r.text}…`)
    if (done) break
    await btn.click(); await p.waitForTimeout(300); await settleTyping(p)
  }
}

if (shot) { await p.screenshot({ path: shot, fullPage: false }); console.log(`\n스크린샷: ${shot}`) }
if (progKey) await p.evaluate(k => localStorage.removeItem(k), progKey)   // 진도 원복
await ctx.close(); await b.close()
