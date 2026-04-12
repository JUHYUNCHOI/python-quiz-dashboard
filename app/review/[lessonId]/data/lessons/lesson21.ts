// 레슨 21: 집합 (set)
import { LessonData } from '../types';

export const lesson21: LessonData = {
  id: "21",
  title: "집합 (set)",
  description: "중복 없는 데이터 모음, 집합을 배워요!",
  steps: [
    // ==================== CHAPTER 1: 집합 만들기 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "집합 만들기",
        desc: "중복을 자동으로 제거하는 마법 상자!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "fruits = {'사과', '바나나', '포도'}\nprint(fruits)\nprint(type(fruits))",
        result: "{'사과', '바나나', '포도'}\n<class 'set'>",
        note: "딕셔너리도 {}를 쓰지만, 키:값이 없으면 집합이에요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "nums = {1, 2, 3, 2, 1, 3, 4}\nprint(nums)",
        predict: {
          question: "출력 결과는?",
          options: ["{1, 2, 3, 2, 1, 3, 4}", "{1, 2, 3, 4}", "[1, 2, 3, 4]"],
          answer: 1,
          feedback: "집합은 중복을 자동으로 제거해요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["{1, 2, 3, 2, 1, 3, 4}", "{1, 2, 3, 4}", "[1, 2, 3, 4]"],
            feedback: "Sets automatically remove duplicates!"
          }
        },
        result: "{1, 2, 3, 4}"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "# {} 는 빈 딕셔너리!\nempty_dict = {}\nprint(type(empty_dict))\n\n# 빈 집합은 set()!\nempty_set = set()\nprint(type(empty_set))",
        result: "<class 'dict'>\n<class 'set'>",
        note: "주의! {}만 쓰면 딕셔너리가 돼요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "names = ['민수', '영희', '민수', '철수', '영희']\nunique = set(names)\nprint(unique)\nprint(f'중복 제거: {len(names)}개 -> {len(unique)}개')",
        predict: {
          question: "unique의 길이는?",
          options: ["5", "4", "3", "2"],
          answer: 2,
          feedback: "민수, 영희, 철수 = 3명! 중복이 사라졌어요!"
        },
        en: {
          predict: {
            question: "What is the length of unique?",
            options: ["5", "4", "3", "2"],
            feedback: "민수, 영희, 철수 = 3 unique names! Duplicates are removed!"
          }
        },
        result: "{'민수', '영희', '철수'}\n중복 제거: 5개 -> 3개"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "딕셔너리 복습! 키로 값 접근하기",
        task: "딕셔너리에서 '이름' 키의 값을 출력하세요",
        template: "info = {'이름': '민수', '나이': 15}\nprint(info[___])",
        answer: "'이름'",
        expect: "민수",
        en: {
          message: "Dictionary review! Access value by key",
          task: "Print the value of the 'name' key from the dictionary"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트 [1, 2, 2, 3, 3, 3]을 set()으로 중복 제거 후 출력하세요",
        guide: "set()에 리스트를 넣으면 중복 제거!",
        hint: "unique = set([1, 2, 2, 3, 3, 3])",
        template: "nums = [1, 2, 2, 3, 3, 3]\nunique = ___(nums)\nprint(unique)",
        answer: "set",
        expect: "{1, 2, 3}",
        en: {
          task: "Remove duplicates from list [1, 2, 2, 3, 3, 3] using set() and print",
          guide: "Putting a list in set() removes duplicates!",
          hint: "unique = set([1, 2, 2, 3, 3, 3])"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "빈 집합을 만드는 올바른 방법은?",
        options: [
          "s = {}",
          "s = set()",
          "s = set{}",
          "s = ()"
        ],
        answer: 1,
        explanation: "{}는 빈 딕셔너리! 빈 집합은 반드시 set()으로 만들어요.",
        en: {
          question: "What is the correct way to create an empty set?",
          options: [
            "s = {}",
            "s = set()",
            "s = set{}",
            "s = ()"
          ],
          explanation: "{} is an empty dictionary! An empty set must be created with set()."
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "집합 기초 완벽!",
        emoji: "🎲"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "집합 만들기",
        learned: [
          "{값1, 값2}로 집합 생성",
          "중복이 자동으로 제거됨",
          "set()으로 변환/빈 집합 생성",
          "{}는 딕셔너리! 빈 집합은 set()"
        ],
        canDo: "집합을 만들고 중복을 제거할 수 있어!",
        emoji: "🎲"
      }
    },

    // ==================== CHAPTER 2: 집합 연산 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "집합 연산",
        desc: "교집합, 합집합, 차집합을 배워요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)",
        predict: {
          question: "교집합의 결과는?",
          options: ["{1, 2, 3, 4, 5, 6}", "{3, 4}", "{1, 2}", "{5, 6}"],
          answer: 1,
          feedback: "a와 b에 둘 다 있는 3, 4만 남아요!"
        },
        en: {
          predict: {
            question: "What is the intersection result?",
            options: ["{1, 2, 3, 4, 5, 6}", "{3, 4}", "{1, 2}", "{5, 6}"],
            feedback: "Only 3 and 4 are in both a and b!"
          }
        },
        result: "{3, 4}"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)",
        predict: {
          question: "합집합의 결과는?",
          options: ["{1, 2, 3, 3, 4, 5}", "{1, 2, 3, 4, 5}", "{3}", "{1, 2, 4, 5}"],
          answer: 1,
          feedback: "둘을 합치고 중복은 제거!"
        },
        en: {
          predict: {
            question: "What is the union result?",
            options: ["{1, 2, 3, 3, 4, 5}", "{1, 2, 3, 4, 5}", "{3}", "{1, 2, 4, 5}"],
            feedback: "Combine both sets and remove duplicates!"
          }
        },
        result: "{1, 2, 3, 4, 5}"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "colors = {'빨강', '파랑'}\ncolors.add('초록')\nprint(colors)\n\ncolors.remove('빨강')\nprint(colors)",
        result: "{'빨강', '파랑', '초록'}\n{'파랑', '초록'}",
        note: "add()로 추가, remove()로 삭제! (discard()는 없어도 에러 안 남)"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "allowed = {'admin', 'user', 'guest'}\n\nprint('admin' in allowed)\nprint('hacker' in allowed)",
        predict: {
          question: "출력 결과는?",
          options: ["True\\nTrue", "True\\nFalse", "False\\nFalse"],
          answer: 1,
          feedback: "'admin'은 있으니 True, 'hacker'는 없으니 False!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["True\\nTrue", "True\\nFalse", "False\\nFalse"],
            feedback: "'admin' is in the set so True, 'hacker' is not so False!"
          }
        },
        result: "True\nFalse"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실전! 출석부에서 결석자 찾기!"],
        code: "all_students = {'민수', '영희', '철수', '지민', '유진'}\npresent = {'민수', '철수', '유진'}\n\nabsent = all_students - present\nprint(f'결석: {absent}')",
        result: "결석: {'영희', '지민'}",
        note: "차집합으로 결석자를 쉽게 찾을 수 있어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실전! 리스트에서 중복 제거 후 다시 리스트로!"],
        code: "scores = [90, 85, 90, 95, 85, 100]\nunique_scores = list(set(scores))\nprint(unique_scores)\nprint(f'종류: {len(unique_scores)}개')",
        result: "[85, 90, 95, 100]\n종류: 4개",
        note: "set()으로 중복 제거 -> list()로 다시 리스트!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "딕셔너리 복습! in으로 키 확인하기",
        task: "'사과'가 딕셔너리에 있는지 확인하고 출력하세요",
        template: "prices = {'사과': 1000, '바나나': 500}\nprint('사과' ___ prices)",
        answer: "in",
        expect: "True",
        en: {
          message: "Dictionary review! Check key existence with in",
          task: "Check if 'apple' is in the dictionary and print"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "집합에 '딸기'를 add()로 추가하고 출력하세요",
        guide: "set.add(값)!",
        hint: "fruits.add('딸기')",
        template: "fruits = {'사과', '바나나'}\nfruits.___(___)\nprint(fruits)",
        blanksAnswer: ["add", "'딸기'"],
        answer: "fruits = {'사과', '바나나'}\nfruits.add('딸기')\nprint(fruits)",
        expect: "{'사과', '바나나', '딸기'}",
        en: {
          task: "Add 'strawberry' to the set with add() and print",
          guide: "Use set.add(value)!",
          hint: "fruits.add('strawberry')"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 반의 학생 집합에서 공통 학생(교집합)을 찾으세요",
        guide: "& 연산자로 교집합!",
        hint: "class_a & class_b",
        template: "class_a = {'민수', '영희', '철수'}\nclass_b = {'영희', '지민', '철수'}\nboth = class_a ___ class_b\nprint(f'공통 학생: {both}')",
        answer: "&",
        expect: "공통 학생: {'영희', '철수'}",
        en: {
          task: "Find students that appear in both class sets (intersection)",
          guide: "Use the & operator for intersection!",
          hint: "class_a & class_b"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "리스트의 중복을 제거하고 정렬된 리스트로 출력하세요",
        guide: "set()으로 중복 제거 후 sorted()!",
        hint: "sorted(set(nums))",
        template: "nums = [3, 1, 2, 3, 1, 2]\nresult = sorted(___(nums))\nprint(result)",
        answer: "set",
        expect: "[1, 2, 3]",
        en: {
          task: "Remove duplicates from the list and print as a sorted list",
          guide: "Remove duplicates with set(), then use sorted()!",
          hint: "sorted(set(nums))"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "리스트 [1, 1, 2, 2, 3]에서 중복을 제거하는 가장 간단한 방법은?",
        options: [
          "for문으로 하나씩 확인",
          "set()으로 변환",
          "sort()로 정렬",
          "remove()로 삭제"
        ],
        answer: 1,
        explanation: "set()에 넣으면 중복이 자동 제거! 가장 간단하고 빠른 방법이에요.",
        en: {
          question: "What is the simplest way to remove duplicates from [1, 1, 2, 2, 3]?",
          options: [
            "Check one by one with a for loop",
            "Convert with set()",
            "Sort with sort()",
            "Delete with remove()"
          ],
          explanation: "Putting it in set() automatically removes duplicates! Simplest and fastest."
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "집합 활용 완벽 마스터!",
        emoji: "🏆"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "집합 활용",
        learned: [
          "add()로 추가, remove()로 삭제",
          "in으로 멤버십 테스트 (빠름!)",
          "set()으로 중복 제거",
          "차집합으로 빠진 것 찾기"
        ],
        canDo: "집합을 활용해서 중복 제거와 데이터 비교를 할 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== 추가 predict + quiz + practice ====================
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "s = {1, 2, 2, 3, 3, 3}\nprint(len(s))",
        predict: {
          question: "출력 결과는?",
          options: ["6", "3", "4", "에러"],
          answer: 1,
          feedback: "집합은 중복을 자동 제거! {1, 2, 2, 3, 3, 3} → {1, 2, 3} → len = 3"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["6", "3", "4", "Error"],
            feedback: "Sets remove duplicates! {1, 2, 2, 3, 3, 3} → {1, 2, 3} → len = 3"
          }
        },
        result: "3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: "a = {1, 2, 3}\na.discard(5)\nprint(len(a))",
        predict: {
          question: "출력 결과는?",
          options: ["에러 발생", "2", "3", "4"],
          answer: 2,
          feedback: "discard()는 없는 원소도 에러 없이 무시! 집합 크기 그대로 3!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["Error", "2", "3", "4"],
            feedback: "discard() silently ignores missing elements! Set size stays at 3!"
          }
        },
        result: "3"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 집합(set)의 특징이 아닌 것은?",
        options: [
          "중복 원소를 허용하지 않는다",
          "순서가 보장된다",
          "in으로 빠르게 멤버십 확인이 가능하다",
          "교집합, 합집합, 차집합 연산이 가능하다"
        ],
        answer: 1,
        explanation: "집합은 순서가 없어요! 인덱스로 접근 불가. 리스트와 다르게 출력 순서가 달라질 수 있어요.",
        en: {
          question: "Which of the following is NOT a characteristic of sets?",
          options: [
            "Does not allow duplicate elements",
            "Order is guaranteed",
            "Fast membership test with in",
            "Supports intersection, union, difference operations"
          ],
          explanation: "Sets are unordered! No index access. Unlike lists, the output order can vary."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 집합의 차집합(a에만 있고 b에 없는 것)을 구하고 출력하세요",
        guide: "- 연산자로 차집합!",
        hint: "a - b",
        template: "a = {1, 2, 3, 4, 5}\nb = {3, 4, 5, 6, 7}\nonly_a = a ___ b\nprint(only_a)",
        answer: "-",
        expect: "{1, 2}",
        en: {
          task: "Find the difference (elements in a but not in b) and print",
          guide: "Use the - operator for difference!",
          hint: "a - b"
        }
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
