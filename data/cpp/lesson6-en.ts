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
          content: `In a game, if the character's health drops to 0, it's game over. If it's 100 or more, they're invincible... This kind of **decision-making** is at the heart of programming!

Let's compare Python and C++ if statements!

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

💡 C++ just needs **() and {}** — remember those two!`,
          component: "cppIfBuilder",
        },
        {
          id: "ch1-else",
          type: "explain",
          title: "🔀 if alone isn't enough! → else",
          content: `if means "if this is true, do it". But **what if it's false?** Nothing happens!

\`\`\`cpp
int score = 40;
if (score >= 60) {
    cout << "Pass!";
}
// score is 40... no response 😶
\`\`\`

**"Want to do something when false too?"** → Use \`else\`!

\`\`\`cpp
if (score >= 60) {
    cout << "Pass!";
} else {
    cout << "Fail...";   // ← Runs when condition is false!
}
\`\`\`

| Python 🐍 | C++ ⚡ |
|---|---|
| \`else:\` | \`} else {\` |
| colon : | **} else {** (watch the braces!) |

{!blue} 💡 \`else\` means "everything else". If the if condition is false, else runs!

⚠️ else must come **right after if**. It can't stand alone!`
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
          id: "ch1-brace-no-sim",
          type: "explain",
          title: "⚠️ Brace Trap! — Trace",
          content: `In C++, without braces, only **ONE line** belongs to if!

\`\`\`cpp
// ❌ No braces = dangerous!
if (score >= 90)
    cout << "Grade A!";   // ← Only THIS line belongs to if!
    cout << "Congrats!";  // ← This ALWAYS runs!!
\`\`\`

Python uses indentation for blocks, but C++ uses **curly braces {} only**.
Even if the code looks indented, without braces it doesn't matter!

Compare **score=80 (False)** and **score=96 (True)** below.
Red strikethrough lines are **skipped lines**!

> 💡 **Fix:** Wrap multiple lines in \`{ }\` braces to include them all in the if block!`,
          component: "codeTraceCppBraceTrapNoCombo",
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
    // Chapter 2: else if / else
    // ============================================
    {
      id: "ch2",
      title: "else if / else",
      emoji: "🔗",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "🤔 What if there are 2+ conditions?",
          content: `if-else alone can only handle **2 cases**:

\`\`\`cpp
if (score >= 60) {
    cout << "Pass";
} else {
    cout << "Fail";
}
\`\`\`

But grades are A, B, C, F... **4+ categories**!

{!pink} ❌ **Multiple if's?** → Conditions overlap! Could get "A" AND "B"!
{!green} ✅ **else if?** → Checks top to bottom, {green:**only the first match runs!**}

Same as Python's \`elif\`!`
        },
        {
          id: "ch2-elseif",
          type: "explain",
          title: "🔗 elif becomes else if!",
          component: "cppElseIfBuilder",
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
          id: "ch2-sim",
          type: "explain",
          title: "🔍 Trace: score=85 → B (else if path)",
          content: `Watch if → else if → else check conditions one by one from top to bottom!

Press **▶ Run** to trace step by step.`,
          component: "codeTraceCppScoreGrade",
        },
        {
          id: "ch2-sim-true",
          type: "explain",
          title: "🔍 Trace: score=95 → A (first condition True!)",
          content: `Now score=95! When the FIRST condition is True, what happens to the rest?

Press **▶ Run** to trace step by step.`,
          component: "codeTraceCppScoreGradeHigh",
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
    // Chapter 3: Ternary Operator
    // ============================================
    {
      id: "ch3",
      title: "Ternary Operator",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-why",
          type: "explain",
          title: "When is the ternary operator useful?",
          content: `We already have if-else — why do we need another way?

Look at this situation:
\`\`\`cpp
string status;
if (score >= 60) {
    status = "pass";
} else {
    status = "fail";
}
\`\`\`
That's **6 lines**, but all it really does is one thing: assign a value to status!

When you need to **pick one value based on a condition**, the ternary operator is perfect.
⚠️ For complex logic, if-else is still more readable!`
        },
        {
          id: "ch3-intro",
          type: "explain",
          title: "⚡ What is the Ternary Operator?",
          content: `Now that you've learned if-else, let's learn a **shortcut for simple conditions**!

Look at this code:
\`\`\`cpp
string result;
if (x > 0) {
    result = "positive";
} else {
    result = "negative";
}
\`\`\`

That's 6 lines! We can write it in **one line**!

💡 This is a "nice to have" tool. Don't worry if you can't memorize it right away!`
        },
        {
          id: "ch3-ternary",
          type: "explain",
          title: "❓ condition ? trueVal : falseVal",
          content: `Here's the 6-line code we just saw:

\`\`\`cpp
string result;
if (x > 0) {
    result = "positive";
} else {
    result = "negative";
}
\`\`\`

With the **ternary operator**, this becomes:

\`\`\`cpp
string result = (x > 0) ? "positive" : "negative";
\`\`\`

6 lines → 1 line! 😮

The ternary operator format:
\`\`\`
condition ? value_if_true : value_if_false
\`\`\`

**How to read it:** "Is x greater than 0? If yes → positive! If no → negative!"

| Python 🐍 | C++ ⚡ |
|---|---|
| \`"pos" if x > 0 else "neg"\` | \`(x > 0) ? "pos" : "neg"\` |
| True value **first** | Condition **first** |

💡 The order is different! Python: "value if cond else value", C++: "cond ? value : value"`,
          component: "cppTernaryBuilder",
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "Complete the ternary!",
          content: "Store \"even\" if x is even, \"odd\" if odd, using the ternary operator!",
          code: "string result = (x % 2 ___ 0) ___ \"even\" ___ \"odd\";",
          fillBlanks: [
            { id: 0, answer: "==", options: ["==", "!=", ">=", "<="] },
            { id: 1, answer: "?", options: ["?", ":", "&&", "||"] },
            { id: 2, answer: ":", options: [":", "?", ";", ","] }
          ],
          explanation: "Ternary: (condition) ? true_value : false_value. x % 2 == 0 means even, so \"even\" is selected!"
        },
        {
          id: "ch3-convert-practice1",
          type: "fillblank" as const,
          title: "🔄 Convert if/else → ternary ①",
          content: `Convert this if/else to a single ternary line!

\`\`\`cpp
string msg;
if (score >= 90) {
    msg = "Grade A";
} else {
    msg = "Retake";
}
\`\`\``,
          code: "string msg = (score ___ 90) ___ \"Grade A\" ___ \"Retake\";",
          fillBlanks: [
            { id: 0, answer: ">=", options: [">=", ">", "==", "<="] },
            { id: 1, answer: "?", options: ["?", ":", "&&", "||"] },
            { id: 2, answer: ":", options: [":", "?", ";", "!"] }
          ],
          explanation: "if condition → ( ), true value → after ?, false value → after : ! (score >= 90) ? \"Grade A\" : \"Retake\""
        },
        {
          id: "ch3-convert-practice2",
          type: "fillblank" as const,
          title: "🔄 Convert if/else → ternary ②",
          content: `Now with numbers! Convert this if/else to a ternary.

\`\`\`cpp
int fee;
if (age <= 12) {
    fee = 500;
} else {
    fee = 1500;
}
\`\`\``,
          code: "int fee = (age ___ 12) ? ___ : ___;",
          fillBlanks: [
            { id: 0, answer: "<=", options: ["<=", "<", ">=", "=="] },
            { id: 1, answer: "500", options: ["500", "1500", "12", "0"] },
            { id: 2, answer: "1500", options: ["1500", "500", "12", "0"] }
          ],
          explanation: "age <= 12 means 500, otherwise 1500! condition ? true_value(500) : false_value(1500)"
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "Ternary: adult or minor?",
          content: `Take an age as input and print "adult" if 18 or older, "minor" if younger.
Use the ternary operator!`,
          code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Age: ";
    cin >> age;

    // Write it in one line using the ternary operator
    string result = ___;

    cout << result << endl;
    return 0;
}`,
          expectedOutput: `Age: 20
adult`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "Ternary result?",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int age = 15;\n    string msg = (age >= 18) ? \"adult\" : \"minor\";\n    cout << msg;\n    return 0;\n}",
          options: ["adult", "minor", "Error", "18"],
          answer: 1,
          explanation: "age=15, and 15 >= 18 is false! The ternary picks the value after : which is 'minor'."
        },
        {
          id: "ch3-convert",
          type: "quiz",
          title: "🔄 if/else → Ternary!",
          content: `Convert this if/else to a ternary:

\`\`\`cpp
string s;
if (score >= 60) {
    s = "pass";
} else {
    s = "fail";
}
\`\`\``,
          options: [
            'string s = (score >= 60) ? "pass" : "fail";',
            'string s = (score >= 60) : "pass" ? "fail";',
            'string s = "pass" ? (score >= 60) : "fail";',
            'string s = (score >= 60) ? "fail" : "pass";'
          ],
          answer: 0,
          explanation: "condition ? true_val : false_val! (score >= 60) is the condition, \"pass\" when true, \"fail\" when false."
        },
        {
          id: "ch3-q1",
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
          id: "ch3-pred2",
          type: "predict" as const,
          title: "Nested ternary!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    string r = (x > 0) ? \"positive\" : (x < 0) ? \"negative\" : \"zero\";\n    cout << r;\n    return 0;\n}",
          options: ["positive", "negative", "zero", "Error"],
          answer: 2,
          explanation: "x=0: x > 0 is false → second ternary! x < 0 also false → 'zero'! Ternaries can be nested."
        },
      ]
    },
    // ============================================
    // Chapter 4: switch-case
    // ============================================
    {
      id: "ch4",
      title: "switch-case",
      emoji: "🔀",
      steps: [
        {
          id: "ch4-why",
          type: "explain",
          title: "🤔 Why do we need switch?",
          content: `When you have too many if-else if's, it gets hard to read:

\`\`\`cpp
if (day == 1) { cout << "Monday"; }
else if (day == 2) { cout << "Tuesday"; }
else if (day == 3) { cout << "Wednesday"; }
else if (day == 4) { cout << "Thursday"; }
else if (day == 5) { cout << "Friday"; }
else if (day == 6) { cout << "Saturday"; }
else if (day == 7) { cout << "Sunday"; }
\`\`\`

Look closely — it's just asking **"is day 1? is day 2? is day 3?..."** over and over. We keep repeating \`day ==\`!

When comparing **one variable** to many values, **switch** is cleaner!

💡 Think of switch as asking "what value does this variable have?"`,
        },
        {
          id: "ch4-switch",
          type: "explain",
          title: "🔀 switch-case Structure",
          content: `Let's build a switch statement step by step!

| Part | Meaning |
|------|---------|
| \`switch (variable)\` | Check this variable's value |
| \`case value:\` | If it matches, run this! |
| \`break;\` | Stop here! (**Required!**) |
| \`default:\` | If no case matches (like else) |

⚠️ switch can **only** use integers and chars! For string comparisons, use if-else.`,
          component: "cppSwitchBuilder",
        },
        {
          id: "ch4-break",
          type: "explain",
          title: "⚠️ What if you forget break?",
          content: `Without break, the next cases **also run**! This is called **fall-through**.

\`\`\`cpp
// ❌ No break = dangerous!
switch (day) {
    case 1: cout << "Mon";  // no break!
    case 2: cout << "Tue";  // if day=1, prints "MonTue"! 😱
    case 3: cout << "Wed";
}
\`\`\`

\`\`\`cpp
// ✅ Always use break!
switch (day) {
    case 1: cout << "Mon"; break;
    case 2: cout << "Tue"; break;
    case 3: cout << "Wed"; break;
}
\`\`\`

💡 Forgetting break is one of the most common C++ beginner mistakes!`
        },
        {
          id: "ch4-fb1",
          type: "fillblank" as const,
          title: "Complete the switch!",
          content: "Complete this switch statement that prints a message based on grade!",
          code: "___ (grade) {\n    ___ 'A':\n        cout << \"Excellent\";\n        ___;\n    ___ 'B':\n        cout << \"Good\";\n        break;\n    ___:\n        cout << \"Try again\";\n}",
          fillBlanks: [
            { id: 0, answer: "switch", options: ["switch", "if", "select", "match"] },
            { id: 1, answer: "case", options: ["case", "when", "if", "is"] },
            { id: 2, answer: "break", options: ["break", "stop", "exit", "return"] },
            { id: 3, answer: "case", options: ["case", "when", "if", "else"] },
            { id: 4, answer: "default", options: ["default", "else", "other", "none"] }
          ],
          explanation: "switch(variable) { case value: code break; ... default: code } is the pattern!"
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "switch output?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n        default: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "B", "C", "D"],
          answer: 1,
          explanation: "x=2, so it goes to case 2, prints 'B', and break exits the switch!"
        },
        {
          id: "ch4-pred2",
          type: "predict" as const,
          title: "⚠️ switch without break!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 1;\n    switch (x) {\n        case 1: cout << \"A\";\n        case 2: cout << \"B\";\n        case 3: cout << \"C\";\n    }\n    return 0;\n}",
          options: ["A", "AB", "ABC", "Error"],
          answer: 2,
          explanation: "No break after case 1, so it falls through to case 2 and 3! Output: \"ABC\". This is called fall-through."
        },
        {
          id: "ch4-limit",
          type: "explain",
          title: "🤔 switch vs if — When to use which?",
          content: `switch isn't always the answer. Sometimes **if is better**:

| Situation | Use | Why |
|---|---|---|
| Menu number (1, 2, 3...) | ✅ **switch** | Clean branching |
| Grade (A, B, C, D) | ✅ **switch** | char value branching |
| Score range (above 90?) | ✅ **if** | Needs greater/less comparison |
| Name comparison ("Kim"?) | ✅ **if** | Needs string comparison |

C++ rule: switch can **only** compare integers and chars.

\`\`\`cpp
// ❌ Compile error!
switch (name) { case "Kim": ... }  // string not allowed
switch (x) { case x > 10: ... }   // range not allowed
\`\`\`

💡 **Summary:** "Is this exactly 1? 2? 3?" → **switch** / "Above 90?" "Is name Kim?" → **if**`
        },
        {
          id: "ch4-q1",
          type: "quiz",
          title: "switch vs if",
          content: "What can switch **NOT** compare?",
          options: [
            "int variables",
            "char variables",
            "string variables",
            "Integer constants"
          ],
          answer: 2,
          explanation: "switch can only compare integers and chars! For strings, you must use if-else if chains."
        },
        {
          id: "ch4-pred3",
          type: "predict" as const,
          title: "break missing in the middle?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\";\n        case 3: cout << \"C\"; break;\n        case 4: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["B", "BC", "BCD", "ABCD"],
          answer: 1,
          explanation: "x=2 → case 2 runs → no break, so case 3 also runs! → case 3 has break, so it stops. Result: \"BC\""
        },
        {
          id: "ch4-pred4",
          type: "predict" as const,
          title: "No default?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\"; break;\n    }\n    cout << \"end\";\n    return 0;\n}",
          options: ["Aend", "Cend", "end", "Error"],
          answer: 2,
          explanation: "x=5 doesn't match any case. No default either, so switch is skipped entirely! Only \"end\" prints."
        },
        {
          id: "ch4-pred5",
          type: "predict" as const,
          title: "With default?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        default: cout << \"other\";\n    }\n    cout << \"end\";\n    return 0;\n}",
          options: ["Aend", "Bend", "otherend", "end"],
          answer: 2,
          explanation: "x=5 → case 1? No. case 2? No. Falls to default → \"other\" prints → switch ends → \"end\" prints. Result: \"otherend\""
        },
        {
          id: "ch4-pred6",
          type: "predict" as const,
          title: "switch with char!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    char grade = 'B';\n    switch (grade) {\n        case 'A': cout << \"Best\"; break;\n        case 'B': cout << \"Good\"; break;\n        case 'C': cout << \"OK\"; break;\n        default: cout << \"Try\";\n    }\n    return 0;\n}",
          options: ["Best", "Good", "OK", "Try"],
          answer: 1,
          explanation: "grade='B' → matches case 'B'! Prints \"Good\" and break exits the switch!"
        },
        {
          id: "ch4-pred7",
          type: "predict" as const,
          title: "Two fall-throughs then break?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 1;\n    switch (x) {\n        case 1: cout << \"A\";\n        case 2: cout << \"B\";\n        case 3: cout << \"C\"; break;\n        case 4: cout << \"D\";\n    }\n    return 0;\n}",
          options: ["A", "ABC", "ABCD", "AB"],
          answer: 1,
          explanation: "x=1 → case 1(A) → no break → case 2(B) → no break → case 3(C) → break! Stops here. case 4 doesn't run. Result: \"ABC\""
        },
        {
          id: "ch4-pred8",
          type: "predict" as const,
          title: "Watch where the breaks are!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 3;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\"; break;\n        case 3: cout << \"C\";\n        case 4: cout << \"D\";\n        case 5: cout << \"E\"; break;\n    }\n    return 0;\n}",
          options: ["C", "CD", "CDE", "ABCDE"],
          answer: 2,
          explanation: "x=3 → case 3(C) → no break! → case 4(D) → no break! → case 5(E) → break! The breaks in case 1,2 don't matter for x=3. Result: \"CDE\""
        },
        {
          id: "ch4-pred9",
          type: "predict" as const,
          title: "Fall-through to default?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: cout << \"A\"; break;\n        case 2: cout << \"B\";\n        default: cout << \"X\";\n    }\n    return 0;\n}",
          options: ["B", "BX", "X", "Error"],
          answer: 1,
          explanation: "x=2 → case 2(B) → no break! → default also runs(X)! default can be a fall-through target too. Result: \"BX\""
        },
        {
          id: "ch4-intentional",
          type: "explain",
          title: "💡 Intentional fall-through!",
          content: `Not using break isn't always a mistake! When **multiple cases share the same code**, you can skip break on purpose:

\`\`\`cpp
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        cout << "Weekday";
        break;
    case 6:
    case 7:
        cout << "Weekend";
        break;
}
\`\`\`

Cases 1-5 fall through to the same code — all print **"Weekday"**. This is **intentional fall-through**!

💡 default is **optional**! If all cases are covered, you don't need it.`
        },
        {
          id: "ch4-pred10",
          type: "predict" as const,
          title: "Intentional fall-through!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int day = 6;\n    switch (day) {\n        case 1:\n        case 2:\n        case 3:\n        case 4:\n        case 5:\n            cout << \"Weekday\"; break;\n        case 6:\n        case 7:\n            cout << \"Weekend\"; break;\n    }\n    return 0;\n}",
          options: ["Weekday", "Weekend", "WeekdayWeekend", "Error"],
          answer: 1,
          explanation: "day=6 → matches case 6 → no break → falls to case 7's code → cout << \"Weekend\" → break! Result: \"Weekend\""
        },
        {
          id: "ch4-practice1",
          type: "practice" as const,
          title: "✍️ Write a switch statement!",
          content: `Write a switch that prints the day name based on a number!

- day = 1 → "Monday"
- day = 2 → "Tuesday"
- anything else → "Other"

💡 Hint: Don't forget break after each case! And add a default too!`,
          code: `#include <iostream>
using namespace std;
int main() {
    int day = 1;
    switch (day) {
        case 1:
            cout << "Monday";
            break;
        case 2:
            cout << "Tuesday";
            break;
        default:
            cout << "Other";
    }
    return 0;
}`,
          expectedOutput: "Monday"
        },
      ]
    },
    // ============================================
    // Chapter 5: Review Quiz
    // ============================================
    {
      id: "ch5",
      title: "Review Quiz",
      emoji: "🏆",
      steps: [
        {
          id: "ch5-q1",
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
          id: "ch5-q2",
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
          id: "ch5-q3",
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
          id: "ch5-summary",
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
