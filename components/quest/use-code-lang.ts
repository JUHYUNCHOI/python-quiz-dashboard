"use client";

/**
 * useCodeLang — Phase 0/4 of redesign.
 *
 * Per-user persistent code language choice (Python ↔ C++) shared
 * across all quest Apps via localStorage.
 *
 * Each quest App used to call `useState("py")` independently, so the
 * user's choice reset on every quest. With this hook the choice
 * persists across quest navigation.
 *
 * Backwards-compatible: existing students who never touched the
 * toggle see "py" as default (same as before). The first time any
 * student picks a language, it sticks.
 */

import { useState, useEffect } from "react";

const KEY = "quest-code-lang";
const DEFAULT: CodeLang = "py";

export type CodeLang = "py" | "cpp";

function readStored(): CodeLang {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "py" || v === "cpp" ? v : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function writeStored(v: CodeLang) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, v);
  } catch {}
  // Notify other tabs / components in the same tab
  try {
    window.dispatchEvent(new CustomEvent("quest-code-lang-change", { detail: v }));
  } catch {}
}

export function useCodeLang(): [CodeLang, (v: CodeLang) => void] {
  const [v, setV] = useState<CodeLang>(readStored);

  // Sync across components: when any one calls set, all hooks update.
  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<CodeLang>).detail;
      if (next === "py" || next === "cpp") setV(next);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && (e.newValue === "py" || e.newValue === "cpp")) {
        setV(e.newValue);
      }
    };
    window.addEventListener("quest-code-lang-change", onChange as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("quest-code-lang-change", onChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const set = (next: CodeLang) => {
    writeStored(next);
    setV(next);
  };
  return [v, set];
}
