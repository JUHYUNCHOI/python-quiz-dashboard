// ============================================
// Lesson 22: Slicing
// ============================================
import { LessonData } from './types'

export const lesson22EnData: LessonData = {
  id: "22",
  title: "Slicing",
  emoji: "🔪",
  description: "Cut out parts of lists and strings!",
  chapters: [
    {
      id: "ch1",
      title: "Slicing Basics",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔪 Slicing — cut out just the part you want!",
          content: `🍪 Imagine a long cookie log — you slice off just the chunk you want with a knife. That's **slicing**.

You can grab just a **portion** of a list or string!

\`\`\`python
fruits = ["apple", "banana", "strawberry", "grape", "watermelon"]

# From index 1 up to (but not including) index 3
print(fruits[1:3])  # ['banana', 'strawberry']
\`\`\`

**[start:end]** = from start up to **just before** end.

### Where do you use this?

- **Show top N** — top 5 scores, latest 10 comments
- **Trim head/tail** — drop a header line, strip trailing \\n
- **Pagination** — \`items[page*10:(page+1)*10]\`
- **Reverse** — \`text[::-1]\`
- **Copy** — \`new = old[:]\` for a fresh list

Lists, strings, and tuples all slice with the **same syntax**.`
        },
        {
          id: "index-recap",
          type: "explain",
          title: "📐 What [start:end] really means — cuts between cells",
          content: `Slicing feels confusing because the index can be read as **the position between elements**, not on them.

\`\`\`
index:    0   1   2   3   4   5
        ┃ A ┃ B ┃ C ┃ D ┃ E ┃
neg idx:  -5  -4  -3  -2  -1
\`\`\`

\`fruits[1:4]\` = "cut before index 1, cut before index 4, take what's between".

\`\`\`python
fruits = ['A', 'B', 'C', 'D', 'E']

print(fruits[1:4])    # ['B', 'C', 'D'] — indices 1, 2, 3
print(fruits[0:5])    # whole list
print(fruits[1:1])    # [] — same position, empty
\`\`\`

> 🎯 One-liner: **start included, end excluded.**`
        },
        {
          id: "index-visualizer",
          type: "interactive",
          title: "🎬 Try indices yourself — positive & negative",
          component: "pyStringIndexVisualizer",
          componentProps: { initialText: "Python", lang: "en" },
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Slice — grab indices 1, 2, 3 only",
          task: "From nums, slice out just 1, 2, 3 and print them!",
          initialCode: "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])",
          expectedOutput: "[1, 2, 3]",
          hint: "[1:4] means indices 1, 2, 3 — the 4 is NOT included.",
          hint2: "End index is excluded! / nums[1:4]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [0, 1, 2, 3, 4][1:3]?",
          options: ["[1, 2, 3]", "[1, 2]", "[0, 1, 2]", "[2, 3]"],
          answer: 1,
          explanation: "[1:3] includes indices 1 and 2 only! Index 3 is not included."
        },
        {
          id: "string-slice",
          type: "explain",
          title: "📝 Strings slice the same way",
          content: `Slicing isn't just for lists. **Strings, tuples** use the same syntax.

\`\`\`python
text = "Hello World"

print(text[0:5])      # 'Hello'
print(text[6:])       # 'World'
print(text[-5:])      # 'World' (5 from end)
print(text[:5])       # 'Hello'

t = (10, 20, 30, 40)
print(t[1:3])         # (20, 30) — tuple sliced too
\`\`\`

> 💡 **Common interface** — list / string / tuple are all "sequences", so \`len\`, \`in\`, indexing, slicing all work the same way on each.`
        },
        {
          id: "try-string-slice",
          type: "tryit",
          title: "🖥️ Extract the email domain — slice after @",
          task: "From 'user.name@gmail.com', slice out just the domain 'gmail.com'.",
          initialCode: "email = \"user.name@gmail.com\"\n\n# Find @, slice everything after\nat_pos = email.index(\"@\")\ndomain = email[___:]\nprint(domain)",
          expectedOutput: "gmail.com",
          hint: "email[at_pos + 1:] — from just after the @ to end.",
          hint2: "domain = email[at_pos + 1:]"
        }
      ]
    },
    {
      id: "ch2",
      title: "Omitting & Negative Indices",
      emoji: "🎯",
      steps: [
        {
          id: "omit-explain",
          type: "explain",
          title: "🎯 Omitting Start/End",
          content: `**From the beginning** - omit start
\`\`\`python
nums = [0, 1, 2, 3, 4]
print(nums[:3])   # [0, 1, 2]
\`\`\`

**To the end** - omit end
\`\`\`python
print(nums[2:])   # [2, 3, 4]
\`\`\`

**Full copy**
\`\`\`python
print(nums[:])    # [0, 1, 2, 3, 4]
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ First 3 only — slice off the head",
          task: "Get just the first 3 elements of the list!",
          initialCode: "nums = [10, 20, 30, 40, 50]\nprint(nums[:3])",
          expectedOutput: "[10, 20, 30]",
          hint: "Omit start → from the beginning. [:3] = indices 0, 1, 2.",
          hint2: "nums[:3]"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ Negative Indices",
          content: `You can count from the end too!

\`\`\`python
nums = [0, 1, 2, 3, 4]

print(nums[-1])     # 4 (last item)
print(nums[-2:])    # [3, 4] (last 2 items)
print(nums[:-1])    # [0, 1, 2, 3] (exclude last)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Last 2 — grab the tail",
          task: "Get just the last 2 elements of fruits!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\", \"grape\", \"watermelon\"]\nprint(fruits[-2:])",
          expectedOutput: "['grape', 'watermelon']",
          hint: "Negative index = 'Nth from the end'. [-2:] = from 2nd-to-last to the end.",
          hint2: "fruits[-2:]"
        },
        {
          id: "out-of-range",
          type: "explain",
          title: "🛡️ Out of range? — Slicing won't crash",
          content: `Index \`[10]\` errors when out of range, but slicing **silently clips**.

\`\`\`python
nums = [1, 2, 3, 4, 5]

# Index — error
print(nums[10])     # ❌ IndexError

# Slicing — safe!
print(nums[2:100])  # [3, 4, 5] — as much as available
print(nums[100:])   # [] — empty
print(nums[:-100])  # [] — empty
\`\`\`

→ "Take what exists, return empty if nothing." **No error.** That's why slicing edges are easy to use.

### Real use — first/last N items

\`\`\`python
top = scores[:5]     # first 5 (or fewer if list is short)
last = scores[-3:]   # last 3 (or fewer)
\`\`\``
        },
        {
          id: "slice-assign",
          type: "explain",
          title: "✏️ Replace a slice (lists only)",
          content: `You can assign **a whole new list** to a slice. Lists only — strings/tuples are immutable.

\`\`\`python
nums = [1, 2, 3, 4, 5]

# Replace 3 middle items with a different list
nums[1:4] = [99, 100]
print(nums)  # [1, 99, 100, 5] — length can change!

# Empty list = delete that range
nums[:2] = []
print(nums)  # [100, 5]

# Empty slice + non-empty list = insert
nums[1:1] = [55, 66]
print(nums)  # [100, 55, 66, 5]
\`\`\`

### del to drop a slice

\`\`\`python
data = [10, 20, 30, 40, 50]
del data[1:3]
print(data)  # [10, 40, 50]
\`\`\`

> 💡 \`nums[1:4] = [99, 100]\` does 4 things at once: locate, remove, insert, resize. Powerful but dense — beginners can stick to explicit \`pop / insert\`.`
        },
        {
          id: "try-slice-assign",
          type: "tryit",
          title: "🖥️ Slice-assign — replace 3 middle items in one shot",
          task: "Replace 3 middle items (b, c, d) with ['X', 'Y'] in one statement. Notice the length shrinks!",
          initialCode: "letters = ['a', 'b', 'c', 'd', 'e', 'f']\n\n# Replace indices 1, 2, 3 (b, c, d) with ['X', 'Y']\nletters[___:___] = [___, ___]\n\nprint(letters)\nprint(f\"length: {len(letters)}\")",
          expectedOutput: "['a', 'X', 'Y', 'e', 'f']\nlength: 5",
          hint: "letters[1:4] = ['X', 'Y']",
          hint2: "letters[1:4] = ['X', 'Y']"
        }
      ]
    },
    {
      id: "ch3",
      title: "Step & Reversing",
      emoji: "🚶",
      steps: [
        {
          id: "step-explain",
          type: "explain",
          title: "🚶 Step - Skip Elements",
          content: `**[start:end:step]** - how many to skip at a time

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[::2])    # [0, 2, 4, 6, 8] (every 2nd)
print(nums[1::2])   # [1, 3, 5, 7, 9] (from 1, every 2nd)
\`\`\`

**Reversing:**
\`\`\`python
print(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Reverse a list — the [::-1] trick",
          task: "Print the list in reverse order!",
          initialCode: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
          expectedOutput: "[5, 4, 3, 2, 1]",
          hint: "Negative step = back to front! [::-1].",
          hint2: "nums[::-1]"
        },
        {
          id: "string-explain",
          type: "explain",
          title: "📝 Strings Can Be Sliced Too!",
          content: `Strings can be sliced the same way!

\`\`\`python
text = "Hello World"

print(text[0:5])    # "Hello"
print(text[6:])     # "World"
print(text[::-1])   # "dlroW olleH"
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Palindrome check — same forwards & backwards?",
          task: "Reverse a string and check if it reads the same forwards and backwards (a palindrome)!",
          initialCode: "word = \"level\"\nreversed_word = word[::-1]\nprint(f\"Original: {word}\")\nprint(f\"Reversed: {reversed_word}\")\nprint(f\"Palindrome? {word == reversed_word}\")",
          expectedOutput: "Original: level\nReversed: level\nPalindrome? True",
          hint: "Strings also reverse with [::-1]. Original == reversed → palindrome.",
          hint2: "word == word[::-1]"
        },
        {
          id: "neg-step",
          type: "explain",
          title: "↩️ Negative step — read backwards",
          content: `When \`step\` is negative, you go **back to front**. Beyond \`[::-1]\`, several combos exist.

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Whole reverse
print(nums[::-1])         # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Backwards every 2 steps
print(nums[::-2])         # [9, 7, 5, 3, 1]

# From index 8 down to 3 (start > end!)
print(nums[8:2:-1])       # [8, 7, 6, 5, 4, 3]

# Last 3 items reversed
print(nums[-1:-4:-1])     # [9, 8, 7]
\`\`\`

With negative step, **start must be greater than end** to produce results. start < end yields empty.

\`\`\`python
nums[2:8:-1]   # [] — start 2, end 8, going backward never reaches
\`\`\`

> 🎯 Beginners can just memorize \`[::-1]\`. Look up the rest when you actually need it.`
        },
        {
          id: "copy-pattern",
          type: "explain",
          title: "📋 The [:] copy pattern",
          content: `\`[:]\` means "everything" — but it's not just the same list, it's a **brand-new list object**.

\`\`\`python
original = [1, 2, 3]
same     = original          # same list (alias)
copy     = original[:]       # new list (copy)

original.append(99)

print(original)  # [1, 2, 3, 99]
print(same)      # [1, 2, 3, 99] — same list, follows along
print(copy)      # [1, 2, 3]      — separate, doesn't change
\`\`\`

→ \`= \` just creates "another name for the same thing". \`[:] \` makes "a fresh copy".

### Slicing always makes a new list

\`\`\`python
nums = [1, 2, 3, 4, 5]
part = nums[1:3]   # [2, 3]
part[0] = 99
print(nums)        # [1, 2, 3, 4, 5] — original unchanged
\`\`\`

Partial slices too — separate from the source.

> ⚠️ Caveat: if elements are themselves lists, those inner lists are still shared (shallow copy). For deep copy use \`copy.deepcopy()\`. For flat lists, \`[:]\` is enough.`
        },
        {
          id: "try-copy",
          type: "tryit",
          title: "🖥️ = vs [:] — see the difference yourself",
          task: "Confirm with your own eyes: \`=\` vs \`[:]\` behave differently.",
          initialCode: "original = [1, 2, 3]\nsame = original          # same list\ncopy = original[:]       # new list\n\noriginal.append(99)\n\n# Just run!\nprint(f\"original: {original}\")\nprint(f\"same:     {same}\")\nprint(f\"copy:     {copy}\")",
          expectedOutput: "original: [1, 2, 3, 99]\nsame:     [1, 2, 3, 99]\ncopy:     [1, 2, 3]",
          hint: "Just run the code and read the output!",
          hint2: "= aliases, [:] copies."
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Mission 1 — Split phone into area / middle / last",
          task: "From '010-1234-5678', slice out the area code, middle, and last parts!",
          initialCode: "phone = \"010-1234-5678\"\n\narea = phone[:___]\nmiddle = phone[___:___]\nlast = phone[-___:]\n\nprint(f\"Full: {phone}\")\nprint(f\"Area code: {area}\")\nprint(f\"Middle: {middle}\")\nprint(f\"Last: {last}\")",
          expectedOutput: "Full: 010-1234-5678\nArea code: 010\nMiddle: 1234\nLast: 5678",
          hint: "First 3 → [:3], between the two dashes → [4:8], last 4 → [-4:].",
          hint2: "3 / 4 / 8 / 4"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Mission 2 — Show only page 3 (10 per page)",
          task: "From 30 scores, slice out only **page 3** (indices 20–29 = 10 items). Page size 10, page numbering starts at 1.",
          initialCode: "scores = list(range(100, 70, -1))   # 30 items: 100, 99, ..., 71\nprint(f\"total: {len(scores)}\")\n\nPAGE_SIZE = 10\npage = 3   # page 3\n\n# Slice indices 20–29 (page 3)\npage_data = scores[___:___]\n\nprint(f\"page 3: {page_data}\")\nprint(f\"count: {len(page_data)}\")",
          expectedOutput: "total: 30\npage 3: [80, 79, 78, 77, 76, 75, 74, 73, 72, 71]\ncount: 10",
          hint: "page N starts at (N-1) * PAGE_SIZE, ends at N * PAGE_SIZE",
          hint2: "page_data = scores[(page - 1) * PAGE_SIZE : page * PAGE_SIZE]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 Mission 3 — Palindrome (ignore case & spaces)",
          task: "Fill in the blank so each word is checked as a palindrome (ignoring case and spaces)!",
          initialCode: "# Check 4 words — ignore case & spaces\nwords = [\"level\", \"Race Car\", \"hello\", \"A man a plan\"]\n\nfor word in words:\n    # 1) lower + drop spaces\n    cleaned = word.lower().replace(\" \", \"\")\n    # 2) compare with its reverse\n    print(cleaned == cleaned[___])",
          expectedOutput: "True\nTrue\nFalse\nFalse",
          hint: "Reverse with [::-1] then compare with ==.",
          hint2: "::-1"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **[start:end]** — basic slicing (start in, end out)
✅ **Cuts between cells** visualization — index = position between elements
✅ **[:end], [start:], [:]** — what omitting means
✅ **Negative indices \`[-n:]\`, \`[:-1]\`** — count from the end
✅ **Out-of-range is safe** — slicing never errors
✅ **Slice assignment** — \`nums[1:4] = [...]\` to replace/insert/delete a range
✅ **[::step]** — skip elements; negative step reverses
✅ **[::-1]** — full reverse (palindrome classic)
✅ **Strings/tuples slice too** — common sequence interface
✅ **[:] makes a new copy** — vs \`= \` (alias)
✅ **Real use** — pagination, palindrome, phone-number split

🎉 **Part 3 Complete!**
In the next Part, you'll learn about **projects** and **functions**! 🚀`
        }
      ]
    }
  ]
}
