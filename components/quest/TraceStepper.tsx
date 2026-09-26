"use client";

/**
 * TraceStepper — Phase 3 of redesign.
 *
 * Shared step-state + navigation primitives for the per-quest
 * "walk through a trace" simulators. Before this, every simulator
 * (HpsCaseSimulator, MooTraceSimulator, FreqWalkSimulator, …) inlined
 * the same ~40 lines of Restart/Prev/Next buttons + idx state. This
 * file factors them out so future simulators are easier to write
 * AND so a single visual tweak (e.g. changing button colors) lands
 * everywhere at once.
 *
 * Two pieces:
 *   - useTraceStep(total)  — manages idx + clamped `safe` index.
 *   - <SimNav>             — Restart ⏮ / Prev ◀ / Next ▶ trio.
 *
 * Each quest still owns its own step body and header — those vary
 * too much per quest to be worth abstracting. Accent color is
 * configurable so each quest can keep its visual identity.
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { t } from "./theme";

const DEFAULT_ACCENT = "#059669";

/**
 * 인쇄(PDF) 전용 — 시뮬을 '모든 단계' 로 한 번씩 펼쳐 그리기 위한 통로.
 *
 * 평소엔 null 이라 아무 영향이 없다. PDF 를 만들 때만 각 단계 번호를 밖에서
 * 넣어 주고, 시뮬은 자기 총 단계 수를 report 로 알려 준다 (밖에선 알 길이 없으므로).
 * 화면 동작은 그대로 useState 를 쓴다.
 */
export interface ForcedStep {
  idx: number;
  report?: (total: number) => void;
}
export const ForcedStepContext = createContext<ForcedStep | null>(null);

export interface UseTraceStep<T> {
  idx: number;
  /** Clamped to [0, total-1] — safe to index `trace[safe]`. */
  safe: number;
  setIdx: (n: number) => void;
  total: number;
  /** Convenience: `trace[safe]` if a trace was provided. */
  step: T | undefined;
  /** Current step is the last one. */
  isLast: boolean;
  /** Current step is the first one. */
  isFirst: boolean;
  next: () => void;
  prev: () => void;
  restart: () => void;
}

/**
 * `localStorage` 에서 걸음 번호 하나를 읽는다 — 실패하면(사생활 모드·저장소 차단·
 * 손상된 값 등) **조용히 0** 을 돌려준다. 화면이 깨지면 안 되기 때문이다.
 *
 * ⚠️ 이건 학생 진도가 아니라 **UI 위치 캐시**다 — 지워져도 학습 데이터 손실이
 * 아니라 그냥 그 시뮬이 1 걸음으로 돌아갈 뿐이다. CLAUDE.md 의 보호 localStorage
 * 키 34개(`completedLessons` 등)와는 다른 층이니 착각하지 말 것.
 */
function readPersistedStep(key: string): number {
  try {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem(key);
    if (raw == null) return 0;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

function writePersistedStep(key: string, value: number): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, String(value));
  } catch {
    // 사생활 모드·저장소 가득 참 등 — 조용히 무시. 위치 기억이 안 될 뿐,
    // 화면 동작에는 영향 없다.
  }
}

/**
 * Hook for trace-walking simulators.
 *
 * Pass either `total` (a number) for index-only state, or pass a
 * `trace` array — in which case `step` is populated for convenience.
 *
 * `persistKey` 는 **opt-in** 이다 — 안 주면 기존과 완전히 같다(회귀 위험 0).
 * 주면 그 키로 `localStorage` 에 현재 걸음을 저장·복원한다(탭을 옮겼다 와도,
 * 새로고침해도 보던 걸음 그대로). ⚠️ 이건 학생 진도 저장 키(`completedLessons`
 * 등, CLAUDE.md 보호 목록)가 **아니다** — 지워지면 그냥 1걸음으로 돌아갈 뿐인
 * UI 캐시다. 키 이름은 `quest-step-` 네임스페이스를 쓰고, 기존 `quest-pos-`
 * (챕터/섹션 위치, `*App.jsx` 168개가 씀)와는 다른 용도이니 겹치지 않게 한다.
 */
export function useTraceStep<T = unknown>(
  arg: number | readonly T[],
  persistKey?: string
): UseTraceStep<T> {
  const total = typeof arg === "number" ? arg : arg.length;
  const trace = typeof arg === "number" ? null : arg;
  const [idx, _setIdx] = useState(() => (persistKey ? readPersistedStep(persistKey) : 0));
  const setIdx = (n: number) => {
    _setIdx(n);
    if (persistKey) writePersistedStep(persistKey, n);
  };
  const forced = useContext(ForcedStepContext);
  if (forced) {
    forced.report?.(total);
    const fs = Math.max(0, Math.min(forced.idx, Math.max(0, total - 1)));
    const noop = () => {};
    return { idx: fs, safe: fs, setIdx: noop, total,
      step: trace ? trace[fs] : undefined,
      isLast: fs === total - 1, isFirst: fs === 0,
      next: noop, prev: noop, restart: noop };
  }
  const safe = Math.max(0, Math.min(idx, Math.max(0, total - 1)));
  return {
    idx,
    safe,
    setIdx,
    total,
    step: trace ? trace[safe] : undefined,
    isLast: safe === total - 1,
    isFirst: safe === 0,
    next: () => setIdx(Math.min(total - 1, safe + 1)),
    prev: () => setIdx(Math.max(0, safe - 1)),
    restart: () => setIdx(0),
  };
}

export interface SimNavProps {
  idx: number;
  total: number;
  onIdx: (n: number) => void;
  /** Per-quest accent color for active button. Defaults to emerald. */
  accent?: string;
  /** When true, buttons get text labels ("처음부터 / 이전 / 다음"). */
  showLabels?: boolean;
  /** Pass `lang === "en"` (the same flag passed to t()). */
  isEn?: boolean;
}

/**
 * Restart / Prev / Next button trio. Identical visual style across
 * all simulators — only the `accent` color differs per quest.
 */
export function SimNav({
  idx,
  total,
  onIdx,
  accent = DEFAULT_ACCENT,
  showLabels = false,
  isEn = false,
}: SimNavProps) {
  const safe = Math.max(0, Math.min(idx, total - 1));
  const atStart = safe === 0;
  const atEnd = safe === total - 1;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
      <button
        onClick={() => onIdx(0)}
        disabled={atStart}
        style={{
          padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 800,
          background: "#fff", border: `2px solid ${atStart ? "#e5e7eb" : accent}`,
          color: atStart ? "#b0b5c3" : accent, cursor: atStart ? "default" : "pointer",
        }}
      >
        ⏮{showLabels ? ` ${t(isEn, "Restart", "처음부터")}` : ""}
      </button>
      <button
        onClick={() => onIdx(Math.max(0, safe - 1))}
        disabled={atStart}
        style={{
          padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 800,
          background: "#fff", border: `2px solid ${atStart ? "#e5e7eb" : accent}`,
          color: atStart ? "#b0b5c3" : accent, cursor: atStart ? "default" : "pointer",
        }}
      >
        ◀{showLabels ? ` ${t(isEn, "Prev", "이전")}` : ""}
      </button>
      {/* 걸음 카운터 — ◀▶ 사이, 학생이 다음을 누르려는 바로 그 순간 시선이
          있는 자리. mooin3·checkups 학생 이탈 원인이 "몇 단계짜리인지 몰라서"
          였다(memory/feedback_*). 회색·상단 고정이었던 StepHeader 자리는
          버튼 행과 멀어서 못 봤다 — 그래서 SimNav 자체에 내장한다.
          total<=1 이면 카운터 자체가 무의미해 숨긴다. */}
      {total > 1 && (
        <div
          style={{
            padding: "5px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800,
            fontVariantNumeric: "tabular-nums",
            background: `${accent}1a`,
            border: `2px solid ${accent}`,
            color: accent,
            whiteSpace: "nowrap",
          }}
        >
          {safe + 1} / {total}
        </div>
      )}
      <button
        onClick={() => onIdx(Math.min(total - 1, safe + 1))}
        disabled={atEnd}
        style={{
          padding: "6px 18px", borderRadius: 8, fontSize: 13, fontWeight: 800,
          background: atEnd ? "#e5e7eb" : accent,
          border: `2px solid ${atEnd ? "#e5e7eb" : accent}`,
          color: atEnd ? "#b0b5c3" : "#fff",
          cursor: atEnd ? "default" : "pointer",
        }}
      >
        {showLabels ? `${t(isEn, "Next", "다음")} ` : ""}▶
      </button>
    </div>
  );
}

export interface SimShellProps {
  /** The step body (varies in height between steps). */
  children: React.ReactNode;
  idx: number;
  total: number;
  onIdx: (n: number) => void;
  accent?: string;
  isEn?: boolean;
  showLabels?: boolean;
  /** Small px floor so a one-line step doesn't collapse. Not per-sim tuning —
   *  the default is fine for almost everything. */
  minHeight?: number;
  /** Viewport-relative cap so the sim never grows past the screen on ANY
   *  monitor; taller content scrolls inside instead. CSS length. */
  maxHeightCss?: string;
  /** Padding around the body. Defaults to 16. */
  pad?: number;
}

/**
 * SimShell — the "smooth-follow" frame for step simulators.
 *
 * The tension: each step's content is a different height. If the SimNav simply
 * follows the content it hugs it nicely but jumps abruptly step-to-step; if we
 * pin it to a tall fixed frame it never moves but floats far below short steps
 * (dead space). Neither is good.
 *
 * This does both well, on ANY monitor — pure CSS, no measurement:
 *  - `height: auto` → the box always hugs its content, so the SimNav sits right
 *    under it on every step (never floating far below).
 *  - `min-height` floor stops a one-line step from collapsing.
 *  - `max-height` is viewport-relative (default `calc(100dvh - 340px)`) so the
 *    sim never grows past the screen on any monitor; a step taller than that
 *    scrolls inside (nav still visible) instead of pushing the page.
 *  - `transition: height` + `interpolate-size: allow-keywords` (set globally on
 *    :root) animate the auto-height change, so between steps the nav GLIDES to
 *    its new spot instead of snapping. In browsers without interpolate-size
 *    (Safari/Firefox) it simply snaps — still correct, just not animated.
 */
export function SimShell({
  children,
  idx,
  total,
  onIdx,
  accent = DEFAULT_ACCENT,
  isEn = false,
  showLabels = true,
  minHeight = 280,
  maxHeightCss = "calc(100dvh - 340px)",
  pad = 16,
}: SimShellProps) {
  return (
    <div style={{ padding: pad, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <div
        style={{
          height: "auto",
          minHeight,
          maxHeight: maxHeightCss,
          overflowY: "auto",
          overflowX: "hidden",
          transition: "height 260ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        {children}
      </div>
      <div style={{ paddingTop: 14 }}>
        <SimNav idx={idx} total={total} onIdx={onIdx} accent={accent} isEn={isEn} showLabels={showLabels} />
      </div>
    </div>
  );
}

export interface NarrativePanelProps {
  children: React.ReactNode;
  /** Min height in px (some panels reserve space for tall content). */
  minHeight?: number;
  /** Override panel padding. Defaults to "12px 14px". */
  padding?: string;
  /** Bottom margin in px. Defaults to 12. */
  marginBottom?: number;
  /** Line-height. Defaults to 1.7. */
  lineHeight?: number;
  /**
   * Optional cap on rendered height in px. When provided AND the
   * step content exceeds it, the panel becomes internally scrollable
   * so the SimNav button below stays in view. Defaults to no cap
   * (legacy behaviour).
   */
  maxHeight?: number;
  /**
   * Pass the current step index/key. When this changes:
   *   1) the panel resets its own scrollTop to 0 (so the new
   *      step is read from the top, not wherever the previous
   *      one was scrolled to);
   *   2) it scrolls itself into view (top-of-panel near top of
   *      viewport) so a "Next" press never hides the panel
   *      under the chapter header or pushes the SimNav button
   *      off-screen.
   * Omit it and the panel behaves like before (no auto-scroll).
   */
  stepKey?: number | string;
}

/**
 * Lavender-bordered narrative panel — the standard "step explanation"
 * box used by all simulators. Ensures visual consistency: same
 * border, same background, same line-height regardless of quest.
 */
export function NarrativePanel({
  children,
  minHeight = 120,
  padding = "12px 14px",
  marginBottom = 12,
  lineHeight = 1.7,
  maxHeight,
  stepKey,
}: NarrativePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Track whether this is the very first render — we shouldn't scroll
  // the page on initial mount (jarring), only on subsequent step changes.
  const firstMount = useRef(true);
  useEffect(() => {
    if (stepKey === undefined) return;
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    const node = ref.current;
    if (!node) return;
    // Reset internal scroll (in case maxHeight was triggered last step).
    node.scrollTop = 0;
    // Bring panel top into view, but only if it's currently off-screen
    // ABOVE the viewport — we don't want to yank a comfortably-placed
    // panel just because something below changed.
    const rect = node.getBoundingClientRect();
    const headerOffset = 80; // approximate top tab/nav height
    if (rect.top < headerOffset || rect.top > window.innerHeight - 120) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stepKey]);
  return (
    <div
      ref={ref}
      style={{
        background: "#faf5ff",
        border: "2px solid #c4b5fd",
        borderRadius: 10,
        padding,
        marginBottom,
        minHeight,
        ...(maxHeight ? { maxHeight, overflowY: "auto" as const } : {}),
        fontSize: 13,
        color: "#1f2937",
        lineHeight,
        // Smooth height changes — avoids the abrupt "everything below
        // jumps" effect when a tall step replaces a short one.
        transition: "max-height 220ms ease",
        scrollMarginTop: 80, // for scrollIntoView so it doesn't tuck under fixed nav
      }}
    >
      {children}
    </div>
  );
}

export interface StepHeaderProps {
  /** Emoji prefix. Defaults to ✏️. */
  icon?: string;
  /** Quest accent color for the title. */
  accent?: string;
  /** Pre-rendered title (any inline JSX). */
  title: React.ReactNode;
  /** Optional subtitle (rendered in dim color). If omitted, falls back to a step counter. */
  subtitle?: React.ReactNode;
  idx: number;
  total: number;
  isEn?: boolean;
}

/**
 * Optional header — title + step counter — used by simulators that
 * want the canonical "✏️ ... (N / total) — ▶ to step" treatment.
 * Quests are free to skip this and render their own header.
 */
export function StepHeader({
  icon = "✏️",
  accent = DEFAULT_ACCENT,
  title,
  subtitle,
  idx,
  total,
  isEn = false,
}: StepHeaderProps) {
  const safe = Math.max(0, Math.min(idx, total - 1));
  // Fallback subtitle = step counter only.  We used to also say
  // "Press ▶ to walk through" here, but the ▶ button itself lives
  // BELOW the panel (in <SimNav>), and that hint at the top made it
  // look like a button should be up here.  One source of nav is
  // enough; the counter is the only thing the header needs.
  const fallbackSub = `${safe + 1} / ${total}`;
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 800, color: accent, textAlign: "center", marginBottom: 4 }}>
        {icon} {title}
      </div>
      <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginBottom: 14 }}>
        {subtitle ?? fallbackSub}
      </div>
    </>
  );
}
