import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
await p.goto("http://localhost:3000/quest/sumk", { waitUntil: "networkidle" });
console.log("URL:", p.url());
const btnTexts = await p.evaluate(()=>[...document.querySelectorAll("button")].map(b=>b.textContent.trim()));
console.log("BEFORE CLICK:", JSON.stringify(btnTexts));
await p.screenshot({path:"/tmp/dbg0.png"});
await b.close();
