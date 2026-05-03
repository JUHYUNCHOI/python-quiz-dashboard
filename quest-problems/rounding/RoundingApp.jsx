import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeReveal, CodeBlock } from "@/components/quest/shared";
import { CodeCompare3, BruteRunner, SpeedScale, ProgressiveCode, downloadFullPDF } from "./components";

import {
  makeCh1, makePatternSteps, makeBruteSteps, makeOptSteps, getOptSections,
} from "./chapters";

export default function RoundingApp() {
  // --- Language ---
  const [lang, setLang] = useState(() => typeof window !== "undefined" && (window._questLang === "en" || window.localStorage?.getItem("language") === "en") ? "en" : "ko");
  const E = lang === "en";
  // 코드 언어 — 인앱 코드 + PDF 모두 적용 (Python / C++)
  const [codeLang, setCodeLang] = useState("py");

  // codeLang 바뀌면 brute 스텝 새로 빌드 (답변 진행 상태는 보존)
  useEffect(() => {
    setBruteQ(prev => makeBruteSteps(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  // --- Navigation ---
  const [tab, setTab] = useState(0);
  const [si, setSi]   = useState(0);

  // --- Quiz state (mutable copies for answered tracking) ---
  const [patternQ, setPatternQ] = useState(() => makePatternSteps(false));
  const [bruteQ, setBruteQ]     = useState(() => makeBruteSteps(false, "py"));
  const [optQ, setOptQ]         = useState(() => makeOptSteps(false));

  // --- Tab labels ---
  // 학생 사고 흐름: 문제 (시뮬 포함) → 풀어보기 (브루트→TLE→누적합) → 패턴 → 최적화
  const TABS = E
    ? ["📋 Problem", "🤔 Try Solving", "💡 Pattern", "⚡ Optimize"]
    : ["📋 문제", "🤔 풀어보기", "💡 패턴", "⚡ 최적화"];

  // --- Build steps ---
  const ch1   = makeCh1(E);
  // 탭 순서: 0=문제, 1=풀어보기(브루트), 2=패턴, 3=최적화
  const all   = [ch1, bruteQ, patternQ, optQ];
  const steps = all[tab];
  const cur   = Math.min(si, steps.length - 1);
  const step  = steps[cur];

  // --- Actions ---
  const switchLang = nl => {
    const ne = nl === "en";
    setLang(nl);
    // 새 언어로 퀴즈 텍스트 다시 빌드 — 단, 답변 진행 상태(answered/solved) 는 보존.
    setPatternQ(prev => makePatternSteps(ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setBruteQ(prev => makeBruteSteps(ne, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setOptQ(prev => makeOptSteps(ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  };
  const changeTab = idx => {
    setTab(idx); setSi(0);
    // 탭 순서: 0=문제, 1=풀어보기, 2=패턴, 3=최적화
    if (idx === 1) setBruteQ(makeBruteSteps(E, codeLang));
    if (idx === 2) setPatternQ(makePatternSteps(E));
    if (idx === 3) setOptQ(makeOptSteps(E));
  };

  // --- Quiz/input answer handler ---
  const handleAnswer = optIdx => {
    if (step.answered != null) return;
    const update = arr => { const u = [...arr]; u[cur] = { ...u[cur], answered: optIdx }; return u; };
    if (tab === 1) setBruteQ(update(bruteQ));
    if (tab === 2) setPatternQ(update(patternQ));
    if (tab === 3) setOptQ(update(optQ));
  };
  const handleSolve = () => {
    const update = arr => { const u = [...arr]; u[cur] = { ...u[cur], solved: true }; return u; };
    if (tab === 1) setBruteQ(update(bruteQ));
    if (tab === 3) setOptQ(update(optQ));
  };

  // --- Navigation logic ---
  // 문제 안 풀어도 자유롭게 넘어갈 수 있음 (강제 차단 X).
  // 단, "👆 먼저 답해봐!" 안내는 미응답 시 부드럽게 띄움.
  const isBlocked = false;
  const showAnswerHint =
    ((tab >= 1) && step.type === "quiz" && step.answered == null) ||
    ((tab >= 1) && step.type === "input" && !step.solved);

  const canNext = cur < steps.length - 1;

  const next = () => {
    if (!canNext) return;
    setSi(cur + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setSi(Math.max(0, cur - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Narration color (단순화 — 모든 탭 공통 accent) ---
  const nc = { c: C.accent, bg: C.accentBg, bd: C.accentBd };

  // --- Render step content ---
  const renderContent = () => {
    // Ch1 (문제 + 시뮬 포함)
    if (tab === 0) return step.content;

    // 풀어보기 / 패턴 / 최적화 — 공통 타입
    if (step.type === "quiz")   return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "input")  return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "code")     return <CodeReveal label={step.label} lines={step.code} />;
    if (step.type === "codeShow") return (
      <div style={{ padding: 14 }}>
        {step.banner && (
          <div style={{
            background: step.bannerBg || C.accentBg,
            border: `2px solid ${step.bannerBd || C.accentBd}`,
            borderRadius: 10, padding: "8px 12px", marginBottom: 10,
            fontSize: 12, fontWeight: 800, color: step.bannerColor || C.accent,
            textAlign: "center",
          }}>{step.banner}</div>
        )}
        {step.why && step.why.length > 0 && (
          <div style={{
            background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10,
            padding: "10px 12px", marginBottom: 10,
          }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
              💡 {t(E, "Why this way?", "왜 이렇게?")}
            </div>
            {step.why.map((line, i) => (
              <div key={i} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                <span style={{ color: C.accent, fontWeight: 800, flexShrink: 0 }}>•</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        )}
        <CodeBlock lines={step.code} />
      </div>
    );
    if (step.type === "compare3") return <CodeCompare3 E={E} />;
    if (step.type === "runner")   return <BruteRunner E={E} />;
    if (step.type === "scale")    return <SpeedScale E={E} />;
    if (step.type === "progressive") return <ProgressiveCode E={E} sections={step.sections} />;

    return null;
  };

  return (
    <div>
      <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto", padding: "0 12px" }}>
        {/* --- Header + PDF + Language toggle --- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8 }}>
          <h1 style={{ fontSize: 16, fontWeight: 800, color: C.accent, margin: 0, fontFamily: "'Jua',sans-serif" }}>🔄 Roundabout Rounding</h1>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* 코드 언어 선택 — 인앱 + PDF 모두 영향 */}
            <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
              <select
                value={codeLang}
                onChange={e => setCodeLang(e.target.value)}
                title={t(E, "Choose code language (in-app + PDF)", "코드 언어 선택 (인앱 코드 + PDF 모두)")}
                style={{
                  background: "#fff", color: C.accent, border: `1.5px solid ${C.accent}`,
                  borderRadius: "8px 0 0 8px", borderRight: "none",
                  padding: "4px 6px", fontSize: 12, fontWeight: 800, cursor: "pointer",
                }}>
                <option value="py">🐍 Py</option>
                <option value="cpp">💻 C++</option>
              </select>
              <button
                onClick={() => downloadFullPDF(E, getOptSections(E), codeLang)}
                title={t(E, "Download full study guide (problem + brute + pattern + optimal)",
                            "전체 풀이 다운로드 (문제 + 브루트 + 패턴 + 최적화)")}
                style={{
                  background: C.accent, color: "#fff", border: `1.5px solid ${C.accent}`,
                  borderRadius: "0 8px 8px 0",
                  padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 800,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                📄 PDF
              </button>
            </div>
            <div style={{ display: "flex", gap: 2, background: C.card, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: 2 }}>
              {[["ko","🇰🇷"],["en","🇺🇸"]].map(([v, flag]) => (
                <button key={v} onClick={() => switchLang(v)} style={{
                  background: lang === v ? C.accent : "transparent", border: "none", borderRadius: 6,
                  padding: "4px 8px", cursor: "pointer", fontSize: 14, color: lang === v ? "#fff" : C.dim,
                }}>{flag}</button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Tab navigation --- */}
        <div style={{ display: "flex", gap: 3, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
          {TABS.map((label, i) => (
            <button key={i} onClick={() => changeTab(i)} style={{
              flex: "0 0 auto", borderRadius: 8, padding: "6px 10px", cursor: "pointer",
              fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              background: i === tab ? C.accent : "transparent",
              border: `1.5px solid ${i === tab ? C.accent : C.border}`,
              color: i === tab ? "#fff" : C.dim,
            }}>{label}</button>
          ))}
        </div>

        {/* --- Narration --- */}
        {step.narr && <Narration key={`${tab}-${cur}-${lang}`} text={step.narr} color={nc.c} bg={nc.bg} bd={nc.bd} />}

        {/* --- Content card --- */}
        <div style={{
          background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
          marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
        }}>
          {renderContent()}
        </div>

        <div style={{ height: 70 }} />
      </div>

      {/* Fixed bottom navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg, padding: "6px 16px 12px", zIndex: 100 }}>
        <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto", padding: "0 12px" }}>
          {showAnswerHint && (
            <div style={{ textAlign: "center", fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 4 }}>
              {t(E, "💡 Tip: try answering above. (You can skip too — →)",
                  "💡 팁: 위에서 답해보면 좋아요. (그냥 넘어가도 OK — →)")}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <button onClick={prev} disabled={cur === 0} style={{
              background: cur === 0 ? "#e5e7eb" : C.card,
              border: `2px solid ${cur === 0 ? "#e5e7eb" : C.accent}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: cur === 0 ? "default" : "pointer",
              color: cur === 0 ? "#b0b5c3" : C.accent,
            }}>←</button>
            <span style={{ fontSize: 12, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", minWidth: 56, textAlign: "center" }}>
              {cur + 1}/{steps.length}
            </span>
            <button onClick={next} disabled={!canNext} style={{
              background: !canNext ? "#e5e7eb" : C.accent,
              border: `2px solid ${!canNext ? "#e5e7eb" : C.accent}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: !canNext ? "default" : "pointer",
              color: !canNext ? "#b0b5c3" : "#fff",
            }}>→</button>
          </div>
          <div style={{ marginTop: 6, height: 3, background: "#e5e7eb", borderRadius: 2 }}>
            <div style={{ height: "100%", background: C.accent, borderRadius: 2, width: `${((cur + 1) / steps.length) * 100}%`, transition: "width .3s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

