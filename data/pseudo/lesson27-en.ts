// ============================================
// Pseudocode Lesson 27: Boolean Logic 2 (English)
// IGCSE Computer Science - NAND, NOR, XOR & Logic Circuits
// ============================================

import { LessonData } from '../types'

export const pseudoLesson27EnData: LessonData = {
  id: "pseudo-27",
  title: "Boolean Logic 2",
  emoji: "\uD83D\uDD0C",
  description: "NAND, NOR, XOR and logic circuits!",
  chapters: [
    {
      id: "ch1",
      title: "Additional Logic Gates",
      emoji: "\uD83D\uDD37",
      steps: [
        {
          id: "ch1-nand",
          type: "explain",
          title: "\uD83D\uDD37 The NAND Gate",
          content: `The **NAND** gate is a combination of **NOT** and **AND**. It is the opposite of AND.

NAND = NOT (A AND B)

The output is 0 **only when both inputs are 1**. Otherwise, the output is 1.

**Truth table for NAND:**

| A | B | A AND B | NOT (A AND B) |
|---|---|---|---|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** |
| 1 | 1 | 1 | **0** |

In pseudocode:
\`\`\`
X \u2190 NOT (A AND B)
\`\`\`

**Fun fact:** The NAND gate is called a **universal gate** because any other gate (AND, OR, NOT) can be built using only NAND gates!`
        },
        {
          id: "ch1-nor",
          type: "explain",
          title: "\uD83D\uDD34 The NOR Gate",
          content: `The **NOR** gate is a combination of **NOT** and **OR**. It is the opposite of OR.

NOR = NOT (A OR B)

The output is 1 **only when both inputs are 0**. Otherwise, the output is 0.

**Truth table for NOR:**

| A | B | A OR B | NOT (A OR B) |
|---|---|---|---|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 1 | **0** |
| 1 | 0 | 1 | **0** |
| 1 | 1 | 1 | **0** |

In pseudocode:
\`\`\`
X \u2190 NOT (A OR B)
\`\`\`

**NOR** is also a universal gate. Notice that NOR gives 1 only when **all inputs are 0** — the exact opposite of OR.`
        },
        {
          id: "ch1-xor",
          type: "explain",
          title: "\u2B50 The XOR Gate (Exclusive OR)",
          content: `The **XOR** (Exclusive OR) gate outputs 1 **when the inputs are different**.

If both inputs are the same (both 0 or both 1), the output is 0.

**Truth table for XOR:**

| A | B | A XOR B |
|---|---|---|
| 0 | 0 | **0** |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | **0** |

Compare OR and XOR:

| A | B | A OR B | A XOR B |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | **1** | **0** |

The difference is the last row! OR gives 1 when both inputs are 1, but XOR gives 0.

**Memory trick:** XOR means "one or the other, but NOT both!"`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 Identify the Gate!",
          content: 'Which logic gate gives an output of **1** when **both inputs are 0**?',
          options: [
            'AND',
            'OR',
            'NOR',
            'XOR'
          ],
          answer: 2,
          explanation: 'The **NOR** gate gives output 1 only when both inputs are 0. NOR = NOT(A OR B). When A=0 and B=0: A OR B = 0, then NOT 0 = **1**. AND gives 0, OR gives 0, and XOR gives 0 when both inputs are 0.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Predict All Three!",
          content: `Given: **A = 1, B = 1**

What are the outputs of NAND, NOR, and XOR?

\`\`\`
P \u2190 NOT (A AND B)
Q \u2190 NOT (A OR B)
R \u2190 A XOR B
\`\`\``,
          options: [
            'P=0, Q=0, R=0',
            'P=1, Q=0, R=0',
            'P=0, Q=0, R=1',
            'P=1, Q=1, R=0'
          ],
          answer: 0,
          explanation: '**NAND:** NOT(1 AND 1) = NOT(1) = **0**. **NOR:** NOT(1 OR 1) = NOT(1) = **0**. **XOR:** 1 XOR 1 = **0** (inputs are the same, so output is 0). All three outputs are 0!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "\u270F\uFE0F Complete the XOR Truth Table!",
          content: 'Fill in the missing XOR output values.',
          codeTemplate: 'A=0, B=0  \u2192  A XOR B = ___\nA=0, B=1  \u2192  A XOR B = ___\nA=1, B=0  \u2192  A XOR B = ___\nA=1, B=1  \u2192  A XOR B = ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1"] },
            { id: 2, answer: "1", options: ["0", "1"] },
            { id: 3, answer: "1", options: ["0", "1"] },
            { id: 4, answer: "0", options: ["0", "1"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Logic Circuits",
      emoji: "\uD83D\uDD0C",
      steps: [
        {
          id: "ch2-combine",
          type: "explain",
          title: "\uD83D\uDD0C Combining Logic Gates",
          content: `A **logic circuit** combines multiple gates together. The output of one gate becomes the input of the next gate.

**Example circuit:**
\`\`\`
A \u2500\u2500\u2510
      \u251C\u2500 AND \u2500\u2500\u2510
B \u2500\u2500\u2518           \u251C\u2500 OR \u2500\u2500 Q
C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`

In this circuit:
- A and B go into an **AND gate**, producing output P
- P and C go into an **OR gate**, producing output Q

The Boolean expression is:
\`\`\`
P \u2190 A AND B
Q \u2190 P OR C
\`\`\`

Which simplifies to:
\`\`\`
Q \u2190 (A AND B) OR C
\`\`\`

We can combine the intermediate steps into a single expression!`
        },
        {
          id: "ch2-trace",
          type: "explain",
          title: "\uD83D\uDD0D How to Trace a Logic Circuit",
          content: `To find the output of a circuit for given inputs, **trace from left to right** (from inputs to output):

**Example:** Find the output when A=1, B=0, C=1
\`\`\`
A \u2500\u2500\u2510
      \u251C\u2500 AND \u2500\u2500 P \u2500\u2500\u2510
B \u2500\u2500\u2518                  \u251C\u2500 OR \u2500\u2500 Q
C \u2500\u2500\u2500\u2500 NOT \u2500\u2500 R \u2500\u2500\u2518
\`\`\`

**Step 1:** Evaluate the first layer of gates
- AND gate: P = A AND B = 1 AND 0 = **0**
- NOT gate: R = NOT C = NOT 1 = **0**

**Step 2:** Evaluate the second layer
- OR gate: Q = P OR R = 0 OR 0 = **0**

So the output Q = **0**

The expression is: \`Q \u2190 (A AND B) OR (NOT C)\`

**Exam strategy:**
1. Label each gate's output with a letter (P, Q, R...)
2. Calculate each gate left to right
3. Substitute into the next gate until you reach the final output`
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "\uD83D\uDD04 Circuits and Expressions",
          content: `You need to be able to **convert between circuits and expressions** in both directions.

**Circuit to Expression:**
Read the circuit from inputs to output, writing each gate as an operation:
\`\`\`
A \u2500\u2500 NOT \u2500\u2500\u2510
              \u251C\u2500 AND \u2500\u2500 X
B \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`
Expression: \`X \u2190 (NOT A) AND B\`

**Expression to Circuit:**
Break the expression into individual operations:
\`\`\`
X \u2190 A OR (B AND C)
\`\`\`
1. B and C go into an AND gate \u2192 output P
2. A and P go into an OR gate \u2192 output X

**More complex example:**
\`\`\`
X \u2190 (NOT A) AND (B OR C)
\`\`\`
1. A goes into a NOT gate \u2192 output P
2. B and C go into an OR gate \u2192 output Q
3. P and Q go into an AND gate \u2192 output X

**Exam tip:** Always check your expression by tracing through the circuit with test values!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Trace the Circuit!",
          content: `Trace this circuit with **A=1, B=0, C=1**:

\`\`\`
A \u2500\u2500\u2510
      \u251C\u2500 OR  \u2500\u2500 P \u2500\u2500\u2510
B \u2500\u2500\u2518                  \u251C\u2500 AND \u2500\u2500 Q
C \u2500\u2500\u2500\u2500 NOT \u2500\u2500 R \u2500\u2500\u2518
\`\`\`

What is the value of Q?`,
          options: [
            '1',
            '0',
            'Cannot be determined',
            'Error in circuit'
          ],
          answer: 1,
          explanation: '**Step 1:** P = A OR B = 1 OR 0 = 1. R = NOT C = NOT 1 = 0. **Step 2:** Q = P AND R = 1 AND 0 = **0**. The expression is Q = (A OR B) AND (NOT C).'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 Circuit to Expression",
          content: `A circuit has:
- Gate 1: A and B go into an **AND** gate, producing output P
- Gate 2: P goes into a **NOT** gate, producing output X

Which Boolean expression matches this circuit?`,
          options: [
            'X = A AND B',
            'X = NOT A AND NOT B',
            'X = NOT (A AND B)',
            'X = NOT A OR NOT B'
          ],
          answer: 2,
          explanation: 'Gate 1 produces P = A AND B. Gate 2 applies NOT to P, giving X = NOT(P) = **NOT(A AND B)**. This is actually a NAND operation! Note that NOT(A AND B) is different from (NOT A) AND (NOT B).'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "\u270F\uFE0F Write the Expression!",
          content: 'A circuit has: inputs A and B go into an OR gate (output P), then P and input C go into an AND gate (output X). Write the expression.',
          codeTemplate: 'P \u2190 A ___ B\nX \u2190 P ___ C\n// Simplified: X \u2190 (A ___ B) AND C',
          fillBlanks: [
            { id: 1, answer: "OR", options: ["OR", "AND", "XOR", "NOT"] },
            { id: 2, answer: "AND", options: ["AND", "OR", "NAND", "NOR"] },
            { id: 3, answer: "OR", options: ["OR", "AND", "NOT", "XOR"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "Exam Practice",
      emoji: "\uD83D\uDCDD",
      steps: [
        {
          id: "ch3-types",
          type: "explain",
          title: "\uD83D\uDCDD IGCSE Logic Gate Questions",
          content: `In the IGCSE Paper 2 exam, you will encounter these types of logic gate questions:

**Type 1: Complete a truth table**
Given an expression or circuit, fill in the output column.

**Type 2: Write the Boolean expression**
Given a circuit diagram, write the matching expression.

**Type 3: Trace a circuit**
Given input values, find the output by tracing through each gate.

**Type 4: Identify a gate or expression**
Given a truth table, identify which gate or expression produces it.

**Type 5: Draw or describe a circuit**
Given an expression, draw or describe the corresponding circuit.

All of these are typically worth **2-4 marks** each. Showing clear working is essential!`
        },
        {
          id: "ch3-tips",
          type: "explain",
          title: "\uD83C\uDFAF Exam Tips and Common Mistakes",
          content: `**Top tips for logic gate questions:**

1. **Always evaluate NOT first** - NOT has the highest precedence
2. **Use intermediate columns** in truth tables to show working
3. **Label gate outputs** (P, Q, R...) when tracing circuits
4. **Check your answers** by substituting test values back into the expression

**Common mistakes to avoid:**

| Mistake | Correct approach |
|---|---|
| Forgetting NOT is evaluated first | Apply NOT before AND or OR |
| Confusing NAND with NOR | NAND = NOT(AND), NOR = NOT(OR) |
| Mixing up OR and XOR | OR: 1,1 \u2192 1. XOR: 1,1 \u2192 0 |
| Missing rows in truth table | Use 2^n formula for row count |
| Not showing working | Write intermediate steps for marks |

**Remember:**
- AND = "both must be 1"
- OR = "at least one must be 1"
- XOR = "exactly one must be 1"
- NOT = "flip the value"`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 Identify the Gate Combination",
          content: `Study this truth table:

| A | B | Output |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Which gate produces this output?`,
          options: [
            'AND',
            'NOR',
            'NAND',
            'XOR'
          ],
          answer: 2,
          explanation: 'The output is 1 for all rows except when both inputs are 1 (where output is 0). This is the **NAND** gate: NOT(A AND B). It is the exact opposite of AND. With AND, only 1,1 gives 1. With NAND, only 1,1 gives 0.'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Complex Circuit Trace",
          content: `Trace this circuit with **A=0, B=1, C=1**:

\`\`\`
A \u2500\u2500 NOT \u2500\u2500 P \u2500\u2500\u2510
                    \u251C\u2500 AND \u2500\u2500 S \u2500\u2500\u2510
B \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518                  \u251C\u2500 OR \u2500\u2500 X
C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\`\`\`

Expression: \`X \u2190 ((NOT A) AND B) OR C\`

What is the value of X?`,
          options: [
            '1',
            '0',
            'Cannot be determined',
            'Error'
          ],
          answer: 0,
          explanation: '**Step 1:** P = NOT A = NOT 0 = 1. **Step 2:** S = P AND B = 1 AND 1 = 1. **Step 3:** X = S OR C = 1 OR 1 = **1**. Even if S were 0, the output would still be 1 because C=1 and anything OR 1 = 1.'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "\uD83C\uDFC6 Final Challenge!",
          content: `Which two Boolean expressions are **equivalent** (produce the same truth table)?

Expression 1: \`NOT (A AND B)\`
Expression 2: \`(NOT A) OR (NOT B)\`
Expression 3: \`(NOT A) AND (NOT B)\`
Expression 4: \`NOT (A OR B)\``,
          options: [
            'Expression 1 and Expression 2',
            'Expression 1 and Expression 3',
            'Expression 2 and Expression 4',
            'Expression 3 and Expression 4'
          ],
          answer: 0,
          explanation: 'Expressions 1 and 2 are equivalent by **De Morgan\'s Law**: NOT(A AND B) = (NOT A) OR (NOT B). Similarly, Expressions 3 and 4 are also equivalent: NOT(A OR B) = (NOT A) AND (NOT B). De Morgan\'s Law is useful in simplification, though it is not always directly tested at IGCSE level.'
        }
      ]
    }
  ]
}
