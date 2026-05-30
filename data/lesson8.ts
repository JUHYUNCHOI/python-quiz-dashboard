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
# 이름: 철수 입니다
\`\`\`

따옴표 켰다 껐다, \`+\` 여러 번 — 글자가 늘어날수록 복잡해져요. 😩

게다가 숫자랑 같이 쓰면 \`+\` 가 아예 안 돼요:

\`\`\`python
age = 15
print("나이: " + age)   # 💥 에러!
\`\`\`

**오늘 배우는 f-string** 으로 한 줄에 깔끔하게:

\`\`\`python
print(f"이름: {name}, 나이: {age}")
# 이름: 철수, 나이: 15
\`\`\``
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
# 안녕 철수, 15살!
\`\`\`

규칙은 두 개:

1. **따옴표 앞에 \`f\`** 붙이기 → \`f"..."\`
2. **변수는 \`{ }\` 창문** 안에 — 그 자리에 변수 값이 쏙 들어와요

\`{name}\` 은 작은 창문. 실행할 때 파이썬이 창문 뒤에서 \`name\` 상자 값을 꺼내 그 자리에 넣어줘요.

**숫자도 그냥 들어가요** — \`+\` 처럼 에러 안 남:

\`\`\`python
price = 19000
print(f"가격: {price}원")   # 가격: 19000원
\`\`\``
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
          title: "🖥️ 직접 해보기!",
          task: "f-string으로 이름을 출력하세요!",
          initialCode: "name = \"민수\"\n# f-string으로 name 변수를 넣으세요\nprint(f\"안녕, {___}!\")",
          expectedOutput: "안녕, 민수!",
          hint: "f\"...{변수}...\" 형태로!",
          hint2: "f\"안녕, {name}!\""
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 여러 변수 사용!",
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
          options: ["안녕, 민지!", "안녕, {name}!", "에러", "안녕, !"],
          answer: 1,
          explanation: "`f` 가 없으면 파이썬은 \`{name}\` 을 그냥 글자로 봐요. 창문이 안 열려요. 변수를 꺼내고 싶으면 따옴표 앞에 꼭 \`f\`."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
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
# 10 + 3 = 13
\`\`\`

파이썬이 \`{ }\` 를 만나면:
1. 안에 있는 식을 먼저 **계산** 하고
2. 그 결과를 그 자리에 넣어요

\`{a + b}\` → 먼저 \`10 + 3 = 13\` 계산 → \`13\` 이 자리에 쏙.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
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
# 대문자: PYTHON

text = "  hello  "
print(f"정리: '{text.strip()}'")
# 정리: 'hello'
\`\`\`

원리는 똑같음: \`{ }\` 안의 \`name.upper()\` 를 먼저 실행 → 결과 \`"PYTHON"\` 이 자리에 들어가요.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
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
          content: `소수점 자리를 지정할 수 있어요:

\`\`\`python
pi = 3.141592653589793

print(f"원주율: {pi:.2f}")   # 3.14 (소수점 2자리)
print(f"원주율: {pi:.4f}")   # 3.1416 (소수점 4자리)
\`\`\`

**{변수:.Nf}** = 소수점 N자리까지!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
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
# 가격: 1,000,000원

salary = 3500000
print(f"월급: {salary:,}원")
# 월급: 3,500,000원
\`\`\`

**{변수:,}** = 천 단위 쉼표!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "천 단위 쉼표를 넣어서 출력하세요!",
          initialCode: "money = 50000000\n# :, 로 천 단위 쉼표\nprint(f\"잔고: {money:___}원\")",
          expectedOutput: "잔고: 50,000,000원",
          hint: "{money:,}",
          hint2: "f\"잔고: {money:,}원\""
        },
        {
          id: "width1",
          type: "explain",
          title: "🎯 너비와 정렬",
          content: `글자나 숫자를 정해진 칸 안에 **왼쪽/오른쪽/가운데**로 넣을 수 있어요!

\`\`\`python
print(f"|{'cat':<10}|")   # |cat       |  (왼쪽 정렬, 10칸)
print(f"|{'cat':>10}|")   # |       cat|  (오른쪽 정렬, 10칸)
print(f"|{'cat':^10}|")   # |   cat    |  (가운데 정렬, 10칸)
\`\`\`

- **:<N** = 왼쪽 정렬, N칸 너비
- **:>N** = 오른쪽 정렬, N칸 너비
- **:^N** = 가운데 정렬, N칸 너비

표나 메뉴판처럼 **줄을 맞춰** 출력할 때 정말 편해요!`
        },
        {
          id: "width-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "이름을 오른쪽 정렬로 10칸에 넣어 출력하세요!",
          initialCode: "name = \"홍길동\"\n# :>10 으로 오른쪽 정렬, 10칸\nprint(f\"|{name:___}|\")",
          expectedOutput: "|       홍길동|",
          hint: "{name:>10} 처럼!",
          hint2: "f\"|{name:>10}|\""
        },
        {
          id: "padding1",
          type: "explain",
          title: "🎯 0으로 채우기",
          content: `숫자 앞을 **0으로** 채우고 싶을 때 써요. 시계, 학번, 번호표 같은 곳에 자주 쓰여요!

\`\`\`python
n = 7
print(f"{n:03d}")   # 007  (3자리, 빈 자리는 0)
print(f"{n:05d}")   # 00007 (5자리, 빈 자리는 0)
\`\`\`

- **:0Nd** = 정수를 N자리로 표시, 빈 자리는 **0**
- d는 정수(decimal)를 뜻해요
- 시각 표시 (\`09:05\`), 학번 (\`00042\`) 등에 활용!`
        },
        {
          id: "padding-tryit",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "num을 5자리 정수로 출력하세요! (00042)",
          initialCode: "num = 42\n# :05d 로 5자리, 빈 자리는 0\nprint(f\"{num:___}\")",
          expectedOutput: "00042",
          hint: "{num:05d}",
          hint2: "f\"{num:05d}\""
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`f\"|{'hi':>5}|\"` 의 결과는?",
          options: ["|hi   |", "|   hi|", "| hi  |", "|hi|"],
          answer: 1,
          explanation: ":>5는 오른쪽 정렬, 5칸 너비! 'hi' 앞에 빈 칸 3개가 들어가서 |   hi|"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
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
