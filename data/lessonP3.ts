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
          title: "🎮 오늘 만들 것: Hangman 게임!",
          content: `Part 3에서 배운 리스트·딕셔너리·반복문을 다 써서
**단어 맞추기 Hangman**을 만들어요!

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
          title: "📚 게임이 어떻게 돌아갈까?",
          content: `**게임 흐름:**

1. 단어 리스트에서 단어 하나 선택
2. 밑줄(_ _ _ _ _)로 숨겨서 보여주기
3. 미리 정한 글자 리스트로 한 글자씩 추측
4. 맞으면 글자 공개, 틀리면 기회 1 감소
5. 단어 완성 or 기회 소진까지 반복!

**필요한 변수 (변수 5형제):**
- \`words\`: 단어 리스트 ('apple', 'banana', ...)
- \`secret\`: 맞춰야 할 단어
- \`guesses\`: 미리 정한 추측 글자들
- \`guessed\`: 지금까지 맞춘 글자 모음
- \`chances\`: 남은 기회 (보통 5)`
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
          title: "1️⃣ 단어 하나 골라보기!",
          task: "words 리스트에서 첫 단어를 꺼내 출력해봐!",
          initialCode: "words = ['apple', 'banana', 'cherry', 'orange', 'grape']\nsecret = words[0]  # 'apple' 고정\n\nprint(f'선택된 단어: {secret}')\nprint(f'글자 수: {len(secret)}')",
          expectedOutput: "선택된 단어: apple\n글자 수: 5",
          hint: "리스트의 인덱스로 단어 선택!",
          hint2: "secret = words[0]"
        },
        {
          id: "step2",
          type: "tryit",
          title: "2️⃣ 단어를 밑줄로 가리기!",
          task: "for로 글자마다 밑줄로 바꿔서 표시해봐!",
          initialCode: "secret = 'apple'\nguessed = []  # 맞춘 글자들\n\n# 표시할 문자열 만들기\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\n\nprint(display)",
          expectedOutput: "_ _ _ _ _ ",
          hint: "for문으로 각 글자를 확인!",
          hint2: "if letter in guessed: display += letter"
        },
        {
          id: "step3",
          type: "tryit",
          title: "3️⃣ 글자가 단어 안에 있나?",
          task: "in으로 글자 검사 + guessed에 append!",
          initialCode: "secret = 'apple'\nguessed = ['a']  # 이미 a를 맞춤\n\n# input() 대신 직접 글자를 넣어요\nguess = 'p'\n\nif guess in secret:\n    print('🎉 맞았어요!')\n    guessed.append(guess)\nelse:\n    print('❌ 틀렸어요!')\n\nprint(f'맞춘 글자: {guessed}')",
          expectedOutput: "🎉 맞았어요!\n맞춘 글자: ['a', 'p']",
          hint: "in으로 글자가 있는지 확인!",
          hint2: "if guess in secret:"
        },
        {
          id: "step4",
          type: "tryit",
          title: "4️⃣ 모든 글자를 다 맞췄나?",
          task: "for로 모든 글자가 guessed에 있는지 검사!",
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
          title: "5️⃣ 진짜 게임 루프 돌리기!",
          task: "for로 추측 하나씩 → 표시·승리체크·기회감소 다 처리!",
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
          title: "🏆 카테고리별 Hangman 업그레이드!",
          task: "딕셔너리로 과일/동물/나라 단어 분류 + 빈칸 3개 채우기!",
          initialCode: "# 카테고리별 단어 딕셔너리\nword_categories = {\n    '과일': ['apple', 'banana', 'cherry'],\n    '동물': ['tiger', 'rabbit', 'dolphin'],\n    '나라': ['korea', 'japan', 'france']\n}\n\ncategory = '과일'\nwords = word_categories[category]\nsecret = words[0]  # 'apple'\nguesses = ['a', 'x', 'p', 'l', 'e']\nguessed = []\nchances = 5\n\nprint(f'=== 🎮 Hangman: {category} ===')\nprint(f'{len(secret)}글자 단어를 맞춰보세요!')\n\nfor guess in guesses:\n    display = ''\n    for letter in secret:\n        if letter ___ guessed:\n            display += letter + ' '\n        else:\n            display += '_ '\n    print(f'\\n{display}  (기회: {chances})')\n    \n    if '_' not in display:\n        print(f'🎉 정답! \\'{secret}\\'!')\n        break\n    \n    print(f'글자: {guess}')\n    if guess in secret:\n        print('🎉 정답!')\n        guessed.___(guess)\n    else:\n        print('❌ 오답!')\n        chances ___ 1\n\n# 마지막 승리 체크\ndisplay = ''\nfor letter in secret:\n    if letter in guessed:\n        display += letter + ' '\n    else:\n        display += '_ '\nif '_' not in display:\n    print(f'\\n{display}')\n    print(f'🎉 정답! \\'{secret}\\'!')",
          expectedOutput: "=== 🎮 Hangman: 과일 ===\n5글자 단어를 맞춰보세요!\n\n_ _ _ _ _   (기회: 5)\n글자: a\n🎉 정답!\n\na _ _ _ _   (기회: 5)\n글자: x\n❌ 오답!\n\na _ _ _ _   (기회: 4)\n글자: p\n🎉 정답!\n\na p p _ _   (기회: 4)\n글자: l\n🎉 정답!\n\na p p l _   (기회: 4)\n글자: e\n🎉 정답!\n\na p p l e \n🎉 정답! 'apple'!",
          hint: "첫 빈칸은 in, 둘째는 append, 셋째는 -=!",
          hint2: "in / append / -="
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 프로젝트 완료!",
          content: `## 축하해요! 🎉

**Hangman 게임**을 완성했어요!

### 오늘 쓴 개념:
✅ 리스트 - 단어/맞춘 글자/추측 글자 저장
✅ 딕셔너리 - 카테고리별 단어 관리
✅ for문 - 글자 순회, 게임 루프
✅ if-elif-else - 조건 처리
✅ in 연산자 - 글자가 들어있는지 확인
✅ f-string - 점수/상태 출력

### 도전 과제 💪
- words 리스트에 **내가 좋아하는 단어** 추가!
- 카테고리에 **내 친구 이름** 카테고리 만들기
- 기회를 7번으로 늘려서 더 쉽게 만들기
- Hangman 그림 추가 (ASCII Art)
- 점수 시스템 추가

🎉 **파이썬 기초 마스터!**
이제 함수·클래스가 있는 더 큰 프로젝트로! 🚀`
        }
      ]
    }
  ]
}
