// ============================================
// C++ Lesson 11: 문자열 심화
// 파이썬을 아는 학생을 위한 C++ 강의
// ============================================
import { LessonData } from '../types'

export const cppLesson11Data: LessonData = {
  id: "cpp-11",
  title: "문자열 심화",
  emoji: "🔤",
  description: "C++ string의 다양한 기능!",
  chapters: [
    // ============================================
    // Chapter 1: string 메서드
    // ============================================
    {
      id: "ch1",
      title: "string 메서드",
      emoji: "📏",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📏 문자열 길이와 접근!",
          component: "cppStringBuilder",
          content: `채팅 앱을 만든다고 생각해보세요. '@홍길동'을 찾아서 알림을 보내야 하고, 욕설을 '***'로 바꿔야 하고, 메시지 길이가 100자를 넘는지 확인해야 해요. 이 모든 게 **문자열 조작**이에요!

파이썬에서 문자열은 간단했죠? \`.upper()\`, \`.split()\`, 슬라이싱... C++의 string은 비슷하지만 **주의할 점**이 더 많아요!

파이썬에서 문자열 길이를 구할 때 \`len()\`을 썼죠? C++에서는 **메서드**를 사용해요!

**파이썬 🐍:**
\`\`\`python
name = "Hello"
print(len(name))    # 5
print(name[0])      # H
print(name[1])      # e
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string name = "Hello";
cout << name.length() << endl;  // 5
cout << name.size() << endl;    // 5 (같은 결과!)
cout << name[0] << endl;        // H
cout << name.at(1) << endl;     // e
\`\`\`

| 파이썬 🐍 | C++ ⚡ | 설명 |
|---|---|---|
| \`len(s)\` | \`s.length()\` 또는 \`s.size()\` | 길이 |
| \`s[0]\` | \`s[0]\` 또는 \`s.at(0)\` | 인덱싱 |

\`[]\`와 \`.at()\`의 차이는 뭘까요?
\`\`\`cpp
string s = "Hi";
// s[100]   — 범위를 벗어나도 에러 없이 이상한 값!
// s.at(100) — 범위를 벗어나면 에러를 알려줘요! (더 안전)
\`\`\`

💡 \`.at()\`이 더 안전하지만, \`[]\`가 더 빨라서 둘 다 많이 써요!`
        },
        {
          id: "ch1-pred1",
          type: "predict" as const,
          title: "문자열 길이 출력!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string msg = \"C++ is fun!\";\n    cout << msg.length() << endl;\n    cout << msg[0] << msg[4] << endl;\n    return 0;\n}",
          options: ["11\nCi", "10\nC+", "11\nC ", "10\nCi"],
          answer: 0,
          explanation: "\"C++ is fun!\"은 공백과 느낌표 포함 11글자예요! msg[0]='C', msg[4]='i' (0부터 세면 C,+,+, ,i)이므로 \"Ci\"가 출력돼요."
        },
        {
          id: "ch1-methods",
          type: "explain",
          title: "🔍 substr, find, replace!",
          component: "stringMethodVisualizer",
          content: `파이썬의 슬라이싱·find·replace에 대응하는 C++ 메서드 3가지예요. 직접 조작해보세요!

**탭별 핵심 포인트:**
- **substr(pos, len)** — 시작 위치 + **길이** (파이썬 s[a:b]의 끝 인덱스가 아니에요!)
- **find("x")** — 위치 반환. 못 찾으면 \`string::npos\` (파이썬의 -1 대신!)
- **replace(pos, len, "new")** — 위치 기반 교체 (파이썬처럼 문자열로 검색하지 않아요)`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: `\`"Programming"\`의 **글자 수**와 **앞 7글자**를 출력하는 코드예요.

빈칸을 채우면 이렇게 출력돼요:
\`\`\`
11
Program
\`\`\``,
          code: "string s = \"Programming\";\ncout << s.___() << endl;\ncout << s.___(0, 7) << endl;",
          fillBlanks: [
            { id: 0, answer: "length", options: ["length", "len", "count", "sizeof"] },
            { id: 1, answer: "substr", options: ["substr", "slice", "sub", "cut"] }
          ],
          explanation: "s.length()는 문자열 길이 → 11 출력. s.substr(0, 7)은 0번 위치부터 7글자 → \"Program\" 출력!"
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 서버 로그 분석기",
          content: `서버가 기록한 로그를 분석하는 프로그램을 만들어요.

아래 로그가 저장되어 있어요:
\`string log = "2024-01-15 ERROR server connection failed";\`

1. "ERROR"가 있으면 몇 번째 위치인지, 그리고 ERROR 이후 메시지를 출력해요
2. "CRITICAL"이 있는지 확인하고, 없으면 "CRITICAL 없음: 정상 범위"를 출력해요
3. 날짜(앞 10글자)를 출력해요`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string log = "2024-01-15 ERROR server connection failed";

    // "ERROR" 검색
    size_t pos = log.find("ERROR");
    if (pos != string::npos) {
        cout << "오류 발견! 위치: " << pos << endl;
        cout << "오류 메시지: " << log.substr(pos + 6) << endl;
    }

    // "CRITICAL" 검색
    size_t pos2 = log.find("CRITICAL");
    if (pos2 == string::npos) {
        cout << "CRITICAL 없음: 정상 범위" << endl;
    }

    // 날짜 추출
    cout << "날짜: " << log.substr(0, 10) << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string log = "2024-01-15 ERROR server connection failed";

    // 1. "ERROR" 위치를 find()로 찾고, substr()로 ERROR 이후 메시지를 출력하세요
    //    출력 형식: "오류 발견! 위치: XX" + "오류 메시지: ..."

    // 2. "CRITICAL"을 find()로 검색하고, 없으면 "CRITICAL 없음: 정상 범위"를 출력하세요

    // 3. substr(0, 10)으로 날짜를 추출해서 출력하세요

    return 0;
}`,
          hint: "size_t pos = log.find(\"ERROR\")로 위치를 찾고, pos != string::npos로 존재 확인해요. substr(pos + 6)은 ERROR(5글자) + 공백(1) 이후 문자열이에요",
          expectedOutput: `오류 발견! 위치: 11
오류 메시지: server connection failed
CRITICAL 없음: 정상 범위
날짜: 2024-01-15`
        },
        {
          id: "ch1-q1",
          type: "quiz",
          title: "string 메서드!",
          content: "`string s = \"abcdef\";`일 때, `s.substr(2, 3)`의 결과는?",
          options: [
            "\"ab\"",
            "\"abc\"",
            "\"cde\"",
            "\"cdef\""
          ],
          answer: 2,
          explanation: "substr(2, 3)은 2번 위치(c)부터 3글자를 가져와요! 그래서 \"cde\"가 돼요. 파이썬의 s[2:5]와 같아요."
        }
      ]
    },
    // ============================================
    // Chapter 2: string 연산
    // ============================================
    {
      id: "ch2",
      title: "string 연산",
      emoji: "✂️",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "✂️ 문자열 연결과 비교!",
          content: `파이썬에서 문자열을 합칠 때 \`+\`를 썼죠? C++도 같아요!

**파이썬 🐍:**
\`\`\`python
first = "Hello"
last = " World"
msg = first + last    # "Hello World"
msg += "!"            # "Hello World!"
print(msg)
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string first = "Hello";
string last = " World";
string msg = first + last;    // "Hello World"
msg += "!";                   // "Hello World!"
cout << msg << endl;
\`\`\`

완전히 같죠! 비교도 마찬가지예요:

\`\`\`cpp
string a = "apple";
string b = "banana";

if (a == b) cout << "같아요!" << endl;
if (a < b)  cout << "a가 앞이에요!" << endl;   // 사전순!
if (a > b)  cout << "b가 앞이에요!" << endl;
if (a != b) cout << "달라요!" << endl;
\`\`\`

| 연산 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 합치기 | \`s1 + s2\` | \`s1 + s2\` (같아요!) |
| 덧붙이기 | \`s += "x"\` | \`s += "x"\` (같아요!) |
| 같은지 | \`s1 == s2\` | \`s1 == s2\` (같아요!) |
| 사전순 비교 | \`s1 < s2\` | \`s1 < s2\` (같아요!) |

💡 문자열 연산은 파이썬과 C++이 거의 똑같아요! 제일 쉬운 부분이에요.`
        },
        {
          id: "ch2-pred1",
          type: "predict" as const,
          title: "문자열 비교 결과!",
          code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string a = \"apple\";\n    string b = \"banana\";\n    if (a < b) {\n        cout << a << \" comes first\" << endl;\n    } else {\n        cout << b << \" comes first\" << endl;\n    }\n    cout << a + \" and \" + b << endl;\n    return 0;\n}",
          options: [
            "apple comes first\napple and banana",
            "banana comes first\napple and banana",
            "apple comes first\napplebanana",
            "에러"
          ],
          answer: 0,
          explanation: "사전순으로 \"apple\" < \"banana\"이므로 (a가 b보다 앞) \"apple comes first\"가 출력돼요. + 연산으로 문자열도 잘 합쳐져요!"
        },
        {
          id: "ch2-convert",
          type: "explain",
          title: "🔄 문자열 ↔ 숫자 변환!",
          content: `파이썬에서 \`str()\`, \`int()\`, \`float()\`로 타입을 바꿨죠? C++에도 비슷한 함수가 있어요!

**파이썬 🐍:**
\`\`\`python
num = 42
s = str(num)        # "42"
back = int("123")   # 123
pi = float("3.14")  # 3.14
\`\`\`

**C++ ⚡:**
\`\`\`cpp
int num = 42;
string s = to_string(num);     // "42"
int back = stoi("123");        // 123  (string to int)
double pi = stod("3.14");      // 3.14 (string to double)
\`\`\`

| 파이썬 🐍 | C++ ⚡ | 의미 |
|---|---|---|
| \`str(42)\` | \`to_string(42)\` | 숫자 → 문자열 |
| \`int("123")\` | \`stoi("123")\` | 문자열 → 정수 |
| \`float("3.14")\` | \`stod("3.14")\` | 문자열 → 실수 |

그리고 한 글자를 대문자/소문자로 바꾸는 함수도 있어요:

\`\`\`cpp
char c = 'a';
cout << (char)toupper(c) << endl;  // 'A'
cout << (char)tolower('Z') << endl; // 'z'
\`\`\`

⚠️ toupper()와 tolower()는 **한 글자(char)**에만 써요! 전체 문자열을 바꾸려면 range-for 루프를 돌려야 해요. 파이썬의 \`.upper()\`처럼 문자열 전체를 한 번에 바꾸지는 못해요.

전체 문자열을 대문자로 바꾸려면? for 루프가 필요해요:
\`\`\`cpp
string s = "hello";
for (char& c : s) {
    c = toupper(c);
}
cout << s;  // HELLO
\`\`\`

💡 stoi = **s**tring **to** **i**nt, stod = **s**tring **to** **d**ouble로 기억하면 쉬워요!`
        },
        {
          id: "ch2-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "숫자와 문자열을 변환해봐요!",
          code: "int score = 95;\nstring msg = \"Score: \" + ___(score);\nint num = ___(\"200\");",
          fillBlanks: [
            { id: 0, answer: "to_string", options: ["to_string", "str", "string", "toString"] },
            { id: 1, answer: "stoi", options: ["stoi", "int", "toInt", "atoi"] }
          ],
          explanation: "to_string(score)로 95를 \"95\"로 바꿔서 문자열과 합치고, stoi(\"200\")로 문자열 \"200\"을 정수 200으로 바꿔요!"
        },
        {
          id: "ch2-practice",
          type: "practice" as const,
          title: "✋ 이름 분석 프로그램!",
          content: `학생 정보 시스템에서 이름 데이터를 분석해야 해요.
\`string name = "Alice"\`, \`int age = 15\`가 주어졌을 때, 아래 정보를 출력하는 코드를 완성해봐요:

- 이름 전체: \`Name: Alice\`
- 이름의 글자 수: \`Length: 5\`
- 이름의 첫 글자: \`First letter: A\`
- 이름과 나이를 합친 소개 문장: \`Alice is 15 years old\``,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 15;

    cout << "Name: " << name << endl;
    cout << "Length: " << name.length() << endl;
    cout << "First letter: " << name[0] << endl;

    string info = name + " is " + to_string(age) + " years old";
    cout << info << endl;

    return 0;
}`,
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 15;

    // "Name: Alice" 출력

    // "Length: 5" 출력 (name.length() 사용)

    // "First letter: A" 출력 (name[0] 사용)

    // "Alice is 15 years old" 출력

    return 0;
}`,
          hint: "name.length()는 글자 수, name[0]는 첫 글자예요. 마지막 문장은 name + \" is \" + to_string(age) + \" years old\" 처럼 to_string()으로 숫자를 문자열로 변환해서 + 로 이어붙여요",
          expectedOutput: `Name: Alice
Length: 5
First letter: A
Alice is 15 years old`
        },
        {
          id: "ch2-q1",
          type: "quiz",
          title: "문자열 변환!",
          content: "C++에서 문자열 `\"456\"`을 정수로 바꾸는 올바른 방법은?",
          options: [
            "int(\"456\")",
            "stoi(\"456\")",
            "toInt(\"456\")",
            "(int)\"456\""
          ],
          answer: 1,
          explanation: "stoi()는 string to int의 약자예요! 파이썬의 int()와 같은 역할을 해요."
        }
      ]
    },
    // ============================================
    // Chapter 3: 정리 퀴즈
    // ============================================
    {
      id: "ch3",
      title: "정리 퀴즈",
      emoji: "🏆",
      steps: [
        {
          id: "ch3-q1",
          type: "quiz",
          title: "길이 구하기!",
          content: "`string s = \"Hello\";`일 때, 길이를 구하는 **올바른** 방법을 **모두** 포함하는 것은?",
          options: [
            "s.length()만 가능",
            "s.size()만 가능",
            "s.length()와 s.size() 둘 다 가능",
            "len(s)로 구한다"
          ],
          answer: 2,
          explanation: "C++에서는 .length()와 .size() 둘 다 같은 결과를 줘요! 파이썬의 len(s)와 달라요."
        },
        {
          id: "ch3-q2",
          type: "quiz",
          title: "find 결과!",
          content: "`string s = \"Hello World\";`에서 `s.find(\"xyz\")`의 결과는?",
          options: [
            "-1",
            "0",
            "string::npos",
            "에러 발생"
          ],
          answer: 2,
          explanation: "C++에서 find()가 문자열을 못 찾으면 string::npos를 리턴해요! 파이썬의 -1과는 달라요."
        },
        {
          id: "ch3-q3",
          type: "quiz",
          title: "find 결과 확인하기!",
          content: "`s.find(\"apple\")`로 찾기에 실패했을 때를 올바르게 처리하는 코드는?",
          options: [
            "if (s.find(\"apple\") != string::npos)",
            "if (s.find(\"apple\") != -1)",
            "if (s.find(\"apple\") == false)",
            "if (s.find(\"apple\") == 0)"
          ],
          answer: 0,
          explanation: "find()가 실패하면 string::npos를 반환해요. 파이썬은 -1을 반환하지만 C++는 string::npos예요. 그래서 `!= string::npos`로 성공 여부를 확인해야 해요!"
        },
        {
          id: "ch3-q4",
          type: "quiz",
          title: "타입 변환!",
          content: "`to_string(100) + to_string(200)`의 결과는?",
          options: [
            "300",
            "\"300\"",
            "\"100200\"",
            "에러"
          ],
          answer: 2,
          explanation: "to_string(100)은 \"100\", to_string(200)은 \"200\"이에요. 문자열끼리 + 하면 이어붙이기! \"100200\"이 돼요."
        },
        {
          id: "ch3-cheatsheet",
          type: "explain",
          title: "📋 string 명령어 한눈에",
          content: `시험이나 문제 풀 때 옆에 띄워놓고 보세요.

### 🧰 string 자주 쓰는 명령어

| 명령 | 하는 일 |
|---|---|
| \`s.length()\` / \`s.size()\` | 길이 |
| \`s.empty()\` | 비었나? |
| \`s[i]\` | i 번째 문자 |
| \`s + t\` / \`s += t\` | 이어붙이기 |
| \`s.substr(pos, len)\` | 부분 문자열 |
| \`s.find(t)\` | 위치 찾기 (없으면 \`string::npos\`) |
| \`s.replace(pos, len, t)\` | 교체 |
| \`s.insert(pos, t)\` | 삽입 |
| \`s.erase(pos, len)\` | 삭제 |
| \`stoi(s)\` / \`stod(s)\` | 숫자로 변환 |
| \`to_string(n)\` | 숫자 → 문자열 |
| \`getline(cin, s)\` | 한 줄 통째로 입력 |

### 🔁 순회

\`\`\`cpp
for (char c : s) cout << c;
for (int i = 0; i < (int)s.length(); i++) cout << s[i];
\`\`\`

> 💡 한 글자는 작은따옴표 \`'a'\`, 문자열은 큰따옴표 \`"a"\`. 섞으면 컴파일 에러!

---

> 📌 **전체 STL 치트시트 (PDF 다운로드 가능):**
> 👉 [**\`/reference/cpp-stl#string\` 에서 보기**](/reference/cpp-stl#string)`
        },
        {
          id: "ch3-summary",
          type: "explain",
          title: "🎯 오늘 배운 것!",
          content: `## ✅ 오늘의 정리!

- ✅ **길이** — \`.length()\` / \`.size()\`로 구해요 (파이썬의 \`len()\`)
- ✅ **접근** — \`s[i]\` 또는 \`s.at(i)\`로 한 글자씩 접근해요
- ✅ **부분 문자열** — \`s.substr(pos, len)\`으로 잘라내요 (파이썬 슬라이싱)
- ✅ **찾기** — \`s.find("x")\`로 위치를 찾고, 못 찾으면 \`string::npos\`
- ✅ **교체** — \`s.replace(pos, len, "new")\`로 바꿔요
- ✅ **연결 & 비교** — \`+\`, \`+=\`, \`==\`, \`<\`, \`>\` 모두 파이썬과 같아요!
- ✅ **변환** — \`to_string()\`, \`stoi()\`, \`stod()\`로 타입 변환해요

| 하고 싶은 것 | 파이썬 🐍 | C++ ⚡ |
|---|---|---|
| 길이 | \`len(s)\` | \`s.length()\` |
| 슬라이싱 | \`s[2:5]\` | \`s.substr(2, 3)\` |
| 찾기 | \`s.find("x")\` | \`s.find("x")\` |
| 숫자→문자열 | \`str(42)\` | \`to_string(42)\` |
| 문자열→숫자 | \`int("42")\` | \`stoi("42")\` |

🚀 **다음 시간 예고:** 더 다양한 C++ 기능들을 배워봐요!`
        }
      ]
    }
  ]
}
