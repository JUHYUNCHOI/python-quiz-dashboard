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
          lines: [],
          code: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Character {\n    string name;\n    int hp;\n    int atk;\n    int level;\n};',
          note: "struct = 여러 변수를 하나로 묶는 커스텀 타입!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'Character hero;\nhero.name = "전사";\nhero.hp = 100;\nhero.atk = 25;\nhero.level = 1;\n\ncout << hero.name << " HP: " << hero.hp << "\\n";',
          predict: {
            question: "출력 결과는?",
            options: ["전사 100", "전사 HP: 100", "hero HP: 100"],
            answer: 1,
            feedback: "hero.name은 \"전사\", hero.hp는 100이에요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["전사 100", "전사 HP: 100", "hero HP: 100"],
              feedback: "hero.name is \"전사\" and hero.hp is 100!"
            }
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
          expect: "struct Character {\n    string name;\n    int hp;\n};",
          en: {
            task: "Declare the character struct!",
            guide: "Start with the struct keyword!"
          }
        }
      },

      // 퀴즈: 멤버 접근
      {
        type: "quiz",
        content: {
          question: "구조체의 멤버에 접근할 때 쓰는 연산자는?",
          options: ["->", ".", "::", "#"],
          answer: 1,
          explanation: ". (점) 연산자로 멤버에 접근해요! hero.name, hero.hp 이런 식으로!",
          en: {
            question: "Which operator is used to access struct members?",
            options: ["->", ".", "::", "#"],
            explanation: "Use the . (dot) operator to access members! Like hero.name, hero.hp!"
          }
        }
      },

      // 벡터 설명
      {
        type: "explain",
        content: {
          lines: [],
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
          },
          en: {
            predict: {
              question: "Why use & in the parameter?",
              options: [
                "To make it faster",
                "To modify the original value",
                "To prevent errors"
              ],
              feedback: "Using & (reference) lets you modify the original directly instead of a copy! The HP actually decreases."
            }
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
