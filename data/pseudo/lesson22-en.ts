// ============================================
// Pseudocode Lesson 22: Flowchart Practice (English)
// CIE Style Pseudocode - Solve problems with flowcharts!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson22EnData: LessonData = {
  id: "pseudo-22",
  title: "Flowchart Practice",
  emoji: "✏️",
  description: "Solve problems with flowcharts!",
  chapters: [
    {
      id: "ch1",
      title: "Trace Tables with Flowcharts",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 What is a Trace Table?",
          content: `A **trace table** is used to record the values of variables as a flowchart (or pseudocode) is executed step by step.

**How to create a trace table:**
1. Create one column for **each variable** in the flowchart
2. Add a column for **OUTPUT** (to record any displayed values)
3. Each time a variable changes, write the new value on a **new row**
4. Follow the flowchart from Start to Stop

**Example flowchart:**
\`\`\`
Start
  ↓
X ← 1
  ↓
┌→ Is X > 4? ──Yes──→ Stop
│    ↓ No
│  OUTPUT X * X
│    ↓
│  X ← X + 1
└────┘
\`\`\`

**Trace table:**

| X | OUTPUT |
|---|---|
| 1 | 1 |
| 2 | 4 |
| 3 | 9 |
| 4 | 16 |
| 5 | (loop exits) |

The output is: **1, 4, 9, 16** (the squares of 1 to 4).

**Exam tip:** In the CIE exam, you may be given a partially completed trace table and asked to fill in the missing values. Always work through the flowchart one step at a time!`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "📊 Trace Table: Counting Loop Example",
          content: `Let's trace a more complex flowchart that finds the sum of even numbers from 2 to 10.

**Flowchart:**
\`\`\`
Start
  ↓
Sum ← 0
  ↓
Num ← 2
  ↓
┌→ Is Num > 10? ──Yes──→ OUTPUT Sum → Stop
│    ↓ No
│  Sum ← Sum + Num
│    ↓
│  Num ← Num + 2
└────┘
\`\`\`

**Complete trace table:**

| Num | Sum | OUTPUT |
|---|---|---|
| 2 | 0 | |
| | 2 | |
| 4 | | |
| | 6 | |
| 6 | | |
| | 12 | |
| 8 | | |
| | 20 | |
| 10 | | |
| | 30 | |
| 12 | | 30 |

**Reading the trace table:**
- Each row shows one change. Num starts at 2, Sum starts at 0.
- Sum = 0 + 2 = 2, then Num becomes 4
- Sum = 2 + 4 = 6, then Num becomes 6
- Sum = 6 + 6 = 12, then Num becomes 8
- Sum = 12 + 8 = 20, then Num becomes 10
- Sum = 20 + 10 = 30, then Num becomes 12
- Num = 12 > 10? Yes → OUTPUT 30

Final output: **30** (which is 2 + 4 + 6 + 8 + 10).`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Trace the flowchart!",
          content: `Trace this flowchart which finds the largest of three numbers. The inputs are: **8, 15, 12**.

\`\`\`
Start
  ↓
INPUT A
  ↓
INPUT B
  ↓
INPUT C
  ↓
Max ← A
  ↓
Is B > Max? ──Yes──→ Max ← B
  ↓ No                  ↓
  ←──────────────────────┘
  ↓
Is C > Max? ──Yes──→ Max ← C
  ↓ No                  ↓
  ←──────────────────────┘
  ↓
OUTPUT "Largest: ", Max
  ↓
Stop
\`\`\`

What is the output?`,
          options: [
            'Largest: 15',
            'Largest: 12',
            'Largest: 8',
            'Largest: 35'
          ],
          answer: 0,
          explanation: `Trace step by step:
- A = 8, B = 15, C = 12
- Max ← A = 8
- Is B > Max? Is 15 > 8? **Yes** → Max ← 15
- Is C > Max? Is 12 > 15? **No** → Max stays 15
- OUTPUT "Largest: 15"

The answer is **Largest: 15**. This algorithm works by assuming the first number is the largest, then comparing each remaining number and updating Max if a larger one is found.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Trace Table Challenge",
          content: `A flowchart performs the following:
\`\`\`
Start → X ← 10 → Y ← 3
  ↓
┌→ Is X < Y? ──Yes──→ OUTPUT X → Stop
│    ↓ No
│  X ← X - Y
└────┘
\`\`\`

After tracing through this flowchart, what is the final output?`,
          options: [
            '1',
            '3',
            '0',
            '10'
          ],
          answer: 0,
          explanation: `Trace with X = 10, Y = 3:
- Is 10 < 3? No → X = 10 - 3 = 7
- Is 7 < 3? No → X = 7 - 3 = 4
- Is 4 < 3? No → X = 4 - 3 = 1
- Is 1 < 3? Yes → OUTPUT 1

The output is **1**. This flowchart actually calculates \`X MOD Y\` (the remainder when X is divided by Y). 10 MOD 3 = 1. This is a classic IGCSE exam question!`
        },
      ]
    },
    {
      id: "ch2",
      title: "Designing Flowcharts",
      emoji: "🎨",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎨 Steps to Design a Flowchart",
          content: `When given a problem in the exam, follow these steps to design your flowchart:

**Step 1: Identify the inputs and outputs**
- What data does the algorithm need?
- What should it display?

**Step 2: Plan the logic**
- What decisions need to be made?
- Are there any loops needed?
- What variables are required?

**Step 3: Draw the flowchart**
- Start with a **Start** terminator
- Use the correct symbols for each step
- Label all decision branches (Yes/No)
- End with a **Stop** terminator

**Step 4: Trace and verify**
- Test with sample data
- Check edge cases (what if the input is 0? Negative? Very large?)

**Common exam mistake:** Forgetting to initialise variables before a loop! If you have \`Total ← Total + Number\` inside a loop, you MUST set \`Total ← 0\` before the loop starts.`
        },
        {
          id: "ch2-patterns",
          type: "explain",
          title: "🔧 Common Flowchart Patterns",
          content: `These patterns appear frequently in IGCSE exams:

**1. Input Validation Loop**
\`\`\`
Start → INPUT Value
  ↓
┌→ Is Value valid? ──Yes──→ (continue program)
│    ↓ No
│  OUTPUT "Error"
│    ↓
│  INPUT Value
└────┘
\`\`\`
Keeps asking until the user enters valid data.

**2. Counting / Totalling**
\`\`\`
Start → Total ← 0 → Count ← 0
  ↓
┌→ Is Count = N? ──Yes──→ OUTPUT Total → Stop
│    ↓ No
│  INPUT Value
│  Total ← Total + Value
│  Count ← Count + 1
└────┘
\`\`\`
Adds up N values entered by the user.

**3. Linear Search**
\`\`\`
Start → INPUT SearchItem → Found ← FALSE → i ← 0
  ↓
┌→ Is i >= Length? ──Yes──→ OUTPUT "Not found" → Stop
│    ↓ No
│  Is List[i] = SearchItem? ──Yes──→ OUTPUT "Found at ", i → Stop
│    ↓ No
│  i ← i + 1
└────┘
\`\`\`
Searches through an array item by item.

These three patterns cover a large proportion of exam flowchart questions!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Find the error!",
          content: `A student wrote this flowchart to calculate the average of 5 numbers entered by the user. There is an error. What is it?

\`\`\`
Start
  ↓
Count ← 0
  ↓
┌→ Is Count = 5? ──Yes──→ Average ← Total / 5
│    ↓ No                        ↓
│  INPUT Num               OUTPUT Average
│    ↓                           ↓
│  Total ← Total + Num        Stop
│    ↓
│  Count ← Count + 1
└────┘
\`\`\``,
          options: [
            'Total is not initialised to 0 before the loop',
            'The loop should check Count > 5 instead of Count = 5',
            'Average should be Total / Count, not Total / 5',
            'INPUT should be outside the loop'
          ],
          answer: 0,
          explanation: `The error is that **Total is never initialised to 0**. The flowchart uses \`Total ← Total + Num\` inside the loop, but Total has no starting value.

Without \`Total ← 0\` before the loop, the program would either crash or produce an incorrect result because Total would contain whatever random value was in memory.

The fix: Add a process box \`Total ← 0\` right after Start (and before the loop). This is one of the most common mistakes students make in exams!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Which flowchart is correct?",
          content: `A program must repeatedly ask the user for a password until they enter "secret123". Then it outputs "Access Granted". Which description correctly implements this?`,
          options: [
            'Start → INPUT PW → Is PW = "secret123"? Yes → OUTPUT "Access Granted" → Stop / No → loop back to INPUT PW',
            'Start → Is PW = "secret123"? Yes → OUTPUT "Access Granted" → Stop / No → INPUT PW → loop back to decision',
            'Start → INPUT PW → OUTPUT "Access Granted" → Is PW = "secret123"? Yes → Stop / No → loop back to INPUT PW',
            'Start → PW ← "secret123" → INPUT PW → OUTPUT "Access Granted" → Stop'
          ],
          answer: 0,
          explanation: `Option A is correct. The flowchart should:
1. Start
2. INPUT the password first (the user must enter it at least once)
3. Check if it matches "secret123"
4. If Yes → OUTPUT "Access Granted" and Stop
5. If No → go back to step 2

Option B is wrong because it checks the password before asking for input. Option C outputs "Access Granted" before checking the password. Option D just sets the password without any loop.`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Complete the flowchart!",
          content: 'Complete this flowchart description that counts how many numbers (out of 10 inputs) are greater than 50.',
          codeTemplate: 'Start\n  ↓\nCount ← 0\n  ↓\ni ← ___\n  ↓\n[Is i > 10?] Yes → OUTPUT Count → Stop\n  ↓ No\nINPUT Num\n  ↓\n[Is Num ___ 50?] Yes → Count ← Count + ___\n  ↓\ni ← i + 1\n  ↓\nloop back to decision',
          fillBlanks: [
            { id: 1, answer: "1", options: ["1", "0", "10", "50"] },
            { id: 2, answer: ">", options: [">", ">=", "<", "="] },
            { id: 3, answer: "1", options: ["1", "Num", "i", "0"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Exam Practice",
      emoji: "📝",
      steps: [
        {
          id: "ch3-types",
          type: "explain",
          title: "📝 IGCSE Flowchart Question Types",
          content: `In the CIE IGCSE Computer Science Paper 2 exam, you will encounter these flowchart question types:

**Type 1: Trace the flowchart**
- You are given a flowchart and input values
- You must complete a trace table showing each variable's value
- Sometimes you fill in a partially completed trace table
- **Marks:** Typically 3-5 marks

**Type 2: State the purpose/output**
- Given a flowchart, describe what it does in words
- Or state the output for given inputs
- **Marks:** Typically 1-3 marks

**Type 3: Complete a flowchart**
- A flowchart with missing parts (blank boxes, missing conditions)
- You fill in the gaps to make it work correctly
- **Marks:** Typically 2-4 marks

**Type 4: Draw a flowchart**
- Given a problem description, draw the complete flowchart
- You must use correct symbols and label everything properly
- **Marks:** Typically 4-6 marks

**Type 5: Convert between flowchart and pseudocode**
- Write pseudocode from a flowchart, or vice versa
- **Marks:** Typically 3-5 marks`
        },
        {
          id: "ch3-tips",
          type: "explain",
          title: "💡 Exam Tips for Full Marks",
          content: `Follow these rules to avoid losing marks on flowchart questions:

**Drawing rules:**
- Always include **Start** and **Stop** terminators (oval shape)
- Use the **correct symbol** for each step (do not use rectangles for everything!)
- Label decision branches clearly with **Yes** and **No**
- Use **arrows** (not just lines) to show direction of flow
- Keep the flowchart neat - avoid crossing lines where possible

**Common mark-losing mistakes:**
1. Forgetting to initialise variables (e.g., \`Total ← 0\`)
2. Missing the Start or Stop terminator
3. Using the wrong symbol (rectangle instead of diamond for decisions)
4. Not labelling Yes/No on decision branches
5. Flow lines without arrowheads
6. Conditions in decision boxes that are not Yes/No questions
7. Variables used before they have a value

**Trace table tips:**
- Show **every** change to a variable, not just the final value
- If a variable does not change in a step, leave that cell blank (or repeat the value, depending on the exam format)
- Write the output values in a separate OUTPUT column
- Check your trace by counting the number of loop iterations

**Time management:** Spend about 1 minute per mark. A 4-mark flowchart question should take about 4 minutes.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Spot the Error!",
          content: `A student's flowchart for checking if a number is even or odd has this description:

Start → INPUT Number → [Is Number / 2 = 0?] → Yes: OUTPUT "Even" → Stop / No: OUTPUT "Odd" → Stop

What is wrong with the decision box condition?`,
          options: [
            'It should use MOD instead of division: Is Number MOD 2 = 0?',
            'The condition should be Is Number / 2 = 1?',
            'The Yes and No branches are swapped',
            'There is no error in this flowchart'
          ],
          answer: 0,
          explanation: `The decision box should use **MOD** (modulo), not division.

\`Number / 2\` gives the result of division (e.g., 7 / 2 = 3.5), which will almost never equal 0.

The correct condition is \`Number MOD 2 = 0\`:
- 8 MOD 2 = 0 → Even (correct)
- 7 MOD 2 = 1 → Odd (correct)

\`MOD\` returns the **remainder** after division. This is a very common question in IGCSE exams!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Complex Trace Challenge!",
          content: `Trace this flowchart with inputs: **3, -2, 6, 9, 0**.

\`\`\`
Start
  ↓
Total ← 0
  ↓
Count ← 0
  ↓
┌→ INPUT Num
│    ↓
│  Is Num = 0? ──Yes──→ Is Count > 0? ──Yes──→ Avg ← Total / Count
│    ↓ No                   ↓ No                     ↓
│  Is Num > 0? ──No──→ ┐   OUTPUT "No data"    OUTPUT Avg
│    ↓ Yes              │        ↓                   ↓
│  Total ← Total + Num │      Stop                 Stop
│    ↓                  │
│  Count ← Count + 1   │
│    ↓                  │
└──←────────────────────┘
\`\`\`

What is the output?`,
          options: [
            '6',
            '3.2',
            '16',
            'No data'
          ],
          answer: 0,
          explanation: `Trace with inputs 3, -2, 6, 9, 0:

- Num = 3: Is 3 = 0? No. Is 3 > 0? Yes → Total = 0 + 3 = 3, Count = 1. Loop back.
- Num = -2: Is -2 = 0? No. Is -2 > 0? No → negative numbers are ignored. Loop back.
- Num = 6: Is 6 = 0? No. Is 6 > 0? Yes → Total = 3 + 6 = 9, Count = 2. Loop back.
- Num = 9: Is 9 = 0? No. Is 9 > 0? Yes → Total = 9 + 9 = 18, Count = 3. Loop back.
- Num = 0: Is 0 = 0? Yes → Is Count > 0? Is 3 > 0? Yes → Avg = 18 / 3 = 6. OUTPUT 6.

The output is **6**. This flowchart calculates the average of all **positive** numbers entered, using 0 as a terminator. Negative numbers are skipped. The input value 0 is not reached for processing — it triggers the exit. The final input (after 0) is never read.`
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 What type of validation?",
          content: `A flowchart does the following:
\`\`\`
Start
  ↓
┌→ INPUT Mark
│    ↓
│  Is Mark >= 0 AND Mark <= 100?
│    ↓ Yes        ↓ No
│  (continue)   OUTPUT "Error: enter 0-100"
│                  ↓
└──────────────────┘
\`\`\`

What type of validation does this flowchart implement?`,
          options: [
            'Range check',
            'Length check',
            'Type check',
            'Presence check'
          ],
          answer: 0,
          explanation: `This is a **range check**. It validates that the input value (Mark) falls within an acceptable range of 0 to 100.

- **Range check**: ensures a value is between a minimum and maximum bound (0 <= Mark <= 100)
- **Length check**: would check the number of characters in a string
- **Type check**: would verify the data type (e.g., is it a number?)
- **Presence check**: would check the field is not empty

Range checks are the most common type of validation seen in IGCSE flowchart questions.`
        },
      ]
    },
  ]
}
