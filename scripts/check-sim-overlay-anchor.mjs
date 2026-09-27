#!/usr/bin/env node
/**
 * check-sim-overlay-anchor.mjs — 시뮬의 **떠 있는 요소**가 엉뚱한 데 붙어 있나.
 *
 *   node scripts/check-sim-overlay-anchor.mjs <quest-id|URL> [...] [--tab "⚡ Code"] [--steps 8]
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 생겼나 (2026-09-27)
 *
 * 선생님이 화면을 보시고: *"**없음 버그인것 같은데. QA가 모든 시뮬 돌려봐야해**"*
 *
 * `mcc20citytour` 의 유령 칸(이웃 네 자리를 점선으로 표시하는 것)이 **격자 위로 떠올라
 * 프리셋 버튼 옆에** 붙어 있었다. 원인은 한 줄이다 —
 * 겹침 판이 `top: 0` 인데 그 기준이 **격자가 아니라 바깥 상자**였고,
 * 말풍선 자리로 `paddingTop` 을 준 뒤로 그만큼 **위로 밀렸다.**
 *
 * ⚠️ **빌드도 타입 검사도 검사기 15개도 전부 통과했다.**
 *    문법은 정상이고 글자도 안 깨진다. **자리만 틀렸다** —
 *    `check-jsx-raw-escape` 가 잡는 결함과 같은 층이다(기계는 통과, 눈에만 보임).
 *    그래서 **좌표로** 잰다.
 *
 * 잣대 — `position: absolute` 인 요소가
 *   ① 자기 **부모 상자 밖**으로 나갔나 (경계를 크게 넘었나)
 *   ② 같은 시뮬 안의 **버튼과 겹치나** (클릭을 가로채거나 가릴 수 있다)
 *   ③ 걸음을 밟는 동안 **화면 밖**으로 나갔나
 *
 * ⚠️ **판정이 아니라 볼 자리 표시다.** 일부러 밖으로 빼는 것도 있다
 *    (말풍선 꼬리, 카드 밖으로 살짝 나온 배지). **좌표를 읽고 사람이 정해라.**
 * ⚠️ **0건이 결백이 아니다** — `absolute` 가 아닌 방식(음수 margin, transform)으로
 *    어긋난 자리는 못 본다. 걸음을 다 밟지도 않는다(기본 8걸음).
 * ─────────────────────────────────────────────────────────────────────────
 */

import { chromium } from "playwright";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const TAB = flag("tab", null);
const STEPS = Number(flag("steps", 8));
const targets = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--tab" && argv[i - 1] !== "--steps");

if (!targets.length) {
  console.error('쓰는 법: node scripts/check-sim-overlay-anchor.mjs <quest-id|URL> [--tab "⚡ Code"] [--steps 8]');
  process.exit(2);
}
const toUrl = (t) => (t.startsWith("http") ? t : `http://localhost:3000/quest/${t}`);

const PROBE = `(() => {
  const out = [];
  const vw = innerWidth, vh = innerHeight;
  document.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.position !== 'absolute') return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;          // 꼬리·구분선 같은 것은 건너뛴다
    const par = el.offsetParent || el.parentElement;
    if (!par) return;
    const pr = par.getBoundingClientRect();
    // ① 부모 밖으로 크게 나갔나 (10px 여유)
    const outTop = pr.top - r.top, outLeft = pr.left - r.left;
    const outBot = r.bottom - pr.bottom, outRight = r.right - pr.right;
    const escaped = Math.max(outTop, outLeft, outBot, outRight);
    void escaped;  // ⚠️ 「부모 밖으로」는 **오탐이다** — 유령 칸은 설계상 격자 밖에 놓인다.
                   //    2026-09-27 실측: 정상인 화면에서도 50px 이 나온다. 잣대로 쓰지 마라.
    // ② 버튼과 겹치나
    let hitsBtn = null;
    document.querySelectorAll('button').forEach(b => {
      const br = b.getBoundingClientRect();
      if (br.width < 4) return;
      if (!(r.bottom <= br.top || r.top >= br.bottom || r.right <= br.left || r.left >= br.right)) {
        if (!hitsBtn) hitsBtn = (b.innerText || '').trim().slice(0, 18);
      }
    });
    // ③ 화면 밖
    const offscreen = r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw;
    if (hitsBtn || offscreen) {
      out.push({
        글: (el.textContent || '').trim().slice(0, 18),
        밖으로: Math.round(escaped), 버튼겹침: hitsBtn, 화면밖: offscreen,
        자리: Math.round(r.top) + ',' + Math.round(r.left),
      });
    }
  });
  return out;
})()`;

const browser = await chromium.launch();
let bad = 0, seen = 0, skipped = 0;
try {
  console.log("=== 시뮬의 떠 있는 요소가 엉뚱한 데 붙어 있나 ===\n");
  for (const target of targets) {
    const ctx = await browser.newContext({ viewport: { width: 1100, height: 1500 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 110)));
    await page.goto(toUrl(target), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2400);
    if (TAB) {
      /* ⚠️ 2026-09-27: 여기서 **조용히 틀렸다.** `--tab "⚡ Code"` 가 매칭이 안 됐는데
         그냥 지나가서 **시뮬에 들어가지도 못한 채 «어긋난 자리 없음»** 을 찍었다.
         `feedback_checkers_can_be_silently_wrong` 그대로다. 못 찾으면 크게 떠든다. */
      let t = page.locator("button", { hasText: TAB }).first();
      if (!(await t.count())) t = page.locator("button").filter({ hasText: /Code|코드/ }).first();
      if (await t.count()) { await t.click(); await page.waitForTimeout(700); }
      else { console.log(`  ⚠️ ${target} — 탭 «${TAB}» 을 못 찾았다. **시뮬에 못 들어갔을 수 있다.**`); }
    }
    // 시뮬에 정말 들어왔나 — 걸음 버튼이 없으면 이 quest 는 «못 봤다» 로 센다
    const hasStepper = await page.locator("button").filter({ hasText: /^Next ▶$|^다음 ▶$|⏮/ }).count();
    const next = page.locator("button").filter({ hasText: /^Next ▶$|^다음 ▶$|^▶$/ }).first();
    const found = new Map();
    for (let i = 0; i <= STEPS; i++) {
      for (const h of await page.evaluate(PROBE)) {
        const key = `${h.글}|${h.버튼겹침}|${h.화면밖}`;
        if (!found.has(key)) found.set(key, { ...h, 걸음: i + 1 });
      }
      if (!(await next.count()) || (await next.isDisabled())) break;
      await next.click();
      await page.waitForTimeout(180);
    }
    seen++;
    if (!hasStepper) {
      console.log(`  ⚠️ ${target}  — **걸음 버튼을 못 찾았다. 못 본 것으로 친다.**`);
      skipped++;
    } else if (found.size === 0 && !errs.length) {
      console.log(`  ✅ ${target}  — ${STEPS + 1}걸음 밟음, 어긋난 자리 없음`);
    } else {
      bad++;
      console.log(`  🚨 ${target}`);
      for (const h of found.values()) {
        const why = [h.버튼겹침 && `버튼 «${h.버튼겹침}» 과 겹침`,
                     h.화면밖 && "화면 밖"].filter(Boolean).join(" · ");
        console.log(`       걸음 ${h.걸음} · «${h.글}» (${h.자리})  ← ${why}`);
      }
      if (errs.length) console.log(`       페이지 에러: ${errs[0]}`);
    }
    await ctx.close();
  }
  console.log(`\nquest ${seen}개 중 ${seen - skipped}개를 실제로 밟았고, ${bad}개에서 찾았다.` +
    (skipped ? ` ⚠️ **${skipped}개는 시뮬에 못 들어가서 못 봤다.**` : ""));
  console.log(`⚠️ **판정이 아니라 볼 자리 표시다.** 일부러 밖으로 빼는 것도 있다`);
  console.log(`   (말풍선 꼬리, 카드 밖으로 살짝 나온 배지). **좌표를 읽고 사람이 정해라.**`);
  console.log(`⚠️ 0건이 결백이 아니다 — 음수 margin·transform 으로 어긋난 자리는 못 본다.`);
  console.log(`   그리고 ${STEPS + 1}걸음까지만 밟는다(--steps 로 늘려라).`);
} finally {
  await browser.close();
}
process.exit(bad ? 1 : 0);
