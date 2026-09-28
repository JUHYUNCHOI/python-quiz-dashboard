#!/usr/bin/env node
/**
 * check-codewalk-bubble-hidden.mjs
 *   — **CodeWalk 말풍선(지금 설명 중인 글)이 하단 고정 바에 먹히나.** 좌표로 잰다.
 *
 *   node scripts/check-codewalk-bubble-hidden.mjs [quest-id ...] [--all] [--mobile] [--en]
 *
 *   인자를 안 주면 `quest-problems/` 에서 CodeWalk 을 쓰는 quest 를 **전부** 찾아 돈다
 *   (실측 168개). ⛔ **직렬로만 돌린다** — 아래 「왜 병렬 금지인가」 참고.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 생겼나 (2026-09-28)
 *
 * 학생 셋이 각각 같은 것을 보고했다 —
 *   *"**마지막 걸음의 제일 중요한 마무리 설명**이 버튼 줄 아래 한 줄로 뭉개져서 거의
 *     안 보인다. 나는 **뭐라고 써 있는지 안 보여서 그냥 넘어갔다.**"*
 * 원인은 코드창 안쪽 스크롤이 `scrollHeight - clientHeight` 에서 잘리는 것이었고
 * `b266a93f` 로 고쳤다. 그런데 **확인은 표본 10개**뿐이었다.
 * **이 컴포넌트를 quest 168개가 공유한다.**
 *
 * `ux-reviewer` 판정(2026-09-28): **기존 검사기 둘 다 이 층을 못 본다.**
 *   - `check-fixed-bar-overlap.mjs` 는 「**클릭**을 뺏기나」만 본다(`elementFromPoint`).
 *     말풍선은 클릭 대상이 아니라 **원리상 못 잡는다.**
 *   - `see-screen.mjs` 의 겹침 판정은 `inFixed()` 가 `position: fixed|sticky` 만 거르는데,
 *     CodeWalk 의 조작 바(`pinWrap`)는 `position: relative` + `transform: translateY` 라
 *     **안 걸러진다.** 그러면 「조작 바가 코드창 꼬리를 덮는 정상 동작」까지 겹침으로
 *     신고해 **진짜 신고가 그 밑에 묻힌다.**
 *
 * ⭐ **잣대를 좁게 잡는 것이 이 검사기의 핵심이다.**
 *   「무엇과 무엇이 겹치나」를 일반적으로 찾지 않는다. **딱 하나의 관계**만 본다 —
 *   **말풍선 아래끝이 `.quest-navbar` 위끝보다 아래로 내려갔나.**
 *   조작 바가 코드를 덮는 건 **설계된 정상 동작**이라 절대 신고하지 않는다.
 *   그래서 오탐 위험이 위 둘보다 훨씬 낮다.
 *
 * ⛔ **병렬로 돌리지 마라 — 조용히 «0곳» 이 나온다.**
 *   `check-fixed-bar-overlap.mjs` 가 8병렬에서 180개 중 **169개를 거짓 0** 으로 만든
 *   전례가 있다(2026-09-27 실측, 2병렬에서도 깨졌다). 같은 dev 서버·같은 Chromium
 *   경쟁 조건이라 이 스크립트도 똑같이 위험하다.
 *
 * ⚠️ **0건이 결백이 아니다** — 이 검사기가 **안 보는 것**:
 *   ①마지막 걸음만 본다(중간 걸음은 `--every-step` 으로)
 *   ②한 언어만 본다(`--cpp` 로 따로 — 언어마다 걸음 수·줄 길이가 달라 위험도가 다르다)
 *   ③코드창 **맨 밑 줄**이 조작 바에 살짝 잘리는 것은 **일부러 안 본다** —
 *     `ux-reviewer` 판정: *"잘리는 건 아직 설명 안 된 흐린 다음 줄뿐이고, 다음 걸음으로
 *     넘기면 하이라이트되며 온전히 다시 나온다. 허용 가능."*
 * ─────────────────────────────────────────────────────────────────────────
 */

import { chromium } from "playwright";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const argv = process.argv.slice(2);
const has = (f) => argv.includes(`--${f}`);
const MOBILE = has("mobile");
const EN = has("en");
const CPP = has("cpp");
const EVERY = has("every-step");
/* `--selftest` — **이 검사기가 진짜 잡는지** 스스로 확인한다.
   고정 바를 강제로 키워 말풍선을 덮게 만든다. 여기서 🚨 가 안 나오면 **잣대가 죽은 것**이다.
   왜 필요한가 (2026-09-28): 음성 대조로 「스페이서를 0 으로 되돌리기」를 썼는데 **0건**이
   나왔다. 확인해 보니 검사기가 틀린 게 아니라 **그 방법으로는 결함이 재현되지 않았다**
   (실측 strangefn: 말풍선 775~823, 바 832~ — 9px 차이로 안 걸린다). 옛 결함을 되살리는
   대신 **잣대가 살아 있나**를 직접 확인하는 쪽이 재현 가능하고 정직하다.
   `feedback_checkers_can_be_silently_wrong` — 0건이면 «이 검사기가 아직 도나»부터 물어라. */
const SELFTEST = has("selftest");
const named = argv.filter((a) => !a.startsWith("--"));

/* ⚠️ 라벨을 박지 마라 — 기본 언어가 **영어**다(`contexts/language-context.tsx:29`).
   2026-09-28 실측: `/^(⚡|💻)\s*(코드|Code)\b/` 의 `\b` 는 **한국어에서 절대 안 맞는다**
   (`드` 가 `\w` 가 아니다) — 그 대비책이 영어에서만 돌고 있었다. 둘 다 받게 쓴다. */
const CODE_TAB = /^(⚡|💻)\s*(코드|Code\b)/;
/* ⚠️ 2026-09-28 전수 첫 판에서 **4개를 못 봤다.** 파 보니 원인이 셋이었다 —
   ① 탭 이름이 「코드」가 아닌 quest 가 있다. `rounding` 은 **「⚡ 더 빠르게」** 다.
      → ⚡·💻 로 시작하는 탭이면 **이름을 안 따진다**(문제 탭은 📋·🧭 라 안 겹친다).
   ② 탭에 들어간 **첫 쪽에 말풍선이 없을 수 있다**(`cowsignal`·`mcc20kitty`).
      → 코드창을 찾았다고 멈추지 말고 **말풍선이 나올 때까지** 쪽을 넘긴다.
   ③ 탭을 누른 뒤 800ms 로는 덜 그려질 때가 있다(`chipxchg`). → 1000ms.
   **이 넷을 「없다」로 치고 넘어갔으면 전수라고 말할 수 없었다.** */
/* ⛔ 그냥 `/^(⚡|💻)/` 로 넓혔더니 **언어 토글 「💻 C++」을 탭으로 집었다**(실측 rounding).
   토글 둘(🐍 Py · 💻 C++)을 명시적으로 뺀다. */
const LANG_TOGGLE = /^(🐍\s*Py|💻\s*C\+\+)$/;
const CODE_TAB_LOOSE = /^(⚡|💻)\s*\S/;
const NEXT_PAGE = /^(다음 쪽 ▶|Next page ▶|다음 →|Next →)$/;
const NEXT_STEP = /^(다음 ▶|Next ▶|▶)$/;           // SimNav — 쪽 넘김과 안 겹치게

function codewalkQuests() {
  const root = "quest-problems";
  return readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => {
      const dir = join(root, d.name);
      return readdirSync(dir).some(
        (f) => f.endsWith(".jsx") && readFileSync(join(dir, f), "utf8").includes("CodeWalk"));
    })
    .map((d) => d.name);
}

const targets = named.length ? named : codewalkQuests();
const url = (q) => `http://localhost:3000/quest/${q}` + (EN ? "" : "?lang=ko");

/* ⚠️ **처음 여기서 조용히 틀렸다(2026-09-28).** 말풍선의 날 `getBoundingClientRect()`
   를 그대로 바 위치와 비교했더니, 스페이서를 0 으로 없애 **결함을 되살려도 0건**이
   나왔다(음성 대조 실패). 이유 —
     말풍선은 **자기 스크롤 상자(`.qcode-scroll`) 안**에 있다. 상자가 말풍선을 끝까지
     못 올리면 말풍선은 **상자 밖(아래)으로 잘려 안 보이게** 되는데, 날 rect 는
     **잘리기 전 자리**를 그대로 돌려준다. 그래서 「바 위에 있다」로 읽혔다.
   → **① 상자와의 교집합(= 실제로 보이는 부분)을 먼저 내고 ② 그게 바에 먹히나**를 본다.
     상자 밖으로 완전히 밀려 **아예 안 보이는** 경우도 따로 신고한다 — 학생이 겪은 게
     그것이다(*"뭐라고 써 있는지 안 보여서 그냥 넘어갔다"*).
   `see-screen.mjs` 의 `visRect()` 와 같은 생각이다. */
const MEASURE = `(() => {
  const bub = document.querySelector('[data-codewalk-bubble]');
  const bar = document.querySelector('.quest-navbar');
  if (!bub) return { 없음: '말풍선' };
  if (!bar) return { 없음: '고정 바' };
  const b = bub.getBoundingClientRect(), n = bar.getBoundingClientRect();
  const box = bub.closest('.qcode-scroll');
  let top = b.top, bottom = b.bottom;
  if (box) {
    const q = box.getBoundingClientRect();
    top = Math.max(top, q.top); bottom = Math.min(bottom, q.bottom);
  }
  const 보이는높이 = Math.max(0, bottom - top);
  const 전체높이 = Math.max(1, b.bottom - b.top);
  return {
    말풍선: [Math.round(b.top), Math.round(b.bottom)],
    보이는: [Math.round(top), Math.round(bottom)],
    고정바: [Math.round(n.top), Math.round(n.bottom)],
    잘린비율: Math.round((1 - 보이는높이 / 전체높이) * 100),   // 상자에 얼마나 잘렸나
    먹힌높이: Math.round(Math.max(0, bottom - n.top)),        // 보이는 부분이 바에 먹힌 높이
    글: (bub.textContent || '').trim().slice(0, 40),
  };
})()`;

const browser = await chromium.launch();
let bad = 0, seen = 0, skipped = 0;
try {
  console.log(`=== CodeWalk 말풍선이 하단 고정 바에 먹히나 ` +
    `(${MOBILE ? "모바일 375" : "데스크탑 1280"} · ${EN ? "영어" : "한국어"}` +
    `${CPP ? " · C++" : ""}${EVERY ? " · 모든 걸음" : " · 마지막 걸음"}` +
    `${SELFTEST ? " · ⚠️ 자기시험(바를 일부러 키움 — 🚨 가 나와야 정상)" : ""}) ===`);
  console.log(`   quest ${targets.length}개 · **직렬로** 돈다 (병렬은 거짓 0 을 만든다)\n`);

  for (const q of targets) {
    const ctx = await browser.newContext({
      viewport: MOBILE ? { width: 375, height: 812 } : { width: 1280, height: 900 },
    });
    const page = await ctx.newPage();
    try {
      await page.goto(url(q), { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(2200);
      await page.addStyleTag({ content: "*{scroll-behavior:auto !important}" });
      if (SELFTEST) await page.addStyleTag({ content: ".quest-navbar{min-height:520px !important}" });

      let tab = page.locator("button").filter({ hasText: CODE_TAB }).first();
      if (!(await tab.count())) {
        tab = page.locator("button")
          .filter({ hasText: CODE_TAB_LOOSE })
          .filter({ hasNotText: LANG_TOGGLE })
          .first();
      }
      if (await tab.count()) { await tab.click(); await page.waitForTimeout(1000); }

      if (CPP) {
        const c = page.locator("button", { hasText: "💻 C++" }).first();
        if (await c.count()) { await c.click(); await page.waitForTimeout(600); }
      }

      // 계획 쪽을 건너뛰어 CodeWalk 이 있는 쪽까지 간다.
      // ⚠️ 잣대는 `.qcode-scroll`(코드창) 이 아니라 **말풍선**이다 — 코드창은 있는데
      //    그 쪽엔 말풍선이 없는 quest 가 있다(`cowsignal`·`mcc20kitty`, 실측).
      for (let i = 0; i < 12 && !(await page.locator("[data-codewalk-bubble]").count()); i++) {
        const n = page.locator("button").filter({ hasText: NEXT_PAGE }).first();
        if (!(await n.count()) || (await n.isDisabled())) break;
        await n.click(); await page.waitForTimeout(650);
      }
      if (!(await page.locator("[data-codewalk-bubble]").count())) {
        console.log(`  ⚪ ${q.padEnd(20)} — CodeWalk 을 못 찾았다. **못 본 것으로 친다.**`);
        skipped++; seen++; await ctx.close(); continue;
      }

      const worst = [];
      for (let step = 0; step < 60; step++) {
        if (EVERY || step === 0) { /* 아래에서 잰다 */ }
        const nx = page.locator("button").filter({ hasText: NEXT_STEP }).first();
        const more = (await nx.count()) && !(await nx.isDisabled());
        if (EVERY || !more) {
          const m = await page.evaluate(MEASURE);
          if (!m.없음 && (m.먹힌높이 > 2 || m.잘린비율 > 15)) worst.push({ ...m, 걸음: step + 1 });
        }
        if (!more) break;
        await nx.click(); await page.waitForTimeout(220);
      }

      seen++;
      if (!worst.length) console.log(`  ✅ ${q.padEnd(20)} — 말풍선이 바 위에 온전히 있다`);
      else {
        bad++;
        console.log(`  🚨 ${q.padEnd(20)}`);
        for (const w of worst.slice(0, 3)) {
          console.log(`       걸음 ${w.걸음} · ` +
            (w.잘린비율 > 15 ? `**코드창에 ${w.잘린비율}% 잘림** ` : "") +
            (w.먹힌높이 > 2 ? `**고정 바에 ${w.먹힌높이}px 먹힘** ` : "") +
            `(말풍선 ${w.말풍선.join("~")} · 보이는 ${w.보이는.join("~")} · 바 ${w.고정바.join("~")})`);
          console.log(`          «${w.글}»`);
        }
      }
    } catch (e) {
      console.log(`  ⚠️ ${q.padEnd(20)} — ${String(e).slice(0, 70)} · **못 봤다**`);
      skipped++; seen++;
    }
    await ctx.close();
  }

  console.log(`\nquest ${seen}개 중 ${seen - skipped}개를 실제로 밟았고, **${bad}개에서 찾았다.**` +
    (skipped ? `  ⚠️ ${skipped}개는 못 봤다.` : ""));
  console.log(`⚠️ **0건이 결백이 아니다** — ${EVERY ? "" : "마지막 걸음만 · "}` +
    `${CPP ? "C++" : "파이썬"} 만 · ${MOBILE ? "모바일" : "데스크탑"} 만 봤다.`);
  console.log(`   나머지는 --every-step · --cpp · --mobile · --en 으로 따로 돌려라.`);
  console.log(`⚠️ 코드창 **맨 밑 줄**이 조작 바에 살짝 잘리는 것은 일부러 안 본다 —`);
  console.log(`   ux-reviewer 판정: 아직 설명 안 된 흐린 줄이고 다음 걸음에서 온전히 나온다.`);
} finally {
  await browser.close();
}
process.exit(bad ? 1 : 0);
