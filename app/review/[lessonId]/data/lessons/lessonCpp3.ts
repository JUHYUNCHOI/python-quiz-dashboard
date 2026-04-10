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
          lines: [],
          code: '// 파이썬\nx = 10\nname = "주현"\n\n// C++\nint x = 10;\nstring name = "주현";',
          note: "C++은 변수 앞에 타입 이름을 꼭 써요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
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
          expect: "int age = 14;",
          en: {
            task: "Create an integer variable age and assign 14!",
            guide: "Use the form: type variableName = value;"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
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
          expect: "bool isPassed = true;",
          en: {
            task: "Assign true to a boolean variable isPassed!",
            guide: "true/false values use the bool type!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
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

      // ==================== CHAPTER 손에 익히기: 타입 & 변수 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "타입 & 변수 손에 익히기",
          desc: "int / double / string / bool / char — 타입 선언이 자동으로 나오게!"
        }
      },

      // Drill 1: 타입 고르기
      {
        type: "practice",
        content: {
          level: 1,
          task: "각 변수에 맞는 타입을 채워요:\n학생 수(정수), 평균 점수(실수), 이름(문자열), 합격 여부(참/거짓)",
          guide: "int / double / string / bool",
          template: "___ count = 30;\n___ avg = 85.5;\n___ name = \"Alice\";\n___ passed = true;",
          blanksAnswer: ["int", "double", "string", "bool"],
          answer: "int count = 30;\ndouble avg = 85.5;\nstring name = \"Alice\";\nbool passed = true;",
          expect: "int count = 30;\ndouble avg = 85.5;\nstring name = \"Alice\";\nbool passed = true;",
          en: {
            task: "Fill in the correct type for each variable:\nstudent count (integer), average score (decimal), name (text), passed (true/false)",
            guide: "int / double / string / bool"
          }
        }
      },

      // Drill 2: const + auto
      {
        type: "practice",
        content: {
          level: 2,
          task: "const로 PI=3.14를 선언하고, auto로 result = PI * 2.0을 선언해 출력해요",
          guide: "const double PI = 3.14; auto result = PI * 2.0;",
          template: "___ double PI = 3.14;\n___ result = PI * 2.0;\ncout << result << endl;",
          blanksAnswer: ["const", "auto"],
          answer: "const double PI = 3.14;\nauto result = PI * 2.0;\ncout << result << endl;",
          expect: "6.28",
          en: {
            task: "Declare PI=3.14 as const, declare result = PI * 2.0 with auto, then print",
            guide: "const double PI = 3.14; auto result = PI * 2.0;"
          }
        }
      },

      // Drill 3: 타입 변환
      {
        type: "practice",
        content: {
          level: 2,
          task: "int a=7, b=2일 때:\n① 정수 나눗셈 결과 출력\n② double로 형변환 후 나눗셈 결과 출력",
          guide: "a/b vs (double)a/b",
          template: "int a = 7, b = 2;\ncout << a / b << endl;\ncout << (___)a / b << endl;",
          blanksAnswer: ["double"],
          answer: "int a = 7, b = 2;\ncout << a / b << endl;\ncout << (double)a / b << endl;",
          expect: "3\n3.5",
          en: {
            task: "Given int a=7, b=2:\n① print integer division result\n② cast to double and print division result",
            guide: "a/b vs (double)a/b"
          }
        }
      },

      // Drill 4: 처음부터 — 온도 변환
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 섭씨(double)를 입력받아 화씨로 변환해 출력\n공식: F = C * 9.0/5.0 + 32",
          guide: "double c; cin >> c; double f = c * 9.0/5.0 + 32;",
          hint: "double c;\ncin >> c;\ndouble f = c * 9.0 / 5.0 + 32;\ncout << f << endl;",
          template: null,
          answer: "double c;\ncin >> c;\ndouble f = c * 9.0 / 5.0 + 32;\ncout << f << endl;",
          alternateAnswers: [
            "double c;cin>>c;double f=c*9.0/5.0+32;cout<<f<<endl;"
          ],
          expect: "212",
          en: {
            task: "Write from scratch! Read Celsius (double), convert to Fahrenheit, print\nFormula: F = C * 9.0/5.0 + 32",
            guide: "double c; cin >> c; double f = c * 9.0/5.0 + 32;"
          }
        }
      },

      // Drill 5: 처음부터 — 다양한 타입 한 번에
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 이름, 나이, 점수, 합격여부를 각각 적절한 타입으로 선언하고\n\"Alice | 18 | 92.5 | pass\" 형식으로 출력 (합격 기준: 점수 >= 60)",
          guide: "string / int / double / bool — 타입 선언 4가지 연습",
          hint: "string name=\"Alice\"; int age=18; double score=92.5;\nbool passed = score >= 60;\ncout<<name<<\" | \"<<age<<\" | \"<<score<<\" | \"<<(passed?\"pass\":\"fail\")<<endl;",
          template: null,
          answer: "string name = \"Alice\";\nint age = 18;\ndouble score = 92.5;\nbool passed = score >= 60;\ncout << name << \" | \" << age << \" | \" << score << \" | \" << (passed ? \"pass\" : \"fail\") << endl;",
          alternateAnswers: [
            "string name=\"Alice\";int age=18;double score=92.5;bool passed=score>=60;\ncout<<name<<\" | \"<<age<<\" | \"<<score<<\" | \"<<(passed?\"pass\":\"fail\")<<endl;"
          ],
          expect: "Alice | 18 | 92.5 | pass",
          en: {
            task: "Write from scratch! Declare name, age, score, passed with proper types\nPrint in format \"Alice | 18 | 92.5 | pass\" (pass if score >= 60)",
            guide: "string / int / double / bool — practice all 4 type declarations"
          }
        }
      },

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
