import { useState, useEffect } from "react";
import { C } from "@/components/quest/theme";
import { Narration, Quiz, CodeBlock } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { makeChapters } from "./chapters";

const A = "#0891b2"; // teal-600

export default function Lc1480App(props = {}) {
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
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [si, setSi] = useState(typeof _initial.si === "number" ? _initial.si : 0);
  const [steps, setSteps] = useState(() => makeChapters(E));

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ si })); } catch {}
  }, [si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) {
      const ne = propLang === "en"; setLang(propLang);
      setSteps(prev => makeChapters(ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    }
  }, [propLang]);

  const cur = Math.min(si, steps.length - 1);
  const step = steps[cur];

  const handleAnswer = i => {
    if (step.answered != null) return;
    const u = [...steps]; u[cur] = { ...u[cur], answered: i }; setSteps(u);
  };

  const showAnswerHint = step.type === "quiz" && step.answered == null;
  const canNext = cur < steps.length - 1;
  const next = () => { setSi(cur + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const prev = () => { setSi(Math.max(0, cur - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const TABS = E ? ["📋 Problem"] : ["📋 문제"];
  const states = { 0: steps };

  const renderStep = (s, interactive = true) => {
    if (s.type === "quiz") return <Quiz {...s} onAnswer={interactive ? handleAnswer : () => {}} />;
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={s.code} /></div>;
    return null;
  };

  return (
    <div>
      <div style={{ maxWidth: "min(880px, 100%)", margin: "0 auto", padding: "0 clamp(4px, 2vw, 16px)" }}>
        <QuestProgressBar
          tabs={TABS} states={states} tab={0} cur={cur}
          setTab={() => {}} setSi={setSi} setVisitedTabs={() => {}}
          accent={A} E={E}
          renderPreviewBody={(s) => renderStep(s, false)}
          codeControlsSlot={null}
        />
        {step.narr && <Narration key={`lc1480-${cur}-${lang}`} text={step.narr} />}
        <div style={{
          background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
          marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden", minHeight: 460,
        }}>
          {renderStep(step)}
        </div>
        <div style={{ height: 110 }} />
      </div>
      <QuestBottomNav cur={cur} canNext={canNext} accent={A} E={E} onPrev={prev} onNext={next} showAnswerHint={showAnswerHint} />
    </div>
  );
}
