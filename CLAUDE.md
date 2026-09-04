# CLAUDE.md — 코드린 프로젝트 컨텍스트

## 📂 어디에 뭐가 있나 — 작업 전에 여기부터

이 파일에는 **매번 필요한 것만** 둔다. 나머지는 아래 파일을 **그때 열어라.**
(2026-09-04: CLAUDE.md 가 720줄이었고 그중 568줄은 그날 안 쓰는 내용이었다.
안 쓰니 틀려도 안 걸렸다 — `output: export` 가 5개월간 틀린 채 있었다.)

| 무슨 일을 하나 | 열 파일 |
|---|---|
| 퀴즈 문제 · **레슨 번호 확인** (Python 1~52, C++ cpp-*) | `.claude/docs/quiz-system.md` |
| 복습 파일(`app/review/**/lesson*.ts`) 작성 | `.claude/docs/review-format.md` |
| 레슨 새로 쓰기 · 품질 감사 | `.claude/docs/lesson-quality.md` |
| 화면 만들기 · 데이터 위치 찾기 | `.claude/docs/learning-modes.md` |
| DB · 진도 저장 | `.claude/docs/supabase.md` |
| **지금 어디까지 왔나 · 다음 뭘 하나** | **`project-lead` 에이전트를 부른다** (근거는 아래 두 파일) |
| 남은 일 목록 | `~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/next_work_2026-09-04.md` |
| 우선순위 정하기 | `.claude/docs/roadmap.md` |

> ⚠️ **로드맵을 안 열어도 이것만은 알아라 (2026-09-04 코드로 확인):**
> 코딩 뱅크(`/coding-bank`) · Algorithm Lab(`/algo`, 토픽 23개) · CodeQuest(`/quest`, 문제 180개) ·
> 통합 지도(`/journey`) 는 **이미 다 만들어져 라이브다.** 2026-04 에 끝났다.
> 잠금도 전부 풀려 있다 (`app/algo/page.tsx:20` "잠금은 두지 않는다").
> 옛 문서가 "미구현 — 다음 주요 작업" 이라고 하던 것들이다. **또 만들지 마라.**
| 선생님이 전에 하신 말 찾기 | `~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/MEMORY.md` |

역할별로 아는 것은 `.claude/agents/<이름>.md` 안에 있다. 그 에이전트를 부르면 같이 읽힌다.

⚠️ **목차가 낡으면 본문이 틀린 것보다 나쁘다** — 없는 걸 열게 되니까.
파일을 옮기거나 지웠으면 이 표를 같이 고쳐라. 기계로 확인하려면:

```bash
python3 scripts/check-docs.py
```

## 🧠 선생님 피드백은 반드시 남긴다 (제일 자주 놓치는 것)

**고치고 끝내지 마라. 고치는 건 이번 한 번이고, 기억은 다음 백 번이다.**

아래가 나오면 = 피드백이다. 파일만 고치고 넘어가면 다음 세션에 같은 실수를 한다.

- "이거 어려워" / "무슨 말인지 모르겠어" / "왜 이렇게 했어"
- "하지 마" / "앞으로는 이렇게" / "매번 기억해"
- **선생님이 같은 지적을 두 번 하실 때** ← 이건 이미 한 번 놓친 것이다
- 내가 만든 것을 선생님이 직접 되돌리거나 다시 쓰실 때

그러면 **`/remember-feedback` 스킬을 돌려라.** 절차가 그 안에 다 있다
(메모리 파일 → `MEMORY.md` 색인 → **담당 에이전트에 배포** → 커밋).

가장 많이 빠뜨리는 건 **담당 에이전트에 배포하는 단계**다.
메모리에만 적으면 서브에이전트 14명은 아무도 모른다. 각자 자기 `.md` 만 읽는다.

> 왜 이 규칙이 생겼나 — 2026-09-04, "용어를 지어내지 마라" 는 지적을 받고
> 파일만 고칠 뻔했다. 선생님이 *"지금 내가 말하는 피드백을 누가 기억해야 하는거지?"*
> 라고 물어보셔서 겨우 남았다. **선생님이 물어봐야 남는 구조는 고장난 구조다.**

---

## 🚀 병렬 작업 — 기본 규칙 (사용자 명시 요청)

**여러 파일에 같은 작업이 반복될 때 = 자동으로 서브에이전트 병렬 호출.** 사용자가 매번 "에이전트 N 개 돌려" 요청 안 하게.

한 메시지에 여러 Agent tool 호출 = 동시 실행. 적극 활용.

`.claude/agents/` 에 **14 개** 커스텀 에이전트가 있다 (`ls .claude/agents/` 로 항상 실물 확인).

**검토하는 사람**
- **ux-reviewer** — 화면이 아이들에게 전달되나 (겹침·정보량·용어·한글 줄바꿈). 5+ 동시
- **pedagogy-reviewer** — 스캐폴딩·순서·빠진 다리. 5+ 동시
- **quest-auditor** — quest 정직성 (가짜 수치·과장). 5-10 동시
- **lesson-content-reviewer** — 레슨 능동비율·주제 충실도. 5+ 동시
- **python-qa** / **cpp-qa** — 코드가 진짜 도는지 실행해서 확인. 5+ 동시
- **project-lead** — 전체 현황·우선순위·모순 찾기

**만드는 사람**
- **frontend-engineer** — 화면·컴포넌트·상태·빌드
- **backend-engineer** — Supabase·API·배포 파이프라인
- **algo-chapter-builder** — algo 토픽 → React 챕터식 (1 토픽당 1 명, 2-3 병렬)
- **ui-pattern-applier** — 확립된 패턴을 여러 파일에 적용 (N 병렬)

**학생 (검토자가 아니라 학생으로 행동)**
- **student-python** / **student-cpp** / **student-algorithm** — 초6 이 직접 따라가며 막히는 곳을 잰다
  ⚠️ 이 셋에게는 품질 기준 문서를 읽히지 마라. 규칙을 알면 학생이 아니게 된다.

**역할이 겹칠 때:** 능동비율·주제 충실도만 = `lesson-content-reviewer`,
서사 흐름·빠진 다리까지 = `pedagogy-reviewer`.

**자동 병렬화 트리거:**
- "47 quest 다 검토" → quest-auditor × 8-10 병렬
- "다른 algo 토픽도 챕터식으로" → algo-chapter-builder × 2-3 병렬
- "Python 레슨 다 감사" → lesson-content-reviewer × 5 병렬
- "이 패턴 다른 페이지에도 적용" → ui-pattern-applier × N 병렬
- "화면들 UX 다 검토" → ux-reviewer × N 병렬
- "이 레슨들 순서가 이상해" → pedagogy-reviewer × N 병렬
- "코드가 진짜 도는지 확인" → python-qa / cpp-qa × N 병렬
- "학생 입장에서 봐줘" → student-* (해당 과목)
- 일반: 5+ 동등한 파일 작업 = 병렬 검토

**병렬 안 해도 되는 것 (혼자 처리):**
- 단일 파일 작업
- 사용자 피드백 반영 (UX 결정 — 깊은 컨텍스트 필요)
- 디자인 결정 / 톤 조정

## 기술 스택
- Next.js 16 (App Router, Turbopack)
- TypeScript, Tailwind CSS
- Supabase (인증, DB)
- **정적 export 아님** (2026-04-05 `8c794fbf` 에서 `output: export` 제거).
  지금은 일반 Next.js 서버 배포 — `middleware.ts` 와 `app/api/**` 서버 라우트가 돈다.
  동적 라우트(`[problemId]` · `[lessonId]` · `[id]`)를 정상적으로 쓴다.
  ⚠️ 옛 문서가 "query params 로 우회하라" 고 하던 제약은 **더 이상 없다.**

## ⚠️ 핵심 제약사항 — 기존 학생 데이터 보호

**실제 학생들이 이미 학습 중인 프로덕션 서비스다. 모든 변경은 기존 진도 데이터에 영향을 주면 안 된다.**

### 절대 하면 안 되는 것
- `lesson_id` 값 변경 — Supabase `lesson_progress` 테이블에 저장된 키값이므로 바꾸면 기존 진도가 사라짐
- `question.id` 변경 — `question-mastery` localStorage/DB에 저장된 키값
- localStorage 키 이름 변경 — 아래는 **실제로 학생 진도가 들어 있는** 키다 (2026-09-04 grep 실측):
  `completedLessons` `completedQuizzes` `question-mastery` `quiz-history` `quiz-scores`
  `wrong-question-bank-v1` `practice-solved` `quest-solved` `ladder-done` `ladder-starred`
  `kl-prep-done` `daily-challenges-all-done` `blank-runner-*`
  `gamification-total-xp` `gamification-daily-streak` `gamification-sessions-today`
  (전체 34개가 쓰이는 중. 새 키를 지우거나 이름 바꾸기 전에 반드시 grep 먼저)
- Supabase 테이블 컬럼 삭제/이름 변경 (마이그레이션 없이)
- 커리큘럼 레슨 순서 변경 — 잠금 해제 로직이 순서 기반이므로 기존 학생의 unlock 상태가 달라짐

### 변경 시 반드시 확인할 것
- 레슨 내용(텍스트/코드 예시) 수정 → OK, lesson_id만 유지하면 됨
- 새 레슨 추가 → OK, 기존 ID와 겹치지 않게
- UI/컴포넌트 변경 → OK, 데이터 구조에 영향 없으면
- DB 스키마 변경 → 반드시 하위 호환 마이그레이션 작성 후 진행
- variant=null 같은 레거시 데이터가 DB에 존재할 수 있음 — 쿼리 작성 시 null/'' 모두 고려

### 🔒 보호된 lesson_id 목록 (절대 변경/삭제 금지)

**Python** (숫자형 ID):
`1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52`

**C++** (문자열형 ID):
`cpp-1 cpp-2 cpp-3 cpp-4 cpp-5 cpp-6 cpp-7 cpp-8 cpp-p1`
`cpp-9 cpp-10 cpp-11 cpp-12 cpp-13 cpp-14 cpp-p2`
`cpp-15 cpp-16 cpp-17 cpp-18 cpp-19 cpp-20 cpp-p3`
`cpp-21 cpp-22 cpp-23 cpp-24 cpp-25 cpp-26`

**Pseudocode/IGCSE** (문자열형 ID):
`pseudo-1 pseudo-2 pseudo-3 pseudo-4 pseudo-5 pseudo-6 pseudo-7 pseudo-8 pseudo-28 pseudo-p1`
`pseudo-9 pseudo-10 pseudo-11 pseudo-12 pseudo-13 pseudo-14 pseudo-p2`
`pseudo-15 pseudo-16 pseudo-17 pseudo-18 pseudo-19 pseudo-20 pseudo-p3`
`pseudo-21 pseudo-22 pseudo-23`
`pseudo-24 pseudo-25 pseudo-26 pseudo-27`
`igcse-sql1 igcse-sql2 igcse-logic1`

> 새 레슨 추가 시: Python은 53부터, **C++은 cpp-27부터**, Pseudocode는 pseudo-29부터 사용
> (cpp-23~26 은 이미 커리큘럼에 등록돼 학생이 쓰는 중 — 2026-09-04 확인)
> (cpp-21 = 2차원 배열, cpp-22 = 클래스 — 이미 사용 중. 커리큘럼 순서는 ID 순서와 다를 수 있음: cpp-9 → cpp-21 → cpp-10 순으로 표시)

## ⚠️ 레슨 파일 수정 규칙 — 반드시 준수

**레슨 콘텐츠 파일은 선생님이 직접 작성/디버깅한 내용이 들어있다. Write(전체 덮어쓰기)를 사용하면 해당 내용이 영구 손실된다.**

### 절대 규칙
- `data/cpp/lesson*.ts`, `data/cpp/lessonP*.ts` — **Edit만 사용, Write 금지**
- `data/lesson*.ts`, `data/lesson*-en.ts` — **Edit만 사용, Write 금지**
- `data/cpp/lesson*-en.ts` — **Edit만 사용, Write 금지**
- 예외: 새 파일 생성(기존 파일 없음)은 Write 가능

### ✅ 선생님 검토 완료된 복습 파일 (수정 시 더욱 조심)

아래 파일들은 선생님이 복습 흐름/난이도/한영 동기화를 직접 검토 완료했어요.
구조(스텝 순서, interleaving 위치, context/starterCode 구성 등)를 건드리는 건 절대 조심.
사소한 수정도 파일 상단 주석(`✅ 선생님 검토 완료`)을 먼저 확인하고 진행.

- `app/review/[lessonId]/data/lessons/lessonCpp14.ts` — cpp-14 struct 복습 (검토일: 2026-04-21)

### 왜 중요한가
- 과거에 lesson15.ts에서 sort 챕터를 lesson23으로 이동할 때 Write로 통째로 덮어써서 pair 비교/애니메이션 스텝 등 선생님이 작성한 콘텐츠가 손실됨
- 선생님이 A 작업을 요청했는데 Claude가 "관련된 B 파일도 정리하자"고 판단해서 Write를 쓰면 B에서 손실 발생
- **요청하지 않은 파일은 건드리지 않는다**

---

## 🔒 USACO 검증된 Quest 파일 — **수정 금지** (LOCK)

`quest-problems/<id>/components.jsx` 상단에 `// 🔒 USACO_VERIFIED` 주석이 있는 파일들은 **실제 USACO 채점기 제출로 결과 검증 완료된 코드** 입니다.

### 절대 규칙
- 헤더에 `USACO_VERIFIED` 있는 파일의 **`SOLUTION_CODE`, `*_CPP`, `*_PY` 변수는 절대 자동 수정 금지**
- 알고리즘 변경, 변수명 정리, 스타일 통일 등 "개선" 시도 모두 ❌
- 선생님이 명시적으로 "이 quest 코드 수정해줘" 요청한 경우에만 가능 — 그 후 **USACO 재제출 필수**
- 수정했으면 헤더 주석도 새 검증 결과로 업데이트할 것 (또는 선생님이 검증 후 업데이트)

### 검증 결과 확인
- `USACO_VERIFICATION.md` 에 전체 47 quest 결과 표 (만점/부분/WA)
- 알려진 버그 (WA, 컴파일 에러, 오버플로우) 도 동일 — 손대지 말고 선생님과 상의

### 새 quest 추가 / 미검증 quest 수정
- 헤더 없는 quest 파일은 자유 수정 가능
- 단, 수정 후 USACO 제출로 검증한 결과를 헤더에 추가하고 `USACO_VERIFICATION.md` 갱신

### 왜 중요한가
- 채점기 통과한 코드를 "더 깔끔하게" 수정하면 알고리즘 깨질 위험 큼
- 선생님이 검증된 코드라고 신뢰하고 학생에게 전달 중인 상태
- 무심코 한 수정이 USACO 점수 떨어뜨리는 회귀 (regression) 일으킴

---

## 배포

> 🚫 **배포·main 머지는 선생님이 명시적으로 지시할 때만 한다.** 기본은 dev 커밋까지다.
> 2026-05-14 · 05-15 두 번 지시받은 규칙인데 지금까지 memory 에만 있어서,
> CLAUDE.md 만 읽는 에이전트는 몰랐다. 근거: `memory/feedback_deployment.md`,
> `memory/feedback_no_more_deploy.md`
> ⚠️ 라이브는 Vercel 프로젝트 `coderin` 인데 이 디렉터리 `.vercel` 링크는 다른 곳을 가리킨다.
> 그냥 배포하면 라이브가 안 바뀐다. 정확한 명령은 `memory/infra_vercel_coderin_deploy.md`.

- Vercel (정적 빌드)
- `npm run build` = `next build`
- `/parent?t=TOKEN` 처럼 query params 를 쓰는 곳이 있지만, 정적 export 제약 때문이 아니라 그냥 그 화면의 설계다
