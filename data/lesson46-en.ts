import { LessonData } from './types'

export const lesson46EnData: LessonData = {
  id: "46en",
  title: "Packages & pip",
  emoji: "📦",
  description: "Install and use code made by developers around the world!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Packages? + pip Basics",
      emoji: "📦",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 What's the difference between a module and a package?",
          content: `💭 Some things like math are just **a single file**, while others like requests are an **entire folder**! What's the difference between the two?

\`\`\`python
# Module = a single .py file
import math
print(math.sqrt(16))  # 4.0
\`\`\`

\`\`\`
# Package = a folder containing multiple modules
requests/          # Package folder
    __init__.py
    api.py         # Module 1
    models.py      # Module 2
    utils.py       # Module 3
\`\`\`

@Key point: **Module** = a single .py file, **Package** = a folder bundling multiple modules!

| Category | Description | Example |
|----------|-------------|---------|
| Module | A single .py file | math, json |
| Package | A bundle of modules | requests, pandas |

Python has **built-in modules** (included by default) and **external packages** (installed separately)!`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 How do you install external packages?",
          content: `💭 I want to use awesome packages made by developers worldwide! But they're not on my computer... is there a **way to install** them?

\`\`\`bash
# Install a package
pip install package_name

# Uninstall a package
pip uninstall package_name

# View installed packages
pip list

# View info about a specific package
pip show package_name

# Upgrade a package
pip install --upgrade package_name
\`\`\`

@Key point: **pip** = Package Installer for Python! Use pip install to install, pip list to check the list!

> **Note:** pip commands are run in the terminal!
> You can't run them in this web environment, but make sure to remember the commands!`
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quiz!",
          content: "What command installs a package?",
          options: [
            "python install package",
            "pip install package",
            "import install package",
            "download package"
          ],
          answer: 1,
          explanation: "pip install is the command to install packages!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Quiz!",
          content: "What is the difference between a module and a package?",
          options: [
            "A module is bigger than a package",
            "Package = a bundle of multiple modules",
            "There is no difference",
            "Package = a single function"
          ],
          answer: 1,
          explanation: "Module = a single .py file, Package = a folder bundling multiple modules!"
        },
        {
          id: "ch1-4",
          type: "tryit",
          title: "💻 Distinguish built-in vs external!",
          task: "Built-in modules can be imported right away! Run it!",
          initialCode: `# Built-in modules = use without installing!
import math
import json
import string

print('=== Built-in Module Test ===')
print(f'math.sqrt(49) = {math.sqrt(49)}')
print(f'json.dumps({{"a": 1}}) = {json.dumps({"a": 1})}')
print(f'string.digits = {string.digits}')

# External packages need pip install!
# Can't install in this web env, try on your real computer!
print('\\n=== External Packages (install required) ===')
print('pip install requests  → web requests')
print('pip install pandas    → data analysis')
print('pip install pygame    → game development')`,
          expectedOutput: `=== Built-in Module Test ===\nmath.sqrt(49) = 7.0\njson.dumps({"a": 1}) = {"a": 1}\nstring.digits = 0123456789\n\n=== External Packages (install required) ===\npip install requests  → web requests\npip install pandas    → data analysis\npip install pygame    → game development`,
          hint: "Built-in modules can be used just by importing!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Quiz!",
          content: "What command shows the list of installed packages?",
          options: [
            "pip show all",
            "pip list",
            "pip packages",
            "pip installed"
          ],
          answer: 1,
          explanation: "pip list shows you a list of all installed packages!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Using Built-in Modules",
      emoji: "🧰",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "💭 There are modules you can use without pip install?",
          content: `💭 We learned that packages need pip install to be installed... but math and json worked right away without installing! What modules can you use **without installing**?

\`\`\`python
import math       # No install needed!
import json        # No install needed!
import string      # No install needed!
\`\`\`

@Key point: **Built-in modules** = included with Python by default! You can import them without pip install!

| Module | Function | Example |
|--------|----------|---------|
| math | Math calculations | sqrt(), ceil(), pi |
| json | JSON data processing | dumps(), loads() |
| string | String constants | ascii_lowercase |
| random | Random values | randint(), choice() |
| datetime | Date/time | now(), date() |`
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "💻 Using the json module!",
          task: "Use the json module to convert data!",
          initialCode: `import json

# Dictionary to JSON string
data = {
    'name': 'Hero',
    'hp': 100,
    'items': ['Sword', 'Shield', 'Potion']
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print('=== JSON Conversion ===')
print(json_str)

# JSON string to dictionary
parsed = json.loads(json_str)
print(f'\\nName: {parsed["name"]}')
print(f'Items: {parsed["items"]}')`,
          expectedOutput: `=== JSON Conversion ===\n{\n  "name": "Hero",\n  "hp": 100,\n  "items": [\n    "Sword",\n    "Shield",\n    "Potion"\n  ]\n}\n\nName: Hero\nItems: ['Sword', 'Shield', 'Potion']`,
          hint: "dumps = dictionary to string, loads = string to dictionary",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-2",
          type: "tryit",
          title: "💻 Using the string module!",
          task: "Check the constants in the string module!",
          initialCode: `import string

print('Lowercase:', string.ascii_lowercase)
print('Uppercase:', string.ascii_uppercase)
print('Digits:', string.digits)
print('Punctuation:', string.punctuation[:10])`,
          expectedOutput: `Lowercase: abcdefghijklmnopqrstuvwxyz\nUppercase: ABCDEFGHIJKLMNOPQRSTUVWXYZ\nDigits: 0123456789\nPunctuation: !"#$%&'()*`,
          hint: "The string module has constants for each character type",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "🎯 Mission: Password validator!",
          task: "Fill in 3 blanks to complete a password validator using the string module!",
          initialCode: `import string

def check_password(pw):
    has_lower = False
    has_upper = False
    has_digit = False

    for ch in pw:
        if ch in string.ascii___:
            has_lower = True
        elif ch in string.ascii___:
            has_upper = True
        elif ch in string.___:
            has_digit = True

    print(f'Password: {pw}')
    print(f'  Lowercase: {"✅" if has_lower else "❌"}')
    print(f'  Uppercase: {"✅" if has_upper else "❌"}')
    print(f'  Digit: {"✅" if has_digit else "❌"}')

    if has_lower and has_upper and has_digit:
        print('  → Strong password!')
    else:
        print('  → Weak password!')

check_password('Hello123')
print()
check_password('hello')`,
          expectedOutput: `Password: Hello123\n  Lowercase: ✅\n  Uppercase: ✅\n  Digit: ✅\n  → Strong password!\n\nPassword: hello\n  Lowercase: ✅\n  Uppercase: ❌\n  Digit: ❌\n  → Weak password!`,
          hint: "Use the lowercase, uppercase, and digit constants from the string module!",
          hint2: "lowercase / uppercase / digits"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Quiz!",
          content: "What does `json.dumps()` do?",
          options: [
            "Delete a JSON file",
            "Dictionary → JSON string",
            "JSON → Run Python",
            "Open a JSON file"
          ],
          answer: 1,
          explanation: "dumps = dump string! It converts a dictionary to a JSON string!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Comprehensive Practice",
      emoji: "🎮",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "💭 You can do web scraping and game dev with Python?",
          content: `💭 They say Python can do **web requests**, **game development**, and even **data analysis**! But these features aren't built-in... where can you get them?

\`\`\`bash
# Usage flow
pip install requests    # 1. Install
import requests         # 2. Import
requests.get(url)       # 3. Use!
\`\`\`

@Key point: **PyPI (pypi.org)** = a repository of 400,000+ external packages! Install them with pip install to use!

| Package | Purpose | Install Command |
|---------|---------|-----------------|
| requests | Web requests | pip install requests |
| pandas | Data analysis | pip install pandas |
| pygame | Game development | pip install pygame |
| flask | Web server | pip install flask |
| matplotlib | Graphs | pip install matplotlib |

> You can't install external packages in this web environment,
> but on your real computer you can freely install them with pip!`
        },
        {
          id: "ch3-1",
          type: "tryit",
          title: "💻 Using multiple built-in modules together!",
          task: "Use the math + json modules together!",
          initialCode: `import math
import json

# Game character data
characters = [
    {'name': 'Hero', 'hp': 100, 'atk': 25},
    {'name': 'Mage', 'hp': 80, 'atk': 35},
    {'name': 'Archer', 'hp': 90, 'atk': 30}
]

# Calculate average attack power
total_atk = sum(c['atk'] for c in characters)
avg_atk = total_atk / len(characters)

print(f'Average ATK: {avg_atk:.1f}')
print(f'Rounded up: {math.ceil(avg_atk)}')
print(f'Character count: {len(characters)}')

# JSON save format
save_data = json.dumps(characters, ensure_ascii=False)
print(f'\\nSave data: {save_data}')`,
          expectedOutput: `Average ATK: 30.0\nRounded up: 30\nCharacter count: 3\n\nSave data: [{"name": "Hero", "hp": 100, "atk": 25}, {"name": "Mage", "hp": 80, "atk": 35}, {"name": "Archer", "hp": 90, "atk": 30}]`,
          hint: "math is for calculations, json is for data conversion",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-1b",
          type: "tryit",
          title: "💻 Create a settings file with json!",
          task: "Manage game settings with the json module!",
          initialCode: `import json

# Create game settings
settings = {
    'volume': 80,
    'difficulty': 'Normal',
    'language': 'English',
    'controls': {
        'jump': 'space',
        'attack': 'z',
        'defend': 'x'
    }
}

# Save settings (convert to JSON)
settings_json = json.dumps(settings, ensure_ascii=False, indent=2)
print('=== Save Settings ===')
print(settings_json)

# Load settings (restore from JSON)
loaded = json.loads(settings_json)
print(f'\\n=== Check Settings ===')
print(f'Volume: {loaded["volume"]}')
print(f'Difficulty: {loaded["difficulty"]}')
print(f'Jump key: {loaded["controls"]["jump"]}')

# Change settings
loaded['volume'] = 50
loaded['difficulty'] = 'Hard'
new_json = json.dumps(loaded, ensure_ascii=False, indent=2)
print(f'\\n=== Changed Settings ===')
print(f'Volume: {loaded["volume"]}')
print(f'Difficulty: {loaded["difficulty"]}')`,
          expectedOutput: `=== Save Settings ===\n{\n  "volume": 80,\n  "difficulty": "Normal",\n  "language": "English",\n  "controls": {\n    "jump": "space",\n    "attack": "z",\n    "defend": "x"\n  }\n}\n\n=== Check Settings ===\nVolume: 80\nDifficulty: Normal\nJump key: space\n\n=== Changed Settings ===\nVolume: 50\nDifficulty: Hard`,
          hint: "json.dumps to save, json.loads to load!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-2",
          type: "mission",
          title: "🎯 Game Save/Load System!",
          task: "Fill in 3 blanks to complete a game save/load system!",
          initialCode: `import ___

# Game save data
save = {
    'player': 'Hero',
    'level': 5,
    'hp': 150,
    'items': ['Flame Sword', 'Steel Shield', 'Healing Potion'],
    'gold': 2500
}

# Save (dictionary → JSON string)
save_str = json.___(save, ensure_ascii=False, indent=2)
print('=== Game Save ===')
print(save_str)

# Load (JSON string → dictionary)
loaded = json.___(save_str)
print(f'\\n=== Game Load ===')
print(f'Player: {loaded["player"]}')
print(f'Level: {loaded["level"]}')
print(f'Items: {", ".join(loaded["items"])}')
print(f'Gold: {loaded["gold"]}G')`,
          expectedOutput: `=== Game Save ===\n{\n  "player": "Hero",\n  "level": 5,\n  "hp": 150,\n  "items": [\n    "Flame Sword",\n    "Steel Shield",\n    "Healing Potion"\n  ],\n  "gold": 2500\n}\n\n=== Game Load ===\nPlayer: Hero\nLevel: 5\nItems: Flame Sword, Steel Shield, Healing Potion\nGold: 2500G`,
          hint: "Use dumps (save) and loads (load) from the json module!",
          hint2: "json / dumps / loads"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Final Quiz!",
          content: "What is the correct order to use an external package?",
          options: [
            "import → pip install → use",
            "pip install → import → use",
            "use → pip install → import",
            "Just import and it works"
          ],
          answer: 1,
          explanation: "First install with pip install, then import to load it, then you can use it!"
        }
      ]
    }
  ]
}
