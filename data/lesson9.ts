// ============================================
// 레슨 9: 타입 변환
// ============================================
import { LessonData } from './types'

export const lesson9Data: LessonData = {
  id: "9",
  title: "타입 변환",
  emoji: "🔄",
  description: "데이터 타입을 자유자재로 바꿔요!",
  chapters: [
    {
      id: "ch1",
      title: "int() - 정수로 변환",
      emoji: "🔢",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 왜 타입 변환이 필요해?",
          content: `파이썬에서 데이터는 각자 **타입(type)**이 있어요.

\`\`\`python
"123"   # 문자열 — 더하기 하면 이어붙임
123     # 정수   — 더하기 하면 덧셈
\`\`\`

그런데 문자열 \`"123"\`을 숫자처럼 계산하려면?

\`\`\`python
x = "123"
print(x + 1)   # ❌ 에러! 문자열에 숫자 더할 수 없음
\`\`\`

**타입 변환 함수**로 바꿔줘야 해요:

| 함수 | 변환 대상 | 예시 |
|------|-----------|------|
| \`int()\` | 정수로 | \`int("123")\` → 123 |
| \`float()\` | 실수로 | \`float("3.14")\` → 3.14 |
| \`str()\` | 문자열로 | \`str(42)\` → "42" |
| \`bool()\` | 참/거짓으로 | \`bool(0)\` → False |`
        },
        {
          id: "int-explain",
          type: "explain",
          title: "🔢 int() - 정수로 변환",
          content: `**int()** = 정수(integer)로 변환

\`\`\`python
# 문자열 → 정수
num = int("123")
print(num + 1)  # 124

# 실수 → 정수 (소수점 버림!)
num = int(3.7)
print(num)  # 3

# input과 함께
age = int(input("나이: "))
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열을 정수로 변환하세요!",
          initialCode: "text = \"100\"\n# 문자열을 정수로 변환하세요\nnum = ___(text)\nprint(num + 50)",
          expectedOutput: "150",
          hint: "int(text)로 변환!",
          hint2: "int(\"100\")"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 실수를 정수로!",
          task: "실수를 정수로 변환하세요!",
          initialCode: "pi = 3.14159\nprint(___(pi))",
          expectedOutput: "3",
          hint: "int()는 소수점을 버려요!",
          hint2: "int(3.14159) = 3"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`int(\"3.14\")`의 결과는?",
          options: ["3", "3.14", "에러", "\"3\""],
          answer: 2,
          explanation: "문자열 \"3.14\"는 바로 int로 변환 안 돼요! 먼저 float로 바꿔야 해요."
        }
      ]
    },
    {
      id: "ch2",
      title: "float()와 str()",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 float() - 실수로 변환",
          content: `**float()** = 실수(floating point)로 변환

\`\`\`python
# 문자열 → 실수
num = float("3.14")
print(num)  # 3.14

# 정수 → 실수
num = float(10)
print(num)  # 10.0

# input과 함께
height = float(input("키(cm): "))
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열을 실수로 변환하세요!",
          initialCode: "text = \"3.14\"\nnum = ___(text)\nprint(num * 2)",
          expectedOutput: "6.28",
          hint: "float(text)로 변환!",
          hint2: "float(\"3.14\")"
        },
        {
          id: "str-explain",
          type: "explain",
          title: "📝 str() - 문자열로 변환",
          content: `**str()** = 문자열(string)로 변환

\`\`\`python
# 숫자 → 문자열
text = str(123)
print("점수: " + text)  # 점수: 123

# 실수 → 문자열
text = str(3.14)
print("원주율: " + text)  # 원주율: 3.14
\`\`\`

⚠️ f-string을 쓰면 str()이 필요 없어요!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "숫자를 문자열로 변환하세요!",
          initialCode: "score = 95\ntext = ___(score)\nprint(\"점수: \" + text + \"점\")",
          expectedOutput: "점수: 95점",
          hint: "str(score)로 변환!",
          hint2: "str(95)"
        }
      ]
    },
    {
      id: "ch3",
      title: "bool()과 에러 처리",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ bool() - 불리언으로 변환",
          content: `**bool()** = 참/거짓으로 변환

**거짓(False)이 되는 것:**
\`\`\`python
bool(0)       # False
bool(0.0)     # False
bool("")      # False (빈 문자열)
bool(None)    # False
\`\`\`

**나머지는 모두 참(True)!**
\`\`\`python
bool(1)       # True
bool(-1)      # True
bool("hello") # True
\`\`\`

💡 빈 리스트 \`[]\`도 False가 돼요! 리스트는 나중에 배울 거예요.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "0과 빈 문자열의 bool 값을 확인하세요!",
          initialCode: "# 각 값의 bool 결과를 예측해보세요\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))",
          expectedOutput: "False\nTrue\nFalse\nTrue",
          hint: "0과 빈 문자열은 False!",
          hint2: "bool(0) = False"
        },
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ 변환 에러 주의!",
          content: `잘못된 변환은 에러가 나요:

\`\`\`python
int("abc")      # ❌ 에러! 숫자가 아님
int("3.14")     # ❌ 에러! 소수점 있음
float("hello")  # ❌ 에러! 숫자가 아님
\`\`\`

**안전한 변환:**
\`\`\`python
# 소수점 있는 문자열 → 정수
text = "3.14"
num = int(float(text))  # float 먼저!
print(num)  # 3
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "bool(\"\")의 결과는?",
          options: ["True", "False", "\"\"", "에러"],
          answer: 1,
          explanation: "빈 문자열 \"\"은 False! 비어있으면 거짓이에요."
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
          content: `## 타입 변환 함수

| 함수 | 설명 | 예시 |
|------|------|------|
| **int()** | 정수로 | int("123") → 123 |
| **float()** | 실수로 | float("3.14") → 3.14 |
| **str()** | 문자열로 | str(123) → "123" |
| **bool()** | 불리언으로 | bool(1) → True |

**기억하세요!**
- input()은 항상 문자열!
- 계산하려면 int() 또는 float()!
- 0, "", [] 등은 False!`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "간단한 계산기를 만들어보세요!",
          initialCode: "a = '25'\nb = '17'\n\n# 문자열을 숫자로 변환\nnum_a = ___(a)\nnum_b = ___(b)\n\nprint(f'{num_a} + {num_b} = {num_a + num_b}')\nprint(f'{num_a} × {num_b} = {num_a * num_b}')\nprint(f'합계의 타입: {type(num_a + num_b)}')",
          expectedOutput: "25 + 17 = 42\n25 × 17 = 425\n합계의 타입: <class 'int'>",
          hint: "int()로 문자열을 정수로 변환!",
          hint2: "int(a)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **int()** - 정수로 변환
✅ **float()** - 실수로 변환
✅ **str()** - 문자열로 변환
✅ **bool()** - 불리언으로 변환

다음 시간에는 **input() 입력**을 배워요! 🚀`
        }
      ]
    }
  ]
}
