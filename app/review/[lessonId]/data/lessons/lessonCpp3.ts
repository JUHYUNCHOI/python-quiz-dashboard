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
          },
          en: {
            predict: {
              question: "What happens if you store 3.14 in an int?",
              options: ["3.14 is stored", "Only 3 is stored (decimal truncated)", "Error"],
              feedback: "int is integers only! Storing 3.14 truncates the decimal, keeping only 3!"
            }
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
          },
          en: {
            predict: {
              question: "What gets printed when you output true?",
              options: ["true", "1", "True"],
              feedback: "In C++, true prints as 1 and false as 0! Unlike Python."
            }
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
          },
          en: {
            predict: {
              question: "Why does blood type O use single quotes?",
              options: ["Because char uses single quotes", "Because it's a string", "Either quote works"],
              feedback: "char is a single character! Wrap it in single quotes like 'O'. Double quotes \"O\" would be a string."
            }
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
          answer: "double",
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

      // ==================== CHAPTER 3: 타입 예측 & 오류 잡기 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "타입 예측 & 오류 잡기",
          desc: "출력 결과를 예측하고, 흔한 실수를 잡아봐요!"
        }
      },

      // Predict 1: int 잘림
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: "int x = 5.7;\ncout << x << endl;",
          predict: {
            options: ["5.7", "5", "6", "에러"],
            answer: 1,
            feedback: "int는 정수 타입! 소수점이 잘려서 5만 저장돼요. 반올림이 아니라 버림이에요!"
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["5.7", "5", "6", "Error"],
              feedback: "int is an integer type! The decimal part is truncated (not rounded), so only 5 is stored."
            }
          }
        }
      },

      // Predict 2: 정수 나눗셈
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: "int a = 7, b = 2;\ncout << a / b << endl;",
          predict: {
            options: ["3.5", "3", "4", "에러"],
            answer: 1,
            feedback: "int끼리 나누면 결과도 int! 소수점은 버려져서 3이 나와요. 3.5를 얻으려면 (double)a / b로 형변환해야 해요."
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["3.5", "3", "4", "Error"],
              feedback: "Dividing int by int gives an int! The decimal is discarded, so the result is 3. Cast to (double)a / b to get 3.5."
            }
          }
        }
      },

      // Predict 3: auto 타입 추론
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: 'auto x = 10;\nauto y = 3.5;\nauto z = "hello";\ncout << x + 1 << endl;\ncout << y + 0.5 << endl;',
          predict: {
            options: ["11\n4.0", "11\n4", "에러", "10\n3.5"],
            answer: 0,
            feedback: "auto는 오른쪽 값으로 타입을 자동 추론해요! x는 int(10→11), y는 double(3.5+0.5=4.0)이에요."
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["11\n4.0", "11\n4", "Error", "10\n3.5"],
              feedback: "auto deduces the type from the right-hand value! x is int (10+1=11), y is double (3.5+0.5=4.0)."
            }
          }
        }
      },

      // Predict 4: char와 string 비교
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: "char c = 'A';\nstring s = \"B\";\ncout << c << endl;\ncout << s << endl;",
          predict: {
            options: ["A\nB", "'A'\n\"B\"", "65\nB", "에러"],
            answer: 0,
            feedback: "char는 글자 1개를 저장하고, cout으로 출력하면 그 글자가 나와요. string도 마찬가지로 따옴표 없이 내용만 출력돼요."
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["A\nB", "'A'\n\"B\"", "65\nB", "Error"],
              feedback: "char stores one character and cout prints it as-is. string also prints just its contents without quotes."
            }
          }
        }
      },

      // ErrorQuiz 1: const 변경 시도
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: "const int MAX = 100;\nMAX = 200;",
          options: [
            "const 변수는 값을 바꿀 수 없어",
            "int 타입에 100은 너무 작아",
            "세미콜론 문제"
          ],
          answer: 0,
          explanation: "const로 선언한 변수는 절대 변경 불가! 한 번 초기화한 뒤로는 읽기 전용이야. MAX를 바꾸고 싶으면 const를 빼야 해.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "Can't change a const variable",
              "100 is too small for int",
              "Semicolon problem"
            ],
            explanation: "Variables declared with const cannot be changed after initialization — they are read-only! Remove const if you need to reassign."
          }
        }
      },

      // ErrorQuiz 2: char에 큰따옴표 사용
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 컴파일 에러가 나는 이유는?",
          code: 'char grade = "A";',
          options: [
            "char는 작은따옴표를 써야 해 — 'A'로 바꿔야 해",
            "grade라는 이름을 쓸 수 없어",
            "char 대신 string을 써야 해"
          ],
          answer: 0,
          explanation: "char는 글자 1개 — 반드시 작은따옴표 'A'로 감싸야 해! 큰따옴표 \"A\"는 string 리터럴이야.",
          en: {
            question: "Why does this code cause a compile error?",
            options: [
              "char requires single quotes — change to 'A'",
              "The name 'grade' is not allowed",
              "Should use string instead of char"
            ],
            explanation: "char holds one character and must use single quotes like 'A'. Double quotes \"A\" create a string literal, not a char."
          }
        }
      },

      // Practice (new) 1: double 선언
      {
        type: "practice",
        content: {
          level: 1,
          task: "double 타입으로 pi = 3.14를 선언하고,\ncout으로 출력해봐",
          guide: "double pi = 3.14;",
          template: "___ pi = 3.14;\ncout << pi << endl;",
          answer: "double",
          expect: "3.14",
          en: {
            task: "Declare pi = 3.14 as double type,\nprint it with cout",
            guide: "double pi = 3.14;"
          }
        }
      },

      // Practice (new) 2: 형변환 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "int a=9, b=4가 있어요.\n정수 나눗셈 결과와, double로 형변환한 나눗셈 결과를 차례로 출력해요!",
          guide: "(double)a / b 로 형변환",
          template: "int a = 9, b = 4;\ncout << a / b << endl;\ncout << (___)a / b << endl;",
          answer: "double",
          alternateAnswers: ["double"],
          expect: "2\n2.25",
          en: {
            task: "Given int a=9, b=4, print the integer division result,\nthen print the result after casting to double",
            guide: "Use (double)a / b for the cast"
          }
        }
      },

      // Practice (new) 3: 처음부터 — string + int + bool 한 번에
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 이름(string), 나이(int), 성인 여부(bool, 18 이상이면 true)를\n선언하고 \"Tom | 20 | 1\" 형식으로 출력해요",
          guide: "string / int / bool 타입 선언 연습",
          hint: "string name = \"Tom\";\nint age = 20;\nbool isAdult = age >= 18;\ncout << name << \" | \" << age << \" | \" << isAdult << endl;",
          template: null,
          answer: "string name = \"Tom\";\nint age = 20;\nbool isAdult = age >= 18;\ncout << name << \" | \" << age << \" | \" << isAdult << endl;",
          alternateAnswers: [
            "string name=\"Tom\";int age=20;bool isAdult=age>=18;\ncout<<name<<\" | \"<<age<<\" | \"<<isAdult<<endl;"
          ],
          expect: "Tom | 20 | 1",
          en: {
            task: "Write from scratch! Declare name (string), age (int), isAdult (bool, true if age >= 18)\nand print in format \"Tom | 20 | 1\"",
            guide: "Practice string / int / bool type declarations together"
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
