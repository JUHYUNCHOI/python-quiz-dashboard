import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "⭐⭐⭐ 어려움 (15~20)",
  emoji: "⭐⭐⭐",
  steps: [
    {
      id: "ch3-0",
      type: "interactive",
      title: "문제 15: 범위 검증 입력",
      description: "1~100 사이 숫자만 입력받는 코드!",
      component: "fillInBlank",
      codeTemplate: "___1___ True:\n    ___2___:\n        x = int(input('숫자(1-100): '))\n        if 1 <= x <= 100:\n            ___3___\n        print('범위 벗어남!')\n    except ___4___:\n        print('숫자를 입력하세요!')",
      blanks: [
        { id: "1", answer: "while", hint: "무한 반복!" },
        { id: "2", answer: "try", hint: "시도!" },
        { id: "3", answer: "break", hint: "범위 내면 탈출!" },
        { id: "4", answer: "ValueError", hint: "잘못된 값!" }
      ],
      choices: ["while", "for", "try", "except", "break", "return", "ValueError", "TypeError"],
      expectedOutput: ""
    },
    {
      id: "ch3-1",
      type: "interactive",
      title: "문제 16: 점수 저장/불러오기",
      description: "점수를 파일에 저장하고 불러오세요!",
      component: "fillInBlank",
      codeTemplate: "def save_score(name, score):\n    with open('score.txt', '___1___') as f:\n        f.___2___(f'{name},{score}')\n\ndef load_score():\n    ___3___:\n        with open('score.txt', 'r') as f:\n            return f.read()\n    except ___4___:\n        return '파일 없음!'",
      blanks: [
        { id: "1", answer: "w", hint: "쓰기 모드!" },
        { id: "2", answer: "write", hint: "파일에 쓰기!" },
        { id: "3", answer: "try", hint: "시도!" },
        { id: "4", answer: "FileNotFoundError", hint: "파일 없을 때!" }
      ],
      choices: ["w", "r", "a", "write", "read", "try", "except", "FileNotFoundError", "ValueError"],
      expectedOutput: ""
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "문제 17: 간단한 메모장",
      description: "메모 추가(a모드) + 읽기(r모드) + try-except!",
      component: "fillInBlank",
      codeTemplate: "# 메모 추가\nwith open('memo.txt', '___1___') as f:\n    f.___2___('새 메모\\n')\n\n# 메모 읽기\n___3___:\n    with open('memo.txt', 'r') as f:\n        print(f.read())\nexcept ___4___:\n    print('메모 없음!')",
      blanks: [
        { id: "1", answer: "a", hint: "추가 모드!" },
        { id: "2", answer: "write", hint: "파일에 쓰기!" },
        { id: "3", answer: "try", hint: "시도!" },
        { id: "4", answer: "FileNotFoundError", hint: "파일 없을 때!" }
      ],
      choices: ["a", "w", "r", "write", "read", "try", "except", "FileNotFoundError", "ValueError"],
      expectedOutput: ""
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "문제 18: 안전한 나눗셈",
      description: "에러시 None을 반환하는 함수!",
      component: "fillInBlank",
      codeTemplate: "def safe_divide(a, b):\n    ___1___:\n        return a / b\n    except ___2___:\n        return ___3___",
      blanks: [
        { id: "1", answer: "try", hint: "시도!" },
        { id: "2", answer: "ZeroDivisionError", hint: "0으로 나누기!" },
        { id: "3", answer: "None", hint: "파이썬의 '없음'!" }
      ],
      choices: ["try", "except", "ZeroDivisionError", "ValueError", "None", "0", "False", "return"],
      expectedOutput: ""
    },
    {
      id: "ch3-4",
      type: "interactive",
      title: "문제 19: 숫자 합계 (abc 무시)",
      description: "리스트에서 숫자만 골라 합계 구하기!",
      component: "fillInBlank",
      codeTemplate: "total = 0\nlines = ['10', 'abc', '20', '30']\n___1___ line in lines:\n    ___2___:\n        total += ___3___(line)\n    except ___4___:\n        pass\nprint(f'합계: {total}')",
      blanks: [
        { id: "1", answer: "for", hint: "반복문!" },
        { id: "2", answer: "try", hint: "시도!" },
        { id: "3", answer: "int", hint: "문자열→숫자!" },
        { id: "4", answer: "ValueError", hint: "잘못된 값!" }
      ],
      choices: ["for", "while", "try", "except", "int", "str", "ValueError", "TypeError"],
      expectedOutput: "합계: 60"
    },
    {
      id: "ch3-5",
      type: "interactive",
      title: "문제 20: 게임 세이브",
      description: "저장/불러오기 시스템 완성!",
      component: "fillInBlank",
      codeTemplate: "def save_game(name, level):\n    with open('save.txt', '___1___') as f:\n        f.write(name + '\\n')\n        f.___2___(___3___(level))\n    print('저장!')\n\ndef load_game():\n    ___4___:\n        with open('save.txt', 'r') as f:\n            name = f.readline().strip()\n            level = int(f.readline().strip())\n        print(f'{name} Lv.{level}')\n    except ___5___:\n        print('세이브 없음!')",
      blanks: [
        { id: "1", answer: "w", hint: "쓰기 모드!" },
        { id: "2", answer: "write", hint: "파일에 쓰기!" },
        { id: "3", answer: "str", hint: "숫자→문자열!" },
        { id: "4", answer: "try", hint: "시도!" },
        { id: "5", answer: "FileNotFoundError", hint: "파일 없을 때!" }
      ],
      choices: ["w", "r", "a", "write", "read", "str", "int", "try", "except", "FileNotFoundError", "ValueError"],
      expectedOutput: "저장!"
    }
  ]
}
