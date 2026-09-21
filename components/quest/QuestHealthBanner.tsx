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
  /* 2026-09-21 추가 — `reverseeng` 에서 나왔다.
     네 분류 중 맞는 게 없었다: 알고리즘은 **맞고**(공식 샘플 OK OK LIE LIE),
     두 언어가 **같은 방법**을 쓰는데, 파이썬만 **원문 입력 형식에서 멈춘다**.
     `py-cpp-mismatch` 를 쓰니 "다른 알고리즘을 구현" 이라는 제목이 또 거짓말이 됐다.
     **분류가 없다고 비슷한 걸 갖다 쓰면 제목이 거짓말을 한다.** */
  "input-format": {
    bg: "#fefce8",
    border: "#fde047",
    text: "#713f12",
    icon: "📥",
    label: {
      en: "One language stops on the official input format — read the note before you submit",
      ko: "한쪽 언어가 원문 입력 형식에서 멈춰요 — 제출 전에 아래를 읽어 보세요",
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
