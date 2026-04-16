import type { LessonData } from '../types'

export const lesson39: LessonData = {
  id: "39",
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
        lines: [],
        code: `def save_game():\n    with open('save.txt', 'w') as file:\n        file.write(character['name'] + '\\n')\n        file.write(str(character['HP']) + '\\n')\n        file.write(str(character['attack']) + '\\n')\n    print('saved!')`,
        result: "숫자는 str()로 변환해서 저장!",
        note: "'w' 모드 + \\n으로 줄바꿈!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `character = {'name': 'warrior', 'HP': 85}\n\nwith open('save.txt', 'w') as f:\n    f.write(character['name'] + '\\n')\n    f.write(str(character['HP']))`,
        predict: {
          question: "save.txt 내용은?",
          options: ["용사85", "용사\\n85", "용사 (줄바꿈) 85", "에러"],
          answer: 2,
          feedback: "\\n 때문에 '용사'와 '85'가 다른 줄에!"
        },
        en: {
          predict: {
            question: "What is the content of save.txt?",
            options: ["용사85", "용사\\n85", "용사 (newline) 85", "Error"],
            feedback: "Because of \\n, '용사' and '85' are on separate lines!"
          }
        },
        result: "warrior\n85"
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
        answer: "w",
        en: {
          task: "Fill in the blank with the right word!",
          guide: "What mode do you use to save to a file?",
          hint: "First letter of 'write'! 'w'"
        },
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
        lines: [],
        code: `def load_game():\n    try:\n        with open('save.txt', 'r') as file:\n            lines = file.readlines()\n            character['name'] = lines[0].strip()\n            character['HP'] = int(lines[1].strip())\n        print(f'Welcome back, {character["name"]}!')\n    except FileNotFoundError:\n        print('No save file found!')`,
        result: "try-except로 파일 없음 처리!",
        note: "strip()은 줄바꿈(\\n) 제거!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `try:\n    with open('missing.txt', 'r') as f:\n        print('load success!')\nexcept FileNotFoundError:\n    print('no save!')\nprint('game start!')`,
        predict: {
          question: "출력 결과는?",
          options: ["불러오기 성공! 게임 시작!", "세이브 없음! 게임 시작!", "에러", "세이브 없음!"],
          answer: 1,
          feedback: "파일 없음 → except → '세이브 없음!' → 계속 → '게임 시작!'"
        },
        en: {
          predict: {
            question: "What's the output?",
            options: ["불러오기 성공! 게임 시작!", "세이브 없음! 게임 시작!", "Error", "세이브 없음!"],
            feedback: "File not found → except → '세이브 없음!' → continues → '게임 시작!'"
          }
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
        en: {
          task: "Fill in the blanks to create a safe load function!",
          guide: "How do you handle errors when the file doesn't exist?",
          hint: "Wrap with try, file missing error: FileNotFoundError"
        },
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
        code: `while True:\n    print('\\n=== RPG Game ===')\n    print('1. New Game  2. Continue')\n    print('3. Save  4. Quit')\n    try:\n        choice = int(input('choose: '))\n        if choice == 4:\n            break\n    except ValueError:\n        print('enter a number!')`,
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
        en: {
          task: "Fill in the blanks to create a safe menu!",
          guide: "Combine infinite loop + error handling!",
          hint: "Infinite loop: while True / Error wrap: try / Invalid value: ValueError"
        },
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
        en: {
          message: "🔄 Quick review! Saving!",
          task: "Fill in the blanks to save data!",
          hint: "Write mode: 'w' / Number to string: str()"
        },
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
        en: {
          task: "Fill in the blanks to complete save/load functions!",
          guide: "Save with 'w', load with try + 'r'!",
          hint: "Save: 'w' mode / Load: try + 'r' mode / Error: FileNotFoundError"
        },
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
        en: {
          message: "🔄 Menu structure review!",
          task: "Fill in the blanks to create safe input!",
          hint: "Wrap with try, break to exit, ValueError for invalid input"
        },
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
        code: `with open('save.txt', 'r') as f:\n    f.write('data')`,
        options: ["'r' 모드에서 write 불가", "파일명 오류", "close() 필요", "문제 없음"],
        answer: 0,
        explanation: "'r'는 읽기 전용! 저장하려면 'w' 모드!",
        en: {
          question: "What's the problem with this save code?",
          options: ["Can't write in 'r' mode", "Wrong filename", "close() needed", "No problem"],
          explanation: "'r' is read-only! Use 'w' mode to save!"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 불러오기 코드의 문제점은?",
        code: `with open('save.txt', 'r') as f:\n    HP = f.readline()\n    print(HP + 10)`,
        options: ["문제 없음", "readline()은 문자열! int() 변환 필요", "파일이 안 열림", "print 오류"],
        answer: 1,
        explanation: "파일에서 읽은 건 항상 문자열! int()로 변환해야 계산 가능!",
        en: {
          question: "What's the problem with this load code?",
          options: ["No problem", "readline() returns a string! Need int() conversion", "File won't open", "print error"],
          explanation: "Data read from a file is always a string! You need int() to do math with it!"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드에 빠진 게 있어요!",
        code: `with open('save.txt', 'r') as f:\n    data = f.read()\n    print(data)\n# what if the file doesn't exist?`,
        options: ["문제 없음", "close() 필요", "try-except 필요 (FileNotFoundError)", "write 필요"],
        answer: 2,
        explanation: "파일이 없을 수도 있으니 try-except FileNotFoundError!",
        en: {
          question: "Something is missing in this code!",
          options: ["No problem", "close() needed", "Need try-except (FileNotFoundError)", "write needed"],
          explanation: "The file might not exist, so you need try-except FileNotFoundError!"
        }
      }
    },

    // 추가 스텝: predict + errorQuiz + practice + interleaving
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `try:
    x = int('abc')
    print('변환 성공')
except ValueError:
    print('변환 실패')
print('계속')`,
        predict: {
          question: "출력 결과는?",
          options: ["변환 성공 계속", "변환 실패 계속", "변환 실패", "에러"],
          answer: 1,
          feedback: "'abc'는 정수로 변환 불가 → ValueError → except 실행 → 그 다음 계속!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["변환 성공 계속", "변환 실패 계속", "변환 실패", "Error"],
            feedback: "'abc' can't be converted to int → ValueError → except runs → then continues!"
          }
        },
        result: "변환 실패\n계속"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `def read_hp(filename):
    try:
        with open(filename, 'r') as f:
            return int(f.readline().strip())
    except FileNotFoundError:
        return 100

hp = read_hp('없는파일.txt')
print(hp)`,
        predict: {
          question: "출력 결과는?",
          options: ["에러 발생", "0", "100", "None"],
          answer: 2,
          feedback: "파일 없음 → FileNotFoundError → except에서 100 반환!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["Error", "0", "100", "None"],
            feedback: "File not found → FileNotFoundError → except returns 100!"
          }
        },
        result: "100"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `lines = ['warrior\\n', '85\\n', 'knight\\n']
names = [l.strip() for l in lines]
print(names[1])`,
        predict: {
          question: "출력 결과는?",
          options: ["85\\n", "'85'", "85", "에러"],
          answer: 2,
          feedback: "strip()이 \\n을 제거! '85\\n'.strip() → '85' → 출력하면 85"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["85\\n", "'85'", "85", "Error"],
            feedback: "strip() removes \\n! '85\\n'.strip() → '85' → prints as 85"
          }
        },
        result: "85"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `data = {'name': 'warrior', 'HP': 100}

with open('save.txt', 'w') as f:
    for k, v in data.items():
        f.write(f'{k}:{v}\\n')

print('saved!')`,
        predict: {
          question: "출력 결과는?",
          options: ["이름:용사 HP:100", "저장 완료!", "에러", "{'이름': '용사', 'HP': 100}"],
          answer: 1,
          feedback: "파일 쓰기는 화면 출력이 없어요! 마지막 print만 출력됨!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            question: "What's the output?",
            options: ["이름:용사 HP:100", "저장 완료!", "Error", "{'이름': '용사', 'HP': 100}"],
            feedback: "Writing to file doesn't print to screen! Only the last print shows!"
          }
        },
        result: "저장 완료!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `try:
    hp = int(input('HP: '))
except:
    print('에러!')
print(hp)`,
        options: [
          "문제 없음",
          "except에서 hp가 정의 안 됐는데 print(hp) 사용",
          "try 문법 오류",
          "int() 사용 불가"
        ],
        answer: 1,
        explanation: "except 실행 시 hp가 정의되지 않아 print(hp)에서 NameError 발생! except에서도 hp에 기본값을 줘야 해요.",
        en: {
          question: "What's the problem with this code?",
          options: [
            "No problem",
            "hp is not defined in except, but print(hp) uses it",
            "Syntax error in try",
            "int() cannot be used"
          ],
          explanation: "If except runs, hp is undefined, causing NameError at print(hp)! Give hp a default in except too."
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 불러오기 코드의 문제점은?",
        code: `with open('save.txt', 'w') as f:
    lines = f.readlines()
    name = lines[0].strip()
print(name)`,
        options: [
          "close() 누락",
          "'w' 모드에서 readlines() 불가",
          "strip() 사용 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "'w'는 쓰기 전용! 파일을 읽으려면 'r' 모드를 써야 해요.",
        en: {
          question: "What's the problem with this load code?",
          options: [
            "Missing close()",
            "Can't use readlines() in 'w' mode",
            "strip() usage error",
            "No problem"
          ],
          explanation: "'w' is write-only! You need 'r' mode to read a file."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워서 파일에서 이름과 HP를 읽어 딕셔너리로 반환하는 함수를 완성하세요!",
        guide: "'r' 모드 + readlines() + strip() + int()!",
        hint: "줄1 = 이름, 줄2 = HP(int 변환 필요)",
        template: "def 불러오기():\n    try:\n        with open('save.txt', '___') as f:\n            줄들 = f.readlines()\n            return {'이름': 줄들[0].strip(), 'HP': ___(줄들[1].strip())}\n    except FileNotFoundError:\n        return {'이름': '신규', 'HP': 100}\n\nresult = 불러오기()\nprint(result['이름'])",
        blanksAnswer: ["r", "int"],
        answer: "def 불러오기():\n    try:\n        with open('save.txt', 'r') as f:\n            줄들 = f.readlines()\n            return {'이름': 줄들[0].strip(), 'HP': int(줄들[1].strip())}\n    except FileNotFoundError:\n        return {'이름': '신규', 'HP': 100}\n\nresult = 불러오기()\nprint(result['이름'])",
        en: {
          task: "Fill in the blanks to complete a function that reads name and HP from file into a dictionary!",
          guide: "'r' mode + readlines() + strip() + int()!",
          hint: "Line 1 = name, Line 2 = HP (needs int conversion)"
        },
        alternateAnswers: [],
        expect: "신규"
      }
    },
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "___ 자리를 채워서 점수를 파일에 저장하고 다시 읽는 함수를 완성하세요!",
        guide: "저장: 'w' + str() / 읽기: 'r' + int()!",
        hint: "숫자 저장 시 str() 변환, 읽을 때 int() 변환",
        template: "def save_score(score):\n    with open('score.txt', '___') as f:\n        f.write(___(score))\n    print('저장!')\n\ndef load_score():\n    with open('score.txt', 'r') as f:\n        return ___(f.read())\n\nsave_score(95)\nprint(load_score() + 5)",
        blanksAnswer: ["w", "str", "int"],
        answer: "def save_score(score):\n    with open('score.txt', 'w') as f:\n        f.write(str(score))\n    print('저장!')\n\ndef load_score():\n    with open('score.txt', 'r') as f:\n        return int(f.read())\n\nsave_score(95)\nprint(load_score() + 5)",
        en: {
          task: "Fill in the blanks to complete save and load score functions!",
          guide: "Save: 'w' + str() / Load: 'r' + int()!",
          hint: "Convert to str() when saving, convert to int() when loading"
        },
        alternateAnswers: [],
        expect: "저장!\n100"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "함수 복습! 기본값이 있는 함수 기억나요?",
        task: "___ 자리를 채워서 기본 이름이 '용사'인 캐릭터 생성 함수를 완성하세요!",
        hint: "기본값 있는 매개변수는 뒤에! def create(hp, name='용사')",
        template: "def create(hp, name=___):  \n    return {'이름': name, 'HP': hp}\n\np = create(100)\nprint(p['이름'])",
        answer: "'용사'",
        en: {
          message: "Function review! Remember parameters with default values?",
          task: "Fill in the blank to complete a character creation function with default name '용사'!",
          hint: "Parameter with default value goes last! def create(hp, name='용사')"
        },
        alternateAnswers: [],
        expect: "용사"
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
