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
                  const bg = isCurrent ? accent : isVisited ? `${accent}88` : "#cbd5e1";
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
              <span style={{ color: tab === 0 ? accent : C.dim, display: "flex", alignItems: "center", gap: 5 }}>
                {tabs[0]}{tab === 0 ? count : null}
              </span>
              {/* middle-tab fallback (3+ tabs): name + count in the center */}
              {tabs.length > 2 && tab !== 0 && tab !== last && (
                <span style={{ color: accent, display: "flex", alignItems: "center", gap: 5 }}>
                  {tabs[tab]}{count}
                </span>
              )}
              {tabs.length > 1 && (
                <span style={{ color: tab === last ? accent : C.dim, display: "flex", alignItems: "center", gap: 5 }}>
                  {tabs[last]}{tab === last ? count : null}
                </span>
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
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: C.bg,
      padding: "8px 16px calc(14px + env(safe-area-inset-bottom))",
      zIndex: 100,
      borderTop: `1px solid ${C.border}`,
      boxShadow: "0 -4px 12px rgba(0,0,0,.06)",
    }}>
      <div style={{ maxWidth: "min(880px, 100%)", margin: "0 auto", padding: "0 clamp(4px, 2vw, 16px)" }}>
        {showAnswerHint && (
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 4 }}>
            {t(E,
              "💡 Tip: try answering above. (You can skip too — →)",
              "💡 팁: 위에서 답해보면 좋아요. (그냥 넘어가도 OK — →)")}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <button onClick={onPrev} disabled={prevDisabled} style={{
            background: prevDisabled ? "#e5e7eb" : C.card,
            border: `2px solid ${prevDisabled ? "#e5e7eb" : accent}`,
            borderRadius: 9, padding: "10px 24px", fontSize: 14, fontWeight: 800,
            cursor: prevDisabled ? "default" : "pointer",
            color: prevDisabled ? "#b0b5c3" : accent,
          }}>← {t(E, "Prev", "이전")}</button>
          <button onClick={onNext} disabled={!canNext} style={{
            background: !canNext ? "#e5e7eb" : accent,
            border: `2px solid ${!canNext ? "#e5e7eb" : accent}`,
            borderRadius: 9, padding: "10px 24px", fontSize: 14, fontWeight: 800,
            cursor: !canNext ? "default" : "pointer",
            color: !canNext ? "#b0b5c3" : "#fff",
          }}>{t(E, "Next", "다음")} →</button>
        </div>
      </div>
    </div>
  );
}
