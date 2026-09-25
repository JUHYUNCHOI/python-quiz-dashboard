import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ----------------------------------------------------------------
   SocDist2Sim — bilingual deep-audit sim for the title page
   Sample: sick = [3, 5, 12, 14], healthy = [8]. Number line 0..16.
   Student picks R (0..6). Sim shows:
   - Each sick cow with infection range [x-R, x+R]
   - If any healthy cow falls inside any range → invalid (R too big)
   - When valid, count clusters: adjacent sick gap > 2R → new cluster
   Big idea: largest R with no healthy hit + cluster count = answer.
   --------------------------------------------------------------- */
export function SocDist2Sim({ E }) {
  const sick = [3, 5, 12, 14];
  const healthy = [8];
  const MAX_X = 16;
  const MAX_R = 6;
  const [R, setR] = useState(1);

  // Validity: no healthy cow within R of any sick cow
  const conflicts = healthy.filter(h => sick.some(s => Math.abs(h - s) <= R));
  const valid = conflicts.length === 0;

  // True best R: min |h - s| - 1, clamped at 0
  const bestR = Math.max(0, Math.min(
    ...healthy.flatMap(h => sick.map(s => Math.abs(h - s) - 1))
  ));
  const isBest = R === bestR;

  // Cluster count (only meaningful when valid)
  const sortedSick = [...sick].sort((a, b) => a - b);
  let clusters = sortedSick.length > 0 ? 1 : 0;
  for (let i = 1; i < sortedSick.length; i++) {
    if (sortedSick[i] - sortedSick[i - 1] > R) clusters++;
  }

  const U = 26;
  const totalW = (MAX_X + 1) * U;

  return (
    <div style={{ padding: "10px 8px" }}>
      <div style={{ textAlign: "center", marginBottom: 8, fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
        {t(E,
          "Try it · sick = {3,5,12,14}, healthy = {8}",
          "직접 해봐요 · 감염 = {3,5,12,14}, 건강 = {8}")}
      </div>

      {/* Status row */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#1e3a8a", fontFamily: "'JetBrains Mono',monospace" }}>
          R = <b>{R}</b>
        </div>
        <div style={{
          background: valid ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${valid ? "#16a34a" : "#dc2626"}`,
          borderRadius: 8, padding: "4px 10px", fontSize: 11,
          color: valid ? "#166534" : "#7f1d1d",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          {valid
            ? t(E, "valid ✓", "유효 ✓")
            : t(E, "healthy hit ✗", "건강 소 감염 ✗")}
        </div>
        {valid && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "clusters", "클러스터")} = <b>{clusters}</b>
          </div>
        )}
        {isBest && (
          <div style={{ background: "#fce7f3", border: "1px solid #db2777", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#9d174d", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800 }}>
            {t(E, "★ best R", "★ 제일 좋은 R")}
          </div>
        )}
      </div>

      {/* R 조작기 — ⚠️ 2026-09-25: 원래 「수직선」 아래에 있었는데, 1280×900 첫 진입 화면에서
          하필 하단 고정 바가 덮는 띠(y 832 아래)에 앉아 **학생이 조작기를 아예 못 봤다.**
          누르면 바의 `다음 →` 이 눌려 쪽이 넘어가기까지 했다(Playwright 실측: 슬라이더 884~900,
          바 시작 832). ⛔ 여백을 더하는 건 답이 아니다 — `QuestNavBar` 가 문서 끝에 이미 78px
          스페이서를 두고 바 높이는 68px 이라 **여백은 남는다.** 조작기를 **수직선 위로 올려야**
          화면 안에 들어온다. 부수 이득: 「누르는 곳 → 바뀌는 곳」 순서가 위에서 아래로 자연스러워진다.
          형제 `socialdist1` 도 같은 결함이라 같은 모양으로 고친다. 이 둘 말고는 없다(슬라이더 쓰는
          quest 31개 전수 확인). ⭐ `−`/`+` 를 같이 둔 이유 — 드래그는 기기·도구마다 되고 안 되고가
          갈린다(학생 하나는 옮겼고 하나는 못 옮겼다). */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "Change spread radius R — drag, or tap − / +", "전파 반경 R 을 바꿔 봐요 — 끌거나 − / + 를 눌러요")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setR((v) => Math.max(0, v - 1))}
            disabled={R <= 0}
            aria-label={t(E, "decrease R", "R 줄이기")}
            style={{
              width: 30, height: 30, borderRadius: 8, fontSize: 16, fontWeight: 900,
              border: `2px solid ${R <= 0 ? "#e5e7eb" : A}`, background: "#fff",
              color: R <= 0 ? "#cbd5e1" : A, cursor: R <= 0 ? "default" : "pointer", lineHeight: 1,
            }}
          >−</button>
          <span style={{ fontSize: 11, color: C.dim }}>0</span>
          <input
            type="range" min={0} max={MAX_R} value={R}
            onChange={(e) => setR(parseInt(e.target.value, 10))}
            style={{ width: 200, accentColor: A }}
          />
          <span style={{ fontSize: 11, color: C.dim }}>{MAX_R}</span>
          <button
            onClick={() => setR((v) => Math.min(MAX_R, v + 1))}
            disabled={R >= MAX_R}
            aria-label={t(E, "increase R", "R 늘리기")}
            style={{
              width: 30, height: 30, borderRadius: 8, fontSize: 16, fontWeight: 900,
              border: `2px solid ${R >= MAX_R ? "#e5e7eb" : A}`, background: "#fff",
              color: R >= MAX_R ? "#cbd5e1" : A, cursor: R >= MAX_R ? "default" : "pointer", lineHeight: 1,
            }}
          >+</button>
        </div>
      </div>

      {/* Number line stage */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "16px 10px", marginBottom: 10, overflowX: "auto" }}>
        <div style={{ position: "relative", width: totalW, height: 96, margin: "0 auto" }}>
          {/* Base axis */}
          <div style={{ position: "absolute", left: U / 2, right: U / 2, top: 56, height: 2, background: C.border }} />

          {/* Infection ranges around each sick cow */}
          {sick.map((s, si) => {
            const lo = Math.max(0, s - R);
            const hi = Math.min(MAX_X, s + R);
            return (
              <div key={`range-${si}`} style={{
                position: "absolute",
                left: lo * U + U / 2 - 10,
                top: 44,
                width: (hi - lo) * U + 20,
                height: 26,
                background: valid ? "rgba(220, 38, 38, 0.15)" : "rgba(220, 38, 38, 0.30)",
                border: `1.5px ${valid ? "dashed" : "solid"} #dc2626`,
                borderRadius: 14,
                transition: "all .2s ease-out",
              }} />
            );
          })}

          {/* Tick marks */}
          {Array.from({ length: MAX_X + 1 }, (_, i) => (
            <div key={`tick-${i}`} style={{
              position: "absolute",
              left: i * U + U / 2 - 8,
              top: 70,
              width: 16,
              textAlign: "center",
              fontSize: 9,
              color: C.dim,
              fontFamily: "'JetBrains Mono',monospace",
            }}>{i}</div>
          ))}

          {/* Sick cows */}
          {sick.map((pos, ci) => (
            <div key={`sick-${ci}`} style={{
              position: "absolute",
              left: pos * U + U / 2 - 12,
              top: 22,
              width: 24,
              fontSize: 18,
              textAlign: "center",
            }}>
              <div>{"🦠"}</div>
              <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -4 }}>
                {pos}
              </div>
            </div>
          ))}

          {/* Healthy cows */}
          {healthy.map((pos, ci) => {
            const hit = sick.some(s => Math.abs(pos - s) <= R);
            return (
              <div key={`hlt-${ci}`} style={{
                position: "absolute",
                left: pos * U + U / 2 - 12,
                top: 22,
                width: 24,
                fontSize: 18,
                textAlign: "center",
              }}>
                <div style={{ filter: hit ? "none" : "hue-rotate(80deg) saturate(2)" }}>{"🐄"}</div>
                <div style={{ fontSize: 9, color: hit ? "#dc2626" : "#16a34a", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", marginTop: -4 }}>
                  {pos}{hit ? " ✗" : " ✓"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cluster gap row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.dim, flexWrap: "wrap" }}>
          <span>{t(E, "sick gaps:", "감염 간격:")}</span>
          {sortedSick.slice(1).map((p, i) => {
            const g = p - sortedSick[i];
            const newCluster = g > R;
            return (
              <span key={i} style={{ color: newCluster ? "#db2777" : "#16a34a", fontWeight: 700 }}>
                {g}{newCluster ? " ▶" : ""}{i < sortedSick.length - 2 ? "," : ""}
              </span>
            );
          })}
          <span style={{ color: C.dim }}>· {t(E, "gap > R = new cluster", "간격 > R 이면 새 클러스터")}</span>
        </div>
      </div>

      {/* Insight box */}
      <div style={{ marginTop: 10, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: C.text, lineHeight: 1.55 }}>
        <b style={{ color: A }}>{t(E, "Two questions, one answer", "질문 둘, 답 하나")}</b>{" "}
        {t(E,
          "Bigger R → infection rings reach healthy cows (invalid). Smaller R → sick cows fall into separate clusters (more seeds). The largest valid R minimises the cluster count.",
          "R 이 커지면 감염 범위가 건강한 소까지 닿아서 안 돼요.\nR 이 작으면 아픈 소들이 여러 클러스터로 갈라져서 처음 아팠던 소가 늘어나요.\n그래서 건강한 소에 안 닿는 가장 큰 R 일 때 클러스터 수가 가장 적어요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('socdist2.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "cows = []",
  "for i in range(1, N + 1):",
  "    parts = lines[i].split()",
  "    cows.append((int(parts[0]), int(parts[1])))",
  "cows.sort()",
  "",
  "sick = []",
  "healthy = []",
  "for x, s in cows:",
  "    if s == 1:",
  "        sick.append(x)",
  "    else:",
  "        healthy.append(x)",
  "",
  "# max R: 가장 큰 R 값 — 어떤 건강한 소도 아픈 소의 R 이내에 없어야 함",
  "if not sick:",
  "    ans = 0",
  "elif not healthy:",
  "    # 모두 아픔 — 초기 감염 1마리로 전파 가능",
  "    ans = 1",
  "else:",
  "    max_R = 10**18",
  "    for h in healthy:",
  "        for sx in sick:",
  "            d = abs(h - sx) - 1",
  "            if d < max_R:",
  "                max_R = d",
  "    if max_R < 0:",
  "        max_R = 0",
  "",
  "    # 클러스터 세기: 정렬된 cows 순회",
  "    # 건강한 소가 나오면 클러스터 끊김",
  "    # 연속된 아픈 소 사이 거리 > R 이면 새 클러스터",
  "    clusters = 0",
  "    prev_sick = -1",
  "    in_cluster = False",
  "    for x, s in cows:",
  "        if s == 1:",
  "            if not in_cluster:",
  "                clusters += 1",
  "                in_cluster = True",
  "            elif x - prev_sick > max_R:",
  "                clusters += 1",
  "            prev_sick = x",
  "        else:",
  "            in_cluster = False",
  "    ans = clusters",
  "",
  "with open('socdist2.out', 'w') as file:",
  "    file.write(str(ans) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"socdist2.in\");",
  "    ofstream fout(\"socdist2.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<pair<long long, int>> cows(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> cows[i].first >> cows[i].second;",
  "    }",
  "    sort(cows.begin(), cows.end());",
  "",
  "    vector<long long> sick, healthy;",
  "    for (int i = 0; i < N; i++) {",
  "        if (cows[i].second == 1) {",
  "            sick.push_back(cows[i].first);",
  "        } else {",
  "            healthy.push_back(cows[i].first);",
  "        }",
  "    }",
  "",
  "    long long ans;",
  "    if (sick.empty()) {",
  "        ans = 0;",
  "    } else if (healthy.empty()) {",
  "        // 모두 아픔 — 초기 감염 1마리로 전파 가능",
  "        ans = 1;",
  "    } else {",
  "        // max R: 가장 큰 R — 어떤 건강한 소도 아픈 소의 R 이내에 없어야 함",
  "        long long max_R = (long long)1e18;",
  "        for (int i = 0; i < (int)healthy.size(); i++) {",
  "            for (int j = 0; j < (int)sick.size(); j++) {",
  "                long long d = abs(healthy[i] - sick[j]) - 1;",
  "                if (d < max_R) {",
  "                    max_R = d;",
  "                }",
  "            }",
  "        }",
  "        if (max_R < 0) {",
  "            max_R = 0;",
  "        }",
  "",
  "        // 클러스터 세기",
  "        long long clusters = 0;",
  "        long long prev_sick = -1;",
  "        bool in_cluster = false;",
  "        for (int i = 0; i < N; i++) {",
  "            long long x = cows[i].first;",
  "            int s = cows[i].second;",
  "            if (s == 1) {",
  "                if (!in_cluster) {",
  "                    clusters++;",
  "                    in_cluster = true;",
  "                } else if (x - prev_sick > max_R) {",
  "                    clusters++;",
  "                }",
  "                prev_sick = x;",
  "            } else {",
  "                in_cluster = false;",
  "            }",
  "        }",
  "        ans = clusters;",
  "    }",
  "    fout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSocDist2Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we print? The fewest cows that could have been infected at the very start, given the largest spread radius R consistent with today's pattern.",
            "무엇을 출력해야 하나요?\n지금 상태와 어긋나지 않는\n가장 큰 전파 거리 R 을 정했을 때,\n처음에 아팠던 소가 최소 몇 마리였는지예요."),
        t(E, "First we need R: it's the largest radius where no healthy cow ends up within R of a sick one — otherwise that cow would already be sick. So R is the smallest (distance - 1) over every healthy-sick pair.",
            "먼저 R 을 구해야 해요 —\n건강한 소가 아픈 소로부터 R 이내에 있으면\n안 되니까요 (그랬다면 이미 옮았을 거예요).\nR 은 건강-아픈 소 쌍의 (거리-1) 중\n가장 작은 값이에요."),
        t(E, "Once R is fixed, sick cows within R of each other could have spread from one cow, so each cluster of close-enough sick cows only needs one original infection.",
            "R 이 정해지면, R 이내로 붙어 있는 아픈 소들은\n한 마리에서 옮았을 수 있으니\n무리 하나마다 처음 감염은 한 마리면 충분해요."),
        t(E, "So the code finds max R from every healthy/sick distance, then counts clusters of sick cows more than R apart as separate outbreaks.",
            "그래서 코드는 먼저 R 을 구하고,\n정렬된 소를 순서대로 훑으며\nR 보다 멀리 떨어진 아픈 소 무리를\n새로운 발병으로 세요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 적어요 — 코드가 하려는 일이 또렷해져요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function SocDist2ProgressiveCode(props) {
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


export function downloadSocDist2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SocDist2 — Full Study Guide", "SocDist2 — 종합 풀이 노트");
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

