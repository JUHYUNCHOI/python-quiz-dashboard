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
          desc: "따옴표를 배워보자!"
        }
      },

      // 동기 부여 - 바로 시작!
      {
        type: "explain",
        content: {
          lines: [
            "게임에서 \"Game Over\" 어떻게 보여줄까?",
            "바로 해보자! 👇"
          ],
          code: "print('Game Over')",
          result: "Game Over",
          note: "print() = 화면에 띄워줘!"
        }
      },

      // 따옴표 설명
      {
        type: "explain",
        content: {
          lines: [
            "글자는 따옴표로 감싸야 해"
          ],
          code: "print('Hello')",
          result: "Hello",
          note: "따옴표 = \"이건 글자야!\" 라는 표시"
        }
      },

      // 에러 체험 - 오개념 방지
      {
        type: "explain",
        content: {
          lines: [
            "따옴표 없으면? 에러!"
          ],
          code: "print(Hello)",
          result: "❌ Error: Hello가 뭐야?",
          isError: true,
          note: "따옴표 없으면 컴퓨터가 '이게 뭐지?' 하고 헷갈려해"
        }
      },

      // 따옴표 종류 - 둘 다 OK 강조
      {
        type: "explain",
        content: {
          lines: [
            "작은따옴표 ' 큰따옴표 \"",
            "둘 다 OK!"
          ],
          code: "print('Hi')  → Hi\nprint(\"Hi\")  → Hi",
          result: "둘 다 똑같이 나와!",
          note: "편한 거 쓰면 돼"
        }
      },

      // ===== Lv.1: 빈칸만 채우기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "Hello를 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "Hello",
          expect: "Hello"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "안녕을 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "안녕",
          expect: "안녕"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "파이썬을 화면에 띄워봐",
          template: { before: "print('", after: "')" },
          answer: "파이썬",
          expect: "파이썬"
        }
      },

      // 중간 보상
      {
        type: "reward",
        content: {
          message: "좋아! 이제 따옴표도 써보자",
          emoji: "👍"
        }
      },

      // ===== Lv.2: 따옴표까지 =====
      {
        type: "explain",
        content: {
          lines: [
            "이제 따옴표도 직접 써볼까?"
          ],
          code: "print('OK')",
          result: "OK",
          note: "' 버튼 → 키보드 Enter 왼쪽!"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "Hi를 화면에 띄워봐",
          guide: "따옴표 포함해서! 'Hi'",
          template: { before: "print(", after: ")" },
          answer: "'Hi'",
          alternateAnswers: ["\"Hi\""],
          expect: "Hi"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "Good을 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "'Good'",
          alternateAnswers: ["\"Good\""],
          expect: "Good"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "코딩을 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "'코딩'",
          alternateAnswers: ["\"코딩\""],
          expect: "코딩"
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
          explanation: "글자는 꼭 따옴표로 감싸야 해! print('Hello')"
        }
      },

      // ===== Lv.3: 전체 코드 (힌트 있음) =====
      {
        type: "explain",
        content: {
          lines: [
            "이제 처음부터 끝까지 써보자!"
          ],
          code: "print('Nice')",
          result: "Nice",
          note: "print('내용') 형태!"
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "Yes를 화면에 띄워봐",
          hint: "print('Yes')",
          template: null,
          answer: "print('Yes')",
          expect: "Yes"
        }
      },
      {
        type: "practice",
        content: {
          level: 3,
          task: "Python을 화면에 띄워봐",
          hint: "print('___')",
          template: null,
          answer: "print('Python')",
          expect: "Python"
        }
      },

      // ===== Lv.4: 전체 코드 (힌트 없음) =====
      {
        type: "practice",
        content: {
          level: 4,
          task: "Hello World를 화면에 띄워봐",
          template: null,
          answer: "print('Hello World')",
          expect: "Hello World"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "나는 코딩왕을 화면에 띄워봐",
          template: null,
          answer: "print('나는 코딩왕')",
          expect: "나는 코딩왕"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "에러 나는 건?",
          options: ["print('Hi')", "print(Hi)", "print(\"Hi\")"],
          answer: 1,
          explanation: "따옴표 없으면 에러! ' 또는 \" 둘 다 OK"
        }
      },

      // 챕터 1 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "글자 띄우기",
          learned: [
            "print()로 화면에 출력",
            "글자는 따옴표로 감싸기",
            "' 또는 \" 둘 다 OK"
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
          expect: "Hello"
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
          expect: "123"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "2024를 화면에 띄워봐",
          template: { before: "print(", after: ")" },
          answer: "2024",
          expect: "2024"
        }
      },

      // ===== Lv.3: 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "9999를 화면에 띄워봐",
          hint: "print(9999)",
          template: null,
          answer: "print(9999)",
          expect: "9999"
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
          expect: "8"
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
          expect: "70"
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
          expect: "56"
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
          expect: "5"
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
          expect: "계산중"
        }
      },

      // ===== Lv.3, 4: 계산 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "50 + 50 계산해서 출력해봐",
          hint: "print(50 + 50)",
          template: null,
          answer: "print(50 + 50)",
          expect: "100"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "9 * 9 계산해서 출력해봐",
          template: null,
          answer: "print(9 * 9)",
          expect: "81"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "1000 - 1 계산해서 출력해봐",
          template: null,
          answer: "print(1000 - 1)",
          expect: "999"
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
          explanation: "'100'은 글자라서 계산 불가! 100은 숫자라서 계산 가능!"
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
          expect: "2024"
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
          expect: "나이: 15"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "점수: 100 출력해봐",
          template: { before: "print('점수:', ", after: ")" },
          answer: "100",
          expect: "점수: 100"
        }
      },

      // ===== Lv.2: 글자+숫자 채우기 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "레벨: 5 출력해봐",
          guide: "'레벨:', 5 ← 쉼표로 연결!",
          template: { before: "print(", after: ")" },
          answer: "'레벨:', 5",
          alternateAnswers: ["\"레벨:\", 5"],
          expect: "레벨: 5"
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
          expect: "코인: 999"
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
          guide: "'치킨', 19000, '원'",
          template: { before: "print(", after: ")" },
          answer: "'치킨', 19000, '원'",
          expect: "치킨 19000 원"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "콜라 2000 원 출력해봐",
          template: { before: "print(", after: ")" },
          answer: "'콜라', 2000, '원'",
          expect: "콜라 2000 원"
        }
      },

      // ===== Lv.3, 4: 전체 =====
      {
        type: "practice",
        content: {
          level: 3,
          task: "피자 25000 원 출력해봐",
          hint: "print('피자', 25000, '원')",
          template: null,
          answer: "print('피자', 25000, '원')",
          expect: "피자 25000 원"
        }
      },
      {
        type: "practice",
        content: {
          level: 4,
          task: "햄버거 8000 원 출력해봐",
          template: null,
          answer: "print('햄버거', 8000, '원')",
          expect: "햄버거 8000 원"
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

      // 완료
      {
        type: "done",
        content: {}
      }
    ]
  };
