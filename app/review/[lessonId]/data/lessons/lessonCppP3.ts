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

      // ==================== CHAPTER 3: STL 심화 복습 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "STL 심화 복습",
          desc: "pair, set, queue, 커스텀 정렬을 복습해요!"
        }
      },

      // 인터리빙: cpp-9 vector 기초 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 벡터의 크기를 구하는 방법 기억나요?",
          task: "벡터 v의 원소 개수를 출력하는 코드를 완성해요!",
          template: "cout << v.___() << \"\\n\";",
          answer: "size",
          blanksAnswer: ["size"],
          expect: "cout << v.size() << \"\\n\";",
          en: {
            message: "Quick check! Do you remember how to get the size of a vector?",
            task: "Complete the code that prints the number of elements in vector v!"
          }
        }
      },

      // predict 1: pair 출력
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'pair<int, string> p = {3, "Alice"};\ncout << p.first << " " << p.second << "\\n";',
          predict: {
            options: ["3 Alice", "Alice 3", "{3, Alice}", "에러"],
            answer: 0,
            feedback: "pair.first = 첫 번째 값(3), pair.second = 두 번째 값(Alice). 순서대로 출력돼요!"
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["3 Alice", "Alice 3", "{3, Alice}", "Error"],
              feedback: "pair.first = first value (3), pair.second = second value (Alice). They print in order!"
            }
          }
        }
      },

      // predict 2: set 중복 제거
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'set<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);\ns.insert(2);\ncout << s.size() << "\\n";',
          predict: {
            options: ["4", "3", "2", "에러"],
            answer: 1,
            feedback: "set은 중복을 허용하지 않아요! 3이 두 번 insert됐지만 한 번만 저장돼요. {1, 2, 3} → 크기 3!"
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["4", "3", "2", "Error"],
              feedback: "set does not allow duplicates! Even though 3 was inserted twice it's stored once. {1, 2, 3} → size 3!"
            }
          }
        }
      },

      // predict 3: 커스텀 정렬 comparator
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'vector<pair<int,int>> v = {{3,1}, {1,4}, {2,2}};\nsort(v.begin(), v.end());\ncout << v[0].first << " " << v[0].second << "\\n";',
          predict: {
            options: ["3 1", "1 4", "2 2", "에러"],
            answer: 1,
            feedback: "pair는 기본적으로 first 기준 오름차순 정렬! first가 가장 작은 {1,4}가 v[0]이 돼요."
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["3 1", "1 4", "2 2", "Error"],
              feedback: "pair sorts by first value in ascending order by default! {1,4} has the smallest first, so it becomes v[0]."
            }
          }
        }
      },

      // predict 4: queue FIFO
      {
        type: "explain",
        content: {
          lines: ["이 C++ 코드의 출력은?"],
          code: 'queue<int> q;\nq.push(10);\nq.push(20);\nq.push(30);\ncout << q.front() << "\\n";\nq.pop();\ncout << q.front() << "\\n";',
          predict: {
            options: ["30\n20", "10\n20", "10\n10", "에러"],
            answer: 1,
            feedback: "queue는 FIFO! 먼저 들어온 10이 front. pop 후엔 20이 front가 돼요."
          },
          en: {
            lines: ["What does this C++ code output?"],
            predict: {
              options: ["30\n20", "10\n20", "10\n10", "Error"],
              feedback: "queue is FIFO! 10 entered first so it's the front. After pop, 20 becomes the front."
            }
          }
        }
      },

      // quiz 2: set vs map
      {
        type: "quiz",
        content: {
          question: "중복 없이 값만 저장할 때, 값과 빈도수를 함께 저장할 때 — 각각 어떤 자료구조를 써야 할까요?",
          options: [
            "set / set",
            "map / set",
            "set / map",
            "vector / vector"
          ],
          answer: 2,
          explanation: "중복 없이 값만 → set, 키-값 쌍(값+빈도수) → map! 각각의 역할을 구분해요.",
          en: {
            question: "Which data structure should you use — for storing unique values only, and for storing values with their frequency?",
            options: [
              "set / set",
              "map / set",
              "set / map",
              "vector / vector"
            ],
            explanation: "Unique values only → set, key-value pairs (value + frequency) → map! Know each structure's role."
          }
        }
      },

      // quiz 3: 커스텀 comparator
      {
        type: "quiz",
        content: {
          question: "vector<int>를 내림차순으로 정렬하는 올바른 코드는?",
          options: [
            "sort(v.begin(), v.end())",
            "sort(v.begin(), v.end(), less<int>())",
            "sort(v.begin(), v.end(), greater<int>())",
            "sort(v.rbegin(), v.end())"
          ],
          answer: 2,
          explanation: "greater<int>()는 '큰 것이 먼저'라는 비교자! 또는 sort(v.rbegin(), v.rend())도 가능해요.",
          en: {
            question: "Which is the correct code to sort a vector<int> in descending order?",
            options: [
              "sort(v.begin(), v.end())",
              "sort(v.begin(), v.end(), less<int>())",
              "sort(v.begin(), v.end(), greater<int>())",
              "sort(v.rbegin(), v.end())"
            ],
            explanation: "greater<int>() means 'larger values first'! Alternatively sort(v.rbegin(), v.rend()) also works."
          }
        }
      },

      // quiz 4: pair 접근
      {
        type: "quiz",
        content: {
          question: "pair<string, int> p = {\"Bob\", 90}; 에서 90에 접근하는 코드는?",
          options: [
            "p[1]",
            "p.first",
            "p.second",
            "p.value"
          ],
          answer: 2,
          explanation: "pair.first = 첫 번째 요소(\"Bob\"), pair.second = 두 번째 요소(90)! 인덱스 대신 .first/.second를 써요.",
          en: {
            question: "In pair<string, int> p = {\"Bob\", 90};, which code accesses 90?",
            options: [
              "p[1]",
              "p.first",
              "p.second",
              "p.value"
            ],
            explanation: "pair.first = first element (\"Bob\"), pair.second = second element (90)! Use .first/.second instead of an index."
          }
        }
      },

      // practice 2: pair 벡터 정렬
      {
        type: "practice",
        content: {
          level: 2,
          task: "pair 벡터를 second 기준 내림차순으로 정렬하는 람다를 완성해요!",
          guide: "sort의 세 번째 인자로 람다 comparator를 넣어요!",
          template: "sort(v.begin(), v.end(), [](pair<int,int> a, pair<int,int> b) {\n    return a.___ > b.___;\n});",
          answer: "second",
          blanksAnswer: ["second", "second"],
          expect: "sort(v.begin(), v.end(), [](pair<int,int> a, pair<int,int> b) {\n    return a.second > b.second;\n});",
          en: {
            task: "Complete the lambda to sort a pair vector by second value in descending order!",
            guide: "Pass a lambda comparator as the third argument to sort!"
          }
        }
      },

      // practice 3: set 삽입 및 탐색
      {
        type: "practice",
        content: {
          level: 2,
          task: "set에 값을 넣고 존재 여부를 확인하는 코드를 완성해요!",
          guide: "insert()로 삽입, count()로 존재 여부 확인 (0 또는 1)!",
          template: "set<int> s;\ns.___(42);\nif (s.___(42)) {\n    cout << \"있어요!\" << \"\\n\";\n}",
          answer: "insert",
          blanksAnswer: ["insert", "count"],
          expect: "set<int> s;\ns.insert(42);\nif (s.count(42)) {\n    cout << \"있어요!\" << \"\\n\";\n}",
          en: {
            task: "Complete the code to insert a value into a set and check if it exists!",
            guide: "Use insert() to add, count() to check existence (returns 0 or 1)!"
          }
        }
      },

      // practice 4: map 순회
      {
        type: "practice",
        content: {
          level: 3,
          task: "map의 모든 키-값 쌍을 출력하는 range-for를 완성해요!",
          guide: "auto& [key, val] 구조 분해 또는 .first/.second 사용!",
          template: "map<string, int> m = {{\"a\", 1}, {\"b\", 2}};\nfor (___ p : m) {\n    cout << p.first << \":\" << p.second << \"\\n\";\n}",
          answer: "auto",
          blanksAnswer: ["auto"],
          expect: "map<string, int> m = {{\"a\", 1}, {\"b\", 2}};\nfor (auto p : m) {\n    cout << p.first << \":\" << p.second << \"\\n\";\n}",
          en: {
            task: "Complete the range-for loop to print all key-value pairs in a map!",
            guide: "Use auto for the loop variable, then access .first and .second!"
          }
        }
      },

      // errorQuiz 2: 빈 큐에서 front()
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: 'queue<int> q;\nq.pop();\ncout << q.front() << "\\n";',
          options: [
            "빈 큐에서 pop()을 호출하면 런타임 에러예요",
            "queue에는 front() 함수가 없어요",
            "pop() 전에 push()를 해야 해요 — 둘 다 맞아요",
            "문제없어요"
          ],
          answer: 2,
          explanation: "빈 큐에서 pop()과 front() 모두 undefined behavior! 항상 empty() 확인 후 호출해야 해요.",
          en: {
            question: "What is wrong with this code?",
            options: [
              "Calling pop() on an empty queue causes a runtime error",
              "queue doesn't have a front() function",
              "You need to push() before pop() — both issues are present",
              "Nothing is wrong"
            ],
            explanation: "Both pop() and front() on an empty queue are undefined behavior! Always check empty() first."
          }
        }
      },

      // errorQuiz 3: map 존재 확인 없이 접근
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 의도치 않은 동작은?",
          code: 'map<string, int> score;\nscore["Charlie"] = 100;\ncout << score["Dave"] << "\\n";',
          options: [
            "에러가 나요",
            "Dave 키가 0으로 자동 생성되고 0이 출력돼요",
            "아무것도 출력이 안 돼요",
            "Charlie의 값이 출력돼요"
          ],
          answer: 1,
          explanation: "map에서 없는 키를 [] 로 접근하면 기본값(0)으로 자동 생성돼요! 존재 여부 확인은 count() 또는 find() 사용!",
          en: {
            question: "What is the unintended behavior of this code?",
            options: [
              "It throws an error",
              "The Dave key is auto-created with value 0 and 0 is printed",
              "Nothing is printed",
              "Charlie's value is printed"
            ],
            explanation: "Accessing a missing key with [] in a map auto-creates it with the default value (0)! Use count() or find() to check existence first!"
          }
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
