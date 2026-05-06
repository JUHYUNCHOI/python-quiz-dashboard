"use client";

/**
 * ReleaseStageBanner — Phase 5 of redesign.
 *
 * Shows above quest content when the quest is at "internal" or
 * "beta" stage so the viewer knows what they're looking at:
 *
 *   - internal: "draft — only visible to teachers"
 *   - beta:     "in-progress redesign — feedback welcome"
 *   - full:     no banner (default behavior)
 *
 * Renders nothing for full-stage quests, so non-flagged quests are
 * unchanged. The detail text is purely informational; the banner
 * never blocks navigation.
 */

import { getReleaseStage } from "@/lib/quest-meta";
import { t } from "@/components/quest/theme";

interface Props {
  questId: string;
  isEn?: boolean;
}

export function ReleaseStageBanner({ questId, isEn = false }: Props) {
  const stage = getReleaseStage(questId);
  if (stage === "full") return null;

  const isInternal = stage === "internal";
  const bg = isInternal ? "#fef2f2" : "#fdf4ff";
  const border = isInternal ? "#fca5a5" : "#e9b8ff";
  const text = isInternal ? "#7f1d1d" : "#701a75";
  const icon = isInternal ? "🛠️" : "🧪";
  const title = isInternal
    ? t(isEn, "Internal draft — visible to teachers only", "내부 작업 중 — 선생님에게만 보임")
    : t(isEn, "Beta — in-progress redesign", "베타 — 새로 만드는 중");
  const detail = isInternal
    ? t(
        isEn,
        "This quest is being rewritten. Students do not see it in the catalog yet.",
        "이 quest 는 새로 만들고 있어요. 학생 카탈로그에는 아직 안 보여요."
      )
    : t(
        isEn,
        "Beta quest — content may still change. Found a bug? Tell your teacher.",
        "베타 quest — 내용이 바뀔 수 있어요. 이상하면 선생님께 알려주세요."
      );

  return (
    <div
      role="alert"
      style={{
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 10,
        padding: "10px 14px",
        margin: "12px auto",
        maxWidth: "min(880px, 100%)",
        fontSize: 13,
        color: text,
        lineHeight: 1.55,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>{detail}</div>
      </div>
    </div>
  );
}
