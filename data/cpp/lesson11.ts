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
          content: `파이썬에서 문자열 길이를 구할 때 \`len()\`을 썼죠? C++에서는 **메서드**를 사용해요!

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
          content: `파이썬의 슬라이싱, find, replace에 대응하는 C++ 메서드들이에요!

**파이썬 🐍:**
\`\`\`python
s = "Hello World"
print(s[0:5])         # "Hello" (슬라이싱)
print(s.find("World")) # 6
print(s.replace("World", "C++"))  # "Hello C++"
\`\`\`

**C++ ⚡:**
\`\`\`cpp
string s = "Hello World";
cout << s.substr(0, 5) << endl;    // "Hello"
cout << s.find("World") << endl;   // 6
s.replace(6, 5, "C++");            // s가 "Hello C++"로 변경!
cout << s << endl;                  // "Hello C++"
\`\`\`

| 파이썬 🐍 | C++ ⚡ | 설명 |
|---|---|---|
| \`s[a:b]\` | \`s.substr(pos, len)\` | 부분 문자열 (위치, **길이**!) |
| \`s.find("x")\` | \`s.find("x")\` | 찾기 (같아요!) |
| \`s.replace("a","b")\` | \`s.replace(pos, len, "b")\` | 교체 (위치 기반!) |

⚠️ 중요한 차이: C++의 \`substr\`과 \`replace\`는 **위치와 길이**를 사용해요! 파이썬처럼 문자열로 검색하는 게 아니에요.

만약 \`find()\`로 못 찾으면?
\`\`\`cpp
string s = "Hello";
size_t pos = s.find("xyz");
if (pos == string::npos) {
    cout << "못 찾았어요!" << endl;
}
\`\`\`
파이썬은 \`-1\`을 리턴하지만, C++은 \`string::npos\`라는 특별한 값을 리턴해요!

💡 find와 substr을 조합하면 파이썬의 슬라이싱처럼 쓸 수 있어요!`
        },
        {
          id: "ch1-fb1",
          type: "fillblank" as const,
          title: "빈칸을 채워주세요",
          content: "문자열의 길이와 부분을 구해봐요!",
          code: "string s = \"Programming\";\ncout << s.___() << endl;\ncout << s.___(0, 7) << endl;",
          fillBlanks: [
            { id: 0, answer: "length", options: ["length", "len", "count", "sizeof"] },
            { id: 1, answer: "substr", options: ["substr", "slice", "sub", "cut"] }
          ],
          explanation: "s.length()로 길이를 구하고, s.substr(0, 7)로 0번째부터 7글자를 잘라내요! \"Program\"이 출력돼요."
        },
        {
          id: "ch1-practice",
          type: "practice" as const,
          title: "✋ 단어 위치 찾기 프로그램!",
          content: `문자열에서 특정 단어의 위치를 찾아보세요!

find()로 위치를 구한 뒤, substr()로 그 위치부터 잘라내는 프로그램이에요.`,
          code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string sentence = "I love C++ programming";
    string word = "C++";

    size_t pos = sentence.find(word);

    if (pos != string::npos) {
        cout << "\"" << word << "\" found at position " << pos << endl;
        cout << "From there: " << sentence.substr(pos) << endl;
    } else {
        cout << "Not found!" << endl;
    }

    return 0;
}`,
          expectedOutput: `"C++" found at position 7
From there: C++ programming`
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

⚠️ \`toupper()\`, \`tolower()\`는 **한 글자(char)**에만 동작해요! 파이썬의 \`.upper()\`처럼 문자열 전체를 한 번에 바꾸지는 못해요.

전체 문자열을 대문자로 바꾸려면 for 루프를 써야 해요:
\`\`\`cpp
string s = "hello";
for (auto& c : s) {
    c = toupper(c);
}
// s는 이제 "HELLO"
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
          content: `이름을 정의하고, 길이와 첫 글자를 출력한 뒤, 나이를 문자열로 변환해서 메시지를 만들어보세요!

to_string()과 문자열 연결(+)을 활용해요.`,
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
          title: "문자열 합치기!",
          content: "다음 중 C++ string 연산으로 **올바르지 않은** 것은?",
          options: [
            "string s = \"Hi\" + \" there\";",
            "string s = \"Hi\"; s += \" there\";",
            "string a = \"Hi\"; string b = a + \" there\";",
            "string s = \"Hi\"; s = s + \" there\";"
          ],
          answer: 0,
          explanation: "\"Hi\" + \" there\"는 둘 다 C 문자열(const char*)이라 직접 + 연산이 안 돼요! 최소 하나가 string 타입이어야 해요."
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
