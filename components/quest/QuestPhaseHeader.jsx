// QuestPhaseHeader — "지금 이 단계!" 큰 배너 + 7단계 진행 점.
//
// 선생님 2026-07-16: 예전 LearningSteps 는 정적 스트립이라 위에 박혀만 있고
// "공간만 차지"했음. 대신 → 다음을 누를 때마다 "지금 정확히 뭘 하는 단계인지"를
// 크게 보여주고(습관), 아래 작은 7점 로드맵으로 전체 여정 속 위치를 표시.
//
// 각 quest 스텝에 phase(1~7) 를 달면, 그 스텝의 phase 배너가 뜬다.
// (②이해확인·⑥계획 은 애들이 잘 건너뛰는 단계 → ★ 로 강조.)
import { t } from "@/components/quest/theme";

export const QUEST_PHASES = [
  { n: 1, icon: "📖", ko: "문제 이해", en: "Understand",
    now: { ko: "문제를 내 말로 다시 말해보기", en: "Restate the problem in your own words" } },
  { n: 2, icon: "✋", ko: "이해 확인", en: "Check I got it", star: true,
    now: { ko: "내가 제대로 이해했는지 직접 풀어 확인", en: "Prove you understood — answer it yourself" } },
  { n: 3, icon: "🧠", ko: "전략 짜기", en: "Make a strategy",
    now: { ko: "어떻게 풀지 큰 그림 세우기", en: "Sketch how you'd solve it" } },
  { n: 4, icon: "🐢", ko: "브루트포스 한계", en: "Feel the brute-force limit",
    now: { ko: "그냥 다 해보면 왜 느린지 체감", en: "See why 'just try everything' is too slow" } },
  { n: 5, icon: "🔁", ko: "다시 전략", en: "Re-strategize",
    now: { ko: "느린 이유를 없앨 더 나은 방법", en: "A smarter plan that kills the slowness" } },
  { n: 6, icon: "📝", ko: "계획 세우기", en: "Plan it out", star: true,
    now: { ko: "코드 짜기 전에 '어떻게 짤지' 말로", en: "Say the plan in words before any code" } },
  { n: 7, icon: "⌨️", ko: "코드 짜기", en: "Write the code",
    now: { ko: "계획대로 한 조각씩 코드로", en: "Turn the plan into code, piece by piece" } },
];

export function QuestPhaseHeader({ E, phase }) {
  const cur = QUEST_PHASES.find((p) => p.n === phase);
  if (!cur) return null;
  const hot = !!cur.star;
  const bannerBg = hot ? "#fffbeb" : "#f0f9ff";
  const bannerBd = hot ? "#fbbf24" : "#7dd3fc";
  const titleFg = hot ? "#92400e" : "#0369a1";

  return (
    <div style={{ margin: "0 0 10px" }}>
      {/* 큰 '지금' 배너 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "11px 15px", borderRadius: 12,
        background: bannerBg, border: `2px solid ${bannerBd}`,
        boxShadow: "0 2px 8px rgba(0,0,0,.04)",
      }}>
        <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{cur.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", letterSpacing: 0.4, marginBottom: 1 }}>
            🧭 {t(E, "NOW", "지금")} · {cur.n}/7{hot ? " ★" : ""}
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: titleFg, lineHeight: 1.25, wordBreak: "keep-all" }}>
            {t(E, cur.en, cur.ko)}
          </div>
          <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, wordBreak: "keep-all", marginTop: 2 }}>
            {t(E, cur.now.en, cur.now.ko)}
          </div>
        </div>
      </div>

      {/* 작은 7단계 로드맵 — 현재 단계에 불이 켜짐 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 7, flexWrap: "wrap" }}>
        {QUEST_PHASES.map((p, i) => {
          const active = p.n === phase;
          const past = p.n < phase;
          const bg = active ? (p.star ? "#fef3c7" : "#e0f2fe") : "#fff";
          const bd = active ? (p.star ? "#fbbf24" : "#38bdf8") : past ? "#cbd5e1" : "#eef1f5";
          const fg = active ? (p.star ? "#92400e" : "#0369a1") : past ? "#94a3b8" : "#cbd5e1";
          return (
            <span key={p.n} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
              <span
                title={t(E, p.en, p.ko)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 3,
                  fontSize: 10.5, fontWeight: 800, whiteSpace: "nowrap",
                  padding: active ? "3px 9px" : "3px 7px", borderRadius: 999,
                  background: bg, border: `1.5px solid ${bd}`, color: fg,
                  transform: active ? "scale(1.06)" : "none",
                  transition: "all .2s ease",
                }}
              >
                <span style={{ fontSize: 11 }}>{p.icon}</span>
                {active ? t(E, p.en, p.ko) : p.n}{p.star ? "★" : ""}
              </span>
              {i < QUEST_PHASES.length - 1 && <span style={{ color: "#dbe1e8", fontSize: 10, fontWeight: 800 }}>›</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
