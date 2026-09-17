import { C, t } from "@/components/quest/theme";
import { getMcc22AliensSections, AliensCountSim } from "./components";

const KA = { wordBreak: "keep-all" };

/* 2026-09-11: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도 import 되지
   않는 죽은 복제본이었다(저장소 67곳 중 실제로 쓰는 건 3곳뿐).
   살아 있는 코드는 components.jsx 의 단계별 배열이다. 둘을 같이 두면 조용히 어긋난다 —
   실제로 오늘 입출력 방식을 고칠 때 이쪽만 옛 모양으로 남아 검사기에 걸렸다. */

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
     1-1  title + 🎯 mission + 📖 problem
     1-2  📥 input + official sample card
     1-3  concept sim (supply vs demand counting)
     1-4  understanding quiz
     1-5  hand-computed input (count the demanded T's)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22AliensCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Can every sentence hold even though we lost who pointed at whom?",
        "누가 누구를 지목했는지 몰라도 모든 말이 맞을 수 있을까요?"),
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
                "Decide if SOME way of choosing who pointed at whom makes every sentence consistent. Print YES or NO.",
                "누가 누구를 지목했는지 잘 정해서 모든 말을 앞뒤 맞게 만들 수 있는지 가려내요. 만들 수 있으면 YES, 없으면 NO 를 출력해요.")}
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
                  {t(E, " gives each alien's real type. ", " 는 각 외계인의 진짜 타입이에요. ")}
                  <b style={{ color: "#15803d" }}>T</b>{t(E, " always tells the truth, ", " 는 늘 진실만 말하고, ")}<b style={{ color: "#991b1b" }}>F</b>{t(E, " always lies.", " 는 늘 거짓말을 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Alien ", "")}
                  <b style={{ color: "#2563eb" }}>i</b>
                  {t(E, " said: \"Alien ", " 번 외계인이 말했어요 — \"")}
                  <b style={{ color: "#dc2626" }}>p<sub>i</sub></b>
                  {t(E, " is of type ", " 번은 ")}
                  <b style={{ color: "#7c3aed" }}>b<sub>i</sub></b>
                  {t(E, "\". ", " 타입이야\". ")}
                  <b style={{ color: "#7c3aed" }}>b</b>
                  {t(E, " is written per speaker, so we already know it. ", " 는 누가 말했는지에 맞춰 적혀 있어서 그대로 알 수 있어요. ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "p — who pointed at whom — is what we lost", "잃어버린 건 p, 누가 누구를 지목했는지")}</b>
                  {t(E, ".", "예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>p</b>
                  {t(E, " points every alien at exactly one alien, and each alien is pointed at exactly once. That kind of list is called a permutation. ",
                       " 에서는 모든 외계인이 정확히 한 번씩 지목돼요. 이런 줄을 순열이라고 불러요. ")}
                  {t(E, "p", "p")}<sub>i</sub>{t(E, " = i is allowed too — an alien may point at itself.", " = i 도 돼요. 자기 자신을 지목해도 괜찮아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if some p makes every sentence consistent, else NO", "모든 말이 앞뒤 맞는 p 가 하나라도 있으면 YES, 아니면 NO")}</b>
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
        "Read the input format together with the official example.",
        "입력 형식과 공식 예제를 같이 살펴봐요."),
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
              <div>• <b>b</b> — {t(E, "what each alien said: b[i] is the type alien i claimed about their target (length n)", "각자가 말한 내용이에요. b[i] 는 i 번이 지목한 상대에게 붙인 타입이에요 (길이 n)")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ T ≤ 20, 1 ≤ n ≤ 10000, sum of n ≤ 65000. Output YES/NO (uppercase) per test.", "T 는 1~20, n 은 1~10000 이고 n 을 다 더해도 65000 까지예요. 테스트마다 YES/NO 를 대문자로 출력해요.")}
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
            {/* 2026-09-17: 여기서 "개수가 맞지 않아" 라고 결론을 먼저 말하고 있었다.
                세는 이야기는 바로 다음 쪽 시뮬이 할 일이다. 형식 쪽은 형식만 말한다. */}
            {t(E,
              "Only the third test answers NO. There a=TT and b=TF, and no choice of who points at whom makes every sentence hold. The next page lets you find out why for yourself.",
              "세 번째 테스트만 답이 NO 예요. a=TT 이고 b=TF 인데, 어떻게 지목해도 모든 말을 앞뒤 맞게 만들 수 없어요. 왜 안 되는지는 다음 쪽에서 직접 찾아봐요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Toggle the claims and watch when the verdict flips.",
        "주장을 눌러 바꾸면 판정이 어떻게 뒤집히는지 봐요."),
      content: <AliensCountSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Check the rule you just found in the sim.",
        "방금 시뮬에서 찾은 규칙을 확인해 봐요."),
      question: t(E,
        "The verdict is YES exactly when...",
        "판정이 YES 가 되는 정확한 조건은...?"),
      options: [
        t(E, "the number of needed T's equals the number of real T's in a", "필요한 T 의 수 = a 안에 있는 진짜 T 의 수"),
        t(E, "the claim string b equals the type string a", "주장 문자열 b 가 타입 문자열 a 와 같을 때"),
        t(E, "every alien is a truth-teller", "모든 외계인이 진실쟁이일 때"),
      ],
      correct: 0,
      explain: t(E,
        "Right. Turn each claim into the type its target needs, count the needed T's, and compare with how many real T's exist. Same number → a valid order exists → YES.",
        "맞아요. 각 주장을 '상대에게 필요한 타입' 으로 바꿔서 필요한 T 가 몇 개인지 세고, 있는 T 의 개수와 비교해요. 둘이 같으면 지목 순서를 짤 수 있으니 YES 예요."),
    },

    /* 2026-09-17: 이 묶음에서 유일하게 손으로 세어 보는 칸이 비어 있었다.
       "관찰 → 퀴즈 → 직접 계산 → 코드" 사다리의 한 칸을 채운다. */
    // 1-5: hand-computed input
    {
      type: "input",
      narr: t(E,
        "Now count it yourself.",
        "이번엔 직접 세어 봐요."),
      question: t(E,
        "a = TFTF, b = TFTT. How many T's are needed?",
        "a = TFTF, b = TFTT 일 때 필요한 T 는 몇 개일까요?"),
      hint: t(E,
        "A truth-teller (T) needs b as-is; a liar (F) needs the opposite of b. Write the four needed types left to right, then count the T's.",
        "진실쟁이(T)가 말하면 b 그대로가 필요하고,\n거짓말쟁이(F)가 말하면 b 를 뒤집은 게 필요해요.\n네 자리를 왼쪽부터 하나씩 적어 보고 T 를 세요."),
      answer: 3,
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
        "Don't search every order — just count the T's.",
        "지목 순서를 다 뒤지지 말고 T 의 개수만 세어 봐요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: try every p (who points at whom)", "느린 방법 — 지목 순서 p 를 전부 시도하기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "There are n! orders. At n = 10 that is already 3.62 million, and n goes up to 10000. Trying them all is impossible.", "지목 순서는 n! 가지예요. n 이 10 일 때 벌써 362만 가지고, n 은 10000 까지 가요. 전부 해 보는 건 불가능해요.")}
              </div>
            </div>
            <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                🚀 {t(E, "Fast: count the T's needed and the T's that exist", "빠른 방법 — 필요한 T 와 있는 T 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "One pass over the string: turn each claim into the type it needs, count the needed T's and the real T's, compare. O(n).", "문자열을 한 번만 훑으면 돼요. 각 주장에 필요한 타입을 구하고, 필요한 T 와 있는 T 를 세서 비교해요. O(n) 이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
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
