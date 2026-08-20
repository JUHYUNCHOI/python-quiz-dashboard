import { C, t } from "@/components/quest/theme";
import { getMcc22AliensSections, AliensCountSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (fast: decode each claim → count supply vs demand)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    T = int(data[idx]); idx += 1",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(data[idx]); idx += 1",
  "        a = data[idx]; idx += 1",
  "        b = data[idx]; idx += 1",
  "        need_T = 0; have_T = 0",
  "        for i in range(n):",
  "            if a[i] == 'T':",
  "                have_T += 1",
  "                req = b[i]",
  "            else:",
  "                req = 'F' if b[i] == 'T' else 'T'",
  "            if req == 'T':",
  "                need_T += 1",
  "        out.append('YES' if need_T == have_T else 'NO')",
  "    print('\\n'.join(out))",
  "main()",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
     1-1  title + 🎯 mission + 📖 problem
     1-2  📥 input + official sample card
     1-3  concept sim (supply vs demand counting)
     1-4  understanding quiz
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22AliensCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Each alien has a real type — T (truth-teller) or F (liar) — given by the string a. There is also a list of claims b. We may hand out the claims to the aliens in ANY order.\nDecide whether SOME order makes every claim consistent — print YES or NO.",
        "각 외계인은 진짜 타입이 있어요 — T (진실) 또는 F (거짓말쟁이) — 문자열 a 로 주어져요. 그리고 주장 목록 b 도 있어요. 주장은 외계인들에게 어떤 순서로든 나눠줄 수 있어요.\n어떤 순서든 하나라도 모든 주장을 맞게 만들 수 있는지 판단해서 YES 또는 NO 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"👽"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>Aliens</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Decide if SOME way of handing out the claims makes them all consistent. Print YES or NO.",
                "주장을 나눠주는 어떤 방법이든 하나라도 모두 일관되게 만들 수 있는지 판단해요. YES 또는 NO 를 출력.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "String ", "문자열 ")}
                  <b style={{ color: "#2563eb" }}>a</b>
                  {t(E, " gives each alien's real type: ", " 는 각 외계인의 진짜 타입: ")}
                  <b style={{ color: "#15803d" }}>T</b>{t(E, " = truth-teller, ", " = 진실, ")}<b style={{ color: "#991b1b" }}>F</b>{t(E, " = liar.", " = 거짓말쟁이.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "String ", "문자열 ")}
                  <b style={{ color: "#7c3aed" }}>b</b>
                  {t(E, " is the list of claims. We may assign the claims to the aliens in ", " 는 주장 목록. 주장은 외계인들에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "any order (a permutation)", "어떤 순서로든 (순열)")}</b>
                  {t(E, ".", " 나눠줄 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if some assignment makes every claim consistent, else NO", "어떤 배정이든 하나라도 모든 주장을 일관되게 만들면 YES, 아니면 NO")}</b>
                  {t(E, ".", ".")}
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
        "Read the input format and the official example. There are T test cases. Each gives n, then the type string a, then the claim string b. The output is one YES/NO per test.",
        "입력 형식과 공식 예제를 봐요. 테스트가 T 개 있어요. 각 테스트는 n, 타입 문자열 a, 주장 문자열 b 를 줘요. 출력은 테스트마다 YES/NO 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>T</b> — {t(E, "number of test cases", "테스트 개수")}</div>
              <div>• <b>n</b> — {t(E, "number of aliens in this test", "이 테스트의 외계인 수")}</div>
              <div>• <b>a</b> — {t(E, "real types, a string of T/F (length n)", "진짜 타입, T/F 로 된 문자열 (길이 n)")}</div>
              <div>• <b>b</b> — {t(E, "the claims, a string of T/F (length n)", "주장 목록, T/F 로 된 문자열 (길이 n)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 20, 1 ≤ n ≤ 10000, sum of n ≤ 65000. Output YES/NO (uppercase) per test.", "제약: 1 ≤ T ≤ 20, 1 ≤ n ≤ 10000, n 의 합 ≤ 65000. 테스트마다 YES/NO (대문자) 출력.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>3</div>
              <div>4</div>
              <div>TFTF</div>
              <div>FTTF</div>
              <div>2</div>
              <div>TF</div>
              <div>TT</div>
              <div>2</div>
              <div>TT</div>
              <div>TF</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>YES</div>
              <div style={{ fontWeight: 800 }}>NO</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "In the third test, a=TT (two truth-tellers) but b=TF: no matter how you hand out the claims, the counts can't line up — NO.",
              "세 번째 테스트는 a=TT (진실 둘) 인데 b=TF: 주장을 어떻게 나눠줘도 개수가 맞지 않아 — NO.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the rule. Each claim, once decoded through its speaker's honesty, DEMANDS a T or an F. A valid order exists exactly when the demand for T's equals the supply of T's. Toggle the claims and watch the verdict flip.",
        "규칙을 직접 느껴봐요. 각 주장은 말하는 이의 정직함으로 해독하면 T 또는 F 를 요구해요. 유효한 순서는 T 의 수요가 T 의 공급과 같을 때만 존재. 주장을 눌러 바꾸며 판정이 뒤집히는 걸 봐요."),
      content: <AliensCountSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "A truth-teller (T) repeats a claim as-is; a liar (F) flips it. So a claim 'F' spoken by a liar really demands a 'T'.",
        "진실쟁이 (T) 는 주장을 그대로, 거짓말쟁이 (F) 는 뒤집어요. 그래서 거짓말쟁이가 말한 'F' 는 사실 'T' 를 요구해요."),
      question: t(E,
        "The verdict is YES exactly when...",
        "판정이 YES 가 되는 정확한 조건은...?"),
      options: [
        t(E, "the number of demanded T's equals the number of real T's in a", "요구된 T 의 수 = a 안의 진짜 T 의 수"),
        t(E, "the claim string b equals the type string a", "주장 문자열 b 가 타입 문자열 a 와 같을 때"),
        t(E, "every alien is a truth-teller", "모든 외계인이 진실쟁이일 때"),
      ],
      correct: 0,
      explain: t(E,
        "Right. Decode each claim to the type it demands, count the demanded T's, and compare to how many real T's exist. Equal supply and demand → a valid order exists → YES.",
        "맞아요. 각 주장을 요구하는 타입으로 해독해서 요구된 T 의 수를 세고, 진짜 T 의 수와 비교해요. 공급과 수요가 같으면 → 유효한 순서 존재 → YES."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
     2-1  slow (try every permutation) vs fast (count supply/demand)
     2-2  progressive code
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22AliensCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every order of handing out the claims: n! permutations — hopeless even for small n. The fast way notices it's just counting: decode each claim to a demanded type, then check that demand for T equals supply of T.",
        "느린 방법은 주장을 나눠주는 모든 순서를 시도해요: n! 개의 순열 — 작은 n 에서도 가망 없음. 빠른 방법은 그냥 개수 세기임을 알아채요: 각 주장을 요구 타입으로 해독한 뒤, T 수요가 T 공급과 같은지 확인."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every order of the claims", "느림: 주장의 모든 순서를 시도")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "n! permutations. For n = 10000 that's astronomically huge. Times out instantly.", "n! 개의 순열. n = 10000 이면 천문학적. 즉시 시간 초과.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count supply vs demand", "빠름: 공급 vs 수요 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "One pass over the string: decode each claim to the type it demands, count demanded T's and real T's, compare. O(n).", "문자열 한 번 훑기: 각 주장을 요구 타입으로 해독하고, 요구된 T 와 진짜 T 를 세서 비교. O(n).")}
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
      sections: getMcc22AliensSections(E),
    },
  ];
}
