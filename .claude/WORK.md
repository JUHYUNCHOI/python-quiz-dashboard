# 남은 일 — 살아있는 목록

> **왜 여기 있나:** 2026-09-04, 에이전트를 20번 넘게 돌렸는데 나온 제안 중
> lesson-content-reviewer 의 완성 코드 8개 · quest-auditor 패턴 4개 · 에이전트 골격 4개가
> **하나도 반영 안 됐다.** 보고가 대화창에만 남고 세션이 끝나면 사라져서다.
> project-lead 도 같은 걸 독립적으로 짚었다 — *"안 그러면 세 번째로 같은 일이 반복된다."*
>
> **규칙 — 에이전트 보고를 받으면 반영하든 안 하든 여기 항목으로 넣는다.**
> 상태만 바꾸고 지우지 마라. 끝난 건 `완료` 로 남겨야 다음에 또 안 한다.
>
> **우선순위·판단은 `project-lead` 가 정하고, 적는 건 메인 세션이 보고 즉시 한다.**
> (project-lead 는 다른 검토자들처럼 읽기 전용이라 이 파일을 직접 못 고친다.
>  '주인' 을 '직접 쓰는 사람' 으로 읽으면 안 된다 — 본인이 지적한 모순이다.)
> 결정 절차는 `.claude/skills/decide/SKILL.md`.

상태: `대기` · `진행` · `완료` · `선생님` (선생님만 가능) · `보류` (이유 필수)

**커밋 전에 돌릴 것 — 사람 기억에 안 기대는 부분:**
```bash
python3 scripts/check-frozen.py     # 건드리면 안 되는 파일을 건드렸나
```
2026-09-04 사고(별표 일괄 제거가 동결 quest `rounding` 의 정답 코드를 깸)를 소급 시험해
`rounding`·`cheese`·`mooin3` 셋 다 잡는 것을 확인했다.

---

## 학생에게 바로 닿는 것

| 무엇 | 담당 | 끝났다고 보는 기준 | 상태 |
|---|---|---|---|
| 레슨 32 ch1 — `def` 를 처음 쳐보는 `tryit` 추가 | 메인 세션 | ch1 에 능동 스텝 존재 | **완료** (32.4→34.2%) |
| 레슨 32 능동 비율 | — | — | **완료** — 잣대 수정 후 61.5% |
| **레슨 15 — 스텝이 5개뿐 (20.0%)**. 새 잣대로 유일한 45% 미만 | lesson-content-reviewer | 챕터·스텝이 다른 레슨 수준으로 | 대기 |
| 미분류 컴포넌트 13개 (`gameCrashDemo` 등) — 지금은 수동으로 셈 | lesson-content-reviewer | `ACTIVE_COMPONENTS` 나 `KNOWN_PASSIVE` 로 분류 | 대기 |
| `function-structure.tsx` 의 `onClick` 이 **0개** — parameterStructure·returnStructure 가 정지 그림 | pedagogy-reviewer(설계) → frontend-engineer | `onClick` > 0 이고 전개에 실제로 관여 | 대기 |
| 레슨32 `ch1-4`·`ch1-5` 가 거의 같은 내용 연속 | lesson-content-reviewer | 두 스텝 설명이 안 겹침 | 대기 |
| 레슨32 `ch4-5`(print vs return, 학생이 "제일 헷갈린다") 뒤에 그 헷갈림을 시험하는 연습 없음 | lesson-content-reviewer | `x = 인사(); print(x)` → None 류 문제가 ch4 에 존재 | 대기 |
| 레슨32 `ch5-3~5-6` 이 add·subtract·divide·multiply 같은 패턴 4연속 | lesson-content-reviewer | 최소 1개는 패턴이 다르거나 난이도가 오름 | 대기 |
| ⚠️ **배치 문제는 % 로 안 잡힌다** — 관람 스텝 여러 개 뒤 능동 1개 (레슨32 ch1 형) | pedagogy-reviewer | 챕터별 시각화-능동 교대 점검 방법 | 대기 |
| ⚠️ ch1 tryit 은 **채점이 약함** — def 를 안 쳐도 통과된다. 만들기만 하면 출력이 없어서(호출은 ch2) 검증할 방법이 없다. 설계상 한계 | 선생님 판단 | — | 보류 |
| 레슨 37 (28.6%) · 39 (28.6%) | 〃 | 같은 스크립트로 50%+ | 대기 |
| `/algo` 8개 토픽이 읽기 전용 — 퀴즈 67개를 지운 자리 | pedagogy-reviewer(설계) → frontend-engineer(구현) | 토픽마다 `onClick` 있는 능동 스텝 1개 이상 | 대기 |
| `chipxchg` 의 `CheckSim` 이 가짜 퀴즈 — "골라보세요" 인데 `onClick` 0개 | frontend-engineer | 옵션에 `onClick` 존재, 오답 시 되묻기 동작 | 대기 |
| `mexes` — `[결-a 첫 코드]`·`[결-b 한계]` 가 통째로 없음 | pedagogy-reviewer(설계) → frontend-engineer | 두 단계가 `chapters.jsx` 에 존재 + 빌드 통과 | 대기 |
| quest 9개에 되돌아온 별표 10곳 (되돌리며 같이 복구됨) | ux-reviewer | 코드 줄은 안 건드리고 narr 만 정리 | 대기 |

⚠️ 레슨 파일은 **Edit 만, Write 금지.** 과거 Write 로 덮어써서 선생님 작성분이 날아간 사고가 있다.

## 도구·프로세스

| 무엇 | 담당 | 끝났다고 보는 기준 | 상태 |
|---|---|---|---|
| `quest-auditor` 의 grep 패턴 4개가 전체에서 0건 — 뭘 넣어도 "이상 없음" | quest-auditor | 새 패턴으로 재실행한 로그 + 경고문 갱신 | 대기 |
| `quest_review_progress.md` 가 2026-05-09 이후 안 갱신 (4개월 갭, 내부 모순) | quest-auditor | 갱신된 표 + 모순 제거 | 대기 |
| 에이전트 4개에 `## 0. 시작 전` 골격 없음 + 영/한 섞임 | **메인 세션** (에이전트를 고치는 에이전트가 없음) | 나머지 10개와 골격 동일 | 대기 |
| `frontend-engineer.md` 가 `output: export` 라고 적음 — 2026-04-05 제거됨 | **메인 세션** | CLAUDE.md 와 모순 없음 | 대기 |

## 선생님만 하실 수 있는 것

| 무엇 | 어떻게 |
|---|---|
| `photoshoot25` USACO 재제출 | 0-based 로 바꾼 뒤 점수 확인 필요 |
| `moohunt` USACO 제출 | `quest-problems/moohunt/fast.jsx` 의 공식 풀이. 로컬 검증만 됨 |
| MCQ SQL 이 DB 에 적용됐는지 | `SELECT COUNT(*) FROM questions WHERE id BETWEEN 10766 AND 10828;` → 63 이면 적용됨 |

## 결정 — 내가 정한 것 (다르게 원하시면 말씀해주세요)

2026-09-04: 선생님께 되물은 9건 중 진짜 선생님 몫은 2건뿐이었다.
나머지는 아래처럼 정하고 진행한다. 전부 커밋이 나뉘어 있어 되돌릴 수 있다.

| 무엇 | 정한 것 | 이유 |
|---|---|---|
| `hps` 를 동결인 줄 모르고 텍스트 수정한 것 | **되돌리지 않는다** | +12/−10줄, 커스텀 시뮬 전부 무사. 반말→해요체·55자·미정의 제목 수정이라 되돌리면 오히려 나빠진다 |
| `CodeSectionView` → `CodeWalk` 이관 | **동결 아닌 것부터 한 개씩** (`reflection` 먼저) | 동결(`hps`·`checkups`·`mooin3`) 은 구조 변경이라 선생님 확인 필요 — 그 부분만 남긴다 |
| 레슨 32 ch1 tryit 의 약한 채점 | **그대로 둔다** | 호출이 ch2 라 검증할 방법이 없다. 안 하는 학생은 손해지만 다른 스텝도 같다 |
| `/algo` 8개 토픽 빈자리 | **pedagogy-reviewer 가 설계** | 내가 아니라 담당이 정할 일 |
| 능동 비율 잣대 | **`/decide` 1라운드 진행 중** | 담당 셋의 답을 받아 결정 |

## 선생님만 하실 수 있는 것 (진짜로 둘뿐)

| 무엇 | 왜 |
|---|---|
| USACO 재제출 2건 (`photoshoot25` · `moohunt/fast.jsx`) | 채점기 계정이 필요 |
| MCQ SQL 확인 `SELECT COUNT(*) FROM questions WHERE id BETWEEN 10766 AND 10828;` | Supabase 권한이 필요 |
| (그 밖) 동결 quest 를 **구조 변경**해야 할 때 | 규칙이 "명시적 요청 전엔 읽기 전용" |

## 완료 (2026-09-04)

- algo MiniQuiz 67개 제거 + 진행 잠금 해제 · 별표 393곳 (quest 9개는 코드 깨져서 되돌림)
- quest 3차 검토 반영 (mooin2 조사 버그 · printseq · buymilk · cowsplits · mexes 스포일러)
- `check-outputs` 14개 실패 → 0 · quest 177개 C++ 컴파일 검증
- CLAUDE.md 778 → 218줄 + `.claude/docs/` · 피드백 기억 3층 구조

---

## 2026-09-05 `/decide` 3라운드 — 빈칸 없는 `tryit` 88개를 어떻게 할 것인가

참여: lesson-content-reviewer · pedagogy-reviewer · python-qa · student-python → project-lead 종합

### 갈렸다가 합의된 것
- **짧은(≤25줄) 데모는 `explain` 으로 내리지 않는다.** pedagogy-reviewer 가 2라운드에서
  철회했다 — `render-content.tsx:452-472` 를 읽고 나서, explain 의 코드블록엔
  **실행기가 없다**는 걸 확인했기 때문. 학생이 "짧은 건 다 읽었고 좋았다" 고 한
  유일한 능동 지점이 사라진다.
- **"뒤 미션이 커버한다" 논리는 폐기.** lesson-content-reviewer 가 2라운드에서 철회 —
  자기 근거가 "학생이 스스로 찾아낸다" 가 아니라 "hint2 가 답을 알려준다" 였다고 인정.
- **`hint2: "코드를 그대로 실행하세요!"` 42개** = 작성자 스스로 "연습 아님" 선언.
  둘이 독립적으로 같은 신호를 찾았고, 그 42개가 전부 빈칸 없는 tryit 이다.

### 아직 갈려 있는 것 (숨기지 않는다)
- 26줄 이상 데모의 처방. lesson-content-reviewer = **분할**, pedagogy-reviewer = **explain 재분류**.
  project-lead 판단: hint2 를 고치기 전엔 이 논쟁의 실익이 작으니 **뒤로 미룬다.**

### 잣대의 한계 (셋 다 동의)
비율은 레슨 평균이라 **챕터 단위 공백을 가린다.**
채점 스텝이 0개인 챕터 12개 (메인 세션 전수 측정):
`lesson33/ch1` `lesson33/ch7` `lesson37/ch1` `lesson38/ch1` `lesson39/ch1` `lesson40/ch4`
`lesson41/ch1` `lesson42/ch2` `lesson46/ch1` `lesson47/ch1` `lesson49/ch1` `lesson52/ch3`
그중 **퀴즈조차 없는 것 둘**: `lesson33/ch7` · `lesson42/ch2`
(pedagogy-reviewer 는 42~52 만 봐서 5개를 찾았다. 전수로 재니 12개다.)

### 실행 순서 — **2026-09-06 시점 상태**

| | 무엇 | 상태 | 끝났다고 보는 기준 |
|---|---|---|---|
| 1 | **hint2 잠금** — 시도 1회 후 열리게 | ✅ `6e976b8c` `c1f1b3fc` | 시도 0회엔 정답 전문이 안 보이고 1회 실패 후 열린다. ⚠️ 처음엔 `BlankCodeRunner` 에만 걸려 있었다 — 빈칸 없는 스텝은 `PythonRunner` + `tryit-step.tsx` 가 힌트를 밖에서 그려서 무방비였다. pedagogy 가 찾아 `c1f1b3fc` 로 메움. 라이브 확인 완료 |
| 2 | **진짜 버그 9개** — "✋손으로 처음부터" 인데 실행하면 빈 출력 | ✅ `616924e1` | 8곳 `mission` 승격(ko/en 16). 빈 코드가 이제 막힌다. **레슨1 `try-empty-print` 는 못 고침 → 아래 보류** |
| 3 | **채점 0개 챕터 12개** | ✅ `dd59d05b` `e747b645` `e0ef198f` | **12 → 5.** 고친 곳: 33/ch7 · 40/ch4 · 42/ch2 · 49/ch1 · 52/ch3 · 47/ch1. 안 고친 5개는 아래 |
| 4 | 나머지 ~79개 재분류 | ⬜ 대기 | 26줄+ 처방은 두 리뷰어 재조율 필요 |
| 5 | **안 가르치고 쓰는 문법** — 한 줄 if, 리스트 컴프리헨션, "함수를 값으로 저장했다 호출" | ⬜ 대기 | 별도 항목. 88개를 다 고쳐도 이 구멍은 안 메워진다 |

### ⚠️ 2번이 왜 1순위가 아니었나
개수(레슨50:7개…)로 우선순위를 매긴 내 방식이 틀렸다. lesson51 은 6개인데 진짜 공백이
**0개**고, lesson42 는 6개인데 4개 + 챕터 통짜 공백이다. **개수는 잣대가 아니다.**

### 확인 못 한 것
- `attempts >= 1` 이 실제로 베끼는 비율을 얼마나 줄이는지 — 코드 논리로만 판단했다
- 42개(자기선언) 와 pedagogy 의 56개(42~52 범위) 의 정확한 diff
- `lesson1.ts try-empty-print` 는 `mission` 으로 바꿔도 안 잡힌다 —
  `python-runner.tsx` 의 `normalize` 가 개행을 스페이스로 뭉갠다 (pedagogy 발견, 미수정)

---

## 2026-09-06 — 채점 0개 챕터 · "손으로 처음부터" 승격

전원 검토(lesson-content-reviewer ×2 · pedagogy · student · python-qa · project-lead).

### 안 고치기로 한 것 — **다시 하지 마라**
채점 스텝이 0개지만 **그대로 두는 게 맞다**고 판정된 챕터 5개:
`lesson37/ch1` `lesson38/ch1` `lesson39/ch1` `lesson41/ch1` `lesson46/ch1`

전부 "왜 필요한가" 동기부여 챕터고, 같은 레슨 **바로 다음 챕터**에서 그 개념이 채점된다.
student-python 이 **ch1 을 건너뛰고 ch2 를 푸는 실험**을 했는데 넷 다 안 막혔다.
> "ch1 을 봐도 안 봐도 별 차이가 없어서 좀 허무했어."

판정 기준 (pedagogy):
> **채점 스텝이 없는 챕터는, 그 개념이 같은 레슨 안 다른 곳에서 곧 채점되면 괜찮고,
> 그 챕터 자신이 새 패턴을 가르치는 유일한 자리인데도 학생이 한 글자도 안 쳐보면 문제다.**

### ✅ 해결 — 레슨1 `try-empty-print` (2026-09-06, `커밋 아래`)
"빈 줄 만들기" 미션. `normalize` 가 모든 공백을 하나로 뭉쳐서 채점이 불가능했다.

**"고치면 82곳이 깨진다" 는 내 추정이 틀렸다.** 그 숫자는 급조한 추출기에서 나왔고,
TS 템플릿 이스케이프를 잘못 다뤄 9 → 95 → 126 으로 흔들리던 그 도구다.
TypeScript 컴파일러 API(AST)로 다시 재니 —
  ko/en 245파일 · 스텝 4128개 → **정답 코드 598개를 실제 실행** (stdin 포함)
  → 새 normalize 로 새로 오답이 되는 것 **2개뿐**, 그 둘이 고치려던 그 스텝이었다.

바꾼 방식 (`python-runner.tsx` · `blank-code-runner.tsx`):
```
s.replace(/\r\n/g,"\n").trim().toLowerCase()
 .split("\n").map(l => l.replace(/[ \t]+/g," ").trim()).join("\n")
```
줄 구조는 보존하고 **줄 안의 공백만** 뭉친다. 들여쓰기·정렬 차이로는 안 막힌다.
`try-empty-print` 를 `mission` 으로 승격(ko/en). 로컬·라이브 양쪽 화면 확인 완료.

> 📌 **교훈:** 블라스트 반경을 추정으로 말하지 마라. 급조한 파서로 센 숫자를
> 근거로 대면 그 숫자가 판단을 막는다. 이 건은 "82곳이 깨진다" 는 잘못된 추정
> 하나 때문에 하루를 미뤄뒀다. AST 로 재는 데 10분 걸렸다.

### 🚨 검사기의 사각지대 — 알고 써라
- `scripts/check-lesson-outputs.py:277` 은 **"처음부터 쓰기" 스텝을 검사에서 제외**한다
  (본문이 주석뿐이거나 `print` 가 없으면 skip). 그리고 **`hint2` 는 아예 안 본다.**
  → "N개 실행, 문제 0개" 를 근거로 쓰기 전에 **그 검사기가 무엇을 빼는지 먼저 읽어라.**
  2026-09-06 에 이걸 근거로 댔다가 python-qa 가 "그 8곳은 애초에 안 돌았다" 고 잡았다.
- `scripts/check-active-ratio.py` 는 **네 번 고쳤고 네 번 다 틀렸다.**
  (interactive 통짜 → 빈칸 없는 tryit → 컴포넌트 29개 분류 → typeAlong 빠뜨림)
  **1차 스크리닝으로만 써라. "숫자가 기준 통과 = 안전" 으로 절대 쓰지 마라.**

### 🚨 배포 전 절차 (project-lead 판정, 2026-09-06)
1. **"타입체크 통과 + 코드 읽기" 를 승인 근거로 쓰지 마라.**
   컴포넌트(런타임 로직)를 바꿨으면 **최소 한 케이스를 브라우저에서 클릭까지** 해봐야 한다.
   `playwright` 가 이미 `package.json` 에 있다 — "창이 안 열려서 못 했다" 는 핑계가 안 된다.
2. 자동 검사 결과를 근거로 쓸 땐 **그 스크립트가 무엇을 제외하는지 먼저 읽는다.**
3. 컴포넌트 변경은 **영향받는 카테고리마다 대표 1개씩** 화면 확인
   (빈칸 있음/없음 × tryit/mission).

### 갈린 지점 (숨기지 않는다)
- `lesson19 try-star` — pedagogy: "explain 뒤 빈칸 없이 바로 mission 이니 낮춰라".
  student: 한 번에 풀었고 "딱 적당했다". **mission 유지.** 학생이 실제로 막히면 그때 낮춘다.
  (같은 날 레슨47 에서도 파일 구조로 추론한 쪽보다 직접 부딪힌 쪽이 맞았다)
- `lesson46/ch1` `lesson47/ch1` — 두 검토자가 갈렸고 pedagogy 손을 들었다.
  단 **47 은 학생이 실제로 막혀서 결국 추가**했다(중첩 대괄호). 46 은 그대로.

### 다음
| | 무엇 | 근거 |
|---|---|---|
| 1 | 빈칸 없는 `tryit` ~79개 재분류 | 09-05 표 4번. 26줄+ 처방은 두 리뷰어 재조율 필요 |
| 2 | 안 가르치고 쓰는 문법 (한 줄 if · 리스트 컴프리헨션 · "함수를 값으로 저장했다 호출") | 09-05 표 5번 |
| 3 | `check-lesson-outputs.py` 에 **hint2 검사 추가** | 지금은 hint2 를 아예 안 본다. 2026-09-06 에 lesson6-en 의 "정답인데 오답" 버그를 이것 때문에 놓쳤다 |
