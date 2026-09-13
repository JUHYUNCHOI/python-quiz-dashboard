/* quest 한 쪽에 **읽을 글자가 얼마나 있나** 를 잰다. 시뮬 걸음이 아니라 **쪽 단위**다.
 *
 * 왜 (2026-09-13): 선생님 *"아직도 한 화면에 너무 많은 정보가 많아.
 *   학생들에게 글이 많거나 새 페이지에 너무 많은 정보가 있거나"*
 * check-sim-density.mjs 는 **시뮬 안 걸음**만 잰다. 시뮬이 없는 쪽(제목·문제·코드 쪽)은
 * 아무도 안 재고 있었다. 그래서 그 쪽들이 얼마든 커질 수 있었다.
 *
 *   node check-page-weight.mjs http://localhost:3000/quest/moohunt [--mobile]
 *
 * ⚠️ 판정이 아니라 볼 자리 표시다. 쪽마다 하는 일이 달라 적정량이 다르다.
 */
import { chromium } from "playwright";
const url = process.argv[2];
const mobile = process.argv.includes("--mobile");
const b = await chromium.launch();
const p = await b.newPage({ viewport: mobile ? { width: 375, height: 812 } : { width: 960, height: 1000 } });
await p.goto(url + (url.includes("?") ? "&" : "?") + "lang=ko", { waitUntil: "networkidle" });
console.log(`=== ${url} · ${mobile ? "모바일" : "데스크탑"} ===`);
console.log("   쪽  글자  문장  카드  스크롤   맨 위 한 줄");
const rows = [];
for (let i = 1; i <= 20; i++) {
  const m = await p.evaluate(() => {
    const root = document.querySelector("main") || document.body;
    const txt = (root.innerText || "").replace(/\s+/g, " ").trim();
    const cards = [...root.querySelectorAll("div")].filter((d) => {
      const s = getComputedStyle(d);
      return s.borderStyle !== "none" && parseFloat(s.borderTopWidth) >= 1 && d.innerText.trim().length > 20;
    }).length;
    return { n: txt.length, sent: (txt.match(/[.?!。]|요\s|다\s/g) || []).length,
             cards, scroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
             head: (root.innerText || "").split("\n").map(s=>s.trim()).filter(Boolean)[0] || "" };
  });
  rows.push(m);
  console.log(`   ${String(i).padStart(2)} ${String(m.n).padStart(5)} ${String(m.sent).padStart(5)} ${String(m.cards).padStart(5)} ${String(m.scroll).padStart(7)}   ${m.head.slice(0, 34)}`);
  const nx = p.locator('button:has-text("다음"), button:has-text("Next")').last();
  if (!(await nx.count())) break;
  const before = await p.evaluate(() => (document.querySelector("main")||document.body).innerText.length);
  await nx.click().catch(() => {});
  await p.waitForTimeout(500);
  const after = await p.evaluate(() => (document.querySelector("main")||document.body).innerText.length);
  if (before === after && i > 3) break;
}
const worst = rows.map((r, i) => ({ ...r, i: i + 1 })).sort((a, b2) => b2.n - a.n).slice(0, 3);
console.log(`\n⚠️ 글자가 제일 많은 쪽: ` + worst.map((w) => `${w.i}쪽 ${w.n}자`).join(" · "));
console.log(`   스크롤이 제일 긴 쪽: ` + rows.map((r,i)=>({r,i:i+1})).sort((a,b2)=>b2.r.scroll-a.r.scroll).slice(0,3).map(w=>`${w.i}쪽 ${w.r.scroll}px`).join(" · "));
await b.close();
