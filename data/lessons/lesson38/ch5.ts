import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "파일 에러 처리",
  emoji: "⚠️",
  steps: [
    {
      id: "ch5-0",
      type: "explain",
      title: "💭 없는 파일을 열려고 하면?",
      content: `💭 파일을 읽으려고 했는데... 그 파일이 **존재하지 않으면** 어떻게 될까? 프로그램이 멈출까?

\`\`\`python
with open('없는파일.txt', 'r') as f:
    내용 = f.read()
\`\`\`

\`\`\`
FileNotFoundError:
No such file or directory: '없는파일.txt'
\`\`\`

try-except로 처리할 수 있어요!

@핵심: 없는 파일 읽기 → **FileNotFoundError!** try-except로 잡자!`
    },
    {
      id: "ch5-1",
      type: "interactive",
      title: "✏️ 파일 에러 처리 따라치기!",
      description: "try-except로 파일 에러를 처리하는 코드를 써보세요!",
      component: "typeAlong",
      targetTitle: "파일 에러 처리",
      targetDescription: "FileNotFoundError를 잡아요",
      targetCode: "try:\n    with open('x.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('파일 없음!')",
      expectedOutput: "파일 없음!"
    },
    {
      id: "ch5-2",
      type: "interactive",
      title: "빈칸 채우기: 파일 에러 처리",
      description: "파일이 없어도 안 꺼지게!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    with open('save.txt', 'r') as f:\n        print(f.read())\nexcept ___2___:\n    print('저장 파일 없음!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다!" },
        { id: "2", answer: "FileNotFoundError", hint: "파일 없을 때 에러!" }
      ],
      choices: ["try", "except", "FileNotFoundError", "ValueError", "if", "open"],
      expectedOutput: "저장 파일 없음!"
    },
    {
      id: "ch5-3",
      type: "quiz",
      title: "예측해보세요!",
      content: `파일이 없을 때 출력은?

\`\`\`python
try:
    with open('x.txt', 'r') as f:
        print('A')
except FileNotFoundError:
    print('B')
print('C')
\`\`\``,
      options: ["A C", "B C", "A B C", "에러"],
      answer: 1,
      explanation: "파일 없음 → except → 'B' 출력 → 프로그램 계속 → 'C' 출력"
    }
  ]
}
