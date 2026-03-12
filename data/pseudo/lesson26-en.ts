// ============================================
// Pseudocode Lesson 26: Boolean Logic 1 (English)
// IGCSE Computer Science - Logic gates & truth tables
// ============================================

import { LessonData } from '../types'

export const pseudoLesson26EnData: LessonData = {
  id: "pseudo-26",
  title: "Boolean Logic 1",
  emoji: "\uD83D\uDD32",
  description: "Learn logic gates and truth tables!",
  chapters: [
    {
      id: "ch1",
      title: "Basic Logic Gates",
      emoji: "\u26A1",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "\u26A1 What Are Logic Gates?",
          content: `A **logic gate** is an electronic circuit that takes one or more **binary inputs** (0 or 1) and produces a single **binary output** (0 or 1).

- **1** = TRUE / ON / High
- **0** = FALSE / OFF / Low

Logic gates are the building blocks of all digital circuits — every computer processor is made from millions of them!

In IGCSE Computer Science, you need to know **three basic gates**:

| Gate | Inputs | Description |
|---|---|---|
| **AND** | 2 | Output is 1 only when **both** inputs are 1 |
| **OR** | 2 | Output is 1 when **at least one** input is 1 |
| **NOT** | 1 | Output is the **opposite** of the input |`
        },
        {
          id: "ch1-and",
          type: "explain",
          title: "\uD83D\uDD32 The AND Gate",
          content: `The **AND** gate outputs 1 **only when both inputs are 1**.

Think of it like two switches in **series** — both must be ON for the light to turn on.

**Truth table for AND:**

| A | B | A AND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

In pseudocode, we write:
\`\`\`
X \u2190 A AND B
\`\`\`

**Key rule:** AND only gives 1 when **ALL** inputs are 1. If any input is 0, the output is 0.`
        },
        {
          id: "ch1-or",
          type: "explain",
          title: "\uD83D\uDD35 The OR Gate",
          content: `The **OR** gate outputs 1 **when at least one input is 1**.

Think of it like two switches in **parallel** — if either switch is ON, the light turns on.

**Truth table for OR:**

| A | B | A OR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

In pseudocode:
\`\`\`
X \u2190 A OR B
\`\`\`

**Key rule:** OR only gives 0 when **ALL** inputs are 0. If any input is 1, the output is 1.`
        },
        {
          id: "ch1-not",
          type: "explain",
          title: "\uD83D\uDD04 The NOT Gate",
          content: `The **NOT** gate has only **one input** and **reverses** it.

- If the input is 1, the output is 0
- If the input is 0, the output is 1

**Truth table for NOT:**

| A | NOT A |
|---|---|
| 0 | 1 |
| 1 | 0 |

In pseudocode:
\`\`\`
X \u2190 NOT A
\`\`\`

NOT is also called an **inverter** because it inverts (flips) the signal.

**Combining NOT with other gates:**
\`\`\`
X \u2190 NOT A AND B
\`\`\`
This means: first apply NOT to A, then AND the result with B.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 Truth Table Quiz",
          content: `Look at this truth table:

| A | B | Output |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Which logic gate does this truth table represent?`,
          options: [
            'AND',
            'OR',
            'NOT',
            'NAND'
          ],
          answer: 1,
          explanation: 'This is the **OR** gate. The output is 1 whenever **at least one** input is 1. It only outputs 0 when both inputs are 0. The AND gate would only output 1 when both are 1.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Predict the Output!",
          content: `Evaluate the following expression:

Given: **A = 1, B = 0**

\`\`\`
X \u2190 A AND (NOT B)
\`\`\`

What is the value of X?`,
          options: [
            '1',
            '0',
            'Cannot be determined',
            'Error'
          ],
          answer: 0,
          explanation: 'Step by step: First, evaluate **NOT B**. Since B = 0, NOT B = 1. Then evaluate **A AND 1**. Since A = 1, we get 1 AND 1 = **1**. So X = 1.'
        }
      ]
    },
    {
      id: "ch2",
      title: "Logic Expressions",
      emoji: "\uD83D\uDCDD",
      steps: [
        {
          id: "ch2-writing",
          type: "explain",
          title: "\uD83D\uDCDD Writing Boolean Expressions",
          content: `A **Boolean expression** combines inputs using AND, OR, and NOT to produce an output.

**Examples:**
\`\`\`
X \u2190 A AND B
X \u2190 A OR B
X \u2190 NOT A
X \u2190 (A AND B) OR C
X \u2190 NOT (A OR B)
X \u2190 A AND (NOT B)
\`\`\`

Boolean expressions can be written from:
- A **description** in words
- A **truth table**
- A **logic circuit diagram**

For example:
- "The alarm sounds when the door is open AND it is night time"
- \`Alarm \u2190 DoorOpen AND NightTime\``
        },
        {
          id: "ch2-precedence",
          type: "explain",
          title: "\u2696\uFE0F Operator Precedence",
          content: `Just like in maths (BIDMAS), Boolean operators have an **order of precedence**:

| Priority | Operator | Meaning |
|---|---|---|
| 1st (highest) | **NOT** | Evaluated first |
| 2nd | **AND** | Evaluated second |
| 3rd (lowest) | **OR** | Evaluated last |

**Use brackets** to make the order clear and override precedence!

**Example without brackets:**
\`\`\`
X \u2190 A OR B AND NOT C
\`\`\`
This means: X \u2190 A OR (B AND (NOT C))

Because NOT is evaluated first, then AND, then OR.

**Example with brackets:**
\`\`\`
X \u2190 (A OR B) AND NOT C
\`\`\`
Now OR is evaluated before AND because of the brackets.

**Exam tip:** Always use brackets to avoid confusion!`
        },
        {
          id: "ch2-evaluate",
          type: "explain",
          title: "\uD83D\uDCCA Evaluating Expressions Step by Step",
          content: `To evaluate a complex expression, work through it step by step:

**Example:** Evaluate \`X \u2190 (A OR B) AND NOT C\` when A=1, B=0, C=1

**Step 1:** Evaluate NOT first
- NOT C = NOT 1 = **0**

**Step 2:** Evaluate expressions in brackets
- A OR B = 1 OR 0 = **1**

**Step 3:** Evaluate AND
- 1 AND 0 = **0**

So X = **0**

**Another example:** Evaluate \`X \u2190 NOT A AND (B OR C)\` when A=0, B=1, C=0

**Step 1:** NOT A = NOT 0 = **1**
**Step 2:** B OR C = 1 OR 0 = **1**
**Step 3:** 1 AND 1 = **1**

So X = **1**

Always write out each step clearly in the exam to show your working!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Evaluate the Expression!",
          content: `Evaluate the following expression:

Given: **A = 1, B = 0, C = 1**

\`\`\`
X \u2190 (A OR B) AND NOT C
\`\`\`

What is the value of X?`,
          options: [
            '1',
            '0',
            'TRUE',
            'Cannot be determined'
          ],
          answer: 1,
          explanation: 'Step by step: **NOT C** = NOT 1 = 0. Then **(A OR B)** = 1 OR 0 = 1. Finally **1 AND 0** = 0. So X = **0**. Remember: NOT is evaluated first, then brackets, then AND.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 Expression Matching",
          content: `Which Boolean expression produces this truth table?

| A | B | Output |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

(Hint: The output is 1 only when both A and B are 0.)`,
          options: [
            'A AND B',
            'NOT A AND NOT B',
            'NOT (A AND B)',
            'A OR B'
          ],
          answer: 1,
          explanation: 'The output is 1 **only when both A=0 and B=0**. This means we need NOT A (which is 1 when A=0) AND NOT B (which is 1 when B=0). So the expression is **NOT A AND NOT B**. Option C (NAND) would give 1 for all rows except when both inputs are 1.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "\u270F\uFE0F Complete the Expression!",
          content: 'The output is 1 when A is 1 OR when B is 0. Complete the Boolean expression.',
          code: 'X \u2190 A ___ ___ B',
          fillBlanks: [
            { id: 1, answer: "OR", options: ["OR", "AND", "XOR", "NOR"] },
            { id: 2, answer: "NOT", options: ["NOT", "AND", "OR", "TRUE"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "Completing Truth Tables",
      emoji: "\uD83D\uDCCB",
      steps: [
        {
          id: "ch3-systematic",
          type: "explain",
          title: "\uD83D\uDCCB Systematic Truth Tables",
          content: `In the exam, you will often need to **complete a truth table**. Here is the systematic approach:

**Step 1:** List all possible input combinations.

For **2 inputs** (A, B), there are **4 rows**:
| A | B |
|---|---|
| 0 | 0 |
| 0 | 1 |
| 1 | 0 |
| 1 | 1 |

**Step 2:** Work through each row, evaluating the expression.

**Example:** Complete the truth table for \`X \u2190 A AND NOT B\`

| A | B | NOT B | A AND NOT B |
|---|---|---|---|
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |

**Tip:** Add **intermediate columns** (like NOT B) to reduce mistakes!`
        },
        {
          id: "ch3-rows",
          type: "explain",
          title: "\uD83D\uDD22 How Many Rows? (2^n Pattern)",
          content: `The number of rows in a truth table depends on the number of inputs:

| Inputs | Rows | Formula |
|---|---|---|
| 1 | 2 | 2^1 |
| 2 | 4 | 2^2 |
| 3 | 8 | 2^3 |
| 4 | 16 | 2^4 |
| n | 2^n | 2^n |

For **3 inputs** (A, B, C), list them systematically:

| A | B | C |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
| 1 | 1 | 1 |

**Pattern:** The rightmost column alternates every row (0,1,0,1...). The next column alternates every 2 rows (0,0,1,1...). The next every 4 rows (0,0,0,0,1,1,1,1).

This pattern ensures you never miss a combination!`
        },
        {
          id: "ch3-intermediate",
          type: "explain",
          title: "\uD83D\uDCC8 Working Through Intermediate Columns",
          content: `For complex expressions, always use **intermediate columns** to break the problem into simple steps.

**Example:** Complete the truth table for \`X \u2190 (A OR B) AND NOT C\`

| A | B | C | A OR B | NOT C | (A OR B) AND NOT C |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 |

The intermediate columns (A OR B, NOT C) make the final column much easier to calculate!

**Exam tip:** You get marks for showing intermediate working, even if your final answer is wrong.`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "\uD83D\uDD2E Complete the Truth Table!",
          content: `For the expression \`X \u2190 NOT A OR B\`, what is the output when A=1 and B=0?

| A | B | NOT A | NOT A OR B |
|---|---|---|---|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | ? |
| 1 | 1 | 0 | 1 |

What is the missing value?`,
          options: [
            '1',
            '0',
            'Cannot be determined',
            'Depends on the gate'
          ],
          answer: 1,
          explanation: 'When A=1 and B=0: First, **NOT A** = NOT 1 = 0. Then **0 OR B** = 0 OR 0 = **0**. The missing value is 0. This is the only row where the output is 0, because NOT A is 0 and B is also 0.'
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "\uD83E\uDDE0 How Many Rows?",
          content: 'A Boolean expression has **4 inputs** (A, B, C, D). How many rows does its truth table have?',
          options: [
            '8',
            '4',
            '16',
            '32'
          ],
          answer: 2,
          explanation: 'The formula is **2^n** where n is the number of inputs. For 4 inputs: 2^4 = **16 rows**. Remember: 1 input = 2 rows, 2 inputs = 4 rows, 3 inputs = 8 rows, 4 inputs = 16 rows.'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "\u270F\uFE0F Fill the Truth Table!",
          content: 'Complete the missing output values for the expression X = A AND B.',
          code: 'A=0, B=0  \u2192  X = ___\nA=0, B=1  \u2192  X = ___\nA=1, B=0  \u2192  X = ___\nA=1, B=1  \u2192  X = ___',
          fillBlanks: [
            { id: 1, answer: "0", options: ["0", "1"] },
            { id: 2, answer: "0", options: ["0", "1"] },
            { id: 3, answer: "0", options: ["0", "1"] },
            { id: 4, answer: "1", options: ["0", "1"] }
          ]
        }
      ]
    }
  ]
}
