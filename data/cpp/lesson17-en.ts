// ============================================
// C++ Lesson 17: STL Algorithms
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson17EnData: LessonData = {
  id: "cpp-17",
  title: "STL Algorithms",
  emoji: "⚙️",
  description: "sort, find, binary search and more! Powerful STL tools",
  chapters: [
    // ============================================
    // Chapter 1: Search & Numeric Algorithms
    // ============================================
    {
      id: "ch1",
      title: "Search & Numeric",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 STL Algorithms — C++'s Powerful Built-in Tools!",
          content: `Finding the minimum in a vector, searching for a specific value... Writing for loops every time is tedious and error-prone. C++ STL has functions that solve these tasks in **one line**! These are the tools professional developers use the most.

**STL** stands for **Standard Template Library**. It's a collection of powerful built-in functions that come with C++!

Think about these situations:
- You want to find the maximum value in an array → \`max_element()\`
- You want to count how many times a value appears → \`count()\`
- You want to find a specific value → \`find()\`
- You could write a for loop yourself, but STL algorithms do it in **one line**!

Remember using \`sorted()\`, \`min()\`, \`max()\`, \`sum()\` in Python? C++ has similar functions!

\`\`\`cpp
#include <algorithm>  // sort, find, min, max, etc.
#include <numeric>    // accumulate (sum), etc.
\`\`\`

Let's look at the basic algorithms:

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9, 3};

// min, max — smaller/larger of two values
int a = min(3, 7);    // 3
int b = max(3, 7);    // 7

// min_element, max_element — find min/max in a range
auto minIt = min_element(v.begin(), v.end()); // position of min
auto maxIt = max_element(v.begin(), v.end()); // position of max
cout << *minIt;  // 1  (dereference to get the value)
cout << *maxIt;  // 9

// count — count occurrences of a value
int cnt = count(v.begin(), v.end(), 3);  // How many 3s? → 1
\`\`\`

Let's compare with Python:

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`min(3, 7)\` | \`min(3, 7)\` |
| \`max(3, 7)\` | \`max(3, 7)\` |
| \`min(lst)\` | \`*min_element(v.begin(), v.end())\` |
| \`max(lst)\` | \`*max_element(v.begin(), v.end())\` |
| \`lst.count(3)\` | \`count(v.begin(), v.end(), 3)\` |

💡 Most C++ STL algorithms take a **range** in the form \`(begin, end)\`. You always pass \`v.begin()\` and \`v.end()\`!

👇 The syntax and examples for each function above are explained step by step below!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Find the smallest value in the vector!",
          code: "vector<int> v = {4, 1, 7, 2};\nauto it = ___(v.begin(), v.end());\ncout << *it;  // prints 1",
          fillBlanks: [
            { id: 0, answer: "min_element", options: ["min_element", "max_element", "find", "sort"] }
          ],
          explanation: "min_element(v.begin(), v.end()) returns an iterator to the minimum value in the vector! Dereferencing with *it gives us 1."
        },
        {
          id: "ch1-find",
          type: "explain",
          title: "🔍 find() — Search for a Value!",
          content: `\`find()\` searches for a specific value in a vector!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {10, 20, 30, 40, 50};

// find(begin, end, target) → returns iterator
auto it = find(v.begin(), v.end(), 30);

if (it != v.end()) {
    cout << "Found! " << *it << endl;         // Found! 30
    cout << "Index: " << it - v.begin();      // Index: 2
} else {
    cout << "Not found!" << endl;
}
\`\`\`

**Key points:**
- If found → returns an **iterator** pointing to that element
- If not found → returns \`v.end()\`
- Compare with \`v.end()\` to check if the value exists!

Let's compare with Python:

**Python 🐍:**
\`\`\`python
lst = [10, 20, 30, 40, 50]
if 30 in lst:          # check existence
    idx = lst.index(30) # get index
\`\`\`

**C++ ⚡:**
\`\`\`cpp
auto it = find(v.begin(), v.end(), 30);
if (it != v.end()) {         // check existence
    int idx = it - v.begin(); // get index
}
\`\`\`

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`30 in lst\` | \`find(...) != v.end()\` |
| \`lst.index(30)\` | \`it - v.begin()\` |
| Raises ValueError if missing | Returns \`v.end()\` if missing |

⚠️ **What if find() can't find the value?** It returns end(). Always check:
\`\`\`cpp
auto it = find(v.begin(), v.end(), 42);
if (it != v.end()) { /* found */ }
\`\`\`

💡 \`find()\` searches linearly from front to back. Time complexity is **O(n)**!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Predict the find() result!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5, 10, 15, 20, 25};\n    auto it = find(v.begin(), v.end(), 15);\n    if (it != v.end()) {\n        cout << it - v.begin();\n    } else {\n        cout << -1;\n    }\n    return 0;\n}",
          options: ["15", "2", "3", "-1"],
          answer: 1,
          explanation: "find() locates 15, returning an iterator to index 2. it - v.begin() equals 2! (counting from 0: 5→0, 10→1, 15→2)"
        },
        {
          id: "ch1-accum",
          type: "explain",
          title: "🔍 accumulate() & Utilities!",
          content: `\`accumulate()\` **sums up** all values in a vector! It's like Python's \`sum()\`.

\`\`\`cpp
#include <numeric>    // accumulate lives here!
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 2, 3, 4, 5};

// accumulate(begin, end, initial_value)
int total = accumulate(v.begin(), v.end(), 0);
cout << total;  // 15
\`\`\`

⚠️ \`accumulate()\` is in **\`<numeric>\`**, NOT \`<algorithm>\`! Watch your headers.

**Other useful functions:**

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};

// reverse — flip the order
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}

// swap — exchange two variables
int a = 10, b = 20;
swap(a, b);
// a=20, b=10
\`\`\`

Let's compare with Python:

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`sum(lst)\` | \`accumulate(v.begin(), v.end(), 0)\` |
| \`lst.reverse()\` | \`reverse(v.begin(), v.end())\` |
| \`a, b = b, a\` | \`swap(a, b)\` |

💡 The third argument (initial value): use \`0\` for integer sum, \`0.0\` for floating-point sum!`
        },
        {
          id: "ch1-lambda",
          type: "explain",
          title: "🔍 find_if & count_if — Search by Condition!",
          content: `\`find()\` searches for an exact value, but what if you want to search by a **condition**? That's where **\`find_if()\`** and **\`count_if()\`** come in!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 7, 1, 8, 4, 9, 2};

// Condition: find first element greater than 5
auto it = find_if(v.begin(), v.end(), [](int x) {
    return x > 5;
});
if (it != v.end()) cout << *it;  // 7

// Condition: count even numbers
int cnt = count_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
});
cout << cnt;  // 3 (8, 4, 2)
\`\`\`

**Lambda expressions** — \`[](parameter) { return condition; }\` — are **unnamed functions** you write right on the spot. They work anywhere an STL algorithm needs a condition function, including \`sort()\`!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`filter(lambda x: x > 5, lst)\` | \`find_if(..., [](int x){ return x > 5; })\` |
| \`len([x for x in lst if x % 2 == 0])\` | \`count_if(..., [](int x){ return x % 2 == 0; })\` |`,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Complete Vector Analysis!",
          content: `Use STL functions to analyze a vector — find min, max, sum, and locate a specific value!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    int minVal = *min_element(v.begin(), v.end());
    int maxVal = *max_element(v.begin(), v.end());
    int total = accumulate(v.begin(), v.end(), 0);

    cout << minVal << endl;
    cout << maxVal << endl;
    cout << total << endl;

    auto it = find(v.begin(), v.end(), 9);
    if (it != v.end()) {
        cout << it - v.begin() << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3, 7, 1, 9, 4, 6};

    // Use min_element, max_element, accumulate to find min, max, sum and print them
    // Print: 1, 9, 30

    // Use find() to locate 9 and print its index
    // Print: 3

    return 0;
}`,
          hint: "Use *min_element(v.begin(), v.end()) — the * dereferences the iterator. accumulate is in <numeric>. find() returns an iterator, and it - v.begin() gives the index",
          expectedOutput: `1
9
30
3`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "STL basics!",
          content: "Which header file contains the `accumulate()` function?",
          options: [
            "<algorithm>",
            "<numeric>",
            "<vector>",
            "<cmath>"
          ],
          answer: 1,
          explanation: "accumulate() is in the <numeric> header! Functions like sort, find, and min_element are in <algorithm>, but sum-related functions are in <numeric>."
        }
      ]
    },
    // ============================================
    // Chapter 2: Binary Search
    // ============================================
    {
      id: "ch2",
      title: "Binary Search",
      emoji: "🎯",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎯 binary_search() — Lightning-Fast Search!",
          content: `Imagine you need to search through 100,000 data items in a USACO contest. Using find() one by one means **time limit exceeded**! Binary search finds it in just 20 steps.

\`find()\` checks elements one by one, making it **O(n)**. But if the data is **sorted**, we can search much faster!

- find() checks one by one from start to end: O(n)
- binary_search() cuts the range in half each time: O(log n)
- Searching in **1 million** items: find() needs ~1 million checks, binary_search() needs ~20!
- ⚠️ But you need to **sort first**. Since sorting has a cost, it only pays off when you search multiple times.

**Binary search** finds elements in sorted data in **O(log n)** time!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {1, 3, 5, 7, 9, 11};
// ⚠️ Must be sorted first!

bool found = binary_search(v.begin(), v.end(), 7);
// found = true

bool notFound = binary_search(v.begin(), v.end(), 6);
// notFound = false
\`\`\`

**Important rule:** Data **MUST be sorted** before using \`binary_search()\`!

\`\`\`cpp
vector<int> unsorted = {5, 3, 1, 9, 7};
// Sort first!
sort(unsorted.begin(), unsorted.end());
// Now {1, 3, 5, 7, 9}
bool ok = binary_search(unsorted.begin(), unsorted.end(), 5);
// ok = true
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
import bisect
lst = [1, 3, 5, 7, 9, 11]
# Python has no built-in binary_search, so use bisect
idx = bisect.bisect_left(lst, 7)
found = (idx < len(lst) and lst[idx] == 7)  # True
\`\`\`

**C++ ⚡:**
\`\`\`cpp
bool found = binary_search(v.begin(), v.end(), 7);  // True
\`\`\`

C++ is much simpler, right?

| Search Method | Time Complexity | Sorting Required? |
|---|---|---|
| \`find()\` | O(n) | No |
| \`binary_search()\` | O(log n) | **Yes!** |

💡 If the data is sorted, always use \`binary_search()\` for efficiency!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Prepare the vector for fast search!",
          code: "vector<int> v = {4, 2, 7, 1, 9};\n___(v.begin(), v.end());  // Sort first!\nbool found = binary_search(v.begin(), v.end(), 7);",
          fillBlanks: [
            { id: 0, answer: "sort", options: ["sort", "find", "reverse", "binary_search"] }
          ],
          explanation: "You must sort with sort() before using binary_search()! Without sorting, the result can be incorrect."
        },
        {
          id: "ch2-bounds",
          type: "explain",
          title: "🎯 lower_bound() & upper_bound()!",
          content: `\`binary_search()\` only tells you "yes or no." If you need the **position**, use \`lower_bound()\` and \`upper_bound()\`!

\`\`\`cpp
vector<int> v = {1, 3, 5, 5, 5, 7, 9};
//                0  1  2  3  4  5  6  (indices)

// lower_bound: first position >= target
auto lb = lower_bound(v.begin(), v.end(), 5);
cout << lb - v.begin();  // 2 (position of first 5)

// upper_bound: first position > target
auto ub = upper_bound(v.begin(), v.end(), 5);
cout << ub - v.begin();  // 5 (position after last 5)

// Count of 5s = upper_bound - lower_bound
cout << ub - lb;  // 3 (three 5s!)
\`\`\`

Visually:

\`\`\`
v = {1, 3, 5, 5, 5, 7, 9}
          ^        ^
          lb       ub
     lower_bound  upper_bound
     (>= target)  (> target)
\`\`\`

Compare with Python's bisect module:

| Python 🐍 | C++ STL ⚡ |
|---|---|
| \`bisect.bisect_left(lst, 5)\` | \`lower_bound(v.begin(), v.end(), 5) - v.begin()\` |
| \`bisect.bisect_right(lst, 5)\` | \`upper_bound(v.begin(), v.end(), 5) - v.begin()\` |

\`\`\`cpp
// Getting the index
int idx = lower_bound(v.begin(), v.end(), 5) - v.begin();
\`\`\`

💡 \`lower_bound()\` is used constantly in USACO Silver! It's essential for coordinate compression, range queries, and more!`
        },
        {
          id: "ch2-practice-bounds",
          type: "predict" as const,
          title: "Count students scoring 70+",
          content: "In a sorted array of scores, figure out how many students scored 70 or above.",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {45, 55, 67, 72, 78, 85, 91, 98};\n    auto it = lower_bound(scores.begin(), scores.end(), 70);\n    cout << scores.end() - it << \" students\";\n}",
          options: ["3 students", "4 students", "5 students", "6 students"],
          answer: 2,
          explanation: "lower_bound finds the first position >= 70. That's 72! Counting from there to end(): 72, 78, 85, 91, 98 = 5 students."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Predict the lower_bound() result!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30, 40, 50};\n    auto it = lower_bound(v.begin(), v.end(), 25);\n    cout << it - v.begin();\n    return 0;\n}",
          options: ["1", "2", "3", "5"],
          answer: 1,
          explanation: "lower_bound finds the first position >= 25. In v = {10, 20, 30, 40, 50}, the first value >= 25 is 30 at index 2. So it - v.begin() outputs 2!"
        },
        {
          id: "ch2-unique",
          type: "explain",
          title: "🎯 unique() & erase() — Remove Duplicates!",
          content: `When you need to remove duplicates: say you read values from a data file and there are duplicates. You could use a set, but when you want to remove only the duplicates while keeping the original order, you need the erase-unique pattern!

\`unique()\` removes **consecutive duplicates**. Pair it with \`erase()\` for complete deduplication!

\`\`\`cpp
vector<int> v = {3, 1, 4, 1, 5, 3, 3};

// Step 1: Sort (unique only removes consecutive duplicates!)
sort(v.begin(), v.end());
// v = {1, 1, 3, 3, 3, 4, 5}

// Step 2: unique + erase combo!
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 3, 4, 5}
\`\`\`

**Step-by-step breakdown:**

\`\`\`
After sort:  {1, 1, 3, 3, 3, 4, 5}
unique():    {1, 3, 4, 5, ?, ?, ?}
                         ^-- position returned by unique
erase():    {1, 3, 4, 5}  // the ?s are removed!
\`\`\`

Compare with Python:

**Python 🐍:**
\`\`\`python
lst = [3, 1, 4, 1, 5, 3, 3]
result = sorted(set(lst))  # [1, 3, 4, 5]
\`\`\`

**C++ ⚡:**
\`\`\`cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
\`\`\`

Python is simpler, but the C++ approach is extremely useful for **coordinate compression**!

\`\`\`cpp
// Coordinate compression pattern
vector<int> coords = {100, 500, 100, 200, 500};
sort(coords.begin(), coords.end());
coords.erase(unique(coords.begin(), coords.end()), coords.end());
// coords = {100, 200, 500}
// Use lower_bound to find compressed indices!
\`\`\`

💡 The \`sort → unique → erase\` pattern appears constantly in competitive programming! Memorize it!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Sort + lower_bound to Find a Value!",
          content: `Use sort() and lower_bound() to sort a vector and find the position of 30!`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    sort(v.begin(), v.end());

    for (int x : v) cout << x << " ";
    cout << endl;

    int target = 30;
    auto it = lower_bound(v.begin(), v.end(), target);

    if (it != v.end() && *it == target) {
        cout << target << " found at index " << it - v.begin() << endl;
    } else {
        cout << target << " not found" << endl;
    }

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {50, 20, 40, 10, 30};

    // Sort v and print it
    // Print: "10 20 30 40 50 "

    int target = 30;
    // Use lower_bound() to find target's position and print it
    // Print: "30 found at index 2"

    return 0;
}`,
          hint: "sort(v.begin(), v.end()) sorts in place. lower_bound(v.begin(), v.end(), target) returns an iterator — check *it == target to confirm the value exists, then it - v.begin() is the index",
          expectedOutput: `10 20 30 40 50
30 found at index 2`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "binary_search rules!",
          content: "What MUST you do before using `binary_search()`?",
          options: [
            "Check the vector's size",
            "Sort the vector",
            "Reverse the vector",
            "Add #include <numeric>"
          ],
          answer: 1,
          explanation: "binary_search() only works correctly on sorted data! You must sort with sort() before using it."
        }
      ]
    },
    // ============================================
    // Chapter 3: Review Quiz
    // ============================================
    {
      id: "ch3",
      title: "Review Quiz",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "find() behavior!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};
auto it = find(v.begin(), v.end(), 50);
if (it == v.end()) {
    cout << "X";
} else {
    cout << *it;
}
\`\`\``,
          options: [
            "50",
            "40",
            "X",
            "Error"
          ],
          answer: 2,
          explanation: "50 is not in the vector, so find() returns v.end()! Since it == v.end() is true, X is printed."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "binary_search prerequisite!",
          content: `What happens here?

\`\`\`cpp
vector<int> v = {5, 3, 1, 4, 2};  // Not sorted!
bool result = binary_search(v.begin(), v.end(), 3);
\`\`\``,
          options: [
            "Always true",
            "Always false",
            "The result is unreliable",
            "Compile error"
          ],
          answer: 2,
          explanation: "binary_search() assumes sorted data! On an unsorted vector, the result might be correct or incorrect — you simply can't trust it."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "lower_bound vs upper_bound!",
          content: `If v = {1, 3, 5, 5, 5, 7}, what is the difference between the indices of lower_bound(5) and upper_bound(5)?`,
          options: [
            "1",
            "2",
            "3",
            "5"
          ],
          answer: 2,
          explanation: "lower_bound(5) points to index 2 (first 5), upper_bound(5) points to index 5 (where 7 is). The difference is 5-2=3, which equals the count of 5s!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "accumulate usage!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {1, 2, 3, 4, 5};
cout << accumulate(v.begin(), v.end(), 10);
\`\`\``,
          options: [
            "15",
            "25",
            "10",
            "Error"
          ],
          answer: 1,
          explanation: "The third argument to accumulate is the initial value! 10 + 1 + 2 + 3 + 4 + 5 = 25 is printed."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎉 Lesson 17 Complete!",
          content: `## 🏆 What We Learned Today!

### 🔍 Search & Numeric Algorithms
- \`min()\`, \`max()\` — compare two values
- \`min_element()\`, \`max_element()\` — find min/max in a range
- \`find()\` — search for a value (O(n))
- \`accumulate()\` — sum values (\`<numeric>\` header!)
- \`reverse()\`, \`swap()\` — utility functions

### 🎯 Binary Search
- \`binary_search()\` — returns true/false only
- \`lower_bound()\` — first position **>= target**
- \`upper_bound()\` — first position **> target**
- **Must sort first!**

### Deduplication Pattern
- \`sort → unique → erase\` — the core of coordinate compression!

## ✅ Key Summary Table

| Function | Header | Returns | Sort Required? |
|---|---|---|---|
| \`find()\` | \`<algorithm>\` | iterator | No |
| \`binary_search()\` | \`<algorithm>\` | bool | **Yes** |
| \`lower_bound()\` | \`<algorithm>\` | iterator | **Yes** |
| \`upper_bound()\` | \`<algorithm>\` | iterator | **Yes** |
| \`accumulate()\` | \`<numeric>\` | value | No |

🚀 **Next lesson, we'll learn about stack, queue & deque!** Time to enter the world of data structures!`
        }
      ]
    }
  ]
}
