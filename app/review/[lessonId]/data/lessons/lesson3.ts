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

      // 문제 상황
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

      // 보상
      {
        type: "reward",
        content: {
          message: "변수의 힘을 배워보자!",
          emoji: "📦"
        }
      },

      // ==================== CHAPTER 2: 변수 기초 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "변수 기초",
          desc: "이름표 붙은 상자!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 지난 시간 복습",
          task: "100을 출력해봐",
          template: null,
          answer: "print(100)",
          expect: "100",
          en: {
            message: "Wait! Let's review last time",
            task: "Print 100"
          }
        }
      },

      // 변수 개념
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

      // ===== 변수 만들고 출력하기 =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n19000",
          guide: "변수에 숫자를 저장하고 print로 출력!",
          template: null,
          answer: "chicken = 19000\nprint(chicken)",
          expect: "19000",
          en: {
            task: "Make it print like this ↓\n19000",
            guide: "Store a number in a variable and print it!"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n2000",
          guide: "변수에 숫자를 저장하고 print로 출력!",
          template: null,
          answer: "cola = 2000\nprint(cola)",
          expect: "2000",
          en: {
            task: "Make it print like this ↓\n2000",
            guide: "Store a number in a variable and print it!"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n홍길동",
          guide: "문자열 변수를 만들고 출력해! 문자열은 따옴표로 감싸야 해",
          template: null,
          answer: "name = '홍길동'\nprint(name)",
          alternateAnswers: ["name = \"홍길동\"\nprint(name)"],
          expect: "홍길동",
          en: {
            task: "Make it print like this ↓\n홍길동",
            guide: "Create a string variable and print it! Strings need quotes!"
          }
        }
      },

      // 퀴즈
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

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
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

      // ==================== CHAPTER 3: 변수로 계산 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "변수로 계산",
          desc: "변수끼리 더하고 빼고!"
        }
      },

      // 복습
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

      // 변수 계산
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

      // ===== Lv.1: 계산 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "chicken + cola 출력해봐",
          guide: "변수끼리 더하기!",
          template: { before: "print(", after: ")" },
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
          task: "chicken - cola 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "chicken - cola",
          alternateAnswers: ["chicken-cola"],
          expect: "17000",
          en: {
            task: "Print chicken - cola"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "chicken * 3 출력해봐",
          guide: "변수 × 숫자도 OK!",
          template: { before: "print(", after: ")" },
          answer: "chicken * 3",
          alternateAnswers: ["chicken*3"],
          expect: "57000",
          en: {
            task: "Print chicken * 3",
            guide: "Variable × number works too!"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "변수 계산 마스터!",
          emoji: "🧮"
        }
      },

      // 결과를 변수에 저장
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

      // 값 업데이트
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

      // 에러 퀴즈
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

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
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

      // ==================== CHAPTER 4: 변수 이름 규칙 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "변수 이름 규칙",
          desc: "이름 짓는 법!"
        }
      },

      // 규칙 설명
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

      // 퀴즈
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

      // 대소문자 구분
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

      // 에러 퀴즈
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

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
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

      // ==================== CHAPTER 5: 자주 하는 실수 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "자주 하는 실수",
          desc: "이것만 조심!"
        }
      },

      // 실수 1: 만들기 전 사용
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

      // 실수 2: 따옴표 빼먹기
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

      // 에러 퀴즈
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

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
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

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "용돈 계산기",
          desc: "변수로 용돈 관리!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "변수 출력 기억나?",
          task: "money 값을 출력해봐",
          template: null,
          answer: "print(money)",
          expect: "50000",
          en: {
            message: "Remember printing variables?",
            task: "Print the value of money"
          }
        }
      },

      // 프로젝트 소개
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

      // 프로젝트
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
            options: ["홍길동", "김철수", "에러", "홍길동\n김철수"],
            answer: 0,
            feedback: "Name과 name은 대소문자가 달라서 완전히 다른 변수야! Name을 출력하면 '홍길동'이 나와."
          },
          en: {
            lines: ["What's the result of this code?"],
            predict: {
              options: ["홍길동", "김철수", "Error", "홍길동\n김철수"],
              feedback: "Name and name are completely different variables because of capitalization! Printing Name gives '홍길동'."
            }
          }
        }
      },

      // 에러 퀴즈 1: 정의되지 않은 변수 사용
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

      // 에러 퀴즈 2: 잘못된 변수 이름
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
          num: 6,
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

      // 완료
      {
        type: "done",
        content: {}
      }
    ]
  };
