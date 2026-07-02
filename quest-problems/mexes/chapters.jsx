import { C, t } from "@/components/quest/theme";
import { getMexesSections, MexesSlider } from "./components";
import { MexesMaxSim, MexesIntroSim, MexesSampleSim } from "./sims";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeMexesCh1(E) {
  return [
    /* 1-0 — 감 먼저: mex 뜻 + 문제가 뭘 시키나 (말풍선 시뮬). */
    {
      type: "reveal",
      narr: t(E,
        "First, get the feel — what mex means, and what this problem asks.",
        "먼저 감부터 — mex 가 뭐고, 이 문제가 뭘 시키는지."),
      content: (<MexesIntroSim E={E} />),
    },

    /* 1-1 — Problem statement (formal spec, after the intuition). */
    {
      type: "reveal",
      narr: t(E,
        "Now the formal version of what we just saw.",
        "방금 본 걸 이제 정확한 형식으로."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🧮</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#7c3aed" }}>Making Mexes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #7c3aed", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output N+1 lines — for each target mex 0..N, the minimum element changes to make the array's mex equal that target.",
                "N+1 줄 출력 — 각 목표 mex 0..N 에 대해, 배열의 mex 를 그 값으로 만드는 최소 원소 변경 수.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 10 }}>
              {t(E, "An array of N non-negative integers (each ≤ N). One operation = change ONE element to ANY non-negative integer.",
                    "음이 아닌 정수 N 개 배열 (각 ≤ N). 한 번의 연산 = 원소 하나를 아무 음이 아닌 정수로 바꾸기.")}
            </div>

            {/* mex 뜻·출력형식(줄↔목표 mex)은 앞 도입 시뮬 + 다음 출력 시뮬이 보여줌 — 여기선 규칙만 */}

            <div style={{ padding: "8px 10px", background: "#ecfeff", border: "1px dashed #67e8f9", borderRadius: 8, fontSize: 11.5, color: "#155e75", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 2·10⁵</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>0 ≤ a[i] ≤ N</code>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O: 출력 5줄을 하나씩 말풍선으로 (선생님 2026-07-02: 출력이 뭔지 설명). */
    {
      type: "reveal",
      narr: t(E,
        "Official sample — what each output line is, one by one.",
        "공식 샘플 — 출력 각 줄이 뭔지, 하나씩."),
      content: (<MexesSampleSim E={E} />),
    },

    /* 1-2c — 핵심 시뮬: 목표 mex 별 max(채우기, 제거). (선생님 2026-06-28: 텍스트 벽 → 스텝 말풍선) */
    {
      type: "reveal",
      narr: t(E,
        "Each target mex: fill the missing + remove copies → take the max.",
        "목표 mex 마다: 빠진 값 채우기 + mex 제거 → max."),
      content: (<MexesMaxSim E={E} />),
    },

    /* 1-3 — Interactive: drag mex slider. */
    {
      type: "reveal",
      narr: t(E,
        "Your turn — drag to try any target mex yourself.",
        "이번엔 직접 — 슬라이더로 목표 mex 를 바꿔가며 실험해봐요."),
      content: (<MexesSlider E={E} />),
    },

  ];
}

export function makeMexesCh2(E, lang = "py") {
  return [
    /* 2-1..2-N — sections directly. */
    ...getMexesSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "Each target mex: ops = max(missing values, count of mex).",
            "각 목표 mex: ops = max(빠진 값 수, mex 개수).")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
