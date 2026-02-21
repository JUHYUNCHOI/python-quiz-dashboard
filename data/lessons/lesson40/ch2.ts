import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "⭐⭐ 보통 (8~14)",
  emoji: "⭐⭐",
  steps: [
    {
      id: "ch2-0",
      type: "quiz",
      title: "문제 8",
      content: `출력 결과는?\n\n\`\`\`python\ntry:\n    x = int('10')\n    print(x + 5)\nexcept ValueError:\n    print('A')\nfinally:\n    print('C')\n\`\`\``,
      options: ["A C", "15 C", "15만", "A만"],
      answer: 1,
      explanation: "int('10')은 성공! → 15 출력 → finally 항상 실행 → C"
    },
    {
      id: "ch2-1",
      type: "quiz",
      title: "문제 9",
      content: `출력 결과는?\n\n\`\`\`python\ntry:\n    nums = [1, 2, 3]\n    print(nums[5])\nexcept IndexError:\n    print('A')\nexcept:\n    print('B')\n\`\`\``,
      options: ["A", "B", "A B", "에러"],
      answer: 0,
      explanation: "인덱스 5 없음 → IndexError → 더 구체적인 except 'A'가 먼저!"
    },
    {
      id: "ch2-2",
      type: "quiz",
      title: "문제 10",
      content: `실행 후 test.txt는 몇 줄?\n\n\`\`\`python\nwith open('test.txt', 'w') as f:\n    f.write('A\\nB\\nC')\n\`\`\``,
      options: ["1줄", "3줄 (A, B, C)", "2줄", "빈 파일"],
      answer: 1,
      explanation: "\\n = 줄바꿈! A, B, C가 각각 한 줄씩 3줄!"
    },
    {
      id: "ch2-3",
      type: "interactive",
      title: "문제 11: 없는 파일 에러 처리",
      description: "파일이 없을 때 에러 처리 코드를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    with open('x.txt', '___2___') as f:\n        print(f.read())\nexcept ___3___:\n    print('파일 없음!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도!" },
        { id: "2", answer: "r", hint: "읽기 모드!" },
        { id: "3", answer: "FileNotFoundError", hint: "파일 없을 때 에러!" }
      ],
      choices: ["try", "except", "r", "w", "a", "FileNotFoundError", "ValueError", "IndexError"],
      expectedOutput: "파일 없음!"
    },
    {
      id: "ch2-4",
      type: "interactive",
      title: "문제 12: 리스트를 파일에 저장",
      description: "리스트를 파일에 한 줄씩 저장하세요!",
      component: "fillInBlank",
      codeTemplate: "names = ['철수', '영희', '민수']\nwith open('names.txt', '___1___') as f:\n    for name in names:\n        f.___2___(name + '___3___')",
      blanks: [
        { id: "1", answer: "w", hint: "쓰기 모드!" },
        { id: "2", answer: "write", hint: "파일에 쓰기!" },
        { id: "3", answer: "\\n", hint: "줄바꿈!" }
      ],
      choices: ["w", "r", "a", "write", "read", "\\n", "\\t", " "],
      expectedOutput: ""
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "문제 13",
      content: `입력이 0일 때 출력은?\n\n\`\`\`python\ntry:\n    x = int(input())  # 0\n    y = 10 / x\n    print(y)\nexcept ValueError:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')\n\`\`\``,
      options: ["A", "B", "0", "에러"],
      answer: 1,
      explanation: "int(0)은 성공! → 10/0 → ZeroDivisionError → 'B'"
    },
    {
      id: "ch2-6",
      type: "interactive",
      title: "문제 14: 숫자만 입력받기",
      description: "제대로 입력할 때까지 반복하는 코드!",
      component: "fillInBlank",
      codeTemplate: "___1___ True:\n    ___2___:\n        x = int(input('숫자: '))\n        ___3___\n    except ___4___:\n        print('숫자를 입력하세요!')",
      blanks: [
        { id: "1", answer: "while", hint: "무한 반복!" },
        { id: "2", answer: "try", hint: "시도!" },
        { id: "3", answer: "break", hint: "성공하면 탈출!" },
        { id: "4", answer: "ValueError", hint: "잘못된 값 에러!" }
      ],
      choices: ["while", "for", "try", "except", "break", "continue", "ValueError", "TypeError"],
      expectedOutput: ""
    }
  ]
}
