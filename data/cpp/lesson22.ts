// ============================================
// C++ Lesson 22: 클래스 (class)
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson22Data: LessonData = {
  id: "cpp-22",
  title: "클래스 (class)",
  emoji: "🎓",
  description: "데이터 + 함수를 하나로! 나만의 타입 만들기",
  chapters: [
    // ============================================
    // Chapter 1: class 기초 — struct에 함수를 추가하면?
    // ============================================
    {
      id: "ch1",
      title: "class 기초",
      emoji: "🐕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🚗 class — 컴퓨터 세상에 자동차 만들기!",
          content: `컴퓨터 세상에는 자동차, 오디오 같은 것들이 없어요. **다 만들어야 해요.**

정수는 \`int\`, 문자는 \`string\`으로 만들 수 있어요.
그럼 **자동차**는? → 바로 **class**로 만들어요!

---

class를 만들 때는 **단순화**가 중요해요.

> 💡 김밥을 만들려면 뭐가 필요할까요? 밥, 단무지, 소고기, 계란… 막상 **김**을 빼는 경우가 있어요. 자동차도 마찬가지예요 — 핵심만 추려야 해요.

class 안에는 두 가지가 들어가요:

| | 설명 | C++ |
|---|---|---|
| **기억해야 할 것** | 색깔, 속도 등 데이터 | 멤버변수 |
| **해야 할 것** | 앞으로 가기, 뒤로 가기 등 동작 | 멤버함수 |

\`\`\`cpp
class Car {
public:
    // 기억해야 할 것 (멤버변수)
    string color;
    double speed;

    // 해야 할 것 (멤버함수)
    void forward()  { speed += 10; }
    void backward() { speed -= 10; }
    void info() {
        cout << color << " 자동차, 속도: " << speed << endl;
    }
};
\`\`\`

이렇게 정의하면 Car 타입의 변수를 만들 수 있어요:

\`\`\`cpp
Car myCar;
myCar.color = "빨간색";
myCar.speed = 0;
myCar.forward();   // speed: 10
myCar.forward();   // speed: 20
myCar.info();      // 빨간색 자동차, 속도: 20
\`\`\`

> 🍩 **붕어빵틀 = class, 붕어빵 = 객체!**
> 틀(class)을 한 번 만들면 붕어빵(Car myCar, Car yourCar...)을 여러 개 찍어낼 수 있어요.

**Python과 비교:**

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| 메서드 선언 | \`def forward(self):\` | \`void forward() {}\` |
| 멤버 접근 | \`self.speed\` | \`speed\` (self 없음!) |
| 클래스 끝 | 들여쓰기로 구분 | \`};\` 세미콜론 필수! |

💡 **지금 기억할 것:**
- 메서드 안에서는 \`self\` 없이 멤버에 바로 접근해요
- \`public:\` 의 의미는 다음 챕터에서 배울 거예요`,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Car class 읽기!",
          code: `#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    string color;
    double speed;
    void forward() { speed += 10; }
    void info() {
        cout << color << " " << speed;
    }
};

int main() {
    Car c;
    c.color = "파란색";
    c.speed = 0;
    c.forward();
    c.forward();
    c.info();
    return 0;
}`,
          options: ["파란색 20", "파란색 0", "파란색 10", "에러"],
          answer: 0,
          explanation: "forward()를 두 번 호출해서 speed가 0→10→20이 돼요. info()는 color와 speed를 출력해요. 메서드 안에서 color, speed에 self 없이 바로 접근해요!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "멤버함수 완성하기!",
          content: "메서드 안에서는 `self` 없이 멤버변수에 바로 접근해요.",
          code: `class Car {
public:
    double speed;
    void forward() {
        ___ += 10;   // 속도를 10 올려요
    }
};`,
          fillBlanks: [
            { id: 0, answer: "speed", options: ["speed", "self.speed", "Car.speed", "this.speed"] }
          ],
          explanation: "C++에서는 Python의 self.speed와 달리 speed만 써요! 메서드 안에서는 같은 클래스의 멤버변수에 바로 접근할 수 있어요."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "class 기본 개념!",
          content: "class에 대한 설명으로 **맞는** 것은?",
          options: [
            "class는 변수(데이터)만 가질 수 있다",
            "class 안의 함수는 같은 class의 멤버에 접근할 수 없다",
            "class는 데이터와 함수를 함께 묶어 나만의 타입을 만든다",
            "class로 만든 변수는 점(.)으로 접근할 수 없다"
          ],
          answer: 2,
          explanation: "class는 데이터(변수)와 함수(메서드)를 함께 묶어 나만의 타입을 만드는 것이에요! Dog d; d.bark(); 처럼 점(.)으로 접근해요."
        },
      ]
    },
    // ============================================
    // Chapter 2: private — 왜 데이터를 숨길까?
    // ============================================
    {
      id: "ch2",
      title: "private — 데이터 보호",
      emoji: "🔒",
      steps: [
        {
          id: "ch2-why",
          type: "explain",
          title: "🔒 왜 데이터를 숨겨야 할까?",
          content: `통장 잔액을 생각해봐요. 만약 잔액을 아무나 직접 바꿀 수 있다면?

\`\`\`cpp
// ❌ 모든 게 public이라면...
class BankAccount {
public:
    double balance;
};

BankAccount acc;
acc.balance = 1000000;  // 아무나 잔액을 바꿀 수 있어요! 😱
acc.balance = -500;     // 음수 잔액도 가능?!
\`\`\`

이런 상황을 막으려면 **직접 접근을 차단**하고, **정해진 방법으로만** 바꿀 수 있게 해야 해요.

그게 바로 **private**이에요:

\`\`\`cpp
// ✅ private으로 보호!
class BankAccount {
private:
    double balance;          // 외부에서 직접 접근 불가!

public:
    void deposit(double amount) {   // 이 함수로만 잔액 변경 가능
        if (amount > 0)
            balance += amount;      // 클래스 내부에서는 OK
    }
    double getBalance() {
        return balance;
    }
};

BankAccount acc;
// acc.balance = 1000000;   // ❌ 컴파일 에러!
acc.deposit(500);            // ✅ 정해진 방법으로만 변경
\`\`\`

| | private | public |
|---|---|---|
| 접근 가능한 곳 | 클래스 **내부만** | **어디서나** |
| 주로 쓰는 것 | 데이터 (변수) | 기능 (함수) |

💡 데이터는 숨기고, 기능은 공개하는 것 → **캡슐화(encapsulation)**`,
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "private/public 구분하기!",
          content: "비밀번호는 숨기고, 비밀번호 확인 함수는 공개해요.",
          code: `class Account {
___:
    string password;    // 비밀번호는 숨겨야 해요!

___:
    bool check(string input) {   // 확인 함수는 외부에서 써야 해요!
        return password == input;
    }
};`,
          fillBlanks: [
            { id: 0, answer: "private", options: ["private", "public", "protected", "hidden"] },
            { id: 1, answer: "public", options: ["public", "private", "open", "extern"] }
          ],
          explanation: "비밀번호(password)는 private으로 숨기고, 확인 함수(check)는 public으로 공개해요. 데이터는 숨기고 기능은 공개하는 게 캡슐화의 핵심이에요!"
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "private에 직접 접근하면?",
          code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    void deposit(double a) { balance += a; }
};

int main() {
    BankAccount acc;
    acc.balance = 1000;
    cout << acc.balance;
    return 0;
}`,
          options: ["1000", "0", "컴파일 에러", "쓰레기값"],
          answer: 2,
          explanation: "balance는 private이라 클래스 외부에서 acc.balance로 직접 접근하면 컴파일 에러! 오직 클래스 안의 함수(deposit 등)에서만 접근할 수 있어요."
        },
      ]
    },
    // ============================================
    // Chapter 3: 생성자 (Constructor)
    // ============================================
    {
      id: "ch3",
      title: "생성자 (Constructor)",
      emoji: "🔧",
      steps: [
        {
          id: "ch3-constructor",
          type: "explain",
          title: "🔧 생성자 — 객체가 태어날 때 자동 호출!",
          content: `생성자가 없으면 멤버 변수들이 **쓰레기 값**으로 시작해요:

\`\`\`cpp
BankAccount acc;
// acc.balance가 -398475.23 같은 이상한 값일 수 있어요! 😱
\`\`\`

**생성자**를 만들면 객체가 생성되는 순간 초기값을 안전하게 설정해요:

\`\`\`cpp
class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {  // 생성자!
        owner = name;
        if (initial >= 0) balance = initial;
        else              balance = 0;   // 음수 입금 차단
    }
};

BankAccount acc("김철수", 1000);  // 생성자 자동 호출!
\`\`\`

**Python과 비교:**

| | Python 🐍 | C++ ⚡ |
|---|---|---|
| 생성자 이름 | \`__init__\` | **클래스 이름과 동일** |
| 첫 번째 매개변수 | \`self\` 필수 | 없음 |
| 리턴 타입 | 없음 | **없음 (void도 아님!)** |

💡 **기억할 것:**
- 생성자 이름 = 클래스 이름 (대소문자까지 동일!)
- 리턴 타입 없음 — void도 쓰면 에러가 나요!
- 객체를 만들 때 딱 한 번 자동으로 호출됨`,
        },
        {
          id: "ch3-pred1",
          type: "predict" as const,
          title: "생성자 실행!",
          code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
    void info() {
        cout << owner << ": " << balance << "원";
    }
};

int main() {
    BankAccount acc("김철수", 5000);
    acc.info();
    return 0;
}`,
          options: ["김철수: 5000원", "에러", "0원", "김철수"],
          answer: 0,
          explanation: "BankAccount acc(\"김철수\", 5000)에서 생성자가 자동 호출돼요! owner = \"김철수\", balance = 5000으로 초기화되고 info()가 출력해요."
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "생성자 완성하기!",
          content: "생성자 안에서 멤버 변수(왼쪽)에 매개변수(오른쪽) 값을 저장해요.",
          code: `class Timer {
private:
    int seconds;
public:
    Timer(int s) {
        ___ = ___;
    }
    int get() { return seconds; }
};`,
          fillBlanks: [
            { id: 0, answer: "seconds", options: ["seconds", "s", "Timer", "int"] },
            { id: 1, answer: "s", options: ["s", "seconds", "0", "get()"] }
          ],
          explanation: "`seconds = s` — 왼쪽은 멤버 변수(seconds), 오른쪽은 매개변수(s)예요. '멤버에 전달받은 값을 저장한다'고 기억하면 돼요!"
        },
      ]
    },
    // ============================================
    // Chapter 4: getter/setter + 종합 실습
    // ============================================
    {
      id: "ch4",
      title: "getter/setter + 실습",
      emoji: "💡",
      steps: [
        {
          id: "ch4-getter-setter",
          type: "explain",
          title: "💡 private 값 읽고 쓰기 — getter & setter",
          content: `private 멤버는 외부에서 직접 접근 불가! 그럼 어떻게 값을 읽고 바꿀까요?

- **getter** — 값을 읽어주는 함수 (조회만)
- **setter / 동작 함수** — 검증 후 값을 바꾸는 함수

\`\`\`cpp
class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) {
        owner   = name;
        balance = initial;
    }

    // getter: 잔액 조회
    double getBalance() { return balance; }
    string getOwner()   { return owner; }

    // 입금: 0보다 클 때만
    void deposit(double amount) {
        if (amount > 0)
            balance += amount;
    }

    // 출금: 잔액 이하일 때만
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance)
            balance -= amount;
    }
};

BankAccount acc("김철수", 1000);
acc.deposit(500);
cout << acc.getBalance();  // 1500
acc.withdraw(2000);        // 잔액 부족 → 무시됨
cout << acc.getBalance();  // 1500
\`\`\`

이렇게 하면 balance가 절대 음수가 될 수 없어요!`,
        },
        {
          id: "ch4-fb1",
          type: "fillblank" as const,
          title: "getter 완성하기!",
          content: "getter는 private 멤버를 **읽어서 반환**하는 함수예요.",
          code: `class Player {
private:
    int hp;
public:
    Player(int h) { hp = h; }

    int getHp() { return ___; }   // hp 반환

    void takeDamage(int dmg) {
        if (hp - dmg ___ 0)       // hp가 0 이하로 내려가지 않도록
            hp -= dmg;
    }
};`,
          fillBlanks: [
            { id: 0, answer: "hp", options: ["hp", "dmg", "0", "getHp"] },
            { id: 1, answer: ">=", options: [">=", ">", "<=", "=="] }
          ],
          explanation: "① `return hp` — getter는 멤버 변수를 그대로 반환해요 ② `hp - dmg >= 0` — 체력이 0 이하로 내려가지 않을 때만 데미지를 적용해요!"
        },
        {
          id: "ch4-practice",
          type: "practice" as const,
          title: "✋ BankAccount class 만들기!",
          content: `통장 클래스를 직접 완성해봐요!

**순서:**
1. \`private\`에 \`owner\`(string), \`balance\`(double) 선언
2. 생성자: \`BankAccount(string name, double initial)\` 로 초기화
3. \`getBalance()\` — balance 반환
4. \`deposit(double amount)\` — 0보다 클 때만 balance에 추가
5. \`withdraw(double amount)\` — 0보다 크고 balance 이하일 때만 차감`,
          code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    // 1. owner(string), balance(double) 선언

public:
    // 2. 생성자: BankAccount(string name, double initial)

    // 3. getBalance()

    // 4. deposit(double amount)

    // 5. withdraw(double amount)
};

int main() {
    BankAccount acc("김철수", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    acc.withdraw(9999);  // 잔액 부족 — 무시됨
    cout << acc.getBalance() << "원";
    return 0;
}`,
          expectedOutput: `1300원`
        },
      ]
    },
    // ============================================
    // Chapter 5: 정리 퀴즈
    // ============================================
    {
      id: "ch5",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch5-q1",
          type: "quiz",
          title: "class 코드 읽기!",
          content: `이 코드의 출력은?

\`\`\`cpp
class Dog {
public:
    string name;
    Dog(string n) { name = n; }
};
int main() {
    Dog d("Buddy");
    cout << d.name;
}
\`\`\``,
          options: ["에러", "d", "Buddy", "name"],
          answer: 2,
          explanation: "Dog d(\"Buddy\")로 생성자가 호출돼 name = \"Buddy\"가 돼요. name은 public이라 d.name으로 접근 가능해요!"
        },
        {
          id: "ch5-q2",
          type: "quiz",
          title: "private 접근!",
          content: `이 코드에서 에러가 나는 줄은?

\`\`\`cpp
class Box {
private:
    int size;
public:
    void setSize(int s) { size = s; }
};
int main() {
    Box b;
    b.size = 10;       // 줄 A
    b.setSize(10);     // 줄 B
}
\`\`\``,
          options: ["줄 A", "줄 B", "둘 다 에러", "에러 없음"],
          answer: 0,
          explanation: "size는 private이라 외부에서 직접 b.size = 10은 에러! setSize()는 public 함수라 괜찮아요."
        },
        {
          id: "ch5-q3",
          type: "quiz",
          title: "생성자!",
          content: "C++ 생성자에 대한 설명으로 **틀린** 것은?",
          options: [
            "클래스 이름과 같은 이름을 가진다",
            "리턴 타입이 void이다",
            "객체 생성 시 자동으로 호출된다",
            "매개변수를 받을 수 있다"
          ],
          answer: 1,
          explanation: "생성자는 리턴 타입이 아예 없어요! void도 아니에요. 클래스 이름과 같은 이름이고, 객체 생성 시 자동 호출되고, 매개변수를 받을 수 있어요."
        },
        {
          id: "ch5-q4",
          type: "quiz",
          title: "종합 문제!",
          content: `이 코드의 출력은?

\`\`\`cpp
class Counter {
private:
    int count;
public:
    Counter(int c) { count = c; }
    void add() { count++; }
    int get() { return count; }
};
int main() {
    Counter c(10);
    c.add();
    c.add();
    c.add();
    cout << c.get();
}
\`\`\``,
          options: ["10", "11", "13", "에러"],
          answer: 2,
          explanation: "Counter c(10)으로 count=10이 돼요. add()를 3번 호출하면 10→11→12→13이 돼요. get()은 13을 리턴해요!"
        },
        {
          id: "ch5-summary",
          type: "explain",
          title: "🎉 Part 2 완료!",
          content: `## 🏆 Part 2 완료! 정말 대단해요!

Part 2 (레슨 9~14, 22)에서 배운 모든 것을 정리해봐요!

### 📚 레슨 9: 배열 & 벡터
- C-style 배열과 \`vector\`로 여러 데이터를 저장하는 법

### 🔄 레슨 10: Range-for & auto
- \`for(auto x : vec)\`로 편하게 반복, \`auto\`로 타입 자동 추론

### 🔤 레슨 11: 문자열 심화
- \`string\`의 다양한 메서드와 활용법

### 🔗 레슨 12: 참조와 함수
- Call by Value vs Reference, \`int& ref\`로 원본 수정

### 🎯 레슨 13: 포인터 기초
- 포인터 선언 \`int* ptr\`, 역참조 \`*ptr\`, nullptr

### 📦 레슨 14: 구조체 (struct)
- 관련 데이터를 하나로 묶는 사용자 정의 타입

### 🎓 레슨 22: 클래스 (class)
- \`private\`/\`public\` 접근 제어, 생성자, 캡슐화

---

## ✅ Part 2 핵심 요약!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 배열/벡터 | \`int arr[]\`, \`vector<int>\` | 여러 값 저장 |
| Range-for | \`for(auto x : v)\` | 편한 반복 |
| 참조 | \`int& ref\` | 원본에 직접 접근 |
| 포인터 | \`int* ptr\` | 주소를 저장하는 변수 |
| struct | \`struct Name { };\` | 데이터 묶음 |
| class | \`class { private/public };\` | 캡슐화 (기본 private) |
| 생성자 | \`ClassName(...)\` | 객체 초기화 |

🎊 **축하해요!** Part 2를 모두 마쳤어요!

🚀 **다음은 Part 3!** 2차원 배열, pair & 정렬, map & set, STL 알고리즘!`
        }
      ]
    }
  ]
}
