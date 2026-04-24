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
          code: '#include <iostream>\nusing namespace std;\n\nclass Dog {\npublic:\n    string name;\n    int age;\n\n    Dog(string n, int a) {\n        name = n;   // 매개변수 n 을 멤버 name 에 저장\n        age = a;\n    }\n\n    void bark() {\n        cout << name << ": 멍멍!" << endl;\n    }\n};\n\nint main() {\n    Dog d("바둑이", 3);\n    d.bark();\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["바둑이: 멍멍!", "3: 멍멍!", "n: 멍멍!", "에러"],
            answer: 0,
            feedback: "Dog d(\"바둑이\", 3) 으로 n=\"바둑이\" 가 넘어가고, 생성자에서 name = n 으로 저장. bark() 가 name 을 출력!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["바둑이: 멍멍!", "3: 멍멍!", "n: 멍멍!", "Error"],
              feedback: "Dog d(\"바둑이\", 3) passes n=\"바둑이\"; the constructor saves name = n; bark() prints name!"
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

      // Lv.2: 멤버 = 매개변수 대입
      {
        type: "practice",
        content: {
          level: 2,
          task: "생성자 안에서 매개변수 s 를 멤버 size 에 저장해요!",
          guide: "멤버이름 = 매개변수; — 왼쪽이 멤버, 오른쪽이 매개변수에요!",
          template: "class Box {\npublic:\n    int size;\n    Box(int s) {\n        ___ = s;\n    }\n};",
          answer: "size",
          expect: "class Box {\npublic:\n    int size;\n    Box(int s) {\n        size = s;\n    }\n};",
          en: {
            task: "Inside the constructor, store parameter s into member size!",
            guide: "Form: member = parameter; — left side is the member, right side is the parameter."
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
            "생성자 안에서 `멤버 = 매개변수;` 로 값을 저장",
            "getter: 값을 읽는 함수 (int getName())",
            "setter: 값을 바꾸는 함수 (void setName(...))"
          ],
          canDo: "생성자와 getter/setter를 만들어 클래스를 완성할 수 있어요!",
          emoji: "🏗️"
        }
      },

      // ==================== CHAPTER 3: 캡슐화와 유효성 검증 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "캡슐화와 유효성 검증",
          desc: "setter 로 잘못된 값을 막아보자!"
        }
      },

      // 인터리빙: 챕터2 복습 (생성자)
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

      // setter 유효성 검증 설명
      {
        type: "explain",
        content: {
          lines: [
            "setter 를 쓰면 좋은 점 — **잘못된 값을 막을 수 있어요!** 🛡️",
            "public 으로 뚫어두면 음수 속도, 빈 색깔 뭐든 다 들어가요.",
            "setter 안에서 if 로 검사하면 → 안전."
          ],
          code: 'class Car {\nprivate:\n    double speed = 0;\n\npublic:\n    double getSpeed() { return speed; }\n\n    void setSpeed(double s) {\n        if (s >= 0) speed = s;   // 음수는 거부!\n    }\n};\n\nCar c;\nc.setSpeed(-999);   // 무시됨\nc.setSpeed(60);     // OK\ncout << c.getSpeed();',
          result: "60",
          note: "setter 안의 if 로 조건 통과한 값만 저장 — 이게 캡슐화의 힘!"
        }
      },

      // 유효성 검증 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nclass Thermometer {\nprivate:\n    int temp = 20;\npublic:\n    int getTemp() { return temp; }\n    void setTemp(int t) {\n        if (t >= -50 && t <= 150) temp = t;\n    }\n};\n\nint main() {\n    Thermometer th;\n    th.setTemp(200);  // 150 초과 → 무시\n    th.setTemp(30);   // OK\n    th.setTemp(-100); // -50 미만 → 무시\n    cout << th.getTemp();\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["30", "200", "-100", "20"],
            answer: 0,
            feedback: "200 은 150 초과, -100 은 -50 미만이라 무시됨. 30 만 통과 → getTemp() 가 30 출력."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["30", "200", "-100", "20"],
              feedback: "200 exceeds 150 and -100 is below -50 — both rejected. Only 30 passes → getTemp() prints 30."
            }
          }
        }
      },

      // Lv.1: setter 유효성 조건 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "setAge 가 음수를 거부하도록 조건을 채워요!",
          guide: "a 가 0 이상일 때만 age 에 저장. 비교 연산자는?",
          template: "void setAge(int a) {\n    if (a ___ 0) age = a;\n}",
          answer: ">=",
          expect: "void setAge(int a) {\n    if (a >= 0) age = a;\n}",
          en: {
            task: "Fill in the condition so setAge rejects negatives!",
            guide: "Only store if a is 0 or greater. Which comparison operator?"
          }
        }
      },

      // Lv.2: setScore 범위 체크 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "setScore 가 0~100 범위만 허용하도록 조건을 채워요!",
          guide: "s >= 0 그리고 s <= 100 — 두 조건을 && 로 연결해요.",
          template: "void setScore(int s) {\n    if (___) score = s;\n}",
          answer: "s >= 0 && s <= 100",
          expect: "void setScore(int s) {\n    if (s >= 0 && s <= 100) score = s;\n}",
          en: {
            task: "Fill in so setScore only accepts 0 to 100!",
            guide: "s >= 0 AND s <= 100 — join two conditions with &&."
          }
        }
      },

      // 퀴즈: 캡슐화 — private + getter/setter 를 쓰는 이유
      {
        type: "quiz",
        content: {
          question: "멤버 변수를 private 으로 감추고 getter/setter 로 접근하게 하는 가장 큰 이유는?",
          options: [
            "코드를 더 짧게 쓸 수 있어서",
            "setter 안에서 잘못된 값을 막을 수 있어서 (유효성 검사)",
            "메모리를 더 적게 써서",
            "컴파일 속도가 빨라져서"
          ],
          answer: 1,
          explanation: "바로 이게 캡슐화의 핵심! public 으로 뚫어두면 -999 같은 이상한 값도 막을 수 없어요. setter 안의 if 조건으로 **잘못된 값을 거부** 할 수 있는 게 가장 큰 이점이에요.",
          en: {
            question: "Why hide member variables with private and expose them via getter/setter?",
            options: [
              "To write shorter code",
              "So setters can block invalid values (validation)",
              "To use less memory",
              "To compile faster"
            ],
            explanation: "This is the whole point of encapsulation! With public, nothing stops a value like -999 from sneaking in. Rejecting bad values inside the setter's if check is the biggest benefit."
          }
        }
      },

      // 종합 프로젝트 Step 1 — BankAccount 뼈대
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "BankAccount 뼈대를 만들어요! (private owner/balance + 생성자)",
          target: "class BankAccount {\nprivate:\n    string owner;\n    double balance;\n\npublic:\n    BankAccount(string name, double initial) {\n        owner = name;\n        balance = initial;\n    }\n};",
          hint: "private 에 string owner; double balance; — 그리고 public 생성자 BankAccount(string name, double initial) 안에서 owner = name; balance = initial;",
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n"],
          answer: "class BankAccount {\nprivate:\n    string owner;\n    double balance;\n\npublic:\n    BankAccount(string name, double initial) {\n        owner = name;\n        balance = initial;\n    }\n};"
        }
      },

      // 종합 프로젝트 Step 2 — getBalance + deposit
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "잔액 조회와 입금 기능을 추가해요! (getBalance + deposit, 음수 거부)",
          target: "double getBalance() {\n    return balance;\n}\n\nvoid deposit(double amount) {\n    if (amount > 0) balance += amount;\n}",
          hint: "getBalance() 는 return balance; 한 줄. deposit(double amount) 안에서 if (amount > 0) balance += amount;",
          done: ["#include <iostream>\n#include <string>\nusing namespace std;", "// BankAccount 뼈대 완성 (private + 생성자)"],
          answer: "double getBalance() {\n    return balance;\n}\n\nvoid deposit(double amount) {\n    if (amount > 0) balance += amount;\n}"
        }
      },

      // 종합 프로젝트 Step 3 — withdraw + main 테스트
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "출금 기능(잔액 초과 거부)과 main 테스트를 완성해요!",
          target: "void withdraw(double amount) {\n    if (amount > 0 && amount <= balance) balance -= amount;\n}\n\nint main() {\n    BankAccount acc(\"김철수\", 1000);\n    acc.deposit(500);\n    acc.withdraw(200);\n    acc.withdraw(9999);  // 잔액 초과 — 무시\n    cout << acc.getBalance();\n    return 0;\n}",
          hint: "withdraw 는 if (amount > 0 && amount <= balance) balance -= amount; — main 에서는 BankAccount acc(\"김철수\", 1000); 로 객체 만들고 메서드 순서대로 호출.",
          done: ["#include <iostream>\n#include <string>\nusing namespace std;", "// BankAccount 클래스 완성 (private + 생성자 + getBalance + deposit)"],
          answer: "void withdraw(double amount) {\n    if (amount > 0 && amount <= balance) balance -= amount;\n}\n\nint main() {\n    BankAccount acc(\"김철수\", 1000);\n    acc.deposit(500);\n    acc.withdraw(200);\n    acc.withdraw(9999);\n    cout << acc.getBalance();\n    return 0;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "캡슐화와 유효성 검증 완성!",
          emoji: "🛡️"
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
          code: '#include <iostream>\nusing namespace std;\n\nclass Person {\npublic:\n    string name;\n    int age;\n\n    Person(string n, int a) {\n        name = n;\n        age = a;\n    }\n};\n\nint main() {\n    Person p("민준", 15);\n    cout << p.name << " " << p.age << "\\n";\n    return 0;\n}',
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

      // practice: 생성자 안에서 멤버에 매개변수 대입
      {
        type: "practice",
        content: {
          level: 2,
          task: "생성자 안에서 매개변수 n 을 멤버 name 에 저장해요!",
          guide: "멤버이름 = 매개변수; 형태. 여기선 name = n;",
          template: "class Robot {\npublic:\n    string name;\n    Robot(string n) {\n        ___ = n;\n    }\n};",
          answer: "name",
          expect: "class Robot {\npublic:\n    string name;\n    Robot(string n) {\n        name = n;\n    }\n};",
          en: {
            task: "Inside the constructor, store parameter n into member name!",
            guide: "Form: member = parameter; — here it's name = n;"
          }
        }
      },

      // quiz: private getter/setter 로 멤버에 접근하는 올바른 방식
      {
        type: "quiz",
        content: {
          question: "private 멤버 balance 를 외부에서 **읽는** 올바른 방법은?",
          options: [
            "acc.balance",
            "acc->balance",
            "acc.getBalance()",
            "balance(acc)"
          ],
          answer: 2,
          explanation: "balance 는 private 이라 acc.balance 직접 접근은 컴파일 에러. public getter 인 getBalance() 를 호출해서 값을 돌려받아요 — 이게 캡슐화의 정석!",
          en: {
            question: "What is the correct way to **read** the private member balance from outside?",
            options: [
              "acc.balance",
              "acc->balance",
              "acc.getBalance()",
              "balance(acc)"
            ],
            explanation: "balance is private, so acc.balance is a compile error. Call the public getter getBalance() to read the value — this is the standard encapsulation pattern."
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
