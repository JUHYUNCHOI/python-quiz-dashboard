#!/usr/bin/env node
/**
 * CodeWalk — **말풍선이 가리키는 코드 줄이 상자 안에 다 보이나** (좌표로 잰다)
 *
 * 왜 생겼나 (2026-10-06)
 * ---------------------
 * `swaptowin` 코드 탭을 세 라운드 고치고 학생(초6)을 다시 붙였더니:
 *
 *   *"질문이 말하는 `p+1` 이 실제로 쓰이는 줄은 **아직 화면에 안 나왔어요**.
 *     `p` 가 뭔지도 모르는데 p+1 을 왜 묻지? 하고 **멈칫했어요.**"*
 *   *"증거가 안 보이고 **주장만** 들었어요."*
 *
 * ⛔ **DOM 으로는 셋 다 「있다」였다.** 코드 줄은 전부 DOM 에 있고 상자만 스크롤된다 —
 *    `innerText.includes()` 로 보는 검사기는 **원리상 영영 통과한다.**
 *    학생은 화면을 보고 기계는 DOM 을 본다(`feedback_occlusion_needs_coordinates`).
 *
 * project-lead 실측(375×812·한국어): 코드 상자 **254px**, 말풍선이 **~97px** 을 먹는다.
 * 그래서 **네 줄짜리 `hi` 조차 끝 두 줄이 잘린다.**
 * 원인은 기획이 아니라 **수식**이다 — `CodeWalk.jsx:197-198`
 *   margin = min(lineH*3, max(0, box.clientHeight - bubH - lineH))
 *   box.scrollTop = max(0, bub.offsetTop - margin)
 * 는 **「말풍선 + 그 위 몇 줄」만** 보장하고 `hi` 의 **끝**은 보장하지 않는다.
 *
 * ⛔ **quest 하나를 고쳐서 닫을 수 없다** — 168개가 이 컴포넌트를 공유한다.
 *    단일값 수정은 **이미 한 번 되돌려졌다**(`CodeWalk.jsx:187` TOP_CLEARANCE=36 이
 *    `alchemy` 를 고치고 `checkups` 에 7px 새 겹침을 만들었다).
 *    **그래서 이 검사기는 고치는 도구가 아니라 「규모를 재는」 도구다.**
 *
 * 무엇을 세나
 * ----------
 * 걸음마다, 스크롤이 멎은 뒤 **강조된 코드 줄**(배경 `#1f2b3e`)의
 * **마지막 줄 아래끝**이 상자의 보이는 영역 안에 있나를 잰다.
 * 밖이면 「몇 줄이 잘렸나」를 센다.
 *
 * ⚠️ 못 보는 것 / 주의
 *  - **가로 잘림은 안 본다** — 코드 상자는 **일부러** 옆으로 밀게 돼 있다(`c820592b`).
 *  - **파이썬·한국어·375×812** 만 본다. `--cpp` · `--en` 은 따로 돌려라.
 *  - **0건이 결백이 아니다** — 강조가 아예 없는 걸음(`hi` 없음)은 셀 것이 없다.
 *  - ⛔ **병렬 금지.** 이 저장소에서 화면 검사기를 병렬로 돌려 **조용히 거짓 0** 이
 *    나온 전례가 둘 있다. 혼자, 직렬로 돌려라.
 *  - ⭐ `--selftest` 로 **잣대가 사는지 먼저** 봐라 — 상자를 일부러 줄여 잘림을 만든다.
 *    거기서 🚨 가 안 나오면 이 검사기의 「0건」을 믿지 마라.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = "http://localhost:3000/quest";
const VP = { width: 375, height: 812 };          // ⭐ 저장소 표준 — see-screen.mjs:56 과 같다
const HOT = "rgb(31, 43, 62)";                    // CodeWalk.jsx 의 isHot 배경 #1f2b3e

const argv = process.argv.slice(2);
const FLAG = (f) => argv.includes(f);
const ids = argv.filter((a) => !a.startsWith("-"));
const CPP = FLAG("--cpp");
const EN = FLAG("--en");
const SELFTEST = FLAG("--selftest");

function codewalkQuests() {
  const root = "quest-problems";
  return fs.readdirSync(root).filter((d) => {
    const f = path.join(root, d, "components.jsx");
    return fs.existsSync(f) && /getFullCode|CodeWalk|Walk\(/.test(fs.readFileSync(f, "utf8"))
      && /beats\s*:/.test(fs.readFileSync(f, "utf8"));
  });
}

/** 걸음 하나에서 「강조 줄이 상자 안에 다 들어오나」를 좌표로 잰다. */
const MEASURE = `() => {
  const box = document.querySelector('.qcode-scroll');
  if (!box) return { noBox: true };
  const ob = box.getBoundingClientRect();
  const HOTC = 'rgb(31, 43, 62)';
  const rows = [...box.querySelectorAll('div')].filter(e => {
    const cs = getComputedStyle(e);
    return cs.backgroundColor === HOTC && e.getBoundingClientRect().height > 4;
  });
  if (!rows.length) return { noHot: true };
  const lineH = rows[0].getBoundingClientRect().height || 27;
  let cut = 0, worst = 0;
  for (const r of rows) {
    const q = r.getBoundingClientRect();
    const over = q.bottom - ob.bottom;
    const under = ob.top - q.top;
    if (over > 2 || under > 2) { cut++; worst = Math.max(worst, over, under); }
  }
  /* 말풍선 키도 같이 잰다 — 보이는 강조줄 0 은 bubH >= clientHeight 일 때만 난다.
     같은 조건에서 말풍선 글자 아래쪽도 잘린다(학생이 질문도 다 못 읽는다).
     자세한 근거는 이 파일 맨 위 설명 참고. */
  const bub = box.querySelector('[data-cw-bubble]')
    || [...box.querySelectorAll('div')].find(e => e.textContent.trim().startsWith('💬'));
  let bubH = 0, bubCut = 0;
  if (bub) {
    const br = bub.getBoundingClientRect();
    bubH = Math.round(br.height);
    bubCut = Math.max(0, Math.round(br.bottom - ob.bottom));   // 말풍선이 상자 밖으로 넘친 px
  }
  return { total: rows.length, cut, worst: Math.round(worst),
           boxH: Math.round(ob.height), lineH: Math.round(lineH),
           bubH, bubCut, bubOverBox: bubH >= Math.round(ob.height) };
}`;

async function walkQuest(page, id) {
  const lang = EN ? "en" : "ko";
  await page.goto(`${BASE}/${id}?lang=${lang}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  if (CPP) {
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) => x.innerText.trim().includes("C++"));
      if (b) b.click();
    });
    await page.waitForTimeout(600);
  }
  // 코드 탭으로 — 라벨은 언어에 따라 다르다
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
      /코드|Code/.test(x.innerText) && x.innerText.length < 20);
    if (b) b.click();
  });
  await page.waitForTimeout(1200);
  if (!(await page.$(".qcode-scroll"))) return { skipped: "CodeWalk 을 못 찾았다" };

  const out = [];
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(320);                 // 스크롤 애니메이션이 멎을 때까지
    out.push(await page.evaluate(`(${MEASURE})()`));
    const moved = await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) => x.innerText.trim() === "다음 ▶");
      if (!b || b.disabled) return false;
      b.click();
      return true;
    });
    if (!moved) break;
  }
  return { steps: out };
}

async function selftest(browser) {
  const page = await browser.newPage({ viewport: VP });
  const id = ids[0] || "swaptowin";
  await page.goto(`${BASE}/${id}?lang=ko`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /코드|Code/.test(x.innerText) && x.innerText.length < 20);
    if (b) b.click();
  });
  await page.waitForTimeout(1300);
  // 상자를 일부러 한 줄 높이로 줄인다 — 잘림이 안 잡히면 잣대가 죽은 것
  await page.evaluate(() => {
    const box = document.querySelector(".qcode-scroll");
    if (box) box.style.height = "40px";
  });
  await page.waitForTimeout(300);
  const r = await page.evaluate(`(${MEASURE})()`);
  await page.close();
  if (r.noBox) { console.log("🚨 코드 상자를 못 찾았다 — 잣대가 죽었다."); return 1; }
  if (r.noHot) { console.log("🚨 강조 줄을 못 찾았다 — 배경색 규약이 바뀌었나? 잣대가 죽었다."); return 1; }
  if (r.cut > 0) {
    console.log(`✅ 잣대가 살아 있다 — 상자를 40px 로 줄이니 ${r.total} 줄 중 ${r.cut} 줄이 잘렸다(최대 ${r.worst}px).`);
    return 0;
  }
  console.log("🚨 **잣대가 죽었다.** 상자를 40px 로 줄였는데도 잘림이 0 이다.");
  console.log("   이 검사기의 「0건」을 믿지 마라.");
  return 1;
}

(async () => {
  const browser = await chromium.launch();
  if (SELFTEST) { const c = await selftest(browser); await browser.close(); process.exit(c); }

  const list = ids.length ? ids : codewalkQuests();
  console.log(`=== CodeWalk — 가리키는 줄이 상자 안에 다 보이나 (${VP.width}×${VP.height} · ${EN ? "영어" : "한국어"} · ${CPP ? "C++" : "파이썬"}) ===`);
  console.log(`   quest ${list.length}개 · **직렬로** 돈다 (병렬은 거짓 0 을 만든다)\n`);

  const page = await browser.newPage({ viewport: VP });
  let hitQ = 0, hitS = 0, seen = 0, missed = 0, cutLines = 0, cutPx = 0;
  for (const id of list) {
    let r;
    try { r = await walkQuest(page, id); }
    catch (e) { console.log(`  ⚪ ${id.padEnd(20)} — 못 봤다 (${e.message.split("\n")[0].slice(0, 50)})`); missed++; continue; }
    if (r.skipped) { console.log(`  ⚪ ${id.padEnd(20)} — ${r.skipped}. **못 본 것으로 친다.**`); missed++; continue; }
    seen++;
    const bad = r.steps.map((s, i) => ({ ...s, i: i + 1 })).filter((s) => s.cut > 0);
    if (!bad.length) { if (ids.length) console.log(`  ✅ ${id.padEnd(20)} — 걸음 ${r.steps.length}개 전부 상자 안`); continue; }
    hitQ++; hitS += bad.length;
    for (const s2 of bad) { cutLines += s2.cut; cutPx += s2.worst; }
    console.log(`  🚨 ${id.padEnd(20)} — 걸음 ${r.steps.length}개 중 ${bad.length}개에서 잘림`);
    for (const s of bad.slice(0, 4))
      console.log(`       걸음 ${s.i}: 강조 ${s.total}줄 중 **${s.cut}줄이 밖** (최대 ${s.worst}px · 상자 ${s.boxH}px · 줄 ${s.lineH}px · 말풍선 ${s.bubH}px${s.bubOverBox ? ' 🚨말풍선이 상자보다 큼' : ''}${s.bubCut > 2 ? ` · 말풍선도 ${s.bubCut}px 잘림` : ''})`);
    if (bad.length > 4) console.log(`       … ${bad.length - 4}개 더`);
  }
  await browser.close();

  /* ⚠️ 2026-10-06 — 처음엔 **걸음 단위로 「잘렸나/안 잘렸나」만** 셌다. 그래서
     `CodeWalk.jsx` 의 margin 식을 고쳐 **밖으로 나간 줄이 1588 → 1079 로 줄었는데도**
     걸음 수(309)가 **한 자리도 안 변해** 「아무 효과 없다」고 읽혔다.
     한 걸음에 5줄이 밖이든 2줄이 밖이든 둘 다 「잘림 1건」이었기 때문이다.
     ⭐ **나아진 것을 볼 수 있는 잣대라야 고칠 수 있다** — 줄 수와 px 도 같이 센다. */
  console.log(`\nquest ${seen}개를 실제로 밟았고, **${hitQ}개에서 찾았다** (걸음 ${hitS}개).`);
  console.log(`   화면 밖으로 나간 **줄 ${cutLines}개** · 밖으로 나간 px 합 ${cutPx}`);
  console.log(`   ⭐ 고치기 전후를 견줄 땐 **걸음 수가 아니라 이 두 수**를 봐라.`);
  if (missed) console.log(`⚠️ ${missed}개는 **못 봤다** — 결백이 아니다.`);
  console.log(`
⛔ **quest 하나를 고쳐서 닫지 마라** — 168개가 \`CodeWalk.jsx\` 를 공유한다.
   단일값 수정은 이미 한 번 되돌려졌다(TOP_CLEARANCE=36 이 alchemy 를 고치고
   checkups 에 7px 새 겹침을 만들었다). **구조 변경은 \`/decide\` 를 거쳐라.**
⚠️ **0건이 결백이 아니다** — 파이썬·한국어·375×812 만 봤다. 가로 잘림은 일부러 안 본다.
⭐ \`--selftest\` 로 **잣대가 사는지 먼저** 봐라.
근거: .claude/WORK.md 의 「CodeWalk — 긴 hi 범위가 코드 상자 아래로 잘린다」`);
})();
