// ============================================
// Lesson 29: Vocabulary Book Program
// ============================================
import { LessonData } from './types'

export const lesson29EnData: LessonData = {
  id: "29en",
  title: "Vocabulary Book Program",
  emoji: "📖",
  description: "Build a vocabulary book with dictionaries! Add, search, and delete words!",
  chapters: [
    {
      id: "ch1",
      title: "Vocabulary Book Program",
      emoji: "📖",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 Think About It: Storing Words",
          content: `![Storing Words](/lessons/l29/ch1-0-vocab.png)

💭 I want to make a vocabulary book! apple means sagwa, banana means banana... How do I store **words** paired with their **meanings**?

\`\`\`python
vocab = {}
vocab['apple'] = 'a round red fruit'
vocab['banana'] = 'a long yellow fruit'
print(vocab['apple'])  # a round red fruit
\`\`\`

@Key idea: Use a **dictionary** to store word:meaning pairs!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "📖 Add Words!",
          task: "Fill in the blanks to add words to the vocabulary book and search for them!",
          initialCode: `vocab = {}

# Add words
vocab['apple'] = 'a round red fruit'
vocab['banana'] = 'a long yellow fruit'
vocab[___] = 'a small red fruit'

# Search for a word
word = 'apple'
if word ___ vocab:
    print(f'{word} = {vocab[___]}')
else:
    print(f'{word} not found')

print(f'Vocab size: {len(vocab)} words')`,
          expectedOutput: `apple = a round red fruit\nVocab size: 3 words`,
          hint: "Store with a key in the dictionary! Use 'in' to check if it exists!",
          hint2: "'cherry' / in / word"
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "💭 Think About It: Add/Search/Delete",
          content: `![Vocab Features](/lessons/l29/ch1-2-crud.png)

💭 Just adding words isn't enough! I need to **search** and **delete** wrong words too. How do I distinguish between these actions?

\`\`\`python
# Use commands to distinguish!
action = 'add'      # add
action = 'search'   # search
action = 'delete'   # delete
action = 'list'     # list all

# Branch with if/elif!
\`\`\`

@Key idea: Use \`if/elif\` branching to handle add/search/delete/list actions!`
        },
        {
          id: "ch1-3",
          type: "mission",
          title: "🎯 Mission: Complete the Vocab Book!",
          task: "Fill in 3 blanks to complete the vocabulary book program!",
          initialCode: `vocab = {}

commands = [
    ('add', 'apple', 'a round red fruit'),
    ('add', 'banana', 'a long yellow fruit'),
    ('add', 'cherry', 'a small red fruit'),
    ('search', 'apple', ''),
    ('search', 'grape', ''),
    ('delete', 'banana', ''),
    ('list', '', ''),
]

for cmd in commands:
    action = cmd[0]

    if action == 'add':
        word, meaning = cmd[1], cmd[2]
        vocab[word] = ___
        print(f'+ {word}: {meaning}')

    elif action == 'search':
        word = cmd[1]
        if word ___ vocab:
            print(f'O {word} = {vocab[word]}')
        else:
            print(f'X {word} not found')

    elif action == 'delete':
        word = cmd[1]
        if word in vocab:
            ___ vocab[word]
            print(f'- {word} deleted')

    elif action == 'list':
        print(f'--- Vocab Book ({len(vocab)} words) ---')
        for w, m in vocab.items():
            print(f'  {w}: {m}')`,
          expectedOutput: `+ apple: a round red fruit\n+ banana: a long yellow fruit\n+ cherry: a small red fruit\nO apple = a round red fruit\nX grape not found\n- banana deleted\n--- Vocab Book (2 words) ---\n  apple: a round red fruit\n  cherry: a small red fruit`,
          hint: "Store the meaning, search with 'in', delete with 'del'!",
          hint2: "meaning / in / del"
        }
      ]
    }
  ]
}
