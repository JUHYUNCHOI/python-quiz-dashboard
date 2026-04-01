-- 학부모 링크 수정: class_id / created_by nullable로 변경
-- (학생이 직접 포털에서 생성하는 경우 class 없이도 생성 가능해야 함)
-- Supabase SQL Editor에서 실행

ALTER TABLE public.parent_report_links
  ALTER COLUMN class_id DROP NOT NULL,
  ALTER COLUMN created_by DROP NOT NULL;
