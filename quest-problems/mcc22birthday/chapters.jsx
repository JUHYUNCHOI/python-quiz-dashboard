import { C, t } from "@/components/quest/theme";
import { getMcc22BirthdaySections, Mcc22BirthdayCookieSim } from "./components";

const KA = { wordBreak: "keep-all" };
const NW = { whiteSpace: "nowrap" };

/* ================================================================
   SOLUTION CODE  (verified → pqpdppdd; see components.jsx FULL_PY)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    data = sys.stdin.read().split('\\n')",
  "    N, S, Q = map(int, data[0].split())",
  "    scrolls = [data[1 + i].strip() for i in range(S)]",
  "    friends = list(map(int, data[1 + S].split()))",
  "",
  "    CAP = 2 * 10**9",
  "    shape = {(0, 0): 'p', (1, 0): 'q', (0, 1): 'b', (1, 1): 'd'}",
  "    answer = []",
  "",
  "    for scroll in scrolls:",
  "        rows = [1] * (N + 1)",
  "        cols = [1] * (N + 1)",
  "        for i in range(1, N + 1):",
  "            if scroll[i - 1] in 'AB':",
  "                cols[i] = min(cols[i - 1] * 2, CAP)",
  "                rows[i] = rows[i - 1]",
  "            else:",
  "                rows[i] = min(rows[i - 1] * 2, CAP)",
  "                cols[i] = cols[i - 1]",
  "        width = cols[N]",
  "",
  "        for f in friends:",
  "            r = (f - 1) // width + 1",
  "            c = (f - 1) % width + 1",
  "            flip_h = flip_v = 0",
  "            for i in range(N, 0, -1):",
  "                if scroll[i - 1] in 'AB':",
  "                    if c > cols[i - 1]:",
  "                        c -= cols[i - 1]",
  "                        if scroll[i - 1] == 'B':",
  "                            flip_h ^= 1",
  "                else:",
  "                    if r > rows[i - 1]:",
  "                        r -= rows[i - 1]",
  "                        flip_v ^= 1",
  "            answer.append(shape[(flip_h, flip_v)])",
  "",
  "    print(''.join(answer))",
  "",
  "solve()",
];


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
        "Cats starts with one 'p'-shaped cookie and follows a scroll of letters. Each letter A/B/C copies the whole cookie grid — doubling it — sometimes flipping the copy. Friends eat cookies numbered left→right, top→bottom.",
        "Cats 는 'p' 모양 쿠키 한 개로 시작해서 두루마리의 글자를 따라가요. 글자 A/B/C 는 쿠키 격자 전체를 복사해 두 배로 늘리고, 때로는 복사본을 뒤집어요. 친구들은 왼→오, 위→아래 순으로 번호 매긴 쿠키를 먹어요."),
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
                  {t(E, "Read a scroll of letters. Each letter ", "글자 두루마리를 읽어요. 글자 하나가 ")}
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
                  {t(E, " (1, 2, 3, …).", " 순으로 1, 2, 3, … 번호를 매겨요.")}
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
        "Read the input format and the official example. The grid can grow to 2^N cookies, so friend numbers are given as plain 1-based indices — never as coordinates.",
        "입력 형식과 공식 예제를 봐요. 격자는 2^N 개까지 커질 수 있어서, 친구 번호는 좌표가 아니라 1부터 시작하는 순번 하나로 줘요."),
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
              <div>4 2 4</div>
              <div>ABCA</div>
              <div>BCAC</div>
              <div>1 3 6 12</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 110 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>pqpdppdd</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Scroll ABCA builds a 2×8 grid; friends 1,3,6,12 → p,q,p,d = \"pqpd\". Scroll BCAC → \"ppdd\". Together: \"pqpdppdd\".",
              "두루마리 ABCA 는 2×8 격자를 만들고, 친구 1,3,6,12 → p,q,p,d = \"pqpd\". 두루마리 BCAC → \"ppdd\". 합치면 \"pqpdppdd\".")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Grow the grid yourself. Add letters and watch it double + flip. Tap a cookie to read its number. Notice how fast it blows up.",
        "격자를 직접 키워봐요. 글자를 더하면 두 배로 늘고 뒤집혀요. 쿠키를 눌러 번호를 확인해요. 얼마나 빨리 커지는지 느껴봐요."),
      content: <Mcc22BirthdayCookieSim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Start: [p]. Apply A → [p p]. Apply B → the copy is flipped left↔right, so p becomes q: [p p q q]. Cookie #3 is the first of the flipped copy.",
        "시작: [p]. A 적용 → [p p]. B 적용 → 복사본은 좌우로 뒤집혀 p 가 q 로: [p p q q]. 3번 쿠키는 뒤집힌 복사본의 첫 칸이에요."),
      question: t(E,
        "Grid [p]. Apply A, then B. What shape is cookie #3?",
        "격자 [p]. A 를 적용하고 B 를 적용해요. 3번 쿠키의 모양은?"),
      options: [
        t(E, "q", "q"),
        t(E, "p", "p"),
        t(E, "b", "b"),
      ],
      correct: 0,
      explain: t(E,
        "A gives [p p]; B appends a left↔right-flipped copy [q q], so the row is p p q q. Cookie #3 = q.",
        "A → [p p]; B 는 좌우로 뒤집은 복사본 [q q] 를 붙여 p p q q. 3번 쿠키 = q."),
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
        "The slow way builds the whole grid, then reads the cookie at each number. But after N letters the grid is 2^N cookies — with N up to 10000 it can't fit in any memory. The fast way never builds it: it traces each queried number BACKWARD through the scroll.",
        "느린 방법은 격자를 전부 만들고 번호 위치의 쿠키를 읽어요. 하지만 N 글자 뒤 격자는 2^N 개 — N 이 최대 10000 이면 어떤 메모리에도 안 들어가요. 빠른 방법은 아예 만들지 않아요: 물어본 번호를 두루마리를 거꾸로 따라가며 추적해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: build the whole grid", "느림: 격자를 통째로 만들기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "After N letters the grid has 2^N cookies. N = 10000 means 2^10000 — impossibly huge to store. Times out (or runs out of memory) instantly.",
                      "N 글자 뒤 격자는 2^N 개. N = 10000 이면 2^10000 — 저장 불가능할 만큼 커요. 곧바로 시간 초과(또는 메모리 초과).")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: decode one number, walking backward", "빠름: 번호 하나를 거꾸로 따라가며 해독")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Turn the number into (row, col), then undo the scroll step by step. Each copy step is a flip, so track two on/off flips — that alone decides p/q/b/d. Just N steps per query.",
                      "번호를 (행, 열) 로 바꾼 뒤 두루마리를 한 단계씩 되돌려요. 복사 단계마다 뒤집힘이 생기니 좌우·상하 두 스위치만 추적하면 p/q/b/d 가 정해져요. 한 번 물음에 N 단계면 끝.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc22BirthdaySections(E),
    },
  ];
}
