// ============================================
// C++ Lesson 23 (EN): sort Master
// sort basics → lambda → binary search (lower_bound) → advanced
// ============================================
import { LessonData } from '../types'

export const cppLesson23EnData: LessonData = {
  id: "cpp-23",
  title: "sort Master",
  emoji: "📊",
  description: "sort basics + lambda + lower_bound — Master sorting!",
  chapters: [
    // ============================================
    // Chapter 0: sort basics
    // ============================================
    {
      id: "s23-ch0",
      title: "sort Basics",
      emoji: "📊",
      steps: [
        {
          id: "s23-ch0-intro",
          type: "explain",
          title: "📊 sort() — sort it in one line",
          content: `In the previous lesson we saw how pair's auto-comparison made "**a score sheet sorts itself with one line of \`sort\`**". This lesson is all about that \`sort\`.

\`sort\` collapses the work of writing your own quicksort/mergesort into **one line**. It's one of the most-used STL functions in C++.

\`\`\`cpp
#include <algorithm>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}
\`\`\`

\`sort(begin, end)\` — STL's familiar \`(begin, end)\` pattern: "sort within this range."

> 💡 Looks like Python's \`v.sort()\` but with one important difference.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`v.sort()\` | \`sort(v.begin(), v.end())\` |
| \`sorted(v)\` — returns new list | (none) C++ always **modifies the original** |

In C++, sort always **modifies in place**. Need a sorted copy? Copy the vector first, then sort the copy.

### Same thing for arrays

\`\`\`cpp
int arr[] = {5, 2, 8, 1, 9};
sort(arr, arr + 5);  // sort arr[0] ~ arr[4]
\`\`\`

{collapse:🤔 Why does \`arr + 5\` work?}
\`\`\`
arr is actually the memory address of the first element (a pointer).
arr     → address of arr[0]
arr + 5 → address of arr[5] (= one past last, marks "the end")

Same role as v.begin() / v.end() for vectors.
\`\`\`

Next page — try sorting one yourself 👇`
        },
        {
          id: "s23-ch0-fb1",
          type: "fillblank" as const,
          title: "sort Fill-in-the-Blank",
          content: "Complete the code to sort the vector!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.___, v.___);",
          fillBlanks: [
            { id: 0, answer: "begin()", options: ["begin()", "front()", "start()", "first()"] },
            { id: 1, answer: "end()", options: ["end()", "back()", "stop()", "last()"] }
          ],
          explanation: "sort() takes a start and end position! For vectors, use v.begin() and v.end()."
        },
        {
          id: "s23-ch0-pred1",
          type: "predict" as const,
          title: "Predict the sort Output!",
          code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {4, 2, 7, 1, 5};\n    sort(v.begin(), v.end());\n    cout << v[0] << \" \" << v[4];\n    return 0;\n}",
          options: ["4 5", "1 7", "7 1", "1 5"],
          answer: 1,
          explanation: "After sort(), v = {1, 2, 4, 5, 7}. v[0] is the smallest (1), v[4] is the largest (7). Output: 1 7!"
        },
        {
          id: "s23-ch0-desc",
          type: "explain",
          title: "📊 Descending Sort!",
          content: `Default sort() is ascending. How do you sort in descending order?

**Method 1: Use greater<int>() (for simple int/string)**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}
\`\`\`

sort() accepts a **third argument** for the comparison rule.
\`greater<int>()\` is a pre-built tool meaning "bigger goes first."

| | Code | Result |
|---|---|---|
| Ascending | \`sort(v.begin(), v.end())\` | 1 2 5 8 9 |
| Descending | \`sort(v.begin(), v.end(), greater<int>())\` | 9 8 5 2 1 |

💡 No third argument = ascending by default!`
        },
        {
          id: "s23-ch0-fb2",
          type: "fillblank" as const,
          title: "Descending Sort Fill-in-the-Blank",
          content: "Sort the vector in descending order!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), ___<int>());",
          fillBlanks: [
            { id: 0, answer: "greater", options: ["greater", "bigger", "larger", "reverse"] }
          ],
          explanation: "Use greater<type>() for descending order! Match the type: greater<int>(), greater<string>(), etc."
        },
        {
          id: "s23-ch0-q1",
          type: "quiz",
          title: "sort Header!",
          content: "Which header do you need to include to use `sort()`? Pick the **official answer**.",
          options: [
            "#include <sort>",
            "#include <algorithm>",
            "#include <vector>",
            "#include <utility>"
          ],
          answer: 1,
          explanation: "**Official answer: `<algorithm>`**. `sort()` lives exactly in this header.\n\n💡 You may be thinking back to the pair note (\"`<vector>` etc. pull pair in for free\") — that's a different case:\n• **pair is a *type***: STL containers like map / set use pair *internally*, so it gets pulled in transitively.\n• **sort is a *function***: other STL headers don't use sort internally, so it doesn't get pulled in. Including only `<vector>` and calling `sort()` gives `'sort' was not declared`.\n\n**Rule: for functions, explicitly include the official header.** Types just sometimes happen to come along for free."
        }
      ]
    },

    // ============================================
    // Chapter 1: Custom Sorting with Lambda
    // ============================================
    {
      id: "s23-ch1",
      title: "Custom Sorting with Lambda",
      emoji: "🔧",
      steps: [
        {
          id: "s23-ch1-why",
          type: "explain",
          title: "🤔 A situation where \`greater<int>()\` falls short",
          content: `On the previous page we used \`greater<int>()\` for descending sort. That works great with **plain numbers/strings**. But — what if the data is a student score list?

\`\`\`cpp
vector<pair<string, int>> students = {
    {"Kim", 85}, {"Lee", 92}, {"Park", 78}
};
\`\`\`

We want to sort this **by score (second) descending**.

\`sort(students.begin(), students.end())\` alone? Pair's auto-comparison sorts by \`first\` (name). Not what we want.

\`greater<pair<string,int>>()\`? Compares the whole pair (name + score). Also not it.

> 🎯 What we actually need: **a way to spell out the comparison ourselves.**
> Something like, "for these two students, *I'll* tell sort which one comes first."

The tool for this is a **lambda**. Next page covers the syntax 👇`
        },
        {
          id: "s23-ch1-syntax",
          type: "explain",
          title: "🔧 Lambda Syntax",
          content: `A lambda is a **disposable, anonymous function** — no name, written right where you need it.

**You already know Python lambda!**
\`\`\`python
# Python: return value right after the colon
lambda x: x * 2

# In sort: written after key=
sorted(v, key=lambda x: -x)  # descending
\`\`\`

**C++ lambda looks a bit different:**
\`\`\`
Python:  lambda x      : x * 2
C++:     [](int x)     { return x * 2; }
           ↑               ↑
       always starts    return inside
       with []          curly braces
\`\`\`

---

**In sort, lambda is special — it takes 2 arguments!**

Python's \`key=\` transforms one value,
but C++ sort's lambda **directly compares two values.**

\`\`\`cpp
[](int a, int b) { return a > b; }
       ↑     ↑              ↑
   two values to compare    if true, a goes first!
\`\`\`

**Rule examples:**
\`\`\`
a=9, b=5 → 9 > 5 = true  → 9 goes first ✅
a=2, b=8 → 2 > 8 = false → 8 goes first ✅
Result: bigger numbers first → descending!
\`\`\`

**In practice:**
\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9};

sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // if a is bigger, a goes first
});
// v = {9, 8, 5, 2, 1}  (descending)
\`\`\`

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Lambda shape | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| In sort | transform 1 value (\`key=\`) | compare 2 values (a, b) |

💡 Think of \`[]\` as just "the lambda start marker." Always empty brackets for now!`
        },
        {
          id: "s23-ch1-fb1",
          type: "fillblank" as const,
          title: "Lambda Descending Sort Fill-in-the-Blank",
          content: "Complete the descending sort code using a lambda!",
          code: "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end(), [](int a, int b) {\n    return a ___ b;  // bigger goes first\n});",
          fillBlanks: [
            { id: 0, answer: ">", options: [">", "<", ">=", "!="] }
          ],
          explanation: "If a > b returns true, a goes first. Bigger numbers first = descending order!"
        },
        {
          id: "s23-ch1-abs-mini",
          type: "practice" as const,
          title: "✋ Quick — sort by absolute value",
          content: `**Scenario**: Sort score deltas by closeness to 0.

\`\`\`
Input:  -3, 7, -1, 4, -5
Expected (sorted by |x|): -1 -3 4 -5 7
\`\`\`

\`abs(x)\` gives absolute value. Inside the lambda, just compare \`abs(a) < abs(b)\`.

> 💡 Only the comparison expression changes. Values themselves don't change.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>  // abs
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    // 👇 sort by abs(x) ascending using a lambda


    for (int x : v) cout << x << " ";
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
using namespace std;

int main() {
    vector<int> v = {-3, 7, -1, 4, -5};

    sort(v.begin(), v.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });

    for (int x : v) cout << x << " ";
    return 0;
}`,
          hint: "sort(v.begin(), v.end(), [](int a, int b) { return abs(a) < abs(b); }); — only the comparison swaps to abs.",
          expectedOutput: `-1 -3 4 -5 7 `
        },
        {
          id: "s23-ch1-pair",
          type: "explain",
          title: "🔧 Sort Pairs by Any Criterion!",
          content: `Now let's sort pairs by score!

\`\`\`cpp
vector<pair<string, int>> v = {{"Kim", 85}, {"Lee", 92}, {"Park", 78}};

// Sort by score (second) in descending order
sort(v.begin(), v.end(), [](auto a, auto b) {
    return a.second > b.second;  // higher score goes first
});
// Result: Lee(92) → Kim(85) → Park(78)
\`\`\`

💡 Use \`auto\` to avoid writing out the full type!

**Two-criteria sort (1st: score descending, ties: name ascending):**
\`\`\`cpp
sort(v.begin(), v.end(), [](auto a, auto b) {
    if (a.second != b.second)
        return a.second > b.second;  // higher score first
    return a.first < b.first;        // tied score: alphabetical
});
\`\`\``
        },
        {
          id: "s23-ch1-pred1",
          type: "predict" as const,
          title: "Predict the pair Sort Result!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<pair<string,int>> v = {{"Kim",85},{"Lee",92},{"Park",78}};
    sort(v.begin(), v.end(), [](auto a, auto b) {
        return a.second > b.second;
    });
    cout << v[0].first;
    return 0;
}`,
          options: ["Kim", "Lee", "Park", "Compile Error"],
          answer: 1,
          explanation: "After descending score sort: Lee(92) → Kim(85) → Park(78). v[0].first is Lee!"
        },
        {
          id: "s23-ch1-fb2",
          type: "fillblank" as const,
          title: "pair Score Sort Fill-in-the-Blank",
          content: "Complete the lambda to sort pairs by score (second) in ascending order!",
          code: "sort(v.begin(), v.end(), [](auto a, auto b) {\n    return a.___ < b.___;\n});",
          fillBlanks: [
            { id: 0, answer: "second", options: ["second", "first", "score", "value"] },
            { id: 1, answer: "second", options: ["second", "first", "score", "value"] }
          ],
          explanation: "The second value in a pair is accessed with .second. a.second < b.second means a goes first → ascending order!"
        },
        {
          id: "s23-ch1-must-lambda",
          type: "practice" as const,
          title: "🎯 When lambda is *truly necessary* — multi-key sorting",
          content: `This problem genuinely cannot be solved without a lambda.

**Problem**: 5 students with (name, score).
**Sort by score descending, breaking ties by name ascending (alphabetical)**, then print.

\`\`\`
Input:
  Kim    88
  Lee    95
  Park   88
  Choi   72
  Han    95

Expected output (score↓, then name↑):
  Han 95
  Lee 95
  Kim 88
  Park 88
  Choi 72
\`\`\`

> 💡 Plain \`sort()\` sorts both fields ascending (pair auto-compare).
> \`greater<>()\` sorts both descending.
> **"score descending, but name ascending"** — mixed directions like this can only be done with a **lambda**.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    // 👇 Pass a lambda as sort's 3rd argument:
    //    Primary: score (second) descending
    //    Tiebreaker: name (first) ascending


    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<pair<string, int>> students = {
        {"Kim", 88}, {"Lee", 95}, {"Park", 88}, {"Choi", 72}, {"Han", 95}
    };

    sort(students.begin(), students.end(), [](auto a, auto b) {
        if (a.second != b.second) return a.second > b.second;  // score descending
        return a.first < b.first;                                // name ascending
    });

    for (auto& s : students) {
        cout << s.first << " " << s.second << endl;
    }
    return 0;
}`,
          hint: "Inside the lambda, if-else pattern: if (a.second != b.second) return a.second > b.second; (score descending) / when scores tie: return a.first < b.first; (name ascending)",
          expectedOutput: `Han 95
Lee 95
Kim 88
Park 88
Choi 72`
        }
      ]
    },

    // ============================================
    // Chapter 2: Searching in Sorted Arrays
    // ============================================
    {
      id: "s23-ch2",
      title: "Searching in Sorted Arrays",
      emoji: "🔍",
      steps: [
        {
          id: "s23-ch2-linear",
          type: "animation" as const,
          title: "🔎 Linear Search — Checking One by One",
          component: "linearSearch",
          content: `Imagine finding **"Kim"** in a phone book.

The simplest approach: flip through **one page at a time** from page 1.

Page 1... nope. Page 2... nope. Page 3...

A 500-page book could take **500 checks** in the worst case. Arrays are the same — **1 million elements = up to 1 million checks.**

Press the button to follow along!`,
        },
        {
          id: "s23-ch2-binary",
          type: "animation" as const,
          title: "⚡ Binary Search — Open the Middle First",
          component: "binarySearch",
          content: `When looking for "Kim" in a phone book, do you start at page 1?

**No.** K is around the middle of the alphabet, so naturally you **open to the middle.**

This only works for one reason — **the phone book is alphabetically sorted.**
Without sorting, you'd have no idea where to look, so you'd have to start at page 1.

**Binary search turns this intuition into an algorithm:**

Open the middle (page 250): "Park" → Kim is before! **Skip the last 250 pages.**
Open the new middle (page 125): "Lee" → Kim is before! **Cut in half again.**
Keep halving — **500 pages found in just 9 checks.**

**Sort → enables binary search → much faster!**
This is why we learn sort before binary search.

Press the button to follow along!`,
        },
        {
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 What Are begin() and end()?",
          content: `We've been using \`v.begin()\` and \`v.end()\` with sort() — let's understand what they actually are.

**begin() and end() are memory addresses (arrows pointing to positions).**

\`\`\`
vector<int> v = {10, 20, 30, 40, 50};

Memory:  1000  1004  1008  1012  1016  1020
Values:   10    20    30    40    50    ???

v.begin() = 1000  (address where 10 lives)
v.end()   = 1020  (address *after* 50, no value — never read this!)
\`\`\`

\`\`\`
   10    20    30    40    50   [empty]
    ↑                             ↑
 begin()                        end()
(1000)                         (1020)
\`\`\`

### Why does sort take begin/end instead of indices?

C++ functions like sort() take **addresses (arrows)** for "from where to where."

\`\`\`cpp
sort(v.begin(), v.end());
//    ↑ from this address  ↑ up to (not including) this address
\`\`\`

But why addresses specifically? There are two reasons — see the next page 👇`
        },
        {
          id: "s23-ch2-iter-benefits",
          type: "explain",
          title: "📌 Why addresses? — two benefits (especially *unification*)",
          content: `**① The same sort works on every container — iterator unification** ⭐

This is the real key. Once sort takes begin/end, it works **regardless of container type**:

\`\`\`cpp
sort(v.begin(), v.end());     // vector
sort(arr, arr + n);           // raw array
sort(lst.begin(), lst.end()); // list, deque, etc.
// All handled by ONE sort function!
\`\`\`

If sort were "a function that takes a vector," you'd need separate \`sortVector\`, \`sortArray\`, \`sortList\`. Instead, by **unifying through the iterator interface**, one sort handles them all.

This design runs through the entire STL. find / count / accumulate — every algorithm uses the \`(begin, end)\` pattern for the same reason: **one function, every container**.

**② No copy — fast regardless of size**

If you passed the vector itself, it'd be copied wholesale. A million elements = enormous copy cost. Passing just two addresses sidesteps that entirely.

\`\`\`cpp
sort(v);                   // (hypothetical) full vector copy — slow
sort(v.begin(), v.end());  // just 2 addresses — always fast ✅
\`\`\`

### Bonus: subtracting two arrows gives the *distance (index)*

\`\`\`
   10    20    30    40    50
 1000  1004  1008  1012  1016
    ↑                ↑
 begin()             it  (points to 40, address 1012)

it - v.begin()  = (1012 - 1000) / 4 = 3  → index 3
\`\`\`

\`\`\`cpp
auto it = v.begin() + 3;
cout << *it;             // 40  (*it = value the arrow points to)
cout << it - v.begin();  // 3   (convert to index)
\`\`\`

> 💡 **"Subtract two arrows = distance"** — this exact trick becomes idiomatic with \`lower_bound\` next.`
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 lower_bound — Binary Search in One Line!",
          content: `The binary search we just saw — C++ has a built-in function for it.
That's \`lower_bound\` and \`upper_bound\`.

⚠️ **Only works on sorted arrays!** — built on binary search principles.

---

**lower_bound / upper_bound concept**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (val=3)      (val=3)
"3 starts"   "after 3 ends"
\`\`\`

- **lower_bound** → first position where value **≥ x** = "where this value starts"
- **upper_bound** → first position where value **> x** = "one past where value ends"

---

**Why do we need** \`- v.begin()\`**?**

\`lower_bound\` returns \`it\` — not an index number, but a
**memory address (an arrow pointing to a position).**
Printing it directly gives something like \`0x7ff3a2b...\`

\`it - v.begin()\` calculates "how many spots from the start."

\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};
//               0  1  2  3  4  5

auto it = lower_bound(v.begin(), v.end(), 3);
int idx = it - v.begin();  // formula! always convert to index this way
cout << idx;  // 1
\`\`\`

💡 Memorize \`- v.begin()\` as a formula!

---

**What happens when the value isn't found?**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4 doesn't exist
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2  (first value ≥ 4 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2  (first value > 4 = 5)
// When value is missing: lower_bound == upper_bound !

// 10 doesn't exist (bigger than everything)
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  (past the end)
\`\`\`

**→ lower_bound == upper_bound means the value isn't in the array!**

---

**Usage Patterns**

\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 7, 9};

// ① How many 3s are there?
int count = upper_bound(v.begin(), v.end(), 3)
          - lower_bound(v.begin(), v.end(), 3);
// 3 - 1 = 2!

// ② Does a value exist? — binary_search() is simpler!
if (binary_search(v.begin(), v.end(), 3)) cout << "found";
else cout << "not found";

// ③ When you need the position — use lower_bound
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();
cout << idx;  // 1
\`\`\`

---

**binary_search() vs lower_bound — when to use which?**

| | binary_search() | lower_bound() |
|---|---|---|
| Returns | true / false | position (iterator) |
| Use when | just checking existence | need position or count |
| Code | short, intuitive | longer but more powerful |

\`\`\`cpp
// Just "is 5 there?" → binary_search
binary_search(v.begin(), v.end(), 5)  // true

// "What index is 5 at?" → lower_bound
lower_bound(v.begin(), v.end(), 5) - v.begin()  // 3
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x in v\` | \`binary_search(v.begin(), v.end(), x)\` |
| \`bisect.bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect.bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |`
        },
        {
          id: "s23-ch2-lb2",
          type: "explain",
          title: "🔍 All Three Cases Explained!",
          content: `Let's compare all 3 cases using \`{1, 3, 3, 5, 7, 9}\`.

---

**Case 1: Value appears exactly once (finding 5)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑   ↑
       lower_bound upper_bound
          (5)         (5)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 5) - v.begin()  →  3  (position of 5)
upper_bound(v.begin(), v.end(), 5) - v.begin()  →  4  (position after 5)
4 - 3 = 1  →  5 appears 1 time
\`\`\`

---

**Case 2: Value appears multiple times (finding 3)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
   (3)          (3)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 3) - v.begin()  →  1  (first 3)
upper_bound(v.begin(), v.end(), 3) - v.begin()  →  3  (one past last 3)
3 - 1 = 2  →  3 appears 2 times
\`\`\`

---

**Case 3: Value doesn't exist (finding 4)**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
             ↑
    lower_bound(4) = upper_bound(4)  ← they're the same!
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (first value ≥ 4 = 5)
upper_bound(v.begin(), v.end(), 4) - v.begin()  →  3  (first value > 4 = 5)
3 - 3 = 0  →  4 appears 0 times = not found!
\`\`\`

**→ lower_bound == upper_bound means the value isn't in the array.**

---

**📌 Key Formula Summary**

| Goal | Code |
|---|---|
| First position of value | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| How many of value? | \`upper_bound(...) - lower_bound(...)\` |
| Does value exist? | \`lower_bound(...) != upper_bound(...)\` → exists |`
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "🔍 When the Search Goes Out of Bounds",
          content: `What happens when you search for a value bigger or smaller than everything?

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
//               0  1  2  3  4
\`\`\`

---

**Value bigger than all (finding 10)**

\`\`\`
{1,  3,  5,  7,  9,  [end]}
 0   1   2   3   4    5
                      ↑
    lower_bound(10) = upper_bound(10) = 5 (past the end!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 10) - v.begin()  →  5  (out of range!)
upper_bound(v.begin(), v.end(), 10) - v.begin()  →  5
\`\`\`

⚠️ Index 5 means \`v[5]\` doesn't exist! It's the **v.end()** position.
Always check \`idx < v.size()\` before accessing.

---

**Value smaller than all (finding 0)**

\`\`\`
{1,  3,  5,  7,  9}
 0   1   2   3   4
 ↑
lower_bound(0) = upper_bound(0) = 0 (at the front!)
\`\`\`

\`\`\`cpp
lower_bound(v.begin(), v.end(), 0) - v.begin()  →  0  (at start)
upper_bound(v.begin(), v.end(), 0) - v.begin()  →  0
\`\`\`

---

**Safe usage pattern:**
\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

// Always check before using!
if (it != v.end() && *it == x) {
    // only when value is found
    int idx = it - v.begin();
    cout << idx;
}
\`\`\`

💡 \`*it\` is the value that \`it\` points to. (it = arrow, *it = what the arrow points at)`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "lower_bound Fill-in-the-Blank",
          content: "Find the first index where 4 or greater appears in the sorted vector!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound returns an iterator to the first position ≥ the target value. Subtract v.begin() to get the index. 4 first appears at index 2!"
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "Predict lower_bound & upper_bound Output!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {2, 4, 4, 6, 8};
    auto lo = lower_bound(v.begin(), v.end(), 4);
    auto hi = upper_bound(v.begin(), v.end(), 4);
    cout << (lo - v.begin()) << " " << (hi - lo);
    return 0;
}`,
          options: ["1 2", "2 2", "1 1", "2 1"],
          answer: 0,
          explanation: "lower_bound(4) → index 1 (first 4). upper_bound(4) → index 3 (position of 6). hi - lo = 3 - 1 = 2 (4 appears twice). Output: 1 2"
        }
      ]
    },

    // ============================================
    // Chapter 3: Advanced Patterns
    // ============================================
    {
      id: "s23-ch3",
      title: "Advanced Patterns",
      emoji: "🧹",
      steps: [
        {
          id: "s23-ch3-unique",
          type: "explain",
          title: "🧹 sort + unique — Removing Duplicates!",
          content: `The most common C++ pattern for **removing duplicate values** from an array!

\`\`\`cpp
#include <algorithm>
#include <vector>
using namespace std;

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

// Step 1: sort (unique only removes adjacent duplicates!)
sort(v.begin(), v.end());
// v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}

// Step 2: remove duplicates with unique + erase
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4, 5, 6, 9}
\`\`\`

⚠️ **Sort first!** unique only removes adjacent duplicates.
Without sorting, {1, 3, 1} stays as 3 elements.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`sorted(set(v))\` | \`sort + erase(unique(...))\` |

💡 Memorize **sort → erase(unique(...), end())** as a pair!`
        },
        {
          id: "s23-ch3-summary",
          type: "explain",
          title: "🎉 Lesson 23 Complete! sort Master!",
          content: `## 🏆 Lesson 23 Done! Amazing work!

### 📊 sort Basics
- **sort(v.begin(), v.end())** → ascending (default)
- **sort(v.begin(), v.end(), greater<int>())** → descending
- Requires \`#include <algorithm>\`!

### 🔧 Lambda
- **Syntax:** \`[](type a, type b) { return a > b; }\`
- **Rule:** return true → first argument (a) goes first
- Essential for custom sort criteria (pair, struct, etc.)
- \`greater<int>()\` is a pre-built descending lambda

### 🔍 lower_bound & upper_bound
- **Must use on sorted arrays only!** (binary search under the hood)
- **lower_bound(begin, end, x)**: first position where value **≥ x**
- **upper_bound(begin, end, x)**: first position where value **> x**
- Convert to index: \`- v.begin()\`

### 🧹 Advanced Pattern
- **sort + erase(unique(...), end())**: remove duplicates (memorize as a set!)

### 🐍 Key Differences from Python!
| Feature | Python 🐍 | C++ ⚡ |
|---|---|---|
| Lambda syntax | \`lambda x: x*2\` | \`[](int x){ return x*2; }\` |
| Sort criterion | \`key=\` (transform 1 value) | comparison function (compare 2) |
| Binary search | \`bisect_left/right\` | \`lower_bound/upper_bound\` |
| Remove dups | \`sorted(set(v))\` | \`sort + erase(unique)\` |

🚀 Next up: **map & set** — containers that stay sorted like magic!`
        }
      ]
    }
  ]
}
