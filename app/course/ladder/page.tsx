"use client";

// 📈 학습 사다리 (프로토타입 / DRAFT) — 선생님 2026-06-22.
// "모든 문제를 난이도 하나로 줄 세운 한 줄 사다리(기본) + 토픽/난이도 필터."
// 지금은 KL급(알고리즘 쉬움+보통 72문제)만. 좋으면 연습·외부까지 확장.
// 본길/네비에 안 붙임(주소 직접 입력). 커밋·배포 안 함.

import { useState, useMemo } from "react";
import Link from "next/link";
import { LADDER } from "./ladder-data";

const TOPIC_KO: Record<string, string> = {
  sorting: "정렬", array: "배열", hashtable: "해시", prefixsum: "누적합",
  string: "문자열", stackqueue: "스택/큐", greedy: "그리디", backtracking: "완전탐색",
  binarysearch: "이분탐색", bitmanipulation: "비트", divideconquer: "분할정복", dp: "DP",
  graph: "그래프", priorityqueue: "우선순위큐", recursion: "재귀", shortestpath: "최단경로",
  topologicalsort: "위상정렬", tree: "트리", trie: "트라이", unionfind: "유니온파인드",
};
const TOPIC_COLOR: Record<string, string> = {
  sorting: "#0284c7", array: "#7c3aed", hashtable: "#db2777", prefixsum: "#0e7490",
  string: "#16a34a", stackqueue: "#ea580c", greedy: "#ca8a04", backtracking: "#dc2626",
  binarysearch: "#2563eb", bitmanipulation: "#475569", divideconquer: "#9333ea", dp: "#c026d3",
  graph: "#0d9488", priorityqueue: "#e11d48", recursion: "#65a30d", shortestpath: "#0891b2",
  topologicalsort: "#4f46e5", tree: "#15803d", trie: "#b45309", unionfind: "#be123c",
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

  const topics = ["전체", ...Object.keys(TOPIC_KO)];
  const filtered = useMemo(
    () => LADDER.filter(p =>
      (topic === "전체" || p.topic === topic) &&
      (band === "전체" || bandOf(p.level).key === band) &&
      (!klOnly || p.kl)
    ),
    [topic, band, klOnly]
  );

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 16px 80px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>📈 학습 사다리 <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>프로토타입</span></div>
      <div style={{ fontSize: 13.5, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>
        모든 문제가 <b>난이도순 한 줄</b>로 — 점프 없이 한 칸씩 올라가요. 위에서 <b>토픽·난이도로 필터</b>하면 그것만 모여요.<br />
        <span style={{ fontSize: 12, color: "#94a3b8" }}>(알고리즘 20토픽 {LADDER.length}문제. 다음: 코딩뱅크·연습·외부까지 합류.)</span>
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
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8", width: 44 }}>모음</span>
          <Chip on={klOnly} color="#7c3aed" onClick={() => setKlOnly(v => !v)}>🎯 KL 연습만</Chip>
          <span style={{ fontSize: 11.5, color: "#94a3b8" }}>KL 대회 대비용으로 고른 {LADDER.filter(p => p.kl).length}문제</span>
        </div>
      </div>

      {/* 사다리 — 난이도순 한 줄 */}
      <div style={{ marginTop: 16, position: "relative" }}>
        {/* 세로 줄 */}
        <div style={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 2, background: "#e2e8f0" }} />
        {filtered.map((p, i) => {
          const tc = TOPIC_COLOR[p.topic] || "#334155";
          return (
            <Link key={p.id} href={`/algo/${p.topic}`} style={{ textDecoration: "none" }}>
              <div style={{
                position: "relative", display: "flex", alignItems: "center", gap: 12,
                padding: "9px 12px 9px 0", marginLeft: 0,
              }}>
                {/* 레벨 동그라미 (사다리 칸) */}
                <div style={{
                  flexShrink: 0, width: 40, height: 40, borderRadius: "50%", zIndex: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#fff", border: `2.5px solid ${tc}`,
                  fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 13, color: tc,
                }}>{p.level}</div>
                {/* 카드 */}
                <div style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 10,
                  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "9px 13px",
                }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", flex: 1 }}>{p.title}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: "#fff", background: tc, borderRadius: 6, padding: "2px 7px" }}>{TOPIC_KO[p.topic]}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: bandOf(p.level).color, border: `1px solid ${bandOf(p.level).color}`, borderRadius: 6, padding: "2px 6px" }}>{bandOf(p.level).key}</span>
                  <span style={{ fontSize: 13, color: "#cbd5e1" }}>›</span>
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>해당 문제가 없어요.</div>}
      </div>
    </div>
  );
}
