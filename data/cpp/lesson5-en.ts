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
          component: "cppIntDivisionBuilder",
          content: `**Why does 5 / 2 = 2?** 🤔

C++ saves memory by making \`int\` calculations produce \`int\` results.
There's no room to store decimals, so it just chops them off!

This is the **biggest difference** between Python and C++!

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
          id: "ch1-pred-modulo",
          type: "predict" as const,
          title: "Modulo in action",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 7;\n    if (n % 2 == 0) {\n        cout << \"even\";\n    } else {\n        cout << \"odd\";\n    }\n    return 0;\n}",
          options: ["even", "odd", "1", "Error"],
          answer: 1,
          explanation: "7 divided by 2 has remainder 1. Since it's not 0, the else block runs! This pattern comes up all the time."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Battle Damage Calculator!",
          content: `Let's make a calculator that takes attack and defense values and shows battle results!

Pay attention to the integer division result — you'll see the decimal part disappear when halving damage!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int attack, defense;
    cout << "Attack: ";
    cin >> attack;
    cout << "Defense: ";
    cin >> defense;

    cout << "Damage: " << attack - defense << endl;
    cout << "Double attack: " << attack * 2 << endl;
    cout << "Half damage: " << attack / 2 << endl;
    cout << "Remainder: " << attack % defense << endl;

    return 0;
}`,
          stdin: `25\n10`,
          expectedOutput: `Attack: 25
Defense: 10
Damage: 15
Double attack: 50
Half damage: 12
Remainder: 5`
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
          id: "ch2-why",
          type: "explain",
          title: "Why do we need to compare values?",
          content: `In a game, you want to give a bonus when the score is 100 or above.
On a shopping site, users 18 or older need age verification.
A robot must stop when the distance to a wall is 10 cm or less.

To make these kinds of **decisions**, you need to compare values!
Comparison operators are the **key ingredient** for the if statements we'll learn next time.`
        },
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

💡 Just remember: \`and\` → \`&&\`, \`or\` → \`||\`, \`not\` → \`!\``,
          component: "cppIfBuilder",
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Connect two conditions together!",
          code: "if ((score >= 90) ___ (score <= 100)) {\n    cout << \"Grade A!\";\n}",
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
          id: "ch2-prefix-postfix",
          type: "explain",
          title: "🔍 Postfix (x++) vs Prefix (++x) — What's the Difference?",
          content: `Both \`x++\` and \`++x\` add 1 to x. But they behave differently **when used with other operations**!

\`\`\`cpp
int x = 5;
cout << x++ << endl;  // Prints 5, THEN x becomes 6
cout << x << endl;    // 6
\`\`\`

\`\`\`cpp
int y = 5;
cout << ++y << endl;  // y becomes 6 FIRST, then prints 6
cout << y << endl;    // 6
\`\`\`

| Type | Order | Memory Trick |
|---|---|---|
| \`x++\` (postfix) | **Use value first** → then +1 | ++ is after → increments "after" |
| \`++x\` (prefix) | **+1 first** → then use value | ++ is before → increments "before" |

💡 When used alone, \`x++;\` and \`++x;\` give the same result! The difference only matters **with cout or assignment**.`
        },
        {
          id: "ch2-pred-prefix",
          type: "predict" as const,
          title: "Guess x++ output!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 10;\n    cout << a++ << endl;\n    cout << a << endl;\n    return 0;\n}",
          options: ["10\\n10", "10\\n11", "11\\n11", "11\\n12"],
          answer: 1,
          explanation: "a++ is postfix: first prints current value 10, THEN a becomes 11. Second line prints 11!"
        },
        {
          id: "ch2-pred-prefix2",
          type: "predict" as const,
          title: "Now try ++x!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int b = 10;\n    cout << ++b << endl;\n    cout << b << endl;\n    return 0;\n}",
          options: ["10\\n10", "10\\n11", "11\\n11", "11\\n12"],
          answer: 2,
          explanation: "++b is prefix: first makes b = 11, THEN prints 11. Second line also prints 11!"
        },
        {
          id: "ch2-q-prefix",
          type: "quiz",
          title: "Postfix vs Prefix!",
          content: `What is the output?

\`\`\`cpp
int x = 3;
int y = x++;
cout << x << " " << y;
\`\`\``,
          options: ["3 3", "4 3", "4 4", "3 4"],
          answer: 1,
          explanation: "x++ is postfix: y gets the current value 3 first, THEN x becomes 4. Result: x=4, y=3!"
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
          id: "ch2-precedence",
          type: "explain",
          title: "⚠️ Watch the Order of Operations!",
          content: `When there are many operators, **order matters**!

\`\`\`cpp
cout << 5 + 3 * 2;   // 11 (not 16!)
\`\`\`

Multiplication (\`*\`) happens before addition (\`+\`). Same as in math!

When in doubt, use **parentheses**:
\`\`\`cpp
cout << (5 + 3) * 2;  // 16 (parentheses first!)
\`\`\`

Comparison and logic have an order too: \`&&\` is evaluated before \`||\`!
\`\`\`cpp
// a || b && c  is the same as  a || (b && c)!
\`\`\`

💡 Remember: **"parentheses > arithmetic > comparison > logic"**!
→ When in doubt, just use parentheses. It makes code easier to read too! 😊`
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
          title: "✋ Battle Turn Simulator!",
          content: `This program checks HP conditions using comparison, logic, increment, and compound assignment operators!

Try different HP values to see how the results change!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int hp;
    cin >> hp;

    // Comparison operators
    cout << "hp > 50: " << (hp > 50) << endl;
    cout << "hp == 100: " << (hp == 100) << endl;

    // Logic operators
    cout << "hp > 0 && hp <= 100: " << (hp > 0 && hp <= 100) << endl;
    cout << "hp <= 0 || hp >= 100: " << (hp <= 0 || hp >= 100) << endl;

    // Increment/decrement
    cout << "hp = " << hp << endl;
    hp++;
    cout << "After hp++: " << hp << endl;
    hp--;
    cout << "After hp--: " << hp << endl;

    // Compound assignment (take damage)
    hp -= 10;
    cout << "After hp -= 10: " << hp << endl;

    return 0;
}`,
          stdin: `75`,
          expectedOutput: `hp > 50: 1
hp == 100: 0
hp > 0 && hp <= 100: 1
hp <= 0 || hp >= 100: 0
hp = 75
After hp++: 76
After hp--: 75
After hp -= 10: 65`
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
          id: "ch3-q5",
          type: "quiz",
          title: "x++ vs ++x",
          content: `What does this print?

\`\`\`cpp
int a = 5;
int b = ++a;
cout << a << " " << b;
\`\`\``,
          options: ["5 5", "5 6", "6 6", "6 5"],
          answer: 2,
          explanation: "++a is prefix: first makes a = 6, then assigns 6 to b. Result: a=6, b=6!"
        },
        {
          id: "ch3-q6",
          type: "quiz",
          title: "Combined tracking!",
          content: `What does this print?

\`\`\`cpp
int x = 8;
x += 2;
x--;
x *= 3;
cout << x;
\`\`\``,
          options: ["27", "30", "24", "21"],
          answer: 0,
          explanation: "x=8 → x+=2 → 10 → x-- → 9 → x*=3 → 27! Just trace it line by line."
        },
        {
          id: "ch3-q7",
          type: "quiz",
          title: "Logic + comparison combo",
          content: `What does this print?

\`\`\`cpp
int a = 3, b = 7;
cout << (a != b && b > 5);
\`\`\``,
          options: ["0", "1", "true", "Error"],
          answer: 1,
          explanation: "a != b → true (3≠7), b > 5 → true (7>5). true && true = true! C++ prints true as 1."
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ Experiment with x++ vs ++x!",
          content: `Start with **x = 5** and complete the code to match the expected output below.

See for yourself why postfix (x++) and prefix (++x) print different numbers!`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int x = 5;

    // Postfix: use value first, then +1
    cout << "=== Postfix x++ ===" << endl;
    // Write your code here

    cout << endl;
    x = 5;  // reset

    // Prefix: +1 first, then use value
    cout << "=== Prefix ++x ===" << endl;
    // Write your code here

    return 0;
}`,
          expectedOutput: `=== Postfix x++ ===
x start: 5
x++ = 5
x now: 6

=== Prefix ++x ===
x start: 5
++x = 6
x now: 6`
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
- ✅ **x++ vs ++x** — postfix = "use then increment", prefix = "increment then use"!

🚀 **Next time: Conditionals (if/else)** — Curly braces {} and else if!`
        }
      ]
    }
  ]
}
