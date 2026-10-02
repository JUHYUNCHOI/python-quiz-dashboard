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

import Link from "next/link";
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
    /* ⛔ 2026-10-02 — **이 줄이 모바일에서 세 줄로 접혀 113px 를 먹고 있었다.**
         2026-10-01 에 MCC 48개에 칩을 붙이면서 머리말이 그만큼 길어졌고,
         그 탓에 `CodeWalk` 코드창이 `minHeight` 까지 눌려 **말풍선이 잘렸다.**
         학생 둘이 각각 *"코드 설명 5개 중 4개를 못 읽었다"*(`mcc20knight`) ·
         *"말풍선 마지막 줄이 코드 박스 바닥에 걸려 안 보였다"*(`mcc20kitty`) 고 했다.
         실측(375px, `mcc20knight`): 칩 줄 `top=194 h=113` — 칩 셋이 **각각 28px 로 세 줄**.
         수리 담당이 잰 부족분은 **66px** 였다 → **이 줄만 한 줄로 만들면 넘고도 남는다.**
       ⭐ **지우지 않는다** — 선생님이 **두 번**(2026-07-13 · 09-30) 요청하신 장치다.
         **접히지 않게**(`nowrap`) 하고 넘치면 **옆으로 밀어** 보게 한다.
         ⚠️ 가로 스크롤은 **이 줄 안에서만** 일어난다 — 쪽 전체는 안 밀린다.
       ⚠️ 칩이 많은 quest(5개)는 끝이 잘려 보일 수 있다. 그게 **말풍선이 잘리는 것보다 낫다** —
         칩은 「무엇으로 푸나」를 알려주는 보조고, 말풍선은 **코드를 설명하는 본문**이다. */
    <div style={{
      display: "flex", alignItems: "center", flexWrap: "nowrap", gap: 6,
      padding: "6px 12px", marginBottom: 8,
      overflowX: "auto", overflowY: "hidden",
      scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
      background: "#faf9fb", border: "1px solid #e5e7eb", borderRadius: 10,
    }}>
      <span style={{
        fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5,
        color: "#6b7280", textTransform: "uppercase", marginRight: 2,
        flexShrink: 0, whiteSpace: "nowrap",
      }}>
        {t(E, "Approach", "풀이 방법")}
      </span>
      {tags.map((tag, i) => {
        const c = COLORS[i % COLORS.length];
        const label = t(E, tag.en, tag.ko);
        const chipStyle = {
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 12, fontWeight: 700,
          padding: "3px 10px", borderRadius: 999,
          background: c.bg, border: `1.5px solid ${c.border}`, color: c.text,
          // 한 줄로 두니 칩 안에서 글이 접히면 안 된다 — 접히면 줄 높이가 다시 커진다
          whiteSpace: "nowrap", flexShrink: 0,
          textDecoration: "none",
          ...(tag.href ? { cursor: "pointer" } : {}),
        };
        const inner = (
          <>
            {tag.icon && <span style={{ fontSize: 13 }}>{tag.icon}</span>}
            {label}
            {/* href 있는 태그 = 배우러 가는 링크 (선생님 2026-07-13) */}
            {tag.href && <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 1 }}>↗</span>}
          </>
        );
        // href 있으면 클릭해서 학습 페이지로, 없으면 그냥 칩
        //
        // ⚠️ 2026-09-24: 여기가 `target` 없는 같은 탭 <Link> 라 **quest 에서 통째로 이탈**했다.
        //    학생이 실제로 헷갈렸다 — *"이게 설명이 들어있는 탭인 줄 알고 찾다가 못 찾았다."*
        //    **위 57줄이 ↗ 아이콘을 달아 「새로 열린다」고 약속해 놓고 동작이 달랐다** — 아이콘이 거짓말을 했다.
        //    고치는 법은 새 코드가 아니라 **이 저장소가 이미 쓰는 방식**이다 —
        //    `app/quest/[problemId]/client.tsx:351-362` 의 「원래 문제」 링크가
        //    `target="_blank" rel="noopener noreferrer"` + 툴팁 「새 탭에서 열기」를 쓴다.
        //    ⭐ 이렇게 고치면 **안내 문구가 필요 없어진다** — 학생이 되돌아올 일 자체가 없다
        //       (`feedback_shorter_not_longer` 와 안 부딪힌다). 툴팁도 정직해지게 「새 탭」을 적는다.
        return tag.href ? (
          <Link key={i} href={tag.href} style={chipStyle} target="_blank" rel="noopener noreferrer"
            title={t(E, "Learn this (new tab) →", "이거 배우러 가기 (새 탭) →")}>{inner}</Link>
        ) : (
          <span key={i} style={chipStyle}>{inner}</span>
        );
      })}
    </div>
  );
}
