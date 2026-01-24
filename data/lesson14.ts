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
          title: "🔁 언제까지 반복할까?",
          content: `**for문**: 정해진 횟수만큼 반복
**while문**: 조건이 참인 동안 반복

\`\`\`python
# 비밀번호가 맞을 때까지 반복
while password != "1234":
    password = input("비밀번호: ")
\`\`\`

**몇 번 반복할지 모를 때** while을 써요!`
        },
        {
          id: "while-explain",
          type: "explain",
          title: "📝 while문 기본",
          content: `\`\`\`python
count = 0
while count < 5:
    print(count)
    count = count + 1
# 0, 1, 2, 3, 4
\`\`\`

1. **조건 확인**: count < 5 가 참인가?
2. **실행**: print와 count 증가
3. **다시 조건 확인** → 반복!
4. count가 5가 되면 조건이 거짓 → 종료`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "1부터 5까지 출력하세요!",
          initialCode: "num = 1\nwhile num <= 5:\n    print(num)\n    num = num + 1",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "num <= 5일 동안 반복!",
          hint2: "num = num + 1로 증가!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "while문이 종료되는 조건은?",
          options: ["무한 반복", "조건이 False가 될 때", "5번 반복 후", "에러 발생 시"],
          answer: 1,
          explanation: "while문은 조건이 False가 되면 멈춰요!"
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
          title: "⚠️ 무한 루프 주의!",
          content: `조건이 계속 True면 **영원히 반복**해요!

\`\`\`python
# ❌ 무한 루프! (num이 안 바뀜)
num = 1
while num <= 5:
    print(num)
    # num = num + 1 빠뜨림!
\`\`\`

**꼭 조건이 언젠가 False가 되게 하세요!**`
        },
        {
          id: "break-explain",
          type: "explain",
          title: "🛑 break - 탈출!",
          content: `**break**로 반복문을 강제 종료!

\`\`\`python
while True:  # 일부러 무한 루프
    answer = input("종료? (y/n): ")
    if answer == "y":
        print("종료합니다!")
        break  # 탈출!
\`\`\`

**while True + break** = 자주 쓰는 패턴!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "5를 찾으면 멈추세요!",
          initialCode: "numbers = [1, 3, 5, 7, 9]\ni = 0\n\nwhile i < len(numbers):\n    if numbers[i] == 5:\n        print(\"5를 찾았다!\")\n        break\n    i = i + 1",
          expectedOutput: "5를 찾았다!",
          hint: "if로 조건 확인 후 break!",
          hint2: "break로 반복문 탈출!"
        },
        {
          id: "continue-explain",
          type: "explain",
          title: "⏭️ continue - 건너뛰기",
          content: `**continue**로 나머지를 건너뛰고 다음 반복!

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue  # 3은 건너뜀
    print(i)
# 1, 2, 4, 5 (3 없음!)
\`\`\`

**break**: 완전히 탈출
**continue**: 이번만 건너뜀`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "break와 continue의 차이는?",
          options: [
            "같은 기능",
            "break는 탈출, continue는 건너뛰기",
            "break는 건너뛰기, continue는 탈출",
            "둘 다 에러"
          ],
          answer: 1,
          explanation: "break는 반복문 완전 탈출, continue는 이번 반복만 건너뛰어요!"
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
          title: "⚖️ 언제 뭘 쓸까?",
          content: `**for문** 사용:
- 반복 횟수가 **정해져** 있을 때
- 리스트/문자열을 **순회**할 때

\`\`\`python
for i in range(10):  # 10번 반복
for name in names:   # 리스트 순회
\`\`\`

**while문** 사용:
- 반복 횟수를 **모를** 때
- **조건**이 중요할 때

\`\`\`python
while not found:     # 찾을 때까지
while money > 0:     # 돈이 있는 동안
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 카운트다운!",
          task: "5부터 1까지 카운트다운 후 '발사!'",
          initialCode: "count = 5\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint(\"발사!\")",
          expectedOutput: "5\n4\n3\n2\n1\n발사!",
          hint: "count > 0일 동안 반복!",
          hint2: "count = count - 1로 감소!"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 합이 100 넘을 때까지!",
          task: "1부터 더해서 합이 100을 넘으면 멈추세요!",
          initialCode: "total = 0\nnum = 1\n\nwhile total <= 100:\n    total = total + num\n    num = num + 1\n\nprint(f\"합계: {total}\")\nprint(f\"마지막 숫자: {num - 1}\")",
          expectedOutput: "합계: 105\n마지막 숫자: 14",
          hint: "total <= 100일 동안 반복!",
          hint2: "1+2+...+14 = 105 (100 초과)"
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
          task: "숫자 맞추기 게임의 핵심 로직!",
          initialCode: "secret = 7\nguess = 0\nattempts = 0\n\nwhile guess != secret:\n    guess = int(input(\"숫자를 맞춰보세요: \"))\n    attempts = attempts + 1\n    \n    if guess < secret:\n        print(\"더 큰 숫자!\")\n    elif guess > secret:\n        print(\"더 작은 숫자!\")\n\nprint(f\"정답! {attempts}번 만에 맞췄어요!\")",
          expectedOutput: "",
          hint: "guess != secret일 동안 반복!",
          hint2: "맞추면 while 조건이 False가 돼서 종료!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **while 조건:** - 조건이 참인 동안 반복
✅ **무한 루프 주의!** - 조건 변화 필요
✅ **break** - 반복문 탈출
✅ **continue** - 이번만 건너뛰기
✅ **for vs while** - 상황에 맞게 선택

🎉 **Part 2 완료!**
다음 Part에서는 **자료구조**를 배워요! 📦`
        }
      ]
    }
  ]
}
