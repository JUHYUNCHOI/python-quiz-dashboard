// ============================================
// Project 3: Hangman Game
// ============================================
import { LessonData } from './types'

export const lessonP3EnData: LessonData = {
  id: "p3en",
  title: "Hangman Game",
  emoji: "🎮",
  description: "Part 3 Review Project! Build a word-guessing Hangman game.",
  chapters: [
    {
      id: "ch1",
      title: "Project Introduction",
      emoji: "🎮",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 What We're Building!",
          content: `Let's use everything we learned in Part 3
to build a **Hangman Game**!

\`\`\`
=== 🎮 Hangman Game ===
Hint: 5-letter word

_ _ _ _ _   (Chances left: 5)
Letter: a
🎉 Correct!

a _ _ _ _   (Chances left: 5)
Letter: e
🎉 Correct!
...
🎉 You win! The word was 'apple'!
\`\`\`

**Concepts we'll use:**
- Lists
- Dictionaries
- Loops
- Conditionals
- Strings`
        },
        {
          id: "concept",
          type: "explain",
          title: "📚 Game Structure",
          content: `**Game Flow:**

1. Pick a word from a word list
2. Display the word hidden with underscores
3. Guess letters from a pre-made list
4. Reveal letters if correct, lose a chance if wrong
5. Repeat until the word is complete or chances run out

**Variables we need:**
- \`words\`: Word list
- \`secret\`: The word to guess
- \`guesses\`: List of letters to guess
- \`guessed\`: List of correctly guessed letters
- \`chances\`: Remaining chances`
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
          title: "1️⃣ Choose a Word",
          task: "Select a word from the list!",
          initialCode: "words = ['apple', 'banana', 'cherry', 'orange', 'grape']\nsecret = words[0]  # Fix to 'apple'\n\nprint(f'Selected word: {secret}')\nprint(f'Letter count: {len(secret)}')",
          expectedOutput: "Selected word: apple\nLetter count: 5",
          hint: "Select a word using the list index!",
          hint2: "secret = words[0]"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ Display with Underscores",
          task: "Hide the word and display it with underscores!",
          initialCode: "secret = 'apple'\nguessed = []  # Correctly guessed letters\n\n# Build the display string\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\n\nprint(display)",
          expectedOutput: "_ _ _ _ _ ",
          hint: "Use a for loop to check each letter!",
          hint2: "if letter in guessed: display += letter"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ Guess a Letter",
          task: "Enter a letter and check if it's correct!",
          initialCode: "secret = 'apple'\nguessed = ['a']  # Already guessed 'a'\n\n# Instead of input(), assign the letter directly\nguess = 'p'\n\nif guess in secret:\n    print('🎉 Correct!')\n    guessed.append(guess)\nelse:\n    print('❌ Wrong!')\n\nprint(f'Guessed letters: {guessed}')",
          expectedOutput: "🎉 Correct!\nGuessed letters: ['a', 'p']",
          hint: "Use 'in' to check if the letter exists!",
          hint2: "if guess in secret:"
        },
        {
          id: "step4",
          type: "tryit",
          title: "4️⃣ Check Win Condition",
          task: "Check if all letters have been guessed!",
          initialCode: "secret = 'apple'\nguessed = ['a', 'p', 'l', 'e']\n\n# Check if all letters are guessed\nall_found = True\nfor letter in secret:\n    if letter not in guessed:\n        all_found = False\n        break\n\nif all_found:\n    print('🎉 You win!')\nelse:\n    print('Keep trying!')",
          expectedOutput: "🎉 You win!",
          hint: "Check if every letter is in guessed!",
          hint2: "if letter not in guessed: all_found = False"
        }
      ]
    },
    {
      id: "ch3",
      title: "Complete the Game",
      emoji: "🎯",
      steps: [
        {
          id: "step5",
          type: "tryit",
          title: "5️⃣ Build the Game Loop",
          task: "Build a game that loops until win or lose!",
          initialCode: "secret = 'apple'\nguesses = ['a', 'e', 'x', 'p', 'l']  # Pre-made guesses\nguessed = []\nchances = 5\n\nprint('=== 🎮 Hangman Game ===')\nprint(f'Hint: {len(secret)}-letter word')\n\nfor guess in guesses:\n    # Display current state\n    display = ''\n    for letter in secret:\n        if letter in guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (Chances left: {chances})')\n    \n    # Check for win\n    all_found = True\n    for letter in secret:\n        if letter not in guessed:\n            all_found = False\n            break\n    \n    if all_found:\n        print(f'🎉 You win! The word was \\'{secret}\\'!')\n        break\n    \n    print(f'Letter: {guess}')\n    \n    if guess in guessed:\n        print('You already guessed that letter!')\n        continue\n    \n    if guess in secret:\n        print('🎉 Correct!')\n        guessed.append(guess)\n    else:\n        print('❌ Wrong!')\n        chances -= 1\n\n# Check final state\nif chances > 0:\n    display = ''\n    for letter in secret:\n        if letter in guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    if '_ ' not in display:\n        print(f'\\n{display}')\n        print(f'🎉 You win! The word was \\'{secret}\\'!')",
          expectedOutput: "=== 🎮 Hangman Game ===\nHint: 5-letter word\n\n_ _ _ _ _   (Chances left: 5)\nLetter: a\n🎉 Correct!\n\na _ _ _ _   (Chances left: 5)\nLetter: e\n🎉 Correct!\n\na _ _ _ e   (Chances left: 5)\nLetter: x\n❌ Wrong!\n\na _ _ _ e   (Chances left: 4)\nLetter: p\n🎉 Correct!\n\na p p _ e   (Chances left: 4)\nLetter: l\n🎉 Correct!\n\na p p l e \n🎉 You win! The word was 'apple'!",
          hint: "Use a for loop to try each pre-made letter!",
          hint2: "for guess in guesses:"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Project",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 Upgraded Hangman!",
          task: "Use a dictionary to manage words by category!",
          initialCode: "# Word dictionary by category\nword_categories = {\n    'Fruit': ['apple', 'banana', 'cherry'],\n    'Animal': ['tiger', 'rabbit', 'dolphin'],\n    'Country': ['korea', 'japan', 'france']\n}\n\ncategory = 'Fruit'\nwords = word_categories[category]\nsecret = words[0]  # 'apple'\nguesses = ['a', 'x', 'p', 'l', 'e']\nguessed = []\nchances = 5\n\nprint(f'=== 🎮 Hangman: {category} ===')\nprint(f'Guess the {len(secret)}-letter word!')\n\nfor guess in guesses:\n    display = ''\n    for letter in secret:\n        if letter ___ guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (Chances: {chances})')\n    \n    if '_' not in display:\n        print(f'🎉 You win! \\'{secret}\\'!')\n        break\n    \n    print(f'Letter: {guess}')\n    if guess in secret:\n        print('🎉 Correct!')\n        guessed.___(guess)\n    else:\n        print('❌ Wrong!')\n        chances ___ 1\n\n# Final win check\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\nif '_' not in display:\n    print(f'\\n{display}')\n    print(f'🎉 You win! \\'{secret}\\'!')",
          expectedOutput: "=== 🎮 Hangman: Fruit ===\nGuess the 5-letter word!\n\n_ _ _ _ _   (Chances: 5)\nLetter: a\n🎉 Correct!\n\na _ _ _ _   (Chances: 5)\nLetter: x\n❌ Wrong!\n\na _ _ _ _   (Chances: 4)\nLetter: p\n🎉 Correct!\n\na p p _ _   (Chances: 4)\nLetter: l\n🎉 Correct!\n\na p p l _   (Chances: 4)\nLetter: e\n🎉 Correct!\n\na p p l e \n🎉 You win! 'apple'!",
          hint: "Use 'in' to check membership!",
          hint2: "in / append / -= 1"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Project Complete!",
          content: `## Congratulations! 🎉

You completed the **Hangman Game**!

### Concepts Used:
✅ Lists - Storing words, guessed letters, guess letters
✅ Dictionaries - Managing words by category
✅ for loop - Iterating through letters, game loop
✅ if-elif-else - Conditional handling
✅ in operator - Checking membership
✅ String formatting - f-string

### Challenge Tasks 💪
- Add Hangman drawings (ASCII Art)
- Add a scoring system
- Adjust chances by difficulty level
- Save high scores

🎉 **Python Basics Mastered!**
Now try tackling more complex projects! 🚀`
        }
      ]
    }
  ]
}
