import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "sentence = input()",
  "vowels = \"aeiou\"",
  "",
  "new_words = []",
  "for word in sentence.split(\" \"):",
  "    new_word = \"\"",
  "    for syl in word.split(\"/\"):",
  "        pos = -1                    # 첫 자음의 자리, 아직 못 찾았으면 -1",
  "        for i in range(len(syl)):",
  "            if syl[i] not in vowels:",
  "                pos = i",
  "                break",
  "        if pos == -1:",
  "            echo = \"f\" + syl        # 자음이 없어요 → f 를 앞에 붙여요",
  "        else:",
  "            echo = syl[:pos] + \"f\" + syl[pos+1:]  # 첫 자음만 f 로 갈아끼워요",
  "        new_word += syl + echo      # 음절 + 메아리",
  "    new_words.append(new_word)",
  "",
  "print(\" \".join(new_words))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "bool isVowel(char c) {",
  "    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';",
  "}",
  "",
  "int main() {",
  "    string sentence;",
  "    getline(cin, sentence);",
  "",
  "    string out = \"\";",
  "    string syl = \"\";",
  "    for (int i = 0; i <= (int)sentence.size(); i++) {",
  "        char ch;",
  "        if (i < (int)sentence.size()) {",
  "            ch = sentence[i];",
  "        } else {",
  "            ch = ' ';",
  "        }",
  "        if (ch == '/' || ch == ' ') {          // 음절 하나가 끝났어요",
  "            if (!syl.empty()) {",
  "                int pos = -1;                // 첫 자음의 자리, 아직 못 찾았으면 -1",
  "                for (int j = 0; j < (int)syl.size(); j++) {",
  "                    if (!isVowel(syl[j])) {",
  "                        pos = j;",
  "                        break;",
  "                    }",
  "                }",
  "                string echo;",
  "                if (pos == -1) {",
  "                    echo = \"f\" + syl;         // 자음이 없어요 → f 를 앞에 붙여요",
  "                } else {",
  "                    echo = syl.substr(0, pos) + \"f\" + syl.substr(pos + 1);  // 첫 자음만 f 로",
  "                }",
  "                out += syl;",
  "                out += echo;",
  "                syl = \"\";",
  "            }",
  "            if (ch == ' ' && i < (int)sentence.size()) {",
  "                out += ' ';",
  "            }",
  "        } else {",
  "            syl += ch;",
  "        }",
  "    }",
  "    cout << out << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc15BahasaSections(E) {
  return [
    {
      label: t(E, "1️⃣ Take in the sentence", "1️⃣ 문장을 받아요"),
      color: A,
      py: FULL_PY.slice(0, 3), cpp: FULL_CPP.slice(0, 12),
      why: [
        t(E, "What do we have to hand back? Each word echoed by Bessie's rule. So cut the problem twice — sentence → words → syllables — and all that is left is one tiny rule about a single syllable.",
            "무엇을 내놓아야 하나요? 각 단어를 규칙대로 메아리쳐 붙인 문장이에요.\n그러니 문제를 '문장 → 단어 → 음절' 로 두 번 쪼개요.\n그러면 남는 건 음절 하나짜리 규칙 하나뿐이에요."),
        t(E, "You never need to list all 21 consonants — anything that is not one of the 5 vowels (a e i o u) is a consonant. Note that 'y' is a consonant too.",
            "자음 21개를 다 적을 필요 없어요.\n모음 5개(a e i o u)가 아니면 전부 자음이니까요.\n'y' 도 자음이에요."),
      ],
      cppOnly: [
        t(E, "The sentence contains spaces, so read the whole line with getline(cin, sentence) instead of cin >>.",
            "문장에 공백이 있으니 cin >> 대신 getline(cin, sentence) 로 한 줄 통째로 받아요."),
      ],
    },
    {
      label: t(E, "2️⃣ Split into syllables", "2️⃣ 음절 단위로 쪼개요"),
      color: "#ea580c",
      py: FULL_PY.slice(3, 7), cpp: FULL_CPP.slice(12, 21),
      why: [
        t(E, "The slashes only mark where syllables end — they must not appear in the output.",
            "슬래시는 음절이 끝나는 자리를 표시할 뿐이라 출력에는 나오면 안 돼요."),
      ],
      pyOnly: [
        t(E, "word.split(\"/\") hands you the syllables of that word, one by one.",
            "word.split(\"/\") 가 그 단어의 음절을 하나씩 꺼내줘요."),
      ],
      cppOnly: [
        t(E, "C++ has no split, so collect characters one by one into syl until you hit a '/' or a space.",
            "C++ 에는 split 이 없어서, 글자를 하나씩 모아 syl 에 쌓다가 '/' 나 공백을 만나면 멈춰요."),
        t(E, "The loop runs to i == size() so the last syllable (which has no '/' or space after it) also gets flushed.",
            "반복을 i == size() 까지 돌려서, 뒤에 '/' 나 공백이 없는 마지막 음절도 빠짐없이 처리해요."),
      ],
    },
    {
      label: t(E, "3️⃣ Apply the echo rule", "3️⃣ 메아리 규칙을 적용해요"),
      color: "#16a34a",
      py: FULL_PY.slice(7, 17), cpp: FULL_CPP.slice(21, 47),
      why: [
        t(E, "That rule: find the syllable's first consonant. If there is one, echo = 'f' + everything except that consonant. If there is none, echo = 'f' + the whole syllable. Then write syllable + echo.",
            "규칙은 이래요.\n음절 안에서 첫 자음을 찾아요.\n있으면, 메아리 = 그 자음만 'f' 로 갈아낀 음절이에요.\n없으면, 메아리 = 'f' + 음절 전체예요.\n그다음 음절 + 메아리 로 적어요."),
      ],
      pyOnly: [
        t(E, "The inner loop searches for the first character not in vowels and remembers its index in pos. syl[:pos] + \"f\" + syl[pos+1:] then swaps only that one letter for 'f' — wherever it sits.",
            "안쪽 반복문이 vowels 에 없는 첫 글자를 찾아 자리를 pos 에 기억해요.\nsyl[:pos] + \"f\" + syl[pos+1:] 이 그 한 글자만 'f' 로 갈아껴요 — 어디 있든 상관없이요."),
      ],
      cppOnly: [
        t(E, "When you hit '/' or a space, the syllable you were collecting is finished — search it for the first consonant, apply the rule, add a space between words if needed, then reset syl for the next one.",
            "'/' 나 공백을 만나면 모으던 음절이 끝난 거예요.\n그 안에서 첫 자음을 찾아 규칙을 적용하고, 단어 사이라면 공백도 넣은 뒤 syl 을 비워요."),
        t(E, "syl.substr(0, pos) + \"f\" + syl.substr(pos + 1) swaps only the letter at pos for 'f' — wherever it sits.",
            "syl.substr(0, pos) + \"f\" + syl.substr(pos + 1) 이 pos 자리의 글자 하나만 'f' 로 갈아껴요 — 어디 있든 상관없이요."),
      ],
    },
    {
      label: t(E, "4️⃣ Print the answer", "4️⃣ 답을 출력해요"),
      color: "#0891b2",
      py: FULL_PY.slice(17), cpp: FULL_CPP.slice(47),
      why: [
        t(E, "Each finished word joins the answer, and the spaces between words come back at the end.",
            "완성된 단어를 하나씩 답에 붙이고, 단어 사이 공백을 되살려서 출력해요."),
      ],
      pyOnly: [
        t(E, "\" \".join(new_words) puts the spaces between words back at the end.",
            "\" \".join(new_words) 이 단어 사이 공백을 되살려요."),
      ],
    },
  ];
}

export function Mcc15BahasaProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadMcc15BahasaPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Bahasa — Full Study Guide", "Mcc15Bahasa — 종합 풀이 노트");
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

