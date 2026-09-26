import { useState, useEffect } from "react";
import { C, t } from "@/components/quest/theme";
import { Narration, Quiz, NumInput, CodeBlock } from "@/components/quest/shared";
import { QuestProgressBar, QuestBottomNav } from "@/components/quest/QuestNavBar";
import { Mcc20CityTourProgressiveCode, downloadMcc20CityTourPDF, getMcc20CityTourSections } from "./components";
import { makeMcc20CityTourCh1, makeMcc20CityTourCh2 } from "./chapters";
import { useCodeLang } from "@/components/quest/use-code-lang";

const A = "#d97706";

export default function Mcc20CityTourApp(props = {}) {
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
  /* ⭐ 2026-09-26 선생님 직접 지시: "c++코드로도 만들어줘. 이 MCC는" —
     이 quest 는 MCC 지만 예외로 C++ 토글을 켠다(client.tsx 의 허용 목록 참고).
     다른 MCC 는 여전히 Python 전용이다 — 그 규칙은 안 건드린다. */
  const [codeLang] = useCodeLang();
  const _posKey = typeof window !== "undefined" ? `quest-pos-${window.location.pathname}` : "";
  const _loadPos = () => {
    if (typeof window === "undefined") return { tab: 0, si: 0 };
    try { return JSON.parse(window.localStorage.getItem(_posKey) || "{}"); } catch { return {}; }
  };
  const _initial = _loadPos();
  const [tab, setTab] = useState(typeof _initial.tab === "number" ? _initial.tab : 0);
  const [si, setSi] = useState(typeof _initial.si === "number" ? _initial.si : 0);
  const [visitedTabs, setVisitedTabs] = useState(() => new Set([0]));

  const [ch1Q, setCh1Q] = useState(() => makeMcc20CityTourCh1(lang === "en"));
  const [ch2Q, setCh2Q] = useState(() => makeMcc20CityTourCh2(lang === "en", "py"));

  useEffect(() => {
    setCh2Q(prev => makeMcc20CityTourCh2(E, codeLang).map((s, i) => ({ ...s, answered: prev[i]?.answered, solved: prev[i]?.solved })));
  }, [codeLang, E]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(_posKey, JSON.stringify({ tab, si })); } catch {}
    /* ⭐ 2026-09-26 선생님: *"중간에 BFS 공부하고 오라고 **크게** 알려주면 좋을텐데"*
       그 장치는 **이미 있었다** — `app/quest/[problemId]/client.tsx` 가
       `quest-algohint` 를 받으면 보라색 **큰 배너(📘)** 를, 안 받으면 작은 줄(🧠)을 띄운다.
       그런데 이 quest 는 **① `lib/quest-algo.ts` 의 `graph` 매핑이 주석에 삼켜져 있었고**
       (오늘 복구) **② 이 이벤트를 한 번도 안 쏘고 있었다.** 둘 다라서 아무것도 안 떴다.
       ⚠️ 이 주석을 쓸 때는 이벤트를 쏘는 quest 가 **3개**뿐이었다. 같은 날 69개를
       더 배선해서 지금은 **73개**다(`7a9a3286`). 매핑은 51개 — 수가 안 맞는 건
       매핑 없이 쏘는 quest 가 있어서고, 그건 `client.tsx` 가 알아서 무시한다.
       ⭐ `tab >= 1`(코드 쪽)에서만 켠다 — 문제·퀴즈는 0탭이라 **스포일러가 아니다.**
       `buymilk`·`printseq`·`checkups` 와 같은 모양이다.
       🚨 2026-09-26 (재검증 학생): *"5쪽에 들어가자마자 배너가 «그래프
       (BFS/DFS)» 라고 이미 떠 있어서, 줄 시뮬레이션으로 직접 알아내기 전에
       답을 먼저 봐버린 느낌이었다."* — 5쪽(tab 1 · si 0)은 BFS 과정 스테퍼로,
       ⭐ 스테퍼는 **마지막 걸음에서야** 이름을 주게 일부러 설계했는데
       `tab >= 1` 이 5쪽에서부터 배너를 쐈다. 진짜 코드가 보이는 6쪽
       (tab 1 · si 1, CodeWalk)에서만 뜨게 좁힌다. */
    window.dispatchEvent(new CustomEvent("quest-algohint", { detail: { show: tab === 1 && si === 1 } }));
  }, [tab, si, _posKey]);

  useEffect(() => {
    if ((propLang === "ko" || propLang === "en") && propLang !== lang) switchLang(propLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  const TABS = E ? ["📋 Problem", "⚡ Code"] : ["📋 문제", "⚡ 코드"];
  const setters = { 0: setCh1Q, 1: setCh2Q };
  const states  = { 0: ch1Q,    1: ch2Q };
  const makers  = { 0: makeMcc20CityTourCh1, 1: (e) => makeMcc20CityTourCh2(e, codeLang) };

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
    } else if (tab > 0) {
      const pt = tab - 1;           // 첫 스텝에서 이전 → 이전 탭 마지막 스텝으로
      setTab(pt); setSi(states[pt].length - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showCodeControls = tab === 1;

  const renderContent = () => {
    if (step.type === "quiz") return <Quiz {...step} onAnswer={handleAnswer} />;
    if (step.type === "input") return <NumInput key={`${tab}-${cur}-${lang}`} question={step.question} hint={step.hint} answer={step.answer} E={E} onSolve={handleSolve} />;
    if (step.type === "reveal") return <div style={{ padding: 16 }}>{step.content}</div>;
    if (step.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={step.code} isEn={E} /></div>;
    if (step.type === "progressive") return <Mcc20CityTourProgressiveCode E={E} lang={codeLang} sections={step.sections} />;
    return null;
  };

  const renderPreviewBody = (s) => {
    if (s.type === "quiz") return <Quiz {...s} onAnswer={() => {}} />;
    if (s.type === "input") return (
      <NumInput question={s.question} hint={s.hint} answer={s.answer} E={E} onSolve={() => {}} />
    );
    if (s.type === "reveal") return <div style={{ padding: 16 }}>{s.content}</div>;
    if (s.type === "code") return <div style={{ padding: 14 }}><CodeBlock lines={s.code} isEn={E} /></div>;
    if (s.type === "progressive") return <Mcc20CityTourProgressiveCode E={E} lang={codeLang} sections={s.sections} />;
    return null;
  };

  const codeControlsSlot = showCodeControls ? (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      <button onClick={() => downloadMcc20CityTourPDF(E, getMcc20CityTourSections(E), codeLang)} style={{
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

        {step.narr && <Narration key={`mcc2-${tab}-${cur}-${lang}`} text={step.narr} />}

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
