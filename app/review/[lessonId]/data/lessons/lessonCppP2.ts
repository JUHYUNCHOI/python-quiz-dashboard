import { LessonData } from '../types';

export const lessonCppP2: LessonData = {
    id: "cpp-p2",
    title: "RPG 캐릭터 관리 프로젝트 복습",
    description: "RPG 캐릭터 관리의 핵심 개념 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 구조체 & 벡터 복습 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "구조체 & 벡터 복습",
          desc: "struct, vector, 함수를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "RPG 캐릭터는 이름, HP, 공격력 등 여러 정보가 있어요!",
            "struct로 캐릭터 구조를 만들 수 있어요."
          ],
          code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Character {\n    string name;\n    int hp;\n    int atk;\n    int level;\n};',
          note: "struct = 여러 변수를 하나로 묶는 커스텀 타입!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "struct로 캐릭터를 만들고 멤버에 접근해봐요!",
            ". (점) 연산자로 멤버에 접근해요."
          ],
          code: 'Character hero;\nhero.name = "전사";\nhero.hp = 100;\nhero.atk = 25;\nhero.level = 1;\n\ncout << hero.name << " HP: " << hero.hp << "\\n";',
          predict: {
            question: "출력 결과는?",
            options: ["전사 100", "전사 HP: 100", "hero HP: 100"],
            answer: 1,
            feedback: "hero.name은 \"전사\", hero.hp는 100이에요!"
          }
        }
      },

      // Lv.1: struct 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "캐릭터 구조체를 선언해요!",
          guide: "struct 키워드로 시작!",
          template: "___ Character {\n    string name;\n    int hp;\n};",
          answer: "struct",
          expect: "struct Character {\n    string name;\n    int hp;\n};"
        }
      },

      // 퀴즈: 멤버 접근
      {
        type: "quiz",
        content: {
          question: "구조체의 멤버에 접근할 때 쓰는 연산자는?",
          options: ["->", ".", "::", "#"],
          answer: 1,
          explanation: ". (점) 연산자로 멤버에 접근해요! hero.name, hero.hp 이런 식으로!"
        }
      },

      // 벡터 설명
      {
        type: "explain",
        content: {
          lines: [
            "여러 캐릭터를 관리하려면 vector를 써요!",
            "vector<Character>로 캐릭터 목록을 만들 수 있어요."
          ],
          code: 'vector<Character> party;\n\nCharacter warrior = {"전사", 100, 25, 1};\nCharacter mage = {"마법사", 60, 40, 1};\n\nparty.push_back(warrior);\nparty.push_back(mage);\n\ncout << "파티원 수: " << party.size() << "\\n";',
          result: "파티원 수: 2",
          note: "push_back으로 추가, size()로 개수 확인!"
        }
      },

      // Lv.1: push_back 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "파티에 캐릭터를 추가해요!",
          guide: "push_back으로 벡터에 추가!",
          template: "party.___(warrior);",
          answer: "push_back",
          expect: "party.push_back(warrior);"
        }
      },

      // Lv.2: 벡터 순회 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "모든 캐릭터의 이름을 출력해요!",
          guide: "for 루프로 벡터를 순회!",
          template: "for (int i = 0; i < party.___(); i++) {\n    cout << party[i].___ << \"\\n\";\n}",
          answer: "size",
          blanksAnswer: ["size", "name"],
          expect: "for (int i = 0; i < party.size(); i++) {\n    cout << party[i].name << \"\\n\";\n}"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'struct Character {\n    string name;\n    int hp;\n}\n\nint main() {\n    Character hero;\n}',
          options: [
            "struct 뒤에 세미콜론(;)이 빠졌어요",
            "string을 쓸 수 없어요",
            "hero를 초기화하지 않아서 에러"
          ],
          answer: 0,
          explanation: "C++에서 struct 정의 끝에는 반드시 세미콜론(;)이 필요해요! }; 이렇게!"
        }
      },

      // 함수 설명
      {
        type: "explain",
        content: {
          lines: [
            "캐릭터 정보를 출력하는 함수를 만들어요!",
            "struct를 매개변수로 받을 수 있어요."
          ],
          code: 'void showCharacter(Character c) {\n    cout << "=== " << c.name << " ===" << "\\n";\n    cout << "HP: " << c.hp << "\\n";\n    cout << "ATK: " << c.atk << "\\n";\n    cout << "Lv: " << c.level << "\\n";\n}',
          note: "함수의 매개변수로 struct를 넘길 수 있어요!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "구조체 & 벡터 복습 완료!",
          emoji: "🗡️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "구조체 & 벡터 복습",
          learned: [
            "struct — 여러 변수를 하나로 묶는 커스텀 타입",
            ". (점) 연산자로 멤버 접근",
            "vector<struct타입> — 구조체 배열",
            "push_back, size() — 추가와 크기",
            "함수에 struct를 매개변수로 넘기기"
          ],
          canDo: "struct와 vector로 캐릭터를 만들고 관리할 수 있어요!",
          emoji: "🗡️"
        }
      },

      // ==================== CHAPTER 2: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "RPG 핵심 코드",
          desc: "RPG 캐릭터 관리의 핵심 코드를 써봐요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 구조체 선언 기억나요?",
          task: "Character 구조체의 시작 부분을 써봐요!",
          template: "___ Character {",
          answer: "struct",
          expect: "struct Character {"
        }
      },

      // 종합 설명
      {
        type: "explain",
        content: {
          lines: [
            "공격 함수를 만들어서 캐릭터끼리 싸울 수 있어요!",
            "참조(&)를 쓰면 원본 HP가 깎여요."
          ],
          code: 'void attack(Character& attacker, Character& target) {\n    target.hp -= attacker.atk;\n    cout << attacker.name << "이(가) " << target.name\n         << "을 공격! (-" << attacker.atk << "HP)" << "\\n";\n    if (target.hp <= 0) {\n        cout << target.name << " 쓰러졌다!" << "\\n";\n    }\n}',
          predict: {
            question: "매개변수에 &를 쓰는 이유는?",
            options: [
              "속도가 빨라져서",
              "원본 값을 수정하기 위해서",
              "에러를 방지하기 위해서"
            ],
            answer: 1,
            feedback: "& (참조)를 쓰면 복사본이 아닌 원본을 직접 수정해요! HP가 진짜로 깎여요."
          }
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "Character 구조체를 정의해요!",
          target: "struct Character {\n    string name;\n    int hp;\n    int atk;\n    int level;\n};",
          hint: "struct Character { name, hp, atk, level };",
          done: [],
          answer: "struct Character {\n    string name;\n    int hp;\n    int atk;\n    int level;\n};"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "캐릭터 2명을 만들고 파티 벡터에 넣어요!",
          target: 'Character warrior = {"전사", 100, 25, 1};\nCharacter mage = {"마법사", 60, 40, 1};\nvector<Character> party;\nparty.push_back(warrior);\nparty.push_back(mage);',
          hint: "초기화 리스트 { } + push_back",
          done: ["struct Character { string name; int hp; int atk; int level; };"],
          answer: 'Character warrior = {"전사", 100, 25, 1};\nCharacter mage = {"마법사", 60, 40, 1};\nvector<Character> party;\nparty.push_back(warrior);\nparty.push_back(mage);'
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "공격 함수를 만들어봐요!",
          target: 'void attack(Character& a, Character& t) {\n    t.hp -= a.atk;\n    cout << a.name << " -> " << t.name << " (-" << a.atk << "HP)" << "\\n";\n}',
          hint: "void attack(Character& a, Character& t) { t.hp -= a.atk; }",
          done: ["struct Character { ... };", "Character warrior, mage + vector party"],
          answer: 'void attack(Character& a, Character& t) {\n    t.hp -= a.atk;\n    cout << a.name << " -> " << t.name << " (-" << a.atk << "HP)" << "\\n";\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "RPG 캐릭터 시스템 완성!",
          emoji: "🏆"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
