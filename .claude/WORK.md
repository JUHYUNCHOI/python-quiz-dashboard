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
| 레슨 32 나머지 챕터 (34.2% → 50%+) | lesson-content-reviewer → frontend-engineer | `check-active-ratio.py 32` 가 50%+ | 대기 |
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

## 결정이 필요한 것

| 무엇 | 왜 막혔나 |
|---|---|
| `hps` 를 오늘 텍스트만 고쳤음 (동결 quest 인 줄 모르고). 되돌릴지 둘지 | 자산 손실은 없음 (+12/−10줄, 위젯 무사). 규칙상 판단 필요 |
| `CodeSectionView` → `CodeWalk` 이관 | 표준 위반이지만 `hps`·`checkups`·`mooin3` 가 동결. **구조 변경이라 선생님 몫** |

## 완료 (2026-09-04)

- algo MiniQuiz 67개 제거 + 진행 잠금 해제 · 별표 393곳 (quest 9개는 코드 깨져서 되돌림)
- quest 3차 검토 반영 (mooin2 조사 버그 · printseq · buymilk · cowsplits · mexes 스포일러)
- `check-outputs` 14개 실패 → 0 · quest 177개 C++ 컴파일 검증
- CLAUDE.md 778 → 218줄 + `.claude/docs/` · 피드백 기억 3층 구조
