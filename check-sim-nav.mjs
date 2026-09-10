/* 시뮬의 ▶ 버튼이 **스크롤 없이** 보이는지 걸음마다 잰다.
 *
 * 왜 (2026-09-10): 시뮬 ▶ 는 quest 하나에서 열몇 번을 눌러야 하는 버튼이다.
 * "조금 스크롤하면 닿는다" 는 일반 버튼 기준이지 이 버튼 기준이 아니다 — 마찰이 스텝 수만큼 쌓인다.
 * see-screen.mjs 는 quest 시뮬 안쪽까지 못 들어간다(--click 이 탭 버튼을 못 누른다).
 *
 *   node check-sim-nav.mjs <quest-id> [챕터로 가는 "다음 →" 횟수]
 *   예: node check-sim-nav.mjs rectangles 11
 */
import { chromium } from "playwright";

const quest = process.argv[2] || "rectangles";
const hops = Number(process.argv[3] ?? 11);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
await p.goto(`http://localhost:3000/quest/${quest}`, { waitUntil: "networkidle" });

/* ⚠️ locator(`div:has-text(...)`) 를 쓰면 **조상 div 가 다 잡힌다** — 그래서 엉뚱한 걸 누른다.
   자식이 거의 없는 잎 요소 중 글자가 정확히 같은 것만 고른다. */
const click = async (txt) => {
  await p.evaluate((t) => {
    const el = [...document.querySelectorAll("button,a,div,span")]
      .find((e) => e.children.length <= 2 && e.textContent.trim() === t);
    if (el) el.click();
  }, txt);
  await p.waitForTimeout(400);
};
await click("한국어");
await click("⚡ 코드");
for (let i = 0; i < hops; i++) await click("다음 →");

const barTop = await p.evaluate(() => {
  const bar = document.querySelector(".quest-navbar");
  return bar ? Math.round(bar.getBoundingClientRect().top) : window.innerHeight;
});
const total = await p.evaluate(() => {
  const m = document.body.innerText.match(/\(\s*\d+\s*\/\s*(\d+)\s*\)/);
  return m ? Number(m[1]) : 0;
});
if (!total) { console.log("시뮬을 못 찾았다. 다음 → 횟수를 바꿔봐라."); await b.close(); process.exit(1); }

console.log(`=== ${quest} · 모바일 375×812 · 하단 고정 바 top = ${barTop}px ===`);
const bad = [];
for (let i = 1; i <= total; i++) {
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(160);
  const r = await p.evaluate(() => {
    const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
    if (!el) return null;
    const q = el.getBoundingClientRect();
    return { bottom: Math.round(q.bottom) };
  });
  const over = r && r.bottom > barTop;
  if (over) bad.push(`${i}단계 (${r.bottom} > ${barTop}, ${r.bottom - barTop}px 밖)`);
  console.log(`  ${String(i).padStart(2)}/${total}  ▶ bottom=${r ? r.bottom : "없음"}${over ? "  ⚠️ 하단 바에 가림" : ""}`);
  if (i < total) {
    await p.locator('button:has-text("다음 ▶")').first().click().catch(() => {});
    await p.waitForTimeout(420);
  }
}
console.log(bad.length ? `\n⚠️ 스크롤해야 닿는 스텝 ${bad.length}개:\n  ${bad.join("\n  ")}`
                       : `\n✅ ${total}단계 전부 스크롤 없이 닿는다.`);
await b.close();
process.exit(bad.length ? 1 : 0);
