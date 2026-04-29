// ============================================
// 레슨 5: 문자열 연산
// ============================================
import { LessonData } from './types'

export const lesson5Data: LessonData = {
  id: "5",
  title: "문자열 연산",
  emoji: "🔗",
  description: "문자열을 더하고 곱해봐요!",
  chapters: [
    {
      id: "ch1",
      title: "문자열 더하기",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 문자열도 더할 수 있어!",
          content: `숫자만 더할 수 있다고요? 문자열도 더할 수 있어요!

\`\`\`python
first = "안녕"
second = "하세요"
print(first + second)  # 안녕하세요
\`\`\`

문자열 + 문자열 = **이어붙이기!**`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 문자열 연결 (Concatenation)",
          content: `**+** 연산자로 문자열을 이어붙여요!

\`\`\`python
name = "철수"
greeting = "안녕, " + name + "!"
print(greeting)  # 안녕, 철수!
\`\`\`

여러 개도 이어붙일 수 있어요:
\`\`\`python
a = "파"
b = "이"
c = "썬"
print(a + b + c)  # 파이썬
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "이름과 인사를 연결해서 출력하세요!",
          initialCode: "name = \"민수\"\n# + 로 문자열을 연결하세요\ngreeting = \"반가워, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "반가워, 민수!",
          hint: "+ 연산자로 문자열을 연결해요",
          hint2: "\"반가워, \" + name + \"!\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"Hello\" + \"World\"의 결과는?",
          options: ["Hello World", "HelloWorld", "Hello + World", "에러"],
          answer: 1,
          explanation: "문자열 +는 공백 없이 바로 이어붙여요! 공백이 필요하면 \" \"를 추가해야 해요."
        }
      ]
    },
    {
      id: "ch2",
      title: "문자열 곱하기",
      emoji: "✖️",
      steps: [
        {
          id: "multiply-explain",
          type: "explain",
          title: "✖️ 문자열 × 숫자",
          content: `문자열에 숫자를 곱하면 **반복**돼요!

\`\`\`python
print("하" * 3)      # 하하하
print("=" * 10)      # ==========
print("안녕! " * 2)  # 안녕! 안녕! 
\`\`\`

**활용 예시:**
\`\`\`python
print("=" * 20)
print("  메뉴판  ")
print("=" * 20)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "별(*)을 10개 출력하세요!",
          initialCode: "# 문자열 * 숫자로 반복!\nprint(\"*\" * ___)",
          expectedOutput: "**********",
          hint: "문자열 * 숫자 = 반복!",
          hint2: "\"*\" * 10"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 구분선 만들기!",
          task: "=를 20개 출력해서 구분선을 만드세요!",
          initialCode: "print(\"=\" * ___)",
          expectedOutput: "====================",
          hint: "\"=\" * 20",
          hint2: "print(\"=\" * 20)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"AB\" * 3의 결과는?",
          options: ["AB3", "ABABAB", "AB AB AB", "에러"],
          answer: 1,
          explanation: "문자열 전체가 3번 반복돼요! AB + AB + AB = ABABAB"
        }
      ]
    },
    {
      id: "ch3",
      title: "문자열과 숫자",
      emoji: "🔢",
      steps: [
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ 문자열 + 숫자 = 에러!",
          content: `문자열과 숫자는 바로 더할 수 없어요!

\`\`\`python
age = 15
print("나이: " + age)  # ❌ 에러!
\`\`\`

**해결 방법: str()로 변환!**
\`\`\`python
age = 15
print("나이: " + str(age))  # ✅ 나이: 15
\`\`\`

💡 f-string을 쓰면 이런 고민이 없어요! 하지만 **+로 연결하는 방법도 알아두면** 좋아요.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "점수를 문자열과 연결해서 출력하세요!",
          initialCode: "score = 100\n# 숫자를 문자열로 바꾸는 함수가 필요해요\nprint(\"점수: \" + ___(score) + \"점\")",
          expectedOutput: "점수: 100점",
          hint: "str()로 숫자를 문자열로 변환!",
          hint2: "str(score)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "이름과 나이를 연결해서 '철수는 15살입니다' 출력하세요!",
          initialCode: "name = \"철수\"\nage = 15\n# 숫자를 문자열로 바꿔서 + 로 연결\nprint(name + \"는 \" + ___(age) + \"살입니다\")",
          expectedOutput: "철수는 15살입니다",
          hint: "str()로 숫자를 문자열로 변환!",
          hint2: "str(age)"
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
          content: `## 문자열 연산 정리

**더하기 (+)** - 이어붙이기
\`\`\`python
"Hello" + "World"  # HelloWorld
\`\`\`

**곱하기 (*)** - 반복
\`\`\`python
"Ha" * 3  # HaHaHa
\`\`\`

**숫자와 연결** - str() 필요
\`\`\`python
"점수: " + str(100)  # 점수: 100
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "예쁜 메뉴판을 만들어보세요!",
          initialCode: "print(\"=\" * ___)\nprint(\"    🍗 치킨집    \")\nprint(\"=\" * ___)\nprint(\"후라이드: \" + str(___) + \"원\")\nprint(\"양념: \" + str(___) + \"원\")",
          expectedOutput: "====================\n    🍗 치킨집    \n====================\n후라이드: 18000원\n양념: 19000원",
          hint: "* 로 구분선 20개, str()로 가격 변환!",
          hint2: "20 / 18000 / 19000"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **+** 로 문자열 이어붙이기
✅ ***** 로 문자열 반복하기
✅ **str()** 로 숫자를 문자열로 변환

다음 시간에는 **문자열 메서드**를 배워서 대소문자 변환, 공백 제거 등을 해볼 거예요! 🚀`
        }
      ]
    }
  ]
}
