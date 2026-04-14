import { LessonData } from '../types';

export const lessonCpp22: LessonData = {
    id: "cpp-22",
    title: "클래스 (class)",
    description: "객체지향 프로그래밍의 핵심, 클래스!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: struct vs class ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "struct vs class",
          desc: "struct와 class의 차이를 알아봐요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "cpp-14에서 struct를 배웠죠! class는 struct와 비슷하지만 한 가지 큰 차이가 있어요. 🔐",
            "struct = 기본 public (외부 접근 가능)",
            "class  = 기본 private (외부 접근 불가)"
          ],
          code: 'struct Dog {\n    string name;  // default public\n};\n\nclass Cat {\n    string name;  // default private!\n};\n\nDog d;\nd.name = "buddy";  // OK!\n\nCat c;\n// c.name = "kitty"; // error! private — cannot access',
          note: "struct = 기본 public | class = 기본 private"
        }
      },

      // struct vs class 퀴즈
      {
        type: "quiz",
        content: {
          question: "struct와 class의 가장 큰 차이는?",
          options: [
            "struct는 함수를 가질 수 없다",
            "struct는 기본 public, class는 기본 private",
            "class는 변수를 가질 수 없다",
            "struct는 C++에서 사용 불가"
          ],
          answer: 1,
          explanation: "struct는 기본 접근 제한이 public, class는 private이에요! 그 외에는 거의 동일하게 동작해요.",
          en: {
            question: "What is the biggest difference between struct and class?",
            options: [
              "struct cannot have functions",
              "struct is public by default, class is private by default",
              "class cannot have variables",
              "struct cannot be used in C++"
            ],
            explanation: "struct defaults to public access and class defaults to private! Otherwise they behave almost identically."
          }
        }
      },

      // public / private 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'class Rectangle {\npublic:\n    int width;\n    int height;\n\nprivate:\n    int secret;\n};\n\nRectangle r;\nr.width = 5;   // OK\nr.height = 3;  // OK\n// r.secret = 1; // error! private',
          predict: {
            question: "r.width = 5; 는 동작할까요?",
            options: ["동작한다 (public이라서)", "에러 (private이라서)", "에러 (width가 없어서)", "에러 (class라서)"],
            answer: 0,
            feedback: "width는 public: 아래에 있어서 외부에서 접근 가능해요!"
          },
          en: {
            predict: {
              question: "Does r.width = 5; work?",
              options: ["Yes (it's public)", "Error (it's private)", "Error (width doesn't exist)", "Error (it's a class)"],
              feedback: "width is declared under public:, so it is accessible from outside!"
            }
          }
        }
      },

      // Lv.1: public 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "멤버를 외부에서 접근 가능하게 만들어요!",
          guide: "외부 접근을 허용하는 키워드는?",
          template: "class Circle {\n___:\n    int radius;\n};",
          answer: "public",
          expect: "class Circle {\npublic:\n    int radius;\n};",
          en: {
            task: "Make a member accessible from outside the class!",
            guide: "What keyword allows external access?"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'class Player {\n    string name;  // default private!\n};\n\nPlayer p;\np.name = "alice";',
          options: [
            "name이 private이라 외부에서 접근 못 해서",
            "Player 클래스 선언이 잘못돼서",
            "string 타입을 못 써서"
          ],
          answer: 0,
          explanation: "class는 기본이 private이에요! name을 외부에서 쓰려면 public: 아래에 넣어야 해요.",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "name is private so it cannot be accessed from outside",
              "The Player class declaration is wrong",
              "string type cannot be used"
            ],
            explanation: "class defaults to private! To use name from outside, it must be declared under public:."
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "public/private 이해 완료!",
          emoji: "🔐"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "struct vs class",
          learned: [
            "struct = 기본 public / class = 기본 private",
            "public: — 외부에서 자유롭게 접근 가능",
            "private: — 클래스 안에서만 접근 가능",
            "class에서 멤버를 쓰려면 public: 아래에 선언!",
            "캡슐화(encapsulation) = 내부 구현 숨기기"
          ],
          canDo: "public/private로 클래스 멤버 접근을 제어할 수 있어요!",
          emoji: "🔐"
        }
      },

      // ==================== CHAPTER 2: 생성자와 멤버 함수 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "생성자와 멤버 함수",
          desc: "생성자와 메서드로 클래스를 풍부하게!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! class 기억나요?",
          task: "Cat 클래스의 name을 외부에서 접근 가능하게 만들어요!",
          template: "class Cat {\n___:\n    string name;\n};",
          answer: "public",
          expect: "class Cat {\npublic:\n    string name;\n};",
          en: {
            message: "Quick check! Do you remember class?",
            task: "Make the name member of the Cat class accessible from outside!"
          }
        }
      },

      // 생성자 설명
      {
        type: "explain",
        content: {
          lines: [
            "생성자(constructor)는 객체를 만들 때 자동으로 실행되는 함수예요! 🏗️",
            "파이썬의 __init__과 같아요!",
            "클래스 이름과 동일한 이름, 반환 타입 없음."
          ],
          code: 'class Character {\npublic:\n    string name;\n    int hp;\n\n    // constructor: same name as class, no return type!\n    Character(string n, int h) {\n        name = n;\n        hp = h;\n    }\n\n    void introduce() {\n        cout << name << " (HP: " << hp << ")" << endl;\n    }\n};\n\nCharacter hero("alice", 100);\nhero.introduce();',
          result: "alice (HP: 100)",
          note: "Character(string n, int h) = 생성자 (파이썬의 __init__(self, n, h))"
        }
      },

      // 생성자 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nclass Dog {\npublic:\n    string name;\n    int age;\n\n    Dog(string name, int age) {\n        this->name = name;  // this->name = member variable\n        this->age = age;    // this->age  = member variable\n    }\n\n    void bark() {\n        cout << this->name << ": woof!" << endl;\n    }\n};\n\nint main() {\n    Dog d("buddy", 3);\n    d.bark();\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["바둑이: 멍멍!", "3: 멍멍!", "name: 멍멍!", "에러"],
            answer: 0,
            feedback: "Dog d(\"바둑이\", 3)으로 name=\"바둑이\"가 저장됐고, bark()에서 this->name을 출력해요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Baduki: Woof!", "3: Woof!", "name: Woof!", "Error"],
              feedback: "Dog d(\"바둑이\", 3) stores name=\"바둑이\", and bark() prints this->name!"
            }
          }
        }
      },

      // Lv.1: 생성자 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "Circle 클래스의 생성자를 만들어요!",
          guide: "생성자 이름은 클래스 이름과 같아요!",
          template: "class Circle {\npublic:\n    int radius;\n    ___(int r) {\n        radius = r;\n    }\n};",
          answer: "Circle",
          expect: "class Circle {\npublic:\n    int radius;\n    Circle(int r) {\n        radius = r;\n    }\n};",
          en: {
            task: "Create the constructor for the Circle class!",
            guide: "The constructor name is the same as the class name!"
          }
        }
      },

      // Lv.2: this-> 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "this->를 써서 멤버 변수를 초기화해요!",
          guide: "매개변수와 멤버 변수 이름이 같을 때 현재 객체를 가리키는 키워드로 멤버를 구분해!",
          template: "class Box {\npublic:\n    int size;\n    Box(int size) {\n        ___->size = size;\n    }\n};",
          answer: "this",
          expect: "class Box {\npublic:\n    int size;\n    Box(int size) {\n        this->size = size;\n    }\n};",
          en: {
            task: "Use this-> to initialize a member variable!",
            guide: "When the parameter and member variable share the same name, use the keyword that points to the current object to distinguish the member!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "생성자의 특징은?",
          options: [
            "반환 타입이 void이다",
            "클래스 이름과 다른 이름을 쓴다",
            "객체 생성 시 자동 호출되고 반환 타입이 없다",
            "private: 아래에만 선언 가능하다"
          ],
          answer: 2,
          explanation: "생성자는 객체를 만들 때 자동 실행! 반환 타입이 아예 없어요 (void도 아님!). 파이썬의 __init__과 같아요.",
          en: {
            question: "What are the characteristics of a constructor?",
            options: [
              "Its return type is void",
              "It uses a different name from the class",
              "It is automatically called when an object is created and has no return type",
              "It can only be declared under private:"
            ],
            explanation: "A constructor is automatically called when an object is created! It has no return type at all (not even void!). Same as Python's __init__."
          }
        }
      },

      // getter/setter 설명
      {
        type: "explain",
        content: {
          lines: [
            "private 멤버에 접근하려면 getter/setter 메서드를 만들어요! 🔑",
            "getter = 값을 읽는 함수, setter = 값을 바꾸는 함수"
          ],
          code: 'class BankAccount {\nprivate:\n    int balance;  // cannot be accessed directly from outside\n\npublic:\n    BankAccount(int b) {\n        balance = b;\n    }\n\n    int getBalance() {         // getter\n        return balance;\n    }\n\n    void deposit(int amount) { // acts as setter\n        balance += amount;\n    }\n};\n\nBankAccount acc(1000);\nacc.deposit(500);\ncout << acc.getBalance() << endl;',
          result: "1500",
          note: "private 데이터는 getter/setter로만 접근 — 캡슐화의 핵심!"
        }
      },

      // Lv.2: getter 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "hp를 반환하는 getter를 완성해요!",
          guide: "getter 함수는 private 멤버 변수와 같은 타입을 반환해! hp는 어떤 타입이지?",
          template: "class Character {\nprivate:\n    int hp;\npublic:\n    Character(int h) { hp = h; }\n    ___ getHp() {\n        return hp;\n    }\n};",
          answer: "int",
          expect: "class Character {\nprivate:\n    int hp;\npublic:\n    Character(int h) { hp = h; }\n    int getHp() {\n        return hp;\n    }\n};",
          en: {
            task: "Complete the getter that returns hp!",
            guide: "A getter function returns the same type as the private member variable! What type is hp?"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "생성자와 멤버 함수 마스터!",
          emoji: "🏗️"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "생성자와 멤버 함수",
          learned: [
            "생성자 = 클래스 이름과 같은 함수, 반환 타입 없음",
            "객체 생성 시 자동 호출 (파이썬 __init__)",
            "this->멤버 = 매개변수; — 멤버 변수 구분",
            "getter: 값을 읽는 함수 (int getName())",
            "setter: 값을 바꾸는 함수 (void setName(...))"
          ],
          canDo: "생성자와 getter/setter를 만들어 클래스를 완성할 수 있어요!",
          emoji: "🏗️"
        }
      },

      // ==================== CHAPTER 3: 상속 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "상속 (Inheritance)",
          desc: "부모 클래스를 물려받아 확장해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 생성자 기억나요?",
          task: "Dog 클래스의 생성자 이름을 써봐요!",
          template: "class Dog {\npublic:\n    string name;\n    ___(string n) {\n        name = n;\n    }\n};",
          answer: "Dog",
          expect: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n};",
          en: {
            message: "Quick check! Do you remember constructors?",
            task: "Write the constructor name for the Dog class!"
          }
        }
      },

      // 상속 설명
      {
        type: "explain",
        content: {
          lines: [
            "상속(inheritance)은 부모 클래스의 멤버를 자식 클래스가 물려받는 것이에요! 👨‍👦",
            "class 자식 : public 부모 { } 형태로 써요.",
            "파이썬의 class Warrior(Character): 와 같아요!"
          ],
          code: 'class Character {\npublic:\n    string name;\n    int hp;\n\n    Character(string n, int h) {\n        name = n;\n        hp = h;\n    }\n\n    void showStatus() {\n        cout << name << " HP:" << hp << endl;\n    }\n};\n\n// Warrior inherits Character!\nclass Warrior : public Character {\npublic:\n    int attackPower;\n\n    // call parent constructor: Character(n, h)\n    Warrior(string n, int h, int atk) : Character(n, h) {\n        attackPower = atk;\n    }\n\n    void attack() {\n        cout << name << " attacks! (damage: " << attackPower << ")" << endl;\n    }\n};\n\nWarrior w("alice", 100, 30);\nw.showStatus();  // can use parent methods!\nw.attack();',
          result: "alice HP:100\nalice attacks! (damage: 30)",
          note: "Warrior(n, h, atk) : Character(n, h) = 부모 생성자 호출 (파이썬의 super().__init__)"
        }
      },

      // 상속 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    string name;\n    Animal(string n) : name(n) {}\n    void speak() {\n        cout << name << " makes a sound" << endl;\n    }\n};\n\nclass Cat : public Animal {\npublic:\n    Cat(string n) : Animal(n) {}\n    void purr() {\n        cout << name << ": meow!" << endl;\n    }\n};\n\nint main() {\n    Cat c("kitty");\n    c.speak();\n    c.purr();\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["나비 소리냄\n나비: 야옹!", "나비: 야옹!\n나비 소리냄", "나비: 야옹!", "에러"],
            answer: 0,
            feedback: "c.speak()는 부모(Animal)의 메서드, c.purr()는 자식(Cat)의 메서드예요. 부모 것도 쓸 수 있어요!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["나비 소리냄\n나비: 야옹!", "나비: 야옹!\n나비 소리냄", "나비: 야옹!", "Error"],
              feedback: "c.speak() calls the parent (Animal) method; c.purr() calls the child (Cat) method. The parent's methods are accessible too!"
            }
          }
        }
      },

      // Lv.1: 상속 선언 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "Mage 클래스가 Character를 상속받게 해요!",
          guide: "상속을 선언할 때는 클래스 이름 뒤에 콜론(:)과 접근 지정자, 부모 클래스 이름을 써!",
          template: "class Mage ___ Character {\npublic:\n    int mp;\n};",
          answer: ": public",
          expect: "class Mage : public Character {\npublic:\n    int mp;\n};",
          en: {
            task: "Make the Mage class inherit from Character!",
            guide: "To declare inheritance, write a colon (:), an access specifier, and the parent class name after the child class name!"
          }
        }
      },

      // Lv.2: 부모 생성자 호출
      {
        type: "practice",
        content: {
          level: 2,
          task: "Mage 생성자에서 부모 생성자를 호출해요!",
          guide: "자식 생성자에서 콜론(:) 뒤에 부모 클래스 이름으로 부모 생성자를 호출해 초기화해!",
          template: "class Mage : public Character {\npublic:\n    int mp;\n    Mage(string n, int h, int m) : ___(n, h) {\n        mp = m;\n    }\n};",
          answer: "Character",
          expect: "class Mage : public Character {\npublic:\n    int mp;\n    Mage(string n, int h, int m) : Character(n, h) {\n        mp = m;\n    }\n};",
          en: {
            task: "Call the parent constructor from the Mage constructor!",
            guide: "Call the parent constructor by writing the parent class name after the colon (:) in the child constructor!"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++에서 상속을 선언하는 올바른 방법은?",
          options: [
            "class Child(Parent) { }",
            "class Child extends Parent { }",
            "class Child : public Parent { }",
            "class Child inherits Parent { }"
          ],
          answer: 2,
          explanation: "C++은 class Child : public Parent { } 형태로 써요! 파이썬은 class Child(Parent):, Java는 extends를 쓰지만 C++은 콜론(:)을 써요.",
          en: {
            question: "What is the correct way to declare inheritance in C++?",
            options: [
              "class Child(Parent) { }",
              "class Child extends Parent { }",
              "class Child : public Parent { }",
              "class Child inherits Parent { }"
            ],
            explanation: "C++ uses class Child : public Parent { }! Python uses class Child(Parent):, Java uses extends, but C++ uses a colon (:)."
          }
        }
      },

      // 종합 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "Character 기본 클래스를 만들어요! (name, hp, 생성자, showStatus)",
          target: "class Character {\npublic:\n    string name;\n    int hp;\n\n    Character(string n, int h) : name(n), hp(h) {}\n\n    void showStatus() {\n        cout << name << \" HP:\" << hp << endl;\n    }\n};",
          hint: "name(n), hp(h) = 멤버 초기화 리스트 (this->name = n과 같아요)",
          done: ["#include <iostream>\nusing namespace std;\n"],
          answer: "class Character {\npublic:\n    string name;\n    int hp;\n\n    Character(string n, int h) : name(n), hp(h) {}\n\n    void showStatus() {\n        cout << name << \" HP:\" << hp << endl;\n    }\n};"
        }
      },

      // 종합 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "Warrior 클래스를 Character에서 상속해요! (attackPower 추가, attack 메서드)",
          target: "class Warrior : public Character {\npublic:\n    int attackPower;\n\n    Warrior(string n, int h, int atk) : Character(n, h) {\n        attackPower = atk;\n    }\n\n    void attack() {\n        cout << name << \" 공격! 데미지: \" << attackPower << endl;\n    }\n};",
          hint: "Warrior(n, h, atk) : Character(n, h) { } 로 부모 생성자 호출!",
          done: ["#include <iostream>\nusing namespace std;\n", "class Character {\npublic:\n    string name;\n    int hp;\n    Character(string n, int h) : name(n), hp(h) {}\n    void showStatus() { cout << name << \" HP:\" << hp << endl; }\n};"],
          answer: "class Warrior : public Character {\npublic:\n    int attackPower;\n\n    Warrior(string n, int h, int atk) : Character(n, h) {\n        attackPower = atk;\n    }\n\n    void attack() {\n        cout << name << \" 공격! 데미지: \" << attackPower << endl;\n    }\n};"
        }
      },

      // 종합 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "main에서 Warrior 객체를 만들고 showStatus와 attack을 호출해요!",
          target: "int main() {\n    Warrior w(\"철수\", 100, 30);\n    w.showStatus();\n    w.attack();\n    return 0;\n}",
          hint: "Warrior w(\"이름\", hp, attack); 로 생성 후 메서드 호출!",
          done: ["#include <iostream>\nusing namespace std;\n", "// Character, Warrior 클래스 선언 완료"],
          answer: "int main() {\n    Warrior w(\"철수\", 100, 30);\n    w.showStatus();\n    w.attack();\n    return 0;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "클래스와 상속 완전 정복!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: 심화 연습 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "심화 연습",
          desc: "클래스 개념을 다양한 문제로 확인해요!"
        }
      },

      // predict: Dog 클래스 age 출력
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nclass Dog {\npublic:\n    int age = 3;\n};\n\nint main() {\n    Dog d;\n    cout << d.age << "\\n";\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["3", "0", "에러 (age가 private)", "에러 (초기화 불가)"],
            answer: 0,
            feedback: "age는 public이고 기본값 3으로 초기화돼 있어요. Dog d;로 객체를 만들면 d.age는 3이에요!"
          },
          en: {
            predict: {
              question: "What is the output?",
              options: ["3", "0", "Error (age is private)", "Error (cannot initialize inline)"],
              feedback: "age is public and initialized to 3 by default. When Dog d; creates the object, d.age is 3!"
            }
          }
        }
      },

      // predict: 생성자 파라미터
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nclass Person {\npublic:\n    string name;\n    int age;\n\n    Person(string n, int a) {\n        name = n;\n        age = a;\n    }\n};\n\nint main() {\n    Person p("charlie", 15);\n    cout << p.name << " " << p.age << "\\n";\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["민준 15", "n a", "민준 0", "에러"],
            answer: 0,
            feedback: "Person(\"민준\", 15)으로 n=\"민준\", a=15가 넘어가고, 생성자에서 name=n, age=a로 저장돼요!"
          },
          en: {
            predict: {
              question: "What is the output?",
              options: ["민준 15", "n a", "민준 0", "Error"],
              feedback: "Person(\"민준\", 15) passes n=\"민준\" and a=15, which are stored as name and age in the constructor!"
            }
          }
        }
      },

      // practice: fill in constructor name ___(string n)
      {
        type: "practice",
        content: {
          level: 1,
          task: "Animal 클래스의 생성자 이름을 채워요!",
          guide: "생성자 이름은 항상 클래스 이름과 동일해야 해요!",
          template: "class Animal {\npublic:\n    string name;\n    ___(string n) {\n        name = n;\n    }\n};",
          answer: "Animal",
          expect: "class Animal {\npublic:\n    string name;\n    Animal(string n) {\n        name = n;\n    }\n};",
          en: {
            task: "Fill in the constructor name for the Animal class!",
            guide: "The constructor name must always match the class name!"
          }
        }
      },

      // practice: fill in this->name = ___
      {
        type: "practice",
        content: {
          level: 2,
          task: "this->name에 매개변수 n을 대입해요!",
          guide: "this->멤버변수 = 매개변수; 형태로 써요!",
          template: "class Robot {\npublic:\n    string name;\n    Robot(string n) {\n        this->name = ___;\n    }\n};",
          answer: "n",
          expect: "class Robot {\npublic:\n    string name;\n    Robot(string n) {\n        this->name = n;\n    }\n};",
          en: {
            task: "Assign parameter n to this->name!",
            guide: "Use the form: this->memberVariable = parameter;"
          }
        }
      },

      // quiz: what does `this` refer to?
      {
        type: "quiz",
        content: {
          question: "C++ 클래스에서 `this`는 무엇을 가리키나요?",
          options: [
            "클래스 자체를 가리킨다",
            "현재 객체의 포인터를 가리킨다",
            "부모 클래스를 가리킨다",
            "생성자 함수를 가리킨다"
          ],
          answer: 1,
          explanation: "this는 현재 객체 자신의 주소(포인터)예요! this->name은 '현재 이 객체의 name 멤버변수'를 뜻해요. 매개변수와 멤버변수 이름이 같을 때 구분하는 데 씁니다.",
          en: {
            question: "What does `this` refer to inside a C++ class?",
            options: [
              "The class itself",
              "A pointer to the current object",
              "The parent class",
              "The constructor function"
            ],
            explanation: "this is the address (pointer) of the current object! this->name means 'the name member of this object'. It's used to distinguish member variables from parameters with the same name."
          }
        }
      },

      // errorQuiz: missing semicolon after class declaration
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 컴파일 에러일까요?",
          code: 'class Car {\npublic:\n    string model;\n    int speed;\n}\n\nCar c;',
          options: [
            "클래스 닫는 중괄호 뒤에 세미콜론(;)이 없어서",
            "public: 키워드가 잘못됐서",
            "Car 변수를 클래스 밖에서 선언할 수 없어서"
          ],
          answer: 0,
          explanation: "C++에서 클래스(struct도 마찬가지) 선언은 닫는 } 뒤에 반드시 ;를 붙여야 해요! class Car { ... }; 처럼요.",
          en: {
            question: "Why does this code cause a compilation error?",
            options: [
              "There is no semicolon (;) after the closing brace of the class",
              "The public: keyword is incorrect",
              "A Car variable cannot be declared outside the class"
            ],
            explanation: "In C++, class (and struct) declarations must have a semicolon after the closing }! Like class Car { ... };"
          }
        }
      },

      // errorQuiz: accessing private member from outside (new variant)
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 에러가 나는 줄은?",
          code: 'class Wallet {\nprivate:\n    int money = 5000;\npublic:\n    int getBalance() { return money; }\n};\n\nWallet w;\ncout << w.getBalance() << "\\n";  // A\ncout << w.money << "\\n";           // B',
          options: [
            "A줄 — getBalance()를 외부에서 호출할 수 없어서",
            "B줄 — money가 private이라 외부에서 직접 접근 불가",
            "둘 다 에러 없음"
          ],
          answer: 1,
          explanation: "getBalance()는 public이라 외부 호출 OK! 하지만 money는 private이라 w.money로 직접 접근하면 에러예요. private 멤버는 getter를 통해서만 접근해야 해요.",
          en: {
            question: "Which line causes an error in this code?",
            options: [
              "Line A — getBalance() cannot be called from outside",
              "Line B — money is private and cannot be accessed directly from outside",
              "Neither line has an error"
            ],
            explanation: "getBalance() is public so external calls are fine! But money is private, so w.money is an error. Private members must be accessed through getters."
          }
        }
      },

      // interleaving: from cpp-14 (struct) — fill in dot notation
      {
        type: "interleaving",
        content: {
          message: "잠깐! cpp-14 struct 기억나요?",
          task: "struct Point에서 멤버 x를 읽는 코드를 완성해요! (점 표기법)",
          template: "struct Point { int x; int y; };\nPoint p;\np.x = 10;\ncout << p___x << \"\\n\";",
          answer: ".",
          expect: "struct Point { int x; int y; };\nPoint p;\np.x = 10;\ncout << p.x << \"\\n\";",
          en: {
            message: "Quick check! Do you remember structs from cpp-14?",
            task: "Complete the code that reads member x from a struct Point using dot notation!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "클래스 심화 연습 완료!",
          emoji: "⭐"
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
