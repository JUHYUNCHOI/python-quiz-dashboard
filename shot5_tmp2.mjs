import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
await p.goto("http://localhost:3000/quest/sumk", { waitUntil: "networkidle" });
const click = async (txt) => {
  const hit = await p.evaluate((t) => {
    const cand = [...document.querySelectorAll("button,a,div,span")].filter((e) => e.children.length <= 2);
    const el = cand.find((e) => e.textContent.trim() === t) || cand.find((e) => e.textContent.trim().includes(t));
    if (el) { el.click(); return true; }
    return false;
  }, txt);
  await p.waitForTimeout(400);
  return hit;
};
await click("한국어");
for (let i=0;i<4;i++){ await click("다음 →"); }
await p.waitForTimeout(300);
for (let i=0;i<1;i++){
  await p.evaluate(() => {
    const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
    if (el) el.click();
  });
  await p.waitForTimeout(300);
}
// find the outer row container - go up from a tile "1" element
const info = await p.evaluate(() => {
  const all = [...document.querySelectorAll("div,span")];
  const tile = all.find(e => e.textContent.trim() === "1" && e.children.length===0 && e.getBoundingClientRect().width < 20);
  let node = tile;
  const chain = [];
  for (let i=0;i<8 && node; i++){
    const r = node.getBoundingClientRect();
    chain.push({tag: node.tagName, cls: node.className && node.className.toString().slice(0,60), w: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right)});
    node = node.parentElement;
  }
  return chain;
});
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: "/private/tmp/claude-501/-Users-juhyunchoi-Coding-python-quiz-dashboard/dc514291-2537-45a2-b226-36ab6955c2c1/scratchpad/p5_full.png", fullPage: false });
await b.close();
