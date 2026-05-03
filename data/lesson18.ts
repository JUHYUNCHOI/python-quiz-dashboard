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
          content: `여러 값을 한 번에 처리하고 싶을 때가 있어요!

\`\`\`python
text = "사과 바나나 딸기"
fruits = text.split()
print(fruits)  # ['사과', '바나나', '딸기']
\`\`\`

**split()** = 문자열 → 리스트!

### 어디서 자주 만나요?

- 사용자 입력 — \`input()\` 받은 한 줄에서 여러 값 분리
- CSV 데이터 — 쉼표 구분된 데이터 한 줄씩 파싱
- 날짜/시간 — \`"2024-01-15"\` 처럼 구분자로 묶인 값
- 코딩 테스트 — 입력 형식이 \`"3 5 7"\` 같이 들어옴

쪼개기는 거의 모든 입력 처리의 첫 단계예요.`
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
\`\`\`

### 인자 없는 split() 의 마법

\`\`\`python
"  hello   world  python  ".split()
# ['hello', 'world', 'python']  ← 공백 여러 개도 알아서!
\`\`\`

인자 없는 \`split()\` 은 **모든 종류의 공백** (스페이스, 탭, 줄바꿈) 으로 쪼개고, **연속된 공백을 하나로** 처리해요. 사용자 입력이 들쑥날쑥해도 안전.

### 인자 있는 split(",") 은 다름

\`\`\`python
"a,,b".split(",")    # ['a', '', 'b']  ← 빈 문자열도 등장!
\`\`\`

명시적 구분자는 **연속돼도 그대로** — 빈 문자열이 끼어들 수 있어요. 데이터에 따라 의식해야.`
        },
        {
          id: "split-maxsplit",
          type: "explain",
          title: "🎯 split(구분자, 횟수) — 일부만 쪼개기",
          content: `두 번째 인자로 **최대 몇 번 쪼갤지** 정할 수 있어요.

\`\`\`python
text = "name=john,age=15,city=seoul"

# 모두 쪼개기
text.split(",")
# ['name=john', 'age=15', 'city=seoul']

# 첫 번째만 쪼개기
text.split(",", 1)
# ['name=john', 'age=15,city=seoul']
\`\`\`

### 실전 — "키=값" 형태 한 번만 쪼개기

\`\`\`python
line = "name=Hello, World!"
key, value = line.split("=", 1)
print(key)    # 'name'
print(value)  # 'Hello, World!' — 나머지 그대로
\`\`\`

\`split("=")\` 만 했으면 \`'Hello'\` 와 \`' World!'\` 가 또 쪼개져 버려요. **maxsplit=1** 로 첫 \`=\` 만 잘라 안전.`
        },
        {
          id: "try-maxsplit",
          type: "tryit",
          title: "🖥️ 직접 해보기 — maxsplit",
          task: "이메일 'user.name@gmail.com' 을 첫 @ 로만 쪼개서 ID 와 도메인 분리하세요!",
          initialCode: "email = \"user.name@gmail.com\"\n\n# @ 로 첫 번째만 쪼개기\nuser, domain = email.___(\"@\", ___)\nprint(f\"ID: {user}\")\nprint(f\"Domain: {domain}\")",
          expectedOutput: "ID: user.name\nDomain: gmail.com",
          hint: "split(\"@\", 1) — 첫 @ 에서만 한 번 자름.",
          hint2: "user, domain = email.split(\"@\", 1)"
        },
        {
          id: "splitlines-explain",
          type: "explain",
          title: "📄 splitlines() — 줄 단위로 쪼개기",
          content: `여러 줄짜리 텍스트를 **줄 단위로** 쪼갤 땐 \`splitlines()\` 가 깔끔해요.

\`\`\`python
text = """첫 줄
둘째 줄
셋째 줄"""

lines = text.splitlines()
print(lines)
# ['첫 줄', '둘째 줄', '셋째 줄']
\`\`\`

### split("\\n") 과 차이

\`\`\`python
text = "a\\nb\\n"

text.split("\\n")        # ['a', 'b', '']  ← 끝에 빈 문자열
text.splitlines()        # ['a', 'b']       ← 깔끔
\`\`\`

\`splitlines()\` 는 끝의 줄바꿈을 알아서 무시. 파일 읽을 때 자주 써요.`
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
          hint: "list()로 감싸면 리스트가 돼요!",
          hint2: "list(map(int, text.split()))"
        },
        {
          id: "input-pattern",
          type: "explain",
          title: "⌨️ 코딩 테스트 단골 — input().split()",
          content: `코딩 테스트 (백준, 코드포스 등) 에서 입력이 **한 줄에 여러 숫자** 형태로 자주 와요.

\`\`\`
입력 예시:
3 5 7
\`\`\`

이걸 받아서 정수 리스트로 변환:

\`\`\`python
# 정석 — 모두 같은 결과
nums = list(map(int, input().split()))

# 변수에 한 번에 받기 (개수 알 때)
a, b, c = map(int, input().split())
print(a + b + c)
\`\`\`

### 자주 쓰는 패턴 모음

\`\`\`python
# 1) 첫 줄에 N, 다음 줄에 N 개의 수
n = int(input())
nums = list(map(int, input().split()))

# 2) 두 정수 받기
a, b = map(int, input().split())

# 3) 실수도 OK
xs = list(map(float, input().split()))

# 4) 문자열 그대로
words = input().split()
\`\`\`

> 💡 \`map\` 은 list() 로 감싸야 리스트가 돼요. 안 감싸면 map 객체 (이상한 거).`
        },
        {
          id: "try-input-pattern",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 여러 수의 평균",
          task: "한 줄에 공백으로 구분된 정수들의 평균을 구하세요. (입력: 아래 stdin)",
          initialCode: "nums = list(map(int, input().split()))\n\n# 평균을 구해서 'avg: ___' 형식으로 출력 (소수점 포함 OK)\navg = ___\nprint(f\"avg: {avg}\")",
          expectedOutput: "avg: 6.0",
          stdin: "3 5 7 8 9 4",
          hint: "sum(nums) / len(nums)",
          hint2: "avg = sum(nums) / len(nums)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`\"1 2 3\".split()`의 결과는?",
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
          hint: "구분자.join(리스트) 형태예요!",
          hint2: "'-'.join(words)"
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
        },
        {
          id: "join-numbers-trap",
          type: "explain",
          title: "⚠️ 숫자 리스트는 그대로 못 join!",
          content: `\`join()\` 은 **문자열만** 합칠 수 있어요. 숫자 리스트면 에러나요.

\`\`\`python
nums = [1, 2, 3]
",".join(nums)
# ❌ TypeError: sequence item 0: expected str instance, int found
\`\`\`

### 해결 — 각 숫자를 str() 로 변환 후 join

\`\`\`python
nums = [1, 2, 3]

# 방법 1) map(str, ...)
result = ",".join(map(str, nums))
print(result)  # "1,2,3"

# 방법 2) 리스트 컴프리헨션
result = ",".join([str(n) for n in nums])
print(result)  # "1,2,3"
\`\`\`

> 🎯 split 은 결과가 항상 **문자열 리스트**, join 은 인자가 **문자열 리스트** — 정확히 짝.`
        },
        {
          id: "try-join-numbers",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 점수 한 줄 출력",
          task: "점수 리스트를 \" / \" 로 구분된 한 문자열로 만들어 출력하세요!",
          initialCode: "scores = [85, 92, 78, 90, 88]\n\n# 'Hi / Bye' 처럼 ' / ' 로 구분\nresult = ___\nprint(result)",
          expectedOutput: "85 / 92 / 78 / 90 / 88",
          hint: "join 은 문자열만 → map(str, ...) 또는 [str(n) for n in scores] 필요.",
          hint2: "result = \" / \".join(map(str, scores))"
        },
        {
          id: "join-newline",
          type: "explain",
          title: "📋 줄바꿈으로 join — 한 줄에 하나씩 출력",
          content: `\`\\n\` (줄바꿈) 도 구분자가 될 수 있어요. 리스트의 각 요소를 **한 줄에 하나씩** 출력할 때 깔끔.

\`\`\`python
items = ["사과", "바나나", "딸기"]

# 방법 1) for 루프 — 직관적이지만 print 여러 번
for item in items:
    print(item)

# 방법 2) "\\n".join — 한 줄에 다 합쳐서 print 한 번
print("\\n".join(items))
\`\`\`

둘 다 같은 결과:
\`\`\`
사과
바나나
딸기
\`\`\`

> 💡 join 의 구분자는 어떤 문자열이든 OK — \`", "\`, \`" - "\`, \`"\\n"\`, \`"|"\`, 심지어 \`""\` (빈 문자열).`
        },
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
          title: "🏆 미션 1 — 단어 순서 뒤집기",
          task: "단어 순서를 뒤집어서 출력하세요!",
          initialCode: "text = \"Hello World Python\"\nwords = text.___()\nwords.___()\nresult = ' '.___(words)\nprint(result)",
          expectedOutput: "Python World Hello",
          hint: "split() → reverse() → join()",
          hint2: "words.reverse()로 순서 뒤집기!"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — CSV 한 줄 파싱 + 합계",
          task: "쉼표로 구분된 점수 한 줄을 받아 정수로 변환 후 **합계와 평균** 둘 다 출력하세요!",
          initialCode: "line = \"75,90,82,88,95\"\n\n# 쉼표로 쪼개고 → int 변환 → 리스트로\nnums = ___\n\ntotal = sum(nums)\navg = total / len(nums)\nprint(f\"합계: {total}\")\nprint(f\"평균: {avg}\")",
          expectedOutput: "합계: 430\n평균: 86.0",
          hint: "list(map(int, line.split(\",\")))",
          hint2: "nums = list(map(int, line.split(\",\")))"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 입력 받은 단어들로 인사 만들기",
          task: "한 줄에 공백 구분으로 이름 여러 개 입력받아 '안녕 A, B, C!' 형태로 출력하세요. (마지막엔 ! 표)",
          initialCode: "# input() → split() 으로 이름 리스트 받기\nnames = input().___()\n\n# ', ' 로 join 하고 앞뒤 꾸미기\ngreeting = f\"안녕 {___}!\"\nprint(greeting)",
          expectedOutput: "안녕 철수, 영희, 민수!",
          stdin: "철수 영희 민수",
          hint: "names = input().split() / ', '.join(names)",
          hint2: "names = input().split()\ngreeting = f\"안녕 {', '.join(names)}!\""
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **split()** — 문자열을 리스트로 쪼개기 (인자 없음 vs 명시적)
✅ **maxsplit** — 최대 몇 번 쪼갤지 (이메일 첫 @, 키=값 첫 = 등)
✅ **splitlines()** — 줄 단위로 깔끔하게
✅ **map()** — 모든 요소에 타입 변환 적용
✅ **input().split()** — 코딩 테스트 단골 패턴
✅ **join()** — 리스트를 문자열로 합치기 (반대 방향)
✅ **숫자 join 트랩** — \`map(str, nums)\` 거쳐야 함
✅ **다양한 구분자** — \`", "\`, \`"\\n"\`, \`""\` 등

다음 시간에는 **튜플**을 배워요! 🚀 — split/join 의 결과로 자주 만나는 묶음 자료.`
        }
      ]
    }
  ]
}
