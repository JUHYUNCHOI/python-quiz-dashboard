// ============================================
// 레슨 18: split()과 join()
// ============================================
import { LessonData } from './types'

export const lesson18Data: LessonData = {
  id: "18",
  title: "split()과 join()",
  emoji: "✂️",
  description: "문자열을 쪼개고 합쳐요!",
  chapters: [
    {
      id: "ch1",
      title: "split() - 문자열 쪼개기",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "✂️ 문자열을 리스트로!",
          content: `input()으로 여러 값을 한 번에 받고 싶어요!

\`\`\`python
text = "사과 바나나 딸기"
fruits = text.split()
print(fruits)  # ['사과', '바나나', '딸기']
\`\`\`

**split()** = 문자열 → 리스트!`
        },
        {
          id: "split-explain",
          type: "explain",
          title: "✂️ split() 사용법",
          content: `**공백으로 쪼개기** (기본)
\`\`\`python
"a b c".split()      # ['a', 'b', 'c']
\`\`\`

**특정 문자로 쪼개기**
\`\`\`python
"2024-01-15".split("-")  # ['2024', '01', '15']
"a,b,c".split(",")       # ['a', 'b', 'c']
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열을 쪼개서 리스트로 만드세요!",
          initialCode: "text = \"철수 영희 민수\"\nnames = text.split()\nprint(names)",
          expectedOutput: "['철수', '영희', '민수']",
          hint: "split()은 공백으로 쪼개요!",
          hint2: "text.split()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 쉼표로 쪼개기!",
          task: "쉼표로 구분된 과일을 쪼개세요!",
          initialCode: "text = \"사과,바나나,딸기\"\nfruits = text.split(\",\")\nprint(fruits)",
          expectedOutput: "['사과', '바나나', '딸기']",
          hint: "split(\",\")로 쉼표 기준!",
          hint2: "text.split(\",\")"
        }
      ]
    },
    {
      id: "ch2",
      title: "map()으로 변환",
      emoji: "🔢",
      steps: [
        {
          id: "map-explain",
          type: "explain",
          title: "🔢 map()으로 한 번에 변환",
          content: `split() 결과는 **문자열 리스트**예요!

\`\`\`python
text = "10 20 30"
nums = text.split()
print(nums)  # ['10', '20', '30'] (문자열!)
\`\`\`

**map(함수, 리스트)** = 모든 요소에 함수 적용

\`\`\`python
nums = list(map(int, text.split()))
print(nums)  # [10, 20, 30] (정수!)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열 숫자를 정수 리스트로 변환하세요!",
          initialCode: "text = \"10 20 30 40 50\"\nnums = list(map(int, text.split()))\nprint(nums)\nprint(f\"합계: {sum(nums)}\")",
          expectedOutput: "[10, 20, 30, 40, 50]\n합계: 150",
          hint: "map(int, text.split())",
          hint2: "list()로 감싸면 리스트가 돼요!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"1 2 3\".split()의 결과는?",
          options: ["[1, 2, 3]", "['1', '2', '3']", "'1 2 3'", "에러"],
          answer: 1,
          explanation: "split()은 항상 문자열 리스트를 반환해요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "join() - 리스트 합치기",
      emoji: "🔗",
      steps: [
        {
          id: "join-explain",
          type: "explain",
          title: "🔗 리스트를 문자열로!",
          content: `**join()** = 리스트 → 문자열 (split의 반대!)

\`\`\`python
fruits = ['사과', '바나나', '딸기']

# 공백으로 합치기
result = ' '.join(fruits)
print(result)  # "사과 바나나 딸기"

# 쉼표로 합치기
result = ','.join(fruits)
print(result)  # "사과,바나나,딸기"
\`\`\`

**'구분자'.join(리스트)** 형태!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "리스트를 - 로 연결하세요!",
          initialCode: "words = ['2024', '01', '15']\ndate = '-'.join(words)\nprint(date)",
          expectedOutput: "2024-01-15",
          hint: "'-'.join(words)",
          hint2: "구분자.join(리스트)"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 붙여서 출력!",
          task: "글자들을 붙여서 단어로 만드세요!",
          initialCode: "letters = ['P', 'y', 't', 'h', 'o', 'n']\nword = ''.join(letters)\nprint(word)",
          expectedOutput: "Python",
          hint: "''.join()은 구분자 없이 붙여요!",
          hint2: "빈 문자열 ''로 join"
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
          task: "단어 순서를 뒤집어서 출력하세요!",
          initialCode: "text = \"Hello World Python\"\nwords = text.split()\nwords.reverse()\nresult = ' '.join(words)\nprint(result)",
          expectedOutput: "Python World Hello",
          hint: "split() → reverse() → join()",
          hint2: "words.reverse()로 순서 뒤집기!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **split()** - 문자열을 리스트로 쪼개기
✅ **join()** - 리스트를 문자열로 합치기
✅ **map()** - 한 번에 타입 변환

다음 시간에는 **튜플**을 배워요! 🚀`
        }
      ]
    }
  ]
}
