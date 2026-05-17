import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock, CodeReveal } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import {
  CodeCompare3, BruteRunner, SpeedScale, IntervalSim, ProgressiveCode, downloadFullPDF,
  RecapDrawer,
} from "./components";
import {
  makeCh1, makePatternSteps, makeBruteSteps, makeOptSteps, getOptSections,
} from "./chapters";
import { useCodeLang } from "@/components/quest/use-code-lang";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

const A = C.accent;

export default function RoundingApp(props = {}) {
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

  // --- Position persistence ---
  const _posKey = typeof window !== "undefined" ? `quest-pos-${window.location.pathname}` : "";
  const _loadPos = () => {
    if (typeof window === "undefined") return { tab: 0, si: 0 };
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [tab, setTab] = useState(typeof _initial.tab === "number" ? _initial.tab : 0);
  const [si, setSi]   = useState(typeof _initial.si === "number" ? _initial.si : 0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
  }, [tab, si, _posKey]);

  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  // --- Quiz state (mutable, with answered/solved tracking) ---
  // Init with current E so EN-mode-on-first-load doesn't stick on Korean.
  const [patternQ, setPatternQ] = useState(() => makePatternSteps(lang === "en"));
  const [bruteQ, setBruteQ]     = useState(() => makeBruteSteps(lang === "en", "py"));
  const [optQ, setOptQ]         = useState(() => makeOptSteps(lang === "en"));

  // codeLang change → rebuild brute steps (preserve answered/solved)
  useEffect(() => {
    setBruteQ(prev => makeBruteSteps(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  // --- Tab order: 0=Problem, 1=Try Solving (brute), 2=Pattern, 3=Optimize ---
  const TABS = E
    ? ["📋 Problem", "🤔 Try Solving", "💡 Pattern", "⚡ Optimize"]
    : ["📋 문제", "🤔 풀어보기", "💡 패턴", "⚡ 최적화"];

  const ch1 = makeCh1(E);
  const all = [ch1, bruteQ, patternQ, optQ];
  const states = { 0: ch1, 1: bruteQ, 2: patternQ, 3: optQ };
  const steps = all[tab];
  const cur   = Math.min(si, steps.length - 1);
  const step  = steps[cur];

  // --- Lang switch ---
  const switchLang = nl => {
    const ne = nl === "en";
    setLang(nl);
    setPatternQ(prev => makePatternSteps(ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setBruteQ(prev => makeBruteSteps(ne, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setOptQ(prev => makeOptSteps(ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  };

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) {
      switchLang(propLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  // --- Quiz/input handlers ---
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
    if (tab === 2) setPatternQ(update(patternQ));
    if (tab === 3) setOptQ(update(optQ));
  };

  const showAnswerHint =
    ((tab >= 1) && step.type === "quiz" && step.answered == null) ||
    ((tab >= 1) && step.type === "input" && !step.solved);

  const canNext = cur < steps.length - 1 || tab < TABS.length - 1;

  const next = () => {
    if (cur < steps.length - 1) {
      setSi(cur + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (tab < TABS.length - 1) {
      const nextTab = tab + 1;
      setTab(nextTab); setSi(0);
      setVisitedTabs(prev => { const n = new Set(prev); n.add(nextTab); return n; });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prev = () => {
    setSi(Math.max(0, cur - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Render step content ---
  const renderContent = () => {
    if (tab === 0) return step.content;
    if (step.type === "quiz")   return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "input")  return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "code")     return <CodeReveal label={step.label} lines={step.code} />;
    if (step.type === "compare3") return <CodeCompare3 E={E} />;
    if (step.type === "runner")   return <BruteRunner E={E} />;
    if (step.type === "scale")    return <SpeedScale E={E} />;
    if (step.type === "interval-sim") return <IntervalSim E={E} />;
    if (step.type === "progressive") return <ProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    if (step.type === "code-section") return <CodeSectionView E={E} lang={codeLang} section={step.section} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (!s) return null;
    if (s.type === "quiz")   return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input")  return <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />;
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "compare3") return <CodeCompare3 E={E} />;
    if (s.type === "runner")   return <BruteRunner E={E} />;
    if (s.type === "scale")    return <SpeedScale E={E} />;
    if (s.type === "interval-sim") return <IntervalSim E={E} />;
    if (s.type === "progressive") return <ProgressiveCode E={E} lang={codeLang} sections={s.sections} />;
    if (s.type === "code-section") return <CodeSectionView E={E} lang={codeLang} section={s.section} />;
    return null;
  };

  // PDF / code-lang controls only meaningful when code is on screen
  const showCodeControls = tab === 1 || tab === 3;

  const codeControlsSlot = showCodeControls ? (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      <select
        value={codeLang}
        onChange={e => setCodeLang(e.target.value)}
        title={t(E, "Code language", "코드 언어")}
        style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: "8px 0 0 8px", borderRight: "none",
          padding: "4px 6px", fontSize: 12, fontWeight: 800, cursor: "pointer",
        }}>
        <option value="py">🐍 Py</option>
        <option value="cpp">💻 C++</option>
      </select>
      <button
        onClick={() => downloadFullPDF(E, getOptSections(E), codeLang)}
        title={t(E, "Download full study guide", "전체 풀이 PDF 다운로드")}
        style={{
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

        {step.narr && <Narration key={`roun-${tab}-${cur}-${lang}`} text={step.narr} />}

        {/* Recap drawer — narration 의 '챕터 X 에서 ... 였더라?' 류 호출 옆에 자연스럽게 */}
        {step.recap && (
          <div style={{ marginTop: -4, marginBottom: 10 }}>
            <RecapDrawer
              buttonLabel={step.recapLabel || t(E, "Recap", "이전 챕터 다시 보기")}
              title={step.recapTitle || step.recapLabel}
              E={E}
            >
              {step.recap}
            </RecapDrawer>
          </div>
        )}

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
