// ============================================
// 레슨 20: 딕셔너리
// ============================================
import { LessonData } from './types'

export const lesson20Data: LessonData = {
  id: "20",
  title: "딕셔너리",
  emoji: "📖",
  description: "키-값 쌍으로 데이터를 저장해요!",
  chapters: [
    {
      id: "ch1",
      title: "딕셔너리란?",
      emoji: "📖",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📖 사전처럼 찾기!",
          content: `영어사전에서 단어를 찾듯이!

**딕셔너리** = 키(key)로 값(value)을 찾는 자료구조

\`\`\`python
person = {
    "이름": "철수",
    "나이": 15,
    "학교": "파이썬중학교"
}

print(person["이름"])  # 철수
print(person["나이"])  # 15
\`\`\`

**{키: 값, 키: 값, ...}** 형태!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "딕셔너리에서 값을 찾아보세요!",
          initialCode: "student = {\n    \"이름\": \"영희\",\n    \"점수\": 95,\n    \"반\": \"A\"\n}\n\nprint(student[\"이름\"])\nprint(student[\"점수\"])",
          expectedOutput: "영희\n95",
          hint: "딕셔너리[키]로 값을 찾아요!",
          hint2: "student[\"이름\"]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "딕셔너리에서 값을 찾는 방법은?",
          options: ["dict[0]", "dict[키]", "dict(키)", "dict.키"],
          answer: 1,
          explanation: "딕셔너리[키]로 해당 키의 값을 찾아요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "딕셔너리 수정",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ 추가와 수정",
          content: `**값 추가/수정:**
\`\`\`python
person = {"이름": "철수"}

# 추가
person["나이"] = 15

# 수정
person["이름"] = "영희"

print(person)
# {'이름': '영희', '나이': 15}
\`\`\`

없는 키면 **추가**, 있는 키면 **수정**!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 값 추가하기!",
          task: "딕셔너리에 '취미'를 추가하세요!",
          initialCode: "person = {\"이름\": \"철수\", \"나이\": 15}\nperson[\"취미\"] = \"게임\"\nprint(person)",
          expectedOutput: "{'이름': '철수', '나이': 15, '취미': '게임'}",
          hint: "person[\"취미\"] = \"게임\"",
          hint2: "새 키를 넣으면 추가돼요!"
        },
        {
          id: "del-explain",
          type: "explain",
          title: "🗑️ 삭제하기",
          content: `**del** 또는 **pop()**으로 삭제:

\`\`\`python
person = {"이름": "철수", "나이": 15}

# del로 삭제
del person["나이"]

# pop()으로 삭제 (값 반환)
name = person.pop("이름")
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 값 삭제하기!",
          task: "'나이' 키를 삭제하세요!",
          initialCode: "person = {\"이름\": \"철수\", \"나이\": 15, \"학교\": \"중학교\"}\ndel person[\"나이\"]\nprint(person)",
          expectedOutput: "{'이름': '철수', '학교': '중학교'}",
          hint: "del person[\"나이\"]",
          hint2: "del 딕셔너리[키]"
        }
      ]
    },
    {
      id: "ch3",
      title: "딕셔너리 메서드",
      emoji: "🔧",
      steps: [
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 유용한 메서드들",
          content: `**keys()** - 모든 키
**values()** - 모든 값
**items()** - 키-값 쌍

\`\`\`python
person = {"이름": "철수", "나이": 15}

print(person.keys())    # dict_keys(['이름', '나이'])
print(person.values())  # dict_values(['철수', 15])
print(person.items())   # dict_items([('이름', '철수'), ...])
\`\`\`

**get()** - 안전하게 값 가져오기
\`\`\`python
print(person.get("이름"))  # 철수
print(person.get("직업"))  # None (에러 안 남!)
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 딕셔너리 순회!",
          task: "모든 키-값 쌍을 출력하세요!",
          initialCode: "scores = {\"국어\": 90, \"영어\": 85, \"수학\": 95}\n\nfor subject, score in scores.items():\n    print(f\"{subject}: {score}점\")",
          expectedOutput: "국어: 90점\n영어: 85점\n수학: 95점",
          hint: "items()로 키-값 쌍을 순회!",
          hint2: "for key, value in dict.items():"
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
          task: "단어장을 만들어보세요!",
          initialCode: "dictionary = {\n    \"apple\": \"사과\",\n    \"banana\": \"바나나\",\n    \"cherry\": \"체리\"\n}\n\nword = \"apple\"\nif word in dictionary:\n    print(f\"{word} = {dictionary[word]}\")\nelse:\n    print(\"단어를 찾을 수 없습니다\")",
          expectedOutput: "apple = 사과",
          hint: "in으로 키 존재 여부 확인!",
          hint2: "word in dictionary"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **딕셔너리 { }** - 키:값 쌍
✅ **dict[키]** - 값 접근
✅ **추가/수정/삭제** - dict[키] = 값, del
✅ **keys(), values(), items()** - 메서드
✅ **get()** - 안전한 접근

다음 시간에는 **집합(set)**을 배워요! 🚀`
        }
      ]
    }
  ]
}
