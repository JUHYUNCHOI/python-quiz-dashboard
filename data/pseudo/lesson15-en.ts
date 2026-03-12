// ============================================
// Pseudocode Lesson 15: Linear Search (English)
// CIE Style Pseudocode - Find by checking one by one!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson15EnData: LessonData = {
  id: "pseudo-15",
  title: "Linear Search",
  emoji: "🔍",
  description: "Find by checking one by one!",
  chapters: [
    {
      id: "ch1",
      title: "What is Linear Search?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 What is Linear Search?",
          content: `**Linear search** is the simplest searching algorithm. It checks each element **one by one** from the start to the end of a list.

Think of it like looking for a specific book on a shelf:
- You start from the **left**
- Check each book **one at a time**
- Stop when you **find it** or reach the **end**

| Position | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Value | 34 | 12 | 78 | 56 | 23 |

Looking for **78**? Start at position 1, check 34 (no), check 12 (no), check 78 (yes! Found at position 3!).

Linear search works on **any** list - sorted or unsorted!`
        },
        {
          id: "ch1-algo",
          type: "explain",
          title: "📋 The Algorithm",
          content: `Here is the full **linear search** pseudocode:

\`\`\`
FUNCTION LinearSearch(items : ARRAY, target : INTEGER) RETURNS INTEGER
    FOR i ← 1 TO LENGTH(items)
        IF items[i] = target THEN
            RETURN i
        ENDIF
    NEXT i
    RETURN -1
ENDFUNCTION
\`\`\`

How it works:
1. Loop through **every element** from index 1 to the end
2. **Compare** each element with the target value
3. If a match is found, **RETURN** the index immediately (early exit!)
4. If the loop finishes without finding it, **RETURN -1** (meaning "not found")

The \`RETURN i\` inside the loop is called an **early return** - we stop searching as soon as we find the answer!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the linear search function.',
          codeTemplate: 'FUNCTION LinearSearch(items : ARRAY, target : INTEGER) RETURNS INTEGER\n    ___ i ← 1 TO LENGTH(items)\n        IF items[i] ___ target THEN\n            ___ i\n        ENDIF\n    NEXT i\n    RETURN -1\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "FOR", options: ["FOR", "WHILE", "REPEAT", "LOOP"] },
            { id: 2, answer: "=", options: ["=", "<>", ">", "<"] },
            { id: 3, answer: "RETURN", options: ["RETURN", "OUTPUT", "PRINT", "SEND"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE data : ARRAY[1:5] OF INTEGER
data[1] ← 10
data[2] ← 25
data[3] ← 40
data[4] ← 15
data[5] ← 30

DECLARE found : INTEGER
found ← -1

FOR i ← 1 TO 5
    IF data[i] = 40 THEN
        found ← i
    ENDIF
NEXT i

OUTPUT found
\`\`\``,
          options: [
            '40',
            '3',
            '-1',
            '5'
          ],
          answer: 1,
          explanation: 'The loop checks each element: data[1]=10 (no), data[2]=25 (no), data[3]=40 (yes! found ← 3). The loop continues but no other matches are found. The output is **3**, the index where 40 was found.'
        },
      ]
    },
    {
      id: "ch2",
      title: "Linear Search in Practice",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-practical",
          type: "explain",
          title: "🔧 Practical Linear Search",
          content: `Let's see a more practical example - searching for a student name:

\`\`\`
DECLARE names : ARRAY[1:5] OF STRING
names[1] ← "Alice"
names[2] ← "Bob"
names[3] ← "Carol"
names[4] ← "Dave"
names[5] ← "Eve"

DECLARE searchName : STRING
OUTPUT "Enter name to find: "
INPUT searchName

DECLARE position : INTEGER
position ← -1

FOR i ← 1 TO 5
    IF names[i] = searchName THEN
        position ← i
    ENDIF
NEXT i

IF position <> -1 THEN
    OUTPUT searchName, " found at position ", position
ELSE
    OUTPUT searchName, " not found!"
ENDIF
\`\`\`

After the search, we check if \`position\` is still -1:
- If **not -1** → the name was found!
- If **still -1** → the name is not in the array`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In the worst case, how many comparisons does a linear search make on an array of 100 elements?',
          options: [
            '1',
            '50',
            '100',
            '10'
          ],
          answer: 2,
          explanation: 'In the **worst case**, the target is at the last position or not in the array at all. The algorithm must check **all 100 elements**. This is why we say linear search has a time complexity of O(n) - it grows linearly with the size of the array.'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE nums : ARRAY[1:6] OF INTEGER
nums[1] ← 5
nums[2] ← 12
nums[3] ← 8
nums[4] ← 12
nums[5] ← 3
nums[6] ← 12

DECLARE count : INTEGER
count ← 0

FOR i ← 1 TO 6
    IF nums[i] = 12 THEN
        count ← count + 1
    ENDIF
NEXT i

OUTPUT count
\`\`\``,
          options: [
            '1',
            '2',
            '3',
            '12'
          ],
          answer: 2,
          explanation: 'This is a variation of linear search that **counts** how many times 12 appears. nums[2]=12 (count=1), nums[4]=12 (count=2), nums[6]=12 (count=3). The output is **3** because 12 appears three times!'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete this linear search that uses an early RETURN to stop as soon as the item is found.',
          codeTemplate: 'FUNCTION FindItem(arr : ARRAY, size : INTEGER, target : INTEGER) RETURNS INTEGER\n    FOR i ← 1 ___ size\n        IF arr[i] = target ___\n            RETURN ___\n        ENDIF\n    NEXT i\n    RETURN -1\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "TO", options: ["TO", "UNTIL", "BY", "THROUGH"] },
            { id: 2, answer: "THEN", options: ["THEN", "DO", "BEGIN", "NEXT"] },
            { id: 3, answer: "i", options: ["i", "target", "-1", "arr[i]"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Tracing Linear Search",
      emoji: "📊",
      steps: [
        {
          id: "ch3-trace",
          type: "explain",
          title: "📊 Tracing Through an Example",
          content: `Let's trace linear search step by step!

**Array:** [7, 3, 9, 1, 5]  **Target:** 9

| Step | i | items[i] | items[i] = 9? | Action |
|---|---|---|---|---|
| 1 | 1 | 7 | No | Continue |
| 2 | 2 | 3 | No | Continue |
| 3 | 3 | 9 | Yes! | RETURN 3 |

Found at position **3** after checking **3 elements**.

Now let's search for **4** (not in the array):

| Step | i | items[i] | items[i] = 4? | Action |
|---|---|---|---|---|
| 1 | 1 | 7 | No | Continue |
| 2 | 2 | 3 | No | Continue |
| 3 | 3 | 9 | No | Continue |
| 4 | 4 | 1 | No | Continue |
| 5 | 5 | 5 | No | Continue |

Loop ended. RETURN **-1** (not found) after checking **all 5 elements**.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Given the array [20, 45, 10, 35, 50], how many comparisons does a linear search need to find the value 35?',
          options: [
            '1',
            '2',
            '3',
            '4'
          ],
          answer: 3,
          explanation: 'The search checks: 20 (no), 45 (no), 10 (no), 35 (yes!). It takes **4 comparisons** to find the value 35 at position 4.'
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE arr : ARRAY[1:5] OF INTEGER
arr[1] ← 4
arr[2] ← 8
arr[3] ← 2
arr[4] ← 6
arr[5] ← 10

DECLARE result : STRING
result ← "Not found"

FOR i ← 1 TO 5
    IF arr[i] > 7 THEN
        result ← "Found at " & i
    ENDIF
NEXT i

OUTPUT result
\`\`\``,
          options: [
            '"Found at 2"',
            '"Found at 5"',
            '"Not found"',
            '"Found at 4"'
          ],
          answer: 1,
          explanation: 'The search finds elements greater than 7. arr[2]=8 (yes, result="Found at 2"), arr[5]=10 (yes, result="Found at 5"). Since the loop does NOT use an early return, it continues and **overwrites** result each time. The final output is **"Found at 5"** - the last match!'
        },
      ]
    },
  ]
}
