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
          title: "🎮 Today: Hangman Game!",
          content: `Use lists, dictionaries, and loops from Part 3
to build a **word-guessing Hangman**!

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
          title: "📚 How Does the Game Work?",
          content: `**Game Flow:**

1. Pick one word from a word list
2. Show it hidden with underscores (_ _ _ _ _)
3. Guess letters one at a time from a pre-made list
4. Right → reveal the letter. Wrong → lose 1 chance
5. Repeat until you win or chances hit 0!

**5 variables you'll need:**
- \`words\`: word list ('apple', 'banana', ...)
- \`secret\`: the word to guess
- \`guesses\`: pre-made letter guesses
- \`guessed\`: letters you got right so far
- \`chances\`: chances left (usually 5)`
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
          title: "1️⃣ Pick One Word!",
          task: "Grab the first word from the words list and print it!",
          initialCode: "words = ['apple', 'banana', 'cherry', 'orange', 'grape']\nsecret = words[0]  # Fix to 'apple'\n\nprint(f'Selected word: {secret}')\nprint(f'Letter count: {len(secret)}')",
          expectedOutput: "Selected word: apple\nLetter count: 5",
          hint: "Select a word using the list index!",
          hint2: "secret = words[0]"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ Hide the Word with Underscores!",
          task: "Use a for loop to swap each letter for an underscore!",
          initialCode: "secret = 'apple'\nguessed = []  # Correctly guessed letters\n\n# Build the display string\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\n\nprint(display)",
          expectedOutput: "_ _ _ _ _ ",
          hint: "Use a for loop to check each letter!",
          hint2: "if letter in guessed: display += letter"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ Is the Letter in the Word?",
          task: "Use 'in' to check + append to guessed!",
          initialCode: "secret = 'apple'\nguessed = ['a']  # Already guessed 'a'\n\n# Instead of input(), assign the letter directly\nguess = 'p'\n\nif guess in secret:\n    print('🎉 Correct!')\n    guessed.append(guess)\nelse:\n    print('❌ Wrong!')\n\nprint(f'Guessed letters: {guessed}')",
          expectedOutput: "🎉 Correct!\nGuessed letters: ['a', 'p']",
          hint: "Use 'in' to check if the letter exists!",
          hint2: "if guess in secret:"
        },
        {
          id: "step4",
          type: "tryit",
          title: "4️⃣ Did You Get Every Letter?",
          task: "Use a for loop to check every letter is in guessed!",
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
          title: "5️⃣ The Real Game Loop!",
          task: "for over guesses → display, win check, chance loss — all in!",
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
          title: "🏆 Hangman with Categories!",
          task: "Use a dict for Fruit/Animal/Country + fill 3 blanks!",
          initialCode: "# Word dictionary by category\nword_categories = {\n    'Fruit': ['apple', 'banana', 'cherry'],\n    'Animal': ['tiger', 'rabbit', 'dolphin'],\n    'Country': ['korea', 'japan', 'france']\n}\n\ncategory = 'Fruit'\nwords = word_categories[category]\nsecret = words[0]  # 'apple'\nguesses = ['a', 'x', 'p', 'l', 'e']\nguessed = []\nchances = 5\n\nprint(f'=== 🎮 Hangman: {category} ===')\nprint(f'Guess the {len(secret)}-letter word!')\n\nfor guess in guesses:\n    display = ''\n    for letter in secret:\n        if letter ___ guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (Chances: {chances})')\n    \n    if '_' not in display:\n        print(f'🎉 You win! \\'{secret}\\'!')\n        break\n    \n    print(f'Letter: {guess}')\n    if guess in secret:\n        print('🎉 Correct!')\n        guessed.___(guess)\n    else:\n        print('❌ Wrong!')\n        chances ___ 1\n\n# Final win check\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\nif '_' not in display:\n    print(f'\\n{display}')\n    print(f'🎉 You win! \\'{secret}\\'!')",
          expectedOutput: "=== 🎮 Hangman: Fruit ===\nGuess the 5-letter word!\n\n_ _ _ _ _   (Chances: 5)\nLetter: a\n🎉 Correct!\n\na _ _ _ _   (Chances: 5)\nLetter: x\n❌ Wrong!\n\na _ _ _ _   (Chances: 4)\nLetter: p\n🎉 Correct!\n\na p p _ _   (Chances: 4)\nLetter: l\n🎉 Correct!\n\na p p l _   (Chances: 4)\nLetter: e\n🎉 Correct!\n\na p p l e \n🎉 You win! 'apple'!",
          hint: "First blank: in. Second: append. Third: -=!",
          hint2: "in / append / -="
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Project Complete!",
          content: `## Congratulations! 🎉

You completed the **Hangman Game**!

### Concepts You Used:
✅ Lists - words/guessed/guess letters
✅ Dictionaries - words by category
✅ for loop - letters and game loop
✅ if-elif-else - conditions
✅ in operator - checking membership
✅ f-string - score/state output

### Challenge Tasks 💪
- Add **your favorite word** to the words list!
- Make a **friend names** category in the dict
- Bump chances to 7 to make it easier
- Add Hangman drawings (ASCII Art)
- Add a scoring system

🎉 **Python Basics Mastered!**
Now on to bigger projects with functions and classes! 🚀`
        }
      ]
    }
  ]
}
