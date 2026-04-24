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
          content: `\`int\` 로 정수, \`string\` 으로 문자열을 만들 수 있죠. 그럼 **자동차**는요? C++ 엔 자동차 타입이 없어요. **직접 만들어야 해요.**

근데 막상 만들려고 하니 쉽지 않아요. 자동차엔 바퀴, 엔진, 연료, 색깔, 속도, 문... 떠올릴수록 끝이 없거든요. 이걸 다 나열하려 들면 오히려 제일 중요한 걸 빠뜨리기 쉬워요.

그래서 딱 두 가지만 물어보면 돼요:

**🧠 뭘 기억해야 해?**
→ C++ 에선 **멤버 변수** 라고 해요.

**⚙️ 뭘 할 줄 알아야 해?**
→ C++ 에선 **멤버 함수** 예요.

이 둘을 한 정의로 묶은 것 — 그게 바로 **class** 예요.`,
        },
        {
          id: "ch1-build-skeleton",
          type: "explain",
          title: "🧱 class 는 이렇게 생겼어요",
          component: "cppClassBasicBuilder",
          content: `아래 시뮬레이터의 **"다음"** 버튼을 눌러 class 틀을 한 단계씩 조립해봐요 👇

1. \`class\` **키워드** 로 시작
2. **이름** — 관례상 **대문자** 로 시작 (Car, Dog, Student...)
3. \`{ }\` **중괄호** 로 감싸고, 끝에 \`;\` 붙이기
4. 중괄호 안: **멤버 변수** 는 위에, **멤버 함수** 는 아래에`,
        },
        {
          id: "ch1-build-design",
          type: "explain",
          title: "🚗 진짜 Car 를 만들어볼까요?",
          content: `틀은 봤으니까, 이제 **Car** class 를 실제로 만들어봐요.

코드 짜기 전에 뭐가 필요한지 정해봐요:

| | 뭐가 필요? | 이유 |
|---|---|---|
| 🧠 **기억할 것** | \`speed\` (속도) | 움직이려면 필요 |
| | \`color\` (색깔) | 자동차끼리 구분 |
| ⚙️ **할 줄 아는 것** | \`forward()\` | 앞으로 가기 |
| | \`info()\` | 지금 상태 확인 |

@핵심: 하나의 예시일 뿐! 만들다 보면 더 필요한 게 생기기도, 몇 개는 안 쓸 수도 있어요.`,
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
> C++ 은 그냥 \`speed\` 로 바로 써요.`,
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
          title: "그럼 막힌 값은 어떻게 읽고 바꿔요?",
          content: `방금 \`private\` 으로 잔액을 막았어요. 근데 그게 "아무도 못 본다" 는 뜻은 아니에요 — **창구** 를 통해서 쓰는 거예요.

이렇게 생각해봐요. 내 방에 물건이 있어요. 아무나 막 들어와서 가져가면 싫잖아요? 그래서 **문을 잠가요** (\`private\`).

근데 친구가 필요하면? **노크하고 부탁** → 내가 꺼내줌 → 이게 **getter**.
뭔가 넣고 싶으면? **나한테 말함** → 내가 확인하고 받음 → 이게 **setter**.

class 도 똑같아요. 멤버 변수는 private 으로 막아둔다고 했죠 — 근데 \`speed\` 를 읽거나 바꿔야 하면요?

**public 멤버 함수를 통해서** 접근해요.

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
    myCar.setColor("red");
    myCar.setSpeed(-999);    // 음수 → 무시됨
    cout << myCar.getSpeed(); // 0 (바뀌지 않음)
}
\`\`\`

값을 **읽는** 함수가 **getter**, 값을 **설정하는** 함수가 **setter** 예요.
핵심 포인트: setter 에서 **잘못된 값을 거부** 할 수 있어요.

@핵심: \`private\` 으로 막고, getter/setter 로 통제된 창구를 만드는 것 — 이게 **캡슐화 (encapsulation)** 예요.

근데 하나 궁금한 게 남아요 — 객체 만들 때마다 초기값 세팅하려고 setter 를 **매번 불러야** 할까요? 더 나은 방법이 있을까요?`,
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
          id: "ch3-constructor-anim",
          type: "interactive",
          title: "🎬 생성자 있을 때 vs 없을 때",
          description: "탭을 넘기면서 생성자가 뭘 하는지 봐요.",
          component: "constructorVisualizer",
        },
        {
          id: "ch3-garbage-p1",
          type: "predict" as const,
          title: "🔍 함수 안의 int 는 어떤 값?",
          code: `int main() {
    int a;        // 초기화 안 함
    cout << a;
    return 0;
}`,
          options: ["0 이 출력", "5 가 출력", "예측 불가 값 (쓰레기값)", "컴파일 에러"],
          answer: 2,
          explanation: "함수 안의 **지역 변수** 는 메모리에 남아있던 랜덤 바이트를 그대로 가져요 — 쓰레기값. 매번 실행할 때마다 다름. C++ 은 속도를 위해 자동 초기화를 생략해요."
        },
        {
          id: "ch3-garbage-p2",
          type: "predict" as const,
          title: "🔍 전역 int 는?",
          code: `int a;   // 전역 변수 (main 바깥)

int main() {
    cout << a;
    return 0;
}`,
          options: ["0 출력", "쓰레기값", "컴파일 에러", "런타임 에러"],
          answer: 0,
          explanation: "**전역** 과 **static** 변수는 자동으로 0 으로 초기화돼요. 쓰레기값 문제는 지역 변수만. \`static int a;\` 도 0 이에요!"
        },
        {
          id: "ch3-garbage-p3",
          type: "predict" as const,
          title: "🔍 `int a{};` — 중괄호는 뭐?",
          code: `int main() {
    int a{};      // 중괄호 초기화!
    cout << a;
    return 0;
}`,
          options: ["0 출력", "쓰레기값", "에러 (초기값 안 줌)", "1 출력"],
          answer: 0,
          explanation: "빈 중괄호 `{}` 는 **값 초기화 (value-initialization)** 를 발동 — int 는 무조건 0. 보통 `int a = 0;` 으로 쓰지만 `int a{};` 도 0 보장."
        },
        {
          id: "ch3-garbage-p4",
          type: "predict" as const,
          title: "🔍 class 멤버 int 는?",
          code: `class Box {
public:
    int count;   // 초기화 안 함
};

int main() {
    Box b;
    cout << b.count;
    return 0;
}`,
          options: ["0 출력", "쓰레기값", "컴파일 에러", "\"\" 출력"],
          answer: 1,
          explanation: "생성자 없으면 **기본 타입 멤버** (int, double, char, bool) 는 지역 변수처럼 — 쓰레기값. 이게 바로 우리가 생성자가 필요한 이유예요!"
        },
        {
          id: "ch3-garbage-p5",
          type: "predict" as const,
          title: "🔍 string / vector 멤버는?",
          code: `class Box {
public:
    string label;        // 초기화 안 함
    vector<int> items;   // 초기화 안 함
};

int main() {
    Box b;
    cout << b.label.length() << " "
         << b.items.size();
    return 0;
}`,
          options: ["쓰레기값 두 개", "0 0", "에러", "\"\" 0"],
          answer: 1,
          explanation: "**클래스 타입** (string, vector, map 등) 은 자체 기본 생성자가 있어서 자동 초기화돼요. string 은 빈 문자열 (`\"\"`, 길이 0), vector 는 빈 벡터 (size 0). 쓰레기값 없음!"
        },
        {
          id: "ch3-garbage-summary",
          type: "explain",
          title: "📋 쓰레기값 — 정리표",
          layout: {
            left: `**기본 타입** (int, double, char, bool, 포인터)

| 어디에 있나 | 초기값 |
|---|---|
| 함수 안 (지역) | 🎲 쓰레기값 |
| 함수 밖 (전역 / static) | ✅ 0 |
| class 멤버 (생성자 없음) | 🎲 쓰레기값 |
| \`int a{};\` (중괄호) | ✅ 0 |

**클래스 타입** (string, vector, map, ...)
→ 자체 기본 생성자 있어서 **항상 비어있게** 시작 (쓰레기값 걱정 없음)

**결론:** 기본 타입 멤버가 있는 class 는 **생성자가 반드시 필요해요**. 그게 바로 다음 단계.`,
            right: `\`\`\`cpp
// 초기값 한눈에 보는 치트시트

int a;              // 🎲 쓰레기값
int b{};            // ✅ 0
int c = 0;          // ✅ 0
static int d;       // ✅ 0 (static)

string s;           // ✅ ""
vector<int> v;      // ✅ []

class Box {
    int count;      // 🎲 쓰레기값
    string name;    // ✅ ""
};

Box b;
// b.count  → 쓰레기값
// b.name   → ""
\`\`\``
          },
        },
        {
          id: "ch3-constructor",
          type: "explain",
          title: "🔧 생성자 — 객체가 태어날 때 자동 호출!",
          component: "cppConstructorBuilder",
          content: `사람은 태어나는 순간 이미 이름이랑 성별이 있잖아요. 객체도 태어나는 순간부터 세팅돼 있어야 하지 않을까요?

그게 바로 **생성자** — **객체가 만들어지는 순간 자동으로 호출되는 함수**. 생성자 안에서 멤버를 초기화하면 쓰레기값 걱정 끝.

생성자를 한 단계씩 조립해봐요:`,
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
        else              balance = 0;   // 음수 입금은 막기
    }
};

BankAccount acc("Emma", 1000);  // 생성자 자동 호출!
\`\`\`

**Python 과 비교:**

|  | Python 🐍 | C++ ⚡ |
|---|---|---|
| 생성자 이름 | \`__init__\` | **클래스 이름과 동일** |
| 첫 매개변수 | \`self\` 필수 | 없음 |
| 리턴 타입 | 없음 | **없음 (void 도 아님!)** |`,
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
        cout << owner << ": $" << balance;
    }
};

int main() {
    BankAccount acc("Emma", 5000);
    acc.info();
    return 0;
}`,
          options: ["Emma: $5000", "에러", "$0", "Emma"],
          answer: 0,
          explanation: "BankAccount acc(\"Emma\", 5000) 에서 생성자가 자동 호출! owner = \"Emma\", balance = 5000 으로 초기화되고 info() 가 출력해요."
        },
        {
          id: "ch3-fb1",
          type: "fillblank" as const,
          title: "생성자 완성하기!",
          content: "생성자 안에서 매개변수 값(오른쪽) 을 멤버 변수(왼쪽) 에 저장해요.",
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
          explanation: "`seconds = s` — 왼쪽은 멤버 변수(seconds), 오른쪽은 매개변수(s). '받은 값을 멤버에 저장해' 라는 뜻이에요!"
        },
      ]
    },
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

**단계:**
1. \`private\` 에 \`owner\`(string), \`balance\`(double) 선언
2. 생성자: \`BankAccount(string name, double initial)\` — 초기화
3. \`getBalance()\` — balance 반환
4. \`deposit(double amount)\` — amount > 0 일 때만 balance 에 더하기
5. \`withdraw(double amount)\` — amount > 0 이고 amount ≤ balance 일 때만 빼기`,
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
