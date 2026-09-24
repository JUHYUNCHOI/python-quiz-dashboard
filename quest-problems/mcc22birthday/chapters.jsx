import { C, t } from "@/components/quest/theme";
import { getMcc22BirthdaySections, Mcc22BirthdayCookieSim, Mcc22BirthdayBackwardWalkSim } from "./components";

const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ================================================================
   SOLUTION CODE  (verified → pqpdppdd; see components.jsx FULL_PY)
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
   [title + 🎯 mission + 📖 problem] → [📥 input + sample]
   → [concept sim] → [understanding quiz]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22BirthdayCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Each letter doubles the cookie grid — what shape is the Nth cookie?",
        "글자 하나마다 쿠키 격자가 두 배로 늘어나요.\n몇 번째 쿠키가 어떤 모양일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🎂"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f97316" }}>Cats' Birthday Cookies</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "For each queried cookie number, print its shape: p, q, b, or d.",
                "물어본 쿠키 번호마다 그 모양(p, q, b, d)을 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Start with a ", "")}<b style={{ color: "#ea580c" }}>1×1</b>
                  {t(E, " grid holding one ", " 격자에 ")}<b style={{ color: "#ea580c", fontFamily: "'JetBrains Mono',monospace" }}>p</b>
                  {t(E, "-shaped cookie.", " 모양 쿠키 한 개로 시작해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Read a scroll of letters, left to right. Each letter ", "글자 두루마리를 왼쪽부터 차례로 읽어요. 글자 하나가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "doubles the grid", "격자를 두 배로")}</b>:
                  <div style={{ marginTop: 4, paddingLeft: 4, fontSize: 12.5 }}>
                    <div><b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#ea580c" }}>A</b> — {t(E, "copy to the RIGHT, unchanged.", "오른쪽에 그대로 복사해 붙여요.")}</div>
                    <div><b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#ea580c" }}>B</b> — {t(E, "copy to the RIGHT, each cookie flipped left↔right (p↔q, b↔d).", "오른쪽에 복사하되 각 쿠키를 좌우로 뒤집어요 (p↔q, b↔d).")}</div>
                    <div><b style={{ fontFamily: "'JetBrains Mono',monospace", color: "#ea580c" }}>C</b> — {t(E, "copy BELOW, each cookie flipped up↔down (p↔b, q↔d).", "아래쪽에 복사하되 각 쿠키를 위아래로 뒤집어요 (p↔b, q↔d).")}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "After all letters, cookies are numbered ", "모든 글자가 끝나면 쿠키를 ")}
                  <b style={{ color: "#ea580c" }}>{t(E, "left→right, top→bottom", "왼→오, 위→아래")}</b>
                  {t(E, " (1, 2, 3, …). Friend 1 eats cookie 1, friend 2 eats cookie 2, and so on.",
                        " 순으로 1, 2, 3, … 번호를 매겨요. 1번 친구가 1번 쿠키를, 2번 친구가 2번 쿠키를 먹어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each friend's ", "각 친구의 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "cookie number, print that cookie's shape", "쿠키 번호에 대해 그 쿠키의 모양을 출력")}</b>
                  {t(E, ".", "해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "The grid can grow to 2^N cookies, so friend numbers are given as plain 1-based indices, not coordinates.",
        "격자는 글자마다 두 배로 커져서 2^N(2 를 N 번 곱한 수) 개까지 갈 수 있어요.\n그래서 친구 번호는 좌표가 아니라 1 부터 세는 순번 하나로 줘요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Line 1: ", "1번째 줄: ")}<b style={{ fontFamily: "'JetBrains Mono',monospace" }}>N S Q</b> — {t(E, "letters per scroll, number of scrolls, number of friends", "두루마리 길이, 두루마리 개수, 친구 수")}</div>
              <div>• {t(E, "Next S lines: ", "다음 S 줄: ")}{t(E, "each a scroll — a length-N string of ", "각 두루마리 — ")}<b style={{ fontFamily: "'JetBrains Mono',monospace" }}>A/B/C</b>{t(E, "", " 로 된 길이 N 문자열")}</div>
              <div>• {t(E, "Last line: ", "마지막 줄: ")}{t(E, "Q friend numbers (cookie indices)", "친구 번호 Q 개 (쿠키 순번)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8, ...KA }}>
              {t(E, "Limits: 1 ≤ N, Q ≤ 10^4,  1 ≤ S ≤ 3,  1 ≤ friend ≤ min(2^N, 10^9).",
                    "제약: 1 ≤ N, Q ≤ 10^4,  1 ≤ S ≤ 3,  1 ≤ 친구번호 ≤ min(2^N, 10^9).")}
            </div>
          </div>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
              📤 {t(E, "Output", "출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              {t(E, "For each scroll, the shapes of its Q queried cookies, all concatenated into one line.",
                    "각 두루마리마다, 물어본 쿠키 Q 개의 모양을 이어 붙여 한 줄로 출력해요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 140 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>4 2 4 <span style={{ color: "#64748b", fontSize: 10.5 }}>{t(E, "← N S Q", "← N S Q")}</span></div>
              <div>ABCA <span style={{ color: "#64748b", fontSize: 10.5 }}>{t(E, "← scroll 1", "← 두루마리1")}</span></div>
              <div>BCAC <span style={{ color: "#64748b", fontSize: 10.5 }}>{t(E, "← scroll 2", "← 두루마리2")}</span></div>
              <div>1 3 6 12 <span style={{ color: "#64748b", fontSize: 10.5 }}>{t(E, "← friends", "← 친구번호")}</span></div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 110 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>pqpdppdd <span style={{ color: "#4ade80", fontSize: 10.5, fontWeight: 400 }}>{t(E, "← shapes", "← 모양들")}</span></div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "There are 2 scrolls and 4 friends, so the answer is 4 + 4 = 8 letters. The first 4 are scroll ABCA's answers, the next 4 are scroll BCAC's. Which shape each friend gets is what we work out next.",
              "두루마리가 2 개, 친구가 4 명이라 답은 4 + 4 = 8 글자예요. 앞 4 글자는 첫 두루마리 ABCA 의 답, 뒤 4 글자는 두 번째 두루마리 BCAC 의 답이에요. 친구마다 어떤 모양이 나오는지는 다음 쪽부터 알아봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Add letters to grow the grid, and tap a cookie to read its number.",
        "글자를 더해 격자를 키우고, 쿠키를 눌러 번호를 봐요."),
      content: <Mcc22BirthdayCookieSim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Your turn — grow the grid in your head, then read cookie #3.",
        "이번엔 직접 격자를 키워 보고 3번 쿠키를 읽어봐요."),
      question: t(E,
        "Grid [p]. Apply A, then B. What shape is cookie #3?",
        "격자 [p] 에 A 를 적용하고 B 를 적용해요. 3번 쿠키는 어떤 모양일까요?"),
      options: [
        t(E, "q", "q"),
        t(E, "p", "p"),
        t(E, "b", "b"),
      ],
      correct: 0,
      explain: t(E,
        "A gives [p p]; B appends a left↔right-flipped copy [q q], so the row is p p q q. Cookie #3 = q.",
        "A 가 [p p] 를 만들어요.\nB 는 좌우로 뒤집은 복사본 [q q] 를 붙여 p p q q 가 돼요.\n그래서 3번 쿠키는 q 예요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   [🐢 slow vs 🚀 fast plan] → [progressive code]
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22BirthdayCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The grid has 2^N cookies, so instead of building it, trace each queried number backward.",
        "쿠키가 2^N 개라 격자를 만들 수가 없어요.\n대신 물어본 번호 하나만 거꾸로 따라가요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: build the whole grid", "느림: 격자를 통째로 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "After N letters the grid holds 2^N cookies. N = 10000 means 2^10000 cookies — impossibly huge to store. Times out (or runs out of memory) instantly.",
                      "N 글자 뒤 격자에는 쿠키가 2^N 개 있어요. N = 10000 이면 쿠키가 2^10000 개라 저장할 수 없을 만큼 커요. 그래서 곧바로 시간 초과나 메모리 초과가 나요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: decode one number, walking backward", "빠름: 번호 하나를 거꾸로 따라가며 해독")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Turn the number into (row, col), then undo the scroll one letter at a time. If our spot came from a copy that B or C made, that copy was flipped — so flick a switch. Two switches, left↔right and up↔down, decide p/q/b/d. Just N steps per query.",
                      "번호를 (행, 열) 로 바꾼 뒤 두루마리를 한 글자씩 되돌려요. 우리 자리가 B 나 C 가 만든 복사본에서 왔으면 그 복사본은 뒤집힌 것이니 스위치를 하나 켜요. 좌우 스위치와 위아래 스위치, 이 둘만 세면 p/q/b/d 가 정해져요. 한 번 물을 때 N 단계면 끝나요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    /* 2-2: 거꾸로 따라가기를 손으로 한 번 (2026-09-17 에 새로 넣은 자리)
       여기가 없어서 계획 문단 두 개 다음에 바로 40줄 코드가 나왔다.
       이 문제에서 제일 어려운 절차를, 번호 하나로 끝까지 눈으로 따라간다. */
    {
      type: "reveal",
      narr: t(E,
        "Walk one cookie number backward, one letter at a time.",
        "쿠키 번호 하나를 글자 하나씩 거꾸로 따라가 봐요."),
      content: <Mcc22BirthdayBackwardWalkSim E={E} />,
    },
    // 2-3: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22BirthdaySections(E),
    },
  ];
}
