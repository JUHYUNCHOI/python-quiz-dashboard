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
   Step types: "reveal" | "quiz" | "input" | "runner" | "code" | "compare3" | "scale" | "progressive"
   ================================================================ */

// --- Sim case list ---
export const SIM_CASES = [
  { num: 48, diff: true }, { num: 67, diff: false }, { num: 38, diff: false },
  { num: 445, diff: true }, { num: 435, diff: false }, { num: 4459, diff: true },
];

// ═══════════════════════════════════════════════
// Chapter 1: 📋 Problem Introduction
// ═══════════════════════════════════════════════
export function makeCh1(E) {
  return [
    { type: "reveal", narr: t(E, "Two cows (Bessie and Elsie) have different rounding methods.\nThe same number can give different answers — and we count how many such numbers exist.", "두 소 (Bessie 와 Elsie) 의 반올림 방식이 서로 달라서, 같은 수에 대해 답이 다르게 나올 수 있어요. 그런 수가 몇 개인지 세는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
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
    { type: "reveal", narr: t(E, "Input is one number N.\nOutput is the count of numbers in 2..N where Bessie and Elsie disagree.", "입력은 숫자 N 하나. 출력은 2 부터 N 까지 중에서 Bessie 와 Elsie 의 답이 다른 수의 개수예요."),
      content: (
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.8 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace" }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: C.accent }}>N</span>
              <span style={{ fontSize: 12, color: C.dim, marginLeft: 8 }}>{t(E, "(1 ~ 10⁹)", "(1 부터 10⁹ 까지)")}</span>
            </div>
          </div>

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

          <div style={{ background: "#fff7ed", border: `2px solid #fdba74`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", marginBottom: 8 }}>📌 {t(E, "Example", "예시")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2, color: C.text }}>
              <div>{t(E, "Input:", "입력:")}  <strong>N = 100</strong></div>
              <div>{t(E, "Output:", "출력:")} <strong style={{ color: "#c2410c", fontSize: 18 }}>5</strong></div>
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.6 }}>
              {t(E, "→ Among 2~100, Bessie and Elsie disagree on 5 numbers (we'll see which ones later).", "→ 2 부터 100 사이 수 중에서, 두 답이 다른 수가 5 개라는 뜻이에요.\n(어떤 5 개인지는 뒤에서!)")}
            </div>
          </div>
        </div>
      ),
    },
    { type: "reveal", narr: t(E, "Finding P is the key for this problem. So what's the condition for P? Let's observe.", "이 문제는 P 를 구하는 게 핵심이에요. 그럼 P 의 조건은 뭘까요? 함께 관찰해봐요."),
      content: (
        <div style={{ padding: 16, fontSize: 14, lineHeight: 1.85 }}>
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
    { type: "reveal", narr: t(E, "Two different rounding methods!", "Bessie와 Elsie가 반올림하는 방법이 서로 달라요! 누가 맞을까?"),
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
    { type: "reveal", narr: t(E, "Example: x=48. Click → to step through Bessie's and Elsie's reasoning.", "예시: x=48. 아래에서 → 버튼을 눌러가며 Bessie / Elsie 의 과정을 단계별로 따라가봐요."),
      content: (
        <div style={{ padding: 12 }}>
          <InlineSim x={48} E={E} />
        </div>
      ),
    },

    { type: "reveal", narr: t(E,
      "48 isn't the only one. Try other numbers: some agree, some disagree. Spot anything?", "48 만 그런 게 아니에요. 다른 숫자도 골라봐요. ✅ 같은 것도 있고 ❌ 다른 것도 있어요. 뭔가 보이나요?"),
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
// SIMULATOR step builder (used by InlineSim / Multi6Sim)
// ═══════════════════════════════════════════════
export function buildSimSteps(x, E) {
  const s = String(x), len = s.length, digits = s.split("").map(Number);
  const top = digits[0], bResult = top >= 5 ? pw(len) : 0;
  const pn = p => posName(p, E);
  const steps = [];

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

  steps.push({
    phase: "findP_explain", number: x, P: len,
    possibleResults: [0, pw(len)], digits,
    narr: t(E, `P=${len} → round to 10${sup(len)}! Result is 0 or ${pw(len)}.`, `P=${len} → 10${sup(len)}로 반올림! 결과는 0 또는 ${pw(len)}.`),
  });

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
      ? t(E, `❌ ${bResult} vs ${eResult} — Different!`, `❌ ${bResult} vs ${eResult} — 달라요!`)
      : t(E, `✅ Both ${bResult} — Same!`, `✅ 둘 다 ${bResult} — 같아요!`),
    bessie: bResult, elsie: eResult, isDiff });

  return steps;
}


// ═══════════════════════════════════════════════
// Chapter 3: 💡 Pattern Discovery
// ═══════════════════════════════════════════════
export function makePatternSteps(E) {
  return [
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
    { type: "quiz",
      narr: t(E, "Look at only ❌: 48, 445, 4459", "❌인 수만 모아봤: 48, 445, 4459. 이 세 수의 공통점이 보여요?"),
      question: t(E, "What do these three have in common?", "이 세 수의 공통점은?"),
      hint: t(E, "Look at the first digit!", "첫째 자리를 봐요!"),
      options: t(E,
        ["First digit always even", "First digit always 4", "All divisible by 8", "Even number of digits"],
        ["첫째 자리가 짝수", "첫째 자리가 전부 4", "전부 8의 배수", "자릿수가 짝수"]),
      correct: 1,
      explain: t(E, "All start with 4! That's the key.", "전부 4로 시작해요! 이게 핵심이에요."),
    },
    { type: "quiz",
      narr: t(E, "Why 4? Remember, Bessie only checks the first digit.", "왜 4일까요? Bessie는 첫째 자리만 보잖아요."),
      question: t(E, "First digit is 4 — Bessie rounds up or down?", "첫째 자리가 4면, Bessie는 올릴까 버릴까?"),
      options: t(E, ["Up (4 ≥ 5)", "Down (4 < 5)"], ["올린다 (4 ≥ 5)", "버린다 (4 < 5)"]),
      correct: 1,
      explain: t(E, "4 < 5 → Bessie rounds down → result 0!", "4 < 5 → 버린다 → 결과 0!"),
    },
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
    { type: "reveal",
      narr: t(E,
        "Let's see what happens for each first digit when Elsie's carry reaches it.", "Elsie 의 carry 가 첫째 자리에 닿았을 때 어떻게 되는지 — 첫째 자리별로 한눈에 봐요."),
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
              { f: "1~3", b: "<5 → 0", e: t(E, "+1 → 2~4, still <5 → 0",      "+1 → 2~4, 여전히 <5 → 0"),  same: true  },
              { f: "4",    b: "<5 → 0", e: t(E, "+1 → 5, now ≥5 → 10ᴾ",       "+1 → 5, 이제 ≥5 → 10ᴾ"), same: false },
              { f: "5~9", b: "≥5 → 10ᴾ", e: t(E, "already rounded up → 10ᴾ", "이미 올림 → 10ᴾ"),         same: true  },
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

    { type: "reveal",
      narr: t(E,
        "But first=4 alone isn't enough!\nCarry must REACH the first digit.\nCompare 445 vs 435 side by side.", "근데 첫째=4 만으로는 부족해요! carry 가 첫째까지 도달해야 해요. 445 와 435 를 나란히 비교해봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 12 }}>
            <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 12, padding: 12 }}>
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: 900, color: C.no, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
                445
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
                <div>{t(E, "last", "마지막")}: <strong style={{ color: C.carry }}>5</strong> ≥5 → carry ↑</div>
                <div>{t(E, "middle", "중간")}: <strong style={{ color: C.no }}>4</strong>+1=<strong style={{ color: C.no }}>5</strong>, 5≥5 → carry ↑</div>
                <div>{t(E, "first", "첫째")}: <strong style={{ color: C.no }}>4</strong>+1=<strong style={{ color: C.no }}>5</strong>, 5≥5 → 1000</div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 10px", background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text }}>
                Bessie: 0 / Elsie: 1000
              </div>
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 16, fontWeight: 900, color: C.no }}>❌ {t(E, "different", "다름")}</div>
            </div>

            <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 12, padding: 12 }}>
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: 900, color: C.ok, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
                435
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
                <div>{t(E, "last", "마지막")}: <strong style={{ color: C.carry }}>5</strong> ≥5 → carry ↑</div>
                <div>{t(E, "middle", "중간")}: <strong style={{ color: C.ok }}>3</strong>+1=<strong style={{ color: C.ok }}>4</strong>, 4&lt;5 → <strong style={{ color: C.ok }}>{t(E, "stop!", "멈춤!")}</strong></div>
                <div>{t(E, "first", "첫째")}: <strong>4</strong> {t(E, "(carry didn't arrive)", "그대로 (carry 안 옴)")} → 0</div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 10px", background: "#fff", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.text }}>
                Bessie: 0 / Elsie: 0
              </div>
              <div style={{ marginTop: 8, textAlign: "center", fontSize: 16, fontWeight: 900, color: C.ok }}>✓ {t(E, "same", "같음")}</div>
            </div>
          </div>

          <div style={{ padding: "12px 14px", background: "#fef3c7", border: `2px solid #fcd34d`, borderRadius: 10, fontSize: 13, color: "#a16207", fontWeight: 700, lineHeight: 1.7, textAlign: "center" }}>
            💡 {t(E, "Middle digit must be ≥4 — only then carry keeps going up to the first digit.",
                  "중간 자리가 ≥4 여야 carry 가 첫째까지 계속 올라가요.")}
          </div>
        </div>
      ),
    },
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
    { type: "reveal",
      narr: t(E,
        "Look at the SHAPE: smallest is 4…45 (d−1 fours + a 5), largest is 4 99…9 (a 4 + d−1 nines). All disagreeing d-digit numbers sit between these two — one contiguous block!",
        "모양을 봐요: 가장 작은 건 4…45 (d−1 개의 4 + 5 하나), 가장 큰 건 4 99…9 (4 하나 + d−1 개의 9). 답이 다른 d 자리 수는 이 둘 사이의 연속 구간이에요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr 60px", padding: "8px 10px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim }}>
              <span>d</span>
              <span>s<sub>d</sub> {t(E, "(smallest)", "(최소)")}</span>
              <span>e<sub>d</sub> {t(E, "(largest)", "(최대)")}</span>
              <span style={{ textAlign: "right" }}>{t(E, "count", "개수")}</span>
            </div>
            {[
              { d: 2, s: "45",     e: "49",      c: 5 },
              { d: 3, s: "445",    e: "499",     c: 55 },
              { d: 4, s: "4445",   e: "4999",    c: 555 },
              { d: 5, s: "44445",  e: "49999",   c: 5555 },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "40px 1fr 1fr 60px",
                padding: "8px 10px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
              }}>
                <span style={{ fontWeight: 800, color: C.accent }}>{row.d}</span>
                <span style={{ color: C.no, fontWeight: 700 }}>{row.s}</span>
                <span style={{ color: C.ok, fontWeight: 700 }}>{row.e}</span>
                <span style={{ textAlign: "right", fontWeight: 800, color: C.accent }}>{row.c}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, fontSize: 13, color: C.accent, fontWeight: 800, textAlign: "center", lineHeight: 1.6 }}>
            💡 {t(E, "Count for d-digit = e_d − s_d + 1. No exponentiation needed!",
                  "d 자리 개수 = e_d − s_d + 1. 거듭제곱 필요 없음!")}
          </div>
        </div>
      ),
    },

    { type: "input",
      narr: t(E,
        "Try it: how many 2-digit numbers? (s_2=45, e_2=49)", "직접 세보기: 2자리는 몇 개? (s_2=45, e_2=49)"),
      question: "49 − 45 + 1 = ?",
      hint: t(E, "Just subtract and add 1.", "그냥 빼고 1 더해요."),
      answer: 5,
    },
    { type: "input",
      narr: t(E,
        "Now 3-digit. (s_3=445, e_3=499)", "3자리는? (s_3=445, e_3=499)"),
      question: "499 − 445 + 1 = ?",
      answer: 55,
    },
  ];
}


// ═══════════════════════════════════════════════
// Chapter 4: 🐍 Brute Force
// ═══════════════════════════════════════════════

const BF_P = (E) => [
  E ? "# Both functions need P first" : "# 두 함수 모두 먼저 P 가 필요해요",
  E ? "# P = number of digits of x"   : "# P = x 의 자릿수",
  "",
  "x = 48",
  "P = len(str(x))     # → 2",
  "",
  "x = 4459",
  "P = len(str(x))     # → 4",
];
const BF_P_CPP = (E) => [
  E ? "// Both functions need P first" : "// 두 함수 모두 먼저 P 가 필요해요",
  E ? "// P = number of digits of x — same as Python's len(str(x))" : "// P = x 의 자릿수 — Python 의 len(str(x)) 와 동일",
  "",
  "int x = 48;",
  E ? "string s = to_string(x);   // \"48\"" : "string s = to_string(x);   // \"48\"",
  E ? "int P = s.length();        // → 2" : "int P = s.length();        // → 2",
  "",
  "x = 4459;",
  "s = to_string(x);          // \"4459\"",
  "P = s.length();            // → 4",
];

const BF_ELSIE_DIGIT = (E) => [
  E ? "# How do we extract the pos-th digit?"   : "# pos 번째 자리 숫자 어떻게 가져오지?",
  E ? "# (pos 1 = ones, 2 = tens, 3 = hundreds, ...)" : "# (1자리=ones, 2자리=tens, 3자리=hundreds, ...)",
  "",
  E ? "cur = 4459          # example" : "cur = 4459          # 예시",
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
const BF_ELSIE_DIGIT_CPP = (E) => [
  E ? "// How do we extract the pos-th digit?" : "// pos 번째 자리 숫자 어떻게 가져오지?",
  E ? "// (divide by 10^(pos-1) to drop that digit to the ones place, then % 10)" : "// (10^(pos-1) 로 나눠서 그 자리를 ones 위치까지 내리고, % 10)",
  "",
  E ? "int cur = 4459;             // example" : "int cur = 4459;             // 예시",
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

const BF_ELSIE_CARRY = (E) => [
  E ? "# If digit ≥5, carry +1 to the next position" : "# 그 자리가 ≥5 면 다음 자리로 +1 올림",
  "cur += 10**pos",
  "",
  E ? "# Zero out everything from that position down" : "# 그 자리 이하는 0 으로 (잘라내기)",
  "cur = (cur // 10**pos) * 10**pos",
  "",
  E ? "# Example: cur=58, pos=1"        : "# 예: cur=58, pos=1",
  "# 58 → +10 → 68 → //10*10 → 60",
  E ? "# (ones digit 8 ≥5 so it carries; ones itself becomes 0)" : "# (1의자리 8 이 ≥5 라서 올라가고, 1의자리 자체는 0)",
];
const BF_ELSIE_CARRY_CPP = (E) => [
  E ? "// If digit ≥5, carry +1 to the next position" : "// 그 자리가 ≥5 면 다음 자리로 +1 올림",
  E ? "int pw = 1;                  // precompute 10^pos" : "int pw = 1;                  // 10^pos 미리 계산",
  "for (int i = 0; i < pos; i++) pw *= 10;",
  "",
  E ? "cur += pw;                   // +1 to upper digit"        : "cur += pw;                   // 위 자리 +1",
  E ? "cur = (cur / pw) * pw;       // zero out everything below" : "cur = (cur / pw) * pw;       // 그 자리 이하는 0",
  "",
  E ? "// Example: cur=58, pos=1, pw=10" : "// 예: cur=58, pos=1, pw=10",
  "// 58 → +10 → 68 → /10*10 → 60",
  E ? "// (ones digit 8 ≥5 so it carries; ones itself becomes 0)" : "// (1의자리 8 이 ≥5 라서 올라가고, 1의자리 자체는 0)",
];

const BF_INPUT = (E) => [
  "import sys",
  "input = sys.stdin.readline",
  "",
  E ? "T = int(input())          # number of test cases" : "T = int(input())          # 테스트케이스 개수",
  "for _ in range(T):",
  E ? "    N = int(input())      # N for each test"      : "    N = int(input())      # 매 테스트마다 N",
  E ? "    # ... now compute the answer for 2 ~ N"        : "    # ... 이제 2 ~ N 의 답을 구해야 함",
];
const BF_INPUT_CPP = (E) => [
  "#include <iostream>",
  "using namespace std;",
  "",
  "int main() {",
  E ? "    int T; cin >> T;                  // number of test cases" : "    int T; cin >> T;                  // 테스트케이스 개수",
  E ? "    for (int t = 0; t < T; t++) {     // repeat T times" : "    for (int t = 0; t < T; t++) {     // T 번 반복",
  E ? "        int N; cin >> N;              // N for each test"        : "        int N; cin >> N;              // 매 테스트마다 N",
  E ? "        // ... now compute the answer for 2 ~ N"            : "        // ... 이제 2 ~ N 의 답을 구해야 함",
  "    }",
  "}",
];

const BF_BESSIE = (E) => [
  "def Bessie(x):",
  E ? "    s = str(x)              # to string"   : "    s = str(x)              # 문자열로",
  E ? "    P = len(s)              # P = digit count" : "    P = len(s)              # P = 자릿수",
  "",
  E ? "    # look only at the first digit" : "    # 첫째 자리만 본다",
  "    first_digit = int(s[0])",
  "",
  "    if first_digit >= 5:",
  E ? "        return 10**P        # ≥5 → round up" : "        return 10**P        # ≥5 → 올림",
  "    else:",
  "        return 0            # <5 → 0",
];
const BF_BESSIE_CPP = (E) => [
  E ? "// 10^n helper" : "// 10^n 헬퍼",
  "int pw10(int n) {",
  "    int r = 1;",
  "    for (int i = 0; i < n; i++) {",
  "        r *= 10;",
  "    }",
  "    return r;",
  "}",
  "",
  "int Bessie(int x) {",
  E ? "    string s = to_string(x);  // number → string"   : "    string s = to_string(x);  // 숫자 → 문자열",
  E ? "    int P = s.length();       // P = digit count" : "    int P = s.length();       // P = 자릿수",
  "",
  E ? "    // strip down until < 10 → that's the first digit" : "    // 10 보다 작아질 때까지 나누면 첫째 자리만 남음",
  "    int first_digit = x;",
  "    while (first_digit >= 10) {",
  "        first_digit /= 10;",
  "    }",
  "",
  "    if (first_digit >= 5) {",
  E ? "        return pw10(P);  // ≥5 → round up" : "        return pw10(P);  // ≥5 → 올림",
  "    } else {",
  "        return 0;        // <5 → 0",
  "    }",
  "}",
];

const BF_ELSIE = (E) => [
  "def Elsie(x):",
  "    P = len(str(x))",
  "    cur = x",
  "",
  E ? "    # walk from ones place to P-th place" : "    # 1자리부터 P자리까지 순서대로",
  "    for pos in range(1, P+1):",
  E ? "        # the digit at that position" : "        # 그 자리의 숫자",
  "        d = (cur // 10**(pos-1)) % 10",
  "",
  E ? "        # if ≥5, round up" : "        # ≥5 면 올림",
  "        if d >= 5:",
  "            cur += 10**pos",
  "",
  E ? "        # zero out everything from that position down" : "        # 그 자리 이하 0으로",
  "        cur = (cur // 10**pos) * 10**pos",
  "",
  "    return cur",
];
const BF_ELSIE_CPP = (E) => [
  "int Elsie(int x) {",
  E ? "    string s = to_string(x);" : "    string s = to_string(x);",
  E ? "    int P = s.length();" : "    int P = s.length();",
  "    int cur = x;",
  "",
  E ? "    // walk from ones place to P-th place" : "    // 1자리부터 P자리까지 순서대로",
  "    for (int pos = 1; pos <= P; pos++) {",
  E ? "        // the digit at that position" : "        // 그 자리의 숫자",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "",
  E ? "        // if ≥5, round up" : "        // ≥5 면 올림",
  "        if (d >= 5) {",
  "            cur += pw10(pos);",
  "        }",
  "",
  E ? "        // zero out everything from that position down" : "        // 그 자리 이하 0으로",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
];

const BF_FULL = (E) => [
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
const BF_FULL_CPP = (E) => [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  E ? "// 10 ^ n  (small n only — fine for our brute force)" : "// 10 의 n 제곱  (n 작을 때만 — brute 라 OK)",
  "int pw10(int n) {",
  "    int r = 1;",
  "    for (int i = 0; i < n; i++) {",
  "        r *= 10;",
  "    }",
  "    return r;",
  "}",
  "",
  "int Bessie(int x) {",
  E ? "    string s = to_string(x);" : "    string s = to_string(x);",
  E ? "    int P = s.length();      // digit count from string length" : "    int P = s.length();      // 문자열 길이 = 자릿수",
  "",
  E ? "    // strip down to first digit" : "    // 첫째 자리만 남기기",
  "    int first = x;",
  "    while (first >= 10) {",
  "        first /= 10;",
  "    }",
  "",
  "    if (first >= 5) {",
  "        return pw10(P);",
  "    }",
  "    return 0;",
  "}",
  "",
  "int Elsie(int x) {",
  "    string s = to_string(x);",
  "    int P = s.length();",
  "    int cur = x;",
  "",
  "    for (int pos = 1; pos <= P; pos++) {",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "        if (d >= 5) {",
  "            cur += pw10(pos);",
  "        }",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N;",
  "        cin >> N;",
  "        int count = 0;",
  "        for (int x = 2; x <= N; x++) {",
  "            if (Bessie(x) != Elsie(x)) {",
  "                count++;",
  "            }",
  "        }",
  "        cout << count << \"\\n\";",
  "    }",
  "}",
];

const BF_DP = (E) => [
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
  E ? "# Prefix sum — compute only as much as we need, then cache." : "# 누적합 — 필요한 만큼만 계산해서 저장.",
  E ? "ans = [0, 0]   # ans[x] = answer for 2 ~ x"                   : "ans = [0, 0]   # ans[x] = 2 ~ x 까지의 답",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "",
  "    while len(ans) <= N:",
  "        x = len(ans)",
  "        b = Bessie(x)",
  "        e = Elsie(x)",
  "        if b != e:",
  "            ans.append(ans[-1] + 1)",
  "        else:",
  "            ans.append(ans[-1])",
  "",
  "    print(ans[N])",
];
const BF_DP_CPP = (E) => [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int pw10(int n) {",
  "    int r = 1;",
  "    for (int i = 0; i < n; i++) {",
  "        r *= 10;",
  "    }",
  "    return r;",
  "}",
  "",
  "int Bessie(int x) {",
  "    string s = to_string(x);",
  "    int P = s.length();",
  "    int first = x;",
  "    while (first >= 10) {",
  "        first /= 10;",
  "    }",
  "    if (first >= 5) {",
  "        return pw10(P);",
  "    }",
  "    return 0;",
  "}",
  "",
  "int Elsie(int x) {",
  "    string s = to_string(x);",
  "    int P = s.length();",
  "    int cur = x;",
  "    for (int pos = 1; pos <= P; pos++) {",
  "        int d = (cur / pw10(pos - 1)) % 10;",
  "        if (d >= 5) {",
  "            cur += pw10(pos);",
  "        }",
  "        cur = (cur / pw10(pos)) * pw10(pos);",
  "    }",
  "    return cur;",
  "}",
  "",
  "int main() {",
  "    vector<int> ans = {0, 0};",
  "",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N;",
  "        cin >> N;",
  "",
  "        while ((int)ans.size() <= N) {",
  "            int x = ans.size();",
  "            int b = Bessie(x);",
  "            int e = Elsie(x);",
  "            if (b != e) {",
  "                ans.push_back(ans.back() + 1);",
  "            } else {",
  "                ans.push_back(ans.back());",
  "            }",
  "        }",
  "",
  "        cout << ans[N] << \"\\n\";",
  "    }",
  "}",
];

/* ================================================================
   Pw10Explainer — click to reveal why pw10 helper exists
   ================================================================ */
function Pw10Explainer({ E }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: open ? "auto 1fr" : "auto", gap: 12, alignItems: "start" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          padding: "8px 14px",
          background: open ? C.accent : C.accentBg,
          color: open ? "#fff" : C.accent,
          border: `1.5px solid ${C.accentBd}`,
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        💡 {t(E, "Why pw10?", "pw10 왜 필요해?")}
      </button>
      {open && (
        <div style={{
          padding: "10px 14px",
          background: C.accentBg,
          border: `1.5px dashed ${C.accentBd}`,
          borderRadius: 8,
          fontSize: 12,
          color: C.text,
          lineHeight: 1.7,
          fontWeight: 600,
        }}>
          {E ? (
            <>
              <strong style={{ color: C.accent }}>pw10(n) = 10ⁿ</strong> (e.g. <code>pw10(3) = 1000</code>).<br />
              Python has <code>10**P</code> built in, but C++ has no integer power operator — so we write our own helper.<br />
              <br />
              <strong>Bessie</strong> returns <code>10ᴾ</code> when the first digit ≥ 5 (round up).<br />
              <strong>Elsie</strong> uses <code>pw10(pos)</code> to add a carry at each position and zero out the digits below.
            </>
          ) : (
            <>
              <strong style={{ color: C.accent }}>pw10(n) = 10ⁿ</strong> (예: <code>pw10(3) = 1000</code>).<br />
              Python 에는 <code>10**P</code> 가 있지만, C++ 에는 정수 거듭제곱 연산자가 없어서 직접 함수로 만들어요.<br />
              <br />
              <strong>Bessie</strong> 는 첫째 ≥ 5 일 때 <code>10ᴾ</code> 를 돌려줘요 (올림).<br />
              <strong>Elsie</strong> 는 각 자리에서 <code>pw10(pos)</code> 만큼 carry 를 더하고, 그 자리 이하를 0 으로 만들어요.
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function makeBruteSteps(E, lang = "py") {
  // Code-array consts are functions (E) => string[] so comments can be bilingual.
  // (Plain arrays — e.g. inline MAIN_SNIPPET — are also accepted.)
  const pick = (pyFn, cppFn) => {
    const v = lang === "py" ? pyFn : cppFn;
    return typeof v === "function" ? v(E) : v;
  };
  const Label = ({ text }) => (
    <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 800, color: C.dim, letterSpacing: 0.3 }}>
      {text}
    </div>
  );

  const MAIN_SNIPPET_PY = [
    E ? "for x in range(2, N+1):       # x from 2 to N"  : "for x in range(2, N+1):       # 2 부터 N 까지",
    E ? "    b = Bessie(x)             # Bessie's answer" : "    b = Bessie(x)             # Bessie 의 답",
    E ? "    e = Elsie(x)              # Elsie's answer"  : "    e = Elsie(x)              # Elsie 의 답",
    E ? "    if b != e:                # if different"    : "    if b != e:                # 다르면",
    E ? "        count += 1            # count!"          : "        count += 1            # 카운트!",
    "",
    "print(count)",
  ];
  const MAIN_SNIPPET_CPP = [
    E ? "for (int x = 2; x <= N; x++) {  // x from 2 to N"  : "for (int x = 2; x <= N; x++) {  // 2 부터 N 까지",
    E ? "    int b = Bessie(x);          // Bessie's answer" : "    int b = Bessie(x);          // Bessie 의 답",
    E ? "    int e = Elsie(x);           // Elsie's answer"  : "    int e = Elsie(x);           // Elsie 의 답",
    E ? "    if (b != e) count++;        // if different, count!" : "    if (b != e) count++;        // 다르면 카운트!",
    "}",
    "",
    "cout << count << \"\\n\";",
  ];

  return [
    { type: "reveal",
      narr: t(E,
        "Step 1: read the input. T test cases, each gives one N.", "1단계: 입력부터 받아요. T 개의 테스트케이스, 각각 N 이 하나씩."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 1: Input", "1단계: 입력 받기")} />
          <CodeBlock lines={pick(BF_INPUT, BF_INPUT_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Step 2: for each x from 2 to N, get both answers and count where they differ.", "2단계: 결국엔 Bessie / Elsie 의 계산법이 필요해요. 두 값을 비교해서 다르면 카운트!"),
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

    { type: "quiz",
      narr: t(E,
        "Now we need Bessie() and Elsie().\nHmm — both decide based on P, right?\nSo P first.\nHow did we compute P again?", "이제 Bessie() 랑 Elsie() 를 만들어야 해요.\n근데 둘 다 결국 P 를 보고 결정하잖아요?\n그럼 P 부터 짚고 가야 해요.\n챕터 1 에서 P 어떻게 구했었더라?"),
      question: t(E, "What was P?", "P 는 무엇이었나요?"),
      hint: t(E, "Look at x and just count something simple…", "x 를 보고 뭔가 단순한 걸 세면 돼요…"),
      options: t(E,
        ["First digit of x", "Number of digits of x", "Last digit of x", "Sum of digits of x"],
        ["x 의 첫째 자리", "x 의 자릿수", "x 의 마지막 자리", "x 의 자릿수 합"]),
      correct: 1,
      explain: t(E, "Right! P = number of digits = len(str(x)). Now both functions can use it.",
                    "맞아요! P = 자릿수 = len(str(x)). 이제 두 함수가 이걸 쓸 수 있어요."),
    },

    { type: "reveal",
      narr: t(E,
        "Step 3: P = len(str(x)). Both functions will start with this line.", "3단계: P = len(str(x)). 두 함수 모두 이 한 줄로 시작해요."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 3: Compute P", "3단계: P 구하기")} />
          <CodeBlock lines={pick(BF_P, BF_P_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Step 4: Bessie just looks at the first digit. ≥5 → 10ᴾ. Else → 0.", "4단계: Bessie 는 첫째 자리 하나만 봐요. ≥5 면 10ᴾ, 아니면 0."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 4: Bessie 🐄", "4단계: Bessie 구하기 🐄")} />
          <CodeBlock lines={pick(BF_BESSIE, BF_BESSIE_CPP)} />
          {lang !== "py" && <Pw10Explainer E={E} />}
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Step 5: Elsie checks each digit from 1st to P-th. First trick — extract the pos-th digit.", "5단계: Elsie 는 1자리부터 P자리까지 하나씩 봐요. 트릭 1 — pos 번째 자리 숫자 뽑기."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — Trick 1: extract digit", "5단계: Elsie 🐮 — 트릭 1: 자리 숫자 추출")} />
          <CodeBlock lines={pick(BF_ELSIE_DIGIT, BF_ELSIE_DIGIT_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Trick 2 — if digit ≥5, carry up. Then zero out that position.", "트릭 2 — 그 자리가 ≥5 면 위로 +1 올림. 그리고 그 자리 이하는 0 으로."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — Trick 2: carry + clear", "5단계: Elsie 🐮 — 트릭 2: 올림 + 자리 이하 0")} />
          <CodeBlock lines={pick(BF_ELSIE_CARRY, BF_ELSIE_CARRY_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Combine the tricks into Elsie. Loop pos = 1 to P.", "두 트릭을 합쳐서 Elsie 함수 완성. pos 를 1 부터 P 까지 반복."),
      content: (
        <div style={{ padding: 16 }}>
          <Label text={t(E, "Step 5: Elsie 🐮 — full function", "5단계: Elsie 🐮 — 함수 완성")} />
          <CodeBlock lines={pick(BF_ELSIE, BF_ELSIE_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Step 6: put it all together — input + loop + Bessie + Elsie.", "6단계: 다 합쳐요 — 입력 + 루프 + Bessie + Elsie."),
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

    { type: "runner",
      narr: t(E,
        "Try various N — start small, go big. Notice anything?", "N 을 다양하게 키워가며 돌려보세요. 뭔가 느껴지나요?"),
    },

    { type: "reveal",
      narr: t(E,
        "Submit to USACO and you get this — first few cases pass (barely), rest time out.\nSo I thought of prefix sum.", "USACO 에 제출하면 이런 결과가 나와요. 앞 몇 개는 (간신히) 통과, 나머지는 다 시간 초과. 그래서 누적합을 떠올린 거예요."),
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
            ❌ {t(E, "Cases 5~13: TLE.\nThe first 4 barely pass at 1.6s — way too close to the limit.", "케이스 5~13: 시간 초과 (TLE).\n통과한 4 개도 1.6 초로 제한 시간에 아슬아슬.")}
          </div>
          <div style={{ marginTop: 8, padding: "10px 12px", background: C.accentBg, border: `1.5px solid ${C.accentBd}`, borderRadius: 10, fontSize: 13, color: C.accent, fontWeight: 700, lineHeight: 1.7, textAlign: "center" }}>
            💡 {t(E, "So I thought: what if we save what we computed? → Prefix sum!",
                  "그래서 생각했어요 — 한 번 계산한 거 저장해두면? → 누적합!")}
          </div>
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Build an array once, then every query reads it instantly.", "배열 한 번만 만들어놓으면 — 어떤 질문이 와도 즉답!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 10, padding: 10, marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 700 }}>
              <strong style={{ color: C.accent }}>ans[x]</strong> = 2 ~ x {t(E, "count of disagreeing numbers", "에서 답이 다른 수 개수")}
            </div>
          </div>

          <Label text={t(E, "Code (prefix sum)", "코드 (누적합)")} />
          <CodeBlock lines={pick(BF_DP, BF_DP_CPP)} />
        </div>
      ),
    },

    { type: "reveal",
      narr: t(E,
        "Submit prefix sum and… 6 cases pass instead of 4. Better, but still TLE on the rest.", "누적합으로 제출하면 — 4 개 → 6 개로 늘어요. 좋아졌지만 나머지는 여전히 시간 초과."),
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
            ✅ {t(E, "Pass: 4 → 6.", "통과: 4 → 6 개.")}
          </div>
          <div style={{ marginTop: 8, padding: "10px 12px", background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 10, fontSize: 12, color: C.no, fontWeight: 700, lineHeight: 1.6 }}>
            ❌ {t(E, "Cases 7~13: still TLE.\nWhy? When N=10⁹ comes, even building the array takes too long.", "케이스 7~13: 여전히 TLE.\n왜? N=10⁹ 가 오면 배열 만드는 자체가 너무 오래 걸려요.")}
          </div>
        </div>
      ),
    },
  ];
}


// ═══════════════════════════════════════════════
// Chapter 5: ⚡ Optimization (CORRECTED algorithm)
//   각 자릿수 d 에서 답이 다른 x 는 [s_d, e_d] 구간:
//     s_d = "4"*(d-1) + "5"   = 4…45
//     e_d = "4" + "9"*(d-1)   = 4 99…9
//   while s_d ≤ N: ans += min(N, e_d) - s_d + 1
// ═══════════════════════════════════════════════

const OPT_INPUT = (E) => [
  "import sys",
  "data = sys.stdin.read().split()",
  "T = int(data[0])",
  "out = []",
  "",
  "for t in range(1, T + 1):",
  "    N = int(data[t])",
  "    ans = 0",
];

const OPT_LOOP = (E) => [
  E ? "    # For each digit count d, the disagreeing numbers are exactly the interval [s_d, e_d]"
    : "    # 각 자릿수 d 마다 답이 다른 수는 정확히 구간 [s_d, e_d]",
  E ? "    #   s_d = 4...45    (d-1 fours + one 5)   ← smallest"
    : "    #   s_d = 4...45    (d-1 개 4 + 5 하나)  ← 최소",
  E ? "    #   e_d = 4 99...9  (one 4 + d-1 nines)   ← largest"
    : "    #   e_d = 4 99...9  (4 하나 + d-1 개 9)  ← 최대",
  "    d = 2",
  "    while True:",
  "        s_d = int(\"4\" * (d - 1) + \"5\")",
  "        e_d = int(\"4\" + \"9\" * (d - 1))",
  "        if s_d > N:",
  "            break",
  "        ans += min(N, e_d) - s_d + 1",
  "        d += 1",
  "",
  "    out.append(str(ans))",
];

const OPT_OUTPUT = (E) => [
  "print(\"\\n\".join(out))",
];

const OPT_CODE = (E) => [
  ...OPT_INPUT(E),
  "",
  ...OPT_LOOP(E),
  "",
  ...OPT_OUTPUT(E),
];

// ─── C++ ────────────────────────────────────────
const OPT_INPUT_CPP = (E) => [
  "#include <iostream>",
  "using namespace std;",
  "",
  E ? "// s_d = 4...45  (d-1 fours, then one 5)" : "// s_d = 4...45  (4 가 d-1 개, 5 하나)",
  "int s_low(int d) {",
  "    int v = 0;",
  E ? "    for (int i = 0; i < d - 1; i++) v = v * 10 + 4;  // tack on a 4" : "    for (int i = 0; i < d - 1; i++) v = v * 10 + 4;  // 4 를 한 자리씩 붙임",
  E ? "    v = v * 10 + 5;                                  // last digit is 5" : "    v = v * 10 + 5;                                  // 마지막은 5",
  "    return v;",
  "}",
  "",
  E ? "// e_d = 4 99...9  (one 4, then d-1 nines)" : "// e_d = 4 99...9  (4 하나, 9 가 d-1 개)",
  "int s_high(int d) {",
  "    int v = 4;",
  E ? "    for (int i = 0; i < d - 1; i++) v = v * 10 + 9;  // tack on a 9" : "    for (int i = 0; i < d - 1; i++) v = v * 10 + 9;  // 9 를 한 자리씩 붙임",
  "    return v;",
  "}",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        int N; cin >> N;",
  "        int ans = 0;",
];

const OPT_LOOP_CPP = (E) => [
  E ? "        // N ≤ 10^9, so d only matters up to 9"
    : "        // N ≤ 10^9 라서 d 는 9 까지만 의미 있음",
  "        for (int d = 2; d <= 9; d++) {",
  "            int sd = s_low(d), ed = s_high(d);",
  "            if (sd > N) break;",
  E ? "            int hi = (N < ed) ? N : ed;  // min(N, ed) by hand" : "            int hi = (N < ed) ? N : ed;  // min(N, ed) 직접",
  "            ans += hi - sd + 1;",
  "        }",
];

const OPT_OUTPUT_CPP = (E) => [
  "        cout << ans << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

const OPT_CODE_CPP = (E) => [
  ...OPT_INPUT_CPP(E),
  "",
  ...OPT_LOOP_CPP(E),
  ...OPT_OUTPUT_CPP(E),
];

// Optimization 섹션 — ProgressiveCode + PDF 둘 다에서 사용
export function getOptSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: C.accent, bgColor: C.accentBg,
      py: OPT_INPUT(E), cpp: OPT_INPUT_CPP(E),
      why: [
        t(E,
          "For each test case we'll iterate digit counts d = 2, 3, 4, ... and add up interval lengths.",
          "테스트케이스마다 자릿수 d = 2, 3, 4, ... 를 돌며 구간 길이를 합산할 거예요."),
        t(E,
          "C++ helpers s_low(d), s_high(d) build the smallest and largest disagreeing d-digit number.",
          "C++ 헬퍼 s_low(d), s_high(d) 는 d 자리 중 답이 다른 최소/최대 값을 만들어요."),
      ],
    },
    {
      label: t(E, "🔁 2. Per-digit-count loop", "🔁 2. 자릿수 d 별 루프"),
      color: C.ok, bgColor: C.okBg,
      py: OPT_LOOP(E), cpp: OPT_LOOP_CPP(E),
      why: [
        t(E,
          "For each d ≥ 2: build s_d = '4'*(d-1)+'5' (smallest) and e_d = '4'+'9'*(d-1) (largest).",
          "각 d ≥ 2 에서: s_d = '4'*(d-1)+'5' (최소), e_d = '4'+'9'*(d-1) (최대) 만들기."),
        t(E,
          "If s_d > N, no d-digit pattern number fits → stop.",
          "s_d > N 이면 d 자리 중 N 이하 패턴이 하나도 없음 → 멈춤."),
        t(E,
          "Otherwise add min(N, e_d) − s_d + 1: the contiguous block clipped by N.",
          "그렇지 않으면 min(N, e_d) − s_d + 1 더하기: N 으로 자른 구간 길이."),
        t(E,
          "C++ caps d ≤ 9 (s_10 = 4444444445 already exceeds N ≤ 10⁹, so d=10 never enters the loop).",
          "C++ 은 d ≤ 9 로 캡 (s_10 = 4444444445 가 이미 10⁹ 보다 커서 d=10 은 루프에 안 들어감)."),
      ],
    },
    {
      label: t(E, "📤 3. Output", "📤 3. 출력"),
      color: C.carry, bgColor: C.carryBg,
      py: OPT_OUTPUT(E), cpp: OPT_OUTPUT_CPP(E),
      why: [
        t(E,
          "Python: collect answers, print once at the end (faster than per-line print).",
          "Python: 답을 모아두고 끝에 한 번에 출력 (줄마다 print 보다 빠름)."),
        t(E,
          "C++: '\\n' instead of endl avoids flushing each line.",
          "C++: endl 대신 '\\n' — 줄마다 flush 안 함."),
      ],
    },
    {
      label: t(E, "🎯 Full Code", "🎯 전체 코드"),
      color: C.accent, bgColor: C.accentBg,
      py: OPT_CODE(E), cpp: OPT_CODE_CPP(E),
      why: [
        t(E,
          "Per query: at most ~10 iterations (one per digit count). O(log N) per query.",
          "쿼리당 최대 ~10 번 반복 (자릿수만큼). O(log N) per query."),
        t(E,
          "Brute was O(T · N). For N = 10⁹: ~10 ops vs ~10⁹ ops per query — speedup ≈ 10⁸×.",
          "브루트는 O(T · N). N = 10⁹ 면: 쿼리당 ~10 연산 vs ~10⁹. 약 10⁸ 배 빠름."),
        t(E,
          "Verify: N=1 → 0, N=100 → 5, N=4567 → 183, N=3366 → 60. All sample outputs match.",
          "확인: N=1 → 0, N=100 → 5, N=4567 → 183, N=3366 → 60. 샘플 출력과 일치."),
        t(E,
          "Tip: download as PDF (button above) for offline study.",
          "팁: 위 PDF 버튼 눌러서 다운받으면 오프라인에서도 공부 가능."),
      ],
    },
  ];
}

export function makeOptSteps(E) {
  return [
    { type: "reveal",
      narr: t(E,
        "Recap: in each digit count d, the disagreeing x form ONE contiguous interval [s_d, e_d]. So we just sum interval lengths!",
        "복습: 각 자릿수 d 에서 답이 다른 x 는 하나의 연속 구간 [s_d, e_d]. 그래서 구간 길이만 더하면 끝!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "linear-gradient(135deg,#4f46e5,#6366f1)", borderRadius: 12, padding: "14px 16px", textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", fontWeight: 700, marginBottom: 4 }}>
              {t(E, "Key insight", "핵심 통찰")}
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
              s<sub>d</sub> = 4…45 &nbsp;·&nbsp; e<sub>d</sub> = 4 99…9
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginTop: 4 }}>
              {t(E, "for each d, count = e_d − s_d + 1 (clipped to N)", "각 d 마다 개수 = e_d − s_d + 1 (N 으로 자름)")}
            </div>
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ padding: "8px 12px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim, textAlign: "center" }}>
              {t(E, "What the intervals look like", "구간이 어떻게 생겼나")}
            </div>
            {[
              { d: 2, s: "45",     e: "49",     c: 5 },
              { d: 3, s: "445",    e: "499",    c: 55 },
              { d: 4, s: "4445",   e: "4999",   c: 555 },
              { d: 5, s: "44445",  e: "49999",  c: 5555 },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 1fr 70px",
                padding: "7px 12px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                background: i % 2 === 0 ? "#fff" : "#fafbff",
              }}>
                <span style={{ fontWeight: 800, color: C.accent }}>d={row.d}</span>
                <span style={{ color: C.no, fontWeight: 700 }}>{row.s}</span>
                <span style={{ color: C.ok, fontWeight: 700 }}>{row.e}</span>
                <span style={{ textAlign: "right", fontWeight: 900, color: C.accent }}>{row.c}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    { type: "interval-sim",
      narr: t(E,
        "Slide d to see s_d and e_d for each digit count. Slide N to see how the band gets clipped.",
        "d 를 움직여서 각 자릿수의 s_d, e_d 를 봐요. N 을 움직이면 band 가 어떻게 잘리는지 보여줘요."),
    },

    { type: "reveal",
      narr: t(E,
        "Now N=4567. Walk d = 2, 3, 4, ... and stop when s_d > N.",
        "이제 N=4567. d = 2, 3, 4, ... 따라가다가 s_d > N 이면 멈춤."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 70px 70px 1fr 60px", padding: "8px 10px", background: "#f8f9fc", borderBottom: `1.5px solid ${C.border}`, fontSize: 11, fontWeight: 800, color: C.dim }}>
              <span>d</span>
              <span>s<sub>d</sub></span>
              <span>e<sub>d</sub></span>
              <span>{t(E, "min(N, e_d) − s_d + 1", "min(N, e_d) − s_d + 1")}</span>
              <span style={{ textAlign: "right" }}>+</span>
            </div>
            {[
              { d: 2, s: 45,    e: 49,    note: "49 − 45 + 1",            add: 5 },
              { d: 3, s: 445,   e: 499,   note: "499 − 445 + 1",          add: 55 },
              { d: 4, s: 4445,  e: 4999,  note: "min(4567,4999) − 4445 + 1 = 4567 − 4445 + 1", add: 123 },
              { d: 5, s: 44445, e: 49999, note: t(E, "s_5 > N → stop", "s_5 > N → 멈춤"), add: 0, stop: true },
            ].map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "40px 70px 70px 1fr 60px",
                padding: "8px 10px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                background: row.stop ? C.noBg : (i % 2 === 0 ? "#fff" : "#fafbff"),
                color: row.stop ? C.no : C.text,
              }}>
                <span style={{ fontWeight: 800, color: row.stop ? C.no : C.accent }}>{row.d}</span>
                <span style={{ color: row.stop ? C.no : C.no, fontWeight: 700 }}>{row.s}</span>
                <span style={{ color: row.stop ? C.no : C.ok, fontWeight: 700 }}>{row.e}</span>
                <span style={{ fontSize: 11 }}>{row.note}</span>
                <span style={{ textAlign: "right", fontWeight: 800 }}>{row.stop ? "—" : row.add}</span>
              </div>
            ))}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 60px",
              padding: "10px 12px", background: C.accentBg, borderTop: `2px solid ${C.accentBd}`,
              color: C.accent, fontWeight: 900,
            }}>
              <span>{t(E, "Total: 5 + 55 + 123", "합계: 5 + 55 + 123")}</span>
              <span style={{ textAlign: "right", fontSize: 16 }}>= 183</span>
            </div>
          </div>
        </div>
      ),
    },
    { type: "input",
      narr: t(E, "Verify: total for N=4567?", "확인: N=4567 의 합계는?"),
      question: "5 + 55 + 123 = ?",
      answer: 183,
    },

    { type: "scale",
      narr: t(E,
        "Compare the three approaches at any N. Brute hits TLE early; formula stays instant.",
        "세 풀이 속도 비교 — 브루트는 금방 TLE, 공식은 항상 즉시."),
    },

    ...getOptSections(E).map((sec, i, arr) => ({
      type: "code-section",
      narr: i === 0
        ? t(E,
            `Walk through the full solution one part at a time (${arr.length} pages). Toggle Python ↔ C++ via the header. Save as PDF for later.`,
            `전체 풀이를 한 단락씩 살펴봐요 (총 ${arr.length} 페이지). 위 헤더로 Python ↔ C++ 토글. PDF 저장해서 나중에 보기.`)
        : "",
      section: sec,
    })),
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
   Multi6Sim — pick from 6 SIM_CASES.
   ════════════════════════════════════════════ */
export function Multi6Sim({ E }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const cs = SIM_CASES[caseIdx];
  return (
    <div>
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
      <InlineSim key={caseIdx} x={cs.num} E={E} />
    </div>
  );
}


/* ════════════════════════════════════════════
   InlineSim — chapter 1's mini-sim, shown inline.
   ════════════════════════════════════════════ */
export function InlineSim({ x = 48, E }) {
  const all = buildSimSteps(x, E);
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

  const bg =
    step.phase?.startsWith("bessie") ? C.bessieBg :
    step.phase?.startsWith("elsie")  ? C.elsieBg  :
    step.phase === "compare"         ? (step.isDiff ? C.noBg : C.okBg) :
    "#f8f9fc";

  return (
    <div style={{ background: C.card, border: `2px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      {step.narr && (
        <div style={{
          padding: "10px 14px", fontSize: 13, fontWeight: 700, color: C.text,
          background: bg, borderBottom: `1.5px solid ${C.border}`,
        }}>{step.narr}</div>
      )}
      <div style={{ minHeight: 180 }}>
        {renderStep()}
      </div>
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


// ═══════════════════════════════════════════════
// Backwards-compat aliases — RoundingApp.jsx (current) imports these names.
// We map them to the rich chapter set:
//   makeRoundingCh1 → Chapter 1 (problem)
//   makeRoundingCh2 → Brute + Pattern + Opt concatenated, only used to keep
//                     stale imports from breaking. The new RoundingApp uses
//                     a 4-tab nav and calls makeBruteSteps / makePatternSteps
//                     / makeOptSteps directly.
// ═══════════════════════════════════════════════
export const makeRoundingCh1 = makeCh1;
export function makeRoundingCh2(E, lang = "py") {
  return [...makeBruteSteps(E, lang), ...makePatternSteps(E), ...makeOptSteps(E)];
}
