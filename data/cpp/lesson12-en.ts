// ============================================
// C++ Lesson 12: References & Functions
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson12EnData: LessonData = {
  id: "cpp-12",
  title: "References & Functions",
  emoji: "🔗",
  description: "Call by value vs reference!",
  chapters: [
    // ============================================
    // Chapter 1: References
    // ============================================
    {
      id: "ch1",
      title: "References",
      emoji: "🏷️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🏷️ What Is a Reference?",
          content: `In C++, a **reference** is an **alias** (another name) for an existing variable!

\`\`\`cpp
int x = 10;
int& ref = x;   // ref is an alias for x!
\`\`\`

\`ref\` and \`x\` point to the exact same memory. Change \`ref\`, and \`x\` changes too!

\`\`\`cpp
int x = 10;
int& ref = x;
ref = 20;        // change ref...
cout << x;       // x is also 20! They share the same memory
\`\`\`

Let's compare with Python:

**Python 🐍:**
\`\`\`python
x = 10
ref = x       # same object? new object?
ref = 20      # only ref changes, x is still 10!
\`\`\`

In Python, integers are immutable, so \`ref = 20\` makes ref point to a new object. But a C++ reference is **permanently linked** to the original!

| Python 🐍 | C++ Reference ⚡ |
|---|---|
| \`ref = x\` (copy or shared object) | \`int& ref = x;\` (alias of original) |
| \`ref = 20\` → x unchanged (int) | \`ref = 20;\` → x changes too! |
| Implicit behavior | \`&\` makes it explicit |

💡 \`&\` means "this variable is an alias for another variable!"`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Modifying a reference!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int& ref = x;\n    ref = 20;\n    cout << x;\n    return 0;\n}",
          options: ["10", "20", "0", "Error"],
          answer: 1,
          explanation: "ref is an alias (reference) for x! ref = 20 is the same as x = 20. So printing x gives 20."
        },
        {
          id: "ch1-const",
          type: "explain",
          title: "🔒 const References",
          content: `Add \`const\` to a reference and it becomes **read-only**!

\`\`\`cpp
int x = 10;
const int& ref = x;   // read-only reference!

cout << ref;    // ✅ Reading is OK!
// ref = 20;    // ❌ Error! Can't modify through const ref!
\`\`\`

Why use const references? Two great reasons:

**1. No copy — it's fast! (Performance)**
\`\`\`cpp
string longText = "A very long string...";

string copy = longText;        // Full copy! Slow
const string& ref = longText;  // Just a reference! Fast
\`\`\`

**2. Prevents accidental changes! (Safety)**
\`\`\`cpp
const string& ref = longText;
// ref = "change it";  // ❌ Compile error! Safe!
\`\`\`

| Type | Read | Modify | Use case |
|---|---|---|---|
| \`int& ref\` | ✅ | ✅ | When you need to modify |
| \`const int& ref\` | ✅ | ❌ | Fast read-only access |

💡 const references are **extremely common** in function parameters! We'll see lots of this in the next chapter.`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Declare a reference to variable a!",
          code: "int a = 42;\nint___ ref = a;\ncout << ref;",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "=", "@"] }
          ],
          explanation: "int& ref = a; declares a reference! Adding & makes ref an alias for a."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Experiment with References!",
          content: `Create a reference variable and use it to change the original value!

When you modify through ref, the original variable x changes too — see for yourself!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 100;
    int& ref = x;

    cout << "x = " << x << endl;
    cout << "ref = " << ref << endl;

    ref = 500;

    cout << "After ref = 500:" << endl;
    cout << "x = " << x << endl;
    cout << "ref = " << ref << endl;

    return 0;
}`,
          expectedOutput: `x = 100
ref = 100
After ref = 500:
x = 500
ref = 500`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Reference basics!",
          content: "Given `int x = 5; int& ref = x;`, which statement about `ref` is **correct**?",
          options: [
            "ref is a copy of x",
            "ref is an alias (another name) for x",
            "ref stores the address of x",
            "ref creates a new independent variable"
          ],
          answer: 1,
          explanation: "A reference is an alias for the original variable! ref and x share the same memory — changing one changes the other."
        }
      ]
    },
    // ============================================
    // Chapter 2: Call by Value vs Reference
    // ============================================
    {
      id: "ch2",
      title: "Call by Value vs Reference",
      emoji: "📞",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📞 Passing Values to Functions (Call by Value)",
          content: `In C++, when you pass a variable to a function, the value is **copied** by default! This is called **Call by Value**.

\`\`\`cpp
void tryChange(int x) {
    x = 99;   // Only changes the copy!
}

int main() {
    int num = 10;
    tryChange(num);
    cout << num;   // Still 10! 😱
}
\`\`\`

When you pass \`num\` to \`tryChange\`, a **copy** is made. Changing \`x\` inside the function doesn't touch the original \`num\`!

Let's compare with Python:

**Python 🐍:**
\`\`\`python
def try_change(x):
    x = 99      # integers are immutable!

num = 10
try_change(num)
print(num)      # 10 — unchanged in Python too!
\`\`\`

In Python, integers don't change either because they're immutable. But in C++, **every type** is copied by default!

| Scenario | C++ (default) | Python |
|---|---|---|
| Pass int | Copied (unchanged) | Immutable (unchanged) |
| Pass string | Copied (unchanged) | Object reference |
| Pass list/vector | Copied! (unchanged) | Object reference (changes!) |

💡 C++ copies by default! This is a major difference from Python.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Call by Value!",
          code: "#include <iostream>\nusing namespace std;\nvoid tryChange(int x) {\n    x = 99;\n}\nint main() {\n    int num = 10;\n    tryChange(num);\n    cout << num;\n    return 0;\n}",
          options: ["99", "10", "0", "Error"],
          answer: 1,
          explanation: "Call by Value! A copy of num is passed to the function. Changing x to 99 inside the function doesn't affect the original num, which stays 10."
        },
        {
          id: "ch2-ref",
          type: "explain",
          title: "🔗 Call by Reference — Modify the Original!",
          content: `Want to actually change the original? Use a **reference (&)**!

\`\`\`cpp
void change(int& x) {   // Added &!
    x = 99;   // Changes the original!
}

int main() {
    int num = 10;
    change(num);
    cout << num;   // 99! ✅
}
\`\`\`

With \`int& x\`, the parameter \`x\` becomes an **alias** for \`num\`. Changing \`x\` changes \`num\` directly!

A classic use case: the **swap function!**
\`\`\`cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y;  // 2 1
}
\`\`\`

In Python, \`x, y = y, x\` does it in one line. In C++, you build a swap function using references!

| Method | Syntax | Modifies original? |
|---|---|---|
| Call by Value | \`void f(int x)\` | ❌ |
| Call by Reference | \`void f(int& x)\` | ✅ |

💡 Just one \`&\` completely changes how the function behaves!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Make the function double x for real!",
          code: "void doubleIt(int___ n) {\n    n = n * 2;\n}\nint main() {\n    int x = 5;\n    doubleIt(x);\n    cout << x;  // 10\n}",
          fillBlanks: [
            { id: 0, answer: "&", options: ["&", "*", "=", " "] }
          ],
          explanation: "int& n uses pass-by-reference so the original x gets modified! Without &, only the copy changes and x stays 5."
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "swap function!",
          code: "#include <iostream>\nusing namespace std;\nvoid swap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\nint main() {\n    int x = 3, y = 7;\n    swap(x, y);\n    cout << x << \" \" << y;\n    return 0;\n}",
          options: ["3 7", "7 3", "7 7", "Error"],
          answer: 1,
          explanation: "References (&) mean the originals are modified! temp=3, a=7, b=3 — so x becomes 7 and y becomes 3."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ swap Function + Double Vector!",
          content: `Practice two functions that use references!

1. A swap function to exchange two values
2. A function that doubles every element in a vector

When a vector is passed by reference, the original vector gets modified!`,
          code: `#include <iostream>
#include <vector>
using namespace std;

void mySwap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

void doubleAll(vector<int>& v) {
    for (int& x : v) {
        x = x * 2;
    }
}

int main() {
    int a = 10, b = 20;
    mySwap(a, b);
    cout << "swap: " << a << " " << b << endl;

    vector<int> nums = {1, 2, 3, 4, 5};
    doubleAll(nums);
    cout << "double: ";
    for (int x : nums) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}`,
          expectedOutput: `swap: 20 10
double: 2 4 6 8 10 `
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Value vs Reference!",
          content: "What's the difference between `void f(int x)` and `void f(int& x)`?",
          options: [
            "No difference",
            "int x receives a copy, int& x receives an alias of the original",
            "int x is slower, int& x is faster",
            "int& x causes an error"
          ],
          answer: 1,
          explanation: "int x receives a copy (Call by Value), int& x receives an alias of the original (Call by Reference). With &, you can modify the original!"
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
          title: "Declaring a reference!",
          content: "After `int x = 5;`, which correctly creates a reference to `x`?",
          options: [
            "int ref = x;",
            "int& ref = x;",
            "int* ref = x;",
            "ref int = x;"
          ],
          answer: 1,
          explanation: "int& ref = x; declares a reference! The & after the type is the reference syntax."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Function parameters!",
          content: `What's the output?

\`\`\`cpp
void add10(int& n) { n += 10; }
int main() {
    int x = 5;
    add10(x);
    add10(x);
    cout << x;
}
\`\`\``,
          options: [
            "5",
            "15",
            "25",
            "Error"
          ],
          answer: 2,
          explanation: "Since n is a reference (&), the original x changes! First call: 5 -> 15. Second call: 15 -> 25. Final x is 25."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "const reference!",
          content: "With `const int& ref = x;`, which operation is **NOT** allowed?",
          options: [
            "Reading the value of ref",
            "Printing with cout << ref;",
            "Assigning ref = 100;",
            "Comparing ref with another variable"
          ],
          answer: 2,
          explanation: "A const reference is read-only! You can read it or compare it, but ref = 100 would cause a compile error."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Vectors and references!",
          content: "When passing a large vector to a function, why use `void f(const vector<int>& v)` instead of `void f(vector<int> v)`?",
          options: [
            "The syntax is simpler",
            "It lets you modify the vector",
            "No copy is made (fast), and const prevents accidental modification",
            "It prevents errors"
          ],
          answer: 2,
          explanation: "const reference (&) avoids copying the entire vector (fast!), and const prevents you from accidentally modifying it (safe!). Best of both worlds."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **Reference** — \`int& ref = x;\` creates an alias (another name) for a variable
- ✅ **const Reference** — \`const int& ref = x;\` is read-only, no copy needed!
- ✅ **Call by Value** — \`void f(int x)\` passes a copy, original unchanged
- ✅ **Call by Reference** — \`void f(int& x)\` passes an alias, original can be modified
- ✅ **swap function** — A classic example of using references!

| Parameter Style | Syntax | Modifies original? | Copy cost? |
|---|---|---|---|
| Call by Value | \`void f(int x)\` | ❌ | Yes |
| Call by Reference | \`void f(int& x)\` | ✅ | None |
| const Reference | \`void f(const int& x)\` | ❌ | None |

💡 **Rule of thumb:** Need to modify? Use \`&\`. Read-only? Use \`const &\`. Small values? Just copy!

🚀 **Next up:** More C++ features to explore!`
        }
      ]
    }
  ]
}
