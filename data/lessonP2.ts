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
          title: "🎯 오늘 만들 것: 숫자 맞추기 게임!",
          content: `Part 2에서 배운 if·for·while을 다 써서
**숫자 맞추기 게임**을 만들어요!

> 💡 웹에서는 \`input()\`을 못 써서,
> 미리 정한 **추측 목록**(리스트)으로 게임을 돌려요.
> 리스트는 **Part 3**에서 자세히 배워요!

\`\`\`
=== 🎯 숫자 맞추기 게임 ===

시도 1: 10
→ ⬇️ 더 작은 숫자예요!
시도 2: 4
→ ⬆️ 더 큰 숫자예요!
시도 3: 8
→ ⬇️ 더 작은 숫자예요!
시도 4: 6
→ ⬆️ 더 큰 숫자예요!
시도 5: 7
→ 🎉 정답! 5번 만에 맞췄어요!
게임 종료!
\`\`\`

**사용할 개념:**
- 조건문 (if-elif-else)
- 반복문 (for)
- 비교 연산자
- break (반복 탈출)`
        },
        {
          id: "random",
          type: "explain",
          title: "🎲 컴퓨터가 정답을 골라줄게!",
          content: `숫자 맞추기 게임이니까 **컴퓨터가 정답을 랜덤으로** 골라야 해요!

**import** = 파이썬에 들어있는 기능을 꺼내 쓰는 것!
\`\`\`python
import random  # random 기능을 꺼내!
\`\`\`

이제 \`random.randint()\`로 랜덤 숫자를 만들 수 있어요:
\`\`\`python
# 1~100 사이 랜덤 숫자
secret = random.randint(1, 100)
print(secret)  # 실행할 때마다 달라!
\`\`\`

**randint(a, b)**: a 이상 b 이하의 정수 하나

> 💡 \`import\`와 \`random\` 모듈은 **Part 8**에서 자세히 배워요.
> 지금은 "한 줄 적으면 랜덤 숫자가 나온다" 정도만 알면 OK!
>
> 연습에서는 결과 확인을 위해 \`random.seed(42)\`로 **정답을 고정**해서 써요.`
        },
        {
          id: "try-random",
          type: "tryit",
          title: "🖥️ 랜덤 숫자 뽑아보기!",
          task: "1~10 사이 랜덤 숫자 하나를 뽑아 출력해봐!",
          initialCode: "import random\nrandom.seed(42)\n\n# 1~10 사이 랜덤 숫자를 만드세요\nsecret = random.randint(___, ___)\nprint(f'비밀 숫자: {secret}')",
          expectedOutput: "비밀 숫자: 2",
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
          title: "1️⃣ 한 번 추측해보기 — 작냐 크냐?",
          task: "if-elif-else로 추측이 정답인지 비교해봐!",
          initialCode: "import random\n\nsecret = 7  # 정답을 미리 정해둬요\n\n# input() 대신 직접 값을 넣어요\nguess = 5\n\nif guess == secret:\n    print('🎉 정답!')\n# 정답보다 작으면? 크면?\n___ guess < secret:\n    print('⬆️ 더 큰 숫자예요!')\n___:\n    print('⬇️ 더 작은 숫자예요!')",
          expectedOutput: "⬆️ 더 큰 숫자예요!",
          hint: "if-elif-else로 비교!",
          hint2: "elif guess < secret:"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 정답 맞추면 멈추기!",
          task: "for 안에서 정답 맞추면 break로 탈출!",
          initialCode: "secret = 7\n# input() 대신 추측 목록으로!\nguesses = [3, 5, 9, 7]\n\nfor guess in guesses:\n    if guess == secret:\n        print(f'🎉 정답! {guess}!')\n        ___  # 반복문 탈출!\n    elif guess < secret:\n        print(f'{guess}: ⬆️ 더 큰 숫자예요!')\n    else:\n        print(f'{guess}: ⬇️ 더 작은 숫자예요!')",
          expectedOutput: "3: ⬆️ 더 큰 숫자예요!\n5: ⬆️ 더 큰 숫자예요!\n9: ⬇️ 더 작은 숫자예요!\n🎉 정답! 7!",
          hint: "정답이면 break로 탈출!",
          hint2: "break"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 몇 번 만에 맞췄지?",
          task: "count 변수로 시도 횟수를 세봐!",
          initialCode: "secret = 7\nguesses = [3, 5, 9, 7]\n\ncount = 0\n\nfor guess in guesses:\n    count = ___  # 횟수 증가!\n    \n    if guess == secret:\n        print(f'🎉 정답! {count}번 만에 맞췄어요!')\n        break\n    elif guess < secret:\n        print(f'{guess}: ⬆️ 더 큰 숫자예요!')\n    else:\n        print(f'{guess}: ⬇️ 더 작은 숫자예요!')",
          expectedOutput: "3: ⬆️ 더 큰 숫자예요!\n5: ⬆️ 더 큰 숫자예요!\n9: ⬇️ 더 작은 숫자예요!\n🎉 정답! 4번 만에 맞췄어요!",
          hint: "count를 1씩 증가시키세요!",
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
          title: "🏆 완성된 게임 만들기!",
          task: "break, 비교 조건을 채워 완성된 게임을 만들어봐!",
          initialCode: "print('=== 🎯 숫자 맞추기 게임 ===')\n\nsecret = 7\nguesses = [10, 4, 8, 6, 7]\n\ncount = 0\n\nfor guess in guesses:\n    count += 1\n    print(f'시도 {count}: {guess}')\n    \n    if guess == secret:\n        print(f'→ 🎉 정답! {count}번 만에 맞췄어요!')\n        ___  # 반복문 탈출!\n    elif ___:\n        print('→ ⬆️ 더 큰 숫자예요!')\n    else:\n        print('→ ⬇️ 더 작은 숫자예요!')\n\nprint('게임 종료!')",
          expectedOutput: "=== 🎯 숫자 맞추기 게임 ===\n시도 1: 10\n→ ⬇️ 더 작은 숫자예요!\n시도 2: 4\n→ ⬆️ 더 큰 숫자예요!\n시도 3: 8\n→ ⬇️ 더 작은 숫자예요!\n시도 4: 6\n→ ⬆️ 더 큰 숫자예요!\n시도 5: 7\n→ 🎉 정답! 5번 만에 맞췄어요!\n게임 종료!",
          hint: "break로 탈출, guess < secret로 비교!",
          hint2: "break / guess < secret"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**숫자 맞추기 게임**을 완성했어요!

### 오늘 쓴 개념:
✅ if-elif-else - 조건 비교
✅ for 반복문 - 추측 하나씩 처리
✅ break - 정답 맞추면 탈출
✅ 비교 연산자 (<, >, ==)
✅ 카운터 변수 - 횟수 세기

> 💡 \`guesses = [3, 5, ...]\` 리스트, \`random\` 모듈은
> **Part 3 / Part 8**에서 자세히 배워요. 지금은 도구로 빌려 썼어요!

### 도전 과제 💪
- 정답을 좋아하는 숫자로 바꿔 보기 (\`secret = 42\`)
- 추측 목록을 더 길게 / 짧게 바꿔 보기
- 최대 시도 횟수 제한 (10번)

**Part 3**에서 리스트와 딕셔너리를 배워요! 🚀`
        }
      ]
    }
  ]
}
