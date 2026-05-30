// ============================================
// 레슨 10: input() 입력
// ============================================
import { LessonData } from './types'

export const lesson10Data: LessonData = {
  id: "10",
  title: "input() 입력",
  emoji: "⌨️",
  description: "사용자에게 입력받는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "input() 기초",
      emoji: "⌨️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 학생이 직접 답해주는 코드!",
          content: `지금까지는 코드 안에 값을 **우리가 직접** 적어놨어요.

\`\`\`python
name = "철수"
print(f"안녕, {name}!")
\`\`\`

이제는 **누가 실행하든** 그 사람의 이름이 들어가도록 만들어볼 거예요.

\`\`\`python
name = input("이름이 뭐야? ")
print(f"안녕, {name}!")
\`\`\`

코드를 안 고쳐도 영희가 실행하면 "안녕, 영희!", 민준이가 실행하면 "안녕, 민준!" — 진짜 프로그램 같아지죠!`
        },
        {
          id: "concept",
          type: "interactive",
          title: "🎬 input() 이 값을 받는 모습",
          component: "inputVisualizer",
          componentProps: { presetIds: ["basic", "int-trap"] },
          description: `\`input()\` 은 사용자가 키보드로 친 글자를 변수에 넣어줘요.

⚠️ **중요:** 받은 값은 **항상 문자열 (str)**. 숫자만 쳐도 문자열로 들어와요!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 따라치기 — 이름 받아 인사하기",
          task: "input() 으로 이름 받아서 인사를 출력하세요!",
          initialCode: "name = input(\"이름이 뭐야? \")\nprint(f'안녕, {___}!')",
          expectedOutput: "안녕, 호두!",
          stdin: "호두",
          hint: "받은 이름은 `name` 변수에 들어 있어요.",
          hint2: "name"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`input()` 의 결과는 항상 어떤 타입일까요?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "입력에 따라 다름"],
          answer: 2,
          explanation: "input() 은 사용자가 뭘 쳐도 항상 문자열(str) 로 돌려줘요. 숫자가 필요하면 int() 로 바꿔야 해요."
        }
      ]
    },
    {
      id: "ch2",
      title: "숫자로 받기",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ 문자열 + 1 = 에러!",
          content: `나이를 받아서 내년 나이를 구해볼게요.

\`\`\`python
age = input("나이: ")    # "15" — 문자열!
print(age + 1)           # ❌ TypeError
\`\`\`

\`age\` 는 \`"15"\` (문자열). 문자열에 숫자 1 을 더할 수 없어요.`
        },
        {
          id: "solution-explain",
          type: "interactive",
          title: "✅ int() 로 진짜 숫자로!",
          component: "inputVisualizer",
          componentProps: { presetIds: ["int-input", "float-input"] },
          description: `\`int(input(...))\` — input 결과를 \`int()\` 로 감싸면 진짜 정수가 돼요. 이제 계산 가능!

소수점이 있는 값은 \`float()\`.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 따라치기 — 내년 나이",
          task: "나이를 받아서 내년 나이를 출력하세요.",
          initialCode: "age = ___(input(\"나이: \"))\nprint(f\"내년: {age + 1}살\")",
          expectedOutput: "내년: 16살",
          stdin: "15",
          hint: "input() 결과를 int() 로 감싸요.",
          hint2: "int"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 — 좋아하는 숫자 두 배",
          task: "숫자 하나 받아서 두 배 출력. (입력: 7)",
          initialCode: "n = ___(input(\"숫자: \"))\nprint(f\"두 배: {___}\")",
          expectedOutput: "두 배: 14",
          stdin: "7",
          hint: "int() 로 정수 변환 후 n * 2.",
          hint2: "int / n * 2"
        },
        {
          id: "multi-input",
          type: "explain",
          title: "🎯 한 줄에 두 값 — input().split()",
          content: `한 줄에 \`3 5\` 처럼 띄어쓰기로 나뉜 두 값을 받고 싶을 때.

\`\`\`python
# 입력: 3 5
a, b = input().split()
print(a)   # "3"  ← 문자열!
print(b)   # "5"  ← 문자열!
\`\`\`

\`.split()\` 이 공백으로 잘라줘요. **각각 문자열** — 숫자로 쓰려면 \`int()\` 한 번 더.

\`\`\`python
a, b = input().split()
print(int(a) + int(b))   # 8
\`\`\``
        },
        {
          id: "try-multi-input",
          type: "tryit",
          title: "🖥️ 직접 — 두 수 곱하기",
          task: "한 줄에 두 정수 받아 곱한 결과 출력. (입력: 7 8)",
          initialCode: "a, b = input().___()\nprint(f\"{a} x {b} = {int(a) * int(b)}\")",
          expectedOutput: "7 x 8 = 56",
          stdin: "7 8",
          hint: ".split() 으로 공백 기준 쪼개기.",
          hint2: "split"
        },
        {
          id: "input-strip",
          type: "explain",
          title: "🧹 보이지 않는 공백 정리 — .strip()",
          content: `사용자가 실수로 앞뒤에 공백을 끼우면 곤란해요.

\`\`\`python
# 사용자가 "  철수  " 입력 (앞뒤 공백)
name = input()
print(f"[{name}]")         # [  철수  ]   ← 공백 그대로!
\`\`\`

\`.strip()\` 으로 앞뒤 공백 제거.

\`\`\`python
name = input().strip()
print(f"[{name}]")         # [철수]   ← 깔끔
\`\`\`

> 💡 \`.strip()\` 은 레슨 6 (문자열 메서드) 에서 본 거. 이름·아이디 같은 입력에 단골.`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`int('123')` 의 결과는?",
          options: ["'123' (문자열)", "123 (정수)", "에러", "123.0 (실수)"],
          answer: 1,
          explanation: "int() 는 문자열 '123' 을 정수 123 으로 바꿔줘요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "실수와 함정",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 소수점 있는 값은 float()",
          content: `키·점수·가격처럼 소수점이 있으면 \`float()\`.

\`\`\`python
height = float(input("키(cm): "))
print(f"키: {height}cm")
\`\`\`

**한 줄 정리:**
- \`int()\` — 정수
- \`float()\` — 실수 (소수점)
- \`str()\` — 문자열`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 — 키 cm → m",
          task: "키(cm) 받아서 m 로 변환. (입력: 175.5)",
          initialCode: "cm = ___(input(\"키(cm): \"))\nm = cm / 100\nprint(f\"{cm}cm = {m}m\")",
          expectedOutput: "175.5cm = 1.755m",
          stdin: "175.5",
          hint: "소수점 있는 값 → float().",
          hint2: "float"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`int('3.14')` 의 결과는?",
          options: ["3", "3.14", "에러 (ValueError)", "'3'"],
          answer: 2,
          explanation: "int() 는 소수점 있는 문자열을 바로 못 받아요! float() 으로 먼저 바꿔야 해요: `int(float('3.14'))` → 3."
        },
        {
          id: "float-trap",
          type: "explain",
          title: "⚠️ float ↔ int 함정",
          content: `\`int("3.14")\` 는 **에러**. 두 단계 필요:

\`\`\`python
int("3.14")          # ❌ ValueError
int(float("3.14"))   # ✅ 3 — 소수점이 잘림 (반올림 아님!)
\`\`\`

### 잘림 vs 반올림

| 값 | \`int(float(x))\` | \`round(float(x))\` |
|---|---|---|
| "3.14" | 3 | 3 |
| "3.78" | **3** (잘림) | **4** (반올림) |

> 🎯 \`int\` 는 소수점을 떼버려요. 반올림이 필요하면 \`round()\`.

### 숫자 아닌 글자가 오면?

\`\`\`python
int("hello")   # ❌ ValueError — 프로그램 멈춤
\`\`\`

> 💡 지금은 "사용자가 숫자만 친다" 고 믿고 코딩. 에러 잡는 방법은 레슨 37 (try/except).`
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
          title: "🏆 미션 1 — 나의 인사 카드",
          task: "이름과 좋아하는 색을 받아서 인사 카드를 만드세요!",
          initialCode: "name = input(\"이름: \").___()        # 앞뒤 공백 정리\ncolor = input(\"좋아하는 색: \").strip()\n\nprint(f\"안녕, {name}!\")\nprint(f\"{name} 의 인생 색은 {color} 😎\")",
          expectedOutput: "안녕, 호두!\n호두 의 인생 색은 보라색 😎",
          stdin: "호두\n보라색",
          hint: "input() 뒤에 .strip() 붙이면 앞뒤 공백 제거.",
          hint2: "strip"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 자기소개 카드",
          task: "이름, 나이, 키를 받아 자기소개 카드를 출력. (입력은 stdin 3 줄)",
          initialCode: "name = input(\"이름: \").strip()         # 문자열\nage = ___(input(\"나이: \"))             # 정수\nheight = ___(input(\"키(cm): \"))        # 실수\n\nprint(\"=\" * 20)\nprint(f\"이름: {name}\")\nprint(f\"나이: {age}살 (내년: {age + 1}살)\")\nprint(f\"키: {height}cm ({height/100:.2f}m)\")\nprint(\"=\" * 20)",
          expectedOutput: "====================\n이름: 철수\n나이: 15살 (내년: 16살)\n키: 175.5cm (1.76m)\n====================",
          stdin: "철수\n15\n175.5",
          hint: "나이는 int(), 키는 float().",
          hint2: "int / float"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 세 과목 평균",
          task: "세 과목 점수를 한 줄씩 받아 평균을 출력하세요.",
          initialCode: "kor = ___(input(\"국어: \"))\nmath = ___(input(\"수학: \"))\neng = ___(input(\"영어: \"))\n\navg = (kor + math + eng) / 3\nprint(f\"평균: {avg:.1f}\")",
          expectedOutput: "평균: 83.3",
          stdin: "85\n90\n75",
          hint: "각 input() 을 int() 로 감싸요.",
          hint2: "int"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ \`input()\` — 사용자가 친 값을 변수에 받기
✅ 받은 값은 **항상 문자열** (str)
✅ \`int()\`, \`float()\` 로 숫자 변환
✅ \`input().split()\` — 한 줄에 두 값 (a, b = ...)
✅ \`.strip()\` — 앞뒤 공백 정리
✅ \`int(float("3.14"))\` — 소수점 문자열 → 정수 (잘림)

💡 진짜 \`input()\` 은 터미널·IDE 에서 실행해보세요. 코드린 웹에서는 stdin 패널로 연습!

🎉 **Part 1 완료!** 다음은 **조건문 (if/else)** — 코드에게 "이럴 땐 이렇게, 저럴 땐 저렇게" 시키기! 🧠`
        }
      ]
    }
  ]
}
