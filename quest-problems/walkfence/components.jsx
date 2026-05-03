import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#16a34a";

/* Section 1: read posts */
const WF_INPUT_PY = [
  "N, P = map(int, input().split())",
  "posts = []",
  "for _ in range(P):",
  "    x, y = map(int, input().split())",
  "    posts.append((x, y))",
];
const WF_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, P;",
  "    cin >> N >> P;",
  "    vector<long long> X(P), Y(P);",
  "    for (int i = 0; i < P; i++) cin >> X[i] >> Y[i];",
];

/* Section 2: cumulative perimeter distances */
const WF_CUM_PY = [
  "perimeter = 0",
  "cum = [0]   # cum[i] = total distance walked from post 0 to post i (along the boundary)",
  "for i in range(P):",
  "    j = (i + 1) % P",
  "    d = abs(posts[j][0] - posts[i][0]) + abs(posts[j][1] - posts[i][1])",
  "    perimeter += d",
  "    cum.append(perimeter)",
];
const WF_CUM_CPP = [
  "    long long perimeter = 0;",
  "    vector<long long> cum(P + 1, 0);",
  "    for (int i = 0; i < P; i++) {",
  "        int j = (i + 1) % P;",
  "        long long d = llabs(X[j] - X[i]) + llabs(Y[j] - Y[i]);",
  "        perimeter += d;",
  "        cum[i + 1] = perimeter;",
  "    }",
];

/* Section 3: helper find_pos + per-cow loop */
const WF_QUERY_PY = [
  "def find_pos(x, y):",
  "    # Distance along the boundary from post 0 to point (x, y)",
  "    for i in range(P):",
  "        j = (i + 1) % P",
  "        px, py = posts[i]",
  "        qx, qy = posts[j]",
  "        if px == qx == x and min(py, qy) <= y <= max(py, qy):",
  "            return cum[i] + abs(y - py)",
  "        if py == qy == y and min(px, qx) <= x <= max(px, qx):",
  "            return cum[i] + abs(x - px)",
  "    return -1",
  "",
  "for _ in range(N):",
  "    x1, y1, x2, y2 = map(int, input().split())",
  "    d1 = find_pos(x1, y1)",
  "    d2 = find_pos(x2, y2)",
  "    diff = abs(d1 - d2)",
  "    print(min(diff, perimeter - diff))",
];
const WF_QUERY_CPP = [
  "    auto find_pos = [&](long long x, long long y) -> long long {",
  "        for (int i = 0; i < P; i++) {",
  "            int j = (i + 1) % P;",
  "            long long px = X[i], py = Y[i], qx = X[j], qy = Y[j];",
  "            if (px == qx && qx == x && min(py, qy) <= y && y <= max(py, qy))",
  "                return cum[i] + llabs(y - py);",
  "            if (py == qy && qy == y && min(px, qx) <= x && x <= max(px, qx))",
  "                return cum[i] + llabs(x - px);",
  "        }",
  "        return -1;",
  "    };",
  "",
  "    while (N--) {",
  "        long long x1, y1, x2, y2;",
  "        cin >> x1 >> y1 >> x2 >> y2;",
  "        long long d1 = find_pos(x1, y1);",
  "        long long d2 = find_pos(x2, y2);",
  "        long long diff = llabs(d1 - d2);",
  "        cout << min(diff, perimeter - diff) << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const WF_FULL_PY = [
  "N, P = map(int, input().split())",
  "posts = [tuple(map(int, input().split())) for _ in range(P)]",
  "",
  "perimeter = 0",
  "cum = [0]",
  "for i in range(P):",
  "    j = (i + 1) % P",
  "    d = abs(posts[j][0] - posts[i][0]) + abs(posts[j][1] - posts[i][1])",
  "    perimeter += d",
  "    cum.append(perimeter)",
  "",
  "def find_pos(x, y):",
  "    for i in range(P):",
  "        j = (i + 1) % P",
  "        px, py = posts[i]; qx, qy = posts[j]",
  "        if px == qx == x and min(py, qy) <= y <= max(py, qy):",
  "            return cum[i] + abs(y - py)",
  "        if py == qy == y and min(px, qx) <= x <= max(px, qx):",
  "            return cum[i] + abs(x - px)",
  "    return -1",
  "",
  "for _ in range(N):",
  "    x1, y1, x2, y2 = map(int, input().split())",
  "    d1 = find_pos(x1, y1); d2 = find_pos(x2, y2)",
  "    diff = abs(d1 - d2)",
  "    print(min(diff, perimeter - diff))",
];
const WF_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, P; cin >> N >> P;",
  "    vector<long long> X(P), Y(P);",
  "    for (int i = 0; i < P; i++) cin >> X[i] >> Y[i];",
  "",
  "    long long perimeter = 0;",
  "    vector<long long> cum(P + 1, 0);",
  "    for (int i = 0; i < P; i++) {",
  "        int j = (i + 1) % P;",
  "        long long d = llabs(X[j] - X[i]) + llabs(Y[j] - Y[i]);",
  "        perimeter += d;",
  "        cum[i + 1] = perimeter;",
  "    }",
  "",
  "    auto find_pos = [&](long long x, long long y) -> long long {",
  "        for (int i = 0; i < P; i++) {",
  "            int j = (i + 1) % P;",
  "            long long px = X[i], py = Y[i], qx = X[j], qy = Y[j];",
  "            if (px == qx && qx == x && min(py, qy) <= y && y <= max(py, qy))",
  "                return cum[i] + llabs(y - py);",
  "            if (py == qy && qy == y && min(px, qx) <= x && x <= max(px, qx))",
  "                return cum[i] + llabs(x - px);",
  "        }",
  "        return -1;",
  "    };",
  "",
  "    while (N--) {",
  "        long long x1, y1, x2, y2;",
  "        cin >> x1 >> y1 >> x2 >> y2;",
  "        long long d1 = find_pos(x1, y1), d2 = find_pos(x2, y2);",
  "        long long diff = llabs(d1 - d2);",
  "        cout << min(diff, perimeter - diff) << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getWalkFenceSections(E) {
  return [
    {
      label: t(E, "📦 1. Read Fence Posts", "📦 1. 울타리 코너 읽기"),
      color: A,
      py: WF_INPUT_PY, cpp: WF_INPUT_CPP,
      why: [
        t(E, "Read N (cows) and P (corner posts), then the polygon corners in order.",
            "N (소 수)와 P (코너 수)를 읽고, 다각형 코너를 순서대로 입력."),
        t(E, "Posts are listed clockwise (or counter-clockwise) around the rectilinear fence.",
            "코너는 직각 울타리를 시계방향(또는 반시계방향)으로 나열."),
      ],
      pyOnly: [
        t(E, "tuple(map(int, ...)) packs each (x, y) tightly.",
            "tuple(map(int, ...))로 (x, y) 쌍 깔끔하게."),
      ],
      cppOnly: [
        t(E, "Two parallel vector<long long> X, Y avoids struct overhead and overflow.",
            "long long X, Y 평행 벡터로 구조체 오버헤드 + 오버플로 방지."),
      ],
    },
    {
      label: t(E, "📐 2. Cumulative Perimeter Distances", "📐 2. 누적 둘레 거리"),
      color: "#0891b2",
      py: WF_CUM_PY, cpp: WF_CUM_CPP,
      why: [
        t(E, "cum[i] = how far along the fence post i is, measured from post 0.",
            "cum[i] = 코너 i가 코너 0에서 울타리를 따라 얼마나 떨어졌는지."),
        t(E, "Total perimeter is just cum[P] — needed to choose the shorter side later.",
            "총 둘레 = cum[P] — 나중에 짧은 쪽을 고르는 데 사용."),
      ],
      pyOnly: [
        t(E, "abs() works on integers — Manhattan distance for axis-aligned edges.",
            "abs()로 정수 처리 — 축에 평행한 변의 맨해튼 거리."),
      ],
      cppOnly: [
        t(E, "llabs() avoids accidental int overflow on the difference.",
            "llabs()로 차이값 오버플로 방지."),
      ],
    },
    {
      label: t(E, "🧭 3. find_pos + Walk Each Cow", "🧭 3. find_pos + 소별 거리"),
      color: "#16a34a",
      py: WF_QUERY_PY, cpp: WF_QUERY_CPP,
      why: [
        t(E, "For each (x, y), scan edges. Once we find which edge it sits on, we know its distance from post 0.",
            "각 (x, y)에 대해 변을 스캔. 어느 변에 있는지 찾으면 코너 0에서의 거리를 알 수 있음."),
        t(E, "Cow distance = |d1 - d2| one way, or perimeter - |d1 - d2| the other way. Take the min.",
            "소 거리 = 한쪽 |d1 - d2|, 반대쪽 perimeter - |d1 - d2|. 더 짧은 쪽."),
      ],
      pyOnly: [
        t(E, "Functions defined at module scope can read the closure (posts, cum) directly.",
            "모듈 함수는 클로저 (posts, cum) 직접 접근."),
      ],
      cppOnly: [
        t(E, "Capturing by reference [&] gives the lambda live access to X, Y, cum.",
            "[&]로 참조 캡처해 람다에서 X, Y, cum 사용."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: WF_FULL_PY, cpp: WF_FULL_CPP,
      why: [
        t(E, "Read posts → cumulative distances → for each cow, find both points on perimeter and pick shorter side.",
            "코너 읽기 → 누적 거리 → 소마다 두 점을 둘레 위에서 찾고 짧은 쪽."),
        t(E, "Total work: O(N · P) — each query scans P edges.",
            "총 작업: O(N · P) — 각 쿼리가 P개 변 스캔."),
      ],
    },
  ];
}

export function WalkFenceProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>💡 {t(E, "Why this way?", "왜 이렇게?")}</div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span><span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>{langLabel} {t(E, "specific:", "전용:")}</div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span><span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}><CodeBlock lines={code} /></div>
          </div>
        );
      })}
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadWalkFencePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Walking Along a Fence — Full Study Guide", "🚶 Walking Along a Fence — 종합 풀이 노트");
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
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
