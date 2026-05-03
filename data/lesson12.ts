// ============================================
// 레슨 12: 조건문 심화
// ============================================
import { LessonData } from './types'

export const lesson12Data: LessonData = {
  id: "12",
  title: "조건문 심화",
  emoji: "🔀",
  description: "중첩 조건문과 논리 연산자를 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "논리 연산자",
      emoji: "🔗",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 여러 조건을 한 번에!",
          content: `"나이가 13세 이상 **그리고** 19세 미만"처럼
여러 조건을 조합하고 싶을 때가 있어요!

**논리 연산자**로 조건을 연결해요:
- **and** - 둘 다 참이면 참
- **or** - 하나라도 참이면 참
- **not** - 반대로`
        },
        {
          id: "and-explain",
          type: "explain",
          title: "🔗 and - 그리고",
          content: `**and** = 둘 다 True여야 True!

\`\`\`python
age = 15
# 청소년: 13세 이상 그리고 19세 미만
if age >= 13 and age < 19:
    print("청소년입니다")
\`\`\`

**and 진리표:**
- True and True → True
- True and False → False
- False and True → False
- False and False → False`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "점수가 80 이상 100 이하인지 확인하세요!",
          initialCode: "score = 85\n\n# 두 조건이 모두 참일 때만 합격이에요\nif score >= 80 ___ score <= 100:\n    print(\"합격!\")\nelse:\n    print(\"불합격\")",
          expectedOutput: "합격!",
          hint: "and로 두 조건을 연결!",
          hint2: "score >= 80 and score <= 100"
        },
        {
          id: "or-explain",
          type: "explain",
          title: "🔗 or - 또는",
          content: `**or** = 하나라도 True면 True!

\`\`\`python
day = "토요일"
# 주말: 토요일 또는 일요일
if day == "토요일" or day == "일요일":
    print("주말입니다!")
\`\`\`

**or 진리표:**
- True or True → True
- True or False → True
- False or True → True
- False or False → False`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "VIP이거나 쿠폰이 있으면 할인!",
          initialCode: "is_vip = False\nhas_coupon = True\n\n# 둘 중 하나만 참이어도 할인이에요\nif is_vip ___ has_coupon:\n    print(\"10% 할인!\")\nelse:\n    print(\"정가\")",
          expectedOutput: "10% 할인!",
          hint: "or로 두 조건 중 하나만 참이면 됨!",
          hint2: "is_vip or has_coupon"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "True and False의 결과는?",
          options: ["True", "False", "에러", "None"],
          answer: 1,
          explanation: "and는 둘 다 True여야 True! 하나라도 False면 False예요."
        }
      ]
    },
    {
      id: "ch2",
      title: "not과 복합 조건",
      emoji: "🔄",
      steps: [
        {
          id: "not-explain",
          type: "explain",
          title: "🔄 not - 반대로",
          content: `**not** = True를 False로, False를 True로!

\`\`\`python
is_raining = False

if not is_raining:
    print("산책 가자!")  # 출력됨!
\`\`\`

**not 진리표:**
- not True → False
- not False → True`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "로그인 안 했으면 메시지 출력!",
          initialCode: "is_logged_in = False\n\n# 조건을 반대로 뒤집는 연산자를 떠올려봐\nif ___ is_logged_in:\n    print(\"로그인이 필요합니다\")",
          expectedOutput: "로그인이 필요합니다",
          hint: "조건을 반대로 만드는 연산자를 사용하세요!",
          hint2: "not is_logged_in"
        },
        {
          id: "complex-explain",
          type: "explain",
          title: "🧩 복합 조건",
          content: `여러 연산자를 조합할 수 있어요:

\`\`\`python
age = 25
has_license = True

# 성인이고 면허가 있으면 운전 가능
if age >= 18 and has_license:
    print("운전 가능!")

# 미성년자이거나 면허가 없으면
if age < 18 or not has_license:
    print("운전 불가!")
\`\`\`

**우선순위:** not > and > or
괄호로 명확하게 하는 게 좋아요!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "13~19세이거나 학생이면 '할인 적용!' 출력!",
          initialCode: "age = 20\nis_student = True\n\n# 청소년(13~19)이거나 학생이면 할인\nif (age >= 13 ___ age <= 19) ___ is_student:\n    print(\"할인 적용!\")\nelse:\n    print(\"정가\")",
          expectedOutput: "할인 적용!",
          hint: "괄호로 조건을 묶어서 명확하게!",
          hint2: "(age >= 13 and age <= 19) or is_student"
        }
      ]
    },
    {
      id: "ch3",
      title: "중첩 조건문과 in",
      emoji: "📦",
      steps: [
        {
          id: "nested-explain",
          type: "explain",
          title: "📦 if 안에 if",
          content: `if문 안에 또 if문을 넣을 수 있어요:

\`\`\`python
age = 15
has_ticket = True

if has_ticket:
    if age >= 18:
        print("성인 관람가 입장")
    else:
        print("청소년 관람가 입장")
else:
    print("티켓을 구매하세요")
\`\`\`

⚠️ 들여쓰기를 잘 맞춰야 해요!`
        },
        {
          id: "in-explain",
          type: "explain",
          title: "📝 in 연산자",
          content: `**in** = 포함 여부 확인

\`\`\`python
# 문자열에서
if "a" in "apple":
    print("a가 있어요!")  # 출력됨

if "python" in "I love python":
    print("포함!")  # 출력됨
\`\`\`

**not in** = 포함 안 됨
\`\`\`python
if "z" not in "hello":
    print("z가 없어요!")  # 출력됨
\`\`\`

💡 \`in\`은 리스트에서도 쓸 수 있어요! 리스트는 다음 시간에 배울 거예요.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열 안에 어떤 글자가 들어있는지 확인해보세요!",
          initialCode: "word = \"python\"\n\n# 문자가 문자열 안에 있는지 확인하는 연산자!\nif \"y\" ___ word:\n    print(\"y가 포함되어 있어요!\")\nelse:\n    print(\"y가 없어요\")",
          expectedOutput: "y가 포함되어 있어요!",
          hint: "in으로 문자 포함 여부 확인!",
          hint2: "\"y\" in word"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"abc\" in \"abcdef\"의 결과는?",
          options: ["True", "False", "에러", "\"abc\""],
          answer: 0,
          explanation: "\"abcdef\"에 \"abc\"가 포함되어 있으니 True!"
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
          title: "🏆 최종 미션!",
          task: "로그인 시스템을 만들어보세요!",
          initialCode: "username = \"admin\"\npassword = \"1234\"\nis_active = True\n\n# 조건: username이 맞고, password가 맞고, 계정이 활성화\nif username == \"admin\" ___ password == \"1234\" ___ is_active:\n    print(\"로그인 성공!\")\nelse:\n    print(\"로그인 실패\")",
          expectedOutput: "로그인 성공!",
          hint: "세 조건을 모두 만족해야 하니 and로 연결!",
          hint2: "and"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **and** - 둘 다 참이면 참
✅ **or** - 하나라도 참이면 참
✅ **not** - 반대로
✅ **중첩 if문** - if 안에 if
✅ **in** - 포함 여부 확인

다음 시간에는 **반복문(for)**을 배워요! 🚀`
        }
      ]
    }
  ]
}
