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
          title: "🎮 대화하는 프로그램!",
          content: `지금까지는 우리가 일방적으로 출력만 했어요.

이제 **사용자의 입력**을 받아볼 거예요!

\`\`\`python
name = input('이름이 뭐야? ')
print(f'안녕, {name}!')
\`\`\`

실행하면:
\`\`\`
이름이 뭐야? 홍길동
안녕, 홍길동!
\`\`\`

### 왜 중요한가?

지금까지 만든 프로그램은 **고정된 값** 만 다뤘어요. \`name = "철수"\` 처럼 코드에 박혀 있어서 다른 사람한테 쓰려면 코드를 고쳐야 했어요.

**\`input()\` 이 들어오면** 같은 코드가 누구에게나 동작해요. 진짜 "프로그램" 느낌이 나기 시작.`
        },
        {
          id: "concept",
          type: "explain",
          title: "📥 input() 함수",
          content: `\`input()\`은 사용자가 입력할 때까지 기다려요!

\`\`\`python
answer = input('질문 내용')
\`\`\`

1. '질문 내용'이 화면에 나타나고
2. 사용자가 입력하고 Enter를 누르면
3. 입력한 값이 answer 변수에 저장돼요!

⚠️ **주의:** 웹 환경에서는 input()이 작동하지 않아요!
그래서 실습에서는 변수에 직접 값을 넣거나 stdin (입력 패널) 으로 연습할 거예요.

### 프롬프트 (안내 문구) 옵션

\`\`\`python
# 옵션 1) 안내 없이
data = input()           # 사용자가 그냥 입력

# 옵션 2) 안내 있음
data = input('이름: ')   # "이름: " 보여주고 그 자리에서 받음

# 옵션 3) 안내 + 줄바꿈 (가독성)
data = input('이름을 입력하세요:\\n')
\`\`\`

> 💡 안내 문구 끝에 \`': '\` (콜론+공백) 을 붙이는 게 가장 흔한 스타일.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ input() 흉내내기!",
          task: "name에 '홍길동'을 저장하고 인사하세요!",
          initialCode: "# input() 대신 직접 값을 넣어요\nname = ___\nprint(f'안녕, {name}!')",
          expectedOutput: "안녕, 홍길동!",
          hint: "name = '이름'으로 저장!",
          hint2: "name = '홍길동'"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`input()`의 결과는 항상 어떤 타입일까요?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "입력에 따라 다름"],
          answer: 2,
          explanation: "input()은 항상 문자열(str)을 반환해요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "숫자 입력받기",
      emoji: "🔢",
      steps: [
        {
          id: "problem-explain",
          type: "explain",
          title: "⚠️ 문제 발생!",
          content: `나이를 입력받아서 계산해볼까요?

\`\`\`python
age = input('나이: ')
print(age + 1)  # 에러!!! 😱
\`\`\`

왜 에러가 날까요?
→ input()은 **항상 문자열**을 반환해요!
→ '15' + 1 은 계산 불가!`
        },
        {
          id: "solution-explain",
          type: "explain",
          title: "✅ 해결: int()로 변환!",
          content: `문자열을 숫자로 바꿔야 해요!

\`\`\`python
age = input('나이: ')      # '15' (문자열)
age = int(age)             # 15 (정수로 변환!)
print(age + 1)             # 16 ✅
\`\`\`

더 짧게:
\`\`\`python
age = int(input('나이: '))
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 문자열 → 숫자 변환!",
          task: "문자열 숫자를 정수로 변환해서 계산하세요!",
          initialCode: "# input() 대신 문자열로 받았다고 가정\nage_str = '15'\n\n# 정수로 변환하세요\nage = ___(age_str)\n\n# 1년 후 나이\nprint(f'내년 나이: {age + 1}살')",
          expectedOutput: "내년 나이: 16살",
          hint: "int()로 문자열을 숫자로 변환!",
          hint2: "age = int(age_str)"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 두 숫자 더하기!",
          task: "두 숫자를 더한 결과를 출력하세요!",
          initialCode: "# input()으로 받았다고 가정\na_str = '25'\nb_str = '17'\n\n# 정수로 변환하세요\na = ___(a_str)\nb = ___(b_str)\n\nprint(f'{a} + {b} = {a + b}')",
          expectedOutput: "25 + 17 = 42",
          hint: "int()로 문자열을 정수로 변환!",
          hint2: "a = int(a_str)"
        },
        {
          id: "multi-input",
          type: "explain",
          title: "🎯 한 줄에 여러 값 — input().split()",
          content: `한 줄에 \`3 5 7\` 처럼 여러 값을 받고 싶을 때.

\`\`\`python
# 입력: 3 5 7
data = input().split()
print(data)        # ['3', '5', '7']  ← 문자열 리스트
\`\`\`

\`split()\` 이 공백 기준으로 쪼개줘요 (lesson 18 에서 배운 것).

### 정수로 받기 — map(int, ...) 패턴

\`\`\`python
# 입력: 3 5 7
nums = list(map(int, input().split()))
print(nums)        # [3, 5, 7]  ← 정수 리스트!
print(sum(nums))   # 15
\`\`\`

### 변수에 한 번에 받기 (개수 알 때)

\`\`\`python
# 입력: 25 17
a, b = map(int, input().split())
print(a + b)       # 42 — 직접 더하기 가능
\`\`\`

> 🎯 코딩 테스트 입력 형태가 거의 다 이거예요. 패턴 외워두면 평생 사용.`
        },
        {
          id: "try-multi-input",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 두 정수 받아 곱하기",
          task: "한 줄에 두 정수 받아 곱한 결과를 출력하세요. (입력: 7 8)",
          initialCode: "# 한 줄에 두 정수 받기\na, b = map(int, input().___())\n\nprint(f\"{a} x {b} = {a * b}\")",
          expectedOutput: "7 x 8 = 56",
          stdin: "7 8",
          hint: "input().split() 으로 쪼개고 map(int, ...) 으로 정수 변환.",
          hint2: "a, b = map(int, input().split())"
        },
        {
          id: "input-strip",
          type: "explain",
          title: "🧹 사용자 입력의 보이지 않는 공백",
          content: `사용자가 실수로 공백을 끼워 넣으면 곤란해요.

\`\`\`python
# 사용자가 "  철수  " 라고 입력 (앞뒤 공백)
name = input()
print(f"[{name}]")   # [  철수  ]   ← 공백 그대로
\`\`\`

\`.strip()\` 으로 앞뒤 공백 제거하는 게 안전.

\`\`\`python
name = input().strip()
print(f"[{name}]")   # [철수]   ← 깔끔
\`\`\`

### 자주 쓰는 input 정리 패턴

\`\`\`python
name  = input("이름: ").strip()       # 문자열 + 공백 정리
age   = int(input("나이: "))           # 정수
score = float(input("점수: "))         # 실수
nums  = list(map(int, input().split()))  # 정수 여러 개
\`\`\`

> 💡 \`strip()\` 은 (lesson 6 문자열 메서드) 에서 본 거. \`.lower()\`, \`.upper()\` 와 함께 입력 정리 단골.`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`int('123')`의 결과는?",
          options: ["'123' (문자열)", "123 (정수)", "에러", "123.0 (실수)"],
          answer: 1,
          explanation: "int()는 문자열 '123'을 정수 123으로 변환해요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "실수 입력받기",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 실수 입력받기",
          content: `소수점이 있는 숫자는 \`float()\`를 써요!

\`\`\`python
height = float(input('키(cm): '))
print(f'키: {height}cm')
\`\`\`

**타입 변환 정리:**
- \`int()\`: 정수로 변환
- \`float()\`: 실수로 변환
- \`str()\`: 문자열로 변환`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 실수 변환 연습!",
          task: "키(cm)를 m로 변환해서 출력하세요!",
          initialCode: "# input()으로 받았다고 가정\nheight_str = '175.5'\n\n# 실수로 변환하세요\ncm = ___(height_str)\n\n# m로 변환 (100으로 나누기)\nm = cm / 100\n\nprint(f'{cm}cm = {m}m')",
          expectedOutput: "175.5cm = 1.755m",
          hint: "float()로 실수 변환 후 100으로 나눠요",
          hint2: "cm / 100"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`int('3.14')`의 결과는?",
          options: ["3", "3.14", "에러", "'3'"],
          answer: 2,
          explanation: "int()는 소수점 문자열을 바로 변환 못 해요! float()를 먼저 써야 해요."
        },
        {
          id: "float-trap",
          type: "explain",
          title: "⚠️ float ↔ int 변환의 함정",
          content: `\`int(input())\` 에 \`"3.14"\` 가 들어오면 에러나요. 두 단계로:

\`\`\`python
# ❌ 직접 int 못 함
int("3.14")        # ValueError

# ✅ float 거쳐서 int
int(float("3.14"))  # 3 — 소수점 잘림 (round 아님!)

# 반올림하려면
round(float("3.14"))   # 3
round(float("3.78"))   # 4
\`\`\`

### int 의 잘림 vs round 의 반올림

| 값 | int(float(x)) | round(float(x)) |
|---|---|---|
| "3.14" | 3 | 3 |
| "3.78" | **3** (잘림) | **4** (반올림) |
| "-2.5" | -2 (0 쪽으로) | -2 (짝수쪽) |
| "2.5"  | 2 (잘림) | 2 (짝수쪽) |

> 🎯 **int 는 0 쪽으로 자름**, round 는 반올림. 의도에 맞게 골라요.

### 안전한 정수 변환 함수

\`\`\`python
def safe_int(s, default=0):
    try:
        return int(float(s))
    except ValueError:
        return default

print(safe_int("42"))        # 42
print(safe_int("3.14"))      # 3
print(safe_int("hello"))     # 0 (기본값)
\`\`\`

(try/except 는 lesson 37 에서 자세히)`
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
          title: "🏆 미션 1 — 치킨 가격 계산",
          task: "치킨 가격과 수량으로 총 가격을 계산하세요!",
          initialCode: "# input()으로 받았다고 가정\nprice_str = '19000'\ncount_str = '3'\n\n# 정수로 변환\nprice = ___(price_str)\ncount = ___(count_str)\n\n# 총 가격 계산\ntotal = ___\n\nprint(f'치킨 {count}마리')\nprint(f'총 가격: {total:,}원')",
          expectedOutput: "치킨 3마리\n총 가격: 57,000원",
          hint: "int()로 변환 후 곱하기!",
          hint2: "int(price_str) / price * count"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 자기소개 카드 만들기",
          task: "input() 으로 이름, 나이, 키 받아 자기소개 카드를 출력하세요. (입력은 stdin 3 줄)",
          initialCode: "name = input(\"이름: \").___()       # 공백 정리\nage = ___(input(\"나이: \"))         # 정수\nheight = ___(input(\"키(cm): \"))    # 실수\n\n# 카드 출력\nprint(\"=\" * 20)\nprint(f\"이름: {name}\")\nprint(f\"나이: {age}살 (내년: {age + 1}살)\")\nprint(f\"키: {height}cm ({height/100:.2f}m)\")\nprint(\"=\" * 20)",
          expectedOutput: "====================\n이름: 철수\n나이: 15살 (내년: 16살)\n키: 175.5cm (1.76m)\n====================",
          stdin: "철수\n15\n175.5",
          hint: "name 은 strip(), age 는 int(), height 는 float() 사용.",
          hint2: "name = input().strip()\nage = int(input())\nheight = float(input())"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 점수 평균 계산",
          task: "한 줄에 공백 구분 점수 5 개를 받아 **평균과 최고점/최저점** 을 출력하세요.",
          initialCode: "# map + split 패턴\nscores = list(map(___, input().split()))\n\nprint(f\"입력: {scores}\")\nprint(f\"평균: {sum(scores) / len(scores):.1f}\")\nprint(f\"최고: {max(scores)}\")\nprint(f\"최저: {min(scores)}\")",
          expectedOutput: "입력: [85, 92, 78, 95, 67]\n평균: 83.4\n최고: 95\n최저: 67",
          stdin: "85 92 78 95 67",
          hint: "list(map(int, input().split())) 패턴.",
          hint2: "scores = list(map(int, input().split()))"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ \`input()\` 으로 사용자 입력 받기
✅ input() 은 **항상 문자열** 반환
✅ \`int()\`, \`float()\` 로 숫자 변환
✅ **input().split()** 으로 한 줄에 여러 값
✅ **map(int, input().split())** 코딩 테스트 단골 패턴
✅ \`a, b = map(int, input().split())\` — 변수에 한 번에
✅ \`.strip()\` 으로 입력 공백 정리
✅ float ↔ int 변환 함정 (소수점 문자열은 \`int(float(s))\`)
✅ \`int\` 잘림 vs \`round\` 반올림 차이

💡 **참고:** 실제 input() 은 터미널이나 IDE 에서 실행해보세요!

🎉 **Part 1 완료!**
다음 Part 에서는 **조건문** 을 배워요! 🧠`
        }
      ]
    }
  ]
}
