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
          title: "⚔️ 프로젝트 소개",
          content: `이번 프로젝트에서는 Part 2에서 배운 것들만 써서 RPG 파티 관리 프로그램을 만들어요.

**이 프로젝트에서 쓰는 개념들:**

| 레슨 | 개념 | 어디서 쓰나요? |
|---|---|---|
| 레슨 9 | vector, push_back | 파티 & 인벤토리 관리 |
| 레슨 11 | range-for, auto | 파티/인벤토리 출력 |
| 레슨 12 | string 심화 | 레벨 텍스트, 아이템 검색 |
| 레슨 13 | 참조(&) | 캐릭터 레벨업·장착 함수 |
| 레슨 15 | struct | Item(아이템) 타입 만들기 |
| 레슨 16 | class, 생성자 | Character 타입 만들기 |

새로운 문법은 없어요. 배운 것들을 조합하는 연습이에요!

완성하면 이런 프로그램이 돼요:

\`\`\`
=== 파티 현황 ===
  용사   [HP:100 ATK:15 DEF:10 LV:1]
  마법사 [HP:80  ATK:20 DEF:5  LV:1]

=== 전투 결과 ===
용사 vs 슬라임
용사의 공격! 7 데미지
슬라임 HP: 43
슬라임의 반격! 3 데미지
용사 승리! 레벨 업! LV 2
\`\`\``
        },
        {
          id: "ch1-exp2",
          type: "explain",
          title: "📋 Character class 설계",
          content: `RPG 캐릭터에 필요한 정보를 class로 만들어요. (레슨 16)

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
        level = 1;  // 레벨은 항상 1로 시작
    }
};
\`\`\`

생성자 덕분에 이렇게 만들 수 있어요:

\`\`\`cpp
Character hero("용사", 100, 15, 10);
cout << hero.name;   // 용사
cout << hero.hp;     // 100
cout << hero.level;  // 1
\`\`\`

💡 레슨 16에서 배운 것처럼 class는 dict보다 안전해요 — 오타를 치면 컴파일 에러로 바로 잡아줘요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "Character class 완성하기",
          content: "빈칸을 채워서 Character class를 완성해봐요.",
          code: "___ Character {\n___:\n    string name;\n    int hp;\n    int attack;\n    int defense;\n    int level;\n    Character(string n, int h, int a, int d) {\n        name = n; hp = h; attack = a; defense = d; level = 1;\n    }\n};",
          fillBlanks: [
            { id: 0, answer: "class", options: ["class", "struct", "type", "object"] },
            { id: 1, answer: "public", options: ["public", "private", "protected", "open"] }
          ],
          explanation: "class로 선언하고, 멤버와 생성자를 외부에서 쓸 수 있게 public:으로 명시해요!"
        },
        {
          id: "ch1-exp3",
          type: "explain",
          title: "🗡️ struct Item 설계 + string 심화",
          content: `캐릭터가 아이템을 가질 수 있도록 **struct**로 아이템 타입을 만들어요. (레슨 15)

\`\`\`cpp
struct Item {
    string name;    // 아이템 이름
    int atkBonus;   // 공격력 보너스
    int hpBonus;    // 체력 보너스
};
\`\`\`

struct는 class보다 단순해요 — 데이터만 묶고 싶을 때 써요:

\`\`\`cpp
Item sword = {"철검", 5, 0};
Item potion = {"체력 물약", 0, 30};

cout << sword.name;      // 철검
cout << sword.atkBonus;  // 5
\`\`\`

---

아이템 이름을 출력할 때 **string 심화** (레슨 12)도 써볼게요:

\`\`\`cpp
// to_string(): 숫자 → 문자열
string info = sword.name + " (ATK+" + to_string(sword.atkBonus) + ")";
cout << info;   // 철검 (ATK+5)

// find(): 이름에 "검"이 포함되는지 확인
if (sword.name.find("검") != string::npos) {
    cout << "무기 아이템이에요!";
}

// length(): 이름 길이
cout << sword.name.length();  // 2
\`\`\`

💡 \`string::npos\`는 "찾지 못했음"을 뜻해요. \`find()\`가 이 값을 반환하면 없는 거예요.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "생성자 확인!",
          content: `\`Character hero("용사", 100, 15, 10)\`으로 만들면 \`hero.level\`의 값은?

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
          options: ["0", "1", "10", "컴파일 오류"],
          answer: 1,
          explanation: "생성자에서 level = 1로 설정하기 때문에 항상 1로 시작해요. 인자로 전달하지 않아도 자동으로 설정돼요."
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
          title: "🔨 Step 1 — 캐릭터 출력 함수",
          content: `캐릭터 정보를 출력하는 함수를 만들어요. (레슨 13 — 참조)

\`\`\`cpp
void printCharacter(const Character& c) {
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " LV:" << c.level << "]" << endl;
}
\`\`\`

\`const Character& c\`에서:
- \`&\` → 복사하지 않고 **참조**로 전달해요 (레슨 13)
- \`const\` → 함수 안에서 캐릭터를 **수정하지 않겠다**는 표시

💡 읽기만 하는 함수 → \`const 타입&\`, 수정하는 함수 → \`타입&\``
        },
        {
          id: "ch2-prac1",
          type: "practice" as const,
          title: "✋ Step 1 실습 — 캐릭터 만들고 출력!",
          content: `Character 클래스를 정의하고, 두 캐릭터를 만들어 출력해봐요.`,
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
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " LV:" << c.level << "]" << endl;
}

int main() {
    Character hero("용사", 100, 15, 10);
    Character mage("마법사", 80, 20, 5);

    printCharacter(hero);
    printCharacter(mage);

    return 0;
}`,
          expectedOutput: `용사 [HP:100 ATK:15 DEF:10 LV:1]
마법사 [HP:80 ATK:20 DEF:5 LV:1]`
        },
        {
          id: "ch2-exp2",
          type: "explain",
          title: "🔨 Step 2 — vector로 파티 관리",
          content: `여러 캐릭터를 **vector**로 관리해요. (레슨 9)

\`\`\`cpp
vector<Character> party;

// 캐릭터 추가 — push_back에 생성자 호출을 바로 넣어요
party.push_back(Character("용사", 100, 15, 10));
party.push_back(Character("마법사", 80, 20, 5));
\`\`\`

파티 전체 출력은 **range-for**로! (레슨 11)

\`\`\`cpp
void showParty(const vector<Character>& party) {
    cout << "=== 파티 현황 ===" << endl;
    for (const auto& c : party) {   // 레슨 11 range-for
        printCharacter(c);
    }
}
\`\`\`

여기서 \`const vector<Character>&\`:
- \`&\` → vector 전체를 복사하지 않아요 (레슨 13)
- \`const\` → 파티 목록을 수정하지 않겠다는 표시`
        },
        {
          id: "ch2-prac2",
          type: "practice" as const,
          title: "✋ Step 2 실습 — 파티 목록 출력!",
          content: `vector로 파티를 만들고, 캐릭터를 추가한 뒤 목록을 출력해봐요.`,
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
    cout << "=== 파티 현황 (" << party.size() << "명) ===" << endl;
    for (const auto& c : party) {
        printCharacter(c);
    }
}

int main() {
    vector<Character> party;
    party.push_back(Character("용사", 100, 15, 10));
    party.push_back(Character("마법사", 80, 20, 5));

    showParty(party);

    party.push_back(Character("궁수", 90, 18, 8));
    cout << "궁수가 합류했어요!" << endl;

    showParty(party);
    return 0;
}`,
          expectedOutput: `=== 파티 현황 (2명) ===
용사 [HP:100 ATK:15 DEF:10 LV:1]
마법사 [HP:80 ATK:20 DEF:5 LV:1]
궁수가 합류했어요!
=== 파티 현황 (3명) ===
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
    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};

int main() {
    vector<Character> party;
    party.push_back(Character("용사", 100, 15, 10));
    party.push_back(Character("마법사", 80, 20, 5));
    party.push_back(Character("궁수", 90, 18, 8));
    party.pop_back();
    party.push_back(Character("힐러", 70, 8, 12));
    party.push_back(Character("도적", 85, 22, 6));
    cout << party.size();
    return 0;
}`,
          options: ["3", "4", "5", "에러"],
          answer: 1,
          explanation: "3명 추가 → pop_back()으로 궁수 제거 → 2명 → 힐러 추가 → 3명 → 도적 추가 → 4명! party.size()는 4예요."
        },
        {
          id: "ch2-exp-item",
          type: "explain",
          title: "🗡️ Step 3 — 아이템 장착 시스템",
          content: `Character 클래스에 **인벤토리**를 추가해요. (레슨 9 vector + 레슨 15 struct 조합)

\`\`\`cpp
class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;
    vector<Item> inventory;   // struct의 vector! (레슨 9)

    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};
\`\`\`

아이템 장착 함수는 **참조(&)** 로 캐릭터를 직접 수정해요: (레슨 13)

\`\`\`cpp
void equip(Character& c, Item item) {
    c.attack += item.atkBonus;
    c.hp += item.hpBonus;
    c.inventory.push_back(item);   // 인벤토리에 추가
    cout << c.name << "이(가) " << item.name << "을(를) 장착했어요!" << endl;
}
\`\`\`

인벤토리 출력도 range-for로: (레슨 11)

\`\`\`cpp
void showInventory(const Character& c) {
    cout << c.name << "의 인벤토리:" << endl;
    for (const auto& item : c.inventory) {
        // to_string()으로 숫자를 문자열로 변환 (레슨 12)
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
          title: "✋ Step 3 실습 — 아이템 만들고 장착!",
          content: `struct Item을 만들고, 캐릭터에 장착해서 스탯이 오르는지 확인해봐요.`,
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
    cout << c.name << "이(가) " << item.name << " 장착!" << endl;
}

void showInventory(const Character& c) {
    cout << c.name << "의 인벤토리 (" << c.inventory.size() << "개):" << endl;
    for (const auto& item : c.inventory) {
        string info = item.name + " (ATK+" + to_string(item.atkBonus)
                    + " HP+" + to_string(item.hpBonus) + ")";
        cout << "  " << info << endl;
    }
    cout << "현재 스탯 — ATK:" << c.attack << " HP:" << c.hp << endl;
}

int main() {
    Character hero("용사", 100, 15, 10);

    Item sword = {"철검", 5, 0};
    Item armor = {"가죽 갑옷", 0, 20};

    equip(hero, sword);
    equip(hero, armor);
    showInventory(hero);

    return 0;
}`,
          expectedOutput: `용사이(가) 철검 장착!
용사이(가) 가죽 갑옷 장착!
용사의 인벤토리 (2개):
  철검 (ATK+5 HP+0)
  가죽 갑옷 (ATK+0 HP+20)
현재 스탯 — ATK:20 HP:120`
        },
        {
          id: "ch2-exp3",
          type: "explain",
          title: "🔨 Step 4 — 레벨업 함수 (참조로 수정)",
          content: `전투에서 이기면 캐릭터가 강해져야 해요. **참조(&)**로 원본을 직접 수정해요. (레슨 13)

\`\`\`cpp
void levelUp(Character& c) {   // & → 원본을 수정해요!
    c.level++;
    c.hp += 10;
    c.attack += 3;
    c.defense += 2;
    cout << c.name << " 레벨 업! LV " << c.level << endl;
}
\`\`\`

\`&\`가 없으면 **복사본**만 바뀌고 원본은 그대로예요:

\`\`\`cpp
void levelUp(Character c) {    // & 없음 → 복사본만 바뀜!
    c.level++;  // 원본 파티에는 반영 안 됨!
}
\`\`\`

💡 함수에서 class 객체를 수정하려면 반드시 \`&\`를 써야 해요!`
        },
        {
          id: "ch2-exp4",
          type: "explain",
          title: "🔨 Step 4 — 전투 시스템",
          content: `이제 전투를 만들어요. 데미지 계산만 있는 간단한 구조예요.

\`\`\`cpp
void battle(Character& hero) {
    // 몬스터 정보 (고정값)
    string monsterName = "슬라임";
    int monsterHp = 50;
    int monsterAtk = 8;
    int monsterDef = 3;

    cout << hero.name << " vs " << monsterName << "!" << endl;

    // 데미지 계산: 공격력 - 상대방 방어력 (최소 1)
    int heroDmg = hero.attack - monsterDef;
    if (heroDmg < 1) heroDmg = 1;

    int monsterDmg = monsterAtk - hero.defense;
    if (monsterDmg < 1) monsterDmg = 1;

    monsterHp -= heroDmg;
    cout << hero.name << "의 공격! " << heroDmg << " 데미지" << endl;

    if (monsterHp <= 0) {
        cout << monsterName << "을 물리쳤어요!" << endl;
        levelUp(hero);   // 레벨업! (참조로 전달)
    } else {
        hero.hp -= monsterDmg;
        cout << monsterName << "의 반격! " << monsterDmg << " 데미지" << endl;
        cout << hero.name << " HP: " << hero.hp << endl;
    }
}
\`\`\`

\`Character& hero\`로 받아서 레벨업 결과가 파티에 바로 반영돼요.`
        },
        {
          id: "ch2-prac3",
          type: "practice" as const,
          title: "✋ 완성 — 전체 RPG 프로그램!",
          content: `struct, class, vector, range-for, 참조, string 심화가 모두 들어간 완성 프로그램이에요.

메뉴에서 1~5를 입력해서 실행해봐요!`,
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// ── struct: 레슨 15 ───────────────────────────
struct Item {
    string name;
    int atkBonus;
    int hpBonus;
};

// ── class: 레슨 16 ────────────────────────────
class Character {
public:
    string name;
    int hp;
    int attack;
    int defense;
    int level;
    vector<Item> inventory;   // vector 안에 struct: 레슨 9

    Character(string n, int h, int a, int d) {
        name = n; hp = h; attack = a; defense = d; level = 1;
    }
};

// ── const 참조로 읽기: 레슨 13 ────────────────
void printCharacter(const Character& c) {
    // to_string(): 레슨 12
    string lvInfo = "LV" + to_string(c.level);
    cout << c.name << " [HP:" << c.hp
         << " ATK:" << c.attack
         << " DEF:" << c.defense
         << " " << lvInfo << "]" << endl;
}

void showParty(const vector<Character>& party) {
    cout << "=== 파티 현황 (" << party.size() << "명) ===" << endl;
    for (const auto& c : party) {   // range-for: 레슨 11
        printCharacter(c);
    }
}

// ── 참조로 수정: 레슨 13 ──────────────────────
void equip(Character& c, Item item) {
    c.attack += item.atkBonus;
    c.hp += item.hpBonus;
    c.inventory.push_back(item);
    cout << c.name << "이(가) " << item.name << " 장착!" << endl;
}

void showInventory(const Character& c) {
    if (c.inventory.empty()) {
        cout << c.name << "의 인벤토리가 비어있어요." << endl;
        return;
    }
    cout << c.name << "의 인벤토리:" << endl;
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
    cout << c.name << " 레벨 업! LV" << c.level << endl;
}

void battle(Character& hero) {
    string monsterName = "슬라임";
    int monsterHp = 50;
    int monsterAtk = 8;
    int monsterDef = 3;

    cout << hero.name << " vs " << monsterName << "!" << endl;

    int heroDmg = hero.attack - monsterDef;
    if (heroDmg < 1) heroDmg = 1;

    int monsterDmg = monsterAtk - hero.defense;
    if (monsterDmg < 1) monsterDmg = 1;

    monsterHp -= heroDmg;
    cout << hero.name << "의 공격! " << heroDmg << " 데미지" << endl;

    if (monsterHp <= 0) {
        cout << monsterName << "을 물리쳤어요!" << endl;
        levelUp(hero);
    } else {
        hero.hp -= monsterDmg;
        cout << monsterName << "의 반격! " << monsterDmg << " 데미지" << endl;
        cout << hero.name << " HP: " << hero.hp << endl;
    }
}

int main() {
    vector<Character> party;
    party.push_back(Character("용사", 100, 15, 10));
    party.push_back(Character("마법사", 80, 20, 5));

    // 시작 아이템
    Item sword = {"철검", 5, 0};
    equip(party[0], sword);

    int choice;
    while (true) {
        cout << endl;
        cout << "=== RPG 파티 관리 ===" << endl;
        cout << "1. 파티 보기" << endl;
        cout << "2. 용사 전투" << endl;
        cout << "3. 마법사 전투" << endl;
        cout << "4. 용사 인벤토리" << endl;
        cout << "5. 종료" << endl;
        cout << "선택: ";
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
            cout << "모험을 종료합니다!" << endl;
            break;
        } else {
            cout << "1~5 중에서 골라주세요!" << endl;
        }
    }
    return 0;
}`,
          stdin: `1\n4\n2\n1\n5`,
          expectedOutput: `용사이(가) 철검 장착!

=== RPG 파티 관리 ===
1. 파티 보기
2. 용사 전투
3. 마법사 전투
4. 용사 인벤토리
5. 종료
선택: 1
=== 파티 현황 (2명) ===
용사 [HP:100 ATK:20 DEF:10 LV1]
마법사 [HP:80 ATK:20 DEF:5 LV1]

=== RPG 파티 관리 ===
1. 파티 보기
2. 용사 전투
3. 마법사 전투
4. 용사 인벤토리
5. 종료
선택: 4
용사의 인벤토리:
  철검 (ATK+5 HP+0)

=== RPG 파티 관리 ===
1. 파티 보기
2. 용사 전투
3. 마법사 전투
4. 용사 인벤토리
5. 종료
선택: 2
용사 vs 슬라임!
용사의 공격! 17 데미지
슬라임을 물리쳤어요!
용사 레벨 업! LV2

=== RPG 파티 관리 ===
1. 파티 보기
2. 용사 전투
3. 마법사 전투
4. 용사 인벤토리
5. 종료
선택: 1
=== 파티 현황 (2명) ===
용사 [HP:110 ATK:23 DEF:12 LV2]
마법사 [HP:80 ATK:20 DEF:5 LV1]

=== RPG 파티 관리 ===
1. 파티 보기
2. 용사 전투
3. 마법사 전투
4. 용사 인벤토리
5. 종료
선택: 5
모험을 종료합니다!`
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
          title: "🐍 파이썬 vs C++ 비교",
          content: `같은 프로그램을 파이썬으로 만든다면:

\`\`\`python
class Character:
    def __init__(self, name, hp, attack, defense):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.defense = defense
        self.level = 1

party = []
party.append(Character("용사", 100, 15, 10))

for c in party:
    print(f"{c.name} [HP:{c.hp}]")
\`\`\`

**비교표:**

| 개념 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 데이터 묶기 | \`class Character:\` | \`class Character { };\` |
| 생성 | \`Character("용사", ...)\` | \`Character("용사", ...)\` |
| 목록 | \`party = []\` | \`vector<Character> party;\` |
| 추가 | \`party.append(c)\` | \`party.push_back(c);\` |
| 순회 | \`for c in party:\` | \`for (const auto& c : party)\` |
| 수정 전달 | 자동 | \`Character&\` 명시 필요 |
| 읽기 전달 | 자동 | \`const Character&\` |

C++에서 \`&\`를 명시하는 게 번거로워 보여도 — 덕분에 **언제 복사가 일어나는지** 코드만 봐도 바로 알 수 있어요!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "const 참조 이해!",
          content: `\`showParty\` 함수에서 \`const vector<Character>&\`를 쓰는 이유로 **틀린** 것은?

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
          title: "🚀 도전 과제",
          content: `더 발전시켜 보세요! 모두 배운 개념으로만 만들 수 있어요.

**도전 1: 캐릭터 추가 기능**
\`\`\`cpp
// 메뉴에 "캐릭터 추가" 추가하기
string name;
int hp, atk, def;
cout << "이름: "; cin >> name;
cout << "HP: "; cin >> hp;
// ...
party.push_back(Character(name, hp, atk, def));
\`\`\`

**도전 2: 전체 파티 순회 전투**
\`\`\`cpp
// range-for로 파티원 전체 레벨업
for (auto& c : party) {   // const 없이 & → 수정 가능!
    levelUp(c);
}
\`\`\`

**도전 3: 최강 캐릭터 찾기**
\`\`\`cpp
// 공격력이 가장 높은 캐릭터 찾기
Character best = party[0];
for (const auto& c : party) {
    if (c.attack > best.attack) {
        best = c;
    }
}
cout << "최강: " << best.name << endl;
\`\`\`

**도전 4: 인벤토리에서 무기 찾기 — string find() (레슨 12)**
\`\`\`cpp
// "검"이 이름에 포함된 아이템만 출력
for (const auto& item : hero.inventory) {
    if (item.name.find("검") != string::npos) {
        cout << "무기 발견: " << item.name << endl;
    }
}
\`\`\`

💡 도전 2에서 \`auto&\` (const 없음) vs \`const auto&\`의 차이에 주목하세요!`
        },
        {
          id: "ch3-exp3",
          type: "explain",
          title: "🎉 Part 2 프로젝트 완성!",
          content: `## ✅ 이 프로젝트에서 복습한 것들

- ✅ **struct** (레슨 15) — Item 타입 정의
- ✅ **class** (레슨 16) — Character 데이터 + 생성자
- ✅ **vector** (레슨 9) — 파티 & 인벤토리 관리, push_back, size, empty
- ✅ **range-for + auto** (레슨 11) — \`for (const auto& c : party)\`
- ✅ **string 심화** (레슨 12) — \`to_string()\`, \`find()\`
- ✅ **const 참조** (레슨 13) — 읽기 전용 전달 \`const Character&\`
- ✅ **참조** (레슨 13) — 수정용 전달 \`Character&\`

class로 데이터를 묶고, vector로 관리하고, 참조로 효율적으로 전달하는 패턴 — 앞으로 C++ 코드에서 정말 많이 나와요!`
        }
      ]
    }
  ]
}
