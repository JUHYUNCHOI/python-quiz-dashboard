// ============================================
// C++ Lesson 10: Range-for & auto
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson10EnData: LessonData = {
  id: "cpp-10",
  title: "Range-for & auto",
  emoji: "🔄",
  description: "Iterate easily with for(auto x : vec)!",
  chapters: [
    // ============================================
    // Chapter 1: Range-based for
    // ============================================
    {
      id: "ch1",
      title: "Range-based for",
      emoji: "🔁",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔁 Range-for: Python-style Loops in C++!",
          component: "cppRangeForBuilder",
          content: `Last time we learned index-based loops like \`for (int i = 0; i < size; i++)\`. Writing that every time is error-prone. There's a simpler way!

\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}
\`\`\`

Wasn't the index variable \`i\` kind of annoying? We want to access values directly, like in Python!

**Python 🐍:**
\`\`\`python
nums = [10, 20, 30]
for x in nums:
    print(x)
\`\`\`

**C++ ⚡ (range-based for):**
\`\`\`cpp
vector<int> nums = {10, 20, 30};
for (int x : nums) {
    cout << x << " ";
}
\`\`\`

\`for (type variable : container)\` — almost the same as Python's \`for x in list:\`!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`for x in nums:\` | \`for (int x : nums) {\` |
| No type needed | Type required |
| Colon : | Colon : (same!) |

Works with both arrays and vectors:
\`\`\`cpp
int arr[3] = {1, 2, 3};
for (int x : arr) {     // Arrays work too!
    cout << x << " ";
}
\`\`\`

💡 Range-based for is super convenient when you don't need the index!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Loop through the vector, Python style!",
          code: "vector<int> v = {10, 20, 30};\nfor (___ x ___ v) {\n    cout << x << \" \";\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "auto", "let"] },
            { id: 1, answer: ":", options: [":", "in", "of", "<<"] }
          ],
          explanation: "Range-for syntax: for (type variable : container). The colon (:) is like Python's 'in'!"
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Range-for output!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    int sum = 0;\n    for (int x : v) {\n        sum += x;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["10", "15", "12", "Error"],
          answer: 1,
          explanation: "1 + 2 + 3 + 4 + 5 = 15! Range-for visits every element, just like Python's for-in."
        },
        {
          id: "ch1-ref",
          type: "explain",
          title: "🔗 Modifying Elements — The Secret of Copies",
          content: `There's a hidden secret in \`for (int x : v)\` — no matter how much you modify x, **the original doesn't change**.

\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    x = x * 10;   // only the copy changes
}
// nums is still {1, 2, 3} 😱
\`\`\`

**Add & (one character)** and x directly references the original:

\`\`\`cpp
for (int& x : nums) {   // add &!
    x = x * 10;   // original changes!
}
// nums is now {10, 20, 30} ✅
\`\`\`

& = "not a copy, but the original itself." If you copy a photo and give it away, edits to the copy don't affect your original. But if you **share the original file**, changes show up on both sides. That's exactly what & does!

And since & skips copying, it's also **faster**. The bigger the data, the bigger the difference.`,
        },
        {
          id: "ch1-ref-anim",
          type: "interactive",
          title: "🎬 Copy vs Reference (&) — See the Difference!",
          content: "Press the run button to see how the result differs with and without &!",
          component: "rangeForVisualizer",
        },
        {
          id: "ch1-ref-fb",
          type: "fillblank" as const,
          title: "Modify elements with a reference!",
          content: "Complete the code to add 1 to every element in the vector!",
          code: "vector<int> v = {1, 2, 3};\nfor (int___ x : v) {\n    x += 1;\n}\n// v is now {2, 3, 4}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "%", ""] }
          ],
          explanation: "You need int& x (reference) to modify the original elements! Without &, only the copy changes."
        },
        {
          id: "ch1-ref-pred",
          type: "predict" as const,
          title: "Modify with reference, then print!",
          code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30};
    for (int& x : v) {
        x = x / 10;
    }
    for (int x : v) {
        cout << x << " ";
    }
    return 0;
}`,
          options: ["10 20 30 ", "1 2 3 ", "0 2 3 ", "Error"],
          answer: 1,
          explanation: "int& x modifies the originals: {1, 2, 3}. Second loop prints them!"
        },
        {
          id: "ch1-const-ref",
          type: "explain",
          title: "🔒 Lock the Reference — const int&",
          content: `& is fast, but you might accidentally modify the original. If you only want to **read** without risk of changing it, add \`const\`.

Remember const from Lesson 3? It was for values like PI that must never change:

\`\`\`cpp
const double PI = 3.14159;
PI = 0;  // ❌ Error! Can't change it
\`\`\`

You can use the same \`const\` in range-for:

\`\`\`cpp
for (const int& x : v) {
    cout << x;  // ✅ Reading is fine
    x = 0;      // ❌ Compile error! Accidental edits prevented
}
\`\`\`

**& = fast (no copy)** + **const = no modification** — both benefits combined.

That's why real C++ code uses these patterns:

| Pattern | When to use |
|---|---|
| \`for (int& x : v)\` | When you need to **modify** |
| \`for (const int& x : v)\` | **Read-only** 👈 used most! |
| \`for (int x : v)\` | Rarely used |

💡 **Bottom line: Real C++ developers almost always use &!**
- Need to modify → \`int& x\`
- Read only → \`const int& x\``,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Sum with Range-for!",
          content: `Sum all elements of \`nums\` into \`sum\` and print it.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    // 👇 Use range-for to accumulate into sum


    cout << sum;
    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {4, 8, 15, 16, 23, 42};
    int sum = 0;

    for (const int& x : nums) {
        sum += x;
    }

    cout << sum;
    return 0;
}`,
          hint: "for (const int& x : nums) { sum += x; } — const int& reads without copying. Take each value into x and accumulate sum += x!",
          expectedOutput: `108`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Range-for basics!",
          content: "To **modify** elements in a range-for loop, what must you add?",
          options: [
            "* before the variable",
            "& after the type",
            "mut keyword",
            "Nothing special needed"
          ],
          answer: 1,
          explanation: "Use & (reference) like for(int& x : vec) to modify the original elements! Without &, you only get a copy."
        }
      ]
    },
    // ============================================
    // Chapter 2: auto keyword
    // ============================================
    {
      id: "ch2",
      title: "auto — Let the Compiler Decide!",
      emoji: "🤖",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🤖 auto: Type Deduction",
          content: `In Python, you never write types — the language figures them out:

\`\`\`python
x = 42        # int
name = "Hi"   # str
pi = 3.14     # float
\`\`\`

C++ has something similar — the **auto** keyword!

\`\`\`cpp
auto x = 42;        // compiler knows it's int
auto name = "Hi"s;  // compiler knows it's string
auto pi = 3.14;     // compiler knows it's double
\`\`\`

> 💡 **Memorize this one line**: \`auto x = value;\` means **x has the same type as that value**. The compiler looks at the right side and decides.

The compiler **deduces the type** from the value you assign. You don't have to spell it out!

| Python 🐍 | C++ with auto ⚡ |
|---|---|
| \`x = 42\` | \`auto x = 42;\` |
| \`pi = 3.14\` | \`auto pi = 3.14;\` |
| Always dynamic | Still **statically typed**! |

⚠️ Important: auto still makes a **fixed type** — once assigned, it can't change!
\`\`\`cpp
auto x = 42;   // x is int
x = 3.14;      // x is still int! 3.14 becomes 3
// x = "hello"; // ❌ Error! Can't change type!
\`\`\`

Think of auto as a "one-time binding contract." When you write \`auto x = 5;\`, x becomes int **forever**. You can't put a string in it later like you would in Python!

💡 auto doesn't mean "no type" — it means "the compiler writes the type for you!" It's not as free as Python.`
        },
        {
          id: "ch2-auto-anim",
          type: "interactive",
          title: "🤖 Watching auto Infer Types",
          content: "Press ▶ to see which type the compiler picks for each value!",
          component: "autoTypeVisualizer",
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "What type does auto deduce?",
          content: "Fill in the type each variable is deduced to.",
          code: "auto price = 9.99;     // → ___\nauto count = 5;        // → ___\nauto pass  = true;     // → ___",
          fillBlanks: [
            { id: 0, answer: "double", options: ["double", "int", "float", "string"] },
            { id: 1, answer: "int", options: ["int", "double", "long", "char"] },
            { id: 2, answer: "bool", options: ["bool", "int", "string", "true"] }
          ],
          explanation: "9.99 has a decimal → double. 5 is a whole number → int. true is true/false → bool. auto looks at the right-hand value and takes its type."
        },
        {
          id: "ch2-combo",
          type: "explain",
          title: "🔥 auto + range-for combo!",
          content: `range-for with auto is clean and handy.

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int x : nums) ...    // explicit type
for (auto x : nums) ...   // auto — compiler infers int
\`\`\`

**Bigger win when the type is longer** — cpp-21's 2D vector:

\`\`\`cpp
vector<vector<int>> grid;
for (vector<int> row : grid)   // long
for (auto row : grid)           // clean
\`\`\`

> ⚠️ But while \`auto\` works in the loop variable, **\`auto v = {1, 2, 3}\` is NOT a vector — it's a different type.** Full pitfalls on the next page.`
        },
        {
          id: "ch2-auto-tradeoff",
          type: "explain",
          title: "⚖️ auto — Convenient, but Watch Out",
          content: `Three patterns to remember:

| Pattern | When |
|---|---|
| \`for (auto x : v)\` | Read-only, small values |
| \`for (auto& x : v)\` | **Modifying** elements |
| \`for (const auto& x : v)\` | Read + large data (efficient) |

💡 Most devs default to \`const auto&\` — safe and no copy.

---

### 😓 auto pitfalls

**Top 3** common ones:

| ⭐ | Pitfall | Example |
|---|---|---|
| 1 | Copies big data | \`auto copy = big;\` → \`auto& ref = big;\` |
| 2 | int division (\`5/2 = 2\`) | \`auto x = 5/2;\` → \`auto x = 5.0/2;\` |
| 3 | No initializer = error | \`auto x;\` ❌ |

> 🔑 \`auto\` doesn't pick up references automatically. \`int& r = x; auto a = r;\` makes \`a\` an int (copy). For references use \`auto&\`.

Occasional:

| Pitfall | One-liner |
|---|---|
| \`auto greeting = "hello"\` | NOT \`string\` — it's \`const char*\`. \`+=\` won't work |
| \`auto v = {1, 2, 3}\` | NOT a vector — \`initializer_list\`. No push_back |
| \`auto x = calculate()\` | Type is hidden — readability ↓ |

---

### 📏 Summary

| Situation | Recommendation |
|---|---|
| Short types (\`int\`, \`double\`, \`vector<int>\`) | Write explicitly |
| Long types (\`vector<vector<int>>\` etc.) | \`auto\` |
| range-for reading | \`auto\` or explicit |
| range-for modifying | \`auto&\` |

{collapse:📦 Bonus — number literal differences}
\`\`\`cpp
auto a = 5;       // int (~2.1 billion)
auto b = 5L;      // long
auto c = 5LL;     // long long (large)
auto d = 5.0;     // double
auto e = 5.0f;    // float
\`\`\`
For large numbers (USACO etc.), \`int\` overflows >2.1B. Use \`auto x = 5LL;\` explicitly.`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "auto type deduction!",
          code: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30};\n    auto sum = 0;\n    for (auto& x : v) {\n        x += 5;\n    }\n    for (auto x : v) {\n        sum += x;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["60", "75", "45", "Error"],
          answer: 1,
          explanation: "First loop uses & so it modifies: {15, 25, 35}. Second loop sums: 15 + 25 + 35 = 75!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ auto + Range-for Power Combo!",
          content: `Double every element of \`nums\`, then print the result with " " between values.`,
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    // 👇 Use auto& to double every element


    // 👇 Use auto to print results (each value followed by " ")


    return 0;
}`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 9, 5};

    for (auto& x : nums) {
        x = x * 2;
    }

    for (auto x : nums) {
        cout << x << " ";
    }

    return 0;
}`,
          hint: "When modifying: for (auto& x : nums) { x *= 2; } — without &, x is a copy so the original won't change. For printing: for (auto x : nums) cout << x << \" \";",
          expectedOutput: `6 14 4 18 10 `
        },
        {
          id: "ch2-2d-rangefor",
          type: "explain",
          title: "📦 Can we use range-for with 2D vectors?",
          content: `Earlier you used nested for loops with indices to traverse 2D vectors. Range-for works too!

\`\`\`cpp
vector<vector<int>> grid(3, vector<int>(4, 0));

// Index-based (what you've been doing)
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cin >> grid[i][j];

// Range-for style
for (auto& row : grid)       // row = each row (vector<int>&)
    for (auto& val : row)    // val = each element (int&)
        cin >> val;
\`\`\`

Output works the same way:
\`\`\`cpp
for (const auto& row : grid) {
    for (const auto& val : row)
        cout << val << " ";
    cout << "\\n";
}
\`\`\`

### But — index-based is used more often!

Why? Because most 2D problems need the **position (i, j)**:

| Pattern | Position needed? | Range-for OK? |
|---|---|---|
| Diagonal \`grid[i][i]\` | ✅ | ❌ |
| Adjacent cell \`grid[i+1][j]\` | ✅ | ❌ |
| Border check \`i==0\` | ✅ | ❌ |
| Simple input \`cin >> val\` | ❌ | ✅ |
| Total sum/count | ❌ | ✅ |

Range-for only works when you **don't need the position** — input, total sums, printing everything, etc.

In USACO and competitive programming, position matters in most problems, so **index-based nested loops are the go-to for 2D**.

> 💡 Bottom line: range-for with 2D is a "nice to know" — index-based is the default!`,
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "auto understanding!",
          content: "What does `auto x = 3.14;` make x?",
          options: [
            "A dynamic type that can change",
            "double, fixed at compile time",
            "string",
            "int (always defaults to int)"
          ],
          answer: 1,
          explanation: "auto deduces double from 3.14 at compile time. The type is fixed — it can't change later!"
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
          title: "Range-for syntax!",
          content: "Which correctly iterates over a `vector<int> v`?",
          options: [
            "for (x in v) { }",
            "for (int x : v) { }",
            "for (int x of v) { }",
            "foreach (int x : v) { }"
          ],
          answer: 1,
          explanation: "C++ range-for uses a colon (:) — for (int x : v). Not 'in' (Python) or 'of' (JavaScript)!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Reference in range-for!",
          content: `What's the output?

\`\`\`cpp
vector<int> v = {1, 2, 3};
for (int x : v) {
    x = 0;
}
cout << v[0] << v[1] << v[2];
\`\`\``,
          options: ["000", "123", "100", "Error"],
          answer: 1,
          explanation: "Without &, x is a copy! Changing x doesn't affect v. So v is still {1, 2, 3} and the output is 123."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "auto keyword!",
          content: "Which statement about `auto` is **TRUE**?",
          options: [
            "auto makes variables dynamically typed like Python",
            "auto can only be used with integers",
            "auto deduces the type at compile time and it stays fixed",
            "auto is the same as void"
          ],
          answer: 2,
          explanation: "auto deduces the type at compile time and it's fixed forever. It's NOT dynamic typing — it's type inference!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Best practice!",
          content: "For reading large objects in a range-for loop without copying, which is best?",
          options: [
            "for (auto x : vec)",
            "for (auto& x : vec)",
            "for (const auto& x : vec)",
            "for (int x : vec)"
          ],
          answer: 2,
          explanation: "const auto& avoids copying (fast!) and prevents accidental modification (safe!). It's the go-to for reading."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **Range-for** — \`for (int x : vec)\` is like Python's \`for x in list\`
- ✅ **Reference &** — \`for (int& x : vec)\` to modify elements
- ✅ **auto** — compiler deduces the type, still statically typed
- ✅ **auto + range-for** — the modern C++ style!
- ✅ **const auto&** — best for reading: fast and safe

| Pattern | Copy? | Modify? | Best for |
|---|---|---|---|
| \`for (auto x : v)\` | Yes | ❌ | Small types, reading |
| \`for (auto& x : v)\` | No | ✅ | Modifying elements |
| \`for (const auto& x : v)\` | No | ❌ | Reading large types |

🚀 **Next up: Strings in depth** — Working with text the C++ way!`
        }
      ]
    }
  ]
}
