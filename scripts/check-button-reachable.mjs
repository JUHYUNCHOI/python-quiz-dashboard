#!/usr/bin/env node
/**
 * check-button-reachable.mjs — 그 버튼을 **누를 수 있는 스크롤 자리가 하나라도 있나.**
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 세 번째 검사기가 필요한가 (2026-09-27)
 *
 * 같은 자리를 보는 검사기가 이미 둘 있는데 **둘 다 이 질문에 답을 못 한다.**
 *
 *   `see-screen.mjs`            — 「어느 스크롤에서도 **한 번도** 못 눌린 것」만 신고.
 *                                 일부 구간만 덮이면 **0건**이다.
 *   `check-fixed-bar-overlap.mjs` — 「**어느 한 자리에서** 덮였나」를 신고.
 *                                 덮인 자리 **하나만** 찾으면 🚨 를 띄운다.
 *
 * 그래서 둘은 «40px 띠 하나만 나쁘다» 와 «어디서도 못 누른다» 를 **구별 못 한다.**
 * 그런데 고치는 방법이 그 구별에서 갈린다:
 *
 *   못 누르는 자리만 있다 → **여백**이 답이다. 문서를 늘려 바 위로 올려주면 끝난다.
 *   눌리는 자리가 있다   → **여백은 소용없다.** 버튼은 문서 어디에 있든 어떤
 *                          스크롤 값에서 뷰포트 하단을 지난다. 여백은 나쁜 구간을
 *                          **옮길 뿐** 없애지 못한다. 좌우로 벌리거나 모양을 갈라야 한다.
 *
 * 2026-09-27 에 이게 실제로 갈렸다. 선생님: *"시뮬레이션에서 다음 버튼이 눌러지는것
 * 같지도 않아."* `check-fixed-bar-overlap` 은 `mcc20citytour` 의 «▶ Next» 를 🚨 로
 * 띄웠고, 검토자는 그걸 근거로 **「padding-bottom 90px」**을 처방했다. 이 잣대로 다시 재니:
 *
 *     ✅ 눌리는 스크롤 53곳 (30~590px)   🚨 도둑맞는 스크롤 4곳 (50~80px)
 *
 * **57곳 중 4곳.** 여백은 답이 아니었고, 게다가 `QuestNavBar.jsx:391` 이 이미
 * 78~96px 스페이서를 깔고 있어서 **더해질** 뻔했다. 숫자가 처방을 뒤집었다.
 *
 * ⛔ **이 검사기는 「괜찮다」고 말하지 않는다.** 4곳이 나쁜 건 여전히 나쁘다.
 *    이건 **「어떤 처방이 듣나」를 고르는 도구**지 합격/불합격 도장이 아니다.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 쓰는 법
 *   node scripts/check-button-reachable.mjs <quest-id|URL> --btn "▶ Next" [...]
 *   node scripts/check-button-reachable.mjs mcc20citytour --btn "▶ Next" --tab "⚡ Code"
 *   옵션: --desktop (기본 모바일 375×812) · --step 10 · --tab "탭 글자"
 *
 * ⚠️ 못 보는 것 (0건이 결백이 아니다)
 *   ① **연 쪽 하나**만 본다. 탭은 `--tab` 으로 한 번 눌러 준다.
 *   ② Chromium 은 `env(safe-area-inset-*)` 를 늘 0 으로 본다 — 실기기에서 바가 더
 *      크면 나쁜 구간이 더 넓다. **여기 수치는 하한이다.**
 *   ③ 화면은 기본이 **영어**로 뜬다. `--btn` 에 한국어를 넣으면 못 찾는다
 *      (2026-09-27 에 내가 여기서 세 번 헛발질했다). 못 찾으면 크게 떠들고 exit 3.
 */

import { chromium } from "playwright";

const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
};
const MOBILE = !argv.includes("--desktop");
const STEP = Number(flag("step", 10));
const TAB = flag("tab", null);
const BTN = flag("btn", null);
const targets = argv.filter((a, i) =>
  !a.startsWith("--") && argv[i - 1] !== "--step" && argv[i - 1] !== "--tab" && argv[i - 1] !== "--btn");

if (!targets.length || !BTN) {
  console.error('쓰는 법: node scripts/check-button-reachable.mjs <quest-id|URL> --btn "▶ Next" [--tab "⚡ Code"]');
  process.exit(2);
}
const toUrl = (t) => (t.startsWith("http") ? t : `http://localhost:3000/quest/${t}`);

const browser = await chromium.launch();
let worst = 0;
try {
  console.log(`=== 「${BTN}」 를 누를 수 있는 스크롤 자리가 있나 (${MOBILE ? "모바일 375×812" : "데스크탑 1280×900"}) ===\n`);

  for (const target of targets) {
    const ctx = await browser.newContext({
      viewport: MOBILE ? { width: 375, height: 812 } : { width: 1280, height: 900 },
    });
    const page = await ctx.newPage();
    await page.goto(toUrl(target), { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2200);

    if (TAB && TAB !== true) {
      const tab = page.locator("button", { hasText: TAB }).first();
      if (await tab.count()) { await tab.click(); await page.waitForTimeout(900); }
      else console.log(`  ⚠️ 탭 「${TAB}」 를 못 찾았다 — 첫 화면 그대로 본다. 영어 화면일 수 있다.`);
    }

    const found = await page.evaluate(
      (label) => [...document.querySelectorAll("button")].some(b => b.innerText.includes(label)), BTN);
    if (!found) {
      console.log(`  ⛔ ${target} — 「${BTN}」 버튼이 이 화면에 **없다.**`);
      console.log(`     화면은 기본이 영어다. 탭을 안 눌렀거나 글자가 다를 수 있다.\n`);
      worst = Math.max(worst, 3);
      await ctx.close();
      continue;
    }

    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    const ok = [], stolen = new Map();
    for (let y = 0; y <= Math.max(maxScroll, 0); y += STEP) {
      await page.evaluate(v => window.scrollTo(0, v), y);
      await page.waitForTimeout(45);
      const r = await page.evaluate((label) => {
        const btn = [...document.querySelectorAll("button")].find(b => b.innerText.includes(label));
        if (!btn) return { gone: true };
        const q = btn.getBoundingClientRect();
        if (q.bottom < 0 || q.top > innerHeight) return { off: true };
        const top = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
        if (top && (top === btn || btn.contains(top))) return { ok: true };
        const thiefBtn = top?.closest("button");
        return {
          ok: false,
          thief: (thiefBtn?.innerText || top?.innerText || top?.tagName || "?").trim().slice(0, 20),
          disabled: !!thiefBtn?.disabled,
        };
      }, BTN);
      if (r.ok) ok.push(y);
      else if (r.ok === false) {
        const key = r.thief + (r.disabled ? " (비활성 — 눌러도 아무 일도 안 난다)" : "");
        if (!stolen.has(key)) stolen.set(key, []);
        stolen.get(key).push(y);
      }
    }

    const total = ok.length + [...stolen.values()].reduce((a, v) => a + v.length, 0);
    const mark = ok.length === 0 ? "⛔" : stolen.size ? "🚨" : "✅";
    console.log(`  ${mark} ${target}  눌리는 자리 ${ok.length}곳 / 화면에 보이는 자리 ${total}곳`);
    if (ok.length) console.log(`       ✅ 눌린다: ${ok[0]}~${ok[ok.length - 1]}px`);
    for (const [k, ys] of stolen)
      console.log(`       🚨 «${k}» 가 가져간다: ${ys[0]}~${ys[ys.length - 1]}px (${ys.length}곳)`);

    if (ok.length === 0) {
      console.log(`       → **여백이 답이다.** 문서 끝에 바 높이만큼 빈 자리를 만들면 닫힌다.`);
      console.log(`          ⚠️ 단 \`QuestNavBar.jsx:391\` 이 이미 78~96px 을 깔고 있다 — **더하지 마라.**`);
      worst = Math.max(worst, 3);
    } else if (stolen.size) {
      console.log(`       → **여백은 안 듣는다.** 눌리는 자리가 있으니 문서를 늘려도 나쁜 구간이 옮겨갈 뿐이다.`);
      console.log(`          좌우로 벌리거나(A) 고정 바와 모양을 가르거나(D) 해야 한다.`);
      worst = Math.max(worst, 1);
    }
    console.log();
    await ctx.close();
  }

  console.log("잣대: 버튼 **중심**의 `elementFromPoint` 가 그 버튼 자신인 스크롤 자리를 센다.");
  console.log("⛔ **이건 합격 도장이 아니다.** 나쁜 자리가 4곳뿐이어도 그 4곳은 여전히 나쁘다.");
  console.log("   이 검사기가 답하는 건 하나다 — **어떤 처방이 듣나(여백이냐, 구조냐).**");
  console.log("⚠️ 연 쪽 하나만 본다 · safe-area 를 0 으로 봐서 수치는 **하한**이다.");
} finally {
  await browser.close();
}
process.exit(worst);
