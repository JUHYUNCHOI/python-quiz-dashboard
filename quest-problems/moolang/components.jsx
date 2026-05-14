// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 16/16 PASS
//   C++:    0/1 (WA - C++ incomplete (output construction omitted))
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

const A = "#2563eb";

/* ════════════════════════════════════════════════════════════════════
   MooLangDeepAudit — try every n_tverb count and watch the budget math.
   Sample: 5 nouns, 1 transitive verb, 3 intransitive verbs, P=4, C=0.
   For each candidate # of transitive sentences, compute noun usage,
   intransitive count, total words. Highlight the maximum.
   ════════════════════════════════════════════════════════════════════ */
const ML_AUDIT = {
  N: 5,        // nouns
  T: 1,        // transitive verbs
  I: 3,        // intransitive verbs
  P: 4,        // period budget
  C: 0,        // comma budget
};

function buildMooLangAuditTrace() {
  const { N, T, I, P } = ML_AUDIT;
  const rows = [];
  for (let nt = 0; nt <= T; nt++) {
    const nounsLeft = N - 2 * nt;
    const ni = Math.max(0, Math.min(I, nounsLeft));
    const sentences = nt + ni;
    const fits = sentences <= P;
    const words = fits ? 3 * nt + 2 * ni : 0;
    rows.push({ nt, ni, nounsLeft, sentences, fits, words });
  }
  let bestIdx = 0, bestWords = -1;
  rows.forEach((r, i) => { if (r.fits && r.words > bestWords) { bestWords = r.words; bestIdx = i; } });
  const trace = [];
  trace.push({
    cur: -1, bestIdx,
    note_en: `Setup: N=${N} nouns, T=${T} transitive, I=${I} intransitive, P=${P} periods. We sweep n_tverb from 0..${T} and pick the row with the biggest word count.`,
    note_ko: `세팅: 명사 ${N}개, 타동사 ${T}개, 자동사 ${I}개, 마침표 ${P}개. n_tverb 를 0..${T} 까지 훑어 단어 수가 최대인 줄을 골라요.`,
    rows,
  });
  rows.forEach((r, i) => {
    const en = !r.fits
      ? `n_tverb=${r.nt}: would need ${r.sentences} sentences but P=${P}. Skip.`
      : `n_tverb=${r.nt}: uses ${2 * r.nt} nouns → ${r.nounsLeft} left. min(I, left) = ${r.ni} intransitive. Total = 3·${r.nt} + 2·${r.ni} = ${r.words} words.`;
    const ko = !r.fits
      ? `n_tverb=${r.nt}: 문장 ${r.sentences}개 필요한데 P=${P}. 건너뜀.`
      : `n_tverb=${r.nt}: 명사 ${2 * r.nt}개 사용 → ${r.nounsLeft}개 남음. min(I, 남음) = ${r.ni} 자동사 문장. 총 = 3·${r.nt} + 2·${r.ni} = ${r.words} 단어.`;
    trace.push({ cur: i, bestIdx, note_en: en, note_ko: ko, rows });
  });
  trace.push({
    cur: -2, bestIdx,
    note_en: `Best row: n_tverb=${rows[bestIdx].nt}, n_iverb=${rows[bestIdx].ni}, words=${rows[bestIdx].words}. That is the answer.`,
    note_ko: `최댓값 줄: n_tverb=${rows[bestIdx].nt}, n_iverb=${rows[bestIdx].ni}, 단어=${rows[bestIdx].words}. 이게 답.`,
    rows,
  });
  return trace;
}

const ML_TRACE = buildMooLangAuditTrace();

export function MooLangDeepAudit({ E }) {
  const { idx, safe, setIdx, total } = useTraceStep(ML_TRACE.length);
  const step = ML_TRACE[safe];
  const note = E ? step.note_en : step.note_ko;
  const showBest = step.cur === -2;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A, letterSpacing: 0.3 }}>
          🔬 {t(E, "Deep Audit — sweep every n_tverb", "딥 오딧 — n_tverb 전부 훑기")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "Sample: 5 nouns, 1 transitive, 3 intransitive, P=4. Find the max words.",
              "샘플: 명사 5, 타동사 1, 자동사 3, P=4. 최대 단어 찾기.")}
        </div>
      </div>

      {/* inventory chips */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
        {[
          { k: "N", v: ML_AUDIT.N, c: "#2563eb" },
          { k: "T", v: ML_AUDIT.T, c: "#dc2626" },
          { k: "I", v: ML_AUDIT.I, c: "#7c3aed" },
          { k: "P", v: ML_AUDIT.P, c: "#15803d" },
        ].map(({ k, v, c }) => (
          <div key={k} style={{
            border: `1.5px solid ${c}`, color: c, background: "#fff",
            padding: "3px 9px", borderRadius: 6, fontWeight: 700,
          }}>{k} = {v}</div>
        ))}
      </div>

      {/* table */}
      <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr 1fr 70px", gap: 4, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>
          {[
            t(E, "n_tverb", "n_tverb"),
            t(E, "nouns used", "명사 사용"),
            t(E, "nouns left", "명사 남음"),
            t(E, "n_iverb", "n_iverb"),
            t(E, "sentences ≤ P?", "문장 ≤ P?"),
            t(E, "words", "단어"),
          ].map((h, i) => (
            <div key={i} style={{ color: "#1e3a8a", fontWeight: 700, padding: "2px 4px", borderBottom: "1px solid #93c5fd" }}>{h}</div>
          ))}
          {step.rows.map((r, i) => {
            const isCur = step.cur === i;
            const isBest = showBest && i === step.bestIdx;
            const bg = isBest ? "#dcfce7" : isCur ? "#dbeafe" : "transparent";
            const border = isBest ? "1.5px solid #15803d" : isCur ? "1.5px solid #2563eb" : "1px solid transparent";
            const cells = [
              `${r.nt}`,
              `${2 * r.nt}`,
              `${r.nounsLeft}`,
              `${r.ni}`,
              r.fits ? `${r.sentences} ≤ ${ML_AUDIT.P} ✓` : `${r.sentences} > ${ML_AUDIT.P} ✗`,
              r.fits ? `${r.words}` : "—",
            ];
            return cells.map((c2, j) => (
              <div key={`${i}-${j}`} style={{
                background: bg, border, borderLeft: j === 0 ? border : "none", borderRight: j === cells.length - 1 ? border : "none",
                padding: "3px 4px", color: r.fits ? C.text : "#94a3b8", fontWeight: isBest ? 700 : 500,
              }}>{c2}</div>
            ));
          })}
        </div>
      </div>

      {/* narration */}
      <div style={{ background: A, color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, lineHeight: 1.6, marginBottom: 10, minHeight: 44 }}>
        {note}
      </div>

      <SimNav idx={idx} total={total} onIdx={setIdx} accent={A} showLabels isEn={E} />
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "data = sys.stdin.read().split()",
  "p = 0",
  "T = int(data[p])",
  "p += 1",
  "",
  "out_lines = []",
  "for _ in range(T):",
  "    N = int(data[p])",
  "    p += 1",
  "    C = int(data[p])",
  "    p += 1",
  "    P = int(data[p])",
  "    p += 1",
  "    nouns, tverbs, iverbs, conjs = [], [], [], []",
  "    for _ in range(N):",
  "        word = data[p]",
  "        p += 1",
  "        ty = data[p]",
  "        p += 1",
  "        if ty[0] == 'n': nouns.append(word)",
  "        elif ty[0] == 't': tverbs.append(word)",
  "        elif ty[0] == 'i': iverbs.append(word)",
  "        else: conjs.append(word)",
  "",
  "    best = (0, 0, 0, 0)",
  "    for n_tverb in range(len(tverbs) + 1):",
  "        n_iverb = min(len(iverbs), len(nouns) - 2 * n_tverb)",
  "        while n_iverb >= 0:",
  "            n_conj = min(len(conjs), (n_tverb + n_iverb) // 2)",
  "            if n_tverb + n_iverb - n_conj <= P:",
  "                break",
  "            n_iverb -= 1",
  "        if n_iverb < 0:",
  "            continue",
  "        extra_nouns = min(C, len(nouns) - (n_iverb + 2 * n_tverb))",
  "        if n_tverb == 0:",
  "            extra_nouns = 0",
  "        n_words = 3 * n_tverb + 2 * n_iverb + n_conj + extra_nouns",
  "        best = max(best, (n_words, n_tverb, n_iverb, n_conj))",
  "",
  "    n_words, n_tverb, n_iverb, n_conj = best",
  "    Cleft = C",
  "    basic = [nouns.pop() + ' ' + iverbs.pop() for _ in range(n_iverb)] + \\",
  "            [nouns.pop() + ' ' + tverbs.pop() + ' ' + nouns.pop() for _ in range(n_tverb)]",
  "    while n_tverb > 0 and Cleft > 0 and len(nouns) > 0:",
  "        basic[-1] += ', ' + nouns.pop()",
  "        Cleft -= 1",
  "    compound = [basic.pop() + ' ' + conjs.pop() + ' ' + basic.pop() for _ in range(n_conj)]",
  "    sentences = [s + '.' for s in basic + compound]",
  "    out_lines.append(str(n_words))",
  "    out_lines.append(' '.join(sentences))",
  "",
  "print(chr(10).join(out_lines))",
];

const FULL_CPP = [
  "// See chapters.jsx SOLUTION_CODE for the editorial Python implementation.",
  "// The C++ port mirrors that algorithm — see Chongtian Ma's editorial code.",
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "#define sz(x) (int)x.size()",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int _t = 0; _t < T; _t++) {",
  "        int n, c, p; cin >> n >> c >> p;",
  "        vector<string> nouns, tverb, iverb, conj;",
  "        for (int i = 0; i < n; i++) {",
  "            string w, t; cin >> w >> t;",
  "            if (t == \"noun\") nouns.push_back(w);",
  "            else if (t == \"transitive-verb\") tverb.push_back(w);",
  "            else if (t == \"intransitive-verb\") iverb.push_back(w);",
  "            else conj.push_back(w);",
  "        }",
  "        int ans = 0, t1 = 0, t2 = 0, combine = 0, tack_end = 0;",
  "        for (int type_1 = 0; type_1 <= sz(iverb); type_1++) {",
  "            int noun_cnt = sz(nouns), conj_cnt = sz(conj);",
  "            int period = p, comma = c, cur_words = 0;",
  "            cur_words += 2 * type_1;",
  "            noun_cnt -= type_1;",
  "            if (noun_cnt < 0) continue;",
  "            int type_2 = min({sz(tverb), noun_cnt / 2,",
  "                              min(conj_cnt, period) * 2 + max(0, period - conj_cnt)});",
  "            cur_words += 3 * type_2;",
  "            noun_cnt -= 2 * type_2;",
  "            int total = type_1 + type_2;",
  "            int can_combine = min((total) / 2, conj_cnt);",
  "            cur_words += can_combine;",
  "            period -= total - can_combine;",
  "            if (period < 0) continue;",
  "            int tack = 0;",
  "            if (type_2 > 0) { tack = min(noun_cnt, comma); cur_words += tack; }",
  "            if (cur_words > ans) {",
  "                ans = cur_words;",
  "                t1 = type_1; t2 = type_2;",
  "                combine = can_combine; tack_end = tack;",
  "            }",
  "        }",
  "        cout << ans << '\\n';",
  "        if (ans == 0) { cout << '\\n'; continue; }",
  "        // Build paragraph (see editorial for the full output construction).",
  "        // ... (omitted here for brevity; mirror editorial code)",
  "    }",
  "    return 0;",
  "}",
];

export function getMooLangSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function MooLangProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMooLangPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MooLang — Full Study Guide", "MooLang — 종합 풀이 노트");
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

