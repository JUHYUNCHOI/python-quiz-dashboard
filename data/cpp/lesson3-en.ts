// ============================================
// C++ Lesson 3: Variables & Types
// C++ for students who already know Python
// ============================================

import { LessonData } from '../types'

export const cppLesson3EnData: LessonData = {
  id: "cpp-3",
  title: "Variables & Types",
  emoji: "📦",
  description: "int, double, string — you choose the type!",
  chapters: [
    // ============================================
    // Chapter 1: int / double / string declarations
    // ============================================
    {
      id: "ch1",
      title: "Choose Your Type!",
      emoji: "🆚",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 How is it different from Python?",
          content: `In Python, \`x = 10\` and you're done, right?
C++ is different! **You have to specify the type when creating a variable.**

**Python 🐍** — Types are automatic
\`\`\`python
x = 10         # Automatically an integer
x = "hello"    # Changed to string? No problem!
\`\`\`

**C++ ⚡** — You specify the type
\`\`\`cpp
int x = 10;         // "This is an integer!"
x = 20;             // OK! Integer to integer is fine
// x = "hello";     // ❌ Error! Can't put a string in an int variable!
\`\`\`

Why so strict? 🤔
→ It catches mistakes **at compile time**! In Python, you only find errors when you run the code.

💡 A C++ variable = **a typed box**. Only integers can go in an integer box!`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 The 5 Main C++ Types",
          content: `Let's look at the most common types!

| C++ Type | Meaning | Example |
|----------|---------|---------|
| \`int\` | Integer | \`int age = 14;\` |
| \`double\` | Decimal (float) | \`double pi = 3.14;\` |
| \`string\` | Text | \`string name = "Alice";\` |
| \`char\` | Single character | \`char grade = 'A';\` |
| \`bool\` | True/False | \`bool pass = true;\` |

The 3 most used are **int, double, string**!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x = 10\` (auto type) | \`int x = 10;\` (explicit type) |
| \`True / False\` (uppercase) | \`true / false\` (lowercase!) |

💡 Python's True/False is uppercase, C++'s true/false is **lowercase**!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "What happens here?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 10;\n    x = 20;\n    cout << x << endl;\n    return 0;\n}',
          options: ["10", "20", "Error"],
          answer: 1,
          explanation: "We put 10 in int x, then changed it to 20. Reassigning the same type (integer) is totally fine!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Pick the right type for each variable!",
          code: "___ age = 14;\n___ pi = 3.14;\n___ name = \"Alice\";",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "double", "string", "char"] },
            { id: 1, answer: "double", options: ["int", "double", "string", "char"] },
            { id: 2, answer: "string", options: ["int", "double", "string", "char"] }
          ],
          explanation: "Integers use int, decimals use double, and text uses string!"
        },
        {
          id: "ch1-char",
          type: "explain",
          title: "🔤 char vs string — Different quotes!",
          content: `\`\`\`cpp
char grade = 'A';       // Single quotes → exactly 1 character
string name = "Alice";  // Double quotes → text (string)
\`\`\`

| Quotes | Type | Examples |
|--------|------|----------|
| Single quotes \`' '\` | **char** (1 character) | \`'A'\`, \`'7'\` |
| Double quotes \`" "\` | **string** (text) | \`"Hello"\`, \`"A"\` |

💭 What if you write \`char x = 'AB';\`? → **Error**! char holds exactly 1 character!

In Python, \`' '\` and \`" "\` are the same, but in C++ they are **completely different types**!`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Create Your Own Variables!",
          content: `Let's use int, double, and string to make a self-introduction program!

**Type the code below** in your editor, compile it, and run it.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 14;
    double height = 165.5;

    cout << "Name: " << name << endl;
    cout << "Age: " << age << " years old" << endl;
    cout << "Height: " << height << "cm" << endl;

    return 0;
}`,
          expectedOutput: `Name: Alice
Age: 14 years old
Height: 165.5cm`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Match the type!",
          content: `What C++ type stores decimal (floating-point) numbers?`,
          options: [
            "int",
            "char",
            "double",
            "bool"
          ],
          answer: 2,
          explanation: "double stores decimal numbers! int is for integers only, char for a single character, bool for true/false."
        }
      ]
    },
    // ============================================
    // Chapter 2: Declaration, const, type conversion
    // ============================================
    {
      id: "ch2",
      title: "Type Rules",
      emoji: "✏️",
      steps: [
        {
          id: "ch2-declare",
          type: "explain",
          title: "📝 Declaration & Initialization",
          content: `There are two ways to create a variable!

\`\`\`cpp
int age;           // Declaration only (making an empty box)
age = 14;          // Assign a value later

int score = 100;   // Declare + initialize at once! (Recommended! ✅)
\`\`\`

For values that should never change, add **const**:
\`\`\`cpp
const double PI = 3.14159;
// PI = 0;  // ❌ Compile error! Can't change it
\`\`\`

Python has no real constant syntax, but C++ uses const so the **compiler protects it**!

💡 const = **a value that never changes**. Perfect for fixed values like π (pi)!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Watch out for this trap! 🕳️",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    double result = 7 / 2;\n    cout << result << endl;\n    return 0;\n}",
          options: ["3.5", "3", "3.0", "Error"],
          answer: 1,
          explanation: "7 and 2 are both ints, so 7/2 = 3 (integer division) happens first! Then 3 goes into the double as 3.0 internally, but cout prints just 3 (drops the .0 when it's zero). For 3.5, write 7.0 / 2!"
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "🔄 Type Conversion",
          content: `**Automatic conversion** — small type → big type happens automatically!
\`\`\`cpp
int a = 10;
double b = a;  // int → double automatic! (internally 10.0, but cout prints 10)
\`\`\`

**String ↔ Number conversion** — you need functions!
\`\`\`cpp
int num = stoi("123");       // string → int
double dec = stod("3.14");   // string → double
string s = to_string(456);   // int → string "456"
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`int("123")\` | \`stoi("123")\` |
| \`float("3.14")\` | \`stod("3.14")\` |
| \`str(456)\` | \`to_string(456)\` |

💡 stoi = **s**tring **to** **i**nt — just remember the abbreviation!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Convert between strings and numbers!",
          code: "int num = ___(\"42\");\nstring s = ___(100);",
          fillBlanks: [
            { id: 0, answer: "stoi", options: ["stoi", "int", "toInt", "parseInt"] },
            { id: 1, answer: "to_string", options: ["to_string", "str", "string", "toString"] }
          ],
          explanation: "stoi = string to int, to_string = number to string! These correspond to Python's int() and str()."
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "Auto-conversion test!",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10;\n    double b = a;\n    cout << b << endl;\n    return 0;\n}",
          options: ["10", "10.0", "Error", "0"],
          answer: 0,
          explanation: "int 10 is automatically converted to double. cout omits the decimal when it's .0, so it prints 10!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Try Type Conversion Yourself!",
          content: `Let's use stoi, stod, and to_string to convert between strings and numbers!

Run it and try changing the values to see what happens!`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string numStr = "42";
    int num = stoi(numStr);
    cout << num + 8 << endl;

    double pi = stod("3.14");
    cout << pi * 2 << endl;

    string result = to_string(100) + " points";
    cout << result << endl;

    return 0;
}`,
          expectedOutput: `50
6.28
100 points`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "Type conversion function!",
          content: `What's the C++ equivalent of Python's \`int("42")\`?`,
          options: [
            `int("42")`,
            `stoi("42")`,
            `toInt("42")`,
            `parseInt("42")`
          ],
          answer: 1,
          explanation: "C++ uses stoi (string to int) to convert strings to integers! It's like Python's int()."
        }
      ]
    },
    // ============================================
    // Chapter 3: Review Quiz
    // ============================================
    {
      id: "ch3",
      title: "Review Quiz",
      emoji: "🧪",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "Python → C++",
          content: `How do you convert Python's \`name = "Alice"\` to C++?`,
          options: [
            `char name = "Alice";`,
            `string name = "Alice";`,
            `str name = "Alice";`,
            `text name = "Alice";`
          ],
          answer: 1,
          explanation: "C++ uses string for text! char holds only 1 character, and str/text don't exist in C++."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Declaration syntax",
          content: `Which is the correct way to declare a variable in C++?`,
          options: [
            "x = 10;",
            "int x = 10;",
            "var x = 10;",
            "let x = 10;"
          ],
          answer: 1,
          explanation: "In C++, you must always put the type (int) before the variable name! var and let are JavaScript syntax."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "char vs string",
          content: `Which of the following is correct C++ code?`,
          options: [
            `char grade = "A";`,
            `char grade = 'AB';`,
            `char grade = 'A';`,
            `char grade = A;`
          ],
          answer: 2,
          explanation: "char uses single quotes ' ' and can hold exactly 1 character!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Understanding const",
          content: `What happens with this code?

\`\`\`cpp
const int MAX = 100;
MAX = 200;
cout << MAX << endl;
\`\`\``,
          options: [
            "100",
            "200",
            "Compile error!",
            "0"
          ],
          answer: 2,
          explanation: "A variable declared with const cannot be changed! MAX = 200; causes a compile error."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **Type specification** — C++ requires you to specify the type when creating variables
- ✅ **int** — integers, **double** — decimals, **string** — text
- ✅ **char** — single character (single quotes!), **bool** — true/false
- ✅ **const** — a variable whose value can never change
- ✅ **Integer division trap** — int / int drops the decimal!
- ✅ **Type conversion** — stoi(), stod(), to_string()

🚀 **Next time: Advanced cout & namespace** — Print all kinds of things and discover what std:: really means!`
        }
      ]
    }
  ]
}
