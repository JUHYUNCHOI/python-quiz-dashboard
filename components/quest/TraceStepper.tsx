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

import { useState } from "react";
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
}: NarrativePanelProps) {
  return (
    <div
      style={{
        background: "#faf5ff",
        border: "2px solid #c4b5fd",
        borderRadius: 10,
        padding,
        marginBottom,
        minHeight,
        fontSize: 13,
        color: "#1f2937",
        lineHeight,
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
  const fallbackSub = t(
    isEn,
    `Press ▶ to walk through. (${safe + 1} / ${total})`,
    `▶ 눌러서 진행. (${safe + 1} / ${total})`
  );
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
