// ============================================
// C++ Lesson 4: cin Input
// C++ for students who already know Python
// ============================================

import { LessonData } from '../types'

export const cppLesson4EnData: LessonData = {
  id: "cpp-4",
  title: "cin Input",
  emoji: "⌨️",
  description: "Get user input with cin >>!",
  chapters: [
    // ============================================
    // Chapter 1: cin >> basics
    // ============================================
    {
      id: "ch1",
      title: "Getting Input with cin",
      emoji: "⌨️",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "⌨️ Getting keyboard input!",
          component: "cppCinBuilder",
          content: `In Python, \`input()\` does everything in one line, right?
C++ needs 3 steps!

Python's input() is just one line, but C++ needs 3 steps: (1) declare the variable (2) print a prompt message (3) read with cin. Why? Because C++ needs the variable type to be set in advance!

\`\`\`cpp
string name;                    // 1. Declare the variable first
cout << "Enter your name: ";   // 2. Print a prompt
cin >> name;                     // 3. Get the input!
\`\`\`

The \`>>\` symbol means **"receive"**!
It takes data from cin (keyboard) and puts it **into** the variable.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`name = input("Name: ")\` | \`cin >> name;\` |
| One line! | Declare → prompt → input (3 steps) |

💡 cin = **c**haracter **in**put — it receives characters from the keyboard!`
        },
        {
          id: "ch1-pred0",
          type: "predict" as const,
          title: "What does this code do?",
          code: "#include <iostream>\nusing namespace std;\nint main() {\n    int age;\n    cout << \"Age: \";\n    cin >> age;\n    cout << age << \" years old!\";\n    return 0;\n}\n// Input: 14",
          options: ["14", "Age: 14 years old!", "14 years old!", "Error"],
          answer: 2,
          explanation: "cin >> age reads 14, then cout prints '14 years old!'. 'Age: ' was already printed before the input!"
        },
        {
          id: "ch1-arrows",
          type: "explain",
          title: "⬅️ << vs >> — Know the difference!",
          content: `Did you notice the arrow directions are different for cout and cin?

\`\`\`cpp
cout << "Hello!";   // Output: send TO the screen →
cin >> name;         // Input: receive FROM keyboard ←
\`\`\`

| Symbol | Used with | Data flow |
|--------|-----------|-----------|
| \`<<\` | cout (output) | Program → Screen (**send**) |
| \`>>\` | cin (input) | Keyboard → Variable (**receive**) |

Think of it as the direction data flows!
→ \`<<\` sends data out to the screen (output)
→ \`>>\` brings data into the variable (input)

💡 It's the **direction of data flow**! cout << pushes out, cin >> pulls in!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Read the user's age from the keyboard!",
          code: "int age;\ncout << \"Age: \";\n___ ___ age;",
          fillBlanks: [
            { id: 0, answer: "cin", options: ["cin", "cout", "input", "scan"] },
            { id: 1, answer: ">>", options: [">>", "<<", "==", "->"] }
          ],
          explanation: "Input uses cin >>! It's the opposite direction from cout << (output)."
        },
        {
          id: "ch1-auto",
          type: "explain",
          title: "🎯 Number input is easier!",
          content: `In Python, you had to do \`int(input())\` to get a number, remember?

**Python 🐍** — Type conversion required
\`\`\`python
age = int(input("Age: "))   # Must wrap with int()!
\`\`\`

**C++ ⚡** — Automatic type matching!
\`\`\`cpp
int age;
cin >> age;       // int variable → automatically reads an integer!

double score;
cin >> score;     // double variable → automatically reads a decimal!
\`\`\`

C++ reads data matching the variable type **automatically** — no conversion needed!

💡 This is the **advantage of specifying types upfront**. The computer already knows what to expect!

What if you type 'hello' into an int variable? cin enters a **failure state**. The variable gets 0, and all subsequent cin calls stop working! The program looks like it froze 😱 (We'll learn about error handling later!)`
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ Try Input & Output!",
          content: `Let's make a program that asks for your name and age, then greets you!

**Type the code below** in your editor, compile, and run it.
When you run it, you can type your name and age!`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;

    cout << "Enter your name: ";
    cin >> name;

    cout << "Enter your age: ";
    cin >> age;

    cout << "Hello, " << name << "! ";
    cout << "You are " << age << " years old!" << endl;

    return 0;
}`,
          expectedOutput: `Enter your name: Emma
Enter your age: 14
Hello, Emma! You are 14 years old!`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "<< vs >> quiz!",
          content: `cout uses ___ and cin uses ___.`,
          options: [
            "<< / >>",
            ">> / <<",
            "<< / <<",
            ">> / >>"
          ],
          answer: 0,
          explanation: "cout << (output) sends data to the screen, cin >> (input) receives data into a variable!"
        }
      ]
    },
    // ============================================
    // Chapter 2: Multiple inputs, getline
    // ============================================
    {
      id: "ch2",
      title: "More Input Methods",
      emoji: "📥",
      steps: [
        {
          id: "ch2-multi",
          type: "explain",
          title: "🔗 Multiple inputs at once!",
          content: `Chain cin >> to receive multiple values at once!

\`\`\`cpp
string name;
int age;
cin >> name >> age;
// Input: Emma 14 (separated by space!)
\`\`\`

Separate values with spaces or enter — "Emma" goes into name, 14 goes into age!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`name, age = input().split()\` | \`cin >> name >> age;\` |
| Need split() to separate | Automatically splits at spaces! |

💡 cin >> automatically splits at whitespace. No need for split()!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "What will this print?",
          content: "Hint: a and b are int (integers). + does math addition!",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}\n// Input: 3 5",
          options: ["35", "8", "3 5", "Error"],
          answer: 1,
          explanation: "cin >> a >> b reads 3 and 5 separately. Since they're ints, + does math: 3 + 5 = 8! It's NOT string concatenation like Python's \"3\"+\"5\"=\"35\"."
        },
        {
          id: "ch2-trap",
          type: "explain",
          title: "⚠️ cin's trap: spaces!",
          content: `cin >> has one big trap!

\`\`\`cpp
string name;
cin >> name;
// Input: John Smith
// name only contains "John"! 😱
\`\`\`

cin >> **stops at the first space**!

To read an entire line including spaces → use **getline()**!
\`\`\`cpp
string fullName;
getline(cin, fullName);
// Input: John Smith
// fullName = "John Smith" (got everything! ✅)
\`\`\`

| Function | Spaces | Use for |
|----------|--------|---------|
| \`cin >>\` | Stops at space ❌ | Single words, numbers |
| \`getline(cin, var)\` | Includes spaces ✅ | Full lines of text |

💡 For input that might contain spaces (like names), use getline()!

cin >> is designed to quickly read one word at a time. But when you need a full name like 'John Smith'? You need getline()!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Read an entire sentence with spaces!",
          code: "string sentence;\n___(cin, ___);",
          fillBlanks: [
            { id: 0, answer: "getline", options: ["getline", "readline", "input", "cin"] },
            { id: 1, answer: "sentence", options: ["sentence", "\"sentence\"", "cin", "endl"] }
          ],
          explanation: "To read an entire line including spaces, use getline(cin, variableName)!"
        },
        {
          id: "ch2-pred2",
          type: "predict" as const,
          title: "What will this print?",
          code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    int age;\n    cin >> name >> age;\n    cout << name << \" is \" << age << \" years old\" << endl;\n    return 0;\n}\n// Input: Emma 14",
          options: ["Error", "Emma 14 is 0 years old", "Emma is 14 years old", "Emma  is 14 years old"],
          answer: 2,
          explanation: "Space separates 'Emma' into name and '14' into age. Result: 'Emma is 14 years old'"
        },
        {
          id: "ch2-ignore",
          type: "explain",
          title: "⚠️ Watch Out: cin >> Then getline!",
          component: "cinBufferVisualizer",
          content: `Using cin >> and getline() **together** has a trap!

cin >> only reads the number and **leaves Enter(↵) in the buffer.**
getline() **reads up to Enter**, so it grabs the leftover Enter and gets an empty string!

**Solution:** Add \`cin.ignore();\` between them to clear the leftover Enter!

Watch the animation below to see exactly how the buffer works! 👇`
        },
        {
          id: "ch2-decision",
          type: "explain",
          title: "cin >> vs getline() Selection Guide",
          content: `| Situation | What to use |
|---|---|
| One number | \`cin >>\` |
| One word | \`cin >>\` |
| Sentence with spaces | \`getline()\` |
| Number then sentence | \`cin >>\` → \`cin.ignore()\` → \`getline()\` |

💡 Basic rule: if you need spaces, use getline(). Otherwise, cin >>!`
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ Try getline & cin.ignore!",
          content: `This program reads your age (number) and favorite food (with spaces)!

**First, try removing cin.ignore()** and run it. The food input gets skipped!
Then add it back and see the difference.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string food;

    cout << "Age: ";
    cin >> age;

    cin.ignore();  // ← Try removing this and see what happens!

    cout << "Favorite food: ";
    getline(cin, food);

    cout << age << " years old, favorite food: " << food << endl;

    return 0;
}`,
          expectedOutput: `Age: 14
Favorite food: chicken burger
14 years old, favorite food: chicken burger`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "When is cin.ignore() needed?",
          content: `When do you need to use cin.ignore()?`,
          options: [
            "When only using cin >>",
            "When only using getline()",
            "When using cin >> followed by getline()",
            "When using cout << before cin >>"
          ],
          answer: 2,
          explanation: "cin >> leaves the Enter(\\n) behind, and getline() reads it as empty! cin.ignore() discards the leftover Enter."
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
          title: "cin basics",
          content: `What's the correct way to get an integer input in C++?`,
          options: [
            `int x = input();`,
            `cin << x;`,
            `int x; cin >> x;`,
            `cin(x);`
          ],
          answer: 2,
          explanation: "First declare int x;, then use cin >> x; to get input. >> is the input operator!"
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "Input with spaces",
          content: `How do you read a name with spaces like "John Smith"?`,
          options: [
            `cin >> name;`,
            `getline(cin, name);`,
            `cin.read(name);`,
            `input(name);`
          ],
          answer: 1,
          explanation: "cin >> stops at spaces, so to read an entire line use getline(cin, name)!"
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "Choosing the right function",
          content: `You need to read a number, then a sentence with spaces. What do you use?`,
          options: [
            "Use cin >> for both",
            "Use getline() for both",
            "cin >> for the number, getline() for the sentence",
            "getline() for the number, cin >> for the sentence"
          ],
          answer: 2,
          explanation: "Numbers work great with cin >>, but sentences with spaces need getline() to read the whole line!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "Final check!",
          content: `Which statement about C++ I/O is **wrong**?`,
          options: [
            "cout uses << and cin uses >>",
            "cin >> stops reading at whitespace",
            "getline() reads an entire line",
            "cin >> with wrong type input immediately crashes the program"
          ],
          answer: 3,
          explanation: "Wrong type input to cin >> doesn't crash — it just fails silently and the variable may get a weird value!"
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **cin >>** — Get keyboard input (Python's input())
- ✅ **<< vs >>** — cout uses << (send), cin uses >> (receive)
- ✅ **Auto type matching** — int variable = integer input, double = decimal
- ✅ **Multiple inputs** — cin >> a >> b; (space-separated)
- ✅ **cin's trap** — Stops at whitespace!
- ✅ **getline()** — Read an entire line including spaces

🚀 **Next time: Operators** — Integer division, ++, &&, || operators!`
        }
      ]
    }
  ]
}
