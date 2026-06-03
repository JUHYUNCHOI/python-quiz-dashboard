// ============================================
// Lesson 9: Type Conversion
// ============================================
import { LessonData } from './types'

export const lesson9EnData: LessonData = {
  id: "9",
  title: "Type Conversion",
  emoji: "🔄",
  description: "Convert data types with ease!",
  chapters: [
    {
      id: "ch1",
      title: "int() - Convert to Integer",
      emoji: "🔢",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 Why Change a Type?",
          content: `Remember from lesson 5 that \`"3" + "5"\` gave you \`"35"\`?

\`\`\`python
"3" + "5"     # "35"  ← glues the letters
3 + 5         # 8     ← real addition
\`\`\`

Quotes around it → **string (str)**. No quotes → **integer (int)**. They look similar, but Python treats them completely differently.

The catch — sometimes you get **a string that looks like a number**.

\`\`\`python
score = "85"          # came from somewhere as text
print(score + 10)     # ❌ TypeError!
\`\`\`

Python: "Is this \`"85"\` text or a number? I can't add them!"`
        },
        {
          id: "intro-clothes",
          type: "explain",
          title: "👕 Think of it as changing clothes",
          content: `Type conversion = a value **changing its outfit**.

| Function | Into what outfit? | Example |
|----------|-------------------|---------|
| \`int()\` | int (integer) | \`int("85")\` → \`85\` |
| \`float()\` | float (decimal number) | \`float("3.14")\` → \`3.14\` |
| \`str()\` | str (text — adds quotes) | \`str(42)\` → \`"42"\` |
| \`bool()\` | bool (True / False) | \`bool(0)\` → \`False\` |

> 💡 **int** = whole number / **float** = number with a decimal point / **str** = text / **bool** = True or False.

The *meaning* of the value stays the same — \`"85"\` and \`85\` both mean "eighty-five". Only the *outfit* changes, which decides what Python lets you do with it.`
        },
        {
          id: "intro-viz",
          type: "interactive",
          title: "🎬 Visualize the conversion — click around",
          description: "Pick a preset and press ▷ Step. Watch how a value changes its outfit.",
          component: "typeConversionVisualizer",
        },
        {
          id: "pre-try1",
          type: "quiz",
          title: "🤔 Which outfit?",
          content: "**To *add* a string like `'85'` — which outfit to change into?**",
          options: ["int() — integer", "float() — decimal", "str() — string", "bool() — true/false"],
          answer: 0,
          explanation: "For *math* like add/subtract → `int()` (integer) or `float()` (decimal). Plain text (`str()`) can't do math."
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Now your turn — convert before adding!",
          task: "Use int(\"85\") like you saw in the visualizer. Print the score plus 10.",
          initialCode: "score = \"85\"\n# convert score to an integer and add 10\nprint(___(score) + 10)",
          expectedOutput: "95",
          hint: "Put score inside int().",
          hint2: "int(score)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "int-explain",
          type: "explain",
          title: "🔢 int() — to integer",
          content: `\`int()\` takes two kinds of input:

**1) A number-looking string → integer**

\`\`\`python
int("123")    # 123
int("0")      # 0
int("-7")     # -7
\`\`\`

**2) A float → integer (decimals are *cut off*, NOT rounded!)**

\`\`\`python
int(3.7)      # 3   ← NOT 4!
int(3.9)      # 3   ← still 3!
int(-2.8)     # -2  ← cut toward zero
\`\`\`

> 💡 Rounding is \`round()\`. \`int()\` just **chops**. (round comes later.)`
        },
        {
          id: "predict-truncate",
          type: "predict",
          title: "💭 Predict — int(3.9)",
          content: `What does this print?

\`\`\`python
print(int(3.9))
\`\`\``,
          options: ["3", "4", "3.9", "Error"],
          answer: 0,
          explanation: "int() **chops, doesn't round!** 3.9 → 3. To get 4 you'd need round(3.9)."
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Float to integer!",
          task: "Convert pi to an integer and print it.",
          initialCode: "pi = 3.14159\nprint(___(pi))",
          expectedOutput: "3",
          hint: "int() chops off the decimal part.",
          hint2: "int(pi)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Trick Quiz!",
          content: "What does `int(\"3.14\")` give?",
          options: ["3", "3.14", "Error (ValueError)", "\"3\""],
          answer: 2,
          explanation: "Careful! `int(3.14)` is fine (gives 3). But `int(\"3.14\")` — a string with a dot — is **rejected**! Safe path: `int(float(\"3.14\"))` — go through float first."
        }
      ]
    },
    {
      id: "ch2",
      title: "float() and str()",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 float() — to decimal",
          content: `\`float()\` = convert to a decimal number.

\`\`\`python
# string → float
float("3.14")     # 3.14
float("100")      # 100.0   ← .0 attaches!

# integer → float
float(10)         # 10.0
\`\`\`

**When to use it:**
- Prices, heights, averages — anything that *can have a decimal*.
- To turn the result of \`input()\` (always a string — coming next lesson) into a real number.

> 💡 Difference from \`int\`: \`float("3.14")\` ✅ works! The dot is fine.`
        },
        {
          id: "pre-try3",
          type: "quiz",
          title: "🤔 Which outfit?",
          content: "**For a string like `'3.14'` that has a *decimal point* — convert to a number how?**",
          options: ["int()", "float()", "str()", "bool()"],
          answer: 1,
          explanation: "`int()` *rejects* strings with a decimal point. Only `float()` (decimal) accepts them."
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It — float()",
          task: "Convert \"3.14\" to a float and print it doubled.",
          initialCode: "text = \"3.14\"\nnum = ___(text)\nprint(num * 2)",
          expectedOutput: "6.28",
          hint: "Use float() to convert.",
          hint2: "float(text)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "str-explain",
          type: "explain",
          title: "📝 str() — to text",
          content: `\`str()\` = turn a number (or other value) into a **string** by wrapping it in quotes.

\`\`\`python
str(123)          # "123"
str(3.14)         # "3.14"
str(True)         # "True"
\`\`\`

**When?** — When you want to glue with text using \`+\`.

\`\`\`python
score = 95
print("Score: " + str(score) + " points")
# Score: 95 points
\`\`\`

Without str()? — \`"Score: " + 95\` ❌ TypeError!

> 💡 With **f-strings** from lesson 8 you don't need \`str()\`: \`f"Score: {score} points"\` — it converts automatically.`
        },
        {
          id: "pre-try4",
          type: "quiz",
          title: "🤔 Which outfit?",
          content: "**To *glue a number into text* for output, which?**",
          options: ["int()", "float()", "str()", "bool()"],
          answer: 2,
          explanation: "To glue numbers with text, wrap the number in `str()` so `+` can join them as text."
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It — str()",
          task: "Convert score to a string and print \"Score: 95 points\".",
          initialCode: "score = 95\ntext = ___(score)\nprint(\"Score: \" + text + \" points\")",
          expectedOutput: "Score: 95 points",
          hint: "str() wraps the number in a string outfit.",
          hint2: "str(score)",
          choices: ["int", "float", "str", "bool"]
        },
        {
          id: "predict-str-concat",
          type: "predict",
          title: "💭 Predict — str(7) + str(3)",
          content: `What does this print?

\`\`\`python
print(str(7) + str(3))
\`\`\``,
          options: ["10", "73", "\"7\"\"3\"", "Error"],
          answer: 1,
          explanation: "str(7) → \"7\", str(3) → \"3\". String + string = **glue them together** → \"73\". For real addition: 7 + 3 = 10 (no quotes)."
        }
      ]
    },
    {
      id: "ch3",
      title: "bool() and Error Handling",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ bool() — to True/False",
          content: `\`bool()\` = turn a value into **True** or **False**.

**Values that become False (memorize these!):**
\`\`\`python
bool(0)       # False
bool(0.0)     # False
bool("")      # False   ← empty string
\`\`\`

**Everything else is True:**
\`\`\`python
bool(1)       # True
bool(-1)      # True    ← negatives too!
bool("hi")    # True
bool("0")     # True    ← "0" in quotes is NOT empty!
\`\`\`

> 💡 Tricky one: \`bool("0")\` is **True**. Anything with at least one character inside quotes is a "non-empty string" → True.
>
> An empty list \`[]\` is also False — lists come in lesson 16.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It — bool of each",
          task: "Put 0, 1, \"\" (empty string), and \"hi\" into the blanks in order.",
          initialCode: "print(bool(___))\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))",
          expectedOutput: "False\nTrue\nFalse\nTrue",
          hint: "In order: 0 / 1 / \"\" / \"hi\". Empty string is two double-quotes touching.",
          hint2: "bool(0) / bool(1) / bool(\"\") / bool(\"hi\")"
        },
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ Two kinds of conversion error",
          content: `Bad conversions raise errors. Knowing the **error name** makes them less scary.

\`\`\`python
int("abc")        # ❌ ValueError: not digits
int("3.14")       # ❌ ValueError: string has a dot
float("hello")    # ❌ ValueError: not a number
\`\`\`

> 💡 **ValueError** means "the value doesn't fit the conversion rule."

**Safe detour — dot-string? use float first!**

\`\`\`python
text = "3.14"
num = int(float(text))    # float first, then int
print(num)                # 3
\`\`\`

(Mind the order: inner = float, outer = int.)`
        },
        {
          id: "predict-error",
          type: "predict",
          title: "💭 Predict — int(\"abc\")",
          content: `What happens?

\`\`\`python
print(int("abc"))
\`\`\``,
          options: [
            "0",
            "\"abc\"",
            "ValueError",
            "None"
          ],
          answer: 2,
          explanation: "\"abc\" has no digits at all, so int() gives up → ValueError. If users might type garbage you need try-except — that comes in lesson 37!"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is `bool(\"\")`?",
          options: ["True", "False", "\"\"", "Error"],
          answer: 1,
          explanation: "Empty string \"\" is False. Remember: \"empty → falsy.\" (Watch out: \"0\" has 1 character inside, so it's True!)"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 Summary",
          content: `## The four conversion functions

| Function | Meaning | Example |
|----------|---------|---------|
| **int()** | to integer | int("123") → 123 |
| **float()** | to decimal | float("3.14") → 3.14 |
| **str()** | to string | str(123) → "123" |
| **bool()** | to True/False | bool(0) → False |

**Remember:**
- \`int()\` **chops** floats (not rounded)
- \`int("3.14")\` ❌ → use \`int(float("3.14"))\` ✅
- f-strings remove the need for \`str()\`
- bool is False only for 0, 0.0, "" — everything else True`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission — Score Calculator",
          task: "Two scores are stored as strings. Convert them, then print sum and product in the given format.",
          initialCode: "a = '25'\nb = '17'\n\n# Convert strings to numbers\nnum_a = ___(a)\nnum_b = ___(b)\n\nprint(f'{num_a} + {num_b} = {num_a + num_b}')\nprint(f'{num_a} × {num_b} = {num_a * num_b}')\nprint(f'Type of sum: {type(num_a + num_b)}')",
          expectedOutput: "25 + 17 = 42\n25 × 17 = 425\nType of sum: <class 'int'>",
          hint: "Both blanks: int().",
          hint2: "int(a) / int(b)",
          choices: ["int", "float", "str"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What you learned

✅ **int()** — to integer (decimals get chopped)
✅ **float()** — to decimal (gets a .0)
✅ **str()** — to string (puts on quote outfit)
✅ **bool()** — to True/False (only 0 and "" are False)

Next lesson, finally — **input()** to get values from the user. Since input() always returns a string, today's \`int()\` / \`float()\` will show up over and over! 🚀`
        }
      ]
    }
  ]
}
