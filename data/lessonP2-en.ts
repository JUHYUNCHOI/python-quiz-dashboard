// ============================================
// Project 2: Number Guessing Game
// ============================================
import { LessonData } from './types'

export const lessonP2EnData: LessonData = {
  id: "p2en",
  title: "Number Guessing Game",
  emoji: "🎯",
  description: "Part 2 Review Project! Build a number guessing game.",
  chapters: [
    {
      id: "ch1",
      title: "Project Introduction",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 Today: Number Guessing Game!",
          content: `Use everything you learned in Part 2 (if · for · while)
to build a **Number Guessing Game**!

> 💡 We can't use \`input()\` in the web,
> so we'll use a **pre-made list of guesses** to drive the game.
> Lists are covered in detail in **Part 3**!

\`\`\`
=== 🎯 Number Guessing Game ===

Attempt 1: 10
→ ⬇️ Try a smaller number!
Attempt 2: 4
→ ⬆️ Try a bigger number!
Attempt 3: 8
→ ⬇️ Try a smaller number!
Attempt 4: 6
→ ⬆️ Try a bigger number!
Attempt 5: 7
→ 🎉 Correct! You got it in 5 tries!
Game Over!
\`\`\`

**Concepts we'll use:**
- Conditionals (if-elif-else)
- Loops (for)
- Comparison operators
- break (exit loop)`
        },
        {
          id: "random",
          type: "explain",
          title: "🎲 Let the Computer Pick the Answer!",
          content: `It's a guessing game — so **the computer should pick the secret** randomly!

**import** = pulling in a tool that's already inside Python!
\`\`\`python
import random  # grab the random tool!
\`\`\`

Now \`random.randint()\` makes a random number:
\`\`\`python
# random number from 1 to 100
secret = random.randint(1, 100)
print(secret)  # different every time you run!
\`\`\`

**randint(a, b)**: one integer from a to b (inclusive)

> 💡 \`import\` and the \`random\` module are covered in detail in **Part 8**.
> For now, just know "one line gives you a random number"!
>
> In exercises, we lock the answer with \`random.seed(42)\` so output is repeatable.`
        },
        {
          id: "try-random",
          type: "tryit",
          title: "🖥️ Pull a Random Number!",
          task: "Grab one random number from 1 to 10 and print it!",
          initialCode: "import random\nrandom.seed(42)\n\n# Generate a random number between 1 and 10\nsecret = random.randint(___, ___)\nprint(f'Secret number: {secret}')",
          expectedOutput: "Secret number: 2",
          hint: "randint(1, 10) gives a number from 1 to 10!",
          hint2: "random.randint(1, 10)"
        }
      ]
    },
    {
      id: "ch2",
      title: "Step-by-Step Building",
      emoji: "🔧",
      steps: [
        {
          id: "step1",
          type: "tryit",
          title: "1️⃣ One Guess — Too Big or Too Small?",
          task: "Use if-elif-else to compare guess vs secret!",
          initialCode: "import random\n\nsecret = 7  # Set the answer in advance\n\n# Instead of input(), we assign directly\nguess = 5\n\nif guess == secret:\n    print('🎉 Correct!')\n# What if the guess is less than the secret? Greater?\n___ guess < secret:\n    print('⬆️ Try a bigger number!')\n___:\n    print('⬇️ Try a smaller number!')",
          expectedOutput: "⬆️ Try a bigger number!",
          hint: "Use if-elif-else to compare!",
          hint2: "elif guess < secret:"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ Stop When You're Right!",
          task: "Inside the for loop, use break when guess matches!",
          initialCode: "secret = 7\n# Instead of input(), use a list of guesses!\nguesses = [3, 5, 9, 7]\n\nfor guess in guesses:\n    if guess == secret:\n        print(f'🎉 Correct! {guess}!')\n        ___  # Exit the loop!\n    elif guess < secret:\n        print(f'{guess}: ⬆️ Try a bigger number!')\n    else:\n        print(f'{guess}: ⬇️ Try a smaller number!')",
          expectedOutput: "3: ⬆️ Try a bigger number!\n5: ⬆️ Try a bigger number!\n9: ⬇️ Try a smaller number!\n🎉 Correct! 7!",
          hint: "Use break to exit when correct!",
          hint2: "break"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ How Many Tries Did It Take?",
          task: "Use a count variable to track attempts!",
          initialCode: "secret = 7\nguesses = [3, 5, 9, 7]\n\ncount = 0\n\nfor guess in guesses:\n    count = ___  # Increase the count!\n    \n    if guess == secret:\n        print(f'🎉 Correct! Got it in {count} tries!')\n        break\n    elif guess < secret:\n        print(f'{guess}: ⬆️ Try a bigger number!')\n    else:\n        print(f'{guess}: ⬇️ Try a smaller number!')",
          expectedOutput: "3: ⬆️ Try a bigger number!\n5: ⬆️ Try a bigger number!\n9: ⬇️ Try a smaller number!\n🎉 Correct! Got it in 4 tries!",
          hint: "Increase count by 1 each time!",
          hint2: "count = count + 1"
        }
      ]
    },
    {
      id: "ch3",
      title: "Final Project",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 Build the Complete Game!",
          task: "Fill in break and the comparison to finish the game!",
          initialCode: "print('=== 🎯 Number Guessing Game ===')\n\nsecret = 7\nguesses = [10, 4, 8, 6, 7]\n\ncount = 0\n\nfor guess in guesses:\n    count += 1\n    print(f'Attempt {count}: {guess}')\n    \n    if guess == secret:\n        print(f'→ 🎉 Correct! Got it in {count} tries!')\n        ___  # Exit the loop!\n    elif ___:\n        print('→ ⬆️ Try a bigger number!')\n    else:\n        print('→ ⬇️ Try a smaller number!')\n\nprint('Game Over!')",
          expectedOutput: "=== 🎯 Number Guessing Game ===\nAttempt 1: 10\n→ ⬇️ Try a smaller number!\nAttempt 2: 4\n→ ⬆️ Try a bigger number!\nAttempt 3: 8\n→ ⬇️ Try a smaller number!\nAttempt 4: 6\n→ ⬆️ Try a bigger number!\nAttempt 5: 7\n→ 🎉 Correct! Got it in 5 tries!\nGame Over!",
          hint: "Use break to exit, guess < secret to compare!",
          hint2: "break / guess < secret"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Project Complete!",
          content: `## Congratulations! 🎉

You completed the **Number Guessing Game**!

### Concepts You Used:
✅ if-elif-else - comparing guesses
✅ for loop - one guess at a time
✅ break - stop when you win
✅ Comparison operators (<, >, ==)
✅ Counter variable - counting tries

> 💡 The list \`guesses = [3, 5, ...]\` and the \`random\` module
> are covered in detail in **Part 3 / Part 8**. Today we borrowed them as tools!

### Challenge Tasks 💪
- Change the secret to your favorite number (\`secret = 42\`)
- Make the guesses list longer / shorter
- Limit max attempts (10 tries)

Learn lists and dictionaries in **Part 3**! 🚀`
        }
      ]
    }
  ]
}
