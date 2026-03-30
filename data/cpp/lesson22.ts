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
          title: "🚗 class란?",
          content: `\`int\`로 정수, \`string\`으로 문자열을 만들 수 있어요.
그럼 **자동차**는? C++에는 자동차 타입이 없어요. **직접 만들어야 해요.**

그런데 자동차를 만든다고 생각하면 "타이어, 엔진, 연료량, 색깔, 속도, 문 개수..." 끝이 없어요.
친구한테 김밥 재료 물어봤더니 밥, 단무지, 소고기, 계란은 다 얘기하면서 **김**을 빠뜨린 것처럼 — 이것저것 다 생각하다 보면 정작 핵심을 놓쳐요.

그래서 딱 두 가지만 물어봐요:

**🧠 무엇을 기억해야 할까?**
→ C++에서는 **멤버변수(member variable)**

**⚙️ 무엇을 할 수 있어야 할까?**
→ C++에서는 **멤버함수(member function)**

이렇게 두 가지를 묶어 정의하는 것 — 그게 바로 **class**예요.`,
        },
        {
          id: "ch1-build",
          type: "explain",
          title: "🚗 자동차 class를 만들어볼까요?",
          content: `class는 이렇게 생겼어요:

\`\`\`
class 이름 {
    기억해야 할 것들...  // 멤버변수

    해야 할 것들...      // 멤버함수
};
\`\`\`

\`class\` 키워드로 시작하고, 이름을 쓰고, 중괄호로 묶어요.
위쪽에 **멤버변수**, 아래쪽에 **멤버함수**를 써요.

---

그럼 자동차로 생각해볼까요?

일단 **기억해야 할 것**부터 — 달리려면 **속도**는 있어야겠죠. 어떤 차인지 알게 **색깔**도 넣어볼게요.

**해야 할 것**은 — 앞으로 달리는 기능, 그리고 지금 상태를 확인하는 기능 정도로 시작해봐요.

물론 이건 제가 생각한 것 중 하나예요. 만들다 보면 더 필요한 게 생길 수도 있고, 필요 없는 게 빠질 수도 있어요.

코드로 써볼게요.

먼저 **멤버변수** — 기억해야 할 것들이에요:

\`\`\`cpp
class Car {
    double speed;   // 속도 → 소수점도 가능하게 double로
    string color;   // 색깔 → 텍스트니까 string으로
\`\`\`

그 아래에 **멤버함수** — 해야 할 것들이에요:

\`\`\`cpp
    void forward() {
        speed += 10;   // 앞으로 가면 속도가 커지겠죠?
    }
    void info() {      // 저는 임의로 정보를 출력하게 만들게요
        cout << color << " 자동차, 속도: " << speed << endl;
    }
};
\`\`\`

> 🐍 **Python에서 오셨나요?** Python에서는 \`self.speed\`처럼 \`self\`가 필요했는데, C++에서는 그냥 \`speed\`로 바로 써요.

{collapse:전체 코드 보기}
\`\`\`cpp
class Car {
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " 자동차, 속도: " << speed << endl;
    }
};
\`\`\`

아직 자동차가 생긴 건 아니에요.`,
        },
        {
          id: "ch1-object",
          type: "explain",
          title: "🎮 그럼 실제 자동차는 어떻게 만들어요?",
          content: `방금 Car class를 만들었는데, 그럼 자동차가 생겼을까요?

아니에요. class는 **설계도**예요. 실제 자동차를 만들려면 한 단계가 더 필요해요.

RPG 게임으로 생각해보면 — 상점에서 "불꽃 검" 설명을 읽어봤다고 검이 내 것이 되는 건 아니잖아요. **실제로 구매하거나 획득해야** 인벤토리에 생겨요.

| | 게임 | 프로그래밍 |
|---|---|---|
| 아이템 **설명서** | 불꽃 검 정보 | **class** |
| 실제로 **얻은** 아이템 | 내 인벤토리의 검 | **객체 (object)** |

이렇게 class로 만든 실체를 **객체(object)** 또는 **인스턴스(instance)** 라고 해요.

\`\`\`cpp
int main() {
    Car myCar;             // ← 실제 자동차(객체)가 생겨요!
    myCar.color = "빨간색";
    myCar.speed = 0;
    myCar.forward();
    myCar.forward();
    myCar.info();          // 빨간색 자동차, 속도: 20
}
\`\`\`

설계도 하나로 자동차를 여러 대 만들 수도 있어요:

\`\`\`cpp
int main() {
    Car car1;  car1.color = "빨간색";   // 객체 1
    Car car2;  car2.color = "파란색";   // 객체 2
}
\`\`\`

> 🍩 붕어빵틀 하나로 붕어빵을 여러 개 찍듯, class 하나로 객체를 여러 개 만들 수 있어요.

이렇게 **class를 설계하고 객체를 만들어 쓰는 방식** — 이걸 **객체지향 프로그래밍(OOP)** 이라고 해요.

{collapse:📦 번외 — class가 없었다면?}
\`\`\`cpp
// class 없이 자동차 2대를 표현하려면...
int main() {
    double car1Speed = 0;
    string car1Color = "빨간색";
    double car2Speed = 0;
    string car2Color = "파란색";

    car1Speed += 10;
    car2Speed += 10;

    // 코드가 길어지면... car2Color가 뭐였더라? 두 번째 자동차 색깔이었나?
    cout << car1Color << " 자동차, 속도: " << car1Speed << endl;
    cout << car2Color << " 자동차, 속도: " << car2Speed << endl;
}
// 자동차가 10대면? 변수 20개에, 어떤 변수가 어떤 차의 것인지도 헷갈려요
\`\`\``,
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "Car class 읽기!",
          code: `#include <iostream>
#include <string>
using namespace std;

class Car {
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
          content: `우리가 만든 Car class, 사실 문제가 있어요.

\`\`\`cpp
int main() {
    Car myCar;
    myCar.speed = -999;   // 음수 속도?
    myCar.color = "";     // 빈 색깔?
}
\`\`\`

외부에서 아무 값이나 마음대로 넣을 수 있어요. 막을 방법이 없어요.

근데 이게 통장 계좌 class라고 생각해보세요. 아무나 내 계좌의 돈을 바꿀 수 있다? 너무 위험하겠죠?

그래서 class에는 접근을 제한하는 키워드가 있어요:

| 키워드 | 접근 가능한 곳 |
|---|---|
| **public** | 어디서나 접근 가능 — 지금까지 우리가 쓴 방식 |
| **protected** | 클래스 내부 + 상속받은 클래스 |
| **private** | 클래스 내부에서만 |

보통 **멤버변수는 외부에서 직접 못 바꾸도록 private**으로 두고, **멤버함수는 public**으로 공개해요.

어떻게 쓰는지 바로 봐봐요.`,
        },
        {
          id: "ch2-how",
          type: "explain",
          title: "🔒 private / public 사용법",
          content: `\`private:\` 아래에 있는 것들은 **클래스 외부에서 접근할 수 없어요.**
\`public:\` 아래에 있는 것들은 **어디서나 호출할 수 있어요.**

\`\`\`cpp
class Car {
private:              // ← 이 아래는 외부에서 접근 불가
    double speed;
    string color;

public:               // ← 이 아래는 외부에서 호출 가능
    void forward() {
        speed += 10;  // 클래스 내부에서는 private 변수 접근 OK
    }
    void info() {
        cout << color << " 자동차, 속도: " << speed << endl;
    }
};
\`\`\`

@핵심: private 변수는 클래스 내부 함수만 건드릴 수 있어요. 외부에서 직접 접근하면 컴파일 에러!

\`\`\`cpp
int main() {
    Car myCar;
    myCar.speed = -999;   // ❌ 컴파일 에러
    myCar.forward();      // ✅ public이라 OK
}
\`\`\``,
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
        {
          id: "ch2-getter-setter",
          type: "explain",
          title: "그럼 class 안의 값들은 어떻게 가져오고 바꿀까요?",
          content: `멤버변수는 private으로 해야 한다고 했는데, 그럼 \`speed\`를 알고 싶거나 바꾸고 싶을 때는 어떻게 할까요?

멤버변수에 접근할 수 있는 함수를 **public에 넣어두면** 돼요.

\`\`\`cpp {6-8,10-15}
class Car {
private:
    double speed;
    string color;

public:
    double getSpeed() { return speed; }   // speed 읽기
    string getColor() { return color; }   // color 읽기

    void setSpeed(double s) {
        if (s >= 0) speed = s;   // 음수 속도는 거부
    }
    void setColor(string c) {
        if (c != "") color = c;  // 빈 색깔은 거부
    }
};
\`\`\`

\`\`\`cpp
int main() {
    Car myCar;
    myCar.setColor("빨간색");
    myCar.setSpeed(-999);     // 음수라서 무시돼요
    cout << myCar.getSpeed(); // 0 (바뀌지 않음)
}
\`\`\`

값을 **읽는** 함수를 **getter**, 값을 **설정하는** 함수를 **setter**라고 해요.
setter에서는 잘못된 값을 거부할 수 있다는 게 포인트예요.

@핵심: private으로 막고, getter/setter로 통제된 창구를 만드는 것 — 이게 **캡슐화(encapsulation)**예요.

그런데 한 가지 남은 문제가 있어요. 객체를 만들자마자 매번 setter로 초기값을 설정해줘야 할까요? 더 좋은 방법이 없을까요?`,
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
          component: "cppConstructorBuilder",
          content: `지금까지 잘 따라왔죠? 근데 이상한 점이 있지 않나요?

우리가 Car 객체를 만들 때, 처음에는 speed도 없고 color도 없는 상태예요. 그 다음에 setter로 하나씩 넣어줘야 해요.

사람도 태어나는 순간 이름이 있고 성별이 있잖아요. 객체도 생기는 순간 처음부터 세팅이 되어 있어야 자연스럽지 않을까요?

그래서 있어요. **객체가 만들어지는 순간 자동으로 호출되는 함수** — 이걸 **생성자(constructor)**라고 해요.

생성자가 없으면 멤버 변수들이 **쓰레기 값**으로 시작해요:

\`\`\`cpp
BankAccount acc;
// acc.balance가 -398475.23 같은 이상한 값일 수 있어요! 😱
\`\`\`

생성자를 하나씩 조립해봐요:`,
        },
        {
          id: "ch3-constructor-usage",
          type: "explain",
          title: "생성자가 있는 클래스 전체 보기",
          content: `\`\`\`cpp {6-11,14}
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
| 리턴 타입 | 없음 | **없음 (void도 아님!)** |`,
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

\`main()\`에서 이미 사용하는 코드를 보고, 클래스를 완성하세요.
- 입금은 금액이 0보다 클 때만 처리
- 출금은 금액이 0보다 크고 잔액 이하일 때만 처리`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    // 1. owner(string), balance(double) 선언

public:
    // 2. 생성자: BankAccount(string name, double initial)

    // 3. getBalance()

    // 4. deposit(double amount) — 0보다 클 때만 처리

    // 5. withdraw(double amount) — 0보다 크고 잔액 이하일 때만 처리
};

int main() {
    BankAccount acc("김철수", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    acc.withdraw(9999);  // 잔액 부족 — 무시됨
    cout << acc.getBalance() << "원";
    return 0;
}`,
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

    double getBalance() {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) balance -= amount;
    }
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

Part 2 (레슨 9, 21, 10~14, 22)에서 배운 모든 것을 정리해봐요!

### 📚 레슨 9: 배열 & 벡터
- C-style 배열과 \`vector\`로 여러 데이터를 저장하는 법

### 🗺️ 레슨 21: 2차원 배열 & 2D vector
- \`int grid[행][열] = {};\` — 전부 0으로 초기화
- \`vector<vector<int>> v(n, vector<int>(m, 0));\` — 크기가 동적일 때
- 이중 for문으로 순회, cin으로 격자 입력받기 (USACO 핵심 패턴)
- 주 대각선: \`grid[i][i]\`, 전체 합: 이중 for + 누적

### 🔄 레슨 10: Range-for & auto
- \`for(auto x : vec)\`로 편하게 반복, \`auto\`로 타입 자동 추론

### 🔤 레슨 11: 문자열 심화
- \`string\`의 다양한 메서드와 활용법

### 🔗 레슨 12: 참조와 함수
- Call by Value vs Reference, \`int& ref\`로 원본 수정

### 🎯 레슨 13: 포인터 기초
- 포인터 선언 \`int* ptr\`, 역참조 \`*ptr\`, nullptr

### 📦 레슨 14: 구조체 (struct)
- 관련 데이터를 하나로 묶는 사용자 정의 타입 (\`struct Student { string name; int score; };\`)
- 점(\`.\`) 연산자로 멤버 접근, struct 배열로 여러 데이터 한 번에 관리
- for문 패턴: **합계 / 최솟값·최댓값 / 조건 카운트**
- 함수에 넘길 땐 참조(\`Student&\`)로 효율적으로

### 🎓 레슨 22: 클래스 (class)
- 멤버변수 + 멤버함수를 묶어 **나만의 타입** (class = 설계도, object = 실체)
- \`private\` / \`public\` — 멤버변수는 숨기고, 멤버함수는 공개
- **getter** / **setter** — private 멤버를 읽고 쓰는 공개 창구 + 유효성 검사
- **생성자** — 객체 생성 시 자동 호출, 클래스 이름과 동일, 리턴 타입 없음
- **캡슐화(encapsulation)** — private으로 막고 공개 함수로만 접근하는 OOP 원칙

---

## ✅ Part 2 핵심 요약!

| 개념 | 키워드 | 핵심 |
|---|---|---|
| 배열/벡터 | \`int arr[]\`, \`vector<int>\` | 여러 값 저장 |
| 2D 배열 | \`int grid[N][N] = {};\` | 격자/행렬, 이중 for 순회 |
| Range-for | \`for(auto x : v)\` | 편한 반복 |
| 참조 | \`int& ref\` | 원본에 직접 접근 |
| 포인터 | \`int* ptr\` | 주소를 저장하는 변수 |
| struct | \`struct Name { };\` | 데이터 묶음, 배열+패턴 활용 |
| class | \`class { private/public };\` | 설계도 → 객체 (OOP) |
| getter/setter | \`getX()\` / \`setX(v)\` | private 멤버 접근 창구 |
| 생성자 | \`ClassName(...)\` | 객체 생성 시 자동 초기화 |

🎊 **축하해요!** Part 2를 모두 마쳤어요!

🚀 **다음은 Part 3!** pair & 정렬, map & set, STL 알고리즘!`
        }
      ]
    }
  ]
}
