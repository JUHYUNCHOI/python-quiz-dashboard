// ============================================
// C++ Project 2: RPG Character Manager
// Part 2 Review Project (struct, class, vector, range-for, reference, string)
// ============================================
import { LessonData } from '../types'

export const cppLessonP2EnData: LessonData = {
  id: "cpp-p2",
  title: "RPG Character Manager",
  emoji: "⚔️",
  description: "Part 2 Review Project! Build an RPG party manager using only what you've learned.",
  chapters: [
    // ============================================
    // Chapter 1: Character & Item Design
    // ============================================
    {
      id: "ch1",
      title: "Character & Item Design",
      emoji: "📋",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "⚔️ Project Intro",
          content: `In this project, we'll use **only** concepts from Part 2 to build an RPG party manager.

**Concepts used in this project:**

| Lesson | Concept | Where it's used |
|---|---|---|
| Lesson 9 | vector, push_back | Party & inventory |
| Lesson 11 | range-for, auto | Printing party/inventory |
| Lesson 12 | string operations | Level text, item search |
| Lesson 13 | reference (&) | Level up & equip functions |
| Lesson 15 | struct | Item type |
| Lesson 16 | class, constructor | Character type |

No new syntax — just combining what you've learned!

When finished, the program looks like this:

\`\`\`
=== Party Status (2 members) ===
Warrior [HP:100 ATK:20 DEF:10 LV1]
Mage    [HP:80  ATK:20 DEF:5  LV1]

Warrior equipped Iron Sword!
Warrior vs Slime!
Warrior attacks! 17 damage
Slime defeated!
Warrior leveled up! LV2
\`\`\``
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 Designing the Character Class",
          content: `Let's define what an RPG character needs using **class**. (Lesson 16)

\`\`\`cpp
class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;

    Character(string n, int h, int a, int d) {
        name = n;
        hp = h;
        attack = a;
        defense = d;
        level = 1;  // always starts at 1
    }
};
\`\`\`

The constructor lets us create characters like this:

\`\`\`cpp
Character hero("Warrior", 100, 15, 10);
cout << hero.name;   // Warrior
cout << hero.hp;     // 100
cout << hero.level;  // 1
\`\`\`

💡 Bundling 5 separate variables into a class is much safer — misspell a member name and the compiler catches it instantly!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Complete the Character class",
          content: "Fill in the blanks to finish the Character class.",
          code: "___ Character {\n___:\n    string name;\n    int hp;\n    int attack;\n    int defense;\n    int level;\n    Character(string n, int h, int a, int d) {\n        name = n; hp = h; attack = a; defense = d; level = 1;\n    }\n};",
          fillBlanks: [
            { id: 0, answer: "class", options: ["class", "struct", "type", "object"] },
            { id: 1, answer: "public", options: ["public", "private", "protected", "open"] }
          ],
          explanation: "Declare with class, and use public: so members can be accessed from outside!"
        },
        {
          id: "ch1-exp3",
          type: "explain",
          title: "🗡️ Designing struct Item + string operations",
          content: `Characters can hold items too. **But this time we'll use \`struct\` instead of class.** Why?

\`\`\`cpp
struct Item {
    string name;    // item name
    int atkBonus;   // attack bonus
    int hpBonus;    // HP bonus
};
\`\`\`

**class vs struct — when to use which?**

- **\`class Character\`** — hp shouldn't go negative, has **behaviors** like attack/defense → needs to **protect and wrap** its data → use class
- **\`struct Item\`** — just a name + a few numbers. Free read/write feels right → **plain data bundle** → use struct

**Rule of thumb**: if there's behavior or validation, use \`class\`. If it's just data, use \`struct\`.

\`\`\`cpp
Item sword = {"Iron Sword", 5, 0};        // brace initialization!
Item potion = {"Health Potion", 0, 30};

cout << sword.name;      // Iron Sword — direct access (struct defaults to public)
cout << sword.atkBonus;  // 5
\`\`\`

---

**String operations** (Lesson 12) fit naturally here:

\`\`\`cpp
// to_string(): number → string
string info = sword.name + " (ATK+" + to_string(sword.atkBonus) + ")";
cout << info;   // Iron Sword (ATK+5)

// find(): check if name contains "Sword"
if (sword.name.find("Sword") != string::npos) {
    cout << "This is a weapon!";
}

// length(): name length
cout << sword.name.length();  // 10
\`\`\`

💡 \`string::npos\` means "not found". If \`find()\` returns this value, the substring isn't there.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "Constructor check!",
          content: `What is the value of \`hero.level\` after \`Character hero("Warrior", 100, 15, 10)\`?

\`\`\`cpp
class Character {
public:
    string name;
    int hp, attack, defense, level;
    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};
\`\`\``,
          options: ["0", "1", "10", "Compile error"],
          answer: 1,
          explanation: "The constructor sets level = 1 automatically! Even though we didn't pass a level argument, it's always initialized to 1."
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
          title: "🔨 Step 1 — Print function",
          content: `Write a function to print character info. (Lesson 13 — references)

\`\`\`cpp
void printCharacter(const Character& c) {
    string lvInfo = "LV" + to_string(c.level);  // Lesson 12
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " " << lvInfo << "]" << endl;
}
\`\`\`

In \`const Character& c\`:
- \`&\` → passes by **reference**, no copying (Lesson 13)
- \`const\` → we **won't modify** the character inside the function

💡 Read-only functions → \`const Type&\`, modifying functions → \`Type&\``
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1 — Create and print characters!",
          content: `Define the Character class, create two characters, and print them.`,
          code: `#include <iostream>
#include <string>
using namespace std;

class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;

    Character(string n, int h, int a, int d) {
        name = n;
        hp = h;
        attack = a;
        defense = d;
        level = 1;
    }
};

void printCharacter(const Character& c) {
    string lvInfo = "LV" + to_string(c.level);
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " " << lvInfo << "]" << endl;
}

int main() {
    Character hero("Warrior", 100, 15, 10);
    Character mage("Mage", 80, 20, 5);

    printCharacter(hero);
    printCharacter(mage);

    return 0;
}`,
          expectedOutput: `Warrior [HP:100 ATK:15 DEF:10 LV1]
Mage [HP:80 ATK:20 DEF:5 LV1]`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔨 Step 2 — Manage party with vector",
          content: `Manage multiple characters with a **vector**. (Lesson 9)

\`\`\`cpp
vector<Character> party;

// push_back with constructor call
party.push_back(Character("Warrior", 100, 15, 10));
party.push_back(Character("Mage", 80, 20, 5));
\`\`\`

Print the full party with **range-for**! (Lesson 11)

\`\`\`cpp
void showParty(const vector<Character>& party) {
    cout << "=== Party (" << party.size() << " members) ===" << endl;
    for (const auto& c : party) {   // Lesson 11 range-for
        printCharacter(c);
    }
}
\`\`\`

\`const vector<Character>&\`:
- \`&\` → no copying the whole vector (Lesson 13)
- \`const\` → we won't modify it`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2 — Party list!",
          content: `Create a party vector, add characters, and print the list.`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;

    Character(string n, int h, int a, int d) {
        name = n;
        hp = h;
        attack = a;
        defense = d;
        level = 1;
    }
};

void printCharacter(const Character& c) {
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " LV:" << c.level << "]" << endl;
}

void showParty(const vector<Character>& party) {
    cout << "=== Party (" << party.size() << " members) ===" << endl;
    for (const auto& c : party) {
        printCharacter(c);
    }
}

int main() {
    vector<Character> party;
    party.push_back(Character("Warrior", 100, 15, 10));
    party.push_back(Character("Mage", 80, 20, 5));

    showParty(party);

    party.push_back(Character("Archer", 90, 18, 8));
    cout << "Archer joined the party!" << endl;

    showParty(party);
    return 0;
}`,
          expectedOutput: `=== Party (2 members) ===
Warrior [HP:100 ATK:15 DEF:10 LV:1]
Mage [HP:80 ATK:20 DEF:5 LV:1]
Archer joined the party!
=== Party (3 members) ===
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
#include <string>
using namespace std;

class Character {
public:
    string name;
    int hp, attack, defense, level;
    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};

int main() {
    vector<Character> party;
    party.push_back(Character("Warrior", 100, 15, 10));
    party.push_back(Character("Mage", 80, 20, 5));
    party.push_back(Character("Archer", 90, 18, 8));
    party.pop_back();
    party.push_back(Character("Healer", 70, 8, 12));
    party.push_back(Character("Rogue", 85, 22, 6));
    cout << party.size();
    return 0;
}`,
          options: ["3", "4", "5", "Error"],
          answer: 1,
          explanation: "Add 3 → pop_back() removes Archer → 2 → add Healer → 3 → add Rogue → 4! party.size() is 4."
        },
        {
          id: "ch2-exp-item",
          type: "explain",
          title: "🗡️ Step 3 — Item equip system",
          content: `Add an **inventory** to the Character class. (Lesson 9 vector + Lesson 15 struct)

\`\`\`cpp
class Character {
public:
    string name;
    int hp, attack, defense, level;
    vector<Item> inventory;   // vector of structs! (Lesson 9)

    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};
\`\`\`

The equip function uses **reference (&)** to modify the character directly: (Lesson 13)

\`\`\`cpp
void equip(Character& c, Item item) {
    c.attack += item.atkBonus;
    c.hp += item.hpBonus;
    c.inventory.push_back(item);
    cout << c.name << " equipped " << item.name << "!" << endl;
}
\`\`\`

Show inventory with range-for: (Lesson 11)

\`\`\`cpp
void showInventory(const Character& c) {
    cout << c.name << "'s inventory:" << endl;
    for (const auto& item : c.inventory) {
        string info = item.name + " (ATK+" + to_string(item.atkBonus)
                    + " HP+" + to_string(item.hpBonus) + ")";
        cout << "  " << info << endl;
    }
}
\`\`\``
        },
        {
          id: "ch2-prac-item",
          type: "practice" as const,
          title: "✋ Step 3 — Create items and equip!",
          content: `Create struct Items and equip them to a character. Check that stats increase!`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Item {
    string name;
    int atkBonus;
    int hpBonus;
};

class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;
    vector<Item> inventory;

    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};

void equip(Character& c, Item item) {
    c.attack += item.atkBonus;
    c.hp += item.hpBonus;
    c.inventory.push_back(item);
    cout << c.name << " equipped " << item.name << "!" << endl;
}

void showInventory(const Character& c) {
    cout << c.name << "'s inventory (" << c.inventory.size() << "):" << endl;
    for (const auto& item : c.inventory) {
        string info = item.name + " (ATK+" + to_string(item.atkBonus)
                    + " HP+" + to_string(item.hpBonus) + ")";
        cout << "  " << info << endl;
    }
    cout << "Current stats — ATK:" << c.attack << " HP:" << c.hp << endl;
}

int main() {
    Character hero("Warrior", 100, 15, 10);

    Item sword = {"Iron Sword", 5, 0};
    Item armor = {"Leather Armor", 0, 20};

    equip(hero, sword);
    equip(hero, armor);
    showInventory(hero);

    return 0;
}`,
          expectedOutput: `Warrior equipped Iron Sword!
Warrior equipped Leather Armor!
Warrior's inventory (2):
  Iron Sword (ATK+5 HP+0)
  Leather Armor (ATK+0 HP+20)
Current stats — ATK:20 HP:120`
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🔨 Step 4 — Level up (modify with reference)",
          content: `When a character wins a battle, they get stronger. Use **reference (&)** to modify the original. (Lesson 13)

\`\`\`cpp
void levelUp(Character& c) {   // & → modifies original!
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " leveled up! LV" << c.level << endl;
}
\`\`\`

Without \`&\`, only a **copy** gets changed — the original party member stays the same:

\`\`\`cpp
void levelUp(Character c) {    // no & → modifies copy only!
    c.level++;  // won't affect the actual party!
}
\`\`\`

💡 To modify a class object inside a function, you MUST use \`&\`!`
        },
        {
          id: "ch2-exp4",
          type: "explain",
          title: "🔨 Step 5 — Battle system",
          content: `Simple battle system — just damage calculation, no randomness!

\`\`\`cpp
void battle(Character& hero) {
    // Fixed monster stats
    string monsterName = "Slime";
    int monsterHp = 50;
    int monsterAtk = 8;
    int monsterDef = 3;

    cout << hero.name << " vs " << monsterName << "!" << endl;

    // Damage = attack - defense (minimum 1)
    int heroDmg = hero.attack - monsterDef;
    if (heroDmg < 1) heroDmg = 1;

    int monsterDmg = monsterAtk - hero.defense;
    if (monsterDmg < 1) monsterDmg = 1;

    monsterHp -= heroDmg;
    cout << hero.name << " attacks! " << heroDmg << " damage" << endl;

    if (monsterHp <= 0) {
        cout << monsterName << " defeated!" << endl;
        levelUp(hero);   // level up! (passed by reference)
    } else {
        hero.hp -= monsterDmg;
        cout << monsterName << " counterattacks! " << monsterDmg << " damage" << endl;
        cout << hero.name << " HP: " << hero.hp << endl;
    }
}
\`\`\`

\`Character& hero\` means level up results are immediately reflected in the party.`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ Complete — Full RPG Program!",
          content: `struct, class, vector, range-for, references, and string operations all in one program.

Choose 1–5 from the menu!`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// ── struct: Lesson 15 ─────────────────────────
struct Item {
    string name;
    int atkBonus;
    int hpBonus;
};

// ── class: Lesson 16 ─────────────────────────
class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;
    vector<Item> inventory;   // vector of struct: Lesson 9

    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};

// ── const reference for reading: Lesson 13 ───
void printCharacter(const Character& c) {
    string lvInfo = "LV" + to_string(c.level);  // Lesson 12
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " " << lvInfo << "]" << endl;
}

void showParty(const vector<Character>& party) {
    cout << "=== Party (" << party.size() << " members) ===" << endl;
    for (const auto& c : party) {   // range-for: Lesson 11
        printCharacter(c);
    }
}

// ── reference for modification: Lesson 13 ────
void equip(Character& c, Item item) {
    c.attack += item.atkBonus;
    c.hp += item.hpBonus;
    c.inventory.push_back(item);
    cout << c.name << " equipped " << item.name << "!" << endl;
}

void showInventory(const Character& c) {
    if (c.inventory.empty()) {
        cout << c.name << "'s inventory is empty." << endl;
        return;
    }
    cout << c.name << "'s inventory:" << endl;
    for (const auto& item : c.inventory) {
        cout << "  " << item.name
             << " (ATK+" << item.atkBonus
             << " HP+" << item.hpBonus << ")" << endl;
    }
}

void levelUp(Character& c) {
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " leveled up! LV" << c.level << endl;
}

void battle(Character& hero) {
    string monsterName = "Slime";
    int monsterHp = 50;
    int monsterAtk = 8;
    int monsterDef = 3;

    cout << hero.name << " vs " << monsterName << "!" << endl;

    int heroDmg = hero.attack - monsterDef;
    if (heroDmg < 1) heroDmg = 1;

    int monsterDmg = monsterAtk - hero.defense;
    if (monsterDmg < 1) monsterDmg = 1;

    monsterHp -= heroDmg;
    cout << hero.name << " attacks! " << heroDmg << " damage" << endl;

    if (monsterHp <= 0) {
        cout << monsterName << " defeated!" << endl;
        levelUp(hero);
    } else {
        hero.hp -= monsterDmg;
        cout << monsterName << " counterattacks! " << monsterDmg << " damage" << endl;
        cout << hero.name << " HP: " << hero.hp << endl;
    }
}

int main() {
    vector<Character> party;
    party.push_back(Character("Warrior", 100, 15, 10));
    party.push_back(Character("Mage", 80, 20, 5));

    Item sword = {"Iron Sword", 5, 0};
    equip(party[0], sword);

    int choice;
    while (true) {
        cout << endl;
        cout << "=== RPG Party Manager ===" << endl;
        cout << "1. View Party" << endl;
        cout << "2. Warrior Battle" << endl;
        cout << "3. Mage Battle" << endl;
        cout << "4. Warrior Inventory" << endl;
        cout << "5. Quit" << endl;
        cout << "Choice: ";
        cin >> choice;

        if (choice == 1) {
            showParty(party);
        } else if (choice == 2) {
            battle(party[0]);
        } else if (choice == 3) {
            battle(party[1]);
        } else if (choice == 4) {
            showInventory(party[0]);
        } else if (choice == 5) {
            cout << "Ending your adventure!" << endl;
            break;
        } else {
            cout << "Please pick 1-5!" << endl;
        }
    }
    return 0;
}`,
          stdin: `1\n4\n2\n1\n5`,
          expectedOutput: `Warrior equipped Iron Sword!

=== RPG Party Manager ===
1. View Party
2. Warrior Battle
3. Mage Battle
4. Warrior Inventory
5. Quit
Choice: 1
=== Party (2 members) ===
Warrior [HP:100 ATK:20 DEF:10 LV1]
Mage [HP:80 ATK:20 DEF:5 LV1]

=== RPG Party Manager ===
1. View Party
2. Warrior Battle
3. Mage Battle
4. Warrior Inventory
5. Quit
Choice: 4
Warrior's inventory:
  Iron Sword (ATK+5 HP+0)

=== RPG Party Manager ===
1. View Party
2. Warrior Battle
3. Mage Battle
4. Warrior Inventory
5. Quit
Choice: 2
Warrior vs Slime!
Warrior attacks! 17 damage
Slime defeated!
Warrior leveled up! LV2

=== RPG Party Manager ===
1. View Party
2. Warrior Battle
3. Mage Battle
4. Warrior Inventory
5. Quit
Choice: 1
=== Party (2 members) ===
Warrior [HP:110 ATK:23 DEF:12 LV2]
Mage [HP:80 ATK:20 DEF:5 LV1]

=== RPG Party Manager ===
1. View Party
2. Warrior Battle
3. Mage Battle
4. Warrior Inventory
5. Quit
Choice: 5
Ending your adventure!`
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
          title: "🐍 Python vs C++ Comparison",
          content: `Same program in Python:

\`\`\`python
class Character:
    def __init__(self, name, hp, attack, defense):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.level = 1

party = []
party.append(Character("Warrior", 100, 15, 10))

for c in party:
    print(f"{c.name} [HP:{c.hp}]")
\`\`\`

**Comparison table:**

| Concept | Python 🐍 | C++ ⚡ |
|---|---|---|
| Bundle data | \`class Character:\` | \`class Character { };\` |
| Create | \`Character("Warrior", ...)\` | \`Character("Warrior", ...)\` |
| List | \`party = []\` | \`vector<Character> party;\` |
| Add | \`party.append(c)\` | \`party.push_back(c);\` |
| Iterate | \`for c in party:\` | \`for (const auto& c : party)\` |
| Pass to modify | Automatic | \`Character&\` required |
| Pass to read | Automatic | \`const Character&\` |

Writing \`&\` explicitly feels like extra work — but it tells you exactly **when a copy happens** just by reading the code!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "Understanding const reference!",
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
          explanation: "Removing const won't cause a compile error! But keeping const prevents accidental modifications — it's a great habit."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "🚀 Challenge Tasks",
          content: `Level up your RPG! Everything below uses only concepts you've learned.

**Challenge 1: Add a character**
\`\`\`cpp
string name;
int hp, atk, def;
cout << "Name: "; cin >> name;
cout << "HP: "; cin >> hp;
// ...
party.push_back(Character(name, hp, atk, def));
\`\`\`

**Challenge 2: Level up the whole party — range-for (Lesson 11)**
\`\`\`cpp
for (auto& c : party) {   // no const — we're modifying!
    levelUp(c);
}
\`\`\`

**Challenge 3: Find the strongest character**
\`\`\`cpp
Character best = party[0];
for (const auto& c : party) {
    if (c.attack > best.attack) {
        best = c;
    }
}
cout << "Strongest: " << best.name << endl;
\`\`\`

**Challenge 4: Search inventory for weapons — string find() (Lesson 12)**
\`\`\`cpp
for (const auto& item : hero.inventory) {
    if (item.name.find("Sword") != string::npos) {
        cout << "Weapon found: " << item.name << endl;
    }
}
\`\`\`

💡 In Challenge 2, notice \`auto&\` (no const) vs \`const auto&\`!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 Part 2 Project Complete!",
          content: `## ✅ What you reviewed in this project

- ✅ **struct** (Lesson 15) — Item type definition
- ✅ **class** (Lesson 16) — Character data + constructor
- ✅ **vector** (Lesson 9) — Party & inventory, push_back, size, empty
- ✅ **range-for + auto** (Lesson 11) — \`for (const auto& c : party)\`
- ✅ **string operations** (Lesson 12) — \`to_string()\`, \`find()\`
- ✅ **const reference** (Lesson 13) — read-only passing \`const Character&\`
- ✅ **reference** (Lesson 13) — modification passing \`Character&\`

The pattern of bundling data with class, managing collections with vector, and organizing logic into functions is used **all the time** in C++ programming. Remember this pattern!

🎮 Keep building your RPG into something even more awesome!`
        }
      ]
    }
  ]
}
