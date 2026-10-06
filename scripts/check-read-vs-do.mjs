#!/usr/bin/env node
/**
 * 쪽마다 **읽을 글자**와 **누를 것**을 세어, 「읽기만 하는 쪽」을 찾는다.
 *
 * 왜 생겼나 (2026-10-02):
 *   선생님: *"눈으로 보는게 아니라 **읽어야 하는 설명이 너무 많아.**
 *            그래서 우리가 **시뮬레이션이라는것을 나둔거잖아**"*
 *
 *   `mcc20missing` 을 재 보니 한눈에 보였다 —
 *     3쪽(시뮬) 357자 · 누를 것 6개   ← 좋다
 *     4쪽(퀴즈) 150자 · 누를 것 4개   ← 좋다
 *     **5쪽(🚀 빠름) 484자 · 누를 것 0개**  ← 선생님이 막히신 바로 그 쪽
 *
 *   `check-narr-length` 는 **파란 내레이션 바 한 줄**만 잰다.
 *   `see-screen` 의 55자 규칙도 **한 문장** 단위다.
 *   「이 쪽 전체가 읽기만 시키나」를 보는 잣대는 **없었다.**
 *
 * ⛔ 판정이 아니라 볼 자리 표시다 — 문제 설명(1~2쪽)처럼 **읽는 게 맞는 쪽**이 있다.
 *   물어볼 것은 하나다: **이 쪽이 말로 하는 것을 시뮬이 보여줄 수 있나?**
 *
 * 쓰기:
 *   node scripts/check-read-vs-do.mjs <quest-id> [...]
 *   node scripts/check-read-vs-do.mjs --selftest
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3000/quest";
// 페이지 크롬 — quest 내용이 아니다
const CHROME =
  /코드린|Login|로그인|목록|이용약관|개인정보|문의|© 20|다음 쪽|이전 쪽|Next page|Prev page|완료|Done|원문|한국어|English|풀이 방법|^📋|^⚡/;
/* ⛔ 「누를 것」에서 빼야 하는 것 — **학습 조작이 아닌 버튼**이다.
     처음엔 `원래 문제`·`📄 PDF` 를 안 뺐더니, 그 둘만 있는 **순수 읽기 쪽**이
     「누를 것 2개」로 잡혀 자기시험이 **0개**를 찍었다(잣대가 죽은 채로 통과할 뻔했다).
     원문 PDF 와 내려받기는 **그 쪽이 가르치는 것과 무관**하다. */
const NAVLIKE =
  /다음 쪽|이전 쪽|Next page|Prev page|^📋|^⚡|한국어|English|원문|원래 문제|Original|PDF|완료|Done|목록|^[0-9]+$/;

// 이 글자 수를 넘고 누를 것이 0개면 「읽기만 하는 쪽」으로 본다.
const CHARS_LIMIT = 320;

async function pageStats(page) {
  return page.evaluate(
    ([chromeSrc, navSrc]) => {
      const CH = new RegExp(chromeSrc);
      const NAV = new RegExp(navSrc);
      const lines = document.body.innerText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((l) => !CH.test(l) && !/^\d+( \/ \d+)?( 쪽)?$/.test(l));
      const chars = lines.join("").replace(/\s/g, "").length;
      const btns = [...document.querySelectorAll("button")]
        .map((b) => b.innerText.trim())
        .filter((s) => s && !NAV.test(s));
      // 입력칸도 「하는 것」이다
      const inputs = document.querySelectorAll("input, select, textarea").length;
      /* ⛔ `lines` 는 위에서 **쪽 번호 줄을 이미 걸러냈다**(`/^\d+( \/ \d+)?( 쪽)?$/`).
           거기서 marker 를 찾으니 **늘 빈 문자열**이었고, 「같은 쪽이 또 나왔다」로 읽혀
           **두 번째 쪽에서 멈췄다**(실측: 「쪽 1개」). 원문에서 찾아야 한다. */
      const marker = (document.body.innerText.match(/\d+ \/ \d+ 쪽|\d+ \/ \d+/) || [""])[0];
      // 탭 이름도 **화면이 말하는 것**을 읽는다 — 쪽 번호를 들고 있는 탭이 지금 탭이다
      const tabBtn = [...document.querySelectorAll("button")]
        .map((b) => b.innerText.trim())
        .find((s2) => /^(📋|⚡)/.test(s2) && /\d+ \/ \d+/.test(s2));
      const tab = tabBtn ? tabBtn.slice(0, 2) : "?";
      return { chars, acts: btns.length + inputs, sample: btns.slice(0, 4), marker, tab };
    },
    [CHROME.source, NAVLIKE.source]
  );
}

async function nextPage(page) {
  return page.evaluate(() => {
    const e = [...document.querySelectorAll("button")].find((b) =>
      /다음 쪽|Next page/.test(b.innerText.trim())
    );
    // ⛔ 마지막 쪽에서도 버튼은 **DOM 에 남아 있고 `disabled` 만 걸린다.**
    //    `!e` 만 보면 true 가 계속 나와 **같은 쪽을 일곱 번** 센다(실측).
    if (!e || e.disabled || e.getAttribute("aria-disabled") === "true") return false;
    e.scrollIntoView({ block: "center" });
    e.click();
    return true;
  });
}

async function scanQuest(browser, id, lang) {
  /* ⚠️ 2026-10-06 — 여기만 **390×900** 이었다. 저장소 표준은 `see-screen.mjs:56` 의
       **375×812**(학생이 쓰는 화면)다. 크기가 다르면 **같은 화면이 다르게 보인다** —
       그날 내가 390×900 으로 「코드 창에 1~8줄이 보인다」고 쟀는데 학생이 375×812 에서
       보니 **1~5줄**이었다. 「말풍선이 가리키는 줄이 화면에 있나」 판정이 통째로 뒤집혔다.
     ⭐ 새 화면 스크립트를 쓸 땐 이 숫자를 **베끼지 말고** 표준을 따라라
       (`feedback_check_as_the_student_sees_it` · `feedback_example_code_is_contagious`). */
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const rows = [];
  try {
    await page.goto(`${BASE}/${id}?lang=${lang}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    /* ⛔ **탭마다 따로 걷지 않는다.** 📋 끝(4/4)에서 다음을 누르면 ⚡ 1/2 로
         **자동으로 넘어간다** — 탭마다 돌면 같은 쪽을 두 번 센다(실측:
         `mcc20missing` 의 「📋5 401자」와 「⚡1 401자」가 같은 쪽이었다).
       ⭐ 처음부터 끝까지 **한 번만** 걷고, 탭·쪽 번호는 **화면이 말하는 것**을 읽는다. */
    const seen = new Set();
    for (let i = 0; i < 40; i++) {
      const st = await pageStats(page);
      const key = `${st.tab}|${st.marker}`;
      if (seen.has(key)) break;          // 같은 쪽이 또 나오면 끝이다
      seen.add(key);
      rows.push(st);
      if (!(await nextPage(page))) break;
      await page.waitForTimeout(430);
    }
  } finally {
    await page.close();
  }
  return rows;
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const selftest = process.argv.includes("--selftest");
  const lang = process.argv.includes("--en") ? "en" : "ko";

  if (selftest) {
    // 잣대가 사는지 — 「읽기만 하는 쪽」이 알려진 quest 로 확인한다.
    console.log("=== 자기시험: 읽기 전용 쪽이 실제로 잡히나 ===");
    const b = await chromium.launch();
    const rows = await scanQuest(b, "mcc20missing", "ko");
    await b.close();
    const readOnly = rows.filter((r) => r.acts === 0 && r.chars >= CHARS_LIMIT);
    const simPage = rows.find((r) => r.acts >= 4);
    const ok = readOnly.length > 0 && simPage;
    console.log(`  ${readOnly.length ? "✅" : "🚨"} 읽기 전용 쪽 ${readOnly.length}개 잡힘`);
    console.log(`  ${simPage ? "✅" : "🚨"} 누를 것 많은 쪽도 구분됨 (최대 ${Math.max(...rows.map((r) => r.acts))}개)`);
    console.log(`\n${ok ? "잣대가 산다." : "🚨 잣대가 죽었다 — 고쳐라."}`);
    process.exit(ok ? 0 : 1);
  }

  if (!args.length) {
    console.error("quest id 를 하나 이상 넘겨라.  예: node scripts/check-read-vs-do.mjs mcc20missing sumk");
    process.exit(2);
  }

  const browser = await chromium.launch();
  let flagged = 0;
  console.log(`=== 읽을 글자 대 누를 것 (모바일 390 · ${lang === "ko" ? "한국어" : "영어"}) ===\n`);
  for (const id of args) {
    const rows = await scanQuest(browser, id, lang);
    const bad = rows.filter((r) => r.acts === 0 && r.chars >= CHARS_LIMIT);
    flagged += bad.length;
    const worst = Math.max(0, ...rows.map((r) => r.chars));
    console.log(`  ${bad.length ? "⚠️" : "✅"} ${id.padEnd(18)} 쪽 ${rows.length}개 · 가장 긴 쪽 ${worst}자 · **읽기만 하는 쪽 ${bad.length}개**`);
    for (const r of bad) {
      console.log(`       [${r.tab}] ${r.marker}  ${r.chars}자 · 누를 것 0개`);
    }
  }
  await browser.close();
  console.log(`\n읽기만 하는 쪽 — 모두 ${flagged}개`);
  console.log(`
⛔ **판정이 아니라 볼 자리 표시다.** 문제 설명(1~2쪽)처럼 **읽는 게 맞는 쪽**이 있다.
   ⭐ 물어볼 것은 하나다 — **이 쪽이 말로 하는 것을 시뮬이 보여줄 수 있나?**
      보여줄 수 있으면 글을 지우고 **누르게** 해라(2026-10-02 \`mcc20missing\`: 484자 → 404자,
      식 네 줄을 지우고 그 식을 **후보 버튼에 붙였다**).
⚠️ ${CHARS_LIMIT}자는 눈금일 뿐이다. 글자 수가 적어도 **읽기만 시키면** 같은 병이다.
근거: 선생님 2026-10-02 *"눈으로 보는게 아니라 읽어야 하는 설명이 너무 많아.
      그래서 우리가 시뮬레이션이라는것을 나둔거잖아"*`);
}

main();
