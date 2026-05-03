import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeReveal } from "@/components/quest/shared";
import { makeMilkMeasCh1, makeMilkMeasCh2 } from "./chapters";

const A = "#8b5cf6";

export default function MilkMeasApp(props = {}) {
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

  const [ch1Q, setCh1Q] = useState(() => makeMilkMeasCh1(false));
  const [ch2Q, setCh2Q] = useState(() => makeMilkMeasCh2(false));

  const TABS = E
    ? ["\ud83d\udccb Problem", "\u26a1 Code"]
    : ["\ud83d\udccb \ubb38\uc81c", "\u26a1 \ucf54\ub4dc"];

  const setters = { 0: setCh1Q, 1: setCh2Q };
  const states  = { 0: ch1Q,    1: ch2Q };
  const makers  = { 0: makeMilkMeasCh1, 1: makeMilkMeasCh2 };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl); setSi(0);
    for (const k of [0,1]) setters[k](makers[k](ne));
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
    return null;
  };

  return (
    <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h1 style={{ fontSize: 16, fontWeight: 800, color: A, margin: 0, fontFamily: "'Jua',sans-serif" }}>{"\ud83d\udcca"} Milk Measurement</h1>
        <div style={{ display: "flex", gap: 2, background: C.card, borderRadius: 8, border: `1.5px solid ${C.border}`, padding: 2 }}>
          {[["ko", "\ud83c\uddf0\ud83c\uddf7"], ["en", "\ud83c\uddfa\ud83c\uddf8"]].map(([v, flag]) =>
            <button key={v} onClick={() => switchLang(v)} style={{
              background: lang === v ? C.accent : "transparent", border: "none", borderRadius: 6,
              padding: "4px 8px", cursor: "pointer", fontSize: 14, color: lang === v ? "#fff" : C.dim,
            }}>{flag}</button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 3, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {TABS.map((label, i) =>
          <button key={i} onClick={() => changeTab(i)} style={{
            flex: "0 0 auto", borderRadius: 8, padding: "6px 10px", cursor: "pointer",
            fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
            background: i === tab ? A : "transparent",
            border: `1.5px solid ${i === tab ? A : C.border}`,
            color: i === tab ? "#fff" : C.dim,
          }}>{label}</button>
        )}
      </div>

      {step.narr && <Narration key={`mms-${tab}-${cur}-${lang}`} text={step.narr} />}

      <div style={{
        background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
        marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
      }}>
        {renderContent()}
      </div>

      <div style={{ height: 70 }} />

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.bg, padding: "6px 16px 12px", zIndex: 100 }}>
        <div style={{ maxWidth: "min(820px, 100%)", margin: "0 auto" }}>
          {isBlocked && (
            <div style={{ textAlign: "center", fontSize: 13, color: C.carry, fontWeight: 700, marginBottom: 4, animation: "pulse 1.5s ease infinite" }}>
              {E ? "\ud83d\udca1 Tip: try answering above" : "\ud83d\udca1 \ud301: \uc704\uc5d0\uc11c \ub2f5\ud574\ubcf4\uba74 \uc88b\uc544\uc694"}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <button onClick={prev} disabled={cur === 0} style={{
              background: cur === 0 ? "#e5e7eb" : C.card,
              border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: cur === 0 ? "default" : "pointer", color: cur === 0 ? "#b0b5c3" : A,
            }}>{"\u2190"}</button>
            <span style={{ fontSize: 12, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", minWidth: 56, textAlign: "center" }}>
              {cur + 1}/{steps.length}
            </span>
            <button onClick={next} disabled={!canNext} style={{
              background: !canNext ? "#e5e7eb" : A,
              border: `2px solid ${!canNext ? "#e5e7eb" : A}`,
              borderRadius: 9, padding: "10px 22px", fontSize: 14, fontWeight: 800,
              cursor: !canNext ? "default" : "pointer", color: !canNext ? "#b0b5c3" : "#fff",
            }}>{"\u2192"}</button>
          </div>
          <div style={{ marginTop: 6, height: 3, background: "#e5e7eb", borderRadius: 2 }}>
            <div style={{ height: "100%", background: A, borderRadius: 2, width: `${((cur + 1) / steps.length) * 100}%`, transition: "width .3s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
