// ============================================
// C++ Lesson 7: Loops (for/while)
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLesson7EnData: LessonData = {
  id: "cpp-7",
  title: "Loops (for/while)",
  emoji: "🔄",
  description: "A world without range(), for(int i=0; i<n; i++)",
  chapters: [
    // ============================================
    // Chapter 1: for loop
    // ============================================
    {
      id: "ch1",
      title: "for Loop",
      emoji: "🔁",
      steps: [
        {
          id: "ch1-compare",
          type: "explain",
          title: "🔁 for: Python vs C++",
          content: `The for loop is where things change the **most**! C++ doesn't have \`range()\`.

**Python 🐍:** \`for i in range(5):\`
**C++ ⚡:** \`for (int i = 0; i < 5; i++)\`

The C++ for loop has **3 parts** separated by semicolons (;):

\`\`\`cpp
for (int i = 0;  i < 5;    i++)
\`\`\`

{!pink} ① {pink:**Init**} — \`int i = 0\` → starting value (runs only once!)
{!blue} ② {blue:**Condition**} — \`i < 5\` → keep looping while true
{!green} ③ {green:**Update**} — \`i++\` → runs after each iteration

**Execution order:** {pink:① Init} → {blue:② Check} → body → {green:③ Update} → {blue:② Check} → body → {green:③ Update} → ... → {blue:② false → done!}

@Key: for loop = "{pink:start}, {blue:condition}, {green:change}" — just 3 things!`,
          component: "cppForBuilder",
        },
        {
          id: "ch1-sim",
          type: "explain",
          title: "🔍 Trace: How does C++ for(init; cond; inc) work?",
          content: `See the exact order of initialization, condition check, and increment in a C++ for loop!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTraceCppFor",
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Make a loop that counts 0 to 4!",
          code: "for (___ i = 0; i ___ 5; ___) {\n    cout << i << endl;\n}",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "var", "let", "for"] },
            { id: 1, answer: "<", options: ["<", "<=", "==", "!="] },
            { id: 2, answer: "i++", options: ["i++", "i--", "i+1", "++"] }
          ],
          explanation: "for (int i = 0; i < 5; i++) loops from 0 to 4. Same result as range(5)!"
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "What's the output?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 0; i < 4; i++) {\n        cout << i;\n    }\n    return 0;\n}",
          options: ["1234", "0123", "01234", "0124"],
          answer: 1,
          explanation: "Starting from i=0, condition is i < 4, so i runs through 0,1,2,3! Output: 0123"
        },
        {
          id: "ch1-patterns",
          type: "explain",
          title: "📋 range() → for Conversion Table!",
          content: `Here's how to convert Python's range() to C++ for:

| Python 🐍 | C++ ⚡ | Result |
|---|---|---|
| \`range(5)\` | \`i = 0; i < 5; i++\` | 0,1,2,3,4 |
| \`range(2, 10)\` | \`i = 2; i < 10; i++\` | 2,3,...,9 |
| \`range(0, 10, 2)\` | \`i = 0; i < 10; i += 2\` | 0,2,4,6,8 |
| \`range(10, 0, -1)\` | \`i = 10; i > 0; i--\` | 10,9,...,1 |

\`\`\`cpp
// Even numbers only: 0, 2, 4, 6, 8
for (int i = 0; i < 10; i += 2) {
    cout << i << " ";
}
\`\`\`

💡 range(start, end, step) → for (int i = start; i < end; i += step)!`
        },
        {
          id: "ch1-pred2",
          type: "predict" as const,
          title: "Multiply pattern!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        cout << i * 2 << \" \";\n    }\n    return 0;\n}",
          options: ["1 2 3 ", "2 4 6 ", "0 2 4 ", "2 4 6 8 "],
          answer: 1,
          explanation: "i=1: 1×2=2, i=2: 2×2=4, i=3: 3×2=6. At i=4, 4 <= 3 is false → stop! Output: 2 4 6"
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "range() conversion!",
          content: "Convert `for i in range(3):` to C++:",
          options: [
            "for (int i = 0; i < 3; i++)",
            "for (int i = 1; i <= 3; i++)",
            "for (int i = 0; i <= 3; i++)",
            "for (i in range(3))"
          ],
          answer: 0,
          explanation: "range(3) produces 0, 1, 2. C++: start at 0, condition i < 3, increment i++!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Sum 1 to 10!",
          content: `Let's use a for loop to calculate the sum of 1 to 10!

In Python you'd write \`sum(range(1, 11))\`, but in C++ we calculate it with a for loop.`,
          code: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        sum += i;
    }

    cout << "Sum of 1 to 10: " << sum << endl;

    return 0;
}`,
          expectedOutput: `Sum of 1 to 10: 55`
        }
      ]
    },
    // ============================================
    // Chapter 2: while, do-while
    // ============================================
    {
      id: "ch2",
      title: "while & do-while",
      emoji: "🔃",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "for vs while: When to use which?",
          content: `The for loop is perfect for **fixed-count** repetition: 'repeat 10 times', 'go through the whole array'.

But what about these situations?
- Keep accepting input until the user types 'quit'
- Ask for a password again until it's correct
- Repeat game turns until the game ends

When you **don't know the count, only the condition** → you need while!
while literally means 'keep going while this is true'.`
        },
        {
          id: "ch2-while",
          type: "explain",
          title: "🔃 while — Almost the same as Python!",
          content: `The while loop is almost identical to Python! Just add parentheses and braces.

**Python 🐍:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int count = 0;
while (count < 5) {
    cout << count << endl;
    count++;
}
\`\`\`

Only 3 differences:
1. **Parentheses ()** around the condition
2. **Curly braces {}** for the block
3. count++ instead of count += 1 (optional)

💡 Same rules as if statements! () + {} is all you need.`,
          component: "cppWhileBuilder",
        },
        {
          id: "ch2-sim",
          type: "explain",
          title: "🔍 Trace: C++ while loop factorial",
          content: `Watch how a while loop calculates factorial (1×2×3×4) step by step!

Press **▶ Run** or **▷ Step** to trace the execution.`,
          component: "codeTraceCppWhile",
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Calculate the sum!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    int i = 1;\n    while (i <= 5) {\n        sum += i;\n        i++;\n    }\n    cout << sum;\n    return 0;\n}",
          options: ["10", "15", "20", "5"],
          answer: 1,
          explanation: "sum = 1 + 2 + 3 + 4 + 5 = 15! i loops from 1 to 5, adding to sum each time."
        },
        {
          id: "ch2-dowhile",
          type: "explain",
          title: "🆕 do-while (Not in Python!)",
          component: "cppDoWhileBuilder",
          content: `C++ has a **do-while loop** that Python doesn't have!

\`\`\`cpp
do {
    statement;
} while (condition);   // ← semicolon at the end!
\`\`\`

| while | do-while |
|-------|----------|
| {blue:Check condition first} → 0 times possible | {pink:**Execute first**} → then check |
| May run 0 times | {pink:**Always runs at least once!**} |

### 🤔 Why use it?

It's perfect for **"must do at least once"** situations:

{!pink} 🎮 **Menu selection** — you need to show the menu before the user can choose!
{!blue} 🔐 **Password input** — you need to ask at least once to check if it's correct!
{!green} 🎲 **Game rounds** — play at least one round before deciding to continue!

\`\`\`cpp
// Most common pattern: input validation
int num;
do {
    cout << "Enter 1-10: ";
    cin >> num;
} while (num < 1 || num > 10);
// Keeps asking until valid!
\`\`\`

You could use while, but do-while makes your {pink:**intent clearer**}:

| while version | do-while version |
|-----------|-------------|
| Need initial variable | Execute right away! |
| \`while(true) { ... break; }\` | \`do { ... } while(cond);\` |
| Intent unclear | **"do first"** is obvious in code |

@Key: do-while = "do it first, then decide!" Perfect for input validation, menus, game loops!`
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "do-while!",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    do {\n        cout << \"Hello\";\n        x++;\n    } while (x < 5);\n    return 0;\n}",
          options: ["Nothing", "Hello", "Hello 5 times", "Infinite loop"],
          answer: 1,
          explanation: "do-while runs at least once! x=10 and x < 5 is false, but do executes first → 'Hello' prints once."
        },
        {
          id: "ch2-fb-dowhile",
          type: "fillblank" as const,
          title: "Convert to do-while",
          content: `Rewrite this while loop as a do-while.

\`\`\`cpp
int n;
while (true) {
    cout << "Enter a positive number: ";
    cin >> n;
    if (n > 0) break;
}
\`\`\``,
          code: "int n;\n___ {\n    cout << \"Enter a positive number: \";\n    cin >> n;\n} ___(n <= 0);",
          fillBlanks: [
            { id: 0, answer: "do", options: ["do", "while", "for", "repeat"] },
            { id: 1, answer: "while", options: ["while", "until", "do", "if"] }
          ],
          explanation: "do-while runs at least once before checking the condition. It's a perfect pattern for input validation!"
        },
        {
          id: "ch2-dowhile-practice",
          type: "practice" as const,
          title: "✋ Build a Battle Menu with do-while!",
          content: `Make an RPG-style battle menu that keeps repeating — just like a real game!

**The menu loops until you pick 3 (run away).**

What each option should print:
- **1** → \`Dealt 25 damage!\`
- **2** → \`Current HP: 100\`
- **3** → exits the loop, then prints \`You ran away...\`

The do-while skeleton is ready — just fill in the if/else body!`,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int choice;

    do {
        cout << "=== Battle Menu ===" << endl;
        cout << "1. Attack" << endl;
        cout << "2. Check HP" << endl;
        cout << "3. Run Away" << endl;
        cout << "Choice: ";
        cin >> choice;

        if (choice == 1) {
            // Write your code here
        } else if (choice == 2) {
            // Write your code here
        }
    } while (choice != 3);

    cout << "You ran away..." << endl;
    return 0;
}`,
          expectedOutput: `=== Battle Menu ===
1. Attack
2. Check HP
3. Run Away
Choice: 1
Dealt 25 damage!
=== Battle Menu ===
1. Attack
2. Check HP
3. Run Away
Choice: 3
You ran away...`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Count down from 10 by subtracting 3!",
          code: "int x = 10;\n___ (x ___ 0) {\n    cout << x << \" \";\n    x ___ 3;\n}",
          fillBlanks: [
            { id: 0, answer: "while", options: ["while", "for", "if", "do"] },
            { id: 1, answer: ">", options: [">", "<", ">=", "=="] },
            { id: 2, answer: "-=", options: ["-=", "+=", "--", "++"] }
          ],
          explanation: "while (x > 0) loops while positive, x -= 3 subtracts 3 each time. Output: 10 7 4 1"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Countdown with while!",
          content: `Let's make a countdown from 10 to 1 using a while loop!

When it reaches 0, print "Liftoff!" 🚀`,
          code: `#include <iostream>
using namespace std;

int main() {
    int count = 10;

    while (count > 0) {
        cout << count << "..." << endl;
        count--;
    }

    cout << "Liftoff!" << endl;

    return 0;
}`,
          expectedOutput: `10...
9...
8...
7...
6...
5...
4...
3...
2...
1...
Liftoff!`
        },
        {
          id: "ch2-breakcon-why",
          type: "explain",
          title: "🤔 Want to stop or skip during a loop?",
          content: `Running a loop to the end isn't always what you want!

{!pink} 🔍 **Search**: Found what you're looking for → no need to keep searching!
{!blue} 🚫 **Filter**: Skip even numbers and only process odd ones?

That's when \`break\` and \`continue\` help. Good news — **they work exactly like Python!** 😎`
        },
        {
          id: "ch2-breakcon",
          type: "explain",
          title: "🛑 break & continue (Same as Python!)",
          content: `Two keywords to **control loop flow**!

\`\`\`cpp
// break: Exit the loop immediately!
for (int i = 0; i < 10; i++) {
    if (i == 5) break;  // Stop when i is 5!
    cout << i << " ";
}
// Output: 0 1 2 3 4
\`\`\`

\`\`\`cpp
// continue: Skip this iteration and move on!
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;  // Skip when i is 2!
    cout << i << " ";
}
// Output: 0 1 3 4  (2 is skipped!)
\`\`\`

| Keyword | Effect | Difference from Python |
|---------|--------|----------------------|
| \`break\` | Exit loop immediately | Exactly the same! ✅ |
| \`continue\` | Skip current iteration | Exactly the same! ✅ |

💡 break and continue work **exactly like Python**! They work in both for and while loops.`
        },
        {
          id: "ch2-fb-continue",
          type: "fillblank" as const,
          title: "Skip with continue",
          content: "Print only the odd numbers from 1 to 10 by skipping the even ones.",
          code: "for (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) ___;\n    cout << i << \" \";\n}",
          fillBlanks: [
            { id: 0, answer: "continue", options: ["continue", "break", "return", "skip"] }
          ],
          explanation: "continue skips the rest of the loop body and jumps to the next iteration. When i is even, continue prevents cout from running!"
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "break vs continue!",
          content: `What's the output?

\`\`\`cpp
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
\`\`\``,
          options: ["0 1 2 3 4 ", "0 1 2 ", "0 1 2 4 ", "3 "],
          answer: 2,
          explanation: "continue skips only the current iteration! When i=3 it skips, so 0, 1, 2, 4 are printed."
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
          title: "Sum 1 to 5",
          content: `What's the output?

\`\`\`cpp
int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
cout << sum;
\`\`\``,
          options: ["10", "15", "20", "5"],
          answer: 1,
          explanation: "sum = 1 + 2 + 3 + 4 + 5 = 15!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "do-while vs while",
          content: "What's the biggest difference between do-while and while?",
          options: [
            "do-while is faster",
            "do-while always runs at least once",
            "do-while loops forever",
            "while can't be used in C++"
          ],
          answer: 1,
          explanation: "do-while executes first, then checks the condition! Even if false from the start, it runs at least once."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "range() conversion",
          content: "Convert `for i in range(0, 10, 3):` to C++:",
          options: [
            "for (int i = 0; i < 10; i++)",
            "for (int i = 0; i < 10; i += 3)",
            "for (int i = 0; i <= 10; i += 3)",
            "for (int i = 3; i < 10; i++)"
          ],
          answer: 1,
          explanation: "range(0, 10, 3) = 0 to under 10, step 3! i = 0; i < 10; i += 3. Result: 0, 3, 6, 9"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "How many times?",
          content: `How many times does "Hi" print?

\`\`\`cpp
for (int i = 5; i > 0; i--) {
    cout << "Hi ";
}
\`\`\``,
          options: ["4 times", "5 times", "6 times", "Infinite loop"],
          answer: 1,
          explanation: "i=5,4,3,2,1 → runs each time! At i=0, 0 > 0 is false → stops. Total: 5 times!"
        },
        {
          id: "ch3-q5",
          type: "quiz",
          title: "Effect of break!",
          content: `What's the output?

\`\`\`cpp
for (int i = 0; i < 10; i++) {
    if (i == 3) break;
    cout << i << " ";
}
\`\`\``,
          options: ["0 1 2 ", "0 1 2 3 ", "3 ", "0 1 2 3 4 5 6 7 8 9 "],
          answer: 0,
          explanation: "break exits the loop immediately! When i=3, break → loop ends! Only 0, 1, 2 are printed."
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **for loop** — for (init; condition; update) { }
- ✅ **range() conversion** — range(n) → i = 0; i < n; i++
- ✅ **Various patterns** — control start, end, and step
- ✅ **while loop** — almost same as Python! Just add () + {}
- ✅ **do-while** — always runs at least once! (not in Python)

🚀 **Next time: Functions** — C++ functions with explicit return types!`
        }
      ]
    }
  ]
}
