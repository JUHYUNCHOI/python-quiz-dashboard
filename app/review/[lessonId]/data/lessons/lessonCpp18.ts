import { LessonData } from '../types';

export const lessonCpp18: LessonData = {
    id: "cpp-18",
    title: "stack, queue & deque",
    description: "stack, queue, deque 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: stack & queue ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "stack & queue",
          desc: "LIFO와 FIFO 자료구조를 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "stack은 LIFO (Last In, First Out)! 🥞",
            "팬케이크 쌓기처럼 마지막에 넣은 게 먼저 나와요!",
            "push()로 넣고, top()으로 보고, pop()으로 빼요."
          ],
          code: '#include <stack>\nusing namespace std;\n\nstack<int> s;\ns.push(10);\ns.push(20);\ns.push(30);\ncout << s.top() << endl;  // 30 (마지막에 넣은 것)\ns.pop();                   // 30 제거\ncout << s.top() << endl;  // 20',
          result: "30\n20",
          note: "LIFO = 마지막에 넣은 게 먼저! (팬케이크, 뒤로가기 버튼)"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'stack<int> s;\ns.push(1);\ns.push(2);\ns.push(3);\ns.pop();\ns.pop();\ncout << s.top() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["3", "2", "1"],
            answer: 2,
            feedback: "push(1,2,3) 후 pop 2번 → 3과 2가 빠지고 1만 남아요!"
          }
        }
      },

      // Lv.1: stack push 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "stack에 값 42를 넣어요!",
          guide: "push(값) 형태!",
          template: "s.___(42);",
          answer: "push",
          expect: "s.push(42);",
          en: {
            task: "Push the value 42 onto a stack!",
            guide: "Use the form push(value)!"
          }
        }
      },

      // Lv.1: stack top 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "stack의 맨 위 값을 출력해요!",
          guide: "top()으로 맨 위를 볼 수 있어요!",
          template: "cout << s.___() << endl;",
          answer: "top",
          expect: "cout << s.top() << endl;",
          en: {
            task: "Print the top value of a stack!",
            guide: "Use top() to peek at the top!"
          }
        }
      },

      // queue 설명
      {
        type: "explain",
        content: {
          lines: [
            "queue는 FIFO (First In, First Out)! 🚶‍♂️🚶‍♀️",
            "줄 서기처럼 먼저 넣은 게 먼저 나와요!",
            "push()로 넣고, front()로 보고, pop()으로 빼요."
          ],
          code: '#include <queue>\nusing namespace std;\n\nqueue<int> q;\nq.push(10);\nq.push(20);\nq.push(30);\ncout << q.front() << endl;  // 10 (처음 넣은 것)\nq.pop();                     // 10 제거\ncout << q.front() << endl;  // 20',
          result: "10\n20",
          note: "FIFO = 먼저 넣은 게 먼저! (줄 서기, 프린터 대기열)"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "stack과 queue의 가장 큰 차이는?",
          options: [
            "stack은 빠르고 queue는 느리다",
            "stack은 LIFO, queue는 FIFO",
            "stack은 정수만, queue는 문자열만",
            "차이가 없다"
          ],
          answer: 1,
          explanation: "stack은 LIFO(후입선출 — 마지막 넣은 게 먼저), queue는 FIFO(선입선출 — 먼저 넣은 게 먼저)!",
          en: {
            question: "What is the biggest difference between stack and queue?",
            options: [
              "stack is faster and queue is slower",
              "stack is LIFO, queue is FIFO",
              "stack accepts only integers, queue accepts only strings",
              "There is no difference"
            ],
            explanation: "stack is LIFO (last in, first out — the last inserted comes out first), queue is FIFO (first in, first out — the first inserted comes out first)!"
          }
        }
      },

      // 퀴즈: top vs front
      {
        type: "quiz",
        content: {
          question: "stack에서 맨 위를 보려면 top(), queue에서 맨 앞을 보려면?",
          options: ["top()", "front()", "first()", "peek()"],
          answer: 1,
          explanation: "stack은 top()으로 맨 위, queue는 front()로 맨 앞을 봐요! (queue에는 back()도 있어요)",
          en: {
            question: "To peek at the top of a stack use top(); to peek at the front of a queue use?",
            options: ["top()", "front()", "first()", "peek()"],
            explanation: "stack uses top() to see the top, queue uses front() to see the front! (queue also has back())"
          }
        }
      },

      // Lv.1: queue front 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "queue의 맨 앞 값을 출력해요!",
          guide: "front()로 맨 앞을 볼 수 있어요!",
          template: "cout << q.___() << endl;",
          answer: "front",
          expect: "cout << q.front() << endl;",
          en: {
            task: "Print the front value of a queue!",
            guide: "Use front() to see the front!"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: 'stack<int> s;\ns.push(10);\ns.pop();\ncout << s.top() << endl;',
          options: [
            "빈 stack에서 top()을 호출해서 위험!",
            "pop() 대신 erase()를 써야 해서",
            "stack에는 top()이 없어서"
          ],
          answer: 0,
          explanation: "push(10) 후 pop()하면 stack이 비어요! 빈 stack에서 top()은 정의되지 않은 동작(undefined behavior)!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Calling top() on an empty stack is dangerous!",
              "Should use erase() instead of pop()",
              "stack doesn't have top()"
            ],
            explanation: "After push(10) and pop(), the stack is empty! Calling top() on an empty stack is undefined behavior!"
          }
        }
      },

      // Lv.2: stack size/empty 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "stack이 비어있는지 확인해요!",
          guide: "empty()는 비어있으면 true!",
          template: "if (s.___()) {\n    cout << \"비어있다!\" << endl;\n}",
          answer: "empty",
          expect: "if (s.empty()) {\n    cout << \"비어있다!\" << endl;\n}",
          en: {
            task: "Check whether a stack is empty!",
            guide: "empty() returns true if the stack is empty!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "stack & queue 마스터!",
          emoji: "🥞"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "stack & queue",
          learned: [
            "stack — LIFO (후입선출), push/top/pop",
            "queue — FIFO (선입선출), push/front/pop",
            "empty()로 비어있는지 확인, size()로 개수",
            "빈 stack/queue에서 top/front 호출 주의!",
            "<stack>, <queue> 헤더 필요!"
          ],
          canDo: "stack과 queue를 사용해서 LIFO/FIFO 자료구조를 다룰 수 있어요!",
          emoji: "🥞"
        }
      },

      // ==================== CHAPTER 2: deque ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "deque",
          desc: "양쪽 끝에서 넣고 빼는 deque를 복습해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나요?",
          task: "stack에서 맨 위 값을 보는 함수 이름은?",
          template: "cout << s.___() << endl;",
          answer: "top",
          expect: "cout << s.top() << endl;",
          en: {
            message: "Quick check! Do you remember what we learned earlier?",
            task: "What is the name of the function that peeks at the top of a stack?"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "deque (Double-Ended Queue)는 양쪽 끝에서 넣고 빼요! ↔️",
            "vector처럼 []로 접근도 되고, 앞/뒤 모두 push/pop 가능!",
            "stack + queue의 만능 버전이에요."
          ],
          code: '#include <deque>\nusing namespace std;\n\ndeque<int> dq;\ndq.push_back(10);   // 뒤에 넣기\ndq.push_back(20);\ndq.push_front(5);   // 앞에 넣기\n// dq = {5, 10, 20}\ncout << dq.front() << " " << dq.back() << endl;',
          result: "5 20",
          note: "push_front/push_back — 앞/뒤 모두 가능! vector는 push_back만!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'deque<int> dq = {10, 20, 30};\ndq.push_front(5);\ndq.pop_back();\ncout << dq.front() << " " << dq.back() << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["5 30", "5 20", "10 20"],
            answer: 1,
            feedback: "push_front(5) → {5,10,20,30}, pop_back() → {5,10,20}. front=5, back=20!"
          }
        }
      },

      // Lv.1: push_front 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "deque 앞에 값 1을 넣어요!",
          guide: "push_front(값) 형태!",
          template: "dq.___(1);",
          answer: "push_front",
          expect: "dq.push_front(1);",
          en: {
            task: "Insert the value 1 at the front of a deque!",
            guide: "Use the form push_front(value)!"
          }
        }
      },

      // Lv.1: push_back 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "deque 뒤에 값 99를 넣어요!",
          guide: "push_back(값) 형태!",
          template: "dq.___(99);",
          answer: "push_back",
          expect: "dq.push_back(99);",
          en: {
            task: "Insert the value 99 at the back of a deque!",
            guide: "Use the form push_back(value)!"
          }
        }
      },

      // [] 접근 설명
      {
        type: "explain",
        content: {
          lines: [
            "deque는 vector처럼 인덱스 접근도 가능해요! 📋",
            "[]와 at()으로 원하는 위치의 값을 볼 수 있어요."
          ],
          code: 'deque<int> dq = {10, 20, 30, 40};\ncout << dq[0] << endl;   // 10\ncout << dq[2] << endl;   // 30\ncout << dq.size() << endl; // 4',
          result: "10\n30\n4",
          note: "deque는 vector + 양방향 push/pop!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "vector와 deque의 차이는?",
          options: [
            "deque는 [] 접근이 안 된다",
            "deque는 push_front가 가능하다",
            "vector는 push_back이 안 된다",
            "차이 없다"
          ],
          answer: 1,
          explanation: "deque는 vector에 push_front/pop_front가 추가된 버전! 양쪽 끝에서 넣고 빼요.",
          en: {
            question: "What is the difference between vector and deque?",
            options: [
              "deque does not support [] access",
              "deque supports push_front",
              "vector does not support push_back",
              "There is no difference"
            ],
            explanation: "deque is like vector but with push_front/pop_front added! You can insert and remove from both ends."
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제는 뭘까요?",
          code: '#include <vector>\nusing namespace std;\n\nvector<int> v = {1, 2, 3};\nv.push_front(0);',
          options: [
            "vector에는 push_front가 없다!",
            "push_front의 인자가 틀렸다",
            "헤더가 잘못됐다"
          ],
          answer: 0,
          explanation: "vector는 push_back만 있어요! push_front를 쓰려면 deque를 써야 해요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "vector does not have push_front!",
              "The argument to push_front is incorrect",
              "The header is wrong"
            ],
            explanation: "vector only has push_back! To use push_front, you need deque."
          }
        }
      },

      // Lv.2: pop_front 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "deque의 맨 앞 원소를 제거해요!",
          guide: "pop_front() 형태!",
          template: "dq.___();",
          answer: "pop_front",
          expect: "dq.pop_front();",
          en: {
            task: "Remove the front element of a deque!",
            guide: "Use the form pop_front()!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "deque 마스터!",
          emoji: "↔️"
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "deque",
          learned: [
            "deque = Double-Ended Queue (양방향 큐)",
            "push_front/push_back — 앞/뒤에 넣기",
            "pop_front/pop_back — 앞/뒤에서 빼기",
            "front/back — 앞/뒤 값 보기",
            "[] 인덱스 접근 가능 (vector처럼!)"
          ],
          canDo: "deque로 양쪽 끝에서 자유롭게 데이터를 넣고 뺄 수 있어요!",
          emoji: "↔️"
        }
      },

      // ==================== CHAPTER 3: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "프로젝트: 괄호 짝짓기 검사기",
          desc: "stack으로 괄호의 짝이 맞는지 검사해요!"
        }
      },

      // 인터리빙: 챕터2 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! deque에서 앞에 넣는 함수 기억나요?",
          task: "deque 앞에 값을 넣는 함수를 써봐요!",
          template: "dq.___(값);",
          answer: "push_front",
          expect: "dq.push_front(값);",
          en: {
            message: "Quick check! Do you remember the function that inserts at the front of a deque?",
            task: "Write the function that inserts a value at the front of a deque!"
          }
        }
      },

      // 종합 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'string expr = "((1+2)*(3+4))";\nstack<char> st;\nbool valid = true;\nfor (char c : expr) {\n    if (c == \'(\') st.push(c);\n    else if (c == \')\') {\n        if (st.empty()) { valid = false; break; }\n        st.pop();\n    }\n}\nif (!st.empty()) valid = false;\ncout << (valid ? "OK" : "Error") << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["OK", "Error"],
            answer: 0,
            feedback: "((1+2)*(3+4))는 괄호가 올바르게 짝지어져 있어서 OK!"
          }
        }
      },

      // 프로젝트 Step 1
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 main 함수 틀을 써봐요!",
          target: "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;",
          hint: "iostream, stack, string 세 개!",
          done: [],
          answer: "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;"
        }
      },

      // 프로젝트 Step 2
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "여는 괄호를 stack에 push하는 코드를 써봐요!",
          target: "if (c == '(') {\n    st.push(c);\n}",
          hint: "c == '(' 이면 push!",
          done: ['#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    string expr = "(1+(2*3))";\n    stack<char> st;\n    bool valid = true;\n    for (char c : expr) {'],
          answer: "if (c == '(') {\n    st.push(c);\n}"
        }
      },

      // 프로젝트 Step 3
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "닫는 괄호를 만나면 pop하는 코드를 써봐요!",
          target: "else if (c == ')') {\n    if (st.empty()) { valid = false; break; }\n    st.pop();\n}",
          hint: "닫는 괄호인데 stack이 비어있으면 짝이 안 맞는 거!",
          done: ['#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    string expr = "(1+(2*3))";\n    stack<char> st;\n    bool valid = true;\n    for (char c : expr) {', "if (c == '(') {\n    st.push(c);\n}"],
          answer: "else if (c == ')') {\n    if (st.empty()) { valid = false; break; }\n    st.pop();\n}"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "괄호 짝짓기 검사기 완성!",
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
