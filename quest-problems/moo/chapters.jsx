import { C, t } from "@/components/quest/theme";
import { getMooSections, MooExplorer } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeMooCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A 'moo' is a 3-letter substring XYY where the last two letters are the SAME and the first is DIFFERENT. The recording might have ONE corrupted character — find all moos that could appear ≥ F times in some valid original.",
        "'moo' 는 3 글자 부분문자열 XYY — 뒤 두 글자 같고 첫 글자 다름. 녹음이 한 글자 오타일 수도 있음 — 어떤 가능한 원본에서 ≥ F 번 등장하는 moo 모두 찾기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#9333ea" }}>It's Mooin' Time</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO December 2024 Bronze #3</div>
          </div>

          <div style={{ background: "#faf5ff", border: "1px solid #d8b4fe", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#581c87", marginBottom: 8 }}>
              📖 {t(E, "Definition", "정의")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #d8b4fe", borderRadius: 8, padding: "10px 12px", marginBottom: 8, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ fontWeight: 600, color: "#9333ea", marginBottom: 4 }}>
                {t(E, "What's a 'moo'?", "moo 가 뭐?")}
              </div>
              {t(E, "A 3-character substring of pattern X Y Y, where Y is repeated and X ≠ Y.",
                    "패턴 X Y Y 의 3 글자 부분문자열, Y 가 두 번 반복되고 X ≠ Y.")}
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#7e22ce" }}>
                Examples: moo, baa, qqq? NO (q = q = q), abb ✓, abc? NO
              </div>
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #d8b4fe", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ fontWeight: 600, color: "#9333ea", marginBottom: 4 }}>
                {t(E, "The catch — possibly 1 corrupted character", "함정 — 한 글자 오타 가능성")}
              </div>
              {t(E, "The string s might have UP TO ONE position with a wrong character. So the original could be s, OR s with one position changed.",
                    "문자열 s 의 한 자리가 잘못됐을 수 있음. 원본은 s 그대로 또는 한 자리만 다른 s.")}
            </div>

            <div style={{ marginTop: 8, padding: "8px 10px", background: "#fff", border: "1.5px solid #d8b4fe", borderRadius: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <b style={{ color: "#15803d" }}>{t(E, "Output", "출력")}:</b>{" "}
              {t(E, "First line: count of moos that could occur ≥ F times in some original. Following lines: those moos sorted lexicographically.",
                    "첫 줄: 어떤 원본에서 ≥ F 번 등장 가능한 moo 개수. 다음 줄들: 그 moo 들을 사전순 정렬.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#f5f3ff", border: "1px dashed #c4b5fd", borderRadius: 8, fontSize: 11.5, color: "#5b21b6", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>3 ≤ N ≤ 20000</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ F ≤ N</code>
            </div>
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Sample 1: s = 'zzmoozzmoo', F=2. 'moo' appears 2 times directly → answer = 1, [moo].",
        "샘플 1: s = 'zzmoozzmoo', F=2. 'moo' 가 직접 2 번 등장 → 답 = 1, [moo]."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#9333ea", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Three official samples", "공식 샘플 3 개")}
          </div>

          {[
            { input: "10 2\nzzmoozzmoo", output: "1\nmoo" },
            { input: "17 2\nmomoobaaaaaqqqcqq", output: "3\naqq\nbaa\ncqq" },
            { input: "3 1\nooo", output: "25\naoo\nboo\n…\nzoo" },
          ].map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#92400e", marginBottom: 4 }}>{t(E, `Sample ${i+1} INPUT`, `샘플 ${i+1} 입력`)}</div>
                <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#7c2d12", margin: 0, whiteSpace: "pre" }}>{s.input}</pre>
              </div>
              <div style={{ background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#15803d", marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
                <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#166534", margin: 0, whiteSpace: "pre" }}>{s.output}</pre>
              </div>
            </div>
          ))}

          <div style={{ background: "#faf5ff", border: "1px solid #d8b4fe", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#581c87", marginBottom: 6 }}>
              🔍 {t(E, "Sample 3 — many moos with 1 edit", "샘플 3 — 한 번의 수정으로 많은 moo")}
            </div>
            {t(E, "s = \"ooo\", F=1. The original could have ANY single character changed at any position. By changing s[0] to 'a', 'b', ..., 'z' (excluding 'o'), we get \"aoo\", \"boo\", ..., \"zoo\" — all valid moos. 25 distinct moos (all letters except 'o').",
                  "s = \"ooo\", F=1. 한 자리를 어떤 글자로든 바꿀 수 있음. s[0] 을 'a', 'b', ..., 'z' (단 'o' 제외) 로 바꾸면 \"aoo\", \"boo\", ..., \"zoo\" — 모두 유효 moo. 서로 다른 moo 25 개.")}
          </div>
        </div>),
    },

    {
      type: "reveal",
      narr: t(E,
        "Try the explorer. Pick a string and F, see which moos qualify (with or without one edit).",
        "Explorer 시도. 문자열과 F 골라서 어떤 moo 가 자격 있는지 보기 (수정 없이 or 한 번)."),
      content: (<MooExplorer E={E} />),
    },

    {
      type: "quiz",
      narr: t(E,
        "Think: a single edit at position i can affect AT MOST 3 substring windows (i-2, i-1, i as starting positions).",
        "한 자리 수정은 최대 3 개 윈도우에 영향 (시작 위치 i-2, i-1, i)."),
      question: t(E,
        "s = 'mok', F=1. After 1 edit, can we make 'moo' appear?",
        "s = 'mok', F=1. 한 번 수정으로 'moo' 등장 가능?"),
      options: [
        t(E, "Yes — change s[2] from 'k' to 'o'", "예 — s[2] 의 'k' 를 'o' 로"),
        t(E, "No — too many edits needed", "아니요 — 수정 너무 많이 필요"),
      ],
      correct: 0,
      explain: t(E,
        "Original 'mok'. Change s[2] = 'k' to 'o' → 'moo'. That's a valid moo (m ≠ o, oo). Single edit suffices.",
        "원본 'mok'. s[2] = 'k' 를 'o' 로 → 'moo'. 유효 moo (m ≠ o, oo). 한 번 수정 충분."),
    },

    {
      type: "input",
      narr: t(E,
        "s = 'aaa', F = 1. How many distinct moos can occur with at most 1 edit?",
        "s = 'aaa', F = 1. 한 번 수정으로 발생 가능한 서로 다른 moo 수?"),
      question: t(E,
        "Distinct moos for 'aaa', F=1?",
        "'aaa', F=1 의 서로 다른 moo 수?"),
      hint: t(E,
        "Change s[0] from 'a' to any other letter c gives 'caa' — valid moo with X=c, Y=a. 25 letters except 'a' → 25 moos.",
        "s[0] 을 'a' 가 아닌 c 로 바꾸면 'caa' — X=c, Y=a 유효. 'a' 외 25 글자 → 25 moo."),
      answer: 25,
    },
  ];
}

export function makeMooCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Plan: count occurrences of every moo in s, then for each (i, c) edit, compute the count delta and check if any moo crosses F.",
        "계획: s 의 모든 moo 발생 횟수 세고, 각 (i, c) 수정마다 카운트 변화 계산해서 F 넘는 moo 확인."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },

    ...getMooSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the solution step by step.", "단계별로 솔루션 작성.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
