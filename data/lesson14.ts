// ============================================
// 레슨 14: 반복문 (while)
// ============================================
import { LessonData } from './types'

export const lesson14Data: LessonData = {
  id: "14",
  title: "반복문 (while)",
  emoji: "🔁",
  description: "조건이 참인 동안 반복하는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "while문 기초",
      emoji: "🔄",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔁 \"몇 번\" 말고 \"~ 인 동안\" 반복하고 싶을 때",
          content: `**for 문**: \"5 번 반복\" 처럼 **횟수가 정해져** 있을 때
**while 문**: \"비번 맞을 때까지\" 처럼 **언제 끝날지 모를** 때

\`\`\`python
# 비밀번호가 맞을 때까지 계속 물어봐!
while password != "1234":
    password = input("비밀번호: ")
\`\`\`

**while = ~ 인 동안.** 조건이 참인 동안 계속 반복해요.

💡 **언제 for, 언제 while?**
- 횟수가 분명 → for
- 끝날 때 정해진 횟수가 아니라 \"조건\" → while`
        },
        {
          id: "while-explain",
          type: "explain",
          title: "📝 while 문 = \"조건이 참이면 한 번 더!\"",
          content: `\`\`\`python
count = 0
while count < 5:
    print(count)
    count = count + 1
# 0, 1, 2, 3, 4
\`\`\`

while 문이 하는 일 (계속 반복):
1. **조건 확인**: \`count < 5\` 가 참?
2. 참이면 → 들여쓰기 블록 실행 (print, count 증가)
3. **다시 조건으로 돌아가서** 또 확인
4. \`count\` 가 5 가 되는 순간 → 조건 거짓 → 빠져나옴

> 💡 \`count = count + 1\` 안 적으면 count 가 안 바뀌고 영원히 반복 (= 무한 루프). 다음 챕터에서 자세히!`
        },
        {
          id: "syntax-builder",
          type: "interactive",
          title: "🧱 while 문 조립해보기",
          content: `while 문이 어떤 부품들로 만들어지는지 봐요. **▶ 재생** 누르고 따라가요!`,
          component: "pyWhileBuilder",
        },
        {
          id: "while-sim",
          type: "explain",
          title: "🔍 실행 추적 — while 카운트다운 (3 → 0)",
          content: `while 이 \"조건 확인 → 실행 → 변수 바뀜 → 또 확인\" 을 어떻게 도는지 한 단계씩 봐요!

\`count\` 가 3 에서 0 까지 줄어드는 과정.

**▶ 실행하기** 또는 **▷ 한 단계** 눌러보세요.`,
          component: "codeTracePyWhile",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 1 부터 5 까지",
          task: "num 이 5 가 될 때까지 한 줄씩 출력하세요!",
          initialCode: "num = 1\n# 언제까지 반복할지 조건을 적어보세요\nwhile ___:\n    print(num)\n    num = num + 1",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "5 도 포함하고 싶어요. num 이 5 보다 \"작거나 같으면\" 계속!",
          hint2: "num <= 5"
        },
        {
          id: "predict1",
          type: "predict",
          title: "💭 while 안 멈추면 어떻게 될까?",
          content: "이 코드를 돌리면?\n\n```python\nnum = 1\nwhile num <= 5:\n    print(num)\n    # num = num + 1  ← 깜빡 잊음!\n```",
          options: ["1 한 번만", "1 부터 5 까지", "에러", "1 만 계속 (무한 반복)"],
          answer: 3,
          explanation: "num 이 안 바뀌면 \`num <= 5\` 가 영원히 참 → 1 만 끝없이 찍혀요! 이걸 **무한 루프 (infinite loop)** 라고 해요.\n\n다음 챕터에서 자세히 다뤄요!"
        },
        {
          id: "try1-scratch",
          type: "tryit",
          title: "✋ 손으로 처음부터 — 10 부터 1 까지 거꾸로",
          task: "10, 9, 8, ... 2, 1 을 한 줄씩 출력! 빈 곳에 직접 코드 적어봐 ✍️",
          initialCode: "# 1) 변수 num 을 10 으로 만들기\n# 2) num 이 1 이상이면 계속 반복 (while num >= 1:)\n# 3) 반복 안에서 num 출력 + num 을 1 줄이기\n# 막히면 아래 '힌트' 눌러봐!\n\n",
          expectedOutput: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
          hint: "num = 10 으로 시작. \`while num >= 1:\` 안에서 print 후 \`num = num - 1\`.",
          hint2: "num = 10\nwhile num >= 1:\n    print(num)\n    num = num - 1"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈 — while 은 언제 멈출까?",
          content: "while 문이 멈추는 순간은?",
          options: ["5 번 반복하면 자동으로", "조건이 False (거짓) 가 되면", "Enter 키 누르면", "에러 나면"],
          answer: 1,
          explanation: "while 은 조건이 **False** 가 되는 그 순간 멈춰요!\n그래서 조건을 언젠가 거짓으로 만들 변수 변경이 꼭 필요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "무한 루프와 break",
      emoji: "🛑",
      steps: [
        {
          id: "infinite-explain",
          type: "explain",
          title: "⚠️ 무한 루프 (infinite loop) — 컴퓨터를 멈출 수 없는 함정",
          content: `조건이 영원히 참이면 → **영원히 반복**해요. 컴퓨터가 멈추거나 강제 종료해야 빠져나옴 😱

\`\`\`python
# ❌ 무한 루프! num 이 안 바뀌어요
num = 1
while num <= 5:
    print(num)
    # num = num + 1 ← 깜빡 잊음!
\`\`\`

while 쓸 때 **체크 리스트**:
- [ ] 조건이 언젠가 거짓이 되나?
- [ ] 조건을 거짓으로 만들 변수 변경 (num = num + 1 같은) 있나?

**일부러** 무한 루프가 필요할 때도 있어요 → 다음 페이지 \`break\` 로 빠져나가는 법!`
        },
        {
          id: "break-explain",
          type: "explain",
          title: "🛑 break = \"여기서 그만!\" — 반복문 탈출",
          content: `**break** 를 만나면 while 이든 for 든 **즉시** 멈춰요!

\`\`\`python
while True:  # 일부러 무한 루프 (계속 반복)
    answer = input("종료할까? (y/n): ")
    if answer == "y":
        print("안녕!")
        break  # ← 여기서 while 을 빠져나옴
\`\`\`

**\`while True\` + \`break\`** 패턴 = 자주 써요!
- 무한히 돌리면서
- 특정 조건이 되면 break 로 빠져나옴`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 3 의 배수 첫 발견 즉시 멈춰!",
          task: "1 부터 20 까지 검사하다 **첫 3 의 배수** 를 찾으면 반복문 종료!",
          initialCode: "num = 1\n\nwhile num <= 20:\n    if num % 3 == 0:\n        print(f\"{num} 은 3 의 배수! 멈춤!\")\n        ___  # 반복문 탈출!\n    num = num + 1",
          expectedOutput: "3 은 3 의 배수! 멈춤!",
          hint: "if 안에서 반복문을 즉시 종료하는 키워드는?",
          hint2: "break"
        },
        {
          id: "continue-explain",
          type: "explain",
          title: "⏭️ continue = \"이번만 건너뛰고 다음으로\"",
          content: `**continue** 를 만나면 → 아래 코드 건너뛰고 **바로 다음 반복**으로!

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue  # i 가 3 일 때만 print 건너뜀
    print(i)
# 출력: 1, 2, 4, 5 (3 빠짐!)
\`\`\`

**break vs continue** 차이:
- **break**: 반복문 자체를 끝냄 (나옴)
- **continue**: 이번 회차만 스킵, 반복은 계속

> 💡 비유: break = 영화관 나가기 / continue = 이 장면만 스킵`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 3 만 건너뛰고 1~5 출력",
          task: "1, 2, 4, 5 만 출력하세요 (3 은 빠뜨려야 함)!",
          initialCode: "num = 0\nwhile num < 5:\n    num = num + 1\n    if num == 3:\n        ___  # 3 은 건너뜀\n    print(num)",
          expectedOutput: "1\n2\n4\n5",
          hint: "이번 회차만 print 를 건너뛰고 싶을 때 쓰는 키워드는?",
          hint2: "continue"
        },
        {
          id: "try-break-continue",
          type: "tryit",
          title: "✋ 손으로 처음부터 — break + continue 합치기",
          task: "1~10 까지 돌면서:\n- 8 을 만나면 → break (멈춤)\n- 홀수면 → continue (건너뛰기)\n- 짝수면 → print\n\n결과는 2, 4, 6 (8 만나기 전까지의 짝수)!",
          initialCode: "num = 0\nwhile num < 10:\n    num = num + 1\n    # 8 이면 break\n    # 홀수면 continue\n    # 짝수면 print\n",
          expectedOutput: "2\n4\n6",
          hint: "if num == 8: break / if num % 2 == 1: continue / print(num) 순서로!",
          hint2: "num = 0\nwhile num < 10:\n    num = num + 1\n    if num == 8:\n        break\n    if num % 2 == 1:\n        continue\n    print(num)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈 — break 와 continue 의 차이",
          content: "다음 중 맞는 설명은?",
          options: [
            "둘 다 같은 기능이에요",
            "break = 반복문 탈출, continue = 이번 회차만 건너뜀",
            "break = 이번만 건너뜀, continue = 탈출",
            "둘 다 에러를 발생시켜요"
          ],
          answer: 1,
          explanation: "**break** = 반복문 완전히 빠져나옴.\n**continue** = 이번 회차 나머지 코드만 건너뛰고 다음 반복으로!"
        }
      ]
    },
    {
      id: "ch3",
      title: "for vs while",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ for 와 while — 언제 뭘 골라야 할까?",
          content: `**for 문 — 횟수가 분명할 때**
- N 번 반복하기
- 리스트 / 문자열 순회

\`\`\`python
for i in range(10):  # 정확히 10 번
for name in names:   # 리스트 끝까지
\`\`\`

**while 문 — 조건이 중요할 때**
- 몇 번 돌지 모름
- "~ 일 때까지" / "~ 인 동안"

\`\`\`python
while not found:     # 찾을 때까지
while money > 0:     # 돈 떨어질 때까지
\`\`\`

> 💡 헷갈리면 \"몇 번?\" 이라고 자신에게 물어봐요. 답하면 → for, 모르면 → while.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 로켓 카운트다운 (5 → 1 → 발사!)",
          task: "5 부터 1 까지 한 줄씩 출력 후 \"발사!\"!",
          initialCode: "count = 5\nwhile count > 0:\n    print(count)\n    count = ___\nprint(\"발사!\")",
          expectedOutput: "5\n4\n3\n2\n1\n발사!",
          hint: "count 를 1 씩 줄여야 0 에 도달해요. 어떻게 줄일까?",
          hint2: "count - 1"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 합이 100 넘을 때까지 1, 2, 3, ... 더하기",
          task: "1, 2, 3, ... 차례로 더해 가다가 **total 이 100 을 넘는 순간** 멈추세요!",
          initialCode: "total = 0\nnum = 1\n\n# total 이 100 을 넘기 전까지만 반복\nwhile ___:\n    total = total + num\n    num = num + 1\n\nprint(f\"합계: {total}\")\nprint(f\"마지막 숫자: {num - 1}\")",
          expectedOutput: "합계: 105\n마지막 숫자: 14",
          hint: "total 이 100 \"이하\" 인 동안 계속 → 조건은?",
          hint2: "total <= 100"
        },
        {
          id: "try-while-scratch",
          type: "tryit",
          title: "✋ 손으로 처음부터 — 2 배씩 키워서 1000 처음 넘는 값 찾기",
          task: "1 부터 2 배씩 키워서 1000 넘는 순간 멈추고 출력! 빈 곳에 직접 ✍️",
          initialCode: "# 1) 변수 num 을 1 로 만들기\n# 2) num 이 1000 보다 작은 동안 (while num < 1000:)\n# 3) 반복 안에서 num 을 2 배로 (num = num * 2)\n# 4) 반복 끝난 후 num 출력\n\n",
          expectedOutput: "1024",
          hint: "while num < 1000: 안에서 num = num * 2. 루프 끝난 후 print(num).",
          hint2: "num = 1\nwhile num < 1000:\n    num = num * 2\nprint(num)"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission-explain",
          type: "explain",
          title: "🎮 미션 미리보기 — 숫자 맞추기 게임 원리",
          content: `숫자 맞추기 게임 (Up & Down) 은 이렇게 동작해요:

\`\`\`python
secret = 7  # 컴퓨터가 정한 정답

while guess != secret:
    guess = 입력받기
    if guess < secret:
        print("더 크게!")
    elif guess > secret:
        print("더 작게!")

print("정답!")
\`\`\`

실습에선 \`input()\` 대신 **미리 정한 시도 목록** 으로 연습 (코드린 환경에서 입력 받기 어려우니까)!`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — Up & Down 숫자 맞추기 게임",
          task: "정답은 **7**. 친구가 3 → 5 → 9 → 7 순서로 추측해요.\n\n각 추측에 대해:\n- 추측 < 정답 → \"→ 더 큰 숫자!\"\n- 추측 > 정답 → \"→ 더 작은 숫자!\"\n- 정답 일치 → \"→ 정답! N 번 만에 맞췄어요!\" 출력 후 **break**!\n\n빈칸 3 개를 채우세요:",
          initialCode: "secret = 7\nguesses = [3, 5, 9, 7]\n\nattempts = 0\n\nfor guess in guesses:\n    attempts = attempts + 1\n    print(f\"시도 {attempts}: {guess}\")\n    \n    if ___:\n        print(\"→ 더 큰 숫자!\")\n    elif ___:\n        print(\"→ 더 작은 숫자!\")\n    else:\n        print(f\"→ 정답! {attempts}번 만에 맞췄어요!\")\n        ___",
          expectedOutput: "시도 1: 3\n→ 더 큰 숫자!\n시도 2: 5\n→ 더 큰 숫자!\n시도 3: 9\n→ 더 작은 숫자!\n시도 4: 7\n→ 정답! 4번 만에 맞췄어요!",
          hint: "추측 (guess) 와 정답 (secret) 을 비교! 정답 맞추면 반복 끝내기!",
          hint2: "guess < secret / guess > secret / break"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 오늘 배운 것",
          content: `## 오늘 배운 것

✅ \`while 조건:\` — 조건이 참인 동안 반복
✅ ⚠️ **무한 루프 조심** — 조건이 언젠가 거짓이 되게!
✅ \`break\` — 반복문 즉시 탈출
✅ \`continue\` — 이번 회차만 건너뛰기
✅ **for vs while** — 횟수 분명 → for, 조건 → while

🎉 **Part 2 (조건문 + 반복문) 완료!**
다음 Part 부터는 **자료구조** — 리스트, 딕셔너리 같은 데이터 담는 상자를 배워요! 📦`
        }
      ]
    }
  ]
}
