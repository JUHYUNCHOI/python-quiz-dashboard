import { C, t } from "@/components/quest/theme";
import { getSecretSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "b = list(map(int, input().split()))",
  "",
  "# Check if b is a rotation of a",
  "# Classic trick: b is rotation of a iff",
  "# b appears as a subarray in a + a",
  "",
  "if len(a) != len(b):",
  "    print('NO')",
  "else:",
  "    doubled = a + a",
  "    found = False",
  "    for i in range(N):",
  "        if doubled[i:i+N] == b:",
  "            found = True",
  "            break",
  "    print('YES' if found else 'NO')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two strings A and B of equal length are given.\nDetermine if B is a CIRCULAR ROTATION of A — i.e., B can be obtained by cyclically shifting A by some amount. Print YES or NO.",
        "같은 길이의 두 문자열 A 와 B 가 주어져요.\nB 가 A 의 회전(한쪽 끝이 반대편으로)인지 — 즉 A 를 어떤 양만큼 돌려서 B 가 나오는지 — 판별해요. YES 또는 NO 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd10"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Secret</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Decide if string B is a circular rotation of string A — print YES or NO.", "문자열 B 가 A 의 회전인지 판별 — YES 또는 NO 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "Two strings A and B of equal length", "같은 길이의 두 문자열 A 와 B")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "YES if B is a circular rotation of A, else NO", "B 가 A 의 회전(한쪽 끝이 반대편으로)이면 YES, 아니면 NO")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The classic rotation check: if we concatenate array a with itself (a+a), any rotation of a will appear as a contiguous subarray.\nWhy does this work?", "클래식 회전 검사: 배열 a를 자기 자신과 이어붙이면 (a+a), a의 모든 회전이 연속 부분 배열로 나타나. 왜 이게 되는 걸까요?"),
      question: t(E,
        "Why does checking if b is in a+a work for rotation detection?",
        "b가 a+a에 있는지 확인하는 것이 왜 회전 검출에 효과적인가?"),
      options: [
        t(E, "a+a contains all rotations of a as subarrays", "a+a는 a의 모든 회전을 부분 배열로 포함해"),
        t(E, "a+a doubles the length, making comparison easier", "a+a는 길이를 두 배로 해서 비교가 쉬워져"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! For [1,2,3], a+a = [1,2,3,1,2,3]. Rotations [2,3,1] and [3,1,2] are both subarrays of a+a.",
        "맞아! [1,2,3]이면, a+a = [1,2,3,1,2,3]. 회전 [2,3,1]과 [3,1,2] 모두 a+a의 부분 배열이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "[1,2,3] and [2,3,1] - is [2,3,1] a rotation of [1,2,3]? Answer 1 for Yes, 0 for No.", "[1,2,3]과 [2,3,1] - [2,3,1]은 [1,2,3]의 회전인가? Yes면 1, No면 0을 입력해요."),
      question: t(E,
        "[1,2,3] and [2,3,1]: same rotation? (1=Yes, 0=No)",
        "[1,2,3]과 [2,3,1]: 같은 회전? (1=Yes, 0=No)"),
      hint: t(E,
        "Try shifting [1,2,3] left by 1 step — what do you get? Compare with [2,3,1].",
        "[1,2,3]을 왼쪽으로 1칸 밀면 무엇이 될까? [2,3,1]과 비교해봐요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Classic trick: B is a circular rotation of A iff B is a substring of A+A. So just check 'B in A+A'. Sections build it one piece at a time.",
        "고전 트릭: B 가 A 의 순환 회전 iff B 가 A+A 의 부분 문자열. 그러므로 'B in A+A' 만 확인. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSecretSections(E),
    },
  ];
}
