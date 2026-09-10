import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
await p.goto("http://localhost:3000/quest/sumk", { waitUntil: "networkidle" });
const clickText = async (txt) => {
  const hit = await p.evaluate((t) => {
    const cand = [...document.querySelectorAll("button,a,div,span")].filter((e) => e.children.length <= 2);
    const el = cand.find((e) => e.textContent.trim() === t) || cand.find((e) => e.textContent.trim().includes(t));
    if (el) { el.click(); return true; }
    return false;
  }, txt);
  await p.waitForTimeout(400);
  return hit;
};
for (let i=0;i<4;i++){ await clickText("다음"); await p.waitForTimeout(300); }
const btnTexts = await p.evaluate(()=>[...document.querySelectorAll("button")].map(b=>b.textContent.trim()));
console.log(JSON.stringify(btnTexts));
await b.close();
