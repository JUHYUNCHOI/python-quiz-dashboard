import { C, t } from "@/components/quest/theme";
import { getCornerCoverSections } from "./components";
import { CornerCoverSim } from "./sims";

/* 옛 문제(꼭짓점 개수 세기)용 CornerAuditSim 과 SOLUTION_CODE 는 2026-07-30 삭제 —
   quest 를 진짜 MCC 2024 P1 로 교체하면서 아무도 참조하지 않는 죽은 코드가 됐다.
   (남겨두면 다음에 읽는 사람이 "이 문제는 1/2/4 를 세는 거구나" 로 오해한다.) */

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)

   ⚠️ 2026-07-30 전면 재작성 — 이 챕터는 *다른 문제* 를 설명하고 있었다.
      옛 내용: "N×M 격자의 꼭짓점 칸 개수" (답이 1/2/4).
      진짜 MCC 2024 P1: A×B(또는 B×A) 부분격자로 코너 칸 2 개 이상을 덮을 수
      있는지 YES/NO.  선생님이 원문 PDF 를 주셔서 확인 후 교체.
      흐름은 표준대로 — 도입 → 입출력 → 직접 놓아보기(시뮬) → 규칙 정리.
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh1(E) {
  return [
    /* [기] 도입 — 기호보다 그림. 코너가 무엇인지부터. */
    {
      type: "reveal",
      narr: t(E,
        "A grid has four corner cells. You get one rectangular stamp of size A x B (you may lay it on its side). Can you place it so it covers at least TWO corner cells at once?",
        "격자에는 코너 칸이 네 개 있어요. 크기가 A × B 인 도장 하나를 받아요 (눕혀서 놔도 돼요). 이 도장 하나로 코너 칸을 한 번에 두 개 이상 덮을 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📐</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Corner Cover</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.6, wordBreak: "keep-all" }}>
              {t(E, "Can one A x B subgrid cover at least two corner cells?  Answer YES or NO.",
                    "A × B 부분격자 하나로 코너 칸을 2 개 이상 덮을 수 있나?  YES 또는 NO 로 답하기.")}
            </div>
          </div>

          {/* 코너가 어디인지 — 그림 한 장 */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div>
              {[0, 1, 2].map((r) => (
                <div key={r} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                  {[0, 1, 2, 3].map((c) => {
                    const corner = (r === 0 || r === 2) && (c === 0 || c === 3);
                    return (
                      <div key={c} style={{
                        width: 34, height: 34, borderRadius: 6,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: corner ? "#fee2e2" : "#fff",
                        border: `${corner ? 2 : 1}px solid ${corner ? "#fca5a5" : "#e2e8f0"}`,
                        color: "#b91c1c", fontSize: 15, fontWeight: 800,
                      }}>{corner ? "◆" : ""}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 11.5, color: C.dim, marginBottom: 12 }}>
            {t(E, "the four corner cells of an n x m grid: (1,1) (1,m) (n,1) (n,m)",
                  "n × m 격자의 코너 칸 넷: (1,1) (1,m) (n,1) (n,m)")}
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
              <div>• {t(E, "You pick one subgrid of size ", "크기 ")}<b style={{ color: "#059669" }}>A × B</b>
                {t(E, " or ", " 또는 ")}<b style={{ color: "#059669" }}>B × A</b>
                {t(E, " (so you may rotate it).", " 인 부분격자 하나를 골라요 (눕혀도 돼요).")}</div>
              <div>• {t(E, "It must sit inside the grid, aligned to the cells.", "부분격자는 격자 안에 칸에 맞춰 들어가야 해요.")}</div>
            </div>
          </div>
        </div>),
    },

    /* [승] 입출력 형식 + 공식 샘플 (원문 PDF 그대로) */
    {
      type: "reveal",
      narr: t(E,
        "Many test cases arrive at once. Read T, then four numbers per line, and print YES or NO for each.",
        "테스트가 여러 개 한꺼번에 와요. T 를 읽고, 한 줄에 네 숫자씩 읽어서 각각 YES / NO 를 출력해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "10px 14px", minWidth: 170 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, color: "#334155" }}>{`3
2 3 3 3
2 3 2 3
2 3 2 1`}</pre>
            </div>
            <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", minWidth: 130 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#065f46", marginBottom: 6 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, color: "#334155" }}>{`NO
YES
YES`}</pre>
            </div>
          </div>

          <div style={{ maxWidth: 470, margin: "0 auto", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#4c1d95", lineHeight: 1.85 }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>🔍 {t(E, "line by line", "한 줄씩")}</div>
            <div><code>3</code> — {t(E, "how many test cases", "테스트 개수")}</div>
            <div><code>2 3 3 3</code> — n=2, m=3, A=3, B=3 → {t(E, "a 3x3 stamp cannot fit in 2x3", "3×3 도장은 2×3 안에 안 들어가요")} → <b>NO</b></div>
            <div><code>2 3 2 3</code> — {t(E, "the stamp IS the whole grid → all 4 corners", "도장이 곧 격자 전체 → 코너 4 개 다")} → <b>YES</b></div>
            <div><code>2 3 2 1</code> — {t(E, "2x1 standing at the right edge holds (1,3) and (2,3)", "2×1 을 오른쪽 끝에 세우면 (1,3) 과 (2,3)")} → <b>YES</b></div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #ddd6fe", fontSize: 11.5, color: "#6d28d9" }}>
              📎 {t(E, "n, m, A, B go up to 10^18 — in C++ you need long long.",
                       "n, m, A, B 가 10^18 까지 커요 — C++ 은 long long 이 필요해요.")}
            </div>
          </div>
        </div>),
    },

    /* [전] 직접 놓아보기 — 규칙을 말로 주기 전에 손으로 찾게 한다. */
    {
      type: "reveal",
      narr: t(E,
        "Before any rule: put the stamp down yourself. Try to catch two corners — and notice when it becomes impossible.",
        "아직 규칙은 안 알려줄게요. 직접 놓아보면서 — 어떤 크기는 코너 2 개를 잡고 어떤 크기는 아무리 옮겨도 못 잡아요. 그 차이를 찾아보세요."),
      content: (<CornerCoverSim E={E} reveal={false} />),
    },

    /* [결] 규칙 정리 — 시뮬에서 본 것을 문장 하나로. */
    {
      type: "reveal",
      narr: t(E,
        "Did you see it? Two corner cells always sit at the two ends of one side. So the stamp has to reach that side end to end.",
        "보셨나요? 코너 두 개는 언제나 한 변의 양 끝에 있어요. 그래서 도장이 그 변을 끝에서 끝까지 닿아야 해요."),
      content: (
        <div style={{ padding: 18, wordBreak: "keep-all" }}>
          <div style={{ maxWidth: 470, margin: "0 auto 12px", background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 12, padding: "13px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 8 }}>
              💡 {t(E, "Only two things to check", "확인할 건 딱 두 가지")}
            </div>
            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>① {t(E, "does it FIT", "들어가나")} — h ≤ n {t(E, "and", "그리고")} w ≤ m</div>
              <div>② {t(E, "does it SPAN", "꽉 채우나")} — h == n {t(E, "or", "또는")} w == m</div>
            </div>
            <div style={{ fontSize: 12, color: "#065f46", marginTop: 8, lineHeight: 1.7 }}>
              {t(E, "Both true → YES. And try the stamp both ways: (A,B) and (B,A).",
                    "둘 다 참이면 YES. 그리고 도장은 두 방향으로 놔봐요 — (A,B) 와 (B,A).")}
            </div>
          </div>

          <div style={{ maxWidth: 470, margin: "0 auto", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 12, color: "#475569", lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: "#334155", marginBottom: 4 }}>
              🤔 {t(E, "What about the two diagonal corners?", "대각선 두 코너는요?")}
            </div>
            {t(E, "To hold (1,1) and (n,m) the stamp must span BOTH directions — that is the whole grid, which already spans a side. So it needs no extra case.",
                  "(1,1) 과 (n,m) 을 같이 품으려면 양쪽 방향을 다 채워야 해요 — 그건 격자 전체고, 이미 한 변을 꽉 채운 경우예요. 그래서 따로 볼 필요가 없어요.")}
          </div>

          {/* 같은 시뮬을 '확인 모드' 로 한 번 더 — 방금 말한 규칙이 화면의 숫자와
              맞는지 학생이 직접 대조한다. 관찰(3 장) → 추론 → 확인(여기). */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed #cbd5e1" }}>
            <div style={{ textAlign: "center", fontSize: 11.5, fontWeight: 700, color: "#475569", marginBottom: 4 }}>
              {t(E, "check the rule against the sim", "규칙이 맞는지 시뮬로 확인해보세요")}
            </div>
            <CornerCoverSim E={E} reveal={true} />
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      /* 앞 슬라이드가 규칙(들어가나·꽉 채우나)을 이미 말했다. 여기선 그 두 검사가
         코드의 어느 줄인지만. (선생님 2026-07-30: "반복된건 없는지") */
      narr: t(E,
        "Those two checks are two lines of code. Find them — and notice the loop that lays the stamp on its side.",
        "방금 그 두 검사가 코드에선 두 줄이에요. 어디인지 찾아보고, 도장을 눕히는 반복문도 같이 보세요."),
      sections: getCornerCoverSections(E),
    },
  ];
}
