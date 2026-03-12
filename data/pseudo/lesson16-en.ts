// ============================================
// Pseudocode Lesson 16: Binary Search (English)
// CIE Style Pseudocode - Divide and conquer!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson16EnData: LessonData = {
  id: "pseudo-16",
  title: "Binary Search",
  emoji: "🎯",
  description: "Divide sorted arrays in half to find items fast!",
  chapters: [
    {
      id: "ch1",
      title: "What is Binary Search?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎯 What is Binary Search?",
          content: `**Binary search** is a fast searching algorithm that works on **sorted** arrays. It repeatedly divides the search area **in half**.

Think of it like a guessing game:
- I'm thinking of a number between 1 and 100
- You guess 50. I say "too high!"
- Now you know it's between 1 and 49
- You guess 25. I say "too low!"
- Now you know it's between 26 and 49
- Each guess **eliminates half** the remaining options!

**Important rule:** Binary search **only works on sorted data!**

| Index | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Value | 5 | 12 | 23 | 34 | 45 | 56 | 78 |

To find **34**: check the middle (34) - found it in just **1 step**!`
        },
        {
          id: "ch1-algo",
          type: "explain",
          title: "📋 The Algorithm",
          content: `Here is the full **binary search** pseudocode:

\`\`\`
FUNCTION BinarySearch(items : ARRAY, size : INTEGER, target : INTEGER) RETURNS INTEGER
    DECLARE low : INTEGER
    DECLARE high : INTEGER
    DECLARE mid : INTEGER

    low ← 1
    high ← size

    WHILE low <= high
        mid ← (low + high) DIV 2
        IF items[mid] = target THEN
            RETURN mid
        ELSE
            IF items[mid] < target THEN
                low ← mid + 1
            ELSE
                high ← mid - 1
            ENDIF
        ENDIF
    ENDWHILE

    RETURN -1
ENDFUNCTION
\`\`\`

Key points:
- **low** and **high** mark the current search range
- **mid** is calculated using **DIV** (integer division - no decimals!)
- If target equals mid element → found it!
- If target is **larger** → search the **right half** (low = mid + 1)
- If target is **smaller** → search the **left half** (high = mid - 1)
- Loop ends when low > high (target not found)`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the binary search algorithm.',
          codeTemplate: 'low ← 1\nhigh ← size\n\nWHILE low <= high\n    mid ← (low + high) ___ 2\n    IF items[mid] = target THEN\n        RETURN mid\n    ELSE\n        IF items[mid] ___ target THEN\n            low ← mid ___ 1\n        ELSE\n            high ← mid - 1\n        ENDIF\n    ENDIF\nENDWHILE',
          fillBlanks: [
            { id: 1, answer: "DIV", options: ["DIV", "/", "MOD", "*"] },
            { id: 2, answer: "<", options: ["<", ">", "=", "<>"] },
            { id: 3, answer: "+", options: ["+", "-", "*", "DIV"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Tracing Binary Search",
      emoji: "📊",
      steps: [
        {
          id: "ch2-trace",
          type: "explain",
          title: "📊 Tracing Binary Search Step by Step",
          content: `Let's trace binary search on this sorted array:

**Array:** [3, 7, 11, 15, 20, 25, 30]  **Target:** 20

| Step | low | high | mid | items[mid] | Action |
|---|---|---|---|---|---|
| 1 | 1 | 7 | 4 | 15 | 15 < 20, so low ← 5 |
| 2 | 5 | 7 | 6 | 25 | 25 > 20, so high ← 5 |
| 3 | 5 | 5 | 5 | 20 | 20 = 20, FOUND! |

Found **20** at position **5** in just **3 steps**!

With linear search, we would need **5 steps** (checking every element from the start).

How mid is calculated:
- Step 1: mid = (1 + 7) DIV 2 = 8 DIV 2 = **4**
- Step 2: mid = (5 + 7) DIV 2 = 12 DIV 2 = **6**
- Step 3: mid = (5 + 5) DIV 2 = 10 DIV 2 = **5**`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Binary search on array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91].
Target = 23. What is the value of \`mid\` on the **first** iteration?

\`\`\`
low ← 1
high ← 10
mid ← (low + high) DIV 2
\`\`\``,
          options: [
            '4',
            '5',
            '6',
            '23'
          ],
          answer: 1,
          explanation: 'mid = (1 + 10) DIV 2 = 11 DIV 2 = **5** (DIV gives integer division, dropping the decimal). So we first check items[5] which is 16.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Why does binary search use **DIV** instead of regular division ( / )?',
          options: [
            'DIV is faster than /',
            'DIV gives a whole number, which we need for an array index',
            'Regular division does not work with arrays',
            'DIV rounds up, which is more accurate'
          ],
          answer: 1,
          explanation: 'Array indices must be **whole numbers** (integers). DIV performs **integer division**, which drops any decimal. For example, 7 / 2 = 3.5, but 7 DIV 2 = **3**. We cannot use 3.5 as an array index!'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE arr : ARRAY[1:7] OF INTEGER
arr[1] ← 2
arr[2] ← 5
arr[3] ← 8
arr[4] ← 12
arr[5] ← 16
arr[6] ← 23
arr[7] ← 38

DECLARE low, high, mid : INTEGER
low ← 1
high ← 7
DECLARE steps : INTEGER
steps ← 0

WHILE low <= high
    mid ← (low + high) DIV 2
    steps ← steps + 1
    IF arr[mid] = 23 THEN
        OUTPUT "Found in ", steps, " steps"
        high ← low - 1
    ELSE
        IF arr[mid] < 23 THEN
            low ← mid + 1
        ELSE
            high ← mid - 1
        ENDIF
    ENDIF
ENDWHILE
\`\`\``,
          options: [
            '"Found in 1 steps"',
            '"Found in 2 steps"',
            '"Found in 3 steps"',
            '"Found in 6 steps"'
          ],
          answer: 1,
          explanation: 'Step 1: mid = (1+7) DIV 2 = 4, arr[4]=12, 12 < 23, so low=5. Step 2: mid = (5+7) DIV 2 = 6, arr[6]=23, FOUND! Output is **"Found in 2 steps"**. We then set high = low - 1 to exit the WHILE loop.'
        },
      ]
    },
    {
      id: "ch3",
      title: "Comparing Searches",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚡ Linear vs Binary Search",
          content: `Let's compare the two search algorithms:

| Feature | Linear Search | Binary Search |
|---|---|---|
| **Array must be sorted?** | No | Yes! |
| **How it works** | Check one by one | Divide in half |
| **Best case** | 1 comparison | 1 comparison |
| **Worst case (n items)** | n comparisons | log2(n) comparisons |
| **100 items worst case** | 100 steps | 7 steps |
| **1000 items worst case** | 1000 steps | 10 steps |

Binary search is **much faster** for large datasets!

But there is a trade-off:
- Linear search works on **unsorted** data
- Binary search **requires** sorted data
- If data changes often, keeping it sorted has a cost

**Rule of thumb:** Use binary search when data is already sorted and the list is large. Use linear search for small or unsorted lists.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'You have a **sorted** list of 1,000,000 names. Which search method should you use and approximately how many comparisons would it take in the worst case?',
          options: [
            'Linear search - about 500,000 comparisons',
            'Binary search - about 20 comparisons',
            'Linear search - about 1,000,000 comparisons',
            'Binary search - about 1,000 comparisons'
          ],
          answer: 1,
          explanation: 'Since the list is sorted, binary search is the best choice. log2(1,000,000) is approximately **20**. That means binary search can find any name in about 20 steps, compared to up to 1,000,000 steps for linear search!'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 Quick Check!",
          content: 'When would you choose **linear search** over binary search?',
          options: [
            'When the array is very large',
            'When the array is not sorted',
            'When you want the fastest search',
            'When the array contains strings'
          ],
          answer: 1,
          explanation: 'Linear search is the right choice when data is **not sorted**. Binary search requires sorted data. If sorting the data first would take more time than just doing a linear search, then linear search is the better option!'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the comparison between linear and binary search.',
          codeTemplate: '// Linear search: checks ___ element from start to end\n// Time: O(n) - worst case checks all n elements\n\n// Binary search: ___ the search area in half each time\n// Time: O(log n) - requires array to be ___',
          fillBlanks: [
            { id: 1, answer: "each", options: ["each", "half", "random", "last"] },
            { id: 2, answer: "divides", options: ["divides", "doubles", "removes", "copies"] },
            { id: 3, answer: "sorted", options: ["sorted", "large", "small", "numeric"] }
          ]
        },
      ]
    },
  ]
}
