import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "불러오기 기능 만들기",
  emoji: "📂",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 파일에서 줄들을 읽으려면?",
      content: `💭 저장할 때 한 줄씩 썼으니까... 읽을 때도 **줄 단위로** 읽어야겠지? 근데 줄 끝에 붙은 **\\n**은 어떡하지?

\`\`\`python
with open('save.txt', 'r') as 파일:
    줄들 = 파일.readlines()
    캐릭터['이름'] = 줄들[0].strip()
    # strip() = 줄 끝의 \\n 제거!
\`\`\`

→ readlines()는 **줄 리스트**로 읽어! \`['용사\\n', '100\\n', ...]\`

@핵심: **readlines()로 줄 리스트** → **strip()으로 \\n 제거** → 깨끗한 데이터!`
    },
    {
      id: "ch3-0a",
      type: "explain",
      title: "💭 문자열을 숫자로 바꾸고, 파일이 없으면?",
      content: `💭 이름은 문자열이라 바로 쓸 수 있는데... **HP, 공격력은 숫자**잖아! 그리고 세이브 파일이 **없을 때**는?

\`\`\`python
# 숫자 데이터는 int()로 변환!
캐릭터['HP'] = int(줄들[1].strip())
캐릭터['공격력'] = int(줄들[2].strip())

# 파일이 없을 수도 있으니 try-except!
try:
    with open('save.txt', 'r') as 파일:
        # 읽기 코드...
except FileNotFoundError:
    print('세이브 파일이 없어요!')
\`\`\`

@핵심: **int()로 숫자 변환** + **try-except로 파일 없음 대비** = 안전한 불러오기!`
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
