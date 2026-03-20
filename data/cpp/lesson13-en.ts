// ============================================
// C++ Lesson 13: Pointer Basics
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson13EnData: LessonData = {
  id: "cpp-13",
  title: "Pointer Basics",
  emoji: "📍",
  description: "Directly handle memory addresses with pointers!",
  chapters: [
    // ============================================
    // Chapter 1: What are Pointers?
    // ============================================
    {
      id: "ch1",
      title: "What are Pointers?",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎯 What Is a Pointer?",
          content: `C++ is a language that lets you work directly with memory. This wasn't possible in Python! A pointer is a **variable that stores a memory address**. Understanding pointers gives you deep insight into how programs actually work.

Imagine computer memory as an **apartment building**! 🏢

When you create a variable, it moves into one of the **rooms**. Each room has an **address (number)**!

\`\`\`cpp
int x = 42;
cout << &x;   // prints the memory address of x!
// output example: 0x7ffd5e8a3b2c
\`\`\`

\`&x\` means "tell me the room number (address) where x lives!"

A **pointer** is a variable that **stores this address**!

| Metaphor 🏢 | C++ |
|---|---|
| Apartment building | Computer memory |
| Room number | Memory address (\`&x\`) |
| A sticky note with the room number | Pointer variable (\`int* ptr\`) |
| Going to the room to see what's inside | Dereferencing (\`*ptr\`) |

In Python, you never had to worry about any of this! Python manages memory for you behind the scenes. But in C++, you can **directly work with addresses**.

When do you use pointers? 1) Passing large data without copying 2) Modifying multiple values in a function 3) Dynamic memory allocation (new/delete, which you'll learn later). For now, think of it as 'a tool to work with memory directly'!

💡 \`&\` is the **address-of operator** — it asks "what's the address of this variable?"`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Reading a value through a pointer!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int* ptr = &x;\n    cout << *ptr;\n    return 0;\n}",
          options: ["10", "0x7ffd...", "ptr", "Error"],
          answer: 0,
          explanation: "ptr stores the address of x. *ptr means 'go to that address and read the value!' The value of x is 10, so 10 is printed!"
        },
        {
          id: "ch1-declare",
          type: "explain",
          title: "📝 Declaring and Dereferencing Pointers",
          content: `Let's learn how to create and use pointers in detail!

**Declaring a pointer:** \`int* ptr = &x;\`
- \`int*\` — the type meaning "a pointer that stores the address of an int"
- \`&x\` — gets the address of x

**Dereferencing:** \`*ptr\`
- Go to the address the pointer holds and **read or modify the value**!

\`\`\`cpp
int x = 42;
int* ptr = &x;    // store x's address in ptr
cout << *ptr;     // 42 — dereference to read value

*ptr = 100;       // modify value through the pointer!
cout << x;        // 100 — x changed too!
\`\`\`

Changing a value through a pointer changes the original variable! Similar to references (\`&\`), but pointers are **more flexible**.

| Symbol | Meaning | Example |
|---|---|---|
| \`&x\` | Get address of x | \`int* ptr = &x;\` |
| \`*ptr\` | Value at ptr's address | \`cout << *ptr;\` |
| \`int*\` | Pointer type declaration | \`int* ptr;\` |

💡 \`&\` means "give me the address!", \`*\` means "go to that address and look at the value!"

⚠️ Watch out! & has **two meanings**:
• \`int& ref = x;\` → **Reference** (creating an alias)
• \`&x\` → **Address-of operator** (getting x's memory address)
You can tell them apart from context!

> 💡 **Why we're learning this:** Pointers are for understanding how memory works and reading existing code. In modern C++ and competitive programming, most situations are handled with references (\`int&\`) instead!`,
          component: "cppPointerBuilder",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Create a pointer and read its value!",
          code: "int x = 42;\nint___ ptr = &x;\ncout << ___ptr;   // prints 42",
          fillBlanks: [
            { id: 0, answer: "*", options: ["*", "&", "=", "@"] },
            { id: 1, answer: "*", options: ["*", "&", "!", "->"] }
          ],
          explanation: "int* ptr = &x; declares a pointer, and *ptr dereferences it to read the value!"
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "Modifying through a pointer!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 50;\n    int* ptr = &x;\n    *ptr = 99;\n    cout << x;\n    return 0;\n}",
          options: ["50", "99", "0x7ffd...", "Error"],
          answer: 1,
          explanation: "*ptr = 99 means 'go to the address ptr points to (which is x's address) and store 99 there.' So x becomes 99!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Change Values Through Pointers!",
          content: `Create a pointer and use it to change the original variable's value!

When you dereference (*ptr) and assign a new value, the original variable changes too — see for yourself!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x;

    cout << "x = " << x << endl;
    cout << "*ptr = " << *ptr << endl;

    *ptr = 777;

    cout << "After *ptr = 777:" << endl;
    cout << "x = " << x << endl;
    cout << "*ptr = " << *ptr << endl;

    return 0;
}`,
          expectedOutput: `x = 10
*ptr = 10
After *ptr = 777:
x = 777
*ptr = 777`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Pointer basics!",
          content: "Given `int x = 5; int* ptr = &x;`, what is the value of `*ptr`?",
          options: [
            "The memory address of x",
            "5",
            "The memory address of ptr",
            "Error"
          ],
          answer: 1,
          explanation: "*ptr is a dereference — it goes to the address stored in ptr and reads the value there! ptr points to x, so *ptr is x's value: 5."
        }
      ]
    },
    // ============================================
    // Chapter 2: Using Pointers
    // ============================================
    {
      id: "ch2",
      title: "Using Pointers",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🔧 nullptr — A Pointer to Nothing",
          content: `What if you create a pointer but don't have anything to point to yet? Use **nullptr**!

\`\`\`cpp
int* ptr = nullptr;   // points to nothing!
\`\`\`

This is like Python's \`None\`! It's the pointer version of "nothing here yet."

\`\`\`cpp
int* ptr = nullptr;

if (ptr != nullptr) {
    cout << *ptr;     // only access when ptr points to something!
} else {
    cout << "Pointer is empty!";
}
\`\`\`

⚠️ **Warning!** Dereferencing an uninitialized pointer **crashes your program!**

\`\`\`cpp
int* ptr;         // ❌ Dangerous! Points to garbage!
cout << *ptr;     // 💥 Crash! Accessing random memory!

int* ptr = nullptr;   // ✅ Safe! Clearly says "nothing"
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x = None\` | \`int* ptr = nullptr;\` |
| \`if x is not None:\` | \`if (ptr != nullptr) {\` |
| Safe (error message) | ⚠️ Risky (can crash!) |

💡 **Rule:** Always initialize your pointers! Even \`nullptr\` is better than nothing!

What happens if you dereference nullptr (*ptr)? Your program **dies immediately** (segmentation fault)! It's similar to Python's NoneType error, but C++ gives much less helpful error messages. Checking for nullptr is essential!

⚠️ **Dangerous situation**: What if the thing a pointer points to disappears? You get a 'dangling pointer.' It's like visiting an apartment address after the tenant has moved out. This is a major cause of segmentation faults!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "nullptr check!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int* ptr = nullptr;\n    if (ptr == nullptr) {\n        cout << \"null\";\n    } else {\n        cout << *ptr;\n    }\n    return 0;\n}",
          options: ["null", "0", "Error", "0x0"],
          answer: 0,
          explanation: "ptr is nullptr, so the if condition is true! 'null' is printed. We safely avoided dereferencing a null pointer."
        },
        {
          id: "ch2-arrays",
          type: "explain",
          title: "📦 The Relationship Between Arrays and Pointers",
          content: `**Good to know!** An array name is internally a pointer to its first element.

So \`arr[i]\` and \`*(arr + i)\` are exactly the same in C++.

| Style | Example | Recommended? |
|---|---|---|
| Index | \`arr[1]\` | ✅ Always use this! |
| Pointer arithmetic | \`*(arr + 1)\` | ⚠️ Hard to read |

> 💡 **Conclusion:** Use \`arr[i]\` in real code. You might see \`*(arr + i)\` in old code or exams — just know that it exists!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Set up a safe null pointer check!",
          code: "int* ptr = ___;\n\nif (ptr ___ nullptr) {\n    cout << \"safe!\";\n}",
          fillBlanks: [
            { id: 0, answer: "nullptr", options: ["nullptr", "NULL", "0", "none"] },
            { id: 1, answer: "!=", options: ["!=", "==", ">=", "<="] }
          ],
          explanation: "Initialize the pointer with nullptr, then check != nullptr to use it safely!"
        },
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚔️ Reference vs Pointer Comparison!",
          content: `Let's compare references (&) from the last lesson with pointers (*)!

| | Reference \`&\` | Pointer \`*\` |
|---|---|---|
| **Declaration** | \`int& ref = x;\` | \`int* ptr = &x;\` |
| **Access value** | \`ref\` (use directly) | \`*ptr\` (must dereference) |
| **Must initialize?** | ✅ Required! | ❌ No (but you should!) |
| **Can reassign?** | ❌ Cannot | ✅ Can |
| **Can be null?** | ❌ Cannot | ✅ nullptr |
| **Use case** | Simple aliasing | More flexible control |

\`\`\`cpp
int a = 10, b = 20;

// Reference: once set, can't change target!
int& ref = a;
// ref = &b;   // ❌ This just assigns a = b, not reassignment!

// Pointer: can change what it points to anytime!
int* ptr = &a;
ptr = &b;       // ✅ Now points to b!
cout << *ptr;   // 20
\`\`\`

**When to use which?**
- 🏷️ **Reference**: When you just need a simple alias (function parameters, etc.)
- 📍 **Pointer**: When you need null, or need to change what you point to

💡 Prefer references when possible, use pointers only when you need their extra flexibility!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Pointer vs Reference!",
          content: "Which statement about references and pointers is **correct**?",
          options: [
            "References can be null, but pointers cannot",
            "Pointers can be reassigned, but references cannot",
            "References are always faster than pointers",
            "Pointers and references are exactly the same"
          ],
          answer: 1,
          explanation: "Pointers can be reassigned to point to different variables, but references are permanently bound to one variable once set!"
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
          title: "Address-of operator!",
          content: "Given `int x = 10;`, what does `&x` represent?",
          options: [
            "The value of x (10)",
            "The memory address of x",
            "A reference to x",
            "The pointer type of x"
          ],
          answer: 1,
          explanation: "&x is the 'address-of operator' — it gives you the memory address where x is stored! Something like 0x7ffd..."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Dereferencing!",
          content: `What's the output?

\`\`\`cpp
int a = 5;
int* p = &a;
*p = *p + 10;
cout << a;
\`\`\``,
          options: [
            "5",
            "10",
            "15",
            "Error"
          ],
          answer: 2,
          explanation: "*p is a's value (5). *p + 10 = 15, and storing that back in *p changes a to 15! We modified the original through the pointer."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Reference vs Pointer Choice!",
          content: "You want to modify a large struct in a function without copying it. What's the best approach?",
          options: [
            "Pass by value (modify a copy)",
            "Pass a pointer and modify via dereference (*ptr)",
            "Pass by reference and modify directly",
            "Make it a global variable"
          ],
          answer: 2,
          explanation: "Passing by reference lets you modify the original without copying, and the syntax is simpler than pointers! This is the preferred approach in modern C++. Use pointers only when you need null checks or to change what is being pointed to."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "nullptr safety!",
          content: "Why should you initialize a pointer with `int* ptr = nullptr;`?",
          options: [
            "It's a syntax rule — you get an error if you don't",
            "To set the pointer to zero",
            "Uninitialized pointers hold garbage addresses and are dangerous",
            "Because nullptr makes pointers faster"
          ],
          answer: 2,
          explanation: "An uninitialized pointer holds a garbage address. Dereferencing it causes a crash! nullptr clearly says 'points to nothing' and makes your code safe."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What You Learned Today!",
          content: `## ✅ Today's Summary!

- ✅ **Pointer** — \`int* ptr = &x;\` stores a variable's memory address
- ✅ **Address-of operator &** — \`&x\` gets a variable's address
- ✅ **Dereference \*** — \`*ptr\` reads or modifies the value a pointer points to
- ✅ **nullptr** — a pointer that points to nothing (like Python's None!)
- ✅ **Reference vs Pointer** — Use references by default, pointers only when necessary!

| Concept | Syntax | Meaning |
|---|---|---|
| Get address | \`&x\` | x's memory address |
| Declare pointer | \`int* ptr = &x;\` | Store x's address |
| Dereference | \`*ptr\` | Value at pointer's address |
| Null pointer | \`nullptr\` | Points to nothing |

## 🎯 Reference vs Pointer — When to Use What?

| | Reference \`int&\` | Pointer \`int*\` |
|---|---|---|
| **Most situations** | ✅ Default choice! | |
| **Need null** | | ✅ Use pointer |
| **Need to change target** | | ✅ Use pointer |

💡 **Rule:** Use references (\`&\`) in most cases. Use pointers only when you need null checks or to change what you're pointing to!

🚀 **Next Lesson:** Create your own types with struct and class!`
        }
      ]
    }
  ]
}
