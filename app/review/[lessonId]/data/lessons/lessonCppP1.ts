import { LessonData } from '../types';

export const lessonCppP1: LessonData = {
    id: "cpp-p1",
    title: "숫자 맞추기 게임 프로젝트 복습",
    description: "숫자 맞추기 게임의 핵심 개념 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 게임 구조 복습 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "게임 구조 복습",
          desc: "rand(), while loop, if/else를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자 맞추기 게임의 핵심은 랜덤 숫자 생성이에요!",
            "rand()와 srand()를 써서 매번 다른 숫자를 만들어요."
          ],
          code: '#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));           // 시드 설정\n    int answer = rand() % 100 + 1;  // 1~100\n    cout << "1~100 숫자를 맞춰보세요!" << "\\n";\n    return 0;\n}',
          result: "1~100 숫자를 맞춰보세요!",
          note: "srand(time(0))으로 매번 다른 시드! rand() % 100 + 1 = 1~100 범위"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [
            "rand() % N 은 0부터 N-1까지의 숫자를 만들어요!",
            "+1을 하면 1부터 N까지가 돼요."
          ],
          code: 'int a = rand() % 10;       // 0 ~ 9\nint b = rand() % 10 + 1;   // 1 ~ 10\nint c = rand() % 6 + 1;    // 1 ~ 6 (주사위!)',
          predict: {
            question: "rand() % 50 + 1 의 범위는?",
            options: ["0 ~ 50", "1 ~ 50", "1 ~ 51"],
            answer: 1,
            feedback: "rand() % 50은 0~49, 거기에 +1 하면 1~50이 돼요!"
          }
        }
      },

      // Lv.1: srand 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "랜덤 시드를 설정해요!",
          guide: "srand에 time(0)을 넣어요!",
          template: "srand(___);",
          answer: "time(0)",
          alternateAnswers: ["time(NULL)", "time(nullptr)"],
          expect: "srand(time(0));"
        }
      },

      // 퀴즈: rand 범위
      {
        type: "quiz",
        content: {
          question: "1부터 20까지 랜덤 숫자를 만드는 코드는?",
          options: [
            "rand() % 20",
            "rand() % 20 + 1",
            "rand() % 21",
            "rand() % 21 + 1"
          ],
          answer: 1,
          explanation: "rand() % 20 = 0~19, +1 하면 1~20이 돼요!"
        }
      },

      // while 루프 설명
      {
        type: "explain",
        content: {
          lines: [
            "사용자가 맞출 때까지 반복해야 해요!",
            "while 루프로 계속 추측을 받아요."
          ],
          code: 'int guess;\nwhile (true) {\n    cout << "추측: ";\n    cin >> guess;\n    if (guess == answer) {\n        cout << "정답!" << "\\n";\n        break;\n    } else if (guess < answer) {\n        cout << "더 크게!" << "\\n";\n    } else {\n        cout << "더 작게!" << "\\n";\n    }\n}',
          note: "while(true) + break 패턴! 맞추면 break로 탈출!"
        }
      },

      // Lv.1: if/else 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "추측이 정답보다 작을 때의 조건을 써요!",
          guide: "guess가 answer보다 작으면 '더 크게!'",
          template: "if (guess ___ answer) {\n    cout << \"더 크게!\" << \"\\n\";\n}",
          answer: "<",
          expect: "if (guess < answer) {\n    cout << \"더 크게!\" << \"\\n\";\n}"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'int answer = rand() % 100 + 1;\n// srand()를 안 씀!',
          options: [
            "srand()가 없어서 매번 같은 숫자가 나와요",
            "rand()는 C++에서 못 써요",
            "% 100 대신 % 101을 써야 해요"
          ],
          answer: 0,
          explanation: "srand()로 시드를 설정하지 않으면 매번 같은 순서의 랜덤 숫자가 나와요!"
        }
      },

      // Lv.2: break 조건 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "정답을 맞추면 루프를 탈출해요!",
          guide: "guess와 answer가 같으면 break!",
          template: "if (guess == answer) {\n    cout << \"정답!\" << \"\\n\";\n    ___;\n}",
          answer: "break",
          expect: "if (guess == answer) {\n    cout << \"정답!\" << \"\\n\";\n    break;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "게임 구조 복습 완료!",
          emoji: "🎮"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "게임 구조 복습",
          learned: [
            "srand(time(0)) — 랜덤 시드 설정",
            "rand() % N + 1 — 1~N 범위 랜덤",
            "while(true) + break — 맞출 때까지 반복",
            "if/else if/else — 크다/작다/정답 판별"
          ],
          canDo: "랜덤 숫자 생성과 반복 루프를 쓸 수 있어요!",
          emoji: "🎮"
        }
      },

      // ==================== CHAPTER 2: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "게임 핵심 코드 작성",
          desc: "숫자 맞추기 게임의 핵심 코드를 직접 써봐요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 랜덤 숫자 만드는 법 기억나요?",
          task: "1~100 랜덤 숫자를 만드는 코드를 써봐요!",
          template: "int answer = rand() % ___ + ___;",
          answer: "100",
          blanksAnswer: ["100", "1"],
          expect: "int answer = rand() % 100 + 1;"
        }
      },

      // 종합 설명
      {
        type: "explain",
        content: {
          lines: [
            "이제 숫자 맞추기 게임의 전체 구조를 봐요!",
            "시도 횟수도 세면 더 재미있어요!"
          ],
          code: 'int answer = rand() % 100 + 1;\nint guess, tries = 0;\n\nwhile (true) {\n    cin >> guess;\n    tries++;\n    if (guess == answer) {\n        cout << tries << "번 만에 정답!" << "\\n";\n        break;\n    }\n    cout << (guess < answer ? "UP!" : "DOWN!") << "\\n";\n}',
          predict: {
            question: "삼항 연산자 (guess < answer ? \"UP!\" : \"DOWN!\")은 뭘 하나요?",
            options: [
              "항상 UP!을 출력해요",
              "guess가 작으면 UP!, 크면 DOWN!을 출력해요",
              "에러가 나요"
            ],
            answer: 1,
            feedback: "삼항 연산자! 조건 ? 참 : 거짓 — guess가 작으면 더 키우라고 UP!"
          }
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 랜덤 시드를 설정해요!",
          target: "#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));",
          hint: "iostream + cstdlib + ctime, srand(time(0))",
          done: [],
          answer: "#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\n\nint main() {\n    srand(time(0));"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "랜덤 정답과 변수를 만들어요!",
          target: "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;",
          hint: "rand() % 100 + 1 = 1~100 범위",
          done: ["#include <iostream>\n#include <cstdlib>\n#include <ctime>\nusing namespace std;\nint main() {\n    srand(time(0));"],
          answer: "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "while 루프로 게임 로직을 완성해요!",
          target: "    while (true) {\n        cin >> guess;\n        tries++;\n        if (guess == answer) {\n            cout << \"정답! \" << tries << \"번\" << \"\\n\";\n            break;\n        }\n        cout << (guess < answer ? \"UP!\" : \"DOWN!\") << \"\\n\";\n    }\n    return 0;\n}",
          hint: "while(true) + cin >> guess + if/else + break",
          done: ["... srand(time(0));", "    int answer = rand() % 100 + 1;\n    int guess, tries = 0;"],
          answer: "    while (true) {\n        cin >> guess;\n        tries++;\n        if (guess == answer) {\n            cout << \"정답! \" << tries << \"번\" << \"\\n\";\n            break;\n        }\n        cout << (guess < answer ? \"UP!\" : \"DOWN!\") << \"\\n\";\n    }\n    return 0;\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "숫자 맞추기 게임 완성!",
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
