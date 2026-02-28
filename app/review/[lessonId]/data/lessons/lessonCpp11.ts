import { LessonData } from '../types';

export const lessonCpp11: LessonData = {
    id: "cpp-11",
    title: "문자열 심화",
    description: "string 메서드와 연산 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: string 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "string 메서드",
          desc: ".length(), .at(), .substr(), .find()를 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++ string에도 파이썬처럼 유용한 메서드가 많아요! 🔤",
            ".length()는 파이썬의 len()과 같아요."
          ],
          code: '#include <string>\nusing namespace std;\n\nstring s = "Hello";\ncout << s.length() << endl;  // 5\ncout << s[0] << endl;        // H\ncout << s.at(1) << endl;     // e',
          result: "5\nH\ne",
          note: ".length() = len() / s[i] 또는 s.at(i) = 각 글자 접근"
        }
      },

      // length 예측
      {
        type: "explain",
        content: {
          lines: [
            "공백도 글자 수에 포함돼요!",
            ".length()와 .size()는 같은 결과를 줘요."
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string msg = "Hi C++";\n    cout << msg.length() << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["4", "5", "6", "7"],
            answer: 2,
            feedback: "H, i, 공백, C, +, + → 6글자! 공백도 한 글자로 세요."
          }
        }
      },

      // Lv.1: length 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "문자열의 길이를 출력해요!",
          guide: "파이썬 len() = C++ .length()!",
          template: 'string s = "Hello";\ncout << s.___() << endl;',
          answer: "length",
          expect: 'string s = "Hello";\ncout << s.length() << endl;'
        }
      },

      // substr 설명
      {
        type: "explain",
        content: {
          lines: [
            ".substr(시작, 길이)로 부분 문자열을 잘라낼 수 있어요! ✂️",
            "파이썬의 s[시작:끝]과 비슷하지만, 두 번째 인자가 길이예요!"
          ],
          code: 'string s = "Hello World";\ncout << s.substr(0, 5) << endl;   // Hello\ncout << s.substr(6, 5) << endl;   // World\ncout << s.substr(6) << endl;      // World (끝까지)',
          result: "Hello\nWorld\nWorld",
          note: "substr(시작위치, 길이) — 파이썬 s[0:5]은 C++ s.substr(0, 5)"
        }
      },

      // Lv.1: substr 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: '"Hello World"에서 "Hello"만 꺼내요!',
          guide: "시작 0, 길이 5!",
          template: 'string s = "Hello World";\ncout << s.___(0, 5) << endl;',
          answer: "substr",
          expect: 'string s = "Hello World";\ncout << s.substr(0, 5) << endl;'
        }
      },

      // 퀴즈: substr vs 파이썬 슬라이싱
      {
        type: "quiz",
        content: {
          question: '파이썬 s[2:5]는 C++에서 어떻게 쓸까요?',
          options: [
            "s.substr(2, 5)",
            "s.substr(2, 3)",
            "s.slice(2, 5)",
            "s[2:5]"
          ],
          answer: 1,
          explanation: "파이썬 s[2:5]는 인덱스 2부터 3글자! C++은 substr(시작, 길이)이니까 s.substr(2, 3)!"
        }
      },

      // find 설명
      {
        type: "explain",
        content: {
          lines: [
            ".find()로 문자열 안에서 특정 문자를 찾을 수 있어요! 🔍",
            "파이썬의 .find()와 거의 같아요!"
          ],
          code: 'string s = "Hello World";\ncout << s.find("World") << endl;  // 6\ncout << s.find("xyz") << endl;    // string::npos (못 찾음)',
          result: "6\n18446744073709551615",
          note: "찾으면 위치 반환, 못 찾으면 string::npos (아주 큰 숫자)"
        }
      },

      // find 예측
      {
        type: "explain",
        content: {
          lines: [
            ".find()는 처음 발견된 위치를 돌려줘요!"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s = "banana";\n    cout << s.find("na") << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["0", "2", "4", "6"],
            answer: 1,
            feedback: "banana에서 'na'는 인덱스 2에서 처음 나타나요! (b=0, a=1, n=2)"
          }
        }
      },

      // Lv.2: find 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: '"Hello World"에서 "World"의 위치를 찾아요!',
          guide: ".find() 메서드를 써요!",
          template: 'string s = "Hello World";\ncout << s.___("World") << endl;',
          answer: "find",
          expect: 'string s = "Hello World";\ncout << s.find("World") << endl;'
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'string s = "Hello";\nchar c = s.at(5);',
          options: [
            "인덱스 5는 범위 밖이에요 (0~4만 가능)",
            "at() 대신 []를 써야 해요",
            "char 대신 string을 써야 해요"
          ],
          answer: 0,
          explanation: "\"Hello\"는 5글자 → 인덱스 0~4만 가능! s.at(5)는 범위 밖이라 에러가 나요."
        }
      },

      // Lv.2: at 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "문자열의 마지막 글자를 출력해요!",
          guide: "마지막 인덱스 = length() - 1!",
          template: 'string s = "Hello";\ncout << s.at(s.___() - 1) << endl;',
          answer: "length",
          expect: 'string s = "Hello";\ncout << s.at(s.length() - 1) << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "string 메서드 완벽!",
          emoji: "🔤"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "string 메서드",
          learned: [
            ".length() — 문자열 길이 (= 파이썬 len())",
            "s[i] 또는 s.at(i) — i번째 글자 접근",
            ".substr(시작, 길이) — 부분 문자열 (= 파이썬 s[a:b])",
            ".find(문자열) — 위치 찾기 (= 파이썬 .find())",
            "못 찾으면 string::npos 반환"
          ],
          canDo: "string 메서드로 문자열을 자유롭게 다룰 수 있어요!",
          emoji: "🔤"
        }
      },

      // ==================== CHAPTER 2: string 연산 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "string 연산",
          desc: "문자열 더하기, 비교, 변환을 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: '"Hello World"에서 "World"를 잘라내는 코드를 완성해요!',
          template: 'string s = "Hello World";\ncout << s.___(6, 5) << endl;',
          answer: "substr",
          expect: 'string s = "Hello World";\ncout << s.substr(6, 5) << endl;'
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "C++ 문자열도 + 로 이어붙일 수 있어요! 🔗",
            "파이썬의 문자열 더하기와 같아요!"
          ],
          code: 'string first = "Hello";\nstring second = " World";\nstring result = first + second;\ncout << result << endl;',
          result: "Hello World",
          note: "+ 연산자로 문자열 연결! (파이썬과 동일!)"
        }
      },

      // 문자열 비교 설명
      {
        type: "explain",
        content: {
          lines: [
            "C++ 문자열은 ==, <, > 로 비교할 수 있어요! ⚖️",
            "사전 순서로 비교해요 (알파벳 순서)."
          ],
          code: 'string a = "apple";\nstring b = "banana";\n\ncout << (a == b) << endl;  // 0 (false)\ncout << (a < b) << endl;   // 1 (true, a가 사전순으로 앞)\ncout << (a > b) << endl;   // 0 (false)',
          result: "0\n1\n0",
          note: "== 같다 / < 사전순 앞 / > 사전순 뒤 (파이썬과 동일!)"
        }
      },

      // 문자열 비교 예측
      {
        type: "explain",
        content: {
          lines: [
            "문자열 비교는 사전 순서 (알파벳 순서)예요!",
            "대문자가 소문자보다 앞이에요 (ASCII 값)."
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string x = "cat";\n    string y = "dog";\n    if (x < y) {\n        cout << x << " wins!" << endl;\n    } else {\n        cout << y << " wins!" << endl;\n    }\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["cat wins!", "dog wins!", "에러", "둘 다 출력"],
            answer: 0,
            feedback: "c < d 이므로 \"cat\" < \"dog\"은 true! cat wins!가 출력돼요."
          }
        }
      },

      // Lv.1: 문자열 연결
      {
        type: "practice",
        content: {
          level: 1,
          task: "두 문자열을 이어붙여요!",
          guide: "+ 연산자로 연결해요!",
          template: 'string a = "Hello";\nstring b = " World";\nstring c = a ___ b;',
          answer: "+",
          expect: 'string a = "Hello";\nstring b = " World";\nstring c = a + b;'
        }
      },

      // to_string, stoi 설명
      {
        type: "explain",
        content: {
          lines: [
            "숫자 → 문자열: to_string() 📝",
            "문자열 → 숫자: stoi() (string to int) 🔢",
            "파이썬의 str()과 int()과 같아요!"
          ],
          code: '// 숫자 → 문자열\nint score = 95;\nstring msg = "점수: " + to_string(score);\ncout << msg << endl;  // 점수: 95\n\n// 문자열 → 숫자\nstring numStr = "42";\nint num = stoi(numStr);\ncout << num + 8 << endl;  // 50',
          result: "점수: 95\n50",
          note: "to_string() = str() / stoi() = int()"
        }
      },

      // Lv.1: to_string 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "숫자 100을 문자열로 바꿔요!",
          guide: "파이썬 str() = C++ to_string()!",
          template: 'string s = ___(100);',
          answer: "to_string",
          expect: 'string s = to_string(100);'
        }
      },

      // Lv.1: stoi 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: '문자열 "42"를 정수로 바꿔요!',
          guide: "파이썬 int() = C++ stoi()!",
          template: 'string s = "42";\nint n = ___(s);',
          answer: "stoi",
          expect: 'string s = "42";\nint n = stoi(s);'
        }
      },

      // 퀴즈: to_string vs stoi
      {
        type: "quiz",
        content: {
          question: "파이썬 str(100) 은 C++에서 뭘까요?",
          options: [
            "string(100)",
            "to_string(100)",
            "stoi(100)",
            "str(100)"
          ],
          answer: 1,
          explanation: "파이썬 str() = C++ to_string()! 숫자를 문자열로 바꿔줘요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'string msg = "점수: " + 95;',
          options: [
            "문자열과 정수를 + 로 직접 연결할 수 없어요",
            "string 선언이 잘못됐어요",
            "95는 문자열이라 에러가 나요"
          ],
          answer: 0,
          explanation: "C++에서는 문자열 + 정수가 안 돼요! to_string(95)로 먼저 문자열로 바꿔야 해요. (파이썬도 str() 필요하죠!)"
        }
      },

      // Lv.2: 문자열 + 숫자
      {
        type: "practice",
        content: {
          level: 2,
          task: '"나이: " + 14 를 문자열로 만들어요!',
          guide: "정수를 to_string()으로 먼저 바꿔요!",
          template: 'string msg = "나이: " + ___(14);',
          answer: "to_string",
          expect: 'string msg = "나이: " + to_string(14);'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "string 연산 완벽!",
          emoji: "🔗"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "string 연산",
          learned: [
            "+ 로 문자열 이어붙이기 (파이썬과 동일!)",
            "==, <, > 로 문자열 비교 (사전 순서)",
            "to_string(숫자) — 숫자 → 문자열 (= 파이썬 str())",
            "stoi(문자열) — 문자열 → 정수 (= 파이썬 int())",
            "문자열 + 정수는 안 돼요! to_string() 필요!"
          ],
          canDo: "문자열을 연결하고, 비교하고, 숫자와 변환할 수 있어요!",
          emoji: "🔗"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 문자열 가공기",
          desc: "배운 메서드로 문자열을 가공하는 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 숫자를 문자열로 바꾸는 법 기억나요?",
          task: "숫자 42를 문자열로 바꾸는 코드를 써봐요!",
          template: "string s = ___(42);",
          answer: "to_string",
          expect: "string s = to_string(42);"
        }
      },

      // 프로젝트 예측
      {
        type: "explain",
        content: {
          lines: [
            "substr과 find를 함께 쓰면 강력해요!",
            "find로 위치를 찾고, substr로 잘라내기!"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string email = "user@test.com";\n    int pos = email.find("@");\n    string name = email.substr(0, pos);\n    cout << name << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["user@test.com", "user", "@test.com", "test.com"],
            answer: 1,
            feedback: "@의 위치는 4! substr(0, 4)는 처음부터 4글자 = \"user\"!"
          }
        }
      },

      // 프로젝트 Step 1: 인사말 조합
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "이름과 나이로 인사말을 조합해요!",
          target: 'string name = "주현";\nint age = 14;\nstring greeting = name + "님, " + to_string(age) + "세 환영해요!";\ncout << greeting << endl;',
          hint: '이름 + "님, " + to_string(나이) + "세 환영해요!"',
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {"],
          answer: 'string name = "주현";\nint age = 14;\nstring greeting = name + "님, " + to_string(age) + "세 환영해요!";\ncout << greeting << endl;'
        }
      },

      // 프로젝트 Step 2: 이메일에서 아이디 추출
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "이메일에서 @ 앞의 아이디를 추출해요!",
          target: 'string email = "student@school.com";\nint pos = email.find("@");\nstring id = email.substr(0, pos);\ncout << "아이디: " << id << endl;',
          hint: 'find("@")로 위치 찾고, substr(0, 위치)로 추출!',
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {", 'string name = "주현";\nint age = 14;\ncout << name + "님, " + to_string(age) + "세 환영해요!" << endl;'],
          answer: 'string email = "student@school.com";\nint pos = email.find("@");\nstring id = email.substr(0, pos);\ncout << "아이디: " << id << endl;'
        }
      },

      // 프로젝트 Step 3: 문자열 길이 + 요약
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "이메일의 총 길이와 아이디 길이를 출력해요!",
          target: 'cout << "이메일 길이: " << to_string(email.length()) << endl;\ncout << "아이디 길이: " << to_string(id.length()) << endl;',
          hint: '.length()로 길이, to_string()으로 변환!',
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {", 'string name = "주현";\ncout << name + "님 환영!" << endl;', 'string email = "student@school.com";\nint pos = email.find("@");\nstring id = email.substr(0, pos);\ncout << "아이디: " << id << endl;'],
          answer: 'cout << "이메일 길이: " << to_string(email.length()) << endl;\ncout << "아이디 길이: " << to_string(id.length()) << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "문자열 가공기 완성!",
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
