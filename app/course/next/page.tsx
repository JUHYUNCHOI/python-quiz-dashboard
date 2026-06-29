"use client";

// 🧭 학생용 "다음 1개" 경로 뷰 (2026-06-29 unified_path_plan 첫 조각).
//  - 같은 LADDER 데이터를 재사용 (선생님 점프 렌즈 = /course/ladder, 학생 렌즈 = 여기).
//  - 기존 페이지/진도 안 건드림. 추가 전용. 완료는 localStorage("coderin-path-done").
//  - 학생은 '지금 할 것' 1개만 크게 보고 따라감. 출처는 라벨로 보이되 메뉴로 안 쪼갬.

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { LADDER } from "../ladder/ladder-data";
import { getCompletedIds, setManualDone } from "@/lib/path-completion";
import { questPathForUrl } from "@/lib/cpid-quests";

// 문제의 실제 이동 링크: 우리 quest 있으면 사이트 안(/quest/<id>), 없으면 원래 url.
function effLink(it: { url?: string; external?: boolean }) {
  const qp = questPathForUrl(it.url);
  return { href: qp || it.url, inSite: !!qp || !it.external, isQuest: !!qp };
}

// 개념 페이지(Algorithm Lab)가 있는 토픽 → "개념 먼저 보기" 링크
const CONCEPT_TOPICS = new Set([
  "array", "backtracking", "binarysearch", "bitmanipulation", "divideconquer", "dp", "graph",
  "greedy", "hashtable", "prefixsum", "priorityqueue", "recursion", "shortestpath", "sorting",
  "stackqueue", "string", "topologicalsort", "tree", "trie", "unionfind",
]);
const conceptRoute = (topic: string) => CONCEPT_TOPICS.has(topic) ? `/algo/${topic}/learn` : null;

const TOPIC_KO: Record<string, string> = {
  sorting: "정렬", array: "배열", hashtable: "해시", prefixsum: "누적합", string: "문자열",
  stackqueue: "스택/큐", greedy: "그리디", backtracking: "완전탐색", binarysearch: "이분탐색",
  bitmanipulation: "비트", divideconquer: "분할정복", dp: "DP", graph: "그래프",
  priorityqueue: "우선순위큐", recursion: "재귀", shortestpath: "최단경로", topologicalsort: "위상정렬",
  tree: "트리", trie: "트라이", unionfind: "유니온파인드", simulation: "시뮬레이션",
  grid: "그리드", math: "수학", syntax: "문법",
};
const BAND_DEFS = [
  { k: "입문", c: "#15803d", lo: 0, hi: 16 },
  { k: "기초", c: "#0e7490", lo: 17, hi: 26 },
  { k: "중급", c: "#b45309", lo: 27, hi: 38 },
  { k: "고급", c: "#c2410c", lo: 39, hi: 52 },
  { k: "도전", c: "#b91c1c", lo: 53, hi: 999 },
];
const bandOf = (lv: number) => BAND_DEFS.find((b) => lv >= b.lo && lv <= b.hi) || BAND_DEFS[0];

export default function NextPath() {
  // done = 실제 완료 신호 union(레슨·연습·algo·수동). 읽기 전용 합산.
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => { setDone(getCompletedIds()); setReady(true); }, []);

  const refresh = () => setDone(getCompletedIds());

  // 경로 = LADDER 순서(난이도순). 현재 = 아직 안 끝낸 첫 항목.
  const curIdx = useMemo(() => {
    const i = LADDER.findIndex((p) => !done.has(p.id));
    return i === -1 ? LADDER.length - 1 : i;
  }, [done]);

  const cur = LADDER[curIdx];
  const curLink = cur ? effLink(cur) : null;
  const upcoming = LADDER.slice(curIdx + 1, curIdx + 6);
  const recent = LADDER.slice(Math.max(0, curIdx - 2), curIdx).reverse();
  const total = LADDER.length;
  const curBand = cur ? bandOf(cur.level).k : "입문";
  const stages = useMemo(() => BAND_DEFS.map((b) => {
    const items = LADDER.filter((p) => p.level >= b.lo && p.level <= b.hi);
    return { ...b, total: items.length, done: items.filter((p) => done.has(p.id)).length };
  }), [done]);

  const markDone = (id: string) => { setManualDone(id, true); refresh(); };

  const chip = (topic: string, lv: number) => {
    const b = bandOf(lv);
    return (
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 12 }}>
        <span style={{ background: "#eef2ff", color: "#3730a3", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>
          {TOPIC_KO[topic] || topic}
        </span>
        <span style={{ color: b.c, fontWeight: 700 }}>● {b.k}</span>
      </span>
    );
  };

  if (!ready) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: 80 }}>
      <Header />
      <main style={{ maxWidth: 560, margin: "0 auto", padding: "16px 16px 0" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>나의 학습 · 이어서</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "2px 0 4px" }}>다음 할 것</h1>
        <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 14 }}>
          {done.size}개 완료 · 헤매지 말고 아래 1개만 따라가요
        </div>

        {/* 5단계 띠 — 입문→도전, 현재 단계 강조 */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {stages.map((s) => {
            const active = s.k === curBand;
            const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
            return (
              <div key={s.k} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: active ? 800 : 600, color: active ? s.c : "#94a3b8", marginBottom: 4 }}>
                  {active && "▸ "}{s.k}
                </div>
                <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", outline: active ? `2px solid ${s.c}33` : "none" }}>
                  <div style={{ width: pct + "%", height: "100%", background: s.c, borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{s.done}/{s.total}</div>
              </div>
            );
          })}
        </div>

        {/* 지난 것 (지나온 칸) */}
        {recent.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            {recent.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 6, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, opacity: 0.7 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: "#22c55e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13.5, color: "#475569", flex: 1 }}>{p.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* 지금 할 것 (HERO) */}
        {cur && (
          <div style={{ background: "#fff", border: "2px solid #6366f1", borderRadius: 16, padding: 18, boxShadow: "0 4px 16px rgba(99,102,241,.12)", marginBottom: 18 }}>
            <div style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#4338ca", background: "#e0e7ff", borderRadius: 8, padding: "3px 12px", marginBottom: 10 }}>
              ▶ 지금 할 것
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 8, lineHeight: 1.4, wordBreak: "keep-all" }}>{cur.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              {chip(cur.topic, cur.level)}
              {cur.source && <span style={{ fontSize: 11, color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 6, padding: "2px 8px" }}>{cur.source}</span>}
              {curLink?.inSite && <span style={{ fontSize: 11, color: "#16a34a", background: "#dcfce7", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>{curLink.isQuest ? "우리 풀이 (단계별)" : "사이트 안에서 풀기"}</span>}
            </div>
            {cur && conceptRoute(cur.topic) && (
              <a href={conceptRoute(cur.topic)!} style={{ display: "inline-block", marginBottom: 12, fontSize: 12.5, color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}>
                📘 막히면 — 이 토픽 개념 먼저 보기 →
              </a>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              {curLink?.href && (
                <a href={curLink.href} target={curLink.inSite ? undefined : "_blank"} rel={curLink.inSite ? undefined : "noopener noreferrer"}
                   style={{ flex: 1, textAlign: "center", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 0", borderRadius: 12, textDecoration: "none" }}>
                  시작하기 →
                </a>
              )}
              <button onClick={() => markDone(cur.id)}
                      style={{ background: "#f1f5f9", color: "#334155", fontWeight: 700, fontSize: 14, padding: "12px 18px", borderRadius: 12, border: "1px solid #e2e8f0", cursor: "pointer", whiteSpace: "nowrap" }}>
                완료 ✓
              </button>
            </div>
          </div>
        )}

        {/* 다음에 올 것 — 잠금 X. 잘하면 눌러서 바로 시작하거나 건너뛰기 */}
        {upcoming.length > 0 && (
          <>
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
              다음에 올 것 <span style={{ fontWeight: 400 }}>· 잘하면 눌러서 바로 풀거나 건너뛰어요</span>
            </div>
            {upcoming.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 6, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, opacity: 1 - i * 0.08 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: "#eef2ff", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 2}</span>
                {(() => { const e = effLink(p); return e.href ? (
                  <a href={e.href} target={e.inSite ? undefined : "_blank"} rel={e.inSite ? undefined : "noopener noreferrer"}
                     style={{ fontSize: 13.5, color: "#334155", flex: 1, wordBreak: "keep-all", textDecoration: "none", fontWeight: 600 }}>
                    {p.title}{e.isQuest && <span style={{ fontSize: 10, color: "#16a34a", marginLeft: 6 }}>· 우리 풀이</span>}
                  </a>
                ) : (
                  <span style={{ fontSize: 13.5, color: "#475569", flex: 1, wordBreak: "keep-all" }}>{p.title}</span>
                ); })()}
                {chip(p.topic, p.level)}
                <button onClick={() => markDone(p.id)} title="이미 할 줄 알아요 (건너뛰기)"
                        style={{ fontSize: 11, color: "#94a3b8", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "3px 8px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                  건너뛰기
                </button>
              </div>
            ))}
          </>
        )}

        {/* 선생님용 점프 안내 */}
        <a href="/course/ladder" style={{ display: "block", textAlign: "center", marginTop: 20, fontSize: 12.5, color: "#6366f1", textDecoration: "none" }}>
          전체 보기 · 토픽/난이도로 골라 풀기 (선생님) →
        </a>
      </main>
      <BottomNav />
    </div>
  );
}
