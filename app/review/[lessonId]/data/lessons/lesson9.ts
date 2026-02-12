import { LessonData } from '../types';

export const lesson9: LessonData = {
    id: "9",
    title: "리스트 기초",
    description: "여러 데이터를 한 번에!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "리스트가 왜 필요해?",
          desc: "여러 데이터 관리!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "친구 5명 이름을 저장하려면?"
          ],
          code: "friend1 = '철수'\nfriend2 = '영희'\nfriend3 = '민수'\nfriend4 = '지영'\nfriend5 = '준호'",
          isError: true,
          note: "100명이면? 😱"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "리스트로 한 줄에!"
          ],
          code: "friends = ['철수', '영희', '민수', '지영', '준호']",
          result: "하나의 변수에 여러 개!",
          note: "이게 리스트의 힘! 💪"
        }
      },

      {
        type: "reward",
        content: {
          message: "리스트를 배워보자!",
          emoji: "📋"
        }
      },

      // ==================== CHAPTER 2: 리스트 만들기 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "리스트 만들기",
          desc: "대괄호로 묶기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "변수 복습!",
          task: "name에 '철수' 넣어봐",
          template: null,
          answer: "name = '철수'",
          expect: ""
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "리스트 = 대괄호 [ ]"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']",
          result: "3개의 과일이 하나의 리스트에!",
          note: "쉼표로 구분해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자 리스트도 OK!"
          ],
          code: "scores = [90, 85, 95, 80]",
          result: "4개의 점수!",
          note: "어떤 타입이든 넣을 수 있어!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "리스트를 만드는 기호는?",
          options: [
            "( ) 소괄호",
            "[ ] 대괄호",
            "{ } 중괄호"
          ],
          answer: 1,
          explanation: "리스트는 대괄호 [ ]로 만들어!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "리스트 만들기",
          learned: [
            "대괄호 [ ]로 만들기",
            "쉼표로 구분",
            "어떤 타입이든 OK"
          ],
          canDo: "여러 데이터를 리스트로 묶을 수 있어!",
          emoji: "📋"
        }
      },

      // ==================== CHAPTER 3: 인덱스 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "인덱스",
          desc: "몇 번째 데이터?"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "인덱스 = 순서 번호"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\n#          [0]      [1]       [2]",
          result: "0부터 시작!",
          note: "첫 번째가 0번이야!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "인덱스로 접근"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nprint(fruits[0])",
          result: "사과",
          note: "[번호]로 꺼내기!"
        }
      },

      // ===== Lv.1: 인덱스 연습 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "fruits[1] 출력해봐 (바나나)",
          template: { before: "print(", after: ")" },
          answer: "fruits[1]",
          expect: "바나나"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "fruits[2] 출력해봐 (오렌지)",
          template: { before: "print(", after: ")" },
          answer: "fruits[2]",
          expect: "오렌지"
        }
      },

      // 음수 인덱스
      {
        type: "explain",
        content: {
          lines: [
            "음수 인덱스 = 뒤에서부터!"
          ],
          code: "fruits[-1]  # 마지막 (오렌지)\nfruits[-2]  # 뒤에서 두 번째 (바나나)",
          note: "-1이 마지막!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "리스트의 첫 번째 인덱스는?",
          options: [
            "1",
            "0",
            "-1"
          ],
          answer: 1,
          explanation: "인덱스는 0부터 시작! -1은 마지막이야!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "인덱스",
          learned: [
            "인덱스는 0부터",
            "리스트[번호]로 접근",
            "-1은 마지막"
          ],
          canDo: "원하는 데이터를 꺼낼 수 있어!",
          emoji: "🔢"
        }
      },

      // ==================== CHAPTER 4: 리스트 수정 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "리스트 수정",
          desc: "추가, 삭제, 변경!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "값 변경하기"
          ],
          code: "fruits[0] = '포도'\nprint(fruits)",
          result: "['포도', '바나나', '오렌지']",
          note: "사과가 포도로!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "append() = 끝에 추가"
          ],
          code: "fruits.append('딸기')\nprint(fruits)",
          result: "['포도', '바나나', '오렌지', '딸기']",
          note: "마지막에 추가!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "len() = 길이 확인"
          ],
          code: "print(len(fruits))",
          result: "4",
          note: "리스트에 4개 있어!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "리스트 끝에 추가하는 함수는?",
          options: [
            "add()",
            "append()",
            "insert()"
          ],
          answer: 1,
          explanation: "append()는 리스트 끝에 추가해!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "리스트 수정",
          learned: [
            "리스트[i] = 값으로 변경",
            "append()로 추가",
            "len()으로 길이 확인"
          ],
          canDo: "리스트를 자유롭게 수정할 수 있어!",
          emoji: "✏️"
        }
      },

      // ==================== CHAPTER 5: 리스트와 반복문 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "리스트와 for",
          desc: "모든 항목 처리!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "for로 리스트 순회"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nfor fruit in fruits:\n    print(fruit)",
          result: "사과\n바나나\n오렌지",
          note: "하나씩 꺼내서 처리!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "for item in list: 에서 item은?",
          options: [
            "리스트 전체",
            "리스트의 각 항목",
            "인덱스 번호"
          ],
          answer: 1,
          explanation: "item에 리스트 항목이 하나씩 들어가!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "리스트와 for",
          learned: [
            "for item in list: 형태",
            "모든 항목을 순회",
            "item에 각 항목이 들어감"
          ],
          canDo: "리스트의 모든 항목을 처리할 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "성적 관리 프로그램",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "리스트 출력 복습!",
          task: "scores 리스트를 출력해봐",
          template: null,
          answer: "print(scores)",
          expect: "[90, 85, 95, 80]"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📊 성적 관리 프로그램!"
          ],
          code: "=== 성적 관리 ===\n점수: [90, 85, 95, 80]\n총점: 350\n평균: 87.5",
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
          task: "제목 출력",
          target: "=== 성적 관리 ===",
          hint: "print('=== 성적 관리 ===')",
          done: [],
          answer: "print('=== 성적 관리 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "점수 리스트 출력",
          target: "점수: [90, 85, 95, 80]",
          hint: "print('점수:', scores)",
          done: ["=== 성적 관리 ==="],
          answer: "print('점수:', scores)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "총점 출력 (sum 함수 사용)",
          target: "총점: 350",
          hint: "print('총점:', sum(scores))",
          done: ["=== 성적 관리 ===", "점수: [90, 85, 95, 80]"],
          answer: "print('총점:', sum(scores))"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "평균 출력 (총점 / 개수)",
          target: "평균: 87.5",
          hint: "sum(scores) / len(scores)",
          done: ["=== 성적 관리 ===", "점수", "총점: 350"],
          answer: "print('평균:', sum(scores) / len(scores))"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "리스트 마스터",
          learned: [
            "대괄호로 리스트 만들기",
            "인덱스로 접근 (0부터!)",
            "append로 추가",
            "for로 순회"
          ],
          canDo: "여러 데이터를 효율적으로 관리할 수 있어!",
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
