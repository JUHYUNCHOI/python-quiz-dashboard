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
          code: "(20000 + 2000) * 3  # 다시 계산...\n(20000 + 2000) * 4  # 또 다시...",
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
          code: "chicken = 20000  # 여기만 바꾸면 끝!",
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
          expect: "100"
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

      // ===== Lv.1: 변수 만들기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "chicken에 19000 넣어봐",
          guide: "변수이름 = 값",
          template: { before: "chicken = ", after: "" },
          answer: "19000",
          expect: ""
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "cola에 2000 넣어봐",
          template: { before: "cola = ", after: "" },
          answer: "2000",
          expect: ""
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "price에 21000 넣어봐",
          template: { before: "price = ", after: "" },
          answer: "21000",
          expect: ""
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "변수 만들기 성공!",
          emoji: "👍"
        }
      },

      // 변수 출력
      {
        type: "explain",
        content: {
          lines: [
            "변수 값을 출력하려면?"
          ],
          code: "chicken = 19000\nprint(chicken)",
          result: "19000",
          note: "print() 안에 변수 이름을 넣어!"
        }
      },

      // ===== Lv.3: 변수 출력 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "chicken 값을 출력해봐",
          hint: "print(chicken)",
          template: null,
          answer: "print(chicken)",
          expect: "19000"
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "cola 값을 출력해봐",
          hint: "print(___)",
          template: null,
          answer: "print(cola)",
          expect: "2000"
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
          explanation: "= 는 '같다'가 아니라 '넣어라'야! 오른쪽 값을 왼쪽 변수에 저장해!"
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
          expect: ""
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
          expect: "21000"
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
          expect: "17000"
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
          expect: "57000"
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
          explanation: "50000 → 31000 → 29000! 순서대로 계산돼!"
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
          code: "chicken = 19000      # 영어 OK\nchicken1 = 19000     # 숫자 끝에 OK\nchicken_price = 19000 # 언더바 OK",
          note: "영어, 숫자(끝에), 언더바(_) 사용 가능!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "이건 안 돼요! ❌"
          ],
          code: "1chicken = 19000     # 숫자로 시작 X\nchicken-price = 19000 # 하이픈 X\nchicken price = 19000 # 공백 X",
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
          explanation: "2nd_menu는 숫자로 시작해서 안 돼! second_menu로 바꿔야 해!"
        }
      },

      // 대소문자 구분
      {
        type: "explain",
        content: {
          lines: [
            "대소문자도 구분해!"
          ],
          code: "Chicken = 19000\nchicken  # 에러!",
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
          code: "a. my_name = '홍길동'\nb. myName = '홍길동'\nc. my name = '홍길동'",
          options: [
            "a만 에러",
            "b만 에러",
            "c만 에러"
          ],
          answer: 2,
          explanation: "my name은 공백이 있어서 에러! my_name이나 myName으로 써야 해!"
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
          code: "print(pizza)  # 에러!\npizza = 18000",
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
          code: "name = 홍길동  # 에러!\nname = '홍길동'  # OK!",
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
          explanation: "score를 만들기 전에 print(score)를 했어! 순서를 바꿔야 해!"
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
          expect: "50000"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "💰 용돈 계산기 만들기!"
          ],
          code: "=== 용돈 계산기 ===\n처음 용돈: 50000\n치킨 사고 남은 돈: 31000\n콜라 사고 남은 돈: 29000",
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
