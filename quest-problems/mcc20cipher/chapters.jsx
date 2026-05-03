import { C, t } from "@/components/quest/theme";
import { getMcc20CipherSections } from "./components";

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
        "A cipher maps each lowercase letter to another. Given the cipher key, decode the encoded message by reversing the mapping.",
        "암호가 각 소문자를 다른 문자로 매핑해. 암호 키가 주어지면 매핑을 뒤집어서 인코딩된 메시지를 해독해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd10"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Cipher</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Build encode and decode dictionaries from the cipher. To decode, reverse the mapping.",
              "핵심: 암호에서 인코딩/디코딩 딕셔너리 구축. 디코딩은 매핑을 뒤집어.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "If cipher maps a->b, b->c. Encoding 'ab' gives 'bc'. To decode 'bc' back, we get 'ab'. How many letters in the alphabet?",
        "암호가 a->b, b->c로 매핑. 'ab' 인코딩하면 'bc'. 'bc'를 디코딩하면 'ab'. 알파벳은 몇 글자?"),
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
      type: "input",
      narr: t(E,
        "How many letters in the English alphabet?",
        "영어 알파벳은 몇 글자?"),
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
        "Build decode map by reversing the cipher. O(N) to decode the string.",
        "암호를 뒤집어 디코드 맵 구축. 문자열 디코딩 O(N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Create encode/decode dictionaries from the 26-char cipher key. Iterate through the encoded string and map each character back.",
              "26자 암호 키에서 인코드/디코드 딕셔너리 생성. 인코딩된 문자열을 순회하며 각 문자를 역매핑.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20CipherSections(E),
    },
  ];
}
