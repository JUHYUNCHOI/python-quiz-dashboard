import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "scores = input()  # string of A/B",
  "",
  "game_a, game_b = 0, 0  # points in current game",
  "wins_a, wins_b = 0, 0  # games won",
  "results = []",
  "",
  "for ch in scores:",
  "    if ch == 'A':",
  "        game_a += 1",
  "    else:",
  "        game_b += 1",
  "",
  "    if game_a == 21 or game_b == 21:",
  "        results.append((game_a, game_b))",
  "        if game_a == 21:",
  "            wins_a += 1",
  "        else:",
  "            wins_b += 1",
  "        game_a, game_b = 0, 0",
  "        if wins_a == 2 or wins_b == 2:",
  "            break",
  "",
  "for ga, gb in results:",
  "    print(f'{ga}-{gb}')",
  "if wins_a > wins_b:",
  "    print('A')",
  "else:",
  "    print('B')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <utility>",
  "using namespace std;",
  "",
  "int main() {",
  "    string scores;  // string of A/B",
  "    cin >> scores;",
  "",
  "    int game_a = 0;  // points in current game",
  "    int game_b = 0;",
  "    int wins_a = 0;  // games won",
  "    int wins_b = 0;",
  "    vector<pair<int, int>> results;",
  "",
  "    for (int i = 0; i < (int)scores.size(); i++) {",
  "        char ch = scores[i];",
  "        if (ch == 'A') {",
  "            game_a += 1;",
  "        } else {",
  "            game_b += 1;",
  "        }",
  "",
  "        if (game_a == 21 || game_b == 21) {",
  "            results.push_back(make_pair(game_a, game_b));",
  "            if (game_a == 21) {",
  "                wins_a += 1;",
  "            } else {",
  "                wins_b += 1;",
  "            }",
  "            game_a = 0;",
  "            game_b = 0;",
  "            if (wins_a == 2 || wins_b == 2) {",
  "                break;",
  "            }",
  "        }",
  "    }",
  "",
  "    for (int i = 0; i < (int)results.size(); i++) {",
  "        int ga = results[i].first;",
  "        int gb = results[i].second;",
  "        cout << ga << \"-\" << gb << \"\\n\";",
  "    }",
  "    if (wins_a > wins_b) {",
  "        cout << \"A\" << \"\\n\";",
  "    } else {",
  "        cout << \"B\" << \"\\n\";",
  "    }",
  "",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개인데 why 는 "코드를 한 부분씩 읽어 봐요" 라고 했다 —
   한 부분씩 읽을 데가 없었고, 같은 문장이 다섯 quest 에 그대로 복붙돼 있었다.
   파이썬 28 줄이라 네 걸음으로 쪼갠다. 코드 배열은 slice 만 한다 — 한 글자도 안 바뀐다. */
export function getBadmintonSections(E) {
  return [
    {
      label: t(E, "① Decide what to count", "① 무엇을 셀지 정하기"),
      color: A,
      py: FULL_PY.slice(0, 6), cpp: FULL_CPP.slice(0, 16),
      why: [
        t(E, "Four counters hold the whole match: two for the points in the game being played, two for how many games each player has already won.",
            "세는 값 네 개가 경기 전체를 담아요.\n두 개는 지금 하는 게임의 점수, 두 개는 이미 이긴 게임 수예요."),
        t(E, "results keeps each finished game's score. Both points go back to 0 for the next game, so the score has to be written down before that happens.",
            "results 에는 끝난 게임의 점수를 모아 둬요.\n다음 게임을 하려면 두 점수를 0 으로 되돌려야 해서,\n그 전에 적어 두지 않으면 점수가 사라져요."),
      ],
    },
    {
      label: t(E, "② One rally at a time", "② 랠리 한 개씩 세기"),
      color: A,
      py: FULL_PY.slice(6, 12), cpp: FULL_CPP.slice(16, 24),
      why: [
        t(E, "Each letter is one rally. A means A scored, anything else means B scored — so one point goes up, and nothing else changes yet.",
            "글자 하나가 랠리 하나예요.\nA 면 A 가 득점, 아니면 B 가 득점이에요. 점수 하나만 오르고 아직 다른 건 그대로예요."),
      ],
    },
    {
      label: t(E, "③ At 21, the game ends", "③ 21 점이면 게임이 끝나요"),
      color: A,
      py: FULL_PY.slice(12, 22), cpp: FULL_CPP.slice(24, 39),
      why: [
        t(E, "Check for 21 right after a point goes up — that's the only moment a game can end, so checking anywhere else would be wasted work.",
            "21 점인지는 점수가 오른 직후에만 봐요.\n게임이 끝날 수 있는 순간이 거기뿐이라, 다른 데서 보는 건 헛일이에요."),
        t(E, "Order matters: save the score first, because clearing the points to 0 wipes it. Then add the win, then clear. The games-won counters are the ones that carry over.",
            "순서가 중요해요 — 점수를 먼저 저장해요. 0 으로 비우고 나면 점수가 사라지니까요.\n그다음 이긴 게임 수를 올리고, 두 점수를 0 으로 비워요.\n다음 게임으로 넘어가는 건 이긴 게임 수뿐이에요."),
        t(E, "At 2 wins the match is decided, so break out — the rest of the letters are not played at all.",
            "2 승이 되면 매치가 정해져요. 그래서 빠져나와요 — 남은 글자는 아예 치지도 않은 거예요."),
      ],
    },
    {
      label: t(E, "④ Print the scores, then the winner", "④ 점수 줄들, 그다음 승자"),
      color: A,
      py: FULL_PY.slice(22, 28), cpp: FULL_CPP.slice(39, 52),
      why: [
        t(E, "Print one line per finished game, then one last line with the winner's letter — that is exactly the shape the sample showed.",
            "끝난 게임마다 한 줄씩 찍고, 마지막에 승자 글자를 한 줄 찍어요.\n샘플에서 본 그 모양 그대로예요."),
        t(E, "The loop stops the moment someone reaches 2 wins, and at that moment the other player has at most 1. So the bigger win count is the match winner, and a tie can never happen.",
            "반복은 누군가 2 승을 한 순간 멈춰요.\n그때 상대는 많아야 1 승이에요.\n그래서 이긴 게임이 더 많은 쪽이 매치 승자고, 비기는 일은 생기지 않아요."),
      ],
      pyOnly: [
        t(E, "In f'{ga}-{gb}', each { } is replaced by that number, and the - between them is printed just as it is written.",
            "f'{ga}-{gb}' 에서 { } 자리에 두 수가 그대로 들어가요.\n사이의 - 는 적은 그대로 찍혀요."),
      ],
      cppOnly: [
        t(E, "C++ has no f-string, so the - is printed as its own piece between the two numbers.",
            "C++ 에는 f-문자열이 없어서, - 를 두 수 사이에 따로 한 번 찍어요."),
      ],
    },
  ];
}

export function BadmintonProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/CPP 배열을 **그대로** 쓴다 — 새 알고리즘 내용을
   추가하지 않는다. 절대 이 함수 안에서 `_PY`/`_CPP` 로 끝나는 새 변수를 만들지 마라. ── */
export function getBadmintonWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "game_a / game_b", ko: "지금 게임의 점수", en: "points in the game being played right now" },
        { v: "wins_a / wins_b", ko: "이미 이긴 게임 수", en: "games each player has already won" },
        { v: "results", ko: "끝난 게임마다의 점수", en: "each finished game's final score" },
      ],
      beats: [
        { hi: [0, 16], bubble: t(E,
          "What do we need to track the whole match? 4 counters: 2 for the points in the current game, 2 for games already won. results will hold each finished game's score — it has to be written down before the points reset to 0, or it's lost.",
          "경기 전체를 어떻게 추적할까요? 세는 값 네 개예요 — 지금 게임의 점수 둘, 이미 이긴 게임 수 둘이에요.\nresults 에는 끝난 게임의 점수를 모아 둬요. 점수가 0 으로 되돌기 전에 적어 두지 않으면 사라져요.") },
        { hi: [16, 24], bubble: t(E,
          "Each character is one rally. 'A' means A scored, anything else means B scored — so one point goes up, and nothing else changes yet.",
          "글자 하나가 랠리 하나예요. 'A' 면 A 가 득점, 아니면 B 가 득점이에요.\n점수 하나만 오르고 아직 다른 건 그대로예요.") },
        { hi: [24, 39], bubble: t(E,
          "Right after a point goes up is the only moment a game can end, so that's the only place we check for 21. Order matters: save the score first (clearing to 0 would wipe it), then add the win, then clear. At 2 wins the match is decided, so break — the rest of the letters aren't played at all.",
          "게임이 끝날 수 있는 순간은 점수가 오른 직후뿐이라, 21 인지는 거기서만 확인해요.\n순서가 중요해요 — 점수를 먼저 저장하고(0 으로 비우면 사라지니까), 이긴 게임 수를 올리고, 그다음 비워요.\n2 승이 되면 매치가 정해져서 break — 남은 글자는 아예 안 봐요.") },
        { hi: [39, 51], bubble: t(E,
          "Print one line per finished game, then the winner. The loop stopped the moment someone reached 2 wins, so the other player has at most 1 — the bigger win count is always the match winner, no tie possible.",
          "끝난 게임마다 한 줄씩 찍고, 마지막에 승자를 찍어요.\n반복은 누군가 2 승을 한 순간 멈췄으니 상대는 많아야 1 승이에요 — 그래서 이긴 게임이 더 많은 쪽이 항상 매치 승자고, 비기는 일은 없어요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "game_a / game_b", ko: "지금 게임의 점수", en: "points in the game being played right now" },
      { v: "wins_a / wins_b", ko: "이미 이긴 게임 수", en: "games each player has already won" },
      { v: "results", ko: "끝난 게임마다의 점수", en: "each finished game's final score" },
    ],
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What do we need to track the whole match? 4 counters: 2 for the points in the current game, 2 for games already won. results will hold each finished game's score — it has to be written down before the points reset to 0, or it's lost.",
        "경기 전체를 어떻게 추적할까요? 세는 값 네 개예요 — 지금 게임의 점수 둘, 이미 이긴 게임 수 둘이에요.\nresults 에는 끝난 게임의 점수를 모아 둬요. 점수가 0 으로 되돌기 전에 적어 두지 않으면 사라져요.") },
      { hi: [6, 11], bubble: t(E,
        "Each character is one rally. 'A' means A scored, anything else means B scored — so one point goes up, and nothing else changes yet.",
        "글자 하나가 랠리 하나예요. 'A' 면 A 가 득점, 아니면 B 가 득점이에요.\n점수 하나만 오르고 아직 다른 건 그대로예요.") },
      { hi: [12, 21], bubble: t(E,
        "Right after a point goes up is the only moment a game can end, so that's the only place we check for 21. Order matters: save the score first (clearing to 0 would wipe it), then add the win, then clear. At 2 wins the match is decided, so break — the rest of the letters aren't played at all.",
        "게임이 끝날 수 있는 순간은 점수가 오른 직후뿐이라, 21 인지는 거기서만 확인해요.\n순서가 중요해요 — 점수를 먼저 저장하고(0 으로 비우면 사라지니까), 이긴 게임 수를 올리고, 그다음 비워요.\n2 승이 되면 매치가 정해져서 break — 남은 글자는 아예 안 봐요.") },
      { hi: [22, 27], bubble: t(E,
        "Print one line per finished game, then the winner. The loop stopped the moment someone reached 2 wins, so the other player has at most 1 — the bigger win count is always the match winner, no tie possible.",
        "끝난 게임마다 한 줄씩 찍고, 마지막에 승자를 찍어요.\n반복은 누군가 2 승을 한 순간 멈췄으니 상대는 많아야 1 승이에요 — 그래서 이긴 게임이 더 많은 쪽이 항상 매치 승자고, 비기는 일은 없어요.") },
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


export function downloadBadmintonPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Badminton — Full Study Guide", "Badminton — 종합 풀이 노트");
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

