// ============================================
// C++ Lesson 13: Pointer Basics
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson13EnData: LessonData = {
  id: "cpp-13",
  title: "Pointer Basics",
  emoji: "🎯",
  description: "Directly handle memory addresses — int* ptr, & address, * dereference, nullptr",
  chapters: [
    // ============================================
    // Chapter 1: What is a Pointer?
    // ============================================
    {
      id: "ch1",
      title: "What is a Pointer?",
      emoji: "📍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📍 Pointer — A Variable That Stores an Address!",
          component: "cppPointerBuilder",
          content: `You learned about references in the previous lesson:
\`\`\`cpp
int x = 42;
int& ref = x;   // ref directly refers to x
\`\`\`

This lesson: **pointers** — a variable that stores the **address** of x!
\`\`\`cpp
int x = 42;
int* ptr = &x;  // ptr stores the address of x
\`\`\`

\`&\` and \`*\` mean different things in **declaration** vs **use**:

| | In declaration (part of type) | As operator |
|---|---|---|
| \`&\` | \`int& ref\` → reference variable | \`&x\` → get the address of x |
| \`*\` | \`int* ptr\` → pointer variable | \`*ptr\` → get the value at the address |

In practice:
\`\`\`cpp
int x = 42;
int* ptr = &x;    // store x's address in ptr

cout << ptr;      // → 0x7fff1234  (memory address)
cout << *ptr;     // → 42          (value at the address)
cout << &x;       // → 0x7fff1234  (same as ptr!)

*ptr = 100;       // change the value at ptr's address to 100
cout << x;        // → 100         (x changed!)
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Pointer dereference!",
          code: `#include <iostream>
using namespace std;
int main() {
    int x = 10;
    int* p = &x;
    *p = 99;
    cout << x;
    return 0;
}`,
          options: ["10", "99", "address value", "Error"],
          answer: 1,
          explanation: "`*p = 99` changes the value of the variable p points to (x) to 99! Dereferencing a pointer lets you modify the original variable.",
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Pointer basics!",
          content: "For `int x = 5; int* ptr = &x;`, what does `*ptr` return?",
          options: [
            "The address of ptr itself",
            "The address of x",
            "The value of x (5)",
            "The size of the pointer",
          ],
          answer: 2,
          explanation: "`*ptr` is dereferencing — it returns the value at the address ptr holds, which is x's value (5)!",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blank",
          content: "Declare a pointer and dereference it!",
          code: "int x = 42;\nint___ ptr = &x;  // declare pointer\ncout << ___ptr;   // dereference: prints 42",
          fillBlanks: [
            { id: 0, answer: "*", options: ["*", "&", "**", " "] },
            { id: 1, answer: "*", options: ["*", "&", "**", " "] },
          ],
          explanation: "Declare a pointer with `int* ptr`, then dereference with `*ptr` to get the value!",
        },
      ]
    },
    // ============================================
    // Chapter 2: nullptr & Pointer vs Reference
    // ============================================
    {
      id: "ch2",
      title: "nullptr & Pointer Usage",
      emoji: "🔒",
      steps: [
        {
          id: "ch2-nullptr",
          type: "explain",
          title: "🔒 nullptr — Safe Empty Pointer (C++11)",
          content: `When a pointer isn't pointing at anything, use **nullptr**!

\`\`\`cpp
int* p = nullptr;  // empty pointer (recommended since C++11)
// int* p = NULL;   // old style (not recommended)

if (p != nullptr) {
    cout << *p;    // never dereference nullptr!
}
\`\`\`

Dereferencing nullptr **crashes your program** (segfault). Always check before using!

\`\`\`cpp
int* p = nullptr;

// ❌ Dangerous! segfault!
// cout << *p;

// ✅ Safe: check first
if (p != nullptr) {
    cout << *p;
} else {
    cout << "Pointer is empty!";
}
\`\`\`

| | nullptr (C++11) | NULL (old) |
|---|---|---|
| Type | nullptr_t (type-safe) | integer 0 |
| Recommended | ✅ C++11+ | ❌ not recommended |`,
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "nullptr check!",
          code: `#include <iostream>
using namespace std;
int main() {
    int* p = nullptr;
    if (p != nullptr) {
        cout << "value: " << *p;
    } else {
        cout << "empty";
    }
    return 0;
}`,
          options: ["value: 0", "value: nullptr", "empty", "Error"],
          answer: 2,
          explanation: "p is nullptr so the else branch runs — prints 'empty'. We never dereference nullptr, so it's safe!",
        },
        {
          id: "ch2-vs-ref",
          type: "explain",
          title: "🆚 Reference vs Pointer — When to Use Which?",
          content: `In competitive programming, **references** are used far more. But understanding pointers is essential for arrays, linked lists, and advanced data structures!

Reference (recommended):
\`\`\`cpp
void add10(int& n) { n += 10; }

int main() {
    int x = 5;
    add10(x);       // pass x directly
    cout << x;      // → 15
}
\`\`\`

Pointer:
\`\`\`cpp
void add10ptr(int* p) { *p += 10; }

int main() {
    int x = 5;
    add10ptr(&x);   // pass address of x
    cout << x;      // → 15
}
\`\`\`

| Feature | Reference (&) | Pointer (*) |
|---|---|---|
| Initialization | Required at declaration | Can be done later |
| nullptr | Not possible (always valid) | Possible |
| Reassignment | Not possible | Possible |
| Syntax | Simpler | More complex |
| In competitive programming | Used often ✅ | Occasionally |

💡 **Practical rule:** Use references (&) when passing variables to functions. Pointers matter for data structures like linked lists.`,
        },
        {
          id: "ch2-vs-visual",
          type: "interactive",
          title: "🔬 Reference vs Pointer — How Do They Differ in Memory?",
          content: "Click the tabs to see how references and pointers differ in memory!",
          component: "pointerRefVisualizer",
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Build a swap function with pointers!",
          content: `Use pointers to write a swap function that exchanges two values!

Compare the pointer and reference versions to feel the difference.`,
          starterCode: `#include <iostream>
using namespace std;

// Pointer version: dereference with * to swap values
void swapPtr(int* a, int* b) {
    int temp = *a;
    // complete this

}

// Reference version: access variables directly by name
void swapRef(int& a, int& b) {
    int temp = a;
    // complete this

}

int main() {
    int x = 10, y = 20;

    swapPtr(&x, &y);
    cout << "Pointer swap: " << x << " " << y << endl;

    swapRef(x, y);
    cout << "Reference swap: " << x << " " << y << endl;

    return 0;
}`,
          code: `#include <iostream>
using namespace std;

// Pointer version
void swapPtr(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Reference version (simpler!)
void swapRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;

    swapPtr(&x, &y);
    cout << "Pointer swap: " << x << " " << y << endl;

    swapRef(x, y);
    cout << "Reference swap: " << x << " " << y << endl;

    return 0;
}`,
          expectedOutput: `Pointer swap: 20 10
Reference swap: 10 20`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Reference vs Pointer!",
          content: "Which statement about references (&) vs pointers (*) is **correct**?",
          options: [
            "References can be nullptr, but pointers cannot",
            "Pointers can be nullptr, but references always point to a valid variable",
            "They behave exactly the same",
            "Pointers cannot be declared as const",
          ],
          answer: 1,
          explanation: "References must always point to a valid variable and cannot be nullptr. Pointers can be nullptr to represent 'pointing to nothing'!",
        },
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
          title: "Declaring a pointer!",
          content: "After `int x = 5;`, which correctly declares a pointer to x?",
          options: [
            "int ptr = x;",
            "int& ptr = x;",
            "int* ptr = &x;",
            "int* ptr = x;"
          ],
          answer: 2,
          explanation: "`int* ptr = &x;` — * makes it a pointer type, &x gets the address of x."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Dereference result!",
          content: `What is the output?

\`\`\`cpp
int a = 7;
int* p = &a;
*p = *p + 3;
cout << a;
\`\`\``,
          options: ["7", "10", "3", "Error"],
          answer: 1,
          explanation: "`*p` is the value of a (7). `*p + 3 = 10` is written back to a, so a becomes 10!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Safe nullptr check!",
          content: "What should you do before dereferencing a pointer?",
          options: [
            "Always dereference immediately",
            "Check if it's nullptr",
            "Convert the pointer to an integer",
            "Delete the pointer"
          ],
          answer: 1,
          explanation: "Dereferencing a nullptr crashes your program (segfault)! Always check `if (p != nullptr)` before using it."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Passing a pointer to a function!",
          content: "How do you correctly call `void f(int* p) { *p = 99; }`?",
          options: [
            "f(x);",
            "f(*x);",
            "f(&x);",
            "f(&&x);"
          ],
          answer: 2,
          explanation: "A function that takes a pointer needs an address — pass `f(&x)` to give it the address of x. Inside, `*p` can modify x."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Summary!

### 🎯 Pointers
- ✅ **Declare a pointer** — \`int* ptr = &x;\` (stores x's address)
- ✅ **Address operator** — \`&x\` (memory address of x)
- ✅ **Dereference operator** — \`*ptr\` (value at the address)
- ✅ **nullptr** — C++11+, safe empty pointer
- ✅ **Reference vs Pointer** — reference: can't be null, can't reassign; pointer: can be null, can reassign

| Operation | Syntax | Meaning |
|---|---|---|
| Declare pointer | \`int* ptr;\` | variable storing an int address |
| Get address | \`&x\` | memory address of x |
| Dereference | \`*ptr\` | value at the address ptr holds |
| Empty pointer | \`nullptr\` | points to nothing |

💡 **Practical tip:** In competitive programming, references (&) are used more often. Pointers are essential for data structures like linked lists!

🚀 **Next lesson:** Structs — bundle related data into your own custom type!`
        }
      ]
    }
  ]
}
