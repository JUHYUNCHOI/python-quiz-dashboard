/* 시뮬 **한 걸음에 읽어야 할 글줄이 몇 줄인지** 잰다. quest 의 시뮬을 전부 훑는다.
 *
 * 왜 (2026-09-10). 선생님이 sumk 한 quest 에서 열한 번 막히셨고 나는 그때마다 하나씩 고쳤다.
 * 숲 담당이 원인을 찾았다:
 *   "그날 커밋 12개 제목이 **전부 '~이 없었다 → 넣는다'** 이고 '뺐다' 는 하나뿐이다.
 *    `narr` 에는 55자 상한이 있어 파란 바는 못 커지는데 **시뮬 본문엔 상한이 없어서**,
 *    막힐 때마다 '설명 하나 더 붙이기' 가 **저항 없는 유일한 경로**였다."
 * 상한이 없으면 늘어난다. 그래서 잰다.
 *
 *   node check-sim-density.mjs <quest-id> [--desktop]
 *
 * ⚠️ **판정이 아니라 볼 자리 표시다.** 적정 줄 수는 내용마다 다르다.
 *    다만 ①한 걸음이 20줄을 넘거나 ②걸음 사이에 갑자기 배로 뛰면 거의 항상 볼 값어치가 있다.
 * ⚠️ 누적 장부처럼 **일부러 쌓이는** 시뮬은 늘어나는 게 정상이다. 숫자만 보고 판정하지 마라.
 */
import { chromium } from "playwright";

const quest = process.argv[2];
if (!quest) { console.log("사용법: node check-sim-density.mjs <quest-id> [--desktop]"); process.exit(2); }
const desktop = process.argv.includes("--desktop");
const b = await chromium.launch();
const p = await b.newPage({ viewport: desktop ? { width: 1280, height: 900 } : { width: 375, height: 812 } });
await p.goto(`http://localhost:3000/quest/${quest}`, { waitUntil: "networkidle" });

const click = async (txt) => {
  const hit = await p.evaluate((t) => {
    const cand = [...document.querySelectorAll("button,a,div,span")].filter((e) => e.children.length <= 2);
    const el = cand.find((e) => e.textContent.trim() === t) || cand.find((e) => e.textContent.trim().includes(t));
    if (el) { el.click(); return true; }
    return false;
  }, txt);
  await p.waitForTimeout(380);
  return hit;
};
const simTotal = () => p.evaluate(() => {
  const m = document.body.innerText.match(/\(\s*(\d+)\s*\/\s*(\d+)\s*\)/);
  return m && Number(m[1]) === 1 ? Number(m[2]) : 0;
});
/* 시뮬 카드 안에서 읽어야 할 줄 — 버튼 줄은 뺀다. */
const lines = () => p.evaluate(() => {
  const card = [...document.querySelectorAll("div")]
    .filter((d) => /\(\s*\d+\s*\/\s*\d+\s*\)/.test(d.innerText || "") && d.querySelector("button"))
    .sort((a, c) => a.innerText.length - c.innerText.length)[0];      // 가장 안쪽 카드
  if (!card) return 0;
  const skip = /^(처음부터|◀ 이전|다음 ▶|⏮ 처음부터|Restart|◀ Prev|Next ▶)$/;
  return (card.innerText || "").split("\n").map((x) => x.trim())
    .filter((x) => x && !skip.test(x) && !/^[⏮◀▶]/.test(x)).length;
});

await click("한국어");
if (!(await p.evaluate(() => /다음|이전/.test(document.body.innerText)))) {
  console.log("⚠️ 한국어로 못 바꿨다 — 이 상태로는 못 잰다."); await b.close(); process.exit(2);
}
console.log(`=== ${quest} · ${desktop ? "데스크탑" : "모바일"} ===`);

const warn = [];
let sims = 0, page = 0, jumped = false;
for (let g = 0; g < 25; g++) {
  const total = await simTotal();
  if (total > 1) {
    sims++;
    console.log(`  ── ${page + 1}쪽 · ${total}걸음      (걸음: 글줄)`);
    let prev = null, row = [];
    for (let i = 1; i <= total; i++) {
      const n = await lines();
      row.push(`${i}:${n}`);
      if (n > 20) warn.push(`${page + 1}쪽 ${i}걸음 — 한 걸음에 ${n}줄`);
      if (prev && n >= prev * 2 && n - prev >= 6) warn.push(`${page + 1}쪽 ${i}걸음 — ${prev} → ${n} 줄로 뛴다`);
      prev = n;
      if (i < total) {
        await p.evaluate(() => { const e = [...document.querySelectorAll("button")].find((q) => /다음\s*▶|Next\s*▶/.test(q.textContent)); if (e) e.click(); });
        await p.waitForTimeout(330);
      }
    }
    console.log(`     ${row.join("  ")}`);
  }
  if (!(await click("다음 →"))) { if (jumped) break; jumped = true; if (!(await click("⚡ 코드"))) break; }
  page++;
}
if (!sims) { console.log("⚠️ 시뮬을 못 찾았다 — '문제 없음' 이 아니라 **못 쟀다** 는 뜻이다."); await b.close(); process.exit(2); }
console.log(`\n시뮬 ${sims}개.`);
console.log(warn.length ? `⚠️ 볼 자리 ${warn.length}개:\n  ${warn.join("\n  ")}`
                        : "✅ 20줄 넘는 걸음도, 갑자기 배로 뛰는 자리도 없다.");
await b.close();
