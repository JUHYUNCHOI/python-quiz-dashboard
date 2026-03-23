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
      title: "Say Hello in C++!",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎉 Meet C++!",
          content: `Have you ever played Minecraft? Minecraft was built with C++! So were League of Legends and Fortnite. Most of the programs you use every day are made with C++.

C++ is just another programming language, like Python. The syntax is different, that's all!

But **why learn C++?** 🤔

The **games** we play every day (Unreal Engine, LOL, Minecraft), **operating systems** (Windows, macOS), **embedded systems** (robots, cars, IoT devices)... they're all made with C++!

C++ is **fast and can directly control hardware**, so it's practically essential wherever performance matters. It's also the most popular language in competitive programming (USACO, IOI)! 🏆

For those who learned Python, there are **two big differences**:

**1. You need to compile** — We never did this in Python!
**2. Syntax is stricter** — Semicolons, curly braces, and more`
        },
        {
          id: "ch1-compile",
          type: "explain",
          title: "🔧 What is compiling?",
          content: `In Python, you just hit Run and see results right away, right?

C++ is different! You need to **convert** your code into something the computer understands (0s and 1s). This is called **compiling**!

It's a bit annoying, and sometimes takes time, but... since the computer runs code in its own language, it runs SO much **faster**! ⚡

💡 Think about it — we read much faster in our own language than having someone translate every page as we go!`,
          component: "compileVisualizer",
        },
        // ── Check compile understanding ──
        {
          id: "ch1-quiz-compile",
          type: "quiz",
          title: "Check your understanding!",
          content: `Python runs code immediately, but C++ needs one extra step before running.

What is that step?`,
          options: ["Compile", "Debug", "Format", "Upload"],
          answer: 0,
          explanation: "C++ needs to convert code into the computer's language (0s and 1s) first — that's compiling! Debugging is finding bugs, formatting is making code look pretty."
        },
        // ── Transition: Let's try it! ──
        {
          id: "ch1-file",
          type: "explain" as const,
          title: "📁 Create your own .cpp file!",
          content: `Now let's write some C++ code!

First, let's learn about C++ file extensions.

Python files end with \`.py\`, right?
C++ files end with \`.cpp\`!

| Python 🐍 | C++ ⚡ |
|---|---|
| main**.py** | main**.cpp** |

In this lesson, you'll write C++ code right here in the browser. Later, you can create your own \`.cpp\` files in an editor like VS Code! 😊`,
        },
        // ── cout intro ──
        {
          id: "ch2-cout-intro",
          type: "explain",
          title: "🖨️ Let's print something!",
          content: `In Python, you did this:

\`\`\`python
print("Hello")
\`\`\`

In C++, you write:

\`\`\`cpp
std::cout << "Hello" << std::endl;
\`\`\`

Looks like a lot, right? Let's break it down:

- \`std::cout\` → Print to screen! (Python's \`print\`)
- \`<<\` → "Send this!" (look at the arrow direction — it pushes left!)
- \`std::endl\` → Line break (Python does this automatically, C++ doesn't!)
- \`;\` → End of statement! C++ needs a **semicolon after every command**

(We'll explain std:: later! For now, just know it means **'using a standard tool'** 📌)`
        },
        // ── Check cout immediately ──
        {
          id: "ch2-quiz-cout",
          type: "quiz",
          title: "Python → C++ translation!",
          content: `In Python, \`print("Hello")\` prints Hello to the screen.

How do you do the same thing in C++?`,
          options: [
            'std::cout << "Hello" << std::endl;',
            'print("Hello");',
            'echo "Hello";',
            'System.out.println("Hello");'
          ],
          answer: 0,
          explanation: "Python's print() = C++'s std::cout << ! And don't forget the semicolon (;) at the end!"
        },
        // ── #include ──
        {
          id: "ch2-include",
          type: "explain",
          title: "📦 Wait! You can't just use it",
          content: `You can't just write cout and expect it to work!

C++ doesn't have printing built in.
→ You need to tell it **"bring me the output tools!"** first.

That's this line:
\`\`\`cpp
#include <iostream>
\`\`\`

It's the same concept as Python's \`import\`!

| Python 🐍 | C++ ⚡ |
|---|---|
| \`import math\` | \`#include <cmath>\` |
| *(print just works)* | \`#include <iostream>\` |

💡 Think of **#include as reaching into a toolbox**. Need output? Grab iostream. Need math? Grab cmath! 🧰

⚠️ Leave it out? The compiler says **"what's cout?"** — error!`
        },
        // ── Check include ──
        {
          id: "ch2-q1a",
          type: "quiz",
          title: "What if you remove #include?",
          content: `What happens if you leave out #include <iostream> and try to use cout?`,
          options: [
            "The program runs slower",
            "You can't use cout (compile error)",
            "The program runs but nothing is printed",
            "Nothing goes wrong"
          ],
          answer: 1,
          explanation: "#include <iostream> is required to use cout and cin. Without it, the compiler won't know what cout is!"
        },
        // ── int main() ──
        {
          id: "ch2-main",
          type: "explain",
          title: "🏁 Where do we write code? int main()!",
          content: `We got our tools and learned cout. But you can't just write code **anywhere**!

C++ programs start inside **int main()**:

\`\`\`cpp
int main() {
    // write code here!
}
\`\`\`

Why? Because C++ looks for the \`main\` function and starts running from there.
→ It's like saying "this is the starting line!"

In Python, you used \`:\` and **indentation** for code blocks.
In C++, you use **{ }** instead. Don't forget your brackets!

💡 Don't worry about what \`int\` means yet! Just remember **"this is how we start."**`
        },
        // ── Check main ──
        {
          id: "ch2-fb-main",
          type: "fillblank" as const,
          title: "C++ program starting point!",
          content: "Fill in the blanks to make a C++ program's starting point!",
          code: "___ main() ___\n    // code goes here!\n___",
          fillBlanks: [
            { id: 0, answer: "int", options: ["int", "def", "void", "func"] },
            { id: 1, answer: "{", options: ["{", ":", "(", "["] },
            { id: 2, answer: "}", options: ["}", ";", ")", "]"] }
          ],
          explanation: "C++ starts inside int main() { }! Instead of Python's : we use { } for code blocks."
        },
        // ── Full assembly ──
        {
          id: "ch2-assemble",
          type: "explain",
          title: "🧩 Put it all together!",
          component: "helloWorldBuilder",
          content: `Let's combine everything we've learned!

**① Get tools** → \`#include <iostream>\`
**② Starting point** → \`int main() { }\`
**③ Print** → \`std::cout << "Hello" << std::endl;\`
**④ Done signal** → \`return 0;\`

Put it together:

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\`

\`return 0;\` means **"finished without problems!"** It's like raising your hand after a test and saying "I'm done!" ✋

🎉 Congrats! This is your **first C++ program**!`
        },
        // ── Predict ──
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "What does this output?",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hi!" << std::endl;\n    return 0;\n}',
          options: ["Hi!", "Hi! endl", "std::cout Hi!", "Error"],
          answer: 0,
          explanation: "std::cout prints to screen, std::endl just adds a line break! Only Hi! appears on screen."
        },
        // ── Fill in complete program ──
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "Complete the full program!",
          content: "Combine everything you learned!",
          code: "___ <iostream>\n\nint main() {\n    std::cout ___ \"Hello\" ___ std::endl;\n    return 0;\n}",
          fillBlanks: [
            { id: 0, answer: "#include", options: ["#include", "import", "using", "require"] },
            { id: 1, answer: "<<", options: ["<<", ">>", "->", "=="] },
            { id: 2, answer: "<<", options: ["<<", ">>", "+", "&&"] }
          ],
          explanation: "#include brings in tools, and << sends values to cout! << means 'send this!'"
        },
        // ── Quiz ──
        {
          id: "ch2-q1",
          type: "quiz",
          title: "#include quiz!",
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

💡 Want a custom name? \`g++ -o hello main.cpp\` creates an executable called \`hello\`!`,
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
