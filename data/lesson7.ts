// ============================================
// 레슨 7: print() 옵션
// ============================================
import { LessonData } from './types'

export const lesson7Data: LessonData = {
  id: "7",
  title: "print() 옵션",
  emoji: "⚙️",
  description: "print()를 더 자유롭게 사용해봐요!",
  chapters: [
    {
      id: "ch1",
      title: "sep 옵션",
      emoji: "🔸",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "⚙️ print()에 옵션이 있다!",
          content: `print()는 기본적으로 공백으로 구분해요:

\`\`\`python
print("A", "B", "C")  # A B C
\`\`\`

하지만 **옵션**을 주면 바꿀 수 있어요!`
        },
        {
          id: "sep-explain",
          type: "explain",
          title: "🔸 sep - 구분자 바꾸기",
          content: `**sep** = separator(구분자)

\`\`\`python
print("A", "B", "C", sep="-")
# A-B-C

print("2024", "01", "15", sep="/")
# 2024/01/15

print("철수", "영희", "민수", sep=", ")
# 철수, 영희, 민수
\`\`\`

기본값은 \`sep=" "\` (공백)이에요!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "날짜를 -로 구분해서 출력하세요!",
          initialCode: "print(\"2024\", \"01\", \"15\", sep=\"-\")",
          expectedOutput: "2024-01-15",
          hint: "sep=\"-\" 옵션 사용!",
          hint2: "print(\"2024\", \"01\", \"15\", sep=\"-\")"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 구분자 없애기!",
          task: "공백 없이 ABC를 붙여서 출력하세요!",
          initialCode: "print(\"A\", \"B\", \"C\", sep=\"\")",
          expectedOutput: "ABC",
          hint: "sep=\"\" (빈 문자열)로 설정!",
          hint2: "sep=\"\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "print(1, 2, 3, sep=\"★\")의 결과는?",
          options: ["1 2 3", "1★2★3", "★1★2★3★", "123"],
          answer: 1,
          explanation: "sep은 값들 '사이'에 들어가요! 1★2★3"
        }
      ]
    },
    {
      id: "ch2",
      title: "end 옵션",
      emoji: "🔚",
      steps: [
        {
          id: "end-explain",
          type: "explain",
          title: "🔚 end - 끝 문자 바꾸기",
          content: `print()는 기본적으로 줄바꿈(\\n)으로 끝나요:

\`\`\`python
print("안녕")
print("하세요")
# 안녕
# 하세요
\`\`\`

**end**로 바꿀 수 있어요:
\`\`\`python
print("안녕", end=" ")
print("하세요")
# 안녕 하세요
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "두 print를 한 줄에 출력하세요!",
          initialCode: "print(\"Hello\", end=\" \")\nprint(\"World\")",
          expectedOutput: "Hello World",
          hint: "end=\" \"로 줄바꿈 대신 공백!",
          hint2: "print(\"Hello\", end=\" \")"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 화살표로 연결!",
          task: "A → B → C 형태로 출력하세요!",
          initialCode: "print(\"A\", end=\" → \")\nprint(\"B\", end=\" → \")\nprint(\"C\")",
          expectedOutput: "A → B → C",
          hint: "end=\" → \"로 설정!",
          hint2: "print(\"A\", end=\" → \")"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "print(\"A\", end=\"\")의 결과 뒤에 다음 print가 오면?",
          options: ["줄바꿈 후 출력", "바로 이어서 출력", "에러 발생", "공백 후 출력"],
          answer: 1,
          explanation: "end=\"\"는 아무것도 출력 안 하니까 바로 이어져요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "sep과 end 함께 사용",
      emoji: "🎨",
      steps: [
        {
          id: "both-explain",
          type: "explain",
          title: "🎨 sep과 end 함께!",
          content: `두 옵션을 함께 쓸 수 있어요:

\`\`\`python
print("A", "B", "C", sep="-", end="!")
print("끝")
# A-B-C!끝
\`\`\`

**순서는 상관없어요:**
\`\`\`python
print("A", "B", end="!", sep="-")  # 같은 결과
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "sep과 end를 모두 사용하세요!",
          initialCode: "print(\"가\", \"나\", \"다\", sep=\"/\", end=\".\\n\")",
          expectedOutput: "가/나/다.",
          hint: "sep=\"/\", end=\".\\n\"",
          hint2: "print(\"가\", \"나\", \"다\", sep=\"/\", end=\".\\n\")"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "로딩 표시를 만들어보세요!",
          initialCode: "print(\"Loading\", end=\"\")\nprint(\".\", end=\"\")\nprint(\".\", end=\"\")\nprint(\".\", end=\"\")\nprint(\" Done!\")",
          expectedOutput: "Loading... Done!",
          hint: "end=\"\"로 줄바꿈 없이 이어붙이기!",
          hint2: "print(\".\", end=\"\")"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 정리",
          content: `## print() 옵션 정리

**sep** - 값들 사이 구분자 (기본: 공백)
\`\`\`python
print("A", "B", sep="-")  # A-B
\`\`\`

**end** - 끝 문자 (기본: 줄바꿈)
\`\`\`python
print("Hello", end=" ")  # 줄바꿈 없이
\`\`\`

**함께 사용**
\`\`\`python
print("A", "B", sep="-", end="!")  # A-B!
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "예쁜 진행바를 만들어보세요!",
          initialCode: "print(\"[\", end=\"\")\nprint(\"#\", \"#\", \"#\", \"#\", \"#\", sep=\"\", end=\"\")\nprint(\"]\", \"100%\", sep=\" \")",
          expectedOutput: "[#####] 100%",
          hint: "end=\"\"로 이어붙이고, sep=\"\"로 공백 없이!",
          hint2: "print(\"#\", \"#\", \"#\", sep=\"\", end=\"\")"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **sep** - 구분자 바꾸기
✅ **end** - 끝 문자 바꾸기
✅ 두 옵션 **함께 사용**하기

다음 시간에는 **f-string**을 배워서 더 편하게 출력할 거예요! 🚀`
        }
      ]
    }
  ]
}
