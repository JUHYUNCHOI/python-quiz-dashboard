import { C, t } from "@/components/quest/theme";
import { getGiftsSections } from "./components";
import { GiftQueueSim } from "./sims";

/* 옛 문제(N 개를 K 명에게)용 SOLUTION_CODE 는 2026-07-30 삭제 — quest 를
   진짜 MCC 2024 P2 로 교체하면서 아무도 참조하지 않는 죽은 코드가 됐다.
   남겨두면 다음에 읽는 사람이 "이 문제는 N % K 구나" 로 오해한다. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)

   ⚠️ 2026-07-30 전면 재작성 — 이 챕터는 *다른 문제* 를 설명하고 있었다.
      옛 내용: "선물 N 개를 K 명에게 고르게 → 추가로 받는 사람 수" (답 = N % K).
      진짜 MCC 2024 P2: 손님 n 명 · 선물 m 개(m < n), 티어 낮은 사람부터,
      같은 티어면 먼저 온 사람부터. 출력은 손님 1..n 순서로 0/1.
      원문: public/problems/mcc-2024-statements.pdf p.3-4
   ═══════════════════════════════════════════════════════════════ */
export function makeGiftsCh1(E) {
  return [
    /* [기] 도입 */
    {
      type: "reveal",
      narr: t(E,
        "You invited more guests than you have gifts. You hand them out by tier — closest friends (tier 1) first. If a tier runs out of gifts partway, whoever arrived earlier gets it. Who ends up with a gift?",
        "손님보다 선물이 적어요. 친한 순서(티어)대로 나눠줘요 — 티어 1 이 제일 친한 친구. 어떤 티어에서 선물이 도중에 떨어지면, 먼저 온 사람이 가져가요. 누가 선물을 받게 될까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🎁</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#a21caf" }}>Gifts</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P2</div>
          </div>

          <div style={{ background: "#fdf4ff", border: "1.5px solid #d946ef", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#86198f", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#86198f", lineHeight: 1.6, wordBreak: "keep-all" }}>
              {t(E, "For each guest, print 1 if they receive a gift and 0 if they do not.",
                    "손님마다 선물을 받으면 1, 못 받으면 0 을 출력하기.")}
            </div>
          </div>

          <div style={{ background: "#fdf4ff", border: "1px solid #f0abfc", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#86198f", marginBottom: 8 }}>
              📖 {t(E, "The rule", "규칙")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: C.text, lineHeight: 1.6, wordBreak: "keep-all" }}>
              <div>• {t(E, "There are ", "손님이 ")}<b style={{ color: "#a21caf" }}>n</b>
                {t(E, " guests but only ", " 명인데 선물은 ")}<b style={{ color: "#a21caf" }}>m</b>
                {t(E, " gifts, and m is always smaller.", " 개뿐이고, 선물이 항상 모자라요.")}</div>
              <div>• {t(E, "Each guest has a ", "손님마다 ")}<b style={{ color: "#a21caf" }}>{t(E, "tier", "티어")}</b>
                {t(E, " — smaller means closer to you.", " 가 있어요 — 숫자가 작을수록 친한 사이예요.")}</div>
              <div>• {t(E, "Give to tier 1 first, then tier 2, then tier 3 …",
                          "티어 1 에게 먼저, 그 다음 티어 2, 티어 3 …")}</div>
              <div>• {t(E, "Not enough gifts inside one tier? ", "한 티어 안에서 선물이 모자라면? ")}
                <b style={{ color: "#a21caf" }}>{t(E, "the earlier guest wins", "먼저 온 손님이 받아요")}</b>
                {t(E, " (guest 1 arrives before guest 2, and so on).", " (손님 1 이 손님 2 보다 먼저 왔어요).")}</div>
            </div>
          </div>
        </div>),
    },

    /* [승] 입출력 + 공식 샘플 */
    {
      type: "reveal",
      narr: t(E,
        "Two lines in: the counts, then every guest's tier. One line out: n zeros and ones.",
        "입력은 두 줄 — 개수, 그리고 손님들의 티어. 출력은 한 줄 — 0 과 1 이 n 개."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "Input", "입력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, color: "#334155" }}>{`8 6
3 1 4 1 5 9 2 5`}</pre>
            </div>
            <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "Output", "출력")}</div>
              <pre style={{ margin: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.7, color: "#334155" }}>{`1 1 1 1 1 0 1 0`}</pre>
            </div>
          </div>

          <div style={{ maxWidth: 470, margin: "0 auto", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 10, padding: "11px 14px", fontSize: 12.5, color: "#4c1d95", lineHeight: 1.85 }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>🔍 {t(E, "line by line", "한 줄씩")}</div>
            <div><code>8 6</code> — {t(E, "8 guests, 6 gifts (so 2 go home empty)", "손님 8 명, 선물 6 개 (2 명은 못 받아요)")}</div>
            <div><code>3 1 4 1 5 9 2 5</code> — {t(E, "guest 1 is tier 3, guest 2 is tier 1, …", "손님 1 은 티어 3, 손님 2 는 티어 1, …")}</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #ddd6fe" }}>
              {t(E, "The output is in ", "출력은 ")}<b>{t(E, "guest order", "손님 번호 순")}</b>
              {t(E, " — the 6th number is 0, so guest 6 got nothing.",
                    " 이에요 — 6 번째가 0 이니 손님 6 이 못 받았어요.")}
            </div>
          </div>
        </div>),
    },

    /* [전] 시뮬 — 줄 서는 장면과 선물이 떨어지는 순간 */
    {
      type: "reveal",
      narr: t(E,
        "Watch the line form, then hand the gifts out one at a time. Keep an eye on the moment they run out.",
        "줄이 서는 걸 보고, 선물을 한 개씩 나눠줘요. 선물이 떨어지는 순간을 눈여겨 보세요."),
      content: (<GiftQueueSim E={E} />),
    },

    /* [결] 규칙 → 코드로 가는 다리 */
    {
      type: "reveal",
      narr: t(E,
        "So the whole problem is one line-up. Sort by (tier, arrival), hand gifts to the first m, and print in the original order.",
        "결국 줄 세우기 하나예요. (티어, 도착 순) 으로 정렬하고, 앞에서 m 명에게 주고, 원래 번호 순으로 출력."),
      content: (
        <div style={{ padding: 18, wordBreak: "keep-all" }}>
          <div style={{ maxWidth: 470, margin: "0 auto 12px", background: "#fdf4ff", border: "1.5px solid #f0abfc", borderRadius: 12, padding: "13px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#86198f", marginBottom: 8 }}>
              💡 {t(E, "Three moves", "세 동작")}
            </div>
            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.95 }}>
              <div>① {t(E, "line up by ", "줄 세우기 — ")}<b>{t(E, "(tier, arrival)", "(티어, 도착 순)")}</b></div>
              <div>② {t(E, "the first ", "앞에서 ")}<b>m</b>{t(E, " in line get a gift", " 명이 선물을 받음")}</div>
              <div>③ {t(E, "print in the ", "출력은 ")}<b>{t(E, "original guest order", "원래 손님 번호 순")}</b></div>
            </div>
          </div>

          <div style={{ maxWidth: 470, margin: "0 auto", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 12, color: "#475569", lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: "#334155", marginBottom: 4 }}>
              ⚠️ {t(E, "The easy mistake", "흔한 실수")}
            </div>
            {t(E, "Printing in the queue order. The queue is only for deciding WHO gets a gift — the answer still has to come out guest 1, guest 2, guest 3 …",
                  "줄 순서대로 출력하는 것. 줄은 '누가 받나' 를 정하는 데만 쓰고, 답은 손님 1, 2, 3 … 순서로 나가야 해요.")}
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGiftsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Sort by (tier, arrival), give to the first m in line, then print in the original guest order.",
        "(티어, 도착 순) 으로 정렬 → 줄 앞에서 m 명에게 → 원래 손님 번호 순으로 출력."),
      sections: getGiftsSections(E),
    },
  ];
}
