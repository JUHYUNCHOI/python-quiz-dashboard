// 🔒 USACO_VERIFIED — cpid=761, milkmeas (2017 Dec Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   MilkMeasSim — replay a sorted event log; watch leader set change
   Bilingual via t(E, EN, KO)
   ═══════════════════════════════════════════════════════════════ */
const _COW_NAMES = ["Bessie", "Elsie", "Mildred"];
const _COW_COLORS = ["#8b5cf6", "#0891b2", "#f97316"];

const _MM_PRESETS = [
  {
    label: { en: "Tiny (3 events)", ko: "아주 짧게 (변화 3 번)" },
    events: [
      { day: 1, cow: 0, delta: +5 },  // Bessie 7->12
      { day: 2, cow: 1, delta: +6 },  // Elsie 7->13 (leader change)
      { day: 3, cow: 2, delta: +7 },  // Mildred 7->14 (leader change)
    ],
  },
  {
    label: { en: "Tied leaders", ko: "1등이 여럿" },
    events: [
      { day: 1, cow: 0, delta: +3 },  // Bessie 10
      { day: 2, cow: 1, delta: +3 },  // Elsie 10 -> tie {B,E}
      { day: 3, cow: 2, delta: +3 },  // Mildred 10 -> tie {B,E,M}
      { day: 4, cow: 0, delta: +1 },  // Bessie 11 -> {B}
    ],
  },
  {
    label: { en: "Drop & rebound", ko: "감소 후 반등" },
    events: [
      { day: 1, cow: 0, delta: +5 },   // Bessie 12
      { day: 2, cow: 0, delta: -6 },   // Bessie 6 -> {Elsie, Mildred}
      { day: 3, cow: 1, delta: +4 },   // Elsie 11 -> {Elsie}
      { day: 4, cow: 2, delta: +4 },   // Mildred 11 -> {Elsie, Mildred}
    ],
  },
];

function _leaderSet(milk) {
  const mx = Math.max(...milk);
  const s = [];
  for (let i = 0; i < milk.length; i++) if (milk[i] === mx) s.push(i);
  return s;
}
function _setEq(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function MilkMeasSim({ E }) {
  const [pi, setPi] = useState(0);
  const [step, setStep] = useState(0);
  const events = _MM_PRESETS[pi].events;

  // Replay events from start through current step
  const milk = [7, 7, 7];
  let prevLeaders = _leaderSet(milk);
  let changeCount = 0;
  const history = [{ milk: [...milk], leaders: [...prevLeaders], changed: false, event: null }];
  for (let k = 0; k < step; k++) {
    const ev = events[k];
    milk[ev.cow] += ev.delta;
    const cur = _leaderSet(milk);
    const changed = !_setEq(cur, prevLeaders);
    if (changed) changeCount++;
    history.push({ milk: [...milk], leaders: [...cur], changed, event: ev });
    prevLeaders = cur;
  }
  const cur = history[history.length - 1];
  const maxBar = Math.max(15, ...history.flatMap(h => h.milk));

  const reset = (newPi) => { setPi(newPi); setStep(0); };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_MM_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {E ? p.label.en : p.label.ko}
          </button>
        ))}
      </div>

      {/* bar chart — 3 cows */}
      <div style={{
        background: "#faf5ff", border: `1px solid #c4b5fd`, borderRadius: 10,
        padding: "14px 12px 10px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center", height: 130 }}>
          {[0, 1, 2].map(ci => {
            const v = cur.milk[ci];
            const isLeader = cur.leaders.includes(ci);
            const h = Math.max(8, (v / maxBar) * 110);
            return (
              <div key={ci} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  fontSize: 12, fontWeight: 800,
                  color: isLeader ? _COW_COLORS[ci] : C.dim,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {v}{isLeader ? " 👑" : ""}
                </div>
                <div style={{
                  width: 56, height: h,
                  background: isLeader ? _COW_COLORS[ci] : "#e5e7eb",
                  border: `2px solid ${isLeader ? _COW_COLORS[ci] : "#d1d5db"}`,
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.3s, background 0.2s",
                }} />
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: isLeader ? _COW_COLORS[ci] : C.dim,
                }}>
                  {_COW_NAMES[ci]}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 6 }}>
          {t(E, "Leader set", "1등 소들")}: <b style={{ color: A }}>
            {"{" + cur.leaders.map(i => _COW_NAMES[i]).join(", ") + "}"}
          </b>
        </div>
      </div>

      {/* event log */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
        padding: 8, marginBottom: 10, fontSize: 12,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, padding: "2px 6px 6px", letterSpacing: 0.4 }}>
          {t(E, "EVENT LOG (sorted by day)", "변화 기록 (날짜순)")}
        </div>
        {events.map((ev, i) => {
          const applied = i < step;
          const isCurrent = i === step - 1;
          const row = history[i + 1];
          const changed = row && row.changed;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 8px", borderRadius: 6, marginBottom: 2,
              background: isCurrent ? (changed ? "#fef3c7" : "#ede9fe") : (applied ? "#f9fafb" : "transparent"),
              opacity: applied ? 1 : 0.45,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              <span style={{ width: 24, color: C.dim, fontSize: 11 }}>#{i + 1}</span>
              <span style={{ width: 50, fontSize: 11, color: C.dim }}>
                {t(E, "day", "날짜")} {ev.day}
              </span>
              <span style={{ color: _COW_COLORS[ev.cow], fontWeight: 700, minWidth: 60 }}>
                {_COW_NAMES[ev.cow]}
              </span>
              <span style={{ fontWeight: 700, color: ev.delta >= 0 ? "#15803d" : "#dc2626" }}>
                {ev.delta >= 0 ? "+" : ""}{ev.delta}
              </span>
              {applied && changed && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 800, color: "#92400e",
                  background: "#fde68a", padding: "2px 6px", borderRadius: 4,
                }}>
                  {t(E, "LEADER CHANGED", "1등이 바뀜")}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* controls + counter */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setStep(0)} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ⏮ {t(E, "Reset", "처음")}
        </button>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
          padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "#fff", color: step === 0 ? C.dim : C.text,
          fontSize: 12, fontWeight: 700, cursor: step === 0 ? "default" : "pointer",
        }}>
          ◀ {t(E, "Back", "뒤로")}
        </button>
        <button onClick={() => setStep(Math.min(events.length, step + 1))} disabled={step >= events.length} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: step >= events.length ? "#e5e7eb" : A,
          color: step >= events.length ? C.dim : "#fff",
          fontSize: 12, fontWeight: 800, cursor: step >= events.length ? "default" : "pointer",
        }}>
          {t(E, "Next event", "다음 변화")} ▶
        </button>

        <div style={{
          marginLeft: 6,
          background: "#ede9fe", border: `1.5px solid ${A}`, borderRadius: 10,
          padding: "6px 14px", textAlign: "center",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.4 }}>
            {t(E, "DISPLAY CHANGES", "간판이 바뀐 횟수")}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
            {changeCount}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 10 }}>
        {t(E,
          "Step through events. The crown 👑 marks current leaders. When the leader set differs from the previous one, the counter ticks up.",
          "변화를 한 걸음씩 따라가 보세요. 👑 이 붙은 소가 지금 1등이에요.\n1등 소들이 바로 앞과 달라지면 횟수가 1 올라가요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('measurement.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 3 cows: Bessie, Elsie, Mildred, 시작 우유량 7",
  "milk = {'Bessie': 7, 'Elsie': 7, 'Mildred': 7}",
  "",
  "# 각 변화 (day, name, delta)",
  "days = []",
  "names = []",
  "deltas = []",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    days.append(int(parts[0]))",
  "    names.append(parts[1])",
  "    deltas.append(int(parts[2]))",
  "",
  "# day 기준 정렬 — parallel sort via triple list",
  "events = []",
  "for i in range(N):",
  "    events.append((days[i], names[i], deltas[i]))",
  "events.sort()",
  "",
  "def get_leaders_str():",
  "    mx = -10**9",
  "    for c in milk:",
  "        if milk[c] > mx:",
  "            mx = milk[c]",
  "    leaders = []",
  "    for c in milk:",
  "        if milk[c] == mx:",
  "            leaders.append(c)",
  "    leaders.sort()",
  "    return ','.join(leaders)",
  "",
  "display_changes = 0",
  "prev = get_leaders_str()",
  "for i in range(N):",
  "    name = events[i][1]",
  "    delta = events[i][2]",
  "    if name not in milk:",
  "        milk[name] = 7",
  "    milk[name] += delta",
  "    cur = get_leaders_str()",
  "    if cur != prev:",
  "        display_changes += 1",
  "    prev = cur",
  "",
  "with open('measurement.out', 'w') as file:",
  "    file.write(str(display_changes) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <map>",
  "#include <set>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"measurement.in\");",
  "    ofstream fout(\"measurement.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> days(N);",
  "    vector<string> names(N);",
  "    vector<int> deltas(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> days[i] >> names[i] >> deltas[i];",
  "    }",
  "    // day 기준 정렬 (parallel sort via indices)",
  "    vector<int> idx(N);",
  "    for (int i = 0; i < N; i++) {",
  "        idx[i] = i;",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = i + 1; j < N; j++) {",
  "            if (days[idx[j]] < days[idx[i]]) {",
  "                int tmp = idx[i];",
  "                idx[i] = idx[j];",
  "                idx[j] = tmp;",
  "            }",
  "        }",
  "    }",
  "",
  "    map<string, int> milk;",
  "    milk[\"Bessie\"] = 7;",
  "    milk[\"Elsie\"] = 7;",
  "    milk[\"Mildred\"] = 7;",
  "    set<string> top;",
  "    top.insert(\"Bessie\");",
  "    top.insert(\"Elsie\");",
  "    top.insert(\"Mildred\");",
  "    int changes = 0;",
  "",
  "    for (int k = 0; k < N; k++) {",
  "        string name = names[idx[k]];",
  "        int delta = deltas[idx[k]];",
  "        if (milk.count(name) == 0) {",
  "            milk[name] = 7;",
  "        }",
  "        milk[name] += delta;",
  "        // top 다시 찾기",
  "        int maxM = -1000000000;",
  "        for (auto& p : milk) {",
  "            if (p.second > maxM) {",
  "                maxM = p.second;",
  "            }",
  "        }",
  "        set<string> newTop;",
  "        for (auto& p : milk) {",
  "            if (p.second == maxM) {",
  "                newTop.insert(p.first);",
  "            }",
  "        }",
  "        if (newTop != top) {",
  "            changes++;",
  "            top = newTop;",
  "        }",
  "    }",
  "    fout << changes << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMilkMeasSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
            "What should we output? How many times the leader set changes.\nSo first sort the events by day — they may not arrive in order.",
            "무엇을 출력해야 하나요? 1등 소들의 조합이 바뀐 횟수예요.\n그러니 먼저 변화들을 날짜(day) 순서로 정렬해요 —\n기록이 날짜순으로 안 들어올 수 있어서예요."),
        t(E,
            "Then apply the events one at a time. After each one, find who\nthe leaders are now (get_leaders_str) — everyone with the max milk.",
            "그다음 변화를 하나씩 적용해요. 그때마다 지금 1등인\n소들을 다시 구해요(get_leaders_str) — 우유가 가장 많은\n소 전부예요."),
        t(E,
            "If this leader set differs from the one right before it, that's\na change — bump display_changes by 1.",
            "바로 앞의 1등 조합과 지금 조합이 다르면 바뀐 걸로 세고,\ndisplay_changes 를 1 늘려요."),
      ],
      pyOnly: [],
      cppOnly: [
        /* ⚠️ 2026-09-25: 이 줄이 **코드에 없는 것**을 설명하고 있었다 —
           *"tuple<int, string, int> 는 앞자리부터 차례로 견주기 때문에…"* 인데
           🔒 `FULL_CPP` 에 `tuple` 은 **0번** 나온다(`sort(` 도 0번). 실제로는
           통 세 개(days·names·deltas)를 나란히 두고 `idx` 번호를 바꿔 날짜순을 만든다.
           학생이 「tuple 이 알아서 정렬한다」고 읽고 코드에서 이중 반복문을 만난다.
           `billboard` 와 같은 병이다. `check-taught-vs-final-code.py` 는 **못 잡는다** —
           모노스페이스 코드 블록만 보고 `cppOnly` 설명문은 일부러 안 본다. */
        t(E, "Day order comes from an index list idx — we reorder positions, not the rows.",
            "날짜 순서는 idx 라는 번호 통으로 매겨요.\n기록을 옮기지 않고 «몇 번째를 먼저 볼까» 만 바꿔요."),
        t(E, "set<string> top != newTop compares membership directly, no manual loop needed.",
            "set<string> 끼리는 top != newTop 으로 바로 견줄 수 있어요.\n하나하나 도는 반복문을 쓸 필요가 없어요."),
      ],
    },
  ];
}

export function MilkMeasProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이 그대로다 — 배열 내용은 절대
   바꾸지 않고, beats(설명 말풍선)만 덧붙인다. getMilkMeasSections() 는 PDF 다운로드가
   계속 쓰므로 그대로 둔다. 2026-09-25 에 고친 cppOnly 「tuple」 설명은 그대로 두고
   손대지 않는다(9e2a35a0). ── */
export function getMilkMeasWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "idx", ko: "day 순서로 정렬한 번호 통", en: "index list ordered by day" },
        { v: "milk", ko: "소마다 지금 우유량", en: "each cow's current milk amount" },
        { v: "top / newTop", ko: "바로 앞 1등 조합 / 지금 1등 조합", en: "the previous leader set / the current leader set" },
      ],
      beats: [
        { hi: [9, 21], bubble: t(E,
          "What should we print? How many times the leader set changes. So read N, then each event — a day, a cow's name, and a milk change.",
          "무엇을 출력해야 하나요? 1등 조합이 바뀐 횟수예요. N 을 읽고, 이벤트마다 날짜·소 이름·우유 변화량을 읽어요.") },
        { hi: [22, 35], bubble: t(E,
          "Events may not arrive in day order. There's no tuple sort in C++ here — instead build an index list idx and bubble-sort it, comparing days[idx[..]] — we reorder positions, not the rows themselves.",
          "이벤트가 날짜순으로 안 들어올 수 있어요. C++ 이라 튜플 정렬 대신 idx 라는 번호 통을 만들어 버블 정렬해요 — days[idx[..]] 로 견주면서, 기록을 옮기지 않고 «몇 번째를 먼저 볼까» 만 바꿔요.") },
        { hi: [37, 46], bubble: t(E,
          "Start Bessie, Elsie, Mildred at 7, and top starts as all three — everyone is tied for the lead.",
          "Bessie, Elsie, Mildred 를 7 로 시작하고, top 은 셋 다 — 처음엔 모두 공동 1등이에요.") },
        { hi: [47, 71], bubble: t(E,
          "Apply each event in day order. After each one, find the new max milk and everyone at that amount (newTop). If that set differs from top, it's a change — count it and remember the new top.",
          "이벤트를 날짜순으로 하나씩 적용해요. 그때마다 최댓값과 그 값을 가진 소들(newTop)을 다시 찾아요. top 과 다르면 바뀐 거니 세고, top 을 갱신해요.") },
        { hi: [72, 74], bubble: t(E,
          "Print the total number of changes.",
          "바뀐 횟수를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "events", ko: "(날짜, 이름, 변화량)으로 묶어 정렬한 목록", en: "(day, name, delta) tuples, sorted" },
      { v: "milk", ko: "소마다 지금 우유량", en: "each cow's current milk amount" },
      { v: "prev / cur", ko: "바로 앞 1등 조합 / 지금 1등 조합", en: "the previous leader set / the current leader set" },
    ],
    beats: [
      { hi: [0, 16], bubble: t(E,
        "What should we output? How many times the leader set changes. So read N, start Bessie/Elsie/Mildred at 7, then read each event — a day, a cow's name, and a milk change.",
        "무엇을 출력해야 하나요? 1등 조합이 바뀐 횟수예요. N 을 읽고 Bessie/Elsie/Mildred 를 7 로 시작한 뒤, 이벤트마다 날짜·소 이름·우유 변화량을 읽어요.") },
      { hi: [18, 22], bubble: t(E,
        "Events may not arrive in day order. So gather them into (day, name, delta) tuples and sort — Python compares tuples left to right, so this sorts by day.",
        "이벤트가 날짜순으로 안 들어올 수 있어요. 그래서 (날짜, 이름, 변화량) 튜플로 묶어 정렬해요 — 튜플은 앞자리부터 견주니 날짜순이 돼요.") },
      { hi: [24, 34], bubble: t(E,
        "We'll need to know who's in the lead, over and over — so build a helper: find the max milk amount, then collect everyone tied at that amount (sorted, so ties compare the same way each time).",
        "누가 1등인지 계속 알아야 하니 헬퍼를 만들어요 — 최댓값을 찾고, 그 값을 가진 소들을 전부 모아요 (정렬해서 항상 같은 순서로 견줘요).") },
      { hi: [36, 47], bubble: t(E,
        "Apply each event in day order. After each one, find the new leaders. If they differ from the previous leaders, that's a change — count it.",
        "이벤트를 날짜순으로 하나씩 적용해요. 그때마다 지금 1등을 다시 구해요. 바로 앞 1등과 다르면 바뀐 거니 세요.") },
      { hi: [49, 50], bubble: t(E,
        "Write the total number of changes.",
        "바뀐 횟수를 파일에 출력해요.") },
    ],
  };
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadMilkMeasPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MilkMeas — Full Study Guide", "MilkMeas — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}

