// ============================================
// C++ Lesson 9: Arrays & Vectors
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson9EnData: LessonData = {
  id: "cpp-9",
  title: "Arrays & Vectors",
  emoji: "📚",
  description: "Python list → C++ arrays and vectors!",
  chapters: [
    // ============================================
    // Chapter 1: C-style Arrays
    // ============================================
    {
      id: "ch1",
      title: "C-style Arrays",
      emoji: "🗃️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📚 Why do we need arrays?",
          content: `In Python, you used **lists** to store multiple values, right?

\`\`\`python
scores = [90, 85, 78, 92, 88]
print(scores[0])  # 90
\`\`\`

Why do we need something like this? Imagine storing scores for 30 students. Would you create 30 separate variables? \`score1, score2, score3...\` 😱

That's exactly what arrays are for — **a row of drawers that holds the same kind of data in one place**. In C++ we call this an **array**.

\`\`\`cpp
int scores[5] = {90, 85, 78, 92, 88};
cout << scores[0];  // 90
\`\`\`

It looks similar to a Python list, but there are some **key differences**. We'll cover them on the next page.`,
          component: "cppArrayBuilder",
        },
        {
          id: "ch1-intro-diff",
          type: "explain",
          title: "🐍 vs ⚡ How is it different from a Python list?",
          content: `A C++ array is like **reserving seats ahead of time**. Just as you can't add more seats later, you can't change an array's size once it's created.

Quick comparison:

| Python 🐍 | C++ ⚡ |
|---|---|
| \`scores = [90, 85]\` | \`int scores[2] = {90, 85};\` |
| Size changes freely | **Fixed size!** |
| Can mix types | **Same type only!** |
| \`scores.append(100)\` | ❌ Can't add! |

💡 A C++ array = **fixed-size boxes of the same type**!

Looking for a flexible data structure like a Python list? C++ has one too — it's called **vector**, and you'll learn it later in this lesson. But understanding arrays first makes vectors much easier.`,
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Declare an array of three numbers!",
          code: "___ nums[___] = {10, 20, 30};",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "list", "array", "var"] },
            { id: 1, answer: "3", options: ["3", "2", "4", "[]"] }
          ],
          explanation: "We declared an int array of size 3! You must specify both the type and size."
        },
        {
          id: "ch1-access",
          type: "explain",
          title: "🔢 Accessing Array Elements",
          content: `Accessing array elements works just like Python! **Index starts at 0**.

\`\`\`cpp
int arr[4] = {10, 20, 30, 40};

cout << arr[0];  // 10 (first)
cout << arr[3];  // 40 (last)

arr[1] = 99;     // You can change values!
cout << arr[1];  // 99
\`\`\`

⚠️ **Watch out!** Going out of bounds is dangerous:
\`\`\`cpp
int arr[3] = {1, 2, 3};
cout << arr[5];  // ❌ Not an error — garbage value! (Python gives IndexError)
\`\`\`

Python gives you an IndexError when out of bounds, but C++ reads a **garbage value** without any error. This is very dangerous! Even \`arr[100]\` will run without crashing — it just reads random memory.

For example, with \`int arr[3] = {10, 20, 30};\`, reading \`arr[100]\` gives you something like \`-827361\` — a completely random number! This is called a **garbage value**.

💡 C++ arrays don't check bounds → you must be careful yourself!`
        },
        {
          id: "ch1-default-values",
          type: "interactive",
          title: "🎨 Check Default Values by Type",
          content: "When you partially initialize an array, what fills the remaining slots? It depends on the type!",
          component: "arrayInitVisualizer",
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Array access!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[4] = {5, 10, 15, 20};\n    arr[2] = 100;\n    cout << arr[0] + arr[2];\n    return 0;\n}",
          options: ["20", "105", "115", "Error"],
          answer: 1,
          explanation: "arr[2] was changed to 100! arr[0]=5, arr[2]=100 → 5 + 100 = 105!"
        },
        {
          id: "ch1-loop",
          type: "explain",
          title: "🔁 Looping Through Arrays",
          content: `Arrays and for loops are a **perfect match**!

**Python 🐍:**
\`\`\`python
scores = [90, 85, 78]
for s in scores:
    print(s)
\`\`\`

**C++ ⚡ (index-based):**
\`\`\`cpp
int scores[3] = {90, 85, 78};
for (int i = 0; i < 3; i++) {
    cout << scores[i] << " ";
}
// Output: 90 85 78
\`\`\`

It's even better to track the size in a variable:
\`\`\`cpp
int size = 3;
for (int i = 0; i < size; i++) {
    cout << scores[i] << endl;
}
\`\`\`

💡 More verbose than Python's \`for s in scores\`, but later you'll learn **range-based for** which is similar!`
        },
        {
          id: "ch1-loop-sim",
          type: "explain",
          title: "🔍 Trace: How does array traversal work?",
          content: `Watch how i changes from 0 to 2, accessing each slot with arr[i]!

**Each time i changes**, arr[i] points to a different slot!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTraceCppArrayLoop",
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "Array + Loop!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int arr[5] = {2, 4, 6, 8, 10};\n    int sum = 0;\n    for (int i = 0; i < 5; i++) {\n        sum += arr[i];\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["20", "24", "30", "Error"],
          answer: 2,
          explanation: "2 + 4 + 6 + 8 + 10 = 30! The for loop adds all array elements."
        },
        {
          id: "ch1-cin",
          type: "explain",
          title: "⌨️ Reading Input into an Array with cin",
          content: `Instead of hardcoding values, you can let the user **type them in**!

**for loop + cin:**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int scores[5];

    cout << "Enter 5 scores:" << endl;
    for (int i = 0; i < 5; i++) {
        cin >> scores[i];  // Fill each slot one by one
    }

    cout << "First score: " << scores[0] << endl;
    return 0;
}
\`\`\`

Compared to Python:

\`\`\`python
scores = []
for i in range(5):
    scores.append(int(input()))
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`int(input())\` | \`cin >> scores[i]\` |
| Append to list | Store directly in slot |
| Size grows automatically | Array size pre-declared |

💡 In C++, declare the array size first, then fill each slot with for + cin!`,
        },
        {
          id: "ch1-fb-cin",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Read 3 values into an array using cin!",
          code: "int arr[3];\nfor (int i = 0; i < ___; i++) {\n    ___ >> arr[i];\n}",
          fillBlanks: [
            { id: 0, answer: "3", options: ["3", "5", "i", "0"] },
            { id: 1, answer: "cin", options: ["cin", "cout", "input", "scanf"] }
          ],
          explanation: "Loop 3 times (the array size), and use cin to put a value into each slot!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Calculate Average with Arrays!",
          content: `Read 5 scores from input, then calculate and print the total and average.

Input: 5 integers, one per line
Output: Total and average (with decimal)`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5];
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        cin >> scores[i];
    }

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }

    cout << sum << endl;
    cout << (double)sum / 5 << endl;

    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int scores[5];
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        cin >> ___;
    }

    for (int i = 0; i < 5; i++) {
        sum += ___;
    }

    cout << sum << endl;
    cout << ___ << endl;

    return 0;
}`,
          stdin: `90\n85\n78\n92\n88`,
          expectedOutput: `433
86.6`
        },
        {
          id: "ch1-practice2",
          type: "practice" as const,
          title: "✋ Find the Maximum in an Array!",
          content: `Read 5 scores from input and print the highest one.

Input: 5 integers, one per line
Output: The highest score`,
          code: `#include <iostream>
using namespace std;

int main() {
    int scores[5];

    for (int i = 0; i < 5; i++) {
        cin >> scores[i];
    }

    int maxScore = scores[0];
    for (int i = 1; i < 5; i++) {
        if (scores[i] > maxScore) {
            maxScore = scores[i];
        }
    }

    cout << maxScore << endl;
    return 0;
}`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int scores[5];

    for (int i = 0; i < 5; i++) {
        cin >> ___;
    }

    int maxScore = scores[0];
    for (int i = 1; i < 5; i++) {
        if (___) {
            maxScore = ___;
        }
    }

    cout << maxScore << endl;
    return 0;
}`,
          hint: "Start with int maxScore = scores[0]; then loop from i = 1. If scores[i] > maxScore, update maxScore = scores[i]",
          stdin: `85\n92\n78\n96\n88`,
          expectedOutput: `96`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Array basics!",
          content: "Which statement about C++ arrays is **FALSE**?",
          options: [
            "Size must be set at declaration",
            "Index starts from 0",
            "You can increase the size later",
            "Only stores values of the same type"
          ],
          answer: 2,
          explanation: "C-style arrays have a fixed size! To resize, you need to use vector."
        },
        {
          id: "ch1-q2",
          type: "fillblank" as const,
          title: "Reading into an array with cin!",
          code: "int arr[3];\nfor (int i = 0; i < 3; i++) {\n    ___ >> arr[i];\n}",
          fillBlanks: [
            { id: 0, answer: "cin", options: ["cout", "cin", "input", "scanf"] }
          ],
          explanation: "cin reads user input into arr[i]! cout is for output, cin is for input."
        }
      ]
    },
    // ============================================
    // Chapter 2: vector
    // ============================================
    {
      id: "ch2",
      title: "vector — Like Python Lists!",
      emoji: "📦",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📦 vector = Resizable Array!",
          component: "cppVectorBuilder",
          content: `Arrays have a fixed size which is inconvenient, right? **vector** is like Python lists — the size is flexible!

\`\`\`cpp
#include <vector>  // ← Required!

vector<int> nums = {1, 2, 3};
nums.push_back(4);  // [1, 2, 3, 4] — Added to end!
\`\`\`

Comparison with Python:

| Python 🐍 | C++ vector ⚡ |
|---|---|
| \`nums = [1, 2, 3]\` | \`vector<int> nums = {1, 2, 3};\` |
| \`nums.append(4)\` | \`nums.push_back(4);\` |
| \`len(nums)\` | \`nums.size()\` |
| \`nums[0]\` | \`nums[0]\` (same!) |

⚠️ You must add \`#include <vector>\`!

A header is how you load extra features in C++. To use vector, you need the <vector> header.

💡 A vector is an **automatically resizing array**. In practice, vectors are used much more than arrays!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Set up a vector of names!",
          code: "#include <___>\n\nvector<___> names = {\"Alice\", \"Bob\"};",
          fillBlanks: [
            { id: 0, answer: "vector", options: ["vector", "array", "list", "iostream"] },
            { id: 1, answer: "string", options: ["string", "char", "text", "str"] }
          ],
          explanation: "You need #include <vector> to use vectors, and a string vector is vector<string>!"
        },
        {
          id: "ch2-init",
          type: "explain",
          title: "🔧 Creating a vector with size (and value)",
          content: `Besides declaring with explicit values, you can create a vector by specifying a **size** (and optionally an initial value).

### ① Size + initial value

\`\`\`cpp
vector<int> v(5, 0);    // 5 zeros: {0, 0, 0, 0, 0}
vector<int> v(3, 10);   // 3 tens: {10, 10, 10}
\`\`\`

### ② Size only (no initial value)

\`\`\`cpp
vector<int> v(5);       // {0, 0, 0, 0, 0}  — int auto-initialized to 0
vector<string> s(3);    // {"", "", ""}      — string defaults to empty
vector<double> d(4);    // {0.0, 0.0, 0.0, 0.0}
\`\`\`

When you omit the initial value, elements are **auto-initialized to the type's default**. So **no garbage values**.

### ⚠️ This is different from raw arrays

\`\`\`cpp
int arr[5];             // Garbage values! (not initialized)
vector<int> v(5);       // {0, 0, 0, 0, 0} ✅
\`\`\`

Raw arrays (\`int arr[5]\`) leave garbage unless you explicitly initialize, but **vector fills in defaults for you**. That's a nice safety feature.

---

Same idea as Python:

\`\`\`python
v = [0] * 5   # Python
\`\`\`
\`\`\`cpp
vector<int> v(5, 0);  // C++, same idea!
vector<int> v(5);     // Same result (int default = 0)
\`\`\`

@key: When algorithm problems say "initialize n elements to 0," just \`vector<int> v(n);\` — one line and done!`,
        },
        {
          id: "ch2-fb-init",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Create a vector of 4 integers all initialized to -1!",
          code: "vector<int> v(___, ___);",
          fillBlanks: [
            { id: 0, answer: "4", options: ["4", "3", "5", "-1"] },
            { id: 1, answer: "-1", options: ["-1", "0", "1", "4"] }
          ],
          explanation: "vector<int> v(4, -1) creates a vector with 4 elements all set to -1! v = {-1, -1, -1, -1}"
        },
        {
          id: "ch2-methods-add",
          type: "explain",
          title: "🛠️ vector — Add / remove at the end",
          content: `Let's walk through vector's main methods one by one. All examples use \`vector<int> v = {10, 20, 30};\`.

## ① push_back(value) — Add to the end

\`\`\`cpp
v.push_back(40);
// Python: v.append(40)
// v = {10, 20, 30, 40}
\`\`\`

## ② pop_back() — Remove the last element

\`\`\`cpp
v.pop_back();
// Python: v.pop()
// v = {10, 20, 30}
\`\`\`

Adding and removing at the end is by far the most common operation, which is why Python's \`append\`/\`pop\` map cleanly onto these.

**Next page**: inserting and erasing in the **middle** — \`insert\`/\`erase\`.`
        },
        {
          id: "ch2-methods-middle",
          type: "explain",
          title: "➕ vector — Insert / erase in the middle",
          content: `You can also modify the **middle** of a vector. The position is given as an **iterator** (we'll explain this soon).

\`\`\`cpp
// v = {10, 20, 30}
v.insert(v.begin() + 1, 99);  // Insert 99 at position 1 → {10, 99, 20, 30}
v.erase(v.begin() + 2);       // Erase position 2 → {10, 99, 30}
// Python: v.insert(1, 99) / del v[2]
\`\`\`

💡 For now, just read \`v.begin() + 1\` as **"position 1"**. Why it's written this way comes up in the \`begin()/end()\` page later.

🐍 **Different from Python** — Python lets you write \`v.insert(1, 99)\` with a plain **index number**. But **C++ vector doesn't allow that.** You must pass an **iterator (position)** like \`v.begin() + 1\`.

\`\`\`cpp
v.insert(1, 99);             // ❌ compile error
v.insert(v.begin() + 1, 99); // ✅ correct form
\`\`\`

{expand:🤔 But what's v.begin()? Why so complicated?}
C++ has many containers besides vector — \`list\` (linked list — not Python's list!), \`set\` (unique elements), \`map\` (key-value dictionary), and more. Among these, \`list\`/\`set\`/\`map\` have **no concept of numeric index at all.** "The third element" isn't meaningful — you can't just pull it out.

So C++ designed a **common "position notation" that works across every container** — that's the iterator. Learn \`insert\` once, and you can use it on **vector/list/set/map** all the same.

In other words, it's not "inconvenient because you can't use indices" — the real reason is **"one shared language for every container."** (More on positions in the next \`begin()/end()\` page.)
{/expand}

⚠️ Inserting or erasing in the middle forces **every element after it to shift by one**, which is O(n). Fine occasionally, but a performance trap inside loops.`
        },
        {
          id: "ch2-fb-insert",
          type: "fillblank" as const,
          title: "Fill in the insert call",
          content: "Currently \`v = {10, 20, 30}\`.\n\nTo insert \`99\` at **position 1** so v becomes \`{10, 99, 20, 30}\`, how should you write it?",
          code: "v.insert(v.begin() + ___, ___);",
          fillBlanks: [
            { id: 0, answer: "1", options: ["1", "0", "2", "3"] },
            { id: 1, answer: "99", options: ["99", "20", "10", "1"] }
          ],
          explanation: "v.insert(v.begin() + 1, 99) inserts 99 at position 1. The 20 that was there (and everything after) shifts one position back. Result: {10, 99, 20, 30}"
        },
        {
          id: "ch2-methods-access",
          type: "explain",
          title: "🔍 vector — Element access / size",
          content: `Next up: **size and element access**. (Still using \`v = {10, 20, 30}\`.)

## ④ size() — Element count

\`\`\`cpp
cout << v.size();   // 3
// Python: len(v)
\`\`\`

## ⑤ v[i] vs v.at(i) — Accessing elements

\`\`\`cpp
cout << v[0];      // 10  ← fast, no bounds check
cout << v.at(0);   // 10  ← with bounds check (safer)
\`\`\`

What happens out of bounds?

\`\`\`cpp
// v = {10, 20, 30}  (size 3)

cout << v[10];      // ❌ No error — prints a garbage value! (like -827361)
cout << v.at(10);   // ✅ Throws an "out_of_range" exception
\`\`\`

@key: Python raises IndexError, but C++'s \`v[i]\` returns garbage silently. Use \`v.at(i)\` to get Python-like bounds checking.

## ⑥ front() / back() — First / last element

\`\`\`cpp
cout << v.front();  // 10
cout << v.back();   // 30
// Python: v[0] / v[-1]
\`\`\`

💡 You don't have to use these. \`v[0]\` and \`v[v.size()-1]\` work the same. \`front()/back()\` is nice when you want to emphasize "first/last" for readability.`
        },
        {
          id: "ch2-methods-state",
          type: "explain",
          title: "🧹 vector — Check state / clear",
          content: `Finally, **state check and clearing** methods.

## ⑦ empty() — Check if empty

\`\`\`cpp
if (v.empty()) cout << "Empty!";
// Python: if not v:
\`\`\`

## ⑧ clear() — Remove everything

\`\`\`cpp
v.clear();
// v = {}  (empty vector)
// Python: v.clear()  ← same!
\`\`\`

💡 Search and sort functions like **find** and **sort** live in the \`#include <algorithm>\` header. Coming up right after!`
        },
        {
          id: "ch2-begin-end",
          type: "explain",
          title: "🧭 begin() / end() — Positions, not values",
          content: `You saw \`v.begin()\` in \`insert(v.begin() + 1, ...)\`, and you're about to see \`sort(v.begin(), v.end())\` — let's tackle both together.

![begin and end point to positions, not values](/images/cpp/vector-begin-end.svg)

- \`v.begin()\` → **position of the first element** (the \`v[0]\` slot)
- \`v.end()\` → **position just past the last element** (no element there!)

Why does \`end()\` point to "one past the last"? It's a convention. Writing ranges as **[begin, end)** makes **element count = v.end() - v.begin()** come out clean, and an empty vector naturally has \`v.begin() == v.end()\`.

@key: Pair them up and you get "the full range of the vector." That's why \`sort(v.begin(), v.end())\` means "sort the whole vector."`
        },
        {
          id: "ch2-begin-end-arith",
          type: "explain",
          title: "➕ Arithmetic on positions",
          content: `So how do you point to a **"middle slot"**?

Positions support **± like indices**:

\`\`\`cpp
v.begin()        // first element
v.begin() + 2    // 3rd element (0-indexed, 2 steps forward)
v.end() - 1      // last element
v.end()          // end marker
\`\`\`

So \`insert(v.begin() + 1, 99)\` means **"insert 99 at position 1"**.

💡 Quick rule: \`begin() + i\` = "slot i".`
        },
        {
          id: "ch2-array-arith",
          type: "explain",
          title: "📍 Why arr / arr+n works for arrays",
          content: `Arrays are an older, more **bare-bones** style than vector. There's no friendly \`v.begin()\` method. Instead, **the array name itself means "the position of the first element."**

![The array name is the first-element position, arr+n is n slots later](/images/cpp/array-arr-n.svg)

- \`arr\` → position of the first element (plays the role of \`v.begin()\`)
- \`arr + 5\` → five slots later = **end marker** (role of \`v.end()\`)

{expand:🤔 How does this actually work? (It's about addresses)}
Arrays live in memory as **contiguous slots**. Say \`int arr[5]\` starts at address 1000:

\`\`\`
arr     →  address 1000  → 10
arr + 1 →  address 1004  → 20    (int is 4 bytes, so +4)
arr + 2 →  address 1008  → 30
arr + 3 →  address 1012  → 40
arr + 4 →  address 1016  → 50
arr + 5 →  address 1020  → (past the last, no element)
\`\`\`

- Using \`arr\` in an expression auto-converts to **"address of the first element"**.
- \`arr + 1\` is **not** \`1001\` — it's \`1000 + sizeof(int)\`. C++ scales the offset by the element's size for you.
- So \`arr + 5\` gives "the address five slots later" = the \`end()\` role.

For now, just **feel it as an address-based trick**. Real pointer arithmetic is covered properly in **cpp-13 (Pointer Basics)**.
{/expand}

So these two calls are **"the same thing written differently":**

\`\`\`cpp
vector<int> v = {5, 2, 8};
sort(v.begin(), v.end());     // vector style

int arr[3] = {5, 2, 8};
sort(arr, arr + 3);           // array style — same (start, end) pair
\`\`\`

@key: STL functions always take a **(start, end marker)** pair. Use \`v.begin()/v.end()\` for vectors and \`arr/arr+n\` for arrays.`
        },
        {
          id: "ch2-sort",
          type: "explain",
          title: "📊 Basic Sort — sort()",
          content: `**sort()** is the sorting function from \`<algorithm>\`. It takes the **[start, end)** range pair you just learned.

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>  // required for sort
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end());  // ascending sort
    for (int x : v) cout << x << " ";  // 1 2 3 5 8 9
}
\`\`\`

**Usage**:
- \`sort(v.begin(), v.end())\` — whole vector ascending
- \`sort(arr, arr + n)\` — array (indices 0 to n-1) ascending
- \`sort(v.begin() + 2, v.end())\` — from index 2 to the end

💡 String vectors work the same (lexicographic ascending):
\`\`\`cpp
vector<string> names = {"bob", "alice", "carol"};
sort(names.begin(), names.end());  // alice, bob, carol
\`\`\`

💡 **Descending order**, **sorting structs**, and the internals of sorting algorithms are covered in **cpp-23 (Sort Master)**. Here you just need "how to use it."`
        },
        {
          id: "ch2-pred-sort",
          type: "predict" as const,
          title: "Predict the sort result!",
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end());
    for (int x : v) cout << x << " ";
    return 0;
}`,
          options: ["1 2 5 8 9 ", "5 2 8 1 9 ", "9 8 5 2 1 ", "Error"],
          answer: 0,
          explanation: "sort(v.begin(), v.end()) sorts ascending. {5,2,8,1,9} → {1,2,5,8,9}. Each element is printed with a trailing space, so you get '1 2 5 8 9 '."
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Vector operations!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3};\n    v.push_back(4);\n    v.push_back(5);\n    v.pop_back();\n    cout << v.size();\n    return 0;\n}",
          options: ["3", "4", "5", "Error"],
          answer: 1,
          explanation: "{1,2,3} → push_back(4) → {1,2,3,4} → push_back(5) → {1,2,3,4,5} → pop_back() → {1,2,3,4}. Size is 4!"
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔁 Looping Through a vector",
          content: `You can loop through a vector with a **for loop**, just like an array!

\`\`\`cpp
vector<int> v = {10, 20, 30, 40};

for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}
// Output: 10 20 30 40
\`\`\`

The structure is nearly **identical to array traversal**! The only difference:
- Array: \`i < size\` (hardcode the number)
- vector: \`i < v.size()\` (automatically calculated)

\`\`\`cpp
// Calculate sum
int sum = 0;
for (int i = 0; i < v.size(); i++) {
    sum += v[i];
}
cout << sum;  // 100
\`\`\`

💡 A cleaner way to loop — **range-based for** — is coming in the next lesson (cpp-10)!`,
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "vector loop!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {3, 1, 4, 1, 5};\n    v.push_back(9);\n    int sum = 0;\n    for (int i = 0; i < v.size(); i++) {\n        sum += v[i];\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["14", "23", "24", "Error"],
          answer: 1,
          explanation: "After push_back(9), v = {3,1,4,1,5,9}. Sum: 3+1+4+1+5+9 = 23!"
        },
        {
          id: "ch2-pred3",
          type: "predict" as const,
          title: "front / back / empty!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30};\n    cout << v.front() << \" \" << v.back() << endl;\n    v.clear();\n    cout << v.empty();\n    return 0;\n}",
          options: ["10 30\n0", "10 30\n1", "20 30\n1", "Error"],
          answer: 1,
          explanation: "front()=10, back()=30 is printed, then after clear(), empty()=1 (true)!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "📊 Array vs vector — Basic rule",
          content: `When should you use which? Here's a side-by-side.

| | Array | vector |
|---|---|---|
| Size | Fixed at declaration | Flexible |
| Declaration | \`int arr[5];\` | \`vector<int> v;\` |
| Add | ❌ Not possible | \`v.push_back(x)\` |
| Remove | ❌ Not possible | \`v.pop_back()\` |
| Size check | Track manually | \`.size()\` |
| Safety | No bounds check | \`.at()\` available |
| Header | None | \`#include <vector>\` |

**Basic rule:**
- Size might change → **vector**
- Not sure? → **vector** (way more convenient and safer)

"Then is there any reason to use a plain array?" — Yes, two of them. **Next page.**`
        },
        {
          id: "ch2-array-when",
          type: "explain",
          title: "🤔 So when do you use a plain array?",
          content: `Two cases come up often.

**① When the size is truly fixed from the start**

For example, a week always has 7 days. A die has 6 faces. A year has 12 months. These don't grow or shrink.

\`\`\`cpp
int daysInMonth[12];   // ✅ natural (months 1-12)
int diceCount[6];      // ✅ count of each die face
\`\`\`

For these **never-changing counts**, an array is shorter and cleaner than a vector. (2D arrays, which you'll meet in cpp-21, shine in fixed-size grid cases like an 8×8 chess board.)

**② Competitive programming (CP), where speed and brevity matter**

USACO/Codeforces-style problems often look like this:

\`\`\`cpp
int arr[1000001];   // pre-allocate up to 1M slots globally
\`\`\`

- Shorter to type
- Global arrays are auto-initialized to 0
- Size won't change, so no need for \`push_back\`

The actual speed difference is usually small, but CP code tends to favor **short, familiar patterns** as a convention.

💡 Summary: **Regular programs → vector.** **Fixed size or CP code → array.** Being able to read both serves you well in real projects **and** problem solving.`
        },
        {
          id: "ch2-fb2",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Add a number and check the size!",
          code: "vector<int> v = {5, 10};\nv.___(15);\ncout << v.___();",
          fillBlanks: [
            { id: 0, answer: "push_back", options: ["push_back", "append", "add", "insert"] },
            { id: 1, answer: "size", options: ["size", "length", "len", "count"] }
          ],
          explanation: "push_back() adds to the end and size() returns the count! Like Python's append() and len()."
        },
        {
          id: "ch2-cin",
          type: "explain",
          title: "⌨️ Reading cin into an empty vector",
          content: `With a vector, you don't need to pre-declare the size — just **push_back as input comes in**!

**Method 1: Read the count first**

\`\`\`cpp
int n;
cin >> n;  // how many to read

vector<int> nums;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    nums.push_back(x);
}
\`\`\`

**Method 2: Stop when a sentinel value (e.g., 0) is entered**

\`\`\`cpp
vector<int> nums;
int x;
while (cin >> x && x != 0) {
    nums.push_back(x);
}
// Stops on 0
\`\`\`

Both examples start with \`vector<int> nums;\` (an empty vector) and fill it in.

But what if the vector was **created with a preset size**? Can we still use push_back then? Let's see on the **next page**.`,
        },
        {
          id: "ch2-cin-sized",
          type: "explain",
          title: "⚠️ cin into a pre-sized vector?",
          content: `When you create a vector like **\`vector<int> v(n);\`** or **\`vector<int> v(5, 0);\`**, it **already has elements inside.** Calling push_back on top of that **appends** more elements and grows the size.

\`\`\`cpp
vector<int> v(5, 0);   // {0, 0, 0, 0, 0}  size 5
v.push_back(7);        // {0, 0, 0, 0, 0, 7}  size 6 — probably not what you wanted! ❌
\`\`\`

If you pre-sized the vector, use **\`cin >> v[i]\`** to overwrite each slot:

\`\`\`cpp
int n;
cin >> n;
vector<int> v(n);                    // size n, all zeros
for (int i = 0; i < n; i++) {
    cin >> v[i];                     // ← not push_back, direct assignment!
}
\`\`\`

**Summary:**

| Vector declaration | Input pattern |
|---|---|
| \`vector<int> v;\` (empty) | \`v.push_back(x)\` |
| \`vector<int> v(n);\` (pre-sized) | \`cin >> v[i]\` |

@key: Empty vector → push_back. Pre-sized vector → index access \`v[i]\`. Mixing the two messes up the size!`,
        },
        {
          id: "ch2-fb-cin",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Read a value with cin and add it to a vector!",
          code: "vector<int> v;\nint x;\ncin >> x;\nv.___(x);",
          fillBlanks: [
            { id: 0, answer: "push_back", options: ["push_back", "append", "add", "insert"] }
          ],
          explanation: "Read with cin, then push_back to add to the vector!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Manage Numbers with vector!",
          content: `Get numbers from the user, store them in a vector, and print them all!

Enter 0 to stop input and show results.`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    int input;

    while (true) {
        cin >> input;
        if (input == 0) break;
        nums.push_back(input);
    }

    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    cout << nums.size() << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    int input;

    // Store numbers until 0 is entered

    // Print all numbers (space-separated)
    cout << endl;
    // Print the count
    cout << nums.size() << endl;

    return 0;
}`,
          hint: "while(true) { cin >> input; if(input == 0) break; nums.push_back(input); } to collect. Then for(int i = 0; i < nums.size(); i++) { cout << nums[i] << \" \"; } to print",
          stdin: `5\n3\n8\n2\n0`,
          expectedOutput: `5 3 8 2
4`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Vector methods!",
          content: "What's the C++ equivalent of Python's `nums.append(10)`?",
          options: [
            "nums.add(10)",
            "nums.push_back(10)",
            "nums.insert(10)",
            "nums.append(10)"
          ],
          answer: 1,
          explanation: "In C++ vectors, the method to add to the end is push_back()!"
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "vector + cin!",
          content: `What's the correct way to read input into a vector with cin?`,
          options: [
            "vector<int> v;\ncin >> v;",
            "vector<int> v;\nint x;\ncin >> x;\nv.push_back(x);",
            "vector<int> v[5];\ncin >> v[0];",
            "vector<int> v;\nv.cin(x);"
          ],
          answer: 1,
          explanation: "Read into a variable with cin, then add it to the vector with push_back!"
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
          title: "Array declaration!",
          content: "Which correctly declares an array of 5 integers?",
          options: [
            "int arr = [5];",
            "int arr[5];",
            "array<int> arr(5);",
            "int[] arr = new int[5];"
          ],
          answer: 1,
          explanation: "C-style arrays use int arr[5]; syntax!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "vector vs array!",
          content: "When should you use vector instead of an array?",
          options: [
            "When the size is exactly known",
            "When you need to add/remove elements",
            "When you don't want to use #include",
            "When speed is the top priority"
          ],
          answer: 1,
          explanation: "Use vector when the size needs to change! It supports adding and removing freely."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Code output!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {1, 2, 3};
v.push_back(4);
cout << v[2] << " " << v.size();
\`\`\``,
          options: ["3 3", "3 4", "4 4", "2 4"],
          answer: 1,
          explanation: "After push_back(4), v = {1,2,3,4}. v[2]=3, size()=4 → \"3 4\"!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Safe access!",
          content: "How do you **safely check bounds** when accessing array or vector elements?",
          options: [
            "Use arr[i]",
            "Use v.at(i)",
            "Use v.get(i)",
            "Use v.safe(i)"
          ],
          answer: 1,
          explanation: "v.at(i) throws an exception if out of bounds! Safer than v[i]."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **C-style arrays** — \`int arr[5]\`, fixed size, same type only
- ✅ **Array access** — \`arr[0]\`, index from 0, no bounds checking
- ✅ **Loop traversal** — \`for (int i = 0; i < size; i++)\`
- ✅ **vector** — \`vector<int> v\`, flexible size, \`#include <vector>\` required
- ✅ **vector methods** — push_back, pop_back, size, at, clear

🚀 **Next up: Range-for & auto** — Iterate with \`for(auto x : vec)\` more easily!`
        }
      ]
    }
  ]
}
