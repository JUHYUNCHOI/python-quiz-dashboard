/* 시뮬의 ▶ 버튼이 **스크롤 없이** 보이는지 걸음마다 잰다.
 *
 ⚠️ 2026-09-10 이 도구가 **조용히 틀렸다.** ▶ 버튼만 쟀는데, `SimShell` 을 쓰면
 *   그 버튼은 스크롤 영역 **밖**에 고정돼 **항상 보인다.** 그래서 "전부 닿는다" 고 보고하는 동안
 *   정작 **내용이 안에서 잘리고** 있었다 — sumk 마지막 걸음에서 답(P[2]=100)이 화면 밖이었다.
 *   ux 가 스크린샷을 눈으로 보다 찾았다. 그래서 **안쪽 잘림도 같이 잰다.**
 *
 * 왜 (2026-09-10): 시뮬 ▶ 는 quest 하나에서 열몇 번을 눌러야 하는 버튼이다.
 * "조금 스크롤하면 닿는다" 는 일회성 버튼 기준이지 이 버튼 기준이 아니다 —
 * 마찰이 스텝 수만큼 쌓인다. sumk 은 9단계 중 6단계가 가려 있었다(최대 119px).
 * see-screen.mjs 는 quest 시뮬 안쪽까지 못 들어간다(--click 이 탭 버튼을 못 누른다).
 *
 *   node check-sim-nav.mjs <quest-id> [--desktop]
 *
 * 쪽을 **알아서 넘겨가며 그 quest 의 시뮬을 전부 찾아** 잰다. 횟수를 셀 필요 없다.
 * (처음엔 "다음 → 몇 번" 을 사람이 줘야 했는데, quest 마다 달라서 매번 틀렸다.)
 */
import { chromium } from "playwright";

const quest = process.argv[2];
if (!quest) { console.log("사용법: node check-sim-nav.mjs <quest-id> [--desktop]"); process.exit(2); }
const desktop = process.argv.includes("--desktop");
const vp = desktop ? { width: 1280, height: 900 } : { width: 375, height: 812 };

const b = await chromium.launch();
const p = await b.newPage({ viewport: vp });
await p.goto(`http://localhost:3000/quest/${quest}`, { waitUntil: "networkidle" });

/* ⚠️ locator(`div:has-text(...)`) 는 **조상 div 를 다 잡아서** 엉뚱한 걸 누른다.
   자식이 거의 없는 잎 요소 중 글자가 정확히 같은 것만 고른다. */
const click = async (txt) => {
  const hit = await p.evaluate((t) => {
    const el = [...document.querySelectorAll("button,a,div,span")]
      .find((e) => e.children.length <= 2 && e.textContent.trim() === t);
    if (el) { el.click(); return true; }
    return false;
  }, txt);
  await p.waitForTimeout(400);
  return hit;
};
const simTotal = () => p.evaluate(() => {
  const m = document.body.innerText.match(/\(\s*(\d+)\s*\/\s*(\d+)\s*\)/);
  return m && Number(m[1]) === 1 ? Number(m[2]) : 0;   // 시뮬 첫 걸음일 때만
});
const navBottom = () => p.evaluate(() => {
  const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
  return el ? Math.round(el.getBoundingClientRect().bottom) : null;
});
/* SimShell 안쪽에서 잘린 양. scrollHeight > clientHeight 면 그만큼이 화면 밖이다.
   ▶ 가 보인다고 내용이 다 보이는 게 아니다 — 이걸 안 재서 오늘 틀린 보고를 냈다. */
const clippedPx = () => p.evaluate(() => {
  const boxes = [...document.querySelectorAll("div")].filter((d) => {
    const st = getComputedStyle(d);
    return st.overflowY === "auto" && d.scrollHeight > d.clientHeight + 2;
  });
  if (!boxes.length) return 0;
  return Math.max(...boxes.map((d) => Math.round(d.scrollHeight - d.clientHeight)));
});

await click("🇰🇷 한국어KO");
const barTop = await p.evaluate(() => {
  const bar = document.querySelector(".quest-navbar");
  return bar ? Math.round(bar.getBoundingClientRect().top) : window.innerHeight;
});
console.log(`=== ${quest} · ${desktop ? "데스크탑 1280×900" : "모바일 375×812"} · 하단 고정 바 top = ${barTop}px ===`);

const bad = [];
let sims = 0, page = 0;
/* 📋 문제 탭을 끝까지 넘긴 뒤 ⚡ 코드 탭으로 건너가 다시 끝까지. 넉넉히 25쪽. */
let jumped = false;
for (let guard = 0; guard < 25; guard++) {
  const total = await simTotal();
  if (total > 1) {
    sims++;
    console.log(`  ── ${page + 1}쪽 · 시뮬 ${total}단계`);
    for (let i = 1; i <= total; i++) {
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(150);
      const bt = await navBottom();
      const cut = await clippedPx();
      const over = bt != null && bt > barTop;
      if (over) bad.push(`${page + 1}쪽 ${i}단계 — ▶ 가 하단 바에 가림 (${bt} > ${barTop})`);
      if (cut > 0) bad.push(`${page + 1}쪽 ${i}단계 — 내용이 ${cut}px 잘림 (시뮬 안쪽 스크롤)`);
      console.log(`     ${String(i).padStart(2)}/${total}  ▶ bottom=${bt ?? "없음"}`
        + `${over ? "  ⚠️ 하단 바에 가림" : ""}${cut > 0 ? `  ⚠️ 내용 ${cut}px 잘림` : ""}`);
      if (i < total) {
        await p.evaluate(() => {
          const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
          if (el) el.click();
        });
        await p.waitForTimeout(380);
      }
    }
  }
  if (!(await click("다음 →"))) {
    if (jumped) break;
    jumped = true;
    if (!(await click("⚡ 코드"))) break;
  }
  page++;
}

console.log(`\n시뮬 ${sims}개를 쟀다.`);
console.log(bad.length ? `⚠️ 안 보이는 것이 있는 걸음 ${bad.length}개:\n  ${bad.join("\n  ")}`
                       : `✅ 전부 스크롤 없이 다 보인다 (버튼도, 내용도).`);
await b.close();
process.exit(bad.length ? 1 : 0);
