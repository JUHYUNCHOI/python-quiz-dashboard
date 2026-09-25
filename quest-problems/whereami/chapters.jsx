import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { localizeCode } from "@/components/quest/localizeCode";
import { getWhereAmISections } from "./components";

/* ──────────────────────────────────────────────────────────────
   Interactive sim — type a mailbox-color string, slide K, watch
   every length-K window highlighted; duplicates red, distinct green.
   ────────────────────────────────────────────────────────────── */
function WhereAmISim({ E }) {
  const [text, setText] = useState("ABCBABC");
  const [K, setK] = useState(2);
  const s = text.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 14);
  const N = s.length;
  const safeK = Math.max(1, Math.min(K, Math.max(1, N)));

  // Build windows + count duplicates
  const windows = [];
  const counts = {};
  for (let i = 0; i + safeK <= N; i++) {
    const sub = s.slice(i, i + safeK);
    counts[sub] = (counts[sub] || 0) + 1;
    windows.push({ start: i, sub });
  }
  const distinct = Object.keys(counts).length;
  const total = windows.length;
  const allUnique = total > 0 && distinct === total;

  return (
    <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: 14, marginTop: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#f97316", marginBottom: 8, letterSpacing: 0.4 }}>
        🧪 {t(E, "Try It — Window Slider", "직접 해보기 — 윈도우 슬라이더")}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>
            {t(E, "Mailbox letters (A–Z)", "우편함 글자 (A–Z)")}
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={14}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700,
              padding: "6px 10px", border: `1.5px solid ${C.border}`, borderRadius: 8,
              width: 180, textTransform: "uppercase", outline: "none",
              background: "#fff", color: "#f97316",
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>
            K = <b style={{ color: "#f97316" }}>{safeK}</b> {t(E, "(window size)", "(윈도우 크기)")}
          </div>
          <input
            type="range"
            min={1}
            max={Math.max(1, N)}
            value={safeK}
            onChange={(e) => setK(parseInt(e.target.value, 10))}
            style={{ width: "100%", accentColor: "#f97316" }}
          />
        </div>
      </div>

      {/* String grid */}
      <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 10, flexWrap: "wrap" }}>
        {s.split("").map((ch, i) => (
          <div key={i} style={{
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontSize: 15, fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
            background: "#fff", border: `1.5px solid ${C.border}`, color: "#1e293b",
          }}>{ch}</div>
        ))}
      </div>

      {/* Window list */}
      {N === 0 ? (
        <div style={{ fontSize: 12, color: C.dim, textAlign: "center", padding: 8 }}>
          {t(E, "Type some letters above.", "위에 글자를 넣어 봐요.")}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 10 }}>
          {windows.map((w, wi) => {
            const dup = counts[w.sub] > 1;
            return (
              <span key={wi} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700,
                background: dup ? C.noBg : C.okBg,
                color: dup ? C.no : C.ok,
                border: `1.5px solid ${dup ? C.noBd : C.okBd}`,
                borderRadius: 6, padding: "3px 8px",
              }}>
                {w.sub}
                {counts[w.sub] > 1 ? " ✗" : " ✓"}
              </span>
            );
          })}
        </div>
      )}

      {/* Counter */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", fontSize: 12 }}>
        <span style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 10px", fontWeight: 700, color: C.text }}>
          {t(E, "Distinct", "안 겹침")}: <b style={{ color: C.ok }}>{distinct}</b> / {total}
        </span>
        <span style={{
          background: allUnique ? C.okBg : C.noBg,
          border: `1px solid ${allUnique ? C.okBd : C.noBd}`,
          color: allUnique ? C.ok : C.no,
          borderRadius: 6, padding: "4px 10px", fontWeight: 700,
        }}>
          {N === 0
            ? "—"
            : allUnique
              ? t(E, `K=${safeK} works! ✅`, `K=${safeK} 성공! ✅`)
              : t(E, `K=${safeK} has duplicates ❌`, `K=${safeK} 겹치는 게 있어요 ❌`)}
        </span>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, lineHeight: 1.6, textAlign: "center" }}>
        {t(E,
          "Slide K up until every window turns green. The smallest such K is the answer.",
          "모든 윈도우가 초록이 될 때까지 K 를 올려 봐요. 그때의 가장 작은 K 가 답이에요.")}
      </div>
    </div>
  );
}

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('whereami.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "s = lines[1].strip()",
  "",
  "# K = 1, 2, ... 차례로 시도 — 모든 길이 K 부분문자열이 서로 다르면 그게 답",
  "answer = N",
  "for K in range(1, N + 1):",
  "    seen = set()",
  "    unique = True",
  "    for i in range(N - K + 1):",
  "        sub = s[i:i+K]",
  "        if sub in seen:",
  "            unique = False",
  "            break",
  "        seen.add(sub)",
  "    if unique:",
  "        answer = K",
  "        break",
  "",
  "with open('whereami.out', 'w') as file:",
  "    file.write(str(answer) + '\\n')",
];


/* Python syntax highlighter (shared across snippets) */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False","global","nonlocal"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","reversed","list","dict","set","tuple","enumerate","zip","abs","round","type","isinstance","open","filter","any","all","bool","float"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    } else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    } else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    } else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    } else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    } else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box (token-highlighted Python)
   ⚠️ 2026-09-23: 한국어 주석을 화면 언어에 맞춘다 — localizeCode.ts 를 그대로 탄다
   (공용 CodeBlock 이 하는 것과 같은 일). 줄 수·줄 순서는 그대로, 주석 내용만 바뀐다. */
const CodeSnippet = ({ lines, highlight: hl, E }) => {
  // 이 quest 는 파이썬만 쓴다 — 추측에 기대지 않고 언어를 못박는다 (2026-09-24).
  const displayLines = localizeCode(lines, E, "py");
  return (
    <div style={{
      background: "#1e293b", borderRadius: 10, padding: "10px 8px",
      overflowX: "auto", fontSize: 12, lineHeight: 1.8,
      fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
    }}>
      {displayLines.map((l, i) => {
        const isHl = hl && hl.includes(i);
        const baseColor = isHl ? "#fdba74" : "#e2e8f0";
        const tokens = pyHighlight(l, baseColor);
        return (
          <div key={i} style={{
            display: "flex", minHeight: 20,
            background: isHl ? "rgba(249,115,22,.15)" : "transparent",
            borderRadius: 4, padding: "0 4px",
          }}>
            <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
            <span style={{ whiteSpace: "pre", wordBreak: "break-all" }}>
              {tokens.map((tk, j) => (
                <span key={j} style={{ color: tk.color }}>{tk.text}</span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "What's the smallest K that reveals Bessie's spot?",
        "우편함 K 개만 보고도 내 자리를 알 수 있는 가장 작은 K 는 얼마일까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📍"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.carry }}>Where Am I?</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2019 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: C.carryBg, border: `1.5px solid ${C.carry}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.carry, letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: C.carry, lineHeight: 1.5 }}>
              {t(E,
                "Output the smallest K such that every length-K window in the street's letter string is unique.",
                "길이 K 인 연속 부분문자열이 하나도 겹치지 않게 되는 가장 작은 K 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: C.carryBg, border: `1px solid ${C.carryBd}`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: C.carry, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A street has ", "")}
                  <b style={{ color: C.carry }}>{t(E, "N mailboxes labeled A..Z", "A..Z 글자로 표시된 N 개의 우편함")}</b>
                  {t(E, " (a string of N letters).",
                        " 이 길에 있어요 (길이가 N 인 문자열).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: C.carry, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie wants to identify her location by looking at ", "Bessie는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "K consecutive mailbox labels", "K 개의 연속한 우편함 글자")}</b>
                  {t(E, ".", " 만 보고 위치를 알아내고 싶어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: `1px dashed ${C.carryBd}` }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "smallest K such that every length-K window is unique", "길이 K 인 연속 부분문자열이 하나도 겹치지 않는 가장 작은 K")}</b>
                  {t(E, ".", " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N first, then one line of N letters.",
        "입력은 N 다음에 글자 N 개짜리 한 줄로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of mailboxes", "— 우편함 개수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>s</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— a string of N letters (A–Z)", "— 길이 N 인 문자열 (A–Z)")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The smallest K, on a single line.",
                  "가장 작은 K 를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sliding window visual (also carries the substring definition)
    {
      type: "reveal",
      narr: t(E,
        "Think of it as a window of size K sliding across the string, one step at a time.", "문자열 위를 한 칸씩 미끄러지는 창문이라고 생각해 봐요."),
      content: (() => {
        const str = "ABAB";
        const windows = [
          { start: 0, sub: "AB" },
          { start: 1, sub: "BA" },
          { start: 2, sub: "AB" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
              {t(E, "Sliding window K=2 on \"ABAB\"", "\"ABAB\"에서 K=2 슬라이딩 윈도우")}
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, lineHeight: 1.5 }}>
              {t(E,
                "The letters inside the window are exactly a substring.",
                "창문 안에 보이는 게 바로 그 부분문자열이에요.")}
            </div>
            {windows.map((w, wi) => (
              <div key={wi} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 4 }}>
                  {str.split("").map((ch, ci) => {
                    const inWindow = ci >= w.start && ci < w.start + 2;
                    return (
                      <div key={ci} style={{
                        width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 8, fontSize: 18, fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: inWindow ? C.carry : "#f1f5f9",
                        border: `1.5px solid ${inWindow ? C.carry : C.border}`,
                        color: inWindow ? "#fff" : C.dim,
                        transition: "all .3s",
                      }}>{ch}</div>
                    );
                  })}
                  <span style={{
                    display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace", color: C.carry, marginLeft: 8,
                  }}>= "{w.sub}"</span>
                </div>
              </div>
            ))}
            <div style={{
              background: C.noBg, border: `1px solid ${C.noBd}`, borderRadius: 10,
              padding: 10, textAlign: "center", fontSize: 13, fontWeight: 600, color: C.no,
            }}>
              {t(E, "\"AB\" appears at position 0 AND position 2 -- duplicate! K=2 fails!", "\"AB\" 가 위치 0 과 위치 2 에 두 번 나와요 — 겹쳤으니 K=2 는 실패!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-3: Quiz — K=2 on "ABAB"
    {
      type: "quiz",
      narr: t(E,
        "Check why K=2 fails for \"ABAB\".",
        "\"ABAB\" 에서 K=2 가 왜 안 되는지 확인해 봐요."),
      question: t(E,
        "\"ABAB\", K=2. Substrings: AB, BA, AB. Why does K=2 fail?",
        "\"ABAB\" 에서 K=2 의 부분문자열은 AB, BA, AB 예요.\nK=2 는 왜 실패할까요?"),
      options: [
        t(E, "Because \"BA\" only appears once", "\"BA\" 가 한 번만 나와서요"),
        t(E, "Because \"AB\" appears twice (duplicate!)", "\"AB\" 가 두 번 나와서요 (겹쳐요!)"),
        t(E, "Because there are only 3 substrings", "부분문자열이 3 개밖에 없어서요"),
      ],
      correct: 1,
      explain: t(E,
        "Right! \"AB\" appears at positions 0-1 and 2-3. Duplicate means two different locations look the same -- Bessie can't tell where she is!",
        "맞아요! \"AB\" 가 위치 0-1 과 2-3 에 나와요.\n겹치면 두 자리가 똑같아 보여서 Bessie 는 자기가 어디 있는지 알 수 없어요!"),
    },
    // 1-4: Visual — K=3 on "ABAB" — all unique!
    {
      type: "reveal",
      narr: t(E,
        "Now let's try K=3 on the same string \"ABAB\".", "이번엔 같은 \"ABAB\" 에서 K=3 으로 해봐요."),
      content: (() => {
        const str = "ABAB";
        const windows = [
          { start: 0, sub: "ABA" },
          { start: 1, sub: "BAB" },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "Sliding window K=3 on \"ABAB\"", "\"ABAB\"에서 K=3 슬라이딩 윈도우")}
            </div>
            {windows.map((w, wi) => (
              <div key={wi} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
                  {str.split("").map((ch, ci) => {
                    const inWindow = ci >= w.start && ci < w.start + 3;
                    return (
                      <div key={ci} style={{
                        width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 8, fontSize: 18, fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: inWindow ? C.ok : "#f1f5f9",
                        border: `1.5px solid ${inWindow ? C.ok : C.border}`,
                        color: inWindow ? "#fff" : C.dim,
                      }}>{ch}</div>
                    );
                  })}
                  <span style={{
                    display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace", color: C.ok, marginLeft: 8,
                  }}>= "{w.sub}"</span>
                </div>
              </div>
            ))}
            <div style={{
              background: C.okBg, border: `1px solid ${C.okBd}`, borderRadius: 10,
              padding: 10, textAlign: "center", fontSize: 13, fontWeight: 600, color: C.ok,
            }}>
              {t(E, "\"ABA\" and \"BAB\" -- all different! K=3 works!", "\"ABA\" 와 \"BAB\" — 하나도 안 겹쳐요! K=3 성공!")}
            </div>
          </div>
        );
      })(),
    },
    // 1-5: Input — try another string
    {
      type: "input",
      narr: t(E,
        "Try it on \"AABB\" yourself — start at K=1, see if any duplicate, bump up.",
        "\"AABB\" 를 직접 해봐요. 겹치면 K 를 하나씩 키워요."),
      question: t(E,
        "\"AABB\" -> minimum K for unique substrings?",
        "\"AABB\" 에서 부분문자열이 안 겹치는 가장 작은 K 는 얼마일까요?"),
      hint: t(E,
        "List the windows of size 1 — any repeats?  If yes, try size 2.",
        "크기 1 인 윈도우부터 적어 봐요.\n겹치는 게 있으면 크기 2 로 올려요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 알고리즘 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh2(E) {
  return [
    // 2-1: Algorithm idea
    {
      type: "reveal",
      narr: t(E,
        "Grow K from 1 upward, and stop at the first K that works.", "K 를 1 부터 하나씩 키우다가 처음 되는 K 에서 멈춰요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
            {t(E, "Method: Try K = 1, 2, 3, ...", "방법: K = 1, 2, 3, ... 을 차례로 해보기")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2, 3].map(k => {
              const ok = k === 3;
              return (
                <div key={k} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: ok ? C.okBg : C.noBg,
                  border: `1px solid ${ok ? C.okBd : C.noBd}`,
                  borderRadius: 10, padding: "8px 12px",
                }}>
                  <div style={{
                    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8, fontSize: 16, fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: ok ? C.ok : C.no, color: "#fff",
                  }}>K={k}</div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 700 }}>
                    {k === 1 && t(E, "A, B, A, B -- A repeats! FAIL", "A, B, A, B — A 가 겹쳐요! 실패")}
                    {k === 2 && t(E, "AB, BA, AB -- AB repeats! FAIL", "AB, BA, AB — AB 가 겹쳐요! 실패")}
                    {k === 3 && t(E, "ABA, BAB -- all unique! STOP!", "ABA, BAB — 하나도 안 겹쳐요! 멈춰요!")}
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 18 }}>
                    {ok ? "✅" : "❌"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>),
    },
    // 2-2: How to check uniqueness — using a Set
    {
      type: "reveal",
      narr: t(E,
        "How do we check for duplicates? Use a set!", "겹치는지 어떻게 확인할까요? 집합(set)을 쓰면 돼요."),
      content: (() => {
        const trace = [
          { sub: "AB", set: ["AB"], dup: false },
          { sub: "BA", set: ["AB", "BA"], dup: false },
          { sub: "AB", set: ["AB", "BA"], dup: true },
        ];
        return (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 10 }}>
              {t(E, "Checking K=2 on \"ABAB\" with a Set", "\"ABAB\" 에서 K=2 를 집합으로 확인하기")}
            </div>
            <div style={{
              background: "#1e293b", borderRadius: 10, padding: 12, fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {trace.map((step, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
                  padding: "4px 8px", borderRadius: 6,
                  background: step.dup ? "rgba(220,38,38,.15)" : "transparent",
                }}>
                  <span style={{ color: "#9ca3af", width: 16 }}>{i + 1}.</span>
                  <span style={{ color: step.dup ? "#fca5a5" : "#e2e8f0" }}>
                    sub = "{step.sub}"
                  </span>
                  <span style={{ color: step.dup ? C.no : "#6ee7b7", fontWeight: 600 }}>
                    {step.dup
                      ? t(E, "IN set! Duplicate!", "집합에 이미 있어요! 겹쳐요!")
                      : t(E, "add to set", "집합에 넣기")}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
              {t(E,
                "A set never holds the same item twice.\nSet = {AB, BA}. When we try \"AB\" again it is already there — and that is exactly what 'already seen' means. So K=2 has duplicates.", "집합은 같은 것을 두 번 담지 않아요.\n집합 = {AB, BA} 인데 \"AB\" 를 다시 넣으려 하면 이미 있어요.\n이미 있다는 건 앞에서 한 번 나왔다는 뜻이에요.\n그래서 K=2 는 겹치는 게 있어요.")}
            </div>
          </div>
        );
      })(),
    },
    // 2-3: Interactive sim — try your own string + K
    {
      type: "reveal",
      narr: t(E,
        "Your turn — type some letters and slide K.",
        "글자를 아무거나 넣고 K 를 밀어 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Play with the method", "방법 가지고 놀기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "Try \"ABCBABC\", \"AABB\", or \"AAAA\" — see how K grows when there are more repeats.",
              "\"ABCBABC\", \"AABB\", \"AAAA\" 를 넣어 봐요. 초록은 안 겹치는 것, 빨강은 겹치는 것이에요. 같은 글자가 많을수록 K 가 어떻게 커지는지 보여요.")}
          </div>
          <WhereAmISim E={E} />
        </div>),
    },
    // 2-4: Complexity explanation
    {
      type: "reveal",
      narr: t(E,
        "How long does this take? All together, about O(N²).", "시간이 얼마나 걸릴까요? 다 합치면 O(N²) 쯤이에요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.carry, fontFamily: "'JetBrains Mono', monospace" }}>
            O(N{"\u00b2"})
          </div>
          <div style={{ marginTop: 12, background: C.carryBg, border: `1px solid ${C.carryBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "O(...) means \"roughly this many steps\" — O(N²) is about N×N steps, O(1) is done in one step.\nOuter loop: K from 1 to N (at most N rounds).\nInner loop: checks N-K+1 substrings each time (why N-K+1 — coming up in the code soon). Looking one up in a set is O(1), so altogether it's O(N²).\nN is at most 100, so that's about 100×100 = 10,000 steps — done in a blink!",
              "O(...) 는 '대충 몇 번 걸리는지' 를 적는 방법이에요 — O(N²) 는 N×N 번쯤, O(1) 은 한 번 만에 끝나요.\n바깥 반복문은 K 를 1 부터 N 까지 돌아요 (많아야 N 번).\n안쪽 반복문은 그때마다 N-K+1 개의 부분문자열을 확인해요 (왜 N-K+1 인지는 코드에서 곧 봐요). 집합에서 찾는 건 O(1) 이라 합치면 O(N²) 예요.\nN 이 최대 100 이니까 100×100 = 10000 번쯤 — 눈 깜짝할 새에 끝나요!")}
          </div>
        </div>),
    },
    // 2-5: Hand calculation
    {
      type: "input",
      narr: t(E,
        "Hand-trace \"AABBA\" — start with K=1 and bump until every window is unique.",
        "\"AABBA\" 를 손으로 해봐요. K 를 1 부터 올려요."),
      question: t(E,
        "\"AABBA\" -> minimum K?",
        "\"AABBA\" 에서 가장 작은 K 는 얼마일까요?"),
      hint: t(E,
        "List the windows of each size and check for duplicates.",
        "크기마다 윈도우를 적어 보고 겹치는 게 있는지 봐요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWhereAmICh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "The answer is the smallest K with no repeats. So first, read N and s.", "답은 겹치지 않는 가장 작은 K예요. 먼저 N 과 문자열 s 를 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 1: Read input", "1단계: 입력 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "First line: N (number of mailboxes). Second line: the string of labels.",
              "첫 줄에 N (우편함 수) 이 있어요. 둘째 줄에 글자 문자열이 있어요.")}
          </div>
          <CodeSnippet lines={["with open('whereami.in') as file:", "    lines = file.readlines()", "N = int(lines[0])", "s = lines[1].strip()"]} highlight={[0, 1, 2, 3]} E={E} />
          <div style={{
            marginTop: 10, background: C.carryBg, borderRadius: 8, padding: 8,
            border: `1.5px solid ${C.carryBd}`, fontSize: 12, color: C.text,
          }}>
            {t(E,
              "Example: N=4, s=\"ABAB\"",
              "예시: N=4, s=\"ABAB\"")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Outer loop: try each K
    {
      type: "reveal",
      narr: t(E,
        "A smaller K is better, so try K = 1, 2, 3, ... in order.", "K 가 작을수록 좋으니까, 1부터 늘려가며 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 2: Try each K", "2단계: K 를 하나씩 해보기")}
          </div>
          <CodeSnippet
            lines={[
              "with open('whereami.in') as file:",
              "    lines = file.readlines()",
              "N = int(lines[0])",
              "s = lines[1].strip()",
              "",
              "for K in range(1, N + 1):",
              "    seen = set()",
              "    unique = True",
            ]}
            highlight={[5, 6, 7]}
            E={E}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "For each K, we create a fresh empty set and assume unique=True until proven otherwise.",
              "K 마다 빈 집합을 새로 만들어요. 겹치는 게 나올 때까지는 unique 를 True 로 두고 시작해요.")}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Inner loop: check substrings
    {
      type: "reveal",
      narr: t(E,
        "To see if this K works, check every substring for a repeat.", "이 K 로 될지 보려면, 부분문자열이 겹치는지 하나씩 확인해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 3: Check each substring", "3단계: 부분문자열 하나씩 확인하기")}
          </div>
          <CodeSnippet
            lines={[
              "with open('whereami.in') as file:",
              "    lines = file.readlines()",
              "N = int(lines[0])",
              "s = lines[1].strip()",
              "",
              "for K in range(1, N + 1):",
              "    seen = set()",
              "    unique = True",
              "    for i in range(N - K + 1):",
              "        sub = s[i:i+K]",
              "        if sub in seen:",
              "            unique = False",
              "            break",
              "        seen.add(sub)",
            ]}
            highlight={[8, 9, 10, 11, 12, 13]}
            E={E}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E,
              "The line above, s[i:i+K], extracts K characters starting at position i. If it's already in the set, we found a duplicate!",
              "위 코드의 s[i:i+K] 는 i 번 자리에서 K 글자를 잘라 와요. 집합에 이미 있으면 겹치는 걸 찾은 거예요!")}
          </div>
        </div>),
    },
    // 3-4: Quiz — understanding the inner loop
    {
      type: "quiz",
      narr: t(E,
        "Quick check: in the inner loop, what does `range(N - K + 1)` represent?", "안쪽 반복문의 range(N - K + 1) 은 무엇일까요?"),
      question: t(E,
        "What does range(N - K + 1) give us?",
        "range(N - K + 1) 은 무엇의 개수일까요?"),
      options: [
        t(E, "The number of K-length substrings in the string", "문자열 안에 있는 길이 K 부분문자열의 개수"),
        t(E, "The length of the string", "문자열의 길이"),
        t(E, "The number of unique characters", "서로 다른 글자의 개수"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A window of length K can start at position 0, 1, ... up to N-K — any further and it would run off the end. That is N-K+1 starting positions, so a string of length N has exactly N-K+1 substrings of length K. For example, \"ABAB\" (N=4) with K=2 has 4-2+1 = 3 substrings.",
        "정답이에요! 길이 K 인 윈도우는 0 번 자리부터 N-K 번 자리까지에서 시작할 수 있어요.\n그보다 뒤에서 시작하면 끝을 넘어가 버리거든요.\n시작할 자리가 N-K+1 개니까 부분문자열도 딱 그만큼 있어요.\n\"ABAB\" (N=4) 에서 K=2 면 4-2+1 = 3 개예요."),
    },
    // 3-5: Step 4 — Print answer + full code
    {
      type: "reveal",
      narr: t(E,
        "The first K with no repeats is the answer — print it and stop.", "다 다른 K 가 나오면 그게 답이니, 출력하고 멈춰요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.carry, marginBottom: 6 }}>
            {t(E, "Step 4: Print and stop!", "4단계: 출력하고 멈춰요!")}
          </div>
          <CodeSnippet
            lines={SOLUTION_CODE}
            highlight={[18, 19, 20]}
            E={E}
          />
          <div style={{
            marginTop: 10, background: C.okBg, borderRadius: 10,
            padding: "8px 12px", border: `1px solid ${C.okBd}`, textAlign: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>
              {t(E, "Complete code! Just 24 lines!", "전체 코드 완성! 딱 24 줄이에요!")}
            </div>
          </div>
        </div>),
    },
  ];
}
