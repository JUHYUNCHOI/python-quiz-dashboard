import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeReveal, TextInput } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { DistanceCalc, GreedySim, WordBuilder, GreedyTrace, MarginalGainSim } from "./components";
import { makeWordCh1, makeWordCh2, makeWordCh3 } from "./chapters";

const A = "#3b82f6";

export default function WordApp(props = {}) {
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
  const _posKey = typeof window !== "undefined" ? `quest-pos-${window.location.pathname}` : "";
  const _loadPos = () => {
    if (typeof window === "undefined") return { tab: 0, si: 0 };
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [tab, setTab] = useState(typeof _initial.tab === "number" ? _initial.tab : 0);
  const [si, setSi] = useState(typeof _initial.si === "number" ? _initial.si : 0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  const [ch1Q, setCh1Q] = useState(() => makeWordCh1(false));
  const [ch2Q, setCh2Q] = useState(() => makeWordCh2(false));
  const [ch3Q, setCh3Q] = useState(() => makeWordCh3(false));


  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
  }, [tab, si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E ? ["📋 Problem", "📝 Sim", "⚡ Code"] : ["📋 문제", "📝 시뮬", "⚡ 코드"];
  const setters = { 0: setCh1Q, 1: setCh2Q, 2: setCh3Q };
  const states  = { 0: ch1Q,    1: ch2Q,    2: ch3Q };
  const makers  = { 0: makeWordCh1, 1: makeWordCh2, 2: makeWordCh3 };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl);
    for (const k of [0,1,2]) setters[k](prev => makers[k](ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
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

  const showAnswerHint = (step.type === "quiz" && step.answered == null) || (step.type === "input" && !step.solved);
  const canNext = cur < steps.length - 1 || tab < TABS.length - 1;
  const next = () => {
    if (cur < steps.length - 1) {
      setSi(cur + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab < TABS.length - 1) {
      setVisitedTabs(prev => { const n = new Set(prev); n.add(tab + 1); return n; });
      setTab(tab + 1); setSi(0);
      setters[tab + 1](makers[tab + 1](E));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prev = () => { setSi(Math.max(0, cur - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };


  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") {
      if (typeof step.answer === "string") {
        return <TextInput key={`${tab}-${cur}-${lang}`} question={step.question} answer={step.answer} E={E} onSolve={handleSolve} />;
      }
      return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    }
    if (step.type === "code") return <CodeReveal label={step.label} lines={step.code} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "distanceCalc") return <DistanceCalc E={E} />;
    if (step.type === "greedySim") return <GreedySim E={E} />;
    if (step.type === "wordBuilder") return <WordBuilder E={E} />;
    if (step.type === "greedyTrace") return <GreedyTrace E={E} />;
    if (step.type === "marginalGainSim") return <MarginalGainSim E={E} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (s.type === "quiz") return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input") {
      if (typeof s.answer === "string") {
        return <TextInput question={s.question} answer={s.answer} E={E} onSolve={() => {}} />;
      }
      return <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />;
    }
    if (s.type === "code") return <CodeReveal label={s.label} lines={s.code} />;
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "distanceCalc") return <DistanceCalc E={E} />;
    if (s.type === "greedySim") return <GreedySim E={E} />;
    if (s.type === "wordBuilder") return <WordBuilder E={E} />;
    if (s.type === "greedyTrace") return <GreedyTrace E={E} />;
    if (s.type === "marginalGainSim") return <MarginalGainSim E={E} />;
    return null;
  };


  return (
    <div>
      <div style={{ maxWidth: "min(880px, 100%)", margin: "0 auto", padding: "0 clamp(4px, 2vw, 16px)" }}>
        <QuestProgressBar
          tabs={TABS}
          states={states}
          tab={tab}
          cur={cur}
          setTab={setTab}
          setSi={setSi}
          setVisitedTabs={setVisitedTabs}
          accent={A}
          E={E}
          renderPreviewBody={renderPreviewBody}
          
        />

        {step.narr && <Narration key={`word-${tab}-${cur}-${lang}`} text={step.narr} />}

        <div style={{
          background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
          marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
          minHeight: 460,
        }}>
          {renderContent()}
        </div>
        <div style={{ height: 110 }} />
      </div>

      <QuestBottomNav
        cur={cur}
        canNext={canNext}
        accent={A}
        E={E}
        onPrev={prev}
        onNext={next}
        showAnswerHint={showAnswerHint}
      />
    </div>
  );
}
