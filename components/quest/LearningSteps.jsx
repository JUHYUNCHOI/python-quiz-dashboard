// LearningSteps — 모든 quest 공통 '풀이 7단계' 로드맵.
// (선생님 2026-07-15: "꼭 애들이 습관처럼 이 단계를 생각하면서 할 수 있도록.")
//   애들이 보통 ②이해확인·⑥계획 을 건너뛰고 바로 코드로 점프 → 그 두 개를 ★ 로 강조.
//   quest 마다 똑같은 스트립을 상단에 노출 → 반복해서 보며 순서를 몸에 익힘.
import { t } from "@/components/quest/theme";

const STEPS = [
  { n: 1, icon: "📖", ko: "문제 이해", en: "Understand" },
  { n: 2, icon: "✋", ko: "이해 확인", en: "Check I got it", star: true },
  { n: 3, icon: "🧠", ko: "전략", en: "Strategy" },
  { n: 4, icon: "🐢", ko: "브루트 한계", en: "Brute limit" },
  { n: 5, icon: "🔁", ko: "다시 전략", en: "Re-strategy" },
  { n: 6, icon: "📝", ko: "계획", en: "Plan", star: true },
  { n: 7, icon: "⌨️", ko: "코드", en: "Code" },
];

export function LearningSteps({ E }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",
      gap: 3, padding: "8px 10px", margin: "0 0 8px",
      background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12,
    }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: "#475569", marginRight: 4, wordBreak: "keep-all" }}>
        🧭 {t(E, "Solve in this order", "이 순서로 풀어요")}
      </span>
      {STEPS.map((s, i) => (
        <span key={s.n} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
          <span title={s.star ? t(E, "kids skip this — don't!", "애들이 잘 건너뛰는 단계 — 꼭!") : ""} style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
            padding: "3px 8px", borderRadius: 999,
            background: s.star ? "#fef3c7" : "#fff",
            border: `1.5px solid ${s.star ? "#fbbf24" : "#e5e7eb"}`,
            color: s.star ? "#92400e" : "#475569",
          }}>
            <span style={{ fontSize: 11 }}>{s.icon}</span>
            {t(E, s.en, s.ko)}{s.star ? " ★" : ""}
          </span>
          {i < STEPS.length - 1 && <span style={{ color: "#cbd5e1", fontSize: 11, fontWeight: 800 }}>›</span>}
        </span>
      ))}
    </div>
  );
}
