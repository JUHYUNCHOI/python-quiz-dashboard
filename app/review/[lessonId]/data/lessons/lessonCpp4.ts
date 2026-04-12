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
          code: '// Python\nname = input("name: ")\n\n// C++\nstring name;\ncout << "name: ";\ncin >> name;',
          note: "cin >> 는 키보드에서 값을 변수에 넣어요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << "나이를 입력하세요: ";\n    cin >> age;\n    cout << "당신의 나이: " << age << endl;\n    return 0;\n}',
          result: "나이를 입력하세요: 14\n당신의 나이: 14",
          predict: {
            question: "cin >> age; 에서 >>의 방향은?",
            options: ["키보드 → 변수 (오른쪽으로)", "변수 → 화면 (왼쪽으로)", "상관없다"],
            answer: 0,
            feedback: ">>는 키보드에서 변수 쪽으로! cout << 와 반대 방향이에요."
          },
          en: {
            predict: {
              question: "Which direction does >> point in cin >> age;?",
              options: ["Keyboard → variable (rightward)", "Variable → screen (leftward)", "Doesn't matter"],
              feedback: ">> flows from keyboard to variable! The opposite direction of cout <<."
            }
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
          expect: "cin >> age;",
          en: {
            task: "Read the age as input!",
            guide: "Use the form: cin >> variableName;"
          }
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
          expect: "double height;\ncin >> height;",
          en: {
            task: "Read the height as input!",
            guide: "Use the form: cin >> variable;"
          }
        }
      },

      // string 입력
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "name: ";\n    cin >> name;\n    cout << "hello, " << name << "!" << endl;\n    return 0;\n}',
          result: "name: alice\nhello, alice!",
          predict: {
            question: '"Kim Juhyun"을 입력하면?',
            options: ['"안녕, Kim Juhyun!"', '"안녕, Kim!"', "에러가 난다"],
            answer: 1,
            feedback: "cin >>은 공백(스페이스)에서 멈춰요! Kim만 저장되고 Juhyun은 버려져요."
          },
          en: {
            predict: {
              question: 'What happens when you enter "Kim Juhyun"?',
              options: ['"Hello, Kim Juhyun!"', '"Hello, Kim!"', "Error"],
              feedback: "cin >> stops at spaces! Only Kim is stored and Juhyun is discarded."
            }
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
          explanation: "<< 는 '보내다' (변수 → 화면), >> 는 '받다' (키보드 → 변수)! 화살표 방향을 생각하면 쉬워요!",
          en: {
            question: "Why do cout << and cin >> have opposite arrow directions?",
            options: [
              "cout sends to screen (<<), cin receives into variable (>>)",
              "Just a rule",
              "cout is for large values, cin for small values"
            ],
            explanation: "<< means 'send' (variable → screen), >> means 'receive' (keyboard → variable)! Think of the arrow direction!"
          }
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
          explanation: "cin은 >> (받는 방향)을 써야 해요! cin >> num; 이 맞아요.",
          en: {
            question: "What is the problem with this code?",
            options: [
              "cin should use >> not <<",
              "num is not initialized",
              "cout is wrong"
            ],
            explanation: "cin needs >> (receiving direction)! cin >> num; is correct."
          }
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
          expect: 'string name;\ncout << "이름: ";\ncin >> name;',
          en: {
            task: "Complete the code to ask for and read the name!",
            guide: "Ask with cout, receive with cin!"
          }
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
          expect: "cin >> num;",
          en: {
            message: "Wait! Do you remember cin?",
            task: "Write the code to read a value into variable num!"
          }
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
          explanation: "getline(cin, 변수)는 공백 포함 한 줄 전체를 입력받아요! cin >>은 공백에서 멈춰요.",
          en: {
            question: "How do you read a sentence that includes spaces?",
            options: [
              "cin >> sentence;",
              "getline(cin, sentence);",
              "cin.getline(sentence);",
              "input(sentence);"
            ],
            explanation: "getline(cin, variable) reads an entire line including spaces! cin >> stops at spaces."
          }
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
          expect: "string address;\ngetline(cin, address);",
          en: {
            task: "Read the address including spaces!",
            guide: "Use the form: getline(cin, variable)"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cout << "두 숫자: ";\n    cin >> a >> b;\n    cout << "합: " << a + b << endl;\n    return 0;\n}',
          result: "두 숫자: 10 20\n합: 30",
          predict: {
            question: "cin >> a >> b; 에서 \"10 20\" 입력하면?",
            options: ["a=10, b=20", "a=1020, b는 비어있음", "에러"],
            answer: 0,
            feedback: "공백으로 구분돼서 a에 10, b에 20이 들어가요!"
          },
          en: {
            predict: {
              question: 'What happens when you enter "10 20" for cin >> a >> b;?',
              options: ["a=10, b=20", "a=1020, b is empty", "Error"],
              feedback: "Spaces act as separators — a gets 10 and b gets 20!"
            }
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
          expect: "string name;\nint age;\ncin >> name >> age;",
          en: {
            task: "Read name and age at once!",
            guide: "Use the form: cin >> variable1 >> variable2;"
          }
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
          explanation: "cin >> age 후 엔터(\\n)가 남아있어요. getline이 그 엔터를 읽어서 빈 문자열이 돼요! cin.ignore()로 엔터를 지워줘야 해요.",
          en: {
            question: "When this code runs, the name input is skipped. Why?",
            options: [
              "getline reads the leftover newline from cin >>",
              "getline syntax is wrong",
              "cin cannot read strings"
            ],
            explanation: "After cin >> age, a newline (\\n) remains. getline reads that newline and gets an empty string! Use cin.ignore() to clear the newline."
          }
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
          expect: "getline(cin, text);",
          en: {
            message: "Wait! Do you remember input with spaces?",
            task: "What function reads input including spaces?"
          }
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    cout << "첫 번째 숫자: ";\n    cin >> a;\n    cout << "두 번째 숫자: ";\n    cin >> b;\n    cout << a << " + " << b << " = " << a + b << endl;\n    return 0;\n}',
          result: "첫 번째 숫자: 10.5\n두 번째 숫자: 3.2\n10.5 + 3.2 = 13.7",
          predict: {
            question: "a와 b가 int라면 10.5를 입력하면?",
            options: ["10.5가 저장됨", "10만 저장됨", "에러"],
            answer: 1,
            feedback: "int는 소수점을 버려요! 정확한 계산을 원하면 double을 쓰세요."
          },
          en: {
            predict: {
              question: "If a and b are int, what happens when you enter 10.5?",
              options: ["10.5 is stored", "Only 10 is stored", "Error"],
              feedback: "int discards the decimal! Use double for accurate calculations."
            }
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

      // ==================== CHAPTER 4: cin 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "cin 손에 익히기",
          desc: "입력 → 처리 → 출력 패턴을 손이 기억할 때까지!"
        }
      },

      // Drill 1: 두 수 입력 → 연산
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 두 개를 입력받아 합, 차, 곱을 각각 한 줄씩 출력해요",
          guide: "int a, b; cin >> a >> b;",
          template: "int a, b;\n___ >> a >> b;\ncout << a + b << endl;\ncout << a - b << endl;\ncout << a ___ b << endl;",
          blanksAnswer: ["cin", "*"],
          answer: "int a, b;\ncin >> a >> b;\ncout << a + b << endl;\ncout << a - b << endl;\ncout << a * b << endl;",
          expect: "12\n2\n35",
          en: {
            task: "Read two integers and print their sum, difference, and product on separate lines",
            guide: "int a, b; cin >> a >> b;"
          }
        }
      },

      // Drill 2: n개 입력 → 처리
      {
        type: "practice",
        content: {
          level: 2,
          task: "정수 n을 입력받고 → n개의 수를 입력받아 → 최솟값을 출력해요",
          guide: "minVal = 첫 번째 수, for loop으로 비교",
          template: "int n;\ncin >> n;\nint minVal, x;\ncin >> minVal;\nfor (int i = 1; i < n; i++) {\n    ___ >> x;\n    if (x ___ minVal) minVal = x;\n}\ncout << minVal << endl;",
          blanksAnswer: ["cin", "< "],
          alternateAnswers: [],
          answer: "int n;\ncin >> n;\nint minVal, x;\ncin >> minVal;\nfor (int i = 1; i < n; i++) {\n    cin >> x;\n    if (x < minVal) minVal = x;\n}\ncout << minVal << endl;",
          expect: "2",
          en: {
            task: "Read n, then read n numbers, then print the minimum value",
            guide: "minVal = first number, compare in for loop"
          }
        }
      },

      // Drill 3: 처음부터 — 이름 + 나이 입력 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: "처음부터 작성! 이름(string)과 나이(int)를 입력받아 \"이름 is N years old.\" 형식으로 출력",
          guide: "string name; int age; cin >> name >> age;",
          hint: "string name;\nint age;\ncin >> name >> age;\ncout << name << \" is \" << age << \" years old.\" << endl;",
          template: null,
          answer: "string name;\nint age;\ncin >> name >> age;\ncout << name << \" is \" << age << \" years old.\" << endl;",
          alternateAnswers: [
            "string name;int age;cin>>name>>age;cout<<name<<\" is \"<<age<<\" years old.\"<<endl;"
          ],
          expect: "Alice is 20 years old.",
          en: {
            task: "Write from scratch! Read a name (string) and age (int), print \"name is N years old.\"",
            guide: "string name; int age; cin >> name >> age;"
          }
        }
      },

      // Drill 4: 처음부터 — 성적 합산
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 3개의 점수를 입력받아 합계와 평균(소수점 포함)을 출력해요",
          guide: "int a,b,c; cin>>a>>b>>c; cout << sum << (double)sum/3",
          hint: "int a, b, c;\ncin >> a >> b >> c;\nint sum = a + b + c;\ncout << sum << endl;\ncout << (double)sum / 3 << endl;",
          template: null,
          answer: "int a, b, c;\ncin >> a >> b >> c;\nint sum = a + b + c;\ncout << sum << endl;\ncout << (double)sum / 3 << endl;",
          alternateAnswers: [
            "int a,b,c;\ncin>>a>>b>>c;\nint sum=a+b+c;\ncout<<sum<<endl<<(double)sum/3<<endl;"
          ],
          expect: "270\n90",
          en: {
            task: "Write from scratch! Read 3 scores, print the total and average (with decimal)",
            guide: "int a,b,c; cin>>a>>b>>c; cout << sum << (double)sum/3"
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
