import { LessonData } from '../types';

export const lessonCpp1: LessonData = {
    id: "cpp-1",
    title: "Hello, C++!",
    description: "C++ 첫 프로그램 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 기본 구조 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "기본 구조",
          desc: "C++ Hello World 구조를 익혀요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'std::cout << "Hello" << std::endl;',
          result: "Hello",
          note: "std::endl = 줄바꿈 (파이썬 print의 자동 줄바꿈과 같아요!)"
        }
      },

      // 출력 예측 (explain + predict)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'std::cout << "A" << "B" << "C" << std::endl;',
          predict: {
            question: "이 코드의 출력은?",
            options: ["A B C", "ABC", "A, B, C"],
            answer: 1,
            feedback: "C++ std::cout은 자동 공백이 없어서 ABC가 출력돼요!"
          },
          en: {
            predict: {
              question: "What's the output of this code?",
              options: ["A B C", "ABC", "A, B, C"],
              feedback: "std::cout has no automatic spaces, so ABC is printed!"
            }
          }
        }
      },

      // ===== Lv.1: << 연산자 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "std::cout으로 Hello를 출력해요!",
          guide: "<< 연산자를 써야 해요!",
          template: 'std::cout ___ "Hello" ___ std::endl;',
          answer: "<<",
          blanksAnswer: ["<<", "<<"],
          expect: 'std::cout << "Hello" << std::endl;',
          en: {
            task: "Print Hello using std::cout!",
            guide: "You need to use the << operator!"
          }
        }
      },

      // ===== Lv.2: 문자열 출력 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: '"Hello, C++!"를 출력해요!',
          guide: 'std::cout << "___" << std::endl; 형태로!',
          template: { before: 'std::cout << "', after: '" << std::endl;' },
          answer: "Hello, C++!",
          expect: 'std::cout << "Hello, C++!" << std::endl;',
          en: {
            task: 'Print "Hello, C++!"!',
            guide: 'Use the form std::cout << "___" << std::endl;'
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 출력이 이상해요. 왜일까요?",
          code: 'std::cout << "Hello";\nstd::cout << "World";',
          options: [
            "HelloWorld가 한 줄에 나온다",
            "에러가 난다",
            "Hello만 출력된다"
          ],
          answer: 0,
          explanation: "std::endl이나 \\n이 없으면 줄바꿈 없이 한 줄에 이어서 출력돼요!",
          en: {
            question: "The output of this code looks strange. Why?",
            options: [
              "HelloWorld appears on one line",
              "It causes an error",
              "Only Hello is printed"
            ],
            explanation: "Without std::endl or \\n, output continues on the same line without a newline!"
          }
        }
      },

      // ===== Lv.3: 전체 cout 문 쓰기 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: '"Good morning!"을 출력하는 std::cout 문을 써봐요!',
          hint: 'std::cout << "Good morning!" << std::endl;',
          template: null,
          answer: 'std::cout << "Good morning!" << std::endl;',
          alternateAnswers: [
            'std::cout << "Good morning!" << std::endl',
            'std::cout<<"Good morning!"<<std::endl;',
            'std::cout << "Good morning!" << "\\n";'
          ],
          expect: "Good morning!",
          en: {
            task: 'Write a std::cout statement that prints "Good morning!"!',
            hint: 'std::cout << "Good morning!" << std::endl;'
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "출력 마스터!",
          emoji: "📢"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "cout 출력",
          learned: [
            "std::cout << 로 화면에 출력",
            "<< 체이닝으로 여러 값 연결",
            "std::endl 또는 \\n으로 줄바꿈",
            "자동 공백 없음 — 직접 넣어야!"
          ],
          canDo: "std::cout으로 원하는 텍스트를 출력할 수 있어요!",
          emoji: "📢"
        }
      },

      // ==================== CHAPTER 3: 종합 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "종합 프로젝트",
          desc: "배운 것을 모아 프로그램을 만들어요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! std::cout 문 기억나요?",
          task: '"Hi!"를 출력하는 std::cout 문을 써봐요!',
          template: null,
          answer: 'std::cout << "Hi!" << std::endl;',
          alternateAnswers: [
            'std::cout << "Hi!" << std::endl',
            'std::cout<<"Hi!"<<std::endl;'
          ],
          expect: "Hi!",
          en: {
            message: "Wait! Do you remember std::cout statements?",
            task: 'Write a std::cout statement that prints "Hi!"!'
          }
        }
      },

      // 숫자 vs 문자열 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'std::cout << 10 + 20 << std::endl;\nstd::cout << "10 + 20" << std::endl;',
          predict: {
            question: "출력 결과는?",
            options: ['30\n30', '10 + 20\n10 + 20', '30\n10 + 20'],
            answer: 2,
            feedback: "따옴표 없는 10+20은 계산되어 30, 따옴표 있는 건 문자열이라 그대로!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ['30\n30', '10 + 20\n10 + 20', '30\n10 + 20'],
              feedback: "10+20 without quotes is calculated as 30; with quotes it's a string and prints as-is!"
            }
          }
        }
      },

      // 프로젝트: 게임 캐릭터 카드
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "먼저 #include와 main 틀을 써봐요!",
          target: "#include <iostream>\n\nint main() {\n\n    return 0;\n}",
          hint: "#include <iostream> + int main() { return 0; }",
          done: [],
          answer: "#include <iostream>\n\nint main() {\n\n    return 0;\n}"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "이름을 출력하는 std::cout 문을 써봐요!",
          target: 'std::cout << "이름: 주현" << std::endl;',
          hint: 'std::cout << "이름: 주현" << std::endl;',
          done: ["#include <iostream>\nint main() {"],
          answer: 'std::cout << "이름: 주현" << std::endl;'
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "나이도 출력해봐요!",
          target: 'std::cout << "나이: 14" << std::endl;',
          hint: 'std::cout << "나이: 14" << std::endl;',
          done: ["#include <iostream>\nint main() {", 'std::cout << "이름: 주현" << std::endl;'],
          answer: 'std::cout << "나이: 14" << std::endl;'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "C++ 마스터!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: C++ 기본 구조 손에 익히기 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "기본 구조 손에 익히기",
          desc: "#include → main() → return 0 — 눈 감고도 쓸 수 있게!"
        }
      },

      // Drill 1: 헤더 + namespace + main 완성
      {
        type: "practice",
        content: {
          level: 1,
          task: "빈칸을 채워 \"Hello, C++!\"을 출력하는 완전한 프로그램을 완성해요",
          guide: "#include <iostream> → using namespace std; → int main()",
          template: "#include <___>\n___ namespace std;\n\nint ___() {\n    cout << \"Hello, C++!\" << endl;\n    return 0;\n}",
          blanksAnswer: ["iostream", "using", "main"],
          answer: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, C++!\" << endl;\n    return 0;\n}",
          expect: "Hello, C++!",
          en: {
            task: "Fill in the blanks to complete a program that prints \"Hello, C++!\"",
            guide: "#include <iostream> → using namespace std; → int main()"
          }
        }
      },

      // Drill 2: 변수 선언 + 출력
      {
        type: "practice",
        content: {
          level: 1,
          task: "정수 x=10, 실수 y=3.14를 선언하고 둘 다 출력해요",
          guide: "int x = 10; double y = 3.14;",
          template: "___ x = 10;\n___ y = 3.14;\ncout << x << endl;\ncout << y << endl;",
          blanksAnswer: ["int", "double"],
          answer: "int x = 10;\ndouble y = 3.14;\ncout << x << endl;\ncout << y << endl;",
          expect: "10\n3.14",
          en: {
            task: "Declare int x=10, double y=3.14, then print both",
            guide: "int x = 10; double y = 3.14;"
          }
        }
      },

      // Drill 3: 처음부터 — 기본 프로그램 작성
      {
        type: "practice",
        content: {
          level: 2,
          task: "처음부터 작성! 완전한 C++ 프로그램:\n정수 a=7, b=3을 선언하고 a+b, a-b, a*b를 각각 출력",
          guide: "#include → main → 변수 선언 → cout 3번",
          hint: "#include <iostream>\nusing namespace std;\nint main() {\n    int a=7, b=3;\n    cout<<a+b<<endl;\n    cout<<a-b<<endl;\n    cout<<a*b<<endl;\n    return 0;\n}",
          template: null,
          answer: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 7, b = 3;\n    cout << a + b << endl;\n    cout << a - b << endl;\n    cout << a * b << endl;\n    return 0;\n}",
          alternateAnswers: [
            "#include<iostream>\nusing namespace std;\nint main(){int a=7,b=3;cout<<a+b<<endl;cout<<a-b<<endl;cout<<a*b<<endl;return 0;}"
          ],
          expect: "10\n4\n21",
          en: {
            task: "Write from scratch! Complete C++ program:\nDeclare int a=7, b=3, then print a+b, a-b, a*b",
            guide: "#include → main → declare variables → 3 cout statements"
          }
        }
      },

      // Drill 4: 처음부터 — cout + endl + 타입
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 완전한 프로그램:\n이름(문자열), 나이(정수), 키(실수)를 변수에 저장하고 각각 출력",
          guide: "string name; int age; double height; cout 3번",
          hint: "string name = \"Alice\";\nint age = 18;\ndouble height = 165.5;\ncout << name << endl;\ncout << age << endl;\ncout << height << endl;",
          template: null,
          answer: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name = \"Alice\";\n    int age = 18;\n    double height = 165.5;\n    cout << name << endl;\n    cout << age << endl;\n    cout << height << endl;\n    return 0;\n}",
          alternateAnswers: [
            "#include <iostream>\nusing namespace std;\nint main() {\n    string name = \"Alice\";\n    int age = 18;\n    double height = 165.5;\n    cout << name << endl;\n    cout << age << endl;\n    cout << height << endl;\n    return 0;\n}"
          ],
          expect: "Alice\n18\n165.5",
          en: {
            task: "Write from scratch! Complete program:\nStore a name (string), age (int), height (double), then print each",
            guide: "string name; int age; double height; 3 cout statements"
          }
        }
      },

      // ==================== CHAPTER 5: 심화 예측 & 오류 잡기 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "심화 예측 & 오류 잡기",
          desc: "코드를 읽고 결과를 예측하고, 숨어있는 오류를 찾아요!"
        }
      },

      // predict 1: using namespace std vs std::
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello" << endl;\n    cout << "World" << endl;\n    return 0;\n}',
          predict: {
            options: ["Hello World", "Hello\nWorld", "HelloWorld"],
            answer: 1,
            feedback: "endl로 줄바꿈! Hello 다음 줄에 World가 나와요."
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["Hello World", "Hello\nWorld", "HelloWorld"],
              feedback: "endl adds a newline! World appears on the next line after Hello."
            }
          }
        }
      },

      // predict 2: \n vs endl
      {
        type: "explain",
        content: {
          lines: ["\\n과 endl의 차이를 확인해봐요!"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "One\\n";\n    cout << "Two" << endl;\n    cout << "Three";\n    return 0;\n}',
          predict: {
            options: ["One Two Three", "One\nTwo\nThree", "One\nTwo\nThree\n"],
            answer: 1,
            feedback: "\\n도 줄바꿈이에요! One 다음, Two 다음 줄바꿈. Three 뒤에는 줄바꿈이 없어요."
          },
          en: {
            lines: ["Let's check the difference between \\n and endl!"],
            predict: {
              options: ["One Two Three", "One\nTwo\nThree", "One\nTwo\nThree\n"],
              feedback: "\\n is also a newline! After One, after Two there's a newline. Three has no trailing newline."
            }
          }
        }
      },

      // predict 3: return type 확인
      {
        type: "explain",
        content: {
          lines: ["이 코드 실행 결과는?"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Start" << endl;\n    cout << 3 * 4 << endl;\n    cout << "End" << endl;\n    return 0;\n}',
          predict: {
            options: ["Start\n12\nEnd", "Start\n3 * 4\nEnd", "Start\n34\nEnd"],
            answer: 0,
            feedback: "숫자 3 * 4는 계산되어 12가 출력돼요. 따옴표 없으면 계산식이에요!"
          },
          en: {
            lines: ["What's the result of running this code?"],
            predict: {
              options: ["Start\n12\nEnd", "Start\n3 * 4\nEnd", "Start\n34\nEnd"],
              feedback: "3 * 4 without quotes is calculated to 12. Without quotes it's an arithmetic expression!"
            }
          }
        }
      },

      // predict 4: 여러 << 체이닝
      {
        type: "explain",
        content: {
          lines: ["체이닝 출력 결과를 예측해봐요!"],
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    cout << "a = " << a << ", a*2 = " << a * 2 << endl;\n    return 0;\n}',
          predict: {
            options: ["a = 5, a*2 = 10", "a = a, a*2 = a*2", "a=5,a*2=10"],
            answer: 0,
            feedback: '<< 체이닝으로 문자열과 변수를 이어 붙여요! "a = " 다음 변수 a(5), 그다음 ", a*2 = ", 그다음 a*2(10).'
          },
          en: {
            lines: ["Predict the result of chained output!"],
            predict: {
              options: ["a = 5, a*2 = 10", "a = a, a*2 = a*2", "a=5,a*2=10"],
              feedback: 'You chain strings and variables together with <<! "a = " then variable a(5), then ", a*2 = ", then a*2(10).'
            }
          }
        }
      },

      // errorQuiz 2: missing #include
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: 'using namespace std;\nint main() {\n    cout << "Hello!" << endl;\n    return 0;\n}',
          options: [
            "#include <iostream>가 없어",
            "세미콜론(;)이 없어",
            "return 0이 없어"
          ],
          answer: 0,
          explanation: "cout과 endl을 쓰려면 #include <iostream>이 반드시 필요해요! 헤더 없이는 컴파일 에러가 나요.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "Missing #include <iostream>",
              "Missing semicolon (;)",
              "Missing return 0"
            ],
            explanation: "To use cout and endl, you need #include <iostream>! Without the header, it won't compile."
          }
        }
      },

      // errorQuiz 3: wrong return type
      {
        type: "errorQuiz",
        content: {
          question: "이 코드에서 경고/에러가 날 수 있는 이유는?",
          code: '#include <iostream>\nusing namespace std;\nvoid main() {\n    cout << "Hello!" << endl;\n}',
          options: [
            "main 함수의 반환 타입이 int여야 해",
            "#include가 잘못됐어",
            "endl 대신 \\n을 써야 해"
          ],
          answer: 0,
          explanation: "C++ 표준에서 main()의 반환 타입은 반드시 int예요! void main()은 표준이 아니라 컴파일러에 따라 에러가 나요.",
          en: {
            question: "Why might this code produce a warning/error?",
            options: [
              "The return type of main must be int",
              "#include is wrong",
              "Should use \\n instead of endl"
            ],
            explanation: "In C++ standard, main()'s return type must be int! void main() is non-standard and may cause errors depending on the compiler."
          }
        }
      },

      // errorQuiz 4: missing semicolon
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는?",
          code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "hello"\n    return 0;\n}',
          options: [
            "세미콜론(;)이 없어",
            "#include가 없어",
            "return 값이 틀렸어"
          ],
          answer: 0,
          explanation: 'C++에서 모든 문장 끝에는 세미콜론(;)이 필수야! cout << "안녕"; 처럼 써야 해요.',
          en: {
            question: "What's wrong with this code?",
            options: [
              "Missing semicolon (;)",
              "Missing #include",
              "Wrong return value"
            ],
            explanation: 'Every statement in C++ needs a semicolon (;)! Write it as cout << "안녕";'
          }
        }
      },

      // practice A: using namespace std로 전환
      {
        type: "practice",
        content: {
          level: 1,
          task: '"Coding is fun!" 을 출력하는 프로그램을 완성해요 (using namespace std 사용)',
          guide: "using namespace std; 를 쓰면 std:: 없이 cout을 쓸 수 있어요!",
          template: "#include <iostream>\n___ namespace std;\n\nint main() {\n    cout << ___ << endl;\n    return 0;\n}",
          blanksAnswer: ["using", '"Coding is fun!"'],
          answer: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Coding is fun!" << endl;\n    return 0;\n}',
          expect: "Coding is fun!",
          en: {
            task: 'Complete the program to print "Coding is fun!" (using namespace std)',
            guide: "With using namespace std; you can use cout without the std:: prefix!"
          }
        }
      },

      // practice B: 두 줄 출력
      {
        type: "practice",
        content: {
          level: 2,
          task: '"Hello"와 "C++" 를 각각 다른 줄에 출력하는 코드를 완성해요',
          guide: "cout을 두 번 쓰거나 \\n으로 줄바꿈해요!",
          template: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << ___ << endl;\n    cout << ___ << endl;\n    return 0;\n}',
          blanksAnswer: ['"Hello"', '"C++"'],
          answer: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello" << endl;\n    cout << "C++" << endl;\n    return 0;\n}',
          expect: "Hello\nC++",
          en: {
            task: 'Complete the code to print "Hello" and "C++" on separate lines',
            guide: "Use cout twice or use \\n for newlines!"
          }
        }
      },

      // practice C: 처음부터 — 기본 구조 + 두 줄 출력
      {
        type: "practice",
        content: {
          level: 3,
          task: '처음부터 작성! "My name is" 와 본인 이름을 각각 다른 줄에 출력하는 완전한 C++ 프로그램을 써봐요',
          guide: "#include → using namespace std → int main() → cout 두 번 → return 0",
          hint: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "My name is" << endl;\n    cout << "Alice" << endl;\n    return 0;\n}',
          template: null,
          answer: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "My name is" << endl;\n    cout << "Alice" << endl;\n    return 0;\n}',
          alternateAnswers: [
            '#include<iostream>\nusing namespace std;\nint main(){cout<<"My name is"<<endl;cout<<"Alice"<<endl;return 0;}'
          ],
          expect: "My name is\nAlice",
          en: {
            task: 'Write from scratch! A complete C++ program that prints "My name is" and your name on separate lines',
            guide: "#include → using namespace std → int main() → two cout statements → return 0"
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
