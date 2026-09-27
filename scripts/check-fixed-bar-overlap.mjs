#!/usr/bin/env node
/**
 * check-fixed-bar-overlap.mjs — 고정 바의 **진짜 버튼**이 본문의 **진짜 버튼**과
 * 같은 픽셀을 쓰는 자리를 찾는다.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 왜 이게 따로 필요한가 (2026-09-26)
 *
 * `see-screen.mjs` 는 이 결함을 **원리상 못 본다.** 그쪽은 2026-09-09 에 헛경보를
 * 죽이려고 잣대를 **「어느 스크롤 위치에서도 한 번도 못 눌린 것만 신고」** 로 바꿨다.
 * 그런데 이 결함은 **특정 스크롤 구간에서만** 가려진다 — 더 내리면 눌린다.
 * 그래서 `see-screen` 은 **0건**으로 보고한다. (어제 `/quest` ✓ 토글 건을 조사한
 * 다른 세션이 같은 결론에 닿았다: *"신·구 버전 모두 0개로 보고한다."*)
 *
 * 「조금 더 스크롤하면 눌리잖아」가 방어가 안 되는 이유 — 실측(ux, 375×812):
 *   `mcc20citytour` 에서 스크롤 30~115px 에 시뮬의 «▶ 다음» 이 고정 바의 «다음 →» 에
 *   덮인다. 거기서 누르면 **BFS 시뮬을 통째로 건너뛰고 코드 쪽으로 점프**한다.
 *
 *   ✅ **정정(2026-09-27): 「돌아오면 1/20 으로 리셋된다」는 더 이상 사실이 아니다.**
 *   그 뒤 `Mcc20CityTourBfsProcessStepper` 의 걸음을 `stepByPreset` + localStorage
 *   (`quest-step-mcc20citytour-bfsprocess`) 로 옮겨서, 언마운트됐다 돌아와도
 *   보던 걸음이 그대로 살아난다. **되돌릴 수 없던 부분은 없어졌다.**
 *   (다만 `presetKey` 는 안 남겨서 「🧊 갇힌 칸 예제」를 보다 나가면 메인으로 돌아온다.)
 *
 *   ⚠️ **그래도 결함은 남는다** — 오탭은 여전히 「보던 쪽을 잃는」 일이고,
 *   스크롤 110px 근처에서는 도둑이 **disabled 인 «← 이전»** 이라 **아무 일도 안 난다.**
 *   선생님(2026-09-27): *"시뮬레이션에서 다음 버튼이 눌러지는것 같지도 않아."*
 *   ⭐ **이 증상의 정확한 이름이 그것이다 — 「안 눌린다」가 아니라 「빈 버튼이 먹는다」.**
 *
 * ⛔ **이건 `feedback_one_nav_shape_per_screen` 의 「모양이 같아서 헷갈림」과 다른 층이다.**
 *    citytour 는 그 교훈대로 모양·색을 이미 갈라 놨는데도 났다. 둘이 **동시에 안 보이기**
 *    때문이다 — 학생 눈엔 «헷갈리는 둘» 이 아니라 «하나만 보이는데 그게 가짜» 다.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * 잣대
 *   고정 요소(`position: fixed` **또는 `sticky`**) 안의 **누를 수 있는** 것과,
 *   그 밖의 **누를 수 있는** 것이 **어떤 스크롤 위치에서든** 화면 사각형을 겹치면 신고한다.
 *   (2026-09-27: `sticky` 도 보게 넓혔다 — `sticky top-[57px]` 상단 바가 「⚡ Code」
 *   탭·형제 quest 피커 클릭을 스크롤 100px 부근에서 가로채는 게 `feedcows` 에서 잡혔는데,
 *   `fixed` 만 보던 옛 잣대는 원리상 못 봤다.)
 *   그리고 그 자리에서 `elementFromPoint` 로 **실제로 누가 클릭을 가져가는지** 확인한다 —
 *   겹치기만 하고 안 뺏기는 경우(`pointer-events:none` 등)를 헛경보로 버리려고.
 *
 * ⚠️ **`see-screen.mjs` 의 옛 잣대가 「그냥 틀린」 게 아니다 — 내가 처음에 그렇게 적었다가
 *    실측하고 고쳤다.** 푸터 링크(`Privacy`·`Contact`)는 스크롤 중에 바 밑을 지나지만,
 *    쪽 **맨 아래에서는 y=692 로 바(744) 위에 올라와 멀쩡히 눌린다**(`shellgame` 실측).
 *    즉 「끝까지 못 눌리나」 잣대로는 **정당하게** 0건이다.
 *    ⭐ **진짜 갈림길은 「그 버튼을 한 번 누르나, 한 자리에 머문 채 스무 번 누르나」다.**
 *    시뮬의 ◀▶ 는 학생이 **읽기 좋은 자리에 멈춰 두고 되풀이해서** 누른다 — 그 자리가
 *    하필 바 밑이면 스무 번이 다 막힌다. 푸터는 한 번 가서 한 번 누르면 된다.
 *    그래서 이 검사기는 **푸터·헤더 같은 페이지 크롬을 「참고」로 내리고 본문만 센다.**
 *    ⚠️ 이 가르기는 **DOM 위치(footer/header/nav)로 하는 근사**다 — 완벽하지 않다.
 *
 * ⚠️ 못 보는 것 (0건이 결백이 아니다)
 *   ① 탭·쪽을 넘겨야 나오는 화면. 이 스크립트는 **연 쪽 하나**만 본다
 *      (`--tab "⚡ 코드"` 로 한 번은 눌러 준다).
 *   ② (2026-09-27 해소) `position: sticky` 도 이제 본다.
 *   ③ 겹치는데 **둘의 동작이 같은** 경우 — 신고는 하되 심각도를 낮춘다.
 *   ④ Chromium 은 `env(safe-area-inset-*)` 를 늘 0 으로 본다. 실기기에서 바가 더 크면
 *      겹치는 구간도 더 넓다 — 여기 수치는 **하한**이다.
 *
 * 쓰는 법
 *   node scripts/check-fixed-bar-overlap.mjs <quest-id 또는 URL> [...]
 *   node scripts/check-fixed-bar-overlap.mjs mcc20citytour astral herdle
 *   옵션: --desktop (기본 모바일 375×812) · --step 10 · --max-scroll 1200 · --tab "⚡ 코드"
 */

import { chromium } from "playwright";

const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
};
const MOBILE = !argv.includes("--desktop");
const STEP = Number(flag("step", 10));
const MAX_SCROLL = Number(flag("max-scroll", 1200));
const TAB = flag("tab", null);
const tabMissed = [];
const unstable = [];
const targets = argv.filter(a => !a.startsWith("--") && a !== String(STEP)
  && a !== String(MAX_SCROLL) && a !== TAB);

if (!targets.length) {
  console.error("쓰는 법: node scripts/check-fixed-bar-overlap.mjs <quest-id|URL> [...]");
  process.exit(2);
}
const toUrl = (t) => t.startsWith("http") ? t : `http://localhost:3000/quest/${t}`;

/** 화면에서 실제로 누를 수 있는 것만 추린다. */
const COLLECT = `(() => {
  /* 주의: disabled 를 여기서 빼면 안 된다 - 고정 바의 «비활성» 버튼도 탭을 삼킨다.
     실측(2026-09-26, citytour 스크롤 110px): 겹친 상대가 disabled 인 «← 이전» 이었다.
     그때 학생이 누르면 시뮬도 쪽도 안 넘어간다 - 아무 일도 안 난다.
     예전 학생이 "아무 반응 없다" 고 한 바로 그 증상이라 더 나쁠 수도 있다.
     그래서 피해자(본문) 는 disabled 를 빼고, 도둑(고정) 은 disabled 도 센다.
     (이 주석은 template literal 안이라 backtick 을 쓰면 문자열이 끊긴다.) */
  const clickable = (el, asVictim) => {
    if (asVictim && el.disabled) return false;
    const cs = getComputedStyle(el);
    if (cs.pointerEvents === "none" || cs.visibility === "hidden" || cs.display === "none") return false;
    if (+cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 4 && r.height > 4;
  };
  const isPinned = (pos) => pos === "fixed" || pos === "sticky";
  const inFixed = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (isPinned(getComputedStyle(n).position)) return true;
    }
    return false;
  };
  const sel = 'button, a[href], [role="button"], input:not([type="hidden"]), select, textarea, [onclick]';
  const out = { fixed: [], flow: [] };
  for (const el of document.querySelectorAll(sel)) {
    const fx = inFixed(el);
    if (!clickable(el, !fx)) continue;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) continue;          // 화면 밖
    const chrome = !!el.closest("footer, header, nav[aria-label], .quest-navbar");
    const rec = { x: r.x, y: r.y, w: r.width, h: r.height, off: el.disabled === true, chrome,
                  label: (el.textContent || el.value || el.tagName).trim().slice(0, 22) };
    (fx ? out.fixed : out.flow).push(rec);
  }
  return out;
})()`;

const area = (a, b) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: MOBILE ? { width: 375, height: 812 } : { width: 1280, height: 900 },
});

let totalHits = 0;
const perQuest = [];
let noisyGaveUp = [];

/* ⚠️ HMR 노이즈를 **조용히 0건으로 삼키지 않는다.**
   다른 사람이 quest 파일을 저장하는 중이면 Turbopack 이 반쯤 써진 파일을 읽어
   `Execution context was destroyed` / 깨진 청크를 낸다. 이 스크립트를 처음 돌린
   날 실제로 그게 나서 **「0곳」으로 통과했다** — `feedback_checkers_can_be_silently_wrong`
   가 말하는 바로 그 모양이다. `see-screen.mjs`·`see-flow.mjs` 와 같은 처방을 쓴다:
   2.5초 뒤 재시도(최대 6번), 그래도 안 없어지면 **크게 떠들고 exit 3.** */
const NOISE = /Execution context was destroyed|Invalid or unexpected token|Target closed|ERR_ABORTED|frame was detached/i;
const MAX_TRY = 6;

for (const target of targets) {
  const url = toUrl(target);
  let worst = new Map();   // "바깥버튼 라벨" → 최악 기록
  let attempt = 0;
  while (true) {
  attempt++;
  worst = new Map();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(3500);
    /* ⚠️ 이 자리에서 **두 번** 조용히 틀렸다.
       1차(2026-09-26): `--tab "⚡ 코드"` 만 찾다가 **화면이 영어라** 못 누르고 1쪽을 쟀다 → 0건.
       2차(2026-09-27): 한·영 둘 다 대봤는데도 **모바일 158/180 · 데스크탑 172/180 에서 실패**했다.
         `components/quest/QuestNavBar.jsx`(2026-09-24 새 nav)가 라벨을 `💻 Code`·`💻 코드`·
         `🧭 계획` 처럼 **상태에 따라 바꾸는데**, `⚡ 코드` 는 옛 스타일에만 남아 있었다.
         그래서 전수 99/180 이라는 숫자가 **대부분 「연 쪽」 기준**으로 나왔다.
       이제 흔한 코드 탭 라벨을 **정규식으로 전부** 대본다. 그리고 **하나도 못 찾으면
       조용히 넘어가지 않는다** — 크게 떠들고 `exit 3` 이다.
       근거: memory/feedback_checkers_can_be_silently_wrong.md — **조용한 0건이 제일 위험하다.** */
    if (TAB && typeof TAB === "string") {
      const cands = [TAB, TAB.replace("코드", "Code"), TAB.replace("Code", "코드")];
      let clicked = false;
      for (const c of cands) {
        const el = await page.$(`text=${c}`);
        if (el) { await el.click(); await page.waitForTimeout(1200); clicked = true; break; }
      }
      if (!clicked) {
        // 대체 매칭 — 이 저장소가 실제로 쓰는 코드 탭 라벨들
        const CODE_TAB = /^(⚡|💻)\s*(코드|Code)\b/;
        const btns = await page.$$("button, a");
        for (const b of btns) {
          const txt = ((await b.innerText().catch(() => "")) || "").trim();
          if (CODE_TAB.test(txt)) {
            await b.click().catch(() => {});
            await page.waitForTimeout(1200);
            clicked = true;
            console.log(`  ℹ️ ${target}: «${TAB}» 대신 «${txt.slice(0, 18)}» 을 눌렀다 (대체 매칭).`);
            break;
          }
        }
      }
      if (!clicked) { tabMissed.push(target); }
    }
    /* 🐛 2026-09-27 — **이 검사기가 실행마다 다른 답을 냈다.** 같은 quest·같은 코드로
       세 번 돌리면 `reflection` 8·0·8, `mexes` 0·0·8 처럼 오갔다. quest 구조 차이가
       아니었다(여섯 quest 의 header·sticky 바를 `getBoundingClientRect()` 로 재니
       `{y:0,h:69}`·`{y:69,h:35.5}` 로 **바이트 단위로 동일**했다).
       원인: `components/quest/QuestNavBar.jsx:152,202` 가 `behavior:"smooth"` 로
       **스크롤 애니메이션**을 돌린다. 탭을 누른 직후 그 애니메이션이 아직 도는 중인데
       `scrollTo` 로 덮어써서, **실제로 머문 자리가 실행마다 달랐다.**
       고침: ①부드러운 스크롤을 끈다 ②`scrollY` 가 목표에 **실제로 닿았는지 확인**하고
       ③그다음에야 가드 시간을 기다린다.
       근거: memory/feedback_checkers_can_be_silently_wrong.md */
    await page.addStyleTag({ content: "html,body{scroll-behavior:auto !important}" });
    // 탭 클릭이 띄웠을 수 있는 애니메이션이 끝날 때까지 — scrollY 가 멈출 때까지 본다
    await page.evaluate(async () => {
      let last = -1, same = 0;
      for (let i = 0; i < 40 && same < 3; i++) {
        await new Promise(r => requestAnimationFrame(r));
        if (window.scrollY === last) same++; else { same = 0; last = window.scrollY; }
      }
    });

    const docH = await page.evaluate(() => document.documentElement.scrollHeight);
    const limit = Math.min(MAX_SCROLL, Math.max(0, docH - 812));

    for (let s = 0; s <= limit; s += STEP) {
      // 목표 자리에 **실제로 닿을 때까지** 기다린다 — 안 닿으면 그 걸음은 건너뛴다
      const landed = await page.evaluate(async v => {
        window.scrollTo(0, v);
        for (let i = 0; i < 30; i++) {
          await new Promise(r => requestAnimationFrame(r));
          if (Math.abs(window.scrollY - v) <= 2) return true;
        }
        // 문서가 짧아 더 못 내려가는 경우는 정상이다
        return Math.abs(window.scrollY - (document.documentElement.scrollHeight - innerHeight)) <= 2;
      }, s);
      if (!landed) { unstable.push(`${target}@${s}px`); continue; }
      /* ⚠️ **400ms 를 기다리는 데는 이유가 있다. 60ms 였을 때 이 검사기가 조용히 틀렸다.**
         `QuestBottomNav` 에는 「스크롤 중에는 바의 버튼을 끈다」는 가드가 있다(180ms).
         60ms 에 재면 **가드가 켜진 상태**를 재게 되고, 바 버튼이 `pointer-events:none`
         이라 이 검사기의 `clickable()` 에서 아예 빠져 **0건**이 나온다 —
         내가 손으로 재서 분명히 겹치는 걸 확인한 quest 에서 0건이 나왔다.
         ⭐ 우리가 재야 하는 건 **가드가 풀린 뒤, 학생이 읽다가 누르는 순간**이다.
         그때가 진짜 위험한 때다. 가드보다 넉넉히 뒤에서 잰다. */
      await page.waitForTimeout(400);
      const { fixed, flow } = await page.evaluate(COLLECT);
      if (!fixed.length || !flow.length) continue;

      for (const f of flow) {
        for (const b of fixed) {
          const ov = area(f, b);
          if (!ov) continue;
          const ratio = ov / (f.w * f.h);
          if (ratio < 0.25) continue;                 // 살짝 스치는 건 버린다
          // ⭐ 겹친다고 끝이 아니다 — 실제로 누가 클릭을 가져가나 확인한다.
          const who = await page.evaluate(({ x, y }) => {
            const el = document.elementFromPoint(x, y);
            if (!el) return null;
            let fx = false;
            for (let n = el; n && n !== document.body; n = n.parentElement) {
              const p = getComputedStyle(n).position;
              if (p === "fixed" || p === "sticky") { fx = true; break; }
            }
            const btn = el.closest('button, a[href], [role="button"]');
            return { stolen: fx, off: btn?.disabled === true,
                     label: (btn?.textContent || el.tagName).trim().slice(0, 22) };
          }, { x: Math.round(f.x + f.w / 2), y: Math.round(f.y + f.h / 2) });
          if (!who || !who.stolen) continue;          // 겹치기만 하고 안 뺏긴다 → 헛경보

          const prev = worst.get(f.label);
          if (!prev || ratio > prev.ratio) {
            worst.set(f.label, { ratio, scroll: s, thief: who.label, bar: b.label, off: who.off, chrome: f.chrome });
          }
        }
      }
    }
  } catch (e) {
    const msg = String(e.message).split("\n")[0];
    if (NOISE.test(msg) && attempt < MAX_TRY) {
      console.log(`  ⏳ ${target}: HMR 노이즈로 보인다 (${attempt}/${MAX_TRY}) — 2.5초 뒤 다시 — ${msg}`);
      await new Promise(r => setTimeout(r, 2500));
      continue;                                   // 같은 quest 를 다시
    }
    if (NOISE.test(msg)) {
      noisyGaveUp.push(target);
      console.log(`  ⛔ ${target}: ${MAX_TRY}번 시도했는데 계속 깨진다 — **이 quest 는 못 쟀다.** ${msg}`);
    } else {
      console.log(`  ⚠️ ${target}: 못 열었다 — ${msg}`);
    }
    break;
  }
  break;                                          // 정상 종료
  }
  const hits = [...worst.entries()];
  totalHits += hits.filter(([, w]) => !w.chrome).length;   // 세는 수는 **본문**만
  perQuest.push([target, hits]);
}
await browser.close();

console.log(`\n=== 고정 바가 본문 버튼의 클릭을 가져가는 자리 (${MOBILE ? "모바일 375×812" : "데스크탑 1280×900"}) ===\n`);
console.log(`quest ${targets.length}개 · **본문 ${totalHits}곳**\n`);
for (const [q, hits] of perQuest) {
  const body = hits.filter(([, w]) => !w.chrome);
  const chrome = hits.filter(([, w]) => w.chrome);
  if (!body.length && !chrome.length) { console.log(`  ✅ ${q}  0곳`); continue; }
  console.log(body.length ? `  🚨 ${q}  본문 ${body.length}곳` + (chrome.length ? ` (+ 페이지 크롬 ${chrome.length}곳)` : "")
                          : `  ✅ ${q}  본문 0곳 (페이지 크롬 ${chrome.length}곳 — 아래 참고)`);
  const line = ([label, w]) => `       «${label}» → 스크롤 ${w.scroll}px 에서 ${Math.round(w.ratio * 100)}% 덮임`
      + (w.off ? `, 그 자리는 **비활성** «${w.thief}» 라 눌러도 **아무 일도 안 난다**`
               : `, 실제로는 «${w.thief}» 가 눌린다`);
  for (const h of body) console.log(line(h));
  for (const h of chrome) console.log(line(h) + "   ⟨페이지 크롬 — 참고⟩");
}
console.log(`
잣대: 고정 요소(fixed 또는 sticky) 안의 누를 수 있는 것과 **그 밖**의 누를 수 있는 것이
   화면 사각형을 25% 이상 겹치고, **그 지점에서 실제로 고정 요소가 클릭을 가져갈 때만** 신고한다.
⚠️ **0건이 결백이 아니다.** 이 스크립트는 **연 쪽 하나**만 본다(탭은 --tab 으로 한 번 눌러 준다).
   Chromium 은 \`env(safe-area-inset-*)\` 를 늘 0 으로 봐서
   실기기에서 바가 더 크면 겹치는 구간도 더 넓다 — **여기 수치는 하한이다.**
⚠️ \`see-screen.mjs\` 와 **다른 층이다.** 그쪽은 「어느 스크롤에서도 한 번도 못 눌린 것」만
   신고해서 이 결함을 **원리상 0건으로 본다.** 합쳐 세지 마라.
`);
if (noisyGaveUp.length) {
  console.log(`⛔ **못 잰 quest 가 ${noisyGaveUp.length}개다** — ${noisyGaveUp.join(", ")}`);
  console.log(`   위 「0곳」은 이 quest 들에 대해서는 **결백이 아니라 «안 봤다» 는 뜻이다.**`);
  console.log(`   다른 사람이 quest 파일을 저장하는 중일 수 있다. 편집이 멎은 뒤 다시 돌려라.`);
  process.exit(3);
}
if (unstable.length) {
  console.log(`\n⚠️ **스크롤이 목표 자리에 못 닿아 건너뛴 걸음 ${unstable.length}개** — 그만큼 덜 본 것이다.`);
  console.log(`   ${unstable.slice(0, 12).join(" ")}${unstable.length > 12 ? " …" : ""}`);
}
if (tabMissed.length) {
  console.log(`\n⛔ **«${TAB}» 탭을 못 찾은 quest ${tabMissed.length}개 — 「연 쪽」 그대로 쟀다.**`);
  console.log(`   ${tabMissed.slice(0, 20).join(" ")}${tabMissed.length > 20 ? " …" : ""}`);
  console.log(`   **이 quest 들의 숫자는 코드 쪽을 안 본 값이다 — 0건이어도 결백이 아니다.**`);
  console.log(`   조용히 지나가지 않으려고 exit 3 으로 끝낸다 (2026-09-27, 두 번 당한 자리).`);
  process.exit(3);
}
process.exit(totalHits ? 1 : 0);
