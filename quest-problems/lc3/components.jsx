import { useState } from "react";
import { t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { useCodeLang } from "@/components/quest/use-code-lang";

const ACC   = "#7c3aed";
const ACC_L = "#ede9fe";
const ACC_D = "#5b21b6";
const OK     = "#15803d";
const OK_BG  = "#f0fdf4";
const OK_BD  = "#86efac";
const NO     = "#b91c1c";
const NO_BG  = "#fef2f2";
const NO_BD  = "#fca5a5";

/* 한 케이스의 전체 추적(trace)을 미리 계산한다.
   핵심: 새 글자가 '지금 창문 안'에 중복인지(prevIdx >= left) 본다.
   창문 밖에서 본 글자(prevIdx < left)는 left 를 되돌리지 않는다 — 이게 abba 함정. */
function buildTrace(s) {
  const steps = [];
  const last = {};            // 글자 → 마지막으로 본 위치
  let left = 0;
  let best = 0;

  steps.push({
    phase: "init",
    right: -1, ch: null, left: 0, leftBefore: 0, prevIdx: null,
    jumped: false, windowStr: "", curLen: 0, best: 0, improved: false,
    last: {},
  });

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    const leftBefore = left;
    const prevIdx = (ch in last) ? last[ch] : null;
    let jumped = false;
    if (prevIdx !== null && prevIdx >= left) {   // 창문 안 중복 → left 점프
      left = prevIdx + 1;
      jumped = true;
    }
    last[ch] = right;
    const curLen = right - left + 1;
    const improved = curLen > best;
    if (improved) best = curLen;
    steps.push({
      phase: "step",
      right, ch, left, leftBefore, prevIdx, jumped,
      windowStr: s.slice(left, right + 1),
      curLen, best, improved,
      last: { ...last },
    });
  }
  return steps;
}

const CASES = [
  { id: "basic",  s: "abcabcbb" },
  { id: "tricky", s: "abba" },
];

function Chip({ label, value, hot }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      borderRadius: 8, padding: "4px 10px", minWidth: 34,
      background: hot ? OK_BG : "#fff",
      border: `2px solid ${hot ? OK_BD : "#e2e8f0"}`,
      boxShadow: hot ? `0 0 0 3px ${OK_BG}` : "none",
      transition: "all .15s",
    }}>
      <span style={{ fontSize: 12, color: hot ? OK : "#94a3b8", fontFamily: "monospace", fontWeight: 800 }}>'{label}'</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: hot ? OK : "#334155", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}

export function SlidingWindowSim({ E }) {
  const [caseId, setCaseId] = useState("basic");
  const [si, setSi] = useState(0);

  const cur = CASES.find(c => c.id === caseId);
  const trace = buildTrace(cur.s);
  const step = trace[Math.min(si, trace.length - 1)];
  const last = si >= trace.length - 1;
  const final = trace[trace.length - 1].best;

  const pick = (id) => { setCaseId(id); setSi(0); };
  const next = () => setSi(s => Math.min(s + 1, trace.length - 1));
  const prev = () => setSi(s => Math.max(s - 1, 0));
  const reset = () => setSi(0);

  const lastEntries = Object.entries(step.last).sort((a, b) => Number(a[1]) - Number(b[1]));
  const isStep = step.phase === "step";

  // 글자별 상태 분류 (현재 / 창문 안 / 창문 왼쪽(버려짐) / 미래)
  return (
    <div style={{ padding: 14, fontFamily: "inherit" }}>
      {/* 케이스 선택 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {CASES.map(c => {
          const on = c.id === caseId;
          return (
            <button key={c.id} onClick={() => pick(c.id)} style={{
              cursor: "pointer", borderRadius: 8, padding: "6px 12px",
              fontSize: 12, fontWeight: 700, fontFamily: "monospace",
              border: `2px solid ${on ? ACC : "#cbd5e1"}`,
              background: on ? ACC : "#fff",
              color: on ? "#fff" : "#475569",
            }}>
              s = "{c.s}"
              {c.id === "tricky" && <span style={{ marginLeft: 6 }}>{t(E, "(gotcha!)", "(함정!)")}</span>}
            </button>
          );
        })}
      </div>

      {/* 문자열 + 창문(window) 시각화 */}
      <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
        {cur.s.split("").map((ch, idx) => {
          const inWindow = isStep && idx >= step.left && idx <= step.right;
          const here = isStep && idx === step.right;
          const dropped = isStep && idx < step.left;
          return (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "monospace" }}>{idx}</span>
              <div style={{
                width: 40, height: 46, borderRadius: 8,
                border: `2px solid ${here ? ACC : inWindow ? "#c4b5fd" : "#e2e8f0"}`,
                background: here ? ACC_L : inWindow ? "#f5f3ff" : "#fff",
                opacity: dropped ? 0.35 : 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: here ? "translateY(-4px)" : "none",
                transition: "all .15s",
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: here ? ACC_D : inWindow ? "#6d28d9" : "#94a3b8", fontFamily: "monospace" }}>{ch}</span>
              </div>
              {/* left / right 포인터 라벨 */}
              <span style={{ fontSize: 9, fontWeight: 800, fontFamily: "monospace", color: ACC, height: 12 }}>
                {isStep && idx === step.left && idx === step.right ? "L,R"
                  : isStep && idx === step.left ? "L"
                  : isStep && idx === step.right ? "R" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* 현재 스텝 계산 패널 */}
      <div style={{
        background: ACC_L, border: `2px solid ${ACC}`, borderRadius: 10,
        padding: "12px 14px", marginBottom: 12,
      }}>
        {step.phase === "init" ? (
          <div style={{ fontSize: 12.5, color: ACC_D, lineHeight: 1.7 }}>
            <b>{t(E, "Start.", "시작.")}</b>{" "}
            {t(E,
              "The window is empty. left = 0, best = 0. We'll slide the right edge forward one letter at a time, and remember where we last saw each letter in last (a dictionary).",
              "창문(window)이 비어 있어요. left = 0, best = 0. 오른쪽 끝 right 를 한 글자씩 앞으로 밀면서, 각 글자를 마지막으로 본 위치를 last(딕셔너리)에 기억해 둬요.")}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 7 }}>
            <Row n="①" code={`s[${step.right}] = '${step.ch}'`}
                 desc={t(E, "the new right-edge letter", "새로 들어온 오른쪽 글자")} />
            <Row n="②"
                 code={step.prevIdx === null
                   ? `'${step.ch}' ${E ? "not in" : "∉"} last`
                   : `last['${step.ch}'] = ${step.prevIdx} ${step.prevIdx >= step.leftBefore ? "≥" : "<"} left ${step.leftBefore}`}
                 desc={step.prevIdx === null
                   ? t(E, "brand-new letter → window stays", "처음 보는 글자 → 창문 유지")
                   : step.jumped
                     ? t(E, "duplicate INSIDE window!", "창문 안 중복이다!")
                     : t(E, "seen before, but OUTSIDE window → ignore", "본 적 있지만 창문 밖 → 무시")}
                 ok={step.prevIdx === null || !step.jumped}
                 no={step.jumped} />
            <Row n="③"
                 code={step.jumped
                   ? `left = ${step.prevIdx}+1 = ${step.left}`
                   : `left = ${step.left}`}
                 desc={step.jumped
                   ? t(E, "jump past the duplicate", "중복 글자 다음으로 점프")
                   : t(E, "left stays put", "left 그대로")} />
            <Row n="④"
                 code={`window = "${step.windowStr}"  (len ${step.curLen})`}
                 desc={step.improved
                   ? t(E, `new best → ${step.best}`, `최고 기록 갱신 → ${step.best}`)
                   : t(E, `best stays ${step.best}`, `최고 기록 유지 ${step.best}`)}
                 ok={step.improved} />
          </div>
        )}
      </div>

      {/* last 딕셔너리 + best */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: "1 1 240px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6 }}>
            last {t(E, "(letter → last index)", "(글자 → 마지막 위치)")}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", minHeight: 44 }}>
            {lastEntries.length === 0
              ? <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>{t(E, "(empty)", "(비어 있음)")}</span>
              : lastEntries.map(([key, val]) => (
                  <Chip key={key} label={key} value={val} hot={isStep && key === step.ch} />
                ))}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6 }}>best</div>
          <div style={{
            fontSize: 26, fontWeight: 900, fontFamily: "monospace",
            color: ACC_D, background: "#fff", border: `2px solid ${ACC}`,
            borderRadius: 10, padding: "2px 18px", minWidth: 56,
          }}>
            {step.best}
          </div>
        </div>
      </div>

      {/* 컨트롤 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={prev} disabled={si === 0} style={btn(si === 0)}>
          ◀ {t(E, "Prev", "이전")}
        </button>
        <button onClick={next} disabled={last} style={btn(last, true)}>
          {t(E, "Next step", "다음 스텝")} ▶
        </button>
        <button onClick={reset} style={{ ...btn(false), background: "#fff", color: "#64748b", border: "2px solid #cbd5e1" }}>
          ↺ {t(E, "Restart", "처음으로")}
        </button>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#94a3b8", fontFamily: "monospace" }}>
          {step.phase === "init" ? t(E, "start", "시작") : `${t(E, "step", "스텝")} ${step.right + 1}`} / {cur.s.length}
        </span>
      </div>

      {/* 마지막 스텝이면 정답 배너 */}
      {last && (
        <div style={{
          marginTop: 12, background: OK_BG, border: `2px solid ${OK_BD}`,
          borderRadius: 10, padding: "10px 14px", textAlign: "center",
          fontSize: 13.5, fontWeight: 800, color: OK,
        }}>
          {t(E, `Answer = ${final}`, `정답 = ${final}`)}
          {caseId === "tricky" && (
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "#15803d", marginTop: 4 }}>
              {t(E,
                "At the last 'a' (index 3), last['a'] was 0 — but 0 was already LEFT of the window (left=2), so we did NOT pull left back. That's why we check prevIdx ≥ left.",
                "마지막 'a'(인덱스 3)에서 last['a']는 0 이었지만, 0 은 이미 창문 왼쪽(left=2) 밖이라 left 를 되돌리지 않았어요. 그래서 prevIdx ≥ left 인지 확인하는 거예요.")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ n, code, desc, ok, no }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        flexShrink: 0, width: 20, height: 20, borderRadius: "50%",
        background: ok ? OK : no ? NO : ACC, color: "#fff",
        fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
      }}>{n}</span>
      <code style={{
        fontFamily: "monospace", fontSize: 12.5, fontWeight: 700,
        color: ok ? OK : no ? NO : ACC_D,
        background: ok ? OK_BG : no ? NO_BG : "#fff",
        border: `1px solid ${ok ? OK_BD : no ? NO_BD : "#ddd6fe"}`,
        borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap",
      }}>{code}</code>
      <span style={{ fontSize: 11.5, color: "#475569" }}>{desc}</span>
    </div>
  );
}

function btn(disabled, primary) {
  return {
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    borderRadius: 8, padding: "8px 16px",
    fontSize: 12.5, fontWeight: 700,
    border: `2px solid ${primary ? ACC : "#cbd5e1"}`,
    background: primary ? ACC : "#fff",
    color: primary ? "#fff" : "#475569",
  };
}

/* ── 속도 체감 — brute(모든 쌍) vs 똑똑한 한 번 스캔 ──────────────
   슬라이더로 n 을 키우면 brute 막대가 2초 예산선을 훌쩍 넘는 걸 *눈으로* 봄. */
export function SpeedRaceSim({ E, nMax = 50000, nStart = 200, constraintN = 50000 }) {
  const [n, setN] = useState(nStart);
  const brute = (n * (n + 1)) / 2;   // ≈ n²/2 (모든 시작 × 끝)
  const fast = n;                    // 한 번 스캔
  const BUDGET = 2e8;                // ≈ 2초치 연산 (대략 1e8 연산/초)

  const fmt = (x) => {
    if (x < 1000) return String(Math.round(x));
    if (x < 1e6) return (x / 1e3).toFixed(x < 1e4 ? 1 : 0) + "K";
    if (x < 1e9) return (x / 1e6).toFixed(1) + "M";
    if (x < 1e12) return (x / 1e9).toFixed(1) + "B";
    return x.toExponential(1);
  };
  const human = (ops) => {
    const s = ops / 1e8;
    if (s < 0.001) return t(E, "instant", "즉시");
    if (s < 1) return (s * 1000).toFixed(0) + "ms";
    if (s < 60) return s.toFixed(1) + (E ? "s" : "초");
    if (s < 3600) return (s / 60).toFixed(1) + (E ? "min" : "분");
    return (s / 3600).toFixed(1) + (E ? "hr" : "시간");
  };
  const pct = (ops) => Math.min(100, (ops / BUDGET) * 100);
  const over = brute > BUDGET;

  const Bar = ({ label, ops, color, slow }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
        <span style={{ color: "#334155" }}>{label}</span>
        <span style={{ fontFamily: "monospace", color: slow ? NO : OK }}>
          {fmt(ops)} {t(E, "ops", "연산")} · {human(ops)}
        </span>
      </div>
      <div style={{ position: "relative", height: 24, background: "#f1f5f9", borderRadius: 6, overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <div style={{ width: `${pct(ops)}%`, height: "100%", background: color, transition: "width .12s", borderRadius: 5 }} />
        {slow && (
          <span style={{ position: "absolute", right: 8, top: 3, fontSize: 11, fontWeight: 800, color: "#fff" }}>
            {t(E, "OVER ❌", "초과 ❌")}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{t(E, "input size", "입력 크기")}</div>
        <div style={{ fontSize: 30, fontWeight: 900, fontFamily: "monospace", color: ACC_D }}>
          n = {n.toLocaleString()}
        </div>
        <input type="range" min={nStart} max={nMax} step={Math.max(1, Math.round(nMax / 500))}
          value={n} onChange={(e) => setN(Number(e.target.value))}
          style={{ width: "80%", accentColor: ACC, marginTop: 6 }} />
        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          {t(E, `drag · problem allows up to n = ${constraintN.toLocaleString()}`,
               `드래그 · 문제는 최대 n = ${constraintN.toLocaleString()} 까지`)}
        </div>
      </div>

      <Bar label={t(E, "Brute (every start × end)", "완전탐색 (모든 시작 × 끝)")} ops={brute} color={NO} slow={over} />
      <Bar label={t(E, "One smart pass", "똑똑한 한 번 스캔")} ops={fast} color={OK} slow={false} />

      <div style={{ marginTop: 6, fontSize: 11.5, color: "#475569", textAlign: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px" }}>
        {t(E,
          "Bars fill toward the ~2-second budget (≈2×10⁸ ops). Drag n up: brute shoots past it while the smart pass barely moves.",
          "막대는 약 2초 예산(≈2×10⁸ 연산)까지 차요. n 을 키워보면 — 완전탐색은 예산을 훌쩍 넘기고, 똑똑한 스캔은 거의 안 움직여요.")}
      </div>
    </div>
  );
}

/* ── 단계별 코드 (Python/C++ 토글) ───────────────────────────────
   sections: [{ label, color, py:[], cpp:[], why:[], pyOnly:[], cppOnly:[] }] */
export function CodeJourney({ E, sections, doneNote }) {
  // Single source of truth: the header 🐍 Py / 💻 C++ toggle (shared via localStorage).
  const [lang] = useCodeLang();
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 10, textAlign: "right" }}>
        {t(E, "language: switch with 🐍 Py / 💻 C++ up top", "언어: 위쪽 🐍 Py / 💻 C++ 로 전환")}
      </div>

      {sections.map((sec, i) => {
        const bullets = [...(sec.why || []), ...(lang === "py" ? (sec.pyOnly || []) : (sec.cppOnly || []))];
        const col = sec.color || ACC;
        return (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: "#fff", background: col, borderRadius: "8px 8px 0 0", padding: "5px 12px" }}>
              {sec.label}
            </div>
            <div style={{ border: `2px solid ${col}`, borderRadius: "0 8px 8px 8px", padding: 10, background: "#fff" }}>
              {bullets.length > 0 && (
                <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 12, color: "#374151", lineHeight: 1.65 }}>
                  {bullets.map((b, j) => (<li key={j} style={{ marginBottom: 3 }}>{b}</li>))}
                </ul>
              )}
              <CodeBlock lang={lang} lines={lang === "py" ? sec.py : sec.cpp} />
            </div>
          </div>
        );
      })}

      {doneNote && (
        <div style={{ background: OK_BG, border: `2px solid ${OK_BD}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, color: OK, textAlign: "center" }}>
          {doneNote}
        </div>
      )}
    </div>
  );
}
