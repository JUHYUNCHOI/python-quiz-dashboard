import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { AbcsProgressiveCode, downloadAbcsPDF, getAbcsSections } from "./components";
import { makeAbcsCh1, makeAbcsCh2 } from "./chapters";
import { useCodeLang } from "@/components/quest/use-code-lang";

const A = "#d97706";

export default function AbcsApp(props = {}) {
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
  const [codeLang, setCodeLang] = useCodeLang();
  const _posKey = typeof window !== "undefined" ? `quest-pos-${window.location.pathname}` : "";
  const _loadPos = () => {
    if (typeof window === "undefined") return { tab: 0, si: 0 };
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [tab, setTab] = useState(typeof _initial.tab === "number" ? _initial.tab : 0);
  const [si, setSi] = useState(typeof _initial.si === "number" ? _initial.si : 0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  const [ch1Q, setCh1Q] = useState(() => makeAbcsCh1(false));
  const [ch2Q, setCh2Q] = useState(() => makeAbcsCh2(false, "py"));

  useEffect(() => {
    setCh2Q(prev => makeAbcsCh2(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
  }, [tab, si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E ? ["📋 Problem", "⚡ Code"] : ["📋 문제", "⚡ 코드"];
  const setters = { 0: setCh1Q, 1: setCh2Q };
  const states  = { 0: ch1Q,    1: ch2Q };
  const makers  = { 0: makeAbcsCh1, 1: (e) => makeAbcsCh2(e, codeLang) };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl);
    for (const k of [0,1]) setters[k](prev => makers[k](ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
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

  const showCodeControls = tab === 1;

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={step.code} /></div>;
    if (step.type === "progressive") return <AbcsProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (s.type === "quiz") return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input") return (
      <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />
    );
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={s.code} /></div>;
    if (s.type === "progressive") return <AbcsProgressiveCode E={E} lang={codeLang} sections={s.sections} />;
    return null;
  };

  const codeControlsSlot = showCodeControls ? (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      <select value={codeLang} onChange={e => setCodeLang(e.target.value)} title={t(E, "Code language", "코드 언어")} style={{
        background: "#fff", color: A, border: `1.5px solid ${A}`,
        borderRadius: "8px 0 0 8px", borderRight: "none",
        padding: "4px 6px", fontSize: 12, fontWeight: 800, cursor: "pointer",
      }}>
        <option value="py">🐍 Py</option>
        <option value="cpp">💻 C++</option>
      </select>
      <button onClick={() => downloadAbcsPDF(E, getAbcsSections(E), codeLang)} style={{
        background: A, color: "#fff", border: `1.5px solid ${A}`,
        borderRadius: "0 8px 8px 0",
        padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 800,
      }}>📄 PDF</button>
    </div>
  ) : null;

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
          codeControlsSlot={codeControlsSlot}
        />

        {step.narr && <Narration key={`abcs-${tab}-${cur}-${lang}`} text={step.narr} />}

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
