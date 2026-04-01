-- ============================================================
-- 코드린 DB 마이그레이션 모음
-- Supabase SQL Editor에서 실행하세요
-- ============================================================

-- ── 1. homework_submissions에 teacher_comment 컬럼 추가 ──
-- 에러: column homework_submissions.teacher_comment does not exist
alter table public.homework_submissions
  add column if not exists teacher_comment text,
  add column if not exists teacher_grade text;

-- ── 2. parent_report_links: class_id / created_by nullable 처리 ──
-- 이유: 학생이 포털에서 직접 링크 생성할 때 class_id 없어도 되도록
alter table public.parent_report_links
  alter column class_id drop not null,
  alter column created_by drop not null;
