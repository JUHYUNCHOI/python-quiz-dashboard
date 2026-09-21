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
| **지금 어디까지 왔나 · 다음 뭘 하나** | **`.claude/WORK.md`** — 살아있는 작업 목록. 주인은 `project-lead` |
| 되돌리기 어려운 결정 (배포·삭제·구조 변경) | **`/decide` 스킬** — 한 사람이 판정하지 않는다 |
| 남은 일 목록 | `~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/next_work_2026-09-04.md` |
| 우선순위 정하기 | `.claude/docs/roadmap.md` |
| **왜 이걸 만드나 · 무엇을 향해 가나** | **`~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/learning_tracks.md`** — 3트랙·5단계 기획 의도. 선생님(2026-05-27) *"기획의도를 기억하게 해줘."* **큰 결정 전에 여기부터** |

> ⚠️ **로드맵을 안 열어도 이것만은 알아라 (2026-09-04 코드로 확인):**
> 코딩 뱅크(`/coding-bank`) · Algorithm Lab(`/algo`, 토픽 23개) · CodeQuest(`/quest`, 문제 180개) ·
> 통합 지도(`/journey`) 는 **이미 다 만들어져 라이브다.** 2026-04 에 끝났다.
> 잠금도 전부 풀려 있다 (`app/algo/page.tsx:20` "잠금은 두지 않는다").
> 옛 문서가 "미구현 — 다음 주요 작업" 이라고 하던 것들이다. **또 만들지 마라.**
| 선생님이 전에 하신 말 찾기 | `~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/MEMORY.md` |

역할별로 아는 것은 `.claude/agents/<이름>.md` 안에 있다. 그 에이전트를 부르면 같이 읽힌다.

> 📌 **2026-09-07 에 이 줄이 생긴 이유:** 기획 의도 문서는 5월부터 있었고
> `project-lead` 에게만 읽으라고 적혀 있었다. 그런데 목차에 없어서 **메인 세션이
> 한 번도 안 열었다.** 그날 에이전트를 20번 넘게 돌리는 동안 아무도 "이 일이
> 우리 목표의 어디에 닿나" 를 묻지 않았다. 선생님: *"우리의 목표를 잊어버리지 말고
> 중심을 잡을 필요가 있어."* — 주인이 없어서가 아니라 **질문이 없어서** 잊혔다.

⚠️ **목차가 낡으면 본문이 틀린 것보다 나쁘다** — 없는 걸 열게 되니까.
파일을 옮기거나 지웠으면 이 표를 같이 고쳐라. 기계로 확인하려면:

```bash
python3 scripts/check-docs.py           # 목차가 가리키는 파일이 실제로 있나
python3 scripts/check-frozen.py         # 건드리면 안 되는 파일을 건드렸나 (커밋 전)
python3 scripts/check-concept-order.py  # 안 가르친 문법을 쓰고 있나
python3 scripts/check-quest-lang.py     # quest 영어 자리에 한국어가 들어갔나
python3 scripts/check-quest-algo-level.py  # Bronze 문제를 '심화' 토픽으로 보내나
python3 scripts/count-quests.py         # ⭐ quest 개수는 **손으로 세지 마라** (--list 로 이름까지)
python3 scripts/check-quiz-spoiler.py   # 퀴즈 내레이션이 정답을 미리 말하나 (판정 아님 — 볼 자리 표시)
python3 scripts/check-bilingual-drift.py   # t(E, 영어, 한국어) 중 **한쪽만 고친** 자리 (빌드도 못 잡는다)
python3 scripts/check-io-card-spoiler.py   # 입출력 형식 카드가 답까지 말하나 (재현율 50%·정밀도 20% — 사람 대신 못 씀)
python3 scripts/count-quests.py --list untaught  # 안 가르친 개념(비트·2차원리스트·조합론…)을 전제하는 quest
python3 scripts/check-quest-difficulty.py  # 난이도가 **누가 매긴 값인지** (--list 로 "기본값이 새어나온" 것)
                                           #   ⚠️ 유추값이 많은 건 문제가 아니다. 문제는 **안 매긴 값이
                                           #   매긴 값처럼 보이는** 것이다 (2026-09-13 선생님 "이 문제가 진짜 레벨3인가?")
python3 scripts/check-quest-code-idiom.py  # 안 가르친 **손버릇**(stdin.buffer·bytearray·bits/stdc++.h)을 쓰는 quest
python3 scripts/prove-same-program.py 옛.py 새.py   # 줄만 폈나, 뜻이 바뀌었나를 **증명**한다
                                           #   파이썬은 AST, C++ 은 어셈블리로 대조. 🔒 코드를 펼 때 쓴다.
                                           #   ⚠️ 이 증명은 **CodeWalk `hi` 말풍선 번호는 못 본다** — 화면으로 따로 봐라.
python3 scripts/check-code-one-statement.py  # 한 줄에 문장이 여러 개인 코드 (선생님이 "읽기 싫다" 하신 것)
                                           #   ⚠️ 2026-09-08·09-15 **두 번** 지적받았다. 두 번째가 나온 건
                                           #   기억을 안 해서가 아니라 **검사 항목이 아니어서**다. 실측 778줄·quest 144개.
                                           #   ⚠️ 위 --list untaught 와 **다른 층**이다. 그건 알고리즘 개념,
                                           #   이건 같은 알고리즘인데 코드를 어떻게 짰나. 합치지 마라.
```

## 🚪 quest 를 선생님께 보이기 전에 — **반드시 거치는 문** (2026-09-17)

선생님: *"없으면 agent를 만들던가 해야지 **매번 이래.**"*

**맞는 말이다.** 지금까지 구조가 **반응형**이었다 — 선생님이 화면에서 찾으시면
그 결함 모양 하나를 잡는 검사기를 만들었다. 그러니 **다음 결함은 또 선생님이 먼저 찾으신다.**
사흘 동안 선생님이 화면을 보신 건 **세 번**인데 **세 번 다 문제를 찾으셨다.**

**PM 판정(2026-09-17): 사람을 늘리는 게 답이 아니다.** 담당자를 16번째, 17번째로 늘려도
"누구 몫이냐" 는 질문은 또 나온다. 필요한 건 **보여드리기 전에 거치는 문**이다.

```bash
node scripts/see-flow.mjs http://localhost:3000/quest/<id>   # 쪽과 쪽 사이
python3 scripts/check-word-difficulty.py <id>                # 어려운 말 · 같은 것 다른 이름 · 번역 티
python3 scripts/check-code-one-statement.py <id>             # 한 줄에 문장 여러 개
python3 scripts/check-undefined-symbol.py <id>               # 뜻 안 밝힌 기호 (10⁹ · N² · ⌈⌉ · Σ · O(N))
python3 scripts/check-stepper-first-step.py <id>             # 코드 스테퍼 **첫 걸음**이 화면 밖 이름을 쓰나
python3 scripts/check-code-names-in-prose.py <id>            # 코드 보기 전에 코드 이름이 나오나 (deal_price…)
python3 scripts/check-codewalk-thinking-order.py <id>        # 코드 설명이 파일 순서를 읊나, 생각의 순서로 이끄나
python3 scripts/check-linebreak-rendered.py                  # 글쓴이가 넣은 줄바꿈이 화면에 실제로 나오나
node scripts/check-emphasis.mjs http://localhost:3000/quest/<id>  # 강조가 **보이나** (다 굵으면 강조가 아니다)
node scripts/see-screen.mjs http://localhost:3000/quest/<id> # 가려짐 · 55자 초과
```

> 🆕 **`check-undefined-symbol.py` 가 2026-09-17 에 생긴 이유:** MCC 12개를 훑었더니
> **12개 중 11개**가 같은 구멍이었다 — `10⁹ · 2^R · N² · ⌈L/2⌉ · Σ · ∞ · ≯` 가
> 뜻을 밝힌 적 없이 시뮬 표에 박혀 있었다. 그런데 `check-word-difficulty` 는
> **12개 전부 0건**이었다. 기호는 한글도 아니고 어려운 낱말도 아니라서
> **어느 그물에도 안 걸렸다.** 선생님이 매번 먼저 찾으신 이유가 이것이다.
> 🆕 **`check-codewalk-thinking-order.py` 가 2026-09-18 에 생긴 이유:** 선생님이 코드 쪽을 보시고
> *"코드 설명을 생각의 순서대로 설명해줘"*. 첫 말풍선이 **"필요한 헤더를 적고, N 과 K 를 읽어요"**
> 였다 — 생각이 0 이다. 학생은 코드를 끝까지 보고도 **왜 그렇게 짰는지**는 모른 채 나간다.
> ⚠️ 이건 **2026-07-14 에 이미 받은 규칙**이다(`feedback_quest_code_codewalk.md` — "생각 순서").
>   규칙은 있었는데 **검사 항목이 아니어서** 새로 쓴 말풍선이 매번 파일 순서로 돌아갔다.
>   실측 walk 61개 중 **46개 · quest 21개**가 그랬다. 그날 전부 0 으로 만들었다.
>   말풍선은 **지금 마주한 질문**으로 열어라 — "무엇을 내놓아야 하나요?" · "이건 왜 필요할까요?"

> 🆕 **2026-09-18, 선생님이 `buymilk` 한 quest 에서 여섯 번 막히셨다.** 마지막에 잣대를
> 한 줄로 주셨다 — **"그냥 자연스러운 말. 한국말. 쉽게"**. 그날 나온 원인 아홉 가지와
> 고친 예는 `memory/feedback_plain_korean.md` 에 있다. **학생용 글을 쓰면 그걸 먼저 읽어라.**
> 기계가 잡는 건 둘뿐이다 — 코드 이름이 먼저 나오나(`check-code-names-in-prose.py`),
> 강조가 보이나(`check-emphasis.mjs`). 나머지 일곱은 **화면을 열어 차갑게 읽어야** 잡힌다.
> ⚠️ 제일 큰 것: **지어낸 말로 설명하지 마라. 그 화면의 숫자로 말해라.**
>   `적힌 값`·`진짜 값` 같은 말을 만들면 그 말부터 설명해야 한다.

> 🆕 **`check-stepper-first-step.py` 가 2026-09-17 에 생긴 이유:** MCC 마무리로
> `mcc21simplemath` 에 브루트 코드 쪽을 새로 만들었는데, **첫 걸음이 `for x in a:` 로 시작했다.**
> `a` 도 `P` 도 `MOD` 도 그 화면에 없었다 — `ProgressiveCodeStepper` 는 **그 걸음의 코드만**
> 보여준다. 파일에서 읽으면 네 조각이 이어져 보여서 **내 눈에는 안 보였다.**
> project-lead 가 브라우저로 걸음을 하나씩 눌러 보고 잡았다.
> **구멍을 하나 메우면서 다른 구멍을 판 것**이다 — `feedback_new_text_needs_a_reader.md`.
> 저장소 전체 159개 스테퍼를 본다. 걸음 번호가 0 부터 시작하는 라벨도 같이 센다
> (점은 1 부터 매긴다).

> ⚠️ 이 검사기는 **영어 쪽도 같이 본다** — 실제로 훑기 담당이 한국어만 고치고
> 영어에 `⌈L/2⌉` 를 그대로 둔 자리를 9곳 잡았다.

⚠️ **검사기 넷을 돌린 뒤, 고친 글을 눈으로 읽어라.** 낱말이 깨끗해도 **문장이 안 이어질 수 있다** —
   "그래서" 앞뒤가 이어지나 · "~일 수 있다" 면 언제 그런지 말했나 · 글이 옆의 표와 같은 걸 말하나.
   2026-09-17 에 선생님이 잡으신 문장은 **검사기 기준 0건이었다.**
   근거: `memory/feedback_sentence_must_follow.md`

⚠️ **"검토할 때 하면 좋은 것" 이 아니라 문이다.** quest 를 손봤으면 보여드리기 전에 넷 다 돌려라.
⚠️ 그래도 **검사기는 아는 모양만 찾는다.** 0건이 결백은 아니다 — 화면도 눈으로 봐라.
⚠️ **"담당자 누구지?" 라는 질문에는 두 가지를 같이 답해라** —
   **① 누가 책임지나 ② 다음엔 무엇이 이걸 잡나(검사 항목·스크립트).**
   ①만 답하면 선생님은 "그래서 다음에도 또 이러냐" 를 물으시게 된다. 실제로 그랬다.

**이야기 전체를 봐야 할 때 — 검토를 *시작하기 전에* 이걸 먼저** (2026-09-07 추가):
```bash
node scripts/see-flow.mjs http://localhost:3000/quest/moohunt   # 13쪽을 13줄로
```
스텝 순서 · 그 쪽이 하는 말 · 시뮬 분량 · 첫 코드가 나오는 쪽을 한 화면에 편다.
그날 여러 명이 검토했는데도 "기승전결이 없다" 를 아무도 못 봤다 — **한 쪽씩 열면
어느 쪽도 안 이상하기 때문이다. 이상한 건 쪽과 쪽 사이다.**
주인은 `project-lead`. 근거: `memory/feedback_reviewers_see_pages_teacher_sees_story.md`

**화면을 눈으로 봐야 할 때** (검토자·QA·학생 에이전트도 이걸 쓴다):
```bash
node scripts/see-screen.mjs http://localhost:3000/quest/moohunt          # 데스크탑
node scripts/see-screen.mjs http://localhost:3000/learn/45 --progress 45:1:1 --mobile
```
화면 글자 · **고정 요소에 가려진 버튼/입력칸** · 55자 넘는 문장을 찍어준다.
2026-09-07 에 만들었다 — 그전엔 검토자에게 화면을 볼 수단이 없어서
빈칸이 고정 바에 가려지는 버그가 5개월간 안 걸렸다.

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

## 🗣️ 선생님께는 결론만 — 3~5줄

**2026-09-07 선생님:** *"너가 밑에 설명을 엄청 많이 쓰는데 백그라운드에서 동작하고
나에게는 결론만 얘기해주면 좋을것 같아. 난 다 읽지도 못해."*

무엇을 했고 · 결과가 무엇이고 · 다음에 뭘 할지. 그게 다다.
근거·인용·표·수치는 **물으실 때만.** 커밋 메시지와 `.claude/WORK.md` 에 남겨라 — 거기가 제자리다.
검토자 보고를 그대로 옮기지 마라. 내가 읽고 결론만 전한다.
자세한 것은 `memory/feedback_report_conclusions_only.md`.

## 🙋 선생님께 되묻지 마라 — 정하고, 말씀드리고, 진행해라

**2026-09-04 선생님:** *"자꾸 담당자를 만들었는데 담당자들이 안하고 나에게 묻는 일이 생기네"*

그날 내가 선생님께 되물은 9건 중 **진짜 선생님 몫은 2건뿐**이었다.
나머지 7건(순서·방법·측정 잣대·배포·되돌리기 여부)은 내가 정하고 진행하면 될 일이었다.
에이전트도 같은 실수를 했다 — project-lead 가 자기가 정할 수 있는 것을 "선생님 몫" 으로 넘겼다.

### 선생님께 물어야 하는 것 — 이 넷뿐이다

1. **계정·권한이 필요한 일** — USACO 제출, Supabase 조회, Vercel 대시보드
2. **🔒 동결 quest 나 `USACO_VERIFIED` 코드를 실제로 바꿔야** 할 때
   (`quest_review_progress.md` 규칙이 "명시적 요청 전엔 읽기 전용" 이다)
3. **학생 데이터가 위험**할 때 — `lesson_id` · `question.id` · localStorage 키 · 커리큘럼 순서
4. **제품 방향** — 무엇을 가르칠지, 어떤 트랙을 만들지

### ⏩ 일이 남아 있으면 멈추지 마라 — **묶음 끝에서도** (2026-09-17 두 번째 지적)

선생님: *"ㅇㅇ 다 수정해야지 왜 멈춘거지?"*

quest 172개를 고치는 일에서 **27개를 끝내고 "이어서 돌릴까요?"** 라고 물었다.
`feedback_dont_stop_between_items` 는 기억하고 있었는데, 그걸 **"항목마다"** 로만 읽고
**내가 세운 계획의 묶음(wave) 끝**에서 멈췄다.

**항목이든 묶음이든 단계든 똑같다.** 선생님이 문제의 **범위**를 아셨으면
(예: "번역 티 787건 · quest 172개"), **그 범위가 0 이 될 때까지가 하나의 작업**이다.
남은 수를 보고했으면 다음 문장은 **"이어서 돌리겠습니다"** 다.

### 나머지는 전부 내가 정한다

순서 · 방법 · 우선순위 · 측정 잣대 · 리팩터 범위 · 되돌릴지 말지 · 도구를 만들지 —
**묻지 말고 정해라.** 못 정하겠으면 담당 에이전트에게 물어라. 선생님이 아니라.

### 그래도 알려야 할 때는 이렇게

❌ "A 로 할까요, B 로 할까요?"
⭕ **"A 로 하겠습니다. 이유는 이것입니다. 다르게 원하시면 말씀해주세요."**

기본값을 정해서 진행하고, 되돌릴 수 있게 커밋을 나눠라.
**되돌릴 수 있는 일에 허락을 구하지 마라.** 되돌리기 어려운 일만 확인받아라.

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

> 🚫 **배포·main 머지는 선생님이 명시적으로 지시할 때만 한다.** 기본은 **커밋까지**다.
> 🚫 **배포는 하루 한 번이다.** 선생님(2026-09-21): *"난 vercel.com에는 하루에 한번만
>   할거고. 특별히 해야할때는 내가 얘기하겠다고 했는데"* — **두 번째 지적이다.**
>   그날 나는 네 번 밀었고 그중 둘은 학생이 볼 게 하나도 없었다(설정·문서).
>   **커밋은 계속 쌓아라. 미푸시가 20개여도 괜찮다 — 문제는 푸시 횟수다.**
>   **"밀까요?" 를 하루에 두 번 이상 묻고 있으면 그것부터 잘못된 것이다.**
>   문서·설정·스크립트만 고친 커밋은 그것만으로 밀 이유가 없다. 다음 화면 변경과 묶어라.
>   **밀기 전에 반드시:** `python3 scripts/check-deploy-budget.py`
>   오늘 이미 밀었으면 1 을 돌려준다. 규칙만 적어 두면 또 샌다 — 그래서 기계로 센다.
> ⚠️ **"밀까요?" 라고 묻기 전에 `project-lead` 판정을 먼저 받아라.**
>   화면(quest·레슨·시뮬)에 닿는 커밋이면 판정 없이 질문만 던지지 마라 —
>   선생님이 매번 "PM은?" 을 다시 물으시게 된다. **2026-09-18~21 에 네 번 그랬다.**
>   project-lead 를 부르는 때는 **"물어봐도 될 만큼 다 끝났을 때"** 가 아니라
>   **"밀지 말지 판단이 필요한 순간"** 이다 — **미푸시 커밋이 하나라도 생기면 그 순간이다.**
>   선생님께 드릴 문장은 "밀까요?" 가 아니라
>   **"PM 판정은 «민다/안 민다» 입니다. 근거는 이것입니다. 지시만 주세요."** 다.
>   근거: `.claude/skills/decide/SKILL.md` · `memory/feedback_verdict_must_come_back.md`
> **`git push origin main` 이 곧 배포다** — 커밋만 하고 "밀까요?" 라고 물어라.
> **"배포해도 돼?" 는 판정을 물으신 것이지 승낙이 아니다.** (2026-09-08 세 번째 지시)
> main 아닌 브랜치는 `vercel.json` 이 막는다 — 단 `VERCEL_GIT_COMMIT_REF` 가 비면
> **빌드하는 쪽**으로 넘어지게 짰다 (2026-06-21 에 반대로 짰다가 사이트가 며칠 얼었다).
> 2026-05-14 · 05-15 두 번 지시받은 규칙인데 지금까지 memory 에만 있어서,
> CLAUDE.md 만 읽는 에이전트는 몰랐다. 근거: `memory/feedback_deployment.md`,
> `memory/feedback_no_more_deploy.md`
> ⚠️ 라이브는 Vercel 프로젝트 `coderin` 인데 이 디렉터리 `.vercel` 링크는 다른 곳을 가리킨다.
> 그냥 배포하면 라이브가 안 바뀐다. 정확한 명령은 `memory/infra_vercel_coderin_deploy.md`.

- Vercel (정적 빌드)
- `npm run build` = `next build`
- `/parent?t=TOKEN` 처럼 query params 를 쓰는 곳이 있지만, 정적 export 제약 때문이 아니라 그냥 그 화면의 설계다
