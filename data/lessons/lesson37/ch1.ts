import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "⭐ 쉬움 (1~7)",
  emoji: "⭐",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "🎯 Part 6 문제 20!",
      content: `## 목표: 20문제 중 16문제 이상 맞추기!

| 난이도 | 문제 수 |
|--------|---------|
| ⭐ 쉬움 | 7문제 |
| ⭐⭐ 보통 | 7문제 |
| ⭐⭐⭐ 어려움 | 6문제 |

Let's go! 🚀`
    },
    {
      id: "ch1-1",
      type: "quiz",
      title: "문제 1",
      content: `출력 결과는?\n\n\`\`\`python\ntry:\n    print(10 / 2)\nexcept:\n    print('에러!')\n\`\`\``,
      options: ["5.0", "에러!", "5", "10 / 2"],
      answer: 0,
      explanation: "에러 안 남! 10/2 = 5.0 정상 출력!"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "문제 2",
      content: `출력 결과는?\n\n\`\`\`python\ntry:\n    print(10 / 0)\nexcept:\n    print('에러!')\n\`\`\``,
      options: ["0", "에러!", "무한", "프로그램 종료"],
      answer: 1,
      explanation: "0으로 나누기 → ZeroDivisionError → except → '에러!'"
    },
    {
      id: "ch1-3",
      type: "quiz",
      title: "문제 3",
      content: `출력 결과는?\n\n\`\`\`python\ntry:\n    x = int('abc')\nexcept:\n    print('A')\nfinally:\n    print('B')\n\`\`\``,
      options: ["A만", "B만", "A 다음 B", "에러"],
      answer: 2,
      explanation: "except → 'A' → finally는 항상 실행 → 'B'"
    },
    {
      id: "ch1-4",
      type: "quiz",
      title: "문제 4",
      content: `실행 후 test.txt 내용은?\n\n\`\`\`python\nwith open('test.txt', 'w') as f:\n    f.write('Hello')\n\`\`\``,
      options: ["Hello", "hello", "빈 파일", "에러"],
      answer: 0,
      explanation: "write()는 정확히 입력한 대로 저장! Hello"
    },
    {
      id: "ch1-5",
      type: "quiz",
      title: "문제 5",
      content: `test.txt에 'Hello'가 있을 때, 실행 후 내용은?\n\n\`\`\`python\nwith open('test.txt', 'a') as f:\n    f.write(' World')\n\`\`\``,
      options: [" World", "Hello World", "World Hello", "에러"],
      answer: 1,
      explanation: "'a' 모드는 끝에 추가! Hello + ' World' = Hello World"
    },
    {
      id: "ch1-6",
      type: "interactive",
      title: "문제 6: 빈칸 채우기",
      description: "파일 열기 기본 구조를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___ open('data.txt', 'r') ___2___ f:\n    text = f.read()\n    print(text)",
      blanks: [
        { id: "1", answer: "with", hint: "안전하게 파일 여는 문법!" },
        { id: "2", answer: "as", hint: "~로서, ~처럼" }
      ],
      choices: ["with", "as", "open", "for", "in", "try"],
      expectedOutput: ""
    },
    {
      id: "ch1-7",
      type: "interactive",
      title: "문제 7: 빈칸 채우기",
      description: "에러를 잡는 코드를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "try:\n    x = int(input())\n___1___ ValueError:\n    print('숫자를 입력하세요!')",
      blanks: [
        { id: "1", answer: "except", hint: "에러를 잡아!" }
      ],
      choices: ["except", "try", "finally", "if", "else", "catch"],
      expectedOutput: ""
    }
  ]
}
