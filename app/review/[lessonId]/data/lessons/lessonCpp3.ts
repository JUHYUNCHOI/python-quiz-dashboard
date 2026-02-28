import { LessonData } from '../types';

export const lessonCpp3: LessonData = {
    id: "cpp-3",
    title: "변수와 타입",
    description: "int, double, string 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 타입 선언 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "타입 선언",
          desc: "int, double, string을 배워요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "파이썬에서는 변수에 타입을 안 써도 됐죠? 🐍",
            "x = 10 하면 알아서 정수!",
            "하지만 C++은 타입을 직접 써줘야 해요!"
          ],
          code: '// 파이썬\nx = 10\nname = "주현"\n\n// C++\nint x = 10;\nstring name = "주현";',
          note: "C++은 변수 앞에 타입 이름을 꼭 써요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "int = 정수 (integer) 🔢",
            "소수점이 없는 숫자를 담아요!",
            "나이, 점수, 개수 같은 것에 딱!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 14;\n    int score = 100;\n    cout << "나이: " << age << endl;\n    cout << "점수: " << score << endl;\n    return 0;\n}',
          result: "나이: 14\n점수: 100",
          predict: {
            question: "int에 3.14를 넣으면 어떻게 될까?",
            options: ["3.14가 저장된다", "3만 저장된다 (소수점 버림)", "에러가 난다"],
            answer: 1,
            feedback: "int는 정수만! 3.14를 넣으면 소수점을 잘라서 3만 저장돼요!"
          }
        }
      },

      // ===== Lv.1: int 변수 선언 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 변수 age를 만들고 14를 넣어요!",
          guide: "타입 이름 변수이름 = 값; 형태!",
          template: "___ age = 14;",
          answer: "int",
          expect: "int age = 14;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "double = 실수 (소수점 있는 숫자) 🔬",
            "키, 몸무게, 평균 같은 것에 딱!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double height = 165.5;\n    double pi = 3.14;\n    cout << "키: " << height << endl;\n    cout << "파이: " << pi << endl;\n    return 0;\n}',
          result: "키: 165.5\n파이: 3.14",
          note: "double = 소수점 가능! int와 다른 점이에요."
        }
      },

      // ===== Lv.1: double 변수 선언 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "실수 변수 pi에 3.14를 넣어요!",
          guide: "소수점 있는 숫자는 double!",
          template: "___ pi = 3.14;",
          answer: "double",
          expect: "double pi = 3.14;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "string = 문자열 (글자들의 모음) 📝",
            "큰따옴표로 감싸요!",
            "파이썬의 str과 같은 역할이에요."
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = "주현";\n    string school = "중학교";\n    cout << name << " " << school << endl;\n    return 0;\n}',
          result: "주현 중학교",
          note: "string을 쓰려면 #include <string>이 필요해요! (iostream에 포함되기도 해요)"
        }
      },

      // ===== Lv.1: string 변수 선언 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: '문자열 변수 name에 "주현"을 넣어요!',
          guide: "문자열은 string 타입!",
          template: '___ name = "주현";',
          answer: "string",
          expect: 'string name = "주현";'
        }
      },

      // 타입 퀴즈
      {
        type: "quiz",
        content: {
          question: "키(165.5)를 저장하려면 어떤 타입?",
          options: ["int", "double", "string", "char"],
          answer: 1,
          explanation: "소수점이 있는 숫자는 double! int에 넣으면 165만 남아요."
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'int main() {\n    int score = 95.7;\n    cout << score << endl;\n    return 0;\n}',
          options: [
            "95만 출력돼서 데이터 손실 (경고)",
            "에러 없이 95.7이 출력된다",
            "string을 써야 한다"
          ],
          answer: 0,
          explanation: "int에 95.7을 넣으면 소수점이 잘려서 95만 남아요! 경고가 나올 수 있어요."
        }
      },

      // ===== Lv.2: 타입 고르기 빈칸 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "각 변수에 맞는 타입을 써봐요!",
          guide: "정수 = int, 실수 = double, 문자열 = string",
          template: '___ count = 5;\n___ average = 87.5;\n___ greeting = "안녕";',
          answer: "int",
          blanksAnswer: ["int", "double", "string"],
          expect: 'int count = 5;\ndouble average = 87.5;\nstring greeting = "안녕";'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "타입 선언 완벽!",
          emoji: "🎉"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "타입 선언",
          learned: [
            "C++은 변수 앞에 타입을 꼭 써야 해요!",
            "int = 정수 (10, -5, 0)",
            "double = 실수 (3.14, 165.5)",
            "string = 문자열 (\"Hello\", \"주현\")",
            "int에 소수점 숫자를 넣으면 잘림!"
          ],
          canDo: "int, double, string으로 변수를 선언할 수 있어요!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: bool, char, const ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "bool, char, const",
          desc: "참/거짓, 한 글자, 상수를 배워요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "소수점 있는 숫자의 타입은?",
          template: "___ pi = 3.14;",
          answer: "double",
          expect: "double pi = 3.14;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "bool = 참(true) 또는 거짓(false) 🔘",
            "파이썬은 True/False, C++은 true/false (소문자)!",
            "조건 판단에 사용해요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    bool isStudent = true;\n    bool isAdult = false;\n    cout << isStudent << endl;\n    cout << isAdult << endl;\n    return 0;\n}',
          result: "1\n0",
          predict: {
            question: "true를 출력하면 뭐가 나올까?",
            options: ["true", "1", "True"],
            answer: 1,
            feedback: "C++에서 true는 숫자 1, false는 0으로 출력돼요! 파이썬과 달라요."
          }
        }
      },

      // ===== Lv.1: bool 변수 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "참/거짓 변수 isPassed에 true를 넣어요!",
          guide: "참/거짓은 bool 타입!",
          template: "___ isPassed = ___;",
          answer: "bool",
          blanksAnswer: ["bool", "true"],
          expect: "bool isPassed = true;"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "char = 문자 하나! 🔤",
            "작은따옴표(')로 감싸요.",
            "string은 큰따옴표(\"), char는 작은따옴표(')!"
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    char grade = \'A\';\n    char initial = \'J\';\n    cout << "등급: " << grade << endl;\n    cout << "이니셜: " << initial << endl;\n    return 0;\n}',
          result: "등급: A\n이니셜: J",
          note: "char = 글자 1개만! 'AB'는 안 돼요."
        }
      },

      // char vs string 퀴즈
      {
        type: "quiz",
        content: {
          question: "'A'와 \"A\"의 차이는?",
          options: [
            "같은 것이다",
            "'A'는 char, \"A\"는 string",
            "'A'는 string, \"A\"는 char",
            "둘 다 에러"
          ],
          answer: 1,
          explanation: "작은따옴표 'A'는 char (글자 1개), 큰따옴표 \"A\"는 string (문자열)이에요!"
        }
      },

      // ===== Lv.1: char 변수 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "문자 변수 grade에 'A'를 넣어요!",
          guide: "한 글자는 char, 작은따옴표!",
          template: "___ grade = ___;",
          answer: "char",
          blanksAnswer: ["char", "'A'"],
          expect: "char grade = 'A';"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "const = 상수 (바꿀 수 없는 값) 🔒",
            "파이썬은 관례로 대문자를 쓰지만, C++은 const를 붙여요!",
            "한 번 정하면 절대 못 바꿔요."
          ],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    const double PI = 3.14159;\n    const int MAX_SCORE = 100;\n    cout << "파이: " << PI << endl;\n    cout << "최대 점수: " << MAX_SCORE << endl;\n    // PI = 3.15;  ← 에러! 상수는 못 바꿈\n    return 0;\n}',
          result: "파이: 3.14159\n최대 점수: 100",
          note: "const 변수는 이름을 대문자로 쓰는 게 관례!"
        }
      },

      // 에러 퀴즈: const 수정
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'const int MAX = 100;\nMAX = 200;',
          options: [
            "const 변수는 값을 바꿀 수 없어서",
            "int 대신 double을 써야 해서",
            "= 대신 ==을 써야 해서"
          ],
          answer: 0,
          explanation: "const로 선언한 변수는 상수! 한 번 정하면 절대 바꿀 수 없어요."
        }
      },

      // ===== Lv.2: const 선언 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "바꿀 수 없는 상수 PI를 만들어요!",
          guide: "const를 타입 앞에 붙여요!",
          template: "___ double PI = 3.14159;",
          answer: "const",
          expect: "const double PI = 3.14159;"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "bool, char, const 완벽!",
          emoji: "🔒"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "bool, char, const",
          learned: [
            "bool = true(1) / false(0) — C++은 소문자!",
            "char = 문자 1개 — 작은따옴표 'A'",
            "string은 큰따옴표 \"Hello\"",
            "const = 상수 (값 변경 불가)",
            "const 변수는 대문자 이름이 관례"
          ],
          canDo: "bool, char, const를 사용해서 다양한 변수를 만들 수 있어요!",
          emoji: "🔒"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 — 자기소개 카드 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 자기소개 카드",
          desc: "다양한 타입으로 자기소개 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! bool의 출력값 기억나요?",
          task: "true를 cout으로 출력하면?",
          template: { before: "// cout << true;\n// 출력: ", after: "" },
          answer: "1",
          expect: "1"
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [
            "모든 타입을 섞어서 프로그램을 만들어봐요!",
            "각 변수에 맞는 타입을 잘 골라야 해요."
          ],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = "주현";\n    int age = 14;\n    double height = 165.5;\n    char bloodType = \'O\';\n    bool isStudent = true;\n\n    cout << "이름: " << name << endl;\n    cout << "나이: " << age << endl;\n    cout << "키: " << height << endl;\n    cout << "혈액형: " << bloodType << endl;\n    cout << "학생: " << isStudent << endl;\n    return 0;\n}',
          result: "이름: 주현\n나이: 14\n키: 165.5\n혈액형: O\n학생: 1",
          predict: {
            question: "혈액형 O는 왜 따옴표가 작은따옴표일까?",
            options: ["char는 작은따옴표를 쓰니까", "string이라서", "아무 따옴표나 써도 돼서"],
            answer: 0,
            feedback: "char는 글자 1개! 작은따옴표 'O'로 감싸요. 큰따옴표 \"O\"는 string이에요."
          }
        }
      },

      // 프로젝트: 자기소개 카드
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "이름(string)과 나이(int) 변수를 선언해요!",
          target: 'string name = "주현";\nint age = 14;',
          hint: "string name = ...; int age = ...;",
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {"],
          answer: 'string name = "주현";\nint age = 14;'
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "학년(int)과 키(double) 변수를 추가해요!",
          target: "int grade = 2;\ndouble height = 165.5;",
          hint: "int grade = ...; double height = ...;",
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {", 'string name = "주현";\nint age = 14;'],
          answer: "int grade = 2;\ndouble height = 165.5;"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "이름과 나이를 출력하는 cout 문을 써봐요!",
          target: 'cout << "이름: " << name << endl;\ncout << "나이: " << age << endl;',
          hint: 'cout << "이름: " << name << endl;',
          done: ["#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {", 'string name = "주현";\nint age = 14;', "int grade = 2;\ndouble height = 165.5;"],
          answer: 'cout << "이름: " << name << endl;\ncout << "나이: " << age << endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "자기소개 카드 완성! 변수와 타입 마스터!",
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
