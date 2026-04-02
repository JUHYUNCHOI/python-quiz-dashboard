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

-- ── 3. parent_report_links RLS 정책 추가 ──
-- 에러: new row violates row-level security policy for table "parent_report_links"
-- 이유: 선생님/학생 모두 INSERT 가능하도록 정책 추가

-- 기존 정책 제거 (이미 있을 경우 대비)
drop policy if exists "Teachers can insert parent report links" on public.parent_report_links;
drop policy if exists "Students can insert own parent report links" on public.parent_report_links;
drop policy if exists "Anyone can read parent report links by token" on public.parent_report_links;
drop policy if exists "Teachers can read parent report links" on public.parent_report_links;

-- 선생님: 자기 반 학생의 링크 INSERT 가능
create policy "Teachers can insert parent report links"
  on public.parent_report_links
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'teacher'
    )
  );

-- 학생: 본인 링크만 INSERT 가능
create policy "Students can insert own parent report links"
  on public.parent_report_links
  for insert
  to authenticated
  with check (student_id = auth.uid());

-- 누구나 token으로 조회 가능 (학부모 포털)
create policy "Anyone can read parent report links by token"
  on public.parent_report_links
  for select
  using (true);

-- 선생님: 자기가 만든 링크 UPDATE 가능
create policy "Teachers can update parent report links"
  on public.parent_report_links
  for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'teacher'
    )
  );

-- ── 5. flagged_questions — 문제 신고 기능 ──
-- 학생/선생님이 부적합한 문제를 신고하면 선생님이 검토할 수 있는 테이블

create table if not exists public.flagged_questions (
  id uuid default gen_random_uuid() primary key,
  question_id integer not null,
  lesson_id text not null,
  reported_by uuid references auth.users(id) on delete set null,
  reported_by_name text,
  reason text not null check (reason in ('wrong_answer', 'wrong_lesson', 'not_taught', 'duplicate', 'unclear', 'other')),
  comment text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'fixed', 'dismissed')),
  created_at timestamptz default now() not null,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);

alter table public.flagged_questions enable row level security;

-- 로그인한 누구나 신고 가능 (학생 포함)
create policy "Authenticated users can flag questions"
  on public.flagged_questions for insert
  to authenticated
  with check (reported_by = auth.uid());

-- 선생님만 신고 목록 조회 가능
create policy "Teachers can view flagged questions"
  on public.flagged_questions for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'teacher'
    )
  );

-- 선생님만 상태 업데이트 가능 (reviewed/fixed/dismissed)
create policy "Teachers can update flagged questions"
  on public.flagged_questions for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'teacher'
    )
  );
