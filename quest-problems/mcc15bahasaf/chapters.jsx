import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc15BahasaSections } from "./components";

const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };
const MONO = "'JetBrains Mono',monospace";

const VOWELS = "aeiou";

/* Demo sentence for the concept sim — has BOTH a vowel-start syllable ("a")
   and consonant-start syllables ("cu", "ca", "ha", "ri"). */
const DEMO_SENTENCE = "cu/a/ca ha/ri";
const DEMO_WORDS = DEMO_SENTENCE.split(" ").map((w) => w.split("/"));
const DEMO_FLAT = [];
DEMO_WORDS.forEach((w, wi) => w.forEach((syl, si) => DEMO_FLAT.push({ syl, wi, first: si === 0 })));

const echoOf = (syl) => (VOWELS.includes(syl[0]) ? "f" + syl : "f" + syl.slice(1));

/* Output built from the first (n+1) syllables. */
function partialOutput(n) {
  let out = "";
  for (let i = 0; i <= n && i < DEMO_FLAT.length; i++) {
    const { syl, wi, first } = DEMO_FLAT[i];
    if (first && wi > 0) out += " ";
    out += syl + echoOf(syl);
  }
  return out;
}

/* ─────────────────────────────────────────────────────────────
   Concept sim: walk ONE syllable at a time and watch its echo.
   Teaches: the whole problem is a single per-syllable rule —
   consonant start → swap the first letter for 'f';
   vowel start    → stick an 'f' in front.
   ───────────────────────────────────────────────────────────── */
function SyllableEchoSim({ E }) {
  const [i, setI] = useState(0);
  const cur = DEMO_FLAT[i];
  const isVowelStart = VOWELS.includes(cur.syl[0]);
  const echo = echoOf(cur.syl);

  const chip = (syl, idx) => (
    <span key={idx} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "3px 8px", borderRadius: 8, fontFamily: MONO,
      fontSize: 14, fontWeight: 800,
      border: idx === i ? "2px solid #dc2626" : "1.5px solid #fecaca",
      background: idx === i ? "#dc2626" : idx < i ? "#fee2e2" : "#fff",
      color: idx === i ? "#fff" : "#991b1b",
    }}>{syl}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
          🔤 {t(E, "One syllable, one echo", "음절 하나 → 메아리 하나")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "The slashes already split the sentence into syllables. Each syllable gets an echo glued right after it. Step through them one by one.",
            "슬래시가 이미 문장을 음절로 나눠줬어요. 음절마다 바로 뒤에 메아리가 하나씩 붙어요. 한 음절씩 넘겨봐요.")}
        </div>

        {/* all syllables laid out, words separated by a gap */}
        <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "the sentence, cut into syllables", "음절로 잘린 문장")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5, marginBottom: 14 }}>
          {DEMO_FLAT.map((s, idx) => (
            <span key={idx} style={{ ...NW, display: "inline-flex", alignItems: "center", gap: 5 }}>
              {s.first && idx > 0 && (
                <span style={{ width: 12, textAlign: "center", color: "#cbd5e1", fontWeight: 800 }}>·</span>
              )}
              {chip(s.syl, idx)}
            </span>
          ))}
        </div>

        {/* stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={navBtn(i === 0)}>◀</button>
          <span style={{ fontSize: 12, color: "#7f1d1d", fontWeight: 700, minWidth: 74, textAlign: "center" }}>
            {t(E, "syllable ", "음절 ")}{i + 1} / {DEMO_FLAT.length}
          </span>
          <button onClick={() => setI(Math.min(DEMO_FLAT.length - 1, i + 1))} disabled={i === DEMO_FLAT.length - 1} style={navBtn(i === DEMO_FLAT.length - 1)}>▶</button>
        </div>

        {/* the three-line breakdown for the current syllable */}
        <div style={{ background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 8, ...NW }}>
            <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, minWidth: 52 }}>{t(E, "syllable", "음절")}</span>
            <b style={{ fontFamily: MONO, fontSize: 17, color: "#dc2626" }}>{cur.syl}</b>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, minWidth: 52, flexShrink: 0 }}>{t(E, "first letter", "첫 글자")}</span>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, ...KA }}>
              <b style={{ fontFamily: MONO, color: "#7c3aed" }}>{cur.syl[0]}</b>
              {isVowelStart
                ? t(E, " is a VOWEL → there is no consonant to swap, so put 'f' in front of the whole syllable.",
                     " 는 모음이에요 → 갈아낄 자음이 없으니, 음절 통째로 앞에 'f' 를 붙여요.")
                : t(E, " is a CONSONANT → swap just that first letter for 'f'.",
                     " 는 자음이에요 → 그 첫 글자만 'f' 로 갈아껴요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "baseline", ...NW }}>
            <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, minWidth: 52 }}>{t(E, "echo", "메아리")}</span>
            <span style={{ fontFamily: MONO, fontSize: 15, color: C.text }}>
              <b style={{ color: "#dc2626" }}>{cur.syl}</b>
              <span style={{ color: "#94a3b8" }}> + </span>
              <b style={{ color: "#7c3aed" }}>{echo}</b>
              <span style={{ color: "#94a3b8" }}> = </span>
              <b style={{ color: "#15803d", fontSize: 17 }}>{cur.syl + echo}</b>
            </span>
          </div>
        </div>

        {/* running output */}
        <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "output so far (no slashes!)", "지금까지 만들어진 출력 (슬래시 없이!)")}
        </div>
        <div style={{ background: "#0f172a", color: "#fca5a5", padding: "10px 12px", borderRadius: 8,
          fontFamily: MONO, fontSize: 13.5, fontWeight: 800, lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre" }}>
          {partialOutput(i)}
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "Syllables inside a word are glued together with no slash; the space between words stays. That is the whole output rule.",
            "한 단어 안의 음절들은 슬래시 없이 그냥 붙이고, 단어 사이 공백은 그대로 둬요. 출력 규칙은 이게 전부예요.")}
        </div>
      </div>
    </div>
  );
}
const navBtn = (disabled) => ({
  width: 34, height: 30, borderRadius: 8, border: "1px solid #fca5a5",
  background: disabled ? "#f8fafc" : "#fff", color: disabled ? "#cbd5e1" : "#dc2626",
  fontSize: 14, fontWeight: 800, cursor: disabled ? "default" : "pointer", lineHeight: 1,
});

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "sentence = input()",
  "vowels = \"aeiou\"",
  "",
  "new_words = []",
  "for word in sentence.split(\" \"):",
  "    new_word = \"\"",
  "    for syl in word.split(\"/\"):",
  "        if syl[0] in vowels:",
  "            echo = \"f\" + syl        # 자음이 없어요 → f 를 앞에 붙여요",
  "        else:",
  "            echo = \"f\" + syl[1:]    # 첫 자음을 f 로 갈아끼워요",
  "        new_word += syl + echo      # 음절 + 메아리",
  "    new_words.append(new_word)",
  "",
  "print(\" \".join(new_words))",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15BahasaCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Bahasa F is a Malay secret language. Every syllable gets an echo right after it: the first consonant of the syllable becomes 'f'.\nThe sentence arrives with its syllables already separated by slashes.",
        "Bahasa F 는 말레이어에서 나온 비밀 언어예요. 음절마다 바로 뒤에 메아리가 붙어요: 그 음절의 첫 자음이 'f' 로 바뀐 소리예요.\n문장은 음절이 이미 슬래시로 나뉜 채로 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🗣️"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Bahasa F</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P3</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Translate a Malay sentence into Bahasa F and print it without the slashes.",
                "말레이어 문장을 Bahasa F 로 번역해서, 슬래시 없이 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The sentence is given with each syllable separated by a slash ", "문장은 음절마다 슬래시 ")}
                  <b style={{ fontFamily: MONO, color: "#dc2626" }}>/</b>
                  {t(E, ", and words separated by spaces.", " 로 나뉘어 있고, 단어 사이는 공백이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For each syllable: change ", "음절마다: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "the first consonant to 'f'", "첫 자음을 'f' 로")}</b>
                  {t(E, " and add that right after the syllable.", " 바꾼 것을 음절 바로 뒤에 붙여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If the syllable has no consonant, just add 'f' before it — and again add that right after the syllable.", "음절에 자음이 없으면, 그냥 앞에 'f' 를 붙인 것을 음절 바로 뒤에 붙여요.")}
                  {" "}
                  <span style={{ fontFamily: MONO, color: "#7c3aed", fontWeight: 700 }}>a → afa</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The 21 consonants are everything that is not a, e, i, o, u — ", "자음 21개는 a, e, i, o, u 를 뺀 나머지 전부예요 — ")}
                  <b style={{ color: "#b91c1c" }}>{t(E, "yes, 'y' is a consonant too", "'y' 도 자음이에요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fecaca" }}>
                <span style={{ color: "#b91c1c", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#b91c1c" }}>{t(E, "Bahasa F sentence, without slashes, all lowercase", "Bahasa F 문장 — 슬래시 없이, 전부 소문자")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px dashed #fca5a5", borderRadius: 10, padding: "10px 14px", textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11.5, color: C.dim, marginBottom: 4 }}>
              {t(E, "the classic example", "대표 예시")}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 800 }}>
              <span style={{ color: "#dc2626" }}>sa/ya</span>
              <span style={{ color: "#94a3b8" }}> → </span>
              <span style={{ color: "#15803d" }}>safayafa</span>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "The input is ONE line — the whole sentence, slashes and spaces included. The output is one line too, with the slashes gone.",
        "입력은 딱 한 줄이에요 — 슬래시와 공백까지 포함한 문장 전체. 출력도 한 줄이고, 슬래시는 사라져요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
              📥 {t(E, "Input / Output", "입력 / 출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "One sentence, at most 5,000 characters — slashes and spaces included.", "문장 한 줄, 길이 최대 5,000 — 슬래시와 공백 포함.")}</div>
              <div>• {t(E, "No dots or other special characters. All letters lowercase.", "마침표나 특수문자는 없어요. 글자는 전부 소문자.")}</div>
              <div>• {t(E, "Output: the Bahasa F sentence, WITHOUT slashes, lowercase.", "출력: Bahasa F 문장 — 슬래시 없이, 소문자로.")}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div style={{ overflowX: "auto", whiteSpace: "pre" }}>cu/a/ca ha/ri i/ni san/gat pa/nas</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fca5a5", borderRadius: 10, padding: "10px 14px", fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800, overflowX: "auto", whiteSpace: "pre" }}>cufuafacafa hafarifi ifinifi sanfangatfat pafanasfas</div>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "The first syllable \"cu\" becomes \"cufu\", and the second syllable \"a\" becomes \"afa\".",
              "첫 음절 \"cu\" 는 \"cufu\" 로, 두 번째 음절 \"a\" 는 \"afa\" 로 번역돼요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Walk through the syllables one at a time and watch each echo appear.",
        "음절을 하나씩 넘기면서 메아리가 생기는 걸 봐요."),
      content: <SyllableEchoSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "A syllable that starts with a consonant keeps its own letters, and the echo is the same syllable with that first consonant swapped for 'f'.",
        "자음으로 시작하는 음절은 자기 글자를 그대로 두고, 메아리는 그 첫 자음만 'f' 로 갈아낀 소리예요."),
      question: t(E,
        "What does the syllable \"ri\" become in Bahasa F?",
        "음절 \"ri\" 를 Bahasa F 로 바꾸면?"),
      options: ["rifri", "rifi", "firi", "rif"],
      correct: 1,
      explain: t(E,
        "\"ri\" starts with the consonant 'r', so the echo is \"fi\" — the first consonant swapped for 'f'. \"ri\" + \"fi\" = \"rifi\".",
        "\"ri\" 는 자음 'r' 로 시작 → 첫 자음을 f 로 갈아낀 \"fi\" 가 메아리. \"ri\" + \"fi\" = \"rifi\"."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15BahasaCh2(E, lang = "py") {
  return [
    // 2-1: plan
    {
      type: "reveal",
      narr: t(E,
        "Nothing here is slow — the sentence is at most 5,000 characters. The only thing that can go wrong is the rule itself. So cut the sentence down to single syllables, and get that one small rule exactly right.",
        "여기서 느려질 건 없어요 — 문장은 길어야 5,000 글자니까요. 틀릴 수 있는 건 규칙 그 자체뿐이에요. 그러니 문장을 음절 하나까지 쪼개고, 그 작은 규칙 하나를 정확히 맞히면 돼요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                💡 {t(E, "The slashes already did the hard part", "슬래시가 이미 다 나눠줬어요")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E, "Split the sentence by spaces → words. Split each word by '/' → syllables. Two splits and the sentence is in pieces.",
                     "문장을 공백으로 쪼개면 → 단어. 단어를 '/' 로 쪼개면 → 음절. 나누기는 split 두 번이면 끝이에요.")}
              </div>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                💡 {t(E, "Get the one-syllable rule exactly right", "음절 하나짜리 규칙만 정확히")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                {t(E, "Consonant start → echo = 'f' + the rest. Vowel start → echo = 'f' + the whole syllable. Then glue: syllable + echo. Everything else is just putting the pieces back together.",
                     "자음으로 시작 → 메아리 = 'f' + 나머지. 모음으로 시작 → 메아리 = 'f' + 음절 전체. 그다음 붙이기: 음절 + 메아리. 나머지는 조각을 다시 이어 붙이는 일뿐이에요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc15BahasaSections(E),
    },
  ];
}
