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

      // ==================== CHAPTER 2: 벡터 & 배열 심화 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "벡터 & 배열 심화",
          desc: "vector, 2D 배열, range-for를 복습해요!"
        }
      },

      // quiz 1: vector push_back
      {
        type: "quiz",
        content: {
          question: "vector에 새 원소를 맨 뒤에 추가하는 함수는?",
          options: ["push_front()", "push_back()", "insert()", "add()"],
          answer: 1,
          explanation: "push_back()으로 벡터 맨 뒤에 추가해요! push_front()는 deque/list에서 쓰고, vector에는 없어요.",
          en: {
            question: "Which function adds a new element to the back of a vector?",
            options: ["push_front()", "push_back()", "insert()", "add()"],
            explanation: "push_back() adds to the back of the vector! push_front() is for deque/list, not available in vector."
          }
        }
      },

      // predict 3: range-for
      {
        type: "explain",
        content: {
          lines: ["range-for 출력 결과를 예측해봐요!"],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {10, 20, 30};\n    for (auto x : v) {\n        cout << x << " ";\n    }\n    return 0;\n}',
          predict: {
            options: ["10 20 30 ", "10\n20\n30\n", "30 20 10 "],
            answer: 0,
            feedback: "range-for는 앞에서 뒤로 순서대로 순회해요! 각 원소 뒤에 공백이 붙어요."
          },
          en: {
            lines: ["Predict the output of the range-for!"],
            predict: {
              options: ["10 20 30 ", "10\n20\n30\n", "30 20 10 "],
              feedback: "range-for iterates from front to back in order! There's a space after each element."
            }
          }
        }
      },

      // quiz 2: auto 키워드
      {
        type: "quiz",
        content: {
          question: "range-for에서 auto를 사용하면 어떤 이점이 있나요?",
          options: [
            "코드가 더 빠르게 실행된다",
            "타입을 직접 쓰지 않아도 컴파일러가 타입을 추론한다",
            "원본 값을 자동으로 수정한다",
            "벡터 크기를 자동으로 늘려준다"
          ],
          answer: 1,
          explanation: "auto는 컴파일러가 타입을 자동으로 추론해요! vector<int>라면 auto는 int로 추론돼요.",
          en: {
            question: "What is the benefit of using auto in a range-for loop?",
            options: [
              "The code runs faster",
              "The compiler infers the type without writing it explicitly",
              "It automatically modifies the original value",
              "It automatically grows the vector size"
            ],
            explanation: "auto lets the compiler automatically infer the type! For vector<int>, auto is inferred as int."
          }
        }
      },

      // predict 4: 2D 배열
      {
        type: "explain",
        content: {
          lines: ["2D 배열 접근 결과는?"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    int grid[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n    cout << grid[1][2] << endl;\n    return 0;\n}',
          predict: {
            options: ["3", "5", "6"],
            answer: 2,
            feedback: "grid[1][2] — 1번째 행(두번째 줄 {4,5,6}), 2번째 열(세번째 원소) = 6이에요!"
          },
          en: {
            lines: ["What's the result of accessing the 2D array?"],
            predict: {
              options: ["3", "5", "6"],
              feedback: "grid[1][2] — row 1 (second row {4,5,6}), column 2 (third element) = 6!"
            }
          }
        }
      },

      // practice 2: vector 초기화 + push_back
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 벡터를 만들고 10, 20, 30을 차례로 push_back 해요!",
          guide: "vector<int> v; 선언 후 push_back 세 번!",
          template: "vector<___ > v;\nv.___(10);\nv.___(20);\nv.___(30);",
          blanksAnswer: ["int", "push_back", "push_back", "push_back"],
          answer: "vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);",
          expect: "vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);",
          en: {
            task: "Create an integer vector and push_back 10, 20, 30 in order!",
            guide: "Declare vector<int> v; then call push_back three times!"
          }
        }
      },

      // practice 3: range-for 순회
      {
        type: "practice",
        content: {
          level: 2,
          task: "range-for로 벡터의 모든 원소를 출력하는 코드를 완성해요!",
          guide: "for (auto x : v) 패턴을 써요!",
          template: 'vector<int> scores = {85, 92, 78};\nfor (___ score : scores) {\n    cout << score << "\\n";\n}',
          answer: "auto",
          expect: "85\n92\n78",
          en: {
            task: "Complete the code to print all elements of the vector using range-for!",
            guide: "Use the for (auto x : v) pattern!"
          }
        }
      },

      // ==================== CHAPTER 3: 문자열 & 포인터 & 클래스 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "문자열 & 포인터 & 클래스",
          desc: "string 메서드, 포인터, 클래스의 핵심을 복습해요!"
        }
      },

      // quiz 3: string 메서드
      {
        type: "quiz",
        content: {
          question: "string에서 특정 부분 문자열을 추출하는 메서드는?",
          options: ["slice()", "substr()", "cut()", "extract()"],
          answer: 1,
          explanation: 'substr(시작위치, 길이)로 부분 문자열을 추출해요! ex) "Hello".substr(0, 3) → "Hel"',
          en: {
            question: "Which method extracts a substring from a string?",
            options: ["slice()", "substr()", "cut()", "extract()"],
            explanation: 'Use substr(startPos, length) to extract a substring! e.g., "Hello".substr(0, 3) → "Hel"'
          }
        }
      },

      // predict 5: string substr
      {
        type: "explain",
        content: {
          lines: ["string substr 결과를 예측해봐요!"],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "RPGHero";\n    cout << s.substr(3, 4) << endl;\n    cout << s.length() << endl;\n    return 0;\n}',
          predict: {
            options: ["Hero\n7", "RPG\n7", "Hero\n4"],
            answer: 0,
            feedback: 'substr(3, 4) → 3번 인덱스부터 4글자 = "Hero". length()는 전체 길이 7이에요!'
          },
          en: {
            lines: ["Predict the result of string substr!"],
            predict: {
              options: ["Hero\n7", "RPG\n7", "Hero\n4"],
              feedback: 'substr(3, 4) → 4 chars starting at index 3 = "Hero". length() is the total length 7!'
            }
          }
        }
      },

      // predict 6: 포인터 역참조
      {
        type: "explain",
        content: {
          lines: ["포인터 코드의 출력은?"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    int hp = 100;\n    int* ptr = &hp;\n    *ptr = 50;\n    cout << hp << endl;\n    return 0;\n}',
          predict: {
            options: ["100", "50", "0"],
            answer: 1,
            feedback: "*ptr = 50 은 ptr이 가리키는 hp를 직접 50으로 바꿔요! 그래서 hp가 50이 돼요."
          },
          en: {
            lines: ["What does the pointer code output?"],
            predict: {
              options: ["100", "50", "0"],
              feedback: "*ptr = 50 directly changes hp (which ptr points to) to 50! So hp becomes 50."
            }
          }
        }
      },

      // quiz 4: 클래스 접근 제어자
      {
        type: "quiz",
        content: {
          question: "클래스에서 외부에서 직접 접근할 수 없는 멤버를 선언하는 키워드는?",
          options: ["public:", "protected:", "private:", "hidden:"],
          answer: 2,
          explanation: "private:로 선언된 멤버는 클래스 내부에서만 접근 가능해요! 외부에서 직접 접근하면 컴파일 에러가 나요.",
          en: {
            question: "Which keyword declares class members that cannot be accessed directly from outside?",
            options: ["public:", "protected:", "private:", "hidden:"],
            explanation: "Members declared with private: can only be accessed inside the class! Direct outside access causes a compile error."
          }
        }
      },

      // predict 7: 클래스 생성자 & getter
      {
        type: "explain",
        content: {
          lines: ["클래스 코드의 출력은?"],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hero {\nprivate:\n    string name;\n    int hp;\npublic:\n    Hero(string n, int h) : name(n), hp(h) {}\n    string getName() { return name; }\n    int getHp() { return hp; }\n};\n\nint main() {\n    Hero h("기사", 150);\n    cout << h.getName() << " " << h.getHp() << endl;\n    return 0;\n}',
          predict: {
            options: ["기사 150", "n 150", "Hero 150"],
            answer: 0,
            feedback: '생성자에서 name="기사", hp=150으로 초기화! getName()은 name을, getHp()는 hp를 반환해요.'
          },
          en: {
            lines: ["What does the class code output?"],
            predict: {
              options: ["기사 150", "n 150", "Hero 150"],
              feedback: 'The constructor initializes name="기사", hp=150! getName() returns name, getHp() returns hp.'
            }
          }
        }
      },

      // predict 8: 참조로 벡터 수정
      {
        type: "explain",
        content: {
          lines: ["참조(auto&) 를 사용한 range-for 결과는?"],
          code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1, 2, 3};\n    for (auto& x : v) {\n        x *= 2;\n    }\n    for (auto x : v) {\n        cout << x << " ";\n    }\n    return 0;\n}',
          predict: {
            options: ["1 2 3 ", "2 4 6 ", "2 2 2 "],
            answer: 1,
            feedback: "auto& x 는 참조라서 원본을 수정해요! 각 원소에 *2를 적용하면 2 4 6이 돼요."
          },
          en: {
            lines: ["What's the result of range-for with reference (auto&)?"],
            predict: {
              options: ["1 2 3 ", "2 4 6 ", "2 2 2 "],
              feedback: "auto& x is a reference so it modifies the original! Applying *2 to each gives 2 4 6."
            }
          }
        }
      },

      // errorQuiz 2: 포인터 역참조 실수
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    int hp = 100;\n    int* ptr;\n    cout << *ptr << endl;\n    return 0;\n}',
          options: [
            "ptr이 초기화되지 않아서 쓰레기 값(또는 크래시)이 나온다",
            "int* 선언 방법이 틀렸다",
            "cout으로 포인터를 출력할 수 없다"
          ],
          answer: 0,
          explanation: "ptr이 아무 주소도 가리키지 않는 미초기화 포인터예요! *ptr 역참조 시 미정의 동작(크래시 등)이 발생해요. int* ptr = &hp; 로 초기화해야 해요.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "ptr is uninitialized, so it gives garbage value (or crash)",
              "The int* declaration syntax is wrong",
              "You can't print a pointer with cout"
            ],
            explanation: "ptr is an uninitialized pointer pointing to no valid address! Dereferencing *ptr causes undefined behavior (crash, etc.). It should be int* ptr = &hp;"
          }
        }
      },

      // errorQuiz 3: private 멤버 직접 접근
      {
        type: "errorQuiz",
        content: {
          question: "이 코드가 컴파일 에러가 나는 이유는?",
          code: 'class Hero {\nprivate:\n    int hp = 100;\npublic:\n    int getHp() { return hp; }\n};\n\nint main() {\n    Hero h;\n    cout << h.hp << endl;\n    return 0;\n}',
          options: [
            "h.hp는 private이라 외부에서 직접 접근 불가",
            "Hero 클래스에 생성자가 없어서",
            "cout으로 int를 출력할 수 없어서"
          ],
          answer: 0,
          explanation: "hp는 private 멤버라서 클래스 외부에서 직접 접근할 수 없어요! h.getHp()처럼 public getter를 통해 접근해야 해요.",
          en: {
            question: "Why does this code cause a compile error?",
            options: [
              "h.hp is private so it can't be accessed directly from outside",
              "Because Hero class has no constructor",
              "Because cout can't print int"
            ],
            explanation: "hp is a private member, so it can't be accessed directly from outside the class! Use a public getter like h.getHp() instead."
          }
        }
      },

      // practice 4: class 빈칸 — getter 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "Hero 클래스의 getHp() getter를 완성해요!",
          guide: "public 섹션에 getter 함수를 작성해요!",
          template: 'class Hero {\n___:\n    int hp;\n___:\n    Hero(int h) : hp(h) {}\n    int ___() { return hp; }\n};',
          blanksAnswer: ["private", "public", "getHp"],
          answer: "class Hero {\nprivate:\n    int hp;\npublic:\n    Hero(int h) : hp(h) {}\n    int getHp() { return hp; }\n};",
          expect: "class Hero {\nprivate:\n    int hp;\npublic:\n    Hero(int h) : hp(h) {}\n    int getHp() { return hp; }\n};",
          en: {
            task: "Complete the getHp() getter for the Hero class!",
            guide: "Write the getter function in the public section!"
          }
        }
      },

      // practice 5: 처음부터 — 클래스 + 벡터 조합
      {
        type: "practice",
        content: {
          level: 3,
          task: '처음부터 작성! 이름(string)과 레벨(int)을 가진 Player 클래스를 만들고, 두 Player 객체를 vector에 담아 range-for로 이름과 레벨을 출력해요',
          guide: "class Player { ... }; → vector<Player> → range-for",
          hint: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Player {\npublic:\n    string name;\n    int level;\n    Player(string n, int l) : name(n), level(l) {}\n};\nint main() {\n    vector<Player> party;\n    party.push_back(Player("Alice", 5));\n    party.push_back(Player("Bob", 3));\n    for (auto p : party) {\n        cout << p.name << " " << p.level << "\\n";\n    }\n    return 0;\n}',
          template: null,
          answer: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Player {\npublic:\n    string name;\n    int level;\n    Player(string n, int l) : name(n), level(l) {}\n};\nint main() {\n    vector<Player> party;\n    party.push_back(Player("Alice", 5));\n    party.push_back(Player("Bob", 3));\n    for (auto p : party) {\n        cout << p.name << " " << p.level << "\\n";\n    }\n    return 0;\n}',
          expect: "Alice 5\nBob 3",
          en: {
            task: 'Write from scratch! Create a Player class with name (string) and level (int), put two Player objects in a vector, and print name and level using range-for',
            guide: "class Player { ... }; → vector<Player> → range-for"
          }
        }
      },

      // interleaving 1: Part 1 복습 — 반복문
      {
        type: "interleaving",
        content: {
          message: "잠깐! Part 1 반복문 기억나요?",
          task: "1부터 5까지 합산하는 for 루프를 완성해요!",
          template: "int sum = 0;\nfor (int i = ___; i <= 5; ___) {\n    sum += i;\n}\ncout << sum << endl;",
          blanksAnswer: ["1", "i++"],
          answer: "int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    sum += i;\n}\ncout << sum << endl;",
          expect: "15",
          en: {
            message: "Wait! Remember the for loop from Part 1?",
            task: "Complete the for loop that sums 1 to 5!"
          }
        }
      },

      // interleaving 2: Part 1 복습 — 조건문
      {
        type: "interleaving",
        content: {
          message: "잠깐! Part 1 조건문도 복습해요!",
          task: "score가 90 이상이면 \"A\", 아니면 \"B\"를 출력하는 if-else를 완성해요!",
          template: "int score = 95;\nif (score ___ 90) {\n    cout << \"A\" << endl;\n} ___ {\n    cout << \"B\" << endl;\n}",
          blanksAnswer: [">=", "else"],
          answer: 'int score = 95;\nif (score >= 90) {\n    cout << "A" << endl;\n} else {\n    cout << "B" << endl;\n}',
          expect: "A",
          en: {
            message: "Wait! Let's also review the if statement from Part 1!",
            task: 'Complete the if-else that prints "A" if score >= 90, otherwise "B"!'
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "Part 2 마스터!",
          emoji: "⚔️"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
