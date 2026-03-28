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
          id: "ch1-ref",
          type: "explain",
          title: "✏️ Modifying Elements: Use a Reference!",
          content: `By default, range-for gives you a **copy** of each element:

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int x : nums) {
    x = x * 10;  // Only changes the copy!
}
// nums is still {1, 2, 3} — unchanged!
\`\`\`

To actually **modify** the original elements, add **&** (reference):

\`\`\`cpp
vector<int> nums = {1, 2, 3};

for (int& x : nums) {  // ← & means reference!
    x = x * 10;  // Now changes the actual element!
}
// nums is now {10, 20, 30} — changed!
\`\`\`

Think of it like this:

| Syntax | Meaning | Modifies original? |
|---|---|---|
| \`for (int x : nums)\` | Copy | ❌ No |
| \`for (int& x : nums)\` | Reference | ✅ Yes |

In Python, when you do \`for x in list\` and change \`x\`, it doesn't change the list either. But C++ gives you the **choice** with &!

💡 Adding & means "access the original directly"!

& means "the original itself." Not a copy, but the real thing! If you **copy** a photo and give it to a friend, editing the copy doesn't affect the original. But if you **share the original file**, any changes your friend makes show up on yours too. That's exactly what & does — it's sharing the original!

This is where the & symbol shows up! & means "modify the original directly." We'll learn more about it in Lesson 12. For now, just remember: **& = modify original, no & = copy only**!`
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
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Sum with Range-for!",
          content: `Calculate the sum of a vector using range-for instead of an index-based loop!

So much cleaner than \`for (int i = 0; i < v.size(); i++)\`, right?`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> scores = {90, 85, 78, 92, 88};
    int sum = 0;

    for (int s : scores) {
        sum += s;
    }

    cout << "Sum: " << sum << endl;
    cout << "Average: " << (double)sum / scores.size() << endl;

    return 0;
}`,
          expectedOutput: `Sum: 433
Average: 86.6`
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
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Let the compiler figure out the types!",
          code: "___ x = 100;\n___ msg = \"Hello\"s;\ncout << x << \" \" << msg;",
          fillBlanks: [
            { id: 0, answer: "auto", options: ["auto", "var", "let", "int"] },
            { id: 1, answer: "auto", options: ["auto", "var", "let", "string"] }
          ],
          explanation: "auto lets the compiler figure out the type! x becomes int, msg becomes string."
        },
        {
          id: "ch2-combo",
          type: "explain",
          title: "🎯 auto + Range-for: The Modern C++ Style!",
          component: "cppAutoBuilder",
          content: `Here's where auto really shines — combine it with range-for!

**Without auto:**
\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (int x : nums) {
    cout << x << " ";
}
\`\`\`

**With auto:**
\`\`\`cpp
vector<int> nums = {1, 2, 3};
for (auto x : nums) {
    cout << x << " ";
}
\`\`\`

Why is this awesome? Look at longer types:
\`\`\`cpp
vector<string> names = {"Emma", "Jake", "Charlie"};

// Without auto — so much typing!
for (string name : names) { ... }

// With auto — clean and simple!
for (auto name : names) { ... }
\`\`\`

Remember these three patterns:

| Pattern | Meaning | When to use |
|---|---|---|
| \`for (auto x : vec)\` | Copy (read-only) | Just reading, small types |
| \`for (auto& x : vec)\` | Reference (modifiable) | Need to modify |
| \`for (const auto& x : vec)\` | Const reference (read-only + efficient) | Reading large objects |

Here's an example with a string vector:
\`\`\`cpp
vector<string> names = {"Emma", "Jake", "Charlie"};

// Explicit type: vector<string>, so... string? string&? Confusing!
for (const string& name : names) {
    cout << name << endl;
}

// auto: no need to think about it!
for (const auto& name : names) {
    cout << name << endl;
}
\`\`\`

When should you use which?
- \`auto x\` : Reading small values (int, double)
- \`auto& x\` : When you need to **modify** elements
- \`const auto& x\` : Reading large data (string) without copying

💡 \`for (const auto& x : v)\` is the pattern C++ experts use the most!`
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
          content: `Use auto with range-for to double every element, then print the result!

This is the modern C++ way to process vectors.`,
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {3, 7, 2, 8, 5};

    // Double every element using reference
    for (auto& n : nums) {
        n *= 2;
    }

    // Print using const reference
    cout << "Doubled: ";
    for (const auto& n : nums) {
        cout << n << " ";
    }
    cout << endl;

    return 0;
}`,
          expectedOutput: `Doubled: 6 14 4 16 10`
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
