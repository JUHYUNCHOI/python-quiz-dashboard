import { LessonData } from '../types';

export const lessonCppP3: LessonData = {
    id: "cpp-p3",
    title: "USACO 모의전 프로젝트 복습",
    description: "USACO 모의전의 핵심 알고리즘 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: 알고리즘 복습 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "알고리즘 복습",
          desc: "sort, map, stack 등 핵심 알고리즘을 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "USACO에서 가장 많이 쓰는 건 sort!",
            "algorithm 헤더의 sort()로 벡터를 정렬할 수 있어요."
          ],
          code: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<int> v = {5, 2, 8, 1, 9};\n    sort(v.begin(), v.end());  // 오름차순\n    for (int x : v) cout << x << " ";\n    // 출력: 1 2 5 8 9\n}',
          result: "1 2 5 8 9",
          note: "sort(begin, end) = 오름차순 정렬!"
        }
      },

      // 예측 퀴즈
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end(), greater<int>());\nfor (int x : v) cout << x << " ";',
          predict: {
            question: "출력 결과는?",
            options: ["1 2 5 8 9", "9 8 5 2 1", "5 2 8 1 9"],
            answer: 1,
            feedback: "greater<int>()를 넣으면 내림차순! 큰 수부터 정렬돼요."
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 2 5 8 9", "9 8 5 2 1", "5 2 8 1 9"],
              feedback: "Using greater<int>() sorts in descending order — largest values come first!"
            }
          }
        }
      },

      // Lv.1: sort 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 오름차순으로 정렬해요!",
          guide: "sort(begin, end) 형태!",
          template: "sort(v.___(), v.___());",
          answer: "begin",
          blanksAnswer: ["begin", "end"],
          expect: "sort(v.begin(), v.end());",
          en: {
            task: "Sort a vector in ascending order!",
            guide: "Use the form sort(begin, end)!"
          }
        }
      },

      // map 설명
      {
        type: "explain",
        content: {
          lines: [
            "map은 키-값 쌍을 저장하는 자료구조예요!",
            "숫자의 등장 횟수를 세는 데 아주 유용해요."
          ],
          code: 'map<string, int> score;\nscore["Alice"] = 95;\nscore["Bob"] = 87;\n\ncout << "Alice: " << score["Alice"] << "\\n";\ncout << "크기: " << score.size() << "\\n";',
          result: "Alice: 95\n크기: 2",
          note: "map<키타입, 값타입> — 파이썬 딕셔너리와 비슷!"
        }
      },

      // 퀴즈: map
      {
        type: "quiz",
        content: {
          question: "map<string, int> count; 에서 count[\"apple\"]++; 은 무엇을 하나요?",
          options: [
            "apple 키를 삭제해요",
            "apple의 값을 1 증가시켜요 (없으면 0에서 시작)",
            "에러가 나요",
            "apple을 출력해요"
          ],
          answer: 1,
          explanation: "map에서 없는 키를 접근하면 자동으로 0으로 초기화! ++로 1을 더해요.",
          en: {
            question: "In map<string, int> count;, what does count[\"apple\"]++; do?",
            options: [
              "Deletes the apple key",
              "Increments the value of apple by 1 (starts from 0 if not present)",
              "Causes an error",
              "Prints apple"
            ],
            explanation: "Accessing a missing key in a map auto-initializes it to 0! ++ then adds 1."
          }
        }
      },

      // Lv.2: map 카운팅 빈칸
      {
        type: "practice",
        content: {
          level: 2,
          task: "배열의 각 숫자가 몇 번 나오는지 세요!",
          guide: "map[값]++ 패턴!",
          template: "map<int, int> cnt;\nfor (int x : v) {\n    ___[x]___;\n}",
          answer: "cnt",
          blanksAnswer: ["cnt", "++"],
          expect: "map<int, int> cnt;\nfor (int x : v) {\n    cnt[x]++;\n}",
          en: {
            task: "Count how many times each number appears in an array!",
            guide: "Use the map[value]++ pattern!"
          }
        }
      },

      // stack 설명
      {
        type: "explain",
        content: {
          lines: [
            "stack은 LIFO (Last In, First Out) 자료구조예요!",
            "push, pop, top으로 사용해요."
          ],
          code: 'stack<int> s;\ns.push(10);\ns.push(20);\ns.push(30);\n\ncout << s.top() << "\\n";  // 30 (마지막에 넣은 것)\ns.pop();                    // 30 제거\ncout << s.top() << "\\n";  // 20',
          result: "30\n20",
          note: "push = 넣기, pop = 빼기, top = 맨 위 보기!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'stack<int> s;\ncout << s.top() << "\\n";',
          options: [
            "빈 스택에서 top()을 호출해서 에러 (undefined behavior)",
            "stack에 top() 함수가 없어요",
            "stack 헤더가 빠졌어요"
          ],
          answer: 0,
          explanation: "빈 스택에서 top()을 부르면 런타임 에러! 항상 empty()로 확인 먼저!",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Calling top() on an empty stack causes a runtime error (undefined behavior)",
              "stack doesn't have a top() function",
              "The stack header is missing"
            ],
            explanation: "Calling top() on an empty stack causes a runtime error! Always check with empty() first!"
          }
        }
      },

      // Lv.1: stack 빈칸
      {
        type: "practice",
        content: {
          level: 1,
          task: "스택에 값을 넣고 빼요!",
          guide: "push로 넣고 pop으로 빼요!",
          template: "stack<int> s;\ns.___(42);\ncout << s.___() << \"\\n\";\ns.___();",
          answer: "push",
          blanksAnswer: ["push", "top", "pop"],
          expect: "stack<int> s;\ns.push(42);\ncout << s.top() << \"\\n\";\ns.pop();",
          en: {
            task: "Push a value onto the stack and pop it!",
            guide: "Use push to insert and pop to remove!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "핵심 알고리즘 복습 완료!",
          emoji: "🧠"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 1,
          title: "알고리즘 복습",
          learned: [
            "sort(begin, end) — 오름차순 정렬",
            "sort + greater<int>() — 내림차순 정렬",
            "map<K,V> — 키-값 저장, 카운팅에 유용",
            "stack — LIFO, push/pop/top",
            "빈 스택에서 top() 금지!"
          ],
          canDo: "sort, map, stack을 문제 풀이에 활용할 수 있어요!",
          emoji: "🧠"
        }
      },

      // ==================== CHAPTER 2: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "USACO 문제 풀이",
          desc: "USACO 스타일 문제의 풀이 구조를 완성해요!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! sort 기억나요?",
          task: "벡터 v를 오름차순 정렬하는 코드를 써봐요!",
          template: null,
          answer: "sort(v.begin(), v.end());",
          alternateAnswers: [
            "sort(v.begin(), v.end())"
          ],
          expect: "sort(v.begin(), v.end());",
          en: {
            message: "Quick check! Do you remember sort?",
            task: "Write the code to sort vector v in ascending order!"
          }
        }
      },

      // 종합 설명: USACO 스타일 문제
      {
        type: "explain",
        content: {
          lines: [],
          code: '// 입력:\n// 5 3     (N=5마리, 상위 K=3마리)\n// 80 95 70 90 85\n// 출력: 내림차순 상위 3개\n// 95 90 85',
          predict: {
            question: "이 문제를 풀려면 어떤 알고리즘이 필요할까요?",
            options: [
              "map으로 카운팅",
              "sort로 내림차순 정렬 후 K개 출력",
              "stack으로 쌓기"
            ],
            answer: 1,
            feedback: "정렬해서 큰 순서대로 K개를 출력하면 돼요!"
          },
          en: {
            predict: {
              question: "Which algorithm is needed to solve this problem?",
              options: [
                "Count with map",
                "Sort in descending order and print top K",
                "Use a stack"
              ],
              feedback: "Sort the scores in descending order and print the first K values!"
            }
          }
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "USACO 템플릿과 입력 받기를 써봐요!",
          target: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    freopen("scores.in", "r", stdin);\n    freopen("scores.out", "w", stdout);\n\n    int n, k;\n    cin >> n >> k;',
          hint: "bits/stdc++.h + Fast I/O + freopen + cin >> n >> k",
          done: [],
          answer: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(NULL);\n    freopen("scores.in", "r", stdin);\n    freopen("scores.out", "w", stdout);\n\n    int n, k;\n    cin >> n >> k;'
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "점수를 벡터에 저장하고 내림차순 정렬해요!",
          target: "    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    sort(v.begin(), v.end(), greater<int>());",
          hint: "vector<int> v(n) + for문으로 입력 + sort with greater",
          done: ["... freopen + cin >> n >> k;"],
          answer: "    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    sort(v.begin(), v.end(), greater<int>());"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "상위 K개를 출력하는 코드를 써봐요!",
          target: '    for (int i = 0; i < k; i++) {\n        cout << v[i] << "\\n";\n    }\n    return 0;\n}',
          hint: "for문으로 0부터 k-1까지 v[i] 출력!",
          done: ["... cin >> n >> k;", "    vector + sort(greater)"],
          answer: '    for (int i = 0; i < k; i++) {\n        cout << v[i] << "\\n";\n    }\n    return 0;\n}'
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "USACO 모의전 완성!",
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
