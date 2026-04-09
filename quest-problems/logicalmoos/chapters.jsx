import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "N, Q = map(int, input().split())",
  "words = input().split()",
  "",
  "# Evaluate the boolean expression",
  "def evaluate(tokens):",
  "    # First pass: handle 'and'",
  "    stack = [tokens[0] == 'true']",
  "    i = 1",
  "    while i < len(tokens):",
  "        op = tokens[i]",
  "        val = tokens[i+1] == 'true'",
  "        if op == 'and':",
  "            stack[-1] = stack[-1] and val",
  "        else:  # 'or'",
  "            stack.append(val)",
  "        i += 2",
  "    return any(stack)",
  "",
  "result = []",
  "for _ in range(Q):",
  "    parts = input().split()",
  "    l, r = int(parts[0])-1, int(parts[1])-1",
  "    target = parts[2] == 'true'",
  "    # Try replacing words[l..r] with 'true' and 'false'",
  "    for rep in ['true', 'false']:",
  "        new_tokens = words[:l] + [rep] + words[r+1:]",
  "        if evaluate(new_tokens) == target:",
  "            result.append('Y')",
  "            break",
  "    else:",
  "        result.append('N')",
  "",
  "print(''.join(result))",
];

export function makeLogicalCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A boolean expression with 'and' and 'or'. Can we replace a substring to make it evaluate to a target value? 🧠",
        "불리언 수식에 'and'와 'or'가 있어. 부분 문자열을 교체해서 목표값으로 만들 수 있을까? 🧠"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧠</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Logical Moos</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2024 Bronze #1</div>
          <div style={{ marginTop: 12, background: C.lookBg, border: `2px solid ${C.lookBd}`, borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "'and' has higher precedence than 'or'. Replace positions l..r with one boolean to hit target!",
              "'and'가 'or'보다 우선. 위치 l~r을 하나의 불리언으로 교체해서 목표값 달성!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "'false and true or true' → first evaluate 'and': false and true = false → 'false or true' → true!",
        "'false and true or true' → 먼저 'and' 평가: false and true = false → 'false or true' → true!"),
      question: t(E,
        "What does 'true or false and false' evaluate to?",
        "'true or false and false'의 결과는?"),
      options: ["true", "false"],
      correct: 0,
      explain: t(E, "'and' first: false and false = false → 'true or false' → true!", "'and' 먼저: false and false = false → 'true or false' → true!"),
    },
    {
      type: "input",
      narr: t(E,
        "For each query: try replacing with 'true' and 'false'. If either makes the expression equal to target, answer Y.",
        "각 쿼리: 'true'와 'false'로 교체 시도. 둘 중 하나라도 목표값이 되면 Y."),
      question: t(E,
        "'false and true or true'. Replace pos 1-3 with 'true'. Result = 'true or true' = ?. Is answer true? (1=yes,0=no)",
        "'false and true or true'. 위치 1-3을 'true'로 교체. 결과 = 'true or true' = ?. 답이 true? (1=예,0=아니)"),
      answer: 1,
    },
  ];
}

export function makeLogicalCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E, "Brute force: for each query, try both replacements and evaluate. O(NQ).", "완전탐색: 각 쿼리에서 두 교체를 시도하고 평가. O(NQ)."),
      content: (<div style={{ padding: 16, textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>O(NQ)</div></div>),
    },
    {
      type: "code",
      narr: t(E, "Try both replacements, evaluate each!", "두 교체를 시도, 각각 평가!"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
