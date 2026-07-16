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

import { useEffect, useRef, useState } from "react";
import { t } from "./theme";

const DEFAULT_ACCENT = "#059669";

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
 * Hook for trace-walking simulators.
 *
 * Pass either `total` (a number) for index-only state, or pass a
 * `trace` array — in which case `step` is populated for convenience.
 */
export function useTraceStep<T = unknown>(arg: number | readonly T[]): UseTraceStep<T> {
  const total = typeof arg === "number" ? arg : arg.length;
  const trace = typeof arg === "number" ? null : arg;
  const [idx, setIdx] = useState(0);
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
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
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
  /** Seed floor in px. The frame never shrinks below the tallest step seen. */
  minHeight?: number;
  /** Cap (in vh) beyond which the body scrolls internally — keeps the frame
   *  inside the viewport on short screens instead of causing a page scroll. */
  maxHeightVh?: number;
  /** Padding around the body. Defaults to 16. */
  pad?: number;
}

/**
 * SimShell — the "no-jump" frame for step simulators.
 *
 * Why: each sim step has a different content height, so the SimNav that
 * follows the content used to slide up and down as you stepped. Reserving a
 * fixed min-height per sim is fragile (needs hand-measuring) and leaves big
 * gaps on short steps / overflows on small screens.
 *
 * SimShell fixes it generically, no per-sim numbers:
 *   1) a ResizeObserver watches the body and grows the reserved floor to the
 *      TALLEST step seen — and never shrinks it. Height is therefore
 *      monotonic: the SimNav can only settle downward once (smoothly, 220ms),
 *      never flip up-and-down. After the tallest step is visited it's locked.
 *   2) SimNav is pinned to the frame bottom (margin-top:auto), so it sits at
 *      the same Y on every step.
 *   3) maxHeightVh caps the body on short viewports (internal scroll) so the
 *      frame never pushes the page into a scroll.
 *
 * Usage: wrap the step body and hand SimShell the same idx/total/onIdx you'd
 * have passed to <SimNav> — it renders the nav for you.
 */
export function SimShell({
  children,
  idx,
  total,
  onIdx,
  accent = DEFAULT_ACCENT,
  isEn = false,
  showLabels = true,
  minHeight = 360,
  maxHeightVh = 76,
  pad = 16,
}: SimShellProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [floor, setFloor] = useState(minHeight);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => setFloor((prev) => Math.max(prev, Math.ceil(el.offsetHeight)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      style={{
        padding: pad,
        minHeight: floor,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        transition: "min-height 220ms ease",
      }}
    >
      <div ref={bodyRef} style={{ flex: "0 0 auto", maxHeight: `${maxHeightVh}vh`, overflowY: "auto" }}>
        {children}
      </div>
      <div style={{ marginTop: "auto", paddingTop: 14 }}>
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
