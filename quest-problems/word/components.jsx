import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";

const A = "#3b82f6";
const ABg = "#eff6ff";
const ABd = "#93c5fd";

/* Sample words from the problem */
const SAMPLE_WORDS = ["adb", "dez", "zaf", "aed", "wxy"];
const M = 3;

/* ── helpers ── */
function freq(word) {
  const f = {};
  for (const c of word) f[c] = (f[c] || 0) + 1;
  return f;
}

function sharedCount(f1, f2) {
  let s = 0;
  for (const c in f1) s += Math.min(f1[c] || 0, f2[c] || 0);
  return s;
}

function anagramDist(w1, w2) {
  return w1.length - sharedCount(freq(w1), freq(w2));
}

/* Letter tile */
const Tile = ({ ch, color = A, bg = ABg, bd = ABd, size = 30, glow }) => (
  <div style={{
    width: size, height: size, borderRadius: 7, display: "flex",
    alignItems: "center", justifyContent: "center",
    background: bg, border: `2px solid ${bd}`,
    fontWeight: 900, fontSize: size * 0.52, color,
    fontFamily: "'JetBrains Mono',monospace",
    boxShadow: glow ? `0 0 10px ${color}44` : "none",
    transition: "all .25s",
  }}>{ch}</div>
);


/* ═══════════════════════════════════════════════════════════════
   DistanceCalc — Interactive distance calculator
   ═══════════════════════════════════════════════════════════════ */
export function DistanceCalc({ E }) {
  const [w1, setW1] = useState("ade");
  const [w2, setW2] = useState("adb");

  const f1 = freq(w1), f2 = freq(w2);
  const allLetters = [...new Set([...Object.keys(f1), ...Object.keys(f2)])].sort();
  const shared = sharedCount(f1, f2);
  const len = Math.max(w1.length, w2.length);
  const dist = len - shared;

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Input fields */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        {[
          { label: t(E, "Word 1", "단어 1"), val: w1, set: setW1, color: A },
          { label: t(E, "Word 2", "단어 2"), val: w2, set: setW2, color: "#8b5cf6" },
        ].map((inp, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: C.dim, fontWeight: 700, marginBottom: 2 }}>{inp.label}</div>
            <input
              value={inp.val}
              onChange={e => inp.set(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))}
              style={{
                width: 80, textAlign: "center", padding: "6px 8px", borderRadius: 8,
                border: `2px solid ${inp.color}`, fontSize: 16, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace", color: inp.color,
                outline: "none", background: "#fff",
              }}
              maxLength={8}
            />
          </div>
        ))}
      </div>

      {/* Frequency comparison table */}
      {w1.length > 0 && w2.length > 0 && (
        <>
          {/* Table header labels */}
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 2 }}>
            <div style={{ minWidth: 40, textAlign: "center", fontSize: 9, color: C.dim, fontWeight: 700 }}>
              {t(E, "letter", "글자")}
            </div>
          </div>
          <div style={{
            display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", marginBottom: 4,
          }}>
            {/* Row labels */}
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              fontSize: 9, fontWeight: 700, gap: 1, paddingRight: 2, textAlign: "right",
            }}>
              <div style={{ height: 18 }}></div>
              <div style={{ color: A, height: 16 }}>{t(E, "W1", "단어1")}</div>
              <div style={{ color: "#8b5cf6", height: 16 }}>{t(E, "W2", "단어2")}</div>
              <div style={{ color: "#059669", height: 18 }}>{t(E, "match", "겹침")}</div>
            </div>
            {allLetters.map(c => {
              const v1 = f1[c] || 0, v2 = f2[c] || 0;
              const mn = Math.min(v1, v2);
              return (
                <div key={c} style={{
                  textAlign: "center", minWidth: 36, padding: "4px 2px",
                  background: mn > 0 ? "#dcfce7" : "#fef2f2",
                  border: `1.5px solid ${mn > 0 ? "#6ee7b7" : "#fca5a5"}`,
                  borderRadius: 8, fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
                }}>
                  <div style={{ fontWeight: 900, fontSize: 14, color: mn > 0 ? "#059669" : "#dc2626" }}>{c}</div>
                  <div style={{ color: A, fontWeight: 700 }}>{v1}</div>
                  <div style={{ color: "#8b5cf6", fontWeight: 700 }}>{v2}</div>
                  <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 2, fontWeight: 900, color: "#059669" }}>{mn}</div>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 6, lineHeight: 1.6 }}>
            {t(E,
              "For each letter: take the smaller count = matched letters",
              "각 글자마다: 둘 중 적은 쪽 = 겹치는 수")}
          </div>

          {/* Result */}
          <div style={{
            background: "#1e293b", borderRadius: 10, padding: "10px 14px",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
            color: "#e2e8f0", lineHeight: 2, textAlign: "center",
          }}>
            <div>{t(E, "shared", "겹치는 글자")} = {shared}{t(E, " letters", "개")}</div>
            <div>{t(E, "distance", "거리")} = {t(E, "length", "글자 수")} {len} − {t(E, "shared", "겹침")} {shared} = <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 18 }}>{dist}</span></div>
          </div>
        </>
      )}

      {/* Quick presets */}
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: C.dim, fontWeight: 700 }}>
        {t(E, "Try presets:", "예시 해보기:")}
      </div>
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 4, flexWrap: "wrap" }}>
        {[["ade","adb"],["ade","dez"],["ade","zaf"],["ade","aed"],["ade","wxy"]].map(([a,b], i) => (
          <button key={i} onClick={() => { setW1(a); setW2(b); }} style={{
            padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
            border: `1.5px solid ${C.border}`, background: "#fff",
            color: C.dim, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{a}↔{b}</button>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   GreedySim — Watch greedy algorithm fill slots
   Show all words as fixed frequency dictionaries, highlight gains
   ═══════════════════════════════════════════════════════════════ */

function computeGreedySteps() {
  const freqs = SAMPLE_WORDS.map(freq);
  const ans = new Array(26).fill(0);
  const steps = [];

  for (let slot = 0; slot < M; slot++) {
    const gains = [];
    for (let c = 0; c < 26; c++) {
      const k = ans[c];
      const g = freqs.reduce((s, f) => s + ((f[String.fromCharCode(c + 97)] || 0) > k ? 1 : 0), 0);
      gains.push({ letter: String.fromCharCode(c + 97), gain: g, code: c });
    }
    const best = gains.reduce((a, b) => b.gain > a.gain ? b : a, gains[0]);
    // For each word, does this word contribute to the gain of picked letter?
    const wordContributes = freqs.map(f => (f[best.letter] || 0) > ans[best.code]);
    steps.push({
      slot,
      gains,
      picked: best.letter,
      pickedGain: best.gain,
      pickedCode: best.code,
      ansBefore: [...ans],
      wordContributes,
    });
    ans[best.code] += 1;
    steps[steps.length - 1].ansAfter = [...ans];
  }
  return steps;
}

const GREEDY_STEPS = computeGreedySteps();

/* All unique letters across all sample words, sorted */
const ALL_LETTERS = [...new Set(SAMPLE_WORDS.join("").split(""))].sort();
const WORD_FREQS = SAMPLE_WORDS.map(freq);

/* Initial gain: for each letter, how many words contain it (at count > 0) */
const INITIAL_GAINS = ALL_LETTERS.map(c => {
  const code = c.charCodeAt(0) - 97;
  return WORD_FREQS.reduce((s, f) => s + ((f[c] || 0) > 0 ? 1 : 0), 0);
});

export function GreedySim({ E }) {
  const [step, setStep] = useState(-1); // -1 = not started
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const done = step >= M;

  const stopAnim = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  useEffect(() => () => stopAnim(), []);

  const next = () => { if (step < M) setStep(s => s + 1); };
  const reset = () => { setStep(-1); setPlaying(false); stopAnim(); };

  const autoPlay = () => {
    if (playing) { setPlaying(false); stopAnim(); return; }
    setPlaying(true);
    setStep(-1);
    let idx = -1;
    timerRef.current = setInterval(() => {
      idx++;
      if (idx > M) { stopAnim(); setPlaying(false); return; }
      setStep(idx);
    }, 1200);
  };

  // Current step data
  const gs = step >= 0 && step < M ? GREEDY_STEPS[step] : null;
  // Which letters have been picked so far (all steps up to current)
  const alreadyPicked = done
    ? GREEDY_STEPS.map(s => s.picked)
    : GREEDY_STEPS.slice(0, Math.max(0, step)).map(s => s.picked);
  // Currently picking (highlighted this step)
  const nowPicking = gs ? gs.picked : null;
  // All picked including current
  const allPicked = nowPicking ? [...alreadyPicked, nowPicking] : alreadyPicked;
  const curWord = [...allPicked].sort().join("");

  // Gain row: always show INITIAL counts (fixed), just mark picked letters
  const gainRow = ALL_LETTERS.map((c, ci) => ({
    gain: INITIAL_GAINS[ci],
    isPicking: c === nowPicking,
    isPicked: allPicked.includes(c) && c !== nowPicking,
  }));

  // Which words contribute to current pick
  const wordHighlight = gs ? gs.wordContributes : SAMPLE_WORDS.map(() => false);

  const cellW = 38;
  const labelW = 52;

  return (
    <div style={{ padding: "10px 2px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>
        {t(E, "Each word's letter counts (dictionary)", "각 단어의 글자별 개수 (딕셔너리)")}
      </div>

      {/* Fixed frequency table */}
      <div style={{ overflowX: "auto", marginBottom: 8 }}>
        <div style={{ display: "inline-block", minWidth: "fit-content", margin: "0 auto" }}>
          {/* Column headers */}
          <div style={{ display: "flex", marginLeft: labelW }}>
            {ALL_LETTERS.map(c => {
              const picked = allPicked.includes(c);
              const picking = c === nowPicking;
              return (
                <div key={c} style={{
                  width: cellW, textAlign: "center", fontSize: 13, fontWeight: 900,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: picking ? "#fbbf24" : (picked ? "#6ee7b7" : A),
                  transition: "color .3s",
                }}>
                  {c}
                  {picked && !picking && <div style={{ fontSize: 8, color: "#6ee7b7", marginTop: -2 }}>&#10003;</div>}
                </div>
              );
            })}
          </div>

          {/* Word rows */}
          {SAMPLE_WORDS.map((w, wi) => {
            const f = WORD_FREQS[wi];
            const isContrib = wordHighlight[wi];
            return (
              <div key={wi} style={{
                display: "flex", alignItems: "center", marginBottom: 2,
                background: isContrib ? "rgba(59,130,246,.08)" : "transparent",
                borderRadius: 6, transition: "background .3s",
              }}>
                <div style={{
                  width: labelW, fontSize: 12, fontWeight: 800,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: isContrib ? A : C.dim,
                  textAlign: "right", paddingRight: 6,
                  transition: "color .3s",
                }}>{w}</div>
                {ALL_LETTERS.map(c => {
                  const cnt = f[c] || 0;
                  const picking = c === nowPicking;
                  const highlight = picking && isContrib && cnt > 0;
                  return (
                    <div key={c} style={{
                      width: cellW, height: 28, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700,
                      fontFamily: "'JetBrains Mono',monospace",
                      color: cnt === 0 ? "#cbd5e1" : (highlight ? "#fbbf24" : "#334155"),
                      background: highlight ? "rgba(251,191,36,.15)" : "transparent",
                      borderRadius: 4, transition: "all .3s",
                    }}>{cnt}</div>
                  );
                })}
              </div>
            );
          })}

          {/* Gain summary row — ALWAYS visible */}
          <div style={{
            display: "flex", alignItems: "center", marginTop: 4,
            borderTop: "2px solid #e2e8f0", paddingTop: 4,
          }}>
            <div style={{
              width: labelW, fontSize: 10, fontWeight: 800,
              color: "#059669", textAlign: "right", paddingRight: 6,
            }}>{t(E, "count", "개수")}</div>
            {ALL_LETTERS.map((c, ci) => {
              const { gain, isPicking, isPicked } = gainRow[ci];
              return (
                <div key={c} style={{
                  width: cellW, height: 28, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: isPicking ? 15 : 13,
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono',monospace",
                  color: isPicking ? "#fbbf24" : (isPicked ? "#6ee7b7" : (gain > 0 ? "#059669" : "#cbd5e1")),
                  background: isPicking ? "rgba(251,191,36,.18)" : "transparent",
                  borderRadius: 6, transition: "all .3s",
                }}>{gain}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step explanation */}
      {gs && (
        <div style={{
          background: "#1e293b", borderRadius: 10, padding: "8px 12px",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
          color: "#e2e8f0", textAlign: "center", marginBottom: 8,
        }}>
          <span style={{ color: "#94a3b8" }}>
            {t(E, "Slot", "빈칸")} {gs.slot + 1}/{M}:
          </span>{" "}
          <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 14 }}>'{gs.picked}'</span>
          {" "}{t(E, "has the most", "이 가장 많아")} — <span style={{ color: "#93c5fd", fontWeight: 900 }}>{gs.pickedGain}{t(E, " words", "개")}</span>
          {alreadyPicked.length > 0 && (
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
              {t(E, "Already picked:", "이미 고른 글자:")} {alreadyPicked.join(", ")}
            </div>
          )}
        </div>
      )}

      {/* Done */}
      {done && (
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
            {t(E, "All slots filled!", "빈칸 3개 모두 채웠어!")}
          </div>
          <div style={{
            display: "inline-flex", gap: 4, padding: "8px 16px", borderRadius: 12,
            background: `linear-gradient(135deg,#1d4ed8,${A})`,
            boxShadow: "0 4px 16px rgba(59,130,246,.3)",
            animation: "wordPopIn .4s ease",
          }}>
            {curWord.split("").map((c, i) => (
              <span key={i} style={{
                fontSize: 24, fontWeight: 900, color: "#fff",
                fontFamily: "'JetBrains Mono',monospace",
              }}>{c}</span>
            ))}
          </div>
          <style>{`@keyframes wordPopIn { 0% { transform: scale(0.85); opacity: 0; } 60% { transform: scale(1.06); } 100% { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      )}

      {/* Not started hint */}
      {step < 0 && (
        <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginBottom: 8 }}>
          {t(E, "Press ▶ to start filling slots!", "▶ 눌러서 빈칸 채우기 시작!")}
        </div>
      )}

      {/* Current word being built */}
      {step >= 0 && !done && (
        <div style={{
          textAlign: "center", marginBottom: 8, fontSize: 13, fontWeight: 900,
          color: A, fontFamily: "'JetBrains Mono',monospace",
        }}>
          {t(E, "Building", "지금까지 고른 글자")}: {curWord || "..."}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {!done ? (
          <>
            <button onClick={next} disabled={playing} style={{
              padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 900,
              border: "none", cursor: playing ? "default" : "pointer",
              color: "#fff", opacity: playing ? 0.5 : 1,
              background: `linear-gradient(135deg,#1d4ed8,${A})`,
              boxShadow: "0 3px 12px rgba(59,130,246,.3)",
            }}>▶ {t(E, "Next slot", "다음 칸")}</button>
            <button onClick={autoPlay} style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 900,
              border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
            }}>{playing ? "⏸" : "⏭"} {t(E, playing ? "Pause" : "Auto", playing ? "정지" : "자동")}</button>
          </>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   WordBuilder — Show final construction
   ═══════════════════════════════════════════════════════════════ */
export function WordBuilder({ E }) {
  const finalAns = GREEDY_STEPS[M - 1].ansAfter;
  const letters = finalAns.flatMap((cnt, i) =>
    Array(cnt).fill(String.fromCharCode(i + 97))
  );
  const word = letters.join("");

  // Distance to each sample word
  const dists = SAMPLE_WORDS.map(w => anagramDist(word, w));
  const total = dists.reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: "10px 6px" }}>
      {/* Frequency display */}
      <div style={{ fontSize: 12, fontWeight: 800, color: A, textAlign: "center", marginBottom: 6 }}>
        {t(E, "Letter frequencies from greedy:", "빈칸 채우기로 고른 글자들:")}
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10 }}>
        {finalAns.map((cnt, i) => cnt > 0 ? (
          <div key={i} style={{
            textAlign: "center", padding: "4px 6px", borderRadius: 8,
            background: ABg, border: `2px solid ${ABd}`, minWidth: 32,
          }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
              {String.fromCharCode(i + 97)}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim }}>×{cnt}</div>
          </div>
        ) : null)}
      </div>

      {/* Arrow → sorted word */}
      <div style={{ textAlign: "center", fontSize: 14, color: C.dim, marginBottom: 6 }}>↓ {t(E, "sorted alphabetically", "abc순으로 정렬")} ↓</div>

      {/* Word tiles */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12 }}>
        {letters.map((c, i) => (
          <Tile key={i} ch={c} size={36} glow />
        ))}
      </div>

      {/* Distance verification */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "10px 12px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        color: "#e2e8f0", lineHeight: 2, marginBottom: 8,
      }}>
        <div style={{ color: "#94a3b8", marginBottom: 4 }}>{t(E, "Verify distances:", "각 단어와 거리 확인:")}</div>
        {SAMPLE_WORDS.map((w, i) => (
          <div key={i}>
            {word} ↔ {w}: <span style={{ color: "#fbbf24", fontWeight: 900 }}>{dists[i]}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #334155", marginTop: 6, paddingTop: 6, textAlign: "center" }}>
          {t(E, "total distance", "거리 합계")} = {dists.join(" + ")} = <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 18 }}>{total}</span>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   GreedyTrace — Step-by-step trace for Ch3
   ═══════════════════════════════════════════════════════════════ */
export function GreedyTrace({ E }) {
  const [step, setStep] = useState(0);
  const maxSteps = M + 1; // M slots + done

  const next = () => { if (step < maxSteps) setStep(s => s + 1); };
  const reset = () => setStep(0);

  return (
    <div style={{ padding: "10px 8px" }}>
      {/* Words display */}
      <div style={{
        background: ABg, borderRadius: 10, padding: "6px 10px",
        border: `2px solid ${ABd}`, marginBottom: 8, textAlign: "center",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text,
      }}>
        {t(E, "words", "주어진 단어")}: {SAMPLE_WORDS.join(", ")}
      </div>

      {/* Format explanation */}
      <div style={{
        textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 4, lineHeight: 1.5,
      }}>
        {t(E, "letter(N) = overlaps with N words. Bold = picked!", "글자(N) = N개 단어와 겹침. 굵은 글자 = 선택!")}
      </div>

      {/* Computation steps */}
      <div style={{
        background: "#1e293b", borderRadius: 10, padding: "10px 12px",
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        lineHeight: 2.2, color: "#e2e8f0", marginBottom: 8,
      }}>
        {GREEDY_STEPS.map((gs, i) => {
          const visible = step > i;
          const isCurrent = step === i + 1;
          const topGains = gs.gains.filter(g => g.gain > 0).slice(0, 4);
          return (
            <div key={i} style={{
              opacity: visible ? 1 : 0.15,
              background: isCurrent ? "rgba(59,130,246,.18)" : "transparent",
              borderRadius: 6, padding: "2px 6px",
              transform: isCurrent ? "scale(1.03)" : "scale(1)",
              boxShadow: isCurrent ? "0 0 12px rgba(59,130,246,.2)" : "none",
              transition: "all .35s ease",
            }}>
              <span style={{ color: "#94a3b8" }}>{t(E, "slot", "빈칸")}{i + 1}:</span>
              {" "}
              {topGains.map((g, j) => (
                <span key={j}>
                  {j > 0 && " "}
                  <span style={{
                    color: g.letter === gs.picked ? "#93c5fd" : "#64748b",
                    fontWeight: g.letter === gs.picked ? 900 : 400,
                    textShadow: isCurrent && g.letter === gs.picked ? "0 0 6px #93c5fd88" : "none",
                  }}>
                    {g.letter}({g.gain})
                  </span>
                </span>
              ))}
              {" → "}
              <span style={{
                color: "#fbbf24", fontWeight: 900,
                fontSize: isCurrent ? 15 : 12,
                transition: "font-size .3s",
              }}>'{gs.picked}'</span>
            </div>
          );
        })}

        {/* Final answer */}
        <div style={{
          opacity: step > M ? 1 : 0.15,
          borderTop: "1px solid #334155", marginTop: 6, paddingTop: 6,
          textAlign: "center", transition: "all .4s ease",
          transform: step > M ? "scale(1)" : "scale(0.9)",
        }}>
          <span style={{ color: "#94a3b8" }}>{t(E, "answer", "정답 단어")} = </span>
          <span style={{
            color: "#93c5fd", fontWeight: 900, fontSize: step > M ? 18 : 16,
            textShadow: step > M ? "0 0 12px #93c5fd88" : "none",
            transition: "all .4s ease",
          }}>
            {GREEDY_STEPS[M - 1].ansAfter.map((cnt, i) => String.fromCharCode(i + 97).repeat(cnt)).join("")}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {step <= M ? (
          <button onClick={next} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: "none", cursor: "pointer", color: "#fff",
            background: `linear-gradient(135deg,#1d4ed8,${A})`,
            boxShadow: "0 3px 12px rgba(59,130,246,.3)",
          }}>▶ {t(E, "Next", "다음")}</button>
        ) : (
          <button onClick={reset} style={{
            padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 900,
            border: `2px solid ${ABd}`, background: ABg, color: A, cursor: "pointer",
          }}>↺ {t(E, "Restart", "처음부터")}</button>
        )}
      </div>

      {/* Step counter */}
      <div style={{
        textAlign: "center", marginTop: 4, fontSize: 10, color: C.dim,
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
      }}>
        {step}/{maxSteps}
      </div>
    </div>
  );
}
