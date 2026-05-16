// ============================================
// C++ Lesson 25: Fast Search on Sorted Data
// (이전 cpp-23 에서 분리: ch2 Searching on sorted data)
// ============================================
import { LessonData } from '../types'

export const cppLesson25EnData: LessonData = {
  id: "cpp-25",
  title: "Fast Search on Sorted Data",
  emoji: "🔍",
  description: "binary_search, lower_bound, upper_bound — what one sort unlocks",
  chapters: [
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
          content: `You've now mastered sort. There's another big reason sorted data matters — **search becomes much faster.** Let's get into that.

First, see what happens when data is **not** sorted. Imagine finding **"Kim"** in a phone book.

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
          id: "s23-ch2-sorted-toolbox",
          type: "explain",
          title: "🗝️ Sorting is the launchpad — a toolbox that opens up after one sort",
          content: `## 🚀 Sort is the start, not the end

> **🎯 The real value of \`sort\` is in all the things that become possible once your data is sorted.**
> That's what this whole chapter is about.

Remember the **binary search** from the previous page? "Open the middle" worked because the phone book was sorted. Every function in this chapter rides on that same idea.

---

### 📊 What sorting unlocks — 1,000,000 items

| What you want | **Un**sorted | Sorted (this chapter) |
|---|---|---|
| "is x there?" | 1,000,000 (\`find\`) | **~20** (\`binary_search\`) |
| "how many of x?" | 1,000,000 (\`count\`) | **~40** (\`upper - lower\`) |
| "first ≥ x?" | 1,000,000 | **~20** (\`lower_bound\`) |
| "dedupe" | tricky to write | **one line** (\`sort + unique + erase\`) |
| "min / max?" | full scan | **instant** (\`v.front()\`, \`v.back()\`) |

> 💡 Function names may be new — we'll cover each one soon. **Sorting once makes search about 50,000× faster** — that's why USACO solutions almost always start with "sort first".

---

### ⚠️ The chapter's promise — sorted input required

\`binary_search\`, \`lower_bound\`, \`upper_bound\` — **all three only work correctly on sorted arrays.** On unsorted data they **don't even error** — they quietly return wrong answers. So always run \`sort(v.begin(), v.end())\` first.

---

### 🪧 Next page

These functions return **a "finger pointing to a position"** instead of a number. That finger is called an **iterator** — one minute on the next page and we're back to the actual functions!`
        },
        {
          id: "s23-ch2-iter",
          type: "explain",
          title: "📌 Iterators — a finger pointing to a position",
          content: `Remember how we said \`lower_bound\`, \`binary_search\`, \`upper_bound\` return **a position (a finger) instead of a number** in the table you just saw (👈)? That finger's real name is **iterator**.

**The name sounds scary, but it's really nothing** — just picture one finger and you're done!

---

### Iterator = a finger pointing to one spot in your data 🫵

> 💡 Not just vectors — **maps, sets, lists, any container.** This chapter uses vectors for practice, but the same finger shows up again in the next lesson (map / set).

Imagine gently placing one finger on the vector:

\`\`\`
   10    20    30    40    50
   ↑
  here!
\`\`\`

That finger is pointing at the first slot (10). **That's it — that's an iterator.** Done. Put it in a variable:

\`\`\`cpp
auto it = v.begin();   // place the finger on the first slot
\`\`\`

\`v.begin()\` hands you "a finger pointing to the vector's first slot."

---

### A finger can do exactly two things

**1️⃣ "What's here?" → \`*it\`**

Put \`*\` in front of the finger and you get **the value at that spot**:

\`\`\`cpp
auto it = v.begin();   // pointing at 10
cout << *it;           // 10
\`\`\`

**2️⃣ "One slot over!" → \`++it\`**

\`\`\`cpp
++it;
cout << *it;           // 20
++it;
cout << *it;           // 30
\`\`\`

Every \`++\` slides the finger over by one — that's the whole story.

---

> 💡 The stop marker (\`v.end()\`) and index conversion (\`it - v.begin()\`) come on the next page. For now, knowing *"it's a finger with two operations: \`*it\` and \`++it\`"* is enough.`
        },
        {
          id: "s23-ch2-iter-sim",
          type: "animation" as const,
          title: "🎮 See it live — Pointer vs Iterator",
          component: "iteratorVsPointer",
          content: `Watch what \`++\` actually does for a pointer vs an iterator.

- **vector mode**: both move to the next slot identically — pointer or iterator, either works
- **list mode**: pointer ❌ ends up at a garbage address; only iterator ✅ follows to the real next node

Switch the toggle and press \`++\` to see the difference at a glance.`
        },
        {
          id: "s23-ch2-iter-formulas",
          type: "explain",
          title: "🎯 Before the next page — two formulas to memorize",
          content: `When an iterator comes back from \`lower_bound\` (or \`find\`), you'll be doing **one of two things**:

\`\`\`
   10    20    30    40    50
    ↑                ↑
 begin()             it  (points to 40)
\`\`\`

\`\`\`cpp
cout << *it;             // 40   ← *it is the value
cout << it - v.begin();  // 3    ← convert to index
\`\`\`

---

### 🛡️ Not found → returns \`v.end()\`

\`lower_bound\` and \`find\` return \`v.end()\` when the value isn't there (= "the end marker"). Reading that slot with \`*it\` is **dangerous** — there's no value there.

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);
if (it != v.end()) {        // ← always check
    cout << *it;             // safe
} else {
    cout << "not found";
}
\`\`\`

> 💡 Memorize the pattern: \`auto it = ...; if (it != v.end()) { ... }\`. That one line keeps 90% of iterator code safe.

---

### Two formulas + one pattern, that's it

| Memorize | Meaning |
|---|---|
| \`*it\` | **value** at that position |
| \`it - v.begin()\` | **index** (0-based) |
| \`it != v.end()\` | **was it found** (end means not found) |

Know those three and the next pages flow easily. Let's try one 👇`
        },
        {
          id: "s23-ch2-iter-try",
          type: "predict" as const,
          title: "✋ Try it — predict iterator output",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    auto it = v.begin() + 2;
    cout << *it << " ";
    cout << (it - v.begin()) << endl;
    return 0;
}`,
          options: ["30 2", "20 1", "30 3", "2 30"],
          answer: 0,
          explanation: "\\`v.begin() + 2\\` moves two slots from begin → index 2 → value **30**. \\`*it\\` = 30. \\`it - v.begin()\\` = 2 (the index). Output: **30 2**."
        },
        {
          id: "s23-ch2-lb",
          type: "explain",
          title: "🔍 binary_search / lower_bound / upper_bound — the binary search trio",
          content: `Instead of writing binary search by hand every time, C++ provides **three functions** — same family:

\`\`\`cpp
binary_search(v.begin(), v.end(), x);  // is x in there? → true / false
lower_bound (v.begin(), v.end(), x);   // where x starts
upper_bound (v.begin(), v.end(), x);   // one past where x ends
\`\`\`

⚠️ **Sorted arrays only!** (it's binary search inside)

---

**Picture it — finding value 3**

\`\`\`
{1,  3,  3,  5,  7,  9}
 0   1   2   3   4   5
     ↑       ↑
lower_bound  upper_bound
  (val=3)     (val=3)
"3 starts"   "after 3 ends"
\`\`\`

- **binary_search(x)** → is \`x\` in the array? **true / false** _(use when you only need yes/no)_
- **lower_bound(x)** → first position where value **≥ x** _(use to find "first item ≥ threshold")_
- **upper_bound(x)** → first position where value **> x** _(usually paired with lower_bound — counting / ranges)_

> 💡 Don't dig deeper — the **picture + three-line description** is enough. Concrete scenarios for each tool are on the next pages.`
        },
        {
          id: "s23-ch2-binary-search-predict",
          type: "predict" as const,
          title: "✋ Try it — predict binary_search output",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v = {1, 3, 5, 7, 9};
    cout << binary_search(v.begin(), v.end(), 5) << " ";
    cout << binary_search(v.begin(), v.end(), 4) << endl;
    return 0;
}`,
          options: ["1 0", "5 4", "true false", "0 1"],
          answer: 0,
          explanation: "binary_search returns a **bool** — printed via \`cout\`, \`true → 1\` and \`false → 0\`. 5 is in the array → 1, 4 isn't → 0. (Key point: it prints as \"1\"/\"0\", not \"true\"/\"false\".)"
        },
        {
          id: "s23-ch2-trio-quiz",
          type: "quiz" as const,
          title: "Which of the trio do you reach for?",
          content: "You have a sorted \`vector<int> v\`. If you only need to know **whether 7 is in the array (yes / no)**, which one is the cleanest pick?",
          options: [
            "`binary_search(v.begin(), v.end(), 7)`",
            "`lower_bound(v.begin(), v.end(), 7)`",
            "`upper_bound(v.begin(), v.end(), 7)`"
          ],
          answer: 0,
          explanation: "**`binary_search`** is the one that asks exactly \"is it there?\" — it returns true/false, the most direct answer. lower_bound and upper_bound return **positions**, so checking existence with them takes one extra step (e.g. `lower_bound != upper_bound`)."
        },
        {
          id: "s23-ch2-lb-missing",
          type: "explain",
          title: "🔍 What if the value isn't there? — the insertion slot",
          content: `Even when the value **isn't in the array**, \`lower_bound\` doesn't error out — it returns a number. That number is **"the slot this value would go into if you wanted to keep the array sorted."**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

// 4 isn't here — "where would 4 go?"
lower_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← right before 5 (where 4 belongs)
upper_bound(v.begin(), v.end(), 4) - v.begin() →  2   ← same spot (when value's missing, start = end)

// 10 is bigger than everything — "put it at the very end"
lower_bound(v.begin(), v.end(), 10) - v.begin() →  5  ← v.end() position (= v.size())
\`\`\`

This is what makes lower_bound **stronger than just "return a position":** it gives you a **meaningful** position whether the value exists or not — "where it is, or where it would go."

---

**Putting it to use — "insert while staying sorted":**

\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};
int x = 4;
v.insert(lower_bound(v.begin(), v.end(), x), x);
// v = {1, 3, 4, 5, 7, 9}  ← still sorted!
\`\`\`

---

> ⚠️ **Don't use the \`lower == upper\` trick just to check existence.** The intent is unclear. → **\`binary_search(v.begin(), v.end(), x)\`** is the right answer (from the earlier page). Those two iterators landing on the same spot is a **side effect** of lower_bound's design, not its purpose.`
        },
        {
          id: "s23-ch2-lb-firstge-fb",
          type: "fillblank" as const,
          title: "✋ Try it — first student ≥ 70",
          content: "From a sorted score array, print the **score of the first student with ≥ 70**.",
          code: "vector<int> scores = {45, 60, 72, 85, 91};\nauto it = ___(scores.begin(), scores.end(), 70);\ncout << *it;  // prints 72",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "find"] }
          ],
          explanation: "**lower_bound(scores, 70)** returns the first position with value ≥ 70. \\*it reads the value at that position (72). \\`find\\` would only match exactly 70 ❌. \\`binary_search\\` only returns a bool ❌."
        },
        {
          id: "s23-ch2-lb-patterns",
          type: "explain",
          title: "🎯 3 usage patterns",
          content: `\`\`\`cpp
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

> 💡 The trio is one family but they **return different things**, so they're used differently. Next page covers a common trap. (Concrete "where do I use this?" scenarios are summarized later in this chapter, in a comparison table.)`
        },
        {
          id: "s23-ch2-patterns-fb",
          type: "fillblank" as const,
          title: "✋ Try it — how many 5s?",
          content: "In the sorted \`vector<int> v = {1, 2, 5, 5, 5, 7}\`, find **how many 5s** there are in one line. (upper-lower pattern)",
          code: "vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = ___(v.begin(), v.end(), 5)\n        - ___(v.begin(), v.end(), 5);\ncout << cnt;  // 3",
          fillBlanks: [
            { id: 0, answer: "upper_bound", options: ["upper_bound", "lower_bound", "binary_search", "count"] },
            { id: 1, answer: "lower_bound", options: ["lower_bound", "upper_bound", "binary_search", "count"] }
          ],
          explanation: "**\"one past end - start\" = count.** upper_bound points one past the last occurrence, lower_bound points to the first. Subtracting gives the number of times the value appears. 5 sits at indices 2, 3, 4 → 3 occurrences."
        },
        {
          id: "s23-ch2-lb-vs-count",
          type: "explain",
          title: "🤔 Wait — doesn't \`count()\` also count occurrences?",
          content: `Yes! \`count()\` (the standard algorithm) also counts:

\`\`\`cpp
int cnt = count(v.begin(), v.end(), 3);   // works even on unsorted data
\`\`\`

**So what's the difference?**

| | \`count()\` | \`upper - lower\` |
|---|---|---|
| Sorted required? | ❌ No | ✅ Must be sorted |
| Speed | **O(n)** — scans everything | **O(log n)** — binary search |
| Counting in 1M elements | 1,000,000 comparisons | ~20 comparisons |

**Trap:** "So I'll just sort once and use upper-lower!" → ❌. \`sort\` itself is O(n log n) — for a **single** count, plain \`count()\` is faster.

✅ **When upper-lower really shines:**
- Data is **already** sorted
- You need to count **many times** on the same data (sort once → each query is O(log n))

Common in competitive programming; in everyday code \`count()\` is more typical.

---

### ⚠️ Heads up — \`count\` appears in **two places**

In the next lesson (map) you'll see \`m.count(key)\`. Same name, **completely different function.**

| | \`count(v.begin, v.end, x)\` | \`m.count(key)\` |
|---|---|---|
| Whose function? | algorithm (external) | **member** of map / set |
| Used on | vector, plain ranges | map, set |
| Speed | O(n) — scans the range | **O(log n)** — walks the tree directly |
| Answer | how many equal to \`x\` | does the key exist (0/1 for map, real count for multiset) |

> 💡 Same name, **different functions.** vector's \`count()\` is slow, but map's \`m.count()\` is fast because map keeps a tree inside — no sort needed. We'll revisit this in the next lesson.`
        },
        {
          id: "s23-ch2-lb-vs-bs",
          type: "explain",
          title: "🆚 binary_search() vs lower_bound — when to use which?",
          content: `| | binary_search() | lower_bound() |
|---|---|---|
| Returns | true / false | position (iterator) |
| Use when | just checking existence | need position, count, or boundary |
| Code | short, intuitive | longer but more powerful |

\`\`\`cpp
// Just "is 5 there?" → binary_search
binary_search(v.begin(), v.end(), 5)  // true

// "What index is 5 at?" → lower_bound
lower_bound(v.begin(), v.end(), 5) - v.begin()  // 3
\`\`\`

---

### 🎯 USACO situations — which tool?

| Situation | Tool |
|---|---|
| "Is this user ID in the list?" | \`binary_search\` |
| "Is this member code registered?" | \`binary_search\` |
| "How many scored ≥ 70?" | \`lower_bound\` ( v.end - lower_bound ) |
| "Most expensive within budget?" | one before \`upper_bound\` |
| "Points in range [a, b]?" | \`upper_bound(b) - lower_bound(a)\` |
| "How many of X?" | \`upper - lower\` |

---

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x in v\` | \`binary_search(v.begin(), v.end(), x)\` |
| \`bisect.bisect_left(v, x)\` | \`lower_bound(v.begin(), v.end(), x) - v.begin()\` |
| \`bisect.bisect_right(v, x)\` | \`upper_bound(v.begin(), v.end(), x) - v.begin()\` |`
        },
        {
          id: "s23-ch2-quiz1",
          type: "quiz",
          title: "Binary search prerequisite!",
          content: "Given an **unsorted** vector \`v = {3, 1, 4, 1, 5}\`, what does \`binary_search(v.begin(), v.end(), 4)\` return?",
          options: [
            "true (since 4 is in the vector)",
            "false (auto-detects unsorted)",
            "**Unpredictable** — binary search only works on sorted arrays. Result is implementation-defined / undefined behavior.",
            "Compile error"
          ],
          answer: 2,
          explanation: "**`binary_search`, `lower_bound`, and `upper_bound` only work correctly on sorted arrays.** Calling them on unsorted data compiles, but the result is **undefined behavior** — could be true, false, or anything. Always `sort()` first!"
        },
        {
          id: "s23-ch2-lb3",
          type: "explain",
          title: "⚠️ Watch out — what if the value is bigger than everything?",
          content: `\`\`\`cpp
vector<int> v = {1, 3, 5, 7, 9};

lower_bound(v.begin(), v.end(), 10) - v.begin();
// → 5 (out of range, v[5] doesn't exist!)
\`\`\`

If nothing in the array is ≥ x, lower_bound returns the **\`v.end()\` position (= index \`v.size()\`)**. Reading \`v[5]\` here is reading invalid memory → crash territory.

---

**Safe usage pattern**

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), x);

if (it != v.end() && *it == x) {
    int idx = it - v.begin();
    cout << idx;       // only when x truly exists
}
\`\`\`

> 💡 \`it != v.end()\` confirms **in range**, \`*it == x\` confirms **the exact value**. Both must hold before you access it.`
        },
        {
          id: "s23-ch2-fb1",
          type: "fillblank" as const,
          title: "✋ Your turn — find the first index where value ≥ 4",
          content: "In the sorted vector, find the index of the **first spot where the value is 4 or greater**!",
          code: "vector<int> v = {1, 2, 4, 4, 6};\nauto it = ___(v.begin(), v.end(), 4);\nint idx = it - v.___;\ncout << idx;  // 2",
          fillBlanks: [
            { id: 0, answer: "lower_bound", options: ["lower_bound", "upper_bound", "find", "binary_search"] },
            { id: 1, answer: "begin()", options: ["begin()", "end()", "front()", "start()"] }
          ],
          explanation: "lower_bound hands you a finger to the 'first spot ≥ target'. Subtract v.begin() to turn it into an index.\n\nIn {1, 2, 4, 4, 6}, 4 first appears at index 2 → Answer: 2"
        },
        {
          id: "s23-ch2-practice1",
          type: "practice" as const,
          title: "✋ From scratch — check existence with binary_search",
          content: `**Problem**: An **already-sorted** vector of N ints is given, then a target value \`x\` on the next line. Print \`Yes\` if \`x\` is present, otherwise \`No\`.

\`\`\`
Input:  5
        1 3 5 7 9
        5
Output: Yes

Input:  5
        1 3 5 7 9
        4
Output: No
\`\`\`

> 💡 \`binary_search(v.begin(), v.end(), x)\` returns **true / false**. The simplest function for "does it exist?" questions.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 Use binary_search to check if x exists → print "Yes" or "No"

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    if (binary_search(v.begin(), v.end(), x)) cout << "Yes";
    else cout << "No";
    return 0;
}`,
          hint: "binary_search returns just true or false. Drop it straight into an if-condition to branch Yes / No.",
          expectedOutput: `Yes`,
          stdin: `5
1 3 5 7 9
5`,
        },
        {
          id: "s23-ch2-pred1",
          type: "predict" as const,
          title: "✋ Your turn — predict lower_bound & upper_bound output",
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
          explanation: "v   = {2, 4, 4, 6, 8}\nidx    0  1  2  3  4\n          ↑     ↑\n          lo    hi\n\nlower_bound(4) → 'first spot where value ≥ 4' = index 1\nupper_bound(4) → 'first spot after the 4s' = index 3\n\nlo - v.begin() = 1\nhi - lo        = 3 - 1 = 2  (two 4s)\n\n→ Output: 1 2"
        },
        {
          id: "s23-ch2-practice2",
          type: "practice" as const,
          title: "✋ From scratch — count occurrences (upper - lower pattern)",
          content: `**Problem**: An **already-sorted** vector of N ints is given, then a target value \`x\` on the next line. Print **how many times** \`x\` appears in the array.

\`\`\`
Input:  6
        1 3 3 3 5 7
        3
Output: 3

Input:  5
        1 2 4 6 8
        4
Output: 1

Input:  5
        1 3 5 7 9
        4
Output: 0
\`\`\`

> 💡 \`upper_bound(...) - lower_bound(...)\` — the chapter's core application pattern. The difference between the two iterators **is** the count.`,
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    // 👇 Print the count using upper_bound - lower_bound

    return 0;
}`,
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int x;
    cin >> x;
    auto lo = lower_bound(v.begin(), v.end(), x);
    auto hi = upper_bound(v.begin(), v.end(), x);
    cout << (hi - lo);
    return 0;
}`,
          hint: "auto lo = lower_bound(v.begin(), v.end(), x); auto hi = upper_bound(v.begin(), v.end(), x); cout << (hi - lo); — the iterator difference is the count. Missing → hi == lo → 0.",
          expectedOutput: `3`,
          stdin: `6
1 3 3 3 5 7
3`,
        }
      ]
    }
  ]
}
