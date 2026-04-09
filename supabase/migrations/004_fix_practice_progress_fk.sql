-- ============================================================
-- 004_fix_practice_progress_fk.sql
-- practice_progress.problem_id FK 제약 제거
--
-- 이유: 연습 문제가 TypeScript 파일 기반으로 관리되어
--       practice_problems 테이블에 없는 ID도 진도 저장이 필요함.
--       FK 제약이 있으면 새 문제 추가 시마다 DB 마이그레이션이 필요해
--       운영이 복잡해짐. problem_id는 TEXT로만 관리한다.
-- ⚠️ 재실행 안전: IF EXISTS 처리됨
-- ============================================================

-- 기존 FK 제약 제거
ALTER TABLE practice_progress
  DROP CONSTRAINT IF EXISTS practice_progress_problem_id_fkey;

-- 확인용 (실행 후 콘솔에서 확인 가능)
-- SELECT constraint_name FROM information_schema.table_constraints
-- WHERE table_name = 'practice_progress' AND constraint_type = 'FOREIGN KEY';
