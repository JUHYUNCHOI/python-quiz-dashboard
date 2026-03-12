// ============================================
// Pseudocode Lesson P3: Combined Project 3 (English)
// CIE Style Pseudocode - Student Score System!
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP3EnData: LessonData = {
  id: "pseudo-p3",
  title: "Combined Project 3",
  emoji: "🏆",
  description: "Student score sorting & searching system!",
  chapters: [
    {
      id: "ch1",
      title: "Student Score System",
      emoji: "🎓",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎓 The Problem: Student Score System",
          content: `Let's build a complete **student score management system** that combines everything from Part 3!

The system will:
1. **Validate** student scores on input (0-100)
2. **Store** scores in an array
3. **Sort** scores using bubble sort
4. **Search** for a specific score using linear and binary search
5. Use **trace tables** to verify correctness

This project combines:
- **Validation** (range check with REPEAT...UNTIL)
- **Arrays** for data storage
- **Bubble Sort** to order the scores
- **Linear Search** and **Binary Search** to find scores
- **Trace table** thinking throughout

Let's build it step by step!`
        },
        {
          id: "ch1-input",
          type: "explain",
          title: "📥 Step 1: Input with Validation",
          content: `First, we input scores with **range check validation**:

\`\`\`
DECLARE scores : ARRAY[1:5] OF INTEGER
DECLARE tempScore : INTEGER

FOR i ← 1 TO 5
    REPEAT
        OUTPUT "Enter score for student ", i, " (0-100): "
        INPUT tempScore
        IF tempScore < 0 OR tempScore > 100 THEN
            OUTPUT "Invalid! Score must be 0-100."
        ENDIF
    UNTIL tempScore >= 0 AND tempScore <= 100
    scores[i] ← tempScore
NEXT i
\`\`\`

Key features:
- **Nested loops**: FOR loop for each student, REPEAT loop for validation
- The REPEAT loop keeps asking until a **valid** score (0-100) is entered
- Once valid, the score is stored in the array
- Error message tells the user **what went wrong**`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In the input code, what happens if a user enters 105 for student 1?',
          options: [
            '105 is stored in scores[1]',
            'The program crashes',
            'The user sees "Invalid!" and must enter again',
            '105 is changed to 100 automatically'
          ],
          answer: 2,
          explanation: '105 > 100, so the IF condition is true and "Invalid! Score must be 0-100." is displayed. The UNTIL condition (tempScore >= 0 AND tempScore <= 100) is FALSE, so the REPEAT loop runs again. The user must enter a valid score to continue!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the validation loop for score input.',
          codeTemplate: '___\n    OUTPUT "Enter score (0-100): "\n    INPUT tempScore\n    IF tempScore < 0 ___ tempScore > 100 THEN\n        OUTPUT "Invalid score!"\n    ENDIF\nUNTIL tempScore >= 0 ___ tempScore <= 100',
          fillBlanks: [
            { id: 1, answer: "REPEAT", options: ["REPEAT", "WHILE", "FOR", "DO"] },
            { id: 2, answer: "OR", options: ["OR", "AND", "NOT", "THEN"] },
            { id: 3, answer: "AND", options: ["AND", "OR", "NOT", "THEN"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Sort & Search",
      emoji: "🔄",
      steps: [
        {
          id: "ch2-sort",
          type: "explain",
          title: "🔄 Step 2: Sort the Scores",
          content: `After collecting all scores, we sort them using **bubble sort**:

\`\`\`
// Scores entered: [85, 42, 97, 63, 78]

DECLARE temp : INTEGER

FOR i ← 1 TO 4
    FOR j ← 1 TO 5 - i
        IF scores[j] > scores[j + 1] THEN
            temp ← scores[j]
            scores[j] ← scores[j + 1]
            scores[j + 1] ← temp
        ENDIF
    NEXT j
NEXT i

// After sorting: [42, 63, 78, 85, 97]
\`\`\`

Let's trace the first pass:

| j | scores[j] | scores[j+1] | Swap? | Array |
|---|---|---|---|---|
| 1 | 85 | 42 | Yes | [42, 85, 97, 63, 78] |
| 2 | 85 | 97 | No | [42, 85, 97, 63, 78] |
| 3 | 97 | 63 | Yes | [42, 85, 63, 97, 78] |
| 4 | 97 | 78 | Yes | [42, 85, 63, 78, 97] |

After pass 1: 97 (the largest) is in its correct position at the end!`
        },
        {
          id: "ch2-search",
          type: "explain",
          title: "🔍 Step 3: Search for a Score",
          content: `Now the array is sorted: **[42, 63, 78, 85, 97]**

We can use **both** search methods!

**Linear Search** (works on any array):
\`\`\`
DECLARE target : INTEGER
OUTPUT "Enter score to find: "
INPUT target

FOR i ← 1 TO 5
    IF scores[i] = target THEN
        OUTPUT "Found at position ", i
    ENDIF
NEXT i
\`\`\`

**Binary Search** (faster, requires sorted array):
\`\`\`
DECLARE low, high, mid : INTEGER
low ← 1
high ← 5

WHILE low <= high
    mid ← (low + high) DIV 2
    IF scores[mid] = target THEN
        OUTPUT "Found at position ", mid
        low ← high + 1
    ELSE
        IF scores[mid] < target THEN
            low ← mid + 1
        ELSE
            high ← mid - 1
        ENDIF
    ENDIF
ENDWHILE
\`\`\`

Since our array is **sorted**, binary search is the better choice! For 5 elements: linear search takes up to 5 comparisons, binary search takes at most 3.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Binary search on sorted array [42, 63, 78, 85, 97]. Target = 78. How many comparisons are needed?

\`\`\`
low ← 1, high ← 5
Step 1: mid = (1+5) DIV 2 = 3
        scores[3] = 78 = target?
\`\`\``,
          options: [
            '1 comparison - found immediately!',
            '2 comparisons',
            '3 comparisons',
            '5 comparisons'
          ],
          answer: 0,
          explanation: 'mid = 3, and scores[3] = 78 which equals our target! Binary search found it in just **1 comparison** because the target happened to be the middle element. This is the **best case** scenario!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Choose the right search for each situation.',
          codeTemplate: '// Array is NOT sorted → use ___ search\n// Array IS sorted and has 1000 elements → use ___ search\n// Binary search on sorted array: max comparisons for 1000 elements ≈ ___',
          fillBlanks: [
            { id: 1, answer: "linear", options: ["linear", "binary", "bubble", "insertion"] },
            { id: 2, answer: "binary", options: ["binary", "linear", "bubble", "insertion"] },
            { id: 3, answer: "10", options: ["10", "500", "1000", "100"] }
          ]
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'After bubble sorting [85, 42, 97, 63, 78], what is the array after 2 complete passes?',
          options: [
            '[42, 63, 78, 85, 97]',
            '[42, 85, 63, 78, 97]',
            '[42, 63, 78, 97, 85]',
            '[42, 63, 85, 78, 97]'
          ],
          answer: 0,
          explanation: 'Pass 1: [85,42,97,63,78] → swap 85,42 → swap 97,63 → swap 97,78 → [42,85,63,78,97]. Pass 2: [42,85,63,78,97] → no swap 42,85 → swap 85,63 → swap 85,78 → [42,63,78,85,97]. After 2 passes the array is already fully sorted: **[42, 63, 78, 85, 97]**!'
        },
      ]
    },
    {
      id: "ch3",
      title: "Part 3 Review",
      emoji: "📝",
      steps: [
        {
          id: "ch3-review",
          type: "explain",
          title: "📝 Part 3 Summary",
          content: `Here is everything we learned in Part 3:

**Searching Algorithms:**
- **Linear Search** - checks each element one by one, O(n), works on any array
- **Binary Search** - divides in half each time, O(log n), requires sorted array

**Sorting Algorithms:**
- **Bubble Sort** - compares adjacent elements, swaps if wrong order, uses temp variable
- **Insertion Sort** - inserts each element into correct position, shifts elements right

**Trace Tables:**
- Track variable values line by line
- Essential for understanding and debugging algorithms
- Common IGCSE exam question format

**Validation & Verification:**
- **Validation**: Range, Length, Type, Presence, Format checks
- **Verification**: Double entry, Visual check
- Validation = reasonable, Verification = accurate

These are **core IGCSE topics** - make sure you can trace, write, and explain each algorithm!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Review Quiz 1!",
          content: 'What is the key difference between validation and verification?',
          options: [
            'Validation is done by humans, verification by computers',
            'Validation checks data is reasonable, verification checks data is what was intended',
            'Validation is only for numbers, verification is only for text',
            'There is no difference - they mean the same thing'
          ],
          answer: 1,
          explanation: '**Validation** checks if data is reasonable and sensible (e.g., age is 0-120). **Verification** checks if data is what the user actually meant to enter (e.g., double entry for passwords). Validation is automatic; verification often involves the user.'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 Review Quiz 2!",
          content: 'You have a SORTED array of 1,000,000 names. About how many comparisons does binary search need in the worst case?',
          options: [
            'About 20',
            'About 100',
            'About 1,000',
            'About 500,000'
          ],
          answer: 0,
          explanation: 'Binary search halves the search area each time. log2(1,000,000) is approximately **20**. So binary search can find any name in about 20 comparisons! Linear search would need up to 1,000,000. This massive difference shows why binary search is so powerful for large sorted datasets.'
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Final Challenge!",
          content: `Trace this complete program. What is the final output?

\`\`\`
DECLARE arr : ARRAY[1:4] OF INTEGER
arr[1] ← 30
arr[2] ← 10
arr[3] ← 40
arr[4] ← 20

// Bubble sort (one pass only)
FOR j ← 1 TO 3
    IF arr[j] > arr[j + 1] THEN
        temp ← arr[j]
        arr[j] ← arr[j + 1]
        arr[j + 1] ← temp
    ENDIF
NEXT j

// Linear search for 40
DECLARE pos : INTEGER
pos ← -1
FOR i ← 1 TO 4
    IF arr[i] = 40 THEN
        pos ← i
    ENDIF
NEXT i

OUTPUT pos
\`\`\``,
          options: [
            '3',
            '4',
            '-1',
            '2'
          ],
          answer: 1,
          explanation: 'Bubble sort one pass: [30,10,40,20] → swap 30,10 → [10,30,40,20] → 30<40 no swap → swap 40,20 → [10,30,20,40]. Now search for 40: arr[1]=10 no, arr[2]=30 no, arr[3]=20 no, arr[4]=40 yes! pos=4. Output: **4**.'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Final Fill!",
          content: 'Complete this summary of Part 3 concepts.',
          codeTemplate: '// Linear search: O(n) - checks ___ element\n// Binary search: O(log n) - requires ___ array\n// Bubble sort: swap ___ elements if wrong order',
          fillBlanks: [
            { id: 1, answer: "each", options: ["each", "half", "first", "random"] },
            { id: 2, answer: "sorted", options: ["sorted", "large", "small", "integer"] },
            { id: 3, answer: "adjacent", options: ["adjacent", "random", "first", "all"] }
          ]
        },
      ]
    },
  ]
}
