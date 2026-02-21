import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "파일 모드 비교",
  emoji: "🔀",
  steps: [
    {
      id: "ch4-0",
      type: "interactive",
      title: "🔀 w / r / a 모드 체험!",
      description: "세 가지 모드로 같은 파일을 열어보세요! 결과가 어떻게 다를까요?",
      component: "fileModeSimulator"
    },
    {
      id: "ch4-1",
      type: "explain",
      title: "➕ 'a' 모드 = 추가!",
      content: `## 기존 파일에 내용 추가하기

\`\`\`python
with open('log.txt', 'a') as f:
    f.write('새로운 기록!\\n')
\`\`\`

기존 내용 뒤에 추가!

**w는 덮어쓰기, a는 추가!**

| 모드 | 뜻 | 파일 없으면 | 파일 있으면 |
|------|----|-----------|-----------|
| 'w' | 쓰기 | 새로 만듦 | **내용 삭제** 후 쓰기 |
| 'r' | 읽기 | **에러!** | 읽기만 |
| 'a' | 추가 | 새로 만듦 | **끝에 추가** |`
    },
    {
      id: "ch4-2",
      type: "interactive",
      title: "빈칸 채우기: 추가 모드",
      description: "기존 파일에 기록을 추가하세요!",
      component: "fillInBlank",
      codeTemplate: "with open('log.txt', '___1___') as f:\n    f.___2___('새 기록!\\n')",
      blanks: [
        { id: "1", answer: "a", hint: "append의 첫 글자!" },
        { id: "2", answer: "write", hint: "파일에 쓰는 메서드!" }
      ],
      choices: ["a", "w", "r", "write", "read", "append"],
      expectedOutput: ""
    },
    {
      id: "ch4-3",
      type: "quiz",
      title: "퀴즈!",
      content: "랭킹을 계속 기록하려면?",
      options: ["'w' 모드", "'r' 모드", "'a' 모드", "'x' 모드"],
      answer: 2,
      explanation: "'a' 모드로 열면 기존 기록 유지하면서 새 기록 추가!"
    },
    {
      id: "ch4-4",
      type: "quiz",
      title: "예측해보세요!",
      content: `실행 후 a.txt 내용은?

\`\`\`python
with open('a.txt', 'w') as f:
    f.write('X')

with open('a.txt', 'w') as f:
    f.write('Y')
\`\`\``,
      options: ["XY", "X", "Y", "X\\nY"],
      answer: 2,
      explanation: "'w'는 매번 덮어쓰기! 두 번째 'Y'만 남아요!"
    }
  ]
}
