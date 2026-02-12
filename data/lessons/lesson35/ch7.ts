import { Chapter } from '../types'

export const ch7: Chapter = {
  id: "ch7",
  title: "정리",
  emoji: "📝",
  steps: [
    {
      id: "ch7-0",
      type: "explain",
      title: "📋 파일 다루기 정리!",
      content: `## 기본 패턴

\`\`\`python
with open('파일.txt', '모드') as f:
    # 작업
\`\`\`

## 파일 모드
- **'w'** — 쓰기 (덮어씀)
- **'r'** — 읽기
- **'a'** — 추가

## 읽기 메서드
- \`f.read()\` → 전체를 문자열로
- \`f.readline()\` → 한 줄만 문자열로
- \`f.readlines()\` → 전체를 리스트로

### 🎯 핵심!
- with문으로 안전하게 열기
- w = 덮어쓰기, r = 읽기, a = 추가
- 파일 없음 → FileNotFoundError
- try-except로 에러 처리!`
    },
    {
      id: "ch7-1",
      type: "interactive",
      title: "빈칸 채우기: 최종 정리",
      description: "파일 읽고 쓰기 총정리!",
      component: "fillInBlank",
      codeTemplate: "# 파일에 쓰기\nwith open('a.txt', '___1___') as f:\n    f.write('Hello!')\n\n# 파일에서 읽기\nwith open('a.txt', '___2___') as f:\n    print(f.read())",
      blanks: [
        { id: "1", answer: "w", hint: "write의 첫 글자!" },
        { id: "2", answer: "r", hint: "read의 첫 글자!" }
      ],
      choices: ["w", "r", "a", "x", "rw", "wr"],
      expectedOutput: "Hello!"
    },
    {
      id: "ch7-2",
      type: "quiz",
      title: "마지막 퀴즈!",
      content: "게임 기록을 계속 쌓으려면?",
      options: [
        "'w' 모드 사용",
        "'r' 모드 사용",
        "'a' 모드 사용",
        "모드 상관없음"
      ],
      answer: 2,
      explanation: "'a' 모드로 열면 기존 내용 뒤에 추가돼요!"
    }
  ]
}
