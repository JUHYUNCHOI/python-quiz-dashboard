"use client";

/**
 * QuestHealthBanner — Phase 0 of redesign.
 *
 * Renders a banner above quest content when the quest is flagged in
 * the quest-health registry. Banner is purely additive — it doesn't
 * change quest IDs, URLs, persisted state, or existing UI flow.
 *
 * Three banner styles based on category:
 *   - "stub-cpp"        → blue info: "Python only — C++ in progress"
 *   - "py-cpp-mismatch" → orange warning: languages diverge
 *   - "algorithm-bug" / "logic-bug" → red warning: code may be wrong
 *
 * Renders nothing if the quest is healthy or has only minor issues.
 */

import { getQuestHealth, type QuestHealthStatus } from "@/lib/quest-health";
import { t } from "@/components/quest/theme";

interface Props {
  questId: string;
  isEn?: boolean;
}

const STYLES: Record<QuestHealthStatus["category"], {
  bg: string;
  border: string;
  text: string;
  icon: string;
  label: { en: string; ko: string };
}> = {
  "stub-cpp": {
    bg: "#eff6ff",
    border: "#93c5fd",
    text: "#1e3a8a",
    icon: "🐍",
    label: {
      en: "Python only — C++ in progress",
      ko: "Python 만 완성 — C++ 작업 중",
    },
  },
  "py-cpp-mismatch": {
    bg: "#fff7ed",
    border: "#fdba74",
    text: "#7c2d12",
    icon: "⚠️",
    label: {
      en: "Python and C++ implement different algorithms — pick the one that matches the chapter narration",
      ko: "Python 과 C++ 가 다른 알고리즘을 구현 — 챕터 설명과 맞는 언어를 골라 보세요",
    },
  },
  "algorithm-bug": {
    bg: "#fef2f2",
    border: "#fca5a5",
    text: "#7f1d1d",
    icon: "🚧",
    label: {
      en: "This quest is being verified — code may have errors",
      ko: "이 quest 는 검토 중 — 코드에 오류가 있을 수 있어요",
    },
  },
  "logic-bug": {
    bg: "#fef2f2",
    border: "#fca5a5",
    text: "#7f1d1d",
    icon: "🚧",
    label: {
      en: "This quest has a known logic bug — being fixed",
      ko: "이 quest 는 알려진 logic 버그 있음 — 수정 중",
    },
  },
};

export function QuestHealthBanner({ questId, isEn = false }: Props) {
  const status = getQuestHealth(questId);
  if (!status || status.severity !== "critical") return null;
  const style = STYLES[status.category];
  const detail = isEn ? status.detailEn ?? status.detail : status.detail;

  return (
    <div
      role="alert"
      style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: 10,
        padding: "10px 14px",
        margin: "12px auto",
        maxWidth: "min(880px, 100%)",
        fontSize: 13,
        color: style.text,
        lineHeight: 1.55,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>
        {style.icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, marginBottom: 2 }}>
          {t(isEn, style.label.en, style.label.ko)}
        </div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>{detail}</div>
      </div>
    </div>
  );
}
