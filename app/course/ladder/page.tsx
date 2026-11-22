"use client";

// 🧗 연습·도전 허브 — 모든 풀 문제(1430)를 난이도순 한 줄 + 검색·필터.
// P1(2026-06-23): 접근성(aria·focus·대비·시맨틱) + 필터 기본 접기.

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { LADDER } from "./ladder-data";
import { useLanguage } from "@/contexts/language-context";
import { usePracticeGate } from "@/lib/tier-gate";
import { TOPIC_KO, TOPIC_EN, TOPIC_COLOR, textOn } from "@/lib/problem-tags";
import { problemTitle } from "@/lib/problem-title";

const SOURCE_COLOR: Record<string, string> = {
  LeetCode: "var(--color-amber-500)", CSES: "var(--color-blue-600)", Codeforces: "var(--color-red-600)", AtCoder: "var(--color-slate-700)",
  USACO: "var(--color-cyan-600)", HackerRank: "var(--color-green-600)", MCC: "var(--color-pink-600)", MCO: "var(--color-rose-700)", Kattis: "var(--color-purple-600)", CodeChef: "var(--color-yellow-700)",
};
// level → 난이도 띠 (P4: 5단계 균형 재배치 — 도전 절벽·입문 과밀 완화. 371/416/287/224/132)
// key 는 상태값·URL 파라미터로 쓰이는 식별자라 한국어를 유지한다. en 은 표시용.
const BANDS = [
  { key: "입문", en: "Intro", color: "var(--color-green-700)", max: 16 },
  { key: "기초", en: "Basic", color: "var(--color-cyan-700)", max: 26 },
  { key: "중급", en: "Intermediate", color: "var(--color-amber-700)", max: 38 },
  { key: "고급", en: "Advanced", color: "var(--color-orange-700)", max: 52 },
  { key: "도전", en: "Challenge", color: "var(--color-red-700)", max: 99 },
];
function bandOf(level: number) {
  return BANDS.find(b => level <= b.max) || BANDS[BANDS.length - 1];
}
// 선수지식 부족 → "알고리즘 배운 뒤" 안내(막진 않음, 표시만).
const DEFER: Record<string, [string, string]> = {
  "cses-1091": ["⏳ 이분탐색 배운 뒤", "⏳ After binary search"],
};
const ALGO_TOPICS = ["sorting", "array", "hashtable", "prefixsum", "string", "stackqueue", "greedy", "backtracking", "binarysearch", "bitmanipulation", "divideconquer", "dp", "graph", "priorityqueue", "recursion", "shortestpath", "topologicalsort", "tree", "trie", "unionfind"];
function loadSolved(): Set<string> {
  const acc = new Set<string>();
  const add = (key: string) => { try { (JSON.parse(localStorage.getItem(key) || "[]") as string[]).forEach(id => acc.add(id)); } catch { } };
  add("practice-solved");
  ALGO_TOPICS.forEach(t => add(`algo-${t}-contest-solved`));
  add("ladder-done");
  return acc;
}
function loadStarred(): Set<string> {
  const acc = new Set<string>();
  const add = (key: string) => { try { (JSON.parse(localStorage.getItem(key) || "[]") as string[]).forEach(id => acc.add(id)); } catch { } };
  add("practice-starred");
  add("ladder-starred");
  return acc;
}

const LABEL = "var(--color-slate-500)"; // 보조 라벨 색 (대비 4.5:1+)

function Chip({ on, color, onClick, children, label }: { on: boolean; color: string; onClick: () => void; children: React.ReactNode; label?: string }) {
  return (
    <button onClick={onClick} aria-pressed={on} aria-label={label} style={{
      padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
      border: `1.5px solid ${on ? color : "var(--color-slate-300)"}`,
      background: on ? color : "var(--color-white)", color: on ? "var(--ink-on-accent)" : "var(--color-slate-600)",
      transition: "all .15s", minHeight: 32,
    }}>{children}</button>
  );
}

export default function LadderPage() {
  // `lang` 은 아래에서 C++/Python 필터가 쓰고 있다. 화면 언어는 uiLang 으로 받는다.
  const { t, lang: uiLang } = useLanguage();
  const gate = usePracticeGate();
  // 사다리 데이터엔 한국어 제목만 있다 — 영어판은 문제 은행에서 id 로 끌어온다.
  const title = (p: { id: string; title: string }) => problemTitle(p, uiLang);
  const [topic, setTopic] = useState("전체");
  const [band, setBand] = useState("전체");
  const [klOnly, setKlOnly] = useState(false);
  const [kind, setKind] = useState("전체");
  const [lang, setLang] = useState("전체");
  const [query, setQuery] = useState("");
  const [starOnly, setStarOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [starred, setStarred] = useState<Set<string>>(new Set());
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    setDone(loadSolved());
    setStarred(loadStarred());
    try { setLastId(localStorage.getItem("ladder-last") || localStorage.getItem("practice-last-problem")); } catch { }
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("kl") === "1") { setKlOnly(true); setFiltersOpen(true); }
      const lg = sp.get("lang"); if (lg === "cpp") { setLang("C++"); setFiltersOpen(true); } else if (lg === "py") { setLang("Python"); setFiltersOpen(true); }
      const kd = sp.get("kind"); if (kd === "자체채점" || kd === "외부") { setKind(kd); setFiltersOpen(true); }
      const tp = sp.get("topic"); if (tp) { setTopic(tp); setFiltersOpen(true); }  // /algo 학습페이지 → 이 알고리즘 문제 모아보기
    } catch { }
  }, []);
  const toggleDone = (id: string) => {
    try {
      const man = new Set<string>(JSON.parse(localStorage.getItem("ladder-done") || "[]"));
      man.has(id) ? man.delete(id) : man.add(id);
      localStorage.setItem("ladder-done", JSON.stringify([...man]));
    } catch { }
    setDone(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleStar = (id: string) => {
    try {
      const s = new Set<string>(JSON.parse(localStorage.getItem("ladder-starred") || "[]"));
      s.has(id) ? s.delete(id) : s.add(id);
      localStorage.setItem("ladder-starred", JSON.stringify([...s]));
    } catch { }
    setStarred(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const remember = (id: string) => { try { localStorage.setItem("ladder-last", id); } catch { } };
  const lastProblem = lastId ? LADDER.find(p => p.id === lastId) : null;

  // 상태값은 한국어 식별자(URL `?kind=`, localStorage 호환)라 그대로 두고 라벨만 번역한다.
  const topicLabel = (k: string) => (k === "전체" ? t("전체", "All") : t(TOPIC_KO[k] ?? k, TOPIC_EN[k] ?? k));
  const bandLabel = (k: string) => {
    if (k === "전체") return t("전체", "All");
    const b = BANDS.find(x => x.key === k);
    return b ? t(b.key, b.en) : k;
  };
  const kindLabel = (k: string) =>
    k === "전체" ? t("전체", "All") : k === "외부" ? t("외부", "External") : t("자체채점", "In-app");

  const topics = ["전체", ...Object.keys(TOPIC_KO)];
  const filtered = useMemo(
    () => LADDER.filter(p =>
      (topic === "전체" || p.topic === topic) &&
      (band === "전체" || bandOf(p.level).key === band) &&
      (!klOnly || p.kl) &&
      (kind === "전체" || (kind === "외부" ? p.external : !p.external)) &&
      (lang === "전체" || !p.lang || (lang === "C++" && p.lang === "cpp") || (lang === "Python" && p.lang === "py")) &&
      // 토픽은 한·영 둘 다 검색어로 받는다 (영어 모드에선 칩에 영어만 보이므로)
      (query.trim() === "" || (p.title + " " + (problemTitle(p, "en")) + " " + (p.source || "") + " " + (TOPIC_KO[p.topic] || "") + " " + (TOPIC_EN[p.topic] || "")).toLowerCase().includes(query.trim().toLowerCase())) &&
      (!starOnly || starred.has(p.id))
    ),
    [topic, band, klOnly, kind, lang, query, starOnly, starred]
  );

  const doneCount = filtered.filter(p => done.has(p.id)).length;
  // ⭐ 다음 1개 — 적응형: 내 수준(푼 것 중 최고 레벨) 이상에서 고르되,
  //   자체채점(앱에서 풀고 ✓) 우선, 외부 링크·선수지식부족은 후순위. (전역 최저 X)
  const myLevel = useMemo(() => {
    let m = 0;
    for (const p of LADDER) if (done.has(p.id) && p.level > m) m = p.level;
    return m;
  }, [done]);
  const pool = filtered.filter(p => !done.has(p.id) && !DEFER[p.id]); // filtered 는 이미 레벨 오름차순
  const atLevel = pool.filter(p => p.level >= myLevel);
  const next = atLevel.find(p => !p.external) || atLevel[0] || pool.find(p => !p.external) || pool[0];

  // 현재 켜진 필터 요약 (접힌 토글에 표시)
  const active = [
    topic !== "전체" && topicLabel(topic),
    band !== "전체" && bandLabel(band),
    kind !== "전체" && kindLabel(kind),
    lang !== "전체" && lang,
    klOnly && "🎯KL",
    starOnly && "★",
  ].filter(Boolean) as string[];

  // 티어가 없으면 문제 목록 대신 배치고사 안내만 보여 준다. 조용히 /tier 로
  // 돌려보내면 학생은 자기가 왜 튕겼는지 모른다 — 막은 이유를 같은 자리에서
  // 말해 준다. 훅을 전부 호출한 뒤에 분기해야 하므로 여기서 가른다.
  if (gate === "locked") {
    return (
      <>
        <Header />
        {/* 내용이 세 줄뿐이라 높이를 안 주면 뒤에 오는 것들이 화면 가운데까지
            올라붙는다. 짧은 안내 화면도 한 화면은 차지해야 한다. */}
        <main className="mx-auto min-h-[70vh] max-w-xl px-4 pb-28 pt-16">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("먼저 배치고사를 보세요", "Take the placement test first")}
          </h1>
          <p className="mt-3 leading-relaxed text-gray-600 break-keep">
            {t(
              "연습은 1430문제를 난이도순으로 늘어놓은 화면입니다. 어디부터 풀지는 배치고사가 정해 줍니다. 12문항이면 끝나요.",
              "Practice lines up 1,430 problems by difficulty. The placement test decides where you start — 12 questions is all it takes.",
            )}
          </p>
          <Link
            href="/tier"
            className="mt-7 inline-block rounded-xl bg-orange-600 px-7 py-3.5 text-base font-bold text-white hover:bg-orange-700"
          >
            {t("배치고사 보러 가기", "Go to the placement test")}
          </Link>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "28px 16px 100px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-slate-900)", margin: 0 }}>🧗 {t("연습 · 도전", "Practice · Challenge")}</h1>
        <p style={{ fontSize: 13.5, color: LABEL, marginTop: 6, lineHeight: 1.6, wordBreak: "keep-all" }}>
          {t("풀 문제를 ", "Every problem lined up ")}<b>{t("난이도순 한 줄", "in one difficulty-ordered row")}</b>
          {t("로 모았어요 — 점프 없이 다음 1개씩. 헷갈리면 아래 ", " — one at a time, no jumps. Not sure where to start? Try ")}
          <b>{t("⭐ 오늘 할 것", "⭐ Today's pick")}</b>{t("부터.", " below.")}
        </p>

        {/* 🏅 티어 입구 — 모바일 탭바는 5개로 고정이라(components/use-nav.ts)
            여기서 들어간다. 문제를 찾으러 온 학생이 지나가는 화면이라 자연스럽다. */}
        <Link
          href="/tier"
          style={{
            display: "flex", alignItems: "center", gap: 12, marginTop: 16,
            padding: "14px 16px", borderRadius: 14, textDecoration: "none",
            border: "1px solid var(--color-orange-200)", background: "var(--color-orange-50)",
          }}
        >
          <span style={{ fontSize: 26 }} aria-hidden>🏅</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "var(--color-orange-800)" }}>
              {t("내 티어 · 배치고사", "My tier · Placement test")}
            </span>
            <span style={{ display: "block", fontSize: 12, color: "var(--color-amber-700)", marginTop: 2, wordBreak: "keep-all" }}>
              {t(
                "12문항으로 티어를 정하고, 내 티어 문제 10개를 맞히면 승급해요.",
                "12 questions set your tier. Solve 10 at your tier to rank up.",
              )}
            </span>
          </span>
          <span style={{ fontSize: 16, color: "var(--color-orange-600)" }} aria-hidden>→</span>
        </Link>

        {/* ⭐ 오늘 할 것 1개 */}
        {next ? (() => {
          const tc = TOPIC_COLOR[next.topic] || "var(--color-slate-700)";
          const href = next.url || `/algo/${next.topic}`;
          const linkProps = next.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
          return (
            <a {...(linkProps as any)} onClick={() => remember(next.id)}
              aria-label={t(
                `오늘 할 것: ${title(next)}, 난이도 ${bandLabel(bandOf(next.level).key)}${next.external ? ", 외부 링크 새 탭" : ""}`,
                `Today's pick: ${title(next)}, difficulty ${bandLabel(bandOf(next.level).key)}${next.external ? ", external link opens in a new tab" : ""}`
              )}
              style={{ textDecoration: "none", display: "block" }}>
              <div style={{ marginTop: 16, padding: "14px 16px", background: "linear-gradient(135deg,var(--color-amber-50),var(--color-amber-100))", border: "1.5px solid var(--color-amber-300)", borderRadius: 14, display: "flex", alignItems: "center", gap: 13 }}>
                <div aria-hidden="true" style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: "var(--color-white)", border: `2.5px solid ${tc}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14, color: tc }}>{next.level}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "var(--color-amber-700)", letterSpacing: ".02em" }}>⭐ {t("오늘 할 것", "Today's pick")}{active.length ? ` (${active.join("·")})` : ""}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: "var(--color-slate-800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title(next)} {next.external && <span aria-hidden="true" style={{ fontSize: 12 }}>🔗</span>}</div>
                  <div style={{ fontSize: 11.5, color: "var(--color-amber-800)", marginTop: 1 }}>{next.external ? next.source : topicLabel(next.topic)} · {bandLabel(bandOf(next.level).key)}{next.lang ? ` · ${next.lang === "cpp" ? "C++" : "Python"}` : ""}</div>
                </div>
                <div aria-hidden="true" style={{ flexShrink: 0, fontSize: 14, fontWeight: 800, color: "var(--ink-on-accent)", background: "var(--color-amber-600)", borderRadius: 10, padding: "9px 15px" }}>{t("시작", "Start")} →</div>
              </div>
            </a>
          );
        })() : (
          <div role="status" style={{ marginTop: 16, padding: "16px", background: "var(--color-green-50)", border: "1.5px solid var(--color-green-300)", borderRadius: 14, textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--color-green-700)", wordBreak: "keep-all" }}>🎉 {t("이 조건의 문제를 다 풀었어요! 필터를 바꿔 더 풀어보세요.", "You've cleared every problem matching these filters! Change the filters to keep going.")}</div>
        )}

        {/* ⏪ 마지막 문제로 이어서 */}
        {lastProblem && (() => {
          const href = lastProblem.url || `/algo/${lastProblem.topic}`;
          const lp = lastProblem.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
          return (
            <a {...(lp as any)} onClick={() => remember(lastProblem.id)}
              aria-label={t(`이어서 풀기: ${title(lastProblem)}`, `Continue: ${title(lastProblem)}`)}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginTop: 8, padding: "9px 12px", background: "var(--color-white)", border: "1px solid var(--color-slate-200)", borderRadius: 10 }}>
              <span aria-hidden="true" style={{ fontSize: 13 }}>⏪</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: LABEL }}>{t("이어서:", "Continue:")}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "var(--color-slate-800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title(lastProblem)}{done.has(lastProblem.id) ? " ✓" : ""}</span>
              <span aria-hidden="true" style={{ fontSize: 12, color: "var(--color-slate-400)" }}>→</span>
            </a>
          );
        })()}

        <div style={{ fontSize: 12, color: LABEL, marginTop: 8, textAlign: "right" }}>
          {t(
            `${LADDER.length}문제 (자체채점 ${LADDER.filter(p => !p.external).length} + 외부 ${LADDER.filter(p => p.external).length}) · 푼 것 ${doneCount}/${filtered.length}`,
            `${LADDER.length} problems (in-app ${LADDER.filter(p => !p.external).length} + external ${LADDER.filter(p => p.external).length}) · solved ${doneCount}/${filtered.length}`
          )}
        </div>

        {/* 검색 + 필터(기본 접힘) */}
        <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--color-slate-50)", border: "1px solid var(--color-slate-200)", borderRadius: 12 }}>
          {/* 🔍 검색 (항상 보임) */}
          <div style={{ position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" }}>🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label={t("문제 검색 (이름·출처·토픽)", "Search problems (title, source, topic)")}
              placeholder={t("문제 이름·출처·토픽으로 찾기 (예: two sum, 정렬, CSES)", "Search by title, source, or topic (e.g. two sum, sorting, CSES)")}
              style={{ width: "100%", boxSizing: "border-box", padding: "9px 32px 9px 32px", fontSize: 13, borderRadius: 9, border: "1.5px solid var(--color-slate-300)", background: "var(--color-white)", color: "var(--color-slate-800)" }}
            />
            {query && <button onClick={() => setQuery("")} aria-label={t("검색어 지우기", "Clear search")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, borderRadius: "50%", border: "none", background: "var(--color-slate-200)", color: "var(--color-slate-600)", cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0 }}>✕</button>}
          </div>

          {/* 필터 토글 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <button onClick={() => setFiltersOpen(o => !o)} aria-expanded={filtersOpen} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 9, cursor: "pointer", minHeight: 34,
              border: `1.5px solid ${active.length ? "var(--color-slate-700)" : "var(--color-slate-300)"}`, background: active.length ? "var(--color-slate-700)" : "var(--color-white)",
              color: active.length ? "var(--ink-on-accent)" : "var(--color-slate-600)", fontSize: 12.5, fontWeight: 700,
            }}>
              🔎 {t("필터", "Filters")}{active.length ? ` · ${active.join(" · ")}` : ""}
              <span aria-hidden="true">{filtersOpen ? "▴" : "▾"}</span>
            </button>
            {active.length > 0 && (
              <button onClick={() => { setTopic("전체"); setBand("전체"); setKind("전체"); setLang("전체"); setKlOnly(false); setStarOnly(false); }}
                style={{ fontSize: 12, fontWeight: 700, color: LABEL, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>{t("초기화", "Reset")}</button>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: "var(--color-slate-700)" }}>{t(`${filtered.length}문제`, `${filtered.length} problems`)}</span>
          </div>

          {/* 칩 영역 (접힘) */}
          {filtersOpen && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--color-slate-200)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44, paddingTop: 7 }}>{t("토픽", "Topic")}</span>
                {topics.map(tk => (
                  <Chip key={tk} on={topic === tk} color={tk === "전체" ? "var(--color-slate-700)" : (TOPIC_COLOR[tk] || "var(--color-slate-700)")} onClick={() => setTopic(tk)}>
                    {topicLabel(tk)}
                  </Chip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>{t("난이도", "Level")}</span>
                {["전체", ...BANDS.map(b => b.key)].map(d => (
                  <Chip key={d} on={band === d} color={d === "전체" ? "var(--color-slate-700)" : (bandOf(BANDS.find(b => b.key === d)!.max).color)} onClick={() => setBand(d)}>{bandLabel(d)}</Chip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>{t("유형", "Type")}</span>
                {["전체", "자체채점", "외부"].map(k => (
                  <Chip key={k} on={kind === k} color={k === "외부" ? "var(--color-sky-700)" : "var(--color-slate-700)"} onClick={() => setKind(k)}>{k === "외부" ? `🔗 ${kindLabel(k)}` : kindLabel(k)}</Chip>
                ))}
                <Chip on={klOnly} color="var(--color-violet-600)" onClick={() => setKlOnly(v => !v)} label={t("KL 연습만 보기", "Show KL practice only")}>🎯 {t("KL 연습만", "KL only")}</Chip>
                <Chip on={starOnly} color="var(--color-yellow-600)" onClick={() => setStarOnly(v => !v)} label={t("즐겨찾기만 보기", "Show favorites only")}>★ {t("즐겨찾기", "Favorites")}</Chip>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>{t("언어", "Language")}</span>
                {["전체", "C++", "Python"].map(l => (
                  <Chip key={l} on={lang === l} color={l === "C++" ? "var(--color-teal-600)" : l === "Python" ? "var(--color-blue-600)" : "var(--color-slate-700)"} onClick={() => setLang(l)}>{l === "전체" ? t("전체", "All") : l}</Chip>
                ))}
                <span style={{ fontSize: 11.5, color: LABEL, wordBreak: "keep-all" }}>{t("알고리즘·외부는 공통(언어 무관)", "Algorithm & external problems are language-agnostic")}</span>
              </div>
            </div>
          )}
        </div>

        {/* 사다리 — 난이도순 한 줄 */}
        <div style={{ marginTop: 16, position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 2, background: "var(--color-slate-200)" }} />
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {filtered.map((p) => {
              const tc = TOPIC_COLOR[p.topic] || "var(--color-slate-700)";
              const isDone = done.has(p.id);
              const isStar = starred.has(p.id);
              const href = p.url || `/algo/${p.topic}`;
              const linkProps = p.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
              const bd = bandOf(p.level);
              return (
                <li key={p.id} style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "9px 0" }}>
                  <div aria-hidden="true" style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: "50%", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isDone ? tc : "var(--color-white)", border: `2.5px solid ${tc}`,
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13, color: isDone ? "var(--ink-on-accent)" : tc,
                  }}>{p.level}</div>
                  <div style={{
                    flex: 1, display: "flex", alignItems: "center", gap: 8,
                    background: isDone ? "var(--color-slate-50)" : "var(--color-white)", border: "1px solid var(--color-slate-200)", borderRadius: 10, padding: "6px 8px 6px 13px",
                    opacity: isDone ? 0.75 : 1,
                  }}>
                    <a {...(linkProps as any)} onClick={() => remember(p.id)}
                      aria-label={t(
                        `${title(p)}${p.external ? ", 외부 링크 새 탭" : ""}`,
                        `${title(p)}${p.external ? ", external link opens in a new tab" : ""}`
                      )}
                      style={{ flex: 1, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--color-slate-800)", textDecoration: isDone ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title(p)}</span>
                      {p.external && <span role="img" aria-label={t("외부 링크", "External link")} style={{ flexShrink: 0, fontSize: 11 }}>🔗</span>}
                    </a>
                    {p.external
                      ? <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: textOn(SOURCE_COLOR[p.source!] || "var(--color-slate-500)"), background: SOURCE_COLOR[p.source!] || "var(--color-slate-500)", borderRadius: 6, padding: "2px 7px" }}>{p.source}</span>
                      : <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: tc, background: "var(--color-slate-100)", borderRadius: 6, padding: "2px 7px" }}>{topicLabel(p.topic)}</span>}
                    {/* 난이도 = 탭하면 같은 수준만 (알약 모양으로 '누를 수 있음' 표시) */}
                    <button onClick={() => { setBand(bd.key); setFiltersOpen(true); }} aria-label={t(`${bandLabel(bd.key)} 수준 문제만 모아 보기`, `Show only ${bandLabel(bd.key)} level problems`)} title={t("탭하면 이 수준 문제만 모여요", "Tap to filter to this level")} style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: bd.color, border: `1.5px solid ${bd.color}`, borderRadius: 999, padding: "3px 10px", background: "var(--color-white)", cursor: "pointer", minHeight: 26 }}>{bandLabel(bd.key)}</button>
                    {DEFER[p.id] && <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: "var(--color-slate-600)", background: "var(--color-slate-200)", borderRadius: 5, padding: "2px 6px" }} title={t("선수지식 배운 뒤에 풀면 좋아요", "Best solved after you learn the prerequisite")}>{t(DEFER[p.id][0], DEFER[p.id][1])}</span>}
                    <button onClick={() => toggleStar(p.id)} aria-label={t("즐겨찾기", "Favorite")} aria-pressed={isStar} title={t("마음에 든 문제 — 나중에 이 수준 더 풀기", "Liked it — come back for more at this level")} style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: "50%", cursor: "pointer", border: "none", background: "none",
                      color: isStar ? "var(--color-yellow-600)" : "var(--color-slate-300)", fontSize: 16, lineHeight: 1, padding: 0,
                    }}>{isStar ? "★" : "☆"}</button>
                    <button onClick={() => toggleDone(p.id)} aria-label={t("했음 표시", "Mark as done")} aria-pressed={isDone} title={t("했음 표시", "Mark as done")} style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
                      border: `1.5px solid ${isDone ? "var(--color-green-700)" : "var(--color-slate-300)"}`, background: isDone ? "var(--color-green-700)" : "var(--color-white)",
                      color: isDone ? "var(--ink-on-accent)" : "var(--color-slate-400)", fontSize: 14, fontWeight: 800, lineHeight: 1, padding: 0,
                    }}>✓</button>
                  </div>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 && <div role="status" style={{ padding: 24, textAlign: "center", color: LABEL, fontSize: 13 }}>{t("해당 문제가 없어요.", "No problems match these filters.")}</div>}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
