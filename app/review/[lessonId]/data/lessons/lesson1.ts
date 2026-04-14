import { LessonData } from '../types';

export const lesson1: LessonData = {
    id: "1",
    title: "print() 출력",
    description: "화면에 글자를 출력해보자!",
    steps: [
      // ==================== CHAPTER 0: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "코딩 첫걸음",
          desc: "컴퓨터한테 첫 명령!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "마인크래프트 알지? 🎮",
            "그것도 코딩으로 만들었어!"
          ],
          code: "게임, 앱, 웹사이트... 전부 코딩!",
          isPreview: true
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "코딩 = 컴퓨터한테 일 시키기",
            "근데 컴퓨터는 한국어를 몰라 😢"
          ],
          code: "그래서 '파이썬'으로 말해야 해!",
          isPreview: true
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "오늘 배울 것:",
            "컴퓨터 화면에 글자 띄우기! 📺"
          ],
          code: "print('Hello!')",
          result: "Hello!",
          note: "이게 첫 번째 명령어야"
        }
      },

      // ==================== CHAPTER 1: 글자 출력 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "글자 띄우기",
          desc: "이렇게 나오게 해봐!"
        }
      },

      // 핵심 규칙 한 번에
      {
        type: "explain",
        content: {
          lines: [
            "글자는 따옴표로 감싸야 해",
            "없으면 에러!"
          ],
          code: "print('Game Over')  → Game Over\nprint(Game Over)    → ❌ 에러",
          note: "' 또는 \" 둘 다 OK. 키보드 Enter 왼쪽!"
        }
      },

      // ===== 직접 쳐보기 (처음부터 끝까지) =====
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nHello",
          template: null,
          answer: "print('Hello')",
          alternateAnswers: ["print(\"Hello\")"],
          expect: "Hello",
          en: {
            task: "Make it print like this ↓\nHello"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n안녕하세요",
          template: null,
          answer: "print('안녕하세요')",
          alternateAnswers: ["print(\"안녕하세요\")"],
          expect: "안녕하세요",
          en: {
            task: "Make it print like this ↓\n안녕하세요"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nGame Over",
          template: null,
          answer: "print('Game Over')",
          alternateAnswers: ["print(\"Game Over\")"],
          expect: "Game Over",
          en: {
            task: "Make it print like this ↓\nGame Over"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nLevel Clear!",
          template: null,
          answer: "print('Level Clear!')",
          alternateAnswers: ["print(\"Level Clear!\")"],
          expect: "Level Clear!",
          en: {
            task: "Make it print like this ↓\nLevel Clear!"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\n비밀번호 맞음",
          template: null,
          answer: "print('비밀번호 맞음')",
          alternateAnswers: ["print(\"비밀번호 맞음\")"],
          expect: "비밀번호 맞음",
          en: {
            task: "Make it print like this ↓\n비밀번호 맞음"
          }
        }
      },
      {
        type: "practice",
        content: {
          task: "이렇게 나오게 해봐 ↓\nPython is fun",
          template: null,
          answer: "print('Python is fun')",
          alternateAnswers: ["print(\"Python is fun\")"],
          expect: "Python is fun",
          en: {
            task: "Make it print like this ↓\nPython is fun"
          }
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드는 왜 에러일까?",
          code: "print(Hello)",
          options: [
            "print 철자가 틀려서",
            "Hello에 따옴표가 없어서",
            "괄호가 없어서"
          ],
          answer: 1,
          explanation: "글자는 꼭 따옴표로 감싸야 해! → print('Hello')",
          en: {
            question: "Why does this code cause an error?",
            options: [
              "Wrong spelling of print",
              "Hello is missing quotes",
              "Missing parentheses"
            ],
            explanation: "Strings must be wrapped in quotes! → print('Hello')"
          }
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "글자 띄우기",
          learned: [
            "글자는 따옴표로 감싸기",
            "' 또는 \" 둘 다 OK",
            "따옴표 없으면 에러!"
          ],
          canDo: "원하는 글자를 화면에 출력할 수 있어!",
          emoji: "🎉"
        }
      },

      // ==================== CHAPTER 2: 숫자와 계산 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "숫자와 계산",
          desc: "컴퓨터로 계산해보자!"
        }
      },

      // 인터리빙: 챕터1 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 앞에서 배운 거 기억나?",
          task: "Hello 출력해봐",
          template: null,
          answer: "print('Hello')",
          expect: "Hello",
          en: {
            message: "Wait! Do you remember what we learned?",
            task: "Print Hello"
          }
        }
      },

      // 숫자 설명
      {
        type: "explain",
        content: {
          lines: [
            "숫자는 따옴표 없어도 돼!"
          ],
          code: "print(100)",
          result: "100",
          note: "숫자는 그냥 쓰면 돼"
        }
      },

      // 문자 vs 숫자 - 오개념 방지
      {
        type: "explain",
        content: {
          lines: [
            "'100'이랑 100은 달라!"
          ],
          code: "'100' → 글자 (계산 불가)\n 100  → 숫자 (계산 가능)",
          note: "따옴표 있으면 글자, 없으면 숫자"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "100 + 50 계산하고 싶어. 뭐가 문제일까?",
          code: "print('100' + '50')",
          options: [
            "아무 문제 없다",
            "'100'은 글자라서 계산이 안 된다",
            "print를 잘못 썼다"
          ],
          answer: 1,
          explanation: "'100'은 글자야! 글자끼리 +하면 '10050'이 돼. 계산하려면 따옴표 빼!"
        }
      },

      // ===== Lv.1: 숫자 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "123을 화면에 띄워봐",
          guide: "숫자는 따옴표 없이!",
          template: { before: "print(", after: ")" },
          answer: "123",
          expect: "123",
          en: {
            task: "Display 123 on the screen",
            guide: "Numbers don't need quotes!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "2024를 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "2024",
          expect: "2024",
          en: {
            task: "Display 2024 on the screen"
          }
        }
      },

      // ===== Lv.3: 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "9999를 화면에 띄워봐",
          template: null,
          answer: "print(9999)",
          expect: "9999",
          en: {
            task: "Display 9999 on the screen"
          }
        }
      },

      // 계산 설명
      {
        type: "explain",
        content: {
          lines: [
            "숫자는 계산도 돼!"
          ],
          code: "print(10 + 5)",
          result: "15",
          note: "컴퓨터가 계산해서 결과를 보여줘"
        }
      },
      {
        type: "explain",
        content: {
          lines: [
            "사칙연산 기호"
          ],
          code: "+  더하기\n-  빼기\n*  곱하기 (× 아님!)\n/  나누기",
          note: "곱하기 주의! x가 아니라 * 야"
        }
      },

      // ===== Lv.1: 계산 빈칸 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "5 + 3 계산해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "5 + 3",
          alternateAnswers: ["5+3"],
          expect: "8",
          en: {
            task: "Calculate 5 + 3 and print it"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "100 - 30 계산해서 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "100 - 30",
          alternateAnswers: ["100-30"],
          expect: "70",
          en: {
            task: "Calculate 100 - 30 and print it"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "7 * 8 계산해서 출력해봐",
          guide: "* 는 곱하기!",
          template: { before: "print(", after: ")" },
          answer: "7 * 8",
          alternateAnswers: ["7*8"],
          expect: "56",
          en: {
            task: "Calculate 7 * 8 and print it",
            guide: "* means multiply!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "20 / 4 계산해서 출력해봐",
          guide: "/ 는 나누기!",
          template: { before: "print(", after: ")" },
          answer: "20 / 4",
          alternateAnswers: ["20/4"],
          expect: "5",
          en: {
            task: "Calculate 20 / 4 and print it",
            guide: "/ means divide!"
          }
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "글자 출력도 기억나지?",
          task: "계산중 출력해봐",
          template: null,
          answer: "print('계산중')",
          expect: "계산중",
          en: {
            message: "Remember how to print text too?",
            task: "Print 계산중"
          }
        }
      },

      // ===== Lv.3, 4: 계산 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "50 + 50 계산해서 출력해봐",
          template: null,
          answer: "print(50 + 50)",
          expect: "100",
          en: {
            task: "Calculate 50 + 50 and print it"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "9 * 9 계산해서 출력해봐",
          template: null,
          answer: "print(9 * 9)",
          expect: "81",
          en: {
            task: "Calculate 9 * 9 and print it"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "1000 - 1 계산해서 출력해봐",
          template: null,
          answer: "print(1000 - 1)",
          expect: "999",
          en: {
            task: "Calculate 1000 - 1 and print it"
          }
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'100'이랑 100 차이는?",
          options: [
            "'100'은 글자, 100은 숫자",
            "똑같다",
            "'100'만 출력된다"
          ],
          answer: 0,
          explanation: "'100'은 글자라서 계산 불가! 100은 숫자라서 계산 가능!",
          en: {
            question: "What is the difference between '100' and 100?",
            options: [
              "'100' is a string, 100 is a number",
              "They are the same",
              "Only '100' can be printed"
            ],
            explanation: "'100' is a string so you can't do math with it! 100 is a number so you can calculate with it!"
          }
        }
      },

      // 챕터 2 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "숫자와 계산",
          learned: [
            "숫자는 따옴표 없이",
            "'100'은 글자, 100은 숫자",
            "+ - * / 로 계산"
          ],
          canDo: "컴퓨터로 계산을 할 수 있어!",
          emoji: "🧮"
        }
      },

      // ==================== CHAPTER 3: 조합과 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "조합과 프로젝트",
          desc: "배운 걸 합쳐서 프로그램 만들기!"
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "숫자 출력 기억나?",
          task: "2024 출력해봐",
          template: null,
          answer: "print(2024)",
          expect: "2024",
          en: {
            message: "Remember how to print numbers?",
            task: "Print 2024"
          }
        }
      },

      // 여러 개 설명
      {
        type: "explain",
        content: {
          lines: [
            "쉼표로 여러 개를 한 번에!"
          ],
          code: "print('나이:', 20)",
          result: "나이: 20",
          note: "글자랑 숫자를 같이 출력!"
        }
      },

      // ===== Lv.1: 숫자만 채우기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "나이: 15 출력해봐",
          guide: "숫자만 채워!",
          template: { before: "print('나이:', ", after: ")" },
          answer: "15",
          expect: "나이: 15",
          en: {
            task: "Print: Age: 15",
            guide: "Fill in the number only!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "점수: 100 출력해봐",
          template: { before: "print('점수:', ", after: ")" },
          answer: "100",
          expect: "점수: 100",
          en: {
            task: "Print: Score: 100"
          }
        }
      },

      // ===== Lv.2: 글자+숫자 채우기 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "레벨: 5 출력해봐",
          guide: "글자 부분과 숫자 부분을 쉼표로 연결해!",
          template: { before: "print(", after: ")" },
          answer: "'레벨:', 5",
          alternateAnswers: ["\"레벨:\", 5"],
          expect: "레벨: 5",
          en: {
            task: "Print: Level: 5",
            guide: "Connect the text and number parts with a comma!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "코인: 999 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "'코인:', 999",
          alternateAnswers: ["\"코인:\", 999"],
          expect: "코인: 999",
          en: {
            task: "Print: Coins: 999"
          }
        }
      },

      // 3개 연결
      {
        type: "explain",
        content: {
          lines: [
            "3개도 가능!"
          ],
          code: "print('사과', 3, '개')",
          result: "사과 3 개",
          note: "쉼표로 계속 연결"
        }
      },

      // ===== Lv.2: 3개 연결 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "치킨 19000 원 출력해봐",
          guide: "글자, 숫자, 글자 3개를 쉼표로 연결해!",
          template: { before: "print(", after: ")" },
          answer: "'치킨', 19000, '원'",
          expect: "치킨 19000 원",
          en: {
            task: "Print: 치킨 19000 원",
            guide: "Connect 3 items (text, number, text) with commas!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "콜라 2000 원 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "'콜라', 2000, '원'",
          expect: "콜라 2000 원",
          en: {
            task: "Print: 콜라 2000 원"
          }
        }
      },

      // ===== Lv.3, 4: 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "피자 25000 원 출력해봐",
          template: null,
          answer: "print('피자', 25000, '원')",
          expect: "피자 25000 원",
          en: {
            task: "Print: 피자 25000 원"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "햄버거 8000 원 출력해봐",
          template: null,
          answer: "print('햄버거', 8000, '원')",
          expect: "햄버거 8000 원",
          en: {
            task: "Print: 햄버거 8000 원"
          }
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "거의 다 왔어! 프로젝트 해보자",
          emoji: "🚀"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🍗 치킨 계산기 만들기!"
          ],
          code: "=== 치킨 계산기 ===\n치킨: 19000 원\n콜라: 2000 원\n총합: 21000 원",
          isPreview: true,
          note: "한 줄씩 만들어보자!"
        }
      },

      // 프로젝트
      {
        type: "project",
        content: {
          step: 1,
          total: 4,
          task: "제목 만들기",
          target: "=== 치킨 계산기 ===",
          hint: "print('=== 치킨 계산기 ===')",
          done: [],
          answer: "print('=== 치킨 계산기 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "치킨 가격",
          target: "치킨: 19000 원",
          hint: "print('치킨:', 19000, '원')",
          done: ["=== 치킨 계산기 ==="],
          answer: "print('치킨:', 19000, '원')"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "콜라 가격",
          target: "콜라: 2000 원",
          hint: "위에서 한 것처럼!",
          done: ["=== 치킨 계산기 ===", "치킨: 19000 원"],
          answer: "print('콜라:', 2000, '원')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "총합 (계산!)",
          target: "총합: 21000 원",
          hint: "19000 + 2000 계산!",
          done: ["=== 치킨 계산기 ===", "치킨: 19000 원", "콜라: 2000 원"],
          answer: "print('총합:', 19000 + 2000, '원')"
        }
      },

      // 챕터 3 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "조합과 프로젝트",
          learned: [
            "쉼표로 여러 개 출력",
            "글자와 숫자 섞어서 출력",
            "계산 결과도 같이 출력"
          ],
          canDo: "실제로 쓸 수 있는 프로그램을 만들 수 있어!",
          emoji: "🏆"
        }
      },

      // ==================== CHAPTER 4: 주관식 특훈 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "출력 결과 맞추기",
          desc: "코드를 보고 결과를 예측해보자!"
        }
      },

      // 인터리빙
      {
        type: "interleaving",
        content: {
          message: "프로젝트 기억나지? 쉼표로 연결했었지!",
          task: "이름: 철수 나이: 13 출력해봐",
          guide: "쉼표 두 개 써서 3개 연결!",
          template: null,
          answer: "print('이름: 철수 나이:', 13)",
          alternateAnswers: ["print('이름: 철수', '나이:', 13)"],
          expect: "이름: 철수 나이: 13",
          en: {
            message: "Remember the project? We connected values with commas!",
            task: "Print: 이름: 철수 나이: 13",
            guide: "Use two commas to connect 3 items!"
          }
        }
      },

      // 따옴표 안팎 설명
      {
        type: "explain",
        content: {
          lines: [
            "따옴표 안 vs 밖 — 결과가 달라!"
          ],
          code: "print('10 + 20')  → 10 + 20\nprint(10 + 20)   → 30",
          note: "따옴표 안 = 글자 그대로 / 따옴표 밖 = 계산!"
        }
      },

      // ===== 따옴표 안팎 직접 써보기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "30이 출력되게 해봐 (더하기 계산으로)",
          guide: "따옴표 없이 10 + 20",
          template: { before: "print(", after: ")" },
          answer: "10 + 20",
          alternateAnswers: ["10+20", "20 + 10", "20+10", "30"],
          expect: "30",
          en: {
            task: "Make 30 print out (using addition)",
            guide: "Without quotes: 10 + 20"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "10 + 20 이라는 글자가 출력되게 해봐",
          guide: "따옴표로 감싸야 글자!",
          template: { before: "print(", after: ")" },
          answer: "'10 + 20'",
          alternateAnswers: ["\"10 + 20\""],
          expect: "10 + 20",
          en: {
            task: "Make the text '10 + 20' print out",
            guide: "Wrap it in quotes to make it text!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "12가 출력되게 해봐 (곱하기 계산으로)",
          guide: "* 는 곱하기!",
          template: { before: "print(", after: ")" },
          answer: "3 * 4",
          alternateAnswers: ["3*4", "4 * 3", "4*3", "2 * 6", "2*6", "12"],
          expect: "12",
          en: {
            task: "Make 12 print out (using multiplication)",
            guide: "* means multiply!"
          }
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "점수: 100 출력해봐 (80 + 20 계산으로)",
          guide: "글자와 계산식을 쉼표로 연결해!",
          template: { before: "print(", after: ")" },
          answer: "'점수:', 80 + 20",
          alternateAnswers: ["'점수:', 80+20", "\"점수:\", 80 + 20", "\"점수:\", 80+20"],
          expect: "점수: 100",
          en: {
            task: "Print: Score: 100 (using 80 + 20 calculation)",
            guide: "Connect a text label with a calculation using a comma!"
          }
        }
      },

      // 빈 줄 설명
      {
        type: "explain",
        content: {
          lines: [
            "print()만 쓰면 빈 줄이 나와!"
          ],
          code: "print('위')\nprint()\nprint('아래')",
          result: "위\n\n아래",
          note: "print() 안에 아무것도 안 넣으면 줄만 바꿔줘"
        }
      },

      // 빈 줄 직접 써보기
      {
        type: "practice",
        content: {
          level: 3,
          task: "아래처럼 출력해봐\n위\n\n아래",
          hint: "print() 3번 써야 해 — 가운데 줄은 빈 줄이야!",
          template: null,
          answer: "print('위')\nprint()\nprint('아래')",
          expect: "위\n\n아래",
          en: {
            task: "Make it print like this\n위\n\n아래",
            hint: "You need 3 print() calls — the middle one creates a blank line!"
          }
        }
      },

      // 종합: 여러 줄 출력
      {
        type: "practice",
        content: {
          level: 4,
          task: "아래처럼 출력해봐\n===점수===\n국어: 90\n수학: 85",
          template: null,
          answer: "print('===점수===')\nprint('국어:', 90)\nprint('수학:', 85)",
          alternateAnswers: [
            "print('===점수===')\nprint('국어: 90')\nprint('수학: 85')"
          ],
          expect: "===점수===\n국어: 90\n수학: 85",
          en: {
            task: "Make it print like this\n===점수===\n국어: 90\n수학: 85"
          }
        }
      },

      // 종합: 글자+계산 혼합
      {
        type: "practice",
        content: {
          level: 4,
          task: "아래처럼 출력해봐\n치킨: 18000 원\n콜라: 2000 원\n합계: 20000 원",
          guide: "마지막 합계 줄은 두 숫자를 더한 계산식으로!",
          template: null,
          answer: "print('치킨:', 18000, '원')\nprint('콜라:', 2000, '원')\nprint('합계:', 18000 + 2000, '원')",
          alternateAnswers: [
            "print('치킨: 18000 원')\nprint('콜라: 2000 원')\nprint('합계: 20000 원')"
          ],
          expect: "치킨: 18000 원\n콜라: 2000 원\n합계: 20000 원",
          en: {
            task: "Make it print like this\n치킨: 18000 원\n콜라: 2000 원\n합계: 20000 원",
            guide: "For the last total line, use a calculation that adds the two numbers!"
          }
        }
      },

      // 최종 도전
      {
        type: "practice",
        content: {
          level: 4,
          task: "구구단 5단 첫 3줄을 출력해봐\n5 * 1 = 5\n5 * 2 = 10\n5 * 3 = 15",
          guide: "각 줄마다 print() 한 번! '5 * 1 =' 같은 글자와 계산 결과를 쉼표로 연결해",
          template: null,
          answer: "print('5 * 1 =', 5*1)\nprint('5 * 2 =', 5*2)\nprint('5 * 3 =', 5*3)",
          alternateAnswers: [
            "print('5 * 1 =', 5 * 1)\nprint('5 * 2 =', 5 * 2)\nprint('5 * 3 =', 5 * 3)",
            "print('5 * 1 = 5')\nprint('5 * 2 = 10')\nprint('5 * 3 = 15')"
          ],
          expect: "5 * 1 = 5\n5 * 2 = 10\n5 * 3 = 15",
          en: {
            task: "Print the first 3 lines of the 5 times table\n5 * 1 = 5\n5 * 2 = 10\n5 * 3 = 15",
            guide: "One print() per line! Connect the label text and the calculation result with a comma"
          }
        }
      },

      // 따옴표 안팎 차이 확인 (1개만)
      {
        type: "errorQuiz",
        content: {
          question: "두 코드의 출력이 왜 다를까?",
          code: "print('3 + 4')  → 3 + 4\nprint(3 + 4)   → 7",
          options: [
            "따옴표 안은 글자 그대로, 밖은 계산한다",
            "print는 숫자만 계산한다",
            "두 코드는 같은 결과다"
          ],
          answer: 0,
          explanation: "따옴표 안 = 글자 그대로 출력. 따옴표 밖 = 실제 계산해서 출력!",
          en: {
            question: "Why do the two codes produce different output?",
            options: [
              "Inside quotes prints text literally, outside quotes calculates",
              "print only calculates numbers",
              "Both codes produce the same result"
            ],
            explanation: "Inside quotes = prints text as-is. Outside quotes = calculates and prints the result!"
          }
        }
      },

      // 챕터 4 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "출력 결과 맞추기",
          learned: [
            "print()는 빈 줄 출력",
            "따옴표 안 → 그대로 출력, 따옴표 밖 → 계산",
            "쉼표 연결 시 자동 공백",
            "여러 print()로 여러 줄 출력"
          ],
          canDo: "코드만 봐도 출력 결과를 예측할 수 있어!",
          emoji: "🧠"
        }
      },

      // 완료
      {
        type: "done",
        content: {}
      }
    ]
  };
