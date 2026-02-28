// ============================================
// C++ Project 2: RPG Character Manager
// Part 2 Review Project (struct, vector, range-for, reference)
// ============================================
import { LessonData } from '../types'

export const cppLessonP2EnData: LessonData = {
  id: "cpp-p2",
  title: "RPG Character Manager",
  emoji: "⚔️",
  description: "Part 2 Review Project! Manage an RPG party with struct and vector.",
  chapters: [
    // ============================================
    // Chapter 1: Character Design
    // ============================================
    {
      id: "ch1",
      title: "Character Design",
      emoji: "📋",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "⚔️ Project Intro — RPG Character Manager!",
          content: `In this project, we'll use everything from Part 2 — **struct, vector, range-for, reference** — to build an RPG party manager!

When finished, it will show this menu:

\`\`\`
=== RPG Party Manager ===
1. Add Character
2. View Party
3. Battle!
4. Quit
Choice: _
\`\`\`

In Python, you'd use a **class** for this, right?

\`\`\`python
class Character:
    def __init__(self, name, hp, attack, defense):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.level = 1
\`\`\`

In C++, we use **struct**! When you just need to bundle data, struct is perfect.

| Python 🐍 | C++ ⚡ |
|---|---|
| \`class Character:\` | \`struct Character { };\` |
| \`self.name\` | \`c.name\` |
| \`characters = []\` | \`vector<Character> party;\` |
| \`characters.append(c)\` | \`party.push_back(c);\` |
| \`for c in characters:\` | \`for (const auto& c : party)\` |

💡 This project puts ALL of Part 2's core concepts to work!`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 Designing the Character Struct",
          content: `What info does an RPG character need?

- **name** — Warrior, Mage, Archer...
- **hp** — Goes down when hit by monsters
- **attack** — Damage dealt to monsters
- **defense** — Reduces incoming damage
- **level** — Goes up when you win battles!

As a C++ struct:

\`\`\`cpp
struct Character {
    string name;
    int hp;
    int attack;
    int defense;
    int level;
};
\`\`\`

The Python dict equivalent would be:

\`\`\`python
hero = {
    "name": "Warrior",
    "hp": 100,
    "attack": 15,
    "defense": 10,
    "level": 1
}
\`\`\`

But struct is **safer** than a dict! Typos cause compile errors:

\`\`\`cpp
Character hero;
hero.name = "Warrior";     // OK
hero.nmae = "Warrior";     // Compile error! Catches your typo
\`\`\`

\`\`\`python
hero["nmae"] = "Warrior"   # No error... bug waiting to happen 😱
\`\`\`

💡 Structs provide **type safety** — bugs get caught before the program even runs!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Fill in the blanks",
          content: "Build the Character struct!",
          code: "___ Character {\n    string name;\n    int hp;\n    int attack;\n    int defense;\n    int ___;\n}___",
          fillBlanks: [
            { id: 0, answer: "struct", options: ["struct", "class", "type", "object"] },
            { id: 1, answer: "level", options: ["level", "lv", "exp", "rank"] },
            { id: 2, answer: ";", options: [";", "", ":", ")"] }
          ],
          explanation: "Use the struct keyword to declare, and don't forget the semicolon (;) after the closing brace! The level member is an int type."
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "struct vs class!",
          content: "What is the **biggest difference** between struct and class in C++?",
          options: [
            "struct cannot have functions",
            "struct members are public by default",
            "struct cannot use inheritance",
            "struct cannot have a constructor"
          ],
          answer: 1,
          explanation: "struct members are public by default, while class members are private by default. Other than that, they're almost identical! struct is convenient when you just need to bundle data."
        }
      ]
    },
    // ============================================
    // Chapter 2: Step by Step
    // ============================================
    {
      id: "ch2",
      title: "Step by Step",
      emoji: "🔨",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "🔨 Step 1 — Struct Definition + Character Creation",
          content: `First, let's define the Character struct and write a function to create characters!

**createCharacter function:**
\`\`\`cpp
Character createCharacter(string name, int hp, int atk, int def) {
    return {name, hp, atk, def, 1};  // level starts at 1
}
\`\`\`

Brace initialization \`{name, hp, atk, def, 1}\` makes creating structs super easy!

**printCharacter function:**
\`\`\`cpp
void printCharacter(const Character& c) {
    cout << "=== " << c.name << " ===" << endl;
    cout << "HP: " << c.hp << endl;
}
\`\`\`

\`const Character& c\` is important here!
- \`const\` → promises we **won't modify** the character inside the function
- \`&\` → passes by **reference** instead of copying (efficient!)

In Python, you never had to worry about this! In C++, **you manage performance directly**.

💡 Read-only functions → use \`const Type&\` parameters. It's a great habit!`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1 — Struct + Creation Function!",
          content: `Define the Character struct, create characters with createCharacter(), and print them with printCharacter()!

Notice how we use \`const Character&\` for pass-by-reference!`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int attack;
    int defense;
    int level;
};

Character createCharacter(string name, int hp, int atk, int def) {
    return {name, hp, atk, def, 1};
}

void printCharacter(const Character& c) {
    cout << "=== " << c.name << " ===" << endl;
    cout << "  HP: " << c.hp << endl;
    cout << "  ATK: " << c.attack << endl;
    cout << "  DEF: " << c.defense << endl;
    cout << "  LV: " << c.level << endl;
}

int main() {
    Character hero = createCharacter("Warrior", 100, 15, 10);
    printCharacter(hero);

    Character mage = createCharacter("Mage", 80, 20, 5);
    printCharacter(mage);

    return 0;
}`,
          expectedOutput: `=== Warrior ===
  HP: 100
  ATK: 15
  DEF: 10
  LV: 1
=== Mage ===
  HP: 80
  ATK: 20
  DEF: 5
  LV: 1`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔨 Step 2 — Managing a Party with vector!",
          content: `Now let's manage multiple characters with a **vector**!

\`\`\`cpp
vector<Character> party;
\`\`\`

In Python, that would be:
\`\`\`python
party = []  # lists can hold any type, but...
\`\`\`

C++ uses \`vector<Character>\` to **explicitly specify** what type is stored!

**Showing the party — range-for + auto:**
\`\`\`cpp
void showParty(const vector<Character>& party) {
    for (const auto& c : party) {
        cout << c.name << " [HP:" << c.hp << "]" << endl;
    }
}
\`\`\`

Why \`const vector<Character>&\`?
- No **copying** the entire vector (reference!)
- No **modifying** it inside the function (const!)

**Adding characters — reference for modification:**
\`\`\`cpp
void addCharacter(vector<Character>& party) {
    // Need to modify party directly, so just & without const!
    party.push_back({name, hp, atk, def, 1});
}
\`\`\`

- Read-only: \`const vector<Character>&\` (showParty)
- Modifiable: \`vector<Character>&\` (addCharacter)

💡 The presence or absence of const with & tells you "read-only vs. modifiable"!`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2 — Party Management Code!",
          content: `Manage a party with vector<Character>, and build showParty / addCharacter functions!

The key pattern is the range-for: \`for (const auto& c : party)\`!`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int attack;
    int defense;
    int level;
};

void showParty(const vector<Character>& party) {
    if (party.empty()) {
        cout << "Party is empty!" << endl;
        return;
    }
    cout << endl;
    cout << "=== Party List (" << party.size() << " members) ===" << endl;
    for (const auto& c : party) {
        cout << "  " << c.name
             << " [HP:" << c.hp
             << " ATK:" << c.attack
             << " DEF:" << c.defense
             << " LV:" << c.level << "]" << endl;
    }
}

void addCharacter(vector<Character>& party) {
    string name;
    int hp, atk, def;
    cout << "Name: "; cin >> name;
    cout << "HP: "; cin >> hp;
    cout << "Attack: "; cin >> atk;
    cout << "Defense: "; cin >> def;
    party.push_back({name, hp, atk, def, 1});
    cout << name << " has joined the party!" << endl;
}

int main() {
    vector<Character> party;
    party.push_back({"Warrior", 100, 15, 10, 1});
    party.push_back({"Mage", 80, 20, 5, 1});

    showParty(party);
    addCharacter(party);
    showParty(party);
    return 0;
}`,
          expectedOutput: `=== Party List (2 members) ===
  Warrior [HP:100 ATK:15 DEF:10 LV:1]
  Mage [HP:80 ATK:20 DEF:5 LV:1]
Name: Archer
HP: 90
Attack: 18
Defense: 8
Archer has joined the party!

=== Party List (3 members) ===
  Warrior [HP:100 ATK:15 DEF:10 LV:1]
  Mage [HP:80 ATK:20 DEF:5 LV:1]
  Archer [HP:90 ATK:18 DEF:8 LV:1]`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "Predict the party size!",
          code: `#include <iostream>
#include <vector>
using namespace std;

struct Character {
    string name;
    int hp, attack, defense, level;
};

int main() {
    vector<Character> party;
    party.push_back({"Warrior", 100, 15, 10, 1});
    party.push_back({"Mage", 80, 20, 5, 1});
    party.push_back({"Archer", 90, 18, 8, 1});
    party.pop_back();
    party.push_back({"Healer", 70, 8, 12, 1});
    party.push_back({"Rogue", 85, 22, 6, 1});
    cout << party.size();
    return 0;
}`,
          options: ["3", "4", "5", "Error"],
          answer: 1,
          explanation: "Start with 3 → pop_back() removes Archer → 2 → add Healer → 3 → add Rogue → 4! party.size() is 4."
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🔨 Step 3 — Battle System!",
          content: `Now the most fun part — the **battle system**!

**Random monster generation:**
\`\`\`cpp
#include <cstdlib>  // rand(), srand()
#include <ctime>    // time()

// Call once in main()
srand(time(0));

// Random monster
int monsterHp = 30 + rand() % 71;      // 30~100
int monsterAtk = 5 + rand() % 16;      // 5~20
\`\`\`

Similar to Python's \`random.randint(30, 100)\`!

**Damage calculation:**
\`\`\`cpp
int damage = attacker.attack - target_defense;
if (damage < 1) damage = 1;  // minimum 1 damage
\`\`\`

**Leveling up:**
\`\`\`cpp
void levelUp(Character& c) {  // & to modify directly!
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " leveled up! LV " << c.level << "!" << endl;
}
\`\`\`

\`Character& c\` is needed to modify the **original character**! Without \`&\`, only a copy gets changed and the original stays the same.

💡 To modify a struct inside a function, you MUST use a **reference (&)**!`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ Step 3 — Complete RPG Program!",
          content: `The full program is here! It uses struct, vector, range-for, references, and functions all together.

Choose 1-4 from the menu to add characters, view party, battle, or quit!`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Character {
    string name;
    int hp;
    int attack;
    int defense;
    int level;
};

void printCharacter(const Character& c) {
    cout << "  " << c.name
         << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " LV:" << c.level << "]" << endl;
}

void showParty(const vector<Character>& party) {
    if (party.empty()) {
        cout << "Party is empty!" << endl;
        return;
    }
    cout << "=== Party List (" << party.size() << " members) ===" << endl;
    for (const auto& c : party) {
        printCharacter(c);
    }
}

void addCharacter(vector<Character>& party) {
    string name;
    int hp, atk, def;
    cout << "Name: "; cin >> name;
    cout << "HP: "; cin >> hp;
    cout << "Attack: "; cin >> atk;
    cout << "Defense: "; cin >> def;
    party.push_back({name, hp, atk, def, 1});
    cout << name << " has joined the party!" << endl;
}

void levelUp(Character& c) {
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " leveled up! LV " << c.level << "!" << endl;
}

void battle(vector<Character>& party) {
    if (party.empty()) {
        cout << "No characters in the party!" << endl;
        return;
    }

    // Random monster generation
    string monsters[] = {"Slime", "Goblin", "Orc", "Dragon", "Skeleton"};
    string monsterName = monsters[rand() % 5];
    int monsterHp = 30 + rand() % 71;
    int monsterAtk = 5 + rand() % 16;
    int monsterDef = 3 + rand() % 10;

    cout << endl;
    cout << "=== A Monster Appeared! ===" << endl;
    cout << monsterName << " [HP:" << monsterHp
         << " ATK:" << monsterAtk
         << " DEF:" << monsterDef << "]" << endl;

    // Choose a party member
    cout << "Who will you send?" << endl;
    for (int i = 0; i < (int)party.size(); i++) {
        cout << i + 1 << ". " << party[i].name << endl;
    }
    int choice;
    cin >> choice;
    choice--;

    if (choice < 0 || choice >= (int)party.size()) {
        cout << "Invalid choice!" << endl;
        return;
    }

    Character& hero = party[choice];
    cout << endl;
    cout << hero.name << " vs " << monsterName << " — Fight!" << endl;

    int heroHp = hero.hp;

    // Battle loop
    while (heroHp > 0 && monsterHp > 0) {
        // Hero attacks
        int dmg = hero.attack - monsterDef + (rand() % 5);
        if (dmg < 1) dmg = 1;
        monsterHp -= dmg;
        cout << hero.name << " attacks! " << dmg << " damage!" << endl;

        if (monsterHp <= 0) {
            cout << "Defeated " << monsterName << "!" << endl;
            levelUp(hero);
            return;
        }

        // Monster attacks
        dmg = monsterAtk - hero.defense + (rand() % 5);
        if (dmg < 1) dmg = 1;
        heroHp -= dmg;
        cout << monsterName << " attacks! " << dmg << " damage!" << endl;
        cout << hero.name << " remaining HP: " << heroHp << endl;
    }

    cout << hero.name << " has fallen..." << endl;
    hero.hp = hero.hp / 2;
    cout << hero.name << "'s HP reduced to " << hero.hp << "." << endl;
}

int main() {
    srand(time(0));

    vector<Character> party;
    party.push_back({"Warrior", 100, 15, 10, 1});
    party.push_back({"Mage", 80, 20, 5, 1});

    int choice;
    while (true) {
        cout << endl;
        cout << "=== RPG Party Manager ===" << endl;
        cout << "1. Add Character" << endl;
        cout << "2. View Party" << endl;
        cout << "3. Battle!" << endl;
        cout << "4. Quit" << endl;
        cout << "Choice: ";
        cin >> choice;
        cout << endl;

        if (choice == 1) {
            addCharacter(party);
        } else if (choice == 2) {
            showParty(party);
        } else if (choice == 3) {
            battle(party);
        } else if (choice == 4) {
            cout << "Ending your adventure. Goodbye!" << endl;
            break;
        } else {
            cout << "Please pick 1-4!" << endl;
        }
    }
    return 0;
}`,
          expectedOutput: `=== RPG Party Manager ===
1. Add Character
2. View Party
3. Battle!
4. Quit
Choice: 2

=== Party List (2 members) ===
  Warrior [HP:100 ATK:15 DEF:10 LV:1]
  Mage [HP:80 ATK:20 DEF:5 LV:1]`
        }
      ]
    },
    // ============================================
    // Chapter 3: Complete & Challenge
    // ============================================
    {
      id: "ch3",
      title: "Complete & Challenge",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "🐍 Python vs C++ Comparison!",
          content: `What would the same program look like in Python?

**Python version — key code:**
\`\`\`python
class Character:
    def __init__(self, name, hp, atk, defense, level=1):
        self.name = name
        self.hp = hp
        self.attack = atk
        self.defense = defense
        self.level = level

party = []
party.append(Character("Warrior", 100, 15, 10))

for c in party:
    print(f"{c.name} [HP:{c.hp}]")
\`\`\`

**Comparison table:**

| Concept | Python 🐍 | C++ ⚡ |
|---|---|---|
| Bundling data | \`class Character:\` | \`struct Character { };\` |
| Creating | \`Character("Warrior", 100, ...)\` | \`{"Warrior", 100, ...}\` or function |
| Collection | \`party = []\` | \`vector<Character> party;\` |
| Adding | \`party.append(c)\` | \`party.push_back(c);\` |
| Iterating | \`for c in party:\` | \`for (const auto& c : party)\` |
| Passing to modify | Automatic (reference) | \`Character&\` required |
| Passing to read | Automatic | \`const Character&\` |
| Type safety | Runtime error | **Compile error (safer!)** |

C++ requires more typing, but you get **more safety and better performance** in return!

💡 Things that Python handles automatically, C++ lets you manage directly. The tradeoff is performance and safety!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "Understanding const references!",
          content: `Which statement about \`const vector<Character>&\` in showParty is **FALSE**?

\`\`\`cpp
void showParty(const vector<Character>& party) {
    for (const auto& c : party) { ... }
}
\`\`\``,
          options: [
            "It avoids copying the vector, making it efficient",
            "It prevents accidentally modifying party inside the function",
            "Removing const would cause a compile error",
            "Passing large data by reference is a good practice"
          ],
          answer: 2,
          explanation: "Removing const won't cause a compile error! But keeping const prevents accidental modifications, which is a great habit to have."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "🚀 Challenge Tasks!",
          content: `Level up your RPG manager even further!

**Challenge 1: Item System**
\`\`\`cpp
struct Item {
    string name;
    int hpBoost;
    int atkBoost;
};

struct Character {
    string name;
    int hp, attack, defense, level;
    vector<Item> inventory;  // vector inside a struct!
};
\`\`\`

**Challenge 2: Save/Load to File**
\`\`\`cpp
#include <fstream>

void saveParty(const vector<Character>& party) {
    ofstream file("save.txt");
    for (const auto& c : party) {
        file << c.name << " " << c.hp << " "
             << c.attack << " " << c.defense
             << " " << c.level << endl;
    }
}
\`\`\`

**Challenge 3: Multi-Character Battles**
- Entire party fights in turns
- Boss monsters (HP 300+!)
- Healer character that restores party HP

**Challenge 4: Refactor to class**
\`\`\`cpp
class Character {
private:
    string name;
    int hp, attack, defense, level;
public:
    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
    void takeDamage(int dmg);
    void levelUp();
    string getName() const { return name; }
};
\`\`\`

💡 These challenges connect to what you'll learn in Part 3!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 Part 2 Project Complete!",
          content: `## ✅ What You Used in This Project!

- ✅ **struct** — Bundled character data into a single type
- ✅ **vector** — Party management (push_back, size, empty)
- ✅ **range-for + auto** — \`for (const auto& c : party)\`
- ✅ **const reference** — Read-only passing \`const Character&\`
- ✅ **reference** — Modification passing \`Character&\`, \`vector<Character>&\`
- ✅ **Function separation** — showParty, addCharacter, battle, levelUp
- ✅ **string** — Character names, monster names

You completed a project using ALL of Part 2's core concepts!

The pattern of bundling data with struct, managing collections with vector, and organizing logic into functions is used **all the time** in C++ programming. Remember this pattern!

🎮 Keep evolving your RPG into something even more awesome!`
        }
      ]
    }
  ]
}
