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
          lines: [],
          code: '#include <string>\nusing namespace std;\n\nstring s = "Hello";\ncout << s.length() << endl;  // 5\ncout << s[0] << endl;        // H\ncout << s.at(1) << endl;     // e',
          result: "5\nH\ne",
          note: ".length() = len() / s[i] 또는 s.at(i) = 각 글자 접근"
        }
      },

      // length 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string msg = "Hi C++";\n    cout << msg.length() << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["4", "5", "6", "7"],
            answer: 2,
            feedback: "H, i, 공백, C, +, + → 6글자! 공백도 한 글자로 세요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["4", "5", "6", "7"],
              feedback: "H, i, space, C, +, + → 6 characters! The space counts as one character."
            }
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
          expect: 'string s = "Hello";\ncout << s.length() << endl;',
          en: {
            task: "Print the length of the string!",
            guide: "Python's len() = C++ .length()!"
          }
        }
      },

      // substr 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: 'string s = "Hello World";\ncout << s.find("World") << endl;  // 6\ncout << s.find("xyz") << endl;    // string::npos (못 찾음)',
          result: "6\n18446744073709551615",
          note: "찾으면 위치 반환, 못 찾으면 string::npos (아주 큰 숫자)"
        }
      },

      // find 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s = "banana";\n    cout << s.find("na") << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["0", "2", "4", "6"],
            answer: 1,
            feedback: "banana에서 'na'는 인덱스 2에서 처음 나타나요! (b=0, a=1, n=2)"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["0", "2", "4", "6"],
              feedback: "In 'banana', 'na' first appears at index 2! (b=0, a=1, n=2)"
            }
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
          expect: 'string s = "Hello World";\ncout << s.find("World") << endl;',
          en: {
            task: 'Find the position of "World" in "Hello World"!',
            guide: "Use the .find() method!"
          }
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
          explanation: "\"Hello\"는 5글자 → 인덱스 0~4만 가능! s.at(5)는 범위 밖이라 에러가 나요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Index 5 is out of bounds (only 0~4 are valid)",
              "Should use [] instead of at()",
              "Should use string instead of char"
            ],
            explanation: "\"Hello\" has 5 characters → valid indices are 0~4! s.at(5) is out of bounds and throws an error."
          }
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
          expect: 'string s = "Hello";\ncout << s.at(s.length() - 1) << endl;',
          en: {
            task: "Print the last character of the string!",
            guide: "Last index = length() - 1!"
          }
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
          expect: 'string s = "Hello World";\ncout << s.substr(6, 5) << endl;',
          en: {
            message: "Quick! Remember what we learned earlier?",
            task: 'Complete the code to extract "World" from "Hello World"!'
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'string a = "apple";\nstring b = "banana";\n\ncout << (a == b) << endl;  // 0 (false)\ncout << (a < b) << endl;   // 1 (true, a가 사전순으로 앞)\ncout << (a > b) << endl;   // 0 (false)',
          result: "0\n1\n0",
          note: "== 같다 / < 사전순 앞 / > 사전순 뒤 (파이썬과 동일!)"
        }
      },

      // 문자열 비교 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string x = "cat";\n    string y = "dog";\n    if (x < y) {\n        cout << x << " wins!" << endl;\n    } else {\n        cout << y << " wins!" << endl;\n    }\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["cat wins!", "dog wins!", "에러", "둘 다 출력"],
            answer: 0,
            feedback: "c < d 이므로 \"cat\" < \"dog\"은 true! cat wins!가 출력돼요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["cat wins!", "dog wins!", "Error", "Both are printed"],
              feedback: "Since c < d, \"cat\" < \"dog\" is true! cat wins! is printed."
            }
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
          expect: 'string a = "Hello";\nstring b = " World";\nstring c = a + b;',
          en: {
            task: "Concatenate two strings!",
            guide: "Use the + operator to connect them!"
          }
        }
      },

      // to_string, stoi 설명
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string email = "user@test.com";\n    int pos = email.find("@");\n    string name = email.substr(0, pos);\n    cout << name << endl;\n    return 0;\n}',
          predict: {
            question: "출력 결과는?",
            options: ["user@test.com", "user", "@test.com", "test.com"],
            answer: 1,
            feedback: "@의 위치는 4! substr(0, 4)는 처음부터 4글자 = \"user\"!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["user@test.com", "user", "@test.com", "test.com"],
              feedback: "@ is at position 4! substr(0, 4) takes 4 characters from the start = \"user\"!"
            }
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
