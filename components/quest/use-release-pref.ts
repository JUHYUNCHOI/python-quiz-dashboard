"use client";

/**
 * useReleasePref — Phase 5 of redesign.
 *
 * Per-user opt-in toggle for beta quests. Defaults to false so
 * existing students see only stable ("full") quests, matching the
 * behavior they had before this feature was added.
 *
 * When set to true, beta-staged quests appear in the catalog
 * alongside full ones. Internal-staged quests are still teacher-only.
 *
 * Persisted in localStorage (key: "quest-release-pref"). Cross-tab
 * sync via storage events + a CustomEvent for same-tab listeners,
 * mirroring the pattern used in useCodeLang.
 */

import { useState, useEffect } from "react";

const KEY = "quest-release-pref";
const DEFAULT: ReleasePref = false;

export type ReleasePref = boolean; // true == beta opt-in

function readStored(): ReleasePref {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "1" ? true : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function writeStored(v: ReleasePref) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, v ? "1" : "0");
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("quest-release-pref-change", { detail: v }));
  } catch {}
}

export function useReleasePref(): [ReleasePref, (v: ReleasePref) => void] {
  const [v, setV] = useState<ReleasePref>(readStored);

  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ReleasePref>).detail;
      if (typeof next === "boolean") setV(next);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setV(e.newValue === "1");
    };
    window.addEventListener("quest-release-pref-change", onChange as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("quest-release-pref-change", onChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const set = (next: ReleasePref) => {
    writeStored(next);
    setV(next);
  };
  return [v, set];
}
