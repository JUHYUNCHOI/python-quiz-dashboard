import { LessonData } from '../types';

export const lesson11: LessonData = {
    id: "11",
    title: "리스트 메서드",
    description: "append, pop, sort 등!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "리스트 조작",
          desc: "추가, 삭제, 정렬!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "🛒 쇼핑 리스트를 생각해봐!"
          ],
          code: "장보기: ['우유', '빵', '계란']\n\n+ '치즈' 추가\n- '빵' 삭제\n→ 정렬",
          isPreview: true,
          note: "리스트를 자유롭게 바꿔보자!"
        }
      },

      {
        type: "reward",
        content: {
          message: "리스트 메서드를 배워보자!",
          emoji: "🛠️"
        }
      },

      // ==================== CHAPTER 2: 추가 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "추가 메서드",
          desc: "append, insert, extend!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "리스트 만들기 복습!",
          task: "fruits 리스트에 '사과', '바나나' 넣기",
          template: null,
          answer: "fruits = ['사과', '바나나']",
          expect: ""
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "append() = 끝에 추가"
          ],
          code: "fruits = ['사과', '바나나']\nfruits.append('오렌지')\nprint(fruits)",
          result: "['사과', '바나나', '오렌지']",
          note: "마지막에 추가!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "insert() = 원하는 위치에 삽입"
          ],
          code: "fruits.insert(1, '포도')\nprint(fruits)",
          result: "['사과', '포도', '바나나', '오렌지']",
          note: "insert(인덱스, 값)"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "extend() = 리스트끼리 합치기"
          ],
          code: "fruits.extend(['딸기', '키위'])\nprint(fruits)",
          result: "['사과', '포도', '바나나', '오렌지', '딸기', '키위']",
          note: "여러 개를 한번에!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "리스트 맨 끝에 추가하는 메서드는?",
          options: [
            "insert()",
            "append()",
            "extend()"
          ],
          answer: 1,
          explanation: "append()는 맨 끝에 하나 추가! insert()는 원하는 위치에!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "추가 메서드",
          learned: [
            "append() = 끝에 추가",
            "insert(i, x) = i번째에 삽입",
            "extend() = 리스트 합치기"
          ],
          canDo: "리스트에 항목을 추가할 수 있어!",
          emoji: "➕"
        }
      },

      // ==================== CHAPTER 3: 삭제 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "삭제 메서드",
          desc: "remove, pop, clear!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "remove() = 값으로 삭제"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nfruits.remove('바나나')\nprint(fruits)",
          result: "['사과', '오렌지']",
          note: "해당 값을 찾아서 삭제!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "pop() = 인덱스로 삭제 (꺼내기)"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nremoved = fruits.pop(1)\nprint(removed)\nprint(fruits)",
          result: "바나나\n['사과', '오렌지']",
          note: "삭제한 값을 반환해!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "pop() 인덱스 없으면 마지막!"
          ],
          code: "fruits.pop()\nprint(fruits)",
          result: "['사과']",
          note: "마지막 항목 삭제!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "clear() = 전부 삭제"
          ],
          code: "fruits.clear()\nprint(fruits)",
          result: "[]",
          note: "빈 리스트가 돼!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "remove()와 pop()의 차이는?",
          options: [
            "remove=값으로, pop=인덱스로",
            "remove=인덱스로, pop=값으로",
            "둘 다 같음"
          ],
          answer: 0,
          explanation: "remove('사과')는 값으로, pop(0)은 인덱스로 삭제!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "삭제 메서드",
          learned: [
            "remove(값) = 값으로 삭제",
            "pop(인덱스) = 꺼내기",
            "clear() = 전부 삭제"
          ],
          canDo: "리스트에서 항목을 삭제할 수 있어!",
          emoji: "➖"
        }
      },

      // ==================== CHAPTER 4: 정렬 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "정렬 메서드",
          desc: "sort, reverse!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sort() = 오름차순 정렬"
          ],
          code: "nums = [3, 1, 4, 1, 5]\nnums.sort()\nprint(nums)",
          result: "[1, 1, 3, 4, 5]",
          note: "원본 리스트가 바뀜!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "sort(reverse=True) = 내림차순"
          ],
          code: "nums.sort(reverse=True)\nprint(nums)",
          result: "[5, 4, 3, 1, 1]",
          note: "큰 것부터 작은 것 순서로!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "reverse() = 순서 뒤집기"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nfruits.reverse()\nprint(fruits)",
          result: "['오렌지', '바나나', '사과']",
          note: "정렬 아니고 그냥 뒤집기!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "sort()와 sorted()의 차이는?",
          code: "nums = [3, 1, 2]\na = nums.sort()\nb = sorted(nums)",
          options: [
            "둘 다 새 리스트 반환",
            "sort()는 원본 변경, sorted()는 새 리스트",
            "둘 다 원본 변경"
          ],
          answer: 1,
          explanation: "sort()는 원본을 바꾸고 None 반환! sorted()는 새 리스트 반환!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "정렬 메서드",
          learned: [
            "sort() = 오름차순 (원본 변경)",
            "sort(reverse=True) = 내림차순",
            "reverse() = 순서 뒤집기"
          ],
          canDo: "리스트를 정렬할 수 있어!",
          emoji: "📊"
        }
      },

      // ==================== CHAPTER 5: 기타 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "기타 메서드",
          desc: "count, index, copy!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "count() = 개수 세기"
          ],
          code: "nums = [1, 2, 2, 3, 2]\nprint(nums.count(2))",
          result: "3",
          note: "2가 3개 있어!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "index() = 위치 찾기"
          ],
          code: "fruits = ['사과', '바나나', '오렌지']\nprint(fruits.index('바나나'))",
          result: "1",
          note: "바나나는 1번 인덱스!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "copy() = 복사하기"
          ],
          code: "a = [1, 2, 3]\nb = a.copy()\nb.append(4)\nprint(a)\nprint(b)",
          result: "[1, 2, 3]\n[1, 2, 3, 4]",
          note: "a와 b는 별개!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "[1,2,2,3].count(2)의 결과는?",
          options: [
            "1",
            "2",
            "3"
          ],
          answer: 1,
          explanation: "2가 2개 있으니까 2!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "기타 메서드",
          learned: [
            "count(x) = x 개수",
            "index(x) = x 위치",
            "copy() = 복사"
          ],
          canDo: "리스트를 다양하게 활용할 수 있어!",
          emoji: "🔍"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "할일 관리 프로그램",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "append 복습!",
          task: "todos에 '운동하기' 추가",
          template: null,
          answer: "todos.append('운동하기')",
          expect: ""
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📝 할일 관리!"
          ],
          code: "=== 할일 목록 ===\n1. 공부하기\n2. 운동하기\n3. 청소하기\n총 3개",
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
          target: "=== 할일 목록 ===",
          hint: "print('=== 할일 목록 ===')",
          done: [],
          answer: "print('=== 할일 목록 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "할일 하나씩 출력 (enumerate 사용)",
          target: "1. 공부하기",
          hint: "for i, todo in enumerate(todos, 1):\n    print(i, todo)",
          done: ["=== 할일 목록 ==="],
          answer: "for i, todo in enumerate(todos, 1):\n    print(i, todo)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "총 개수 출력",
          target: "총 3개",
          hint: "print('총', len(todos), '개')",
          done: ["=== 할일 목록 ===", "1. 공부하기 ..."],
          answer: "print('총', len(todos), '개')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "첫 번째 할일 삭제하고 출력",
          target: "['운동하기', '청소하기']",
          hint: "todos.pop(0) 후 print(todos)",
          done: ["=== 할일 목록 ===", "목록 출력", "총 3개"],
          answer: "todos.pop(0)\nprint(todos)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "리스트 메서드 마스터",
          learned: [
            "append, insert, extend",
            "remove, pop, clear",
            "sort, reverse",
            "count, index, copy"
          ],
          canDo: "리스트를 자유자재로 조작할 수 있어!",
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
