// ============================================
// C++ Lesson 6: Conditionals (if/else)
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson6EnData: LessonData = {
  id: "cpp-6",
  title: "Conditionals (if/else)",
  emoji: "🔀",
  description: "C++ conditionals with curly braces {}!",
  chapters: [
    // ============================================
    // Chapter 1: if basics
    // ============================================
    {
      id: "ch1",
      title: "if Statement Basics",
      emoji: "🔍",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔍 if: Python vs C++",
          content: `Let's compare Python and C++ if statements!

**Python 🐍:**
\`\`\`python
if x > 0:
    print("positive!")
\`\`\`

**C++ ⚡:**
\`\`\`cpp
if (x > 0) {
    cout << "positive!";
}
\`\`\`

**3 differences:**
1. Condition must be wrapped in **parentheses ()**
2. **Curly braces {}** instead of colon (:)
3. **Indentation** is optional! (Python requires it)

| Python 🐍 | C++ ⚡ |
|---|---|
| \`if condition:\` | \`if (condition) {\` |
| Indentation required | Curly braces {} required |
| Colon : | Curly braces { } |

💡 C++ just needs **() and {}** — remember those two!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Write a C++ if statement with braces!",
          code: "___ (score >= 90) ___\n    cout << \"Grade A!\";\n___",
          fillBlanks: [
            { id: 0, answer: "if", options: ["if", "If", "IF", "when"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++ if: if (condition) { code } — parentheses for condition, braces for code block!"
        },
        {
          id: "ch1-braces",
          type: "explain",
          title: "⚠️ What if you forget the braces?",
          content: `Without braces, only the **very next line** belongs to the if!

\`\`\`cpp
// ❌ No braces = dangerous!
if (score >= 90)
    cout << "Grade A!";
    cout << "Congrats!";  // This ALWAYS runs!
\`\`\`

\`\`\`cpp
// ✅ With braces = safe!
if (score >= 90) {
    cout << "Grade A!";
    cout << "Congrats!";  // This is inside the if too!
}
\`\`\`

Python uses indentation for blocks, but C++ uses **curly braces {}**.
Even if the code looks indented, without braces it doesn't matter!

💡 Always use braces — it prevents bugs!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Watch out!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 3;\n    if (x > 5)\n        cout << \"A\";\n        cout << \"B\";\n    return 0;\n}",
          options: ["Nothing", "A", "B", "AB"],
          answer: 2,
          explanation: "Without braces, if only controls the next line! 'A' doesn't print (false), but 'B' always runs."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "if syntax!",
          content: "What symbol wraps the condition in a C++ if statement?",
          options: ["Colon :", "Curly braces {}", "Parentheses ()", "Square brackets []"],
          answer: 2,
          explanation: "C++ if wraps the condition in parentheses ()! if (condition) { code }"
        }
      ]
    },
    // ============================================
    // Chapter 2: else if, else, ternary
    // ============================================
    {
      id: "ch2",
      title: "else if & Ternary",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-elseif",
          type: "explain",
          title: "🔗 elif becomes else if!",
          content: `Python's \`elif\` becomes \`else if\` (two words!) in C++.

\`\`\`cpp
if (score >= 90) {
    cout << "A";
} else if (score >= 80) {
    cout << "B";
} else if (score >= 70) {
    cout << "C";
} else {
    cout << "F";
}
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`elif\` | \`else if\` (two words!) |
| \`else:\` | \`else {\` |

💡 \`elif\` is Python only! C++ always uses \`else if\` (with a space).`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Which one prints?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 7;\n    if (x > 10) {\n        cout << \"A\";\n    } else if (x > 5) {\n        cout << \"B\";\n    } else {\n        cout << \"C\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "AB"],
          answer: 1,
          explanation: "x=7: x > 10? No. x > 5? Yes! → 'B' prints! else if checks top-down and runs only the first match."
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Complete the temperature checker!",
          code: "if (temp >= 30) {\n    cout << \"Hot\";\n} ___ ___ (temp >= 20) {\n    cout << \"Nice\";\n} ___ {\n    cout << \"Cold\";\n}",
          fillBlanks: [
            { id: 0, answer: "else", options: ["else", "elif", "or", "then"] },
            { id: 1, answer: "if", options: ["if", "when", "case", "for"] },
            { id: 2, answer: "else", options: ["else", "default", "elif", "other"] }
          ],
          explanation: "Python's elif becomes else if (two words) in C++. The final catch-all is else."
        },
        {
          id: "ch2-ternary",
          type: "explain",
          title: "⚡ Ternary Operator (one-line if!)",
          content: `Simple conditions can be written in one line!

**C++ ⚡:** \`condition ? trueValue : falseValue\`
**Python 🐍:** \`trueValue if condition else falseValue\`

\`\`\`cpp
string result = (x > 0) ? "positive" : "negative";
// If x is positive → "positive", else → "negative"!
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`"pos" if x > 0 else "neg"\` | \`(x > 0) ? "pos" : "neg"\` |
| True value first | Condition first |

💡 The order is different! Python: "value if cond else value", C++: "cond ? value : value"`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "Ternary!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int age = 15;\n    string msg = (age >= 18) ? \"adult\" : \"minor\";\n    cout << msg;\n    return 0;\n}",
          options: ["adult", "minor", "Error", "18"],
          answer: 1,
          explanation: "age=15, and 15 >= 18 is false! The ternary picks the value after : which is 'minor'."
        },
        {
          id: "ch2-switch",
          type: "explain",
          title: "🔀 switch-case (Comparing Multiple Values!)",
          content: `When you have too many if-else if's, you can use **switch**!

\`\`\`cpp
int day = 3;
switch (day) {
    case 1:
        cout << "Monday";
        break;
    case 2:
        cout << "Tuesday";
        break;
    case 3:
        cout << "Wednesday";
        break;
    default:
        cout << "Other";
}
\`\`\`

| Part | Meaning |
|------|---------|
| \`switch (variable)\` | Check this variable's value |
| \`case value:\` | If it matches, run this! |
| \`break;\` | Stop here! (**Required!**) |
| \`default:\` | If no case matches (like else) |

⚠️ **What if you forget break?** → The next cases run too! (fall-through)
\`\`\`cpp
switch (day) {
    case 1: cout << "Mon";  // no break!
    case 2: cout << "Tue";  // if day=1, prints "MonTue"! 😱
    case 3: cout << "Wed";
}
\`\`\`

💡 switch only works with **integers/char** values. For strings, use if-else if!`
        },
        {
          id: "ch2-pred-switch",
          type: "predict" as const,
          title: "switch output?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n        default: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "D"],
          answer: 1,
          explanation: "x=2, so it goes to case 2, prints 'B', and break exits the switch!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "else if syntax!",
          content: "What's the C++ equivalent of Python's `elif`?",
          options: ["elseif", "elsif", "else if", "elif"],
          answer: 2,
          explanation: "C++ uses else if (with a space)! elseif/elsif are used in other languages (PHP, Ruby)."
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Build a Grade Checker!",
          content: `Let's make a program that takes a score and outputs the grade!

This is great practice for if, else if, and else.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Enter your score: ";
    cin >> score;

    if (score >= 90) {
        cout << "Grade A! 🎉" << endl;
    } else if (score >= 80) {
        cout << "Grade B! 👍" << endl;
    } else if (score >= 70) {
        cout << "Grade C" << endl;
    } else {
        cout << "Try harder!" << endl;
    }

    return 0;
}`,
          expectedOutput: `Enter your score: 85
Grade B! 👍`
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
          title: "Correct if statement",
          content: "Which is a valid C++ if statement?",
          options: [
            "if x > 5 { cout << \"big\"; }",
            "if (x > 5) { cout << \"big\"; }",
            "if (x > 5): cout << \"big\"",
            "if [x > 5] { cout << \"big\"; }"
          ],
          answer: 1,
          explanation: "C++ if uses parentheses () for the condition and curly braces {} for the code block!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Missing break?",
          content: `What happens without break in a switch?

\`\`\`cpp
switch (day) {
    case 1: cout << "Mon";
    case 2: cout << "Tue";
    case 3: cout << "Wed";
}
\`\`\``,
          options: [
            "Compile error",
            "Only the matching case runs",
            "All following cases run too",
            "Program terminates"
          ],
          answer: 2,
          explanation: "Without break, execution 'falls through' to all subsequent cases! This is called 'fall-through'."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Not in C++!",
          content: "Which conditional syntax exists in Python but **not** in C++?",
          options: [
            "else if",
            "Ternary (? :)",
            "switch-case",
            "elif"
          ],
          answer: 3,
          explanation: "elif is Python only! C++ uses else if (with a space)."
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Ternary result!",
          content: `What's the output?

\`\`\`cpp
int n = 4;
string result = (n % 2 == 0) ? "even" : "odd";
cout << result;
\`\`\``,
          options: ["even", "odd", "Error", "4"],
          answer: 0,
          explanation: "4 % 2 == 0 is true! The ternary picks the value after ? which is 'even'."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **if statement** — if (condition) { } (parentheses + braces!)
- ✅ **Braces required** — without them, only one line is controlled!
- ✅ **else if** — replaces Python's elif (two words!)
- ✅ **Ternary** — condition ? trueVal : falseVal
- ✅ **switch-case** — don't forget break or it falls through!

🚀 **Next time: Loops (for/while)** — A world without range(), for(int i=0; i<n; i++)!`
        }
      ]
    }
  ]
}
