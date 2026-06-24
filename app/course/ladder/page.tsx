"use client";

// 🧗 연습·도전 허브 — 모든 풀 문제(1430)를 난이도순 한 줄 + 검색·필터.
// P1(2026-06-23): 접근성(aria·focus·대비·시맨틱) + 필터 기본 접기.

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { LADDER } from "./ladder-data";

const TOPIC_KO: Record<string, string> = {
  sorting: "정렬", array: "배열", hashtable: "해시", prefixsum: "누적합",
  string: "문자열", stackqueue: "스택/큐", greedy: "그리디", backtracking: "완전탐색",
  binarysearch: "이분탐색", bitmanipulation: "비트", divideconquer: "분할정복", dp: "DP",
  graph: "그래프", priorityqueue: "우선순위큐", recursion: "재귀", shortestpath: "최단경로",
  topologicalsort: "위상정렬", tree: "트리", trie: "트라이", unionfind: "유니온파인드",
  simulation: "시뮬레이션", grid: "그리드", math: "수학", syntax: "문법",
};
const TOPIC_COLOR: Record<string, string> = {
  sorting: "#0284c7", array: "#7c3aed", hashtable: "#db2777", prefixsum: "#0e7490",
  string: "#16a34a", stackqueue: "#ea580c", greedy: "#ca8a04", backtracking: "#dc2626",
  binarysearch: "#2563eb", bitmanipulation: "#475569", divideconquer: "#9333ea", dp: "#c026d3",
  graph: "#0d9488", priorityqueue: "#e11d48", recursion: "#65a30d", shortestpath: "#0891b2",
  topologicalsort: "#4f46e5", tree: "#15803d", trie: "#b45309", unionfind: "#be123c",
  simulation: "#0369a1", grid: "#7e22ce", math: "#0f766e", syntax: "#64748b",
};
const SOURCE_COLOR: Record<string, string> = {
  LeetCode: "#f59e0b", CSES: "#2563eb", Codeforces: "#dc2626", AtCoder: "#334155",
  USACO: "#0891b2", HackerRank: "#16a34a", MCC: "#db2777", MCO: "#be123c", Kattis: "#9333ea", CodeChef: "#a16207",
};
// 배경색 밝기에 따라 글자색(흰/검) 자동 — 작은 배지 대비 확보 (WCAG)
function textOn(bg: string): string {
  const h = bg.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#1e293b" : "#fff";
}
// level → 난이도 띠 (P4: 5단계 균형 재배치 — 도전 절벽·입문 과밀 완화. 371/416/287/224/132)
const BANDS = [
  { key: "입문", color: "#15803d", max: 16 },
  { key: "기초", color: "#0e7490", max: 26 },
  { key: "중급", color: "#b45309", max: 38 },
  { key: "고급", color: "#c2410c", max: 52 },
  { key: "도전", color: "#b91c1c", max: 99 },
];
function bandOf(level: number) {
  return BANDS.find(b => level <= b.max) || BANDS[BANDS.length - 1];
}
// 선수지식 부족 → "알고리즘 배운 뒤" 안내(막진 않음, 표시만).
const DEFER: Record<string, string> = {
  "cses-1091": "⏳ 이분탐색 배운 뒤",
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

const LABEL = "#64748b"; // 보조 라벨 색 (대비 4.5:1+)

function Chip({ on, color, onClick, children, label }: { on: boolean; color: string; onClick: () => void; children: React.ReactNode; label?: string }) {
  return (
    <button onClick={onClick} aria-pressed={on} aria-label={label} style={{
      padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
      border: `1.5px solid ${on ? color : "#cbd5e1"}`,
      background: on ? color : "#fff", color: on ? "#fff" : "#475569",
      transition: "all .15s", minHeight: 32,
    }}>{children}</button>
  );
}

export default function LadderPage() {
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

  const topics = ["전체", ...Object.keys(TOPIC_KO)];
  const filtered = useMemo(
    () => LADDER.filter(p =>
      (topic === "전체" || p.topic === topic) &&
      (band === "전체" || bandOf(p.level).key === band) &&
      (!klOnly || p.kl) &&
      (kind === "전체" || (kind === "외부" ? p.external : !p.external)) &&
      (lang === "전체" || !p.lang || (lang === "C++" && p.lang === "cpp") || (lang === "Python" && p.lang === "py")) &&
      (query.trim() === "" || (p.title + " " + (p.source || "") + " " + (TOPIC_KO[p.topic] || "")).toLowerCase().includes(query.trim().toLowerCase())) &&
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
    topic !== "전체" && TOPIC_KO[topic],
    band !== "전체" && band,
    kind !== "전체" && kind,
    lang !== "전체" && lang,
    klOnly && "🎯KL",
    starOnly && "★",
  ].filter(Boolean) as string[];

  return (
    <>
      <Header />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "28px 16px 100px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>🧗 연습 · 도전</h1>
        <p style={{ fontSize: 13.5, color: LABEL, marginTop: 6, lineHeight: 1.6, wordBreak: "keep-all" }}>
          풀 문제를 <b>난이도순 한 줄</b>로 모았어요 — 점프 없이 다음 1개씩. 헷갈리면 아래 <b>⭐ 오늘 할 것</b>부터.
        </p>

        {/* ⭐ 오늘 할 것 1개 */}
        {next ? (() => {
          const tc = TOPIC_COLOR[next.topic] || "#334155";
          const href = next.url || `/algo/${next.topic}`;
          const linkProps = next.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
          return (
            <a {...(linkProps as any)} onClick={() => remember(next.id)}
              aria-label={`오늘 할 것: ${next.title}, 난이도 ${bandOf(next.level).key}${next.external ? ", 외부 링크 새 탭" : ""}`}
              style={{ textDecoration: "none", display: "block" }}>
              <div style={{ marginTop: 16, padding: "14px 16px", background: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "1.5px solid #fcd34d", borderRadius: 14, display: "flex", alignItems: "center", gap: 13 }}>
                <div aria-hidden="true" style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: "#fff", border: `2.5px solid ${tc}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 14, color: tc }}>{next.level}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#b45309", letterSpacing: ".02em" }}>⭐ 오늘 할 것{active.length ? ` (${active.join("·")})` : ""}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{next.title} {next.external && <span aria-hidden="true" style={{ fontSize: 12 }}>🔗</span>}</div>
                  <div style={{ fontSize: 11.5, color: "#92400e", marginTop: 1 }}>{next.external ? next.source : TOPIC_KO[next.topic] || next.topic} · {bandOf(next.level).key}{next.lang ? ` · ${next.lang === "cpp" ? "C++" : "Python"}` : ""}</div>
                </div>
                <div aria-hidden="true" style={{ flexShrink: 0, fontSize: 14, fontWeight: 800, color: "#fff", background: "#d97706", borderRadius: 10, padding: "9px 15px" }}>시작 →</div>
              </div>
            </a>
          );
        })() : (
          <div role="status" style={{ marginTop: 16, padding: "16px", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 14, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#15803d", wordBreak: "keep-all" }}>🎉 이 조건의 문제를 다 풀었어요! 필터를 바꿔 더 풀어보세요.</div>
        )}

        {/* ⏪ 마지막 문제로 이어서 */}
        {lastProblem && (() => {
          const href = lastProblem.url || `/algo/${lastProblem.topic}`;
          const lp = lastProblem.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
          return (
            <a {...(lp as any)} onClick={() => remember(lastProblem.id)}
              aria-label={`이어서 풀기: ${lastProblem.title}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginTop: 8, padding: "9px 12px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10 }}>
              <span aria-hidden="true" style={{ fontSize: 13 }}>⏪</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: LABEL }}>이어서:</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lastProblem.title}{done.has(lastProblem.id) ? " ✓" : ""}</span>
              <span aria-hidden="true" style={{ fontSize: 12, color: "#94a3b8" }}>→</span>
            </a>
          );
        })()}

        <div style={{ fontSize: 12, color: LABEL, marginTop: 8, textAlign: "right" }}>
          {LADDER.length}문제 (자체채점 {LADDER.filter(p => !p.external).length} + 외부 {LADDER.filter(p => p.external).length}) · 푼 것 {doneCount}/{filtered.length}
        </div>

        {/* 검색 + 필터(기본 접힘) */}
        <div style={{ marginTop: 14, padding: "12px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12 }}>
          {/* 🔍 검색 (항상 보임) */}
          <div style={{ position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none" }}>🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="문제 검색 (이름·출처·토픽)"
              placeholder="문제 이름·출처·토픽으로 찾기 (예: two sum, 정렬, CSES)"
              style={{ width: "100%", boxSizing: "border-box", padding: "9px 32px 9px 32px", fontSize: 13, borderRadius: 9, border: "1.5px solid #cbd5e1", background: "#fff", color: "#1e293b" }}
            />
            {query && <button onClick={() => setQuery("")} aria-label="검색어 지우기" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, borderRadius: "50%", border: "none", background: "#e2e8f0", color: "#475569", cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0 }}>✕</button>}
          </div>

          {/* 필터 토글 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <button onClick={() => setFiltersOpen(o => !o)} aria-expanded={filtersOpen} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 9, cursor: "pointer", minHeight: 34,
              border: `1.5px solid ${active.length ? "#334155" : "#cbd5e1"}`, background: active.length ? "#334155" : "#fff",
              color: active.length ? "#fff" : "#475569", fontSize: 12.5, fontWeight: 700,
            }}>
              🔎 필터{active.length ? ` · ${active.join(" · ")}` : ""}
              <span aria-hidden="true">{filtersOpen ? "▴" : "▾"}</span>
            </button>
            {active.length > 0 && (
              <button onClick={() => { setTopic("전체"); setBand("전체"); setKind("전체"); setLang("전체"); setKlOnly(false); setStarOnly(false); }}
                style={{ fontSize: 12, fontWeight: 700, color: LABEL, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>초기화</button>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: "#334155" }}>{filtered.length}문제</span>
          </div>

          {/* 칩 영역 (접힘) */}
          {filtersOpen && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44, paddingTop: 7 }}>토픽</span>
                {topics.map(tk => (
                  <Chip key={tk} on={topic === tk} color={tk === "전체" ? "#334155" : (TOPIC_COLOR[tk] || "#334155")} onClick={() => setTopic(tk)}>
                    {tk === "전체" ? "전체" : TOPIC_KO[tk]}
                  </Chip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>난이도</span>
                {["전체", ...BANDS.map(b => b.key)].map(d => (
                  <Chip key={d} on={band === d} color={d === "전체" ? "#334155" : (bandOf(BANDS.find(b => b.key === d)!.max).color)} onClick={() => setBand(d)}>{d}</Chip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>유형</span>
                {["전체", "자체채점", "외부"].map(k => (
                  <Chip key={k} on={kind === k} color={k === "외부" ? "#0369a1" : "#334155"} onClick={() => setKind(k)}>{k === "외부" ? "🔗 외부" : k}</Chip>
                ))}
                <Chip on={klOnly} color="#7c3aed" onClick={() => setKlOnly(v => !v)} label="KL 연습만 보기">🎯 KL 연습만</Chip>
                <Chip on={starOnly} color="#ca8a04" onClick={() => setStarOnly(v => !v)} label="즐겨찾기만 보기">★ 즐겨찾기</Chip>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: LABEL, width: 44 }}>언어</span>
                {["전체", "C++", "Python"].map(l => (
                  <Chip key={l} on={lang === l} color={l === "C++" ? "#0d9488" : l === "Python" ? "#2563eb" : "#334155"} onClick={() => setLang(l)}>{l}</Chip>
                ))}
                <span style={{ fontSize: 11.5, color: LABEL, wordBreak: "keep-all" }}>알고리즘·외부는 공통(언어 무관)</span>
              </div>
            </div>
          )}
        </div>

        {/* 사다리 — 난이도순 한 줄 */}
        <div style={{ marginTop: 16, position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 2, background: "#e2e8f0" }} />
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {filtered.map((p) => {
              const tc = TOPIC_COLOR[p.topic] || "#334155";
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
                    background: isDone ? tc : "#fff", border: `2.5px solid ${tc}`,
                    fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13, color: isDone ? "#fff" : tc,
                  }}>{p.level}</div>
                  <div style={{
                    flex: 1, display: "flex", alignItems: "center", gap: 8,
                    background: isDone ? "#f8fafc" : "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "6px 8px 6px 13px",
                    opacity: isDone ? 0.75 : 1,
                  }}>
                    <a {...(linkProps as any)} onClick={() => remember(p.id)}
                      aria-label={`${p.title}${p.external ? ", 외부 링크 새 탭" : ""}`}
                      style={{ flex: 1, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", textDecoration: isDone ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                      {p.external && <span role="img" aria-label="외부 링크" style={{ flexShrink: 0, fontSize: 11 }}>🔗</span>}
                    </a>
                    {p.external
                      ? <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: textOn(SOURCE_COLOR[p.source!] || "#64748b"), background: SOURCE_COLOR[p.source!] || "#64748b", borderRadius: 6, padding: "2px 7px" }}>{p.source}</span>
                      : <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: tc, background: "#f1f5f9", borderRadius: 6, padding: "2px 7px" }}>{TOPIC_KO[p.topic] || p.topic}</span>}
                    {/* 난이도 = 탭하면 같은 수준만 (알약 모양으로 '누를 수 있음' 표시) */}
                    <button onClick={() => { setBand(bd.key); setFiltersOpen(true); }} aria-label={`${bd.key} 수준 문제만 모아 보기`} title="탭하면 이 수준 문제만 모여요" style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: bd.color, border: `1.5px solid ${bd.color}`, borderRadius: 999, padding: "3px 10px", background: "#fff", cursor: "pointer", minHeight: 26 }}>{bd.key}</button>
                    {DEFER[p.id] && <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: "#475569", background: "#e2e8f0", borderRadius: 5, padding: "2px 6px" }} title="선수지식 배운 뒤에 풀면 좋아요">{DEFER[p.id]}</span>}
                    <button onClick={() => toggleStar(p.id)} aria-label="즐겨찾기" aria-pressed={isStar} title="마음에 든 문제 — 나중에 이 수준 더 풀기" style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: "50%", cursor: "pointer", border: "none", background: "none",
                      color: isStar ? "#ca8a04" : "#cbd5e1", fontSize: 16, lineHeight: 1, padding: 0,
                    }}>{isStar ? "★" : "☆"}</button>
                    <button onClick={() => toggleDone(p.id)} aria-label="했음 표시" aria-pressed={isDone} title="했음 표시" style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
                      border: `1.5px solid ${isDone ? "#15803d" : "#cbd5e1"}`, background: isDone ? "#15803d" : "#fff",
                      color: isDone ? "#fff" : "#94a3b8", fontSize: 14, fontWeight: 800, lineHeight: 1, padding: 0,
                    }}>✓</button>
                  </div>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 && <div role="status" style={{ padding: 24, textAlign: "center", color: LABEL, fontSize: 13 }}>해당 문제가 없어요.</div>}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
