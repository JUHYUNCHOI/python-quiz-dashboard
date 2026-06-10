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
          content: `Remember from lesson 5 that \`"3" + "5"\` gave you \`"35"\`? Same \`+\`, totally different result.

\`\`\`python
"3" + "5"     # "35"  ← glues the letters together
3 + 5         # 8     ← real addition
\`\`\`

Quotes around it → **string (str)**. No quotes → **integer (int)**. Even though both look like \`3\`, to Python the **letter \`"3"\`** and the **number \`3\`** are completely different kinds of thing. (Like the difference between a 🍎 *photo* of an apple and a *real* apple.)

The catch — the world is full of **strings that look like numbers**.

\`\`\`python
score = "85"          # came from somewhere as text (a string!)
print(score + 10)     # ❌ TypeError!
\`\`\`

Python: *"This \`"85"\` is text (str), so how do I add it to the number \`10\`? The kinds don't match — I can't!"*

Especially \`input()\` (next lesson) — whatever the user types always comes in as a string, so you *must* convert it before doing math. That's why **type conversion** shows up almost every day from here on.`
        },
        {
          id: "intro-clothes",
          type: "explain",
          title: "👕 Think of it as changing clothes",
          content: `Type conversion in one line — a value **changing its outfit**.

The *contents* (\`85\`) stay the same, but depending on which **outfit (type)** it wears, Python treats it differently.
- Wearing the number outfit (\`int\`) → it can do **math** like add/subtract.
- Wearing the text outfit (\`str\`) → it can be **glued** to other text.

Four helpers change the outfit for you:

| Helper | Into what outfit? | Example |
|----------|-------------------|---------|
| \`int()\` | integer (whole number) | \`int("85")\` → \`85\` |
| \`float()\` | decimal number | \`float("3.14")\` → \`3.14\` |
| \`str()\` | text (adds quotes) | \`str(42)\` → \`"42"\` |
| \`bool()\` | True / False | \`bool(0)\` → \`False\` |

> 💡 **int** = whole number (no decimal) · **float** = number with a decimal · **str** = text · **bool** = True or False
>
> The function name *is* the outfit: \`int(...)\` → "put on the integer outfit", \`str(...)\` → "put on the text outfit".

The *meaning* ("eighty-five") stays the same — only the **outfit (how Python handles it)** changes. Try changing outfits below and it'll click. 👇`
        },
        {
          id: "intro-viz",
          type: "interactive",
          title: "🎬 Visualize the conversion — the value changes outfit",
          description: "Tap an example above, or type your own value and pick int/float/str/bool, then press ▶ Convert! Watch the quotes peel off and the decimals fall away with your own eyes.",
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
          content: `Hand a value to \`int()\` and it **rebuilds it as an integer (a whole number)**. It welcomes two kinds of guest.

**Guest ①  a string that looks like a number** — \`"123"\` is *wearing quotes* but is a number inside.

\`\`\`python
int("123")    # 123  ← strip the quotes, back to a real number
int("0")      # 0
int("-7")     # -7
\`\`\`

Great for values that arrive "as a number wearing a text outfit" — game scores, an age typed into a box.

**Guest ②  a decimal number (float)**

\`\`\`python
int(3.7)      # 3   ← !! not 4
int(3.9)      # 3   ← 3.9 still becomes 3!
int(-2.8)     # -2  ← cut toward zero
\`\`\`

This surprises everyone once. \`int()\` does **not round** — it just **chops off** everything after the dot.

**Why chop?** \`int()\`'s job is *"make it an integer"*, not *"find the nearest integer"*. If you want the nearest value, that's a **different function**, \`round()\`. (round comes later, on its own.)

> 🔪 \`int()\` = **scissors** that cut off the decimals  ·  🎯 \`round()\` = **moves to the nearest** slot`
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
          content: `\`float()\` changes a value into the **decimal-number (float) outfit**.

\`\`\`python
# string → float
float("3.14")     # 3.14
float("100")      # 100.0   ← even a whole-number look gets .0!

# integer → float
float(10)         # 10.0
\`\`\`

**Why does \`.0\` show up?** A float is "a number that has a decimal point", so even with nothing after the dot it **adds \`.0\` to say "I'm a float."** \`10\` (int) and \`10.0\` (float) are the same value but *different types*.

**When to use it:**
- Prices, heights, averages — anything that **needs a decimal**.
- To turn an \`input()\` value like \`"3.5"\` (next lesson) into a real number.

> 💡 The key difference from \`int()\`: \`int("3.14")\` is ❌ rejected, but \`float("3.14")\` ✅ works! Strings with a dot (\`.\`) are float's job.`
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
          content: `\`str()\` puts a **text outfit (quotes)** on a number (or any value).

\`\`\`python
str(123)          # "123"
str(3.14)         # "3.14"
str(True)         # "True"
\`\`\`

**When?** — when you want to **glue a number to other text with \`+\`**.

\`\`\`python
score = 95
print("Score: " + str(score) + " points")
\`\`\`

{output}
Score: 95 points
{/output}

**Why must you convert with \`str()\`?** \`+\` only works *between the same kind*. text+text means "glue", number+number means "add". But **text + number** makes Python ask "do I glue or add?" — so it refuses.

\`\`\`python
print("Score: " + 95)   # ❌ TypeError!  (text + number)
\`\`\`

Turn \`95\` into the text \`"95"\` first → text + text → glues cleanly.

> 💡 With **f-strings** from lesson 8 you don't even need \`str()\`: \`f"Score: {score} points"\` — it auto-converts whatever is inside the braces. (\`str()\` is doing that same conversion *by hand*.)`
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
          content: `\`bool()\` changes a value into **True or False**. Python decides by asking: "is this value *empty, or filled?*"

**Values that become False — the "empty" ones (memorize!):**
\`\`\`python
bool(0)       # False   ← the number 0
bool(0.0)     # False
bool("")      # False   ← empty string (nothing inside the quotes)
\`\`\`

**Everything else is True — the "has something" ones:**
\`\`\`python
bool(1)       # True
bool(-1)      # True    ← negatives too, since they're "not 0"!
bool("hi")    # True
bool("0")     # True    ← !! "0" in quotes is one character → "filled"
\`\`\`

**The key idea:** *"empty → False, anything in it → True."*
- \`0\` and \`""\` are "totally empty" → False
- \`"0"\` *contains the character 0* → not empty, so True!

> 💡 \`bool("0")\` being \`True\` is a classic gotcha. If there's *even one* character inside the quotes, it's a "non-empty string" → True.
>
> (FYI: an empty list \`[]\` is also False — lists come in lesson 16.)

This "empty vs filled" judgment shows up again in lesson 11's **if statements**.`
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
          content: `Trying to force the wrong outfit makes Python raise an **error**. They look scary, but **once you know the error's name** you can see exactly what went wrong.

\`\`\`python
int("abc")        # ❌ ValueError — not a numeric string
int("3.14")       # ❌ ValueError — the string has a dot
float("hello")    # ❌ ValueError — not number-shaped
\`\`\`

> 💡 **ValueError** means *"the value doesn't fit the conversion rule."*

**Why does \`int("3.14")\` error?** — easy to mix up, so to be clear:
- \`int(3.14)\` → ✅ \`3\`  (a real float just needs its decimal chopped — fine)
- \`int("3.14")\` → ❌  (\`int()\` doesn't know what to do with a dot *inside text*, so it refuses)

**Safe detour — for a dot-string, go through \`float\` first:**

\`\`\`python
text = "3.14"
num = int(float(text))    # ① float("3.14") → 3.14   ② int(3.14) → 3
print(num)
\`\`\`

{output}
3
{/output}

The inner \`float()\` turns the text into the real number \`3.14\` first, then the outer \`int()\` chops the decimal to \`3\`. **Inner → outer order** is the key! (Try the "See the safe path" button in the visualizer above to watch it.)

> ⚠️ In real programs a user might type something wrong and trigger a ValueError. Handling that safely with \`try-except\` comes in lesson 37.`
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
