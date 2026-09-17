import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";
const KA = { wordBreak: "keep-all" };

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def main():",
  "    T = int(input())",
  "    out = []",
  "    for _ in range(T):",
  "        n = int(input())",
  "        a = input().rstrip()",
  "        b = input().rstrip()",
  "        need_T = 0",
  "        have_T = 0",
  "        for i in range(n):",
  "            if a[i] == 'T':",
  "                have_T += 1",
  "                req = b[i]",
  "            else:",
  "                if b[i] == 'T':",
  "                    req = 'F'",
  "                else:",
  "                    req = 'T'",
  "            if req == 'T':",
  "                need_T += 1",
  "        if need_T == have_T:",
  "            out.append('YES')",
  "        else:",
  "            out.append('NO')",
  "    print('\\n'.join(out))",
  "main()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int n;",
  "        string a, b;",
  "        cin >> n >> a >> b;",
  "",
  "        // 각 주장을 필요한 타입으로 바꿔요",
  "        // 필요한 T 와 있는 T 를 비교해요",
  "        int need_T = 0;",
  "        int have_T = 0;",
  "        for (int i = 0; i < n; i++) {",
  "            char req;",
  "            if (a[i] == 'T') {   // 진실쟁이는 그대로",
  "                have_T++;",
  "                req = b[i];",
  "            } else {             // 거짓말쟁이는 뒤집어요",
  "                if (b[i] == 'T') {",
  "                    req = 'F';",
  "                } else {",
  "                    req = 'T';",
  "                }",
  "            }",
  "            if (req == 'T') {",
  "                need_T++;",
  "            }",
  "        }",
  "        if (need_T == have_T) {",
  "            cout << \"YES\" << \"\\n\";",
  "        } else {",
  "            cout << \"NO\" << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션 한 개에 30 줄을 통째로 펼치고 있었다 — 읽기 · 참/거짓 풀기 ·
   세기 · 비교/출력이 한 덩어리였다. 네 단계로 나눈다.
   ⚠️ 코드 **내용**은 한 글자도 안 바꾼다. 그래서 새로 적지 않고 slice 로 자른다. */
const PY_READ    = FULL_PY.slice(0, 10);
const PY_DECODE  = FULL_PY.slice(10, 23);
const PY_VERDICT = FULL_PY.slice(23, 27);
const PY_OUT     = FULL_PY.slice(27);

const CPP_READ    = FULL_CPP.slice(0, 12);
const CPP_DECODE  = FULL_CPP.slice(12, 32);
const CPP_VERDICT = FULL_CPP.slice(32, 37);
const CPP_OUT     = FULL_CPP.slice(37);

export function getMcc22AliensSections(E) {
  return [
    {
      label: t(E, "📥 1. Read each test's three lines", "📥 1. 테스트마다 세 줄 읽기"),
      color: A,
      py: PY_READ, cpp: CPP_READ,
      why: [
        t(E, "T tests arrive one after another. Each one is three lines: n, the real types a, and the claims b.",
            "테스트가 T 개 줄줄이 들어와요.\n하나가 세 줄이에요. n, 진짜 타입 a, 주장 b 예요."),
        t(E, "a and b line up by position: a[i] is alien i's own type, b[i] is what alien i said about whoever they pointed at.",
            "a 와 b 는 자리끼리 짝이에요.\na[i] 는 i 번 자신의 타입이고,\nb[i] 는 i 번이 지목한 상대에게 붙인 타입이에요."),
      ],
      pyOnly: [
        t(E, "rstrip() drops the newline that readline leaves at the end of each string.",
            "readline 은 줄 끝의 줄바꿈까지 같이 줘요.\nrstrip() 으로 그 줄바꿈을 떼어 내요."),
      ],
      cppOnly: [
        t(E, "cin >> n >> a >> b reads the count and two strings; while (T--) repeats for every test case.",
            "cin >> n >> a >> b 로 개수와 두 문자열을 읽고, while (T--) 로 매 테스트를 반복해요."),
      ],
    },
    {
      label: t(E, "🔀 2. Decode each claim, count the T's", "🔀 2. 각 말을 '필요한 타입' 으로 바꾸고 세기"),
      color: A,
      py: PY_DECODE, cpp: CPP_DECODE,
      why: [
        t(E, "Never search the n! permutations. Each sentence only pins down ONE thing: the type its target must have.",
            "n! 가지 지목 순서를 뒤질 필요가 없어요.\n말 하나가 정해 주는 건 딱 하나예요 —\n지목당한 쪽에게 필요한 타입이에요."),
        t(E, "A truth-teller (a[i]=='T') means b[i] as-is; a liar says the opposite, so flip b[i]. Either way req is the demanded type.",
            "진실쟁이(a[i]=='T')가 말하면 b[i] 그대로예요.\n거짓말쟁이가 말하면 반대니까 b[i] 를 뒤집어요.\n어느 쪽이든 req 가 '필요한 타입' 이에요."),
        t(E, "Two counters ride along in the same pass: need_T (how many T's the sentences demand) and have_T (how many real T's exist).",
            "같은 한 바퀴에서 세는 것이 둘이에요.\nneed_T 는 말들이 필요로 하는 T 의 개수,\nhave_T 는 진짜로 있는 T 의 개수예요."),
        t(E, "Demanded F's need no counter: everyone who isn't demanded as T is demanded as F.",
            "F 가 필요한 말은 따로 안 세도 돼요.\nT 가 아닌 나머지가 곧 F 니까요."),
      ],
      cppOnly: [
        t(E, "req is a single char — the type this claim demands after decoding the speaker's honesty.",
            "req 는 글자 하나예요.\n말한 사람이 진실쟁이인지 따져 본 뒤에\n이 말이 필요로 하는 타입을 담아요."),
      ],
    },
    {
      label: t(E, "⚖️ 3. Compare what exists with what is needed", "⚖️ 3. 있는 T 와 필요한 T 를 견주기"),
      color: A,
      py: PY_VERDICT, cpp: CPP_VERDICT,
      why: [
        t(E, "Everyone is pointed at exactly once, so the demanded types have to be handed out to the real aliens one for one.",
            "모두가 정확히 한 번씩 지목돼요.\n그러니 필요한 타입을 진짜 외계인들에게\n하나씩 짝지어 나눠 줄 수 있어야 해요."),
        t(E, "That is possible exactly when the two counts match: need_T == have_T → YES, otherwise NO. One O(n) pass, no permutations.",
            "그게 되는 건 두 개수가 딱 맞을 때뿐이에요.\nneed_T == have_T 면 YES, 아니면 NO 예요.\n문자열을 O(n) 으로 한 번 훑을 뿐, 순서는 만들지 않아요."),
      ],
    },
    {
      label: t(E, "🖨️ 4. Send the answers out", "🖨️ 4. 답 내보내기"),
      color: A,
      py: PY_OUT, cpp: CPP_OUT,
      why: [
        t(E, "One line per test, in the order the tests came in.",
            "테스트 하나에 한 줄씩,\n들어온 순서 그대로 내보내요."),
      ],
      pyOnly: [
        t(E, "Answers were collected in the list `out` and printed once at the end — printing inside the loop is slower.",
            "답을 out 리스트에 모아 두었다가 끝에 한 번에 출력해요.\n반복문 안에서 매번 출력하면 더 느려요."),
        t(E, "The code lives inside def main(), so the last line calls main() to start it.",
            "코드가 def main() 안에 들어 있어요.\n그래서 맨 끝에서 main() 을 불러 시작해요."),
      ],
      cppOnly: [
        t(E, "C++ printed each verdict right away, so here the loop just closes and the program ends.",
            "C++ 은 판정이 날 때마다 바로 출력했어요.\n그래서 여기서는 반복문을 닫고 프로그램이 끝나요."),
      ],
    },
  ];
}

export function Mcc22AliensProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


/* ═══════════════════════════════════════════════════════════════
   AliensCountSim — the supply-vs-demand counting argument.
   Fixed real types a = T F T F. The student toggles each claim
   b[i]; the sim decodes it to the type it DEMANDS (truth-teller
   keeps it, liar flips it), counts demanded-T vs real-T, and the
   verdict banner turns green (YES) when the two counts match, red
   (NO) otherwise. Self-contained, no autoplay.
   ═══════════════════════════════════════════════════════════════ */
const SIM_A = ["T", "F", "T", "F"];   // fixed real types

export function AliensCountSim({ E }) {
  const [b, setB] = useState(["F", "T", "T", "F"]);   // sample 1 claims → YES
  /* 2026-09-17: 누르기 **전에** 규칙과 결론이 다 적혀 있었다 — 맨 위 설명이
     "진실쟁이는 그대로, 거짓말쟁이는 반대, 수가 같으면 YES" 를 통째로 말했고
     맨 아래 요약이 한 번 더 말했다. 주장을 한 번이라도 누르면 그때 드러낸다.
     mcc21carrots 가 같은 자리를 이렇게 고쳤다. */
  const [touched, setTouched] = useState(false);

  const n = SIM_A.length;
  // decode claim b[i] to the type it demands
  const req = SIM_A.map((ai, i) => (ai === "T" ? b[i] : (b[i] === "T" ? "F" : "T")));
  const haveT = SIM_A.filter((x) => x === "T").length;      // supply (fixed = 2)
  const needT = req.filter((x) => x === "T").length;        // demand
  const ok = needT === haveT;

  const toggle = (i) => {
    setTouched(true);
    setB((prev) => prev.map((v, j) => (j === i ? (v === "T" ? "F" : "T") : v)));
  };

  const chip = (typ, opts = {}) => {
    const isT = typ === "T";
    const faded = opts.faded;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 30, height: 30, borderRadius: 8,
        background: faded ? "#f1f5f9" : (isT ? "#dcfce7" : "#fee2e2"),
        border: `1.5px solid ${faded ? "#cbd5e1" : (isT ? "#16a34a" : "#dc2626")}`,
        color: faded ? "#94a3b8" : (isT ? "#15803d" : "#991b1b"),
        fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
      }}>{typ}</span>
    );
  };

  const rowLabel = (txt) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, minWidth: 96, textAlign: "right", paddingRight: 8, ...KA }}>{txt}</div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
          🧮 {t(E, "How many T's exist, how many T's are needed", "T 가 몇 개 있고, 몇 개 필요한가")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 14, whiteSpace: "pre-line" }}>
          {touched
            ? t(E,
                "A truth-teller (T) needs the claim as-is. A liar (F) needs the opposite. When the needed T's and the real T's come out the same, the answer is YES.",
                "진실쟁이(T)가 말하면 그 말 그대로가 필요해요.\n거짓말쟁이(F)가 말하면 반대가 필요해요.\n필요한 T 가 있는 T 와 같은 수가 되면 YES 예요.")
            : t(E,
                "Can these four aliens' sentences all hold together? Tap a claim to flip it and watch when the verdict changes.",
                "이 네 외계인의 말이 모두 앞뒤 맞을 수 있을까요?\n주장을 하나씩 눌러 뒤집으면서\n판정이 언제 바뀌는지 봐요.")}
        </div>

        {/* index header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel("")}
          <div style={{ display: "flex", gap: 10 }}>
            {SIM_A.map((_, i) => (
              <div key={i} style={{ width: 30, textAlign: "center", fontSize: 10, color: C.dim, fontWeight: 700 }}>i={i}</div>
            ))}
          </div>
        </div>

        {/* real types a */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel(t(E, "type a[i]", "타입 a[i]"))}
          <div style={{ display: "flex", gap: 10 }}>
            {SIM_A.map((ai, i) => <div key={i}>{chip(ai)}</div>)}
          </div>
        </div>

        {/* claims b (clickable) */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          {rowLabel(t(E, "claim b[i]  ↺", "주장 b[i]  ↺"))}
          <div style={{ display: "flex", gap: 10 }}>
            {b.map((bi, i) => (
              <button key={i} onClick={() => toggle(i)} title={t(E, "flip", "뒤집기")} style={{
                width: 30, height: 30, borderRadius: 8, cursor: "pointer", padding: 0,
                background: bi === "T" ? "#dcfce7" : "#fee2e2",
                border: `2px solid ${bi === "T" ? "#16a34a" : "#dc2626"}`,
                color: bi === "T" ? "#15803d" : "#991b1b",
                fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
              }}>{bi}</button>
            ))}
          </div>
        </div>

        {/* decoded demand req */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4, paddingTop: 6, borderTop: "1px dashed #93c5fd" }}>
          {rowLabel(t(E, "needed type →", "필요한 타입 →"))}
          <div style={{ display: "flex", gap: 10 }}>
            {req.map((r, i) => <div key={i}>{chip(r)}</div>)}
          </div>
        </div>
        {/* 2026-09-17: 이 한 줄이 곧 규칙이다. 누르기 전에 읽히면 시뮬이 할 일이 없다. */}
        <div style={{ fontSize: 10.5, color: C.dim, marginBottom: 12, ...KA, paddingLeft: 104 }}>
          {touched
            ? t(E, "a[i]=T keeps b[i]; a[i]=F flips it", "a[i]=T 면 b[i] 그대로, a[i]=F 면 뒤집어요")
            : t(E, "what does this row follow?", "이 줄은 무엇을 따라 바뀔까요?")}
        </div>

        {/* counts */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 120, background: "#fff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 2, ...KA }}>{t(E, "T's that exist — the a[i] row", "있는 T — a[i] 줄")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>{haveT}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 800, color: ok ? "#15803d" : "#991b1b" }}>{ok ? "=" : "≠"}</div>
          <div style={{ flex: 1, minWidth: 120, background: "#fff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 2, ...KA }}>{t(E, "T's needed — the needed-type row", "필요한 T — 필요한 타입 줄")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>{needT}</div>
          </div>
        </div>

        {/* verdict */}
        <div style={{
          textAlign: "center", borderRadius: 10, padding: "10px 14px", fontWeight: 800, fontSize: 16,
          background: ok ? "#dcfce7" : "#fee2e2",
          border: `2px solid ${ok ? "#16a34a" : "#dc2626"}`,
          color: ok ? "#15803d" : "#991b1b",
        }}>
          {ok
            ? t(E, "✅ needed T = existing T → YES", "✅ 필요한 T = 있는 T → YES")
            : t(E, "❌ needed T ≠ existing T → NO", "❌ 필요한 T ≠ 있는 T → NO")}
        </div>

        {/* 2026-09-17: 이 요약도 누른 뒤에만 나온다. + 빠져 있던 전제(모두 한 번씩
            지목된다)를 여기서 말한다 — 이게 없으면 "왜 개수만 맞으면 되나" 가 뜬다. */}
        {touched && (
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.6, ...KA, whiteSpace: "pre-line" }}>
          {t(E,
            "Every alien is pointed at exactly once, so the needed types get handed out one per alien. That works out exactly when the needed T's match the T's that exist — so no ordering ever has to be tried.",
            "모든 외계인은 정확히 한 번씩 지목돼요.\n그래서 필요한 타입이 외계인 한 명당 하나씩 돌아가요.\n그게 되는 건 필요한 T 가 있는 T 와 같은 수일 때예요.\n그러니 지목 순서는 하나도 만들어 볼 필요가 없어요.")}
        </div>
        )}
      </div>
    </div>
  );
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


export function downloadMcc22AliensPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Aliens — Full Study Guide", "Mcc22Aliens — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
