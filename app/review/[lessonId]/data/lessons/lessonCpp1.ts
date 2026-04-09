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
          lines: [
            "C++ Hello World를 다시 봐볼까요? 👀",
            "파이썬은 print() 한 줄이면 끝이지만,",
            "C++은 이 틀이 꼭 필요해요!"
          ],
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello!" << std::endl;\n    return 0;\n}',
          result: "Hello!",
          note: "#include → int main() → std::cout → return 0"
        }
      },

      // ===== Lv.1: 구조 빈칸 채우기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "입출력 헤더를 불러와요!",
          guide: "std::cout을 쓰려면 어떤 헤더가 필요할까요?",
          template: "#include <___>",
          answer: "iostream",
          expect: "#include <iostream>",
          en: {
            task: "Include the I/O header!",
            guide: "Which header is needed to use std::cout?"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "프로그램 시작 함수를 써봐요!",
          guide: "C++은 어떤 함수에서 시작할까요?",
          template: "int ___() {",
          answer: "main",
          expect: "int main() {",
          en: {
            task: "Write the program entry function!",
            guide: "Which function does a C++ program start from?"
          }
        }
      },

      // 컴파일 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++이 파이썬과 다른 가장 큰 차이는?",
          options: [
            "print 대신 std::cout을 쓴다",
            "실행 전에 컴파일(번역)이 필요하다",
            "세미콜론을 써야 한다"
          ],
          answer: 1,
          explanation: "파이썬은 바로 실행(통역)하지만, C++은 먼저 컴파일(번역)한 다음 실행해요! 그래서 더 빨라요!",
          en: {
            question: "What is the biggest difference between C++ and Python?",
            options: [
              "Uses std::cout instead of print",
              "Requires compilation (translation) before running",
              "Requires semicolons"
            ],
            explanation: "Python runs directly (interpreted), but C++ must be compiled (translated) first, then run! That's why it's faster!"
          }
        }
      },

      // main() 퀴즈
      {
        type: "quiz",
        content: {
          question: "C++ 프로그램이 실행될 때 가장 먼저 호출되는 함수는?",
          options: ["start()", "run()", "main()", "begin()"],
          answer: 2,
          explanation: "C++ 프로그램은 반드시 main() 함수에서 시작해요!",
          en: {
            question: "Which function is called first when a C++ program runs?",
            options: ["start()", "run()", "main()", "begin()"],
            explanation: "Every C++ program must start from the main() function!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까요?",
          code: 'int main() {\n    std::cout << "Hello!" << std::endl;\n    return 0;\n}',
          options: [
            "main 함수가 없어서",
            "#include <iostream>이 빠져서",
            "return 0이 잘못돼서"
          ],
          answer: 1,
          explanation: "std::cout을 쓰려면 #include <iostream>이 꼭 필요해요!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Because main function is missing",
              "Because #include <iostream> is missing",
              "Because return 0 is wrong"
            ],
            explanation: "#include <iostream> is required to use std::cout!"
          }
        }
      },

      // ===== Lv.1: cout 출력 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "Hello를 화면에 출력해요!",
          guide: 'std::cout << "___" << std::endl; 형태!',
          template: { before: 'std::cout << "', after: '" << std::endl;' },
          answer: "Hello",
          expect: 'std::cout << "Hello" << std::endl;',
          en: {
            task: "Print Hello on the screen!",
            guide: 'Use the form std::cout << "___" << std::endl;'
          }
        }
      },

      // ===== Lv.2: << 연산자 연습 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "std::cout으로 Hi!를 출력해요!",
          guide: "<< 연산자로 보내야 해요!",
          template: 'std::cout ___ "Hi!" ___ std::endl;',
          answer: "<<",
          blanksAnswer: ["<<", "<<"],
          expect: 'std::cout << "Hi!" << std::endl;',
          en: {
            task: "Print Hi! using std::cout!",
            guide: "You need to use the << operator!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "기본 구조 완벽!",
          emoji: "🎉"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "기본 구조",
          learned: [
            "C++은 컴파일(번역) 후 실행 — 그래서 빠름!",
            "#include <iostream> — 입출력 헤더",
            "int main() — 프로그램 시작점",
            'std::cout << "Hello" << std::endl; — 화면에 출력',
            "return 0; — 정상 종료 신호"
          ],
          canDo: "C++ 프로그램의 기본 틀과 std::cout 출력을 쓸 수 있어요!",
          emoji: "🏗️"
        }
      },

      // ==================== CHAPTER 2: cout 출력 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "cout 출력",
          desc: "화면에 출력하는 법을 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "입출력 헤더 이름은?",
          template: "#include <___>",
          answer: "iostream",
          expect: "#include <iostream>",
          en: {
            message: "Wait! Do you remember what we learned earlier?",
            task: "What is the name of the I/O header?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "std::cout << 로 화면에 출력해요!",
            "<< 는 '보내다'라는 뜻이에요 📤"
          ],
          code: 'std::cout << "Hello" << std::endl;',
          result: "Hello",
          note: "std::endl = 줄바꿈 (파이썬 print의 자동 줄바꿈과 같아요!)"
        }
      },

      // 출력 예측 (explain + predict)
      {
        type: "explain",
        content: {
          lines: [
            "std::cout은 자동 공백이 없어요!",
            "문자열이 그대로 이어붙여져요"
          ],
          code: 'std::cout << "A" << "B" << "C" << std::endl;',
          predict: {
            question: "이 코드의 출력은?",
            options: ["A B C", "ABC", "A, B, C"],
            answer: 1,
            feedback: "C++ std::cout은 자동 공백이 없어서 ABC가 출력돼요!"
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
          lines: [
            "따옴표가 있으면 문자열, 없으면 숫자!",
            "숫자는 계산되고, 문자열은 그대로 출력돼요"
          ],
          code: 'std::cout << 10 + 20 << std::endl;\nstd::cout << "10 + 20" << std::endl;',
          predict: {
            question: "출력 결과는?",
            options: ['30\n30', '10 + 20\n10 + 20', '30\n10 + 20'],
            answer: 2,
            feedback: "따옴표 없는 10+20은 계산되어 30, 따옴표 있는 건 문자열이라 그대로!"
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

      // done
      {
        type: "done",
        content: {}
      }
    ]
};
