// ============================================
// Pseudocode Lesson 17: Bubble Sort (English)
// CIE Style Pseudocode - Swap adjacent elements!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson17EnData: LessonData = {
  id: "pseudo-17",
  title: "Bubble Sort",
  emoji: "🫧",
  description: "Sort by swapping adjacent elements!",
  chapters: [
    {
      id: "ch1",
      title: "What is Bubble Sort?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🫧 What is Bubble Sort?",
          content: `**Bubble sort** is a simple sorting algorithm. It repeatedly compares **adjacent** (next to each other) elements and **swaps** them if they are in the wrong order.

Think of it like bubbles in water - the **largest values "bubble up"** to the end of the array!

Starting array: **[5, 3, 8, 1]**

First pass - compare neighbours:
- Compare 5 and 3: 5 > 3, so **swap** → [**3, 5**, 8, 1]
- Compare 5 and 8: 5 < 8, no swap → [3, **5, 8**, 1]
- Compare 8 and 1: 8 > 1, so **swap** → [3, 5, **1, 8**]

After one pass, the **largest element (8)** has "bubbled" to the end!

We repeat this process until no more swaps are needed.`
        },
        {
          id: "ch1-algo",
          type: "explain",
          title: "📋 The Algorithm",
          content: `Here is the full **bubble sort** pseudocode:

\`\`\`
PROCEDURE BubbleSort(items : ARRAY, size : INTEGER)
    DECLARE temp : INTEGER

    FOR i ← 1 TO size - 1
        FOR j ← 1 TO size - i
            IF items[j] > items[j + 1] THEN
                temp ← items[j]
                items[j] ← items[j + 1]
                items[j + 1] ← temp
            ENDIF
        NEXT j
    NEXT i
ENDPROCEDURE
\`\`\`

How it works:
- **Outer loop** (i): runs n-1 times (one full pass each time)
- **Inner loop** (j): compares adjacent pairs
- **Swap** using a temporary variable: store one value, overwrite it, then place the stored value
- \`size - i\` in the inner loop: after each pass, the last i elements are already sorted!

The **temp variable** is essential for swapping - without it, you would lose one of the values!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the swap operation in bubble sort.',
          codeTemplate: 'IF items[j] > items[j + 1] THEN\n    ___ ← items[j]\n    items[j] ← items[j + 1]\n    items[j + 1] ← ___\nENDIF',
          fillBlanks: [
            { id: 1, answer: "temp", options: ["temp", "items[j]", "items[j + 1]", "swap"] },
            { id: 2, answer: "temp", options: ["temp", "items[j]", "items[j + 1]", "swap"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Tracing Bubble Sort",
      emoji: "📊",
      steps: [
        {
          id: "ch2-trace",
          type: "explain",
          title: "📊 Full Trace: Sorting [5, 3, 8, 1]",
          content: `Let's trace bubble sort on **[5, 3, 8, 1]** step by step:

**Pass 1** (i=1, j goes 1 to 3):

| j | Compare | Swap? | Array After |
|---|---|---|---|
| 1 | 5 > 3? Yes | Swap | [**3, 5**, 8, 1] |
| 2 | 5 > 8? No | No | [3, **5, 8**, 1] |
| 3 | 8 > 1? Yes | Swap | [3, 5, **1, 8**] |

After pass 1: [3, 5, 1, **8**] - 8 is in place!

**Pass 2** (i=2, j goes 1 to 2):

| j | Compare | Swap? | Array After |
|---|---|---|---|
| 1 | 3 > 5? No | No | [**3, 5**, 1, 8] |
| 2 | 5 > 1? Yes | Swap | [3, **1, 5**, 8] |

After pass 2: [3, 1, **5, 8**] - 5 is in place!

**Pass 3** (i=3, j goes 1 to 1):

| j | Compare | Swap? | Array After |
|---|---|---|---|
| 1 | 3 > 1? Yes | Swap | [**1, 3**, 5, 8] |

After pass 3: [**1, 3, 5, 8**] - sorted!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `After the **first complete pass** of bubble sort on this array, what will the array look like?

\`\`\`
DECLARE arr : ARRAY[1:5] OF INTEGER
arr[1] ← 9
arr[2] ← 4
arr[3] ← 7
arr[4] ← 2
arr[5] ← 6

// First pass: j goes from 1 to 4
FOR j ← 1 TO 4
    IF arr[j] > arr[j + 1] THEN
        temp ← arr[j]
        arr[j] ← arr[j + 1]
        arr[j + 1] ← temp
    ENDIF
NEXT j
\`\`\``,
          options: [
            '[2, 4, 6, 7, 9]',
            '[4, 7, 2, 6, 9]',
            '[4, 9, 7, 2, 6]',
            '[9, 4, 7, 2, 6]'
          ],
          answer: 1,
          explanation: 'Trace: [9,4,7,2,6] → swap 9,4 → [4,9,7,2,6] → swap 9,7 → [4,7,9,2,6] → swap 9,2 → [4,7,2,9,6] → swap 9,6 → [4,7,2,6,9]. After one pass the largest value (9) has bubbled to the end: **[4, 7, 2, 6, 9]**.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In bubble sort, why does the inner loop go to `size - i` instead of `size - 1`?',
          options: [
            'To avoid an index out of bounds error',
            'Because the last i elements are already sorted after i passes',
            'To make the algorithm run in fewer lines of code',
            'Because i starts at 0'
          ],
          answer: 1,
          explanation: 'After each pass, the largest unsorted element moves to its correct position at the end. After pass 1, the last element is sorted. After pass 2, the last 2 elements are sorted. So we do not need to compare them again - this makes bubble sort slightly more efficient!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the bubble sort with nested loops.',
          codeTemplate: 'FOR i ← 1 TO size - 1\n    FOR j ← 1 TO size ___ i\n        IF items[j] ___ items[j + 1] THEN\n            temp ← items[j]\n            items[j] ← items[j + 1]\n            items[j + 1] ← temp\n        ___\n    NEXT j\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "-", options: ["-", "+", "*", "DIV"] },
            { id: 2, answer: ">", options: [">", "<", "=", "<>"] },
            { id: 3, answer: "ENDIF", options: ["ENDIF", "END", "NEXT", "ENDWHILE"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Bubble Sort Variations",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-optimized",
          type: "explain",
          title: "⚡ Optimized Bubble Sort",
          content: `Standard bubble sort always does all n-1 passes, even if the array is already sorted! We can **optimize** it by stopping early if no swaps occurred in a pass:

\`\`\`
PROCEDURE BubbleSortOptimized(items : ARRAY, size : INTEGER)
    DECLARE temp : INTEGER
    DECLARE swapped : BOOLEAN

    FOR i ← 1 TO size - 1
        swapped ← FALSE
        FOR j ← 1 TO size - i
            IF items[j] > items[j + 1] THEN
                temp ← items[j]
                items[j] ← items[j + 1]
                items[j + 1] ← temp
                swapped ← TRUE
            ENDIF
        NEXT j
        IF swapped = FALSE THEN
            RETURN
        ENDIF
    NEXT i
ENDPROCEDURE
\`\`\`

The **swapped** flag:
- Set to FALSE at the start of each pass
- Set to TRUE whenever a swap happens
- If a pass completes with **no swaps**, the array is already sorted!
- We can exit early with RETURN

This is a common IGCSE exam question!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'How many passes does the **optimized** bubble sort need for the already-sorted array [1, 2, 3, 4, 5]?',
          options: [
            '4 passes',
            '5 passes',
            '1 pass',
            '0 passes'
          ],
          answer: 2,
          explanation: 'The optimized version does **1 pass**, finds that no swaps were needed (swapped stays FALSE), and exits early! The standard version would still do all 4 passes, doing unnecessary work.'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `How many **swaps** happen in the first pass of bubble sort on this array?

\`\`\`
DECLARE arr : ARRAY[1:4] OF INTEGER
arr[1] ← 1
arr[2] ← 4
arr[3] ← 2
arr[4] ← 3

DECLARE swapCount : INTEGER
swapCount ← 0

FOR j ← 1 TO 3
    IF arr[j] > arr[j + 1] THEN
        temp ← arr[j]
        arr[j] ← arr[j + 1]
        arr[j + 1] ← temp
        swapCount ← swapCount + 1
    ENDIF
NEXT j

OUTPUT swapCount
\`\`\``,
          options: [
            '0',
            '1',
            '2',
            '3'
          ],
          answer: 2,
          explanation: 'Trace [1,4,2,3]: j=1: 1>4? No swap. j=2: 4>2? Yes, swap → [1,2,4,3], count=1. j=3: 4>3? Yes, swap → [1,2,3,4], count=2. Output is **2** - two swaps were needed.'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the optimized bubble sort with the early exit.',
          codeTemplate: 'FOR i ← 1 TO size - 1\n    swapped ← ___\n    FOR j ← 1 TO size - i\n        IF items[j] > items[j + 1] THEN\n            // swap items[j] and items[j+1]\n            swapped ← TRUE\n        ENDIF\n    NEXT j\n    IF swapped = ___ THEN\n        ___\n    ENDIF\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "FALSE", options: ["FALSE", "TRUE", "0", "NULL"] },
            { id: 2, answer: "FALSE", options: ["FALSE", "TRUE", "0", "NULL"] },
            { id: 3, answer: "RETURN", options: ["RETURN", "BREAK", "EXIT", "STOP"] }
          ]
        },
      ]
    },
  ]
}
