// ============================================
// C++ Project 2: RPG 캐릭터 관리
// Part 2 복습 프로젝트 (class, vector, range-for, reference)
// ============================================
import { LessonData } from '../types'

export const cppLessonP2Data: LessonData = {
  id: "cpp-p2",
  title: "RPG 캐릭터 관리",
  emoji: "⚔️",
  description: "Part 2 복습 프로젝트! class와 vector로 RPG 파티를 관리해요.",
  chapters: [
    // ============================================
    // Chapter 1: 캐릭터 설계
    // ============================================
    {
      id: "ch1",
      title: "캐릭터 설계",
      emoji: "📋",
      steps: [
        {
          id: "ch1-exp1",
          type: "explain",
          title: "⚔️ 프로젝트 소개 — RPG 캐릭터 관리!",
          content: `이번 프로젝트에서는 Part 2에서 배운 **class, vector, range-for, reference**를 총동원해서 RPG 파티 관리 프로그램을 만들어요!

완성하면 이런 메뉴가 나와요:

\`\`\`
=== RPG 파티 관리 ===
1. 캐릭터 추가
2. 파티 보기
3. 전투!
4. 종료
선택: _
\`\`\`

파이썬으로 만든다면 이렇게 쓰겠죠?

\`\`\`python
class Character:
    def __init__(self, name, hp, attack, defense):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.level = 1
\`\`\`

C++에서도 똑같이 **class**를 써요! 레슨 14에서 배운 바로 그거예요.

| 파이썬 🐍 | C++ ⚡ |
|---|---|
| \`class Character:\` | \`class Character { };\` |
| \`self.name\` | \`c.name\` |
| \`characters = []\` | \`vector<Character> party;\` |
| \`characters.append(c)\` | \`party.push_back(c);\` |
| \`for c in characters:\` | \`for (const auto& c : party)\` |

💡 이 프로젝트에서 Part 2의 핵심 개념을 전부 활용해봐요!`
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 Character class 설계하기",
          content: `RPG 캐릭터에는 어떤 정보가 필요할까요?

- **이름** (name) — 용사, 마법사, 궁수...
- **체력** (hp) — 몬스터에게 맞으면 줄어요
- **공격력** (attack) — 몬스터에게 주는 데미지
- **방어력** (defense) — 받는 데미지를 줄여요
- **레벨** (level) — 전투에서 이기면 올라가요!

C++ class로 표현하면:

\`\`\`cpp
class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;

    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};
\`\`\`

**생성자** 덕분에 이렇게 간편하게 만들 수 있어요:

\`\`\`cpp
Character hero("용사", 100, 15, 10);
cout << hero.name;   // 용사
cout << hero.hp;     // 100
\`\`\`

파이썬 dict와 비교하면:

\`\`\`python
hero = {
    "name": "용사",
    "hp": 100,
    "attack": 15,
    "defense": 10,
    "level": 1
}
\`\`\`

하지만 class는 dict보다 **안전해요**! 오타를 치면 컴파일 에러가 나거든요.

\`\`\`cpp
hero.nmae = "용사";     // 컴파일 에러! 오타를 잡아줘요
\`\`\`

\`\`\`python
hero["nmae"] = "용사"   # 에러 없이 실행됨... 나중에 버그 😱
\`\`\`

💡 class는 **타입 안전성** 덕분에 버그를 미리 잡아줘요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "RPG 캐릭터 클래스를 완성해봐요!",
          code: "___ Character {\n___:\n    string name;\n    int hp;\n    int attack;\n    int defense;\n    int level;\n    Character(string n, int h, int a, int d)\n        : name(n), hp(h), attack(a), defense(d), level(1) {}\n};",
          fillBlanks: [
            { id: 0, answer: "class", options: ["class", "struct", "type", "object"] },
            { id: 1, answer: "public", options: ["public", "private", "protected", "open"] }
          ],
          explanation: "class로 선언하고, 멤버와 생성자를 외부에서 쓸 수 있게 public:으로 명시해요!"
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "class 생성자!",
          content: `다음 Character 클래스에서 \`Character("용사", 100, 15, 10)\`로 생성하면 \`level\`의 값은?

\`\`\`cpp
class Character {
public:
    string name;
    int hp, attack, defense, level;
    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};
\`\`\``,
          options: ["0", "1", "10", "컴파일 오류"],
          answer: 1,
          explanation: "생성자에서 level(1)로 초기화하기 때문에 항상 1로 시작해요! 인자로 전달하지 않아도 자동으로 설정돼요."
        }
      ]
    },
    // ============================================
    // Chapter 2: 단계별 만들기
    // ============================================
    {
      id: "ch2",
      title: "단계별 만들기",
      emoji: "🔨",
      steps: [
        {
          id: "ch2-exp1",
          type: "explain",
          title: "🔨 Step 1 — class 정의 + 캐릭터 생성",
          content: `Character class를 정의하고, 캐릭터를 출력하는 함수를 작성해요!

**printCharacter 함수:**
\`\`\`cpp
void printCharacter(const Character& c) {
    cout << "=== " << c.name << " ===" << endl;
    cout << "HP: " << c.hp << endl;
}
\`\`\`

여기서 \`const Character& c\`가 중요해요!
- \`const\` → 함수 안에서 캐릭터를 **수정하지 않겠다**는 약속
- \`&\` → 복사하지 않고 **참조**로 전달 (효율적!)

파이썬에서는 이런 걸 신경 쓸 필요 없었죠? C++에서는 **성능을 직접 관리**해요!

💡 읽기만 하는 함수 → \`const Type&\`로 받는 게 좋은 습관이에요!`
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1 — class + 출력 함수!",
          content: `Character class를 정의하고, 출력 함수를 만들어서 각 캐릭터 정보를 출력해봐요!

참조 전달을 사용하는 방법에 주목하세요.`,
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

    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};

void printCharacter(const Character& c) {
    cout << "=== " << c.name << " ===" << endl;
    cout << "  HP: " << c.hp << endl;
    cout << "  ATK: " << c.attack << endl;
    cout << "  DEF: " << c.defense << endl;
    cout << "  LV: " << c.level << endl;
}

int main() {
    Character hero("용사", 100, 15, 10);
    printCharacter(hero);

    Character mage("마법사", 80, 20, 5);
    printCharacter(mage);

    return 0;
}`,
          expectedOutput: `=== 용사 ===
  HP: 100
  ATK: 15
  DEF: 10
  LV: 1
=== 마법사 ===
  HP: 80
  ATK: 20
  DEF: 5
  LV: 1`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔨 Step 2 — vector로 파티 관리!",
          content: `이제 캐릭터 여러 명을 **vector**로 관리해요!

\`\`\`cpp
vector<Character> party;
\`\`\`

파이썬이라면:
\`\`\`python
party = []  # list에 아무 타입이나 넣을 수 있지만...
\`\`\`

C++은 \`vector<Character>\`처럼 **어떤 타입을 저장할지** 명확하게 정해요!

**파티 목록 출력 — range-for + auto:**
\`\`\`cpp
void showParty(const vector<Character>& party) {
    for (const auto& c : party) {
        cout << c.name << " [HP:" << c.hp << "]" << endl;
    }
}
\`\`\`

여기서 \`const vector<Character>&\`를 쓰는 이유:
- vector를 통째로 **복사하지 않아요** (참조!)
- 함수 안에서 **수정하지 않아요** (const!)

**캐릭터 추가 — 참조로 수정:**
\`\`\`cpp
void addCharacter(vector<Character>& party) {
    // party를 직접 수정해야 하니까 const 없이 &만!
    party.emplace_back(name, hp, atk, def);
}
\`\`\`

- 읽기만: \`const vector<Character>&\` (showParty)
- 수정도: \`vector<Character>&\` (addCharacter)

💡 참조(&)의 const 유무로 "읽기 전용 / 수정 가능"을 구분해요!`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2 — 파티 관리 코드!",
          content: `vector로 파티를 관리하고, 파티를 표시하는 코드를 만들어봐요!`,
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

    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};

void showParty(const vector<Character>& party) {
    if (party.empty()) {
        cout << "파티가 비어있어요!" << endl;
        return;
    }
    cout << "=== 파티 목록 (" << party.size() << "명) ===" << endl;
    for (const auto& c : party) {
        cout << "  " << c.name
             << " [HP:" << c.hp
             << " ATK:" << c.attack
             << " DEF:" << c.defense
             << " LV:" << c.level << "]" << endl;
    }
}

int main() {
    vector<Character> party;
    party.emplace_back("용사", 100, 15, 10);
    party.emplace_back("마법사", 80, 20, 5);

    showParty(party);

    // 새 캐릭터 추가
    party.emplace_back("궁수", 90, 18, 8);
    cout << "궁수가 파티에 합류했어요!" << endl;

    showParty(party);
    return 0;
}`,
          expectedOutput: `=== 파티 목록 (2명) ===
  용사 [HP:100 ATK:15 DEF:10 LV:1]
  마법사 [HP:80 ATK:20 DEF:5 LV:1]
궁수가 파티에 합류했어요!
=== 파티 목록 (3명) ===
  용사 [HP:100 ATK:15 DEF:10 LV:1]
  마법사 [HP:80 ATK:20 DEF:5 LV:1]
  궁수 [HP:90 ATK:18 DEF:8 LV:1]`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "파티 크기 예측!",
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Character {
public:
    string name;
    int hp, attack, defense, level;
    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};

int main() {
    vector<Character> party;
    party.emplace_back("용사", 100, 15, 10);
    party.emplace_back("마법사", 80, 20, 5);
    party.emplace_back("궁수", 90, 18, 8);
    party.pop_back();
    party.emplace_back("힐러", 70, 8, 12);
    party.emplace_back("도적", 85, 22, 6);
    cout << party.size();
    return 0;
}`,
          options: ["3", "4", "5", "에러"],
          answer: 1,
          explanation: "처음 3명 → pop_back()으로 궁수 제거 → 2명 → 힐러 추가 → 3명 → 도적 추가 → 4명! party.size()는 4예요."
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🔨 Step 3 — 전투 시스템!",
          content: `이제 가장 재미있는 부분! **전투 시스템**을 만들어요!

**랜덤 몬스터 생성:**
\`\`\`cpp
#include <cstdlib>  // rand(), srand()
#include <ctime>    // time()

// main()에서 한 번만 호출
srand(time(0));

// 랜덤 몬스터
int monsterHp = 30 + rand() % 71;      // 30~100
int monsterAtk = 5 + rand() % 16;      // 5~20
\`\`\`

파이썬의 \`random.randint(30, 100)\`과 비슷해요!

**데미지 계산:**
\`\`\`cpp
int damage = attacker.attack - target_defense;
if (damage < 1) damage = 1;  // 최소 1 데미지
\`\`\`

**레벨업:**
\`\`\`cpp
void levelUp(Character& c) {  // &로 직접 수정!
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " 레벨 업! LV " << c.level << "!" << endl;
}
\`\`\`

\`Character& c\`로 받아야 **원본 캐릭터**가 수정돼요! \`&\` 없으면 복사본만 바뀌고 끝이에요.

💡 함수에서 class 객체를 수정하려면 반드시 **참조(&)**를 써야 해요!`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ Step 3 — 전체 RPG 프로그램!",
          content: `드디어 전체 프로그램 완성! class, vector, range-for, 참조, 함수가 모두 들어가 있어요.

메뉴에서 1~4를 선택하면 캐릭터 추가, 파티 보기, 전투, 종료가 동작해요!`,
          code: `#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;

    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
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
        cout << "파티가 비어있어요!" << endl;
        return;
    }
    cout << "=== 파티 목록 (" << party.size() << "명) ===" << endl;
    for (const auto& c : party) {
        printCharacter(c);
    }
}

void addCharacter(vector<Character>& party) {
    string name;
    int hp, atk, def;
    cout << "이름: "; cin >> name;
    cout << "HP: "; cin >> hp;
    cout << "공격력: "; cin >> atk;
    cout << "방어력: "; cin >> def;
    party.emplace_back(name, hp, atk, def);
    cout << name << "이(가) 파티에 합류했어요!" << endl;
}

void levelUp(Character& c) {
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " 레벨 업! LV " << c.level << "!" << endl;
}

void battle(vector<Character>& party) {
    if (party.empty()) {
        cout << "파티에 캐릭터가 없어요!" << endl;
        return;
    }

    string monsters[] = {"슬라임", "고블린", "오크", "드래곤", "해골병사"};
    string monsterName = monsters[rand() % 5];
    int monsterHp = 30 + rand() % 71;
    int monsterAtk = 5 + rand() % 16;
    int monsterDef = 3 + rand() % 10;

    cout << endl;
    cout << "=== 몬스터 출현! ===" << endl;
    cout << monsterName << " [HP:" << monsterHp
         << " ATK:" << monsterAtk
         << " DEF:" << monsterDef << "]" << endl;

    cout << "누구를 보낼까요?" << endl;
    for (int i = 0; i < (int)party.size(); i++) {
        cout << i + 1 << ". " << party[i].name << endl;
    }
    int choice;
    cin >> choice;
    choice--;

    if (choice < 0 || choice >= (int)party.size()) {
        cout << "잘못된 선택이에요!" << endl;
        return;
    }

    Character& hero = party[choice];
    cout << endl;
    cout << hero.name << " vs " << monsterName << " 전투 시작!" << endl;

    int heroHp = hero.hp;

    while (heroHp > 0 && monsterHp > 0) {
        int dmg = hero.attack - monsterDef + (rand() % 5);
        if (dmg < 1) dmg = 1;
        monsterHp -= dmg;
        cout << hero.name << "의 공격! " << dmg << " 데미지!" << endl;

        if (monsterHp <= 0) {
            cout << monsterName << "을(를) 물리쳤어요!" << endl;
            levelUp(hero);
            return;
        }

        dmg = monsterAtk - hero.defense + (rand() % 5);
        if (dmg < 1) dmg = 1;
        heroHp -= dmg;
        cout << monsterName << "의 공격! " << dmg << " 데미지!" << endl;
        cout << hero.name << " 남은 HP: " << heroHp << endl;
    }

    cout << hero.name << "이(가) 쓰러졌어요..." << endl;
    hero.hp = hero.hp / 2;
    cout << hero.name << "의 HP가 " << hero.hp << "로 줄었어요." << endl;
}

int main() {
    srand(time(0));

    vector<Character> party;
    party.emplace_back("용사", 100, 15, 10);
    party.emplace_back("마법사", 80, 20, 5);

    int choice;
    while (true) {
        cout << endl;
        cout << "=== RPG 파티 관리 ===" << endl;
        cout << "1. 캐릭터 추가" << endl;
        cout << "2. 파티 보기" << endl;
        cout << "3. 전투!" << endl;
        cout << "4. 종료" << endl;
        cout << "선택: ";
        cin >> choice;
        cout << endl;

        if (choice == 1) {
            addCharacter(party);
        } else if (choice == 2) {
            showParty(party);
        } else if (choice == 3) {
            battle(party);
        } else if (choice == 4) {
            cout << "모험을 종료합니다. 안녕!" << endl;
            break;
        } else {
            cout << "1~4 중에서 골라주세요!" << endl;
        }
    }
    return 0;
}`,
          stdin: `2\n4`,
          expectedOutput: `
=== RPG 파티 관리 ===
1. 캐릭터 추가
2. 파티 보기
3. 전투!
4. 종료
선택: 2

=== 파티 목록 (2명) ===
  용사 [HP:100 ATK:15 DEF:10 LV:1]
  마법사 [HP:80 ATK:20 DEF:5 LV:1]

=== RPG 파티 관리 ===
1. 캐릭터 추가
2. 파티 보기
3. 전투!
4. 종료
선택: 4

모험을 종료합니다. 안녕!`
        }
      ]
    },
    // ============================================
    // Chapter 3: 완성 & 도전
    // ============================================
    {
      id: "ch3",
      title: "완성 & 도전",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-exp1",
          type: "explain",
          title: "🐍 파이썬 vs C++ 비교!",
          content: `같은 프로그램을 파이썬으로 만든다면 어떨까요?

**파이썬 버전 핵심 코드:**
\`\`\`python
class Character:
    def __init__(self, name, hp, atk, defense, level=1):
        self.name = name
        self.hp = hp
        self.attack = atk
        self.defense = defense
        self.level = level

party = []
party.append(Character("용사", 100, 15, 10))

for c in party:
    print(f"{c.name} [HP:{c.hp}]")
\`\`\`

**비교표:**

| 개념 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 데이터 묶기 | \`class Character:\` | \`class Character { };\` |
| 생성 | \`Character("용사", 100, ...)\` | \`Character("용사", 100, ...)\` |
| 목록 | \`party = []\` | \`vector<Character> party;\` |
| 추가 | \`party.append(c)\` | \`party.emplace_back(...);\` |
| 순회 | \`for c in party:\` | \`for (const auto& c : party)\` |
| 수정 전달 | 자동 (reference) | \`Character&\` 명시 필요 |
| 읽기 전달 | 자동 | \`const Character&\` |
| 타입 안전 | 런타임 에러 | **컴파일 에러 (더 안전!)** |

C++이 더 많이 쓰지만, 그만큼 **더 안전하고 더 빨라요**!

💡 파이썬에서 자동으로 해주던 것들을 C++에서는 직접 관리해요. 대신 성능과 안전성을 얻어요!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "const 참조 이해!",
          content: `showParty 함수에서 \`const vector<Character>&\`를 쓰는 이유로 **틀린** 것은?

\`\`\`cpp
void showParty(const vector<Character>& party) {
    for (const auto& c : party) { ... }
}
\`\`\``,
          options: [
            "vector를 복사하지 않아서 효율적이다",
            "함수 안에서 실수로 party를 수정하는 걸 막아준다",
            "const를 빼면 컴파일 에러가 난다",
            "큰 데이터를 참조로 전달하는 것이 좋은 습관이다"
          ],
          answer: 2,
          explanation: "const를 빼도 컴파일 에러는 안 나요! 하지만 const를 붙이면 실수로 수정하는 걸 방지할 수 있어서 좋은 습관이에요."
        },
        {
          id: "ch3-exp2",
          type: "explain",
          title: "🚀 도전 과제!",
          content: `RPG 관리 프로그램을 더 발전시켜 보세요!

**도전 1: 아이템 시스템**
\`\`\`cpp
class Item {
public:
    string name;
    int hpBoost;
    int atkBoost;
    Item(string n, int hp, int atk) : name(n), hpBoost(hp), atkBoost(atk) {}
};

class Character {
public:
    string name;
    int hp, attack, defense, level;
    vector<Item> inventory;  // class 안에 vector!
    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
};
\`\`\`

**도전 2: 파일 세이브/로드**
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

**도전 3: 다중 전투**
- 파티원 전체가 차례대로 싸우기
- 보스 몬스터 (HP 300 이상!)
- 힐러 캐릭터가 파티원 회복

**도전 4: private으로 캡슐화**
\`\`\`cpp
class Character {
private:
    string name;
    int hp, attack, defense, level;
public:
    Character(string n, int h, int a, int d)
        : name(n), hp(h), attack(a), defense(d), level(1) {}
    void takeDamage(int dmg) { if (dmg > 0) hp -= dmg; }
    void levelUp() { level++; hp += 10; attack += 3; }
    string getName() const { return name; }
    int getHp() const { return hp; }
};
\`\`\`

💡 이 도전 과제들은 Part 3에서 배울 내용과 연결돼요!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 Part 2 프로젝트 완성!",
          content: `## ✅ 이 프로젝트에서 활용한 것들!

- ✅ **class** — 캐릭터 데이터를 하나의 타입으로 묶기 + 생성자
- ✅ **vector** — 파티 관리 (emplace_back, size, empty)
- ✅ **range-for + auto** — \`for (const auto& c : party)\`
- ✅ **const 참조** — 읽기 전용 전달 \`const Character&\`
- ✅ **참조** — 수정용 전달 \`Character&\`, \`vector<Character>&\`
- ✅ **함수 분리** — showParty, addCharacter, battle, levelUp
- ✅ **string** — 캐릭터 이름, 몬스터 이름

Part 2의 핵심을 전부 활용한 프로젝트를 완성했어요!

class로 데이터를 묶고, vector로 관리하고, 함수로 기능을 나누는 패턴은 C++ 프로그래밍에서 **정말 많이** 쓰여요. 이 패턴을 기억해두세요!

🎮 여러분만의 RPG를 더 발전시켜 보세요!`
        }
      ]
    }
  ]
}
