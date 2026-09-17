import { C, t } from "@/components/quest/theme";
import { getMadSciSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "A = input().strip()",
  "B = input().strip()",
  "",
  "# Count contiguous blocks where A[i] != B[i]",
  "flips = 0",
  "in_diff = False",
  "for i in range(N):",
  "    if A[i] != B[i]:",
  "        if not in_diff:",
  "            flips += 1",
  "            in_diff = True",
  "    else:",
  "        in_diff = False",
  "",
  "print(flips)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeMadSciCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two strings A and B of length N over {H, G} are given. In one 'flip' operation you choose any contiguous substring of B and swap H↔G inside it.\nPrint the MINIMUM number of flip operations to make B equal A.",
        "B 를 뒤집어서 A 와 같게 만드는 최소 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\uddea"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Mad Scientist</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of substring flips on B to make B equal A.",
                "B 를 A 와 같게 만드는 데 필요한 최소 뒤집기 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two ", "두 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "strings A and B of length N", "길이 N 의 문자열 A, B")}</b>
                  {t(E, " over the alphabet {H, G} are given.",
                        " ({H, G} 로 구성) 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One flip operation: choose a ", "한 번 뒤집을 때는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "contiguous substring of B", "B 의 연속 부분 문자열")}</b>
                  {t(E, " and swap H ↔ G inside it.",
                        " 을 골라서 그 안의 H 와 G 를 모두 맞바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of flips to make B equal A", "B 를 A 와 같게 만드는 최소 뒤집기 수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "A = \"HH\", B = \"GG\".\nBoth positions differ, forming 1 contiguous block.\nHow many flips?", "두 자리가 모두 달라서 다른 구간이 하나예요. 몇 번 뒤집을까요?"),
      question: t(E,
        "A = \"HH\", B = \"GG\". Min flips to make B equal A?",
        "A = \"HH\", B = \"GG\" 예요. B 를 A 로 만들려면 최소 몇 번 뒤집을까요?"),
      options: [
        t(E, "1 (flip entire B)", "1 (B 전체를 뒤집기)"),
        t(E, "2 (flip each character)", "2 (글자를 하나씩 뒤집기)"),
        t(E, "0 (already equal)", "0 (이미 같음)"),
      ],
      correct: 0,
      explain: t(E,
        "Both positions differ and form one contiguous block. One flip of the entire string fixes it.",
        "두 자리가 모두 달라서 다른 구간이 하나예요.\n문자열 전체를 한 번만 뒤집으면 A 와 같아져요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A = \"HGH\", B = \"GHG\".\nAll 3 positions differ.\nThey form 1 contiguous block of differences.\nHow many flips?", "세 자리가 모두 달라서 다른 구간이 하나예요. 몇 번 뒤집을까요?"),
      question: t(E,
        "A = \"HGH\", B = \"GHG\". Min flips?",
        "A = \"HGH\", B = \"GHG\" 예요. 최소 몇 번 뒤집을까요?"),
      hint: t(E,
        "Count the contiguous blocks where A and B differ.",
        "A 와 B 가 서로 다른 구간이 몇 개인지 세어 봐요."),
      answer: 1,
    },
    // 1-4: Sim — scan the rows, count mismatch runs
    {
      type: "sim",
      narr: t(E,
        "Now play with it. Pick a preset, then click 'Scan next' to walk through one position at a time. Watch the ✗ marks light up — each contiguous run of ✗ is exactly one flip.",
        "한 칸씩 살펴보며 ✗ 가 몇 구간으로 뭉치는지 봐요."),
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeMadSciCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Each contiguous block where A[i] ≠ B[i] takes exactly one flip to fix. So count those differing blocks. Sections build it one piece at a time.",
        "A 와 B 가 다른 구간 하나는 한 번 뒤집으면 해결돼요."),
      sections: getMadSciSections(E),
    },
  ];
}
