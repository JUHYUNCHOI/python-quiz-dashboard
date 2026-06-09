import { LessonData } from '../types';

export const lessonCpp26: LessonData = {
    id: "cpp-26",
    title: "sort 응용 패턴 (심화)",
    description: "sort+unique+erase 등 응용 패턴 복습!",
    language: "cpp",
    steps: [
      // ==================== CHAPTER 4: 심화 패턴 (sort + unique) ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "심화 패턴",
          desc: "sort + unique — 벡터에서 중복 제거하기"
        }
      },

      // sort + unique 패턴 — 중복 제거 (lesson chapter 3)
      {
        type: "explain",
        content: {
          lines: [],
          code: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());\ncout << v.size();',
          predict: {
            question: "출력 결과는? (중복 제거 후 원소 개수)",
            options: ["7", "10", "5", "9"],
            answer: 0,
            feedback: "정렬 후 v = {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}. unique + erase 로 중복 제거 → {1, 2, 3, 4, 5, 6, 9} = 7 개."
          },
          en: {
            predict: {
              question: "What's the output? (count after dedup)",
              options: ["7", "10", "5", "9"],
              feedback: "After sort: {1, 1, 2, 3, 3, 4, 5, 5, 6, 9}. unique + erase removes duplicates → {1, 2, 3, 4, 5, 6, 9} = 7 elements."
            }
          }
        }
      },

      // sort + unique 빈칸 채우기
      {
        type: "practice",
        content: {
          level: 2,
          task: "정렬된 벡터에서 중복을 진짜로 잘라내려면 어떤 함수가 빈칸에 들어가야 할까요?",
          guide: "이 함수는 같은 값이 인접해 있을 때 앞쪽으로 모아주고 \"여기까지가 진짜 끝\" 위치를 돌려줘요. 그 위치부터 erase 로 잘라내는 패턴.",
          template: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(___(v.begin(), v.end()), v.end());',
          answer: "unique",
          expect: 'vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());',
          en: {
            task: "Which function fills the blank to truly trim duplicates from a sorted vector?",
            guide: "It pushes equal adjacent values to the front and returns the position of the new logical end. erase trims from there to v.end()."
          }
        }
      },

      // 🆕 unique 만 호출하면? — 학생 자연 의문
      {
        type: "quiz",
        content: {
          question: "정렬된 v = {1, 1, 2, 3, 3} 에서 erase 없이 unique(v.begin(), v.end()) 만 호출하면 v.size() 는 얼마일까요?",
          options: [
            "3 — 중복이 제거돼서",
            "5 — 크기는 그대로, 뒤쪽은 쓰레기 값",
            "0 — 에러로 비워짐"
          ],
          answer: 1,
          explanation: "unique 는 사실 벡터의 크기를 줄이지 않아요. 앞쪽으로 중복 없는 값들 (1, 2, 3) 을 모으고 \"여기까지가 진짜 끝\" 위치를 iterator 로 돌려줄 뿐이에요. 뒤쪽 (인덱스 3, 4) 에는 쓰레기 값이 남고 size() 는 여전히 5. 진짜로 줄이려면 erase 까지 해야 해요 — 그래서 erase(unique(...), v.end()) 가 한 세트.",
          en: {
            question: "In sorted v = {1, 1, 2, 3, 3}, if you call unique(v.begin(), v.end()) WITHOUT erase, what does v.size() return?",
            options: [
              "3 — duplicates are removed",
              "5 — size unchanged, garbage values at the back",
              "0 — error, vector emptied"
            ],
            explanation: "unique doesn't actually shrink the vector. It just moves the unique values (1, 2, 3) to the front and returns an iterator marking the new logical end. The back (indices 3, 4) contains leftover garbage and size() is still 5. To truly shrink it, you need erase — that's why erase(unique(...), v.end()) is the standard pair."
          }
        }
      },

      // sort + unique 핵심 이해 quiz
      {
        type: "quiz",
        content: {
          question: "정렬되지 않은 v = {1, 3, 1, 3} 에 erase(unique(...), v.end()) 패턴을 그대로 적용하면 결과는?",
          options: [
            "v = {1, 3} — 중복 모두 제거",
            "v = {1, 3, 1, 3} — 인접한 중복만 제거되니까 그대로",
            "컴파일 에러",
            "프로그램이 멈춤"
          ],
          answer: 1,
          explanation: "unique 는 인접한 중복만 제거해요. 정렬 안 하면 같은 값이 떨어져 있어서 중복으로 안 봐요. {1, 3, 1, 3} 에서 인접한 같은 값이 없으니 unique 는 아무것도 안 모으고 그대로. 그래서 sort + unique 가 한 세트.",
          en: {
            question: "What happens if you call erase(unique(...), v.end()) on unsorted v = {1, 3, 1, 3}?",
            options: [
              "v = {1, 3} — all duplicates removed",
              "v = {1, 3, 1, 3} — only adjacent duplicates removed, so unchanged",
              "Compile error",
              "Program crashes"
            ],
            explanation: "unique only removes adjacent duplicates. Without sorting, equal values aren't next to each other and won't be detected. {1, 3, 1, 3} has no adjacent duplicates, so unique does nothing. That's why sort + unique is a pair."
          }
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
};
