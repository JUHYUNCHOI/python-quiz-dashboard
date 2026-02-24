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
          title: "🎯 What We're Building!",
          content: `Let's use everything we learned in Part 2
to build a **Number Guessing Game**!

> Since we can't use \`input()\` in the web environment,
> we'll use a **pre-made list of guesses**!

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
          title: "🎲 The random Module",
          content: `Let the computer generate a random number!

**import** = Bringing in built-in Python features!
\`\`\`python
import random  # Import the random module!
\`\`\`

Now we can use \`random.randint()\` to generate a random number:
\`\`\`python
# Random number between 1 and 100
secret = random.randint(1, 100)
print(secret)  # A different number each time!
\`\`\`

**randint(a, b)**: An integer from a to b (inclusive)

> In our exercises, we'll **fix the answer**
> so we can verify the output!`
        },
        {
          id: "try-random",
          type: "tryit",
          title: "🖥️ Generate a Random Number",
          task: "Print a random number between 1 and 10!",
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
          title: "1️⃣ Make One Guess",
          task: "Check if the guess is correct!",
          initialCode: "import random\n\nsecret = 7  # Set the answer in advance\n\n# Instead of input(), we assign directly\nguess = 5\n\nif guess == secret:\n    print('🎉 Correct!')\n# What if the guess is less than the secret? Greater?\n___ guess < secret:\n    print('⬆️ Try a bigger number!')\n___:\n    print('⬇️ Try a smaller number!')",
          expectedOutput: "⬆️ Try a bigger number!",
          hint: "Use if-elif-else to compare!",
          hint2: "elif guess < secret:"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ Guess Repeatedly",
          task: "Keep guessing until you get it right!",
          initialCode: "secret = 7\n# Instead of input(), use a list of guesses!\nguesses = [3, 5, 9, 7]\n\nfor guess in guesses:\n    if guess == secret:\n        print(f'🎉 Correct! {guess}!')\n        ___  # Exit the loop!\n    elif guess < secret:\n        print(f'{guess}: ⬆️ Try a bigger number!')\n    else:\n        print(f'{guess}: ⬇️ Try a smaller number!')",
          expectedOutput: "3: ⬆️ Try a bigger number!\n5: ⬆️ Try a bigger number!\n9: ⬇️ Try a smaller number!\n🎉 Correct! 7!",
          hint: "Use break to exit when correct!",
          hint2: "break"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ Count the Attempts",
          task: "Count how many tries it took!",
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
          title: "🏆 Complete Game!",
          task: "Build a complete game with title, range info, and attempt counter!",
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

### Concepts Used:
✅ Lists - Guess list
✅ if-elif-else - Conditional comparison
✅ for loop - Iterating through a list
✅ break - Exiting a loop
✅ Comparison operators (<, >, ==)
✅ Counter variable - Counting attempts

### Challenge Tasks 💪
- Limit maximum attempts (10 tries)
- Add a hint feature
- Difficulty selection (easy/medium/hard)
- Play again feature

Learn about lists and dictionaries in **Part 3**! 🚀`
        }
      ]
    }
  ]
}
