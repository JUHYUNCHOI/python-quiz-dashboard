// ============================================
// 레슨 2: 데이터 타입
// ============================================
import { LessonData } from './types'

export const lesson2Data: LessonData = {
  id: "2",
  title: "데이터 타입",
  emoji: "📊",
  description: "숫자, 문자열, 불리언의 차이를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "데이터 타입이란?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📊 데이터에도 종류가 있다!",
          content: `현실에서도 데이터는 종류가 다르죠?

- **숫자**: 100, 3.14, -5
- **글자**: "안녕", "파이썬"
- **예/아니오**: 참, 거짓

파이썬도 이런 **데이터 타입**을 구분해요!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 4가지 기본 타입",
          content: `**1. 정수 (int)** - 소수점 없는 숫자
\`\`\`python
10, -5, 0, 1000
\`\`\`

**2. 실수 (float)** - 소수점 있는 숫자
\`\`\`python
3.14, -0.5, 2.0
\`\`\`

**3. 문자열 (str)** - 글자들
\`\`\`python
"안녕", '파이썬', "123"
\`\`\`

**4. 불리언 (bool)** - 참/거짓
\`\`\`python
True, False
\`\`\``
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "3.14는 어떤 타입일까요?",
          options: ["int (정수)", "float (실수)", "str (문자열)", "bool (불리언)"],
          answer: 1,
          explanation: "소수점이 있으니까 float(실수)예요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "타입 확인하기",
      emoji: "🔍",
      steps: [
        {
          id: "type-explain",
          type: "explain",
          title: "🔍 type() 함수",
          content: `**type()**으로 데이터 타입을 확인해요!

\`\`\`python
print(type(10))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type('안녕'))   # <class 'str'>
print(type(True))     # <class 'bool'>
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "100의 타입을 확인해보세요!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'int'>",
          hint: "type() 안에 값을 넣어요",
          hint2: "100",
          choices: ["100", "3.14", "'파이썬'", "True"]
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 문자열 타입 확인!",
          task: "'파이썬'의 타입을 확인해보세요!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'str'>",
          hint: "문자열은 str!",
          hint2: "'파이썬'",
          choices: ["100", "3.14", "'파이썬'", "True"]
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "type('123')의 결과는?",
          options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "123"],
          answer: 2,
          explanation: "따옴표 안에 있으면 문자열(str)이에요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "불리언 타입",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ True와 False",
          content: `**불리언(bool)**은 참/거짓 두 가지만!

\`\`\`python
print(True)   # 참
print(False)  # 거짓
\`\`\`

⚠️ **대문자로 시작**해야 해요!
- ✅ True, False
- ❌ true, false

**비교하면 불리언이 나와요:**
\`\`\`python
print(10 > 5)   # True
print(10 < 5)   # False
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "10 > 5 → 10이 5보다 크니까 True!\n빈칸에 5를 넣어보세요.",
          initialCode: "print(10 > ___)",
          expectedOutput: "True",
          hint: "비교 결과는 True 또는 False!",
          hint2: "5",
          choices: ["5", "10", "20", "15"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ False도 해봐요!",
          task: "3 > 7 → 3이 7보다 작으니까 False!\n빈칸에 7을 넣어보세요.",
          initialCode: "print(3 > ___)",
          expectedOutput: "False",
          hint: "3은 7보다 작죠?",
          hint2: "7",
          choices: ["7", "2", "1", "0"]
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
          content: `## 데이터 타입 정리

| 타입 | 예시 | 설명 |
|------|------|------|
| int | 10, -5 | 정수 |
| float | 3.14, 2.0 | 실수 |
| str | "안녕", '123' | 문자열 |
| bool | True, False | 참/거짓 |

**기억하세요!**
- 문자열은 **따옴표** 필수
- 불리언은 **대문자**로 시작`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "각 줄에서 type() 안에 바로 앞의 값을 그대로 넣으세요!\n예) print(42, type( 42 )) → 42 <class 'int'>",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "첫 번째 빈칸에는 42, 두 번째에는 3.14 ...",
          hint2: "42",
          choices: ["42", "3.14", "'Hello'", "True"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **int** - 정수 (10, -5)
✅ **float** - 실수 (3.14)
✅ **str** - 문자열 ("안녕")
✅ **bool** - 불리언 (True, False)
✅ **type()** - 타입 확인

다음 시간에는 **변수**를 배워요! 📦`
        }
      ]
    }
  ]
}
