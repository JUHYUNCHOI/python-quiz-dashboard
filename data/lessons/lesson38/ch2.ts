import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "파일에 쓰기",
  emoji: "📝",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 파일에 글자를 저장하려면?",
      content: `💭 파일에 데이터를 **저장**하고 싶어! 파이썬에서 파일을 **열고 → 쓰고 → 닫는** 방법은?

\`\`\`python
파일 = open('test.txt', 'w')  # w = write (쓰기)
파일.write('안녕하세요!')
파일.close()
\`\`\`

test.txt 파일이 생기고 "안녕하세요!"가 저장됨!

**왜 3단계일까?** 공책에 적는 모습을 떠올리면 딱 맞아요.
- **\`open(...)\`** — 공책을 *펼치는* 단계. \`'w'\` 는 "쓰기 모드로 펼쳐줘" 라는 뜻이에요. (메모리 속 변수와 달리, 파일은 *먼저 열어야* 손댈 수 있어요.)
- **\`write(...)\`** — 펼친 공책에 *글자를 적는* 단계.
- **\`close()\`** — 공책을 *덮어서 정리하는* 단계.

**\`close()\` 가 왜 중요해요?** 사실 파이썬은 \`write()\` 한 내용을 곧바로 디스크에 적지 않고 잠깐 손에 들고 있다가(버퍼), \`close()\` 할 때 한꺼번에 디스크로 보내요. 그래서 닫지 않으면 — 적었다고 생각한 내용이 **파일에 안 남아있을 수도** 있어요. 펼쳐만 두고 덮지 않은 공책 같은 거죠.

@핵심: **open('파일', 'w')** → **write()** → **close()** = 파일 쓰기 3단계!`
    },
    {
      id: "ch2-1",
      type: "explain",
      title: "💭 close() 깜빡하면 어쩌지?",
      content: `💭 매번 close()를 써야 하는데... **깜빡 잊으면** 문제가 생길 수도 있잖아! 자동으로 닫아주는 방법은 없을까?

🚪 **문을 열면 꼭 닫아야 한다** — 파일도 똑같아요. 열어두고 안 닫으면 내용이 디스크에 안 적히거나, 컴퓨터가 "이 파일 누가 쓰고 있나?" 하고 계속 붙잡고 있어요. 그런데 사람은 늘 깜빡하죠. 코드가 길어지면 \`close()\` 한 줄 빼먹기 딱 좋아요.

그래서 파이썬은 *알아서 닫아주는* 방법을 준비해뒀어요 — **\`with\` 문**.

\`\`\`python
with open('test.txt', 'w') as f:
    f.write('안녕하세요!')
# 여기서 자동으로 close()
\`\`\`

\`with\` 블록(들여쓴 부분)을 **빠져나가는 순간** 파이썬이 대신 \`close()\` 를 눌러줘요. 들어갈 때 연 문을, 나올 때 자동으로 닫아주는 셈이죠.

**진짜 좋은 점:** 중간에 *에러가 나서* 코드가 멈춰도 — \`with\` 는 그래도 파일을 닫아줘요. 직접 \`close()\` 를 쓰면 에러가 나는 순간 그 줄까지 못 가서 파일이 열린 채 남거든요. 그래서 앞으로는 \`open()...close()\` 대신 **\`with\` 문만** 쓸 거예요. 더 짧고, 더 안전해요.

@핵심: **with문** 쓰면 close() 자동! 안전하고 편리해!`
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
