// CodeWalk — 코드를 '한 조각씩 밝히며' 그 조각 바로 위에 설명 말풍선.
// (선생님 2026-07-13: "코드 위에 설명을 안 읽게 되더라" — 설명 블록을 코드와 떨어뜨리면
//  눈이 코드로 바로 가서 설명을 건너뜀. 그래서 설명을 '지금 밝아진 줄'에 붙임.)
//
// (선생님 2026-07-13 추가: "코드가 길면 버튼 누르기 힘들고, 말풍선이 위에 있으면 설명할 때
//  안 보인다." → 코드를 '고정 높이 창'으로 만들고, 지금 밝아진 줄을 창 맨 위로 자동 스크롤.
//  말풍선·코드창·버튼이 항상 한 화면에 같이 보이게. 페이지가 길어지지 않음.)
//
// 사용:
//   <CodeWalk E={E} lang="py" code={[...lines]} accent="#16a34a" beats={[
//     { hi: [0, 3], bubble: t(E, "...", "...") },   // hi = 밝힐 줄 범위 (0-based, 양끝 포함)
//   ]} />

import { useRef, useEffect, useState, Fragment } from "react";
import { t, C } from "@/components/quest/theme";
import { highlight } from "@/components/quest/shared";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

// vars(선택): [{ v:"seq", ko:"수열", en:"the sequence" }, ...] — 코드창 위에 '변수 뜻' 범례로 항상 표시.
// (선생님 2026-07-13: 코드 깊이 들어가면 "n이 뭐였지? seq가 뭐였지?" 함 → 늘 보이는 리마인더)
// marks(선택): [{ from, to, ko, en }] — 항상 눈에 띄어야 하는 줄(예: 재귀의 베이스 케이스)을
// 장미색 밴드 + 뱃지로 상시 표시 (선생님 2026-07-17: "base case 가 눈에 잘 보이게").
// badge(선택): { ko, en, color } — 코드워크 맨 위에 '항상' 붙는 띠.
// (선생님 2026-07-18: 재귀 번외편을 주 풀이로 착각 — "아직도 recursion이 있는데?".
//  내레이션은 스크롤하면 안 보여서, 워크 안에 상시 표시가 필요.)
import { localizeCode } from "@/components/quest/localizeCode";

export function CodeWalk({ E, code: rawCode, lang = "py", beats, accent = "#16a34a", vars = null, marks = null, badge = null }) {
  /* 코드 안 한국어 주석을 영어 화면에서도 읽히게 한다 (2026-09-11).
     ⚠️ 원본 배열은 절대 안 건드린다 — 🔒 USACO_VERIFIED 파일이 많다. **그리는 자리에서만** 바꾼다.
     번역이 없으면 그 줄을 비운다. **줄 수는 유지**하므로 beats 의 hi 번호가 안 밀린다.
     ⚠️ 2026-09-24: `lang` prop 을 같이 넘긴다 — 안 넘기면 섹션별로 쪼갠 C++ 조각이
     언어 추측에서 파이썬으로 오판돼 한국어 주석이 영어 화면에 그대로 남는다. */
  const code = localizeCode(rawCode, !!E, lang);
  const { idx, setIdx, total } = useTraceStep(beats.length);

  /* 언어를 바꾸면 **1단계로 돌아간다** (2026-09-16, pedagogy 판정).
     왜 — `idx` 는 이 컴포넌트의 로컬 state 라, 언어를 바꾸면 `beats` 만 새로 만들어지고
     번호는 그대로 남는다. 그런데 두 언어는 코드가 달라서 스텝 수도 다르다
     (buymilk: 파이썬 7단계 · C++ 6단계 — C++ 엔 `**` 가 없어 두 배 표를 따로 만든다).
     그래서 "3번째" 라는 숫자만 같고 내용이 딴것이 된다.
     학생(2026-09-15): *"오가니까 오히려 더 헷갈렸음 — 번호가 안 맞아서."*
     ⚠️ 스텝 수를 억지로 맞추는 안은 기각했다 — 코드가 거짓말을 하게 된다.
     `useCodeLang` 을 쓰는 곳 전부에 걸린다. */
  const [shownLang, setShownLang] = useState(lang);
  const [langNotice, setLangNotice] = useState(false);
  const langJustChanged = shownLang !== lang;
  useEffect(() => {
    if (shownLang === lang) return;
    setShownLang(lang);
    setIdx(0);
    setLangNotice(true);          // ⓒ 왜 처음으로 갔는지 그 자리에서 말해준다
  }, [lang, shownLang, setIdx]);

  const safeIdx = langJustChanged ? 0 : idx;
  useEffect(() => { if (safeIdx > 0) setLangNotice(false); }, [safeIdx]);

  /* ⚠️ 2026-09-16 ux 가 **보류**를 냈다 — 모바일에서 안내 띠가 화면 위로 사라졌다.
     모바일은 코드창이 48vh 라 `다음 ▶` 버튼에 닿으려면 아래로 스크롤하게 된다.
     그 상태에서 언어 버튼(맨 위 고정바라 스크롤 안 올려도 눌린다)을 누르면,
     코드만 1번으로 점프하고 **안내 띠와 새 말풍선은 뷰포트 위쪽(-89px)으로 밀려나** 안 보였다.
     → 이 기능을 만든 이유("리셋만 하면 '왜 처음으로 갔지' 가 생긴다")가 모바일에서 그대로 재발.
     그래서 리셋할 때 **창 스크롤도 같이** 올려서 안내 띠가 보이게 한다.
     고정바(`client.tsx:238` sticky top-[57px])에 가리지 않게 여유를 둔다. */
  /* ⓒ 안내를 **어디에 띄우나** — 세 번 틀리고 네 번째에 자리를 찾았다 (2026-09-16).
     1차 흐름 안 + window 스크롤 → 띠 그리기 전에 재서 빗나감.
     2차 rAF 로 그린 뒤 측정   → 다른 곳이 다시 아래로 스크롤해 −182px. 또 실패.
     3차 `position: fixed, top: 112` → 모바일은 됐는데 **데스크탑에서 코드를 덮었다.**
         고정바가 모바일 2단(93px)·데스크탑 1단(45px)이라 코드창 시작 높이가 다르다.
         ux: *"왜 1번으로 갔는지를 설명하려고 만든 배너가, 그 1번 스텝이 정작 무엇을
         설명하는지는 가려버린다."* — 실측으로 밝아진 줄 2개를 완전히 덮었다.
     4차(지금) **말풍선 안에 넣는다.** 별도 배너를 두지 않는다.
       · 말풍선은 이미 코드창이 **자동으로 스크롤해서 보여주는** 자리다 — 위치 계산이 필요 없다
       · 흐름 안이라 **무엇도 덮지 않는다**
       · 뷰포트 크기·고정바 단수와 **무관**하다 (하드코딩한 px 이 하나도 없다)
     교훈: 덮어쓰는 배너는 자리를 아무리 잘 잡아도 결국 무언가를 가린다. */
  const beat = beats[Math.min(safeIdx, beats.length - 1)];
  const [lo, hi] = beat.hi;
  const done = safeIdx >= beats.length - 1;
  const bColor = done ? "#6ee7b7" : "#fbbf24";

  // 전체 코드 복사 (선생님 2026-07-17: "전체 코드 복사하는 부분이 없다")
  const [copied, setCopied] = useState(false);
  const copyAll = async () => {
    const text = code.join("\n");
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  // 코드창: 스텝 바뀔 때마다 '지금 밝아진 줄 바로 위 말풍선'을 창 맨 위로 스크롤.
  // (선생님 2026-08-10: 말풍선을 위에 고정하지 말고 '진짜 설명되는 코드 줄 위'에 띄우기.
  //  말풍선이 코드 흐름 안(밝아진 줄 lo 직전)에 들어가므로, 그 말풍선으로 스크롤하면
  //  말풍선 + 밝아진 줄이 한 번에 창 위쪽에 보인다.)
  // (2026-09-16: 말풍선을 창 맨 꼭대기(offset -10)에 딱 붙이면 그 위 코드가 한 줄도
  //  안 보였다 — 학생이 `c[i]` 말풍선을 보면서 `c` 를 만든 줄이 화면 밖이라 짐작만 했다.
  //  위로 3줄 정도 여유를 둬서, 그 변수가 나온 자리를 스크롤 없이 같이 볼 수 있게 한다.
  //  줄 높이를 하드코딩하지 않고 방금 밝아진 줄(row)을 직접 재서 쓴다 — 폰트 크기가
  //  바뀌어도 안 깨지게.)
  const boxRef = useRef(null);
  const inlineBubbleRef = useRef(null);
  useEffect(() => {
    const box = boxRef.current;
    const bub = inlineBubbleRef.current;
    if (!box || !bub) return;
    const lineRow = bub.nextElementSibling;               // 말풍선 바로 다음 = 밝아진 첫 줄
    const lineH = lineRow ? lineRow.offsetHeight : 27;     // 실측 줄 높이(px), 못 재면 대략값
    const margin = lineH * 3;                              // 위로 대략 3줄 여유
    box.scrollTop = Math.max(0, bub.offsetTop - margin);
    // ⚠️ 2026-09-18: 학생이 코드 왼쪽이 잘려 보인다고 했다 — 줄 번호도, 말풍선 첫 낱말도.
    //    `import sys` 가 `mport sys` 로. 세로만 맞추고 **가로는 그대로 뒀기** 때문이다.
    //    긴 줄을 보려고 오른쪽으로 민 상태에서 다음 조각으로 넘어가면 그대로 밀린 채 남는다.
    //    조각이 바뀌면 줄 머리부터 보여야 한다.
    box.scrollLeft = 0;
  }, [safeIdx, lo]);

  /* ⚠️ 2026-09-28: **말풍선이 하단 고정 바(`.quest-navbar`)에 가려 안 보이는** 버그.
     학생 셋이 각각 보고(strangefn·makedistinct) — 재검증 학생: "7/8, 8/8 걸음의
     말풍선이 화면 아래 고정 바에 가려서 거의 안 보인다 ... 코드가 길어서 말풍선이
     박스 아래쪽 끝에 놓이는 걸음에서만 이 문제가 생긴다."
     실측(strangefn 8/8, playwright 좌표): `box.scrollTop` 이 **445 로 캡**돼 있었다
     (scrollHeight 1005 − clientHeight 560 = 445, 정확히 최댓값). 위 useEffect 가
     원하는 목표(`bub.offsetTop − margin` ≈ 831)는 이 캡보다 훨씬 커서, 브라우저가
     스크롤을 831 이 아니라 445 까지만 허용 — 말풍선이 창 **맨 위**가 아니라
     **맨 아래**(box top + 798px, box 는 334~894px)에 놓였다. 마침 그 자리가
     고정 바(832~900px)와 겹쳐 가려졌다. 다른 걸음(1,3,4,6/8)은 뒤에 코드 줄이
     충분히 남아 있어 스크롤이 안 캡되고, 말풍선이 항상 창 위쪽 3줄 여유 자리에 뜬다
     — **마지막 몇 걸음만, 뒤에 남은 코드가 적을 때만** 캡에 걸린다.
     고침: 코드 줄 뒤에 **창 높이만큼 빈 여백**을 붙여 `scrollHeight` 를 넉넉히
     키운다 — 그러면 마지막 걸음이어도 `scrollTop` 이 캡되지 않고, 다른 걸음과
     똑같이 말풍선이 창 위쪽에 뜬다(고정 바와 겹칠 일이 없는 자리). */
  const [boxH, setBoxH] = useState(560); // 못 재면 이 컴포넌트의 기본 높이(min(64vh,560px)) 상한
  useEffect(() => {
    const box = boxRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const measure = () => setBoxH(box.clientHeight || 560);
    measure();
    const ro = new ResizeObserver(measure);   // resize:vertical 로 늘려도 같이 따라감
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  /* ⚠️ 2026-09-27: 「복사 전체 코드」 + SimNav ◀▶ 를 고정 하단바(`QuestBottomNav`,
     `.quest-navbar`, z-index 100)가 특정 스크롤 구간에서 **가려서 클릭을 뺏는다**
     (`scripts/check-fixed-bar-overlap.mjs` 로 실측 — moohunt 190px·checkups 250px 에서
     실제로 «다음 →» 가 눌림).
     시도했다가 버린 안 넷:
     ①복사 버튼 z-index 를 올린다 → 이번엔 복사 버튼이 진짜 Next→ 클릭을 뺏는다(자리만 바뀜)
     ②페이지 끝에 여백만 준다 → 고정 바는 스크롤 내내 같은 화면 좌표에 있어서, 콘텐츠가
       그 좌표를 지나가는 "언젠가 한 번"은 구조적으로 피할 수 없다(중간 스크롤은 그대로 겹침)
     ③복사 버튼만 위로 옮긴다 → 겹치는 스크롤 지점이 바뀔 뿐 사라지지 않는다
     ④**CSS `position: sticky`** — 처음엔 이걸로 됐다고 생각했다(스크래치 HTML 테스트로는
       스크롤 내내 화면 하단에서 최소 Npx 위에 고정됨을 확인했다). 그런데 실제 페이지에서
       재니 **하나도 안 붙잡혔다** — 원인은 `client.tsx` 레이아웃에 `overflow:hidden` 인
       `flex` 조상이 끼어 있어서다. sticky 의 "고정 기준"은 **가장 가까운 스크롤 조상**인데,
       그 조상은 자기 자신은 스크롤하지 않는(진짜 스크롤은 더 위 document 레벨에서 일어나는)
       상자라, 브라우저가 그 상자를 기준으로 sticky 를 계산해서 **영원히 안 붙잡힌다.**
       (`getBoundingClientRect` 로 실측: bottom 값이 스크롤량만큼 그대로 선형으로 움직였다 —
       sticky 가 전혀 작동 안 한 증거.)
     지금 안 — **CSS 를 버리고 JS 로 같은 효과를 낸다.** `sentinelRef` (복사줄 바로 앞의
     높이 0 표식)로 "안 붙잡았을 때 이 자리가 어디였을까"(자연 위치)를 매 스크롤마다
     `getBoundingClientRect` 로 직접 재고, 그 자연 위치가 고정 바 위 `navGap`px 보다
     아래로 내려가려는 순간만 `transform: translateY(...)` 로 끌어올린다.
     `getBoundingClientRect` 는 조상의 overflow/포지셔닝과 **무관하게 항상 뷰포트
     기준 실좌표**를 주므로 위 ④의 원인에 안 걸린다.
     복사줄+SimNav줄을 **한 덩어리**로 묶은 이유 — 복사줄만 끌어올리면, 그 아래
     SimNav 줄이 스크롤하며 지나가다 이번엔 **멈춰선 복사줄에 가려지는 새 충돌**이
     생긴다(같은 컴포넌트 안에서 자기 자신과 부딪힘). 한 덩어리면 서로 상대 위치가
     고정이라 그 충돌 자체가 안 생긴다.
     `navGap` 은 하드코딩하지 않고 실제 `.quest-navbar` 높이를 재서 쓴다 —
     `showAnswerHint` 로 78px/96px 이 갈리고 `env(safe-area-inset-bottom)` 은
     기기마다 다르다(`QuestBottomNav` 코드를 CodeWalk 가 몰라도 항상 맞게). */
  const [navGap, setNavGap] = useState(92); // 못 재면 78(기본 바 높이)+14 여유
  useEffect(() => {
    if (typeof document === "undefined") return;
    const measure = () => {
      const bar = document.querySelector(".quest-navbar");
      if (bar) setNavGap(bar.getBoundingClientRect().height + 10);
    };
    measure();
    let ro;
    const bar = document.querySelector(".quest-navbar");
    if (bar && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(bar);
    }
    window.addEventListener("resize", measure);
    return () => { ro && ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const sentinelRef = useRef(null);
  const pinWrapRef = useRef(null);
  const [pinY, setPinY] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const recompute = () => {
      ticking = false;
      const sentinel = sentinelRef.current;
      const wrap = pinWrapRef.current;
      if (!sentinel || !wrap) return;
      const vh = window.innerHeight;
      const naturalTop = sentinel.getBoundingClientRect().top;
      // ⚠️ **여기 기준을 `naturalBottom`(끝쪽)으로 재봤다가 실측(elementFromPoint)에서
      // 다시 걸렸다** — 복사 버튼은 이 덩어리(복사줄+SimNav줄) **맨 위**에 있는데,
      // "덩어리 전체의 아래쪽 끝" 을 기준으로 재면 복사 버튼이 **이미 고정 바 대역에
      // 들어간 뒤에도** 한참 더 자연스러운(안 끌어올린) 상태로 남아, 그 사이에
      // 진짜 클릭 도둑맞음 창(최대 25px, 100% 겹침)이 생겼다.
      // `naturalTop`(맨 위) 기준이면 — 아직 한 픽셀도 화면에 안 보이는 상태(위쪽이
      // 뷰포트 맨 아래줄에 닿기 직전)에서 곧장 안전한 자리로 넘어가므로, 부분적으로
      // 보이면서 동시에 고정 바와 겹치는 프레임 자체가 생기지 않는다(스크롤이라는
      // 연속값에 대한 계단함수라, 걸리는 순간 "안 보임 → 안전한 자리" 로 한 번에
      // 넘어간다). 대신 처음 나타날 때 도약 폭이 크다(덩어리 키만큼, 실측 ~176px) —
      // 클릭 안전이 시각적 매끄러움보다 우선이라 이 안을 쓴다.
      if (naturalTop >= vh) { setPinY(0); return; }
      const naturalBottom = naturalTop + wrap.offsetHeight;
      const maxBottom = vh - navGap;
      const ty = Math.min(0, maxBottom - naturalBottom);
      setPinY(ty);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(recompute);
    };
    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // 코드창을 손으로 늘리면(resize: vertical) 아래 배치가 통째로 바뀐다 — 같이 다시 잰다.
    let ro;
    if (boxRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onScroll);
      ro.observe(boxRef.current);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro && ro.disconnect();
    };
  }, [navGap, safeIdx]);

  return (
    <div style={{ padding: 16 }}>
      {/* 상시 배지 — 스크롤해도 항상 보이게 맨 위 고정 띠 (예: "🎁 번외 · 안 봐도 돼요") */}
      {badge && (
        <div style={{
          maxWidth: 560, margin: "0 auto 10px",
          background: `${badge.color || "#0d9488"}15`,
          border: `1.5px dashed ${badge.color || "#0d9488"}`,
          borderRadius: 999, padding: "5px 14px",
          fontSize: 11.5, fontWeight: 800, textAlign: "center",
          color: badge.color || "#0d9488", wordBreak: "keep-all", letterSpacing: 0.2,
        }}>
          {t(E, badge.en, badge.ko)}
        </div>
      )}

      {/* 말풍선은 이제 코드창 안, '지금 밝아진 줄 바로 위'에 뜬다 (아래 code.map 참고). */}

      {/* 변수 뜻 범례 — 늘 보이게 (코드 깊이 들어가도 "n이 뭐였지?" 안 하게) */}
      {vars && vars.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, maxWidth: "100%", margin: "0 auto 8px" }}>
          {vars.map((vr, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11.5, padding: "2px 9px", borderRadius: 999,
              background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", wordBreak: "keep-all",
            }}>
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#0f172a" }}>{vr.v}</code>
              <span style={{ color: "#94a3b8" }}>=</span>
              <span style={{ fontWeight: 600 }}>{t(E, vr.en, vr.ko)}</span>
            </span>
          ))}
        </div>
      )}

      {/* 코드 — 고정 높이 창, 밝아진 줄로 자동 스크롤.
          배경/글자색은 다른 레슨(CodeBlock)과 동일한 gray-900. 흐림 없이 전부 또렷,
          강조는 '밝은 왼쪽 막대 + 살짝 밝은 배경'만 (선생님 2026-07-13: 어둡지 않게). */}
      <div ref={boxRef} className="qcode-scroll qcode-wide" style={{
        background: "#111827", borderRadius: 12, padding: "12px 10px",
        overflowY: "auto", overflowX: "auto",
        // 기본은 적당한 높이, 그런데 학생·선생님이 아래 모서리를 끌어서 늘릴 수 있게.
        // (선생님 2026-07-21: "에디터 크기를 조절할 수가 없네" — 큰 화면에선 좁은 창에
        //  갇혀 스크롤만 하게 됨. resize 로 원하는 만큼 펼쳐서 코드 전체를 보게.)
        // ⚠️ 2026-09-18 선생님: *"코드 보는 곳에 너무 좁다는 생각은 나만 하는건가?"*
        // 740px · 380px 이었다. 수업은 노트북·패드(큰 화면)에서 하는데 코드가 한가운데
        // 좁은 칸에 갇혀 세로로만 흘렀다. 넓히고 키운다. (끌어서 더 늘리는 건 그대로.)
        height: "min(64vh, 560px)",
        maxHeight: "none",
        minHeight: 140,
        resize: "vertical",
        fontFamily: "'JetBrains Mono',monospace",
        // ligature 끄기 — != 를 ≠ 로 합치지 말고 그대로 (선생님 2026-07-13)
        fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0',
        fontSize: 14.5, lineHeight: 1.8, maxWidth: "100%", margin: "0 auto",
        position: "relative",
        // 아래에 더 있다 / **오른쪽에 더 있다** 는 힌트. 오른쪽은 2026-09-11 추가 —
        // pre 로 바꾼 뒤 긴 줄이 표시 없이 잘리고 있었다(ux 가 checkups 에서 잡음).
        boxShadow: "inset 0 -10px 12px -10px rgba(0,0,0,.4), inset -14px 0 14px -10px rgba(0,0,0,.55)",
      }}>
        {code.map((line, i) => {
          const isHot = i >= lo && i <= hi;
          // marks: 이 줄이 상시 강조 구간에 속하나 (color 로 종류 구분 —
          // 기본 장미 = ✋베이스 케이스, 남보라 = ↺재귀 호출 등)
          const mk = marks && marks.find((m) => i >= m.from && i <= m.to);
          const mc = mk ? (mk.color || "#f43f5e") : null;
          return (
            <Fragment key={i}>
              {/* 지금 밝아진 줄(lo) 바로 위에 말풍선을 흐름 안으로 끼워 넣음 — 그 줄을 가리킴 */}
              {i === lo && (
                <div ref={inlineBubbleRef} style={{ margin: "3px 2px 7px" }}>
                  <div style={{
                    background: done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`,
                    borderRadius: 12, padding: "9px 13px", fontSize: 13,
                    color: done ? "#065f46" : "#92400e", lineHeight: 1.5,
                    /* 한글 줄바꿈 4종 세트 — balance 가 없으면 마지막 줄만 짧게 남아 어정쩡하게 갈림 */
                    fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", textWrap: "balance",
                    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif", // 코드폰트 아닌 읽기폰트
                    boxShadow: "0 6px 16px rgba(0,0,0,.30)",
                  }}>
                    {langNotice && safeIdx === 0 && (
                      <div style={{
                        marginBottom: 7, paddingBottom: 6, borderBottom: `1px dashed ${bColor}`,
                        fontSize: 12, fontWeight: 700, color: "#1e40af",
                      }}>
                        🔄 {t(E,
                          `Switched to ${lang === "cpp" ? "C++" : "Python"} — different code, so we start from step 1.`,
                          `${lang === "cpp" ? "C++" : "파이썬"} 으로 바꿨어요 — 코드가 달라서 1번부터 다시 봐요.`)}
                      </div>
                    )}
                    💬 {beat.bubble}
                  </div>
                  {/* 아래(밝아진 코드 줄)를 가리키는 꼬리 */}
                  <div style={{ width: 0, height: 0, marginLeft: 26,
                    borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                    borderTop: `9px solid ${bColor}` }} />
                </div>
              )}
              <div
                style={{
                  display: "flex", alignItems: "flex-start",
                  background: isHot ? "#1f2b3e" : mk ? `${mc}21` : "transparent",   // gray-900 보다 살짝 밝게 (어둡지 않음)
                  borderLeft: isHot ? `4px solid ${bColor}` : mk ? `4px solid ${mc}` : "4px solid transparent",
                  borderRadius: isHot || mk ? 5 : 0,
                  padding: "1px 6px 1px 6px",
                  opacity: 1,                                       // 흐림 없음 — 모든 줄 또렷
                  transition: "background .2s",
                }}>
                <span style={{ color: isHot ? "#a3b3c9" : "#5b6675", width: 24, textAlign: "right", marginRight: 12, flexShrink: 0, userSelect: "none", fontSize: 11.5 }}>{i + 1}</span>
                {/* ⚠️ 2026-09-11: break-word 가 **식별자 한가운데를 쪼갰다.**
                    모바일 375px 에서 `int` 가 "in"+"t" 로, `it->first` 가 "it-"+">first" 로 갈렸다
                    (ux 가 moohunt C++ 3번째 조각 스크린샷에서 잡음).
                    바깥 상자에 이미 overflowX: auto 가 있다(99줄) — 코드는 **접지 말고 가로로 밀어야** 한다.
                    한글 줄바꿈 규칙은 말풍선 얘기다. 코드 영역엔 적용되지 않는다. */}
                <span style={{ whiteSpace: "pre", wordBreak: "normal", overflowWrap: "normal", flexShrink: 0 }}>
                  {highlight(line, lang)}
                </span>
                {mk && i === mk.from && (
                  <span style={{
                    marginLeft: 8, alignSelf: "center", flexShrink: 0,
                    fontSize: 10, fontWeight: 800, whiteSpace: "nowrap",
                    color: "#fff", background: `${mc}40`,
                    border: `1px solid ${mc}90`, borderRadius: 999, padding: "1px 8px",
                  }}>{t(E, mk.en, mk.ko)}</span>
                )}
              </div>
            </Fragment>
          );
        })}
        {/* 뒤 여백 — 위 boxH 주석 참고. 마지막 몇 걸음의 말풍선이 창 아래쪽 끝에
            눌려 고정 바에 가리는 걸 막는다. 화면엔 안 보이고 스크롤 한도만 늘린다. */}
        <div style={{ height: boxH }} aria-hidden="true" />
      </div>

      {/* 복사 줄 + SimNav 줄을 한 덩어리로 — 위 주석 참고.
          `transform: translateY` 로 필요할 때만 끌어올려서 이 자리가 코드창 꼬리를
          살짝 덮을 순 있어도 — 흔한 "하단 고정 툴바" 모양이라 어색하지 않다 —
          **고정 하단바와는 절대 안 겹친다**(둘 사이 간격이 navGap 으로 항상 보장됨).
          background 를 페이지 배경(C.bg)과 맞춰서 코드창 검정 배경 위에 떠 있을 때도
          붕 뜨지 않게 한다. */}
      <div ref={sentinelRef} style={{ height: 0 }} aria-hidden="true" />
      <div ref={pinWrapRef} style={{
        position: "relative", transform: pinY ? `translateY(${pinY}px)` : "none",
        zIndex: 5, background: C.bg, paddingTop: 4, marginTop: -4,
      }}>
        {/* 진행 표시 + 전체 코드 복사 (코드창 바로 아래) */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, margin: "8px 0 2px" }}>
          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
            {t(E, `part ${safeIdx + 1} of ${total}`, `${total} 조각 중 ${safeIdx + 1} 번째`)}
          </span>
          <button onClick={copyAll} style={{
            fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999, cursor: "pointer",
            background: copied ? "#059669" : "#fff",
            border: `1.5px solid ${copied ? "#059669" : "#cbd5e1"}`,
            color: copied ? "#fff" : "#475569",
            transition: "all .15s",
          }}>
            {copied ? `✓ ${t(E, "copied!", "복사됨!")}` : `📋 ${t(E, "copy full code", "전체 코드 복사")}`}
          </button>
        </div>

        {/* 버튼 — 코드창이 고정 높이라 항상 여기, 스크롤 없이 닿음 */}
        <div style={{ marginTop: 4 }}>
          <SimNav idx={safeIdx} total={total} onIdx={setIdx} accent={accent} showLabels isEn={E} />
        </div>
      </div>
    </div>
  );
}
