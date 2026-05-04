import { C, t } from "@/components/quest/theme";
import { getCheckupsSections } from "./components";

export const SOLUTION_CODE = [
  "from collections import Counter",
  "",
  "N = int(input())",
  "a = list(map(int, input().split()))   # FJ's breeds",
  "b = list(map(int, input().split()))   # Bessie's guesses",
  "",
  "# 1) Count current matches (same position, same breed)",
  "match = sum(1 for i in range(N) if a[i] == b[i])",
  "",
  "# 2) Max possible after rearranging b: bottleneck per breed",
  "ca = Counter(a)",
  "cb = Counter(b)",
  "max_match = sum(min(ca[x], cb.get(x, 0)) for x in ca)",
  "",
  "print(match)",
  "print(max_match)",
];

export function makeCheckupsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows with breed types.\nHe checks them against Bessie's list.\nHow many match?\nAnd what's the maximum possible?\n🐮", "FJ에게 N마리 소의 품종이 있어. 베시의 리스트와 비교해서 몇 개가 일치하는지, 최대 얼마나 일치시킬 수 있는지 찾자! 🐮"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🐮</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Cow Checkups</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #3</div>
          <div style={{ marginTop: 12, background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Two arrays a[] and b[] of length N. Count positions where a[i]==b[i]. Then find max matches by rearranging b.",
              "길이 N인 배열 a[]와 b[]. a[i]==b[i]인 위치 세기. 그리고 b를 재배열해서 최대 일치 찾기.")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Example: a=[1,2,3,1], b=[1,3,2,1].\nCurrent matches: positions 0 and 3 (both have 1).\nThat's 2 matches!", "예시: a=[1,2,3,1], b=[1,3,2,1]. 현재 일치: 위치 0과 3 (둘 다 1). 2개 일치!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 14 }}>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {[1,2,3,1].map((v, i) => (
                <div key={`a${i}`} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontWeight: 900,
                  background: [1,3,2,1][i] === v ? C.okBg : "#fff",
                  border: `2px solid ${[1,3,2,1][i] === v ? C.okBd : C.border}`,
                  color: [1,3,2,1][i] === v ? C.ok : C.text,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {[1,3,2,1].map((v, i) => (
                <div key={`b${i}`} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontWeight: 900,
                  background: [1,2,3,1][i] === v ? C.okBg : "#fff",
                  border: `2px solid ${[1,2,3,1][i] === v ? C.okBd : C.border}`,
                  color: [1,2,3,1][i] === v ? C.ok : C.text,
                }}>{v}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: C.dim, marginTop: 4 }}>
              {t(E, "Top: a[], Bottom: b[]. Green = match!", "위: a[], 아래: b[]. 초록 = 일치!")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "For max matches: count how many of each breed appear in a[] and b[].\nFor breed x, we can match min(count_a[x], count_b[x]) cows.", "최대 일치: 각 품종이 a[]와 b[]에 몇 번 나오는지 세고. 품종 x에 대해 min(count_a[x], count_b[x])마리를 매칭."),
      question: t(E,
        "a=[1,1,2], b=[1,2,2]. Max matches by rearranging b?",
        "a=[1,1,2], b=[1,2,2]. b를 재배열한 최대 일치는?"),
      options: ["1", "2", "3"],
      correct: 1,
      explain: t(E,
        "Breed 1: min(2,1)=1. Breed 2: min(1,2)=1. Total max = 2. (Can't get 3 since b only has one '1')",
        "품종 1: min(2,1)=1. 품종 2: min(1,2)=1. 최대 합 = 2. (b에 '1'이 1개뿐이라 3은 불가)"),
    },
    {
      type: "input",
      narr: t(E,
        "a=[3,3,3,3,3], b=[3,3,1,1,1]. How many current matches (same position)?", "a=[3,3,3,3,3], b=[3,3,1,1,1]. 현재 일치 수 (같은 위치)?"),
      question: t(E, "Matches at same positions?", "같은 위치에서 일치 수?"),
      answer: 2,
    },
    {
      type: "sim",
      narr: t(E,
        "Step through both phases: scanning a[i] vs b[i] for current matches, then Counter-based max.", "두 단계 따라가기: a[i] vs b[i] 스캔 (현재 일치), 그 다음 Counter 기반 최대."),
    },
  ];
}

export function makeCheckupsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Why min of each breed?\nIf a has 3 cows of breed 5 but b has only 1, you can match at most 1 (the bottleneck side).\nSum across all breeds.",
        "왜 각 품종의 min일까?\na에 품종 5가 3마리, b에 1마리뿐이면 최대 1마리만 매칭 (적은 쪽이 한계).\n모든 품종 합산."),
      content: (
        <div style={{ padding: 16 }}>
          {/* Concrete Counter comparison */}
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
              {t(E, "Example: a = [1,1,2,3,3,3]   b = [1,2,2,3,3,4]", "예시: a = [1,1,2,3,3,3]   b = [1,2,2,3,3,4]")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 30px 1fr 1fr", gap: 6, alignItems: "center", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <div style={{ fontWeight: 800, textAlign: "center", color: "#7f1d1d" }}>{t(E, "breed", "품종")}</div>
              <div style={{ fontWeight: 800, textAlign: "center", color: "#7f1d1d" }}>ca</div>
              <div></div>
              <div style={{ fontWeight: 800, textAlign: "center", color: "#7f1d1d" }}>cb</div>
              <div style={{ fontWeight: 800, textAlign: "center", color: "#15803d" }}>min</div>

              {[
                { breed: 1, ca: 2, cb: 1 },
                { breed: 2, ca: 1, cb: 2 },
                { breed: 3, ca: 3, cb: 2 },
                { breed: 4, ca: 0, cb: 1 },
              ].map((row, i) => [
                <div key={`k${i}`} style={{ textAlign: "center", fontWeight: 800, color: "#7f1d1d" }}>{row.breed}</div>,
                <div key={`a${i}`} style={{ textAlign: "center", padding: "4px", borderRadius: 5, background: "#fee2e2", border: "1.5px solid #fca5a5" }}>{row.ca}</div>,
                <div key={`x${i}`} style={{ textAlign: "center", color: "#9ca3af", fontSize: 10 }}>vs</div>,
                <div key={`b${i}`} style={{ textAlign: "center", padding: "4px", borderRadius: 5, background: "#fee2e2", border: "1.5px solid #fca5a5" }}>{row.cb}</div>,
                <div key={`m${i}`} style={{ textAlign: "center", padding: "4px", borderRadius: 5, background: "#dcfce7", border: "1.5px solid #86efac", fontWeight: 800, color: "#15803d" }}>
                  {Math.min(row.ca, row.cb)}
                </div>,
              ])}
            </div>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, fontWeight: 900, color: "#15803d", fontFamily: "'JetBrains Mono',monospace" }}>
              max_match = 1 + 1 + 2 + 0 = <span style={{ fontSize: 17 }}>4</span>
            </div>
          </div>

          {/* Algorithm */}
          <div style={{ background: C.accentBg, border: `2px solid ${C.accentBd}`, borderRadius: 12, padding: "10px 14px", fontSize: 12.5, lineHeight: 1.8, color: C.text, whiteSpace: "pre-line" }}>
            <div style={{ fontWeight: 800, color: C.accent, marginBottom: 4 }}>{t(E, "🔧 Algorithm", "🔧 알고리즘")}</div>
            {t(E,
              "1. ca = Counter(a), cb = Counter(b)\n2. max_match = sum( min(ca[x], cb[x]) )  for every breed x",
              "1. ca = Counter(a), cb = Counter(b)\n2. max_match = 모든 품종 x에 대해 min(ca[x], cb[x]) 합산")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Practice: a = [1, 1, 2, 2, 3], b = [2, 3, 3, 1, 1].\nCount per breed, take min, then sum.",
        "연습: a = [1, 1, 2, 2, 3], b = [2, 3, 3, 1, 1].\n품종별 카운트 → min → 합."),
      question: t(E,
        "max_match for a=[1,1,2,2,3], b=[2,3,3,1,1]?",
        "a=[1,1,2,2,3], b=[2,3,3,1,1]의 max_match?"),
      options: ["3", "4", "5", "2"],
      correct: 1,
      explain: t(E,
        "ca={1:2, 2:2, 3:1}, cb={1:2, 2:1, 3:2}. min: 2+1+1 = 4.",
        "ca={1:2, 2:2, 3:1}, cb={1:2, 2:1, 3:2}. min 합: 2+1+1 = 4."),
    },
    {
      type: "progressive",
      narr: t(E,
        "Let's build the solution step by step. Each section reveals one piece of the algorithm.", "솔루션을 단계별로 만들어보자. 각 섹션마다 알고리즘 한 조각씩."),
      sections: getCheckupsSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own a, b arrays. Live scan + Counter-based max.", "직접 a, b 배열 시도. 실시간 스캔 + Counter 기반 최대."),
    },
  ];
}
