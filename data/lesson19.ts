// ============================================
// 레슨 19: 튜플
// ============================================
import { LessonData } from './types'

export const lesson19Data: LessonData = {
  id: "19",
  title: "튜플",
  emoji: "📦",
  description: "수정할 수 없는 리스트, 튜플을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "튜플이란?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 튜플 = 수정 불가 리스트",
          content: `**튜플(Tuple)** = 한 번 만들면 수정할 수 없는 리스트

\`\`\`python
# 리스트 - 수정 가능
fruits = ["사과", "바나나"]
fruits[0] = "포도"  # OK!

# 튜플 - 수정 불가
colors = ("빨강", "파랑")
colors[0] = "녹색"  # ❌ 에러!
\`\`\`

**소괄호 ( )** 또는 그냥 쉼표로 만들어요!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "좌표를 튜플로 만들어보세요!",
          initialCode: "point = (100, 200)\nprint(point)\nprint(f\"x: {point[0]}, y: {point[1]}\")",
          expectedOutput: "(100, 200)\nx: 100, y: 200",
          hint: "인덱스로 접근은 리스트와 같아요!",
          hint2: "point[0], point[1]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "(1)과 (1,)의 차이는?",
          options: ["둘 다 튜플", "(1)은 숫자, (1,)은 튜플", "둘 다 숫자", "에러"],
          answer: 1,
          explanation: "(1)은 그냥 숫자 1, (1,)은 요소 1개짜리 튜플이에요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "언패킹",
      emoji: "📤",
      steps: [
        {
          id: "unpack-explain",
          type: "explain",
          title: "📤 언패킹 (Unpacking)",
          content: `튜플의 값을 한 번에 여러 변수에 할당!

\`\`\`python
point = (10, 20)
x, y = point  # 언패킹!
print(x)  # 10
print(y)  # 20
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 언패킹 해보기!",
          task: "RGB 값을 언패킹하세요!",
          initialCode: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(f\"R: {r}, G: {g}, B: {b}\")",
          expectedOutput: "R: 255, G: 128, B: 0",
          hint: "r, g, b = rgb로 한 번에!",
          hint2: "변수 개수와 요소 개수가 같아야 해요"
        },
        {
          id: "swap-explain",
          type: "explain",
          title: "🔄 값 교환 (Swap)",
          content: `튜플로 값 교환이 쉬워요!

\`\`\`python
a = 10
b = 20
a, b = b, a  # 한 줄로 교환!
print(a)  # 20
print(b)  # 10
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 값 교환!",
          task: "x와 y의 값을 교환하세요!",
          initialCode: "x = 100\ny = 200\nprint(f\"교환 전: x={x}, y={y}\")\nx, y = y, x\nprint(f\"교환 후: x={x}, y={y}\")",
          expectedOutput: "교환 전: x=100, y=200\n교환 후: x=200, y=100",
          hint: "x, y = y, x 한 줄로!",
          hint2: "임시 변수 없이 교환!"
        }
      ]
    },
    {
      id: "ch3",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "학생 정보를 튜플로 관리하세요!",
          initialCode: "students = [\n    (\"철수\", 85),\n    (\"영희\", 92),\n    (\"민수\", 78)\n]\n\nfor name, score in students:\n    print(f\"{name}: {score}점\")",
          expectedOutput: "철수: 85점\n영희: 92점\n민수: 78점",
          hint: "for문에서 바로 언패킹!",
          hint2: "for name, score in students:"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **튜플 ( )** - 수정 불가능한 리스트
✅ **언패킹** - 한 번에 여러 변수에 할당
✅ **값 교환** - a, b = b, a

다음 시간에는 **딕셔너리**를 배워요! 🚀`
        }
      ]
    }
  ]
}
