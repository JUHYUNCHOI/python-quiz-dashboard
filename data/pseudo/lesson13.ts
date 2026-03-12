// ============================================
// 수도코드 레슨 13: 파일 처리
// CIE 스타일 수도코드 - OPENFILE, READFILE, WRITEFILE, CLOSEFILE
// ============================================

import { LessonData } from '../types'

export const pseudoLesson13Data: LessonData = {
  id: "pseudo-13",
  title: "파일 처리",
  emoji: "📁",
  description: "파일 읽기와 쓰기!",
  chapters: [
    {
      id: "ch1",
      title: "파일 읽기",
      emoji: "📖",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📁 파일 처리가 왜 필요할까?",
          content: `지금까지 우리가 만든 프로그램은 **실행이 끝나면 데이터가 사라졌어요.**

예를 들어:
- 학생 점수를 입력했는데, 프로그램을 끄면 **전부 없어짐!**
- 게임 기록을 저장하고 싶은데, 다시 시작하면 **처음부터!**

**파일 처리(File Handling)**를 사용하면:
- 데이터를 **파일에 저장**해서 나중에 다시 쓸 수 있어요
- 다른 프로그램에서 만든 데이터를 **읽어올 수** 있어요

CIE 수도코드의 파일 처리 모드:
- **READ** - 파일에서 데이터 읽기
- **WRITE** - 파일에 데이터 쓰기 (기존 내용 삭제)
- **APPEND** - 파일 끝에 데이터 추가`
        },
        {
          id: "ch1-open-read",
          type: "explain",
          title: "📂 OPENFILE과 READFILE",
          content: `파일에서 데이터를 **읽으려면** 3단계가 필요해요:

**1단계: 파일 열기**
\`\`\`
OPENFILE "data.txt" FOR READ
\`\`\`

**2단계: 데이터 읽기**
\`\`\`
READFILE "data.txt", line
\`\`\`
\`line\` 변수에 파일의 **한 줄**이 저장돼요.

**3단계: 파일 닫기**
\`\`\`
CLOSEFILE "data.txt"
\`\`\`

전체 예시:
\`\`\`
DECLARE line : STRING
OPENFILE "names.txt" FOR READ
READFILE "names.txt", line
OUTPUT line
CLOSEFILE "names.txt"
\`\`\`

파일을 열었으면 **반드시 닫아야** 해요!`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '파일에서 데이터를 읽을 때 올바른 순서는?',
          options: [
            'OPENFILE → READFILE → CLOSEFILE',
            'READFILE → OPENFILE → CLOSEFILE',
            'OPENFILE → CLOSEFILE → READFILE',
            'CLOSEFILE → OPENFILE → READFILE'
          ],
          answer: 0,
          explanation: '파일 처리의 순서는 항상 **열기(OPENFILE) → 읽기/쓰기(READFILE) → 닫기(CLOSEFILE)**예요. 문을 열고, 안에서 작업하고, 문을 닫는 것과 같아요!'
        },
        {
          id: "ch1-readall",
          type: "explain",
          title: "🔄 파일 전체 읽기",
          content: `파일에 여러 줄이 있을 때, **반복문**으로 전체를 읽을 수 있어요.

CIE 수도코드에서는 파일의 끝을 확인하는 **EOF()** 함수를 써요.

\`\`\`
DECLARE line : STRING
OPENFILE "scores.txt" FOR READ

WHILE NOT EOF("scores.txt")
    READFILE "scores.txt", line
    OUTPUT line
ENDWHILE

CLOSEFILE "scores.txt"
\`\`\`

**EOF**는 "End Of File"의 약자예요.
- \`EOF("scores.txt")\` → 파일 끝에 도달하면 TRUE
- \`NOT EOF("scores.txt")\` → 파일 끝이 **아니면** TRUE (계속 읽기)

이렇게 하면 파일의 모든 줄을 읽을 수 있어요!`
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '파일의 모든 내용을 읽어서 출력하는 코드를 완성하세요.',
          codeTemplate: 'DECLARE line : STRING\nOPENFILE "data.txt" FOR ___\n\nWHILE NOT EOF("data.txt")\n    READFILE "data.txt", line\n    OUTPUT line\nENDWHILE\n\n___ "data.txt"',
          fillBlanks: [
            { id: 1, answer: "READ", options: ["READ", "WRITE", "APPEND", "OPEN"] },
            { id: 2, answer: "CLOSEFILE", options: ["CLOSEFILE", "ENDFILE", "CLOSE", "STOP"] }
          ]
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `scores.txt 파일에 다음 내용이 있다고 해요:
\`\`\`
Alice
Bob
Charlie
\`\`\`

다음 수도코드의 결과는?

\`\`\`
DECLARE name : STRING
DECLARE count : INTEGER
count ← 0

OPENFILE "scores.txt" FOR READ
WHILE NOT EOF("scores.txt")
    READFILE "scores.txt", name
    count ← count + 1
ENDWHILE
CLOSEFILE "scores.txt"

OUTPUT count
\`\`\``,
          options: [
            '3',
            '0',
            'Alice',
            '에러'
          ],
          answer: 0,
          explanation: '파일에 3줄(Alice, Bob, Charlie)이 있으므로 WHILE 반복이 3번 실행되고, count는 0에서 3이 돼요!'
        }
      ]
    },
    {
      id: "ch2",
      title: "파일 쓰기와 추가",
      emoji: "✍️",
      steps: [
        {
          id: "ch2-write",
          type: "explain",
          title: "✍️ WRITEFILE - 파일에 쓰기",
          content: `**WRITEFILE**은 파일에 데이터를 **쓰는** 명령어예요.

\`\`\`
OPENFILE "output.txt" FOR WRITE
WRITEFILE "output.txt", "Hello!"
WRITEFILE "output.txt", "World!"
CLOSEFILE "output.txt"
\`\`\`

output.txt 파일 내용:
\`\`\`
Hello!
World!
\`\`\`

**주의!** WRITE 모드로 열면 **기존 내용이 모두 삭제**돼요!

예를 들어 output.txt에 이미 "Old data"가 있었다면,
WRITE 모드로 열고 쓰면 "Old data"는 **사라지고** 새 내용만 남아요.`
        },
        {
          id: "ch2-append",
          type: "explain",
          title: "➕ APPEND 모드 - 끝에 추가하기",
          content: `기존 내용을 **유지하면서** 새 데이터를 추가하고 싶다면 **APPEND** 모드를 써요.

\`\`\`
OPENFILE "log.txt" FOR APPEND
WRITEFILE "log.txt", "새로운 기록"
CLOSEFILE "log.txt"
\`\`\`

**WRITE vs APPEND 비교:**

| 모드 | 기존 내용 | 새 데이터 |
|---|---|---|
| WRITE | 삭제됨 | 처음부터 쓰기 |
| APPEND | 유지됨 | 끝에 추가 |

예시: log.txt에 "기록1", "기록2"가 있을 때

APPEND로 "기록3"을 추가하면:
\`\`\`
기록1
기록2
기록3
\`\`\`

WRITE로 "기록3"을 쓰면:
\`\`\`
기록3
\`\`\`
(기록1, 기록2가 사라져요!)`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '기존 파일 내용을 유지하면서 새 데이터를 추가하려면 어떤 모드를 써야 할까요?',
          options: [
            'APPEND',
            'WRITE',
            'READ',
            'ADD'
          ],
          answer: 0,
          explanation: '**APPEND** 모드는 기존 내용 뒤에 새 데이터를 **추가**해요. WRITE 모드는 기존 내용을 **삭제**하고 새로 쓰므로 주의해야 해요!'
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📝 실전 예제: 학생 이름 저장하기",
          content: `학생 3명의 이름을 입력받아 파일에 저장하는 프로그램이에요:

\`\`\`
DECLARE name : STRING

OPENFILE "students.txt" FOR WRITE

FOR i ← 1 TO 3
    OUTPUT "학생 이름을 입력하세요: "
    INPUT name
    WRITEFILE "students.txt", name
NEXT i

CLOSEFILE "students.txt"
OUTPUT "저장 완료!"
\`\`\`

사용자가 "Alice", "Bob", "Charlie"를 입력하면
students.txt 파일:
\`\`\`
Alice
Bob
Charlie
\`\`\`

이제 이 파일을 나중에 READ 모드로 열어서 다시 읽을 수 있어요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드를 순서대로 실행하면 result.txt의 최종 내용은?

\`\`\`
// 먼저 WRITE 모드로 쓰기
OPENFILE "result.txt" FOR WRITE
WRITEFILE "result.txt", "Line A"
CLOSEFILE "result.txt"

// 그 다음 APPEND 모드로 추가
OPENFILE "result.txt" FOR APPEND
WRITEFILE "result.txt", "Line B"
WRITEFILE "result.txt", "Line C"
CLOSEFILE "result.txt"
\`\`\``,
          options: [
            'Line A\nLine B\nLine C',
            'Line B\nLine C',
            'Line A',
            'Line C'
          ],
          answer: 0,
          explanation: '첫 번째 WRITE로 "Line A"가 쓰여요. 두 번째는 APPEND 모드이므로 기존의 "Line A"를 유지하고 "Line B", "Line C"를 **추가**해요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '기존 로그 파일에 새로운 기록을 추가하는 코드를 완성하세요.',
          codeTemplate: 'OPENFILE "log.txt" FOR ___\n___ "log.txt", "새 기록 추가"\nCLOSEFILE "log.txt"',
          fillBlanks: [
            { id: 1, answer: "APPEND", options: ["APPEND", "WRITE", "READ", "ADD"] },
            { id: 2, answer: "WRITEFILE", options: ["WRITEFILE", "READFILE", "APPENDFILE", "ADDFILE"] }
          ]
        }
      ]
    }
  ]
}
