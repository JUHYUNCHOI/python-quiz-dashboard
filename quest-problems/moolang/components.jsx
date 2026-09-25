// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 16/16 on cpid=1324
// 🔒 USACO_VERIFIED (2026-05-13; C++ completed & re-verified 2026-06-15)
//   Python: 16/16 PASS
//   C++:    completed — output construction was previously omitted (printed
//           only the word-count line). Now builds & prints the sentence line.
//           Compiled g++ -std=c++17 -O2; output byte-exact to the OFFICIAL
//           cpid 1324 sample on all 3 cases (counts 0/9/23 + both sentence
//           lines verbatim, incl. tc3). Pending full USACO re-submission.
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
    note_ko: `명사 ${N} 개, 타동사 ${T} 개, 자동사 ${I} 개, 마침표 ${P} 개예요.\nn_tverb 를 0 부터 ${T} 까지 훑어서 단어 수가 가장 많은 줄을 골라요.`,
    rows,
  });
  rows.forEach((r, i) => {
    const en = !r.fits
      ? `n_tverb=${r.nt}: would need ${r.sentences} sentences but P=${P}. Skip.`
      : `n_tverb=${r.nt}: uses ${2 * r.nt} nouns → ${r.nounsLeft} left. min(I, left) = ${r.ni} intransitive. Total = 3·${r.nt} + 2·${r.ni} = ${r.words} words.`;
    const ko = !r.fits
      ? `n_tverb=${r.nt} 이면 문장이 ${r.sentences} 개 있어야 하는데 마침표는 ${P} 개뿐이에요. 그래서 건너뛰어요.`
      : `n_tverb=${r.nt} 이면 명사를 ${2 * r.nt} 개 써서 ${r.nounsLeft} 개가 남아요. 자동사 문장은 min(I, 남은 명사) = ${r.ni} 개예요. 그래서 모두 3·${r.nt} + 2·${r.ni} = ${r.words} 단어예요.`;
    trace.push({ cur: i, bestIdx, note_en: en, note_ko: ko, rows });
  });
  trace.push({
    cur: -2, bestIdx,
    note_en: `Best row: n_tverb=${rows[bestIdx].nt}, n_iverb=${rows[bestIdx].ni}, words=${rows[bestIdx].words}. That is the answer.`,
    note_ko: `가장 많은 줄은 n_tverb=${rows[bestIdx].nt}, n_iverb=${rows[bestIdx].ni}, 단어 ${rows[bestIdx].words} 개예요. 이게 답이에요.`,
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
          🔬 {t(E, "Deep Audit — sweep every n_tverb", "n_tverb 를 하나도 빠짐없이 훑어 보기")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
          {t(E, "Sample: 5 nouns, 1 transitive, 3 intransitive, P=4. Find the max words.",
              "샘플은 명사 5, 타동사 1, 자동사 3, P=4 예요.\n단어를 가장 많이 쓰는 방법을 찾아요.")}
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
            t(E, "sentences ≤ P?", "문장 수가 P 이내?"),
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
  "T = int(input())",
  "",
  "out_lines = []",
  "for _ in range(T):",
  "    N, C, P = map(int, input().split())",
  "    nouns, tverbs, iverbs, conjs = [], [], [], []",
  "    for _ in range(N):",
  "        word, ty = input().split()",
  "        if ty[0] == 'n':",
  "            nouns.append(word)",
  "        elif ty[0] == 't':",
  "            tverbs.append(word)",
  "        elif ty[0] == 'i':",
  "            iverbs.append(word)",
  "        else:",
  "            conjs.append(word)",
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
  "print('\\n'.join(out_lines))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N, C, P;",
  "        cin >> N >> C >> P;",
  "        vector<string> nouns, tverbs, iverbs, conjs;",
  "        for (int i = 0; i < N; i++) {",
  "            string word, ty;",
  "            cin >> word >> ty;",
  "            if (ty[0] == 'n') {",
  "                nouns.push_back(word);",
  "            } else if (ty[0] == 't') {",
  "                tverbs.push_back(word);",
  "            } else if (ty[0] == 'i') {",
  "                iverbs.push_back(word);",
  "            } else {",
  "                conjs.push_back(word);",
  "            }",
  "        }",
  "",
  "        // Sweep number of transitive sentences; for each, take as many",
  "        // intransitive sentences as fit, then combine pairs with conjunctions.",
  "        int bestWords = 0;",
  "        int bestT = 0;",
  "        int bestI = 0;",
  "        int bestConj = 0;",
  "        for (int n_tverb = 0; n_tverb <= (int)tverbs.size(); n_tverb++) {",
  "            int n_iverb = min((int)iverbs.size(), (int)nouns.size() - 2 * n_tverb);",
  "            int n_conj = 0;",
  "            while (n_iverb >= 0) {",
  "                n_conj = min((int)conjs.size(), (n_tverb + n_iverb) / 2);",
  "                if (n_tverb + n_iverb - n_conj <= P) {",
  "                    break;",
  "                }",
  "                n_iverb--;",
  "            }",
  "            if (n_iverb < 0) {",
  "                continue;",
  "            }",
  "            int extra_nouns = min(C, (int)nouns.size() - (n_iverb + 2 * n_tverb));",
  "            if (n_tverb == 0) {",
  "                extra_nouns = 0;",
  "            }",
  "            int n_words = 3 * n_tverb + 2 * n_iverb + n_conj + extra_nouns;",
  "            if (n_words > bestWords) {",
  "                bestWords = n_words;",
  "                bestT = n_tverb;",
  "                bestI = n_iverb;",
  "                bestConj = n_conj;",
  "            }",
  "        }",
  "",
  "        int n_tverb = bestT;",
  "        int n_iverb = bestI;",
  "        int n_conj = bestConj;",
  "",
  "        // Build basic sentences, popping words from the back of each list.",
  "        vector<string> basic;",
  "        for (int i = 0; i < n_iverb; i++) {",
  "            string noun = nouns.back();",
  "            nouns.pop_back();",
  "            string verb = iverbs.back();",
  "            iverbs.pop_back();",
  "            basic.push_back(noun + \" \" + verb);",
  "        }",
  "        for (int i = 0; i < n_tverb; i++) {",
  "            string noun1 = nouns.back();",
  "            nouns.pop_back();",
  "            string verb = tverbs.back();",
  "            tverbs.pop_back();",
  "            string noun2 = nouns.back();",
  "            nouns.pop_back();",
  "            basic.push_back(noun1 + \" \" + verb + \" \" + noun2);",
  "        }",
  "",
  "        // Tack extra nouns onto the last transitive sentence using commas.",
  "        int Cleft = C;",
  "        while (n_tverb > 0 && Cleft > 0 && !nouns.empty()) {",
  "            basic.back() += \", \" + nouns.back();",
  "            nouns.pop_back();",
  "            Cleft--;",
  "        }",
  "",
  "        // Join pairs of sentences with conjunctions.",
  "        vector<string> compound;",
  "        for (int i = 0; i < n_conj; i++) {",
  "            string s1 = basic.back();",
  "            basic.pop_back();",
  "            string conj = conjs.back();",
  "            conjs.pop_back();",
  "            string s2 = basic.back();",
  "            basic.pop_back();",
  "            compound.push_back(s1 + \" \" + conj + \" \" + s2);",
  "        }",
  "",
  "        // Output: word count, then the sentence (each ends with a period).",
  "        cout << bestWords << \"\\n\";",
  "        string line;",
  "        bool first = true;",
  "        for (const string& s : basic) {",
  "            if (!first) {",
  "                line += \" \";",
  "            }",
  "            line += s + \".\";",
  "            first = false;",
  "        }",
  "        for (const string& s : compound) {",
  "            if (!first) {",
  "                line += \" \";",
  "            }",
  "            line += s + \".\";",
  "            first = false;",
  "        }",
  "        cout << line << \"\\n\";",
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
        t(E, "What do we need? The max total words usable, and the sentences\nthat use them.",
            "무엇을 내놓아야 하나요? 쓸 수 있는 단어 수의 최댓값과,\n그 단어들로 만든 문장이에요."),
        t(E, "Once we pick how many transitive sentences (n_tverb) to build, the rest\n(intransitive, conjunctions) follows — so sweep n_tverb from 0 up.",
            "타동사 문장 개수(n_tverb)를 정하면 나머지(자동사·접속사 개수)가\n따라 정해져요. 그래서 n_tverb 를 0부터 다 훑어요."),
        t(E, "If that uses too many sentences for the period budget P, trim\nintransitive sentences until it fits, then compute the word total.",
            "그 개수가 마침표 예산 P 를 넘으면 자동사 문장을 줄여서 맞추고,\n그다음 단어 총합을 계산해요."),
        t(E, "So: keep the best-scoring n_tverb, then build the sentences from it.\nThe C++ mirrors the Python step for step.",
            "그래서 단어 수가 가장 많은 n_tverb 를 골라 문장을 짜요.\nC++ 는 Python 을 단계 그대로 옮긴 거예요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 넣어요 (<iostream>, <vector> …).\n그래야 코드가 무엇을 하려는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 2×10^9 을 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function MooLangProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고
   beats(설명 말풍선)만 덧붙인다. getMooLangSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getMooLangWalk(E, lang = "py") {
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars: [
        { v: "n_tverb", ko: "지을 타동사 문장 개수", en: "how many transitive sentences to build" },
        { v: "n_iverb", ko: "지을 자동사 문장 개수", en: "how many intransitive sentences to build" },
        { v: "basic/compound", ko: "묶기 전/후 문장들", en: "sentences before / after combining with conjunctions" },
      ],
      beats: [
        { hi: [7, 25], bubble: t(E,
          "What do we hand back? For every test case, the biggest possible word count and the sentence that uses it. Read T, then each case's N/C/P and N words, sorting them into four buckets by type.",
          "무엇을 내놓아야 하나요? 케이스마다 만들 수 있는 최대 단어 수와, 그 단어로 지은 문장이에요.\nT 를 읽고, 케이스마다 N/C/P 와 단어 N 개를 읽어 명사·타동사·자동사·접속사 네 바구니에 나눠 담아요.") },
        { hi: [33, 45], bubble: t(E,
          "Once we pick how many transitive sentences (n_tverb) to build, everything else follows. So try every n_tverb from 0 up — take as many intransitive sentences (n_iverb) as fit, trimming down until the period count stays within P.",
          "타동사 문장 개수(n_tverb)를 정하면 나머지가 따라 정해져요.\n그래서 n_tverb 를 0부터 다 시도해요 — 자동사 문장(n_iverb)을 최대한 채우되, 마침표 수가 P 를 넘으면 하나씩 줄여요.") },
        { hi: [46, 57], bubble: t(E,
          "If even n_iverb = 0 doesn't fit, skip this n_tverb. Otherwise spend the comma budget C on extra nouns, total up the words, and keep the best n_tverb so far.",
          "n_iverb = 0 이어도 안 맞으면 이 n_tverb 는 건너뛰어요.\n아니면 쉼표 예산 C 로 문장에 명사를 더 붙이고, 단어 총합을 구해서 지금까지 중 제일 좋은 n_tverb 를 저장해요.") },
        { hi: [59, 80], bubble: t(E,
          "Now rebuild the actual sentences for the best n_tverb. Pop nouns and verbs off the back of each vector — popping removes them so the same word is never reused.",
          "가장 좋은 n_tverb 로 실제 문장을 다시 만들어요.\n명사·동사를 벡터 끝에서 꺼내 써요 — pop 은 그 단어를 지워서, 같은 단어를 두 번 쓰지 않게 해요.") },
        { hi: [83, 88], bubble: t(E,
          "There's still comma budget left, so tack extra nouns onto the last transitive sentence with commas until C runs out.",
          "쉼표 예산이 남아 있으면, 마지막 타동사 문장에 명사를 쉼표로 계속 이어 붙여요 — C 가 다 떨어질 때까지.") },
        { hi: [91, 100], bubble: t(E,
          "Combine pairs of basic sentences with conjunctions into compound sentences — periods get added when we print them.",
          "기본 문장을 둘씩 접속사로 이어 복문을 만들어요 — 마침표는 출력할 때 붙여요.") },
        { hi: [103, 120], bubble: t(E,
          "Print the word count, then build the output line: basic sentences first, then compound ones, each with a period and a space between them.",
          "단어 수를 출력하고, 문장 줄을 만들어요 — 기본 문장 다음 복문 순서로 이어 붙이고, 문장마다 마침표를 붙이고 사이에 공백을 넣어요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "n_tverb", ko: "지을 타동사 문장 개수", en: "how many transitive sentences to build" },
      { v: "n_iverb", ko: "지을 자동사 문장 개수", en: "how many intransitive sentences to build" },
      { v: "basic/compound", ko: "묶기 전/후 문장들", en: "sentences before / after combining with conjunctions" },
    ],
    beats: [
      { hi: [0, 15], bubble: t(E,
        "What do we hand back? For every test case, the biggest possible word count and the sentence that uses it. Read every word and sort it into four buckets by type: noun / transitive verb / intransitive verb / conjunction.",
        "무엇을 내놓아야 하나요? 케이스마다 만들 수 있는 최대 단어 수와, 그 단어로 지은 문장이에요.\n단어를 하나씩 읽어서 명사·타동사·자동사·접속사 네 바구니에 나눠 담아요.") },
      { hi: [17, 26], bubble: t(E,
        "Once we pick how many transitive sentences (n_tverb) to build, everything else follows. So try every n_tverb from 0 up — take as many intransitive sentences (n_iverb) as fit, trimming down until the period count stays within P.",
        "타동사 문장 개수(n_tverb)를 정하면 나머지가 따라 정해져요.\n그래서 n_tverb 를 0부터 다 시도해요 — 자동사 문장(n_iverb)을 최대한 채우되, 마침표 수가 P 를 넘으면 하나씩 줄여요.") },
      { hi: [27, 31], bubble: t(E,
        "If even n_iverb = 0 doesn't fit, skip this n_tverb. Otherwise spend the comma budget C on extra nouns, total up the words, and keep the best n_tverb so far.",
        "n_iverb = 0 이어도 안 맞으면 이 n_tverb 는 건너뛰어요.\n아니면 쉼표 예산 C 로 문장에 명사를 더 붙이고, 단어 총합을 구해서 지금까지 중 제일 좋은 n_tverb 를 저장해요.") },
      { hi: [33, 36], bubble: t(E,
        "Now rebuild the actual sentences for the best n_tverb. Pop nouns and verbs from the back of each list — popping removes them so the same word is never reused.",
        "가장 좋은 n_tverb 로 실제 문장을 다시 만들어요.\n명사·동사를 리스트 끝에서 꺼내 써요 — pop 은 그 단어를 지워서, 같은 단어를 두 번 쓰지 않게 해요.") },
      { hi: [37, 39], bubble: t(E,
        "There's still comma budget left, so tack extra nouns onto the last transitive sentence with commas until C runs out.",
        "쉼표 예산이 남아 있으면, 마지막 타동사 문장에 명사를 쉼표로 계속 이어 붙여요 — C 가 다 떨어질 때까지.") },
      { hi: [40, 41], bubble: t(E,
        "Combine pairs of basic sentences with conjunctions into compound sentences, then add a period to every sentence.",
        "기본 문장을 둘씩 접속사로 이어 복문을 만들고, 모든 문장 끝에 마침표를 붙여요.") },
      { hi: [42, 45], bubble: t(E,
        "Save this case's word count and sentence, then after all cases, print everything at once.",
        "이번 케이스의 단어 수와 문장을 저장해 두고, 모든 케이스가 끝나면 한 번에 출력해요.") },
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


export function downloadMooLangPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
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

