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
      title: "Class 기본",
      emoji: "🐕",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🚗 class 란?",
          content: `\`int\` 로 정수, \`string\` 으로 문자열을 만들 수 있어요.
그럼 **자동차**는? C++ 에는 자동차 타입이 없어요. **직접 만들어야 해요.**

근데 자동차에 뭐가 들어가는지 생각해보면 — 바퀴, 엔진, 연료, 색깔, 속도, 문... 끝이 없어요.
친구한테 김밥 재료 말해보라고 하면 밥, 오이, 단무지, 햄... 하다가 정작 **김** 을 빠뜨리는 것처럼요. 다 떠올리려 하면 제일 중요한 걸 놓쳐요.

그럼 딱 두 가지만 물어봐요:

**🧠 뭘 기억해야 해?**
→ C++ 에선: **멤버 변수**

**⚙️ 뭘 할 줄 알아야 해?**
→ C++ 에선: **멤버 함수**

이 둘을 한 정의로 묶는 것 — 이게 바로 **class** 예요.`,
        },
        {
          id: "ch1-build-skeleton",
          type: "explain",
          title: "🧱 class 는 이렇게 생겼어요",
          content: `class 는 이렇게 생겼어요:

\`\`\`
class 이름 {
    기억할 것들...   // 멤버 변수

    할 줄 아는 것들... // 멤버 함수
};
\`\`\`

\`class\` 키워드로 시작하고, 이름 쓰고, 중괄호로 감싸요.
**멤버 변수** 는 위에, **멤버 함수** 는 아래에.`,
        },
        {
          id: "ch1-build-design",
          type: "explain",
          title: "🚗 Car class 설계하기",
          content: `코드 짜기 전에, Car 에 뭐가 필요한지 정해봐요.

**기억할 것** 으로는 — 움직이려면 **속도** 가 필요하고, 자동차끼리 구분하려면 **색깔** 도 있어야겠죠.

**할 줄 아는 것** 으로는 — 앞으로 가는 함수, 그리고 지금 상태 확인하는 함수 정도면 시작하기 괜찮겠어요.

이건 하나의 생각 방식일 뿐이에요. 만들다 보면 더 필요한 게 생길 수도 있고, 몇 개는 안 쓸 수도 있어요.`,
        },
        {
          id: "ch1-build-code",
          type: "explain",
          title: "✍️ Car class 써보기",
          layout: {
            left: `위쪽 — **멤버 변수** (기억할 것):
- \`double speed;\` — 소수점 가능
- \`string color;\` — 텍스트

아래 — **멤버 함수** (할 줄 아는 것):
- \`forward()\` — 속도 증가
- \`info()\` — 지금 상태 출력

> 🐍 **Python 에서 온 친구라면?**
> Python 은 \`self.speed\` 써야 하지만
> C++ 은 그냥 \`speed\` 로 바로 써요.

아직 자동차가 만들어진 건 아니에요 — 설계도만 그린 거예요.`,
            right: `\`\`\`cpp
class Car {
    double speed;
    string color;

    void forward() {
        speed += 10;
    }
    void info() {
        cout << color << " car, speed: "
             << speed << endl;
    }
};
\`\`\``
          },
        },
        {
          id: "ch1-object-concept",
          type: "explain",
          title: "🎮 class 는 설계도, object 는 진짜!",
          content: `방금 Car class 를 만들었으니까 — 자동차가 있는 걸까요?

아니요. class 는 **설계도** 예요. 실제 자동차를 만들려면 한 단계 더 필요해요.

RPG 게임 생각해봐요 — 상점에서 "불꽃검" **설명** 본다고 내 것이 되진 않아요. **실제로 사거나 줍거나** 해야 인벤토리에 나타나죠.

|  | 게임 | 프로그래밍 |
|---|---|---|
| 아이템 **설명** | 불꽃검 정보 | **class** |
| **실제로 가진** 아이템 | 인벤토리의 검 | **object** |

class 에서 만들어낸 걸 **객체 (object)** 또는 **인스턴스 (instance)** 라고 해요.`,
        },
        {
          id: "ch1-object-code",
          type: "explain",
          title: "🚗 객체 만들고 써보기",
          content: `\`\`\`cpp
int main() {
    Car myCar;            // ← 여기서 실제 자동차 (객체) 가 만들어져요!
    myCar.color = "red";
    myCar.speed = 0;
    myCar.forward();
    myCar.forward();
    myCar.info();         // red car, speed: 20
}
\`\`\`

설계도 하나로 여러 대 가능:

\`\`\`cpp
int main() {
    Car car1;  car1.color = "red";    // 객체 1
    Car car2;  car2.color = "blue";   // 객체 2
}
\`\`\`

> 🍪 **쿠키 틀 = class, 쿠키 = object**
> 틀 하나로 쿠키 여러 개 — class 하나로 객체 여러 개.

**class 를 설계하고 거기서 객체를 만들어내는 것** — 이런 프로그래밍 방식을 **객체 지향 프로그래밍 (OOP)** 이라고 해요.

{collapse:📦 보너스 — class 가 없다면?}
\`\`\`cpp
// class 없이 자동차 두 대 만들면...
int main() {
    double car1Speed = 0;
    string car1Color = "red";
    double car2Speed = 0;
    string car2Color = "blue";

    car1Speed += 10;
    car2Speed += 10;

    // 코드 늘어나면... 어? car2Color 는 누구 건지 헷갈림
    cout << car1Color << " car, speed: " << car1Speed << endl;
    cout << car2Color << " car, speed: " << car2Speed << endl;
}
// 10 대 되면? 변수 20 개 — 어느 게 누구 건지 놓침
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
    c.color = "blue";
    c.speed = 0;
    c.forward();
    c.forward();
    c.info();
    return 0;
}`,
          options: ["blue 20", "blue 0", "blue 10", "에러"],
          answer: 0,
          explanation: "forward() 가 두 번 호출되니까 speed 가 0→10→20. info() 가 color 와 speed 출력. 메서드 안에서 color, speed 를 바로 써요 — self 필요 없음!"
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "멤버 함수 완성하기!",
          content: "메서드 안에서 멤버 변수에 바로 접근 — `self` 필요 없음!",
          code: `class Car {
    double speed;
    void forward() {
        ___ += 10;   // speed 를 10 증가
    }
};`,
          fillBlanks: [
            { id: 0, answer: "speed", options: ["speed", "self.speed", "Car.speed", "this.speed"] }
          ],
          explanation: "C++ 에선 Python 의 self.speed 와 달리 그냥 speed 써요! 메서드 안에서 클래스의 자기 멤버 변수에 바로 접근 가능."
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "class 가 뭐예요?",
          content: "class 에 대한 설명으로 **맞는** 것은?",
          options: [
            "class 는 변수(데이터) 만 담을 수 있고, 함수는 못 담는다",
            "class 안의 메서드는 자기 멤버에 접근할 수 없다",
            "class 는 데이터와 함수를 한 번에 묶어 내 타입을 만든다",
            "class 로 만든 변수는 점(.) 표기법을 못 쓴다"
          ],
          answer: 2,
          explanation: "class 는 데이터(변수) 와 함수(메서드) 를 묶어서 내 타입을 만들어요! Dog d; d.bark(); 처럼 점 표기법으로 접근해요."
        },
      ]
    },
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
          title: "🚪 그럼 막힌 값은 어떻게 쓰나요?",
          content: `방금 퀴즈에서 봤듯이 \`private\` 멤버는 밖에서 직접 건드리면 컴파일 에러예요. 그럼 잔액을 **아예 못 보는** 걸까요?

아니에요 — **창구**를 통해서 쓰는 거예요.

내 방에 있는 물건을 남이 마음대로 가져가면 싫잖아요. 그래서 문을 잠가요 (\`private\`).

근데 친구가 필요하면? **노크하고 부탁하면** 꺼내줄게요 → 이게 **getter**예요.
뭔가 넣고 싶으면? **나한테 말하면** 확인하고 넣어줄게요 → 이게 **setter**예요.

class도 똑같아요. 읽기/쓰기 함수를 \`public\`에 넣어서 통제된 창구를 만들어요.`,
        },
        {
          id: "ch2-getter-setter-code",
          type: "explain",
          title: "📋 getter / setter 써보기",
          content: `Car class에 getter/setter를 달아볼게요:

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

값을 **읽는** 함수가 **getter**, 값을 **설정하는** 함수가 **setter**예요.

setter 안에서 \`if\`로 **잘못된 값을 거부**할 수 있다는 게 포인트. 외부에서 막 바꿀 때와 다르게, 이제 class가 값을 **지킬 수 있어요.**`,
        },
        {
          id: "ch2-encapsulation",
          type: "explain",
          title: "🔒 캡슐화 — 이게 전부예요",
          content: `실제로 써보면 이렇게 돼요:

\`\`\`cpp
int main() {
    Car myCar;
    myCar.setColor("빨간색");
    myCar.setSpeed(-999);     // 음수라서 무시돼요
    cout << myCar.getSpeed(); // 0 (바뀌지 않음)
}
\`\`\`

\`setSpeed(-999)\`를 호출해도 내부에서 \`if\`가 막아줘서 speed가 0 그대로예요.

@핵심: \`private\`으로 막고, getter/setter로 통제된 창구를 만드는 것 — 이게 **캡슐화(encapsulation)** 예요.

그런데 매번 \`setColor\`, \`setSpeed\`를 직접 불러서 초기화하는 건 좀 번거롭지 않나요? 객체를 만들 때 **한 번에** 값을 정하는 방법이 있어요. 다음 챕터에서 볼게요.`,
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
          content: `앞 챕터에서 말한 **"객체 만들 때 한 번에 값 정하는 방법"** — 그게 바로 **생성자(constructor)** 예요.

사람도 태어나는 순간 이름이 있고 성별이 있잖아요. 객체도 생기는 순간 처음부터 세팅되어 있어야 자연스럽죠.

**객체가 만들어지는 순간 자동으로 호출되는 함수** — 이게 생성자예요.

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
          hint: `private에 string owner; double balance; 선언. 생성자는 BankAccount(string name, double initial) { owner = name; balance = initial; }. deposit은 if(amount > 0) balance += amount; withdraw는 if(amount > 0 && amount <= balance) balance -= amount;`,
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
