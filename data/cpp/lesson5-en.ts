// ============================================
// C++ Lesson 5: Operators
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson5EnData: LessonData = {
  id: "cpp-5",
  title: "Operators",
  emoji: "🔢",
  description: "C++ operators — what's different from Python?",
  chapters: [
    // ============================================
    // Chapter 1: Arithmetic operators
    // ============================================
    {
      id: "ch1",
      title: "Arithmetic Operators",
      emoji: "➕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "➕ Basic Arithmetic",
          content: `C++ uses \`+\`, \`-\`, \`*\`, \`/\` just like Python!

\`\`\`cpp
int a = 10 + 3;   // 13
int b = 10 - 3;   // 7
int c = 10 * 3;   // 30
\`\`\`

Addition, subtraction, and multiplication are **exactly the same** as Python! 👍

But... **division** has a big surprise! 😱`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Easy one!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 5 + 3;\n    return 0;\n}",
          options: ["8", "53", "5 + 3", "Error"],
          answer: 0,
          explanation: "Integer addition! 5 + 3 = 8."
        },
        {
          id: "ch1-division",
          type: "explain",
          title: "⚠️ The Integer Division Trap!",
          content: `This is the **biggest difference** between Python and C++!

**Python 🐍:** \`5 / 2\` → \`2.5\` ✅
**C++ ⚡:** \`5 / 2\` → \`2\` 😱 (decimal part is dropped!)

\`\`\`cpp
cout << 5 / 2;     // 2 (int / int = int result!)
cout << 5.0 / 2;   // 2.5 (at least one double = OK!)
cout << 5 / 2.0;   // 2.5 (this works too!)
\`\`\`

To get a decimal result, make **at least one number a double**!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`5 / 2\` → 2.5 | \`5 / 2\` → 2 (integer division!) |
| \`5 // 2\` → 2 (floor division) | \`5.0 / 2\` → 2.5 |

💡 C++ doesn't have the \`//\` operator! When ints divide, it **automatically** does integer division.`
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "Don't fall for the trap!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 7 / 2;\n    return 0;\n}",
          options: ["3.5", "3", "4", "Error"],
          answer: 1,
          explanation: "In C++, int / int = int! 7 / 2 = 3 (decimal dropped). For 3.5, use 7.0 / 2!"
        },
        {
          id: "ch1-modulo",
          type: "explain",
          title: "➗ Modulo Operator (%)",
          content: `The modulo operator \`%\` is the same as Python!

\`\`\`cpp
cout << 10 % 3;  // 1 (10 ÷ 3 = 3 remainder 1)
cout << 8 % 2;   // 0 (even numbers have 0 remainder!)
cout << 15 % 4;  // 3 (15 = 4 × 3 + 3)
\`\`\`

% is commonly used for **even/odd checks**!
→ \`x % 2 == 0\` means even, \`x % 2 == 1\` means odd!

💡 Modulo works the same as Python — feel right at home! 😊`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Build a Calculator!",
          content: `Let's make a calculator that takes two numbers and shows all arithmetic results!

Pay attention to the integer division result — you'll see the decimal part disappear!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "First number: ";
    cin >> a;
    cout << "Second number: ";
    cin >> b;

    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " * " << b << " = " << a * b << endl;
    cout << a << " / " << b << " = " << a / b << endl;
    cout << a << " % " << b << " = " << a % b << endl;

    return 0;
}`,
          expectedOutput: `First number: 10
Second number: 3
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3
10 % 3 = 1`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "Modulo!",
          content: `What is \`15 % 4\` in C++?`,
          options: ["3", "4", "3.75", "0"],
          answer: 0,
          explanation: "15 / 4 = 3 remainder 3! Since 15 = 4 × 3 + 3, the remainder is 3."
        }
      ]
    },
    // ============================================
    // Chapter 2: Comparison, logic, increment
    // ============================================
    {
      id: "ch2",
      title: "Comparison & Logic",
      emoji: "⚖️",
      steps: [
        {
          id: "ch2-compare",
          type: "explain",
          title: "⚖️ Comparison Operators",
          content: `Comparison operators are almost the same as Python!

\`\`\`cpp
cout << (5 == 5);   // 1 (true)
cout << (3 > 5);    // 0 (false)
cout << (10 != 3);  // 1 (true)
\`\`\`

One note: C++ prints true/false as **1 and 0**!

| Operator | Meaning | Difference from Python |
|----------|---------|----------------------|
| \`==\` | Equal | Same ✅ |
| \`!=\` | Not equal | Same ✅ |
| \`<\`, \`>\`, \`<=\`, \`>=\` | Compare | Same ✅ |
| Output | **1 / 0** | Python shows True / False |

💡 In C++, true = 1, false = 0! It looks weird at first but you'll get used to it.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "true? false?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << (10 != 10);\n    return 0;\n}",
          options: ["0", "1", "false", "Error"],
          answer: 0,
          explanation: "10 != 10 is false, and C++ prints false as 0!"
        },
        {
          id: "ch2-logic",
          type: "explain",
          title: "🔗 Logic Operators Are Different!",
          content: `This is where the biggest change happens!

| Meaning | Python 🐍 | C++ ⚡ |
|---------|-----------|-------|
| AND | \`and\` | \`&&\` |
| OR | \`or\` | \`\\|\\|\` |
| NOT | \`not\` | \`!\` |

\`\`\`cpp
// Python: if x > 0 and x < 10:
if (x > 0 && x < 10) {
    cout << "Single digit positive!";
}

// Python: if not finished:
if (!finished) {
    cout << "Not yet!";
}
\`\`\`

💡 Just remember: \`and\` → \`&&\`, \`or\` → \`||\`, \`not\` → \`!\``
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Connect two conditions together!",
          code: "if (score >= 90 ___ score <= 100) {\n    cout << \"Grade A!\";\n}",
          fillBlanks: [
            { id: 0, answer: "&&", options: ["&&", "||", "and", "&"] }
          ],
          explanation: "In C++, 'and' becomes &&. It means both conditions must be true!"
        },
        {
          id: "ch2-increment",
          type: "explain",
          title: "🆕 ++ and -- (Not in Python!)",
          content: `C++ has special operators that Python **doesn't have**!

\`\`\`cpp
int x = 5;
x++;    // x = x + 1 → 6
x--;    // x = x - 1 → 5
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`x += 1\` | \`x++\` (shorter!) |
| \`x -= 1\` | \`x--\` |

💡 Fun fact: The name **C++** itself means "C plus one (++)"! 😄`
        },
        {
          id: "ch2-pred-inc",
          type: "predict" as const,
          title: "++ practice!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3;\n    a++;\n    a++;\n    cout << a;\n    return 0;\n}",
          options: ["3", "4", "5", "Error"],
          answer: 2,
          explanation: "a = 3 → a++ → 4 → a++ → 5! Two increments: 3 + 2 = 5."
        },
        {
          id: "ch2-compound",
          type: "explain",
          title: "📝 Compound Assignment (+=, -=, ...)",
          content: `The \`+=\`, \`-=\` you used in Python work exactly the same in C++!

\`\`\`cpp
int score = 100;
score += 10;   // score = score + 10 → 110
score -= 30;   // score = score - 30 → 80
score *= 2;    // score = score * 2 → 160
score /= 4;    // score = score / 4 → 40
score %= 3;    // score = score % 3 → 1
\`\`\`

| Operator | Meaning | Example |
|---|---|---|
| \`+=\` | Add & assign | \`x += 5\` → \`x = x + 5\` |
| \`-=\` | Subtract & assign | \`x -= 3\` → \`x = x - 3\` |
| \`*=\` | Multiply & assign | \`x *= 2\` → \`x = x * 2\` |
| \`/=\` | Divide & assign | \`x /= 4\` → \`x = x / 4\` |
| \`%=\` | Modulo & assign | \`x %= 3\` → \`x = x % 3\` |

💡 These are exactly the same as Python! C++ just adds \`x++\` and \`x--\` on top!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "Track the increments!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    x++;\n    x++;\n    x--;\n    cout << x;\n    return 0;\n}",
          options: ["10", "11", "12", "9"],
          answer: 1,
          explanation: "x = 10 → x++ → 11 → x++ → 12 → x-- → 11. Final result is 11!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Try All the Operators!",
          content: `This program uses comparison, logic, increment, and compound assignment operators!

Run it and try changing x to see how the results change!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;

    // Comparison operators
    cout << "x > 5: " << (x > 5) << endl;
    cout << "x == 7: " << (x == 7) << endl;

    // Logic operators
    cout << "x > 0 && x < 10: " << (x > 0 && x < 10) << endl;
    cout << "x < 0 || x > 5: " << (x < 0 || x > 5) << endl;

    // Increment/decrement
    cout << "x = " << x << endl;
    x++;
    cout << "After x++: " << x << endl;
    x--;
    cout << "After x--: " << x << endl;

    // Compound assignment
    x += 10;
    cout << "After x += 10: " << x << endl;

    return 0;
}`,
          expectedOutput: `x > 5: 1
x == 7: 1
x > 0 && x < 10: 1
x < 0 || x > 5: 1
x = 7
After x++: 8
After x--: 7
After x += 10: 17`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "++ operator!",
          content: `What's the C++ equivalent of Python's \`x += 1\`?`,
          options: [
            "x + 1",
            "x++",
            "x =+ 1",
            "++x(1)"
          ],
          answer: 1,
          explanation: "C++'s x++ means x = x + 1! It's shorter than Python's x += 1."
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
          title: "Division + Modulo",
          content: `What does this C++ code print?

\`\`\`cpp
int a = 17 / 5;
int b = 17 % 5;
cout << a << " " << b;
\`\`\``,
          options: ["3.4 2", "3 2", "3 3", "4 2"],
          answer: 1,
          explanation: "17 / 5 = 3 (integer division!), 17 % 5 = 2 (17 = 5×3 + 2). Output: 3 2"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Missing operator",
          content: "Which operator exists in Python but **not** in C++?",
          options: ["++", "//", "%", "!="],
          answer: 1,
          explanation: "// (floor division) is Python only! In C++, dividing ints automatically does integer division."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Logic operator",
          content: `What does result print?

\`\`\`cpp
int x = 5;
bool result = (x > 3 && x < 10);
cout << result;
\`\`\``,
          options: ["True", "1", "true", "0"],
          answer: 1,
          explanation: "x=5 is > 3 (true) AND < 10 (true), so true && true = true! C++ prints bool as 1."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Double division",
          content: `What does this print?

\`\`\`cpp
double result = 5.0 / 2;
cout << result;
\`\`\``,
          options: ["2", "2.5", "2.0", "Error"],
          answer: 1,
          explanation: "5.0 is a double, so 5.0 / 2 = 2.5! If at least one operand is a double, the result is double."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **Arithmetic** — +, -, * same as Python!
- ✅ **Integer division** — int / int drops decimals! (7/2 = 3)
- ✅ **Modulo** — % operator is the same as Python
- ✅ **Comparison** — ==, !=, <, > same, but output is 1/0
- ✅ **Logic operators** — and → &&, or → ||, not → !
- ✅ **Increment/Decrement** — x++, x-- (not in Python!)

🚀 **Next time: Conditionals (if/else)** — Curly braces {} and else if!`
        }
      ]
    }
  ]
}
