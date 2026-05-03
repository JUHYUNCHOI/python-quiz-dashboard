import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeReveal } from "@/components/quest/shared";
import { FanSimulator, FanPlacementViz, SeparatorBuildViz, FormulaTrace } from "./components";
import { makeFansCh1, makeFansCh2, makeFansCh3 } from "./chapters";

const A = "#d97706";

export default function FansApp(props = {}) {
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
  const [tab, setTab] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));
  const [si, setSi] = useState(0);

  const [ch1Q, setCh1Q] = useState(() => makeFansCh1(false));
  const [ch2Q, setCh2Q] = useState(() => makeFansCh2(false));
  const [ch3Q, setCh3Q] = useState(() => makeFansCh3(false));

  const TABS = E
    ? ["📋 Problem", "🏗️ Sim", "⚡ Code"]
    : ["📋 문제", "🏗️ 시뮬", "⚡ 코드"];

  const setters = { 0: setCh1Q, 1: setCh2Q, 2: setCh3Q };
  const states  = { 0: ch1Q,    1: ch2Q,    2: ch3Q };
  const makers  = { 0: makeFansCh1, 1: makeFansCh2, 2: makeFansCh3 };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl); setSi(0);
    for (const k of [0,1,2]) setters[k](makers[k](ne));
  };
  const changeTab = idx => {
    setTab(idx); setSi(0);
    setVisitedTabs(prev => { const n = new Set(prev); n.add(idx); return n; });
    setters[idx](makers[idx](E));
  };
  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);


  const steps = states[tab];
  const cur = Math.min(si, steps.length - 1);
  const step = steps[cur];

  const handleAnswer = optIdx => {
    if (step.answered != null) return;
    const setter = setters[tab], state = states[tab];
    const u = [...state]; u[cur] = { ...u[cur], answered: optIdx };
    setter(u);
  };

  const handleSolve = () => {
    const setter = setters[tab], state = states[tab];
    const u = [...state]; u[cur] = { ...u[cur], solved: true };
    setter(u);
  };

  const isBlocked = (step.type === "quiz" && step.answered == null) || (step.type === "input" && !step.solved);
  const canNext = cur < steps.length - 1;  // isBlocked 무시 — 자유 진행
  const next = () => { if (canNext) { setSi(cur + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const prev = () => { setSi(Math.max(0, cur - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "code") return <CodeReveal label={step.label} lines={step.code} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "fanSimulator") return <FanSimulator E={E} />;
    if (step.type === "fanPlacementViz") return <FanPlacementViz E={E} />;
    if (step.type === "separatorBuildViz") return <SeparatorBuildViz E={E} />;
    if (step.type === "formulaTrace") return <FormulaTrace E={E} />;
    return null;
  };

  return (
    <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h1 style={{ fontSize: 16, fontWeight: 800, color: A, margin: 0, fontFamily: "'Jua',sans-serif" }}>🪭 Fans</h1>
        <div style={{ display: "flex", gap: 2, background: C.card, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: 2 }}>
          { false && [["ko", "🇰🇷"], ["en", "🇺🇸"]].map(([v, flag]) =>
            <button key={v} onClick={() => switchLang(v)} style={{
              background: lang === v ? C.accent : "transparent", border: "none", borderRadius: 6,
              padding: "4px 8px", cursor: "pointer", fontSize: 14, color: lang === v ? "#fff" : C.dim,
            }}>{flag}</button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 3, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {TABS.map((label, i) => {
          const isCurrent = i === tab;
          const isVisited = visitedTabs.has(i) && !isCurrent;
          return (
            <button key={i} onClick={() => changeTab(i)} style={{
              flex: "0 0 auto", borderRadius: 8, padding: "6px 10px", cursor: "pointer",
              fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
              background: isCurrent ? A : (isVisited ? `${A}20` : "transparent"),
              border: `1.5px solid ${isCurrent ? A : (isVisited ? `${A}60` : C.border)}`,
              color: isCurrent ? "#fff" : (isVisited ? A : C.dim),
              display: "flex", alignItems: "center", gap: 4,
            }}>{isVisited && <span style={{ fontSize: 10 }}>✓</span>}{label}</button>
          );
        })}
      </div>

      {/* Narration */}
      {step.narr && <Narration key={`fans-${tab}-${cur}-${lang}`} text={step.narr} />}

      {/* Content */}
      <div style={{
        background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
        marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
      }}>
        {renderContent()}
      </div>

      <div style={{ height: 70 }} />

      {/* Fixed bottom navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg, padding: "6px 16px 12px", zIndex: 100 }}>
        <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto" }}>
          {isBlocked && (
            <div style={{ textAlign: "center", fontSize: 13, color: C.carry, fontWeight: 700, marginBottom: 4, animation: "pulse 1.5s ease infinite" }}>
              {E ? "💡 Tip: try answering above" : "💡 팁: 위에서 답해보면 좋아요"}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <button onClick={prev} disabled={cur === 0} style={{
              background: cur === 0 ? "#e5e7eb" : C.card,
              border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: cur === 0 ? "default" : "pointer", color: cur === 0 ? "#b0b5c3" : A,
            }}>←</button>
            <span style={{ fontSize: 12, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", minWidth: 56, textAlign: "center" }}>
              {cur + 1}/{steps.length}
            </span>
            <button onClick={next} disabled={!canNext} style={{
              background: !canNext ? "#e5e7eb" : A,
              border: `2px solid ${!canNext ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: !canNext ? "default" : "pointer", color: !canNext ? "#b0b5c3" : "#fff",
            }}>→</button>
          </div>
          <div style={{ marginTop: 6, height: 3, background: "#e5e7eb", borderRadius: 2 }}>
            <div style={{ height: "100%", background: A, borderRadius: 2, width: `${((cur + 1) / steps.length) * 100}%`, transition: "width .3s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
