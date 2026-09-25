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
          const count = (
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800 }}>
              {cur + 1} / {steps.length}
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

export function QuestBottomNav({
  cur,
  canPrev,        // optional — if undefined, falls back to legacy `cur === 0` check
  canNext,
  accent,
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
        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
          <button onClick={onPrev} disabled={prevDisabled} style={{
            background: prevDisabled ? "#e5e7eb" : C.card,
            border: `2px solid ${prevDisabled ? "#e5e7eb" : accent}`,
            borderRadius: 9, padding: "10px 24px", fontSize: 14, fontWeight: 800,
            cursor: prevDisabled ? "default" : "pointer",
            color: prevDisabled ? "#b0b5c3" : accent,
            pointerEvents: "auto",
          }}>← {t(E, "Prev", "이전")}</button>
          <button onClick={onNext} disabled={!canNext} style={{
            background: !canNext ? "#e5e7eb" : accent,
            border: `2px solid ${!canNext ? "#e5e7eb" : accent}`,
            borderRadius: 9, padding: "10px 24px", fontSize: 14, fontWeight: 800,
            cursor: !canNext ? "default" : "pointer",
            color: !canNext ? "#b0b5c3" : "#fff",
            pointerEvents: "auto",
          }}>{t(E, "Next", "다음")} →</button>
        </div>
      </div>
    </div>
    </>
  );
}
