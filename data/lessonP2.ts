// ============================================
// 프로젝트 2: 숫자 맞추기 게임
// ============================================
import { LessonData } from './types'

export const lessonP2Data: LessonData = {
  id: "p2",
  title: "숫자 맞추기 게임",
  emoji: "🎯",
  description: "Part 2 복습 프로젝트! 숫자 맞추기 게임을 만들어요.",
  chapters: [
    {
      id: "ch1",
      title: "프로젝트 소개",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 오늘 만들 것!",
          content: `Part 2에서 배운 것을 모두 활용해서
**숫자 맞추기 게임**을 만들어요!

\`\`\`
=== 🎯 숫자 맞추기 게임 ===
1~100 사이의 숫자를 맞춰보세요!

추측: 50
⬆️ 더 큰 숫자예요!
추측: 75
⬇️ 더 작은 숫자예요!
추측: 62
🎉 정답! 3번 만에 맞췄어요!
\`\`\`

**사용할 개념:**
- 조건문 (if-elif-else)
- 반복문 (while)
- 비교 연산자
- random 모듈`
        },
        {
          id: "random",
          type: "explain",
          title: "🎲 random 모듈",
          content: `컴퓨터가 랜덤 숫자를 만들게 해요!

\`\`\`python
import random

# 1~100 사이 랜덤 숫자
secret = random.randint(1, 100)
print(secret)  # 매번 다른 숫자!
\`\`\`

**randint(a, b)**: a 이상 b 이하의 정수`
        },
        {
          id: "try-random",
          type: "tryit",
          title: "🖥️ 랜덤 숫자 만들기",
          task: "1~10 사이의 랜덤 숫자를 출력하세요!",
          initialCode: "import random\n\nsecret = random.randint(1, 10)\nprint(f'비밀 숫자: {secret}')",
          expectedOutput: "",
          hint: "randint(1, 10)은 1~10 사이!",
          hint2: "random.randint(1, 10)"
        }
      ]
    },
    {
      id: "ch2",
      title: "단계별 만들기",
      emoji: "🔧",
      steps: [
        {
          id: "step1",
          type: "tryit",
          title: "1️⃣ 한 번 추측하기",
          task: "추측이 정답인지 확인하세요!",
          initialCode: "import random\n\nsecret = random.randint(1, 10)\nprint(f'(정답: {secret})')\n\nguess = int(input('추측: '))\n\nif guess == secret:\n    print('🎉 정답!')\nelif guess < secret:\n    print('⬆️ 더 큰 숫자예요!')\nelse:\n    print('⬇️ 더 작은 숫자예요!')",
          expectedOutput: "",
          hint: "if-elif-else로 비교!",
          hint2: "if guess == secret:"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 반복해서 추측하기",
          task: "정답을 맞출 때까지 반복하세요!",
          initialCode: "import random\n\nsecret = random.randint(1, 10)\nprint('1~10 사이의 숫자를 맞춰보세요!')\n\nwhile True:\n    guess = int(input('추측: '))\n    \n    if guess == secret:\n        print('🎉 정답!')\n        break\n    elif guess < secret:\n        print('⬆️ 더 큰 숫자예요!')\n    else:\n        print('⬇️ 더 작은 숫자예요!')",
          expectedOutput: "",
          hint: "while True + break 조합!",
          hint2: "if guess == secret: break"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 시도 횟수 세기",
          task: "몇 번 만에 맞췄는지 세세요!",
          initialCode: "import random\n\nsecret = random.randint(1, 10)\nprint('1~10 사이의 숫자를 맞춰보세요!')\n\ncount = 0\n\nwhile True:\n    guess = int(input('추측: '))\n    count = count + 1\n    \n    if guess == secret:\n        print(f'🎉 정답! {count}번 만에 맞췄어요!')\n        break\n    elif guess < secret:\n        print('⬆️ 더 큰 숫자예요!')\n    else:\n        print('⬇️ 더 작은 숫자예요!')",
          expectedOutput: "",
          hint: "count 변수로 횟수 세기!",
          hint2: "count = count + 1"
        }
      ]
    },
    {
      id: "ch3",
      title: "최종 프로젝트",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 완성된 게임!",
          task: "제목, 범위 안내, 시도 횟수가 있는 완성된 게임을 만드세요!",
          initialCode: "import random\n\nprint('=== 🎯 숫자 맞추기 게임 ===')\nprint('1~100 사이의 숫자를 맞춰보세요!')\nprint()\n\nsecret = random.randint(1, 100)\ncount = 0\n\nwhile True:\n    guess = int(input('추측: '))\n    count += 1\n    \n    if guess == secret:\n        print(f'🎉 정답! {count}번 만에 맞췄어요!')\n        break\n    elif guess < secret:\n        print('⬆️ 더 큰 숫자예요!')\n    else:\n        print('⬇️ 더 작은 숫자예요!')\n\nprint('게임 종료!')",
          expectedOutput: "",
          hint: "count += 1은 count = count + 1과 같아요!",
          hint2: "if guess == secret: print(...); break"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**숫자 맞추기 게임**을 완성했어요!

### 사용한 개념:
✅ import random - 랜덤 숫자
✅ if-elif-else - 조건 비교
✅ while True - 무한 반복
✅ break - 반복 탈출
✅ 비교 연산자 (<, >, ==)
✅ 카운터 변수 - 횟수 세기

### 도전 과제 💪
- 최대 시도 횟수 제한 (10번)
- 힌트 기능 추가
- 난이도 선택 (쉬움/보통/어려움)
- 다시 플레이 기능

**Part 3**에서 리스트와 딕셔너리를 배워요! 🚀`
        }
      ]
    }
  ]
}
