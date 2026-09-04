# Supabase 알려진 문제 + 향후 이전 계획

> **언제 여나:** DB·진도 저장을 건드릴 때
> 원래 `CLAUDE.md` 안에 있던 내용을 2026-09-04 에 옮겼다. 내용은 그대로다.

---

## ⚠️ Supabase DB 알려진 문제 & 해결법

### lesson_progress variant null vs "" 충돌
- `lesson_progress` 테이블 UNIQUE 제약: `(user_id, lesson_id, variant, progress_type)`
- 구버전 코드는 `variant = null`, 신버전은 `variant = ""` 로 저장
- **null ≠ ""** 이라 같은 레슨이 두 행으로 중복되어 upsert 충돌 발생
- 증상: 학생이 완료했는데 선생님 화면에 안 보임 / 학생 커리큘럼에 완료 안 뜸

**발생 시 해결 SQL (Supabase SQL Editor에서 순서대로 실행):**
```sql
-- 1단계: "" 행에 null 행의 좋은 데이터 반영 (completed=true 보존)
UPDATE lesson_progress lp_empty
SET
  completed = GREATEST(lp_empty.completed, lp_null.completed),
  updated_at = GREATEST(lp_empty.updated_at, lp_null.updated_at)
FROM lesson_progress lp_null
WHERE lp_null.variant IS NULL
  AND lp_empty.variant = ''
  AND lp_null.user_id = lp_empty.user_id
  AND lp_null.lesson_id = lp_empty.lesson_id
  AND lp_null.progress_type = lp_empty.progress_type;

-- 2단계: null 행 삭제
DELETE FROM lesson_progress WHERE variant IS NULL;
```

**예방:** 코드에서 lesson_progress upsert 시 항상 `variant: ""` 명시. null이 들어가지 않도록 주의.

---

## 🔮 향후 구조 변경 — 메모리 참고

**"Supabase로 콘텐츠 이전 / 어드민 페이지 만들기" 이야기가 나오면** 먼저 메모리 문서 확인:
`~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/project_supabase_migration.md`

요약: 현재 레슨 콘텐츠는 TS 파일에 저장 → 클라이언트 번들로 노출됨 → 콘텐츠 유출 위험.
**결정(2026-04-21): 지금은 편집 우선, 수정 빈도 월 1회 이하로 줄어들면 Supabase로 이전 + 어드민 페이지 구축.**
편집 중에도 JSON 직렬화 가능 구조, 필드 이름 일관성, 문자열 ID, en 블록 방식 유지해서 나중에 마이그레이션 쉽게.
