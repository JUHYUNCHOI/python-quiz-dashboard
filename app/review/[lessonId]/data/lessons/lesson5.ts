import { LessonData } from '../types';

export const lesson5: LessonData = {
    id: "5",
    title: "문자열 연산",
    description: "문자열도 더하고 곱할 수 있어!",
    steps: [
      // ==================== CHAPTER 1: 동기 부여 ====================
      {
        type: "chapter",
        content: {
          num: 1,
          title: "문자열로 만드는 이름표",
          desc: "문자열 연산으로 뭔가 만들기!"
        }
      },

      // 프리뷰
      {
        type: "explain",
        content: {
          lines: [
            "🏷️ 오늘 만들 것!"
          ],
          code: "=== 나의 이름표 ===\n이름: 김코딩\n학교: 코딩중학교 1학년\n응원: 화이팅! 화이팅! 화이팅! ",
          isPreview: true,
          note: "문자열 연산으로 뚝딱 만들어보자!"
        }
      },

      {
        type: "explain",
        content: {
          lines: [
            "문자열도 연산할 수 있어!"
          ],
          code: "'Hello' + 'World' → 'HelloWorld'\n'ha' * 3         → 'hahaha'",
          isPreview: true,
          note: "+ 는 이어붙이기, * 는 반복!"
        }
      },

      // 보상
      {
        type: "reward",
        content: {
          message: "문자열 연산 시작!",
          emoji: "🔤"
        }
      },

      // ==================== CHAPTER 2: 문자열 이어붙이기 ====================
      {
        type: "chapter",
        content: {
          num: 2,
          title: "문자열 이어붙이기 (+)",
          desc: "문자열끼리 더해보자!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "잠깐! 문자열 출력 기억나?",
          task: "'안녕하세요' 출력해봐",
          template: null,
          answer: "print('안녕하세요')",
          expect: "안녕하세요"
        }
      },

      // + 연산자
      {
        type: "explain",
        content: {
          lines: [
            "문자열 + 문자열 = 이어붙이기!"
          ],
          code: "'Hello' + 'World'  → 'HelloWorld'\n'김' + '코딩'       → '김코딩'\n'안녕' + '하세요'   → '안녕하세요'",
          note: "공백도 직접 넣어야 해! ' ' + '이름' 처럼"
        }
      },

      // ===== Lv.1: 이어붙이기 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'Hello' + 'World' 를 출력해봐",
          guide: "+ 로 이어붙이기!",
          template: { before: "print(", after: ")" },
          answer: "'Hello' + 'World'",
          alternateAnswers: ["'Hello'+'World'"],
          expect: "HelloWorld"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "'김' + '코딩' 을 출력해봐",
          guide: "성 + 이름!",
          template: { before: "print(", after: ")" },
          answer: "'김' + '코딩'",
          alternateAnswers: ["'김'+'코딩'"],
          expect: "김코딩"
        }
      },

      // 공백 포함
      {
        type: "explain",
        content: {
          lines: [
            "공백도 문자열이야!"
          ],
          code: "'Hello' + ' ' + 'World' → 'Hello World'\n'코딩' + ' ' + '최고!'  → '코딩 최고!'",
          note: "공백을 넣으려면 ' ' 를 더해줘야 해!"
        }
      },

      {
        type: "practice",
        content: {
          level: 1,
          task: "'코딩중학교' + ' ' + '1학년' 을 출력해봐",
          guide: "공백 ' ' 도 더하기!",
          template: { before: "print(", after: ")" },
          answer: "'코딩중학교' + ' ' + '1학년'",
          alternateAnswers: ["'코딩중학교'+' '+'1학년'"],
          expect: "코딩중학교 1학년"
        }
      },

      // 변수와 +
      {
        type: "explain",
        content: {
          lines: [
            "변수에 저장된 문자열도 이어붙일 수 있어!"
          ],
          code: "first = '김'\nlast = '코딩'\nprint(first + last)  → 김코딩",
          note: "변수끼리도 + 로 연결!"
        }
      },

      // ===== Lv.2: 변수 + 문자열 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "name = '코딩' 으로 저장하고, '안녕, ' + name + '!' 을 출력해봐",
          guide: "변수를 + 로 이어붙이기!",
          template: null,
          answer: "name = '코딩'\nprint('안녕, ' + name + '!')",
          expect: "안녕, 코딩!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'파이' + '썬' 의 결과는?",
          options: [
            "'파이썬'",
            "'파이 썬' (공백 자동 추가)",
            "에러"
          ],
          answer: 0,
          explanation: "문자열 + 는 그냥 이어붙이기야! 공백은 자동으로 안 들어가."
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 2,
          title: "문자열 이어붙이기",
          learned: [
            "'문자열' + '문자열' = 이어붙이기",
            "공백도 ' ' 로 직접 추가",
            "변수끼리도 + 로 연결 가능"
          ],
          canDo: "문자열을 자유롭게 이어붙일 수 있어!",
          emoji: "🔗"
        }
      },

      // ==================== CHAPTER 3: 문자열 반복 (*) ====================
      {
        type: "chapter",
        content: {
          num: 3,
          title: "문자열 반복 (*)",
          desc: "문자열을 여러 번 반복!"
        }
      },

      // * 연산자
      {
        type: "explain",
        content: {
          lines: [
            "문자열 * 숫자 = 반복!"
          ],
          code: "'ha' * 3     → 'hahaha'\n'=-' * 5     → '=-=-=-=-'\n'화이팅! ' * 2 → '화이팅! 화이팅! '",
          note: "문자열을 숫자만큼 반복해줘!"
        }
      },

      // ===== Lv.1: 반복 =====
      {
        type: "practice",
        content: {
          level: 1,
          task: "'ha' * 3 을 출력해봐",
          guide: "* 는 반복!",
          template: { before: "print(", after: ")" },
          answer: "'ha' * 3",
          alternateAnswers: ["'ha'*3"],
          expect: "hahaha"
        }
      },
      {
        type: "practice",
        content: {
          level: 1,
          task: "'화이팅! ' * 3 을 출력해봐",
          guide: "응원을 3번 반복!",
          template: { before: "print(", after: ")" },
          answer: "'화이팅! ' * 3",
          alternateAnswers: ["'화이팅! '*3"],
          expect: "화이팅! 화이팅! 화이팅! "
        }
      },

      // + 와 * 조합
      {
        type: "explain",
        content: {
          lines: [
            "+ 와 * 를 같이 쓸 수도 있어!"
          ],
          code: "'=' * 10           → '=========='\n'[ ' + '★' * 3 + ' ]' → '[ ★★★ ]'",
          note: "조합하면 다양한 표현이 가능해!"
        }
      },

      {
        type: "practice",
        content: {
          level: 2,
          task: "'=' * 15 를 출력해봐 (구분선 만들기)",
          guide: "* 로 반복!",
          template: { before: "print(", after: ")" },
          answer: "'=' * 15",
          alternateAnswers: ["'='*15"],
          expect: "==============="
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'ab' * 3 의 결과는?",
          options: [
            "'ababab'",
            "'ab ab ab' (공백 추가)",
            "'aabbbb' (각 글자 반복)"
          ],
          answer: 0,
          explanation: "* 는 문자열 전체를 반복해! 'ab' * 3 = 'ababab'"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 3,
          title: "문자열 반복",
          learned: [
            "'문자열' * 숫자 = 반복",
            "+ 와 * 를 조합 가능",
            "구분선, 장식 등에 유용"
          ],
          canDo: "문자열을 원하는 만큼 반복할 수 있어!",
          emoji: "🔁"
        }
      },

      // ==================== CHAPTER 4: TypeError & str() ====================
      {
        type: "chapter",
        content: {
          num: 4,
          title: "문자열 + 숫자 = 에러!",
          desc: "str()로 해결하기!"
        }
      },

      // TypeError 소개
      {
        type: "explain",
        content: {
          lines: [
            "⚠️ 문자열 + 숫자는 에러!"
          ],
          code: "'나이: ' + 16       → TypeError!\n'점수: ' + 95.5    → TypeError!",
          isError: true,
          note: "문자열과 숫자는 + 로 바로 합칠 수 없어!"
        }
      },

      // 에러 퀴즈
      {
        type: "errorQuiz",
        content: {
          question: "이 코드를 실행하면 어떻게 될까?",
          code: "age = 16\nprint('나이: ' + age)",
          options: [
            "나이: 16 출력",
            "TypeError! 문자열 + 정수 불가",
            "나이:  출력 (숫자 무시)"
          ],
          answer: 1,
          explanation: "Python에서 문자열과 숫자는 + 로 합칠 수 없어. str()로 변환해야 해!"
        }
      },

      // str() 해결
      {
        type: "explain",
        content: {
          lines: [
            "str()로 숫자를 문자열로 변환!"
          ],
          code: "str(16)     → '16'   (문자열로 변환)\nstr(95.5)   → '95.5'\n\n'나이: ' + str(16)  → '나이: 16' ✅",
          note: "str()로 감싸면 문자열로 바꿔줘!"
        }
      },

      // ===== Lv.2: str() 활용 =====
      {
        type: "practice",
        content: {
          level: 2,
          task: "'점수: ' + str(100) 을 출력해봐",
          guide: "str()로 변환 후 +!",
          template: { before: "print(", after: ")" },
          answer: "'점수: ' + str(100)",
          alternateAnswers: ["'점수: '+str(100)"],
          expect: "점수: 100"
        }
      },
      {
        type: "practice",
        content: {
          level: 2,
          task: "score = 95 로 저장하고, '내 점수는 ' + str(score) + '점!' 을 출력해봐",
          guide: "변수를 str()로 변환!",
          template: null,
          answer: "score = 95\nprint('내 점수는 ' + str(score) + '점!')",
          expect: "내 점수는 95점!"
        }
      },

      // 퀴즈
      {
        type: "quiz",
        content: {
          question: "'오늘은 ' + 7 + '월이야!' 를 출력하려면?",
          options: [
            "'오늘은 ' + 7 + '월이야!' 그대로",
            "'오늘은 ' + str(7) + '월이야!'",
            "에러라서 불가능"
          ],
          answer: 1,
          explanation: "숫자 7을 str(7)로 변환해야 해! '오늘은 ' + str(7) + '월이야!' = '오늘은 7월이야!'"
        }
      },

      // 요약
      {
        type: "summary",
        content: {
          num: 4,
          title: "str() 변환",
          learned: [
            "문자열 + 숫자 → TypeError!",
            "str(숫자)로 문자열로 변환",
            "'텍스트' + str(숫자) → 가능!"
          ],
          canDo: "숫자를 문자열로 변환해서 이어붙일 수 있어!",
          emoji: "🔄"
        }
      },

      // ==================== CHAPTER 5: 이름표 프로젝트 ====================
      {
        type: "chapter",
        content: {
          num: 5,
          title: "나의 이름표 만들기",
          desc: "배운 걸 모두 활용!"
        }
      },

      // 복습
      {
        type: "interleaving",
        content: {
          message: "str() 변환 기억나?",
          task: "'나이: ' + str(14) 출력해봐",
          template: null,
          answer: "print('나이: ' + str(14))",
          expect: "나이: 14"
        }
      },

      // 프로젝트 소개
      {
        type: "explain",
        content: {
          lines: [
            "🏷️ 나의 이름표 만들기!"
          ],
          code: "=== 나의 이름표 ===\n이름: 김코딩\n학교: 코딩중학교 1학년\n응원: 화이팅! 화이팅! 화이팅! ",
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
          task: "제목 출력 ('=' * 3 + ' 나의 이름표 ' + '=' * 3)",
          target: "=== 나의 이름표 ===",
          hint: "print('=' * 3 + ' 나의 이름표 ' + '=' * 3)",
          done: [],
          answer: "print('=' * 3 + ' 나의 이름표 ' + '=' * 3)"
        }
      },
      {
        type: "project",
        content: {
          step: 2,
          total: 4,
          task: "이름 출력 (name = '김코딩')",
          target: "이름: 김코딩",
          hint: "print('이름: ' + name)",
          done: ["=== 나의 이름표 ==="],
          answer: "print('이름: ' + name)"
        }
      },
      {
        type: "project",
        content: {
          step: 3,
          total: 4,
          task: "학교 출력 (school = '코딩중학교', grade = 1)",
          target: "학교: 코딩중학교 1학년",
          hint: "print('학교: ' + school + ' ' + str(grade) + '학년')",
          done: ["=== 나의 이름표 ===", "이름: 김코딩"],
          answer: "print('학교: ' + school + ' ' + str(grade) + '학년')"
        }
      },
      {
        type: "project",
        content: {
          step: 4,
          total: 4,
          task: "응원 출력 ('화이팅! ' * 3)",
          target: "응원: 화이팅! 화이팅! 화이팅! ",
          hint: "print('응원: ' + '화이팅! ' * 3)",
          done: ["=== 나의 이름표 ===", "이름: 김코딩", "학교: 코딩중학교 1학년"],
          answer: "print('응원: ' + '화이팅! ' * 3)"
        }
      },

      // 최종 요약
      {
        type: "summary",
        content: {
          num: 5,
          title: "문자열 연산 마스터",
          learned: [
            "'문자열' + '문자열' = 이어붙이기",
            "'문자열' * 숫자 = 반복",
            "문자열 + 숫자 → TypeError",
            "str(숫자)로 변환 후 + 가능"
          ],
          canDo: "문자열을 자유자재로 연결하고 반복할 수 있어!",
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
