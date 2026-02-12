import type { LessonData } from '../types'

export const lesson36: LessonData = {
  id: "36",
  title: "미니 프로젝트: 게임 세이브",
  description: "에러처리 + 파일로 게임 세이브 시스템을 만들어요!",
  steps: [
    {
      type: "chapter",
      content: { num: 1, title: "게임 세이브 만들기", desc: "RPG 게임 세이브 시스템!" }
    },
    {
      type: "explain",
      content: {
        lines: ["🎮 이런 걸 만들 거야!"],
        code: `# === RPG 게임 ===\n# 1. 새 게임\n# 2. 이어하기 (불러오기)\n# 3. 저장하기\n# 4. 몬스터 잡기\n# 5. 상태 보기\n# 6. 종료\n\n# save.txt 파일 형식:\n# 용사       ← 이름\n# 85        ← HP\n# 25        ← 공격력\n# 3         ← 레벨\n# 45        ← 경험치`,
        result: "파일로 게임 데이터를 저장/불러오기!",
        note: "try-except + with open 조합!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["📦 캐릭터 데이터 구조"],
        code: `import random\n\n캐릭터 = {\n    '이름': '',\n    'HP': 100,\n    '공격력': 25,\n    '레벨': 1,\n    '경험치': 0\n}`,
        result: "딕셔너리 = 여러 데이터를 하나로!",
        note: "이 데이터를 파일에 저장할 거야!"
      }
    },

    // Chapter 2: 저장
    {
      type: "chapter",
      content: { num: 2, title: "저장 기능", desc: "캐릭터 데이터를 파일에 저장!" }
    },
    {
      type: "explain",
      content: {
        lines: ["💾 저장 = 파일에 쓰기!"],
        code: `def 저장하기():\n    with open('save.txt', 'w') as 파일:\n        파일.write(캐릭터['이름'] + '\\n')\n        파일.write(str(캐릭터['HP']) + '\\n')\n        파일.write(str(캐릭터['공격력']) + '\\n')\n    print('저장 완료!')`,
        result: "숫자는 str()로 변환해서 저장!",
        note: "'w' 모드 + \\n으로 줄바꿈!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["🧠 저장 후 파일 내용은?"],
        code: `캐릭터 = {'이름': '용사', 'HP': 85}\n\nwith open('save.txt', 'w') as f:\n    f.write(캐릭터['이름'] + '\\n')\n    f.write(str(캐릭터['HP']))`,
        predict: {
          question: "save.txt 내용은?",
          options: ["용사85", "용사\\n85", "용사 (줄바꿈) 85", "에러"],
          answer: 2,
          feedback: "\\n 때문에 '용사'와 '85'가 다른 줄에!"
        },
        result: "용사\n85"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리에 알맞은 단어를 넣어보세요!",
        guide: "파일에 저장하려면 어떤 모드?",
        hint: "write의 첫 글자! 'w'",
        template: "def 저장하기():\n    with open('save.txt', '___') as f:\n        f.write('용사\\n')\n        f.write('100')\n    print('저장 완료!')\n\n저장하기()",
        blanksAnswer: ["w"],
        answer: "def 저장하기():\n    with open('save.txt', 'w') as f:\n        f.write('용사\\n')\n        f.write('100')\n    print('저장 완료!')\n\n저장하기()",
        alternateAnswers: [],
        expect: "저장 완료!"
      }
    },
    { type: "reward", content: { emoji: "💾", message: "저장 기능 완료!" } },

    // Chapter 3: 불러오기
    {
      type: "chapter",
      content: { num: 3, title: "불러오기 기능", desc: "파일에서 데이터를 읽어와요!" }
    },
    {
      type: "explain",
      content: {
        lines: ["📂 불러오기 = 파일 읽기 + 에러 처리!"],
        code: `def 불러오기():\n    try:\n        with open('save.txt', 'r') as 파일:\n            줄들 = 파일.readlines()\n            캐릭터['이름'] = 줄들[0].strip()\n            캐릭터['HP'] = int(줄들[1].strip())\n        print(f'{캐릭터["이름"]}님, 다시 오셨군요!')\n    except FileNotFoundError:\n        print('세이브 파일이 없어요!')`,
        result: "try-except로 파일 없음 처리!",
        note: "strip()은 줄바꿈(\\n) 제거!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["🧠 세이브 파일이 없을 때?"],
        code: `try:\n    with open('없는파일.txt', 'r') as f:\n        print('불러오기 성공!')\nexcept FileNotFoundError:\n    print('세이브 없음!')\nprint('게임 시작!')`,
        predict: {
          question: "출력 결과는?",
          options: ["불러오기 성공! 게임 시작!", "세이브 없음! 게임 시작!", "에러", "세이브 없음!"],
          answer: 1,
          feedback: "파일 없음 → except → '세이브 없음!' → 계속 → '게임 시작!'"
        },
        result: "세이브 없음!\n게임 시작!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "___ 자리를 채워서 안전한 불러오기를 만드세요!",
        guide: "파일이 없을 때 에러 처리하려면?",
        hint: "try로 감싸고, 파일 없음 에러: FileNotFoundError",
        template: "def 불러오기():\n    ___:\n        with open('save.txt', 'r') as f:\n            이름 = f.readline().strip()\n        print(f'{이름}님 환영!')\n    except ___:\n        print('세이브 없음!')\n\n불러오기()",
        blanksAnswer: ["try", "FileNotFoundError"],
        answer: "def 불러오기():\n    try:\n        with open('save.txt', 'r') as f:\n            이름 = f.readline().strip()\n        print(f'{이름}님 환영!')\n    except FileNotFoundError:\n        print('세이브 없음!')\n\n불러오기()",
        alternateAnswers: [],
        expect: "세이브 없음!"
      }
    },
    { type: "reward", content: { emoji: "📂", message: "불러오기 기능 완료!" } },

    // Chapter 4: 메인 메뉴
    {
      type: "chapter",
      content: { num: 4, title: "메인 메뉴", desc: "while + try-except로 메뉴 만들기!" }
    },
    {
      type: "explain",
      content: {
        lines: ["🎮 메인 메뉴 구조"],
        code: `while True:\n    print('\\n=== RPG 게임 ===')\n    print('1. 새 게임  2. 이어하기')\n    print('3. 저장  4. 종료')\n    try:\n        선택 = int(input('선택: '))\n        if 선택 == 4:\n            break\n    except ValueError:\n        print('숫자를 입력하세요!')`,
        result: "while True + try-except = 안전한 메뉴!",
        note: "숫자 아닌 입력도 에러 안 남!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 안전한 메뉴를 만드세요!",
        guide: "무한 반복 + 에러 처리 조합!",
        hint: "무한 반복: while True / 에러 감싸기: try / 잘못된 값: ValueError",
        template: "___ True:\n    print('1.시작 2.종료')\n    ___:\n        선택 = int(input('선택: '))\n        if 선택 == 2:\n            break\n    except ___:\n        print('숫자만!')",
        blanksAnswer: ["while", "try", "ValueError"],
        answer: "while True:\n    print('1.시작 2.종료')\n    try:\n        선택 = int(input('선택: '))\n        if 선택 == 2:\n            break\n    except ValueError:\n        print('숫자만!')",
        alternateAnswers: [],
        expect: ""
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 저장 복습!",
        task: "___ 자리를 채워서 데이터를 저장하세요!",
        hint: "쓰기 모드: 'w' / 숫자→문자: str()",
        template: "with open('save.txt', '___') as f:\n    f.write('용사\\n')\n    f.write(___(85) + '\\n')\nprint('저장!')",
        blanksAnswer: ["w", "str"],
        answer: "with open('save.txt', 'w') as f:\n    f.write('용사\\n')\n    f.write(str(85) + '\\n')\nprint('저장!')",
        alternateAnswers: [],
        expect: "저장!"
      }
    },
    { type: "reward", content: { emoji: "🎮", message: "메인 메뉴 완료!" } },

    // Chapter 5: 통합
    {
      type: "chapter",
      content: { num: 5, title: "전체 통합", desc: "저장 + 불러오기 + 메뉴 합치기!" }
    },
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "___ 자리를 채워서 저장/불러오기를 완성하세요!",
        guide: "저장은 'w', 불러오기는 try + 'r'!",
        hint: "저장: 'w' 모드 / 불러오기: try + 'r' 모드 / 에러: FileNotFoundError",
        template: "def save(name):\n    with open('save.txt', '___') as f:\n        f.write(name)\n    print('저장!')\n\ndef load():\n    ___:\n        with open('save.txt', '___') as f:\n            print(f.read())\n    except ___:\n        print('파일 없음!')\n\nsave('용사')\nload()",
        blanksAnswer: ["w", "try", "r", "FileNotFoundError"],
        answer: "def save(name):\n    with open('save.txt', 'w') as f:\n        f.write(name)\n    print('저장!')\n\ndef load():\n    try:\n        with open('save.txt', 'r') as f:\n            print(f.read())\n    except FileNotFoundError:\n        print('파일 없음!')\n\nsave('용사')\nload()",
        alternateAnswers: [],
        expect: "저장!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 메뉴 구조 복습!",
        task: "___ 자리를 채워서 안전한 입력을 만드세요!",
        hint: "try로 감싸고, 종료는 break, 잘못된 입력은 ValueError",
        template: "while True:\n    ___:\n        x = int(input('숫자: '))\n        ___\n    except ___:\n        print('다시!')",
        blanksAnswer: ["try", "break", "ValueError"],
        answer: "while True:\n    try:\n        x = int(input('숫자: '))\n        break\n    except ValueError:\n        print('다시!')",
        alternateAnswers: [],
        expect: ""
      }
    },
    { type: "reward", content: { emoji: "🏗️", message: "통합 완료!" } },

    // Chapter 6: 에러 퀴즈
    {
      type: "chapter",
      content: { num: 6, title: "에러 탐정", desc: "실수 찾기!" }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 저장 코드의 문제점은?",
        code: `with open('save.txt', 'r') as f:\n    f.write('데이터')`,
        options: ["'r' 모드에서 write 불가", "파일명 오류", "close() 필요", "문제 없음"],
        answer: 0,
        explanation: "'r'는 읽기 전용! 저장하려면 'w' 모드!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 불러오기 코드의 문제점은?",
        code: `with open('save.txt', 'r') as f:\n    HP = f.readline()\n    print(HP + 10)`,
        options: ["문제 없음", "readline()은 문자열! int() 변환 필요", "파일이 안 열림", "print 오류"],
        answer: 1,
        explanation: "파일에서 읽은 건 항상 문자열! int()로 변환해야 계산 가능!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드에 빠진 게 있어요!",
        code: `with open('save.txt', 'r') as f:\n    data = f.read()\n    print(data)\n# 파일이 없으면?`,
        options: ["문제 없음", "close() 필요", "try-except 필요 (FileNotFoundError)", "write 필요"],
        answer: 2,
        explanation: "파일이 없을 수도 있으니 try-except FileNotFoundError!"
      }
    },

    // 마무리
    {
      type: "chapter",
      content: { num: 7, title: "마무리", desc: "게임 세이브 총정리!" }
    },
    {
      type: "summary",
      content: {
        num: 1, title: "게임 세이브 시스템", emoji: "🎮",
        learned: [
          "딕셔너리로 게임 데이터 관리",
          "'w' 모드로 파일 저장",
          "'r' 모드 + try-except로 불러오기",
          "FileNotFoundError 처리",
          "while True + try-except로 메뉴",
          "함수로 기능 분리"
        ],
        canDo: "게임 세이브/로드 시스템을 만들 수 있어요!"
      }
    },
    { type: "done", content: {} }
  ]
}
