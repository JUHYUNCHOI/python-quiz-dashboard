import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock } from "@/components/quest/shared";
import { InterviewProgressiveCode, downloadInterviewPDF, getInterviewSections, InterviewSim, InterviewRunner } from "./components";
import { makeInterviewCh1, makeInterviewCh2, makeInterviewCh3 } from "./chapters";

const A = "#059669";

export default function InterviewApp(props = {}) {
  const propLang = props.lang;
  const [lang, setLang] = useState(() => {
    if (propLang === "ko" || propLang === "en") return propLang;
    if (typeof window !== "undefined") {
      if (window._questLang === "en") return "en";
      if (window._questLang === "ko") return "ko";
      if (window.localStorage?.getItem("language") === "en") return "en";
    }
    return "ko";
  });
  const E = lang === "en";
  const [codeLang, setCodeLang] = useState("py");
  const [tab, setTab] = useState(0);
  const [si, setSi] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  const [ch1Q, setCh1Q] = useState(() => makeInterviewCh1(false));
  const [ch2Q, setCh2Q] = useState(() => makeInterviewCh2(false));
  const [ch3Q, setCh3Q] = useState(() => makeInterviewCh3(false, "py"));

  useEffect(() => {
    setCh3Q(prev => makeInterviewCh3(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E ? ["📋 Problem", "🔍 Sim", "⚡ Code"] : ["📋 문제", "🔍 시뮬", "⚡ 코드"];
  const setters = { 0: setCh1Q, 1: setCh2Q, 2: setCh3Q };
  const states  = { 0: ch1Q,    1: ch2Q,    2: ch3Q };
  const makers  = { 0: makeInterviewCh1, 1: makeInterviewCh2, 2: (e) => makeInterviewCh3(e, codeLang) };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl); setSi(0);
    for (const k of [0,1,2]) setters[k](makers[k](ne));
  };
  const changeTab = idx => {
    setTab(idx); setSi(0);
    setVisitedTabs(prev => { const n = new Set(prev); n.add(idx); return n; });
    setters[idx](makers[idx](E));
  };

  const steps = states[tab], cur = Math.min(si, steps.length - 1), step = steps[cur];

  const handleAnswer = i => {
    if (step.answered != null) return;
    const u = [...states[tab]]; u[cur] = { ...u[cur], answered: i };
    setters[tab](u);
  };
  const handleSolve = () => {
    const u = [...states[tab]]; u[cur] = { ...u[cur], solved: true };
    setters[tab](u);
  };

  const isBlocked = false;
  const showAnswerHint = (step.type === "quiz" && step.answered == null) || (step.type === "input" && !step.solved);
  const canNext = cur < steps.length - 1;
  const next = () => { if (canNext) { setSi(cur + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const prev = () => { setSi(Math.max(0, cur - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const showCodeControls = tab === 2;

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={step.code} /></div>;
    if (step.type === "progressive") return <InterviewProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    if (step.type === "sim") return <InterviewSim E={E} />;
    if (step.type === "runner") return <InterviewRunner E={E} />;
    return null;
  };

  return (
    <div>
      <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto", padding: "0 12px" }}>
        <div style={{ height: 3, background: "#e5e7eb", borderRadius: 2, marginTop: 8, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", background: A, borderRadius: 2, width: `${((cur + 1) / steps.length) * 100}%`, transition: "width .3s" }} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 4, flex: 1 }}>
            {TABS.map((label, i) => {
              const isCurrent = i === tab;
              const isVisited = visitedTabs.has(i) && !isCurrent;
              return (
                <button key={i} onClick={() => changeTab(i)} style={{
                  flex: "0 0 auto", borderRadius: 8, padding: "6px 10px", cursor: "pointer",
                  fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                  background: isCurrent ? A : (isVisited ? "#d1fae5" : "transparent"),
                  border: `1.5px solid ${isCurrent ? A : (isVisited ? "#6ee7b7" : C.border)}`,
                  color: isCurrent ? "#fff" : (isVisited ? "#065f46" : C.dim),
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {isVisited && <span style={{ fontSize: 10 }}>✓</span>}
                  {label}
                </button>
              );
            })}
          </div>
          {showCodeControls && (
            <div style={{ display: "flex", gap: 0, alignItems: "stretch", flexShrink: 0 }}>
              <select value={codeLang} onChange={e => setCodeLang(e.target.value)} title={t(E, "Choose code language", "코드 언어")} style={{
                background: "#fff", color: A, border: `1.5px solid ${A}`,
                borderRadius: "8px 0 0 8px", borderRight: "none",
                padding: "4px 6px", fontSize: 12, fontWeight: 800, cursor: "pointer",
              }}>
                <option value="py">🐍 Py</option>
                <option value="cpp">💻 C++</option>
              </select>
              <button onClick={() => downloadInterviewPDF(E, getInterviewSections(E), codeLang)} style={{
                background: A, color: "#fff", border: `1.5px solid ${A}`,
                borderRadius: "0 8px 8px 0",
                padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 800,
              }}>📄 PDF</button>
            </div>
          )}
        </div>

        {step.narr && <Narration key={`iv-${tab}-${cur}-${lang}`} text={step.narr} />}

        <div style={{
          background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
          marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
        }}>
          {renderContent()}
        </div>
        <div style={{ height: 70 }} />
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg, padding: "6px 16px 12px", zIndex: 100 }}>
        <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto", padding: "0 12px" }}>
          {showAnswerHint && (
            <div style={{ textAlign: "center", fontSize: 11, color: C.dim, fontWeight: 600, marginBottom: 4 }}>
              {t(E, "💡 Tip: try answering above. (You can skip too — →)", "💡 팁: 위에서 답해보면 좋아요. (그냥 넘어가도 OK — →)")}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <button onClick={prev} disabled={cur === 0} style={{
              background: cur === 0 ? "#e5e7eb" : C.card, border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: cur === 0 ? "default" : "pointer", color: cur === 0 ? "#b0b5c3" : A,
            }}>←</button>
            <span style={{ fontSize: 12, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", minWidth: 56, textAlign: "center" }}>
              {cur + 1}/{steps.length}
            </span>
            <button onClick={next} disabled={!canNext} style={{
              background: !canNext ? "#e5e7eb" : A, border: `2px solid ${!canNext ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: !canNext ? "default" : "pointer", color: !canNext ? "#b0b5c3" : "#fff",
            }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
