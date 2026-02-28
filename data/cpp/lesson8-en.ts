// ============================================
// C++ Lesson 8: Functions
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson8EnData: LessonData = {
  id: "cpp-8",
  title: "Functions",
  emoji: "🧩",
  description: "C++ functions with explicit return types!",
  chapters: [
    // ============================================
    // Chapter 1: Function declaration/call
    // ============================================
    {
      id: "ch1",
      title: "Creating Functions",
      emoji: "📝",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🧩 Functions: Python vs C++",
          content: `Python uses \`def\` to create functions, but C++ uses a **return type**!

**Python 🐍:**
\`\`\`python
def add(a, b):
    return a + b
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
\`\`\`

Differences:
1. **Return type** instead of \`def\` (int, double, string...)
2. Parameters need **types** too! (int a, int b)
3. **Curly braces {}** instead of colon (:)

| Python 🐍 | C++ ⚡ |
|---|---|
| \`def add(a, b):\` | \`int add(int a, int b) {\` |
| No types needed | Return type + parameter types required! |

💡 C++ needs to know "what type this function returns" upfront!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Create a multiply function!",
          code: "___ multiply(___ a, ___ b) {\n    return a * b;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "any"] }
          ],
          explanation: "Instead of def, write the return type (int). Parameters also need their type (int)!"
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 Return Type Varieties",
          content: `C++ functions can have many different return types!

\`\`\`cpp
int multiply(int a, int b) { ... }        // Returns integer
double average(double a, double b) { ... } // Returns decimal
string greet(string name) { ... }         // Returns text
bool isEven(int n) { ... }               // Returns true/false
void sayHello() { ... }                   // Returns nothing!
\`\`\`

**void** = a function that returns nothing!

| Python 🐍 | C++ ⚡ |
|---|---|
| Function with no return | **void** function |
| Can return anything | Must return the specified type! |

💡 void means "empty"! Python functions with no return become void in C++.`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Make a function that returns nothing!",
          code: "___ printHello() {\n    cout << \"Hello!\";\n}",
          fillBlanks: [
            { id: 0, answer: "void", options: ["void", "int", "string", "None"] }
          ],
          explanation: "A function with no return value uses void! It's like Python's functions with no return statement."
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Function call!",
          code: "#include <iostream>\nusing namespace std;\nint square(int x) {\n    return x * x;\n}\nint main() {\n    cout << square(4);\n    return 0;\n}",
          options: ["4", "8", "16", "Error"],
          answer: 2,
          explanation: "square(4) returns 4 × 4 = 16!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Create Your Own Function!",
          content: `Let's make a function that takes two integers and returns their sum!

Define the function above main(), then call it from main().`,
          code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int x, y;
    cout << "First number: ";
    cin >> x;
    cout << "Second number: ";
    cin >> y;

    cout << x << " + " << y << " = " << add(x, y) << endl;

    return 0;
}`,
          expectedOutput: `First number: 7
Second number: 3
7 + 3 = 10`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Return type!",
          content: "What return type do you use for a function that returns nothing?",
          options: ["None", "null", "void", "empty"],
          answer: 2,
          explanation: "In C++, functions that return nothing use void! It's similar to Python's None concept."
        }
      ]
    },
    // ============================================
    // Chapter 2: Default params, prototypes
    // ============================================
    {
      id: "ch2",
      title: "Defaults & Prototypes",
      emoji: "📞",
      steps: [
        {
          id: "ch2-params",
          type: "explain",
          title: "📞 Default Parameters",
          content: `Just like Python, C++ supports **default values**!

\`\`\`cpp
void greet(string name, string msg = "Hello") {
    cout << msg << ", " << name << "!" << endl;
}

greet("Alice");           // Hello, Alice!
greet("Alice", "Hey");    // Hey, Alice!
\`\`\`

Same as Python!
\`\`\`python
def greet(name, msg="Hello"):
    print(f"{msg}, {name}!")
\`\`\`

⚠️ Note: Default parameters must be on the **right side**!
\`\`\`cpp
// ✅ OK: defaults at the end
void func(int a, int b = 10) { }

// ❌ Error: default before non-default
void func(int a = 10, int b) { }
\`\`\`

💡 This rule is the same in Python! Defaults always go at the end.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Multiple parameters!",
          code: "#include <iostream>\nusing namespace std;\nint add(int a, int b, int c) {\n    return a + b + c;\n}\nint main() {\n    cout << add(2, 3, 5);\n    return 0;\n}",
          options: ["5", "10", "235", "Error"],
          answer: 1,
          explanation: "add(2, 3, 5) returns 2 + 3 + 5 = 10!"
        },
        {
          id: "ch2-prototype",
          type: "explain",
          title: "📜 Function Prototypes (C++ Only!)",
          content: `In C++, you must **declare a function before using it**!

\`\`\`cpp
// Method 1: Define function above main (Recommended! ✅)
int add(int a, int b) {
    return a + b;
}
int main() {
    cout << add(3, 5);  // OK!
}
\`\`\`

\`\`\`cpp
// Method 2: Prototype (declaration) first!
int add(int a, int b);  // ← Prototype (declaration only)

int main() {
    cout << add(3, 5);  // OK! Declared above
}

int add(int a, int b) {  // Full definition below
    return a + b;
}
\`\`\`

Python doesn't care about order, but C++ reads **top to bottom** so it needs to know first!

💡 Most people use Method 1 (define above main). It's simpler!`
        },
        {
          id: "ch2-header",
          type: "explain",
          title: "📁 .h and .cpp Files (Splitting Code!)",
          content: `When you have lots of prototypes, put them in a **header file (.h)**!

\`\`\`
📂 project/
├── math_utils.h    ← Prototypes (declarations)
├── math_utils.cpp  ← Function bodies (definitions)
└── main.cpp        ← main function
\`\`\`

\`\`\`cpp
// math_utils.h — Prototypes only!
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);      // Declaration only!
int multiply(int a, int b); // Declaration only!

#endif
\`\`\`

\`\`\`cpp
// math_utils.cpp — Function bodies!
#include "math_utils.h"

int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

\`\`\`cpp
// main.cpp — The file that uses them!
#include <iostream>
#include "math_utils.h"  // Our own header!
using namespace std;

int main() {
    cout << add(3, 5) << endl;
    cout << multiply(4, 6) << endl;
    return 0;
}
\`\`\`

| Python 🐍 | C++ ⚡ |
|-----------|--------|
| \`import math_utils\` | \`#include "math_utils.h"\` |
| Everything in one file | .h (declaration) + .cpp (definition) |

\`#include <iostream>\` is a built-in C++ header. \`#include "file.h"\` is a header we made!

💡 In CP (competitive programming), we put everything in one file. But real projects always split files!`
        },
        {
          id: "ch2-header-q",
          type: "quiz",
          title: "Role of .h files!",
          content: `What mainly goes in a .h (header) file?`,
          options: [
            "Function prototypes (declarations)",
            "Complete function bodies (definitions)",
            "The main function",
            "Program output"
          ],
          answer: 0,
          explanation: "Header files contain function prototypes (declarations)! Function bodies go in .cpp files, and main goes in main.cpp separately."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Build a function that finds the bigger number!",
          code: "___ max(___ a, ___ b) {\n    if (a > b) {\n        return a;\n    } ___ {\n        return b;\n    }\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "void", "bool", "def"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "double"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "double"] },
            { id: 3, answer: "else", options: ["else", "elif", "otherwise", "default"] }
          ],
          explanation: "A max function returning the larger of two integers. Return type and parameter types are all int!"
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "Mystery function!",
          code: "#include <iostream>\nusing namespace std;\nint mystery(int a, int b) {\n    if (a > b) return a;\n    else return b;\n}\nint main() {\n    cout << mystery(7, 12);\n    return 0;\n}",
          options: ["7", "12", "19", "Error"],
          answer: 1,
          explanation: "a=7, b=12. a > b? No! → else returns b (12). This is a max function!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Default parameters!",
          content: `Which C++ function declaration is correct?`,
          options: [
            "void func(int a = 10, int b) { }",
            "void func(int a, int b = 10) { }",
            "void func(int a = 10, int b = 20, int c) { }",
            "void func(a, b = 10) { }"
          ],
          answer: 1,
          explanation: "Default parameters must be on the right side! (int a, int b = 10) is correct. Defaults before non-defaults cause errors!"
        },
        {
          id: "ch2-overload",
          type: "explain",
          title: "🎭 Function Overloading (C++ Magic!)",
          content: `In Python, if you define two functions with the same name, the second one overwrites the first.

In C++, you can have **multiple functions with the same name** as long as their parameters are different!

\`\`\`cpp
// add two integers
int add(int a, int b) {
    return a + b;
}

// add two doubles — same name, but OK!
double add(double a, double b) {
    return a + b;
}

// add three integers — also OK!
int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(3, 5);        // int version → 8
    cout << add(1.5, 2.3);    // double version → 3.8
    cout << add(1, 2, 3);     // 3-param version → 6
}
\`\`\`

C++ automatically picks the right function based on **parameter types and count**!

💡 This is called **Function Overloading**. It's a powerful C++ feature that Python doesn't have!`
        },
        {
          id: "ch2-pred-overload",
          type: "predict" as const,
          title: "Which function gets called?",
          code: "#include <iostream>\nusing namespace std;\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint main() {\n    cout << add(1.5, 2.5);\n    return 0;\n}",
          options: ["3", "4.0", "4", "Error"],
          answer: 2,
          explanation: "1.5 and 2.5 are doubles, so the double version of add is called! 1.5 + 2.5 = 4. cout omits trailing .0, so it prints 4."
        },
        {
          id: "ch2-overload-q",
          type: "quiz",
          title: "Function Overloading!",
          content: `If int calc(int x) already exists, which overload is valid?`,
          options: [
            "int calc(int x) { return x * 3; }",
            "double calc(double x) { return x * 2.0; }",
            "int calc(int y) { return y + 1; }",
            "void calc(int x) { cout << x; }"
          ],
          answer: 1,
          explanation: "Overloading requires different parameter types or count! double calc(double x) has a different parameter type, so it's valid. Same type with different names or only different return types won't work!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Try Different Function Styles!",
          content: `This program uses default parameters and function overloading together!

Notice the difference between void functions and functions with return values.`,
          code: `#include <iostream>
using namespace std;

// Default parameters
void greet(string name, string msg = "Hello") {
    cout << msg << ", " << name << "!" << endl;
}

// Function overloading
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int main() {
    greet("Alice");
    greet("Bob", "Hey");

    cout << "Integers: " << add(3, 5) << endl;
    cout << "Doubles: " << add(1.5, 2.7) << endl;

    return 0;
}`,
          expectedOutput: `Hello, Alice!
Hey, Bob!
Integers: 8
Doubles: 4.2`
        }
      ]
    },
    // ============================================
    // Chapter 3: Review Quiz
    // ============================================
    {
      id: "ch3",
      title: "Review Quiz",
      emoji: "🎓",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "Function + Loop!",
          content: `What's the output?

\`\`\`cpp
int calc(int x) {
    return x * x + 1;
}
int main() {
    int result = 0;
    for (int i = 1; i <= 3; i++) {
        result += calc(i);
    }
    cout << result;
}
\`\`\``,
          options: ["6", "14", "17", "10"],
          answer: 2,
          explanation: "calc(1)=2, calc(2)=5, calc(3)=10. result = 2+5+10 = 17!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Python → C++",
          content: `Convert this Python function to C++:

\`\`\`python
def square(x):
    return x * x
\`\`\``,
          options: [
            "def square(int x) { return x * x; }",
            "int square(int x) { return x * x; }",
            "void square(int x) { return x * x; }",
            "square(int x) { return x * x; }"
          ],
          answer: 1,
          explanation: "x * x returns an integer, so the return type is int! Parameter x also needs type int."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Prototypes",
          content: "If a function is defined below main(), what do you need above main()?",
          options: [
            "An import statement",
            "A function prototype (declaration)",
            "The def keyword",
            "Nothing needed"
          ],
          answer: 1,
          explanation: "C++ reads top-to-bottom, so if the function is below main(), you need a prototype above!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Biggest difference!",
          content: "What's the biggest difference between Python and C++ functions?",
          options: [
            "C++ can't create functions",
            "C++ requires return type and parameter types",
            "Python can't use return",
            "C++ can't accept parameters"
          ],
          answer: 1,
          explanation: "C++ is statically typed — you must specify return type and parameter types for every function!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **Function declaration** — return type instead of def! (int, double, void...)
- ✅ **Parameter types** — each parameter must have a type!
- ✅ **void** — for functions that return nothing
- ✅ **Default values** — same as Python! (right-side parameters)
- ✅ **Prototypes** — declare functions before use!

🎉 **C++ Basics Part 1 Complete!** With everything you've learned, you can now write basic C++ programs! 🚀`
        }
      ]
    }
  ]
}
