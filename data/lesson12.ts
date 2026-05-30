// ============================================
// 레슨 12: 조건문 심화
// ============================================
import { LessonData } from './types'

export const lesson12Data: LessonData = {
  id: "12",
  title: "조건문 심화",
  emoji: "🔀",
  description: "and / or / not 으로 조건 여러 개를 묶어요!",
  chapters: [
    {
      id: "ch1",
      title: "논리 연산자",
      emoji: "🔗",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 조건 하나로는 부족할 때",
          content: `놀이공원에서 "키 140cm **이상** 이고 나이 8살 **이상**" 이어야 탈 수 있는 놀이기구 있죠? 조건이 두 개!

이렇게 조건을 묶어 주는 친구 셋:
- **and** (그리고) — 둘 다 참이어야 OK
- **or** (또는) — 하나만 참이어도 OK
- **not** (아닌) — 참/거짓을 뒤집어요

오늘 셋이서 친구되기!`
        },
        {
          id: "and-explain",
          type: "explain",
          title: "🔗 and = 그리고",
          content: `두 조건이 **둘 다** True 여야 전체가 True.

\`\`\`python
age = 15
# 청소년: 13살 이상 그리고 19살 미만
if age >= 13 and age < 19:
    print("청소년이에요")
\`\`\`

| 왼쪽 | and | 오른쪽 | 결과 |
|---|---|---|---|
| True | and | True | **True** ✅ |
| True | and | False | False ❌ |
| False | and | True | False ❌ |
| False | and | False | False ❌ |

➡️ **하나라도 False 면 전체 False.**`
        },
        {
          id: "or-explain",
          type: "explain",
          title: "🔗 or = 또는",
          content: `**하나만** True 여도 전체가 True.

\`\`\`python
day = "토요일"
# 주말: 토요일 또는 일요일
if day == "토요일" or day == "일요일":
    print("주말!")
\`\`\`

| 왼쪽 | or | 오른쪽 | 결과 |
|---|---|---|---|
| True | or | True | True ✅ |
| True | or | False | True ✅ |
| False | or | True | True ✅ |
| False | or | False | **False** ❌ |

➡️ **하나라도 True 면 전체 True.**`
        },
        {
          id: "circuit-andor",
          type: "interactive",
          title: "🎬 스위치로 느껴보기 — and / or",
          description: "스위치 A, B 를 켜고 꺼봐요. and 는 둘 다 켜져야, or 는 하나만 켜져도 전구가 켜져요!",
          component: "pyAndOrCircuit",
          componentProps: { initialMode: "and" }
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기 — and",
          task: "점수가 80 이상 그리고 100 이하면 합격!",
          initialCode: "score = 85\n\n# 두 조건이 모두 참일 때만 합격\nif score >= 80 ___ score <= 100:\n    print(\"합격!\")\nelse:\n    print(\"불합격\")",
          expectedOutput: "합격!",
          hint: "둘 다 만족? → and!",
          hint2: "and"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기 — or",
          task: "VIP 이거나 쿠폰이 있으면 할인!",
          initialCode: "is_vip = False\nhas_coupon = True\n\n# 하나만 참이어도 할인\nif is_vip ___ has_coupon:\n    print(\"10% 할인!\")\nelse:\n    print(\"정가\")",
          expectedOutput: "10% 할인!",
          hint: "둘 중 하나만? → or!",
          hint2: "or"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`True and False` 의 결과는?",
          options: ["True", "False", "에러", "None"],
          answer: 1,
          explanation: "and 는 **둘 다** True 여야 True. 하나라도 False 면 False!"
        }
      ]
    },
    {
      id: "ch2",
      title: "not 과 우선순위",
      emoji: "🔄",
      steps: [
        {
          id: "not-explain",
          type: "explain",
          title: "🔄 not = 아닌 (뒤집기)",
          content: `**not** 은 True ↔ False 를 뒤집어요.

\`\`\`python
is_raining = False

if not is_raining:
    print("산책 가자!")  # 비 안 오니까 출력 ✅
\`\`\`

| 원래 | → | not |
|---|---|---|
| True | → | False |
| False | → | True |

💡 "**~ 가 아니라면**" 을 코드로 쓸 때 not.`
        },
        {
          id: "circuit-not",
          type: "interactive",
          title: "🎬 스위치로 느껴보기 — not",
          description: "위 모드 버튼에서 NOT 을 눌러봐요. 스위치를 ON 하면 전구가 OFF — 뒤집기!",
          component: "pyAndOrCircuit",
          componentProps: { initialMode: "not" }
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기 — not",
          task: "로그인 안 했으면 메시지 출력!",
          initialCode: "is_logged_in = False\n\n# 조건을 뒤집는 연산자를 떠올려봐\nif ___ is_logged_in:\n    print(\"로그인이 필요합니다\")",
          expectedOutput: "로그인이 필요합니다",
          hint: "참/거짓을 뒤집는 친구!",
          hint2: "not is_logged_in"
        },
        {
          id: "complex-explain",
          type: "explain",
          title: "🧩 셋이 같이 — 괄호가 안전",
          content: `세 친구를 섞어 쓸 수 있어요:

\`\`\`python
age = 25
has_license = True

# 18살 이상 그리고 면허 있음
if age >= 18 and has_license:
    print("운전 가능!")
\`\`\`

**순서 (우선순위):** \`not\` → \`and\` → \`or\`

수학에서 × 가 + 보다 먼저인 것처럼, **and 가 or 보다 먼저** 계산돼요.
헷갈리면 **괄호 \`( )\` 로 묶기** — 그게 제일 안전!

\`\`\`python
# 청소년(13~19) 또는 학생이면 할인
if (age >= 13 and age <= 19) or is_student:
    print("할인!")
\`\`\``
        },
        {
          id: "predict-precedence",
          type: "predict",
          title: "💭 우선순위 — 어떤 게 먼저?",
          content: "이 코드의 결과는?\n\n```python\na = True\nb = False\nc = True\n\nif a or b and c:\n    print(\"yes\")\nelse:\n    print(\"no\")\n```",
          options: ["yes", "no", "에러", "None"],
          answer: 0,
          explanation: "**and 가 or 보다 먼저!** 그래서 `b and c` 부터 계산 → `False and True` → `False`. 그다음 `a or False` → `True or False` → **True** → 'yes' 출력. 헷갈리면 괄호로 `a or (b and c)` 처럼 묶어 표시해요."
        },
        {
          id: "predict-short-circuit",
          type: "predict",
          title: "💭 or 는 어디까지 볼까?",
          content: "이 코드의 결과는?\n\n```python\nis_vip = True\nhas_coupon = False\n\nif is_vip or has_coupon:\n    print(\"할인!\")\n```",
          options: ["할인!", "아무것도 출력 안 됨", "에러", "True"],
          answer: 0,
          explanation: "or 는 **왼쪽이 이미 True 면 오른쪽은 안 봐도 답이 정해져요** (어차피 True). 이걸 **단락 평가 (short-circuit)** 라고 해요. and 도 마찬가지 — 왼쪽이 False 면 오른쪽 안 봐요. 똑똑하게 일찍 멈추는 거예요!"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 괄호로 묶기",
          task: "13~19살 이거나 학생이면 '할인 적용!' 출력!",
          initialCode: "age = 20\nis_student = True\n\n# (청소년) 또는 (학생)\nif (age >= 13 ___ age <= 19) ___ is_student:\n    print(\"할인 적용!\")\nelse:\n    print(\"정가\")",
          expectedOutput: "할인 적용!",
          hint: "괄호 안은 둘 다 만족? / 괄호 바깥은 둘 중 하나?",
          hint2: "and / or"
        }
      ]
    },
    {
      id: "ch3",
      title: "중첩 if 와 in",
      emoji: "📦",
      steps: [
        {
          id: "nested-explain",
          type: "explain",
          title: "📦 if 안에 if",
          content: `if 안에 또 if 를 넣을 수 있어요. **계단처럼 들여쓰기** 잘 맞춰요!

\`\`\`python
has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("성인관 입장")
    else:
        print("청소년관 입장")
else:
    print("티켓을 사주세요")
\`\`\`

💡 너무 깊게 (3단, 4단) 들어가면 읽기 어려워요. **2단까지가 편해요.**`
        },
        {
          id: "in-explain",
          type: "explain",
          title: "📝 in = ~ 안에 있나요?",
          content: `**in** 은 "안에 들어 있나" 를 확인해요.

\`\`\`python
if "a" in "apple":
    print("a 있음!")  # ✅
\`\`\`

**not in** 은 반대 — "안에 없나":

\`\`\`python
if "z" not in "hello":
    print("z 없음!")  # ✅
\`\`\`

💡 \`in\` 은 리스트에서도 쓸 수 있어요 — **리스트는 다음에 배워요!**`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기 — in",
          task: "단어 안에 \"y\" 가 있는지 확인!",
          initialCode: "word = \"python\"\n\n# 안에 있는지 확인하는 연산자!\nif \"y\" ___ word:\n    print(\"y 있음!\")\nelse:\n    print(\"y 없음\")",
          expectedOutput: "y 있음!",
          hint: "포함 여부 확인하는 친구!",
          hint2: "in"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`\"abc\" in \"abcdef\"` 의 결과는?",
          options: ["True", "False", "에러", "\"abc\""],
          answer: 0,
          explanation: "\"abcdef\" 안에 \"abc\" 가 들어 있으니까 True!"
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
          title: "🏆 최종 미션 — 로그인 시스템",
          task: "아이디 맞고, 비밀번호 맞고, 계정 활성화 — 셋 다 만족해야 로그인!",
          initialCode: "username = \"admin\"\npassword = \"1234\"\nis_active = True\n\n# 세 조건 모두 참이어야 성공!\nif username == \"admin\" ___ password == \"1234\" ___ is_active:\n    print(\"로그인 성공!\")\nelse:\n    print(\"로그인 실패\")",
          expectedOutput: "로그인 성공!",
          hint: "세 조건 모두? → 같은 연산자 두 번!",
          hint2: "and / and"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 오늘 배운 것",
          content: `✅ **and** (그리고) — 둘 다 참이어야 참
✅ **or** (또는) — 하나만 참이어도 참
✅ **not** (아닌) — 뒤집기
✅ **우선순위:** not → and → or. 헷갈리면 **괄호** 로!
✅ **단락 평가** — and / or 는 답이 정해지면 일찍 멈춰요
✅ **중첩 if** — if 안의 if (2단까지 편하게)
✅ **in** — ~ 안에 들어 있나?

다음 시간: **반복문 (for)** — 같은 일을 여러 번! 🚀`
        }
      ]
    }
  ]
}
