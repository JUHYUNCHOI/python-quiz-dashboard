import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { isMoo, findAllMoos } from "./helpers";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   MooSim — Interactive moo pattern finder (unchanged from original)
   ═══════════════════════════════════════════════════════════════ */
export function MooSim({ E }) {
  const PRESETS = ["zzmoozzmoo", "momoobaaaaaqqqcqq", "ooo", "aabbcc"];
  const [str, setStr] = useState("zzmoozzmoo");
  const [editPos, setEditPos] = useState(null);

  const arr = str.split("");
  const moos = findAllMoos(arr);
  const mooList = Object.entries(moos).sort((a, b) => b[1] - a[1]);

  const highlights = new Set();
  for (let i = 0; i <= arr.length - 3; i++) {
    if (isMoo(arr[i], arr[i + 1], arr[i + 2])) {
      highlights.add(i); highlights.add(i + 1); highlights.add(i + 2);
    }
  }

  const applyEdit = (c) => {
    if (c.length === 1 && /[a-z]/.test(c)) {
      const newArr = [...arr]; newArr[editPos] = c; setStr(newArr.join(""));
    }
    setEditPos(null);
  };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setStr(p); setEditPos(null); }}
            style={{
              padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${str === p ? C.accent : C.border}`,
              background: str === p ? C.accentBg : C.card,
              color: str === p ? C.accent : C.dim, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
            }}>{p.length > 10 ? p.slice(0, 8) + "…" : p}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12, justifyContent: "center" }}>
        <input value={str}
          onChange={e => { setStr(e.target.value.replace(/[^a-z]/g, "")); setEditPos(null); }}
          placeholder={E ? "type lowercase letters" : "소문자 입력"}
          style={{
            flex: 1, maxWidth: 240, padding: "6px 10px", borderRadius: 8,
            border: `2px solid ${C.border}`, fontSize: 13,
            fontFamily: "'JetBrains Mono',monospace",
          }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", marginBottom: 12, padding: "0 4px" }}>
        {arr.map((ch, i) => (
          <div key={i} style={{ position: "relative" }}>
            <button onClick={() => setEditPos(i)} style={{
              width: 26, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 5, cursor: "pointer", fontSize: 14, fontWeight: 800,
              fontFamily: "'JetBrains Mono',monospace",
              background: editPos === i ? "#fde68a" : highlights.has(i) ? C.accentBg : "#f8f9fc",
              border: `2px solid ${editPos === i ? "#f59e0b" : highlights.has(i) ? C.accentBd : C.border}`,
              color: editPos === i ? "#92400e" : highlights.has(i) ? C.accent : C.text,
            }}>{ch}</button>
            <div style={{ fontSize: 8, textAlign: "center", color: C.dimLight, marginTop: 1 }}>{i}</div>
          </div>
        ))}
      </div>

      {editPos !== null && (
        <div style={{
          background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10,
          padding: "10px 14px", marginBottom: 12, textAlign: "center",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
            {t(E, `Change position ${editPos} (${arr[editPos]}):`, `위치 ${editPos} (${arr[editPos]}) 바꾸기:`)}
          </div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
            {"abcdefghijklmnopqrstuvwxyz".split("").map(c => (
              <button key={c} onClick={() => applyEdit(c)} style={{
                width: 24, height: 26, borderRadius: 4, fontSize: 12, fontWeight: 800,
                border: `1.5px solid ${c === arr[editPos] ? C.accent : C.border}`,
                background: c === arr[editPos] ? C.accentBg : "#fff",
                color: c === arr[editPos] ? C.accent : C.text,
                cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
              }}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: C.card, borderRadius: 10, border: `1.5px solid ${C.border}`, padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
          {t(E, `Moos found: ${mooList.length}`, `발견된 Moo: ${mooList.length}개`)}
        </div>
        {mooList.length === 0 ? (
          <div style={{ fontSize: 12, color: C.dim }}>
            {t(E, "No moo patterns in this string.", "이 문자열에 moo 패턴이 없어.")}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mooList.map(([key, count]) => (
              <div key={key} style={{
                padding: "4px 10px", borderRadius: 8,
                background: count >= 2 ? C.okBg : C.accentBg,
                border: `1.5px solid ${count >= 2 ? C.okBd : C.accentBd}`,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 13, fontWeight: 700,
                color: count >= 2 ? C.ok : C.accent,
              }}>{key} ×{count}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MooBruteRunner — async + live + stop preserves + USACO 추정
   ═══════════════════════════════════════════════════════════════ */
export function MooBruteRunner({ E }) {
  const [N, setN] = useState(50);
  const [F, setF] = useState(2);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [livePos, setLivePos] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const alive = useRef(false);
  const startRef = useRef(0);

  const fmtTime = (sec) => {
    if (sec < 1) return `${(sec * 1000).toFixed(0)}ms`;
    if (sec < 60) return `${sec.toFixed(1)}s`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)}분`;
    return `${(sec / 3600).toFixed(1)}시간`;
  };
  const estUSACO = (n) => (26 * n * n) / 1e8;

  const run = () => {
    if (N < 3 || N > 5000) return;
    setRunning(true); setResult(null); setProgress(0);
    setLivePos(0); setLiveCount(0);
    alive.current = true;
    startRef.current = performance.now();

    const chars = "abcdefghij";
    let s = "";
    for (let i = 0; i < N; i++) s += chars[Math.floor(Math.random() * chars.length)];
    const arr = s.split("");

    const result = new Set();
    const orig = findAllMoos(arr);
    for (const [k, v] of Object.entries(orig)) if (v >= F) result.add(k);

    let pos = 0;
    const finish = (partial) => {
      const elapsed = performance.now() - startRef.current;
      const sorted = [...result].sort();
      setRunning(false);
      setResult({
        N, F, count: sorted.length, sample: sorted.slice(0, 5),
        elapsedMs: elapsed, partial, completedPos: pos,
      });
      alive.current = false;
    };

    const tick = () => {
      if (!alive.current) { finish(true); return; }
      const oc = arr[pos];
      for (let ci = 0; ci < 26; ci++) {
        const c = String.fromCharCode(97 + ci);
        if (c === oc) continue;
        arr[pos] = c;
        const moos = findAllMoos(arr);
        for (const [k, v] of Object.entries(moos)) if (v >= F) result.add(k);
        arr[pos] = oc;
      }
      pos++;
      setProgress(Math.floor(pos / N * 100));
      setLivePos(pos);
      setLiveCount(result.size);
      if (pos >= N) { finish(false); return; }
      setTimeout(tick, 16);
    };
    setTimeout(tick, 50);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: "12px 8px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>N =</span>
        <input type="number" min={3} max={5000} value={N}
          onChange={e => { setN(+e.target.value); setResult(null); }}
          disabled={running}
          style={{ width: 70, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: C.dim }}>F =</span>
        <input type="number" min={1} max={100} value={F}
          onChange={e => { setF(+e.target.value); setResult(null); }}
          disabled={running}
          style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `2px solid ${C.border}`,
            fontSize: 16, fontWeight: 800, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <button
          onClick={running ? stop : run}
          disabled={!running && (N < 3 || N > 5000)}
          style={{
            padding: "8px 24px", borderRadius: 10, border: "none",
            background: running ? "#dc2626" : "linear-gradient(135deg,#818cf8,#6366f1)",
            color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>
          {running ? (E ? "⏹ Stop" : "⏹ 중지") : (E ? "▶ Run Brute" : "▶ 브루트 실행")}
        </button>
      </div>
      {N > 500 && <div style={{ textAlign: "center", fontSize: 12, color: C.carry, fontWeight: 700, marginBottom: 8 }}>
        {E ? "⚠️ N>500 will be slow — that's the point! Try Stop midway." : "⚠️ N>500 이면 느려져 — 그게 포인트! 중간에 Stop 눌러봐."}
      </div>}

      {running && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: A, borderRadius: 4, width: `${progress}%`, transition: "width .1s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: C.dim, fontWeight: 700 }}>
            <span>{t(E, "position", "위치")} <span style={{ color: A, fontWeight: 900 }}>{livePos}/{N}</span></span>
            <span>{t(E, "moos found", "발견 moo")}: <span style={{ color: A, fontWeight: 900 }}>{liveCount}</span></span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {result && (
        <div>
          <div style={{ textAlign: "center", padding: "12px 0", marginBottom: 10 }}>
            {result.partial ? (
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 800, letterSpacing: 0.5 }}>
                ⏸ {t(E, `STOPPED at position ${result.completedPos} of ${result.N}`,
                       `${result.completedPos} / ${result.N} 위치에서 중지`)}
              </div>
            ) : (
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 800 }}>
                ✓ {t(E, `${result.N} positions × 26 letters checked`, `${result.N} 위치 × 26 글자 전부 확인`)}
              </div>
            )}
            <div style={{ fontSize: 32, fontWeight: 900, color: A, fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
              {result.count}
            </div>
            <div style={{ fontSize: 11, color: C.dim }}>{t(E, "distinct moos found (≥ F)", "≥ F 인 distinct moo 개수")}</div>
            {result.sample.length > 0 && (
              <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace", marginTop: 4 }}>
                {result.sample.join(", ")}{result.count > 5 ? "…" : ""}
              </div>
            )}
          </div>

          <div style={{
            background: "#fff", border: `2px solid ${result.elapsedMs > 500 ? "#dc2626" : "#10b981"}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.dim, letterSpacing: 0.5 }}>
                ⏱️ {t(E, "BROWSER TIME", "브라우저 측정 시간")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: result.elapsedMs > 500 ? "#dc2626" : "#10b981", fontFamily: "'JetBrains Mono',monospace" }}>
                {fmtTime(result.elapsedMs / 1000)}
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.dim, textAlign: "right", lineHeight: 1.5, maxWidth: 180 }}>
              {t(E, "Pure brute is faster but still O(26N²).", "순수 brute 는 더 빠르지만 여전히 O(26N²).")}
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #fef2f2, #fff)", border: `2px solid #dc2626`, borderRadius: 10,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#dc2626", letterSpacing: 0.5, marginBottom: 6 }}>
              🏆 {t(E, "ON USACO JUDGE — REAL ESTIMATE", "USACO 채점기 — 실제 추정")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { N: result.N, label: t(E, "your N", "지금 N") },
                  { N: 5000, label: "5,000" },
                  { N: 20000, label: "20,000 (max!)" },
                ].map((row, i) => {
                  const sec = estUSACO(row.N);
                  const tle = sec > 2;
                  return (
                    <tr key={i} style={{ borderTop: i > 0 ? "1px solid #fee2e2" : "none" }}>
                      <td style={{ padding: "4px 0", fontWeight: 700, color: C.dim }}>N = {row.N.toLocaleString()}</td>
                      <td style={{ padding: "4px 6px", fontSize: 10, color: C.dim }}>{row.label}</td>
                      <td style={{ padding: "4px 0", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981" }}>
                        {fmtTime(sec)}
                      </td>
                      <td style={{ padding: "4px 0 4px 6px", textAlign: "right", fontWeight: 800, color: tle ? "#dc2626" : "#10b981", minWidth: 32 }}>
                        {tle ? "TLE" : "✓"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 6, fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
              {t(E, "Estimate: 26 × N² ops / 10⁸ ops/sec (C++).", "추정: 26 × N² 연산 / 1억 ops/sec (C++).")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   getMooBruteSections — 첫 아이디어 (브루트) 단계별 코드
   ═══════════════════════════════════════════════════════════════ */

const BR_INPUT_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "s = list(input().strip())",
  "result = set()",
];
const BR_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int n, f;",
  "    cin >> n >> f;",
  "    string s; cin >> s;",
  "    set<string> result;",
];

const BR_HELPERS_PY = [
  "def is_moo(a, b, c):",
  "    return a != b and b == c",
  "",
  "def count_all(arr):",
  "    moos = {}",
  "    for i in range(len(arr) - 2):",
  "        if is_moo(arr[i], arr[i+1], arr[i+2]):",
  "            key = arr[i] + arr[i+1] + arr[i+2]",
  "            moos[key] = moos.get(key, 0) + 1",
  "    return moos",
];
const BR_HELPERS_CPP = [
  "    auto isMoo = [](char a, char b, char c) {",
  "        return a != b && b == c;",
  "    };",
  "",
  "    auto countAll = [&](const string& str) {",
  "        map<string, int> moos;",
  "        for (int i = 0; i + 2 < (int)str.size(); i++) {",
  "            if (isMoo(str[i], str[i+1], str[i+2])) {",
  "                moos[str.substr(i, 3)]++;",
  "            }",
  "        }",
  "        return moos;",
  "    };",
];

const BR_LOOP_PY = [
  "# 원본 문자열에 이미 있는 moo 등록",
  "for k, v in count_all(s).items():",
  "    if v >= f:",
  "        result.add(k)",
  "",
  "# 🐌 매 위치 × 26 글자 시도 — TLE 원인!",
  "for pos in range(n):",
  "    orig = s[pos]",
  "    for c in 'abcdefghijklmnopqrstuvwxyz':",
  "        if c == orig: continue",
  "        s[pos] = c",
  "        # 매번 전체 문자열 재스캔 (N 칸)",
  "        for k, v in count_all(s).items():",
  "            if v >= f:",
  "                result.add(k)",
  "        s[pos] = orig",
];
const BR_LOOP_CPP = [
  "    // 원본 문자열에 이미 있는 moo 등록",
  "    for (auto& [k, v] : countAll(s))",
  "        if (v >= f) result.insert(k);",
  "",
  "    // 🐌 매 위치 × 26 글자 시도 — TLE 원인!",
  "    for (int pos = 0; pos < n; pos++) {",
  "        char orig = s[pos];",
  "        for (char c = 'a'; c <= 'z'; c++) {",
  "            if (c == orig) continue;",
  "            s[pos] = c;",
  "            // 매번 전체 문자열 재스캔 (N 칸)",
  "            for (auto& [k, v] : countAll(s))",
  "                if (v >= f) result.insert(k);",
  "            s[pos] = orig;",
  "        }",
  "    }",
];

const BR_OUTPUT_PY = [
  "result = sorted(result)",
  "print(len(result))",
  "print('\\n'.join(result))",
];
const BR_OUTPUT_CPP = [
  "    cout << result.size() << \"\\n\";",
  "    for (auto& m : result) cout << m << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMooBruteSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: "#94a3b8",
      py: BR_INPUT_PY, cpp: BR_INPUT_CPP,
      why: [
        t(E, "n = string length, f = threshold (count of moo to qualify).", "n = 문자열 길이, f = moo 개수 기준치."),
        t(E, "result is a SET — auto-dedupe (same moo found via different positions = once).", "result 는 SET — 중복 자동 제거 (다른 위치에서 같은 moo 발견해도 1 번)."),
      ],
      pyOnly: [
        t(E, "list(input()) — Python strings are immutable; need list to mutate during trials.", "list(input()) — Python 문자열은 변경 불가, 시도 중 변경 위해 리스트 필요."),
      ],
      cppOnly: [
        t(E, "std::string is mutable in C++ — direct s[pos] = c works.", "C++ string 은 변경 가능 — s[pos] = c 바로 가능."),
      ],
    },
    {
      label: t(E, "🔧 2. Helpers (is_moo + count_all)", "🔧 2. 헬퍼 함수 (is_moo + count_all)"),
      color: "#0891b2",
      py: BR_HELPERS_PY, cpp: BR_HELPERS_CPP,
      why: [
        t(E, "isMoo: a != b AND b == c. Defines what counts as a moo.", "isMoo: a != b AND b == c. moo 의 정의."),
        t(E, "count_all: scan ENTIRE string, count every moo pattern. O(N).", "count_all: 전체 문자열 훑어 모든 moo 카운트. O(N)."),
        t(E, "This is the bottleneck — we'll call count_all 26N times in the loop below!", "이게 병목 — 아래 루프에서 count_all 을 26N 번 호출!"),
      ],
      pyOnly: [
        t(E, "Plain dict with .get(key, 0) for safe defaults. (defaultdict is faster but same idea.)", "기본 dict + .get(key, 0) 안전 기본값. (defaultdict 더 빠르지만 같은 아이디어)"),
      ],
      cppOnly: [
        t(E, "Lambdas with [&] capture for cleaner local helpers.", "[&] 캡처 람다로 로컬 헬퍼 깔끔하게."),
        t(E, "map<string, int> auto-initializes to 0 on first access via [].", "map<string, int> 은 [] 첫 접근 시 자동 0 초기화."),
      ],
    },
    {
      label: t(E, "🐌 3. Trial Loop (THE TLE)", "🐌 3. 시도 루프 (TLE 원인!)"),
      color: "#dc2626",
      py: BR_LOOP_PY, cpp: BR_LOOP_CPP,
      why: [
        t(E, "First: register moos already in original string (no change needed).", "먼저: 원본에 이미 있는 moo 등록 (변경 불필요)."),
        t(E, "Then: for each of N positions, try all 26 letters — that's 26N trials.", "그 다음: N 위치마다 26 글자 시도 — 총 26N 시도."),
        t(E, "Each trial calls count_all → O(N) work → Total: 26N × N = 26N² operations.", "각 시도마다 count_all 호출 → O(N) → 총 26N × N = 26N² 연산."),
        t(E, "Restore s[pos] = orig after each trial — keeps state clean.", "각 시도 후 s[pos] = orig 복원 — 상태 깨끗하게 유지."),
        t(E, "For N=20,000: 26 × 4×10⁸ = ~10¹⁰ ops → TLE on USACO judge.", "N=20,000: 26 × 4×10⁸ = ~10¹⁰ 연산 → USACO 채점기에서 TLE."),
      ],
    },
    {
      label: t(E, "📤 4. Sort + Output", "📤 4. 정렬 + 출력"),
      color: "#94a3b8",
      py: BR_OUTPUT_PY, cpp: BR_OUTPUT_CPP,
      why: [
        t(E, "Sort result alphabetically (problem requires sorted output).", "결과 사전순 정렬 (문제 요구)."),
        t(E, "Output: count K first, then K moos on separate lines.", "출력: 개수 K 먼저, 그 다음 각 moo 한 줄씩."),
      ],
      pyOnly: [
        t(E, "sorted(result) returns a new sorted list. '\\n'.join() for output.", "sorted(result) 로 정렬 리스트. '\\n'.join() 으로 출력."),
      ],
      cppOnly: [
        t(E, "set<string> already iterates in alphabetical order — no extra sort step.", "set<string> 이 이미 알파벳순 순회 — 추가 sort 불필요."),
      ],
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   getMooSections — Python + C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const MOO_INPUT_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "string = list(input().strip())",
];
const MOO_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int n, f;",
  "    cin >> n >> f;",
  "    string s; cin >> s;",
];

const MOO_PRECOUNT_PY = [
  "def isMoo(a, b, c):",
  "    return a != b and b == c",
  "",
  "mydict = defaultdict(int)",
  "for i in range(n - 2):",
  "    if isMoo(string[i], string[i+1], string[i+2]):",
  "        key = string[i] + string[i+1] + string[i+2]",
  "        mydict[key] += 1",
];
const MOO_PRECOUNT_CPP = [
  "    auto isMoo = [](char a, char b, char c) {",
  "        return a != b && b == c;",
  "    };",
  "",
  "    map<string, int> mydict;",
  "    for (int i = 0; i + 2 < n; i++) {",
  "        if (isMoo(s[i], s[i+1], s[i+2])) {",
  "            string key = s.substr(i, 3);",
  "            mydict[key]++;",
  "        }",
  "    }",
];

const MOO_TRY_PY = [
  "result = set()",
  "alphabet = 'abcdefghijklmnopqrstuvwxyz'",
  "",
  "for pos in range(n):",
  "    minIdx = max(pos - 2, 0)",
  "    maxIdx = min(n - 3, pos)",
  "",
  "    # 🔴 REMOVE: 영향받는 3 윈도우 카운트 빼기",
  "    for idx in range(minIdx, maxIdx + 1):",
  "        t = string[idx:idx+3]",
  "        if isMoo(t[0], t[1], t[2]):",
  "            mydict[t[0]+t[1]+t[2]] -= 1",
  "",
  "    # 🟡 TRY 26 letters",
  "    for c in alphabet:",
  "        for idx in range(minIdx, maxIdx + 1):",
  "            t = list(string[idx:idx+3])",
  "            t[pos - idx] = c",
  "            if isMoo(t[0], t[1], t[2]):",
  "                key = t[0]+t[1]+t[2]",
  "                mydict[key] += 1",
  "                if mydict[key] >= f:",
  "                    result.add(key)",
  "                mydict[key] -= 1",
  "",
  "    # 🟢 RESTORE: 원래 윈도우 복원",
  "    for idx in range(minIdx, maxIdx + 1):",
  "        t = string[idx:idx+3]",
  "        if isMoo(t[0], t[1], t[2]):",
  "            mydict[t[0]+t[1]+t[2]] += 1",
];
const MOO_TRY_CPP = [
  "    set<string> result;",
  "",
  "    for (int pos = 0; pos < n; pos++) {",
  "        int minIdx = max(pos - 2, 0);",
  "        int maxIdx = min(n - 3, pos);",
  "",
  "        // 🔴 REMOVE",
  "        for (int idx = minIdx; idx <= maxIdx; idx++)",
  "            if (isMoo(s[idx], s[idx+1], s[idx+2]))",
  "                mydict[s.substr(idx, 3)]--;",
  "",
  "        // 🟡 TRY 26 letters",
  "        char orig = s[pos];",
  "        for (char c = 'a'; c <= 'z'; c++) {",
  "            s[pos] = c;",
  "            for (int idx = minIdx; idx <= maxIdx; idx++) {",
  "                if (isMoo(s[idx], s[idx+1], s[idx+2])) {",
  "                    string key = s.substr(idx, 3);",
  "                    mydict[key]++;",
  "                    if (mydict[key] >= f) result.insert(key);",
  "                    mydict[key]--;",
  "                }",
  "            }",
  "        }",
  "        s[pos] = orig;",
  "",
  "        // 🟢 RESTORE",
  "        for (int idx = minIdx; idx <= maxIdx; idx++)",
  "            if (isMoo(s[idx], s[idx+1], s[idx+2]))",
  "                mydict[s.substr(idx, 3)]++;",
  "    }",
];

const MOO_OUTPUT_PY = [
  "result = sorted(result)",
  "print(len(result))",
  "print('\\n'.join(result))",
];
const MOO_OUTPUT_CPP = [
  "    cout << result.size() << \"\\n\";",
  "    for (auto& m : result) cout << m << \"\\n\";",
  "    return 0;",
  "}",
];

const MOO_FULL_PY = [
  ...MOO_INPUT_PY, "",
  ...MOO_PRECOUNT_PY, "",
  ...MOO_TRY_PY, "",
  ...MOO_OUTPUT_PY,
];
const MOO_FULL_CPP = [
  ...MOO_INPUT_CPP, "",
  ...MOO_PRECOUNT_CPP, "",
  ...MOO_TRY_CPP, "",
  ...MOO_OUTPUT_CPP,
];

export function getMooSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: MOO_INPUT_PY, cpp: MOO_INPUT_CPP,
      why: [
        t(E, "n = string length, f = threshold (count of moo to qualify).",
            "n = 문자열 길이, f = moo 개수 기준치."),
        t(E, "Read string as mutable so we can try changing letters during trials.",
            "문자열은 변경 가능하게 읽어야 — 시도하면서 글자 바꿀 수 있게."),
      ],
      pyOnly: [
        t(E, "list(input()) — Python strings are immutable; converting to list lets us do string[i] = c.",
            "list(input()) — Python 문자열은 변경 불가니까 리스트로 변환해야 string[i] = c 가능."),
        t(E, "sys.stdin.readline + defaultdict from collections (auto-init keys to 0).",
            "sys.stdin.readline 으로 빠른 입력 + defaultdict 가 키를 자동 0 으로 초기화."),
      ],
      cppOnly: [
        t(E, "std::string is mutable in C++ — direct s[i] = c works without conversion.",
            "C++ string 은 변경 가능 — 변환 없이 s[i] = c 바로 가능."),
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) — Fast I/O, essential for N=20K.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr) — Fast I/O, N=20K 에 필수."),
      ],
    },
    {
      label: t(E, "📊 2. Pre-count moos", "📊 2. moo 미리 세기"),
      color: "#0891b2",
      py: MOO_PRECOUNT_PY, cpp: MOO_PRECOUNT_CPP,
      why: [
        t(E, "Scan original string ONCE → count every moo pattern (3-letter ABB where A≠B).",
            "원본을 한 번만 훑어 → 모든 moo 패턴 (ABB, A≠B) 카운트."),
        t(E, "isMoo helper: a != b AND b == c. 'moo' / 'baa' / 'tee' all match.",
            "isMoo 헬퍼: a != b AND b == c. 'moo' / 'baa' / 'tee' 다 해당."),
        t(E, "Why pre-count? So later we can update incrementally (just ±1 per change).",
            "왜 미리 셈? 나중에 변경 시 ±1 만 하면 되도록 (incremental 업데이트)."),
      ],
      pyOnly: [
        t(E, "defaultdict(int) — accessing non-existent key auto-returns 0. No 'if key not in dict' check.",
            "defaultdict(int) — 없는 키 접근 시 자동 0. 'if key not in dict' 체크 생략."),
        t(E, "Slicing: string[i:i+3] gives a 3-char substring. Concatenate for dict key.",
            "슬라이싱: string[i:i+3] 으로 3 글자 부분문자열. dict 키로 이어 붙이기."),
      ],
      cppOnly: [
        t(E, "map<string, int> uses red-black tree → keys are stored in sorted order automatically.",
            "map<string, int> 은 RB-tree 기반 → 키가 자동으로 정렬돼 저장됨."),
        t(E, "s.substr(i, 3) extracts 3-char substring starting at i. Used as map key.",
            "s.substr(i, 3) 으로 i 부터 3 글자 추출. map 키로 사용."),
        t(E, "Bonus: when we output result later, map iteration is already alphabetical — no sort needed.",
            "보너스: 나중에 result 출력 시 map 순회가 이미 알파벳순 — 따로 정렬 불필요."),
      ],
    },
    {
      label: t(E, "🔄 3. Remove → Try → Restore", "🔄 3. 빼기 → 시도 → 복원"),
      color: "#16a34a",
      py: MOO_TRY_PY, cpp: MOO_TRY_CPP,
      why: [
        t(E, "For each pos: only 3 windows contain pos (idx = pos-2, pos-1, pos). NOT N!",
            "각 pos: pos 포함 윈도우 정확히 3 개 (idx = pos-2, pos-1, pos). N 개가 아님!"),
        t(E, "🔴 REMOVE: subtract 3 windows' contribution from the count dict.",
            "🔴 빼기: 3 윈도우 기여를 카운트 dict 에서 빼기."),
        t(E, "🟡 TRY 26 letters: temporarily add new contribution, check ≥ f, IMMEDIATELY undo.",
            "🟡 26 글자 시도: 임시로 더하고, ≥ f 체크 후 즉시 되돌리기."),
        t(E, "Why immediately undo? Next letter trial needs clean state — without previous trial mixed in.",
            "왜 즉시 되돌림? 다음 시도가 깨끗한 상태 필요 — 이전 시도 카운트 섞이지 않게."),
        t(E, "🟢 RESTORE: add back the 3 original windows so the dict isn't permanently changed.",
            "🟢 복원: 원래 3 윈도우 다시 더해 dict 영구 변경 방지."),
        t(E, "Total: N × 26 × 3 = 78N. Down from 26N² brute. ~6,667× speedup at N=20,000.",
            "총: N × 26 × 3 = 78N. 브루트 26N² 에서 ~6,667 배 빠름 (N=20,000)."),
      ],
      pyOnly: [
        t(E, "list(string[idx:idx+3]) creates a fresh copy — modifying t doesn't affect string.",
            "list(string[idx:idx+3]) 로 새 복사본 — t 수정해도 string 영향 없음."),
        t(E, "t[pos - idx] = c: change the right offset within the 3-letter window.",
            "t[pos - idx] = c: 3 글자 윈도우 내에서 올바른 오프셋 변경."),
      ],
      cppOnly: [
        t(E, "We modify s[pos] directly (faster than copying), then restore at end of inner loop.",
            "s[pos] 를 직접 변경 (복사보다 빠름), 안쪽 루프 끝에서 복원."),
        t(E, "set<string> ensures distinct moos (problem allows multiple positions to yield same key).",
            "set<string> 으로 중복 제거 (여러 위치에서 같은 moo 키 나올 수 있음)."),
      ],
    },
    {
      label: t(E, "🎯 4. Output + Full Code", "🎯 4. 출력 + 전체 코드"),
      color: A,
      py: MOO_FULL_PY, cpp: MOO_FULL_CPP,
      why: [
        t(E, "Sort result alphabetically (problem requires sorted output).",
            "결과 사전순 정렬 (문제 요구)."),
        t(E, "Output format: count K first, then K moos on separate lines.",
            "출력 형식: 개수 K 먼저, 그 다음 각 moo 한 줄씩."),
        t(E, "Time: O(78N). For N=20,000: 1.56M ops — instant. Brute would take ~104s.",
            "시간: O(78N). N=20,000 에서 156만 연산 — 즉시. 브루트는 ~104초."),
      ],
      pyOnly: [
        t(E, "sorted(result) returns a list in alphabetical order. Then '\\n'.join() for output.",
            "sorted(result) 로 알파벳 정렬 리스트. '\\n'.join() 으로 출력."),
      ],
      cppOnly: [
        t(E, "set<string> already iterates in alphabetical order — no extra sort step.",
            "set<string> 이 이미 알파벳순 순회 — 추가 sort 불필요."),
      ],
    },
  ];
}


/* ProgressiveCode — 수직 스택 (위→아래 step by step 자연스럽게 읽기).
   lang prop 은 헤더에서. 위젯 내부 toggle/PDF 제거.
   reasoning: cur.why (공통) + cur.pyOnly / cur.cppOnly (언어별). */
export function MooProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";

  return (
    <div style={{ padding: 14 }}>
      {/* 현재 언어 표시 */}
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`,
            `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>

      {/* 모든 섹션을 수직으로 스택 — 위→아래 자연스레 읽기 */}
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            {/* 섹션 헤더 */}
            <div style={{
              background: s.color, color: "#fff",
              padding: "8px 14px", borderRadius: "10px 10px 0 0",
              fontSize: 14, fontWeight: 800,
            }}>{s.label}</div>

            {/* "왜 이렇게?" reasoning */}
            <div style={{
              background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none",
              padding: "10px 12px",
            }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {langLabel} {t(E, "specific:", "전용:")}
                  </div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 코드 — 같이 붙어 있음 */}
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              <CodeBlock lines={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   downloadMooPDF
   ═══════════════════════════════════════════════════════════════ */

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","set","sorted","join","list","max","min"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","to_string","size","include","vector","map","set","substr","max","min"];

function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") {
    const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  } else {
    const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); }
  }
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadMooPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "It's Mooin' Time — Full Study Guide", "🐄 It's Mooin' Time — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #ede9fe; color: #5b21b6; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #ede9fe; border: 1.5px solid #c4b5fd; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF' as the destination.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 December Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "A length-N string of lowercase letters contains 'moo'-like patterns: 3-letter ABB where A≠B (e.g., 'moo', 'baa', 'tee'). Bessie says the recording may have AT MOST 1 typo. Find all moo patterns that appear ≥ F times — either in the original string OR after changing exactly one letter somewhere.",
  "길이 N 의 소문자 문자열에 'moo' 같은 패턴: ABB (A≠B) 형태 3 글자 (예: 'moo', 'baa', 'tee'). Bessie 가 녹음에 최대 1 글자 오타 가능하다고 함. F 번 이상 나오는 모든 moo 패턴 찾기 — 원본 그대로 OR 정확히 1 글자 바꾼 후.")}</p>

<h3>${t(E, "Input / Output", "입출력")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td>N F (first line)<br>S (lowercase string)</td><td>K (count of distinct qualifying moos)<br>${t(E, "Then K moos sorted alphabetically", "그 다음 정렬된 moo K 개")}</td></tr>
</table>
<p>${t(E, "Constraints: 3 ≤ N ≤ 20,000.", "제약: 3 ≤ N ≤ 20,000.")}</p>

<h3>${t(E, "Sample I/O", "예제 입출력")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">10 2
zzmoozzmoo</pre></td><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">1
moo</pre></td></tr>
</table>
<p>${t(E, "'moo' appears twice (≥ F=2). Even with 1 letter change, no other pattern reaches 2.", "'moo' 가 2 번 (≥ F=2). 1 글자 바꿔도 새로 2 번 도달 패턴 없음.")}</p>

<h2>2. ${t(E, "Brute Force (TLE)", "브루트 포스 (TLE)")}</h2>
<p>${t(E, "Direct: for each of N positions, try all 26 letters, then re-scan the entire string for moos. O(26N²).", "직접: N 위치마다 26 글자 시도, 매번 전체 재스캔. O(26N²).")}</p>

${codeBlock([
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "n, f = map(int, input().split())",
  "s = list(input().strip())",
  "result = set()",
  "",
  "def is_moo(a, b, c): return a != b and b == c",
  "",
  "def count_all(arr):",
  "    moos = defaultdict(int)",
  "    for i in range(len(arr) - 2):",
  "        if is_moo(arr[i], arr[i+1], arr[i+2]):",
  "            moos[arr[i] + arr[i+1] + arr[i+2]] += 1",
  "    return moos",
  "",
  "for k, v in count_all(s).items():",
  "    if v >= f: result.add(k)",
  "",
  "for pos in range(n):",
  "    orig = s[pos]",
  "    for c in 'abcdefghijklmnopqrstuvwxyz':",
  "        if c == orig: continue",
  "        s[pos] = c",
  "        for k, v in count_all(s).items():",
  "            if v >= f: result.add(k)",
  "        s[pos] = orig",
])}

<div class="box no">
  <b>${t(E, "Why TLE?", "왜 TLE?")}</b>
  ${t(E, "N=20,000: 26 × 4×10⁸ = ~10¹⁰ ops. At 10⁸ ops/sec → ~100 sec. TLE.", "N=20,000: 26 × 4×10⁸ = ~10¹⁰ 연산. 1억 ops/sec → ~100 초. TLE.")}
</div>

<h2>3. ${t(E, "Pattern: Remove → Try → Restore", "패턴: 빼기 → 시도 → 복원")}</h2>

<div class="box ok">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "Changing 1 letter at position pos affects ONLY 3 windows (those containing pos). The other N-3 windows don't change.", "위치 pos 의 1 글자를 바꾸면 영향받는 윈도우는 정확히 3 개 (pos 포함). 나머지 N-3 윈도우는 안 변함.")}
</div>

<h3>${t(E, "Why exactly 3?", "왜 정확히 3?")}</h3>
<p>${t(E, "Position pos can be the 1st, 2nd, or 3rd letter of a 3-letter window. So 3 windows include pos: starting at idx = pos-2, pos-1, pos.", "위치 pos 는 윈도우의 1번째, 2번째, 3번째 글자가 될 수 있음. 그래서 idx = pos-2, pos-1, pos 에서 시작하는 3 윈도우.")}</p>

<h3>${t(E, "Strategy", "전략")}</h3>
<ol>
  <li><b>${t(E, "Pre-count", "미리 세기")}</b>: ${t(E, "scan original ONCE, store moo counts in dict.", "원본 한 번 스캔, dict 에 카운트 저장.")}</li>
  <li><b>${t(E, "For each pos:", "각 pos 마다:")}</b>
    <ul>
      <li>🔴 ${t(E, "REMOVE: subtract 3 windows", "빼기: 3 윈도우 빼기")}</li>
      <li>🟡 ${t(E, "TRY 26 letters: temp add, check ≥ f, immediately undo", "26 글자: 임시 더하고 체크, 즉시 되돌리기")}</li>
      <li>🟢 ${t(E, "RESTORE: add back 3 windows", "복원: 3 윈도우 다시 더하기")}</li>
    </ul>
  </li>
</ol>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "N positions × 26 letters × 3 windows = 78N. For N=20,000 → 1.56M ops. Instant.", "N × 26 × 3 = 78N. N=20,000 → 156만 연산. 즉시.")}
  <br>${t(E, "Speedup: 26N² / 78N = N/3 ≈ 6,667× faster.", "속도: 26N² / 78N = N/3 ≈ 6,667 배.")}
</div>

<h2>4. ${t(E, "Optimal Code (4 sections)", "최적 코드 (4 부분)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용 출력")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
