import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "파일에 쓰기",
  emoji: "📝",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "📝 파일 쓰기 기본!",
      content: `## 파일 열기 → 쓰기 → 닫기

\`\`\`python
파일 = open('test.txt', 'w')  # w = write (쓰기)
파일.write('안녕하세요!')
파일.close()
\`\`\`

test.txt 파일이 생기고 "안녕하세요!"가 저장됨!

**'w' = write = 쓰기 모드**`
    },
    {
      id: "ch2-1",
      type: "explain",
      title: "✨ with문으로 더 안전하게!",
      content: `## with문 = 자동으로 파일 닫아줌!

\`\`\`python
with open('test.txt', 'w') as f:
    f.write('안녕하세요!')
# 여기서 자동으로 close()
\`\`\`

**with문 쓰면 close() 안 해도 됨!** 앞으로 with문만 쓸 거예요.`
    },
    {
      id: "ch2-2",
      type: "interactive",
      title: "✏️ 파일 쓰기 따라치기!",
      description: "with문으로 파일에 쓰는 코드를 직접 써보세요!",
      component: "typeAlong",
      targetTitle: "파일 쓰기 기본",
      targetDescription: "with open으로 파일에 쓰기",
      targetCode: "with open('hi.txt', 'w') as f:\n    f.write('안녕!')",
      expectedOutput: ""
    },
    {
      id: "ch2-3",
      type: "interactive",
      title: "빈칸 채우기: 파일 쓰기",
      description: "파일에 데이터를 저장하세요!",
      component: "fillInBlank",
      codeTemplate: "with ___1___('data.txt', 'w') as f:\n    f.___2___('Hello!')",
      blanks: [
        { id: "1", answer: "open", hint: "파일을 여는 함수!" },
        { id: "2", answer: "write", hint: "파일에 쓰는 메서드!" }
      ],
      choices: ["open", "write", "read", "close", "file", "save"],
      expectedOutput: ""
    },
    {
      id: "ch2-4",
      type: "quiz",
      title: "예측해보세요!",
      content: `파일 내용은?

\`\`\`python
with open('a.txt', 'w') as f:
    f.write('A')
    f.write('B')
    f.write('C')
\`\`\``,
      options: ["A\\nB\\nC", "ABC", "A B C", "CBA"],
      answer: 1,
      explanation: "\\n 없으면 줄바꿈 없이 이어서 써요! ABC"
    },
    {
      id: "ch2-5",
      type: "quiz",
      title: "퀴즈!",
      content: "'w' 모드로 파일 열면?",
      options: [
        "기존 내용 뒤에 추가",
        "기존 내용 지우고 새로 씀",
        "읽기만 가능",
        "에러 발생"
      ],
      answer: 1,
      explanation: "'w'는 덮어쓰기! 기존 내용이 사라져요!"
    }
  ]
}
