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
          content: `지금까지 이렇게 했어요:

\`\`\`python
name = "철수"
age = 15
print("이름: " + name + ", 나이: " + str(age))
\`\`\`

너무 복잡하죠? 😩

**f-string**을 쓰면 훨씬 쉬워요!`
        },
        {
          id: "fstring-explain",
          type: "explain",
          title: "✨ f-string 사용법",
          content: `문자열 앞에 **f**를 붙이고, 변수는 **{ }** 안에!

\`\`\`python
name = "철수"
age = 15
print(f"이름: {name}, 나이: {age}")
# 이름: 철수, 나이: 15
\`\`\`

**str() 변환도 필요 없어요!**
\`\`\`python
price = 19000
print(f"가격: {price}원")  # 가격: 19000원
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "f-string으로 이름을 출력하세요!",
          initialCode: "name = \"민수\"\nprint(f\"안녕, {name}!\")",
          expectedOutput: "안녕, 민수!",
          hint: "f\"...{변수}...\" 형태로!",
          hint2: "f\"안녕, {name}!\""
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 여러 변수 사용!",
          task: "이름과 나이를 f-string으로 출력하세요!",
          initialCode: "name = \"영희\"\nage = 14\nprint(f\"{name}는 {age}살입니다\")",
          expectedOutput: "영희는 14살입니다",
          hint: "{name}와 {age} 둘 다 넣으면 돼요!",
          hint2: "f\"{name}는 {age}살입니다\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "x = 10일 때, f\"x = {x}\"의 결과는?",
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
          title: "🧮 { } 안에서 계산도 돼요!",
          content: `f-string의 { } 안에서 계산할 수 있어요:

\`\`\`python
a = 10
b = 3
print(f"{a} + {b} = {a + b}")
# 10 + 3 = 13

print(f"{a} × {b} = {a * b}")
# 10 × 3 = 30
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "f-string 안에서 계산하세요!",
          initialCode: "price = 19000\ncount = 3\nprint(f\"총 금액: {price * count}원\")",
          expectedOutput: "총 금액: 57000원",
          hint: "{price * count}로 계산!",
          hint2: "f\"총 금액: {price * count}원\""
        },
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 { } 안에서 메서드도!",
          content: `메서드 호출도 가능해요:

\`\`\`python
name = "python"
print(f"대문자: {name.upper()}")
# 대문자: PYTHON

text = "  hello  "
print(f"정리: '{text.strip()}'")
# 정리: 'hello'
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "f-string 안에서 upper()를 사용하세요!",
          initialCode: "lang = \"python\"\nprint(f\"나는 {lang.upper()}을 배운다!\")",
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
          initialCode: "score = 85.7777\nprint(f\"평균: {score:.1f}점\")",
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
          initialCode: "money = 50000000\nprint(f\"잔고: {money:,}원\")",
          expectedOutput: "잔고: 50,000,000원",
          hint: "{money:,}",
          hint2: "f\"잔고: {money:,}원\""
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "x = 3.14159일 때, f\"{x:.2f}\"의 결과는?",
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
\`\`\``
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "영수증을 f-string으로 만들어보세요!",
          initialCode: "item = \"치킨\"\nprice = 19000\nqty = 2\ntotal = price * qty\n\nprint(f\"=== 영수증 ===\")\nprint(f\"품목: {item}\")\nprint(f\"단가: {price:,}원\")\nprint(f\"수량: {qty}개\")\nprint(f\"합계: {total:,}원\")",
          expectedOutput: "=== 영수증 ===\n품목: 치킨\n단가: 19,000원\n수량: 2개\n합계: 38,000원",
          hint: "f-string과 :, 포맷을 사용!",
          hint2: "f\"합계: {total:,}원\""
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

다음 시간에는 **타입 변환**을 배울 거예요! 🚀`
        }
      ]
    }
  ]
}
