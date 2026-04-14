import { LessonData } from '../types';

export const lessonCpp23: LessonData = {
    id: "cpp-23",
    title: "sort 마스터",
    description: "sort 기초부터 lower_bound까지 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 1: sort 기초 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "sort 기초",
          desc: "sort()와 커스텀 정렬을 복습해요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: '#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end());\n// v = {1, 2, 5, 8, 9}',
          result: "1 2 5 8 9",
          note: "sort(시작, 끝) — <algorithm> 헤더 필요!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {5, 2, 8, 1, 9};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << " " << v[4] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["1 9", "9 1", "5 2"],
            answer: 1,
            feedback: "greater<int>()는 내림차순! 가장 큰 9가 앞, 가장 작은 1이 뒤!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["1 9", "9 1", "5 2"],
              feedback: "greater<int>() sorts in descending order! The largest value 9 comes first, smallest 1 comes last!"
            }
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "벡터를 오름차순으로 정렬해요!",
          guide: "sort(시작, 끝) 형태!",
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

      {
        type: "quiz",
        content: {
          question: "sort()를 쓰려면 어떤 헤더가 필요할까요?",
          options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
          answer: 2,
          explanation: "sort()는 <algorithm> 헤더에 들어있어요!",
          en: {
            question: "Which header is required to use sort()?",
            options: ["<iostream>", "<vector>", "<algorithm>", "<sort>"],
            explanation: "sort() is found in the <algorithm> header!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;         // 5\ncout << (it - v.begin());    // index: 2',
          result: "5\n2",
          note: "반드시 정렬된 배열에서만 사용! * 로 값 꺼내기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 3, 5, 5, 5, 7};\nauto lo = lower_bound(v.begin(), v.end(), 5);\nauto hi = upper_bound(v.begin(), v.end(), 5);\ncout << (hi - lo);  // count of 5: 3',
          predict: {
            question: "출력 결과는?",
            options: ["2", "3", "5"],
            answer: 1,
            feedback: "5가 인덱스 2,3,4에 3개 있어요! hi - lo = 3!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["2", "3", "5"],
              feedback: "5 appears at indices 2, 3, 4 — that's 3 occurrences! hi - lo = 3!"
            }
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "lower_bound()를 쓰기 전에 반드시 해야 하는 것은?",
          options: ["벡터를 비워야 함", "벡터를 정렬해야 함", "헤더를 <utility>로 해야 함"],
          answer: 1,
          explanation: "lower_bound는 이진 탐색이라 반드시 정렬된 배열에서만 동작해요! sort() 먼저!",
          en: {
            question: "What must you do before using lower_bound()?",
            options: ["Empty the vector", "Sort the vector", "Change the header to <utility>"],
            explanation: "lower_bound is a binary search and only works on sorted arrays! sort() first!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<pair<string, int>> students = {\n    {"alice", 85}, {"bob", 92}, {"charlie", 78}\n};\nsort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });\ncout << students[0].first << ": " << students[0].second << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["철수: 85", "영희: 92", "민수: 78"],
            answer: 1,
            feedback: "내림차순(>)이니까 가장 높은 점수 92점인 영희가 맨 앞!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["Cheolsu: 85", "Younghee: 92", "Minsu: 78"],
              feedback: "Descending order (>) puts the highest score 92 (Younghee) at the front!"
            }
          }
        }
      },

      {
        type: "project",
        content: {
          step: 1,
          total: 3,
          task: "헤더와 using namespace std를 써봐요!",
          target: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;",
          hint: "iostream, vector, algorithm 세 개!",
          done: [],
          answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;"
        }
      },

      {
        type: "project",
        content: {
          step: 2,
          total: 3,
          task: "pair 벡터에 학생 3명을 넣어요!",
          target: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};',
          hint: 'vector<pair<string, int>> students = { {"이름", 점수}, ... };',
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {"],
          answer: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'
        }
      },

      {
        type: "project",
        content: {
          step: 3,
          total: 3,
          task: "점수 내림차순으로 정렬하는 sort를 써봐요!",
          target: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });",
          hint: "람다에서 a.second > b.second 로 내림차순!",
          done: ["#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {", 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};'],
          answer: "sort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });"
        }
      },

      {
        type: "reward",
        content: {
          message: "학생 점수 정렬 프로젝트 완성!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 2: 커스텀 정렬 심화 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "커스텀 정렬 심화",
          desc: "람다 comparator, 다중 조건 정렬, 정렬 안정성을 익혀요!"
        }
      },

      // quiz: comparator 조건
      {
        type: "quiz",
        content: {
          question: "sort의 커스텀 comparator에서 return a < b; 는 어떤 정렬인가요?",
          options: [
            "내림차순 (큰 것부터)",
            "오름차순 (작은 것부터)",
            "무작위 순서",
            "컴파일 에러"
          ],
          answer: 1,
          explanation: "comparator에서 a < b이면 a가 앞에 와요 → 오름차순! b < a이면 내림차순이에요.",
          en: {
            question: "In a custom comparator for sort, what order does return a < b; produce?",
            options: [
              "Descending (largest first)",
              "Ascending (smallest first)",
              "Random order",
              "Compile error"
            ],
            explanation: "If a < b in the comparator, a comes first → ascending order! b < a would be descending."
          }
        }
      },

      // errorQuiz: >= 대신 > 을 써야 함
      {
        type: "errorQuiz",
        content: {
          question: "이 comparator의 문제점은?",
          code: 'sort(v.begin(), v.end(),\n    [](int a, int b) { return a >= b; });',
          options: [
            ">= 대신 > 를 써야 해요 (같을 때 true 반환하면 안 됨)",
            "람다 대신 함수 포인터를 써야 해요",
            "sort에서 람다를 사용할 수 없어요"
          ],
          answer: 0,
          explanation: "comparator는 a == b 일 때 false를 반환해야 해요! >= 는 같을 때도 true → 정렬 동작 undefined behavior!",
          en: {
            question: "What is wrong with this comparator?",
            options: [
              "Should use > instead of >= (must not return true when equal)",
              "Should use a function pointer instead of a lambda",
              "Cannot use a lambda with sort"
            ],
            explanation: "A comparator must return false when a == b! >= returns true even when equal → undefined behavior in sorting!"
          }
        }
      },

      // practice: 내림차순 정렬
      {
        type: "practice",
        content: {
          level: 2,
          task: "벡터를 내림차순으로 정렬해요!",
          guide: "내림차순 정렬을 위해 sort의 세 번째 인자로 '더 큰' 비교자를 넣어봐!",
          template: "vector<int> v = {3, 1, 4, 1, 5, 9, 2};\nsort(v.begin(), v.end(), ___<int>());\ncout << v[0] << endl;",
          answer: "greater",
          expect: "vector<int> v = {3, 1, 4, 1, 5, 9, 2};\nsort(v.begin(), v.end(), greater<int>());\ncout << v[0] << endl;",
          en: {
            task: "Sort a vector in descending order!",
            guide: "Pass a comparator meaning 'greater than' as the third argument to sort for descending order!"
          }
        }
      },

      // practice: 람다로 커스텀 정렬
      {
        type: "practice",
        content: {
          level: 2,
          task: "pair 벡터를 second(점수) 기준 오름차순으로 정렬해요!",
          guide: "pair의 두 번째 값으로 정렬하려면 람다에서 어떤 멤버를 비교해야 할까?",
          template: 'vector<pair<string, int>> v = {{"A",85},{"B",70},{"C",92}};\nsort(v.begin(), v.end(),\n    [](auto a, auto b){ return a.___ < b.___; });',
          answer: "second",
          blanksAnswer: ["second", "second"],
          expect: 'vector<pair<string, int>> v = {{"A",85},{"B",70},{"C",92}};\nsort(v.begin(), v.end(),\n    [](auto a, auto b){ return a.second < b.second; });',
          en: {
            task: "Sort a pair vector in ascending order by second (score)!",
            guide: "To sort by the second value of a pair, which member should the lambda compare?"
          }
        }
      },

      // predict: 정렬 결과 예측
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<string> words = {"banana", "apple", "cherry", "date"};\nsort(words.begin(), words.end());\ncout << words[0] << " " << words[3] << endl;',
          predict: {
            question: "출력 결과는?",
            options: ["banana cherry", "apple date", "date apple", "cherry banana"],
            answer: 1,
            feedback: "문자열은 사전순 정렬! a<b<c<d 순서로 apple이 첫 번째, date가 마지막!"
          },
          en: {
            predict: {
              question: "What's the output?",
              options: ["banana cherry", "apple date", "date apple", "cherry banana"],
              feedback: "Strings are sorted lexicographically! a<b<c<d order puts apple first and date last!"
            }
          }
        }
      },

      // quiz: stable_sort
      {
        type: "quiz",
        content: {
          question: "stable_sort와 sort의 차이점은?",
          options: [
            "stable_sort는 내림차순만 지원한다",
            "stable_sort는 동일한 값의 원래 순서를 보존한다",
            "stable_sort는 <numeric> 헤더가 필요하다",
            "stable_sort는 포인터 배열에서만 사용 가능하다"
          ],
          answer: 1,
          explanation: "stable_sort는 같은 값이 있을 때 원래 순서를 유지해요! 이름-점수 묶음에서 점수 같으면 이름 순서 보존 시 유용!",
          en: {
            question: "What is the difference between stable_sort and sort?",
            options: [
              "stable_sort only supports descending order",
              "stable_sort preserves the original order of equal elements",
              "stable_sort requires the <numeric> header",
              "stable_sort can only be used on pointer arrays"
            ],
            explanation: "stable_sort preserves the original order of equal elements! Useful when you want to keep the name order when scores are equal."
          }
        }
      },

      // interleaving: cpp-15 pair 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! pair 정렬 기억나요?",
          task: "pair 벡터에서 .first 기준으로 자동 정렬하는 코드를 완성해요!",
          template: 'vector<pair<int, string>> v = {{3,"C"},{1,"A"},{2,"B"}};\n___(v.begin(), v.end());\ncout << v[0].second << endl;',
          answer: "sort",
          expect: 'vector<pair<int, string>> v = {{3,"C"},{1,"A"},{2,"B"}};\nsort(v.begin(), v.end());\ncout << v[0].second << endl;',
          en: {
            message: "Quick! Remember sorting pairs?",
            task: "Complete the code to auto-sort a pair vector by .first!"
          }
        }
      },

      // practice: 다중 조건 정렬
      {
        type: "practice",
        content: {
          level: 3,
          task: "점수 내림차순, 동점이면 이름 오름차순으로 정렬해요!",
          guide: "점수가 다르면 높은 점수가 앞에, 점수가 같으면 이름 알파벳 순서가 앞에 오도록 비교 방향을 결정해!",
          template: 'vector<pair<string,int>> v = {{"Bob",90},{"Alice",90},{"Carol",85}};\nsort(v.begin(), v.end(), [](auto a, auto b) {\n    if (a.second != b.second) return a.second ___ b.second;\n    return a.first ___ b.first;\n});\ncout << v[0].first << endl;',
          answer: ">",
          blanksAnswer: [">", "<"],
          expect: 'vector<pair<string,int>> v = {{"Bob",90},{"Alice",90},{"Carol",85}};\nsort(v.begin(), v.end(), [](auto a, auto b) {\n    if (a.second != b.second) return a.second > b.second;\n    return a.first < b.first;\n});\ncout << v[0].first << endl;',
          en: {
            task: "Sort by score descending, then by name ascending if scores are equal!",
            guide: "When scores differ, higher scores come first; when scores tie, earlier alphabetical names come first — decide the comparison direction!"
          }
        }
      },

      // errorQuiz: sort 범위 지정 실수
      {
        type: "errorQuiz",
        content: {
          question: "이 sort 코드의 문제점은?",
          code: 'vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end() + 1);',
          options: [
            "v.end() + 1은 범위 밖 — 반드시 v.end()만 써야 함",
            "sort는 +1 없이 end()를 쓰면 안 됨",
            "v.begin() 대신 v.start()를 써야 함"
          ],
          answer: 0,
          explanation: "v.end()는 마지막 원소의 다음 위치예요! +1을 하면 범위 밖 → 미정의 동작(undefined behavior)!",
          en: {
            question: "What is wrong with this sort code?",
            options: [
              "v.end() + 1 goes out of bounds — must use v.end() only",
              "sort requires using end() with +1",
              "Should use v.start() instead of v.begin()"
            ],
            explanation: "v.end() points one past the last element! Adding +1 goes out of bounds → undefined behavior!"
          }
        }
      },

      // practice: 처음부터 작성 — 문자열 길이순 정렬
      {
        type: "practice",
        content: {
          level: 3,
          task: "처음부터 작성! 문자열 벡터를 길이 오름차순으로 정렬하고 첫 번째 단어를 출력해요\n입력: {\"banana\", \"hi\", \"apple\", \"ok\"}",
          guide: "sort의 람다 comparator에서 문자열의 길이를 반환하는 멤버 함수를 이용해 비교해봐!",
          template: null,
          answer: 'vector<string> v = {"banana", "hi", "apple", "ok"};\nsort(v.begin(), v.end(),\n    [](string a, string b) { return a.length() < b.length(); });\ncout << v[0] << endl;',
          expect: "hi",
          en: {
            task: "Write from scratch! Sort a string vector by length ascending and print the first word\nInput: {\"banana\", \"hi\", \"apple\", \"ok\"}",
            guide: "In the lambda comparator for sort, use the member function that returns the string's length to compare!"
          }
        }
      },

      // interleaving: cpp-9 벡터 접근
      {
        type: "interleaving",
        content: {
          message: "잠깐! 벡터의 마지막 원소에 접근하는 방법?",
          task: "정렬된 벡터의 마지막(가장 큰) 원소를 출력해요!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\ncout << v[v.___() - 1] << endl;",
          answer: "size",
          expect: "vector<int> v = {1, 3, 5, 7, 9};\ncout << v[v.size() - 1] << endl;",
          en: {
            message: "Quick! How do you access the last element of a vector?",
            task: "Print the last (largest) element of a sorted vector!"
          }
        }
      },

      // practice: lower_bound 사용
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 벡터에서 lower_bound로 값 5의 위치를 찾아요!",
          guide: "lower_bound는 정렬된 배열에서만! 반환값에 *를 붙여 값 확인!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = ___(v.begin(), v.end(), 5);\ncout << *it << endl;",
          answer: "lower_bound",
          expect: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;",
          en: {
            task: "Use lower_bound to find the position of value 5 in a sorted vector!",
            guide: "lower_bound only works on sorted arrays! Use * on the return value to get the actual value!"
          }
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
