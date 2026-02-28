// ============================================
// C++ Project 1: Number Guessing Game
// Part 1 Review Project
// C++ for students who already know Python
// ============================================
import { LessonData } from '../types'

export const cppLessonP1EnData: LessonData = {
  id: "cpp-p1",
  title: "Number Guessing Game",
  emoji: "🎮",
  description: "Part 1 Review Project! Build a random number guessing game.",
  chapters: [
    // ============================================
    // Chapter 1: Game Design
    // ============================================
    {
      id: "ch1",
      title: "Game Design",
      emoji: "🎯",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "🎮 Project Introduction",
          content: `Let's build a **Number Guessing Game** in C++!

The computer picks a number between 1 and 100, and we try to guess it.

**Here's what the finished game looks like:**
\`\`\`
=== Number Guessing Game ===
Guess a number between 1 and 100!

Enter: 50
⬆️ Go higher!

Enter: 75
⬇️ Go lower!

Enter: 63
🎉 Correct! You got it in 3 tries!
\`\`\`

If you've already built this in Python, now it's time to rebuild it in C++!

**What we'll use:**
- \`while\` — Keep asking for input
- \`if/else\` — Compare bigger or smaller
- \`cin/cout\` — Input and output
- \`rand()\` — Generate random numbers
- Functions — Keep our code organized

💡 We're combining everything from Part 1 into one program!`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "🎲 rand() — Making Random Numbers",
          content: `To make random numbers in C++, we use \`rand()\`!

**Python 🐍:**
\`\`\`python
import random
number = random.randint(1, 100)  # Random 1~100
\`\`\`

**C++ ⚡:**
\`\`\`cpp
#include <cstdlib>  // for rand(), srand()
#include <ctime>    // for time()

srand(time(0));          // Set random seed (once at start!)
int number = rand() % 100 + 1;  // Random 1~100
\`\`\`

**Let's break it down:**
| Code | Meaning |
|---|---|
| \`#include <cstdlib>\` | Header for rand and srand |
| \`#include <ctime>\` | Header for time function |
| \`srand(time(0))\` | Set seed so numbers are different each run |
| \`rand() % 100\` | Number between 0~99 |
| \`rand() % 100 + 1\` | Number between 1~100 |

💡 Without \`srand(time(0))\`, you'd get the same numbers every time! Python does this automatically, but in C++ we have to do it ourselves.`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "What's the range of rand()?",
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int x = rand() % 10 + 1;
    cout << x << endl;
    return 0;
}`,
          options: ["A number from 0~9", "A number from 1~10", "A number from 1~100", "Always 10"],
          answer: 1,
          explanation: "rand() % 10 gives 0~9, and +1 makes it 1~10! The formula rand() % N + 1 gives a range of 1 to N."
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "What does the game need?",
          content: `Which of these is **NOT needed** for a number guessing game?`,
          options: [
            "while loop (keep asking for input)",
            "if/else (compare bigger or smaller)",
            "Array (store multiple numbers)",
            "rand() (generate random number)"
          ],
          answer: 2,
          explanation: "We don't need arrays! A number guessing game only needs a while loop, if/else comparisons, and rand() for the random number."
        }
      ]
    },
    // ============================================
    // Chapter 2: Step by Step
    // ============================================
    {
      id: "ch2",
      title: "Step by Step",
      emoji: "🔨",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "📦 Step 1: Generate a Random Number",
          content: `First, let's make the computer pick a secret number!

**What we need:**
1. \`#include <cstdlib>\` — needed for rand()
2. \`#include <ctime>\` — needed for time()
3. \`srand(time(0))\` — set the random seed
4. \`rand() % 100 + 1\` — random number 1~100

**In Python, this would be:**
\`\`\`python
import random
answer = random.randint(1, 100)
print(f"Answer: {answer}")  # For testing
\`\`\`

**In C++:**
\`\`\`cpp
srand(time(0));
int answer = rand() % 100 + 1;
cout << "Answer: " << answer << endl;  // For testing
\`\`\`

💡 We print the answer first to make sure it works. We'll remove it later!`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1: Generate a Random Number",
          content: `This code generates a random number and prints it. You'll get a different number each time you run it!

Once this works, we'll move to the next step.`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int answer = rand() % 100 + 1;
    cout << "Answer: " << answer << endl;  // For testing
    return 0;
}`,
          expectedOutput: `Answer: 42`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔄 Step 2: Loop + Compare",
          content: `Now let's build the core game logic!

We use a **while loop** to keep asking until the player guesses right.

\`\`\`
while (true) → Loop forever!
  ├── Get input (cin >> guess)
  ├── Increment tries
  ├── if (guess < answer) → "Go higher!"
  ├── else if (guess > answer) → "Go lower!"
  └── else → "Correct!" → break out!
\`\`\`

**In Python:**
\`\`\`python
while True:
    guess = int(input("Enter: "))
    tries += 1
    if guess < answer:
        print("Go higher!")
    elif guess > answer:
        print("Go lower!")
    else:
        print(f"Correct! Got it in {tries} tries!")
        break
\`\`\`

C++ has almost the same structure! \`while(True)\` becomes \`while(true)\`, and \`elif\` becomes \`else if\`!

💡 \`break\` works the same in both Python and C++. It exits the loop immediately!`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2: Input and Compare",
          content: `This code uses a while loop to keep taking guesses and comparing them to the answer.

It gives hints until you get it right, then tells you how many tries it took!`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    int answer = rand() % 100 + 1;
    int guess;
    int tries = 0;

    cout << "=== Number Guessing Game ===" << endl;
    cout << "Guess a number between 1 and 100!" << endl;

    while (true) {
        cout << "Enter: ";
        cin >> guess;
        tries++;

        if (guess < answer) {
            cout << "⬆️ Go higher!" << endl;
        } else if (guess > answer) {
            cout << "⬇️ Go lower!" << endl;
        } else {
            cout << "🎉 Correct! You got it in " << tries << " tries!" << endl;
            break;
        }
    }
    return 0;
}`,
          expectedOutput: `=== Number Guessing Game ===
Guess a number between 1 and 100!
Enter: 50
⬆️ Go higher!
Enter: 75
⬇️ Go lower!
Enter: 63
🎉 Correct! You got it in 3 tries!`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Predict the output!",
          code: `// Assume answer = 42
// User enters 50, 30, 42 in order

while (true) {
    cout << "Enter: ";
    cin >> guess;
    tries++;

    if (guess < answer) {
        cout << "UP" << endl;
    } else if (guess > answer) {
        cout << "DOWN" << endl;
    } else {
        cout << "CORRECT " << tries << endl;
        break;
    }
}`,
          options: [
            "UP → DOWN → CORRECT 3",
            "DOWN → UP → CORRECT 3",
            "DOWN → UP → CORRECT 2",
            "UP → UP → CORRECT 3"
          ],
          answer: 1,
          explanation: "50 > 42 → DOWN, 30 < 42 → UP, 42 == 42 → CORRECT! Total tries = 3. Follow the flow step by step!"
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🧩 Step 3: Organize with Functions",
          content: `The code works! Now let's **clean it up with functions**.

**We'll create two functions:**

1. \`getRandomNumber(min, max)\` — generates a random number
2. \`playGame()\` — runs one round of the game

**In Python:**
\`\`\`python
def get_random_number(min_val, max_val):
    return random.randint(min_val, max_val)

def play_game():
    answer = get_random_number(1, 100)
    # ... game logic ...
\`\`\`

**In C++:**
\`\`\`cpp
int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}

void playGame() {
    int answer = getRandomNumber(1, 100);
    // ... game logic ...
}
\`\`\`

And we'll use a \`do-while\` loop to ask "Play again?"!

**do-while is a C++ loop that Python doesn't have:**
\`\`\`cpp
do {
    // Runs at least once!
    playGame();
    cout << "Play again? (y/n): ";
    cin >> playAgain;
} while (playAgain == 'y');
\`\`\`

💡 \`do-while\` means "do it first, then check the condition." Since you always want to play at least one round, it's perfect here!`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ Step 3: Final Complete Code!",
          content: `Here's the final version with functions and a play-again feature using do-while!

This is the complete Number Guessing Game. Read through the code and see how each function does its job!`,
          code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int getRandomNumber(int min, int max) {
    return rand() % (max - min + 1) + min;
}

void playGame() {
    int answer = getRandomNumber(1, 100);
    int guess;
    int tries = 0;

    cout << "\\n=== Number Guessing Game ===" << endl;
    cout << "Guess a number between 1 and 100!" << endl;

    while (true) {
        cout << "\\nEnter: ";
        cin >> guess;
        tries++;

        if (guess < answer) {
            cout << "⬆️ Go higher!" << endl;
        } else if (guess > answer) {
            cout << "⬇️ Go lower!" << endl;
        } else {
            cout << "🎉 Correct! You got it in " << tries << " tries!" << endl;
            break;
        }
    }
}

int main() {
    srand(time(0));

    char playAgain;
    do {
        playGame();
        cout << "\\nPlay again? (y/n): ";
        cin >> playAgain;
    } while (playAgain == 'y' || playAgain == 'Y');

    cout << "Thanks for playing! 👋" << endl;
    return 0;
}`,
          expectedOutput: `=== Number Guessing Game ===
Guess a number between 1 and 100!

Enter: 50
⬆️ Go higher!

Enter: 75
⬇️ Go lower!

Enter: 63
🎉 Correct! You got it in 3 tries!

Play again? (y/n): n
Thanks for playing! 👋`
        }
      ]
    },
    // ============================================
    // Chapter 3: Complete & Challenge
    // ============================================
    {
      id: "ch3",
      title: "Complete & Challenge",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "🐍⚡ Python vs C++ Comparison",
          content: `Let's compare the same game in Python and C++ side by side!

**Python 🐍:**
\`\`\`python
import random

def play_game():
    answer = random.randint(1, 100)
    tries = 0

    while True:
        guess = int(input("Enter: "))
        tries += 1

        if guess < answer:
            print("Go higher!")
        elif guess > answer:
            print("Go lower!")
        else:
            print(f"Correct! Got it in {tries} tries!")
            break

play_game()
\`\`\`

**C++ ⚡:**
\`\`\`cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

void playGame() {
    int answer = rand() % 100 + 1;
    int guess, tries = 0;

    while (true) {
        cout << "Enter: ";
        cin >> guess;
        tries++;

        if (guess < answer)
            cout << "Go higher!" << endl;
        else if (guess > answer)
            cout << "Go lower!" << endl;
        else {
            cout << "Correct! " << tries << " tries!" << endl;
            break;
        }
    }
}

int main() {
    srand(time(0));
    playGame();
    return 0;
}
\`\`\`

| Feature | Python 🐍 | C++ ⚡ |
|---|---|---|
| Random | \`random.randint(1,100)\` | \`rand() % 100 + 1\` |
| Input | \`input()\` | \`cin >>\` |
| Output | \`print()\` | \`cout <<\` |
| Function | \`def play_game():\` | \`void playGame() {\` |
| Loop | \`while True:\` | \`while (true) {\` |
| Branch | \`elif\` | \`else if\` |

💡 The structure is almost identical! Only the syntax is different.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "Code comprehension check!",
          content: `What range of numbers does \`rand() % 50 + 1\` produce?`,
          options: [
            "0~50",
            "1~50",
            "1~51",
            "0~49"
          ],
          answer: 1,
          explanation: "rand() % 50 gives 0~49, and +1 makes it 1~50! The formula rand() % N + 1 always gives a range of 1 to N."
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "do-while feature!",
          content: `Which statement about \`do-while\` loops is correct?`,
          options: [
            "It won't run if the condition is false",
            "It always runs at least once",
            "It's the same as Python's for loop",
            "You can't use break inside it"
          ],
          answer: 1,
          explanation: "do-while runs the body first, then checks the condition, so it always executes at least once! This loop doesn't exist in Python."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "🚀 Challenge Ideas!",
          content: `The game is done! Want to make it even cooler?

**Challenge 1: Difficulty Selection** 🎚️
\`\`\`cpp
// Use switch for difficulty!
cout << "Difficulty: 1.Easy 2.Normal 3.Hard" << endl;
int level;
cin >> level;

int maxNum;
switch (level) {
    case 1: maxNum = 10; break;   // 1~10
    case 2: maxNum = 100; break;  // 1~100
    case 3: maxNum = 1000; break; // 1~1000
    default: maxNum = 100;
}
int answer = rand() % maxNum + 1;
\`\`\`

**Challenge 2: High Score Tracking** 🏅
\`\`\`cpp
int bestScore = 999;  // Best record (lower is better)

// After game ends:
if (tries < bestScore) {
    bestScore = tries;
    cout << "New record! 🏆" << endl;
}
cout << "Best score: " << bestScore << " tries" << endl;
\`\`\`

**Challenge 3: Hint System** 💡
\`\`\`cpp
if (tries == 5) {
    cout << "Hint: The answer is between "
         << (answer / 10) * 10 << " and "
         << (answer / 10) * 10 + 9 << "!" << endl;
}
\`\`\`

💡 Try adding these challenges yourself — it's the perfect way to review everything from Part 1!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 Project Complete!",
          content: `## 🎉 You've completed the Part 1 Project!

**What you used in this project:**
- ✅ **cin/cout** — User input and output
- ✅ **if/else if/else** — Comparing bigger and smaller
- ✅ **while (true) + break** — Loop until correct
- ✅ **rand(), srand()** — Random number generation
- ✅ **Functions** — getRandomNumber(), playGame()
- ✅ **do-while** — Play again feature

That's almost every concept from Part 1 (Lessons 1-8)!

**Did you notice how everything connects naturally in one program?**

You're now ready for Part 2, where you'll learn even more powerful C++ features! 💪`
        }
      ]
    }
  ]
}
