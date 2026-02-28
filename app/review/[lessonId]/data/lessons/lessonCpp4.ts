import { LessonData } from '../types';

export const lessonCpp4: LessonData = {
    id: "cpp-4",
    title: "cin 입력",
    description: "키보드로 값 입력받기 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: cin >> 기초 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "cin >> 기초",
          desc: "키보드에서 값을 입력받아요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "파이썬에서는 input()으로 입력받았죠? 🐍",
            "C++에서는 cin >> 로 입력받아요!",
            "cout << 는 내보내기, cin >> 는 받아오기!"
          ],
          code: '// 파이썬\nname = input("이름: ")\n\n// C++\nstring name;\ncout << "이름: ";\ncin >> name;',
          note: "cin >> 는 키보드에서 값을 변수에 넣어요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "cin >> 으로 정수를 입력받아봐요! 🔢",
            "변수를 먼저 선언하고, cin >> 변수 형태로 입력!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << "나이를 입력하세요: ";\n    cin >> age;\n    cout << "당신의 나이: " << age << endl;\n    return 0;\n}',
          result: "나이를 입력하세요: 14\n당신의 나이: 14",
          predict: {
            question: "cin >> age; 에서 >>의 방향은?",
            options: ["키보드 → 변수 (오른쪽으로)", "변수 → 화면 (왼쪽으로)", "상관없다"],
            answer: 0,
            feedback: ">>는 키보드에서 변수 쪽으로! cout << 와 반대 방향이에요."
          }
        }
      },

      // ===== Lv.1: cin 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "나이를 입력받아요!",
          guide: "cin >> 변수이름; 형태!",
          template: "___ >> age;",
          answer: "cin",
          expect: "cin >> age;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "double도 똑같이 cin >> 으로 입력받아요!",
            "타입에 맞게 변수를 선언하면 자동으로 변환돼요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double height;\n    cout << "키를 입력하세요: ";\n    cin >> height;\n    cout << "키: " << height << "cm" << endl;\n    return 0;\n}',
          result: "키를 입력하세요: 165.5\n키: 165.5cm",
          note: "int 변수에 cin하면 정수만, double이면 소수점도 OK!"
        }
      },

      // ===== Lv.1: double 입력 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "키(height)를 입력받아요!",
          guide: "cin >> 변수; 형태!",
          template: "double height;\ncin ___ ___;",
          answer: ">>",
          blanksAnswer: [">>", "height"],
          expect: "double height;\ncin >> height;"
        }
      },

      // string 입력
      {
        type: "explain",
        content: {
          lines: [
            "cin >> 으로 문자열도 입력받을 수 있어요!",
            "하지만 주의! cin >>은 공백에서 멈춰요 ⚠️"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "이름: ";\n    cin >> name;\n    cout << "안녕, " << name << "!" << endl;\n    return 0;\n}',
          result: "이름: 주현\n안녕, 주현!",
          predict: {
            question: '"Kim Juhyun"을 입력하면?',
            options: ['"안녕, Kim Juhyun!"', '"안녕, Kim!"', "에러가 난다"],
            answer: 1,
            feedback: "cin >>은 공백(스페이스)에서 멈춰요! Kim만 저장되고 Juhyun은 버려져요."
          }
        }
      },

      // >> 방향 퀴즈
      {
        type: "quiz",
        content: {
          question: "cout << 와 cin >> 에서 화살표 방향이 다른 이유는?",
          options: [
            "cout은 화면으로 보내고(<<), cin은 변수로 받아서(>>)",
            "그냥 규칙이라서",
            "cout은 큰 값, cin은 작은 값이라서"
          ],
          answer: 0,
          explanation: "<< 는 '보내다' (변수 → 화면), >> 는 '받다' (키보드 → 변수)! 화살표 방향을 생각하면 쉬워요!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: 'int num;\ncout << "숫자: ";\ncin << num;',
          options: [
            "cin은 << 가 아니라 >> 를 써야 해서",
            "num을 초기화하지 않아서",
            "cout이 잘못돼서"
          ],
          answer: 0,
          explanation: "cin은 >> (받는 방향)을 써야 해요! cin >> num; 이 맞아요."
        }
      },

      // ===== Lv.2: 전체 입력 코드 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "이름을 물어보고 입력받는 코드를 완성해요!",
          guide: "cout으로 질문, cin으로 입력!",
          template: 'string name;\ncout ___ "이름: ";\n___ >> name;',
          answer: "<<",
          blanksAnswer: ["<<", "cin"],
          expect: 'string name;\ncout << "이름: ";\ncin >> name;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "cin 기초 완벽!",
          emoji: "⌨️"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "cin >> 기초",
          learned: [
            "cin >> 변수; — 키보드에서 값 입력받기",
            "cout << 는 보내기, cin >> 는 받기",
            "int, double, string 모두 cin >> 가능!",
            "cin >> 은 공백에서 멈춤!",
            "변수를 먼저 선언해야 cin 가능"
          ],
          canDo: "cin >>으로 정수, 실수, 문자열을 입력받을 수 있어요!",
          emoji: "⌨️"
        }
      },

      // ==================== CHAPTER 2: getline & 여러 값 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "getline & 여러 값",
          desc: "공백 포함 입력과 여러 값 입력을 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! cin 기억나요?",
          task: "변수 num에 값을 입력받는 코드를 써봐요!",
          template: "___ >> num;",
          answer: "cin",
          expect: "cin >> num;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "cin >>은 공백에서 멈췄죠?",
            "공백을 포함한 한 줄 전체를 입력받으려면?",
            "getline(cin, 변수) 를 쓰면 돼요! 📝"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string fullName;\n    cout << "이름 전체: ";\n    getline(cin, fullName);\n    cout << "안녕, " << fullName << "!" << endl;\n    return 0;\n}',
          result: "이름 전체: Kim Juhyun\n안녕, Kim Juhyun!",
          note: "getline = 한 줄 전체를 가져와요! 공백도 포함!"
        }
      },

      // getline 퀴즈
      {
        type: "quiz",
        content: {
          question: "공백이 포함된 문장을 입력받으려면?",
          options: [
            "cin >> sentence;",
            "getline(cin, sentence);",
            "cin.getline(sentence);",
            "input(sentence);"
          ],
          answer: 1,
          explanation: "getline(cin, 변수)는 공백 포함 한 줄 전체를 입력받아요! cin >>은 공백에서 멈춰요."
        }
      },

      // ===== Lv.1: getline 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "주소(address)를 공백 포함해서 입력받아요!",
          guide: "getline(cin, 변수) 형태!",
          template: "string address;\n___(cin, address);",
          answer: "getline",
          expect: "string address;\ngetline(cin, address);"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "cin >> 을 여러 번 써서 여러 값을 한 번에 입력받을 수 있어요!",
            "스페이스나 엔터로 값을 구분해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cout << "두 숫자: ";\n    cin >> a >> b;\n    cout << "합: " << a + b << endl;\n    return 0;\n}',
          result: "두 숫자: 10 20\n합: 30",
          predict: {
            question: "cin >> a >> b; 에서 \"10 20\" 입력하면?",
            options: ["a=10, b=20", "a=1020, b는 비어있음", "에러"],
            answer: 0,
            feedback: "공백으로 구분돼서 a에 10, b에 20이 들어가요!"
          }
        }
      },

      // ===== Lv.2: 여러 값 입력 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "이름과 나이를 한 번에 입력받아요!",
          guide: "cin >> 변수1 >> 변수2; 형태!",
          template: "string name;\nint age;\ncin >> ___ >> ___;",
          answer: "name",
          blanksAnswer: ["name", "age"],
          expect: "string name;\nint age;\ncin >> name >> age;"
        }
      },

      // cin >> 후 getline 주의
      {
        type: "explain",
        content: {
          lines: [
            "주의! cin >> 다음에 getline을 쓰면 문제가 생겨요 ⚠️",
            "cin >>이 남긴 엔터(\\n)를 getline이 먹어버려요!",
            "cin.ignore()로 해결!"
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int age;\n    string name;\n    cout << "나이: ";\n    cin >> age;\n    cin.ignore();  // 남은 엔터 제거!\n    cout << "이름: ";\n    getline(cin, name);\n    cout << age << "살 " << name << endl;\n    return 0;\n}',
          result: "나이: 14\n이름: Kim Juhyun\n14살 Kim Juhyun",
          note: "cin >> 다음에 getline 쓸 때는 cin.ignore()를 꼭 넣어요!"
        }
      },

      // 에러 퀴즈: cin.ignore 누락
      {
        type: "errorQuiz",
        content: {
          question: "이 코드를 실행하면 이름 입력이 건너뛰어져요. 왜일까요?",
          code: 'int age;\nstring name;\ncin >> age;\n// cin.ignore(); ← 이게 빠졌어요!\ngetline(cin, name);',
          options: [
            "cin >>이 남긴 엔터를 getline이 읽어서",
            "getline 사용법이 틀려서",
            "string을 cin으로 못 읽어서"
          ],
          answer: 0,
          explanation: "cin >> age 후 엔터(\\n)가 남아있어요. getline이 그 엔터를 읽어서 빈 문자열이 돼요! cin.ignore()로 엔터를 지워줘야 해요."
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "getline 마스터!",
          emoji: "📝"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "getline & 여러 값",
          learned: [
            "getline(cin, 변수) — 공백 포함 한 줄 입력",
            "cin >> a >> b; — 여러 값 한 번에 입력",
            "cin >> 다음 getline → cin.ignore() 필수!",
            "cin >>은 공백에서 멈춤, getline은 줄 전체"
          ],
          canDo: "getline과 cin >>을 상황에 맞게 골라 쓸 수 있어요!",
          emoji: "📝"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 간단한 계산기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 간단한 계산기",
          desc: "cin으로 두 숫자를 입력받아 계산해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 공백 포함 입력 기억나요?",
          task: "공백 포함해서 입력받는 함수는?",
          template: "___(cin, text);",
          answer: "getline",
          expect: "getline(cin, text);"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "두 숫자를 입력받아서 덧셈하는 프로그램이에요!",
            "cin >> 으로 두 값을 받고, 결과를 출력해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    cout << "첫 번째 숫자: ";\n    cin >> a;\n    cout << "두 번째 숫자: ";\n    cin >> b;\n    cout << a << " + " << b << " = " << a + b << endl;\n    return 0;\n}',
          result: "첫 번째 숫자: 10.5\n두 번째 숫자: 3.2\n10.5 + 3.2 = 13.7",
          predict: {
            question: "a와 b가 int라면 10.5를 입력하면?",
            options: ["10.5가 저장됨", "10만 저장됨", "에러"],
            answer: 1,
            feedback: "int는 소수점을 버려요! 정확한 계산을 원하면 double을 쓰세요."
          }
        }
      },

      // 프로젝트: 간단한 계산기
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "두 double 변수를 선언하고, 첫 번째 숫자를 입력받아요!",
          target: 'double a, b;\ncout << "첫 번째 숫자: ";\ncin >> a;',
          hint: "double a, b; + cout + cin >> a;",
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {"],
          answer: 'double a, b;\ncout << "첫 번째 숫자: ";\ncin >> a;'
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "두 번째 숫자도 입력받아요!",
          target: 'cout << "두 번째 숫자: ";\ncin >> b;',
          hint: 'cout << "두 번째 숫자: "; cin >> b;',
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {", 'double a, b;\ncout << "첫 번째 숫자: ";\ncin >> a;'],
          answer: 'cout << "두 번째 숫자: ";\ncin >> b;'
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "두 수의 합을 출력해요!",
          target: 'cout << a << " + " << b << " = " << a + b << endl;',
          hint: 'cout << a << " + " << b << " = " << a + b << endl;',
          done: ["#include <iostream>\nusing namespace std;\n\nint main() {", 'double a, b;\ncout << "첫 번째 숫자: ";\ncin >> a;', 'cout << "두 번째 숫자: ";\ncin >> b;'],
          answer: 'cout << a << " + " << b << " = " << a + b << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "계산기 완성! cin 마스터!",
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
