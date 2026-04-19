import { LessonData } from '../types';

export const lesson3: LessonData = {
    id: "3",
    title: "변수",
    description: "데이터를 저장하는 상자!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "변수가 왜 필요해?",
          desc: "한 번에 다 바꾸는 마법!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "치킨 19000원, 콜라 2000원",
            "3명이서 먹으면?"
          ],
          code: "(19000 + 2000) * 3",
          result: "63000",
          note: "OK! 근데..."
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "치킨 가격이 20000원으로 올랐어! 😱"
          ],
          code: "(20000 + 2000) * 3  # recalculate...\n(20000 + 2000) * 4  # again...",
          isError: true,
          note: "가격 하나 바뀌었는데 전부 고쳐야 해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수를 쓰면?"
          ],
          code: "chicken = 20000  # change only here!",
          result: "한 곳만 바꾸면 전부 바뀌어!",
          note: "이게 변수의 힘이야 💪"
        }
      },

      {
        type: "reward",
        content: {
          message: "변수의 힘을 배워보자!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: 변수 이름 규칙 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "변수 이름 규칙",
          desc: "이름 짓는 법부터!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수 이름 규칙 ✅"
          ],
          code: "chicken = 19000      # English OK\nchicken1 = 19000     # digit at end OK\nchicken_price = 19000 # underscore OK",
          note: "영어, 숫자(끝에), 언더바(_) 사용 가능!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "이건 안 돼요! ❌"
          ],
          code: "1chicken = 19000     # starts with digit X\nchicken-price = 19000 # hyphen X\nchicken price = 19000 # space X",
          isError: true,
          note: "숫자로 시작, 하이픈, 공백은 불가!"
        }
      },

      {
        type: "quiz",
        content: {
          question: "사용할 수 없는 변수 이름은?",
          options: [
            "chicken_price",
            "2nd_menu",
            "myChicken"
          ],
          answer: 1,
          explanation: "2nd_menu는 숫자로 시작해서 안 돼! second_menu로 바꿔야 해!",
          en: {
            question: "Which variable name is NOT allowed?",
            options: [
              "chicken_price",
              "2nd_menu",
              "myChicken"
            ],
            explanation: "2nd_menu starts with a number which is not allowed! Change it to second_menu!"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "대소문자도 구분해!"
          ],
          code: "Chicken = 19000\nchicken  # error!",
          result: "NameError!",
          isError: true,
          note: "Chicken과 chicken은 다른 변수야!"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "에러 나는 코드는?",
          code: "a. my_name = 'Alice'\nb. myName = 'Alice'\nc. my name = 'Alice'",
          options: [
            "a만 에러",
            "b만 에러",
            "c만 에러"
          ],
          answer: 2,
          explanation: "my name은 공백이 있어서 에러! my_name이나 myName으로 써야 해!",
          en: {
            question: "Which code causes an error?",
            options: [
              "Only a causes error",
              "Only b causes error",
              "Only c causes error"
            ],
            explanation: "my name has a space so it causes an error! Use my_name or myName instead!"
          }
        }
      },

      {
        type: "summary",
        content: {
          num: 2,
          title: "이름 규칙",
          learned: [
            "영어, 숫자(끝에), 언더바 OK",
            "숫자 시작, 하이픈, 공백 X",
            "대소문자 구분!"
          ],
          canDo: "올바른 변수 이름을 지을 수 있어!",
          emoji: "📝"
        }
      },

      // ==================== CHAPTER 3: 변수 기초 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "변수 기초",
          desc: "이름표 붙은 상자!"
        }
      },

      // 복습: 이름 규칙 적용
      {
        type: "interleaving",
        content: {
          message: "방금 배운 이름 규칙 적용해봐!",
          task: "user_score에 95를 저장하고 출력해봐",
          template: null,
          answer: "user_score = 95\nprint(user_score)",
          alternateAnswers: ["user_score=95\nprint(user_score)"],
          expect: "95",
          en: {
            message: "Apply the naming rules you just learned!",
            task: "Store 95 in user_score and print it"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수 = 이름표 붙은 상자"
          ],
          code: "chicken = 19000",
          result: "chicken 상자에 19000 넣기!",
          note: "= 는 '같다'가 아니라 '넣어라!'"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "상자 안에 뭐가 있는지 보려면?"
          ],
          code: "print(chicken)",
          result: "19000",
          note: "변수 이름만 쓰면 안에 든 값이 나와!"
        }
      },

      {
        type: "practice",
        content: {
          task: "chicken 변수에 19000을 저장해봐",
          template: "chicken = ___\nprint(chicken)",
          answer: "19000",
          expect: "19000",
          en: {
            task: "Store 19000 in the chicken variable"
          }
        }
      },

      {
        type: "practice",
        content: {
          task: "price가 처음엔 10000이었는데 8000으로 바뀌었어. 빈칸을 채워봐",
          template: "price = 10000\nprice = ___\nprint(price)",
          answer: "8000",
          expect: "8000",
          en: {
            task: "price was 10000 but changed to 8000. Fill in the blank"
          }
        }
      },

      {
        type: "practice",
        content: {
          task: "name 변수에 '홍길동'을 저장해봐",
          guide: "문자열은 따옴표로 감싸야 해!",
          template: "name = ___\nprint(name)",
          answer: "'홍길동'",
          alternateAnswers: ["\"홍길동\""],
          expect: "홍길동",
          en: {
            task: "Store '홍길동' in the name variable",
            guide: "Strings need to be wrapped in quotes!"
          }
        }
      },

      {
        type: "quiz",
        content: {
          question: "chicken = 19000 에서 = 의 의미는?",
          options: [
            "chicken과 19000이 같다",
            "chicken 상자에 19000을 넣어라",
            "chicken을 19000번 반복해라"
          ],
          answer: 1,
          explanation: "= 는 '같다'가 아니라 '넣어라'야! 오른쪽 값을 왼쪽 변수에 저장해!",
          en: {
            question: "What does = mean in chicken = 19000?",
            options: [
              "chicken equals 19000",
              "Store 19000 in the chicken box",
              "Repeat chicken 19000 times"
            ],
            explanation: "= means 'assign', not 'equals'! It stores the right value into the left variable!"
          }
        }
      },

      {
        type: "summary",
        content: {
          num: 3,
          title: "변수 기초",
          learned: [
            "변수 = 이름표 붙은 상자",
            "변수이름 = 값 으로 저장",
            "print(변수)로 값 확인"
          ],
          canDo: "변수를 만들고 출력할 수 있어!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 4: 변수로 계산 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "변수로 계산",
          desc: "변수끼리 더하고 빼고!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "변수 만들기 기억나?",
          task: "pizza에 18000 넣어봐",
          template: null,
          answer: "pizza = 18000",
          alternateAnswers: ["pizza=18000"],
          expect: "",
          en: {
            message: "Remember making variables?",
            task: "Store 18000 in pizza"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수끼리 계산할 수 있어!"
          ],
          code: "chicken = 19000\ncola = 2000\nprint(chicken + cola)",
          result: "21000",
          note: "변수 이름이 값으로 바뀌어서 계산돼!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "chicken + cola 출력해봐",
          guide: "변수끼리 더하기!",
          template: "chicken = 19000\ncola = 2000\nprint(___)",
          answer: "chicken + cola",
          alternateAnswers: ["chicken+cola"],
          expect: "21000",
          en: {
            task: "Print chicken + cola",
            guide: "Add variables together!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "chicken * 3 출력해봐",
          guide: "변수 × 숫자도 OK!",
          template: "chicken = 19000\nprint(___)",
          answer: "chicken * 3",
          alternateAnswers: ["chicken*3"],
          expect: "57000",
          en: {
            task: "Print chicken * 3",
            guide: "Variable × number works too!"
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "변수 계산 마스터!",
          emoji: "🧮"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "계산 결과도 변수에 저장 가능!"
          ],
          code: "total = chicken + cola\nprint(total)",
          result: "21000",
          note: "계산 결과를 total에 저장!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "변수 값을 바꿀 수도 있어!"
          ],
          code: "money = 50000\nmoney = money - 19000",
          result: "money = 31000",
          note: "money에서 19000을 빼고 다시 money에 저장!"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "money의 최종 값은?",
          code: "money = 50000\nmoney = money - 19000\nmoney = money - 2000",
          options: [
            "50000",
            "31000",
            "29000"
          ],
          answer: 2,
          explanation: "50000 → 31000 → 29000! 순서대로 계산돼!",
          en: {
            question: "What is the final value of money?",
            options: [
              "50000",
              "31000",
              "29000"
            ],
            explanation: "50000 → 31000 → 29000! Calculated in order!"
          }
        }
      },

      {
        type: "summary",
        content: {
          num: 4,
          title: "변수로 계산",
          learned: [
            "변수끼리 계산 가능",
            "결과를 변수에 저장",
            "값 업데이트: x = x + 1"
          ],
          canDo: "변수로 계산하고 저장할 수 있어!",
          emoji: "🧮"
        }
      },

      // ==================== CHAPTER 5: 텍스트와 변수 함께 출력 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "변수와 텍스트 출력",
          desc: "레이블도 같이 출력해보자!"
        }
      },

      {
        type: "explain",
        content: {
          lines: ["변수만 출력하면 뭔지 모를 때?"],
          code: "print(name)\nprint(score)",
          result: "홍길동\n95",
          note: "이게 이름인지 점수인지 모르잖아!"
        }
      },
      {
        type: "explain",
        content: {
          lines: ["쉼표(,)로 레이블을 달아줘!"],
          code: "name = '홍길동'\nscore = 95\nprint('이름:', name)\nprint('점수:', score, '점')",
          result: "이름: 홍길동\n점수: 95 점",
          note: "쉼표로 구분하면 자동으로 공백이 들어가!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "빈칸에 알맞은 변수를 넣어봐",
          template: "name = '홍길동'\nage = 15\nscore = 95\nprint('이름:', ___)\nprint('나이:', ___)\nprint('점수:', ___)",
          blanksAnswer: ["name", "age", "score"],
          answer: "name, age, score",
          expect: "이름: 홍길동\n나이: 15\n점수: 95",
          en: {
            task: "Fill in the blanks with the correct variable names"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "빈칸을 채워서 변수를 만들어봐 ↓\n이름: 홍길동\n나이: 15",
          guide: "첫 번째 칸에 홍길동(문자열), 두 번째 칸에 15(숫자)를 넣어봐!",
          template: "name = ___\nage = ___\nprint('이름:', name)\nprint('나이:', age)",
          blanksAnswer: ["'홍길동'", "15"],
          answer: "name = '홍길동'\nage = 15\nprint('이름:', name)\nprint('나이:', age)",
          expect: "이름: 홍길동\n나이: 15",
          en: {
            task: "Fill in the blanks to create variables ↓\n이름: 홍길동\n나이: 15",
            guide: "First blank: '홍길동' (string), second blank: 15 (number)!"
          }
        }
      },

      {
        type: "reward",
        content: {
          message: "쉼표 출력 마스터!",
          emoji: "🏷️"
        }
      },

      {
        type: "explain",
        content: {
          lines: ["문자열끼리 + 로 이어붙이기!"],
          code: "name = '홍길동'\nprint('안녕, ' + name + '!')",
          result: "안녕, 홍길동!",
          note: "+ 는 문자열끼리만! 숫자는 바로 못 붙여 ⚠️"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "'Hello, 홍길동!'이 나오게 빈칸을 채워봐",
          template: "name = '홍길동'\nprint('Hello, ' + ___ + '!')",
          answer: "name",
          expect: "Hello, 홍길동!",
          en: {
            task: "Fill in the blank to print 'Hello, 홍길동!'"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "'내 이름은 홍길동이야!'가 나오게 빈칸을 채워봐",
          template: "name = '홍길동'\nprint(___ + name + '이야!')",
          answer: "'내 이름은 '",
          alternateAnswers: ["\"내 이름은 \""],
          expect: "내 이름은 홍길동이야!",
          en: {
            task: "Fill in the blank to print '내 이름은 홍길동이야!'"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: ["쉼표, + 방식보다 훨씬 편한 방법이 있어!"],
          code: "name = '홍길동'\nage = 15\nprint(f'이름: {name}, 나이: {age}세')",
          result: "이름: 홍길동, 나이: 15세",
          note: "f'' 안에서 {변수}를 쓰면 값이 자동으로 들어가!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "f-string 빈칸을 채워봐",
          template: "name = '홍길동'\nscore = 95\nprint(f'플레이어: {___}, 점수: {___}점')",
          blanksAnswer: ["name", "score"],
          answer: "name, score",
          expect: "플레이어: 홍길동, 점수: 95점",
          en: {
            task: "Fill in the f-string blanks"
          }
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "이렇게 나오게 해봐 ↓\n안녕! 나는 홍길동, 15살이야!",
          guide: "f-string으로 name과 age를 같이 출력해봐",
          template: null,
          answer: "name = '홍길동'\nage = 15\nprint(f'안녕! 나는 {name}, {age}살이야!')",
          alternateAnswers: [
            "name = \"홍길동\"\nage = 15\nprint(f'안녕! 나는 {name}, {age}살이야!')"
          ],
          expect: "안녕! 나는 홍길동, 15살이야!",
          en: {
            task: "Make it print like this ↓\n안녕! 나는 홍길동, 15살이야!",
            guide: "Use an f-string to print name and age together"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: ["f-string 결과를 예측해봐!"],
          code: "game = '파이썬'\nlv = 3\nprint(f'{game} 레벨 {lv} 달성!')",
          predict: {
            options: ["파이썬 레벨 3 달성!", "{game} 레벨 {lv} 달성!", "game 레벨 lv 달성!", "에러"],
            answer: 0,
            feedback: "f-string에서 {} 안의 변수는 실제 값으로 바뀌어! game='파이썬', lv=3 이니까 '파이썬 레벨 3 달성!'이야."
          },
          en: {
            lines: ["Predict the f-string output!"],
            predict: {
              options: ["파이썬 레벨 3 달성!", "{game} 레벨 {lv} 달성!", "game 레벨 lv 달성!", "Error"],
              feedback: "Variables inside {} in f-strings get replaced with their actual values! game='파이썬', lv=3 so the answer is '파이썬 레벨 3 달성!'."
            }
          }
        }
      },

      {
        type: "summary",
        content: {
          num: 5,
          title: "변수와 텍스트 출력",
          learned: [
            "쉼표(,)로 레이블 + 변수 출력",
            "'+' 로 문자열 연결 (문자열끼리만!)",
            "f-string: f'{변수}'로 깔끔하게"
          ],
          canDo: "변수 값을 원하는 형식으로 출력할 수 있어!",
          emoji: "🖨️"
        }
      },

      // ==================== CHAPTER 6: 자주 하는 실수 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "자주 하는 실수",
          desc: "이것만 조심!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "실수 1: 만들기 전에 사용"
          ],
          code: "print(pizza)  # error!\npizza = 18000",
          result: "NameError!",
          isError: true,
          note: "변수는 먼저 만들고 사용해야 해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "실수 2: 문자열 따옴표 빼먹기"
          ],
          code: "name = Alice  # error!\nname = 'Alice'  # OK!",
          isError: true,
          note: "글자는 따옴표로 감싸야 해!"
        }
      },

      {
        type: "errorQuiz",
        content: {
          question: "에러 나는 이유는?",
          code: "print(score)\nscore = 100",
          options: [
            "print 철자가 틀려서",
            "score를 만들기 전에 사용해서",
            "100에 따옴표가 없어서"
          ],
          answer: 1,
          explanation: "score를 만들기 전에 print(score)를 했어! 순서를 바꿔야 해!",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Wrong spelling of print",
              "Using score before it's created",
              "100 is missing quotes"
            ],
            explanation: "print(score) is called before score is created! You need to swap the order!"
          }
        }
      },

      {
        type: "summary",
        content: {
          num: 6,
          title: "실수 피하기",
          learned: [
            "변수는 먼저 만들고 사용",
            "대소문자 구분 주의",
            "문자열은 따옴표 필수"
          ],
          canDo: "에러 없이 변수를 사용할 수 있어!",
          emoji: "🛡️"
        }
      },

      // ==================== CHAPTER 7: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 7,
          title: "용돈 계산기",
          desc: "변수로 용돈 관리!"
        }
      },

      {
        type: "interleaving",
        content: {
          message: "변수 계산 기억나?",
          task: "money = 50000에서 치킨값 19000을 빼봐",
          template: "money = 50000\nmoney = money - ___\nprint(money)",
          answer: "19000",
          expect: "31000",
          en: {
            message: "Remember variable calculations?",
            task: "Subtract chicken price 19000 from money = 50000"
          }
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "💰 용돈 계산기 만들기!"
          ],
          code: "=== Allowance Calculator ===\nStarting money: 50000\nAfter chicken: 31000\nAfter cola: 29000",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      {
        type: "project",
        content: {
          step: 1,
          total: 5,
          task: "제목 출력하기",
          target: "=== 용돈 계산기 ===",
          hint: "print('=== 용돈 계산기 ===')",
          done: [],
          answer: "print('=== 용돈 계산기 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 5,
          task: "처음 용돈 출력 (변수 사용!)",
          target: "처음 용돈: 50000",
          hint: "print('처음 용돈:', money)",
          done: ["=== 용돈 계산기 ==="],
          answer: "print('처음 용돈:', money)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 5,
          task: "치킨 19000원 사기 (money 업데이트)",
          target: "(변수 업데이트)",
          hint: "money = money - 19000",
          done: ["=== 용돈 계산기 ===", "처음 용돈: 50000"],
          answer: "money = money - 19000"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 5,
          task: "치킨 사고 남은 돈 출력",
          target: "치킨 사고 남은 돈: 31000",
          hint: "print('치킨 사고 남은 돈:', money)",
          done: ["=== 용돈 계산기 ===", "처음 용돈: 50000", "money = 31000"],
          answer: "print('치킨 사고 남은 돈:', money)"
        }
      },
      {
        type: "project",
        content: {
          step: 5,
          total: 5,
          task: "콜라 2000원 사고 남은 돈 출력",
          target: "콜라 사고 남은 돈: 29000",
          hint: "money = money - 2000 후 print!",
          done: ["=== 용돈 계산기 ===", "처음 용돈: 50000", "치킨 사고 남은 돈: 31000"],
          answer: "print('콜라 사고 남은 돈:', money - 2000)"
        }
      },

      // 예측 퀴즈 1: 변수 재할당
      {
        type: "explain",
        content: {
          lines: ["결과를 예측해봐!"],
          code: "x = 10\nx = 20\nprint(x)",
          predict: {
            options: ["10", "20", "10\n20", "에러"],
            answer: 1,
            feedback: "변수는 나중에 할당한 값으로 덮어써져! x = 20이 마지막이니까 20이 출력돼."
          },
          en: {
            lines: ["Predict the output!"],
            predict: {
              options: ["10", "20", "10\n20", "Error"],
              feedback: "Variables get overwritten with the latest assignment! x = 20 is last so 20 is printed."
            }
          }
        }
      },

      // 예측 퀴즈 2: 변수 스왑
      {
        type: "explain",
        content: {
          lines: ["출력 결과는?"],
          code: "a = 5\nb = 3\na, b = b, a\nprint(a)\nprint(b)",
          predict: {
            options: ["5\n3", "3\n5", "에러", "3\n3"],
            answer: 1,
            feedback: "a, b = b, a 는 a와 b를 동시에 맞바꿔! 결과: a=3, b=5."
          },
          en: {
            lines: ["What's the output?"],
            predict: {
              options: ["5\n3", "3\n5", "Error", "3\n3"],
              feedback: "a, b = b, a swaps both at the same time! Result: a=3, b=5."
            }
          }
        }
      },

      // 예측 퀴즈 3: 변수 계산 순서
      {
        type: "explain",
        content: {
          lines: ["최종 값을 예측해봐!"],
          code: "score = 0\nscore = score + 10\nscore = score + 20\nprint(score)",
          predict: {
            options: ["0", "10", "20", "30"],
            answer: 3,
            feedback: "0 → 10 → 30 순서로 업데이트! score + 10 = 10, 그다음 10 + 20 = 30."
          },
          en: {
            lines: ["Predict the final value!"],
            predict: {
              options: ["0", "10", "20", "30"],
              feedback: "Updates in order: 0 → 10 → 30! score + 10 = 10, then 10 + 20 = 30."
            }
          }
        }
      },

      // 예측 퀴즈 4: 변수 이름 대소문자
      {
        type: "explain",
        content: {
          lines: ["이 코드의 결과는?"],
          code: "Name = 'Alice'\nname = 'Bob'\nprint(Name)",
          predict: {
            options: ["Alice", "Bob", "에러", "Alice\nBob"],
            answer: 0,
            feedback: "Name과 name은 대소문자가 달라서 완전히 다른 변수야! Name을 출력하면 'Alice'가 나와."
          },
          en: {
            lines: ["What's the result of this code?"],
            predict: {
              options: ["Alice", "Bob", "Error", "Alice\nBob"],
              feedback: "Name and name are completely different variables because of capitalization! Printing Name gives 'Alice'."
            }
          }
        }
      },

      // 에러 퀴즈 1
      {
        type: "errorQuiz",
        content: {
          question: "이 코드의 문제점은?",
          code: "print(total)\ntotal = 100",
          options: [
            "total을 만들기 전에 사용해서 NameError!",
            "total에 따옴표가 없어서 에러",
            "print 문법이 틀려서 에러"
          ],
          answer: 0,
          explanation: "변수는 먼저 만들고(대입) 나중에 사용해야 해! total = 100을 print 위로 올려야 돼.",
          en: {
            question: "What's wrong with this code?",
            options: [
              "Used total before creating it — NameError!",
              "total is missing quotes",
              "print syntax error"
            ],
            explanation: "Variables must be created before they are used! Move total = 100 above the print."
          }
        }
      },

      // 에러 퀴즈 2
      {
        type: "errorQuiz",
        content: {
          question: "변수 이름 오류가 있는 코드는?",
          code: "a. user_name = 'Alice'\nb. 1st_place = '1st'\nc. myScore = 100",
          options: [
            "a만 에러",
            "b만 에러",
            "c만 에러"
          ],
          answer: 1,
          explanation: "1st_place는 숫자(1)로 시작해서 에러! first_place 또는 place_1으로 고쳐야 해.",
          en: {
            question: "Which code has an invalid variable name?",
            options: [
              "Only a has error",
              "Only b has error",
              "Only c has error"
            ],
            explanation: "1st_place starts with a digit so it causes an error! Use first_place or place_1 instead."
          }
        }
      },

      // 연습 1: 변수 스왑
      {
        type: "practice",
        content: {
          level: 2,
          task: "a = 1, b = 2 를 만들고 두 값을 바꿔서 출력해봐\n(a=2, b=1 이 되도록)",
          guide: "a, b = b, a 패턴을 써봐!",
          template: null,
          answer: "a = 1\nb = 2\na, b = b, a\nprint(a)\nprint(b)",
          alternateAnswers: ["a = 1\nb = 2\ntemp = a\na = b\nb = temp\nprint(a)\nprint(b)"],
          expect: "2\n1",
          en: {
            task: "Create a = 1, b = 2 then swap them and print\n(so a=2, b=1)",
            guide: "Use the a, b = b, a pattern!"
          }
        }
      },

      // 연습 2: 누적 계산
      {
        type: "practice",
        content: {
          level: 2,
          task: "이렇게 나오게 해봐 ↓\n100\n150\n200",
          guide: "money = 100 으로 시작해서 50씩 늘려가며 출력!",
          template: null,
          answer: "money = 100\nprint(money)\nmoney = money + 50\nprint(money)\nmoney = money + 50\nprint(money)",
          alternateAnswers: [
            "money = 100\nprint(money)\nmoney += 50\nprint(money)\nmoney += 50\nprint(money)"
          ],
          expect: "100\n150\n200",
          en: {
            task: "Make it print like this ↓\n100\n150\n200",
            guide: "Start with money = 100 and increase by 50 each time, printing each value!"
          }
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 7,
          title: "변수 마스터",
          learned: [
            "변수 = 이름표 붙은 상자",
            "= 는 '넣어라!'",
            "변수로 계산하고 업데이트",
            "이름 규칙 지키기"
          ],
          canDo: "변수로 데이터를 저장하고 관리할 수 있어!",
          emoji: "🏆"
        }
      },

      {
        type: "done",
        content: {}
      }
    ]
  };
