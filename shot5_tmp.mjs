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
// navigate to page 5
for (let i=0;i<4;i++){ await click("다음 →"); }
await p.waitForTimeout(300);
console.log("PAGE TEXT SNIPPET:", (await p.evaluate(()=>document.body.innerText)).slice(0,300));
// go to step 2..6 of sim
for (let i=0;i<1;i++){
  await p.evaluate(() => {
    const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
    if (el) el.click();
  });
  await p.waitForTimeout(300);
}
await p.screenshot({ path: "/private/tmp/claude-501/-Users-juhyunchoi-Coding-python-quiz-dashboard/dc514291-2537-45a2-b226-36ab6955c2c1/scratchpad/p5_step2.png" });

for (let s=3; s<=6; s++){
  await p.evaluate(() => {
    const el = [...document.querySelectorAll("button")].find((e) => /다음\s*▶|Next\s*▶/.test(e.textContent));
    if (el) el.click();
  });
  await p.waitForTimeout(300);
  await p.screenshot({ path: `/private/tmp/claude-501/-Users-juhyunchoi-Coding-python-quiz-dashboard/dc514291-2537-45a2-b226-36ab6955c2c1/scratchpad/p5_step${s}.png` });
}

// measure chip widths - find elements with width ~13-20px that look like tile
const info = await p.evaluate(() => {
  const all = [...document.querySelectorAll("div,span")];
  const small = all.filter(e => {
    const r = e.getBoundingClientRect();
    return r.width > 5 && r.width < 40 && r.height > 5 && r.height < 40 && e.children.length === 0;
  });
  return small.map(e => ({ text: e.textContent, w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height), left: Math.round(e.getBoundingClientRect().left) }));
});
console.log(JSON.stringify(info, null, 1));
await b.close();
