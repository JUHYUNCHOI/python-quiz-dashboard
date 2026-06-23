"use client";

// 📈 학습 사다리 (프로토타입 / DRAFT) — 선생님 2026-06-22.
// "모든 문제를 난이도 하나로 줄 세운 한 줄 사다리(기본) + 토픽/난이도 필터."
// 지금은 KL급(알고리즘 쉬움+보통 72문제)만. 좋으면 연습·외부까지 확장.
// 본길/네비에 안 붙임(주소 직접 입력). 커밋·배포 안 함.

import { useState, useMemo, useEffect } from "react";
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
// level → 난이도 띠 (옛 쉬움/보통 3칸은 부정확 → 실제 level 8~90으로 재도출)
const BANDS = [
  { key: "입문", color: "#16a34a", max: 18 },
  { key: "기초", color: "#0891b2", max: 30 },
  { key: "중급", color: "#ca8a04", max: 45 },
  { key: "고급", color: "#ea580c", max: 62 },
  { key: "도전", color: "#dc2626", max: 99 },
];
function bandOf(level: number) {
  return BANDS.find(b => level <= b.max) || BANDS[BANDS.length - 1];
}

function Chip({ on, color, onClick, children }: { on: boolean; color: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
      border: `1.5px solid ${on ? color : "#e2e8f0"}`,
      background: on ? color : "#fff", color: on ? "#fff" : "#475569",
      transition: "all .15s",
    }}>{children}</button>
  );
}

export default function LadderPage() {
  const [topic, setTopic] = useState("전체");
  const [band, setBand] = useState("전체");
  const [klOnly, setKlOnly] = useState(false);
  const [kind, setKind] = useState("전체"); // 전체 / 자체채점 / 외부
  const [lang, setLang] = useState("전체"); // 전체 / C++ / Python
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    try { setDone(new Set(JSON.parse(localStorage.getItem("ladder-done") || "[]"))); } catch { }
  }, []);
  const toggleDone = (id: string) => setDone(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    try { localStorage.setItem("ladder-done", JSON.stringify([...n])); } catch { }
    return n;
  });

  const topics = ["전체", ...Object.keys(TOPIC_KO)];
  const filtered = useMemo(
    () => LADDER.filter(p =>
      (topic === "전체" || p.topic === topic) &&
      (band === "전체" || bandOf(p.level).key === band) &&
      (!klOnly || p.kl) &&
      (kind === "전체" || (kind === "외부" ? p.external : !p.external)) &&
      (lang === "전체" || !p.lang || (lang === "C++" && p.lang === "cpp") || (lang === "Python" && p.lang === "py"))
    ),
    [topic, band, klOnly, kind, lang]
  );

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 16px 80px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>📈 학습 사다리 <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>프로토타입</span></div>
      <div style={{ fontSize: 13.5, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>
        모든 문제가 <b>난이도순 한 줄</b>로 — 점프 없이 한 칸씩 올라가요. 위에서 <b>토픽·난이도로 필터</b>하면 그것만 모여요.<br />
        <span style={{ fontSize: 12, color: "#94a3b8" }}>(자체채점 {LADDER.filter(p => !p.external).length} + 외부 링크 {LADDER.filter(p => p.external).length} = 총 {LADDER.length}문제. ✓ 눌러 푼 것 표시.)</span>
      </div>

      {/* 필터 */}
      <div style={{ marginTop: 18, padding: "12px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", width: 44 }}>토픽</span>
          {topics.map(tk => (
            <Chip key={tk} on={topic === tk} color={tk === "전체" ? "#334155" : (TOPIC_COLOR[tk] || "#334155")} onClick={() => setTopic(tk)}>
              {tk === "전체" ? "전체" : TOPIC_KO[tk]}
            </Chip>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", width: 44 }}>난이도</span>
          {["전체", ...BANDS.map(b => b.key)].map(d => (
            <Chip key={d} on={band === d} color={d === "전체" ? "#334155" : (bandOf(BANDS.find(b => b.key === d)!.max).color)} onClick={() => setBand(d)}>{d}</Chip>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#64748b" }}>{filtered.length}문제</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 8, paddingTop: 8, borderTop: "1px dashed #e2e8f0" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", width: 44 }}>유형</span>
          {["전체", "자체채점", "외부"].map(k => (
            <Chip key={k} on={kind === k} color={k === "외부" ? "#0ea5e9" : "#334155"} onClick={() => setKind(k)}>{k === "외부" ? "🔗 외부" : k}</Chip>
          ))}
          <Chip on={klOnly} color="#7c3aed" onClick={() => setKlOnly(v => !v)}>🎯 KL 연습만</Chip>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", width: 44 }}>언어</span>
          {["전체", "C++", "Python"].map(l => (
            <Chip key={l} on={lang === l} color={l === "C++" ? "#0d9488" : l === "Python" ? "#2563eb" : "#334155"} onClick={() => setLang(l)}>{l}</Chip>
          ))}
          <span style={{ fontSize: 11.5, color: "#94a3b8" }}>알고리즘·외부는 공통(언어 무관)</span>
        </div>
      </div>

      {/* 사다리 — 난이도순 한 줄 */}
      <div style={{ marginTop: 16, position: "relative" }}>
        {/* 세로 줄 */}
        <div style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 2, background: "#e2e8f0" }} />
        {filtered.map((p) => {
          const tc = TOPIC_COLOR[p.topic] || "#334155";
          const isDone = done.has(p.id);
          const href = p.url || `/algo/${p.topic}`;
          const linkProps = p.external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
          return (
            <div key={p.id} style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "9px 0" }}>
              {/* 레벨 동그라미 (사다리 칸) */}
              <div style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: "50%", zIndex: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? tc : "#fff", border: `2.5px solid ${tc}`,
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13, color: isDone ? "#fff" : tc,
              }}>{p.level}</div>
              {/* 카드 */}
              <div style={{
                flex: 1, display: "flex", alignItems: "center", gap: 9,
                background: isDone ? "#f8fafc" : "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "7px 9px 7px 13px",
                opacity: isDone ? 0.7 : 1,
              }}>
                <a {...(linkProps as any)} style={{ flex: 1, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", textDecoration: isDone ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                  {p.external && <span style={{ flexShrink: 0, fontSize: 11, color: "#94a3b8" }}>🔗</span>}
                </a>
                {/* 출처(외부) 또는 토픽(내부) 배지 */}
                {p.external
                  ? <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: "#fff", background: SOURCE_COLOR[p.source!] || "#64748b", borderRadius: 6, padding: "2px 6px" }}>{p.source}</span>
                  : <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: "#fff", background: tc, borderRadius: 6, padding: "2px 7px" }}>{TOPIC_KO[p.topic] || p.topic}</span>}
                {p.lang && <span style={{ flexShrink: 0, fontSize: 9.5, fontWeight: 800, color: p.lang === "cpp" ? "#0d9488" : "#2563eb", background: "#f1f5f9", borderRadius: 5, padding: "2px 5px" }}>{p.lang === "cpp" ? "C++" : "Py"}</span>}
                <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, color: bandOf(p.level).color, border: `1px solid ${bandOf(p.level).color}`, borderRadius: 6, padding: "2px 6px" }}>{bandOf(p.level).key}</span>
                {/* ✓ 했음 */}
                <button onClick={() => toggleDone(p.id)} title="했음 표시" style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: "50%", cursor: "pointer",
                  border: `1.5px solid ${isDone ? "#16a34a" : "#cbd5e1"}`, background: isDone ? "#16a34a" : "#fff",
                  color: isDone ? "#fff" : "#cbd5e1", fontSize: 13, fontWeight: 800, lineHeight: 1, padding: 0,
                }}>✓</button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>해당 문제가 없어요.</div>}
      </div>
    </div>
  );
}
