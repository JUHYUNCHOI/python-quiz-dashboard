import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { AlgorithmTags } from "@/components/quest/AlgorithmTags";
import { CodeSectionView } from "@/components/quest/CodeSectionView";
import { MooSim, MooBruteRunner, MooRTRSim, MooProgressiveCode, downloadMooPDF, getMooSections } from "./components";
import { makeMooCh1, makeMooCh2, makeMooCh3, makeMooCh4, makeMooCh5 } from "./chapters";
import { useCodeLang } from "@/components/quest/use-code-lang";

const A = "#7c5cfc";

export default function MooApp(props = {}) {
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

  // Persist tab/si across refresh
  const _posKey = typeof window !== "undefined" ? `quest-pos-${window.location.pathname}` : "";
  const _loadPos = () => {
    if (typeof window === "undefined") return { tab: 0, si: 0 };
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [tab, setTab] = useState(typeof _initial.tab === "number" ? _initial.tab : 0);
  const [si, setSi] = useState(typeof _initial.si === "number" ? _initial.si : 0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  // Init with current E so EN-mode-on-first-load doesn't stick on Korean.
  const [ch1Q, setCh1Q] = useState(() => makeMooCh1(lang === "en"));
  const [ch2Q, setCh2Q] = useState(() => makeMooCh2(lang === "en"));
  const [ch3Q, setCh3Q] = useState(() => makeMooCh3(lang === "en"));
  const [ch4Q, setCh4Q] = useState(() => makeMooCh4(lang === "en"));
  const [ch5Q, setCh5Q] = useState(() => makeMooCh5(lang === "en", "py"));

  // codeLang change → rebuild Ch5 (preserve answered/solved)
  useEffect(() => {
    setCh5Q(prev => makeMooCh5(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  // Save tab + si to localStorage on every change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
  }, [tab, si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) {
      switchLang(propLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E
    ? ["📋 Problem", "🔍 Sim", "🐍 Brute", "💡 Pattern", "⚡ Code"]
    : ["📋 문제", "🔍 시뮬", "🐍 브루트", "💡 패턴", "⚡ 코드"];

  const setters = { 0: setCh1Q, 1: setCh2Q, 2: setCh3Q, 3: setCh4Q, 4: setCh5Q };
  const states  = { 0: ch1Q,    1: ch2Q,    2: ch3Q,    3: ch4Q,    4: ch5Q };
  const makers  = { 0: makeMooCh1, 1: makeMooCh2, 2: makeMooCh3, 3: makeMooCh4, 4: (e) => makeMooCh5(e, codeLang) };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl);
    for (const k of [0,1,2,3,4]) setters[k](prev => makers[k](ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  };

  const steps = states[tab];
  const cur = Math.min(si, steps.length - 1);
  const step = steps[cur];

  const handleAnswer = optIdx => {
    if (step.answered != null) return;
    const u = [...states[tab]]; u[cur] = { ...u[cur], answered: optIdx };
    setters[tab](u);
  };
  const handleSolve = () => {
    const u = [...states[tab]]; u[cur] = { ...u[cur], solved: true };
    setters[tab](u);
  };

  const showAnswerHint =
    (step.type === "quiz" && step.answered == null) ||
    (step.type === "input" && !step.solved);

  const canNext = cur < steps.length - 1 || tab < TABS.length - 1;
  const canPrev = cur > 0 || tab > 0;
  const next = () => {
    if (cur < steps.length - 1) {
      setSi(cur + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab < TABS.length - 1) {
      const nextTab = tab + 1;
      setTab(nextTab); setSi(0);
      setVisitedTabs(prev => { const n = new Set(prev); n.add(nextTab); return n; });
      setters[nextTab](makers[nextTab](E));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prev = () => {
    if (cur > 0) {
      setSi(cur - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (tab > 0) {
      const prevTab = tab - 1;
      const prevSteps = states[prevTab];
      setTab(prevTab);
      setSi(prevSteps.length - 1);
      setVisitedTabs(p => { const n = new Set(p); n.add(prevTab); return n; });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showCodeControls = tab === 2 || tab === 4;

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={step.code} /></div>;
    if (step.type === "mooSim") return <MooSim E={E} />;
    if (step.type === "mooRunner") return <MooBruteRunner E={E} />;
    if (step.type === "mooRTR") return <MooRTRSim E={E} />;
    if (step.type === "progressive") return <MooProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    if (step.type === "code-section") return <CodeSectionView E={E} lang={codeLang} section={step.section} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (!s) return null;
    if (s.type === "quiz") return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input") return <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />;
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={s.code} /></div>;
    if (s.type === "mooSim") return <MooSim E={E} />;
    if (s.type === "mooRunner") return <MooBruteRunner E={E} />;
    if (s.type === "mooRTR") return <MooRTRSim E={E} />;
    if (s.type === "progressive") return <MooProgressiveCode E={E} lang={codeLang} sections={s.sections} />;
    if (s.type === "code-section") return <CodeSectionView E={E} lang={codeLang} section={s.section} />;
    return null;
  };

  const codeControlsSlot = showCodeControls ? (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      <button
        onClick={() => downloadMooPDF(E, getMooSections(E), codeLang)}
        title={t(E, "Download full study guide", "전체 풀이 PDF 다운로드")}
        style={{
          background: A, color: "#fff", border: `1.5px solid ${A}`,
          borderRadius: "8px",
          padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 800,
        }}>📄 PDF</button>
    </div>
  ) : null;

  return (
    <div>
      <div style={{ maxWidth: "min(880px, 100%)", margin: "0 auto", padding: "0 clamp(4px, 2vw, 16px)" }}>
        <AlgorithmTags E={E} tags={[
          { icon: "🔍", ko: "완전 탐색 (brute force)", en: "Brute force" },
          { icon: "🗂️", ko: "해시맵·집합 (hash map / set)", en: "Hash map / set", href: "/algo/hashtable/learn?from=quest" },
        ]} />

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

        {step.narr && <Narration key={`moo-${tab}-${cur}-${lang}`} text={step.narr} />}

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
        canPrev={canPrev}
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
