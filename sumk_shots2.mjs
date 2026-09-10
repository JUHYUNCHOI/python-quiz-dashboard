import { chromium } from "playwright";

const outDir = process.argv[2] || "/tmp/sumkshots";
const desktop = process.argv.includes("--desktop");
const vp = desktop ? { width: 1280, height: 900 } : { width: 375, height: 812 };

const b = await chromium.launch();
const p = await b.newPage({ viewport: vp });
await p.goto("http://localhost:3000/quest/sumk", { waitUntil: "networkidle" });

const clickAny = async (txts) => {
  const hit = await p.evaluate((arr) => {
    const cand = [...document.querySelectorAll("button,a,div,span")].filter((e) => e.children.length <= 2);
    for (const t of arr) {
      const el = cand.find((e) => e.textContent.trim() === t) || cand.find((e) => e.textContent.trim().includes(t));
      if (el) { el.click(); return t; }
    }
    return null;
  }, txts);
  await p.waitForTimeout(400);
  return hit;
};

// Advance the reveal steps (bottom nav) 4 times to reach 5th reveal card ("Grow it instead" / page5)
for (let i = 0; i < 4; i++) {
  const r = await clickAny(["Next →", "다음 →"]);
  console.log("outer next click:", r);
  await p.waitForTimeout(300);
}

await p.screenshot({ path: `${outDir}/page5_step0_${desktop?"desktop":"mobile"}.png`, fullPage: false });

for (let i = 0; i < 10; i++) {
  const clicked = await p.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const cand = btns.filter(b => b.textContent.includes("▶"));
    if (cand.length) { cand[cand.length-1].click(); return cand[cand.length-1].textContent; }
    return null;
  });
  await p.waitForTimeout(350);
  console.log(`step ${i+1} click:`, clicked);
  await p.screenshot({ path: `${outDir}/page5_step${i+1}_${desktop?"desktop":"mobile"}.png`, fullPage: false });
  if (!clicked) break;
}

await b.close();
console.log("done");
