// AlgorithmTags — quest 최상단에 "이 quest 에서 뭘/어떻게 푸는지" 태그 형태로 노출.
// (선생님 2026-07-13: "각 사용된 알고리즘이 위에 태그처럼 나왔으면 좋겠어. 뭘 어떻게 풀어갈건지 크게 보이지가 않아.")
//
// 사용 예 (한/영 배열 각각):
//   <AlgorithmTags E={E} tags={[
//     { icon: "🎯", ko: "완전 시뮬레이션", en: "Full simulation" },
//     { icon: "📏", ko: "가운데서 넓히기", en: "Widen from center" },
//     { icon: "⚡", ko: "델타 갱신 O(1)", en: "Delta update O(1)" },
//   ]} />
//
// 학생 시선 흐름: quest 열자마자 "아, 이거 [완전 시뮬레이션 + 가운데서 넓히기] 로 푸는구나!"
// → 세부 챕터를 볼 때 이미 큰 그림을 알고 시작.

import { t } from "@/components/quest/theme";

const COLORS = [
  { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },   // blue
  { bg: "#f0fdf4", border: "#86efac", text: "#166534" },   // green
  { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" },   // amber
  { bg: "#f5f3ff", border: "#c4b5fd", text: "#5b21b6" },   // purple
  { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b" },   // red
  { bg: "#ecfeff", border: "#67e8f9", text: "#0e7490" },   // cyan
];

export function AlgorithmTags({ E, tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6,
      padding: "8px 12px", marginBottom: 8,
      background: "#faf9fb", border: "1px solid #e5e7eb", borderRadius: 10,
    }}>
      <span style={{
        fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5,
        color: "#6b7280", textTransform: "uppercase", marginRight: 2,
      }}>
        {t(E, "Approach", "풀이 방법")}
      </span>
      {tags.map((tag, i) => {
        const c = COLORS[i % COLORS.length];
        const label = t(E, tag.en, tag.ko);
        return (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 12, fontWeight: 700,
            padding: "3px 10px", borderRadius: 999,
            background: c.bg, border: `1.5px solid ${c.border}`, color: c.text,
            wordBreak: "keep-all",
          }}>
            {tag.icon && <span style={{ fontSize: 13 }}>{tag.icon}</span>}
            {label}
          </span>
        );
      })}
    </div>
  );
}
