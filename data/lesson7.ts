// ============================================
// 레슨 7: print() 옵션
// ============================================
import { LessonData } from './types'

export const lesson7Data: LessonData = {
  id: "7",
  title: "print() 옵션",
  emoji: "⚙️",
  description: "print()를 더 자유롭게 사용해봐요!",
  chapters: [
    {
      id: "ch1",
      title: "sep 옵션",
      emoji: "🔸",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "⚙️ print()에 옵션이 있다!",
          content: `\`print()\` 안에 값을 여러 개 넣으면 사이에 **공백** 이 들어가요:

\`\`\`python
print("A", "B", "C")  # A B C
\`\`\`

그런데 "공백 말고 \`-\` 로 붙이고 싶은데?" 같은 순간이 생겨요.
이럴 때 쓰는 게 **옵션** 이에요. 오늘은 두 가지를 배워요:

- **sep (separator, 구분자)** — 값 *사이* 에 뭐가 들어갈지
- **end** — 출력 *끝* 에 뭐가 붙을지

옵션은 \`print()\` 안에 \`이름=값\` 형태로 같이 넣어주면 돼요.`
        },
        {
          id: "sep-explain",
          type: "explain",
          title: "🔸 sep — 값 사이를 바꾸기",
          content: `**sep** = separator (구분자). 값 *사이* 에 들어가는 글자예요.

\`\`\`python
print("A", "B", "C", sep="-")
# A-B-C

print("2024", "01", "15", sep="/")
# 2024/01/15

print("철수", "영희", "민수", sep=", ")
# 철수, 영희, 민수
\`\`\`

**기본값은 \`sep=" "\` (공백 한 칸)** — 그래서 평소엔 띄어쓰기로 나와요.

**어디 쓰나?**
- 날짜 \`/\` 로 붙이기 → \`2024/01/15\`
- 메뉴 \`, \` 로 나열 → \`철수, 영희, 민수\`
- 글자 딱 붙이기 → \`sep=""\`

⚠️ **자주 헷갈리는 것:** sep 은 값 *사이* 에만 들어가요. 맨 앞·맨 뒤엔 안 붙어요!`
        },
        {
          id: "sep-visualizer",
          type: "interactive",
          title: "🎬 sep 한 단계씩 눌러보기",
          component: "pyPrintOptionsVisualizer",
          componentProps: { hideEnd: true },
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "날짜를 -로 구분해서 출력하세요!",
          initialCode: "print(\"2024\", \"01\", \"15\", sep=___)",
          expectedOutput: "2024-01-15",
          hint: "sep=\"-\" 옵션 사용!",
          hint2: "print(\"2024\", \"01\", \"15\", sep=\"-\")"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 구분자 없애기!",
          task: "공백 없이 ABC를 붙여서 출력하세요!",
          initialCode: "print(\"A\", \"B\", \"C\", sep=___)",
          expectedOutput: "ABC",
          hint: "sep=\"\" (빈 문자열)로 설정!",
          hint2: "sep=\"\""
        },
        {
          id: "predict-sep",
          type: "predict",
          title: "💭 어떤 결과가 나올까?",
          content: `이 코드를 실행하면 어떻게 나올까요?

\`\`\`python
print("python", "java", "c++", sep=" | ")
\`\`\``,
          options: [
            "python java c++",
            "python | java | c++",
            "| python | java | c++ |",
            "pythonjavac++"
          ],
          answer: 1,
          explanation: "sep=\" | \" 는 값 *사이* 마다 들어가요. 맨 앞·맨 뒤엔 안 붙어요!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`print(1, 2, 3, sep=\"★\")`의 결과는?",
          options: ["1 2 3", "1★2★3", "★1★2★3★", "123"],
          answer: 1,
          explanation: "sep 은 값들 '사이' 에만 들어가요! → 1★2★3"
        }
      ]
    },
    {
      id: "ch2",
      title: "end 옵션",
      emoji: "🔚",
      steps: [
        {
          id: "end-explain",
          type: "explain",
          title: "🔚 end — 출력 끝을 바꾸기",
          content: `print() 는 기본적으로 **줄바꿈** (\`\\n\`) 으로 끝나요. 그래서 두 번 부르면 두 줄이 돼요:

\`\`\`python
print("안녕")
print("하세요")
# 안녕
# 하세요
\`\`\`

**end** 옵션으로 그 끝 글자를 바꿀 수 있어요. 줄바꿈 대신 공백을 넣으면 한 줄로 이어져요:

\`\`\`python
print("안녕", end=" ")
print("하세요")
# 안녕 하세요
\`\`\`

**어디 쓰나?**
- 두 \`print\` 를 한 줄로 붙이고 싶을 때 → \`end=" "\`
- 점점 추가되는 로딩 표시 \`Loading...\` → \`end=""\`
- 화살표로 잇기 \`A -> B -> C\` → \`end=" -> "\`

❌ **자주 헷갈리는 것:** \`end\` 는 print *한 번* 의 끝에만 영향을 줘요. 다음 \`print\` 는 또 자기 \`end\` 가 있어요!`
        },
        {
          id: "end-visualizer",
          type: "interactive",
          title: "🎬 end 한 단계씩 눌러보기",
          component: "pyPrintOptionsVisualizer",
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "두 print를 한 줄에 출력하세요!",
          initialCode: "print(\"Hello\", end=___)\nprint(\"World\")",
          expectedOutput: "Hello World",
          hint: "end=\" \"로 줄바꿈 대신 공백!",
          hint2: "print(\"Hello\", end=\" \")"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 화살표로 연결!",
          task: "A -> B -> C 형태로 출력하세요!",
          initialCode: "print(\"A\", end=___)\nprint(\"B\", end=___)\nprint(\"C\")",
          expectedOutput: "A -> B -> C",
          hint: "end=\" -> \"로 설정!",
          hint2: "print(\"A\", end=\" -> \")"
        },
        {
          id: "predict-end",
          type: "predict",
          title: "💭 어떤 결과가 나올까?",
          content: `이 코드를 실행하면 어떻게 나올까요?

\`\`\`python
print("냠", end="*")
print("냠", end="*")
print("냠")
\`\`\``,
          options: [
            "냠\n냠\n냠",
            "냠*냠*냠",
            "냠 냠 냠*",
            "*냠*냠*냠"
          ],
          answer: 1,
          explanation: "각 \`print\` 끝마다 \`*\` 가 붙고, 마지막은 기본값(\\n)이라 줄바꿈. 그래서 한 줄로 \`냠*냠*냠\`."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`print(\"A\", end=\"\")` 뒤에 또 print 가 오면 어떻게 될까요?",
          options: ["줄바꿈 후 출력", "바로 이어서 출력", "에러 발생", "공백 후 출력"],
          answer: 1,
          explanation: "end=\"\" 는 끝에 아무것도 안 붙이니까 다음 출력이 바로 이어져요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "sep과 end 함께 사용",
      emoji: "🎨",
      steps: [
        {
          id: "both-explain",
          type: "explain",
          title: "🎨 sep 과 end 함께!",
          content: `두 옵션을 동시에 쓸 수 있어요. \`sep\` 은 *값 사이* 를, \`end\` 는 *마지막* 을 담당하니까 역할이 안 겹쳐요.

\`\`\`python
print("A", "B", "C", sep="-", end="!")
print("끝")
# A-B-C!끝
\`\`\`

위 결과를 보면 — \`A-B-C\` 까지는 \`sep\` 이 만들고, \`!\` 는 \`end\` 가 만들고, 그 뒤에 \`끝\` 이 *줄바꿈 없이* 바로 붙었죠.

**순서는 상관없어요** — 이름으로 알려주니까 어디 써도 같은 결과:
\`\`\`python
print("A", "B", end="!", sep="-")  # 똑같이 A-B!
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "sep 과 end 를 모두 채워서 `가/나/다.` 가 나오게 해보세요! (마지막에 줄바꿈도 추가)",
          initialCode: "print(\"가\", \"나\", \"다\", sep=___, end=___)",
          expectedOutput: "가/나/다.",
          hint: "사이는 / 하나, 끝은 . 한 글자 다음 줄바꿈(\\n).",
          hint2: "\"/\" / \".\\n\""
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션 — 로딩 표시 만들기!",
          task: "Loading 뒤에 점 3개가 천천히 나타나고, 마지막에 Done! 이 한 줄로 이어지게 만드세요. (점 사이엔 공백 없이, 한 줄 출력)",
          initialCode: "print(\"Loading\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\" Done!\")",
          expectedOutput: "Loading... Done!",
          hint: "줄바꿈 없이 이어 붙이려면 end=\"\" — 빈 문자열!",
          hint2: "\"\" / \"\" / \"\" / \"\""
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 정리",
          content: `## print() 옵션 한 장 요약

| 옵션 | 어디에? | 기본값 |
|---|---|---|
| **sep** | 값 *사이* | \`" "\` (공백 한 칸) |
| **end** | 출력 *끝* | \`"\\n"\` (줄바꿈) |

\`\`\`python
print("A", "B", sep="-")     # A-B
print("Hello", end=" ")      # 줄바꿈 없이 끝
print("A", "B", sep="-", end="!")   # A-B!
\`\`\`

💡 **기억 팁:** *값이 여러 개* 면 \`sep\`, *print 가 여러 줄* 이면 \`end\`.`
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 최종 미션 — 진행바 만들기!",
          task: "[#####] 100% 처럼 보이는 진행바를 만들어보세요. # 사이엔 공백 없고, [ 와 ##### 사이에도 공백 없게.",
          initialCode: "print(\"[\", end=___)\nprint(\"#\", \"#\", \"#\", \"#\", \"#\", sep=___, end=___)\nprint(\"]\", \"100%\", sep=\" \")",
          expectedOutput: "[#####] 100%",
          hint: "[ 뒤에 줄바꿈 없게 end=\"\", # 사이도 공백 없게 sep=\"\", 그리고 ] 와 자연스레 이어지게 또 end=\"\".",
          hint2: "\"\" / \"\" / \"\""
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **sep** — 값 *사이* 에 들어가는 글자 바꾸기
✅ **end** — 출력 *끝* 에 붙는 글자 바꾸기 (기본: 줄바꿈)
✅ 두 옵션 **함께** 쓰기 — 순서 자유

다음 시간엔 **f-string** 으로 변수를 문장 속에 콕 끼워 넣는 법을 배워요! 🚀`
        }
      ]
    }
  ]
}
