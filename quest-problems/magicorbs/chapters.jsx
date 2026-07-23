import { C, t } from "@/components/quest/theme";
import { getMagicOrbsSections, MagicOrbsDeepAuditSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "vals = list(map(int, input().split()))",
  "",
  "# Sort values in descending order",
  "vals.sort(reverse=True)",
  "",
  "# Pick the top K orbs for maximum sum",
  "ans = sum(vals[:K])",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N magical orbs, each with a power value p[i]. You may pick AT MOST K orbs.\nPrint the MAXIMUM total power achievable.",
        "N 개의 마법 구슬이 있고, 각자 파워 p[i] 를 가져요. 최대 K 개를 고를 수 있어요.\n달성 가능한 총 파워의 최댓값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd2e"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Magical Orbs</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P3</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#ede9fe", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Pick at most K orbs to maximize total power \u2014 output that maximum.",
                "\ucd5c\ub300 K \uac1c\uc758 \uad6c\uc2ac\uc744 \uace8\ub77c \ucd1d \ud30c\uc6cc\ub97c \ucd5c\ub300\ud654 \u2014 \uadf8 \ucd5c\ub313\uac12\uc744 \ucd9c\ub825.")}
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N magical orbs", "N 개의 마법 구슬")}</b>
                  {t(E, " with powers ", " 이 있고, 파워 ")}
                  <code style={{ background: "#ede9fe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>p[i]</code>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You may pick ", "최대 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "AT MOST K orbs", "K 개의 구슬")}</b>
                  {t(E, ".", " 을 고를 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum total power achievable", "총 파워의 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: 입출력 형식 (예제 [5,3,4] pick 2 → 9)
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? Line 1: N and K. Line 2: the N orb powers. Output: one integer — the biggest total.",
        "데이터는 어떻게 들어올까? 1줄: N 과 K. 2줄: N 개의 구슬 파워. 출력: 정수 하나 — 가장 큰 총 파워."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line) — number of orbs, and how many you may pick", "(첫 줄) — 구슬 개수, 그리고 고를 수 있는 개수")}</span></div>
              <div style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid #fde68a` }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>p<sub>1</sub> p<sub>2</sub> … p<sub>N</sub></span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— the N orb powers", "— N 개 구슬의 파워")}</span></div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single integer — the maximum total power from picking at most K orbs.",
                  "정수 하나 — 최대 K 개를 골랐을 때의 총 파워 최댓값.")}
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.55, color: "#f8fafc" }}>
                <div>3 2</div>
                <div>5 3 4</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac" }}>
                <div>9</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "Pick the 2 strongest of [5, 3, 4] — that's 5 + 4 = 9.",
                "[5, 3, 4] 중 가장 센 2 개 — 5 + 4 = 9.")}
          </div>
        </div>),
    },
    // 1-3: Deep-audit sim — feel the algorithm before guessing
    {
      type: "reveal",
      narr: t(E,
        "Time to feel it. Pick a sample, slide K up and down, watch which orbs light up and the total grow. Then 'Audit all K' to see every K at once — bigger K never hurts.",
        "직접 느껴봐. 샘플을 골라 K 를 올렸다 내렸다, 어떤 구슬이 빛나고 총합이 어떻게 자라는지 봐. 'K 모두 점검' 누르면 모든 K 가 한눈에 — K 가 커지면 절대 손해 안 봐."),
      content: (
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
            🔍 {t(E, "Deep Audit — sort, then take the top K", "심층 점검 — 정렬 후 앞에서 K 개")}
          </div>
          <MagicOrbsDeepAuditSim E={E} />
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Orbs with values [5, 3, 4], pick 2. Which two should you pick?", "구슬 값이 [5, 3, 4]이고 2개를 골라야 해요. 어떤 두 개를 골라야 할까?"),
      question: t(E,
        "Values [5, 3, 4], pick 2. Best choice?",
        "값 [5, 3, 4], 2개 선택. 최선의 선택은?"),
      options: [
        t(E, "5 and 3 (sum = 8)", "5와 3 (합 = 8)"),
        t(E, "5 and 4 (sum = 9)", "5와 4 (합 = 9)"),
        t(E, "3 and 4 (sum = 7)", "3과 4 (합 = 7)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Pick the two largest values: 5 + 4 = 9.",
        "맞아! 가장 큰 두 값을 골라: 5 + 4 = 9."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Same orbs [5, 3, 4], pick 2 — your turn.  What's the biggest sum you can get?",
        "같은 구슬 [5, 3, 4], 2 개 — 직접 골라봐. 가장 큰 합?"),
      question: t(E,
        "Values [5, 3, 4], K=2. Maximum total power?",
        "값 [5, 3, 4], K=2. 최대 총 파워?"),
      hint: t(E,
        "Pick the largest values you can — how many of them?",
        "큰 값들을 골라 — 몇 개까지?"),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMagicOrbsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Sort powers descending, sum the first K.  Sections build it one piece at a time.",
        "파워 내림차순 정렬, 앞에서 K 개 합. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMagicOrbsSections(E),
    },
  ];
}
