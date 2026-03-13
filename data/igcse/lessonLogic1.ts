// ============================================
// IGCSE Logic Gates 기출문제 연습
// Paper 2: Logic Gates, Truth Tables, Logic Expressions
// ============================================

import { LessonData } from '../types'

export const igcseLessonLogic1Data: LessonData = {
  id: "igcse-logic1",
  title: "Logic Gates 기출문제",
  emoji: "🔌",
  description: "IGCSE Paper 2 Logic Gates 기출 연습!",
  chapters: [
    // ============================================
    // Chapter 1: 기본 게이트
    // ============================================
    {
      id: "ch1",
      title: "기본 게이트",
      emoji: "⚡",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "3가지 기본 Logic Gate",
          content: `## 기본 Logic Gates

Logic Gate는 1(True)과 0(False)을 입력받아 하나의 출력을 내보내는 장치입니다.

### AND Gate
두 입력이 **모두 1**일 때만 출력이 1입니다.

| A | B | A AND B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

### OR Gate
입력 중 **하나라도 1**이면 출력이 1입니다.

| A | B | A OR B |
|---|---|--------|
| 0 | 0 |   0    |
| 0 | 1 |   1    |
| 1 | 0 |   1    |
| 1 | 1 |   1    |

### NOT Gate
입력을 **반전**시킵니다. (1 → 0, 0 → 1)

| A | NOT A |
|---|-------|
| 0 |   1   |
| 1 |   0   |

이 3가지가 모든 논리 회로의 기본입니다!`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "AND Gate 출력",
          content: `AND gate의 입력이 A=1, B=0일 때 출력은?`,
          options: [
            "0",
            "1",
            "A",
            "B"
          ],
          answer: 0,
          explanation: `AND gate는 두 입력이 **모두 1**이어야 출력이 1입니다.

A=1, B=0 → 둘 다 1이 아니므로 출력은 **0**`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "OR Gate 출력",
          content: `OR gate의 입력이 A=0, B=1일 때 출력은?`,
          options: [
            "1",
            "0",
            "A",
            "B"
          ],
          answer: 0,
          explanation: `OR gate는 입력 중 **하나라도 1**이면 출력이 1입니다.

A=0, B=1 → B가 1이므로 출력은 **1**`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "NOT Gate 출력",
          content: `NOT A의 출력은? (A=1일 때)`,
          options: [
            "0",
            "1",
            "A",
            "NOT"
          ],
          answer: 0,
          explanation: `NOT gate는 입력을 **반전**시킵니다.

A=1 → NOT 1 = **0**`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "복합 논리식 예측",
          content: `다음 논리식의 결과를 예측하세요.

\`\`\`
X = A AND (NOT B)
\`\`\`

A=1, B=1일 때 X의 값은?

**풀이 과정:**
1. NOT B = NOT 1 = ?
2. A AND (NOT B) = 1 AND ? = ?`,
          options: [
            "0",
            "1",
            "NOT B",
            "A"
          ],
          answer: 0,
          explanation: `한 단계씩 풀어볼게요:

1. **NOT B** = NOT 1 = **0**
2. **A AND 0** = 1 AND 0 = **0**

AND는 둘 다 1이어야 하는데, NOT B가 0이므로 결과는 **0**`
        },
        {
          id: "ch1-q4",
          type: "quiz",
          title: "AND Gate 진리표",
          content: `AND gate의 진리표를 완성하세요.

A=1, B=1일 때 출력은?`,
          options: [
            "1",
            "0",
            "A AND B",
            "Undefined"
          ],
          answer: 0,
          explanation: `AND gate는 두 입력이 **모두 1**일 때 출력이 1입니다.

A=1, B=1 → 둘 다 1이므로 출력은 **1**`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "OR Gate 진리표 완성",
          content: `OR gate의 진리표를 완성하세요.`,
          code: 'A=0, B=0 → ___\nA=0, B=1 → ___\nA=1, B=0 → 1\nA=1, B=1 → 1',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "A", "B"] },
            { id: 2, answer: "1", options: ["1", "0", "A", "B"] }
          ]
        }
      ]
    },
    // ============================================
    // Chapter 2: 복합 게이트
    // ============================================
    {
      id: "ch2",
      title: "복합 게이트",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "NAND, NOR, XOR Gate",
          content: `## 복합 Logic Gates

기본 게이트를 조합하면 새로운 게이트를 만들 수 있습니다!

### NAND Gate (NOT AND)
AND의 **반대**입니다. AND 결과를 NOT 합니다.

| A | B | A NAND B |
|---|---|----------|
| 0 | 0 |    1     |
| 0 | 1 |    1     |
| 1 | 0 |    1     |
| 1 | 1 |    0     |

### NOR Gate (NOT OR)
OR의 **반대**입니다. OR 결과를 NOT 합니다.

| A | B | A NOR B |
|---|---|---------|
| 0 | 0 |    1    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    0    |

### XOR Gate (Exclusive OR)
두 입력이 **서로 다를 때만** 출력이 1입니다.

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    0    |

시험에서 NAND, NOR, XOR 모두 자주 출제됩니다!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "NAND Gate 출력",
          content: `NAND gate의 입력이 A=1, B=1일 때 출력은?`,
          options: [
            "0",
            "1",
            "A",
            "NAND"
          ],
          answer: 0,
          explanation: `NAND = NOT(AND)

1. AND(1, 1) = **1**
2. NOT(1) = **0**

두 입력이 모두 1이면 AND는 1이고, 그것을 반전하면 **0**`
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "XOR Gate 출력",
          content: `XOR gate의 입력이 A=1, B=1일 때 출력은?`,
          options: [
            "0",
            "1",
            "XOR",
            "Undefined"
          ],
          answer: 0,
          explanation: `XOR는 두 입력이 **서로 다를 때만** 1입니다.

A=1, B=1 → 같은 값이므로 출력은 **0**`
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "게이트 특성 파악",
          content: `두 입력이 **서로 다를 때만** 출력이 1인 게이트는?`,
          options: [
            "XOR",
            "OR",
            "AND",
            "NAND"
          ],
          answer: 0,
          explanation: `**XOR (Exclusive OR)** 는 입력이 서로 다를 때만 1을 출력합니다.

- 0, 0 → 0 (같음)
- 0, 1 → 1 (다름)
- 1, 0 → 1 (다름)
- 1, 1 → 0 (같음)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "복합 논리식 예측 1",
          content: `다음 논리식의 결과를 예측하세요.

\`\`\`
Z = (A OR B) AND (NOT C)
\`\`\`

A=0, B=1, C=1일 때 Z의 값은?

**풀이 과정:**
1. A OR B = 0 OR 1 = ?
2. NOT C = NOT 1 = ?
3. ? AND ? = ?`,
          options: [
            "0",
            "1",
            "NOT C",
            "A OR B"
          ],
          answer: 0,
          explanation: `한 단계씩 풀어볼게요:

1. **A OR B** = 0 OR 1 = **1**
2. **NOT C** = NOT 1 = **0**
3. **1 AND 0** = **0**

OR 결과는 1이지만, NOT C가 0이므로 AND 결과는 **0**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "복합 논리식 예측 2",
          content: `다음 논리식의 결과를 예측하세요.

\`\`\`
X = NOT(A AND B) OR C
\`\`\`

A=1, B=1, C=0일 때 X의 값은?

**풀이 과정:**
1. A AND B = 1 AND 1 = ?
2. NOT(A AND B) = NOT ? = ?
3. ? OR C = ? OR 0 = ?`,
          options: [
            "0",
            "1",
            "NOT(A AND B)",
            "C"
          ],
          answer: 0,
          explanation: `한 단계씩 풀어볼게요:

1. **A AND B** = 1 AND 1 = **1**
2. **NOT(1)** = **0**
3. **0 OR C** = 0 OR 0 = **0**

A AND B는 1이지만 NOT으로 0이 되고, C도 0이므로 OR 결과는 **0**`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "XOR Gate 진리표 완성",
          content: `XOR gate의 진리표를 완성하세요.`,
          code: 'A=0, B=0 → ___\nA=0, B=1 → 1\nA=1, B=0 → 1\nA=1, B=1 → ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "A", "B"] },
            { id: 2, answer: "0", options: ["0", "1", "A XOR B", "Undefined"] }
          ]
        }
      ]
    },
    // ============================================
    // Chapter 3: 논리식 & 진리표
    // ============================================
    {
      id: "ch3",
      title: "논리식 & 진리표",
      emoji: "📋",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "IGCSE 논리식 풀이법",
          content: `## 논리식 문제 풀이 전략

IGCSE Paper 2에서 논리식 문제는 다음 순서로 풀어요:

### 풀이 3단계
1. **논리식을 부분으로 나누기**
2. **각 부분을 먼저 계산하기**
3. **결과를 합치기**

### 예시
\`\`\`
Z = (R OR NOT T) XOR (NOT S AND T)
\`\`\`

R=0, S=0, T=0일 때:

| 단계 | 계산 | 결과 |
|------|------|------|
| NOT T | NOT 0 | 1 |
| R OR NOT T | 0 OR 1 | 1 |
| NOT S | NOT 0 | 1 |
| NOT S AND T | 1 AND 0 | 0 |
| 최종: 1 XOR 0 | | **1** |

복잡한 식도 한 단계씩 나누면 쉽습니다!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "논리식 계산",
          content: `Z = A AND (B OR C)

A=1, B=0, C=0일 때 Z의 값은?

풀이:
- B OR C = 0 OR 0 = ?
- A AND ? = ?`,
          options: [
            "0",
            "1",
            "B OR C",
            "A"
          ],
          answer: 0,
          explanation: `한 단계씩 계산:

1. **B OR C** = 0 OR 0 = **0**
2. **A AND 0** = 1 AND 0 = **0**

B와 C가 모두 0이면 OR 결과도 0, AND에서 0이 하나라도 있으면 결과는 **0**`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "진리표 완성 예측",
          content: `다음 논리식의 진리표를 완성하세요.

\`\`\`
Z = (A OR B) XOR (NOT A AND B)
\`\`\`

| A | B | A OR B | NOT A | NOT A AND B | Z |
|---|---|--------|-------|-------------|---|
| 0 | 0 |   0    |   1   |      0      | 0 |
| 0 | 1 |   1    |   1   |      1      | ? |
| 1 | 0 |   1    |   0   |      0      | ? |
| 1 | 1 |   1    |   0   |      0      | ? |

4가지 입력 조합의 Z 출력은?`,
          options: [
            "0, 0, 1, 1",
            "0, 1, 1, 0",
            "1, 0, 0, 1",
            "1, 1, 0, 0"
          ],
          answer: 0,
          explanation: `각 행을 계산해 볼게요:

**A=0, B=0:** 0 XOR 0 = **0**
**A=0, B=1:** 1 XOR 1 = **0**
**A=1, B=0:** 1 XOR 0 = **1**
**A=1, B=1:** 1 XOR 0 = **1**

결과: **0, 0, 1, 1**

XOR는 두 값이 같으면 0, 다르면 1입니다!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "논리식 단계별 풀이",
          content: `Z = NOT A OR (B AND C) 일 때, A=1, B=1, C=1의 결과를 단계별로 완성하세요.`,
          code: 'NOT A = NOT 1 = ___\nB AND C = 1 AND 1 = ___\nZ = ___ OR 1 = 1',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "NOT 1", "A"] },
            { id: 2, answer: "1", options: ["1", "0", "B AND C", "C"] },
            { id: 3, answer: "0", options: ["0", "1", "NOT A", "A"] }
          ]
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "진리표 행 개수",
          content: `입력 변수가 3개인 진리표에는 몇 개의 행이 필요한가요?`,
          options: [
            "8",
            "6",
            "4",
            "3"
          ],
          answer: 0,
          explanation: `진리표의 행 수 = **2^n** (n = 입력 변수 개수)

- 1개 변수: 2^1 = **2** 행
- 2개 변수: 2^2 = **4** 행
- 3개 변수: 2^3 = **8** 행
- 4개 변수: 2^4 = **16** 행`
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "논리식 작성",
          content: `다음 조건을 논리식으로 표현하면?

"A가 1이거나 B가 0이면 출력은 1"`,
          options: [
            "A OR NOT B",
            "A AND NOT B",
            "NOT A OR B",
            "A XOR B"
          ],
          answer: 0,
          explanation: `조건을 분석해 볼게요:

- "A가 1" → **A**
- "B가 0" → **NOT B** (B가 0이면 NOT B는 1)
- "이거나" → **OR**

따라서: **A OR NOT B**`
        }
      ]
    }
  ]
}
