// ============================================
// IGCSE Logic Gates Past Paper Practice
// Paper 2: Logic Gates, Truth Tables, Logic Expressions
// ============================================

import { LessonData } from '../types'

export const igcseLessonLogic1EnData: LessonData = {
  id: "igcse-logic1",
  title: "Logic Gates Past Papers",
  emoji: "🔌",
  description: "IGCSE Paper 2 Logic Gates Practice!",
  chapters: [
    // ============================================
    // Chapter 1: Basic Gates
    // ============================================
    {
      id: "ch1",
      title: "Basic Gates",
      emoji: "⚡",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "3 Basic Logic Gates",
          content: `## Basic Logic Gates

A Logic Gate takes inputs of 1 (True) and 0 (False) and produces a single output.

### AND Gate
Output is 1 only when **BOTH** inputs are 1.

| A | B | A AND B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

### OR Gate
Output is 1 when **at least one** input is 1.

| A | B | A OR B |
|---|---|--------|
| 0 | 0 |   0    |
| 0 | 1 |   1    |
| 1 | 0 |   1    |
| 1 | 1 |   1    |

### NOT Gate
**Inverts** the input. (1 → 0, 0 → 1)

| A | NOT A |
|---|-------|
| 0 |   1   |
| 1 |   0   |

These 3 gates are the foundation of all logic circuits!`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "AND Gate Output",
          content: `What is the output of an AND gate when inputs are A=1, B=0?`,
          options: [
            "0",
            "1",
            "A",
            "B"
          ],
          answer: 0,
          explanation: `AND gate requires **BOTH** inputs to be 1 for the output to be 1.

A=1, B=0 → Not both 1, so output is **0**`
        },
        {
          id: "ch1-q2",
          type: "quiz",
          title: "OR Gate Output",
          content: `What is the output of an OR gate when inputs are A=0, B=1?`,
          options: [
            "1",
            "0",
            "A",
            "B"
          ],
          answer: 0,
          explanation: `OR gate outputs 1 when **at least one** input is 1.

A=0, B=1 → B is 1, so output is **1**`
        },
        {
          id: "ch1-q3",
          type: "quiz",
          title: "NOT Gate Output",
          content: `What is the output of NOT A when A=1?`,
          options: [
            "0",
            "1",
            "A",
            "NOT"
          ],
          answer: 0,
          explanation: `NOT gate **inverts** the input.

A=1 → NOT 1 = **0**`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "Combined Expression Prediction",
          content: `Predict the result of the following logic expression.

\`\`\`
X = A AND (NOT B)
\`\`\`

What is X when A=1, B=1?

**Working:**
1. NOT B = NOT 1 = ?
2. A AND (NOT B) = 1 AND ? = ?`,
          options: [
            "0",
            "1",
            "NOT B",
            "A"
          ],
          answer: 0,
          explanation: `Let's work through it step by step:

1. **NOT B** = NOT 1 = **0**
2. **A AND 0** = 1 AND 0 = **0**

AND requires both inputs to be 1, but NOT B is 0, so the result is **0**`
        },
        {
          id: "ch1-q4",
          type: "quiz",
          title: "AND Gate Truth Table",
          content: `Complete the truth table for the AND gate.

When A=1, B=1, the output is?`,
          options: [
            "1",
            "0",
            "A AND B",
            "Undefined"
          ],
          answer: 0,
          explanation: `AND gate outputs 1 when **BOTH** inputs are 1.

A=1, B=1 → Both are 1, so output is **1**`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "OR Gate Truth Table",
          content: `Complete the truth table for the OR gate.`,
          code: 'A=0, B=0 → ___\nA=0, B=1 → ___\nA=1, B=0 → 1\nA=1, B=1 → 1',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "A", "B"] },
            { id: 2, answer: "1", options: ["1", "0", "A", "B"] }
          ]
        }
      ]
    },
    // ============================================
    // Chapter 2: Combined Gates
    // ============================================
    {
      id: "ch2",
      title: "Combined Gates",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "NAND, NOR, XOR Gates",
          content: `## Combined Logic Gates

Combining basic gates creates new gates!

### NAND Gate (NOT AND)
The **opposite** of AND. It applies NOT to the AND result.

| A | B | A NAND B |
|---|---|----------|
| 0 | 0 |    1     |
| 0 | 1 |    1     |
| 1 | 0 |    1     |
| 1 | 1 |    0     |

### NOR Gate (NOT OR)
The **opposite** of OR. It applies NOT to the OR result.

| A | B | A NOR B |
|---|---|---------|
| 0 | 0 |    1    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    0    |

### XOR Gate (Exclusive OR)
Output is 1 only when inputs are **DIFFERENT**.

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    0    |

All three gates — NAND, NOR, XOR — appear frequently in exams!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "NAND Gate Output",
          content: `What is the output of a NAND gate when A=1, B=1?`,
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

When both inputs are 1, AND gives 1, then inverting it gives **0**`
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "XOR Gate Output",
          content: `What is the output of an XOR gate when A=1, B=1?`,
          options: [
            "0",
            "1",
            "XOR",
            "Undefined"
          ],
          answer: 0,
          explanation: `XOR outputs 1 only when inputs are **DIFFERENT**.

A=1, B=1 → Same values, so output is **0**`
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "Gate Characteristics",
          content: `Which gate outputs 1 only when both inputs are different?`,
          options: [
            "XOR",
            "OR",
            "AND",
            "NAND"
          ],
          answer: 0,
          explanation: `**XOR (Exclusive OR)** outputs 1 only when the inputs are different.

- 0, 0 → 0 (same)
- 0, 1 → 1 (different)
- 1, 0 → 1 (different)
- 1, 1 → 0 (same)`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "Combined Expression Prediction 1",
          content: `Predict the result of the following logic expression.

\`\`\`
Z = (A OR B) AND (NOT C)
\`\`\`

What is Z when A=0, B=1, C=1?

**Working:**
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
          explanation: `Let's work through it step by step:

1. **A OR B** = 0 OR 1 = **1**
2. **NOT C** = NOT 1 = **0**
3. **1 AND 0** = **0**

The OR result is 1, but NOT C is 0, so the AND result is **0**`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "Combined Expression Prediction 2",
          content: `Predict the result of the following logic expression.

\`\`\`
X = NOT(A AND B) OR C
\`\`\`

What is X when A=1, B=1, C=0?

**Working:**
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
          explanation: `Let's work through it step by step:

1. **A AND B** = 1 AND 1 = **1**
2. **NOT(1)** = **0**
3. **0 OR C** = 0 OR 0 = **0**

A AND B is 1, but NOT makes it 0, and since C is also 0, the OR result is **0**`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "XOR Gate Truth Table",
          content: `Complete the truth table for the XOR gate.`,
          code: 'A=0, B=0 → ___\nA=0, B=1 → 1\nA=1, B=0 → 1\nA=1, B=1 → ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1", "A", "B"] },
            { id: 2, answer: "0", options: ["0", "1", "A XOR B", "Undefined"] }
          ]
        }
      ]
    },
    // ============================================
    // Chapter 3: Logic Expressions & Truth Tables
    // ============================================
    {
      id: "ch3",
      title: "Logic Expressions & Truth Tables",
      emoji: "📋",
      steps: [
        {
          id: "ch3-intro",
          type: "explain",
          title: "IGCSE Logic Expression Strategy",
          content: `## Logic Expression Problem Strategy

For IGCSE Paper 2 logic expression questions, follow these steps:

### 3-Step Method
1. **Break the expression into parts**
2. **Calculate each part first**
3. **Combine the results**

### Example
\`\`\`
Z = (R OR NOT T) XOR (NOT S AND T)
\`\`\`

When R=0, S=0, T=0:

| Step | Calculation | Result |
|------|------------|--------|
| NOT T | NOT 0 | 1 |
| R OR NOT T | 0 OR 1 | 1 |
| NOT S | NOT 0 | 1 |
| NOT S AND T | 1 AND 0 | 0 |
| Final: 1 XOR 0 | | **1** |

Even complex expressions become easy when you break them down step by step!`
        },
        {
          id: "ch3-q1",
          type: "quiz",
          title: "Logic Expression Calculation",
          content: `Z = A AND (B OR C)

What is Z when A=1, B=0, C=0?

Working:
- B OR C = 0 OR 0 = ?
- A AND ? = ?`,
          options: [
            "0",
            "1",
            "B OR C",
            "A"
          ],
          answer: 0,
          explanation: `Step by step calculation:

1. **B OR C** = 0 OR 0 = **0**
2. **A AND 0** = 1 AND 0 = **0**

When both B and C are 0, OR gives 0, and since AND needs both inputs to be 1, the result is **0**`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "Truth Table Completion",
          content: `Complete the truth table for the following expression.

\`\`\`
Z = (A OR B) XOR (NOT A AND B)
\`\`\`

| A | B | A OR B | NOT A | NOT A AND B | Z |
|---|---|--------|-------|-------------|---|
| 0 | 0 |   0    |   1   |      0      | 0 |
| 0 | 1 |   1    |   1   |      1      | ? |
| 1 | 0 |   1    |   0   |      0      | ? |
| 1 | 1 |   1    |   0   |      0      | ? |

What are the Z outputs for all 4 input combinations?`,
          options: [
            "0, 0, 1, 1",
            "0, 1, 1, 0",
            "1, 0, 0, 1",
            "1, 1, 0, 0"
          ],
          answer: 0,
          explanation: `Let's calculate each row:

**A=0, B=0:** 0 XOR 0 = **0**
**A=0, B=1:** 1 XOR 1 = **0**
**A=1, B=0:** 1 XOR 0 = **1**
**A=1, B=1:** 1 XOR 0 = **1**

Result: **0, 0, 1, 1**

Remember, XOR outputs 0 when both values are the same, and 1 when they are different!`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "Step-by-Step Expression",
          content: `For Z = NOT A OR (B AND C), complete the working when A=1, B=1, C=1.`,
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
          title: "Truth Table Rows",
          content: `How many rows does a truth table need for 3 input variables?`,
          options: [
            "8",
            "6",
            "4",
            "3"
          ],
          answer: 0,
          explanation: `Number of truth table rows = **2^n** (where n = number of input variables)

- 1 variable: 2^1 = **2** rows
- 2 variables: 2^2 = **4** rows
- 3 variables: 2^3 = **8** rows
- 4 variables: 2^4 = **16** rows`
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Writing Logic Expressions",
          content: `What is the logic expression for:

"Output is 1 when A is 1 OR B is 0"`,
          options: [
            "A OR NOT B",
            "A AND NOT B",
            "NOT A OR B",
            "A XOR B"
          ],
          answer: 0,
          explanation: `Let's break down the condition:

- "A is 1" → **A**
- "B is 0" → **NOT B** (when B is 0, NOT B is 1)
- "OR" → **OR**

Therefore: **A OR NOT B**`
        }
      ]
    }
  ]
}
