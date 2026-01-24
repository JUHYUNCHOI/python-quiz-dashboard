// ============================================
// 프로젝트 3: Hangman 게임
// ============================================
import { LessonData } from './types'

export const lessonP3Data: LessonData = {
  id: "p3",
  title: "Hangman 게임",
  emoji: "🎮",
  description: "Part 3 복습 프로젝트! 단어 맞추기 Hangman 게임을 만들어요.",
  chapters: [
    {
      id: "ch1",
      title: "프로젝트 소개",
      emoji: "🎮",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 오늘 만들 것!",
          content: `Part 3에서 배운 것을 모두 활용해서
**Hangman 게임**을 만들어요!

\`\`\`
=== 🎮 Hangman 게임 ===
단어를 맞춰보세요! (5번 기회)

_ _ _ _ _   (남은 기회: 5)
글자 입력: a
🎉 맞았어요!

a _ _ _ _   (남은 기회: 5)
글자 입력: e
❌ 틀렸어요!

a _ _ _ _   (남은 기회: 4)
...
🎉 정답! 단어는 'apple'이었어요!
\`\`\`

**사용할 개념:**
- 리스트
- 딕셔너리
- 반복문
- 조건문
- 문자열`
        },
        {
          id: "concept",
          type: "explain",
          title: "📚 게임 구조",
          content: `**게임 흐름:**

1. 단어 리스트에서 랜덤 선택
2. 밑줄로 숨긴 단어 표시
3. 글자 입력받기
4. 맞으면 글자 공개, 틀리면 기회 감소
5. 단어 완성 or 기회 소진까지 반복

**필요한 변수:**
- \`words\`: 단어 리스트
- \`secret\`: 맞출 단어
- \`guessed\`: 맞춘 글자 리스트
- \`chances\`: 남은 기회`
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
          title: "1️⃣ 단어 선택하기",
          task: "리스트에서 랜덤 단어를 선택하세요!",
          initialCode: "import random\n\nwords = ['apple', 'banana', 'cherry', 'orange', 'grape']\nsecret = random.choice(words)\n\nprint(f'선택된 단어: {secret}')\nprint(f'글자 수: {len(secret)}')",
          expectedOutput: "",
          hint: "random.choice()로 리스트에서 선택!",
          hint2: "secret = random.choice(words)"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 밑줄로 표시하기",
          task: "단어를 밑줄로 숨겨서 표시하세요!",
          initialCode: "secret = 'apple'\nguessed = []  # 맞춘 글자들\n\n# 표시할 문자열 만들기\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\n\nprint(display)",
          expectedOutput: "_ _ _ _ _ ",
          hint: "for문으로 각 글자를 확인!",
          hint2: "if letter in guessed: display += letter"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 글자 맞추기",
          task: "글자를 입력받아 맞는지 확인하세요!",
          initialCode: "secret = 'apple'\nguessed = ['a']  # 이미 a를 맞춤\n\nguess = input('글자 입력: ')\n\nif guess in secret:\n    print('🎉 맞았어요!')\n    guessed.append(guess)\nelse:\n    print('❌ 틀렸어요!')\n\nprint(f'맞춘 글자: {guessed}')",
          expectedOutput: "",
          hint: "in으로 글자가 있는지 확인!",
          hint2: "if guess in secret:"
        },
        {
          id: "step4",
          type: "tryit",
          title: "4️⃣ 승리 조건 확인",
          task: "모든 글자를 맞췄는지 확인하세요!",
          initialCode: "secret = 'apple'\nguessed = ['a', 'p', 'l', 'e']\n\n# 모든 글자를 맞췄는지 확인\nall_found = True\nfor letter in secret:\n    if letter not in guessed:\n        all_found = False\n        break\n\nif all_found:\n    print('🎉 승리!')\nelse:\n    print('계속 도전!')",
          expectedOutput: "🎉 승리!",
          hint: "모든 글자가 guessed에 있는지 확인!",
          hint2: "if letter not in guessed: all_found = False"
        }
      ]
    },
    {
      id: "ch3",
      title: "게임 완성하기",
      emoji: "🎯",
      steps: [
        {
          id: "step5",
          type: "tryit",
          title: "5️⃣ 게임 루프 만들기",
          task: "승리/패배까지 반복하는 게임을 만드세요!",
          initialCode: "import random\n\nwords = ['apple', 'banana', 'cherry']\nsecret = random.choice(words)\nguessed = []\nchances = 5\n\nprint('=== 🎮 Hangman 게임 ===')\nprint(f'힌트: {len(secret)}글자 단어')\n\nwhile chances > 0:\n    # 현재 상태 표시\n    display = ''\n    for letter in secret:\n        if letter in guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (남은 기회: {chances})')\n    \n    # 승리 확인\n    all_found = True\n    for letter in secret:\n        if letter not in guessed:\n            all_found = False\n            break\n    \n    if all_found:\n        print(f'🎉 정답! 단어는 \\'{secret}\\'이었어요!')\n        break\n    \n    # 글자 입력\n    guess = input('글자 입력: ').lower()\n    \n    if guess in guessed:\n        print('이미 입력한 글자예요!')\n        continue\n    \n    if guess in secret:\n        print('🎉 맞았어요!')\n        guessed.append(guess)\n    else:\n        print('❌ 틀렸어요!')\n        chances -= 1\n\nif chances == 0:\n    print(f'\\n😢 게임 오버! 정답은 \\'{secret}\\'이었어요.')",
          expectedOutput: "",
          hint: "while + break 조합!",
          hint2: "while chances > 0:"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 프로젝트",
      emoji: "🏆",
      steps: [
        {
          id: "mission",
          type: "mission",
          title: "🏆 업그레이드된 Hangman!",
          task: "딕셔너리로 카테고리별 단어를 관리하세요!",
          initialCode: "import random\n\n# 카테고리별 단어 딕셔너리\nword_categories = {\n    '과일': ['apple', 'banana', 'cherry', 'orange', 'grape'],\n    '동물': ['tiger', 'elephant', 'rabbit', 'dolphin', 'penguin'],\n    '나라': ['korea', 'japan', 'france', 'brazil', 'canada']\n}\n\nprint('=== 🎮 Hangman 게임 ===')\nprint('카테고리:', list(word_categories.keys()))\n\ncategory = input('카테고리 선택: ')\n\nif category in word_categories:\n    words = word_categories[category]\n    secret = random.choice(words)\n    guessed = []\n    chances = 6\n    \n    print(f'\\n{category}에서 {len(secret)}글자 단어!')\n    \n    while chances > 0:\n        display = ' '.join([c if c in guessed else '_' for c in secret])\n        print(f'\\n{display}  (기회: {chances})')\n        \n        if '_' not in display.replace(' ', '_'):\n            print(f'🎉 정답! \\'{secret}\\'!')\n            break\n        \n        guess = input('글자: ').lower()\n        \n        if guess in guessed:\n            print('이미 입력!')\n        elif guess in secret:\n            print('🎉 정답!')\n            guessed.append(guess)\n        else:\n            print('❌ 오답!')\n            guessed.append(guess)\n            chances -= 1\n    \n    if chances == 0:\n        print(f'😢 게임오버! 정답: {secret}')\nelse:\n    print('잘못된 카테고리!')",
          expectedOutput: "",
          hint: "딕셔너리의 키로 카테고리 선택!",
          hint2: "words = word_categories[category]"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**Hangman 게임**을 완성했어요!

### 사용한 개념:
✅ 리스트 - 단어 저장, 맞춘 글자 저장
✅ 딕셔너리 - 카테고리별 단어 관리
✅ for문 - 글자 순회
✅ while문 - 게임 루프
✅ if-elif-else - 조건 처리
✅ in 연산자 - 포함 여부 확인
✅ 문자열 메서드 - lower()

### 도전 과제 💪
- Hangman 그림 추가 (ASCII Art)
- 점수 시스템 추가
- 난이도별 기회 조절
- 최고 기록 저장

🎉 **파이썬 기초 마스터 완료!**
이제 더 복잡한 프로젝트에 도전해보세요! 🚀`
        }
      ]
    }
  ]
}
