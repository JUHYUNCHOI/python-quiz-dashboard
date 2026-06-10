import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "파일 읽기",
  emoji: "📖",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 저장한 파일을 다시 읽으려면?",
      content: `💭 파일에 데이터를 저장했으니까... 이제 **다시 읽어오는** 방법이 필요해! 'w'가 쓰기였으면 읽기는 뭘까?

\`\`\`python
with open('memo.txt', 'r') as f:
    내용 = f.read()
    print(내용)
\`\`\`

출력:
\`\`\`
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\`

**쓰기랑 뭐가 다를까?** 모양은 거의 같아요 — \`with open(...)\` 으로 펼치는 것도 똑같죠. 딱 두 군데가 달라요.
- 모드를 \`'w'\` 대신 **\`'r'\`** (read = 읽기) 로 줘요. "적으려고 펼친 게 아니라, **읽으려고** 펼쳤어" 라고 알려주는 거예요.
- \`write(내용)\` 으로 *집어넣는* 대신, **\`read()\`** 로 파일 안의 글자를 *꺼내와요*. 그래서 \`read()\` 는 꺼내온 내용을 **돌려주고**, 우리는 그걸 변수에 담아요(\`내용 = f.read()\`).

방향이 정반대예요. 쓰기는 내 글자를 → 파일 *안으로*, 읽기는 파일 속 글자를 → 내 변수 *밖으로*. 공책으로 치면, 쓰기는 펜으로 적기 / 읽기는 눈으로 읽기인 셈이죠.

> 💡 \`'w'\` 로 펼치면 공책이 *백지로 초기화* 되지만, \`'r'\` 로 펼치면 적힌 내용을 **건드리지 않고 그대로** 봐요. 읽기 모드에선 실수로 내용을 지울 일이 없어요.

@핵심: **'r' = read = 읽기 모드!** read()로 파일 전체를 한 번에 읽어!`
    },
    {
      id: "ch3-1",
      type: "interactive",
      title: "📚 읽기 메서드 비교 체험!",
      description: "read(), readline(), readlines() 차이를 직접 확인해보세요!",
      component: "readMethodDemo"
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "✏️ 파일 읽기 따라치기!",
      description: "with문으로 파일을 읽는 코드를 직접 써보세요!",
      component: "typeAlong",
      targetTitle: "파일 읽기 기본",
      targetDescription: "with open으로 파일 읽기",
      targetCode: "with open('memo.txt', 'r') as f:\n    내용 = f.read()\n    print(내용)",
      expectedOutput: "첫 번째 줄\n두 번째 줄"
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "빈칸 채우기: 파일 읽기",
      description: "파일을 읽는 코드를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "with open('data.txt', '___1___') as f:\n    내용 = f.___2___()\n    print(내용)",
      blanks: [
        { id: "1", answer: "r", hint: "read의 첫 글자!" },
        { id: "2", answer: "read", hint: "전체를 읽는 메서드!" }
      ],
      choices: ["r", "w", "a", "read", "readline", "write"],
      expectedOutput: ""
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "퀴즈!",
      content: "read()와 readlines()의 차이는?",
      options: [
        "차이 없음",
        "read()는 문자열, readlines()는 리스트",
        "read()는 한 줄, readlines()는 전체",
        "read()는 숫자, readlines()는 문자"
      ],
      answer: 1,
      explanation: "read()는 전체를 문자열로, readlines()는 줄별로 리스트로!"
    },
    {
      id: "ch3-5",
      type: "quiz",
      title: "예측해보세요!",
      content: `출력 결과는? (data.txt 내용: "hello")

\`\`\`python
with open('data.txt', 'r') as f:
    a = f.read()
    b = f.read()
print(len(a), len(b))
\`\`\``,
      options: ["5 5", "5 0", "0 5", "에러"],
      answer: 1,
      explanation: "read() 한 번 하면 끝까지 읽어서, 두 번째는 빈 문자열!"
    }
  ]
}
