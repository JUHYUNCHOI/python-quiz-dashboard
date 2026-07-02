import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { CheckupsProgressiveCode, downloadCheckupsPDF, getCheckupsSections, CheckupsSim, CheckupsRunner } from "./components";
import { makeCheckupsCh1, makeCheckupsCh2, makeCheckupsCh3, makeCheckupsCh4 } from "./chapters";
import { useCodeLang } from "@/components/quest/use-code-lang";

const A = "#dc2626";

export default function CheckupsApp(props = {}) {
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

  const [ch1Q, setCh1Q] = useState(() => makeCheckupsCh1(lang === "en"));
  const [ch2Q, setCh2Q] = useState(() => makeCheckupsCh2(lang === "en", "py"));
  const [ch3Q, setCh3Q] = useState(() => makeCheckupsCh3(lang === "en", "py"));
  const [ch4Q, setCh4Q] = useState(() => makeCheckupsCh4(lang === "en", "py"));

  // codeLang change → rebuild Ch2 (brute code) + Ch4 (smart code) preserving answered/solved
  useEffect(() => {
    setCh2Q(prev => makeCheckupsCh2(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setCh3Q(prev => makeCheckupsCh3(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
    setCh4Q(prev => makeCheckupsCh4(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
  }, [tab, si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E
    ? ["📋 Problem", "🐢 First Try", "💡 Fast Idea", "⚡ Code"]
    : ["📋 문제", "🐢 첫 시도", "💡 빠른 풀이", "⚡ 코드"];
  const setters = { 0: setCh1Q, 1: setCh2Q, 2: setCh3Q, 3: setCh4Q };
  const states  = { 0: ch1Q,    1: ch2Q,    2: ch3Q,    3: ch4Q };
  const makers  = {
    0: makeCheckupsCh1,
    1: (e) => makeCheckupsCh2(e, codeLang),
    2: (e) => makeCheckupsCh3(e, codeLang),
    3: (e) => makeCheckupsCh4(e, codeLang),
  };

  const switchLang = nl => {
    const ne = nl === "en"; setLang(nl);
    for (const k of [0,1,2,3]) setters[k](prev => makers[k](ne).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
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
  const canPrev = cur > 0 || tab > 0;
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

  const showCodeControls = tab === 1 || tab === 3;

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={step.code} /></div>;
    if (step.type === "progressive") return <CheckupsProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    if (step.type === "sim") return <CheckupsSim E={E} />;
    if (step.type === "runner") return <CheckupsRunner E={E} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (s.type === "quiz") return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input") return (
      <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />
    );
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={s.code} /></div>;
    if (s.type === "progressive") return <CheckupsProgressiveCode E={E} lang={codeLang} sections={s.sections} />;
    if (s.type === "sim") return <CheckupsSim E={E} />;
    if (s.type === "runner") return <CheckupsRunner E={E} />;
    return null;
  };

  const codeControlsSlot = showCodeControls ? (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      <button onClick={() => downloadCheckupsPDF(E, getCheckupsSections(E), codeLang)} style={{
        background: A, color: "#fff", border: `1.5px solid ${A}`,
        borderRadius: "8px",
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

        {step.narr && <Narration key={`ck-${tab}-${cur}-${lang}`} text={step.narr} />}

        <div style={{
          background: C.card, borderRadius: 14, border: `2px solid ${C.border}`,
          marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,.04)", overflow: "hidden",
          minHeight: 460,
          // 데스크탑에서 짧은 슬라이드가 위에 몰려 아래가 텅 비지 않게 — 내용을 세로 가운데로
          // (선생님 2026-07-02: '데스크탑 레이아웃 이쁘지 않다'). 내용이 460 넘으면 자연히 위→아래로 흐름.
          display: "flex", flexDirection: "column", justifyContent: "center",
          wordBreak: "keep-all",   // 한글 단어 중간 줄바꿈 방지 — 상속되어 전 챕터 텍스트에 적용 (선생님 반복 지적)
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
