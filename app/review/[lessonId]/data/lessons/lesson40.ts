import type { LessonData } from '../types'

export const lesson40: LessonData = {
  id: "40",
  title: "Part 6 문제 20",
  description: "에러처리와 파일 총정리 문제!",
  steps: [
    // ⭐ 쉬움 (1~7)
    {
      type: "chapter",
      content: { num: 1, title: "⭐ 쉬움", desc: "기본 에러처리와 파일!" }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    print(10 / 2)\nexcept:\n    print('에러!')`,
        predict: { question: "출력 결과는?", options: ["5.0", "에러!", "5", "10 / 2"], answer: 0, feedback: "에러 안 남! 10/2 = 5.0 정상 출력" },
        result: "5.0"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    print(10 / 0)\nexcept:\n    print('에러!')`,
        predict: { question: "출력 결과는?", options: ["0", "10", "에러!", "프로그램 종료"], answer: 2, feedback: "0으로 나누기 → ZeroDivisionError → except!" },
        result: "에러!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    x = int('abc')\nexcept:\n    print('A')\nfinally:\n    print('B')`,
        predict: { question: "출력 결과는?", options: ["A만", "B만", "A 다음 B", "에러"], answer: 2, feedback: "except → 'A' → finally는 항상 실행 → 'B'" },
        result: "A\nB"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `with open('test.txt', 'w') as f:\n    f.write('Hello')`,
        predict: { question: "test.txt 내용은?", options: ["Hello", "hello", "HELLO", "빈 파일"], answer: 0, feedback: "write()는 정확히 입력한 대로 저장!" },
        result: "Hello"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `# test.txt에 'Hello'가 있을 때\nwith open('test.txt', 'a') as f:\n    f.write(' World')`,
        predict: { question: "test.txt 내용은?", options: [" World", "Hello World", "World Hello", "Hello\\n World"], answer: 1, feedback: "'a' 모드는 끝에 추가!" },
        result: "Hello World"
      }
    },
    {
      type: "practice",
      content: {
        level: 1, task: "___ 자리를 채우세요!", guide: "파일 열기 기본 구조", hint: "with ... as 구문!",
        template: "___ open('data.txt', 'r') ___ f:\n    text = f.read()\n    print(text)",
        blanksAnswer: ["with", "as"],
        answer: "with open('data.txt', 'r') as f:\n    text = f.read()\n    print(text)",
        alternateAnswers: [], expect: "",
        en: {
          task: "Fill in the blanks!",
          guide: "Basic file opening structure",
          hint: "with ... as syntax!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1, task: "___ 자리를 채우세요!", guide: "에러를 잡으려면?", hint: "except!",
        template: "try:\n    x = int(input())\n___ ValueError:\n    print('숫자를 입력하세요!')",
        blanksAnswer: ["except"],
        answer: "try:\n    x = int(input())\nexcept ValueError:\n    print('숫자를 입력하세요!')",
        alternateAnswers: [], expect: "",
        en: {
          task: "Fill in the blanks!",
          guide: "What do you write to catch an error?",
          hint: "except!"
        }
      }
    },
    { type: "reward", content: { emoji: "⭐", message: "쉬움 7문제 완료!" } },

    // ⭐⭐ 보통 (8~14)
    {
      type: "chapter",
      content: { num: 2, title: "⭐⭐ 보통", desc: "에러 종류와 파일 활용!" }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    x = int('10')\n    print(x + 5)\nexcept ValueError:\n    print('A')\nfinally:\n    print('C')`,
        predict: { question: "출력 결과는?", options: ["A C", "15 C", "15만", "A만"], answer: 1, feedback: "int('10')은 성공! → 15 → finally → C" },
        result: "15\nC"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    nums = [1, 2, 3]\n    print(nums[5])\nexcept IndexError:\n    print('A')\nexcept:\n    print('B')`,
        predict: { question: "출력 결과는?", options: ["A", "B", "A B", "에러"], answer: 0, feedback: "IndexError → 구체적인 except가 먼저!" },
        result: "A"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `with open('test.txt', 'w') as f:\n    f.write('A\\nB\\nC')`,
        predict: { question: "test.txt는 몇 줄?", options: ["1줄", "3줄 (A, B, C)", "2줄", "빈 파일"], answer: 1, feedback: "\\n = 줄바꿈! 3줄" },
        result: "A\nB\nC"
      }
    },
    {
      type: "practice",
      content: {
        level: 2, task: "___ 자리를 채워서 파일 읽기 에러를 처리하세요!", guide: "없는 파일 에러 처리",
        hint: "try + 'r' + FileNotFoundError",
        template: "___:\n    with open('x.txt', '___') as f:\n        print(f.read())\nexcept ___:\n    print('파일 없음!')",
        blanksAnswer: ["try", "r", "FileNotFoundError"],
        answer: "try:\n    with open('x.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('파일 없음!')",
        alternateAnswers: [], expect: "파일 없음!",
        en: {
          task: "Fill in the blanks to handle file read errors!",
          guide: "Handle missing file error",
          hint: "try + 'r' + FileNotFoundError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2, task: "___ 자리를 채워서 리스트를 파일에 저장하세요!", guide: "for문으로 리스트 → 파일",
        hint: "'w' / write / '\\n'",
        template: "names = ['철수', '영희', '민수']\nwith open('names.txt', '___') as f:\n    for name in names:\n        f.___(name + '___')\nprint('저장!')",
        blanksAnswer: ["w", "write", "\\n"],
        answer: "names = ['철수', '영희', '민수']\nwith open('names.txt', 'w') as f:\n    for name in names:\n        f.write(name + '\\n')\nprint('저장!')",
        alternateAnswers: [], expect: "저장!",
        en: {
          task: "Fill in the blanks to save a list to a file!",
          guide: "Loop through list → file with for",
          hint: "'w' / write / '\\n'"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    x = int(input())  # 0\n    y = 10 / x\n    print(y)\nexcept ValueError:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')`,
        predict: { question: "출력 결과는?", options: ["A", "B", "0", "에러"], answer: 1, feedback: "10/0 → ZeroDivisionError → 'B'" },
        result: "B"
      }
    },
    {
      type: "practice",
      content: {
        level: 2, task: "___ 자리를 채워서 숫자만 입력받으세요!", guide: "반복 + 에러처리",
        hint: "while True + try + break + ValueError",
        template: "while True:\n    ___:\n        x = int(input('숫자: '))\n        ___\n    except ___:\n        print('숫자를 입력하세요!')",
        blanksAnswer: ["try", "break", "ValueError"],
        answer: "while True:\n    try:\n        x = int(input('숫자: '))\n        break\n    except ValueError:\n        print('숫자를 입력하세요!')",
        alternateAnswers: [], expect: "",
        en: {
          task: "Fill in the blanks to accept only numbers!",
          guide: "Loop + error handling",
          hint: "while True + try + break + ValueError"
        }
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 파일 모드 복습!", task: "___ 자리를 채우세요!",
        hint: "'a' / write",
        template: "with open('log.txt', '___') as f:\n    f.___('새 기록\\n')\nprint('추가!')",
        blanksAnswer: ["a", "write"],
        answer: "with open('log.txt', 'a') as f:\n    f.write('새 기록\\n')\nprint('추가!')",
        alternateAnswers: [], expect: "추가!",
        en: {
          message: "🔄 File mode review!",
          task: "Fill in the blanks!",
          hint: "'a' / write"
        }
      }
    },
    { type: "reward", content: { emoji: "⭐⭐", message: "보통 7문제 완료!" } },

    // ⭐⭐⭐ 어려움 (15~20)
    {
      type: "chapter",
      content: { num: 3, title: "⭐⭐⭐ 어려움", desc: "실전 문제!" }
    },
    {
      type: "practice",
      content: {
        level: 2.5, task: "___ 자리를 채워서 1~100 사이만 입력받으세요!", guide: "반복 + 에러처리 + 범위",
        hint: "while / try / break / ValueError",
        template: "___ True:\n    ___:\n        x = int(input('숫자(1-100): '))\n        if 1 <= x <= 100:\n            ___\n        print('범위 벗어남!')\n    except ___:\n        print('숫자를 입력하세요!')",
        blanksAnswer: ["while", "try", "break", "ValueError"],
        answer: "while True:\n    try:\n        x = int(input('숫자(1-100): '))\n        if 1 <= x <= 100:\n            break\n        print('범위 벗어남!')\n    except ValueError:\n        print('숫자를 입력하세요!')",
        alternateAnswers: [], expect: "",
        en: {
          task: "Fill in the blanks to accept only numbers between 1~100!",
          guide: "Loop + error handling + range check",
          hint: "while / try / break / ValueError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2.5, task: "___ 자리를 채워서 점수 저장/불러오기를 만드세요!", guide: "'w' + write + try + FileNotFoundError",
        hint: "'w' / write / try / FileNotFoundError",
        template: "def save(name, score):\n    with open('score.txt', '___') as f:\n        f.___(f'{name},{score}')\n\ndef load():\n    ___:\n        with open('score.txt', 'r') as f:\n            print(f.read())\n    except ___:\n        print('파일 없음!')",
        blanksAnswer: ["w", "write", "try", "FileNotFoundError"],
        answer: "def save(name, score):\n    with open('score.txt', 'w') as f:\n        f.write(f'{name},{score}')\n\ndef load():\n    try:\n        with open('score.txt', 'r') as f:\n            print(f.read())\n    except FileNotFoundError:\n        print('파일 없음!')",
        alternateAnswers: [], expect: "",
        en: {
          task: "Fill in the blanks to create score save/load functions!",
          guide: "'w' + write + try + FileNotFoundError",
          hint: "'w' / write / try / FileNotFoundError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3, task: "___ 자리를 채워서 메모장을 만드세요!", guide: "'a' + write + try + FileNotFoundError",
        hint: "'a' / write / try / FileNotFoundError",
        template: "with open('memo.txt', '___') as f:\n    f.___('새 메모\\n')\nprint('저장!')\n\n___:\n    with open('memo.txt', 'r') as f:\n        print(f.read())\nexcept ___:\n    print('메모 없음!')",
        blanksAnswer: ["a", "write", "try", "FileNotFoundError"],
        answer: "with open('memo.txt', 'a') as f:\n    f.write('새 메모\\n')\nprint('저장!')\n\ntry:\n    with open('memo.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('메모 없음!')",
        alternateAnswers: [], expect: "저장!",
        en: {
          task: "Fill in the blanks to create a notepad app!",
          guide: "'a' + write + try + FileNotFoundError",
          hint: "'a' / write / try / FileNotFoundError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2.5, task: "___ 자리를 채워서 안전한 나눗셈을 만드세요!", guide: "try / ZeroDivisionError / None",
        hint: "try / ZeroDivisionError / None",
        template: "def safe_divide(a, b):\n    ___:\n        return a / b\n    except ___:\n        return ___\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        blanksAnswer: ["try", "ZeroDivisionError", "None"],
        answer: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
        alternateAnswers: [], expect: "5.0\nNone",
        en: {
          task: "Fill in the blanks to create a safe division function!",
          guide: "try / ZeroDivisionError / None",
          hint: "try / ZeroDivisionError / None"
        }
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 기초 복습!", task: "___ 자리를 채우세요!",
        hint: "try + ValueError",
        template: "___:\n    x = int('abc')\nexcept ___:\n    print('변환 실패!')",
        blanksAnswer: ["try", "ValueError"],
        answer: "try:\n    x = int('abc')\nexcept ValueError:\n    print('변환 실패!')",
        alternateAnswers: [], expect: "변환 실패!",
        en: {
          message: "🔄 Basic review!",
          task: "Fill in the blanks!",
          hint: "try + ValueError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3, task: "___ 자리를 채워서 숫자 합계를 구하세요!", guide: "for + try + int + ValueError",
        hint: "for / try / int / ValueError",
        template: "total = 0\nlines = ['10', 'abc', '20', '30']\n___ line in lines:\n    ___:\n        total += ___(line)\n    except ___:\n        pass\nprint(f'합계: {total}')",
        blanksAnswer: ["for", "try", "int", "ValueError"],
        answer: "total = 0\nlines = ['10', 'abc', '20', '30']\nfor line in lines:\n    try:\n        total += int(line)\n    except ValueError:\n        pass\nprint(f'합계: {total}')",
        alternateAnswers: [], expect: "합계: 60",
        en: {
          task: "Fill in the blanks to calculate the sum of numbers!",
          guide: "for + try + int + ValueError",
          hint: "for / try / int / ValueError"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3, task: "___ 자리를 채워서 게임 세이브를 완성하세요!", guide: "'w' + write + try + FileNotFoundError",
        hint: "'w' / write / try / FileNotFoundError",
        template: "character = {'name': '용사', 'level': 5}\n\ndef save_game():\n    with open('save.txt', '___') as f:\n        f.write(character['name'] + '\\n')\n        f.___(str(character['level']))\n    print('저장!')\n\ndef load_game():\n    ___:\n        with open('save.txt', 'r') as f:\n            character['name'] = f.readline().strip()\n            character['level'] = int(f.readline().strip())\n        print('불러오기!')\n    except ___:\n        print('세이브 없음!')\n\nsave_game()",
        blanksAnswer: ["w", "write", "try", "FileNotFoundError"],
        answer: "character = {'name': '용사', 'level': 5}\n\ndef save_game():\n    with open('save.txt', 'w') as f:\n        f.write(character['name'] + '\\n')\n        f.write(str(character['level']))\n    print('저장!')\n\ndef load_game():\n    try:\n        with open('save.txt', 'r') as f:\n            character['name'] = f.readline().strip()\n            character['level'] = int(f.readline().strip())\n        print('불러오기!')\n    except FileNotFoundError:\n        print('세이브 없음!')\n\nsave_game()",
        alternateAnswers: [], expect: "저장!",
        en: {
          task: "Fill in the blanks to complete a game save system!",
          guide: "'w' + write + try + FileNotFoundError",
          hint: "'w' / write / try / FileNotFoundError"
        }
      }
    },
    { type: "reward", content: { emoji: "⭐⭐⭐", message: "어려움 6문제 완료!" } },

    // 마무리
    {
      type: "chapter",
      content: { num: 4, title: "🎉 Part 6 완료!", desc: "에러처리와 파일 마스터!" }
    },
    {
      type: "summary",
      content: {
        num: 1, title: "Part 6 총정리", emoji: "🏆",
        learned: [
          "try-except로 에러 처리",
          "ValueError, ZeroDivisionError, FileNotFoundError",
          "finally = 항상 실행",
          "with open('파일', 'w/r/a')로 파일 열기",
          "write()로 저장, read()/readlines()로 읽기",
          "while True + try-except로 안전한 입력"
        ],
        canDo: "에러처리와 파일 입출력을 자유자재로!"
      }
    },
    { type: "done", content: {} }
  ]
}
