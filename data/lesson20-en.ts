// ============================================
// Lesson 20: Dictionaries
// ============================================
import { LessonData } from './types'

export const lesson20EnData: LessonData = {
  id: "20",
  title: "Dictionaries",
  emoji: "📖",
  description: "Store data using key-value pairs!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Dictionary?",
      emoji: "📖",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📖 Look It Up Like a Dictionary!",
          content: `Just like looking up a word in a real dictionary!

**Dictionary** = a data structure that finds values by keys

\`\`\`python
person = {
    "name": "Alice",
    "age": 15,
    "school": "Python Middle School"
}

print(person["name"])  # Alice
print(person["age"])   # 15
\`\`\`

Uses the format **{key: value, key: value, ...}**!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Look up values in a dictionary!",
          initialCode: "student = {\n    \"name\": \"Bob\",\n    \"score\": 95,\n    \"class\": \"A\"\n}\n\nprint(student[\"name\"])\nprint(student[\"score\"])",
          expectedOutput: "Bob\n95",
          hint: "Use dict[key] to find a value!",
          hint2: "student[\"name\"]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "How do you look up a value in a dictionary?",
          options: ["dict[0]", "dict[key]", "dict(key)", "dict.key"],
          answer: 1,
          explanation: "Use dict[key] to find the value for that key!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Modifying Dictionaries",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ Adding and Modifying",
          content: `**Adding/Modifying values:**
\`\`\`python
person = {"name": "Alice"}

# Add
person["age"] = 15

# Modify
person["name"] = "Bob"

print(person)
# {'name': 'Bob', 'age': 15}
\`\`\`

If the key doesn't exist, it **adds** it. If it does, it **updates** it!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Adding Values!",
          task: "Add 'hobby' to the dictionary!",
          initialCode: "person = {\"name\": \"Alice\", \"age\": 15}\nperson[\"hobby\"] = \"gaming\"\nprint(person)",
          expectedOutput: "{'name': 'Alice', 'age': 15, 'hobby': 'gaming'}",
          hint: "Assigning to a new key adds it!",
          hint2: "person[\"hobby\"] = \"gaming\""
        },
        {
          id: "del-explain",
          type: "explain",
          title: "🗑️ Deleting Entries",
          content: `Delete with **del** or **pop()**:

\`\`\`python
person = {"name": "Alice", "age": 15}

# Delete with del
del person["age"]

# Delete with pop() (returns the value)
name = person.pop("name")
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Deleting Values!",
          task: "Delete the 'age' key!",
          initialCode: "person = {\"name\": \"Alice\", \"age\": 15, \"school\": \"Middle School\"}\ndel person[\"age\"]\nprint(person)",
          expectedOutput: "{'name': 'Alice', 'school': 'Middle School'}",
          hint: "Use the format del dict[key] to delete!",
          hint2: "del person[\"age\"]"
        }
      ]
    },
    {
      id: "ch3",
      title: "Dictionary Methods",
      emoji: "🔧",
      steps: [
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 Useful Methods",
          content: `**keys()** - all keys
**values()** - all values
**items()** - key-value pairs

\`\`\`python
person = {"name": "Alice", "age": 15}

print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 15])
print(person.items())   # dict_items([('name', 'Alice'), ...])
\`\`\`

**get()** - safely retrieve a value
\`\`\`python
print(person.get("name"))  # Alice
print(person.get("job"))   # None (no error!)
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Iterating a Dictionary!",
          task: "Print all key-value pairs!",
          initialCode: "scores = {\"Korean\": 90, \"English\": 85, \"Math\": 95}\n\nfor subject, score in scores.items():\n    print(f\"{subject}: {score} pts\")",
          expectedOutput: "Korean: 90 pts\nEnglish: 85 pts\nMath: 95 pts",
          hint: "Use items() to iterate over key-value pairs!",
          hint2: "for key, value in dict.items():"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ keys, values, get!",
          task: "Try using various dictionary methods!",
          initialCode: "menu = {'Chicken': 18000, 'Pizza': 20000, 'Burger': 7000, 'Tteokbokki': 4000}\n\n# Menu names only (keys)\nprint('=== Menu List ===')\nfor name in menu.keys():\n    print(f'  {name}')\n\n# Prices only (values)\nprices = list(menu.values())\nprint(f'\\nAverage price: {sum(prices)//len(prices)} won')\n\n# Safe lookup (get)\nprint(f'\\nChicken: {menu.get(\"Chicken\")} won')\nprint(f'Sushi: {menu.get(\"Sushi\", \"not on menu\")}')",
          expectedOutput: "=== Menu List ===\n  Chicken\n  Pizza\n  Burger\n  Tteokbokki\n\nAverage price: 12250 won\n\nChicken: 18000 won\nSushi: not on menu",
          hint: "keys() for keys, values() for values, get() returns no error even if missing!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "mission-method",
          type: "mission",
          title: "🎯 Mission: Dictionary Methods!",
          task: "Fill in the 3 blanks to complete the grade analysis!",
          initialCode: "grades = {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'Diana': 96}\n\n# Print all student names\nfor name in grades.___():\n    print(f'Student: {name}')\n\n# Calculate average from all scores\nscores = list(grades.___())\navg = sum(scores) // len(scores)\nprint(f'\\nAverage: {avg} pts')\n\n# Safely look up a missing student\nresult = grades.___(\"Eve\", \"not found\")\nprint(f'Eve: {result}')",
          expectedOutput: "Student: Alice\nStudent: Bob\nStudent: Charlie\nStudent: Diana\n\nAverage: 87 pts\n\nEve: not found",
          hint: "keys() for names, values() for scores, get() for safe access!",
          hint2: "keys / values / get"
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
          title: "🏆 Final Mission!",
          task: "Look up a word in the vocabulary dictionary!",
          initialCode: "dictionary = {\n    \"apple\": \"a round fruit\",\n    \"banana\": \"a yellow fruit\",\n    \"cherry\": \"a small red fruit\"\n}\n\nword = \"apple\"\nif word ___ dictionary:\n    print(f\"{word} = {dictionary[___]}\")\nelse:\n    print(\"Word not found\")",
          expectedOutput: "apple = a round fruit",
          hint: "Use 'in' to check if a key exists!",
          hint2: "word in dictionary"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Dictionary { }** - key:value pairs
✅ **dict[key]** - accessing values
✅ **Add/Modify/Delete** - dict[key] = value, del
✅ **keys(), values(), items()** - methods
✅ **get()** - safe access

Next time, we'll learn about **sets**! 🚀`
        }
      ]
    }
  ]
}
