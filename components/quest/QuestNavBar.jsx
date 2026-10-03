"use client";
/**
 * QuestNavBar — shared top + bottom navigation for every quest App.
 *
 * Two exports:
 *   <QuestProgressBar>  — segmented progress bar with YouTube-style
 *                         hover preview, cross-tab jump, and a
 *                         "1/N" locator + tab labels under the bar.
 *                         Renders an optional codeControlsSlot
 *                         (lang select / PDF) on the right.
 *
 *   <QuestBottomNav>    — fixed slim bottom bar with prev/next.
 *                         The old `5/N ▾` drop-up drawer is gone —
 *                         step jumping happens via the segmented bar.
 *
 * Both used identically across HPS, CowPhotos, and (eventually) every
 * other quest App. Before this file existed, each app inlined ~200
 * lines of identical JSX. Replacing those with imports of these two
 * components is the unblocker for rolling the new design out to all
 * ~150 quests.
 *
 * The `renderPreviewBody` prop is the only thing each app customises —
 * it returns the JSX to render inside the hover thumbnail for a given
 * step. Each quest knows which Sim / ProgressiveCode component to use,
 * so the caller passes that knowledge in via this function.
 */
import { useRef, useState } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import { C, t } from "./theme";

/* 「⚡ 코드」 탭 안에서 계획 쪽과 실제 코드 쪽을 구분해 라벨을 붙인다. (2026-09-24)
   왜 — 지금까진 그 탭 안 쪽이 몇 개든 "⚡ 코드 1/2" 처럼 숫자만 보여서, 계획만 있는
   첫 쪽을 보고 "코드가 없다" 는 오해가 났다(선생님, mcc20citytour). 32개 quest 가 같은
   모양(project-lead 실측)이라 공유 컴포넌트 한 곳에서 고친다.
   판별 방법 — step.type 이 "progressive"/"code" 면 코드고, "reveal" 이면 그 안의
   content 트리를 걸어(elementHasCode) CodeWalk·자체 ProgressiveCode·CodeBlock
   컴포넌트가 박혀 있는지 본다(mcc21marbles 처럼 reveal 안에 <CodeWalk> 를 직접 넣는
   quest 가 있어 type 만으론 못 잡는다).
   ⚠️ 안전장치 둘 — ①탭 이름에 "코드/code" 가 들어있을 때만(문제 탭까지 새지 않게)
   ②그 탭 안에 코드 쪽과 계획 쪽이 **둘 다** 있을 때만. 하나뿐이거나 질문 쪽이라
   판별이 안 되면 **원래 탭 이름을 그대로 둔다** — 억지로 이름 붙이지 않는다. */
const CODE_COMPONENT_RE = /ProgressiveCode|CodeWalk|CodeBlock|CodeStepper/i;
const elementHasCode = (node, depth = 0) => {
  if (!node || depth > 8) return false;
  if (Array.isArray(node)) return node.some((n) => elementHasCode(n, depth + 1));
  if (typeof node !== "object") return false;
  const ty = node.type;
  const name = typeof ty === "function" ? (ty.displayName || ty.name || "") : "";
  if (CODE_COMPONENT_RE.test(name)) return true;
  const children = node.props && node.props.children;
  if (children !== undefined) return elementHasCode(children, depth + 1);
  return false;
};
const stepHasCode = (s) => {
  if (!s) return false;
  if (s.type === "progressive" || s.type === "code") return true;
  if (s.type === "reveal") return elementHasCode(s.content);
  return false;
};
const stepIsPlanLike = (s) => !!s && s.type === "reveal" && !elementHasCode(s.content);
const isCodeTabName = (name) => /code|코드/i.test(name || "");

const defaultLabelFor = (s, i, E) => {
  if (s?.label) return String(s.label);
  const narrText = typeof s?.narr === "string" ? s.narr : "";
  if (narrText) return narrText.split(/[.\n]/)[0].slice(0, 44);
  if (s?.type === "quiz") return t(E, "Quiz", "퀴즈");
  if (s?.type === "input") return t(E, "Input", "입력 문제");
  if (s?.type === "progressive") return t(E, "Code", "코드");
  if (s?.type === "sim") return t(E, "Sim", "시뮬");
  if (s?.type === "runner") return t(E, "Runner", "실행기");
  return t(E, `Step ${i + 1}`, `${i + 1} 단계`);
};

export function QuestProgressBar({
  tabs,
  states,            // { 0: ch1Q, 1: ch2Q, ... }
  tab,
  cur,
  setTab,
  setSi,
  setVisitedTabs,
  accent,
  E,
  renderPreviewBody, // (step) => JSX  — for hover thumbnail
  labelFor,          // optional — default uses step.label / narr / type
  codeControlsSlot,  // optional — small JSX (lang select + PDF) right-aligned
}) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const barRef = useRef(null);
  const _labelFor = labelFor || ((s, i) => defaultLabelFor(s, i, E));
  const steps = states[tab] || [];
  // 그 탭 라벨이 "코드/code" 를 담고 있고, 그 탭 안에 계획 쪽·코드 쪽이 둘 다 있을 때만
  // 현재 쪽에 맞는 라벨("🧭 계획"/"💻 코드")을 돌려준다. 아니면 null — 호출부가 원래
  // 탭 이름으로 그대로 떨어진다.
  const stepSplitLabel = (tabIdx) => {
    if (!isCodeTabName(tabs[tabIdx])) return null;
    const tSteps = states[tabIdx] || [];
    const flags = tSteps.map((s) => (stepHasCode(s) ? true : stepIsPlanLike(s) ? false : null));
    const hasCodeStep = flags.some((f) => f === true);
    const hasPlanStep = flags.some((f) => f === false);
    if (!hasCodeStep || !hasPlanStep) return null;
    const curFlag = tabIdx === tab ? flags[cur] : null;
    if (curFlag === null) return null;
    return curFlag ? t(E, "💻 Code", "💻 코드") : t(E, "🧭 Plan", "🧭 계획");
  };
  /* ⭐ 2026-10-03 — **이름을 갈라 놓고 번호는 안 갈랐다.**
     재검증 학생(초6): *"「코드 1/2」 다음 쪽을 눌렀더니 「코드 2/2」가 아니라
       바로 「**계획 2/2**」로 넘어갔다. **「계획 1/2」는 못 봤다** — 쪽 번호가
       안 맞는 것 같았다."* **학생이 맞다.**
     위 `stepSplitLabel` 은 쪽마다 이름을 「💻 코드」/「🧭 계획」으로 바꾸는데,
     옆의 숫자는 **탭 전체**(cur+1 / steps.length)를 그대로 세고 있었다.
     그래서 「계획 1/…」 은 **영영 안 나온다** — 이름과 숫자가 **서로 다른 것을 센다**
     (`feedback_same_number_two_meanings` 와 같은 층).
     ⭐ 이름을 갈랐으면 **번호도 그 안에서** 센다. 갈린 라벨이 없으면 `null` 을
       돌려주고 호출부가 **지금까지와 똑같이** 탭 전체를 센다 — 하위호환. */
  const splitCount = () => {
    if (!isCodeTabName(tabs[tab])) return null;
    const tSteps = states[tab] || [];
    const flags = tSteps.map((s) => (stepHasCode(s) ? true : stepIsPlanLike(s) ? false : null));
    if (!flags.some((f) => f === true) || !flags.some((f) => f === false)) return null;
    const curFlag = flags[cur];
    if (curFlag === null) return null;
    const same = flags.map((f, i) => (f === curFlag ? i : -1)).filter((i) => i >= 0);
    const pos = same.indexOf(cur);
    if (pos < 0) return null;
    return { i: pos + 1, n: same.length };
  };
  // Each tab gets its own hue so the bar (and locator labels) make the
  // 문제 / 코드 regions instantly distinguishable. Tab 0 = quest accent.
  const TAB_HUES = [accent, "#0d9488", "#d97706", "#0891b2"];
  const tabHue = (i) => TAB_HUES[i % TAB_HUES.length];
  // 스텝별 구간 색 (step.section 이 있을 때) — 설명 단계가 바뀌면 진도바 색이 바뀜.
  // bonus 는 회색으로 '선택/심화'임을 한눈에.
  // understand→formula→practice 는 '문제 이해' 챕터의 단계별 색 (선생님 2026-07-22:
  // "알록달록, 차이를 볼 수 있도록"). 이 이름을 안 쓰는 quest 는 영향 없음(하위호환).
  const SECTION_HUES = {
    understand: "#2563eb",  // 파랑 — 문제 이해/탐색
    formula:    "#7c3aed",  // 보라 — 공식 세우기
    practice:   "#db2777",  // 분홍 — 확인/연습
    build:      "#0d9488",  // 청록 — 코드 작성
    optimize:   "#d97706",  // 주황 — 최적화/성능
    bonus:      "#94a3b8",  // 회색 — 보너스/심화
  };

  const showHover = (e, tabIdx, i) => {
    const segRect = e.currentTarget.getBoundingClientRect();
    const barRect = barRef.current?.getBoundingClientRect();
    if (!barRect) return;
    const previewCardHeight = 280;
    const placeBelow = barRect.top < previewCardHeight + 12;
    setHoverInfo({
      tabIdx, i,
      centerX: segRect.left + segRect.width / 2 - barRect.left,
      placeBelow,
    });
  };
  const hideHover = () => setHoverInfo(null);

  /* 탭 이름표를 눌러 그 탭의 **첫 걸음**으로. (2026-09-21)
     왜 — 재검증 학생: *"⚡ 코드를 누르면 코드로 안 가고 문제 탭으로 되돌아간다.
     탭처럼 보이는데 탭처럼 동작 안 해서 헷갈렸다."* 확인해 보니 이름표는 그냥 `<span>`
     이었다. 탭을 바꾸는 건 **위 진행 막대 조각**뿐이었다.
     왜 첫 걸음인가 — 탭별 '마지막으로 보던 자리' 는 이 저장소 어디에도 없다
     (`si` 하나를 두 탭이 같이 쓴다). 그 기억을 새로 만드는 것보다,
     흔한 탭 관례대로 **그 구역 처음부터** 가 새 개념이 제일 적다. project-lead 판정.
     ⚠️ 공용 부품이라 quest 180개가 같이 바뀐다. 막대 조각 동작은 **안 건드렸다.** */
  const goTab = (tabIdx) => {
    if (tabIdx !== tab) {
      setVisitedTabs(prev => { const n = new Set(prev); n.add(tabIdx); return n; });
      setTab(tabIdx);
    }
    setSi(0);
    hideHover();
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const labelBtn = (isOn, hue) => ({
    background: "none", border: 0, padding: "2px 4px", margin: "-2px -4px",
    font: "inherit", color: isOn ? hue : C.dim, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 5, borderRadius: 6,
  });

  return (
    <>
      <div style={{ marginTop: 10, marginBottom: 6, position: "relative" }}>
        <div ref={barRef} style={{
          display: "flex", alignItems: "stretch", gap: 0,
          height: 14, borderRadius: 7, overflow: "hidden",
          background: "#f1f5f9", border: `1px solid ${C.border}`,
          position: "relative",
        }}>
          {tabs.map((tabLabel, tabIdx) => {
            const tabSteps = states[tabIdx] || [];
            const isCurTab = tabIdx === tab;
            const isPastTab = tabIdx < tab;
            return (
              <div key={tabIdx} style={{
                flex: tabSteps.length || 1,
                display: "flex", alignItems: "stretch", gap: 1,
                borderLeft: tabIdx === 0 ? "none" : "2px solid #94a3b8",
                background: "transparent",
              }}>
                {tabSteps.map((s, i) => {
                  const isCurrent = isCurTab && i === cur;
                  const isVisited = isPastTab || (isCurTab && i < cur);
                  const isHovered = hoverInfo && hoverInfo.tabIdx === tabIdx && hoverInfo.i === i;
                  // 스텝에 section 이 있으면 구간별 색 (설명 단계가 바뀌면 색이 바뀜),
                  // 없으면 기존처럼 탭 색. (하위호환 — 다른 quest 영향 없음)
                  const hue = (s && s.section && SECTION_HUES[s.section]) ? SECTION_HUES[s.section] : tabHue(tabIdx);
                  // current = full hue, visited = mostly filled, unvisited = a clear
                  // (not faint) tint so each tab's region stays its own color and
                  // neighbouring tabs' unvisited stretches don't blur into one another.
                  const bg = isCurrent ? hue : isVisited ? `${hue}cc` : `${hue}66`;
                  return (
                    <button
                      key={`${tabIdx}-${i}`}
                      onClick={() => {
                        if (tabIdx !== tab) {
                          setVisitedTabs(prev => { const n = new Set(prev); n.add(tabIdx); return n; });
                          setTab(tabIdx);
                        }
                        setSi(i);
                        hideHover();
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      onMouseEnter={(e) => showHover(e, tabIdx, i)}
                      onMouseLeave={hideHover}
                      onFocus={(e) => showHover(e, tabIdx, i)}
                      onBlur={hideHover}
                      style={{
                        flex: 1, minWidth: 6, padding: 0,
                        background: bg, border: "none",
                        borderRight: i < tabSteps.length - 1 ? "1px solid rgba(255,255,255,0.45)" : "none",
                        cursor: "pointer",
                        transform: isCurrent ? "scaleY(1.4)" : isHovered ? "scaleY(1.25)" : "none",
                        transition: "background 120ms, transform 120ms",
                        outline: "none",
                      }}
                      aria-label={`${tabLabel} step ${i + 1}: ${_labelFor(s, i)}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Hover preview card — pulls actual content via renderPreviewBody */}
        {hoverInfo && (() => {
          const tabSteps = states[hoverInfo.tabIdx] || [];
          const s = tabSteps[hoverInfo.i];
          if (!s) return null;
          const previewLabel = _labelFor(s, hoverInfo.i);
          const tabName = tabs[hoverInfo.tabIdx];
          const typeIcon = s.type === "quiz" ? "❓"
            : s.type === "input" ? "✏️"
            : s.type === "progressive" ? "💻"
            : s.type === "sim" ? "🎮"
            : s.type === "runner" ? "▶️"
            : s.type === "reveal" ? "📖"
            : "📄";
          const cardWidth = 240;
          const thumbWidth = 880;
          const thumbHeight = 460;
          const scale = (cardWidth - 12) / thumbWidth;
          const renderedHeight = thumbHeight * scale;
          const barWidth = barRef.current?.getBoundingClientRect().width ?? 0;
          const half = cardWidth / 2;
          const clampedX = Math.max(half, Math.min(barWidth - half, hoverInfo.centerX));
          const below = !!hoverInfo.placeBelow;
          return (
            <div style={{
              position: "absolute",
              left: clampedX, transform: "translateX(-50%)",
              ...(below ? { top: "calc(100% + 10px)" } : { bottom: "calc(100% + 10px)" }),
              width: cardWidth, zIndex: 50,
              background: "#fff", border: `1.5px solid ${accent}`,
              borderRadius: 10,
              boxShadow: below ? "0 -8px 24px rgba(0,0,0,0.18)" : "0 8px 24px rgba(0,0,0,0.18)",
              padding: 6,
              pointerEvents: "none",
              fontSize: 12, color: C.text, lineHeight: 1.5,
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 4px 6px", borderBottom: `1px solid ${C.border}`, marginBottom: 6,
              }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: accent, letterSpacing: 0.4 }}>
                  {tabName} · {hoverInfo.i + 1}/{tabSteps.length}
                </span>
                {s.solved && <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 700 }}>
                  ✓ {t(E, "done", "완료")}
                </span>}
              </div>
              <div style={{
                position: "relative",
                width: cardWidth - 12,
                height: Math.min(renderedHeight, 140),
                overflow: "hidden",
                borderRadius: 6,
                background: "#f8fafc",
                border: `1px solid ${C.border}`,
                marginBottom: 6,
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: thumbWidth, height: thumbHeight,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  background: "#fff",
                }} aria-hidden="true">
                  {(() => {
                    if (!renderPreviewBody) return null;
                    try { return renderPreviewBody(s); }
                    catch (err) {
                      // If a preview fails (rare — only on weird step
                      // shapes), render a placeholder so the main page
                      // is unaffected.
                      console.warn("QuestProgressBar preview render failed:", err);
                      return null;
                    }
                  })()}
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, padding: "0 4px", display: "flex", gap: 6, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>{typeIcon}</span>
                <span style={{ flex: 1, lineHeight: 1.4 }}>{previewLabel}</span>
              </div>
              <div style={{
                position: "absolute",
                ...(below
                  ? { top: -7, borderLeft: `1.5px solid ${accent}`, borderTop: `1.5px solid ${accent}` }
                  : { bottom: -7, borderRight: `1.5px solid ${accent}`, borderBottom: `1.5px solid ${accent}` }),
                left: "50%", transform: "translateX(-50%) rotate(45deg)",
                width: 12, height: 12,
                background: "#fff",
              }} />
            </div>
          );
        })()}

        {/* Compact under-bar locator: tab labels + 1/N.
            The "N/M" count is attached to the ACTIVE tab's label so it can never be
            misread as belonging to the other tab (e.g. code-tab "7/7" next to "문제"). */}
        {(() => {
          const last = tabs.length - 1;
          /* ⭐ 2026-09-28 `strangefn` 재검증 학생(초6): *"코드 탭 헤더의 작은 숫자가
             「코드 2 / 2」로 뜨는데, 8조각(1/8~8/8)을 다 넘기는 동안 이 숫자가 안 바뀐다 —
             **뭘 세는 건지 몰랐고 그냥 넘어갔다.**"*
             → 숫자는 맞다. 이건 **쪽**을 세고, 안에서 바뀌는 건 CodeWalk **조각**이다.
             한 화면에 두 개의 「N / M」이 있는데 **한쪽만 이름이 없었다**
             (`feedback_same_number_two_meanings`). 세는 대상을 글자로 박는다.
             CodeWalk 쪽은 이미 「8 조각 중 1 번째」라고 자기 이름을 달고 있다. */
          /* 라벨이 「💻 코드」/「🧭 계획」으로 갈렸으면 **그 안에서** 센다 (위 `splitCount`). */
          const sc = splitCount();
          const count = (
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800 }}>
              {t(E, "p.", "")}{sc ? sc.i : cur + 1} / {sc ? sc.n : steps.length}{t(E, "", " 쪽")}
            </span>
          );
          return (
            <div style={{
              marginTop: 4, fontSize: 10.5, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
            }}>
              <button type="button" onClick={() => goTab(0)} style={labelBtn(tab === 0, tabHue(0))}
                      title={(tab === 0 && stepSplitLabel(0)) || tabs[0]} aria-label={(tab === 0 && stepSplitLabel(0)) || tabs[0]}>
                {(tab === 0 && stepSplitLabel(0)) || tabs[0]}{tab === 0 ? count : null}
              </button>
              {/* middle-tab fallback (3+ tabs): name + count in the center */}
              {tabs.length > 2 && tab !== 0 && tab !== last && (
                <button type="button" onClick={() => goTab(tab)} style={labelBtn(true, tabHue(tab))}
                        title={stepSplitLabel(tab) || tabs[tab]} aria-label={stepSplitLabel(tab) || tabs[tab]}>
                  {stepSplitLabel(tab) || tabs[tab]}{count}
                </button>
              )}
              {tabs.length > 1 && (
                <button type="button" onClick={() => goTab(last)} style={labelBtn(tab === last, tabHue(last))}
                        title={(tab === last && stepSplitLabel(last)) || tabs[last]} aria-label={(tab === last && stepSplitLabel(last)) || tabs[last]}>
                  {(tab === last && stepSplitLabel(last)) || tabs[last]}{tab === last ? count : null}
                </button>
              )}
            </div>
          );
        })()}
      </div>

      {/* Optional code-tab-only controls slot */}
      {codeControlsSlot && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          {codeControlsSlot}
        </div>
      )}
    </>
  );
}

/* ⭐⭐ 2026-10-03 — **쪽 넘김 버튼에서 화살표(▶◀)를 뺐다.** 이게 **여섯 번째 처방**이다.
   학생이 다섯 번 헷갈렸고 다섯 번 다 고쳤는데 다섯 번 다 남았다:
     09-09 라벨을 처음 붙임 / 09-21 모양 / 09-24 모서리 반지름(8px vs 9px) /
     09-27 라벨에 「쪽」을 덧붙임 / 10-03 색을 고정 중립색으로 분리
   ⭐ **오늘 색은 통했다** — 학생이 안쪽을 「파란색」, 바깥을 「검은 띠」로 **구별해 적었다.**
     그런데도 헷갈렸다: *"둘 다 **「다음」이라는 글자에 똑같은 ▶ 화살표**가 붙어 있다.
     모양이 똑같아서 **아무거나 눌러도 같은 일이 일어날 것처럼 보였다.**"*
   ⛔ **다섯 번 다 「다음」+「▶」는 그대로 두고 주변만 바꿨다.**
   ⭐ ux 판정: *"안 건드린 유일한 축이 **기호의 존재 여부**다. 다른 화살표(`››`·`→`)로
     바꾸는 건 여전히 **삼각형류 전진 기호**라 모양 축의 실패를 되풀이한다.
     **아예 없애면 SimNav(⏮◀▶)와 공유하는 글자가 0개가 된다.**"*
   ⚠️ ux 가 스스로 적었다 — *"「이번엔 확실히 된다」는 보장이 아니다. 과거 다섯 번도
     매번 「이번엔 다를 이유」가 있었다."* **새 학생 재검증이 유일한 잣대다.**
   ⛔ **이 라벨을 또 바꾸면 `scripts/see-flow.mjs` 와
     `scripts/check-codewalk-bubble-hidden.mjs` 의 정규식을 같이 고쳐라** —
     둘 다 라벨을 **정확히 일치**로 찾는다. 2026-09 에 라벨을 바꿨다가
     **quest 셋이 「쪽이 1개」로 잡히는** 사고가 이미 한 번 났다. */
/* 「다음 쪽 ▶」(사이트 전역 쪽 넘김) 과 SimNav 의 「다음 ▶」(그 문제 안 시뮬 조작) 이
   둘 다 quest `accent` 를 그대로 써서 **같은 색 · 같은 글자 · 같은 모서리**가 되는
   사고가 네 번째로 지적됐다 (`feedback_one_nav_shape_per_screen.md`).
   project-lead 판정(2026-10-03): 라벨·모서리 반지름으로 가르는 건 이미 둘 다 실패했다 —
   **바깥 쪽 넘김은 quest accent 를 받지 말고, 모든 quest 공통의 고정 중립색을 쓴다.**
   그러면 구조적으로 두 버튼이 같은 색이 될 수 없다. accent 는 다른 곳(진도바 구간 색
   등)에서 계속 쓰이므로 prop 자체는 지우지 않고, 이 버튼 두 개의 색만 떼어낸다. */
const NAV_NEUTRAL = "#1e293b"; // slate-800 — quest accent 와 절대 안 겹치는 고정 중립색

export function QuestBottomNav({
  cur,
  canPrev,        // optional — if undefined, falls back to legacy `cur === 0` check
  canNext,
  accent, // eslint-disable-line no-unused-vars -- 더 이상 버튼 색에 안 쓴다 (위 주석). 호출부 180개가 넘기는 prop 이라 시그니처는 유지.
  E,
  onPrev,
  onNext,
  showAnswerHint = false,
}) {
  // canPrev 를 명시적으로 받으면 (RoundingApp 처럼 cross-tab prev 지원)
  // 그 값을 쓰고, 없으면 legacy behavior (첫 스텝 = disabled).
  const prevDisabled = canPrev !== undefined ? !canPrev : cur === 0;
  return (
    <>
    {/* 2026-09-10 선생님: "12/14 아직 가린다며, 그것도 고쳐줘"
        이 바는 position:fixed 라 **문서 흐름에서 자리를 차지하지 않는다.**
        그래서 쪽 내용이 길면 마지막 요소(대개 ◀▶ 버튼)가 바 밑에 깔린다.
        지금까지는 quest 마다 그림을 줄이고 문장을 깎아 한 쪽씩 맞춰왔는데,
        그건 그 쪽만 고치는 것이고 다음 쪽에서 또 터진다 — 실제로 오늘 네 번 그랬다.
        바 높이만큼 **문서 끝에 빈 자리를 만든다.** 그러면 quest 180개가 같이 고쳐진다.
        높이는 실측 68px + 여유. 힌트 줄이 뜨면 한 줄(약 20px) 더 높아진다. */}
    <div aria-hidden="true"
      style={{ height: `calc(${showAnswerHint ? 96 : 78}px + env(safe-area-inset-bottom))` }} />
    {/* quest-navbar: 데스크탑에서 왼쪽 사이드바(w-60) 위를 덮지 않게 globals.css 가 left 를 민다.
        2026-09-07 학생 관찰: "데스크탑에서 상단바에 로그인 버튼이 다른 요소에 가려서 안 보이기도 했다."
        실측하니 이 바(z-100)가 사이드바(z-50) 아래쪽을 덮어 **로그인이 클릭조차 안 됐다**
        (elementFromPoint 가 이 바를 돌려줬다).
        ⚠️ 2026-09-10: 이 네 줄이 원래 `//` 였다. 오늘 위에 스페이서 <div> 를 넣으면서
        이 자리가 **JSX 자식 자리**가 됐고, `//` 주석은 JSX 안에서 주석이 아니라 **글자**라
        학생 화면에 그대로 찍혔다 — quest 180개 전부. 빌드는 이걸 못 잡는다(정상 문자열이니까).
        디자이너가 스크린샷에서 잡았다. JSX 자식 자리에 주석을 달 땐 중괄호로 감싸라. */}
    {/* pointer-events 를 "투명한 유리" 로 — 실제 버튼 두 개에만 auto. (2026-09-25 PM 판정 + 실측 보강)
        왜 — 이 바는 이전·다음 버튼 둘레에 **큰 빈 여백**이 있는데, 그 여백엔 onClick 이
        없다. 그런데 fixed 라 그 여백 밑에 깔린 진짜 요소(복사 버튼 등)는 클릭 자체가
        이 바로 먼저 잡혀서 **영영 눌리지 않았다** — 학생이 "아무 반응 없다" 고 한 그 자리.
        바 높이·버튼 위치를 조정해도 안 없어진다(코드창 높이와 무관하게 재현됨).
        ⚠️ PM 이 처음 지정한 「바깥 none + wrapper(min(880px,100%)) auto」만으로는
        **부족했다** — 실측(playwright elementFromPoint)해 보니 wrapper 가 auto 라
        모바일(375px)에선 wrapper 폭이 사실상 바 전체 폭과 같아서, 이전/이후 버튼
        **사이 12px 틈**과 **버튼 바깥 좌우 여백(약 64px씩)** 이 여전히 죽어 있었다
        (elementFromPoint 가 버튼이 아니라 그 틈의 flex-row `div` 를 돌려줌).
        그래서 wrapper 와 버튼 행(row) 도 none 으로 내리고, **버튼 두 개에만** 직접
        auto 를 줬다 — 유리를 버튼 크기까지 좁힌 것. 이제 진짜로 버튼이 아닌 모든
        자리(위아래 패딩·좌우 여백·버튼 사이 틈)가 밑으로 통과한다.
        quest 180개 전부에 적용되는 공유 컴포넌트라 한 곳만 고친다. */}
    <div className="quest-navbar" style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: C.bg,
      padding: "8px 16px calc(14px + env(safe-area-inset-bottom))",
      zIndex: 100,
      borderTop: `1px solid ${C.border}`,
      boxShadow: "0 -4px 12px rgba(0,0,0,.06)",
      pointerEvents: "none",
    }}>
      <div style={{ maxWidth: "min(880px, 100%)", margin: "0 auto", padding: "0 clamp(4px, 2vw, 16px)", pointerEvents: "none" }}>
        {showAnswerHint && (
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 4 }}>
            {t(E,
              "💡 Tip: try answering above. (You can skip too — →)",
              "💡 팁: 위에서 답해보면 좋아요. (그냥 넘어가도 OK — →)")}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, pointerEvents: "none" }}>
          {/* 왼쪽 spacer — Next.js 개발 모드 자체 배지(devIndicators)가 화면 좌하단을
              차지한다(로컬 개발자 화면에만 뜨고 프로덕션엔 없음). 「목록」 버튼을
              오른쪽에 둬 그 배지와 안 겹치게 하고, 이 spacer 로 Prev/Next 그룹을 중앙에 맞춘다.
              목록 버튼과 같은 폭(36px — citytour 처럼 화면 하단에 자체 ▶ 버튼을 둔 시뮬과
              부딪히지 않을 만큼 좁혔다, 아래 목록 버튼 주석 참고)을 써서 대칭을 맞춘다. */}
          <div style={{ width: 36, flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, display: "flex", gap: "clamp(4px, 2vw, 12px)", justifyContent: "center", alignItems: "center", pointerEvents: "none", minWidth: 0 }}>
            {/* 라벨을 "이전/다음" 에서 "이전 쪽/다음 쪽" 으로. (2026-09-27, 재검증 학생)
                왜 — "이 버튼이 다른 문제로 넘어가는 버튼인가?" 라고 짐작했다. 실제 동작은
                onPrev/onNext 가 스텝 인덱스(si)를 바꾸는 것 = **이 문제 안의 쪽 이동**이다.
                "문제" 란 낱말은 넣지 않는다 — 그게 오해의 근원이었다.
                ⚠️ 폭·글자 크기를 vw 로 재느라 clamp 를 썼다 — **기본 언어가 영어다**
                (`contexts/language-context.tsx` 의 `useState<Language>('en')`).
                "Next page ▶" 는 14px/padding 24px 로는 320px 폭에서 **111px 이 넘친다**
                (playwright 실측, 목록 캡션 추가분 포함). ux 가 잰 "94→110px" 는 **한국어
                기준**이라 영어에서 그대로 쓰면 잘린다 — 그래서 고정 padding/font 대신
                clamp(뷰포트 폭 기반)로 좁은 화면에서만 줄고 넓은 화면(375+·데스크탑)에선
                원래 크기(14px/24px)로 돌아오게 했다. 실측 0건(320/375, ko/en 모두). */}
            <button onClick={onPrev} disabled={prevDisabled} style={{
              background: prevDisabled ? "#e5e7eb" : C.card,
              border: `2px solid ${prevDisabled ? "#e5e7eb" : NAV_NEUTRAL}`,
              borderRadius: 9, padding: "10px clamp(6px, 3vw, 24px)",
              fontSize: "clamp(12px, 3.6vw, 14px)", fontWeight: 800,
              cursor: prevDisabled ? "default" : "pointer",
              color: prevDisabled ? "#b0b5c3" : NAV_NEUTRAL,
              pointerEvents: "auto", whiteSpace: "nowrap", minWidth: 0,
            }}>{t(E, "Prev page", "이전 쪽")}</button>
            <button onClick={onNext} disabled={!canNext} style={{
              background: !canNext ? "#e5e7eb" : NAV_NEUTRAL,
              border: `2px solid ${!canNext ? "#e5e7eb" : NAV_NEUTRAL}`,
              borderRadius: 9, padding: "10px clamp(6px, 3vw, 24px)",
              fontSize: "clamp(12px, 3.6vw, 14px)", fontWeight: 800,
              cursor: !canNext ? "default" : "pointer",
              color: !canNext ? "#b0b5c3" : "#fff",
              pointerEvents: "auto", whiteSpace: "nowrap", minWidth: 0,
            }}>{t(E, "Next page", "다음 쪽")}</button>
          </div>
          {/* 「목록으로」 — quest 목록으로 나가는 탈출로. (2026-09-27)
              왜 여기 붙였나 — 오늘 상단 sticky 바 둘을 걷어내며(41c522bd·704b6b7f)
              클릭 도둑질은 0건이 됐지만, quest 를 빠져나가는 길도 같이 사라졌다.
              상단 breadcrumb 의 `←`(client.tsx)는 이제 sticky 가 아니라 일반 흐름이라
              스크롤하면 화면 밖으로 사라진다. 이 하단 바는 이미 `pointerEvents:"auto"`
              를 버튼 크기까지 좁혀 겹침 0건으로 검증됐으므로, 새 sticky 요소를
              또 만들지 않고 여기에 얹는다.
              ⛔ 화살표 모양 금지 — Prev/Next 가 이미 화살표라 세 번째 같은 모양이
              되면 `feedback_one_nav_shape_per_screen.md` 를 또 어긴다. 그래서
              **원형 아이콘 버튼 + List 아이콘 + 무채색**으로 모양·색을 둘 다 갈랐다.
              2026-09-27 재검증 학생: "글자가 하나도 없고 작은 줄 세 개짜리 그림만 있어서
              혼자 봤으면 뜻을 몰랐을 것 같다. 마우스를 대야만 뜻이 나오는데 초등학생이
              대볼 생각을 할지 모르겠다." → hover 는 터치 기기에 없다. 아이콘 옆은 폭이
              안 되니(1번의 목록 글자까지 붙으면 44→70px, +26px 로 다시 빠듯해진다는
              ux 사전 경고) **아이콘 아래 작은 캡션**으로 세로로 늘렸다. aria-label·title 은
              그대로 둔다 — 스크린리더용은 이미 있었다.
              ⚠️ 폭은 46 이 아니라 36 이다 — `check-fixed-bar-overlap.mjs` 로 재검증하다가
              `mcc20citytour` 에서 **본문 1곳**이 새로 걸렸다. 그 quest 의 BFS 시뮬은
              자체 «Next ▶» 버튼을 화면 맨 아래(스크롤 200px, y=751~806)에 두는데, 이
              바가 40px 목록 버튼일 때 그 버튼의 클릭 판정 지점(중심)이 목록 버튼 왼쪽
              경계에서 0.8px 안쪽으로 들어왔다 — 클릭이 "목록으로 나가기" 에 뺏겼다.
              46px 는 그 경계를 21px 나 잠식해 더 나빴다(46 이전엔 겹침이 아예 없었던
              건 옛 원형 버튼이 더 작고, 그 옆 Prev/Next 도 지금보다 넓어 우연히 이
              시뮬 버튼 밑에 빈 틈이 있었기 때문 — 실측으로 확인). 36 으로 좁히니
              그 지점이 다시 시뮬 자신의 버튼에게 돌아갔다(실측 0건). 폭을 다시 키울
              땐 반드시 `node scripts/check-fixed-bar-overlap.mjs mcc20citytour --tab
              "⚡ 코드"` 를 단독·직렬로 돌려 재확인해라. */}
          <Link
            href="/quest"
            aria-label={t(E, "Quest list", "문제 목록으로")}
            title={t(E, "Quest list", "문제 목록으로")}
            style={{
              flexShrink: 0,
              width: 36, minHeight: 38,
              borderRadius: 12,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 1, padding: "5px 2px 4px",
              background: C.card,
              border: `2px solid ${C.border}`,
              color: C.dim,
              pointerEvents: "auto",
              textDecoration: "none",
            }}
          >
            <List size={15} strokeWidth={2.5} />
            <span style={{ fontSize: 8.5, fontWeight: 700, lineHeight: 1, whiteSpace: "nowrap" }}>
              {t(E, "List", "목록")}
            </span>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
