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
    screen: { ko: "먼저, 문제를 이해하자", en: "First, let's understand the problem" },
    now: { ko: "문제를 내 말로 다시 말해보기", en: "Restate the problem in your own words" } },
  { n: 2, icon: "✋", ko: "이해 확인", en: "Check I got it", star: true,
    screen: { ko: "내가 이해했는지 확인하자", en: "Let's check you really got it" },
    now: { ko: "내가 제대로 이해했는지 직접 풀어 확인", en: "Prove you understood — answer it yourself" } },
  { n: 3, icon: "🧠", ko: "전략 짜기", en: "Make a strategy",
    screen: { ko: "전략을 세우자", en: "Let's make a strategy" },
    now: { ko: "어떻게 풀지 큰 그림 세우기", en: "Sketch how you'd solve it" } },
  { n: 4, icon: "🐢", ko: "브루트포스 한계", en: "Feel the brute-force limit",
    screen: { ko: "그냥 다 해보면? — 한계를 느끼자", en: "Just try everything? — feel the limit" },
    now: { ko: "그냥 다 해보면 왜 느린지 체감", en: "See why 'just try everything' is too slow" } },
  { n: 5, icon: "🔁", ko: "다시 전략", en: "Re-strategize",
    screen: { ko: "더 빠른 방법을 찾자", en: "Let's find a faster way" },
    now: { ko: "느린 이유를 없앨 더 나은 방법", en: "A smarter plan that kills the slowness" } },
  { n: 6, icon: "📝", ko: "계획 세우기", en: "Plan it out", star: true,
    screen: { ko: "코드 짜기 전에 계획하자", en: "Let's plan before we code" },
    now: { ko: "코드 짜기 전에 '어떻게 짤지' 말로", en: "Say the plan in words before any code" } },
  { n: 7, icon: "⌨️", ko: "코드 짜기", en: "Write the code",
    screen: { ko: "이제 코드를 짜자", en: "Now let's write the code" },
    now: { ko: "계획대로 한 조각씩 코드로", en: "Turn the plan into code, piece by piece" } },
];

/**
 * QuestPhaseScreen — 한 단계의 시작을 알리는 '스크린'.
 * 선생님 2026-07-16: 위에 박힌 배너 말고, "먼저 문제를 이해하자" 처럼
 * 화면 가운데 크게 보여주고 다음을 눌러 그 단계로 들어가게.
 */
export function QuestPhaseScreen({ E, phase }) {
  const cur = QUEST_PHASES.find((p) => p.n === phase);
  if (!cur) return null;
  const hot = !!cur.star;
  return (
    <div style={{
      padding: "40px 22px", minHeight: 430,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5, marginBottom: 16 }}>
        {t(E, "STEP", "단계")} {cur.n} / 7
      </div>
      <div style={{ fontSize: 62, lineHeight: 1, marginBottom: 14 }}>{cur.icon}</div>
      <div style={{ fontSize: 26, fontWeight: 900, color: hot ? "#b45309" : "#0f172a", wordBreak: "keep-all", lineHeight: 1.3, maxWidth: 460 }}>
        {t(E, cur.screen.en, cur.screen.ko)}
      </div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 12, wordBreak: "keep-all", maxWidth: 420, lineHeight: 1.6 }}>
        {t(E, cur.now.en, cur.now.ko)}
      </div>
      {/* 7단계 진행 점 — 현재 단계만 길게 */}
      <div style={{ display: "flex", gap: 6, marginTop: 28, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
        {QUEST_PHASES.map((p) => {
          const active = p.n === phase;
          const past = p.n < phase;
          return (
            <span key={p.n} style={{
              width: active ? 28 : 9, height: 9, borderRadius: 999,
              background: active ? (p.star ? "#f59e0b" : "#0ea5e9") : past ? "#cbd5e1" : "#e5e7eb",
              transition: "all .2s",
            }} />
          );
        })}
      </div>
      <div style={{ fontSize: 12.5, color: "#0ea5e9", fontWeight: 800, marginTop: 24 }}>
        {t(E, "Press Next ▶ below to start", "아래 다음 ▶ 을 눌러 시작")}
      </div>
    </div>
  );
}

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
