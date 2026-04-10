// 레슨 20: 딕셔너리
import { LessonData } from '../types';

export const lesson20: LessonData = {
  id: "20",
  title: "딕셔너리",
  description: "키와 값으로 데이터를 관리하는 딕셔너리를 배워요!",
  steps: [
    // ==================== CHAPTER 1: 딕셔너리 만들기 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "딕셔너리 만들기",
        desc: "이름표를 붙여서 데이터를 저장!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["딕셔너리는 {키: 값} 형태로 만들어요!"],
        code: "student = {'이름': '민수', '나이': 15, '학년': 1}\nprint(student)",
        result: "{'이름': '민수', '나이': 15, '학년': 1}",
        note: "사물함처럼 이름표(키)로 값을 찾을 수 있어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "student = {'이름': '민수', '나이': 15}\n\n# 방법 1: 대괄호\nprint(student['이름'])\n\n# 방법 2: get()\nprint(student.get('나이'))",
        predict: {
          question: "출력 결과는?",
          options: ["민수\\n15", "이름\\n나이", "{'이름': '민수'}\\n{'나이': 15}"],
          answer: 0,
          feedback: "키를 넣으면 해당하는 값이 나와요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["민수\\n15", "이름\\n나이", "{'이름': '민수'}\\n{'나이': 15}"],
            feedback: "Providing the key retrieves the corresponding value!"
          }
        },
        result: "민수\n15"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["get()은 키가 없어도 에러가 안 나요!"],
        code: "student = {'이름': '민수'}\n\n# 대괄호: 없는 키 -> 에러!\n# print(student['주소'])  # KeyError!\n\n# get(): 없는 키 -> None\nprint(student.get('주소'))\nprint(student.get('주소', '정보 없음'))",
        result: "None\n정보 없음",
        note: "get()의 두 번째 인자 = 기본값! 안전하게 쓸 수 있어요."
      }
    },
    {
      type: "interleaving",
      content: {
        message: "리스트 복습! 인덱스로 접근하기",
        task: "리스트 ['a', 'b', 'c']에서 마지막 요소를 출력하세요",
        template: "letters = ['a', 'b', 'c']\nprint(letters[___])",
        blanksAnswer: ["-1"],
        answer: "letters = ['a', 'b', 'c']\nprint(letters[-1])",
        expect: "c",
        en: {
          message: "List review! Access by index",
          task: "Print the last element from the list ['a', 'b', 'c']"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "과일 가격 딕셔너리를 만들고 '사과'의 가격을 출력하세요",
        guide: "{'키': 값} 형태로!",
        hint: "prices = {'사과': 1000, '바나나': 500}",
        template: "prices = {'사과': 1000, '바나나': 500}\nprint(prices[___])",
        blanksAnswer: ["'사과'"],
        answer: "prices = {'사과': 1000, '바나나': 500}\nprint(prices['사과'])",
        expect: "1000",
        en: {
          task: "Create a fruit price dictionary and print the price of 'apple'",
          guide: "Use {'key': value} format!",
          hint: "prices = {'apple': 1000, 'banana': 500}"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리에서 키로 사용할 수 없는 것은?",
        options: [
          "문자열 'name'",
          "숫자 42",
          "리스트 [1, 2]",
          "튜플 (1, 2)"
        ],
        answer: 2,
        explanation: "리스트는 변경 가능(mutable)이라 키로 사용 불가! 문자열, 숫자, 튜플은 OK!",
        en: {
          question: "Which of the following cannot be used as a dictionary key?",
          options: [
            "String 'name'",
            "Number 42",
            "List [1, 2]",
            "Tuple (1, 2)"
          ],
          explanation: "Lists are mutable, so they cannot be dictionary keys! Strings, numbers, and tuples are OK!"
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "딕셔너리 기초 완성!",
        emoji: "📖"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "딕셔너리 만들기",
        learned: [
          "{키: 값}으로 딕셔너리 생성",
          "dict['키']로 값 접근",
          "dict.get('키')로 안전하게 접근",
          "키는 문자열, 숫자, 튜플만 가능"
        ],
        canDo: "딕셔너리를 만들고 값을 꺼낼 수 있어!",
        emoji: "📖"
      }
    },

    // ==================== CHAPTER 2: 수정과 삭제 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "수정과 삭제",
        desc: "딕셔너리에 추가, 수정, 삭제하기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["새로운 키-값 추가하기!"],
        code: "student = {'이름': '민수'}\nstudent['나이'] = 15\nstudent['학년'] = 1\nprint(student)",
        result: "{'이름': '민수', '나이': 15, '학년': 1}",
        note: "없는 키에 값을 넣으면 자동으로 추가!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "student = {'이름': '민수', '나이': 15}\nstudent['나이'] = 16\nprint(student)",
        predict: {
          question: "나이가 어떻게 될까?",
          options: ["15", "16", "[15, 16]", "에러"],
          answer: 1,
          feedback: "있는 키에 값을 넣으면 덮어쓰기!"
        },
        en: {
          predict: {
            question: "What will the value of age become?",
            options: ["15", "16", "[15, 16]", "Error"],
            feedback: "Assigning to an existing key overwrites the old value!"
          }
        },
        result: "{'이름': '민수', '나이': 16}"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["del과 pop()으로 삭제!"],
        code: "student = {'이름': '민수', '나이': 15, '학년': 1}\n\n# del: 그냥 삭제\ndel student['학년']\nprint(student)\n\n# pop(): 삭제하면서 값 반환\nage = student.pop('나이')\nprint(f'삭제된 나이: {age}')\nprint(student)",
        result: "{'이름': '민수', '나이': 15}\n삭제된 나이: 15\n{'이름': '민수'}",
        note: "del은 그냥 삭제, pop()은 삭제하면서 값을 돌려줘요!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "튜플 복습! 튜플은 수정이 되나요?",
        task: "튜플 (1, 2, 3)의 길이를 출력하세요 (수정은 안 되지만 len()은 돼요!)",
        template: "t = (1, 2, 3)\nprint(___(t))",
        blanksAnswer: ["len"],
        answer: "t = (1, 2, 3)\nprint(len(t))",
        expect: "3",
        en: {
          message: "Tuple review! Can tuples be modified?",
          task: "Print the length of tuple (1, 2, 3) (can't modify, but len() works!)"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "딕셔너리에 '학교': '중학교'를 추가하고 출력하세요",
        guide: "dict['새 키'] = 값 형태!",
        hint: "info['학교'] = '중학교'",
        template: "info = {'이름': '영희'}\ninfo[___] = ___\nprint(info)",
        blanksAnswer: ["'학교'", "'중학교'"],
        answer: "info = {'이름': '영희'}\ninfo['학교'] = '중학교'\nprint(info)",
        expect: "{'이름': '영희', '학교': '중학교'}",
        en: {
          task: "Add 'school': 'middle school' to the dictionary and print",
          guide: "Use dict['new key'] = value format!",
          hint: "info['school'] = 'middle school'"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "딕셔너리에서 '나이' 키를 pop()으로 삭제하고 삭제된 값을 출력하세요",
        guide: "pop()은 삭제하면서 값을 반환!",
        hint: "removed = info.pop('나이')",
        template: "info = {'이름': '민수', '나이': 15}\nremoved = info.___(___)\nprint(removed)",
        blanksAnswer: ["pop", "'나이'"],
        answer: "info = {'이름': '민수', '나이': 15}\nremoved = info.pop('나이')\nprint(removed)",
        expect: "15",
        en: {
          task: "Remove the 'age' key with pop() and print the removed value",
          guide: "pop() removes and returns the value!",
          hint: "removed = info.pop('age')"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "d = {'a': 1}; d['b'] = 2 실행 후 d는?",
        options: [
          "{'a': 1}",
          "{'b': 2}",
          "{'a': 1, 'b': 2}",
          "에러"
        ],
        answer: 2,
        explanation: "없는 키에 값을 넣으면 새 키-값 쌍이 추가돼요!",
        en: {
          question: "After d = {'a': 1}; d['b'] = 2, what is d?",
          options: [
            "{'a': 1}",
            "{'b': 2}",
            "{'a': 1, 'b': 2}",
            "Error"
          ],
          explanation: "Assigning a value to a new key adds a new key-value pair!"
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "딕셔너리 수정/삭제 클리어!",
        emoji: "🔧"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "수정과 삭제",
        learned: [
          "dict['키'] = 값 으로 추가/수정",
          "del dict['키']로 삭제",
          "dict.pop('키')로 삭제 + 값 반환",
          "없는 키 = 추가, 있는 키 = 덮어쓰기"
        ],
        canDo: "딕셔너리를 자유롭게 수정할 수 있어!",
        emoji: "🔧"
      }
    },

    // ==================== CHAPTER 3: 딕셔너리 순회 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "딕셔너리 순회",
        desc: "keys(), values(), items()로 반복!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["keys()로 키만 순회!"],
        code: "scores = {'국어': 90, '영어': 85, '수학': 95}\nfor subject in scores.keys():\n    print(subject)",
        result: "국어\n영어\n수학",
        note: "keys()를 생략해도 기본으로 키를 순회해요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "scores = {'국어': 90, '영어': 85, '수학': 95}\nfor score in scores.values():\n    print(score)",
        predict: {
          question: "출력 결과는?",
          options: ["국어\\n영어\\n수학", "90\\n85\\n95", "국어: 90\\n영어: 85\\n수학: 95"],
          answer: 1,
          feedback: "values()는 값만 꺼내요!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["국어\\n영어\\n수학", "90\\n85\\n95", "국어: 90\\n영어: 85\\n수학: 95"],
            feedback: "values() retrieves only the values!"
          }
        },
        result: "90\n85\n95"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["items()로 키와 값을 한 번에!"],
        code: "scores = {'국어': 90, '영어': 85, '수학': 95}\nfor subject, score in scores.items():\n    print(f'{subject}: {score}점')",
        result: "국어: 90점\n영어: 85점\n수학: 95점",
        note: "items()는 (키, 값) 튜플을 돌려줘요! 언패킹 활용!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "튜플 언패킹 복습!",
        task: "튜플 ('민수', 100)을 name, score로 언패킹하고 출력하세요",
        template: "___, ___ = ('민수', 100)\nprint(f'{name}: {score}점')",
        blanksAnswer: ["name", "score"],
        answer: "name, score = ('민수', 100)\nprint(f'{name}: {score}점')",
        expect: "민수: 100점",
        en: {
          message: "Tuple unpacking review!",
          task: "Unpack tuple ('Minsu', 100) into name and score, then print"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "딕셔너리의 모든 값(values)을 순회하며 출력하세요",
        guide: "values()를 for문에 넣어요!",
        hint: "for v in ages.values(): print(v)",
        template: "ages = {'민수': 15, '영희': 14, '철수': 16}\nfor age in ages.___():\n    print(age)",
        blanksAnswer: ["values"],
        answer: "ages = {'민수': 15, '영희': 14, '철수': 16}\nfor age in ages.values():\n    print(age)",
        expect: "15\n14\n16",
        en: {
          task: "Iterate over all values in the dictionary and print them",
          guide: "Put values() in the for loop!",
          hint: "for v in ages.values(): print(v)"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "items()로 '이름: 나이살' 형태로 출력하세요",
        guide: "for name, age in dict.items():",
        hint: "f'{name}: {age}살' 형태!",
        template: "ages = {'민수': 15, '영희': 14}\nfor ___, ___ in ages.items():\n    print(f'{name}: {age}살')",
        blanksAnswer: ["name", "age"],
        answer: "ages = {'민수': 15, '영희': 14}\nfor name, age in ages.items():\n    print(f'{name}: {age}살')",
        expect: "민수: 15살\n영희: 14살",
        en: {
          task: "Print in 'name: age years old' format using items()",
          guide: "for name, age in dict.items():",
          hint: "f'{name}: {age} years old' format!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리를 for문에 바로 넣으면 뭘 순회할까?",
        options: [
          "값(values)",
          "키(keys)",
          "(키, 값) 쌍",
          "에러 발생"
        ],
        answer: 1,
        explanation: "for x in dict: 하면 기본으로 키를 순회해요! dict.keys()와 같아요.",
        en: {
          question: "When you put a dictionary directly in a for loop, what does it iterate over?",
          options: [
            "Values",
            "Keys",
            "(key, value) pairs",
            "Error"
          ],
          explanation: "for x in dict: iterates over keys by default! Same as dict.keys()."
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "딕셔너리 순회 마스터!",
        emoji: "🔄"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "딕셔너리 순회",
        learned: [
          "keys(): 키만 순회",
          "values(): 값만 순회",
          "items(): (키, 값) 쌍을 순회",
          "기본 for문은 키를 순회"
        ],
        canDo: "딕셔너리를 for문으로 반복할 수 있어!",
        emoji: "🔄"
      }
    },

    // ==================== CHAPTER 4: 실전 활용 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "실전 활용",
        desc: "학생 성적 관리 프로그램을 만들어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["학생 성적을 딕셔너리로 관리!"],
        code: "scores = {'국어': 90, '영어': 85, '수학': 95}\n\n# 전체 합계\ntotal = sum(scores.values())\nprint(f'합계: {total}')\n\n# 평균\navg = total / len(scores)\nprint(f'평균: {avg:.1f}')",
        result: "합계: 270\n평균: 90.0",
        note: "sum()과 len()을 딕셔너리에도 쓸 수 있어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "scores = {'국어': 90, '영어': 85}\n\nprint('국어' in scores)\nprint('과학' in scores)",
        predict: {
          question: "출력 결과는?",
          options: ["True\\nTrue", "True\\nFalse", "90\\nFalse"],
          answer: 1,
          feedback: "'국어'는 있으니 True, '과학'은 없으니 False!"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["True\\nTrue", "True\\nFalse", "90\\nFalse"],
            feedback: "'국어' exists so True, '과학' doesn't exist so False!"
          }
        },
        result: "True\nFalse"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "성적 딕셔너리의 values() 합계를 구하고 출력하세요",
        guide: "sum()으로 합계 구하기!",
        hint: "sum(scores.values())",
        template: "scores = {'국어': 80, '영어': 90, '수학': 100}\ntotal = ___(scores.___())\nprint(f'합계: {total}')",
        blanksAnswer: ["sum", "values"],
        answer: "scores = {'국어': 80, '영어': 90, '수학': 100}\ntotal = sum(scores.values())\nprint(f'합계: {total}')",
        expect: "합계: 270",
        en: {
          task: "Sum the values() of the score dictionary and print",
          guide: "Use sum() to get the total!",
          hint: "sum(scores.values())"
        }
      }
    },
    {
      type: "interleaving",
      content: {
        message: "리스트 복습! sum()으로 합계 구하기",
        task: "리스트 [10, 20, 30]의 합계를 출력하세요",
        template: "nums = [10, 20, 30]\nprint(___)",
        blanksAnswer: ["sum(nums)"],
        answer: "nums = [10, 20, 30]\nprint(sum(nums))",
        expect: "60",
        en: {
          message: "List review! Sum with sum()",
          task: "Print the sum of list [10, 20, 30]"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "딕셔너리에 '과학' 키가 있는지 확인하고, 없으면 90점으로 추가한 뒤 출력하세요",
        guide: "if '키' not in dict: 으로 확인!",
        hint: "if '과학' not in scores: scores['과학'] = 90",
        template: "scores = {'국어': 80, '영어': 90}\nif '과학' ___ ___ scores:\n    scores['과학'] = 90\nprint(scores)",
        blanksAnswer: ["not", "in"],
        answer: "scores = {'국어': 80, '영어': 90}\nif '과학' not in scores:\n    scores['과학'] = 90\nprint(scores)",
        expect: "{'국어': 80, '영어': 90, '과학': 90}",
        en: {
          task: "Check if 'science' key exists; if not, add it with 90 points and print",
          guide: "Check with: if 'key' not in dict:",
          hint: "if 'science' not in scores: scores['science'] = 90"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리 d의 모든 값의 합계를 구하는 방법은?",
        options: [
          "sum(d)",
          "sum(d.keys())",
          "sum(d.values())",
          "sum(d.items())"
        ],
        answer: 2,
        explanation: "sum(d.values())로 모든 값의 합계를 구해요! sum(d)는 키의 합을 구하려 해요.",
        en: {
          question: "How do you sum all values in dictionary d?",
          options: [
            "sum(d)",
            "sum(d.keys())",
            "sum(d.values())",
            "sum(d.items())"
          ],
          explanation: "sum(d.values()) sums all values! sum(d) tries to sum the keys."
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "딕셔너리 실전 활용 완벽!",
        emoji: "🏆"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "딕셔너리 실전",
        learned: [
          "sum(dict.values())로 합계 구하기",
          "len(dict)로 항목 개수 구하기",
          "'키' in dict로 존재 여부 확인",
          "조건문과 결합하여 활용"
        ],
        canDo: "딕셔너리로 실전 데이터를 관리할 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== CHAPTER 5: 딕셔너리 손에 익히기 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "딕셔너리 손에 익히기",
        desc: "{키: 값}, get, items, sum — 자동으로 손이 나오게!"
      }
    },

    // Drill 1: 딕셔너리 생성 + 접근
    {
      type: "practice",
      content: {
        level: 1,
        task: "학생 정보 딕셔너리를 만들고 이름과 학년을 출력해요",
        guide: "{'키': 값}; dict['키']",
        template: "student = {'이름': '지민', '학년': 2, '점수': 90}\nprint(student[___])\nprint(student[___])",
        blanksAnswer: ["'이름'", "'학년'"],
        answer: "student = {'이름': '지민', '학년': 2, '점수': 90}\nprint(student['이름'])\nprint(student['학년'])",
        expect: "지민\n2",
        en: {
          task: "Create a student info dictionary and print the name and grade",
          guide: "{'key': value}; dict['key']"
        }
      }
    },

    // Drill 2: 추가 + 수정 + get
    {
      type: "practice",
      content: {
        level: 2,
        task: "딕셔너리에 '학교' 추가, '점수' 수정(95로), 없는 키 'email'을 get으로 안전하게 접근해요",
        guide: "dict['키'] = 값; dict.get('키', 기본값)",
        template: "info = {'이름': '민수', '점수': 80}\ninfo[___] = '한강중학교'\ninfo['점수'] = ___\nprint(info.get(___, '없음'))",
        blanksAnswer: ["'학교'", "95", "'email'"],
        answer: "info = {'이름': '민수', '점수': 80}\ninfo['학교'] = '한강중학교'\ninfo['점수'] = 95\nprint(info.get('email', '없음'))",
        expect: "없음",
        en: {
          task: "Add 'school', update 'score' to 95, and safely access missing key 'email' with get()",
          guide: "dict['key'] = value; dict.get('key', default)"
        }
      }
    },

    // Drill 3: items() 순회
    {
      type: "practice",
      content: {
        level: 2,
        task: "items()로 순회하며 '과목: 점수점' 형식으로 출력해요",
        guide: "for k, v in dict.items():",
        template: "scores = {'국어': 90, '영어': 85, '수학': 95}\nfor ___, ___ in scores.___():\n    print(f'{subject}: {score}점')",
        blanksAnswer: ["subject", "score", "items"],
        answer: "scores = {'국어': 90, '영어': 85, '수학': 95}\nfor subject, score in scores.items():\n    print(f'{subject}: {score}점')",
        expect: "국어: 90점\n영어: 85점\n수학: 95점",
        en: {
          task: "Iterate with items() and print in 'subject: score점' format",
          guide: "for k, v in dict.items():"
        }
      }
    },

    // Drill 4: 처음부터 — 빈도수 세기
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 문자 리스트에서 각 문자의 등장 횟수를 딕셔너리로 만들어 출력해요",
        guide: "for c in chars: cnt[c] = cnt.get(c, 0) + 1",
        hint: "chars = ['a', 'b', 'a', 'c', 'b', 'a']\ncnt = {}\nfor c in chars:\n    cnt[c] = cnt.get(c, 0) + 1\nprint(cnt)",
        template: null,
        answer: "chars = ['a', 'b', 'a', 'c', 'b', 'a']\ncnt = {}\nfor c in chars:\n    cnt[c] = cnt.get(c, 0) + 1\nprint(cnt)",
        alternateAnswers: [
          "chars=['a','b','a','c','b','a']\ncnt={}\nfor c in chars:\n    cnt[c]=cnt.get(c,0)+1\nprint(cnt)"
        ],
        expect: "{'a': 3, 'b': 2, 'c': 1}",
        en: {
          task: "Write from scratch! Count how many times each character appears in a list and store in a dict",
          guide: "for c in chars: cnt[c] = cnt.get(c, 0) + 1",
          hint: "chars = ['a', 'b', 'a', 'c', 'b', 'a']\ncnt = {}\nfor c in chars:\n    cnt[c] = cnt.get(c, 0) + 1\nprint(cnt)"
        }
      }
    },

    // Drill 5: 처음부터 — 성적 분석
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 과목-점수 딕셔너리에서 80점 이상인 과목만 출력하고\n전체 평균도 출력해요",
        guide: "for k, v in dict.items(): if v >= 80; sum/len",
        hint: "scores = {'국어': 90, '영어': 75, '수학': 85, '과학': 70}\nfor subject, score in scores.items():\n    if score >= 80:\n        print(subject)\navg = sum(scores.values()) / len(scores)\nprint(f'평균: {avg}')",
        template: null,
        answer: "scores = {'국어': 90, '영어': 75, '수학': 85, '과학': 70}\nfor subject, score in scores.items():\n    if score >= 80:\n        print(subject)\navg = sum(scores.values()) / len(scores)\nprint(f'평균: {avg}')",
        alternateAnswers: [
          "scores={'국어':90,'영어':75,'수학':85,'과학':70}\nfor s,v in scores.items():\n    if v>=80:print(s)\nprint(f'평균: {sum(scores.values())/len(scores)}')"
        ],
        expect: "국어\n수학\n평균: 80.0",
        en: {
          task: "Write from scratch! Print subjects with score >= 80, then print the overall average",
          guide: "for k, v in dict.items(): if v >= 80; sum/len",
          hint: "scores = {'국어': 90, '영어': 75, '수학': 85, '과학': 70}\nfor subject, score in scores.items():\n    if score >= 80:\n        print(subject)\navg = sum(scores.values()) / len(scores)\nprint(f'평균: {avg}')"
        }
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
