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
힌트: 5글자 단어

_ _ _ _ _   (남은 기회: 5)
글자: a
🎉 맞았어요!

a _ _ _ _   (남은 기회: 5)
글자: e
🎉 맞았어요!
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

1. 단어 리스트에서 단어 선택
2. 밑줄로 숨긴 단어 표시
3. 미리 정한 글자 리스트로 추측
4. 맞으면 글자 공개, 틀리면 기회 감소
5. 단어 완성 or 기회 소진까지 반복

**필요한 변수:**
- \`words\`: 단어 리스트
- \`secret\`: 맞출 단어
- \`guesses\`: 추측할 글자 리스트
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
          task: "리스트에서 단어를 선택하세요!",
          initialCode: "words = ['apple', 'banana', 'cherry', 'orange', 'grape']\nsecret = words[0]  # 'apple' 고정\n\nprint(f'선택된 단어: {secret}')\nprint(f'글자 수: {len(secret)}')",
          expectedOutput: "선택된 단어: apple\n글자 수: 5",
          hint: "리스트의 인덱스로 단어 선택!",
          hint2: "secret = words[0]"
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
          initialCode: "secret = 'apple'\nguessed = ['a']  # 이미 a를 맞춤\n\n# input() 대신 직접 글자를 넣어요\nguess = 'p'\n\nif guess in secret:\n    print('🎉 맞았어요!')\n    guessed.append(guess)\nelse:\n    print('❌ 틀렸어요!')\n\nprint(f'맞춘 글자: {guessed}')",
          expectedOutput: "🎉 맞았어요!\n맞춘 글자: ['a', 'p']",
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
          initialCode: "secret = 'apple'\nguesses = ['a', 'e', 'x', 'p', 'l']  # 미리 정한 추측\nguessed = []\nchances = 5\n\nprint('=== 🎮 Hangman 게임 ===')\nprint(f'힌트: {len(secret)}글자 단어')\n\nfor guess in guesses:\n    # 현재 상태 표시\n    display = ''\n    for letter in secret:\n        if letter in guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (남은 기회: {chances})')\n    \n    # 승리 확인\n    all_found = True\n    for letter in secret:\n        if letter not in guessed:\n            all_found = False\n            break\n    \n    if all_found:\n        print(f'🎉 정답! 단어는 \\'{secret}\\'이었어요!')\n        break\n    \n    print(f'글자: {guess}')\n    \n    if guess in guessed:\n        print('이미 입력한 글자예요!')\n        continue\n    \n    if guess in secret:\n        print('🎉 맞았어요!')\n        guessed.append(guess)\n    else:\n        print('❌ 틀렸어요!')\n        chances -= 1\n\n# 마지막 상태 확인\nif chances > 0:\n    display = ''\n    for letter in secret:\n        if letter in guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    if '_ ' not in display:\n        print(f'\\n{display}')\n        print(f'🎉 정답! 단어는 \\'{secret}\\'이었어요!')",
          expectedOutput: "=== 🎮 Hangman 게임 ===\n힌트: 5글자 단어\n\n_ _ _ _ _   (남은 기회: 5)\n글자: a\n🎉 맞았어요!\n\na _ _ _ _   (남은 기회: 5)\n글자: e\n🎉 맞았어요!\n\na _ _ _ e   (남은 기회: 5)\n글자: x\n❌ 틀렸어요!\n\na _ _ _ e   (남은 기회: 4)\n글자: p\n🎉 맞았어요!\n\na p p _ e   (남은 기회: 4)\n글자: l\n🎉 맞았어요!\n\na p p l e \n🎉 정답! 단어는 'apple'이었어요!",
          hint: "for문으로 미리 정한 글자들을 하나씩 시도!",
          hint2: "for guess in guesses:"
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
          initialCode: "# 카테고리별 단어 딕셔너리\nword_categories = {\n    '과일': ['apple', 'banana', 'cherry'],\n    '동물': ['tiger', 'rabbit', 'dolphin'],\n    '나라': ['korea', 'japan', 'france']\n}\n\ncategory = '과일'\nwords = word_categories[category]\nsecret = words[0]  # 'apple'\nguesses = ['a', 'x', 'p', 'l', 'e']\nguessed = []\nchances = 5\n\nprint(f'=== 🎮 Hangman: {category} ===')\nprint(f'{len(secret)}글자 단어를 맞춰보세요!')\n\nfor guess in guesses:\n    display = ''\n    for letter in secret:\n        if letter ___ guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (기회: {chances})')\n    \n    if '_' not in display:\n        print(f'🎉 정답! \\'{secret}\\'!')\n        break\n    \n    print(f'글자: {guess}')\n    if guess in secret:\n        print('🎉 정답!')\n        guessed.___(guess)\n    else:\n        print('❌ 오답!')\n        chances ___ 1\n\n# 마지막 승리 체크\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\nif '_' not in display:\n    print(f'\\n{display}')\n    print(f'🎉 정답! \\'{secret}\\'!')",
          expectedOutput: "=== 🎮 Hangman: 과일 ===\n5글자 단어를 맞춰보세요!\n\n_ _ _ _ _   (기회: 5)\n글자: a\n🎉 정답!\n\na _ _ _ _   (기회: 5)\n글자: x\n❌ 오답!\n\na _ _ _ _   (기회: 4)\n글자: p\n🎉 정답!\n\na p p _ _   (기회: 4)\n글자: l\n🎉 정답!\n\na p p l _   (기회: 4)\n글자: e\n🎉 정답!\n\na p p l e \n🎉 정답! 'apple'!",
          hint: "in으로 포함 여부 확인!",
          hint2: "in / append / -= 1"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**Hangman 게임**을 완성했어요!

### 사용한 개념:
✅ 리스트 - 단어 저장, 맞춘 글자 저장, 추측 글자 저장
✅ 딕셔너리 - 카테고리별 단어 관리
✅ for문 - 글자 순회, 게임 루프
✅ if-elif-else - 조건 처리
✅ in 연산자 - 포함 여부 확인
✅ 문자열 포매팅 - f-string

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
