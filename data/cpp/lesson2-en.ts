// ============================================
// C++ Lesson 2: Advanced cout & namespace
// C++ for students who already know Python
// ============================================

import { LessonData } from '../types'

export const cppLesson2EnData: LessonData = {
  id: "cpp-2",
  title: "Advanced cout & namespace",
  emoji: "🖨️",
  description: "Print all kinds of things with cout, and discover what std:: really means!",
  chapters: [
    // ============================================
    // Chapter 1: Print all kinds of things!
    // ============================================
    {
      id: "ch1",
      title: "Print all kinds of things!",
      emoji: "🖨️",
      steps: [
        {
          id: "ch1-numbers",
          type: "explain",
          title: "🔢 You can print numbers too!",
          content: `Last time we printed strings with \`std::cout << "Hello"\`.
But cout can actually print **numbers** too!

\`\`\`cpp
std::cout << 42 << std::endl;       // integer
std::cout << 3.14 << std::endl;     // decimal
std::cout << 10 + 20 << std::endl;  // expression → result!
\`\`\`

Output:
\`\`\`
42
3.14
30
\`\`\`

💡 **No quotes** = number or expression! **With quotes** = string!
→ \`"42"\` is the string "42", \`42\` is the number 42 — totally different!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "What will happen?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << 10 + 20 << std::endl;\n    std::cout << "10 + 20" << std::endl;\n    return 0;\n}',
          options: ["30\n30", "10 + 20\n10 + 20", "30\n10 + 20"],
          answer: 2,
          explanation: "Without quotes, 10+20 is calculated to 30. Inside quotes, \"10 + 20\" is just a string printed as-is!"
        },
        {
          id: "ch1-mix",
          type: "explain",
          title: "🔗 Mixing numbers and strings!",
          content: `With \`<<\`, you can **freely mix strings and numbers**!

\`\`\`cpp
std::cout << "Score: " << 100 << std::endl;
// Output: Score: 100
\`\`\`

Chaining multiple values works too:
\`\`\`cpp
std::cout << "Age: " << 14 << " Name: " << "Alice" << std::endl;
// Output: Age: 14 Name: Alice
\`\`\`

Remember how Python did it?
| Python 🐍 | C++ ⚡ |
|---|---|
| \`print("Score:", 100)\` | \`std::cout << "Score: " << 100 << std::endl;\` |
| Auto spaces ✅ | No auto spaces ❌ |

💡 \`<<\` can chain any type together! Just remember to add spaces yourself!`
        },
        {
          id: "ch1-escape",
          type: "explain",
          title: "✨ Special characters (escape sequences)",
          content: `Inside strings, some characters have special meanings!
Put a \`\\\` (backslash) before certain letters to create **special characters**.

\`\`\`cpp
std::cout << "Line 1\\nLine 2" << std::endl;
// Output:
// Line 1
// Line 2

std::cout << "Name\\tAge" << std::endl;
std::cout << "Alice\\t14" << std::endl;
// Output:
// Name    Age
// Alice   14
\`\`\`

Common escape sequences:

| Code | Meaning | Example |
|------|---------|---------|
| \`\\n\` | New line | Can use instead of endl |
| \`\\t\` | Tab (wide space) | Great for making tables! |
| \`\\\\\` | Backslash (\\) itself | \`"C:\\\\Users"\` → C:\\Users |
| \`\\"\` | Quote (") itself | \`"He said \\"Hi\\""\` → He said "Hi" |

💡 \`\\n\` does the same thing as endl from Lesson 1! In competitive programming, \\n is used more often.`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Try escape characters yourself!",
          content: `Let's make a table using \\n, \\t, and \\"!

Type the code below in your editor, compile, and run it.
See how tabs (\\t) neatly align everything!`,
          code: `#include <iostream>

int main() {
    std::cout << "Name\\tAge\\tScore" << std::endl;
    std::cout << "Alice\\t14\\t100" << std::endl;
    std::cout << "Bob\\t15\\t95" << std::endl;
    std::cout << "\\nGot an \\"A+\\" in math!" << std::endl;
    return 0;
}`,
          expectedOutput: `Name\tAge\tScore
Alice\t14\t100
Bob\t15\t95

Got an "A+" in math!`
        },
      ]
    },
    // ============================================
    // Chapter 2: What is std?
    // ============================================
    {
      id: "ch2",
      title: "What is std?",
      emoji: "📦",
      steps: [
        {
          id: "ch2-std",
          type: "explain",
          title: "🤔 Ever wondered what std:: means?",
          content: `In Lesson 1, we kept writing \`std::cout\`, \`std::endl\`... but what IS **std::**?

**std** = **standard**

It's the **group name** for all the tools C++ provides by default!

\`std::cout\` → "**cout** from the **std** group"
\`std::endl\` → "**endl** from the **std** group"
\`std::string\` → "**string** from the **std** group"

Think of it like a **last name**! 👨‍👩‍👧‍👦

If there are two students named "Alex" in school, how do you tell them apart?
→ "**Class 1** Alex", "**Class 2** Alex" — you add their class!

C++ does the same thing!
→ "**std::**cout" = "cout from the **std group**"

💡 The group name prevents name conflicts — that's why we write it!`
        },
        {
          id: "ch2-namespace",
          type: "explain",
          title: "📦 namespace = name space",
          content: `The official name for this "group" is **namespace**!

namespace = **a space where names don't collide**

Think of it like **folders**! 📁

\`\`\`
Documents/photo.jpg
Desktop/photo.jpg
\`\`\`

Same "photo.jpg" but they're **different files** because they're in different folders!

C++ works the same way:
\`\`\`
std::cout    → cout inside the std folder
std::endl    → endl inside the std folder
std::string  → string inside the std folder
\`\`\`

\`std\` is C++'s **standard library namespace**.
→ All the tools C++ provides by default live here!

💡 That's why we've been writing \`std::cout\` — adding the "last name" to be specific!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Will this code work?",
          code: '#include <iostream>\n\nint main() {\n    cout << "Hi!" << endl;\n    return 0;\n}',
          options: ["Hi!", "Error! (can't find cout)", "Hi!endl"],
          answer: 1,
          explanation: "Without std::, the compiler doesn't know what cout is! You need to write std::cout for it to work."
        },
      ]
    },
    // ============================================
    // Chapter 3: using namespace std
    // ============================================
    {
      id: "ch3",
      title: "using namespace std",
      emoji: "⚡",
      steps: [
        {
          id: "ch3-using",
          type: "explain",
          title: "⚡ Tired of typing std:: every time?",
          content: `Honestly, writing \`std::cout\`, \`std::endl\` every time is... kind of annoying, right? 😅

There's a solution!

\`\`\`cpp
using namespace std;
\`\`\`

Add this one line at the top and you can **skip all the std::**!

**Before** 😮‍💨:
\`\`\`cpp
std::cout << "Hello" << std::endl;
std::cout << "World" << std::endl;
\`\`\`

**After** 😎:
\`\`\`cpp
cout << "Hello" << endl;
cout << "World" << endl;
\`\`\`

Much cleaner, right?

💡 \`using namespace std;\` = "**Bring in all names from the std group!**"
→ Put it right below \`#include <iostream>\`!`
        },
        {
          id: "ch3-full",
          type: "explain",
          title: "📝 Full code comparison!",
          content: `Let's compare the two versions side by side:

**With std:: version:**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello!" << std::endl;
    std::cout << "Score: " << 100 << std::endl;
    return 0;
}
\`\`\`

**With using namespace std; version:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello!" << endl;
    cout << "Score: " << 100 << endl;
    return 0;
}
\`\`\`

Both produce **exactly the same result!** You just type less.

⚠️ **From now on, we'll use \`using namespace std;\` to keep our code clean!**
→ \`std::cout\` becomes \`cout\`, \`std::endl\` becomes \`endl\`!`
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "What will this print?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello" << endl;\n    return 0;\n}',
          options: ["Hello", "Error! (no std::)", "std::Hello"],
          answer: 0,
          explanation: "Thanks to using namespace std;, cout and endl work without std::! Hello is printed normally."
        },
        {
          id: "ch3-pred2",
          type: "predict" as const,
          title: "How about this one?",
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "A" << "\\t" << "B" << endl;\n    return 0;\n}',
          options: ["A\\tB", "AB", "A\tB (separated by tab)"],
          answer: 2,
          explanation: "\\t is a tab character! A wide space appears between A and B, printing something like A    B."
        },
      ]
    },
    // ============================================
    // Chapter 4: Review Quiz
    // ============================================
    {
      id: "ch4",
      title: "Review Quiz",
      emoji: "🧪",
      steps: [
        {
          id: "ch4-q1",
          type: "quiz",
          title: "Expression output",
          content: `What does \`cout << 5 * 3 << endl;\` print?`,
          options: [
            "5 * 3",
            "15",
            "53",
            "Error"
          ],
          answer: 1,
          explanation: "Without quotes, 5 * 3 is an expression that gets calculated! 5 × 3 = 15 is printed."
        },
        {
          id: "ch4-q2",
          type: "quiz",
          title: "using namespace std",
          content: `What does \`using namespace std;\` do?`,
          options: [
            "Imports iostream",
            "Lets you skip writing std::",
            "Makes the program run faster",
            "Automatically creates the main() function"
          ],
          answer: 1,
          explanation: "using namespace std; lets you write cout, endl, etc. without the std:: prefix!"
        },
        {
          id: "ch4-q3",
          type: "quiz",
          title: "Tab character",
          content: `How do you insert a tab (wide space) inside a string?`,
          options: [
            "\\s",
            "\\t",
            "\\n",
            "\\b"
          ],
          answer: 1,
          explanation: "\\t is the tab character! \\n is newline, \\t is tab — these two are used the most."
        },
        {
          id: "ch4-q4",
          type: "quiz",
          title: "Quotes inside strings",
          content: `How do you print \`He said "Hi"\` ?`,
          options: [
            'cout << "He said "Hi"" << endl;',
            'cout << "He said \\"Hi\\"" << endl;',
            "cout << 'He said \"Hi\"' << endl;",
            "cout << He said Hi << endl;"
          ],
          answer: 1,
          explanation: 'To put quotes inside a string, use \\"! Plain " would end the string early.'
        },
        {
          id: "ch4-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **Number output** — No quotes = number, with quotes = string
- ✅ **Expression output** — \`10 + 20\` → calculated to \`30\`
- ✅ **Mixing types** — \`"Score: " << 100\` — strings + numbers OK
- ✅ **Escape characters** — \\n(newline), \\t(tab), \\\\(backslash), \\"(quote)
- ✅ **std** — C++ standard library namespace
- ✅ **namespace** — A "folder" to prevent name conflicts
- ✅ **using namespace std;** — Skip writing std::!

🚀 **Next time: cin Input** — Get keyboard input with cin >>!`
        }
      ]
    }
  ]
}
