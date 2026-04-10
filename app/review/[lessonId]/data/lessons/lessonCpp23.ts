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
          code: 'vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;         // 5\ncout << (it - v.begin());    // 인덱스: 2',
          result: "5\n2",
          note: "반드시 정렬된 배열에서만 사용! * 로 값 꺼내기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {1, 3, 5, 5, 5, 7};\nauto lo = lower_bound(v.begin(), v.end(), 5);\nauto hi = upper_bound(v.begin(), v.end(), 5);\ncout << (hi - lo);  // 5의 개수: 3',
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
          code: 'vector<pair<string, int>> students = {\n    {"철수", 85}, {"영희", 92}, {"민수", 78}\n};\nsort(students.begin(), students.end(),\n    [](auto a, auto b) { return a.second > b.second; });\ncout << students[0].first << ": " << students[0].second << endl;',
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

      {
        type: "done",
        content: {}
      }
    ]
};
