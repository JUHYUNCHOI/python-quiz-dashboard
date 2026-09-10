import { chromium } from "playwright";

const outDir = process.argv[2] || "/tmp/sumkshots";
const desktop = process.argv.includes("--desktop");
const vp = desktop ? { width: 1280, height: 900 } : { width: 375, height: 812 };

const b = await chromium.launch();
const p = await b.newPage({ viewport: vp });
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

// Advance the reveal steps (bottom nav "다음" button) 4 times to reach 5th reveal card ("Grow it instead")
for (let i = 0; i < 4; i++) {
  await clickText("다음");
  await p.waitForTimeout(300);
}

await p.screenshot({ path: `${outDir}/page5_intro_${desktop?"desktop":"mobile"}.png`, fullPage: false });

// now step through the sim's own "다음 →" (sim internal steps use SimShell nav, look for arrow button)
for (let i = 0; i < 10; i++) {
  await p.screenshot({ path: `${outDir}/page5_step${i+1}_${desktop?"desktop":"mobile"}.png`, fullPage: false });
  // click the sim's right arrow - look inside SimShell, likely a button with text like "▶"
  const clicked = await p.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    // find rightmost nav button with ▶ text, not the outer quest nav
    const cand = btns.filter(b => b.textContent.includes("▶"));
    if (cand.length) { cand[cand.length-1].click(); return true; }
    return false;
  });
  await p.waitForTimeout(350);
  if (!clicked) break;
}

await b.close();
console.log("done");
