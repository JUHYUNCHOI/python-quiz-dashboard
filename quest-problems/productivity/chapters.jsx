import { C, t } from "@/components/quest/theme";
import { getProductivitySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from bisect import bisect_right",
  "input = sys.stdin.readline",
  "",
  "N, Q = map(int, input().split())",
  "c = list(map(int, input().split()))  # closing times",
  "ti = list(map(int, input().split()))  # travel times",
  "",
  "# d[i] = c[i] - t[i]: max wake-up time to visit farm i",
  "d = sorted([c[i] - ti[i] for i in range(N)])",
  "",
  "for _ in range(Q):",
  "    S, V = map(int, input().split())",
  "    # Count farms where d[i] > S",
  "    # bisect_right(d, S) gives index of first element > S",
  "    reachable = N - bisect_right(d, S)",
  "    print('YES' if reachable >= V else 'NO')",
];

/* ================================================================
   Chapter 1: Problem Understanding (4 steps)
   ================================================================ */
export function makeProdCh1(E) {
  return [
    // 1-1: Intro
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to visit as many farms as possible!\nEach farm closes at a certain time, and she needs travel time to get there.\nCan she visit enough?\n📊", "베시가 최대한 많은 농장을 방문하고 싶어! 각 농장은 특정 시간에 닫히고, 가는 데 이동 시간이 필요해. 충분히 방문할 수 있을까? 📊"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📊</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Max Productivity</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Maximizing Productivity</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N farms, each closes at time c_i. Bessie wakes at time S, arrives at farm i at time t_i + S. She can visit farm i only if t_i + S < c_i. Given Q queries (S, V): can she visit >= V farms?",
              "N개 농장, 각각 시간 c_i에 닫혀. 베시는 시간 S에 일어나서, 농장 i에 t_i + S에 도착. t_i + S < c_i일 때만 방문 가능. Q개 쿼리 (S, V): V개 이상 방문 가능?")}
          </div>
        </div>),
    },
    // 1-2: Key transformation
    {
      type: "reveal",
      narr: t(E,
        "The trick is to rearrange the condition!\nt_i + S < c_i means S < c_i - t_i.\nSo precompute d_i = c_i - t_i!", "핵심 트릭은 조건을 변환하는 거야! t_i + S < c_i는 S < c_i - t_i를 의미해. d_i = c_i - t_i를 미리 계산하면 돼!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Transform the Condition", "조건 변환")}
            </div>
            <div style={{ background: "#fff", border: "2px solid #fdba74", borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", fontFamily: "'JetBrains Mono',monospace", textAlign: "center", lineHeight: 2 }}>
                t_i + S {"<"} c_i<br/>
                S {"<"} c_i - t_i<br/>
                S {"<"} d_i
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "d_i = c_i - t_i is the latest Bessie can wake up and still visit farm i. Sort d[], then for each query S, binary search to count how many d_i > S!",
                "d_i = c_i - t_i는 베시가 농장 i를 방문할 수 있는 가장 늦은 기상 시간이야. d[]를 정렬한 후, 각 쿼리 S에 대해 이진 탐색으로 d_i > S인 개수를 세!")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: c=[10,5,8], t=[3,2,4], S=3. Which farms can Bessie visit?", "확인해보자: c=[10,5,8], t=[3,2,4], S=3. 베시가 어떤 농장을 방문할 수 있어?"),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. Farm 1: 3+3=6<10 OK. Farm 2: 2+3=5, NOT <5. Farm 3: 4+3=7<8 OK. How many farms?",
        "c=[10,5,8], t=[3,2,4], S=3. 농장1: 3+3=6<10 OK. 농장2: 2+3=5, 5<5 아님. 농장3: 4+3=7<8 OK. 몇 개 농장?"),
      options: [
        t(E, "1 farm", "1개 농장"),
        t(E, "2 farms", "2개 농장"),
        t(E, "3 farms (all)", "3개 농장 (전부)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Farm 1 (6<10) and Farm 3 (7<8) are reachable. Farm 2 fails because 5 is NOT strictly less than 5. Answer: 2!",
        "정답! 농장1 (6<10)과 농장3 (7<8)이 방문 가능. 농장2는 5가 5보다 엄격히 작지 않아서 실패. 답: 2개!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Now you try! Same example but count it yourself.", "이제 직접 해봐! 같은 예제로 직접 세봐."),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. How many farms can Bessie visit? (strict inequality: t_i + S < c_i)",
        "c=[10,5,8], t=[3,2,4], S=3. 베시가 방문할 수 있는 농장 수는? (엄격한 부등식: t_i + S < c_i)"),
      hint: t(E,
        "Check each: 3+3=6<10 yes, 2+3=5<5 no, 4+3=7<8 yes. Count the yes's!",
        "각각 확인: 3+3=6<10 맞아, 2+3=5<5 아니야, 4+3=7<8 맞아. 맞는 것 세봐!"),
      answer: 2,
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makeProdCh2(E, lang = "py") {
  return [
    // 2-1: Binary search approach
    {
      type: "reveal",
      narr: t(E,
        "Sort d_i = c_i - t_i.\nFor each query S, use binary search to find how many d_i > S.\nThis is O(N log N + Q log N)!", "d_i = c_i - t_i를 정렬해. 각 쿼리 S에 대해 이진 탐색으로 d_i > S인 개수를 찾아. O(N log N + Q log N)이야!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 8 }}>
              {t(E, "Binary Search on Sorted d[]", "정렬된 d[]에서 이진 탐색")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {t(E,
                "1. Compute d_i = c_i - t_i for all farms.\n2. Sort d[] in ascending order.\n3. For query (S, V): use bisect_right(d, S) to find first index > S.\n4. Reachable = N - bisect_right(d, S).\n5. Answer YES if reachable >= V.",
                "1. 모든 농장에 대해 d_i = c_i - t_i 계산.\n2. d[]를 오름차순 정렬.\n3. 쿼리 (S, V): bisect_right(d, S)로 S보다 큰 첫 인덱스 찾기.\n4. 도달 가능 = N - bisect_right(d, S).\n5. 도달 가능 >= V이면 YES.")}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", fontWeight: 600 }}>
            {t(E, "O(N log N + Q log N) — fast enough!", "O(N log N + Q log N) — 충분히 빨라!")}
          </div>
        </div>),
    },
    // 2-2: Solution code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getProductivitySections(E),
    },
  ];
}
