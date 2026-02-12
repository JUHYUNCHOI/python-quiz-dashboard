import { LessonData } from '../types';

export const lesson10: LessonData = {
    id: "10",
    title: "리스트와 반복문",
    description: "리스트를 자유자재로 다루기!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "리스트 완전 정복",
          desc: "for문으로 리스트 마스터!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "리스트의 모든 항목을 처리하고 싶어!"
          ],
          code: "print(fruits[0])\nprint(fruits[1])\nprint(fruits[2])\n...",
          isError: true,
          note: "100개면? 😱"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "for문으로 한 번에!"
          ],
          code: "for fruit in fruits:\n    print(fruit)",
          result: "사과\n바나나\n오렌지",
          note: "몇 개든 한 번에 처리! 💪"
        }
      },

      {
        type: "reward",
        content: {
          message: "리스트 + for 완벽 조합!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 2: for로 리스트 순회 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "for로 리스트 순회",
          desc: "하나씩 꺼내서 처리!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "for 복습!",
          task: "range(3)으로 i 출력하기",
          hint: "for i in range(3):\n    print(i)",
          template: null,
          answer: "for i in range(3):\n    print(i)",
          expect: "0\n1\n2"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "for 변수 in 리스트:"
          ],
          code: "names = ['철수', '영희', '민수']\nfor name in names:\n    print(name)",
          result: "철수\n영희\n민수",
          note: "name에 하나씩 들어가!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "숫자 리스트도 마찬가지!"
          ],
          code: "scores = [90, 85, 95]\nfor score in scores:\n    print(score)",
          result: "90\n85\n95",
          note: "score에 하나씩!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "for x in [1,2,3]: 에서 x는 몇 번 바뀔까?",
          options: [
            "1번",
            "3번",
            "무한번"
          ],
          answer: 1,
          explanation: "리스트에 3개 있으니까 x는 1, 2, 3으로 3번 바뀌어!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "리스트 순회",
          learned: [
            "for 변수 in 리스트:",
            "변수에 항목이 하나씩",
            "리스트 길이만큼 반복"
          ],
          canDo: "리스트 모든 항목을 처리할 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 3: 인덱스와 함께 순회 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "인덱스와 함께",
          desc: "enumerate() 사용법!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "순서도 알고 싶을 때?"
          ],
          code: "for i, name in enumerate(names):\n    print(i, name)",
          result: "0 철수\n1 영희\n2 민수",
          note: "i = 인덱스, name = 값!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "1부터 시작하고 싶으면?"
          ],
          code: "for i, name in enumerate(names, 1):\n    print(i, name)",
          result: "1 철수\n2 영희\n3 민수",
          note: "enumerate(리스트, 시작숫자)"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "enumerate()가 주는 것은?",
          options: [
            "값만",
            "인덱스만",
            "인덱스와 값 둘 다"
          ],
          answer: 2,
          explanation: "enumerate()는 (인덱스, 값) 쌍을 줘!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "enumerate()",
          learned: [
            "enumerate() = 인덱스 + 값",
            "for i, x in enumerate(list):",
            "시작 숫자 지정 가능"
          ],
          canDo: "순서와 함께 항목을 처리할 수 있어!",
          emoji: "🔢"
        }
      },

      // ==================== CHAPTER 4: 리스트 컴프리헨션 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "리스트 컴프리헨션",
          desc: "한 줄로 리스트 만들기!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "1부터 5까지 제곱 리스트 만들기"
          ],
          code: "squares = []\nfor i in range(1, 6):\n    squares.append(i ** 2)\nprint(squares)",
          result: "[1, 4, 9, 16, 25]",
          note: "4줄이나 필요해..."
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "리스트 컴프리헨션으로 한 줄!"
          ],
          code: "squares = [i ** 2 for i in range(1, 6)]\nprint(squares)",
          result: "[1, 4, 9, 16, 25]",
          note: "[표현식 for 변수 in 범위]"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "조건도 넣을 수 있어!"
          ],
          code: "evens = [i for i in range(10) if i % 2 == 0]\nprint(evens)",
          result: "[0, 2, 4, 6, 8]",
          note: "짝수만 골라서 리스트로!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "[x*2 for x in [1,2,3]]의 결과는?",
          options: [
            "[1, 2, 3]",
            "[2, 4, 6]",
            "[1, 4, 9]"
          ],
          answer: 1,
          explanation: "각 x에 2를 곱해서 [2, 4, 6]!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "리스트 컴프리헨션",
          learned: [
            "[표현식 for 변수 in 범위]",
            "조건 추가: if 조건",
            "한 줄로 리스트 생성!"
          ],
          canDo: "간결하게 리스트를 만들 수 있어!",
          emoji: "✨"
        }
      },

      // ==================== CHAPTER 5: 유용한 함수들 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "유용한 함수들",
          desc: "sum, max, min, sorted!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sum() = 합계"
          ],
          code: "scores = [90, 85, 95, 80]\nprint(sum(scores))",
          result: "350",
          note: "모든 숫자를 더해줘!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "max(), min() = 최대, 최소"
          ],
          code: "print(max(scores))\nprint(min(scores))",
          result: "95\n80",
          note: "가장 큰 값, 가장 작은 값!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sorted() = 정렬"
          ],
          code: "print(sorted(scores))\nprint(sorted(scores, reverse=True))",
          result: "[80, 85, 90, 95]\n[95, 90, 85, 80]",
          note: "오름차순 / 내림차순!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "max([3, 1, 4, 1, 5])의 결과는?",
          options: [
            "1",
            "5",
            "14"
          ],
          answer: 1,
          explanation: "가장 큰 값 5를 반환해!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "유용한 함수",
          learned: [
            "sum() = 합계",
            "max(), min() = 최대, 최소",
            "sorted() = 정렬"
          ],
          canDo: "리스트를 다양하게 처리할 수 있어!",
          emoji: "🧰"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "성적 분석기",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "리스트 순회 복습!",
          task: "scores의 각 점수 출력",
          hint: "for score in scores:\n    print(score)",
          template: null,
          answer: "for score in scores:\n    print(score)",
          expect: "90\n85\n95\n80"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📊 성적 분석기!"
          ],
          code: "=== 성적 분석 ===\n총점: 350\n평균: 87.5\n최고: 95\n최저: 80",
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
          task: "제목 출력",
          target: "=== 성적 분석 ===",
          hint: "print('=== 성적 분석 ===')",
          done: [],
          answer: "print('=== 성적 분석 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 5,
          task: "총점 출력 (sum 사용)",
          target: "총점: 350",
          hint: "print('총점:', sum(scores))",
          done: ["=== 성적 분석 ==="],
          answer: "print('총점:', sum(scores))"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 5,
          task: "평균 출력",
          target: "평균: 87.5",
          hint: "sum(scores) / len(scores)",
          done: ["=== 성적 분석 ===", "총점: 350"],
          answer: "print('평균:', sum(scores) / len(scores))"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 5,
          task: "최고점 출력 (max 사용)",
          target: "최고: 95",
          hint: "print('최고:', max(scores))",
          done: ["=== 성적 분석 ===", "총점: 350", "평균: 87.5"],
          answer: "print('최고:', max(scores))"
        }
      },
      {
        type: "project",
        content: {
          step: 5,
          total: 5,
          task: "최저점 출력 (min 사용)",
          target: "최저: 80",
          hint: "print('최저:', min(scores))",
          done: ["=== 성적 분석 ===", "총점: 350", "평균: 87.5", "최고: 95"],
          answer: "print('최저:', min(scores))"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "리스트와 반복문 마스터",
          learned: [
            "for로 리스트 순회",
            "enumerate()로 인덱스 얻기",
            "리스트 컴프리헨션",
            "sum, max, min, sorted"
          ],
          canDo: "리스트를 자유자재로 다룰 수 있어!",
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
