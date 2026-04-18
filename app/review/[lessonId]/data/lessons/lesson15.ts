// 레슨 15: 자료구조 개요
import { LessonData } from '../types';

export const lesson15: LessonData = {
  id: "15",
  title: "자료구조 개요",
  description: "파이썬의 4가지 자료구조를 배워요!",
  steps: [
    // ==================== CHAPTER 1: 4가지 자료구조 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "4가지 자료구조 복습",
        desc: "괄호 모양으로 기억해!"
      }
    },

    // 괄호 종류 소개
    {
      type: "explain",
      content: {
        lines: ["파이썬 자료구조, 괄호로 구분해!"],
        code: "fruits = ['apple', 'banana', 'strawberry']   # list []\npoint  = (3, 5)                            # tuple ()\nstudent = {'name': 'alice', 'age': 13}     # dict {key:value}\nprimes  = {2, 3, 5, 7}                    # set {value}",
        note: "[ ] 리스트 / ( ) 튜플 / { } 딕셔너리 or 집합"
      }
    },

    // quiz 1: 괄호 종류
    {
      type: "quiz",
      content: {
        question: "리스트를 만들 때 쓰는 괄호는?",
        options: ["[ ] 대괄호", "( ) 소괄호", "{ } 중괄호"],
        answer: 0,
        explanation: "리스트는 대괄호 [ ] 를 사용해! fruits = ['사과', '바나나']",
        en: {
          question: "Which bracket is used to create a list?",
          options: ["[ ] Square brackets", "( ) Parentheses", "{ } Curly braces"],
          explanation: "Lists use square brackets [ ]! e.g. fruits = ['apple', 'banana']"
        }
      }
    },

    // quiz 2: 튜플 괄호
    {
      type: "quiz",
      content: {
        question: "튜플(tuple)을 만들 때 쓰는 괄호는?",
        options: ["[ ] 대괄호", "( ) 소괄호", "{ } 중괄호"],
        answer: 1,
        explanation: "튜플은 소괄호 ( ) 를 사용해! point = (3, 5)",
        en: {
          question: "Which bracket is used to create a tuple?",
          options: ["[ ] Square brackets", "( ) Parentheses", "{ } Curly braces"],
          explanation: "Tuples use parentheses ( )! e.g. point = (3, 5)"
        }
      }
    },

    // quiz 3: 딕셔너리 vs 집합
    {
      type: "quiz",
      content: {
        question: "{1, 2, 3} 은 어떤 자료구조야?",
        options: ["딕셔너리 (dictionary)", "집합 (set)", "튜플 (tuple)"],
        answer: 1,
        explanation: "값만 있으면 집합(set), 키:값 쌍이 있으면 딕셔너리야! {1, 2, 3} 은 값만 있으니까 집합!",
        en: {
          question: "What type of data structure is {1, 2, 3}?",
          options: ["Dictionary", "Set", "Tuple"],
          explanation: "Values only = set, key:value pairs = dictionary! {1, 2, 3} has only values, so it's a set!"
        }
      }
    },

    // quiz 4: 딕셔너리 구분
    {
      type: "quiz",
      content: {
        question: "{'name': 'Alice', 'age': 14} 은 어떤 자료구조야?",
        options: ["집합 (set)", "리스트 (list)", "딕셔너리 (dictionary)"],
        answer: 2,
        explanation: "'키': 값 쌍이 있으면 딕셔너리야! 중괄호 {} 를 쓰지만 집합과 달리 키:값 형태야.",
        en: {
          question: "What type is {'name': 'Alice', 'age': 14}?",
          options: ["Set", "List", "Dictionary"],
          explanation: "Key:value pairs mean dictionary! It uses {} like a set, but has the key:value format."
        }
      }
    },

    // ==================== CHAPTER 2: 특성 비교 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "순서 & 수정 가능 여부",
        desc: "4가지 특성 차이를 기억해!"
      }
    },

    // 특성 설명
    {
      type: "explain",
      content: {
        lines: ["각 자료구조마다 특성이 달라!"],
        code: "list    [  ] : ordered  mutable    duplicates allowed\ntuple   (  ) : ordered  immutable  duplicates allowed\ndict    { : } : ordered  mutable    no dup keys\nset     {  } : unordered mutable   no duplicates",
        note: "튜플은 한 번 만들면 못 바꿔! (읽기 전용)"
      }
    },

    // quiz 5: 수정 불가
    {
      type: "quiz",
      content: {
        question: "한 번 만들면 수정할 수 없는 자료구조는?",
        options: ["리스트", "튜플", "딕셔너리"],
        answer: 1,
        explanation: "튜플은 immutable(불변)이야! 만든 후에 값을 바꾸거나 추가할 수 없어.",
        en: {
          question: "Which data structure cannot be modified after creation?",
          options: ["List", "Tuple", "Dictionary"],
          explanation: "Tuple is immutable! You can't change or add values after creating it."
        }
      }
    },

    // quiz 6: 중복 불가
    {
      type: "quiz",
      content: {
        question: "중복 값을 저장할 수 없는 자료구조는?",
        options: ["리스트", "튜플", "집합 (set)"],
        answer: 2,
        explanation: "집합(set)은 중복을 허용하지 않아! {1, 1, 2, 2} 를 만들면 {1, 2} 가 돼.",
        en: {
          question: "Which data structure does NOT allow duplicate values?",
          options: ["List", "Tuple", "Set"],
          explanation: "Sets don't allow duplicates! {1, 1, 2, 2} becomes {1, 2}."
        }
      }
    },

    // ==================== CHAPTER 3: 접근 방법 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "데이터 접근하기",
        desc: "각 자료구조에서 값 꺼내는 법!"
      }
    },

    // 접근 방법 설명
    {
      type: "explain",
      content: {
        lines: ["자료구조마다 값을 꺼내는 방법이 달라!"],
        code: "fruits = ['apple', 'banana', 'strawberry']\nprint(fruits[0])    # apple (access by index)\n\npoint = (10, 20)\nprint(point[1])     # 20 (access by index)\n\nstudent = {'name': 'alice', 'age': 13}\nprint(student['name'])  # alice (access by key)",
        note: "리스트/튜플은 [인덱스], 딕셔너리는 [키]!"
      }
    },

    // predict 1: 리스트 인덱스
    {
      type: "explain",
      content: {
        lines: ["인덱스는 0부터 시작해!"],
        code: "colors = ['빨강', '초록', '파랑']\nprint(colors[1])",
        predict: {
          question: "출력 결과는?",
          options: ["빨강", "초록", "파랑"],
          answer: 1,
          feedback: "인덱스는 0부터 시작! colors[0]='빨강', colors[1]='초록', colors[2]='파랑'"
        },
        result: "초록",
        en: {
          lines: ["Index starts from 0!"],
          predict: {
            question: "What is the output?",
            options: ["빨강", "초록", "파랑"],
            feedback: "Index starts at 0! colors[0]='빨강', colors[1]='초록', colors[2]='파랑'"
          }
        }
      }
    },

    // predict 2: 딕셔너리 키 접근
    {
      type: "explain",
      content: {
        lines: ["딕셔너리는 키로 값을 꺼내!"],
        code: "person = {'name': 'bob', 'age': 15}\nprint(person['age'])",
        predict: {
          question: "출력 결과는?",
          options: ["영희", "15", "age"],
          answer: 1,
          feedback: "person['age'] 는 'age' 키에 해당하는 값 15 를 꺼내!"
        },
        result: "15",
        en: {
          lines: ["Dictionary uses keys to access values!"],
          predict: {
            question: "What is the output?",
            options: ["영희", "15", "age"],
            feedback: "person['age'] retrieves the value 15 associated with the key 'age'!"
          }
        }
      }
    },

    // predict 3: 집합 특성
    {
      type: "explain",
      content: {
        lines: ["집합에 중복을 넣으면 어떻게 될까?"],
        code: "nums = {1, 2, 2, 3, 3, 3}\nprint(len(nums))",
        predict: {
          question: "출력 결과는?",
          options: ["6", "3", "에러"],
          answer: 1,
          feedback: "집합은 중복을 제거해! {1, 2, 2, 3, 3, 3} → {1, 2, 3} 이 되어서 len은 3!"
        },
        result: "3",
        en: {
          lines: ["What happens when you add duplicates to a set?"],
          predict: {
            question: "What is the output?",
            options: ["6", "3", "Error"],
            feedback: "Sets remove duplicates! {1, 2, 2, 3, 3, 3} → {1, 2, 3}, so len is 3!"
          }
        }
      }
    },

    // ==================== CHAPTER 4: 연습 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "직접 써보기",
        desc: "자료구조를 만들어봐!"
      }
    },

    // interleaving: for문 복습 (lesson 13)
    {
      type: "interleaving",
      content: {
        message: "for문 기억나? (레슨 13)",
        task: "numbers = [1, 2, 3] 의 각 원소를 for문으로 출력해봐",
        template: null,
        answer: "numbers = [1, 2, 3]\nfor n in numbers:\n    print(n)",
        expect: "1\n2\n3",
        en: {
          message: "Remember for loops? (Lesson 13)",
          task: "Use a for loop to print each element of numbers = [1, 2, 3]"
        }
      }
    },

    // interleaving: if문 복습 (lesson 11)
    {
      type: "interleaving",
      content: {
        message: "if문도 기억나? (레슨 11)",
        task: "score = 90 일 때, 90 이상이면 '합격' 을 출력해봐",
        template: null,
        answer: "score = 90\nif score >= 90:\n    print('합격')",
        expect: "합격",
        en: {
          message: "Remember if statements? (Lesson 11)",
          task: "If score = 90, print '합격' when score is 90 or above"
        }
      }
    },

    // practice 1: 리스트 만들기
    {
      type: "practice",
      content: {
        level: 1,
        task: "3개의 과일 이름이 담긴 리스트를 만들어봐. fruits = ['사과', '바나나', '딸기'] 를 출력해봐",
        guide: "리스트는 [ ] 대괄호!",
        template: null,
        answer: "fruits = ['사과', '바나나', '딸기']\nprint(fruits)",
        expect: "['사과', '바나나', '딸기']",
        en: {
          task: "Create a list of 3 fruits. Print fruits = ['사과', '바나나', '딸기']",
          guide: "Lists use [ ] square brackets!"
        }
      }
    },

    // practice 2: 딕셔너리 만들기
    {
      type: "practice",
      content: {
        level: 2,
        task: "이름이 '민준', 나이가 14인 딕셔너리 person 을 만들고, person['name'] 을 출력해봐",
        guide: "딕셔너리는 {키: 값} 형태!",
        template: null,
        answer: "person = {'name': '민준', 'age': 14}\nprint(person['name'])",
        expect: "민준",
        en: {
          task: "Create a dictionary person with name '민준' and age 14, then print person['name']",
          guide: "Dictionary uses {key: value} format!"
        }
      }
    },

    // errorQuiz 1: 튜플 수정 시도
    {
      type: "errorQuiz",
      content: {
        question: "이 코드에서 에러가 나는 이유는?",
        code: "colors = ('red', 'green', 'blue')\ncolors[0] = 'yellow'",
        options: [
          "튜플은 수정할 수 없어 (immutable)",
          "인덱스 0 은 존재하지 않아서",
          "() 소괄호 대신 [] 써야 해서"
        ],
        answer: 0,
        explanation: "튜플은 한 번 만들면 수정 불가야! 값을 바꾸려면 리스트 [ ] 를 사용해야 해.",
        en: {
          question: "Why does this code cause an error?",
          options: [
            "Tuples are immutable — cannot be modified",
            "Index 0 doesn't exist",
            "Should use [] instead of ()"
          ],
          explanation: "Tuples are immutable! To change values, use a list [ ] instead."
        }
      }
    },

    // errorQuiz 2: 잘못된 괄호
    {
      type: "errorQuiz",
      content: {
        question: "리스트를 만들려고 했는데 왜 딕셔너리가 만들어질까?",
        code: "data = {'alice', 'bob', 'charlie'}\nprint(type(data))",
        options: [
          "{ } 는 집합(set)이나 딕셔너리야 — 리스트는 [ ] 를 써야 해",
          "'철수' 에 따옴표가 있어서",
          "변수 이름 data 가 예약어라서"
        ],
        answer: 0,
        explanation: "중괄호 {} 에 키:값 없이 값만 넣으면 집합(set)이 돼! 리스트를 만들려면 대괄호 [ ] 를 써야 해.",
        en: {
          question: "Trying to make a list — why does it become a set?",
          options: [
            "{ } creates a set or dict — use [ ] for a list",
            "Because '철수' has quotes",
            "data is a reserved keyword"
          ],
          explanation: "Curly braces {} with only values (no key:value) create a set! Use [ ] for a list."
        }
      }
    },

    // predict: 타입 확인
    {
      type: "explain",
      content: {
        lines: ["이 코드의 출력을 예측해봐!"],
        code: "data = {1, 2, 3}\nprint(type(data))",
        predict: {
          options: ["<class 'list'>", "<class 'dict'>", "<class 'set'>", "<class 'tuple'>"],
          answer: 2,
          feedback: "중괄호 {}에 값만 있으면 set(집합)이야! dict는 {키:값} 형태야."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["<class 'list'>", "<class 'dict'>", "<class 'set'>", "<class 'tuple'>"],
            feedback: "Curly braces {} with just values = set! dict uses {key: value} format."
          }
        }
      }
    },

    // quiz: 자료구조 선택
    {
      type: "quiz",
      content: {
        question: "수정이 불가능한 (읽기 전용) 자료구조는?",
        options: [
          "list (리스트)",
          "dict (딕셔너리)",
          "tuple (튜플)",
          "set (집합)"
        ],
        answer: 2,
        explanation: "튜플 ()은 한 번 만들면 값을 바꿀 수 없어! 수정 불가 = 읽기 전용 (immutable).",
        en: {
          question: "Which data structure is immutable (read-only)?",
          options: [
            "list",
            "dict",
            "tuple",
            "set"
          ],
          explanation: "Tuple () cannot be changed once created! Immutable = read-only."
        }
      }
    },

    // 최종 요약
    {
      type: "summary",
      content: {
        num: 4,
        title: "자료구조 개요 마스터",
        learned: [
          "리스트 [ ] — 순서O, 수정O, 중복O",
          "튜플 ( ) — 순서O, 수정X (읽기 전용)",
          "딕셔너리 {키:값} — 키로 접근",
          "집합 { } — 중복X, 순서X"
        ],
        canDo: "4가지 자료구조의 특성과 괄호를 구분할 수 있어!",
        emoji: "📦"
      }
    },

    // 완료
    {
      type: "done",
      content: {}
    }
  ]
};
