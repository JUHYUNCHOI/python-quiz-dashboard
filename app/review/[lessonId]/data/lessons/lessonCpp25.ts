import { LessonData } from '../types';

export const lessonCpp25: LessonData = {
    id: "cpp-25",
    title: "정렬 후 빠른 검색",
    description: "binary_search, lower_bound, upper_bound 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 3: 이진탐색 활용 (3 형제) ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "이진탐색 활용 (3 형제)",
          desc: "binary_search / lower_bound / upper_bound — 정렬된 배열 빠르게 다루기"
        }
      },

      // 🆕 trio quiz — 어느 함수 쓸까?
      {
        type: "quiz",
        content: {
          question: "정렬된 vector<int> v 에서 \"숫자 7 이 있는지 있다/없다 만\" 알면 돼요. 셋 중 어느 게 가장 깔끔할까요?",
          options: [
            "binary_search(v.begin(), v.end(), 7)",
            "lower_bound(v.begin(), v.end(), 7)",
            "upper_bound(v.begin(), v.end(), 7)"
          ],
          answer: 0,
          explanation: "binary_search 는 정확히 \"있나/없나\" 를 묻는 함수 — true/false 반환이라 가장 직관적이에요. lower_bound / upper_bound 는 위치를 돌려주니까 한 단계 더 필요해요.",
          en: {
            question: "In a sorted vector<int> v, you only need whether 7 is there (yes/no). Which is the cleanest?",
            options: [
              "binary_search(v.begin(), v.end(), 7)",
              "lower_bound(v.begin(), v.end(), 7)",
              "upper_bound(v.begin(), v.end(), 7)"
            ],
            explanation: "binary_search answers exactly the yes/no question with true/false. lower_bound/upper_bound return positions, requiring an extra step."
          }
        }
      },

      // 🆕 binary_search 사용 — practice
      {
        type: "practice",
        content: {
          level: 1,
          task: "정렬된 벡터에서 값 5 의 존재 여부 (true / false) 만 확인! 3 형제 중 어느 함수가 가장 깔끔할까요?",
          guide: "값의 위치가 아니라 있나 없나 만 묻는 함수 — true / false 반환.",
          template: 'vector<int> v = {1, 3, 5, 7, 9};\nbool found = ___(v.begin(), v.end(), 5);\ncout << (found ? "Yes" : "No");',
          answer: "binary_search",
          expect: 'vector<int> v = {1, 3, 5, 7, 9};\nbool found = binary_search(v.begin(), v.end(), 5);\ncout << (found ? "Yes" : "No");',
          en: {
            task: "Check just the presence (true/false) of value 5 in the sorted vector. Which of the trio is cleanest?",
            guide: "The function that asks 'is it there?' (not where) — returns true/false."
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

      // 🆕 level 1 — lower_bound 호출 형태만 떠올리기
      {
        type: "practice",
        content: {
          level: 1,
          task: "lower_bound 호출! 정렬된 벡터에서 값 5 찾기",
          guide: "sort 와 같은 (begin, end, 값) 형태!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.___, v.___, 5);\ncout << *it;",
          answer: "begin()",
          blanksAnswer: ["begin()", "end()"],
          expect: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it;",
          en: {
            task: "Call lower_bound to find value 5 in a sorted vector!",
            guide: "Same (begin, end, value) shape as sort!"
          }
        }
      },

      // practice: lower_bound 사용 — 함수 이름 자체 떠올리기
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 벡터에서 어떤 함수로 값 5의 위치를 찾을까요?",
          guide: "이름은 'lower_bound' — 정렬된 배열에서 값을 빠르게 찾을 때!",
          template: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = ___(v.begin(), v.end(), 5);\ncout << *it << endl;",
          answer: "lower_bound",
          expect: "vector<int> v = {1, 3, 5, 7, 9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;",
          en: {
            task: "Which function finds the position of value 5 in a sorted vector?",
            guide: "Name is 'lower_bound' — fast value lookup in sorted arrays!"
          }
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

      // 🆕 upper-lower 패턴 직접 — fillblank
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 v = {1, 2, 5, 5, 5, 7} 에서 5 가 몇 개 인지 한 줄로 구하세요.",
          guide: "\"끝 다음 위치\" 에서 \"시작 위치\" 를 빼면 그 값의 개수예요. 3 형제 중 두 함수의 차로!",
          template: 'vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = ___(v.begin(), v.end(), 5)\n        - ___(v.begin(), v.end(), 5);\ncout << cnt;',
          answer: "upper_bound",
          blanksAnswer: ["upper_bound", "lower_bound"],
          expect: 'vector<int> v = {1, 2, 5, 5, 5, 7};\nint cnt = upper_bound(v.begin(), v.end(), 5)\n        - lower_bound(v.begin(), v.end(), 5);\ncout << cnt;',
          en: {
            task: "Count how many 5s are in sorted v = {1, 2, 5, 5, 5, 7} — in a single line.",
            guide: "'one past end' minus 'start' gives the count. Use two of the trio!"
          }
        }
      },

      // 🆕 count() vs upper-lower 차이 quiz
      {
        type: "quiz",
        content: {
          question: "100 만 개 정수가 들어있는 정렬된 벡터에서 \"3 이 몇 개인가?\" 를 한 번 계산하려고 해요. 어떤 게 더 빠를까요?",
          options: [
            "count(v.begin(), v.end(), 3)",
            "upper_bound(v.begin(), v.end(), 3) - lower_bound(v.begin(), v.end(), 3)",
            "둘 다 똑같음"
          ],
          answer: 1,
          explanation: "count() 는 정렬 여부와 무관하게 처음부터 끝까지 훑어요 — 100 만 번 비교. 반면 upper_bound / lower_bound 는 이진 탐색이라 정렬된 배열에선 약 20 번 비교로 끝나요.\n\n⚠️ 함정: 만약 정렬이 안 돼 있으면 sort 부터 해야 하는데, sort 자체가 무거워서 한 번만 셀 거면 그냥 count() 가 더 빠름. 이미 정렬된 데이터에서 여러 번 셀 때 upper-lower 가 진짜 빛나요.",
          en: {
            question: "You'll count occurrences of 3 once in a sorted vector of 1M ints. Which is faster?",
            options: [
              "count(v.begin(), v.end(), 3)",
              "upper_bound(v.begin(), v.end(), 3) - lower_bound(v.begin(), v.end(), 3)",
              "Both the same"
            ],
            explanation: "count() scans the whole array regardless of sort — 1M comparisons. upper_bound / lower_bound use binary search on a sorted array — ~20 comparisons.\n\n⚠️ Trap: if the data weren't sorted, you'd need sort() first, and sort itself is heavy — for a single count, plain count() wins. upper-lower really shines when the data is already sorted and you'll query many times."
          }
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
