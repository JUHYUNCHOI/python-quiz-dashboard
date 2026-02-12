import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "불러오기 기능 만들기",
  emoji: "📂",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "📂 불러오기 = 읽기 + 에러 처리!",
      content: `## 파일에서 캐릭터 데이터 불러오기

\`\`\`python
def 불러오기():
    try:
        with open('save.txt', 'r') as 파일:
            줄들 = 파일.readlines()
            캐릭터['이름'] = 줄들[0].strip()
            캐릭터['HP'] = int(줄들[1].strip())
            캐릭터['공격력'] = int(줄들[2].strip())
            캐릭터['레벨'] = int(줄들[3].strip())
            캐릭터['경험치'] = int(줄들[4].strip())
        print(f'{캐릭터["이름"]}님, 다시 오셨군요!')
    except FileNotFoundError:
        print('세이브 파일이 없어요!')
\`\`\`

### 핵심 포인트
- **try-except**로 파일 없음 처리
- **readlines()**로 줄별로 읽기
- **strip()**으로 \\n 제거
- **int()**로 숫자 변환`
    },
    {
      id: "ch3-1",
      type: "interactive",
      title: "✏️ 불러오기 따라치기!",
      description: "try-except로 안전하게 파일을 읽는 코드를 써보세요!",
      component: "typeAlong",
      targetTitle: "안전한 불러오기",
      targetDescription: "try-except로 파일 읽기",
      targetCode: "try:\n    with open('save.txt', 'r') as f:\n        이름 = f.readline().strip()\n    print(f'{이름}님 환영!')\nexcept FileNotFoundError:\n    print('세이브 없음!')",
      expectedOutput: "세이브 없음!"
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "빈칸 채우기: 불러오기",
      description: "불러오기 함수를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    with open('save.txt', '___2___') as f:\n        줄들 = f.readlines()\n        이름 = 줄들[0].___3___()\nexcept ___4___:\n    print('파일 없음!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다!" },
        { id: "2", answer: "r", hint: "읽기 모드!" },
        { id: "3", answer: "strip", hint: "줄바꿈 제거!" },
        { id: "4", answer: "FileNotFoundError", hint: "파일 없을 때 에러!" }
      ],
      choices: ["try", "except", "r", "w", "strip", "split", "FileNotFoundError", "ValueError"],
      expectedOutput: ""
    },
    {
      id: "ch3-3",
      type: "quiz",
      title: "퀴즈!",
      content: "readlines()로 읽은 줄에 strip()을 쓰는 이유는?",
      options: [
        "대문자로 변환하려고",
        "줄바꿈(\\n)을 제거하려고",
        "공백을 추가하려고",
        "숫자로 변환하려고"
      ],
      answer: 1,
      explanation: "readlines()는 각 줄 끝에 \\n이 붙어있어요! strip()으로 제거!"
    }
  ]
}
