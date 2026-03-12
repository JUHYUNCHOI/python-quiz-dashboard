// ============================================
// Pseudocode Lesson 21: Flowchart Basics (English)
// CIE Style Pseudocode - Represent algorithms with diagrams!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson21EnData: LessonData = {
  id: "pseudo-21",
  title: "Flowchart Basics",
  emoji: "📐",
  description: "Represent algorithms with diagrams!",
  chapters: [
    {
      id: "ch1",
      title: "Flowchart Symbols",
      emoji: "🔷",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📐 What is a Flowchart?",
          content: `A **flowchart** is a diagram that shows the steps of an algorithm using standard symbols connected by **flow lines** (arrows).

Why use flowcharts?
- They provide a **visual** way to understand an algorithm
- They are language-independent (no pseudocode syntax to remember)
- They make the **flow of control** (order of steps) very clear
- They are required in **CIE IGCSE Paper 2** exams!

In IGCSE, there are **6 standard symbols** you must know:

| Symbol | Shape | Purpose |
|---|---|---|
| **Terminator** | Rounded rectangle / Oval | Start or Stop |
| **Process** | Rectangle | Assignment, calculation |
| **Decision** | Diamond | Condition check (Yes/No) |
| **Input/Output** | Parallelogram | INPUT or OUTPUT data |
| **Subroutine** | Double-bordered rectangle | CALL a procedure/function |
| **Flow lines** | Arrows | Show direction of flow |

Every flowchart must begin with a **Start** terminator and end with a **Stop** terminator.`
        },
        {
          id: "ch1-symbols",
          type: "explain",
          title: "🔷 Symbols in Detail",
          content: `Let's look at each symbol with practical examples:

**1. Terminator (Oval / Rounded Rectangle)**
- Contains the word \`Start\` or \`Stop\`
- Every flowchart has exactly one Start and at least one Stop

**2. Process (Rectangle)**
- Used for assignments and calculations
- Examples: \`Total ← Total + 1\`, \`Count ← 0\`, \`Average ← Sum / N\`
- Any action that changes a variable goes in a process box

**3. Decision (Diamond)**
- Contains a condition that evaluates to **Yes** or **No**
- Examples: \`Is x > 10?\`, \`Is Count = 5?\`, \`Is Grade >= 50?\`
- Always has **two** outgoing arrows labelled **Yes** and **No**
- Used for IF statements and loop conditions

**4. Input/Output (Parallelogram)**
- Used when reading data from the user or displaying results
- Examples: \`INPUT Name\`, \`OUTPUT "Hello"\`, \`OUTPUT Total\`

**5. Subroutine (Double-bordered Rectangle)**
- Calls a separately defined procedure or function
- Example: \`CALL CalculateAverage()\`
- The subroutine's own flowchart is drawn separately

**6. Flow Lines (Arrows)**
- Connect symbols in the order they execute
- Must always have an arrowhead showing direction
- Lines should not cross if possible`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Symbol Knowledge Check",
          content: `A flowchart needs to show the step: "Check if the temperature is above 30 degrees, and take different actions for Yes and No."

Which symbol should be used for this step?`,
          options: [
            'Rectangle (Process box)',
            'Diamond (Decision box)',
            'Parallelogram (Input/Output box)',
            'Oval (Terminator)'
          ],
          answer: 1,
          explanation: 'A **Diamond (Decision box)** is used for any condition that requires a Yes/No check. The condition "Is temperature > 30?" goes inside the diamond, with two branches: one for Yes and one for No. A rectangle would be used for calculations, not for making decisions.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Which symbols are needed?",
          content: `An algorithm does the following:
1. Start
2. Ask the user to enter a number
3. Multiply the number by 2
4. Display the result
5. Stop

Which sequence of symbol shapes is correct for steps 2, 3, and 4?`,
          options: [
            'Parallelogram, Rectangle, Parallelogram',
            'Rectangle, Rectangle, Parallelogram',
            'Parallelogram, Diamond, Rectangle',
            'Rectangle, Parallelogram, Diamond'
          ],
          answer: 0,
          explanation: 'Step 2 (INPUT a number) uses a **Parallelogram** (Input/Output). Step 3 (multiply by 2) is a calculation, so it uses a **Rectangle** (Process). Step 4 (OUTPUT the result) uses a **Parallelogram** (Input/Output) again. The correct sequence is: Parallelogram → Rectangle → Parallelogram.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Match each flowchart action to the correct symbol shape.',
          codeTemplate: '// Displaying "Welcome!" on screen → ___ symbol\n// Checking if Age >= 18 → ___ symbol\n// Setting Counter ← Counter + 1 → ___ symbol',
          fillBlanks: [
            { id: 1, answer: "Parallelogram", options: ["Parallelogram", "Rectangle", "Diamond", "Oval"] },
            { id: 2, answer: "Diamond", options: ["Diamond", "Rectangle", "Parallelogram", "Double-bordered rectangle"] },
            { id: 3, answer: "Rectangle", options: ["Rectangle", "Parallelogram", "Diamond", "Oval"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Reading Flowcharts",
      emoji: "👁️",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "👁️ How to Trace a Flowchart",
          content: `To **trace** a flowchart means to follow it step by step, keeping track of all variable values and outputs.

**Steps for tracing a flowchart:**
1. Start at the **Start** terminator
2. Follow the arrows to the next symbol
3. For **Process** boxes: update the variable values
4. For **Input/Output** boxes: record what is input or output
5. For **Decision** boxes: evaluate the condition, then follow the correct branch (Yes or No)
6. Continue until you reach the **Stop** terminator

**Important tips:**
- Always follow the arrows - never skip a symbol
- At a Decision diamond, you MUST go one way only (Yes OR No)
- Keep a note of all variable values as they change
- Write down every output in order

Creating a **trace table** is the best way to track this. We will cover trace tables in detail in the next lesson!`
        },
        {
          id: "ch2-decision",
          type: "explain",
          title: "🔀 Decision Boxes and Branches",
          content: `The **Decision diamond** is the most important symbol to understand. It creates **branches** in your flowchart.

Every decision box:
- Contains a **condition** (e.g., \`Is Score >= 50?\`)
- Has exactly **two** outgoing arrows: **Yes** and **No**
- Each arrow leads to a different path

**Example: Grade Classification Flowchart**
\`\`\`
Start
  ↓
INPUT Score
  ↓
Is Score >= 70? ──Yes──→ OUTPUT "A"
  ↓ No
Is Score >= 60? ──Yes──→ OUTPUT "B"
  ↓ No
Is Score >= 50? ──Yes──→ OUTPUT "C"
  ↓ No
OUTPUT "F"
  ↓
Stop
\`\`\`

If Score = 65:
- Is 65 >= 70? **No** → go down
- Is 65 >= 60? **Yes** → OUTPUT "B"

If Score = 45:
- Is 45 >= 70? **No** → go down
- Is 45 >= 60? **No** → go down
- Is 45 >= 50? **No** → go down
- OUTPUT "F"`
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔁 Loops in Flowcharts",
          content: `Loops are shown in flowcharts by **arrows that go back** to an earlier point in the diagram.

**Example: A counting loop flowchart (count from 1 to 5)**
\`\`\`
Start
  ↓
Count ← 1
  ↓
┌→ Is Count > 5? ──Yes──→ Stop
│    ↓ No
│  OUTPUT Count
│    ↓
│  Count ← Count + 1
└────┘
\`\`\`

Trace with this flowchart:
- Count = 1: Is 1 > 5? No → OUTPUT 1, Count = 2
- Count = 2: Is 2 > 5? No → OUTPUT 2, Count = 3
- Count = 3: Is 3 > 5? No → OUTPUT 3, Count = 4
- Count = 4: Is 4 > 5? No → OUTPUT 4, Count = 5
- Count = 5: Is 5 > 5? No → OUTPUT 5, Count = 6
- Count = 6: Is 6 > 5? **Yes** → Stop

Output: **1, 2, 3, 4, 5**

The arrow going back up creates the repetition. The Decision box controls when the loop stops.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Trace the flowchart!",
          content: `Follow this flowchart with input value **7**:

\`\`\`
Start
  ↓
INPUT Num
  ↓
Result ← 0
  ↓
┌→ Is Num <= 0? ──Yes──→ OUTPUT Result → Stop
│    ↓ No
│  Result ← Result + Num
│    ↓
│  Num ← Num - 3
└────┘
\`\`\`

What is the output?`,
          options: [
            '12',
            '18',
            '15',
            '7'
          ],
          answer: 0,
          explanation: `Trace step by step with Num = 7, Result = 0:
- Is 7 <= 0? No → Result = 0 + 7 = 7, Num = 7 - 3 = 4
- Is 4 <= 0? No → Result = 7 + 4 = 11, Num = 4 - 3 = 1
- Is 1 <= 0? No → Result = 11 + 1 = 12, Num = 1 - 3 = -2
- Is -2 <= 0? Yes → OUTPUT 12

The output is **12** (which is 7 + 4 + 1).`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 What does this flowchart do?",
          content: `A flowchart does the following:
1. Start
2. INPUT a number N
3. If N > 0, go to step 4. If N <= 0, go to step 6.
4. OUTPUT "Positive"
5. Go to Stop
6. If N < 0, go to step 7. If N >= 0, go to step 8.
7. OUTPUT "Negative", go to Stop
8. OUTPUT "Zero"
9. Stop

What algorithm does this flowchart implement?`,
          options: [
            'It finds the absolute value of a number',
            'It classifies a number as Positive, Negative, or Zero',
            'It checks if a number is even or odd',
            'It counts down from N to zero'
          ],
          answer: 1,
          explanation: 'This flowchart classifies any input number into three categories: **Positive** (N > 0), **Negative** (N < 0), or **Zero** (N = 0). This is a common selection/branching algorithm that uses nested decision boxes.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Complete the flowchart!",
          content: 'A flowchart checks if a student passed (score >= 50). Complete the missing decision box condition and outputs.',
          codeTemplate: 'Start\n  ↓\nINPUT Score\n  ↓\nIs Score ___ 50? ──Yes──→ OUTPUT "___"\n  ↓ No\nOUTPUT "___"\n  ↓\nStop',
          fillBlanks: [
            { id: 1, answer: ">=", options: [">=", ">", "<=", "="] },
            { id: 2, answer: "Pass", options: ["Pass", "Fail", "True", "Yes"] },
            { id: 3, answer: "Fail", options: ["Fail", "Pass", "False", "No"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Flowcharts and Pseudocode",
      emoji: "🔄",
      steps: [
        {
          id: "ch3-selection",
          type: "explain",
          title: "🔄 Flowchart to Pseudocode: Selection",
          content: `You often need to convert between flowcharts and pseudocode. Let's start with **selection** (IF statements).

**Flowchart:**
\`\`\`
Start
  ↓
INPUT Age
  ↓
Is Age >= 18? ──Yes──→ OUTPUT "Adult"
  ↓ No                      ↓
OUTPUT "Minor"          ┐
  ↓                     │
  ←─────────────────────┘
  ↓
Stop
\`\`\`

**Equivalent Pseudocode:**
\`\`\`
DECLARE Age : INTEGER

OUTPUT "Enter your age: "
INPUT Age

IF Age >= 18 THEN
    OUTPUT "Adult"
ELSE
    OUTPUT "Minor"
ENDIF
\`\`\`

**Conversion rules:**
- The **Decision diamond** becomes an \`IF...THEN\` statement
- The **Yes** branch is the code after \`THEN\`
- The **No** branch is the code after \`ELSE\`
- Where the branches rejoin becomes \`ENDIF\``
        },
        {
          id: "ch3-loop",
          type: "explain",
          title: "🔁 Flowchart to Pseudocode: Loops",
          content: `When a flowchart arrow loops back, it becomes a **loop** in pseudocode.

**Flowchart (WHILE loop pattern):**
\`\`\`
Start
  ↓
Total ← 0
  ↓
Count ← 1
  ↓
┌→ Is Count > 10? ──Yes──→ OUTPUT Total → Stop
│    ↓ No
│  Total ← Total + Count
│    ↓
│  Count ← Count + 1
└────┘
\`\`\`

**Equivalent Pseudocode:**
\`\`\`
DECLARE Total : INTEGER
DECLARE Count : INTEGER

Total ← 0
Count ← 1

WHILE Count <= 10 DO
    Total ← Total + Count
    Count ← Count + 1
ENDWHILE

OUTPUT Total
\`\`\`

**Important conversion note:**
- In the flowchart, the decision says \`Is Count > 10?\` with **Yes** meaning "exit the loop"
- In pseudocode, the WHILE condition is the **opposite**: \`Count <= 10\` means "keep looping"
- The flowchart tests for the **exit** condition; WHILE tests for the **continue** condition
- This is a very common exam trick!`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `This flowchart has a counting loop. What is the output when the input is **5**?

\`\`\`
Start
  ↓
INPUT N
  ↓
Result ← 1
  ↓
Counter ← 1
  ↓
┌→ Is Counter > N? ──Yes──→ OUTPUT Result → Stop
│    ↓ No
│  Result ← Result * Counter
│    ↓
│  Counter ← Counter + 1
└────┘
\`\`\``,
          options: [
            '120',
            '15',
            '24',
            '5'
          ],
          answer: 0,
          explanation: `This flowchart calculates the **factorial** of N (N!).

Trace with N = 5:
- Counter=1: 1 > 5? No → Result = 1 * 1 = 1, Counter = 2
- Counter=2: 2 > 5? No → Result = 1 * 2 = 2, Counter = 3
- Counter=3: 3 > 5? No → Result = 2 * 3 = 6, Counter = 4
- Counter=4: 4 > 5? No → Result = 6 * 4 = 24, Counter = 5
- Counter=5: 5 > 5? No → Result = 24 * 5 = 120, Counter = 6
- Counter=6: 6 > 5? Yes → OUTPUT 120

The output is **120** (which is 5! = 5 × 4 × 3 × 2 × 1).`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Flowchart to Pseudocode",
          content: `A flowchart has this structure:
- Start
- INPUT X
- Decision: Is X > 0?
  - Yes → loops back to INPUT X
  - No → OUTPUT X
- Stop

Which pseudocode correctly matches this flowchart?`,
          options: [
            'REPEAT\n    INPUT X\nUNTIL X <= 0\nOUTPUT X',
            'INPUT X\nWHILE X > 0 DO\n    INPUT X\nENDWHILE\nOUTPUT X',
            'INPUT X\nIF X > 0 THEN\n    INPUT X\nENDIF\nOUTPUT X',
            'WHILE X <= 0 DO\n    INPUT X\nENDWHILE\nOUTPUT X'
          ],
          answer: 0,
          explanation: `The flowchart inputs X, then checks if X > 0. If Yes, it goes back to input again. If No (X <= 0), it exits and outputs X.

This is a **REPEAT...UNTIL** pattern: the body (INPUT X) always executes at least once, and it repeats UNTIL the exit condition is met (X <= 0).

Option A is correct: \`REPEAT INPUT X UNTIL X <= 0\` then \`OUTPUT X\`.

Option B would also work but requires an initial INPUT before the WHILE loop. The REPEAT...UNTIL more directly matches the flowchart structure where the input happens before the check.`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Flowchart to Pseudocode",
          content: 'Convert this flowchart to pseudocode. The flowchart: Start → Sum ← 0 → i ← 1 → [Is i > 100?] Yes → OUTPUT Sum → Stop / No → Sum ← Sum + i → i ← i + 1 → loop back to decision.',
          codeTemplate: 'Sum ← 0\ni ← 1\n___ i <= 100 ___\n    Sum ← Sum + i\n    i ← i + 1\n___\nOUTPUT Sum',
          fillBlanks: [
            { id: 1, answer: "WHILE", options: ["WHILE", "REPEAT", "FOR", "IF"] },
            { id: 2, answer: "DO", options: ["DO", "THEN", "LOOP", "TO"] },
            { id: 3, answer: "ENDWHILE", options: ["ENDWHILE", "UNTIL", "ENDFOR", "ENDIF"] }
          ]
        },
      ]
    },
  ]
}
