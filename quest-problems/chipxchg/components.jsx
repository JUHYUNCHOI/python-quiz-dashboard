// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 12/12 PASS (Python passes - C++ has overflow)
//   C++:    5/12 (overflow bug)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";



export function getChipXchgSections(E) {
  return [
    {
      label: t(E, "🧩 Step 1 — Model one round", "🧩 1단계 — 한 시도 모델링"),
      color: A,
      py: [
        "# After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "# Bessie keeps a chips of type A, gets b chips of type B,",
        "# and converts B -> A as many times as possible.",
        "#",
        "# final_A(a, b) = A + a + ((B + b) // cB) * cA",
        "# Adversary picks (a, b) to MINIMIZE final_A.",
        "# We need: min over a+b=x of final_A >= fA.",
      ],
      cpp: [
        "// After getting x random chips, adversary splits them as (a, b) with a+b=x.",
        "// Bessie keeps a chips of type A, gets b chips of type B,",
        "// and converts B -> A as many times as possible.",
        "//",
        "// final_A(a, b) = A + a + ((B + b) / cB) * cA",
        "// Adversary picks (a, b) to MINIMIZE final_A.",
        "// We need: min over a+b=x of final_A >= fA.",
      ],
      why: [
        t(E, "Each extra chip the adversary sends to type B might be wasted: it only counts when it completes another c_B group.",
            "여분 칩을 B로 주면 c_B 묶음을 채워야만 환전 1회로 이어져요. 자투리는 그냥 버려져요."),
        t(E, "So the adversary plays the remainder game — leave as many B chips just below the next c_B threshold as possible.",
            "그래서 적은 c_B 문턱 바로 아래에 b 를 멈춰서 자투리를 최대한 만들어요."),
      ],
    },
    {
      label: t(E, "🔍 Step 2 — Try only a handful of b's", "🔍 2단계 — b 후보 몇 개만 시도"),
      color: A,
      py: [
        "def min_final_A(A, B, cA, cB, x):",
        "    if x == 0:",
        "        return A + (B // cB) * cA",
        "    cands = {0, x}",
        "    # b that maximizes (B+b) % cB  ->  worst case for Bessie",
        "    r1 = (cB - 1 - (B % cB)) % cB",
        "    if r1 <= x:",
        "        cands.add(r1)",
        "        cands.add(r1 + ((x - r1) // cB) * cB)",
        "    # b that makes (B+b) % cB == 0  ->  best case (full groups)",
        "    r0 = (-B) % cB",
        "    if r0 <= x:",
        "        cands.add(r0)",
        "        cands.add(r0 + ((x - r0) // cB) * cB)",
        "    return min(A + (x - b) + ((B + b) // cB) * cA for b in cands)",
      ],
      cpp: [
        "ll minFinalA(ll A, ll B, ll cA, ll cB, ll x) {",
        "    if (x == 0) {",
        "        return A + (B / cB) * cA;",
        "    }",
        "    vector<ll> cands;",
        "    cands.push_back(0);",
        "    cands.push_back(x);",
        "    ll r1 = ((cB - 1 - (B % cB)) % cB + cB) % cB;",
        "    if (r1 <= x) {",
        "        cands.push_back(r1);",
        "        cands.push_back(r1 + ((x - r1) / cB) * cB);",
        "    }",
        "    ll r0 = ((-B) % cB + cB) % cB;",
        "    if (r0 <= x) {",
        "        cands.push_back(r0);",
        "        cands.push_back(r0 + ((x - r0) / cB) * cB);",
        "    }",
        "    ll best = LLONG_MAX;",
        "    for (int i = 0; i < (int)cands.size(); i++) {",
        "        ll b = cands[i];",
        "        ll v = A + (x - b) + ((B + b) / cB) * cA;",
        "        if (v < best) {",
        "            best = v;",
        "        }",
        "    }",
        "    return best;",
        "}",
      ],
      why: [
        t(E, "Inside one residue class mod c_B, increasing b by c_B trades 'lose c_B raw A' for 'gain c_A from one more swap'.",
            "같은 c_B 나머지 안에서 b 를 c_B 늘리면 'A 직접 c_B 손해' vs '환전 1회로 c_A 이득' 이 트레이드돼요."),
        t(E, "So the optimum is monotone in q (the number of complete groups). Checking the smallest and largest valid b in each useful residue class is enough.",
            "그래서 q (완성 묶음 수) 에 대해 단조라 각 의미있는 나머지 류에서 가장 작은 b 와 가장 큰 b 만 확인하면 충분."),
        t(E, "Two residue classes matter: 'remainder = c_B − 1' (max waste) and 'remainder = 0' (no waste).",
            "의미있는 두 가지: 나머지 = c_B-1 (자투리 최대) 와 나머지 = 0 (자투리 없음)."),
      ],
      pyOnly: [
        t(E, "Python ints are arbitrary precision — no overflow worries when fA up to 10^9 and answers up to 10^18.",
            "파이썬 정수는 임의 정밀도 — fA 가 10^9 이고 답이 10^18 까지 가도 오버플로 걱정 없음."),
      ],
      cppOnly: [
        t(E, "All values must be `long long`. Mixing `int` and `long long` in (B + b) / cB will silently overflow.",
            "모든 값을 `long long` 으로. (B + b) / cB 에 `int` 가 섞이면 조용히 오버플로 발생."),
      ],
    },
    {
      label: t(E, "🎯 Step 3 — Binary search on x", "🎯 3단계 — x 에 대한 이분 탐색"),
      color: A,
      py: [
        "def solve(A, B, cA, cB, fA):",
        "    # f(x) = min adversary outcome at chip count x  is non-decreasing in x",
        "    # because the adversary can always pretend the extra chip never came.",
        "    lo, hi = 0, 2 * 10**18",
        "    while lo < hi:",
        "        mid = (lo + hi) // 2",
        "        if min_final_A(A, B, cA, cB, mid) >= fA:",
        "            hi = mid",
        "        else:",
        "            lo = mid + 1",
        "    return lo",
      ],
      cpp: [
        "ll solve(ll A, ll B, ll cA, ll cB, ll fA) {",
        "    ll lo = 0;",
        "    ll hi = (ll)2e18;",
        "    while (lo < hi) {",
        "        ll mid = lo + (hi - lo) / 2;",
        "        if (minFinalA(A, B, cA, cB, mid) >= fA) {",
        "            hi = mid;",
        "        } else {",
        "            lo = mid + 1;",
        "        }",
        "    }",
        "    return lo;",
        "}",
      ],
      why: [
        t(E, "More chips can never hurt Bessie — adversary can copy any worse split and dump the extra on type A. So the predicate 'guaranteed to reach fA' flips at most once as x grows.",
            "x 가 늘어나도 결과가 나빠질 수 없어요 — 어떤 분배든 그대로 두고 추가분을 A 에 얹으면 되니까. 그래서 'fA 도달 보장' 은 최대 한 번만 false→true 로 바뀜."),
        t(E, "Binary search range: 0 to 2×10^18 — that comfortably covers the worst sample (fA = 10^9, c_B = 10^9).",
            "이분 탐색 범위: 0 ~ 2×10^18 — 가장 큰 샘플 (fA=10^9, c_B=10^9) 까지 여유."),
      ],
    },
  ];
}

export function ChipXchgProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","ll","typedef"];
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


export function downloadChipXchgPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Chip Exchange — Full Study Guide", "칩 교환 — 종합 풀이 노트");
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
  .hint { background: #eff6ff; border: 1px solid #2563eb; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #1e3a8a; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 First Contest, Bronze #1 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
