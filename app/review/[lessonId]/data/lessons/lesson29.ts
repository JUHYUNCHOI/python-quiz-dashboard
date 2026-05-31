import { LessonData } from '../types';

export const lesson29: LessonData = {
  id: "29",
  title: "단어장 프로그램",
  description: "딕셔너리로 단어장을 만들어요! 추가, 검색, 삭제까지!",
  steps: [
    // ==================== CHAPTER 1: 단어 저장 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "단어 저장",
        desc: "딕셔너리에 단어:뜻을 짝지어 저장!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["딕셔너리로 단어:뜻을 저장"],
        code: `vocab = {}
vocab['apple'] = '사과'
vocab['banana'] = '바나나'
print(vocab['apple'])`,
        result: "사과",
        note: "vocab[키] = 값 으로 추가, vocab[키] 로 조회!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "빈 딕셔너리를 만드는 올바른 방법은?",
        options: ["vocab = []", "vocab = ()", "vocab = {}", "vocab = ''"],
        answer: 2,
        explanation: "{}는 빈 딕셔너리(또는 set)! []는 리스트, ()는 튜플이에요.",
        en: {
          question: "How to create an empty dictionary?",
          options: ["vocab = []", "vocab = ()", "vocab = {}", "vocab = ''"],
          explanation: "{} creates an empty dict! [] is list, () is tuple."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "vocab에 'cat': '고양이'를 추가하세요",
        guide: "vocab[키] = 값",
        hint: "vocab['cat'] = '고양이'",
        template: "vocab = {}\nvocab[___] = '고양이'\nprint(vocab)",
        answer: "'cat'",
        expect: "{'cat': '고양이'}"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 vs 딕셔너리!",
        task: "딕셔너리에서 키로 값을 꺼내세요",
        template: "scores = {'철수': 90, '영희': 85}\nprint(scores[___])",
        answer: "'철수'",
        expect: "90",
        en: {
          message: "🔄 List vs Dict!",
          task: "Access a dict value by key"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `vocab = {}
vocab['apple'] = '사과'
vocab['apple'] = '애플'
print(vocab)`,
        predict: {
          options: ["{'apple': '사과'}", "{'apple': '애플'}", "{'apple': ['사과', '애플']}", "에러"],
          answer: 1,
          feedback: "같은 키에 다시 대입하면 덮어써요! 뜻이 '애플'로 바뀜."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["{'apple': '사과'}", "{'apple': '애플'}", "{'apple': ['사과', '애플']}", "Error"],
            feedback: "Reassigning the same key OVERWRITES! Value becomes '애플'."
          }
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "단어 저장",
        learned: [
          "vocab = {} → 빈 딕셔너리",
          "vocab[키] = 값 → 추가/수정",
          "vocab[키] → 값 조회",
          "같은 키에 재대입 → 덮어쓰기"
        ],
        canDo: "딕셔너리로 단어:뜻을 저장할 수 있어!",
        emoji: "📖"
      }
    },

    // ==================== CHAPTER 2: 검색과 안전 접근 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "검색하기",
        desc: "in으로 키가 있는지 확인, get으로 안전하게!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["in 으로 키가 있는지 확인"],
        code: `vocab = {'apple': '사과', 'banana': '바나나'}

if 'apple' in vocab:
    print(f"있음: {vocab['apple']}")

if 'grape' in vocab:
    print("grape 있음")
else:
    print("grape 없음")`,
        result: "있음: 사과\ngrape 없음",
        note: "딕셔너리에서 'key in dict'는 키 존재 여부를 확인!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리에 없는 키에 vocab['없는키']로 접근하면?",
        options: ["None 반환", "빈 문자열 반환", "KeyError 발생", "False 반환"],
        answer: 2,
        explanation: "딕셔너리에서 없는 키에 [] 로 접근하면 KeyError! 안전하게는 in으로 먼저 확인하거나 get()을 쓰세요.",
        en: {
          question: "What happens with vocab['missing_key']?",
          options: ["Returns None", "Returns empty string", "Raises KeyError", "Returns False"],
          explanation: "Accessing a missing key with [] raises KeyError! Check with 'in' first or use get()."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "'apple'이 vocab에 있는지 확인 후 뜻 출력",
        guide: "if 키 in dict 사용!",
        hint: "in 연산자!",
        template: "vocab = {'apple': '사과'}\nif 'apple' ___ vocab:\n    print(vocab['apple'])",
        answer: "in",
        expect: "사과"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["get()으로 안전하게! 없으면 기본값"],
        code: `vocab = {'apple': '사과'}

# 있을 때
print(vocab.get('apple', '없음'))

# 없을 때
print(vocab.get('grape', '없음'))`,
        result: "사과\n없음",
        note: "dict.get(키, 기본값) → 키가 없으면 기본값 반환! KeyError 안 나요."
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "get()으로 'grape' 검색, 없으면 '없음' 출력",
        guide: "vocab.get(키, 기본값)",
        hint: "get 메서드!",
        template: "vocab = {'apple': '사과'}\nresult = vocab.___('grape', '없음')\nprint(result)",
        answer: "get",
        expect: "없음"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `vocab = {'apple': '사과'}
print(vocab['grape'])`,
        options: [
          "'grape' 키가 없어서 KeyError 발생",
          "딕셔너리 문법 오류",
          "print 사용법이 잘못됨",
          "문제없음"
        ],
        answer: 0,
        explanation: "없는 키에 [] 접근 → KeyError! vocab.get('grape', '없음') 처럼 get()을 쓰거나 if 'grape' in vocab로 먼저 확인하세요.",
        en: {
          question: "What's wrong with this code?",
          options: [
            "'grape' key missing → KeyError",
            "Dict syntax error",
            "print misuse",
            "No problem"
          ],
          explanation: "Accessing a missing key raises KeyError! Use vocab.get('grape', '없음') or check 'grape' in vocab first."
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "검색하기",
        learned: [
          "'키' in dict → 키 존재 여부 (True/False)",
          "dict[키] → 없으면 KeyError!",
          "dict.get(키, 기본값) → 안전한 접근",
          "if key in dict: 패턴이 가장 명확"
        ],
        canDo: "딕셔너리에서 안전하게 검색할 수 있어!",
        emoji: "🔍"
      }
    },

    // ==================== CHAPTER 3: 삭제 + 순회 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "삭제 + 전체 보기",
        desc: "del로 삭제, items()로 순회!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["del 또는 pop으로 삭제"],
        code: `vocab = {'apple': '사과', 'banana': '바나나'}

del vocab['apple']
print(vocab)

vocab.pop('banana')
print(vocab)`,
        result: "{'banana': '바나나'}\n{}",
        note: "del과 pop 둘 다 가능! pop은 값을 반환받을 수도 있어요."
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리에서 키를 삭제하는 방법이 아닌 것은?",
        options: ["del vocab['key']", "vocab.pop('key')", "vocab.remove('key')", "vocab.clear() (전체)"],
        answer: 2,
        explanation: "remove()는 리스트의 메서드! 딕셔너리는 del 또는 pop()을 써요.",
        en: {
          question: "Which is NOT a way to delete a key from a dict?",
          options: ["del vocab['key']", "vocab.pop('key')", "vocab.remove('key')", "vocab.clear() (all)"],
          explanation: "remove() is a list method! Dicts use del or pop()."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "vocab에서 'apple'을 삭제하세요",
        guide: "del 키워드 사용",
        hint: "del vocab['apple']",
        template: "vocab = {'apple': '사과', 'banana': '바나나'}\n___ vocab['apple']\nprint(vocab)",
        answer: "del",
        expect: "{'banana': '바나나'}"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["items()로 키와 값을 동시에 순회"],
        code: `vocab = {'apple': '사과', 'banana': '바나나'}

for word, meaning in vocab.items():
    print(f'{word}: {meaning}')`,
        result: "apple: 사과\nbanana: 바나나",
        note: "items()는 (키, 값) 튜플을 차례대로 줘요. for word, meaning in 으로 한 번에 받기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 for 순회 복습!",
        task: "딕셔너리 키만 순회하세요",
        template: "vocab = {'a': 1, 'b': 2}\nfor key ___ vocab:\n    print(key)",
        answer: "in",
        expect: "a\nb",
        en: {
          message: "🔄 for loop review!",
          task: "Iterate over dict keys only"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리의 키-값 쌍을 모두 순회하려면?",
        options: ["for k in dict", "for k, v in dict", "for k, v in dict.items()", "for v in dict.values()"],
        answer: 2,
        explanation: "items()가 (키, 값) 튜플을 줘요. 그냥 for k, v in dict 는 에러나요!",
        en: {
          question: "How to iterate over all key-value pairs in a dict?",
          options: ["for k in dict", "for k, v in dict", "for k, v in dict.items()", "for v in dict.values()"],
          explanation: "items() yields (key, value) tuples! 'for k, v in dict' would error."
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `vocab = {'a': 1, 'b': 2, 'c': 3}
total = 0
for k, v in vocab.items():
    total += v
print(total)`,
        predict: {
          options: ["6", "3", "abc", "에러"],
          answer: 0,
          feedback: "값 1 + 2 + 3 = 6! items()로 (키, 값) 받아서 값만 더해요."
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["6", "3", "abc", "Error"],
            feedback: "Values 1 + 2 + 3 = 6! items() gives (key, value), summing values."
          }
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "vocab의 모든 단어와 뜻을 'word: meaning' 형식으로 출력",
        guide: "for + items()",
        hint: "for word, meaning in vocab.items():",
        template: null,
        answer: "vocab = {'apple': '사과', 'banana': '바나나'}\nfor word, meaning in vocab.items():\n    print(f'{word}: {meaning}')",
        alternateAnswers: [
          "vocab = {'apple': '사과', 'banana': '바나나'}\nfor k, v in vocab.items():\n    print(f'{k}: {v}')"
        ],
        expect: "apple: 사과\nbanana: 바나나"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "삭제 + 순회",
        learned: [
          "del dict[키] → 삭제",
          "dict.pop(키) → 값을 받으며 삭제",
          "dict.items() → (키, 값) 튜플",
          "for k, v in dict.items() 순회 패턴"
        ],
        canDo: "단어를 삭제하고 전체 단어장을 출력할 수 있어!",
        emoji: "🗑️"
      }
    },

    // ==================== CHAPTER 4: 종합 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 정리",
        desc: "단어장 종합 퀴즈!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리의 크기(키 개수)를 구하는 방법은?",
        options: ["dict.size()", "dict.length", "len(dict)", "dict.count()"],
        answer: 2,
        explanation: "len(dict)이 키 개수를 반환! 리스트/문자열과 똑같이 len()을 써요.",
        en: {
          question: "How to get the number of keys in a dict?",
          options: ["dict.size()", "dict.length", "len(dict)", "dict.count()"],
          explanation: "len(dict) returns the number of keys! Same as for lists/strings."
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `vocab = {'apple': '사과', 'banana': '바나나'}
vocab['cherry'] = '체리'
del vocab['banana']
print(len(vocab))`,
        predict: {
          options: ["1", "2", "3", "4"],
          answer: 1,
          feedback: "2개로 시작 → cherry 추가 (3) → banana 삭제 (2). len = 2!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["1", "2", "3", "4"],
            feedback: "Start with 2 → add cherry (3) → del banana (2). len = 2!"
          }
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `vocab = {'apple': '사과'}
if 'grape' in vocab:
    print(vocab['grape'])
del vocab['grape']`,
        options: [
          "if 안에선 안전한데, 마지막 del vocab['grape']는 KeyError",
          "if 문법 오류",
          "print 문법 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "if 안의 print는 'grape'가 없어서 실행 안 됨 → OK. 하지만 그 다음 del은 무조건 실행돼서 없는 키 삭제 → KeyError!",
        en: {
          question: "What's wrong with this code?",
          options: [
            "The if-block is safe, but the final del vocab['grape'] raises KeyError",
            "if syntax error",
            "print syntax error",
            "No problem"
          ],
          explanation: "The print inside if is skipped (grape not in vocab) → OK. But del runs unconditionally → KeyError!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "vocab에 'cat': '고양이' 추가 후 'cat' 검색 결과 출력",
        guide: "추가 → in 체크 → 값 출력",
        hint: "두 줄!",
        template: null,
        answer: "vocab = {}\nvocab['cat'] = '고양이'\nif 'cat' in vocab:\n    print(vocab['cat'])",
        alternateAnswers: [
          "vocab = {}\nvocab['cat'] = '고양이'\nprint(vocab.get('cat', '없음'))"
        ],
        expect: "고양이"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "vocab의 값(뜻)들만 리스트로 만들어 출력",
        guide: "dict.values()",
        hint: "list(vocab.values())로 리스트 변환!",
        template: "vocab = {'apple': '사과', 'banana': '바나나'}\nprint(list(vocab.___()))",
        answer: "values",
        expect: "['사과', '바나나']"
      }
    },
    {
      type: "reward",
      content: {
        emoji: "📖",
        message: "단어장 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "단어장 완성!",
        learned: [
          "추가/수정: dict[키] = 값",
          "검색: key in dict / dict.get(키, 기본값)",
          "삭제: del dict[키] / dict.pop(키)",
          "순회: for k, v in dict.items()",
          "크기: len(dict)"
        ],
        canDo: "딕셔너리로 추가/검색/삭제/목록 기능을 만들 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
