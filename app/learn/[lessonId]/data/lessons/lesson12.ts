import { LessonData } from '../types';

export const lesson12: LessonData = {
    id: "12",
    title: "딕셔너리",
    description: "키-값 쌍으로 데이터 저장!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "딕셔너리가 왜 필요해?",
          desc: "이름표 붙은 데이터!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "학생 정보를 저장하고 싶어!"
          ],
          code: "name = '철수'\nage = 15\ngrade = 'A'",
          isError: true,
          note: "변수가 너무 많아..."
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "딕셔너리로 한 번에!"
          ],
          code: "student = {\n    'name': '철수',\n    'age': 15,\n    'grade': 'A'\n}",
          result: "이름표와 값을 묶어서!",
          note: "키: 값 형태로 저장!"
        }
      },

      {
        type: "reward",
        content: {
          message: "딕셔너리를 배워보자!",
          emoji: "📖"
        }
      },

      // ==================== CHAPTER 2: 딕셔너리 만들기 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "딕셔너리 만들기",
          desc: "중괄호 { } 사용!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "리스트 복습!",
          task: "fruits 리스트 만들기",
          template: null,
          answer: "fruits = ['사과', '바나나']",
          expect: ""
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "딕셔너리 = 중괄호 { }"
          ],
          code: "person = {'name': '철수', 'age': 15}",
          result: "키: 값 쌍으로 저장!",
          note: "리스트는 [ ], 딕셔너리는 { }"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "값 가져오기 = 키로 접근"
          ],
          code: "print(person['name'])\nprint(person['age'])",
          result: "철수\n15",
          note: "[키]로 값을 꺼내!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "딕셔너리를 만드는 기호는?",
          options: [
            "[ ] 대괄호",
            "{ } 중괄호",
            "( ) 소괄호"
          ],
          answer: 1,
          explanation: "딕셔너리는 중괄호 { }! 리스트는 [ ]!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "딕셔너리 만들기",
          learned: [
            "{ } 중괄호로 만들기",
            "'키': 값 형태",
            "[키]로 값 접근"
          ],
          canDo: "딕셔너리를 만들고 값을 가져올 수 있어!",
          emoji: "📖"
        }
      },

      // ==================== CHAPTER 3: 딕셔너리 수정 ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "딕셔너리 수정",
          desc: "추가, 변경, 삭제!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "새 키-값 추가"
          ],
          code: "person['school'] = '중학교'\nprint(person)",
          result: "{'name': '철수', 'age': 15, 'school': '중학교'}",
          note: "없는 키로 대입하면 추가!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "값 변경하기"
          ],
          code: "person['age'] = 16\nprint(person['age'])",
          result: "16",
          note: "있는 키로 대입하면 변경!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "키-값 삭제하기"
          ],
          code: "del person['school']\nprint(person)",
          result: "{'name': '철수', 'age': 16}",
          note: "del로 삭제!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "없는 키로 값을 대입하면?",
          options: [
            "에러가 난다",
            "새로운 키-값이 추가된다",
            "아무 일도 안 일어난다"
          ],
          answer: 1,
          explanation: "없는 키로 대입하면 새로 추가! 있는 키면 변경!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "딕셔너리 수정",
          learned: [
            "dict[키] = 값 으로 추가/변경",
            "del dict[키] 로 삭제",
            "없는 키면 추가, 있으면 변경"
          ],
          canDo: "딕셔너리를 자유롭게 수정할 수 있어!",
          emoji: "✏️"
        }
      },

      // ==================== CHAPTER 4: 딕셔너리 메서드 ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "딕셔너리 메서드",
          desc: "keys, values, items, get!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "keys() = 모든 키 가져오기"
          ],
          code: "person = {'name': '철수', 'age': 15}\nprint(person.keys())",
          result: "dict_keys(['name', 'age'])",
          note: "키만 모아서!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "values() = 모든 값 가져오기"
          ],
          code: "print(person.values())",
          result: "dict_values(['철수', 15])",
          note: "값만 모아서!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "items() = 키-값 쌍 가져오기"
          ],
          code: "print(person.items())",
          result: "dict_items([('name', '철수'), ('age', 15)])",
          note: "키와 값을 함께!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "get() = 안전하게 값 가져오기"
          ],
          code: "print(person.get('name'))\nprint(person.get('school', '없음'))",
          result: "철수\n없음",
          note: "없는 키면 기본값 반환!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "person['school'] vs person.get('school') 차이는?",
          options: [
            "둘 다 같다",
            "get은 없으면 기본값, []는 에러",
            "[]이 더 빠르다"
          ],
          answer: 1,
          explanation: "get()은 없는 키여도 에러 안 나고 기본값 반환!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "딕셔너리 메서드",
          learned: [
            "keys() = 모든 키",
            "values() = 모든 값",
            "items() = 키-값 쌍",
            "get(키, 기본값) = 안전하게"
          ],
          canDo: "딕셔너리 데이터를 다양하게 가져올 수 있어!",
          emoji: "🔑"
        }
      },

      // ==================== CHAPTER 5: 딕셔너리 반복 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "딕셔너리 반복",
          desc: "for문으로 순회!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "키로 반복하기"
          ],
          code: "for key in person:\n    print(key)",
          result: "name\nage",
          note: "기본은 키로 반복!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "키와 값 함께 반복"
          ],
          code: "for key, value in person.items():\n    print(key, ':', value)",
          result: "name : 철수\nage : 15",
          note: "items()로 둘 다!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "for x in dict: 하면 x에 뭐가 들어갈까?",
          options: [
            "값",
            "키",
            "키-값 쌍"
          ],
          answer: 1,
          explanation: "기본은 키! 값도 원하면 items() 사용!"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "딕셔너리 반복",
          learned: [
            "for key in dict: 키로 반복",
            "for k, v in dict.items(): 둘 다",
            "for v in dict.values(): 값만"
          ],
          canDo: "딕셔너리를 순회할 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 6: 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 6,
          title: "학생 정보 시스템",
          desc: "배운 걸 활용해서 만들기!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "딕셔너리 접근 복습!",
          task: "student['name'] 출력하기",
          template: null,
          answer: "print(student['name'])",
          expect: "철수"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "📋 학생 정보 시스템!"
          ],
          code: "=== 학생 정보 ===\nname : 철수\nage : 15\ngrade : A\n총 3개 정보",
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
          target: "=== 학생 정보 ===",
          hint: "print('=== 학생 정보 ===')",
          done: [],
          answer: "print('=== 학생 정보 ===')"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "모든 정보 출력 (items 사용)",
          target: "name : 철수",
          hint: "for k, v in student.items():\n    print(k, ':', v)",
          done: ["=== 학생 정보 ==="],
          answer: "for k, v in student.items():\n    print(k, ':', v)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "정보 개수 출력",
          target: "총 3개 정보",
          hint: "print('총', len(student), '개 정보')",
          done: ["=== 학생 정보 ===", "name : 철수 ..."],
          answer: "print('총', len(student), '개 정보')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "성적 가져오기 (get 사용, 없으면 'N/A')",
          target: "성적: A",
          hint: "print('성적:', student.get('grade', 'N/A'))",
          done: ["=== 학생 정보 ===", "정보 출력", "총 3개 정보"],
          answer: "print('성적:', student.get('grade', 'N/A'))"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 6,
          title: "딕셔너리 마스터",
          learned: [
            "{ } 로 딕셔너리 만들기",
            "[키]로 값 접근/수정",
            "keys, values, items 메서드",
            "get()으로 안전하게 접근"
          ],
          canDo: "딕셔너리로 데이터를 관리할 수 있어!",
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
