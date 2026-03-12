// ============================================
// Pseudocode Lesson 18: Insertion Sort (English)
// CIE Style Pseudocode - Insert into the right place!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson18EnData: LessonData = {
  id: "pseudo-18",
  title: "Insertion Sort",
  emoji: "📥",
  description: "Sort by inserting each element into its correct position!",
  chapters: [
    {
      id: "ch1",
      title: "What is Insertion Sort?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📥 What is Insertion Sort?",
          content: `**Insertion sort** works just like sorting playing cards in your hand!

When you pick up cards one at a time:
1. First card - it is already "sorted"
2. Second card - insert it before or after the first card
3. Third card - find the right spot among the first two
4. Keep going until all cards are in order!

Starting array: **[7, 2, 4, 1]**

- Start: [**7**] is "sorted" (one element is always sorted)
- Insert 2: 2 < 7, so insert before 7 → [**2, 7**]
- Insert 4: 4 < 7 but 4 > 2, so insert between → [**2, 4, 7**]
- Insert 1: 1 < 2, so insert at the start → [**1, 2, 4, 7**]

The key idea: the **left portion** of the array is always sorted, and we **insert** each new element into its correct position in that sorted portion.`
        },
        {
          id: "ch1-algo",
          type: "explain",
          title: "📋 The Algorithm",
          content: `Here is the full **insertion sort** pseudocode:

\`\`\`
PROCEDURE InsertionSort(items : ARRAY, size : INTEGER)
    DECLARE key : INTEGER
    DECLARE j : INTEGER

    FOR i ← 2 TO size
        key ← items[i]
        j ← i - 1

        WHILE j >= 1 AND items[j] > key
            items[j + 1] ← items[j]
            j ← j - 1
        ENDWHILE

        items[j + 1] ← key
    NEXT i
ENDPROCEDURE
\`\`\`

How it works:
1. Start from the **2nd element** (index 2) - the first is already "sorted"
2. Save the current element in **key**
3. Use a **WHILE loop** to shift larger elements **one position to the right**
4. Insert the **key** into the gap created
5. Repeat for all remaining elements

The WHILE loop shifts elements right to make room for the key. It stops when:
- We reach the start of the array (j < 1), OR
- We find an element that is **not greater** than the key`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: "Why does the FOR loop in insertion sort start at **i = 2** instead of **i = 1**?",
          options: [
            'Because CIE arrays start at index 2',
            'Because the first element is already considered sorted by itself',
            'Because we need to compare with the previous element',
            'Because starting at 1 would cause an error'
          ],
          answer: 1,
          explanation: 'A single element is always sorted! We start at index 2 because the first element forms a "sorted section" of one element. We then insert element 2 into this sorted section, then element 3, and so on.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the insertion sort algorithm.',
          codeTemplate: 'FOR i ← 2 TO size\n    key ← items[i]\n    j ← i - 1\n\n    ___ j >= 1 AND items[j] > key\n        items[j + 1] ← items[___]\n        j ← j - 1\n    ENDWHILE\n\n    items[___] ← key\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "WHILE", options: ["WHILE", "FOR", "IF", "REPEAT"] },
            { id: 2, answer: "j", options: ["j", "j + 1", "i", "key"] },
            { id: 3, answer: "j + 1", options: ["j + 1", "j", "i", "j - 1"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `In insertion sort, what is the array after processing the element at index 3?

Starting array: **[7, 2, 4, 1]**

\`\`\`
// After i=2: key=2, shift 7 right, insert 2
//   → [2, 7, 4, 1]
// After i=3: key=4, ...
\`\`\`

What is the array after i=3 completes?`,
          options: [
            '[2, 4, 7, 1]',
            '[2, 7, 4, 1]',
            '[1, 2, 4, 7]',
            '[4, 2, 7, 1]'
          ],
          answer: 0,
          explanation: 'When i=3, key=4. We compare: items[2]=7, 7 > 4, so shift 7 right → [2, _, 7, 1]. Then j=1, items[1]=2, 2 > 4? No! Stop. Insert key at j+1 = 2: **[2, 4, 7, 1]**. The first three elements are now sorted.'
        },
      ]
    },
    {
      id: "ch2",
      title: "Tracing Insertion Sort",
      emoji: "📊",
      steps: [
        {
          id: "ch2-trace",
          type: "explain",
          title: "📊 Full Trace: Sorting [7, 2, 4, 1]",
          content: `Let's trace insertion sort on **[7, 2, 4, 1]** step by step:

**i = 2:** key = 2
| j | items[j] | items[j] > 2? | Action |
|---|---|---|---|
| 1 | 7 | Yes | Shift 7 right → [7, **7**, 4, 1] |
| 0 | - | j < 1, stop | Insert 2 at position 1 |
Result: [**2, 7**, 4, 1]

**i = 3:** key = 4
| j | items[j] | items[j] > 4? | Action |
|---|---|---|---|
| 2 | 7 | Yes | Shift 7 right → [2, 7, **7**, 1] |
| 1 | 2 | No | Stop! Insert 4 at position 2 |
Result: [**2, 4, 7**, 1]

**i = 4:** key = 1
| j | items[j] | items[j] > 1? | Action |
|---|---|---|---|
| 3 | 7 | Yes | Shift 7 right → [2, 4, 7, **7**] |
| 2 | 4 | Yes | Shift 4 right → [2, 4, **4**, 7] |
| 1 | 2 | Yes | Shift 2 right → [2, **2**, 4, 7] |
| 0 | - | j < 1, stop | Insert 1 at position 1 |
Result: [**1, 2, 4, 7**] - sorted!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does the WHILE loop do when i=2 in this example?

\`\`\`
DECLARE arr : ARRAY[1:4] OF INTEGER
arr[1] ← 3
arr[2] ← 5
arr[3] ← 1
arr[4] ← 4

// i = 2, key = arr[2] = 5, j = 1
WHILE j >= 1 AND arr[j] > key
    // shift right
ENDWHILE
\`\`\`

How many shifts happen?`,
          options: [
            '0 shifts (5 is already in the right place)',
            '1 shift',
            '2 shifts',
            '3 shifts'
          ],
          answer: 0,
          explanation: 'When i=2, key=5 and j=1. We check: arr[1]=3, is 3 > 5? **No!** The WHILE condition is false, so the loop does not execute at all. 5 stays in place because it is already larger than everything in the sorted section [3]. Result: [3, 5, 1, 4]. **0 shifts** needed!'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'What is the **worst case** for insertion sort?',
          options: [
            'An already sorted array [1, 2, 3, 4, 5]',
            'An array with all equal values [3, 3, 3, 3]',
            'A reverse-sorted array [5, 4, 3, 2, 1]',
            'A randomly ordered array'
          ],
          answer: 2,
          explanation: 'A **reverse-sorted** array is the worst case! Every element must be shifted all the way to the beginning. For [5, 4, 3, 2, 1]: inserting 4 needs 1 shift, inserting 3 needs 2 shifts, inserting 2 needs 3 shifts, inserting 1 needs 4 shifts. Maximum work!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Trace insertion sort: when i=3 on array [3, 5, 1, 4], key=1.',
          codeTemplate: '// Array before: [3, 5, 1, 4]\n// key = 1, j starts at ___\n\n// j=2: items[2]=5, 5 > 1? Yes → shift 5 right\n// j=1: items[1]=3, 3 > 1? Yes → shift 3 right\n// j=0: stop (j < 1)\n// Insert key at position j+1 = ___\n// Array after: [___, 3, 5, 4]',
          fillBlanks: [
            { id: 1, answer: "2", options: ["2", "1", "3", "0"] },
            { id: 2, answer: "1", options: ["1", "2", "0", "3"] },
            { id: 3, answer: "1", options: ["1", "3", "5", "0"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Comparing Sorts",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚡ Bubble Sort vs Insertion Sort",
          content: `Let's compare the two sorting algorithms:

| Feature | Bubble Sort | Insertion Sort |
|---|---|---|
| **How it works** | Swap adjacent elements | Insert into sorted position |
| **Outer loop** | n-1 passes | n-1 insertions |
| **Inner mechanism** | Compare & swap neighbours | Shift elements right |
| **Best case** | O(n) with optimization | O(n) for sorted data |
| **Worst case** | O(n^2) | O(n^2) |
| **Best for** | Simple to understand | Nearly sorted data |

Both sorts have the same **worst-case** performance, but insertion sort is usually **faster in practice** because:
- It does **fewer swaps** on average
- It is very efficient on **nearly sorted** data (very few shifts needed)
- Bubble sort always compares neighbours even when they are in order

For the IGCSE exam, you should know **both algorithms** and be able to **trace** them step by step!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which sorting algorithm is generally faster on **nearly sorted** data?',
          options: [
            'Bubble sort - because it does fewer comparisons',
            'Insertion sort - because few shifts are needed',
            'They are exactly the same speed',
            'Neither - you should use binary search instead'
          ],
          answer: 1,
          explanation: 'Insertion sort excels on nearly sorted data! If most elements are already close to their correct position, the WHILE loop terminates quickly for each element, requiring very few shifts. This makes it almost O(n) in the best case.'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `After **2 complete passes** of insertion sort on this array, what is the result?

\`\`\`
Starting: [6, 3, 8, 1, 5]

// Pass 1 (i=2): key=3
// Pass 2 (i=3): key=8
\`\`\``,
          options: [
            '[3, 6, 8, 1, 5]',
            '[1, 3, 6, 8, 5]',
            '[3, 8, 6, 1, 5]',
            '[1, 3, 5, 6, 8]'
          ],
          answer: 0,
          explanation: 'Pass 1 (i=2): key=3, 6>3 so shift 6 right, insert 3 → [3, 6, 8, 1, 5]. Pass 2 (i=3): key=8, 6>8? No! 8 stays in place → [3, 6, 8, 1, 5]. The first 3 elements are now sorted, but 1 and 5 have not been processed yet.'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Match each sort with its description.',
          codeTemplate: '// ___ sort: compare ADJACENT elements, swap if wrong order\n// ___ sort: take each element, INSERT into correct position\n// Both have worst case: O(___)',
          fillBlanks: [
            { id: 1, answer: "Bubble", options: ["Bubble", "Insertion", "Binary", "Linear"] },
            { id: 2, answer: "Insertion", options: ["Insertion", "Bubble", "Selection", "Merge"] },
            { id: 3, answer: "n^2", options: ["n^2", "n", "log n", "n log n"] }
          ]
        },
      ]
    },
  ]
}
