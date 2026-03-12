// ============================================
// 수도코드 레슨 27: 불리언 로직 2 (Boolean Logic 2)
// CIE 스타일 수도코드 - NAND, NOR, XOR과 논리 회로
// ============================================

import { LessonData } from '../types'

export const pseudoLesson27Data: LessonData = {
  id: "pseudo-27",
  title: "불리언 로직 2",
  emoji: "🔌",
  description: "NAND, NOR, XOR과 논리 회로를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "추가 논리 게이트",
      emoji: "🔷",
      steps: [
        {
          id: "ch1-nand",
          type: "explain",
          title: "🔷 NAND 게이트",
          content: `**NAND 게이트**는 **NOT AND**의 줄임말이에요!

AND 게이트의 결과를 **뒤집은 것**이에요.

진리표 (Truth Table):

| A | B | A AND B | A NAND B |
|---|---|---------|----------|
| 0 | 0 |    0    |    1     |
| 0 | 1 |    0    |    1     |
| 1 | 0 |    0    |    1     |
| 1 | 1 |    1    |    0     |

AND의 결과를 뒤집었죠? **0→1, 1→0**

불리언 표현식:
\`\`\`
Q = NOT (A AND B)
\`\`\`

NAND 게이트 기호 (텍스트 표현):
\`\`\`
A ---\\
      )o--- Q (출력)    ← 'o'가 NOT을 의미해요!
B ---/
\`\`\`

핵심: **둘 다 1일 때만 0**, 나머지는 모두 1!

재미있는 사실: NAND 게이트만으로 모든 논리 회로를 만들 수 있어요!`
        },
        {
          id: "ch1-nor",
          type: "explain",
          title: "🔷 NOR 게이트",
          content: `**NOR 게이트**는 **NOT OR**의 줄임말이에요!

OR 게이트의 결과를 **뒤집은 것**이에요.

진리표 (Truth Table):

| A | B | A OR B | A NOR B |
|---|---|--------|---------|
| 0 | 0 |   0    |    1    |
| 0 | 1 |   1    |    0    |
| 1 | 0 |   1    |    0    |
| 1 | 1 |   1    |    0    |

OR의 결과를 뒤집었죠?

불리언 표현식:
\`\`\`
Q = NOT (A OR B)
\`\`\`

NOR 게이트 기호 (텍스트 표현):
\`\`\`
A ---\\
      )o--- Q (출력)    ← 'o'가 NOT을 의미해요!
B ---/
\`\`\`

핵심: **둘 다 0일 때만 1**, 나머지는 모두 0!

NAND와 NOR를 비교해 볼까요?

| A | B | NAND | NOR |
|---|---|------|-----|
| 0 | 0 |  1   |  1  |
| 0 | 1 |  1   |  0  |
| 1 | 0 |  1   |  0  |
| 1 | 1 |  0   |  0  |`
        },
        {
          id: "ch1-xor",
          type: "explain",
          title: "🔷 XOR 게이트",
          content: `**XOR 게이트**는 **Exclusive OR (배타적 OR)**이에요!

입력이 **서로 다를 때만** 출력이 1이에요!

진리표 (Truth Table):

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    0    |

일반 OR과 비교해 볼까요?

| A | B | OR | XOR |
|---|---|-----|-----|
| 0 | 0 |  0  |  0  |
| 0 | 1 |  1  |  1  |
| 1 | 0 |  1  |  1  |
| 1 | 1 |  1  |  **0** ← 여기가 달라요! |

**OR**: 하나라도 1이면 1 (둘 다 1이어도 1)
**XOR**: 하나만 1일 때 1 (둘 다 1이면 **0**!)

불리언 표현식:
\`\`\`
Q = (A AND NOT B) OR (NOT A AND B)
\`\`\`

일상 예시: "커피 **또는** 차 중 **하나만** 골라!" ← 이것이 XOR!`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 게이트 비교 퀴즈!",
          content: `A = 0, B = 0일 때 출력이 **1**인 게이트를 **모두** 고르면?`,
          options: [
            'NAND와 NOR',
            'NAND만',
            'NOR만',
            'XOR만'
          ],
          answer: 0,
          explanation: `A = 0, B = 0일 때 각 게이트의 출력을 확인해 볼게요:

- **NAND**: NOT (0 AND 0) = NOT 0 = **1**
- **NOR**: NOT (0 OR 0) = NOT 0 = **1**
- **XOR**: 0 XOR 0 = **0** (서로 같으므로 0)
- **AND**: 0 AND 0 = **0**
- **OR**: 0 OR 0 = **0**

NAND와 NOR 둘 다 A=0, B=0일 때 출력이 1이에요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 세 게이트 출력 예측하기!",
          content: `A = 1, B = 1일 때, 다음 세 게이트의 출력은?

- NAND: NOT (1 AND 1) = ?
- NOR: NOT (1 OR 1) = ?
- XOR: 1 XOR 1 = ?`,
          options: [
            'NAND=0, NOR=0, XOR=0',
            'NAND=1, NOR=0, XOR=0',
            'NAND=0, NOR=0, XOR=1',
            'NAND=1, NOR=1, XOR=0'
          ],
          answer: 0,
          explanation: `하나씩 계산해 볼게요:

**NAND**: NOT (1 AND 1) = NOT 1 = **0**
(둘 다 1일 때 NAND는 유일하게 0을 출력해요!)

**NOR**: NOT (1 OR 1) = NOT 1 = **0**
(하나라도 1이면 OR은 1, 뒤집으면 0)

**XOR**: 1 XOR 1 = **0**
(서로 같으면 0!)

따라서 NAND=0, NOR=0, XOR=0`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ XOR 진리표 완성하기!",
          content: `XOR 게이트의 진리표에서 빈칸을 채우세요.

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    ?    |

XOR은 입력이 **서로 다를 때만** 1이에요. A=1, B=1은 서로 같으니까...`,
          codeTemplate: '1 XOR 1 = ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "2", "TRUE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "논리 회로",
      emoji: "🔌",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔌 논리 회로란?",
          content: `**논리 회로(Logic Circuit)**는 여러 논리 게이트를 **연결**해서 만든 회로예요.

시험에서는 회로 다이어그램 대신 **텍스트 설명**이 주어지기도 해요.

**간단한 회로 예시:**

\`\`\`
입력: A, B, C

1단계: A와 B가 AND 게이트로 들어감 → 출력 P
2단계: P와 C가 OR 게이트로 들어감 → 출력 Q
\`\`\`

이것을 불리언 표현식으로 쓰면:
\`\`\`
P = A AND B
Q = P OR C
Q = (A AND B) OR C
\`\`\`

회로를 읽는 순서:
1. **입력**에서 시작
2. 각 게이트의 출력을 **왼쪽에서 오른쪽**으로 계산
3. **마지막 게이트**의 출력이 전체 회로의 출력!`
        },
        {
          id: "ch2-trace",
          type: "explain",
          title: "🔌 회로 추적하기 (Tracing)",
          content: `시험에서 가장 많이 나오는 유형: **회로에 값을 넣고 추적하기!**

**예시 회로:**
\`\`\`
입력: A, B, C
게이트 1: NOT 게이트 - 입력 C → 출력 P
게이트 2: AND 게이트 - 입력 A, B → 출력 R
게이트 3: OR 게이트 - 입력 P, R → 출력 Q (최종 출력)
\`\`\`

불리언 표현식: \`Q = (NOT C) OR (A AND B)\`

**A=1, B=0, C=0일 때 추적:**

1. 게이트 1: P = NOT C = NOT 0 = **1**
2. 게이트 2: R = A AND B = 1 AND 0 = **0**
3. 게이트 3: Q = P OR R = 1 OR 0 = **1**

**최종 출력 Q = 1**

**추적할 때 꿀팁:**
- 각 게이트 옆에 **중간 결과**를 적어요
- 화살표를 따라가며 **순서대로** 계산해요
- 실수를 줄이려면 **한 게이트씩** 천천히!`
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "📝 회로와 표현식 변환",
          content: `시험에서는 **회로 → 표현식** 또는 **표현식 → 회로** 변환을 물어봐요!

**회로 → 표현식 방법:**
1. 각 게이트의 입력과 출력을 확인해요
2. 가장 안쪽 게이트부터 표현식을 써요
3. 바깥쪽으로 확장해요

**예시:**
\`\`\`
게이트 1: NOT 게이트 - 입력 B → 출력 P
게이트 2: AND 게이트 - 입력 A, P → 출력 Q
\`\`\`

변환:
- P = NOT B
- Q = A AND P = A AND (NOT B)

최종 표현식: **Q = A AND NOT B**

---

**표현식 → 회로 방법:**
\`Q = (A OR B) AND (NOT C)\`

1. \`A OR B\` → OR 게이트 (출력 P)
2. \`NOT C\` → NOT 게이트 (출력 R)
3. \`P AND R\` → AND 게이트 (최종 출력 Q)

\`\`\`
A ---\\
      OR --- P ---\\
B ---/              AND --- Q (최종 출력)
C --- NOT --- R ---/
\`\`\``
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 회로 추적하기!",
          content: `다음 회로의 출력을 구하세요.

\`\`\`
게이트 1: OR 게이트 - 입력 A, B → 출력 P
게이트 2: NOT 게이트 - 입력 C → 출력 R
게이트 3: AND 게이트 - 입력 P, R → 출력 Q
\`\`\`

표현식: Q = (A OR B) AND (NOT C)

**A = 0, B = 1, C = 0일 때 Q는?**`,
          options: [
            '1',
            '0'
          ],
          answer: 0,
          explanation: `단계별 추적:

1. 게이트 1: P = A OR B = 0 OR 1 = **1**
2. 게이트 2: R = NOT C = NOT 0 = **1**
3. 게이트 3: Q = P AND R = 1 AND 1 = **1**

최종 출력 Q = **1**

B가 1이라서 OR의 결과가 1이 되고, C가 0이라서 NOT C도 1이 되어, 둘 다 1이므로 AND 결과도 1이에요!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 회로와 표현식 퀴즈!",
          content: `다음 회로를 불리언 표현식으로 바꾸면?

\`\`\`
게이트 1: AND 게이트 - 입력 A, B → 출력 P
게이트 2: NOT 게이트 - 입력 P → 출력 Q
\`\`\``,
          options: [
            'Q = NOT A AND B',
            'Q = NOT (A AND B)',
            'Q = A AND NOT B',
            'Q = (NOT A) AND (NOT B)'
          ],
          answer: 1,
          explanation: `게이트를 순서대로 따라가 볼게요:

1. 게이트 1: P = A AND B (A와 B를 AND)
2. 게이트 2: Q = NOT P = **NOT (A AND B)** (AND 결과를 NOT)

괄호의 위치가 중요해요!
- \`NOT (A AND B)\` = NAND ← 정답! AND 결과 전체를 뒤집어요
- \`NOT A AND B\` = (NOT A) AND B ← 이건 A만 뒤집고 B와 AND

이 회로는 사실 **NAND 게이트**와 같은 기능을 해요!`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 회로 표현식 완성하기!",
          content: `다음 회로의 불리언 표현식을 완성하세요.

\`\`\`
게이트 1: NOT 게이트 - 입력 A → 출력 P
게이트 2: OR 게이트 - 입력 P, B → 출력 Q
\`\`\`

P = NOT A이고, Q = P OR B이므로...`,
          codeTemplate: 'Q = ___ A OR B',
          fillBlanks: [
            { id: 1, answer: "NOT", options: ["NOT", "AND", "OR", "XOR"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "시험 대비 연습",
      emoji: "📝",
      steps: [
        {
          id: "ch3-types",
          type: "explain",
          title: "📝 IGCSE 시험 출제 유형",
          content: `IGCSE Computer Science Paper 2에서 논리 게이트 문제는 이렇게 나와요:

**유형 1: 진리표 완성하기**
- 불리언 표현식이나 회로가 주어지고, 진리표를 채우는 문제
- 중간 열(intermediate column)을 포함할 수 있어요

**유형 2: 표현식 쓰기**
- 회로 다이어그램을 보고 불리언 표현식을 쓰는 문제
- 또는 진리표를 보고 표현식을 쓰는 문제

**유형 3: 회로 추적하기**
- 주어진 입력값으로 회로를 통과시켜 출력을 구하는 문제

**유형 4: 게이트 식별하기**
- 진리표를 보고 어떤 게이트인지 맞추는 문제

시험에서 주의할 점:
- **NOT을 항상 먼저** 계산하세요!
- **괄호 안을 먼저** 계산하세요!
- **중간 과정을 꼭 보여주세요** (부분 점수!)`
        },
        {
          id: "ch3-tips",
          type: "explain",
          title: "📝 시험 팁과 전략",
          content: `**시험에서 고득점을 받는 방법!**

**팁 1: 중간 변수를 활용하세요**
\`\`\`
X = (A AND B) OR (NOT C)

풀이할 때:
P = A AND B     ← 중간 변수
R = NOT C       ← 중간 변수
X = P OR R      ← 최종 결과
\`\`\`

**팁 2: 진리표는 빠짐없이 확인!**
- 2입력: 4가지 경우 (00, 01, 10, 11)
- 3입력: 8가지 경우
- 하나라도 빠지면 감점!

**팁 3: 게이트 특징 암기**

| 게이트 | 출력이 1인 조건 |
|--------|-----------------|
| AND    | 둘 다 1         |
| OR     | 하나라도 1      |
| NOT    | 입력이 0        |
| NAND   | 둘 다 1은 아닐 때 |
| NOR    | 둘 다 0         |
| XOR    | 서로 다를 때    |

**팁 4: 검산하세요!**
- 진리표를 다 채운 후, 한두 줄을 다시 계산해서 확인해요`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 게이트 식별 퀴즈!",
          content: `다음 진리표는 어떤 게이트 조합을 나타낼까요?

| A | B | C | 출력 |
|---|---|---|------|
| 0 | 0 | 0 |  0   |
| 0 | 0 | 1 |  1   |
| 0 | 1 | 0 |  0   |
| 0 | 1 | 1 |  1   |
| 1 | 0 | 0 |  0   |
| 1 | 0 | 1 |  1   |
| 1 | 1 | 0 |  1   |
| 1 | 1 | 1 |  1   |`,
          options: [
            '(A AND B) OR C',
            '(A OR B) AND C',
            'A AND (B OR C)',
            'A OR B OR C'
          ],
          answer: 0,
          explanation: `\`(A AND B) OR C\`를 확인해 볼게요:

- A=0,B=0,C=0: (0 AND 0) OR 0 = 0 OR 0 = **0**
- A=0,B=0,C=1: (0 AND 0) OR 1 = 0 OR 1 = **1**
- A=0,B=1,C=0: (0 AND 1) OR 0 = 0 OR 0 = **0**
- A=0,B=1,C=1: (0 AND 1) OR 1 = 0 OR 1 = **1**
- A=1,B=0,C=0: (1 AND 0) OR 0 = 0 OR 0 = **0**
- A=1,B=0,C=1: (1 AND 0) OR 1 = 0 OR 1 = **1**
- A=1,B=1,C=0: (1 AND 1) OR 0 = 1 OR 0 = **1**
- A=1,B=1,C=1: (1 AND 1) OR 1 = 1 OR 1 = **1**

모든 줄이 일치해요! 패턴: C가 1이면 무조건 출력 1, C가 0이면 A AND B에 의해 결정돼요.`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 복잡한 회로 추적!",
          content: `다음 회로를 추적하세요.

\`\`\`
게이트 1: NOT 게이트 - 입력 A → 출력 P
게이트 2: AND 게이트 - 입력 B, C → 출력 R
게이트 3: OR 게이트 - 입력 P, R → 출력 S
게이트 4: NOT 게이트 - 입력 S → 출력 Q (최종)
\`\`\`

표현식: Q = NOT((NOT A) OR (B AND C))

**A = 1, B = 1, C = 0일 때 Q는?**`,
          options: [
            '1',
            '0'
          ],
          answer: 0,
          explanation: `단계별 추적:

1. 게이트 1: P = NOT A = NOT 1 = **0**
2. 게이트 2: R = B AND C = 1 AND 0 = **0**
3. 게이트 3: S = P OR R = 0 OR 0 = **0**
4. 게이트 4: Q = NOT S = NOT 0 = **1**

최종 출력 Q = **1**

NOT A가 0이고 B AND C도 0이라서 OR의 결과가 0이 되고, 마지막 NOT이 0을 뒤집어서 1이 돼요!`
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🏆 최종 퀴즈!",
          content: `다음 두 불리언 표현식이 같은 결과를 내는 것은?

표현식 1: \`NOT (A OR B)\`
표현식 2: \`(NOT A) AND (NOT B)\``,
          options: [
            '항상 같은 결과를 낸다 (드 모르간 법칙)',
            'A=1, B=1일 때만 같다',
            'A=0, B=0일 때만 같다',
            '항상 다른 결과를 낸다'
          ],
          answer: 0,
          explanation: `진리표로 확인해 볼게요!

| A | B | NOT(A OR B) | (NOT A) AND (NOT B) |
|---|---|-------------|---------------------|
| 0 | 0 | NOT(0)=**1** | 1 AND 1 = **1**    |
| 0 | 1 | NOT(1)=**0** | 1 AND 0 = **0**    |
| 1 | 0 | NOT(1)=**0** | 0 AND 1 = **0**    |
| 1 | 1 | NOT(1)=**0** | 0 AND 0 = **0**    |

모든 경우에 결과가 같아요!

이것이 바로 **드 모르간 법칙(De Morgan's Law)**이에요:
- \`NOT (A OR B)\` = \`(NOT A) AND (NOT B)\`
- \`NOT (A AND B)\` = \`(NOT A) OR (NOT B)\`

시험에서 간혹 나오는 고급 문제예요!`
        }
      ]
    }
  ]
}
