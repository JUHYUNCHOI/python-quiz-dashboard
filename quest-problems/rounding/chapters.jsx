import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

/* ================================================================
   HELPERS
   ================================================================ */
export const pw = p => Math.pow(10, p);
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const sup = n => String(n).split("").map(c => SUP[+c]).join("");

export function posName(pos, E) {
  if (pos === 1) return E ? "ones" : "1의자리";
  if (pos === 2) return E ? "tens" : "10의자리";
  if (pos === 3) return E ? "hundreds" : "100의자리";
  if (pos === 4) return E ? "thousands" : "1000의자리";
  return `10${sup(pos - 1)}`;
}

export function calcBessie(x) {
  const s = String(x), len = s.length, top = +s[0];
  return top >= 5 ? pw(len) : 0;
}

export function calcElsie(x) {
  const s = String(x), len = s.length;
  let cur = x;
  for (let pos = 1; pos <= len; pos++) {
    const d = Math.floor(cur / pw(pos - 1)) % 10;
    if (d >= 5) cur += pw(pos);
    cur = Math.floor(cur / pw(pos)) * pw(pos);
  }
  return cur;
}

/* ================================================================
   CHAPTER DATA
   Step types: "reveal" | "quiz" | "input" | "runner" | "code" | "compare3"
   ================================================================ */

// --- Sim case list (used by RoundingApp) ---
export const SIM_CASES = [
  { num: 48, diff: true }, { num: 67, diff: false }, { num: 38, diff: false },
  { num: 445, diff: true }, { num: 435, diff: false }, { num: 4459, diff: true },
];

// ═══════════════════════════════════════════════
// Chapter 1: 📋 Problem Introduction (5 steps)
// ═══════════════════════════════════════════════
export function makeCh1(E) {
  return [
    // 1-1: 문제 설명 + 구체 예시 (x=48). 타이틀/USACO 메타는 breadcrumb 와 중복이라 제거.
    { type: "reveal", narr: t(E, "Two cows (Bessie and Elsie) have different rounding methods. The same number can give different answers — and we count how many such numbers exist.", "두 소 (Bessie 와 Elsie) 의 반올림 방식이 서로 달라서, 같은 수에 대해 답이 다르게 나올 수 있어요. 그런 수가 몇 개인지 세는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 구체 예시 — x=48 */}
          <div style={{ background: "#fff7ed", border: `2px solid #fdba74`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", marginBottom: 8 }}>📌 {t(E, "Example", "예시")}</div>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: C.dim }}>{t(E, "Round ", "수 ")}</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>48</span>
              <span style={{ fontSize: 13, color: C.dim }}>{t(E, " — what do they say?", " 을 두 소 (Bessie 와 Elsie) 가 반올림하면?")}</span>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <div style={{ flex: 1, background: C.bessieBg, border: `2px solid ${C.bessieBd}`, borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 26 }}>🐄</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.bessie, fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>Bessie</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.bessie, fontFamily: "'JetBrains Mono',monospace" }}>0</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: C.no, fontWeight: 900 }}>≠</div>
              <div style={{ flex: 1, background: C.elsieBg, border: `2px solid ${C.elsieBd}`, borderRadius: 10, padding: "12px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 26 }}>🐮</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.elsie, fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>Elsie</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.elsie, fontFamily: "'JetBrains Mono',monospace" }}>100</div>
              </div>
            </div>
            <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: "#c2410c", fontWeight: 700 }}>
              {t(E, "Same number, different answers!", "같은 48 인데 답이 달라요!")}
            </div>
          </div>

          {/* 우리가 풀 문제 */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.accent, marginBottom: 6 }}>❓ {t(E, "Our task", "우리가 풀 문제")}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>
              {t(E, "Given N, count how many numbers between 2 and N have ", "N 이 주어지면, 2 부터 N 까지 수 중에서 ")}
              <strong style={{ color: C.no }}>{t(E, "different Bessie/Elsie answers", "두 소 (Bessie 와 Elsie) 의 답이 다른 수")}</strong>
              {t(E, ".", " 가 몇 개인지 세요.")}
            </div>
          </div>
        </div>
      ),
    },
    // 1-2: 입력 / 출력 / 예시 (이해 우선)
    { type: "reveal", narr: t(E, "Input is one number N. Output is the count of numbers in 2..N where Bessie and Elsie disagree.", "입력은 숫자 N 하나. 출력은 2 부터 N 까지 중에서 Bessie 와 Elsie 의 답이 다른 수의 개수예요."),
      content: (
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.8 }}>
          {/* 입력 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace" }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: C.accent }}>N</span>
              <span style={{ fontSize: 12, color: C.dim, marginLeft: 8 }}>{t(E, "(1 ~ 10⁹)", "(1 부터 10⁹ 까지)")}</span>
            </div>
          </div>

          {/* 출력 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
                {t(E, "Among ", "")}
                <strong style={{ fontFamily: "'JetBrains Mono',monospace" }}>2, 3, …, N</strong>
                {t(E, ", how many give different answers from ", " 중에서, ")}
                <strong style={{ color: C.bessie }}>Bessie</strong>
                {t(E, " and ", " 와 ")}
                <strong style={{ color: C.elsie }}>Elsie</strong>
                {t(E, "?", " 의 답이 다른 수의 개수")}
              </div>
            </div>
          </div>

          {/* 구체 예시 */}
          <div style={{ background: "#fff7ed", border: `2px solid #fdba74`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", marginBottom: 8 }}>📌 {t(E, "Example", "예시")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2, color: C.text }}>
              <div>{t(E, "Input:", "입력:")}  <strong>N = 100</strong></div>
              <div>{t(E, "Output:", "출력:")} <strong style={{ color: "#c2410c", fontSize: 18 }}>5</strong></div>
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.6 }}>
              {t(E, "→ Among 2~100, Bessie and Elsie disagree on 5 numbers (we'll see which ones later).",
                  "→ 2 부터 100 사이 수 중에서, 두 답이 다른 수가 5 개라는 뜻이에요. (어떤 5 개인지는 뒤에서!)")}
            </div>
          </div>
        </div>
      ),
    },
    // 1-2b: P 의 조건 → 관찰 → 발견 (자릿수)
    { type: "reveal", narr: t(E, "Finding P is the key for this problem. So what's the condition for P? Let's observe.", "이 문제는 P 를 구하는 게 핵심이에요. 그럼 P 의 조건은 뭘까요? 함께 관찰해봐요."),
      content: (
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.85 }}>
          {/* 1단계: P 의 조건 */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.accent, marginBottom: 8 }}>
              📐 {t(E, "P's condition", "P 의 조건")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>
              10<sup>P</sup> &gt; x
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>
              {t(E, "(smallest such P)", "(을 만족하는 가장 작은 P)")}
            </div>
          </div>

          {/* 2단계: 관찰 표 */}
          <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 4 }}>
            🔍 {t(E, "Calculate P for a few x — look closely", "🔍 몇 개 x 로 P 계산해보기 — 자세히 관찰")}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            {[
              { x: 7,    d: 1, calc: "10¹=10 > 7" },
              { x: 48,   d: 2, calc: "10²=100 > 48" },
              { x: 445,  d: 3, calc: "10³=1000 > 445" },
              { x: 4459, d: 4, calc: "10⁴=10000 > 4459" },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 14px", marginBottom: 4, borderRadius: 8,
                background: "#f8f9fc", border: `1.5px solid ${C.border}`,
              }}>
                <span style={{ fontWeight: 800, color: C.text, minWidth: 50 }}>{row.x}</span>
                <span style={{ color: C.dim, fontSize: 11 }}>{row.calc}</span>
                <span style={{ fontWeight: 800, color: C.accent }}>P = {row.d}</span>
              </div>
            ))}
          </div>

          {/* 3단계: 발견 — 자릿수! */}
          <div style={{ background: "#fef3c7", border: `2px solid #fcd34d`, borderRadius: 10, padding: 12, marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "#a16207", fontWeight: 700, lineHeight: 1.7 }}>
              💡 {t(E, "Discovery! Looking carefully, you'll notice ", "발견! 자세히 관찰하다 보면, ")}
              <strong style={{ fontSize: 14 }}>P = {t(E, "the digit count of x", "x 의 자릿수")}</strong>
              {t(E, ".", " 라는 걸 알 수 있어요.")}
            </div>
          </div>
        </div>
      ),
    },
    // 1-3: Two methods
    { type: "reveal", narr: t(E, "Two different rounding methods!", "Bessie와 Elsie가 반올림하는 방법이 서로 달라! 누가 맞을까?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: C.bessieBg, borderRadius: 14, padding: "14px 10px", border: `2px solid ${C.bessieBd}` }}>
              <div style={{ fontSize: 32, textAlign: "center" }}>🐄</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: C.bessie, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>Bessie</div>
              <div style={{ fontSize: 12, color: C.bessie, marginTop: 8, lineHeight: 1.8, fontWeight: 600 }}>
                {E ? <>P-th digit only.<br /><strong>Just once!</strong></> : <>P번째 자리만 보고<br /><strong>딱 한 번</strong> 반올림!</>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 18, fontWeight: 900, color: C.dimLight }}>VS</div>
            <div style={{ flex: 1, background: C.elsieBg, borderRadius: 14, padding: "14px 10px", border: `2px solid ${C.elsieBd}` }}>
              <div style={{ fontSize: 32, textAlign: "center" }}>🐮</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: C.elsie, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>Elsie</div>
              <div style={{ fontSize: 12, color: C.elsie, marginTop: 8, lineHeight: 1.8, fontWeight: 600 }}>
                {E ? <>1st → 2nd → … → P-th<br /><strong>Step by step!</strong></> : <>1번째 → P번째까지<br /><strong>순서대로</strong> 반올림!</>}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // 1-4: Example 48 — 인라인 시뮬 (직접 단계별 클릭)
    { type: "reveal", narr: t(E, "Example: x=48. Click → to step through Bessie's and Elsie's reasoning.",
                                "예시: x=48. 아래에서 → 버튼을 눌러가며 Bessie / Elsie 의 과정을 단계별로 따라가봐요."),
      content: (
        <div style={{ padding: 12 }}>
          <InlineSim x={48} E={E} />
        </div>
      ),
    },

    // 1-5: 다른 숫자도 — 6 가지 케이스 비교
    { type: "reveal", narr: t(E,
      "48 isn't the only one. Try other numbers: some agree, some disagree. Spot anything?",
      "48 만 그런 게 아니에요. 다른 숫자도 골라봐요. ✅ 같은 것도 있고 ❌ 다른 것도 있어요. 뭔가 보이나요?"),
      content: (
        <div style={{ padding: 12 }}>
          <Multi6Sim E={E} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.accentBg, border: `1.5px dashed ${C.accentBd}`, borderRadius: 10, fontSize: 12, color: C.accent, fontWeight: 700, textAlign: "center", lineHeight: 1.6 }}>
            🔍 {t(E, "Notice: ❌ ones (48, 445, 4459) all start with 4. Coincidence?",
                  "관찰: ❌ 인 수 (48, 445, 4459) 는 모두 4 로 시작해요. 우연일까요?")}
          </div>
        </div>
      ),
    },
    // 1-5: Goal
    { type: "reveal", narr: t(E, "Goal: among 2 to N, count x where Bessie ≠ Elsie!", "목표: 2부터 N까지 수 중에서, Bessie랑 Elsie의 답이 다른 수가 몇 개인지 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: "linear-gradient(135deg,#4f46e5,#6366f1)", borderRadius: 16, padding: "20px 16px", boxShadow: "0 4px 20px rgba(79,70,229,.3)" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", fontWeight: 700, marginBottom: 6 }}>{t(E, "Find", "구해야 하는 것")}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.6 }}>
              {E ? <>Among 2 ≤ x ≤ N,<br />how many give<br />different answers?</> : <>2부터 N까지 수 중<br />Bessie와 Elsie의 답이<br /><u>다른 수</u>는 몇 개?</>}
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: C.dim }}>T {t(E, "test cases", "개 테스트케이스")}, N ≤ 10⁹</div>
        </div>
      ),
    },
    // 1-6: 구체적 예시 — N=100
    { type: "reveal", narr: t(E, "Concrete example: N=100. Check x=2,3,...,100 (99 values total). Answer is 5.", "구체적 예시: N=100이면 x=2부터 100까지 (총 99개) 모두 확인. 답은 5개!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div style={{ background: C.accentBg, borderRadius: 10, padding: 12, marginBottom: 10, border: `1.5px solid ${C.accentBd}` }}>
              <div style={{ fontWeight: 800, color: C.accent, marginBottom: 6 }}>{t(E, "N = 100", "N = 100")}</div>
              <div style={{ fontSize: 12, color: C.text }}>{t(E, "Check x = 2, 3, 4, ..., 100 (99 numbers)", "x = 2, 3, 4, ..., 100 (총 99 개) 검사")}</div>
            </div>
            <div style={{ background: C.noBg, borderRadius: 10, padding: 12, border: `1.5px solid ${C.noBd}` }}>
              <div style={{ fontWeight: 800, color: C.no, marginBottom: 6 }}>{t(E, "Different answers (5):", "결과가 다른 수 (5개):")}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.no, textAlign: "center" }}>45, 46, 47, 48, 49</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
              {t(E, "Other 94 numbers (2~44, 50~100): both give same result, so not counted.", "나머지 94개 (2~44, 50~100): 두 사람 결과 같음 → 카운트 X")}
            </div>
          </div>
        </div>
      ),
    },
  ];
}


// ═══════════════════════════════════════════════
// Chapter 2: 🔄 Simulator (dynamic steps)
// ═══════════════════════════════════════════════
export function buildSimSteps(x, E) {
  const s = String(x), len = s.length, digits = s.split("").map(Number);
  const top = digits[0], bResult = top >= 5 ? pw(len) : 0;
  const pn = p => posName(p, E);
  const steps = [];

  // Find P
  steps.push({ phase: "findP", narr: t(E, `Find P for ${x}!`, `${x}에서 P를 찾자!`), pList: [], pFound: -1, number: x });
  for (let p = 1; p <= len; p++) {
    const v = pw(p), ok = v >= x;
    steps.push({
      phase: "findP",
      narr: ok ? `10${sup(p)}=${v} ≥ ${x} → P=${p}!` : `10${sup(p)}=${v}… ${t(E, "too small!", "작다!")}`,
      pList: Array.from({ length: p }, (_, i) => ({ p: i + 1, v: pw(i + 1), ok: pw(i + 1) >= x })),
      pFound: ok ? p : -1, number: x,
    });
    if (ok) break;
  }

  // Explain P
  steps.push({
    phase: "findP_explain", number: x, P: len,
    possibleResults: [0, pw(len)], digits,
    narr: t(E, `P=${len} → round to 10${sup(len)}! Result is 0 or ${pw(len)}.`, `P=${len} → 10${sup(len)}로 반올림! 결과는 0 또는 ${pw(len)}.`),
  });

  // Bessie
  steps.push({ phase: "splash", who: "bessie",
    method: t(E, `P=${len}\nCheck ${pn(len)}\njust once!`, `P=${len}이니까\n${pn(len)}(P번째 자리)만\n딱 한 번 확인!`),
  });
  steps.push({ phase: "bessie", narr: t(E, `Bessie! Look at ${pn(len)}.`, `Bessie! P번째 자리(${pn(len)})를 보자.`),
    digits, focusIdx: 0, bubble: "👀", bubbleType: "look", resultVal: null });
  steps.push({ phase: "bessie",
    narr: top >= 5 ? t(E, `${top}≥5 → round up!`, `${top}≥5 → 올린다!`) : t(E, `${top}<5 → round down.`, `${top}<5 → 버린다.`),
    digits, focusIdx: 0,
    bubble: top >= 5 ? t(E, "≥5\nUp!", "≥5\n올린다!") : t(E, "<5\nDown", "<5\n패스"),
    bubbleType: top >= 5 ? "carry" : "dim", resultVal: null,
  });
  steps.push({ phase: "bessie_result", narr: t(E, "Bessie's result…", "Bessie의 결과는…"), result: bResult, number: x });

  // Elsie
  steps.push({ phase: "splash", who: "elsie",
    method: t(E, `10¹→10²→…→10${sup(len)}\nStep by step!`, `10¹→10²→…→10${sup(len)}\n순서대로 반올림!`),
  });
  steps.push({ phase: "elsie", narr: t(E, "Elsie's turn! Start from 1st.", "Elsie 차례! 1번째부터 올라가자."),
    digits, focusIdx: -1, bubble: "", bubbleType: "look", resultVal: null, bRef: bResult });

  let cur = x, curD = [...digits];
  for (let pos = 1; pos <= len; pos++) {
    const idx = curD.length - pos, dd = curD[idx], up = dd >= 5;
    steps.push({ phase: "elsie", narr: t(E, `Step ${pos}/${len}: ${pn(pos)}=${dd}`, `${pos}/${len}단계: ${pn(pos)}=${dd}`),
      digits: [...curD], focusIdx: idx, bubble: `${dd}`, bubbleType: "look", resultVal: null, bRef: bResult });
    steps.push({ phase: "elsie",
      narr: up ? t(E, `${dd}≥5 → round up!`, `${dd}≥5 → 올린다!`) : t(E, `${dd}<5 → skip.`, `${dd}<5 → 패스.`),
      digits: [...curD], focusIdx: idx,
      bubble: up ? t(E, "≥5\nUp!⬆", "≥5\n올린다!⬆") : t(E, "<5\nSkip", "<5\n패스"),
      bubbleType: up ? "carry" : "dim", resultVal: null, bRef: bResult });
    if (up) cur += pw(pos);
    cur = Math.floor(cur / pw(pos)) * pw(pos);
    const nD = String(cur).padStart(len, "0").split("").map(Number);
    steps.push({ phase: "elsie",
      narr: `→ ${cur}${up && pos < len ? " carry↗!" : ""}`,
      digits: [...nD], focusIdx: up && pos < len ? idx - 1 : -1,
      bubble: up && pos < len ? "+1↗" : "", bubbleType: "carry", resultVal: cur, bRef: bResult });
    curD = [...nD];
  }

  const eResult = cur, isDiff = bResult !== eResult;
  steps.push({ phase: "elsie_result", narr: t(E, "Elsie's result…", "Elsie의 결과는…"), result: eResult, number: x });
  steps.push({ phase: "compare",
    narr: isDiff
      ? t(E, `❌ ${bResult} vs ${eResult} — Different!`, `❌ ${bResult} vs ${eResult} — 달라!`)
      : t(E, `✅ Both ${bResult} — Same!`, `✅ 둘 다 ${bResult} — 같아!`),
    bessie: bResult, elsie: eResult, isDiff });

  return steps;
}


// ═══════════════════════════════════════════════
// Chapter 3: 💡 Pattern Discovery (12 steps)
// Removed old 3-9 (redundant "digit≥?" quiz)
// ═══════════════════════════════════════════════
export function makePatternSteps(E) {
  return [
    // 3-1: Review all 6 cases
    { type: "reveal",
      narr: t(E, "We saw all 6 cases. Let's find the pattern!", "시뮬레이터에서 6개를 해봤어. 이제 규칙을 찾아보자! ✅ 표는 답이 같은 것, ❌는 답이 다른 것!"),
      content: (
        <div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14 }}>
          {[[48,"❌"],[67,"✅"],[38,"✅"],[445,"❌"],[435,"✅"],[4459,"❌"]].map(([n,r],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", marginBottom:4,
              background: r==="❌" ? C.noBg : C.okBg, borderRadius:8,
              border: `1.5px solid ${r==="❌" ? C.noBd : C.okBd}` }}>
              <span style={{ fontWeight:800 }}>{n}</span><span>{r}</span>
            </div>))}
        </div></div>),
    },
    // 3-2: Common feature
    { type: "quiz",
      narr: t(E, "Look at only ❌: 48, 445, 4459", "❌인 수만 모아봤: 48, 445, 4459. 이 세 수의 공통점이 보여?"),
      question: t(E, "What do these three have in common?", "이 세 수의 공통점은?"),
      hint: t(E, "Look at the first digit!", "첫째 자리를 봐!"),
      options: t(E,
        ["First digit always even", "First digit always 4", "All divisible by 8", "Even number of digits"],
        ["첫째 자리가 짝수", "첫째 자리가 전부 4", "전부 8의 배수", "자릿수가 짝수"]),
      correct: 1,
      explain: t(E, "All start with 4! That's the key.", "전부 4로 시작해! 이게 핵심이야."),
    },
    // 3-3: Why 4?
    { type: "quiz",
      narr: t(E, "Why 4? Remember, Bessie only checks the first digit.", "왜 4일까? Bessie는 첫째 자리만 보잖아."),
      question: t(E, "First digit is 4 — Bessie rounds up or down?", "첫째 자리가 4면, Bessie는 올릴까 버릴까?"),
      options: t(E, ["Up (4 ≥ 5)", "Down (4 < 5)"], ["올린다 (4 ≥ 5)", "버린다 (4 < 5)"]),
      correct: 1,
      explain: t(E, "4 < 5 → Bessie rounds down → result 0!", "4 < 5 → 버린다 → 결과 0!"),
    },
    // 3-4: Elsie's carry
    { type: "reveal",
      narr: t(E, "But look at Elsie with 48:", "그런데 Elsie의 48을 봐:"),
      content: (
        <div style={{ padding: 4 }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, lineHeight:2.2, padding:10, background:C.elsieBg, borderRadius:10, border:`1.5px solid ${C.elsieBd}` }}>
            <div style={{ fontWeight:800, color:C.elsie, marginBottom:4 }}>{t(E, "🐮 Elsie rounding 48:", "🐮 Elsie의 48 반올림:")}</div>
            <div>{t(E, "Step 1: ones=", "1단계: 1의자리=")}<strong>8</strong> ≥ 5 → {t(E, "up!", "올림!")} → 50</div>
            <div>{t(E, "Step 2: tens=", "2단계: 10의자리=")}<strong>5</strong> ≥ 5 → {t(E, "up!", "올림!")} → 100</div>
            <div style={{ marginTop:8, fontWeight:800, color:C.no }}>{t(E, "Tens was 4, but carry from 8 made it 5!", "4였던 10의자리가 carry 때문에 5가 됐어!")}</div>
          </div>
        </div>),
    },
    // 3-5: 4+1=5 threshold
    // 3-5 (NEW): 첫째 자리별 — 한 표로 모두 비교
    { type: "reveal",
      narr: t(E,
        "Let's see what happens for each first digit when Elsie's carry reaches it.",
        "Elsie 의 carry 가 첫째 자리에 닿았을 때 어떻게 되는지 — 첫째 자리별로 한눈에 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, marginBottom: 8 }}>
            {t(E, "Compare: Bessie (first digit only) vs Elsie (after carry)", "비교: Bessie (첫째 자리 그대로) vs Elsie (carry 받은 후)")}
          </div>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 60px", padding: "8px 10px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim }}>
              <span>{t(E, "first", "첫째")}</span>
              <span>🐄 Bessie</span>
              <span>🐮 Elsie (+1)</span>
              <span style={{ textAlign: "right" }}>?</span>
            </div>
            {[
              { f: "1~3", b: "<5 → 0", e: "+1 → 2~4, 여전히 <5 → 0",  same: true  },
              { f: "4",    b: "<5 → 0", e: "+1 → 5, 이제 ≥5 → 10ᴾ", same: false },
              { f: "5~9", b: "≥5 → 10ᴾ", e: "이미 올림 → 10ᴾ",         same: true  },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 1fr 60px",
                padding: "10px 10px", borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                background: row.same ? C.okBg : C.noBg,
                color: row.same ? C.ok : C.no,
                fontWeight: 700,
              }}>
                <span style={{ fontWeight: 900, fontSize: 14 }}>{row.f}</span>
                <span style={{ fontSize: 11 }}>{row.b}</span>
                <span style={{ fontSize: 11 }}>{row.e}</span>
                <span style={{ textAlign: "right", fontWeight: 900, fontSize: 16 }}>{row.same ? "✓" : "❌"}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, fontSize: 13, color: C.accent, fontWeight: 800, textAlign: "center" }}>
            💡 {t(E, "Only first digit = 4 makes the answers differ!", "첫째 자리 = 4 일 때만 답이 달라져요!")}
          </div>
        </div>
      ),
    },

    // 3-9: Carry propagation — 445 vs 435 (시각적 비교)
    { type: "reveal",
      narr: t(E,
        "But first=4 alone isn't enough! Carry must REACH the first digit. Compare 445 vs 435 side by side.",
        "근데 첫째=4 만으로는 부족해요! carry 가 첫째까지 도달해야 해요. 445 와 435 를 나란히 비교해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 두 수 나란히 비교 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            {/* 445 */}
            <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 12, padding: 12 }}>
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: 900, color: C.no, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
                445
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
                <div>마지막: <strong style={{ color: C.carry }}>5</strong> ≥5 → carry ↑</div>
                <div>중간:    <strong style={{ color: C.no }}>4</strong>+1=<strong style={{ color: C.no }}>5</strong>, 5≥5 → carry ↑</div>
                <div>첫째:    <strong style={{ color: C.no }}>4</strong>+1=<strong style={{ color: C.no }}>5</strong>, 5≥5 → 1000</div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 10px", background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text }}>
                Bessie: 0 / Elsie: 1000
              </div>
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 16, fontWeight: 900, color: C.no }}>❌ 다름</div>
            </div>

            {/* 435 */}
            <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 12, padding: 12 }}>
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: 900, color: C.ok, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
                435
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
                <div>마지막: <strong style={{ color: C.carry }}>5</strong> ≥5 → carry ↑</div>
                <div>중간:    <strong style={{ color: C.ok }}>3</strong>+1=<strong style={{ color: C.ok }}>4</strong>, 4&lt;5 → <strong style={{ color: C.ok }}>멈춤!</strong></div>
                <div>첫째:    <strong>4</strong> 그대로 (carry 안 옴) → 0</div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 10px", background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text }}>
                Bessie: 0 / Elsie: 0
              </div>
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 16, fontWeight: 900, color: C.ok }}>✓ 같음</div>
            </div>
          </div>

          {/* 결론 */}
          <div style={{ padding: "12px 14px", background: "#fef3c7", border: `2px solid #fcd34d`, borderRadius: 10, fontSize: 13, color: "#a16207", fontWeight: 700, lineHeight: 1.7, textAlign: "center" }}>
            💡 {t(E, "Middle digit must be ≥4 — only then carry keeps going up to the first digit.",
                  "중간 자리가 ≥4 여야 carry 가 첫째까지 계속 올라가요.")}
          </div>
        </div>
      ),
    },
    // 3-9: Complete condition
    { type: "reveal",
      narr: t(E, "✅ Complete condition found!", "✅ 완전한 조건을 찾았어!"),
      content: (
        <div style={{ background:C.card, borderRadius:14, padding:16, border:`2px solid ${C.accent}`, boxShadow:"0 4px 16px rgba(79,70,229,.1)" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, lineHeight:2.4 }}>
            <div><span style={{ display:"inline-block", width:100, color:C.dim }}>{t(E,"First:","첫째:")}</span><span style={{ fontWeight:800, color:C.no }}>{t(E,"must be 4","반드시 4")}</span></div>
            <div><span style={{ display:"inline-block", width:100, color:C.dim }}>{t(E,"Middle:","중간:")}</span><span style={{ fontWeight:800, color:C.carry }}>4~9</span> <span style={{ color:C.dim }}>{t(E,"(6 each)","(6가지)")}</span></div>
            <div><span style={{ display:"inline-block", width:100, color:C.dim }}>{t(E,"Last:","마지막:")}</span><span style={{ fontWeight:800, color:C.look }}>5~9</span> <span style={{ color:C.dim }}>{t(E,"(5, starts carry!)","(5가지)")}</span></div>
          </div>
        </div>),
    },
    // 3-9b: 슬롯으로 개수 세기 (곱셈 원리 — 시각)
    { type: "reveal",
      narr: t(E,
        "Each digit position is a slot. Multiply the choices per slot to get the total — like a slot machine!",
        "각 자리는 슬롯이에요. 슬롯마다 가능한 수를 모두 곱하면 전체 개수가 나와요 — 슬롯머신처럼요!"),
      content: (
        <div style={{ padding: 16 }}>
          {/* 2자리 시각 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 6 }}>{t(E, "2-digit", "2자리")}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace" }}>
              <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10, padding: "10px 14px", textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 11, color: C.no, fontWeight: 700 }}>{t(E, "first", "첫째")}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: C.no }}>4</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>1{t(E, " choice", "가지")}</div>
              </div>
              <span style={{ fontSize: 18, color: C.dim, fontWeight: 800 }}>×</span>
              <div style={{ background: C.lookBg, border: `2px solid ${C.lookBd}`, borderRadius: 10, padding: "10px 14px", textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 11, color: C.look, fontWeight: 700 }}>{t(E, "last", "마지막")}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.look }}>5~9</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>5{t(E, " choices", "가지")}</div>
              </div>
              <span style={{ fontSize: 18, color: C.dim, fontWeight: 800 }}>=</span>
              <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: "10px 14px", textAlign: "center", minWidth: 60 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.accent }}>5</div>
              </div>
            </div>
          </div>

          {/* 3자리 시각 */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 6 }}>{t(E, "3-digit", "3자리")}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", flexWrap: "wrap" }}>
              <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: C.no, fontWeight: 700 }}>{t(E, "first", "첫째")}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.no }}>4</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>1{t(E, "", "가지")}</div>
              </div>
              <span style={{ fontSize: 16, color: C.dim, fontWeight: 800 }}>×</span>
              <div style={{ background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: C.carry, fontWeight: 700 }}>{t(E, "middle", "중간")}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.carry }}>4~9</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>6{t(E, "", "가지")}</div>
              </div>
              <span style={{ fontSize: 16, color: C.dim, fontWeight: 800 }}>×</span>
              <div style={{ background: C.lookBg, border: `2px solid ${C.lookBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: C.look, fontWeight: 700 }}>{t(E, "last", "마지막")}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: C.look }}>5~9</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>5{t(E, "", "가지")}</div>
              </div>
              <span style={{ fontSize: 16, color: C.dim, fontWeight: 800 }}>=</span>
              <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: "10px 12px", textAlign: "center", minWidth: 60 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: C.accent }}>30</div>
              </div>
            </div>
          </div>

          {/* 왜 마지막은 5~9, 중간은 4~9 인가 */}
          <div style={{ marginTop: 14, padding: "12px 14px", background: "#fef3c7", border: `1.5px solid #fcd34d`, borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#a16207", marginBottom: 8 }}>
              🤔 {t(E, "Wait — why is last 5~9 but middle 4~9?", "잠깐 — 왜 마지막은 5~9 인데 중간은 4~9 일까?")}
            </div>
            <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.85 }}>
              <div style={{ marginBottom: 4 }}>
                <strong style={{ color: C.look }}>마지막 자리</strong>{t(E, " — STARTS the carry.", " — carry 를 시작 시켜야 해요.")}
              </div>
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, lineHeight: 1.7 }}>
                <div>5 → ≥5 → carry 시작 ✓</div>
                <div>4 → 4&lt;5 → carry 안 시작 ❌</div>
                <div style={{ color: C.look, fontWeight: 700 }}>그래서 5~9 (5가지)</div>
              </div>
              <div style={{ marginTop: 8, marginBottom: 4 }}>
                <strong style={{ color: C.carry }}>중간 자리</strong>{t(E, " — RECEIVES carry (+1), must propagate further.", " — carry 받아서 (+1) 다음 자리로 넘겨줘야 해요.")}
              </div>
              <div style={{ paddingLeft: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, lineHeight: 1.7 }}>
                <div>4 → +1 → 5 → ≥5 → 다음으로 ✓</div>
                <div>3 → +1 → 4 → 4&lt;5 → 멈춤 ❌</div>
                <div style={{ color: C.carry, fontWeight: 700 }}>그래서 4~9 (6가지)</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10, padding: "10px 12px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 10, fontSize: 12, color: C.accent, fontWeight: 700, lineHeight: 1.7 }}>
            💡 {t(E, "Each slot is independent → multiply choices per slot.",
                  "각 슬롯은 독립적이라 → 슬롯마다 가능한 수를 곱하면 끝!")}
          </div>
        </div>
      ),
    },

    // 3-10: Count 2-digit
    { type: "quiz",
      narr: t(E,
        "Apply it: 2-digit slot machine.",
        "직접 세보기: 2자리 슬롯머신."),
      question: t(E, "1 × 5 = ?", "1 × 5 = ?"),
      hint: t(E, "First digit slot: 1. Last digit slot: 5.", "첫째 슬롯: 1, 마지막 슬롯: 5."),
      options: t(E, ["4","5","6","10"], ["4","5","6","10"]),
      correct: 1,
      explain: t(E, "5! That's 45, 46, 47, 48, 49.", "5개! 즉 45, 46, 47, 48, 49."),
    },
    // 3-11: Count 3-digit
    { type: "input",
      narr: t(E,
        "Now 3-digit. One more slot in the middle (4~9, 6 choices).",
        "이제 3자리. 중간 슬롯이 하나 더 (4~9, 6가지)."),
      question: t(E, "1 × 6 × 5 = ?", "1 × 6 × 5 = ?"),
      answer: 30,
    },
    // 3-12: Formula
    { type: "reveal",
      narr: t(E, "Pattern! d-digit = 5 × 6^(d−2)!", "패턴! d자리 = 5 × 6^(d−2)!"),
      content: (
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13 }}>
            {[[2,"[4][5~9]","1×5","5"],[3,"[4][4~9][5~9]","1×6×5","30"],[4,"[4][4~9][4~9][5~9]","1×6²×5","180"]].map(([d,p,f,r],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", marginBottom:4, background:C.accentBg, borderRadius:8 }}>
                <span style={{ color:C.dim }}>{d}{t(E,"-dig","자리")}</span>
                <span style={{ color:C.dim, fontSize:11 }}>{p}</span>
                <span style={{ color:C.accent, fontSize:11 }}>{f}</span>
                <span style={{ fontWeight:800, color:C.accent }}>{r}</span>
              </div>))}
          </div>
          <div style={{ textAlign:"center", marginTop:12, padding:"10px 16px", background:"linear-gradient(135deg,#4f46e5,#6366f1)", borderRadius:12 }}>
            <span style={{ fontSize:18, fontWeight:900, color:"#fff", fontFamily:"'JetBrains Mono',monospace" }}>5 × 6<sup>d−2</sup></span>
          </div>
        </div>),
    },
  ];
}


// ═══════════════════════════════════════════════
// Chapter 4: 🐍 Brute Force — 학생이 자연스럽게 떠올리는 흐름
//   1. 입력 받기 (T, N)
//   2. 메인 루프: 각 x 마다 두 답 비교 → 카운트
//   3. Bessie 함수 정의 (한 번만 보고 결정)
//   4. Elsie 함수 정의 (한 자리씩 올라가며 결정)
//   5. 전체 코드 합치기
//   6. 돌려보기 → N 작게는 빠름, 크게는 느림
//   7. 누적합으로 빠르게
//   8. 속도 비교 (SpeedScale)
//   9. 그래도 N=10⁹ 한계 → 패턴 챕터로
// ═══════════════════════════════════════════════

// 공통 단계: P 구하기 (자릿수)
const BF_P = [
  "# 두 함수 모두 먼저 P 가 필요해요",
  "# P = x 의 자릿수",
  "",
  "x = 48",
  "P = len(str(x))     # → 2",
  "",
  "x = 4459",
  "P = len(str(x))     # → 4",
];
const BF_P_CPP = [
  "// 두 함수 모두 먼저 P 가 필요해요",
  "// P = x 의 자릿수",
  "",
  "long long x = 48;",
  "int P = (int)to_string(x).size();   // → 2",
  "",
  "x = 4459;",
  "P = (int)to_string(x).size();       // → 4",
];

// Elsie 분석 — 한 자리씩 어떻게 다루는지 작은 조각으로
const BF_ELSIE_DIGIT = [
  "# pos 번째 자리 숫자 어떻게 가져오지?",
  "# (1자리=ones, 2자리=tens, 3자리=hundreds, ...)",
  "",
  "cur = 4459          # 예시",
  "",
  "# pos=1 (ones)",
  "d = (cur // 10**0) % 10      # 4459 % 10 = 9",
  "",
  "# pos=2 (tens)",
  "d = (cur // 10**1) % 10      # 445 % 10 = 5",
  "",
  "# pos=3 (hundreds)",
  "d = (cur // 10**2) % 10      # 44 % 10 = 4",
];
const BF_ELSIE_DIGIT_CPP = [
  "// pos 번째 자리 숫자 어떻게 가져오지?",
  "// (10^(pos-1) 로 나눠서 그 자리를 ones 위치까지 내리고, % 10)",
  "",
  "long long cur = 4459;       // 예시",
  "",
  "// pos=1 (ones)",
  "int d = (cur / 1) % 10;     // 4459 % 10 = 9",
  "",
  "// pos=2 (tens)",
  "d = (cur / 10) % 10;        // 445 % 10 = 5",
  "",
  "// pos=3 (hundreds)",
  "d = (cur / 100) % 10;       // 44 % 10 = 4",
];

const BF_ELSIE_CARRY = [
  "# 그 자리가 ≥5 면 다음 자리로 +1 올림",
  "cur += 10**pos",
  "",
  "# 그 자리 이하는 0 으로 (잘라내기)",
  "cur = (cur // 10**pos) * 10**pos",
  "",
  "# 예: cur=58, pos=1",
  "# 58 → +10 → 68 → //10*10 → 60",
  "# (1의자리 8 이 ≥5 라서 올라가고, 1의자리 자체는 0)",
];
const BF_ELSIE_CARRY_CPP = [
  "// 그 자리가 ≥5 면 다음 자리로 +1 올림",
  "long long pw = 1;            // 10^pos 미리 계산",
  "for (int i = 0; i < pos; i++) pw *= 10;",
  "",
  "cur += pw;                   // 위 자리 +1",
  "cur = (cur / pw) * pw;       // 그 자리 이하는 0",
  "",
  "// 예: cur=58, pos=1, pw=10",
  "// 58 → +10 → 68 → /10*10 → 60",
  "// (1의자리 8 이 ≥5 라서 올라가고, 1의자리 자체는 0)",
];

// 1단계: 입력만 받기
const BF_INPUT = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())          # 테스트케이스 개수",
  "for _ in range(T):",
  "    N = int(input())      # 매 테스트마다 N",
  "    # ... 이제 2 ~ N 의 답을 구해야 함",
];
const BF_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T; cin >> T;            // 테스트케이스 개수",
  "    while (T--) {",
  "        long long N; cin >> N;  // 매 테스트마다 N",
  "        // ... 이제 2 ~ N 의 답을 구해야 함",
  "    }",
  "}",
];

// 2단계: 메인 루프 + 카운트 (Bessie/Elsie 는 아직 정의 안 함, 호출만)
const BF_MAIN = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    count = 0",
  "",
  "    for x in range(2, N+1):       # 2 부터 N 까지 모든 x",
  "        b = Bessie(x)             # Bessie 의 답",
  "        e = Elsie(x)              # Elsie 의 답",
  "        if b != e:                # 답이 다르면",
  "            count += 1            # 카운트!",
  "",
  "    print(count)",
];
const BF_MAIN_CPP = [
  "int T; cin >> T;",
  "while (T--) {",
  "    long long N; cin >> N;",
  "    long long count = 0;",
  "",
  "    for (long long x = 2; x <= N; x++) {  // 2 부터 N 까지 모든 x",
  "        long long b = Bessie(x);          // Bessie 의 답",
  "        long long e = Elsie(x);           // Elsie 의 답",
  "        if (b != e) count++;              // 다르면 카운트!",
  "    }",
  "",
  "    cout << count << \"\\n\";",
  "}",
];

// 3단계: Bessie 함수 정의
const BF_BESSIE = [
  "def Bessie(x):",
  "    s = str(x)              # 문자열로",
  "    P = len(s)              # P = 자릿수",
  "",
  "    # 첫째 자리만 본다",
  "    first_digit = int(s[0])",
  "",
  "    if first_digit >= 5:",
  "        return 10**P        # ≥5 → 올림",
  "    else:",
  "        return 0            # <5 → 0",
];
const BF_BESSIE_CPP = [
  "long long pw10(int n) {                  // 10^n 헬퍼",
  "    long long r = 1;",
  "    for (int i = 0; i < n; i++) r *= 10;",
  "    return r;",
  "}",
  "",
  "long long Bessie(long long x) {",
  "    string s = to_string(x);             // 문자열로",
  "    int P = (int)s.size();               // P = 자릿수",
  "",
  "    // 첫째 자리만 본다",
  "    int first_digit = s[0] - '0';",
  "",
  "    if (first_digit >= 5) {",
  "        return pw10(P);                  // ≥5 → 올림",
  "    } else {",
  "        return 0;                        // <5 → 0",
  "    }",
  "}",
];

// 4단계: Elsie 함수 정의
const BF_ELSIE = [
  "def Elsie(x):",
  "    P = len(str(x))",
  "    cur = x",
  "",
  "    # 1자리부터 P자리까지 순서대로",
  "    for pos in range(1, P+1):",
  "        # 그 자리의 숫자",
  "        d = (cur // 10**(pos-1)) % 10",
  "",
  "        # ≥5 면 올림",
  "        if d >= 5:",
  "            cur += 10**pos",
  "",
  "        # 그 자리 이하 0으로",
  "        cur = (cur // 10**pos) * 10**pos",
  "",
  "    return cur",
];
const BF_ELSIE_CPP = [
  "long long Elsie(long long x) {",
  "    int P = (int)to_string(x).size();",
  "    long long cur = x;",
  "",
  "    // 1자리부터 P자리까지 순서대로",
  "    for (int pos = 1; pos <= P; pos++) {",
  "        // 그 자리의 숫자",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "",
  "        // ≥5 면 올림",
  "        if (d >= 5) cur += pw10(pos);",
  "",
  "        // 그 자리 이하 0으로",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
];

// 5단계: 전체 코드 합치기
const BF_FULL = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def Bessie(x):",
  "    s = str(x)",
  "    P = len(s)",
  "    first_digit = int(s[0])",
  "    if first_digit >= 5:",
  "        return 10**P",
  "    else:",
  "        return 0",
  "",
  "def Elsie(x):",
  "    P = len(str(x))",
  "    cur = x",
  "    for pos in range(1, P+1):",
  "        d = (cur // 10**(pos-1)) % 10",
  "        if d >= 5:",
  "            cur += 10**pos",
  "        cur = (cur // 10**pos) * 10**pos",
  "    return cur",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    count = 0",
  "    for x in range(2, N+1):",
  "        b = Bessie(x)",
  "        e = Elsie(x)",
  "        if b != e:",
  "            count += 1",
  "    print(count)",
];
const BF_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "long long pw10(int n) {",
  "    long long r = 1;",
  "    for (int i = 0; i < n; i++) r *= 10;",
  "    return r;",
  "}",
  "",
  "long long Bessie(long long x) {",
  "    string s = to_string(x);",
  "    int P = (int)s.size();",
  "    int first_digit = s[0] - '0';",
  "    if (first_digit >= 5) return pw10(P);",
  "    else return 0;",
  "}",
  "",
  "long long Elsie(long long x) {",
  "    int P = (int)to_string(x).size();",
  "    long long cur = x;",
  "    for (int pos = 1; pos <= P; pos++) {",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "        if (d >= 5) cur += pw10(pos);",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long N; cin >> N;",
  "        long long count = 0;",
  "        for (long long x = 2; x <= N; x++) {",
  "            if (Bessie(x) != Elsie(x)) count++;",
  "        }",
  "        cout << count << \"\\n\";",
  "    }",
  "}",
];

const BF_DP = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def Bessie(x):",
  "    s = str(x)",
  "    P = len(s)",
  "    if int(s[0]) >= 5:",
  "        return 10**P",
  "    return 0",
  "",
  "def Elsie(x):",
  "    P = len(str(x))",
  "    cur = x",
  "    for pos in range(1, P+1):",
  "        d = (cur // 10**(pos-1)) % 10",
  "        if d >= 5:",
  "            cur += 10**pos",
  "        cur = (cur // 10**pos) * 10**pos",
  "    return cur",
  "",
  "# 누적합 — 필요한 만큼만 계산해서 저장. 다음 테스트는 거기부터 이어서.",
  "ans = [0, 0]   # ans[x] = 2 ~ x 까지의 답",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "",
  "    # 부족한 만큼만 새로 채움",
  "    while len(ans) <= N:",
  "        x = len(ans)",
  "        b = Bessie(x)",
  "        e = Elsie(x)",
  "        if b != e:",
  "            ans.append(ans[-1] + 1)",
  "        else:",
  "            ans.append(ans[-1])",
  "",
  "    print(ans[N])   # 이미 계산된 건 즉시",
];
const BF_DP_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "long long pw10(int n) {",
  "    long long r = 1;",
  "    for (int i = 0; i < n; i++) r *= 10;",
  "    return r;",
  "}",
  "",
  "long long Bessie(long long x) {",
  "    string s = to_string(x);",
  "    int P = (int)s.size();",
  "    if (s[0] - '0' >= 5) return pw10(P);",
  "    return 0;",
  "}",
  "",
  "long long Elsie(long long x) {",
  "    int P = (int)to_string(x).size();",
  "    long long cur = x;",
  "    for (int pos = 1; pos <= P; pos++) {",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "        if (d >= 5) cur += pw10(pos);",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    // 누적합 — 필요한 만큼만 계산해서 저장",
  "    vector<long long> ans = {0, 0};   // ans[x] = 2 ~ x 까지의 답",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long N; cin >> N;",
  "",
  "        // 부족한 만큼만 새로 채움",
  "        while ((long long)ans.size() <= N) {",
  "            long long x = ans.size();",
  "            long long b = Bessie(x), e = Elsie(x);",
  "            if (b != e) ans.push_back(ans.back() + 1);",
  "            else ans.push_back(ans.back());",
  "        }",
  "",
  "        cout << ans[N] << \"\\n\";   // 이미 계산된 건 즉시",
  "    }",
  "}",
];

export function makeBruteSteps(E, lang = "py") {
  const pick = (py, cpp) => lang === "py" ? py : cpp;
  // 코드 위 작은 라벨
  const Label = ({ text }) => (
    <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 800, color: C.dim, letterSpacing: 0.3 }}>
      {text}
    </div>
  );

  // 4-2 의 짧은 메인 루프 발췌
  const MAIN_SNIPPET_PY = [
    "for x in range(2, N+1):       # 2 부터 N 까지",
    "    b = Bessie(x)             # Bessie 의 답",
    "    e = Elsie(x)              # Elsie 의 답",
    "    if b != e:                # 다르면",
    "        count += 1            # 카운트!",
    "",
    "print(count)",
  ];
  const MAIN_SNIPPET_CPP = [
    "for (long long x = 2; x <= N; x++) {  // 2 부터 N 까지",
    "    long long b = Bessie(x);          // Bessie 의 답",
    "    long long e = Elsie(x);           // Elsie 의 답",
    "    if (b != e) count++;              // 다르면 카운트!",
    "}",
    "",
    "cout << count << \"\\n\";",
  ];

  return [
    // 4-1: 입력 받기
    { type: "reveal",
      narr: t(E,
        "Step 1: read the input. T test cases, each gives one N.",
        "1단계: 입력부터 받아요. T 개의 테스트케이스, 각각 N 이 하나씩."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 1: Input", "1단계: 입력 받기")} />
          <CodeBlock lines={pick(BF_INPUT, BF_INPUT_CPP)} />
        </div>
      ),
    },

    // 4-2: Bessie/Elsie 계산법 호출 + count 비교
    { type: "reveal",
      narr: t(E,
        "Step 2: for each x from 2 to N, get both answers and count where they differ.",
        "2단계: 결국엔 Bessie / Elsie 의 계산법이 필요해요. 두 값을 비교해서 다르면 카운트!"),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 2: Compare and count", "2단계: 두 값 비교 → 카운트")} />
          <CodeBlock lines={pick(MAIN_SNIPPET_PY, MAIN_SNIPPET_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.carryBg, border: `1.5px solid ${C.carryBd}`, borderRadius: 8, fontSize: 12, color: C.carry, fontWeight: 700, lineHeight: 1.6 }}>
            🤔 {t(E, "But Bessie() and Elsie() don't exist yet. Time to write them — but first…",
                  "근데 Bessie() 랑 Elsie() 가 아직 없어요. 만들기 전에 — 잠깐!")}
          </div>
        </div>
      ),
    },

    // 4-3: 회고 quiz — 자연스러운 사고 흐름
    { type: "quiz",
      narr: t(E,
        "Now we need Bessie() and Elsie(). Hmm — both decide based on P, right? So P first. How did we compute P again?",
        "이제 Bessie() 랑 Elsie() 를 만들어야 해요. 근데 둘 다 결국 P 를 보고 결정하잖아요? 그럼 P 부터 짚고 가야 해요. 챕터 1 에서 P 어떻게 구했었더라?"),
      question: t(E, "What was P?", "P 는 무엇이었나요?"),
      hint: t(E, "Look at x and just count something simple…", "x 를 보고 뭔가 단순한 걸 세면 돼요…"),
      options: t(E,
        ["First digit of x", "Number of digits of x", "Last digit of x", "Sum of digits of x"],
        ["x 의 첫째 자리", "x 의 자릿수", "x 의 마지막 자리", "x 의 자릿수 합"]),
      correct: 1,
      explain: t(E, "Right! P = number of digits = len(str(x)). Now both functions can use it.",
                    "맞아요! P = 자릿수 = len(str(x)). 이제 두 함수가 이걸 쓸 수 있어요."),
    },

    // 4-4: P 구하기 (코드)
    { type: "reveal",
      narr: t(E,
        "Step 3: P = len(str(x)). Both functions will start with this line.",
        "3단계: P = len(str(x)). 두 함수 모두 이 한 줄로 시작해요."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 3: Compute P", "3단계: P 구하기")} />
          <CodeBlock lines={pick(BF_P, BF_P_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 8, fontSize: 12, color: C.accent, fontWeight: 700, lineHeight: 1.6 }}>
            👉 {t(E, "Now Bessie's logic →", "P 를 알았으니 — 다음은 Bessie →")}
          </div>
        </div>
      ),
    },

    // 4-5: Bessie 함수
    { type: "reveal",
      narr: t(E,
        "Step 4: Bessie just looks at the first digit. ≥5 → 10ᴾ. Else → 0.",
        "4단계: Bessie 는 첫째 자리 하나만 봐요. ≥5 면 10ᴾ, 아니면 0."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 4: Bessie 🐄", "4단계: Bessie 구하기 🐄")} />
          <CodeBlock lines={pick(BF_BESSIE, BF_BESSIE_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.bessieBg, border: `1.5px solid ${C.bessieBd}`, borderRadius: 8, fontSize: 12, color: C.bessie, fontWeight: 700, lineHeight: 1.6 }}>
            🐄 {t(E, "First digit only — done in one step!", "첫째 자리 하나만 — 한 방에 끝!")}
          </div>
        </div>
      ),
    },

    // 4-6: Elsie 분석 — pos 자리 숫자 추출 (트릭 1)
    { type: "reveal",
      narr: t(E,
        "Step 5: Elsie checks each digit from 1st to P-th. First trick — extract the pos-th digit.",
        "5단계: Elsie 는 1자리부터 P자리까지 하나씩 봐요. 트릭 1 — pos 번째 자리 숫자 뽑기."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — Trick 1: extract digit", "5단계: Elsie 🐮 — 트릭 1: 자리 숫자 추출")} />
          <CodeBlock lines={pick(BF_ELSIE_DIGIT, BF_ELSIE_DIGIT_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.elsieBg, border: `1.5px solid ${C.elsieBd}`, borderRadius: 8, fontSize: 12, color: C.elsie, fontWeight: 700, lineHeight: 1.6 }}>
            🐮 {t(E, "// 10**(pos-1) shifts that digit to ones place, then % 10 grabs it.",
                  "// 10**(pos-1) 로 그 자리를 ones 위치까지 내리고, % 10 으로 끄집어내요.")}
          </div>
        </div>
      ),
    },

    // 4-7: Elsie 분석 — 올림 + 자리 이하 0 (트릭 2)
    { type: "reveal",
      narr: t(E,
        "Trick 2 — if digit ≥5, carry up. Then zero out that position.",
        "트릭 2 — 그 자리가 ≥5 면 위로 +1 올림. 그리고 그 자리 이하는 0 으로."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — Trick 2: carry + clear", "5단계: Elsie 🐮 — 트릭 2: 올림 + 자리 이하 0")} />
          <CodeBlock lines={pick(BF_ELSIE_CARRY, BF_ELSIE_CARRY_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.elsieBg, border: `1.5px solid ${C.elsieBd}`, borderRadius: 8, fontSize: 12, color: C.elsie, fontWeight: 700, lineHeight: 1.6 }}>
            🐮 {t(E, "Add 10**pos to carry. Then divide+multiply by 10**pos to clear lower digits.",
                  "10**pos 더하면 위 자리에 +1. 10**pos 로 나누고 다시 곱하면 아래 자릿수가 0.")}
          </div>
        </div>
      ),
    },

    // 4-8: Elsie 함수 완성
    { type: "reveal",
      narr: t(E,
        "Combine the tricks into Elsie. Loop pos = 1 to P.",
        "두 트릭을 합쳐서 Elsie 함수 완성. pos 를 1 부터 P 까지 반복."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — full function", "5단계: Elsie 🐮 — 함수 완성")} />
          <CodeBlock lines={pick(BF_ELSIE, BF_ELSIE_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.elsieBg, border: `1.5px solid ${C.elsieBd}`, borderRadius: 8, fontSize: 12, color: C.elsie, fontWeight: 700, lineHeight: 1.6 }}>
            🐮 {t(E, "One digit at a time, with possible carry up.", "한 자리씩, 올림이 위로 전파될 수 있어요.")}
          </div>
        </div>
      ),
    },

    // 4-9: 전체 코드 합치기
    { type: "reveal",
      narr: t(E,
        "Step 6: put it all together — input + loop + Bessie + Elsie.",
        "6단계: 다 합쳐요 — 입력 + 루프 + Bessie + Elsie."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 6: Full code", "6단계: 전체 코드")} />
          <CodeBlock lines={pick(BF_FULL, BF_FULL_CPP)} />
          <div style={{ marginTop: 10, padding: "8px 10px", background: C.okBg, border: `1.5px solid ${C.okBd}`, borderRadius: 8, fontSize: 12, color: C.ok, fontWeight: 700, lineHeight: 1.6 }}>
            ✅ {t(E, "Works! Next: run it.", "작동해요! 다음 페이지에서 직접 돌려봐요.")}
          </div>
        </div>
      ),
    },

    // 4-9: 돌려보기 — 짧고 중립적 narration. 학생이 직접 체감.
    { type: "runner",
      narr: t(E,
        "Try various N — start small, go big. Notice anything?",
        "N 을 다양하게 키워가며 돌려보세요. 뭔가 느껴지나요?"),
    },

    // 4-9b: USACO 제출 결과 — 일부만 통과, 나머지 TLE
    { type: "reveal",
      narr: t(E,
        "Submit to USACO and you get this — first few cases pass (barely), rest time out. So I thought of prefix sum.",
        "USACO 에 제출하면 이런 결과가 나와요. 앞 몇 개는 (간신히) 통과, 나머지는 다 시간 초과. 그래서 누적합을 떠올린 거예요."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "USACO submission — judge results", "USACO 제출 결과 — 채점 결과")} />
          <div style={{
            background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14,
            display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
          }}>
            {[
              { n: 1,  pass: true,  label: "100ms" },
              { n: 2,  pass: true,  label: "1674ms" },
              { n: 3,  pass: true,  label: "1676ms" },
              { n: 4,  pass: true,  label: "1661ms" },
              { n: 5,  pass: false }, { n: 6,  pass: false }, { n: 7,  pass: false },
              { n: 8,  pass: false }, { n: 9,  pass: false }, { n: 10, pass: false },
              { n: 11, pass: false }, { n: 12, pass: false }, { n: 13, pass: false },
            ].map(c => (
              <div key={c.n} style={{
                width: 56, padding: "8px 4px", borderRadius: 8, textAlign: "center",
                background: c.pass ? C.okBg : C.noBg,
                border: `1.5px solid ${c.pass ? C.okBd : C.noBd}`,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: c.pass ? C.ok : C.no, lineHeight: 1 }}>
                  {c.pass ? "✓" : "t"}
                </div>
                {c.label && (
                  <div style={{ fontSize: 9, color: C.dim, marginTop: 4 }}>{c.label}</div>
                )}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>#{c.n}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: "10px 12px", background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 10, fontSize: 13, color: C.no, fontWeight: 700, lineHeight: 1.7 }}>
            ❌ {t(E, "Cases 5~13: TLE. The first 4 barely pass at 1.6s — way too close to the limit.",
                  "케이스 5~13: 시간 초과 (TLE). 통과한 4 개도 1.6 초로 제한 시간에 아슬아슬.")}
          </div>
          <div style={{ marginTop: 8, padding: "10px 12px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 10, fontSize: 13, color: C.accent, fontWeight: 700, lineHeight: 1.7, textAlign: "center" }}>
            💡 {t(E, "So I thought: what if we save what we computed? → Prefix sum!",
                  "그래서 생각했어요 — 한 번 계산한 거 저장해두면? → 누적합!")}
          </div>
        </div>
      ),
    },

    // 4-10: 누적합 — 시각적으로 (x 막대 + ans 누적 + 여러 질문 즉답)
    { type: "reveal",
      narr: t(E,
        "Build an array once, then every query reads it instantly.",
        "배열 한 번만 만들어놓으면 — 어떤 질문이 와도 즉답!"),
      content: (
        <div style={{ padding: 16 }}>
          {/* 핵심 아이디어 한 줄 */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: 10, marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 700 }}>
              <strong style={{ color: C.accent }}>ans[x]</strong> = 2 ~ x {t(E, "에서 답이 다른 수 개수", "에서 답이 다른 수 개수")}
            </div>
          </div>

          {/* 시각화: x 별 ✓/❌ + 누적합 */}
          <Label text={t(E, "Visualize for N=50", "예: N=50 까지 만들어보기")} />
          {(() => {
            const xs = [2, 3, "…", 43, 44, 45, 46, 47, 48, 49, 50];
            const diff = { 45: true, 46: true, 47: true, 48: true, 49: true };
            // 누적합 계산
            let running = 0;
            const cells = xs.map(x => {
              if (x === "…") return { x, ans: "…", diff: false, isPlace: true };
              if (diff[x]) running++;
              return { x, ans: running, diff: !!diff[x] };
            });
            return (
              <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 10, marginBottom: 12, overflowX: "auto" }}>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", minWidth: "fit-content" }}>
                  {cells.map((c, i) => (
                    <div key={i} style={{ width: 44, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
                      {/* x 라벨 */}
                      <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>x={c.x}</div>
                      {/* 답이 다른가? */}
                      <div style={{
                        marginTop: 2, fontSize: 16, fontWeight: 900, padding: "4px 0", borderRadius: 6,
                        background: c.isPlace ? "transparent" : (c.diff ? C.noBg : C.okBg),
                        color: c.isPlace ? C.dim : (c.diff ? C.no : C.ok),
                      }}>{c.isPlace ? "…" : (c.diff ? "❌" : "✓")}</div>
                      {/* ans 값 */}
                      <div style={{
                        marginTop: 4, fontSize: 14, fontWeight: 900, color: C.accent,
                        padding: "3px 0", background: C.accentBg, borderRadius: 5,
                      }}>{c.ans}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, fontSize: 10, color: C.dim }}>
                  <span>↑ 답이 다른가?</span>
                  <span style={{ color: C.accent, fontWeight: 700 }}>↑ ans (누적)</span>
                </div>
              </div>
            );
          })()}

          {/* 여러 질문이 즉답 */}
          <Label text={t(E, "Now any query is instant", "이제 어떤 질문이 와도 즉답")} />
          <div style={{ background: C.okBg, border: `1.5px solid ${C.okBd}`, borderRadius: 10, padding: 12, marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div>{t(E, "Query", "질문")} N=10  →  ans[10]  = <strong style={{ color: C.ok }}>0</strong>  <span style={{ color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "(instant)", "(즉시)")}</span></div>
            <div>{t(E, "Query", "질문")} N=47  →  ans[47]  = <strong style={{ color: C.ok }}>3</strong>  <span style={{ color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "(instant)", "(즉시)")}</span></div>
            <div>{t(E, "Query", "질문")} N=50  →  ans[50]  = <strong style={{ color: C.ok }}>5</strong>  <span style={{ color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{t(E, "(instant)", "(즉시)")}</span></div>
          </div>
          <div style={{ marginBottom: 12, padding: "8px 12px", background: C.accentBg, border: `1.5px dashed ${C.accentBd}`, borderRadius: 8, fontSize: 12, color: C.accent, fontWeight: 700, lineHeight: 1.7, textAlign: "center" }}>
            👉 {t(E, "T queries, but only build the array ONCE!", "T 개 질문 와도 배열은 한 번만 만들면 끝!")}
          </div>

          {/* 코드 */}
          <Label text={t(E, "Code", "코드")} />
          <CodeBlock lines={pick(BF_DP, BF_DP_CPP)} />
        </div>
      ),
    },

    // 4-12: 누적합 제출 결과 — 더 통과하지만 여전히 TLE
    { type: "reveal",
      narr: t(E,
        "Submit prefix sum and… 6 cases pass instead of 4. Better, but still TLE on the rest.",
        "누적합으로 제출하면 — 4 개 → 6 개로 늘어요. 좋아졌지만 나머지는 여전히 시간 초과."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Prefix sum submission", "누적합 제출 결과")} />
          <div style={{
            background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 14,
            display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center",
          }}>
            {[
              { n: 1,  pass: true,  label: "87ms" },
              { n: 2,  pass: true,  label: "75ms" },
              { n: 3,  pass: true,  label: "75ms" },
              { n: 4,  pass: true,  label: "74ms" },
              { n: 5,  pass: true,  label: "920ms" },
              { n: 6,  pass: true,  label: "3719ms" },
              { n: 7,  pass: false }, { n: 8,  pass: false }, { n: 9,  pass: false },
              { n: 10, pass: false }, { n: 11, pass: false }, { n: 12, pass: false },
              { n: 13, pass: false },
            ].map(c => (
              <div key={c.n} style={{
                width: 56, padding: "8px 4px", borderRadius: 8, textAlign: "center",
                background: c.pass ? C.okBg : C.noBg,
                border: `1.5px solid ${c.pass ? C.okBd : C.noBd}`,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: c.pass ? C.ok : C.no, lineHeight: 1 }}>
                  {c.pass ? "✓" : "t"}
                </div>
                {c.label && (
                  <div style={{ fontSize: 9, color: C.dim, marginTop: 4 }}>{c.label}</div>
                )}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>#{c.n}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: "10px 12px", background: C.okBg, border: `1.5px solid ${C.okBd}`, borderRadius: 10, fontSize: 12, color: C.ok, fontWeight: 700, lineHeight: 1.6 }}>
            ✅ {t(E, "Pass: 4 → 6. Cases 1~4 are super fast (cached), 5 fits in 1s.",
                  "통과: 4 → 6 개. 케이스 1~4 는 초고속 (캐시 효과), 5 는 1초 안에 끝.")}
          </div>
          <div style={{ marginTop: 8, padding: "10px 12px", background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 10, fontSize: 12, color: C.no, fontWeight: 700, lineHeight: 1.6 }}>
            ❌ {t(E, "Cases 7~13: still TLE. Why? When N=10⁹ comes, even building the array takes too long.",
                  "케이스 7~13: 여전히 TLE. 왜? N=10⁹ 가 오면 배열 만드는 자체가 너무 오래 걸려요.")}
          </div>
        </div>
      ),
    },

    // 4-13: 결론 — 정말 스마트한 방법이 필요 → 패턴 챕터로
    { type: "reveal",
      narr: t(E,
        "Conclusion: counting one by one is the limit. We need a smarter idea — count without iterating. That comes from finding a pattern.",
        "결론: 하나씩 세는 건 한계예요. 정말 스마트한 방법 — 안 돌리고 그냥 세기 — 가 필요해요. 그건 패턴을 찾으면 가능해져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "10px 12px", background: "#f8f9fc", border: `1.5px solid ${C.border}`, borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.dim }}>🐢 {t(E, "Brute force: 4 / 13 pass", "브루트포스: 4 / 13 통과")}</div>
            </div>
            <div style={{ padding: "10px 12px", background: "#f8f9fc", border: `1.5px solid ${C.border}`, borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.dim }}>💾 {t(E, "Prefix sum: 6 / 13 pass — better, still TLE on big N", "누적합: 6 / 13 통과 — 좋아졌지만 큰 N 은 TLE")}</div>
            </div>
            <div style={{ padding: "12px 14px", background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, textAlign: "center", marginTop: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.accent, lineHeight: 1.6 }}>
                💡 {t(E, "Real fix: don't iterate at all. Count using a formula!", "진짜 해결: 안 돌리고 공식으로 세기!")}
              </div>
              <div style={{ fontSize: 12, color: C.accent, marginTop: 6, fontWeight: 600 }}>
                {t(E, "But what formula? → Find the pattern in the next chapter!",
                    "그런데 어떤 공식? → 다음 챕터 (💡 패턴) 에서 발견!")}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
}


// ═══════════════════════════════════════════════
// Chapter 5: ⚡ Optimization (10 steps)
// ═══════════════════════════════════════════════
// 1단계: 입력받기 + 셋업 (주석 없이 깨끗하게)
const OPT_INPUT = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    if N < 10:",
  "        print(0)",
  "        continue",
  "",
  "    s = str(N)",
  "    D = len(s)",
  "    result = 0",
];

// 2단계: 쉬운 부분
const OPT_EASY = [
  "    for d in range(2, D):",
  "        result += 5 * (6 ** (d - 2))",
];

// 3단계: 어려운 부분
const OPT_TRICKY = [
  "    first = int(s[0])",
  "",
  "    if first > 4:",
  "        result += 5 * (6 ** (D - 2))",
  "",
  "    elif first == 4:",
  "        for i in range(1, D):",
  "            digit = int(s[i])",
  "",
  "            if i < D - 1:",
  "                if digit >= 4:",
  "                    extra = digit - 4",
  "                    rem = D - i - 2",
  "                    result += extra * (6 ** rem) * 5",
  "                if digit < 4:",
  "                    break",
  "            else:",
  "                if digit >= 5:",
  "                    result += digit - 5 + 1",
  "",
  "    print(result)",
];

// 전체 — 위 3개 합친 것
const OPT_CODE = [
  ...OPT_INPUT,
  "",
  ...OPT_EASY,
  "",
  ...OPT_TRICKY,
];

// ─── C++ 버전 ─────────────────────────────────────
const OPT_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "long long p6[20];",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    p6[0] = 1;",
  "    for (int i = 1; i < 20; i++) p6[i] = p6[i-1] * 6;",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long N; cin >> N;",
  "        if (N < 10) { cout << 0 << \"\\n\"; continue; }",
  "",
  "        string s = to_string(N);",
  "        int D = (int)s.size();",
  "        long long result = 0;",
];

const OPT_EASY_CPP = [
  "        for (int d = 2; d < D; d++)",
  "            result += 5 * p6[d - 2];",
];

const OPT_TRICKY_CPP = [
  "        int first = s[0] - '0';",
  "",
  "        if (first > 4) {",
  "            result += 5 * p6[D - 2];",
  "        } else if (first == 4) {",
  "            for (int i = 1; i < D; i++) {",
  "                int digit = s[i] - '0';",
  "",
  "                if (i < D - 1) {",
  "                    if (digit >= 4) {",
  "                        long long extra = digit - 4;",
  "                        int rem = D - i - 2;",
  "                        result += extra * p6[rem] * 5;",
  "                    }",
  "                    if (digit < 4) break;",
  "                } else {",
  "                    if (digit >= 5) result += digit - 5 + 1;",
  "                }",
  "            }",
  "        }",
  "",
  "        cout << result << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

const OPT_CODE_CPP = [
  ...OPT_INPUT_CPP,
  "",
  ...OPT_EASY_CPP,
  "",
  ...OPT_TRICKY_CPP,
];

export function makeOptSteps(E) {
  return [
    // 5-0: 부드러운 도입 — 공식이 뭘 뜻하는지 구체 숫자로 보여주기
    { type: "reveal",
      narr: t(E,
        "Recap: pattern chapter formula = 5 × 6^(d−2). It tells us, for each digit-count d, how many numbers in that range give different Bessie/Elsie answers.",
        "패턴 챕터에서 찾은 공식: 5 × 6ᵈ⁻². 이게 뜻하는 건 — d 자리 수 중에서 베시랑 엘시 답이 다른 게 몇 개인지."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 공식 카드 */}
          <div style={{ background: "linear-gradient(135deg,#4f46e5,#6366f1)", borderRadius: 12, padding: "14px 16px", textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", fontWeight: 700, marginBottom: 4 }}>
              {t(E, "From the pattern chapter", "패턴 챕터에서")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'JetBrains Mono',monospace" }}>
              5 × 6<sup>d−2</sup>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginTop: 4 }}>
              {t(E, "= count of differing d-digit numbers", "= d 자리에서 답이 다른 수의 개수")}
            </div>
          </div>

          {/* 구체 숫자: d=2,3,4,5 가 뭐가 되는지 */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ padding: "8px 12px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim, textAlign: "center" }}>
              {t(E, "What the formula actually gives", "공식에 숫자 넣어보기")}
            </div>
            {[
              { d: 2, calc: "5 × 6⁰ = 5 × 1",   ans: 5,    ex: "45~49" },
              { d: 3, calc: "5 × 6¹ = 5 × 6",   ans: 30,   ex: "445, 467, 489 ..." },
              { d: 4, calc: "5 × 6² = 5 × 36",  ans: 180,  ex: "4456, 4789 ..." },
              { d: 5, calc: "5 × 6³ = 5 × 216", ans: 1080, ex: "..." },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 70px",
                padding: "7px 12px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                background: i % 2 === 0 ? "#fff" : "#fafbff",
              }}>
                <span style={{ fontWeight: 800, color: C.accent }}>d={row.d}</span>
                <span style={{ fontSize: 12, color: C.text }}>{row.calc} <span style={{ color: C.dim, fontSize: 10 }}>({row.ex})</span></span>
                <span style={{ textAlign: "right", fontWeight: 900, color: C.ok }}>{row.ans}{t(E, "", "개")}</span>
              </div>
            ))}
          </div>

          {/* 이제 뭘 할까 */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              {t(E, "Plan:", "계획:")}
              <div style={{ marginTop: 8, paddingLeft: 14, color: C.text, fontSize: 12, lineHeight: 1.9 }}>
                <div>1. {t(E, "Verify formula gives 5, 30 for d=2,3", "공식이 d=2,3 에서 5, 30 나오는지 확인")}</div>
                <div>2. {t(E, "Sum up all digit counts (e.g. N=1000)", "자릿수별로 다 합치기 (예: N=1000)")}</div>
                <div>3. {t(E, "Handle tricky N like 473", "473 같은 N 처리")}</div>
                <div>4. {t(E, "Build the code piece by piece", "코드를 한 조각씩 쌓기")}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 5-1a: 2자리 시각 — 실제로 어떤 수들인지
    { type: "reveal",
      narr: t(E,
        "2-digit numbers where Bessie ≠ Elsie. Look — they're all 4_ with last ≥5.",
        "2자리에서 답이 다른 수들. 보면 — 다 4_ 이고 마지막이 ≥5."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 14, fontFamily: "'JetBrains Mono',monospace" }}>
            {[45, 46, 47, 48, 49].map(n => (
              <div key={n} style={{
                background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10,
                padding: "10px 14px", fontSize: 22, fontWeight: 900, color: C.ok,
              }}>{n}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: C.dim, fontWeight: 700, marginBottom: 10 }}>
            👉 {t(E, "5 numbers total", "전부 5개")}
          </div>
          <div style={{
            background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10,
            padding: 12, textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
          }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              {t(E, "Formula check (d=2)", "공식 확인 (d=2)")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.accent }}>
              5 × 6<sup>2−2</sup> = 5 × 6<sup>0</sup> = 5 × 1
            </div>
          </div>
        </div>
      ),
    },
    // 5-1: 2-digit formula
    { type: "input",
      narr: t(E, "So how many 2-digit numbers?", "2자리는 몇 개?"),
      question: "5 × 6⁰ = 5 × 1 = ?", answer: 5,
    },
    // 5-2a: 3자리 시각 — 4xx 패턴
    { type: "reveal",
      narr: t(E,
        "3-digit: first=4 fixed, middle 4~9 (6 choices), last 5~9 (5 choices).",
        "3자리: 첫째=4 고정, 중간 4~9 (6가지), 마지막 5~9 (5가지)."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 슬롯 시각화 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14, fontFamily: "'JetBrains Mono',monospace" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10, padding: "10px 14px", fontSize: 22, fontWeight: 900, color: C.no }}>4</div>
              <div style={{ fontSize: 10, color: C.no, fontWeight: 700, marginTop: 4 }}>{t(E, "fixed", "고정")}</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>1</div>
            </div>
            <div style={{ alignSelf: "center", fontSize: 18, color: C.dim, fontWeight: 800 }}>×</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 10, padding: "10px 14px", fontSize: 22, fontWeight: 900, color: C.carry }}>?</div>
              <div style={{ fontSize: 10, color: C.carry, fontWeight: 700, marginTop: 4 }}>4~9</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>6</div>
            </div>
            <div style={{ alignSelf: "center", fontSize: 18, color: C.dim, fontWeight: 800 }}>×</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ background: C.lookBg, border: `2px solid ${C.lookBd}`, borderRadius: 10, padding: "10px 14px", fontSize: 22, fontWeight: 900, color: C.look }}>?</div>
              <div style={{ fontSize: 10, color: C.look, fontWeight: 700, marginTop: 4 }}>5~9</div>
              <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>5</div>
            </div>
          </div>

          {/* 예시 몇 개 */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center" }}>
              {t(E, "Examples", "예시")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: C.text }}>
              {["445", "447", "456", "468", "479", "495", "...", "498"].map((s, i) => (
                <span key={i} style={{ padding: "3px 8px", background: C.okBg, borderRadius: 6, color: C.ok }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{
            background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10,
            padding: 12, textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
          }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
              {t(E, "Formula (d=3)", "공식 (d=3)")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.accent }}>
              5 × 6<sup>3−2</sup> = 5 × 6<sup>1</sup> = 5 × 6
            </div>
          </div>
        </div>
      ),
    },
    // 5-2: 3-digit
    { type: "input",
      narr: t(E, "So how many 3-digit?", "3자리는 몇 개?"),
      question: "5 × 6¹ = ?", answer: 30,
    },
    // 5-3: N=1000 total — 자릿수별 분석 + 합계
    { type: "reveal",
      narr: t(E,
        "Now N=1000. Break it down by digit count.",
        "N=1000 일 때, 자릿수별로 몇 개씩인지 따져봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 60px", padding: "8px 12px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim }}>
              <span>{t(E, "digits", "자릿수")}</span>
              <span>{t(E, "what counts", "어떤 게 셈에 들어가나")}</span>
              <span style={{ textAlign: "right" }}>{t(E, "count", "개수")}</span>
            </div>
            {[
              { d: t(E, "1-digit", "1자리"), what: t(E, "(only 1 digit — no carry possible)", "(자리 하나뿐 → carry 못 함)"), count: 0, ok: false },
              { d: t(E, "2-digit", "2자리"), what: "45 46 47 48 49", count: 5, ok: true },
              { d: t(E, "3-digit", "3자리"), what: t(E, "4xx pattern (5 × 6¹)", "4xx 패턴 (5 × 6¹)"), count: 30, ok: true },
              { d: t(E, "4-digit", "4자리"), what: t(E, "only 1000, starts with 1 ≠ 4", "1000 만 있고, 첫째=1 ≠ 4"), count: 0, ok: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "70px 1fr 60px",
                padding: "8px 12px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                background: row.ok ? C.okBg : "#fafafa",
                color: row.ok ? C.ok : C.dim,
              }}>
                <span style={{ fontWeight: 800 }}>{row.d}</span>
                <span style={{ fontSize: 12 }}>{row.what}</span>
                <span style={{ textAlign: "right", fontWeight: 800 }}>{row.count}</span>
              </div>
            ))}
            <div style={{
              display: "grid", gridTemplateColumns: "70px 1fr 60px",
              padding: "10px 12px", background: C.accentBg, borderTop: `2px solid ${C.accentBd}`,
              color: C.accent, fontWeight: 900,
            }}>
              <span>{t(E, "Sum", "합계")}</span>
              <span style={{ fontSize: 11, fontWeight: 700 }}>0 + 5 + 30 + 0</span>
              <span style={{ textAlign: "right", fontSize: 16 }}>= ?</span>
            </div>
          </div>
        </div>
      ),
    },
    // 5-3b: 합계 한번 더 묻기
    { type: "input",
      narr: t(E, "So total for N=1000 is:", "그래서 N=1000 의 합계는:"),
      question: "5 + 30 = ?",
      hint: t(E, "1-digit and 4-digit (1000) contribute 0.", "1자리와 4자리 (1000) 는 0개씩."),
      answer: 35,
    },
    // (코드 단계는 5-7 의 ProgressiveCode 위젯에서 한꺼번에 인터랙티브하게 보여줌)
    // 5-4: 전략 — 더 친절하게 (구체 예시 N=473 으로)
    { type: "reveal",
      narr: t(E,
        "What if N = 473? Not round like 1000. Trick: split into two parts — easy + tricky.",
        "N 이 473 처럼 딱 떨어지지 않으면 어떻게 할까요? 두 부분으로 나누면 돼요 — 쉬운 부분 + 어려운 부분."),
      content: (
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.85 }}>
          {/* N=473 시각 */}
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700 }}>{t(E, "Example", "예시")}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.accent, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>N = 473</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>{t(E, "473 is 3-digit", "473 은 3자리")}</div>
          </div>

          {/* 부분 ① — 쉬운 부분 */}
          <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.ok, marginBottom: 6 }}>
              😊 {t(E, "Part 1: short numbers (1, 2-digit)", "쉬운 부분: 짧은 수 (1자리, 2자리)")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              {t(E, "All 2-digit ones — count them all with the formula:", "2자리는 다 포함되니까 — 공식 그대로:")}
              <div style={{ marginTop: 6, padding: "6px 10px", background: "#fff", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.ok, fontWeight: 800, textAlign: "center" }}>
                5 × 6⁰ = 5{t(E, " (45~49)", "개 (45~49)")}
              </div>
            </div>
          </div>

          {/* 부분 ② — 어려운 부분 */}
          <div style={{ background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.carry, marginBottom: 6 }}>
              🤔 {t(E, "Part 2: same digit count as N (3-digit, ≤ 473)", "어려운 부분: N 과 같은 자릿수 (3자리, ≤ 473)")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              {t(E, "Can't use the formula directly (it counts ALL 3-digit). We have to be careful — only count up to 473.",
                  "3자리 수 전부가 아니라 473 까지만 세야 해요. 공식 못 써요 — 자릿수 하나씩 조심히!")}
            </div>
          </div>

          {/* 합치면 */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>
              {t(E, "Final answer = ", "최종 답 = ")}
              <strong style={{ color: C.ok }}>{t(E, "Part 1", "쉬운 부분")}</strong>
              {" + "}
              <strong style={{ color: C.carry }}>{t(E, "Part 2", "어려운 부분")}</strong>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: C.dim }}>
              👉 {t(E, "Next pages: tackle Part 2 step by step.",
                    "다음 페이지부터: 어려운 부분 차근차근 해볼게요.")}
            </div>
          </div>
        </div>
      ),
    },
    // 5-5: N=473 의 어려운 부분 — 표로 한눈에 (퀴즈 4개 → 시각 1개로)
    { type: "reveal",
      narr: t(E,
        "Part 2 for N=473: count 4__ numbers ≤ 473. Let's tabulate by middle digit.",
        "어려운 부분: 4__ 형태 (3자리, ≤ 473) 를 세요. 중간 자리 별로 표로 정리해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          {/* 슬롯 구조 보여주기 */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>{t(E, "Form", "형태")}</div>
            <div style={{ display: "inline-flex", gap: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 900 }}>
              <span style={{ color: C.no, padding: "4px 10px", background: C.noBg, borderRadius: 6, border: `2px solid ${C.noBd}` }}>4</span>
              <span style={{ color: C.carry, padding: "4px 10px", background: C.carryBg, borderRadius: 6, border: `2px solid ${C.carryBd}` }}>?</span>
              <span style={{ color: C.look, padding: "4px 10px", background: C.lookBg, borderRadius: 6, border: `2px solid ${C.lookBd}` }}>?</span>
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              {t(E, "first=4 (fixed), middle 4~9, last 5~9, AND ≤ 473",
                  "첫째=4 (고정), 중간 4~9, 마지막 5~9, 그리고 ≤ 473")}
            </div>
          </div>

          {/* 표 — 중간 자리별 케이스 */}
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 60px", padding: "8px 12px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim }}>
              <span>{t(E, "middle", "중간")}</span>
              <span>{t(E, "numbers", "수들")}</span>
              <span style={{ textAlign: "right" }}>{t(E, "count", "개수")}</span>
            </div>
            {[
              { mid: 4, nums: "445 446 447 448 449", count: 5, ok: true },
              { mid: 5, nums: "455 456 457 458 459", count: 5, ok: true },
              { mid: 6, nums: "465 466 467 468 469", count: 5, ok: true },
              { mid: 7, nums: t(E, "need ≥5 AND ≤3 → impossible", "마지막은 ≥5 AND ≤3 → 불가능"), count: 0, ok: false, special: true },
              { mid: 8, nums: t(E, "480~ > 473 ❌", "480~ > 473 ❌"), count: 0, ok: false },
              { mid: 9, nums: t(E, "490~ > 473 ❌", "490~ > 473 ❌"), count: 0, ok: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 60px",
                padding: "7px 12px", borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
                background: row.ok ? C.okBg : (row.special ? C.carryBg : "#fafafa"),
                color: row.ok ? C.ok : (row.special ? C.carry : C.dim),
              }}>
                <span style={{ fontWeight: 800 }}>{row.mid}</span>
                <span style={{ fontSize: 12 }}>{row.nums}</span>
                <span style={{ textAlign: "right", fontWeight: 800 }}>{row.count}</span>
              </div>
            ))}
            <div style={{
              display: "grid", gridTemplateColumns: "60px 1fr 60px",
              padding: "10px 12px", background: C.accentBg, borderTop: `2px solid ${C.accentBd}`,
              color: C.accent, fontWeight: 900,
            }}>
              <span>{t(E, "Sum", "합계")}</span>
              <span></span>
              <span style={{ textAlign: "right", fontSize: 16 }}>15</span>
            </div>
          </div>

          {/* 두 부분 합치기 시각 */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap", fontFamily: "'JetBrains Mono',monospace" }}>
            <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.ok, fontWeight: 700 }}>{t(E, "Part 1 (2-digit)", "쉬운 부분 (2자리)")}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.ok }}>5</div>
            </div>
            <span style={{ fontSize: 18, color: C.dim, fontWeight: 800 }}>+</span>
            <div style={{ background: C.carryBg, border: `2px solid ${C.carryBd}`, borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.carry, fontWeight: 700 }}>{t(E, "Part 2 (3-digit)", "어려운 부분 (3자리)")}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.carry }}>15</div>
            </div>
            <span style={{ fontSize: 18, color: C.dim, fontWeight: 800 }}>=</span>
            <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.accent, fontWeight: 700 }}>{t(E, "Total", "전체")}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.accent }}>?</div>
            </div>
          </div>
        </div>
      ),
    },

    // 5-6: 합계 한 번만 묻기
    { type: "input",
      narr: t(E,
        "Combine: easy part (2-digit) = 5, tricky part (3-digit, ≤473) = 15. Total?",
        "합쳐요: 쉬운 부분 (2자리) = 5, 어려운 부분 (3자리, ≤473) = 15. 합계?"),
      question: "5 + 15 = ?",
      hint: t(E, "Part 1 + Part 2.", "쉬운 부분 + 어려운 부분."),
      answer: 20,
    },
    // 5-7: 인터랙티브 코드 위젯 (Python/C++ 토글 + PDF 다운로드)
    { type: "progressive",
      narr: t(E,
        "Pick a part to see its code + reasoning. Toggle Python ↔ C++. Save as PDF for later.",
        "버튼 눌러서 부분별 코드 + 이유 확인. Python ↔ C++ 토글. PDF 저장해서 나중에 보기."),
      sections: getOptSections(E),
    },
  ];
}

// Optimization 섹션 (ProgressiveCode 위젯 + 헤더 PDF 버튼 둘 다에서 사용)
export function getOptSections(E) {
  return [
        {
          label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
          color: C.accent, bgColor: C.accentBg,
          py: OPT_INPUT, cpp: OPT_INPUT_CPP,
          why: [
            t(E,
              "Fast input (sys.stdin.readline / ios::sync_with_stdio false) — important when T is big.",
              "빠른 입력 (sys.stdin.readline / ios::sync_with_stdio false) — T 가 크면 필수."),
            t(E,
              "N < 10 means N is 1-digit. No tens place to carry into → answer is 0. Skip early.",
              "N < 10 이면 1자리. carry 할 10의자리가 없어서 답 0. 미리 빠짐."),
            t(E,
              "D = digit count of N. Both the formula and the tricky case need D.",
              "D = N 의 자릿수. 공식도 어려운 부분도 D 가 필요."),
            t(E,
              "result = 0 — running counter we'll add to in steps 2 and 3.",
              "result = 0 — 2단계, 3단계에서 계속 더해갈 카운터."),
          ],
        },
        {
          label: t(E, "✅ 2. Easy Part", "✅ 2. 쉬운 부분"),
          color: C.ok, bgColor: C.okBg,
          py: OPT_EASY, cpp: OPT_EASY_CPP,
          why: [
            t(E,
              "Loop d = 2 to D−1: any number with FEWER digits than N is automatically ≤ N → formula safe.",
              "d = 2 부터 D−1 까지: N 보다 자릿수 적은 수는 무조건 ≤ N → 공식 그대로 안전."),
            t(E,
              "Stop BEFORE D: D-digit numbers may exceed N (e.g. N=473, 800 > 473). That's step 3's job.",
              "D 직전까지만: D 자리는 N 을 넘을 수도 있음 (예: N=473, 800 > 473). 그건 3단계 담당."),
            t(E,
              "5 × 6^(d−2) = pattern formula. first=4 (1 choice) × middle d−2 digits each 4~9 (6 choices) × last 5~9 (5 choices).",
              "5 × 6^(d−2) = 패턴 공식. 첫째=4 (1) × 중간 d−2 자리 각각 4~9 (6) × 마지막 5~9 (5)."),
          ],
        },
        {
          label: t(E, "🤔 3. Tricky Part", "🤔 3. 어려운 부분"),
          color: C.carry, bgColor: C.carryBg,
          py: OPT_TRICKY, cpp: OPT_TRICKY_CPP,
          why: [
            t(E,
              "Look at first = first digit of N. Three cases.",
              "first = N 의 첫째 자리. 3 가지 경우로 나눔."),
            t(E,
              "first > 4 (5~9): every 4xxxx pattern < N. Use full formula 5 × 6^(D−2) directly.",
              "first > 4 (5~9): 모든 4xxxx 패턴 < N. 공식 5 × 6^(D−2) 통째로 사용."),
            t(E,
              "first == 4: matches pattern. Walk digits one-by-one, careful not to exceed N.",
              "first == 4: 패턴과 일치. 자리 하나씩 따라가면서 N 안 넘게 조심."),
            t(E,
              "Middle digit ≥ 4: digits 4..digit−1 are free (extra × remaining slots × 5 last-choices). Then 'lock in' and continue.",
              "중간 자리 ≥ 4: 4..digit−1 은 자유 (extra × 남은 자리 × 마지막 5). 그리고 '확정' 후 다음 자리로."),
            t(E,
              "if digit < 4: break. Pattern needs middle ≥ 4 but N's digit is smaller → can't fit anymore.",
              "if digit < 4: break. 패턴은 중간 ≥ 4 필요한데 N 의 그 자리가 더 작음 → 더 못 넣음."),
            t(E,
              "Last digit: pattern needs ≥ 5. Count 5,6,…,digit (= digit − 5 + 1 numbers).",
              "마지막 자리: ≥ 5 필요. 5,6,…,digit 셈 (= digit − 5 + 1 개)."),
            t(E,
              "first < 4 (e.g. 1,2,3): every 4xxxx > N → 0 contribution. Add nothing.",
              "first < 4 (예: 1,2,3): 모든 4xxxx > N → 0. 아무것도 안 더함."),
          ],
        },
        {
          label: t(E, "🎯 Full Code", "🎯 전체 코드"),
          color: C.accent, bgColor: C.accentBg,
          py: OPT_CODE, cpp: OPT_CODE_CPP,
          why: [
            t(E,
              "Each query touches D = log10(N) digits at most. T queries → O(T · log N).",
              "쿼리 하나당 D = log10(N) 자리만 봄. T 쿼리 → O(T · log N)."),
            t(E,
              "Brute was O(T · N). For N = 10⁹: ~10 ops vs ~10⁹ ops per query — speedup ≈ 10⁸×.",
              "브루트는 O(T · N). N = 10⁹ 면: 쿼리당 ~10 연산 vs ~10⁹. 약 10⁸ 배 빠름."),
            t(E,
              "Tip: download as PDF (button above) for offline study.",
              "팁: 위 PDF 버튼 눌러서 다운받으면 오프라인에서도 공부 가능."),
          ],
        },
  ];
}


// ═══════════════════════════════════════════════
// SIMULATOR VISUAL COMPONENTS
// ═══════════════════════════════════════════════

export function FindPView({ step }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ fontSize: 48, fontWeight: 800, color: C.accent }}>{step.number}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280, margin: "0 auto" }}>
        {step.pList.map((ps, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px", borderRadius: 10,
            background: ps.ok ? C.okBg : C.card, border: `2px solid ${ps.ok ? C.okBd : C.border}`,
            animation: i === step.pList.length - 1 ? "popIn .3s cubic-bezier(.34,1.56,.64,1)" : "none",
          }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: ps.ok ? C.ok : C.text, fontFamily: "'JetBrains Mono',monospace" }}>10{sup(ps.p)}={ps.v}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: ps.ok ? C.ok : C.no }}>{ps.ok ? `≥${step.number}✓` : `<${step.number}✗`}</span>
          </div>
        ))}
      </div>
      {step.pFound > 0 && (
        <div style={{ textAlign: "center", marginTop: 14, animation: "popIn .3s cubic-bezier(.34,1.56,.64,1)" }}>
          <span style={{ display: "inline-block", background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: "8px 22px", fontSize: 18, fontWeight: 800, color: C.accent, fontFamily: "'JetBrains Mono',monospace" }}>P={step.pFound}!</span>
        </div>
      )}
    </div>
  );
}

export function FindPExplainView({ step }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
        {step.digits.map((d, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{
              width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 9, fontSize: 22, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
              background: i === 0 ? C.lookBg : C.carryBg,
              border: `2px solid ${i === 0 ? C.lookBd : C.carryBd}`,
              color: i === 0 ? C.look : C.carry,
            }}>{d}</div>
            <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: i === 0 ? C.look : C.carry }}>
              {i === 0 ? `P=${step.P}` : "→0"}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          {step.possibleResults.map((r, i) => (
            <div key={i} style={{
              padding: "8px 20px", borderRadius: 10, background: C.accentBg,
              border: `2px solid ${C.accentBd}`, fontSize: 22, fontWeight: 800,
              color: C.accent, fontFamily: "'JetBrains Mono',monospace",
            }}>{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DigitsView({ step, E }) {
  const { digits, focusIdx, bubble, bubbleType, bRef } = step;
  const styles = {
    look:  { bg: C.lookBg,  bd: C.lookBd,  c: C.look },
    carry: { bg: C.carryBg, bd: C.carryBd, c: C.carry },
    dim:   { bg: "#f1f5f9", bd: "#cbd5e1", c: "#64748b" },
  };
  const bc = styles[bubbleType] || styles.look;
  const hasFocus = focusIdx >= 0;

  return (
    <div style={{ padding: "12px 16px" }}>
      <div style={{ display: "flex", justifyContent: "center", minHeight: 36, alignItems: "flex-end", paddingBottom: 4 }}>
        {hasFocus && bubble && (
          <div style={{
            background: bc.bg, border: `2px solid ${bc.bd}`, borderRadius: 10,
            padding: "4px 14px", fontSize: 14, fontWeight: 800, color: bc.c,
            fontFamily: "'JetBrains Mono',monospace", textAlign: "center",
            whiteSpace: "pre-line", lineHeight: 1.5,
            animation: "popIn .25s cubic-bezier(.34,1.56,.64,1)",
          }}>{bubble}</div>
        )}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 6 }}>
        {digits.map((d, i) => {
          const isF = i === focusIdx;
          const inactive = hasFocus && !isF;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              {isF && bubble ? <div style={{ fontSize: 12, color: bc.c, lineHeight: 1 }}>▼</div> : <div style={{ height: 12 }} />}
              <div style={{
                width: isF ? 54 : 42, height: isF ? 54 : 42,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: isF ? 13 : 9, fontSize: isF ? 28 : 20, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
                background: isF ? bc.bg : C.card,
                border: `${isF ? 3 : 2}px solid ${isF ? bc.bd : C.border}`,
                color: inactive ? C.dimLight : isF ? bc.c : C.text,
                transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
              }}>{d}</div>
              <div style={{ fontSize: 9, color: inactive ? "#ddd" : C.dimLight, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>
                {posName(digits.length - i, E)}
              </div>
            </div>
          );
        })}
      </div>
      {bRef !== undefined && (
        <div style={{ textAlign: "center", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: C.bessie, fontWeight: 700, background: C.bessieBg, borderRadius: 6, padding: "3px 10px", border: `1px solid ${C.bessieBd}`, fontFamily: "'JetBrains Mono',monospace" }}>🐄 {bRef}</span>
        </div>
      )}
    </div>
  );
}

export function ResultView({ step }) {
  const isB = step.phase === "bessie_result";
  const col = isB ? C.bessie : C.elsie;
  const bg  = isB ? C.bessieBg : C.elsieBg;
  const bd  = isB ? C.bessieBd : C.elsieBd;
  return (
    <div style={{ padding: "28px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.dim, marginBottom: 6 }}>{isB ? "🐄 Bessie" : "🐮 Elsie"}</div>
      <div style={{
        display: "inline-block", background: `linear-gradient(135deg,${bg},${bd}33)`,
        border: `3px solid ${bd}`, borderRadius: 20, padding: "16px 40px",
        boxShadow: `0 6px 24px ${bd}44`, animation: "popIn .4s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: col, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{step.result}</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 13, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{step.number} → {step.result}</div>
    </div>
  );
}

export function CompareView({ step }) {
  const borderCol = step.isDiff ? C.noBd : C.okBd;
  const numCol    = step.isDiff ? C.no  : C.ok;
  const cards = [
    { emoji: "🐄", name: "Bessie", val: step.bessie, bg: C.bessieBg, nameCol: C.bessie },
    { emoji: "🐮", name: "Elsie",  val: step.elsie,  bg: C.elsieBg,  nameCol: C.elsie  },
  ];
  return (
    <div style={{ padding: "20px 16px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontFamily: "'JetBrains Mono',monospace" }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: c.bg, borderRadius: 14, padding: "10px 22px", border: `2px solid ${borderCol}` }}>
            <div style={{ fontSize: 22, marginBottom: 0 }}>{c.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: c.nameCol, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>{c.name}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: numCol }}>{c.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════
   Multi6Sim — 6 가지 SIM_CASES 중 선택해서 InlineSim 으로 보여줌.
   (이전 별도 시뮬 탭의 핵심을 챕터 1 안으로 흡수)
   ════════════════════════════════════════════ */
export function Multi6Sim({ E }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const cs = SIM_CASES[caseIdx];
  return (
    <div>
      {/* 6 케이스 선택 */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        {SIM_CASES.map((c, i) => (
          <button
            key={i}
            onClick={() => setCaseIdx(i)}
            style={{
              background: i === caseIdx ? C.card : "transparent",
              border: `2px solid ${i === caseIdx ? C.accent : C.border}`,
              borderRadius: 8, padding: "5px 10px", cursor: "pointer",
              transition: "all .15s",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: i === caseIdx ? C.accent : C.dim }}>
              {c.num}
            </span>
            <span style={{ fontSize: 10, marginLeft: 3, fontWeight: 700, color: c.diff ? C.no : C.ok }}>
              {c.diff ? "❌" : "✅"}
            </span>
          </button>
        ))}
      </div>
      {/* 선택한 케이스의 인라인 시뮬 — key 로 리셋 */}
      <InlineSim key={caseIdx} x={cs.num} E={E} />
    </div>
  );
}


/* ════════════════════════════════════════════
   InlineSim — chapter 1 안에서 x=48 의 시뮬을
   직접 단계별로 보여주는 mini-sim. splash 는 제외.
   ════════════════════════════════════════════ */
export function InlineSim({ x = 48, E }) {
  const all = buildSimSteps(x, E);
  // splash (전체화면 등장 효과) 는 인라인에서 제외
  const steps = all.filter(s => s.phase !== "splash");
  const [si, setSi] = useState(0);
  const cur = Math.min(si, steps.length - 1);
  const step = steps[cur];

  const renderStep = () => {
    if (step.phase === "findP")          return <FindPView step={step} />;
    if (step.phase === "findP_explain")  return <FindPExplainView step={step} />;
    if (step.phase === "bessie" || step.phase === "elsie") return <DigitsView step={step} E={E} />;
    if (step.phase === "bessie_result" || step.phase === "elsie_result") return <ResultView step={step} />;
    if (step.phase === "compare")        return <CompareView step={step} />;
    return null;
  };

  // 단계 배경색 — 어느 파트인지 시각적으로 구분
  const bg =
    step.phase?.startsWith("bessie") ? C.bessieBg :
    step.phase?.startsWith("elsie")  ? C.elsieBg  :
    step.phase === "compare"         ? (step.isDiff ? C.noBg : C.okBg) :
    "#f8f9fc";

  return (
    <div style={{ background: C.card, border: `2px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      {/* narration */}
      {step.narr && (
        <div style={{
          padding: "10px 14px", fontSize: 13, fontWeight: 700, color: C.text,
          background: bg, borderBottom: `1.5px solid ${C.border}`,
        }}>{step.narr}</div>
      )}
      {/* 단계 본문 */}
      <div style={{ minHeight: 180 }}>
        {renderStep()}
      </div>
      {/* 네비게이션 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        padding: "10px 12px", borderTop: `1.5px solid ${C.border}`, background: "#f8f9fc",
      }}>
        <button
          onClick={() => setSi(Math.max(0, cur - 1))}
          disabled={cur === 0}
          style={{
            background: cur === 0 ? "#e5e7eb" : C.card,
            border: `2px solid ${cur === 0 ? "#e5e7eb" : C.accent}`,
            borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 800,
            color: cur === 0 ? "#b0b5c3" : C.accent, cursor: cur === 0 ? "default" : "pointer",
          }}
        >←</button>
        <span style={{ fontSize: 12, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", minWidth: 50, textAlign: "center" }}>
          {cur + 1} / {steps.length}
        </span>
        <button
          onClick={() => setSi(Math.min(steps.length - 1, cur + 1))}
          disabled={cur === steps.length - 1}
          style={{
            background: cur === steps.length - 1 ? "#e5e7eb" : C.accent,
            border: `2px solid ${cur === steps.length - 1 ? "#e5e7eb" : C.accent}`,
            borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 800,
            color: cur === steps.length - 1 ? "#b0b5c3" : "#fff", cursor: cur === steps.length - 1 ? "default" : "pointer",
          }}
        >→</button>
      </div>
    </div>
  );
}
