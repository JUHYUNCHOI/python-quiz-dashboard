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
          component: "cppVariableBuilder",
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
          id: "ch1-typefix",
          type: "explain",
          title: "Once you set a type, you can't change it!",
          content: `In Python, you could do \`x = 10\` then \`x = "hello"\` — no problem. In C++, that's **impossible**!

\`\`\`cpp
int x = 10;
x = "hello";   // ❌ Compile error!
\`\`\`

The type you choose at the start sticks forever. An integer box can only hold integers, a string box can only hold strings!

**But why is C++ so strict?** 🤔
When you create a variable, C++ **reserves memory space** right away. \`int\` takes 4 bytes, \`double\` takes 8 bytes — each type needs a different amount. If the type could change, the reserved space wouldn't match!

💡 It seems annoying, but it catches mistakes **before your program even runs**! Up next, let's see how much memory each type actually uses →`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 The 5 Main C++ Types",
          component: "memoryTypeVisualizer",
          content: `Let's look at the most common types!

| C++ Type | Meaning | Example |
|----------|---------|---------|
| \`int\` | Integer | \`int age = 14;\` |
| \`double\` | Decimal (float) | \`double pi = 3.14;\` |
| \`string\` | Text | \`string name = "Emma";\` |
| \`char\` | Single character | \`char grade = 'A';\` |
| \`bool\` | True/False | \`bool pass = true;\` |

The 3 most used are **int, double, string**!

⚠️ **To use string**, you need \`#include <string>\` at the top!
\`\`\`cpp
#include <iostream>
#include <string>    // ← Required for string type!
\`\`\`
int, double, char, bool are built-in, but **string comes from a library** — you must include it.

Each type uses a **different amount of memory**. Check out the animation below to see how many bytes each type takes! 👇

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
          code: "___ age = 14;\n___ pi = 3.14;\n___ name = \"Emma\";",
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
          component: "cppCharBuilder",
          content: `\`\`\`cpp
char grade = 'A';       // Single quotes → exactly 1 character
string name = "Emma";  // Double quotes → text (string)
\`\`\`

| Quotes | Type | Examples |
|--------|------|----------|
| Single quotes \`' '\` | **char** (1 character) | \`'A'\`, \`'7'\` |
| Double quotes \`" "\` | **string** (text) | \`"Hello"\`, \`"A"\` |

💭 What if you write \`char x = 'AB';\`? → **Error**! char holds exactly 1 character!

In Python, \`' '\` and \`" "\` are the same, but in C++ they are **completely different types**!

💡 Why does char exist separately? A single character takes only 1 byte of memory. When storing a million characters, it's much more efficient than string!`
        },
        {
          id: "ch1-ascii",
          type: "explain",
          title: "🔢 char's Secret — It's Actually a Number!",
          content: `char values are stored internally as **integers**. Each character has a unique number called its **ASCII code**.

\`\`\`cpp
char c = 'A';
cout << c << endl;        // A
cout << (int)c << endl;   // 65 ← ASCII code of 'A'
\`\`\`

Common ASCII codes:
| Character | ASCII |
|-----------|-------|
| \`'A'\` | 65 |
| \`'Z'\` | 90 |
| \`'a'\` | 97 |
| \`'z'\` | 122 |
| \`'0'\` | 48 |

💡 Writing \`(int)c\` converts a char to its numeric value — this is called **type casting**!`,
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Create Your RPG Character!",
          content: `Let's use int and string to display RPG character stats!

**Type the code below** in your editor, compile it, and run it.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Slime";
    int hp = 100;
    int attack = 25;
    int level = 3;

    cout << "Name: " << name << endl;
    cout << "HP: " << hp << endl;
    cout << "Attack: " << attack << endl;
    cout << "Level: " << level << endl;

    return 0;
}`,
          expectedOutput: `Name: Slime
HP: 100
Attack: 25
Level: 3`
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

💡 const = **a value that never changes**. Perfect for fixed values like π (pi)!

With const, the compiler catches you if you accidentally try to change the value! Protect fixed values like pi with const.

For example, in a game you might set \`const double GRAVITY = 9.8;\`. If you accidentally write \`GRAVITY = 0;\`, the **compiler gives an error immediately**. Without const, the program would behave strangely and you'd have a very hard time finding the bug.`
        },
        {
          id: "ch2-division-trap",
          type: "explain",
          title: "⚠️ Trap: Integer Division",
          content: `When you divide int by int in C++, the decimal part gets **chopped off**!

7 / 2 is NOT 3.5 — it becomes **3**.

Why? Because the result of an int operation is also an int.

Want the decimal result? Make at least one side a double:

\`7.0 / 2\` → \`3.5\` ✅`
        },
        {
          id: "ch2-casting",
          type: "explain",
          title: "🔧 Type Casting",
          content: `**Type casting** means explicitly converting a value to a different type.

The syntax is simple:
\`\`\`cpp
(target_type) value
\`\`\`

**① int ↔ double casting**
\`\`\`cpp
int a = 7, b = 2;
double result = (double)a / b;  // 3.5 ✅
// (double)a converts to 7.0 first → 7.0 / 2 = 3.5
\`\`\`

Watch out! Parentheses placement matters:
\`\`\`cpp
(double)(a / b)  // ❌ 3.0  → division happens first!
(double)a / b    // ✅ 3.5  → a is cast first, then divided
\`\`\`

**② char ↔ int casting**
\`\`\`cpp
char c = 'A';
cout << (int)c << endl;   // 65  (char → int: prints ASCII code)

int n = 66;
cout << (char)n << endl;  // B   (int → char: ASCII code → character)
\`\`\`

💡 Same as Python's \`ord('A')\` = 65 and \`chr(66)\` = 'B'!`,
        },
        {
          id: "ch2-casting-q1",
          type: "quiz",
          title: "Casting quiz!",
          content: `What does this code print?\n\n\`\`\`cpp\nint a = 5, b = 2;\ncout << (double)a / b << endl;\n\`\`\``,
          options: ["2", "2.5", "2.0", "Error"],
          answer: 1,
          explanation: "(double)a converts a to 5.0 first, then divides by b (=2). 5.0 / 2 = 2.5! If it were (double)(a/b), you'd get 2.0."
        },
        {
          id: "ch2-casting-q2",
          type: "quiz",
          title: "char casting!",
          content: `What does this code print?\n\n\`\`\`cpp\nint n = 66;\ncout << (char)n << endl;\n\`\`\``,
          options: ["66", "B", "A", "Error"],
          answer: 1,
          explanation: "(char)66 prints the character with ASCII code 66, which is 'B'. 'A'=65, 'B'=66, 'C'=67."
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
          component: "cppTypeConvertBuilder",
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
          title: "✋ Damage Calculator!",
          content: `Two variables are already declared below:

\`\`\`cpp
string rawDamage = "25";      // damage as a string
string rawMultiplier = "1.5"; // multiplier as a string
\`\`\`

1. Convert \`rawDamage\` to an integer and print it doubled (25 × 2 = 50)
2. Convert \`rawMultiplier\` to a double and print it doubled (1.5 × 2 = 3)
3. Convert the damage (50) to a string using \`to_string()\` and **concatenate** \`" damage!"\` to print it

💡 **String concatenation (+)** — joining two strings together.
\`\`\`cpp
int dmg = 50;
cout << to_string(dmg) + " damage!" << endl;   // 50 damage!
\`\`\``,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string rawDamage = "25";
    string rawMultiplier = "1.5";

    // Write your code here

    return 0;
}`,
          expectedOutput: `50
3
50 damage!`
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
        },
        {
          id: "ch2-q2",
          type: "quiz",
          title: "Understanding const!",
          content: `Which line causes an error?\n\n\`\`\`cpp\nconst double PI = 3.14;\ndouble r = 5.0;\nPI = 3.14159;\ncout << PI * r * r << endl;\n\`\`\``,
          options: [
            "Line 1 (const double PI = 3.14;)",
            "Line 2 (double r = 5.0;)",
            "Line 3 (PI = 3.14159;)",
            "Line 4 (cout << PI * r * r;)"
          ],
          answer: 2,
          explanation: "PI is declared with const, so its value can't be changed! Line 3 tries to assign a new value to PI, causing a compile error."
        },
        {
          id: "ch2-q3",
          type: "quiz",
          title: "Integer division trap!",
          content: `What does this code print?\n\n\`\`\`cpp\nint a = 5;\nint b = 2;\ncout << a / b << endl;\n\`\`\``,
          options: [
            "2.5",
            "2",
            "3",
            "Error"
          ],
          answer: 1,
          explanation: "When dividing int by int, the decimal part is dropped! 5 / 2 = 2, not 2.5. For 2.5, write 5.0 / 2!"
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
          content: `How do you convert Python's \`name = "Emma"\` to C++?`,
          options: [
            `char name = "Emma";`,
            `string name = "Emma";`,
            `str name = "Emma";`,
            `text name = "Emma";`
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
