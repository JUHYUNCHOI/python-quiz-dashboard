// ============================================
// 레슨 6: 문자열 메서드
// ============================================
import { LessonData } from './types'

export const lesson6Data: LessonData = {
  id: "6",
  title: "문자열 메서드",
  emoji: "🔧",
  description: "문자열을 다루는 다양한 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "대소문자 변환",
      emoji: "🔤",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔧 메서드란?",
          content: `**메서드** = 문자열에 붙여서 사용하는 기능

\`\`\`python
text = "hello"
print(text.upper())  # HELLO
\`\`\`

\`문자열.메서드()\` 형태로 사용해요!`
        },
        {
          id: "upper-lower",
          type: "explain",
          title: "🔤 upper()와 lower()",
          content: `**upper()** - 모두 대문자로
**lower()** - 모두 소문자로

\`\`\`python
text = "Hello World"

print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
\`\`\`

⚠️ 원본은 바뀌지 않아요!
\`\`\`python
text = "Hello"
text.upper()
print(text)  # Hello (그대로!)
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열을 대문자로 변환하세요!",
          initialCode: "text = \"python\"\n# 대문자로 변환하는 메서드를 사용하세요\nprint(text.___())",
          expectedOutput: "PYTHON",
          hint: ".upper() 메서드 사용!",
          hint2: "text.upper()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 소문자로 변환!",
          task: "문자열을 소문자로 변환하세요!",
          initialCode: "text = \"HELLO\"\nprint(text.___())",
          expectedOutput: "hello",
          hint: ".lower() 메서드 사용!",
          hint2: "text.lower()"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"PyThOn\".lower()의 결과는?",
          options: ["PYTHON", "python", "PyThOn", "에러"],
          answer: 1,
          explanation: "lower()는 모든 글자를 소문자로 바꿔요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "공백 제거와 치환",
      emoji: "✂️",
      steps: [
        {
          id: "strip-explain",
          type: "explain",
          title: "✂️ strip() - 공백 제거",
          content: `**strip()** - 앞뒤 공백 제거

\`\`\`python
text = "   안녕하세요   "
print(text.strip())  # "안녕하세요"
\`\`\`

**lstrip()** - 왼쪽 공백만 제거
**rstrip()** - 오른쪽 공백만 제거

\`\`\`python
text = "   Hello   "
print(text.lstrip())  # "Hello   "
print(text.rstrip())  # "   Hello"
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "앞뒤 공백을 제거하세요!",
          initialCode: "text = \"   파이썬   \"\n# 공백을 제거하는 메서드를 사용하세요\nprint(text.___())",
          expectedOutput: "파이썬",
          hint: ".strip() 메서드 사용!",
          hint2: "text.strip()"
        },
        {
          id: "replace-explain",
          type: "explain",
          title: "🔄 replace() - 문자 치환",
          content: `**replace(old, new)** - 문자열 바꾸기

\`\`\`python
text = "Hello World"
print(text.replace("World", "Python"))
# Hello Python

text2 = "바나나 바나나"
print(text2.replace("바나나", "사과"))
# 사과 사과
\`\`\`

모든 일치하는 부분이 바뀌어요!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'사과'를 '포도'로 바꾸세요!",
          initialCode: "text = \"사과가 맛있다\"\nprint(text.replace(___, ___))",
          expectedOutput: "포도가 맛있다",
          hint: ".replace(\"사과\", \"포도\")",
          hint2: "text.replace(\"사과\", \"포도\")"
        },
        {
          id: "try-replace-scratch",
          type: "tryit",
          title: "✋ 손으로 직접 — replace 처음부터",
          task: "'안녕'을 '반가워'로 바꿔서 출력해봐. print 한 줄을 직접 써보자!",
          initialCode: "text = \"안녕 친구! 안녕 모두!\"\n# 여기에 print 한 줄을 직접 써봐\n",
          expectedOutput: "반가워 친구! 반가워 모두!",
          hint: "print( ... ) 안에 text.replace(\"안녕\", \"반가워\") 모양으로 넣으면 돼요",
          hint2: "print(text.replace(\"안녕\", \"반가워\"))"
        },
        {
          id: "try-replace-chain",
          type: "tryit",
          title: "✋ 두 개 한꺼번에 바꾸기",
          task: "replace 를 두 번 연결해서 '고양이'→'강아지', '소'→'토끼'로 바꿔봐.",
          initialCode: "text = \"고양이와 소\"\n# replace 를 .replace(...).replace(...) 처럼 이어붙일 수 있어\n",
          expectedOutput: "강아지와 토끼",
          hint: "한 줄에 replace 를 두 번 연결: text.replace(...).replace(...)",
          hint2: "print(text.replace(\"고양이\", \"강아지\").replace(\"소\", \"토끼\"))"
        }
      ]
    },
    {
      id: "ch3",
      title: "검색과 길이",
      emoji: "🔍",
      steps: [
        {
          id: "find-explain",
          type: "explain",
          title: "🔍 find()와 count()",
          content: `**find()** - 위치 찾기 (없으면 -1)
\`\`\`python
text = "Hello World"
print(text.find("World"))  # 6
print(text.find("Python")) # -1 (없음)
\`\`\`

**count()** - 개수 세기
\`\`\`python
text = "banana"
print(text.count("a"))  # 3
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'a'가 몇 개인지 세보세요!",
          initialCode: "text = \"abracadabra\"\nprint(text.___(\"a\"))",
          expectedOutput: "5",
          hint: ".count(\"a\") 메서드 사용!",
          hint2: "text.count(\"a\")"
        },
        {
          id: "try-count-scratch",
          type: "tryit",
          title: "✋ 손으로 직접 — count 처음부터",
          task: "문장에서 '는' 글자가 몇 번 나오는지 세서 출력해봐. print 한 줄을 직접 써보자!",
          initialCode: "text = \"나는 코딩을 배우는 중이고 나는 멋지다\"\n# 여기에 print 한 줄을 직접 써봐\n",
          expectedOutput: "3",
          hint: "print( text.count(\"는\") ) 모양으로 써요",
          hint2: "print(text.count(\"는\"))"
        },
        {
          id: "try-count-word",
          type: "tryit",
          title: "✋ 단어도 셀 수 있어",
          task: "한 글자 말고 '바나나' 같은 단어도 count 로 세지요. 'banana' 가 몇 번 나오는지 세서 출력해봐.",
          initialCode: "text = \"banana smoothie with banana chips and banana bread\"\n# print 한 줄로 'banana' 횟수 출력!\n",
          expectedOutput: "3",
          hint: "글자 대신 단어를 넣어요: text.count(\"banana\")",
          hint2: "print(text.count(\"banana\"))"
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() - 길이 구하기",
          content: `**len()** 함수로 문자열 길이를 구해요!

\`\`\`python
text = "Hello"
print(len(text))  # 5

name = "파이썬"
print(len(name))  # 3
\`\`\`

⚠️ len()은 메서드가 아니라 **함수**예요!
\`\`\`python
len(text)    # ✅ 함수
text.len()   # ❌ 에러!
\`\`\``
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열 길이를 구하세요!",
          initialCode: "text = \"Python\"\n# 길이를 구하는 함수를 사용하세요\nprint(___(text))",
          expectedOutput: "6",
          hint: "len(text) 함수 사용!",
          hint2: "len(text)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`len(\"안녕하세요\")`의 결과는?",
          options: ["5", "10", "15", "에러"],
          answer: 0,
          explanation: "한글도 글자 하나당 1로 세요! 5글자 = 5"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "more-methods",
          type: "explain",
          title: "📝 더 많은 메서드",
          content: `**startswith() / endswith()** - 시작/끝 확인
\`\`\`python
text = "Hello World"
print(text.startswith("Hello"))  # True
print(text.endswith("World"))    # True
\`\`\`

**isdigit()** - 숫자로만 구성?
\`\`\`python
"123".isdigit()   # True
"12a".isdigit()   # False
\`\`\`

**capitalize()** - 첫 글자만 대문자
\`\`\`python
"hello".capitalize()  # Hello
\`\`\``
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "아이디 검사기를 완성하세요!",
          initialCode: "user_id = \"  PyThOn_User  \"\n\n# 1. 공백 제거\nclean_id = user_id.___()\n# 2. 소문자로 변환\nlower_id = clean_id.___()\n# 3. 길이 확인\nlength = ___(lower_id)\n\nprint(\"원본:\", user_id)\nprint(\"정리:\", lower_id)\nprint(\"길이:\", length)",
          expectedOutput: "원본:   PyThOn_User  \n정리: python_user\n길이: 11",
          hint: "strip() → lower() → len() 순서로!",
          hint2: "strip(), lower(), len()"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **upper(), lower()** - 대소문자 변환
✅ **strip()** - 공백 제거
✅ **replace()** - 문자 치환
✅ **find(), count()** - 검색
✅ **len()** - 길이 구하기

다음 시간에는 **print() 옵션**을 배워서 출력을 더 멋지게 꾸밀 거예요! 🚀`
        }
      ]
    }
  ]
}
