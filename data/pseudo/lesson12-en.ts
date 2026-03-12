// ============================================
// Pseudocode Lesson 12: String Handling (English)
// CIE Style Pseudocode - Manipulate text!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson12EnData: LessonData = {
  id: "pseudo-12",
  title: "String Handling",
  emoji: "🔤",
  description: "LENGTH, UCASE, LCASE, SUBSTRING!",
  chapters: [
    {
      id: "ch1",
      title: "LENGTH, UCASE, LCASE",
      emoji: "📏",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 String Handling Functions",
          content: `CIE pseudocode provides built-in functions to work with strings (text). These let you measure, convert, and extract parts of text!

The main string functions are:
- **LENGTH(str)** - returns the number of characters
- **UCASE(str)** - converts to UPPERCASE
- **LCASE(str)** - converts to lowercase
- **SUBSTRING(str, start, length)** - extracts part of a string

Let's learn each one!`
        },
        {
          id: "ch1-length",
          type: "explain",
          title: "📏 LENGTH() Function",
          content: `**LENGTH(str)** returns the number of characters in a string, including spaces!

\`\`\`
DECLARE word : STRING
word ← "Hello"
OUTPUT LENGTH(word)
\`\`\`
Output: **5**

More examples:
\`\`\`
OUTPUT LENGTH("Python")     // 6
OUTPUT LENGTH("Hi there")   // 8 (space counts!)
OUTPUT LENGTH("")            // 0 (empty string)
\`\`\`

LENGTH is useful for:
- Checking if input is empty
- Validating password length
- Looping through each character`
        },
        {
          id: "ch1-case",
          type: "explain",
          title: "🔠 UCASE() and LCASE()",
          content: `**UCASE(str)** converts all letters to **UPPERCASE**.
**LCASE(str)** converts all letters to **lowercase**.

\`\`\`
DECLARE name : STRING
name ← "Alice"

OUTPUT UCASE(name)
OUTPUT LCASE(name)
\`\`\`

Output:
\`\`\`
ALICE
alice
\`\`\`

These are very useful for **case-insensitive comparisons**:

\`\`\`
DECLARE answer : STRING
INPUT answer

IF UCASE(answer) = "YES" THEN
    OUTPUT "You agreed!"
ENDIF
\`\`\`

Now the user can type "yes", "YES", "Yes", or even "yEs" and it will all match!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE text : STRING
text ← "Hello World"
OUTPUT LCASE(text)
\`\`\``,
          options: [
            'hello world',
            'HELLO WORLD',
            'Hello World',
            'hELLO wORLD'
          ],
          answer: 0,
          explanation: 'LCASE converts ALL characters to lowercase. "Hello World" becomes **"hello world"**. Spaces and non-letter characters are not affected.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Use string functions to check the length and convert to uppercase.',
          code: 'DECLARE name : STRING\nname ← "computer"\nOUTPUT ___(name)\nOUTPUT ___(name)',
          fillBlanks: [
            { id: 1, answer: "LENGTH", options: ["LENGTH", "LEN", "SIZE", "COUNT"] },
            { id: 2, answer: "UCASE", options: ["UCASE", "UPPER", "TOUPPER", "CAPS"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "SUBSTRING",
      emoji: "✂️",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "✂️ SUBSTRING() Function",
          content: `**SUBSTRING(str, start, length)** extracts a portion of a string.

Parameters:
- **str** - the original string
- **start** - the position to start from (**1-indexed** in CIE!)
- **length** - how many characters to extract

\`\`\`
DECLARE word : STRING
word ← "COMPUTER"
OUTPUT SUBSTRING(word, 1, 3)
OUTPUT SUBSTRING(word, 4, 5)
\`\`\`

Output:
\`\`\`
COM
PUTER
\`\`\`

Let's visualize the positions:
| Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Character | C | O | M | P | U | T | E | R |

- \`SUBSTRING(word, 1, 3)\` starts at position 1, takes 3 chars: **COM**
- \`SUBSTRING(word, 4, 5)\` starts at position 4, takes 5 chars: **PUTER**

**Important:** CIE uses **1-based indexing**, so the first character is at position **1**, not 0!`
        },
        {
          id: "ch2-examples",
          type: "explain",
          title: "🎯 Practical SUBSTRING Examples",
          content: `**Example 1: Extract first name**
\`\`\`
DECLARE fullName : STRING
fullName ← "John Smith"
DECLARE firstName : STRING
firstName ← SUBSTRING(fullName, 1, 4)
OUTPUT firstName
\`\`\`
Output: **John**

**Example 2: Get file extension**
\`\`\`
DECLARE fileName : STRING
fileName ← "report.pdf"
DECLARE ext : STRING
DECLARE dotPos : INTEGER
dotPos ← 7
ext ← SUBSTRING(fileName, dotPos + 1, 3)
OUTPUT ext
\`\`\`
Output: **pdf**

**Example 3: Combine with LENGTH**
\`\`\`
DECLARE text : STRING
text ← "Hello"
DECLARE lastChar : STRING
lastChar ← SUBSTRING(text, LENGTH(text), 1)
OUTPUT lastChar
\`\`\`
Output: **o** (the last character!)`
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE word : STRING
word ← "SCIENCE"
OUTPUT SUBSTRING(word, 1, 1)
OUTPUT SUBSTRING(word, 4, 3)
\`\`\``,
          options: [
            'S  then  ENC',
            'SC  then  ENC',
            'S  then  NCE',
            'S  then  EN'
          ],
          answer: 0,
          explanation: '`SUBSTRING("SCIENCE", 1, 1)` takes 1 char from position 1: **S**. `SUBSTRING("SCIENCE", 4, 3)` takes 3 chars from position 4: E-N-C = **ENC**.'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Extract the first 3 characters and convert them to uppercase.',
          code: 'DECLARE text : STRING\ntext ← "python"\nDECLARE first3 : STRING\nfirst3 ← ___(text, ___, 3)\nOUTPUT UCASE(first3)',
          fillBlanks: [
            { id: 1, answer: "SUBSTRING", options: ["SUBSTRING", "MID", "EXTRACT", "SLICE"] },
            { id: 2, answer: "1", options: ["1", "0", "3", "text"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "Combining String Functions",
      emoji: "🔗",
      steps: [
        {
          id: "ch3-combine",
          type: "explain",
          title: "🔗 Combining String Functions",
          content: `The real power comes from **combining** string functions together!

**Example 1: Check if input starts with a letter**
\`\`\`
DECLARE input : STRING
INPUT input
DECLARE firstChar : STRING
firstChar ← UCASE(SUBSTRING(input, 1, 1))
OUTPUT "Starts with: " & firstChar
\`\`\`

**Example 2: Create initials from a full name**
\`\`\`
DECLARE first : STRING
DECLARE last : STRING
first ← "John"
last ← "Smith"
DECLARE initials : STRING
initials ← SUBSTRING(first, 1, 1) & SUBSTRING(last, 1, 1)
OUTPUT initials
\`\`\`
Output: **JS**

**Example 3: Password length validation**
\`\`\`
DECLARE password : STRING
INPUT password
IF LENGTH(password) < 8 THEN
    OUTPUT "Password too short!"
ELSE
    OUTPUT "Password accepted"
ENDIF
\`\`\``
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'What does `UCASE(SUBSTRING("hello", 1, 1))` return?',
          options: [
            '"H"',
            '"h"',
            '"HELLO"',
            '"hello"'
          ],
          answer: 0,
          explanation: 'First, `SUBSTRING("hello", 1, 1)` extracts "h". Then `UCASE("h")` converts it to **"H"**. Functions can be nested like this!'
        },
        {
          id: "ch3-predict3",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
DECLARE email : STRING
email ← "user@test.com"
DECLARE atPos : INTEGER
atPos ← 5
DECLARE username : STRING
username ← SUBSTRING(email, 1, atPos - 1)
OUTPUT UCASE(username)
OUTPUT LENGTH(email)
\`\`\``,
          options: [
            'USER  then  13',
            'user  then  13',
            'USER@  then  12',
            'user@test  then  13'
          ],
          answer: 0,
          explanation: '`SUBSTRING(email, 1, 4)` extracts "user" (positions 1 to 4, since atPos - 1 = 4). `UCASE("user")` gives **"USER"**. `LENGTH("user@test.com")` is **13** characters.'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the code to extract and display the last 3 characters of a word in uppercase.',
          code: 'DECLARE word : STRING\nword ← "coding"\nDECLARE len : INTEGER\nlen ← ___(word)\nDECLARE last3 : STRING\nlast3 ← SUBSTRING(word, len - 2, ___)\nOUTPUT ___(last3)',
          fillBlanks: [
            { id: 1, answer: "LENGTH", options: ["LENGTH", "LEN", "SIZE", "COUNT"] },
            { id: 2, answer: "3", options: ["3", "2", "len", "1"] },
            { id: 3, answer: "UCASE", options: ["UCASE", "LCASE", "UPPER", "OUTPUT"] }
          ]
        }
      ]
    }
  ]
}
