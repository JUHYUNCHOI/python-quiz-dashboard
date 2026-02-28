// ============================================
// C++ Lesson 1: Python vs C++
// C++ for students who already know Python
// ============================================

import { LessonData } from '../types'

export const cppLesson1EnData: LessonData = {
  id: "cpp-1",
  title: "Python vs C++",
  emoji: "⚔️",
  description: "Interpreter vs compiler — learn the key differences!",
  chapters: [
    // ============================================
    // Chapter 1: What is C++?
    // ============================================
    {
      id: "ch1",
      title: "What is C++?",
      emoji: "🌍",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎉 Meet C++!",
          content: `C++ is just another programming language, like Python. The syntax is different, that's all!

For those who learned Python, there are **two big differences**:

**1. You need to compile** — We never did this in Python!
**2. Syntax is stricter** — Semicolons, curly braces, and more

Let's learn what compiling means first! 🚀`
        },
        {
          id: "ch1-compile",
          type: "explain",
          title: "🔧 What is compiling?",
          content: `In Python, you just hit Run and see results right away, right?

C++ is different! You need to **convert** your code into something the computer understands (0s and 1s). This is called **compiling**!

It's a bit annoying, and sometimes takes time, but... since the computer runs code in its own language, it runs SO much **faster**! ⚡

💡 Think about it — we read much faster in our own language than having someone translate every page as we go!

Try it below! Compile some code and watch it turn into binary! 👇`
        },
        {
          id: "ch1-compile-viz",
          type: "interactive" as const,
          title: "See code turn into binary!",
          description: "When you compile code, it turns into 0s and 1s that computers understand. Try it!",
          component: "compileVisualizer",
        },
      ]
    },
    // ============================================
    // Chapter 2: Your First C++ Program!
    // ============================================
    {
      id: "ch2",
      title: "Your First C++ Program!",
      emoji: "📝",
      steps: [
        {
          id: "ch2-file",
          type: "explain",
          title: "📁 Create a C++ file!",
          content: `Now let's learn the syntax! But first, let's create a C++ file!

Python files end with \`.py\`, right?
C++ files end with \`.cpp\`!

| Python 🐍 | C++ ⚡ |
|---|---|
| main**.py** | main**.cpp** |

Let's all create a **main.cpp** file!

Ready? Then let's start writing a simple program! ✨`
        },
        {
          id: "ch2-main",
          type: "explain",
          title: "🏁 Start with int main()!",
          content: `In C++, you can't just write code anywhere. You must start inside **int main()**!

\`\`\`cpp
int main() {

}
\`\`\`

Why? Because C++ programs look for the \`main\` function and start running from there.
→ It's like saying "this is the starting line!"

Also! In Python, you used \`:\` and indentation for code blocks.
In C++, you use **{ }** instead.

Everything from \`{\` to \`}\` is "my block of code to run." So watch your brackets!

💡 Don't worry about what \`int\` means yet! Just remember **"this is how we start."**`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Build the skeleton of a C++ program!",
          code: "#include <iostream>\n\n___ main() ___\n\n___",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++ programs start inside int main() { }! Curly braces define the code block."
        },
        {
          id: "ch2-include",
          type: "explain",
          title: "📦 #include <iostream>",
          content: `If you want to print something, you need this at the top:

\`\`\`cpp
#include <iostream>
\`\`\`

C++ doesn't have printing built in!
→ You need to tell it **"bring me the output tools!"**

In Python, you used \`import\`. Same idea, different syntax!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`import math\` | \`#include <cmath>\` |
| *(print just works)* | \`#include <iostream>\` |

⚠️ To print in C++, you MUST have **#include <iostream>**!`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "include quiz!",
          content: `What do you need at the top of your file to print in C++?`,
          options: [
            "import iostream",
            "#include <iostream>",
            "using iostream",
            "require iostream"
          ],
          answer: 1,
          explanation: "#include <iostream> brings in the output tools! It's like Python's import."
        },
        {
          id: "ch2-cout",
          type: "explain",
          title: "🖨️ First output! std::cout",
          content: `Now that we have the output tools, let's print something!

Write this inside the \`int main()\` block:

\`\`\`cpp
std::cout << "Hello" << std::endl;
\`\`\`

Looks like a lot, right? Let's break it down!

- \`std::cout\` → Print to screen! (Python's \`print\`)
- \`<<\` → "Send this!"
- \`std::endl\` → Line break (Python print does this automatically, C++ doesn't!)

⚠️ In C++, every statement MUST end with **;**!
Forget it and the compiler will immediately throw an error! 😱

Here's the full program:

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\`

💡 \`return 0;\` means "program done! Everything went fine!"`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "What will happen?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hi!" << std::endl;\n    return 0;\n}',
          options: ["Hi!", "Hi! endl", "std::cout Hi!", "Error"],
          answer: 0,
          explanation: "std::cout prints to screen, std::endl just adds a line break! Only Hi! appears on screen."
        },
      ]
    },
    // ============================================
    // Chapter 3: Compile and Run!
    // ============================================
    {
      id: "ch3",
      title: "Compile and Run!",
      emoji: "🚀",
      steps: [
        {
          id: "ch3-how",
          type: "explain",
          title: "⚡ How to compile and run!",
          content: `You wrote the code — now let's compile and run it!
Open your terminal and follow along:

**Step 1: Compile** 🔧
\`\`\`
g++ main.cpp
\`\`\`
\`g++\` is the C++ compile command!

**Step 2: Check the output file** 💾
After compiling, a file called **a.out** appears.
→ Your code got converted into binary and created a.out!

**Step 3: Run it** ▶️
\`\`\`
./a.out
\`\`\`

You'll see **Hello** appear on screen! 🎉

💡 Want a custom name? \`g++ -o hello main.cpp\` creates an executable called \`hello\`!`
        },
        {
          id: "ch3-flow",
          type: "interactive" as const,
          title: "Let's review what we learned!",
          description: "See the full journey of your program — from code to output! Click through each step!",
          component: "buildRunFlow",
        },
        {
          id: "ch3-practice",
          type: "practice" as const,
          title: "✋ Compile and run it yourself!",
          content: `Let's try what we just learned!

1. Type the code below in your editor
2. Compile with \`g++ main.cpp\` in the terminal
3. Run with \`./a.out\`

If it works, you'll see "Hello, World!" 🎉`,
          code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
          expectedOutput: `Hello, World!`
        },
      ]
    },
    // ============================================
    // Chapter 4: More cout!
    // ============================================
    {
      id: "ch4",
      title: "More cout!",
      emoji: "📢",
      steps: [
        {
          id: "ch4-chain",
          type: "explain",
          title: "🔗 Print multiple things with <<!",
          content: `Can you only use \`<<\` once? Nope!
You can use \`<<\` multiple times to **chain** values!

\`\`\`cpp
std::cout << "Name: " << "Giraffe" << std::endl;
// Output: Name: Giraffe
\`\`\`

💡 Each \`<<\` sends one more value to the screen! You need to add spaces yourself!`
        },
        {
          id: "ch4-pred1",
          type: "predict" as const,
          title: "What will happen?",
          code: 'std::cout << "A" << "B" << "C" << std::endl;',
          options: ["A B C", "ABC", "A, B, C"],
          answer: 1,
          explanation: "C++ cout doesn't add spaces! Strings are joined directly, so ABC is printed."
        },
        {
          id: "ch4-endl",
          type: "explain",
          title: "↩️ Two ways to make new lines!",
          content: `Besides \`std::endl\`, you can also use \`\\n\`:

\`\`\`cpp
std::cout << "First line" << std::endl;
std::cout << "Second line" << std::endl;
\`\`\`

This also works:
\`\`\`cpp
std::cout << "First line\\n";
std::cout << "Second line\\n";
\`\`\`

💡 Both do the same thing! In competitive programming, \\n is faster so it's used more!`
        },
        {
          id: "ch4-pred2",
          type: "predict" as const,
          title: "Without endl?",
          code: 'std::cout << "Hello";\nstd::cout << "World";',
          options: ["Hello and World on two lines", "HelloWorld on one line", "Hello World (with space)"],
          answer: 1,
          explanation: "Without endl, there's no line break — HelloWorld prints on one line!"
        },
      ]
    },
    // ============================================
    // Chapter 5: Review Quiz
    // ============================================
    {
      id: "ch5",
      title: "Review Quiz",
      emoji: "🧪",
      steps: [
        {
          id: "ch5-q1",
          type: "quiz",
          title: "Understanding #include",
          content: `Which header must you #include to use std::cout?`,
          options: [
            "#include <stdio>",
            "#include <iostream>",
            "#include <output>",
            "#include <print>"
          ],
          answer: 1,
          explanation: "iostream stands for input/output stream — required for std::cout!"
        },
        {
          id: "ch5-q2",
          type: "quiz",
          title: "Semicolons!",
          content: `Why does this code cause an error?
\`\`\`cpp
std::cout << "Hi" << std::endl
\`\`\``,
          options: [
            "endl is wrong",
            "<< is wrong",
            "Missing semicolon (;) at the end",
            "Missing #include"
          ],
          answer: 2,
          explanation: "In C++, every statement MUST end with ; — forget it and the compiler throws an error!"
        },
        {
          id: "ch5-q3",
          type: "quiz",
          title: "Compile command",
          content: `How do you compile main.cpp in the terminal?`,
          options: [
            "python main.cpp",
            "run main.cpp",
            "g++ main.cpp",
            "compile main.cpp"
          ],
          answer: 2,
          explanation: "g++ is the C++ compiler! g++ main.cpp creates an a.out executable."
        },
        {
          id: "ch5-q4",
          type: "quiz",
          title: "Naming the executable",
          content: `How do you compile main.cpp into an executable named "hello"?`,
          options: [
            "g++ main.cpp hello",
            "g++ -o hello main.cpp",
            "g++ main.cpp --name hello",
            "compile -o hello main.cpp"
          ],
          answer: 1,
          explanation: "The -o flag lets you name the output! g++ -o hello main.cpp → ./hello to run!"
        },
        {
          id: "ch5-summary",
          type: "explain",
          title: "🎯 What you learned today!",
          content: `## ✅ Today's Summary!

- ✅ **Compiling** — C++ converts code to binary, then runs → fast!
- ✅ **.cpp** — C++ file extension (Python uses .py)
- ✅ **int main() { }** — Program entry point, { } for blocks
- ✅ **#include <iostream>** — Import output tools
- ✅ **std::cout <<** — Print to screen (= Python's print)
- ✅ **std::endl** — Line break
- ✅ **;** — Required at end of every statement!
- ✅ **g++ filename.cpp** — Compile → creates a.out
- ✅ **./a.out** — Run it!
- ✅ **g++ -o name filename.cpp** — Name the executable

🚀 **Next time: Variables & Types** — Store data with int, string, and double!`
        }
      ]
    }
  ]
}
