import type { LessonData } from '../types'

export const lesson38: LessonData = {
  id: "38",
  title: "파일 읽고 쓰기",
  description: "파일로 데이터를 저장하고 불러와요!",
  steps: [
    // ============================================
    // Chapter 1: 파일 쓰기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "파일 쓰기",
        desc: "데이터를 파일에 저장해요!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["📝 파일 쓰기 기본!"],
        code: "# with문 = 자동으로 파일 닫아줌!\nwith open('test.txt', 'w') as f:  # w = write\n    f.write('안녕하세요!')\n    f.write('\\n')  # 줄바꿈\n    f.write('반갑습니다!')\n\n# test.txt 내용:\n# 안녕하세요!\n# 반갑습니다!",
        result: "'w' = 쓰기 모드, \\n = 줄바꿈",
        note: "with문 쓰면 close() 안 해도 OK!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["🧠 파일 내용은?"],
        code: "with open('a.txt', 'w') as f:\n    f.write('A')\n    f.write('B')\n    f.write('C')",
        predict: {
          question: "a.txt 내용은?",
          options: ["A\\nB\\nC", "ABC", "A B C", "CBA"],
          answer: 1,
          feedback: "\\n 없으면 줄바꿈 없이 이어서! ABC"
        },
        result: "ABC"
      }
    },
    
    // ⭐ 연습 1 (빈칸 1개: 쓰기 모드)
    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리에 알맞은 글자를 넣어보세요!",
        guide: "파일에 쓰려면 어떤 모드?",
        hint: "write의 첫 글자!",
        template: "with open('player.txt', '___') as f:\n    f.write('홍길동\\n')\n    f.write('100')\nprint('저장 완료!')",
        blanksAnswer: ["w"],
        answer: "with open('player.txt', 'w') as f:\n    f.write('홍길동\\n')\n    f.write('100')\nprint('저장 완료!')",
        alternateAnswers: [],
        expect: "저장 완료!"
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "📝",
        message: "파일 쓰기 완료!"
      }
    },
    
    // ============================================
    // Chapter 2: 파일 읽기
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "파일 읽기",
        desc: "저장한 데이터를 불러와요!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["📖 파일 읽기 3가지!"],
        code: "# 1. read() - 전체를 문자열로\nwith open('a.txt', 'r') as f:\n    전체 = f.read()  # \"ABC\"\n\n# 2. readline() - 한 줄씩\nwith open('a.txt', 'r') as f:\n    첫줄 = f.readline()\n\n# 3. readlines() - 전체를 리스트로\nwith open('a.txt', 'r') as f:\n    줄들 = f.readlines()  # ['A\\n', 'B\\n', 'C']",
        result: "'r' = read = 읽기 모드",
        note: "read()는 문자열, readlines()는 리스트!"
      }
    },
    
    {
      type: "quiz",
      content: {
        question: "read()와 readlines()의 차이는?",
        options: [
          "차이 없음",
          "read()는 문자열, readlines()는 리스트",
          "read()는 한 줄, readlines()는 전체",
          "read()는 숫자, readlines()는 문자"
        ],
        answer: 1,
        explanation: "read()는 전체를 문자열로, readlines()는 줄별로 리스트로!"
      }
    },
    
    // ⭐ 연습 2 (빈칸 2개: open + 읽기 모드)
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "___ 자리를 채워서 파일을 읽어보세요!",
        guide: "파일을 여는 함수와 읽기 모드는?",
        hint: "파일 여는 함수: open / 읽기 모드: 'r'",
        template: "with ___('player.txt', '___') as f:\n    내용 = f.read()\n    print(내용)",
        blanksAnswer: ["open", "r"],
        answer: "with open('player.txt', 'r') as f:\n    내용 = f.read()\n    print(내용)",
        alternateAnswers: [],
        expect: "홍길동\n100"
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "📖",
        message: "파일 읽기 완료!"
      }
    },
    
    // ============================================
    // Chapter 3: 파일 모드
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "파일 모드",
        desc: "w, r, a 차이점!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["📊 파일 모드 비교!"],
        code: "# 'w' - write (쓰기)\n# → 파일 없으면 생성\n# → 파일 있으면 내용 지우고 새로 씀\n\n# 'r' - read (읽기)\n# → 파일 없으면 에러!\n# → 파일 있으면 읽기만 가능\n\n# 'a' - append (추가)\n# → 파일 없으면 생성\n# → 파일 있으면 끝에 추가",
        result: "w = 덮어쓰기, r = 읽기, a = 추가",
        note: "기록 쌓으려면 'a' 모드!"
      }
    },
    
    {
      type: "quiz",
      content: {
        question: "랭킹을 계속 기록하려면?",
        options: ["'w' 모드", "'r' 모드", "'a' 모드", "'x' 모드"],
        answer: 2,
        explanation: "'a' 모드로 열면 기존 기록 유지하면서 새 기록 추가!"
      }
    },
    
    // 예측 퀴즈 — w 덮어쓰기 확인
    {
      type: "explain",
      content: {
        lines: ["🧠 'w'로 두 번 쓰면?"],
        code: "with open('a.txt', 'w') as f:\n    f.write('X')\n\nwith open('a.txt', 'w') as f:\n    f.write('Y')\n\nwith open('a.txt', 'r') as f:\n    print(f.read())",
        predict: {
          question: "출력 결과는?",
          options: ["XY", "X", "Y", "에러"],
          answer: 2,
          feedback: "'w'는 매번 덮어쓰기! 두 번째 'Y'만 남아요!"
        },
        result: "Y"
      }
    },
    
    // ⭐ 연습 3 (빈칸 2개: 추가 모드 + write)
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 기록을 추가하세요!",
        guide: "기존 내용 유지하면서 추가하려면?",
        hint: "추가 모드: 'a' / 쓰는 함수: write",
        template: "with open('scores.txt', '___') as f:\n    f.___('150점\\n')\nprint('점수 추가!')",
        blanksAnswer: ["a", "write"],
        answer: "with open('scores.txt', 'a') as f:\n    f.write('150점\\n')\nprint('점수 추가!')",
        alternateAnswers: [],
        expect: "점수 추가!"
      }
    },
    
    // 인터리빙 1 (빈칸 2개: 읽기 복습)
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 읽기 복습!",
        task: "___ 자리를 채워서 파일을 읽으세요!",
        hint: "읽기 모드: 'r' / 전체 읽기: read()",
        template: "with open('memo.txt', '___') as f:\n    내용 = f.___()\n    print(내용)",
        blanksAnswer: ["r", "read"],
        answer: "with open('memo.txt', 'r') as f:\n    내용 = f.read()\n    print(내용)",
        alternateAnswers: [],
        expect: ""
      }
    },
    
    {
      type: "reward",
      content: {
        emoji: "📊",
        message: "파일 모드 이해!"
      }
    },
    
    // ============================================
    // Chapter 4: 에러 처리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "파일 에러 처리",
        desc: "파일이 없으면?"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["⚠️ 파일 없으면 에러!"],
        code: "# 없는 파일 읽으려면?\ntry:\n    with open('save.txt', 'r') as f:\n        데이터 = f.read()\n        print(f'불러오기: {데이터}')\nexcept FileNotFoundError:\n    print('저장 파일이 없어요!')",
        result: "FileNotFoundError = 파일 없음!",
        note: "try-except로 에러 처리!"
      }
    },
    
    {
      type: "explain",
      content: {
        lines: ["🧠 파일이 없을 때?"],
        code: "try:\n    with open('없는파일.txt', 'r') as f:\n        print('A')\nexcept FileNotFoundError:\n    print('B')\nprint('C')",
        predict: {
          question: "출력 결과는?",
          options: ["A C", "B C", "A B C", "에러"],
          answer: 1,
          feedback: "파일 없음 → except → 'B' → 프로그램 계속 → 'C'"
        },
        result: "B\nC"
      }
    },
    
    // ⭐ 연습 4 (빈칸 3개: try + 읽기 모드 + 에러명)
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 파일을 안전하게 읽으세요!",
        guide: "파일이 없으면 '저장 없음!' 출력!",
        hint: "try로 감싸고, 읽기 모드 'r', 파일 없는 에러는 FileNotFoundError!",
        template: "___:\n    with open('score.txt', '___') as f:\n        점수 = f.read()\n        print(f'점수: {점수}')\nexcept ___:\n    print('저장 없음!')",
        blanksAnswer: ["try", "r", "FileNotFoundError"],
        answer: "try:\n    with open('score.txt', 'r') as f:\n        점수 = f.read()\n        print(f'점수: {점수}')\nexcept FileNotFoundError:\n    print('저장 없음!')",
        alternateAnswers: [],
        expect: "저장 없음!"
      }
    },
    
    // 인터리빙 2 (빈칸 3개: 쓰기 + str 변환 복습)
    {
      type: "interleaving",
      content: {
        message: "🔄 쓰기 복습!",
        task: "___ 자리를 채워서 점수를 저장하세요!",
        hint: "쓰기 모드: 'w' / 쓰는 함수: write / 숫자를 문자로: str()",
        template: "점수 = 100\nwith open('score.txt', '___') as f:\n    f.___(___(\uc810\uc218))\nprint('저장!')",
        blanksAnswer: ["w", "write", "str"],
        answer: "점수 = 100\nwith open('score.txt', 'w') as f:\n    f.write(str(점수))\nprint('저장!')",
        alternateAnswers: [],
        expect: "저장!"
      }
    },
    
    // ⭐ 연습 5 (빈칸 3개: 추가 모드 + write + str)
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "___ 자리를 채워서 랭킹 기록을 추가하세요!",
        guide: "기존 기록 유지 + 새 이름과 점수 추가!",
        hint: "추가 모드: 'a', 쓰기: write, 숫자를 문자로: str",
        template: "이름 = '홍길동'\n점수 = 100\nwith open('ranking.txt', '___') as f:\n    f.___(이름 + ': ' + ___(점수) + '\\n')\nprint('랭킹 추가!')",
        blanksAnswer: ["a", "write", "str"],
        answer: "이름 = '홍길동'\n점수 = 100\nwith open('ranking.txt', 'a') as f:\n    f.write(이름 + ': ' + str(점수) + '\\n')\nprint('랭킹 추가!')",
        alternateAnswers: [],
        expect: "랭킹 추가!"
      }
    },
    
    // 인터리빙 3 (빈칸 3개: 에러 처리 복습)
    {
      type: "interleaving",
      content: {
        message: "🔄 에러 처리 복습!",
        task: "___ 자리를 채워서 파일을 안전하게 읽으세요!",
        hint: "try로 감싸고, read()로 읽고, 파일 없으면 FileNotFoundError!",
        template: "___:\n    with open('data.txt', 'r') as f:\n        print(f.___())\nexcept ___:\n    print('파일 없음!')",
        blanksAnswer: ["try", "read", "FileNotFoundError"],
        answer: "try:\n    with open('data.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('파일 없음!')",
        alternateAnswers: [],
        expect: "파일 없음!"
      }
    },

    {
      type: "reward",
      content: {
        emoji: "✅",
        message: "에러 처리 완료!"
      }
    },
    
    // ============================================
    // Chapter 5: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "에러 탐정",
        desc: "실수 찾기!"
      }
    },
    
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "with open('test.txt', 'w') as f\n    f.write('hello')",
        options: [
          "with문 뒤에 : 빠짐",
          "write 오류",
          "파일명 오류",
          "문제 없음"
        ],
        answer: 0,
        explanation: "with문 끝에 콜론(:)이 필요해요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "with open('data.txt', 'r') as f:\n    f.write('hello')",
        options: [
          "파일명 오류",
          "'r' 모드에서 write 불가",
          "close() 필요",
          "문제 없음"
        ],
        answer: 1,
        explanation: "'r'는 읽기 전용! 쓰려면 'w'나 'a' 모드 필요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: "f = open('test.txt', 'w')\nf.write('hello')\n# f.close() 안 함",
        options: [
          "open 오류",
          "write 오류",
          "close() 안 해서 데이터 손실 가능",
          "문제 없음"
        ],
        answer: 2,
        explanation: "with문 쓰면 자동 close()! with문 권장!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 출력은?",
        code: "with open('a.txt', 'w') as f:\n    f.write('A')\nwith open('a.txt', 'w') as f:\n    f.write('B')\nwith open('a.txt', 'r') as f:\n    print(f.read())",
        options: [
          "A",
          "B",
          "AB",
          "BA"
        ],
        answer: 1,
        explanation: "'w' 모드는 덮어쓰기! 두 번째 'B'만 남아요!"
      }
    },
    
    // ============================================
    // Chapter 6: 마무리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "마무리",
        desc: "파일 다루기 총정리!"
      }
    },
    
    {
      type: "summary",
      content: {
        num: 1,
        title: "파일 읽고 쓰기",
        emoji: "📁",
        learned: [
          "with open('파일', '모드') as f: 로 열기",
          "'w' = 쓰기 (덮어씀)",
          "'r' = 읽기",
          "'a' = 추가",
          "read() = 전체 문자열",
          "readlines() = 줄별 리스트",
          "FileNotFoundError = 파일 없음"
        ],
        canDo: "게임 데이터를 저장하고 불러올 수 있어요!"
      }
    },
    
    {
      type: "done",
      content: {}
    }
  ]
}
