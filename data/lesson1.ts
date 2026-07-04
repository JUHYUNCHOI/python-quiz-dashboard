// ============================================
// 레슨 1: print() 출력
// ============================================
import { LessonData } from './types'

export const lesson1Data: LessonData = {
  id: "1",
  title: "print() 출력",
  emoji: "🖨️",
  description: "화면에 글자와 숫자를 출력해요!",
  chapters: [
    {
      id: "ch1",
      title: "첫 출력!",
      emoji: "👋",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎉 첫 코드 — 화면에 글자 띄우기",
          content: `프로그래밍의 첫 단추는 **"화면에 글자 띄우기"** 예요.

\`\`\`python
print('Hello, World!')
\`\`\`

실행하면 화면에 이렇게 나와요:
\`\`\`
Hello, World!
\`\`\`

이 한 줄을 ▶ 눌러서 직접 실행해보고, 다음 페이지에서 한 글자씩 뜯어볼게요. ✨`
        },
        {
          id: "print-explain",
          type: "explain",
          title: "🖨️ print() — 화면 출력 명령",
          content: `\`\`\`python
print('안녕하세요!')
\`\`\`

- **\`print\`** — "출력해!" 명령어 이름
- **\`( )\`** — 괄호 안에 **보여줄 내용** 을 넣어요
- **\`' '\`** — 글자는 따옴표로 감싸요

> 💡 \`'\` 와 \`"\` 둘 다 OK. 취향대로!`
        },
        {
          id: "print-builder-interactive",
          type: "interactive",
          title: "🎬 print() 한 조각씩 조립해보기",
          component: "pyPrintBuilder"
        },
        {
          id: "try-print-builder",
          type: "tryit",
          title: "🖥️ 방금 본 그대로 따라쳐 보기",
          task: "방금 시각화에서 본 `print('안녕')` 을 그대로 따라쳐 보세요!",
          initialCode: "print(___)",
          expectedOutput: "안녕",
          hint: "빈칸엔 따옴표로 감싼 '안녕' 이 들어가요.",
          hint2: "'안녕'"
        },
        {
          id: "print-explain-uses",
          type: "explain",
          title: "🖨️ 더 예시 보기",
          content: `\`\`\`python
print('hi')
print("파이썬 재밌다")
print('🍕🍕🍕')         # 이모지도 OK!
\`\`\`

세 줄 다 출력하면 뭐가 나올까요? 생각해 보고 눌러요.

{output}
hi
파이썬 재밌다
🍕🍕🍕
{/output}

따옴표 안에 뭐든 넣으면 그대로 화면에 나와요.`
        },
        {
          id: "print-explain-pitfalls",
          type: "explain",
          title: "🤔 이러면 어떻게 될까?",
          content: `\`\`\`python
print(안녕)          # 🚨 NameError
Print('안녕')        # 🚨 NameError
\`\`\`

파이썬: *"이런 이름 몰라요!"* 😵

- \`안녕\` — 따옴표 없으면 파이썬은 "어떤 이름" 인 줄 알고 못 찾아요
- \`Print\` — 대문자 P 는 안 돼요. **모두 소문자!**

✅ 두 가지만 기억: **소문자 \`print\`** + **글자는 따옴표 안에**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Hello, World! 출력해 봐!",
          task: "Hello, World!를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "Hello, World!",
          hint: "빈칸엔 따옴표로 감싼 글자가 들어가요.",
          hint2: "'Hello, World!'"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ '안녕하세요!' 출력해 봐!",
          task: "'안녕하세요!'를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "안녕하세요!",
          hint: "한글도 따옴표 안에!",
          hint2: "'안녕하세요!'"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ `print('파이썬')` 답은?",
          content: "`print('파이썬')`의 출력 결과는?",
          options: ["print('파이썬')", "'파이썬'", "파이썬", "에러"],
          answer: 2,
          explanation: "따옴표 안의 내용만 출력돼요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "숫자 출력",
      emoji: "🔢",
      steps: [
        {
          id: "number-explain",
          type: "explain",
          title: "🔢 숫자 출력하기",
          content: `글자는 따옴표가 필요했죠. 그런데 **숫자는 따옴표가 필요 없어요!**

\`\`\`python
print(123)
print(3.14)
\`\`\`

결과:
\`\`\`
123
3.14
\`\`\`

왜 글자는 따옴표가 필요한데 숫자는 필요 없을까요?
→ 컴퓨터는 **숫자를 그대로 알아봐요.** \`123\` 을 보면 바로 "아, 백이십삼이구나" 함.
→ 하지만 \`안녕\` 같은 글자는 따옴표가 없으면 **"어떤 이름"** 인지 **글자** 인지 헷갈려해요.

> 💡 "어떤 이름" 이 뭔지는 **나중에 배울 거예요** (변수). 지금은 "글자엔 따옴표 필요, 숫자엔 안 필요" 이것만 기억!`
        },
        {
          id: "number-explain-math",
          type: "explain",
          title: "💡 신기한 점 — 계산도 해 줘요",
          content: `숫자를 넣으면, 파이썬이 **계산까지 해서** 결과를 보여줘요!

\`\`\`python
print(100 + 50)
print(10 * 5)
print(20 - 7)
print(8 / 2)
\`\`\`

마치 계산기처럼! \`print()\` 안에서 \`+ - * /\` 모두 가능.

### 자주 쓰는 곳

- 값 확인 — "지금 점수가 몇이지?"
- 계산 결과 보기 — "할인된 가격이 얼마야?"
- 숫자 카운트 — 1, 2, 3, 4, 5 …`
        },
        {
          id: "predict-number-math",
          type: "predict",
          title: "💭 결과 예측",
          content: "print() 안에서 계산이 어떻게 될지 생각해봐요!",
          code: "print(100 + 50)",
          options: ["150", "100 + 50", "100, 50", "에러"],
          answer: 0,
          explanation: "print() 안의 식이 먼저 계산되고, 그 결과(150)만 화면에 나와요."
        },
        {
          id: "number-explain-types",
          type: "explain",
          title: "⚠️ 따옴표 차이 — 글자 vs 숫자",
          content: `\`\`\`python
print(100)       # 숫자 → 계산 가능
print('100')     # 글자 → 화면엔 똑같이 보이지만 계산 불가
\`\`\`

두 줄 다 출력하면 어떻게 보일까요? 한번 맞혀봐요.

{output}
100
100
{/output}

화면엔 똑같이 \`100\` 으로 보이지만, 내부적으로는 다른 종류예요.

- **\`100\`** 은 진짜 숫자 → \`100 + 50\` 같은 계산 OK.
- **\`'100'\`** 은 \`1\`, \`0\`, \`0\` 글자 세 개 → 계산하려고 하면 문제 생겨요.

지금은 이 차이만 살짝 알고 넘어가요. 자세한 건 다음 레슨에서!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 2024 출력해 봐!",
          task: "숫자 2024를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "2024",
          hint: "숫자는 따옴표 없이 그대로.",
          hint2: "2024"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 100 + 200 계산해 봐!",
          task: "100 + 200의 결과를 출력하세요!",
          initialCode: "# 100 + 200을 계산해서 출력하세요\nprint(___)",
          expectedOutput: "300",
          hint: "print() 안에서 바로 계산! 숫자는 따옴표 없이.",
          hint2: "100 + 200"
        },
        {
          id: "comment-explain",
          type: "explain",
          title: "💬 # 은 사람을 위한 메모",
          content: `방금 코드에 \`#\` 기호 봤죠? 이건 **주석** 이에요.

\`\`\`python
# 줄 맨 앞 — 그 줄 전체가 주석
print(10)
print(20)   # 줄 중간 — # 부터 줄 끝까지가 주석
\`\`\`

**\`#\` 뒤는 파이썬이 완전히 무시해요.** 실행 안 되고, 화면에도 안 나와요.

📝 코드 옆에 "이게 뭐였지" 안 헷갈리게 붙여두는 메모예요.`
        },
        {
          id: "comment-explain-where",
          type: "explain",
          title: "💬 # 위치 — 줄 맨 앞 vs 중간",
          content: `\`\`\`python
# 줄 맨 앞 → 그 줄 전체가 주석. 다음 줄 코드 설명용.
print(10)

print(20)   # 줄 중간 → 그 줄 코드에 짧게 메모.
\`\`\`

> 💡 앞으로 \`#\` 이 자주 나와요. 보면 **"아, 설명이구나"** 하고 넘어가면 돼요.`
        },
        {
          id: "predict-comment-output",
          type: "predict",
          title: "💭 결과 예측 — 주석 섞인 코드",
          content: "`#` 뒤에 있는 글자는 컴퓨터가 무시한다고 했죠. 그럼 이 코드 결과는?",
          code: "# 안녕하세요\nprint(10)   # 숫자 10 출력",
          options: ["10", "안녕하세요\n10", "10\n숫자 10 출력", "에러"],
          answer: 0,
          explanation: "`#` 부터 줄 끝까지는 모두 무시돼요. 그래서 첫 줄은 통째로 사라지고, 둘째 줄에서도 `# 숫자 10 출력` 부분은 무시. 실행되는 건 `print(10)` 뿐이라 화면엔 `10` 만 나와요."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ print() 안에서 계산하면?",
          content: "`print(20 - 7)` 을 실행하면 화면에 뭐가 나올까요?",
          options: [
            "13",
            "20 - 7",
            "27",
            "에러"
          ],
          answer: 0,
          explanation: "print() 안의 계산이 먼저 실행돼서, 결과 13만 화면에 나와요."
        }
      ]
    },
    {
      id: "ch3",
      title: "여러 줄 출력",
      emoji: "📝",
      steps: [
        {
          id: "multi-explain",
          type: "explain",
          title: "📝 여러 줄 출력하기",
          content: `여러 가지 정보를 한꺼번에 보여주고 싶을 땐 어떻게 할까요?
→ **\`print()\` 를 여러 번 쓰면 돼요.** 각 \`print()\` 가 한 줄씩 차지해요.

\`\`\`python
print('첫 번째 줄')
print('두 번째 줄')
print('세 번째 줄')
\`\`\`

결과:
\`\`\`
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\`

### 핵심 약속

**\`print()\` 는 출력 후 자동으로 줄바꿈을 해요.** 그래서 다음 \`print()\` 는 새 줄에서 시작.
일부러 \`Enter\` 키 같은 걸 안 넣어도, 알아서 줄을 바꿔줘요.`
        },
        {
          id: "predict-multi-lines",
          type: "predict",
          title: "💭 결과 예측",
          content: "print() 가 3 번 나오면 화면은 어떻게 보일까요?",
          code: "print('가')\nprint('나')\nprint('다')",
          options: ["가\n나\n다  (세 줄)", "가 나 다  (한 줄, 띄어쓰기)", "가나다  (한 줄, 붙음)", "에러"],
          answer: 0,
          explanation: "print() 는 끝에서 자동으로 줄바꿈을 해요. 그래서 세 번 부르면 세 줄로 나와요."
        },
        {
          id: "multi-explain-card",
          type: "explain",
          title: "📝 자주 쓰는 곳 & 명함 예시",
          content: `### 자주 쓰는 곳

- **여러 줄짜리 메시지** — 환영 인사, 메뉴판, 도움말
- **결과 보고서** — 이름, 나이, 점수 각각 한 줄에
- **ASCII 아트** — 별 모양, 캐릭터 그림

### 예시 — 간단한 명함

\`\`\`python
print('====== 명함 ======')
print('이름: 김파이')
print('직업: 코더')
print('==================')
\`\`\`

결과:
\`\`\`
====== 명함 ======
이름: 김파이
직업: 코더
==================
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ '나이: 15' / '취미: 게임' 출력해 봐!",
          task: "'나이: 15'와 '취미: 게임'을 출력하세요!",
          initialCode: "print('이름: 홍길동')\n# 나이와 취미도 출력하세요\nprint(___)\nprint(___)",
          expectedOutput: "이름: 홍길동\n나이: 15\n취미: 게임",
          hint: "각 빈칸엔 따옴표로 감싼 글자가 들어가요. 첫 빈칸은 나이, 둘째 빈칸은 취미.",
          hint2: "'나이: 15' / '취미: 게임'"
        },
        {
          id: "empty-print-explain",
          type: "explain",
          title: "✨ 빈 줄 만들기 — print() 만 쓰기",
          content: `여러 줄을 출력하다 보면 **사이에 빈 칸을 두고 싶을 때** 가 있어요. 글이 너무 빽빽하면 읽기 힘드니까.

방법은 간단해요. **\`print()\` 안을 비워두면 빈 줄 한 칸** 이 출력돼요.

\`\`\`python
print('첫 번째 줄')
print()        # 빈 줄 한 칸
print('세 번째 줄')
\`\`\`

결과:
\`\`\`
첫 번째 줄

세 번째 줄
\`\`\`

> 💡 **\`print()\` 는 괄호 안에 아무것도 안 넣어도 에러 안 나요.** 그냥 줄바꿈만 하나 출력해요.`
        },
        {
          id: "empty-print-explain-why",
          type: "explain",
          title: "✨ 왜 빈 줄이 생길까? & 어디에 써요?",
          content: `### 왜 빈 줄이 생길까?

\`print()\` 는 항상 마지막에 줄바꿈을 해요. 안에 내용이 없으면 → **줄바꿈만 하나 찍힘** → 화면에서 빈 줄로 보임.

### 자주 쓰는 곳

- **문단 나누기** — 인사말 후 한 줄 띄우고 본문
- **결과 정리** — 여러 결과 사이 간격
- **시각적 정돈** — 너무 답답하지 않게 숨 쉴 공간`
        },
        {
          id: "try-empty-print",
          type: "tryit",
          title: "🖥️ 빈 줄 직접 만들어보기",
          task: "'안녕'을 출력한 뒤 빈 줄을 하나 두고, '반가워'를 출력해봐!",
          initialCode: "print('안녕')\n# 여기에 빈 줄용 print() 한 줄 써봐\nprint('반가워')",
          expectedOutput: "안녕\n\n반가워",
          hint: "괄호 안을 비워둔 print() 한 줄을 넣으면 빈 줄이 생겨요",
          hint2: "print('안녕')\nprint()\nprint('반가워')"
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "📎 쉼표 — 한 줄에 여러 값",
          content: `한 \`print()\` 안에 **쉼표(\`,\`)** 로 값들을 늘어놓으면, 한 줄에 같이 나와요.

\`\`\`python
print('이름:', '홍길동')
print('점수:', 100)
\`\`\`

다음 페이지: **사이 공백은 어떻게 될까?** 🤔`
        },
        {
          id: "predict-comma-space",
          type: "predict",
          title: "💭 결과 예측",
          content: "쉼표로 값을 구분했을 때, 사이는 어떻게 보일까요?",
          code: "print('a', 'b', 'c')",
          options: ["a b c  (사이 한 칸씩 띄움)", "abc  (붙어서 나옴)", "a,b,c  (쉼표가 그대로)", "a\nb\nc  (세 줄)"],
          answer: 0,
          explanation: "쉼표로 구분하면 파이썬이 **사이에 띄어쓰기를 자동으로** 넣어줘요. 그래서 'a b c' 처럼 나와요."
        },
        {
          id: "comma-explain-space",
          type: "explain",
          title: "💡 쉼표의 마법 — 글자 + 숫자 섞기",
          content: `쉼표는 사이에 **공백을 자동으로** 넣어줘요. 그리고 **글자 + 숫자** 도 한 줄에 섞을 수 있어요!

\`\`\`python
print('나이:', 15)
print('총합:', 100 + 50)
\`\`\`

이게 진짜 편한 점 — 라벨과 값을 한 줄에 깔끔하게.`
        },
        {
          id: "predict-comma-mix",
          type: "predict",
          title: "💭 결과 예측 — 글자 + 계산",
          content: "쉼표로 글자와 계산식을 같이 넣으면?",
          code: "print('총합:', 100 + 50)",
          options: ["총합: 150", "총합: 100 + 50", "총합:, 150", "에러"],
          answer: 0,
          explanation: "계산식 100 + 50 이 먼저 150 으로 계산되고, 글자 '총합:' 과 한 줄에 띄어쓰기 한 칸으로 나와요."
        },
        {
          id: "comma-explain-vs",
          type: "explain",
          title: "❓ 쉼표 vs print() 여러 개 — 차이?",
          content: `\`\`\`python
print('a', 'b')    # a b       ← 한 줄, 사이에 공백
print('a')         # a
print('b')         # b         ← 두 줄로 나뉨
\`\`\`

**한 줄에 모으고 싶으면 쉼표**, **줄을 나누고 싶으면 \`print()\` 여러 개**.`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 쉼표로 '결과:' 와 100 출력해 봐!",
          task: "쉼표로 '결과:' 와 100을 출력하세요!",
          initialCode: "# 쉼표로 '결과:' 와 100을 출력하세요\nprint('결과:', ___)",
          expectedOutput: "결과: 100",
          hint: "빈칸엔 숫자 한 개. 따옴표 없이.",
          hint2: "100"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — 내 캐릭터 만들기!",
          task: "내 캐릭터 정보를 자유롭게 채워봐! 이름·레벨·체력은 네 마음대로 🎮",
          initialCode: "print('=== 🎮 캐릭터 정보 ===')\nprint('이름:', '여기에 이름!')\nprint('레벨:', 1)\nprint('체력:', 100)\nprint('공격력:', 25)\nprint('=== 모험을 시작하자! ===')",
          hint: "쉼표로 라벨과 값을 연결했어요. 따옴표 안 글자와 숫자만 네 마음대로 바꿔봐!",
          hint2: "예: print('이름:', '불꽃마법사')   /   print('레벨:', 7)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **\`print()\`** — 화면에 출력하는 명령
✅ **따옴표** — 글자(문자열)는 \`'\` 또는 \`"\` 로 감싸기
✅ **숫자** — 따옴표 없이 그대로 (계산도 가능!)
✅ **\`#\` 주석** — 사람이 보는 메모, 컴퓨터는 무시
✅ **여러 줄 출력** — \`print()\` 를 여러 번
✅ **빈 줄** — \`print()\` 안을 비워두기
✅ **쉼표** — 여러 값을 한 줄에 + 자동 공백

### 정말 첫 단추를 끼웠어요 🎯

이제 컴퓨터에게 **"이거 화면에 띄워줘"** 라고 시킬 수 있어요. 모든 프로그램은 결국 이 출력으로 결과를 보여줘요. 이게 시작!

다음 시간에는 **데이터 타입** — 글자, 숫자, 참/거짓 같이 컴퓨터가 다루는 **여러 종류의 값** 을 배워요. 🚀`
        }
      ]
    }
  ]
}
