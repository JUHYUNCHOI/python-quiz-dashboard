/* 영어 화면에서 코드 블록 안 주석이 실제로 영어로 나오나 — localizeCode 확인용.
   node check-code-en.mjs moohunt reflection                                   */
import { chromium } from "playwright";
const HANGUL = /[가-힣]/;
const ids = process.argv.slice(2);
const b = await chromium.launch();
for (const id of ids) {
  const p = await b.newPage();
  await p.goto(`http://localhost:3000/quest/${id}?lang=en`, { waitUntil: "networkidle" });
  let ko = 0, en = 0, blank = 0, pages = 0;
  for (let step = 0; step < 40; step++) {
    pages++;
    const lines = await p.evaluate(() =>
      [...document.querySelectorAll("pre, .qcode-scroll, [class*=code]")]
        .flatMap((n) => (n.innerText || "").split("\n")));
    for (const l of lines) {
      const t = l.trim();
      if (!/^(#|\/\/)/.test(t)) { if (HANGUL.test(t)) ko++; continue; }
      if (HANGUL.test(t)) ko++;
      else if (t.replace(/^(#|\/\/)\s*/, "")) en++;
      else blank++;
    }
    const next = p.locator('button:has-text("Next"), button:has-text("다음")').last();
    if (!(await next.count()) || (await next.isDisabled().catch(() => true))) break;
    await next.click().catch(() => {});
    await p.waitForTimeout(320);
  }
  console.log(`${id.padEnd(12)} 쪽 ${String(pages).padStart(2)} · 영어주석 ${en} · 빈주석 ${blank} · 한국어 ${ko}`);
  await p.close();
}
await b.close();
