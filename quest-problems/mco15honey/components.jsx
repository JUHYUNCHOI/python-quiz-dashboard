import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ============================================================
   HoneySim — drag the K slider, see which trip-yields the
   squirrel picks. Each hive splits into trip blocks of size M
   (last block = remainder). Sort all blocks descending; the
   top K light up and sum into the live total.
   ============================================================ */
const _SIM_M = 10;
const _SIM_HIVES = [
  { idx: 1, honey: 25, color: "#d97706" },
  { idx: 2, honey: 12, color: "#0891b2" },
  { idx: 3, honey: 8,  color: "#a855f7" },
];

function _splitYields(honey, M) {
  const out = [];
  let h = honey;
  while (h > 0) {
    const take = Math.min(M, h);
    out.push(take);
    h -= take;
  }
  return out;
}

export function HoneySim({ E }) {
  // Build per-hive yield blocks (each tagged with hive info)
  const blocksByHive = _SIM_HIVES.map(h => ({
    ...h,
    yields: _splitYields(h.honey, _SIM_M),
  }));
  // Flatten and sort descending — the picked-set is the top K
  const allBlocks = [];
  blocksByHive.forEach(h => h.yields.forEach((y, j) => {
    allBlocks.push({ hive: h.idx, color: h.color, take: y, isPartial: y < _SIM_M, partOrder: j });
  }));
  const sortedDesc = [...allBlocks]
    .map((b, i) => ({ ...b, _orig: i }))
    .sort((a, b) => b.take - a.take);

  const totalBlocks = allBlocks.length;
  const [K, setK] = useState(4);
  /* 2026-09-17: 아래 설명이 "큰 순서로 세운 뒤 K 개를 고르면 그게 답" 이라고
     **만지기 전에** 결론을 말하고 있었다. mcc20cipher·mcc21carrots 와 같게
     슬라이더를 움직인 뒤에만 열리도록 바꾼다. */
  const [touched, setTouched] = useState(false);
  const pickedKey = new Set(sortedDesc.slice(0, K).map(b => `${b.hive}-${b.partOrder}`));

  const total = sortedDesc.slice(0, K).reduce((s, b) => s + b.take, 0);
  const maxPossible = sortedDesc.reduce((s, b) => s + b.take, 0);
  const isMax = K >= totalBlocks;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🍯 What each trip carries — drag K",
                "🍯 왕복마다 담는 양 — K 를 움직여 봐요")}
        </div>

        {/* Per-hive rows: each hive shows its trip-blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 4px 0" }}>
          {blocksByHive.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 70, fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
                {t(E, `hive ${h.idx}`, `벌집 ${h.idx}`)}
              </div>
              <div style={{ width: 44, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
                {h.honey}ml
              </div>
              <div style={{ display: "flex", gap: 4, flex: 1, flexWrap: "wrap" }}>
                {h.yields.map((y, j) => {
                  const picked = pickedKey.has(`${h.idx}-${j}`);
                  return (
                    <div key={j} style={{
                      minWidth: 36,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: picked ? h.color : `${h.color}22`,
                      border: picked ? `2px solid ${h.color}` : `1px dashed ${h.color}77`,
                      color: picked ? "#fff" : h.color,
                      fontSize: 12, fontWeight: 800,
                      fontFamily: "'JetBrains Mono',monospace",
                      textAlign: "center",
                      transition: "all 0.15s",
                      opacity: picked ? 1 : 0.55,
                    }}>
                      {y}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* K slider */}
        <div style={{ marginTop: 12, padding: "0 4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: C.dim }}>
              {t(E, "trips K", "왕복 K")}
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
              K = {K} / {totalBlocks}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={totalBlocks}
            step={1}
            value={K}
            onChange={e => { setK(Number(e.target.value)); setTouched(true); }}
            style={{ width: "100%", accentColor: A }}
          />
        </div>
      </div>

      {/* Live readout */}
      <div style={{
        background: isMax ? "#fef3c7" : "#f8fafc",
        border: `2px solid ${isMax ? A : C.border}`,
        borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ fontSize: 13, color: C.text }}>
          <b style={{ color: A }}>K = {K}</b>
          {" · "}
          {t(E, "picked: ", "선택: ")}
          {K === 0
            ? <span style={{ color: C.dim }}>{t(E, "none", "없음")}</span>
            : sortedDesc.slice(0, K).map((b, i) => (
                <span key={i} style={{ color: b.color, fontWeight: 700 }}>
                  {b.take}{i < K - 1 ? " + " : ""}
                </span>
              ))
          }
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: isMax ? A : C.text }}>
          {t(E, "total honey: ", "총 꿀: ")}
          <span style={{ fontSize: 18 }}>{total}</span>
          {isMax && (
            <span style={{ marginLeft: 6, fontSize: 11, color: A }}>
              {t(E, "← all yields!", "← 전부!")}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5, whiteSpace: "pre-line", wordBreak: "keep-all" }}>
        {touched
          ? t(E,
              `M=${_SIM_M}. The blocks that light up are always the biggest ones left — which hive they came from never mattered.`,
              `M=${_SIM_M}. 불이 켜지는 조각은 늘 남은 것 중 가장 큰 조각이에요.\n어느 벌집에서 나온 조각인지는 한 번도 따지지 않았어요.`)
          : /* 2026-09-17: 여기가 벌집이 **왜** 쪼개져 있는지를 한 번도 안 말했다.
               "쪼갰어요" 는 한 일이지 이유가 아니다. 이유(한 번에 M 까지만 담긴다)는
               맨 마지막 코드 쪽 why 에나 있었다 — 답을 본 뒤에 이유가 나온 셈이다.
               그리고 앞 쪽이 "왜 38 일까 — 다음 쪽 시뮬에서" 라고 보냈는데
               이 쪽은 그게 같은 벌집이라는 말을 안 했다. 둘 다 여기서 닫는다. */
            t(E,
              `Same hives as the sample: 25 · 12 · 8. One trip carries at most ${_SIM_M}. So hive 1 (25 honey) is really three trips: 10 · 10 · 5. Drag K — which blocks light up first?`,
              `샘플과 같은 벌집 25 · 12 · 8 이에요.\n한 번 다녀오면 ${_SIM_M} 까지만 담을 수 있어요.\n그래서 꿀 25 인 벌집 1 은 10 · 10 · 5 세 번에 나눠 담아요.\nK 를 움직여 봐요 — 어떤 조각부터 불이 켜질까요?`)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, M, K = map(int, input().split())",
  "hives = [int(input()) for _ in range(N)]",
  "",
  "# 한 번 왕복마다 M 과 벌집에 남은 꿀 중 작은 값을 가져와요",
  "# 모든 왕복 결과를 모아 큰 것부터 K개를 더해요",
  "yields = []",
  "for h in hives:",
  "    while h > 0:",
  "        take = min(M, h)",
  "        yields.append(take)",
  "        h -= take",
  "",
  "yields.sort(reverse=True)",
  "print(sum(yields[:K]))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M, K;",
  "    cin >> N >> M >> K;",
  "",
  "    // 벌집에 한 번 갈 때마다 min(M, 남은 꿀) 만큼 가져와요",
  "    // 한 번에 얻을 수 있는 양을 전부 모은 다음, 큰 것부터 K 개를 골라요",
  "    vector<int> yields;",
  "    for (int i = 0; i < N; i++) {",
  "        int h;",
  "        cin >> h;",
  "        while (h > 0) {",
  "            int take = min(M, h);",
  "            yields.push_back(take);",
  "            h -= take;",
  "        }",
  "    }",
  "",
  "    sort(yields.begin(), yields.end(), greater<int>());",
  "",
  "    long long total = 0;",
  "    for (int i = 0; i < (int)yields.size() && i < K; i++) {",
  "        total += yields[i];",
  "    }",
  "",
  "    cout << total << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getHoneySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      /* 2026-09-17: why 가 "코드를 한 부분씩 읽어 봐요" 한 줄이었다.
         섹션이 1 개라 '한 부분씩' 읽을 데가 없었고, 다섯 quest 에 같은 문장이
         그대로 복붙돼 있었다. 파이썬 14 줄은 안 쪼개도 되는 길이라(문턱 15 줄)
         섹션은 하나로 두고, 대신 **왜 이 코드가 답을 내는지**를 적는다. */
      why: [
        t(E, "A trip to a hive carries min(M, what's left). So a hive with 25 and M=10 is really three separate trips: 10, 10, 5.",
            "한 번 다녀오면 min(M, 남은 꿀) 만큼 담아요.\n그래서 꿀 25 짜리 벌집은 사실 10 · 10 · 5 세 번의 왕복이에요."),
        t(E, "Once every hive is cut into trip blocks, the hives stop mattering. K trips = pick K blocks, so pick the K biggest.",
            "모든 벌집을 왕복 조각으로 쪼개고 나면 어느 벌집인지는 이제 상관없어요.\nK 번 다녀온다는 건 조각 K 개를 고른다는 뜻이라, 큰 것부터 K 개를 골라요."),
        t(E, "Sorting puts every full-M block ahead of every leftover block, so a leftover is never taken before the full trips that come before it.",
            "정렬하면 M 을 꽉 채운 조각이 자투리 조각보다 늘 앞에 서요.\n그래서 자투리가 그 앞의 꽉 찬 왕복보다 먼저 뽑히는 일은 없어요."),
      ],
      /* 2026-09-17: 아래 셋이 **화면의 코드와 다른 것**을 가리키고 있었다.
         · py 는 sorted 를 말했는데 코드는 yields.sort(reverse=True) 다.
         · cpp 는 string 헤더를 말했는데 코드가 넣는 건 algorithm 이다.
         · "합계는 2×10^9 을 넘을 수 있어요" 는 지어낸 수다 — 바로 앞 제약 카드가
           "원문 상한을 확인하지 못했어요" 라고 적어 놓고 여기서만 상한을 안다고 말한다. */
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sort) make algorithms concise.",
            "Python 은 list · map · sort 가 있어서 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Include only the headers you've learned, one per line — iostream, vector, algorithm.",
            "#include 는 배운 헤더를 한 줄에 하나씩 적어요 — iostream, vector, algorithm."),
        t(E, "One trip's amount fits in int, but adding them all up can overflow int — so keep total as long long.",
            "한 번에 담는 양은 int 로 돼요.\n하지만 그걸 다 더한 값은 int 가 담는 범위를 넘을 수 있어요.\n그래서 total 만 long long 으로 둬요."),
      ],
    },
  ];
}

export function HoneyProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadHoneyPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Honey — Full Study Guide", "Honey — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

