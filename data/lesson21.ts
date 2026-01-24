// ============================================
// 레슨 21: 집합 (set)
// ============================================
import { LessonData } from './types'

export const lesson21Data: LessonData = {
  id: "21",
  title: "집합 (set)",
  emoji: "🎯",
  description: "중복 없는 집합을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "집합이란?",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 중복을 없애고 싶다면?",
          content: `**집합(set)** = 중복이 없고, 순서가 없는 자료구조

\`\`\`python
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3} - 중복 제거!

names = {"철수", "영희", "철수"}
print(names)  # {'철수', '영희'}
\`\`\`

**특징:**
- ❌ 중복 없음
- ❌ 순서 없음 (인덱스 불가)
- ⭕ 빠른 검색`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "중복된 숫자를 제거하세요!",
          initialCode: "numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = set(numbers)\nprint(unique)",
          expectedOutput: "{1, 2, 3, 4}",
          hint: "set()으로 리스트를 집합으로!",
          hint2: "set(리스트)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "set([1, 1, 2, 2, 3])의 결과는?",
          options: ["{1, 1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "에러"],
          answer: 1,
          explanation: "집합은 중복을 자동으로 제거해요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "집합 연산",
      emoji: "🔧",
      steps: [
        {
          id: "add-remove",
          type: "explain",
          title: "➕➖ 추가와 삭제",
          content: `**add()** - 추가
**remove()** - 삭제 (없으면 에러)
**discard()** - 삭제 (없어도 OK)

\`\`\`python
fruits = {"사과", "바나나"}

fruits.add("딸기")
print(fruits)  # {'사과', '바나나', '딸기'}

fruits.remove("바나나")
print(fruits)  # {'사과', '딸기'}
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 요소 추가하기!",
          task: "집합에 '오렌지'를 추가하세요!",
          initialCode: "fruits = {\"사과\", \"바나나\"}\nfruits.add(\"오렌지\")\nprint(fruits)",
          expectedOutput: "",
          hint: "add()로 추가!",
          hint2: "fruits.add(\"오렌지\")"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 포함 여부 확인",
          content: `**in** 연산자로 빠르게 확인!

\`\`\`python
fruits = {"사과", "바나나", "딸기"}

print("사과" in fruits)   # True
print("포도" in fruits)   # False
\`\`\`

💡 집합은 리스트보다 **훨씬 빠르게** 검색해요!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 포함 확인!",
          task: "'바나나'가 있는지 확인하세요!",
          initialCode: "fruits = {\"사과\", \"바나나\", \"딸기\"}\nprint(\"바나나\" in fruits)",
          expectedOutput: "True",
          hint: "in 연산자 사용!",
          hint2: "\"바나나\" in fruits"
        }
      ]
    },
    {
      id: "ch3",
      title: "집합 연산",
      emoji: "🧮",
      steps: [
        {
          id: "set-ops",
          type: "explain",
          title: "🧮 수학의 집합 연산!",
          content: `\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# 합집합 (A 또는 B)
print(A | B)  # {1, 2, 3, 4, 5, 6}

# 교집합 (A 그리고 B)
print(A & B)  # {3, 4}

# 차집합 (A에만 있는 것)
print(A - B)  # {1, 2}
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 교집합 구하기!",
          task: "두 집합의 공통 요소를 찾으세요!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\nprint(A & B)",
          expectedOutput: "{4, 5}",
          hint: "& 연산자로 교집합!",
          hint2: "A & B"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "{1, 2, 3} | {3, 4, 5}의 결과는?",
          options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "에러"],
          answer: 1,
          explanation: "| 는 합집합! 모든 요소를 합쳐요."
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
          task: "두 반의 공통 학생을 찾으세요!",
          initialCode: "class_a = {\"철수\", \"영희\", \"민수\", \"지영\"}\nclass_b = {\"영희\", \"민수\", \"준호\", \"수진\"}\n\ncommon = class_a & class_b\nprint(\"공통 학생:\", common)",
          expectedOutput: "공통 학생: {'영희', '민수'}",
          hint: "& 연산자로 교집합!",
          hint2: "class_a & class_b"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **집합 { }** - 중복 없음, 순서 없음
✅ **add(), remove()** - 추가/삭제
✅ **in** - 빠른 검색
✅ **| & -** - 합집합, 교집합, 차집합

다음 시간에는 **슬라이싱**을 배워요! 🚀`
        }
      ]
    }
  ]
}
