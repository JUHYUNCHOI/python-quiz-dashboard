-- ======== 학부모 리포트 링크 (Supabase SQL Editor에서 실행) ========

-- 1. 테이블 생성
create table if not exists public.parent_report_links (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  student_id uuid not null references public.profiles(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  student_name text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_prl_token on public.parent_report_links(token);
alter table public.parent_report_links enable row level security;

-- 2. RLS 정책
create policy "Teachers manage own report links"
  on public.parent_report_links for all to authenticated
  using (created_by = (select auth.uid()));

-- 3. 학부모 리포트 조회 RPC 함수
create or replace function public.get_parent_report(p_token text)
returns json language plpgsql security definer stable
set search_path = public
as $$
declare
  v_link parent_report_links;
  v_profile profiles;
  v_gam gamification_data;
  v_progress json;
  v_quizzes json;
begin
  select * into v_link from parent_report_links
  where token = p_token and is_active = true;

  if v_link is null then
    return json_build_object('error', 'invalid_token');
  end if;

  select * into v_profile from profiles where id = v_link.student_id;
  select * into v_gam from gamification_data where user_id = v_link.student_id;

  select json_agg(row_to_json(lp)) into v_progress
  from (
    select lesson_id, progress_type, completed, score, updated_at
    from lesson_progress where user_id = v_link.student_id
    order by updated_at desc
  ) lp;

  select json_agg(row_to_json(qs)) into v_quizzes
  from (
    select difficulty, total_questions, correct_answers, max_combo,
           time_elapsed_ms, end_reason, xp_earned, completed_at
    from quiz_sessions where user_id = v_link.student_id
    order by completed_at desc limit 5
  ) qs;

  return json_build_object(
    'student_name', coalesce(v_link.student_name, v_profile.display_name),
    'total_xp', coalesce(v_gam.total_xp, 0),
    'daily_streak', coalesce(v_gam.daily_streak, 0),
    'last_active_date', coalesce(v_gam.last_active_date, ''),
    'lesson_progress', coalesce(v_progress, '[]'::json),
    'recent_quizzes', coalesce(v_quizzes, '[]'::json)
  );
end;
$$;

-- 4. anon 유저도 호출 가능
grant execute on function public.get_parent_report(text) to anon;
grant execute on function public.get_parent_report(text) to authenticated;
