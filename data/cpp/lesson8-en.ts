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
          id: "ch1-why",
          type: "explain",
          title: "🤔 Why Do We Need Functions?",
          content: `A function is a **helper that does one thing well**. In a restaurant, there's one person taking orders, another cooking, another serving — right? Programming works the same way!

If you're writing the same code over and over, you can wrap it in a function and **call it by name**!

**Without a function:**
\`\`\`cpp
cout << 3 + 5;
cout << 10 + 7;
cout << 4 + 9;
\`\`\`

**With a function:**
\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
cout << add(3, 5);
cout << add(10, 7);
cout << add(4, 9);
\`\`\`

Write it once, **call it by name** as many times as you want! Cleaner code, and if you need to change it, just edit one place.`
        },
        {
          id: "ch1-structure",
          type: "explain",
          title: "🔍 C++ Function Structure",
          content: `A C++ function looks like this:

\`\`\`cpp
int add(int a, int b) {
    return a + b;
}
\`\`\`

Let's break down each part:

| Part | Example | Role |
|---|---|---|
| **Return type** | \`int\` | What type this function gives back |
| **Function name** | \`add\` | The name you use to call it |
| **Parameters** | \`(int a, int b)\` | Input values (types required!) |
| **Curly braces {}** | \`{ ... }\` | The block of code the function runs |
| **return** | \`return a + b;\` | Sends the result back |

⚠️ **Different from Python:**
- Python: \`def add(a, b):\` — colon to start, indentation for block
- C++: \`int add(int a, int b) { }\` — **curly braces {}** for block, types required!

💡 Forget the curly braces and you get an error! Always open with \`{\` and close with \`}\`.`,
          component: "cppFunctionBuilder",
        },
        {
          id: "ch1-compare",
          type: "explain",
          title: "🧩 Python vs C++ Comparison",
          content: `Let's compare Python and C++ functions side by side:

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

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| Keyword | \`def\` | None (return type instead!) |
| Return type | Not needed | \`int\`, \`double\`, \`void\` etc. required |
| Param types | Not needed | \`int a\`, \`double b\` etc. required |
| Code block | Colon + indent | **Curly braces { }** |
| Line ending | No semicolon | **Semicolon ;** required |

💡 C++ needs to know "what it takes and what it returns" — all with types!`,
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
          title: "📋 Return Types",
          content: `The **return type** before the function name tells C++: "this function will give back this type of value."

\`\`\`cpp
int multiply(int a, int b) { ... }         // Returns an integer
double average(double a, double b) { ... }  // Returns a decimal
string greet(string name) { ... }          // Returns text
bool isEven(int n) { ... }                // Returns true/false
\`\`\`

If return type is \`int\`, the \`return\` must give back an **integer**:
\`\`\`cpp
int add(int a, int b) {
    return a + b;   // ✅ Returns integer — OK!
    return "hello"; // ❌ That's a string! — Error!
}
\`\`\`

💡 C++ will give an error if the types don't match. "Don't return something different from what you promised!"`
        },
        {
          id: "ch1-void",
          type: "explain",
          title: "🕳️ void — Functions That Return Nothing?",
          content: `But what about functions that **don't need to return anything**?

You've written these in Python:
\`\`\`python
def say_hello():
    print("Hello!")
    # no return!
\`\`\`

In C++, you write \`void\` to say "this function returns nothing":
\`\`\`cpp
void sayHello() {
    cout << "Hello!";
    // no return needed!
}
\`\`\`

**void** = an English word meaning "empty, nothing."

| Situation | Return type | return |
|---|---|---|
| Returns a calculated result | \`int\`, \`double\` etc. | \`return value;\` required |
| Just prints something | **\`void\`** | No return needed |
| Returns true/false | \`bool\` | \`return true;\` or \`return false;\` |

💡 Calling a void function:
\`\`\`cpp
sayHello();          // ✅ Just call it — OK!
int x = sayHello();  // ❌ Nothing to store! — Error!
\`\`\`

⚠️ You can't store the result of a void function in a variable!`
        },
        {
          id: "ch1-return-vs-cout",
          type: "explain",
          title: "🤔 return vs cout — What's the Difference?",
          content: `return and cout are completely different!

**cout**: Just shows something on screen (for humans to see)
**return**: The function gives back a value (for the program to use)

Analogy: In a restaurant...
- cout = shouting "Order #42 ready!" (just displaying info)
- return = actually bringing the food to the customer's table (delivering the result)

\`\`\`cpp
// Only cout?
void showDouble(int x) {
    cout << x * 2;  // Shows on screen
}

// With return?
int getDouble(int x) {
    return x * 2;  // Gives back the value
}

int main() {
    // showDouble(5);  // Prints 10, but you can't save it!
    int result = getDouble(5);  // result stores 10!
    cout << result + 3;  // Can print 13!
}
\`\`\`

💡 **If you need the result elsewhere, use return. If you just want to display it, use cout!**`
        },
        {
          id: "ch1-fb2",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "This function just prints \"Hello!\" and returns nothing. What's the return type?",
          code: "___ printHello() {\n    cout << \"Hello!\";\n}",
          fillBlanks: [
            { id: 0, answer: "void", options: ["void", "int", "string", "None"] }
          ],
          explanation: "Returns nothing → void! Python functions with no return = void functions in C++."
        },
        {
          id: "ch1-void-pred",
          type: "predict" as const,
          title: "Calling a void function?",
          code: "#include <iostream>\nusing namespace std;\nvoid greet(string name) {\n    cout << \"Hi, \" << name << \"!\";\n}\nint main() {\n    greet(\"Emma\");\n    return 0;\n}",
          options: ["Hi, Emma!", "Emma", "Error", "Nothing prints"],
          answer: 0,
          explanation: "void functions work fine! They just don't return a value. cout still prints output!"
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

greet("Emma");           // Hello, Emma!
greet("Emma", "Hey");    // Hey, Emma!
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
        // ===== Prototypes: Why? → How? → Caution → Practice =====
        {
          id: "ch2-proto-why",
          type: "explain",
          title: "😱 Why Does This Error? (Order Problem)",
          content: `This code gives an error. Why?

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << add(3, 5);  // ❌ Error! What's add??
    return 0;
}

int add(int a, int b) {
    return a + b;
}
\`\`\`

C++ reads code **top to bottom**. When main() calls \`add()\`, the compiler hasn't seen add yet!

🐍 Python doesn't have this problem — it looks up functions at runtime. But C++ needs to know everything at **compile time**.

💡 There are 2 ways to fix this! Let's see them next.`
        },
        {
          id: "ch2-proto-why-anim",
          type: "animation",
          component: "functionOrder",
          title: "🎬 How the Compiler Reads Code",
          content: `💡 There are 2 ways to fix this! Let's see them next.`
        },
        {
          id: "ch2-proto-fix",
          type: "explain",
          title: "✅ Two Ways to Fix It",
          content: `**Method 1: Put the function above main** (Simple! ✅)

\`\`\`cpp
int add(int a, int b) {   // ← Define first!
    return a + b;
}

int main() {
    cout << add(3, 5);    // ✅ It's above, so OK!
}
\`\`\`

**Method 2: Use a prototype (announce it first)**

\`\`\`cpp
int add(int a, int b);    // ← Prototype: "This function will exist!"

int main() {
    cout << add(3, 5);    // ✅ Declared above, so OK!
}

int add(int a, int b) {   // ← Actual body below
    return a + b;
}
\`\`\`

A **prototype** = a "preview" of the function. No body (no { } code), just **name, parameters, return type** and a **semicolon (;)** at the end!

⚠️ Important: The prototype MUST end with **semicolon (;)**! Missing it = error!`
        },
        {
          id: "ch2-proto-why2",
          type: "explain",
          title: "🤷 Can't I just put everything above main?",
          content: `Great question! With 2-3 functions, sure. But...

**Problem 1: Functions calling each other**

\`\`\`cpp
// ❌ A calls B, and B calls A?
void funcA() {
    funcB();  // funcB is below → Error!
}
void funcB() {
    funcA();  // funcA is above → OK
}
\`\`\`

No matter the order, **one side always errors!** Only prototypes can fix this:

\`\`\`cpp
// ✅ Fixed with prototypes!
void funcA();  // Declare first
void funcB();  // Declare first

void funcA() { funcB(); }  // OK!
void funcB() { funcA(); }  // OK!
\`\`\`

**Problem 2: 50 functions?**

If you put 50 functions above main()... you can't even find main() anymore 😵

With prototypes, you can keep **main() at the top** and organize function bodies below.

**Problem 3: Team projects**

When multiple people write functions in different files, prototypes in .h files let other files use those functions!

💡 Summary: Prototypes are a tool for **organizing large programs cleanly**!`
        },
        {
          id: "ch2-proto-pred1",
          type: "predict" as const,
          title: "Will this code run?",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << multiply(4, 5);\n    return 0;\n}\n\nint multiply(int a, int b) {\n    return a * b;\n}",
          options: ["20", "Error (function not found)", "0", "45"],
          answer: 1,
          explanation: "main() calls multiply, but there's no prototype or definition above it! C++ reads top→bottom, so it errors!"
        },
        {
          id: "ch2-proto-fb1",
          type: "fillblank" as const,
          title: "Write the prototype!",
          content: "Add a prototype for multiply to fix the error! (Don't forget the semicolon!)",
          code: "___ multiply(___ a, ___ b)___\n\nint main() {\n    cout << multiply(4, 5);\n    return 0;\n}\n\nint multiply(int a, int b) {\n    return a * b;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "void", "def", "func"] },
            { id: 1, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 2, answer: "int", options: ["int", "var", "num", "any"] },
            { id: 3, answer: ";", options: [";", "{", ":", "()"] }
          ],
          explanation: "Prototype = return type + function name + (params) + semicolon(;)! No body { }, just a declaration."
        },
        // ===== Header files: Why? → #ifndef → Structure → Practice =====
        {
          id: "ch2-header-why",
          type: "explain",
          title: "📁 100 functions? → Header files!",
          content: `One or two prototypes is fine... but what if you have tons?

\`\`\`cpp
// 10... 20... too many prototypes!
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
double divide(double a, double b);
int max(int a, int b);
// ... keeps growing 😱
\`\`\`

Solution: Put prototypes in a **separate file (.h)**!

\`\`\`
📂 project/
├── math_utils.h    ← Prototypes (declarations)
├── math_utils.cpp  ← Function bodies (definitions)
└── main.cpp        ← main function
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`import math_utils\` | \`#include "math_utils.h"\` |
| One file | .h (declarations) + .cpp (definitions) |

💡 \`#include <iostream>\` = built-in C++ header. \`#include "file.h"\` = our custom header!`
        },
        {
          id: "ch2-header-guard",
          type: "explain",
          title: "🛡️ Wait, what's this weird code?",
          content: `You'll see this at the top of header files:

\`\`\`cpp
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
// ... prototypes ...
#endif
\`\`\`

Let me explain with a **classroom analogy**!

---

🏫 **Situation:** The teacher is taking attendance...

**Without header guards:**
> "John Smith!" → Write on the list ✅
> "John Smith!" → Write again? → **"Already on the list!" ❌ Error!**

If you include the same header twice, the same prototypes get registered twice → **"Already declared!" error**.

**With header guards:**
> \`#ifndef\` = "Is this name **NOT on the list yet?**"
> \`#define\` = "Not there? **Write it down**, run the code below!"
> \`#endif\` = "Done!"
>
> Called a second time? → "Already on the list? → **Skip!**"

\`\`\`cpp
#ifndef MATH_UTILS_H     // "Not on the list yet?"
#define MATH_UTILS_H     // "Nope, so writing it down!"

int add(int a, int b);   // This code runs!

#endif                   // "Done!"

// If included a second time?
// → "Already on the list!" → Skip everything!
\`\`\`

💡 Just think of it as a **"safety lock to prevent the same file from being read twice"**!

⚠️ Always add this when you create your own header files. Without it, you might get duplicate errors later!`
        },
        {
          id: "ch2-header-full",
          type: "explain",
          title: "📋 Full Structure at a Glance",
          content: `See how 3 files connect:

**① math_utils.h** — Prototypes (declarations only!)
\`\`\`cpp
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);       // Declaration only!
int multiply(int a, int b);  // Declaration only!

#endif
\`\`\`

**② math_utils.cpp** — Function bodies (actual code!)
\`\`\`cpp
#include "math_utils.h"

int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
\`\`\`

**③ main.cpp** — The file that uses them!
\`\`\`cpp
#include <iostream>
#include "math_utils.h"  // Our header!
using namespace std;

int main() {
    cout << add(3, 5) << endl;
    cout << multiply(4, 6) << endl;
    return 0;
}
\`\`\`

💡 In competitive programming, everything goes in one file. But real team projects always split files!`
        },
        {
          id: "ch2-header-anim",
          type: "animation",
          component: "headerFiles",
          title: "🔗 How the Three Files Connect",
          content: `💡 **Key insight:** Even without knowing how the function body (\`math.cpp\`) is written, just by reading the **header file (\`math.h\`)** you can know what functions exist and how to use them!

The C++ standard library (\`<iostream>\`, \`<string>\`, etc.) works the same way — we just include the header, and the body is already compiled somewhere.`
        },
        {
          id: "ch2-header-q",
          type: "quiz",
          title: "What's #ifndef for?",
          content: `Why do header files use \`#ifndef\` / \`#define\` / \`#endif\`?`,
          options: [
            "To make functions run faster",
            "To prevent duplicate errors when a header is included twice",
            "To encrypt the header file",
            "To reduce compile time"
          ],
          answer: 1,
          explanation: "#ifndef = 'if not defined'! It ensures a header's contents are only included once, even if #include appears multiple times."
        },
        {
          id: "ch2-header-q2",
          type: "quiz",
          title: "What goes in .h files?",
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
          id: "ch2-proto-pred2",
          type: "predict" as const,
          title: "With prototype?",
          code: "#include <iostream>\nusing namespace std;\n\nint square(int x);  // Prototype!\n\nint main() {\n    cout << square(7);\n    return 0;\n}\n\nint square(int x) {\n    return x * x;\n}",
          options: ["Error", "49", "7", "0"],
          answer: 1,
          explanation: "The prototype is above main, so main() can call square! 7 × 7 = 49!"
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
          id: "ch2-overload-why",
          type: "explain",
          title: "🤔 Multiple Functions with the Same Name?",
          content: `You made a function called add that adds two integers.

Now you want to add **two doubles**. What do you do?

**Option 1: Use different names**
\`\`\`cpp
int add_int(int a, int b) { return a + b; }
double add_double(double a, double b) { return a + b; }
int add_three(int a, int b, int c) { return a + b + c; }
\`\`\`

Names get longer and messier 😩 What if you have 50 functions? \`add_int_int\`, \`add_double_double\`...

**Option 2: Same name, different parameters** ← C++'s solution!

In Python, defining two functions with the same name overwrites the first one.
C++ is different. **If the parameters are different, you can reuse the same name!**

💡 This is called **Function Overloading**.`
        },
        {
          id: "ch2-overload",
          type: "explain",
          title: "🎭 Function Overloading in Practice",
          content: `\`\`\`cpp
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

**How does the compiler choose?**

| Call | Parameters | Function Selected |
|---|---|---|
| \`add(3, 5)\` | 2 ints | \`int add(int, int)\` |
| \`add(1.5, 2.3)\` | 2 doubles | \`double add(double, double)\` |
| \`add(1, 2, 3)\` | 3 ints | \`int add(int, int, int)\` |

C++ automatically picks the right function based on **parameter types and count**!`
        },
        {
          id: "ch2-overload-rules",
          type: "explain",
          title: "⚠️ Overloading Rules & Traps",
          content: `**Overloading works when:**
✅ Parameter **types** differ: \`add(int)\` vs \`add(double)\`
✅ Parameter **count** differs: \`add(int, int)\` vs \`add(int, int, int)\`

**Overloading does NOT work when:**
❌ Only the **return type** is different!

\`\`\`cpp
int calc(int x) { return x * 2; }
double calc(int x) { return x * 2.0; }  // ❌ Error!
\`\`\`

Why? If you call \`calc(5)\`, the compiler **can't tell which one** to use! The parameters are identical.

❌ Only the **variable names** are different!
\`\`\`cpp
int add(int a, int b) { return a + b; }
int add(int x, int y) { return x + y; }  // ❌ Error! Same types
\`\`\`

💡 Remember: overloading requires **different parameter types or count**!`
        },
        {
          id: "ch2-overload-trap",
          type: "predict" as const,
          title: "🪤 What happens with this call?",
          content: `When there's an int version and a double version, what if one argument is int and the other is double?`,
          code: "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\nint main() {\n    cout << add(1, 2.5);  // int + double ??\n    return 0;\n}",
          options: ["3", "3.5", "Compile error (ambiguous)", "Runtime error"],
          answer: 1,
          explanation: "C++ automatically converts int 1 to double 1.0 and calls the double version. Result is 3.5! But these implicit conversions can cause unexpected results, so it's best to match parameter types explicitly."
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
          explanation: "Overloading requires different parameter types or count! double calc(double x) has a different parameter type, so it's valid. Options 1 and 3 have the same parameter types, and option 4 only differs in return type, so they don't work!"
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
    greet("Emma");
    greet("Jake", "Hey");

    cout << "Integers: " << add(3, 5) << endl;
    cout << "Doubles: " << add(1.5, 2.7) << endl;

    return 0;
}`,
          expectedOutput: `Hello, Emma!
Hey, Jake!
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
