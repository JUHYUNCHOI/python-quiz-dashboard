// ============================================
// Pseudocode Lesson 20: Validation & Verification (English)
// CIE Style Pseudocode - Check that data is correct!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson20EnData: LessonData = {
  id: "pseudo-20",
  title: "Validation & Verification",
  emoji: "✅",
  description: "Check that data is correct and reasonable!",
  chapters: [
    {
      id: "ch1",
      title: "What is Validation?",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "✅ Validation vs Verification",
          content: `When users enter data, we must check it! There are two types of checking:

**Validation** = Is the data **reasonable and sensible**?
- Does NOT check if data is correct, only if it is reasonable
- Done **automatically** by the computer
- Example: An age of 250 is unreasonable. An age of -5 is invalid.

**Verification** = Is the data what the user **intended to enter**?
- Checks that data was entered **correctly**
- Often involves **human checking**
- Example: Did you really mean to type "Jhon" instead of "John"?

**Key exam point:**
- Validation checks data is **reasonable**
- Verification checks data is **accurate** (what was intended)
- Validation does NOT guarantee correctness! An age of 25 passes validation but could still be wrong if the person is actually 35.`
        },
        {
          id: "ch1-types",
          type: "explain",
          title: "📋 Types of Validation Checks",
          content: `There are **5 main types** of validation checks in CIE:

| Check | What it does | Example |
|---|---|---|
| **Range check** | Value within min/max bounds | Age must be 0-120 |
| **Length check** | String has correct length | Password 8-20 characters |
| **Type check** | Data is the correct type | Age must be a number |
| **Presence check** | Field is not empty | Name must be filled in |
| **Format check** | Data matches a pattern | Date must be DD/MM/YYYY |

Examples:
- **Range check:** A test score must be between 0 and 100
- **Length check:** A phone number must have exactly 11 digits
- **Type check:** A price must be a number, not text
- **Presence check:** An email field cannot be left blank
- **Format check:** A date must follow the pattern DD/MM/YYYY`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Match each scenario to the correct validation check type.',
          codeTemplate: '// A test score must be between 0 and 100 → ___ check\n// A username must be at least 3 characters → ___ check\n// The email field cannot be left empty → ___ check',
          fillBlanks: [
            { id: 1, answer: "Range", options: ["Range", "Length", "Type", "Presence"] },
            { id: 2, answer: "Length", options: ["Length", "Range", "Format", "Type"] },
            { id: 3, answer: "Presence", options: ["Presence", "Format", "Length", "Range"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Validation in Pseudocode",
      emoji: "💻",
      steps: [
        {
          id: "ch2-range",
          type: "explain",
          title: "💻 Range Check in Pseudocode",
          content: `A **range check** ensures a value is within acceptable bounds. We use a **REPEAT...UNTIL** loop to keep asking until valid data is entered:

\`\`\`
DECLARE score : INTEGER

REPEAT
    OUTPUT "Enter your score (0-100): "
    INPUT score
    IF score < 0 OR score > 100 THEN
        OUTPUT "Error! Score must be between 0 and 100."
    ENDIF
UNTIL score >= 0 AND score <= 100

OUTPUT "Valid score entered: ", score
\`\`\`

Key points:
- **REPEAT...UNTIL** is perfect for validation - the user must enter data at least once
- The loop continues **UNTIL** the condition is met (valid data)
- We give an **error message** so the user knows what went wrong
- The program **cannot continue** until valid data is provided`
        },
        {
          id: "ch2-length",
          type: "explain",
          title: "📏 Length & Presence Check",
          content: `A **length check** verifies the string has an acceptable number of characters. A **presence check** ensures the field is not empty:

\`\`\`
DECLARE password : STRING

REPEAT
    OUTPUT "Enter password (8-20 characters): "
    INPUT password
    IF LENGTH(password) < 8 THEN
        OUTPUT "Error! Password is too short."
    ENDIF
    IF LENGTH(password) > 20 THEN
        OUTPUT "Error! Password is too long."
    ENDIF
UNTIL LENGTH(password) >= 8 AND LENGTH(password) <= 20

OUTPUT "Password accepted!"
\`\`\`

**Presence check** (simplest validation):
\`\`\`
DECLARE name : STRING

REPEAT
    OUTPUT "Enter your name: "
    INPUT name
    IF name = "" THEN
        OUTPUT "Error! Name cannot be empty."
    ENDIF
UNTIL name <> ""
\`\`\`

The presence check simply verifies the input is **not empty** (\`<>\` means "not equal to").`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `The user enters: 150, then -5, then 75. What messages do they see?

\`\`\`
DECLARE mark : INTEGER

REPEAT
    OUTPUT "Enter mark (0-100): "
    INPUT mark
    IF mark < 0 OR mark > 100 THEN
        OUTPUT "Invalid!"
    ENDIF
UNTIL mark >= 0 AND mark <= 100

OUTPUT "Accepted: ", mark
\`\`\``,
          options: [
            'Invalid! / Invalid! / Accepted: 75',
            'Invalid! / Accepted: -5',
            'Accepted: 150',
            'Invalid! / Invalid! / Invalid!'
          ],
          answer: 0,
          explanation: 'Input 150: 150 > 100, so "Invalid!" and loop again. Input -5: -5 < 0, so "Invalid!" and loop again. Input 75: 75 >= 0 AND 75 <= 100, so the UNTIL condition is TRUE - loop exits. Output: "Accepted: 75".'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the range check validation loop.',
          codeTemplate: '___\n    OUTPUT "Enter age (0-120): "\n    INPUT age\n    IF age < 0 ___ age > 120 THEN\n        OUTPUT "Invalid age!"\n    ENDIF\n___ age >= 0 AND age <= 120',
          fillBlanks: [
            { id: 1, answer: "REPEAT", options: ["REPEAT", "WHILE", "FOR", "LOOP"] },
            { id: 2, answer: "OR", options: ["OR", "AND", "NOT", "XOR"] },
            { id: 3, answer: "UNTIL", options: ["UNTIL", "WHILE", "ENDREPEAT", "NEXT"] }
          ]
        },
      ]
    },
    {
      id: "ch3",
      title: "Verification Methods",
      emoji: "🔍",
      steps: [
        {
          id: "ch3-verify",
          type: "explain",
          title: "🔍 Verification: Double Entry & Visual Check",
          content: `**Verification** checks that data is what the user **intended**. There are two main methods:

**1. Double Entry** - Enter the data twice and compare:
\`\`\`
DECLARE email1 : STRING
DECLARE email2 : STRING

REPEAT
    OUTPUT "Enter your email: "
    INPUT email1
    OUTPUT "Confirm your email: "
    INPUT email2
    IF email1 <> email2 THEN
        OUTPUT "Emails do not match! Try again."
    ENDIF
UNTIL email1 = email2

OUTPUT "Email confirmed: ", email1
\`\`\`

**2. Visual Check (Screen/Proof Reading)** - Show data back to the user:
\`\`\`
DECLARE name : STRING
DECLARE confirm : CHAR

OUTPUT "Enter your name: "
INPUT name
OUTPUT "You entered: ", name
OUTPUT "Is this correct? (Y/N): "
INPUT confirm

IF confirm = 'Y' THEN
    OUTPUT "Name saved!"
ELSE
    OUTPUT "Please re-enter your name."
ENDIF
\`\`\`

Double entry is used for things like **passwords** and **emails**. Visual check is used for **names**, **addresses**, and other data.`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `The user enters: "hello", then "helo", then "hello", then "hello". What happens?

\`\`\`
DECLARE pw1 : STRING
DECLARE pw2 : STRING

REPEAT
    OUTPUT "Enter password: "
    INPUT pw1
    OUTPUT "Confirm password: "
    INPUT pw2
    IF pw1 <> pw2 THEN
        OUTPUT "No match!"
    ENDIF
UNTIL pw1 = pw2

OUTPUT "Password set!"
\`\`\``,
          options: [
            'No match! / Password set!',
            'Password set!',
            'No match! / No match!',
            'No match! / No match! / Password set!'
          ],
          answer: 0,
          explanation: 'First attempt: pw1="hello", pw2="helo". They do not match → "No match!" Second attempt: pw1="hello", pw2="hello". They match → UNTIL condition is TRUE, loop exits → "Password set!" Output: **No match! / Password set!**'
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the double entry verification for an email.',
          codeTemplate: 'REPEAT\n    OUTPUT "Enter email: "\n    INPUT email1\n    OUTPUT "Confirm email: "\n    INPUT email2\n    IF email1 ___ email2 THEN\n        OUTPUT "Emails do not match!"\n    ENDIF\n___ email1 ___ email2',
          fillBlanks: [
            { id: 1, answer: "<>", options: ["<>", "=", ">", "<"] },
            { id: 2, answer: "UNTIL", options: ["UNTIL", "WHILE", "REPEAT", "NEXT"] },
            { id: 3, answer: "=", options: ["=", "<>", ">", ">="] }
          ]
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 Exam Question!",
          content: 'Which of the following is a **validation** check, NOT a verification method?',
          options: [
            'Double entry',
            'Visual check / screen check',
            'Range check',
            'Proof reading'
          ],
          answer: 2,
          explanation: '**Range check** is a validation method (checks if data is reasonable). Double entry, visual check, and proof reading are all **verification** methods (check if data is what was intended). This distinction is a very common exam question!'
        },
      ]
    },
  ]
}
