import { C, t } from "@/components/quest/theme";
import { getSocDist2Sections, SocDist2Sim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Find the minimum number of cows that could have started infected to explain the current state.",
        "지금 상태가 나오려면 처음에 아팠던 소가 몇 마리였을지 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udda0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Social Distancing II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2020 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of initially infected cows under the largest valid spread radius R.",
                "지금 상태와 어긋나지 않는 가장 큰 R 을 찾고, 그 R 일 때 처음 아팠던 소가 최소 몇 마리인지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows stand at ", "소들이 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "known positions on a number line", "수직선 위 정해진 위치")}</b>
                  {t(E, "; each is currently SICK or HEALTHY.",
                        "에 있고, 현재 감염 또는 건강 상태예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The disease spreads from a sick cow to any cow ", "병은 감염된 소에서 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "within distance R (unknown)", "거리 R 이내 (R 은 미지수)")}</b>
                  {t(E, " — find the LARGEST R consistent with the data (no healthy cow within R of any sick cow).",
                        " 의 모든 소에게 옮았어요. 건강한 소가 아픈 소의 R 안에 하나도 없어야 하니, 그런 R 중 가장 큰 값을 찾아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of cows that could have started infected", "최초 감염 소의 최소 수")}</b>
                  {t(E, " under that R.", "를 출력해요. 그 R 일 때를 기준으로요.")}
                </div>
              </div>
            </div>
          </div>

          {/* 🦠 Deep-audit sim — pick R, see infection rings + clusters */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 8px", marginTop: 6 }}>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
              🦠 {t(E, "See it: spread radius R vs clusters", "직접 봐요 — 전파 반경 R 과 클러스터(이어진 감염 무리)")}
            </div>
            <SocDist2Sim E={E} />
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all cows are sick and there are no healthy cows, what's the minimum number of initially infected cows?", "건강한 소가 하나도 없으면 처음 아팠던 소는 최소 몇 마리일까요?"),
      question: t(E,
        "All cows sick, no healthy cows. Min initially infected?",
        "소가 전부 아프고 건강한 소는 없어요. 처음 아팠던 소는 최소 몇 마리일까요?"),
      options: [
        t(E, "1 (one cow could infect all)", "1 (한 마리가 전부 옮길 수 있어요)"),
        t(E, "N (each cow was independently infected)", "N (소마다 따로따로 아팠어요)"),
        t(E, "N/2", "N/2"),
      ],
      correct: 0,
      explain: t(E,
        "With no healthy cows, R can be arbitrarily large. One initially infected cow with huge R could infect everyone.",
        "R 을 막는 건 건강한 소뿐이에요. 건강한 소가 없으면 R 을 아주 크게 잡을 수 있고, 그러면 한 마리가 모두에게 옮겨요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "All cows are sick with no healthy cows.\nWhat is the minimum number of initially infected cows?", "건강한 소가 없을 때 처음 아팠던 소는 최소 몇 마리일까요?"),
      question: t(E,
        "5 cows, all sick, 0 healthy. Min initially infected?",
        "소 5마리가 전부 아프고 건강한 소는 0마리예요. 처음 아팠던 소는 최소 몇 마리일까요?"),
      hint: t(E,
        "Without healthy cows to bound R, how few starters can spread to all?",
        "R 을 막을 건강한 소가 없으면 처음 아팠던 소는 얼마나 적어질 수 있을까요?"),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist2Ch2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Take the largest R that never reaches a healthy cow, then count the clusters.",
        "건강한 소에 닿지 않는 가장 큰 R 을 잡고 클러스터 수를 세요."),
      sections: getSocDist2Sections(E),
    },
  ];
}
