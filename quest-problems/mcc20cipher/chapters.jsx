import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc20CipherSections } from "./components";

// Sample cipher: a permutation of the alphabet used for the deep-audit sim
const SAMPLE_CIPHER = "qwertyuiopasdfghjklzxcvbnm";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function CipherDeepAuditSim({ E }) {
  const [encChar, setEncChar] = useState("q");
  const decode = {};
  const encode = {};
  for (let i = 0; i < 26; i++) {
    encode[ALPHABET[i]] = SAMPLE_CIPHER[i];
    decode[SAMPLE_CIPHER[i]] = ALPHABET[i];
  }
  const plain = decode[encChar] ?? "?";
  const cipherIdx = SAMPLE_CIPHER.indexOf(encChar);

  const cellBase = {
    width: 22, height: 26, display: "inline-flex", alignItems: "center",
    justifyContent: "center", fontFamily: "'JetBrains Mono',monospace",
    fontSize: 12, border: "1px solid #6ee7b7", background: "#fff",
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 8 }}>
          🔬 {t(E, "Deep-Audit: trace the decode lookup", "딥-오딧: 디코드 조회 추적")}
        </div>
        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 10 }}>
          {t(E,
            "Pick any encoded letter. Watch how decode[c] gives back the plaintext letter — that is the whole algorithm.",
            "암호 글자를 골라봐. decode[c]가 어떻게 평문 글자를 돌려주는지 봐 — 그게 알고리즘의 전부야.")}
        </div>

        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#065f46", fontWeight: 600, marginBottom: 4 }}>
            {t(E, "plain (a–z)", "평문 (a–z)")}
          </div>
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {ALPHABET.split("").map((ch, i) => (
              <span key={"p" + i} style={{ ...cellBase, color: "#065f46", fontWeight: 600 }}>{ch}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#065f46", fontWeight: 600, margin: "6px 0 4px" }}>
            {t(E, "cipher key (encoded for each plain letter)", "암호 키 (각 평문 글자의 인코딩)")}
          </div>
          <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {SAMPLE_CIPHER.split("").map((ch, i) => {
              const hit = i === cipherIdx;
              return (
                <span key={"c" + i} style={{
                  ...cellBase,
                  color: hit ? "#fff" : "#7c3aed",
                  background: hit ? "#059669" : "#fff",
                  borderColor: hit ? "#059669" : "#6ee7b7",
                  fontWeight: 700,
                }}>{ch}</span>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <label style={{ fontSize: 12, color: "#065f46", fontWeight: 600 }}>
            {t(E, "encoded char:", "암호 글자:")}
          </label>
          <input
            type="text"
            value={encChar}
            maxLength={1}
            onChange={(e) => {
              const v = e.target.value.toLowerCase();
              if (v === "" || /^[a-z]$/.test(v)) setEncChar(v || "");
            }}
            style={{
              width: 44, padding: "4px 8px", fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
              border: "1.5px solid #059669", borderRadius: 6, textAlign: "center", fontWeight: 700,
              color: "#7c3aed", background: "#fff",
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {"qweasd".split("").map(ch => (
              <button key={ch} onClick={() => setEncChar(ch)} style={{
                padding: "3px 8px", fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
                border: "1px solid #6ee7b7", borderRadius: 4, background: encChar === ch ? "#059669" : "#fff",
                color: encChar === ch ? "#fff" : "#065f46", cursor: "pointer", fontWeight: 600,
              }}>{ch}</button>
            ))}
          </div>
        </div>

        <div style={{
          background: "#0f172a", color: "#f8fafc", padding: 12, borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7,
        }}>
          <div><span style={{ color: "#8b949e" }}># {t(E, "step 1: which plain letter encoded to '", "1단계: 어느 평문 글자가 '")}{encChar || "?"}{t(E, "'?", "'로 인코딩됐을까?")}</span></div>
          <div>
            decode[<span style={{ color: "#34d399" }}>'{encChar || "?"}'</span>]
            {" = "}
            <span style={{ color: "#fbbf24", fontWeight: 700 }}>'{plain}'</span>
          </div>
          <div style={{ marginTop: 4 }}>
            <span style={{ color: "#8b949e" }}># {t(E, "step 2: confirm with the encode table", "2단계: 인코드 표로 확인")}</span>
          </div>
          <div>
            encode[<span style={{ color: "#fbbf24" }}>'{plain}'</span>]
            {" = "}
            <span style={{ color: "#34d399", fontWeight: 700 }}>'{plain !== "?" ? encode[plain] : "?"}'</span>
            {plain !== "?" && encode[plain] === encChar && (
              <span style={{ color: "#6ee7b7", marginLeft: 8 }}>✓ {t(E, "round-trip OK", "왕복 일치")}</span>
            )}
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: C.dim, lineHeight: 1.55 }}>
          {t(E,
            "Why two dicts? encode[plain]→cipher is for sending; decode[cipher]→plain is for receiving. We only need decode here, but seeing both makes the inverse obvious.",
            "왜 딕셔너리가 두 개? encode[평문]→암호는 보낼 때, decode[암호]→평문은 받을 때. 이 문제는 decode만 있으면 되지만, 둘 다 보면 역연산이 한눈에 보여.")}
        </div>
      </div>
    </div>
  );
}

export const SOLUTION_CODE = [
  "cipher = input().strip()",
  "s = input().strip()",
  "",
  "# Build mapping: cipher[i] maps chr(ord('a')+i) -> cipher[i]",
  "encode = {}",
  "decode = {}",
  "for i in range(26):",
  "    orig = chr(ord('a') + i)",
  "    encode[orig] = cipher[i]",
  "    decode[cipher[i]] = orig",
  "",
  "# Decode the string",
  "result = ''",
  "for c in s:",
  "    result += decode.get(c, c)",
  "",
  "print(result)",
];

export function makeMcc20CipherCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A substitution cipher maps each lowercase letter to another (a permutation of the alphabet). You're given the cipher key (the encoded letter for each plain letter) and an encoded message.\nPrint the decoded plaintext message.",
        "치환 암호가 각 소문자를 다른 소문자에 대응시켜요 (알파벳의 순열). 평문 글자별로 어떤 글자로 인코딩되는지 알려주는 암호 키와 인코딩된 메시지가 주어져요.\n원래 평문 메시지를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd10"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Cipher</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "substitution cipher", "치환 암호")}</b>
                  {t(E, " maps each lowercase letter to another (a permutation of the alphabet).",
                        " 가 각 소문자를 다른 소문자에 대응시켜요 (알파벳의 순열).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "cipher key and an encoded message", "암호 키와 인코딩된 메시지")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "decoded plaintext message", "원래 평문 메시지")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "If cipher maps a->b, b->c.\nEncoding 'ab' gives 'bc'.\nTo decode 'bc' back, we get 'ab'.\nHow many letters in the alphabet?", "암호가 a->b, b->c로 매핑. 'ab' 인코딩하면 'bc'. 'bc'를 디코딩하면 'ab'. 알파벳은 몇 글자?"),
      question: t(E,
        "How many lowercase letters are in the English alphabet?",
        "영어 알파벳 소문자는 몇 글자?"),
      options: [
        t(E, "26", "26"),
        t(E, "24", "24"),
        t(E, "25", "25"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The English alphabet has 26 lowercase letters (a-z).",
        "맞아! 영어 알파벳은 26개 소문자 (a-z)."),
    },
    {
      type: "reveal",
      narr: t(E,
        "Let's audit the cipher. Type any encoded letter, then watch decode give back the plain letter — and round-trip with encode to confirm.",
        "암호를 직접 살펴보자. 암호 글자를 입력하면 decode가 평문 글자를 돌려주고, encode로 왕복해서 확인해."),
      content: <CipherDeepAuditSim E={E} />,
    },
    {
      type: "input",
      narr: t(E,
        "How many letters in the English alphabet?", "영어 알파벳은 몇 글자?"),
      question: t(E,
        "Number of lowercase letters (a-z) = ?",
        "소문자 수 (a-z) = ?"),
      hint: t(E, "a, b, c, ..., z = 26 letters", "a, b, c, ..., z = 26글자"),
      answer: 26,
    },
  ];
}

export function makeMcc20CipherCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Build a reverse mapping (cipher_letter → plain_letter) from the 26-char key, then translate each char of the encoded message.",
        "26 자 키에서 역매핑 (암호 글자 → 평문 글자) 생성, 인코딩된 메시지의 각 문자를 변환."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20CipherSections(E),
    },
  ];
}
