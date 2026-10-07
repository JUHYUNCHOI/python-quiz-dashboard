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
import { useScrollEdgeFades, ScrollEdgeFades, highlight } from "@/components/quest/shared";
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
  const sentinelRef = useRef(null);
  const pinWrapRef = useRef(null);

  /* 📏 2026-10-02 — `pinWrapRef`(복사줄+SimNav줄)를 **여기로 끌어올렸다.** 아래
     `fitBoxH` 계산이 "박스 top 부터 고정 바 바로 위까지 전부" 를 박스에 줘 버리면,
     pinWrap(복사줄+SimNav줄)은 박스 **아래**에 설 자리가 없어서 `translateY` 로
     박스 **안쪽**까지 끌어올려지고, 그 자리가 마침 떠 있는 말풍선과 겹치면
     흰 배경이 글자를 덮는다(아래 pinY 효과의 2026-10-02 주석 참고).
     학생 둘(mcc20knight·mcc20kitty) 이 "말풍선이 검은 코드 박스 바닥 경계에서
     잘린다" 고 각각 보고 — 원인은 `.quest-navbar`(바깥 고정 바)가 아니라
     **이 컴포넌트 자신의 pinWrap** 이었다. 그러니 박스 높이를 정할 때
     **pinWrap 이 필요로 하는 높이만큼 미리 빼 둔다** — 그러면 pinWrap 이
     끌어올려질 일 자체가 거의 없어진다. */
  const [pinNaturalH, setPinNaturalH] = useState(100); // 못 재면 대략값(복사줄+SimNav줄)
  useEffect(() => {
    const wrap = pinWrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const measure = () => setPinNaturalH(wrap.offsetHeight || 100);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* ⚠️ 2026-10-01 — 코드창 높이가 `min(64vh, 560px)` 고정값이었다. 이 값은 "화면에서
     얼마나 크게 보여줄까" 만 생각했지, **이 창이 페이지에서 어디서 시작하는지**는
     전혀 모른다. 머리말(미션 카드·진행 막대·변수 범례 등)이 긴 quest 는 창이 화면
     아래쪽에서 시작하고, 그러면 창 **맨 위**(= 1번째 걸음 말풍선이 뜨는 그 자리)가
     하단 고정 바 바로 앞까지 내려온다. `xorstring` 1번째 걸음 — 모듈러 역원을
     mod 5 로 손풀이하는 7줄짜리 긴 말풍선 — 이 바로 그 경우였다(실측 모바일 375:
     창 top=491, 말풍선 506~769, 바 745~812 → **24px 먹힘**). 말풍선은 창 **안**에
     있어 창의 내부 스크롤로는 안 잘리는데, 창 자체가 바 자리까지 내려와 있어서
     바깥 고정 바에 가려졌다 — `SimShell`(TraceStepper.tsx)이 "이 상자가 화면
     어디서 시작하나 — 재야만 안다" 로 푼 것과 **같은 층의 문제**다. 같은 방식으로
     푼다: 창의 실제 top 과 `.quest-navbar` 높이를 재서, 그 사이에 들어갈 만큼만
     창을 키운다. 머리말이 짧은 보통 quest 는 `min(64vh,560px)` 와 큰 차이가 없고
     (상한은 그대로 560 유지), 머리말이 긴 quest 만 창이 조금 작아지며 그 안에서
     문제없이 스크롤된다 — 코드가 안 잘리는 건 원래도 내부 스크롤이 보장했다.
     ⚠️ 이 state 는 **scrollTop 이펙트보다 먼저** 선언돼야 한다 — 그 이펙트가
     `fitBoxH` 를 의존 배열에 쓴다(창 높이가 늦게 측정돼 적용되면 다시 스크롤을
     맞춰야 하므로). 선언 순서를 바꾸면 TDZ 에러가 난다. */
  const [fitBoxH, setFitBoxH] = useState(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const box = boxRef.current;
      if (!box) return;
      const bar = document.querySelector(".quest-navbar");
      const navH = bar ? bar.getBoundingClientRect().height : 78;
      const top = box.getBoundingClientRect().top;
      /* 📏 2026-10-02 — `pinNaturalH + 8`(복사줄+SimNav줄 + 여백) 을 **박스 높이에서
         미리 뺀다.** 안 빼면 박스가 그 공간까지 통째로 차지해서, pinWrap 이 박스
         아래에 설 자리가 없어지고 `translateY` 로 박스 **안쪽**까지 끌어올려진다
         (위 `pinNaturalH` 선언부 주석 참고 — 학생 둘이 그 자리에서 말풍선이
         "코드 박스 바닥 경계에서 잘린다" 고 보고한 바로 그 원인이다). */
      const avail = window.innerHeight - top - navH - 16 - pinNaturalH - 8; // 숨 쉴 틈 + pinWrap 자리
      /* ⚠️ 바닥을 220 으로 뒀더니(1차 시도) 머리말이 **극단적으로 긴** 경우(영어·
         모바일의 xorstring 1걸음, avail=171)엔 바닥이 avail 보다 커서 **바닥 자체가
         창을 다시 바 쪽으로 밀어 넣었다**(실측 33px 먹힘). 바닥은 "그래도 몇 줄은
         보이게" 가 목적이지 avail 을 이겨선 안 된다 — 박스 자체에 이미 있는
         `minHeight:140` 과 맞춘다. avail 이 그보다 크면(거의 항상) 그대로 avail 을 쓴다. */
      setFitBoxH(Math.min(560, Math.max(140, Math.round(avail))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinNaturalH]);

  useEffect(() => {
    const box = boxRef.current;
    const bub = inlineBubbleRef.current;
    if (!box || !bub) return;
    const lineRow = bub.nextElementSibling;               // 말풍선 바로 다음 = 밝아진 첫 줄
    const lineH = lineRow ? lineRow.offsetHeight : 27;     // 실측 줄 높이(px), 못 재면 대략값
    /* ⚠️ 2026-10-01 — 창이 (위 `fitBoxH` 로) 낮아진 quest 에서, 말풍선 자체가
       길면(7줄짜리 모듈러 역원 예시 등) "위로 3줄 여유" 를 다 쓰고 나서도
       말풍선 아래쪽이 창 자신의 바닥에 또 잘렸다(sumk·buymilk 실측). 창이
       넉넉할 땐 3줄 여유가 맞지만, **말풍선 키가 창 키에 육박하면** 그 여유부터
       줄여서 말풍선 쪽에 자리를 더 준다 — 평소(짧은 말풍선)엔 그대로 3줄. */
    const bubH = bub.offsetHeight;
    /* ⚠️ 2026-10-03 — 여기에 "말풍선이 박스 맨 위에 붙지 않게 최소 여유(TOP_CLEARANCE)
       를 강제"하는 안을 시도했다가 **되돌렸다.** alchemy(긴 말풍선, margin 이 0 으로
       줄어드는 경우)에선 겹침을 막았지만, checkups(짧은 말풍선, margin 이 이미
       작지만 0 은 아닌 경우)에서는 전체 말풍선이 아래로 밀리면서 **그 아래쪽 끝이
       pinWrap(SimNav 줄) 과 새로 겹쳤다** — 실측(check-codewalk-bubble-hidden.mjs):
       TOP_CLEARANCE=36 일 때 checkups 7px 겹침(전엔 0) · =0 으로 되돌리면 다시 0.
       즉 이 값 하나로 "박스 위 오버레이 버튼과 안 겹치기" 와 "pinWrap 과 안 겹치기"
       를 동시에 만족시킬 수 없었다 — 그래서 **복사 버튼을 박스 위에 띄우는 자체를
       포기**하고 SimNav 줄 안으로 합쳤다(아래 JSX, pinWrap 은 1줄 그대로 유지하면서
       박스 쪽은 전혀 건드리지 않는다). 이 원래 로직은 손대지 않는다. */
    /* ⭐⭐ 2026-10-06 — **이 식에 「hi 가 몇 줄인지」가 아예 안 들어갔다.** 그게 버그였다.
       `lineH` 는 **한 줄**이라, 강조가 열아홉 줄이든 서른일곱 줄이든 식은 똑같이
       「말풍선 + 한 줄」만 들어갈 자리를 비웠다. 그래서 **말풍선이 설명하는 코드 줄이
       상자 밖에 남았다.**
       전수 실측(`scripts/check-codewalk-hi-fits-box.mjs`, 375×812·한국어·파이썬):
       **밟은 109개 중 101개(93%)** · 걸음 309개. 말풍선이 상자를 통째로 덮어
       **보이는 강조줄이 0** 인 걸음이 38개(최악 `logicalmoos` 2걸음 — 37줄 중 0줄).
       학생(초6)이 말로 꺼냈다: *"**증거가 안 보이고 주장만** 들었어요."*
       ⛔ 기계는 못 봤다 — 코드 줄은 **전부 DOM 에 있고** 상자만 스크롤된다.
       ⭐ 고치는 방향이 **2026-10-03 에 되돌려진 TOP_CLEARANCE 와 정반대**다:
         그건 여백을 **강제로 만드는**(floor) 안이라 자리가 없으면 남을 밀어냈고,
         `alchemy` 를 고치고 `checkups` 에 7px 새 겹침을 만들었다.
         이건 **있는 만큼만 쓰는**(ceiling) 안이다 — 자리가 모자라면 0 까지 줄어들 뿐
         상자 밖으로 **아무것도 밀어내지 않는다.** 그래서 같은 사고가 날 길이 없다.
       ⚠️ `hi` 가 한 줄이면 `hiH === lineH` 라 **옛 식과 완전히 같다**(퇴행 없음).
         `hi` 가 상자보다 길면 margin 이 0 이 되어 역시 **옛 동작 그대로**다. */
    let hiH = lineH;
    {
      /* 줄 높이를 곱하지 않고 **실측해서 더한다** — 긴 줄은 접혀서 더 높다. */
      let row = bub.nextElementSibling;
      let left = Math.max(1, hi - lo + 1);
      let sum = 0;
      while (row && left > 0) { sum += row.offsetHeight; row = row.nextElementSibling; left--; }
      if (sum > 0) hiH = sum;
    }
    const margin = Math.min(lineH * 3, Math.max(0, box.clientHeight - bubH - hiH));
    box.scrollTop = Math.max(0, bub.offsetTop - margin);
    // ⚠️ 2026-09-18: 학생이 코드 왼쪽이 잘려 보인다고 했다 — 줄 번호도, 말풍선 첫 낱말도.
    //    `import sys` 가 `mport sys` 로. 세로만 맞추고 **가로는 그대로 뒀기** 때문이다.
    //    긴 줄을 보려고 오른쪽으로 민 상태에서 다음 조각으로 넘어가면 그대로 밀린 채 남는다.
    //    조각이 바뀌면 줄 머리부터 보여야 한다.
    box.scrollLeft = 0;
  }, [safeIdx, lo, hi, fitBoxH]);

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
  // 가로로 더 있다는 신호 — 공용 훅을 쓴다(`components/quest/shared.tsx`).
  // ⛔ 같은 로직을 여기 또 두지 않는다 — `CodeBlock` 도 같은 문제를 갖고 있었고,
  //   두 벌로 두면 한쪽만 고치는 날이 온다(`feedback_example_code_is_contagious`).
  const fade = useScrollEdgeFades(boxRef, [safeIdx, lo, lang, code]);
  /* 변수 뜻 범례도 **가로로 밀린다** — 코드 상자와 **같은 신호 장치**를 쓴다.
     (2026-10-07, `/decide` 판정. 아래 범례 JSX 주석 참고.) */
  const varsRef = useRef(null);
  const varsFade = useScrollEdgeFades(varsRef, [vars, E]);

  /* 🆕 2026-10-03 — 복사 버튼을 **좁은 화면(모바일)에서만 숨긴다.** 왜 —
     코드 박스 쪽에 복사 버튼을 두는 안을 셋 시도했는데(별도 줄 · 절대배치
     오버레이 · SimNav 같은 줄) **셋 다** 머리말이 긴 quest(alchemy·checkups,
     박스가 `minHeight:140` 바닥에 눌린 경우)에서 다른 자리에 새 겹침을 만들었다
     (아래 pinWrap 주석에 실측 숫자). 이 결함(pinWrap 이 바깥 고정 바에 먹히는 것)
     자체가 **모바일 375px 전용**이다 — task 실측: 데스크탑 1280px 에서는 24개
     전부 0건. 그래서 pinWrap 은 **SimNav 한 줄로 완전히 줄이고**(진짜 높이
     절감), 복사 버튼은 코드 박스 **우상단에 절대배치**로 두되 **이 좁은 화면
     에서만 숨긴다** — 박스 자체·스크롤 로직은 전혀 안 건드리므로 위 세 가지
     부작용이 구조적으로 생기지 않는다. 넓은 화면(수업용 노트북·패드 — 이
     프로젝트의 주 사용처)에서는 그대로 보인다. */
  const [narrowScreen, setNarrowScreen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => setNarrowScreen(window.innerWidth < 480);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

  // ⚠️ `sentinelRef` · `pinWrapRef` 는 이제 파일 위쪽(`pinNaturalH` 옆)에서 선언한다 —
  // `fitBoxH` 계산이 `pinWrapRef` 의 실측 높이를 미리 빼 써야 해서다. 여기선 그대로 쓴다.
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
      /* 🛡️ 2026-10-02 — 학생 둘(mcc20knight·mcc20kitty) 이 "말풍선이 코드 박스
         바닥 경계에서 잘린다" 고 보고 — 실측해 보니 `.quest-navbar`(바깥 고정 바)가
         아니라 **이 pinWrap 자신**이 범인이었다(위 `pinNaturalH` 선언부 주석).
         위 `pinNaturalH` 로 박스 높이에서 pinWrap 자리를 미리 빼 두면 **보통
         quest 는 이 지점에서 ty 가 이미 0** 이 되어 더 손댈 게 없다
         (naturalBottom 이 이미 maxBottom 보다 작다).

         ⚠️ **여기서 "pin 이 박스 안으로 못 들어가게" 막는 보정을 추가했다가
         되돌렸다 — 둘 다 실제로 만들어서 좌표+스크린샷+클릭 실측까지 했다.**
         머리말이 *극단적으로* 긴 소수의 quest(mcc20knight 모바일 375 — 머리말이
         565px 를 먹어 박스가 `minHeight:140` 바닥까지 눌리는 경우)에선 그래도
         room 이 모자라 ty 가 크게 음수로 나온다. 이때 두 선택지가 서로 배타적이다:
           A) ty 그대로 둔다 → pin 이 `.quest-navbar`(바깥 고정 바) 바로 위,
              제자리에 깨끗이 선다. **말풍선 아래쪽 줄 일부가 박스 꼬리에 가려
              남는다**(mcc20knight 최악의 경우 70px, 실측).
           B) pin 이 박스를 침범 못 하게 ty 를 되돌린다 → pin 이 `.quest-navbar`
              영역 **안**으로 내려간다(실측 pin [701,797] vs 바 [745,812]).
              `elementFromPoint` 로는 그 구간 **클릭은** 안쪽 SimNav 로 통과했지만,
              **화면 스크린샷으로 확대해 보니** 바깥 바의 불투명한 "이전 쪽/다음
              쪽 ▶" 알약이 안쪽 SimNav 버튼 대부분을 **시각적으로 덮어**, 학생
              눈엔 "다음 쪽 ▶"(페이지 넘김) 하나만 또렷이 보인다. 그 알약 **가운데를
              누르면 실제로 바깥(페이지 넘김)이 눌린다**(실측 y=790, x=320 →
              `elementFromPoint` 가 `.quest-navbar` 를 반환) — 안쪽 SimNav 가
              살아있는 좁은 띠(y≈745~775)는 글자가 거의 안 보여 학생이 거길
              노려 누르지 않는다. 즉 **B 는 "말풍선 한 줄이 가려짐" 을
              "엉뚱한 페이지로 튕겨나감" 으로 바꾼다** — 더 나쁘다
              (오늘 보고서 뒷부분의 "같은 모양 네비 둘" 사고와 같은 종류).
         그래서 **A 를 택한다** — 아래 식 하나로 끝낸다. 이 잔여 결함(머리말이
         극단적으로 긴 소수 quest 에서 말풍선 꼬리가 박스에 가려 보임)은 CodeWalk
         하나로 못 고친다 — 근본 해법은 pinWrap(복사줄+SimNav줄) 을 한 줄로
         압축하거나, 그 quest 의 머리말(접근 태그+변수 범례)을 줄이는 쪽이다.
         둘 다 후속 과제로 남긴다. */
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

      {/* 변수 뜻 범례 — 늘 보이게 (코드 깊이 들어가도 "n이 뭐였지?" 안 하게)
          ⭐⭐ 2026-10-07 — **한 줄로 압축한다.** (`/decide` 3라운드 판정 — `.claude/WORK.md`)
          전엔 `flexWrap: "wrap"` 이라 모바일 375px 에서 알약이 **하나당 한 줄씩** 쌓였다.
          한국어 뜻이 길어서 두 개가 한 줄에 못 들어간다 — `alchemy` 6개·`chipxchg` 7개가
          **169.5px** 을 먹었고, 그 높이가 **그대로 코드 상자에서 빠졌다**
          (`fitBoxH` 는 상자 **위쪽 y** 로 정해진다 — 위 `avail` 식 참고).
          실측(375×812·한국어): `alchemy` 범례 **169.5 → 23.25px** · 코드 상자 **140 → 282px**.
          ⛔ **「범례를 맨 끝으로 옮기는」 안은 기각됐다.** 겹침은 0 이 되지만(실측) 이 범례의
            존재 이유(위 19행 — 코드창 **위**에서 「n이 뭐였지?」를 막는 것)가 무력화된다.
            조작 바 뒤로 내리면 학생은 코드·복사줄·◀▶ 를 다 지나 스크롤해야 뜻을 본다.
            그래서 **자리는 그대로 두고 높이만** 줄인다.
          ⛔ **상자 바로 아래로 옮기는 안은 새 결함을 만든다** — `sentinel` 이 밀려
            `pinWrap` 이 `translateY` 로 범례를 덮는다(실측 43.5px, 스크롤 60~141px 구간).
            되돌려진 `TOP_CLEARANCE` 와 **같은 가족**이다.
          ⚠️ 가로로 밀리면 **밀린다는 신호가 있어야** 한다 — 신호 없는 가로 스크롤은 학생이
            *"「이게 전부인가 보다」 하고 넘어갔다"* 고 한 바로 그 결함이다(아래 `ScrollEdgeFades`
            주석). 그래서 코드 상자와 **같은 장치**를 붙인다.
          ⚠️ `justifyContent: "center"` 는 쓰지 마라 — 넘칠 때 **왼쪽이 잘려 영영 못 본다.**
            가운데 맞춤은 `width: "fit-content"` + `margin: "auto"` 로 한다. */}
      {vars && vars.length > 0 && (
        <div style={{ position: "relative", width: "fit-content", maxWidth: "100%", margin: "0 auto 8px" }}>
        <div ref={varsRef} style={{
          display: "flex", flexWrap: "nowrap", gap: 6,
          overflowX: "auto", overflowY: "hidden", scrollbarWidth: "thin",
        }}>
          {vars.map((vr, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5, flex: "0 0 auto",
              fontSize: 11.5, padding: "2px 9px", borderRadius: 999, whiteSpace: "nowrap",
              background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", wordBreak: "keep-all",
            }}>
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#0f172a" }}>{vr.v}</code>
              <span style={{ color: "#94a3b8" }}>=</span>
              <span style={{ fontWeight: 600 }}>{t(E, vr.en, vr.ko)}</span>
            </span>
          ))}
        </div>
        <ScrollEdgeFades fade={varsFade} bg="#ffffff" radius={999} />
        </div>
      )}

      {/* 코드 — 고정 높이 창, 밝아진 줄로 자동 스크롤.
          배경/글자색은 다른 레슨(CodeBlock)과 동일한 gray-900. 흐림 없이 전부 또렷,
          강조는 '밝은 왼쪽 막대 + 살짝 밝은 배경'만 (선생님 2026-07-13: 어둡지 않게).
          ⚠️ 2026-10-03 — 복사 버튼은 아래 `narrowScreen` 조건부로 **이 박스 우상단에
          절대배치**로 뜬다(모바일 <480px 에서는 숨김 — 위 `narrowScreen` 선언부 주석
          참고). 스크롤·padding 등 **이 박스 자체 로직은 전혀 안 건드렸다** — 여러
          시도 끝에 박스 쪽을 건드리는 모든 안이 다른 quest 에서 새 겹침을 만든다는
          걸 배웠다(아래 pinWrap 주석에 실측). */}
      <div style={{ position: "relative" }}>
      <div ref={boxRef} className="qcode-scroll qcode-wide" style={{
        background: "#111827", borderRadius: 12, padding: "12px 10px",
        overflowY: "auto", overflowX: "auto",
        // 기본은 적당한 높이, 그런데 학생·선생님이 아래 모서리를 끌어서 늘릴 수 있게.
        // (선생님 2026-07-21: "에디터 크기를 조절할 수가 없네" — 큰 화면에선 좁은 창에
        //  갇혀 스크롤만 하게 됨. resize 로 원하는 만큼 펼쳐서 코드 전체를 보게.)
        // ⚠️ 2026-09-18 선생님: *"코드 보는 곳에 너무 좁다는 생각은 나만 하는건가?"*
        // 740px · 380px 이었다. 수업은 노트북·패드(큰 화면)에서 하는데 코드가 한가운데
        // 좁은 칸에 갇혀 세로로만 흘렀다. 넓히고 키운다. (끌어서 더 늘리는 건 그대로.)
        height: fitBoxH != null ? `${fitBoxH}px` : "min(64vh, 560px)",
        maxHeight: "none",
        minHeight: 140,
        resize: "vertical",
        fontFamily: "'JetBrains Mono',monospace",
        // ligature 끄기 — != 를 ≠ 로 합치지 말고 그대로 (선생님 2026-07-13)
        fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0',
        fontSize: 14.5, lineHeight: 1.8, maxWidth: "100%", margin: "0 auto",
        position: "relative",
        // 아래에 더 있다 는 힌트(세로). ⛔ **오른쪽 inset 그림자는 뺐다** (2026-10-01) —
        // 2026-09-11 에 「오른쪽에 더 있다」로 넣은 것인데 **정적이라 끝까지 밀어도
        // 안 사라졌고**, 어두운 배경(#111827) 위에서 ux 가 *"식별이 안 된다"* 고 실측했다.
        // 대신 아래쪽에 **스크롤 위치를 따라가는 fade 두 장**을 붙인다.
        boxShadow: "inset 0 -10px 12px -10px rgba(0,0,0,.4)",
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
                /* `data-codewalk-bubble` — 기계가 이 말풍선을 **확실히** 집으라고 단 표다.
                   💬 글자로 찾으면 quest 본문에도 💬 를 쓰는 자리가 있어 헷갈린다.
                   쓰는 곳: `scripts/check-codewalk-bubble-hidden.mjs` (2026-09-28) */
                <div ref={inlineBubbleRef} data-codewalk-bubble="1" style={{ margin: "3px 2px 7px" }}>
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
            눌려 고정 바에 가리는 걸 막는다. 스크롤 한도만 늘리는 자리다.

            ⚠️ 2026-09-28 `ux-reviewer`: 주석에 「화면엔 안 보인다」고 적어 뒀는데 **틀렸다.**
               *"학생이 코드 상자를 손으로 끝까지 밀면, 아무 글자도 힌트도 없는 큰 여백만 나와서
                 **「여기서 끝났나, 고장났나」 싶은 인상**을 줄 수 있다(400px 넘는 빈 사각형에
                 아무 표시가 없다)."*
               기본 자동 스크롤은 말풍선을 창 위쪽에 두니 **일부러 더 내릴 때만** 보인다.
               그래도 빈 화면은 「끝」이 아니라 「고장」으로 읽힌다 — 끝이라고 말해 준다. */}
        <div style={{ height: boxH }}>
          <div style={{
            /* 빈 칸 «맨 위»에만 두면 더 내렸을 때 다시 빈 화면이 된다.
               이 상자는 자기 `overflow` 를 가진 스크롤 조상이라 여기선 sticky 가 산다
               (`reference_css_sticky_degrades_here` 가 말하는 건 quest **본문** 쪽이다).
               ⚠️ 그래도 믿지 말고 화면으로 확인했다 — 아래 커밋 메시지에 실측값. */
            position: "sticky", top: 10,
            paddingTop: 14, textAlign: "center", fontSize: 11.5, fontWeight: 700,
            color: "#64748b", letterSpacing: 0.2, wordBreak: "keep-all",
          }}>
            {t(E, "— end of code · press ▶ for the next step —",
                  "— 코드 끝 · 다음 설명은 ▶ 를 눌러요 —")}
          </div>
        </div>
      </div>
      <ScrollEdgeFades fade={fade} bg="#111827" />
      {/* 전체 코드 복사 — 코드 박스 우상단에 절대배치, **좁은 화면(<480px)에서는 숨김**
          (왜 숨기나: 위 `narrowScreen` 선언부 주석 + 아래 pinWrap 주석 참고). 겹침 검사
          (see-screen.mjs --sim)는 이 값을 넓은 뷰포트에서 실제로 확인했다. */}
      {!narrowScreen && (
        <button onClick={copyAll} style={{
          position: "absolute", top: 8, right: 8, zIndex: 6,
          fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999, cursor: "pointer",
          background: copied ? "#059669" : "#1f2937",
          border: `1.5px solid ${copied ? "#059669" : "#475569"}`,
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,.35)",
          transition: "all .15s",
        }}>
          {copied ? `✓ ${t(E, "copied!", "복사됨!")}` : `📋 ${t(E, "copy", "복사")}`}
        </button>
      )}
      </div>

      {/* SimNav 줄 — **pinWrap 은 이제 이 한 줄뿐이다.** 복사 버튼은 넣지 않는다 —
          코드 박스 쪽(별도 줄 · 우상단 절대배치 · 이 SimNav 줄 자체)으로 옮기는
          안을 셋 다 시도했는데, 머리말이 긴 quest(alchemy·checkups — 박스가
          `minHeight:140` 바닥에 눌린 경우)에서 매번 **다른 자리에 새 겹침**이
          났다(check-codewalk-bubble-hidden.mjs 실측):
            · 박스 위 별도 줄  → 그 줄이 박스를 떠밀어 pinWrap 과 더 가까워짐(30→40px)
            · 박스 우상단 오버레이(여유 없음) → 긴 말풍선이 거기 바짝 붙어 버튼과 겹침(97%)
            · 〃 (최소 여유 강제) → 짧은 말풍선(checkups) 쪽이 떠밀려 pinWrap 과 새로 겹침(0→7px)
            · SimNav 같은 줄 오른쪽 끝 → `다음 ▶` 라벨을 남겨서 자리가 없어 겹침(51%)
          그래서 **pinWrap 은 순수 SimNav 한 줄로 줄이고**(진짜 높이 절감 — 이 결함
          자체가 모바일 전용이라는 task 실측과 일치), 복사 버튼은 **좁은 화면에서는
          아예 렌더링하지 않는다**(위 박스 JSX, `narrowScreen`). `transform:
          translateY` 로 필요할 때만 끌어올려서 이 자리가 코드창 꼬리를 살짝 덮을
          순 있어도 — 흔한 "하단 고정 툴바" 모양이라 어색하지 않다 — **고정
          하단바와는 절대 안 겹친다**(둘 사이 간격이 navGap 으로 항상 보장됨).
          background 를 페이지 배경(C.bg)과 맞춰서 코드창 검정 배경 위에 떠 있을
          때도 붕 뜨지 않게 한다.
          (project-lead 판정 2026-10-03, `scripts/check-codewalk-bubble-hidden.mjs
          --mobile --every-step` 실측 24/168 → 재검증 결과는 커밋 메시지 참고). */}
      <div ref={sentinelRef} style={{ height: 0 }} aria-hidden="true" />
      <div ref={pinWrapRef} style={{
        position: "relative", transform: pinY ? `translateY(${pinY}px)` : "none",
        zIndex: 5, background: C.bg, paddingTop: 4, marginTop: -4,
      }}>
        <div style={{ marginTop: 4 }}>
          <SimNav idx={safeIdx} total={total} onIdx={setIdx} accent={accent} showLabels compactPrev isEn={E} />
        </div>
      </div>
    </div>
  );
}
