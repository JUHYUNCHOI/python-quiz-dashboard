import { LessonData } from '../types';

export const lesson2: LessonData = {
    id: "2",
    title: "데이터 타입",
    description: "숫자와 글자는 다르다!",
    steps: [
      // ==================== CHAPTER 1: 문제 상황 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "이상한 계산",
          desc: "왜 150이 아니라 10050이야?!"
        }
      },

      // 동기 부여 - 문제 상황
      {
        type: "explain",
        content: {
          lines: [
            "게임 만들다가 생긴 일... 🎮",
            "점수 100 + 보너스 50 = ?"
          ],
          code: "'100' + '50'",
          result: "'10050'",
          isError: true,
          note: "150이 아니라 10050?!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "왜 이런 일이?",
            "오늘 데이터 타입을 배우면 알 수 있어!"
          ],
          code: "numbers vs strings = completely different!",
          isPreview: true
        }
      },

      // ==================== CHAPTER 2: 숫자 vs 글자 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "숫자 vs 글자",
          desc: "따옴표 하나로 완전 달라져!"
        }
      },

      // Lesson 1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 지난 시간 기억나?",
          task: "Hello 출력해봐",
          template: null,
          answer: "print('Hello')",
          expect: "Hello",
          en: {
            message: "Wait! Do you remember last time?",
            task: "Print Hello"
          }
        }
      },

      // 핵심 설명
      {
        type: "explain",
        content: {
          lines: [
            "따옴표 있으면 글자!",
            "따옴표 없으면 숫자!"
          ],
          code: "'100' → string (cannot calculate)\n 100  → number (can calculate)",
          note: "이게 가장 중요해!"
        }
      },

      // 직접 비교
      {
        type: "explain",
        content: {
          lines: [
            "직접 비교해보자"
          ],
          code: "100 + 50",
          result: "150",
          note: "숫자끼리 + = 계산!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "따옴표 붙이면?"
          ],
          code: "'100' + '50'",
          result: "'10050'",
          note: "글자끼리 + = 이어붙이기!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "'10' + '20' + '30' 결과는?",
          code: "print('10' + '20' + '30')",
          options: [
            "60",
            "102030",
            "에러"
          ],
          answer: 1,
          explanation: "따옴표 있으면 글자! 글자끼리 +하면 이어붙어서 102030이 출력돼. (print는 따옴표를 안 보여줘!)",
          en: {
            question: "What is the result of '10' + '20' + '30'?",
            options: [
              "60",
              "102030",
              "Error"
            ],
            explanation: "With quotes they're strings! Adding strings concatenates them, so 102030 is printed. (print doesn't show the quotes!)"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "좋아! 이제 타입 4가지를 배워보자",
          emoji: "🎯"
        }
      },

      // ==================== CHAPTER 3: 4가지 타입 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "4가지 타입",
          desc: "정수, 실수, 문자열, 불리언"
        }
      },

      // 비유
      {
        type: "explain",
        content: {
          lines: [
            "방 정리할 때 어떻게 해?",
            "장난감은 장난감 상자에!"
          ],
          code: "toys → toy box\nbooks → bookshelf\nclothes → closet",
          isPreview: true,
          note: "컴퓨터도 데이터를 종류별로 구분해!"
        }
      },

      // 1. 정수 (int)
      {
        type: "explain",
        content: {
          lines: [
            "① 정수 (int)",
            "소수점 없는 숫자"
          ],
          code: "15, 19000, -5, 0",
          result: "나이, 가격, 점수...",
          note: "int = integer = 정수"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "나이 15를 출력해봐",
          guide: "숫자는 따옴표 없이!",
          template: { before: "print(", after: ")" },
          answer: "15",
          expect: "15",
          en: {
            task: "Print the age 15",
            guide: "Numbers don't need quotes!"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "치킨 가격 19000을 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "19000",
          expect: "19000",
          en: {
            task: "Print the chicken price 19000"
          }
        }
      },

      // 2. 실수 (float)
      {
        type: "explain",
        content: {
          lines: [
            "② 실수 (float)",
            "소수점 있는 숫자"
          ],
          code: "3.14, 165.5, 0.5",
          result: "키, 몸무게, 원주율...",
          note: "float = 떠다니는 소수점"
        }
      },

      {
        type: "quiz",
        content: {
          question: "165.5는 어떤 타입일까?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "bool"],
          answer: 1,
          explanation: "소수점이 있으면 float! 165.5, 3.14, 0.1 모두 float야.",
          en: {
            question: "What type is 165.5?",
            options: ["int (integer)", "float", "str (string)", "bool"],
            explanation: "Numbers with a decimal point are floats! 165.5, 3.14, 0.1 are all floats."
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "'3'은 어떤 타입일까?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "bool"],
          answer: 2,
          explanation: "따옴표가 있으면 무조건 str(문자열)이야! 숫자처럼 보여도 '3'은 글자야.",
          en: {
            question: "What type is '3'?",
            options: ["int (integer)", "float", "str (string)", "bool"],
            explanation: "Anything in quotes is a str! Even though it looks like a number, '3' is text."
          }
        }
      },

      // int vs float
      {
        type: "quiz",
        content: {
          question: "15와 15.0은 같을까?",
          options: [
            "완전히 같다",
            "값은 같지만 타입이 다르다",
            "완전히 다르다"
          ],
          answer: 1,
          explanation: "15는 정수(int), 15.0은 실수(float)! 값은 같지만 타입이 달라!",
          en: {
            question: "Are 15 and 15.0 the same?",
            options: [
              "Completely the same",
              "Same value but different types",
              "Completely different"
            ],
            explanation: "15 is int, 15.0 is float! Same value but different types!"
          }
        }
      },

      // 3. 문자열 (str)
      {
        type: "explain",
        content: {
          lines: [
            "③ 문자열 (str)",
            "글자들의 모음"
          ],
          code: "'IU', 'chicken', '123'",
          result: "따옴표로 감싸면 전부 글자!",
          note: "str = string = 실"
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "문자열 출력 기억나지?",
          task: "파이썬 출력해봐",
          template: null,
          answer: "print('파이썬')",
          expect: "파이썬",
          en: {
            message: "Remember how to print strings?",
            task: "Print 파이썬"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "내 이름을 출력해봐 (아무 이름 OK)",
          guide: "글자는 따옴표로!",
          template: { before: "print(", after: ")" },
          answer: "'이름'",
          alternateAnswers: ["\"이름\"", "'홍길동'", "\"홍길동\""],
          expect: "이름",
          en: {
            task: "Print your name (any name is OK)",
            guide: "Strings need quotes!"
          }
        }
      },

      // 숫자 vs 문자열 숫자
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ 중요!",
            "'19000'과 19000은 다르다!"
          ],
          code: "'19000' → string (text)\n 19000  → integer (number)",
          note: "따옴표만 있어도 글자가 돼!"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "'19000' + 1000 하면?",
          code: "print('19000' + 1000)",
          options: [
            "20000",
            "'190001000'",
            "에러! (글자 + 숫자는 안 됨)"
          ],
          answer: 2,
          explanation: "글자랑 숫자는 직접 더할 수 없어! 둘 다 같은 타입이어야 해!",
          en: {
            question: "What happens with '19000' + 1000?",
            options: [
              "20000",
              "'190001000'",
              "Error! (string + number not allowed)"
            ],
            explanation: "You can't add strings and numbers directly! Both need to be the same type!"
          }
        }
      },

      // 4. 불리언 (bool)
      {
        type: "explain",
        content: {
          lines: [
            "④ 불리언 (bool)",
            "참(True) 또는 거짓(False)"
          ],
          code: "True, False",
          result: "딱 두 가지만!",
          note: "대문자로 시작해야 해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "비교하면 불리언이 나와!"
          ],
          code: "100 > 50",
          result: "True",
          note: "100이 50보다 큰가? → 참!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "반대로 하면?"
          ],
          code: "3 > 7",
          result: "False",
          note: "3이 7보다 큰가? → 거짓!"
        }
      },

      // 불리언 연습
      {
        type: "practice",
        content: {
          level: 1,
          task: "True를 출력해봐",
          guide: "대문자 T로 시작!",
          template: { before: "print(", after: ")" },
          answer: "True",
          expect: "True",
          en: {
            task: "Print True",
            guide: "Starts with capital T!"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "10 > 5 를 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "10 > 5",
          alternateAnswers: ["10>5"],
          expect: "True",
          en: {
            task: "Print 10 > 5"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "1 > 100 을 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "1 > 100",
          alternateAnswers: ["1>100"],
          expect: "False",
          en: {
            task: "Print 1 > 100"
          }
        }
      },

      // 에러 퀴즈 - true vs True
      {
        type: "errorQuiz",
        content: {
          question: "에러 나는 건?",
          code: "a. True\nb. true\nc. False",
          options: [
            "a만 에러",
            "b만 에러",
            "c만 에러"
          ],
          answer: 1,
          explanation: "true는 에러! 대문자 T로 True라고 써야 해!",
          en: {
            question: "Which one causes an error?",
            options: [
              "Only a is error",
              "Only b is error",
              "Only c is error"
            ],
            explanation: "true causes an error! You must write True with capital T!"
          }
        }
      },

      // 4가지 타입 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "4가지 타입",
          learned: [
            "int: 정수 (15, 19000)",
            "float: 실수 (3.14, 165.5)",
            "str: 문자열 ('글자')",
            "bool: 불리언 (True, False)"
          ],
          canDo: "데이터 타입 4가지를 구분할 수 있어!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 4: type() 함수 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "type() 함수",
          desc: "타입을 확인하는 방법!"
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "100 출력 기억나?",
          task: "숫자 100을 출력해봐",
          template: null,
          answer: "print(100)",
          expect: "100",
          en: {
            message: "Remember printing 100?",
            task: "Print the number 100"
          }
        }
      },

      // type() 소개
      {
        type: "explain",
        content: {
          lines: [
            "type() = 타입 확인!",
            "뭔 타입인지 모르겠으면 물어봐"
          ],
          code: "type(15)",
          result: "<class 'int'>",
          note: "15는 int(정수)야!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "다른 것도 확인해보자"
          ],
          code: "type(3.14)",
          result: "<class 'float'>",
          note: "3.14는 float(실수)야!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "문자열은?"
          ],
          code: "type('IU')",
          result: "<class 'str'>",
          note: "'아이유'는 str(문자열)이야!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "불리언은?"
          ],
          code: "type(True)",
          result: "<class 'bool'>",
          note: "True는 bool(불리언)이야!"
        }
      },

      // type() 퀴즈
      {
        type: "quiz",
        content: {
          question: "type('100')의 결과는?",
          options: [
            "<class 'int'>",
            "<class 'str'>",
            "<class 'float'>"
          ],
          answer: 1,
          explanation: "'100'은 따옴표가 있으니까 문자열(str)이야!",
          en: {
            question: "What is the result of type('100')?",
            options: [
              "<class 'int'>",
              "<class 'str'>",
              "<class 'float'>"
            ],
            explanation: "'100' has quotes so it's a string (str)!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "type(100)의 결과는?",
          options: [
            "<class 'int'>",
            "<class 'str'>",
            "<class 'float'>"
          ],
          answer: 0,
          explanation: "100은 따옴표가 없으니까 정수(int)야!",
          en: {
            question: "What is the result of type(100)?",
            options: [
              "<class 'int'>",
              "<class 'str'>",
              "<class 'float'>"
            ],
            explanation: "100 has no quotes so it's an integer (int)!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "잘했어! 이제 자주 하는 실수를 알아보자",
          emoji: "💪"
        }
      },

      // ==================== CHAPTER 5: 자주 하는 실수 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "자주 하는 실수",
          desc: "이것만 조심하면 OK!"
        }
      },

      // 실수 1: 따옴표
      {
        type: "explain",
        content: {
          lines: [
            "실수 1: 따옴표 빼먹기"
          ],
          code: "IU",
          result: "❌ NameError!",
          isError: true,
          note: "글자는 반드시 따옴표! '아이유'"
        }
      },

      // 실수 2: true vs True
      {
        type: "explain",
        content: {
          lines: [
            "실수 2: 소문자 true"
          ],
          code: "true",
          result: "❌ NameError!",
          isError: true,
          note: "대문자로! True, False"
        }
      },

      // 실수 3: 숫자 문자열
      {
        type: "explain",
        content: {
          lines: [
            "실수 3: '숫자'로 계산하기"
          ],
          code: "'100' + '50'",
          result: "'10050' (계산 아님!)",
          isError: true,
          note: "계산하려면 따옴표 빼! 100 + 50"
        }
      },

      // 에러 찾기 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "에러 나는 코드는?",
          code: "a. print('Hello')\nb. print(IU)\nc. print(True)",
          options: [
            "a만 에러",
            "b만 에러",
            "c만 에러"
          ],
          answer: 1,
          explanation: "아이유에 따옴표가 없어서 에러! print('아이유')로 해야 해!",
          en: {
            question: "Which code causes an error?",
            options: [
              "Only a causes error",
              "Only b causes error",
              "Only c causes error"
            ],
            explanation: "아이유 has no quotes so it causes an error! It should be print('아이유')!"
          }
        }
      },

      // 자주 하는 실수 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "자주 하는 실수",
          learned: [
            "글자는 반드시 따옴표!",
            "True/False는 대문자!",
            "'숫자'는 계산 안 됨!"
          ],
          canDo: "에러 없이 코드를 쓸 수 있어!",
          emoji: "🛡️"
        }
      },

      // ==================== CHAPTER 6: 미니 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "내 정보 카드",
          desc: "배운 걸 활용해서 만들어보자!"
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "여러 개 출력 기억나?",
          task: "이름: 홍길동 출력해봐",
          template: null,
          answer: "print('이름:', '홍길동')",
          alternateAnswers: ["print('이름: 홍길동')", "print(\"이름:\", \"홍길동\")"],
          expect: "이름: 홍길동",
          en: {
            message: "Remember printing multiple values?",
            task: "Print: 이름: 홍길동"
          }
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📇 내 정보 카드 만들기!"
          ],
          code: "=== My Info ===\nName: Alice\nAge: 15\nHeight: 165.5\nStudent: True",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
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
          task: "이름 (문자열)",
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
          task: "나이 (정수)",
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
          task: "키 (실수)",
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
          task: "학생 (불리언)",
          target: "학생: True",
          hint: "print('학생:', True)",
          done: ["=== 내 정보 ===", "이름: 홍길동", "나이: 15", "키: 165.5"],
          answer: "print('학생:', True)"
        }
      },

      // 예측 퀴즈 1: type() 결과
      {
        type: "explain",
        content: {
          lines: ["결과를 예측해봐!"],
          code: "x = 3.14\nprint(type(x))",
          predict: {
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
            answer: 1,
            feedback: "3.14는 소수점이 있으니까 실수(float)야! type(3.14)는 <class 'float'>을 출력해."
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
              feedback: "3.14 has a decimal point so it's a float! type(3.14) prints <class 'float'>."
            }
          }
        }
      },

      // 예측 퀴즈 2: 불리언 표현식 결과
      {
        type: "explain",
        content: {
          lines: ["이 코드의 출력은?"],
          code: "a = 10\nb = 3\nprint(a > b)\nprint(type(a > b))",
          predict: {
            options: ["True\n<class 'int'>", "True\n<class 'bool'>", "False\n<class 'bool'>", "에러"],
            answer: 1,
            feedback: "10 > 3은 True(참)이고, 비교식의 결과는 항상 bool 타입이야!"
          },
          en: {
            lines: ["What does this code output?"],
            predict: {
              options: ["True\n<class 'int'>", "True\n<class 'bool'>", "False\n<class 'bool'>", "Error"],
              feedback: "10 > 3 is True, and the result of a comparison is always bool type!"
            }
          }
        }
      },

      // 연습 1: int와 float 차이 확인
      {
        type: "practice",
        content: {
          level: 2,
          task: "type(7)과 type(7.0)을 각각 출력해봐",
          guide: "정수와 실수 타입이 다르다는 것을 확인!",
          template: null,
          answer: "print(type(7))\nprint(type(7.0))",
          expect: "<class 'int'>\n<class 'float'>",
          en: {
            task: "Print type(7) and type(7.0) separately",
            guide: "Confirm that int and float are different types!"
          }
        }
      },

      // 연습 2: 불리언 타입 확인
      {
        type: "practice",
        content: {
          level: 2,
          task: "이렇게 나오게 해봐 ↓\n<class 'bool'>\n<class 'bool'>",
          guide: "True와 False 각각의 타입을 출력해봐",
          template: null,
          answer: "print(type(True))\nprint(type(False))",
          expect: "<class 'bool'>\n<class 'bool'>",
          en: {
            task: "Make it print like this ↓\n<class 'bool'>\n<class 'bool'>",
            guide: "Print the type of True and False separately"
          }
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "데이터 타입 마스터",
          learned: [
            "int: 정수 (따옴표 X)",
            "float: 실수 (소수점)",
            "str: 문자열 (따옴표 O)",
            "bool: True/False"
          ],
          canDo: "데이터 타입을 구분하고 올바르게 사용할 수 있어!",
          emoji: "🏆"
        }
      },

      // 완료
      {
        type: "done",
        content: {}
      }
    ]
  };
