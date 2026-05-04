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
        "A password is encoded as a circular rotation.\nGiven two encoded messages, determine if they could be rotations of the same original password.", "비밀번호가 원형 회전으로 암호화돼. 두 개의 암호화된 메시지가 주어지면, 같은 원래 비밀번호의 회전인지 판별해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd10"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Secret</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P5</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: To check if b is a rotation of a,\nuse the classic trick: concatenate a with itself (a+a), then check if b is a contiguous subsequence of a+a.",
              "핵심: b가 a의 회전인지 확인하려면,\n클래식 트릭 사용: a를 자기 자신과 이어붙이고 (a+a), b가 a+a의 연속 부분 수열인지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The classic rotation check: if we concatenate array a with itself (a+a), any rotation of a will appear as a contiguous subarray.\nWhy does this work?", "클래식 회전 검사: 배열 a를 자기 자신과 이어붙이면 (a+a), a의 모든 회전이 연속 부분 배열로 나타나. 왜 이게 되는 걸까?"),
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
        "맞아! [1,2,3]이면, a+a = [1,2,3,1,2,3]. 회전 [2,3,1]과 [3,1,2] 모두 a+a의 부분 배열이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "[1,2,3] and [2,3,1] - is [2,3,1] a rotation of [1,2,3]? Answer 1 for Yes, 0 for No.", "[1,2,3]과 [2,3,1] - [2,3,1]은 [1,2,3]의 회전인가? Yes면 1, No면 0을 입력해."),
      question: t(E,
        "[1,2,3] and [2,3,1]: same rotation? (1=Yes, 0=No)",
        "[1,2,3]과 [2,3,1]: 같은 회전? (1=Yes, 0=No)"),
      hint: t(E,
        "Shift [1,2,3] left by 1: [2,3,1]. Yes, it's a rotation!",
        "[1,2,3]을 왼쪽으로 1칸 이동: [2,3,1]. 맞아, 회전이야!"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSecretCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Concatenate a with itself and search for b.\nNaive search is O(N^2), but KMP can do O(N).\nFor this problem, O(N^2) is fine.", "a를 자기 자신과 이어붙이고 b를 찾아. 단순 검색은 O(N^2)이지만, KMP로 O(N) 가능. 이 문제에서는 O(N^2)이면 충분해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N\u00b2)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Concatenate a+a (length 2N).\nCheck each starting position i (0 to N-1) whether a+a[i:i+N] equals b. If any match found, output YES.",
              "a+a 이어붙이기 (길이 2N). 각 시작 위치 i (0 ~ N-1)에서 a+a[i:i+N]이 b와 같은지 확인.\n일치하면 YES 출력.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSecretSections(E),
    },
  ];
}
