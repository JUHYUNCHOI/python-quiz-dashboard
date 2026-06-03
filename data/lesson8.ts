// ============================================
// 레슨 8: f-string
// ============================================
import { LessonData } from './types'

export const lesson8Data: LessonData = {
  id: "8",
  title: "f-string",
  emoji: "✨",
  description: "가장 편한 문자열 포맷팅 방법!",
  chapters: [
    {
      id: "ch1",
      title: "f-string 기초",
      emoji: "📝",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "✨ 문자열 + 변수, 불편해!",
          content: `이름과 나이를 같이 출력하고 싶을 때, 지금까지 \`+\` 로 이어붙였죠:

\`\`\`python
name = "철수"
print("이름: " + name + " 입니다")
\`\`\`

{output}
이름: 철수 입니다
{/output}

따옴표 켰다 껐다, \`+\` 여러 번 — 글자가 늘어날수록 복잡해져요. 😩

게다가 숫자랑 같이 쓰면 \`+\` 가 아예 안 돼요:

\`\`\`python
age = 15
print("나이: " + age)   # 💥 에러!
\`\`\`

**오늘 배우는 f-string** 으로 한 줄에 깔끔하게:

\`\`\`python
print(f"이름: {name}, 나이: {age}")
\`\`\`

{output}
이름: 철수, 나이: 15
{/output}`
        },
        {
          id: "fstring-explain",
          type: "explain",
          title: "✨ f-string — 따옴표 안에 변수 꺼내기",
          content: `**f** 는 "format(포맷, 모양 맞추기)" 의 f. 따옴표 앞에 **f** 만 붙이면 됩니다.

\`\`\`python
name = "철수"
age = 15
print(f"안녕 {name}, {age}살!")
\`\`\`

출력하면 뭐가 나올까요? 먼저 생각해 보고 눌러요.

{output}
안녕 철수, 15살!
{/output}

규칙은 두 개:

1. **따옴표 앞에 \`f\`** 붙이기 → \`f"..."\`
2. **변수는 \`{ }\` 창문** 안에 — 그 자리에 변수 값이 쏙 들어와요

\`{name}\` 은 작은 창문. 실행할 때 파이썬이 창문 뒤에서 \`name\` 상자 값을 꺼내 그 자리에 넣어줘요.

**숫자도 그냥 들어가요** — \`+\` 처럼 에러 안 남:

\`\`\`python
price = 19000
print(f"가격: {price}원")
\`\`\`

{output}
가격: 19000원
{/output}`
        },
        {
          id: "fstring-viz",
          type: "interactive",
          title: "🎬 슬롯이 값으로 바뀌는 순서",
          description: "{변수} 창문이 어떻게 실제 값으로 채워지는지 한 단계씩 눌러봐요. 포맷 스펙도 살짝 미리보기!",
          component: "pyFstringVisualizer",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 이름 한 개 넣기",
          task: "f-string으로 이름을 출력하세요!",
          initialCode: "name = \"민수\"\n# f-string으로 name 변수를 넣으세요\nprint(f\"안녕, {___}!\")",
          expectedOutput: "안녕, 민수!",
          hint: "f\"...{변수}...\" 형태로!",
          hint2: "f\"안녕, {name}!\""
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 이름 + 나이",
          task: "이름과 나이를 f-string으로 출력하세요!",
          initialCode: "name = \"영희\"\nage = 14\nprint(f\"{___}는 {___}살입니다\")",
          expectedOutput: "영희는 14살입니다",
          hint: "{name}와 {age} 둘 다 넣으면 돼요!",
          hint2: "f\"{name}는 {age}살입니다\""
        },
        {
          id: "predict-no-f",
          type: "predict",
          title: "💭 결과 예측 — f 를 깜빡하면?",
          content: `\`f\` 를 빼먹고 그냥 따옴표만 썼어요. 결과는?

\`\`\`python
name = "민지"
print("안녕, {name}!")
\`\`\``,
          options: [
            "안녕, 민지! (창문이 열려서 이름이 들어감)",
            "안녕, {name}! (글자 그대로 {name} 이 찍힘)",
            "에러가 나서 실행이 멈춤",
            "안녕, !  ({name} 부분이 사라짐)"
          ],
          answer: 1,
          explanation: "`f` 가 없으면 파이썬은 \`{name}\` 을 그냥 글자로 봐요. 창문이 안 열려서, 중괄호 포함 그대로 화면에 찍혀요. 변수를 꺼내고 싶으면 따옴표 앞에 꼭 \`f\`."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈 — {x} 자리에 뭐가 들어갈까?",
          content: "`x = 10`일 때, `f\"x = {x}\"`의 결과는?",
          options: ["x = {x}", "x = 10", "{x} = 10", "에러"],
          answer: 1,
          explanation: "{x}가 변수 값 10으로 바뀌어요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "f-string 안에서 계산",
      emoji: "🧮",
      steps: [
        {
          id: "calc-explain",
          type: "explain",
          title: "🧮 { } 창문 안에 식을 넣어도 OK",
          content: `\`{ }\` 안에는 변수만 넣어야 하는 게 아니에요. **계산식** 도 그대로 들어가요.

\`\`\`python
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
\`\`\`

{output}
10 + 3 = 13
{/output}

파이썬이 \`{ }\` 를 만나면:
1. 안에 있는 식을 먼저 **계산** 하고
2. 그 결과를 그 자리에 넣어요

\`{a + b}\` → 먼저 \`10 + 3 = 13\` 계산 → \`13\` 이 자리에 쏙.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기 — { } 안에서 곱하기",
          task: "f-string 안에서 계산하세요!",
          initialCode: "price = 19000\ncount = 3\n# {} 안에서 계산할 수 있어요\nprint(f\"총 금액: {___}원\")",
          expectedOutput: "총 금액: 57000원",
          hint: "{price * count}로 계산!",
          hint2: "f\"총 금액: {price * count}원\""
        },
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 { } 안에 메서드 호출도 OK",
          content: `지난 시간에 배운 \`.upper()\`, \`.strip()\` 같은 메서드도 \`{ }\` 안에서 바로 부를 수 있어요.

\`\`\`python
name = "python"
print(f"대문자: {name.upper()}")

text = "  hello  "
print(f"정리: '{text.strip()}'")
\`\`\`

{output}
대문자: PYTHON
정리: 'hello'
{/output}

원리는 똑같음: \`{ }\` 안의 \`name.upper()\` 를 먼저 실행 → 결과 \`"PYTHON"\` 이 자리에 들어가요.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기 — { } 안에서 .upper()",
          task: "f-string 안에서 upper()를 사용하세요!",
          initialCode: "lang = \"python\"\n# {} 안에서 메서드도 쓸 수 있어요\nprint(f\"나는 {___}을 배운다!\")",
          expectedOutput: "나는 PYTHON을 배운다!",
          hint: "{lang.upper()}",
          hint2: "f\"나는 {lang.upper()}을 배운다!\""
        }
      ]
    },
    {
      id: "ch3",
      title: "포맷 지정",
      emoji: "🎯",
      steps: [
        {
          id: "format-explain",
          type: "explain",
          title: "🎯 소수점 자리 지정",
          content: `숫자가 너무 길게 나올 때, **소수점 몇 자리까지** 보여줄지 정할 수 있어요.

> 🪟 **새로운 규칙: 콜론 \`:\`**
> \`{변수}\` 창문 안에 **변수 뒤에 \`:\`** 를 찍으면 — 그 뒤는 "어떻게 보여줄지" 옵션이에요.
>
> \`{pi:.2f}\` = "pi 를 — 소수점 2자리로 보여줘"

\`\`\`python
pi = 3.141592653589793

print(f"원주율: {pi:.2f}")   # 3.14 (소수점 2자리)
print(f"원주율: {pi:.4f}")   # 3.1416 (소수점 4자리)
\`\`\`

**{변수:.Nf}** = 소수점 N자리까지!

\`f\` 는 "소수(float, 점 있는 숫자)" 를 뜻해요. 그래서 \`.2f\` = "소수, 2자리".`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 소수점 1자리",
          task: "소수점 1자리까지 출력하세요!",
          initialCode: "score = 85.7777\n# :.1f 로 소수점 1자리\nprint(f\"평균: {score:___}점\")",
          expectedOutput: "평균: 85.8점",
          hint: "{score:.1f}",
          hint2: "f\"평균: {score:.1f}점\""
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "💰 천 단위 쉼표",
          content: `큰 숫자에 쉼표를 넣을 수 있어요:

\`\`\`python
price = 1000000
print(f"가격: {price:,}원")

salary = 3500000
print(f"월급: {salary:,}원")
\`\`\`

{output}
가격: 1,000,000원
월급: 3,500,000원
{/output}

**{변수:,}** = 천 단위 쉼표!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 천 단위 쉼표",
          task: "천 단위 쉼표를 넣어서 출력하세요!",
          initialCode: "money = 50000000\n# :, 로 천 단위 쉼표\nprint(f\"잔고: {money:___}원\")",
          expectedOutput: "잔고: 50,000,000원",
          hint: "{money:,}",
          hint2: "f\"잔고: {money:,}원\""
        },
        {
          id: "width1",
          type: "explain",
          title: "🎯 너비 — 정해진 칸 안에 넣기 (왼쪽 정렬)",
          content: `글자나 숫자를 **정해진 칸** 안에 넣을 수 있어요. 빈 자리는 공백으로 채워져요.

\`\`\`python
print(f"|{'cat':<10}|")
\`\`\`

{output}
|cat       |
{/output}

- \`:<10\` = "10칸 안에 — **왼쪽**부터 채워". 남는 자리는 오른쪽에 공백 7칸.
- \`|\` 막대기는 칸 경계를 보여주려고 글자 그대로 찍은 거예요 (특별한 기능 없음).

표 만들 때 줄을 맞춰주는 도구라고 생각하면 돼요.`
        },
        {
          id: "width-left-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 왼쪽 정렬 10칸",
          task: "name을 왼쪽 정렬로 10칸에 넣어 출력하세요!",
          initialCode: "name = \"cat\"\n# :<10 으로 왼쪽 정렬, 10칸\nprint(f\"|{name:___}|\")",
          expectedOutput: "|cat       |",
          hint: "{name:<10} 처럼!",
          hint2: "f\"|{name:<10}|\""
        },
        {
          id: "width-right-explain",
          type: "explain",
          title: "🎯 오른쪽 정렬 — `>`",
          content: `이번엔 반대로 — 빈 자리를 **앞쪽**에 두고 글자는 오른쪽 끝에 붙여요.

\`\`\`python
print(f"|{'cat':>10}|")
\`\`\`

{output}
|       cat|
{/output}

\`:>10\` = "10칸 안에 — **오른쪽** 끝에 붙여". 가격처럼 자릿수가 맞아야 할 때 자주 써요.`
        },
        {
          id: "width-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 오른쪽 정렬 10칸",
          task: "이름을 오른쪽 정렬로 10칸에 넣어 출력하세요!",
          initialCode: "name = \"홍길동\"\n# :>10 으로 오른쪽 정렬, 10칸\nprint(f\"|{name:___}|\")",
          expectedOutput: "|       홍길동|",
          hint: "{name:>10} 처럼!",
          hint2: "f\"|{name:>10}|\""
        },
        {
          id: "width-center-explain",
          type: "explain",
          title: "🎯 가운데 정렬 — `^`",
          content: `\`^\` 는 위로 뾰족한 화살표 — "**가운데**" 라고 외워요.

\`\`\`python
print(f"|{'cat':^10}|")
\`\`\`

{output}
|   cat    |
{/output}

빈 자리를 양쪽에 나눠서 채워줘요. 제목/헤더에 잘 어울림.

**정렬 3 가지 요약**
- \`:<N\` = 왼쪽 정렬
- \`:>N\` = 오른쪽 정렬
- \`:^N\` = 가운데 정렬`
        },
        {
          id: "width-center-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 가운데 정렬 10칸",
          task: "title을 가운데 정렬로 10칸에 넣어 출력하세요!",
          initialCode: "title = \"MENU\"\n# :^10 으로 가운데 정렬, 10칸\nprint(f\"|{title:___}|\")",
          expectedOutput: "|   MENU   |",
          hint: "{title:^10} 처럼!",
          hint2: "f\"|{title:^10}|\""
        },
        {
          id: "padding1",
          type: "explain",
          title: "🎯 빈 자리를 0 으로 채우기",
          content: `숫자 앞을 **0 으로** 채우고 싶을 때 — 학번 같은 거 생각하면 돼요. \`42\` 번이지만 \`00042\` 처럼 다섯 자리로 통일해서 보여주는 거.

\`\`\`python
n = 7
print(f"{n:03d}")   # 007
print(f"{n:05d}")   # 00007
\`\`\`

- \`:05d\` = "정수일 때, 5자리로 — 빈 자리는 0 으로 채워"
- 정수일 때 0 채우려면 끝에 \`d\` 를 붙여요.`
        },
        {
          id: "padding-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 학번 5자리 만들기",
          task: "num을 5자리 정수로 출력하세요! (00042)",
          initialCode: "num = 42\n# :05d 로 5자리, 빈 자리는 0\nprint(f\"{num:___}\")",
          expectedOutput: "00042",
          hint: "{num:05d}",
          hint2: "f\"{num:05d}\""
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈 — 오른쪽 정렬 5칸의 결과는?",
          content: "`f\"|{'hi':>5}|\"` 의 결과는?",
          options: ["|hi   |", "|   hi|", "| hi  |", "|hi|"],
          answer: 1,
          explanation: ":>5는 오른쪽 정렬, 5칸 너비! 'hi' 앞에 빈 칸 3개가 들어가서 |   hi|"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈 — 소수점 2자리는 어떻게 보일까?",
          content: "`x = 3.14159`일 때, `f\"{x:.2f}\"`의 결과는?",
          options: ["3.14159", "3.14", "3.1", "3"],
          answer: 1,
          explanation: ".2f는 소수점 둘째 자리까지! 반올림해서 3.14"
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
          content: `## f-string 정리

**기본 사용법**
\`\`\`python
f"텍스트 {변수} 텍스트"
\`\`\`

**계산과 메서드**
\`\`\`python
f"{a + b}"       # 계산
f"{name.upper()}"  # 메서드
\`\`\`

**포맷 지정**
\`\`\`python
f"{pi:.2f}"      # 소수점 2자리
f"{price:,}"     # 천 단위 쉼표
f"{name:>10}"    # 오른쪽 정렬, 10칸 (:<, :^ 도 OK)
f"{n:05d}"       # 5자리, 빈 자리는 0
\`\`\``
        },
        {
          id: "mission1a",
          type: "mission",
          title: "🏆 미션 1단계 — 가격 오른쪽 정렬",
          task: "메뉴 한 줄씩 출력해요. 가격을 **오른쪽 정렬 8칸** 으로 맞춰 보세요. (이름은 그냥 출력)",
          initialCode: "name = '아메리카노'\nprice = 4500\n\n# price 를 오른쪽 정렬 8칸 으로!\nprint(f'{name} {price:___}원')",
          expectedOutput: "아메리카노     4500원",
          hint: "오른쪽 정렬은 `:>`, 너비 8 칸이니까 `:>8`.",
          hint2: "f'{name} {price:>8}원'"
        },
        {
          id: "mission1b",
          type: "mission",
          title: "🏆 미션 2단계 — 천 단위 쉼표 추가",
          task: "방금 코드에 **쉼표** 하나만 추가하면 돼요. `:>8` 뒤에 `,` 만 붙이면 4500 이 4,500 으로 보여요.",
          initialCode: "name = '아메리카노'\nprice = 4500\n\n# :>8 뒤에 , 만 붙이세요!\nprint(f'{name} {price:___}원')",
          expectedOutput: "아메리카노    4,500원",
          hint: "`:>8` 뒤에 그냥 `,` 만 추가 → `:>8,`",
          hint2: "f'{name} {price:>8,}원'"
        },
        {
          id: "mission1c",
          type: "mission",
          title: "🏆 미션 3단계 — 메뉴 여러 줄 + 합계",
          task: "이제 메뉴를 **여러 개** 출력하고 마지막에 합계 줄을 더해요. 이름은 왼쪽 12칸, 가격은 오른쪽 8칸+쉼표.",
          initialCode: "items = ['아메리카노', '카페라떼', '초코케이크']\nprices = [4500, 5000, 6500]\n\nfor i in range(3):\n    # 이름은 왼쪽 12칸, 가격은 오른쪽 8칸 + 쉼표\n    print(f'{items[i]:<12} {prices[i]:___}원')\n\ntotal = sum(prices)\nprint(f'{\"합계\":<12} {total:>8,}원')",
          expectedOutput: "아메리카노           4,500원\n카페라떼            5,000원\n초코케이크           6,500원\n합계             16,000원",
          hint: "for 안 빈칸은 가격 칸. 오른쪽 정렬 8칸 + 쉼표 = `:>8,`.",
          hint2: "f'{items[i]:<12} {prices[i]:>8,}원'"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — 카페 메뉴판",
          task: "카페 메뉴판이에요. 가격을 8칸 너비로 오른쪽 정렬 + 천 단위 콤마 까지 한 번에! 빈칸 두 곳에 같은 숫자 8 을 채워보세요.",
          initialCode: "items = ['아메리카노', '카페라떼', '초코케이크']\nprices = [4500, 5000, 6500]\ncount = len(items)\n\nprint('=' * 25)\nprint(f'{\"☕ 카페 메뉴\":^25}')\nprint('=' * 25)\n\nfor i in range(count):\n    print(f'{items[i]:<12} {prices[i]:>___,}원')\n\nprint('-' * 25)\ntotal = sum(prices)\nprint(f'{\"합계\":<12} {total:>___,}원')\nprint('=' * 25)",
          expectedOutput: "=========================\n         ☕ 카페 메뉴         \n=========================\n아메리카노           4,500원\n카페라떼            5,000원\n초코케이크           6,500원\n-------------------------\n합계             16,000원\n=========================",
          hint: "두 빈칸에 같은 숫자가 들어가요. 가격이 4 자리/5 자리이니 그것보다는 커야 줄이 맞아요.",
          hint2: "두 빈칸 모두 `8` (예: `{prices[i]:>8,}`)."
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **f"...{변수}..."** - 기본 사용법
✅ **{ } 안에서 계산/메서드** 사용
✅ **:.2f** - 소수점 자리 지정
✅ **:,** - 천 단위 쉼표
✅ **:<N :>N :^N** - 너비와 정렬
✅ **:0Nd** - 0 채우기

다음 시간에는 **타입 변환**을 배울 거예요! 🚀`
        }
      ]
    }
  ]
}
