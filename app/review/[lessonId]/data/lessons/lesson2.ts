import { LessonData } from '../types';

export const lesson2: LessonData = {
    id: "2",
    title: "데이터 타입",
    description: "숫자와 글자는 다르다!",
    steps: [

      // ==================== CHAPTER 1: 타입 구분 ====================
      {
        type: "chapter",
        content: { num: 1, title: "타입 구분", desc: "int? float? str? bool?" }
      },

      {
        type: "quiz",
        content: {
          question: "3.14의 타입은?",
          options: ["int", "float", "str", "bool"],
          answer: 1,
          explanation: "소수점이 있으면 float! 3은 int지만 3.14는 float야.",
          en: {
            question: "What type is 3.14?",
            options: ["int", "float", "str", "bool"],
            explanation: "Decimal point → float! 3 is int but 3.14 is float."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "다음 중 int(정수)인 것은?",
          options: ["3.14", "'15'", "True", "-5"],
          answer: 3,
          explanation: "-5는 소수점도 없고 따옴표도 없으니까 int야! 3.14는 float, '15'는 str, True는 bool.",
          en: {
            question: "Which one is an int?",
            options: ["3.14", "'15'", "True", "-5"],
            explanation: "-5 has no decimal and no quotes so it's int! 3.14 is float, '15' is str, True is bool."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "'100'의 타입은?",
          options: ["int", "float", "str", "bool"],
          answer: 2,
          explanation: "따옴표가 있으면 무조건 str! 숫자처럼 보여도 '100'은 문자열이야.",
          en: {
            question: "What type is '100'?",
            options: ["int", "float", "str", "bool"],
            explanation: "Quotes always make it str! Even if it looks like a number, '100' is a string."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "다음 중 str(문자열)이 아닌 것은?",
          options: ["'안녕'", "'3.14'", "100", "'True'"],
          answer: 2,
          explanation: "100은 따옴표가 없으니까 int야! 나머지는 전부 따옴표가 있어서 str이야.",
          en: {
            question: "Which one is NOT a string (str)?",
            options: ["'안녕'", "'3.14'", "100", "'True'"],
            explanation: "100 has no quotes so it's int! The rest all have quotes, so they're all str."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "15와 15.0 중 float는?",
          options: ["15", "15.0", "둘 다 float", "둘 다 int"],
          answer: 1,
          explanation: "15는 int, 15.0은 float야! 값은 같아 보여도 .0이 붙으면 float!",
          en: {
            question: "Which is float: 15 or 15.0?",
            options: ["15", "15.0", "Both float", "Both int"],
            explanation: "15 is int, 15.0 is float! They look the same but .0 makes it a float!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "다음 중 bool(불리언)인 것은?",
          options: ["'True'", "1", "true", "True"],
          answer: 3,
          explanation: "True(대문자 T)만 bool이야! 'True'는 str, 1은 int, true는 에러야.",
          en: {
            question: "Which one is a bool?",
            options: ["'True'", "1", "true", "True"],
            explanation: "Only True (capital T) is bool! 'True' is str, 1 is int, true causes an error."
          }
        }
      },

      {
        type: "reward",
        content: { message: "타입 구분 완벽해!", emoji: "🎯" }
      },

      // ==================== CHAPTER 2: 따옴표의 힘 ====================
      {
        type: "chapter",
        content: { num: 2, title: "따옴표의 힘", desc: "따옴표 하나로 완전히 달라진다!" }
      },

      {
        type: "explain",
        content: {
          lines: ["핵심 remind 💡"],
          code: "'100' → str (글자)\n 100  → int (숫자)",
          note: "따옴표 유무가 타입을 결정해!",
          en: {
            lines: ["Key reminder 💡"],
            note: "The presence of quotes determines the type!"
          }
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "'10' + '20' + '30' 결과는?",
          code: "print('10' + '20' + '30')",
          options: ["60", "102030", "에러"],
          answer: 1,
          explanation: "따옴표 있으면 글자야! 글자끼리 + 는 이어붙이기 → 102030",
          en: {
            question: "What is the result of '10' + '20' + '30'?",
            options: ["60", "102030", "Error"],
            explanation: "With quotes they're strings! String + = concatenation → 102030"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: ["결과를 예측해봐!"],
          code: "print('3' + '3')\nprint(3 + 3)",
          predict: {
            question: "print('3' + '3') 의 결과는?",
            options: ["6", "33", "'33'", "에러"],
            answer: 1,
            feedback: "'3'은 str이라 + 가 이어붙이기야! '3' + '3' = 33이 출력돼. (print는 따옴표 안 보여줘)"
          },
          en: {
            lines: ["Predict the result!"],
            predict: {
              question: "What is the result of print('3' + '3')?",
              options: ["6", "33", "'33'", "Error"],
              feedback: "'3' is str so + means concatenation! '3' + '3' prints 33. (print doesn't show quotes)"
            }
          }
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "'19000' + 1000 하면?",
          code: "print('19000' + 1000)",
          options: ["20000", "'190001000'", "에러! (글자 + 숫자 안 됨)"],
          answer: 2,
          explanation: "타입이 다르면 더할 수 없어! str + int = TypeError! 같은 타입끼리만 가능해.",
          en: {
            question: "What happens with '19000' + 1000?",
            options: ["20000", "'190001000'", "Error! (str + int not allowed)"],
            explanation: "Different types can't be added! str + int = TypeError! Only same types work."
          }
        }
      },

      {
        type: "reward",
        content: { message: "따옴표의 힘 이해 완료!", emoji: "💪" }
      },

      // ==================== CHAPTER 3: True와 False ====================
      {
        type: "chapter",
        content: { num: 3, title: "True와 False", desc: "bool 타입 마스터하기!" }
      },

      {
        type: "errorQuiz",
        content: {
          question: "에러가 나는 것은?",
          code: "a. True\nb. false\nc. False",
          options: ["a만 에러", "b만 에러", "c만 에러"],
          answer: 1,
          explanation: "false는 에러! bool은 반드시 대문자로 시작 → True, False",
          en: {
            question: "Which one causes an error?",
            options: ["Only a", "Only b", "Only c"],
            explanation: "false causes an error! Booleans must start with capital → True, False"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "10 > 5를 출력해봐 (결과: True)",
          template: { before: "print(", after: ")" },
          answer: "10 > 5",
          alternateAnswers: ["10>5"],
          expect: "True",
          en: { task: "Print 10 > 5 (result: True)" }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "3 > 7을 출력해봐 (결과: False)",
          template: { before: "print(", after: ")" },
          answer: "3 > 7",
          alternateAnswers: ["3>7"],
          expect: "False",
          en: { task: "Print 3 > 7 (result: False)" }
        }
      },

      {
        type: "quiz",
        content: {
          question: "print(10 == 10) 의 결과는?",
          options: ["True", "False", "10", "에러"],
          answer: 0,
          explanation: "10 == 10은 '10이 10과 같은가?' → 참이니까 True!",
          en: {
            question: "What is the result of print(10 == 10)?",
            options: ["True", "False", "10", "Error"],
            explanation: "10 == 10 means 'is 10 equal to 10?' → True!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "type(False)는?",
          options: ["<class 'str'>", "<class 'int'>", "<class 'bool'>", "에러"],
          answer: 2,
          explanation: "True와 False는 bool 타입이야!",
          en: {
            question: "What is type(False)?",
            options: ["<class 'str'>", "<class 'int'>", "<class 'bool'>", "Error"],
            explanation: "True and False are both bool type!"
          }
        }
      },

      {
        type: "reward",
        content: { message: "bool 마스터!", emoji: "✅" }
      },

      // ==================== CHAPTER 4: type() 확인 ====================
      {
        type: "chapter",
        content: { num: 4, title: "type() 확인", desc: "타입 탐정이 되어보자!" }
      },

      {
        type: "explain",
        content: {
          lines: ["type() 사용법"],
          code: "print(type(값))  →  <class '타입명'>",
          note: "어떤 값의 타입이든 확인할 수 있어!",
          en: {
            lines: ["Using type()"],
            note: "You can check the type of any value!"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "3.14의 타입을 출력해봐",
          template: { before: "print(type(", after: "))" },
          answer: "3.14",
          expect: "<class 'float'>",
          en: { task: "Print the type of 3.14" }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "'파이썬'의 타입을 출력해봐",
          template: { before: "print(type(", after: "))" },
          answer: "'파이썬'",
          alternateAnswers: ["\"파이썬\"", "'Python'", "\"Python\""],
          expect: "<class 'str'>",
          en: { task: "Print the type of 'Python'" }
        }
      },

      {
        type: "quiz",
        content: {
          question: "type('100')과 type(100) — 같을까?",
          options: ["같다 (둘 다 int)", "같다 (둘 다 str)", "다르다 (str vs int)", "에러"],
          answer: 2,
          explanation: "'100'은 str, 100은 int야! 따옴표 유무로 타입이 달라져.",
          en: {
            question: "Are type('100') and type(100) the same?",
            options: ["Same (both int)", "Same (both str)", "Different (str vs int)", "Error"],
            explanation: "'100' is str, 100 is int! Quotes change the type."
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: ["결과를 예측해봐!"],
          code: "x = 3.14\nprint(type(x))",
          predict: {
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
            answer: 1,
            feedback: "3.14를 x에 저장했어. x의 타입은 3.14의 타입인 float야!"
          },
          en: {
            lines: ["Predict the result!"],
            predict: {
              options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
              feedback: "3.14 is stored in x. The type of x is the same as 3.14, which is float!"
            }
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "7과 7.0의 타입을 각각 출력해봐",
          guide: "첫 번째 칸에 7, 두 번째 칸에 7.0 을 넣어봐!",
          template: "print(type(___))\nprint(type(___))",
          blanksAnswer: ["7", "7.0"],
          answer: "print(type(7))\nprint(type(7.0))",
          expect: "<class 'int'>\n<class 'float'>",
          en: {
            task: "Print the types of 7 and 7.0",
            guide: "First blank: 7  /  Second blank: 7.0"
          }
        }
      },

      {
        type: "reward",
        content: { message: "타입 탐정 완성!", emoji: "🔍" }
      },

      // ==================== CHAPTER 5: 이건 에러야! ====================
      {
        type: "chapter",
        content: { num: 5, title: "이건 에러야!", desc: "헷갈리는 케이스 완전 정복!", en: { title: "Watch Out for Errors!", desc: "Master the tricky cases!" } }
      },

      {
        type: "quiz",
        content: {
          question: "전화번호 010-1234-5678을 저장하려면?",
          options: [
            "phone = 010-1234-5678",
            "phone = '010-1234-5678'",
            "phone = 010.1234.5678"
          ],
          answer: 1,
          explanation: "하이픈(-)은 파이썬에서 빼기야! 010-1234-5678은 010 빼기 1234 빼기 5678로 읽혀서 에러가 나. 따옴표로 감싸야 문자열로 저장돼!",
          en: {
            question: "How do you store the phone number 555-867-5309?",
            options: [
              "phone = 555-867-5309",
              "phone = '555-867-5309'",
              "phone = 555.867.5309"
            ],
            explanation: "Hyphens (-) mean subtraction in Python! 555-867-5309 would be read as math and cause an error. Wrap it in quotes to store as a string!"
          }
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "에러가 나는 코드는?",
          code: "a. date = '2024-01-01'\nb. phone = 010-1234-5678\nc. code = 'ABC-001'",
          options: ["a만 에러", "b만 에러", "c만 에러"],
          answer: 1,
          explanation: "b만 에러! 010-1234-5678은 파이썬이 빼기로 읽어. a와 c는 따옴표로 감쌌으니까 str로 잘 저장돼.",
          en: {
            question: "Which code causes an error?",
            options: ["Only a", "Only b", "Only c"],
            explanation: "Only b causes an error! Python reads 010-1234-5678 as subtraction. a and c are wrapped in quotes so they're stored as str."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "'3.2'의 타입은?",
          options: ["float (실수)", "int (정수)", "str (문자열)"],
          answer: 2,
          explanation: "따옴표가 있으면 숫자처럼 보여도 str이야! 3.2는 float이지만 '3.2'는 str이야.",
          en: {
            question: "What is the type of '3.2'?",
            options: ["float", "int", "str (string)"],
            explanation: "Quotes make it a str even if it looks like a number! 3.2 is float but '3.2' is str."
          }
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "print('점수: ' + 95) 의 결과는?",
          code: "print('점수: ' + 95)",
          options: ["점수: 95", "점수95", "TypeError (에러!)"],
          answer: 2,
          explanation: "str + int는 TypeError! 문자열과 숫자는 다른 타입이라 더할 수 없어. 나중에 f-string을 배우면 f'점수: {95}' 이렇게 쓸 수 있어!",
          en: {
            question: "What is the result of print('Score: ' + 95)?",
            options: ["Score: 95", "Score95", "TypeError (Error!)"],
            explanation: "str + int causes a TypeError! Different types can't be combined. You'll soon learn f-strings: f'Score: {95}'!"
          }
        }
      },

      {
        type: "reward",
        content: { message: "에러 패턴 완전 정복!", emoji: "🛡️" }
      },

      // ==================== CHAPTER 6: 내 정보 카드 ====================
      {
        type: "chapter",
        content: { num: 5, title: "내 정보 카드", desc: "4가지 타입으로 만들어보자!" }
      },

      {
        type: "project",
        content: {
          step: 1,
          total: 5,
          task: "제목 만들기",
          target: "=== 내 정보 ===",
          hint: "print('=== 내 정보 ===')",
          done: [],
          answer: "print('=== 내 정보 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 5,
          task: "이름 출력 (str)",
          target: "이름: 홍길동",
          hint: "print('이름:', '홍길동')",
          done: ["=== 내 정보 ==="],
          answer: "print('이름:', '홍길동')"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 5,
          task: "나이 출력 (int)",
          target: "나이: 15",
          hint: "print('나이:', 15)",
          done: ["=== 내 정보 ===", "이름: 홍길동"],
          answer: "print('나이:', 15)"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 5,
          task: "키 출력 (float)",
          target: "키: 165.5",
          hint: "print('키:', 165.5)",
          done: ["=== 내 정보 ===", "이름: 홍길동", "나이: 15"],
          answer: "print('키:', 165.5)"
        }
      },
      {
        type: "project",
        content: {
          step: 5,
          total: 5,
          task: "학생 여부 출력 (bool)",
          target: "학생: True",
          hint: "print('학생:', True)",
          done: ["=== 내 정보 ===", "이름: 홍길동", "나이: 15", "키: 165.5"],
          answer: "print('학생:', True)"
        }
      },

      {
        type: "summary",
        content: {
          num: 6,
          title: "데이터 타입 마스터",
          learned: [
            "int: 정수 (-5, 0, 100)",
            "float: 실수 (3.14, 15.0)",
            "str: 문자열 ('글자', '100')",
            "bool: True / False"
          ],
          canDo: "타입을 구분하고 type()으로 확인할 수 있어!",
          emoji: "🏆"
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
  };
