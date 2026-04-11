// ============================================
// 레슨 4: 연산자
// ============================================
import { LessonData } from './types'

export const lesson4Data: LessonData = {
  id: "4",
  title: "연산자",
  emoji: "🧮",
  description: "계산하고 비교하는 연산자를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "산술 연산자",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "산술 연산자",
          content: `**연산자(operator)**는 숫자끼리 계산할 때 쓰는 기호예요.

| 연산자 | 의미 | 예시 |
|--------|------|------|
| \`+\` | 더하기 | \`10 + 3\` → 13 |
| \`-\` | 빼기 | \`10 - 3\` → 7 |
| \`*\` | 곱하기 | \`10 * 3\` → 30 |
| \`/\` | 나누기 | \`10 / 3\` → 3.333... |

\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.3333333333333335
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "19000 * 3 을 계산해서 출력하세요!",
          initialCode: "# 19000 * 3을 계산하세요\nprint(___)",
          expectedOutput: "57000",
          hint: "곱하기는 * 기호예요",
          hint2: "print(19000 * 3)"
        },
        {
          id: "special-explain",
          type: "explain",
          title: "🔢 특별한 연산자",
          content: `### 나누기 관련 연산자

\`\`\`python
print(10 / 3)   # 나누기 → 3.333...
print(10 // 3)  # 몫만 → 3
print(10 % 3)   # 나머지만 → 1
print(2 ** 3)   # 거듭제곱 → 8
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "17을 5로 나눈 나머지를 출력하세요!",
          initialCode: "# 나머지 연산자 %를 사용하세요\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "나머지는 % 기호예요",
          hint2: "print(17 % 5)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "2 ** 4 의 결과는?",
          options: ["6", "8", "16", "24"],
          answer: 2,
          explanation: "2 ** 4 = 2의 4승 = 2×2×2×2 = 16"
        }
      ]
    },
    {
      id: "ch2",
      title: "비교 연산자",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ 비교하기",
          content: `두 값을 비교하면 **True** 또는 **False**가 나와요!

\`\`\`python
print(10 > 5)    # 크다 → True
print(10 < 5)    # 작다 → False
print(10 >= 10)  # 크거나 같다 → True
print(10 <= 5)   # 작거나 같다 → False
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "100 > 50 의 결과를 출력하세요!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "> 는 '크다'를 비교해요",
          hint2: "print(100 > 50)"
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 같다 / 다르다",
          content: `**같다**는 \`==\` (등호 2개!)
**다르다**는 \`!=\`

\`\`\`python
print(10 == 10)  # 같다 → True
print(10 == 5)   # 같다 → False
print(10 != 5)   # 다르다 → True
\`\`\`

⚠️ \`=\`는 저장, \`==\`는 비교!`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`x = 10` 과 `x == 10` 의 차이는?",
          options: [
            "둘 다 같다",
            "= 는 저장, == 는 비교",
            "= 는 비교, == 는 저장",
            "둘 다 에러"
          ],
          answer: 1,
          explanation: "= 는 값을 저장, == 는 두 값이 같은지 비교!"
        }
      ]
    },
    {
      id: "ch3",
      title: "논리 연산자",
      emoji: "🔗",
      steps: [
        {
          id: "logic-explain",
          type: "explain",
          title: "🔗 and, or, not",
          content: `여러 조건을 합칠 수 있어요!

\`\`\`python
# and: 둘 다 True여야 True
print(True and True)   # True
print(True and False)  # False

# or: 하나만 True면 True
print(True or False)   # True

# not: 반대로
print(not True)        # False
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "(10 > 5) and (3 < 7) 의 결과를 출력하세요!",
          initialCode: "print((10 > 5) ___ (3 < 7))",
          expectedOutput: "True",
          hint: "둘 다 True면 and 결과도 True!",
          hint2: "print((10 > 5) and (3 < 7))"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "True or False 의 결과는?",
          options: ["True", "False", "에러", "TrueFalse"],
          answer: 0,
          explanation: "or는 하나만 True여도 True!"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "compound-explain",
          type: "explain",
          title: "📝 복합 대입 연산자",
          content: `변수 값을 바꿀 때 더 짧게 쓸 수 있어요!

\`\`\`python
score = 100
score = score + 10  # 긴 방법
score += 10         # 짧은 방법 (같은 의미!)
\`\`\`

\`+=\`, \`-=\`, \`*=\`, \`/=\` 등 사용 가능!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "hp = 100에서 hp -= 30 후 출력하세요!",
          initialCode: "hp = 100\nhp ___ 30\nprint(hp)",
          expectedOutput: "70",
          hint: "-= 는 빼고 저장해요",
          hint2: "hp = 100\nhp -= 30\nprint(hp)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "가격 계산기를 완성하세요! (단가 15000원, 3개, 10% 할인)",
          initialCode: "price = 15000\ncount = 3\n# 합계를 계산하세요\ntotal = ___\n# 10% 할인 계산\ndiscount = ___\n# 최종 가격\nfinal = ___\n\nprint(f'단가: {price}원')\nprint(f'수량: {count}개')\nprint(f'합계: {total}원')\nprint(f'할인: {discount}원')\nprint(f'최종: {final}원')",
          expectedOutput: "단가: 15000원\n수량: 3개\n합계: 45000원\n할인: 4500.0원\n최종: 40500.0원",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **산술 연산자**: +, -, *, /, //, %, **
✅ **비교 연산자**: >, <, >=, <=, ==, !=
✅ **논리 연산자**: and, or, not
✅ **복합 대입**: +=, -=, *=, /=

다음 시간에는 **문자열 연산**을 배워서 글자를 더하고 곱해봐요! 🚀`
        }
      ]
    }
  ]
}
